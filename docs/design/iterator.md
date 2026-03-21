# 迭代器模式（Iterator）

## 模式定义

迭代器模式（Iterator Pattern）是一种行为型设计模式，它提供一种方法顺序访问聚合对象中的各个元素，而又不暴露该对象的内部表示。

## 核心思想

将遍历聚合对象中元素的责任分离出来，封装到一个迭代器对象中，由迭代器提供遍历元素的方法，使得客户端无需了解聚合对象的内部结构。

## 结构组成

迭代器模式包含以下核心角色：

| 角色 | 职责 |
|------|------|
| **迭代器接口（Iterator）** | 声明遍历元素的方法：next()、hasNext() 等 |
| **具体迭代器（ConcreteIterator）** | 实现迭代器接口，跟踪当前遍历位置 |
| **聚合接口（Aggregate）** | 声明创建迭代器的方法 |
| **具体聚合（ConcreteAggregate）** | 实现聚合接口，返回具体迭代器实例 |

## UML 类图

```
┌─────────────────┐       ┌─────────────────┐
│   Aggregate     │       │    Iterator     │
├─────────────────┤       ├─────────────────┤
│ + createIterator│       │ + hasNext()     │
└────────┬────────┘       │ + next()        │
         │                └────────┬────────┘
         │                         │
  ┌──────┴──────┐           ┌──────┴──────┐
  │             │           │             │
┌─┴───────────┐ ┌─────────┐ │ ┌───────────┴─┐
│ConcreteAggr │ │ Element │ │ │ConcreteIter │
├─────────────┤ └─────────┘ │ ├─────────────┤
│ - elements  │             │ │ - aggregate │
└─────────────┘             │ │ - index     │
                            │ └─────────────┘
```

## 实现代码

### 基础实现

```java
// 迭代器接口
public interface Iterator<T> {
    boolean hasNext();
    T next();
}

// 聚合接口
public interface Aggregate<T> {
    Iterator<T> createIterator();
}

// 具体聚合：书籍集合
public class BookShelf implements Aggregate<Book> {
    private Book[] books;
    private int last = 0;

    public BookShelf(int maxSize) {
        this.books = new Book[maxSize];
    }

    public Book getBookAt(int index) {
        return books[index];
    }

    public void appendBook(Book book) {
        if (last < books.length) {
            this.books[last] = book;
            last++;
        }
    }

    public int getLength() {
        return last;
    }

    @Override
    public Iterator<Book> createIterator() {
        return new BookShelfIterator(this);
    }
}

// 书籍类
public class Book {
    private String name;

    public Book(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}

// 具体迭代器
public class BookShelfIterator implements Iterator<Book> {
    private BookShelf bookShelf;
    private int index = 0;

    public BookShelfIterator(BookShelf bookShelf) {
        this.bookShelf = bookShelf;
    }

    @Override
    public boolean hasNext() {
        return index < bookShelf.getLength();
    }

    @Override
    public Book next() {
        if (hasNext()) {
            Book book = bookShelf.getBookAt(index);
            index++;
            return book;
        }
        return null;
    }
}

// 客户端
public class Client {
    public static void main(String[] args) {
        BookShelf bookShelf = new BookShelf(4);
        bookShelf.appendBook(new Book("《设计模式》"));
        bookShelf.appendBook(new Book("《重构》"));
        bookShelf.appendBook(new Book("《代码整洁之道》"));
        bookShelf.appendBook(new Book("《领域驱动设计》"));

        Iterator<Book> iterator = bookShelf.createIterator();
        while (iterator.hasNext()) {
            Book book = iterator.next();
            System.out.println(book.getName());
        }
    }
}
```

## 实际应用示例

### 场景：自定义集合类

实现一个支持多种遍历方式的集合类，包括正向遍历、反向遍历和跳跃遍历。

