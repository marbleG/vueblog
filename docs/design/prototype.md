# 原型模式（Prototype）

## 模式定义

原型模式（Prototype Pattern）是一种创建型设计模式，它通过复制现有对象来创建新对象，而不是通过 new 关键字实例化。被复制的对象称为原型，它具有自我复制的能力。

## 核心思想

通过克隆（Clone）现有对象来创建新对象，避免重复初始化代码，提高创建效率，特别适用于创建成本较高的对象。

## 结构组成

原型模式包含两个核心角色：

| 角色 | 职责 |
|------|------|
| **抽象原型（Prototype）** | 声明克隆方法的接口，通常是 Cloneable 接口 |
| **具体原型（Concrete Prototype）** | 实现克隆方法，返回自身的副本 |

## 代码示例

### 场景描述

假设我们需要创建大量相似的简历对象，使用原型模式来提高创建效率。

### 实现代码

```java
// 原型类：简历
public class Resume implements Cloneable {
    private String name;
    private String age;
    private String experience;
    private String education;
    
    public Resume(String name) {
        this.name = name;
    }
    
    public void setAge(String age) { this.age = age; }
    public void setExperience(String experience) { this.experience = experience; }
    public void setEducation(String education) { this.education = education; }
    
    @Override
    public Resume clone() {
        try {
            return (Resume) super.clone();
        } catch (CloneNotSupportedException e) {
            throw new RuntimeException("克隆失败", e);
        }
    }
    
    @Override
    public String toString() {
        return "Resume{name='" + name + "', age='" + age + "', experience='" + experience + "', education='" + education + "'}";
    }
}

// 客户端使用
public class Client {
    public static void main(String[] args) {
        Resume prototype = new Resume("张三");
        prototype.setAge("25");
        prototype.setExperience("3年Java开发经验");
        prototype.setEducation("本科");
        
        Resume clone1 = prototype.clone();
        clone1.setAge("26");
        
        Resume clone2 = prototype.clone();
        clone2.setExperience("5年Java开发经验");
        
        System.out.println(prototype);
        System.out.println(clone1);
        System.out.println(clone2);
    }
}
```

### 深克隆实现

```java
import java.io.*;

public class DeepPrototype implements Serializable {
    private String name;
    private Address address;
    
    public DeepPrototype(String name) {
        this.name = name;
    }
    
    public void setAddress(Address address) {
        this.address = address;
    }
    
    public DeepPrototype deepClone() {
        try {
            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            ObjectOutputStream oos = new ObjectOutputStream(bos);
            oos.writeObject(this);
            
            ByteArrayInputStream bis = new ByteArrayInputStream(bos.toByteArray());
            ObjectInputStream ois = new ObjectInputStream(bis);
            return (DeepPrototype) ois.readObject();
        } catch (Exception e) {
            throw new RuntimeException("深克隆失败", e);
        }
    }
}

class Address implements Serializable {
    private String city;
    private String street;
    
    public Address(String city, String street) {
        this.city = city;
        this.street = street;
    }
}
```

### Python 实现

```python
import copy

class Resume:
    def __init__(self, name: str):
        self.name = name
        self.age = None
        self.experience = None
        self.education = None
    
    def __str__(self):
        return f"Resume(name={self.name}, age={self.age}, experience={self.experience}, education={self.education})"
    
    def clone(self) -> 'Resume':
        return copy.copy(self)
    
    def deep_clone(self) -> 'Resume':
        return copy.deepcopy(self)

if __name__ == "__main__":
    prototype = Resume("张三")
    prototype.age = "25"
    prototype.experience = "3年Java开发经验"
    prototype.education = "本科"
    
    clone1 = prototype.clone()
    clone1.age = "26"
    
    print(prototype)
    print(clone1)
```

## 浅克隆与深克隆

| 类型 | 说明 | 特点 |
|------|------|------|
| **浅克隆** | 只复制对象本身和基本类型属性，引用类型属性仍指向原对象 | 实现简单，但可能引起数据共享问题 |
| **深克隆** | 递归复制所有引用类型属性，创建完全独立的对象 | 实现复杂，但数据完全独立 |

### 浅克隆示例

```java
public class ShallowClone implements Cloneable {
    private String name;
    private int[] scores;
    
    @Override
    protected ShallowClone clone() throws CloneNotSupportedException {
        return (ShallowClone) super.clone();
    }
}

ShallowClone original = new ShallowClone();
original.scores = new int[]{90, 85, 95};
ShallowClone cloned = original.clone();
cloned.scores[0] = 100;
System.out.println(original.scores[0]);
```

## 应用场景

### 适用场景

1. **创建成本高**：对象创建过程复杂或耗时
2. **相似对象多**：需要创建大量相似对象
3. **避免构造函数**：不希望通过构造函数创建对象
4. **动态加载**：运行时动态获取对象类型

### 实际应用案例

| 应用场景 | 说明 |
|---------|------|
| **Java Object.clone()** | Java 内置的克隆机制 |
| **Spring Bean** | 原型作用域的 Bean 创建 |
| **原型注册表** | 存储和检索预初始化对象 |
| **游戏开发** | 创建大量相似的游戏对象 |

## 优缺点分析

### 优点

| 优点 | 说明 |
|------|------|
| **性能提升** | 避免重复初始化，提高创建效率 |
| **简化创建** | 无需知道对象的具体类 |
| **动态添加** | 运行时动态添加或删除原型 |
| **状态保留** | 可以保留对象的内部状态 |

### 缺点

| 缺点 | 说明 |
|------|------|
| **克隆复杂** | 深克隆实现较为复杂 |
| **循环引用** | 存在循环引用时克隆困难 |
| **构造函数跳过** | 克隆不会调用构造函数 |

## 最佳实践

### 1. 原型管理器

```java
public class PrototypeManager {
    private static final Map<String, Prototype> prototypes = new HashMap<>();
    
    public static void addPrototype(String key, Prototype prototype) {
        prototypes.put(key, prototype);
    }
    
    public static Prototype getPrototype(String key) {
        Prototype prototype = prototypes.get(key);
        if (prototype == null) {
            throw new IllegalArgumentException("未找到原型: " + key);
        }
        return prototype.clone();
    }
}
```

### 2. 使用序列化实现深克隆

```java
@SuppressWarnings("unchecked")
public static <T extends Serializable> T deepClone(T object) {
    try {
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        ObjectOutputStream oos = new ObjectOutputStream(bos);
        oos.writeObject(object);
        oos.close();
        
        ByteArrayInputStream bis = new ByteArrayInputStream(bos.toByteArray());
        ObjectInputStream ois = new ObjectInputStream(bis);
        return (T) ois.readObject();
    } catch (Exception e) {
        throw new RuntimeException("深克隆失败", e);
    }
}
```

## 与其他模式的关系

| 模式 | 关系 |
|------|------|
| **工厂方法模式** | 可以结合使用，工厂返回克隆对象 |
| **组合模式** | 原型常用于复制组合结构 |
| **备忘录模式** | 可以使用原型保存状态 |

## 总结

原型模式是 GoF 23 种设计模式之一，它通过克隆现有对象来创建新对象，适用于创建成本高或需要大量相似对象的场景。需要注意浅克隆和深克隆的区别，根据实际需求选择合适的克隆方式。
