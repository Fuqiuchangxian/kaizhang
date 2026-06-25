---
group: B-models-and-selection
card_id: B-08
title: 任务 → 推荐模型 速查表
difficulty: ⭐
last_updated: 2026-06-23
status: 已核实（基于 B-01~B-07 的核实数据归纳）
related: [B-01, B-02, B-03, B-05, B-07]
---

# B-08 「任务 → 推荐模型」速查表

> 这是 B 组的总速查。具体理由展开在 B-01~B-07。
> **任何"推荐"都是"基于 2026-06 时点 X 榜单 / 社区口碑的当下选择"**，不是绝对结论。
> **查询日期：2026-06-23**

---

## 速查表（按 vibe coder 日常任务分类）

| 任务类型 | 第一推荐 | 性价比备选 | 国内可直连/便宜替代 | 主要依据 |
|---|---|---|---|---|
| **写新功能 / 加组件（日常 80% 任务）** | Claude Sonnet 当前版 | GPT-5 (medium) | Kimi K2.7 Code、DeepSeek V4-Pro、Qwen3-Coder-Plus | 社区口碑 + Aider Polyglot 2025-11 |
| **复杂算法 / 重构 / 架构设计** | GPT-5 (high) 或 Claude Opus 当前版 | Claude Sonnet | GLM-5.2、Kimi K2.7、DeepSeek V4-Pro | Aider 2025-11 前 3 |
| **改 bug / 看报错 / 解释代码** | Claude Sonnet | GPT-5 mini、Claude Haiku | DeepSeek V4-Flash（缓存 ¥0.02/1M 输入） | 性价比 |
| **生成前端 UI（React/Tailwind）** | Claude Sonnet 当前版 | v0.dev / Lovable 内置 | GLM-5.2 | 社区共识 |
| **极长文档总结（>200K token）** | Gemini 2.5/3.x Pro（1M） | GPT-4.1（1M） | Qwen3.7-Max（1M）、Kimi K2.7（256K） | RULER 长上下文 |
| **极长文档"真推理"（引用、跨段关联）** | GPT-4.1 | Claude Opus 当前版 | Qwen3.7-Max | NoLiMa 实测 |
| **数学 / 复杂逻辑推理** | OpenAI o 系列 / GPT-5 (high) | Claude Opus + thinking | DeepSeek-R 系、GLM-5.2 推理模式、Qwen Plus 思考模式 | AIME / GPQA 历史 |
| **中文文案 / 营销 / 小红书** | Kimi / DeepSeek / Qwen 任一 | GLM-4.6 | 全国产任意 | CMMLU 国产占优 |
| **中文客服 / 高频对话** | DeepSeek V4-Flash | qwen-flash | GLM-4.5-Air | 极致性价比 |
| **多模态（图、视频、音频理解）** | Gemini 系列 | Claude（视觉）、GPT-5 | Qwen-VL、豆包视觉 | 多模态原生设计 |
| **代码自部署 / 数据敏感** | 开源 DeepSeek V3.x | 开源 Qwen3-Coder | 同左 | 开源 + 可商用 |
| **极致便宜的批量打标 / 数据清洗** | GPT-5 nano | Gemini Flash-Lite | DeepSeek V4-Flash 缓存命中 | <$0.20 / 1M 输入 |
| **接 Claude Code 当主力 IDE 后端** | Anthropic 官方 Sonnet | — | Kimi K2.7 Code、GLM-5.2、DeepSeek V4-Pro、MiniMax-M3 | B-07 Anthropic 协议四家 |
| **图像生成（非 LLM）** | GPT-image / DALL-E、Gemini Imagen、Flux、Midjourney | Stable Diffusion 自部署 | 通义万相、智谱 CogView、豆包图像 | 视觉模型范畴另列 |

---

## 三个"如果你只能记三条"的经验法则

### 法则 1：先匹配难度，再讲价格
- 把任务粗分**简单 / 中等 / 复杂**
- 70% 是简单 → 用 mini / Flash / Haiku
- 25% 是中等 → 用 Sonnet / GPT-5 medium / Pro
- 5% 是复杂 → 用 Opus / GPT-5 high / 思考模式

这一招省下来的钱远远多于在"选哪家"上抠数字（见 B-05）。

### 法则 2：海外 / 国内分两套
- 海外用户、付海外信用卡 OK → Claude 系 / GPT 系打底
- 国内用户、要快稳便宜 → DeepSeek / GLM / Kimi / Qwen 打底
- 两边都跑 → OpenRouter（一个 key 全包揽）

### 法则 3：选 Claude Code/Cursor 时，"驾驶舱"先于"模型"
- 先按 C-决策树挑出最适合你的 IDE（C 组）
- 再到 B 组挑该 IDE 默认配哪个模型最爽
- 模型可以随时换，IDE 不太可能频繁换

---

## 推荐组合（"vibe coder 经典套餐"）

### 套餐 1：海外开发者，月预算 $30
- Cursor Pro $20/mo
- 默认模型：Claude Sonnet 当前版（Cursor Pro 含额度）
- 难题切：Claude Opus（按需付费）
- 简单事切：自动路由到 Haiku
- API 直接调用（备用）：DeepSeek V4-Flash $5 自带余额

### 套餐 2：国内独立开发者，月预算 ¥150
- Claude Code（免费 CLI）+ 接 Kimi K2.7 Code（按用量约 ¥80）
- 备用模型：DeepSeek V4-Pro / V4-Flash（¥50）
- 多模态需求：阿里百炼 qwen-vl（¥20）

### 套餐 3：完全开源 / 数据敏感
- IDE：Cursor（关闭隐私模式 + 自定义 OpenAI 兼容端点）
- 模型：本地部署 Qwen3-Coder-30B 或调 SiliconFlow / Together 上的开源模型
- 备用：DeepSeek V3.x 开源版（可商用 MIT）

---

## 常见误区
- ❌ **"找到一个模型用一辈子"**：模型生态变化快，每 3-6 个月看一次 Aider / SWE-bench / SuperCLUE 榜，重新评估你的默认。
- ❌ **"贵 = 强"**：本表里大量场景"性价比备选"完成质量与第一推荐几乎打平。
- ❌ **"国产 = 落后"**：编程榜国产正在追赶（DeepSeek-V3.2-Exp 进 Aider Top 10）；中文榜国产长期占优。具体看任务。
- ❌ **"用最新版本一定最好"**：新版本可能有未发现的回归。**生产环境锁定版本号**，新版本先在小流量验证再切。

## 延伸阅读
- B-01 主流大模型全景图（横向对比）
- B-02 编程模型选型（榜单细分）
- B-03 长文档 / 推理 / 中文 / 性价比（其它四大类）
- B-05 省钱六招
- B-07 国产模型接入

## 去问 AI
> 「我刚做完一个面向中文知识工作者的 AI 笔记产品，DAU 500、平均每人每天 8 次问答（输入 4K / 输出 1K）。请基于本卡的速查表，给我推荐一个'模型路由方案'：常规问答用什么？复杂归纳用什么？月成本预估？」

---
**来源**：B-01 ~ B-07 各卡片汇总
**查询日期**：2026-06-23
