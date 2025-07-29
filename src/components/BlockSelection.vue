<template>
  <div class="block-selection">
    <div class="profile-info-section">
      <h3>{{ t.basicInfo }}</h3>
      <form class="profile-form" @submit.prevent>
        <div class="form-group">
          <label for="name">{{ t.name }}</label>
          <input
            id="name"
            v-model="profileInfo.name"
            type="text"
            :placeholder="t.namePlaceholder"
          />
        </div>
        <div class="form-group">
          <label for="username">{{ t.githubUsername }}</label>
          <input
            id="username"
            v-model="profileInfo.username"
            type="text"
            :placeholder="t.githubUsernamePlaceholder"
          />
        </div>
        <div class="form-group">
          <label for="title">{{ t.title }}</label>
          <input
            id="title"
            v-model="profileInfo.title"
            type="text"
            :placeholder="t.titlePlaceholder"
          />
        </div>
        <div class="form-group">
          <label for="description">{{ t.description }}</label>
          <textarea
            id="description"
            v-model="profileInfo.description"
            :placeholder="t.descriptionPlaceholder"
            rows="3"
          ></textarea>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="location">{{ t.location }}</label>
            <input
              id="location"
              v-model="profileInfo.location"
              type="text"
              :placeholder="t.locationPlaceholder"
            />
          </div>
          <div class="form-group">
            <label for="website">{{ t.website }}</label>
            <input
              id="website"
              v-model="profileInfo.website"
              type="url"
              :placeholder="t.websitePlaceholder"
            />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="email">{{ t.email }}</label>
            <input
              id="email"
              v-model="profileInfo.email"
              type="email"
              :placeholder="t.emailPlaceholder"
            />
          </div>
          <div class="form-group">
            <label for="avatar">{{ t.avatarUrl }}</label>
            <input
              id="avatar"
              v-model="profileInfo.avatar"
              type="url"
              :placeholder="t.avatarUrlPlaceholder"
            />
          </div>
        </div>
      </form>
    </div>

    <div class="blocks-section">
      <h3>{{ t.blockSettings }}</h3>
      <p class="section-description">{{ t.blockSettingsDescription }}</p>
      
      <div class="blocks-list" ref="blocksListRef">
        <div
          v-for="block in availableBlocks"
          :key="block.id"
          :data-id="block.id"
          class="block-item"
          :class="{ active: block.enabled }"
        >
          <div class="block-header">
            <div class="drag-handle" title="拖拽排序">⋮⋮</div>
            <div class="block-info">
              <input
                :id="`block-${block.id}`"
                type="checkbox"
                :checked="block.enabled"
                @change="toggleBlock(block.id)"
              />
              <label :for="`block-${block.id}`" class="block-title">
                {{ block.title }}
              </label>
            </div>
            <button
              v-if="block.enabled"
              @click="toggleConfig(block.id)"
              class="config-btn"
              :class="{ active: openConfigs.includes(block.id) }"
            >
              ⚙️
            </button>
          </div>
          
          <div v-if="block.enabled && openConfigs.includes(block.id)" class="block-config">
            <component
              :is="getConfigComponent(block.type)"
              :block="block"
              @update="updateBlockConfig"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="export-section">
      <button @click="exportMarkdown" class="export-btn">
        {{ t.exportButton }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import Sortable from 'sortablejs'
import { useProfileStore, type ProfileBlock } from '../stores/profile'
import { useLanguageStore } from '../stores/language'
import HeaderConfig from './BlockConfigs/HeaderConfig.vue'
import AboutConfig from './BlockConfigs/AboutConfig.vue'
import StatsConfig from './BlockConfigs/StatsConfig.vue'
import SkillsConfig from './BlockConfigs/SkillsConfig.vue'
import ProjectsConfig from './BlockConfigs/ProjectsConfig.vue'
import SocialConfig from './BlockConfigs/SocialConfig.vue'
import ActivityConfig from './BlockConfigs/ActivityConfig.vue'
import BlogConfig from './BlockConfigs/BlogConfig.vue'

const profileStore = useProfileStore()
const { exportMarkdown: storeExportMarkdown } = profileStore
const { availableBlocks } = storeToRefs(profileStore)
const { profileInfo } = storeToRefs(profileStore)

const languageStore = useLanguageStore()
const { language } = storeToRefs(languageStore)

const openConfigs = ref<string[]>([])
const blocksListRef = ref<HTMLElement>()

// Initialize sortable drag and drop
onMounted(() => {
  nextTick(() => {
    if (blocksListRef.value) {
      Sortable.create(blocksListRef.value, {
        handle: '.drag-handle',
        animation: 150,
        ghostClass: 'sortable-ghost',
        chosenClass: 'sortable-chosen',
        dragClass: 'sortable-drag',
        onEnd: (evt) => {
          if (evt.oldIndex !== undefined && evt.newIndex !== undefined) {
            const newOrder = [...availableBlocks.value]
            const [movedItem] = newOrder.splice(evt.oldIndex, 1)
            newOrder.splice(evt.newIndex, 0, movedItem)
            
            // Update order numbers
            const blockIds = newOrder.map(block => block.id)
            profileStore.reorderBlocks(blockIds)
          }
        }
      })
    }
  })
})

const toggleBlock = (blockId: string) => {
  profileStore.toggleBlock(blockId)
}

const toggleConfig = (blockId: string) => {
  const index = openConfigs.value.indexOf(blockId)
  if (index > -1) {
    // 如果已经打开，就关闭它
    openConfigs.value.splice(index, 1)
  } else {
    // 关闭所有其他配置，只打开当前点击的
    openConfigs.value = [blockId]
  }
}

const updateBlockConfig = (blockId: string, config: Record<string, any>) => {
  profileStore.updateBlockConfig(blockId, config)
}

const exportMarkdown = () => {
  storeExportMarkdown()
}

const getConfigComponent = (blockType: string) => {
  const components: Record<string, any> = {
    header: HeaderConfig,
    about: AboutConfig,
    stats: StatsConfig,
    skills: SkillsConfig,
    projects: ProjectsConfig,
    social: SocialConfig,
    activity: ActivityConfig,
    blog: BlogConfig,
  }
  return components[blockType] || 'div'
}

const t = computed(() => {
  return {
    basicInfo: language.value === 'zh' ? '基础信息' : 'Basic Information',
    name: language.value === 'zh' ? '姓名:' : 'Name:',
    namePlaceholder: language.value === 'zh' ? '你的姓名' : 'Your Name',
    githubUsername: language.value === 'zh' ? 'GitHub用户名:' : 'GitHub Username:',
    githubUsernamePlaceholder: language.value === 'zh' ? 'GitHub用户名（用于统计）' : 'GitHub Username (for stats)',
    title: language.value === 'zh' ? '职位/标题:' : 'Title/Position:',
    titlePlaceholder: language.value === 'zh' ? '如: 前端开发工程师' : 'e.g., Frontend Developer',
    description: language.value === 'zh' ? '个人描述:' : 'Description:',
    descriptionPlaceholder: language.value === 'zh' ? '简短的个人介绍' : 'A short bio',
    location: language.value === 'zh' ? '位置:' : 'Location:',
    locationPlaceholder: language.value === 'zh' ? '如: 北京, 中国' : 'e.g., Beijing, China',
    website: language.value === 'zh' ? '网站:' : 'Website:',
    websitePlaceholder: language.value === 'zh' ? 'https://your-website.com' : 'https://your-website.com',
    email: language.value === 'zh' ? '邮箱:' : 'Email:',
    emailPlaceholder: language.value === 'zh' ? 'your@email.com' : 'your@email.com',
    avatarUrl: language.value === 'zh' ? '头像URL:' : 'Avatar URL:',
    avatarUrlPlaceholder: language.value === 'zh' ? '头像图片链接' : 'Link to your avatar image',
    blockSettings: language.value === 'zh' ? 'Profile块设置' : 'Profile Block Settings',
    blockSettingsDescription: language.value === 'zh' ? '选择和配置你想要在GitHub Profile中显示的内容块' : 'Select and configure the blocks you want to display on your GitHub Profile',
    exportButton: language.value === 'zh' ? '📥 导出 README.md' : '📥 Export README.md',
  }
})

</script>

<style scoped>
.block-selection {
  height: 100%;
  overflow-y: auto;
}

.profile-info-section,
.blocks-section,
.export-section {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.export-section {
  border-bottom: none;
}

h3 {
  margin: 0 0 1rem 0;
  color: var(--color-text);
  font-size: 1.2rem;
}

.section-description {
  margin: 0 0 1rem 0;
  color: #888;
  font-size: 0.9rem;
}

/* 表单样式 */
.profile-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-row {
  display: flex;
  gap: 1rem;
}

.form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--color-text);
}

