---
group: G-deploy-and-launch
card_id: G-05
title: Render
difficulty: ⭐
last_updated: 2026-06-23
status: 已核实
related: [G-04, G-06, G-选型]
---

# G-05 Render

## 一句话定义
Render 是"**仍有免费 Web Service + 免费 Postgres** 的老牌高性价比 PaaS"——比 Vercel 通用、比 Railway 稳定、比 Fly.io 易用，2026-06 仍保留了 Free 档的托管 Postgres。

## 打个比方
**像 Vercel 的"宽车道版"**：Vercel 是为 Next.js 建的赛道，Render 是为"任何 Web 框架"建的通用道——Django / Express / FastAPI / Rails / Laravel / Flask / Next.js 全支持，包括完整 Docker 容器。

## 和 vibe coding 的关系
- **仍有 Free 层**的通用 PaaS（免费 Web Service 512MB RAM + 0.1 CPU + 免费 Postgres 30 天）
- 可以和 Vercel 互补：Vercel 跑 Next.js 前端，Render 跑 Python / Django 后端 + Postgres

## 典型场景 / 示例

### 关键事实（核实窗口 2026-06）

| 字段 | 内容 |
|---|---|
| 官方网站 | https://render.com |
| 定价页 | https://render.com/pricing |
| 主推 | 容器 + 原生 runtime + 静态托管 + 托管 Postgres/Redis |

### 定价（USD，**查询日期：2026-06-23**）

**工作区订阅**：
| 档位 | 月费 | 备注 |
|---|---|---|
| **Hobby** | $0（+ 按用量 compute） | ≤25 个服务、500 构建分钟/月、14 天日志 |
| **Pro** | $25/月（+ compute） | 无限服务、10 成员、自动伸缩 |
| **Scale** | $499/月（含 compute？） | — |
| **Enterprise** | 定制 | SSO/SCIM/HIPAA |

**Compute 价格**（Web / Worker / Private 统一）：
| 档位 | 月费 | CPU / 内存 |
|---|---|---|
| **Free** | $0 | 0.1 CPU / 512 MB（仅 Web，有休眠） |
| **Starter** | $7 | — |
| **Standard** | $25 | — |
| **Pro** | $85 | — |
| **Pro Plus** | $175 | — |
| **Pro Max** | $225 | — |
| **Pro Ultra** | $450 | — |

**Postgres**：30 天免费试用后 → Basic 256MB **$6/月起**。

### 国内能否直连
- `*.onrender.com` 国内大部分时段可达，比 Vercel 稳定一些
- 绑自定义域名更稳妥

### 适合场景
- 想要免费 Web Service + Postgres 的独立开发者
- Django / Rails / FastAPI / Flask 等 Python/Ruby 后端
- Vercel 之外的 Node.js / Next.js 备选
- Cron Job 按分钟计费（$1 起）——便宜

### 不太适合
- 国内网络不稳地区
- 需要高性能 Web Service（Free 档睡醒慢）

## 常见误区
- ❌ **"Render 全都免费"**：Free Web Service 会**休眠**（10-15 分钟没请求就睡，醒了要 5-30 秒冷启）。生产环境至少 Starter $7。
- ❌ **"Pro 工作区等于 Pro compute"**：工作区费 + compute 费是**分开**的。

## 延伸阅读
- [Render 官网](https://render.com) `[英 · ⭐ · 免费起 · 持续更新]`
- [Render 定价](https://render.com/pricing) `[英 · ⭐ · 免费 · 持续更新]`
- [Render 文档](https://render.com/docs) `[英 · ⭐⭐ · 免费 · 持续更新]`
- G-04 Railway · G-06 Fly.io（同档位对比）

## 去问 AI
> 「我要部署 Django + Postgres 后端。请帮我比较 Render Free Hobby vs Railway Hobby $5 vs Fly.io 按量：哪个最适合我的场景（月请求 3 万次、需要稳定不睡、Postgres 小数据量）？」

---
**来源**：① https://render.com/pricing
**查询日期**：2026-06-23 · **数据来源时间**：2026-06