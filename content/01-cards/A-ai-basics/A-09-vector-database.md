---
group: A-ai-basics
card_id: A-09
title: 向量数据库
difficulty: ⭐⭐
last_updated: 2026-06-23
status: 已核实
related: [A-08, A-11, F-03]
---

# A-09 向量数据库（Vector Database）

## 一句话定义
向量数据库 = 专门用来存"一串数字（向量）"并按"哪条向量和我最像"做闪电检索的数据库。它是 RAG（A-08）背后的引擎。

## 打个比方
普通数据库像**图书馆按书名查书**：你必须输入精确的书名 / 关键字才能找到。
向量数据库像**图书馆按"读者感受"查书**：你说"我想读一本看完心情会平静的书"，它能从 100 万本里找出最匹配这个感受的几本。
背后的原理是：先把每本书的"灵魂"压缩成一串数字（Embedding，见 A-11），数学上相似的灵魂在向量空间里距离更近。

## 和 vibe coding 的关系
绝大部分需要"语义搜索"的 AI 功能，都得靠它：
- AI 客服基于公司文档回答 → 文档存向量库
- "找出和这条评论类似的负面评论" → 评论存向量库
- AI 助手"记得"用户三个月前说过的偏好 → 长期记忆存向量库
- 推荐系统"看了 X 的人也喜欢 Y" → 商品 Embedding 存向量库

对 vibe coder 来说，**最简单的入手方式是用 Supabase 的 pgvector**——你已经有 Supabase 数据库的话，加一行扩展就有向量能力，不用单独搞一套基础设施。

## 典型场景 / 示例

**主流向量库简表**（按"对独立开发者友好度"排）：

| 名称 | 类型 | 适合场景 | 起步价 |
|---|---|---|---|
| **Supabase pgvector** | Postgres 扩展 | 已经用 Supabase 的，直接加 | 免费层 |
| **Chroma** | 开源、可本地 | 自己跑、纯前端 demo | 完全免费 |
| **Pinecone** | 托管 SaaS | 不想自己维护、规模化 | 有免费层 |
| **Weaviate** | 开源 + 云服务 | 需要复杂查询 / 混合检索 | 开源免费 |
| **Qdrant** | 开源、Rust 写 | 自部署、性能优先 | 开源免费 |
| **Milvus / Zilliz** | 开源 + 云 | 国内可用、大规模 | 有免费层 |

> 价格与免费额度变动频繁，以各自官网为准。**查询日期：2026-06-23**

**最简 demo（pgvector）**：
```sql
-- 在 Supabase SQL 编辑器里：
create extension vector;

create table docs (
  id bigserial primary key,
  content text,
  embedding vector(1536)  -- OpenAI text-embedding-3-small 的维度
);

-- 检索最相似的 5 条
select content
from docs
order by embedding <=> '[0.12, -0.45, ...]'::vector
limit 5;
```

## 常见误区
- ❌ **"向量库 = 数据库的替代品"**：不是。它和传统数据库**互补**——结构化字段（用户名、价格、时间）放普通表，语义内容（文章正文、评论、文档）才放向量。
- ❌ **"向量检索一定比关键词搜索准"**：不一定。一些场景（精确商品 SKU、人名）关键词搜索更准。生产环境常用**混合检索**（向量 + BM25 关键词）。
- ❌ **"做小项目也要 Pinecone"**：1 万条以下的数据，pgvector / Chroma 完全够，没必要单独花钱上托管服务。
- ❌ **"向量维度越高效果越好"**：维度越高存储/检索越贵；OpenAI、Cohere 现在主推可裁剪维度（Matryoshka），按需选 256/512/1024 即可。

## 延伸阅读
- [Supabase Vector / pgvector 官方指南](https://supabase.com/docs/guides/ai) `[英 · ⭐⭐ · 免费 · 持续更新]` 独立开发者最快上手路径。
- [Chroma 官网](https://www.trychroma.com/) `[英 · ⭐ · 免费 · 持续更新]` 本地 demo 首选。
- [Pinecone Learning Center](https://www.pinecone.io/learn/) `[英 · ⭐⭐ · 免费 · 持续更新]` 向量数据库知识最系统的免费课程。

## 去问 AI
> 「我想给一个'用自然语言搜公司知识库'的小工具选向量库。我现在已经用 Supabase。请你帮我列出 3 个选项的利弊，告诉我应该选哪个。」

---
**来源**：① Supabase 文档  ② Pinecone Learning Center  ③ Chroma 官方
**查询日期**：2026-06-23 · **数据来源时间**：2024-2026
