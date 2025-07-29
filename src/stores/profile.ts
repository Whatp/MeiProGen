import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { useLanguageStore } from './language'

// 定义支持的块类型
export interface ProfileBlock {
  id: string
  type: 'header' | 'stats' | 'skills' | 'projects' | 'social' | 'about' | 'activity' | 'blog'
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

  // 基础的profile块数据（不包含国际化标题）
  const baseBlocks = ref<Omit<ProfileBlock, 'title'>[]>([
    {
      id: 'header',
      type: 'header',
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
      enabled: true,
      config: {
        content: '这里写一些关于你的介绍...'
      },
      order: 2
    },
    {
      id: 'stats',
      type: 'stats',
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
      order: 2
    },
    {
      id: 'blog',
      type: 'blog',
      enabled: false,
      config: {
        showBlog: false,
        blogRssUrl: '',
        blogPostCount: '5'
      },
      order: 6
    },
    {
      id: 'activity',
      type: 'activity',
      enabled: false,
      config: {
        showContributions: true
      },
      order: 7
    },
  ])

  // 块标题国际化映射
  const blockTitles = computed(() => ({
    header: languageStore.language === 'zh' ? '个人信息头部' : 'Header',
    about: languageStore.language === 'zh' ? '关于我' : 'About Me',
    stats: languageStore.language === 'zh' ? 'GitHub统计' : 'GitHub Stats',
    skills: languageStore.language === 'zh' ? '技能 & 工具' : 'Skills & Tools',
    projects: languageStore.language === 'zh' ? '精选项目' : 'Featured Projects',
    social: languageStore.language === 'zh' ? '社交媒体' : 'Social Media',
    blog: languageStore.language === 'zh' ? '个人博客' : 'Personal Blog',
    activity: languageStore.language === 'zh' ? '最近活动' : 'Recent Activity',
  }))

  // 计算带有国际化标题的可用块
  const availableBlocks = computed(() => 
    baseBlocks.value.map(block => ({
      ...block,
      title: blockTitles.value[block.type as keyof typeof blockTitles.value]
    }))
  )

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
        case 'blog':
          blockMarkdown = generateBlogMarkdown(block)
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
    
