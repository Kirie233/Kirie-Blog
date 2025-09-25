<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';
import blogService from '@/services/blogService.js';

const route = useRoute();
const router = useRouter();
const post = ref(null);
const loading = ref(true);
const tableOfContents = ref([]);
const relatedPosts = ref([]);

/**
 * 从渲染后的 HTML 内容中提取标题来生成目录
 * @param {string} htmlContent - 文章的 HTML 内容
 * @returns {object} - 包含目录和更新后HTML的对象
 */
const generateTableOfContentsFromHtml = (htmlContent) => {
  if (!htmlContent) return { toc: [], contentWithIds: '' };

  const headings = [];
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;

  tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
    const level = parseInt(heading.tagName.substring(1), 10);
    const text = heading.innerText;
    
    const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    heading.id = id;

    headings.push({
      level,
      text,
      id
    });
  });
  
  return {
    toc: headings,
    contentWithIds: tempDiv.innerHTML 
  };
};

onMounted(async () => {
  loading.value = true;
  try {
    const id = route.params.id;
    const result = await blogService.getPostById(id);

    if (!result) {
      post.value = null;
      return;
    }

    const { toc, contentWithIds } = generateTableOfContentsFromHtml(result.content);
    
    result.content = contentWithIds;

    post.value = result;
    tableOfContents.value = toc;

    relatedPosts.value = result.relatedPosts || [];

  } catch (error) {
    console.error("加载文章详情时出错:", error);
    post.value = null;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="blog-post">
    <div v-if="loading" class="loading">
      <div class="loading-spinner"></div>
      <p>加载中...</p>
    </div>

    <div v-else-if="post" class="post-container fade-in">
      <!-- 文章目录 -->
      <aside class="table-of-contents slide-in-left" v-if="tableOfContents.length > 0">
        <div class="toc-header">
          <Icon icon="mdi:format-list-bulleted" class="toc-icon" />
          <h3>目录</h3>
        </div>
        <nav class="toc-nav">
          <ul>
            <li v-for="heading in tableOfContents" :key="heading.id" :class="`level-${heading.level}`">
              <a :href="`#${heading.id}`" class="toc-link">{{ heading.text }}</a>
            </li>
          </ul>
        </nav>
      </aside>

      <!-- 文章内容 -->
      <article class="post-content fade-in-up">
        <header class="post-header">
          <h1>{{ post.title }}</h1>
          <div class="post-meta">
            <div class="post-info">
              <time class="post-date">
                <Icon icon="mdi:calendar" class="meta-icon" />
                {{ post.date }}
              </time>
              <span class="post-category">
                <Icon icon="mdi:folder" class="meta-icon" />
                <RouterLink :to="`/category/${post.category}`">{{ post.category }}</RouterLink>
              </span>
              <span class="post-views">
                <Icon icon="mdi:eye" class="meta-icon" />
                {{ post.views }} 阅读
              </span>
            </div>
            
            <!-- ▼▼▼ 关键修改点 2 ▼▼▼ -->
            <!-- 添加 v-if 判断，确保 post.tags 是一个有效的数组 -->
            <div v-if="post.tags && post.tags.length > 0" class="post-tags">
              <Icon icon="mdi:tag-multiple" class="meta-icon" />
              <RouterLink
                v-for="tag in post.tags"
                :key="tag"
                :to="`/tag/${tag}`"
                class="post-tag"
              >
                {{ tag }}
              </RouterLink>
            </div>

          </div>
        </header>

        <!-- ▼▼▼ 关键修改点 1 ▼▼▼ -->
        <!-- 确保 v-html 绑定到正确的变量 post.content -->
        <div class="post-body" v-html="post.content"></div>

        <footer class="post-footer">
          <div class="post-navigation">
            <RouterLink to="/" class="back-link">
              <Icon icon="mdi:arrow-left" class="back-icon" />
              返回首页
            </RouterLink>
          </div>

          <!-- 分享按钮 -->
          <div class="post-share">
            <span class="share-label">分享到：</span>
            <div class="share-buttons">
              <a href="#" class="share-button" title="分享到微信">
                <Icon icon="mdi:wechat" />
              </a>
              <a href="#" class="share-button" title="分享到微博">
                <Icon icon="mdi:sina-weibo" />
              </a>
              <a href="#" class="share-button" title="分享到QQ">
                <Icon icon="mdi:qqchat" />
              </a>
            </div>
          </div>
        </footer>
      </article>
    </div>

    <!-- 相关文章 -->
    <div v-if="post && relatedPosts.length > 0" class="related-posts fade-in-up">
      <h2 class="related-title">
        <Icon icon="mdi:link-variant" class="related-icon" />
        相关文章
      </h2>
      <div class="related-list">
        <div v-for="relatedPost in relatedPosts" :key="relatedPost.id" class="related-item">
          <RouterLink :to="`/post/${relatedPost.slug || relatedPost.id}`" class="related-link">
            <h3 class="related-post-title">{{ relatedPost.title }}</h3>
            <div class="related-post-meta">
              <span class="related-post-date">{{ relatedPost.date }}</span>
              <span class="related-post-views">{{ relatedPost.views }} 阅读</span>
            </div>
            <p class="related-post-summary">{{ relatedPost.excerpt || (relatedPost.content && relatedPost.content.substring(0, 100) + '...') }}</p>
          </RouterLink>
        </div>
      </div>
    </div>

    <div v-else-if="!loading && !post" class="error-message">
      <Icon icon="mdi:alert-circle" class="error-icon" />
      <p>文章不存在或已被删除</p>
      <RouterLink to="/" class="back-link">返回首页</RouterLink>
    </div>
  </div>
</template>

<style scoped>
/* 你的样式代码无需修改，保持原样即可 */
/* ... */
.fade-in {
  animation: fadeIn 0.6s ease-out;
}

.slide-in-left {
  animation: slideInLeft 0.6s ease-out 0.2s both;
}

.fade-in-up {
  animation: fadeInUp 0.6s ease-out 0.4s both;
}

/* 动画关键帧 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.blog-post {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 2rem 20px;
  color: #fff;
}

.post-container {
  display: flex;
  gap: 2rem;
}

/* 加载动画 */
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border-top-color: var(--primary-color);
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 文章目录 */
.table-of-contents {
  width: 250px;
  flex-shrink: 0;
  position: sticky;
  top: 100px;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.toc-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.toc-icon {
  margin-right: 0.5rem;
  color: var(--primary-color);
}

.toc-header h3 {
  font-size: 1.2rem;
  color: #fff;
  margin: 0;
}

.toc-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-nav li {
  margin-bottom: 0.5rem;
}

.toc-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s;
  display: block;
  padding: 0.2rem 0;
}

.toc-link:hover {
  color: var(--primary-color);
}

.level-1 {
  font-weight: 600;
}

.level-2 {
  padding-left: 1rem;
}

.level-3 {
  padding-left: 2rem;
  font-size: 0.85rem;
}

.level-4 {
  padding-left: 3rem;
  font-size: 0.8rem;
}

/* 文章内容 */
.post-content {
  flex: 1;
  min-width: 0;
}

.post-header {
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 1rem;
}

h1 {
  margin-bottom: 1rem;
  color: #fff;
  font-size: 2rem;
}

.post-meta {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.post-info {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

.post-date, .post-category, .post-views {
  display: flex;
  align-items: center;
}

.meta-icon {
  margin-right: 0.3rem;
}

.post-category a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.2s;
}

.post-category a:hover {
  color: var(--primary-color);
}

.post-tags {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.post-tag {
  background-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  padding: 0.2rem 0.6rem;
  border-radius: 3px;
  font-size: 0.8rem;
  text-decoration: none;
  transition: background-color 0.3s;
}

.post-tag:hover {
  background-color: var(--primary-color);
  color: white;
}

/* 文章正文 */
.post-body {
  line-height: 1.8;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.9);
}

.post-body :deep(h1),
.post-body :deep(h2),
.post-body :deep(h3),
.post-body :deep(h4) {
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #fff;
}

.post-body :deep(h1) {
  font-size: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 0.5rem;
}

.post-body :deep(h2) {
  font-size: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 0.3rem;
}

.post-body :deep(h3) {
  font-size: 1.3rem;
}

.post-body :deep(h4) {
  font-size: 1.1rem;
}

.post-body :deep(p) {
  margin-bottom: 1.5rem;
}

.post-body :deep(pre),
.post-body :deep(.code-block) {
  background-color: rgba(0, 0, 0, 0.3);
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  margin: 1.5rem 0;
  font-family: monospace;
  white-space: pre;
}

/* 文章底部 */
.post-footer {
  margin-top: 3rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.post-navigation {
  display: flex;
}

.back-link {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.3s;
}

.back-icon {
  margin-right: 0.3rem;
}

.back-link:hover {
  background-color: var(--primary-color);
}

.post-share {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.share-label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

.share-buttons {
  display: flex;
  gap: 0.5rem;
}

.share-button {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.3s;
}

.share-button:hover {
  background-color: var(--primary-color);
  color: white;
  transform: translateY(-2px);
}

/* 相关文章 */
.related-posts {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.related-title {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #fff;
}

.related-icon {
  margin-right: 0.5rem;
  color: var(--primary-color);
}

.related-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.related-item {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.related-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255, 0.08);
}

.related-link {
  display: block;
  padding: 1.5rem;
  text-decoration: none;
  color: inherit;
}

.related-post-title {
  font-size: 1.2rem;
  margin-bottom: 0.75rem;
  color: #fff;
  transition: color 0.3s;
}

.related-link:hover .related-post-title {
  color: var(--primary-color);
}

.related-post-meta {
  display: flex;
  justify-content: space-between;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
  margin-bottom: 0.75rem;
}

.related-post-summary {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 错误信息 */
.error-message {
  text-align: center;
  padding: 3rem 0;
  color: #ff6b6b;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.error-icon {
  font-size: 3rem;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .post-container {
    flex-direction: column;
  }

  .table-of-contents {
    width: 100%;
    position: static;
    margin-bottom: 2rem;
  }

  .related-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .post-footer {
    flex-direction: column;
    align-items: flex-start;
  }

  .post-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  h1 {
    font-size: 1.8rem;
  }

  .post-body :deep(h1) {
    font-size: 1.8rem;
  }

  .post-body :deep(h2) {
    font-size: 1.4rem;
  }

  .post-body :deep(h3) {
    font-size: 1.2rem;
  }
}

</style>