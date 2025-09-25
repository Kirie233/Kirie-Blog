<script setup>
import { reactive, ref } from 'vue'
import { Icon } from '@iconify/vue'

const emit = defineEmits(['submitMessage'])
const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})

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

// 提交留言
const submit = () => {
  // 重置错误信息
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })

  // 验证表单
  let isValid = true

  if (!form.name.trim()) {
    errors.name = '请输入您的用户名'
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

  emit('submitMessage', { ...form })
}

const resetForm = () => {
  Object.keys(form).forEach(key => {
    form[key] = ''
  })
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })
}

// 暴露给父组件
defineExpose({
  resetForm
})
</script>

<template>
  <div class="message-form-section">
    <h2>
      <Icon icon="mdi:message-plus" class="mr-2" />
      发表留言
    </h2>
    <form @submit.prevent="submit" class="message-form">
      <div class="form-row">
        <div class="form-group">
          <label for="name">用户名 *</label>
          <input 
            type="text" 
            id="name" 
            v-model="form.name"
            :class="{ 'error': errors.name }"
            placeholder="请输入您的用户名"
            :disabled="props.loading"
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
            :disabled="props.loading"
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
          :disabled="props.loading"
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
          :disabled="props.loading"
        ></textarea>
        <span v-if="errors.content" class="error-message">{{ errors.content }}</span>
      </div>
      <button type="submit" class="submit-btn" :disabled="props.loading">
        <Icon v-if="!props.loading" icon="mdi:send" class="mr-2" />
        <Icon v-if="props.loading" icon="eos-icons:loading" class="mr-2" />
        {{ props.loading ? '提交中...' : '提交留言' }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.message-form-section {
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
  transition: all 0.3s ease;
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
  transition: border-color 0.3s, background-color 0.3s, box-shadow 0.3s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 0 3px rgba(var(--primary-color-rgb), 0.3);
}

.form-group input.error,
.form-group textarea.error {
  border-color: #ff6b6b;
}

.form-group input.error:focus,
.form-group textarea.error:focus {
  box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.3);
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

.submit-btn:hover:not(:disabled) {
  background-color: #ff8ba3;
  transform: translateY(-2px);
}

.submit-btn:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>