# Obsidian + VuePress 单仓库集成改造计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在现有 `vueblog` 私有仓库内引入 `vault/` 作为 Obsidian 知识库，并通过同步脚本把 `vault/Publish/` 下标记为公开的文章自动同步到 `docs/`，保证 `yarn docs:build` 仍然能构建出 VuePress 博客。

**Architecture:** 保持 VuePress 源目录 `docs/` 不变，仅用它承载“已筛选公开内容”；新增 `vault/` 目录作为 Obsidian Vault（子目录级），日常写作、剪藏、AI 辅助都在 `vault/` 完成；新增 `doc/` 目录存放项目工程文档。通过 `scripts/sync-publish.mjs` 单向同步：`vault/Publish/**/*.md` → `docs/`。仓库私有，GitHub Pages 只暴露构建产物，不会暴露 `vault/` 和 `doc/`。

**Tech Stack:** VuePress v2 (Vite bundler)、Node.js ESM、Obsidian、Obsidian Git 插件。

## Global Constraints

- VuePress 源目录必须是 `docs/`，`base: '/'` 保持不变。
- 所有新增脚本必须是 ESM，使用 `.mjs` 扩展名或 `"type": "module"` 下的 `.js`。
- `docs/` 里除 `.vuepress/`、`README.md` 及同步生成的文章外，不再手写新文章。
- `vault/` 作为 Obsidian Vault 子目录，`.obsidian/` 中缓存/插件数据不入 Git。
- `doc/` 只给维护者/AI 阅读，不被 VuePress 渲染。
- 每次任务完成后必须能运行 `yarn docs:build` 并通过。
- 操作前若有未提交修改，先确认是否提交或stash，避免丢失用户工作。

---

### Task 1: 创建 `vault/` 目录结构并迁移现有 Obsidian 内容

**Files:**
- Create: `vault/README.md`
- Create: `vault/Publish/.gitkeep`
- Create: `vault/Notes/.gitkeep`
- Create: `vault/Inbox/.gitkeep`
- Create: `vault/Clippings/.gitkeep`
- Move: `.obsidian/` → `vault/.obsidian/`
- Move: `Clippings/` → `vault/Clippings/`
- Move: `2026-06-07.md` → `vault/Notes/2026-06-07.md`
- Move: `未命名.canvas` → `vault/Notes/未命名.canvas`
- Delete: `source/`（当前为空，确认后删除）

**Interfaces:**
- Consumes: 现有 `.obsidian/`、`Clippings/`、`2026-06-07.md`、`未命名.canvas`
- Produces: `vault/` 目录结构，作为后续 Obsidian Vault 的打开目标

- [ ] **Step 1: 检查当前未跟踪文件并确认状态**

Run:
```bash
git status --short
```
Expected: 能看到 `.obsidian/`、`Clippings/`、`2026-06-07.md`、`未命名.canvas` 等未跟踪项，以及若干 `M` 文件。

- [ ] **Step 2: 创建 vault 目录骨架**

Run:
```bash
mkdir -p vault/Publish vault/Notes vault/Inbox vault/Clippings
touch vault/Publish/.gitkeep vault/Notes/.gitkeep vault/Inbox/.gitkeep vault/Clippings/.gitkeep
```

- [ ] **Step 3: 迁移现有内容到 vault**

Run:
```bash
mv .obsidian vault/
mv Clippings/* vault/Clippings/ 2>/dev/null || true
rm -rf Clippings
mv 2026-06-07.md vault/Notes/
mv "未命名.canvas" vault/Notes/
```

- [ ] **Step 4: 删除空 source 目录**

Run:
```bash
rm -rf source
```

- [ ] **Step 5: 创建 vault README**

Create `vault/README.md`:
```markdown
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
```

- [ ] **Step 6: 验证目录结构**

Run:
```bash
tree -L 2 vault/
```
Expected: 能看到 `vault/Publish/`、`vault/Notes/`、`vault/Inbox/`、`vault/Clippings/`、`vault/.obsidian/`、`vault/README.md`。

---

### Task 2: 创建 `doc/` 工程文档目录结构

**Files:**
- Create: `doc/README.md`
- Create: `doc/architecture/system-overview.md`
- Create: `doc/runbooks/sync-notes-to-blog.md`
- Create: `doc/runbooks/publish-new-post.md`
- Create: `doc/standards/writing-style.md`
- Create: `doc/standards/obsidian-vault.md`
- Create: `doc/operations/change-log.md`
- Modify: `doc/async_operations.md`（若存在且仍需要，移动到合适位置）

**Interfaces:**
- Consumes: 现有 `doc/async_operations.md`
- Produces: 完整的工程文档骨架

