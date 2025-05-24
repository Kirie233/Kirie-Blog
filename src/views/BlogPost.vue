<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'

const route = useRoute()
const router = useRouter()
const post = ref(null)
const loading = ref(true)
const tableOfContents = ref([])
const relatedPosts = ref([])

// 模拟博客文章数据
const allPosts = [
  {
    id: 1,
    title: '我的第一篇博客',
    content: `# 我的第一篇博客

Vue.js是一个非常棒的前端框架，它使得构建交互式用户界面变得简单而有趣。

## Vue.js 简介

Vue.js是一个用于构建用户界面的渐进式框架。与其他大型框架不同的是，Vue被设计为可以自底向上逐层应用。

### 核心特性

Vue.js的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。

#### 响应式系统

Vue.js最显著的特性之一是其非侵入性的响应式系统。数据模型仅仅是普通的JavaScript对象。而当你修改它们时，视图会进行更新。

## 组件化开发

通过组件化的开发方式，我们可以更好地组织代码，提高代码的可维护性和复用性。

### 单文件组件

Vue的单文件组件（SFC）是Vue应用程序的构建块，它将模板、逻辑和样式封装在一个文件中。

## 结论

Vue.js是一个非常棒的前端框架，适合各种规模的项目。无论你是初学者还是有经验的开发者，Vue.js都能满足你的需求。`,
    date: '2023-10-15',
    category: '前端开发',
    tags: ['Vue', '前端', '入门'],
    views: 156
  },
  {
    id: 2,
    title: 'Vue 3学习笔记',
    content: `# Vue 3学习笔记

Vue 3的Composition API使用体验非常好。相比于Vue 2的Options API，Composition API提供了更好的代码组织方式，使得代码更加清晰、易于维护。

## Composition API

Composition API是Vue 3中最重要的新特性之一，它提供了一种更灵活的方式来组织组件逻辑。

### ref和reactive

在Composition API中，我们可以使用ref和reactive来创建响应式数据。

### 生命周期钩子

Composition API提供了一组生命周期钩子，可以在setup函数中使用。

## 性能提升

Vue 3的性能也有了显著提升，这得益于其重写的响应式系统和虚拟DOM算法。

### 更小的包体积

Vue 3的核心包体积比Vue 2小了约41%，这意味着你的应用程序将加载得更快。

### 更快的渲染速度

Vue 3的虚拟DOM实现经过了重写，渲染速度比Vue 2快了约1.3-2倍。

## 结论

Vue 3是一个非常棒的框架，它提供了更好的性能和开发体验。如果你正在使用Vue 2，建议尽快升级到Vue 3。`,
    date: '2023-10-20',
    category: '前端开发',
    tags: ['Vue', '学习笔记'],
    views: 128
  },
  {
    id: 3,
    title: '如何构建个人博客',
    content: `# 如何构建个人博客

使用Vue 3和Vite构建个人博客是一个很好的学习项目。通过这个项目，你可以学习到Vue 3的各种特性，以及如何使用Vite进行项目构建。

## 项目初始化

首先，我们需要使用Vite创建一个新的Vue 3项目。

\`\`\`bash
npm create vite@latest my-blog -- --template vue
\`\`\`

## 路由配置

接下来，我们需要安装和配置Vue Router来管理页面路由。

\`\`\`bash
npm install vue-router@4
\`\`\`

## 样式设计

对于样式，我们可以使用Tailwind CSS来快速构建美观的界面。

\`\`\`bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
\`\`\`

## 博客功能实现

### 文章列表页

首先，我们需要实现一个文章列表页，展示所有的博客文章。

### 文章详情页

然后，我们需要实现一个文章详情页，展示文章的详细内容。

### 分类和标签

最后，我们可以添加分类和标签功能，方便用户浏览文章。

## 部署

完成开发后，我们可以使用GitHub Pages或Netlify等服务来部署我们的博客。

## 结论

构建个人博客是一个很好的学习项目，它可以帮助你提升前端开发技能。`,
    date: '2023-11-05',
    category: '项目实战',
    tags: ['Vue', '博客', '项目实战'],
    views: 98
  },
  {
    id: 4,
    title: '前端开发技巧',
    content: `# 前端开发技巧

在前端开发中，有很多小技巧可以帮助我们提高开发效率。

## 代码质量工具

### ESLint

ESLint是一个开源的JavaScript代码检查工具，它可以帮助我们发现并修复代码中的问题。

### Prettier

Prettier是一个代码格式化工具，它可以帮助我们保持代码风格的一致性。

## 开发工具

### Vue DevTools

Vue DevTools是一个浏览器扩展，它可以帮助我们调试Vue应用。

### Vite

Vite是一个现代前端构建工具，它提供了极快的开发服务器启动和热模块替换（HMR）功能。

## 性能优化

### 懒加载

懒加载是一种优化技术，它可以延迟加载页面中的某些资源，直到它们被需要时才加载。

### 代码分割

代码分割是一种将代码分成多个小块的技术，这样可以按需加载代码，提高应用的性能。

## 结论

掌握这些前端开发技巧可以帮助你提高开发效率和代码质量。`,
    date: '2023-11-15',
    category: '开发技巧',
    tags: ['前端', '开发技巧'],
    views: 210
  },
  {
    id: 5,
    title: 'JavaScript异步编程',
    content: `# JavaScript异步编程

异步编程是JavaScript中的重要概念，本文介绍了Promise、async/await等异步编程方式。

## Promise

Promise是JavaScript中用于处理异步操作的对象，它代表了一个异步操作的最终完成或失败。

### 基本用法

Promise有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。

### 链式调用

Promise的一个强大特性是可以链式调用，这使得异步代码更加清晰。

## Async/Await

Async/Await是基于Promise的语法糖，它使异步代码看起来像同步代码，更易于理解和维护。

### 基本用法

使用async关键字声明一个异步函数，在函数内部使用await关键字等待Promise解决。

### 错误处理

在async函数中，可以使用try/catch来捕获错误。

## 结论

掌握JavaScript的异步编程是成为一名优秀前端开发者的关键。`,
    date: '2023-12-01',
    category: '前端开发',
    tags: ['JavaScript', '异步编程'],
    views: 175
  },
  {
    id: 6,
    title: 'CSS布局技巧',
    content: `# CSS布局技巧

本文介绍了一些常用的CSS布局技巧，包括Flexbox和Grid布局。

## Flexbox布局

Flexbox是一种一维布局模型，它提供了强大的空间分布和对齐能力。

### 基本概念

Flexbox布局的核心概念是flex容器和flex项目。

### 常用属性

Flexbox布局有许多有用的属性，如flex-direction、justify-content、align-items等。

## Grid布局

Grid是一种二维布局模型，它同时处理行和列。

### 基本概念

Grid布局的核心概念是grid容器和grid项目。

### 常用属性

Grid布局有许多有用的属性，如grid-template-columns、grid-template-rows、grid-gap等。

## 响应式布局

响应式布局是指根据不同的屏幕尺寸调整布局的技术。

### 媒体查询

媒体查询是实现响应式布局的关键技术。

## 结论

掌握这些CSS布局技巧可以帮助你创建更加灵活和响应式的网页布局。`,
    date: '2023-12-15',
    category: '前端开发',
    tags: ['CSS', '布局'],
    views: 145
  }
]

