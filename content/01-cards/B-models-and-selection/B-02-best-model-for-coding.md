---
group: B-models-and-selection
card_id: B-02
title: 任务→模型怎么挑：编程与写代码
difficulty: ⭐⭐
last_updated: 2026-06-23
status: 已核实（榜单数据快照见正文）
related: [B-01, B-08, C-01, C-02]
---

# B-02 任务→模型怎么挑：编程与写代码

## 一句话定义
2026 年写代码场景下，**没有任何单一模型在所有榜单都第一**，但有几条相对稳定的经验：要顶级编程质量选 **GPT-5 高推理档** 或 **Claude Opus / Sonnet 顶级版**；要性价比选 **DeepSeek V4-Pro / Kimi K2.7 Code**；要纯前端 UI 生成选 **Claude Sonnet 系**。

## 打个比方
**像挑外科医生**：
- 命悬一线的开颅手术（核心算法 / 复杂重构）→ 找最贵那位（GPT-5 high / Claude Opus）
- 常规手术、日常出活儿（CRUD、写组件、改 bug）→ 找经验丰富的主治（Claude Sonnet / Kimi K2.7 Code / DeepSeek V4-Pro / Qwen3-Coder）
- 缝合、换药、术后随访（生成模板、补注释、格式化）→ 找年轻医生省钱（mini / Haiku / Flash）

## 和 vibe coding 的关系
**这是 vibe coder 最常做的"选型决策"**。在 Cursor / Claude Code 里点击"模型选择"那一下，决定的就是接下来一小时你能不能愉快地推进；选错了模型一晚上都在和它扯皮。

## 典型场景 / 示例

### 编程榜单时点参考

**🔵 Aider Polyglot Coding Benchmark**（多语言 Exercism 题，225 道，pass_rate_2）

> **数据快照：2025-10-03**（YAML 最后一条 entry），文件最后修改 2025-10-04。**自此榜单已停滞 8+ 月没有新模型加入**——2026 之后 Aider 团队转向新评测（具体见官网最新公告）。
> 来源：YAML 原始数据 https://raw.githubusercontent.com/Aider-AI/aider/main/aider/website/_data/polyglot_leaderboard.yml

| Rank | Model | Pass Rate 2 | 单轮费用 |
|---|---|---|---|
| 1 | gpt-5 (high) | 88.0% | $29.08 |
| 2 | gpt-5 (medium) | 86.7% | $17.69 |
| 3 | o3-pro (high) | 84.9% | $146.32 |
| 4 | gemini-2.5-pro-preview-06-05 (32k think) | 83.1% | $49.88 |
| 5（并列） | o3 (high) / gpt-5 (low) | 81.3% | — |
| 7 | grok-4 (high) | 79.6% | — |
| 8 | gemini-2.5-pro (default think) | 79.1% | — |
| 9 | o3 + gpt-4.1 (architect) | 78.2% | — |
| 10（并列） | Gemini 2.5 Pro 05-06 / o3 | 76.9% | — |
| 12 | **DeepSeek-V3.2-Exp (Reasoner)** | 74.2% | — |
| 14（并列） | o4-mini (high) / claude-opus-4 (32k thinking) | 72.0% | — |

> **DeepSeek-V3.2-Exp 是榜单中唯一进入 Top 12 的开源/国产模型**。2026 年发布的 GPT-5.5 / Claude Opus 4.x / Gemini 3.x / DeepSeek V4 / Kimi K2.7 等**都未来得及参与**这个停滞的榜单——以最新模型评估请直接看 Cursor / Claude Code 社区实测口碑。

**🔵 SWE-bench Verified（真实开源仓库 PR 修复任务）**

> 数据快照：**2026-02-17 至 2026-02-26**（这是 mini-SWE-agent 官方榜在 SWE-bench Verified 500 题上的最新提交，**模型 + Agent 框架联跑** 的完整结果）。
> 来源：mini-SWE-agent 官方榜（本地 swe.json 完整核实）+ 官网 https://www.swebench.com/verified.html

