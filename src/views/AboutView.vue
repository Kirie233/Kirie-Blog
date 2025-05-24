<script setup>
import { Icon } from '@iconify/vue'
import { usePageTitle } from '@/composables/usePageTitle'

// 设置页面标题
usePageTitle('关于我')
</script>

<template>
  <div class="about-page w-full max-w-7xl mx-auto px-5 py-8 text-white bg-bg-dark">
    <div class="about-header mb-12 text-center">
      <h1 class="text-4xl font-bold mb-4 text-white">关于我</h1>
      <p class="text-xl text-white/70">了解更多关于Kirie和这个博客的信息</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- 左侧主要内容 -->
      <div class="about-left lg:col-span-2 space-y-8">
        <!-- 个人介绍 -->
        <section class="about-section bg-white/5 rounded-lg p-6">
          <h2 class="text-2xl font-semibold mb-6 text-primary border-b border-white/10 pb-2 flex items-center">
            <Icon icon="mdi:account" class="mr-2" />
            个人介绍
          </h2>
          <div class="space-y-4 text-white/80 leading-relaxed">
            <p>👋 大家好，我是Kirie，一名热爱技术的前端开发者。</p>
            <p>💻 我热爱编程、设计和分享有趣的内容。通过这个博客，我希望能够记录自己的成长历程，同时也希望能够帮助到其他人。</p>
            <p>🌱 我相信技术能够改变世界，也相信分享能够让知识传播得更远。在这里，你可以看到我的学习笔记、项目经验和一些生活感悟。</p>
            <p>🚀 欢迎与我交流技术问题，一起成长！</p>
          </div>
        </section>

        <!-- 博客理念 -->
        <section class="about-section bg-white/5 rounded-lg p-6">
          <h2 class="text-2xl font-semibold mb-6 text-primary border-b border-white/10 pb-2 flex items-center">
            <Icon icon="mdi:lightbulb" class="mr-2" />
            博客理念
          </h2>
          <div class="space-y-4 text-white/80 leading-relaxed">
            <p>📝 <strong>记录成长</strong>：记录学习过程中的点点滴滴，见证自己的进步轨迹。</p>
            <p>🤝 <strong>知识分享</strong>：将学到的知识整理成文章，希望能够帮助到有相同问题的朋友。</p>
            <p>💡 <strong>思维碰撞</strong>：通过写作整理思路，通过交流获得新的启发和见解。</p>
            <p>🌱 <strong>持续学习</strong>：技术日新月异，保持学习的热情，跟上时代的步伐。</p>
          </div>
        </section>
      </div>

      <!-- 右侧信息卡片 -->
      <div class="about-right space-y-6">
        <!-- 最新动态 -->
        <section class="about-section bg-white/5 rounded-lg p-6">
          <h2 class="text-xl font-semibold mb-4 text-primary flex items-center">
            <Icon icon="mdi:timeline" class="mr-2" />
            最新动态
          </h2>
          <div class="space-y-3">
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0 w-2 h-2 bg-green-400 rounded-full mt-2"></div>
              <div>
                <p class="text-white/80 text-sm">完成博客系统前端开发</p>
                <p class="text-white/50 text-xs">2024-01-15</p>
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0 w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
              <div>
                <p class="text-white/80 text-sm">开始学习后端开发</p>
                <p class="text-white/50 text-xs">2024-01-10</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 技能标签 -->
        <section class="about-section bg-white/5 rounded-lg p-6">
          <h2 class="text-xl font-semibold mb-4 text-primary flex items-center">
            <Icon icon="mdi:code-tags" class="mr-2" />
            技能标签
          </h2>
          <div class="flex flex-wrap gap-2">
            <span class="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">Vue.js</span>
            <span class="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs">JavaScript</span>
            <span class="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">CSS</span>
            <span class="px-2 py-1 bg-red-500/20 text-red-300 rounded text-xs">HTML</span>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 动画样式 */
.about-page {
  animation: fadeIn 0.6s ease-out;
}

.about-header {
  animation: fadeInDown 0.6s ease-out;
}

.about-left {
  animation: slideInLeft 0.6s ease-out 0.2s both;
}

.about-right {
  animation: slideInRight 0.6s ease-out 0.4s both;
}

.about-section {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.about-section:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

/* 动画关键帧 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
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
