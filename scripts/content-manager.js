#!/usr/bin/env node

/**
 * 博客内容管理命令行工具
 * 用于快速添加、编辑、删除博客文章和留言
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import readline from 'readline'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 数据文件路径
const CONTENT_DIR = path.join(__dirname, '../content')
const POSTS_DIR = path.join(CONTENT_DIR, 'posts')
const CONFIG_DIR = path.join(CONTENT_DIR, 'config')
const CONFIG_FILE = path.join(CONFIG_DIR, 'blog.json')

// 创建readline接口
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// 工具函数
const question = (prompt) => {
  return new Promise((resolve) => {
    rl.question(prompt, resolve)
  })
}

const loadJSON = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'))
    }
    return []
  } catch (error) {
    console.error(`读取文件失败: ${filePath}`, error.message)
    return []
  }
}

const saveJSON = (filePath, data) => {
  try {
    // 确保目录存在
    const dir = path.dirname(filePath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8')
    return true
  } catch (error) {
    console.error(`保存文件失败: ${filePath}`, error.message)
    return false
  }
}

const generateId = (items) => {
  return items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1
}

const generateSummary = (content, maxLength = 150) => {
  const plainText = content
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`(.*?)`/g, '$1')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/\n+/g, ' ')
    .trim()

  return plainText.length > maxLength 
    ? plainText.substring(0, maxLength) + '...'
    : plainText
}

// 文章管理功能
const addPost = async () => {
  console.log('\n=== 添加新文章 ===')

  const title = await question('文章标题: ')
  if (!title.trim()) {
    console.log('标题不能为空！')
    return
  }

  const category = await question('文章分类: ')
  const tagsInput = await question('标签 (用逗号分隔): ')
  const tags = tagsInput ? tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag) : []

  console.log('请输入文章内容 (支持Markdown，输入 "END" 结束):')
  let content = ''
  let line
  while ((line = await question('')) !== 'END') {
    content += line + '\n'
  }

  if (!content.trim()) {
    console.log('内容不能为空！')
    return
  }

  const summary = await question('文章摘要 (留空自动生成): ')
  const date = await question('发布日期 (YYYY-MM-DD, 留空使用今天): ') ||
    new Date().toISOString().split('T')[0]
  const author = await question('作者 (留空使用默认): ') || 'Kirie'
  const draft = (await question('是否为草稿? (y/N): ')).toLowerCase() === 'y'

  // 生成文件名
  const slug = generateSlug(title, date)
  const filename = `${slug}.md`
  const filepath = path.join(POSTS_DIR, filename)

  // 检查文件是否已存在
  if (fs.existsSync(filepath)) {
    console.log('❌ 文件已存在！请使用不同的标题或日期。')
    return
  }

  // 生成 Markdown 内容
  const markdownContent = `---
title: "${title.trim()}"
date: "${date}"
category: "${category.trim() || '未分类'}"
tags: ${JSON.stringify(tags)}
summary: "${summary.trim() || generateSummary(content.trim())}"
author: "${author}"
draft: ${draft}
---

${content.trim()}`

  // 确保目录存在
  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true })
  }

  // 保存文件
  try {
    fs.writeFileSync(filepath, markdownContent, 'utf8')
    console.log(`\n✅ 文章 "${title}" 创建成功！`)
    console.log(`📁 文件路径: ${filepath}`)
    console.log(`📝 分类: ${category.trim() || '未分类'}`)
    console.log(`🏷️ 标签: ${tags.join(', ') || '无'}`)
    console.log(`📅 日期: ${date}`)
    console.log(`✍️ 作者: ${author}`)
    console.log(`📋 草稿: ${draft ? '是' : '否'}`)
    console.log('\n💡 提示: 使用 git add && git commit && git push 来发布文章')
  } catch (error) {
    console.log('❌ 文章创建失败！', error.message)
  }
}

// 生成 URL slug
const generateSlug = (title, date) => {
  const titleSlug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()

  return `${date}-${titleSlug}`
}

const listPosts = () => {
  console.log('\n=== 文章列表 ===')

  if (!fs.existsSync(POSTS_DIR)) {
    console.log('文章目录不存在')
    return
  }

  const files = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.md'))

  if (files.length === 0) {
    console.log('暂无文章')
    return
  }

  files.forEach((filename, index) => {
    const filepath = path.join(POSTS_DIR, filename)
    const content = fs.readFileSync(filepath, 'utf8')
    const frontmatter = parseFrontmatter(content)

    console.log(`${index + 1}. ${frontmatter.title || filename}`)
    console.log(`   📁 文件: ${filename}`)
    console.log(`   📝 分类: ${frontmatter.category || '未分类'}`)
    console.log(`   📅 日期: ${frontmatter.date || '未知'}`)
    console.log(`   🏷️ 标签: ${(frontmatter.tags || []).join(', ') || '无'}`)
    console.log(`   ✍️ 作者: ${frontmatter.author || '未知'}`)
    console.log(`   📋 草稿: ${frontmatter.draft ? '是' : '否'}`)
    console.log(`   📄 摘要: ${frontmatter.summary || '无'}`)
    console.log('')
  })
}

// 解析 frontmatter
const parseFrontmatter = (content) => {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)

  if (!match) return {}

  const frontmatter = {}
  const lines = match[1].split('\n')

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

const deletePost = async () => {
  console.log('\n=== 删除文章 ===')

  if (!fs.existsSync(POSTS_DIR)) {
    console.log('文章目录不存在')
    return
  }

  const files = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.md'))

  if (files.length === 0) {
    console.log('暂无文章可删除')
    return
  }

  listPosts()

  const filename = await question('请输入要删除的文件名 (包含.md扩展名): ')

  if (!filename.endsWith('.md')) {
    console.log('请输入正确的文件名（需要包含.md扩展名）')
    return
  }

  const filepath = path.join(POSTS_DIR, filename)

  if (!fs.existsSync(filepath)) {
    console.log('文件不存在！')
    return
  }

  // 读取文章信息
  const content = fs.readFileSync(filepath, 'utf8')
  const frontmatter = parseFrontmatter(content)
  const title = frontmatter.title || filename

  const confirm = await question(`确定要删除文章 "${title}" 吗？(y/N): `)

  if (confirm.toLowerCase() === 'y') {
    try {
      fs.unlinkSync(filepath)
      console.log(`✅ 文章 "${title}" 删除成功！`)
      console.log(`📁 已删除文件: ${filepath}`)
      console.log('\n💡 提示: 使用 git add && git commit && git push 来同步删除')
    } catch (error) {
      console.log('❌ 文章删除失败！', error.message)
    }
  } else {
    console.log('取消删除')
  }
}

// 留言管理功能（留言存储在 localStorage 中，无法通过命令行管理）
const listMessages = () => {
  console.log('\n=== 留言列表 ===')
  console.log('💡 留言数据存储在浏览器的 localStorage 中')
  console.log('   请在浏览器中访问博客网站查看留言')
  console.log('   或者在浏览器开发者工具中查看 localStorage')
}

const deleteMessage = async () => {
  console.log('\n=== 删除留言 ===')
  console.log('💡 留言数据存储在浏览器的 localStorage 中')
  console.log('   无法通过命令行工具删除留言')
  console.log('   请在浏览器中访问博客网站进行留言管理')
}

// 统计信息
const showStats = () => {
  console.log('\n=== 统计信息 ===')

  if (!fs.existsSync(POSTS_DIR)) {
    console.log('文章目录不存在')
    return
  }

  const files = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.md'))
  const categories = {}
  const tags = {}

  files.forEach(filename => {
    const filepath = path.join(POSTS_DIR, filename)
    const content = fs.readFileSync(filepath, 'utf8')
    const frontmatter = parseFrontmatter(content)

    if (frontmatter.category) {
      categories[frontmatter.category] = (categories[frontmatter.category] || 0) + 1
    }

    if (frontmatter.tags && Array.isArray(frontmatter.tags)) {
      frontmatter.tags.forEach(tag => {
        tags[tag] = (tags[tag] || 0) + 1
      })
    }
  })

  console.log(`📝 文章总数: ${files.length}`)
  console.log(`💬 留言总数: 存储在浏览器 localStorage 中`)

  if (Object.keys(categories).length > 0) {
    console.log('\n📂 分类统计:')
    Object.entries(categories).forEach(([category, count]) => {
      console.log(`  ${category}: ${count}`)
    })
  }

  if (Object.keys(tags).length > 0) {
    console.log('\n🏷️ 标签统计:')
    Object.entries(tags).forEach(([tag, count]) => {
      console.log(`  ${tag}: ${count}`)
    })
  }
}

// 数据导入导出
const exportData = async () => {
  console.log('\n=== 导出数据 ===')

  const data = {
    contentDirectory: CONTENT_DIR,
    posts: [],
    config: loadJSON(CONFIG_FILE),
    exportTime: new Date().toISOString(),
    note: '文章数据以 Markdown 文件形式存储在 content/posts/ 目录中'
  }

  // 收集文章信息
  if (fs.existsSync(POSTS_DIR)) {
    const files = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.md'))
    files.forEach(filename => {
      const filepath = path.join(POSTS_DIR, filename)
      const content = fs.readFileSync(filepath, 'utf8')
      const frontmatter = parseFrontmatter(content)

      data.posts.push({
        filename,
        ...frontmatter
      })
    })
  }

  const filename = `blog-data-${new Date().toISOString().split('T')[0]}.json`
  const filepath = path.join(process.cwd(), filename)

  if (saveJSON(filepath, data)) {
    console.log(`✅ 数据导出成功: ${filename}`)
    console.log(`📁 包含 ${data.posts.length} 篇文章的元数据`)
    console.log(`💡 完整的文章内容请查看 content/posts/ 目录`)
  } else {
    console.log('❌ 数据导出失败！')
  }
}

// 主菜单
const showMenu = () => {
  console.log('\n=== 博客内容管理工具 ===')
  console.log('1. 添加文章')
  console.log('2. 查看文章列表')
  console.log('3. 删除文章')
  console.log('4. 查看留言列表')
  console.log('5. 删除留言')
  console.log('6. 统计信息')
  console.log('7. 导出数据')
  console.log('0. 退出')
  console.log('')
}

const main = async () => {
  console.log('欢迎使用博客内容管理工具！')
  
  while (true) {
    showMenu()
    const choice = await question('请选择操作: ')
    
    switch (choice) {
      case '1':
        await addPost()
        break
      case '2':
        listPosts()
        break
      case '3':
        await deletePost()
        break
      case '4':
        listMessages()
        break
      case '5':
        await deleteMessage()
        break
      case '6':
        showStats()
        break
      case '7':
        await exportData()
        break
      case '0':
        console.log('再见！')
        rl.close()
        process.exit(0)
      default:
        console.log('无效的选择，请重试')
    }
    
    await question('\n按回车键继续...')
  }
}

// 启动程序
main().catch(error => {
  console.error('程序运行出错:', error)
  rl.close()
  process.exit(1)
})
