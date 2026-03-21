# 外观模式（Facade）

## 模式定义

外观模式（Facade Pattern）是一种结构型设计模式，它为子系统中的一组接口提供一个统一的高层接口，使得子系统更容易使用。

## 核心思想

通过引入一个外观类，将复杂的子系统接口封装起来，为客户端提供一个简单的调用入口。

## 结构组成

外观模式包含两个核心角色：

| 角色 | 职责 |
|------|------|
| **外观（Facade）** | 为子系统提供统一的高层接口 |
| **子系统（Subsystem）** | 实现具体功能，被外观类调用 |

## 代码示例

### 场景描述

假设我们需要实现一个智能家居系统，包含灯光、空调、电视等设备，使用外观模式来简化操作。

### 实现代码

```java
// 子系统：灯光
public class Light {
    public void on() {
        System.out.println("打开灯光");
    }
    
    public void off() {
        System.out.println("关闭灯光");
    }
    
    public void dim(int level) {
        System.out.println("灯光调暗到 " + level + "%");
    }
}

// 子系统：空调
public class AirConditioner {
    public void on() {
        System.out.println("打开空调");
    }
    
    public void off() {
        System.out.println("关闭空调");
    }
    
    public void setTemperature(int temp) {
        System.out.println("设置温度为 " + temp + "°C");
    }
}

// 子系统：电视
public class Television {
    public void on() {
        System.out.println("打开电视");
    }
    
    public void off() {
        System.out.println("关闭电视");
    }
    
    public void setChannel(int channel) {
        System.out.println("切换到频道 " + channel);
    }
}

// 外观：智能家居控制器
public class SmartHomeController {
    private Light light;
    private AirConditioner airConditioner;
    private Television television;
    
    public SmartHomeController() {
        light = new Light();
        airConditioner = new AirConditioner();
        television = new Television();
    }
    
    public void watchMovie() {
        System.out.println("=== 准备看电影 ===");
        light.dim(20);
        airConditioner.on();
        airConditioner.setTemperature(24);
        television.on();
    }
    
    public void sleep() {
        System.out.println("=== 准备睡觉 ===");
        light.off();
        airConditioner.on();
        airConditioner.setTemperature(26);
        television.off();
    }
    
    public void leaveHome() {
        System.out.println("=== 离开家 ===");
        light.off();
        airConditioner.off();
        television.off();
    }
}

// 客户端使用
public class Client {
    public static void main(String[] args) {
        SmartHomeController controller = new SmartHomeController();
        
        controller.watchMovie();
        System.out.println();
        controller.sleep();
        System.out.println();
        controller.leaveHome();
    }
}
```

### Python 实现

```python
class Light:
    def on(self):
        print("打开灯光")
    
    def off(self):
        print("关闭灯光")
    
    def dim(self, level: int):
        print(f"灯光调暗到 {level}%")

class AirConditioner:
    def on(self):
        print("打开空调")
    
    def off(self):
        print("关闭空调")
    
    def set_temperature(self, temp: int):
        print(f"设置温度为 {temp}°C")

class Television:
    def on(self):
        print("打开电视")
    
    def off(self):
        print("关闭电视")
    
    def set_channel(self, channel: int):
        print(f"切换到频道 {channel}")

class SmartHomeController:
    def __init__(self):
        self.light = Light()
        self.air_conditioner = AirConditioner()
        self.television = Television()
    
    def watch_movie(self):
        print("=== 准备看电影 ===")
        self.light.dim(20)
        self.air_conditioner.on()
        self.air_conditioner.set_temperature(24)
        self.television.on()
    
    def sleep(self):
        print("=== 准备睡觉 ===")
        self.light.off()
        self.air_conditioner.on()
        self.air_conditioner.set_temperature(26)
        self.television.off()
    
    def leave_home(self):
        print("=== 离开家 ===")
        self.light.off()
        self.air_conditioner.off()
        self.television.off()

if __name__ == "__main__":
    controller = SmartHomeController()
    controller.watch_movie()
    controller.sleep()
    controller.leave_home()
```

## 应用场景

### 适用场景

1. **简化接口**：为复杂的子系统提供简单的接口
2. **分层设计**：在分层架构中为每层提供入口
3. **解耦**：减少客户端与子系统之间的耦合

### 实际应用案例

| 应用场景 | 说明 |
|---------|------|
| **JDBC** | DriverManager 是数据库操作的外观 |
| **Spring** | JdbcTemplate 是 JDBC 操作的外观 |
| **Tomcat** | RequestFacade 封装 Request |
| **日志框架** | SLF4J 是日志框架的外观 |

## 优缺点分析

### 优点

| 优点 | 说明 |
|------|------|
| **简化使用** | 客户端不需要了解子系统细节 |
| **解耦** | 减少客户端与子系统的耦合 |
| **分层清晰** | 有助于建立分层架构 |
| **符合迪米特法则** | 只与直接朋友通信 |

### 缺点

| 缺点 | 说明 |
|------|------|
| **不符合开闭原则** | 修改子系统可能需要修改外观类 |
| **可能成为上帝对象** | 外观类可能变得过于庞大 |

## 最佳实践

### 1. 多个外观类

```java
public class MovieFacade {
    private Light light;
    private Television television;
    
    public void watchMovie() {
        light.dim(20);
        television.on();
    }
}

public class SleepFacade {
    private Light light;
    private AirConditioner airConditioner;
    
    public void sleep() {
        light.off();
        airConditioner.on();
    }
}
```

### 2. 外观类的继承

```java
public class EnhancedSmartHomeController extends SmartHomeController {
    private SecuritySystem securitySystem;
    
    public void leaveHome() {
        super.leaveHome();
        securitySystem.arm();
    }
}
```

## 与其他模式的关系

| 模式 | 关系 |
|------|------|
| **抽象工厂模式** | 可以结合使用，外观使用工厂创建子系统对象 |
| **中介者模式** | 外观是单向调用，中介者是双向通信 |
| **单例模式** | 外观类常设计为单例 |

## 总结

外观模式是 GoF 23 种设计模式之一，它为复杂的子系统提供一个简单的高层接口，使得子系统更容易使用。外观模式在分层架构中应用广泛，有助于降低系统的复杂度。
