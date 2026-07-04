# 发布新文章

## 步骤

1. 在 `vault/Publish/<category>/` 下创建 Markdown 文件。
2. 文件顶部添加 frontmatter：
   ```yaml
   ---
   title: 文章标题
   date: 2026-07-04
   publish: true
   ---
   ```
3. 运行 `yarn sync` 同步到 `docs/`。
4. 运行 `yarn docs:build` 验证构建通过。
5. 提交 `vault/` 和 `docs/` 的变更。
6. Push 到远程，等待 CI 部署。

## 分类选择

分类对应 `vault/Publish/` 下的子目录，并在 `docs/.vuepress/config.js` 中配置 `sidebar` 和 `navbar`，如 `database`、`java`、`linux`。
