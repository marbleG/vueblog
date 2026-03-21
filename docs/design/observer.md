# 观察者模式（Observer）

## 模式定义

观察者模式（Observer Pattern）是一种行为型设计模式，它定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新。

## 核心思想

建立一种订阅机制，可在对象事件发生时通知多个"观察"该对象的其他对象。

## 结构组成

观察者模式包含以下核心角色：

| 角色 | 职责 |
|------|------|
| **主题（Subject）** | 被观察的对象，维护观察者列表，提供注册和通知方法 |
| **具体主题（ConcreteSubject）** | 实现主题接口，状态改变时通知观察者 |
| **观察者（Observer）** | 定义更新接口，接收主题通知 |
| **具体观察者（ConcreteObserver）** | 实现观察者接口，在收到通知时更新自身状态 |

## UML 类图

```
┌─────────────────┐       ┌─────────────────┐
│     Subject     │       │    Observer     │
├─────────────────┤       ├─────────────────┤
│ - observers     │──────>│ + update()      │
├─────────────────┤       └────────┬────────┘
│ + attach()      │                │
│ + detach()      │                │
│ + notify()      │                │
└────────┬────────┘                │
         │                  ┌──────┴──────┐
         │                  │             │
  ┌──────┴──────┐    ┌──────┴──────┐ ┌────┴─────┐
  │ConcreteSubj │    │ConcreteObs1 │ │ConcreteObs2│
  ├─────────────┤    ├─────────────┤ ├──────────┤
  │ - state     │    │ + update()  │ │ + update()│
  └─────────────┘    └─────────────┘ └──────────┘
```

## 实现代码

### 基础实现

```java
// 观察者接口
public interface Observer {
    void update(String message);
}

// 主题接口
public interface Subject {
    void attach(Observer observer);
    void detach(Observer observer);
    void notifyObservers();
}

// 具体主题
public class ConcreteSubject implements Subject {
    private List<Observer> observers = new ArrayList<>();
    private String message;

    @Override
    public void attach(Observer observer) {
        observers.add(observer);
    }

    @Override
    public void detach(Observer observer) {
        observers.remove(observer);
    }

    @Override
    public void notifyObservers() {
        for (Observer observer : observers) {
            observer.update(message);
        }
    }

    public void setMessage(String message) {
        this.message = message;
        notifyObservers();
    }
}

// 具体观察者
public class ConcreteObserver implements Observer {
    private String name;

    public ConcreteObserver(String name) {
        this.name = name;
    }

    @Override
    public void update(String message) {
        System.out.println(name + " 收到消息: " + message);
    }
}

// 客户端
public class Client {
    public static void main(String[] args) {
        ConcreteSubject subject = new ConcreteSubject();

        Observer observer1 = new ConcreteObserver("观察者1");
        Observer observer2 = new ConcreteObserver("观察者2");
        Observer observer3 = new ConcreteObserver("观察者3");

        subject.attach(observer1);
        subject.attach(observer2);
        subject.attach(observer3);

        subject.setMessage("第一条消息");

        System.out.println("\n移除观察者2");
        subject.detach(observer2);

        subject.setMessage("第二条消息");
    }
}
```

## 实际应用示例

### 场景：新闻发布订阅系统

实现一个新闻发布系统，用户可以订阅不同类型的新闻，当有新新闻发布时，订阅者会收到通知。

