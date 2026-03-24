# JVM 类加载机制

## 类加载生命周期

类从被加载到 JVM 中开始，到卸载出内存为止，整个生命周期分为 7 个阶段：

```
加载 → 验证 → 准备 → 解析 → 初始化 → 使用 → 卸载
```

其中**验证、准备、解析**三个阶段统称为**连接**。

### 1. 加载（Loading）

加载阶段完成三件事：
1. 通过全限定名获取定义此类的二进制字节流
2. 将字节流所代表的静态存储结构转化为方法区的运行时数据结构
3. 在堆中生成一个代表这个类的 `java.lang.Class` 对象，作为方法区这些数据的访问入口

### 2. 验证（Verification）

确保 Class 文件的字节流信息符合 JVM 规范，不会危害 JVM 安全：

- 文件格式验证：魔数、版本号等
- 元数据验证：对字节码描述的信息进行语义分析
- 字节码验证：验证字节码指令是否正确
- 符号引用验证：验证符号引用能否找到对应的类

### 3. 准备（Preparation）

为**类变量**（static 变量）分配内存，并设置**初始零值**：

```java
// 准备阶段：value 赋值为 0，不是 123
// 初始化阶段才会赋值为 123
public static int value = 123;

// 如果是常量：public static final，准备阶段直接赋值
public static final int CONST = 456;
```

### 4. 解析（Resolution）

将常量池内的符号引用替换为直接引用。

- **符号引用**：用一组符号来描述所引用的目标，可以是任何字面量
- **直接引用**：直接指向目标的指针、相对偏移量或一个能间接定位到目标的句柄

### 5. 初始化（Initialization）

真正开始执行类中定义的 Java 程序代码，执行类构造器 `<clinit>()` 方法：

- `<clinit>()` 是编译器自动收集类中所有 static 变量赋值动作和 static 块合并产生的
- JVM 保证父类的 `<clinit>()` 在子类的 `<clinit>()` 之前执行

## 类加载器与双亲委派模型

### 类加载器分类

JVM 自带三种类加载器：

1. **启动类加载器（Bootstrap ClassLoader）**
   - 用 C++ 实现，是 JVM 自身的一部分
   - 加载 `%JAVA_HOME%/jre/lib` 下的核心类库
   - 加载 `sun.boot.class.path` 指定的类
   - 没有父类加载器

2. **扩展类加载器（Extension ClassLoader）**
   - Java 实现，`sun.misc.Launcher$ExtClassLoader`
   - 加载 `%JAVA_HOME%/jre/lib/ext` 目录下的类库

3. **应用程序类加载器（Application ClassLoader）**
   - Java 实现，`sun.misc.Launcher$AppClassLoader`
   - 加载用户类路径（ClassPath）上的类库
   - 一般是程序默认的类加载器

### 双亲委派模型工作流程

1. 如果一个类加载器收到了类加载请求，它首先会把这个请求**委托给父类加载器**去完成
2. 每个层次的类加载器都是如此，因此所有加载请求最终都应该传送到启动类加载器
3. 只有当父类加载器反馈无法完成这个加载请求（在它的搜索范围没有找到这个类），子加载器才会尝试自己去加载

**优势**：
- 避免重复加载：父类已经加载过，子类不需要再加载
- 保证 Java 核心库安全：比如 `java.lang.Object` 一定由启动类加载器加载，保证所有类加载器加载出来的 Object 都是同一个类

### 打破双亲委派

为什么要打破？

- **SPI（Service Provider Interface）**：核心接口定义在核心库，实现由第三方厂商提供，需要应用程序类加载器去加载实现，但核心类加载器不知道第三方实现在哪里
- **热部署、模块化**：OSGi、Tomcat 等 Web 容器需要独立加载不同应用的类
- **版本隔离**：同一个类的多个版本可以同时存在

典型案例：
- JDBC 驱动加载：`java.sql.Driver` 核心接口在核心库，由启动类加载器加载，具体驱动实现由应用类加载器加载
- Tomcat：每个 Web 应用有独立的类加载器，隔离不同应用的类库

### 自定义类加载器

继承 `java.lang.ClassLoader`，重写 `findClass()` 方法：

```java
public class MyClassLoader extends ClassLoader {
    @Override
    protected Class<?> findClass(String name) throws ClassNotFoundException {
        // 1. 读取类文件字节流
        byte[] classData = loadClassData(name);
        // 2. 调用 defineClass 转换为 Class 对象
        return defineClass(name, classData, 0, classData.length);
    }
    
    private byte[] loadClassData(String name) {
        // 从文件或网络读取字节流
        // ...
    }
}
```

---

参考：[《Java 虚拟机规范》SE 8 Edition](https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-5.html)
