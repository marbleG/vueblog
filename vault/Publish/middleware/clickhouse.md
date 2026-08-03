---
title: "ClickHouse 笔记（含 SQL 速查）"
publish: true
created: 2026-08-03
tags: [已发布, 中间件, clickhouse, 数据库, sql]
---

# ClickHouse 笔记

> 列式分析型数据库（OLAP），适合海量数据的实时聚合查询。本文含 SQL 速查章节，可直接复制使用。

## 定位与适用场景

- **是什么**：开源列式存储 MPP 数据库，面向**写入多、查询以聚合为主**的分析负载。
- **适合**：日志/事件分析、时序指标、用户行为、报表大宽表、ad-hoc 即席分析。
- **不适合**：高并发点查/事务（OLTP）、频繁单行更新删除、强一致跨行事务。把它当作"分析存储"，而不是业务主库。
- **与中间件的关系**：它常作为数据栈的**分析层**——上游 Kafka / Flink / 业务库通过写入管道汇入 ClickHouse，应用侧做 OLAP 查询。本身不是消息或代理类中间件。

## 核心概念

- **引擎（Engine）**：表的行为由引擎决定，90% 场景用 `MergeTree` 家族。
- **主键 ≠ 唯一约束**：`ORDER BY` 是排序键（用于跳扫 / 稀疏索引），**不保证唯一**，也不做去重。
- **分区（PARTITION BY）**：通常按月 `toYYYYMM(date)`，用于后台合并与按分区删除/归档；分区过多会拖慢启动。
- **副本（Replicated）**：靠 `ReplicatedMergeTree` + ZooKeeper/Keeper 实现；`Distributed` 表做跨分片查询路由。
- **物化视图**：写入时自动聚合到目标表，是"预计算加速"的核心手段。

## 快速上手

```bash
# 客户端连接
clickhouse-client --host 127.0.0.1 --port 9000 --user default

# HTTP 接口（便于脚本/跨语言）
curl 'http://127.0.0.1:8123/?query=SELECT+1'
echo 'SELECT 1' | curl 'http://127.0.0.1:8123/' --data-binary @-

# 看正在跑的查询
clickhouse-client --query "SELECT query_id, query, elapsed FROM system.processes"
```

---

## SQL 速查

> 可直接复制的常用片段。占位符用 `<...>` 表示。

### 建库 / 建表（引擎与分区）

```sql
CREATE DATABASE IF NOT EXISTS analytics;

-- 标准 MergeTree：最常用
CREATE TABLE analytics.events
(
    event_date   Date,
    event_time   DateTime,
    user_id      UInt64,
    event_type   LowCardinality(String),   -- 低基数字符串，省空间
    amount       Float64,
    props        String
)
ENGINE = MergeTree
PARTITION BY toYYYYMM(event_date)          -- 按月分区
ORDER BY (event_type, user_id, event_time) -- 排序/跳扫键，不是唯一约束
TTL event_date + INTERVAL 90 DAY;          -- 自动过期清理
```

**引擎选择速记**

| 引擎 | 用途 |
|------|------|
| `MergeTree` | 通用基线 |
| `ReplicatedMergeTree` | 同上加副本（需 Keeper） |
| `ReplacingMergeTree` | 按版本保留最新行（最终一致去重） |
| `SummingMergeTree` | 相同键自动 sum 预聚合 |
| `AggregatingMergeTree` | 配合 `-State/-Merge` 做复杂预聚合 |
| `CollapsingMergeTree` / `VersionedCollapsingMergeTree` | 行级"正负抵消"更新 |
| `Distributed` | 跨分片查询代理（本身不存数据） |

### 数据类型

```sql
-- 整型
UInt8 / UInt16 / UInt32 / UInt64   Int8 / Int16 / Int32 / Int64
-- 浮点 / 精确小数
Float32 / Float64                  Decimal(18, 2)
-- 字符串
String  FixedString(N)  LowCardinality(String)   -- 低基数用 LowCardinality 更省更快
-- 时间
Date  DateTime  DateTime64(3)       -- DateTime64(3) = 毫秒精度
-- 枚举 / UUID
Enum8('a' = 1, 'b' = 2)  UUID
-- 复合
Array(T)  Nullable(T)  Tuple(...)  Map(String, String)
-- JSON（新引擎原生类型，22+ 推荐）
JSON
```

> 经验：能用 `LowCardinality(String)` 就别裸 `String`；别滥用 `Nullable`（会拖慢、且聚合需注意 `NULL`）。

### 写入（INSERT）

```sql
-- 显式值
INSERT INTO analytics.events
    (event_date, event_time, user_id, event_type, amount, props)
VALUES
    ('2026-08-03', now(), 1001, 'click', 0.0, '{}');

-- 从查询结果写入（ETL / 物化）
INSERT INTO analytics.events_daily
SELECT event_date, event_type, count() AS cnt, sum(amount) AS amt
FROM analytics.events
WHERE event_date = today()
GROUP BY event_date, event_type;
```

> ClickHouse 写入建议**批量、少事务**：一次插几万行比逐行插快几个数量级。避免单行 INSERT。

### 查询：聚合与常用函数

