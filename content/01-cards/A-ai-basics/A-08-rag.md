---
group: A-ai-basics
card_id: A-08
title: RAG 检索增强生成
difficulty: ⭐⭐
last_updated: 2026-06-23
status: 已核实
related: [A-05, A-09, A-11]
---

# A-08 RAG 检索增强生成（Retrieval-Augmented Generation）

## 一句话定义
RAG = 让 AI 回答前**先去外部资料库搜一搜**，把搜到的最相关片段塞进 prompt，再让它基于这些片段回答——本质是给 AI 现场"塞了张小抄"。

## 打个比方
**没有 RAG 的 AI 像参加开放性考试的学生**：只能靠脑子里背过的（训练数据）。
**有 RAG 的 AI 像开卷考试的学生**：你给他一摞资料，他先翻资料找到相关页，再写答案。
- 学生会不会写答案 = LLM 能力（A-01）
- 资料里是不是有正确内容 = 数据库质量
- 学生能不能翻到相关页 = 检索质量（A-09 / A-11）

## 和 vibe coding 的关系
RAG 是几乎所有"AI 助手 + 你公司/产品自有数据"类产品的标配：
- 给自己公司文档做 AI 客服 → 你不可能把 5000 页文档塞进 prompt（A-02 上下文窗口装不下），用 RAG 每次只塞最相关的 3-5 段。
- 给个人笔记做 AI 助手（Notion AI、飞书智能助理、Mem）→ RAG。
- 给你的产品加 "AI 帮我查历史订单" → 用户问什么，先从数据库检索相关订单，再让 AI 总结。

Cursor / Claude Code 内部都有 RAG：它读你的代码库时，不是把整个项目塞 prompt，而是按相关性检索片段——这就是为什么大型项目它也能"看懂"。

## 典型场景 / 示例

**RAG 标准流程**（4 步）：

```
1. 准备阶段（一次性）：
   把所有文档 → 切片 → Embedding（A-11）→ 存到向量数据库（A-09）

2. 用户提问："如何配置 SSO？"

3. 检索阶段：
   把问题也 Embedding → 在向量库找最相似的 5 个文档片段
   找到 ["第 3 章 SSO 配置", "FAQ: SAML vs OAuth", ...]

4. 生成阶段：
   把片段拼进 prompt：
   "基于以下资料回答：[片段 1][片段 2][片段 3]
    问题：如何配置 SSO？"
   → AI 基于这些资料生成答案
```

**最简实现**：用 LangChain / LlamaIndex 或直接用 Supabase pgvector / Chroma，几十行代码就能跑起来。

## 常见误区
- ❌ **"RAG 能完全消除幻觉"**：不能。如果检索到错误片段、或片段不够，AI 还是会瞎编。RAG 是降低幻觉，不是消除。
- ❌ **"上下文窗口大了 RAG 就没用了"**：错。即使 1M token 窗口，把全部资料塞进去也会变贵、变慢、"lost in the middle"（A-02）。RAG 永远有价值。
- ❌ **"切片越小越好 / 越大越好"**：通常 200-800 token 一片是经验值。太小丢失上下文，太大检索不准。
- ❌ **"RAG = 向量数据库"**：不是。RAG 是一种"先检索后生成"的架构，检索可以用向量、也可以用关键词（BM25）、也可以两者混合。

## 延伸阅读

### 📺 视频教程
- [RAG Explained Visually (YouTube)](https://www.youtube.com/watch?v=0Xeg9D0QLEM) `[英 · ⭐⭐ · 免费 · 2024 · 12min]` 可视化讲解 RAG 完整流程
- [RAG from Scratch (YouTube 系列)](https://www.youtube.com/watch?v=tcqQJNhAxHg) `[英 · ⭐⭐⭐ · 免费 · 2024 · 系列]` 从零手写 RAG 的完整教程
- [LangChain RAG Tutorial (YouTube)](https://www.youtube.com/watch?v=sVcwVQRHIc8) `[英 · ⭐⭐ · 免费 · 2024 · 30min]` LangChain 框架实现 RAG
- [李宏毅 · RAG 与外挂知识库 (B站)](https://www.bilibili.com/video/BV1TD4y137mP) `[中 · ⭐⭐ · 免费 · 2023 · 系列]` 中文讲解 RAG 原理

### 📰 文章
- [Anthropic: Retrieval-augmented generation](https://docs.anthropic.com/en/docs/build-with-claude/embeddings) `[英 · ⭐⭐ · 免费 · 2024]`
- [LlamaIndex 官方教程](https://docs.llamaindex.ai/en/stable/) `[英 · ⭐⭐ · 免费 · 持续更新]` 最专门做 RAG 的开源框架。
- [Pinecone Learning Center: RAG 系列文章](https://www.pinecone.io/learn/retrieval-augmented-generation/) `[英 · ⭐⭐ · 免费 · 2024]` 系统讲解 RAG 各种坑。
- [Hugging Face RAG 教程（中文社区翻译）](https://huggingface.co/learn/cookbook/zh-CN/rag_with_unstructured_data) `[中 · ⭐⭐ · 免费 · 2024]`

## 去问 AI
> 「用'公司新员工查内部 wiki'的例子，给我讲清楚 RAG 的四个步骤。哪一步最容易出错？」

---
**来源**：① Anthropic 文档  ② LlamaIndex 文档  ③ Pinecone Learning Center
**查询日期**：2026-06-23 · **数据来源时间**：2024-2025
