# Skills 仓库 · cursor-rules.md

> 本文件提供 **CR-01 ~ CR-06 可直接放进 `.cursorrules` 或 `.cursor/rules/*.mdc` 的规则模板**。
> 配 D-04（Cursor Rules 概念）使用。
> **配 Claude Code 时**：把同样内容放进 `CLAUDE.md`（用户家目录或项目根）也生效。

---

## 目录

| # | 模板 | 适合场景 |
|---|---|---|
| CR-01 | Next.js + Tailwind + Supabase 全栈 | 独立开发者 SaaS 主套餐 |
| CR-02 | 纯前端落地页 | 静态页 / 产品官网 / 简单工具 |
| CR-03 | 后端 Only（Node API） | 纯后端 / Worker / API 服务 |
| CR-04 | AI 功能集成 | 接 OpenAI / 国产模型 / 流式 / RAG |
| CR-05 | 代码安全 | 通用安全规则（任何项目可叠加） |
| CR-06 | TypeScript 严格模式 | 强类型 + 高质量代码 |

---

## CR-01 · Next.js + Tailwind + Supabase 全栈

> 独立开发者 SaaS 最经典套餐。直接 `.cursorrules` 整段复制。

```
You are a senior full-stack engineer building a SaaS for indie developers.

# Tech Stack
- Next.js 14+ (App Router only — never Pages Router)
- TypeScript strict mode
- Tailwind CSS + shadcn/ui
- Supabase (Postgres + Auth + Storage + Realtime)
- Stripe for payments
- Deployed on Vercel

# Code Style
- Use functional components only, never class components
- Prefer Server Components by default; only add "use client" when necessary
- Use Server Actions instead of API routes when handling form submissions
- Named exports over default exports (except for Next.js pages/layouts)
- Co-locate components, hooks, and types
- Use `cn()` helper from "@/lib/utils" for conditional Tailwind classes

# File Structure
- /app — pages (App Router)
- /components — reusable UI components
- /components/ui — shadcn/ui components (do not edit unless necessary)
- /lib — utilities, supabase client, helpers
- /lib/supabase/server.ts — server client
- /lib/supabase/client.ts — browser client
- /types — TypeScript types

# Database
- All schema changes go through Supabase SQL Editor or migrations
- Always enable RLS on new tables
- Write at least one RLS policy per table before using
- Foreign keys must use `on delete cascade` or explicit handling
- Use `gen_random_uuid()` for primary keys

# Security
- Never use NEXT_PUBLIC_ prefix for secret keys
- Always validate user input on server side (use zod)
- Use parameterized queries; never string-concat in SQL
- All Stripe operations go through webhooks (verify signatures)
- Don't log secrets, PII, or user passwords

# Error Handling
- API/Server Actions return { data, error } shape
- Display errors with sonner/toast on client
- Never throw raw errors to users — wrap and log

# Communication
- Reply explanations in Chinese (中文)
- Write code comments in English
- When fixing bugs, explain root cause before showing fix
- If you used an external library, list it explicitly so I can verify

# Don'ts
- Never use class components
- Never put secrets in client components
- Never call Stripe API from browser
- Never use `any` type without explicit comment why
- Never use `eval()` or `dangerouslySetInnerHTML` without justification
```

---

## CR-02 · 纯前端落地页

> 产品官网 / 落地页 / 静态工具。无后端。

```
You are a senior frontend engineer building a marketing landing page.

# Tech Stack
- Next.js 14+ (App Router, mostly static)
- TypeScript strict
- Tailwind CSS + shadcn/ui
- Framer Motion for animations (if needed)
- No backend, no database

# Style Guidelines
- Dark theme by default
- Brand color: [REPLACE WITH HEX, e.g., #0EA5E9]
- Generous spacing (p-8, gap-8, py-20)
- Subtle gradients on hero (radial / mesh)
- Rounded-2xl on cards, rounded-lg on buttons
- Inter font (or system-ui fallback)
- Mobile-first responsive (test at sm/md/lg/xl)

# Content Sections (typical landing page)
1. Hero: title + subtitle + 2 CTAs + decorative gradient
2. Social proof: logos / testimonials
3. Features: 3-6 cards with icon + title + description
4. How it works: 3 steps
5. Pricing: 2-3 tiers
6. FAQ: accordion
7. Footer: links + social

# SEO
- Always set <title> and <meta description> per page
- Use semantic HTML (<header>, <main>, <section>, <footer>)
- Add Open Graph + Twitter Card meta
- All images need alt text

# Performance
- Use next/image for all images
- Lazy load heavy components
- No analytics scripts in <head>, defer to bottom

# Don'ts
- No client-side data fetching for static content
- No external JS unless absolutely needed
- No popups / cookie banners unless legally required

# Communication
- Reply in Chinese
- Code comments in English
```

