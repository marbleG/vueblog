# IO BIO NIO

## IO 基本概念

### 阻塞 vs 非阻塞

- **阻塞 IO**：调用 IO 操作后，会一直等待直到操作完成，线程处于阻塞状态，什么都干不了
- **非阻塞 IO**：调用 IO 操作后，立刻返回，告诉你当前准备好没，没准备好你可以过一会再问，线程可以干别的事

### 同步 vs 异步

- **同步 IO**：用户线程主动去读/写，等待 IO 操作完成，或者轮询
- **异步 IO**：内核完成 IO 操作后通知用户线程，用户线程不用等待，直接做别的事

## BIO 模型（Blocking IO）

BIO 是传统的同步阻塞 IO 模型：

```
服务器启动 → 监听端口 → 来一个连接创建一个线程处理 → 处理完成关闭连接
```

**代码结构：**
```java
ServerSocket serverSocket = new ServerSocket(8080);
while (!closed) {
    Socket socket = serverSocket.accept(); // 阻塞等待连接
    new Thread(() -> {
        // 处理这个连接的读写
        handle(socket);
    }).start();
}
```

**缺点：**
- 一个连接一个线程，并发高的时候创建大量线程，资源消耗大
- 线程太多，上下文切换开销大
- 并发连接数上去之后性能很差

## NIO 模型（Non-blocking IO）

Java NIO 是同步非阻塞 IO 模型，基于 `Selector` 多路复用：

### 三大核心组件

#### 1. Buffer（缓冲区）

NIO 读写都是通过 Buffer，BIO 直接写到 Stream 里。Buffer 就是一块内存，支持读写切换：

```java
ByteBuffer buffer = ByteBuffer.allocate(1024);
// 写入数据到 buffer
channel.read(buffer);
// 翻转，从写模式切到读模式
buffer.flip();
// 读取数据
while (buffer.hasRemaining()) {
    byte b = buffer.get();
}
// 清空，准备下次写
buffer.clear();
```

核心属性：
- `capacity` - 缓冲区容量
- `position` - 当前位置，下一个要读写的位置
- `limit` - 界限，写模式就是容量，读模式就是有效数据的界限

#### 2. Channel（通道）

NIO 所有读写都通过 Channel，类似流，但不一样：
- Channel 可以异步读写
- Channel 可以读也可以写，流一般是单向的
- Channel 可以读到 Buffer，也可以从 Buffer 写到 Channel

常见 Channel：
- `ServerSocketChannel` - 服务器监听连接
- `SocketChannel` - 客户端连接读写
- `DatagramChannel` - UDP

#### 3. Selector（选择器）

多路复用选择器，一个 Selector 可以监听多个 Channel 的事件：

**工作流程：**
```java
Selector selector = Selector.open();
ServerSocketChannel serverChannel = ServerSocketChannel.open();
serverChannel.configureBlocking(false); // 必须非阻塞
serverChannel.register(selector, SelectionKey.OP_ACCEPT); // 注册接受连接事件

while (!closed) {
    // 阻塞等待，直到有事件就绪
    int readyChannels = selector.select();
    if (readyChannels == 0) continue;
    
    // 遍历就绪事件
    Set<SelectionKey> selectedKeys = selector.selectedKeys();
    Iterator<SelectionKey> iterator = selectedKeys.iterator();
    while (iterator.hasNext()) {
        SelectionKey key = iterator.next();
        if (key.isAcceptable()) {
            // 接受新连接
            ServerSocketChannel server = (ServerSocketChannel) key.channel();
            SocketChannel socket = server.accept();
            socket.configureBlocking(false);
            socket.register(selector, SelectionKey.OP_READ);
        } else if (key.isReadable()) {
            // 读数据
            SocketChannel socket = (SocketChannel) key.channel();
            // 读取处理...
        }
        iterator.remove();
    }
}
```

**优势：**
- 一个线程处理多个连接，不用一个连接一个线程
- 并发连接数可以很大，几万连接都没问题
- 上下文切换开销小
- 适合大量长连接并发场景

## 零拷贝（Zero Copy）

### 传统 IO 数据流动：

```
磁盘 → 内核缓冲区 → 用户进程缓冲区 → 网卡
```
一共 4 次数据拷贝，2 次上下文切换

### 零拷贝：

**mmap + write：**
```
磁盘 → 内核缓冲区 → 网卡
```
减少一次拷贝，适合文件大小不大，传输文件

**sendfile（Linux）：**
```
磁盘 → 内核缓冲区 → 网卡
```
甚至不需要把数据拷贝到用户空间，完全在内核完成，更少拷贝

**Java NIO 中的实现：**
- `FileChannel.transferTo(long position, long count, WritableByteChannel target)`
- 底层会用操作系统的 sendfile 零拷贝

**优势：**
- 减少拷贝次数，减少 CPU 开销
- 减少用户态和内核态上下文切换
- 大文件传输性能提升明显
- 常见应用：NGINX、Netty、消息中间件都在用

## IO 模型对比

| 模型 | 线程模型 | 特点 | 适用场景 |
|------|----------|------|----------|
| BIO | 一个连接一个线程 | 简单，并发低性能差 | 连接数少，固定连接数 |
| NIO | 一个线程处理多个连接 | 同步非阻塞，多路复用 | 高并发，大量长连接 |
| AIO | 异步 IO，内核完成后通知 | 真正异步，理论最好，实际实现不成熟 |  Linux 支持，实际很少用 |

---

参考：[Java Tutorials - NIO](https://docs.oracle.com/javase/tutorial/essential/io/index.html)
