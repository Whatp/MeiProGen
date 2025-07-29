<template>
  <div class="social-config">
    <h4>🤝 {{ t.title }}</h4>

    <div class="platform-section">
      <h5>📱 {{ t.chineseSocial }}</h5>
      <div class="form-group">
        <label for="wechat">{{ t.wechat }}:</label>
        <input
          type="text"
          id="wechat"
          v-model="config.platforms.wechat"
          :placeholder="t.wechatPlaceholder"
          @input="updateConfig"
        />
      </div>
      <div class="form-group">
        <label for="weibo">{{ t.weibo }}:</label>
        <input
          type="text"
          id="weibo"
          v-model="config.platforms.weibo"
          :placeholder="t.weiboPlaceholder"
          @input="updateConfig"
        />
      </div>
      <div class="form-group">
        <label for="bilibili">{{ t.bilibili }}:</label>
        <input
          type="text"
          id="bilibili"
          v-model="config.platforms.bilibili"
          :placeholder="t.bilibiliPlaceholder"
          @input="updateConfig"
        />
      </div>
      <div class="form-group">
        <label for="zhihu">{{ t.zhihu }}:</label>
        <input
          type="text"
          id="zhihu"
          v-model="config.platforms.zhihu"
          :placeholder="t.zhihuPlaceholder"
          @input="updateConfig"
        />
      </div>
      <div class="form-group">
        <label for="juejin">{{ t.juejin }}:</label>
        <input
          type="text"
          id="juejin"
          v-model="config.platforms.juejin"
          :placeholder="t.juejinPlaceholder"
          @input="updateConfig"
        />
      </div>
    </div>

    <div class="platform-section">
      <h5>🌍 {{ t.internationalSocial }}</h5>
      <div class="form-group">
        <label for="twitter">{{ t.twitter }}:</label>
        <input
          type="text"
          id="twitter"
          v-model="config.platforms.twitter"
          :placeholder="t.twitterPlaceholder"
          @input="updateConfig"
        />
      </div>
      <div class="form-group">
        <label for="linkedin">{{ t.linkedin }}:</label>
        <input
          type="url"
          id="linkedin"
          v-model="config.platforms.linkedin"
          :placeholder="t.linkedinPlaceholder"
          @input="updateConfig"
        />
      </div>
      <div class="form-group">
        <label for="github">{{ t.github }}:</label>
        <input
          type="text"
          id="github"
          v-model="config.platforms.github"
          :placeholder="t.githubPlaceholder"
          @input="updateConfig"
        />
      </div>
      <div class="form-group">
        <label for="discord">{{ t.discord }}:</label>
        <input
          type="text"
          id="discord"
          v-model="config.platforms.discord"
          :placeholder="t.discordPlaceholder"
          @input="updateConfig"
        />
      </div>
      <div class="form-group">
        <label for="youtube">{{ t.youtube }}:</label>
        <input
          type="url"
          id="youtube"
          v-model="config.platforms.youtube"
          :placeholder="t.youtubePlaceholder"
          @input="updateConfig"
        />
      </div>
      <div class="form-group">
        <label for="instagram">{{ t.instagram }}:</label>
        <input
          type="text"
          id="instagram"
          v-model="config.platforms.instagram"
          :placeholder="t.instagramPlaceholder"
          @input="updateConfig"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProfileBlock } from '../../stores/profile'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useLanguageStore } from '../../stores/language'

const props = defineProps<{
  block: ProfileBlock
}>()

const emit = defineEmits<{
  update: [blockId: string, config: Record<string, any>]
}>()

const config = props.block.config

// 语言状态
const languageStore = useLanguageStore()
const { language } = storeToRefs(languageStore)

