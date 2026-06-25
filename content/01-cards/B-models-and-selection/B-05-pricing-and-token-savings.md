---
group: B-models-and-selection
card_id: B-05
title: 模型定价怎么读、token 怎么算、怎么省钱
difficulty: ⭐⭐
last_updated: 2026-06-23
status: 已核实
related: [A-02, B-01, B-03]
---

# B-05 模型定价怎么读、token 怎么算、怎么省钱

## 一句话定义
模型 API 按 **token 数** 计费，分**输入价**和**输出价**两档（输出通常贵 4-10 倍）。会读价 + 会算 token + 会用 6 个省钱技巧，能让账单从 $100 砍到 $20。

## 打个比方
**像打的士**：
- **起步价 = 你的 System Prompt + 历史对话**（每次都要重新带上，每次都收钱）
- **里程费 = input token**（你说了多少话，按字算）
- **等候费 = output token**（AI 回了多少话，**贵得多**）
- **VIP 包月 = batch API + 缓存命中**（半价 / 一折）
- **打表跳字 = 高峰期 / 推理模式**（思考 thinking 多用了内部 token，单独计费）

## 和 vibe coding 的关系
- 你的 SaaS 上了 100 个用户，每人每天问 AI 10 次，月费可能 $50 也可能 $5000——差的就是有没有用这些技巧
- 你自己用 Cursor / Claude Code 写代码，一天烧 $5 还是 $50 也是同理
- **会算账 = 决定一个 AI 产品能不能盈利的核心能力**

## 典型场景 / 示例

### 一、价格怎么读

主流 API 计价单位都是 **"每百万 token"**（per 1M token / 1M tokens）。
你看到 `$3 / 1M input · $15 / 1M output` 意思是：每输入 1 百万 token 收 $3，每输出 1 百万 token 收 $15。

**典型代价感**（核实窗口 2026-06）：
| 价位档 | 输入价位 | 输出价位 | 典型场景 |
|---|---|---|---|
| 极便宜 | < $0.20 / 1M | < $1 / 1M | DeepSeek V4-Flash 缓存命中 ¥0.02、GPT-5 nano ~$0.05、qwen-flash ¥0.15 |
| 便宜 | $0.20 - $1 / 1M | $1 - $5 / 1M | GPT-5 mini、Claude Haiku、Gemini Flash-Lite、Kimi K2.6 |
| 中档 | $1 - $3 / 1M | $5 - $15 / 1M | GPT-5 medium、Claude Sonnet、Gemini Pro |
| 旗舰 | $3 - $10 / 1M | $15 - $50 / 1M | GPT-5 high、Claude Opus、o-pro 系 |

> ¥ 换算 $：按约 ¥7.2 = $1 估算；精确以当时汇率为准。

### 二、token 怎么算

**经验公式**：
- 英文 1 词 ≈ 1 token
- 中文 1 字 ≈ 1.5-2 token
- 代码 1 行 ≈ 5-30 token
- 1 张 1024×1024 图片 ≈ 800-1500 token（多模态模型）

