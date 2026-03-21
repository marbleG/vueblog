# 组合模式（Composite）

## 模式定义

组合模式（Composite Pattern）是一种结构型设计模式，它将对象组合成树形结构来表示"部分-整体"的层次结构，使客户端可以统一处理单个对象和组合对象。

## 核心思想

通过统一的接口让客户端可以一致地处理单个对象和组合对象，忽略对象组合的复杂性。

## 结构组成

组合模式包含三个核心角色：

| 角色 | 职责 |
|------|------|
| **组件（Component）** | 为叶子节点和组合节点声明公共接口 |
| **叶子节点（Leaf）** | 表示叶子节点对象，没有子节点 |
| **组合节点（Composite）** | 表示组合节点对象，存储子节点 |

## 代码示例

### 场景描述

假设我们需要构建一个文件系统，包含文件和文件夹，文件夹可以包含文件和子文件夹，使用组合模式来实现。

### 实现代码

```java
// 组件：文件系统节点
public abstract class FileSystemNode {
    protected String name;
    
    public FileSystemNode(String name) {
        this.name = name;
    }
    
    public abstract void display(int depth);
    public abstract int getSize();
}

// 叶子节点：文件
public class File extends FileSystemNode {
    private int size;
    
    public File(String name, int size) {
        super(name);
        this.size = size;
    }
    
    @Override
    public void display(int depth) {
        StringBuilder indent = new StringBuilder();
        for (int i = 0; i < depth; i++) {
            indent.append("-");
        }
        System.out.println(indent + name + " (" + size + "KB)");
    }
    
    @Override
    public int getSize() {
        return size;
    }
}

// 组合节点：文件夹
public class Folder extends FileSystemNode {
    private List<FileSystemNode> children = new ArrayList<>();
    
    public Folder(String name) {
        super(name);
    }
    
    public void add(FileSystemNode node) {
        children.add(node);
    }
    
    public void remove(FileSystemNode node) {
        children.remove(node);
    }
    
    @Override
    public void display(int depth) {
        StringBuilder indent = new StringBuilder();
        for (int i = 0; i < depth; i++) {
            indent.append("-");
        }
        System.out.println(indent + name + "/");
        
        for (FileSystemNode child : children) {
            child.display(depth + 2);
        }
    }
    
    @Override
    public int getSize() {
        int totalSize = 0;
        for (FileSystemNode child : children) {
            totalSize += child.getSize();
        }
        return totalSize;
    }
}

// 客户端使用
public class Client {
    public static void main(String[] args) {
        Folder root = new Folder("根目录");
        
        Folder documents = new Folder("文档");
        documents.add(new File("报告.docx", 1024));
        documents.add(new File("简历.pdf", 512));
        
        Folder pictures = new Folder("图片");
        pictures.add(new File("照片.jpg", 2048));
        pictures.add(new File("截图.png", 512));
        
        root.add(documents);
        root.add(pictures);
        root.add(new File("配置.txt", 64));
        
        root.display(0);
        System.out.println("总大小: " + root.getSize() + "KB");
    }
}
```

### Python 实现

```python
from abc import ABC, abstractmethod
from typing import List

class FileSystemNode(ABC):
    def __init__(self, name: str):
        self.name = name
    
    @abstractmethod
    def display(self, depth: int):
        pass
    
    @abstractmethod
    def get_size(self) -> int:
        pass

class File(FileSystemNode):
    def __init__(self, name: str, size: int):
        super().__init__(name)
        self.size = size
    
    def display(self, depth: int):
        indent = "-" * depth
        print(f"{indent}{self.name} ({self.size}KB)")
    
    def get_size(self) -> int:
        return self.size

class Folder(FileSystemNode):
    def __init__(self, name: str):
        super().__init__(name)
        self.children: List[FileSystemNode] = []
    
    def add(self, node: FileSystemNode):
        self.children.append(node)
    
    def remove(self, node: FileSystemNode):
        self.children.remove(node)
    
    def display(self, depth: int):
        indent = "-" * depth
        print(f"{indent}{self.name}/")
        for child in self.children:
            child.display(depth + 2)
    
    def get_size(self) -> int:
        return sum(child.get_size() for child in self.children)

if __name__ == "__main__":
    root = Folder("根目录")
    
    documents = Folder("文档")
    documents.add(File("报告.docx", 1024))
    documents.add(File("简历.pdf", 512))
    
    pictures = Folder("图片")
    pictures.add(File("照片.jpg", 2048))
    pictures.add(File("截图.png", 512))
    
    root.add(documents)
    root.add(pictures)
    root.add(File("配置.txt", 64))
    
    root.display(0)
    print(f"总大小: {root.get_size()}KB")
```

