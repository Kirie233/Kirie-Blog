// scripts/build-index.js (更健壮的版本)

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url'; // 导入新工具
import { glob } from 'glob';
import matter from 'gray-matter';

// -- Helper Functions (保持不变) --
/**
 * 生成文章ID (支持中文等Unicode字符)
 * @param {string} filename 
 * @returns {string}
 */
function generateId(filename) {
  // 移除 .md 后缀
  const withoutExt = filename.replace(/\.md$/, '');
  
  // 使用 Unicode 属性转义 (\p{L} \p{N}) 来匹配任何语言的字母和数字
  // `u` 标志是必须的
  // 这会保留中文、英文、数字，并将其他所有内容（如 /、空格）替换为 -
  const replaced = withoutExt.replace(/[^\p{L}\p{N}-]/gu, '-');
  
  // (推荐) 清理多余的连字符，例如 -- 变成 -，并移除开头和结尾的 -
  return replaced
    .replace(/--+/g, '-') // 合并连续的连字符
    .replace(/^-+|-+$/g, ''); // 移除开头和结尾的连字符
}

function generateSlug(title, date) {
  const datePart = new Date(date).toISOString().split('T')[0].replace(/-/g, '/');
  const titlePart = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  return `${datePart}/${titlePart}`;
}

async function buildContentIndex() {
  // ▼▼▼ 关键修改点 ▼▼▼
  // 使用 import.meta.url 来获取当前脚本的绝对路径，这比 process.cwd() 更可靠
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // 计算出 public 和 posts 目录的绝对路径
  const publicDir = path.resolve(__dirname, '..', 'public');
  const postsDir = path.resolve(publicDir, 'content', 'posts'); 

  console.log(`[Index Builder] Scanning for posts in: ${postsDir}`);

  const files = await glob('**/*.md', { cwd: postsDir });

  console.log(`[Index Builder] Found ${files.length} markdown files.`);
  
  if (files.length === 0) {
    console.warn('[Index Builder] No markdown files found. The index will be empty.');
  }

  const posts = [];

  for (const file of files) {
    const filePath = path.join(postsDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    
    const { data: frontmatter } = matter(fileContent);

    if (!frontmatter.title || !frontmatter.date) {
      console.warn(`[Index Builder] Skipping ${file}: missing title or date.`);
      continue;
    }

    const filename = file.replace(/\\/g, '/');

    posts.push({
      id: generateId(filename),
      filename: filename,
      slug: generateSlug(frontmatter.title, frontmatter.date),
      title: frontmatter.title,
      date: frontmatter.date,
      category: frontmatter.category || '未分类',
      tags: frontmatter.tags || [],
      draft: frontmatter.draft || false,
    });
  }

  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  const index = {
    posts: posts,
    generatedAt: new Date().toISOString()
  };

  fs.writeFileSync(path.join(publicDir,'content-index.json'), JSON.stringify(index, null, 2));

  console.log(`✅ Content index generated successfully with ${posts.length} posts.`);
}

buildContentIndex();