# 原子类

Java `java.util.concurrent.atomic` 包提供了一系列原子操作类，基于 CAS 实现，无锁并发，性能更好。

## 原子类分类

### 原子更新基本类型

- `AtomicInteger` - int
- `AtomicLong` - long
- `AtomicBoolean` - boolean

**常用方法：**
```java
AtomicInteger count = new AtomicInteger(0);

count.get(); // 获取当前值
count.set(10); // 设置值
count.incrementAndGet(); // ++i 返回结果
count.getAndIncrement(); // i++ 返回结果
count.addAndGet(5); // +=5 返回结果
count.compareAndSet(expect, update); // CAS 更新
```

### 原子更新数组

- `AtomicIntegerArray` - int[]
- `AtomicLongArray` - long[]
- `AtomicReferenceArray` - 引用数组

对数组中的元素进行原子更新：
```java
int[] array = new int[]{1, 2, 3};
AtomicIntegerArray atomicArray = new AtomicIntegerArray(array);
atomicArray.compareAndSet(0, 1, 10); // 修改索引 0 的元素
```

### 原子更新引用类型

- `AtomicReference` - 引用类型原子更新
- `AtomicMarkableReference` - 引用，带一个标记位（解决 ABA 问题标记是否被修改过）
- `AtomicStampedReference` - 引用，带一个版本号（解决 ABA 问题）

**AtomicStampedReference 解决 ABA：**
```java
// 初始值 A，版本 0
AtomicStampedReference<String> ref = new AtomicStampedReference<>("A", 0);

// 更新的时候比较版本号，版本不对更新失败
int stamp = ref.getStamp();
ref.compareAndSet("A", "B", stamp, stamp + 1);
```

## LongAdder vs AtomicLong

### 问题背景

AtomicLong 依靠 CAS 自旋，高并发下大量线程同时更新同一个 AtomicLong 会导致大量 CAS 失败，自旋浪费 CPU。

### LongAdder 原理

**分段 CAS**：
- 将一个 count 分散为多个 `Cell`，每个线程竞争不同 Cell 更新，减少冲突
- 最终结果是所有 Cell 的值相加

**优势**：高并发下冲突更少，性能比 AtomicLong 好很多
**劣势**：会有一定的空间换时间，占用更多内存

### 使用场景选择

- **AtomicLong**：并发冲突不严重，需要精确结果，比如计数器
- **LongAdder**：高并发统计计数，比如 QPS 统计，可以接受最终一致

## 原理：CAS + 自旋

所有原子类底层都是依赖 CAS（Compare-And-Swap），由 CPU 指令直接支持原子性：

```
比较当前值是否等于期望值，如果相等就更新为新值，整个操作原子完成
```

热点问题解决思路：
- 低冲突：直接 CAS 自旋（AtomicLong）
- 高冲突：分段 CAS（LongAdder）

## ABA 问题与解决

**ABA 问题**：一个变量从 A 变成 B，又变回 A，CAS 认为值没变化，认为更新成功，但实际上它变化过。

**解决方法**：
- 给每个更新加上版本号，每次更新版本号+1
- CAS 不仅比较值，还要比较版本号
- `AtomicStampedReference` 就是这样实现的

---

参考：[java.util.concurrent.atomic Package Doc](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/atomic/package-summary.html)
