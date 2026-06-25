---
group: G-deploy-and-launch
card_id: G-03
title: Cloudflare Pages + Workers
difficulty: ⭐⭐
last_updated: 2026-06-23
status: 已核实
related: [F-06, G-01, G-选型]
---

# G-03 Cloudflare Pages + Workers

## 一句话定义
Cloudflare 的"Pages + Workers + R2 + D1 + KV" 套件 = **业界免费额度最慷慨的边缘部署平台**。Pages 托管前端、Workers 跑后端逻辑，全球 300+ 节点。

## 打个比方
**像免费的全球高速公路服务区**：你的代码跑在离用户最近的边缘节点（V8 isolate，启动 < 50ms）。Cloudflare 自家附加的数据存储（R2 / D1 / KV）几乎都自带"免费白嫖额度"——独立开发者初期可以**完全免费**跑完整 SaaS。

## 和 vibe coding 的关系
- **极致省钱**的独立开发者首选
- **Workers** 启动快（V8 isolate）、**R2** 无 egress（出站流量）费——做文件存储应用相比 S3 省到飞起
- 短板：Node.js 兼容性、调试体验、国内访问

## 典型场景 / 示例

### 关键事实（核实窗口 2026-06）

| 字段 | 内容 |
|---|---|
| 官方网站 | https://pages.cloudflare.com / https://workers.cloudflare.com |
| 定价页 | https://developers.cloudflare.com/workers/platform/pricing/ |
| 主推 | Edge runtime（V8 isolate，全球节点） |

### Pages 定价（USD，**查询日期：2026-06-23**）

| 档位 | 月费 | 备注 |
|---|---|---|
| **Free** | $0 | 500 次构建/月、1 并发构建、**带宽/静态请求不限**、100 个自定义域名/项目 |
| **Pro** | $20/月（年付）或 $25（月付） | — |
| **Business** | $200/月（年付）或 $250 | — |
| **Enterprise** | 定制 | — |

### Workers 定价

| 档位 | 月费 | 含什么 |
|---|---|---|
| **Free** | $0 | 100,000 次请求/天 + 单次 10ms CPU + 128MB 内存 |
| **Paid (Standard)** | $5/月起 | 1,000 万次请求/月 + 3,000 万 CPU-ms |
| 超出 | $0.30/百万请求 + $0.02/百万 CPU-ms | 单次最长 5 分钟（Cron/Queue 15 分钟） |

**静态资产请求**：免费且无限。

### 配套数据 / 存储（独立开发者宝藏）

| 服务 | 免费档亮点 |
|---|---|
| **R2**（对象存储，S3 兼容） | 10GB 存储/月免费 · **零 egress 费**（出站流量不收钱） |
| **D1**（SQLite 数据库） | 5GB 存储 + 500 万行读 + 10 万行写 / 天 |
| **KV**（键值存储） | 1GB 存储 + 10 万读 + 1000 写 / 天 |
| **Durable Objects** | 100 万 ops / 月 |
| **Queues** | 100 万 ops / 月 |

### 国内能否直连
- Cloudflare 在国内可达性**起伏明显**——部分地区限速、`workers.dev` 子域名常被劫持
- 绑定自定义域名 + Cloudflare China Network（需 ICP + 企业合作）才稳定
- 通常情况：**面向海外用户极好，面向国内用户体验不稳**

### Next.js 支持
- 通过 `@cloudflare/next-on-pages` 支持 Edge Runtime
- Node.js Runtime 兼容性近年大幅提升，但**仍逊于 Vercel**——部分库（用 Node fs / native module）不能跑

### 适合场景
- 想白嫖到月活几千、几乎零成本
- 面向海外用户的全球低延迟应用
- 大量文件存储 / 频繁出站（R2 零 egress 是杀手锏）
- API / Edge function 为主、前端简单的项目

### 不太适合
- 需要 Node 完整生态的项目（大量 npm 包跑不动）
- 国内用户优先访问
- 复杂调试 / 观测需求

## 常见误区
- ❌ **"workers.dev 域名能上生产"**：国内劫持严重；**必须绑自定义域名**。
- ❌ **"D1 能扛大型业务"**：D1 是 SQLite 衍生，单实例容量和写并发有限。**适合读多写少 + 中小规模**。
- ❌ **"Workers 能跑任何 npm 包"**：环境是 V8 isolate（类似浏览器），**不是完整 Node.js**。fs/crypto 等只有部分兼容（开 `nodejs_compat` flag）。
- ❌ **"R2 = 完全免费"**：免费的是出站流量（egress）；存储 / API 调用次数有上限。

## 延伸阅读
- [Cloudflare Pages](https://pages.cloudflare.com) `[英 · ⭐ · 免费起 · 持续更新]`
- [Workers Pricing](https://developers.cloudflare.com/workers/platform/pricing/) `[英 · ⭐⭐ · 免费 · 持续更新]`
- [Workers Limits](https://developers.cloudflare.com/workers/platform/limits/) `[英 · ⭐⭐ · 免费 · 持续更新]`
- [R2 介绍](https://developers.cloudflare.com/r2/) `[英 · ⭐⭐ · 免费起 · 持续更新]`
- F-06 Serverless / Edge

## 去问 AI
> 「我想做一个'匿名图片分享'网站——用户上传图片、生成分享链接、24h 后自动删除。请帮我设计完整架构：Cloudflare Pages 跑前端、Workers 处理 API、R2 存图片、D1 存元数据。给我估算月活 1 万时是否还能在免费档。」

---
**来源**：① Cloudflare 官方定价 / 限制文档
**查询日期**：2026-06-23 · **数据来源时间**：2026-06
