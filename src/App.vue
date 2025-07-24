<script setup lang="ts">
import Header from './components/Header.vue'
import BlockSelection from './components/BlockSelection.vue'
import PreviewPanel from './components/PreviewPanel.vue'
</script>

<template>
  <div id="app-container">
    <Header />
    <main class="main-content">
      <div class="content-area">
        <section class="selection-area">
          <BlockSelection />
        </section>
        <section class="preview-area">
          <PreviewPanel />
        </section>
      </div>
    </main>
  </div>
</template>

<style>
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  width: 100%;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
}

#app {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

/* 根容器样式 */
#app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: var(--color-background);
  color: var(--color-text);
  overflow: hidden;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* 主内容区域 */
.main-content {
  flex: 1;
  display: flex;
  padding: 1rem;
  overflow: hidden;
  min-height: 0;
  width: 100%;
}

/* 内容区容器 - 水平布局 */
.content-area {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  min-height: 0;
  flex: 1;
}

/* Selection 和 Preview 区域的样式 */
.selection-area,
.preview-area {
  flex: 1;
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1.5rem;
  overflow-y: auto;
  height: 100%;
  min-width: 0; /* 防止flex子项溢出 */
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.selection-area {
  margin-right: 8px; /* 增加右边距防止遮挡 */
}

/* 用于演示滚动的占位符 */
.placeholder-content {
  height: 50px;
  background-color: var(--color-background-mute);
  border-radius: 4px;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .main-content {
    padding: 0.75rem;
  }
  
  .selection-area,
  .preview-area {
    padding: 1rem;
  }
}

@media (max-width: 1024px) {
  /* 在较小的屏幕上，将面板垂直堆叠 */
  .content-area {
    flex-direction: column;
  }
  
  .selection-area,
  .preview-area {
    flex: none;
    height: auto;
    min-height: 40vh;
  }
}

@media (max-width: 768px) {
  .main-content {
    padding: 0.5rem;
  }
  
  .content-area {
    gap: 0.75rem;
  }
  
  .selection-area,
  .preview-area {
    padding: 1rem;
    min-height: 45vh; /* 增加高度以便手机上更好地显示 */
  }
  
  .selection-area {
    margin-right: 0; /* 移除右边距 */
  }
}

@media (max-width: 480px) {
  .main-content {
    padding: 0.25rem;
  }
  
  .content-area {
    gap: 0.5rem;
  }
  
  .selection-area,
  .preview-area {
    padding: 0.75rem;
    min-height: 40vh; /* 调整高度使内容更容易阅读 */
    border-radius: 6px;
    font-size: 0.9rem; /* 调整字体大小以适应小屏幕 */
  }
}

/* 专门为小屏幕手机优化 */
@media (max-width: 360px) {
  .main-content {
    padding: 0.125rem;
  }
  
  .content-area {
    gap: 0.375rem;
  }
  
  .selection-area,
  .preview-area {
    padding: 0.5rem;
    min-height: 35vh;
    border-radius: 4px;
    font-size: 0.85rem;
  }
}

/* 确保滚动条在不同主题下的表现 */
.selection-area::-webkit-scrollbar,
.preview-area::-webkit-scrollbar {
  width: 8px;
}

.selection-area::-webkit-scrollbar-track,
.preview-area::-webkit-scrollbar-track {
  background: var(--color-background-mute);
  border-radius: 4px;
}

.selection-area::-webkit-scrollbar-thumb,
.preview-area::-webkit-scrollbar-thumb {
  background: var(--color-border-hover);
  border-radius: 4px;
}

.selection-area::-webkit-scrollbar-thumb:hover,
.preview-area::-webkit-scrollbar-thumb:hover {
  background: var(--color-text);
}
</style>
