<template>
  <div class="projects-config">
    <h4>{{ t.title }}</h4>
    
    <!-- 项目显示选项 -->
    <div class="section">
      <h5>{{ t.displayOptions }}</h5>
      <div class="form-group">
        <label for="showStats">{{ t.showStats }}</label>
        <input type="checkbox" id="showStats" v-model="config.showStats" />
      </div>
      <div class="form-group">
        <label for="showDescription">{{ t.showDescription }}</label>
        <input type="checkbox" id="showDescription" v-model="config.showDescription" />
      </div>
      <div class="form-group">
        <label for="showLanguage">{{ t.showLanguage }}</label>
        <input type="checkbox" id="showLanguage" v-model="config.showLanguage" />
      </div>
    </div>

    <!-- 项目列表 -->
    <div class="section">
      <div class="section-header">
        <h5>{{ t.projectList }} ({{ config.projects.length }})</h5>
        <button @click="addProject" class="add-btn">{{ t.addProject }}</button>
      </div>
      
      <div v-if="config.projects.length === 0" class="empty-state">
        <p>{{ t.noProjects }}</p>
        <p>{{ t.addProjectHint }}</p>
      </div>
      
      <div v-else class="projects-list">
        <div 
          v-for="(project, index) in config.projects" 
          :key="index" 
          class="project-item"
        >
          <div class="project-header">
            <span class="project-number">{{ index + 1 }}</span>
            <button @click="removeProject(index)" class="remove-btn">×</button>
          </div>
          
          <div class="project-fields">
            <div class="form-group">
              <label>{{ t.projectName }}:</label>
              <input 
                v-model="project.name" 
                type="text" 
                :placeholder="t.projectNamePlaceholder" 
                @input="updateProjects"
              />
            </div>
            
            <div class="form-group">
              <label>{{ t.projectUrl }}:</label>
              <input 
                v-model="project.url" 
                type="url" 
                :placeholder="t.projectUrlPlaceholder" 
                @input="updateProjects"
              />
            </div>
            
            <div class="form-group">
              <label>{{ t.projectDescription }}:</label>
              <textarea 
                v-model="project.description" 
                :placeholder="t.projectDescriptionPlaceholder" 
                rows="2"
                @input="updateProjects"
              ></textarea>
            </div>
            
            <div class="form-group">
              <label>{{ t.projectTech }}:</label>
              <input 
                v-model="project.tech" 
                type="text" 
                :placeholder="t.projectTechPlaceholder" 
                @input="updateProjects"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div class="bulk-actions">
        <button @click="clearAllProjects" class="clear-btn" :disabled="config.projects.length === 0">
          {{ t.clearAll }}
        </button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useLanguageStore } from '../../stores/language'
import type { ProfileBlock } from '../../stores/profile'

interface Project {
  name: string
  url: string
  description: string
  tech: string
}

const props = defineProps<{
  block: ProfileBlock
}>()

const config = props.block.config
const languageStore = useLanguageStore()
const { language } = storeToRefs(languageStore)

