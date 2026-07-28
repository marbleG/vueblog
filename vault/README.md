# Obsidian Vault

这是 `vueblog` 仓库的 Obsidian 知识库。

## 目录说明

| 目录 | 用途 |
|------|------|
| `Publish/` | 准备公开发布到 VuePress 博客的文章 |
| `Notes/` | 个人笔记、草稿、整理后的知识 |
| `Inbox/` | 临时笔记、待整理内容 |
| `Clippings/` | 网页剪藏 |
| `培训/` | 培训课程笔记、学习材料与培训记录 |
| `AI/` | AI 使用、学习与实践相关内容（工具工作流、提示工程、agent 等）；个人学习层，默认不进博客 |
| `00-Dashboard/` | 学习层主控页：MOC、速查、易错点（链接聚合，不复制正文） |
| `Study/` | 学习层练习集，按主题分文件（如 `Study/设计模式/练习.md`）；**不在 `Publish/` 内，不会被博客发布** |
| `assets/` | 统一附件（图片等）文件夹；由 Obsidian `attachmentFolderPath` 配置指向，粘贴图片自动归位 |
| `tags.md` | 标签注册表（Tag Registry），统一标签分类法 |

## 发布流程

1. 在 `Notes/` 或 `Inbox/` 中写作。
2. 整理完成后，把文章移到 `Publish/<分类>/`。
3. 在文章 frontmatter 中设置 `publish: true`。
4. 运行 `node scripts/sync-publish.mjs` 同步到 `docs/`。
5. 提交并 push，CI 自动构建博客。
