# 解释器模式（Interpreter）

## 模式定义

解释器模式（Interpreter Pattern）是一种行为型设计模式，它给定一个语言，定义它的文法的一种表示，并定义一个解释器，这个解释器使用该表示来解释语言中的句子。

## 核心思想

将语言的语法规则表示为类层次结构，每个规则对应一个类，通过组合这些类来解释语言中的表达式。

## 结构组成

解释器模式包含以下核心角色：

| 角色 | 职责 |
|------|------|
| **抽象表达式（AbstractExpression）** | 声明抽象解释操作 |
| **终结符表达式（TerminalExpression）** | 实现与文法中终结符相关的解释操作 |
| **非终结符表达式（NonterminalExpression）** | 实现文法中非终结符的解释操作 |
| **上下文（Context）** | 包含解释器之外的全局信息 |
| **客户端（Client）** | 构建抽象语法树，调用解释操作 |

## UML 类图

```
┌─────────────────────┐
│ AbstractExpression  │
├─────────────────────┤
│ + interpret(Context)│
└──────────┬──────────┘
           │
    ┌──────┴──────┐
    │             │
┌───┴──────┐ ┌────┴──────────┐
│Terminal  │ │Nonterminal    │
│Expression│ │Expression     │
├──────────┤ ├───────────────┤
│+interpret│ │-expressions   │
│          │ │+interpret()   │
└──────────┘ └───────────────┘
```

## 实现代码

### 基础实现

```java
// 抽象表达式
public interface Expression {
    boolean interpret(Context context);
}

// 上下文
public class Context {
    private Map<String, Boolean> variables = new HashMap<>();

    public void assign(String name, boolean value) {
        variables.put(name, value);
    }

    public boolean lookup(String name) {
        return variables.getOrDefault(name, false);
    }
}

// 终结符表达式：变量
public class VariableExpression implements Expression {
    private String name;

    public VariableExpression(String name) {
        this.name = name;
    }

    @Override
    public boolean interpret(Context context) {
        return context.lookup(name);
    }
}

// 终结符表达式：常量
public class ConstantExpression implements Expression {
    private boolean value;

    public ConstantExpression(boolean value) {
        this.value = value;
    }

    @Override
    public boolean interpret(Context context) {
        return value;
    }
}

// 非终结符表达式：与操作
public class AndExpression implements Expression {
    private Expression left;
    private Expression right;

    public AndExpression(Expression left, Expression right) {
        this.left = left;
        this.right = right;
    }

    @Override
    public boolean interpret(Context context) {
        return left.interpret(context) && right.interpret(context);
    }
}

// 非终结符表达式：或操作
public class OrExpression implements Expression {
    private Expression left;
    private Expression right;

    public OrExpression(Expression left, Expression right) {
        this.left = left;
        this.right = right;
    }

    @Override
    public boolean interpret(Context context) {
        return left.interpret(context) || right.interpret(context);
    }
}

// 非终结符表达式：非操作
public class NotExpression implements Expression {
    private Expression expression;

    public NotExpression(Expression expression) {
        this.expression = expression;
    }

    @Override
    public boolean interpret(Context context) {
        return !expression.interpret(context);
    }
}

// 客户端
public class Client {
    public static void main(String[] args) {
        Context context = new Context();
        context.assign("A", true);
        context.assign("B", false);
        context.assign("C", true);

        Expression expression = new OrExpression(
            new AndExpression(
                new VariableExpression("A"),
                new VariableExpression("B")
            ),
            new VariableExpression("C")
        );

        System.out.println("(A AND B) OR C = " + expression.interpret(context));
    }
}
```

## 实际应用示例

### 场景：简单计算器

实现一个支持加减乘除的简单算术表达式解释器。

