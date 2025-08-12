<script setup>
import { ref, reactive, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import blogService from '@/services/blogService.js'

// 留言数据
const messages = ref([])

// 表单数据
const form = reactive({
  name: '',
  email: '',
  website: '',
  content: ''
})

// 表单验证
const errors = reactive({
  name: '',
  email: '',
  content: ''
})

// 加载留言数据
onMounted(async () => {
  try {
    const result = await blogService.getMessagesPaginated(1, 50) // 获取前50条留言
    messages.value = result.messages
  } catch (error) {
    console.error('加载留言失败:', error)
  }
})

// 提交留言
const submitMessage = async () => {
  // 重置错误信息
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })

  // 验证表单
  let isValid = true

  if (!form.name.trim()) {
    errors.name = '请输入您的姓名'
    isValid = false
  }

  if (!form.email.trim()) {
    errors.email = '请输入您的邮箱'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = '请输入有效的邮箱地址'
    isValid = false
  }

  if (!form.content.trim()) {
    errors.content = '请输入留言内容'
    isValid = false
  }

  if (!isValid) return

  try {
    // 使用博客服务添加新留言
    const newMessage = await blogService.addMessage({
      name: form.name,
      email: form.email,
      website: form.website,
      content: form.content
    })

    // 更新本地留言列表
    messages.value.unshift(newMessage)

    // 重置表单
    Object.keys(form).forEach(key => {
      form[key] = ''
    })

    alert('留言提交成功！')
  } catch (error) {
    console.error('留言提交失败:', error)
    alert('留言提交失败，请重试')
  }
}
</script>

<template>
  <div class="guestbook-page">
    <div class="guestbook-header">
      <h1>留言板</h1>
      <p class="subtitle">欢迎在这里留下您的足迹和想法</p>
    </div>

    <!-- 留言表单 -->
    <div class="message-form-section">
      <h2>
        <Icon icon="mdi:message-plus" class="mr-2" />
        发表留言
      </h2>
      <form @submit.prevent="submitMessage" class="message-form">
        <div class="form-row">
          <div class="form-group">
            <label for="name">姓名 *</label>
            <input 
              type="text" 
              id="name" 
              v-model="form.name"
              :class="{ 'error': errors.name }"
              placeholder="请输入您的姓名"
            >
            <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
          </div>
          <div class="form-group">
            <label for="email">邮箱 *</label>
            <input 
              type="email" 
              id="email" 
              v-model="form.email"
              :class="{ 'error': errors.email }"
              placeholder="请输入您的邮箱"
            >
            <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
          </div>
        </div>
        <div class="form-group">
          <label for="website">网站</label>
          <input 
            type="url" 
            id="website" 
            v-model="form.website"
            placeholder="请输入您的网站地址（可选）"
          >
        </div>
        <div class="form-group">
          <label for="content">留言内容 *</label>
          <textarea 
            id="content" 
            v-model="form.content"
            :class="{ 'error': errors.content }"
            placeholder="请输入您的留言内容..."
            rows="5"
          ></textarea>
          <span v-if="errors.content" class="error-message">{{ errors.content }}</span>
        </div>
        <button type="submit" class="submit-btn">
          <Icon icon="mdi:send" class="mr-2" />
          提交留言
        </button>
      </form>
    </div>

    <!-- 留言列表 -->
    <div class="messages-section">
      <h2>
        <Icon icon="mdi:message-text-outline" class="mr-2" />
        留言列表 ({{ messages.length }})
      </h2>
      <div class="messages-list">
        <div v-for="message in messages" :key="message.id" class="message-item">
          <div class="message-avatar">
            <img :src="message.avatar" :alt="message.name">
          </div>
          <div class="message-content">
            <div class="message-header">
              <div class="message-author">
                <span class="author-name">{{ message.name }}</span>
                <a v-if="message.website" :href="message.website" target="_blank" class="author-website">
                  <Icon icon="mdi:link" />
                </a>
              </div>
              <span class="message-time">{{ message.time }}</span>
            </div>
            <div class="message-text">{{ message.content }}</div>
          </div>
        </div>
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

.message-form-section,
.messages-section {
  margin-bottom: 3rem;
}

h2 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 0.5rem;
  display: flex;
  align-items: center;
}

.message-form {
  background-color: var(--card-background);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.05);
  color: #fff;
  font-size: 0.9rem;
  transition: border-color 0.3s, background-color 0.3s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  background-color: rgba(255, 255, 255, 0.1);
}

.form-group input.error,
.form-group textarea.error {
  border-color: #ff6b6b;
}

.error-message {
  color: #ff6b6b;
  font-size: 0.8rem;
  margin-top: 0.25rem;
  display: block;
}

.submit-btn {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.submit-btn:hover {
  background-color: #ff8ba3;
  transform: translateY(-2px);
}

.messages-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.message-item {
  background-color: var(--card-background);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  gap: 1rem;
}

.message-avatar img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.message-content {
  flex: 1;
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
}

.message-text {
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .message-item {
    flex-direction: column;
    text-align: center;
  }
  
  .message-header {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}
</style>
