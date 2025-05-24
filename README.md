# Kirie个人博客系统 - GitHub Pages部署分支

这是 **gh-pages** 分支，专门用于GitHub Pages部署。

## 📁 分支说明

- **main分支**: 存放源代码和开发文件
- **gh-pages分支**: 存放构建后的静态文件（当前分支）

## 🚀 部署内容

此分支包含以下构建后的静态文件：

```
gh-pages/
├── index.html          # 主页面
├── favicon.ico         # 网站图标
└── assets/            # 静态资源
    ├── *.css          # 样式文件
    ├── *.js           # JavaScript文件
    └── *.jpg          # 图片资源
```

## 🌐 访问地址

GitHub Pages部署地址：`https://kirie233.github.io/Kirie-Blog/`

## ⚠️ 重要说明

- **请勿直接修改此分支的文件**
- 所有修改应在main分支进行
- 构建后的文件会自动更新到此分支

## 🔄 更新流程

1. 在main分支进行开发
2. 运行 `npm run build` 构建项目
3. 将dist目录内容推送到gh-pages分支
4. GitHub Pages自动部署更新

## 🔧 修复说明

**v1.0.1 更新** (2024年12月):
- ✅ 修复了资源路径问题
- ✅ 添加了正确的base路径配置 `/Kirie-Blog/`
- ✅ 所有CSS和JS文件现在可以正确加载

---

**最后更新**: 2024年12月
**构建版本**: v1.0.1
