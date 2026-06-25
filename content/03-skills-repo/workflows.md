# Skills 仓库 · workflows.md

> 本文件提供 **W-01 ~ W-08 step-by-step 操作手册**——按"具体场景"分类。每个 workflow 都给出**完整命令 / 代码 / 检查点**，照着做就能完成。
> 适合：第一次做 vibe coding 上线全流程的人；以及"我知道该做啥但忘了具体步骤"的人。

---

## 目录

| # | Workflow | 预计耗时 |
|---|---|---|
| W-01 | 0 到部署 45 分钟 | 45 分钟 |
| W-02 | 接 Supabase | 30 分钟 |
| W-03 | 接 Stripe 订阅 | 60 分钟 |
| W-04 | 配自定义域名 | 30 分钟（不含 DNS 等待） |
| W-05 | 配 Cursor + MCP | 30 分钟 |
| W-06 | AI 流式输出 | 20 分钟 |
| W-07 | SEO 基础 | 60 分钟 |
| W-08 | 错误监控 | 20 分钟 |

---

## W-01 · 0 到部署 45 分钟（Next.js + Supabase + Vercel）

> **目标**：从一个空文件夹 → 一个用户能访问的 https://yourname.vercel.app 网页

### 0-5 分钟：环境准备
```bash
# 确认已装 Node.js 22+ 和 pnpm
node -v   # >= 22.x
pnpm -v   # >= 9.x

# 没装：https://nodejs.org/zh-cn （LTS）
# pnpm: npm install -g pnpm

# 装 git（如果没装）+ 配用户名邮箱
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

### 5-15 分钟：创建项目
```bash
# 用 Supabase 官方 starter
pnpm dlx create-next-app@latest my-app \
  --typescript --tailwind --app --src-dir=false \
  --import-alias "@/*"
cd my-app

# 启动看看
pnpm dev
# → http://localhost:3000 应该看到 Next.js 默认页面
```

### 15-25 分钟：在 Cursor 里改个页面
```bash
# 用 Cursor 打开项目
cursor .

# 在 chat 里发：
"把首页改成一个登录入口页：
- 标题 'VibeMaker 学习站'
- 副标题 '0 基础学做 AI 产品'
- 一个 '开始学习' 大按钮
- 深色背景 + 蓝色渐变光晕
- 用 Tailwind"
```
Cursor 改完 → 刷新浏览器 → 看到新页面。

### 25-30 分钟：push 到 GitHub
```bash
# 在 github.com 新建一个空仓库 my-app（public 或 private 都行）

# 然后：
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/my-app.git
git push -u origin main
```

### 30-40 分钟：部署到 Vercel
1. 打开 https://vercel.com → 用 GitHub 登录
2. "Add New..." → "Project"
3. 选 my-app 仓库
4. 直接 Deploy（默认配置即可）
5. 等 2-3 分钟构建
6. 拿到临时域名 `https://my-app-xxxxx.vercel.app`

### 40-45 分钟：验证 + 截图
- 在手机 / 别人电脑上打开链接
- 截图发朋友圈 / X / 即刻："我做了一个网页"

✅ **完成标志**：你的网站在公网可访问，HTTPS 自动开了（绿锁）。

---

## W-02 · 接 Supabase（数据库 + Auth）

> **前置**：已有 W-01 的 Next.js 项目

### 1. Supabase 项目创建（5 分钟）
1. https://supabase.com → 注册（用 GitHub）
2. New Project → 起名 `my-app-db` → 设置数据库密码（记下来）
3. 等 1-2 分钟项目就绪
4. Settings → API → 复制 **Project URL** 和 **anon public key**

### 2. 装客户端 + 配 env
```bash
pnpm add @supabase/supabase-js @supabase/ssr
```

`.env.local`：
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
```

⚠️ **千万别提交 .env.local 到 git**（.gitignore 默认已忽略）

### 3. 创建 supabase client
`lib/supabase/client.ts`：
```ts
import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
```

`lib/supabase/server.ts`：
```ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createClient = async () => {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookies) => cookies.forEach(({ name, value, options }) =>
          cookieStore.set(name, value, options)
        ),
      },
    }
  );
};
```

### 4. 建表 + RLS
在 Supabase Dashboard → SQL Editor 跑：
```sql
create table notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  content text,
  created_at timestamptz default now()
);

alter table notes enable row level security;

-- 用户只能看到自己的 notes
create policy "users can read own notes"
  on notes for select
  using (auth.uid() = user_id);

create policy "users can insert own notes"
  on notes for insert
  with check (auth.uid() = user_id);
