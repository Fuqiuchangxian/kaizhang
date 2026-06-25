# VibeMaker 资料库（vibemaker-kb）

> 面向 **vibe coder**（用 AI 做产品的人，从零基础小白到独立开发者）的「学 → 做 → 成」一站式资料库。
> 主线：沿学习路径看知识卡片 → 不懂就问侧边栏 AI → 动手时取用 Skills 仓库 → 做完丢进发布广场宣发。

- **基准时间**：2026 年 6 月（所有易变数据均标注「查询日期：2026-06-23」）
- **维护原则**：真实第一，绝不编造 URL；交叉核实；中英双语；标注难度与时效；可追溯到来源

---

## 一、目录树

```
vibemaker-kb/
├─ README.md                        ← 本文件（总索引）
├─ 00-learning-path/
│   └─ learning-path.md              7 阶段学习主线（含 Mermaid 主线图）
├─ 01-cards/                         80 张知识卡片
│   ├─ A-ai-basics/                  AI 基础概念（12）
│   ├─ B-models-and-selection/       模型能力与选型（8，B 组 = 大脑）
│   ├─ C-vibe-coding-tools/          Vibe Coding 工具（16 + 决策树，C 组 = 驾驶舱）
│   ├─ D-mcp-and-agent/              MCP 与 Agent 增强（6）
│   ├─ E-frontend/                   前端基础（8）
│   ├─ F-backend-database/           后端与数据库（8）
│   ├─ G-deploy-and-launch/          部署与上线（13 + 选型表）
│   └─ H-marketing-monetize/         宣发与变现（8）
├─ 02-resources/
│   └─ resources.md                  分类外链导航 + 国内 AI 资讯专区
├─ 03-skills-repo/                   Skills 仓库（可复制资产）
│   ├─ prompts.md                    P-01~P-15 提示词模板
│   ├─ cursor-rules.md               CR-01~CR-06 Cursor Rules
│   ├─ mcp-configs.md                M-01~M-08 MCP 配置
│   ├─ starter-templates.md          T-01~T-06 起步模板
│   └─ workflows.md                  W-01~W-08 操作手册
└─ 04-launch-square/
    └─ seed-content.md               发布广场标签体系 + 8-10 条种子内容
```

---

## 二、B / C 边界约定（重要）

| 维度 | B 组 = 大脑 | C 组 = 驾驶舱 |
|---|---|---|
| 关心什么 | 哪个模型擅长什么任务、怎么挑、怎么接入 | 在哪写代码、怎么用 IDE、收费如何 |
| 不谈什么 | 不写"IDE 怎么用"（链到 C 组） | 不评比"哪个模型更聪明"（链到 B 组） |
| 卡片关联 | 通过 frontmatter 的 `related: [C-xx]` 字段互链 | 通过 `related: [B-xx]` 字段互链 |

---

## 三、完成度勾选表

### 模块一 · 学习路径
- [x] 00 `learning-path.md`（含 Mermaid 7 阶段主线图 ✅）

### 模块二 · 知识卡片（80 张）

**A 组 · AI 基础概念（常青档 · 12 张）**
- [x] A-01 LLM 是什么
- [x] A-02 Token 与上下文窗口
- [x] A-03 Prompt 提示词
- [x] A-04 System Prompt 系统提示词
- [x] A-05 模型幻觉
- [x] A-06 Function Calling / Tool Use
- [x] A-07 Agent 是什么
- [x] A-08 RAG 检索增强生成
- [x] A-09 向量数据库
- [x] A-10 流式输出 Streaming
- [x] A-11 Embedding 词向量
- [x] A-12 Prompt Engineering（Zero-shot / Few-shot / CoT）

**B 组 · 模型能力与选型（易变档 · 8 张）**
- [x] B-01 主流大模型全景图
- [x] B-02 任务→模型怎么挑：编程与写代码
- [x] B-03 任务→模型怎么挑：长文档 / 推理 / 中文 / 性价比
- [x] B-04 上下文窗口是什么、各模型多大、用满了会怎样
- [x] B-05 模型定价怎么读、token 怎么算、怎么省钱
- [x] B-06 闭源 vs 开源模型
- [x] B-07 国产模型 API 怎么接入
- [x] B-08 「任务→推荐模型」速查表

**C 组 · Vibe Coding 工具（易变档 · 16 张 + 决策树）**
- [x] C-01 Cursor
- [x] C-02 Claude Code (CLI)
- [x] C-03 Lovable
- [x] C-04 v0.dev
- [x] C-05 Bolt.new
- [x] C-06 Replit Agent
- [x] C-07 Windsurf
- [x] C-08 GitHub Copilot
- [x] C-09 Trae（字节）
- [x] C-10 通义灵码（阿里）
- [x] C-11 文心快码 Comate（百度）
- [x] C-12 CodeBuddy（腾讯）
- [x] C-13 Qoder（阿里）
- [x] C-14 豆包 MarsCode（字节）
- [x] C-15 秒哒（百度 · 偏 no-code）
- [x] C-16 iFlyCode（讯飞）
- [x] C-决策树 tool-selection-tree.md