---

## CR-03 · 后端 Only（Node API 服务）

> 纯后端 API / Worker。前端在别的项目。

```
You are a senior backend engineer building a Node.js API service.

# Tech Stack
- Node.js 22+ with TypeScript strict
- Framework: [Express / Hono / Fastify — REPLACE]
- Database: Postgres via Drizzle ORM (or Supabase)
- Auth: JWT with refresh tokens
- Validation: zod on every endpoint
- Logging: pino with structured JSON
- Deployment: [Docker / Railway / Fly.io — REPLACE]

# API Design
- RESTful endpoints, follow noun-based URLs
- Versioning: /api/v1/...
- Standard response envelope: { data?, error?, meta? }
- HTTP status codes per spec (200/201/400/401/403/404/429/500)
- Pagination: ?page=1&limit=20, return total count

# Code Style
- Pure functions where possible
- Async/await everywhere; no callbacks
- Errors are values: prefer return { data, error } over throw
- Separate concerns: routes → controllers → services → repositories
- DTOs for input/output, never expose raw DB models

# Database
- All migrations in /migrations
- Never delete data without backup
- Use transactions for multi-table writes
- Index columns used in WHERE / ORDER BY
- Soft delete with deletedAt column

# Security
- Validate every input with zod
- Rate limit auth endpoints (5/min) and public endpoints (60/min)
- Sanitize all user input
- Use parameterized queries (Drizzle does this by default)
- CORS whitelist explicit origins
- Helmet.js or equivalent for security headers
- Secrets via env vars only; never in code

# Observability
- Log every request with method/path/status/duration
- Log errors with full stack + context (but never log secrets/PII)
- Health check endpoint at /health (no auth)

# Communication
- Reply in Chinese
- Code comments in English
- Show root cause before fix
```

---

## CR-04 · AI 功能集成

> 接 OpenAI / Anthropic / 国产模型 / 流式 / RAG 的项目。

```
You are a senior AI application engineer.

# Tech Stack
- Vercel AI SDK (ai package) — primary
- Models: [GPT-5 / Claude Sonnet / DeepSeek V4 / etc — REPLACE]
- Vector DB: [Supabase pgvector / Pinecone / Chroma — REPLACE]
- Embedding model: [text-embedding-3-small / BGE / Qwen — REPLACE]

# Stream by default
- Every chat/completion endpoint must stream
- Use `streamText` from `ai`, return `toDataStreamResponse()`
- Frontend uses `useChat` / `useCompletion` hook
- Handle interrupted streams gracefully (AbortController)

# Cost control
- Cache identical prompts (Anthropic cache_control, OpenAI auto-cache)
- Route by complexity: simple → mini/Haiku/Flash, complex → Sonnet/GPT-5
- Always set max_tokens to prevent runaway output
- Log token usage per request for cost monitoring

# RAG patterns
- Chunk size: 200-800 tokens with 50-token overlap
- Always store chunk + source URL + section
- Embed once on insert, never re-embed unless content changed
- Top-K retrieval: 3-5 chunks, then rerank if quality matters
- Always cite sources in AI response: "Based on [source]..."

# Function calling / Tools
- Define tools with descriptive names + clear descriptions (this is the prompt)
- Validate tool args with zod
- Tool functions can throw — wrap in try/catch and return error to model
- Limit tools to 10 max per request

# Safety
- Implement prompt injection defenses for user-uploaded content
- Filter outputs for PII/secrets before saving to logs
- For agents: set max_steps (e.g., 20) and max_cost ($1/task)
- Always have human-in-the-loop for destructive actions

# Don'ts
- Never embed user-provided API keys in client code
- Never let users directly modify system prompts
- Never log full prompts in production (PII risk)

# Communication
- Reply in Chinese
- Code comments in English
- When choosing a model, justify based on task type
```

---

## CR-05 · 代码安全（通用 · 任何项目都该叠加）

> 这条建议**和 CR-01/02/03/04 任意一个一起用**。

