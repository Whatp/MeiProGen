import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { useLanguageStore } from './language'

// 定义支持的块类型
export interface ProfileBlock {
  id: string
  type: 'header' | 'stats' | 'skills' | 'projects' | 'social' | 'about' | 'activity'
  title: string
  enabled: boolean
  config: Record<string, any>
  order: number
}

// 定义基础profile信息
export interface ProfileInfo {
  name: string
  username: string
  title: string
  description: string
  location: string
  website: string
  email: string
  avatar: string
}

export const useProfileStore = defineStore('profile', () => {
  // 语言存储
  const languageStore = useLanguageStore()
  
  // 基础profile信息
  const profileInfo = ref<ProfileInfo>({
    name: '梅零落',
    username: 'whatp',
    title: '后端攻城狮',
    description: '🌱 持续学习，热爱开源，分享技术。',
    location: '北京，中国',
    website: 'https://wordpress.meilingluo.cn',
    email: 'meilingluo@example.com',
    avatar: 'https://avatars.githubusercontent.com/u/1?v=4'
  })

  // 可用的profile块
  const availableBlocks = ref<ProfileBlock[]>([
    {
      id: 'header',
      type: 'header',
      title: '个人信息头部',
      enabled: true,
      config: {
        showAvatar: true,
        showTitle: true,
        showLocation: true,
        showWebsite: true
      },
      order: 1
    },
    {
      id: 'about',
      type: 'about',
      title: '关于我',
      enabled: true,
      config: {
        content: '这里写一些关于你的介绍...'
      },
      order: 2
    },
    {
      id: 'stats',
      type: 'stats',
      title: 'GitHub统计',
      enabled: true,
      config: {
        showOverview: true,
        showLanguages: true,
        showStreak: true,
        theme: 'dark'
      },
      order: 3
    },
    {
      id: 'skills',
      type: 'skills',
      title: '技能 & 工具',
      enabled: false,
      config: {
        skills: ['JavaScript', 'TypeScript', 'Vue.js', 'React', 'Node.js'],
        showIcons: true,
        layout: 'badges'
      },
      order: 4
    },
    {
      id: 'projects',
      type: 'projects',
      title: '精选项目',
      enabled: false,
      config: {
        projects: [],
        showStats: true
      },
      order: 5
    },
    {
      id: 'social',
      type: 'social',
      title: '社交媒体',
      enabled: false,
      config: {
        platforms: {
          // 中国社交媒体
          wechat: '',
          weibo: '',
          bilibili: '',
          zhihu: '',
          juejin: '',
          // 国际社交媒体
          twitter: '',
          linkedin: '',
          github: '',
          discord: '',
          youtube: '',
          instagram: ''
        }
      },
      order: 6
    },
    {
      id: 'activity',
      type: 'activity',
      title: '最近活动',
      enabled: false,
      config: {
        showContributions: true,
        showRecentRepos: true
      },
      order: 7
    },
  ])

  // 计算启用的块（按顺序排列）
  const enabledBlocks = computed(() => 
    availableBlocks.value
      .filter(block => block.enabled)
      .sort((a, b) => a.order - b.order)
  )

  // 生成markdown内容
  const generatedMarkdown = computed(() => {
    console.log('generatedMarkdown computed called')
    console.log('enabledBlocks:', enabledBlocks.value)
    
    const blocks: string[] = []
    
    enabledBlocks.value.forEach(block => {
      console.log('Processing block:', block.type, block.enabled)
      let blockMarkdown = ''
      
      switch (block.type) {
        case 'header':
          blockMarkdown = generateHeaderMarkdown(block)
          break
        case 'about':
          blockMarkdown = generateAboutMarkdown(block)
          break
        case 'stats':
          blockMarkdown = generateStatsMarkdown(block)
          break
        case 'skills':
          blockMarkdown = generateSkillsMarkdown(block)
          break
        case 'projects':
          blockMarkdown = generateProjectsMarkdown(block)
          break
        case 'social':
          blockMarkdown = generateSocialMarkdown(block)
          break
        case 'activity':
          blockMarkdown = generateActivityMarkdown(block)
          break
      }
      
      console.log('Generated block markdown:', blockMarkdown)
      if (blockMarkdown.trim()) {
        blocks.push(blockMarkdown.trim())
      }
    })
    
    // 用四换行分隔块，增加模块之间的间距
    const result = blocks.join('  \n\n<br/><br/>  \n\n')
    console.log('Final generated markdown:', result)
    return result
  })

  // 生成器函数
  function generateHeaderMarkdown(block: ProfileBlock): string {
    const info = profileInfo.value
    let header = ''
      
    if (block.config.showAvatar && info.avatar) {
      header += `<div align="center">\n  <img src="${info.avatar}" alt="${info.name}" width="200" height="200" style="border-radius: 50%;" />\n</div>\n\n`
    }
    
    header += `# Hi 👋, I'm ${info.name || info.username || 'Developer'}\n`
    
    if (block.config.showTitle && info.title) {
      header += `## ${info.title}\n`
    }
    
    if (info.description) {
      header += `\n${info.description}\n`
    }
    
    const details = []
    if (block.config.showLocation && info.location) {
      details.push(`📍 ${info.location}`)
    }
    if (block.config.showWebsite && info.website) {
      details.push(`🌐 [${info.website}](${info.website})`)
    }
    if (info.email) {
      details.push(`📧 [${info.email}](mailto:${info.email})`)
    }
    
    if (details.length > 0) {
      header += `\n${details.join(' | ')}\n`
    }
    
      
    return header
  }

  function generateAboutMarkdown(block: ProfileBlock): string {
    return `## 👨‍💻 About Me\n\n${block.config.content || '这里写一些关于你的介绍...'}\n`
  }

  function generateStatsMarkdown(block: ProfileBlock): string {
    const username = profileInfo.value.username
    if (!username) return '<!-- 请设置GitHub用户名 -->'
    
    let stats = '## 📊 GitHub Stats\n\n'
    
    if (block.config.showOverview) {
      stats += `<div align="center">\n`
      stats += `  <img src="https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=${block.config.theme}&hide_border=true" alt="GitHub Stats" />\n`
      stats += `</div>\n\n`
    }
    
    if (block.config.showLanguages) {
      stats += `<div align="center">\n`
      stats += `  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=${block.config.theme}&hide_border=true" alt="Top Languages" />\n`
      stats += `</div>\n\n`
    }
    
    if (block.config.showStreak) {
      stats += `<div align="center">\n`
      stats += `  <img src="https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=${block.config.theme}&hide_border=true" alt="GitHub Streak" />\n`
      stats += `</div>\n`
    }
    
    return stats
  }

  function generateSkillsMarkdown(block: ProfileBlock): string {
    let skills = '## 🛠️ Skills & Tools\n\n'
    
    if (block.config.layout === 'badges') {
      const skillBadges = block.config.skills.map((skill: string) =>
        `![${skill}](https://img.shields.io/badge/-${skill}-05122A?style=flat&logo=${skill.toLowerCase().replace('.', '').replace(' ', '')})`
      ).join('\n')
      skills += skillBadges
    } else {
      skills += block.config.skills.map((skill: string) => `- ${skill}`).join('\n')
    }
    
    return skills + '\n'
  }

  function generateProjectsMarkdown(block: ProfileBlock): string {
    const title = languageStore.language === 'zh' ? '## 🚀 精选项目\n\n' : '## 🚀 Featured Projects\n\n'
    let projects = title
    
    if (block.config.projects.length === 0) {
      projects += languageStore.language === 'zh' ? '<!-- 添加你的项目 -->' : '<!-- Add your projects -->'
    } else {
      projects += block.config.projects.map((project: any) =>
        `### [${project.name}](${project.url})\n${project.description}\n`
      ).join('\n')
    }
    
    return projects + '\n'
  }

  function generateSocialMarkdown(block: ProfileBlock): string {
    const title = languageStore.language === 'zh' ? '## 🤝 社交媒体\n\n' : '## 🤝 Connect with me\n\n'
    let social = title
    const platforms = block.config.platforms
    
    const socialLinks = []
    
    // 中国社交媒体
    if (platforms.wechat) socialLinks.push(`📱 微信: ${platforms.wechat}`)
    if (platforms.weibo) socialLinks.push(`[🚀 微博](https://weibo.com/${platforms.weibo})`)
    if (platforms.bilibili) socialLinks.push(`[📺 B站](${platforms.bilibili})`)
    if (platforms.zhihu) socialLinks.push(`[🧠 知乎](${platforms.zhihu})`)
    if (platforms.juejin) socialLinks.push(`[💎 掘金](${platforms.juejin})`)
    
    // 国际社交媒体
    if (platforms.github) socialLinks.push(`[💻 GitHub](https://github.com/${platforms.github})`)
    if (platforms.twitter) socialLinks.push(`[🐦 Twitter](https://twitter.com/${platforms.twitter.replace('@', '')})`)
    if (platforms.linkedin) socialLinks.push(`[💼 LinkedIn](${platforms.linkedin})`)
    if (platforms.discord) socialLinks.push(`💬 Discord: ${platforms.discord}`)
    if (platforms.youtube) socialLinks.push(`[🎬 YouTube](${platforms.youtube})`)
    if (platforms.instagram) socialLinks.push(`[📸 Instagram](https://instagram.com/${platforms.instagram.replace('@', '')})`)
    
    if (socialLinks.length === 0) {
      social += languageStore.language === 'zh' ? '暂未添加社交媒体链接...' : 'No social media links added yet...'
    } else {
      social += '<div align="center">\n\n'
      social += socialLinks.join(' • ')
      social += '\n\n</div>'
    }
    
    return social + '\n'
  }

  function generateActivityMarkdown(block: ProfileBlock): string {
    const username = profileInfo.value.username
    if (!username) {
      return languageStore.language === 'zh' ? '<!-- 请设置GitHub用户名 -->\n' : '<!-- Please set GitHub username -->\n'
    }
    
    const title = languageStore.language === 'zh' ? '## 📈 最近活动\n\n' : '## 📈 Activity\n\n'
    let activity = title
    
    if (block.config.showContributions) {
      activity += `<div align="center">\n`
      const errorMsg = languageStore.language === 'zh' ? 'Activity graph failed to load' : 'Activity graph failed to load'
      activity += `  <img src="https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=github-compact&width=600&height=300" alt="Activity Graph" onerror="this.onerror=null; this.parentElement.innerHTML='<p>${errorMsg}</p>';" />\n`
      activity += `</div>\n\n`
    }
    
    return activity + '\n'
  }


  // 更新profile信息
  function updateProfileInfo(info: Partial<ProfileInfo>) {
    Object.assign(profileInfo.value, info)
  }

  // 切换块的启用状态
  function toggleBlock(blockId: string) {
    const block = availableBlocks.value.find(b => b.id === blockId)
    if (block) {
      block.enabled = !block.enabled
    }
  }

  // 更新块配置
  function updateBlockConfig(blockId: string, config: Record<string, any>) {
    const block = availableBlocks.value.find(b => b.id === blockId)
    if (block) {
      Object.assign(block.config, config)
    }
  }

  // 重新排序块
  function reorderBlocks(newOrder: string[]) {
    newOrder.forEach((blockId, index) => {
      const block = availableBlocks.value.find(b => b.id === blockId)
      if (block) {
        block.order = index + 1
      }
    })
  }

  // 导出markdown
  function exportMarkdown(): void {
    const element = document.createElement('a')
    const file = new Blob([generatedMarkdown.value], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = 'README.md'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return {
    profileInfo,
    availableBlocks,
    enabledBlocks,
    generatedMarkdown,
    updateProfileInfo,
    toggleBlock,
    updateBlockConfig,
    reorderBlocks,
    exportMarkdown
  }
})
