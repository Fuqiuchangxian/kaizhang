---
group: C-vibe-coding-tools
card_id: C-06
title: Replit Agent
difficulty: ⭐
last_updated: 2026-06-23
status: 已核实
related: [B-02, C-决策树, G-04]
---

# C-06 Replit Agent

## 一句话定义
Replit Agent 是 Replit 平台上的 AI 编程 Agent——你在浏览器里跟它聊"想做什么应用"，它直接在 Replit 云端 IDE 里写代码、配数据库、配 Auth、跑测试、部署上线，**全程不离开浏览器**。

## 打个比方
**像在一台云电脑里养了个会写代码的助手**：Replit 本来就是"浏览器内的 VS Code + 服务器"；Agent 来了之后，连"敲代码"都省了——你跟它聊天，它在云服务器上现场跑出一个应用，发你访问链接。

## 和 vibe coding 的关系
- **教育、学生、入门用户友好**：Replit 历史悠久，社区作品多，特别适合 0 基础上手
- **Mobile 友好**：手机也能用，路上突然有想法立刻动手
- **后端、数据库一体化**：内置 Replit Database / Postgres / Auth，不用单独配 Supabase

## 典型场景 / 示例

### 关键事实（核实窗口 2026-06）

| 字段 | 内容 |
|---|---|
| 产品形态 | 纯 Web IDE + Mobile App + Agent + Deployments + Databases |
| 公司 | Replit |
| 官方网站 | https://replit.com |
| 定价页 | https://replit.com/pricing |
| 计费 | Effort-Based Pricing（按 Agent 工作量计 credits） |

### 定价（USD，**查询日期：2026-06-23**）

| 档位 | 月费 | 含义 |
|---|---|---|
| **Starter** | 免费 | 每日免费 Agent credits |
| **Replit Core** | 年付 $20/月（年付省 20%）/ 月付 $25/月 | 含 $25/月 credits |
| **Replit Pro** | 年付 $95/月 / 月付 $100/月 | 含 $100/月 credits，2.9× Core 用量 |
| **Enterprise** | 定制 | — |

### 国内能否直接用
- 网站可访问，但 IDE 重度依赖云端容器，**国内网络受限明显**
- 部署的应用走 Replit 海外节点，国内访问可能慢

### 适合的场景
- 学生 / 教育场景
- 想"零安装"快速做 Web App 的入门用户
- 手机 / iPad 端临时改代码
- 直接发布 demo 应用给朋友看（Replit 自带域名）

### 不太适合
- 国内网络受限用户（推荐 Trae / 通义灵码）
- 需要本地 IDE + git 工作流的专业开发者（推荐 Cursor）
- 大型项目 / 长期维护

## 常见误区
- ❌ **"Replit = 仅在线 IDE"**：现在更像是"在线 IDE + Agent + Cloud Hosting" 一体化产品。
- ❌ **"免费档够用"**：免费档 Agent credits 很快用完；想做完整应用至少升 Core。
- ❌ **"Effort-Based Pricing 等于按时间收费"**：是按 Agent 完成任务的复杂度算 credits，简单 prompt 便宜、长任务贵。
- ❌ **"Replit 应用部署后免费访问"**：Always-on 部署需要 credits 维持。免费档应用会休眠。

## 延伸阅读
- [Replit 官方文档](https://docs.replit.com) `[英 · ⭐ · 免费 · 持续更新]`
- [Replit 定价](https://replit.com/pricing) `[英 · ⭐ · 免费 · 持续更新]`
- [Replit 100 天 Python 课程（教育友好）](https://replit.com/learn/100-days-of-python) `[英 · ⭐ · 免费 · 持续更新]`
- C-决策树 工具选型决策树

## 去问 AI
> 「我用 Replit Agent 想做一个'每日新闻摘要 Bot'——抓 3 个 RSS 源，用 AI 总结，每天 8 点发到我邮箱。请给我一段可以直接粘到 Replit Agent 聊天框的初始 prompt，包括我需要在 Replit Secrets 里配什么环境变量。」

---
**来源**：① https://replit.com/pricing  ② https://docs.replit.com
**查询日期**：2026-06-23 · **数据来源时间**：2026-06
