<template>
  <div class="stats-config">
    <h4>GitHub统计 配置</h4>
    <div class="form-group">
      <label for="showOverview">显示概览统计</label>
      <input type="checkbox" id="showOverview" v-model="config.showOverview" />
    </div>
    <div class="form-group">
      <label for="showLanguages">显示语言统计</label>
      <input type="checkbox" id="showLanguages" v-model="config.showLanguages" />
    </div>
    <div class="form-group">
      <label for="showStreak">显示连击统计</label>
      <input type="checkbox" id="showStreak" v-model="config.showStreak" />
    </div>
    <div class="form-group">
      <label for="theme">主题:</label>
      <select id="theme" v-model="config.theme">
        <option value="dark">深色</option>
        <option value="light">浅色</option>
        <option value="radical">Radical</option>
        <option value="merko">Merko</option>
        <option value="gruvbox">Gruvbox</option>
        <option value="tokyonight">Tokyo Night</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProfileBlock } from '../../stores/profile'

const props = defineProps<{
  block: ProfileBlock
}>()

const config = props.block.config
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

select {
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background-color: var(--color-background-mute);
  color: var(--color-text);
}

select:focus {
  outline: none;
  border-color: #4CAF50;
}
</style>
