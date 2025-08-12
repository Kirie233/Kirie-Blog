#!/usr/bin/env node

/**
 * 内容索引生成器
 * 扫描 content 目录，生成文章索引文件
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 路径配置
const CONTENT_DIR = path.join(__dirname, '../content')
const POSTS_DIR = path.join(CONTENT_DIR, 'posts')
const PUBLIC_DIR = path.join(__dirname, '../public')
const OUTPUT_FILE = path.join(PUBLIC_DIR, 'content-index.json')

/**
 * 解析 frontmatter
 */
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)
  
  if (!match) {
    return { frontmatter: {}, content: content.trim() }
  }

  const [, frontmatterStr, markdownContent] = match
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

  return { frontmatter, content: markdownContent.trim() }
}

/**
 * 生成文章摘要
 */
function generateExcerpt(content, maxLength = 200) {
  const plainText = content
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`(.*?)`/g, '$1')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/>\s+/g, '')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  return plainText.length > maxLength 
    ? plainText.substring(0, maxLength) + '...'
    : plainText
}

/**
 * 统计字数
 */
function countWords(content) {
  const plainText = generateExcerpt(content, Infinity)
  const chineseChars = (plainText.match(/[\u4e00-\u9fa5]/g) || []).length
  const englishWords = plainText
    .replace(/[\u4e00-\u9fa5]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 0).length
  return chineseChars + englishWords
}

/**
 * 计算阅读时间
 */
function calculateReadingTime(content) {
  const wordCount = countWords(content)
  const readingSpeed = 250
  return Math.ceil(wordCount / readingSpeed)
}

/**
 * 生成 URL slug
 */
function generateSlug(title, date) {
  const titleSlug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()

  return `${date}-${titleSlug}`
}

/**
 * 扫描文章目录
 */
function scanPosts() {
  if (!fs.existsSync(POSTS_DIR)) {
    console.warn('文章目录不存在:', POSTS_DIR)
    return []
  }

  const files = fs.readdirSync(POSTS_DIR)
  const posts = []

  for (const filename of files) {
    if (!filename.endsWith('.md')) continue

    const filePath = path.join(POSTS_DIR, filename)
    const content = fs.readFileSync(filePath, 'utf8')
    const { frontmatter, content: markdownContent } = parseFrontmatter(content)

    // 验证必需字段
    if (!frontmatter.title || !frontmatter.date || !frontmatter.category) {
      console.warn(`文章 ${filename} 缺少必需字段，跳过`)
      continue
    }

    // 过滤草稿（生产环境）
    if (process.env.NODE_ENV === 'production' && frontmatter.draft) {
      console.log(`跳过草稿: ${filename}`)
      continue
    }

    const post = {
      id: filename.replace(/\.md$/, '').replace(/[^a-zA-Z0-9]/g, '-'),
      filename,
      slug: generateSlug(frontmatter.title, frontmatter.date),
      title: frontmatter.title,
      date: frontmatter.date,
      category: frontmatter.category,
      tags: frontmatter.tags || [],
      summary: frontmatter.summary || generateExcerpt(markdownContent),
      author: frontmatter.author || 'Kirie',
      draft: frontmatter.draft || false,
      wordCount: countWords(markdownContent),
      readingTime: calculateReadingTime(markdownContent)
    }

    posts.push(post)
  }

  // 按日期排序
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
}

/**
 * 生成内容索引
 */
function generateContentIndex() {
  console.log('开始生成内容索引...')

  const posts = scanPosts()
  
  // 统计信息
  const categories = {}
  const tags = {}
  
  posts.forEach(post => {
    categories[post.category] = (categories[post.category] || 0) + 1
    post.tags.forEach(tag => {
      tags[tag] = (tags[tag] || 0) + 1
    })
  })

  const index = {
    posts,
    stats: {
      totalPosts: posts.length,
      categories,
      tags
    },
    generated: new Date().toISOString()
  }

  // 确保输出目录存在
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true })
  }

  // 写入索引文件
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(index, null, 2))
  
  console.log(`✅ 内容索引生成完成: ${OUTPUT_FILE}`)
  console.log(`📝 共找到 ${posts.length} 篇文章`)
  console.log(`📂 分类: ${Object.keys(categories).join(', ')}`)
  console.log(`🏷️ 标签: ${Object.keys(tags).join(', ')}`)
}

// 运行生成器
try {
  generateContentIndex()
} catch (error) {
  console.error('❌ 内容索引生成失败:', error)
  process.exit(1)
}
