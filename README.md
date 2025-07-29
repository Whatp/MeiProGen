# MeiProGen

<p align="center">
  <img src="./src/assets/logo.png" alt="MeiProGen Logo" width="120" height="120">
</p>

<h1 align="center">MeiProGen</h1>

<!-- Typing Animation -->
<p align="center">
  <img src="https://readme-typing-svg.demolab.com/?lines=Welcome+to+MeiProGen!;Dynamic+GitHub+Profile+Generator;Customize+Your+README+Now!&font=Fira%20Code&center=true&width=440&height=45&color=f75c7e&vCenter=true&size=22" alt="Typing SVG">
</p>

<p align="center">
  <a href="README.md">English</a> | <a href="README-ZH.MD">中文</a>
</p>

<p align="center">
  A comprehensive Vue 3 application enabling users to dynamically generate GitHub profile README files with customizable blocks.
</p>

<p align="center">
  <a href="https://progen.meilingluo.cn">
    <img src="https://img.shields.io/website?label=Live%20Demo&url=https%3A%2F%2Fprogen.meilingluo.cn" alt="Live Demo">
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

## 🌟 Features

- Dynamic GitHub profile README generation
- Customizable and draggable profile blocks
- Light and dark theme support
- Multi-language support (English & Chinese)
- Real-time preview
- Internationalized Skills & Tools configuration
- Internationalized Social Media configuration

## 🚀 Live Demo

Check out the live demo: [progen.meilingluo.cn](https://progen.meilingluo.cn)

## 📁 Project Structure

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

## 🛠️ Tech Stack

- [Vue 3](https://vuejs.org/) - Progressive JavaScript Framework
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Pinia](https://pinia.vuejs.org/) - Vue Store
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [Marked](https://marked.js.org/) - Markdown Parser

- Dynamic GitHub profile README generation.
- Customizable and draggable profile blocks.
- Light and dark theme support.

## 🏗️ Installation

```bash
# Clone the repository
git clone https://github.com/whatp/MeiProGen.git

# Navigate to the project directory
cd MeiProGen

# Install dependencies
npm install
```

## ▶️ Usage

### Development

```bash
# Start the development server
npm run dev
```

### Production

```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

## ☁️ Deployment

### Vercel

1. Sign in to Vercel and create a new project
2. Link your GitHub repository and configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Deploy the project with default settings

### Cloudflare Pages

For detailed instructions on deploying to Cloudflare Pages, please refer to our [Chinese deployment guide](./zh-deploy-guide.md) which includes comprehensive steps for both GitHub integration and manual deployment methods.

**Important Configuration for Vue Router:**
To ensure proper routing functionality on Cloudflare Pages, a `_redirects` file has been added to the `public` directory with the following content:
```
/* /index.html 200
```

This configuration is essential for single-page applications using Vue Router's history mode.

## 📊 GitHub Stats

### GitHub Streak Stats
<p align="center">
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=whatp&theme=tokyonight" alt="GitHub Streak Stats">
</p>

### Social Stats
<p align="center">
  <img src="https://stats.justsong.cn/api/github?username=whatp" alt="GitHub Stats">
  <img src="https://stats.justsong.cn/api/leetcode?username=whatp" alt="LeetCode Stats">
</p>

## 👥 Contributors

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

## 📈 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=whatp/MeiProGen&type=Date)](https://star-history.com/#whatp/MeiProGen&Date)

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Star the repository ⭐
2. Fork and clone locally 🍴
3. Create issues for bugs or propose new features 🐛
4. Submit pull requests with your improvements 🎉

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📚 中文文档

有关中文文档，请参阅 [README-ZH.MD](./README-ZH.MD)。

## 🙏 Acknowledgments

- Thanks to all contributors who have helped improve this project
- Inspired by the Vue.js and GitHub communities
