---
group: G-deploy-and-launch
card_id: G-06
title: Fly.io
difficulty: ⭐⭐
last_updated: 2026-06-23
status: 已核实
related: [G-04, G-05, G-选型]
---

# G-06 Fly.io

## 一句话定义
Fly.io 是"**多区域 Docker / Firecracker microVM 平台**"——你的应用可以一键部署到全球 35+ 个区域（含 hkg / nrt / sin 亚太节点），按秒按 microVM 精细计费。**国内访问最友好的海外平台**之一。

## 打个比方
**像把一个 Docker 容器丢到全球任意机房**：你写好 Dockerfile，`flyctl deploy`，它在你选的区域起一个 microVM（启动 < 1s），24h 不用时可以"停机"几乎不付钱。

## 和 vibe coding 的关系
- 全球节点最多，**hkg / nrt 区对国内延迟最优**
- 支持 WebSocket / gRPC / 长连接（Vercel / Cloudflare 这块弱）
- Postgres 集群一键开，多区域可用
- 缺点：**取消了免费档** + UI 偏极简（主要靠 `flyctl` CLI）

## 典型场景 / 示例

### 关键事实（核实窗口 2026-06）

| 字段 | 内容 |
|---|---|
| 官方网站 | https://fly.io |
| 定价页 | https://fly.io/pricing |
| 主推 | 全球边缘 Docker / Firecracker microVM |
| 区域数 | 35+ 个（含 hkg / nrt / sin 亚太节点） |

### 定价（USD，**查询日期：2026-06-23**，纯按用量）

**计算**（ams 区域示例）：
- shared-cpu-1x 256MB → **$2.02/月**
- shared-cpu-1x 512MB → $3.32/月
- shared-cpu-1x 1GB → $5.92/月
- performance-1x 2GB → $32.19/月
- performance-16x 128GB → $1013.80/月
- 停机 Machine 仅按 rootfs 收 **$0.15/GB/月**

**存储**：
- 卷 $0.15/GB/月、快照 $0.08/GB/月（每月前 10GB 免费）

**带宽**：
- 北美/欧洲 $0.02/GB
- 亚太/大洋洲 $0.04/GB
- 印度/非洲 $0.12/GB
- 入站免费

**IP**：共享 IPv4/IPv6 免费 · 专用 IPv4 $2/月

**支持**：社区免费 / 标准 $29 / 高级 $199 / 企业 $2500
**HIPAA 合规** $99/月 · **Fly Kubernetes** $75/月/集群

**预留机器** 可享 **40% 折扣**。

**Legacy 免费额度**：已弃用。**新用户无免费额度**。

### 国内能否直连
- **6 大海外平台里默认最友好**——hkg / nrt 节点延迟低
- `*.fly.dev` 域名仍建议套自定义域

### 适合场景
- 国内用户优先访问，但不想用国内云的项目
- 需要 WebSocket / 长连接（聊天、实时同步）
- 多区域部署（用户分布全球）
- 想要"按真实用量付钱"
- Docker 熟手

### 不太适合
- 想要永久免费档（去看 Render / Cloudflare）
- 不想写 Dockerfile / 学 CLI
- 国内合规备案需求（不支持国内 ICP）

## 常见误区
- ❌ **"Fly.io 还有 free tier"**：错。**已弃用**，新用户必须绑卡。
- ❌ **"Fly Postgres 是托管服务"**：实际是"在你账户里跑一个 Postgres VM"——还是要你管。如想完全托管选 Neon / Supabase。
- ❌ **"多区域 = 数据自动同步"**：错。**数据库要自己设计多区域复制**。

## 延伸阅读
- [Fly.io 官网](https://fly.io) `[英 · ⭐⭐ · 按用量 · 持续更新]`
- [Fly.io 定价详解](https://fly.io/docs/about/pricing/) `[英 · ⭐⭐ · 免费 · 持续更新]`
- [Fly.io 文档](https://fly.io/docs) `[英 · ⭐⭐ · 免费 · 持续更新]`

## 去问 AI
> 「我想做一个全球用户都能用的 Discord-like 聊天 SaaS——重度 WebSocket、跨地域低延迟。请帮我比较：Fly.io 多区域部署 vs Vercel / Cloudflare 的方案。Fly.io 在 hkg 节点 1 个 shared-cpu-1x-512MB + 5GB 卷月费大概多少？」

---
**来源**：① https://fly.io/pricing  ② https://fly.io/docs/about/pricing
**查询日期**：2026-06-23 · **数据来源时间**：2026-06
