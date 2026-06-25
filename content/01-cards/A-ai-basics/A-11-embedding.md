---
group: A-ai-basics
card_id: A-11
title: Embedding 词向量
difficulty: ⭐⭐
last_updated: 2026-06-23
status: 已核实
related: [A-08, A-09]
---

# A-11 Embedding 词向量

## 一句话定义
Embedding = 把任何一段文字（或图片、音频）**压缩成一串数字**（通常 256-3072 维），数学上意思越接近的内容，数字也越接近。它是"语义"的数学表达。

## 打个比方
**Embedding 像给每段文字算"指纹"**：
- 普通指纹只能判断"是不是同一个人"
- Embedding 指纹能判断"两个人长得有多像"——指纹的距离 = 文字的语义距离

比如：
- "猫" 的 Embedding ≈ "Cat" 的 Embedding ≈ "小猫" 的 Embedding（距离都很近）
- "猫" 的 Embedding 离 "狗" 比离 "汽车" 近得多
- "我感冒了头疼" 的 Embedding 离 "I have a cold" 非常近——哪怕一个中文一个英文

## 和 vibe coding 的关系
- **RAG（A-08）的第一步**就是把文档 Embedding 后存进向量库（A-09）
- **语义搜索**："搜跟'怎么退订阅'相关的客服记录"——靠 Embedding 比关键词搜索强得多
- **聚类 / 推荐**："找出和这个用户问的问题最像的 10 条 FAQ"
- **去重**：识别"虽然措辞不同但意思一样"的内容

对独立开发者，最常用的 Embedding 模型是：**OpenAI text-embedding-3-small**（便宜、效果好）、**Cohere embed-multilingual-v3**（中英文都强）、**国产 BGE / Qwen embedding**（中文最强、可本地部署）。

## 典型场景 / 示例

**用 OpenAI API 算 Embedding**：
```typescript
import OpenAI from "openai";
const openai = new OpenAI();

const result = await openai.embeddings.create({
  model: "text-embedding-3-small",
  input: "我感冒了，喉咙痛",
});

// result.data[0].embedding 是一个 1536 维的数字数组
// [-0.0234, 0.0512, -0.0891, ..., 0.0123]
```

**用这个 Embedding 干嘛？**
- 存进向量库（A-09），未来可以"找出和这条最相似的 X 条"
- 直接比对：算两条 Embedding 的余弦相似度（cosine similarity），范围 -1 到 1，越接近 1 越像

**主流 Embedding 模型简表**：

| 模型 | 维度 | 多语言 | 价格（百万 token） | 备注 |
|---|---|---|---|---|
| OpenAI text-embedding-3-small | 可裁 512/1536 | 强 | ~$0.02 | 性价比基准 |
| OpenAI text-embedding-3-large | 可裁到 3072 | 强 | ~$0.13 | 效果最强 |
| Cohere embed-multilingual-v3 | 1024 | 100+ 语言 | ~$0.10 | 中文表现好 |
| BGE-M3（智源开源） | 1024 | 100+ 语言 | 免费（自部署） | 中文 SOTA，可本地 |
| Qwen3-Embedding | 1024-4096 | 强 | 通义千问 API 定价 | 国内首选 |

> 价格变动频繁，以各家官网为准。**查询日期：2026-06-23**

## 常见误区
- ❌ **"Embedding 和 LLM 是同一个模型"**：不是。它们是**两个不同的模型**——Embedding 模型只做"压缩成向量"这件事，不会生成文字。一个产品可能同时用一个 LLM 和一个 Embedding 模型。
- ❌ **"维度越高越准"**：高维度更贵更慢，且差距常常很小。生产环境 512 / 1024 维通常够用。
- ❌ **"任意两个模型的 Embedding 可以互相比较"**：**绝对不行**。不同模型的向量空间完全不一样。换 Embedding 模型 = 整个向量库必须重新生成。
- ❌ **"Embedding 一次就够了"**：如果原文档更新了，对应 Embedding 必须重算并替换库里的旧值——很多 RAG 系统的"答案不准"就是因为忘了这一步。

## 延伸阅读
- [OpenAI Embeddings 官方指南](https://platform.openai.com/docs/guides/embeddings) `[英 · ⭐⭐ · 免费 · 持续更新]`
- [MTEB Leaderboard](https://huggingface.co/spaces/mteb/leaderboard) `[英 · ⭐⭐ · 免费 · 持续更新]` 各 Embedding 模型在多种任务上的客观排名，挑模型必看。
- [BGE 系列（智源开源，中文最强之一）](https://github.com/FlagOpen/FlagEmbedding) `[中/英 · ⭐⭐ · 免费 · 持续更新]`

## 去问 AI
> 「请用'把每个人的口味偏好压成一个分数'这个比方解释 Embedding。然后告诉我：如果我有 10 万条客服记录想做语义搜索，应该选哪个 Embedding 模型？为什么？」

---
**来源**：① OpenAI 文档  ② MTEB Leaderboard  ③ 智源 FlagEmbedding
**查询日期**：2026-06-23 · **数据来源时间**：2024-2026