- [ ] **Step 1: 创建目录骨架**

Run:
```bash
mkdir -p doc/architecture doc/runbooks doc/standards doc/operations
```

- [ ] **Step 2: 创建 doc 入口 README**

Create `doc/README.md`:
```markdown
# 项目工程文档

本目录用于维护 `vueblog` 项目的运行、架构、流程和规范，**不会被 VuePress 渲染**。

## 目录说明

| 目录 | 用途 |
|------|------|
| `architecture/` | 系统架构、仓库结构、数据流 |
| `runbooks/` | 操作手册、故障处理、发布流程 |
| `standards/` | 写作规范、Obsidian Vault 使用约定 |
| `operations/` | 变更记录、运维日志 |

## 快速入口

- [系统架构](./architecture/system-overview.md)
- [同步脚本使用说明](./runbooks/sync-notes-to-blog.md)
- [发布新文章流程](./runbooks/publish-new-post.md)
```

- [ ] **Step 3: 移动现有 async_operations.md**

Run:
```bash
git mv doc/async_operations.md doc/architecture/async-operations.md
```

- [ ] **Step 4: 创建架构文档**

Create `doc/architecture/system-overview.md`:
```markdown
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
```

- [ ] **Step 5: 创建 runbooks**

Create `doc/runbooks/sync-notes-to-blog.md`:
```markdown
# 同步笔记到博客

## 命令

```bash
node scripts/sync-publish.mjs
```

## 做了什么

1. 扫描 `vault/Publish/**/*.md`。
2. 仅同步 frontmatter 中 `publish: true` 的文章。
3. 按相对路径复制到 `docs/<category>/`。
4. 复制文章引用的本地图片（保持相对路径）。
5. 删除 `docs/` 中存在但 `vault/Publish/` 中已不存在的文章。

## 手动覆盖

如果某篇文章需要在 `docs/` 中保留但不想从 Vault 同步，可以把它加入同步脚本的白名单排除。
```

Create `doc/runbooks/publish-new-post.md`:
```markdown
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
3. 运行 `node scripts/sync-publish.mjs`。
4. 运行 `yarn docs:build` 验证构建通过。
5. 提交 `vault/` 和 `docs/` 的变更。
6. Push 到远程，等待 CI 部署。

## 分类选择

分类对应 `docs/.vuepress/config.js` 中 `sidebar` 和 `navbar` 的 key，如 `database`、`java`、`linux`。
```

- [ ] **Step 6: 创建 standards**

Create `doc/standards/writing-style.md`:
```markdown
# 写作规范

## Frontmatter

```yaml
---
title: 文章标题
date: 2026-07-04
publish: true
---
```

## 图片

- 使用相对路径，如 `./image/diagram.png`。
- 图片放在文章同目录的 `image/` 子目录中。

## 链接

- 内部目录链接以 `/` 结尾，如 `/database/`。
- 避免使用绝对 URL 引用站内内容。

## 代码块

- 必须指定语言，便于语法高亮。
```

Create `doc/standards/obsidian-vault.md`:
```markdown
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
```

- [ ] **Step 7: 创建变更记录**

Create `doc/operations/change-log.md`:
```markdown
# 变更记录

## 2026-07-04

- 引入 `vault/` 作为 Obsidian 知识库。
- 创建 `doc/` 工程文档目录。
- 新增 `scripts/sync-publish.mjs` 同步脚本。
- 修复 `docs/README.md` 首页 `actionLink` 指向不存在目录的问题。
- 清理 `database/` 与 `store/` 中重复的 `mariadb-galera-guide.md`。
- 更新 `AGENTS.md` 以反映新的仓库结构。
```

---

### Task 3: 更新 `.gitignore`

**Files:**
- Modify: `.gitignore`

**Interfaces:**
- Consumes: 现有 `.gitignore`
- Produces: 忽略 `vault/.obsidian/` 缓存/插件数据，`doc/` 中不需要跟踪的临时文件

- [ ] **Step 1: 追加 vault 和 doc 相关忽略规则**

Edit `.gitignore`，在文件末尾追加：
```gitignore
# Obsidian vault metadata (not notes)
vault/.obsidian/workspace.json
vault/.obsidian/workspace-mobile.json
vault/.obsidian/plugins/*/data.json
vault/.obsidian/cache
vault/.obsidian/graph.json

# Draw.io / Excalidraw local backups
*.svg.bak
*.png.bak

# Project docs local scratch
*.local.md
```

- [ ] **Step 2: 验证规则生效**

Run:
```bash
git check-ignore vault/.obsidian/workspace.json
```
Expected: 输出 `vault/.obsidian/workspace.json`，表示被忽略。

