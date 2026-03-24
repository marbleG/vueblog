# MyBatis

## MyBatis 简介

MyBatis 是一款优秀的持久层框架，支持自定义 SQL、存储过程和高级映射。

- 避免了几乎所有的 JDBC 手动代码和参数设置
- 支持 XML 和注解两种方式写 SQL
- 简单易用，国内非常流行
- 和 Spring Boot 整合方便

## 核心架构

```
SqlSessionFactoryBuilder → 构建 SqlSessionFactory → 创建 SqlSession → 执行 SQL
```

- `SqlSessionFactory`：工厂类，全局一个，线程安全
- `SqlSession`：会话，每次请求创建一个，用完关闭，线程不安全
- `Mapper`：接口 + XML/注解，定义 SQL 和映射

## Mapper 映射方式

### 接口 + XML 方式（推荐）

**Mapper 接口：**
```java
public interface UserMapper {
    List<User> selectAllUsers();
    User selectUserById(Integer id);
    int insertUser(User user);
}
```

**XML 文件（UserMapper.xml）：**
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.example.mapper.UserMapper">
    <select id="selectUserById" resultType="com.example.entity.User">
        SELECT id, username, password FROM user WHERE id = #{id}
    </select>
</mapper>
```

### 注解方式

简单 SQL 可以直接写在注解上：
```java
@Select("SELECT id, username FROM user WHERE id = #{id}")
User selectUserById(Integer id);

@Insert("INSERT INTO user(username, password) VALUES(#{username}, #{password})")
int insertUser(User user);
```

复杂 SQL 还是推荐 XML。

## 参数传递方式

| 传递方式 | 用法 |
|----------|------|
| **单个参数** | `#{参数名}` 直接用，MyBatis 不处理名称 |
| **多个参数** | 使用 `@Param` 指定名称：`void method(@Param("id") Integer id, @Param("name") String name)`，SQL 中 `#{id}, #{name}` |
| **Map 参数** | 多个参数封装到 Map 中，key 就是参数名 |
| **Java Bean** | 直接传对象，`#{属性名}` 直接获取属性值 |

## 结果映射

### `resultType` 自动映射

如果数据库列名和 Java Bean 属性名一致，可以直接自动映射：
```xml
<select id="selectUserById" resultType="com.example.entity.User">
    SELECT id, username FROM user WHERE id = #{id}
</select>
```

### `resultMap` 自定义映射

列名和属性名不一致，或者复杂关联映射，使用 `resultMap`：

```xml
<resultMap id="UserResultMap" type="com.example.entity.User">
    <id column="id" property="id"/>
    <result column="user_name" property="username"/>
    <result column="password" property="password"/>
</resultMap>

<select id="selectUserById" resultMap="UserResultMap">
    ...
</select>
```

**关联映射：**
- `association` - 一对一关联
- `collection` - 一对多关联

## 一级缓存与二级缓存

### 一级缓存（本地缓存）
- 作用域：`SqlSession` 级别
- 同一个 `SqlSession` 执行相同查询会缓存，不需要再查数据库
- 默认开启，无法关闭，只能清除
- SqlSession 关闭后一级缓存清空

### 二级缓存（全局缓存）
- 作用域：`MapperNamespace` 级别，多个 SqlSession 共享
- 需要手动开启：
  1. 配置文件开启：`<setting name="cacheEnabled" value="true"/>`
  2. Mapper XML 中添加：`<cache/>`
  3. 实体类需要实现 `Serializable` 接口
- 缓存会被多个 SqlSession 共享，适合读多写少场景

## 插件原理

MyBatis 支持插件机制，允许你拦截方法执行，做自定义增强：

**可以拦截的方法签名：**
- `Executor` - 拦截执行查询、更新、事务等
- `StatementHandler` - 拦截 SQL 语句构建
- `ParameterHandler` - 拦截参数设置
- `ResultSetHandler` - 拦截结果集处理

**分页插件 PageHelper** 就是基于 MyBatis 插件实现的，拦截 `Executor.query()` 方法，修改 SQL 拼接分页语句。

## PageHelper 分页原理

1. 你调用 `PageHelper.startPage(pageNum, pageSize)` 设置分页参数
2. 线程局部变量 `ThreadLocal` 保存分页参数
3. 插件拦截 `Executor.query()`，获取分页参数，修改原来的 SQL，拼接 `LIMIT` （MySQL）或者对应的分页语法
4. 执行分页 SQL，查询结果封装到 `PageInfo` 对象返回
5. 清除 `ThreadLocal` 中的分页参数

**优点**：使用简单，对代码侵入小，支持多种数据库

**常见坑**：
- `startPage` 后面紧跟的第一个 select 查询才会被分页
- 如果放在循环里，注意清理 ThreadLocal，避免污染下一次查询

---

参考：[MyBatis 官方文档](https://mybatis.org/mybatis-3/zh/index.html)