```java
// 抽象表达式
public interface Expression {
    int interpret();
}

// 数字表达式
public class NumberExpression implements Expression {
    private int number;

    public NumberExpression(int number) {
        this.number = number;
    }

    public NumberExpression(String number) {
        this.number = Integer.parseInt(number);
    }

    @Override
    public int interpret() {
        return number;
    }
}

// 加法表达式
public class AddExpression implements Expression {
    private Expression left;
    private Expression right;

    public AddExpression(Expression left, Expression right) {
        this.left = left;
        this.right = right;
    }

    @Override
    public int interpret() {
        return left.interpret() + right.interpret();
    }
}

// 减法表达式
public class SubtractExpression implements Expression {
    private Expression left;
    private Expression right;

    public SubtractExpression(Expression left, Expression right) {
        this.left = left;
        this.right = right;
    }

    @Override
    public int interpret() {
        return left.interpret() - right.interpret();
    }
}

// 乘法表达式
public class MultiplyExpression implements Expression {
    private Expression left;
    private Expression right;

    public MultiplyExpression(Expression left, Expression right) {
        this.left = left;
        this.right = right;
    }

    @Override
    public int interpret() {
        return left.interpret() * right.interpret();
    }
}

// 除法表达式
public class DivideExpression implements Expression {
    private Expression left;
    private Expression right;

    public DivideExpression(Expression left, Expression right) {
        this.left = left;
        this.right = right;
    }

    @Override
    public int interpret() {
        return left.interpret() / right.interpret();
    }
}

// 表达式解析器
public class ExpressionParser {
    private Stack<Expression> expressionStack = new Stack<>();
    private Stack<String> operatorStack = new Stack<>();

    public Expression parse(String expression) {
        String[] tokens = expression.split(" ");

        for (String token : tokens) {
            if (isOperator(token)) {
                while (!operatorStack.isEmpty() && 
                       precedence(operatorStack.peek()) >= precedence(token)) {
                    processOperator();
                }
                operatorStack.push(token);
            } else {
                expressionStack.push(new NumberExpression(token));
            }
        }

        while (!operatorStack.isEmpty()) {
            processOperator();
        }

        return expressionStack.pop();
    }

    private boolean isOperator(String token) {
        return "+".equals(token) || "-".equals(token) || 
               "*".equals(token) || "/".equals(token);
    }

    private int precedence(String operator) {
        switch (operator) {
            case "*":
            case "/":
                return 2;
            case "+":
            case "-":
                return 1;
            default:
                return 0;
        }
    }

    private void processOperator() {
        String operator = operatorStack.pop();
        Expression right = expressionStack.pop();
        Expression left = expressionStack.pop();

        switch (operator) {
            case "+":
                expressionStack.push(new AddExpression(left, right));
                break;
            case "-":
                expressionStack.push(new SubtractExpression(left, right));
                break;
            case "*":
                expressionStack.push(new MultiplyExpression(left, right));
                break;
            case "/":
                expressionStack.push(new DivideExpression(left, right));
                break;
        }
    }
}

// 客户端
public class Client {
    public static void main(String[] args) {
        ExpressionParser parser = new ExpressionParser();

        String[] expressions = {
            "3 + 5",
            "10 - 3",
            "4 * 5",
            "20 / 4",
            "3 + 5 * 2",
            "10 - 2 * 3"
        };

        for (String expr : expressions) {
            Expression expression = parser.parse(expr);
            System.out.println(expr + " = " + expression.interpret());
        }
    }
}
```

**输出结果：**

```
3 + 5 = 8
10 - 3 = 7
4 * 5 = 20
20 / 4 = 5
3 + 5 * 2 = 13
10 - 2 * 3 = 4
```

### 场景：SQL 简化解析器

