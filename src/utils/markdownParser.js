/**
 * Markdown 文件解析器
 * 支持 frontmatter 和内容解析
 */

class MarkdownParser {
  constructor() {
    this.frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  }

  /**
   * 解析 Markdown 文件内容
   * @param {string} content - 原始文件内容
   * @returns {Object} 解析结果
   */
  parse(content) {
    const match = content.match(this.frontmatterRegex)
    
    if (!match) {
      // 没有 frontmatter，整个内容都是正文
      return {
        frontmatter: {},
        content: content.trim(),
        excerpt: this.generateExcerpt(content)
      }
    }

    const [, frontmatterStr, markdownContent] = match
    const frontmatter = this.parseFrontmatter(frontmatterStr)
    const processedContent = markdownContent.trim()

    return {
      frontmatter,
      content: processedContent,
      excerpt: frontmatter.summary || this.generateExcerpt(processedContent),
      wordCount: this.countWords(processedContent),
      readingTime: this.calculateReadingTime(processedContent)
    }
  }

  /**
   * 解析 frontmatter
   * @param {string} frontmatterStr - frontmatter 字符串
   * @returns {Object} 解析后的对象
   */
  parseFrontmatter(frontmatterStr) {
    const frontmatter = {}
    const lines = frontmatterStr.split('\n')

    for (const line of lines) {
      const trimmedLine = line.trim()
      if (!trimmedLine || trimmedLine.startsWith('#')) continue

      const colonIndex = trimmedLine.indexOf(':')
      if (colonIndex === -1) continue

      const key = trimmedLine.substring(0, colonIndex).trim()
      let value = trimmedLine.substring(colonIndex + 1).trim()

      // 移除引号
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }

      // 处理数组
      if (value.startsWith('[') && value.endsWith(']')) {
        try {
          value = JSON.parse(value)
        } catch (error) {
          // 如果 JSON 解析失败，尝试简单的数组解析
          value = value.slice(1, -1)
            .split(',')
            .map(item => item.trim().replace(/['"]/g, ''))
            .filter(item => item)
        }
      }

      // 处理布尔值
      if (value === 'true') value = true
      if (value === 'false') value = false

      frontmatter[key] = value
    }

    return frontmatter
  }

  /**
   * 生成文章摘要
   * @param {string} content - 文章内容
   * @param {number} maxLength - 最大长度
   * @returns {string} 摘要
   */
  generateExcerpt(content, maxLength = 200) {
    // 移除 Markdown 标记
    const plainText = content
      .replace(/#{1,6}\s+/g, '') // 移除标题标记
      .replace(/\*\*(.*?)\*\*/g, '$1') // 移除粗体标记
      .replace(/\*(.*?)\*/g, '$1') // 移除斜体标记
      .replace(/`(.*?)`/g, '$1') // 移除代码标记
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // 移除链接标记
      .replace(/!\[.*?\]\(.*?\)/g, '') // 移除图片
      .replace(/>\s+/g, '') // 移除引用标记
      .replace(/\n+/g, ' ') // 替换换行符为空格
      .replace(/\s+/g, ' ') // 合并多个空格
      .trim()

    return plainText.length > maxLength 
      ? plainText.substring(0, maxLength) + '...'
      : plainText
  }

  /**
   * 统计字数
   * @param {string} content - 文章内容
   * @returns {number} 字数
   */
  countWords(content) {
    // 移除 Markdown 标记后统计
    const plainText = this.generateExcerpt(content, Infinity)
    
    // 中文字符统计
    const chineseChars = (plainText.match(/[\u4e00-\u9fa5]/g) || []).length
    
    // 英文单词统计
    const englishWords = plainText
      .replace(/[\u4e00-\u9fa5]/g, '') // 移除中文字符
      .split(/\s+/)
      .filter(word => word.length > 0).length

    return chineseChars + englishWords
  }

  /**
   * 计算阅读时间
   * @param {string} content - 文章内容
   * @returns {number} 阅读时间（分钟）
   */
  calculateReadingTime(content) {
    const wordCount = this.countWords(content)
    // 假设中文阅读速度为 300 字/分钟，英文为 200 词/分钟
    const readingSpeed = 250 // 平均阅读速度
    return Math.ceil(wordCount / readingSpeed)
  }

  /**
   * 将 Markdown 转换为 HTML（简单实现）
   * @param {string} markdown - Markdown 内容
   * @returns {string} HTML 内容
   */
  markdownToHtml(markdown) {
    let html = markdown
      // 标题
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      
      // 粗体和斜体
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      
      // 代码
      .replace(/`(.*?)`/g, '<code>$1</code>')
      
      // 链接
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      
      // 图片
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2" />')
      
      // 换行
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>')

    // 包装段落
    if (!html.startsWith('<h') && !html.startsWith('<p>')) {
      html = '<p>' + html + '</p>'
    }

    return html
  }

  /**
   * 验证 frontmatter 必需字段
   * @param {Object} frontmatter - frontmatter 对象
   * @returns {Object} 验证结果
   */
  validateFrontmatter(frontmatter) {
    const errors = []
    const warnings = []

    // 必需字段检查
    if (!frontmatter.title) {
      errors.push('缺少必需字段: title')
    }
    if (!frontmatter.date) {
      errors.push('缺少必需字段: date')
    }
    if (!frontmatter.category) {
      errors.push('缺少必需字段: category')
    }

    // 日期格式检查
    if (frontmatter.date && !/^\d{4}-\d{2}-\d{2}$/.test(frontmatter.date)) {
      errors.push('日期格式错误，应为 YYYY-MM-DD')
    }

    // 推荐字段检查
    if (!frontmatter.tags || !Array.isArray(frontmatter.tags)) {
      warnings.push('建议添加 tags 字段')
    }
    if (!frontmatter.summary) {
      warnings.push('建议添加 summary 字段')
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    }
  }

  /**
   * 生成文章的 URL slug
   * @param {string} title - 文章标题
   * @param {string} date - 发布日期
   * @returns {string} URL slug
   */
  generateSlug(title, date) {
    const titleSlug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // 移除特殊字符
      .replace(/\s+/g, '-') // 空格替换为连字符
      .replace(/-+/g, '-') // 合并多个连字符
      .trim()

    return `${date}-${titleSlug}`
  }
}

// 创建单例实例
const markdownParser = new MarkdownParser()

export default markdownParser
