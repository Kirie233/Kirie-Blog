#!/usr/bin/env node

/**
 * 清理未使用的本地图片文件
 * 检查 content/posts/ 中的图片是否在 Markdown 中被引用
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const POSTS_DIR = path.join(__dirname, '../content/posts')

function findUnusedImages() {
  const unusedImages = []
  
  function scanDirectory(dir) {
    const items = fs.readdirSync(dir)
    
    for (const item of items) {
      const itemPath = path.join(dir, item)
      const stat = fs.statSync(itemPath)
      
      if (stat.isDirectory()) {
        scanDirectory(itemPath)
      } else if (item.endsWith('.md')) {
        // 检查同目录下的图片文件
        const articleDir = path.dirname(itemPath)
        const content = fs.readFileSync(itemPath, 'utf8')
        
        const images = fs.readdirSync(articleDir)
          .filter(file => /\.(png|jpg|jpeg|gif|webp)$/i.test(file))
        
        for (const image of images) {
          // 检查图片是否在文章中被引用
          const isUsed = content.includes(image) || 
                        content.includes(path.basename(image, path.extname(image)))
          
          if (!isUsed) {
            unusedImages.push(path.join(articleDir, image))
          }
        }
      }
    }
  }
  
  scanDirectory(POSTS_DIR)
  return unusedImages
}

const unusedImages = findUnusedImages()

if (unusedImages.length > 0) {
  console.log('🗑️  发现未使用的图片文件:')
  unusedImages.forEach(img => console.log(`  - ${img}`))
  console.log('\n💡 建议删除这些文件以减小仓库体积')
} else {
  console.log('✅ 没有发现未使用的图片文件')
}