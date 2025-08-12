# Kirie个人博客系统

一个基于Vue 3 + Vite + Tailwind CSS构建的现代化个人博客系统，具有优雅的动画效果和响应式设计。

## ✨ 特性

- 🎨 **现代化设计** - 采用暗色主题，优雅的渐变色彩
- 🎭 **流畅动画** - 使用@vueuse/motion库实现性能优化的动画效果
- 📱 **响应式布局** - 完美适配各种设备尺寸
- 🚀 **高性能** - 基于Vite构建，开发体验极佳
- 🎯 **组件化** - 高度模块化的组件设计
- 🏷️ **标签系统** - 支持文章分类和标签管理
- 📝 **Git-based 工作流** - 安全的基于 Git 的内容管理
- 💬 **留言系统** - 访客可以留言互动
- 🔍 **搜索功能** - 支持文章标题、内容、标签搜索
- ⚡ **缓存优化** - 智能缓存机制提升加载性能
- 🛠️ **命令行工具** - 本地开发的内容管理工具
- 🔒 **安全性** - 无在线管理界面，避免安全风险

## 🛠️ 技术栈

- **前端框架**: Vue 3 (Composition API)
- **构建工具**: Vite
- **样式框架**: Tailwind CSS
- **动画库**: @vueuse/motion
- **图标库**: @iconify/vue
- **路由**: Vue Router 4

## 📦 项目结构

```
kirie-blog/
├── content/                # 内容目录 (Git 管理)
│   ├── posts/              # Markdown 文章
│   │   └── *.md            # 文章文件
│   └── config/             # 配置文件
│       └── blog.json       # 博客配置
├── src/
│   ├── components/          # 组件目录
│   │   ├── ProfileCard.vue  # 个人资料卡片
│   │   ├── WelcomeBanner.vue # 欢迎横幅
│   │   └── LoadingBar.vue   # 加载条
│   ├── views/              # 页面视图
│   │   ├── BlogHome.vue    # 博客首页
│   │   ├── BlogPost.vue    # 文章详情页
│   │   ├── AboutView.vue   # 关于页面
│   │   └── GuestbookView.vue # 留言板
│   ├── services/           # 服务层
│   │   └── blogService.js  # 博客数据服务
│   ├── utils/              # 工具函数
│   │   ├── contentLoader.js # 内容加载器
│   │   ├── markdownParser.js # Markdown 解析器
│   │   └── cacheManager.js # 缓存管理器
│   ├── assets/             # 静态资源
│   ├── router/             # 路由配置
│   └── composables/        # 组合式函数
├── scripts/                # 脚本工具
│   ├── content-manager.js  # 命令行内容管理工具
│   └── generate-content-index.js # 内容索引生成器
└── .github/workflows/      # GitHub Actions
    └── deploy.yml          # 自动部署配置
├── public/                 # 公共资源
└── docs/                   # 文档
```

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 📝 Git-based 内容管理

### 🔒 安全的工作流程

采用 Git-based 工作流，确保内容管理的安全性：

1. **文章以 Markdown 文件存储**在 `content/posts/` 目录
2. **通过 Git 提交**来发布和管理内容
3. **GitHub Actions 自动构建**并部署到 GitHub Pages
4. **无在线管理界面**，避免安全风险

### ✍️ 添加新文章

#### 方式一：使用命令行工具（推荐）

```bash
npm run content
```

选择"添加文章"，按提示输入文章信息，工具会自动生成 Markdown 文件。

#### 方式二：手动创建 Markdown 文件

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

### 🚀 发布文章

```bash
# 添加文件到 Git
git add content/posts/your-new-post.md

# 提交更改
git commit -m "添加新文章: 你的文章标题"

# 推送到远程仓库
git push origin main
```

GitHub Actions 会自动构建并部署到 GitHub Pages。

## 🚀 部署到 GitHub Pages

### 1. 创建 GitHub 仓库

1. 在 GitHub 上创建新仓库
2. 将代码推送到仓库

### 2. 配置 GitHub Pages

1. 进入仓库的 **Settings** → **Pages**
2. 在 **Source** 中选择 **GitHub Actions**
3. GitHub Actions 会自动运行并部署网站

### 3. 访问您的博客

部署完成后，您可以通过以下地址访问博客：
```
https://your-username.github.io/your-repository-name
```

### 4. 自定义域名（可选）

如果您有自定义域名：

1. 在仓库根目录创建 `CNAME` 文件
2. 在文件中写入您的域名，如：`blog.example.com`
3. 在域名提供商处配置 DNS 记录

## 📝 Frontmatter 字段说明

| 字段 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `title` | String | ✅ | 文章标题 |
| `date` | String | ✅ | 发布日期 (YYYY-MM-DD) |
| `category` | String | ✅ | 文章分类 |
| `tags` | Array | ❌ | 标签列表 |
| `summary` | String | ❌ | 文章摘要（留空自动生成） |
| `author` | String | ❌ | 作者名称 |
| `draft` | Boolean | ❌ | 是否为草稿（草稿不会在生产环境显示） |

## 🎨 主要组件

### ProfileCard 个人资料卡片
- 头像展示（支持发光边框效果）
- 个人信息展示
- 技能标签云
- 分类统计
- 社交账号链接（支持二维码弹出）

### WelcomeBanner 欢迎横幅
- 动态背景效果
- 渐入动画
- 响应式设计

### 动画优化
- 使用motion库实现流畅动画
- 硬件加速优化
- 减少重绘和回流
- 支持动画偏好设置

## 📱 响应式设计

- **桌面端**: 1200px+ 完整布局
- **平板端**: 768px-1199px 适配布局
- **移动端**: <768px 移动优化

## 🎯 版本历史

### v1.0.0 (当前版本)
- ✅ 完成基础博客功能
- ✅ 优化动画性能
- ✅ 完善响应式设计
- ✅ 集成个人资料组件

## 🤝 贡献

欢迎提交Issue和Pull Request来帮助改进项目！

## 📄 许可证

MIT License

## 👤 作者

**Kirie**
- GitHub: [@Kirie233](https://github.com/Kirie233)
- Email: w2245673995@outlook.com

## 🙏 致谢

感谢以下开源项目：
- [Vue.js](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [@vueuse/motion](https://motion.vueuse.org/)
- [@iconify/vue](https://iconify.design/)
