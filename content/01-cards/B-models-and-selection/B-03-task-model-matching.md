---
group: B-models-and-selection
card_id: B-03
title: 任务→模型怎么挑：长文档 / 推理 / 中文 / 性价比
difficulty: ⭐⭐
last_updated: 2026-06-23
status: 已核实
related: [B-01, B-02, B-04, B-08]
---

# B-03 任务→模型怎么挑：长文档 / 推理 / 中文 / 性价比

> 这是 B-02（编程）之外的「四大类常见任务」选型指南。细分速查表在 B-08。

## 一句话定义
- **长文档**：选上下文窗口大且"真长上下文"实测好的模型——Gemini Pro 系列、GPT-4.1、Kimi K2.7、Qwen3.7-Max（都是 1M 级别）
- **复杂推理**：选"推理型 / 思考型" 模型——o 系列、GPT-5 (high)、Claude Opus、DeepSeek-R 系、Qwen Plus 思考模式
- **中文任务**：国产模型在 CMMLU / SuperCLUE 上长期占优——Qwen / GLM / Kimi / DeepSeek 都强
- **高性价比**：缓存命中后 DeepSeek V4-Flash 输入 ¥0.02 / 1M、qwen-flash 输入 ¥0.15 / 1M、Claude Haiku 系，几乎免费用

## 打个比方
**像挑工种**：
- 长文档 = 一目十行的速读冠军
- 推理 = 慢但靠谱的研究生（思考型模型故意"想久一点"换更准答案）
- 中文 = 本土翻译官（懂俚语、懂"我擦"和"我啊"的语气区别）
- 性价比 = 公司里出活儿稳的实习生

## 和 vibe coding 的关系
你做的产品不一定都是聊天框：
- 接客户合同审核工具 → 长文档优先
- 数学家教 / 代码 review / 架构决策 → 推理优先
- 面向中文用户的笔记 / 客服 / 内容生成 → 中文优先
- 每月日活 1 万的 AI 工具 → 性价比优先

---

## 一、长文档任务

### 上下文窗口规格（核实窗口 2026-06）

| 模型 | 上下文窗口 | "真长上下文"实测 |
|---|---|---|
| Gemini 2.5 / 3.x Pro | 1M | RULER 128K=94.4（Gemini-1.5-Pro 历史数据，2.5+ 应同等或更优）；NoLiMa 32K=48.2，**字面无关推理掉档明显** |
| GPT-4.1 | 1M | NoLiMa 32K=79.8 / 64K=69.7，**当前公开测试中 32K 后真长上下文唯一保持 ≥70 的模型** |
| Claude Sonnet / Opus 当前版 | 1M（部分版本 200K） | RULER / NoLiMa 公开数据较少，社区口碑稳定 |
| Kimi K2.7 Code | 256K | 中文场景表现强 |
| DeepSeek V4 系列 | 1M | 上下文延续 V3 系列 |
| Qwen3.7-max / qwen3-coder 系列 | 1M | RULER 128K Qwen3-235B = 90.6 |
| MiniMax-M3 | 1M（>512K 限量供应） | 2026-06-01 新发布 |
| MiniMax-M2.5 / M2.7 | 204K | — |

### 关键结论（来自 RULER + NoLiMa 实测）
- **"声明 1M 上下文 ≠ 1M 都能用好"**：几乎所有模型在达到声称长度之前就已显著掉档。
- **真正能在 32K 以上仍做"非字面匹配推理"的**：截至 2026-06，**GPT-4.1 是公开测试中唯一稳定通过的**。
- **结论**：要"塞超长文档让 AI 总结"——Gemini Pro / Qwen 表现好；要"塞超长文档让 AI 推理引用关系"——优先 GPT-4.1。
- **建议**：超过 100K 上下文的场景，永远要做"RAG（A-08）+ 长上下文" 双保险，不能完全信任一次性塞入。

---