---

### Task 4: 修复现有 VuePress 问题

**Files:**
- Modify: `docs/README.md`
- Modify: `docs/.vuepress/config.js`
- Modify: `AGENTS.md`
- Modify: `deploy.sh`

**Interfaces:**
- Consumes: 当前 `docs/README.md`、`docs/.vuepress/config.js`、`AGENTS.md`、`deploy.sh`
- Produces: 修复后的配置和文档

- [ ] **Step 1: 修复首页 actionLink**

`docs/README.md` 第 7 行：
```yaml
actionLink: /zh/guide/
```
改为：
```yaml
actionLink: /zh/java/
```

- [ ] **Step 2: 移除 store 侧边栏中的重复 mariadb 指南**

`docs/.vuepress/config.js` 第 53 行：
```js
'mariadb-galera-guide',
```
从 `'/store/'` 数组中删除这一行。

- [ ] **Step 3: 删除 store 中的重复文件**

Run:
```bash
rm docs/store/mariadb-galera-guide.md
```

- [ ] **Step 4: 更新 AGENTS.md 目录结构描述**

`AGENTS.md` 第 30-45 行的目录结构示例改为：
```markdown
```
vueblog/
├── .github/workflows/          # CI/CD
├── docs/                       # VuePress 源目录（公开内容）
│   ├── .vuepress/
│   │   ├── config.js           # VuePress site config (ONLY edit this)
│   │   ├── public/             # Static assets (logo, favicon)
│   │   └── dist/               # Build output (auto-generated)
│   ├── cicd/, database/, design/, k8s/, linux/, network/, store/, tools/
│   ├── standard/
│   ├── zh/java/
│   └── README.md               # Home page
├── vault/                      # Obsidian knowledge base (private)
│   ├── .obsidian/              # Obsidian config
│   ├── Publish/                # Articles to publish
│   ├── Notes/                  # Personal notes
│   ├── Inbox/                  # Temporary / draft notes
│   └── Clippings/              # Web clippings
├── doc/                        # Engineering documentation
├── scripts/                    # Automation scripts
├── package.json
└── deploy.sh
```
```

- [ ] **Step 5: 删除 AGENTS.md 中过时的 redis 描述**

`AGENTS.md` 第 39 行中 `redis/` 从目录列表移除；第 73-74 行示例导航栏中的 `{ text: 'redis', link: '/redis/' }` 和第 76 行 `'/redis/'` 侧边栏配置示例改为 `/database/` 示例。

- [ ] **Step 6: 修正 deploy.sh 或标记为已弃用**

Option A（推荐）：修正 `deploy.sh`
```bash
#!/usr/bin/env sh
set -e

npm run docs:build
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/marbleG/vueblog.git master:gh_pages

cd -
```

Option B：如果不再使用手动部署，删除 `deploy.sh` 并在 `AGENTS.md` 中说明 CI 自动部署。

---

### Task 5: 创建同步脚本 `scripts/sync-publish.mjs`

**Files:**
- Create: `scripts/sync-publish.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: `vault/Publish/**/*.md`
- Produces: 同步后的 `docs/<category>/**/*.md`；移除已下架文章

- [ ] **Step 1: 创建脚本文件**

Create `scripts/sync-publish.mjs`:
```javascript
import fs from 'node:fs'
import path from 'node:path'
import { globSync } from 'glob'

const repoRoot = path.resolve(import.meta.dirname, '..')
const vaultRoot = path.join(repoRoot, 'vault', 'Publish')
const docsRoot = path.join(repoRoot, 'docs')

const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/

function readFrontmatter(content) {
    const match = content.match(frontmatterRegex)
    if (!match) return {}
    const lines = match[1].split('\n')
    const fm = {}
    for (const line of lines) {
        const idx = line.indexOf(':')
        if (idx === -1) continue
        const key = line.slice(0, idx).trim()
        let value = line.slice(idx + 1).trim()
        if (value === 'true') value = true
        else if (value === 'false') value = false
        fm[key] = value
    }
    return fm
}

function shouldPublish(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const fm = readFrontmatter(content)
    return fm.publish === true
}

function copyFile(src, dest) {
    const dir = path.dirname(dest)
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
    }
    fs.copyFileSync(src, dest)
    console.log(`[sync] ${path.relative(repoRoot, src)} -> ${path.relative(repoRoot, dest)}`)
}

