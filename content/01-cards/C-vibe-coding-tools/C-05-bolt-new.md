---
group: C-vibe-coding-tools
card_id: C-05
title: Bolt.new
difficulty: ⭐
last_updated: 2026-06-23
status: 已核实
related: [B-02, C-决策树, C-03, C-04]
---

# C-05 Bolt.new

## 一句话定义
Bolt.new 是 StackBlitz 出品的"浏览器内全栈 vibe coding 工具"——基于 WebContainer 技术，**整个 Node.js 环境跑在你浏览器里**，可以生成、运行、调试、部署应用，全程不用打开本地 IDE。

## 打个比方
**像把 VS Code + 一台云服务器 整个塞进了浏览器**：你打开一个 tab，它已经帮你装好了 Node、npm、运行环境——你说什么应用，它现场写、现场跑、现场让你看效果。不用装任何东西，链接发朋友就能预览。

## 和 vibe coding 的关系
- **比 Cursor 还要"零本地"**：连下载 IDE 都省了，浏览器即用
- 比 Lovable / v0 灵活：能跑 Node / Python / Astro / Vue / Svelte 各种技术栈
- 适合做"快速跑一个 idea"——尤其是想试试不熟悉的技术栈

## 典型场景 / 示例

### 关键事实（核实窗口 2026-06）

| 字段 | 内容 |
|---|---|
| 产品形态 | 纯 Web（StackBlitz WebContainer 内运行 Node 全栈） |
| 公司 | StackBlitz |
| 官方网站 | https://bolt.new |
| 定价页 | https://bolt.new/pricing |
| 模型 | Bolt Agent 自动路由（Standard / Max 双档），未公开底层模型 |
| 部署 | 内置 Bolt Cloud（一键托管） |

### 定价（USD，**查询日期：2026-06-23**）

| 档位 | 月费 | 额度 |
|---|---|---|
| **Free** | $0 | 300K tokens/日、1M tokens/月、10MB 上传 |
| **Pro** | $25/月（月付） | 10M tokens/月起，未用额度滚到下月 |
| **Teams** | $30/成员/月（标 Popular） | 集中计费 + 权限 |
| **Enterprise** | 定制 | — |

### 2025-2026 关键更新
- 新版 **Bolt Agent**：宣称 "98% less errors"、支持 1000× 大型项目
- 整合 **Bolt Cloud**：一键托管
- WebContainer 性能持续优化，复杂依赖加载更快

### 国内能否直接用
- 网站可访问，但 WebContainer 加载较重，**国内体验不稳**
- 复杂项目时网络中断会丢失工作进度

### 适合的场景
- 完全不想装本地环境的用户
- 想试某个技术栈但不想 setup 项目（Astro、Remix、Solid 等）
- 课堂演示、分享 demo、写技术博客配套代码
- 落地页 / 简单 SaaS / 工具站

### 不太适合
- 网络不稳的环境
- 复杂项目 / 大仓库（WebContainer 性能限制）
- 需要自定义底层模型的高级用户

## 常见误区
- ❌ **"Bolt 比 v0 / Lovable 强"**：技术栈覆盖更广是优点，但深度和 UI 质量在各自专长技术栈下不如 v0；社区资源不如 Lovable 丰富。**三者是"差不多档位 + 略不同侧重"**。
- ❌ **"Token 用完就废"**：未用 token 滚动到下月；Pro 档 10M tokens 对独立开发者中等使用够用。
- ❌ **"WebContainer = 沙箱受限"**：早期是；现在能跑 npm install、能跑 Express server、能调外部 API；但仍然有内存上限和不能用某些原生模块的限制。
- ❌ **"Bolt 不能 export 代码"**：可以下载完整项目 zip，或 push 到 GitHub。

## 延伸阅读
- [Bolt.new 官方文档](https://support.bolt.new) `[英 · ⭐ · 免费 · 持续更新]`
- [StackBlitz WebContainer 技术介绍](https://webcontainers.io/) `[英 · ⭐⭐ · 免费 · 2023-2026]` 想了解技术底层
- [Bolt 定价](https://bolt.new/pricing) `[英 · ⭐ · 免费 · 持续更新]`
- C-03 Lovable / C-04 v0（同档位对比）

## 去问 AI
> 「我想试用 Astro 框架做一个静态博客，但我电脑上没装 Node。请给我一段可以直接粘到 Bolt.new 的初始 prompt：用 Astro + MDX，要 hero、文章列表、文章详情三个页面，自动从 `posts/` 目录读 markdown。」

---
**来源**：① https://bolt.new/pricing  ② https://webcontainers.io
**查询日期**：2026-06-23 · **数据来源时间**：2026-06
