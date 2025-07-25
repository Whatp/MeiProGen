<template>
  <div class="preview-panel">
    <div class="preview-header">
      <h3>
        {{
          viewMode === 'rendered'
            ? language === 'zh'
              ? '效果预览'
              : 'Preview'
            : language === 'zh'
            ? 'Markdown源码'
            : 'Markdown Source'
        }}
      </h3>
      <div class="preview-actions">
        <button
          @click="toggleView"
          class="view-toggle-btn"
          :class="{ active: viewMode === 'rendered' }"
        >
          {{
            viewMode === 'raw'
              ? language === 'zh'
                ? '🎨 效果预览'
                : '🎨 Preview'
              : language === 'zh'
              ? '📄 源码'
              : '📄 Source'
          }}
        </button>
        <button @click="copyToClipboard" class="copy-btn">
          {{ language === 'zh' ? '📋 复制' : '📋 Copy' }}
        </button>
      </div>
    </div>

    <div class="preview-content">
      <div v-if="viewMode === 'raw'" class="raw-markdown">
        <pre><code>{{ generatedMarkdown || (language === 'zh' ? '请填写基础信息并选择要显示的内容块...' : 'Please fill in the basic information and select the content blocks to display...') }}</code></pre>
      </div>
      <div v-else class="rendered-preview">
        <div v-html="renderedHtml" class="markdown-content" ref="markdownContent"></div>
      </div>
    </div>

    <div v-if="showCopySuccess" class="copy-success">
      {{ language === 'zh' ? '✅ 已复制到剪贴板!' : '✅ Copied to clipboard!' }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { marked } from 'marked'
import { useProfileStore } from '../stores/profile'
import { useLanguageStore } from '../stores/language'

const profileStore = useProfileStore()
const { generatedMarkdown } = storeToRefs(profileStore)

const languageStore = useLanguageStore()
const { language } = storeToRefs(languageStore)

// 视图模式：raw(原始) 或 rendered(渲染)
const viewMode = ref<'raw' | 'rendered'>('rendered')
const showCopySuccess = ref(false)
const markdownContent = ref<HTMLElement | null>(null)

// 切换视图模式
function toggleView() {
  viewMode.value = viewMode.value === 'raw' ? 'rendered' : 'raw'
}

// 处理图片加载错误
function handleImageError(event: Event) {
  const imgElement = event.target as HTMLImageElement
  // 创建一个包含错误信息的元素
  const errorDiv = document.createElement('div')
  errorDiv.innerHTML = `
    <div style="
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
      border-radius: 4px;
      padding: 1rem;
      margin: 1rem 0;
      text-align: center;
    ">
      <span>⚠️ Activity graph failed to load</span>
    </div>
  `
  // 替换图片元素
  if (imgElement.parentElement) {
    imgElement.parentElement.replaceChild(errorDiv.firstChild!, imgElement)
  }
}

// 处理图片加载完成
function handleImageLoad(event: Event) {
  const imgElement = event.target as HTMLImageElement
  // 移除加载状态（如果有的话）
  const parent = imgElement.parentElement
  if (parent && parent.classList.contains('image-loading')) {
    parent.classList.remove('image-loading')
  }
}

// 添加图片加载事件监听器
function addImageListeners() {
  // 等待DOM更新完成
  nextTick(() => {
    if (markdownContent.value) {
      // 查找所有图片元素
      const images = markdownContent.value.querySelectorAll('img')
      images.forEach((img) => {
        // 添加加载和错误事件监听器
        img.addEventListener('error', handleImageError)
        img.addEventListener('load', handleImageLoad)
      })
    }
  })
}

// 配置marked选项
marked.setOptions({
  breaks: true,
  gfm: true,
})

// 使用marked库进行Markdown到HTML转换
const renderedHtml = computed(() => {
  if (!generatedMarkdown.value) {
    return '<div class="empty-state">请填写基础信息并选择要显示的内容块...</div>'
  }

  try {
    const html = marked(generatedMarkdown.value)
    return html
  } catch (error) {
    console.error('Markdown渲染错误:', error)
    return '<div class="error-state">Markdown渲染出现错误，请检查内容格式</div>'
  }
})

// 复制到剪贴板
async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(generatedMarkdown.value)
    showCopySuccess.value = true
    setTimeout(() => {
      showCopySuccess.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy: ', err)
    // 降级方案
    const textArea = document.createElement('textarea')
    textArea.value = generatedMarkdown.value
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)

    showCopySuccess.value = true
    setTimeout(() => {
      showCopySuccess.value = false
    }, 2000)
  }
}

