<script setup>
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

const props = defineProps({
  message: {
    type: Object,
    required: true
  }
})

const formattedTime = computed(() => {
  // 假设 message.time 是一个有效的日期字符串或时间戳
  return dayjs(props.message.time).fromNow()
})

const avatarText = computed(() => {
  return props.message.name ? props.message.name.charAt(0).toUpperCase() : '?'
})

const avatarColor = computed(() => {
  // 根据名字生成一个简单的颜色
  const charCode = props.message.name.charCodeAt(0) || 0
  const colors = ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#a0c4ff', '#bdb2ff', '#ffc6ff']
  return colors[charCode % colors.length]
})
</script>

<template>
  <div class="message-item">
    <div class="message-avatar">
      <img v-if="message.avatar && message.avatar !== 'https://via.placeholder.com/50'" :src="message.avatar" :alt="message.name">
      <div v-else class="default-avatar" :style="{ backgroundColor: avatarColor }">
        {{ avatarText }}
      </div>
    </div>
    <div class="message-content">
      <div class="message-header">
        <div class="message-author">
          <span class="author-name">{{ message.name }}</span>
          <a v-if="message.website" :href="message.website" target="_blank" rel="noopener noreferrer" class="author-website">
            <Icon icon="mdi:link-variant" />
          </a>
        </div>
        <span class="message-time">{{ formattedTime }}</span>
      </div>
      <div class="message-text">{{ message.content }}</div>
    </div>
  </div>
</template>

<style scoped>
.message-item {
  background-color: var(--card-background);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  gap: 1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  background-color: rgba(36, 39, 59, 0.5); /* 半透明背景 */
}

.message-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  border-color: var(--primary-color);
}

.message-avatar {
  flex-shrink: 0;
}

.message-avatar img, .default-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.default-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
}

.message-content {
  flex: 1;
  min-width: 0; /* 防止内容溢出 */
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.message-author {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.author-name {
  font-weight: 600;
  color: var(--primary-color);
}

.author-website {
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: color 0.3s;
}

.author-website:hover {
  color: var(--primary-color);
}

.message-time {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.85rem;
  flex-shrink: 0;
}

.message-text {
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  word-wrap: break-word;
}

@media (max-width: 768px) {
  .message-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>