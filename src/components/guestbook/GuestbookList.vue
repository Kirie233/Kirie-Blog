<script setup>
import GuestbookListItem from './GuestbookListItem.vue'

const props = defineProps({
  messages: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="messages-section">
    <h2>
      <Icon icon="mdi:message-text-outline" class="mr-2" />
      留言列表 ({{ messages.length }})
    </h2>
    <div v-if="messages.length > 0" class="messages-list">
      <GuestbookListItem 
        v-for="message in messages" 
        :key="message.id" 
        :message="message" 
      />
    </div>
    <div v-else class="empty-state">
      <p>还没有人留言，快来抢占第一个沙发吧！</p>
    </div>
  </div>
</template>

<style scoped>
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

.messages-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.empty-state {
  background-color: var(--card-background);
  padding: 3rem 2rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
}
</style>