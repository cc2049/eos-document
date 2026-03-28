# GitHub + Vercel 部署指南

## 步骤1：在 GitHub 创建仓库

1. 点击 **New repository**
2. 填写信息：
   - **Repository name**: `yisi-document` （或你喜欢的名字）
   - **Description**: 易思文档 - VitePress 文档站点
   - **Public** （公开仓库，免费）
   - 勾选 **Add a README file** （可选）
3. 点击 **Create repository**

## 步骤2：将码云代码推送到 GitHub

在本地项目目录执行以下命令：

```bash
# 1. 添加 GitHub 远程仓库
git remote add github https://github.com/你的用户名/yisi-document.git

# 2. 推送代码到 GitHub
git push github master

# 如果提示需要登录，按提示输入 GitHub 用户名和个人访问令牌
```

## 步骤3：配置 Vercel 自动部署

1. 访问 [vercel.com](https://vercel.com)
2. 点击 **Sign Up**，选择 **Continue with GitHub**
3. 授权 Vercel 访问你的 GitHub 仓库
4. 点击 **Add New Project**
5. 找到 `yisi-document` 仓库，点击 **Import**
6. 配置项目：
   - **Framework Preset**: `VitePress` （如果没有就选 `Other`）
   - **Root Directory**: `./` （根目录）
   - **Build Command**: `pnpm run build`
   - **Output Directory**: `docs/.vitepress/dist`
7. 点击 **Deploy**

## 步骤4：完成！

- Vercel 会自动分配一个域名（如 `yisi-document.vercel.app`）
- 每次推送到 GitHub 的 master 分支，Vercel 会自动重新部署
- 大约 1-2 分钟后即可访问

## 可选：配置自定义域名

1. 在 Vercel 项目页面点击 **Settings** → **Domains**
2. 输入你的域名
3. 按提示配置 DNS 解析

## 常见问题

**Q: 推送代码时提示权限错误？**
A: 需要在 GitHub 生成个人访问令牌（Personal Access Token）
   - GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - 生成新令牌，勾选 `repo` 权限
   - 用令牌代替密码登录

**Q: 构建失败？**
A: 检查 Build Command 和 Output Directory 是否配置正确

**Q: 如何更新网站？**
A: 只需推送代码到 GitHub，Vercel 会自动重新部署
