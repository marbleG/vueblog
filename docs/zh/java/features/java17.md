# Java 17 重要特性

Java 17 是一个 LTS（长期支持）版本，带来了许多成熟的预览特性转正。

## 密封类 (Sealed Classes) [转正]

密封类限制哪些类可以继承它，提升封装性和模式匹配的完整性检查：

```java
// 定义密封类，允许指定哪些类可以继承
public sealed interface Shape 
    permits Circle, Rectangle, Square {
}

// 只有允许的类才能继承
public final class Circle implements Shape { }
public final class Rectangle implements Shape { }
```

**作用：**
- 控制继承层级，防止不正确的继承
- 配合模式匹配，编译器可以检查 switch 是否覆盖所有情况
- 更好的架构设计：API 设计者可以控制谁能扩展

## 模式匹配 for instanceof [转正]

简化 `instanceof` 判断后强转的写法：

```java
// 旧写法
if (obj instanceof String) {
    String s = (String) obj;
    // 使用 s
}

// 新写法
if (obj instanceof String s) {
    // 直接使用 s
}

// 配合条件
if (obj instanceof String s && s.length() > 5) {
    // ...
}
```

## 记录类 (Records) [转正]

记录类是一种不可变的数据载体类，自动生成 `equals`、`hashCode`、`toString` 和 getter：

```java
// 定义记录类
public record Point(int x, int y) { }

// 等价于手写：
// - 私有 final 字段 x, y
// - 构造方法
// - equals 和 hashCode 基于所有字段
// - toString 包含所有字段
// - getter 方法 x() 和 y()（不是 getX()）
```

**特点：**
- 所有字段都是 final 的，不可变
- 可以定义自定义构造方法
- 可以实现接口
- 不能声明可变实例字段

## 文本块 (Text Blocks) [转正]

方便编写多行字符串：

```java
// 旧写法
String html = "<html>\n"
           + "    <body>\n"
           + "        <p>Hello, world</p>\n"
           + "    </body>\n"
           + "</html>\n";

// 新写法
String html = """
              <html>
                  <body>
                      <p>Hello, world</p>
                  </body>
              </html>
              """;
```

**特点：**
- 保留换行和缩进
- 自动移除公共前缀缩进
- `"""` 作为起止标记
- 可以使用 `\` 消除换行，`\s` 保留行尾空格

## 外部函数 & 内存 API（第三孵化）

允许 Java 程序安全地调用外部本地代码（C/C++），并高效访问外部堆外内存：

```java
// 分配堆外内存
MemorySegment segment = MemorySegment.allocateNative(100, arena);
```

**目标：** 替代 JNI，更安全更易用。

## 增强伪随机数生成器

新增接口 `RandomGenerator` 和多种实现：
- `L32X64MixRandom`
- `L128X128MixRandom`
- 更快、周期更长的伪随机算法

## ZGC 增强：并发类卸载

支持并发卸载不再使用的类，降低内存压力。

## macOS 改进

- 支持 Apple Silicon (ARM64)
- 改进 Swing 界面渲染

## 删除特性

- 移除了 AOT 实验性编译器
- 移除了 JIT 缓存
- 彻底移除了 CMS 垃圾回收器

---

## LTS 版本说明

Java 17 是 Oracle 提供长期支持的 LTS 版本，预计支持到 2029 年，是目前推荐在生产环境使用的 Java 版本。

---

参考：[JDK 17 Release Notes](https://openjdk.java.net/projects/jdk/17/)
