---
title: "The harness is all you need (mostly) · 你需要的只是框架（大体上）"
source: "https://github.blog/ai-and-ml/github-copilot/the-harness-is-all-you-need-mostly/"
author: "Burke Holland"
published: 2026-07-28
created: 2026-07-28
description: "A practical GitHub Copilot workflow for prototyping, planning, implementing, and reviewing software without chasing every new AI tool."
publish: true
tags:
  - "ai"
  - "copilot"
  - "已发布"
---

If you’re feeling overwhelmed by AI right now, you’re not alone.

如果你最近被 AI 的浪潮压得喘不过气，你并不孤单。

Every day it seems there is a new tool, new MCP, new model, new skill, new workflow, new feature, new social post that is some form of “Hey look! I have completely figured out AI with this one weird prompt.”

似乎每天都有新工具、新 MCP、新模型、新技能、新工作流、新功能，以及新的社交媒体帖子，内容千篇一律都是“快看！我用这一个奇怪的提示词就把 AI 彻底搞懂了”。

I…don’t believe you.

我……才不信呢。

I work with AI every single day, and what I’m finding is that less is way more. It’s not about what I install or configure or trick the agent into doing that makes any real difference. That stuff is interesting, but at the end of the day it feels like gimmicks.

我每天都在和 AI 打交道，而我的结论是：少即是多。真正带来质变的，从来不是你装了什么、配了什么，或者用花招“骗”智能体去干某种活。这些东西固然有趣，但说到底更像是噱头。

I see the biggest gains in my productivity from how I use the harness and how well I understand it.

我发现，生产力提升最大的一档，来自我对“运行框架（harness）”的使用方式与理解深度。

