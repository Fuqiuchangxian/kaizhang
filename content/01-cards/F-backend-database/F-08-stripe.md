---
group: F-backend-database
card_id: F-08
title: Stripe 支付
difficulty: ⭐⭐
last_updated: 2026-06-23
status: 已核实
related: [F-01, F-05, H-06]
---

# F-08 Stripe 支付

## 一句话定义
Stripe 是全球最主流的"开发者友好"支付平台——给独立开发者**最快搭建订阅 / 一次性付款 / 多币种结算**的工具。在海外，**接 Stripe 几乎等于"我能开始收钱了"**；国内开发者面向海外用户也常用它。

## 打个比方
**Stripe 像专门为程序员设计的 POS 机**：
- 不用懂金融、不用懂卡组织协议
- 几行代码 = 创建价格、发起支付、订阅、退款
- 自动处理税、发邮件收据、防欺诈

## 和 vibe coding 的关系
- 想做 SaaS / 付费工具 → 接 Stripe 是经典选择
- 30 分钟接好 Checkout、1 小时接好订阅、半天接好完整 Customer Portal
- 国内付款？**Stripe 不支持中国大陆收款**（详见"常见误区"），看变通方案

## 典型场景 / 示例

### Stripe 三种主要支付方式

| 模式 | 用途 | 复杂度 |
|---|---|---|
| **Stripe Checkout** | 一次性付款 / 订阅，**Stripe 托管的支付页** | ⭐ 最简单 |
| **Payment Element / Custom UI** | 自己设计支付表单 | ⭐⭐ 中等 |
| **Subscriptions API** | 复杂订阅逻辑（试用、按量、升级降级） | ⭐⭐⭐ |

**90% 独立开发者用 Stripe Checkout 就够**——把用户跳到 Stripe 托管页面，付完跳回你的网站。

### Stripe Checkout 最简流程（Next.js）

**1. 后端创建 Checkout Session**：
```ts
// app/api/checkout/route.ts
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{
      price: "price_xxxxxxxx",   // 在 Stripe Dashboard 创建好的价格 ID
      quantity: 1,
    }],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
    customer_email: userEmail,   // 关联用户
  });
  return Response.json({ url: session.url });
}
```

**2. 前端按钮**：
```tsx
async function checkout() {
  const res = await fetch("/api/checkout", { method: "POST" });
  const { url } = await res.json();
  window.location.href = url;
}

<Button onClick={checkout}>升级 Pro</Button>
```

**3. Webhook 接收付款成功**：
```ts
// app/api/webhooks/stripe/route.ts
export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature")!;
  const body = await req.text();

  const event = stripe.webhooks.constructEvent(
    body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    // 在你的数据库标记用户为 pro
    await db.user.update({
      where: { email: session.customer_email },
      data: { plan: "pro" },
    });
  }

  return Response.json({ received: true });
}
```

### 必须接 Webhook（重要）

为什么不能信任 success_url？
- 用户可能没等跳转就关浏览器
- 用户可能伪造跳转
- 退款 / 订阅取消等事件 success_url 收不到

**所有"用户付了什么"必须靠 Webhook 确认**。

### 主要事件类型

| 事件 | 含义 |
|---|---|
| `checkout.session.completed` | Checkout 付款成功（订阅 / 一次性） |
| `invoice.paid` | 订阅扣费成功 |
| `invoice.payment_failed` | 订阅扣费失败 |
| `customer.subscription.updated` | 订阅升级 / 降级 |
| `customer.subscription.deleted` | 订阅取消 |
| `charge.refunded` | 退款 |

### 定价（核实窗口 2026-06）

- **标准费率**：约 2.9% + $0.30 每笔成功交易（卡支付，地区略不同）
- **国际卡 / 跨境**：通常额外 +1.5%
- 没有月费、没有 setup 费
- ⚠️ 准确费率请查 https://stripe.com/pricing

### 国内开发者的痛点 + 变通

Stripe **不直接支持中国大陆主体收款**。如果你在国内想收钱：

| 你的目标用户 | 推荐方案 |
|---|---|
| **海外用户 / USD 计价** | Stripe（注册海外公司主体 / 用 Stripe Atlas 一站式开美股公司） |
| **国内用户 / CNY** | 微信支付商户号 / 支付宝商户号 / **Pingxx**（聚合）/ **Lemon Squeezy**（merchant of record） |
| **不想注册公司** | **Creem / Lemon Squeezy / Paddle**（merchant of record 模式，他们做你的中间商） |

## 常见误区
- ❌ **"信任前端返回的 'payment success'"**：必须 Webhook 确认。前端可被篡改。
- ❌ **"Webhook 签名验证可以跳过"**：会被黑客伪造 Webhook 给你"标记付费"。**必须验签**。
- ❌ **"test mode 的 key 可以上生产"**：test key 是 `sk_test_...` / live key 是 `sk_live_...`。生产环境要切到 live key。
- ❌ **"Stripe 能在中国大陆收钱"**：当前不支持中国大陆主体。中国大陆用户付款本身可以（用境外卡），但你要有海外公司主体才能收款。
- ❌ **"接完 Stripe 就能合规"**：跨境收款还涉及税务、发票、合规（中国大陆开发者面向境外收款的税务处理）——找会计咨询。

## 延伸阅读

### 📺 视频教程
- [Stripe Checkout 教程 (YouTube)](https://www.youtube.com/watch?v=7uKQBl9uZ00) `[英 · ⭐⭐ · 免费 · 2024 · 20min]` Stripe Checkout 快速接入
- [Stripe + Next.js 订阅系统 (YouTube)](https://www.youtube.com/watch?v=8KJtTvbRygM) `[英 · ⭐⭐ · 免费 · 2024 · 45min]` 完整订阅支付系统
- [Stripe 中文入门 (B站)](https://www.bilibili.com/video/BV1ZM4m1y7Pm) `[中 · ⭐⭐ · 免费 · 2024 · 30min]` 中文支付接入教程
- [Stripe Webhooks 详解 (YouTube)](https://www.youtube.com/watch?v=dU-xk852pvk) `[英 · ⭐⭐ · 免费 · 2024 · 15min]` Webhook 验证与事件处理

### 📰 文章
- [Stripe 官方文档](https://stripe.com/docs) `[英 · ⭐⭐ · 免费 · 持续更新]`
- [Stripe Checkout 快速入门](https://stripe.com/docs/checkout/quickstart) `[英 · ⭐⭐ · 免费 · 持续更新]`
- [Stripe Pricing](https://stripe.com/pricing) `[英 · ⭐ · 免费 · 持续更新]`
- [Lemon Squeezy](https://www.lemonsqueezy.com/) `[英 · ⭐ · 免费起 · 持续更新]` 接入更简单 + merchant of record
- [Creem](https://creem.io/) `[英 · ⭐ · 免费起 · 持续更新]` 独立开发者友好
- [Paddle](https://www.paddle.com/) `[英 · ⭐ · 免费起 · 持续更新]`
- H-06 SaaS 定价策略

## 去问 AI
> 「我做 Next.js 14 SaaS，要接 Stripe 订阅（月度 $19 / 年度 $190）+ 给用户开 customer portal 自助管理。请给我完整代码：(1) Stripe Dashboard 要先建什么；(2) Checkout API 路由；(3) Webhook 处理 subscription.created / updated / deleted；(4) 在 Supabase 数据库存哪些字段标识用户订阅状态。」

---
**来源**：① https://stripe.com/docs  ② https://stripe.com/pricing
**查询日期**：2026-06-23 · **数据来源时间**：常青（费率详见官网）
