---
group: C-vibe-coding-tools
card_id: C-02
title: Claude Code（CLI / Web / 桌面 / 移动）
difficulty: ⭐⭐
last_updated: 2026-06-23
status: 已核实
related: [B-02, B-07, C-决策树]
---

# C-02 Claude Code

## 一句话定义
Claude Code 是 Anthropic 官方的"全平台编程 Agent"——从命令行 CLI 起家，2025-2026 期间已扩展到 Web、桌面 App、IDE 插件、Slack、移动端，统一靠 Claude 系列模型驱动。

## 打个比方
**像 Anthropic 的"亲生编程助手"**：和 Cursor 那种"VS Code 改造的 IDE"不同，Claude Code 一开始没有 GUI——它就活在你的 **终端**里，你打字它写代码、改文件、跑测试。后来才长出 Web 面板、桌面 App、手机 App，但核心仍然是"Agent 在你的工作区代你操作"。

## 和 vibe coding 的关系
- **国内开发者最常用的"接国产模型"载体**：通过 Anthropic 协议兼容（B-07），Claude Code 可以接 Kimi K2.7 Code、GLM-5.2、DeepSeek V4-Pro 等，**花国产模型的钱、用顶级 Agent 体验**
- **比 Cursor 更"无 GUI"**：适合喜欢命令行、不想被 IDE GUI 牵着走、喜欢用 git diff 看修改的人
- **Web/桌面版**让非命令行用户也能体验 Agent

## 典型场景 / 示例

### 关键事实（核实窗口 2026-06）

| 字段 | 内容 |
|---|---|
| 产品形态 | **CLI**（主线）+ VS Code/Cursor/JetBrains 插件 + **Web 版 claude.ai/code** + **macOS 桌面 App** + **Slack** + **移动端** |
| 公司 | Anthropic |
| 官方页 | https://claude.com/product/claude-code |
| 安装 | `npm install -g @anthropic-ai/claude-code`（详见官方安装指南） |

### 定价（USD，**查询日期：2026-06-23**）

- **Pro**：年付 $17/月，月付 $20/月（含 Claude Code 的小型任务额度）
- **Max 5x**：$100/月
- **Max 20x**：$200/月
- **Team / Enterprise**：premium seat，价格未公开（联系销售）
- **API**：按 token 计费（详见 B-01 / B-05）

### 支持的模型
默认 Claude 全家（Opus / Sonnet / Haiku 各最新版）。**通过环境变量**可切换到任意 Anthropic 兼容的国产模型（详见 B-07）：
```bash
export ANTHROPIC_BASE_URL="https://api.moonshot.cn/anthropic"   # 接 Kimi
export ANTHROPIC_API_KEY="..."
```

### 国内能否直接用
- claude.com / api.anthropic.com 国内**无法直连**
- **变通**：用 `ANTHROPIC_BASE_URL` 指向国产模型 Anthropic 兼容端点（B-07），Claude Code 本身的 CLI 工具是开源的，国内能正常用

### 2025-2026 关键更新
- 2026-05-28 **Dynamic workflows**：支持百级并行子 Agent
- 2026-05-11 **Agent view**：统一会话面板
- 2026-04-14 **Routines**：定时 / 事件触发任务
- 2026-03-23 **Computer use "Dispatch"**：跨电脑长任务
- 已上线 Web、桌面 App、Slack、移动端入口

### 适合的场景
- 重度使用 Claude 模型的开发者
- 喜欢命令行 + git 工作流的人
- 国内用户想白菜价用顶级 Agent（接 Kimi / GLM / DeepSeek）
- 需要 Slack / 移动端协作的团队

### 不太适合
- 不习惯命令行、需要图形化操作的纯小白（推荐 Cursor / Trae）
- 重度使用 GPT-5 系列（推荐 Cursor / Copilot）

## 常见误区
- ❌ **"Claude Code 只能用 Claude"**：通过 Anthropic 协议兼容，可以接任何提供该协议的厂商——Kimi、GLM、DeepSeek、MiniMax 都可以。
- ❌ **"Claude Code 只是 CLI"**：2025-2026 已扩展到全平台，详见上表。
- ❌ **"Pro 包月就能随便用"**：Pro 主要给 Claude.ai 网页使用，Claude Code 在 Pro 档只有少量额度；重度使用要 Max 5x / Max 20x，或直接按 API token 付费。
- ❌ **"装在哪都一样"**：装本地 CLI 和装 Web 版的最大区别是——**CLI 可以直接读写你的本地文件、跑命令**，Web 版只能在云端 Sandbox 里跑（适合 demo、不适合改本地项目）。

## 延伸阅读

### 📺 视频教程
- [Claude Code Tutorial (YouTube)](https://www.youtube.com/watch?v=nrC5Ieir7yo) `[英 · ⭐⭐ · 免费 · 2024 · 20min]` Claude Code 官方教程演示
- [Claude Code + DeepSeek 国产模型接入 (B站)](https://www.bilibili.com/video/BV1nH4y1M7s6) `[中 · ⭐⭐ · 免费 · 2024 · 25min]` 国内开发者 Claude Code 配置指南
- [Claude Code Agent Mode 实战 (YouTube)](https://www.youtube.com/watch?v=fgf2m7G2pCQ) `[英 · ⭐⭐ · 免费 · 2024 · 15min]` Agent 模式实际项目演示

### 📰 文章
- [Claude Code 官方页](https://claude.com/product/claude-code) `[英 · ⭐⭐ · 免费 · 持续更新]`
- [Anthropic 文档（部分国内地区无法访问）](https://docs.anthropic.com) `[英 · ⭐⭐ · 免费 · 持续更新]`
- [B-07 国产模型 API 接入](../B-models-and-selection/B-07-domestic-models-api.md)（含接 Claude Code 全流程）
- [Kimi 接 Claude Code 官方教程](https://platform.kimi.com/docs/guide/agent-support) `[中 · ⭐ · 免费 · 2026]`
- [DeepSeek 接 Claude Code 官方教程](https://api-docs.deepseek.com/zh-cn/guides/anthropic_api) `[中 · ⭐ · 免费 · 2026]`

## 去问 AI
> 「我在 Mac 上想装 Claude Code，但海外网络不稳。请给我一份完整教程：(1) 装 CLI；(2) 用 DeepSeek API key 替换默认 Anthropic 端点；(3) 跑一个 'hello world' 任务验证；(4) 写一条 CLAUDE.md 让它默认遵守'用 TypeScript 严格模式 + 中文回答'。」

---
**来源**：① https://claude.com/product/claude-code  ② https://api-docs.deepseek.com/zh-cn/guides/anthropic_api  ③ https://platform.kimi.com/docs/guide/agent-support
**查询日期**：2026-06-23 · **数据来源时间**：2026-06
