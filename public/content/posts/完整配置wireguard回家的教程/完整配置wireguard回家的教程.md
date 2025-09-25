---
title: "在Openwrt中配置Wireguard实现全局回家"
date: "2025-09-25"
category: "网络技术"
tags: ["Openwrt", "Wireguard", "VPN", "网络配置"]
---

# 在Openwrt中配置Wireguard实现全局回家
## 前提条件
- **已刷好Openwrt固件的路由器**
- **有公网ip**

## 1.配置Openwrt端接口（可以理解为服务端）

- 点击网络-接口-添加新接口![image-1.png](https://lsky.kirie.icu:8888/i/2024/08/13/66ba72d542b8e.png)
- 命名为wg0，接口协议选择`Wireguard VPN`
![image-1.png](https://lsky.kirie.icu:8888/i/2024/08/13/66ba73d8b8963.png)
- 保存后进入接口设置页面
### 使用命令行工具获取私钥

**在开始菜单右键，点击`Windows Powershell（管理员）`**
**在命令行输入`ssh root@软路由ip`进入软路由后台**
**初次ssh登录时会有提示，输入yes即可**

![image-2.png](https://lsky.kirie.icu:8888/i/2024/08/13/66ba72d4e15d5.png)

- 登录后输入`wg genkey`生成私钥

![image-3.png](https://lsky.kirie.icu:8888/i/2024/08/13/66ba772d193d4.png)

- 复制私钥粘贴到接口设置中，设置监听端口（注意设置的端口不能被其他服务占用）
<span style="font-size: 1.5em; font-weight: bold; color: red;">注意：ip地址设置一定不能与现有网段冲突</span>（例如家里的网段是192.168.1.0/24，可以设置192.168.2.1/24）

![image-4.png](https://lsky.kirie.icu:8888/i/2024/08/13/66ba747b07d9f.png)

## 2.配置Windows端

### 下载并安装Wireguard客户端

- 下载安装Wireguard客户端：https://www.wireguard.com/install/
- 启动客户端，点击`新建空隧道`
![image-5.png](https://lsky.kirie.icu:8888/i/2024/08/13/66ba74c869bc7.png)

- 命名为wg0（这里因为我已经有一个wg0了，所以改成wg1）

![image-7.png](https://lsky.kirie.icu:8888/i/2024/08/13/66ba74fe27e72.png)

- 复制公钥，回到Openwrt端，点击左下角`添加`按钮，粘贴公钥，设置如图

![image-8.png](https://lsky.kirie.icu:8888/i/2024/08/13/66ba7512adef4.png)

### 获取openwrt的公钥
- 复制openwrt的私钥,回到powershell，输入`echo "openwrt的私钥" | wg pubkey`得到公钥

### 回到Wireguard客户端，根据模板进行修改
![image-10.png](https://lsky.kirie.icu:8888/i/2024/08/13/66ba752deced0.png)

```ini
[Interface]
PrivateKey =  #自动生成的私钥（不要修改！！！）
Address = #填写刚才填写的`允许的ip` 
DNS = #openwrt的WG一般设置中设置的ip地址，也可以设置为openwrt的ip地址

[Peer]
PublicKey = #openwrt的公钥
AllowedIPs = #允许走wirguard的ip段，例如192.168.2.0/24，0.0.0.0/0（全部允许）
Endpoint = #服务器地址:端口
```

### 修改完成后需要回到接口设置处，先关闭WG0接口再连接
![image-15.png](https://lsky.kirie.icu:8888/i/2024/08/13/66ba767949f2d.png)
- 当出现握手时间时表示成功连接
![image-13.png](https://lsky.kirie.icu:8888/i/2024/08/13/66ba756a50893.png)

### 如果要实现访问内网中其他设备还要在防火墙中添加自定义规则（这里lan口如果没有桥接就填eth0）
`iptables -t nat -A POSTROUTING -s 192.168.40.0/24 -o br-lan -j MASQUERADE`



#### 最后引用恩山论坛的一句总结：<span style="color: red;">节点之间【公钥互换，私钥自留，预共享密钥相同】， 这是wireguard配置的精髓</span>。