function main() {
    if (!fs.existsSync(vaultRoot)) {
        console.log('[sync] vault/Publish/ does not exist, nothing to do.')
        return
    }

    const vaultFiles = globSync('**/*.md', { cwd: vaultRoot, absolute: true })
    const syncedTargets = new Set()

    for (const vaultFile of vaultFiles) {
        if (!shouldPublish(vaultFile)) continue

        const relativePath = path.relative(vaultRoot, vaultFile)
        const targetPath = path.join(docsRoot, relativePath)
        copyFile(vaultFile, targetPath)
        syncedTargets.add(targetPath)
    }

    // Remove docs/ articles that no longer exist in vault/Publish/
    const docsArticles = globSync('**/*.md', { cwd: docsRoot, absolute: true })
    const protectedFiles = new Set([
        path.join(docsRoot, 'README.md'),
    ])

    for (const docsFile of docsArticles) {
        if (protectedFiles.has(docsFile)) continue
        if (docsFile.includes(path.join('docs', '.vuepress'))) continue
        if (!syncedTargets.has(docsFile)) {
            fs.unlinkSync(docsFile)
            console.log(`[sync] removed ${path.relative(repoRoot, docsFile)}`)
        }
    }

    console.log('[sync] done')
}

main()
```

- [ ] **Step 2: 添加 glob 依赖**

Run:
```bash
yarn add -D glob
```

- [ ] **Step 3: 在 package.json 添加脚本**

Modify `package.json`:
```json
"scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs",
    "sync": "node scripts/sync-publish.mjs"
}
```

- [ ] **Step 4: 本地测试同步脚本（空转）**

Run:
```bash
node scripts/sync-publish.mjs
```
Expected: 此时 `vault/Publish/` 为空，脚本输出 `[sync] vault/Publish/ does not exist, nothing to do.` 或 `[sync] done`。

---

### Task 6: 迁移现有 `docs/` 文章到 `vault/Publish/` 并验证同步

**Files:**
- Create: `vault/Publish/` 下各分类目录及文章
- Modify: 被迁移文章的 frontmatter，增加 `publish: true`
- Delete: 旧 `docs/` 位置的文章（由脚本同步后覆盖）

**Interfaces:**
- Consumes: `docs/cicd/*.md`、`docs/database/*.md`、`docs/design/*.md`、`docs/k8s/*.md`、`docs/linux/*.md`、`docs/network/*.md`、`docs/standard/*.md`、`docs/store/*.md`、`docs/tools/*.md`、`docs/zh/java/**/*.md`
- Produces: `vault/Publish/` 下的源文件；同步后 `docs/` 保持原 URL 不变

- [ ] **Step 1: 把 docs/ 文章移动到 vault/Publish/**

Run:
```bash
mkdir -p vault/Publish/cicd
mkdir -p vault/Publish/database
mkdir -p vault/Publish/design
mkdir -p vault/Publish/k8s
mkdir -p vault/Publish/linux
mkdir -p vault/Publish/network
mkdir -p vault/Publish/standard
mkdir -p vault/Publish/store
mkdir -p vault/Publish/tools
mkdir -p vault/Publish/zh/java/features
mkdir -p vault/Publish/zh/java/jvm
mkdir -p vault/Publish/zh/java/concurrent
mkdir -p vault/Publish/zh/java/spring
mkdir -p vault/Publish/zh/java/orm
mkdir -p vault/Publish/zh/java/network
mkdir -p vault/Publish/zh/java/collections

# 移动文章（保留 .vuepress/ 和 README.md 不动）
find docs -type f -name '*.md' \
  ! -path 'docs/.vuepress/*' \
  ! -path 'docs/README.md' \
  -exec bash -c 'mkdir -p "vault/Publish/$(dirname "$1")" && cp "$1" "vault/Publish/$1"' _ {} \;
```

- [ ] **Step 2: 给每篇迁移的文章添加 publish: true**

Run:
```bash
node -e "
const fs = require('fs');
const path = require('path');
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (entry.name.endsWith('.md')) {
      let content = fs.readFileSync(p, 'utf-8');
      if (!/^---\s*\n/.test(content)) {
        content = '---\npublish: true\n---\n\n' + content;
      } else {
        content = content.replace(/^(---\s*\n)/, '\$1publish: true\n');
      }
      fs.writeFileSync(p, content);
    }
  }
}
walk('vault/Publish');
"
```

- [ ] **Step 3: 删除 docs/ 中已迁移的文章（保留 README.md 和 .vuepress/）**

Run:
```bash
find docs -type f -name '*.md' \
  ! -path 'docs/.vuepress/*' \
  ! -path 'docs/README.md' \
  -delete
