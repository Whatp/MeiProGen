<template>
  <div class="projects-config">
    <h4>精选项目 配置</h4>
    <p class="note">这是一个基础版本，你可以在这里添加项目配置界面。</p>
    <div class="form-group">
      <label>项目列表将在未来版本中提供更多配置选项</label>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  block: Object,
})
</script>

<style scoped>
.note {
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 1rem;
}

.form-group label {
  color: var(--color-text);
  font-size: 0.9rem;
}
</style>