// 监听markdown变化，自动切换到渲染视图
watch(generatedMarkdown, (newMarkdown) => {
  if (newMarkdown && viewMode.value === 'raw') {
    // 可以选择是否自动切换到渲染视图
    // viewMode.value = 'rendered'
  }
  // 添加图片监听器
  addImageListeners()
})

// 在组件挂载时添加图片监听器
onMounted(() => {
  addImageListeners()
})
</script>

<style scoped>
.preview-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
}

.preview-header h3 {
  margin: 0;
  color: var(--color-text);
  font-size: 1.2rem;
}

.preview-actions {
  display: flex;
  gap: 0.5rem;
}

.view-toggle-btn,
.copy-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background-color: var(--color-background-mute);
  color: var(--color-text);
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.view-toggle-btn:hover,
.copy-btn:hover {
  background-color: var(--color-background-soft);
  border-color: #4caf50;
}

.view-toggle-btn.active {
  background-color: #4caf50;
  color: white;
  border-color: #4caf50;
}

.preview-content {
  flex: 1;
  overflow-y: auto;
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 8px;
}

/* 原始markdown样式 */
.raw-markdown {
  height: 100%;
}

.raw-markdown pre {
  margin: 0;
  padding: 1.5rem;
  height: 100%;
  overflow: auto;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--color-text);
  background-color: transparent;
}

.raw-markdown code {
  color: var(--color-text);
  background-color: transparent;
}

/* 渲染预览样式 */
.rendered-preview {
  height: 100%;
  overflow-y: auto;
}

.markdown-content {
  padding: 1.5rem;
  line-height: 1.6;
  color: var(--color-text);
}

/* 增加段落间距 */
.markdown-content p {
  margin-bottom: 1rem;
}

/* 增加标题之间的间距 */
.markdown-content h1,
.markdown-content h2,
.markdown-content h3,
.markdown-content h4,
.markdown-content h5,
.markdown-content h6 {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

/* 第一个标题的上边距为0 */
.markdown-content :first-child {
  margin-top: 0;
}

.markdown-content .empty-state {
  text-align: center;
  color: #888;
  font-style: italic;
  padding: 2rem;
}

/* Markdown内容样式 */
.markdown-content h1 {
  font-size: 2rem;
  margin: 0 0 1rem 0;
  color: var(--color-text);
  border-bottom: 2px solid var(--color-border);
  padding-bottom: 0.5rem;
}

.markdown-content h2 {
  font-size: 1.5rem;
  margin: 1.5rem 0 1rem 0;
  color: var(--color-text);
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 0.3rem;
}

.markdown-content h3 {
  font-size: 1.2rem;
  margin: 1rem 0 0.5rem 0;
  color: var(--color-text);
}

.markdown-content p {
  margin: 0.5rem 0;
}

/* 增加段落间距 */
.markdown-content p {
  margin-bottom: 1rem;
}

/* 增加标题之间的间距 */
.markdown-content h1,
.markdown-content h2,
.markdown-content h3,
.markdown-content h4,
.markdown-content h5,
.markdown-content h6 {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

/* 第一个标题的上边距为0 */
.markdown-content :first-child {
  margin-top: 0;
}

.markdown-content a {
  color: #4caf50;
  text-decoration: none;
}

.markdown-content a:hover {
  text-decoration: underline;
}

.markdown-content img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 0.5rem 0;
}

.markdown-content ul {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
}

.markdown-content li {
  margin: 0.25rem 0;
}

.markdown-content pre {
  background-color: var(--color-background-mute);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 1rem;
  overflow-x: auto;
  margin: 1rem 0;
}

.markdown-content code {
  background-color: var(--color-background-mute);
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.9em;
}

.markdown-content pre code {
  background-color: transparent;
  padding: 0;
}

.markdown-content strong {
  font-weight: 600;
}

.markdown-content em {
  font-style: italic;
}

/* GitHub风格的div居中 */
.markdown-content :deep(div[align='center']) {
  text-align: center;
  margin: 1rem 0;
}

/* 复制成功提示 */
.copy-success {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #4caf50;
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 100;
  animation: fadeInOut 2s ease-in-out;
}

@keyframes fadeInOut {
  0%,
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8);
  }
  10%,
  90% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .preview-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .preview-actions {
    justify-content: center;
  }

  .view-toggle-btn,
  .copy-btn {
    flex: 1;
    text-align: center;
  }

  .raw-markdown pre,
  .markdown-content {
    padding: 1rem;
  }
}
</style>
