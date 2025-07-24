import { ref } from 'vue'
import { defineStore } from 'pinia'

/**
 * 语言状态管理 store
 * 负责管理应用的语言状态（中文/英文）
 */
export const useLanguageStore = defineStore('language', () => {
  // 语言状态：'zh' 或 'en'
  const language = ref<'zh' | 'en'>('zh')

  /**
   * 切换语言
   * 在中文和英文之间切换
   */
  const toggleLanguage = () => {
    // 切换语言状态
    language.value = language.value === 'zh' ? 'en' : 'zh'
    // 保存到本地存储
    localStorage.setItem('language', language.value)
  }

  /**
   * 初始化语言
   * 从本地存储或浏览器偏好设置中获取语言
   */
  const initLanguage = () => {
    // 从本地存储获取语言设置，如果没有则使用默认值
    const savedLanguage = localStorage.getItem('language') as 'zh' | 'en' | null
    if (savedLanguage) {
      // 使用本地存储的语言
      language.value = savedLanguage
    } else {
      // 检查浏览器语言偏好
      const browserLanguage = navigator.language.toLowerCase()
      // 根据浏览器语言设置语言
      language.value = browserLanguage.startsWith('zh') ? 'zh' : 'en'
    }
  }

  // 返回store的公共接口
  return { language, toggleLanguage, initLanguage }
})