#!/bin/bash

# VitePress 手动部署脚本
# 适用于码云 Gitee Pages

set -e

echo "🚀 开始部署 VitePress 文档到 Gitee Pages..."

# 1. 安装依赖
echo "📦 安装依赖..."
pnpm install --frozen-lockfile

# 2. 构建项目
echo "🔨 构建项目..."
pnpm run build

# 3. 切换到 pages 分支
echo "📂 切换到 pages 分支..."
git checkout -b pages || git checkout pages

# 4. 复制构建产物
echo "📋 复制构建产物..."
rm -rf ./*
cp -r docs/.vitepress/dist/* .

# 5. 提交更改
echo "💾 提交更改..."
git add .
git config user.name "Deploy Bot"
git config user.email "deploy@example.com"
git commit -m "Deploy to Gitee Pages - $(date '+%Y-%m-%d %H:%M:%S')" || echo "No changes to commit"

# 6. 推送到远程仓库
echo "📤 推送到远程仓库..."
git push origin pages --force

# 7. 返回 master 分支
git checkout master

echo "✅ 部署完成！"
echo "🌐 请前往码云仓库的 '服务' -> 'Gitee Pages' 查看部署状态"
