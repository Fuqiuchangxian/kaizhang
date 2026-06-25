---
group: C-vibe-coding-tools
card_id: C-07
title: Windsurf（已更名 Devin Desktop · Cognition 旗下）
difficulty: ⭐⭐
last_updated: 2026-06-23
status: 已核实（重大归属变化）
related: [B-02, C-决策树, C-01]
---

# C-07 Windsurf → Devin Desktop

## ⚠️ 重要更新（2025-2026 归属变化）

**Windsurf 这个名字在 2026-06 已基本下线，产品并入 Cognition 体系并更名 Devin Desktop**：

```
原 Codeium / Windsurf 团队
    ↓
2025-07 OpenAI $3B 收购案到期未成交
    ↓
2025-07-11 Google 以 $2.4B 反向收购核心团队（CEO Varun Mohan、联合创始人 Douglas Chen 等）
    ↓
2025-07-14 Cognition（Devin AI 的公司）收购 Windsurf 剩余 IP + 团队
    ↓
2026-06：windsurf.com 自动 301 → devin.ai/desktop，产品更名 Devin Desktop
```

> 来源：TechCrunch《Cognition, maker of the AI coding agent Devin, acquires Windsurf》(2025-07-14) https://techcrunch.com/2025/07/14/cognition-maker-of-the-ai-coding-agent-devin-acquires-windsurf/

## 一句话定义
Devin Desktop（原 Windsurf）= Cognition 旗下的"Agent Command Center"——本地 IDE 与云端 Devin 协作。本地是改代码的"驾驶舱"，云端是会跑长任务的"Agent 大军"。

## 打个比方
**像把 Cursor 和 Devin（Agent 服务）连成一体**：你打开桌面 IDE 干普通活儿，遇到"我要重构整个 auth 模块" 这种重活就一键扔给云端 Devin Cloud / Devin Local 等 Agent 集群，它在云端跑完把结果推回你的本地分支。

## 和 vibe coding 的关系
- 在 Cursor / Claude Code 之外提供的另一条"高端 Agent" 路线
- **特别适合做长任务（数小时到数天）的并发处理**
- 但对 vibe coding 新手来说，**有 Cursor 就够了**——Devin Desktop 是 Pro 玩家工具

## 典型场景 / 示例

### 关键事实（核实窗口 2026-06）

| 字段 | 内容 |
|---|---|
| 产品形态 | 独立 IDE（Mac 下载）+ JetBrains 插件 + Devin Cloud |
| 公司 | Cognition |
| 官方网站 | https://devin.ai/desktop（windsurf.com 已 301 跳转） |

### 定价（USD，**查询日期：2026-06-23**）

| 档位 | 月费 |
|---|---|
| **Free** | $0 |
| **Pro** | $20/月（标 Popular） |
| **Max** | $200/月（标 NEW） |
| **Teams** | $80/月 + $40/月每席 |
| **Enterprise** | 联系销售 |

### 支持的模型
- **默认 SWE-1.6**（Cognition 自研，免费无限用）
- 通过 ACP（Agent Communication Protocol）接入：**Devin Cloud / Devin Local / Codex / Claude Agent / OpenCode / Cascade**

### 国内能否直接用
- 网站可访问、Mac 客户端可下载
- **Devin Cloud / Claude 后端需国际网络**
- 纯本地用 SWE-1.6 也需要联网激活

### 适合的场景
- 同时管多个长任务、需要"放手 24h 跑"的资深开发者
- 已在使用 Devin 云端服务的团队
- Mac 用户（IDE 主推 Mac，其他平台支持待核）

### 不太适合
- 国内独立开发者（推荐 Cursor 或 Trae）
- 新手 / 学生（学习曲线陡）
- 短任务为主的使用模式

## 常见误区
- ❌ **"Windsurf 还在独立运营"**：错。**已并入 Cognition 体系并更名 Devin Desktop**。继续叫 Windsurf 是讲历史。
- ❌ **"Windsurf 被 OpenAI 收购了"**：传闻为真，**但最终未成交**。最终归属是 Cognition。
- ❌ **"和 Devin Web 是一回事"**：不一样。Devin Web 是纯云端 Agent；Devin Desktop 是本地 IDE 入口。两者可以协作。
- ❌ **"SWE-1.6 比 Claude/GPT 强"**：Cognition 自家模型在自家榜单上强，第三方榜单上仍有差距。生产建议混用。

## 延伸阅读
- [Devin Desktop 官方页](https://devin.ai/desktop) `[英 · ⭐⭐ · 免费 · 持续更新]`
- [Devin AI 官方页](https://devin.ai) `[英 · ⭐⭐ · 免费 · 持续更新]`
- [TechCrunch 报道：Cognition 收购 Windsurf](https://techcrunch.com/2025/07/14/cognition-maker-of-the-ai-coding-agent-devin-acquires-windsurf/) `[英 · ⭐⭐ · 免费 · 2025-07]` 收购全过程
- C-01 Cursor（更主流的替代）

## 去问 AI
> 「我是一名独立开发者，过去用 Windsurf 写代码。听说它已经变成 Devin Desktop 了。请用对比表的方式告诉我：作为 Windsurf 老用户，现在迁到 (A) Devin Desktop / (B) Cursor / (C) Claude Code 各自的利弊是什么？我应该怎么选？」

---
**来源**：① https://devin.ai/desktop  ② TechCrunch 收购报道 (2025-07-14)
**查询日期**：2026-06-23 · **数据来源时间**：2025-07（收购）/ 2026-06（产品状态）
