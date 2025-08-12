/**
 * 内容加载器
 * 用于加载和管理 Markdown 文件内容
 */

import markdownParser from './markdownParser.js'

class ContentLoader {
  constructor() {
    this.posts = []
    this.config = {}
    this.loaded = false
  }

  /**
   * 初始化内容加载器
   */
  async init() {
    if (this.loaded) return

    try {
      await this.loadConfig()
      await this.loadPosts()
      this.loaded = true
    } catch (error) {
      console.error('内容加载失败:', error)
    }
  }

  /**
   * 加载博客配置
   */
  async loadConfig() {
    try {
      const response = await fetch('/content/config/blog.json')
      if (response.ok) {
        this.config = await response.json()
      } else {
        console.warn('配置文件加载失败，使用默认配置')
        this.config = this.getDefaultConfig()
      }
    } catch (error) {
      console.warn('配置文件加载失败，使用默认配置:', error)
      this.config = this.getDefaultConfig()
    }
  }

  /**
   * 加载所有文章
   */
  async loadPosts() {
    try {
      // 首先尝试加载构建时生成的内容索引
      const indexResponse = await fetch('/content-index.json')
      if (indexResponse.ok) {
        const index = await indexResponse.json()
        this.posts = index.posts.map(post => ({
          ...post,
          views: this.getViewCount(post.filename)
        }))
        return
      }
    } catch (error) {
      console.warn('内容索引加载失败，尝试直接加载文章:', error)
    }

    // 回退到直接加载文章文件
    try {
      const postFiles = [
        'welcome-to-kirie-blog.md'
      ]

      const posts = []

      for (const filename of postFiles) {
        try {
          const response = await fetch(`/content/posts/${filename}`)
          if (response.ok) {
            const content = await response.text()
            const parsed = markdownParser.parse(content)

            // 验证 frontmatter
            const validation = markdownParser.validateFrontmatter(parsed.frontmatter)
            if (!validation.isValid) {
              console.warn(`文章 ${filename} frontmatter 验证失败:`, validation.errors)
              continue
            }

            const post = {
              id: this.generateId(filename),
              filename,
              slug: markdownParser.generateSlug(parsed.frontmatter.title, parsed.frontmatter.date),
              ...parsed.frontmatter,
              content: parsed.content,
              excerpt: parsed.excerpt,
              wordCount: parsed.wordCount,
              readingTime: parsed.readingTime,
              views: this.getViewCount(filename)
            }

            // 过滤草稿（生产环境）
            if (import.meta.env.PROD && post.draft) {
              continue
            }

            posts.push(post)
          }
        } catch (error) {
          console.error(`加载文章 ${filename} 失败:`, error)
        }
      }

      // 按日期排序
      this.posts = posts.sort((a, b) => new Date(b.date) - new Date(a.date))

    } catch (error) {
      console.error('文章加载失败:', error)
      this.posts = []
    }
  }

  /**
   * 获取默认配置
   */
  getDefaultConfig() {
    return {
      blog: {
        title: "Kirie Blog",
        subtitle: "基于 Git 工作流的现代博客",
        description: "一个安全、优雅的个人博客系统",
        author: "Kirie"
      },
      categories: ["前端开发", "后端开发", "项目实战", "开发技巧", "学习笔记", "生活随笔"],
      tags: ["Vue", "JavaScript", "CSS", "HTML", "前端", "后端", "学习笔记"]
    }
  }

  /**
   * 生成文章ID
   */
  generateId(filename) {
    return filename.replace(/\.md$/, '').replace(/[^a-zA-Z0-9]/g, '-')
  }

  /**
   * 获取浏览量
   */
  getViewCount(filename) {
    const views = JSON.parse(localStorage.getItem('blog_post_views') || '{}')
    return views[filename] || 0
  }

  /**
   * 增加浏览量
   */
  incrementViewCount(filename) {
    const views = JSON.parse(localStorage.getItem('blog_post_views') || '{}')
    views[filename] = (views[filename] || 0) + 1
    localStorage.setItem('blog_post_views', JSON.stringify(views))
  }

  // ========== 公共 API ==========

  /**
   * 获取所有文章
   */
  async getAllPosts() {
    await this.init()
    return [...this.posts]
  }

