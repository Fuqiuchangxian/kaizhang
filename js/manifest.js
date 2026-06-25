// 开张 KAIZHANG · 内容清单
// 这是知识卡片 / Phase / Skills / 广场种子的索引。
// 卡片正文按需 fetch 自 /content/kaizhang-content/...

export const PHASES = [
  {
    id: 'P0',
    idx: 0,
    name: '认知与选型',
    icon: 'plot',           // 空地
    goal: '知道 vibe coding 是什么、选对工具',
    cards: ['B-01', 'C-tree', 'C-01', 'C-03', 'C-09', 'C-10'],
    checkpoint: '在评论里写一句话：「我接下来要用的工具是 X，默认模型是 Y」',
  },
  {
    id: 'P1',
    idx: 1,
    name: '基础概念扫盲',
    icon: 'sign',           // 招牌
    goal: '看懂文档、不被术语劝退',
    cards: ['A-01','A-02','A-03','A-04','A-05','A-06','A-07','A-08','A-09','A-10','A-11','A-12'],
    checkpoint: '用打比方的方式给一个完全不懂的朋友讲清 LLM / RAG / Agent',
  },
  {
    id: 'P2',
    idx: 2,
    name: '上手第一个产品',
    icon: 'paint',          // 装修
    goal: '跑通 prompt → 能运行的页面',
    cards: ['C-01','C-03','E-04','E-05','E-06','E-08','A-12'],
    checkpoint: '在 localhost 上把你的第一个页面跑起来，截图贴回来',
  },
  {
    id: 'P3',
    idx: 3,
    name: '功能拓展',
    icon: 'door',           // 开门
    goal: '加上数据库、登录、支付',
    cards: ['F-01','F-02','F-03','F-04','F-05','F-08'],
    checkpoint: '让一个测试账号成功完成「注册 → 登录 → 付款 → 看到付费内容」',
  },
  {
    id: 'P4',
    idx: 4,
    name: 'AI 增强开发',
    icon: 'tools',
    goal: '用 MCP / Agent / Skills 加速',
    cards: ['D-01','D-02','D-03','D-04','D-05','D-06'],
    checkpoint: '在你的 IDE 里成功配上一个 MCP（Supabase / GitHub 任选）并完成一次工具调用',
  },
  {
    id: 'P5',
    idx: 5,
    name: '部署与上线',
    icon: 'lantern',        // 红灯笼
    goal: '产品有公网地址、别人能访问',
    cards: ['G-01','G-07','G-09','G-12','G-13','G-选型'],
    checkpoint: '把你的产品部署到公网，绿色锁🔒图标贴回来',
  },
  {
    id: 'P6',
    idx: 6,
    name: '宣发与变现',
    icon: 'firework',       // 开张大吉
    goal: '有真实用户和第一笔收入',
    cards: ['H-01','H-02','H-03','H-04','H-05','H-06','H-07','H-08'],
    checkpoint: '在「发布广场」上发出你的第一个作品，并拿到至少 3 条结构化反馈',
  },
];

