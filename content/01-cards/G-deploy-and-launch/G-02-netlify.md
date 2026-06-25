---
group: G-deploy-and-launch
card_id: G-02
title: Netlify
difficulty: ⭐
last_updated: 2026-06-23
status: 已核实
related: [G-01, G-选型]
---

# G-02 Netlify

## 一句话定义
Netlify 是和 Vercel 同档位的"静态站点 + Serverless / Edge Functions"托管平台——Jamstack 概念的发源地，老牌、稳定、对非 Next.js 框架支持更平等（Astro / Eleventy / SvelteKit / Nuxt 都很好）。

## 打个比方
**Vercel 是 Next.js 自家 4S 店，Netlify 是综合修车厂**——你开什么牌子的车都修得好，特别是对小众框架（Astro / Eleventy / Hugo）支持比 Vercel 更平衡。

## 和 vibe coding 的关系
- **Vercel 的最大替代**——如果你用 Astro / Eleventy / Hugo / SvelteKit，Netlify 通常体验稍好
- 2026-06 改为 **Credits 制计费**（新模型）
- Pro 起步即"团队无限成员"——这是相对 Vercel 的优势

## 典型场景 / 示例

### 关键事实（核实窗口 2026-06）

| 字段 | 内容 |
|---|---|
| 官方网站 | https://www.netlify.com |
| 定价页 | https://www.netlify.com/pricing |
| 主推技术栈 | 静态 + Serverless + Edge Functions + Forms + Identity |

### 定价（USD，**查询日期：2026-06-23**）

> 2026-06 改为统一 Credits 制：

| 档位 | 月费 | Credits |
|---|---|---|
| **Free** | $0 | 300 credits/月 |
| **Personal** | $9 | 1,000 credits/月 |
| **Pro** | $20 | 3,000 credits/月（成员无限） |
| **Enterprise** | 定制 | — |

**Credits 换算**：
- 1 次生产部署 = 15 credits
- 带宽 = 20 credits/GB
- 计算 = 10 credits/GB-小时
- Web 请求 = 2 credits/万次

> Free 300 credits ≈ 15 GB 带宽 **或** 30 GB-小时计算 **或** 150 万次请求。

### 国内能否直连
- `*.netlify.app` 国内可达性中等（时好时坏）
- 自定义域名 + Cloudflare CDN 较好

### Next.js 支持
- 通过 `@netlify/plugin-nextjs` 支持 ISR / App Router
- 但比 Vercel **晚 1-2 步**：新特性的支持时间通常稍慢

### 适合场景
- Astro / Eleventy / Hugo / SvelteKit / Nuxt 等非 Next.js 项目
- 多人小团队（Pro 即"无限成员"）
- 需要 Netlify Forms / Identity 等开箱即用的额外能力

## 常见误区
- ❌ **"Netlify = 仅静态"**：现在含 Serverless / Edge Functions / 数据库（Netlify DB）。
- ❌ **"Credits 越多越好"**：理解 Credits 换算才能算出真实成本。带宽密集项目可能比想象贵。
- ❌ **"Netlify Forms 完全免费"**：免费档每月仅 100 次提交。

## 延伸阅读
- [Netlify 定价](https://www.netlify.com/pricing/) `[英 · ⭐ · 免费 · 持续更新]`
- [Netlify 文档](https://docs.netlify.com) `[英 · ⭐⭐ · 免费 · 持续更新]`
- G-01 Vercel（同档位对比）

## 去问 AI
> 「我在做一个 Astro 静态博客 + 简单 Netlify Function 提交评论。请帮我比较 Netlify vs Vercel：(1) 对 Astro 支持各自表现？(2) 我月流量 50GB，免费档够吗？(3) 该选哪个？」

---
**来源**：① https://www.netlify.com/pricing
**查询日期**：2026-06-23 · **数据来源时间**：2026-06
