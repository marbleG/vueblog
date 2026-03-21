# 建造者模式（Builder）

## 模式定义

建造者模式（Builder Pattern）是一种创建型设计模式，它将一个复杂对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示。

## 核心思想

将复杂对象的构建过程分解为多个步骤，通过指挥者控制构建流程，建造者负责具体的构建实现，客户端无需了解构建细节。

## 结构组成

建造者模式包含四个核心角色：

| 角色 | 职责 |
|------|------|
| **抽象建造者（Builder）** | 定义创建产品各个部件的抽象接口 |
| **具体建造者（Concrete Builder）** | 实现抽象建造者接口，构建和装配各个部件 |
| **指挥者（Director）** | 构建使用建造者接口的对象，控制构建流程 |
| **产品（Product）** | 被构建的复杂对象，包含多个组成部件 |

## 代码示例

### 场景描述

假设我们需要构建一台电脑，包含 CPU、内存、硬盘、显卡等部件，使用建造者模式来实现。

### 实现代码

```java
// 产品：电脑
public class Computer {
    private String cpu;
    private String ram;
    private String storage;
    private String gpu;
    
    public void setCpu(String cpu) { this.cpu = cpu; }
    public void setRam(String ram) { this.ram = ram; }
    public void setStorage(String storage) { this.storage = storage; }
    public void setGpu(String gpu) { this.gpu = gpu; }
    
    @Override
    public String toString() {
        return "Computer{" +
                "cpu='" + cpu + '\'' +
                ", ram='" + ram + '\'' +
                ", storage='" + storage + '\'' +
                ", gpu='" + gpu + '\'' +
                '}';
    }
}

// 抽象建造者
public interface ComputerBuilder {
    ComputerBuilder buildCpu(String cpu);
    ComputerBuilder buildRam(String ram);
    ComputerBuilder buildStorage(String storage);
    ComputerBuilder buildGpu(String gpu);
    Computer build();
}

// 具体建造者：游戏电脑建造者
public class GamingComputerBuilder implements ComputerBuilder {
    private Computer computer = new Computer();
    
    @Override
    public ComputerBuilder buildCpu(String cpu) {
        computer.setCpu(cpu);
        return this;
    }
    
    @Override
    public ComputerBuilder buildRam(String ram) {
        computer.setRam(ram);
        return this;
    }
    
    @Override
    public ComputerBuilder buildStorage(String storage) {
        computer.setStorage(storage);
        return this;
    }
    
    @Override
    public ComputerBuilder buildGpu(String gpu) {
        computer.setGpu(gpu);
        return this;
    }
    
    @Override
    public Computer build() {
        return computer;
    }
}

// 指挥者
public class ComputerDirector {
    public Computer buildGamingComputer() {
        return new GamingComputerBuilder()
                .buildCpu("Intel i9")
                .buildRam("32GB DDR5")
                .buildStorage("1TB NVMe SSD")
                .buildGpu("RTX 4090")
                .build();
    }
    
    public Computer buildOfficeComputer() {
        return new GamingComputerBuilder()
                .buildCpu("Intel i5")
                .buildRam("16GB DDR4")
                .buildStorage("512GB SSD")
                .build();
    }
}

// 客户端使用
public class Client {
    public static void main(String[] args) {
        ComputerDirector director = new ComputerDirector();
        Computer gamingComputer = director.buildGamingComputer();
        System.out.println(gamingComputer);
    }
}
```

### 链式调用实现

```java
public class Computer {
    private String cpu;
    private String ram;
    private String storage;
    private String gpu;
    
    private Computer() {}
    
    public static class Builder {
        private Computer computer = new Computer();
        
        public Builder cpu(String cpu) {
            computer.cpu = cpu;
            return this;
        }
        
        public Builder ram(String ram) {
            computer.ram = ram;
            return this;
        }
        
        public Builder storage(String storage) {
            computer.storage = storage;
            return this;
        }
        
        public Builder gpu(String gpu) {
            computer.gpu = gpu;
            return this;
        }
        
        public Computer build() {
            return computer;
        }
    }
    
    @Override
    public String toString() {
        return "Computer{cpu='" + cpu + "', ram='" + ram + "', storage='" + storage + "', gpu='" + gpu + "'}";
    }
}

// 客户端使用
public class Client {
    public static void main(String[] args) {
        Computer computer = new Computer.Builder()
                .cpu("Intel i9")
                .ram("32GB DDR5")
                .storage("1TB NVMe SSD")
                .gpu("RTX 4090")
                .build();
        System.out.println(computer);
    }
}
```

