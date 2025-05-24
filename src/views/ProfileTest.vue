<script setup>
import ProfileCard from '@/components/ProfileCard.vue'
import { usePageTitle } from '@/composables/usePageTitle'

// 设置页面标题
usePageTitle('个人资料测试')
</script>

<template>
  <div class="profile-test-page min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-8">
    <div class="max-w-md mx-auto">
      <h1 class="text-3xl font-bold text-center mb-8 text-purple-400">个人资料组件测试</h1>
      <ProfileCard />
    </div>
  </div>
</template>

<style scoped>
.profile-test-page {
  background-attachment: fixed;
}
</style>
