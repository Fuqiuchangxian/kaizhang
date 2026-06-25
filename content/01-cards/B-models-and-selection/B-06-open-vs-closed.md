---
group: B-models-and-selection
card_id: B-06
title: 闭源 vs 开源模型，各自适合什么人
difficulty: ⭐⭐
last_updated: 2026-06-23
status: 已核实
related: [B-01, B-05, B-07]
---

# B-06 闭源 vs 开源模型，各自适合什么人

## 一句话定义
**闭源** = 调 API 用别人家的模型（GPT、Claude、Gemini、Grok 等）；**开源** = 把模型权重下载下来自己跑（或用第三方托管），代表是 DeepSeek、Qwen、GLM、Llama、Mistral、Kimi K 系等。

## 打个比方
**像云厨房 vs 自家厨房**：
- **闭源 = 点外卖**：菜单菜品都是别人定的，你点了就能吃，量越大越贵。简单、省心、菜品最新。
- **开源 = 自己做饭**：菜谱（权重）免费下载，但你得有厨房（GPU）、买菜（电费/带宽）、自己掌勺（运维）。一次性投入大，长期划算，能完全控制配方（微调）。

**还有第三种**：开源模型由别人托管（云厨房卖你"模仿大厨做的菜"），如 OpenRouter / Together / Fireworks / Groq / SiliconFlow / 阿里百炼上调用 Qwen-Coder。这种**结合了开源的低价 + 闭源的省心**，是独立开发者最常见的选择。

## 和 vibe coding 的关系
对独立开发者：
- **试错阶段**：闭源 API，按用量付费，月费 $0-$50
- **产品成熟、用量稳定**：考虑用开源模型 + 第三方推理平台（DeepSeek 官方 / 阿里百炼 / OpenRouter / Groq）降成本
- **需要私有部署 / 数据不能外发**：开源模型自部署
- **需要微调适应特定行业** → 开源模型

## 典型场景 / 示例

### 主流开源模型（2026-06 主流可下载权重）

| 系列 | 代表型号 | 参数量 | License | 下载地址 |
|---|---|---|---|---|
| **DeepSeek** | V3、V3.1、V3.2、R1 等 | 67B-671B（含 MoE） | MIT（基本商用友好） | https://huggingface.co/deepseek-ai |
| **Qwen（通义千问）** | Qwen3 / 3.5 / 3.6 / 3.7 全系 | 0.6B-480B | Apache 2.0（多数） | https://huggingface.co/Qwen |
| **GLM（智谱）** | GLM 系列 | 9B-355B | 商用许可 | https://huggingface.co/zai-org |
| **Kimi** | K2 部分版本 | 大尺寸 | 部分开源 | https://huggingface.co/moonshotai |
| **Llama（Meta）** | Llama 3.x / 4.x | 1B-405B+ | Llama 自定义 license | https://huggingface.co/meta-llama |
| **Mistral** | Mistral / Mixtral / Codestral | 7B-141B+ | Apache 2.0 / 部分付费 | https://huggingface.co/mistralai |
| **Phi（微软）** | Phi-4 等 | 3.8B-14B | MIT | https://huggingface.co/microsoft |
| **Gemma（Google）** | Gemma 2 / 3 | 2B-27B | Gemma license | https://huggingface.co/google |

> 具体型号清单 2026-06 时点请以 HuggingFace 各组织页为准。**查询日期：2026-06-23**

### 主流闭源模型（API only）

| 厂商 | 主力线 |
|---|---|
| OpenAI | GPT-5 系列 / o 系列 / GPT-4.1 |
| Anthropic | Claude Opus / Sonnet / Haiku 当前版 |
| Google | Gemini Pro / Flash 当前版（部分有开源 Gemma 子线） |
| xAI | grok-4 系列 |
| 中国闭源 | 豆包 / 混元（仅 API）、Qwen-Max / Plus / Turbo 闭源版（同系开源版另列） |

## 选型决策表

