# 系统架构

## 仓库结构

```
vueblog/                 # GitHub 私有仓库
├── docs/                # VuePress 源目录（对外公开）
│   ├── .vuepress/       # VuePress 配置、静态资源
│   ├── README.md        # 博客首页
│   └── <category>/      # 同步生成的公开文章
├── vault/               # Obsidian Vault（私有）
│   ├── .obsidian/       # Obsidian 配置
│   ├── Publish/         # 待发布文章
│   ├── Notes/           # 个人笔记
│   ├── Inbox/           # 临时/待整理
│   └── Clippings/       # 网页剪藏
├── doc/                 # 工程文档（私有）
└── scripts/             # 同步脚本等工具
```

## 数据流

1. 作者在 `vault/Publish/<category>/` 下写作。
2. 文章 frontmatter 中设置 `publish: true`。
3. 运行 `node scripts/sync-publish.mjs` 把文章复制到 `docs/<category>/`。
4. `yarn docs:build` 构建静态站点。
5. GitHub Actions 把构建产物部署到 `gh_pages` 分支。
6. GitHub Pages 对外展示博客。

## 关键约束

- `docs/` 中除 `README.md`、`.vuepress/` 外，文章均由脚本同步生成。
- `vault/` 和 `doc/` 不会被 VuePress 渲染，也不会进入 GitHub Pages。
