---
group: A-ai-basics
card_id: A-05
title: 模型幻觉
difficulty: ⭐
last_updated: 2026-06-23
status: 已核实
related: [A-01, A-08]
---

# A-05 模型幻觉（Hallucination）

## 一句话定义
模型幻觉 = AI **一本正经地编造**听起来非常可信、但实际上**不存在或不正确**的内容。

## 打个比方
**像一个特别能编故事的孩子**：你问他"上周末你去哪儿了？"，他没去过任何地方，但他不会说"没去"——他会编出一套"我去了海边，看到了一只蓝色的螃蟹"。语气自然、细节丰富、自圆其说。LLM 也是同款行为：它不会说"我不知道"，而是顺着语境编出一个"看起来对"的答案。

## 和 vibe coding 的关系
这是 vibe coding 最大的坑。AI 写代码时**经常会编造**：
- 不存在的函数名（"用 `array.flattenDeep()`" → 这不是原生 JS 方法）
- 不存在的 npm 包（"安装 `react-magic-form`" → 装上才发现没这个包）
- 不存在的 API 端点（"调用 Stripe `payments.refund.partial()`" → 文档里没有这个）
- 过时的 SDK 用法（用了 v3 的方法但你装的是 v5）

**对策**：写完代码先跑一遍、看终端报错；用 MCP（D 组）让 AI 直接查官方文档；让 AI"列出引用的所有 npm 包，再去 npmjs.com 核对"。

## 典型场景 / 示例

**幻觉例子**：
```
你：Next.js 怎么做服务端组件的 stream rendering？
AI：用 `next/streaming` 包的 `<Stream>` 组件...
```
（实际上没有 `next/streaming` 这个包，Next.js 是用 React 的 Suspense + use 实现流式的。）

**怎么识别**：
- 听着特别顺、但你模糊记得"好像不是这样"
- 给的代码片段你完全没见过的写法
- 引用了一个你查不到的版本号 / 论文 / 人名

## 常见误区
- ❌ **"贵的模型不会幻觉"**：错。GPT-5、Claude 4.5 Opus 同样会，只是概率低一些。
- ❌ **"我给上下文了就不会幻觉"**：减少不等于消除。即使贴了完整文档，AI 也可能"看错"或"脑补"。
- ❌ **"幻觉是 bug，未来一定能修好"**：当前共识是 LLM 的"猜下一个 token"机制决定了幻觉无法完全消除，只能用 RAG（A-08）、工具调用（A-06）、人工核对来缓解。

## 延伸阅读
- [OpenAI: Why language models hallucinate](https://openai.com/index/why-language-models-hallucinate/) `[英 · ⭐⭐ · 免费 · 2025]` 官方分析为什么会幻觉，以及如何减少。
- [Anthropic: Reduce hallucinations](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/reduce-hallucinations) `[英 · ⭐⭐ · 免费 · 2024]` 工程上对抗幻觉的具体技巧。
- [Vectara Hallucination Leaderboard (GitHub)](https://github.com/vectara/hallucination-leaderboard) `[英 · ⭐⭐ · 免费 · 持续更新]` 各模型幻觉率排名，可看时点对比。

## 去问 AI
> 「你刚刚写的这段代码用到了 `XXX` 这个函数/包/API，请你确认一下：(1) 它真的存在吗？(2) 在哪个版本起可用？(3) 它在官方文档里的链接是什么？如果不确定，请如实说不确定，不要编造。」

---
**来源**：① OpenAI 研究  ② Anthropic 官方  ③ Vectara 榜单
**查询日期**：2026-06-23 · **数据来源时间**：2024-2025