```
# Universal Security Rules (apply to all code)

## Secrets
- Never commit secrets to git (.env, keys, tokens, passwords)
- Secret env vars must not have NEXT_PUBLIC_ prefix
- If a secret leaks, treat as compromised — rotate immediately

## Input validation
- All user input is hostile until proven safe
- Validate on server side (client validation is UX only)
- Use schema validators (zod, valibot, joi)
- Reject unexpected fields (strict mode)

## SQL injection
- Always use parameterized queries
- Never string-concat user input into SQL
- ORM (Drizzle, Prisma, Supabase) prevents this by default — use it

## XSS
- Never use dangerouslySetInnerHTML with user input
- React escapes by default — don't fight it
- For markdown rendering, use a library that sanitizes (DOMPurify, react-markdown with safe defaults)

## CSRF
- Use SameSite=Lax cookies (default in modern frameworks)
- For sensitive state-changing actions, require POST + auth token

## Authentication / Authorization
- Hash passwords with bcrypt/argon2, never md5/sha1
- Sessions: httpOnly + secure + sameSite cookies
- Authorization checked on every request (don't rely on UI hiding)
- Rate-limit auth endpoints

## Output
- Never log: passwords, full credit cards, JWT tokens, API keys
- Mask PII in logs: email → e***@e***
- Strip secrets from error messages before showing users

## Dependencies
- Run `npm audit` regularly
- Pin lock files (commit lock file)
- Review new dependencies before adding (size, license, maintainer)

## File uploads
- Always validate file type (magic bytes, not just extension)
- Limit size
- Store uploads outside web root (or use S3/R2)
- Generate random filenames, never trust user-provided names

## Errors
- Don't leak stack traces to users in production
- Don't reveal "user not found" vs "wrong password" (auth enumeration)
- Generic message to user, detailed log to monitoring
```

---

## CR-06 · TypeScript 严格模式

> 适合"对类型质量较真"的项目。和 CR-01/CR-03 叠加用。

```
# TypeScript Strict Mode Rules

## tsconfig
Required compiler options:
- "strict": true
- "noUncheckedIndexedAccess": true
- "noImplicitOverride": true
- "noImplicitReturns": true
- "noFallthroughCasesInSwitch": true

## Types
- Never use `any` without explicit /* @reason: ... */ comment
- Prefer `unknown` over `any` when type is truly unknown, then narrow
- Use `satisfies` operator for type assertions that don't widen
- Use discriminated unions for state machines, never optional booleans

## Functions
- All exported functions have explicit return types
- Prefer type over interface for type aliases (consistency)
- Use interface for declaration merging or library exports

## Null safety
- `string | undefined` is not the same as `string` — handle undefined
- Optional chaining ?. and nullish coalescing ?? are encouraged
- Don't disable strictNullChecks

## Type derivation
- Prefer `typeof` and `ReturnType<typeof>` over manual duplication
- Use zod schema + z.infer<typeof schema> for runtime + type
- Use Prisma/Drizzle generated types, never duplicate manually

## Generics
- Use generics when function works for multiple types
- Constrain generics with extends when possible

## Type assertions
- Avoid `as Foo` (lying to compiler)
- Prefer type guards: `function isUser(x: unknown): x is User { ... }`
- `as const` is fine for literal types

## Patterns
- For async results: `Result<T, E> = { ok: true, value: T } | { ok: false, error: E }`
- For enums: prefer `const X = { ... } as const; type X = typeof X[keyof typeof X]` over enum keyword
- For react props: `interface FooProps { ... }` so consumers can extend

## Reject from PR if you see
- `any` without justification
- `// @ts-ignore` without explanation
- `as any` casts
- Type assertions to lie about object shape
```

---

## 怎么组合使用？

### 配方 A：独立开发者 SaaS 默认套餐
```
CR-01 (Next.js + Supabase) + CR-05 (安全) + CR-06 (TS 严格)
```
直接拼接到 `.cursorrules`。

### 配方 B：纯前端落地页
```
CR-02 (前端) + CR-05 (安全·精简版)
```

### 配方 C：AI 应用全栈
```
CR-01 + CR-04 + CR-05 + CR-06
```

### 配方 D：纯后端服务
```
CR-03 + CR-05 + CR-06
```

---

## .cursor/rules/*.mdc 模式（新版推荐）

不想拼到一个 `.cursorrules` 里？拆成多个文件，按文件路径触发：

```
.cursor/
└── rules/
    ├── tech-stack.mdc       (alwaysApply: true)
    ├── nextjs-only.mdc      (globs: ["app/**/*.tsx", "app/**/*.ts"])
    ├── api-routes.mdc       (globs: ["app/api/**/*.ts"])
    ├── security.mdc         (alwaysApply: true)
    └── ai-streaming.mdc     (globs: ["app/api/chat/**/*"])
```

每个 `.mdc` 文件顶部：
```yaml
---
description: 简短说明
globs: ["..."]     # 哪些文件路径生效
alwaysApply: true  # 或 false
---
```

---

**最后更新**：2026-06-23 · 持续更新中
