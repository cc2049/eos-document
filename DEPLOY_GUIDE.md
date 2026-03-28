# VitePress 自动化部署指南

## 📋 概述

本文档介绍如何将 VitePress 文档项目通过 CI/CD 自动部署到 Gitee Pages（完全免费）。

## 🎯 部署方案

### 方案1：GitHub Actions + Gitee Pages（推荐）

**优势：**
- GitHub Actions 免费额度大
- 配置简单，一键部署
- 自动化程度高

**配置步骤：**

1. **创建 GitHub 仓库**
   - 将码云仓库镜像到 GitHub（或直接使用 GitHub）

2. **配置 GitHub Actions**
   - 文件位置：`.github/workflows/deploy.yml`
   - 会自动在推送到 master 分支时触发构建

3. **启用 GitHub Pages**
   - 进入 GitHub 仓库 Settings
   - Pages → Build and deployment → Source 选择 GitHub Actions

4. **配置自定义域名（可选）**
   - 在 Gitee Pages 设置中添加 CNAME 文件
   - 在 `deploy.yml` 中设置 `cname` 字段

---

### 方案2：码云流水线 + Gitee Pages

**优势：**
- 完全在码云生态内
- 国内访问速度快
- 完全免费

**配置步骤：**

1. **启用码云流水线**
   - 进入码云仓库
   - 点击"流水线"标签
   - 选择"新建流水线"

2. **导入流水线配置**
   - 文件位置：`.workflow/gitee-pages-deploy.yml`
   - 导入配置后保存

3. **启用 Gitee Pages**
   - 进入码云仓库
   - 点击"服务" → "Gitee Pages"
   - 选择 `pages` 分支进行部署
   - 点击"启动"

---

### 方案3：手动部署脚本

**使用场景：**
- 不想使用 CI/CD
- 需要完全控制部署时机
- 快速测试部署

**使用方法：**

#### Windows 用户：
```bash
deploy.bat
```

#### Linux/Mac 用户：
```bash
chmod +x deploy.sh
./deploy.sh
```

---

## 🔧 配置说明

### 环境要求

- Node.js >= 18
- pnpm >= 8
- Git

### 构建输出目录

VitePress 默认构建输出目录：`docs/.vitepress/dist/`

### Gitee Pages 限制

- 每次构建后需要在 Gitee Pages 设置中手动点击"更新"
- 每个月有访问次数限制（免费版）

---

## 🚀 快速开始

### 最快上手方式（方案1）

1. 将代码推送到 GitHub
2. 进入 GitHub 仓库 Settings → Pages
3. 选择 GitHub Actions 作为部署源
4. 等待 Actions 自动完成构建
5. 访问 `https://<username>.github.io/<repo>/`

---

## 📝 注意事项

1. **Gitee Pages 更新延迟**
   - Gitee Pages 需要手动点击"更新"按钮才能看到最新内容
   - 建议使用 GitHub Pages 自动更新

2. **构建失败排查**
   - 检查 `package.json` 中的 `build` 脚本
   - 确保 `pnpm install` 能成功执行
   - 查看 CI/CD 日志获取详细错误信息

3. **自定义域名**
   - 在 `docs/.vitepress/dist` 目录下创建 `CNAME` 文件
   - 文件内容为你的域名

4. **HTTPS 证书**
   - Gitee Pages 提供免费 HTTPS 证书
   - 在 Gitee Pages 设置中启用 HTTPS

---

## 🎨 自定义配置

### 修改构建命令

编辑 `.github/workflows/deploy.yml` 或 `.workflow/gitee-pages-deploy.yml`：

```yaml
# 修改构建命令
- pnpm run build
# 改为
- pnpm run build:custom
```

### 修改 Node.js 版本

```yaml
node-version: '18'  # 改为你需要的版本
```

---

## 📚 参考资源

- [VitePress 官方文档](https://vitepress.dev/)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [Gitee Pages 文档](https://gitee.com/help/articles/4136)
- [码云流水线文档](https://gitee.com/help/articles/13817)

---

## ❓ 常见问题

### Q1: 推送代码后没有自动部署？
A: 检查：
- 是否推送到正确的分支（master）
- CI/CD 配置文件是否正确
- 查看 Actions/流水线日志

### Q2: Gitee Pages 更新很慢？
A:
- 使用 GitHub Pages（更新更快）
- 在 Gitee Pages 设置中点击"强制更新"

### Q3: 构建失败？
A:
- 检查 Node.js 版本
- 删除 `node_modules` 重新安装依赖
- 查看构建日志定位问题

---

## 📞 支持

如有问题，请提交 Issue 或联系项目维护者。
