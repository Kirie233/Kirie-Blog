@echo off
echo ========================================
echo 推送Kirie博客项目到GitHub远程仓库
echo ========================================
echo.

echo 1. 检查Git状态...
git status
echo.

echo 2. 推送main分支到远程仓库...
git push origin main
if %errorlevel% neq 0 (
    echo 错误: 推送main分支失败
    echo 请检查网络连接或GitHub访问权限
    pause
    exit /b 1
)
echo ✓ main分支推送成功
echo.

echo 3. 推送所有标签到远程仓库...
git push origin --tags
if %errorlevel% neq 0 (
    echo 错误: 推送标签失败
    echo 请检查网络连接或GitHub访问权限
    pause
    exit /b 1
)
echo ✓ 所有标签推送成功
echo.

echo 4. 验证推送结果...
git log --oneline -5
echo.

echo ========================================
echo 🎉 项目推送完成！
echo 远程仓库: https://github.com/Kirie233/Kirie-Blog.git
echo 当前分支: main
echo ========================================
echo.

echo 按任意键退出...
pause >nul
