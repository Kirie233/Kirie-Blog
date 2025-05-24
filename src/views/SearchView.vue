<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const searchQuery = ref('')
const searchResults = ref([])
const loading = ref(false)
const noResults = ref(false)

// 模拟博客文章数据
const allPosts = [
  {
    id: 1,
    title: '我的第一篇博客',
    summary: '这是我的第一篇博客文章，介绍了Vue.js的基础知识和使用方法。Vue.js是一个非常棒的前端框架，它使得构建交互式用户界面变得简单而有趣。',
    content: '这是我的第一篇博客文章的详细内容。Vue.js是一个非常棒的前端框架，它使得构建交互式用户界面变得简单而有趣。\n\n通过组件化的开发方式，我们可以更好地组织代码，提高代码的可维护性和复用性。',
    date: '2023-10-15',
    tags: ['Vue', '前端', '入门']
  },
  {
    id: 2,
    title: 'Vue 3学习笔记',
    summary: 'Vue 3的Composition API使用体验非常好。相比于Vue 2的Options API，Composition API提供了更好的代码组织方式，使得代码更加清晰、易于维护。',
    content: 'Vue 3的Composition API使用体验非常好。相比于Vue 2的Options API，Composition API提供了更好的代码组织方式，使得代码更加清晰、易于维护。\n\n此外，Vue 3的性能也有了显著提升，这得益于其重写的响应式系统和虚拟DOM算法。',
    date: '2023-10-20',
    tags: ['Vue', '学习笔记']
  },
  {
    id: 3,
    title: '如何构建个人博客',
    summary: '使用Vue 3和Vite构建个人博客是一个很好的学习项目。通过这个项目，你可以学习到Vue 3的各种特性，以及如何使用Vite进行项目构建。',
    content: '使用Vue 3和Vite构建个人博客是一个很好的学习项目。通过这个项目，你可以学习到Vue 3的各种特性，以及如何使用Vite进行项目构建。\n\n个人博客项目涉及到路由管理、状态管理、组件设计等多个方面，是一个综合性的练习。',
    date: '2023-11-05',
    tags: ['Vue', '博客', '项目实战']
  },
  {
    id: 4,
    title: '前端开发技巧',
    summary: '在前端开发中，有很多小技巧可以帮助我们提高开发效率。例如，使用ESLint和Prettier可以帮助我们保持代码风格的一致性。',
    content: '在前端开发中，有很多小技巧可以帮助我们提高开发效率。例如，使用ESLint和Prettier可以帮助我们保持代码风格的一致性；使用Vue DevTools可以帮助我们调试Vue应用；使用Vite的HMR功能可以提高开发效率。\n\n此外，合理使用Vue的计算属性和侦听器也可以使代码更加清晰、高效。',
    date: '2023-11-15',
    tags: ['前端', '开发技巧']
  }
]

// 搜索函数
const performSearch = (query) => {
  if (!query) {
    searchResults.value = []
    noResults.value = false
    return
  }

  loading.value = true
  
  // 模拟API请求延迟
  setTimeout(() => {
    const q = query.toLowerCase()
    const results = allPosts.filter(post => 
      post.title.toLowerCase().includes(q) || 
      post.summary.toLowerCase().includes(q) || 
      post.content.toLowerCase().includes(q) ||
      post.tags.some(tag => tag.toLowerCase().includes(q))
    )
    
    searchResults.value = results
    noResults.value = results.length === 0
    loading.value = false
  }, 500)
}

// 初始化搜索
onMounted(() => {
  if (route.query.q) {
    searchQuery.value = route.query.q
    performSearch(searchQuery.value)
  }
})

// 监听路由变化
watch(() => route.query.q, (newQuery) => {
  if (newQuery) {
    searchQuery.value = newQuery
    performSearch(searchQuery.value)
  }
})

// 提交搜索
const submitSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      name: 'search',
      query: { q: searchQuery.value.trim() }
    })
  }
}
</script>

