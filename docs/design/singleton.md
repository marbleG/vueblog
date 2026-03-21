# 单例模式（Singleton）

## 模式定义

单例模式（Singleton Pattern）是一种创建型设计模式，它确保一个类只有一个实例，并提供一个全局访问点。单例模式是最简单、最常用的设计模式之一。

## 核心思想

控制类的实例化过程，确保整个系统中只存在一个实例，并提供一个全局访问点让其他对象可以访问这个实例。

## 结构组成

单例模式结构简单，只包含一个核心角色：

| 角色 | 职责 |
|------|------|
| **单例类（Singleton）** | 包含私有构造函数、私有静态实例、公共静态访问方法 |

## 实现方式

### 1. 饿汉式（Eager Initialization）

```java
public class EagerSingleton {
    private static final EagerSingleton INSTANCE = new EagerSingleton();
    
    private EagerSingleton() {}
    
    public static EagerSingleton getInstance() {
        return INSTANCE;
    }
}
```

**特点**：类加载时创建实例，线程安全，但可能造成资源浪费。

### 2. 懒汉式（Lazy Initialization）

```java
public class LazySingleton {
    private static LazySingleton instance;
    
    private LazySingleton() {}
    
    public static synchronized LazySingleton getInstance() {
        if (instance == null) {
            instance = new LazySingleton();
        }
        return instance;
    }
}
```

**特点**：延迟加载，但 synchronized 影响性能。

### 3. 双重检查锁（Double-Checked Locking）

```java
public class DoubleCheckedSingleton {
    private static volatile DoubleCheckedSingleton instance;
    
    private DoubleCheckedSingleton() {}
    
    public static DoubleCheckedSingleton getInstance() {
        if (instance == null) {
            synchronized (DoubleCheckedSingleton.class) {
                if (instance == null) {
                    instance = new DoubleCheckedSingleton();
                }
            }
        }
        return instance;
    }
}
```

**特点**：延迟加载，线程安全，性能较好。注意 volatile 关键字防止指令重排。

### 4. 静态内部类（Static Inner Class）

```java
public class StaticInnerSingleton {
    private StaticInnerSingleton() {}
    
    private static class Holder {
        private static final StaticInnerSingleton INSTANCE = new StaticInnerSingleton();
    }
    
    public static StaticInnerSingleton getInstance() {
        return Holder.INSTANCE;
    }
}
```

**特点**：延迟加载，线程安全，推荐使用。

### 5. 枚举（Enum）

```java
public enum EnumSingleton {
    INSTANCE;
    
    public void doSomething() {
        System.out.println("执行操作");
    }
}

// 使用方式
EnumSingleton.INSTANCE.doSomething();
```

**特点**：线程安全，防止反射攻击，防止序列化问题，最佳实践。

## Python 实现

```python
class Singleton:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

class SingletonMeta(type):
    _instances = {}
    
    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]

class SingletonClass(metaclass=SingletonMeta):
    pass

if __name__ == "__main__":
    s1 = Singleton()
    s2 = Singleton()
    print(s1 is s2)
```

## 应用场景

### 适用场景

1. **全局配置管理**：系统配置信息管理
2. **日志记录器**：统一的日志记录器
3. **数据库连接池**：共享数据库连接
4. **缓存管理**：全局缓存管理器
5. **线程池**：共享线程池资源

### 实际应用案例

| 应用场景 | 说明 |
|---------|------|
| **Runtime** | Java 运行时环境 |
| **Logger** | 日志记录器 |
| **Config** | 配置管理器 |
| **Connection Pool** | 数据库连接池 |
| **Spring Bean** | 单例作用域的 Bean |

## 优缺点分析

### 优点

| 优点 | 说明 |
|------|------|
| **内存节约** | 只有一个实例，减少内存开销 |
| **全局访问** | 提供全局访问点，方便使用 |
| **延迟加载** | 懒汉式可以延迟初始化 |
| **避免冲突** | 避免资源冲突 |

### 缺点

| 缺点 | 说明 |
|------|------|
| **违反单一职责** | 同时负责创建和业务逻辑 |
| **难以扩展** | 没有接口，难以扩展 |
| **测试困难** | 全局状态影响单元测试 |
| **隐藏依赖** | 依赖关系不明显 |

## 最佳实践

### 1. 防止反射攻击

```java
public class ReflectionSafeSingleton {
    private static volatile ReflectionSafeSingleton instance;
    
    private ReflectionSafeSingleton() {
        if (instance != null) {
            throw new IllegalStateException("单例已存在，请使用 getInstance() 方法获取实例");
        }
    }
    
    public static ReflectionSafeSingleton getInstance() {
        if (instance == null) {
            synchronized (ReflectionSafeSingleton.class) {
                if (instance == null) {
                    instance = new ReflectionSafeSingleton();
                }
            }
        }
        return instance;
    }
}
```

### 2. 防止序列化破坏

```java
public class SerializableSingleton implements Serializable {
    private static final SerializableSingleton INSTANCE = new SerializableSingleton();
    
    private SerializableSingleton() {}
    
    public static SerializableSingleton getInstance() {
        return INSTANCE;
    }
    
    protected Object readResolve() {
        return INSTANCE;
    }
}
```

### 3. 使用场景判断

```java
public class SingletonContext {
    private static volatile SingletonContext instance;
    private Map<String, Object> context = new HashMap<>();
    
    private SingletonContext() {}
    
    public static SingletonContext getInstance() {
        if (instance == null) {
            synchronized (SingletonContext.class) {
                if (instance == null) {
                    instance = new SingletonContext();
                }
            }
        }
        return instance;
    }
    
    public void put(String key, Object value) {
        context.put(key, value);
    }
    
    public Object get(String key) {
        return context.get(key);
    }
}
```

## 与其他模式的关系

| 模式 | 关系 |
|------|------|
| **工厂方法模式** | 工厂类常设计为单例 |
| **抽象工厂模式** | 具体工厂常设计为单例 |
| **建造者模式** | 建造者可以是单例 |
| **外观模式** | 外观类常设计为单例 |

## 常见问题

### 1. 单例与静态类的区别

| 特性 | 单例模式 | 静态类 |
|------|---------|--------|
| 实例化 | 有实例 | 无实例 |
| 继承 | 可以继承 | 不能继承 |
| 接口 | 可以实现接口 | 不能实现接口 |
| 延迟加载 | 支持 | 不支持 |
| 状态 | 可以维护状态 | 只能维护静态状态 |

### 2. 多线程环境下的安全性

```java
public class ThreadSafeSingleton {
    private static volatile ThreadSafeSingleton instance;
    
    private ThreadSafeSingleton() {}
    
    public static ThreadSafeSingleton getInstance() {
        ThreadSafeSingleton result = instance;
        if (result == null) {
            synchronized (ThreadSafeSingleton.class) {
                result = instance;
                if (result == null) {
                    instance = result = new ThreadSafeSingleton();
                }
            }
        }
        return result;
    }
}
```

## 总结

单例模式是 GoF 23 种设计模式中最简单、最常用的模式之一。它确保一个类只有一个实例，并提供全局访问点。在实际开发中，推荐使用枚举方式实现单例，因为它天然支持线程安全、防止反射攻击和序列化问题。
