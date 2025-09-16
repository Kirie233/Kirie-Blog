<script setup>
import { Icon } from '@iconify/vue'
import { onMounted, ref } from 'vue'
import avatarImage from '@/assets/avatar.jpg'
import qqQrImage from '@/assets/qq-qrcode.png'
import wxQrImage from '@/assets/wx-qrcode.png'

// 性能优化：控制动画状态
const isAnimationComplete = ref(false)

// 个人信息数据
const personalInfo = [
  { text: '前端开发', class: '' },
  { text: '2020-2024级', class: '' },
  { text: '中国-天津', icon: 'mdi:map-marker', class: 'flex items-center justify-center' },
  { text: '前端: Vue 3 + Vite + Tailwind CSS', class: '' },
  { text: '后端: Node.js + Express + MySQL', class: '' },
  { text: 'w2245673995@outlook.com', icon: 'mdi:email', class: 'flex items-center justify-center' }
]

// 分类数据
const categories = [
  { name: '前端开发', count: 4, color: 'bg-purple-500/20 border-purple-500/30 text-purple-300' },
  { name: '项目实战', count: 1, color: 'bg-blue-500/20 border-blue-500/30 text-blue-300' },
  { name: '开发技巧', count: 1, color: 'bg-green-500/20 border-green-500/30 text-green-300' }
]

