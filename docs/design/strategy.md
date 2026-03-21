# 策略模式（Strategy）

## 模式定义

策略模式（Strategy Pattern）是一种行为型设计模式，它定义了一系列算法，将每个算法封装起来，并使它们可以互相替换。策略模式让算法独立于使用它的客户端而变化。

## 核心思想

将算法的使用与实现分离，使得算法可以独立于客户端而变化，客户端可以根据需要选择不同的策略。

## 结构组成

策略模式包含以下核心角色：

| 角色 | 职责 |
|------|------|
| **策略接口（Strategy）** | 定义所有支持的算法的公共接口 |
| **具体策略（ConcreteStrategy）** | 实现策略接口，提供具体的算法实现 |
| **上下文（Context）** | 持有策略对象，调用策略的方法 |

## UML 类图

```
┌─────────────────┐       ┌─────────────────┐
│     Context     │       │    Strategy     │
├─────────────────┤       ├─────────────────┤
│ - strategy      │──────>│ + execute()     │
├─────────────────┤       └────────┬────────┘
│ + setStrategy() │                │
│ + execute()     │                │
└─────────────────┘                │
                          ┌────────┼────────┐
                          │        │        │
                   ┌──────┴───┐ ┌──┴────┐ ┌─┴──────┐
                   │StrategyA │ │StratB │ │StratC  │
                   ├──────────┤ ├───────┤ ├────────┤
                   │ + execute│ │+exec()│ │+exec() │
                   └──────────┘ └───────┘ └────────┘
```

## 实现代码

### 基础实现

```java
// 策略接口
public interface Strategy {
    void execute();
}

// 具体策略A
public class ConcreteStrategyA implements Strategy {
    @Override
    public void execute() {
        System.out.println("执行策略A");
    }
}

// 具体策略B
public class ConcreteStrategyB implements Strategy {
    @Override
    public void execute() {
        System.out.println("执行策略B");
    }
}

// 上下文
public class Context {
    private Strategy strategy;

    public void setStrategy(Strategy strategy) {
        this.strategy = strategy;
    }

    public void execute() {
        strategy.execute();
    }
}

// 客户端
public class Client {
    public static void main(String[] args) {
        Context context = new Context();

        context.setStrategy(new ConcreteStrategyA());
        context.execute();

        context.setStrategy(new ConcreteStrategyB());
        context.execute();
    }
}
```

## 实际应用示例

### 场景：支付系统

实现一个支付系统，支持多种支付方式：支付宝、微信、银行卡等。