**D 组 · MCP 与 Agent（常青档 · 6 张）**
- [x] D-01 什么是 MCP（含「有/无 MCP」对比 Mermaid 图）
- [x] D-02 MCP 怎么配置（Cursor / Claude Code 实操）
- [x] D-03 好用的 MCP Server 导航
- [x] D-04 Cursor Rules (.cursorrules)
- [x] D-05 Agent 模式（含时序图）
- [x] D-06 AI Skill / Tool 与 MCP 的关系

**E 组 · 前端基础（常青档 · 8 张）**
- [x] E-01 HTML/CSS 速览
- [x] E-02 JavaScript 最小必要
- [x] E-03 TypeScript vs JavaScript
- [x] E-04 React
- [x] E-05 Next.js
- [x] E-06 Tailwind CSS
- [x] E-07 shadcn/ui
- [x] E-08 npm / package.json

**F 组 · 后端与数据库（常青档 · 8 张）**
- [x] F-01 API 与 REST
- [x] F-02 数据库与 SQL 最小必要（含 Supabase Mermaid 结构图）
- [x] F-03 Supabase
- [x] F-04 Auth 登录系统
- [x] F-05 环境变量 .env
- [x] F-06 Serverless / Edge Function（含流程图）
- [x] F-07 WebSocket / 实时通信
- [x] F-08 Stripe 支付

**G 组 · 部署与上线（易变档 · 13 张 + 选型表）**
- [x] G-01 Vercel（重点 · 全流程 step-by-step）
- [x] G-02 Netlify
- [x] G-03 Cloudflare Pages
- [x] G-04 Railway
- [x] G-05 Render
- [x] G-06 Fly.io
- [x] G-07 Zeabur（国内友好）
- [x] G-08 Sealos（国内友好）
- [x] G-09 腾讯云 EdgeOne Pages
- [x] G-10 阿里云函数计算
- [x] G-11 微信云开发 CloudBase
- [x] G-12 域名与 DNS
- [x] G-13 SSL/HTTPS 与 Git 最小必要（合卡）
- [x] G-选型 platform-selection.md

**H 组 · 宣发与变现（部分易变 · 8 张）**
- [x] H-01 Product Hunt 发布
- [x] H-02 X（Build in Public）
- [x] H-03 小红书宣发（中文产品）
- [x] H-04 Reddit（r/SideProject 等）
- [x] H-05 即刻 / 独立开发者社区
- [x] H-06 SaaS 定价策略
- [x] H-07 如何找到第一个用户
- [x] H-08 变现案例库

### 模块三 · 资料导航
- [x] 02 `resources.md`

### 模块四 · Skills 仓库
- [x] 03 `prompts.md` (P-01~P-15)
- [x] 03 `cursor-rules.md` (CR-01~CR-06)
- [x] 03 `mcp-configs.md` (M-01~M-08)
- [x] 03 `starter-templates.md` (T-01~T-06)
- [x] 03 `workflows.md` (W-01~W-08)

### 模块五 · 发布广场基础
- [x] 04 `seed-content.md`

---

## 四、知识卡片标准格式

每张卡片 = 一个 .md 文件，顶部 frontmatter + 7 个正文字段：

```markdown
---
group: B-models-and-selection
card_id: B-02
title: 任务→模型怎么挑：编程与写代码
difficulty: ⭐⭐
last_updated: 2026-06-23
status: 已核实 | 草稿 | ⚠️待核实
related: [B-01, B-08, C-01]
---

# 标题

## 一句话定义
…非技术背景也能看懂

## 打个比方
…生活化类比

## 和 vibe coding 的关系
…在哪个环节会用到

## 典型场景 / 示例
1. …
2. …

## 常见误区
- …
- …

## 延伸阅读
- [标题](url) `[语言 · 难度 · 免费/付费 · 年份]` 一句话理由

## 去问 AI
> 「…」直接复制给侧边栏 AI 的追问 prompt

---
**来源**：① url  ② url
**查询日期**：2026-06-23 · **数据来源时间**：2026-0X
```

---

## 五、验证分档（执行规则）

| 档位 | 覆盖模块 | 验证强度 |
|---|---|---|
| **易变档** | B / C / G + H 部分 ≈ 47 张 | Explore 子代理逐条联网核版本号、价格、官方 URL、榜单时点 |
| **常青档** | A / D / E / F + 学习路径 ≈ 33 张 | 仅核 1 个官方文档 URL 可达即可 |

无法实时核实的字段统一打 `⚠️ 待核实`，本 README 末尾汇总「待人工确认清单」。

---

## 六、来源清单（按交付点滚动补充）

