<template>
  <div class="skills-config">
    <h4>{{ t.title }}</h4>
    <div class="form-group">
      <label for="layout">{{ t.layout }}:</label>
      <select id="layout" v-model="config.layout">
        <option value="badges">{{ t.badges }}</option>
        <option value="list">{{ t.list }}</option>
        <option value="icons">{{ t.icons }}</option>
      </select>
    </div>
    <div class="form-group">
      <label>{{ t.skillSelection }}:</label>
      <div class="skill-selection">
        <div class="skill-categories">
          <div v-for="category in skillCategories" :key="category.name" class="skill-category">
            <h5>{{ category.name }}</h5>
            <div class="skill-checkboxes">
              <label v-for="skill in category.skills" :key="skill.name" class="skill-checkbox">
                <input
                  type="checkbox"
                  :value="skill"
                  v-model="selectedSkills"
                  @change="updateSkills"
                />
                <span class="skill-name">{{ skill.name }}</span>
              </label>
            </div>
          </div>
        </div>
        <div class="selected-skills">
          <div class="selected-skills-header">
            <h5>{{ t.selectedSkills }} ({{ selectedSkills.length }})</h5>
            <button
              v-if="selectedSkills.length > 0"
              @click="clearAllSkills"
              class="clear-all-btn"
              :title="t.clearAllTitle"
            >
              {{ t.clearAll }}
            </button>
          </div>
          <div
            class="selected-skill-list"
            :class="{ 'horizontal-layout': config.layout === 'badges' }"
          >
            <div v-for="skill in selectedSkills" :key="skill.name" class="selected-skill">
              <img v-if="skill.icon" :src="skill.icon" :alt="skill.name" class="skill-icon" />
              <span>{{ skill.name }}</span>
              <button @click="removeSkill(skill)" class="remove-btn">×</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
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
  title: language.value === 'zh' ? '技能 & 工具 配置' : 'Skills & Tools Configuration',
  layout: language.value === 'zh' ? '布局' : 'Layout',
  skillSelection: language.value === 'zh' ? '技能选择' : 'Skill Selection',
  selectedSkills: language.value === 'zh' ? '已选技能' : 'Selected Skills',
  clearAll: language.value === 'zh' ? '🗑️ 一键清除' : '🗑️ Clear All',
  clearAllTitle: language.value === 'zh' ? '清空所有技能' : 'Clear all skills',
  badges: language.value === 'zh' ? '徽章' : 'Badges',
  list: language.value === 'zh' ? '列表' : 'List',
  icons: language.value === 'zh' ? '图标' : 'Icons',
}))

// 技能分类数据
const skillCategories = [
  {
    name: 'Frontend',
    skills: [
      {
        name: 'HTML5',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
      },
      {
        name: 'CSS3',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
      },
      {
        name: 'JavaScript',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      },
      {
        name: 'TypeScript',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      },
      {
        name: 'React',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      },
      {
        name: 'Vue.js',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
      },
      {
        name: 'Angular',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
      },
      {
        name: 'Bootstrap',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
      },
      {
        name: 'Sass',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg',
      },
    ],
  },
  {
    name: 'Backend',
    skills: [
      {
        name: 'Node.js',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      },
      {
        name: 'Python',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      },
      {
        name: 'Java',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
      },
      {
        name: 'C#',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
      },
      {
        name: 'C++',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
      },
      {
        name: 'PHP',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
      },
      { name: 'Go', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg' },
      {
        name: 'Rust',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg',
      },
      {
        name: 'Ruby',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg',
      },
    ],
  },
  {
    name: 'Database',
    skills: [
      {
        name: 'MySQL',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
      },
      {
        name: 'PostgreSQL',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      },
      {
        name: 'MongoDB',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      },
      {
        name: 'Redis',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
      },
      {
        name: 'SQLite',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg',
      },
    ],
  },
  {
    name: 'DevOps',
    skills: [
      {
        name: 'Docker',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      },
      {
        name: 'Kubernetes',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
      },
      {
        name: 'AWS',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg',
      },
      {
        name: 'Google Cloud',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',
      },
      {
        name: 'Linux',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
      },
      {
        name: 'Git',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      },
      {
        name: 'Jenkins',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg',
      },
      {
        name: 'Nginx',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg',
      },
    ],
  },
  {
    name: 'Tools',
    skills: [
      {
        name: 'VS Code',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
      },
      {
        name: 'IntelliJ IDEA',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg',
      },
      {
        name: 'Figma',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
      },
      {
        name: 'Adobe Photoshop',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg',
      },
      {
        name: 'Webpack',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg',
      },
      { name: 'Vite', icon: 'https://vitejs.dev/logo.svg' },
    ],
  },
]

// 初始化选中的技能
const selectedSkills = ref([])

// 从配置初始化已选技能
if (config.skills && Array.isArray(config.skills)) {
  selectedSkills.value = config.skills.map((skillName) => {
    // 从所有分类中查找匹配的技能
    for (const category of skillCategories) {
      const found = category.skills.find((skill) => skill.name === skillName)
      if (found) return found
    }
    // 如果没找到，创建一个基本的技能对象
    return { name: skillName, icon: null }
  })
}

// 更新技能配置
function updateSkills() {
  config.skills = selectedSkills.value.map((skill) => skill.name)
}

// 清空所有技能
function clearAllSkills() {
  selectedSkills.value = []
  updateSkills()
}

// 移除技能
function removeSkill(skillToRemove) {
  const index = selectedSkills.value.findIndex((skill) => skill.name === skillToRemove.name)
  if (index > -1) {
    selectedSkills.value.splice(index, 1)
    updateSkills()
  }
}

// 监听选中技能变化
watch(selectedSkills, updateSkills, { deep: true })
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
  border-color: #4caf50;
}

