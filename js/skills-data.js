// ========================================================================
// 开张 · 工具箱 Tools（结构化目录）
// 来源：Anthropic "Skills" / Cursor Rules / Loop & Harness Engineering 等
//
// 设计公理：Toolbox 包含并列资产：AgentSkills / MCP / Prompt / Rules / Workflow 等。
// AgentSkills 是标准化任务能力包（SKILL.md + scripts/references/assets），不是简单 prompt。
// ========================================================================

export const SKILL_CATEGORIES = [
  {
    id: 'agentskill',
    name: 'AgentSkills 标准包',
    short: 'Skills',
    desc: '标准化任务能力包：SKILL.md + scripts/references/assets，可跨 Agent 复用',
    color: '#3B82F6',
    icon: 'skill',
  },
  {
    id: 'prompt',
    name: '提示词模板',
    short: 'Prompts',
    desc: '即开即用的提示词 — 复制到 Cursor / Claude / ChatGPT 对话框',
    color: '#64748B',
    icon: 'prompt',
  },
  {
    id: 'rule',
    name: 'Cursor Rules',
    short: 'Rules',
    desc: '.cursorrules / AGENTS.md — 把代码规范固化给 AI',
    color: '#A855F7',
    icon: 'rules',
  },
  {
    id: 'mcp',
    name: 'MCP 配置',
    short: 'MCP',
    desc: 'Model Context Protocol — 让 AI 接上你的数据库 / GitHub',
    color: '#10B981',
    icon: 'mcp',
  },
  {
    id: 'template',
    name: '起步模板',
    short: 'Templates',
    desc: 'Next.js / SaaS / 落地页 — clone 即跑',
    color: '#F59E0B',
    icon: 'template',
  },
  {
    id: 'workflow',
    name: '工作流配方',
    short: 'Workflows',
    desc: '从 0 到部署的完整 step-by-step',
    color: '#EC4899',
    icon: 'workflow',
  },
  {
    id: 'loop',
    name: 'Loop Engineering',
    short: 'Loop',
    desc: 'Agent 的 think→act→observe→reflect 循环模板',
    color: '#06B6D4',
    icon: 'loop',
  },
  {
    id: 'harness',
    name: 'Harness Engineering',
    short: 'Harness',
    desc: '把工具 / 评估 / 反馈"夹"到 AI 周围的工程模式',
    color: '#D4452E',
    icon: 'harness',
  },
];

