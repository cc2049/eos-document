# Vercel 部署问题排查指南

## 📸 部署错误说明

如果你看到 "Error - first commit" 错误，说明初次部署失败了。

## 🔍 可能的原因

1. **构建命令配置错误**
2. **pnpm 未安装或版本不对**
3. **输出目录路径错误**
4. **构建超时**

## ✅ 解决方案

### 方案1：重新部署（推荐）

1. **进入 Vercel 项目页面**
   - 在 Vercel Dashboard 找到你的项目
   - 点击进入项目

2. **查看详细错误日志**
   - 点击失败的部署
   - 查看 "Build Log" 了解具体错误

3. **修正配置**

   在 Vercel 项目页面点击：
   - **Settings** → **General** → **Build & Development Settings**

   修改配置为：
   ```
   Framework Preset: Other
   Build Command: pnpm install && pnpm run build
   Output Directory: docs/.vitepress/dist
   Install Command: npm install -g pnpm@8
   Node.js Version: 18.x
   ```

4. **重新部署**
   - 点击 **Deployments** 标签
   - 点击最新部署右侧的 **...** → **Redeploy**

### 方案2：使用 npm 代替 pnpm

如果 pnpm 有问题，改用 npm：

```
Install Command: npm install
Build Command: npm run build
```

### 方案3：本地测试构建

在本地先测试构建是否成功：

```bash
# 清理缓存
rm -rf node_modules docs/.vitepress/dist

# 重新安装
pnpm install

# 构建
pnpm run build

# 检查输出目录是否存在
ls docs/.vitepress/dist
```

如果本地构建失败，先修复构建问题。

## 🌐 预览文档页面

### 成功部署后如何访问：

1. **Vercel 自动分配的域名**
   - 格式：`https://your-project-name.vercel.app`
   - 例如：`https://yisi-document.vercel.app`
   - 在 Vercel 项目首页顶部可以看到这个链接

2. **自定义域名（可选）**
   - 在 Vercel 项目 → **Settings** → **Domains** 中添加

### 本地预览开发版本：

```bash
# 启动开发服务器
pnpm run dev

# 浏览器访问
http://localhost:5173
```

## 📊 查看部署状态

在 Vercel 项目首页：
- **绿圆圈** ✅ - 部署成功
- **红圆圈** ❌ - 部署失败
- **蓝圆圈** 🔄 - 正在部署

## 🆘 常见错误及解决方法

### 错误1：pnpm: command not found

**解决方法：**
在 Vercel 设置中，将 `Install Command` 改为：
```bash
npm install -g pnpm@8 && pnpm install
```

### 错误2：Build failed: The output directory is empty

**解决方法：**
检查 `Output Directory` 设置，确保是：
```
docs/.vitepress/dist
```

### 错误3：Build timeout

**解决方法：**
1. 检查是否有大文件导致构建慢
2. 增加 Vercel 账号额度（免费版通常够用）

### 错误4：Cannot find module 'vitepress'

**解决方法：**
确保 `Install Command` 正确执行了依赖安装：
```bash
npm install -g pnpm@8 && pnpm install
```

## 📞 获取帮助

1. **查看详细日志** - Vercel 项目 → Deployments → 点击失败的部署
2. **联系支持** - Vercel Dashboard → Support
3. **社区求助** - Vercel Discord 或 GitHub Issues

---

**下一步操作：**
1. 查看 Vercel 的详细错误日志
2. 根据错误信息调整配置
3. 重新部署
4. 成功后访问自动分配的域名
