<template>
  <div class="social-config">
    <h4>🤝 社交媒体配置</h4>
    
    <div class="platform-section">
      <h5>📱 中国社交媒体</h5>
      <div class="form-group">
        <label for="wechat">微信号:</label>
        <input 
          type="text" 
          id="wechat" 
          v-model="config.platforms.wechat" 
          placeholder="your-wechat-id"
          @input="updateConfig"
        />
      </div>
      <div class="form-group">
        <label for="weibo">微博:</label>
        <input 
          type="text" 
          id="weibo" 
          v-model="config.platforms.weibo" 
          placeholder="@your-weibo-name"
          @input="updateConfig"
        />
      </div>
      <div class="form-group">
        <label for="bilibili">B站:</label>
        <input 
          type="text" 
          id="bilibili" 
          v-model="config.platforms.bilibili" 
          placeholder="https://space.bilibili.com/your-uid"
          @input="updateConfig"
        />
      </div>
      <div class="form-group">
        <label for="zhihu">知乎:</label>
        <input 
          type="text" 
          id="zhihu" 
          v-model="config.platforms.zhihu" 
          placeholder="https://www.zhihu.com/people/your-id"
          @input="updateConfig"
        />
      </div>
      <div class="form-group">
        <label for="juejin">掘金:</label>
        <input 
          type="text" 
          id="juejin" 
          v-model="config.platforms.juejin" 
          placeholder="https://juejin.cn/user/your-id"
          @input="updateConfig"
        />
      </div>
    </div>
    
    <div class="platform-section">
      <h5>🌍 国际社交媒体</h5>
      <div class="form-group">
        <label for="twitter">Twitter:</label>
        <input 
          type="text" 
          id="twitter" 
          v-model="config.platforms.twitter" 
          placeholder="@username"
          @input="updateConfig"
        />
      </div>
      <div class="form-group">
        <label for="linkedin">LinkedIn:</label>
        <input 
          type="url" 
          id="linkedin" 
          v-model="config.platforms.linkedin" 
          placeholder="https://linkedin.com/in/yourprofile"
          @input="updateConfig"
        />
      </div>
      <div class="form-group">
        <label for="github">GitHub:</label>
        <input 
          type="text" 
          id="github" 
          v-model="config.platforms.github" 
          placeholder="your-username"
          @input="updateConfig"
        />
      </div>
      <div class="form-group">
        <label for="discord">Discord:</label>
        <input 
          type="text" 
          id="discord" 
          v-model="config.platforms.discord" 
          placeholder="username#1234"
          @input="updateConfig"
        />
      </div>
      <div class="form-group">
        <label for="youtube">YouTube:</label>
        <input 
          type="url" 
          id="youtube" 
          v-model="config.platforms.youtube" 
          placeholder="https://youtube.com/c/yourchannel"
          @input="updateConfig"
        />
      </div>
      <div class="form-group">
        <label for="instagram">Instagram:</label>
        <input 
          type="text" 
          id="instagram" 
          v-model="config.platforms.instagram" 
          placeholder="@your-username"
          @input="updateConfig"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProfileBlock } from '../../stores/profile'

const props = defineProps<{
  block: ProfileBlock
}>()

const emit = defineEmits<{
  update: [blockId: string, config: Record<string, any>]
}>()

const config = props.block.config

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
  border-color: #4CAF50;
}

input::placeholder {
  color: #888;
}
</style>
