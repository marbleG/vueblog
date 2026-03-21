# 简单工厂模式（Simple Factory）

## 模式定义

简单工厂模式（Simple Factory Pattern）是一种创建型设计模式，它提供一个统一的工厂类来负责创建不同类型的对象，客户端无需知道具体对象的创建细节，只需要通过工厂类传入参数即可获取所需对象。

::: warning 注意
简单工厂模式并不属于 GoF 23 种设计模式之一，但它是工厂模式家族中最简单、最常用的一种，是学习工厂方法模式和抽象工厂模式的基础。
:::

## 核心思想

将对象的创建逻辑封装在一个工厂类中，通过参数决定创建哪种具体产品，客户端只需与工厂交互，无需直接实例化具体产品类。

## 结构组成

简单工厂模式包含三个核心角色：

| 角色 | 职责 |
|------|------|
| **工厂类（Factory）** | 负责创建具体产品对象的核心类，包含创建逻辑 |
| **抽象产品（Product）** | 定义产品的公共接口，是所有具体产品的父类或接口 |
| **具体产品（Concrete Product）** | 工厂创建的具体对象，实现抽象产品接口 |

## 代码示例

### 场景描述

假设我们需要创建不同类型的图表（柱状图、折线图、饼图），使用简单工厂模式来实现。

### 实现代码

```java
// 抽象产品：图表接口
public interface Chart {
    void display();
}

// 具体产品：柱状图
public class BarChart implements Chart {
    @Override
    public void display() {
        System.out.println("显示柱状图");
    }
}

// 具体产品：折线图
public class LineChart implements Chart {
    @Override
    public void display() {
        System.out.println("显示折线图");
    }
}

// 具体产品：饼图
public class PieChart implements Chart {
    @Override
    public void display() {
        System.out.println("显示饼图");
    }
}

// 工厂类：图表工厂
public class ChartFactory {
    public static Chart createChart(String type) {
        switch (type.toLowerCase()) {
            case "bar":
                return new BarChart();
            case "line":
                return new LineChart();
            case "pie":
                return new PieChart();
            default:
                throw new IllegalArgumentException("不支持的图表类型: " + type);
        }
    }
}

// 客户端使用
public class Client {
    public static void main(String[] args) {
        Chart barChart = ChartFactory.createChart("bar");
        barChart.display();  // 输出：显示柱状图
        
        Chart lineChart = ChartFactory.createChart("line");
        lineChart.display();  // 输出：显示折线图
    }
}
```

### Python 实现

```python
from abc import ABC, abstractmethod

# 抽象产品
class Chart(ABC):
    @abstractmethod
    def display(self):
        pass

# 具体产品
class BarChart(Chart):
    def display(self):
        print("显示柱状图")

class LineChart(Chart):
    def display(self):
        print("显示折线图")

class PieChart(Chart):
    def display(self):
        print("显示饼图")

# 工厂类
class ChartFactory:
    @staticmethod
    def create_chart(chart_type: str) -> Chart:
        chart_map = {
            "bar": BarChart,
            "line": LineChart,
            "pie": PieChart
        }
        if chart_type.lower() not in chart_map:
            raise ValueError(f"不支持的图表类型: {chart_type}")
        return chart_map[chart_type.lower()]()

# 客户端使用
if __name__ == "__main__":
    chart = ChartFactory.create_chart("bar")
    chart.display()
```

## 应用场景

### 适用场景

1. **对象创建逻辑简单**：需要创建的对象种类较少，创建逻辑不复杂
2. **客户端无需知道创建细节**：客户端只关心获取对象，不关心对象如何创建
3. **统一管理对象创建**：需要对对象创建进行集中管理和控制
4. **降低耦合度**：希望将对象创建与使用分离

### 实际应用案例

