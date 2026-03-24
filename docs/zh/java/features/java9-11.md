# Java 9 - Java 11 重要变化

## Java 9 核心特性

### 模块系统 (JPMS - Java Platform Module System)

Java 9 最大的变化就是引入了模块系统，提供了 stronger encapsulation（更强的封装）和可靠的配置。

**模块定义：** 创建 `module-info.java` 文件声明模块：
```java
module com.example.myapp {
    requires java.base;
    exports com.example.api;
    provides com.example.Service with com.example.ServiceImpl;
}
```

**关键概念：**
- `requires` - 声明依赖的模块
- `exports` - 声明导出的包，只有导出的包才能被外部模块访问
- `provides...with` - 声明服务实现
- `opens` - 开放反射访问

**解决的问题：**
- 封装性：可以隐藏内部实现，不暴露给外部
- 可靠配置：模块依赖声明清晰，避免 classpath 地狱
- 性能提升：JVM 可以知道哪些模块不需要加载

### 接口私有方法

Java 9 允许接口中定义私有方法，用于抽取接口中默认方法的公共代码：

```java
public interface MyInterface {
    default void methodA() {
        commonHelper();
    }
    
    default void methodB() {
        commonHelper();
    }
    
    private void commonHelper() {
        // 抽取公共逻辑，不会暴露给实现类
    }
}
```

### 垃圾回收器变化

- **G1 设为默认垃圾回收器**，替换原来的 Parallel GC
- **CMS 标记为废弃**（Deprecated），计划在后续版本移除

### 进程 API 改进

新的 `ProcessHandle` API 可以更好地获取和管理进程信息：

```java
ProcessHandle.current().pid();           // 获取当前进程 ID
ProcessHandle.allProcesses();            // 枚举所有进程
info.totalCpuDuration();                // 获取 CPU 使用时间
```

### 钻石运算符扩展

钻石运算符 `<>` 可以和匿名内部类一起使用了：

```java
// Java 8 不允许，Java 9 允许
var list = new ArrayList<>() {};
```

### 其他 Java 9 改进

- `CompletableFuture` 新增 `completeAsync`、`orTimeout` 等方法
- 改进 `Stream` API，新增 `takeWhile`、`dropWhile`、`ofNullable`
- 平台日志 API `System.Logger`
- 新的 HTTP 客户端 API（孵化，Java 11 标准化）

---

## Java 10 核心特性

### 局部变量类型推断 (var)

允许编译器根据右侧表达式推断局部变量的类型：

```java
// Java 10 之前
List<String> list = new ArrayList<String>();

// Java 10 之后
var list = new ArrayList<String>();  // 编译器推断为 ArrayList<String>

var stream = Files.lines(Paths.get("file.txt"));
```

**限制：**
- 只能用于局部变量，不能用于成员变量、方法参数
- 必须声明时就初始化，否则编译器无法推断类型
- `var` 是保留类型名，不是关键字，所以原来用 `var` 作变量名的代码仍然可以编译

### G1 并行 Full GC

G1 默认改成并行 Full GC，降低 STW 时间，提升性能。

### 额外的垃圾回收器接口

为未来垃圾回收器的开发提供更干净的接口。

---

## Java 11 核心特性

### ZGC 垃圾回收器（实验性）

ZGC 是一个可扩展的低延迟垃圾回收器：
- **低延迟**：停顿时间通常不超过 10ms
- **可扩展**：支持 TB 级堆
- **并发**：大部分工作和应用线程并发执行
- 仍然是实验性阶段，Java 15 成为正式特性

### Epsilon 垃圾回收器（无操作）

Epsilon 什么垃圾都不回收，内存用完就直接退出 JVM：

**使用场景：**
- 性能测试（对比测量 GC 开销）
- 短生命周期应用，运行完就退出
- 内存占用测试

### 字符串新增方法

```java
// 空白字符串判断
"   ".isBlank();       // true

// 按行分割
"line1\nline2".lines(); // 返回 Stream<String>

// 去除首尾空白
"  hello  ".strip();    // "hello"

// 重复
"abc".repeat(3);        // "abcabcabc"
```

### HttpClient 标准化

Java 9 孵化的 HTTP/2 客户端在 Java 11 正式标准化：

```java
var client = HttpClient.newHttpClient();
var request = HttpRequest.newBuilder()
    .uri(URI.create("https://example.com"))
    .build();
HttpResponse<String> response = client.send(request, BodyHandlers.ofString());
System.out.println(response.body());
```

支持 HTTP/1.1 和 HTTP/2，异步和同步 API。

### 单文件程序不需要编译

可以直接运行 Java 源文件：

```bash
# 不需要先 javac Hello.java，直接运行
java Hello.java
```

### 删除模块

删除了 Java EE 和 CORBA 模块：
- java.xml.bind
- java.xml.ws
- java.xml.ws.annotation
- java.corba
- javax.transaction
- ...

如果需要这些模块，可以从 Maven 中心获取。

### 其他改进

- 新增 `void java.lang.Runtime.getVersion()` 返回简化版本字符串
- `Locale` 相关改进
- TLS 1.3 支持（默认启用）
- 飞行记录器开放给 OpenJDK

---

参考：
- [JDK 9 Release Notes](https://openjdk.java.net/projects/jdk9/)
- [JDK 11 Release Notes](https://openjdk.java.net/projects/jdk/11/)
