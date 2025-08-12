// 文章加载和解析工具
export class PostLoader {
  static posts = null
  static loading = false
  
  // 加载所有文章 - 添加防重复加载机制
  static async loadAllPosts() {
    // 如果已经有数据，直接返回
    if (this.posts) return this.posts
    
    // 如果正在加载，等待加载完成
    if (this.loading) {
      return new Promise((resolve) => {
        const checkLoading = () => {
          if (!this.loading && this.posts) {
            resolve(this.posts)
          } else {
            setTimeout(checkLoading, 50)
          }
        }
        checkLoading()
      })
    }
    
    this.loading = true
    
    try {
      const modules = import.meta.glob('/src/content/posts/*.md', { 
        query: '?raw',
        import: 'default',
        eager: true 
      })
      
      const posts = []
      
      for (const [path, content] of Object.entries(modules)) {
        const { frontMatter, content: markdownContent } = this.parseFrontMatter(content)
        
        const filename = path.split('/').pop().replace('.md', '')
        const [year, month, day, ...titleParts] = filename.split('-')
        const slug = titleParts.join('-')
        
        posts.push({
          id: posts.length + 1,
          slug,
          filename,
          content: markdownContent,
          views: 0,
          ...frontMatter,
          date: frontMatter.date || `${year}-${month}-${day}`
        })
      }
      
      this.posts = posts.sort((a, b) => new Date(b.date) - new Date(a.date))
      return this.posts
      
    } catch (error) {
      console.error('加载文章失败:', error)
      return []
    } finally {
      this.loading = false
    }
  }
}

