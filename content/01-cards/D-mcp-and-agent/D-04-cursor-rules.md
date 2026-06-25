---
group: D-mcp-and-agent
card_id: D-04
title: Cursor Rules (.cursorrules)
difficulty: ⭐
last_updated: 2026-06-23
status: 已核实
related: [A-04, C-01, D-02]
---

# D-04 Cursor Rules (.cursorrules / .cursor/rules/)

## 一句话定义
Cursor Rules 是放在项目根目录的"AI 行为规范文件"——里面写的所有规则，**每次 Cursor 调用 LLM 都会自动注入到 System Prompt**，让 AI 按你的规则生成代码（用什么技术栈、用什么风格、避开什么坑）。

## 打个比方
**像新员工入职手册**：你不可能每次给员工派活儿都把"我们用 TypeScript 不用 JavaScript""所有函数要写 JSDoc""提交前要跑 lint" 重复一遍。把这些写进员工手册，他默认遵守。Cursor Rules 就是 AI 的员工手册。

## 和 vibe coding 的关系
- **决定你项目代码风格统一度的最重要单一文件**
- 没写 Cursor Rules → AI 每次生成代码风格都不一样、用错技术栈、忘记你的约定
- 写好 Cursor Rules → 项目代码看起来像一个人写的（即使 AI 写了 90%）

## 典型场景 / 示例

### 两种形态

**老形态**（仍兼容）：项目根目录单文件 `.cursorrules`：
```
# Tech Stack
- Next.js 14 (App Router)
- TypeScript strict mode
- Tailwind CSS + shadcn/ui
- Supabase (Postgres + Auth)
- Stripe for payments

# Code Style
- Always use functional components, never class components
- Prefer named exports over default exports
- Use `cn()` helper for conditional Tailwind classes
- Database queries must go through `lib/supabase/server.ts`

# Don'ts
- Never use Pages Router
- Never put secrets in client components
- Never call Stripe API from browser
```

**新形态**（推荐）：`.cursor/rules/` 目录下多个 `.mdc` 文件，每个文件带 metadata 决定何时生效：

`.cursor/rules/nextjs.mdc`：
```markdown
---
description: Next.js App Router 通用规则
globs: ["app/**/*.tsx", "app/**/*.ts"]
alwaysApply: false
---
- Always use Server Components by default
- Mark client components explicitly with "use client"
- Fetch data in Server Components, not in client
- Use `next/link` for internal navigation
```

`.cursor/rules/security.mdc`：
```markdown
---
description: 安全相关规则，所有代码生效
globs: ["**/*"]
alwaysApply: true
---
- Never log secrets, API keys, or PII
- Always validate user input on server side
- Use parameterized queries, never string concatenation in SQL
```

### 一个独立开发者起步用的最小 `.cursorrules`

```
You are a senior full-stack developer working on a SaaS for 独立开发者.

Tech stack:
- Next.js 14 App Router + TypeScript strict
- Tailwind + shadcn/ui
- Supabase (auth + Postgres)
- Stripe for billing
- Deployed on Vercel

Always:
- Write TypeScript with strict types (no `any`)
- Use server actions instead of API routes when possible
- Add a comment for any non-obvious business logic
- Reply explanations in Chinese, write code comments in English

Never:
- Use class components
- Put secrets in client-side code
- Use `eval()`, `dangerouslySetInnerHTML` without explicit comment why

When fixing bugs:
- Show me the root cause before the fix
- Add a regression test if applicable
```

### 在哪儿能找现成的 Cursor Rules？

- [awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules) — 社区收集的各种技术栈的 cursorrules
- [cursor.directory](https://cursor.directory/) — 网页版搜索 + 复制
- Cursor 官方 docs 也提供官方推荐示例

## 常见误区
- ❌ **"Cursor Rules 越长越好"**：每条规则都吃 token。重点写"你最容易踩的坑"和"非标准约定"，**通用最佳实践不用写**（AI 默认就懂）。
- ❌ **"放在 README 里也算"**：不算。**必须是 `.cursorrules` 或 `.cursor/rules/*.mdc`**，Cursor 才会自动注入到 System Prompt。
- ❌ **"Cursor Rules 只能 Cursor 用"**：原生只在 Cursor 生效；但很多人会**同时再放一份到 `CLAUDE.md`**（Claude Code 的同等机制）和 `AGENTS.md`（通用 Agent 约定）。
- ❌ **"写完一次就不用动"**：项目演进中，你会发现"AI 又犯了一个新错"。把那个错的规则补到 .cursorrules，下次就不犯了——**这个文件是动态成长的**。

## 延伸阅读

### 📺 视频教程
- [Cursor Rules 完全指南 (YouTube)](https://www.youtube.com/watch?v=1WS912rT3gA) `[英 · ⭐⭐ · 免费 · 2024 · 18min]` .cursorrules 配置与最佳实践
- [Cursor Rules 中文教程 (B站)](https://www.bilibili.com/video/BV1ZM4m1y7Pm) `[中 · ⭐⭐ · 免费 · 2024 · 20min]` 中文社区 Cursor Rules 使用指南
- [awesome-cursorrules 使用演示 (YouTube)](https://www.youtube.com/watch?v=3UCtX1E0DOs) `[英 · ⭐⭐ · 免费 · 2024 · 12min]` 现成模板使用方法

### 📰 文章与工具
- [Cursor Rules 官方文档](https://docs.cursor.com/context/rules) `[英 · ⭐⭐ · 免费 · 持续更新]`
- [awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules) `[英 · ⭐⭐ · 免费 · 持续更新]` 40K+ stars，现成模板大全
- [cursor.directory](https://cursor.directory/) `[英 · ⭐ · 免费 · 持续更新]` 可搜索的网页版
- `03-skills-repo/cursor-rules.md`（提供 6 套可复制的 Cursor Rules）

## 去问 AI
> 「我做的是 Next.js + Supabase + Stripe + Tailwind 的 SaaS，部署在 Vercel。请帮我写一份完整的 `.cursorrules`：包括技术栈约定、命名规范、安全规则、调试时的行为要求。重点是把 AI 容易犯的错（用错 Router、忘记 server / client 边界、把 secret 放前端）固化下来。」

---
**来源**：① https://docs.cursor.com/context/rules  ② https://github.com/PatrickJS/awesome-cursorrules
**查询日期**：2026-06-23 · **数据来源时间**：2024-2026
