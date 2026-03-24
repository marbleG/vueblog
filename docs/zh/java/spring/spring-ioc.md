# Spring IOC 容器

## IoC 概念

**IoC（Inversion of Control，控制反转）**：把对象创建和依赖关系管理从代码中转移到 Spring 容器，由容器负责创建对象并注入依赖。

传统方式：
```java
// 自己创建对象，自己管理依赖
public class Service {
    private Dao dao = new Dao(); // 依赖硬编码
}
```

IoC 方式：
```xml
<!-- XML 配置 -->
<bean id="service" class="com.example.Service">
    <property name="dao" ref="dao"/>
</bean>
<bean id="dao" class="com.example.Dao"/>
```
由 Spring 容器创建对象并注入依赖，代码不需要自己 new。

**DI（Dependency Injection，依赖注入）**：是 IoC 的一种实现方式，容器通过构造器/setter 方法把依赖注入给对象。

## BeanFactory vs ApplicationContext

| 特性 | BeanFactory | ApplicationContext |
|------|-------------|-------------------|
| 初始化 | 延迟初始化，Bean 用到才创建 | 启动时一次性创建所有 singleton Bean |
| 功能 | 基础 IoC 容器，功能简单 | 继承 BeanFactory，增加企业级功能： |
| 额外功能 | 无 | 国际化、事件发布、资源加载、AOP 集成、Web 上下文支持 |
| 内存占用 | 小 | 大 |

**使用建议**：普通应用直接用 `ApplicationContext`，功能足够，大部分场景都是启动就创建好所有 Bean。

## Bean 生命周期

### 完整生命周期

1. **实例化**：调用构造器实例化 Bean
2. **属性注入**：设置 Bean 的属性和依赖注入
3. **Aware 接口回调**：如果实现了 `BeanNameAware` → 注入 Bean name；`BeanFactoryAware` → 注入 BeanFactory；`ApplicationContextAware` → 注入 ApplicationContext
4. **BeanPostProcessor - postProcessBeforeInitialization**：初始化前处理，可以自定义修改 Bean
5. **初始化方法**：
   - 如果实现了 `InitializingBean` → 调用 `afterPropertiesSet()`
   - 如果配置了 `init-method` → 调用指定的初始化方法
6. **BeanPostProcessor - postProcessAfterInitialization**：初始化后处理，AOP 就是在这里织入代理
7. **Bean 就绪**：可以使用了
8. **销毁**：容器关闭时
   - 如果实现了 `DisposableBean` → 调用 `destroy()`
   - 如果配置了 `destroy-method` → 调用指定销毁方法

## Bean 作用域

| 作用域 | 说明 | 适用场景 |
|--------|------|----------|
| singleton | 单例，容器中只有一个实例（默认） | 无状态的服务、DAO 等 |
| prototype | 原型，每次获取都会创建一个新实例 | 有状态的对象，每个请求需要独立实例 |
| request | 一次 HTTP 请求一个实例 | Web 应用，Spring MVC |
| session | 一个 HTTP Session 一个实例 | Web 应用，用户会话相关数据 |
| application | 一个 ServletContext 一个实例 | Web 应用，全局共享数据 |

## 依赖注入方式

1. **构造器注入**（推荐）
```java
@Service
public class Service {
    private final Dao dao;
    
    // Spring 4.3+ 如果只有一个构造器，可以不写 @Autowired
    public Service(Dao dao) {
        this.dao = dao;
    }
}
```
**优点**：
- 依赖不可为空，保证依赖安全
- 创建对象后就能使用，不需要后续设置
- final 字段可以保证不可变
- 方便单元测试

2. **Setter 注入**
```java
@Service
public class Service {
    private Dao dao;
    
    @Autowired
    public void setDao(Dao dao) {
        this.dao = dao;
    }
}
```
**适用**：可选依赖，允许后续改变注入。

3. **字段注入**
```java
@Service
public class Service {
    @Autowired
    private Dao dao;
}
```
**优点**：代码简洁，缺点：不能保证依赖非空，不利于单元测试。

## 循环依赖问题与解决

**循环依赖**：A 依赖 B，B 又依赖 A：
```
A → B → A
```

### Spring 解决循环依赖

Spring 通过**三级缓存**解决 singleton bean 的循环依赖：

1. **一级缓存** `singletonObjects`：存放完全初始化好的 singleton Bean
2. **二级缓存** `earlySingletonObjects`：存放提早暴露的原始对象（还没注入属性）
3. **三级缓存** `singletonFactories`：存放 Bean 工厂，用于创建提前暴露的代理对象

**工作流程**：
1. 创建 A，实例化，放入三级缓存，然后开始注入属性，发现依赖 B
2. 创建 B，实例化，放入三级缓存，然后开始注入属性，发现依赖 A
3. B 从三级缓存获取 A，A 放入二级缓存，B 完成初始化，放入一级缓存
4. A 获取到 B，完成初始化，放入一级缓存，清除二三级缓存

**限制**：
- 只解决**singleton** bean 的循环依赖
- 不解决 prototype 循环依赖
- 不解决构造器注入的循环依赖（因为实例化都做不了）

---

参考：[Spring Framework Documentation - IoC Container](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans)