// 国际化文本
const t = computed(() => ({
  title: language.value === 'zh' ? '精选项目 配置' : 'Featured Projects Configuration',
  displayOptions: language.value === 'zh' ? '显示选项' : 'Display Options',
  showStats: language.value === 'zh' ? '显示项目统计' : 'Show Project Stats',
  showDescription: language.value === 'zh' ? '显示项目描述' : 'Show Project Description',
  showLanguage: language.value === 'zh' ? '显示主要语言' : 'Show Main Language',
  projectList: language.value === 'zh' ? '项目列表' : 'Project List',
  addProject: language.value === 'zh' ? '+ 添加项目' : '+ Add Project',
  noProjects: language.value === 'zh' ? '还没有添加任何项目' : 'No projects added yet',
  addProjectHint: language.value === 'zh' ? '点击上方"添加项目"按钮开始添加你的精选项目' : 'Click the "Add Project" button above to start adding your featured projects',
  projectName: language.value === 'zh' ? '项目名称' : 'Project Name',
  projectNamePlaceholder: language.value === 'zh' ? '项目名称' : 'Project Name',
  projectUrl: language.value === 'zh' ? '项目链接' : 'Project URL',
  projectUrlPlaceholder: language.value === 'zh' ? 'https://github.com/username/project' : 'https://github.com/username/project',
  projectDescription: language.value === 'zh' ? '项目描述' : 'Project Description',
  projectDescriptionPlaceholder: language.value === 'zh' ? '项目的简短描述...' : 'Short description of the project...',
  projectTech: language.value === 'zh' ? '主要技术' : 'Main Technologies',
  projectTechPlaceholder: language.value === 'zh' ? 'Vue.js, TypeScript, Node.js' : 'Vue.js, TypeScript, Node.js',
  clearAll: language.value === 'zh' ? '🗑️ 清空所有项目' : '🗑️ Clear All Projects'
}))

// 初始化配置
if (!config.projects) config.projects = []
if (!config.showStats) config.showStats = true
if (!config.showDescription) config.showDescription = true
if (!config.showLanguage) config.showLanguage = true

function addProject() {
  const newProject: Project = {
    name: '',
    url: '',
    description: '',
    tech: ''
  }
  config.projects.push(newProject)
}

function removeProject(index: number) {
  config.projects.splice(index, 1)
}

function clearAllProjects() {
  if (confirm('确定要清空所有项目吗？此操作不可撤销。')) {
    config.projects = []
  }
}

function updateProjects() {
  // 触发响应式更新
  // Vue 3 的响应式系统会自动处理数组和对象的变化
}
</script>

<style scoped>
.projects-config {
  padding: 1rem;
}

.section {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
}

.section:last-child {
  border-bottom: none;
}

.section h5 {
  color: #4CAF50;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 600;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.section-header h5 {
  margin-bottom: 0;
}

.form-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.5rem 0;
}

.form-group.indent {
  margin-left: 1.5rem;
  padding-left: 1rem;
  border-left: 2px solid var(--color-border);
}

.form-group label {
  color: var(--color-text);
  font-size: 0.9rem;
  flex: 1;
}

input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: #4CAF50;
}

input[type="text"],
input[type="url"],
textarea,
select {
  padding: 0.4rem 0.6rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background-color: var(--color-background-mute);
  color: var(--color-text);
  font-size: 0.9rem;
  width: 200px;
}

input[type="text"]:focus,
input[type="url"]:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: #4CAF50;
}

textarea {
  resize: vertical;
  min-height: 60px;
  width: 250px;
}

select {
  width: 120px;
}

/* Buttons */
.add-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.add-btn:hover {
  background-color: #45a049;
}

.remove-btn {
  background-color: #ff4444;
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.remove-btn:hover {
  background-color: #cc0000;
}

.clear-btn {
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 1rem;
}

.clear-btn:hover:not(:disabled) {
  background-color: #ff5252;
}

.clear-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Empty state */
.empty-state {
  text-align: center;
  padding: 2rem;
  color: #888;
  background-color: var(--color-background-mute);
  border-radius: 8px;
  margin: 1rem 0;
}

.empty-state p {
  margin: 0.5rem 0;
}

/* Projects list */
.projects-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.project-item {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1rem;
  background-color: var(--color-background-mute);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.project-number {
  background-color: #4CAF50;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
}

.project-fields {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.project-fields .form-group {
  flex-direction: column;
  align-items: flex-start;
}

.project-fields .form-group label {
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.project-fields input,
.project-fields textarea {
  width: 100%;
  max-width: none;
}

.bulk-actions {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

/* Responsive design */
@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .form-group {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  input[type="text"],
  input[type="url"],
  textarea,
  select {
    width: 100%;
    max-width: none;
  }
}
</style>
