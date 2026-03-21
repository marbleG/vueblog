# 状态模式（State）

## 模式定义

状态模式（State Pattern）是一种行为型设计模式，它允许一个对象在其内部状态改变时改变其行为，对象看起来好像修改了它的类。

## 核心思想

将对象的状态封装成独立的类，将状态转换逻辑委托给状态对象处理，使得对象可以在运行时改变行为。

## 结构组成

状态模式包含以下核心角色：

| 角色 | 职责 |
|------|------|
| **环境类（Context）** | 定义客户端感兴趣的接口，维护一个状态对象 |
| **抽象状态（State）** | 定义一个接口以封装与环境类特定状态相关的行为 |
| **具体状态（ConcreteState）** | 实现抽象状态接口，处理特定状态下的行为 |

## UML 类图

```
┌─────────────────┐       ┌─────────────────┐
│     Context     │       │      State      │
├─────────────────┤       ├─────────────────┤
│ - state: State  │──────>│ + handle()      │
├─────────────────┤       └────────┬────────┘
│ + request()     │                │
│ + setState()    │                │
└─────────────────┘                │
                          ┌────────┼────────┐
                          │        │        │
                   ┌──────┴───┐ ┌──┴────┐ ┌─┴──────┐
                   │StateA    │ │StateB │ │StateC  │
                   ├──────────┤ ├───────┤ ├────────┤
                   │ + handle()│ │+handle│ │+handle │
                   └──────────┘ └───────┘ └────────┘
```

## 实现代码

### 基础实现

```java
// 抽象状态
public interface State {
    void handle(Context context);
}

// 环境类
public class Context {
    private State state;

    public Context(State state) {
        this.state = state;
    }

    public void setState(State state) {
        this.state = state;
    }

    public void request() {
        state.handle(this);
    }
}

// 具体状态A
public class ConcreteStateA implements State {
    @Override
    public void handle(Context context) {
        System.out.println("当前状态: A");
        context.setState(new ConcreteStateB());
        System.out.println("切换到状态: B");
    }
}

// 具体状态B
public class ConcreteStateB implements State {
    @Override
    public void handle(Context context) {
        System.out.println("当前状态: B");
        context.setState(new ConcreteStateA());
        System.out.println("切换到状态: A");
    }
}

// 客户端
public class Client {
    public static void main(String[] args) {
        Context context = new Context(new ConcreteStateA());

        context.request();
        System.out.println();
        context.request();
    }
}
```

## 实际应用示例

### 场景：订单状态管理

实现一个订单系统，订单有多个状态：待支付、已支付、已发货、已完成、已取消，不同状态下可以执行不同的操作。

