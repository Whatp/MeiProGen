<script setup lang="ts">
import { computed } from 'vue'
import { useLanguageStore } from '../stores/language'
import { storeToRefs } from 'pinia'

const languageStore = useLanguageStore()
const { language } = storeToRefs(languageStore)

const githubText = computed(() => {
  return language.value === 'zh' ? 'GitHub' : 'GitHub'
})

const ariaLabel = computed(() => {
  return language.value === 'zh' ? '前往GitHub项目页面' : 'Visit GitHub repository'
})
</script>

<script lang="ts">
export default {
  name: 'GitHubLink'
}
</script>

<template>
  <a 
    href="https://github.com/whatp/MeiProGen" 
    target="_blank" 
    class="github-link"
    :aria-label="ariaLabel"
  >
    <span class="github-icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path
          d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S19.73.65 18 2.48a13.38 13.38 0 0 0-6 0C10.27.65 10.09 1 10.09 1A5.07 5.07 0 0 0 10 4.77 5.44 5.44 0 0 0 9.5 8.5c0 5.42 3.3 6.61 6.44 7a3.37 3.37 0 0 0-.94 2.61V22"
        ></path>
      </svg>
    </span>
    <span class="github-text">
      {{ githubText }}
    </span>
  </a>
</template>

<style scoped>
/* GitHub链接 - 负责GitHub链接的样式 */
.github-link {
  /* 使用弹性布局，水平排列子元素 */
  display: flex;
  /* 子元素垂直和水平居中 */
  align-items: center;
  justify-content: center;
  /* 子元素之间的间距 */
  gap: 0.5rem;
  /* 内边距 */
  padding: 0.5rem 1rem;
  /* 背景色 */
  background-color: var(--color-background-soft);
  /* 边框 */
  border: 1px solid var(--color-border);
  /* 圆角 */
  border-radius: 0.5rem;
  /* 字体颜色 */
  color: var(--color-text);
  /* 移除下划线 */
  text-decoration: none;
  /* 背景色变化动画 */
  transition: all 0.3s ease;
  /* 阴影效果 */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  /* 变换效果 */
  transform: translateY(0);
  /* 最小宽度确保一致性 */
  min-width: 120px;
  /* 固定高度 */
  height: 40px;
}

/* GitHub链接悬停状态 - 负责鼠标悬停时的样式 */
.github-link:hover {
  /* 背景色 */
  background-color: var(--color-background-mute);
  /* 边框颜色 */
  border-color: var(--color-border-hover);
  /* 阴影效果 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  /* 轻微上移 */
  transform: translateY(-1px);
}

/* GitHub图标 - 负责GitHub图标样式 */
.github-icon {
  /* 显示为flex以便图标居中 */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 响应式设计 - 小屏幕 */
@media (max-width: 768px) {
  /* GitHub链接 - 在小屏幕上调整 */
  .github-link {
    min-width: 80px;
    height: 36px;
    padding: 0.4rem 0.75rem;
    font-size: 0.8rem;
  }
  
  /* GitHub文本 - 在小屏幕上显示简化文本 */
  .github-text {
    font-size: 0.8rem;
  }
}

/* 更小的屏幕 - 手机端优化 */
@media (max-width: 480px) {
  .github-link {
    min-width: 70px;
    height: 32px;
    padding: 0.3rem 0.5rem;
  }
  
  /* GitHub文本 - 在小屏幕上隐藏文本 */
  .github-text {
    display: none;
  }
  
  /* GitHub图标 - SVG调整大小 */
  .github-icon svg {
    width: 16px;
    height: 16px;
  }
}
</style>