| 应用场景 | 说明 |
|---------|------|
| **日志记录器** | 根据配置创建不同类型的日志记录器（文件、数据库、控制台） |
| **数据库连接** | 根据数据库类型创建对应的连接对象 |
| **支付方式** | 根据支付类型创建不同的支付处理器 |
| **解析器** | 根据文件格式创建对应的解析器 |

## 优缺点分析

### 优点

| 优点 | 说明 |
|------|------|
| **封装创建逻辑** | 将对象创建逻辑集中管理，便于维护 |
| **降低耦合** | 客户端无需知道具体类名，只需传入参数 |
| **使用简单** | 客户端调用简单，无需关心创建细节 |
| **便于扩展** | 新增产品类型只需修改工厂类 |

### 缺点

| 缺点 | 说明 |
|------|------|
| **违反开闭原则** | 新增产品需要修改工厂类代码 |
| **工厂职责过重** | 所有产品创建逻辑集中在一个类，代码可能臃肿 |
| **不易扩展** | 产品类型过多时，工厂类会变得复杂 |
| **静态方法限制** | 通常使用静态方法，不利于继承和扩展 |

## 最佳实践

### 1. 使用配置文件

将产品类型与类名的映射关系放在配置文件中，避免硬编码：

```java
public class ChartFactory {
    private static final Properties config = new Properties();
    
    static {
        try {
            config.load(ChartFactory.class.getResourceAsStream("chart.properties"));
        } catch (IOException e) {
            throw new RuntimeException("加载配置文件失败", e);
        }
    }
    
    public static Chart createChart(String type) {
        String className = config.getProperty(type);
        if (className == null) {
            throw new IllegalArgumentException("不支持的图表类型: " + type);
        }
        try {
            return (Chart) Class.forName(className).newInstance();
        } catch (Exception e) {
            throw new RuntimeException("创建图表失败", e);
        }
    }
}
```

### 2. 使用枚举优化

```java
public enum ChartType {
    BAR(BarChart.class),
    LINE(LineChart.class),
    PIE(PieChart.class);
    
    private Class<? extends Chart> chartClass;
    
    ChartType(Class<? extends Chart> chartClass) {
        this.chartClass = chartClass;
    }
    
    public Chart createInstance() {
        try {
            return chartClass.newInstance();
        } catch (Exception e) {
            throw new RuntimeException("创建图表失败", e);
        }
    }
}
```

### 3. 结合反射机制

```java
public class ChartFactory {
    private static final Map<String, Class<? extends Chart>> chartMap = new HashMap<>();
    
    static {
        // 通过反射自动注册所有图表类型
        chartMap.put("bar", BarChart.class);
        chartMap.put("line", LineChart.class);
        chartMap.put("pie", PieChart.class);
    }
    
    public static Chart createChart(String type) {
        Class<? extends Chart> chartClass = chartMap.get(type.toLowerCase());
        if (chartClass == null) {
            throw new IllegalArgumentException("不支持的图表类型: " + type);
        }
        try {
            return chartClass.getDeclaredConstructor().newInstance();
        } catch (Exception e) {
            throw new RuntimeException("创建图表失败", e);
        }
    }
}
```

## 与其他模式的关系

| 模式 | 关系 |
|------|------|
| **工厂方法模式** | 简单工厂的升级版，将工厂抽象化，支持扩展 |
| **抽象工厂模式** | 工厂方法的升级版，支持创建产品族 |
| **策略模式** | 可以结合使用，工厂创建策略对象 |
| **单例模式** | 工厂类常设计为单例 |

## 总结

简单工厂模式是最基础的创建型模式，虽然不属于 GoF 23 种设计模式，但在实际开发中应用广泛。它适合产品种类较少、创建逻辑简单的场景。当产品种类增多或创建逻辑复杂时，应考虑使用工厂方法模式或抽象工厂模式。

::: tip 学习建议
掌握简单工厂模式是理解工厂方法模式和抽象工厂模式的基础，建议先熟练掌握简单工厂，再学习更复杂的工厂模式。
:::
