---
title: MariaDB Galera Cluster 深入指南
date: 2026-03-29
categories:
  - 数据库
tags:
  - MariaDB
  - Galera
  - 集群
  - 高可用
---

## 目录

1. 核心概念
2. 架构原理
3. 认证复制机制
4. 快速开始
5. 高可用与容灾
6. 使用场景
7. 最佳实践
8. 性能调优
9. 故障排查

---

## 核心概念

### 什么是 MariaDB Galera Cluster？

MariaDB Galera Cluster 是一个基于同步多主（multi-primary）架构的数据库集群解决方案，提供：

- **高可用性**：无单点故障，自动故障转移
- **同步复制**：数据实时复制到所有节点，无复制延迟
- **读写扩展**：所有节点均可处理读写请求
- **强一致性**：基于认证机制的复制确保数据一致性

### 核心特性

| 特性 | 描述 |
|------|------|
| 多主架构 | 任何节点都可以接受读写操作 |
| 同步复制 | 事务提交时实时复制到所有节点 |
| 无数据丢失 | 通过认证机制确保事务原子性 |
| 自动故障转移 | 节点故障时自动重新配置集群 |
| 读写分离 | 支持通过代理进行负载均衡 |

---

## 架构原理

### 核心架构组件

MariaDB Galera Cluster 由四个主要组件构成：

```
┌─────────────────────────────────────────────────────────┐
│              MariaDB Server (DBMS)                     │
│           (标准 MariaDB 服务，通常使用 InnoDB)        │
└────────────────────┬──────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────┐
│              wsrep API                                 │
│    wsrep Hooks ←→ dlopen() ←→ Galera Plugin          │
└────────────────────┬──────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────┐
│         Galera Replication Plugin                       │
│  ┌─────────────┬─────────────┬─────────────┐         │
│  │ Certification  │Replication  │ GComm      │         │
│  │    Layer     │   Layer     │ Framework   │         │
│  └─────────────┴�─────────────┴─────────────┘         │
└─────────────────────────────────────────────────────────┘
```

### 1. MariaDB Server (DBMS)

- 使用 InnoDB 存储引擎的标准 MariaDB 服务器
- 服务客户端连接并执行查询
- 通过 `wsrep hooks` 集成复制功能

### 2. wsrep API

**wsrep API** 是数据库的通用复制插件接口，包含两个主要元素：

- **wsrep Hooks**：集成到数据库引擎，启用写集复制
- **dlopen()**：使 Galera 插件可用

**状态变化流程：**

1. 状态变化（事务）在集群的一个节点上发生
2. `wsrep hooks` 将这些变化转换为写集（write-set）
3. `dlopen()` 使 `wsrep provider` 的函数对 hooks 可用
4. Galera 复制插件处理认证和写集复制
5. 集群中的每个节点将写集作为高优先级事务应用

### 3. Galera Replication Plugin

| 层级 | 描述 |
|------|------|
| **Certification Layer** | 准备写集并执行认证检查，确保无冲突地应用 |
| **Replication Layer** | 管理复制协议，提供事务的全局排序能力 |
| **Group Communication Framework** | 为连接到 Galera Cluster 的各种群组通信系统提供插件架构 |

### 4. Group Communication (GComm) Framework

GComm 系统实现了**虚拟同步服务质量（QoS）**：

- 统一数据传递和集群成员服务
- 保证数据一致性
- 不保证多主操作所需的时间同步

为解决时间同步问题，Galera Cluster 实现了**运行时可配置的流控制**，将节点同步保持在几分之一秒内。

---

## 认证复制机制

### 工作原理

Certification-based replication 使用组通信和事务排序技术实现同步复制。

**关键步骤：**

```
┌────────────┐  COMMIT  ┌────────────┐
│   Node A   │ ───────→  │  生成写集    │
│ (客户端写入)│           │  (Write Set)  │
└──────┬─────┘           └──────┬──────┘
       │                         │
       │ 广播写集                  │ 发送到所有节点
       ↓                         ↓
┌────────────┐              ┌────────────┐
│   Node B   │ ←───────────→ │   Node C   │
│ 认证检查   │               │ 认证检查   │
└──────┬─────┘               └──────┬─────┘
       │                              │
       └──────────→ 全局顺序 ←──────────┘
                           (Global Ordering)
```

### 认证复制要求

