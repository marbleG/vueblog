# Java 集合框架概述

Java 集合框架是 Java 标准库提供的一套数据结构容器，统一接口，方便使用。

## 整体架构

```
Collection (接口)
├─ List (接口): 有序，可重复
│  ├─ ArrayList
│  ├─ LinkedList
│  └─ Vector (过时)
│     └─ Stack (过时)
├─ Set (接口): 无序，不可重复
│  ├─ HashSet
│  │  └─ LinkedHashSet
│  ├─ TreeSet
│  └─ EnumSet
├─ Queue (接口): 队列
│  ├─ LinkedList
│  ├─ ArrayDeque
│  ├─ PriorityQueue
│  └─ BlockingQueue (并发包)
└─ Deque (接口): 双端队列，可以当栈用

Map (接口): key-value 映射，key 不可重复
├─ HashMap
│  └─ LinkedHashMap
├─ TreeMap
├─ Hashtable (过时)
├─ ConcurrentHashMap
└─ EnumMap
```

## Collection 接口通用方法

所有 Collection 实现都有的方法：

- `add(E e)` - 添加元素
- `remove(Object o)` - 删除元素
- `contains(Object o)` - 是否包含
- `size()` - 元素个数
- `isEmpty()` - 是否为空
- `clear()` - 清空
- `iterator()` - 获取迭代器
- `toArray()` - 转数组

## Iterator 迭代器

迭代器用于遍历集合，统一遍历方式，不需要知道内部结构：

```java
Iterator<Integer> it = list.iterator();
while (it.hasNext()) {
    Integer num = it.next();
    // 处理元素
}

// 增强 for 循环底层就是迭代器
for (Integer num : list) {
    // 处理元素
}
```

**注意**：迭代器遍历过程中，不能通过集合的 `remove()` 删除元素，会抛出 `ConcurrentModificationException`，应该用迭代器的 `remove()`。

## 工具类

### Collections 工具类

提供很多静态工具方法：
- `sort(List list)` - 排序
- `reverse(List list)` - 反转
- `shuffle(List list)` - 打乱
- `max(Collection coll)` / `min(Collection coll)` - 最大最小
- `synchronizedList` / `synchronizedMap` - 包装成线程安全集合（不推荐，直接用并发包下的更好）
- `emptyList()` / `singletonList(T o)` - 返回不可变空/单元素集合

### Arrays 工具类

用于数组：
- `asList(T... a)` - 数组转 List，返回的 ArrayList 是Arrays内部类，大小固定，不能增删
- `sort()` - 排序数组
- `binarySearch()` - 二分查找
- `copyOf()` - 复制数组
- `toString()` - 打印数组

## 选择总结

| 需求 | 选择 |
|------|------|
| 需要可重复，有序，快速随机访问 | `ArrayList` |
| 需要频繁插入删除在头尾/中间 | `LinkedList` |
| 需要去重 | `HashSet` |
| 需要排序去重 | `TreeSet` |
| 需要保序去重 | `LinkedHashSet` |
| 队列，FIFO | `LinkedList` / `ArrayDeque` |
| 优先级队列 | `PriorityQueue` |
| 栈 | `ArrayDeque`（不要用 Stack） |
| Key-Value 映射 | `HashMap` |
| Key-Value 需要排序 | `TreeMap` |
| Key-Value 需要保序 | `LinkedHashMap` |
| 并发场景 Key-Value | `ConcurrentHashMap` |

---

参考：[Java Platform, Standard Edition API - java.util](https://docs.oracle.com/en/java/javase/17/docs/api/java/util/package-summary.html)
