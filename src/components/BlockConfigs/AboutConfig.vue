<template>
  <div class="about-config">
    <h4>{{ t.title }}</h4>
    <div class="form-group">
      <label for="aboutContent">{{ t.content }}:</label>
      <textarea 
        id="aboutContent" 
        v-model="config.content" 
        :placeholder="t.placeholder"
        rows="4"
      ></textarea>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useLanguageStore } from '../../stores/language'

const props = defineProps({
  block: Object,
})

const config = props.block.config
const languageStore = useLanguageStore()
const { language } = storeToRefs(languageStore)

// 国际化文本
const t = computed(() => ({
  title: language.value === 'zh' ? '关于我 配置' : 'About Me Configuration',
  content: language.value === 'zh' ? '内容' : 'Content',
  placeholder: language.value === 'zh' ? '写一些关于你的介绍...' : 'Write something about yourself...'
}))
</script>

<style scoped>
.form-group {
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0;
}

label {
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

textarea {
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background-color: var(--color-background-mute);
  color: var(--color-text);
  resize: vertical;
}

textarea:focus {
  outline: none;
  border-color: #4CAF50;
}
</style>
