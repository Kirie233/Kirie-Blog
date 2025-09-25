<script setup>
import { onMounted, ref, watch } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { useGuestbook } from '@/composables/useGuestbook.js'
import GuestbookForm from '@/components/guestbook/GuestbookForm.vue'
import GuestbookList from '@/components/guestbook/GuestbookList.vue'
import GuestbookSkeleton from '@/components/guestbook/GuestbookSkeleton.vue'
import { Icon } from '@iconify/vue'
import { useToast } from 'vue-toastification'

const {
  messages,
  isLoading,
  isSubmitting,
  error,
  pagination,
  fetchMessages,
  addMessage,
  loadMore
} = useGuestbook()

const formComponent = ref(null)
const loadMoreTrigger = ref(null) // 用于观察的元素
const toast = useToast()

onMounted(() => {
  fetchMessages(1, 10) // 初始加载10条
})

useIntersectionObserver(
  loadMoreTrigger,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      loadMore()
    }
  },
)

const handleMessageSubmit = async (messageData) => {
  const success = await addMessage(messageData)
  if (success) {
    formComponent.value?.resetForm()
    toast.success('留言成功！感谢您的分享。')
  } else {
    toast.error(error.value || '留言失败，请稍后重试。')
  }
}
</script>

<template>
  <div class="guestbook-page">
    <div class="guestbook-header">
      <h1>留言板</h1>
      <p class="subtitle">欢迎在这里留下您的足迹和想法</p>
    </div>

    <GuestbookForm 
      ref="formComponent"
      :loading="isSubmitting"
      @submit-message="handleMessageSubmit" 
    />

    <!-- 错误提示 -->
    <div v-if="error" class="error-alert">
      {{ error }}
    </div>

    <!-- 骨架屏加载状态 -->
    <GuestbookSkeleton v-if="isLoading && messages.length === 0" />
    
    <GuestbookList v-else :messages="messages" />

    <!-- 无限滚动触发器 -->
    <div ref="loadMoreTrigger" class="load-more-trigger">
      <div v-if="isLoading && messages.length > 0" class="loading-indicator">
        <Icon icon="eos-icons:loading" class="mr-2" />
        正在加载更多...
      </div>
    </div>
  </div>
</template>

<style scoped>
.guestbook-page {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 20px;
  color: #fff;
  background-color: var(--background-color);
}

.guestbook-header {
  margin-bottom: 3rem;
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #fff;
}

.subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
}

.error-alert {
  background-color: #ff6b6b;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  text-align: center;
}

.load-more-trigger {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-indicator {
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
}
</style>
