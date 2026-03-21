# 命令模式（Command）

## 模式定义

命令模式（Command Pattern）是一种行为型设计模式，它将请求封装为一个对象，从而允许用不同的请求对客户端进行参数化、对请求排队或记录请求日志，以及支持撤销操作。

## 核心思想

将"请求"封装成对象，以便使用不同的请求、队列或者日志来参数化其他对象。命令模式也支持撤销操作。

## 结构组成

命令模式包含以下核心角色：

| 角色 | 职责 |
|------|------|
| **命令接口（Command）** | 声明执行操作的接口 |
| **具体命令（ConcreteCommand）** | 实现命令接口，绑定接收者和动作 |
| **接收者（Receiver）** | 知道如何执行与请求相关的操作 |
| **调用者（Invoker）** | 持有命令对象并调用命令的执行方法 |
| **客户端（Client）** | 创建具体命令对象并设置其接收者 |

## UML 类图

```
┌─────────────┐      ┌─────────────┐
│   Client    │─────>│   Command   │
└─────────────┘      ├─────────────┤
                     │ + execute() │
                     └──────┬──────┘
                            │
                     ┌──────┴──────┐
                     │             │
              ┌──────┴──────┐ ┌────┴─────┐
              │ConcreteCmd  │ │ Receiver │
              ├─────────────┤ ├──────────┤
              │ - receiver  │ │ action() │
              │ + execute() │ └──────────┘
              └─────────────┘
```

## 实现代码

### 基础实现

```java
// 命令接口
public interface Command {
    void execute();
    void undo();
}

// 接收者
public class Light {
    public void on() {
        System.out.println("灯打开了");
    }

    public void off() {
        System.out.println("灯关闭了");
    }
}

// 具体命令：开灯
public class LightOnCommand implements Command {
    private Light light;

    public LightOnCommand(Light light) {
        this.light = light;
    }

    @Override
    public void execute() {
        light.on();
    }

    @Override
    public void undo() {
        light.off();
    }
}

// 具体命令：关灯
public class LightOffCommand implements Command {
    private Light light;

    public LightOffCommand(Light light) {
        this.light = light;
    }

    @Override
    public void execute() {
        light.off();
    }

    @Override
    public void undo() {
        light.on();
    }
}

// 调用者：遥控器
public class RemoteControl {
    private Command command;
    private Command undoCommand;

    public void setCommand(Command command) {
        this.command = command;
    }

    public void pressButton() {
        command.execute();
        undoCommand = command;
    }

    public void pressUndo() {
        if (undoCommand != null) {
            undoCommand.undo();
        }
    }
}

// 客户端
public class Client {
    public static void main(String[] args) {
        Light light = new Light();
        Command lightOn = new LightOnCommand(light);
        Command lightOff = new LightOffCommand(light);

        RemoteControl remote = new RemoteControl();

        remote.setCommand(lightOn);
        remote.pressButton();

        remote.setCommand(lightOff);
        remote.pressButton();

        remote.pressUndo();
    }
}
```

## 实际应用示例

### 场景：智能家居遥控器

实现一个支持多插槽的智能家居遥控器，每个插槽可以控制一个设备，支持撤销操作。

