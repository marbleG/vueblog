# Java 8 重要特性

Java 8 是 Java 历史上最重要的版本更新之一，引入了函数式编程、Stream、新的日期时间 API 等重大改进。

## Lambda 表达式

Lambda 表达式是 Java 8 引入的函数式编程特性，允许把函数作为参数传递给方法。

**语法：**
```java
// 匿名内部类方式
Runnable r = new Runnable() {
    @Override
    public void run() {
        System.out.println("Hello");
    }
};

// Lambda 表达式方式
Runnable r = () -> System.out.println("Hello");

// 带参数的 Lambda
Comparator<String> cmp = (a, b) -> a.compareTo(b);
```

**作用：** 简化匿名内部类写法，支持函数式编程。

## 函数式接口

只有一个抽象方法的接口可以被 Lambda 表达式隐式转换。`@FunctionalInterface` 注解用于标记。

常见函数式接口：
- `Runnable` - 无参数无返回值
- `Consumer<T>` - 接收一个参数，无返回值
- `Function<T,R>` - 接收一个参数，返回结果
- `Predicate<T>` - 接收一个参数，返回 boolean
- `Supplier<T>` - 无参数，返回结果

## Stream API

Stream API 提供了对集合数据的函数式操作支持，支持串行和并行处理。

**常用操作：**
```java
List<String> filtered = list.stream()
    .filter(s -> s.startsWith("A"))  // 过滤
    .map(String::toUpperCase)        // 映射转换
    .sorted()                        // 排序
    .collect(Collectors.toList());   // 收集结果
```

**特点：**
- 数据来源可以是集合、数组、I/O 通道等
- 不存储数据，只是对数据进行计算
- 惰性求值，终端操作触发计算
- 支持并行处理 `parallelStream()`

## 日期时间 API (java.time)

全新的日期时间 API，修复了旧 `java.util.Date` 和 `java.util.Calendar` 的设计问题。

**主要类：**
- `LocalDate` - 日期（年-月-日），无时区
- `LocalTime` - 时间（时-分-秒），无时区
- `LocalDateTime` - 日期 + 时间
- `Instant` - 时间戳（UTC 毫秒）
- `Duration` - 两个时间之间的间隔
- `Period` - 两个日期之间的间隔
- `ZoneId` / `ZonedDateTime` - 带时区的日期时间

**优势：**
- 线程安全：所有类都是不可变的
- 设计清晰：日期和时间分离，区分不同粒度
- 丰富的 API：支持各种日期计算操作

## Optional 类

`Optional<T>` 是一个容器对象，可以包装可能为 `null` 的值，避免空指针异常。

**常用方法：**
```java
// 创建 Optional
Optional<String> opt = Optional.ofNullable(nullableValue);

// 安全获取值
String result = opt.orElse("default");

// 条件存在时才执行
opt.ifPresent(value -> System.out.println(value));

// 链式操作
String city = user.getAddress()
    .flatMap(Address::getCity)
    .orElse("Unknown");
```

## 默认方法

接口可以添加带有默认实现的方法，不破坏现有实现类。

```java
public interface MyInterface {
    void oldMethod();
    
    default void newDefaultMethod() {
        // 默认实现
    }
}
```

**作用：** 在不破坏兼容性的前提下给接口新增方法。

## 方法引用

方法引用是 Lambda 表达式的简化写法，当 Lambda 表达式只是调用一个已有方法时使用。

**四种形式：**
1. **静态方法引用** - `类名::静态方法`  `Integer::parseInt`
2. **实例方法引用** - `对象::实例方法`  `System.out::println`
3. **类的实例方法引用** - `类名::实例方法`  `String::compareTo`
4. **构造方法引用** - `类名::new`  `ArrayList::new`

## 重复注解

允许在同一个声明位置多次使用相同的注解：

```java
@Repeatable(Roles.class)
public @interface Role {
    String value();
}

@Roles({@Role("admin"), @Role("user")})
public class User { }

// Java 8 新写法
@Role("admin")
@Role("user")
public class User { }
```

## 类型注解

可以在任何类型位置使用注解，包括泛型、数组、父类、接口等：

```java
@NonNull List<@NonNull String> names;
```

配合注解处理器可以更早发现错误（如空指针检查）。

## 其他变化

- **Nashorn JavaScript 引擎** - 替代 Rhino，允许在 JVM 上运行 JavaScript
- **新的 JavaScript 引擎 API** - `javax.script`
- **PermGen 移除** - 永久代被移除，元空间（Metaspace）取而代之
- **字符串去重** - G1 垃圾收集器支持字符串去重
- **并行垃圾回收** - 改进并行回收
- **原子操作增强** - `LongAdder` 等高并发原子类

---

参考：[OpenJDK 8 官方文档](https://openjdk.java.net/projects/jdk8/)

