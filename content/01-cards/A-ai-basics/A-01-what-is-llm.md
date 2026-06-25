---
group: A-ai-basics
card_id: A-01
title: LLM 是什么
difficulty: ⭐
last_updated: 2026-06-23
status: 已核实
related: [A-02, A-03, B-01]
---

# A-01 LLM 是什么（大语言模型）

## 一句话定义
LLM 是一种"读过半个互联网的文字接龙机"——你给它一段话，它会接着往下写最可能的下一个字。

## 打个比方
把 LLM 想象成一个**记忆力超群但有点话痨的实习生**：他读过你公司过去十年所有的邮件、文档、聊天记录，但他自己没有真正"经历过"任何事。你问他问题，他不是"想"答案，而是凭直觉"猜"——根据训练里见过的相似场景，猜接下来应该说什么。这就是为什么他答得很快、很顺，但偶尔会一本正经地胡说八道（A-05 幻觉）。

## 和 vibe coding 的关系
LLM 是 vibe coding 的**发动机**。你在 Cursor 里写「帮我加个登录按钮」，背后干活的就是 LLM。理解它的本质——"猜下一个 token"——能解释你日常遇到的所有奇怪现象：为什么同样的 prompt 两次结果不一样、为什么它写代码偶尔会编造不存在的函数、为什么给它的"上下文"那么重要。

## 典型场景 / 示例
1. **对话**：你在 ChatGPT 输入「写一首关于秋天的诗」，它逐字生成。
2. **写代码**：Cursor 里你按 `Cmd+K` 输入「把这个 for 循环改成 map」，LLM 读取你的代码上下文，吐出新版本。

## 常见误区
- ❌ **以为 LLM"理解"了你的意思**：它只是在统计上找出最可能的接下来文本，没有真正的理解。
- ❌ **以为 LLM 联网了 / 能查实时信息**：默认情况下它只知道训练截止日期前的事。要查实时数据需要工具（A-06 Function Calling）或 RAG（A-08）。
- ❌ **以为更长的 prompt 一定更好**：超过上下文窗口（A-02）前面的会被丢掉；冗长无关信息反而会拉低输出质量。

## 延伸阅读

### 📺 视频教程
- [Andrej Karpathy · Let's build GPT: from scratch, in code, spelled out](https://www.youtube.com/watch?v=kCc8FmEb1nY) `[英 · ⭐⭐ · 免费 · 2023 · 2h]` 从零手写 GPT，深度但易懂
- [3Blue1Brown · But what is a GPT? Visual intro to Transformers](https://www.youtube.com/watch?v=wjZofJX0vr4) `[英 · ⭐⭐ · 免费 · 2024 · 27min]` 动画解释 Transformer 原理，视觉化极佳
- [李宏毅 · 生成式 AI 导论 (B站)](https://www.bilibili.com/video/BV1TD4y137mP) `[中 · ⭐⭐ · 免费 · 2023 · 系列]` 台大教授系统讲解 LLM 原理，中文学习者首选
- [Google Cloud · What is a Large Language Model? (YouTube)](https://www.youtube.com/watch?v=viP_9RdA-YY) `[英 · ⭐ · 免费 · 2024 · 5min]` 官方扫盲视频

### 📰 文章与课程
- [Andrej Karpathy: "Intro to Large Language Models" (YouTube · 1h)](https://www.youtube.com/watch?v=zjkBMFhNj_g) `[英 · ⭐⭐ · 免费 · 2023]` 一小时把 LLM 工作原理讲透，最经典入门。
- [Stephen Wolfram: "What Is ChatGPT Doing... and Why Does It Work?"](https://writings.stephenwolfram.com/2023/02/what-is-chatgpt-doing-and-why-does-it-work/) `[英 · ⭐⭐⭐ · 免费 · 2023]` 想搞清原理可读，相对硬核。
- [3Blue1Brown: 神经网络系列（中文字幕）](https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi) `[英/中字 · ⭐⭐ · 免费 · 2024]` 用动画讲清楚 LLM 背后的数学。

## 去问 AI
> 「用一个'幼儿园老师玩词语接龙'的例子，给我讲清楚 LLM 为什么会胡说八道、为什么有时候很聪明。」

---
**来源**：① Karpathy 公开课  ② Wolfram 博客  ③ 3Blue1Brown
**查询日期**：2026-06-23 · **数据来源时间**：2023-2024（基础概念不随时间变化）