// 全部 80 + 索引（按 group/cardId 排序）
// path 是相对 /content/kaizhang-content/01-cards 的相对路径
export const CARDS = [
  { id:'A-01', group:'A', title:'LLM 是什么', diff:1, path:'A-ai-basics/A-01-what-is-llm.md' },
  { id:'A-02', group:'A', title:'Token 与上下文窗口', diff:1, path:'A-ai-basics/A-02-token-and-context-window.md' },
  { id:'A-03', group:'A', title:'Prompt 提示词', diff:1, path:'A-ai-basics/A-03-prompt.md' },
  { id:'A-04', group:'A', title:'System Prompt 系统提示词', diff:1, path:'A-ai-basics/A-04-system-prompt.md' },
  { id:'A-05', group:'A', title:'模型幻觉', diff:1, path:'A-ai-basics/A-05-hallucination.md' },
  { id:'A-06', group:'A', title:'Function Calling / Tool Use', diff:2, path:'A-ai-basics/A-06-function-calling.md' },
  { id:'A-07', group:'A', title:'Agent 是什么', diff:2, path:'A-ai-basics/A-07-what-is-agent.md' },
  { id:'A-08', group:'A', title:'RAG 检索增强生成', diff:2, path:'A-ai-basics/A-08-rag.md' },
  { id:'A-09', group:'A', title:'向量数据库', diff:2, path:'A-ai-basics/A-09-vector-database.md' },
  { id:'A-10', group:'A', title:'流式输出 Streaming', diff:1, path:'A-ai-basics/A-10-streaming.md' },
  { id:'A-11', group:'A', title:'Embedding 词向量', diff:2, path:'A-ai-basics/A-11-embedding.md' },
  { id:'A-12', group:'A', title:'Prompt Engineering（Zero-shot / Few-shot / CoT）', diff:2, path:'A-ai-basics/A-12-prompt-engineering.md' },

  { id:'B-01', group:'B', title:'主流大模型全景图（2026-06 时点）', diff:2, path:'B-models-and-selection/B-01-llm-landscape.md' },
  { id:'B-02', group:'B', title:'任务→模型怎么挑：编程与写代码', diff:2, path:'B-models-and-selection/B-02-best-model-for-coding.md' },
  { id:'B-03', group:'B', title:'任务→模型怎么挑：长文档 / 推理 / 中文 / 性价比', diff:2, path:'B-models-and-selection/B-03-task-model-matching.md' },
  { id:'B-04', group:'B', title:'上下文窗口是什么、各模型多大、用满了会怎样', diff:1, path:'B-models-and-selection/B-04-context-window.md' },
  { id:'B-05', group:'B', title:'模型定价怎么读、token 怎么算、怎么省钱', diff:2, path:'B-models-and-selection/B-05-pricing-and-token-savings.md' },
  { id:'B-06', group:'B', title:'闭源 vs 开源模型，各自适合什么人', diff:2, path:'B-models-and-selection/B-06-open-vs-closed.md' },
  { id:'B-07', group:'B', title:'国产模型 API 怎么接入（含接进 Claude Code 的做法）', diff:2, path:'B-models-and-selection/B-07-domestic-models-api.md' },
  { id:'B-08', group:'B', title:'任务 → 推荐模型 速查表', diff:1, path:'B-models-and-selection/B-08-task-to-model-cheatsheet.md' },

  { id:'C-01', group:'C', title:'Cursor', diff:2, path:'C-vibe-coding-tools/C-01-cursor.md' },
  { id:'C-02', group:'C', title:'Claude Code（CLI / Web / 桌面 / 移动）', diff:2, path:'C-vibe-coding-tools/C-02-claude-code.md' },
  { id:'C-03', group:'C', title:'Lovable', diff:1, path:'C-vibe-coding-tools/C-03-lovable.md' },
  { id:'C-04', group:'C', title:'v0（Vercel · 主域 v0.app）', diff:1, path:'C-vibe-coding-tools/C-04-v0.md' },
  { id:'C-05', group:'C', title:'Bolt.new', diff:1, path:'C-vibe-coding-tools/C-05-bolt-new.md' },
  { id:'C-06', group:'C', title:'Replit Agent', diff:1, path:'C-vibe-coding-tools/C-06-replit-agent.md' },
  { id:'C-07', group:'C', title:'Windsurf（已更名 Devin Desktop）', diff:2, path:'C-vibe-coding-tools/C-07-windsurf-devin-desktop.md' },
  { id:'C-08', group:'C', title:'GitHub Copilot', diff:1, path:'C-vibe-coding-tools/C-08-github-copilot.md' },
  { id:'C-09', group:'C', title:'Trae（字节）', diff:1, path:'C-vibe-coding-tools/C-09-trae.md' },
  { id:'C-10', group:'C', title:'通义灵码 / Lingma（阿里）', diff:1, path:'C-vibe-coding-tools/C-10-tongyi-lingma.md' },
  { id:'C-11', group:'C', title:'文心快码 Comate（百度）', diff:1, path:'C-vibe-coding-tools/C-11-comate.md' },
  { id:'C-12', group:'C', title:'CodeBuddy（腾讯）', diff:1, path:'C-vibe-coding-tools/C-12-codebuddy.md' },
  { id:'C-13', group:'C', title:'Qoder', diff:2, path:'C-vibe-coding-tools/C-13-qoder.md' },
  { id:'C-14', group:'C', title:'豆包 MarsCode（已合并 Trae）', diff:1, path:'C-vibe-coding-tools/C-14-marscode.md' },
  { id:'C-15', group:'C', title:'秒哒 Miaoda（百度 · no-code）', diff:1, path:'C-vibe-coding-tools/C-15-miaoda.md' },
  { id:'C-16', group:'C', title:'iFlyCode（讯飞）', diff:1, path:'C-vibe-coding-tools/C-16-iflycode.md' },
  { id:'C-tree', group:'C', title:'Vibe Coding 工具选型决策树', diff:1, path:'C-vibe-coding-tools/C-tree-tool-selection.md' },

  { id:'D-01', group:'D', title:'什么是 MCP', diff:2, path:'D-mcp-and-agent/D-01-what-is-mcp.md' },
  { id:'D-02', group:'D', title:'MCP 怎么配置', diff:2, path:'D-mcp-and-agent/D-02-configure-mcp.md' },
  { id:'D-03', group:'D', title:'好用的 MCP Server 导航', diff:1, path:'D-mcp-and-agent/D-03-mcp-server-directory.md' },
  { id:'D-04', group:'D', title:'Cursor Rules (.cursorrules)', diff:1, path:'D-mcp-and-agent/D-04-cursor-rules.md' },
  { id:'D-05', group:'D', title:'Agent 模式（含时序图）', diff:2, path:'D-mcp-and-agent/D-05-agent-mode.md' },
  { id:'D-06', group:'D', title:'AI Skill / Tool 与 MCP 的关系', diff:2, path:'D-mcp-and-agent/D-06-skill-tool-mcp.md' },

  { id:'E-01', group:'E', title:'HTML / CSS 速览', diff:1, path:'E-frontend/E-01-html-css.md' },
  { id:'E-02', group:'E', title:'JavaScript 最小必要', diff:1, path:'E-frontend/E-02-javascript-minimum.md' },
  { id:'E-03', group:'E', title:'TypeScript vs JavaScript', diff:2, path:'E-frontend/E-03-typescript-vs-javascript.md' },
  { id:'E-04', group:'E', title:'React', diff:2, path:'E-frontend/E-04-react.md' },
  { id:'E-05', group:'E', title:'Next.js', diff:2, path:'E-frontend/E-05-nextjs.md' },
  { id:'E-06', group:'E', title:'Tailwind CSS', diff:1, path:'E-frontend/E-06-tailwind.md' },
  { id:'E-07', group:'E', title:'shadcn/ui', diff:1, path:'E-frontend/E-07-shadcn-ui.md' },
  { id:'E-08', group:'E', title:'npm / package.json', diff:1, path:'E-frontend/E-08-npm.md' },

  { id:'F-01', group:'F', title:'API 与 REST', diff:1, path:'F-backend-database/F-01-api-rest.md' },
  { id:'F-02', group:'F', title:'数据库与 SQL 最小必要', diff:2, path:'F-backend-database/F-02-sql-and-database.md' },
  { id:'F-03', group:'F', title:'Supabase', diff:2, path:'F-backend-database/F-03-supabase.md' },
  { id:'F-04', group:'F', title:'Auth 登录系统', diff:2, path:'F-backend-database/F-04-auth.md' },
  { id:'F-05', group:'F', title:'环境变量 .env', diff:1, path:'F-backend-database/F-05-env-variables.md' },
  { id:'F-06', group:'F', title:'Serverless / Edge Function', diff:2, path:'F-backend-database/F-06-serverless-edge.md' },
  { id:'F-07', group:'F', title:'WebSocket / 实时通信', diff:2, path:'F-backend-database/F-07-websocket-realtime.md' },
  { id:'F-08', group:'F', title:'Stripe 支付', diff:2, path:'F-backend-database/F-08-stripe.md' },

  { id:'G-01', group:'G', title:'Vercel（重点）', diff:2, path:'G-deploy-and-launch/G-01-vercel.md' },
  { id:'G-02', group:'G', title:'Netlify', diff:1, path:'G-deploy-and-launch/G-02-netlify.md' },
  { id:'G-03', group:'G', title:'Cloudflare Pages + Workers', diff:2, path:'G-deploy-and-launch/G-03-cloudflare-pages.md' },
  { id:'G-04', group:'G', title:'Railway', diff:1, path:'G-deploy-and-launch/G-04-railway.md' },
  { id:'G-05', group:'G', title:'Render', diff:1, path:'G-deploy-and-launch/G-05-render.md' },
  { id:'G-06', group:'G', title:'Fly.io', diff:2, path:'G-deploy-and-launch/G-06-fly-io.md' },
  { id:'G-07', group:'G', title:'Zeabur（国内友好）', diff:1, path:'G-deploy-and-launch/G-07-zeabur.md' },
  { id:'G-08', group:'G', title:'Sealos', diff:2, path:'G-deploy-and-launch/G-08-sealos.md' },
  { id:'G-09', group:'G', title:'腾讯云 EdgeOne Pages / Makers', diff:1, path:'G-deploy-and-launch/G-09-edgeone-pages.md' },
  { id:'G-10', group:'G', title:'阿里云函数计算 FC', diff:2, path:'G-deploy-and-launch/G-10-aliyun-fc.md' },
  { id:'G-11', group:'G', title:'微信云开发 CloudBase', diff:1, path:'G-deploy-and-launch/G-11-cloudbase.md' },
  { id:'G-12', group:'G', title:'域名与 DNS', diff:1, path:'G-deploy-and-launch/G-12-domain-dns.md' },
  { id:'G-13', group:'G', title:'SSL/HTTPS + Git 最小必要', diff:1, path:'G-deploy-and-launch/G-13-ssl-https-git.md' },
  { id:'G-选型', group:'G', title:'部署平台怎么选', diff:1, path:'G-deploy-and-launch/G-platform-selection.md' },

  { id:'H-01', group:'H', title:'Product Hunt 发布', diff:2, path:'H-marketing-monetize/H-01-product-hunt.md' },
  { id:'H-02', group:'H', title:'X (Build in Public)', diff:2, path:'H-marketing-monetize/H-02-x-build-in-public.md' },
  { id:'H-03', group:'H', title:'小红书宣发', diff:2, path:'H-marketing-monetize/H-03-xiaohongshu.md' },
  { id:'H-04', group:'H', title:'Reddit', diff:2, path:'H-marketing-monetize/H-04-reddit.md' },
  { id:'H-05', group:'H', title:'即刻 / 独立开发者社区', diff:1, path:'H-marketing-monetize/H-05-jike-community.md' },
  { id:'H-06', group:'H', title:'SaaS 定价策略', diff:2, path:'H-marketing-monetize/H-06-saas-pricing.md' },
  { id:'H-07', group:'H', title:'如何找到第一个用户', diff:2, path:'H-marketing-monetize/H-07-find-first-users.md' },
  { id:'H-08', group:'H', title:'变现案例库', diff:1, path:'H-marketing-monetize/H-08-monetization-cases.md' },
];

