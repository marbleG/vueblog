# 适配器模式（Adapter）

## 模式定义

适配器模式（Adapter Pattern）是一种结构型设计模式，它将一个类的接口转换成客户端期望的另一个接口，使原本因接口不兼容而不能一起工作的类可以协同工作。

## 核心思想

通过创建一个中间层（适配器），将一个类的接口包装成另一个接口，解决接口不兼容问题。

## 结构组成

适配器模式包含三个核心角色：

| 角色 | 职责 |
|------|------|
| **目标接口（Target）** | 客户端期望的接口 |
| **适配者（Adaptee）** | 需要被适配的现有接口 |
| **适配器（Adapter）** | 将适配者接口转换为目标接口 |

## 实现方式

### 1. 类适配器（继承）

```java
// 目标接口
public interface Target {
    void request();
}

// 适配者
public class Adaptee {
    public void specificRequest() {
        System.out.println("适配者的特定请求");
    }
}

// 类适配器（继承）
public class ClassAdapter extends Adaptee implements Target {
    @Override
    public void request() {
        specificRequest();
    }
}
```

### 2. 对象适配器（组合）

```java
// 目标接口
public interface Target {
    void request();
}

// 适配者
public class Adaptee {
    public void specificRequest() {
        System.out.println("适配者的特定请求");
    }
}

// 对象适配器（组合）
public class ObjectAdapter implements Target {
    private Adaptee adaptee;
    
    public ObjectAdapter(Adaptee adaptee) {
        this.adaptee = adaptee;
    }
    
    @Override
    public void request() {
        adaptee.specificRequest();
    }
}

// 客户端使用
public class Client {
    public static void main(String[] args) {
        Target target = new ObjectAdapter(new Adaptee());
        target.request();
    }
}
```

## 代码示例

### 场景描述

假设我们有一个播放器，原本只能播放 MP3 格式，现在需要支持播放 MP4 和 VLC 格式，使用适配器模式来实现。

### 实现代码

```java
// 目标接口：媒体播放器
public interface MediaPlayer {
    void play(String filename);
}

// 适配者：高级媒体播放器
public interface AdvancedMediaPlayer {
    void playVlc(String filename);
    void playMp4(String filename);
}

public class VlcPlayer implements AdvancedMediaPlayer {
    @Override
    public void playVlc(String filename) {
        System.out.println("播放 VLC 文件: " + filename);
    }
    
    @Override
    public void playMp4(String filename) {
    }
}

public class Mp4Player implements AdvancedMediaPlayer {
    @Override
    public void playVlc(String filename) {
    }
    
    @Override
    public void playMp4(String filename) {
        System.out.println("播放 MP4 文件: " + filename);
    }
}

// 适配器
public class MediaAdapter implements MediaPlayer {
    private AdvancedMediaPlayer advancedPlayer;
    
    public MediaAdapter(String audioType) {
        if (audioType.equalsIgnoreCase("vlc")) {
            advancedPlayer = new VlcPlayer();
        } else if (audioType.equalsIgnoreCase("mp4")) {
            advancedPlayer = new Mp4Player();
        }
    }
    
    @Override
    public void play(String filename) {
        if (filename.endsWith(".vlc")) {
            advancedPlayer.playVlc(filename);
        } else if (filename.endsWith(".mp4")) {
            advancedPlayer.playMp4(filename);
        }
    }
}

// 客户端
public class AudioPlayer implements MediaPlayer {
    private MediaAdapter mediaAdapter;
    
    @Override
    public void play(String filename) {
        if (filename.endsWith(".mp3")) {
            System.out.println("播放 MP3 文件: " + filename);
        } else if (filename.endsWith(".vlc") || filename.endsWith(".mp4")) {
            mediaAdapter = new MediaAdapter(filename.substring(filename.lastIndexOf(".") + 1));
            mediaAdapter.play(filename);
        } else {
            System.out.println("不支持的格式: " + filename);
        }
    }
}
```

