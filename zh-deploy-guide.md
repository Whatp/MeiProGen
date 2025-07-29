# 将 myProGen-vue 部署到 Cloudflare Pages 的详细指南

本指南将详细介绍如何将 myProGen-vue 项目部署到 Cloudflare Pages。

## 目录
- [准备工作](#准备工作)
- [通过 GitHub 部署](#通过-github-部署)
- [手动部署](#手动部署)
- [环境变量配置](#环境变量配置)
- [自定义域名](#自定义域名)
- [故障排除](#故障排除)

## 准备工作

在开始部署之前，请确保您已完成以下准备工作：

1. **Cloudflare 账户**：注册并登录到 [Cloudflare](https://dash.cloudflare.com/sign-up/pages)
2. **GitHub 账户**：确保项目代码已推送到 GitHub 仓库
3. **项目构建配置**：
   - 构建命令: `npm run build`
   - 输出目录: `dist/`
   - Node.js 版本: 17 或更高版本

## 通过 GitHub 部署

这是推荐的部署方式，可以实现自动构建和部署。

### 步骤 1: 登录 Cloudflare Pages

1. 访问 [Cloudflare Pages](https://dash.cloudflare.com/sign-up/pages)
2. 使用您的 Cloudflare 账户登录
3. 点击 "Create a project"

### 步骤 2: 连接 GitHub 仓库

1. 选择 "Connect to Git"
2. 授权 Cloudflare 访问您的 GitHub 账户
3. 选择包含 myProGen-vue 项目的仓库

### 步骤 3: 配置构建设置

在项目配置页面中，填写以下信息：

| 配置项 | 值 |
|--------|-----|
| Project name | 您的项目名称（例如：myprogen-vue） |
| Production branch | main 或 master |
| Build command | `npm run build` |
| Build output directory | `/dist` |
| Root directory | `/` |

### 步骤 4: 部署项目

1. 点击 "Save and Deploy"
2. Cloudflare 将自动开始构建和部署过程
3. 部署完成后，您将获得一个 `.pages.dev` 的临时域名

## 手动部署

如果您不想连接 GitHub，也可以通过手动上传的方式部署。

### 步骤 1: 构建项目

在本地计算机上执行以下命令：

```bash
# 安装依赖
npm install

# 构建项目
npm run build
```

构建完成后，会在项目根目录下生成 `dist` 文件夹。

### 步骤 2: 上传到 Cloudflare Pages

1. 登录 Cloudflare 控制台
2. 导航到 Pages 服务
3. 点击 "Create a project"
4. 选择 "Upload assets"
5. 将 `dist` 文件夹中的所有文件打包成 zip 文件并上传

## 环境变量配置

如果您的项目需要环境变量，请按以下步骤配置：

1. 在 Cloudflare Pages 项目设置中找到 "Environment variables" 部分
2. 点击 "Add variable" 添加变量
3. 常用环境变量示例：
   - `NODE_VERSION`: `17`
   - `VITE_API_URL`: 您的 API 地址（如果需要）

## 自定义域名

您可以为您的项目配置自定义域名：

1. 在项目设置中找到 "Custom domains" 部分
2. 点击 "Setup a custom domain"
3. 输入您的自定义域名
4. 按照指示配置 DNS 记录

## 故障排除

### 构建失败

如果构建失败，请检查以下几点：

1. **Node.js 版本**：确保在环境变量中设置了正确的 Node.js 版本
2. **依赖问题**：检查 package.json 中的依赖是否正确
3. **构建命令**：确认构建命令是否正确（`npm run build`）

### 部署后页面空白

如果部署后页面显示空白，请检查：

1. **路由配置**：Vue Router 需要配置为 history 模式时，需要添加 _redirects 文件
2. 在 `public` 文件夹中创建 `_redirects` 文件，内容如下：
   ```
   /* /index.html 200
   ```

### 性能优化

为了获得更好的性能，可以考虑：

1. 启用 Cloudflare 的自动优化功能
2. 配置缓存策略
3. 启用 Brotli 压缩

## 版本信息

- **v1.0.0**：初始版本，支持基本的 Cloudflare Pages 部署
- **v1.1.0**：添加环境变量配置说明
- **v1.2.0**：完善故障排除部分，添加性能优化建议

## 反馈和支持

如果您在部署过程中遇到任何问题，请：
1. 查看 Cloudflare [官方文档](https://developers.cloudflare.com/pages/)
2. 提交 GitHub issue 到本项目仓库
3. 联系 Cloudflare 支持团队

---

*本指南最后更新时间：2025年7月*