> 每完成一个交付点，把该模块用到的所有官方 URL、教程、榜单、报告汇总到这里。

### 交付点 1（骨架 + 学习路径）
- _暂无外链引用，本交付点为目录搭建。_

### 交付点 2（A 组 · AI 基础概念）
- **官方文档**
  - OpenAI Prompt Engineering / Function Calling / Embeddings / Tokenizer：https://platform.openai.com/docs
  - Anthropic Prompt Engineering / Tool Use / Long Context Tips：https://docs.anthropic.com/en/docs
  - Vercel AI SDK：https://ai-sdk.dev/
  - Supabase AI (pgvector)：https://supabase.com/docs/guides/ai
- **教程与社区**
  - Andrej Karpathy "Intro to LLMs" (YouTube)
  - 3Blue1Brown 神经网络系列
  - Learn Prompting (中文)：https://learnprompting.org/zh-Hans/docs/intro
  - Prompting Guide (中文)：https://www.promptingguide.ai/zh
  - LangChain / LlamaIndex / LangGraph 官方文档
  - Pinecone Learning Center：https://www.pinecone.io/learn/
- **论文 / 榜单**
  - "Lost in the Middle" (Stanford, 2023)：https://arxiv.org/abs/2307.03172
  - Wei et al. "Chain-of-Thought Prompting" (2022)：https://arxiv.org/abs/2201.11903
  - MTEB Leaderboard：https://huggingface.co/spaces/mteb/leaderboard
  - Vectara Hallucination Leaderboard：https://github.com/vectara/hallucination-leaderboard
- **开源工具**
  - Chroma / Qdrant / Weaviate / Milvus 向量库官网
  - BGE / FlagEmbedding (智源)：https://github.com/FlagOpen/FlagEmbedding
  - Awesome ChatGPT Prompts：https://github.com/f/awesome-chatgpt-prompts

### 交付点 3（B 组 · 模型选型）
- **海外厂商官方定价 / 文档**
  - OpenAI：https://platform.openai.com/docs/pricing
  - Anthropic（Claude）：https://claude.com/pricing
  - Google Gemini：https://ai.google.dev/gemini-api/docs/pricing
  - xAI Grok：https://x.ai/api · https://docs.x.ai/docs/models
  - Anthropic Prompt Caching：https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching
  - Anthropic Batch API：https://docs.anthropic.com/en/docs/build-with-claude/batch-processing
  - Anthropic 长上下文建议：https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/long-context-tips
- **国产厂商官方定价 / 文档**
  - DeepSeek 定价：https://api-docs.deepseek.com/zh-cn/quick_start/pricing
  - DeepSeek Anthropic 兼容：https://api-docs.deepseek.com/zh-cn/guides/anthropic_api
  - 智谱 BigModel 模型概览：https://docs.bigmodel.cn/cn/guide/start/model-overview
  - 智谱 Claude Code 接入：https://docs.bigmodel.cn/cn/guide/develop/claude
  - Kimi (Moonshot) 定价 + 接入：https://platform.kimi.com/docs/pricing/chat-k27-code · https://platform.kimi.com/docs/guide/agent-support
  - 阿里百炼 (Qwen)：https://help.aliyun.com/zh/model-studio/billing-for-model-studio · https://help.aliyun.com/zh/model-studio/use-qwen-by-calling-api
  - 火山方舟 (豆包)：https://www.volcengine.com/docs/82379
  - 腾讯混元：https://cloud.tencent.com/document/product/1729/97731
  - MiniMax：https://platform.minimaxi.com/document/Models · https://platform.minimaxi.com/docs/api-reference/text-anthropic-api
- **榜单 / 评测**
  - Aider Polyglot：https://aider.chat/docs/leaderboards/（数据快照 2025-11-20，原始 YAML：https://github.com/Aider-AI/aider/blob/main/aider/website/_data/polyglot_leaderboard.yml）
  - SWE-bench Verified：https://www.swebench.com/verified.html ⚠️ 2026-06 完整 Top 10 待人工核实
  - LiveCodeBench：https://livecodebench.github.io/leaderboard.html ⚠️ 待人工核实
  - LMArena：https://lmarena.ai/leaderboard ⚠️ 待人工核实
  - Artificial Analysis：https://artificialanalysis.ai/leaderboards/models
  - RULER 长上下文（NVIDIA）：https://github.com/NVIDIA/RULER
  - NoLiMa 长上下文（Adobe Research）：https://github.com/adobe-research/NoLiMa
  - CMMLU 中文：https://github.com/haonan-li/CMMLU
  - SuperCLUE：https://www.superclueai.com/ ⚠️ 2026-06 月报具体名次待人工核实
  - C-Eval：https://cevalbenchmark.com/static/leaderboard.html ⚠️ 待人工核实
  - Vectara Hallucination Leaderboard：https://github.com/vectara/hallucination-leaderboard（数据快照 2026-05-11）
