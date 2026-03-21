# 代理模式（Proxy）

## 模式定义

代理模式（Proxy Pattern）是一种结构型设计模式，它为其他对象提供一种代理以控制对这个对象的访问。

## 核心思想

通过引入代理对象来控制对真实对象的访问，代理对象可以在客户端和真实对象之间起到中介的作用。

## 结构组成

代理模式包含三个核心角色：

| 角色 | 职责 |
|------|------|
| **抽象主题（Subject）** | 定义真实主题和代理的公共接口 |
| **真实主题（Real Subject）** | 定义代理所代表的真实对象 |
| **代理（Proxy）** | 持有真实主题的引用，控制对真实主题的访问 |

## 代理类型

| 类型 | 说明 |
|------|------|
| **远程代理** | 为不同地址空间的对象提供代理 |
| **虚拟代理** | 延迟创建开销大的对象 |
| **保护代理** | 控制对原始对象的访问权限 |
| **智能引用** | 在访问对象时执行额外操作 |

## 代码示例

### 场景描述

假设我们需要实现一个图片加载器，图片加载较慢，使用虚拟代理来延迟加载。

### 实现代码

```java
// 抽象主题：图片接口
public interface Image {
    void display();
}

// 真实主题：真实图片
public class RealImage implements Image {
    private String filename;
    
    public RealImage(String filename) {
        this.filename = filename;
        loadFromDisk();
    }
    
    private void loadFromDisk() {
        System.out.println("加载图片: " + filename);
    }
    
    @Override
    public void display() {
        System.out.println("显示图片: " + filename);
    }
}

// 代理：图片代理
public class ImageProxy implements Image {
    private String filename;
    private RealImage realImage;
    
    public ImageProxy(String filename) {
        this.filename = filename;
    }
    
    @Override
    public void display() {
        if (realImage == null) {
            realImage = new RealImage(filename);
        }
        realImage.display();
    }
}

// 客户端使用
public class Client {
    public static void main(String[] args) {
        Image image = new ImageProxy("photo.jpg");
        
        System.out.println("图片代理已创建，但图片尚未加载");
        
        image.display();
        image.display();
    }
}
```

### 保护代理示例

```java
// 抽象主题
public interface UserService {
    void deleteUser(String username);
    void viewUser(String username);
}

// 真实主题
public class UserServiceImpl implements UserService {
    @Override
    public void deleteUser(String username) {
        System.out.println("删除用户: " + username);
    }
    
    @Override
    public void viewUser(String username) {
        System.out.println("查看用户: " + username);
    }
}

// 保护代理
public class UserServiceProxy implements UserService {
    private UserService userService;
    private String currentUser;
    private boolean isAdmin;
    
    public UserServiceProxy(String currentUser, boolean isAdmin) {
        this.userService = new UserServiceImpl();
        this.currentUser = currentUser;
        this.isAdmin = isAdmin;
    }
    
    @Override
    public void deleteUser(String username) {
        if (isAdmin) {
            userService.deleteUser(username);
        } else {
            System.out.println("权限不足，无法删除用户");
        }
    }
    
    @Override
    public void viewUser(String username) {
        userService.viewUser(username);
    }
}
```

### Python 实现

```python
from abc import ABC, abstractmethod

class Image(ABC):
    @abstractmethod
    def display(self):
        pass

class RealImage(Image):
    def __init__(self, filename: str):
        self.filename = filename
        self._load_from_disk()
    
    def _load_from_disk(self):
        print(f"加载图片: {self.filename}")
    
    def display(self):
        print(f"显示图片: {self.filename}")

class ImageProxy(Image):
    def __init__(self, filename: str):
        self.filename = filename
        self._real_image: RealImage = None
    
    def display(self):
        if self._real_image is None:
            self._real_image = RealImage(self.filename)
        self._real_image.display()

if __name__ == "__main__":
    image = ImageProxy("photo.jpg")
    print("图片代理已创建，但图片尚未加载")
    image.display()
    image.display()
```

## 应用场景

### 适用场景

1. **远程代理**：为远程对象提供本地代理
2. **虚拟代理**：延迟创建开销大的对象
3. **保护代理**：控制对对象的访问权限
4. **智能引用**：在访问对象时执行额外操作

### 实际应用案例

| 应用场景 | 说明 |
|---------|------|
| **Spring AOP** | 动态代理实现切面编程 |
| **RPC 框架** | 远程服务的本地代理 |
| **MyBatis** | Mapper 接口的代理实现 |
| **Java 动态代理** | JDK 动态代理机制 |

## 优缺点分析

### 优点

| 优点 | 说明 |
|------|------|
| **控制访问** | 可以控制对真实对象的访问 |
| **延迟加载** | 虚拟代理可以延迟创建对象 |
| **职责清晰** | 代理与真实对象职责分离 |
| **扩展性好** | 可以在不修改真实对象的情况下扩展功能 |

### 缺点

| 缺点 | 说明 |
|------|------|
| **复杂度增加** | 增加了代理类 |
| **响应延迟** | 代理可能增加响应时间 |

## 最佳实践

### 1. JDK 动态代理

```java
public class JdkProxyHandler implements InvocationHandler {
    private Object target;
    
    public JdkProxyHandler(Object target) {
        this.target = target;
    }
    
    @SuppressWarnings("unchecked")
    public <T> T getProxy() {
        return (T) Proxy.newProxyInstance(
            target.getClass().getClassLoader(),
            target.getClass().getInterfaces(),
            this
        );
    }
    
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println("前置处理");
        Object result = method.invoke(target, args);
        System.out.println("后置处理");
        return result;
    }
}
```

### 2. CGLIB 动态代理

```java
public class CglibProxyHandler implements MethodInterceptor {
    @SuppressWarnings("unchecked")
    public <T> T getProxy(Class<T> clazz) {
        Enhancer enhancer = new Enhancer();
        enhancer.setSuperclass(clazz);
        enhancer.setCallback(this);
        return (T) enhancer.create();
    }
    
    @Override
    public Object intercept(Object obj, Method method, Object[] args, MethodProxy proxy) throws Throwable {
        System.out.println("前置处理");
        Object result = proxy.invokeSuper(obj, args);
        System.out.println("后置处理");
        return result;
    }
}
```

## 与其他模式的关系

| 模式 | 关系 |
|------|------|
| **装饰器模式** | 装饰器增强功能，代理控制访问 |
| **适配器模式** | 适配器改变接口，代理保持接口不变 |
| **外观模式** | 外观简化接口，代理控制访问 |

## 总结

代理模式是 GoF 23 种设计模式之一，它为其他对象提供代理以控制访问。代理模式有多种类型，包括远程代理、虚拟代理、保护代理等，在实际开发中应用广泛，如 Spring AOP、RPC 框架等。
