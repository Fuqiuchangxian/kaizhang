---
group: B-models-and-selection
card_id: B-01
title: 主流大模型全景图（2026-06 时点）
difficulty: ⭐⭐
last_updated: 2026-06-23
status: 已核实（部分版本号需以官网为准）
related: [B-02, B-03, B-07, B-08]
---

# B-01 主流大模型全景图

> **重要说明**：模型版本号与定价变化极快。本卡所有"当前主力"信息核实窗口为 **2026-06**；所有具体数字都标了查询日期；准确价请最终以官方 pricing 页为准。

## 一句话定义
2026 年的主流 LLM 分两个阵营——**海外三巨头 + xAI**（OpenAI / Anthropic / Google / xAI）和**国产七强**（DeepSeek / Qwen / GLM / Kimi / 豆包 / 混元 / MiniMax）。它们各有侧重，没有"全能冠军"。

## 打个比方
**像不同流派的厨师**：
- **OpenAI（GPT 系）**：全球连锁中央厨房，覆盖最广、社区生态最大、上手最容易
- **Anthropic（Claude 系）**：法式精致料理，写代码 + 长篇文字 + 安全性最稳的工程师之选
- **Google（Gemini 系）**：自带食材仓库的超市厨房（搜索 + YouTube + 1M 上下文），多模态最强
- **xAI（Grok 系）**：能上网、能"实时知道今天发生了什么"的厨师
- **DeepSeek**：极致性价比，菜量大价钱便宜，开源模型可自带食材回家做
- **Qwen / GLM / Kimi**：本地厨子，对中文菜系最熟，全套配菜从开源到闭源都有
- **豆包 / 混元 / MiniMax**：背后有大流量平台的厨师，对中文场景调优

## 和 vibe coding 的关系
你在 Cursor / Claude Code / Trae 里选哪个模型作为"驾驶舱大脑"，直接决定：
- 代码质量（B-02）
- 一次能塞多少上下文（B-04）
- 月度账单（B-05）
- 国内能否直连（B-07）

**默认推荐**：海外用户用 Claude Sonnet 系 + Cursor / Claude Code；国内用户用 GLM / Kimi / DeepSeek 接入 Claude Code（详见 B-07）。

## 典型场景 / 示例

### 海外四强对比（核实窗口 2026-06）

| 厂商 | 当前主力线 | 核心优势 | 起步价位（输入/输出 USD per 1M token，约值） |
|---|---|---|---|
| **OpenAI** | GPT-5 系列（含 mini / nano） + o 系列推理模型 + GPT-4.1 | 生态最大、API 文档最成熟、推理模型领先 | ⚠️ 准确单价请查 https://platform.openai.com/docs/pricing |
| **Anthropic** | Claude Opus / Sonnet / Haiku 各最新版 | 编程能力顶级、长文写作稳定、prompt caching 省钱 | ⚠️ 准确单价请查 https://claude.com/pricing |
| **Google** | Gemini 2.5 Pro / Flash / Flash-Lite，以及更新的 3.x 系列 | 1M token 上下文、原生多模态（音视频图）、Google 全家桶集成 | ⚠️ 准确单价请查 https://ai.google.dev/gemini-api/docs/pricing |
| **xAI** | grok-4 系列（推理 / 非推理 / 多 agent / 编程预览版） | 自带 X / 实时信息接入 | ⚠️ 准确单价请查 https://x.ai/api |

> 上表只列出"当前主力线"。具体版本号（如 GPT-5.x、Claude X.Y、Gemini 3.x）每月可能微调，**请始终用各家 pricing 页的当前列表为准**。

### 国产七强对比（核实窗口 2026-06）

