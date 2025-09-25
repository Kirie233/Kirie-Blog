import { marked } from 'marked';
import hljs from 'highlight.js';
import matter from 'gray-matter'; // 导入 gray-matter

// 配置 marked
marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: 'hljs language-',
  gfm: true,
  breaks: false,
  pedantic: false
});

/**
 * 解析包含 Front Matter 的 Markdown 文本
 * @param {string} markdownText - 完整的 Markdown 文件内容
 * @returns {object} - 返回包含 frontmatter 和 content 的对象
 */
function parseWithFrontmatter(markdownText) {
  // 使用 gray-matter 解析
  // matterResult 的结构是 { data: {...}, content: '...' }
  const matterResult = matter(markdownText);
  
  return {
    frontmatter: matterResult.data, // 这是 YAML 元数据
    content: matterResult.content    // 这是 Markdown 正文
  };
}

/**
 * 计算文章字数
 * @param {string} text - 文本内容
 * @returns {number}
 */
function countWords(text) {
  if (!text) return 0;
  // 简单地通过空格分割来计算词数，可以根据需要优化
  return text.trim().split(/\s+/).length;
}

/**
 * 估算阅读时间（分钟）
 * @param {number} wordCount - 字数
 * @returns {number}
 */
function estimateReadingTime(wordCount) {
  const wordsPerMinute = 200; // 平均阅读速度
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * 生成文章摘要
 * @param {string} htmlContent - 渲染后的 HTML 内容
 * @param {number} length - 摘要长度
 * @returns {string}
 */
function generateExcerpt(htmlContent, length = 150) {
  if (!htmlContent) return '';
  // 移除 HTML 标签并截取指定长度
  const text = htmlContent.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  return text.length > length ? text.substring(0, length) + '...' : text;
}

/**
 * 主解析函数，供外部调用
 * @param {string} markdownText - 完整的 Markdown 文件内容
 * @returns {object}
 */
export function parse(markdownText) {
  if (!markdownText) {
    return {
      frontmatter: {},
      content: '',
      html: '',
      excerpt: '',
      wordCount: 0,
      readingTime: 0
    };
  }

  // 1. 解析 Front Matter 和正文
  const { frontmatter, content } = parseWithFrontmatter(markdownText);
  
  // 2. 将 Markdown 正文转换为 HTML
  const html = marked(content);
  
  // 3. 计算字数和阅读时间
  const wordCount = countWords(content);
  const readingTime = estimateReadingTime(wordCount);
  
  // 4. 生成摘要
  const excerpt = generateExcerpt(html);

  return {
    frontmatter,  // 元数据对象
    content,      // Markdown 正文
    html,         // 渲染后的 HTML
    excerpt,      // 摘要
    wordCount,    // 字数
    readingTime   // 阅读时间
  };
}

/**
 * 验证 frontmatter 是否包含必要字段
 * @param {object} frontmatter
 * @returns {object} - { isValid: boolean, errors: string[] }
 */
export function validateFrontmatter(frontmatter) {
  const requiredFields = ['title', 'date', 'category', 'tags'];
  const errors = [];
  let isValid = true;

  requiredFields.forEach(field => {
    if (!frontmatter || !frontmatter[field]) {
      errors.push(`缺少必需字段: ${field}`);
      isValid = false;
    }
  });

  return { isValid, errors };
}

/**
 * 根据标题和日期生成 URL slug
 * @param {string} title
 * @param {string} date
 * @returns {string}
 */
export function generateSlug(title, date) {
  const datePart = new Date(date).toISOString().split('T')[0].replace(/-/g, '/');
  const titlePart = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  return `${datePart}/${titlePart}`;
}