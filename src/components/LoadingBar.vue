<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoading = ref(false)
const progress = ref(0)

let progressTimer = null

const startLoading = () => {
  isLoading.value = true
  progress.value = 0
  
  progressTimer = setInterval(() => {
    if (progress.value < 90) {
      progress.value += Math.random() * 10
    }
  }, 100)
}

const finishLoading = () => {
  progress.value = 100
  setTimeout(() => {
    isLoading.value = false
    progress.value = 0
  }, 200)
  
  if (progressTimer) {
    clearInterval(progressTimer)
    progressTimer = null
  }
}

onMounted(() => {
  router.beforeEach(() => {
    startLoading()
  })
  
  router.afterEach(() => {
    finishLoading()
  })
})

onUnmounted(() => {
  if (progressTimer) {
    clearInterval(progressTimer)
  }
})
</script>

<template>
  <div v-if="isLoading" class="loading-bar">
    <div 
      class="loading-progress" 
      :style="{ width: `${progress}%` }"
    ></div>
  </div>
</template>

<style scoped>
.loading-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background-color: rgba(255, 255, 255, 0.1);
  z-index: 9999;
}

.loading-progress {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color), #ff8ba3);
  transition: width 0.2s ease;
  box-shadow: 0 0 10px rgba(255, 157, 181, 0.5);
}
</style>
