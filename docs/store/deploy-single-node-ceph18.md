# 单节点部署 Ceph 18 (Reef) 集群完整指南

Ceph 18（代号 Reef）是 Ceph 目前的稳定版本，本文介绍使用官方推荐的 `cephadm` 工具在单节点上部署 Ceph 集群。

> **注意**：单节点集群适合测试、开发和学习使用，不推荐用于生产环境（无高可用）。

## 一、环境要求

- Python 3.6+
- Systemd
- Podman 或 Docker（运行容器）
- 时间同步（Chrony 或 ntpd）
- LVM2（用于存储设备分区）
- 一块空闲磁盘用于 Ceph OSD（数据存储）

## 二、安装 cephadm

### 方式一：curl 方式安装（推荐）

指定要安装的 Ceph 版本，这里我们安装 18.2.x 稳定版：

```bash
# 下载 cephadm
CEPH_RELEASE=18.2.1
curl --silent --remote-name --location https://download.ceph.com/rpm-${CEPH_RELEASE}/el9/noarch/cephadm

# 添加执行权限
chmod +x cephadm

# 添加 Ceph 仓库并安装到系统
./cephadm add-repo --release reef
./cephadm install

# 验证安装
which cephadm
# 输出应为 /usr/sbin/cephadm
```

### 方式二：发行版包安装

不同发行版可以直接通过包管理器安装：

**CentOS Stream：**
```bash
dnf search release-ceph
dnf install -y centos-release-ceph-reef
dnf install -y cephadm
```

**Ubuntu：**
```bash
apt install -y cephadm
```

**Fedora：**
```bash
dnf -y install cephadm
```

## 三、Bootstrap 单节点集群

### 3.1 获取本机 IP

首先确定本机 IP 地址，Ceph Monitor 将监听在此地址：

```bash
ip addr show
# 记录你的 IP 地址，比如 192.168.1.100
```

### 3.2 执行 Bootstrap

对于单节点部署，官方提供了 `--single-host-defaults` 参数自动调整配置：

```bash
cephadm bootstrap --mon-ip <你的机器IP> --single-host-defaults
```

这个命令会：

- 在当前节点创建第一个 Monitor (mon) 和 Manager (mgr) 守护进程
- 生成 SSH 密钥并添加到 root 的 `~/.ssh/authorized_keys`
- 将公钥写入 `/etc/ceph/ceph.pub`
- 生成最小配置文件 `/etc/ceph/ceph.conf`
- 生成客户端管理员密钥 `/etc/ceph/ceph.client.admin.keyring`
- 给当前节点打上 `_admin` 标签

`--single-host-defaults` 会自动设置：
- `osd_crush_chooseleaf_type = 0`：CRUSH 选址算法调整
- `osd_pool_default_size = 2`：副本数默认为 2（单节点只能放 1 副本）
- `mgr_standby_modules = False`：关闭 MGR 备用模块

### 3.3 查看输出

执行成功后，你会看到类似输出：

```
Ceph Cluster fsid: xxx-xxx-xxx-xxx
Dashboard URL: https://<IP>:8443/
Username: admin
Password: xxx
```

保存好 Dashboard 的用户名和密码。

## 四、启用 Ceph CLI

Cephadm 本身不需要在主机安装 Ceph 包，但推荐安装 CLI 工具方便管理：

```bash
# 添加仓库并安装 ceph-common
cephadm add-repo --release reef
cephadm install ceph-common

# 验证
ceph -v
ceph status
```

验证集群状态：

```bash
$ ceph -s
  cluster:
    id:     xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
    health: HEALTH_WARN
            1 pool(s) have no replicas configured
  services:
    mon: 1 daemons, quorum <hostname> (age 10m)
    mgr: <hostname>(active, since 10m), standbys: none
    osd: 0 osds: 0 up, 0 in
  data:
    pools:   1 pool, 0 pgs
    objects: 0 objects, 0 B
    usage:   0 kB used, 0 B / 0 B avail
    pgs:
```