```

### 5. 加登录页 + 调用 API
让 Cursor 写：
```
"创建一个 app/login/page.tsx，用 Supabase Auth 实现邮箱密码登录 + Google OAuth。
登录成功后跳 /dashboard。
错误用 sonner toast 显示。
用 shadcn/ui 的 Input / Button / Card。"
```

### 6. 验证
- 注册一个账号 → 在 Supabase Dashboard → Authentication → Users 看到这个用户
- 登录 → 跳转 → 创建一条 note → 在 Dashboard → Table editor → notes 看到记录

✅ **完成标志**：完整"注册 → 登录 → 写数据 → 查数据"链路跑通。

---

## W-03 · 接 Stripe 订阅

### 1. Stripe 准备（10 分钟）
1. https://stripe.com 注册（test mode 不需要营业执照）
2. Developers → API Keys → 复制 `sk_test_...` 和 `pk_test_...`
3. Products → 创建一个 Product，比如 `Pro Plan`
4. 在该 product 下加 Price：$19/月（recurring）→ 复制 `price_xxx`

### 2. 装 SDK
```bash
pnpm add stripe @stripe/stripe-js
```

`.env.local`：
```
STRIPE_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_WEBHOOK_SECRET=  # 步骤 5 填
```

### 3. Checkout API（15 分钟）
`app/api/checkout/route.ts`：
```ts
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { email } = await req.json();
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: "price_xxx", quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
    customer_email: email,
  });
  return Response.json({ url: session.url });
}
```

前端按钮：
```tsx
async function checkout() {
  const res = await fetch("/api/checkout", {
    method: "POST",
    body: JSON.stringify({ email: user.email }),
  });
  const { url } = await res.json();
  window.location.href = url;
}
```

### 4. 用 test card 测试
信用卡号：`4242 4242 4242 4242` · 有效期：任意未来日期 · CVC：任意 3 位数 · ZIP：任意
→ 应跳到你的 `/success` 页面

### 5. Webhook（15 分钟）
**本地开发用 Stripe CLI 转发**：
```bash
# 装 Stripe CLI（https://stripe.com/docs/stripe-cli）
stripe login

# 启动转发
stripe listen --forward-to localhost:3000/api/webhooks/stripe
# → 输出 whsec_xxx，填进 .env.local 的 STRIPE_WEBHOOK_SECRET
```

`app/api/webhooks/stripe/route.ts`：
```ts
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  const event = stripe.webhooks.constructEvent(
    body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    // 在 Supabase 把用户标记成 pro
    // await supabase.from("users").update({ plan: "pro" }).eq("email", session.customer_email);
    console.log("付款成功:", session.customer_email);
  }

  return Response.json({ received: true });
}
```

### 6. 部署后配生产 Webhook
- Stripe Dashboard → Developers → Webhooks → Add endpoint
- URL：`https://yourdomain.com/api/webhooks/stripe`
- Events：`checkout.session.completed`、`invoice.paid`、`customer.subscription.updated/deleted`
- 复制 `whsec_xxx` 配到 Vercel 环境变量

✅ **完成标志**：用户付款 → 你 webhook 收到事件 → 数据库标 pro。

---

## W-04 · 配自定义域名

### 1. 买域名（5 分钟）
- **海外**：Cloudflare Domains（成本价）/ Namecheap / Porkbun
- **国内**：阿里云万网 / 腾讯云 DNSPod

### 2. 在 Vercel 加域名
1. Project → Settings → Domains
2. 输入 `yourdomain.com` → Add
3. Vercel 显示需要配置 2 条 DNS

### 3. 在域名注册商加 DNS
```
A     @     76.76.21.21
CNAME www   cname.vercel-dns.com
```

> 如果用 Cloudflare DNS，注意"代理模式"要关闭（橙色云朵 → 灰色云朵），否则 Vercel 验证失败。

### 4. 等 DNS 生效
- 通常 5 分钟到 2 小时
- 用 `dig yourdomain.com` 或 https://dnschecker.org 看是否全球生效

### 5. Vercel 自动签 SSL
- DNS 生效后 Vercel 自动 issue Let's Encrypt 证书
- 几分钟后浏览器锁图标绿了

### 6. 强制 www / 非 www
- Vercel Project Settings → Domains → 选哪个是 primary，另一个会自动 301

✅ **完成标志**：`https://yourdomain.com` 在浏览器打开 + 锁图标绿。

---

## W-05 · 配 Cursor + MCP（5 个起步 server）

> 详见 D-02 + skills-repo/mcp-configs.md（M-01 ~ M-08）

