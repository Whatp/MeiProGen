<template>
  <div class="blog-config">
    <h4>{{ t.title }}</h4>
    
    <!-- 博客RSS配置 -->
    <div class="section">
      <div class="form-group">
        <label for="showBlog">{{ t.enableBlog }}</label>
        <input type="checkbox" id="showBlog" v-model="config.showBlog" />
      </div>
      
      <div v-if="config.showBlog" class="blog-settings">
        <div class="form-group">
          <label for="blogRssUrl">{{ t.blogRssUrl }}:</label>
          <input 
            type="url" 
            id="blogRssUrl" 
            v-model="config.blogRssUrl" 
            :placeholder="t.blogRssPlaceholder" 
          />
        </div>
        
        <div class="form-group">
          <label for="blogPostCount">{{ t.postCount }}:</label>
          <select id="blogPostCount" v-model="config.blogPostCount">
            <option value="3">{{ t.posts3 }}</option>
            <option value="5">{{ t.posts5 }}</option>
            <option value="10">{{ t.posts10 }}</option>
          </select>
        </div>
        
        <!-- GitHub Actions配置说明 -->
        <div class="github-actions-warning">
          <h5>{{ t.warningTitle }}</h5>
          <p>{{ t.warningText }}</p>
          
          <div class="setup-steps">
            <h6>{{ t.setupSteps }}:</h6>
            <ol>
              <li v-html="t.step1"></li>
              <li>{{ t.step2 }}</li>
            </ol>
            
            <div class="code-block">
              <pre><code>name: Latest blog post workflow
on:
  schedule: # Run workflow automatically
    - cron: '0 * * * *' # Runs every hour
  workflow_dispatch: # Run workflow manually (without waiting for the cron to be called)

jobs:
  update-readme-with-blog:
    name: Update this repo's README with latest blog posts
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Pull in blog posts
        uses: gautamkrishnar/blog-post-workflow@v1
        with:
          comment_tag_name: "BLOG-POST-LIST"
          feed_list: "{{ config.blogRssUrl || 'https://your-blog.com/rss.xml' }}"
          max_post_count: {{ config.blogPostCount || 5 }}
          template: "- [$title]($url) - $date"</code></pre>
            </div>
            
            <div class="tips">
              <h6>{{ t.tipsTitle }}:</h6>
              <ul>
                <li>{{ t.tip1 }}</li>
                <li>{{ t.tip2 }}</li>
                <li>{{ t.tip3 }}</li>
                <li>{{ t.tip4 }}</li>
                <li>{{ t.tip5 }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useLanguageStore } from '../../stores/language'
import type { ProfileBlock } from '../../stores/profile'

const props = defineProps<{
  block: ProfileBlock
}>()

const config = props.block.config
const languageStore = useLanguageStore()
const { language } = storeToRefs(languageStore)

// 国际化文本
const t = computed(() => ({
  title: language.value === 'zh' ? '📝 个人博客 配置' : '📝 Personal Blog Configuration',
  enableBlog: language.value === 'zh' ? '启用博客文章显示' : 'Enable Blog Posts Display',
  blogRssUrl: language.value === 'zh' ? '博客 RSS 链接' : 'Blog RSS URL',
  blogRssPlaceholder: language.value === 'zh' ? 'https://your-blog.com/rss.xml' : 'https://your-blog.com/rss.xml',
  postCount: language.value === 'zh' ? '显示文章数量' : 'Number of Posts to Show',
  posts3: language.value === 'zh' ? '3篇' : '3 posts',
  posts5: language.value === 'zh' ? '5篇' : '5 posts',
  posts10: language.value === 'zh' ? '10篇' : '10 posts',
  warningTitle: language.value === 'zh' ? '⚠️ 重要配置说明' : '⚠️ Important Configuration Instructions',
  warningText: language.value === 'zh' ? '要让博客文章自动更新，你需要在GitHub仓库中设置GitHub Actions工作流:' : 'To automatically update blog posts, you need to set up GitHub Actions workflow in your GitHub repository:',
  setupSteps: language.value === 'zh' ? '设置步骤' : 'Setup Steps',
  step1: language.value === 'zh' ? '在你的GitHub仓库根目录创建 <code>.github/workflows/blog-post-workflow.yml</code>' : 'Create <code>.github/workflows/blog-post-workflow.yml</code> in your GitHub repository root directory',
  step2: language.value === 'zh' ? '复制以下配置到该文件中:' : 'Copy the following configuration to that file:',
  tipsTitle: language.value === 'zh' ? '💡 使用提示' : '💡 Usage Tips',
  tip1: language.value === 'zh' ? '将上述文件提交到你的GitHub仓库' : 'Commit the above file to your GitHub repository',
  tip2: language.value === 'zh' ? 'GitHub Actions会每小时自动运行一次' : 'GitHub Actions will run automatically every hour',
  tip3: language.value === 'zh' ? '你也可以在Actions页面手动触发运行' : 'You can also manually trigger the workflow from the Actions page',
  tip4: language.value === 'zh' ? '确保RSS链接有效且可访问' : 'Ensure the RSS link is valid and accessible',
  tip5: language.value === 'zh' ? '首次运行可能需要几分钟才能看到效果' : 'First run might take a few minutes to see the effect'
}))