| 你的情况 | 推荐 |
|---|---|
| 刚开始 vibe coding，月预算 ≤$50 | **闭源 API**（GPT-5 mini / Claude Sonnet / DeepSeek V4-Flash） |
| 月用量稳定，账单 >$500 | **开源模型 + 第三方托管**（DeepSeek 官方、阿里百炼、Groq、Together） |
| 数据敏感（医疗、金融、内部知识）必须不外发 | **开源模型 + 自部署**（Qwen / DeepSeek / Llama） |
| 行业特定术语 / 风格强（法律、医学、特定语言） | **开源模型 + 微调** |
| 只想做 demo / MVP | **闭源 API**，别浪费时间在部署上 |
| 一年烧 10 万美元 API 钱 | 算一下 ROI，可能自部署划算 |
| 写代码场景 | **闭源 Claude / GPT 仍然领先**；国产开源 Qwen3-Coder / DeepSeek-Coder 急速追赶 |
| 长上下文 + 多模态 | **闭源 Gemini Pro** 当前最强；开源差距还存在 |

## 开源模型主流"托管 + 推理"平台

| 平台 | 特点 | URL |
|---|---|---|
| **DeepSeek 官方** | 自家模型最便宜（缓存 ¥0.02 / 1M 输入） | https://platform.deepseek.com |
| **阿里云百炼** | Qwen 系列 + 第三方开源 | https://bailian.console.aliyun.com |
| **SiliconFlow / 硅基流动** | 国内开源模型最齐 | https://siliconflow.cn |
| **OpenRouter** | 一个 key 通用 400+ 模型 | https://openrouter.ai |
| **Together AI** | 海外平台，Qwen/Llama/Mixtral 性价比高 | https://together.ai |
| **Groq** | LPU 推理超快（响应快 5-10×） | https://groq.com |
| **Fireworks AI** | 海外性价比 + 微调托管 | https://fireworks.ai |

## 常见误区
- ❌ **"开源就是免费"**：权重免费，**算力不免费**。自部署 1 个 70B 模型推理服务，月成本 $200-$2000 起步（看显卡）。
- ❌ **"开源 = 落后闭源 N 年"**：在编程、数学、中文等多个领域，**最强开源模型与最强闭源模型差距已缩到几个月**（参考 Aider Polyglot 的 DeepSeek-V3.2-Exp Top 10 表现）。
- ❌ **"开源能随便商用"**：Llama 系有自家 license（要求挂署名、用户量超阈值要授权）；Gemma 有使用条款；少数 Qwen / DeepSeek 版本对超大公司有特殊条款。**用之前看 LICENSE**。
- ❌ **"自部署比 API 一定贵"**：日活到一定规模、且推理需求高峰可预测时，自部署反而便宜。但对独立开发者（DAU < 1 万）几乎一定是 API 更划算。

## 延伸阅读
- [HuggingFace Open LLM Leaderboard](https://huggingface.co/spaces/HuggingFaceH4/open_llm_leaderboard) `[英 · ⭐⭐ · 免费 · 持续更新]` 开源模型综合榜
- [Artificial Analysis](https://artificialanalysis.ai/leaderboards/models) `[英 · ⭐⭐ · 免费 · 持续更新]` 开源 + 闭源同台比，含价格 + 速度
- [DeepSeek HuggingFace 组织页](https://huggingface.co/deepseek-ai) `[英 · ⭐ · 免费 · 持续更新]`
- [Qwen HuggingFace 组织页](https://huggingface.co/Qwen) `[英 · ⭐ · 免费 · 持续更新]`
- [SiliconFlow（国内开源模型推理）](https://siliconflow.cn) `[中 · ⭐ · 有免费额度 · 持续更新]`
- [OpenRouter](https://openrouter.ai) `[英 · ⭐ · 按用量 · 持续更新]`

## 去问 AI
> 「我打算做一个对中文用户的 AI 写作助手，DAU 预估 1000 人，每天每人 5 次调用、平均输入 3K 输出 1K token。请你帮我比较：(A) 用 OpenAI GPT-5 mini；(B) 用阿里百炼 qwen-flash；(C) 在 SiliconFlow 调 Qwen3-Coder 开源版。哪一个月度成本最低？哪一个对中文写作质量最好？」

---
**来源**：① HuggingFace 各厂组织页  ② DeepSeek / 阿里 / SiliconFlow / Groq 官方  ③ Artificial Analysis
**查询日期**：2026-06-23 · **数据来源时间**：2026-06
