<script setup lang="ts">
import { useLanguageStore } from '../stores/language'

const languageStore = useLanguageStore()

const toggleLanguage = () => {
  languageStore.toggleLanguage()
  // 不再需要刷新页面，语言切换会响应式更新
}
</script>

<script lang="ts">
export default {
  name: 'LanguageToggle'
}
</script>

<template>
  <button @click="toggleLanguage" class="language-toggle" :aria-label="`切换到${languageStore.language === 'zh' ? 'English' : '中文'}`">
    <!-- <span class="language-icon">
      {{ languageStore.language === 'zh' ? 'EN' : '中' }}
    </span> -->
    <span class="language-text">
      {{ languageStore.language === 'zh' ? 'English' : '中文' }}
    </span>
  </button>
</template>

<style scoped>
/* 语言切换按钮 - 负责语言切换按钮的样式 */
.language-toggle {
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
  /* 鼠标指针 */
  cursor: pointer;
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

/* 语言切换按钮悬停状态 - 负责鼠标悬停时的样式 */
.language-toggle:hover {
  /* 背景色 */
  background-color: var(--color-background-mute);
  /* 边框颜色 */
  border-color: var(--color-border-hover);
  /* 阴影效果 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  /* 轻微上移 */
  transform: translateY(-1px);
}

/* 语言图标 - 负责语言图标样式 */
.language-icon {
  /* 字体粗细 */
  font-weight: bold;
}

/* 响应式设计 - 小屏幕 */
@media (max-width: 768px) {
  /* 语言切换按钮 - 在小屏幕上调整 */
  .language-toggle {
    min-width: 80px;
    height: 36px;
    padding: 0.4rem 0.75rem;
    font-size: 0.8rem;
  }
  
  /* 语言文本 - 在小屏幕上显示简化文本 */
  .language-text {
    font-size: 0.8rem;
  }
}

/* 更小的屏幕 - 手机端优化 */
@media (max-width: 480px) {
  .language-toggle {
    min-width: 70px;
    height: 32px;
    padding: 0.3rem 0.5rem;
  }
  
  /* 语言文本 - 在小屏幕上显示简化文本 */
  .language-text {
    font-size: 0.75rem;
  }
}
</style>