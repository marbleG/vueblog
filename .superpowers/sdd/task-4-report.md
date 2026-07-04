# Task 4 Report: 修复现有 VuePress 问题

## Status

DONE

## What I Did

Implemented all steps from `task-4-brief.md`:

1. **Fixed homepage actionLink** in `docs/README.md` from `/zh/guide/` to `/zh/java/`.
2. **Removed duplicate entry** `mariadb-galera-guide` from the `/store/` sidebar array in `docs/.vuepress/config.js`.
3. **Deleted duplicate file** `docs/store/mariadb-galera-guide.md`.
4. **Updated `AGENTS.md` directory structure** block to reflect the new project layout including `vault/`, `doc/`, `scripts/`, and `zh/java/`.
5. **Removed redis references** in `AGENTS.md`:
   - Replaced navbar example `{ text: 'redis', link: '/redis/' }` with `{ text: 'database', link: '/database/' }`.
   - Replaced sidebar example `'/redis/': ['', 'aof', 'rdb']` with `'/database/': ['', 'mariadb-galera-guide']`.
   - Updated sidebar rule example from `'/redis/'` to `'/database/'`.
6. **Fixed `deploy.sh`** to the specified content, correcting repo casing (`vueBlog` → `vueblog`) and target branch (`gh-pages` → `gh_pages`).
7. **Verified the build** with `npm run docs:build`.
8. **Committed** the changes with the specified message.

All file modifications were made with LF line endings.

## Files Modified / Deleted

- `docs/README.md` (modified)
- `docs/.vuepress/config.js` (modified)
- `AGENTS.md` (modified)
- `deploy.sh` (modified)
- `docs/store/mariadb-galera-guide.md` (deleted)

## Build Output and Page Count

```text
> docs:build
> vuepress build docs

- Initializing and preparing data
✔ Initializing and preparing data - done in 1.05s
- Compiling with vite
[plugin builtin:vite-reporter]
(!) Some chunks are larger than 500 kB after minification. Consider:
- Using dynamic import() to code-split the application
- Use build.rolldownOptions.output.codeSplitting to improve chunking: https://rolldown.rs/reference/OutputOptions.codeSplitting
- Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.
✔ Compiling with vite - done in 2.34s
- Rendering 78 pages
✔ Rendering 78 pages - done in 660ms
success VuePress build completed in 4.99s!
```

**Page count: 78** (down from 79 as expected after removing the duplicate article).

## Concerns

- `package-lock.json` and `yarn.lock` were already modified in the working tree before this task began. They were **not** part of this task's changes and were left unstaged/uncommitted. Only the files listed in the task brief were committed.