```java
// 观察者接口：订阅者
public interface Subscriber {
    void update(News news);
    String getName();
}

// 新闻类
public class News {
    private String category;
    private String title;
    private String content;
    private Date publishTime;

    public News(String category, String title, String content) {
        this.category = category;
        this.title = title;
        this.content = content;
        this.publishTime = new Date();
    }

    public String getCategory() { return category; }
    public String getTitle() { return title; }
    public String getContent() { return content; }
    public Date getPublishTime() { return publishTime; }
}

// 主题：新闻发布者
public class NewsPublisher {
    private Map<String, List<Subscriber>> subscribers = new HashMap<>();

    public void subscribe(String category, Subscriber subscriber) {
        subscribers.computeIfAbsent(category, k -> new ArrayList<>()).add(subscriber);
        System.out.println(subscriber.getName() + " 订阅了 [" + category + "] 类别");
    }

    public void unsubscribe(String category, Subscriber subscriber) {
        List<Subscriber> list = subscribers.get(category);
        if (list != null) {
            list.remove(subscriber);
            System.out.println(subscriber.getName() + " 取消订阅 [" + category + "] 类别");
        }
    }

    public void publish(News news) {
        System.out.println("\n发布新闻: [" + news.getCategory() + "] " + news.getTitle());
        List<Subscriber> list = subscribers.get(news.getCategory());
        if (list != null) {
            for (Subscriber subscriber : list) {
                subscriber.update(news);
            }
        }
    }
}

// 具体观察者：邮件订阅者
public class EmailSubscriber implements Subscriber {
    private String name;
    private String email;

    public EmailSubscriber(String name, String email) {
        this.name = name;
        this.email = email;
    }

    @Override
    public void update(News news) {
        System.out.println("  [邮件] " + email + " 收到新闻: " + news.getTitle());
    }

    @Override
    public String getName() {
        return name;
    }
}

// 具体观察者：短信订阅者
public class SmsSubscriber implements Subscriber {
    private String name;
    private String phone;

    public SmsSubscriber(String name, String phone) {
        this.name = name;
        this.phone = phone;
    }

    @Override
    public void update(News news) {
        System.out.println("  [短信] " + phone + " 收到新闻: " + news.getTitle());
    }

    @Override
    public String getName() {
        return name;
    }
}

// 客户端
public class Client {
    public static void main(String[] args) {
        NewsPublisher publisher = new NewsPublisher();

        Subscriber user1 = new EmailSubscriber("张三", "zhangsan@example.com");
        Subscriber user2 = new SmsSubscriber("李四", "13800138000");
        Subscriber user3 = new EmailSubscriber("王五", "wangwu@example.com");

        publisher.subscribe("科技", user1);
        publisher.subscribe("科技", user2);
        publisher.subscribe("体育", user2);
        publisher.subscribe("体育", user3);

        publisher.publish(new News("科技", "AI 技术突破", "人工智能领域取得重大进展..."));
        publisher.publish(new News("体育", "世界杯决赛", "决赛将在今晚举行..."));

        publisher.unsubscribe("科技", user2);

        publisher.publish(new News("科技", "新手机发布", "某品牌发布最新旗舰手机..."));
    }
}
```

**输出结果：**

```
张三 订阅了 [科技] 类别
李四 订阅了 [科技] 类别
李四 订阅了 [体育] 类别
王五 订阅了 [体育] 类别

发布新闻: [科技] AI 技术突破
  [邮件] zhangsan@example.com 收到新闻: AI 技术突破
  [短信] 13800138000 收到新闻: AI 技术突破

发布新闻: [体育] 世界杯决赛
  [短信] 13800138000 收到新闻: 世界杯决赛
  [邮件] wangwu@example.com 收到新闻: 世界杯决赛
李四 取消订阅 [科技] 类别

发布新闻: [科技] 新手机发布
  [邮件] zhangsan@example.com 收到新闻: 新手机发布
```

### 场景：GUI 事件处理

