<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '../stores/theme'
import { useLanguageStore } from '../stores/language'
import { storeToRefs } from 'pinia'

const themeStore = useThemeStore()
const languageStore = useLanguageStore()
const { language } = storeToRefs(languageStore)

const toggleTheme = () => {
  themeStore.toggleTheme()
}

const themeText = computed(() => {
  if (language.value === 'zh') {
    return themeStore.theme === 'light' ? '深色主题' : '浅色主题'
  } else {
    return themeStore.theme === 'light' ? 'Dark Mode' : 'Light Mode'
  }
})

const ariaLabel = computed(() => {
  if (language.value === 'zh') {
    return `切换到${themeStore.theme === 'light' ? '深色' : '浅色'}主题`
  } else {
    return `Switch to ${themeStore.theme === 'light' ? 'dark' : 'light'} mode`
  }
})
</script>

<script lang="ts">
export default {
  name: 'ThemeToggle'
}
</script>

<template>
  <button @click="toggleTheme" class="theme-toggle" :aria-label="ariaLabel">
    <span class="theme-icon">
      <span v-if="themeStore.theme === 'light'">🌙</span>
      <span v-else>☀️</span>
    </span>
    <span class="theme-text">
      {{ themeText }}
    </span>
  </button>
</template>

<style scoped>
/* 主题切换按钮 - 负责主题切换按钮的样式 */
.theme-toggle {
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

/* 主题切换按钮悬停状态 - 负责鼠标悬停时的样式 */
.theme-toggle:hover {
  /* 背景色 */
  background-color: var(--color-background-mute);
  /* 边框颜色 */
  border-color: var(--color-border-hover);
  /* 阴影效果 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  /* 轻微上移 */
  transform: translateY(-1px);
}

/* 主题图标 - 负责主题图标样式 */
.theme-icon {
  /* 字体大小 */
  font-size: 1.2rem;
}

/* 响应式设计 - 小屏幕 */
@media (max-width: 768px) {
  /* 主题文本 - 在小屏幕上隐藏文本 */
  .theme-text {
    display: none;
  }
  
  /* 主题切换按钮 - 在小屏幕上调整内边距 */
  .theme-toggle {
    padding: 0.5rem;
  }
}
</style>