# VitePress 自动化部署指南

## 📋 概述

本文档介绍如何将 VitePress 文档项目通过 CI/CD 自动部署到 GitHub Pages，实现完全自动化的部署流程。

## 🎯 部署方案

### 方案1：GitHub Actions + GitHub Pages（推荐）

**优势：**
- GitHub Actions 免费额度大
- 配置简单，一键部署
- 自动化程度高
- 部署后自动更新，无需手动操作

**配置步骤：**

1. **创建 GitHub 仓库**
   - 将代码推送到 GitHub 仓库

2. **配置 GitHub Actions**
   - 文件位置：`.github/workflows/static.yml`
   - 会自动在推送到 main 分支时触发构建
   - 包含完整的缓存策略和错误处理

3. **启用 GitHub Pages**
   - 进入 GitHub 仓库 Settings
   - Pages → Build and deployment → Source 选择 GitHub Actions

4. **配置自定义域名（可选）**
   - 在 `docs/.vitepress/dist` 目录下创建 `CNAME` 文件
   - 文件内容为你的域名

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
   - 文件位置：`.workflow/vitepress-deploy.yml`
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

- Node.js >= 16.0.0
- pnpm >= 8
- Git

### 构建输出目录

VitePress 默认构建输出目录：`docs/.vitepress/dist/`

### 脚本配置

`package.json` 中包含以下脚本：

- `dev`：启动开发服务器
- `build`：构建项目
- `docs:build`：构建项目（与 build 相同，用于 CI/CD）
- `preview`：预览构建结果
- `lint`：代码检查（预留）
- `test`：测试（预留）

---

## 🚀 快速开始

### 最快上手方式（方案1）

1. 将代码推送到 GitHub
2. 进入 GitHub 仓库 Settings → Pages
3. 选择 GitHub Actions 作为部署源
4. 等待 Actions 自动完成构建和部署
5. 访问 `https://<username>.github.io/<repo>/`

---

## 📝 注意事项

1. **部署验证**
   - GitHub Actions 配置包含自动部署验证步骤
   - 部署完成后会自动检查部署是否成功

2. **构建失败排查**
   - 检查 `package.json` 中的脚本配置
   - 确保 `pnpm install` 能成功执行
   - 查看 GitHub Actions 日志获取详细错误信息

3. **自定义域名**
   - 在 `docs/.vitepress/dist` 目录下创建 `CNAME` 文件
   - 文件内容为你的域名

4. **HTTPS 证书**
   - GitHub Pages 提供免费 HTTPS 证书
   - 部署后自动启用 HTTPS

---

## 🎨 自定义配置

### 修改构建命令

编辑 `.github/workflows/static.yml`：

```yaml
# 修改构建命令
- run: pnpm docs:build
# 改为
- run: pnpm run build:custom
```

### 修改 Node.js 版本

```yaml
node-version: '20'  # 改为你需要的版本
```

### 调整内存限制

```yaml
- name: Build
  run: pnpm docs:build
  env:
    NODE_OPTIONS: --max_old_space_size=4096  # 调整内存限制
```

---

## 📚 参考资源

- [VitePress 官方文档](https://vitepress.dev/)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [Gitee Pages 文档](https://gitee.com/help/articles/4136)
- [码云流水线文档](https://gitee.com/help/articles/13817)

---

## ❓ 常见问题

### Q1: 推送代码后没有自动部署？
A: 检查：
- 是否推送到正确的分支（main）
- GitHub Actions 配置文件是否正确
- 查看 Actions 日志获取详细信息

### Q2: 构建失败？
A: 
- 检查 Node.js 版本是否满足要求
- 删除 `node_modules` 重新安装依赖
- 查看构建日志定位问题
- 检查内存限制是否足够

### Q3: 部署验证失败？
A: 
- 等待几分钟后重新查看部署状态
- 检查 GitHub Pages 配置是否正确
- 查看 Actions 日志中的验证步骤输出

---

## 📞 支持

如有问题，请提交 Issue 或联系项目维护者。
