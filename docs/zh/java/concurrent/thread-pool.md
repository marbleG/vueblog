# 线程池

## 为什么使用线程池

1. **降低资源消耗**：重复利用已创建的线程，避免频繁创建销毁线程的开销
2. **提高响应速度**：任务到达时，不需要等待创建线程就能立即执行
3. **提高可管理性**：统一管理线程，控制最大并发数，避免创建过多线程耗尽资源

## ThreadPoolExecutor 核心参数

```java
public ThreadPoolExecutor(
    int corePoolSize,
    int maximumPoolSize,
    long keepAliveTime,
    TimeUnit unit,
    BlockingQueue<Runnable> workQueue,
    ThreadFactory threadFactory,
    RejectedExecutionHandler handler
) { ... }
```

### corePoolSize（核心线程数）

- 核心线程会一直存活，即使空闲也不会被回收
- 当线程数小于核心线程数，即使有线程空闲，也会创建新的核心线程处理任务
- 除非设置了 `allowCoreThreadTimeOut`，核心线程才会被回收

### maximumPoolSize（最大线程数）

- 线程池允许创建的最大线程数
- 如果阻塞队列满了，且当前线程数小于最大线程数，会创建非核心线程处理任务

### keepAliveTime（空闲线程存活时间）

- 非核心线程空闲超过这个时间就会被回收
- 如果设置了 `allowCoreThreadTimeOut=true`，核心线程也会被回收

### workQueue（工作队列）

- 当线程数达到核心线程数后，新任务会放到阻塞队列等待
- 常用阻塞队列：
  1. **ArrayBlockingQueue**：有界数组实现，固定大小
  2. **LinkedBlockingQueue**：链表实现，可以是无界（默认大小 `Integer.MAX_VALUE`）
  3. **SynchronousQueue**：不存储元素，每个插入操作必须等待另一个线程移除操作
  4. **PriorityBlockingQueue**：优先级阻塞队列，按优先级排序

### threadFactory（线程工厂）

- 创建线程的工厂，可以自定义线程名称、优先级、是否守护线程等
- 推荐使用 `guava` 的 `ThreadFactoryBuilder` 或 Apache Commons Lang 的 `BasicThreadFactory`，方便设置线程名，方便问题排查

### handler（拒绝策略）

当线程池和阻塞队列都满了，新任务会触发拒绝策略：

JDK 内置四种拒绝策略：
1. **AbortPolicy**（默认）：直接抛出 `RejectedExecutionException`
2. **CallerRunsPolicy**：调用者线程自己执行这个任务
3. **DiscardPolicy**：直接丢弃，不抛异常
4. **DiscardOldestPolicy**：丢弃队列最老的任务，尝试重新加入当前任务

**生产建议**：不使用默认的 AbortPolicy，应该自定义拒绝策略做日志记录或降级处理。

## 线程池工作流程

```
任务进来 →
  线程数 < corePoolSize → 创建新线程执行
  线程数 ≥ corePoolSize → 放入阻塞队列
  阻塞队列满了 →
    线程数 < maximumPoolSize → 创建非核心线程执行
    线程数 ≥ maximumPoolSize → 触发拒绝策略
```

**记住流程**：核心线程 → 队列 → 非核心线程 → 拒绝策略

## Executors 工具类快捷方法

### newFixedThreadPool（固定大小线程池）

```java
// corePoolSize = maximumPoolSize，无界队列 LinkedBlockingQueue
ExecutorService pool = Executors.newFixedThreadPool(nThreads);
```
- 特点：线程数固定，多余任务排队，适合控制并发数

### newCachedThreadPool（缓存线程池）

```java
// corePoolSize = 0，maximumPoolSize = 无限大，SynchronousQueue
ExecutorService pool = Executors.newCachedThreadPool();
```
- 特点：有空闲线程就复用，没有就创建，适合大量短任务，空闲 60 秒回收线程

### newSingleThreadExecutor（单线程线程池）

```java
// 只有一个线程，无界队列，保证所有任务按顺序执行
ExecutorService pool = Executors.newSingleThreadExecutor();
```
- 特点：保证任务串行执行，单线程执行

### newScheduledThreadPool（定时线程池）

```java
// 支持定时和周期性任务
ScheduledExecutorService pool = Executors.newScheduledThreadPool(coreSize);
```

**阿里巴巴开发规范不推荐使用 Executors**：
- `FixedThreadPool` 和 `SingleThreadPool` 使用无界队列，可能堆积任务导致 OOM
- `CachedThreadPool` 和 `ScheduledThreadPool` 允许创建最大线程数 `Integer.MAX_VALUE`，可能创建过多线程导致 OOM

**生产推荐**：手动创建 `ThreadPoolExecutor`，明确指定参数，根据场景设置合理大小。

## 如何设置核心线程数大小

**公式**：
- **CPU 密集型任务**（计算、加密等）：`corePoolSize = CPU核心数 + 1`
- **IO 密集型任务**（数据库、网络调用）：`corePoolSize = 2 * CPU核心数` 或者 `CPU核心数 / (1 - 阻塞系数)`，阻塞系数一般 0.8 ~ 0.9

```java
// 获取 CPU 核心数
int cpuCores = Runtime.getRuntime().availableProcessors();
```

## 自定义线程工厂示例

```java
ThreadFactory factory = new ThreadFactoryBuilder()
    .setNameFormat("my-pool-%d")
    .setDaemon(true)
    .setPriority(Thread.NORM_PRIORITY)
    .build();
```

设置线程名方便问题排查，jstack 打线程栈能看到哪个线程出问题。

---

参考：[Java Platform, Standard Edition API - ThreadPoolExecutor](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/ThreadPoolExecutor.html)
