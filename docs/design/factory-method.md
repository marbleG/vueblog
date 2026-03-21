# 工厂方法模式（Factory Method）

## 模式定义

工厂方法模式（Factory Method Pattern）是一种创建型设计模式，它定义一个创建对象的接口，让子类决定实例化哪一个类。工厂方法使一个类的实例化延迟到其子类。

## 核心思想

将对象的创建委托给工厂子类，通过多态性实现不同产品的创建，客户端只需与抽象工厂交互，无需知道具体产品类。

## 结构组成

工厂方法模式包含四个核心角色：

| 角色 | 职责 |
|------|------|
| **抽象工厂（Factory）** | 声明工厂方法的接口，返回抽象产品类型 |
| **具体工厂（Concrete Factory）** | 实现工厂方法，返回具体产品实例 |
| **抽象产品（Product）** | 定义产品的公共接口 |
| **具体产品（Concrete Product）** | 实现抽象产品接口，是工厂创建的目标对象 |

## 代码示例

### 场景描述

假设我们需要创建不同类型的日志记录器（文件日志、数据库日志），使用工厂方法模式来实现。

### 实现代码

```java
// 抽象产品：日志记录器接口
public interface Logger {
    void writeLog(String message);
}

// 具体产品：文件日志记录器
public class FileLogger implements Logger {
    @Override
    public void writeLog(String message) {
        System.out.println("文件日志记录：" + message);
    }
}

// 具体产品：数据库日志记录器
public class DatabaseLogger implements Logger {
    @Override
    public void writeLog(String message) {
        System.out.println("数据库日志记录：" + message);
    }
}

// 抽象工厂：日志工厂接口
public interface LoggerFactory {
    Logger createLogger();
}

// 具体工厂：文件日志工厂
public class FileLoggerFactory implements LoggerFactory {
    @Override
    public Logger createLogger() {
        return new FileLogger();
    }
}

// 具体工厂：数据库日志工厂
public class DatabaseLoggerFactory implements LoggerFactory {
    @Override
    public Logger createLogger() {
        return new DatabaseLogger();
    }
}

// 客户端使用
public class Client {
    public static void main(String[] args) {
        LoggerFactory factory = new FileLoggerFactory();
        Logger logger = factory.createLogger();
        logger.writeLog("系统启动成功");
    }
}
```

### Python 实现

```python
from abc import ABC, abstractmethod

# 抽象产品
class Logger(ABC):
    @abstractmethod
    def write_log(self, message: str):
        pass

# 具体产品
class FileLogger(Logger):
    def write_log(self, message: str):
        print(f"文件日志记录：{message}")

class DatabaseLogger(Logger):
    def write_log(self, message: str):
        print(f"数据库日志记录：{message}")

# 抽象工厂
class LoggerFactory(ABC):
    @abstractmethod
    def create_logger(self) -> Logger:
        pass

# 具体工厂
class FileLoggerFactory(LoggerFactory):
    def create_logger(self) -> Logger:
        return FileLogger()

class DatabaseLoggerFactory(LoggerFactory):
    def create_logger(self) -> Logger:
        return DatabaseLogger()

# 客户端使用
if __name__ == "__main__":
    factory: LoggerFactory = FileLoggerFactory()
    logger = factory.create_logger()
    logger.write_log("系统启动成功")
```

## 应用场景

### 适用场景

1. **无法预知对象类型**：客户端不需要知道具体产品类名，只需要知道对应的工厂
2. **希望由子类决定创建**：将创建逻辑委托给子类，实现延迟绑定
3. **扩展性要求高**：新增产品只需新增工厂类，无需修改现有代码

### 实际应用案例

| 应用场景 | 说明 |
|---------|------|
| **JDBC** | 不同数据库的连接工厂 |
| **Spring BeanFactory** | Spring 容器中的 Bean 工厂 |
| **日志框架** | 不同日志实现的工厂 |
| **消息队列** | 不同消息中间件的工厂 |

## 优缺点分析

### 优点

| 优点 | 说明 |
|------|------|
| **符合开闭原则** | 新增产品只需新增工厂类，无需修改现有代码 |
| **符合单一职责** | 每个工厂只负责创建一种产品 |
| **灵活性高** | 客户端可以动态选择工厂 |
| **解耦** | 客户端与具体产品类解耦 |

### 缺点

| 缺点 | 说明 |
|------|------|
| **类数量增加** | 每新增一个产品需要新增一个工厂类 |
| **增加复杂度** | 相比简单工厂，结构更复杂 |
| **只支持同类产品** | 一个工厂只能创建一种产品 |

## 最佳实践

### 1. 使用泛型优化

```java
public interface Factory<T> {
    T create();
}

public class FileLoggerFactory implements Factory<Logger> {
    @Override
    public Logger create() {
        return new FileLogger();
    }
}
```

### 2. 结合配置文件

```java
public class LoggerFactory {
    private static final Map<String, Class<? extends Logger>> loggerMap = new HashMap<>();
    
    static {
        Properties props = loadConfig();
        for (String key : props.stringPropertyNames()) {
            try {
                loggerMap.put(key, (Class<? extends Logger>) Class.forName(props.getProperty(key)));
            } catch (ClassNotFoundException e) {
                e.printStackTrace();
            }
        }
    }
    
    public static Logger createLogger(String type) {
        try {
            return loggerMap.get(type).getDeclaredConstructor().newInstance();
        } catch (Exception e) {
            throw new RuntimeException("创建日志记录器失败", e);
        }
    }
}
```

## 与其他模式的关系

| 模式 | 关系 |
|------|------|
| **简单工厂模式** | 工厂方法是简单工厂的升级版，支持扩展 |
| **抽象工厂模式** | 抽象工厂是工厂方法的升级版，支持产品族 |
| **模板方法模式** | 工厂方法常在模板方法中使用 |

## 总结

工厂方法模式是 GoF 23 种设计模式之一，它通过将对象的创建委托给子类，实现了创建逻辑与使用逻辑的解耦，符合开闭原则，是面向对象设计中最重要的创建型模式之一。
