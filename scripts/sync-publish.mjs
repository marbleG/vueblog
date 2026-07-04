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
