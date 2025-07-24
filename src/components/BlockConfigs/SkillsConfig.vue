<template>
  <div class="skills-config">
    <h4>技能 & 工具 配置</h4>
    <div class="form-group">
      <label for="layout">布局:</label>
      <select id="layout" v-model="config.layout">
        <option value="badges">徽章</option>
        <option value="list">列表</option>
      </select>
    </div>
    <div class="form-group">
      <label for="skills">技能列表:</label>
      <textarea 
        id="skills" 
        v-model="skillsText" 
        @input="updateSkills"
        placeholder="每行一个技能，如：&#10;JavaScript&#10;Vue.js&#10;Node.js"
        rows="6"
      ></textarea>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  block: Object,
})

const config = props.block.config

// 将技能数组转换为文本
const skillsText = ref(config.skills.join('\n'))

// 更新技能数组
function updateSkills() {
  config.skills = skillsText.value
    .split('\n')
    .map(skill => skill.trim())
    .filter(skill => skill.length > 0)
}
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

select,
textarea {
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background-color: var(--color-background-mute);
  color: var(--color-text);
}

textarea {
  resize: vertical;
}

select:focus,
textarea:focus {
  outline: none;
  border-color: #4CAF50;
}
</style>
