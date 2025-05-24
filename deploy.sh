#!/bin/bash

echo "========================================"
echo "   Kirie博客系统 - GitHub Pages部署脚本"
echo "========================================"
echo

echo "[1/6] 检查当前分支..."
current_branch=$(git branch --show-current)
if [ $? -ne 0 ]; then
    echo "错误：Git仓库未初始化"
    exit 1
fi
echo "当前分支: $current_branch"

echo
echo "[2/6] 构建项目..."
npm run build
if [ $? -ne 0 ]; then
    echo "错误：项目构建失败"
    exit 1
fi

echo
echo "[3/6] 切换到gh-pages分支..."
git checkout gh-pages
if [ $? -ne 0 ]; then
    echo "错误：无法切换到gh-pages分支"
    exit 1
fi

echo
echo "[4/6] 清理旧文件并复制新文件..."
rm -f *.html *.ico *.md
rm -rf assets
cp -r dist/* .
rm -rf dist

echo
echo "[5/6] 提交更改..."
git add .
git commit -m "更新GitHub Pages部署文件 - $(date)"

echo
echo "[6/6] 推送到远程仓库..."
git push origin gh-pages
if [ $? -ne 0 ]; then
    echo "错误：推送失败"
    git checkout main
    exit 1
fi

echo
echo "[完成] 切换回main分支..."
git checkout main

echo
echo "========================================"
echo "   部署完成！"
echo "   GitHub Pages地址："
echo "   https://kirie233.github.io/Kirie-Blog/"
echo "========================================"
echo
