@echo off
echo ========================================
echo    Kirie博客系统 - GitHub Pages部署脚本
echo ========================================
echo.

echo [1/6] 检查当前分支...
git branch --show-current
if not "%errorlevel%"=="0" (
    echo 错误：Git仓库未初始化
    pause
    exit /b 1
)

echo.
echo [2/6] 构建项目...
call npm run build
if not "%errorlevel%"=="0" (
    echo 错误：项目构建失败
    pause
    exit /b 1
)

echo.
echo [3/6] 切换到gh-pages分支...
git checkout gh-pages
if not "%errorlevel%"=="0" (
    echo 错误：无法切换到gh-pages分支
    pause
    exit /b 1
)

echo.
echo [4/6] 清理旧文件并复制新文件...
del /q *.html *.ico *.md 2>nul
rmdir /s /q assets 2>nul
xcopy /s /e /y dist\* .
rmdir /s /q dist

echo.
echo [5/6] 提交更改...
git add .
git commit -m "更新GitHub Pages部署文件 - %date% %time%"

echo.
echo [6/6] 推送到远程仓库...
git push origin gh-pages
if not "%errorlevel%"=="0" (
    echo 错误：推送失败
    git checkout main
    pause
    exit /b 1
)

echo.
echo [完成] 切换回main分支...
git checkout main

echo.
echo ========================================
echo    部署完成！
echo    GitHub Pages地址：
echo    https://kirie233.github.io/Kirie-Blog/
echo ========================================
echo.
pause