## 二、复杂推理任务

### 推理型模型（"思考模式" / "thinking mode"）

推理型模型会在回答前**自己输出一段隐藏的"思考过程"**，比普通模型慢且贵 3-10 倍，但在数学、复杂代码、架构权衡上明显更准。

| 阵营 | 代表型号 | 备注 |
|---|---|---|
| OpenAI | o 系列 / GPT-5 (high) | high 档位就是开了 thinking |
| Anthropic | Claude Opus + extended thinking | 在 Claude Sonnet 4 起也可选思考 |
| Google | Gemini Pro thinking mode | — |
| xAI | grok-4 reasoning 档 | — |
| DeepSeek | DeepSeek-R1 / R 系；V4 自带 thinking | V4 默认开启思考 |
| 智谱 GLM | GLM-Z1 已 deprecated；GLM-5.2 自带推理 | — |
| Qwen | Qwen Plus 思考模式（独立计价） | 思考输出贵 2-4× |
| Kimi | K2.7 系列默认思考 | — |

### 适合开推理模式的任务
- 数学题、SQL 优化、复杂查询设计
- 代码 review、找深层 bug、解释复杂报错
- 架构方案、技术选型权衡
- 长链业务流程梳理

### 不要开推理模式的任务
- 简单生成（自动补全、改名、格式化）
- 高频调用（弹幕、客服 FAQ）→ 用便宜的非思考模型

---

## 三、中文任务

### 中文榜单时点参考

**🔵 CMMLU（中文知识 multitask，Five-shot Top 5）**
> 来源：https://github.com/haonan-li/CMMLU
> 数据快照：仓库 README 维护，最新条目 ~2024 末-2025 上半年（2026 未更新）

| Rank | Model | Score |
|---|---|---|
| 1 | Lingzhi-72B-chat | 90.26 |
| 2 | Telechat2-35B（中国电信） | 90.16 |
| 3 | Spark 4.0（讯飞） | 90.07 |
| 4 | Qwen2-72B（阿里） | 89.65 |
| 5 | Jiutian 大模型（中国移动） | 88.59 |

**🔵 SuperCLUE**
- 👉 **请直接打开** https://www.superclueai.com/ 查 2026-06 最新月榜（页面 JS 渲染，无法程序化抓取）
- 月度更新，可以追踪国产模型当月排名变化
- 历史趋势：DeepSeek、Qwen、GLM、Kimi、文心、智谱、豆包长期占据 SuperCLUE 第一梯队，GPT/Claude 落后约 3-6 个月

**🔵 C-Eval**
- 👉 **请直接打开** https://cevalbenchmark.com/static/leaderboard.html 查（同样动态渲染）

### 中文任务推荐
| 场景 | 推荐 |
|---|---|
| **写中文文案 / 营销 / 小红书** | Qwen / Kimi / DeepSeek / GLM 任意一个都够 |
| **中文长文档总结** | Qwen3.7-Max（1M）、Kimi K2.7（256K，对中文友好） |
| **中文客服 / 对话产品** | DeepSeek V4-Flash（极便宜）、Qwen-Plus、GLM-4.6 |
| **中文 RAG** | 配合 BGE / Qwen Embedding；模型用 Qwen 系列最稳 |

---

## 四、高性价比组合

### 极致便宜的"日常工作模型"（核实窗口 2026-06）

