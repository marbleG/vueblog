# 同步笔记到博客

## 命令

```bash
yarn sync
# 或
node scripts/sync-publish.mjs
```

## 做了什么

1. 扫描 `vault/Publish/**/*.md`。
2. 仅同步 frontmatter 中 `publish: true` 的文章。
3. 按相对路径复制到 `docs/<category>/`。
4. 删除 `docs/` 中存在但 `vault/Publish/` 中已不存在的文章。

## 手动覆盖

如果某篇文章需要在 `docs/` 中保留但不想从 Vault 同步，可以把它加入同步脚本的白名单排除。
