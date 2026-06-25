---
group: G-deploy-and-launch
card_id: G-09
title: 腾讯云 EdgeOne Pages / Makers
difficulty: ⭐
last_updated: 2026-06-23
status: 已核实
related: [G-01, G-07, G-选型]
---

# G-09 腾讯云 EdgeOne Pages（2026 升级为 EdgeOne Makers）

## 一句话定义
EdgeOne Pages 是腾讯云推出的"国内访问优先的 Vercel 对标产品"——Git 集成、零配置 Next.js、Edge Functions、全球边缘网络。**2026 升级品牌为 EdgeOne Makers**，叠加 AI Agent 原生支持，目前处于"推广期：永久免费 + 即使超额也不停服"阶段。

## 打个比方
**像把 Vercel 搬到国内 CDN 上**：体验对标 Vercel（GitHub 连接、自动部署、Edge Functions、自定义域名），但跑在腾讯云国内节点上——**国内访问速度远胜任何海外平台**。

## 和 vibe coding 的关系
- **国内访问最快的 Next.js 全栈部署方案**之一
- 当前推广期"永久免费 + 不停服"对独立开发者极有吸引力
- 内置 MCP / IDE 插件，与国内 AI 编程工具（C 组）无缝联动

## 典型场景 / 示例

### 关键事实（核实窗口 2026-06）

| 字段 | 内容 |
|---|---|
| 官方网站 | https://edgeone.ai/zh · https://pages.edgeone.ai |
| 文档 | https://cloud.tencent.com/document/product/1552/127366 (页面最后更新 **2026-06-12**) |
| 2026 品牌 | EdgeOne Makers（原 EdgeOne Pages） |
| 主推 | 静态 + SPA + **全栈 Next.js（零配置 SSR / API Routes）** + AI Agent |

### 定价（**查询日期：2026-06-23**）

| 档位 | 价格 | 含什么 |
|---|---|---|
| **Free** | **$0/月**（永久） | Git/AI 部署、CI/CD、全球 CDN、云函数 + 边缘函数、AI Agents、内置模型、Blob/KV 存储、Copilot 构建 |
| **Business** | 联系销售 | 优先支持、自定义配额、深度集成 |

**重要说明**（来自官网 FAQ）：
> "在付费版本推出之前，即使超出免费额度，服务也不会中断。"

→ 即 **2026-06 时点尚未推出付费档**，处于"先免费、后付费"推广期。

> ⚠️ **Makers 免费版的具体配额数字未公开**（构建分钟数、函数调用次数、Blob 容量、KV 容量、带宽都未在 pricing 页定量列出，仅有"不限量"等口号 + "Usage Limit"模糊标签）。**请用户访问 https://pages.edgeone.ai/pricing 切到 Makers 标签或登录 Pages 控制台用量页查看**。
>
> 参考：EdgeOne 主产品（CDN + 安全）的个人版含 50GB 流量 / 300 万次请求；基础版 500GB / 2000 万次——但这是 CDN 套餐，**不直接等同 Pages/Makers 免费配额**。

### 支持的部署类型
- 静态站点（Astro 等）
- SPA（React 等）
- **全栈 Next.js**（含 SSR / API Routes）
- **Agent 应用**（Claude / LangGraph 等框架）
- 边缘函数 + 云端函数双层 Serverless

### 国内能否直连
- ✅ **极优**——腾讯云国内 CDN 节点
- 绑定**国内自定义域名需要 ICP 备案**（edgeone.app 子域可绕过）

### 适合场景
- 国内访问优先的 Next.js 全栈站点（最大卖点）
- 想用"Vercel 体验 + 国内访问速度"的独立开发者
- AI Agent 部署（含官方内置模型）

### 不太适合
- 想要 Vercel 那种成熟生态 / 长期可预测的定价（推广期价格不可预测）
- 跨账号迁移敏感（必须用腾讯云账号）

## 常见误区
- ❌ **"EdgeOne Pages 永久免费 + 没坑"**：当前是推广期。**未来正式推出付费档时定价待观察**。
- ❌ **"绑国内域名不需备案"**：错。**国内自定义域名必须 ICP 备案**（这是国内合规要求，不是腾讯独家）。
- ❌ **"EdgeOne = Cloudflare 国内版"**：EdgeOne 整体是 CDN+安全产品，EdgeOne Pages/Makers 是 PaaS 子产品，是 Vercel 对标。

## 延伸阅读
- [EdgeOne 主站](https://edgeone.ai/zh) `[中 · ⭐ · 推广期免费 · 持续更新]`
- [EdgeOne Pages 定价](https://pages.edgeone.ai/pricing) `[中 · ⭐ · 免费 · 持续更新]`
- [EdgeOne 整体定价](https://edgeone.ai/zh/pricing) `[中 · ⭐ · 免费 · 持续更新]`
- [腾讯云 EdgeOne Pages 文档](https://cloud.tencent.com/document/product/1552/127366) `[中 · ⭐⭐ · 免费 · 持续更新]`
- G-01 Vercel · G-07 Zeabur

## 去问 AI
> 「我做了一个 Next.js + Supabase 的 SaaS，主要给国内用户用。请帮我比较 EdgeOne Pages vs Zeabur vs Vercel：(1) 国内访问速度排序；(2) 备案 / 合规复杂度；(3) 免费档够撑到月活几千吗？(4) 推荐我先用哪个？」

---
**来源**：① https://pages.edgeone.ai/pricing  ② https://cloud.tencent.com/document/product/1552/127366
**查询日期**：2026-06-23 · **数据来源时间**：2026-06
