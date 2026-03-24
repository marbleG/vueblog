# Spring Boot

## 核心特点

- **自动配置**：根据 classpath 依赖自动配置 Spring Bean，不需要大量 XML 配置
- **起步依赖**：将常用依赖整合好，直接引入 starter 不用关心版本和冲突
- **内嵌容器**：内置 Tomcat/Jetty/Undertow，直接运行 Jar 包不需要部署 WAR
- ** actuator**：提供生产就绪特性，健康检查、指标监控等
- **约定大于配置**：默认配置好大多数东西，只需要改少量配置

## 自动配置原理

### 入口注解 `@SpringBootApplication`

这个注解组合了三个核心注解：
```java
@SpringBootConfiguration  // 就是 @Configuration，标记配置类
@EnableAutoConfiguration   // 开启自动配置，核心在这里
@ComponentScan            // 组件扫描
```

### `@EnableAutoConfiguration` 原理

1. `AutoConfigurationImportSelector` 会读取 `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports`（Spring Boot 2.7+ 之前是 `spring.factories`）
2. 读取所有自动配置类，比如 `DataSourceAutoConfiguration`、`HttpEncodingAutoConfiguration` 等
3. 根据条件注解 `@ConditionalOnClass`、`@ConditionalOnMissingBean` 等判断是否需要配置这个 Bean
4. 符合条件的自动配置类生效，帮你注册 Bean 到容器

**示例**：
- 如果 classpath 有 `DataSource` 类，并且你没有自己定义 `DataSource` Bean，`DataSourceAutoConfiguration` 就会帮你自动配置一个数据源

## 启动流程

1. 创建 `SpringApplication` 对象，初始化配置，找到初始化器、监听器
2. 调用 `SpringApplication.run()` 方法
3. 开启 `StopWatch` 计时
4. 创建 `ApplicationContext` 容器（根据类型决定是 Servlet 还是 Reactive）
5. 加载配置，调用ApplicationContext 刷新
6. 扫描 bean，处理自动配置，创建所有 singleton bean
7. 启动完成后，发布 `ApplicationReadyEvent` 事件
8. 打印启动日志，输出耗时

## 常用注解

### Spring Boot 启动类
```java
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

### 配置相关
- `@Configuration` - 标记配置类
- `@ComponentScan` - 组件扫描
- `@ConditionalOnXxx` - 条件注解，满足条件才配置

### 依赖注入
- `@Component` - 通用组件标记
- `@Controller` / `@RestController` - Web 控制器
- `@Service` - 业务层组件
- `@Repository` - DAO 组件
- `@Autowired` - 依赖注入
- `@Qualifier` - 指定注入哪个 Bean

### Web 相关
- `@RequestMapping` - 请求映射
- `@GetMapping` / `@PostMapping` - 方法级映射
- `@RequestBody` - 接收请求体 JSON
- `@RequestParam` - 查询参数
- `@PathVariable` - 路径参数

### 配置属性绑定
- `@ConfigurationProperties` - 绑定外部配置文件属性到 Java Bean
- `@EnableConfigurationProperties` - 开启属性绑定
- `@Value("${key}")` - 单个属性注入

## Spring Boot 2 vs Spring Boot 3 主要变化

| 变化点 | Spring Boot 2 | Spring Boot 3 |
|--------|---------------|---------------|
| Java 版本 | Java 8+ | Java 17+ |
| Jakarta EE | javax.* 包 | jakarta.* 包（所有包名从 javax 改成 jakarta） |
| Spring 版本 | Spring Framework 5 | Spring Framework 6 |
| GraalVM 原生镜像 | 实验性 | 正式支持 |
| 路径匹配 | Spring MVC 默认 AntPathMatcher | Spring MVC 默认 PathPatternParser |

**Jakarta EE 包名变化**是最大变化：
- 旧：`import javax.servlet.http.HttpServletRequest;`
- 新：`import jakarta.servlet.http.HttpServletRequest;`

如果升级，所有 `javax.*` 需要改成 `jakarta.*`。

## 内嵌容器

Spring Boot 支持三个内嵌容器：

1. **Tomcat**（默认）：稳定，性能好，大多数场景使用
2. **Jetty**：轻量，适合异步非阻塞场景
3. **Undertow**：非阻塞 IO，性能高，内存占用小

**切换方式**：排除 Tomcat，引入其他容器：
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </exclusion>
    </exclusions>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jetty</artifactId>
</dependency>
```

## Actuator 监控

Actuator 提供生产环境监控能力，启用后会暴露很多端点：

**常用端点**：
- `/actuator/health` - 健康检查
- `/actuator/info` - 应用信息
- `/actuator/metrics` - 指标统计
- `/actuator/env` - 环境配置
- `/actuator/beans` - 所有 Bean 列表
- `/actuator/mappings` - 所有 URL 映射

**配置开启所有端点：**
```yaml
management:
  endpoints:
    web:
      exposure:
        include: "*"
```

---

参考：[Spring Boot Documentation](https://docs.spring.io/spring-boot/docs/current/reference/html/)