**精确算**：
```python
# OpenAI 系列
import tiktoken
enc = tiktoken.encoding_for_model("gpt-4o")  # 兼容 GPT-5
print(len(enc.encode("你好，hello world")))  # → 实际 token 数
```
或者直接用网页工具 [OpenAI Tokenizer](https://platform.openai.com/tokenizer)。

Anthropic / Google / 国产模型各家 tokenizer 略有不同，但量级一致。

### 三、省钱六招

#### 1. Prompt Caching（缓存命中）⭐⭐⭐
不变的 System Prompt + 长文档前缀，可以被缓存。后续请求里这部分价格降 5-10×。
- Anthropic: cache write 比正常贵 25%；**cache read 只要 10%**
- DeepSeek: **缓存命中输入价是非命中的 1/50**（V4-Flash 命中 ¥0.02 vs 未命中 ¥1）
- OpenAI: 自动缓存最近相同前缀，命中后降到 1/4

**做法**：把 System Prompt 写得长长的 + 把常见示例都塞前面，让它"成为可缓存的前缀"。

#### 2. Batch API ⭐⭐
异步批量请求，**通常打 5 折**（OpenAI / Anthropic 都支持），代价是等 ≤24 小时。
适合：定时任务、夜间数据处理、不实时的内容生成。

#### 3. 分级模型路由 ⭐⭐⭐
**绝大多数请求其实不需要旗舰模型**。
最佳实践：
```
用户请求 → 一个轻量"分类器"（用便宜小模型，或正则）判断难度
  ├─ 简单（占 70%）→ Claude Haiku / GPT-5 mini / DeepSeek V4-Flash
  ├─ 中等（占 25%）→ Claude Sonnet / GPT-5 medium
  └─ 复杂（占 5%） → Claude Opus / GPT-5 high
```
账单可能从 $1000 砍到 $150。

#### 4. 流式 + 早停 ⭐⭐
开 streaming（A-10），如果用户读到一半已经满意/答案不对，**前端立刻中断流**。
省下来的是"AI 还要继续写完的那段 output token"。

#### 5. 限制 max_tokens ⭐
告诉 AI"答案不超过 200 字"，并设 max_tokens = 300。
防止它啰嗦输出 2000 字浪费钱。

#### 6. 本地开源 fallback ⭐
对**批量、不敏感、可容忍延迟**的任务（夜间打标签、生成 metadata、数据清洗）：
- 自部署 Qwen / DeepSeek / GLM 开源版
- 或用 Groq / Together / Fireworks 等便宜推理平台跑开源模型
- 价格通常比 GPT-5 低 5-20×

### 四、实战：算一个产品的月度成本

假设你做一个 AI 摘要工具：
- 1 万 DAU
- 每人每天摘要 3 篇文章
- 每篇平均输入 5K token、输出 500 token
- 模型：Claude Sonnet（输入 $3 / 1M、输出 $15 / 1M）

**裸账单**：
- 每日 input：10000 × 3 × 5000 = 1.5 亿 token = 150M token → $3 × 150 = $450
- 每日 output：10000 × 3 × 500 = 1500 万 token = 15M token → $15 × 15 = $225
- **每日 $675，每月 $20,250** 😱

**优化后**：
- 文章前缀做 prompt caching → input 实际付费量降 80% → $90/day
- 简单摘要走 Haiku（占 70%）：input $1 / 1M、output $5 / 1M → 那部分变 ~ $63/day
- 实际 30% 走 Sonnet：~ $202/day
- **优化后每日约 $265，每月 $7,950**（仍贵但已可控，再叠 batch 还能降）

## 常见误区
- ❌ **"input 和 output 一个价"**：output 通常贵 4-10 倍。让 AI"少说点"比"少问点"省钱效果大得多。
- ❌ **"思考模式不收钱"**：推理模型的"内部思考 token"通常**按 output 价收费**（OpenAI o 系列、Claude extended thinking、DeepSeek thinking）。
- ❌ **"缓存自动有"**：OpenAI 自动缓存，但 Anthropic / DeepSeek 需要**显式声明 cache_control**。不做这一步等于不省钱。
- ❌ **"开源模型自部署一定省"**：算上显卡折旧 + 运维人力，独立开发者级别用量下，**云厂商托管价（DeepSeek、Qwen 这类）几乎一定更划算**。自部署只在隐私、延迟、海量批处理三种场景才划得来。

## 延伸阅读
- [OpenAI Pricing](https://platform.openai.com/docs/pricing) `[英 · ⭐ · 免费 · 持续更新]`
- [Anthropic Prompt Caching 文档](https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching) `[英 · ⭐⭐ · 免费 · 持续更新]`
- [Anthropic Batch API 文档](https://docs.anthropic.com/en/docs/build-with-claude/batch-processing) `[英 · ⭐⭐ · 免费 · 持续更新]`
- [DeepSeek 计费 + 缓存说明](https://api-docs.deepseek.com/zh-cn/quick_start/pricing) `[中 · ⭐ · 免费 · 2026]` 缓存命中价极低，独立开发者宝藏
- [OpenAI Tokenizer](https://platform.openai.com/tokenizer) `[英 · ⭐ · 免费 · 常青]`

## 去问 AI
> 「我做了一个 AI 邮件摘要 SaaS，预计每月有 5000 个付费用户，每人每天处理 20 封邮件（平均 2K input / 200 output）。请你帮我对比三个方案的月成本：(A) 全用 Claude Sonnet；(B) 80% 用 Haiku、20% 用 Sonnet；(C) 用 DeepSeek V4-Pro。并告诉我用了 prompt caching 后这三个方案分别能省多少。」

---
**来源**：① OpenAI / Anthropic / DeepSeek 官方定价  ② Anthropic Prompt Caching 文档  ③ OpenAI Tokenizer
**查询日期**：2026-06-23 · **数据来源时间**：2026-06
