<template>
  <div class="stats-config">
    <h4>{{ t.title }}</h4>
    
    <!-- GitHub 统计 -->
    <div class="section">
      <h5>{{ t.githubStats }}</h5>
      <div class="form-group">
        <label for="showOverview">{{ t.showOverview }}</label>
        <input type="checkbox" id="showOverview" v-model="config.showOverview" />
      </div>
      <div class="form-group">
        <label for="showLanguages">{{ t.showLanguages }}</label>
        <input type="checkbox" id="showLanguages" v-model="config.showLanguages" />
      </div>
      <div class="form-group">
        <label for="showStreak">{{ t.showStreak }}</label>
        <input type="checkbox" id="showStreak" v-model="config.showStreak" />
      </div>
      <div class="form-group">
        <label for="theme">{{ t.theme }}:</label>
        <select id="theme" v-model="config.theme">
          <option value="dark">{{ t.dark }}</option>
          <option value="light">{{ t.light }}</option>
          <option value="radical">Radical</option>
          <option value="merko">Merko</option>
          <option value="gruvbox">Gruvbox</option>
          <option value="tokyonight">Tokyo Night</option>
        </select>
      </div>
    </div>

    <!-- 第三方平台统计 -->
    <div class="section">
      <h5>{{ t.thirdPartyStats }}</h5>
      
      <!-- LeetCode -->
      <div class="form-group">
        <label for="showLeetcode">{{ t.showLeetcode }}</label>
        <input type="checkbox" id="showLeetcode" v-model="config.showLeetcode" />
      </div>
      <div v-if="config.showLeetcode" class="form-group indent">
        <label for="leetcodeUsername">{{ t.leetcodeUsername }}:</label>
        <input type="text" id="leetcodeUsername" v-model="config.leetcodeUsername" :placeholder="t.leetcodeUsernamePlaceholder" />
      </div>
      <div v-if="config.showLeetcode" class="form-group indent">
        <label for="leetcodeSite">{{ t.leetcodeSite }}:</label>
        <select id="leetcodeSite" v-model="config.leetcodeSite">
          <option value="us">{{ t.leetcodeSiteUs }}</option>
          <option value="cn">{{ t.leetcodeSiteCn }}</option>
        </select>
      </div>
      <div v-if="config.showLeetcode" class="form-group indent">
        <label for="leetcodeTheme">{{ t.leetcodeTheme }}:</label>
        <select id="leetcodeTheme" v-model="config.leetcodeTheme">
          <option value="light">{{ t.light }}</option>
          <option value="dark">{{ t.dark }}</option>
          <option value="nord">Nord</option>
          <option value="forest">Forest</option>
          <option value="wtf">WTF</option>
          <option value="unicorn">Unicorn</option>
          <option value="transparent">Transparent</option>
        </select>
      </div>
      <div v-if="config.showLeetcode" class="form-group indent">
        <label for="leetcodeExt">{{ t.leetcodeExt }}:</label>
        <select id="leetcodeExt" v-model="config.leetcodeExt">
          <option value="">{{ t.leetcodeExtNone }}</option>
          <option value="activity">{{ t.leetcodeExtActivity }}</option>
          <option value="contest">{{ t.leetcodeExtContest }}</option>
          <option value="heatmap">{{ t.leetcodeExtHeatmap }}</option>
        </select>
      </div>
      
      <!-- 知乎 -->
      <div class="form-group">
        <label for="showZhihu">显示知乎</label>
        <input type="checkbox" id="showZhihu" v-model="config.showZhihu" />
      </div>
      <div v-if="config.showZhihu" class="form-group indent">
        <label for="zhihuUsername">知乎用户名:</label>
        <input type="text" id="zhihuUsername" v-model="config.zhihuUsername" placeholder="知乎用户名" />
      </div>
      
      <!-- B站 -->
      <div class="form-group">
        <label for="showBilibili">显示 B站</label>
        <input type="checkbox" id="showBilibili" v-model="config.showBilibili" />
      </div>
      <div v-if="config.showBilibili" class="form-group indent">
        <label for="bilibiliUid">B站 UID:</label>
        <input type="text" id="bilibiliUid" v-model="config.bilibiliUid" placeholder="B站数字UID (如: 123456789)" />
      </div>
      
      <!-- CSDN -->
      <div class="form-group">
        <label for="showCsdn">显示 CSDN</label>
        <input type="checkbox" id="showCsdn" v-model="config.showCsdn" />
      </div>
      <div v-if="config.showCsdn" class="form-group indent">
        <label for="csdnId">CSDN 用户ID:</label>
        <input type="text" id="csdnId" v-model="config.csdnId" placeholder="CSDN用户ID" />
      </div>
      
      <!-- 牛客 -->
      <div class="form-group">
        <label for="showNowcoder">显示牛客</label>
        <input type="checkbox" id="showNowcoder" v-model="config.showNowcoder" />
      </div>
      <div v-if="config.showNowcoder" class="form-group indent">
        <label for="nowcoderId">牛客用户ID:</label>
        <input type="text" id="nowcoderId" v-model="config.nowcoderId" placeholder="牛客用户ID" />
      </div>
      
      <!-- 掘金 -->
      <div class="form-group">
        <label for="showJuejin">显示掘金</label>
        <input type="checkbox" id="showJuejin" v-model="config.showJuejin" />
      </div>
      <div v-if="config.showJuejin" class="form-group indent">
        <label for="juejinUserId">掘金用户ID:</label>
        <input type="text" id="juejinUserId" v-model="config.juejinUserId" placeholder="掘金用户ID" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import type { ProfileBlock } from '../../stores/profile'
