# Java 锁机制

## synchronized 关键字

### 用法

```java
// 修饰实例方法：锁当前对象实例
public synchronized void method() {
    // 临界区
}

// 修饰静态方法：锁类对象
public static synchronized void staticMethod() {
    // 临界区
}

// 修饰代码块：锁指定对象
public void someMethod() {
    synchronized (this) {
        // 临界区
    }
}
```

### 保证三大特性

- **原子性**：被 synchronized 包裹的代码是原子的，不会被线程切换打断
- **可见性**：退出 synchronized 块之前对共享变量的修改，对其他线程可见
- **有序性**：禁止指令重排序穿过 synchronized 块

### Java 锁升级（HotSpot VM）

随着 Java 发展，synchronized 优化做了锁升级，性能越来越好：

**偏向锁 → 轻量级锁 → 重量级锁**

1. **偏向锁**：如果只有一个线程进入锁，JVM 会偏向这个线程，不进行加锁竞争，减少开销
2. **轻量级锁**：当有第二个线程竞争偏向锁，偏向锁升级为轻量级锁，通过自旋等待获取锁，不阻塞线程
3. **重量级锁**：如果自旋多次还是获取不到锁，或者更多线程竞争，升级为重量级锁，依赖操作系统内核互斥量，会阻塞线程

**总结**：
- 无竞争 → 偏向锁（几乎无开销）
- 轻度竞争 → 轻量级锁（自旋，用户态完成）
- 重度竞争 → 重量级锁（阻塞，内核态）

## ReentrantLock（可重入锁）

`java.util.concurrent.locks.ReentrantLock` 是 JDK 提供的显式锁：

### 基本用法

```java
ReentrantLock lock = new ReentrantLock();
lock.lock();
try {
    // 临界区
} finally {
    lock.unlock(); // 必须在 finally 释放锁！
}
```

### 和 synchronized 相比的优势

1. **可中断获取锁**：`lockInterruptibly()` 可以响应中断
2. **超时获取锁**：`tryLock(timeout)` 获取不到超时返回，不会一直等
3. **公平锁**：可以指定公平/非公平，公平锁按等待时间顺序获取锁
4. **条件变量**：多个 `Condition`，可以分开等待唤醒，synchronized 只能有一个条件

### 公平锁 vs 非公平锁

- **非公平锁（默认）**：性能好，但可能有些线程一直拿不到锁
- **公平锁**：保证先来先得，但是性能差一些，需要更多上下文切换

### 可重入

同一个线程可以多次获取同一把锁，计数，每次获取计数+1，每次释放计数-1，计数到 0 真正释放锁。

synchronized 也是可重入的。

## ReentrantReadWriteLock（读写锁）

读写分离，允许多个线程同时读，但是写只能一个线程：

```java
ReentrantReadWriteLock rwLock = new ReentrantReadWriteLock();
Lock readLock = rwLock.readLock();
Lock writeLock = rwLock.writeLock();

// 读
readLock.lock();
try {
    // 读取共享数据
} finally {
    readLock.unlock();
}

// 写
writeLock.lock();
try {
    // 修改共享数据
} finally {
    writeLock.unlock();
}
```

**适用场景**：读多写少，多读不互斥，性能比独占锁好很多。

## StampedLock

JDK 8 新增，改进读写锁：

- 支持**乐观读**：不需要加锁，先读，读完成后检查有没有写，没有被修改就读成功了
- 可以把读写锁转换
- 不支持可重入
- 吞吐量比 ReentrantReadWriteLock 更高

**乐观读示例：**

```java
long stamp = stampedLock.tryOptimisticRead();
// 读取数据...
if (!stampedLock.validate(stamp)) {
    // 被修改了，升级为悲观读
    stamp = stampedLock.readLock();
    try {
        // 重新读取
    } finally {
        stampedLock.unlockRead(stamp);
    }
}
```

大多数读操作都不会冲突，乐观读性能很好。

## CAS 原理

CAS（Compare-And-Swap 比较并交换）是乐观锁技术，原子操作由 CPU 指令支持：

```
CAS(V, E, N)
- V: 内存地址值
- E: 期望值
- N: 新值
- 如果 V == E，则把 V 更新为 N，成功
- 否则更新失败，返回失败
```

Java 中通过 `sun.misc.Unsafe` 提供 CAS 操作，并发包很多类都是基于 CAS 实现（AQS、Atomic 等）。

**优点**：没有阻塞，并发情况下性能好
**缺点**：
- 自旋 CAS 如果一直失败会占用大量 CPU
- ABA 问题
- 只能保证一个共享变量的原子操作

## ABA 问题

CAS 问题：一个变量从 A 变成 B，又变回 A，CAS 不知道它变化过，以为还是 A，认为没问题。

**解决方法**：**版本号**，每次修改版本号+1，CAS 比较值也比较版本号。`AtomicStampedReference` 就是这么解决的。

---

## synchronized vs ReentrantLock 对比

| 特性 | synchronized | ReentrantLock |
|------|--------------|---------------|
| 锁实现 | JVM 内置，依赖操作系统 | JDK 实现，纯 Java |
| 使用方式 | 隐式加锁解锁，自动释放 | 显式加锁解锁，必须 `lock()` 在 `try` 前，`unlock()` 在 `finally` |
| 可中断 | 不支持，不可中断 | 支持 `lockInterruptibly` |
| 超时获取 | 不支持 | 支持 `tryLock` |
| 公平锁 | 不支持 | 支持 |
| 多个条件 | 只能一个条件 | 多个 `Condition` |
| 性能 | Java 6 之后锁优化，性能差不多 | 功能更多，性能差不多 |

---

参考：[Java Concurrency API Docs](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/locks/package-summary.html)
