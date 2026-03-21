# OpenCode - AI 编程代理使用指南与最佳实践

## 什么是 OpenCode

OpenCode 是一个**开源的 AI 编程代理**，它提供终端界面（TUI）、桌面应用和 IDE 扩展等多种使用方式，让 AI 真正帮你完成完整的开发任务。OpenCode 的核心创新在于独创的 **Plan（规划） + Build（构建）双模式工作流**，能大幅提升 AI 辅助开发的效率。

OpenCode 支持超过 75+ 种大语言模型，包括 GLM-4.7、DeepSeek-V3、Kimi K2 等国内主流模型，对中文开发者非常友好。

### 核心特点

- **Plan + Build 双模式**：先做架构设计规划，再进行代码构建，从根本上解决了 AI 一次性写代码质量差的问题
- **多端支持**：终端 TUI、桌面应用、VS Code 扩展，随时随地都能使用
- **模型自由**：支持 75+ 大语言模型，可自由切换你已有的 API Key
- **项目级上下文**：能够理解整个代码库的结构，不只是单个文件
- **完全开源**：代码开源，可自行定制

官方网站：https://opencode.ai

---

## 安装方式

### 方式一：命令行一键安装（推荐）

```bash
curl -fsSL https://opencode.ai/install | bash
```

### 方式二：包管理器安装

```bash
# npm
npm install -g opencode-ai

# bun
bun install -g opencode-ai

# pnpm
pnpm install -g opencode-ai

# yarn
yarn global add opencode-ai

# brew
brew install anomalyco/tap/opencode
```

### 方式三：桌面应用