<template>
  <div class="search-page">
    <div class="search-header">
      <h1>搜索结果</h1>
      
      <!-- 搜索框 -->
      <div class="search-form-container">
        <form @submit.prevent="submitSearch" class="search-form">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="输入关键词搜索..." 
            class="search-input"
          >
          <button type="submit" class="search-button">
            <Icon icon="mdi:magnify" class="search-icon" />
            搜索
          </button>
        </form>
      </div>
      
      <!-- 搜索结果摘要 -->
      <div v-if="searchQuery" class="search-summary">
        <p>
          <span v-if="loading">正在搜索 "{{ searchQuery }}"...</span>
          <span v-else-if="noResults">未找到与 "{{ searchQuery }}" 相关的结果</span>
          <span v-else>找到 {{ searchResults.length }} 条与 "{{ searchQuery }}" 相关的结果</span>
        </p>
      </div>
    </div>

    <!-- 加载中 -->
    <div v-if="loading" class="loading">
      <div class="loading-spinner"></div>
      <p>正在搜索...</p>
    </div>

    <!-- 搜索结果列表 -->
    <div v-else-if="searchResults.length > 0" class="search-results">
      <div v-for="post in searchResults" :key="post.id" class="search-result-item">
        <h2 class="result-title">
          <RouterLink :to="`/post/${post.id}`">{{ post.title }}</RouterLink>
        </h2>
        <div class="result-meta">
          <span class="result-date">{{ post.date }}</span>
          <div class="result-tags">
            <RouterLink 
              v-for="tag in post.tags" 
              :key="tag" 
              :to="`/tag/${tag}`" 
              class="result-tag"
            >
              {{ tag }}
            </RouterLink>
          </div>
        </div>
        <p class="result-summary">{{ post.summary }}</p>
        <RouterLink :to="`/post/${post.id}`" class="read-more">
          阅读全文
          <Icon icon="mdi:arrow-right" class="arrow" />
        </RouterLink>
      </div>
    </div>

    <!-- 无搜索结果 -->
    <div v-else-if="noResults" class="no-results">
      <Icon icon="mdi:file-search-outline" class="no-results-icon" />
      <p>未找到与 "{{ searchQuery }}" 相关的内容</p>
      <p class="no-results-tips">建议：</p>
      <ul>
        <li>检查您的拼写</li>
        <li>尝试使用不同的关键词</li>
        <li>尝试使用更通用的关键词</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.search-page {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 20px;
  color: #fff;
}

.search-header {
  margin-bottom: 2rem;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #fff;
}

.search-form-container {
  margin-bottom: 1.5rem;
}

.search-form {
  display: flex;
  max-width: 600px;
}

.search-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px 0 0 6px;
  background-color: rgba(255, 255, 255, 0.05);
  color: #fff;
  font-size: 1rem;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.search-button {
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 0 6px 6px 0;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-button:hover {
  background-color: #ff8ba3;
}

.search-icon {
  margin-right: 0.5rem;
}

.search-summary {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
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

.search-results {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.search-result-item {
  padding: 1.5rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.search-result-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255, 0.08);
}

.result-title {
  margin-bottom: 0.75rem;
}

.result-title a {
  color: #fff;
  text-decoration: none;
  transition: color 0.3s;
  font-size: 1.4rem;
}

.result-title a:hover {
  color: var(--primary-color);
}

.result-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}

.result-date {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

.result-tags {
  display: flex;
  gap: 0.5rem;
}

.result-tag {
  background-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  padding: 0.2rem 0.6rem;
  border-radius: 3px;
  font-size: 0.8rem;
  text-decoration: none;
  transition: background-color 0.3s;
}

.result-tag:hover {
  background-color: var(--primary-color);
  color: white;
}

.result-summary {
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

.no-results {
  text-align: center;
  padding: 3rem 0;
}

.no-results-icon {
  font-size: 4rem;
  color: rgba(255, 255, 255, 0.3);
  margin-bottom: 1rem;
}

.no-results p {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1.5rem;
}

.no-results-tips {
  font-weight: 600;
  color: var(--primary-color);
}

.no-results ul {
  list-style-type: disc;
  text-align: left;
  max-width: 300px;
  margin: 0 auto;
  color: rgba(255, 255, 255, 0.7);
}

.no-results li {
  margin-bottom: 0.5rem;
}

@media (max-width: 768px) {
  .search-form {
    flex-direction: column;
  }
  
  .search-input {
    border-radius: 6px;
    margin-bottom: 0.5rem;
  }
  
  .search-button {
    border-radius: 6px;
    justify-content: center;
  }
  
  .result-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