数据库必须具备以下特性才能实现认证复制：

1. **事务数据库**：必须能够回滚未提交的更改
2. **原子更改**：事务中的所有操作必须全部执行或全部不执行
3. **全局排序**：所有实例必须按相同顺序应用复制事件

### 认证测试过程

1. **乐观执行**：事务在单个节点上常规执行，直到到达提交点
2. **生成写集**：在 `COMMIT` 时，收集数据库更改和更改行的主键
3. **广播写集**：将写集发送到所有其他节点
4. **认证测试**：每个节点使用主键进行确定性认证测试
5. **应用或回滚**：
   - 认证失败 → 丢弃写集，回滚事务
   - 认证成功 → 提交事务，应用到集群其余部分

### 全局事务 ID (GTID)

**GTID** 用于在所有节点之间保持数据库状态一致：

**格式：**

```
State UUID: Sequence Number
45eec521-2f34-11e0-0800-2a36050b826b:94530586304
```

**组成部分：**

- **State UUID**：数据库状态及其变化序列的唯一标识符
- **Ordinal Sequence Number (seqno)**：表示事务在序列中位置的 64 位有符号整数

---

## 快速开始

### 前置条件

- **至少 3 个节点**：避免脑裂场景
- **Linux 操作系统**：Debian-based 或 RHEL-based 发行版
- **时钟同步**：所有节点配置 NTP
- **SSH 访问**：安装和配置需要 root 或 sudo 权限
- **网络连通性**：节点间可相互通信
- **rsync**：用于状态快照传输（SST）

### 安装步骤

#### 1. 添加 MariaDB 仓库

**Debian/Ubuntu 示例：**

```bash
sudo apt update
sudo apt install dirmngr software-properties-common \
    apt-transport-https ca-certificates curl -y
curl -LsS https://r.mariadb.com/downloads/mariadb_repo_setup | sudo bash
sudo apt update
```

#### 2. 安装 MariaDB 和 Galera

```bash
# MariaDB 10.4+ 或更高版本
sudo apt install mariadb-server mariadb-client galera-4 -y

# 较旧版本（如 10.3）
# sudo apt install mariadb-server mariadb-client galera-3 -y
```

#### 3. 安全配置

```bash
sudo mariadb-secure-installation
```

#### 4. 防火墙配置

```bash
# MySQL 客户端连接
sudo ufw allow 3306/tcp

# Galera 复制（组播和单播）
sudo ufw allow 4567/tcp
sudo ufw allow 4567/udp

# 增量状态传输（IST）
sudo ufw allow 4568/tcp

# 状态快照传输（SST）
sudo ufw allow 4444/tcp

sudo ufw reload
sudo ufw enable
```

#### 5. 配置 Galera Cluster

创建 `/etc/mysql/conf.d/galera.cnf`：

```toml
[mysqld]
# 基本 MariaDB 设置
binlog_format=ROW
default_storage_engine=InnoDB
innodb_autoinc_lock_mode=2
bind-address=0.0.0.0

# Galera Provider 配置
wsrep_on=ON
wsrep_provider=/usr/lib/galera/libgalera_smm.so

# Galera Cluster 配置
wsrep_cluster_name="my_galera_cluster"
wsrep_cluster_address="gcomm://node1_ip,node2_ip,node3_ip"

# 节点特定配置（每个节点不同）
wsrep_node_name="node1"
wsrep_node_address="node1_ip"
```

**重要配置说明：**

- `wsrep_cluster_address`：所有节点 IP 地址的逗号分隔列表
- `wsrep_node_name`：每个节点必须唯一（node1, node2, node3）
- `wsrep_node_address`：此节点自己的 IP 地址

#### 6. 启动集群

**第一个节点（引导启动）：**

```bash
sudo systemctl stop mariadb
sudo galera_new_cluster
# 或：sudo systemctl start mariadb --wsrep-new-cluster
```

**后续节点：**

```bash
sudo systemctl start mariadb
```

### 验证集群

```sql
-- 检查集群大小
SHOW STATUS LIKE 'wsrep_cluster_size';

-- 应显示为 3（或节点数量）
```

**测试复制：**

在 Node 1 上：

```sql
CREATE DATABASE test_db;
USE test_db;
CREATE TABLE messages (id INT AUTO_INCREMENT PRIMARY KEY, text VARCHAR(255));
INSERT INTO messages (text) VALUES ('Hello from node1!');
```

