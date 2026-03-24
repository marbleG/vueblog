# JDBC 基础

## JDBC 概念

JDBC（Java Database Connectivity）是 Java 访问数据库的标准 API，定义了一套统一的接口，不同数据库厂商提供自己的实现（驱动）。

**好处**：Java 程序面向 JDBC 接口编程，不需要关心不同数据库的具体差异，切换数据库只需要换驱动即可。

## JDBC 开发步骤

```java
// 1. 加载数据库驱动
Class.forName("com.mysql.cj.jdbc.Driver");

// 2. 获取数据库连接
String url = "jdbc:mysql://localhost:3306/test";
String user = "root";
String password = "password";
Connection conn = DriverManager.getConnection(url, user, password);

// 3. 创建 Statement 执行 SQL
Statement stmt = conn.createStatement();
ResultSet rs = stmt.executeQuery("SELECT id, name FROM user");

// 4. 处理结果集
while (rs.next()) {
    int id = rs.getInt("id");
    String name = rs.getString("name");
    System.out.println(id + ": " + name);
}

// 5. 关闭资源（反向关闭）
rs.close();
stmt.close();
conn.close();
```

## 核心接口

| 接口 | 作用 |
|------|------|
| `java.sql.Driver` | 驱动接口，数据库厂商实现，负责创建连接 |
| `java.sql.Connection` | 数据库连接，代表一个到数据库的连接 |
| `java.sql.Statement` | 语句对象，用于执行 SQL 语句 |
| `java.sql.PreparedStatement` | 预编译语句对象，继承 Statement |
| `java.sql.ResultSet` | 结果集，存放查询结果 |
| `java.sql.ResultSetMetaData` | 结果集元数据，获取列信息 |

## PreparedStatement vs Statement

### Statement
- 每次执行都要编译 SQL
- 存在 SQL 注入风险
- 重复执行相同 SQL 性能差

### PreparedStatement
- SQL 预编译，重复执行性能好
- 参数使用 ? 占位符，设置参数避免 SQL 注入
- 可读性好，不易出错

**结论**：优先使用 `PreparedStatement`，禁止使用 Statement 拼接用户输入。

## JDBC 事务处理

JDBC 默认自动提交事务，每条 SQL 自动提交，需要手动关闭自动提交来开启事务：

```java
try {
    conn.setAutoCommit(false); // 关闭自动提交，开启事务
    
    // 执行多个 SQL
    stmt.executeUpdate("UPDATE account SET balance = balance - 100 WHERE id = 1");
    stmt.executeUpdate("UPDATE account SET balance = balance + 100 WHERE id = 2");
    
    conn.commit(); // 提交事务
} catch (Exception e) {
    conn.rollback(); // 回滚事务
    throw e;
} finally {
    // 关闭资源
}
```

## 连接池原理

为什么需要连接池？
- 创建数据库连接是很昂贵的操作，需要网络握手、认证等
- 频繁创建销毁连接性能差
- 连接池预先创建一些连接放在池中，需要用直接拿，用完放回，重复利用

**核心参数**：
- 最小空闲连接数：保持多少空闲连接等待使用
- 最大连接数：最多允许多少连接，超过会排队
- 最大等待时间：获取连接超时多久抛出异常
- 连接超时：空闲多久回收连接

## 常见连接池

### HikariCP（Spring Boot 默认）

- 性能非常好，优化到位
- 默认使用，稳定可靠
- Spring Boot 官方推荐

### Druid（阿里出品，国内常用）

- 功能强大，自带监控、防 SQL 注入
- 监控页面可以查看连接池状态、SQL 统计
- 中文文档完善，国内很多公司使用

**对比**：
- HikariCP：性能略好，功能简单
- Druid：功能丰富，监控完善，性能也足够

---

参考：[Java Tutorials - JDBC](https://docs.oracle.com/javase/tutorial/jdbc/basics/index.html)
