# 模板方法模式（Template Method）

## 模式定义

模板方法模式（Template Method Pattern）是一种行为型设计模式，它定义一个操作中算法的骨架，而将一些步骤延迟到子类中。模板方法使得子类可以不改变算法的结构即可重定义该算法的某些特定步骤。

## 核心思想

通过在父类中定义算法的骨架（模板方法），将可变部分延迟到子类实现，实现代码复用和扩展。

## 结构组成

模板方法模式包含以下核心角色：

| 角色 | 职责 |
|------|------|
| **抽象类（AbstractClass）** | 定义抽象操作和模板方法，模板方法调用抽象操作 |
| **具体类（ConcreteClass）** | 实现抽象操作，完成算法中特定步骤 |

## UML 类图

```
┌─────────────────────────┐
│     AbstractClass       │
├─────────────────────────┤
│ + templateMethod()      │
│ # primitiveOperation1() │
│ # primitiveOperation2() │
│ # hook()                │
└───────────┬─────────────┘
            │
     ┌──────┴──────┐
     │             │
┌────┴─────┐ ┌─────┴────┐
│ConcreteA │ │ConcreteB │
├──────────┤ ├──────────┤
│# op1()   │ │# op1()   │
│# op2()   │ │# op2()   │
└──────────┘ └──────────┘
```

## 实现代码

### 基础实现

```java
// 抽象类
public abstract class AbstractClass {
    public final void templateMethod() {
        primitiveOperation1();
        primitiveOperation2();
        hook();
    }

    protected abstract void primitiveOperation1();
    protected abstract void primitiveOperation2();

    protected void hook() {
        System.out.println("默认钩子方法");
    }
}

// 具体类A
public class ConcreteClassA extends AbstractClass {
    @Override
    protected void primitiveOperation1() {
        System.out.println("具体类A - 操作1");
    }

    @Override
    protected void primitiveOperation2() {
        System.out.println("具体类A - 操作2");
    }
}

// 具体类B
public class ConcreteClassB extends AbstractClass {
    @Override
    protected void primitiveOperation1() {
        System.out.println("具体类B - 操作1");
    }

    @Override
    protected void primitiveOperation2() {
        System.out.println("具体类B - 操作2");
    }

    @Override
    protected void hook() {
        System.out.println("具体类B - 重写钩子方法");
    }
}

// 客户端
public class Client {
    public static void main(String[] args) {
        AbstractClass classA = new ConcreteClassA();
        AbstractClass classB = new ConcreteClassB();

        System.out.println("=== 执行类A的模板方法 ===");
        classA.templateMethod();

        System.out.println("\n=== 执行类B的模板方法 ===");
        classB.templateMethod();
    }
}
```

## 实际应用示例

### 场景：数据处理流程

实现一个数据处理器，支持从不同数据源读取数据、处理数据、保存数据，不同数据源的处理流程相同但具体实现不同。

```java
// 抽象类：数据处理器
public abstract class DataProcessor {
    public final void process() {
        openSource();
        String data = readData();
        String processed = processData(data);
        saveData(processed);
        closeSource();
        System.out.println("数据处理完成\n");
    }

    protected abstract void openSource();
    protected abstract String readData();
    protected abstract void saveData(String data);
    protected abstract void closeSource();

    protected String processData(String data) {
        return data.toUpperCase();
    }

    protected boolean shouldProcess() {
        return true;
    }
}

// 具体类：文件处理器
public class FileDataProcessor extends DataProcessor {
    private String fileName;
    private String content;

    public FileDataProcessor(String fileName) {
        this.fileName = fileName;
    }

    @Override
    protected void openSource() {
        System.out.println("打开文件: " + fileName);
    }

    @Override
    protected String readData() {
        content = "hello, world from file";
        System.out.println("从文件读取数据: " + content);
        return content;
    }

    @Override
    protected void saveData(String data) {
        System.out.println("保存数据到文件: " + data);
    }

    @Override
    protected void closeSource() {
        System.out.println("关闭文件");
    }
}

// 具体类：数据库处理器
public class DatabaseDataProcessor extends DataProcessor {
    private String connectionString;
    private String queryResult;

    public DatabaseDataProcessor(String connectionString) {
        this.connectionString = connectionString;
    }

    @Override
    protected void openSource() {
        System.out.println("连接数据库: " + connectionString);
    }

    @Override
    protected String readData() {
        queryResult = "data from database";
        System.out.println("执行查询: " + queryResult);
        return queryResult;
    }

    @Override
    protected void saveData(String data) {
        System.out.println("更新数据库记录: " + data);
    }

    @Override
    protected void closeSource() {
        System.out.println("关闭数据库连接");
    }

    @Override
    protected String processData(String data) {
        return "[DB] " + data.toUpperCase();
    }
}

// 具体类：API 处理器
public class ApiDataProcessor extends DataProcessor {
    private String apiUrl;
    private String responseData;

    public ApiDataProcessor(String apiUrl) {
        this.apiUrl = apiUrl;
    }

    @Override
    protected void openSource() {
        System.out.println("建立 HTTP 连接: " + apiUrl);
    }

    @Override
    protected String readData() {
        responseData = "api response data";
        System.out.println("发送 GET 请求，获取响应: " + responseData);
        return responseData;
    }

    @Override
    protected void saveData(String data) {
        System.out.println("缓存 API 响应: " + data);
    }

    @Override
    protected void closeSource() {
        System.out.println("关闭 HTTP 连接");
    }
}

// 客户端
public class Client {
    public static void main(String[] args) {
        DataProcessor fileProcessor = new FileDataProcessor("data.txt");
        DataProcessor dbProcessor = new DatabaseDataProcessor("jdbc:mysql://localhost/db");
        DataProcessor apiProcessor = new ApiDataProcessor("https://api.example.com/data");

        System.out.println("=== 文件数据处理 ===");
        fileProcessor.process();

        System.out.println("=== 数据库数据处理 ===");
        dbProcessor.process();

        System.out.println("=== API 数据处理 ===");
        apiProcessor.process();
    }
}
```