可以看到目前 mon 和 mgr 已经运行，但还没有 OSD（数据存储）。

## 五、添加存储设备

### 5.1 查看可用设备

```bash
# 列出所有可用设备
lsblk
```

找到你闲置的那块磁盘（例如 `/dev/sdb`），确保没有分区和挂载。

### 5.2 让 Ceph 自动使用所有可用设备

```bash
ceph orch apply osd --all-available-devices
```

这个命令会让 Ceph 自动发现并使用所有未挂载的空闲设备创建 OSD。

### 5.3 检查 OSD 状态

等待几分钟后，查看 OSD 状态：

```bash
$ ceph osd tree
ID  CLASS  WEIGHT   TYPE NAME       STATUS  REWEIGHT  PRI-AFF
-1         0.99999 root                     default   1.00000
-3         0.99999     rack 0
-5         0.99999         host 0
 0   ssd 0.99999             osd.0       up   1.00000  1.00000

$ ceph -s
  cluster:
    id:     xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
    health: HEALTH_OK

  services:
    mon: 1 daemons, quorum node1 (age 5m)
    mgr: node1(active, since 5m)
    osd: 1 osds: 1 up (since 3m), 1 in (since 3m)

  data:
    pools:   1 pool, 64 pgs
    objects: 0 objects, 0 B
    usage:   1.0 GiB used, 99 GiB / 100 GiB avail
    pgs:     64 active+clean
```

现在集群状态应该是 HEALTH_OK 了。

## 六、内存调优（可选）

如果你的节点内存不大，并且 Ceph 和其他应用共享主机，可以调整 OSD 内存自动调优比例：

```bash
# 收敛模式，只占用 20% 总内存
ceph config set mgr mgr/cephadm/autotune_memory_target_ratio 0.2
ceph config set osd osd_memory_target_autotune true
```

默认是 0.7（如果节点专门运行 Ceph 可以保留默认）。

## 七、访问 Dashboard

打开浏览器访问 `https://<你的IP>:8443/`，使用 bootstrap 输出的用户名和密码登录即可。

如果你忘记了密码，可以重置：

```bash
ceph dashboard ac-login-remove-password
ceph dashboard ac-user-set-password admin <new-password>
```

## 八、创建存储池

对于单节点，建议设置副本数为 1：

```bash
# 创建存储池
ceph osd pool create mypool 64
ceph osd pool set mypool size 1
```

如果需要使用 RBD（块存储）：

```bash
rbd pool init mypool
```

## 九、常见问题

### 1. 健康警告 `HEALTH_WARN 1 pool(s) have no replicas configured`

这是正常的，单节点无法放多副本，所以会有这个警告，可以忽略。

### 2. 为什么没有 MGR 备节点

单节点部署，只有一个节点，不需要备节点，`--single-host-defaults` 已经自动关闭了。

### 3. Podman 兼容性问题

不是所有 Podman 版本都兼容 Ceph 18，官方有兼容性表格，详见：[Cephadm Compatibility with Podman Versions](https://docs.ceph.com/en/latest/cephadm/compatibility/)

如果遇到问题，改用 Docker 运行即可。

## 十、总结

使用 `cephadm` 部署单节点 Ceph 18 非常简单，主要步骤：

1. 安装 `cephadm`
2. `cephadm bootstrap --mon-ip <IP> --single-host-defaults`
3. 安装 `ceph-common` 获取 CLI 工具
4. `ceph orch apply osd --all-available-devices` 自动添加存储
5. 访问 Dashboard 开始使用

完整的单节点集群适合：

- 学习和测试 Ceph
- 小型开发环境
- 个人存储服务器

## 参考资料

- [官方文档 - Using Cephadm to Deploy a New Ceph Cluster](https://docs.ceph.com/en/latest/cephadm/install/)
- [官方文档 - Single Node Deployment](https://docs.ceph.com/en/latest/cephadm/install/#single-host)
- [Ceph 18.x Release Notes](https://docs.ceph.com/en/latest/releases/reef/)