从 [GitHub Releases](https://github.com/anomalyco/opencode/releases) 下载对应系统的桌面安装包即可。

### 方式四：其他平台

- **Arch Linux**
```bash
sudo pacman -S opencode          # Stable
paru -S opencode-bin             # Latest from AUR
```

- **Windows (Chocolatey)**
```bash
choco install opencode
```

- **Windows (Scoop)**
```bash
scoop install opencode
```

- **Docker**
```bash
docker run -it --rm ghcr.io/anomalyco/opencode
```

---

## 配置

通过 OpenCode，你可以配置 API 密钥来使用任意 LLM 提供商。

如果你刚开始接触 LLM 提供商，我们推荐使用 [OpenCode Zen](/docs/zen)。这是一组经过 OpenCode 团队测试和验证的精选模型。

1. 在 TUI 中运行 `/connect` 命令，选择 opencode
2. 前往 [opencode.ai/auth](https://opencode.ai/auth) 登录并添加账单信息
3. 复制你的 API 密钥，粘贴到 OpenCode 中

你也可以选择其他提供商，[了解更多](/docs/providers#directory)。

---

## 初始化

配置好提供商后，导航到你想要处理的项目目录：

```bash
cd /path/to/your/project
```

然后运行 OpenCode：

```bash
opencode
```

接下来，运行以下命令为项目初始化 OpenCode：

```
/init
```

OpenCode 会分析你的项目并在项目根目录创建一个 `AGENTS.md` 文件。这有助于 OpenCode 理解项目结构和编码规范。

---

## 官方使用指南

现在你已经准备好使用 OpenCode 来处理项目了，尽管提问吧！

如果你是第一次使用 AI 编码代理，以下示例可能会对你有所帮助。

### 讲解代码

你可以让 OpenCode 为你讲解代码库：

```
How is authentication handled in @packages/functions/src/api/index.ts
```

当你遇到不熟悉的代码时，这个功能非常有用。

### 添加新功能

你可以让 OpenCode 为项目添加新功能。不过我们建议先让它制定一个计划。

1. **制定计划**：使用 Tab 键切换到计划模式（右下角会显示模式指示器）。该模式下它不会进行任何修改，只会建议如何实现该功能。描述你的需求：

```
When a user deletes a note, we'd like to flag it as deleted in the database.
Then create a screen that shows all the recently deleted notes.
From this screen, the user can undelete a note or permanently delete it.
```

> 你需要提供足够的细节，让 OpenCode 理解你的需求。可以把它当作团队中的一名初级开发者来沟通。

2. **迭代计划**：当它给出计划后，你可以提供反馈或补充更多细节：

```
We'd like to design this new screen using a design I've used before.
[Image] Take a look at this image and use it as a reference.
```

OpenCode 支持图片，直接拖放到终端窗口即可。

3. **构建功能**：当你对计划满意后，再次按 Tab 键切换回构建模式。然后让它开始实施：

```
Sounds good! Go ahead and make the changes.
```

### 直接修改

对于比较简单的修改，你可以直接让 OpenCode 实施，无需先审查计划：

```
We need to add authentication to the /settings route. Take a look at how this is
handled in the /notes route in @packages/functions/src/notes.ts and implement
the same logic in @packages/functions/src/settings.ts
```

请确保提供足够的细节，以便 OpenCode 做出正确的修改。

### 撤销修改

假设你让 OpenCode 做了一些修改，但结果不是你想要的。你可以使用 `/undo` 命令来撤销修改：

```
/undo
```

OpenCode 会还原所做的修改，并重新显示你之前的消息。你可以调整提示词，让 OpenCode 重新尝试。

你也可以使用 `/redo` 命令来重做修改：

```
/redo
```

### 分享对话

你与 OpenCode 的对话可以[与团队分享](/docs/share)：

```
/share
```

这会生成当前对话的链接并复制到剪贴板。[点击查看示例对话](https://opencode.ai/s/4XP1fce5)。

---

## 核心概念：Plan vs Build 模式

OpenCode 最核心的设计就是双模式分离：

### Plan 模式（规划阶段）

- **作用**：分析需求，设计整体架构和实现方案
- **产出**：清晰的实施步骤，每个步骤做什么
- **不会直接改代码**：先想清楚再动手，避免走偏

### Build 模式（构建阶段）

- **作用**：按照 Plan 一步步实现代码
- **产出**：实际的代码变更
- **分步实施**：一次做一件事，保证质量

### 为什么双模式能提升效率？

传统 AI 编程是"上来就写"，容易理解错需求，写出不符合架构的代码，后期返工成本很高。双模式通过**先规划后实现**，把问题分解，从宏观到微观，大大减少了返工，效率可提升 40% 以上。

---

## 最佳工作流

### 开发新功能完整流程

```
1. 在项目根目录启动 OpenCode
2. 输入你的需求描述，进入 Plan 模式
3. AI 分析现有代码，输出实施计划
4. 你审核计划，调整不合理的地方
5. 确认计划后进入 Build 模式
6. AI 按照计划逐步实现每个步骤
7. 你 review 每一步的代码变更，确认后继续
8. 完成后，AI 帮你生成 commit message
```

### 修复 Bug 流程

```
1. 描述问题现象，提供错误日志
2. Plan 模式：AI 分析可能的原因
3. 确认根因后，Plan 输出修复方案
4. Build 模式：AI 实施修复
5. 你验证修复是否正确
```

### 重构现有代码流程

```
1. 选中要重构的代码/文件
2. 说明重构目标（性能优化/改进设计/拆分文件）
3. Plan 输出重构方案
4. 确认后 Build 逐步实施
```

---

## 高效使用技巧

### 文件引用

OpenCode 支持 `@文件名` 语法引用文件，AI 会读取文件内容作为上下文：

```
请帮我分析 @src/main/java/com/example/service/UserService.java 这个文件中的 getUser 方法，找出可能的 NPE 问题。
```

### Bash 命令集成

在 OpenCode 中可以直接执行 bash 命令，让 AI 自己看结果：

```
运行 `git diff` 告诉我这次修改了什么，帮我生成 commit message。
```

### 常用命令

使用 `/` 可以快速执行命令：

| 命令 | 作用 |
|------|------|
| `/plan` | 进入 Plan 模式 |
| `/build` | 进入 Build 模式 |
| `/model` | 切换大语言模型 |
| `/clear` | 清空对话历史 |
| `/exit` | 退出 |

### 快捷键

大多数命令支持 `ctrl+x` 前缀快捷键：

- `ctrl+x p` → `/plan`
- `ctrl+x b` → `/build`
- `ctrl+x c` → `/clear`

---

## 提示词编写最佳实践

### 好示例 vs 坏示例

✅ **好：**
```
我要在现有项目中添加一个图片压缩功能，要求：
1. 支持多种格式（JPG、PNG、WebP）
2. 可配置压缩质量
3. 保持原有API接口风格
请先看看现有的工具类在哪里，然后给出实现计划。
```

❌ **不好：**
```
帮我写个图片压缩功能。
```

### 常用提示词模板

**新功能开发：**
```
我需要开发一个功能：<简述需求>

项目现有结构：<可以@几个相关文件>

请先进入 Plan 模式，帮我设计实现方案。
```

**问题排查：**
```
我遇到了一个问题：<描述问题>

错误日志如下：
<粘贴错误日志>

请帮我分析可能的原因，并给出修复方案。
```

**代码评审：**
```
这是我刚刚修改的 git diff，请帮我 review，看看有没有什么问题：
$(git diff)
```

---

## 模型选择建议

OpenCode 支持 75+ 模型，根据经验推荐：

| 场景 | 推荐模型 | 理由 |
|------|----------|------|
| 日常开发 | Kimi K2 / GLM-4.7 | 中文理解好，上下文大 |
| 复杂算法 | DeepSeek-V3 | 逻辑推理能力强 |
| 快速原型 | 豆包 4.0 | 响应快，价格便宜 |

---

## 常见坑与规避

### 1. 一次性给太大任务

不要让 AI 一次做"写一个完整的用户管理模块"，这样太大了质量没法保证。

✅ **正确做法**：让 AI 先 Plan，拆解成多个小步骤，Build 一步一步来。

### 2. 不看代码直接接受

AI 也会犯错，尤其是对已有项目上下文理解可能有偏差。

✅ **正确做法**：每一步 AI 写完，你都要 review 代码，确认没问题再继续。

### 3. 上下文太大超出模型窗口

当项目很大，文件很多，模型上下文装不下。

✅ **正确做法**：只 @ 真正相关的文件，不要让 AI 读整个项目。

### 4. 需求描述模糊

"帮我优化一下这个代码" → AI 不知道你要优化什么。

✅ **正确做法**：明确说明优化目标，是性能？可读性？还是内存占用？

---

## 实用进阶技巧

### 1. 让 AI 遵循项目现有代码风格

```
请参考项目中 @src/main/java/com/example/service/BaseService.java 的写法，保持相同的代码风格和命名规范。
```

### 2. 结合单元测试

```
实现完成后，请帮我为这个功能生成单元测试，使用项目已有的 JUnit 5 + Mockito。
```

### 3. 增量开发

如果需求变更，只需要把新需求告诉 AI，AI 会基于已有代码继续开发，不需要重来。

### 4. 利用 git 做回滚

如果某一步改坏了，可以直接 `git restore .` 回到上一步，重新让 AI 来。

---

## 总结

OpenCode 的核心不是"编辑器"，而是**AI 编程代理**，它把大模型能力和你的编辑器结合起来，通过双模式工作流解决了 AI 编程的痛点。

### OpenCode 适合谁

- ✅ 专业开发者，日常需要写业务代码
- ✅ 喜欢在终端工作，追求效率
- ✅ 已经有 API Key，不想用第三方封闭产品
- ✅ 需要灵活切换不同模型

### 不适合

- ❌ 完全不会编程，想让 AI 帮你写整个项目（还是需要你掌控需求和架构）
- ❌ 只想要一个传统风格的 GUI 编辑器（那用 VS Code + 插件更适合）

---

## 延伸阅读

- [OpenCode 官方文档](https://opencode.ai/docs/zh-cn/)
- [OpenCode GitHub](https://github.com/anomalyco/opencode)
- [它的Plan与Build双模式如何将AI编程效率提升40%](https://qianfan.cloud.baidu.com/qianfandev/topic/687441)
```
