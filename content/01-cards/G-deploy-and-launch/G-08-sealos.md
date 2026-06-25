---
group: G-deploy-and-launch
card_id: G-08
title: Sealos（国内友好 · 基于 K8s）
difficulty: ⭐⭐
last_updated: 2026-06-23
status: 已核实
related: [G-07, G-选型]
---

# G-08 Sealos

## 一句话定义
Sealos 是"**Kubernetes 之上的云操作系统**"——它把复杂的 K8s 封装成一个**像桌面操作系统的网页界面**，2026 年主推"**AI Pilot**：自然语言部署 + 内置 DevBox + AI Proxy"。

## 打个比方
**像把 Linux 包装成 Windows**：Kubernetes 强大但学习曲线陡，Sealos 给你一个图形化"桌面"——点点就能开数据库、部署应用、跑 AI 模型。底层仍是真实 K8s，但**你不用学 kubectl 也能用**。

## 和 vibe coding 的关系
- 国内独立开发者的"高阶选项"——比 Zeabur 更强大但学习曲线略陡
- 内置 **pgvector / Milvus** 等 AI 应用所需的向量库一键开服务
- 国内访问优秀、支持人民币结算
- 2026 年主推 **AI Pilot + DevBox** 一体化开发环境

## 典型场景 / 示例

### 关键事实（核实窗口 2026-06）

| 字段 | 内容 |
|---|---|
| 官方网站 | https://sealos.io（英文）/ https://sealos.run（中文） |
| 控制台 | https://cloud.sealos.io |
| 主推（2026） | AI Pilot + DevBox + 数据库即开即用 |
| 支持的部署 | 源码 / Docker 镜像 / GitHub 仓库 / 原生 K8s YAML |

### 定价（**查询日期：2026-06-23**）

**Sealos 国际版（sealos.io / Sealos Cloud 海外）**——已核实
| 项目 | Free 试用值 |
|---|---|
| 价格 | $0，无需信用卡 |
| vCPU | 4 |
| 内存 | 4 GB |
| 卷存储 | 5 GB |
| 带宽 | 500 MB |
| AI Credits | 100 |
| 试用时长 | 7 天 |
| 来源 | https://sealos.io/pricing |

**Sealos 国内版（sealos.run）**——按量计费
- 按量计费：云资源按小时计费，暂停不计费
- 已知碎片单价：「0.4 元/U · 0.2 元/G」
- AI Proxy 百万次调用最低 0.01 元
- ⚠️ **新用户赠送余额具体数字未公开**——sealos.run / cloud.sealos.io/price 页面动态渲染未抓到。**请登录 https://cloud.sealos.run 或 https://cloud.sealos.io 控制台「费用中心」查看实际入账**。

### 核心能力
- **数据库即开即用**：Postgres / MySQL / Mongo / Redis、含 **pgvector** + **Milvus** 向量库
- **S3 兼容对象存储**
- **DevBox**：云端开发环境
- **AI Proxy**：统一 AI 模型 API（含国产模型）
- **原生 K8s**：可直接 `kubectl apply YAML`
- **AI Pilot**：自然语言操作基础设施

### 国内能否直连
- ✅ 优——国内节点 + 人民币结算

### 适合场景
- 已经懂或想学 K8s / 容器思维的开发者
- AI 应用（需要 pgvector / Milvus / 向量检索）
- 国内访问优先 + 想要按秒/小时按量付费的小型项目
- 想自部署开源 LLM（Sealos 有 Stable Diffusion / Llama 一键模板）

### 不太适合
- 不想学容器 / 想一键 push 即部署（去看 Zeabur / EdgeOne）
- 价格透明度要求高（Sealos 以 SKU 单价为主，套餐价不明显）

## 常见误区
- ❌ **"Sealos 还有大额免费"**：早期有；现在 **7 天免费试用 + 按量计费**为主。
- ❌ **"Sealos = 国内 Heroku"**：不完全一样。Sealos 底层是 K8s（更灵活），Heroku 是 dyno 抽象（更简单）。

## 延伸阅读
- [Sealos 中文站](https://sealos.run) `[中 · ⭐⭐ · 按量 · 持续更新]`
- [Sealos 控制台](https://cloud.sealos.io) `[中 · ⭐ · 7 天试用 · 持续更新]`
- [Sealos 文档](https://docs.sealos.io) `[英/中 · ⭐⭐⭐ · 免费 · 持续更新]`

## 去问 AI
> 「我想做一个 RAG 知识库 SaaS，需要 pgvector + Postgres + Next.js + 国产 Embedding 模型 API。请教我用 Sealos 一键搭起来：(1) 开哪些资源；(2) 大概月成本是多少（按 1000 DAU 估算）；(3) 与用 Supabase + Vercel 对比哪个更划算？」

---
**来源**：① https://sealos.run  ② https://cloud.sealos.io
**查询日期**：2026-06-23 · **数据来源时间**：2026-06