```java
// 迭代器接口
public interface Iterator<T> {
    boolean hasNext();
    T next();
    void reset();
}

// 聚合接口
public interface CustomCollection<T> {
    Iterator<T> createForwardIterator();
    Iterator<T> createBackwardIterator();
    Iterator<T> createSkipIterator(int step);
    void add(T item);
    int size();
    T get(int index);
}

// 具体聚合
public class CustomList<T> implements CustomCollection<T> {
    private List<T> items = new ArrayList<>();

    @Override
    public void add(T item) {
        items.add(item);
    }

    @Override
    public int size() {
        return items.size();
    }

    @Override
    public T get(int index) {
        return items.get(index);
    }

    @Override
    public Iterator<T> createForwardIterator() {
        return new ForwardIterator<>(this);
    }

    @Override
    public Iterator<T> createBackwardIterator() {
        return new BackwardIterator<>(this);
    }

    @Override
    public Iterator<T> createSkipIterator(int step) {
        return new SkipIterator<>(this, step);
    }
}

// 正向迭代器
public class ForwardIterator<T> implements Iterator<T> {
    private CustomCollection<T> collection;
    private int index = 0;

    public ForwardIterator(CustomCollection<T> collection) {
        this.collection = collection;
    }

    @Override
    public boolean hasNext() {
        return index < collection.size();
    }

    @Override
    public T next() {
        if (hasNext()) {
            return collection.get(index++);
        }
        return null;
    }

    @Override
    public void reset() {
        index = 0;
    }
}

// 反向迭代器
public class BackwardIterator<T> implements Iterator<T> {
    private CustomCollection<T> collection;
    private int index;

    public BackwardIterator(CustomCollection<T> collection) {
        this.collection = collection;
        this.index = collection.size() - 1;
    }

    @Override
    public boolean hasNext() {
        return index >= 0;
    }

    @Override
    public T next() {
        if (hasNext()) {
            return collection.get(index--);
        }
        return null;
    }

    @Override
    public void reset() {
        index = collection.size() - 1;
    }
}

// 跳跃迭代器
public class SkipIterator<T> implements Iterator<T> {
    private CustomCollection<T> collection;
    private int step;
    private int index = 0;

    public SkipIterator(CustomCollection<T> collection, int step) {
        this.collection = collection;
        this.step = step;
    }

    @Override
    public boolean hasNext() {
        return index < collection.size();
    }

    @Override
    public T next() {
        if (hasNext()) {
            T item = collection.get(index);
            index += step;
            return item;
        }
        return null;
    }

    @Override
    public void reset() {
        index = 0;
    }
}

// 客户端
public class Client {
    public static void main(String[] args) {
        CustomCollection<String> collection = new CustomList<>();
        collection.add("A");
        collection.add("B");
        collection.add("C");
        collection.add("D");
        collection.add("E");
        collection.add("F");

        System.out.println("=== 正向遍历 ===");
        Iterator<String> forward = collection.createForwardIterator();
        while (forward.hasNext()) {
            System.out.print(forward.next() + " ");
        }

        System.out.println("\n\n=== 反向遍历 ===");
        Iterator<String> backward = collection.createBackwardIterator();
        while (backward.hasNext()) {
            System.out.print(backward.next() + " ");
        }

        System.out.println("\n\n=== 跳跃遍历（步长2）===");
        Iterator<String> skip = collection.createSkipIterator(2);
        while (skip.hasNext()) {
            System.out.print(skip.next() + " ");
        }
    }
}
```

**输出结果：**

```
=== 正向遍历 ===
A B C D E F 

=== 反向遍历 ===
F E D C B A 

=== 跳跃遍历（步长2）===
A C E 
```

## Java 内置迭代器

Java 集合框架已经内置了迭代器模式：

```java
// 使用 Java 内置迭代器
List<String> list = new ArrayList<>();
list.add("A");
list.add("B");
list.add("C");

// 方式1：Iterator
Iterator<String> iterator = list.iterator();
while (iterator.hasNext()) {
    System.out.println(iterator.next());
}

// 方式2：增强 for 循环（底层使用迭代器）
for (String item : list) {
    System.out.println(item);
}

// 方式3：ListIterator（支持双向遍历）
ListIterator<String> listIterator = list.listIterator();
while (listIterator.hasNext()) {
    System.out.println("正向: " + listIterator.next());
}
while (listIterator.hasPrevious()) {
    System.out.println("反向: " + listIterator.previous());
}
```

## 应用场景

| 场景 | 说明 |
|------|------|
| **集合遍历** | 各种容器类的元素遍历 |
| **树形结构** | 深度优先/广度优先遍历 |
| **文件系统** | 目录文件的遍历 |
| **数据库结果集** | ResultSet 的遍历 |
| **流式处理** | 数据流的逐元素处理 |
| **自定义容器** | 需要特殊遍历逻辑的容器 |

## 优缺点分析

### 优点

1. **单一职责**：将遍历职责分离到迭代器中
2. **隐藏内部结构**：客户端无需了解聚合对象的内部表示
3. **多遍历支持**：可同时进行多个遍历
4. **统一接口**：不同聚合对象使用相同的遍历接口
5. **开闭原则**：新增聚合类和迭代器无需修改现有代码

### 缺点

1. **增加类数量**：每个聚合类都需要对应的迭代器类
2. **简单场景冗余**：对于简单集合，使用迭代器可能过于复杂
3. **遍历中修改问题**：遍历时修改集合可能导致异常

## 与其他模式的关系

| 模式 | 关系 |
|------|------|
| **组合模式** | 常用迭代器遍历组合结构 |
| **工厂方法模式** | 聚合类用工厂方法创建迭代器 |
| **备忘录模式** | 可结合实现迭代器的快照功能 |
| **访问者模式** | 可结合实现对聚合元素的复杂操作 |

## 最佳实践

1. **实现 Iterable 接口**：Java 中实现 Iterable 支持增强 for 循环
2. **支持移除操作**：迭代器可提供 remove() 方法安全删除元素
3. **快速失败机制**：遍历时检测并发修改并抛出异常
4. **提供多种迭代器**：如正向、反向、过滤迭代器等

## 总结

迭代器模式通过将遍历逻辑封装到独立的迭代器对象中，实现了聚合对象与遍历逻辑的解耦。它提供了一种统一的方式来访问各种聚合对象，是集合框架的核心模式之一。在实际开发中，应优先使用语言内置的迭代器实现，仅在需要自定义遍历逻辑时才自行实现迭代器模式。