### Python 实现

```python
from abc import ABC, abstractmethod

class MediaPlayer(ABC):
    @abstractmethod
    def play(self, filename: str):
        pass

class AdvancedMediaPlayer(ABC):
    @abstractmethod
    def play_vlc(self, filename: str):
        pass
    
    @abstractmethod
    def play_mp4(self, filename: str):
        pass

class VlcPlayer(AdvancedMediaPlayer):
    def play_vlc(self, filename: str):
        print(f"播放 VLC 文件: {filename}")
    
    def play_mp4(self, filename: str):
        pass

class Mp4Player(AdvancedMediaPlayer):
    def play_vlc(self, filename: str):
        pass
    
    def play_mp4(self, filename: str):
        print(f"播放 MP4 文件: {filename}")

class MediaAdapter(MediaPlayer):
    def __init__(self, audio_type: str):
        if audio_type.lower() == "vlc":
            self.advanced_player = VlcPlayer()
        elif audio_type.lower() == "mp4":
            self.advanced_player = Mp4Player()
    
    def play(self, filename: str):
        if filename.endswith(".vlc"):
            self.advanced_player.play_vlc(filename)
        elif filename.endswith(".mp4"):
            self.advanced_player.play_mp4(filename)
```

## 应用场景

### 适用场景

1. **接口不兼容**：需要使用现有类，但其接口与需要的不匹配
2. **统一接口**：希望创建一个可以复用的类，与不相关或不可预见的类协同工作
3. **旧系统升级**：需要使用第三方库或遗留代码

### 实际应用案例

| 应用场景 | 说明 |
|---------|------|
| **Java IO** | InputStreamReader 将字节流转换为字符流 |
| **Spring MVC** | HandlerAdapter 适配不同类型的处理器 |
| **Arrays.asList()** | 将数组适配为 List |
| **JDBC** | 数据库驱动的适配 |

## 优缺点分析

### 优点

| 优点 | 说明 |
|------|------|
| **单一职责** | 适配逻辑与业务逻辑分离 |
| **开闭原则** | 不修改现有代码即可扩展 |
| **复用性高** | 可以复用现有的类 |
| **透明性** | 客户端无需知道适配细节 |

### 缺点

| 缺点 | 说明 |
|------|------|
| **复杂度增加** | 需要新增适配器类 |
| **过度使用** | 简单场景不需要适配器 |

## 最佳实践

### 1. 双向适配器

```java
public class TwoWayAdapter implements TargetA, TargetB {
    private TargetA targetA;
    private TargetB targetB;
    
    public TwoWayAdapter(TargetA targetA) {
        this.targetA = targetA;
    }
    
    public TwoWayAdapter(TargetB targetB) {
        this.targetB = targetB;
    }
    
    @Override
    public void requestA() {
        if (targetB != null) {
            targetB.requestB();
        } else {
            targetA.requestA();
        }
    }
    
    @Override
    public void requestB() {
        if (targetA != null) {
            targetA.requestA();
        } else {
            targetB.requestB();
        }
    }
}
```

### 2. 缺省适配器

```java
public interface Target {
    void method1();
    void method2();
    void method3();
}

public abstract class AbstractAdapter implements Target {
    @Override
    public void method1() {}
    
    @Override
    public void method2() {}
    
    @Override
    public void method3() {}
}

public class ConcreteAdapter extends AbstractAdapter {
    @Override
    public void method1() {
        System.out.println("实现 method1");
    }
}
```

## 与其他模式的关系

| 模式 | 关系 |
|------|------|
| **装饰器模式** | 装饰器增强功能，适配器改变接口 |
| **代理模式** | 代理控制访问，适配器转换接口 |
| **外观模式** | 外观简化接口，适配器转换接口 |

## 总结

适配器模式是 GoF 23 种设计模式之一，它解决了接口不兼容问题，使原本不能一起工作的类可以协同工作。对象适配器比类适配器更灵活，推荐使用组合而非继承。