| 厂商 | 主力闭源 / 代表型号 | 主力开源 | 单价亮点（¥/百万 token） | 国内 API 控制台 |
|---|---|---|---|---|
| **DeepSeek（深度求索）** | DeepSeek-V4-Pro / V4-Flash | V3.x / R1 系列开源（HF: deepseek-ai） | V4-Flash 缓存命中输入 **¥0.02**，输出 **¥2**；V4-Pro 缓存命中输入 **¥0.025**，输出 **¥6** | https://platform.deepseek.com |
| **通义千问 Qwen（阿里）** | qwen3.7-max / qwen3.7-plus / qwen3-coder-plus | 全套开源到 HF: Qwen | qwen-flash 阶梯价 **¥0.15~1.2 / 1.5~12**；coder-plus **¥4~20 / 16~200** | https://bailian.console.aliyun.com |
| **智谱 GLM** | GLM-5.2 / GLM-4.6 / GLM-4.5-Air | 开源到 HF: zai-org（原 THUDM） | ⚠️ 准确单价请查 https://bigmodel.cn/pricing | https://bigmodel.cn |
| **Kimi（月之暗面）** | kimi-k2.7-code / k2.6 | 部分版本开源到 HF: moonshotai | k2.7-code：输入缓存命中 **¥1.30** / 未命中 **¥6.50**，输出 **¥27** | https://platform.kimi.com |
| **豆包 Doubao（字节）** | doubao-seed 1.6 / doubao-1.5-pro 256k | 部分版本 | **Seed-1.6** 阶梯：0-32K **¥0.8 / 8**；32-128K **¥1.2 / 16**；128-256K **¥2.4 / 24** | https://console.volcengine.com/ark |
| **腾讯混元 Hunyuan** | hunyuan-turbos / hunyuan-a13b / 视觉系 | 部分开源 | a13b：输入 **¥0.5** / 输出 **¥2**；**turbos：输入 ¥0.8 / 输出 ¥2**；turbos-vision **¥3 / 9** | https://console.cloud.tencent.com/hunyuan |
| **MiniMax** | MiniMax-M3 / M2.7 系列 | 部分版本开源到 HF: MiniMaxAI | M3：≤512K **¥2.10 / 8.40**；>512K **¥4.20 / 16.80** | https://platform.minimaxi.com |

> 所有国产价格**查询日期：2026-06-23**，数据来源时间：各家定价页 2026-06 时点。**智谱 GLM 全系单价**（GLM-5.2 / 4.6 / 4.5-Air / 4.5-Flash）官网定价页为 JS 动态渲染，未抓到——⚠️ **请访问 https://bigmodel.cn/pricing 实时查看**。GLM-4.5-Flash 在 model-overview 中标"即将下线/免费"。

## 常见误区
- ❌ **"问哪个模型最强"**：没有标准答案。Aider Polyglot（编程）排名前 5 几乎全是 GPT 系；CMMLU（中文）前 10 几乎全是国产；NoLiMa（长上下文真实推理）GPT-4.1 一枝独秀；Vectara 幻觉率第一是国产 finix_s1_32b。**任务决定模型，不是榜单决定模型**。
- ❌ **"开源模型不能商用"**：DeepSeek、Qwen、GLM、Kimi 的主流开源版本都允许商用（具体看 license 页），独立开发者完全可以自部署省 API 费。
- ❌ **"国产模型只能国内用、海外模型只能海外用"**：DeepSeek / Qwen / GLM 都有海外节点；GPT/Claude/Gemini 也可以通过 OpenRouter、Anthropic 中国合作伙伴等接入。
- ❌ **"小公司用不起 Claude / GPT"**：用 mini / Haiku / Flash 这类小尺寸模型 + prompt caching + batch API，月费往往 < $20 就能撑住独立开发者级别用量。

## 延伸阅读
- [OpenAI 模型列表与定价](https://platform.openai.com/docs/pricing) `[英 · ⭐ · 免费 · 持续更新]`
- [Claude 定价页](https://claude.com/pricing) `[英 · ⭐ · 免费 · 持续更新]`
- [Gemini API 定价](https://ai.google.dev/gemini-api/docs/pricing) `[英 · ⭐ · 免费 · 持续更新]`
- [Artificial Analysis 聚合榜单](https://artificialanalysis.ai/leaderboards/models) `[英 · ⭐⭐ · 免费 · 持续更新]` 看综合能力指数 + 速度 + 价格三维对比
- [OpenRouter 模型市场](https://openrouter.ai/) `[英 · ⭐ · 免费查 / 用量收费 · 持续更新]` 一个 key 调几百个模型，方便横向试

## 去问 AI
> 「我是独立开发者，主要做面向中文用户的 SaaS，每月 AI API 预算 ≤¥200。请根据我的情况，对比 DeepSeek V4-Flash、智谱 GLM-4.5-Air、Kimi K2.7、阿里 qwen-flash 这四款，告诉我应该选哪一个，并解释理由。」

---
**来源**：① 各厂官方 pricing 页（已在表中标注 URL） ② Artificial Analysis 模型详情页 ③ HuggingFace 各厂组织主页
**查询日期**：2026-06-23 · **数据来源时间**：2026-06（豆包/混元部分定价为 2026-Q2 估值，⚠️ 待核实）
