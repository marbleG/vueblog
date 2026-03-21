# 中介者模式（Mediator）

## 模式定义

中介者模式（Mediator Pattern）是一种行为型设计模式，它用一个中介对象来封装一系列对象的交互，中介者使各对象不需要显式地相互引用，从而使其耦合松散，而且可以独立地改变它们之间的交互。

## 核心思想

通过引入一个中介者对象，将对象间的交互行为从多对多变成一对多，降低对象间的耦合度。

## 结构组成

中介者模式包含以下核心角色：

| 角色 | 职责 |
|------|------|
| **抽象中介者（Mediator）** | 定义同事对象到中介者对象的接口 |
| **具体中介者（ConcreteMediator）** | 实现抽象中介者接口，协调各同事对象的交互 |
| **抽象同事类（Colleague）** | 定义同事类的接口，维护对中介者的引用 |
| **具体同事类（ConcreteColleague）** | 实现抽象同事类，每个同事对象只知道中介者 |

## UML 类图

```
┌─────────────────┐         ┌─────────────────┐
│    Mediator     │         │    Colleague    │
├─────────────────┤         ├─────────────────┤
│ + notify()      │<────────│ - mediator      │
└────────┬────────┘         │ + action()      │
         │                  └────────┬────────┘
         │                           │
  ┌──────┴──────┐             ┌──────┴──────┐
  │             │             │             │
┌─┴───────────┐ ┌───────────┐ │ ┌───────────┴─┐
│ConcreteMed  │ │  ColleagueA│ │ │ ColleagueB  │
├─────────────┤ ├───────────┤ │ ├─────────────┤
│ - colleagueA│ │           │ │ │             │
│ - colleagueB│ │           │ │ │             │
└─────────────┘ └───────────┘   └─────────────┘
```

## 实现代码

### 基础实现

```java
// 抽象中介者
public abstract class Mediator {
    public abstract void notify(Colleague colleague, String event);
}

// 抽象同事类
public abstract class Colleague {
    protected Mediator mediator;

    public Colleague(Mediator mediator) {
        this.mediator = mediator;
    }

    public abstract void action();
}

// 具体同事类A
public class ConcreteColleagueA extends Colleague {
    public ConcreteColleagueA(Mediator mediator) {
        super(mediator);
    }

    @Override
    public void action() {
        System.out.println("同事A执行操作");
    }

    public void doSomething() {
        System.out.println("同事A正在工作...");
        mediator.notify(this, "A-done");
    }
}

// 具体同事类B
public class ConcreteColleagueB extends Colleague {
    public ConcreteColleagueB(Mediator mediator) {
        super(mediator);
    }

    @Override
    public void action() {
        System.out.println("同事B执行操作");
    }

    public void doSomething() {
        System.out.println("同事B正在工作...");
        mediator.notify(this, "B-done");
    }
}

// 具体中介者
public class ConcreteMediator extends Mediator {
    private ConcreteColleagueA colleagueA;
    private ConcreteColleagueB colleagueB;

    public void setColleagueA(ConcreteColleagueA colleagueA) {
        this.colleagueA = colleagueA;
    }

    public void setColleagueB(ConcreteColleagueB colleagueB) {
        this.colleagueB = colleagueB;
    }

    @Override
    public void notify(Colleague colleague, String event) {
        if (event.equals("A-done")) {
            colleagueB.action();
        } else if (event.equals("B-done")) {
            colleagueA.action();
        }
    }
}

// 客户端
public class Client {
    public static void main(String[] args) {
        ConcreteMediator mediator = new ConcreteMediator();

        ConcreteColleagueA colleagueA = new ConcreteColleagueA(mediator);
        ConcreteColleagueB colleagueB = new ConcreteColleagueB(mediator);

        mediator.setColleagueA(colleagueA);
        mediator.setColleagueB(colleagueB);

        colleagueA.doSomething();
        colleagueB.doSomething();
    }
}
```

## 实际应用示例

### 场景：聊天室系统

实现一个聊天室，用户之间通过聊天室（中介者）进行通信，用户之间不需要直接引用。

```java
// 抽象中介者：聊天室
public interface ChatRoom {
    void sendMessage(User user, String message);
    void addUser(User user);
}

// 抽象同事类：用户
public abstract class User {
    protected ChatRoom chatRoom;
    protected String name;

    public User(ChatRoom chatRoom, String name) {
        this.chatRoom = chatRoom;
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public abstract void send(String message);
    public abstract void receive(String message);
}

// 具体中介者：公共聊天室
public class PublicChatRoom implements ChatRoom {
    private List<User> users = new ArrayList<>();

    @Override
    public void addUser(User user) {
        users.add(user);
        System.out.println(user.getName() + " 加入了聊天室");
    }

    @Override
    public void sendMessage(User sender, String message) {
        for (User user : users) {
            if (user != sender) {
                user.receive(sender.getName() + " 说: " + message);
            }
        }
    }
}

// 具体同事类：聊天用户
public class ChatUser extends User {
    public ChatUser(ChatRoom chatRoom, String name) {
        super(chatRoom, name);
    }

    @Override
    public void send(String message) {
        System.out.println(this.name + " 发送消息: " + message);
        chatRoom.sendMessage(this, message);
    }

    @Override
    public void receive(String message) {
        System.out.println(this.name + " 收到消息: " + message);
    }
}

// 客户端
public class Client {
    public static void main(String[] args) {
        ChatRoom chatRoom = new PublicChatRoom();

        User alice = new ChatUser(chatRoom, "Alice");
        User bob = new ChatUser(chatRoom, "Bob");
        User charlie = new ChatUser(chatRoom, "Charlie");

        chatRoom.addUser(alice);
        chatRoom.addUser(bob);
        chatRoom.addUser(charlie);

        System.out.println("\n=== Alice 发送消息 ===");
        alice.send("大家好！");

        System.out.println("\n=== Bob 发送消息 ===");
        bob.send("你好 Alice！");

        System.out.println("\n=== Charlie 发送消息 ===");
        charlie.send("很高兴认识大家！");
    }
}
```

