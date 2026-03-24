# JPA & Hibernate

## ORM 概念

ORM（Object-Relational Mapping，对象关系映射）：将 Java 对象映射到数据库表，将表行映射回 Java 对象，不用手写 SQL 和 JDBC 代码。

**优势**：
- 面向对象编程，不用写大量重复 JDBC 代码
- 减少开发工作量
- 数据库无关，切换数据库方便

JPA 是 ORM 的**规范**，Hibernate 是 JPA 的**实现**，Spring Data JPA 基于 Hibernate 做了更方便的封装。

## JPA 核心注解

| 注解 | 作用 |
|------|------|
| `@Entity` | 标记这是一个实体类，映射数据库表 |
| `@Table(name = "table_name")` | 指定映射的数据库表名 |
| `@Id` | 标记主键字段 |
| `@GeneratedValue(strategy = GenerationType.IDENTITY)` | 指定主键生成策略，IDENTITY 自增 |
| `@Column(name = "column_name")` | 映射数据库列，可以指定长度、是否可为空等 |
| `@Transient` | 标记这个字段不需要映射到数据库， transient 关键字也可以 |

### 关系映射注解

| 注解 | 关系 | 说明 |
|------|------|------|
| `@OneToOne` | 一对一 | 一方 `@OneToOne`，另一方 `@OneToOne(mappedBy = "...")` |
| `@ManyToOne` | 多对一 | 多的一方持有一的一方的引用，加 `@ManyToOne` |
| `@OneToMany` | 一对多 | 一的一方持有多的一方的集合，加 `@OneToMany(mappedBy = "...")` |
| `@ManyToMany` | 多对多 | 需要中间表，使用 `@JoinTable` 指定中间表 |

**mappedBy**：说明关系由对方维护，当前方是被维护端，不会创建外键列。

## Hibernate 缓存机制

### 一级缓存（Session 级别）

- 生命周期和 Session 相同，Session 关闭缓存清空
- 默认开启，不能关闭
- 同一个 Session 中多次查询同一个实体，只会查询一次数据库
- 脏检查机制在这里生效

### 二级缓存（SessionFactory 级别，全局共享）

- 需要手动开启，全局共享，所有 Session 共享
- 适合缓存不经常修改的、数据量不大的基础数据
- 需要第三方缓存实现，比如 EHCache、Redis

## Hibernate 脏检查机制

脏检查：Hibernate 会维护实体的快照，在事务提交时对比当前实体和快照，如果不一样，自动生成 UPDATE 语句更新数据库，不需要你手动调用 `update()`。

**工作流程：**
1. 你从 Session 查询出实体，Hibernate 同时保存一份快照
2. 你修改了实体的属性
3. 事务提交的时候，Hibernate 对比当前实体和快照
4. 如果有修改，自动执行 UPDATE 语句
5. 不需要你手动调用 update，很方便

**优点**：减少代码量，修改完对象自动更新，业务代码更干净

## N+1 查询问题

### 问题描述

- 查询出 1 个列表，共 N 条记录（1 次查询）
- 每条记录需要关联查询关联数据，每条都发一次查询，总共发 N+1 次 SQL
- 性能很差，尤其是 N 很大的时候

### 解决方法

1. **懒加载（FetchType.LAZY）**：用到才加载，不用就不查询，避免不必要查询
2. **急加载 + 连接获取（Fetch JOIN）**：一次 SQL 连接查询出来所有数据
   ```java
   // JPQL 使用 fetch join
   FROM User u LEFT JOIN FETCH u.orders WHERE ...
   ```
3. **批量抓取（batch fetching）**：设置 `batch-size`，批量抓取多个关联实体，减少查询次数
4. **@EntityGraph**：JPA 2.1 新增，可以指定哪些关联立即加载

## 优缺点对比 MyBatis

| 特性 | JPA/Hibernate | MyBatis |
|------|---------------|---------|
| SQL 编写 | 自动生成，简单 CRUD 不用写 | 需要手写，灵活控制 |
| 开发速度 | 快，简单 CRUD 不用写SQL | 慢一点，都要手写 |
| 性能优化 | 自动生成 SQL 不一定最优，需要熟悉优化 | 完全可控，容易优化 |
| 复杂 SQL | 不好写，推荐和原生 SQL 混用 | 非常适合，直接写 |
| 数据库无关 | 很好，切换数据库方便 | 需要手写 SQL，切换数据库有些差异 |

**选择建议：**
- 简单 CRUD 多，追求开发速度 → JPA
- 需要复杂查询，很多复杂报表统计 → MyBatis

---

参考：[Hibernate ORM Documentation](https://docs.jboss.org/hibernate/orm/current/quickstart/html_single/)
