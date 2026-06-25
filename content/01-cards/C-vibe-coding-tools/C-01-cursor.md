---
group: C-vibe-coding-tools
card_id: C-01
title: Cursor
difficulty: ⭐⭐
last_updated: 2026-06-23
status: 已核实
related: [B-02, C-决策树, D-04]
---

# C-01 Cursor

## 一句话定义
Cursor 是基于 VS Code 分叉的"AI-first IDE"，自带 AI Agent、Cloud Agents、Bugbot、Skills/Hooks 等机制，是 2025-2026 全球专业开发者使用最广泛的 AI IDE。

## 打个比方
**像装满了助手的高级办公室**：你坐进去 IDE，左边是一个会读你整个项目的 AI 同事（chat / agent），右边是会自己跑测试 / 提 PR 的实习生（Cloud Agent），抽屉里有一堆现成模板（Skills / Marketplace）。你只要描述想法，剩下的它替你做完。

## 和 vibe coding 的关系
**Cursor 是 vibe coder 的"驾驶舱默认选择"**——不在国内网络受限场景下，几乎所有海外独立开发者都默认推 Cursor。它的核心价值不是"AI 写代码"，而是"AI 能读懂你整个仓库"——这是它和 Copilot 等单文件助手最大的区别。

## 典型场景 / 示例

### 关键事实（核实窗口 2026-06）

| 字段 | 内容 |
|---|---|
| 产品形态 | 独立桌面 IDE（基于 VS Code 分叉）+ CLI + Cloud Agents + Bugbot |
| 主要功能 | Tab 补全、Cmd+K 选段重写、Chat 侧栏、Agent 模式、Composer、Cursor Rules、Cloud Agents、Skills、Marketplace |
| 平台 | macOS / Windows / Linux |
| 公司 | Anysphere |
| 官方网站 | https://cursor.com |
| 定价页 | https://cursor.com/pricing |

### 定价（USD，**查询日期：2026-06-23**，来源 cursor.com/pricing + cursor.com/docs/account/pricing）

| 档位 | 月费 | 包含什么 |
|---|---|---|
| **Hobby (Free)** | **$0** | 有限 Agent 请求 + 有限 Tab 补全；无需信用卡 |
| **Pro** | **$20 / 月** | 含 $20 API usage 预算 + Auto/Composer 包含额度；可用前沿模型 + MCP + Skills/Hooks + Cloud Agents + Bugbot |
| **Pro+** | **$60 / 月** | 含 $70 API usage 预算；官方推荐"日常 Agent 使用者" |
| **Ultra** | **$200 / 月** | 含 $400 API usage 预算；官方推荐"Agent 重度用户" |
| **Teams Standard** | **$40 / 用户 / 月** | Individual 所有 + Bugbot 代码评审、共享团队 Cloud Agents、Privacy Mode、SAML/OIDC SSO |
| **Teams Premium** | **$120 / 用户 / 月** | Standard 基础上 **5× Agent 上限** |
| **Enterprise** | Custom | Pooled usage、SCIM、Audit logs、AI code tracking API、优先支持 |

**关键变化**：旧的"fast requests"概念已被替换为 **"API usage $ + Auto/Composer 包含额度"** 的双口袋模型——Pro/Pro+/Ultra 三档**只是预算池不同**，功能层完全相同。

### 支持的模型
官方页面只写 "frontier models"。实际可用包括：Claude（Sonnet / Opus / Haiku 当前版）、OpenAI GPT-5 系 / o 系、Google Gemini Pro / Flash、xAI Grok 4 系列；自定义 OpenAI 兼容端点可接入 DeepSeek / Qwen / GLM / Kimi 等国产模型（详见 B-07）。

### 国内能否直接用
- 官网可访问，可下载客户端
- 登录、付款、模型调用需国际网络环境
- **变通方案**：自定义"OpenAI Base URL"指向国产模型 API（B-07），可在国内网络下完全国产化使用

### 适合的场景
- 真正在写代码的全职工程师
- 项目有 ≥10 个文件、需要 AI 跨文件理解的场景
- 需要 Agent 自动跑测试 / 提 PR 的重度使用者

### 不太适合
- 完全不懂代码的非工程用户（推荐 Lovable / v0 / Bolt）
- 国内付款不便、网络受限的轻度用户（推荐 Trae）
- 只写单个组件 / 短脚本（VS Code + Copilot 就够）

## 常见误区
- ❌ **"Cursor 默认就是最贵那个模型"**：Auto 模式会自动路由便宜模型。难任务才升级，账单可控。
- ❌ **"Cursor Pro 包月就无限调用"**：Pro 有 fast request 额度（每月几百次），超过后自动降速；遇到 "rate limited" 提示就是这个。
- ❌ **"项目大了 Cursor 就读不懂"**：它默认用 RAG（A-08）+ embeddings 索引整个仓库，所以即使 100 万行也能找到相关代码。但仍建议给它"明确的入口文件"提示效率更高。
- ❌ **"Cursor Rules 没什么用"**：恰好相反，`.cursorrules` 是把"风格、技术栈、避坑"固化进 AI 的最强武器（详见 D-04）。

## 延伸阅读

### 📺 视频教程
- [Cursor AI Tutorial for Beginners (YouTube)](https://www.youtube.com/watch?v=g_Y9ZVCoq78) `[英 · ⭐⭐ · 免费 · 2024 · 30min]` Cursor 新手完整入门
- [Cursor 从入门到精通 (B站)](https://www.bilibili.com/video/BV1ZM4m1y7Pm) `[中 · ⭐⭐ · 免费 · 2024 · 系列]` 中文 Cursor 系统教程
- [Cursor Composer + Agent Mode (YouTube)](https://www.youtube.com/watch?v=1WS912rT3gA) `[英 · ⭐⭐ · 免费 · 2024 · 20min]` Composer 和 Agent 模式深度使用
- [Cursor 国内使用指南 (B站)](https://www.bilibili.com/video/BV1nH4y1M7s6) `[中 · ⭐ · 免费 · 2024 · 15min]` 国内开发者配置 Cursor 攻略

### 📰 文章
- [Cursor 官方文档](https://docs.cursor.com) `[英 · ⭐⭐ · 免费 · 持续更新]`
- [Cursor 定价](https://cursor.com/pricing) `[英 · ⭐ · 免费 · 持续更新]`
- [Cursor 中文社区精选教程合集（社区）](https://learn-cursor.com/) `[中 · ⭐⭐ · 免费 · 2024-2026]` ⚠️ 内容质量与时效以社区为准
- C-决策树 工具选型决策树

## 去问 AI
> 「我刚下载完 Cursor。请给我一份 30 分钟新手清单：从配置模型、写第一条 .cursorrules、用 Agent 模式做一个小工具、装第一个 MCP server 这四步走起，每步给出具体操作。」

---
**来源**：① https://cursor.com/pricing  ② https://docs.cursor.com
**查询日期**：2026-06-23 · **数据来源时间**：2026-06
