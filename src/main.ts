// 导入全局样式
import './assets/main.css'

// 导入Vue和Pinia
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// 导入应用根组件和路由器
import App from './App.vue'
import router from './router'

// 导入状态管理stores
import { useThemeStore } from './stores/theme'
import { useLanguageStore } from './stores/language'
import { useProfileStore } from './stores/profile'

// 创建Vue应用实例
const app = createApp(App)

// 安装Pinia状态管理
app.use(createPinia())

// 安装路由器
app.use(router)

// 初始化主题
const themeStore = useThemeStore()
themeStore.initTheme()

// 初始化语言
const languageStore = useLanguageStore()
languageStore.initLanguage()

// 挂载应用到DOM
app.mount('#app')
