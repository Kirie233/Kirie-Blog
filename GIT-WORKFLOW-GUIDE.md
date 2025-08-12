# Git-based 工作流指南

## 🎯 为什么选择 Git-based 工作流？

### 🔒 安全性优势
- **完全安全**：只有仓库协作者可以管理内容
- **无网络攻击面**：没有在线管理界面，避免了常见的网络安全风险
- **权限控制**：通过 GitHub 的权限系统精确控制访问权限

### 📝 版本控制优势
- **完整历史记录**：每次修改都有详细的提交记录
- **轻松回滚**：可以恢复到任何历史版本
- **分支管理**：支持草稿分支、审核分支等工作流
- **协作友好**：支持多人协作写作

### 🚀 部署优势
- **自动化部署**：Git 提交自动触发构建和部署
- **零停机时间**：GitHub Pages 提供稳定的托管服务
- **全球 CDN**：GitHub Pages 自带全球内容分发网络

## 📝 日常写作工作流

### 1. 创建新文章

```bash
# 使用命令行工具（推荐）
npm run content

# 或手动创建 Markdown 文件
touch content/posts/2024-01-29-my-new-post.md
```

### 2. 编写内容

```markdown
---
title: "文章标题"
date: "2024-01-29"
category: "分类"
tags: ["标签1", "标签2"]
summary: "文章摘要"
author: "作者名"
draft: false
---

# 文章标题

文章内容...
```

### 3. 本地预览

```bash
npm run dev
# 访问 http://localhost:5173 预览
```

### 4. 发布文章

```bash
git add content/posts/2024-01-29-my-new-post.md
git commit -m "添加新文章: 文章标题"
git push origin main
```

### 5. 自动部署

GitHub Actions 自动：
- 生成内容索引
- 构建静态网站
- 部署到 GitHub Pages

## 🔄 高级工作流

### 草稿管理

```markdown
---
title: "草稿文章"
draft: true  # 草稿不会在生产环境显示
---
```

### 分支工作流

```bash
# 创建写作分支
git checkout -b writing/new-article

# 写作和提交
git add content/posts/new-article.md
git commit -m "草稿: 新文章"

# 推送分支
git push origin writing/new-article

# 创建 Pull Request 进行审核
# 合并到 main 分支后自动部署
```

### 协作写作

```bash
# 多人协作时的工作流
git checkout main
git pull origin main  # 获取最新内容
git checkout -b feature/article-collaboration
# 编写内容...
git push origin feature/article-collaboration
# 创建 Pull Request
```

## 🛠️ 内容管理最佳实践

### 文件命名规范

```
content/posts/YYYY-MM-DD-article-title.md
```

示例：
- `2024-01-29-welcome-to-my-blog.md`
- `2024-02-01-vue3-tutorial.md`
- `2024-02-15-git-workflow-guide.md`

### Frontmatter 最佳实践

```yaml
---
title: "清晰、吸引人的标题"
date: "2024-01-29"  # 使用 YYYY-MM-DD 格式
category: "明确的分类"  # 使用已有分类
tags: ["相关", "标签"]  # 3-5个相关标签
summary: "简洁的文章摘要，150字以内"
author: "作者名"
draft: false  # 明确指定是否为草稿
---
```

### 内容组织

```
content/
├── posts/
│   ├── 2024-01-29-welcome.md
│   ├── 2024-02-01-tutorial.md
│   └── 2024-02-15-guide.md
├── pages/  # 静态页面（可选）
│   ├── about.md
│   └── contact.md
└── config/
    └── blog.json
```

## 🔧 维护和管理

### 定期维护

```bash
# 检查内容索引
npm run generate-index

# 本地构建测试
npm run build
npm run preview

# 检查链接和图片
# 使用工具如 markdown-link-check
```

### 备份策略

1. **Git 仓库本身就是备份**
2. **定期克隆到本地**
3. **使用 GitHub 的导出功能**
4. **设置多个远程仓库**

```bash
# 添加备份远程仓库
git remote add backup https://gitlab.com/username/blog-backup.git
git push backup main
```

### 迁移和导入

```bash
# 从其他博客系统迁移
# 1. 导出现有内容为 Markdown
# 2. 转换 frontmatter 格式
# 3. 批量导入到 content/posts/
# 4. 提交和部署
```

## 📊 监控和分析

### 构建状态监控

- 在 GitHub Actions 页面查看构建状态
- 设置邮件通知获取构建结果
- 使用 GitHub Status API 集成监控

### 内容分析

```bash
# 使用命令行工具查看统计
npm run content
# 选择 "6. 统计信息"
```

### 性能优化

- 图片压缩和优化
- Markdown 文件大小控制
- 合理使用标签和分类

## 🚨 故障排除

### 常见问题

1. **构建失败**
   - 检查 Markdown 语法
   - 验证 frontmatter 格式
   - 查看 GitHub Actions 日志

2. **文章不显示**
   - 确认 `draft: false`
   - 检查日期格式
   - 验证必需字段

3. **样式问题**
   - 清除浏览器缓存
   - 检查 CSS 文件
   - 验证构建输出

### 调试技巧

```bash
# 本地调试
npm run dev
# 检查浏览器控制台

# 构建调试
npm run build
# 检查 dist/ 目录

# 内容调试
npm run generate-index
# 检查生成的 content-index.json
```

## 🎉 总结

Git-based 工作流为个人博客提供了：

- ✅ **安全性**：无在线管理界面，避免安全风险
- ✅ **可靠性**：基于 Git 的版本控制和 GitHub 的稳定服务
- ✅ **灵活性**：支持多种写作和发布方式
- ✅ **协作性**：天然支持多人协作和代码审查
- ✅ **可维护性**：清晰的文件结构和标准化流程

这种工作流特别适合：
- 技术博客作者
- 重视内容安全的用户
- 需要版本控制的写作项目
- 多人协作的博客团队

开始您的安全博客之旅吧！ 🚀
