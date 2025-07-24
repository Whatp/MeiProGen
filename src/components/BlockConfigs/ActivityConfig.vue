<template>
  <div class="activity-config">
    <h4>最近活动 配置</h4>
    <div class="form-group">
      <label for="showContributions">显示贡献图</label>
      <input type="checkbox" id="showContributions" v-model="config.showContributions" />
    </div>
    <div class="form-group">
      <label for="showRecentRepos">显示最近仓库</label>
      <input type="checkbox" id="showRecentRepos" v-model="config.showRecentRepos" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  block: Object,
})

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
</style>