```java
// 策略接口：支付策略
public interface PaymentStrategy {
    void pay(double amount);
    String getName();
}

// 具体策略：支付宝支付
public class AlipayStrategy implements PaymentStrategy {
    private String account;

    public AlipayStrategy(String account) {
        this.account = account;
    }

    @Override
    public void pay(double amount) {
        System.out.println("使用支付宝支付 " + amount + " 元");
        System.out.println("账号: " + account);
    }

    @Override
    public String getName() {
        return "支付宝";
    }
}

// 具体策略：微信支付
public class WechatPayStrategy implements PaymentStrategy {
    private String openId;

    public WechatPayStrategy(String openId) {
        this.openId = openId;
    }

    @Override
    public void pay(double amount) {
        System.out.println("使用微信支付 " + amount + " 元");
        System.out.println("OpenID: " + openId);
    }

    @Override
    public String getName() {
        return "微信支付";
    }
}

// 具体策略：银行卡支付
public class CreditCardStrategy implements PaymentStrategy {
    private String cardNumber;
    private String cvv;

    public CreditCardStrategy(String cardNumber, String cvv) {
        this.cardNumber = cardNumber;
        this.cvv = cvv;
    }

    @Override
    public void pay(double amount) {
        System.out.println("使用银行卡支付 " + amount + " 元");
        System.out.println("卡号: " + maskCardNumber(cardNumber));
    }

    @Override
    public String getName() {
        return "银行卡";
    }

    private String maskCardNumber(String number) {
        return "****-****-****-" + number.substring(number.length() - 4);
    }
}

// 上下文：购物车
public class ShoppingCart {
    private List<Item> items = new ArrayList<>();
    private PaymentStrategy paymentStrategy;

    public void addItem(String name, double price) {
        items.add(new Item(name, price));
        System.out.println("添加商品: " + name + ", 价格: " + price);
    }

    public void setPaymentStrategy(PaymentStrategy strategy) {
        this.paymentStrategy = strategy;
        System.out.println("选择支付方式: " + strategy.getName());
    }

    public void checkout() {
        double total = items.stream().mapToDouble(Item::getPrice).sum();
        System.out.println("\n=== 结算 ===");
        System.out.println("商品总数: " + items.size());
        System.out.println("应付金额: " + total);
        if (paymentStrategy != null) {
            paymentStrategy.pay(total);
            System.out.println("支付成功！");
        } else {
            System.out.println("请选择支付方式");
        }
        items.clear();
    }

    private static class Item {
        String name;
        double price;

        Item(String name, double price) {
            this.name = name;
            this.price = price;
        }

        double getPrice() { return price; }
    }
}

// 客户端
public class Client {
    public static void main(String[] args) {
        ShoppingCart cart = new ShoppingCart();

        cart.addItem("《设计模式》", 89.0);
        cart.addItem("《重构》", 69.0);
        cart.addItem("《代码整洁之道》", 59.0);

        System.out.println("\n=== 使用支付宝支付 ===");
        cart.setPaymentStrategy(new AlipayStrategy("user@example.com"));
        cart.checkout();

        cart.addItem("键盘", 299.0);
        cart.addItem("鼠标", 99.0);

        System.out.println("\n=== 使用微信支付 ===");
        cart.setPaymentStrategy(new WechatPayStrategy("wx_openid_12345"));
        cart.checkout();

        cart.addItem("显示器", 1299.0);

        System.out.println("\n=== 使用银行卡支付 ===");
        cart.setPaymentStrategy(new CreditCardStrategy("6222021234567890", "123"));
        cart.checkout();
    }
}
```

**输出结果：**

```
添加商品: 《设计模式》, 价格: 89.0
添加商品: 《重构》, 价格: 69.0
添加商品: 《代码整洁之道》, 价格: 59.0

=== 使用支付宝支付 ===
选择支付方式: 支付宝

=== 结算 ===
商品总数: 3
应付金额: 217.0
使用支付宝支付 217.0 元
账号: user@example.com
支付成功！
添加商品: 键盘, 价格: 299.0
添加商品: 鼠标, 价格: 99.0

=== 使用微信支付 ===
选择支付方式: 微信支付

=== 结算 ===
商品总数: 2
应付金额: 398.0
使用微信支付 398.0 元
OpenID: wx_openid_12345
支付成功！
添加商品: 显示器, 价格: 1299.0

=== 使用银行卡支付 ===
选择支付方式: 银行卡

=== 结算 ===
商品总数: 1
应付金额: 1299.0
使用银行卡支付 1299.0 元
卡号: ****-****-****-7890
支付成功！
```

### 场景：排序策略