// 标签数据
const tags = [
  { name: 'Vue', count: 3, color: 'bg-green-500/20 border-green-500/30 text-green-300' },
  { name: '前端', count: 2, color: 'bg-blue-500/20 border-blue-500/30 text-blue-300' },
  { name: '入门', count: 1, color: 'bg-purple-500/20 border-purple-500/30 text-purple-300' },
  { name: 'JavaScript', count: 1, color: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300' },
  { name: 'CSS', count: 1, color: 'bg-orange-500/20 border-orange-500/30 text-orange-300' }
]

// 技能数据
const skills = [
  { name: 'Vue.js', class: 'bg-purple-500/20 border border-purple-500/30 text-purple-300' },
  { name: 'Node.js', class: 'bg-green-500/20 border border-green-500/30 text-green-300' },
  { name: 'JavaScript', class: 'bg-yellow-500/20 border border-yellow-500/30 text-yellow-300' },
  { name: 'CSS', class: 'bg-blue-500/20 border border-blue-500/30 text-blue-300' },
  { name: 'HTML', class: 'bg-pink-500/20 border border-pink-500/30 text-pink-300' },
  { name: 'MySQL', class: 'bg-cyan-500/20 border border-cyan-500/30 text-cyan-300' }
]

// 社交链接数据
const socialLinks = [
  {
    name: '微信',
    icon: 'mdi:wechat',
    href: '#',
    qr: wxQrImage,
    color: 'bg-green-500 hover:bg-green-600'
  },
  {
    name: 'QQ',
    icon: 'mdi:qqchat',
    href: '#',
    qr: qqQrImage,
    color: 'bg-blue-500 hover:bg-blue-600'
  },
  {
    name: 'GitHub',
    icon: 'mdi:github',
    href: '#',
    color: 'bg-gray-700 hover:bg-gray-800'
  },
  {
    name: '邮箱',
    icon: 'mdi:email',
    href: 'mailto:w2245673995@outlook.com',
    color: 'bg-pink-500 hover:bg-pink-600'
  }
]

// 性能优化：预加载头像图片
onMounted(() => {
  // 预加载头像图片
  const img = new Image()
  img.src = avatarImage

  // 设置动画完成标记
  setTimeout(() => {
    isAnimationComplete.value = true
  }, 2200) // 总动画时间约2.2秒
})
</script>

<template>
  <div
    v-motion
    :initial="{ opacity: 0, x: -30, scale: 0.95 }"
    :enter="{
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 400,
        ease: 'easeOut',
        delay: 200
      }
    }"
    class="profile-card bg-gray-900 rounded-xl shadow-lg p-6 flex flex-col items-center text-center text-gray-200"
  >
    <!-- 头像 -->
    <div
      v-motion
      :initial="{ scale: 0, rotate: -45 }"
      :enter="{
        scale: 1,
        rotate: 0,
        transition: {
          duration: 300,
          ease: 'easeOut',
          delay: 400
        }
      }"
      :hover="{
        scale: 1.05,
        rotate: 3,
        transition: { duration: 200 }
      }"
      class="avatar-container relative w-28 h-28 rounded-full overflow-hidden mb-4"
    >
      <!-- 头像发光边框 -->
      <div class="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 p-1">
        <div class="w-full h-full rounded-full overflow-hidden bg-gray-900">
          <img :src="avatarImage" alt="头像" class="w-full h-full object-cover">
        </div>
      </div>
      <!-- 优化的发光效果 -->
      <div class="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400/15 via-purple-400/15 to-blue-400/15 blur-sm animate-pulse"></div>
    </div>

    <!-- 个人信息 -->
    <div
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :enter="{
        opacity: 1,
        y: 0,
        transition: {
          duration: 300,
          ease: 'easeOut',
          delay: 600
        }
      }"
      class="info-container text-center"
    >
      <h2
        v-motion
        :initial="{ opacity: 0, scale: 0.8 }"
        :enter="{
          opacity: 1,
          scale: 1,
          transition: {
            duration: 250,
            ease: 'easeOut',
            delay: 700
          }
        }"
        class="text-primary text-2xl font-semibold mb-2"
      >
        Kirie
      </h2>

      <!-- 添加2020-2024级和中国-天津 -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 10 }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            duration: 250,
            ease: 'easeOut',
            delay: 800
          }
        }"
        class="mb-3"
      >
        <p class="text-gray-300 text-lg font-medium">
          2020-2024级
        </p>
        <p class="text-gray-400 text-sm flex items-center justify-center">
          <Icon icon="mdi:map-marker" class="mr-1" />
          中国-天津
        </p>
      </div>

      <div
        v-motion
        :initial="{ opacity: 0, y: 15 }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            duration: 300,
            ease: 'easeOut',
            delay: 900
          }
        }"
        class="space-y-1"
      >
        <p
          v-for="(info, index) in personalInfo.slice(3)"
          :key="index"
          class="text-gray-300 text-sm my-1"
          :class="info.class"
        >
          <Icon v-if="info.icon" :icon="info.icon" class="mr-1" />
          {{ info.text }}
        </p>
      </div>
    </div>

    <!-- 分类组件 -->
    <div
      v-motion
      :initial="{ opacity: 0, x: -20 }"
      :enter="{
        opacity: 1,
        x: 0,
        transition: {
          duration: 300,
          ease: 'easeOut',
          delay: 1200
        }
      }"
      class="categories-container w-full bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4 my-4"
    >
      <h3 class="text-blue-400 font-semibold mb-3 text-center flex items-center justify-center">
        <Icon icon="mdi:folder-multiple" class="mr-2" />
        分类
      </h3>
      <div class="flex flex-wrap gap-2 justify-center">
        <span
          v-for="(category, index) in categories"
          :key="category.name"
          v-motion
          :initial="{ opacity: 0, scale: 0 }"
          :enter="{
            opacity: 1,
            scale: 1,
            transition: {
              duration: 200,
              ease: 'easeOut',
              delay: 1300 + index * 30
            }
          }"
          :hover="{
            scale: 1.05,
            y: -2,
            transition: { duration: 150 }
          }"
          :class="category.color"
          class="px-3 py-1 rounded-full text-xs cursor-pointer border"
        >
          {{ category.name }} ({{ category.count }})
        </span>
      </div>
    </div>

    <!-- 标签云 -->
    <div
      v-motion
      :initial="{ opacity: 0, x: 20 }"
      :enter="{
        opacity: 1,
        x: 0,
        transition: {
          duration: 300,
          ease: 'easeOut',
          delay: 1400
        }
      }"
      class="tags-container w-full bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4 my-4"
    >
      <h3 class="text-green-400 font-semibold mb-3 text-center flex items-center justify-center">
        <Icon icon="mdi:tag-multiple" class="mr-2" />
        标签云
      </h3>
      <div class="flex flex-wrap gap-2 justify-center">
        <span
          v-for="(tag, index) in tags"
          :key="tag.name"
          v-motion
          :initial="{ opacity: 0, scale: 0 }"
          :enter="{
            opacity: 1,
            scale: 1,
            transition: {
              duration: 200,
              ease: 'easeOut',
              delay: 1500 + index * 30
            }
          }"
          :hover="{
            scale: 1.05,
            y: -2,
            transition: { duration: 150 }
          }"
          :class="tag.color"
          class="px-3 py-1 rounded-full text-xs cursor-pointer border"
        >
          {{ tag.name }} ({{ tag.count }})
        </span>
      </div>
    </div>

    <!-- 分隔线 -->
    <div
      v-motion
      :initial="{ scaleX: 0, opacity: 0 }"
      :enter="{
        scaleX: 1,
        opacity: 1,
        transition: {
          duration: 400,
          ease: 'easeOut',
          delay: 1600
        }
      }"
      class="w-full relative my-6"
    >
      <!-- 分隔线 -->
      <div class="w-full border-b border-gray-600"></div>
      <!-- 完全居中的标题 -->
      <div class="absolute inset-x-0 top-0 flex justify-center transform -translate-y-1/2">
        <span
          v-motion
          :initial="{ opacity: 0, scale: 0.8 }"
          :enter="{
            opacity: 1,
            scale: 1,
            transition: {
              duration: 250,
              ease: 'easeOut',
              delay: 1700
            }
          }"
          class="bg-gray-900 px-4 py-1 text-purple-400 text-center rounded-sm"
        >
          社交账号
        </span>
      </div>
    </div>

    <!-- 社交链接 -->
    <div
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :enter="{
        opacity: 1,
        y: 0,
        transition: {
          duration: 300,
          ease: 'easeOut',
          delay: 1800
        }
      }"
      class="social-links flex justify-center items-center gap-4 w-full my-4"
    >
      <div
        v-for="(social, index) in socialLinks"
        :key="social.icon"
        v-motion
        :initial="{ opacity: 0, scale: 0, rotate: -90 }"
        :enter="{
          opacity: 1,
          scale: 1,
          rotate: 0,
          transition: {
            duration: 250,
            ease: 'easeOut',
            delay: 1900 + index * 50
          }
        }"
        :hover="{
          scale: 1.1,
          y: -3,
          transition: { duration: 150 }
        }"
        class="relative group"
      >
        <a
          :href="social.href"
          :class="social.color"
          class="social-icon w-12 h-12 rounded-full flex items-center justify-center text-white text-xl shadow-lg"
        >
          <Icon :icon="social.icon" />
        </a>

        <!-- QR码弹出 -->
        <div
          v-if="social.qr"
          class="qr-popup absolute -top-36 left-1/2 transform -translate-x-1/2 bg-gray-800 p-2 rounded-lg shadow-md hidden group-hover:block z-10"
          style="width: 120px; height: 120px;"
        >
          <img :src="social.qr" :alt="`${social.name}二维码`" class="w-full h-full object-contain">
          <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-8 border-transparent border-t-gray-800"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 优化的ProfileCard基础样式 */
