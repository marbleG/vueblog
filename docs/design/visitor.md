# 访问者模式（Visitor）

## 模式定义

访问者模式（Visitor Pattern）是一种行为型设计模式，它表示一个作用于某对象结构中的各元素的操作。它使你可以在不改变各元素的类的前提下定义作用于这些元素的新操作。

## 核心思想

将数据结构与作用于结构上的操作分离，使得操作集合可以相对自由地演化而不影响这个数据结构。

## 结构组成

访问者模式包含以下核心角色：

| 角色 | 职责 |
|------|------|
| **访问者接口（Visitor）** | 为每个具体元素声明一个访问操作 |
| **具体访问者（ConcreteVisitor）** | 实现访问者接口，定义对每个元素的具体操作 |
| **元素接口（Element）** | 定义一个 accept 方法，接受访问者 |
| **具体元素（ConcreteElement）** | 实现 accept 方法，调用访问者的访问方法 |
| **对象结构（ObjectStructure）** | 存储元素集合，提供遍历元素的方法 |

## UML 类图

```
┌─────────────────┐       ┌─────────────────┐
│    Visitor      │       │     Element     │
├─────────────────┤       ├─────────────────┤
│ + visit(ElementA)│<─────│ + accept(Visitor)│
│ + visit(ElementB)│       └────────┬────────┘
└────────┬────────┘                │
         │                  ┌──────┴──────┐
         │                  │             │
  ┌──────┴──────┐    ┌──────┴───┐   ┌─────┴────┐
  │ConcreteVisit│    │ElementA  │   │ElementB  │
  ├─────────────┤    ├──────────┤   ├──────────┤
  │ + visit(A)  │    │+accept() │   │+accept() │
  │ + visit(B)  │    └──────────┘   └──────────┘
  └─────────────┘
```

## 实现代码

### 基础实现

```java
// 访问者接口
public interface Visitor {
    void visit(ConcreteElementA element);
    void visit(ConcreteElementB element);
}

// 元素接口
public interface Element {
    void accept(Visitor visitor);
}

// 具体元素A
public class ConcreteElementA implements Element {
    private String name;

    public ConcreteElementA(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    @Override
    public void accept(Visitor visitor) {
        visitor.visit(this);
    }
}

// 具体元素B
public class ConcreteElementB implements Element {
    private int value;

    public ConcreteElementB(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }

    @Override
    public void accept(Visitor visitor) {
        visitor.visit(this);
    }
}

// 具体访问者
public class ConcreteVisitor implements Visitor {
    @Override
    public void visit(ConcreteElementA element) {
        System.out.println("访问元素A: " + element.getName());
    }

    @Override
    public void visit(ConcreteElementB element) {
        System.out.println("访问元素B: " + element.getValue());
    }
}

// 对象结构
public class ObjectStructure {
    private List<Element> elements = new ArrayList<>();

    public void add(Element element) {
        elements.add(element);
    }

    public void accept(Visitor visitor) {
        for (Element element : elements) {
            element.accept(visitor);
        }
    }
}

// 客户端
public class Client {
    public static void main(String[] args) {
        ObjectStructure structure = new ObjectStructure();
        structure.add(new ConcreteElementA("元素A1"));
        structure.add(new ConcreteElementB(100));
        structure.add(new ConcreteElementA("元素A2"));

        Visitor visitor = new ConcreteVisitor();
        structure.accept(visitor);
    }
}
```

## 实际应用示例

### 场景：文件系统

实现一个文件系统，支持不同类型的文件（文本文件、图片文件、视频文件），可以对文件进行不同的操作（统计、压缩、导出）。

