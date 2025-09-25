import { ref, readonly } from 'vue'
import blogService from '@/services/blogService.js'

export function useGuestbook() {
  const messages = ref([])
  const isLoading = ref(false)
  const isSubmitting = ref(false)
  const error = ref(null)
  const pagination = ref({
    current: 1,
    pageSize: 20,
    total: 0,
    totalPages: 1,
    hasNext: false,
  })

  // 加载留言
  const fetchMessages = async (page = 1, pageSize = 20) => {
    isLoading.value = true
    error.value = null
    try {
      const result = await blogService.getMessagesPaginated(page, pageSize)
      if (page === 1) {
        messages.value = result.messages
      } else {
        // 追加数据，而不是替换
        messages.value.push(...result.messages)
      }
      pagination.value = result.pagination
    } catch (err) {
      console.error('加载留言失败:', err)
      error.value = '加载留言失败，请稍后重试。'
    } finally {
      isLoading.value = false
    }
  }

  // 提交留言
  const addMessage = async (messageData) => {
    isSubmitting.value = true
    error.value = null
    try {
      const newMessage = await blogService.addMessage(messageData)
      messages.value.unshift(newMessage)
      pagination.value.total++
      return true // 表示成功
    } catch (err) {
      console.error('提交留言失败:', err)
      error.value = '提交留言失败，请稍后重试。'
      return false // 表示失败
    } finally {
      isSubmitting.value = false
    }
  }

  // 加载更多
  const loadMore = () => {
    if (pagination.value.hasNext && !isLoading.value) {
      fetchMessages(pagination.value.current + 1, pagination.value.pageSize)
    }
  }

  return {
    messages: readonly(messages),
    isLoading: readonly(isLoading),
    isSubmitting: readonly(isSubmitting),
    error: readonly(error),
    pagination: readonly(pagination),
    fetchMessages,
    addMessage,
    loadMore,
  }
}