.profile-card {
  border: 1px solid rgba(139, 92, 246, 0.2);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(139, 92, 246, 0.1);
  backdrop-filter: blur(8px);
  will-change: transform, opacity; /* 性能优化 */
  contain: layout style paint; /* 性能优化：限制重绘范围 */
}

/* 性能优化 - 启用硬件加速 */
.avatar-container,
.info-container,
.skills-container,
.categories-container,
.tags-container,
.social-links {
  transform: translateZ(0); /* 启用硬件加速 */
  will-change: transform, opacity; /* 提示浏览器优化 */
}

/* 头像容器优化 */
.avatar-container {
  contain: layout style paint;
}

/* 标签元素优化 */
.skills-container span,
.categories-container span,
.tags-container span {
  will-change: transform;
  contain: layout style;
}

/* 社交图标优化 */
.social-icon {
  will-change: transform;
  contain: layout style paint;
  transition: transform 150ms ease-out, box-shadow 150ms ease-out;
}

/* QR码弹出样式 */
.group:hover .qr-popup {
  display: block !important;
}

/* 动画性能优化 */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* 减少重绘和回流 */
.banner-content,
.info-container,
.skills-container,
.categories-container,
.tags-container {
  backface-visibility: hidden;
  perspective: 1000px;
}
</style>