- **HuggingFace 各厂组织页**
  - DeepSeek：https://huggingface.co/deepseek-ai
  - Qwen：https://huggingface.co/Qwen
  - GLM / 智谱：https://huggingface.co/zai-org
  - Moonshot：https://huggingface.co/moonshotai
  - MiniMax：https://huggingface.co/MiniMaxAI
- **第三方推理 / 模型市场**
  - OpenRouter：https://openrouter.ai
  - SiliconFlow / 硅基流动：https://siliconflow.cn
  - Together AI：https://together.ai
  - Groq：https://groq.com
  - Fireworks AI：https://fireworks.ai
- **辅助工具**
  - OpenAI Tokenizer：https://platform.openai.com/tokenizer

### 交付点 4（C 组 · 工具）
- **海外工具官方页**
  - Cursor：https://cursor.com · https://cursor.com/pricing · https://docs.cursor.com
  - Claude Code：https://claude.com/product/claude-code
  - Lovable：https://lovable.dev · https://lovable.dev/pricing · https://docs.lovable.dev
  - v0（Vercel）：https://v0.app · https://v0.app/pricing（旧 v0.dev 已 301）
  - Bolt.new：https://bolt.new · https://bolt.new/pricing · https://webcontainers.io
  - Replit：https://replit.com · https://replit.com/pricing · https://docs.replit.com
  - Windsurf → Devin Desktop：https://devin.ai/desktop（windsurf.com 已 301）
  - GitHub Copilot：https://github.com/features/copilot · https://github.com/features/copilot/plans · https://docs.github.com/en/copilot
- **国内工具官方页**
  - Trae 国际版：https://www.trae.ai · https://www.trae.ai/pricing · https://docs.trae.ai
  - Trae 国内版：https://www.trae.cn · https://www.trae.cn/pricing · https://www.trae.cn/plugin（含 MarsCode 合并说明）
  - 通义灵码：https://lingma.aliyun.com · https://help.aliyun.com/document_detail/2590612.html
  - 文心快码 Comate：https://comate.baidu.com · https://comate.baidu.com/zh/pricing
  - CodeBuddy：https://www.codebuddy.cn · https://www.codebuddy.cn/pricing（旧 copilot.tencent.com 已 301）
  - Qoder：https://qoder.com · https://qoder.com.cn · https://qoder.com/blog
  - MarsCode → Trae（合并）：https://www.marscode.cn 自动跳转
  - 秒哒：https://www.miaoda.cn · https://cloud.baidu.com/product-s/miaoda_home
  - iFlyCode：⚠️ 多个候选 URL 不可达，活跃度存疑（建议参考讯飞星火 https://xinghuo.xfyun.cn）
- **重大事件来源**
  - TechCrunch《Cognition acquires Windsurf》(2025-07-14)：https://techcrunch.com/2025/07/14/cognition-maker-of-the-ai-coding-agent-devin-acquires-windsurf/

### 交付点 5（D 组 · MCP/Agent）
- **MCP 协议**
  - Model Context Protocol 官网：https://modelcontextprotocol.io
  - MCP Spec：https://modelcontextprotocol.io/specification
  - Anthropic MCP 发布博客：https://www.anthropic.com/news/model-context-protocol
- **官方 / 社区 MCP servers**
  - 官方 servers 仓库：https://github.com/modelcontextprotocol/servers
  - Awesome MCP Servers：https://github.com/punkpeye/awesome-mcp-servers
  - Smithery.ai 市场：https://smithery.ai
  - PulseMCP：https://www.pulsemcp.com
  - Glama.ai MCP：https://glama.ai/mcp
- **IDE 中配置 MCP**
  - Cursor MCP 文档：https://docs.cursor.com/context/mcp
  - Claude Code MCP 文档：https://docs.anthropic.com/en/docs/claude-code/mcp
- **Cursor Rules**
  - Cursor Rules 文档：https://docs.cursor.com/context/rules
  - awesome-cursorrules：https://github.com/PatrickJS/awesome-cursorrules
  - cursor.directory：https://cursor.directory
- **Agent 设计**
  - Anthropic: Building effective agents：https://www.anthropic.com/research/building-effective-agents
  - OpenAI: A practical guide to building agents：https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf
  - LangGraph：https://langchain-ai.github.io/langgraph/
- **Skills**
  - Anthropic Skills 文档：https://docs.anthropic.com/en/docs/claude-code/skills
  - OpenAI Custom GPTs / Apps：https://platform.openai.com/docs

### 交付点 6（E + F 组 · 前后端）
- **MDN（Web 三大件权威）**
  - HTML 入门：https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Structuring_content
  - CSS 入门：https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Styling_basics
  - JavaScript：https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Scripting
  - HTTP / WebSocket / SSE / Status：https://developer.mozilla.org/zh-CN/docs/Web/HTTP