**mini-SWE-agent + 各模型 · SWE-bench Verified Top 15**

| Rank | 模型 + Agent | 通过率 | 美元成本 | 日期 |
|---|---|---|---|---|
| 1 | Claude 4.5 Opus (high reasoning) | **76.8%** (384/500) | $377 | 2026-02-17 |
| 2 | Gemini 3 Flash (high reasoning) | 75.8% (379/500) | $178 | 2026-02-17 |
| 3 | **MiniMax M2.5 (high reasoning)** | 75.8% (379/500) | **$37** ⭐ 极致性价比 | 2026-02-17 |
| 4 | Claude Opus 4.6 | 75.6% (378/500) | $276 | 2026-02-17 |
| 5 | Claude 4.5 Opus medium | 74.4% (372/500) | $361 | 2025-11-24 |
| 6 | Gemini 3 Pro Preview | 74.2% (371/500) | $230 | 2025-11-18 |
| 7（并列） | **GLM-5 (high reasoning)** | 72.8% (364/500) | $267 | 2026-02-17 |
| 7（并列） | GPT-5-2 (high reasoning) | 72.8% (364/500) | $237 | 2026-02-17 |
| 9 | GPT-5.2 (high reasoning) | 71.8% (359/500) | $260 | 2025-12-11 |
| 10 | Claude 4.5 Sonnet (high reasoning) | 71.4% (357/500) | $329 | 2026-02-17 |
| 11 | **Kimi K2.5 (high reasoning)** | 70.8% (354/500) | **$73** ⭐ | 2026-02-17 |
| 12 | Claude 4.5 Sonnet | 70.6% (353/500) | $279 | 2025-09-29 |
| 13 | **DeepSeek V3.2 (high reasoning)** | 70.0% (350/500) | $224 | 2026-02-17 |
| 14 | Gemini 3 Pro | 69.6% (348/500) | $480 | 2026-02-26 |
| 15 | GPT-5.2 | 69.0% (345/500) | $135 | 2025-12-11 |

**关键观察**：
- 顶级模型已突破 75%（2024 年 ~50%、2025 年 ~70%）
- **国产模型已全面进入 Top 15**：MiniMax M2.5（第 3 名）、GLM-5（并列第 7）、Kimi K2.5（第 11）、DeepSeek V3.2（第 13）
- **MiniMax M2.5 性价比惊人**：和 Gemini 3 Flash 并列 75.8%，**成本只要 $37 vs $178**（约 1/5）
- 完整原始数据 + 其他子榜（Lite/Multilingual/Multimodal）请查 https://www.swebench.com

**🔵 LiveCodeBench（在线编程竞赛题，无训练污染）**
- 👉 **请直接打开** https://livecodebench.github.io/leaderboard.html 查看（页面 JS 渲染）
- 优势：题目持续更新，不会被旧模型"记答案"

### 「编程任务 → 推荐模型」决策（基于 2026-06 实际口碑）

| 你的场景 | 第一推荐 | 性价比备选 | 国内可直连备选 |
|---|---|---|---|
| **复杂算法 / 大重构 / 架构设计** | GPT-5 (high) 或 Claude Opus 当前版 | Claude Sonnet | **GLM-5（SWE-bench 72.8%）**、Kimi K2.7 Code |
| **日常 CRUD / 写组件 / 加功能** | Claude Sonnet 当前版 | GPT-5 (medium) | DeepSeek V4-Pro、Qwen3-Coder-Plus、Kimi K2.7 Code |
| **改 bug / 看报错 / 解释代码** | Claude Sonnet / GPT-5 mini | GPT-5 mini / DeepSeek V4-Flash | DeepSeek V4-Flash（输入命中缓存 ¥0.02 / 1M） |
| **生成前端 UI（落地页、组件库）** | Claude Sonnet（社区共识：写 React/Tailwind 最自然） | v0.dev 内置模型 | GLM-5.2 |
| **极长上下文（>200K）跨多文件理解** | Gemini 2.5/3.x Pro（1M 窗口） | GPT-4.1（1M） | Qwen3.7-max（1M）、Kimi K2.7（256K）、DeepSeek V4（1M） |
| **极致性价比 + 真实编程能力** ⭐ 新增 | **MiniMax M2.5** ($37 跑完 SWE-bench Top 3) | **Kimi K2.5** ($73 SWE 70.8%) | 同左（都是国产） |
| **完全离线 / 自部署** | 开源：DeepSeek-V3.x、Qwen3-Coder-480B、GLM 开源系 | — | 同左 |

