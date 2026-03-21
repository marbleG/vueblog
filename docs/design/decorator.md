# 装饰器模式（Decorator）

## 模式定义

装饰器模式（Decorator Pattern）是一种结构型设计模式，它动态地给一个对象添加一些额外的职责，就增加功能来说，装饰器模式比生成子类更为灵活。

## 核心思想

通过创建包装对象（装饰器）来包裹真实对象，并在保持真实对象接口不变的前提下，动态地扩展其功能。

## 结构组成

装饰器模式包含四个核心角色：

| 角色 | 职责 |
|------|------|
| **组件（Component）** | 定义对象的接口，可以给这些对象动态添加职责 |
| **具体组件（Concrete Component）** | 定义一个具体的对象，可以给这个对象添加职责 |
| **装饰器（Decorator）** | 持有一个组件对象的引用，并实现组件接口 |
| **具体装饰器（Concrete Decorator）** | 向组件添加具体的职责 |

## 代码示例

### 场景描述

假设我们需要为咖啡店设计一个订单系统，咖啡可以添加各种配料（牛奶、糖、摩卡等），使用装饰器模式来实现。

### 实现代码

```java
// 组件：饮料接口
public interface Beverage {
    String getDescription();
    double getCost();
}

// 具体组件：浓缩咖啡
public class Espresso implements Beverage {
    @Override
    public String getDescription() {
        return "浓缩咖啡";
    }
    
    @Override
    public double getCost() {
        return 2.0;
    }
}

// 具体组件：混合咖啡
public class HouseBlend implements Beverage {
    @Override
    public String getDescription() {
        return "混合咖啡";
    }
    
    @Override
    public double getCost() {
        return 1.5;
    }
}

// 装饰器：配料装饰器
public abstract class CondimentDecorator implements Beverage {
    protected Beverage beverage;
    
    public CondimentDecorator(Beverage beverage) {
        this.beverage = beverage;
    }
}

// 具体装饰器：牛奶
public class Milk extends CondimentDecorator {
    public Milk(Beverage beverage) {
        super(beverage);
    }
    
    @Override
    public String getDescription() {
        return beverage.getDescription() + " + 牛奶";
    }
    
    @Override
    public double getCost() {
        return beverage.getCost() + 0.5;
    }
}

// 具体装饰器：摩卡
public class Mocha extends CondimentDecorator {
    public Mocha(Beverage beverage) {
        super(beverage);
    }
    
    @Override
    public String getDescription() {
        return beverage.getDescription() + " + 摩卡";
    }
    
    @Override
    public double getCost() {
        return beverage.getCost() + 0.8;
    }
}

// 具体装饰器：糖
public class Sugar extends CondimentDecorator {
    public Sugar(Beverage beverage) {
        super(beverage);
    }
    
    @Override
    public String getDescription() {
        return beverage.getDescription() + " + 糖";
    }
    
    @Override
    public double getCost() {
        return beverage.getCost() + 0.2;
    }
}

// 客户端使用
public class Client {
    public static void main(String[] args) {
        Beverage beverage = new Espresso();
        System.out.println(beverage.getDescription() + " $" + beverage.getCost());
        
        beverage = new Milk(beverage);
        beverage = new Mocha(beverage);
        beverage = new Sugar(beverage);
        
        System.out.println(beverage.getDescription() + " $" + beverage.getCost());
    }
}
```

### Python 实现

```python
from abc import ABC, abstractmethod

class Beverage(ABC):
    @abstractmethod
    def get_description(self) -> str:
        pass
    
    @abstractmethod
    def get_cost(self) -> float:
        pass

class Espresso(Beverage):
    def get_description(self) -> str:
        return "浓缩咖啡"
    
    def get_cost(self) -> float:
        return 2.0

class HouseBlend(Beverage):
    def get_description(self) -> str:
        return "混合咖啡"
    
    def get_cost(self) -> float:
        return 1.5

class CondimentDecorator(Beverage):
    def __init__(self, beverage: Beverage):
        self.beverage = beverage

class Milk(CondimentDecorator):
    def get_description(self) -> str:
        return f"{self.beverage.get_description()} + 牛奶"
    
    def get_cost(self) -> float:
        return self.beverage.get_cost() + 0.5

class Mocha(CondimentDecorator):
    def get_description(self) -> str:
        return f"{self.beverage.get_description()} + 摩卡"
    
    def get_cost(self) -> float:
        return self.beverage.get_cost() + 0.8

if __name__ == "__main__":
    beverage = Espresso()
    print(f"{beverage.get_description()} ${beverage.get_cost()}")
    
    beverage = Milk(beverage)
    beverage = Mocha(beverage)
    
    print(f"{beverage.get_description()} ${beverage.get_cost()}")
```

## 应用场景

### 适用场景

1. **动态扩展功能**：需要在运行时动态地给对象添加功能
2. **避免继承爆炸**：通过组合而非继承来扩展功能
3. **功能叠加**：需要将多个功能叠加使用

### 实际应用案例

| 应用场景 | 说明 |
|---------|------|
| **Java IO** | BufferedReader、DataInputStream 等都是装饰器 |
| **Spring Wrapper** | HttpServletRequestWrapper |
| **Python 装饰器** | @decorator 语法糖 |
| **日志框架** | 日志记录器的包装 |

## 优缺点分析

### 优点

| 优点 | 说明 |
|------|------|
| **灵活性高** | 可以动态添加或删除功能 |
| **避免继承** | 通过组合扩展功能，避免类爆炸 |
| **单一职责** | 每个装饰器只负责一个功能 |
| **开闭原则** | 新增装饰器无需修改现有代码 |

### 缺点

| 缺点 | 说明 |
|------|------|
| **复杂度增加** | 会产生很多小对象 |
| **调试困难** | 多层装饰时调试复杂 |
| **顺序敏感** | 装饰顺序可能影响结果 |

## 最佳实践

### 1. 透明装饰器

```java
public class TransparentDecorator implements Component {
    private Component component;
    
    public TransparentDecorator(Component component) {
        this.component = component;
    }
    
    @Override
    public void operation() {
        component.operation();
    }
}
```

### 2. 半透明装饰器

```java
public class SemiTransparentDecorator implements Component {
    private Component component;
    
    public SemiTransparentDecorator(Component component) {
        this.component = component;
    }
    
    @Override
    public void operation() {
        component.operation();
    }
    
    public void addedBehavior() {
        System.out.println("新增的行为");
    }
}
```

## 与其他模式的关系

| 模式 | 关系 |
|------|------|
| **适配器模式** | 适配器改变接口，装饰器增强功能 |
| **代理模式** | 代理控制访问，装饰器添加功能 |
| **组合模式** | 装饰器是一种特殊的组合模式 |

## 总结

装饰器模式是 GoF 23 种设计模式之一，它通过组合的方式动态地给对象添加功能，比继承更加灵活。Java IO 流是装饰器模式的经典应用。
