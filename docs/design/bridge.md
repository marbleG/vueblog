# 桥接模式（Bridge）

## 模式定义

桥接模式（Bridge Pattern）是一种结构型设计模式，它将抽象部分与实现部分分离，使它们都可以独立地变化。

## 核心思想

通过组合的方式建立两个类层次结构之间的联系，将抽象与实现解耦，使两者可以独立扩展。

## 结构组成

桥接模式包含四个核心角色：

| 角色 | 职责 |
|------|------|
| **抽象（Abstraction）** | 定义抽象接口，维护对实现者的引用 |
| **扩展抽象（Refined Abstraction）** | 扩展抽象接口 |
| **实现者（Implementor）** | 定义实现接口，不与抽象接口对应 |
| **具体实现者（Concrete Implementor）** | 实现实现者接口的具体类 |

## 代码示例

### 场景描述

假设我们需要创建不同形状（圆形、矩形）并使用不同颜色（红色、蓝色）绘制，使用桥接模式来实现。

### 实现代码

```java
// 实现者：颜色接口
public interface Color {
    void applyColor();
}

// 具体实现者：红色
public class RedColor implements Color {
    @Override
    public void applyColor() {
        System.out.println("应用红色");
    }
}

// 具体实现者：蓝色
public class BlueColor implements Color {
    @Override
    public void applyColor() {
        System.out.println("应用蓝色");
    }
}

// 抽象：形状
public abstract class Shape {
    protected Color color;
    
    public Shape(Color color) {
        this.color = color;
    }
    
    public abstract void draw();
}

// 扩展抽象：圆形
public class Circle extends Shape {
    public Circle(Color color) {
        super(color);
    }
    
    @Override
    public void draw() {
        System.out.print("绘制圆形 - ");
        color.applyColor();
    }
}

// 扩展抽象：矩形
public class Rectangle extends Shape {
    public Rectangle(Color color) {
        super(color);
    }
    
    @Override
    public void draw() {
        System.out.print("绘制矩形 - ");
        color.applyColor();
    }
}

// 客户端使用
public class Client {
    public static void main(String[] args) {
        Shape redCircle = new Circle(new RedColor());
        Shape blueCircle = new Circle(new BlueColor());
        Shape redRectangle = new Rectangle(new RedColor());
        
        redCircle.draw();
        blueCircle.draw();
        redRectangle.draw();
    }
}
```

### Python 实现

```python
from abc import ABC, abstractmethod

class Color(ABC):
    @abstractmethod
    def apply_color(self):
        pass

class RedColor(Color):
    def apply_color(self):
        print("应用红色")

class BlueColor(Color):
    def apply_color(self):
        print("应用蓝色")

class Shape(ABC):
    def __init__(self, color: Color):
        self.color = color
    
    @abstractmethod
    def draw(self):
        pass

class Circle(Shape):
    def draw(self):
        print("绘制圆形 - ", end="")
        self.color.apply_color()

class Rectangle(Shape):
    def draw(self):
        print("绘制矩形 - ", end="")
        self.color.apply_color()

if __name__ == "__main__":
    red_circle = Circle(RedColor())
    blue_circle = Circle(BlueColor())
    red_rectangle = Rectangle(RedColor())
    
    red_circle.draw()
    blue_circle.draw()
    red_rectangle.draw()
```

## 应用场景

### 适用场景

1. **多维变化**：系统需要在多个维度上独立扩展
2. **避免继承爆炸**：避免使用继承造成类数量急剧增加
3. **运行时切换**：需要在运行时切换实现
4. **跨平台**：支持多种平台或数据库

### 实际应用案例

| 应用场景 | 说明 |
|---------|------|
| **JDBC** | 数据库驱动与 JDBC API 的桥接 |
| **GUI 框架** | 不同操作系统下的窗口实现 |
| **设备驱动** | 设备接口与操作系统实现的桥接 |
| **日志框架** | 日志接口与不同日志实现的桥接 |

## 优缺点分析

### 优点

| 优点 | 说明 |
|------|------|
| **分离抽象和实现** | 两个维度可以独立变化 |
| **开闭原则** | 新增抽象和实现无需修改现有代码 |
| **单一职责** | 抽象和实现分离，职责清晰 |
| **运行时切换** | 可以在运行时切换实现 |

### 缺点

| 缺点 | 说明 |
|------|------|
| **复杂度增加** | 需要新增接口和实现类 |
| **理解难度** | 需要正确识别两个变化的维度 |

## 最佳实践

### 1. 使用场景判断

```java
public interface DrawAPI {
    void drawCircle(int radius, int x, int y);
}

public class RedCircle implements DrawAPI {
    @Override
    public void drawCircle(int radius, int x, int y) {
        System.out.println("绘制红色圆形: 半径=" + radius + ", 位置=(" + x + "," + y + ")");
    }
}

public class GreenCircle implements DrawAPI {
    @Override
    public void drawCircle(int radius, int x, int y) {
        System.out.println("绘制绿色圆形: 半径=" + radius + ", 位置=(" + x + "," + y + ")");
    }
}

public abstract class Shape {
    protected DrawAPI drawAPI;
    
    protected Shape(DrawAPI drawAPI) {
        this.drawAPI = drawAPI;
    }
    
    public abstract void draw();
}

public class CircleShape extends Shape {
    private int x, y, radius;
    
    public CircleShape(int x, int y, int radius, DrawAPI drawAPI) {
        super(drawAPI);
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    
    @Override
    public void draw() {
        drawAPI.drawCircle(radius, x, y);
    }
}
```

### 2. 结合工厂模式

```java
public class ShapeFactory {
    public static Shape createCircle(int x, int y, int radius, String color) {
        DrawAPI drawAPI = ColorFactory.createDrawAPI(color);
        return new CircleShape(x, y, radius, drawAPI);
    }
}
```

## 与其他模式的关系

| 模式 | 关系 |
|------|------|
| **适配器模式** | 适配器改变接口，桥接分离接口和实现 |
| **策略模式** | 策略模式使用组合，桥接模式结构类似 |
| **抽象工厂模式** | 可以结合使用创建桥接对象 |

## 总结

桥接模式是 GoF 23 种设计模式之一，它将抽象与实现分离，使两者可以独立变化。适用于需要在多个维度上扩展的系统，可以避免继承爆炸问题。