```java
// 抽象表达式
public interface SqlExpression {
    String interpret();
}

// Select 表达式
public class SelectExpression implements SqlExpression {
    private List<String> columns;

    public SelectExpression(List<String> columns) {
        this.columns = columns;
    }

    @Override
    public String interpret() {
        return "SELECT " + String.join(", ", columns);
    }
}

// From 表达式
public class FromExpression implements SqlExpression {
    private String table;
    private SqlExpression selectExpr;

    public FromExpression(SqlExpression selectExpr, String table) {
        this.selectExpr = selectExpr;
        this.table = table;
    }

    @Override
    public String interpret() {
        return selectExpr.interpret() + " FROM " + table;
    }
}

// Where 表达式
public class WhereExpression implements SqlExpression {
    private SqlExpression fromExpr;
    private String condition;

    public WhereExpression(SqlExpression fromExpr, String condition) {
        this.fromExpr = fromExpr;
        this.condition = condition;
    }

    @Override
    public String interpret() {
        return fromExpr.interpret() + " WHERE " + condition;
    }
}

// OrderBy 表达式
public class OrderByExpression implements SqlExpression {
    private SqlExpression sqlExpr;
    private String column;
    private String order;

    public OrderByExpression(SqlExpression sqlExpr, String column, String order) {
        this.sqlExpr = sqlExpr;
        this.column = column;
        this.order = order;
    }

    @Override
    public String interpret() {
        return sqlExpr.interpret() + " ORDER BY " + column + " " + order;
    }
}

// SQL 构建器
public class SqlBuilder {
    public static SqlExpression select(List<String> columns) {
        return new SelectExpression(columns);
    }

    public static SqlExpression from(SqlExpression select, String table) {
        return new FromExpression(select, table);
    }

    public static SqlExpression where(SqlExpression from, String condition) {
        return new WhereExpression(from, condition);
    }

    public static SqlExpression orderBy(SqlExpression sql, String column, String order) {
        return new OrderByExpression(sql, column, order);
    }
}

// 客户端
public class Client {
    public static void main(String[] args) {
        SqlExpression sql = SqlBuilder.orderBy(
            SqlBuilder.where(
                SqlBuilder.from(
                    SqlBuilder.select(Arrays.asList("id", "name", "age")),
                    "users"
                ),
                "age > 18"
            ),
            "name",
            "ASC"
        );

        System.out.println(sql.interpret());
    }
}
```

**输出结果：**

```
SELECT id, name, age FROM users WHERE age > 18 ORDER BY name ASC
```

## 文法规则表示

解释器模式通常使用 BNF（巴科斯范式）定义文法：

```
expression ::= term { (+|-) term }
term       ::= factor { (*|/) factor }
factor     ::= number | '(' expression ')'
number     ::= digit { digit }
```

## 应用场景

| 场景 | 说明 |
|------|------|
| **编译器** | 编程语言的语法分析 |
| **正则表达式** | 字符串模式匹配 |
| **SQL 解析** | 数据库查询语句解析 |
| **配置文件** | 自定义配置语法解析 |
| **规则引擎** | 业务规则的表达和执行 |
| **计算器** | 数学表达式计算 |

## 优缺点分析

### 优点

1. **易于扩展**：新增文法规则只需新增表达式类
2. **实现简单**：每个表达式类实现单一规则
3. **灵活性**：可以自由组合表达式构建复杂语法
4. **符合开闭原则**：新增表达式无需修改现有代码

### 缺点

1. **类数量膨胀**：复杂文法会产生大量类
2. **维护困难**：文法复杂时难以维护
3. **效率问题**：递归解释效率较低
4. **适用范围有限**：仅适用于简单文法

## 与其他模式的关系

| 模式 | 关系 |
|------|------|
| **组合模式** | 解释器通常使用组合模式构建语法树 |
| **迭代器模式** | 可用于遍历语法树 |
| **访问者模式** | 可用于对语法树进行操作 |
| **工厂模式** | 可用于创建表达式对象 |

## 最佳实践

1. **文法简单**：仅在文法简单时使用
2. **效率考虑**：对效率要求高的场景考虑其他方案
3. **语法树缓存**：重复解释相同表达式时缓存语法树
4. **分阶段处理**：将词法分析和语法分析分离

## 总结

解释器模式通过将语法规则表示为类层次结构，实现了语言的解释执行。它适用于简单文法的场景，如正则表达式、SQL 解析、规则引擎等。对于复杂文法，建议使用专业的解析器生成工具（如 ANTLR）代替。使用时要注意类数量膨胀和效率问题。
