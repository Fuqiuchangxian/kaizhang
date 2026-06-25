---
group: C-vibe-coding-tools
card_id: C-03
title: Lovable
difficulty: ⭐
last_updated: 2026-06-23
status: 已核实（具体月费数额待核实）
related: [B-02, C-决策树, C-04, C-05]
---

# C-03 Lovable

## 一句话定义
Lovable 是一个**浏览器内的"对话式 AI 软件工程师"**——用聊天的方式描述你想要的应用，它直接生成可上线的全栈 Web App，云端部署不用动手。

## 打个比方
**像跟一个全栈外包工程师 chat**：你说"我想要一个让用户上传简历、AI 自动改简历、付钱才能下载结果"的网站。他听完写一句"明白了"，过一两分钟把链接发你——已经上线了的，还能登录、能付钱。你看不到代码、也不需要看；觉得哪里不对说一句，他直接改了重发链接。

## 和 vibe coding 的关系
- **零基础 vibe coder 最快出货的路径**：从有想法到一个能给朋友看的链接，常常 < 30 分钟
- 不用装环境、不用想"前后端怎么分""怎么部署"——Lovable 全包
- 作为"先做个 MVP 验证想法"的工具，**比 Cursor / Trae 还低门槛**
- 缺点是后期改深度逻辑、迁移到自己代码库困难，**Lovable 适合"从 0 到 1"，不适合"从 1 到 10"**

## 典型场景 / 示例

### 关键事实（核实窗口 2026-06）

| 字段 | 内容 |
|---|---|
| 产品形态 | 纯 Web（聊天式建站 / 建应用） |
| 公司 | Lovable AB（瑞典） |
| 官方网站 | https://lovable.dev |
| 定价页 | https://lovable.dev/pricing |
| 模型 | 未公开声明（OEM 多家模型，社区猜测主用 Claude） |

### 定价（USD，**查询日期：2026-06-23**，FAQ 来源 lovable.dev/pricing；价格卡数字交叉自第三方 aimojo.io）

| 档位 | 月费 | 月度 Credits | 主要权益 |
|---|---|---|---|
| **Free** | $0 | 每日 5（封顶 30/月）+ 20 Cloud credits | 仅公开项目；最多 20 协作者；GitHub sync；带 Lovable 徽标 |
| **Pro** | **起 $25 / 月**（年付 $252 ≈ 2 月免费） | **起 100 / 月** + 每日 5 + 20 Cloud | 无限私有项目、自定义域名、用户角色、可去 Lovable 徽标、credits 月度滚存 |
| **Business** | **起 $50 / 月**（年付 $504） | **起 100 / 月** | Pro 全部 + **SSO** + Personal projects + 可 opt-out AI 训练 |
| **Enterprise** | Custom | Custom | 专属 onboarding + 组级访问控制 + 自定义集成 |

**Credits 机制**（高置信度，FAQ 直抓）：
- **Default Mode**：按 prompt 复杂度 0.5–1.7 credit / prompt（改按钮颜色 0.5 / 加认证 1.2 / 建落地页 1.7）
- **Plan Mode**：固定 1 credit / 消息
- 错误"Ask AI to fix"不消耗 credit
- 月度 credits 2 个月后过期；年度计划年底+1 个月；Top-up credits 12 个月
- 学生折扣：https://lovable.dev/students

> **注**：Pro/Business 月费数字来自第三方文章（lovable.dev/pricing 价格卡为动态渲染未直抓到）。**最终金额请用户访问 https://lovable.dev/pricing 确认**。

### 国内能否直接用
- 可以访问网站，但**需要国际网络**才稳定
- 支付要国际信用卡
- 部署的产品默认走 Lovable 的海外节点，**国内访问速度有时较慢**

### 适合的场景
- 非工程出身的产品经理 / 创业者 / 设计师
- 30 分钟内出一个能演示的 MVP
- 落地页、简单 SaaS、小工具、表单 / 问卷类网站

### 不太适合
- 复杂业务系统（财务、ERP、IM）
- 需要移动 App（仅 Web）
- 需要把代码迁移回本地项目继续维护（虽然支持 export，但代码风格不一定符合你团队规范）

## 常见误区
- ❌ **"Lovable 生成的代码不能自己改"**：可以 export 到 GitHub，自己 clone 后改。但下次再想用 Lovable 续写时，需要 sync 回来。
- ❌ **"Credits 用完就废"**：Free 档有日 / 月限制；Pro 档每月固定 credits + 滚动累计。用得多就升级，没必要一次性买大档。
- ❌ **"Lovable = 完全无代码"**：底层还是真实生成 React + Tailwind + Supabase 代码，**它只是把这套技术栈打包了**。你看不到 ≠ 不存在。
- ❌ **"Lovable 比 Cursor 强"**：场景不同。Lovable 强在"0→1 极快、零基础友好"；Cursor 强在"专业开发者的大项目深度修改"。

## 延伸阅读

### 📺 视频教程
- [Lovable Dev Tutorial (YouTube)](https://www.youtube.com/watch?v=3UCtX1E0DOs) `[英 · ⭐⭐ · 免费 · 2024 · 20min]` Lovable 官方教程
- [Lovable 零代码做 App (B站)](https://www.bilibili.com/video/BV1oC411b7v1) `[中 · ⭐⭐ · 免费 · 2024 · 15min]` 中文入门演示
- [Lovable + Supabase 实战 (YouTube)](https://www.youtube.com/watch?v=8KJtTvbRygM) `[英 · ⭐⭐ · 免费 · 2024 · 25min]` 全栈项目演示

### 📰 文章
- [Lovable 官方文档](https://docs.lovable.dev) `[英 · ⭐ · 免费 · 持续更新]`
- [Lovable 定价页](https://lovable.dev/pricing) `[英 · ⭐ · 免费 · 持续更新]`
- [社区作品集 Showcase](https://lovable.dev/showcase) `[英 · ⭐ · 免费 · 持续更新]`
- C-决策树 工具选型决策树
- C-04 v0.dev（类似定位的对比）

## 去问 AI
> 「我想用 Lovable 做一个'帮独立开发者自动写 Product Hunt 上线文案'的小工具——输入产品名 + 一句话介绍，输出标题 + tagline + 三条评论模板。请给我一段可以直接粘进 Lovable 聊天框的初始 prompt。」

---
**来源**：① https://lovable.dev/pricing  ② https://docs.lovable.dev/features/pricing
**查询日期**：2026-06-23 · **数据来源时间**：2026-06（具体月费数额⚠️ 待核实）
