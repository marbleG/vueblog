# Task 5 Report: 创建同步脚本 `scripts/sync-publish.mjs`

## Status

DONE_WITH_CONCERNS

## What I Did

Implemented all steps from `task-5-brief.md`:

1. **Created `scripts/sync-publish.mjs`** with the exact logic specified in the brief:
   - Reads Markdown files from `vault/Publish/`.
   - Parses YAML frontmatter and filters for `publish: true`.
   - Copies matching files to the corresponding path under `docs/`.
   - Removes `docs/` Markdown files that are no longer present in `vault/Publish/`, while protecting `docs/README.md` and anything under `docs/.vuepress/`.
   - The file was written with LF line endings.

2. **Installed `glob` as a dev dependency** by running `npm install -D glob`.

3. **Updated `package.json`** to add the `sync` script alias:
   ```json
   "sync": "node scripts/sync-publish.mjs"
   ```

4. **Ran the script once on the empty `vault/Publish/` directory** (only `.gitkeep` present). It executed without errors and printed `[sync] done`.

5. **Restored the `docs/` tree** after the test run, because the empty-vault test caused the script to remove every Markdown article under `docs/` (expected behavior for the cleanup logic, but not the desired final repository state). Restoration was done with `git checkout -- docs/`.

6. **Committed** the script, `package.json`, `package-lock.json`, and this report.

## Files Created / Modified

- `scripts/sync-publish.mjs` (created)
- `package.json` (modified)
- `package-lock.json` (modified by `npm install -D glob`)
- `.superpowers/sdd/task-5-report.md` (created)

## Script Test Output

Test command:

```bash
node scripts/sync-publish.mjs
```

Output (truncated; full run listed every Markdown file under `docs/` as removed, then ended with `done`):

```text
[sync] removed docs\cicd\README.md
[sync] removed docs\cicd\devops.md
[sync] removed docs\database\README.md
[sync] removed docs\database\aof.md
[sync] removed docs\database\mariadb-galera-guide.md
[sync] removed docs\database\rdb.md
[sync] removed docs\design\README.md
[sync] removed docs\design\abstract-factory.md
...
[sync] removed docs\zh\java\spring\spring-ioc.md
[sync] done
```

The script exited with code `0` and produced no errors. After verifying the behavior, the `docs/` directory was restored to its pre-test state from Git.

## Concerns

- **Destructive first run**: When `vault/Publish/` is empty, the cleanup loop removes every Markdown article under `docs/` (except `docs/README.md` and `docs/.vuepress/`). This matches the script specification, but it means the script should only be run in a workflow where `vault/Publish/` already contains the intended published set, or where `docs/` is expected to be emptied.
- **`yarn.lock`**: `npm install` also modified `yarn.lock`. The task brief's commit command only listed `package-lock.json`, so `yarn.lock` was left unstaged. It already had uncommitted changes from earlier tasks.
