# 享元模式（Flyweight）

## 模式定义

享元模式（Flyweight Pattern）是一种结构型设计模式，它通过共享技术有效地支持大量细粒度对象的复用，减少内存占用。

## 核心思想

将对象的状态分为内部状态（Intrinsic State）和外部状态（Extrinsic State），内部状态可以共享，外部状态由客户端维护。

## 结构组成

享元模式包含四个核心角色：

| 角色 | 职责 |
|------|------|
| **抽象享元（Flyweight）** | 声明公共接口，通过它可以接受并作用于外部状态 |
| **具体享元（Concrete Flyweight）** | 实现抽象享元接口，包含内部状态 |
| **享元工厂（Flyweight Factory）** | 创建和管理享元对象，确保合理共享 |
| **客户端（Client）** | 维护外部状态，使用享元对象 |

## 代码示例

### 场景描述

假设我们需要开发一个围棋游戏，棋盘上有大量棋子，使用享元模式来减少内存占用。

### 实现代码

```java
// 抽象享元：棋子
public interface ChessPiece {
    void display(int x, int y);
}

// 具体享元：黑棋
public class BlackChessPiece implements ChessPiece {
    @Override
    public void display(int x, int y) {
        System.out.println("黑棋位置: (" + x + ", " + y + ")");
    }
}

// 具体享元：白棋
public class WhiteChessPiece implements ChessPiece {
    @Override
    public void display(int x, int y) {
        System.out.println("白棋位置: (" + x + ", " + y + ")");
    }
}

// 享元工厂
public class ChessPieceFactory {
    private static final Map<String, ChessPiece> pieces = new HashMap<>();
    
    public static ChessPiece getChessPiece(String color) {
        ChessPiece piece = pieces.get(color);
        if (piece == null) {
            if ("black".equals(color)) {
                piece = new BlackChessPiece();
            } else if ("white".equals(color)) {
                piece = new WhiteChessPiece();
            }
            pieces.put(color, piece);
        }
        return piece;
    }
    
    public static int getPieceCount() {
        return pieces.size();
    }
}

// 客户端
public class Client {
    public static void main(String[] args) {
        ChessPiece black1 = ChessPieceFactory.getChessPiece("black");
        black1.display(1, 1);
        
        ChessPiece black2 = ChessPieceFactory.getChessPiece("black");
        black2.display(2, 2);
        
        ChessPiece white1 = ChessPieceFactory.getChessPiece("white");
        white1.display(3, 3);
        
        ChessPiece white2 = ChessPieceFactory.getChessPiece("white");
        white2.display(4, 4);
        
        System.out.println("棋子对象数量: " + ChessPieceFactory.getPieceCount());
        System.out.println("black1 == black2: " + (black1 == black2));
    }
}
```

### Python 实现

```python
from abc import ABC, abstractmethod
from typing import Dict

class ChessPiece(ABC):
    @abstractmethod
    def display(self, x: int, y: int):
        pass

class BlackChessPiece(ChessPiece):
    def display(self, x: int, y: int):
        print(f"黑棋位置: ({x}, {y})")

class WhiteChessPiece(ChessPiece):
    def display(self, x: int, y: int):
        print(f"白棋位置: ({x}, {y})")

class ChessPieceFactory:
    _pieces: Dict[str, ChessPiece] = {}
    
    @classmethod
    def get_chess_piece(cls, color: str) -> ChessPiece:
        if color not in cls._pieces:
            if color == "black":
                cls._pieces[color] = BlackChessPiece()
            elif color == "white":
                cls._pieces[color] = WhiteChessPiece()
        return cls._pieces[color]
    
    @classmethod
    def get_piece_count(cls) -> int:
        return len(cls._pieces)

if __name__ == "__main__":
    black1 = ChessPieceFactory.get_chess_piece("black")
    black1.display(1, 1)
    
    black2 = ChessPieceFactory.get_chess_piece("black")
    black2.display(2, 2)
    
    white1 = ChessPieceFactory.get_chess_piece("white")
    white1.display(3, 3)
    
    print(f"棋子对象数量: {ChessPieceFactory.get_piece_count()}")
    print(f"black1 is black2: {black1 is black2}")
```

## 内部状态与外部状态

| 状态类型 | 说明 | 示例 |
|---------|------|------|
| **内部状态** | 可以共享，存储在享元对象内部 | 棋子颜色 |
| **外部状态** | 不可共享，由客户端维护 | 棋子位置 |

## 应用场景

### 适用场景

1. **大量相似对象**：系统中存在大量相同或相似的对象
2. **内存敏感**：对象占用内存较大，需要优化
3. **状态可分离**：对象的大部分状态可以外部化

### 实际应用案例

| 应用场景 | 说明 |
|---------|------|
| **Java String** | 字符串常量池 |
| **Integer 缓存** | -128 到 127 的整数缓存 |
| **线程池** | 线程对象的复用 |
| **连接池** | 数据库连接的复用 |

## 优缺点分析

### 优点

| 优点 | 说明 |
|------|------|
| **减少内存** | 共享对象减少内存占用 |
| **减少对象数量** | 减少系统中对象的数量 |
| **外部化状态** | 将状态外部化，便于管理 |

### 缺点

| 缺点 | 说明 |
|------|------|
| **复杂度增加** | 需要区分内部状态和外部状态 |
| **运行时间增加** | 需要查找共享对象 |
| **线程安全** | 共享对象需要考虑线程安全 |

## 最佳实践

### 1. 复合享元

```java
public class CompositeFlyweight implements Flyweight {
    private Map<String, Flyweight> flyweights = new HashMap<>();
    
    public void add(String key, Flyweight flyweight) {
        flyweights.put(key, flyweight);
    }
    
    @Override
    public void operation(String extrinsicState) {
        for (Flyweight flyweight : flyweights.values()) {
            flyweight.operation(extrinsicState);
        }
    }
}
```

### 2. 线程安全

```java
public class FlyweightFactory {
    private static final ConcurrentHashMap<String, Flyweight> flyweights = new ConcurrentHashMap<>();
    
    public static Flyweight getFlyweight(String key) {
        return flyweights.computeIfAbsent(key, k -> new ConcreteFlyweight(k));
    }
}
```

## 与其他模式的关系

| 模式 | 关系 |
|------|------|
| **工厂方法模式** | 享元工厂使用工厂方法创建享元对象 |
| **单例模式** | 享元对象类似单例，但可以有多个实例 |
| **组合模式** | 复合享元使用组合模式 |

## 总结

享元模式是 GoF 23 种设计模式之一，它通过共享技术减少内存占用，适用于存在大量相似对象的场景。需要注意区分内部状态和外部状态，合理设计享元对象。
