---
group: G-deploy-and-launch
card_id: G-07
title: Zeabur（国内友好）
difficulty: ⭐
last_updated: 2026-06-23
status: 已核实
related: [G-01, G-选型]
---

# G-07 Zeabur

## 一句话定义
Zeabur 是"国内最像 Vercel 的部署平台"——连 GitHub 自动检测框架部署，支持 Next.js 全栈 / Nuxt / NestJS / 容器等，**有免费档 + 中文界面 + 支持支付宝付款**，是国内独立开发者的热门选择。

## 打个比方
**像国内能直连的、能付人民币的 Vercel**：体验和 Vercel 很像（Git push 自动部署、Preview URL、自定义域名），但服务器在海外（新加坡/香港/日本），国内可访问且支持支付宝付款。

## 和 vibe coding 的关系
- 国内没有稳定访问 Vercel 方案时的主力替代
- Free 档有基础额度可上线个人项目
- 2026 年主推 **Zeabur Agent**——自然语言操作基础设施

## 典型场景 / 示例

### 关键事实（核实窗口 2026-06）

| 字段 | 内容 |
|---|---|
| 官方网站 | https://zeabur.com |
| 定价页 | https://zeabur.com/pricing |
| 主推 | 源码自动部署 + Zeabur Agent + Docker / 容器 |
| 支持的框架 | Next.js（含 SSR/API Routes）、Nuxt、SvelteKit、NestJS、Astro、Django、Flask、Go、Rust、Spring Boot、Laravel、Flutter 等 |

### 定价（USD，**查询日期：2026-06-23**，来源：https://zeabur.com/pricing + https://zeabur.com/docs/en-US/pricing/free-plan）

| 档位 | 月费 | 关键额度 |
|---|---|---|
| **Free** | $0 | 1 台自有服务器；Build CI 2C4G；日志 48h；单文件 ≤50MB；邮件/自定义域名/API Keys/Webhooks **均为 0**；闲置自动休眠；无 SLA |
| **Dev** | $5（前 14 天免费） | 3 台服务器；日志 7 天；邮件 100/天 · 3,000/月；域名 5 个；API Keys 5；Webhooks 5 |
| **Pro** | $19（官方推荐 / 前 14 天免费） | 10 台服务器；Build CI 4C8G；日志 30 天；单文件 1GiB；邮件无限/天 · 50,000/月；域名 10；API Keys 100 |
| **Team** | $79（含 3 席，额外 +$24/席） | 无限服务器；日志 90 天；邮件 100,000/月 |
| **Enterprise** | 定制 | — |

> 支持支付宝付款。¥ 结算需联系。
> **⚠️ Free 档未公开数据**：流量带宽 / 数据库容量 / 计算资源上限 / 项目自定义域名数量——**请登录 https://zeabur.com/pricing 与 Dashboard 实际查看**。

### 国内能否直连
- ✅ **可直连**（服务器在新加坡/香港/东京等海外节点）
- 国内访问速度好于 Vercel / Netlify

### 适合场景
- 国内独立开发者部署全栈 Web 应用
- 不想绑国际信用卡 / 想用支付宝付费
- 需要中文界面 + 中文文档 + 活跃中文社区

### 不太适合
- 对 Next.js ISR / Edge Runtime 等高级特性有强依赖（Vercel 仍最好）
- 国内有 ICP 备案 / 合规需求（服务器在海外）

## 延伸阅读
- [Zeabur 官网](https://zeabur.com) `[中/英 · ⭐ · 免费起 · 持续更新]`
- [Zeabur 定价](https://zeabur.com/pricing) `[中/英 · ⭐ · 免费 · 持续更新]`
- [Zeabur 文档](https://zeabur.com/docs) `[中/英 · ⭐⭐ · 免费 · 持续更新]`
- G-01 Vercel（同体验对比）

## 去问 AI
> 「我在国内，做了一个 Next.js + Supabase + Stripe 的 SaaS，想部署。请帮我对比 Zeabur Free vs Dev $5：Free 档不能绑自定义域名，我用 zeabur.app 子域名上线能行吗？流量 ограничения大概多少？」

---
**来源**：① https://zeabur.com/pricing  ② https://zeabur.com/docs
**查询日期**：2026-06-23 · **数据来源时间**：2026-06