- **现代 JS / TS 教程**
  - javascript.info（中英版）：https://zh.javascript.info · https://javascript.info
  - TypeScript 官方：https://www.typescriptlang.org/zh/
  - Total TypeScript：https://www.totaltypescript.com/
- **前端框架 / 库**
  - React 中文文档：https://zh-hans.react.dev
  - Next.js 官方：https://nextjs.org/docs · https://nextjs.org/learn
  - Tailwind CSS：https://tailwindcss.com/docs · https://play.tailwindcss.com
  - shadcn/ui：https://ui.shadcn.com · https://ui.shadcn.com/themes
- **包管理**
  - npm：https://docs.npmjs.com · https://www.npmjs.com
  - pnpm：https://pnpm.io
- **后端 / 数据库**
  - PostgreSQL：https://www.postgresql.org/docs/
  - SQLBolt 互动教程：https://sqlbolt.com
  - Supabase 文档：https://supabase.com/docs · https://supabase.com/pricing
  - Supabase Auth：https://supabase.com/docs/guides/auth
  - Supabase Realtime：https://supabase.com/docs/guides/realtime
  - Drizzle ORM：https://orm.drizzle.team
  - Postman Learning Center：https://learning.postman.com
- **Auth 方案**
  - Clerk：https://clerk.com
  - Auth.js (NextAuth)：https://authjs.dev
  - Better Auth：https://www.better-auth.com
  - OWASP Auth Cheat Sheet：https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html
- **Serverless / 实时**
  - Vercel Functions：https://vercel.com/docs/functions
  - Cloudflare Workers：https://developers.cloudflare.com/workers/
  - Supabase Edge Functions：https://supabase.com/docs/guides/functions
  - 12 Factor App（中文）：https://12factor.net/zh_cn/
  - Pusher / Ably：https://pusher.com · https://ably.com/docs
- **支付**
  - Stripe Docs：https://stripe.com/docs · https://stripe.com/pricing
  - Lemon Squeezy：https://www.lemonsqueezy.com
  - Creem：https://creem.io
  - Paddle：https://www.paddle.com
- **环境变量**
  - Next.js 环境变量：https://nextjs.org/docs/app/guides/environment-variables
  - dotenv：https://www.npmjs.com/package/dotenv

### 交付点 7（G 组 · 部署）
- **海外部署平台官方页**
  - Vercel：https://vercel.com · https://vercel.com/pricing · https://vercel.com/docs
  - Netlify：https://www.netlify.com · https://www.netlify.com/pricing
  - Cloudflare Pages：https://pages.cloudflare.com · https://developers.cloudflare.com/workers/platform/pricing/ · https://developers.cloudflare.com/workers/platform/limits/
  - Railway：https://railway.com · https://railway.com/pricing
  - Render：https://render.com · https://render.com/pricing
  - Fly.io：https://fly.io · https://fly.io/pricing · https://fly.io/docs/about/pricing
- **国内/对国内友好部署平台**
  - Zeabur：https://zeabur.com · https://zeabur.com/pricing · https://zeabur.com/docs
  - Sealos：https://sealos.run · https://cloud.sealos.io
  - EdgeOne Pages / Makers：https://edgeone.ai/zh · https://pages.edgeone.ai/pricing · https://cloud.tencent.com/document/product/1552/127366
  - 阿里云 FC：https://www.aliyun.com/product/fc · https://help.aliyun.com/zh/functioncompute/product-overview/billing-overview
  - CloudBase：https://www.cloudbase.net · https://docs.cloudbase.net · https://docs.cloudbase.net/changelog · https://cloud.tencent.com/document/product/876/75213
- **域名 / DNS / SSL / Git**
  - Cloudflare Domains：https://www.cloudflare.com/products/registrar/
  - Namecheap：https://namecheap.com
  - Porkbun：https://porkbun.com
  - 阿里云万网：https://wanwang.aliyun.com
  - Cloudflare DNS：https://developers.cloudflare.com/dns/
  - Let's Encrypt：https://letsencrypt.org
  - Pro Git Book（中文）：https://git-scm.com/book/zh/v2
  - GitHub Docs（中文）：https://docs.github.com/zh
  - Oh Shit, Git!?!（中文）：https://ohshitgit.com/zh

### 交付点 8（H 组 · 宣发变现）
- **海外宣发平台**
  - Product Hunt：https://www.producthunt.com · https://www.producthunt.com/launch
  - X (Twitter)：https://x.com
  - Reddit 关键 subreddit：r/SideProject · r/SaaS · r/IndieDev · r/EntrepreneurRideAlong · r/webdev · r/Entrepreneur
  - Reddiquette：https://www.reddit.com/wiki/reddiquette
  - BuildInPublic.xyz：https://www.buildinpublic.xyz
