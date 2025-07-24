<template>
  <div class="header-config">
    <h4>Header 配置</h4>
    <div class="form-group">
      <label for="showAvatar">显示头像</label>
      <input type="checkbox" id="showAvatar" v-model="config.showAvatar" />
    </div>
    <div class="form-group">
      <label for="showTitle">显示称谓</label>
      <input type="checkbox" id="showTitle" v-model="config.showTitle" />
    </div>
    <div class="form-group">
      <label for="showLocation">显示位置</label>
      <input type="checkbox" id="showLocation" v-model="config.showLocation" />
    </div>
    <div class="form-group">
      <label for="showWebsite">显示网站</label>
      <input type="checkbox" id="showWebsite" v-model="config.showWebsite" />
    </div>
  </div>
</template>

<script setup>
// Props from the parent component
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