```java
// 命令接口
public interface Command {
    void execute();
    void undo();
}

// 无操作命令（空对象模式）
public class NoCommand implements Command {
    @Override
    public void execute() {}

    @Override
    public void undo() {}
}

// 接收者：电灯
public class Light {
    private String location;

    public Light(String location) {
        this.location = location;
    }

    public void on() {
        System.out.println(location + " 的灯打开了");
    }

    public void off() {
        System.out.println(location + " 的灯关闭了");
    }
}

// 接收者：空调
public class AirConditioner {
    private String location;

    public AirConditioner(String location) {
        this.location = location;
    }

    public void on() {
        System.out.println(location + " 的空调打开了");
    }

    public void off() {
        System.out.println(location + " 的空调关闭了");
    }

    public void setTemperature(int temp) {
        System.out.println(location + " 的空调温度设置为 " + temp + " 度");
    }
}

// 接收者：音响
public class Stereo {
    private String location;

    public Stereo(String location) {
        this.location = location;
    }

    public void on() {
        System.out.println(location + " 的音响打开了");
    }

    public void off() {
        System.out.println(location + " 的音响关闭了");
    }

    public void setVolume(int level) {
        System.out.println(location + " 的音响音量设置为 " + level);
    }
}

// 具体命令：开灯
public class LightOnCommand implements Command {
    private Light light;

    public LightOnCommand(Light light) {
        this.light = light;
    }

    @Override
    public void execute() {
        light.on();
    }

    @Override
    public void undo() {
        light.off();
    }
}

// 具体命令：关灯
public class LightOffCommand implements Command {
    private Light light;

    public LightOffCommand(Light light) {
        this.light = light;
    }

    @Override
    public void execute() {
        light.off();
    }

    @Override
    public void undo() {
        light.on();
    }
}

// 具体命令：开空调
public class AirConditionerOnCommand implements Command {
    private AirConditioner ac;

    public AirConditionerOnCommand(AirConditioner ac) {
        this.ac = ac;
    }

    @Override
    public void execute() {
        ac.on();
        ac.setTemperature(26);
    }

    @Override
    public void undo() {
        ac.off();
    }
}

// 具体命令：关空调
public class AirConditionerOffCommand implements Command {
    private AirConditioner ac;

    public AirConditionerOffCommand(AirConditioner ac) {
        this.ac = ac;
    }

    @Override
    public void execute() {
        ac.off();
    }

    @Override
    public void undo() {
        ac.on();
        ac.setTemperature(26);
    }
}

// 宏命令：一键执行多个命令
public class MacroCommand implements Command {
    private Command[] commands;

    public MacroCommand(Command[] commands) {
        this.commands = commands;
    }

    @Override
    public void execute() {
        for (Command cmd : commands) {
            cmd.execute();
        }
    }

    @Override
    public void undo() {
        for (int i = commands.length - 1; i >= 0; i--) {
            commands[i].undo();
        }
    }
}

// 调用者：智能遥控器
public class SmartRemoteControl {
    private Command[] onCommands;
    private Command[] offCommands;
    private Command undoCommand;

    public SmartRemoteControl(int slots) {
        onCommands = new Command[slots];
        offCommands = new Command[slots];

        Command noCommand = new NoCommand();
        for (int i = 0; i < slots; i++) {
            onCommands[i] = noCommand;
            offCommands[i] = noCommand;
        }
        undoCommand = noCommand;
    }

    public void setCommand(int slot, Command onCommand, Command offCommand) {
        onCommands[slot] = onCommand;
        offCommands[slot] = offCommand;
    }

    public void pressOn(int slot) {
        onCommands[slot].execute();
        undoCommand = offCommands[slot];
    }

    public void pressOff(int slot) {
        offCommands[slot].execute();
        undoCommand = onCommands[slot];
    }

    public void pressUndo() {
        undoCommand.undo();
    }

    public void showCommands() {
        System.out.println("\n===== 遥控器设置 =====");
        for (int i = 0; i < onCommands.length; i++) {
            System.out.println("插槽 " + i + ": " + 
                onCommands[i].getClass().getSimpleName() + " / " + 
                offCommands[i].getClass().getSimpleName());
        }
        System.out.println("======================\n");
    }
}

// 客户端
public class Client {
    public static void main(String[] args) {
        SmartRemoteControl remote = new SmartRemoteControl(3);

        Light livingLight = new Light("客厅");
        Light bedroomLight = new Light("卧室");
        AirConditioner ac = new AirConditioner("客厅");

        remote.setCommand(0, 
            new LightOnCommand(livingLight), 
            new LightOffCommand(livingLight));
        remote.setCommand(1, 
            new LightOnCommand(bedroomLight), 
            new LightOffCommand(bedroomLight));
        remote.setCommand(2, 
            new AirConditionerOnCommand(ac), 
            new AirConditionerOffCommand(ac));

        remote.showCommands();

        System.out.println("=== 测试基本操作 ===");
        remote.pressOn(0);
        remote.pressOn(2);
        remote.pressOff(0);

        System.out.println("\n=== 测试撤销 ===");
        remote.pressUndo();

        System.out.println("\n=== 测试宏命令（一键回家模式）===");
        Command[] homeCommands = {
            new LightOnCommand(livingLight),
            new LightOnCommand(bedroomLight),
            new AirConditionerOnCommand(ac)
        };
        MacroCommand homeMode = new MacroCommand(homeCommands);
        homeMode.execute();

        System.out.println("\n=== 撤销宏命令 ===");
        homeMode.undo();
    }
}
```

**输出结果：**

```
===== 遥控器设置 =====
插槽 0: LightOnCommand / LightOffCommand
插槽 1: LightOnCommand / LightOffCommand
插槽 2: AirConditionerOnCommand / AirConditionerOffCommand
======================

=== 测试基本操作 ===
客厅 的灯打开了
客厅 的空调打开了
客厅 的空调温度设置为 26 度
客厅 的灯关闭了

=== 测试撤销 ===
客厅 的灯打开了

=== 测试宏命令（一键回家模式）===
客厅 的灯打开了
卧室 的灯打开了
客厅 的空调打开了
客厅 的空调温度设置为 26 度

=== 撤销宏命令 ===
客厅 的空调关闭了
卧室 的灯关闭了
客厅 的灯关闭了
```

## 应用场景

| 场景 | 说明 |
|------|------|
| **GUI 按钮/菜单** | 按钮点击执行相应命令 |
| **撤销/重做** | 文本编辑器的撤销重做功能 |
| **宏命令** | 批量执行一系列操作 |
| **事务处理** | 数据库事务的提交和回滚 |
| **任务队列** | 线程池任务队列 |
| **日志请求** | 记录操作日志用于恢复 |

## 优缺点分析

### 优点

1. **解耦调用者和接收者**：调用者不需要知道接收者的具体实现
2. **易于扩展**：新增命令无需修改现有代码
3. **支持撤销/重做**：通过保存命令历史实现
4. **支持宏命令**：可以组合多个命令
5. **支持延迟执行**：命令可以在任意时间执行

### 缺点

1. **类数量增加**：每个命令都需要一个具体命令类
2. **复杂度提高**：简单操作使用命令模式会增加复杂度
3. **调试困难**：命令的执行过程分散在多个类中

## 与其他模式的关系

| 模式 | 关系 |
|------|------|
| **责任链模式** | 命令可沿责任链传递 |
| **备忘录模式** | 结合实现撤销功能 |
| **原型模式** | 可用于复制命令对象 |
| **组合模式** | 组合多个命令形成宏命令 |

## 最佳实践

1. **使用空对象模式**：避免空指针检查
2. **实现撤销功能**：保存命令历史支持撤销
3. **支持命令序列化**：可将命令保存到文件或数据库
4. **合理使用宏命令**：批量操作场景使用宏命令

## 总结

命令模式通过将请求封装为对象，实现了调用者与接收者的解耦。它支持撤销、重做、队列、日志等功能，是 GUI 开发、事务处理等场景的常用模式。虽然会增加类的数量，但带来的灵活性和可扩展性是值得的。
