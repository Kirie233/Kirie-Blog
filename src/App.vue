<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import ProfileCard from './components/ProfileCard.vue'
import LoadingBar from './components/LoadingBar.vue'

const router = useRouter()
const searchQuery = ref('')

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      name: 'search',
      query: { q: searchQuery.value.trim() }
    })
    searchQuery.value = ''
  }
}
</script>

<template>
  <div class="dark-app flex flex-col min-h-screen w-full max-w-full overflow-x-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative">
    <!-- 暗色主题背景装饰 -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="dark-app-pattern absolute inset-0"></div>
    </div>

    <!-- 页面加载进度条 -->
    <LoadingBar />

    <!-- 暗色主题导航栏 -->
    <header class="dark-navbar sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-purple-500/20 shadow-lg shadow-purple-500/10">
      <div class="container mx-auto px-5 py-2">
        <div class="flex items-center justify-between">
          <div>
            <RouterLink to="/" class="flex items-center no-underline">
              <span class="text-xl font-bold text-white">Kirie的个人博客</span>
            </RouterLink>
          </div>

          <nav class="flex items-center gap-6">
            <RouterLink to="/" class="dark-nav-link flex items-center text-gray-300 hover:text-purple-400 text-sm font-medium transition-all duration-300 px-3 py-2 rounded-lg hover:bg-purple-500/10">
              <Icon icon="mdi:home" class="mr-1 text-xl" />
              <span>首页</span>
            </RouterLink>
            <RouterLink to="/archive" class="dark-nav-link flex items-center text-gray-300 hover:text-blue-400 text-sm font-medium transition-all duration-300 px-3 py-2 rounded-lg hover:bg-blue-500/10">
              <Icon icon="mdi:archive" class="mr-1 text-xl" />
              <span>归档</span>
            </RouterLink>
            <RouterLink to="/about" class="dark-nav-link flex items-center text-gray-300 hover:text-green-400 text-sm font-medium transition-all duration-300 px-3 py-2 rounded-lg hover:bg-green-500/10">
              <Icon icon="mdi:information" class="mr-1 text-xl" />
              <span>关于</span>
            </RouterLink>
            <RouterLink to="/guestbook" class="dark-nav-link flex items-center text-gray-300 hover:text-pink-400 text-sm font-medium transition-all duration-300 px-3 py-2 rounded-lg hover:bg-pink-500/10">
              <Icon icon="mdi:message-text" class="mr-1 text-xl" />
              <span>留言板</span>
            </RouterLink>
          </nav>

          <form @submit.prevent="handleSearch" class="dark-search-form flex items-center bg-gray-800/50 border border-gray-700/50 rounded-full px-4 py-2 backdrop-blur-sm hover:bg-gray-700/50 transition-all duration-300">
            <Icon icon="mdi:magnify" class="text-gray-400 mr-2" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="搜索..."
              class="bg-transparent border-none text-white placeholder-gray-400 outline-none w-32 text-sm"
            >
          </form>
        </div>
      </div>
    </header>

    <!-- 主要内容区域 - 暗色主题 -->
    <main class="flex-1 w-full flex justify-center relative z-10">
      <div class="flex w-full max-w-7xl mx-auto gap-8 p-5">
        <div class="flex-1 min-w-0 text-white">
          <RouterView />
        </div>

        <!-- 右侧个人资料区域 -->
        <aside class="w-72 flex-shrink-0 hidden lg:block">
          <ProfileCard />
        </aside>
      </div>
    </main>

    <!-- 暗色主题页脚 -->
    <footer class="dark-footer bg-gray-900/80 backdrop-blur-md text-white py-8 border-t border-purple-500/20 relative z-10">
      <div class="container mx-auto px-5">
        <div class="flex flex-col items-center text-center">
          <p class="text-gray-300 mb-3">© {{ new Date().getFullYear() }} Kirie的个人博客 | 使用 Vue 3 构建</p>
          <div class="flex gap-6 mt-2">
            <a href="#" class="dark-footer-link text-gray-400 hover:text-purple-400 text-sm transition-all duration-300 hover:scale-105">关于</a>
            <a href="#" class="dark-footer-link text-gray-400 hover:text-blue-400 text-sm transition-all duration-300 hover:scale-105">隐私</a>
            <a href="#" class="dark-footer-link text-gray-400 hover:text-green-400 text-sm transition-all duration-300 hover:scale-105">条款</a>
            <a href="#" class="dark-footer-link text-gray-400 hover:text-pink-400 text-sm transition-all duration-300 hover:scale-105">联系我们</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
:root {
  --primary-color: #8b5cf6;
  --secondary-color: #3b82f6;
  --accent-color: #06b6d4;
  --success-color: #10b981;
}

/* 暗色主题整体样式 */
.dark-app {
  position: relative;
  overflow-x: hidden;
}

/* 高性能背景图案 */
.dark-app-pattern {
  background-image:
    radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.03) 0%, transparent 50%);
  animation: appPatternPulse 8s ease-in-out infinite;
  will-change: opacity;
  transform: translateZ(0);
}

/* 高性能导航栏动画 */
.dark-navbar {
  animation: navSlideIn 0.6s ease-out;
  position: relative;
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
}

.dark-navbar::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.4), transparent);
  animation: navGlow 4s ease-in-out infinite;
  will-change: opacity;
  transform: translateZ(0);
}

/* 高性能导航链接 */
.dark-nav-link {
  position: relative;
  overflow: hidden;
  will-change: transform;
  transform: translateZ(0);
}

.dark-nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent);
  transition: left 0.2s ease;
  will-change: transform;
  transform: translateZ(0);
}

.dark-nav-link:hover::before {
  left: 100%;
}

/* 暗色搜索框 */
.dark-search-form:focus-within {
  border-color: rgba(139, 92, 246, 0.5);
  box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2);
  transition: all 0.2s ease;
}

/* 高性能页脚 */
.dark-footer {
  animation: footerFadeIn 0.6s ease-out 0.3s both;
  will-change: transform;
  transform: translateZ(0);
}

.dark-footer-link {
  position: relative;
  will-change: transform;
  transform: translateZ(0);
}

.dark-footer-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: currentColor;
  transition: width 0.2s ease;
  will-change: transform;
  transform: translateZ(0);
}

.dark-footer-link:hover::after {
  width: 100%;
}

/* 活跃路由样式 */
.router-link-active {
  color: var(--primary-color) !important;
  background: rgba(139, 92, 246, 0.1) !important;
}

/* 暗色主题动画关键帧 */
@keyframes darkAppPattern {
  0%, 100% {
    transform: scale(1) rotate(0deg);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.1) rotate(180deg);
    opacity: 0.6;
  }
}

@keyframes darkSlideInDown {
  0% {
    opacity: 0;
    transform: translateY(-50px);
    filter: blur(2px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

@keyframes darkNavGlow {
  0%, 100% {
    opacity: 0.3;
    transform: scaleX(0.5);
  }
  50% {
    opacity: 1;
    transform: scaleX(1);
  }
}

@keyframes darkFadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
    filter: blur(1px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}
</style>