在 Node 2 上验证：

```sql
SHOW DATABASES;  -- test_db 应该出现
USE test_db;
SELECT * FROM messages;  -- 'Hello from node1!' 应该出现
```

---

## 高可用与容灾

### 监控集群

**关键状态变量：**

```sql
-- 集群大小
SHOW STATUS LIKE 'wsrep_cluster_size';

-- 集群状态
SHOW STATUS LIKE 'wsrep_cluster_status';

-- 本地状态
SHOW STATUS LIKE 'wsrep_local_state_comment';

-- 流控制指标
SHOW STATUS LIKE 'wsrep_flow_control%';
```

### 节点状态

| 状态 | 描述 |
|------|------|
| **Joining** | 节点正在加入集群，正在接收状态快照 |
| **Donor/Desynced** | 节点正在向其他节点提供数据 |
| **Joined** | 节点已成功加入集群，正在同步 |
| **Synced** | 节点与集群完全同步，可以接受写入 |
| **Primary Component** | 节点属于主组件（有仲裁的组件） |
| **Non-Primary Component** | 节点不属于主组件（无仲裁） |

### 状态传输机制

#### SST（状态快照传输）

- **用途**：新节点加入或节点离线时间过长时传输完整数据集
- **方法**：`mysqldump`, `rsync`, `mariabackup`, `xtrabackup`
- **特点**：资源密集，会阻塞捐赠节点

**推荐方法：mariabackup**

```bash
wsrep_sst_method=mariabackup
```

非阻塞数据传输，不影响捐赠节点的正常操作。

#### IST（增量状态传输）

- **用途**：节点离线时间短，只传输缺失的更改
- **速度**：比 SST 快得多
- **机制**：使用 GCache（Galera Cache）存储最近的写集

### 仲裁与恢复

**仲裁（Quorum）**是避免脑裂的关键机制：

- 至少需要 **3 个节点**（或任何奇数）才能形成仲裁
- 当节点失去仲裁时，会自动停止接受写入
- 失去仲裁的节点可以通过引导启动重新加入集群

**重置仲裁（紧急情况）：**

```bash
# 在最后退出的节点上
sudo galera_new_cluster
```

---

## 使用场景

### 1. 关键任务应用的高可用性

**适用场景：**

- 金融交易平台：要求立即数据一致性
- 电商和在线零售：确保库存、购物车和订单状态的即时一致性
- 计费和 CRM 系统：24/7 可用的客户数据

**工作原理：**

```
应用 → MariaDB MaxScale → [集群]
                         ├─ Node 1 (Active)
                         ├─ Node 2 (Active)
                         └─ Node 3 (Failed) ← 自动故障转移
```

### 2. 零停机维护

**滚动升级流程：**

```
1. 从代理隔离节点 1
   ↓
2. 停止、修补、重启节点 1
   ↓
3. 节点 1 通过 IST 同步
   ↓
4. 将节点 1 加回代理
   ↓
5. 对节点 2、3 重复上述步骤
```

**优势：**

- 集群始终在线
- 逐个节点维护
- 应用无感知

### 3. 灾难恢复和地理冗余

#### 模式 1：同步 WAN 集群

```
DC 1 (纽约)          DC 2 (伦敦)
┌────────────┐        ┌────────────┐
│  Node 1    │ ←─────→ │  Node 3    │
│  Node 2    │ ←─────→ │             │
└────────────┘        └────────────┘
     ↑                        ↑
  (本地同步)            (WAN 同步)
```

**特点：**

- **RPO = 0**：零数据丢失
- **性能影响大**：写入速度取决于最远数据中心的 RTT
- **适用**：金融等无法容忍数据丢失的应用

#### 模式 2：异步 DR 集群（推荐）

```
DC 1 (主站点)                    DC 2 (灾难恢复)
┌────────────────────┐          ┌────────────┐
│  应用 → MaxScale  │          │  DR 节点   │
│       ↓         │ ─异步→  │  (只读)     │
│   Galera 集群   │          └────────────┘
│   (3 节点)     │
└────────────────────┘
```

**特点：**

- **RPO > 0**：灾难时可能有几秒到几分钟的数据丢失
- **无性能影响**：主集群以本地网络速度运行
- **适用**：大多数可以容忍少量数据丢失的业务

**两种模式对比：**

