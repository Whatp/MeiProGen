<script setup lang="ts">
import { computed } from 'vue'
import ThemeToggle from './ThemeToggle.vue'
import LanguageToggle from './LanguageToggle.vue'
import GitHubLink from './GitHubLink.vue'
import { useLanguageStore } from '../stores/language'
import { storeToRefs } from 'pinia'

const languageStore = useLanguageStore()
const { language } = storeToRefs(languageStore)

const siteTitle = computed(() => {
  return language.value === 'zh' ? '梅零落的Profile生成器' : "MeiLingLuo's Profile Generator"
})

const navLinkText = computed(() => {
  return language.value === 'zh' ? '梅的导航站' : "MEI's NAV"
})
</script>

<script lang="ts">
export default {
  name: 'Header',
}
</script>

<template>
  <header class="header">
    <div class="logo-container">
      <img alt="Logo" class="logo" src="@/assets/logo.svg" />
      <span class="site-name">{{ siteTitle }}</span>
    </div>
    <div class="header-actions">
      <LanguageToggle />
      <ThemeToggle />
      <GitHubLink />
      <a :href="'https://nav.meilingluo.cn'" target="_blank" class="nav-link framed-link">
        {{ navLinkText }}
      </a>
    </div>
  </header>
</template>

<style scoped>
/* 头部容器 - 负责顶部导航栏的布局 */
.header {
  /* 使用弹性布局，水平排列子元素 */
  display: flex;
  /* 子元素两端对齐 */
  justify-content: space-between;
  /* 子元素垂直居中 */
  align-items: center;
  /* 内边距，使内容与边缘保持距离 */
  padding: 1rem 2rem;
  /* 背景色 */
  background-color: var(--color-background);
  /* 底部边框 */
  border-bottom: 1px solid var(--color-border);
  /* 确保头部占满整个屏幕宽度 */
  width: 100%;
  /* 盒模型，包含padding和border */
  box-sizing: border-box;
}

/* logo容器 - 负责logo和网站名称的布局 */
.logo-container {
  /* 使用弹性布局，水平排列子元素 */
  display: flex;
  /* 子元素垂直居中 */
  align-items: center;
  /* 子元素之间的间距 */
  gap: 1rem;
}

/* logo图片 - 负责logo图片的样式 */
.logo {
  /* 宽度 */
  width: 40px;
  /* 高度 */
  height: 40px;
}

/* 网站名称 - 负责网站名称的样式 */
.site-name {
  /* 字体大小 */
  font-size: 1.5rem;
  /* 字体粗细 */
  font-weight: bold;
  /* 字体颜色 */
  color: var(--color-text);
}

/* 头部操作区域 - 负责语言和主题切换按钮的布局 */
.header-actions {
  /* 使用弹性布局，水平排列子元素 */
  display: flex;
  /* 子元素垂直居中 */
  align-items: center;
  /* 子元素之间的间距 */
  gap: 1rem;
}

/* GitHub 图标链接样式 */
.header-actions a[aria-label='GitHub'] {
  /* 显示为内联块级元素 */
  display: inline-flex;
  /* 内容居中对齐 */
  align-items: center;
  justify-content: center;
  /* 内边距 */
  padding: 0.5rem;
  /* 圆角 */
  border-radius: 0.5rem;
  /* 文字颜色 */
  color: var(--vt-c-text-1);
  /* 背景色透明 */
  background-color: transparent;
  /* 移除下划线 */
  text-decoration: none;
  /* 过渡效果 */
  transition: all 0.2s ease;
}

/* GitHub 图标悬停效果 */
.header-actions a[aria-label='GitHub']:hover {
  /* 悬停时的背景色 */
  background-color: var(--vt-c-bg-soft);
  /* 悬停时的颜色 */
  color: var(--vt-c-text-2);
}

/* 导航站链接样式 */
.nav-link {
  /* 显示为内联块级元素 */
  display: inline-flex;
  /* 内容居中对齐 */
  align-items: center;
  /* 内边距 */
  padding: 0.5rem 0.75rem;
  /* 圆角 */
  border-radius: 0.5rem;
  /* 文字颜色 */
  color: var(--vt-c-text-1);
  /* 背景色透明 */
  background-color: transparent;
  /* 移除下划线 */
  text-decoration: none;
  /* 字体大小 */
  font-size: 0.875rem;
  /* 字体粗细 */
  font-weight: 500;
  /* 过渡效果 */
  transition: all 0.2s ease;
}

/* 导航站链接方框样式 */
.framed-link {
  /* 使用弹性布局，水平排列子元素 */
  display: flex;
  /* 子元素垂直和水平居中 */
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: var(--color-background-soft);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transform: translateY(0);
  transition: all 0.3s ease;
  /* 最小宽度确保一致性 */
  min-width: 120px;
  /* 固定高度 */
  height: 40px;
}

/* 导航站链接悬停效果 */
.framed-link:hover {
  /* 悬停时的背景色 */
  background-color: var(--color-background-mute);
  /* 悬停时的颜色 */
  color: var(--vt-c-text-2);
  /* 悬停时改变边框颜色 */
  border-color: var(--color-border-hover);
  /* 悬停时的阴影效果 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  /* 悬停时轻微上移 */
  transform: translateY(-1px);
}

/* 响应式设计 - 小屏幕 */
@media (max-width: 768px) {
  /* 头部容器 - 在小屏幕上减少内边距 */
  .header {
    padding: 1rem;
  }

  /* 网站名称 - 在小屏幕上减小字体大小 */
  .site-name {
    font-size: 1.2rem;
  }
}
</style>