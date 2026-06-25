---
group: D-mcp-and-agent
card_id: D-03
title: 好用的 MCP Server 导航
difficulty: ⭐
last_updated: 2026-06-23
status: 已核实
related: [D-01, D-02]
---

# D-03 好用的 MCP Server 导航

## 一句话定义
本卡片整理 vibe coder 最常用的几类 MCP server——文件 / 数据库 / 浏览器 / 搜索 / 支付 / 部署——**按"装一个能多干一件事"的角度筛选**，不求多，求"装上立刻用得到"。

## 打个比方
**像挑插座**——你家里不会买 50 个不同形状的插座，**3-5 个常用的够了**。MCP server 同理：装多了 AI 选工具变迟钝。

## 和 vibe coding 的关系
- 配 MCP server 是 vibe coder 的"扩展技能"
- 但**装一堆没用的反而拖累 AI**
- 这张卡告诉你：先装哪几个最值

## 典型场景 / 示例

> ⚠️ MCP server 生态变化非常快，下列是 2026-06 仍被广泛使用的常青选项。**所有 npm 包名 / 仓库 URL 请最终以 [官方 servers 仓库](https://github.com/modelcontextprotocol/servers) 为准**。

### 一、文件 / 本地操作

| Server | 能力 | 包名 / 来源 |
|---|---|---|
| **Filesystem** | 让 AI 读写指定目录的文件 | `@modelcontextprotocol/server-filesystem` |
| **Git** | 让 AI 看 git log / diff / status | `@modelcontextprotocol/server-git` |
| **Memory** | 给 AI 一个跨会话的长期记忆 | `@modelcontextprotocol/server-memory` |
| **Sequential Thinking** | 让 AI 显式输出"分步思考"过程 | `@modelcontextprotocol/server-sequential-thinking` |

### 二、数据库

| Server | 能力 |
|---|---|
| **Supabase MCP** | 读写 Supabase 表、运行 migration、生成 types |
| **Postgres MCP** | 直接连任意 Postgres 实例 |
| **SQLite MCP** | 连本地 SQLite 数据库 |

### 三、浏览器 / 自动化

| Server | 能力 | 备注 |
|---|---|---|
| **Puppeteer MCP** | 让 AI 控制无头 Chrome 截图、点按钮、抓数据 | 官方维护 |
| **Playwright MCP**（微软） | 类似 Puppeteer，跨浏览器 | 微软出品 |
| **Browser Use** | 完整 browser agent，更高级 | 社区项目 |

### 四、搜索 / 信息抓取

| Server | 能力 |
|---|---|
| **Brave Search MCP** | 让 AI 联网搜索（需 Brave API key） |
| **Tavily MCP** | 专门做 LLM 友好搜索结果的服务 |
| **Perplexity MCP** | 接 Perplexity 搜索 + 引用 |
| **Fetch MCP** | 简单地"AI 给 URL 我给你网页文本" |

### 五、代码托管 / DevOps

| Server | 能力 |
|---|---|
| **GitHub MCP** | 操作仓库：提 PR / 看 issue / 评论 / 合并 |
| **GitLab MCP** | 同上对 GitLab |
| **Sentry MCP** | 让 AI 查错误日志 |

### 六、支付 / SaaS

| Server | 能力 |
|---|---|
| **Stripe MCP** | 让 AI 查订单、退款、生成支付链接 |
| **PayPal MCP** | 类似 Stripe |

### 七、部署 / 云平台

| Server | 能力 |
|---|---|
| **Vercel MCP** | 让 AI 部署项目、查日志、看分析 |
| **Cloudflare MCP** | 操作 Workers / Pages / DNS |
| **AWS MCP** | 操作 S3 / Lambda / EC2 等 |

### 八、内容 / 文档

| Server | 能力 |
|---|---|
| **Notion MCP** | 读写 Notion 页面 |
| **Slack MCP** | 让 AI 看消息、发通知 |
| **Linear MCP** | 让 AI 创建 issue、更新进度 |
| **Obsidian MCP** | 让 AI 读你的笔记库 |

## "最值得先装" 的 5 个（独立开发者首发包）

1. **Filesystem MCP** — 让 AI 真正能改你的本地文件（很多 IDE 自带，但显式配置更可控）
2. **GitHub MCP** — 让 AI 帮你提 PR / 看 issue，自动化 git 操作
3. **Supabase MCP**（如你用 Supabase）或对应数据库 server — 让 AI 直接读数据库
4. **Brave / Tavily Search MCP** — 让 AI 查最新资料，对抗"训练数据过时"
5. **一个浏览器 MCP**（Puppeteer 或 Playwright） — 让 AI 看到自己改出来的页面长啥样

> 装这 5 个，覆盖 80% vibe coding 场景。其他按需加。

## 怎么找新 MCP server？

| 渠道 | 说明 |
|---|---|
| [MCP Servers 官方仓库](https://github.com/modelcontextprotocol/servers) | 官方维护 + 社区贡献的合集 |
| [Awesome MCP Servers](https://github.com/punkpeye/awesome-mcp-servers) | 社区维护的"awesome"列表 |
| [Smithery.ai](https://smithery.ai/) | MCP server 市场，可视化搜索 |
| [Glama.ai MCP](https://glama.ai/mcp) | MCP server 索引 + 评分 |
| [PulseMCP](https://www.pulsemcp.com/) | MCP 资讯 + server 目录 |

## 常见误区
- ❌ **"server 越多越强"**：装 ≥10 个 AI 选工具变慢、错调用增多。**5 个起步、按需加**。
- ❌ **"装一个 server 就要重新学一遍"**：MCP 协议统一，**安装方式都是 npx / docker / pip** 三种之一，配置都是 JSON 一段。
- ❌ **"server 一定是 npm 包"**：可以是 Python 包（pip install ...）、可以是 Docker 镜像、可以是远程 HTTP server。看具体 server 文档。
- ❌ **"装了官方 server 就一定安全"**：MCP server 拿到的权限就是你给的权限——给 Filesystem 全盘权限 = AI 能删你任意文件。**最小权限原则**：只给项目目录，不给 `/`。

## 延伸阅读
- [Model Context Protocol 官方仓库](https://github.com/modelcontextprotocol/servers) `[英 · ⭐⭐ · 免费 · 持续更新]`
- [Awesome MCP Servers](https://github.com/punkpeye/awesome-mcp-servers) `[英 · ⭐ · 免费 · 持续更新]`
- [Smithery.ai](https://smithery.ai/) `[英 · ⭐ · 免费 · 持续更新]` MCP 市场
- D-02 怎么配置 MCP（具体配置语法）
- `03-skills-repo/mcp-configs.md`（提供可复制的 8 个常用 MCP 配置）

## 去问 AI
> 「我做的是 Next.js + Supabase + Stripe 全栈 SaaS，部署在 Vercel。请你按'装上立刻能用'的优先级给我列 5 个 MCP server——每个 server 解决我什么具体问题，并给出对应的 JSON 配置片段。」

---
**来源**：① https://github.com/modelcontextprotocol/servers  ② https://smithery.ai  ③ Awesome MCP Servers
**查询日期**：2026-06-23 · **数据来源时间**：2024-2026