/* Skill selection styles */
.skill-selection {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.skill-categories {
  flex: 2;
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: 1rem;
  background-color: var(--color-background-mute);
}

.skill-category {
  margin-bottom: 1rem;
}

.skill-category h5 {
  margin: 0 0 0.5rem 0;
  color: #4caf50;
  font-size: 0.9rem;
  font-weight: 600;
}

.skill-checkboxes {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 0.25rem;
}

.skill-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem;
  cursor: pointer;
  border-radius: 3px;
  transition: background-color 0.2s;
}

.skill-checkbox:hover {
  background-color: var(--color-background-soft);
}

.skill-checkbox input[type='checkbox'] {
  margin: 0;
  width: 14px;
  height: 14px;
  accent-color: #4caf50;
}

.skill-name {
  font-size: 0.8rem;
  color: var(--color-text);
}

.selected-skills {
  flex: 1;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: 1rem;
  background-color: var(--color-background-mute);
}

.selected-skills h5 {
  margin: 0 0 0.5rem 0;
  color: var(--color-text);
  font-size: 0.9rem;
  font-weight: 600;
}

.selected-skill-list {
  max-height: 350px;
  overflow-y: auto;
}

.selected-skill {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  margin-bottom: 0.25rem;
  background-color: var(--color-background-soft);
  border-radius: 4px;
  border: 1px solid var(--color-border);
}

.skill-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.selected-skill span {
  flex: 1;
  font-size: 0.8rem;
  color: var(--color-text);
}

.remove-btn {
  background: #ff4444;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.remove-btn:hover {
  background: #cc0000;
}

/* Selected skills header */
.selected-skills-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.clear-all-btn {
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.clear-all-btn:hover {
  background-color: #ff5252;
}

/* Horizontal layout for badges */
.selected-skill-list.horizontal-layout {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.5rem;
}

.horizontal-layout .selected-skill {
  margin-bottom: 0;
  display: inline-flex;
  white-space: nowrap;
  padding: 0.25rem 0.5rem;
  border-radius: 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  font-size: 0.75rem;
}

.horizontal-layout .selected-skill span {
  color: white;
}

.horizontal-layout .remove-btn {
  background: rgba(255, 255, 255, 0.3);
  width: 16px;
  height: 16px;
  font-size: 10px;
  margin-left: 0.25rem;
}

.horizontal-layout .remove-btn:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* Responsive design */
@media (max-width: 768px) {
  .skill-selection {
    flex-direction: column;
  }

  .skill-categories,
  .selected-skills {
    max-height: 200px;
  }

  .skill-checkboxes {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
}
</style>
