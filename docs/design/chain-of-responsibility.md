# 责任链模式（Chain of Responsibility）

## 模式定义

责任链模式（Chain of Responsibility Pattern）是一种行为型设计模式，它允许将请求沿着处理者链传递，直到有一个处理者能够处理该请求为止。

## 核心思想

将请求的发送者和接收者解耦，让多个对象都有机会处理请求。将这些对象连成一条链，沿着链传递请求，直到有对象处理它为止。

## 结构组成

责任链模式包含以下核心角色：

| 角色 | 职责 |
|------|------|
| **抽象处理者（Handler）** | 定义处理请求的接口，并维护对下一个处理者的引用 |
| **具体处理者（ConcreteHandler）** | 实现处理请求的逻辑，如果无法处理则将请求转发给下一个处理者 |
| **客户端（Client）** | 创建处理链并向链头发送请求 |

## UML 类图

```
┌─────────────────┐
│    Handler      │
├─────────────────┤
│ - next: Handler │
├─────────────────┤
│ + setNext()     │
│ + handle()      │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───┴───┐ ┌───┴───┐
│Handler│ │Handler│
│   A   │ │   B   │
└───────┘ └───────┘
```

## 实现代码

### 基础实现

```java
// 抽象处理者
public abstract class Handler {
    protected Handler next;

    public Handler setNext(Handler next) {
        this.next = next;
        return next;
    }

    public abstract void handleRequest(String request);
}

// 具体处理者A
public class ConcreteHandlerA extends Handler {
    @Override
    public void handleRequest(String request) {
        if (request.equals("A")) {
            System.out.println("Handler A 处理请求: " + request);
        } else if (next != null) {
            next.handleRequest(request);
        } else {
            System.out.println("无人处理请求: " + request);
        }
    }
}

// 具体处理者B
public class ConcreteHandlerB extends Handler {
    @Override
    public void handleRequest(String request) {
        if (request.equals("B")) {
            System.out.println("Handler B 处理请求: " + request);
        } else if (next != null) {
            next.handleRequest(request);
        } else {
            System.out.println("无人处理请求: " + request);
        }
    }
}

// 客户端使用
public class Client {
    public static void main(String[] args) {
        Handler handlerA = new ConcreteHandlerA();
        Handler handlerB = new ConcreteHandlerB();

        handlerA.setNext(handlerB);

        handlerA.handleRequest("A");
        handlerA.handleRequest("B");
        handlerA.handleRequest("C");
    }
}
```

## 实际应用示例

### 场景：审批流程

模拟公司请假审批流程：组长审批1天以内，经理审批3天以内，总监审批7天以内，超过7天需总经理审批。