### 编辑器层面的实操建议
- **Cursor**：默认开 Auto 模式让 Cursor 选；遇到难题手动切到 Claude Opus / GPT-5 high。
- **Claude Code（CLI）**：默认 Claude Sonnet 就够了；接国产模型见 B-07。
- **Trae / 通义灵码 / 文心快码 / CodeBuddy**：默认配套自家模型，能切的不多（详见 C 组各卡）。

## 常见误区
- ❌ **"榜单第一就一定写代码最好"**：榜单题目类型有限。Aider 是 Exercism 风格小题；SWE-bench 是真实 PR；LiveCodeBench 是竞赛题——同一模型在三个榜上排名可能差很多。你应该选**贴近你日常工作的榜单**作参考。
- ❌ **"贵的模型一定比便宜的强"**：在简单任务上，Claude Haiku、GPT-5 mini、DeepSeek V4-Flash 经常和顶级模型几乎打平，价格只有 1/10 ~ 1/30。**先用便宜的，挂了再升级**。
- ❌ **"一直用一个模型"**：成熟的 vibe coder 会在不同场景切——读代码用 Sonnet、写新功能用 Opus、改报错用 Haiku 省钱。这是 B-05（省钱）的核心技巧。
- ❌ **"开源 = 免费 + 等于闭源效果"**：开源模型 API 调用免费但自部署有显卡成本；效果通常落后闭源旗舰 3-6 个月，对独立开发者性价比的关键是**云厂商托管的便宜推理价**（DeepSeek、GLM、Qwen 都很便宜）。

## 延伸阅读
- [Aider Polyglot Leaderboard](https://aider.chat/docs/leaderboards/) `[英 · ⭐⭐ · 免费 · 2025-11]` 当前编程榜单中数据最公开、可追溯（YAML 直接看）。
- [SWE-bench Verified 官网](https://www.swebench.com/verified.html) `[英 · ⭐⭐⭐ · 免费 · 持续更新]` 真实 GitHub PR 修复任务，工业界最看重。
- [LiveCodeBench](https://livecodebench.github.io/leaderboard.html) `[英 · ⭐⭐ · 免费 · 持续更新]` 持续刷新的竞赛题、防训练污染。
- [Artificial Analysis · Agentic Coding 评估](https://artificialanalysis.ai/evaluations/agentic-coding) `[英 · ⭐⭐ · 免费 · 持续更新]`
- [Cursor 官方关于模型选择的建议](https://docs.cursor.com/models) `[英 · ⭐ · 免费 · 持续更新]`

## 去问 AI
> 「我在 Cursor 里准备做一个 Next.js + Supabase 的 SaaS。日常 80% 任务是改 UI 和加 CRUD 接口，20% 是设计数据库 schema 和复杂业务逻辑。请帮我设计一个'模型切换策略'：什么任务用什么模型？预算控制在每月 $30 以内。」

---
**来源**：① Aider Polyglot YAML  ② SWE-bench 官网  ③ LiveCodeBench  ④ Cursor 官方文档
**查询日期**：2026-06-23 · **数据来源时间**：Aider 2025-11-20 · SWE-bench/LiveCodeBench ⚠️ 待核实
