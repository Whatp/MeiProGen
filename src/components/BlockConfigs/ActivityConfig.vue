<template>
  <div class="activity-config">
    <h4>{{ t.title }}</h4>
    <div class="form-group">
      <label for="showContributions">{{ t.showContributions }}</label>
      <input type="checkbox" id="showContributions" v-model="config.showContributions" />
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
  title: language.value === 'zh' ? '最近活动 配置' : 'Activity Configuration',
  showContributions: language.value === 'zh' ? '显示贡献图' : 'Show Contributions Graph',
}))
</script>

<style scoped>
.form-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.5rem 0;
}

label {
  color: var(--color-text);
}

input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: #4CAF50;
}
</style>
