# JVM 运行时数据区域

JVM 运行时将内存划分为多个不同数据区域，每个区域有不同的用途和生命周期。

## 程序计数器 (Program Counter Register)

- **线程私有**，每个线程有独立的 PC 寄存器
- **作用**：记录当前线程执行到字节码的行号
- 如果线程执行的是 Java 方法，PC 记录正在执行的字节码地址；如果是 native 方法，PC 为 undefined
- **唯一一个**不会出现 `OutOfMemoryError` 的区域

## Java 虚拟机栈 (JVM Stack)

- **线程私有**，生命周期和线程相同
- **作用**：每个方法执行时都会创建一个栈帧（Stack Frame）
- 栈帧存储：局部变量表、操作数栈、动态链接、方法出口
- **局部变量表**：存放方法参数和方法内部定义的局部变量，以 槽（Slot）为单位
- **两种异常**：
  - `StackOverflowError`：栈深度 > 虚拟机允许深度（递归过深）
  - `OutOfMemoryError`：无法扩展栈大小

## 本地方法栈 (Native Method Stack)

- 和虚拟机栈作用类似，区别是：虚拟机栈为 Java 方法服务，本地方法栈为 native 方法服务
- HotSpot 直接把本地方法栈和虚拟机栈合并了
- 也会抛出 `StackOverflowError` 和 `OutOfMemoryError`

## Java 堆 (Heap)

- **线程共享**，所有线程共享堆内存
- **作用**：存放对象实例和数组，几乎所有对象都在这里分配
- GC 主要管理的区域就是堆
- 分区：年轻代（Eden + 2个Survivor）、老年代
- 可以物理不连续，逻辑上连续即可
- 如果堆无法扩展，抛出 `OutOfMemoryError`

## 方法区 (Method Area)

- **线程共享**，存储已被 JVM 加载的类信息、常量、静态变量、即时编译器编译后的代码
- JDK 8 之前：方法区使用永久代（PermGen）实现
- JDK 8 及之后：永久代被移除，方法区使用**元空间（Metaspace）**在本地内存中实现
- **运行时常量池**是方法区的一部分，存放编译器生成的字面量和符号引用
- 如果方法区无法满足内存分配，抛出 `OutOfMemoryError`

## 直接内存 (Direct Memory)

- 不属于 JVM 运行时数据区，使用本地内存分配
- **典型场景**：NIO 使用 `ByteBuffer.allocateDirect()` 分配堆外内存
- 受限于本地内存总大小，也会抛出 `OutOfMemoryError`

## 区域总结表

| 区域 | 线程共享 | 可能 OOM |
|------|----------|----------|
| 程序计数器 | 私有 | 不可能 |
| 虚拟机栈 | 私有 | SOF / OOM |
| 本地方法栈 | 私有 | SOF / OOM |
| Java 堆 | 共享 | OOM |
| 方法区（元空间） | 共享 | OOM |

## OutOfMemoryError 常见场景

1. **堆溢出**：创建对象太多，堆不够 `java.lang.OutOfMemoryError: Java heap space`
2. **元空间溢出**：加载类太多，元空间不够 `java.lang.OutOfMemoryError: Metaspace`
3. **栈溢出**：递归太深 `java.lang.StackOverflowError`
4. **直接内存溢出**：NIO 分配太多堆外内存 `java.lang.OutOfMemoryError: Direct buffer memory`

---

参考：[《Java 虚拟机规范》SE 8 Edition](https://docs.oracle.com/javase/specs/jvms/se8/html/)