```java
// 观察者接口：事件监听器
public interface EventListener {
    void onEvent(String eventType, Object data);
}

// 主题：按钮组件
public class Button {
    private String name;
    private List<EventListener> listeners = new ArrayList<>();

    public Button(String name) {
        this.name = name;
    }

    public void addListener(EventListener listener) {
        listeners.add(listener);
    }

    public void removeListener(EventListener listener) {
        listeners.remove(listener);
    }

    public void click() {
        System.out.println("按钮 [" + name + "] 被点击");
        notifyListeners("click", null);
    }

    public void hover() {
        System.out.println("鼠标悬停在按钮 [" + name + "] 上");
        notifyListeners("hover", null);
    }

    private void notifyListeners(String eventType, Object data) {
        for (EventListener listener : listeners) {
            listener.onEvent(eventType, data);
        }
    }
}

// 具体观察者：点击处理器
public class ClickHandler implements EventListener {
    @Override
    public void onEvent(String eventType, Object data) {
        if ("click".equals(eventType)) {
            System.out.println("  -> 执行点击处理逻辑");
        }
    }
}

// 具体观察者：日志记录器
public class LogHandler implements EventListener {
    @Override
    public void onEvent(String eventType, Object data) {
        System.out.println("  -> 记录事件日志: " + eventType);
    }
}

// 客户端
public class Client {
    public static void main(String[] args) {
        Button button = new Button("提交");

        button.addListener(new ClickHandler());
        button.addListener(new LogHandler());

        button.hover();
        System.out.println();
        button.click();
    }
}
```

## Java 内置观察者模式

Java 提供了内置的观察者模式实现：

```java
import java.util.Observable;
import java.util.Observer;

// 被观察者（已废弃，仅作演示）
public class NewsAgency extends Observable {
    private String news;

    public void setNews(String news) {
        this.news = news;
        setChanged();
        notifyObservers(news);
    }

    public String getNews() {
        return news;
    }
}

// 观察者
public class NewsChannel implements Observer {
    private String name;

    public NewsChannel(String name) {
        this.name = name;
    }

    @Override
    public void update(Observable o, Object arg) {
        System.out.println(name + " 收到新闻: " + arg);
    }
}

// 客户端
public class Client {
    public static void main(String[] args) {
        NewsAgency agency = new NewsAgency();
        agency.addObserver(new NewsChannel("频道1"));
        agency.addObserver(new NewsChannel("频道2"));

        agency.setNews("重大新闻！");
    }
}
```

> **注意**：Java 9 中 `Observable` 和 `Observer` 已被废弃，建议使用 `PropertyChangeListener` 或自定义实现。

## 应用场景

| 场景 | 说明 |
|------|------|
| **事件处理** | GUI 事件监听、按钮点击事件 |
| **消息订阅** | 消息队列、RSS 订阅、新闻推送 |
| **数据绑定** | MVVM 框架中的数据绑定 |
| **日志监控** | 日志变化时通知多个处理器 |
| **股票行情** | 股价变动时通知所有订阅者 |
| **游戏开发** | 成就系统、任务进度通知 |

## 优缺点分析

### 优点

1. **解耦**：主题和观察者之间松耦合
2. **扩展性好**：新增观察者无需修改主题代码
3. **广播通信**：一个消息可通知多个对象
4. **符合开闭原则**：对扩展开放，对修改关闭

### 缺点

1. **性能问题**：观察者过多时通知耗时
2. **循环依赖**：可能导致循环调用
3. **调试困难**：难以追踪数据流向
4. **无通知保证**：无法确保观察者收到通知

## 与其他模式的关系

| 模式 | 关系 |
|------|------|
| **中介者模式** | 中介者封装交互，观察者通过订阅通知 |
| **发布-订阅模式** | 观察者的扩展，引入消息通道 |
| **单例模式** | 主题对象常使用单例 |
| **装饰器模式** | 可动态添加观察者功能 |

## 最佳实践

1. **推模型 vs 拉模型**：推模型主动传递数据，拉模型由观察者获取
2. **异步通知**：大量观察者时使用异步通知提高性能
3. **避免循环依赖**：注意观察者之间的相互依赖
4. **线程安全**：多线程环境下确保通知机制的线程安全

## 总结

观察者模式是使用最广泛的设计模式之一，它建立了一种一对多的依赖关系，使得主题状态变化时能自动通知所有观察者。在事件处理、消息订阅、数据绑定等场景中应用广泛。使用时需要注意性能问题和循环依赖风险。
