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
| `中间件` | 数据库/消息等中间件组件 | `Publish/middleware/` |
| `clickhouse` | ClickHouse 列式分析库 | `Publish/middleware/clickhouse.md` |
| `sql` | SQL 速查 / 片段 | 各数据库笔记的速查章节 |
| `k8s` | Kubernetes | `Publish/k8s/` |
| `linux` | Linux | `Publish/linux/` |
| `网络` | 网络 | `Publish/network/` |
| `架构` | （已更名）软件工程 | `Publish/software-engineering/` |
| `cicd` | CI/CD | `Publish/cicd/` |
| `规范` | 规范 / 标准 | `Publish/standard/` |
| `工具` | 工具 | `Publish/tools/` |
| `剪藏` | 网页剪藏 | `Clippings/` |
| `dashboard` | 学习层主控页 | `00-Dashboard/` |
| `练习` | 学习层练习 | `Study/` |
| `培训` | 培训材料 | `培训/` |
| `软件工程` | 软件工程能力提升（已发布分类，默认分享） | `Publish/software-engineering/` |
| `软件工程能力` | 软件工程私人成长模块（能力地图/学习笔记/刻意练习/复盘） | `软件工程/` |
| `编程` | 编程与语言功底 | `Publish/software-engineering/编程与语言功底/` |
| `算法` | 数据结构与算法 | `Publish/software-engineering/数据结构与算法/` |
| `代码质量` | 代码质量与重构 | `Publish/software-engineering/代码质量与重构/` |
| `系统设计` | 系统设计 / 架构（含概要设计） | `Publish/software-engineering/系统设计/` |
| `测试` | 测试与质量保障 | `Publish/software-engineering/测试与质量保障/` |
| `调试` | 调试与问题定位 | `Publish/software-engineering/调试与问题定位/` |
| `工程化` | 工程化 / CI-CD / DevOps | `Publish/software-engineering/工程化/` |
| `需求` | 需求与产品思维 | `Publish/software-engineering/需求与产品思维/` |
| `协作` | 协作与沟通 | `Publish/software-engineering/协作与沟通/` |
| `技术领导力` | 技术影响力 / 领导力 | `Publish/software-engineering/技术影响力与领导力/` |
| `笔记` | 个人笔记 | `Notes/` |
| `收集` | Inbox 待整理 | `Inbox/` |

## 约定

- 标签用中文为主，便于检索；已有英文标签（如 `clippings`）归一为对应中文。
- 主题笔记同时带「具体标签 + 分类标签」（如 Ceph 文章带 `ceph` + `存储`）。
- `已发布` 仅用于发布层，便于用 Dataview 筛选已发布 / 草稿。
- 启用 Dataview 后，可用 `LIST FROM #设计模式` 等做聚合仪表盘。
