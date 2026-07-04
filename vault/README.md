# Obsidian Vault

这是 `vueblog` 仓库的 Obsidian 知识库。

## 目录说明

| 目录 | 用途 |
|------|------|
| `Publish/` | 准备公开发布到 VuePress 博客的文章 |
| `Notes/` | 个人笔记、草稿、整理后的知识 |
| `Inbox/` | 临时笔记、待整理内容 |
| `Clippings/` | 网页剪藏 |

## 发布流程

1. 在 `Notes/` 或 `Inbox/` 中写作。
2. 整理完成后，把文章移到 `Publish/<分类>/`。
3. 在文章 frontmatter 中设置 `publish: true`。
4. 运行 `node scripts/sync-publish.mjs` 同步到 `docs/`。
5. 提交并 push，CI 自动构建博客。
