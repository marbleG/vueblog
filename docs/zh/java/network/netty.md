# Netty

Netty 是一个异步事件驱动的网络应用框架，简化 TCP/UDP 网络编程，广泛用于 RPC 框架、消息中间件、HTTP 服务器等。

## Netty 核心组件

### Bootstrap / ServerBootstrap

启动引导类，用于配置和启动服务：
- `Bootstrap` - 客户端启动
- `ServerBootstrap` - 服务端启动

主要配置：
```java
// 配置 boss 线程组和 worker 线程组
// boss 接收连接，worker 处理读写
EventLoopGroup bossGroup = new NioEventLoopGroup(1);
EventLoopGroup workerGroup = new NioEventLoopGroup();
try {
    ServerBootstrap b = new ServerBootstrap();
    b.group(bossGroup, workerGroup)
      .channel(NioServerSocketChannel.class)  // 指定 NIO 通道
      .childHandler(new ChannelInitializer<SocketChannel>() {  // 添加处理器
          @Override
          public void initChannel(SocketChannel ch) {
              ChannelPipeline p = ch.pipeline();
              p.addLast(new MyHandler());
          }
      });
    ChannelFuture f = b.bind(port).sync();
    f.channel().closeFuture().sync();
} finally {
    bossGroup.shutdownGracefully();
    workerGroup.shutdownGracefully();
}
```

### Channel

Netty 对网络套接字的抽象，代表一个连接：
- `NioServerSocketChannel` - 服务端监听通道
- `NioSocketChannel` - 客户端数据通道
- 常用方法：`read()`, `write()`, `close()`, `remoteAddress()`

### EventLoop / EventLoopGroup

- `EventLoop` - 处理一个 Channel 生命周期内的所有 IO 事件，一个 EventLoop 线程可以处理多个 Channel
- `EventLoopGroup` - 管理多个 EventLoop

Reactor 模式中，EventLoop 就是不断轮询 IO 事件，然后分发给对应的 ChannelHandler 处理。

### ChannelHandler / ChannelPipeline

- `ChannelHandler` - 处理 IO 事件的处理器，你在这里处理业务逻辑：
  - `ChannelInboundHandler` - 处理入站数据（读）
  - `ChannelOutboundHandler` - 处理出站数据（写）
- `ChannelHandlerContext` - 上下文，可以获取 Channel、Pipeline 等

- `ChannelPipeline` - ChannelHandler 链表，入站事件从头部往后传，出站事件从尾部往前传，典型的责任链模式：

```
入站读：Head → ... → MyHandler → ... → Tail
出站写：Tail → ... → MyHandler → ... → Head
```

你可以添加多个 Handler，分工处理：编解码 → 业务处理 → 异常处理。

## Reactor 线程模型

Netty 支持三种 Reactor 线程模型：

### 单线程 Reactor

- 一个线程处理所有连接的所有 IO
- 适合测试环境，并发不高的场景
```java
new NioEventLoopGroup(1); // 一个 EventLoop
```

### 多线程 Reactor（常用）

- **boss 线程**：一个线程专门处理 accept 新连接
- **worker 线程**：多个线程处理已经连接的读写 IO
- 默认 worker 线程数是 CPU 核心数 * 2
- 这是 Netty 默认模式，大多数场景都用这个
```java
EventLoopGroup boss = new NioEventLoopGroup(1);
EventLoopGroup worker = new NioEventLoopGroup(); // 自动设为 CPU*2
```

### 主从多线程 Reactor

- 多个 boss 线程处理 accept，适合超大规模连接场景
- 一般互联网公司场景不需要，默认多线程 Reactor 就够了

## 粘包拆包问题

### 问题原因

TCP 是流协议，没有边界，你发送 `ABC` `DEF` 可能被接收成 `ABCDEF` 或者 `AB` `CDE` `F`，这就是粘包/拆包问题。

### Netty 解决方式

Netty 提供几种开箱即用的拆包器：

1. **FixedLengthFrameDecoder** - 固定长度，每个包长度固定
2. **LineBasedFrameDecoder** - 按行分割，以 `\n` 或 `\r\n` 结尾，适合文本协议
3. **DelimiterBasedFrameDecoder** - 指定分隔符，用自定义分隔符区分包
4. **LengthFieldBasedFrameDecoder** - 包头带长度字段，先读长度再读内容，最常用，自定义二进制协议都用这个

**LengthFieldBasedFrameDecoder 示例：**
```java
// 最大长度，长度字段偏移，长度字段长度，长度调整，跳过多少字节
new LengthFieldBasedFrameDecoder(
    1024 * 1024,  // 最大帧长度
    0,             // 长度字段偏移
    4,             // 长度字段占 4 字节
    0,             // 长度调整
    4              // 跳过长度字段的 4 字节，直接读内容
);
```

## 常用编解码器

### HTTP
- `HttpServerCodec` - HTTP 服务端编解码，处理 HTTP 请求响应
- `HttpObjectAggregator` - 把 HTTP 头和体聚合成完整的 `FullHttpRequest` / `FullHttpResponse`

### WebSocket
- `WebSocketServerProtocolHandler` - WebSocket 协议握手和帧处理

### 自定义协议
- 自己实现 `MessageToByteEncoder` 编码，`ByteToMessageDecoder` 解码

## 心跳机制实现

为什么需要心跳？
- 检测连接是否存活，长时间没有数据往来，TCP 连接可能被防火墙断开
- 及时清理死连接，释放资源

**Netty 实现方式：**
- 服务端：用 `IdleStateHandler` 检测空闲时间，超时触发 `userEventTriggered`，如果超时就关闭连接
- 客户端：收到空闲事件发送心跳包

```java
// 读空闲 30 秒，写空闲 0 秒不检测，全部空闲 0 秒
pipeline.addLast(new IdleStateHandler(30, 0, 0, TimeUnit.SECONDS));
pipeline.addLast(new HeartbeatHandler());

// HeartbeatHandler 处理空闲事件
@Override
public void userEventTriggered(ChannelHandlerContext ctx, Object evt) {
    if (evt instanceof IdleStateEvent) {
        IdleState state = ((IdleStateEvent) evt).state();
        if (state == IdleState.READER_IDLE) {
            // 读空闲 30 秒，说明没有心跳，关闭连接
            ctx.close();
        }
    }
    ctx.fireUserEventTriggered(evt);
}
```

## Netty 优点

1. **高性能**：异步非阻塞，零拷贝，多路复用
2. **功能丰富**：内置很多常用协议编解码，解决粘包拆包等问题
3. **社区活跃，稳定可靠**：很多大公司用，经过实战考验
4. **事件驱动 API**：开发相对简单，不容易出问题

---

参考：[Netty 官方文档](https://netty.io/wiki/index.html)
