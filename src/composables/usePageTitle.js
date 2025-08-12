import { watch } from 'vue'
import { useRoute } from 'vue-router'

export function usePageTitle(title) {
  const route = useRoute()
  
  const updateTitle = (newTitle) => {
    if (newTitle) {
      document.title = `${newTitle} - Kirie的个人博客`
    } else {
      document.title = 'Kirie的个人博客'
    }
  }
  
  // 如果传入了标题，直接设置
  if (title) {
    updateTitle(title)
  }
  
  // 监听路由变化，根据路由名称设置默认标题
  watch(() => route.name, (routeName) => {
    if (!title) {
      const titleMap = {
        'home': '首页',
        'about': '关于我',
        'guestbook': '留言板',
        'archive': '文章归档',
        'search': '搜索结果',
        'category': '分类',
        'tag': '标签',
        'post': '文章详情',
        'not-found': '页面未找到'
      }
      
      updateTitle(titleMap[routeName] || '')
    }
  }, { immediate: true })
  
  return {
    setTitle: updateTitle
  }
}
