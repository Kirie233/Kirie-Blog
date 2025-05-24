<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 30 }"
    :enter="{
      opacity: 1,
      y: 0,
      transition: {
        duration: 500,
        ease: 'easeOut'
      }
    }"
    class="welcome-banner relative h-80 rounded-xl overflow-hidden mb-12 border border-purple-500/20"
  >
    <!-- 背景层 -->
    <div
      v-motion
      :initial="{ scale: 1.05, opacity: 0 }"
      :enter="{
        scale: 1,
        opacity: 1,
        transition: {
          duration: 600,
          ease: 'easeOut',
          delay: 100
        }
      }"
      class="banner-background absolute inset-0"
    >
      <!-- 背景图片 -->
      <img
        src="/src/assets/anime-background.jpg"
        alt="背景"
        class="w-full h-full object-cover filter brightness-75"
      />
      <!-- 暗色遮罩 -->
      <div class="absolute inset-0 bg-gradient-to-br from-gray-900/85 via-black/75 to-gray-800/85"></div>

      <!-- 简化的装饰粒子 -->
      <div class="absolute inset-0 pointer-events-none">
        <div
          v-for="i in 3"
          :key="i"
          v-motion
          :initial="{ opacity: 0, scale: 0 }"
          :enter="{
            opacity: 0.6,
            scale: 1,
            transition: {
              duration: 800,
              ease: 'easeOut',
              delay: 300 + i * 200
            }
          }"
          class="absolute w-1 h-1 rounded-full bg-purple-400/40 animate-pulse"
          :style="{
            left: `${20 + (i * 30)}%`,
            top: `${30 + (i * 15)}%`
          }"
        ></div>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="banner-content relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
      <!-- 主标题 -->
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
        <span
          v-motion
          :initial="{ opacity: 0, y: -20 }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: {
              duration: 400,
              ease: 'easeOut',
              delay: 200
            }
          }"
          class="block text-white drop-shadow-lg"
        >
          Hello!
        </span>
        <span
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: {
              duration: 400,
              ease: 'easeOut',
              delay: 350
            }
          }"
          class="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg"
        >
          欢迎来到Kirie的个人博客
        </span>
      </h1>

      <!-- 装饰线 -->
      <div
        v-motion
        :initial="{ scaleX: 0, opacity: 0 }"
        :enter="{
          scaleX: 1,
          opacity: 1,
          transition: {
            duration: 500,
            ease: 'easeOut',
            delay: 500
          }
        }"
        class="w-32 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 mb-6 rounded-full"
      ></div>

      <!-- 副标题 -->
      <p
        v-motion
        :initial="{ opacity: 0, y: 15 }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            duration: 400,
            ease: 'easeOut',
            delay: 650
          }
        }"
        class="text-lg md:text-xl text-gray-300 mb-8 flex items-center justify-center"
      >
        <span
          v-motion
          :initial="{ scale: 0, rotate: -90 }"
          :enter="{
            scale: 1,
            rotate: 0,
            transition: {
              duration: 400,
              ease: 'easeOut',
              delay: 800
            }
          }"
          :hover="{
            scale: 1.2,
            rotate: 180,
            transition: { duration: 200 }
          }"
          class="inline-block mr-2 cursor-pointer"
        >
          ✨
        </span>
        <span>自由，步伐小也罢，直在前进就好</span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

// 性能优化：控制动画状态
const isAnimationComplete = ref(false)

onMounted(() => {
  // 预加载背景图片以提升性能
  const img = new Image()
  img.src = '/src/assets/anime-background.jpg'

  // 设置动画完成标记，避免重复渲染
  setTimeout(() => {
    isAnimationComplete.value = true
  }, 1000) // 总动画时间约1秒
})
</script>

<style scoped>
/* 优化的横幅基础样式 */
.welcome-banner {
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(139, 92, 246, 0.1);
  backdrop-filter: blur(8px);
  will-change: transform, opacity; /* 性能优化 */
}

/* 背景图片优化 */
.banner-background img {
  will-change: transform; /* 性能优化 */
}

/* 响应式优化 */
@media (max-width: 768px) {
  .welcome-banner {
    height: 300px;
  }

  .banner-content h1 {
    font-size: 2.5rem;
  }
}

@media (max-width: 480px) {
  .welcome-banner {
    height: 250px;
  }

  .banner-content h1 {
    font-size: 2rem;
  }

  .banner-content p {
    font-size: 1rem;
  }
}

/* 减少重绘的优化 */
.banner-content * {
  transform: translateZ(0); /* 启用硬件加速 */
}
</style>