| 特性 | 同步 WAN 集群 | 异步 DR 集群 |
|------|--------------|-------------|
| 主要目标 | 100% 数据一致性 | 主站点性能 |
| 数据丢失 (RPO) | 零 (RPO=0) | 秒到分钟 (RPO > 0) |
| 性能影响 | 很高。写入速度等于到最远 DC 的 RTT | 无。主集群以本地网络速度运行 |
| 适用场景 | 金融等无法容忍数据丢失的应用 | 大多数可以容忍几秒数据丢失的业务 |

### 4. 读写扩展

#### 读扩展

**优势：**

- 所有节点包含相同数据
- 可以将读查询分布到所有节点
- 适合读密集型应用

#### 写扩展（有限）

**误解了现实：**

| 说法 | 真相 |
|------|------|
| "3 个节点实现 3 倍写吞吐量" | ❌ 错误。每个写必须由所有 3 个节点处理 |
| "读扩展极佳" | ✅ 正确。水平扩展读查询 |
| "写扩展有优势" | ⚠️ 有条件。仅在写入不冲突时 |

#### Read-Write Split 策略（推荐）

```
应用
  ↓
MaxScale (Read/Write Split Router)
  ↓
  ├─→ Node 1 (Primary) ← 所有写入
  ├─→ Node 2 (Replica) ← 读取负载均衡
  └─→ Node 3 (Replica) ← 读取负载均衡
```

**优势：**

- 无应用死锁
- 零认证失败
- 简化应用逻辑
- 获得完整读扩展和自动 HA

**对比表：**

| 策略 | True Multi-Master | Read-Write Split (推荐) |
|------|------------------|---------------------------|
| 工作方式 | 应用向所有节点发送写入 | 代理将 100% 写入发送到一个主节点 |
| 优点 | 所有节点用于写入；无写入入口单点故障 | 无应用死锁。零认证失败。应用简单 |
| 缺点 | 高死锁风险。如果两个客户端在不同节点更新同一行，一个会失败 | 写吞吐量受限于单个节点的处理能力 |
| 适用场景 | 100% 保证无写入冲突的应用 | 99% 的所有应用。获得完整读扩展和自动 HA |

---

## 最佳实践

### 1. 始终使用代理

**原因：**

- 应用不应该知道单个节点的存在
- 代理自动处理故障转移
- 支持读写分离和负载均衡

**推荐代理：**

- **MariaDB MaxScale**：官方推荐，功能丰富
- **ProxySQL**：社区方案，性能优异
- **HAProxy**：简单的 TCP 代理

### 2. 节点数量

**最佳实践：**

- **最少 3 个节点**：仲裁和避免脑裂
- **奇数节点**：3、5、7（便于形成多数）
- **跨数据中心**：每个 DC 至少 2 个节点

### 3. 网络配置

**要求：**

- **低延迟**：节点间延迟 < 10ms 理想
- **高带宽**：充足的网络带宽用于复制流量
- **专用网络**：建议使用内网用于集群通信

### 4. 事务设计

**最佳实践：**

- **保持事务小**：大型 UPDATE 会阻塞集群
- **使用主键**：认证机制依赖主键进行冲突检测
- **避免热点**：多个客户端同时更新同一行会导致死锁
- **处理死锁**：应用必须能重试失败的提交

### 5. 备份策略

**备份类型：**

| 类型 | 方法 | 频率 | 恢复时间 |
|------|------|------|----------|
| 逻辑备份 | mysqldump | 每日 | 较慢 |
| 物理备份 | mariabackup | 每周 | 快 |
| 快照备份 | 文件系统快照 | 按需 | 最快 |

**推荐：**

- 使用 `mariabackup` 进行物理备份
- 从非主节点执行备份（减少影响）
- 定期测试恢复流程

### 6. 监控指标

**关键指标：**

```sql
-- 集群健康
SELECT * FROM performance_schema.global_status
WHERE VARIABLE_NAME LIKE 'wsrep%';

-- 关注：
-- wsrep_cluster_size: 节点数量
-- wsrep_cluster_status: 集群状态
-- wsrep_ready: 节点是否就绪
-- wsrep_connected: 是否连接到集群
```

---

## 性能调优

### 流控制

**目的：**保持节点同步在几分之一秒内

**关键变量：**

