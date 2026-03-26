# Ceph 18 (Reef) 对比 Ceph 16 (Pacific) 新增功能详解

Ceph 是一款开源的分布式存储系统，提供对象、块和文件存储功能。本文将详细介绍 Ceph 18 (Reef) 相比 Ceph 16 (Pacific) 版本新增和改进的主要功能。

## 版本基础信息

| 版本 | 代号 | 发布时间 | 生命周期 |
|------|------|----------|----------|
| Ceph 16 | Pacific | 2021年3月 | 已 EOL (2024年3月) |
| Ceph 18 | Reef | 2023年8月 | 稳定支持中 |

## 核心功能新增与改进

### 1. RADOS 层改进

#### 1.1 新增读均衡器 (Read Balancer)
Ceph 18 引入了全新的 **读均衡器** 功能，允许用户对存储池内的主 PG (Placement Group) 进行再平衡，从而均衡各 OSD 上的读负载。

- 当前通过 `osdmaptool` 提供离线方式使用
- 用户可以生成最优主 PG 映射预览，选择性应用到集群
- 有助于平衡读负载，提升集群整体读性能

#### 1.2 RocksDB 升级与性能优化
- **版本升级**: RocksDB 从 6.x 升级到 **7.9.2**
- **按列族调优**: 支持对不同列族单独配置 RocksDB 参数，调优更精细
- **默认配置优化**: 针对大多数工作负载做了性能优化，压缩和写放大方面改进明显
  - RGW 场景下，4K 随机写入 IOPS 提升可达 **13.59%**
- **迭代开销显著降低**: 整体性能得到明显改善

#### 1.3 mClock 调度器重大改进
mClock 调度器在 Ceph 16 中已经引入，Ceph 18 做了关键性改进：

- **默认配置变更**: `balanced` 配置文件成为默认，在客户端 IO 和恢复 IO 之间取得平衡
- **用户可选择配置**:
  - `high_client_ops`: 优先保障客户端 IO
  - `high_recovery_ops`: 优先保障数据恢复 IO
- **QoS 参数优化**: 预留和限制参数现在以 OSD IOPS 能力的比例（0.0 - 1.0）表示，更直观
- **优先级改进**: 降级对象恢复优先级高于错位对象恢复，提升数据安全性
- **成本计算简化**: 移除了旧的成本参数，现在根据设备随机 IOPS 和最大顺序带宽自动计算

#### 1.4 PGLog 修剪改进
- **修复 "dups bug"**: 解决了 PG 分裂后在线修剪卡住导致 PGLog 膨胀问题
- 新增 `ceph-objectstore-tool trim-pg-log-dups` 离线操作，用于修复 OSD 因膨胀无法启动的场景

#### 1.5 其他 RADOS 变化
- `perf dump` / `perf schema` 被废弃，推荐使用新的 `counter dump` / `counter schema`
- 缓存分层 (Cache tiering) 被标记为废弃
- RADOS Python 绑定新增了以字节对象处理 omap keys 的选项，支持非 UTF-8 编码的 key
- SPDK 后端支持连接 NVMeoF 目标（非正式支持）

### 2. RBD 块存储改进

#### 2.1 分层客户端加密支持
Ceph 16 引入了初始客户端加密支持，Ceph 18 进一步完善：

- **新增分层加密支持**: 可以对子镜像（克隆）使用独立于父镜像的加密格式和密码
- **保留 COW 语义**: 高效的写时复制语义依然保留，不损失性能

#### 2.2 compare-and-write 改进
- API 语义对齐，跨 stripe 单元操作更健壮
- 不再局限于 512 字节扇区，支持 4MB 等更大的 stripe 单元
- 新增 `rbd_aio_compare_and_writev` API，支持散聚 IO

#### 2.3 其他 RBD 改进
- `rbd device unmap` 新增 `--namespace` 选项
- 所有 rbd-mirror 性能计数器已标签化，便于监控分析
- 修复了密码文件尾随换行符未去除的问题

### 3. RGW 对象存储改进

#### 3.1 多站点配置支持分桶重分片
- **新功能**: 分桶重分片现在支持多站点配置
- 新部署默认开启，现有部署需要所有站点升级后手动启用

#### 3.2 服务器端加密对象支持压缩
- 当同时开启压缩和加密时，现在支持先压缩后加密
- 需要所有站点升级到 Reef 才能启用该功能

#### 3.3 日志默认后端变更
- RGW 操作日志默认后端从 RADOS 改为 **文件**
- 默认路径: `/var/log/ceph/ops-log-$cluster-$name.log`

