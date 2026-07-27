---
created: 2026-07-27
tags: [dashboard, meta]
---

# 标签注册表（Tag Registry）

> 统一标签分类法。新增标签请先在此登记，避免同义重复（如 `clippings` 已归一为 `剪藏`）。
> 由脚本 `tag_backfill.py` 按文件夹路径自动回填，勿手工逐个维护。

## 分类

| 标签 | 含义 | 对应位置 |
|------|------|---------|
| `已发布` | 已发布到博客的文章 | `Publish/` |
| `设计模式` | GoF 设计模式 | `Publish/design/` |
| `java` | Java 体系 | `Publish/zh/java/` |
| `jvm` / `并发` / `spring` / `orm` / `网络` / `java特性` / `集合` | Java 子主题 | `Publish/zh/java/*/` |
| `ceph` / `存储` | Ceph 分布式存储 | `Publish/store/` |
| `数据库` | 数据库 | `Publish/database/` |
| `k8s` | Kubernetes | `Publish/k8s/` |
| `linux` | Linux | `Publish/linux/` |
| `网络` | 网络 | `Publish/network/` |
| `架构` | 架构 | `Publish/architecture/` |
| `cicd` | CI/CD | `Publish/cicd/` |
| `规范` | 规范 / 标准 | `Publish/standard/` |
| `工具` | 工具 | `Publish/tools/` |
| `剪藏` | 网页剪藏 | `Clippings/` |
| `dashboard` | 学习层主控页 | `00-Dashboard/` |
| `练习` | 学习层练习 | `Study/` |
| `培训` | 培训材料 | `培训/` |
| `笔记` | 个人笔记 | `Notes/` |
| `收集` | Inbox 待整理 | `Inbox/` |

## 约定

- 标签用中文为主，便于检索；已有英文标签（如 `clippings`）归一为对应中文。
- 主题笔记同时带「具体标签 + 分类标签」（如 Ceph 文章带 `ceph` + `存储`）。
- `已发布` 仅用于发布层，便于用 Dataview 筛选已发布 / 草稿。
- 启用 Dataview 后，可用 `LIST FROM #设计模式` 等做聚合仪表盘。
