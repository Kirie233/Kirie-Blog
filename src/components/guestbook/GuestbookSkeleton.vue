<template>
  <div class="skeleton-wrapper">
    <div class="skeleton-item" v-for="n in 3" :key="n">
      <div class="skeleton-avatar"></div>
      <div class="skeleton-content">
        <div class="skeleton-line header"></div>
        <div class="skeleton-line"></div>
        <div class="skeleton-line short"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skeleton-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.skeleton-item {
  background-color: var(--card-background);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  gap: 1rem;
  backdrop-filter: blur(10px);
  background-color: rgba(36, 39, 59, 0.5);
}

.skeleton-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.skeleton-content {
  flex: 1;
  padding-top: 0.5rem;
}

.skeleton-line {
  height: 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  margin-bottom: 0.75rem;
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.skeleton-line.header {
  width: 40%;
  height: 1.2rem;
}

.skeleton-line.short {
  width: 60%;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>