```java
// 抽象状态：订单状态
public interface OrderState {
    void pay(Order order);
    void ship(Order order);
    void deliver(Order order);
    void cancel(Order order);
    String getStateName();
}

// 环境类：订单
public class Order {
    private OrderState state;
    private String orderId;
    private double amount;

    public Order(String orderId, double amount) {
        this.orderId = orderId;
        this.amount = amount;
        this.state = new PendingPaymentState();
    }

    public void setState(OrderState state) {
        this.state = state;
    }

    public String getOrderId() { return orderId; }
    public double getAmount() { return amount; }

    public void pay() {
        state.pay(this);
    }

    public void ship() {
        state.ship(this);
    }

    public void deliver() {
        state.deliver(this);
    }

    public void cancel() {
        state.cancel(this);
    }

    public void showStatus() {
        System.out.println("订单 " + orderId + " 当前状态: " + state.getStateName());
    }
}

// 具体状态：待支付
public class PendingPaymentState implements OrderState {
    @Override
    public void pay(Order order) {
        System.out.println("订单 " + order.getOrderId() + " 支付成功，金额: " + order.getAmount());
        order.setState(new PaidState());
    }

    @Override
    public void ship(Order order) {
        System.out.println("错误: 待支付订单无法发货");
    }

    @Override
    public void deliver(Order order) {
        System.out.println("错误: 待支付订单无法确认收货");
    }

    @Override
    public void cancel(Order order) {
        System.out.println("订单 " + order.getOrderId() + " 已取消");
        order.setState(new CancelledState());
    }

    @Override
    public String getStateName() {
        return "待支付";
    }
}

// 具体状态：已支付
public class PaidState implements OrderState {
    @Override
    public void pay(Order order) {
        System.out.println("错误: 订单已支付，请勿重复支付");
    }

    @Override
    public void ship(Order order) {
        System.out.println("订单 " + order.getOrderId() + " 已发货");
        order.setState(new ShippedState());
    }

    @Override
    public void deliver(Order order) {
        System.out.println("错误: 订单未发货，无法确认收货");
    }

    @Override
    public void cancel(Order order) {
        System.out.println("订单 " + order.getOrderId() + " 已取消，将退款: " + order.getAmount());
        order.setState(new CancelledState());
    }

    @Override
    public String getStateName() {
        return "已支付";
    }
}

// 具体状态：已发货
public class ShippedState implements OrderState {
    @Override
    public void pay(Order order) {
        System.out.println("错误: 订单已支付");
    }

    @Override
    public void ship(Order order) {
        System.out.println("错误: 订单已发货，请勿重复发货");
    }

    @Override
    public void deliver(Order order) {
        System.out.println("订单 " + order.getOrderId() + " 已确认收货，交易完成");
        order.setState(new CompletedState());
    }

    @Override
    public void cancel(Order order) {
        System.out.println("订单 " + order.getOrderId() + " 已取消，将退款并召回商品");
        order.setState(new CancelledState());
    }

    @Override
    public String getStateName() {
        return "已发货";
    }
}

// 具体状态：已完成
public class CompletedState implements OrderState {
    @Override
    public void pay(Order order) {
        System.out.println("错误: 订单已完成");
    }

    @Override
    public void ship(Order order) {
        System.out.println("错误: 订单已完成");
    }

    @Override
    public void deliver(Order order) {
        System.out.println("错误: 订单已完成");
    }

    @Override
    public void cancel(Order order) {
        System.out.println("错误: 已完成订单无法取消");
    }

    @Override
    public String getStateName() {
        return "已完成";
    }
}

// 具体状态：已取消
public class CancelledState implements OrderState {
    @Override
    public void pay(Order order) {
        System.out.println("错误: 订单已取消");
    }

    @Override
    public void ship(Order order) {
        System.out.println("错误: 订单已取消");
    }

    @Override
    public void deliver(Order order) {
        System.out.println("错误: 订单已取消");
    }

    @Override
    public void cancel(Order order) {
        System.out.println("错误: 订单已取消");
    }

    @Override
    public String getStateName() {
        return "已取消";
    }
}

// 客户端
public class Client {
    public static void main(String[] args) {
        Order order = new Order("ORD-001", 299.0);

        order.showStatus();
        System.out.println("\n=== 尝试发货 ===");
        order.ship();

        System.out.println("\n=== 支付订单 ===");
        order.pay();
        order.showStatus();

        System.out.println("\n=== 发货 ===");
        order.ship();
        order.showStatus();

        System.out.println("\n=== 确认收货 ===");
        order.deliver();
        order.showStatus();

        System.out.println("\n=== 尝试取消 ===");
        order.cancel();

        System.out.println("\n=== 另一个订单的流程 ===");
        Order order2 = new Order("ORD-002", 199.0);
        order2.showStatus();
        order2.cancel();
        order2.showStatus();
    }
}
```

**输出结果：**

```
订单 ORD-001 当前状态: 待支付

=== 尝试发货 ===
错误: 待支付订单无法发货

=== 支付订单 ===
订单 ORD-001 支付成功，金额: 299.0
订单 ORD-001 当前状态: 已支付

=== 发货 ===
订单 ORD-001 已发货
订单 ORD-001 当前状态: 已发货

=== 确认收货 ===
订单 ORD-001 已确认收货，交易完成
订单 ORD-001 当前状态: 已完成

=== 尝试取消 ===
错误: 已完成订单无法取消

=== 另一个订单的流程 ===
订单 ORD-002 当前状态: 待支付
订单 ORD-002 已取消
订单 ORD-002 当前状态: 已取消
```

### 场景：自动售货机