export const GROUPS = [
  { id:'A', name:'AI 基础概念', desc:'看懂术语、不被劝退', color:'#3B82F6' },
  { id:'B', name:'模型能力与选型', desc:'哪个大脑配你', color:'#A855F7' },
  { id:'C', name:'Vibe Coding 工具', desc:'你的驾驶舱', color:'#06B6D4' },
  { id:'D', name:'MCP 与 Agent', desc:'让 AI 长出手脚', color:'#10B981' },
  { id:'E', name:'前端基础', desc:'看得见的那一层', color:'#F59E0B' },
  { id:'F', name:'后端与数据库', desc:'看不见的那一层', color:'#EC4899' },
  { id:'G', name:'部署与上线', desc:'有公网地址才算赢', color:'#8B5CF6' },
  { id:'H', name:'宣发与变现', desc:'让人用上 + 收到钱', color:'#D4452E' },
];

export const SKILLS_FILES = [
  { id:'prompts', title:'P-01 ~ P-15 · 提示词模板', icon:'prompt', path:'prompts.md', count:15 },
  { id:'cursor-rules', title:'CR-01 ~ CR-06 · Cursor Rules', icon:'rules', path:'cursor-rules.md', count:6 },
  { id:'mcp-configs', title:'M-01 ~ M-08 · MCP 配置', icon:'mcp', path:'mcp-configs.md', count:8 },
  { id:'starter-templates', title:'T-01 ~ T-06 · 起步模板', icon:'template', path:'starter-templates.md', count:6 },
  { id:'workflows', title:'W-01 ~ W-08 · 工作流配方', icon:'workflow', path:'workflows.md', count:8 },
];