#### 3.4 其他 RGW 改进
- RGW 策略解析器默认拒绝未知主体，增强安全性
- JSON 输出格式一致性改进，布尔字段现在输出原生布尔类型而不是字符串
- 移除了内置的 pubsub 存储，推荐使用外部消息总线（RabbitMQ/Kafka）

### 4. CephFS 文件系统改进
- 配置选项重命名: `mds_max_retries_on_remount_failure` → `client_max_retries_on_remount_failure`
- 灾难恢复后，允许删除 `lost+found` 目录中已恢复的文件
- 宏 `AT_NO_ATTR_SYNC` 被废弃，推荐使用标准 `AT_STATX_DONT_SYNC`

### 5. Dashboard 管理界面全面升级

#### 5.1 布局重构
- 全新 Dashboard 页面布局，活跃告警和重要图表以卡片形式展示，更清晰

#### 5.2 新增功能模块
- **Cephx 认证管理**: 专门页面列出和管理集群用户
- **RGW SSE 配置**: 创建桶时即可配置 SSE-S3 和 KMS 加密
- **RBD 快照镜像配置**: 支持通过 UI 配置快照镜像，支持快照调度
- **一键 OSD 创建向导**: 三种创建模式：
  1. 容量/成本优化: 全 HDD 使用
  2. 吞吐量优化: HDD + SSD 混合
  3. IOPS 优化: 全 NVMe 使用
- **集中日志查看**: 集中收集展示所有 Ceph 集群日志

#### 5.3 可访问性与监控改进
- 符合 WCAG 2.1 level A 标准，对视障用户更友好
- **ceph-exporter**: 每个守护进程独立导出性能指标，减少性能瓶颈
- 监控栈组件升级:
  - Prometheus 2.43.0
  - Node-exporter 1.5.0
  - Grafana 9.4.7
  - Alertmanager 0.25.0

### 6. 遥测 (Telemetry) 新增排行榜功能
- 开启遥测的用户可以选择加入公开排行榜
- 用户可以添加集群描述，展示在公开排行榜上
- 排行榜地址: https://telemetry-public.ceph.com/

### 7. 其他改进
- MGR 模块 `snap_schedule`: 修复快照保留计数问题
- `ceph mgr dump` 新增顶层字段 `last_failure_osd_epoch` 和 `active_clients`

## Ceph 16 (Pacific) 主要功能回顾

为了更好对比，这里简要列出 Ceph 16 Pacific 引入的主要功能：

- **RADOS**:
  - RocksDB 分片，减少磁盘空间占用
  - 引入 mClock 调度器，提供客户端 IO 与后台操作之间的 QoS
  - 均衡器默认开启 upmap 模式
- **RBD**:
  - 镜像在线迁移支持外部数据源（本地文件、HTTP、S3）
  - 初始客户端加密支持
  - 新增持久化回写缓存，特别适合 PMEM 设备
  - Windows 客户端支持
- **RGW**:
  - 初始支持 S3 Select
  - 存储桶通知支持持久化
  - 支持 Lua 脚本
- **CephFS**:
  - 单集群多文件系统稳定
  - 新增 `mds_autoscaler` 自动扩缩容 MDS
  - 原生支持 NFS 网关集群
  - 新增 `cephfs-mirror` 容灾同步
  - Windows 客户端支持

## 升级建议

1. **升级路径**: 如果你从 Ceph 16 Pacific 升级到 Ceph 18 Reef，可直接通过 cephadm 在线升级
2. **注意事项**:
   - 升级前确保集群健康稳定，可先设置 `noout`
   - RGW 多站点需要全集群升级后再启用压缩加密对象功能
   - JSON 布尔字段格式变化可能影响现有脚本，需要相应适配
3. **新特性启用**: 升级完成后执行 `ceph osd require-osd-release reef` 启用所有 Reef 特性

## 总结

Ceph 18 Reef 在 Ceph 16 Pacific 的基础上，主要在以下方面做了提升：

- **性能**: RocksDB 升级和优化、读均衡器带来更好负载均衡和读写性能
- **可管理性**: Dashboard 全面重构，新增多个管理功能，操作更便捷
- **功能完善**: 客户端分层加密、多站点分桶重分片、加密对象压缩等完善了现有功能
- **可靠性**: 修复了 PGLog 膨胀等长期存在的问题，提升集群稳定性

对于仍在使用 Ceph 16 Pacific 的集群，由于 Pacific 已经在 2024 年 3 月到达 EOL，建议尽快规划升级到 Ceph 18 Reef 以持续获得更新和维护。

---

*参考文档:*
- [v18.2.0 Reef released - Ceph.io](https://ceph.io/en/news/blog/2023/v18-2-0-reef-released/)
- [v16.2.0 Pacific released - Ceph.io](https://ceph.io/en/news/blog/2021/v16-2-0-pacific-released/)