import { useLanguageStore } from '../../stores/language'

const props = defineProps<{
  block: ProfileBlock
}>()

const config = props.block.config
const languageStore = useLanguageStore()
const { language } = storeToRefs(languageStore)

// 国际化文本
const t = computed(() => ({
  title: language.value === 'zh' ? '统计数据 配置' : 'Statistics Configuration',
  githubStats: language.value === 'zh' ? 'GitHub 统计' : 'GitHub Statistics',
  showOverview: language.value === 'zh' ? '显示概览统计' : 'Show Overview Stats',
  showLanguages: language.value === 'zh' ? '显示语言统计' : 'Show Languages Stats',
  showStreak: language.value === 'zh' ? '显示连击统计' : 'Show Streak Stats',
  theme: language.value === 'zh' ? '主题' : 'Theme',
  dark: language.value === 'zh' ? '深色' : 'Dark',
  light: language.value === 'zh' ? '浅色' : 'Light',
  thirdPartyStats: language.value === 'zh' ? '第三方平台统计' : 'Third-party Platform Stats',
  showLeetcode: language.value === 'zh' ? '显示 LeetCode' : 'Show LeetCode',
  leetcodeUsername: language.value === 'zh' ? 'LeetCode 用户名' : 'LeetCode Username',
  leetcodeUsernamePlaceholder: language.value === 'zh' ? '输入用户名' : 'Enter username',
  leetcodeSite: language.value === 'zh' ? '站点选择' : 'Site Selection',
  leetcodeSiteUs: language.value === 'zh' ? '英文站 (us)' : 'US Site (us)',
  leetcodeSiteCn: language.value === 'zh' ? '中文站 (cn)' : 'CN Site (cn)',
  leetcodeTheme: language.value === 'zh' ? 'LeetCode 主题' : 'LeetCode Theme',
  leetcodeExt: language.value === 'zh' ? '扩展功能' : 'Extensions',
  leetcodeExtNone: language.value === 'zh' ? '无扩展' : 'No Extension',
  leetcodeExtActivity: language.value === 'zh' ? '最近提交记录' : 'Recent Activity',
  leetcodeExtContest: language.value === 'zh' ? '竞赛评分历史' : 'Contest Rating',
  leetcodeExtHeatmap: language.value === 'zh' ? '52周热力图' : '52-week Heatmap',
}))

// 初始化第三方平台配置
// LeetCode - 新配置
if (!config.showLeetcode) config.showLeetcode = false
if (!config.leetcodeUsername) config.leetcodeUsername = ''
if (!config.leetcodeSite) config.leetcodeSite = 'us'
if (!config.leetcodeTheme) config.leetcodeTheme = 'light'
if (!config.leetcodeExt) config.leetcodeExt = ''

// 知乎
if (!config.showZhihu) config.showZhihu = false
if (!config.zhihuUsername) config.zhihuUsername = ''

// B站
if (!config.showBilibili) config.showBilibili = false
if (!config.bilibiliUid) config.bilibiliUid = ''

// CSDN
if (!config.showCsdn) config.showCsdn = false
if (!config.csdnId) config.csdnId = ''

// 牛客
if (!config.showNowcoder) config.showNowcoder = false
if (!config.nowcoderId) config.nowcoderId = ''

// 掘金
if (!config.showJuejin) config.showJuejin = false
if (!config.juejinUserId) config.juejinUserId = ''
</script>

<style scoped>
.stats-config {
  padding: 1rem;
}

.section {
  margin-bottom: 2rem;
}

.section h5 {
  color: #4CAF50;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 600;
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

label {
  color: var(--color-text);
  font-size: 0.9rem;
  flex: 1;
}

input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: #4CAF50;
}

input[type="text"] {
  padding: 0.4rem 0.6rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background-color: var(--color-background-mute);
  color: var(--color-text);
  width: 200px;
  font-size: 0.9rem;
}

input[type="text"]:focus {
  outline: none;
  border-color: #4CAF50;
}

select {
  padding: 0.4rem 0.6rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background-color: var(--color-background-mute);
  color: var(--color-text);
  width: 120px;
  font-size: 0.9rem;
}

select:focus {
  outline: none;
  border-color: #4CAF50;
}
</style>