```sql
-- 流控制暂停（节点复制太快）
wsrep_flow_control_paused

-- 已发送但未确认的字节
wsrep_flow_control_sent

-- 最小复制延迟阈值
wsrep_slave_threads
```

**调优建议：**

- 增加 `wsrep_slave_threads` 以提升复制吞吐量
- 监控 `wsrep_flow_control_paused`，频繁暂停表示瓶颈

### 大型事务处理

**问题：**大型事务会阻塞集群

**解决方案：**

1. **拆分事务**：将大型 UPDATE 分解为多个小事务
2. **流式复制**
3. **批量插入优化**：使用 `LOAD DATA INFILE` 或批量 INSERT

### GCache 配置

**GCache**（Galera Cache）用于存储最近的写集：

```sql
-- GCache 大小
wsrep_provider_options="gcache.size=2G"

-- GCache 位置
wsrep_provider_options="gcache.name=/var/lib/mysql/galera"
```

**最佳实践：**

- 大小 = 预期离线时间 × 平均写入速率
- 定期监控磁盘空间
- 使用 SSD 提升性能

### InnoDB 调优

```sql
-- 与其他 MySQL/MariaDB 调优相同：

-- 缓冲池大小（约为物理内存的 70-80%）
innodb_buffer_pool_size=4G

-- 日志文件大小
innodb_log_file_size=512M

-- 并间事务数
innodb_thread_concurrency=0

-- I/O 容量
innodb_io_capacity=2000
innodb_io_capacity_max=4000
innodb_flush_method=O_DIRECT
```

### 连接数调优

```sql
-- 最大连接数
max_connections=500

-- 连接线程缓存
thread_cache_size=100

-- 表缓存
table_open_cache=4000

-- 表定义缓存
table_definition_cache=2000
```

---

## 故障排查

### 常见问题

#### 1. 节点无法加入集群

**检查：**

- 防火墙端口是否开放
- `wsrep_cluster_address` 是否正确
- 节点间网络连通性
- 时钟是否同步

**调试：**

```sql
SHOW STATUS LIKE 'wsrep%';
```

#### 2. 频繁的流控制暂停

**原因：**

- 网络延迟过高
- 某个节点性能不足
- 大型事务阻塞

**解决：**

- 升级硬件
- 优化事务大小
- 增加 `wsrep_slave_threads`

#### 3. 脑裂场景

**症状：**

- 集群分为两个独立的部分
- 每个部分都认为自己是主组件

**预防：**

- 确保至少 3 个节点
- 使用稳定的网络连接
- 配置仲裁机制

**恢复：**

```bash
# 在网络恢复后，在多数节点上
sudo galera_new_cluster
```

#### 4. SST 失败

**原因：**

- 磁盘空间不足
- 权限问题
- 网络问题

**解决：**

- 检查磁盘空间
- 验证 `wsrep_sst_method` 配置
- 检查日志：`/var/log/mysql/error.log`

---

## 参考资源

### 官方文档

- [MariaDB Galera 官方文档](https://mariadb.com/docs/galera-cluster)
- [Getting Started](https://mariadb.com/docs/galera-cluster/galera-management/installation-and-deployment/getting-started-with-mariadb-galera-cluster)
- [配置指南](https://mariadb.com/docs/galera-cluster/galera-management/configuration/configuring-mariadb-galera-cluster)

### 社区资源

- [Codership: Using Galera Cluster](https://codership.com/content/using-galera-cluster)
- [Galera Cluster Tutorial](https://galeracluster.com/documentation/)

### 视频教程

- [MariaDB Galera 和 M/S 复制](https://www.youtube.com/watch?v=Nd0nvltLPdQ)

---

## 总结

MariaDB Galera Cluster 是一个强大的高可用数据库解决方案，适合：

- ✅ 需要高可用性的关键任务应用
- ✅ 要求零数据丢失的金融类系统
- ✅ 需要零停机维护的持续运营环境
- ✅ 需要读写扩展的 Web 应用

**核心优势：**

- 同步复制确保强一致性
- 多主架构提供读写扩展
- 自动故障转移简化运维
- 无单点故障

**注意事项：**

- 网络延迟会影响性能
- 大型事务可能引起问题
- 需要至少 3 个节点
- 应用必须处理可能的死锁

通过合理设计架构和优化配置，Galera Cluster 可以为企业级应用提供可靠的高性能数据库服务。