### Python 实现

```python
from typing import Optional

class Computer:
    def __init__(self):
        self.cpu: Optional[str] = None
        self.ram: Optional[str] = None
        self.storage: Optional[str] = None
        self.gpu: Optional[str] = None
    
    def __str__(self):
        return f"Computer(cpu={self.cpu}, ram={self.ram}, storage={self.storage}, gpu={self.gpu})"

class ComputerBuilder:
    def __init__(self):
        self._computer = Computer()
    
    def cpu(self, cpu: str) -> 'ComputerBuilder':
        self._computer.cpu = cpu
        return self
    
    def ram(self, ram: str) -> 'ComputerBuilder':
        self._computer.ram = ram
        return self
    
    def storage(self, storage: str) -> 'ComputerBuilder':
        self._computer.storage = storage
        return self
    
    def gpu(self, gpu: str) -> 'ComputerBuilder':
        self._computer.gpu = gpu
        return self
    
    def build(self) -> Computer:
        return self._computer

if __name__ == "__main__":
    computer = ComputerBuilder()\
        .cpu("Intel i9")\
        .ram("32GB DDR5")\
        .storage("1TB NVMe SSD")\
        .gpu("RTX 4090")\
        .build()
    print(computer)
```

## 应用场景

### 适用场景

1. **复杂对象创建**：对象有很多属性，需要分步骤设置
2. **参数可选**：很多参数有默认值，可选设置
3. **构建过程稳定**：构建步骤相同，但具体实现不同
4. **避免构造器重载**：避免多个构造函数的重载问题

### 实际应用案例

| 应用场景 | 说明 |
|---------|------|
| **StringBuilder** | Java 中的字符串构建器 |
| **AlertDialog** | Android 中的对话框构建 |
| **OkHttpClient** | OkHttp 的客户端构建 |
| **Lombok @Builder** | 自动生成建造者代码 |

## 优缺点分析

### 优点

| 优点 | 说明 |
|------|------|
| **封装性好** | 隐藏复杂对象的构建细节 |
| **灵活性强** | 可以创建不同的表示 |
| **链式调用** | 代码简洁易读 |
| **参数可控** | 可以校验参数有效性 |

### 缺点

| 缺点 | 说明 |
|------|------|
| **类数量增加** | 需要创建建造者类 |
| **增加复杂度** | 简单对象不需要使用建造者 |

## 最佳实践

### 1. 参数校验

```java
public Computer build() {
    if (computer.cpu == null) {
        throw new IllegalStateException("CPU 不能为空");
    }
    return computer;
}
```

### 2. 必填参数

```java
public class Computer {
    private final String cpu;
    private String ram;
    
    private Computer(String cpu) {
        this.cpu = cpu;
    }
    
    public static class Builder {
        private String cpu;
        
        public Builder(String cpu) {
            this.cpu = cpu;
        }
        
        public Computer build() {
            return new Computer(cpu);
        }
    }
}
```

## 与其他模式的关系

| 模式 | 关系 |
|------|------|
| **工厂方法模式** | 建造者关注分步创建，工厂关注整体创建 |
| **抽象工厂模式** | 建造者返回组装好的产品，抽象工厂返回产品族 |
| **组合模式** | 建造者常用于构建组合结构 |

## 总结

建造者模式是 GoF 23 种设计模式之一，它适用于创建复杂对象的场景，特别是当对象有很多可选参数时。链式调用的建造者模式在实际开发中应用广泛，如 Lombok 的 @Builder 注解。
