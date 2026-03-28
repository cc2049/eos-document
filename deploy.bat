@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo ========================================
echo VitePress 文档部署脚本
echo ========================================
echo.

REM 检查是否在正确的分支
for /f "tokens=*" %%i in ('git branch --show-current') do set CURRENT_BRANCH=%%i
if not "%CURRENT_BRANCH%"=="master" (
    echo 警告：当前不在 master 分支
    echo 当前分支: %CURRENT_BRANCH%
    set /p CONTINUE="是否继续部署? (y/n): "
    if /i not "!CONTINUE!"=="y" exit /b 0
)

echo 步骤 1: 安装依赖...
call pnpm install --frozen-lockfile
if %errorlevel% neq 0 (
    echo ❌ 依赖安装失败
    exit /b 1
)

echo.
echo 步骤 2: 构建项目...
call pnpm run build
if %errorlevel% neq 0 (
    echo ❌ 构建失败
    exit /b 1
)

echo.
echo 步骤 3: 切换到 pages 分支...
git checkout -b pages 2>nul || git checkout pages
if %errorlevel% neq 0 (
    echo ❌ 切换分支失败
    exit /b 1
)

echo.
echo 步骤 4: 清理并复制构建产物...
del /Q /F /S *.* >nul 2>&1
for /d %%d in (*) do @rd /s /q "%%d" >nul 2>&1
xcopy /E /I /Y docs\.vitepress\dist\*.* .

echo.
echo 步骤 5: 提交更改...
git add .
git config user.name "Deploy Bot"
git config user.email "deploy@example.com"
git commit -m "Deploy to Gitee Pages - %date% %time%" 2>nul || echo 没有需要提交的更改

echo.
echo 步骤 6: 推送到远程仓库...
git push origin pages --force
if %errorlevel% neq 0 (
    echo ❌ 推送失败
    exit /b 1
)

echo.
echo 步骤 7: 返回 master 分支...
git checkout master

echo.
echo ========================================
echo ✅ 部署完成！
echo ========================================
echo.
echo 🌐 请前往码云仓库的以下位置查看部署状态：
echo    仓库首页 -> 服务 -> Gitee Pages
echo.
echo 如果页面未更新，请在 Gitee Pages 设置中点击"更新"按钮
echo.
pause
