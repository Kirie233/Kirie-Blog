<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const tag = computed(() => route.params.tag)
const posts = ref([])
const loading = ref(true)

// 模拟博客文章数据
const allPosts = [
  {
    id: 1,
    title: '我的第一篇博客',
    summary: '这是我的第一篇博客文章，介绍了Vue.js的基础知识和使用方法。Vue.js是一个非常棒的前端框架，它使得构建交互式用户界面变得简单而有趣。',
    date: '2023-10-15',
    category: '前端开发',
    tags: ['Vue', '前端', '入门']
  },
  {
    id: 2,
    title: 'Vue 3学习笔记',
    summary: 'Vue 3的Composition API使用体验非常好。相比于Vue 2的Options API，Composition API提供了更好的代码组织方式，使得代码更加清晰、易于维护。',
    date: '2023-10-20',
    category: '前端开发',
    tags: ['Vue', '学习笔记']
  },
  {
    id: 3,
    title: '如何构建个人博客',
    summary: '使用Vue 3和Vite构建个人博客是一个很好的学习项目。通过这个项目，你可以学习到Vue 3的各种特性，以及如何使用Vite进行项目构建。',
    date: '2023-11-05',
    category: '项目实战',
    tags: ['Vue', '博客', '项目实战']
  },
  {
    id: 4,
    title: '前端开发技巧',
    summary: '在前端开发中，有很多小技巧可以帮助我们提高开发效率。例如，使用ESLint和Prettier可以帮助我们保持代码风格的一致性。',
    date: '2023-11-15',
    category: '开发技巧',
    tags: ['前端', '开发技巧']
  },
  {
    id: 5,
    title: 'JavaScript异步编程',
    summary: '异步编程是JavaScript中的重要概念，本文介绍了Promise、async/await等异步编程方式。',
    date: '2023-12-01',
    category: '前端开发',
    tags: ['JavaScript', '异步编程']
  },
  {
    id: 6,
    title: 'CSS布局技巧',
    summary: '本文介绍了一些常用的CSS布局技巧，包括Flexbox和Grid布局。',
    date: '2023-12-15',
    category: '前端开发',
    tags: ['CSS', '布局']
  }
]

// 获取所有标签
const allTags = computed(() => {
  const tags = {}
  allPosts.forEach(post => {
    post.tags.forEach(t => {
      if (!tags[t]) {
        tags[t] = 0
      }
      tags[t]++
    })
  })
  return tags
})

onMounted(() => {
  // 模拟API请求延迟
  setTimeout(() => {
    posts.value = allPosts.filter(post => post.tags.includes(tag.value))
    loading.value = false
  }, 500)
})
</script>

<template>
  <div class="tag-page">
    <div class="tag-header">
      <h1>标签: {{ tag }}</h1>
      <p class="tag-description">
        查看所有包含 "{{ tag }}" 标签的文章
      </p>
    </div>

    <!-- 加载中 -->
    <div v-if="loading" class="loading">
      <div class="loading-spinner"></div>
      <p>加载中...</p>
    </div>

    <!-- 文章列表 -->
    <div v-else-if="posts.length > 0" class="posts-list">
      <div v-for="post in posts" :key="post.id" class="post-card">
        <h2 class="post-title">
          <RouterLink :to="`/post/${post.id}`">{{ post.title }}</RouterLink>
        </h2>
        <div class="post-meta">
          <span class="post-date">{{ post.date }}</span>
          <RouterLink :to="`/category/${post.category}`" class="post-category">
            {{ post.category }}
          </RouterLink>
          <div class="post-tags">
            <RouterLink 
              v-for="t in post.tags" 
              :key="t" 
              :to="`/tag/${t}`" 
              class="post-tag"
              :class="{ active: t === tag }"
            >
              {{ t }}
            </RouterLink>
          </div>
        </div>
        <p class="post-summary">{{ post.summary }}</p>
        <RouterLink :to="`/post/${post.id}`" class="read-more">
          阅读全文
          <Icon icon="mdi:arrow-right" class="arrow" />
        </RouterLink>
      </div>
    </div>

    <!-- 无文章 -->
    <div v-else class="no-posts">
      <Icon icon="mdi:tag-outline" class="no-posts-icon" />
      <p>该标签下暂无文章</p>
    </div>

    <!-- 标签云 -->
    <div class="tag-cloud">
      <h2>标签云</h2>
      <div class="tags-list">
        <RouterLink 
          v-for="(count, t) in allTags" 
          :key="t" 
          :to="`/tag/${t}`" 
          class="tag-item"
          :class="{ active: t === tag }"
        >
          {{ t }} ({{ count }})
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tag-page {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 20px;
  color: #fff;
}

.tag-header {
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 1rem;
}

h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #fff;
}

.tag-description {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
}

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

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 3rem;
}

.post-card {
  padding: 1.5rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255, 0.08);
}

.post-title {
  margin-bottom: 0.75rem;
}

.post-title a {
  color: #fff;
  text-decoration: none;
  transition: color 0.3s;
  font-size: 1.4rem;
}

.post-title a:hover {
  color: var(--primary-color);
}

.post-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}

.post-date {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

.post-category {
  background-color: rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.9);
  padding: 0.2rem 0.6rem;
  border-radius: 3px;
  font-size: 0.8rem;
  text-decoration: none;
  transition: background-color 0.3s;
}

.post-category:hover {
  background-color: var(--primary-color);
  color: white;
}

.post-tags {
  display: flex;
  gap: 0.5rem;
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

.post-tag.active {
  background-color: var(--primary-color);
  color: white;
}

.post-summary {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.read-more {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  transition: gap 0.3s;
}

.read-more:hover {
  gap: 0.5rem;
}

.arrow {
  transition: transform 0.3s;
}

.read-more:hover .arrow {
  transform: translateX(3px);
}

.no-posts {
  text-align: center;
  padding: 3rem 0;
  margin-bottom: 3rem;
}

.no-posts-icon {
  font-size: 4rem;
  color: rgba(255, 255, 255, 0.3);
  margin-bottom: 1rem;
}

.no-posts p {
  color: rgba(255, 255, 255, 0.7);
}

.tag-cloud {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.tag-cloud h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.tag-item {
  background-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.tag-item:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.tag-item.active {
  background-color: var(--primary-color);
  color: white;
}

@media (max-width: 768px) {
  .post-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .post-title a {
    font-size: 1.2rem;
  }
}
</style>