- **国内宣发平台**
  - 即刻 App：https://web.okjike.com
  - V2EX：https://www.v2ex.com
  - 少数派 / 独立开发者专栏：https://sspai.com/tag/独立开发者
  - 小红书创作中心：https://creator.xiaohongshu.com
  - 新红数据 / 千瓜数据：https://xh.newrank.cn · https://www.qian-gua.com
- **变现 / 定价 / 案例**
  - IndieHackers：https://www.indiehackers.com · https://www.indiehackers.com/products · https://www.indiehackers.com/stories
  - Starter Story：https://www.starterstory.com
  - Lenny's Newsletter (SaaS pricing)：https://www.lennysnewsletter.com/p/pricing-strategy
  - Stripe SaaS Pricing Guide：https://stripe.com/atlas/guides/saas-pricing
  - Price Intelligently：https://www.priceintelligently.com/blog
  - Paul Graham: Do Things That Don't Scale：http://paulgraham.com/ds.html
  - The Mom Test（书）：https://www.momtestbook.com
  - Levels.io 公开面板：https://nomadlist.com/open · https://levels.io
  - Marc Lou：https://marclou.com

### 交付点 9（Skills 仓库）
- 复用前面所有交付点的来源
- 模板特定来源
  - leerob next-saas-starter：https://github.com/leerob/next-saas-starter
  - ShipFast：https://shipfa.st
  - T3 Stack：https://create.t3.gg
  - MakerKit：https://makerkit.dev
  - uploadthing：https://uploadthing.com
  - Vercel AI Chatbot：https://github.com/vercel/ai-chatbot
  - LobeChat：https://github.com/lobehub/lobe-chat
  - LibreChat：https://github.com/danny-avila/LibreChat
  - Fumadocs / Nextra / Starlight / Astro Paper（文档/博客模板）
  - Magic UI / Aceternity / shadcn 模板库
  - Sentry：https://sentry.io · GlitchTip：https://glitchtip.com · Highlight：https://highlight.io

### 交付点 10（资料导航 + 种子内容）
- 综合 A-G 各组所有外链 + 国内 AI 资讯专区 + 辅助工具导航
- 关键新增来源：
  - 设计：Figma / Penpot / Excalidraw / Tldraw / Whimsical
  - 图标字体：Lucide / Heroicons / Phosphor / Iconify / Google Fonts / Fontshare
  - 配色：Tailwind Colors / Coolors / UIColors / Realtime Colors
  - 图库：Unsplash / Pexels / unDraw / Storyset
  - 分析：PostHog / Plausible / Umami / GA4
  - 反馈：Tally / Formspree / Featurebase / Canny
  - 邮件：Resend / Loops / Buttondown
  - 监控：Sentry / GlitchTip / Better Stack / UptimeRobot
  - 开发效率：Raycast / Warp / Linear / Notion
  - 国内中文社区：即刻 / V2EX / 少数派 / 机器之心 / 量子位 / 新智元 / AIbase / 小宇宙

---

## 七、待人工确认清单（⚠️ 待核实条目）

> 全部交付完成后，在此汇总所有打了 `⚠️ 待核实` 标记的字段。

## 七、待人工确认清单（⚠️ 二轮核实后剩余）

> 经过 2026-06-23 二轮 Explore 核实，**大部分原⚠️项已补全或落具体数字**。下面只剩"必须用户在浏览器点开看"的几个项（页面都是 JS 动态渲染、无法程序化抓取）——每条带上**直接可点击的链接**：

### 1. 编程 / 综合榜单（点击后即时看 Top 10）
- ✅ ~~SWE-bench Verified Top 10~~ — **v1.2 已用本地 swe.json 完整核实并落进 B-02**（mini-SWE-agent 联跑 · 2026-02 时点 · Top 15：Claude 4.5 Opus 76.8% / MiniMax M2.5 75.8% $37 性价比王 / GLM-5 72.8% / Kimi K2.5 70.8% / DeepSeek V3.2 70.0%）
- 👉 LiveCodeBench Top 10：<https://livecodebench.github.io/leaderboard.html>
- 👉 LMArena (Chatbot Arena) Top 10：<https://lmarena.ai/leaderboard>
- 👉 SuperCLUE（中文）月报：<https://www.superclueai.com/>
- 👉 C-Eval（中文）Top 5：<https://cevalbenchmark.com/static/leaderboard.html>

**说明**：Aider Polyglot 已确认 **2025-10-04 之后停止更新**（YAML 文件最后 commit），所以本资料库引用的 Top 14 是该榜的"最终快照"。

### 2. 国产模型 / 工具的"具体档位单价"
（很多页面是 JS 渲染的价格卡，本次抓不到完整每档数字）