```java
// 请假请求
public class LeaveRequest {
    private String name;
    private int days;

    public LeaveRequest(String name, int days) {
        this.name = name;
        this.days = days;
    }

    public String getName() { return name; }
    public int getDays() { return days; }
}

// 抽象审批者
public abstract class Approver {
    protected Approver next;
    protected String name;

    public Approver(String name) {
        this.name = name;
    }

    public Approver setNext(Approver next) {
        this.next = next;
        return next;
    }

    public abstract void approve(LeaveRequest request);
}

// 组长
public class TeamLeader extends Approver {
    public TeamLeader(String name) {
        super(name);
    }

    @Override
    public void approve(LeaveRequest request) {
        if (request.getDays() <= 1) {
            System.out.println("组长 " + name + " 审批通过 " + 
                request.getName() + " 的 " + request.getDays() + " 天请假");
        } else if (next != null) {
            System.out.println("组长 " + name + " 无权审批，转交上级");
            next.approve(request);
        }
    }
}

// 经理
public class Manager extends Approver {
    public Manager(String name) {
        super(name);
    }

    @Override
    public void approve(LeaveRequest request) {
        if (request.getDays() <= 3) {
            System.out.println("经理 " + name + " 审批通过 " + 
                request.getName() + " 的 " + request.getDays() + " 天请假");
        } else if (next != null) {
            System.out.println("经理 " + name + " 无权审批，转交上级");
            next.approve(request);
        }
    }
}

// 总监
public class Director extends Approver {
    public Director(String name) {
        super(name);
    }

    @Override
    public void approve(LeaveRequest request) {
        if (request.getDays() <= 7) {
            System.out.println("总监 " + name + " 审批通过 " + 
                request.getName() + " 的 " + request.getDays() + " 天请假");
        } else if (next != null) {
            System.out.println("总监 " + name + " 无权审批，转交上级");
            next.approve(request);
        }
    }
}

// 总经理
public class GeneralManager extends Approver {
    public GeneralManager(String name) {
        super(name);
    }

    @Override
    public void approve(LeaveRequest request) {
        System.out.println("总经理 " + name + " 审批通过 " + 
            request.getName() + " 的 " + request.getDays() + " 天请假");
    }
}

// 客户端
public class Client {
    public static void main(String[] args) {
        Approver teamLeader = new TeamLeader("张组长");
        Approver manager = new Manager("李经理");
        Approver director = new Director("王总监");
        Approver gm = new GeneralManager("赵总");

        teamLeader.setNext(manager).setNext(director).setNext(gm);

        System.out.println("=== 请假1天 ===");
        teamLeader.approve(new LeaveRequest("小明", 1));

        System.out.println("\n=== 请假3天 ===");
        teamLeader.approve(new LeaveRequest("小红", 3));

        System.out.println("\n=== 请假5天 ===");
        teamLeader.approve(new LeaveRequest("小刚", 5));

        System.out.println("\n=== 请假10天 ===");
        teamLeader.approve(new LeaveRequest("小李", 10));
    }
}
```

**输出结果：**

```
=== 请假1天 ===
组长 张组长 审批通过 小明 的 1 天请假

=== 请假3天 ===
组长 张组长 无权审批，转交上级
经理 李经理 审批通过 小红 的 3 天请假

=== 请假5天 ===
组长 张组长 无权审批，转交上级
经理 李经理 无权审批，转交上级
总监 王总监 审批通过 小刚 的 5 天请假

=== 请假10天 ===
组长 张组长 无权审批，转交上级
经理 李经理 无权审批，转交上级
总监 王总监 无权审批，转交上级
总经理 赵总 审批通过 小李 的 10 天请假
```

## 应用场景

| 场景 | 说明 |
|------|------|
| **审批流程** | 多级审批，如请假、报销、采购审批 |
| **日志处理** | 不同级别的日志由不同处理器处理 |
| **异常处理** | 异常捕获链，逐级处理 |
| **过滤器链** | Web 请求过滤器、Servlet Filter |
| **事件处理** | GUI 事件冒泡机制 |
| **拦截器** | 框架中的拦截器链 |

## 优缺点分析

### 优点

1. **解耦请求发送者和接收者**：发送者不需要知道哪个对象会处理请求
2. **动态组合**：可以动态地改变链内的处理者或调整顺序
3. **单一职责**：每个处理者只处理自己关心的请求
4. **扩展性好**：增加新的处理者无需修改现有代码

### 缺点

1. **请求可能无人处理**：如果链没有正确配置，请求可能被忽略
2. **调试困难**：请求在链中传递，调试时不易追踪
3. **性能影响**：长链可能导致性能问题
4. **循环引用风险**：配置不当可能导致循环调用

## 与其他模式的关系

| 模式 | 关系 |
|------|------|
| **组合模式** | 责任链常与组合模式结合使用 |
| **命令模式** | 可以用命令模式封装请求对象 |
| **装饰器模式** | 装饰器可以看作特殊的责任链 |
| **中介者模式** | 中介者集中处理交互，责任链分散处理 |

## 最佳实践

1. **设置默认处理者**：链尾设置默认处理者，避免请求无人处理
2. **使用建造者模式**：复杂责任链可用建造者模式构建
3. **考虑请求传递方式**：可以选择传递所有处理者或找到处理者即停止
4. **日志记录**：在关键节点添加日志便于调试

## 总结

责任链模式通过将处理者连成一条链，实现了请求发送者与接收者的解耦。它适用于多个对象可能处理同一请求、处理者需要动态确定的场景。在实际开发中，审批流程、过滤器链、拦截器等都是责任链模式的典型应用。