export const SKILLS = [

  {
    id: 'AS-01', cat: 'agentskill', title: 'AgentSkills 标准结构模板',
    use: '把一个完整业务流程打包成可迁移的 Agent Skill 文件夹',
    stack: ['SKILL.md', 'scripts', 'references', 'assets'],
    body: `# AgentSkill 标准结构

一个 AgentSkill 是一个独立文件夹：

\`\`\`
my-skill/
├─ SKILL.md          # 必填：元数据 + 触发条件 + 完整 SOP
├─ scripts/          # 可选：可执行脚本，适合确定性步骤
├─ references/       # 可选：规范、文档、案例、行业资料
└─ assets/           # 可选：模板、表格、图片、示例文件
\`\`\`

## SKILL.md 建议格式

\`\`\`md
---
name: launch-copywriter
description: 当用户需要生成产品发布物料、PH/X/小红书文案时使用
triggers:
  - Product Hunt
  - launch
  - 小红书
  - 宣发
---

# Launch Copywriter Skill

## 目标
把一个产品想法转成可发布的多平台宣发物料。

## 触发条件
- 用户要求生成发布文案
- 用户准备上线产品
- 用户要求 cold start / go-to-market

## 输入要求
- 产品名
- 一句话介绍
- 目标用户
- 差异点
- 当前阶段

## 执行步骤
1. 先判断产品定位是否清楚，不清楚先追问。
2. 生成 3 个 tagline 方向。
3. 按 PH / X / 小红书 / 即刻 分别输出文案。
4. 最后给发布顺序和当日任务清单。

## 输出标准
- 每个平台必须有标题 / 正文 / CTA
- 中文平台避免硬广口吻
- 不编造用户数、收入、榜单

## 自检清单
- 是否明确目标用户？
- 是否说明产品差异点？
- 是否含可执行下一步？
\`\`\`

## 和 Prompt / MCP 的区别
- Prompt：一次性临时指令
- MCP：连接工具/数据库的协议
- AgentSkill：完整可复用的 SOP + 校验 + 模板 + 脚本包`,
    install: `把整个文件夹放到你的 Agent/IDE 支持的 skills 目录；Claude Code 常见路径是 ~/.claude/skills。`,
    tags: ['AgentSkills', 'SKILL.md', '标准结构'],
  },

  // ============== Prompts (P-01 ~ P-15 + 新增) ==============
  {
    id: 'P-01', cat: 'prompt', title: '产品启动 prompt',
    use: '从一句话想法 → 完整可启动的 Next.js 项目',
    stack: ['Next.js', 'Supabase', 'Stripe'],
    src: 'prompts.md#p-01',
    body: `你是一名资深 Next.js 全栈工程师 + 产品经理。

我有一个产品想法：[一句话描述]

目标用户：[用户群]
核心场景：[他们什么时候用]
我想用的技术栈：Next.js 14 (App Router) + TypeScript + Tailwind + shadcn/ui + Supabase + Stripe

请帮我：
1. 用 3 行话给这个产品定一个清晰定位（elevator pitch）
2. 列出 MVP 必须有的 5 个核心功能（冷酷，砍掉所有 "nice to have"）
3. 设计 Supabase 数据表 schema（建表 SQL + RLS 策略思路）
4. 列出我需要装的 npm 包
5. 给我一个 30 分钟内能完成的"第一步行动清单"

不要给完整代码，给"思路 + 决策"。准备好动手时再来要代码。`,
    example: '我有一个产品想法：帮独立开发者自动写日报\n目标用户：远程办公的独立开发者\n核心场景：每天下午 5 点 AI 自动总结今天的 git commits + 日程',
    tags: ['启动', 'MVP'],
  },
  {
    id: 'P-02', cat: 'prompt', title: '报错排查 prompt',
    use: '终端 / 浏览器报错时让 AI 一步步排查',
    stack: ['通用'],
    body: `我遇到了下面的报错，请帮我系统排查：

\`\`\`
[贴完整报错信息]
\`\`\`

上下文：
- 我在做什么：[执行了什么命令 / 操作]
- 项目技术栈：[Next.js / Python / 等]
- 最近改了什么：[最近 1 小时内的改动]

请按以下顺序：
1. 用一句话说"根本原因"
2. 给 3 个最可能的具体原因（按概率排序）
3. 针对每个原因，告诉我"怎么验证"和"怎么修"
4. 推荐一个长期的预防做法`,
    tags: ['debug'],
  },
  {
    id: 'P-03', cat: 'prompt', title: 'UI 描述 prompt',
    use: '把脑中的设计稿翻译成 React + Tailwind 代码',
    stack: ['React', 'Tailwind', 'shadcn/ui'],
    body: `请帮我用 React + Tailwind CSS + shadcn/ui 实现下面这个 UI：

【布局】
[用文字描述：xx 区域在哪里、什么大小]

【风格基调】
[深色 / 浅色 / 主色 / 圆角 / 阴影]

【组件清单】
[需要哪些 shadcn 组件]

【交互】
[点击 / 输入 / hover 时发生什么]

输出：
1. 完整 .tsx 组件代码（带 TypeScript 类型）
2. 用到的 shadcn 组件，附 \`npx shadcn add ...\` 安装命令
3. 如何在父组件里调用的示例`,
    tags: ['UI', '前端'],
  },
  {
    id: 'P-10', cat: 'prompt', title: '落地页文案 prompt',
    use: 'Hero / 功能区 / 定价 / FAQ 一次全产出',
    stack: ['通用'],
    body: `请帮我写一个 SaaS 落地页的文案。

【产品】[名字]
【一句话】[做什么]
【目标用户】[谁会买]
【核心痛点】[他们现在被什么折磨]
【核心价值】[省时间 / 省钱 / 显得专业 / 等]

请输出：
1. Hero H1（≤12 字，带钩子）
2. Hero subline（≤30 字，说清"为谁解决什么"）
3. 3 个核心 feature（每个：图标建议 + 短标题 + 一句话）
4. Social proof 文案模板（先填占位符）
5. Pricing 表（Free / Pro / Team 三档，每档 3 个 bullet）
6. FAQ 5 条（用户最常问的）
7. 底部 CTA 行动词

风格：直白、不油腻、能扫读。不要用"颠覆 / 赋能 / 助力"这种词。`,
    tags: ['宣发', '文案'],
  },
  {
    id: 'P-11', cat: 'prompt', title: 'Product Hunt 文案 prompt',
    use: 'PH 上线必备：tagline + Maker Comment + 第一条评论',
    stack: ['通用'],
    body: `我要把 [产品名] 发到 Product Hunt。

【产品】[一句话]
【目标用户】[谁]
【差异点】[和已有的 X 比有什么不一样]

请输出：
1. Tagline（≤60 字符，英文，要有钩子）
2. Description（≤260 字符，英文，说清"什么 + 给谁 + 怎么用"）
3. Maker Comment 长贴（英文，500-800 字，含：动机故事 / 怎么做的 / 哪里需要反馈）
4. 准备好上线当天回复用户的 5 个标准回复模板
5. 24h 内 hunt 排名前 5 的概率自评（直说）`,
    tags: ['PH', '宣发'],
  },

  // ============== Cursor Rules ==============
  {
    id: 'CR-01', cat: 'rule', title: 'Next.js + Tailwind + Supabase 全栈规则',
    use: '让 Cursor 写出符合规范、不乱发明 API 的代码',
    stack: ['Next.js', 'Tailwind', 'Supabase'],
    body: `# Cursor Rules · Next.js + Supabase 全栈

You are an expert Next.js 14 (App Router) + TypeScript + Supabase engineer.

## Code style
- Use Server Components by default. Add 'use client' only when you need state, effects, or browser APIs.
- Prefer Server Actions over API routes for mutations.
- Use Tailwind CSS utility-first. No CSS modules unless explicitly asked.
- Use shadcn/ui for primitives. Don't reinvent Button, Input, Dialog.
- Type everything. No \`any\` unless commented why.

## Supabase
- All DB access goes through the typed client. Generate types with \`supabase gen types typescript\`.
- Enable RLS on every table. Never disable it.
- Auth lives in middleware. Don't read \`session\` in Server Components — use \`createServerComponentClient\`.

## File layout
- \`app/\` routes only. Components in \`components/\`.
- Server-only utilities in \`lib/server/\`. Client utils in \`lib/client/\`.
- Env: never import \`process.env\` in Client Components.

## Don't
- Don't write API routes if a Server Action will do.
- Don't fetch in useEffect on first render — use Server Components.
- Don't use \`getServerSideProps\` (Pages Router).
- Don't invent Supabase methods — when unsure, ask me to paste the docs.

## When unsure
Ask one clarifying question before generating 50 lines you'll have to throw away.`,
    tags: ['Cursor', '规范'],
  },
  {
    id: 'CR-02', cat: 'rule', title: 'Pure Frontend / Vibe 项目规则',
    use: '小项目快糙猛 — 纯前端 + 直连 API',
    stack: ['Vanilla', 'Vite'],
    body: `# Cursor Rules · Pure Frontend Vibe Project

Keep it dead simple. This is a vibe-coded weekend project.

## Style
- ES modules only. No bundler if avoidable.
- Plain HTML / CSS / JS. Skip React unless the UI has >3 stateful components.
- One file is fine. Don't pre-optimize structure.

## API
- Fetch directly. No SDK wrappers.
- API keys live in env vars at the host (Vercel). Never commit.
- Streams: use ReadableStream + decoder, not eventsource.

## Don't
- Don't suggest TypeScript unless I ask.
- Don't add testing framework unless I'm shipping to paying users.
- Don't generate \`.gitignore\` longer than 10 lines.

## When ambiguous
Default to "the dumbest thing that works."`,
    tags: ['Vibe', '快糙猛'],
  },

  // ============== MCP ==============
  {
    id: 'M-01', cat: 'mcp', title: 'Supabase MCP',
    use: '让 Cursor / Claude Code 直接读你的数据库 / 跑 SQL',
    stack: ['Supabase'],
    body: `{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": [
        "-y",
        "@supabase/mcp-server-supabase@latest",
        "--access-token",
        "<SUPABASE_PERSONAL_ACCESS_TOKEN>"
      ]
    }
  }
}`,
    install: `1. 在 https://supabase.com/dashboard/account/tokens 生成 Personal Access Token
2. 把上面的 JSON 粘到 ~/.cursor/mcp.json（或 Cursor → Settings → MCP）
3. 替换 <SUPABASE_PERSONAL_ACCESS_TOKEN>
4. 重启 Cursor
5. 在对话里问 AI："看看我的 users 表"——它会自己调用 list_tables`,
    tags: ['数据库', 'Cursor'],
  },
  {
    id: 'M-02', cat: 'mcp', title: 'GitHub MCP',
    use: '让 AI 直接读 issue / 提 PR / 看 commit',
    stack: ['GitHub'],
    body: `{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "<your-token>"
      }
    }
  }
}`,
    install: `1. https://github.com/settings/tokens 生成 token（勾 repo / read:org）
2. 同上配 mcp.json`,
    tags: ['GitHub', 'Cursor'],
  },
  {
    id: 'M-03', cat: 'mcp', title: 'Browser MCP (Playwright)',
    use: '让 AI 自己开浏览器测你的页面',
    stack: ['Playwright'],
    body: `{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"]
    }
  }
}`,
    install: '装好后让 AI 说："打开 http://localhost:3000 然后点登录按钮，告诉我有没有报错"',
    tags: ['测试', '浏览器'],
  },

  // ============== Templates ==============
  {
    id: 'T-01', cat: 'template', title: 'SaaS Starter (Next.js + Supabase + Stripe)',
    use: '50 行配置就能跑通 注册 / 订阅 / Dashboard',
    stack: ['Next.js', 'Supabase', 'Stripe'],
    body: `# 起步命令
npx create-next-app@latest my-saas --typescript --tailwind --app
cd my-saas
npm i @supabase/supabase-js @supabase/ssr stripe @stripe/stripe-js
npx shadcn@latest init -d
npx shadcn@latest add button card input form

# 目录建议
src/
├─ app/
│   ├─ (marketing)/         # 落地页
│   ├─ (auth)/login         # 登录
│   ├─ (app)/dashboard      # 已登录区
│   └─ api/stripe/webhook   # Stripe 回调
├─ components/ui/           # shadcn
├─ lib/
│   ├─ supabase/{server,client}.ts
│   └─ stripe/server.ts
└─ middleware.ts            # Supabase auth

# 必填环境变量 .env.local
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=`,
    repo: 'https://github.com/leerob/next-saas-starter',
    tags: ['SaaS', '起步'],
  },
  {
    id: 'T-02', cat: 'template', title: '极简落地页模板',
    use: '5 分钟做出一个看得过去的落地页',
    stack: ['Next.js', 'Tailwind'],
    body: `# 命令
npx create-next-app@latest my-landing --ts --tailwind --app

# 推荐组件库
npx shadcn@latest add button
# 或直接拿 Magic UI 的免费组件
# https://magicui.design

# 落地页骨架（一个 page.tsx 搞定）
- Hero (H1 + subline + 2 CTA)
- 3 列 Feature
- Pricing (3 档)
- FAQ (accordion)
- Footer

# 部署
vercel deploy`,
    tags: ['落地页'],
  },

  // ============== Workflows ==============
  {
    id: 'W-01', cat: 'workflow', title: '0 → 部署 · 45 分钟',
    use: '从一句话想法，到公网可访问，全流程',
    stack: ['Cursor', 'Next.js', 'Vercel'],
    body: `# Step 1 · 想法 → MVP 范围（5 min）
1. 用 P-01 prompt 让 AI 帮你定义 MVP
2. 砍到 1 个核心功能 + 1 个支持功能

# Step 2 · 启动项目（10 min）
1. \`npx create-next-app\` + \`npx shadcn init\`
2. 在 Cursor 打开，设 .cursorrules (CR-01)
3. \`npm run dev\` 跑通空页面

# Step 3 · 让 AI 写第一版（15 min）
1. 用 P-03 prompt 描述你的 UI
2. 把生成的 .tsx 粘进 page.tsx
3. 改 1-2 个细节让它"是你的"

# Step 4 · 推 GitHub（5 min）
git init && git add . && git commit -m "init"
gh repo create my-app --public --source=. --push

# Step 5 · 部署 Vercel（10 min）
1. https://vercel.com/new → 选你的 repo
2. 填环境变量（如果有）
3. Deploy → 拿到 yourapp.vercel.app

✅ 这就是你的第一个公网产品。`,
    tags: ['全流程'],
  },

  // ============== Loop Engineering（NEW） ==============
  {
    id: 'L-01', cat: 'loop', title: 'ReAct Loop · Think → Act → Observe',
    use: '最经典的 Agent 循环：用 AI 解一个多步骤问题',
    stack: ['Agent', 'Function Calling'],
    body: `# ReAct Loop 系统提示词

你是一个有工具的 AI Agent。每一步，你必须按以下结构输出：

Thought: <你现在在想什么>
Action: <要调用的工具名，不调用工具就写 Finish>
Action Input: <调用工具的参数 JSON>
Observation: <等系统返回工具结果>

... 上面四行可以重复多次直到你能给出最终答案 ...

Thought: 我已经知道答案了
Action: Finish
Final Answer: <给用户的回复>

## 规则
- 一次只调一个工具
- Observation 是系统填的，你不能自己编
- 如果三次同样的 Action 没进展，停下来问用户
- 工具列表：[search_web, read_file, run_sql, send_email]

## 示例
User: 我们 7 月的销售额是多少？

Thought: 这是数据库问题，需要跑 SQL
Action: run_sql
Action Input: {"query": "select sum(amount) from orders where created_at >= '2026-07-01' and created_at < '2026-08-01'"}
Observation: 142300.00
Thought: 拿到了
Action: Finish
Final Answer: 7 月销售额 ¥142,300。`,
    tags: ['Agent', 'ReAct'],
  },
  {
    id: 'L-02', cat: 'loop', title: 'Reflexion Loop · 自我反思修正',
    use: 'Agent 失败后能"复盘"再试 — 而不是无脑重跑',
    stack: ['Agent'],
    body: `# Reflexion Loop

每次任务失败时，让 Agent 先反思再重试。

## 步骤
1. **Actor**：跑一次完整 ReAct 循环
2. **Evaluator**：拿结果给评估模型打分（0-1）
3. **Self-Reflect**：如果 score < 0.7，让模型用一段话总结"上次哪里错了"
4. 把这段反思塞进下一次的 system prompt 里，重试

## 评估模板
\`\`\`
任务：[原任务]
你的输出：[Actor 给的答案]
理想输出特征：[列 3-5 条]
请给 0-1 的分数，并指出最大的一处问题。
\`\`\`

## 反思模板
\`\`\`
你刚才失败了。失败原因：[Evaluator 指出的问题]
请用 50 字以内总结"下次怎么做才不会再犯"。这段话会作为 hint 塞给下一次的你。
\`\`\``,
    refs: ['Reflexion (Shinn et al., 2023): https://arxiv.org/abs/2303.11366'],
    tags: ['反思', '自我改进'],
  },
  {
    id: 'L-03', cat: 'loop', title: 'Plan-and-Execute Loop',
    use: '先让小模型规划、大模型执行 — 省 token 又稳',
    stack: ['Agent'],
    body: `# Plan-and-Execute Loop

把 "想 + 做" 拆成两个阶段，分用不同模型：

## 阶段 1：Planner（小模型 / 便宜）
\`\`\`
你是一个任务规划员。
拿到下面的任务，拆成 3-7 个有序步骤。
每个步骤必须可由单一工具调用完成。

任务：[user task]

输出格式：
1. <步骤描述> | tool: <tool_name>
2. ...
\`\`\`

## 阶段 2：Executor（大模型 / 强）
- 拿 Planner 输出的步骤
- 一步一步执行（每步都是一个完整 ReAct loop）
- 任意一步失败 → 抛回 Planner 重做"剩余部分"

## 收益
- Planner 用 GLM-Flash / GPT-mini，便宜 10x
- Executor 用 Claude Opus / GPT-5，能力强
- 整体成本 < 全程用大模型的 30%`,
    tags: ['Agent', '成本'],
  },

  // ============== Harness Engineering（NEW） ==============
  {
    id: 'H-01', cat: 'harness', title: '什么是 Harness',
    use: '理解 Anthropic 提出的 "Harness" 概念 — Skill 之上的工程',
    stack: ['Agent', '理论'],
    body: `# Harness Engineering 是什么

"Harness" = 你给 AI 套的**马具** —— 不是改模型，
而是把"工具调用 / 评估 / 反馈 / 上下文"这些工程能力包在模型周围。

## 三个层次
1. **Prompt Engineering**：调一句话怎么写
2. **Skill Engineering**：把可复用资产沉淀（这个仓库就是）
3. **Harness Engineering**：把上面两层 + Loop + 评估 + 状态机 焊成一个能跑生产的系统

## 一个 harness 通常包含
- **工具集**（function calling / MCP servers）
- **循环控制**（ReAct / Reflexion / Plan-Execute）
- **状态管理**（短期记忆 / 向量 / 数据库）
- **评估钩子**（每步给分 / 抽样人工 review）
- **降级策略**（连败 N 次切便宜模型 / 让用户介入）
- **可观测性**（trace 每一次 LLM 调用）

## 推荐读物
- Anthropic: Building effective agents
- OpenAI: A practical guide to building agents
- LangGraph 文档`,
    refs: [
      'https://www.anthropic.com/research/building-effective-agents',
      'https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf',
    ],
    tags: ['理论', 'Agent'],
  },
  {
    id: 'H-02', cat: 'harness', title: 'Evaluation Harness · 给 Agent 上秤',
    use: '不是凭感觉调，是用数据集 + 评估器迭代 prompt',
    stack: ['Eval'],
    body: `# 给你的 Agent 上秤

写 prompt 全凭感觉？该上 eval harness 了。

## 最小可行 eval（30 行代码搞定）

\`\`\`ts
// evals.ts
const dataset = [
  { input: '北京天气', expected: { tool: 'search_web' } },
  { input: '我们 7 月销售额', expected: { tool: 'run_sql' } },
  // ... 20 条
];

for (const item of dataset) {
  const result = await agent.run(item.input);
  const grade = await judge({
    input: item.input,
    expected: item.expected,
    actual: result,
  });
  console.log(item.input, grade.score);
}
\`\`\`

## Judge 模型 prompt
\`\`\`
你是一个评估员。给定：
- 任务：[input]
- 理想输出：[expected]
- 实际输出：[actual]
判断 0-1 的分数，给一句话解释。
返回 JSON: {"score": 0.x, "reason": "..."}
\`\`\`

## 工程实践
- Dataset 至少 20 条 — 少了波动太大
- 每次改 prompt 都跑一次完整 eval
- 把分数贴回 PR description
- 长期目标：上 Braintrust / Langfuse 这类专业平台`,
    tags: ['Eval', '工程'],
  },
  {
    id: 'H-03', cat: 'harness', title: 'Trajectory Logging · 把 Agent 行为留底',
    use: '生产环境必备 — 没日志的 Agent 是黑盒',
    stack: ['可观测性'],
    body: `# Trajectory Logging

每次 Agent 跑完，留下完整 trace：

\`\`\`ts
// trace.ts
type Trace = {
  id: string;
  input: string;
  steps: Array<{
    thought: string;
    action: string;
    args: any;
    observation: any;
    latency_ms: number;
    tokens: { in: number; out: number };
  }>;
  output: string;
  totalLatency: number;
  totalCost: number;
  userFeedback?: 'good' | 'bad';
};
\`\`\`

## 至少存这些
- 完整 message 序列（含 system / tool 调用）
- 每步的 token 数 + 延迟
- 最终是否成功
- 用户反馈（点赞 / 踩）

## 用途
1. 出问题时复盘 — 不用复现
2. 抽样 review — 每周看 50 条标"好/坏"
3. 把"好"的轨迹做成 few-shot example 喂回 prompt
4. 把"坏"的喂给 Reflexion，让模型自己学

## 推荐工具
- Langfuse (开源)
- Braintrust
- LangSmith`,
    tags: ['可观测', '生产'],
  },
  {
    id: 'H-04', cat: 'harness', title: 'Tool Sandboxing · 把 Agent 关进笼子',
    use: '生产 Agent 必备 — 别让它真的 \`rm -rf /\`',
    stack: ['安全'],
    body: `# Tool Sandboxing

让 Agent 调工具前，工程上必须做的几层保护：

## L1 · 工具白名单
\`\`\`ts
const ALLOWED = new Set(['search_web', 'read_file', 'send_message']);
if (!ALLOWED.has(toolName)) throw new Error('Tool not allowed');
\`\`\`

## L2 · 参数 schema 校验
用 zod / pydantic 把每个工具的参数都强类型化。模型乱传的 args 直接拒。

## L3 · 副作用确认
\`\`\`ts
const DESTRUCTIVE = ['delete_file', 'send_email', 'run_shell'];
if (DESTRUCTIVE.includes(toolName)) {
  await askUser(\`Agent 想 \${toolName}（\${JSON.stringify(args)}），同意吗？\`);
}
\`\`\`

## L4 · 速率 + 预算
- 每个 session 最多 20 步
- 单次 task 预算 $0.50
- 超了 hard stop

## L5 · 真隔离
- shell 工具：跑在 Docker / Firecracker / Sandboxed VM
- 文件工具：限定到 workdir 子目录
- 网络工具：白名单域名

## 设计公理
> 假设 Agent 是个想搞破坏的实习生 — 你不会给他 root，对吧。`,
    tags: ['安全', '生产'],
  },

  {
    id: 'M-09', cat: 'mcp', title: 'Awesome MCP Servers',
    use: 'MCP Server 大全，选工具前先查这里',
    stack: ['MCP', 'Cursor', 'Claude Code'],
    body: `资源链接：https://github.com/punkpeye/awesome-mcp-servers

用途：查找社区 MCP server，覆盖浏览器、数据库、设计、搜索、文件系统等。

建议使用方式：
1. 先按你的项目场景筛选 1-3 个 server。
2. 优先选择官方/高 star/近期维护的 server。
3. 不要一次性安装太多，避免 Agent 选错工具。`,
    repo: 'https://github.com/punkpeye/awesome-mcp-servers',
    tags: ['MCP', 'directory', 'awesome'],
  },
  {
    id: 'M-10', cat: 'mcp', title: '官方 MCP Servers',
    use: 'Model Context Protocol 官方 server 集合',
    stack: ['MCP'],
    body: `官方仓库：https://github.com/modelcontextprotocol/servers

适合用来查官方/参考级 MCP server 实现。`,
    repo: 'https://github.com/modelcontextprotocol/servers',
    tags: ['MCP', 'official'],
  },
  {
    id: 'M-11', cat: 'mcp', title: 'Playwright MCP',
    use: '让 Agent 打开浏览器测试页面、点击按钮、检查 UI',
    stack: ['MCP', 'Playwright', 'Browser'],
    body: `推荐仓库：https://github.com/microsoft/playwright-mcp

典型用途：
- 打开 localhost 页面
- 自动点击登录/发布/表单按钮
- 截图和检查可访问性
- 让 Agent 自己复现 bug`,
    repo: 'https://github.com/microsoft/playwright-mcp',
    tags: ['MCP', 'browser', 'testing'],
  },
  {
    id: 'CR-07', cat: 'rule', title: 'Awesome Cursor Rules',
    use: 'Cursor Rules 模板仓库，按技术栈复制规则',
    stack: ['Cursor', '.cursorrules'],
    body: `仓库：https://github.com/PatrickJS/awesome-cursorrules

建议：
- 不要整份照抄，按你的项目技术栈挑规则。
- 规则要短、明确、可执行。
- 对安全/环境变量/数据删除要写硬约束。`,
    repo: 'https://github.com/PatrickJS/awesome-cursorrules',
    tags: ['Cursor Rules', 'rules'],
  },
  {
    id: 'AS-03', cat: 'agentskill', title: 'AGENTS.md 标准参考',
    use: '给代码 Agent 说明项目结构、命令、规范的标准入口文件',
    stack: ['AGENTS.md', 'Code Agent'],
    body: `参考仓库：https://github.com/agentsmd/agents.md

AGENTS.md 通常包含：
- 项目结构
- 本地启动命令
- 测试/构建命令
- 代码规范
- 安全边界
- 重要文件说明

它和 SKILL.md 的区别：
- AGENTS.md 更像项目级协作说明
- SKILL.md 更像某个可复用任务能力包`,
    repo: 'https://github.com/agentsmd/agents.md',
    tags: ['AgentSkills', 'AGENTS.md'],
  },
  {
    id: 'T-03', cat: 'template', title: 'Next.js SaaS Starter',
    use: 'Vercel 官方/社区常用 SaaS 起步模板参考',
    stack: ['Next.js', 'SaaS', 'Auth', 'Payments'],
    body: `参考：https://github.com/nextjs/saas-starter

适合：
- 登录
- Dashboard
- Stripe / Billing
- Vercel 部署

使用时注意检查 license 和当前维护状态。`,
    repo: 'https://github.com/nextjs/saas-starter',
    tags: ['Next.js', 'SaaS', 'template'],
  },

  {
    id: 'AS-04', cat: 'agentskill', title: 'addyosmani/agent-skills',
    use: '把高级工程师 workflows、质量门禁和最佳实践编码成结构化 Skill 文件',
    stack: ['Claude Code', 'Cursor', 'Gemini', 'SKILL.md'],
    body: `项目：https://github.com/addyosmani/agent-skills

定位：把高级工程师的工程流程、质量门禁、最佳实践封装成可复用技能包。

关键要点：
- 每个 Skill = SKILL.md + scripts + references + assets。
- 核心原则：Progressive Disclosure，避免一次性灌太多。
- 不是提示词，是可执行工程流程：步骤、检查点、退出标准。`,
    install: '打开 GitHub 仓库，按 README 复制或下载对应 skill 文件夹。',
    repo: 'https://github.com/addyosmani/agent-skills',
    tags: ['AgentSkills', 'engineering', 'quality-gate'],
  },
  {
    id: 'AS-05', cat: 'agentskill', title: 'Agent Skills Directory',
    use: '模块化、可复用的技能包目录，支持按项目上下文匹配技能',
    stack: ['AgentSkills', 'Directory'],
    body: `官网：https://dmgrok.github.io/agent_skills_directory/

用途：作为 AgentSkills 目录化参考，了解如何按任务/项目上下文组织可复用技能。`,
    repo: 'https://dmgrok.github.io/agent_skills_directory/',
    tags: ['AgentSkills', 'directory', 'progressive-disclosure'],
  },
  {
    id: 'CR-08', cat: 'rule', title: 'Cursor 官方 Rules 指南',
    use: 'Cursor Rules 官方文档，理解规则类型、作用域和触发方式',
    stack: ['Cursor', 'Rules'],
    body: `官方文档：https://cursor.com/help/customization/rules

最佳实践：规则要短、具体、指向示例；用 @filename 引用文件；纳入 Git；发现 Agent 重复犯错时再加规则。`,
    repo: 'https://cursor.com/help/customization/rules',
    tags: ['Cursor Rules', 'official'],
  },
  {
    id: 'CR-09', cat: 'rule', title: 'Cursor Agent 最佳实践',
    use: 'Cursor 官方 Agent 最佳实践，含 Plan Mode 和交付前自检',
    stack: ['Cursor', 'Agent', 'Plan Mode'],
    body: `官方文章：https://cursor.com/blog/agent-best-practices

适合沉淀为团队规则：先计划再执行、小步提交、修改前说明影响范围、交付前自检测试与安全边界。`,
    repo: 'https://cursor.com/blog/agent-best-practices',
    tags: ['Cursor', 'Agent', 'Plan Mode'],
  },
  {
    id: 'M-12', cat: 'mcp', title: 'MCP 官方架构文档',
    use: '理解 MCP Host / Client / Server、Resources / Tools / Prompts 三大能力',
    stack: ['MCP', 'Architecture'],
    body: `官方文档：https://modelcontextprotocol.io/docs/learn/architecture.md

MCP = AI 应用的 USB-C 接口。
三大能力：Resources / Tools / Prompts。
传输层：Stdio、SSE、Streamable HTTP。`,
    repo: 'https://modelcontextprotocol.io/docs/learn/architecture.md',
    tags: ['MCP', 'architecture', 'official'],
  },
  {
    id: 'M-13', cat: 'mcp', title: 'MCP 本地服务器连接教程',
    use: '官方教程：连接本地 MCP server，适合 filesystem / browser / db 类工具',
    stack: ['MCP', 'Local Server'],
    body: `官方教程：https://modelcontextprotocol.io/docs/develop/connect-local-servers

最小配置示例：
\`\`\`json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/dir"]
    }
  }
}
\`\`\``,
    repo: 'https://modelcontextprotocol.io/docs/develop/connect-local-servers',
    tags: ['MCP', 'config', 'local'],
  },
  {
    id: 'T-04', cat: 'template', title: 'ai-agent-starter-kit',
    use: 'TypeScript / Node.js 生产级 Agent 起步模板，包含记忆、工具执行和工作流自动化',
    stack: ['TypeScript', 'Node.js', 'Agent'],
    body: `npm：https://www.npmjs.com/package/ai-agent-starter-kit

适合快速起一个工程化 Agent 项目。`,
    repo: 'https://www.npmjs.com/package/ai-agent-starter-kit',
    tags: ['starter', 'TypeScript', 'Agent'],
  },
  {
    id: 'T-05', cat: 'template', title: 'create-agent-workflow-template',
    use: '结构化工作流模板，帮助减少幻觉、控制 token、沉淀执行步骤',
    stack: ['Workflow', 'Agent', 'Template'],
    body: `npm：https://www.npmjs.com/package/create-agent-workflow-template

适合从松散 prompt 迁移到结构化 workflow。`,
    repo: 'https://www.npmjs.com/package/create-agent-workflow-template',
    tags: ['workflow', 'starter'],
  },
  {
    id: 'W-09', cat: 'workflow', title: 'Azure AI Agent 设计模式',
    use: '顺序、并行、分层、群组聊天等 Agent 工作流设计模式',
    stack: ['Workflow', 'Azure', 'Agent Design'],
    body: `官方文档：https://learn.microsoft.com/bg-bg/azure/architecture/ai-ml/guide/ai-agent-design-patterns

可参考模式：Sequential、Concurrent、Hierarchical、Group Chat。`,
    repo: 'https://learn.microsoft.com/bg-bg/azure/architecture/ai-ml/guide/ai-agent-design-patterns',
    tags: ['workflow', 'design-patterns'],
  },
  {
    id: 'W-10', cat: 'workflow', title: 'LangGraph 工作流编排',
    use: '主流 Agent 工作流编排框架，适合 DAG / 状态机 / 多步骤任务',
    stack: ['LangGraph', 'Workflow', 'Agent'],
    body: `官网：https://langchain-ai.github.io/langgraph/

适合显式状态机、可恢复/可观测长任务、从 Agent Loop 走向可控 Workflow。`,
    repo: 'https://langchain-ai.github.io/langgraph/',
    tags: ['LangGraph', 'workflow'],
  },
  {
    id: 'H-05', cat: 'harness', title: 'Agent = Model + Harness',
    use: 'Harness Engineering 入门：工具封装、状态、记忆、反馈回路和安全约束',
    stack: ['Harness', 'Agent Systems'],
    body: `核心观点：Agent = Model + Harness。

Harness 负责工具接口封装、外部状态管理、长任务记忆机制、上下文隔离与异步执行、多 Agent 协作协议、评估追踪回滚和安全边界。

参考：
- https://blog.csdn.net/leacock1991/article/details/159865376
- https://flashcat.cloud/blog/harness-engineering-ai-agent-systems/
- https://harness-engineering.ai/blog/agent-harness-architecture-how-the-system-works-under-the-hood/`,
    refs: ['https://blog.csdn.net/leacock1991/article/details/159865376','https://flashcat.cloud/blog/harness-engineering-ai-agent-systems/','https://harness-engineering.ai/blog/agent-harness-architecture-how-the-system-works-under-the-hood/'],
    tags: ['Harness', 'Agent Architecture'],
  },
];