**输出结果：**

```
=== 文件数据处理 ===
打开文件: data.txt
从文件读取数据: hello, world from file
保存数据到文件: HELLO, WORLD FROM FILE
关闭文件
数据处理完成

=== 数据库数据处理 ===
连接数据库: jdbc:mysql://localhost/db
执行查询: data from database
更新数据库记录: [DB] DATA FROM DATABASE
关闭数据库连接
数据处理完成

=== API 数据处理 ===
建立 HTTP 连接: https://api.example.com/data
发送 GET 请求，获取响应: api response data
缓存 API 响应: API RESPONSE DATA
关闭 HTTP 连接
数据处理完成
```

### 场景：游戏角色

```java
// 抽象类：游戏角色
public abstract class GameCharacter {
    public final void attack() {
        prepare();
        performAttack();
        if (hasSpecialEffect()) {
            applySpecialEffect();
        }
        recover();
    }

    protected void prepare() {
        System.out.println("准备攻击...");
    }

    protected abstract void performAttack();

    protected void recover() {
        System.out.println("恢复姿态");
    }

    protected boolean hasSpecialEffect() {
        return false;
    }

    protected void applySpecialEffect() {
    }
}

// 具体类：战士
public class Warrior extends GameCharacter {
    @Override
    protected void performAttack() {
        System.out.println("战士挥剑攻击！");
    }

    @Override
    protected boolean hasSpecialEffect() {
        return true;
    }

    @Override
    protected void applySpecialEffect() {
        System.out.println("触发流血效果！");
    }
}

// 具体类：法师
public class Mage extends GameCharacter {
    @Override
    protected void prepare() {
        System.out.println("法师吟唱咒语...");
    }

    @Override
    protected void performAttack() {
        System.out.println("法师释放火球术！");
    }

    @Override
    protected boolean hasSpecialEffect() {
        return true;
    }

    @Override
    protected void applySpecialEffect() {
        System.out.println("触发燃烧效果！");
    }
}

// 具体类：弓箭手
public class Archer extends GameCharacter {
    @Override
    protected void performAttack() {
        System.out.println("弓箭手射出箭矢！");
    }
}

// 客户端
public class Client {
    public static void main(String[] args) {
        GameCharacter warrior = new Warrior();
        GameCharacter mage = new Mage();
        GameCharacter archer = new Archer();

        System.out.println("=== 战士攻击 ===");
        warrior.attack();

        System.out.println("\n=== 法师攻击 ===");
        mage.attack();

        System.out.println("\n=== 弓箭手攻击 ===");
        archer.attack();
    }
}
```

## 钩子方法

钩子方法（Hook Method）是模板方法模式中的一个重要概念：

```java
public abstract class AbstractClass {
    public final void templateMethod() {
        step1();
        if (shouldDoStep2()) {
            step2();
        }
        step3();
    }

    protected abstract void step1();
    protected abstract void step2();
    protected abstract void step3();

    protected boolean shouldDoStep2() {
        return true;
    }
}
```

## 应用场景

| 场景 | 说明 |
|------|------|
| **框架设计** | 框架定义流程，子类实现具体逻辑 |
| **数据处理** | 读取→处理→保存的固定流程 |
| **生命周期** | 初始化→执行→销毁的标准流程 |
| **算法骨架** | 排序、搜索等算法的固定步骤 |
| **测试框架** | JUnit 的 setUp、test、tearDown |
| **Servlet** | HttpServlet 的 service 方法 |

## 优缺点分析

### 优点

1. **代码复用**：公共代码在抽象类中实现
2. **反向控制**：父类调用子类方法
3. **扩展性好**：新增子类不影响其他类
4. **符合开闭原则**：通过子类扩展功能

### 缺点

1. **类数量增加**：每个实现都需要一个子类
2. **继承限制**：通过继承实现，限制了灵活性
3. **理解困难**：阅读代码需要查看父类

## 与其他模式的关系

| 模式 | 关系 |
|------|------|
| **策略模式** | 策略用组合改变行为，模板方法用继承 |
| **工厂方法模式** | 工厂方法是模板方法的一种特殊形式 |
| **建造者模式** | 建造者关注对象创建，模板方法关注行为流程 |

## 最佳实践

1. **final 方法**：模板方法应声明为 final，防止子类覆盖
2. **钩子方法**：提供钩子方法增加灵活性
3. **命名规范**：抽象方法命名清晰，表明其职责
4. **最小知识**：子类只需知道需要实现的方法

## 总结

模板方法模式通过在父类中定义算法骨架，将可变部分延迟到子类实现，实现了代码复用和扩展。它适用于具有固定流程但某些步骤可变的场景。使用时要注意模板方法应声明为 final，并通过钩子方法提供灵活性。
