# Obsidian Vault 使用约定

## 打开方式

在 Obsidian 中选择 **Open folder as vault**，路径选择仓库根目录下的 `vault/` 文件夹。

## 注意事项

- 不要在仓库根目录打开 Vault，否则 `node_modules/`、`package.json` 会干扰文件列表。
- `vault/.obsidian/` 中的缓存、插件数据已被 `.gitignore` 忽略。
- 使用 Obsidian Git 插件时，它能识别父目录的 Git 仓库（自 v2.24.3 起支持 vault 位于 git repo 子目录）。

## 目录用途

- `Publish/`：仅放要发到博客的文章。
- `Notes/`：个人知识库主体。
- `Inbox/`：临时、未整理内容。
- `Clippings/`：网页剪藏。
