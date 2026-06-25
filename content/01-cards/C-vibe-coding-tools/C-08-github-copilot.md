---
group: C-vibe-coding-tools
card_id: C-08
title: GitHub Copilot
difficulty: ⭐
last_updated: 2026-06-23
status: 已核实
related: [B-02, C-决策树, C-01]
---

# C-08 GitHub Copilot

## 一句话定义
GitHub Copilot 是 GitHub 官方的 AI 编程助手，**覆盖 IDE 最广**（VS Code / Visual Studio / JetBrains / Xcode / Eclipse / Neovim / Zed / Raycast 等）、**支持模型最全**（OpenAI / Anthropic / Google 三家旗舰同台），并已发展出网页 Agent、Mobile、CLI、Cloud Agent 一整套体系。

## 打个比方
**像 GitHub 自带的"通用驾驶舱适配器"**：它不是新建一个 IDE（像 Cursor 那样），而是让**你正在用的任何 IDE** 都长出 AI 能力。已经用 VS Code / JetBrains / Visual Studio 的人零迁移成本。

## 和 vibe coding 的关系
- **已经用 GitHub 的人**：直接开 Copilot 订阅，少装一个 IDE
- **公司付费、团队管理**：GitHub Enterprise 体系最完善
- **想同时用 Claude + GPT + Gemini** 一站式：Copilot 是为数不多的"模型多家齐全"代表
- 局限：**Agent 深度上不如 Cursor / Claude Code**，更偏"AI 补全 / 编辑 + 轻 Agent"

## 典型场景 / 示例

### 关键事实（核实窗口 2026-06）

| 字段 | 内容 |
|---|---|
| 产品形态 | VS Code / Visual Studio / JetBrains / Xcode / Eclipse / Neovim / Zed / Raycast / SSMS **插件** + github.com 网页 + GitHub Mobile + Copilot CLI + Cloud Agent |
| 公司 | GitHub（微软） |
| 官方网站 | https://github.com/features/copilot |
| 定价页 | https://github.com/features/copilot/plans |
| 计费机制 | "GitHub AI Credits"（1 credit = $0.01） |

### 定价（USD，**查询日期：2026-06-23**）

| 档位 | 月费 | 额度 / 含义 |
|---|---|---|
| **Free** | $0 | 2,000 completions/月 |
| **Pro** | $10/用户/月 | 无限补全 + $15 credits（$10 base + $5 flex）+ 第三方 Agent 预览 |
| **Pro+** | $39/用户/月 | 含 Opus + 4×+ Pro 用量 + $70 credits + GitHub Spark Preview |
| **Max** | $100/用户/月 | $200 credits + 2.9×+ Pro+ 用量 |
| **Business / Enterprise** | 联系销售 | — |

### 支持的模型（核实窗口 2026-06）
- **Anthropic**：Claude Haiku / Sonnet / Opus 各最新版
- **OpenAI**：GPT-5 系列 + Codex 系列
- **Google**：Gemini Pro / Flash 各最新版
- 自家 Raptor mini

> 具体型号版本号变化频繁，**查询日期：2026-06-23**。请以 plans 页为准。

### 国内能否直接用
- github.com 国内**商业网络通常可用**，部分时段不稳
- 模型走 Copilot 后端、**不用自己买各厂家 key**
- 是国内能稳定用海外 AI 编程能力的少数选项之一

### 2025-2026 关键更新
- 统一 **GitHub AI Credits** 计费（1 credit = $0.01）
- 推出 **Max 档**（重 Agent 工作流）
- **第三方 Agent**（Claude Code Agent、Codex）进入 Pro+ / Max
- 2026-04-24 训练数据政策调整：Free/Pro/Pro+ 默认参训，可 opt out
- 2026-06-01 起代码审查工作流开始消耗 GitHub Actions 分钟
- Zed 通过 ACP 协议成为新支持编辑器

### 适合的场景
- 已在用 VS Code / JetBrains / Visual Studio 不想换 IDE
- 公司统一采购，需要审计、合规、权限管理
- 想"一个订阅，覆盖所有 IDE + 多家模型"
- 偏 AI 补全 / chat 协助，不重 Agent

### 不太适合
- 想要"AI 自动跨多文件改 + 自动 PR" 这种深度 Agent（推荐 Cursor / Claude Code）
- 追求极致性价比的独立开发者（Cursor Pro / Trae Pro 性价比更高）

## 常见误区
- ❌ **"Copilot = 只能在 VS Code 用"**：已覆盖 8+ 编辑器，几乎所有主流 IDE。
- ❌ **"Copilot 只能写代码补全"**：现已含 chat、Agent、PR review、Cloud Agent，能力线扩得很宽。
- ❌ **"Free 档够小项目用"**：2,000 补全约一周用完。重度建议 Pro 起步。
- ❌ **"Copilot 的代码可以无版权用"**：免费档默认参与训练，不放心的话要去 opt out；企业版默认不参训。

## 延伸阅读
- [GitHub Copilot 官方页](https://github.com/features/copilot) `[英 · ⭐ · 免费 · 持续更新]`
- [Copilot Plans](https://github.com/features/copilot/plans) `[英 · ⭐ · 免费 · 持续更新]`
- [Copilot 官方文档](https://docs.github.com/en/copilot) `[英 · ⭐⭐ · 免费 · 持续更新]`
- [Copilot 中文文档](https://docs.github.com/zh/copilot) `[中 · ⭐⭐ · 免费 · 持续更新]`
- C-01 Cursor（更专业向的 IDE 替代）

## 去问 AI
> 「我已经付费用 GitHub Copilot Pro 一年了，但听说 Cursor 体验更好。请帮我用三段话决策：(1) 我什么时候继续用 Copilot 就够？(2) 什么场景下应该切到 Cursor？(3) 两个同时订阅值不值？」

---
**来源**：① https://github.com/features/copilot/plans  ② https://docs.github.com/en/copilot
**查询日期**：2026-06-23 · **数据来源时间**：2026-06
