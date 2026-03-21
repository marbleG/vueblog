# 备忘录模式（Memento）

## 模式定义

备忘录模式（Memento Pattern）是一种行为型设计模式，它在不破坏封装性的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态，以便以后可以将该对象恢复到原先保存的状态。

## 核心思想

通过备忘录对象保存原发器对象的内部状态，在需要时通过备忘录恢复原发器的状态，实现撤销/回滚功能。

## 结构组成

备忘录模式包含以下核心角色：

| 角色 | 职责 |
|------|------|
| **原发器（Originator）** | 需要保存状态的对象，创建备忘录并恢复状态 |
| **备忘录（Memento）** | 存储原发器内部状态的对象 |
| **负责人类（Caretaker）** | 负责保存备忘录，但不能修改备忘录内容 |

## UML 类图

```
┌─────────────────┐       ┌─────────────────┐
│   Originator    │       │    Memento      │
├─────────────────┤       ├─────────────────┤
│ - state         │──────>│ - state         │
├─────────────────┤       └─────────────────┘
│ + createMemento │              ^
│ + restore()     │              │
└─────────────────┘       ┌──────┴──────────┐
                          │    Caretaker    │
                          ├─────────────────┤
                          │ - memento       │
                          └─────────────────┘
```

## 实现代码

### 基础实现

```java
// 备忘录
public class Memento {
    private String state;

    public Memento(String state) {
        this.state = state;
    }

    public String getState() {
        return state;
    }
}

// 原发器
public class Originator {
    private String state;

    public void setState(String state) {
        this.state = state;
    }

    public String getState() {
        return state;
    }

    public Memento createMemento() {
        return new Memento(state);
    }

    public void restoreFromMemento(Memento memento) {
        this.state = memento.getState();
    }
}

// 负责人
public class Caretaker {
    private List<Memento> mementoList = new ArrayList<>();

    public void add(Memento memento) {
        mementoList.add(memento);
    }

    public Memento get(int index) {
        return mementoList.get(index);
    }

    public int size() {
        return mementoList.size();
    }
}

// 客户端
public class Client {
    public static void main(String[] args) {
        Originator originator = new Originator();
        Caretaker caretaker = new Caretaker();

        originator.setState("状态1");
        caretaker.add(originator.createMemento());

        originator.setState("状态2");
        caretaker.add(originator.createMemento());

        originator.setState("状态3");
        System.out.println("当前状态: " + originator.getState());

        originator.restoreFromMemento(caretaker.get(1));
        System.out.println("恢复后状态: " + originator.getState());

        originator.restoreFromMemento(caretaker.get(0));
        System.out.println("恢复到最初状态: " + originator.getState());
    }
}
```

## 实际应用示例

### 场景：文本编辑器撤销功能

实现一个简单的文本编辑器，支持保存和撤销操作。

```java
// 备忘录：文本状态
public class TextMemento {
    private String text;
    private int cursorPosition;

    public TextMemento(String text, int cursorPosition) {
        this.text = text;
        this.cursorPosition = cursorPosition;
    }

    public String getText() {
        return text;
    }

    public int getCursorPosition() {
        return cursorPosition;
    }
}

// 原发器：文本编辑器
public class TextEditor {
    private StringBuilder text = new StringBuilder();
    private int cursorPosition = 0;

    public void type(String words) {
        text.insert(cursorPosition, words);
        cursorPosition += words.length();
    }

    public void delete(int length) {
        int start = Math.max(0, cursorPosition - length);
        text.delete(start, cursorPosition);
        cursorPosition = start;
    }

    public void moveCursor(int position) {
        cursorPosition = Math.max(0, Math.min(position, text.length()));
    }

    public String getText() {
        return text.toString();
    }

    public int getCursorPosition() {
        return cursorPosition;
    }

    public TextMemento save() {
        return new TextMemento(text.toString(), cursorPosition);
    }

    public void restore(TextMemento memento) {
        this.text = new StringBuilder(memento.getText());
        this.cursorPosition = memento.getCursorPosition();
    }

    public void show() {
        System.out.println("文本: \"" + text + "\"");
        System.out.println("光标位置: " + cursorPosition);
    }
}

// 负责人：历史记录管理器
public class HistoryManager {
    private Stack<TextMemento> history = new Stack<>();
    private Stack<TextMemento> redoStack = new Stack<>();

    public void save(TextMemento memento) {
        history.push(memento);
        redoStack.clear();
    }

    public TextMemento undo() {
        if (history.size() > 1) {
            redoStack.push(history.pop());
            return history.peek();
        }
        return null;
    }

    public TextMemento redo() {
        if (!redoStack.isEmpty()) {
            TextMemento memento = redoStack.pop();
            history.push(memento);
            return memento;
        }
        return null;
    }

    public boolean canUndo() {
        return history.size() > 1;
    }

    public boolean canRedo() {
        return !redoStack.isEmpty();
    }
}

// 客户端
public class Client {
    public static void main(String[] args) {
        TextEditor editor = new TextEditor();
        HistoryManager history = new HistoryManager();

        System.out.println("=== 初始状态 ===");
        history.save(editor.save());
        editor.show();

        System.out.println("\n=== 输入 'Hello' ===");
        editor.type("Hello");
        history.save(editor.save());
        editor.show();

        System.out.println("\n=== 输入 ' World' ===");
        editor.type(" World");
        history.save(editor.save());
        editor.show();

        System.out.println("\n=== 输入 '!' ===");
        editor.type("!");
        history.save(editor.save());
        editor.show();

        System.out.println("\n=== 撤销一次 ===");
        TextMemento undoMemento = history.undo();
        if (undoMemento != null) {
            editor.restore(undoMemento);
        }
        editor.show();

        System.out.println("\n=== 撤销两次 ===");
        undoMemento = history.undo();
        if (undoMemento != null) {
            editor.restore(undoMemento);
        }
        editor.show();

        System.out.println("\n=== 重做一次 ===");
        TextMemento redoMemento = history.redo();
        if (redoMemento != null) {
            editor.restore(redoMemento);
        }
        editor.show();
    }
}
```

