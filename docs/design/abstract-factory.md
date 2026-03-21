# 抽象工厂模式（Abstract Factory）

## 模式定义

抽象工厂模式（Abstract Factory Pattern）是一种创建型设计模式，它提供一个创建一系列相关或相互依赖对象的接口，而无需指定它们具体的类。

## 核心思想

将一组相关的产品族封装在一个工厂中，客户端通过抽象工厂接口创建产品族中的所有产品，确保产品之间的兼容性。

## 结构组成

抽象工厂模式包含五个核心角色：

| 角色 | 职责 |
|------|------|
| **抽象工厂（Abstract Factory）** | 声明创建抽象产品对象的方法 |
| **具体工厂（Concrete Factory）** | 实现创建具体产品对象的方法 |
| **抽象产品（Abstract Product）** | 声明产品的公共接口 |
| **具体产品（Concrete Product）** | 实现抽象产品接口，由对应的具体工厂创建 |
| **客户端（Client）** | 使用抽象工厂和抽象产品接口 |

## 代码示例

### 场景描述

假设我们需要创建不同风格的 UI 组件（按钮、文本框），包括 Windows 风格和 Mac 风格，使用抽象工厂模式来实现。

### 实现代码

```java
// 抽象产品：按钮
public interface Button {
    void render();
}

// 抽象产品：文本框
public interface TextBox {
    void display();
}

// 具体产品：Windows 按钮
public class WindowsButton implements Button {
    @Override
    public void render() {
        System.out.println("渲染 Windows 风格按钮");
    }
}

// 具体产品：Windows 文本框
public class WindowsTextBox implements TextBox {
    @Override
    public void display() {
        System.out.println("显示 Windows 风格文本框");
    }
}

// 具体产品：Mac 按钮
public class MacButton implements Button {
    @Override
    public void render() {
        System.out.println("渲染 Mac 风格按钮");
    }
}

// 具体产品：Mac 文本框
public class MacTextBox implements TextBox {
    @Override
    public void display() {
        System.out.println("显示 Mac 风格文本框");
    }
}

// 抽象工厂：UI 工厂
public interface UIFactory {
    Button createButton();
    TextBox createTextBox();
}

// 具体工厂：Windows UI 工厂
public class WindowsUIFactory implements UIFactory {
    @Override
    public Button createButton() {
        return new WindowsButton();
    }
    
    @Override
    public TextBox createTextBox() {
        return new WindowsTextBox();
    }
}

// 具体工厂：Mac UI 工厂
public class MacUIFactory implements UIFactory {
    @Override
    public Button createButton() {
        return new MacButton();
    }
    
    @Override
    public TextBox createTextBox() {
        return new MacTextBox();
    }
}

// 客户端使用
public class Client {
    private Button button;
    private TextBox textBox;
    
    public Client(UIFactory factory) {
        this.button = factory.createButton();
        this.textBox = factory.createTextBox();
    }
    
    public void render() {
        button.render();
        textBox.display();
    }
    
    public static void main(String[] args) {
        UIFactory factory = new WindowsUIFactory();
        Client client = new Client(factory);
        client.render();
    }
}
```

### Python 实现

```python
from abc import ABC, abstractmethod

# 抽象产品
class Button(ABC):
    @abstractmethod
    def render(self):
        pass

class TextBox(ABC):
    @abstractmethod
    def display(self):
        pass

# 具体产品：Windows
class WindowsButton(Button):
    def render(self):
        print("渲染 Windows 风格按钮")

class WindowsTextBox(TextBox):
    def display(self):
        print("显示 Windows 风格文本框")

# 具体产品：Mac
class MacButton(Button):
    def render(self):
        print("渲染 Mac 风格按钮")

class MacTextBox(TextBox):
    def display(self):
        print("显示 Mac 风格文本框")

# 抽象工厂
class UIFactory(ABC):
    @abstractmethod
    def create_button(self) -> Button:
        pass
    
    @abstractmethod
    def create_text_box(self) -> TextBox:
        pass

# 具体工厂
class WindowsUIFactory(UIFactory):
    def create_button(self) -> Button:
        return WindowsButton()
    
    def create_text_box(self) -> TextBox:
        return WindowsTextBox()

class MacUIFactory(UIFactory):
    def create_button(self) -> Button:
        return MacButton()
    
    def create_text_box(self) -> TextBox:
        return MacTextBox()
```

## 应用场景

### 适用场景

1. **产品族创建**：需要创建一系列相关的产品
2. **保证兼容性**：确保产品族中的产品能够协同工作
3. **切换产品族**：需要在不同的产品族之间切换

### 实际应用案例

| 应用场景 | 说明 |
|---------|------|
| **跨平台 UI** | 不同操作系统的 UI 组件 |
| **数据库访问** | 不同数据库的连接、命令、读取器 |
| **主题切换** | 不同主题的 UI 组件 |
| **多数据库支持** | MySQL、Oracle、PostgreSQL 等 |

## 优缺点分析

### 优点

| 优点 | 说明 |
|------|------|
| **隔离具体类** | 客户端与具体产品类解耦 |
| **保证一致性** | 确保同一产品族的产品一起使用 |
| **符合开闭原则** | 新增产品族无需修改现有代码 |
| **符合单一职责** | 每个工厂负责一个产品族 |

### 缺点

| 缺点 | 说明 |
|------|------|
| **扩展困难** | 新增产品需要修改所有工厂类 |
| **类数量增多** | 每个产品族需要一个工厂类 |
| **增加复杂度** | 结构比工厂方法更复杂 |

## 最佳实践

### 1. 使用简单工厂改进

```java
public class UIFactory {
    private static final String WINDOWS = "windows";
    private static final String MAC = "mac";
    
    public static UIFactory getFactory(String type) {
        switch (type.toLowerCase()) {
            case WINDOWS:
                return new WindowsUIFactory();
            case MAC:
                return new MacUIFactory();
            default:
                throw new IllegalArgumentException("不支持的工厂类型");
        }
    }
}
```

### 2. 结合反射

```java
public class FactoryProvider {
    private static final Map<String, Class<? extends UIFactory>> factoryMap = new HashMap<>();
    
    static {
        factoryMap.put("windows", WindowsUIFactory.class);
        factoryMap.put("mac", MacUIFactory.class);
    }
    
    public static UIFactory getFactory(String type) {
        try {
            return factoryMap.get(type.toLowerCase())
                .getDeclaredConstructor()
                .newInstance();
        } catch (Exception e) {
            throw new RuntimeException("获取工厂失败", e);
        }
    }
}
```

## 与其他模式的关系

| 模式 | 关系 |
|------|------|
| **工厂方法模式** | 抽象工厂内部常使用工厂方法 |
| **单例模式** | 具体工厂常设计为单例 |
| **原型模式** | 可以结合使用创建复杂产品 |

## 总结

抽象工厂模式是 GoF 23 种设计模式之一，它适用于需要创建一系列相关产品的场景，能够保证产品族中产品的一致性。当需要新增产品族时非常方便，但新增产品类型时需要修改所有工厂类。