```java
// 策略接口：排序策略
public interface SortStrategy {
    <T extends Comparable<T>> void sort(List<T> list);
    String getName();
}

// 具体策略：冒泡排序
public class BubbleSortStrategy implements SortStrategy {
    @Override
    public <T extends Comparable<T>> void sort(List<T> list) {
        for (int i = 0; i < list.size() - 1; i++) {
            for (int j = 0; j < list.size() - 1 - i; j++) {
                if (list.get(j).compareTo(list.get(j + 1)) > 0) {
                    T temp = list.get(j);
                    list.set(j, list.get(j + 1));
                    list.set(j + 1, temp);
                }
            }
        }
    }

    @Override
    public String getName() {
        return "冒泡排序";
    }
}

// 具体策略：快速排序
public class QuickSortStrategy implements SortStrategy {
    @Override
    public <T extends Comparable<T>> void sort(List<T> list) {
        quickSort(list, 0, list.size() - 1);
    }

    private <T extends Comparable<T>> void quickSort(List<T> list, int low, int high) {
        if (low < high) {
            int pivot = partition(list, low, high);
            quickSort(list, low, pivot - 1);
            quickSort(list, pivot + 1, high);
        }
    }

    private <T extends Comparable<T>> int partition(List<T> list, int low, int high) {
        T pivot = list.get(high);
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (list.get(j).compareTo(pivot) <= 0) {
                i++;
                T temp = list.get(i);
                list.set(i, list.get(j));
                list.set(j, temp);
            }
        }
        T temp = list.get(i + 1);
        list.set(i + 1, list.get(high));
        list.set(high, temp);
        return i + 1;
    }

    @Override
    public String getName() {
        return "快速排序";
    }
}

// 上下文：排序器
public class Sorter {
    private SortStrategy strategy;

    public void setStrategy(SortStrategy strategy) {
        this.strategy = strategy;
    }

    public <T extends Comparable<T>> void sort(List<T> list) {
        System.out.println("使用 " + strategy.getName() + " 排序");
        long start = System.nanoTime();
        strategy.sort(list);
        long end = System.nanoTime();
        System.out.println("耗时: " + (end - start) / 1000 + " 微秒");
    }
}

// 客户端
public class Client {
    public static void main(String[] args) {
        List<Integer> numbers = new ArrayList<>();
        Random random = new Random();
        for (int i = 0; i < 1000; i++) {
            numbers.add(random.nextInt(10000));
        }

        Sorter sorter = new Sorter();

        List<Integer> list1 = new ArrayList<>(numbers);
        sorter.setStrategy(new BubbleSortStrategy());
        sorter.sort(list1);

        List<Integer> list2 = new ArrayList<>(numbers);
        sorter.setStrategy(new QuickSortStrategy());
        sorter.sort(list2);
    }
}
```

## 应用场景

| 场景 | 说明 |
|------|------|
| **支付系统** | 多种支付方式的选择 |
| **排序算法** | 不同排序策略的切换 |
| **压缩算法** | ZIP、RAR、7Z 等压缩方式选择 |
| **路由策略** | 负载均衡中的路由算法 |
| **验证策略** | 不同验证规则的切换 |
| **导出格式** | 导出为 PDF、Excel、CSV 等格式 |

## 优缺点分析

### 优点

1. **开闭原则**：新增策略无需修改现有代码
2. **避免条件语句**：消除大量的 if-else 或 switch 语句
3. **算法复用**：策略可在不同上下文中复用
4. **易于切换**：运行时可动态切换策略
5. **分离关注点**：算法实现与使用分离

### 缺点

1. **客户端感知**：客户端需要知道所有策略
2. **策略过多**：策略数量过多会增加复杂度
3. **通信开销**：策略与上下文可能需要通信

## 与其他模式的关系

| 模式 | 关系 |
|------|------|
| **状态模式** | 状态模式状态自动切换，策略模式由客户端选择 |
| **工厂模式** | 可用工厂模式创建策略对象 |
| **模板方法模式** | 模板方法用继承改变行为，策略用组合改变行为 |
| **装饰器模式** | 装饰器改变对象外观，策略改变对象行为 |

## 最佳实践

1. **使用枚举**：简单策略可用枚举实现
2. **策略工厂**：用工厂模式管理策略创建
3. **默认策略**：提供默认策略避免空指针
4. **策略缓存**：频繁使用的策略可缓存

## 总结

策略模式通过将算法封装成独立的策略对象，实现了算法的定义与使用的分离。它适用于需要在运行时选择算法、避免复杂条件语句的场景。使用策略模式可以提高代码的可维护性和可扩展性，但需要注意策略数量过多时的管理问题。
