<template>
  <div class="about-config">
    <h4>关于我 配置</h4>
    <div class="form-group">
      <label for="aboutContent">内容:</label>
      <textarea 
        id="aboutContent" 
        v-model="config.content" 
        placeholder="写一些关于你的介绍..."
        rows="4"
      ></textarea>
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