    // 添加 Typing SVG
    if (block.config.showTypingSvg && block.config.typingTexts && block.config.typingTexts.length > 0) {
      const typingLines = block.config.typingTexts.join(';')
      const typingSvgUrl = `https://readme-typing-svg.demolab.com/?lines=${encodeURIComponent(typingLines)}&font=Fira%20Code&center=true&width=500&height=50&duration=4000&pause=500`
      header += `\n<div align="center">\n  <img src="${typingSvgUrl}" alt="Typing SVG" />\n</div>\n\n`
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
    
// 添加社交媒体链接（使用 social block 的配置）
// 添加社交媒体链接（使用 social block 的配置）
if (block.config.showVisitorBadge && info.username) {
  header += `\n<div align="center">\n  <img src="https://komarev.com/ghpvc/?username=${info.username}&left_color=green&right_color=red" alt="Visitor Badge" />\n</div>\n\n`;
}
    
    // 添加社交媒体链接（使用 social block 的配置）
    const socialBlock = baseBlocks.value.find(b => b.id === 'social')
    if (block.config.showSocialLinks && socialBlock && socialBlock.config.platforms) {
      const socialLinks = []
      const platforms = socialBlock.config.platforms
      
      // 中国社交媒体 - 使用真实图标，显示图标 + 站点名称
      if (platforms.wechat) socialLinks.push(`<img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/wechat.svg" alt="wechat" height="30" width="30" /> 微信: ${platforms.wechat}`)
      if (platforms.weibo) socialLinks.push(`<a href="https://weibo.com/${platforms.weibo}" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/weibo.svg" alt="weibo" height="30" width="30" /> 微博</a>`)
      if (platforms.bilibili) socialLinks.push(`<a href="${platforms.bilibili}" target="blank"><img align="center" src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/bilibili.svg" alt="bilibili" height="30" width="30" fill="#00A1D6" /> B站</a>`)
      if (platforms.zhihu) socialLinks.push(`<a href="${platforms.zhihu}" target="blank"><img align="center" src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/zhihu.svg" alt="zhihu" height="30" width="30" fill="#0084FF" /> 知乎</a>`)
      if (platforms.juejin) socialLinks.push(`<a href="${platforms.juejin}" target="blank"><img align="center" src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/juejin.svg" alt="juejin" height="30" width="30" fill="#007FFF" /> 掘金</a>`)
      
      // 国际社交媒体 - 使用真实图标，显示图标 + 站点名称
      if (platforms.github) socialLinks.push(`<a href="https://github.com/${platforms.github}" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/github.svg" alt="github" height="30" width="30" /> GitHub</a>`)
      if (platforms.twitter) socialLinks.push(`<a href="https://twitter.com/${platforms.twitter.replace('@', '')}" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/twitter.svg" alt="twitter" height="30" width="30" /> Twitter</a>`)
      if (platforms.linkedin) socialLinks.push(`<a href="${platforms.linkedin}" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="linkedin" height="30" width="30" /> LinkedIn</a>`)
      if (platforms.discord) socialLinks.push(`<img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/discord.svg" alt="discord" height="30" width="30" /> Discord`)
      if (platforms.youtube) socialLinks.push(`<a href="${platforms.youtube}" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/youtube.svg" alt="youtube" height="30" width="30" /> YouTube</a>`)
      if (platforms.instagram) socialLinks.push(`<a href="https://instagram.com/${platforms.instagram.replace('@', '')}" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/instagram.svg" alt="instagram" height="30" width="30" /> Instagram</a>`)
      
      if (socialLinks.length > 0) {
        header += `### 🔗 Connect with me\n\n`
        header += `<div align="center">\n\n`
        header += socialLinks.join(' • ')
        header += `\n\n</div>\n`
      }
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
      stats += `</div>\n\n`
    }
    
    // 第三方平台统计
    const thirdPartyStats = []
    
    if (block.config.showLeetcode && block.config.leetcodeUsername) {
      let leetcodeUrl = `https://leetcard.jacoblin.cool/${block.config.leetcodeUsername}`
      if (block.config.leetcodeSite) {
        leetcodeUrl += `?site=${block.config.leetcodeSite}`
      }
      if (block.config.leetcodeTheme) {
        leetcodeUrl += `&theme=${block.config.leetcodeTheme}`
      }
      if (block.config.leetcodeExt) {
        leetcodeUrl += `&ext=${block.config.leetcodeExt}`
      }
      thirdPartyStats.push(`  <img src="${leetcodeUrl}" alt="LeetCode Stats" />`)
    }
    
    if (block.config.showZhihu && block.config.zhihuUsername) {
      thirdPartyStats.push(`  <img src="https://stats.justsong.cn/api/zhihu?username=${block.config.zhihuUsername}" alt="知乎 Stats" />`)
    }
    
    if (block.config.showBilibili && block.config.bilibiliUid) {
      thirdPartyStats.push(`  <img src="https://stats.justsong.cn/api/bilibili/?id=${block.config.bilibiliUid}" alt="B站 Stats" />`)
    }
    
    if (block.config.showCsdn && block.config.csdnId) {
      thirdPartyStats.push(`  <img src="https://stats.justsong.cn/api/csdn?id=${block.config.csdnId}" alt="CSDN Stats" />`)
    }
    
    if (block.config.showNowcoder && block.config.nowcoderId) {
      thirdPartyStats.push(`  <img src="https://stats.justsong.cn/api/nowcoder?id=${block.config.nowcoderId}" alt="牛客 Stats" />`)
    }
    
    if (thirdPartyStats.length > 0) {
      stats += `### 🌐 第三方平台统计\n\n<div align="center">\n`
      stats += thirdPartyStats.join('\n') + '\n'
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
    } else if (block.config.layout === 'icons') {
      // Use icons from devicons for skills
      skills += '<div align="center">\n'
      const skillIcons = block.config.skills.map((skill: string) => {
        const iconName = skill.toLowerCase().replace(/[^a-z0-9]/g, '')
        return `  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconName}/${iconName}-original.svg" alt="${skill}" width="40" height="40"/>`
      }).join('\n')
      skills += skillIcons + '\n</div>'
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
      projects += block.config.projects.map((project: any) => {
        let projectMarkdown = `### [${project.name}](${project.url})\n`
        
        if (block.config.showDescription && project.description) {
          projectMarkdown += `${project.description}\n`
        }
        
        if (block.config.showLanguage && project.tech) {
          projectMarkdown += `**技术栈:** ${project.tech}\n`
        }
        
        if (block.config.showStats && project.url && project.url.includes('github.com')) {
          const repoPath = project.url.replace('https://github.com/', '')
          projectMarkdown += `\n![Stars](https://img.shields.io/github/stars/${repoPath}?style=social) `
          projectMarkdown += `![Forks](https://img.shields.io/github/forks/${repoPath}?style=social)\n`
        }
        
        return projectMarkdown
      }).join('\n')
    }
    
    return projects + '\n'
  }

