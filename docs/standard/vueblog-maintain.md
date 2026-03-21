---
title: vueblog 项目维护流程
date: 2026-03-20
tags: [vueblog, 维护流程, 规范]
categories: 规范
---

# vueblog 项目维护流程

本文记录个人博客项目 vueblog 的日常维护流程，方便协同维护。

## 项目信息

- **项目路径**: `/root/test/vueblog/`
- **项目类型**: VuePress 2 静态博客
- **编译工具**: Vite
- **部署目标**: Nginx `/var/www/html/`
- **Git 仓库**: GitHub `marbleG/vueblog`

## 标准目录结构

```
/root/test/vueblog/
├── docs/                     # Markdown 源文件
│   ├── .vuepress/
│   │   ├── config.js         # 导航栏、侧边栏配置（这里改导航）
│   │   ├── dist/            # 编译输出目录
│   │   └── public/          # 静态资源（图片等）
│   ├── store/               # 存储分类文章
│   ├── java/                # Java 分类文章
│   ├── standard/            # 规范、流程分类文章（本文在这里）
│   ├── linux/               # Linux 分类文章
│   ├── k8s/                 # K8s 分类文章
│   └── README.md
├── package.json
└── node_modules/
```

## 新增文章完整流程

### 1. 创建文章文件

根据文章分类，在对应目录创建 markdown 文件：

```bash
# 例如：新增存储分类文章
cd /root/test/vueblog
touch docs/store/your-article.md
```

文件名推荐使用 kebab-case（小写字母+连字符），比如 `iscsi.md`，不要用中文和空格。

### 2. 编写文章内容

文件开头添加 Frontmatter 信息：

```markdown
---
title: 文章标题
date: 2026-03-20
tags: [标签1, 标签2]
categories: 分类
---

# 文章标题

文章内容...
```

### 3. 更新侧边栏导航

编辑 `docs/.vuepress/config.js`，找到对应分类的 `sidebar` 配置，添加文件名（不带 `.md`）：

```javascript
'/store/': [
    '',
    'ceph',
    'iscsi',        // 新增这一行
],
```

### 4. 编译生成静态文件

```bash
cd /root/test/vueblog
npm run docs:build
```

编译成功后，静态文件输出到 `docs/.vuepress/dist/`。

### 5. 部署到 Nginx

```bash
cp -r docs/.vuepress/dist/* /var/www/html/
```

部署完成，刷新网页就能看到新文章了。

### 6. 提交到 GitHub

需要科学上网，提前启动 clash：

```bash
systemctl start clash
export http_proxy=http://127.0.0.1:7890
export https_proxy=http://127.0.0.1:7890

git add docs/path/to/article.md docs/.vuepress/config.js
git commit -m "feat: add article title"
git push origin main

systemctl stop clash
```

## 编辑已有文章

直接修改对应的 `.md` 文件，重复 **编译 → 部署 → 推送** 步骤即可。

## 常用命令汇总

```bash
# 拉取最新代码
systemctl start clash
git pull
systemctl stop clash

# 编译
npm run docs:build

# 部署
cp -r docs/.vuepress/dist/* /var/www/html/

# 推送
systemctl start clash
git push origin main
systemctl stop clash
```

## 注意事项

1. **图片存放**: 图片放在 `docs/.vuepress/public/`，引用方式 `/image.png`
2. **内部链接**: 同一博客内的文章使用相对路径，比如 `./ceph-rbd-iscsi-overview.md`，VuePress 会自动处理
3. **分类导航**: 一定要在 `config.js` 添加文章链接，否则侧边栏看不到文章
   - 纯文字链接：直接写文件名 `'article-name'`，显示为文件名
   - 自定义中文标题：写成 `{ text: '显示标题', link: 'article-name' }`
4. **编译缓存问题**: 新增文章如果没生成html，尝试 `rm -rf docs/.vuepress/dist` 清理后重新编译
5. **broken link 问题**: 不要使用 `{docsify-updated}` 这类docsify特有语法，VuePress不支持会生成死链
6. **代理使用**: GitHub 拉推送必须启动 clash，完成后关闭
7. **部署**: 每次编译后都要重新 `cp` 到 nginx 目录

---

最后更新：{docsify-updated}