## 透明性与安全性

| 方式 | 说明 | 优缺点 |
|------|------|--------|
| **透明式** | Component 包含所有方法 | 客户端使用一致，但 Leaf 需要实现无意义的方法 |
| **安全式** | Composite 特有方法不在 Component 中 | 客户端需要类型判断，但更安全 |

### 透明式实现

```java
public abstract class Component {
    public abstract void operation();
    public void add(Component component) {
        throw new UnsupportedOperationException();
    }
    public void remove(Component component) {
        throw new UnsupportedOperationException();
    }
    public Component getChild(int index) {
        throw new UnsupportedOperationException();
    }
}
```

## 应用场景

### 适用场景

1. **树形结构**：需要表示对象的部分-整体层次结构
2. **统一处理**：希望客户端统一处理简单和复杂元素
3. **递归结构**：结构具有递归特性

### 实际应用案例

| 应用场景 | 说明 |
|---------|------|
| **文件系统** | 文件和文件夹的层次结构 |
| **GUI 组件** | 容器和组件的层次结构 |
| **组织架构** | 公司、部门、员工的层次结构 |
| **菜单系统** | 菜单项和子菜单的层次结构 |

## 优缺点分析

### 优点

| 优点 | 说明 |
|------|------|
| **统一接口** | 客户端可以一致地处理单个和组合对象 |
| **简化客户端** | 客户端不需要知道是叶子还是组合 |
| **易于扩展** | 新增组件类型无需修改现有代码 |
| **树形结构** | 天然支持树形结构的处理 |

### 缺点

| 缺点 | 说明 |
|------|------|
| **设计复杂** | 需要设计好组件接口 |
| **类型限制** | 难以限制组合中的组件类型 |
| **过度设计** | 简单场景不需要使用 |

## 最佳实践

### 1. 结合访问者模式

```java
public interface Visitor {
    void visit(File file);
    void visit(Folder folder);
}

public class SizeVisitor implements Visitor {
    private int totalSize = 0;
    
    @Override
    public void visit(File file) {
        totalSize += file.getSize();
    }
    
    @Override
    public void visit(Folder folder) {
        for (FileSystemNode child : folder.getChildren()) {
            child.accept(this);
        }
    }
    
    public int getTotalSize() {
        return totalSize;
    }
}
```

### 2. 使用迭代器

```java
public class CompositeIterator implements Iterator<Component> {
    private Stack<Iterator<Component>> stack = new Stack<>();
    
    public CompositeIterator(Iterator<Component> iterator) {
        stack.push(iterator);
    }
    
    @Override
    public boolean hasNext() {
        if (stack.isEmpty()) {
            return false;
        }
        Iterator<Component> iterator = stack.peek();
        if (!iterator.hasNext()) {
            stack.pop();
            return hasNext();
        }
        return true;
    }
    
    @Override
    public Component next() {
        if (hasNext()) {
            Iterator<Component> iterator = stack.peek();
            Component component = iterator.next();
            if (component instanceof Composite) {
                stack.push(((Composite) component).iterator());
            }
            return component;
        }
        return null;
    }
}
```

## 与其他模式的关系

| 模式 | 关系 |
|------|------|
| **迭代器模式** | 可以遍历组合结构 |
| **访问者模式** | 可以对组合结构进行操作 |
| **责任链模式** | 常与组合模式一起使用 |

## 总结

组合模式是 GoF 23 种设计模式之一，它将对象组合成树形结构，使客户端可以统一处理单个对象和组合对象。适用于需要表示部分-整体层次结构的场景。