.form-group input,
.form-group textarea {
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background-color: var(--color-background-mute);
  color: var(--color-text);
  font-size: 0.9rem;
  transition: border-color 0.2s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #4CAF50;
}

.form-group textarea {
  resize: vertical;
  min-height: 60px;
}

/* 块列表样式 */
.blocks-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.block-item {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background-color: var(--color-background-mute);
  transition: all 0.2s ease;
}

.block-item.active {
  border-color: #4CAF50;
  background-color: rgba(76, 175, 80, 0.1);
}

.block-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
}

/* 拖拽手柄样式 */
.drag-handle {
  cursor: grab;
  color: #666;
  font-size: 1.2rem;
  padding: 0.25rem;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  user-select: none;
  margin-right: 0.5rem;
}

.drag-handle:hover {
  background-color: var(--color-background-soft);
  color: var(--color-text);
}

.drag-handle:active {
  cursor: grabbing;
}

.block-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
}

.block-info input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: #4CAF50;
}

.block-title {
  font-weight: 500;
  cursor: pointer;
  user-select: none;
}

.config-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.config-btn:hover {
  background-color: var(--color-background-soft);
}

.config-btn.active {
  background-color: #4CAF50;
}

.block-config {
  padding: 0 1rem 1rem 1rem;
  border-top: 1px solid var(--color-border);
  background-color: var(--color-background-soft);
}

/* Sortable 拖拽状态样式 */
.sortable-ghost {
  opacity: 0.4;
  background-color: var(--color-background-soft);
}

.sortable-chosen {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.sortable-drag {
  transform: rotate(5deg);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

/* 导出按钮样式 */
.export-btn {
  width: 100%;
  padding: 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.export-btn:hover {
  background-color: #45a049;
}

.export-btn:active {
  transform: translateY(1px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
  }
  
  .block-header {
    padding: 0.75rem;
  }
}
</style>
