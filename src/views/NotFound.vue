<script setup>
import { Icon } from '@iconify/vue'
</script>

<template>
  <div class="not-found-page">
    <div class="not-found-content">
      <div class="error-icon-container">
        <Icon icon="mdi:emoticon-sad-outline" class="error-icon" />
      </div>
      <h1 class="error-title">404</h1>
      <h2 class="error-subtitle">页面未找到</h2>
      <p class="error-description">
        抱歉，您访问的页面不存在或已被移动。
      </p>
      <div class="error-actions">
        <RouterLink to="/" class="home-button">
          <Icon icon="mdi:home" class="button-icon" />
          返回首页
        </RouterLink>
        <button @click="$router.go(-1)" class="back-button">
          <Icon icon="mdi:arrow-left" class="button-icon" />
          返回上页
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;
}

.not-found-content {
  text-align: center;
  max-width: 500px;
}

.error-icon-container {
  margin-bottom: 2rem;
}

.error-icon {
  font-size: 6rem;
  color: rgba(255, 255, 255, 0.3);
}

.error-title {
  font-size: 4rem;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 1rem;
  text-shadow: 0 0 20px rgba(255, 157, 181, 0.3);
}

.error-subtitle {
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 1rem;
}

.error-description {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.error-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.home-button,
.back-button {
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.home-button {
  background-color: var(--primary-color);
  color: white;
}

.home-button:hover {
  background-color: #ff8ba3;
  transform: translateY(-2px);
}

.back-button {
  background-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.9);
}

.back-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.button-icon {
  margin-right: 0.5rem;
}

@media (max-width: 768px) {
  .error-title {
    font-size: 3rem;
  }
  
  .error-subtitle {
    font-size: 1.2rem;
  }
  
  .error-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .home-button,
  .back-button {
    width: 200px;
    justify-content: center;
  }
}
</style>
