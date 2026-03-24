# 并发编程基础

## 并发与并行

- **并发（Concurrency）**：同一时间段内多个任务交替执行，在单CPU上
- **并行（Parallelism）**：同一时刻多个任务同时执行，在多CPU/多核上
- **并发目标**：提高资源利用率，让CPU尽量不闲着

## 线程与进程

- **进程**：程序执行的一次执行过程，是系统进行资源分配（内存、文件句柄等）的基本单位，每个进程有独立的地址空间
- **线程**：进程内的执行单元，CPU调度的基本单位，同一进程内的线程共享进程的地址空间和资源

一个进程可以包含多个线程。

## 线程生命周期与状态转换

Java 线程在 `java.lang.Thread.State` 中定义了 6 种状态：

```
NEW → RUNNABLE → TERMINATED
          ↓↑
     BLOCKED / WAITING / TIMED_WAITING
```

1. **NEW**：新建状态，创建了 Thread 对象还没调用 `start()`
2. **RUNNABLE**：可运行状态，正在 CPU 运行或者等待 CPU 调度
3. **BLOCKED**：阻塞状态，等待获取监视器锁（进入 synchronized 块/方法失败）
4. **WAITING**：等待状态，无限等待其他线程唤醒，`wait()`, `join()`, `LockSupport.park()`
5. **TIMED_WAITING**：计时等待，一定时间后自动唤醒，`sleep(timeout)`, `wait(timeout)`, `join(timeout)`
6. **TERMINATED**：终止状态，线程执行完毕

## 实现线程的三种方式

1. **继承 Thread 类**
```java
public class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("Hello from thread");
    }
}

// 使用
new MyThread().start();
```

2. **实现 Runnable 接口**
```java
public class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("Hello from runnable");
    }
}

// 使用
new Thread(new MyRunnable()).start();
```

3. **实现 Callable 接口 + FutureTask**（可以返回结果，抛出异常）
```java
public class MyCallable implements Callable<Integer> {
    @Override
    public Integer call() throws Exception {
        return 42;
    }
}

// 使用
FutureTask<Integer> task = new FutureTask<>(new MyCallable());
new Thread(task).start();
Integer result = task.get();
```

**对比**：
- 继承 Thread：不能再继承其他类，直接获取线程比较简单
- 实现 Runnable：可以继承其他类，适合多个线程共享同一个任务，推荐使用
- Callable：可以获取返回结果，前两者不能

## 线程优先级

Java 线程有优先级，范围 `1`（MIN_PRIORITY）到 `10`（MAX_PRIORITY），默认 `5`（NORM_PRIORITY）：

```java
thread.setPriority(Thread.MAX_PRIORITY);
```

**注意**：优先级最终依赖操作系统调度，Java 不能保证优先级高一定先执行，只是给操作系统一个建议。

## 并发三大特性

1. **原子性**：一个操作要么全部成功，要么全部失败，不会被中断
2. **可见性**：一个线程修改了共享变量的值，其他线程能立即看到修改
3. **有序性**：程序执行顺序按照代码的先后顺序执行（禁止指令重排序）

**synchronized** 保证原子性、可见性、有序性
**volatile** 保证可见性、禁止重排序，不保证原子性

---

参考：[Java Platform, Standard Edition Java Tutorials - Concurrency](https://docs.oracle.com/javase/tutorial/essential/concurrency/)