- 👉 智谱 GLM 全系单价（GLM-5.2 / 4.6 / 4.5-Air / 4.5-Flash）：<https://bigmodel.cn/pricing>
- 👉 豆包 Doubao 1.5-pro / 其它子型号单价：<https://www.volcengine.com/product/doubao>（Seed-1.6 阶梯价已补到 B-01）
- 👉 文心快码 Comate 个人/Pro/企业 ¥ 数字：<https://comate.baidu.com/zh/pricing>
- 👉 CodeBuddy 完整档位 + 模型清单：<https://www.codebuddy.cn/pricing>
- 👉 Qoder 完整档位 USD 数字：<https://qoder.com/pricing>
- 👉 通义灵码 企业版报价：联系阿里云销售（<https://lingma.aliyun.com>）
- 👉 秒哒 定价：注册 <https://www.miaoda.cn> 后台查
- ⚠️ **iFlyCode（讯飞）当前产品状态**：二轮核实确认主域名 502 离线、xfyun.cn 搜索无结果——**产品疑似下线**。如需最新讯飞编程方案，看：<https://xinghuo.xfyun.cn>

### 3. 海外平台具体数字
- 👉 **Vercel 2026 最新定价**：本资料库内 G-01 引用 **2025-05 快照**（Hobby 100GB 带宽 + 6000 构建分钟；Pro $20/seat 含 1TB 带宽 + 24K 构建分钟）。**2026 时点请打开** <https://vercel.com/pricing> 复核
- 👉 EdgeOne Pages/Makers 推广期具体配额（构建分钟 / 函数次数 / Blob/KV/带宽）：<https://pages.edgeone.ai/pricing> 切到 Makers 标签
- 👉 Zeabur Free 档"流量带宽 / 数据库容量 / 自定义域名数"上限：<https://zeabur.com/pricing>
- 👉 Sealos 国内版新用户具体赠送余额：登录 <https://cloud.sealos.run> 控制台"费用中心"
- 👉 阿里云 FC "调用次数 / GB·秒"与 CU 换算具体数：登录 FC 控制台查实际扣减

### ✅ 二轮核实已补全的项
- Cursor 全档（Hobby/Pro $20/Pro+ $60/Ultra $200/Teams Standard $40/Teams Premium $120）
- Lovable 全档（Free/Pro 起 $25/Business 起 $50）+ Credits 机制
- Zeabur 5 档全部细则
- Sealos 国际版 7 天试用具体配额（4 vCPU/4G/5GB/500MB/100 Credits）
- 阿里云 FC 新用户试用包（15 万 CU × 3 月）
- CloudBase 资源点完整换算表（5 档套餐 + 14 类服务单价）
- 豆包 Seed-1.6 三档阶梯价
- 腾讯混元 turbos / turbos-vision 单价
- Aider Polyglot 完整 Top 14（已停滞 2025-10）

---

## 八、版本与维护

| 版本 | 日期 | 变更 |
|---|---|---|
| v0.1 | 2026-06-23 | 初始化目录骨架、README 框架、学习路径主线 |
| v1.0 | 2026-06-23 | **首版交付完成**：80 张知识卡片 + 5 件 Skills 资产 + 资料导航 + 种子内容 |
| v1.1 | 2026-06-23 | **二轮核实**：补全 Cursor / Lovable / Zeabur / Sealos / FC / CloudBase / 豆包 Seed-1.6 / 混元 turbos 等定价；Aider 榜单更新到 Top 14；Vercel 落 2025-05 快照 + 明确"请点链接"；剩余 6 类⚠️ 改为"点击链接"指引 |
| v1.2 | 2026-06-23 | **SWE-bench 实落地**：用本地 `swe.json` 完整榜单把 SWE-bench Verified Top 15（2026-02 时点 500 题）写进 B-02；新增"极致性价比（MiniMax M2.5 $37 / Kimi K2.5 $73）"到推荐决策表；清理 3 个外来文件 |

---

## 九、完成报告（v1.0）

### 📊 数量统计

| 模块 | 文件数 | 内容 |
|---|---|---|
| 模块一 · 学习路径 | 1 | Mermaid 主线图 + 7 阶段 + 速查表 |
| 模块二 · 知识卡片 | 81 | A12 + B8 + C16+1 + D6 + E8 + F8 + G13+1 + H8 = 81 |
| 模块三 · 资料导航 | 1 | A-G 7 类 + 国内 AI 社区专节 + 辅助工具导航 |
| 模块四 · Skills 仓库 | 5 | P-01~15 + CR-01~06 + M-01~08 + T-01~06 + W-01~08 |
| 模块五 · 发布广场 | 1 | 标签体系 + 提交规范 + 10 条种子卡 |
| 总索引 | 1 | README.md |
| **合计** | **90** | — |

### ✅ Mermaid 图清单（已落地）