```sql
-- 基础聚合
SELECT
    event_type,
    count()                 AS pv,
    uniqExact(user_id)      AS uv,           -- 精确去重（慢）；大数据用 uniq()
    sum(amount)             AS total,
    avg(amount)             AS avg_amt,
    quantile(0.95)(amount)  AS p95_amt       -- 分位数
FROM analytics.events
WHERE event_date >= today() - 7
GROUP BY event_type
ORDER BY pv DESC;

-- 条件取值
SELECT
    multiIf(amount > 100, '大', amount > 10, '中', '小') AS tier,
    count() AS cnt
FROM analytics.events
GROUP BY tier;

-- 时间窗口
SELECT
    toStartOfDay(event_time) AS day,
    toYYYYMM(event_date)     AS month,
    count() AS cnt
FROM analytics.events
GROUP BY day, month
ORDER BY day;
```

**数组 / JSON 常用**

```sql
-- 展开数组为行
SELECT arrayJoin([1,2,3]) AS x;

-- 聚合为数组（保留明细）
SELECT user_id, groupArray(event_type) AS types
FROM analytics.events
GROUP BY user_id;

-- 数组变换 / 判断
SELECT arrayMap(x -> x * 2, [1,2,3]) AS doubled;   -- [2,4,6]
SELECT has([1,2,3], 2) AS has_two;                 -- 1

-- JSON（旧写法，仍兼容）：从 String 取字段
SELECT JSONExtractString(props, 'campaign') AS campaign
FROM analytics.events;

-- JSON（新写法，原生 JSON 类型直接取）
SELECT props.campaign
FROM analytics.events;
```

### JOIN

```sql
-- USING 等值连接（最常见）
SELECT e.user_id, e.event_type, u.name
FROM analytics.events AS e
INNER JOIN dim.users AS u USING (user_id);

-- 注意：右表默认整体载入内存。大表 JOIN 大表要谨慎，可调：
--   join_algorithm = 'hash'（默认）/ 'grace_hash' / 'full_sorting_merge'
SETTINGS join_algorithm = 'grace_hash';
```

> 坑：ClickHouse 的 JOIN 没有传统数据库的"驱动表索引"概念，右表进内存。超大维度表先把维度做成 `Dictionary` 或用 `join_algorithm='grace_hash'`。

### 系统表（排查与运维）

```sql
-- 分区 / part 信息（行数、字节、是否未合并）
SELECT partition, name, rows, bytes_on_disk, active
FROM system.parts
WHERE database = 'analytics' AND table = 'events'
ORDER BY modification_time DESC;

-- 慢查询（查日志表）
SELECT
    query_duration_ms,
    read_rows,
    memory_usage,
    query
FROM system.query_log
WHERE event_date = today()
  AND type = 'QueryFinish'
  AND query_duration_ms > 1000
ORDER BY query_duration_ms DESC
LIMIT 20;

-- 正在合并 / 正在执行的任务
SELECT * FROM system.merges WHERE database = 'analytics';
SELECT query_id, query, elapsed, memory_usage
FROM system.processes
ORDER BY elapsed DESC;

-- 表占用
SELECT table, sum(rows) AS rows, formatReadableSize(sum(bytes_on_disk)) AS size
FROM system.parts
WHERE active
GROUP BY table
ORDER BY rows DESC;
```

### 性能与排查设置

```sql
-- 单次查询限制（防爆内存）
SET max_memory_usage = 10000000000;     -- 10 GB
SET max_threads = 8;                    -- 并行度
SET use_uncompressed_cache = 1;

-- 看执行计划（找是否用到跳扫 / 是否全表扫）
EXPLAIN PIPELINE
SELECT count() FROM analytics.events
WHERE event_date = '2026-08-03' AND event_type = 'click';

-- 看 AST / 优化
EXPLAIN AST SELECT ... ;

-- 强制走某分区（分区裁剪验证）
SELECT count() FROM analytics.events
WHERE event_date = '2026-08-03';         -- 应只扫该月分区
```

**加速三板斧**：① 选对 `ORDER BY`（把高频过滤列放前面，利用跳扫）；② 按时间 `PARTITION BY`；③ 大聚合用 `Summing/AggregatingMergeTree` 物化视图预计算。

### 分区维护

```sql
-- 删分区（比 DELETE 快得多，直接落盘删除）
ALTER TABLE analytics.events DROP PARTITION '202601';

-- 手动触发合并
OPTIMIZE TABLE analytics.events FINAL;

-- 改 TTL / 加列
ALTER TABLE analytics.events MODIFY TTL event_date + INTERVAL 180 DAY;
ALTER TABLE analytics.events ADD COLUMN IF NOT EXISTS device LowCardinality(String);
```

> 优先用 `DROP PARTITION` / `TTL` 做清理，不要 `DELETE FROM`——后者是 mutation，重且慢。

---

## 常见陷阱

- ⚠️ 把 ClickHouse 当 MySQL 用：频繁 `UPDATE/DELETE`、单行插入、点查，性能灾难。
- ⚠️ `ORDER BY` 设错：把高基数随机列（如 user_id）放最前会导致跳扫失效、part 膨胀。
- ⚠️ 分区过细（按天甚至小时）且数据量小：part 数爆炸，启动和合并变慢。
- ⚠️ `Nullable` 滥用：聚合时 `NULL` 传播、`count()` 不计 NULL，易踩坑。

## 参考

- 官方文档：https://clickhouse.com/docs
- 中文社区 / 博客（如《ClickHouse 原理解析》相关）
- 系统表清单：`system.*`（本文已列最常用的 parts / query_log / merges / processes）
