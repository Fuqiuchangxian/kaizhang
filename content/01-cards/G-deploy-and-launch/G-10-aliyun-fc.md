---
group: G-deploy-and-launch
card_id: G-10
title: 阿里云函数计算 FC
difficulty: ⭐⭐
last_updated: 2026-06-23
status: 已核实
related: [F-06, G-选型]
---

# G-10 阿里云函数计算 FC

## 一句话定义
阿里云函数计算（FC）是国内最成熟的 Serverless 平台——你用 Node.js / Python / Go / Java 写函数，阿里云帮你跑 + 自动扩容 + 按调用次数收钱。2026 年主推 AI 推理（GPU 函数 + Stable Diffusion 一键部署）+ AgentRun。

## 打个比方
**像包下一个"按电费收钱"的云厨房**：你只写菜谱（代码），不用管厨房的地租、炉子、电力——有人点单才起锅，按菜价收钱。没生意时炉子是熄的。

## 和 vibe coding 的关系
- 国内 AI 推理后端首选（ComfyUI / Stable Diffusion / LLM 后端）
- 微信/支付宝小程序后端天然友好
- 和 Vercel / Zeabur 的"全栈 Git 即部署"体验不同——FC 更偏"写函数，平台帮你跑"
- FC 有官方折扣单价（截至 2026-08-27）

## 典型场景 / 示例

### 关键事实（核实窗口 2026-06）

| 字段 | 内容 |
|---|---|
| 官方网站 | https://www.aliyun.com/product/fc |
| 计费文档 | https://help.aliyun.com/zh/functioncompute/product-overview/billing-overview |
| 主推（2026） | AI 推理（GPU 全系卡型）+ AgentRun + Serverless Web |

### 定价（**查询日期：2026-06-23**，统一 CU 制）

**新用户试用包**（来源：https://help.aliyun.com/zh/functioncompute/fc/product-overview/trial-quota-1）：

| 项目 | 数值 |
|---|---|
| 每个周期试用额度 | **15 万 CU** |
| 提供周期数 | **连续 3 个周期** |
| 周期长度 | 月（每自然月 01 日 00:00 重置） |
| 适用对象 | 首次登录 FC 控制台 / 新注册或新开通 FC 的用户；阿里云主账号与 RAM 用户共享 |
| 超额处理 | 每周期超出 15 万 CU 部分自动转入按量付费 |

**阶梯计费**（来源：https://help.aliyun.com/zh/functioncompute/product-overview/billing-overview）：

| CU 使用量 | 标准单价 | 官网折扣单价（2024-08-27 至 2026-08-27） |
|---|---|---|
| (0, 2 亿] | 0.00011 元/CU | **0.000088 元/CU** |
| (2 亿, 10 亿] | 0.00010 元/CU | 0.000080 元/CU |
| >10 亿 | 0.00009 元/CU | 0.000072 元/CU |

**转换系数**：
- vCPU：1.0 CU/(vCPU·秒)
- 内存：0.15 CU/(GB·秒)
- 调用次数：75 CU/万次
- 磁盘：0.05 CU/(GB·秒)（512MB 内免费）

**最低出账**：单小时有调用且 CU 折算 < 0.01 元 → 按 0.01 元/小时。
**附加免费**：浅休眠期间 vCPU 与调用次数免费。

> ⚠️ 试用额度只用"CU"计量，未给"调用次数 / GB·秒"换算表——按上面转换系数自行折算。

### 国内能否直连
- ✅ 极优——国内访问节点

### 适合场景
- AI 推理后端（ComfyUI / SD / LLM API）
- 事件驱动任务（图片处理、消息队列）
- Serverless Web API

### 不太适合
- 想要"git push 即部署"体验（去看 Zeabur / EdgeOne）
- 完整全栈项目（FC 更偏后端函数）

## 延伸阅读
- [阿里云 FC 产品页](https://www.aliyun.com/product/fc) `[中 · ⭐⭐ · 按量 · 持续更新]`
- [FC 计费概览](https://help.aliyun.com/zh/functioncompute/product-overview/billing-overview) `[中 · ⭐⭐ · 免费 · 持续更新]`

## 去问 AI
> 「我要用阿里云 FC 做 AI 绘图 SaaS 的后端（ComfyUI + 用户队列）。请教我：(1) 选什么 GPU 卡型；(2) 预留实例还是按量；(3) 冷启动怎么解决；(4) 月成本预估 1000 次/天。」

---
**来源**：① https://www.aliyun.com/product/fc
**查询日期**：2026-06-23 · **数据来源时间**：2026-06