// 生成文章目录
const generateTableOfContents = (content) => {
  const headings = []
  const lines = content.split('\n')

  lines.forEach(line => {
    if (line.startsWith('#')) {
      const level = line.match(/^#+/)[0].length
      const text = line.replace(/^#+\s+/, '')
      const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')

      headings.push({
        level,
        text,
        id
      })
    }
  })

  return headings
}

// 查找相关文章
const findRelatedPosts = (currentPost) => {
  if (!currentPost) return []

  // 根据标签和分类查找相关文章
  return allPosts
    .filter(p => p.id !== currentPost.id) // 排除当前文章
    .filter(p => {
      // 如果有相同的标签或分类，则认为是相关文章
      return p.category === currentPost.category ||
             p.tags.some(tag => currentPost.tags.includes(tag))
    })
    .sort((a, b) => {
      // 计算相关度分数（共同标签数量）
      const aScore = a.tags.filter(tag => currentPost.tags.includes(tag)).length
      const bScore = b.tags.filter(tag => currentPost.tags.includes(tag)).length
      return bScore - aScore
    })
    .slice(0, 3) // 只取前3篇相关文章
}

// 格式化Markdown内容为HTML
const formatContent = (content) => {
  if (!content) return ''

  // 简单的Markdown解析
  let html = content
    // 代码块
    .replace(/```([^`]+)```/g, '<pre class="code-block">$1</pre>')
    // 标题
    .replace(/^# (.+)$/gm, '<h1 id="$1">$1</h1>')
    .replace(/^## (.+)$/gm, '<h2 id="$1">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 id="$1">$1</h3>')
    .replace(/^#### (.+)$/gm, '<h4 id="$1">$1</h4>')
    // 段落
    .replace(/^(?!<h|<pre|<ul|<ol|<li)(.+)$/gm, '<p>$1</p>')
    // 换行符
    .replace(/\n\n/g, '')

  return html
}

// 格式化后的文章内容
const formattedContent = computed(() => {
  return post.value ? formatContent(post.value.content) : ''
})

onMounted(async () => {
  // 模拟从API获取文章详情
  setTimeout(() => {
    const id = parseInt(route.params.id)
    post.value = allPosts.find(p => p.id === id)

    if (!post.value) {
      router.push('/')
      return
    }

    // 生成文章目录
    tableOfContents.value = generateTableOfContents(post.value.content)

    // 查找相关文章
    relatedPosts.value = findRelatedPosts(post.value)

    loading.value = false
  }, 500)
})
</script>

<template>
  <div class="blog-post">
    <div v-if="loading" class="loading">
      <div class="loading-spinner"></div>
      <p>加载中...</p>
    </div>

    <div v-else-if="post" class="post-container fade-in">
      <!-- 文章目录 -->
      <aside class="table-of-contents slide-in-left" v-if="tableOfContents.length > 0">
        <div class="toc-header">
          <Icon icon="mdi:format-list-bulleted" class="toc-icon" />
          <h3>目录</h3>
        </div>
        <nav class="toc-nav">
          <ul>
            <li v-for="heading in tableOfContents" :key="heading.id" :class="`level-${heading.level}`">
              <a :href="`#${heading.id}`" class="toc-link">{{ heading.text }}</a>
            </li>
          </ul>
        </nav>
      </aside>

      <!-- 文章内容 -->
      <article class="post-content fade-in-up">
        <header class="post-header">
          <h1>{{ post.title }}</h1>
          <div class="post-meta">
            <div class="post-info">
              <time class="post-date">
                <Icon icon="mdi:calendar" class="meta-icon" />
                {{ post.date }}
              </time>
              <span class="post-category">
                <Icon icon="mdi:folder" class="meta-icon" />
                <RouterLink :to="`/category/${post.category}`">{{ post.category }}</RouterLink>
              </span>
              <span class="post-views">
                <Icon icon="mdi:eye" class="meta-icon" />
                {{ post.views }} 阅读
              </span>
            </div>
            <div class="post-tags">
              <Icon icon="mdi:tag-multiple" class="meta-icon" />
              <RouterLink
                v-for="tag in post.tags"
                :key="tag"
                :to="`/tag/${tag}`"
                class="post-tag"
              >
                {{ tag }}
              </RouterLink>
            </div>
          </div>
        </header>

        <div class="post-body" v-html="formattedContent"></div>

        <footer class="post-footer">
          <div class="post-navigation">
            <RouterLink to="/" class="back-link">
              <Icon icon="mdi:arrow-left" class="back-icon" />
              返回首页
            </RouterLink>
          </div>

          <!-- 分享按钮 -->
          <div class="post-share">
            <span class="share-label">分享到：</span>
            <div class="share-buttons">
              <a href="#" class="share-button" title="分享到微信">
                <Icon icon="mdi:wechat" />
              </a>
              <a href="#" class="share-button" title="分享到微博">
                <Icon icon="mdi:sina-weibo" />
              </a>
              <a href="#" class="share-button" title="分享到QQ">
                <Icon icon="mdi:qqchat" />
              </a>
            </div>
          </div>
        </footer>
      </article>
    </div>

    <!-- 相关文章 -->
    <div v-if="post && relatedPosts.length > 0" class="related-posts fade-in-up">
      <h2 class="related-title">
        <Icon icon="mdi:link-variant" class="related-icon" />
        相关文章
      </h2>
      <div class="related-list">
        <div v-for="relatedPost in relatedPosts" :key="relatedPost.id" class="related-item">
          <RouterLink :to="`/post/${relatedPost.id}`" class="related-link">
            <h3 class="related-post-title">{{ relatedPost.title }}</h3>
            <div class="related-post-meta">
              <span class="related-post-date">{{ relatedPost.date }}</span>
              <span class="related-post-views">{{ relatedPost.views }} 阅读</span>
            </div>
            <p class="related-post-summary">{{ relatedPost.summary || relatedPost.content.substring(0, 100) + '...' }}</p>
          </RouterLink>
        </div>
      </div>
    </div>

    <div v-else-if="!loading && !post" class="error-message">
      <Icon icon="mdi:alert-circle" class="error-icon" />
      <p>文章不存在或已被删除</p>
      <RouterLink to="/" class="back-link">返回首页</RouterLink>
    </div>
  </div>
</template>

<style scoped>
/* 动画样式 */
.fade-in {
  animation: fadeIn 0.6s ease-out;
}

.slide-in-left {
  animation: slideInLeft 0.6s ease-out 0.2s both;
}

.fade-in-up {
  animation: fadeInUp 0.6s ease-out 0.4s both;
}

/* 动画关键帧 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.blog-post {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 2rem 20px;
  color: #fff;
}

.post-container {
  display: flex;
  gap: 2rem;
}

/* 加载动画 */
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border-top-color: var(--primary-color);
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 文章目录 */
.table-of-contents {
  width: 250px;
  flex-shrink: 0;
  position: sticky;
  top: 100px;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.toc-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.toc-icon {
  margin-right: 0.5rem;
  color: var(--primary-color);
}

.toc-header h3 {
  font-size: 1.2rem;
  color: #fff;
  margin: 0;
}

.toc-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-nav li {
  margin-bottom: 0.5rem;
}

.toc-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s;
  display: block;
  padding: 0.2rem 0;
}

.toc-link:hover {
  color: var(--primary-color);
}

.level-1 {
  font-weight: 600;
}

.level-2 {
  padding-left: 1rem;
}

.level-3 {
  padding-left: 2rem;
  font-size: 0.85rem;
}

.level-4 {
  padding-left: 3rem;
  font-size: 0.8rem;
}

/* 文章内容 */
.post-content {
  flex: 1;
  min-width: 0;
}

.post-header {
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 1rem;
}

h1 {
  margin-bottom: 1rem;
  color: #fff;
  font-size: 2rem;
}

.post-meta {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.post-info {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

.post-date, .post-category, .post-views {
  display: flex;
  align-items: center;
}

.meta-icon {
  margin-right: 0.3rem;
}

.post-category a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.2s;
}

.post-category a:hover {
  color: var(--primary-color);
}

.post-tags {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.post-tag {
  background-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  padding: 0.2rem 0.6rem;
  border-radius: 3px;
  font-size: 0.8rem;
  text-decoration: none;
  transition: background-color 0.3s;
}

.post-tag:hover {
  background-color: var(--primary-color);
  color: white;
}

/* 文章正文 */
.post-body {
  line-height: 1.8;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.9);
}

.post-body h1, .post-body h2, .post-body h3, .post-body h4 {
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #fff;
}

.post-body h1 {
  font-size: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 0.5rem;
}

.post-body h2 {
  font-size: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 0.3rem;
}

.post-body h3 {
  font-size: 1.3rem;
}

.post-body h4 {
  font-size: 1.1rem;
}

.post-body p {
  margin-bottom: 1.5rem;
}

.post-body .code-block {
  background-color: rgba(0, 0, 0, 0.3);
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  margin: 1.5rem 0;
  font-family: monospace;
  white-space: pre;
}

/* 文章底部 */
.post-footer {
  margin-top: 3rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.post-navigation {
  display: flex;
}

.back-link {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.3s;
}

.back-icon {
  margin-right: 0.3rem;
}

.back-link:hover {
  background-color: var(--primary-color);
}

.post-share {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.share-label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

.share-buttons {
  display: flex;
  gap: 0.5rem;
}

.share-button {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.3s;
}

.share-button:hover {
  background-color: var(--primary-color);
  color: white;
  transform: translateY(-2px);
}

/* 相关文章 */
.related-posts {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.related-title {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #fff;
}

.related-icon {
  margin-right: 0.5rem;
  color: var(--primary-color);
}

.related-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.related-item {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.related-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255, 0.08);
}

.related-link {
  display: block;
  padding: 1.5rem;
  text-decoration: none;
  color: inherit;
}

.related-post-title {
  font-size: 1.2rem;
  margin-bottom: 0.75rem;
  color: #fff;
  transition: color 0.3s;
}

.related-link:hover .related-post-title {
  color: var(--primary-color);
}

.related-post-meta {
  display: flex;
  justify-content: space-between;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
  margin-bottom: 0.75rem;
}

.related-post-summary {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 错误信息 */
.error-message {
  text-align: center;
  padding: 3rem 0;
  color: #ff6b6b;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.error-icon {
  font-size: 3rem;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .post-container {
    flex-direction: column;
  }

  .table-of-contents {
    width: 100%;
    position: static;
    margin-bottom: 2rem;
  }

  .related-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .post-footer {
    flex-direction: column;
    align-items: flex-start;
  }

  .post-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  h1 {
    font-size: 1.8rem;
  }

  .post-body h1 {
    font-size: 1.8rem;
  }

  .post-body h2 {
    font-size: 1.4rem;
  }

  .post-body h3 {
    font-size: 1.2rem;
  }
}
</style>
