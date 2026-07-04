---
name: publish-vuepress-article
description: Use when adding a new category or publishing a new article to the VuePress blog from the Obsidian vault
---

# Publish VuePress Article

## Overview

In this repository, `docs/` is generated from `vault/Publish/` via `npm run sync`. All editing happens in the vault; `docs/.vuepress/config.js` is the only hand-edited part of the generated site.

## When to Use

- Adding a new top-level category to the VuePress blog
- Publishing a new article from `vault/Publish/`
- A category page returns 404 or a sidebar shows no articles

## Required Sub-Skill

- **superpowers:verification-before-completion** — before claiming the task is done, run `npm run docs:build` and confirm the page count increased.

## Quick Reference

| Step | Action | Why |
|------|--------|-----|
| 1 | Create `vault/Publish/<category>/` | Source of truth for the category |
| 2 | Add `vault/Publish/<category>/README.md` with `publish: true` | Required for `/category/` to resolve |
| 3 | Add article files with `publish: true` | Only these are synced to `docs/` |
| 4 | Register in `docs/.vuepress/config.js` | Navbar + sidebar entries |
| 5 | Run `npm run sync` | Generates `docs/<category>/` |
| 6 | Run `npm run docs:build` | Verifies the site compiles |
| 7 | Run `npm run docs:dev` | Manual check at `http://localhost:8080/<category>/` |

## Steps

### 1. Create the vault category

```bash
mkdir -p vault/Publish/<category>
```

### 2. Create the category index

`vault/Publish/<category>/README.md` must exist and have `publish: true`:

```markdown
---
publish: true
---

# Category Name

Short description of the category.
```

### 3. Add the article

```markdown
---
title: "Article Title"
date: 2026-07-04
publish: true
---

# Article Title

Body...
```

### 4. Register in VuePress config

Edit `docs/.vuepress/config.js`:

```js
navbar: [
    // ...
    { text: 'Category', link: '/<category>/' },
],
sidebar: {
    '/<category>/': [
        '',              // README.md
        'article-slug',  // article-slug.md, no extension
    ],
}
```

### 5. Sync and verify

```bash
npm run sync
ls docs/<category>/
rm -rf docs/.vuepress/.cache docs/.vuepress/.temp
npm run docs:build
npm run docs:dev
```

## Common Mistakes

| Symptom | Cause | Fix |
|---------|-------|-----|
| `/category/` returns 404 | Missing `README.md` | Add `vault/Publish/<category>/README.md` with `publish: true` |
| Sidebar empty or wrong | Missing/mismatched sidebar key | Add `'/<category>/'` to `sidebar` and match file names exactly |
| Article not in `docs/` | Missing `publish: true` | Add `publish: true` to frontmatter |
| `SEARCH_INDEX` build error | Corrupt search cache | Delete `.cache`/`.temp` and rebuild |
| Directly editing `docs/` | `docs/` is generated | Edit files in `vault/Publish/` and run `npm run sync` |

## Constraints

- Never create or edit Markdown files directly under `docs/` except `docs/README.md` and `docs/.vuepress/`.
- Keep images in an `image/` subfolder next to the article that uses them.
- Always add `publish: true` to frontmatter for anything that should appear on the blog.

## References

- `doc/runbooks/publish-new-post.md`
- `doc/architecture/system-overview.md`
- VuePress default theme config: https://vuejs.press/reference/default-theme/config.html
