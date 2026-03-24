# List 实现对比：ArrayList vs LinkedList

## ArrayList

### 底层结构

基于**动态数组**实现，连续内存存储：
```
// 默认初始容量 10
transient Object[] elementData;
private int size;
```

### 特点

- 支持随机访问，`get(int index)` O(1) 时间
- 尾部添加 O(1)，容量不够时扩容，增长 50%（`newCapacity = oldCapacity + (oldCapacity >> 1)`）
- 中间插入删除 O(n)，需要移动元素

### 使用场景

大部分场景都用 ArrayList：
- 需要频繁随机访问
- 大部分操作在尾部添加
- 遍历比 LinkedList 快，因为缓存行友好，连续内存

## LinkedList

### 底层结构

基于**双向链表**实现：
```
private static class Node<E> {
    E item;
    Node<E> next;
    Node<E> prev;
}
transient Node<E> first;
transient Node<E> last;
```

### 特点

- 不支持随机访问，查找需要从头或者尾遍历，get(index) O(n)
- 头尾插入删除 O(1)，只需要改指针
- 中间插入删除找到位置后 O(1)，但找位置 O(n)
- 内存不连续，遍历缓存命中率低，遍历比 ArrayList 慢

### 使用场景

- 频繁在链表头部/中间插入删除
- 实现栈、队列、双向队列

## ArrayList vs LinkedList 性能对比

| 操作 | ArrayList | LinkedList |
|------|-----------|------------|
| 随机访问 get(int) | O(1) | O(n) |
| 尾部添加 | O(1)（扩容时 O(n)） | O(1) |
| 中间插入删除 | O(n) 需要移动元素 | O(n) 找位置 + O(1) 修改指针 |
| 遍历速度 | 快（连续内存缓存友好） | 慢（节点对象多，内存不连续） |

**结论**：**99% 的场景用 ArrayList 就对了**，LinkedList 性能并没有想象中好，只有频繁插入删除在头尾才用它。

---

# Set 实现对比：HashSet LinkedHashSet TreeSet

## HashSet

### 底层：`HashMap`，value 是同一个 dummy 对象，key 存元素
- 基于哈希表，O(1) 查找、添加、删除
- 无序，不保证顺序，也不保证顺序不变
- 允许 null 元素
- 去重依赖 `equals()` 和 `hashCode()`，必须重写这两个方法

## LinkedHashSet

### 底层：`HashMap` + 双向链表
- 继承 HashSet，额外维护一个双向链表保存插入顺序
- 有序，按照插入顺序遍历
- 性能比 HashSet 略慢一点，因为需要维护链表
- 使用场景：需要去重并且保序

## TreeSet

### 底层：红黑树（实际是 `TreeMap`）
- 有序，按照元素的自然顺序或者自定义比较器排序
- 添加、删除、查找 O(log n)
- 支持范围查询：`subSet(from, to)` 获取某个范围的元素
- 元素必须实现 `Comparable` 接口，或者传入自定义 `Comparator`

## 选择总结

| 需求 | 选择 |
|------|------|
| 最快的去重，不需要顺序 | HashSet |
| 需要去重，并且保持插入顺序 | LinkedHashSet |
| 需要排序去重，范围查询 | TreeSet |

---

参考：[Java Collections Framework Documentation](https://docs.oracle.com/javase/tutorial/collections/index.html)
