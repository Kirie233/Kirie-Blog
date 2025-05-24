<script setup>
import { ref, onMounted } from 'vue'

// 模拟博客文章数据
const posts = ref([])

onMounted(() => {
  // 这里之后会替换为API调用
  posts.value = [
    {
      id: 1,
      title: '我的第一篇博客',
      summary: '这是我的第一篇博客文章...',
      date: '2023-10-15'
    },
    {
      id: 2,
      title: 'Vue 3学习笔记',
      summary: 'Vue 3的Composition API使用体验...',
      date: '2023-10-20'
    },
    {
      id: 3,
      title: '如何构建个人博客',
      summary: '使用Vue 3和Vite构建个人博客的经验分享...',
      date: '2023-11-05'
    },
    {
      id: 4,
      title: '前端开发技巧',
      summary: '提高前端开发效率的一些小技巧...',
      date: '2023-11-15'
    }
  ]
})

// 按年份和月份组织文章
const getArchiveData = () => {
  const archiveData = {}

  posts.value.forEach(post => {
    const date = new Date(post.date)
    const year = date.getFullYear()
    const month = date.getMonth() + 1

    if (!archiveData[year]) {
      archiveData[year] = {}
    }

    if (!archiveData[year][month]) {
      archiveData[year][month] = []
    }

    archiveData[year][month].push(post)
  })

  return archiveData
}
</script>

<template>
  <div class="archive-page">
    <h1>文章归档</h1>

    <div class="archive-content">
      <template v-for="(months, year) in getArchiveData()" :key="year">
        <div class="year-section">
          <h2 class="year-title">{{ year }}年</h2>

          <div v-for="(posts, month) in months" :key="`${year}-${month}`" class="month-section">
            <h3 class="month-title">{{ month }}月</h3>

            <ul class="post-list">
              <li v-for="post in posts" :key="post.id" class="post-item">
                <span class="post-date">{{ post.date }}</span>
                <RouterLink :to="`/post/${post.id}`" class="post-title">{{ post.title }}</RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.archive-page {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 2rem 20px;
  color: #fff;
  background-color: var(--background-color);
}

h1 {
  margin-bottom: 2rem;
  color: #fff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 0.5rem;
  font-size: 1.8rem;
}

.year-section {
  margin-bottom: 2rem;
}

.year-title {
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.month-section {
  margin-left: 1.5rem;
  margin-bottom: 1.5rem;
}

.month-title {
  font-size: 1.2rem;
  margin-bottom: 0.8rem;
  color: rgba(255, 255, 255, 0.9);
}

.post-list {
  list-style: none;
  margin-left: 1rem;
}

.post-item {
  margin-bottom: 0.8rem;
  display: flex;
  align-items: baseline;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.post-date {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  margin-right: 1rem;
  min-width: 90px;
}

.post-title {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  transition: color 0.2s;
}

.post-title:hover {
  color: var(--primary-color);
}
</style>
