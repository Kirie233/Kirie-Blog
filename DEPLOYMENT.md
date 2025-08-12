# 部署指南

本指南将帮助您将 Kirie Blog 部署到 GitHub Pages。

## 🚀 快速部署

### 1. 准备工作

确保您已经：
- ✅ 安装了 Node.js (版本 16+)
- ✅ 安装了 Git
- ✅ 有 GitHub 账户

### 2. 克隆或下载项目

```bash
# 克隆项目
git clone https://github.com/your-username/kirie-blog.git
cd kirie-blog

# 或者下载并解压项目文件
```

### 3. 安装依赖

```bash
npm install
```

### 4. 本地测试

```bash
# 启动开发服务器
npm run dev

# 在浏览器中访问 http://localhost:5173
```

### 5. 创建 GitHub 仓库

1. 登录 GitHub
2. 点击右上角的 "+" → "New repository"
3. 输入仓库名称（如：`my-blog`）
4. 选择 "Public"（GitHub Pages 免费版需要公开仓库）
5. 点击 "Create repository"

### 6. 推送代码到 GitHub

```bash
# 初始化 Git 仓库（如果还没有）
git init

# 添加远程仓库
git remote add origin https://github.com/your-username/your-repo-name.git

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit"

# 推送到 GitHub
git push -u origin main
```

### 7. 配置 GitHub Pages

1. 进入您的 GitHub 仓库页面
2. 点击 **Settings** 标签
3. 在左侧菜单中找到 **Pages**
4. 在 **Source** 部分选择 **GitHub Actions**
5. 保存设置

### 8. 等待部署完成

- GitHub Actions 会自动运行
- 您可以在 **Actions** 标签中查看部署进度
- 部署完成后，您的博客将在以下地址可用：
  ```
  https://your-username.github.io/your-repo-name
  ```

## 📝 添加您的第一篇文章

### 使用命令行工具

```bash
npm run content
```

选择 "1. 添加文章"，按提示输入信息。

### 手动创建

在 `content/posts/` 目录下创建 `my-first-post.md`：

```markdown
---
title: "我的第一篇文章"
date: "2024-01-29"
category: "生活随笔"
tags: ["开始", "博客"]
summary: "这是我的第一篇博客文章"
author: "Your Name"
draft: false
---

# 我的第一篇文章

欢迎来到我的博客！这是我的第一篇文章。

## 关于这个博客

这个博客使用 Kirie Blog 系统构建，采用：
- Vue 3 + Vite
- Git-based 工作流
- GitHub Pages 部署

## 下一步计划

- [ ] 写更多有趣的文章
- [ ] 自定义博客样式
- [ ] 添加更多功能

感谢您的阅读！
```

### 发布文章

```bash
# 添加新文章
git add content/posts/my-first-post.md

# 提交
git commit -m "添加我的第一篇文章"

# 推送
git push origin main
```

## 🎨 自定义配置

### 修改博客信息

编辑 `content/config/blog.json`：

```json
{
  "blog": {
    "title": "您的博客名称",
    "subtitle": "您的博客副标题",
    "description": "博客描述",
    "author": "您的名字",
    "url": "https://your-username.github.io/your-repo-name"
  },
  "social": {
    "github": "https://github.com/your-username",
    "email": "your-email@example.com"
  }
}
```

### 自定义域名

如果您有自定义域名：

1. 将 `public/CNAME.example` 重命名为 `public/CNAME`
2. 编辑文件内容为您的域名：
   ```
   blog.yourdomain.com
   ```
3. 在域名提供商处添加 DNS 记录：
   - 类型：CNAME
   - 名称：blog（或您选择的子域名）
   - 值：your-username.github.io

## 🔧 高级配置

### 环境变量

在仓库的 **Settings** → **Secrets and variables** → **Actions** 中添加：

- `VITE_BLOG_TITLE`: 博客标题
- `VITE_BLOG_DESCRIPTION`: 博客描述
- `VITE_AUTHOR_NAME`: 作者名称

### 自定义构建

修改 `.github/workflows/deploy.yml` 来自定义构建过程。

### 添加评论系统

可以集成第三方评论系统，如：
- Giscus (基于 GitHub Discussions)
- Utterances (基于 GitHub Issues)
- Disqus

## 🐛 常见问题

### Q: 部署失败怎么办？

A: 检查以下几点：
1. 确保仓库是公开的
2. 检查 GitHub Actions 的错误日志
3. 确保 `content/posts/` 目录存在且有文章
4. 检查 Markdown 文件的 frontmatter 格式

### Q: 文章不显示怎么办？

A: 检查：
1. Markdown 文件的 frontmatter 格式是否正确
2. `draft` 字段是否设置为 `false`
3. 日期格式是否为 `YYYY-MM-DD`
4. 必需字段（title, date, category）是否都有

### Q: 如何备份内容？

A: 您的所有内容都在 Git 仓库中，天然具备版本控制和备份功能。您也可以：
1. 克隆仓库到本地作为备份
2. 使用 GitHub 的导出功能
3. 定期导出 `content/` 目录

### Q: 如何迁移现有博客？

A: 
1. 将现有文章转换为 Markdown 格式
2. 添加正确的 frontmatter
3. 放置到 `content/posts/` 目录
4. 提交并推送到 GitHub

## 📞 获取帮助

如果您遇到问题：

1. 查看 [GitHub Issues](https://github.com/your-username/kirie-blog/issues)
2. 阅读 [README.md](./README.md) 文档
3. 检查 GitHub Actions 的构建日志

祝您使用愉快！ 🎉