### 创建 `~/.cursor/mcp.json`（macOS / Linux）

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/yourname/projects/my-app"
      ]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxxxxxxxxxxx"
      }
    },
    "supabase": {
      "command": "npx",
      "args": [
        "-y",
        "@supabase/mcp-server-supabase@latest",
        "--read-only",
        "--project-ref=abcdefghij"
      ],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "sbp_xxx"
      }
    },
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    },
    "fetch": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch"]
    }
  }
}
```

### Windows 路径
```json
"args": [..., "C:\\Users\\yourname\\projects\\my-app"]
```

### 验证步骤
1. **重启 Cursor**
2. Settings → Cursor Settings → MCP → 应该看到 5 个绿点
3. 在 chat 里说 "列出 my-app 仓库最近 3 个 issue" → AI 调用 GitHub MCP

### 故障排查
- npx 找不到 → 重装 Node.js + 重启终端
- Windows 报 "command not found" → 把 `command: "npx"` 改成 `command: "cmd"` + args 开头加 `["/c", "npx", ...]`

✅ **完成标志**：5 个 MCP server 都绿，AI 能正常调用。

---

## W-06 · AI 流式输出（Vercel AI SDK）

### 1. 装 SDK
```bash
pnpm add ai @ai-sdk/openai
```

`.env.local`：
```
OPENAI_API_KEY=sk-xxx
```

> 接 DeepSeek / 国产模型：用 `@ai-sdk/openai-compatible` 或自定义 base URL，详见 B-07。

### 2. API 路由
`app/api/chat/route.ts`：
```ts
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const runtime = "edge";   // 可选，更低延迟

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages,
  });
  return result.toDataStreamResponse();
}
```

### 3. 前端
`app/chat/page.tsx`：
```tsx
"use client";
import { useChat } from "ai/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="space-y-4 mb-4">
        {messages.map((m) => (
          <div key={m.id} className={m.role === "user" ? "text-right" : "text-left"}>
            <div className="inline-block bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
              {m.content}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-lg"
          placeholder="说点啥..."
          disabled={isLoading}
        />
      </form>
    </div>
  );
}
```

### 4. 验证
打开 `/chat` → 输入消息 → 看到打字机效果。

✅ **完成标志**：流式逐字输出，无白屏等待。

---

## W-07 · SEO 基础（让 Google 收录）

### 1. 每页设 title + description
`app/page.tsx`：
```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VibeMaker | 给独立开发者的 AI 学习站",
  description: "学 → 做 → 成。沿学习路径学 AI，用 vibe coding 工具动手，做完丢进发布广场宣发。",
  openGraph: {
    title: "VibeMaker",
    description: "...",
    images: ["/og-image.png"],
  },
  twitter: { card: "summary_large_image" },
};
```

### 2. 加 sitemap
`app/sitemap.ts`：
```ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://yourdomain.com", lastModified: new Date(), priority: 1 },
    { url: "https://yourdomain.com/about", priority: 0.8 },
    { url: "https://yourdomain.com/pricing", priority: 0.8 },
    // ...
  ];
}
```

### 3. 加 robots
`app/robots.ts`：
```ts
export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://yourdomain.com/sitemap.xml",
  };
}
```

### 4. 提交给搜索引擎
- Google Search Console：https://search.google.com/search-console
- Bing Webmaster Tools：https://www.bing.com/webmasters
- 国内：百度站长 / 必应站长
- 加站点 → 验证（HTML 标签 / DNS）→ 提交 sitemap

### 5. 写 og-image
- 1200×630 PNG
- 工具：https://og-playground.vercel.app / Figma / Cursor 生成
- 放 `public/og-image.png`

### 6. 检查
- 用 https://metatags.io/ 预览 OG 标签
- Google Search Console "URL inspection" 看是否被抓取

✅ **完成标志**：1-2 周后 google "site:yourdomain.com" 能搜到。

---

## W-08 · 错误监控（Sentry 最快）

### 1. 注册 Sentry
- https://sentry.io 注册（免费档够独立开发者）
- 创建 Project → 选 Next.js
- 拿到 DSN（一串 URL）

### 2. 装 + 配
```bash
pnpm dlx @sentry/wizard@latest -i nextjs
```
按提示走完——会自动改你的 `next.config.js`、加 `sentry.*.config.ts`、配 `.env.sentry-build-plugin`。

### 3. 测试
临时加一个会报错的路由：
```tsx
// app/sentry-test/page.tsx
export default function Test() {
  throw new Error("test sentry");
}
```
访问 `/sentry-test` → Sentry Dashboard 应该看到这个错误。

### 4. 部署 + 配 Source Maps
- 把 `SENTRY_AUTH_TOKEN` 加到 Vercel env vars
- 部署后报错堆栈会自动 source map 解析（看到的是原始 TS/TSX 文件名）

### 5. 配 Slack / Email alert
- Sentry Project → Settings → Alerts → 创建 alert 规则
- 比如："每天超过 10 个新错误 → 发 Slack"

### 替代方案
- **更便宜 / 开源**：Highlight (highlight.io) / GlitchTip / Self-hosted Sentry
- **更轻量**：直接用 Vercel Logs（免费档够小项目）

✅ **完成标志**：你的产品任何用户报错都会在 Sentry / Slack 收到通知。

---

## 怎么用这些 workflow？

1. **不要全做完一遍再开始**：W-01 跑通 → 直接动手做你的产品 → 遇到具体需求再回来翻 W-02/W-03 等
2. **每个 workflow 留 30% 缓冲时间**：第一次做总会卡，别给自己上压力
3. **跑不通就让 AI debug**：把报错丢给 Cursor，引用对应卡片
4. **做完一个发朋友圈**：是给自己最大的多巴胺奖励

---

**最后更新**：2026-06-23 · 命令 / 包名以官方文档为准