  /**
   * 根据ID获取文章
   */
  async getPostById(id) {
    await this.init()
    const post = this.posts.find(p => p.id === id || p.slug === id)
    if (post) {
      // 如果文章没有完整内容，需要加载
      if (!post.content) {
        try {
          const response = await fetch(`/content/posts/${post.filename}`)
          if (response.ok) {
            const content = await response.text()
            const parsed = markdownParser.parse(content)
            post.content = parsed.content
          }
        } catch (error) {
          console.error(`加载文章内容失败: ${post.filename}`, error)
        }
      }

      // 增加浏览量
      this.incrementViewCount(post.filename)
      return { ...post, views: this.getViewCount(post.filename) }
    }
    return null
  }

  /**
   * 根据分类获取文章
   */
  async getPostsByCategory(category) {
    await this.init()
    return this.posts.filter(post => post.category === category)
  }

  /**
   * 根据标签获取文章
   */
  async getPostsByTag(tag) {
    await this.init()
    return this.posts.filter(post => post.tags && post.tags.includes(tag))
  }

  /**
   * 搜索文章
   */
  async searchPosts(query) {
    await this.init()
    const searchTerm = query.toLowerCase()
    return this.posts.filter(post => 
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.content.toLowerCase().includes(searchTerm) ||
      (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
    )
  }

  /**
   * 获取分页文章
   */
  async getPostsPaginated(page = 1, pageSize = 10, filters = {}) {
    await this.init()
    
    let filteredPosts = [...this.posts]

    // 应用过滤器
    if (filters.category) {
      filteredPosts = filteredPosts.filter(post => post.category === filters.category)
    }
    if (filters.tag) {
      filteredPosts = filteredPosts.filter(post => post.tags && post.tags.includes(filters.tag))
    }
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filteredPosts = filteredPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
      )
    }

    // 分页
    const total = filteredPosts.length
    const totalPages = Math.ceil(total / pageSize)
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const posts = filteredPosts.slice(startIndex, endIndex)

    return {
      posts,
      pagination: {
        current: page,
        pageSize,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      },
      filters
    }
  }

  /**
   * 获取文章归档
   */
  async getArchive() {
    await this.init()
    const archive = {}

    this.posts.forEach(post => {
      const date = new Date(post.date)
      const year = date.getFullYear()
      const month = date.getMonth() + 1

      if (!archive[year]) {
        archive[year] = {}
      }
      if (!archive[year][month]) {
        archive[year][month] = []
      }

      archive[year][month].push({
        id: post.id,
        slug: post.slug,
        title: post.title,
        date: post.date,
        category: post.category
      })
    })

    return archive
  }

  /**
   * 获取相关文章
   */
  async getRelatedPosts(currentPost, limit = 3) {
    await this.init()
    
    return this.posts
      .filter(post => post.id !== currentPost.id)
      .filter(post => {
        // 相同分类或有共同标签
        return post.category === currentPost.category ||
               (post.tags && currentPost.tags && 
                post.tags.some(tag => currentPost.tags.includes(tag)))
      })
      .sort((a, b) => {
        // 按相关度排序（共同标签数量）
        const aScore = (a.tags && currentPost.tags) ? 
          a.tags.filter(tag => currentPost.tags.includes(tag)).length : 0
        const bScore = (b.tags && currentPost.tags) ? 
          b.tags.filter(tag => currentPost.tags.includes(tag)).length : 0
        return bScore - aScore
      })
      .slice(0, limit)
  }

  /**
   * 获取博客配置
   */
  async getConfig() {
    await this.init()
    return { ...this.config }
  }

  /**
   * 获取统计信息
   */
  async getStats() {
    await this.init()
    
    const totalPosts = this.posts.length
    const totalViews = this.posts.reduce((sum, post) => sum + (post.views || 0), 0)
    const categoriesCount = {}
    const tagsCount = {}

    this.posts.forEach(post => {
      // 统计分类
      categoriesCount[post.category] = (categoriesCount[post.category] || 0) + 1
      
      // 统计标签
      if (post.tags) {
        post.tags.forEach(tag => {
          tagsCount[tag] = (tagsCount[tag] || 0) + 1
        })
      }
    })

    return {
      totalPosts,
      totalViews,
      categoriesCount,
      tagsCount
    }
  }

  /**
   * 重新加载内容
   */
  async reload() {
    this.loaded = false
    this.posts = []
    this.config = {}
    await this.init()
  }
}

// 创建单例实例
const contentLoader = new ContentLoader()

export default contentLoader
