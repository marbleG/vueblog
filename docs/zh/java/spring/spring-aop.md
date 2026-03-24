# Spring AOP 面向切面编程

## AOP 基本概念

- **切面（Aspect）**：横切关注点的模块化，比如日志切面、事务切面
- **连接点（Join Point）**：程序执行过程中的点，Spring AOP 中就是方法执行
- **切点（Pointcut）**：匹配连接点的断言，决定哪些方法需要被切面增强
- **通知（Advice）**：切面在特定连接点执行的动作，有不同类型
- **目标对象（Target）**：被一个或多个切面增强的对象
- **代理对象（Proxy）**：AOP 创建出来的增强后的对象

## 通知类型

| 通知类型 | 执行时机 | 用法 |
|----------|----------|------|
| **@Before** | 方法执行之前 | `@Before("pointcut()")` |
| **@AfterReturning** | 方法正常返回之后 | 可以拿到返回值 |
| **@AfterThrowing** | 方法抛出异常之后 | 可以拿到异常对象 |
| **@After** | 方法执行之后（不管正常返回还是异常） | 相当于 finally |
| **@Around** | 环绕通知，可以在方法前后都做处理，控制方法是否执行 | `ProceedingJoinPoint.proceed()` 执行目标方法 |

**环绕通知示例：**
```java
@Aspect
@Component
public class LogAspect {
    
    @Around("execution(* com.example.service.*.*(..))")
    public Object around(ProceedingJoinPoint pjp) throws Throwable {
        long start = System.currentTimeMillis();
        try {
            Object result = pjp.proceed(); // 执行目标方法
            long cost = System.currentTimeMillis() - start;
            System.out.println("Method " + pjp.getSignature() + " cost: " + cost + "ms");
            return result;
        } catch (Throwable e) {
            // 异常处理
            throw e;
        }
    }
}
```

## 切点表达式

切点表达式用于匹配哪些方法需要被增强：

**语法：**
```
execution(修饰符 返回类型 包名.类名.方法名(参数) throws 异常)
```

**常用示例：**
```java
// 匹配 com.example.service 包下所有类所有方法
execution(* com.example.service.*.*(..))

// 匹配所有 public 方法
execution(public * *(..))

// 匹配 Service 结尾的类所有方法
execution(* *..*Service.*(..))

// 匹配任何以 get 开头的方法
execution(* get*(..))

// 匹配 com.example 包以及子包下所有类所有方法
execution(* com.example..*.*(..))
```

**逻辑组合：**
- `&&` 并且，两个条件都满足
- `||` 或者，满足一个即可
- `!` 非，不满足

```java
@Pointcut("execution(* com.example.service.*.*(..)) && !execution(* com.example.service.*.get*(..))")
public void serviceMethods() {
}
```

## 代理实现：JDK 动态代理 vs CGLIB

### JDK 动态代理

- 基于接口，使用 `java.lang.reflect.Proxy`
- 目标对象必须实现接口，代理对象和目标对象实现相同接口
- JDK 原生支持，不需要额外依赖

### CGLIB

- 基于继承，动态生成目标类的子类，覆盖目标方法
- 不需要目标类实现接口，哪怕没有接口也能代理
- Spring 3.2+ 自带 CGLIB，不需要额外依赖

### Spring 默认策略

- 如果目标对象**实现了接口**，Spring 默认使用 JDK 动态代理
- 如果目标对象**没有实现接口**，Spring 使用 CGLIB
- 可以强制使用 CGLIB：`<aop:aspectj-autoproxy proxy-target-class="true"/>` 或者注解配置 `proxyTargetClass = true`

### 对比

| 特性 | JDK 动态代理 | CGLIB |
|------|-------------|-------|
| 依赖 | JDK 原生 | 需要 CGLIB（Spring 自带） |
| 接口要求 | 必须实现接口 | 不需要接口 |
| 代理方式 | 实现接口 | 继承目标类 |
| 能否代理 final 方法 | 可以（因为接口） | 不能，final 不能被覆盖 |
| 性能 | 创建代理稍快，调用稍慢 | 创建代理稍慢，调用更快 |

## 常见应用场景

1. **日志记录**：记录方法入参、出参、执行时间
2. **事务管理**：`@Transactional` 就是基于 AOP 实现，方法执行前开启事务，成功提交，异常回滚
3. **权限控制**：方法执行前检查当前用户是否有权限
4. **性能监控**：统计方法执行时间
5. **异常处理**：统一捕获异常，封装返回结果
6. **缓存**：方法执行前先查缓存，缓存命中直接返回，没有再执行方法并放入缓存

---

参考：[Spring Framework Documentation - AOP](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#aop)
