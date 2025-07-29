# MeiProGen

<p align="center">
  <img src="./src/assets/logo.png" alt="MeiProGen Logo" width="120" height="120">
</p>

<h1 align="center">MeiProGen</h1>

<!-- 打字特效 -->
<p align="center">
  <img src="https://readme-typing-svg.demolab.com/?lines=欢迎来到+MeiProGen!;动态+GitHub+个人资料生成器;立即自定义您的+README!&font=Fira%20Code&center=true&width=440&height=45&color=f75c7e&vCenter=true&size=22" alt="打字特效">
</p>

<p align="center">
  <a href="README.md">English</a> | <a href="README-ZH.MD">中文</a>
</p>

<p align="center">
  一个功能全面的 Vue 3 应用程序，允许用户动态生成带有可自定义块的 GitHub 个人资料 README 文件。
</p>

<p align="center">
  <a href="https://progen.meilingluo.cn">
    <img src="https://img.shields.io/website?label=在线演示&url=https%3A%2F%2Fprogen.meilingluo.cn" alt="在线演示">
  </a>
  <a href="https://github.com/whatp/MeiProGen/stargazers">
    <img src="https://img.shields.io/github/stars/whatp/MeiProGen" alt="GitHub Stars">
  </a>
  <a href="https://github.com/whatp/MeiProGen/issues">
    <img src="https://img.shields.io/github/issues/whatp/MeiProGen" alt="GitHub Issues">
  </a>
  <a href="https://github.com/whatp/MeiProGen/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/whatp/MeiProGen" alt="License">
  </a>
</p>

## 🌟 功能特性

- 动态生成 GitHub 个人资料 README
- 可自定义和拖拽的个人资料块
- 支持浅色和深色主题
- 多语言支持（中英文）
- 实时预览

## 🚀 演示地址

在线演示: [progen.meilingluo.cn](https://progen.meilingluo.cn)

## 📁 项目结构

```
MeiProGen/
├── public/
│   ├── _redirects
│   └── favicon.ico
├── src/
│   ├── assets/
│   ├── components/
│   │   └── BlockConfigs/
│   ├── router/
│   ├── stores/
│   ├── App.vue
│   └── main.ts
├── README.md
├── README-ZH.MD
└── package.json
```

## 🛠️ 技术栈

- [Vue 3](https://vuejs.org/) - 渐进式 JavaScript 框架
- [TypeScript](https://www.typescriptlang.org/) - 类型化的 JavaScript
- [Pinia](https://pinia.vuejs.org/) - Vue 状态管理
- [Vite](https://vitejs.dev/) - 下一代前端工具链
- [Marked](https://marked.js.org/) - Markdown 解析器

## 🏗️ 安装

```bash
# 克隆仓库
git clone https://github.com/whatp/MeiProGen.git

# 进入项目目录
cd MeiProGen

# 安装依赖
npm install
```

## ▶️ 使用

### 开发环境

```bash
# 启动开发服务器
npm run dev
```

### 生产环境

```bash
# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## ☁️ 部署

### Vercel

1. 登录 Vercel 并创建新项目
2. 链接您的 GitHub 仓库并配置构建设置：
   - 构建命令: `npm run build`
   - 输出目录: `dist`
3. 使用默认设置部署项目

### Cloudflare Pages

有关部署到 Cloudflare Pages 的详细说明，请参阅我们的 [中文部署指南](./zh-deploy-guide.md)，其中包含 GitHub 集成和手动部署方法的全面步骤。

**Vue Router 的重要配置：**
为确保 Vue Router 在 Cloudflare Pages 上的路由功能正常，已在 `public` 目录中添加了 `_redirects` 文件，内容如下：
```
/* /index.html 200
```

此配置对于使用 Vue Router 历史模式的单页应用程序至关重要。

## 👥 贡献者

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/whatp">
        <img src="https://avatars.githubusercontent.com/u/1?v=4" width="100px;" alt=""/>
        <br />
        <sub><b>whatp</b></sub>
      </a>
      <br />
      <a href="https://github.com/whatp/MeiProGen/commits?author=whatp" title="Code">💻</a>
    </td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

## 📈 Star 趋势

[![Star History Chart](https://api.star-history.com/svg?repos=whatp/MeiProGen&type=Date)](https://star-history.com/#whatp/MeiProGen&Date)

## 🤝 贡献

欢迎贡献！您可以通过以下方式帮助我们：

1. 给仓库加星 ⭐
2. Fork 并在本地克隆 🍴
3. 为错误创建问题或提出新功能 🐛
4. 提交拉取请求以提交更改 🎉

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件。

## 🙏 致谢

- 感谢所有帮助改进此项目的贡献者
- 受到 Vue.js 和 GitHub 社区的启发