```java
// 抽象状态
public interface VendingState {
    void insertCoin(VendingMachine machine, int amount);
    void selectProduct(VendingMachine machine, String product);
    void dispense(VendingMachine machine);
    void refund(VendingMachine machine);
}

// 环境类：自动售货机
public class VendingMachine {
    private VendingState state;
    private int balance = 0;
    private String selectedProduct = null;

    public VendingMachine() {
        this.state = new NoCoinState();
    }

    public void setState(VendingState state) {
        this.state = state;
    }

    public void setBalance(int balance) {
        this.balance = balance;
    }

    public int getBalance() {
        return balance;
    }

    public void setSelectedProduct(String product) {
        this.selectedProduct = product;
    }

    public String getSelectedProduct() {
        return selectedProduct;
    }

    public void insertCoin(int amount) {
        state.insertCoin(this, amount);
    }

    public void selectProduct(String product) {
        state.selectProduct(this, product);
    }

    public void dispense() {
        state.dispense(this);
    }

    public void refund() {
        state.refund(this);
    }
}

// 具体状态：无硬币
public class NoCoinState implements VendingState {
    @Override
    public void insertCoin(VendingMachine machine, int amount) {
        machine.setBalance(machine.getBalance() + amount);
        System.out.println("投入 " + amount + " 元，当前余额: " + machine.getBalance());
        machine.setState(new HasCoinState());
    }

    @Override
    public void selectProduct(VendingMachine machine, String product) {
        System.out.println("请先投币");
    }

    @Override
    public void dispense(VendingMachine machine) {
        System.out.println("请先投币并选择商品");
    }

    @Override
    public void refund(VendingMachine machine) {
        System.out.println("没有余额可退");
    }
}

// 具体状态：有硬币
public class HasCoinState implements VendingState {
    @Override
    public void insertCoin(VendingMachine machine, int amount) {
        machine.setBalance(machine.getBalance() + amount);
        System.out.println("投入 " + amount + " 元，当前余额: " + machine.getBalance());
    }

    @Override
    public void selectProduct(VendingMachine machine, String product) {
        machine.setSelectedProduct(product);
        System.out.println("已选择: " + product);
        machine.setState(new SoldState());
    }

    @Override
    public void dispense(VendingMachine machine) {
        System.out.println("请先选择商品");
    }

    @Override
    public void refund(VendingMachine machine) {
        System.out.println("退还 " + machine.getBalance() + " 元");
        machine.setBalance(0);
        machine.setState(new NoCoinState());
    }
}

// 具体状态：已售出
public class SoldState implements VendingState {
    @Override
    public void insertCoin(VendingMachine machine, int amount) {
        System.out.println("请等待商品出货");
    }

    @Override
    public void selectProduct(VendingMachine machine, String product) {
        System.out.println("请等待商品出货");
    }

    @Override
    public void dispense(VendingMachine machine) {
        System.out.println("出货: " + machine.getSelectedProduct());
        machine.setBalance(0);
        machine.setSelectedProduct(null);
        machine.setState(new NoCoinState());
    }

    @Override
    public void refund(VendingMachine machine) {
        System.out.println("已选择商品，无法退款");
    }
}

// 客户端
public class Client {
    public static void main(String[] args) {
        VendingMachine machine = new VendingMachine();

        System.out.println("=== 测试正常流程 ===");
        machine.insertCoin(5);
        machine.selectProduct("可乐");
        machine.dispense();

        System.out.println("\n=== 测试退款 ===");
        machine.insertCoin(10);
        machine.refund();

        System.out.println("\n=== 测试错误操作 ===");
        machine.selectProduct("雪碧");
        machine.dispense();
    }
}
```

## 应用场景

| 场景 | 说明 |
|------|------|
| **订单系统** | 订单状态流转：待支付→已支付→已发货→已完成 |
| **工作流引擎** | 审批流程状态管理 |
| **游戏角色** | 角色状态：站立、行走、跳跃、攻击等 |
| **网络连接** | TCP 连接状态：CLOSED、LISTEN、SYN_SENT 等 |
| **自动售货机** | 投币、选择、出货等状态 |
| **文档审批** | 草稿、审核中、已发布等状态 |

## 优缺点分析

### 优点

1. **消除条件语句**：将状态判断逻辑分散到各个状态类中
2. **易于扩展**：新增状态只需新增状态类
3. **状态转换清晰**：状态转换逻辑封装在状态类中
4. **符合开闭原则**：新增状态无需修改现有代码
5. **封装性好**：状态变化对客户端透明

### 缺点

1. **类数量增加**：每个状态都需要一个类
2. **状态共享问题**：状态对象可能需要共享或创建
3. **结构复杂**：状态较多时系统变得复杂

## 与其他模式的关系

| 模式 | 关系 |
|------|------|
| **策略模式** | 策略模式客户端选择策略，状态模式状态自动切换 |
| **享元模式** | 状态对象可使用享元模式共享 |
| **单例模式** | 状态对象常使用单例模式 |
| **备忘录模式** | 可结合保存和恢复状态 |

## 最佳实践

1. **状态对象共享**：无状态的状态对象可共享，减少对象创建
2. **状态转换集中**：可在环境类中集中管理状态转换
3. **使用枚举**：简单状态机可使用枚举实现
4. **状态持久化**：需要持久化时，状态类应支持序列化

## 总结

状态模式通过将状态封装成独立的类，实现了状态与行为的解耦。它适用于对象行为随状态改变而变化的场景，如订单状态管理、工作流引擎、游戏角色状态等。使用状态模式可以消除大量的条件判断语句，使代码更加清晰和易于维护。