// 初始化配置
if (!config.showBlog) config.showBlog = false
if (!config.blogRssUrl) config.blogRssUrl = ''
if (!config.blogPostCount) config.blogPostCount = '5'
</script>

<style scoped>
.blog-config {
  padding: 1rem;
}

.section {
  margin-bottom: 1.5rem;
}

.form-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.75rem 0;
}

.blog-settings {
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background-color: var(--color-background-mute);
}

.blog-settings .form-group {
  flex-direction: column;
  align-items: flex-start;
  margin: 1rem 0;
}

.blog-settings .form-group label {
  margin-bottom: 0.5rem;
  font-weight: 500;
}

label {
  color: var(--color-text);
  font-size: 0.9rem;
}

input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: #4CAF50;
}

input[type="url"] {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background-color: var(--color-background-soft);
  color: var(--color-text);
  font-size: 0.9rem;
}

select {
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background-color: var(--color-background-soft);
  color: var(--color-text);
  font-size: 0.9rem;
  width: 120px;
}

input[type="url"]:focus,
select:focus {
  outline: none;
  border-color: #4CAF50;
}

/* GitHub Actions配置说明样式 */
.github-actions-warning {
  margin-top: 1.5rem;
  padding: 1.5rem;
  border: 2px solid #ff9800;
  border-radius: 8px;
  background-color: rgba(255, 152, 0, 0.1);
}

.github-actions-warning h5 {
  margin: 0 0 1rem 0;
  color: #ff9800;
  font-size: 1rem;
  font-weight: 600;
}

.github-actions-warning p {
  margin: 0 0 1rem 0;
  color: var(--color-text);
  font-size: 0.9rem;
  line-height: 1.5;
}

.setup-steps h6 {
  margin: 1rem 0 0.5rem 0;
  color: #4CAF50;
  font-size: 0.9rem;
  font-weight: 600;
}

.setup-steps ol {
  margin: 0.5rem 0 1rem 1.5rem;
  color: var(--color-text);
  font-size: 0.9rem;
  line-height: 1.6;
}

.setup-steps li {
  margin: 0.5rem 0;
}

.code-block {
  margin: 1rem 0;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid var(--color-border);
}

.code-block pre {
  margin: 0;
  padding: 1rem;
  background-color: #2d3748;
  color: #e2e8f0;
  font-family: 'Courier New', Monaco, monospace;
  font-size: 0.8rem;
  line-height: 1.4;
  overflow-x: auto;
  white-space: pre-wrap;
}

.code-block code {
  font-family: inherit;
}

code {
  background-color: var(--color-background-mute);
  color: #e53e3e;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: 'Courier New', Monaco, monospace;
  font-size: 0.85em;
}

.tips {
  margin-top: 1rem;
}

.tips ul {
  margin: 0.5rem 0 0 1.5rem;
  color: var(--color-text);
  font-size: 0.9rem;
  line-height: 1.6;
}

.tips li {
  margin: 0.3rem 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .form-group {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  input[type="url"],
  select {
    width: 100%;
  }
  
  .code-block pre {
    font-size: 0.75rem;
    padding: 0.75rem;
  }
}
</style>
