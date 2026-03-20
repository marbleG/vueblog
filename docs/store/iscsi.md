---
title: iSCSI 协议基础介绍
date: 2026-03-20
tags: [存储, iSCSI, 网络存储]
categories: 技术
---

# iSCSI 协议基础介绍

## 什么是 iSCSI

iSCSI（Internet Small Computer Systems Interface，互联网小型计算机系统接口）是一种基于 TCP/IP 的协议，用于将 SCSI 块存储命令通过网络传输，让服务器可以使用网络上的远程磁盘就像使用本地磁盘一样。

**核心概念：**
- **Initiator（发起端）**: 客户端，请求使用远程存储资源
- **Target（目标端）**: 服务端，提供存储资源共享
- **LUN（Logical Unit Number）**: 逻辑单元号，标识 Target 上的具体存储设备

## 工作原理

1. **iSCSI Initiator** 在客户端发起 SCSI 命令
2. 命令被封装在 iSCSI 数据包中，通过 TCP/IP 网络传输
3. **iSCSI Target** 在服务端接收数据包，解析出 SCSI 命令
4. Target 执行命令操作本地存储（如 Ceph RBD、本地磁盘）
5. 结果原路返回给 Initiator
6. 客户端内核将其挂载为块设备，应用程序可以像使用本地磁盘一样使用

## 典型架构

```
+----------------+         TCP/IP Network         +----------------+
|                |                               |                |
|  iSCSI Initiator|  ------------------------->  |  iSCSI Target   |
|   (Client)     |                               |   (Server)      |
|                |  <-------------------------  |                |
+----------------+                               +----------------+
```

**使用场景：**
- 服务器不需要本地存储，统一从存储集群挂载
- 传统SAN存储的IP化替代方案（FC SAN → IP SAN）
- 让不支持原生存储客户端的系统接入分布式存储（如Ceph）

## iSCSI 与 Ceph RBD 的关系

Ceph 提供 **iSCSI Gateway** 服务，可以将 RBD 块设备通过 iSCSI 协议导出给客户端使用：

- 优势：客户端不需要安装 Ceph 客户端，只要支持 iSCSI 就能接入
- 限制：iSCSI Gateway 目前进入维护模式，不再活跃开发
- 适用场景：老旧系统接入 Ceph 存储、需要传统块存储体验的场景

相关文章：[Ceph RBD iSCSI Gateway 总结](./ceph-rbd-iscsi-overview.md)

---

## 常用命令实践

### Linux Initiator 常用命令

```bash
# 安装 iscsi-initiator
yum install iscsi-initiator-utils   # CentOS/RHEL
apt install open-iscsi               # Ubuntu/Debian

# 发现 Target
iscsiadm -m discovery -t sendtargets -p <target_ip>:3260

# 查看已发现的 Target
iscsiadm -m node

# 登录 Target
iscsiadm -m node -T <iqn-name> -p <target_ip>:3260 --login

# 查看已登录的会话
iscsiadm -m session

# 退出登录
iscsiadm -m node -T <iqn-name> -p <target_ip>:3260 --logout

# 重启 iscsid 服务
systemctl restart iscsid
```

### 查看挂载后的设备

```bash
# 登录后会在 /dev 下生成对应磁盘设备
lsblk
fdisk -l

# 分区、格式化、挂载
fdisk /dev/sdX
mkfs.xfs /dev/sdX1
mount /dev/sdX1 /data
```

### 配置文件说明

**`/etc/iscsi/initiatorname.iscsi`** - Initiator 名称配置（必须，每个节点唯一）
```ini
# 这个文件包含 Initiator 的 IQN 名称，必须唯一
InitiatorName=iqn.1994-05.com.redhat:your-unique-host-id
```

**`/etc/iscsi/iscsi.conf`** - Initiator 主配置
```ini
# 发现超时时间
discovery_timeout = 10

# 连接超时时间
conn_timeout = 30

# 是否自动登录发现的 Target
node.startup = automatic
```

## 关键配置参数说明

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `node.startup` | 是否自动启动登录 | `manual`，建议改为 `automatic` |
| `discovery.sendtargets.address` | Target 发现地址 | - |
| `conn_timeout` | 连接超时秒数 | 30 |
| `discovery_timeout` | 发现超时秒数 | 10 |

---

## 总结

iSCSI 是一种成熟的 IP SAN 协议，它：
- ✅ 基于标准 TCP/IP，不需要特殊硬件
- ✅ 支持多平台，几乎所有操作系统都有 Initiator 实现
- ✅ 让远程块设备像本地磁盘一样使用
- ✅ 可以和 Ceph 等分布式存储结合，提供兼容传统环境的接入方式

至今仍是混合存储架构中重要的一环。