| 卡片 | 图类型 | 实际位置 |
|---|---|---|
| 学习路径主线 | flowchart LR · Phase 0-6 | `00-learning-path/learning-path.md` |
| 上下文窗口 | flowchart · 注意力衰减 | `B-04` |
| 有/无 MCP 对比 | 两个并列 flowchart | `D-01` |
| Agent 时序图 | sequenceDiagram | `D-05` |
| Skill / Tool / MCP 三层关系 | flowchart | `D-06` |
| SQL ER 图 | erDiagram | `F-02` |
| Supabase 架构 | flowchart | `F-03` |
| Auth 时序 | sequenceDiagram | `F-04` |
| Serverless 冷启动 | flowchart | `F-06` |
| Vercel 部署全流程 | flowchart | `G-01` |
| 部署平台决策树 | flowchart TD | `G-选型` |
| 工具选型决策树 | flowchart TD | `C-决策树` |
| W-04 部署模板魔改 | flowchart | `03-skills-repo/starter-templates.md` |

### 🔗 外链来源数量
- 累计引用 **180+ 个权威 URL**（详见来源清单各章节）

### ⚠️ 待人工核实清单（v1.1 二轮核实后剩余）

经过二轮 Explore 核实，⚠️ 项**从初版 17 条压缩到剩余必须用户在浏览器点开看的几类**（全是 JS 动态渲染、无法程序化抓取）。详见上文"七、待人工确认清单"——已对每条给出**直接可点击的官方链接**。

### ✅ v1.1 二轮已补全的具体数据
- Cursor 全 7 档（Hobby $0 / Pro $20 / Pro+ $60 / Ultra $200 / Teams Standard $40 / Teams Premium $120 / Enterprise Custom）
- Lovable 全档（Free $0 / Pro 起 $25 / Business 起 $50）+ Credits 完整机制
- Vercel 2025-05 完整快照（Hobby 100GB 带宽；Pro $20/seat 完整资源池）
- Zeabur 5 档全部细则（Free 至 Enterprise）
- Sealos 国际版 7 天试用具体配额（4 vCPU/4G/5GB/500MB/100 Credits）
- 阿里云 FC 新用户试用包（15 万 CU × 3 月）+ CU 阶梯价
- CloudBase 完整资源点换算表（5 档套餐 + 14 类服务单价）
- 豆包 Seed-1.6 三档阶梯价（0-32K / 32-128K / 128-256K）
- 腾讯混元 turbos / turbos-vision 单价
- Aider Polyglot 完整 Top 14（确认 2025-10 后停滞）
- iFlyCode 状态（**主域名 502 离线 + xfyun.cn 搜索无结果 → 产品疑似下线**）

> **处理方式**：所有⚠️ 字段在卡片中直接标注 `⚠️ 待核实` + 指向官网，**绝不编造数字**。

### 📐 验证分档执行情况

| 档位 | 覆盖卡片数 | 验证方式 |
|---|---|---|
| **易变档（全量联网核）** | B + C + G + H 抽样 ≈ 47 张 | 派 5 个 Explore 子代理并行检索官方页面 |
| **常青档（轻核官方 URL）** | A + D + E + F ≈ 34 张 + 学习路径 + Skills 5 件 + Resources + Seed Content | 引用稳定来源（MDN / Anthropic 官方 / GitHub README / 学术论文等） |

### 🎯 重大产品状态变更（核实并落卡）

1. **Windsurf → Devin Desktop**（2025-07 Cognition 收购，详见 C-07）
2. **豆包 MarsCode → Trae**（marscode.cn 已 301，详见 C-14）
3. **v0.dev → v0.app**（域名升级，详见 C-04）
4. **CodeBuddy 域名迁移**（copilot.tencent.com → codebuddy.cn，详见 C-12）
5. **iFlyCode 入口失效**（多个候选 URL 不可达，详见 C-16）
6. **Vercel Hobby 商用限制 + Pro 起步价**（按官方政策标注，具体月费⚠️待核）
7. **Netlify 2026-06 改 Credits 制**（详见 G-02）
8. **Railway 取消永久免费档**（仅 $5 试用，详见 G-04）
9. **Fly.io 取消免费档**（新用户必须绑卡，详见 G-06）
10. **CloudBase 2026-01 切换资源点计费 + 2026-06 默认 Token 额度下线**（详见 G-11）
11. **阿里云 FC 折扣单价（截至 2026-08-27）**（详见 G-10）

### 🚀 推荐继续维护节奏

- **月度维护**（每月 1 次）：检查⚠️ 待核实清单是否能补全；核对 B 组 / C 组 / G 组的当前定价
- **季度维护**（每季 1 次）：核对各模型版本号 + 编程榜单 Top 5
- **年度维护**（每年 1 次）：全量复核学习路径是否仍然适用；可能新增 I 组（Agent SaaS / Embodied AI 等新方向）

---

**最后说明**：本资料库内容用于教学与导航参考，凡涉及"哪个模型/工具最强"均按"基于 X 榜单 X 时点"的形式表达，不下绝对结论。模型与工具的能力、价格、生态变化快，请以官方页面为准。