// 国际化文本
const t = computed(() => ({
  title: language.value === 'zh' ? '社交媒体配置' : 'Social Media Configuration',
  chineseSocial: language.value === 'zh' ? '中国社交媒体' : 'Chinese Social Media',
  internationalSocial: language.value === 'zh' ? '国际社交媒体' : 'International Social Media',
  wechat: language.value === 'zh' ? '微信号' : 'WeChat',
  weibo: language.value === 'zh' ? '微博' : 'Weibo',
  bilibili: language.value === 'zh' ? 'B站' : 'Bilibili',
  zhihu: language.value === 'zh' ? '知乎' : 'Zhihu',
  juejin: language.value === 'zh' ? '掘金' : 'Juejin',
  twitter: language.value === 'zh' ? 'Twitter' : 'Twitter',
  linkedin: language.value === 'zh' ? 'LinkedIn' : 'LinkedIn',
  github: language.value === 'zh' ? 'GitHub' : 'GitHub',
  discord: language.value === 'zh' ? 'Discord' : 'Discord',
  youtube: language.value === 'zh' ? 'YouTube' : 'YouTube',
  instagram: language.value === 'zh' ? 'Instagram' : 'Instagram',
  wechatPlaceholder: language.value === 'zh' ? 'your-wechat-id' : 'your-wechat-id',
  weiboPlaceholder: language.value === 'zh' ? '@your-weibo-name' : '@your-weibo-name',
  bilibiliPlaceholder:
    language.value === 'zh'
      ? 'https://space.bilibili.com/your-uid'
      : 'https://space.bilibili.com/your-uid',
  zhihuPlaceholder:
    language.value === 'zh'
      ? 'https://www.zhihu.com/people/your-id'
      : 'https://www.zhihu.com/people/your-id',
  juejinPlaceholder:
    language.value === 'zh' ? 'https://juejin.cn/user/your-id' : 'https://juejin.cn/user/your-id',
  twitterPlaceholder: language.value === 'zh' ? '@username' : '@username',
  linkedinPlaceholder:
    language.value === 'zh'
      ? 'https://linkedin.com/in/yourprofile'
      : 'https://linkedin.com/in/yourprofile',
  githubPlaceholder: language.value === 'zh' ? 'your-username' : 'your-username',
  discordPlaceholder: language.value === 'zh' ? 'username#1234' : 'username#1234',
  youtubePlaceholder:
    language.value === 'zh'
      ? 'https://youtube.com/c/yourchannel'
      : 'https://youtube.com/c/yourchannel',
  instagramPlaceholder: language.value === 'zh' ? '@your-username' : '@your-username',
}))

// 确保所有平台都有默认值
if (!config.platforms.wechat) config.platforms.wechat = ''
if (!config.platforms.weibo) config.platforms.weibo = ''
if (!config.platforms.bilibili) config.platforms.bilibili = ''
if (!config.platforms.zhihu) config.platforms.zhihu = ''
if (!config.platforms.juejin) config.platforms.juejin = ''
if (!config.platforms.github) config.platforms.github = ''
if (!config.platforms.instagram) config.platforms.instagram = ''

// 更新配置时通知父组件
function updateConfig() {
  emit('update', props.block.id, config)
}
</script>

<style scoped>
.social-config h4 {
  margin: 0 0 1rem 0;
  color: var(--color-text);
  font-size: 1.1rem;
}

.platform-section {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: var(--color-background);
  border-radius: 6px;
  border: 1px solid var(--color-border);
}

.platform-section h5 {
  margin: 0 0 1rem 0;
  color: var(--color-text);
  font-size: 1rem;
  font-weight: 500;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--color-border);
}

.form-group {
  display: flex;
  flex-direction: column;
  margin: 0.75rem 0;
}

label {
  color: var(--color-text);
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
  font-weight: 500;
}

input {
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background-color: var(--color-background-mute);
  color: var(--color-text);
  font-size: 0.9rem;
  transition: border-color 0.2s ease;
}

input:focus {
  outline: none;
  border-color: #4caf50;
}

input::placeholder {
  color: #888;
}
</style>
