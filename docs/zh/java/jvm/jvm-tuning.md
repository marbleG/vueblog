# JVM 调优

## 常用启动参数

### 堆内存参数

```bash
# 初始堆大小
-Xms<size>
# 最大堆大小
-Xmx<size>
```

**生产建议**：`-Xms` 和 `-Xmx` 设置为相同值，避免 GC 后堆扩容收缩带来的开销。

示例：
```bash
-Xms4g -Xmx4g
```

### 新生代参数

```bash
# 新生代大小
-Xmn<size>
```

**比例关系**：
- 默认新生代和老年代比例：1:2
- 可以通过 `-XX:NewRatio=N` 设置（新生代:老年代 = 1:N）
- `-XX:SurvivorRatio=N` 设置 Eden 和一个 Survivor 比例，默认 8:1

### 元空间参数

```bash
# 元空间初始大小
-XX:MetaspaceSize=256m
# 元空间最大大小，默认不限制
-XX:MaxMetaspaceSize=512m
```

### 垃圾回收器选择

```bash
# JDK 8 默认：Parallel Scavenge + Parallel Old
-XX:+UseParallelGC

# CMS：ParNew + CMS
-XX:+UseConcMarkSweepGC

# JDK 9+ 默认：G1
-XX:+UseG1GC

# JDK 11+ ZGC
-XX:+UseZGC
```

### GC 日志参数

```bash
# 输出 GC 日志
-XX:+PrintGCDetails
-XX:+PrintGCDateStamps
# GC 日志文件
-Xloggc:/path/to/gc.log
# 日志文件轮换
-XX:+UseGCLogFileRotation
-XX:NumberOfGCLogFiles=5
-XX:GCLogFileSize=100m
```

JDK 9+ 使用新的统一日志语法：
```bash
-Xlog:gc*:file=/path/to/gc.log:time,uptime:filecount=5,filesize=100m
```

## GC 日志分析

GC 日志关键指标：

1. **YGC 次数** / **YGC 平均耗时**：YGC 应该频繁但耗时很短，正常几十毫秒以内
2. **FGC 次数** / **FGC 平均耗时**：FGC 次数应该很少，通常几秒以内，且不应该越来越频繁
3. **堆内存使用**：GC 后堆内存应该稳定增长，不应该持续增长（否则可能内存泄漏）
4. **停顿时间**：ZGC 通常 < 10ms，G1 通常 < 200ms，Parallel 可能几百毫秒

## 内存泄漏排查流程

1. **观察 FGC 频率**：FGC 越来越频繁，GC 后内存仍然占比很高，大概率内存泄漏
2. **导出堆内存快照**：
   ```bash
   jmap -dump:format=b,file=heap.bin <pid>
   # 或者开启 OOM 时自动导出
   -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/tmp/heap.bin
   ```
3. **使用分析工具**：
   - Eclipse MAT
   - JProfiler
   - YourKit
4. **定位大对象**：找到哪个类占据了最多内存，找到引用链，定位泄漏点

**常见内存泄漏原因**：
- 静态集合类不断添加元素不清理
- 集合中的对象引用过期不清理
- 内部类持有外部类引用
- 未关闭的流、连接、ResultSet 等
- 缓存没有过期策略

## 调优目标

1. **低延迟应用**（如 Web 服务）：目标是最小化 STW 停顿时间，选择 G1 或 ZGC
2. **吞吐量优先应用**（如批处理）：目标是最大化吞吐量，选择 Parallel
3. **大堆应用**（> 32G）：ZGC 优势明显，停顿不随堆大小增长

## 通用调优步骤

1. **明确目标**：你要解决什么问题？停顿太长？FGC 太频繁？OOM？吞吐量不够？
2. **收集数据**：开启 GC 日志，获取系统运行数据
3. **分析问题**：根据 GC 日志判断问题出在哪
4. **参数调整**：一次只改一个参数，观察效果
5. **验证效果**：对比调整前后的指标，确认问题解决

---

参考：[Oracle Java 17 GC Tuning Guide](https://docs.oracle.com/en/java/javase/17/gctuning/)
