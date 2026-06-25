---
group: F-backend-database
card_id: F-05
title: 环境变量 .env
difficulty: ⭐
last_updated: 2026-06-23
status: 已核实
related: [F-03, F-08, G-01]
---

# F-05 环境变量 .env

## 一句话定义
环境变量 = **"不写进代码、但代码运行时能读到"的配置**——典型场景是 API key、数据库密码、第三方 service 的 URL 等"不能提交到 git 的秘密"。在 Next.js / Node.js 里通常存在 `.env.local` 或 `.env` 文件。

## 打个比方
**像家里的"钥匙抽屉"**：
- 你不会把家门钥匙刻在房子大门上（不写进代码）
- 也不会把钥匙复印 50 份发给所有人（不提交到 git）
- 钥匙放抽屉，自己人在的时候去拿（代码运行时 `process.env.KEY` 读取）

## 和 vibe coding 的关系
- 接 Supabase / Stripe / OpenAI 的第一步：把 API key 放 `.env.local`
- AI 经常忘提示你"把 key 放到 .env" → **自己要警觉**
- 上线到 Vercel 等平台时 → 把 .env 里的值"复制"到平台的环境变量设置页

## 典型场景 / 示例

### 一个真实 .env.local

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1...

# Stripe
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxx

# OpenAI / 国产模型
OPENAI_API_KEY=sk-xxxxxxxxxxxxxx
DEEPSEEK_API_KEY=sk-xxxxxxxxxxxxx

# 站点配置
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# 数据库直连（如果用 Drizzle / Prisma）
DATABASE_URL=postgresql://user:pass@host:5432/dbname
```

### Next.js 里读取

```ts
// 在 Server Component / API 路由 / Server Action 里
const apiKey = process.env.OPENAI_API_KEY;

// 在 Client Component 里只能读 NEXT_PUBLIC_ 前缀的
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
```

> **Next.js 关键规则**：
> - `NEXT_PUBLIC_*` 前缀的变量会被打包进前端 bundle（任何人都能在浏览器看到）
> - **不带前缀的只在服务端可用**——任何 secret（service_role_key、stripe secret、OPENAI_API_KEY）**必须不带前缀**

### `.gitignore` 必加这一行

```
.env*.local
.env
```

只把 `.env.example`（模板，不含真值）提交到 git。

### `.env.example`（团队协作模板）

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
OPENAI_API_KEY=
```

新成员 clone 项目后：`cp .env.example .env.local`，自己填值。

### 部署时怎么配？

| 平台 | 在哪儿配 |
|---|---|
| **Vercel** | Project Settings → Environment Variables |
| **Netlify** | Site settings → Environment variables |
| **Railway** | Project → Variables |
| **Cloudflare Pages** | Settings → Environment variables |

每次改了环境变量，**通常要重新部署一次才生效**。

### 多环境

| 文件 | 用途 |
|---|---|
| `.env.local` | 本地开发，**最高优先**（永不提交） |
| `.env.development` | dev 环境共享 |
| `.env.production` | prod 环境（一般用平台后台代替） |
| `.env` | 默认，兜底 |

## 常见误区
- ❌ **"把 key 提交到 git 没事，仓库 private"**：仍然非常危险——员工泄露 / 仓库变 public / 历史记录被扒。**永远不要提交 secret**。
- ❌ **"NEXT_PUBLIC_ 前缀的也是 secret"**：错。前端能读 = 全世界能读。**真正的 secret 千万别加这个前缀**。
- ❌ **"客户端能直接调 OpenAI"**：等于把 API key 贴在首页。**必须通过你后端的 API 路由中转**。
- ❌ **"key 泄露了改一下就好"**：通常要去厂家控制台**作废旧 key + 重新生成**。代码里还要全检一遍。
- ❌ **"改 .env 后立刻生效"**：通常要**重启 dev server**（Ctrl+C 后再 `npm run dev`），Next.js 不会热加载 .env。

## 紧急情况：key 不小心提交到 git 怎么办？

1. **立即去厂家控制台作废这个 key**（最重要！比清 git 历史还急）
2. 重新生成新 key
3. 用 [git-filter-repo](https://github.com/newren/git-filter-repo) 或 BFG Repo-Cleaner 清除历史中的 key
4. force push 到所有分支
5. 告知所有 clone 过仓库的人重新 clone

## 延伸阅读
- [Next.js 环境变量文档](https://nextjs.org/docs/app/guides/environment-variables) `[英 · ⭐ · 免费 · 持续更新]`
- [12 Factor App: Config](https://12factor.net/zh_cn/config) `[中 · ⭐⭐ · 免费 · 常青]` "配置应该从代码分离"的经典论述
- [dotenv 文档](https://www.npmjs.com/package/dotenv) `[英 · ⭐ · 免费 · 持续更新]`
- F-03 Supabase · F-08 Stripe · G-01 Vercel（部署时怎么配）

## 去问 AI
> 「我项目里要接 Supabase + Stripe + OpenAI。请帮我：(1) 列出我需要哪些环境变量；(2) 哪些必须 NEXT_PUBLIC_，哪些绝对不能；(3) 给我一份完整 .env.example；(4) 在 Vercel 部署时这些值要在哪儿配。」

---
**来源**：① Next.js 官方  ② 12factor.net  ③ dotenv
**查询日期**：2026-06-23 · **数据来源时间**：常青
