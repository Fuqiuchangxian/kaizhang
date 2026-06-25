---
group: E-frontend
card_id: E-05
title: Next.js
difficulty: ⭐⭐
last_updated: 2026-06-23
status: 已核实
related: [E-04, E-06, F-03, G-01]
---

# E-05 Next.js

## 一句话定义
Next.js 是 Vercel 出品的"**React 全栈框架**"——它在 React 之上提供文件式路由、Server Components、API 路由、SSR / SSG、图像优化、Edge runtime 等"开箱即用"的能力，**让你只用一个项目就能同时写前端和后端**。

## 打个比方
- **React** = 单独的"建筑材料"——能砌墙但还要你自己设计水电
- **Next.js** = "精装毛坯房"——水电（路由、API）、家电（图像优化、缓存）已经接好，你只管装修

## 和 vibe coding 的关系
- **2026 年 vibe coding 默认全栈框架**——Cursor / v0 / Lovable / Bolt 几乎一律生成 Next.js
- 配上 Supabase（F-03）+ Stripe（F-08）+ Vercel（G-01）= 独立开发者经典套餐
- "App Router"（新版）是当前 2026 主流

## 典型场景 / 示例

### 最小项目结构（App Router）

```
my-app/
├── app/
│   ├── layout.tsx          # 全局布局
│   ├── page.tsx            # 首页 /
│   ├── about/page.tsx      # /about 路由
│   ├── api/
│   │   └── hello/route.ts  # API 路由 /api/hello
│   └── globals.css
├── components/
│   └── Button.tsx
├── lib/
│   └── supabase.ts
├── package.json
└── next.config.js
```

**核心约定**：文件夹 = 路由；`page.tsx` = 页面；`route.ts` = API 端点；`layout.tsx` = 嵌套布局。

### 最简页面

```tsx
// app/page.tsx —— Server Component（默认）
export default async function Home() {
  const posts = await fetch("https://api.example.com/posts")
    .then(r => r.json());

  return (
    <main>
      <h1>最新文章</h1>
      <ul>
        {posts.map((p: any) => <li key={p.id}>{p.title}</li>)}
      </ul>
    </main>
  );
}
```

注意：**直接在组件里 `await fetch`**——这是 Server Component 才能做的。

### 最简 API 路由

```ts
// app/api/hello/route.ts
export async function GET(req: Request) {
  return Response.json({ hello: "world" });
}

export async function POST(req: Request) {
  const body = await req.json();
  return Response.json({ received: body });
}
```

访问 `/api/hello` 就能拿到 JSON 响应。

### Server Actions（最新方式：处理表单提交不用单写 API）

```tsx
// app/contact/page.tsx
async function submit(formData: FormData) {
  "use server";
  const name = formData.get("name");
  // 直接在 server 上跑：写数据库 / 调外部 API
  await db.contact.create({ data: { name: String(name) } });
}

export default function ContactPage() {
  return (
    <form action={submit}>
      <input name="name" />
      <button>提交</button>
    </form>
  );
}
```

### 部署最快路径
1. `npx create-next-app@latest my-app`
2. push 到 GitHub
3. 在 Vercel 点 "Import" 选你这个 repo
4. **完成**（详见 G-01）

## 常见误区
- ❌ **"Pages Router vs App Router"**：**新项目永远用 App Router**（`app/` 目录）。Pages Router（`pages/` 目录）是旧的，仍支持但 AI 写法不同，**写在 .cursorrules 里强制 App Router** 避免 AI 老用旧的。
- ❌ **"Next.js = 必须用 Vercel 部署"**：不是。可以部署到任何 Node.js 主机（Cloudflare、Netlify、Railway、自建 docker）。Vercel 只是最丝滑。
- ❌ **"`"use client"` 越多越好"**：相反——Server Components 是默认，**只在必须用 useState/onClick 的组件加 "use client"**。能用 Server 的就别 Client。
- ❌ **"App Router 比 Pages Router 慢"**：相反——Server Components 减少 JS bundle 体积，**性能通常更好**。
- ❌ **"middleware 任何事都能干"**：Edge middleware 跑在边缘节点，**不能用 Node API（fs、crypto 等）**。容易踩坑。

## 延伸阅读

### 📺 视频教程
- [Next.js 官方教程 (YouTube)](https://www.youtube.com/watch?v=__mSgDEOyv8) `[英 · ⭐⭐ · 免费 · 2024 · 1h]` Next.js 官方入门教程
- [Next.js 14 App Router 完整教程 (YouTube)](https://www.youtube.com/watch?v=ZVnjDlHP3vY) `[英 · ⭐⭐ · 免费 · 2024 · 2h]` App Router 深度讲解
- [Next.js 入门到实战 (B站)](https://www.bilibili.com/video/BV1Zg411T71E) `[中 · ⭐⭐ · 免费 · 2023 · 系列]` 中文 Next.js 系统教程
- [Next.js + Supabase 全栈实战 (YouTube)](https://www.youtube.com/watch?v=8KJtTvbRygM) `[英 · ⭐⭐ · 免费 · 2024 · 45min]` 独立开发者经典套餐
- [Dave Gray · Next.js Full Course](https://www.youtube.com/watch?v=ZVnjDlHP3vY) `[英 · ⭐⭐ · 免费 · 2024 · 系列]` 系统全栈课程

### 📰 文章
- [Next.js 官方文档（含中文）](https://nextjs.org/docs) `[英 · ⭐⭐ · 免费 · 持续更新]` 最权威
- [Next.js 中文文档（社区维护）](https://www.nextjs.cn/docs) `[中 · ⭐⭐ · 免费 · 持续更新]`
- [Next.js Learn 课程](https://nextjs.org/learn) `[英 · ⭐⭐ · 免费 · 持续更新]` 官方互动教程
- [Vercel 模板库](https://vercel.com/templates) `[英 · ⭐ · 免费 · 持续更新]` 各种现成模板
- E-04 React · E-06 Tailwind · E-07 shadcn/ui · F-03 Supabase
- G-01 Vercel 部署全流程

## 去问 AI
> 「我刚 `npx create-next-app` 出来一个新项目。请教我接下来 1 小时做什么：(1) 看哪个文件先；(2) 把首页改成自己写的；(3) 加一个 `/about` 页面；(4) 加一个调外部 API 的 server action。每一步都给我具体命令和代码。」

---
**来源**：① https://nextjs.org/docs  ② https://nextjs.org/learn
**查询日期**：2026-06-23 · **数据来源时间**：常青（Next.js 15+ / App Router 时代）
