---
title: Ceph RBD iSCSI Gateway 总结
date: 2026-03-19
tags: [Ceph, 存储, iSCSI, RBD]
categories: 技术
---

# Ceph RBD iSCSI Gateway 总结

## 概述

Ceph iSCSI Gateway 提供了高可用的 iSCSI target 服务，将 RADOS 块设备（RBD）导出为 SCSI 磁盘供客户端使用。

iSCSI 协议允许客户端（initiator）通过 TCP/IP 网络发送 SCSI 命令到存储设备，使得**没有原生 Ceph 客户端支持**的系统也能访问 Ceph 块存储。

## 架构

每个 iSCSI gateway 利用 Linux IO target 内核子系统（LIO）提供 iSCSI 协议支持：

- LIO 通过用户空间透传（TCMU）与 Ceph 的 librbd 库交互
- 将 RBD 镜像暴露给 iSCSI 客户端
- 可以构建完整的融合块存储基础设施，拥有传统 SAN 存储的所有特性和优势

> ⚠️ **重要提醒**：自 2022 年 11 月起，iSCSI gateway 进入维护模式，不再活跃开发，也不会添加新功能。

## 目录

- [Requirements](#requirements) - 环境要求
- [Configuring the iSCSI Targets](#configuring-the-iscsi-targets) - 配置 Target
- [Configuring the iSCSI Initiators](#configuring-the-iscsi-initiators) - 配置 Initiator
- [Monitoring the iSCSI Gateways](#monitoring-the-iscsi-gateways) - 监控

---

## Requirements {#requirements}

### 节点数量建议

建议部署 **2-4 个** iSCSI gateway 节点，以实现高可用。

### 内存规划

内存占用取决于映射的 RBD 镜像数量，可能会增长到很大。需要根据映射镜像数量规划足够的内存。

### Ceph 配置建议

对 Ceph Monitor 和 OSD 没有特殊要求，但建议调低 OSD 默认心跳间隔，减少 initiator 超时的可能性：

```ini
[osd]
osd heartbeat grace = 20
osd heartbeat interval = 5
```

生效方式：

```bash
# 在 monitor 节点更新运行状态
ceph tell osd.* config set osd_heartbeat_grace 20
ceph tell osd.* config set osd_heartbeat_interval 5

# 在每个 OSD 节点更新
ceph daemon osd.0 config set osd_heartbeat_grace 20
ceph daemon osd.0 config set osd_heartbeat_interval 5
```

更多配置细节参考 [Configuring Ceph](https://docs.ceph.com/en/pacific/rados/configuration/ceph-conf/)。

---

## Configuring the iSCSI Targets {#configuring-the-iscsi-targets}

### 前置要求

- Red Hat Enterprise Linux/CentOS 7.5 或更新；Linux 内核 v4.16 或更新
- 可工作的 Ceph 存储集群，可以通过 ceph-ansible 或命令行部署
- iSCSI gateway 节点，可以与 OSD 节点共置也可以独立部署
- iSCSI 前端流量和 Ceph 后端流量建议分开不同网段

### 部署方式

支持两种安装配置方式：

1. **[Using Ansible](https://docs.ceph.com/en/pacific/rbd/iscsi-target-ansible/)** - 推荐，自动化部署
2. **[Using the Command Line Interface](https://docs.ceph.com/en/pacific/rbd/iscsi-target-cli/)** - 手动部署

---

## Configuring the iSCSI Initiators {#configuring-the-iscsi-initiators}

针对不同操作系统/平台有详细配置指南：

- [iSCSI Initiator for Linux](https://docs.ceph.com/en/pacific/rbd/iscsi-initiator-linux/)
- [iSCSI Initiator for Microsoft Windows](https://docs.ceph.com/en/pacific/rbd/iscsi-initiator-win/)
- [iSCSI Initiator for VMware ESX](https://docs.ceph.com/en/pacific/rbd/iscsi-initiator-esx/)

> ⚠️ **限制**：通过多个 iSCSI gateway 导出同一个 RBD 镜像时，不支持使用 SCSI 持久组预留（PGR）和 SCSI 2 预留。

---

## Monitoring the iSCSI Gateways {#monitoring-the-iscsi-gateways}

Ceph 提供 `gwtop` 工具监控 iSCSI gateway 性能，类似于 `top` 命令，显示导出 RBD 镜像的聚合性能指标。

### 架构

性能指标来自 Performance Metrics Domain Agent (PMDA)，利用 Linux-IO target (LIO) PMDA 信息列出：

- 每个导出的 RBD 镜像
- 连接的客户端
- 相关 I/O 指标

### 安装步骤

```bash
# 在每个 iSCSI gateway 节点上以 root 安装
yum install ceph-iscsi-tools
yum install pcp
yum install pcp-pmda-lio

# 启用并启动 performance co-pilot 服务
systemctl enable pmcd
systemctl start pmcd

# 注册 pcp-pmda-lio agent
cd /var/lib/pcp/pmdas/lio
./Install
```

### 使用方式

默认情况下，`gwtop` 假设 iSCSI gateway 配置保存在 `rbd` 池的 `gateway.conf` RADOS 对象中。可以通过 `-g` 或 `-c` 参数覆盖，详见 `gwtop --help`。

### 输出示例

```
gwtop 2/2 Gateways CPU% MIN: 4 MAX: 5 Network Total In: 2M Out: 3M 10:20:00
Capacity: 8G Disks: 8 IOPS: 503 Clients: 1 Ceph: HEALTH_OK OSDs: 3
Pool.Image Src Size iops rMB/s wMB/s Client
iscsi.t1703 500M 0 0.00 0.00
iscsi.testme1 500M 0 0.00 0.00
iscsi.testme2 500M 0 0.00 0.00
iscsi.testme3 500M 0 0.00 0.00
iscsi.testme5 500M 0 0.00 0.00
rbd.myhost_1 T 4G 504 1.95 0.00 rh460p(CON)
rbd.test_2 1G 0 0.00 0.00
rbd.testme 500M 0 0.00 0.00
```

**Client 列说明**：
- `(CON)` 表示 iSCSI initiator（客户端）当前已登录到 iSCSI gateway
- `-multi-` 表示多个客户端映射到同一个 RBD 镜像

---

## 总结

Ceph iSCSI Gateway 是一个让非 Ceph 客户端接入 Ceph 块存储的成熟方案，虽然目前进入维护模式，但依然适用于：

- 需要传统 SAN 存储体验的场景
- 不能直接部署 Ceph 客户端的老旧系统
- 混合存储架构整合

主要优点：

✅ 支持高可用部署  
✅ 与 Ceph 深度集成  
✅ 提供监控工具  
✅ 标准 iSCSI 协议支持多平台

---

*本文基于 [Ceph Pacific 文档](https://docs.ceph.com/en/pacific/rbd/iscsi-overview/) 整理*