| 模型 | 输入价（¥/1M） | 输出价（¥/1M） | 备注 |
|---|---|---|---|
| **DeepSeek V4-Flash**（缓存命中） | **0.02** | 2 | 简直白送，独立开发者首选 |
| **DeepSeek V4-Flash**（未命中） | 1 | 2 | 仍非常便宜 |
| **qwen-flash**（≤ 阈值档） | 0.15 | 1.5 | 阿里百炼最便宜档 |
| **GLM-4.5-Flash** | 标"即将下线/免费" | 标"即将下线/免费" | 智谱免费档；准确价请查 https://bigmodel.cn/pricing |
| **腾讯混元 hunyuan-a13b** | **0.5** | **2** | 国产小尺寸性价比 |
| **腾讯混元 hunyuan-turbos** | **0.8** | **2** | 主力闭源对话 |
| **豆包 Seed-1.6**（0-32K） | **0.8** | **8** | 字节方舟主推 |
| **Claude Haiku 当前版** | 约 $1（≈¥7-8） | 约 $5（≈¥35-40） | 海外最便宜的高质量小模型 |
| **GPT-5 nano** | 约 $0.05 | 约 $0.40 | 极致便宜，简单分类/生成够用 |
| **Gemini 2.5/3.x Flash-Lite** | 约 $0.10-$0.25 | 约 $0.40-$1.50 | Google 的小模型，多模态 |

> 价格变动频繁，**查询日期：2026-06-23**。请最终以各家 pricing 页为准。

### 省钱六招（详见 B-05）
1. **缓存（prompt caching）**：System Prompt 不变的部分被缓存后输入价降 5-10×
2. **batch API**：异步批量请求，价格通常打 5 折
3. **分级路由**：简单任务派给 mini/Flash/Haiku，复杂任务才派旗舰
4. **流式 + 早停**：用户已满意立刻截流
5. **限制输出长度**：max_tokens 设小一点，避免 AI 啰嗦
6. **本地开源 fallback**：批量任务跑自部署的 Qwen / DeepSeek 开源版

---

## 常见误区
- ❌ **"上下文越大就什么都塞进去"**：贵、慢、还可能不准（NoLiMa 实测）。永远先用 RAG 缩小，再让 LLM 看小范围。
- ❌ **"中文任务一定用国产模型"**：现在 GPT-5 / Claude Opus 的中文流畅度也很高，关键看"训练数据有没有中文长尾"。需要俚语 / 古文 / 特定行业术语时国产更稳，通用场景两边都可。
- ❌ **"思考模式 = 一定更准"**：在简单任务上反而更差（过度思考 / 啰嗦）。决策标准：人类专家也要"想一下"的任务才值得开思考模式。
- ❌ **"用最便宜的模型省钱"**：如果便宜模型每次都答错你要重发 3 遍，比直接用旗舰还贵。**真省钱的方法是"匹配难度"**，不是"无脑选便宜"。

## 延伸阅读
- [RULER 官方仓库（NVIDIA）](https://github.com/NVIDIA/RULER) `[英 · ⭐⭐ · 免费 · 持续更新]` 长上下文实测榜
- [NoLiMa（Adobe Research）](https://github.com/adobe-research/NoLiMa) `[英 · ⭐⭐⭐ · 免费 · 2024-2025]` 长上下文"非字面匹配"实测
- [CMMLU 仓库](https://github.com/haonan-li/CMMLU) `[中/英 · ⭐⭐ · 免费 · 持续更新]` 中文知识榜
- [SuperCLUE 官网](https://www.superclueai.com/) `[中 · ⭐⭐ · 免费 · 月度更新]` 国产模型最重要的中文综合榜
- [DeepSeek API 定价](https://api-docs.deepseek.com/zh-cn/quick_start/pricing) `[中 · ⭐ · 免费 · 2026]`

## 去问 AI
> 「我做的是面向中文小学生家长的 AI 作业辅导助手，每天 ~5 万次调用，70% 是简单答题、30% 是给家长解释思路。请给我设计一个'分级模型路由'方案：用什么模型处理哪一档？月成本预估多少？」

---
**来源**：① RULER / NoLiMa / CMMLU 仓库 README  ② 各厂官方 pricing 页  ③ DeepSeek / Kimi 官方文档
**查询日期**：2026-06-23 · **数据来源时间**：CMMLU 2024-2025；定价 2026-06；SuperCLUE ⚠️ 待核实
