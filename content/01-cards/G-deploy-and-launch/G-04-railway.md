---
group: G-deploy-and-launch
card_id: G-04
title: Railway
difficulty: ⭐
last_updated: 2026-06-23
status: 已核实
related: [G-05, G-06, G-选型]
---

# G-04 Railway

## 一句话定义
Railway 是"容器化全栈 PaaS"——给你一个**漂亮的网页面板**，连 GitHub 后自动检测语言/框架，按秒计费 vCPU/RAM/磁盘/带宽。**UI 体验最好的容器平台**。

## 打个比方
**像装修过的共享办公室**：你拎着包（GitHub repo）进去，前台帮你开会议室（容器），按你用的时间收费。比 AWS 那种"先签 5 年租约"友好太多。

## 和 vibe coding 的关系
- 比 Vercel 更通用：可以跑**任何容器**（不限 Next.js / Node.js）
- Python / Go / Rust / Java 后端首选之一
- 一键开 Postgres / Redis / Mongo 数据库模板
- 缺点：**取消了永久免费档**

## 典型场景 / 示例

### 关键事实（核实窗口 2026-06）

| 字段 | 内容 |
|---|---|
| 官方网站 | https://railway.com |
| 定价页 | https://railway.com/pricing |
| 主推 | 容器化全栈，按秒计费 |

### 定价（USD，**查询日期：2026-06-23**）

| 档位 | 月费 | 备注 |
|---|---|---|
| **Free Trial** | 一次性 $5 抵扣额度 | 无需信用卡，**没有永久免费层** |
| **Hobby** | $5/月 | 含基础用量额度 |
| **Pro** | $20/月/席位 | — |
| **Enterprise** | 定制 | SLA / SSO / 专属支持 |

**计费维度**：内存 GB-秒、vCPU-秒、磁盘 GB-秒、出站流量 GB、对象存储 GB-月（出站免费）。

### 国内能否直连
- 默认 `*.up.railway.app` 国内可达性一般偏差
- 自定义域名 + Cloudflare 中转可缓解

### 适合场景
- Node.js / Python / Go / Rust / Java 后端
- 需要稳定运行的 worker / cron job
- 需要 Postgres / Redis / Mongo 一键开数据库
- 不想自己写 Dockerfile（自动 Nixpacks 检测）

### 不太适合
- 想要永久免费档（去看 Render / Cloudflare）
- 重度静态站点（去看 Vercel / Netlify / Cloudflare Pages）
- 国内用户优先访问

## 常见误区
- ❌ **"Railway 还有永久免费档"**：错。**已取消**，只有一次性 $5 试用额度。
- ❌ **"Railway = Heroku 替代品"**：定位接近，但 Railway 按秒计费、UI 更现代。
- ❌ **"按秒计费一定省钱"**：低流量项目省；常驻 Web 服务月底可能比 Render Starter（$7 包月）贵。算清你的"真实日活"再选。

## 延伸阅读
- [Railway 官网](https://railway.com) `[英 · ⭐ · $5 试用 · 持续更新]`
- [Railway 定价](https://railway.com/pricing) `[英 · ⭐ · 免费 · 持续更新]`
- [Railway 文档](https://docs.railway.com) `[英 · ⭐⭐ · 免费 · 持续更新]`
- G-05 Render（同档位对比） · G-06 Fly.io

## 去问 AI
> 「我要部署一个 FastAPI + Postgres + Redis 的 Python 后端到 Railway。请给我完整步骤：(1) GitHub 连接；(2) 自动检测我是 Python；(3) 一键开 Postgres + Redis；(4) 怎么配环境变量串起来；(5) 月成本预估（每天 1 万次请求）。」

---
**来源**：① https://railway.com/pricing
**查询日期**：2026-06-23 · **数据来源时间**：2026-06
