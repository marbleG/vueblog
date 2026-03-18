# AGENTS.md — VueBlog Agent Guidelines

## Project Overview

This is a VuePress v2 static blog site (Marble's blog) for technical documentation.
Tech stack: VuePress 2, Vite bundler, Sass, Node.js 14.18+.

---

## 1. Build / Lint / Test Commands

### Development

```bash
npm run docs:dev
# or
yarn docs:dev
```

Starts a dev server at `http://localhost:8080`. Changes to docs and config are hot-reloaded.

### Production Build

```bash
npm run docs:build
# or
yarn docs:build
```

Outputs to `docs/.vuepress/dist/`. This is what CI/CD runs on every push.

### Install Dependencies

```bash
npm install
# or
yarn
```

### Lint / Type-Check

- **No linting tools are configured** in this project. There are no ESLint, Prettier, or TypeScript compiler checks in the pipeline.
- The CI pipeline (`.github/workflows/vuepress-deploy.yml`) only runs `yarn docs:build`. If the build succeeds, deployment proceeds.
- **Before committing**, always run `yarn docs:build` locally to verify the build passes.

### Testing

- **No tests are configured** in this project. There are no test runners, test frameworks, or snapshot tests.
- Manual verification: start `docs:dev`, navigate the site, check for build errors and broken links.

---

## 2. Code Style Guidelines

### General

- This is a **documentation/content project**, not an application. Most changes are Markdown files.
- VuePress configuration lives in `docs/.vuepress/config.js`.
- JavaScript is written as **ESM** (`import`/`export`), consistent with VuePress v2 requirements.
- No TypeScript is used in this project.
- No Prettier or ESLint is enforced, but code should be clean, consistent, and readable.

### Directory Structure

```
vueblog/
├── .github/
│   └── workflows/
│       └── vuepress-deploy.yml    # CI/CD: builds and deploys on push
├── docs/                           # All content lives here
│   ├── .vuepress/
│   │   ├── config.js               # VuePress site config (ONLY edit this)
│   │   ├── public/                  # Static assets (logo, favicon, etc.)
│   │   └── dist/                   # Build output (generated, do not edit)
│   ├── cicd/                       # Topic directories (Markdown content)
│   ├── design/
│   ├── k8s/
│   ├── linux/
│   ├── network/
│   ├── redis/
│   ├── standard/
│   ├── store/
│   ├── zh/
│   │   ├── guide/
│   │   └── java/
│   └── README.md                   # Home page
├── package.json
└── deploy.sh                       # Local deploy script
```

### Naming Conventions

| Item | Convention | Example |
|------|-----------|---------|
| Directory names | kebab-case | `cicd/`, `k8s/`, `vueblog/` |
| Markdown files | kebab-case | `devops.md`, `rdb-backup.md` |
| Sidebar entry | File name (no extension) | `['devops', 'ci-overview']` |
| Navbar link text | PascalCase or as-is | `Home`, `java`, `CI/CD` |

### VuePress Config (`docs/.vuepress/config.js`)

- Use `defineUserConfig` from `vuepress`.
- Use the `defaultTheme` with `viteBundler()`.
- **Sidebar paths** must end with `/` for directories. Sidebar config keys must match URL prefixes exactly (e.g., `'/redis/'` maps to `docs/redis/`).
- **Navbar links** to external URLs are allowed (e.g., Baidu, Google).
- The `base` path is `/vueblog/`. All internal links must be relative or prefixed with this base.

```js
import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
    base: '/vueblog/',
    lang: 'zh-CN',
    title: "Marble's blog",
    bundler: viteBundler(),
    theme: defaultTheme({ navbar: [...], sidebar: {...} })
})
```

### Markdown Content

- Use standard Markdown (CommonMark).
- Code blocks: always specify the language for syntax highlighting.
- Images: use relative paths from the current Markdown file. Prefer `image/` subdirectory within each topic directory.
- Headings: maintain consistent hierarchy (`#` → `##` → `###`).
- The home page is `docs/README.md`.

### CSS / Sass

- Sass is available for custom styling via `.vuepress/styles`.
- Custom stylesheets should be placed in `docs/.vuepress/styles/` (create if absent).
- VuePress v2 uses Sass with `sass-embedded`.

### Git Workflow

- **Commit messages**: Use clear, descriptive Chinese or English messages. The project uses Conventional Commits style (e.g., `feat:`, `fix:`).
- **Branches**: Feature branches encouraged (e.g., `feature/new-topic`).
- **Never commit**:
  - `docs/.vuepress/dist/` (build output)
  - `node_modules/`
  - `.vuepress/.cache/`, `.vuepress/.temp/`
  - `.env` files or any secrets
  - IDE config (`/.idea/`, `/.vscode/`)
- **CI/CD**: On every push to any branch, GitHub Actions runs `yarn docs:build`. If it succeeds, the site is deployed to `gh_pages`.

### Error Handling

- **Build errors**: Run `npm run docs:build` locally. Common issues:
  - Broken Markdown syntax
  - Missing image paths
  - Incorrect sidebar configuration (mismatched keys)
  - VuePress plugin incompatibility
- **Broken links**: Ensure all internal links end with `/` for directory routes.
- **Hot reload not working**: Delete `.vuepress/.cache` and `.vuepress/.temp`, then restart `docs:dev`.

### Dependencies

- Only add dependencies to `package.json` if necessary (e.g., new VuePress plugins).
- After adding a dependency, verify the build still passes.
- VuePress plugins must be compatible with VuePress v2 (check the plugin's peer dependencies).

### Key Things to Avoid

1. **Do not modify** files inside `docs/.vuepress/dist/` — they are auto-generated.
2. **Do not hardcode** absolute URLs for internal links. Use relative paths or the `base` prefix.
3. **Do not use** `console.log` or debug code in `config.js`.
4. **Do not add** test frameworks or heavy tooling — this is a static content project.
5. **Do not commit** secrets, credentials, or personal access tokens.

---

## 3. Common Tasks Reference

### Adding a new topic section

1. Create a new directory under `docs/` (e.g., `docs/newtopic/`).
2. Add an `index.md` file inside it.
3. Add the directory to `sidebar` in `docs/.vuepress/config.js`.
4. Optionally add a navbar link.
5. Run `docs:dev` to verify.

### Adding a new blog post

1. Place a Markdown file in the appropriate topic directory under `docs/`.
2. Use `kebab-case` for the filename.
3. Update `sidebar` in `docs/.vuepress/config.js` to include the new file.

### Modifying the sidebar

Edit the `sidebar` object in `docs/.vuepress/config.js`. Keys must match URL prefixes. Values are arrays of file paths (without extension) relative to `docs/`.

### Adding images

1. Create an `image/` subdirectory within the topic directory.
2. Reference images with relative paths in Markdown: `![Alt text](./image/filename.png)`.

---

*Last updated: 2026-03-18*
