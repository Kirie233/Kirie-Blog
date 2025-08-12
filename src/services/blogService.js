/**
 * 博客数据服务
 * 提供优化的数据加载和管理功能
 */

import contentLoader from '@/utils/contentLoader.js'
import cacheManager from '@/utils/cacheManager.js'

class BlogService {
  constructor() {
    this.pageSize = 10 // 默认每页文章数量
  }

  // ========== 文章相关服务 ==========

  /**
   * 获取分页文章列表
   * @param {number} page - 页码（从1开始）
   * @param {number} pageSize - 每页数量
   * @param {Object} filters - 过滤条件
   * @returns {Object} 分页结果
   */
  async getPostsPaginated(page = 1, pageSize = this.pageSize, filters = {}) {
    const cacheKey = cacheManager.generateKey('posts_paginated', { 
      page, 
      pageSize, 
      ...filters 
    })
    
    // 尝试从缓存获取
    const cached = cacheManager.get(cacheKey)
    if (cached) {
      return cached
    }

    // 模拟异步加载
    await this.delay(100)

    let allPosts = await contentLoader.getAllPosts()

    // 应用过滤条件
    if (filters.category) {
      allPosts = allPosts.filter(post => post.category === filters.category)
    }
    if (filters.tag) {
      allPosts = allPosts.filter(post => post.tags.includes(filters.tag))
    }
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      allPosts = allPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm) ||
        post.summary?.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      )
    }

    // 计算分页
    const total = allPosts.length
    const totalPages = Math.ceil(total / pageSize)
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const posts = allPosts.slice(startIndex, endIndex)

    const result = {
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

    // 缓存结果
    cacheManager.set(cacheKey, result)
    
    return result
  }

  /**
   * 获取文章详情
   * @param {number} id - 文章ID
   * @returns {Object|null} 文章详情
   */
  async getPostById(id) {
    const cacheKey = cacheManager.generateKey('post_detail', { id })
    
    // 尝试从缓存获取
    const cached = cacheManager.get(cacheKey)
    if (cached) {
      return cached
    }

    // 模拟异步加载
    await this.delay(50)

    const post = await contentLoader.getPostById(id)
    if (post) {
      // 获取相关文章
      const relatedPosts = await contentLoader.getRelatedPosts(post, 3)
      
      const result = {
        ...post,
        relatedPosts
      }
      
      // 缓存结果
      cacheManager.set(cacheKey, result)
      
      return result
    }
    
    return null
  }

  // 相关文章获取已移至 contentLoader

  /**
   * 搜索文章
   * @param {string} query - 搜索关键词
   * @param {Object} options - 搜索选项
   * @returns {Object} 搜索结果
   */
  async searchPosts(query, options = {}) {
    const { page = 1, pageSize = this.pageSize } = options
    
    return this.getPostsPaginated(page, pageSize, { search: query })
  }

  /**
   * 获取文章归档
   * @returns {Object} 按年月分组的文章
   */
  async getPostsArchive() {
    const cacheKey = cacheManager.generateKey('posts_archive')
    
    // 尝试从缓存获取
    const cached = cacheManager.get(cacheKey)
    if (cached) {
      return cached
    }

    // 模拟异步加载
    await this.delay(100)

    const archive = await contentLoader.getArchive()

    // 缓存结果
    cacheManager.set(cacheKey, archive)

    return archive
  }

  // ========== 留言相关服务 ==========

  /**
   * 获取分页留言列表
   * @param {number} page - 页码
   * @param {number} pageSize - 每页数量
   * @returns {Object} 分页结果
   */
  async getMessagesPaginated(page = 1, pageSize = 20) {
    const cacheKey = cacheManager.generateKey('messages_paginated', { page, pageSize })
    
    // 尝试从缓存获取
    const cached = cacheManager.get(cacheKey)
    if (cached) {
      return cached
    }

    // 模拟异步加载
    await this.delay(50)

    // 留言功能保持使用 localStorage
    const allMessages = JSON.parse(localStorage.getItem('blog_messages') || '[]')
    const total = allMessages.length
    const totalPages = Math.ceil(total / pageSize)
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const messages = allMessages.slice(startIndex, endIndex)

    const result = {
      messages,
      pagination: {
        current: page,
        pageSize,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    }

    // 缓存结果
    cacheManager.set(cacheKey, result)
    
    return result
  }

  /**
   * 添加留言
   * @param {Object} messageData - 留言数据
   * @returns {Object} 新留言
   */
  async addMessage(messageData) {
    // 模拟异步处理
    await this.delay(200)

    // 添加留言到 localStorage
    const messages = JSON.parse(localStorage.getItem('blog_messages') || '[]')
    const newMessage = {
      id: Date.now(),
      name: messageData.name,
      email: messageData.email,
      website: messageData.website || '',
      content: messageData.content,
      time: new Date().toLocaleString('zh-CN'),
      avatar: messageData.avatar || 'https://via.placeholder.com/50'
    }

    messages.unshift(newMessage)
    localStorage.setItem('blog_messages', JSON.stringify(messages))

    // 清除相关缓存
    cacheManager.clear('messages_paginated')

    return newMessage
  }

  // ========== 统计和配置服务 ==========

  /**
   * 获取博客统计信息
   * @returns {Object} 统计数据
   */
  async getStats() {
    const cacheKey = cacheManager.generateKey('stats')
    
    // 尝试从缓存获取
    const cached = cacheManager.get(cacheKey)
    if (cached) {
      return cached
    }

    // 模拟异步加载
    await this.delay(50)

    const stats = await contentLoader.getStats()

    // 添加留言统计
    const messages = JSON.parse(localStorage.getItem('blog_messages') || '[]')
    stats.totalMessages = messages.length

    // 缓存结果
    cacheManager.set(cacheKey, stats)

    return stats
  }

  /**
   * 获取博客配置
   * @returns {Object} 配置信息
   */
  async getConfig() {
    const cacheKey = cacheManager.generateKey('config')
    
    // 尝试从缓存获取
    const cached = cacheManager.get(cacheKey)
    if (cached) {
      return cached
    }

    // 模拟异步加载
    await this.delay(30)

    const config = await contentLoader.getConfig()

    // 缓存结果
    cacheManager.set(cacheKey, config)

    return config
  }

  // ========== 工具方法 ==========

  /**
   * 模拟异步延迟
   * @param {number} ms - 延迟毫秒数
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  /**
   * 清除所有缓存
   */
  clearCache() {
    cacheManager.clear()
  }

  /**
   * 预加载数据
   */
  async preloadData() {
    // 预加载内容
    await contentLoader.init()

    // 预加载首页数据
    await this.getPostsPaginated(1)

    // 预加载配置信息
    await this.getConfig()

    // 预加载统计信息
    await this.getStats()
  }
}

// 创建单例实例
const blogService = new BlogService()

export default blogService
