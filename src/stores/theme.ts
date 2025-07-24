import { ref } from 'vue'
import { defineStore } from 'pinia'

/**
 * 主题状态管理 store
 * 负责管理应用的主题状态（浅色/深色）
 */
export const useThemeStore = defineStore('theme', () => {
  // 主题状态：'light' 或 'dark'
  const theme = ref<'light' | 'dark'>('light')

  /**
   * 切换主题
   * 在浅色和深色主题之间切换
   */
  const toggleTheme = () => {
    // 切换主题状态
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    // 保存到本地存储
    localStorage.setItem('theme', theme.value)
    // 应用主题
    applyTheme(theme.value)
  }

  /**
   * 应用主题
   * @param newTheme 新的主题（'light' 或 'dark'）
   */
  const applyTheme = (newTheme: 'light' | 'dark') => {
    if (newTheme === 'dark') {
      // 添加深色主题类名
      document.documentElement.classList.add('dark')
    } else {
      // 移除深色主题类名
      document.documentElement.classList.remove('dark')
    }
  }

  /**
   * 初始化主题
   * 从本地存储获取主题，默认为浅色主题
   */
  const initTheme = () => {
    // 从本地存储获取主题设置，如果没有则默认使用浅色主题
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (savedTheme) {
      // 使用本地存储的主题
      theme.value = savedTheme
    } else {
      // 默认使用浅色主题
      theme.value = 'light'
    }
    // 应用主题
    applyTheme(theme.value)
  }

  // 返回store的公共接口
  return { theme, toggleTheme, initTheme }
})