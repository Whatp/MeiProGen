<template>
  <div class="header-config">
    <h4>{{ t.title }}</h4>
    <div class="form-group">
      <label for="showAvatar">{{ t.showAvatar }}</label>
      <input type="checkbox" id="showAvatar" v-model="config.showAvatar" />
    </div>
    <div class="form-group">
      <label for="showTitle">{{ t.showTitle }}</label>
      <input type="checkbox" id="showTitle" v-model="config.showTitle" />
    </div>
    <div class="form-group">
      <label for="showLocation">{{ t.showLocation }}</label>
      <input type="checkbox" id="showLocation" v-model="config.showLocation" />
    </div>
    <div class="form-group">
      <label for="showWebsite">{{ t.showWebsite }}</label>
      <input type="checkbox" id="showWebsite" v-model="config.showWebsite" />
    </div>
    <div class="form-group">
      <label for="showTypingSvg">{{ t.showTypingSvg }}</label>
      <input type="checkbox" id="showTypingSvg" v-model="config.showTypingSvg" />
    </div>
    <div v-if="config.showTypingSvg" class="form-group typing-config">
      <label for="typingText">{{ t.typingText }}:</label>
      <textarea 
        id="typingText" 
        v-model="typingText" 
        @input="updateTypingTexts"
        :placeholder="t.typingPlaceholder"
        rows="4"
      ></textarea>
    </div>
    <div class="form-group">
      <label for="showVisitorBadge">{{ t.showVisitorBadge }}</label>
      <input type="checkbox" id="showVisitorBadge" v-model="config.showVisitorBadge" />
    </div>
    
    <!-- 社交媒体链接 -->
    <div class="form-group">
      <label for="showSocialLinks">{{ t.showSocialLinks }}</label>
      <input type="checkbox" id="showSocialLinks" v-model="config.showSocialLinks" />
    </div>
    
    <div v-if="config.showSocialLinks" class="social-links-config">
      <h5>{{ t.socialMediaNote }}</h5>
      <p>{{ t.socialMediaDescription }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useLanguageStore } from '../../stores/language'

// Props from the parent component
const props = defineProps({
  block: Object,
})

const config = props.block.config
const languageStore = useLanguageStore()
const { language } = storeToRefs(languageStore)

// 国际化文本
const t = computed(() => ({
  title: language.value === 'zh' ? 'Header 配置' : 'Header Configuration',
  showAvatar: language.value === 'zh' ? '显示头像' : 'Show Avatar',
  showTitle: language.value === 'zh' ? '显示称谓' : 'Show Title',
  showLocation: language.value === 'zh' ? '显示位置' : 'Show Location',
  showWebsite: language.value === 'zh' ? '显示网站' : 'Show Website',
  showTypingSvg: language.value === 'zh' ? '显示打字动画' : 'Show Typing Animation',
  typingText: language.value === 'zh' ? '打字动画文本' : 'Typing Animation Text',
  typingPlaceholder: language.value === 'zh' ? '每行一句话，如：\nFull Stack Developer\nLove Open Source\nCoding Enthusiast' : 'One line per phrase, like:\nFull Stack Developer\nLove Open Source\nCoding Enthusiast',
  showVisitorBadge: language.value === 'zh' ? '显示访客计数' : 'Show Visitor Badge',
  showSocialLinks: language.value === 'zh' ? '显示社交媒体链接' : 'Show Social Media Links',
  socialMediaNote: language.value === 'zh' ? '社交媒体配置' : 'Social Media Configuration',
  socialMediaDescription: language.value === 'zh' ? '请在“社交媒体”模块中配置您的社交媒体链接，配置后将显示在这里。' : 'Please configure your social media links in the "Social Media" block. Once configured, they will be displayed here.'
}))

// 初始化配置默认值
if (!config.showTypingSvg) config.showTypingSvg = false
if (!config.typingTexts) config.typingTexts = ['Full Stack Developer', 'Love Open Source', 'Coding Enthusiast']
if (!config.showVisitorBadge) config.showVisitorBadge = false
if (!config.showSocialLinks) config.showSocialLinks = false
if (!config.socialLinks) {
  config.socialLinks = {
    github: '',
    twitter: '',
    linkedin: '',
    email: '',
    weibo: '',
    zhihu: ''
  }
}

// 打字动画文本管理
const typingText = ref(config.typingTexts.join('\n'))

// 更新打字文本
function updateTypingTexts() {
  config.typingTexts = typingText.value
    .split('\n')
    .map(text => text.trim())
    .filter(text => text.length > 0)
}
</script>

<style scoped>
.form-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.5rem 0;
}

.typing-config {
  flex-direction: column;
  align-items: stretch;
}

.typing-config label {
  margin-bottom: 0.5rem;
}

label {
  color: var(--color-text);
}

input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: #4CAF50;
}

textarea {
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background-color: var(--color-background-mute);
  color: var(--color-text);
  resize: vertical;
  font-family: inherit;
}

textarea:focus {
  outline: none;
  border-color: #4CAF50;
}

/* Social links config */
.social-links-config {
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background-color: var(--color-background-mute);
}

.social-links-config h5 {
  margin: 0 0 1rem 0;
  color: #4CAF50;
  font-size: 0.9rem;
  font-weight: 600;
}

.social-links-config .form-group {
  flex-direction: column;
  align-items: flex-start;
  margin: 0.75rem 0;
}

.social-links-config .form-group label {
  margin-bottom: 0.5rem;
  font-weight: 500;
}

input[type="text"],
input[type="email"] {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background-color: var(--color-background-soft);
  color: var(--color-text);
  font-size: 0.9rem;
}

input[type="text"]:focus,
input[type="email"]:focus {
  outline: none;
  border-color: #4CAF50;
}
</style>

