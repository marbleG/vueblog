# AGENTS.md — VueBlog Agent Guidelines

This is a VuePress v2 static blog site (Marble's blog) for technical documentation in Chinese. Tech stack: VuePress 2, Vite bundler, Sass, Node.js 14.18+.

---

## 1. Build / Lint / Test Commands

**Development**: `yarn docs:dev` - Starts dev server at `http://localhost:8080` with hot reload.

**Production Build**: `yarn docs:build` - Outputs to `docs/.vuepress/dist/`. **This is what CI/CD runs on every push.**

**Install**: `yarn`

**Lint/Type-Check**: No linting tools configured - no ESLint, Prettier, or TypeScript. CI pipeline only runs `yarn docs:build`. **Before committing**, always run `yarn docs:build` locally.

**Testing**: No tests configured - this is a static content project. Manual verification: start `docs:dev`, navigate the site, check for build errors.

**Debugging**: 
- Build errors: Run `yarn docs:build` locally. Common issues: broken Markdown syntax, missing image paths, incorrect sidebar configuration.
- Hot reload not working: Delete `.vuepress/.cache` and `.vuepress/.temp`, restart.
- Check console output for error messages.

---

## 2. Code Style Guidelines

**General**: Documentation project - most changes are Markdown files. VuePress config: `docs/.vuepress/config.js`. JavaScript written as **ESM** (`import`/`export`). **No TypeScript**. No Prettier/ESLint enforced, but code should be clean and readable.

**Directory Structure**:
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
│   ├── zh/java/                # Chinese Java content
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

**Naming Conventions**:
| Item | Convention | Example |
|------|-----------|---------|
| Directory names | kebab-case | `cicd/`, `k8s/` |
| Markdown files | kebab-case | `devops.md`, `rdb-backup.md` |
| Sidebar entry | File name (no extension) | `['devops', 'ci-overview']` |
| Navbar link text | PascalCase or as-is | `Home`, `CI/CD` |

**VuePress Config (`docs/.vuepress/config.js`)**: **Critical**: The `base` path is `/` (not `/vueblog/`). All internal links should be relative.

```js
import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { viteBundler } from '@vuepress/bundler-vite'
import { searchPlugin } from '@vuepress/plugin-search'

export default defineUserConfig({
    base: '/',
    lang: 'zh-CN',
    title: 'Marble\'s blog',
    description: '技术博客',
    bundler: viteBundler(),
    plugins: [searchPlugin({ exclude: ['/'] })],
    theme: defaultTheme({
        navbar: [
            { text: 'Home', link: '/' },
            { text: 'database', link: '/database/' },
        ],
        sidebar: {
            '/database/': ['', 'mariadb-galera-guide'],
            // Sidebar keys MUST end with '/' for directories
        }
    })
})
```

**Sidebar Configuration Rules**:
1. **Keys must match URL prefixes exactly** (e.g., `'/database/'` maps to `docs/database/`)
2. **Keys must end with `/`** for directories
3. **Values are arrays** of file paths (without extension) relative to `docs/`
4. **Support nested structures** with `collapsible: true`

**Markdown Content Guidelines**:
- Use standard Markdown (CommonMark)
- **Code blocks**: Always specify language for syntax highlighting
  ```bash
  yarn docs:build
  ```
  ```javascript
  const example = 'code'
  ```
- **Images**: Use relative paths from current Markdown file. Prefer `image/` subdirectory: `![Alt](./image/file.png)`
- **Headings**: Maintain consistent hierarchy (`#` → `##` → `###`)
- **Links**: Internal links should end with `/` for directory routes
- **Chinese content**: Most content is in Chinese (简体中文)
- **Frontmatter**: Use YAML frontmatter for page metadata
  ```yaml
  ---
  title: Page Title
  date: 2024-01-01
  ---
  ```

**JavaScript/Config Guidelines**:
- Use ESM syntax consistently
- Use 4-space indentation (not tabs)
- Prefer `const` over `let`, avoid `var`
- Use template literals for strings with variables
- Import order: external → internal → relative

---

## 3. Git Workflow

**Commit Messages**: Use clear, descriptive messages in Chinese or English. Follow Conventional Commits style: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `chore:`

**Branch Strategy**: Feature branches encouraged: `feature/new-topic`, `fix/bug-description`. Main branch: `main` or `master`.

**Files to Never Commit**: `docs/.vuepress/dist/` (build output), `node_modules/`, `.vuepress/.cache/`, `.vuepress/.temp/`, `.env` files or any secrets, IDE config (`/.idea/`, `/.vscode/`).

**CI/CD Pipeline**: On every push: GitHub Actions runs `yarn docs:build`, deploys to `gh_pages` branch if successful.

---

## 4. Common Tasks

**Adding a New Topic Section**:
1. Create directory under `docs/` (e.g., `docs/newtopic/`)
2. Add `index.md` file
3. Update sidebar in `docs/.vuepress/config.js`
4. Optionally add navbar link
5. Run `yarn docs:dev` to verify

**Modifying the Sidebar**: Edit `sidebar` object in `config.js`:
- Keys = URL prefixes (must end with `/`)
- Values = arrays of file paths (without `.md` extension)

**Troubleshooting**:
| Issue | Solution |
|-------|----------|
| Build fails | Check Markdown syntax, missing files |
| Hot reload not working | Clear `.vuepress/.cache` and `.vuepress/.temp` |
| Broken links | Ensure internal links end with `/` |
| Missing sidebar | Check sidebar key matches URL prefix exactly |
| Images not loading | Verify relative path from Markdown file |

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

---

## 6. Dependencies

- **Only add dependencies if necessary** (e.g., new VuePress plugins)
- **Verify build passes** after adding dependencies
- **Check compatibility**: VuePress plugins must be compatible with VuePress v2

---

## 7. Key Things to Avoid

1. **Do not modify** files inside `docs/.vuepress/dist/` (auto-generated)
2. **Do not hardcode** absolute URLs for internal links
3. **Do not use** `console.log` or debug code in `config.js`
4. **Do not add** test frameworks or heavy tooling
5. **Do not commit** secrets, credentials, or personal access tokens
6. **Do not use** `base: '/vueblog/'` - the actual base path is `/`

---

*Last updated: 2026-07-04*
