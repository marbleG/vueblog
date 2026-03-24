# 同步工具类

Java `java.util.concurrent` 包提供了几种实用的并发同步工具类。

## CountDownLatch（倒计时门闩）

**作用**：一个线程等待多个线程都完成后再继续执行。

```java
// 参数 count 是等待的线程数
CountDownLatch countDownLatch = new CountDownLatch(3);

// 工作线程
new Thread(() -> {
    doWork();
    countDownLatch.countDown(); // count 减 1
}).start();

// 等待线程
countDownLatch.await(); // 阻塞等到 count 变成 0，继续往下执行
doSomethingAfterAllWorkDone();
```

**特点**：
- count 只能递减一次，不能重复使用
- 可以实现一个线程等待 N 个线程，也可以 N 个线程等待一个线程

## CyclicBarrier（循环屏障）

**作用**：让一组线程互相等待，都到达屏障点后再一起继续执行。

```java
// parties 是参与线程数
CyclicBarrier barrier = new CyclicBarrier(3, () -> {
    // 所有线程都到达后，会执行这个回调（由最后一个到达的线程执行）
});

// 每个线程工作
new Thread(() -> {
    doFirstPart();
    barrier.await(); // 等待其他人
    doSecondPart();
}).start();
```

**对比 CountDownLatch**：
- CountDownLatch：计数器只能用一次，一个线程等多个
- CyclicBarrier：可以重复使用，一组线程互相等待

## Semaphore（信号量）

**作用**：控制同时访问某个资源的最大并发数。

```java
// permits 允许的并发数
Semaphore semaphore = new Semaphore(10);

// 获取许可
semaphore.acquire();
try {
    // 最多 10 个线程同时进入这里
    handleRequest();
} finally {
    semaphore.release(); // 释放许可
}
```

**应用场景**：
- 限流，控制接口并发请求数
- 数据库连接池控制最大连接数

## Exchanger（交换者）

**作用**：两个线程之间交换数据。一个线程完成后把数据给另一个线程：

```java
Exchanger<String> exchanger = new Exchanger<>();

// 线程 A
new Thread(() -> {
    String data = "data from A";
    String received = exchanger.exchange(data);
}).start();

// 线程 B
new Thread(() -> {
    String data = "data from B";
    String received = exchanger.exchange(data);
}).start();
```

不常见，特定场景使用。

## Phaser（阶段器）

JDK 7 新增，功能更灵活的 CyclicBarrier：

- 支持动态注册解除注册 parties
- 支持多个阶段，每个阶段都可以等待所有人完成
- 支持分层，更好的并行

不太常用，复杂并发场景才需要。

## 总结

| 工具 | 作用 | 适用场景 |
|------|------|----------|
| CountDownLatch | 一个等多个 | 启动等待多个服务初始化完成 |
| CyclicBarrier | 多个互相等待 | 分阶段计算，每个阶段等待所有人完成 |
| Semaphore | 控制并发数 | 限流，限制同时访问某个资源的线程数 |
| Exchanger | 两个线程交换数据 | 两个线程交换数据，测试对 |
| Phaser | 多阶段重复等待 | 复杂分阶段任务，动态增减参与者 |

---

参考：[Java Platform, Standard Edition Concurrency Utilities](https://docs.oracle.com/javase/tutorial/essential/concurrency/index.html)