**输出结果：**

```
Alice 加入了聊天室
Bob 加入了聊天室
Charlie 加入了聊天室

=== Alice 发送消息 ===
Alice 发送消息: 大家好！
Bob 收到消息: Alice 说: 大家好！
Charlie 收到消息: Alice 说: 大家好！

=== Bob 发送消息 ===
Bob 发送消息: 你好 Alice！
Alice 收到消息: Bob 说: 你好 Alice！
Charlie 收到消息: Bob 说: 你好 Alice！

=== Charlie 发送消息 ===
Charlie 发送消息: 很高兴认识大家！
Alice 收到消息: Charlie 说: 很高兴认识大家！
Bob 收到消息: Charlie 说: 很高兴认识大家！
```

### 场景：MVC 框架

MVC 模式中，Controller 就是 Model 和 View 之间的中介者。

```java
// 中介者接口
public interface Controller {
    void notifyView(String event, Object data);
    void notifyModel(String event, Object data);
}

// 抽象同事类
public abstract class Component {
    protected Controller controller;

    public Component(Controller controller) {
        this.controller = controller;
    }
}

// 具体同事类：Model
public class UserModel extends Component {
    private String name;
    private int age;

    public UserModel(Controller controller) {
        super(controller);
    }

    public void setName(String name) {
        this.name = name;
        controller.notifyView("nameChanged", name);
    }

    public void setAge(int age) {
        this.age = age;
        controller.notifyView("ageChanged", age);
    }

    public String getName() { return name; }
    public int getAge() { return age; }
}

// 具体同事类：View
public class UserView extends Component {
    public UserView(Controller controller) {
        super(controller);
    }

    public void display(String name, int age) {
        System.out.println("显示用户: " + name + ", 年龄: " + age);
    }

    public void onNameInput(String name) {
        controller.notifyModel("updateName", name);
    }

    public void onAgeInput(int age) {
        controller.notifyModel("updateAge", age);
    }
}

// 具体中介者：UserController
public class UserController implements Controller {
    private UserModel model;
    private UserView view;

    public void setModel(UserModel model) {
        this.model = model;
    }

    public void setView(UserView view) {
        this.view = view;
    }

    @Override
    public void notifyView(String event, Object data) {
        if ("nameChanged".equals(event) || "ageChanged".equals(event)) {
            view.display(model.getName(), model.getAge());
        }
    }

    @Override
    public void notifyModel(String event, Object data) {
        switch (event) {
            case "updateName":
                model.setName((String) data);
                break;
            case "updateAge":
                model.setAge((Integer) data);
                break;
        }
    }
}

// 客户端
public class Client {
    public static void main(String[] args) {
        UserController controller = new UserController();
        UserModel model = new UserModel(controller);
        UserView view = new UserView(controller);

        controller.setModel(model);
        controller.setView(view);

        System.out.println("=== 用户输入姓名 ===");
        view.onNameInput("张三");

        System.out.println("\n=== 用户输入年龄 ===");
        view.onAgeInput(25);
    }
}
```

## 应用场景

| 场景 | 说明 |
|------|------|
| **聊天系统** | 用户通过聊天室通信 |
| **MVC 框架** | Controller 作为 Model 和 View 的中介者 |
| **GUI 组件** | 窗体作为各控件的中介者 |
| **机场调度** | 塔台协调各飞机的起降 |
| **交通信号灯** | 信号灯控制器协调各方向车辆 |
| **中介服务** | 房产中介、婚介等 |

## 优缺点分析

### 优点

1. **降低耦合**：同事类之间不需要相互引用
2. **集中控制**：交互逻辑集中在中介者中
3. **易于维护**：修改交互逻辑只需修改中介者
4. **松散耦合**：同事类可以独立复用
5. **简化对象**：同事类变得更简单

### 缺点

1. **中介者复杂**：中介者可能变得庞大复杂
2. **单点故障**：中介者出现问题会影响整个系统
3. **过度设计**：简单交互使用中介者会增加复杂度

## 与其他模式的关系

| 模式 | 关系 |
|------|------|
| **观察者模式** | 中介者常用观察者模式实现通信 |
| **外观模式** | 外观提供简化接口，中介者协调交互 |
| **责任链模式** | 责任链分散处理，中介者集中处理 |
| **代理模式** | 中介者可看作特殊的代理 |

## 最佳实践

1. **避免中介者过大**：可拆分为多个中介者
2. **使用接口**：同事类通过接口与中介者交互
3. **合理设计**：仅在对象间交互复杂时使用
4. **考虑事件驱动**：结合事件机制实现松耦合

## 总结

中介者模式通过引入中介者对象，将对象间的多对多交互转化为一对多交互，降低了系统的耦合度。它适用于对象间交互复杂、存在大量引用关系的场景。但要注意避免中介者变得过于复杂，必要时可进行拆分。
