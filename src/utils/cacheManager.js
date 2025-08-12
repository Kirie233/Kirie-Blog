/**
 * 缓存管理器
 * 用于优化数据加载性能
 */

class CacheManager {
  constructor() {
    this.cache = new Map()
    this.cacheTimeout = 5 * 60 * 1000 // 5分钟缓存过期时间
  }

  // 生成缓存键
  generateKey(type, params = {}) {
    const paramStr = Object.keys(params)
      .sort()
      .map(key => `${key}:${params[key]}`)
      .join('|')
    return `${type}${paramStr ? `_${paramStr}` : ''}`
  }

  // 设置缓存
  set(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    })
  }

  // 获取缓存
  get(key) {
    const cached = this.cache.get(key)
    if (!cached) return null

    // 检查是否过期
    if (Date.now() - cached.timestamp > this.cacheTimeout) {
      this.cache.delete(key)
      return null
    }

    return cached.data
  }

  // 清除缓存
  clear(pattern = null) {
    if (pattern) {
      // 清除匹配模式的缓存
      for (const key of this.cache.keys()) {
        if (key.includes(pattern)) {
          this.cache.delete(key)
        }
      }
    } else {
      // 清除所有缓存
      this.cache.clear()
    }
  }

  // 获取缓存统计信息
  getStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    }
  }
}

// 创建单例实例
const cacheManager = new CacheManager()

export default cacheManager