```java
// 访问者接口
public interface FileVisitor {
    void visit(TextFile file);
    void visit(ImageFile file);
    void visit(VideoFile file);
}

// 元素接口
public interface FileElement {
    String getName();
    long getSize();
    void accept(FileVisitor visitor);
}

// 具体元素：文本文件
public class TextFile implements FileElement {
    private String name;
    private long size;
    private int lineCount;

    public TextFile(String name, long size, int lineCount) {
        this.name = name;
        this.size = size;
        this.lineCount = lineCount;
    }

    @Override
    public String getName() { return name; }
    @Override
    public long getSize() { return size; }
    public int getLineCount() { return lineCount; }

    @Override
    public void accept(FileVisitor visitor) {
        visitor.visit(this);
    }
}

// 具体元素：图片文件
public class ImageFile implements FileElement {
    private String name;
    private long size;
    private String resolution;

    public ImageFile(String name, long size, String resolution) {
        this.name = name;
        this.size = size;
        this.resolution = resolution;
    }

    @Override
    public String getName() { return name; }
    @Override
    public long getSize() { return size; }
    public String getResolution() { return resolution; }

    @Override
    public void accept(FileVisitor visitor) {
        visitor.visit(this);
    }
}

// 具体元素：视频文件
public class VideoFile implements FileElement {
    private String name;
    private long size;
    private int duration;

    public VideoFile(String name, long size, int duration) {
        this.name = name;
        this.size = size;
        this.duration = duration;
    }

    @Override
    public String getName() { return name; }
    @Override
    public long getSize() { return size; }
    public int getDuration() { return duration; }

    @Override
    public void accept(FileVisitor visitor) {
        visitor.visit(this);
    }
}

// 具体访问者：统计访问者
public class StatisticsVisitor implements FileVisitor {
    private int textFileCount = 0;
    private int imageFileCount = 0;
    private int videoFileCount = 0;
    private long totalSize = 0;

    @Override
    public void visit(TextFile file) {
        textFileCount++;
        totalSize += file.getSize();
        System.out.println("[文本] " + file.getName() + " - " + file.getLineCount() + " 行");
    }

    @Override
    public void visit(ImageFile file) {
        imageFileCount++;
        totalSize += file.getSize();
        System.out.println("[图片] " + file.getName() + " - " + file.getResolution());
    }

    @Override
    public void visit(VideoFile file) {
        videoFileCount++;
        totalSize += file.getSize();
        System.out.println("[视频] " + file.getName() + " - " + file.getDuration() + " 秒");
    }

    public void showStatistics() {
        System.out.println("\n===== 统计结果 =====");
        System.out.println("文本文件: " + textFileCount + " 个");
        System.out.println("图片文件: " + imageFileCount + " 个");
        System.out.println("视频文件: " + videoFileCount + " 个");
        System.out.println("总大小: " + totalSize + " 字节");
    }
}

// 具体访问者：导出访问者
public class ExportVisitor implements FileVisitor {
    private StringBuilder report = new StringBuilder();

    public ExportVisitor() {
        report.append("文件导出报告\n");
        report.append("================\n");
    }

    @Override
    public void visit(TextFile file) {
        report.append(String.format("文本: %-20s %d 字节, %d 行\n", 
            file.getName(), file.getSize(), file.getLineCount()));
    }

    @Override
    public void visit(ImageFile file) {
        report.append(String.format("图片: %-20s %d 字节, %s\n", 
            file.getName(), file.getSize(), file.getResolution()));
    }

    @Override
    public void visit(VideoFile file) {
        report.append(String.format("视频: %-20s %d 字节, %d 秒\n", 
            file.getName(), file.getSize(), file.getDuration()));
    }

    public void showReport() {
        System.out.println(report.toString());
    }
}

// 对象结构：文件夹
public class Directory {
    private String name;
    private List<FileElement> files = new ArrayList<>();

    public Directory(String name) {
        this.name = name;
    }

    public void addFile(FileElement file) {
        files.add(file);
    }

    public void accept(FileVisitor visitor) {
        System.out.println("扫描文件夹: " + name);
        for (FileElement file : files) {
            file.accept(visitor);
        }
    }
}

// 客户端
public class Client {
    public static void main(String[] args) {
        Directory directory = new Directory("我的文档");
        directory.addFile(new TextFile("readme.txt", 1024, 50));
        directory.addFile(new TextFile("notes.txt", 2048, 100));
        directory.addFile(new ImageFile("photo.jpg", 512000, "1920x1080"));
        directory.addFile(new ImageFile("logo.png", 25600, "256x256"));
        directory.addFile(new VideoFile("demo.mp4", 10485760, 120));

        System.out.println("=== 统计访问者 ===");
        StatisticsVisitor statsVisitor = new StatisticsVisitor();
        directory.accept(statsVisitor);
        statsVisitor.showStatistics();

        System.out.println("\n=== 导出访问者 ===");
        ExportVisitor exportVisitor = new ExportVisitor();
        directory.accept(exportVisitor);
        exportVisitor.showReport();
    }
}
```

**输出结果：**

```
=== 统计访问者 ===
扫描文件夹: 我的文档
[文本] readme.txt - 50 行
[文本] notes.txt - 100 行
[图片] photo.jpg - 1920x1080
[图片] logo.png - 256x256
[视频] demo.mp4 - 120 秒

===== 统计结果 =====
文本文件: 2 个
图片文件: 2 个
视频文件: 1 个
总大小: 11028992 字节

=== 导出访问者 ===
扫描文件夹: 我的文档
文件导出报告
================
文本: readme.txt            1024 字节, 50 行
文本: notes.txt             2048 字节, 100 行
图片: photo.jpg             512000 字节, 1920x1080
图片: logo.png              25600 字节, 256x256
视频: demo.mp4              10485760 字节, 120 秒
```

## 双分派机制

访问者模式使用双分派（Double Dispatch）机制：

```java
// 第一次分派：客户端调用 element.accept(visitor)
element.accept(visitor);

// 第二次分派：元素调用 visitor.visit(this)
public void accept(Visitor visitor) {
    visitor.visit(this);  // this 的实际类型决定了调用哪个 visit 方法
}
```

## 应用场景

| 场景 | 说明 |
|------|------|
| **编译器** | 语法树遍历、代码生成、优化 |
| **文档处理** | 不同格式文档的导出、转换 |
| **文件系统** | 文件统计、搜索、压缩 |
| **报表生成** | 不同数据源的报表生成 |
| **静态分析** | 代码静态分析工具 |
| **XML 处理** | XML 文档的遍历和转换 |

## 优缺点分析

### 优点

1. **开闭原则**：新增操作只需新增访问者
2. **单一职责**：相关操作集中在一个访问者中
3. **灵活性**：可以在不修改元素类的情况下定义新操作
4. **分离关注点**：数据结构与操作分离

### 缺点

1. **增加新元素困难**：新增元素类型需要修改所有访问者
2. **破坏封装**：元素需要暴露内部状态给访问者
3. **依赖倒置**：元素依赖访问者接口

## 与其他模式的关系

| 模式 | 关系 |
|------|------|
| **组合模式** | 访问者常用于遍历组合结构 |
| **迭代器模式** | 迭代器遍历元素，访问者处理元素 |
| **解释器模式** | 解释器使用访问者生成输出 |
| **命令模式** | 命令封装操作，访问者分发操作 |

## 最佳实践

1. **元素稳定**：仅在元素类型稳定时使用
2. **暴露必要接口**：元素只暴露访问者需要的接口
3. **访问者层次**：复杂操作可拆分为多个访问者
4. **默认实现**：访问者接口可提供默认空实现

## 总结

访问者模式通过将操作封装到访问者对象中，实现了数据结构与操作的分离。它适用于数据结构稳定但操作频繁变化的场景，如编译器、文档处理、报表生成等。使用时要注意新增元素类型会破坏开闭原则的问题。
