# Kirie个人博客系统

一个基于Vue 3 + Vite + Tailwind CSS构建的现代化个人博客系统，具有优雅的动画效果和响应式设计。

## ✨ 特性

- 🎨 **现代化设计** - 采用暗色主题，优雅的渐变色彩
- 🎭 **流畅动画** - 使用@vueuse/motion库实现性能优化的动画效果
- 📱 **响应式布局** - 完美适配各种设备尺寸
- 🚀 **高性能** - 基于Vite构建，开发体验极佳
- 🎯 **组件化** - 高度模块化的组件设计
- 🏷️ **标签系统** - 支持文章分类和标签管理

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
├── src/
│   ├── components/          # 组件目录
│   │   ├── ProfileCard.vue  # 个人资料卡片
│   │   ├── WelcomeBanner.vue # 欢迎横幅
│   │   └── LoadingBar.vue   # 加载条
│   ├── views/              # 页面视图
│   │   ├── BlogHome.vue    # 博客首页
│   │   ├── AboutView.vue   # 关于页面
│   │   └── GuestbookView.vue # 留言板
│   ├── assets/             # 静态资源
│   ├── router/             # 路由配置
│   └── composables/        # 组合式函数
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
