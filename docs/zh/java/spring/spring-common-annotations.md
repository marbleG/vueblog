# Spring 常用注解总结

## 组件扫描注解

| 注解 | 作用 | 适用场景 |
|------|------|----------|
| `@Component` | 通用组件注解，标记这个类需要被 Spring 扫描管理 | 通用组件，不属于分层的类 |
| `@Controller` | `@Component` 派生，标记 Web 控制器 | Spring MVC 控制器层 |
| `@RestController` | `@Controller` + `@ResponseBody`，默认返回 JSON | REST API 控制器 |
| `@Service` | `@Component` 派生，标记业务逻辑层 | Service 业务层 |
| `@Repository` | `@Component` 派生，标记数据访问层 | DAO 数据访问层，会捕获数据库异常转换为 Spring 数据访问异常 |

## 依赖注入注解

| 注解 | 作用 | 来源 |
|------|------|------|
| `@Autowired` | 按类型自动注入 | Spring 原生 |
| `@Qualifier` | 配合 `@Autowired`，按名称指定注入哪个 Bean | Spring 原生 |
| `@Resource` | 按名称注入，如果找不到名称再按类型 | JSR-250 标准 |
| `@Inject` | 类似 `@Autowired`，按类型注入 | JSR-330 标准（javax.inject） |

**对比：@Autowired vs @Resource**
- `@Autowired`：默认按类型，需要指定名称配合 `@Qualifier`
- `@Resource`：默认按名称，找不到再按类型，更推荐在字段注入使用

## 配置类注解

| 注解 | 作用 |
|------|------|
| `@Configuration` | 标记这是一个配置类，替代 XML 配置 |
| `@Bean` | 标注在方法上，方法返回值注册为 Bean 到容器 |
| `@Value` | 注入配置文件中的单个属性值，`@Value("${jdbc.url}")` |
| `@PropertySource` | 指定加载哪个 properties 配置文件 |
| `@ComponentScan` | 指定组件扫描的包路径 |
| `@Import` | 导入其他配置类 |
| `@Conditional` | 满足条件才生效这个配置/Bean |
| `@Profile` | 指定在哪个环境（dev/prod）生效 |

## 配置属性绑定注解（Spring Boot）

| 注解 | 作用 |
|------|------|
| `@ConfigurationProperties` | 批量绑定配置文件属性到 Java Bean，前缀 `prefix = "spring.datasource"` |
| `@EnableConfigurationProperties` | 开启 `@ConfigurationProperties` 注解处理，注册相应的 Bean |

## Web 相关注解

| 注解 | 作用 |
|------|------|
| `@RequestMapping` | 请求路径映射，可以用在类和方法上 |
| `@GetMapping` | GET 方法映射，相当于 `@RequestMapping(method = RequestMethod.GET)` |
| `@PostMapping` | POST 方法映射 |
| `@PutMapping` / `@DeleteMapping` | PUT/DELETE 方法映射 |
| `@RequestBody` | 请求体 JSON 绑定到方法参数 |
| `@ResponseBody` | 方法返回值直接写入响应体（不跳转视图） |
| `@RequestParam` | 绑定查询参数到方法参数 |
| `@PathVariable` | 绑定路径参数到方法参数，`/user/{id}` |
| `@RequestHeader` | 绑定请求头到方法参数 |
| `@CookieValue` | 绑定 Cookie 值到方法参数 |
| `@CrossOrigin` | 开启 CORS 跨域支持 |

## AOP 相关注解

| 注解 | 作用 |
|------|------|
| `@Aspect` | 标记这是一个切面类 |
| `@Pointcut` | 定义切点表达式 |
| `@Before` | 前置通知，方法执行之前 |
| `@AfterReturning` | 返回通知，方法正常返回之后 |
| `@AfterThrowing` | 异常通知，方法抛出异常之后 |
| `@After` | 最终通知，方法执行之后，相当于 finally |
| `@Around` | 环绕通知，可以包裹方法执行，控制方法是否执行 |

## 事务注解

| 注解 | 作用 |
|------|------|
| `@Transactional` | 声明式事务，标注在方法或类上，开启事务 |

`@Transactional` 常见配置：
- `propagation`：传播行为，默认 `REQUIRED`
- `isolation`：隔离级别，默认使用数据库默认
- `rollbackFor`：哪些异常回滚，默认只对 RuntimeException 回滚
- `timeout`：超时时间
- `readOnly`：是否只读事务

## Spring Boot 相关注解

| 注解 | 作用 |
|------|------|
| `@SpringBootApplication` | Spring Boot 启动类注解，组合了 `@SpringBootConfiguration` + `@EnableAutoConfiguration` + `@ComponentScan` |
| `@SpringBootConfiguration` | 就是 `@Configuration`，标记启动类配置 |
| `@EnableAutoConfiguration` | 开启 Spring Boot 自动配置 |
| `@ConditionalOnClass` | 类路径存在这个类才生效 |
| `@ConditionalOnMissingBean` | 容器中没有这个 Bean 才生效 |
| `@ConditionalOnProperty` | 配置文件存在指定属性且值匹配才生效 |

---

参考：[Spring Annotations Documentation](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-annotation-config)