**输出结果：**

```
=== 初始状态 ===
文本: ""
光标位置: 0

=== 输入 'Hello' ===
文本: "Hello"
光标位置: 5

=== 输入 ' World' ===
文本: "Hello World"
光标位置: 11

=== 输入 '!' ===
文本: "Hello World!"
光标位置: 12

=== 撤销一次 ===
文本: "Hello World"
光标位置: 11

=== 撤销两次 ===
文本: "Hello"
光标位置: 5

=== 重做一次 ===
文本: "Hello World"
光标位置: 11
```

### 场景：游戏存档

```java
// 备忘录：游戏状态
public class GameMemento {
    private int level;
    private int score;
    private int health;
    private String checkpoint;

    public GameMemento(int level, int score, int health, String checkpoint) {
        this.level = level;
        this.score = score;
        this.health = health;
        this.checkpoint = checkpoint;
    }

    public int getLevel() { return level; }
    public int getScore() { return score; }
    public int getHealth() { return health; }
    public String getCheckpoint() { return checkpoint; }
}

// 原发器：游戏角色
public class GameCharacter {
    private int level = 1;
    private int score = 0;
    private int health = 100;
    private String checkpoint = "起点";

    public void play(String checkpoint, int points, int damage) {
        this.checkpoint = checkpoint;
        this.score += points;
        this.health -= damage;
        if (health <= 0) {
            health = 0;
            System.out.println("游戏结束！");
        } else if (score >= level * 100) {
            level++;
            System.out.println("升级！当前等级: " + level);
        }
    }

    public GameMemento save() {
        System.out.println("保存游戏...");
        return new GameMemento(level, score, health, checkpoint);
    }

    public void restore(GameMemento memento) {
        this.level = memento.getLevel();
        this.score = memento.getScore();
        this.health = memento.getHealth();
        this.checkpoint = memento.getCheckpoint();
        System.out.println("读取存档...");
    }

    public void showStatus() {
        System.out.println("等级: " + level + 
            " | 分数: " + score + 
            " | 生命: " + health + 
            " | 检查点: " + checkpoint);
    }
}

// 负责人：存档管理器
public class SaveManager {
    private Map<String, GameMemento> saves = new HashMap<>();

    public void save(String slot, GameMemento memento) {
        saves.put(slot, memento);
    }

    public GameMemento load(String slot) {
        return saves.get(slot);
    }

    public boolean hasSave(String slot) {
        return saves.containsKey(slot);
    }
}

// 客户端
public class Client {
    public static void main(String[] args) {
        GameCharacter player = new GameCharacter();
        SaveManager saveManager = new SaveManager();

        System.out.println("=== 游戏开始 ===");
        player.showStatus();

        System.out.println("\n=== 通过第一关 ===");
        player.play("第一关", 80, 20);
        player.showStatus();

        saveManager.save("slot1", player.save());

        System.out.println("\n=== 通过第二关 ===");
        player.play("第二关", 120, 30);
        player.showStatus();

        saveManager.save("slot2", player.save());

        System.out.println("\n=== 第三关失败 ===");
        player.play("第三关", 0, 100);
        player.showStatus();

        System.out.println("\n=== 读取存档 slot1 ===");
        player.restore(saveManager.load("slot1"));
        player.showStatus();

        System.out.println("\n=== 读取存档 slot2 ===");
        player.restore(saveManager.load("slot2"));
        player.showStatus();
    }
}
```

## 应用场景

| 场景 | 说明 |
|------|------|
| **撤销/重做** | 文本编辑器、图形编辑器的撤销功能 |
| **游戏存档** | 保存游戏进度，支持读档恢复 |
| **事务回滚** | 数据库事务的回滚机制 |
| **配置管理** | 保存配置快照，支持配置回滚 |
| **版本控制** | 代码版本的历史记录和回退 |
| **快照功能** | 虚拟机快照、系统还原点 |

## 优缺点分析

### 优点

1. **不破坏封装**：状态保存在备忘录中，不暴露原发器内部结构
2. **简化原发器**：状态管理交给负责人处理
3. **支持撤销**：提供状态恢复机制
4. **历史记录**：可以保存多个状态快照

### 缺点

1. **内存消耗**：保存大量状态会占用内存
2. **管理复杂**：负责人需要管理备忘录的生命周期
3. **性能问题**：大型对象的深拷贝可能影响性能

## 与其他模式的关系

| 模式 | 关系 |
|------|------|
| **命令模式** | 可结合命令模式实现撤销功能 |
| **原型模式** | 可用原型模式代替备忘录进行状态克隆 |
| **状态模式** | 状态模式关注状态转换，备忘录关注状态保存 |
| **迭代器模式** | 可用迭代器遍历备忘录历史 |

## 最佳实践

1. **控制备忘录数量**：限制保存的历史记录数量
2. **增量保存**：只保存变化的部分，减少内存占用
3. **序列化**：支持将备忘录序列化到磁盘
4. **不可变备忘录**：备忘录应该是不可变的

## 总结

备忘录模式通过在不破坏封装的前提下保存对象状态，实现了撤销/恢复功能。它广泛应用于编辑器、游戏存档、事务处理等场景。使用时需要注意内存消耗问题，可通过限制历史记录数量或增量保存来优化。