  function generateSocialMarkdown(block: ProfileBlock): string {
    const title = languageStore.language === 'zh' ? '## 🤝 社交媒体\n\n' : '## 🤝 Connect with me\n\n'
    let social = title
    const platforms = block.config.platforms
    
    const socialLinks = []
    
    // 中国社交媒体 - 使用可用的图标
    if (platforms.wechat) socialLinks.push(`<img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/wechat.svg" alt="wechat" height="30" width="30" /> 微信: ${platforms.wechat}`)
    if (platforms.weibo) socialLinks.push(`<a href="https://weibo.com/${platforms.weibo}" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/weibo.svg" alt="weibo" height="30" width="30" /></a>`)
    if (platforms.bilibili) socialLinks.push(`<a href="${platforms.bilibili}" target="blank"><img align="center" src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/bilibili.svg" alt="bilibili" height="30" width="30" fill="#00A1D6" /></a>`)
    if (platforms.zhihu) socialLinks.push(`<a href="${platforms.zhihu}" target="blank"><img align="center" src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/zhihu.svg" alt="zhihu" height="30" width="30" fill="#0084FF" /></a>`)
    if (platforms.juejin) socialLinks.push(`<a href="${platforms.juejin}" target="blank"><img align="center" src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/jianshu.svg" alt="juejin" height="30" width="30" fill="#007FFF" /></a>`)
    
    // 国际社交媒体 - 使用真实图标
    if (platforms.github) socialLinks.push(`<a href="https://github.com/${platforms.github}" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/github.svg" alt="github" height="30" width="30" /></a>`)
    if (platforms.twitter) socialLinks.push(`<a href="https://twitter.com/${platforms.twitter.replace('@', '')}" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/twitter.svg" alt="twitter" height="30" width="30" /></a>`)
    if (platforms.linkedin) socialLinks.push(`<a href="${platforms.linkedin}" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="linkedin" height="30" width="30" /></a>`)
    if (platforms.discord) socialLinks.push(`<img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/discord.svg" alt="discord" height="30" width="30" /> ${platforms.discord}`)
    if (platforms.youtube) socialLinks.push(`<a href="${platforms.youtube}" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/youtube.svg" alt="youtube" height="30" width="30" /></a>`)
    if (platforms.instagram) socialLinks.push(`<a href="https://instagram.com/${platforms.instagram.replace('@', '')}" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/instagram.svg" alt="instagram" height="30" width="30" /></a>`)
    
    if (socialLinks.length === 0) {
      social += languageStore.language === 'zh' ? '暂未添加社交媒体链接...' : 'No social media links added yet...'
    } else {
      social += '<div align="center">\n\n'
      social += socialLinks.join(' • ')
      social += '\n\n</div>'
    }
    
    return social + '\n'
  }

  function generateBlogMarkdown(block: ProfileBlock): string {
    const blogTitle = languageStore.language === 'zh' ? '## 📝 最新博客文章\n\n' : '## 📝 Latest Blog Posts\n\n'
    let blogSection = blogTitle
    
    blogSection += `<!-- BLOG-POST-LIST:START -->\n`
    blogSection += `<!-- 这里会通过GitHub Actions自动更新最新的博客文章 -->\n`
    blogSection += `<!-- BLOG-POST-LIST:END -->\n\n`

    // 加入使用说明注释
    blogSection += `<!-- 
    若要启用博客文章自动更新，请：
    1. 在 .github/workflows/ 中创建 blog-post-workflow.yml
    2. 配置 RSS URL: ${block.config.blogRssUrl}
    3. 使用 gautamkrishnar/blog-post-workflow action
    -->\n`

    return blogSection + '\n'
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
    const block = baseBlocks.value.find(b => b.id === blockId)
    if (block) {
      block.enabled = !block.enabled
    }
  }

  // 更新块配置
  function updateBlockConfig(blockId: string, config: Record<string, any>) {
    const block = baseBlocks.value.find(b => b.id === blockId)
    if (block) {
      Object.assign(block.config, config)
    }
  }

  // 重新排序块
  function reorderBlocks(newOrder: string[]) {
    newOrder.forEach((blockId, index) => {
      const block = baseBlocks.value.find(b => b.id === blockId)
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