So in this post, I’m sharing you a simple workflow that you can use to drastically improve your effectiveness with AI just by using existing features of [GitHub Copilot](https://github.com/features/copilot). No weird prompts. No skill everyone else seems to know about. Just the harness. The harness is all you need—mostly.

所以在这篇文章里，我想分享一套简单的工作流：只靠 GitHub Copilot 现有的能力，就能大幅提升你使用 AI 的成效。没有奇怪的提示词，也不需要什么别人都在用的神秘技能。你要的只是这套框架。框架，基本就是你所需要的一切（大体上）。

## 1. Pick a tool, any tool（选个工具，随便哪个都行）

This is an obvious one, right? Pick a tool! It’s so easy!

这一点看似显而易见，对吧？挑个工具呗！多简单。

But even within the GitHub Copilot family, there are a lot of options. These include the [CLI](https://docs.github.com/copilot/github-copilot-in-the-cli), the new [GitHub Copilot app](https://docs.github.com/copilot/concepts/agents/github-copilot-app), [VS Code](https://code.visualstudio.com/), [Visual Studio](https://visualstudio.microsoft.com/), and [JetBrains](https://www.jetbrains.com/), just to name a few.

但光是在 GitHub Copilot 家族内部，可选项就不少。比如命令行（CLI）、全新的 [GitHub Copilot 应用](https://github.com/features/copilot/app)、[VS Code](https://code.visualstudio.com/)、[Visual Studio](https://visualstudio.microsoft.com/)，还有 [JetBrains](https://www.jetbrains.com/)，这只是其中一部分。

The good news is that these experiences are increasingly being centralized on the same harness. The details can differ by tool, but the core workflow is consistent. Learn the harness once, use it everywhere.

好消息是，这些入口正越来越多地收敛到同一套运行框架（harness）之上。不同工具之间细节或有差异，但核心工作流是一致的。框架学一遍，处处都能用。

That said, I do believe that learning the harness is key, and the best way to learn it is to be as close to it as possible. So if you are just starting out, I’d recommend beginning with the GitHub Copilot CLI. It’s a terminal interface, which means it’s just text. There isn’t much UI to learn. You enter a prompt. The agent does things. But the interaction is more direct, immediate, and, frankly, very satisfying.

话虽如此，我始终认为学好这套框架才是关键，而最好的学法就是尽可能贴近它。所以如果你是刚上手，我建议从 GitHub Copilot 命令行开始。它是终端交互，说白了就是纯文本，没什么 UI 要学——你输入提示词，智能体去执行。这种交互更直接、更即时，而且坦白说，非常解压。

For this demonstration, I’ll be using the new [GitHub Copilot app](https://github.com/features/copilot/app). But the harness that app uses is the exact same thing you’ll be using if you are using the GitHub Copilot CLI, Visual Studio Code and many other places you can find GitHub Copilot.

本文的演示我会用全新的 GitHub Copilot 应用。但它背后用的那套框架，和你用 GitHub Copilot 命令行、VS Code，以及无数其他能找到 Copilot 的地方，完全是同一套。

## 2. Turn on YOLO mode（开启 YOLO 模式）

YOLO mode is also known as “ [Allow All](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/allowing-tools).” This lets the agent execute any command without asking permission. This can vary depending on the tool you are using, but for most it is simply an `/allow-all` command in the chat. Otherwise, the agent is going to stop and wait for your approval every single time it needs to do some work.

YOLO 模式也叫 “Allow All（全部允许）”。开启后，智能体会不经询问就执行任何命令。不同工具的开法不一样，但大多数只需要在对话里输入 `/allow-all`。否则，智能体每要做一点事都会停下来等你批准。

Agents need autonomy for you to see an increase in productivity. If you have to approve everything the agent does, you might as well just do it yourself. Besides, that’s a miserable user experience. Nobody wants to be relegated to sitting at a desk pressing the “Approve” button all day. And pressing “Approve” over and over just trains you not to read what you are being asked to approve, which defeats the purpose.

想真正提升效率，智能体必须拥有自主权。如果你事事都要批准，那还不如自己动手。况且那种体验糟透了——没人愿意整天坐在工位上狂点“批准”按钮。而一遍遍点“批准”，只会让你养成不读内容的习惯，反倒背离了初衷。

You want to be safe with agents, though. [Bad things happen to good people](https://x.com/mattshumer_/status/2075666403596612010). When using YOLO mode, you don’t want to run the agent on your local machine. This is especially true when you are using them at work—data is private on your organization’s systems, and mistakes can be costly.

不过，你还是要对智能体保持警惕。[好人也会翻车](https://x.com/mattshumer_/status/2075666403596612010)。开启 YOLO 模式时，千万别在本地机器上跑智能体，工作场景尤其如此——你们组织系统里的数据是私密的，一旦失误，代价可能很高。

Fortunately there are a bunch of options for running agents in sandboxes. An easy one to get started with is [GitHub Codespaces](https://docs.github.com/codespaces/overview) or [development containers](https://containers.dev/).

好在在沙箱里跑智能体有很多选择。最容易上手的是 [GitHub Codespaces](https://docs.github.com/codespaces/overview) 或 [开发容器（development containers）](https://containers.dev/)。

## 3. Start with a prototype（先做个原型）

One of the most magical things about AI is that you can easily prototype anything and everything up front. Historically, this was not the case. Prototyping was a full phase of a project, and were often a luxury. Now, you can make one with a prompt.

AI 最神奇的一点，就是你能轻而易举地把任何东西先“打样”出来。历史上可并非如此——过去原型设计是项目的一个完整阶段，往往还是种奢侈。现在，一句提示词就能出一个原型。

Let’s look at a few examples.

我们来看几个例子。

Let’s say we want to build a date picker web component. That seems straighforward, but it’s actually quite complex. Think of all the different things you might want to do with it.

假设我们要做一个日期选择器 Web 组件。看起来简单，实则相当复杂。想想看，你可能会想用它做多少种不同的事。

- How do you navigate within the component?（组件内部如何导航？）
- What does the selected date look like?（选中的日期长什么样？）
- What does a selected range look like?（选中的区间长什么样？）
- How does the user navigate between days, months, and years?（用户如何在日、月、年之间切换？）

Start with a simple prototype and get several variations. I usually start with something like this:

先做个简单原型，多拿几个变体。我通常会这样起手：

```
Give me 20 mocks for a date picker web component. Put them all in an HTML file so I can compare.
```

![Twenty date picker prototypes generated in a single HTML file.](https://github.blog/wp-content/uploads/2026/07/prototype.png?w=2033)

Twenty date picker prototypes generated in a single HTML file.（二十个日期选择器原型，生成在同一个 HTML 文件里。）

In this case, the AI generated a bunch of different layouts, but one of them is a mock where it starts with the year view. That’s interesting. I would like my date picker to enable the user to zoom out to the year, then into the month, and finally to the day. These are the kinds of things you don’t consider until you see them.

这次 AI 生成了一堆不同的布局，其中一个是从“年视图”开始的草图，很有意思。我希望我的日期选择器能让用户先缩放到年，再进入月，最后是日。这类想法，往往要亲眼看到才会浮现。

As humans, we process sensory-rich models like images, shapes, and tangible layouts much faster than dense text. Creating low-effort prototypes early on helps make complex concepts immediately intuitive.

人脑处理图像、形状、可触布局这类“感官丰富”的模型，远比处理密密麻麻的文字快得多。尽早做低成本原型，能让复杂概念瞬间变得直观。

And this applies to non-visual tasks as well.

而且这套方法同样适用于非视觉任务。

For instance, if I want to add a new API endpoint, I’ll still create a visual prototype to understand the requirements and constraints before diving into the implementation.

比如，我想新增一个 API 端点，在动手实现前，我依然会先做一个可视化原型，来厘清需求和约束。

```
Create a visual mockup of the API for this project. Add five options for how we could handle a new API endpoint that allows the user to download their analytics data.
```

![A Mermaid diagram comparing approaches for an analytics export API endpoint.](https://github.blog/wp-content/uploads/2026/07/mermaid-1-1.png?w=2033)

A Mermaid diagram comparing approaches for an analytics export API endpoint.（对比“分析数据导出 API 端点”多种实现方案的 Mermaid 图。）

Since the GitHub Copilot app supports [Mermaid diagrams](https://docs.github.com/copilot/tutorials/copilot-cookbook/communicate-effectively/creating-diagrams), the agent renders this as Markdown, mapping out five different ways we could implement this API endpoint.

由于 GitHub Copilot 应用支持 [Mermaid 图](https://docs.github.com/copilot/tutorials/copilot-cookbook/communicate-effectively/creating-diagrams)，智能体会把它渲染成 Markdown，把实现这个 API 端点的五种不同方案一一铺开。

When working with agents, it’s easy to forget that everything is nuanced. Prototyping helps uncover the nuances up front, so you avoid spending valuable time and tokens on rework.

和智能体协作时，人很容易忘记：凡事皆有细微差别。原型能帮你提前暴露这些差别，从而避免把宝贵的时间和 token 浪费在返工上。

I recommend using a medium-sized model, such as GPT 5.6 Terra or Claude Sonnet, on medium reasoning for most work. I also recommend you stick with whatever model you choose here for the duration of this particular feature, bug, or enhancement. Prompt caching will save you tokens. As long as you don’t switch to a different model or reasoning level, your previous chats remain cached with the model, giving you a discount on future requests.

大多数工作，我建议用中等规模的模型（比如 GPT 5.6 Terra 或 Claude Sonnet），配中等推理强度。我还建议：针对某一个具体的功能、Bug 或增强，就固定用你选好的那一个模型。提示缓存（prompt caching）能帮你省 token——只要你不切换模型或推理档位，之前的对话就会一直留在模型缓存里，后续请求还能享受折扣。

## 4. Plan methodically（有条不紊地规划）

Now that you know what you actually want versus what you initially thought you wanted, it’s time to plan out the implementation.

既然你已想清楚自己真正想要什么（而不是一开始以为想要的），就到了规划实现的时刻。

Switch to plan mode in GitHub Copilot without starting a new session.

在 GitHub Copilot 里切换到规划模式（plan mode），无需开启新会话。

“/plan Build a date picker web component. I want the user to be able to zoom in and out of years, months, and days.”

“/plan 做一个日期选择器 Web 组件。我希望用户能在年、月、日之间自由缩放。”

That’s a pretty vague prompt, and you’ll likely have more context for the model than I do here, but this is just a demonstration. If you don’t have more context, it’s OK. That’s exactly what this step is for.

这个提示词相当模糊，而且你掌握的背景信息大概率比我这里多——不过这只是一个演示。就算你没有什么额外背景也没关系，这一步本就是为此而设。

In theory, you can get a model to one-shot anything if you compose the perfect prompt with the perfect context in the perfect order. In theory.

理论上，只要你把完美的提示词、完美的上下文、以完美的顺序组合起来，就能让模型一次性搞定任何事。理论上。

But none of us can do that. Planning helps you get closer to that ideal, though, by asking all of the questions that you would need to answer yourself along the way if you were to build this out by hand:

但我们谁也做不到。规划的意义，是替你把“如果亲手做，沿途必须自己回答”的那些问题逐个问出来，从而更接近那个理想：

- Can the start and end date be the same?（起止日期可以相同吗？）
- Are partial selections valid?（部分选择合法吗？）
- Should users be able to clear the date?（用户能否清除所选日期？）
- Should “today” always be a visible option?（“今天”是否应始终可选？）
- Is manual entry allowed?（是否允许手动输入？）
- What format is the date stored in?（日期以什么格式存储？）
- Should pasting in dates be allowed?（是否允许粘贴日期？）

The list goes on and on. You cannot possibly think of all of these edge cases, but the model can help you identify many of them.

这样的清单还可以一直列下去。你不可能穷尽所有边界情况，但模型能帮你揪出其中不少。

You can make plan mode even more aggressive in the sheer number of questions and edge cases it asks about by installing the [“grill-me”](https://www.skills.sh/mattpocock/skills/grill-me) skill from Matt Pocock.

你还可以装上 Matt Pocock 的 [“grill-me”](https://www.skills.sh/mattpocock/skills/grill-me) 技能，让规划模式抛出更多的问题和边界情况，逼问得更狠：

```
/plan /grill-me Build a date picker web component. I want the user to be able to zoom in and out of years, months, and days.
```

This planning step is critical. The point is not for you to just accept every suggestion from the AI. If you do that, you are negating the value of this planning process. The point is for you to deeply engage with the problem and guide the model. This is where your expertise comes into play.

这一步规划至关重要。重点绝不是让你照单全收 AI 的每条建议——那样就抹杀了规划的价值。重点是你深度参与问题、引导模型。你的专业判断，正是在这里发挥作用。

You can also ask the model questions back. In the screenshot below, it asks me about “non-contiguous dates.” I’m pretty sure I know what the model means here, but I’m going to ask for clarification so we’re on the same page.

你也可以反向向模型提问。在下方的截图里，它问我 “non-contiguous dates（不连续的日期）” 是什么意思。我基本明白它的意思，但还是要追问一句，确保我们对齐。

![GitHub Copilot plan mode asking clarifying questions about a date picker.](https://github.blog/wp-content/uploads/2026/07/planmode.png?w=1387)

GitHub Copilot plan mode asking clarifying questions about a date picker.（GitHub Copilot 规划模式就日期选择器提出澄清问题。）

The planning process will keep going even if you interrupt to ask clarifying questions, etc.

即便你中途打断、追问澄清，规划过程也会继续进行。

## 5. Implement with Autopilot（用 Autopilot 落地实现）

Once the plan is finished, GitHub Copilot will likely prompt you to switch to [Autopilot](https://docs.github.com/copilot/concepts/agents/copilot-cli/autopilot) and start implementing the plan.

规划完成后，GitHub Copilot 通常会提示你切换到 [Autopilot（自动驾驶模式）](https://docs.github.com/copilot/concepts/agents/copilot-cli/autopilot)，开始落地计划。

![GitHub Copilot Autopilot implementing a plan.](https://github.blog/wp-content/uploads/2026/07/autopilot.png?w=1251)

GitHub Copilot Autopilot implementing a plan.（GitHub Copilot 的 Autopilot 正在实现一份计划。）

Autopilot is a built-in loop. It forces the model to continue working by ensuring that it has actually done what it said it would do—which in this case is completing every item in the plan.

Autopilot 是一个内置循环。它强制模型持续干活，确保它真的完成了自己说过要做的事——在这里，就是逐项落实计划里的每一条。

GitHub Copilot will automatically act as an orchestrator during this phase. If it needs to read files in the codebase, it will use the “Explore” subagent with a small model. If it deems an action relatively complex, it will likely choose the “General Purpose” subagent with a larger model. While you can get fine-grained control over orchestration in GitHub Copilot with [custom agents](https://docs.github.com/copilot/how-tos/copilot-cli/customize-copilot/create-custom-agents-for-cli) and [instructions](https://docs.github.com/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions), you don’t need to do anything special to get the advantages of subagents and multimodel workflows. This works out of the box, even if you did not know that any of these things existed.

在这个阶段，GitHub Copilot 会自动充当编排器（orchestrator）。需要读取代码库文件时，它会用搭载小模型的 “Explore” 子智能体；若判断某个动作比较复杂，多半会调用搭载大模型的 “General Purpose” 子智能体。虽然你可以通过[自定义智能体](https://docs.github.com/copilot/how-tos/copilot-cli/customize-copilot/create-custom-agents-for-cli)和[指令](https://docs.github.com/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions)对编排做精细控制，但要享受子智能体、多模型协作的好处，你其实什么都不用做——开箱即用，哪怕你根本不知道这些机制的存在。

## 6. Human review and iteration（人工审查与迭代）

This is where you get your dopamine hit. You get to see what the AI has created.

这一步你会收获多巴胺。你可以亲眼看到 AI 创造出了什么。

But it’s likely that you won’t get exactly what you wanted. That’s normal and expected. The model cannot read your mind, and it is error-prone. Iterate with the model until you get what you actually want. Whether that’s just code or an improved UI, this is the part where your taste will decide the quality of the final product.

但你大概率拿不到心中所想的那版。这很正常，也在意料之中。模型读不了你的心，而且容易出错。和模型反复迭代，直到你真正满意为止。无论最终是代码还是打磨过的 UI，这一步的质量，由你的品味决定。

For instance, here’s the date picker that GitHub Copilot gave me.

比如，这是 GitHub Copilot 给我的日期选择器。

![Initial date picker result. It shows 12 boxes with years to select from 2018-2029.](https://github.blog/wp-content/uploads/2026/07/datepicker-initial.png?w=1047)

Initial date picker result. It shows 12 boxes with years to select from 2018-2029.（最初的日期选择器效果：以 12 个方框展示 2018–2029 的可选年份。）

Already I can see it has some issues:

我一眼就看出它有些问题：

- Animations are inconsistent（动画不一致）
- Text is unreadable when hovering over a selected date because of color contrast（悬停在选中日期上时，因颜色对比度问题文字看不清）
- It doesn’t need to say “12 YEARS” at the top.（顶部没必要写 “12 YEARS”）
- When I click “Today”, it doesn’t take me to the day if I’m in the month or year view.（在月视图或年视图下点 “Today”，不会跳到当日）

Also, I don’t *love* the design. It looks a little too much like it was created by AI—because it was!

而且，我并不喜欢这个设计。它看起来太“AI 味”了——因为它本就是 AI 做的！

So here we’re just in follow-up mode. I’m going to use a CSS framework I created called [Postrboard](https://burkeholland.github.io/postrboard-design). I add it as a skill that just points to the CSS and tells the agent how to use it. You can feel free to install it yourself if you’d like to use it, or you can pick any other CSS framework out there that you like. Giving the model some design guidance is quite helpful, and often a CSS framework is all you need.

于是我们进入跟进模式。我会用自己写的一个叫 [Postrboard](https://burkeholland.github.io/postrboard-design) 的 CSS 框架。把它加成一项技能，只是指向那份 CSS，并告诉智能体怎么用。你想用也可以自己装，或者挑任何一个你喜欢的 CSS 框架都行。给模型一点设计指引非常有帮助，往往一个 CSS 框架就足够了。

```
ok - we don't need a landing page here - just the component, output and settings panel in a minimal setting. Use the /postboard skill for the design and colors.
```

For the date picker, when I click on the day, it tries to zoom in, but can’t because there is nothing to zoom to. There should be no zoom there.

关于这个日期选择器：当我点击“日”时，它试图放大，却因为没什么可放大而失败。那里本就不该有缩放。

It doesn’t need to say “Zoom Out” at the top

顶部没必要写 “Zoom Out”。

When I mouse over a month or year that contains the selected day, I cannot read the hover text.

当鼠标悬停在包含所选日期的月份或年份上时，悬停文字看不清。

When I click “Today” it should take me to that day view, even if I’m on the month or the year.

点 “Today” 时，即便当前在月视图或年视图，也应跳到当日视图。

The months don’t need numbers under them and they don’t need to be in boxes

月份下方不需要数字，也不必用方框。

Same goes for years. And it doesn’t need to say “12 years” at the top.”

年份同理。而且顶部没必要写 “12 years”。

Notice how conversational this is. Don’t overthink it. When you’re fixing a bunch of small things like this, just give it to the model. If you’ve got the context, you’ve got the prompt.

注意这种对话有多自然。别想太多。当你在修这一堆小问题时，直接丢给模型就行。你手里有上下文，就有提示词。

The most important thing is not to settle for AI output that is “good enough.” Insist on quality. Be ruthless about it. That part is still your responsibility, and knowing what a quality result is from something that isn’t is the value that you bring. No AI will ever replace your human touch and creativity.

最重要的一点：别满足于“还行”的 AI 输出。对质量死磕。这一半仍是你的责任；而能分辨“好结果”与“不够好”，正是你带来的价值。没有任何 AI 能取代你的人类触感与创造力。

Here’s what my final date picker looks like. Scroll to the end of this post to see it in action.

这是我最终做出的日期选择器。滚到本文末尾可以看到它的实际效果。

![Final date picker result. It shows a monthly calendar on the left and a view settings on the right.](https://github.blog/wp-content/uploads/2026/07/datepicker.png?w=1545)

Final date picker result. It shows a monthly calendar on the left and a view settings on the right.（最终的日期选择器效果：左侧为月历，右侧为视图设置面板。）

## 7. Rubber duck the result（给结果做 Rubber Duck 审查）

After you’ve iterated and are happy with what you’ve created, it’s time to do a final review.

迭代到满意之后，就到了做最终审查的时候。

Request a [Rubber Duck review](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/rubber-duck) from GitHub Copilot. You can do this just by asking for it:

向 GitHub Copilot 发起一次 [Rubber Duck 审查（橡皮鸭审查）](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/rubber-duck)。直接开口要就行：

```
Perform a rubber duck review on this date picker component implementation
```

In a Rubber Duck review, GitHub Copilot will request a review from a model of a different AI family. For instance, since I was using GPT 5.6 Terra, it requested a review from Sonnet. Different models were trained on different data, so they have different blind spots. A Rubber Duck review helps identify potential issues that might be missed by a single model.

在 Rubber Duck 审查中，GitHub Copilot 会请一个“不同 AI 家族”的模型来评审。比如我当时用的是 GPT 5.6 Terra，它就请了 Sonnet 来审。不同模型训练数据不同，盲区也不同。Rubber Duck 审查能帮你发现单个模型可能遗漏的潜在问题。

Note that you can use this at any point in this workflow. You can rubber duck prototypes. You can rubber duck plans. It all just depends on if you want a second AI review on something.

注意，这一步在工作流的任何节点都能用。你可以对原型做橡皮鸭审查，也可以对计划做。全看你是否需要第二双 AI 的眼睛。

And if you want to take this a step further, you can combine rubber duck with Autopilot to get the models to work together in a loop to improve the final result.

如果你想更进一步，还可以把橡皮鸭审查和 Autopilot 组合起来，让多个模型在循环里互相打磨，提升最终结果。

“/autopilot rubber duck this date picker implementation. When you have the result, review it carefully and make any necessary adjustments. Repeat the rubber duck review until both you and the reviewing model agree that the only items that remain have diminishing returns.”

“/autopilot rubber duck 对这份日期选择器实现做审查。拿到结果后仔细复查，做必要的调整。反复做橡皮鸭审查，直到你和评审模型都一致认为：剩下的项收益已经递减。”

After this step, you will have an even more refined result than before and will have likely identified many extra edge cases. This step does cost more tokens, but you are really battle-hardening the code. Think of it as an investment in your future self who won’t have to deal with these issues because you caught them now.

这一步之后，你会得到比之前更精炼的结果，而且大概率还会揪出不少额外的边界情况。它确实更费 token，但你是在真正地给代码“淬火加固”。把它看作对你未来自己的投资——因为现在逮住了这些问题，将来就不必再处理。

## 8. Profit（收工）

At this point, you’re ready to stage and commit, or move on to the next feature you want to add along with this pull request.

到这一步，你就可以暂存、提交了，或者顺着这个 PR 继续加下一个想要的功能。

I’d recommend starting a new chat session for anything you do next that doesn’t have to do with this date picker. You can think of chat sessions as being topical; if you start to diverge too much from the main topic, it’s probably time for a new session.

我建议：凡是和这个日期选择器无关的事，都开一个新的对话会话。可以把会话理解为“按主题划分”的——如果你开始严重偏离主线，大概就是该开新会话的时候了。

Here’s the final result from my workflow building the date picker for this post.

这是我用这套工作流做出来的最终成果。

<video height="1080" width="1520" controls="" src="https://github.blog/wp-content/uploads/2026/07/datepicker.mp4"></video>

I realize that this is a bit of a contrived example, but can we all just pause for a moment and marvel at what we’re able to pull off with AI now? Building a date picker used to be one of the hardest things you could try to do. Just ask any of the heroes out there who have built them.

我意识到这是个有点刻意的例子，但能不能让我们都停一下，惊叹于如今用 AI 能做到的事？做一个日期选择器，曾经是最难啃的活儿之一。去问问那些亲手做过的人就知道了。

## Things don’t have to be complicated（不必把事情复杂化）

This simple workflow will be enough for most people. The simplicity also helps you multitask. It’s easier to reason about what agent is in what state and what you were doing last when you keep things simple. Your context window is limited too.

这套简单的工作流，对大多数人已经足够。简单本身也有助于你多线并行——事情越简单，你就越容易判断“哪个智能体处于什么状态、我上一步在干嘛”。你的上下文窗口也是有限的。

There is so much happening in the AI space right now. There is no upper limit on the things that you can build and experiment with. You can add MCP servers, skills, instructions, and custom agents. You can set up workflows and loops, create agents that prompt agents, and stand up entire virtual dev teams.

如今的 AI 领域变化太快，你能搭建、能试验的东西没有上限。你可以加 MCP 服务器、技能、指令、自定义智能体；可以搭工作流和循环，造出会去提示其他智能体的智能体，甚至拉起一整支虚拟开发团队。

But keep in mind that nobody really knows what they are doing right now. We’re all figuring this out as we go. A lot of what is today’s magical incantation for AI will be tomorrow’s anti-pattern.

但请记住：此刻没有人真正知道自己在干嘛。我们都在边走边摸索。今天看似神奇的 AI 咒语，明天很可能就成了反模式。
