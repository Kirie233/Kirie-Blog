<script setup>
import { ref, onMounted, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { usePageTitle } from '@/composables/usePageTitle'
import WelcomeBanner from '@/components/WelcomeBanner.vue'

// 设置页面标题
usePageTitle('首页')

// 模拟博客文章数据
const posts = ref([])
const loading = ref(true)

// 获取最新的文章
const latestPosts = computed(() => {
  return [...posts.value].sort((a, b) => new Date(b.date) - new Date(a.date))
})

onMounted(() => {
  // 这里之后会替换为API调用
  setTimeout(() => {
    posts.value = [
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
    loading.value = false
  }, 500)
})
</script>

<template>
  <div class="dark-blog-home min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative">
    <!-- 简化的背景装饰 -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="simple-bg-pattern absolute inset-0"></div>
    </div>

    <div class="w-full max-w-4xl mx-auto px-4 py-8 relative z-10">
    <!-- 欢迎横幅组件 -->
    <WelcomeBanner />

    <!-- 文章列表标题 -->
    <h2 class="text-2xl font-bold text-white mb-6 pb-2 border-b border-white/10">POST</h2>

    <!-- 文章列表 -->
    <div class="space-y-6">
      <!-- 文章卡片 -->
      <div v-if="loading" class="loading fade-in">
        <div class="loading-spinner"></div>
        <p>加载中...</p>
      </div>

      <div
        v-else
        v-for="(post, index) in latestPosts"
        :key="post.id"
        class="simple-post-card bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6 transition-all duration-200 hover:bg-gray-700/60 hover:border-purple-500/30"
        :style="{ animationDelay: `${index * 0.05}s` }"
      >
        <h3 class="text-xl font-semibold mb-3">
          <RouterLink :to="`/post/${post.id}`" class="text-white hover:text-primary transition-colors">{{ post.title }}</RouterLink>
        </h3>
        <div class="flex items-center flex-wrap gap-4 mb-4 text-sm text-white/60">
          <span>{{ post.date }}</span>
          <RouterLink to="/category/前端开发" class="flex items-center hover:text-primary transition-colors">
            <span class="w-2 h-2 rounded-full bg-blue-400 mr-2"></span>
            前端开发
          </RouterLink>
          <div class="flex flex-wrap gap-2">
            <RouterLink
              v-for="tag in post.tags"
              :key="tag"
              :to="`/tag/${tag}`"
              class="flex items-center hover:text-primary transition-colors"
            >
              <span class="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
              {{ tag }}
            </RouterLink>
          </div>
        </div>
        <p class="text-white/80 mb-4">
          {{ post.summary }}
        </p>
        <div class="flex justify-between items-center">
          <RouterLink :to="`/post/${post.id}`" class="text-primary hover:underline text-sm flex items-center">
            阅读全文
            <Icon icon="mdi:arrow-right" class="ml-1 text-xs" />
          </RouterLink>
          <div class="flex items-center gap-3 text-white/60 text-sm">
            <span class="flex items-center">
              <Icon icon="mdi:eye" class="mr-1" />
              {{ Math.floor(Math.random() * 200) + 50 }}
            </span>
            <span class="flex items-center">
              <Icon icon="mdi:message-text-outline" class="mr-1" />
              {{ Math.floor(Math.random() * 30) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 分类和标签云已移至个人资料组件中 -->
    </div>
  </div>
</template>

<style scoped>
/* 暗色主题整体背景 */
.dark-blog-home {
  position: relative;
  overflow-x: hidden;
}

/* 简化的背景图案 */
.simple-bg-pattern {
  background-image:
    radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.05) 0%, transparent 50%);
  opacity: 0.6;
}

/* 简化的文章卡片 */
.simple-post-card {
  position: relative;
  will-change: transform;
}

/* 简化的标签 */
.simple-tag {
  position: relative;
  will-change: transform;
}

/* 横幅相关样式已移至WelcomeBanner组件 */



/* 简化的动画样式 */
.fade-in {
  animation: simpleFadeIn 0.4s ease-out;
}

.simple-post-card {
  animation: simpleSlideUp 0.4s ease-out both;
}

.simple-categories-tags-section {
  animation: simpleFadeIn 0.4s ease-out 0.2s both;
}

/* 简化的动画关键帧 */
@keyframes simpleFadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes simpleSlideUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式优化 */
@media (max-width: 768px) {
  .welcome-banner {
    height: 300px;
  }

  .main-title {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .welcome-banner {
    height: 250px;
  }

  .main-title {
    font-size: 2rem;
  }
}

/* 动画关键帧 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
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

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}


</style>