// 发布广场种子：见 ./square-data.js（已迁出 + 全 SVG 化）

export const PRESET_BUTTONS = [
  { id:'rookie', label:'我零基础带我开始', icon:'sprout', tone:'primary', action:'goto-phase-0' },
  { id:'explain', label:'解释一个概念', icon:'book', tone:'ghost', action:'ai-prefill', prefill:'用打比方的方式给我解释一下：' },
  { id:'validate', label:'验证我的想法', icon:'idea', tone:'ghost', action:'ai-prefill', prefill:'我的想法是：__。请按「有没有人做 / 同类活得怎样 / 差异点 / 风险」帮我验证。' },
  { id:'launch', label:'怎么让人用我的产品', icon:'broadcast', tone:'ghost', action:'ai-prefill', prefill:'我做了一个 __。给我一个最小可执行的冷启动计划（PH / X / 小红书 / 即刻 各一段物料）。' },
  { id:'browse', label:'随便逛逛', icon:'compass', tone:'ghost', action:'goto-square' },
];

// 今日宜忌（每天根据日期种子）
export const ALMANAC_POOL = {
  yi: ['开张大吉','部署上线','重构代码','学新概念','发推 BIP','写一段 prompt','配 MCP','清理依赖','和 AI 对喷','再发一遍 PH','买域名','写落地页','给老用户写个邮件','把闲置代码 mvp 化','回访旧笔记','向陌生人安利你的产品'],
  ji: ['深夜上线','不写 commit','一次改三处','跳过 .env 检查','在 main 直接改','拒绝看报错','和 AI 较真','装第 18 个新框架','重写一遍','改产品方向','和家人争吵','开会四小时','一个人想 idea','不写时效落款','一边写一边改产品名'],
  model: ['GLM-5.2','Claude 4.5','GPT-5','DeepSeek V3.2','Kimi K2.5','Qwen3','MiniMax M2.5'],
  pos: ['西南方','上午 10 点','凌晨 2 点','下午 3 点 + 一杯咖啡','晚上 9 点 + 室友睡了之后'],
  buddy: ['Cursor','Trae','Lovable','v0','Claude Code','Bolt.new','Replit Agent','Windsurf'],
};
