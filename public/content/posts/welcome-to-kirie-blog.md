---
title: "欢迎使用 Kirie Blog"
date: "2024-01-29"
category: "系统介绍"
tags: ["Vue", "博客", "介绍"]
summary: "欢迎使用 Kirie Blog！这是一个基于 Vue 3 + Vite 构建的现代化个人博客系统，采用 Git-based 工作流管理内容。"
author: "Kirie"
draft: false
---

# 欢迎使用 Kirie Blog

这是一个基于 Vue 3 + Vite 构建的现代化个人博客系统，采用 **Git-based 工作流**进行内容管理。

## 🎯 Git-based 工作流的优势

### 🔒 安全性
- **完全安全**：只有仓库协作者可以管理内容
- **无需在线管理界面**：避免了网络安全风险
- **权限控制**：通过 GitHub 的权限系统管理访问

### 📝 版本控制
- **完整的版本历史**：每次修改都有记录
- **轻松回滚**：可以恢复到任何历史版本
- **分支管理**：支持草稿分支和发布分支

### 🤝 协作友好
- **多人协作**：支持多个作者同时写作
- **Pull Request 工作流**：代码审查机制
- **冲突解决**：Git 的强大合并能力

## 📝 如何添加文章

### 1. 创建 Markdown 文件

在 `content/posts/` 目录下创建新的 `.md` 文件：

```markdown
---
title: "你的文章标题"
date: "2024-01-29"
category: "分类名称"
tags: ["标签1", "标签2"]
summary: "文章摘要"
author: "作者名"
draft: false
---

# 文章标题

这里是文章内容...
```

### 2. 提交到 Git

```bash
git add content/posts/your-new-post.md
git commit -m "添加新文章: 你的文章标题"
git push origin main
```

### 3. 自动部署

GitHub Actions 会自动：
- 构建静态网站
- 部署到 GitHub Pages
- 更新网站内容

## 🛠️ 本地开发

### 启动开发服务器

```bash
npm install
npm run dev
```

### 使用命令行工具

```bash
npm run content
```

这个工具可以帮助您：
- 快速创建新文章模板
- 管理文章的 frontmatter
- 预览文章效果

## 📁 文件结构

```
content/
├── posts/              # 博客文章
│   ├── welcome.md      # 欢迎文章
│   └── ...             # 其他文章
├── pages/              # 静态页面
│   ├── about.md        # 关于页面
│   └── ...             # 其他页面
└── config/             # 配置文件
    └── blog.json       # 博客配置
```

## 🎨 Frontmatter 字段说明

| 字段 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `title` | String | ✅ | 文章标题 |
| `date` | String | ✅ | 发布日期 (YYYY-MM-DD) |
| `category` | String | ✅ | 文章分类 |
| `tags` | Array | ❌ | 标签列表 |
| `summary` | String | ❌ | 文章摘要 |
| `author` | String | ❌ | 作者名称 |
| `draft` | Boolean | ❌ | 是否为草稿 |

## 🚀 部署到 GitHub Pages

1. **推送代码**到 GitHub 仓库
2. **启用 GitHub Pages**（Settings → Pages）
3. **配置 GitHub Actions**（自动完成）
4. **访问您的博客**：`https://username.github.io/repository-name`

## 📚 Markdown 语法支持

支持标准 Markdown 语法，包括：

- **粗体** 和 *斜体*
- `代码块`
- [链接](https://example.com)
- 图片：![alt text](image.jpg)
- 表格
- 列表
- 引用

> 这是一个引用示例

### 代码高亮

```javascript
// JavaScript 代码示例
const blog = {
  name: 'Kirie Blog',
  framework: 'Vue 3',
  workflow: 'Git-based'
}

console.log('欢迎使用 Kirie Blog!')
```

## 🎉 开始您的博客之旅

现在您可以：

1. **删除这篇示例文章**
2. **创建您的第一篇文章**
3. **提交到 Git 仓库**
4. **享受安全的博客写作体验**

祝您写作愉快！ ✨
