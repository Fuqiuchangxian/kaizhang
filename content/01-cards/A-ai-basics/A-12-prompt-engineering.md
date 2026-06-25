---
group: A-ai-basics
card_id: A-12
title: Prompt Engineering（Zero-shot / Few-shot / CoT）
difficulty: ⭐⭐
last_updated: 2026-06-23
status: 已核实
related: [A-03, A-04]
---

# A-12 Prompt Engineering：Zero-shot / Few-shot / CoT

## 一句话定义
Prompt Engineering 是"让模型答得更好"的技巧合集。三个最常用的招式：
- **Zero-shot** = 不给例子，直接问
- **Few-shot** = 给几个例子，让 AI 照着学
- **Chain-of-Thought (CoT)** = 让 AI"想完一步说一步"，把推理过程写出来

## 打个比方
**面对一个新员工教他干活**，你有三种教法：
- **Zero-shot**：直接派任务"帮我把这堆邮件分类"
- **Few-shot**：先给 3 封示例邮件，每封写明该归到哪一类，再让他做剩下的
- **CoT**：告诉他"先分析邮件主题→再判断发件人意图→再决定分类"

哪种最有效？看任务复杂度——简单任务 Zero-shot 就够，复杂分类 Few-shot 更稳，需要推理的（解数学题、写 SQL）必须 CoT。

## 和 vibe coding 的关系
你写代码 / 文案的每次 prompt，本质都在用这三招（哪怕你没意识到）：
- 让 Cursor 写一个登录页 = Zero-shot（默认它见过类似代码）
- 让 AI 模仿你 README 的语气写新章节 = Few-shot（提供之前章节作为示例）
- 让 AI 调试一个奇怪 bug = CoT（让它一步步分析"如果这里是 null 会怎样"）

写好这三招就能让 AI 输出从 60 分提到 85 分，**比换更贵的模型性价比高得多**。

## 典型场景 / 示例

**Zero-shot（适合简单/常见任务）**：
```
把下面这段评论分类为：好评 / 差评 / 中评

"东西不错就是发货慢"
```

**Few-shot（适合需要遵循特定风格 / 格式的任务）**：
```
按以下示例风格写产品文案：

示例 1：
产品：保温杯
文案：办公桌上的小温暖，让 8 小时不再凉透。

示例 2：
产品：降噪耳机
文案：戴上它，整个世界都为你让路。

现在请为"机械键盘"写一条：
```

**Chain-of-Thought（适合需要推理的任务）**：
```
问题：班里 30 人，70% 是女生，男生比女生少多少？
请一步步思考：
1. 先算女生人数：
2. 再算男生人数：
3. 最后算差值：
```

CoT 关键短语：**"Let's think step by step." / "请一步步推理后再给答案。"**

**进阶组合**：
- **Self-consistency**：同一题让 AI 思考 5 次，取多数答案
- **Tree of Thoughts**：让 AI 同时探索多条思路再选最优
- **ReAct**：CoT + 工具调用（A-06）的组合，是 Agent（A-07）的基石

## 常见误区
- ❌ **"模型越强 prompt 越随意"**：错。GPT-5 / Claude 4.5 这种强模型也吃 Few-shot 和 CoT，只是 Zero-shot 已经够用的场景变多了。
- ❌ **"CoT 一定让答案更对"**：CoT 适合需要推理的题；简单事实题加 CoT 反而画蛇添足、增加成本。
- ❌ **"Few-shot 例子越多越好"**：3-5 个通常最优；超过 10 个上下文吃紧、效果未必更好。
- ❌ **"示例可以随便选"**：Few-shot 的例子质量直接决定输出质量。例子里有错误，AI 大概率把错误学了过去。

## 延伸阅读

### 📺 视频教程
- [吴恩达 · ChatGPT Prompt Engineering for Developers](https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/) `[英 · ⭐⭐ · 免费 · 2023 · 1h]` 系统 prompt engineering 入门
- [Prompt Engineering Masterclass (YouTube)](https://www.youtube.com/watch?v=dOxUroR57xs) `[英 · ⭐⭐ · 免费 · 2024 · 1h]` Zero-shot/Few-shot/CoT 全覆盖
- [李宏毅 · Prompt Engineering (B站)](https://www.bilibili.com/video/BV1TD4y137mP) `[中 · ⭐⭐ · 免费 · 2023 · 系列]` 中文系统讲解 prompting
- [Chain-of-Thought Explained (YouTube)](https://www.youtube.com/watch?v=0Xeg9D0QLEM) `[英 · ⭐⭐ · 免费 · 2024 · 10min]` CoT 原理解释

### 📰 文章
- [OpenAI Prompt Engineering 官方指南](https://platform.openai.com/docs/guides/prompt-engineering) `[英 · ⭐⭐ · 免费 · 持续更新]`
- [Anthropic Prompt Engineering 指南](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview) `[英 · ⭐⭐ · 免费 · 持续更新]`
- [Prompting Guide (中文版)](https://www.promptingguide.ai/zh) `[中 · ⭐⭐ · 免费 · 2024]` 系统覆盖 Zero-shot/Few-shot/CoT/ToT/ReAct，免费课程级质量。
- [Wei et al. Chain-of-Thought 原论文](https://arxiv.org/abs/2201.11903) `[英 · ⭐⭐⭐ · 免费 · 2022]` 想搞清来龙去脉可读。

## 去问 AI
> 「我要让 AI 帮我写日报。我有 5 篇过去写得不错的日报。请教我怎么用 Few-shot 方法写一个能复用的模板 prompt。」

---
**来源**：① OpenAI 官方  ② Anthropic 官方  ③ Prompting Guide  ④ CoT 原论文
**查询日期**：2026-06-23 · **数据来源时间**：2022-2026
