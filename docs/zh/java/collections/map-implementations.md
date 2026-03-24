# Map 实现类：HashMap 原理

## HashMap 底层结构

JDK 8 之后：**数组 + 链表 + 红黑树**

- **数组**：称为哈希桶数组 `Node<K,V>[] table`，每个位置是一个链表/红黑树
- **链表**：当多个 key hash 到同一个位置，用链表存储
- **红黑树**：当链表长度超过阈值（TREEIFY_THRESHOLD = 8），并且数组长度 >= 64，链表转红黑树，提高查询性能

## hash 算法与索引计算

计算 hash 和数组索引：

```java
// 扰动函数，减少哈希冲突
static final int hash(Object key) {
    int h;
    return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}

// 计算数组索引，因为长度是 2 的幂，用 & 代替模运算，更快
int index = hash & (table.length - 1);
```

**为什么要扰动？** 让高位也参与哈希，减少低位相同导致的哈希冲突。

**为什么长度是 2 的幂？** 保证 `hash & (length - 1)` 得到合法索引，并且分布均匀，减少冲突。

## put 流程

1. 计算 key 的 hash
2. 计算数组索引
3. 如果数组为空，先扩容初始化数组
4. 如果位置为空，新建节点放入，结束
5. 如果位置不为空：
   - key 相同（hash 相同且 equals 相同），覆盖旧值
   - 如果是红黑树节点，放入红黑树
   - 如果是链表，遍历链表，找到就覆盖，没找到就追加到链表末尾
6. 追加到链表后，如果链表长度 > 8，并且数组长度 >= 64，转红黑树
7-插入完成后，检查 size 是否超过阈值（capacity * loadFactor），超过就扩容

## 扩容机制

- 默认初始容量 16（`DEFAULT_INITIAL_CAPACITY = 1 << 4`）
- 默认负载因子 0.75（`DEFAULT_LOAD_FACTOR = 0.75f`）
- 扩容的时候，容量翻倍，`newCap = oldCap << 1`
- 扩容后需要重新计算每个元素的索引，因为长度变了，`hash & (newCap - 1)` 索引要么不变，要么增加 `oldCap`
- 这个特性可以简化重新哈希，不需要每个都重新计算 hash

## 什么时候链表转红黑树？

两个条件都满足：
1. 链表长度 > 8（TREEIFY_THRESHOLD = 8）
2. 数组容量 >= 64（MIN_TREEIFY_CAPACITY = 64）

如果数组容量 < 64，只是扩容，不转树。

## HashMap vs Hashtable vs ConcurrentHashMap

| 特性 | HashMap | Hashtable | ConcurrentHashMap |
|------|---------|-----------|------------------|
| 线程安全 | ❌ 不安全 | ✅ 安全，所有方法加 synchronized | ✅ 安全，分段锁 / CAS + synchronized |
| 允许 null key | ✅ 允许一个 null | ❌ 不允许 | ❌ 不允许 |
| 性能 | 高，单线程 | 低，全表锁 | 中高，并发比 Hashtable 好很多 |
| 推荐使用 | 单线程环境 | 不推荐，过时 | 并发环境 |

## LinkedHashMap

继承 HashMap，额外维护一个双向链表保存插入顺序：

- 默认按插入顺序遍历
- 可以开启按访问顺序排序，可以实现 LRU 缓存
- 性能比 HashMap 略低一点，因为维护链表
- 使用场景：LRU 缓存，需要按照插入顺序遍历

```java
// 开启访问顺序，最久没访问的会被移到末尾
new LinkedHashMap<>(16, 0.75f, true);
```

## TreeMap

基于红黑树实现：

- key 有序，按照自然顺序或者自定义 Comparator 排序
- get/put/remove 都是 O(log n)
- 支持范围查询：`subMap(fromKey, toKey)`
- key 需要实现 Comparable 接口，或者传入 Comparator
- 使用场景：需要 key 有序的场景

## 总结选择

| 需求 | 选择 |
|------|------|
| 普通 key-value 查询，不需要排序 | HashMap |
| 需要 key 有序，支持范围查询 | TreeMap |
| 需要保存插入顺序 | LinkedHashMap |
| 并发多线程环境 | ConcurrentHashMap |

---

参考：[Java API - HashMap Doc](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/HashMap.html)