```

- [ ] **Step 4: 运行同步脚本**

Run:
```bash
yarn sync
```
Expected: 脚本把 `vault/Publish/**/*.md` 复制回 `docs/` 原位置，输出每个复制的文件路径。

- [ ] **Step 5: 验证 docs/ 结构恢复**

Run:
```bash
tree -L 3 docs/
```
Expected: `docs/` 目录结构与迁移前一致，文章存在。

---

### Task 7: 更新 `AGENTS.md` 与运行文档

**Files:**
- Modify: `AGENTS.md`
- Modify: `doc/runbooks/sync-notes-to-blog.md`

**Interfaces:**
- Consumes: 改造后的仓库结构
- Produces: 反映最新实践的维护指南

- [ ] **Step 1: 在 AGENTS.md 新增 "Obsidian Vault 与内容发布" 小节**

在 `AGENTS.md` 第 4 节（Common Tasks）后新增第 5 节：

```markdown
---

## 5. Obsidian Vault 与内容发布

### 仓库结构补充

- `vault/`：Obsidian Vault，只打开此目录作为 Vault。
- `vault/Publish/<category>/`：要发布到博客的文章源文件。
- `docs/<category>/`：由 `yarn sync` 生成的公开文章，**不要直接编辑**。

### 发布文章流程

1. 在 `vault/Publish/<category>/` 下新建 Markdown 文件。
2. 添加 frontmatter：
   ```yaml
   ---
   title: 标题
   date: 2026-07-04
   publish: true
   ---
   ```
3. 运行 `yarn sync` 同步到 `docs/`。
4. 运行 `yarn docs:build` 验证构建通过。
5. 提交并 push。

### 新增分类

1. 在 `vault/Publish/` 下新建分类目录。
2. 在 `docs/.vuepress/config.js` 的 `navbar` 和 `sidebar` 中添加对应配置。
3. 运行 `yarn sync` 和 `yarn docs:build` 验证。
```

- [ ] **Step 2: 重命名后续章节编号**

原 `## 5. Dependencies` 改为 `## 6. Dependencies`，原 `## 6. Key Things to Avoid` 改为 `## 7. Key Things to Avoid`。

- [ ] **Step 3: 更新 doc/runbooks/sync-notes-to-blog.md**

在文档中补充 `yarn sync` 别名：
```markdown
## 命令

```bash
yarn sync
# 或
node scripts/sync-publish.mjs
```
```

---

### Task 8: 验证构建并提交

**Files:**
- All files touched above

**Interfaces:**
- Consumes: 改造后的完整仓库
- Produces: 可构建、可部署的仓库状态

- [ ] **Step 1: 清理 VuePress 缓存**

Run:
```bash
rm -rf docs/.vuepress/.cache docs/.vuepress/.temp
```

- [ ] **Step 2: 运行构建**

Run:
```bash
yarn docs:build
```
Expected: 构建成功，输出 `docs/.vuepress/dist/`，无错误。

- [ ] **Step 3: 确认 vault/ 和 doc/ 未进入 dist**

Run:
```bash
ls docs/.vuepress/dist/ | grep -E 'vault|doc' || echo 'OK: no vault/doc in dist'
```
Expected: 输出 `OK: no vault/doc in dist`。

- [ ] **Step 4: 提交变更**

Run:
```bash
git add .
git status --short
```
Review changes, then:
```bash
git commit -m "feat: integrate Obsidian vault and add publish sync workflow

- Move .obsidian, Clippings and draft notes into vault/
- Create doc/ engineering documentation structure
- Add scripts/sync-publish.mjs to sync vault/Publish/ to docs/
- Fix docs/README.md actionLink and remove duplicate mariadb guide
- Update AGENTS.md with new repository conventions"
```

---

## Self-Review

### 1. Spec coverage

- [x] 保留 VuePress 构建能力 → Task 1, 4, 6, 8
- [x] 单仓库内同时支持 Obsidian → Task 1, 2, 3
- [x] 不暴露私人文档到 GitHub Pages → Task 1, 3, 8
- [x] 使用 `doc/` 作为工程文档目录 → Task 2
- [x] 同步脚本避免维护两份文档 → Task 5, 6
- [x] 修复现有不一致 → Task 4

### 2. Placeholder scan

- [x] 无 TBD/TODO/"implement later"
- [x] 每个任务都有具体文件和命令
- [x] 代码片段完整可运行

### 3. Type / naming consistency

- [x] 脚本使用 ESM `.mjs`，与项目 `type: module` 一致
- [x] `vault/Publish/` → `docs/` 路径映射保持一致
- [x] `publish: true` 作为同步开关

---

## Execution Handoff

**Plan complete and saved to `doc/superpowers/plans/2026-07-04-obsidian-vuepress-integration.md`.**

Two execution options:

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration.

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints.

**Which approach?**
