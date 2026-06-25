// ========================================================================
// 开张 · 发布广场种子内容（mock，纯前端）
//
// 设计公理（visual-design § 1.9）：作品截图是广场的唯一主角
// 设计公理（visual-design § 0）：禁止 emoji，所有图标走 SVG
//
// 每个作品 = 主截图 + 标签（type / status / promo 全部转 SVG icon）
// + 一句话 + 详情段落 + 截图轮播 + 想要的反馈
// ========================================================================

// ---------- SVG 图标 ----------
// 每个 type / status / promo 对应一个纯色 SVG（不用 emoji）
export const TAG_ICONS = {
  // 产品类型（type）
  'tool':    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-6 6 2 2 6-6a4 4 0 0 0 5.4-5.4l-2 2-1.4-1.4z"/></svg>',
  'design':  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="13.5" cy="6.5" r="2"/><circle cx="17.5" cy="10.5" r="2"/><circle cx="8.5" cy="7.5" r="2"/><circle cx="6.5" cy="12.5" r="2"/><path d="M12 2a10 10 0 0 0 0 20c1 0 2-.4 2-2 0-1-1-1-1-2 0-1 1-1 2-1 4 0 7-3 7-7 0-5-4-8-10-8z"/></svg>',
  'content': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="14" y2="17"/></svg>',
  'ai':      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><circle cx="5" cy="5" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><line x1="7" y1="7" x2="10" y2="10"/><line x1="17" y1="7" x2="14" y2="10"/><line x1="7" y1="17" x2="10" y2="14"/><line x1="17" y1="17" x2="14" y2="14"/></svg>',
  'commerce':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>',
  'mobile':  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18.01"/></svg>',
  'game':    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="4"/><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><circle cx="15" cy="11" r=".8" fill="currentColor"/><circle cx="17" cy="13" r=".8" fill="currentColor"/></svg>',
  'life':    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12l9-9 9 9"/><path d="M5 10v10h14V10"/><line x1="10" y1="20" x2="10" y2="14"/><line x1="14" y1="20" x2="14" y2="14"/></svg>',

  // 状态
  'idea':    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 13l1 3h6l1-3a7 7 0 0 0-4-13z"/></svg>',
  'dev':     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  'live':    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 13s2-9 9-10c-1 7-10 9-10 9z"/><path d="M14 6a3 3 0 0 1 4 4"/><path d="M9 14l1 5 5 1z"/></svg>',
  'iter':    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><polyline points="21 3 21 8 16 8"/></svg>',

  // 宣发
  'ph':      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9 8h4a3 3 0 0 1 0 6H9V8m0 6v4"/></svg>',
  'x':       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>',
  'xhs':     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6h12v8a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4z"/><line x1="9" y1="3" x2="9" y2="6"/><line x1="15" y1="3" x2="15" y2="6"/></svg>',
  'jike':    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/></svg>',
  'bili':    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M7 3l3 3M17 3l-3 3"/><circle cx="9" cy="13" r=".8" fill="currentColor"/><circle cx="15" cy="13" r=".8" fill="currentColor"/></svg>',

  // metric icons
  'like':    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.6z"/></svg>',
  'book':    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>',
  'msg':     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  'link':    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>',
  'eye':     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
};

// type 标签的标准结构（替换原来的 emoji）
export const TYPE_OPTIONS = [
  { id: 'tool',     name: '工具' },
  { id: 'design',   name: '设计' },
  { id: 'content',  name: '内容' },
  { id: 'ai',       name: 'AI' },
  { id: 'commerce', name: '电商' },
  { id: 'mobile',   name: '移动' },
  { id: 'game',     name: '游戏' },
  { id: 'life',     name: '生活' },
];
export const STATUS_OPTIONS = [
  { id: 'idea', name: '想法' },
  { id: 'dev',  name: '开发中' },
  { id: 'live', name: '已上线' },
  { id: 'iter', name: '改版中' },
];
export const PROMO_OPTIONS = [
  { id: 'ph',   name: 'Product Hunt' },
  { id: 'x',    name: 'X' },
  { id: 'xhs',  name: '小红书' },
  { id: 'jike', name: '即刻' },
  { id: 'bili', name: 'B站' },
];

// ---------- 种子内容（mock） ----------
// cover 用 CSS gradient + 半透明 SVG pattern，作为"主截图"占位
// gradient 形如 [from, to]，pattern 是顶层 SVG（用 ID 引用 patterns 库里的）
export const SQUARE_SEEDS = [
  {
    id: 'seed-1',
    name: '开张 KAIZHANG',
    tagline: '给独立开发者的「学 → 做 → 成」一站式 AI 学习站',
    type: 'tool',
    stack: ['Next.js', 'Supabase', 'Stripe', 'Tailwind'],
    status: 'live',
    promo: ['x'],
    cover: { gradient: ['#3B82F6', '#6366F1'], pattern: 'grid' },
    screenshots: [
      { gradient: ['#3B82F6', '#1E3A8A'], pattern: 'grid',
        caption: '欢迎页 · 输入即问 AI / 5 个预置入口' },
      { gradient: ['#1E40AF', '#6366F1'], pattern: 'dots',
        caption: '三栏工作台 · 资讯 × 咨询同源' },
      { gradient: ['#312E81', '#3B82F6'], pattern: 'lines',
        caption: '发布广场 · 积分制反馈互惠' },
    ],
    description: `从 80 张知识卡片切入 vibe coding，沿"学 → 做 → 成"主线完整走完。
- 选中正文文字 → 浮工具条问 AI / 归档
- AI 副驾流式回答，自动挂载相关卡片
- 笔记本地存储，可导出 Markdown
- 发布广场支持开张大吉仪式 + 喜报分享卡`,
    metrics: { mrr: '—', users: '—', launchedDays: 4 },
    likes: 142, bookmarks: 38, comments: 17, views: 1024,
    wants: '学习路径的设计逻辑哪里不合理？哪些卡片该砍？推荐你日常用的 vibe coding 工具',
    link: 'https://kaizhang.example.com',
    author: { name: '开张小队', avatar: 'K', tone: '#3B82F6' },
    publishedAt: '2026-06-20',
  },
  {
    id: 'seed-2', name: 'CommitDaily',
    tagline: '每天下午 5 点 AI 自动总结你的 git commits + 日程',
    type: 'ai',
    stack: ['Cursor', 'DeepSeek', 'Qwen', 'Next.js'],
    status: 'dev', promo: ['ph'],
    cover: { gradient: ['#A855F7', '#EC4899'], pattern: 'circuit' },
    screenshots: [
      { gradient: ['#7C3AED', '#A855F7'], pattern: 'circuit',
        caption: '日报模板 · 自动抓 commits' },
      { gradient: ['#A855F7', '#EC4899'], pattern: 'dots',
        caption: '设置页 · 可配多个 repo' },
    ],
    description: `远程开发者最痛的一件事：每天写日报。
让 AI 看你今天的 git commits + Calendar 事件 + Linear/Jira issues，
自动生成一份 Slack/邮件可发的日报。`,
    likes: 78, bookmarks: 21, comments: 9, views: 412,
    wants: '愿意为这个功能支付多少月费？除了 git 还想接什么数据源？',
    link: 'https://commitdaily.example.com',
    author: { name: '老李', avatar: '李', tone: '#A855F7' },
    publishedAt: '2026-06-18',
  },
  {
    id: 'seed-3', name: '今日穿搭',
    tagline: 'AI 根据气温和日程帮你搭一套衣服',
    type: 'mobile',
    stack: ['Trae', 'CloudBase', '微信小程序'],
    status: 'live', promo: ['xhs'],
    cover: { gradient: ['#F59E0B', '#EF4444'], pattern: 'wave' },
    screenshots: [
      { gradient: ['#F59E0B', '#FB923C'], pattern: 'wave',
        caption: '推荐页 · 每天一套' },
      { gradient: ['#EF4444', '#F59E0B'], pattern: 'dots',
        caption: '衣柜识别 · 拍照即录入' },
    ],
    description: `早上想穿什么很费脑。
打开小程序看一眼：今天 18-22 度 + 下午有客户会议 → AI 推荐一套衬衫+西裤组合，
不喜欢可换。3 个月以来 80% 用户每天打开 1 次以上。`,
    metrics: { dau: '~3.4k', launchedDays: 92 },
    likes: 312, bookmarks: 89, comments: 41, views: 5320,
    wants: '天气数据准不准？风格满意吗？要加"拍照识别衣柜"吗？',
    link: '微信搜索「今日穿搭」',
    author: { name: 'mizuki', avatar: 'M', tone: '#F59E0B' },
    publishedAt: '2026-06-15',
  },
  {
    id: 'seed-4', name: 'TIL · Today I Learned',
    tagline: '零碎学习自动整理成卡片 → 长出你的知识库',
    type: 'tool',
    stack: ['v0', 'Lovable', 'Supabase'],
    status: 'idea', promo: [],
    cover: { gradient: ['#10B981', '#06B6D4'], pattern: 'grid' },
    screenshots: [
      { gradient: ['#059669', '#10B981'], pattern: 'grid',
        caption: '原型图 · 三列布局' },
    ],
    description: `灵感来自 "Today I Learned" 社区。每天记几条零碎学习
（"原来 PostgreSQL 的 RETURNING 可以这样用"），
AI 把它们归类、合并、长成卡片，几个月后就是你自己的小知识库。`,
    likes: 26, bookmarks: 11, comments: 5, views: 188,
    wants: '你现在用什么记零碎知识？愿意付 ¥9/月吗？',
    link: '',
    author: { name: 'sundae', avatar: 'S', tone: '#10B981' },
    publishedAt: '2026-06-12',
  },
  {
    id: 'seed-5', name: 'UI Copilot',
    tagline: '一句话描述需求 → 帮你找到 shadcn/ui 组件和用法',
    type: 'design',
    stack: ['React', 'Tailwind', 'shadcn', 'Cursor'],
    status: 'live', promo: ['jike'],
    cover: { gradient: ['#EC4899', '#F59E0B'], pattern: 'dots' },
    screenshots: [
      { gradient: ['#DB2777', '#EC4899'], pattern: 'dots',
        caption: '搜索结果 · 组件 + 完整代码' },
      { gradient: ['#EC4899', '#F472B6'], pattern: 'circuit',
        caption: '一键复制到 Cursor' },
    ],
    description: `开发的时候经常想"那个 shadcn 的 Card 组件叫啥来着"。
打开这个 → 输入"带头像的可点击卡片" → 立刻给你完整代码 + 装命令。`,
    likes: 196, bookmarks: 54, comments: 12, views: 2410,
    wants: '搜组件最常搜什么词？要不要加"手写代码替换 shadcn"模式？',
    link: 'https://ui-copilot.example.com',
    author: { name: 'kano', avatar: 'K', tone: '#EC4899' },
    publishedAt: '2026-06-11',
  },
  {
    id: 'seed-6', name: 'ReviewGPT',
    tagline: 'AI review GitHub PR · CI 上自动跑、自动评论',
    type: 'ai',
    stack: ['Claude Code', 'Qwen', 'Supabase', 'Vercel'],
    status: 'iter', promo: ['x', 'jike'],
    cover: { gradient: ['#06B6D4', '#3B82F6'], pattern: 'circuit' },
    screenshots: [
      { gradient: ['#0891B2', '#06B6D4'], pattern: 'circuit',
        caption: 'PR 评论示例 · 标注潜在 bug' },
      { gradient: ['#3B82F6', '#06B6D4'], pattern: 'lines',
        caption: 'Dashboard · 团队代码质量趋势' },
    ],
    description: `团队 PR review 永远积压，请 senior 看一眼又要两天。
ReviewGPT 在 CI 阶段先过一遍：标 bug / 漏洞 / 风格问题，让人类 review 只看真正难的部分。
现在已经有 14 个团队在用。`,
    metrics: { mrr: '$2,300', users: '14 teams' },
    likes: 421, bookmarks: 132, comments: 56, views: 8240,
    wants: '团队真的用 PR review 吗？10% 误报率能接受吗？支持哪些语言？',
    link: 'https://reviewgpt.example.com',
    author: { name: 'koji', avatar: 'K', tone: '#06B6D4' },
    publishedAt: '2026-06-09',
  },
  {
    id: 'seed-7', name: '独立开发日记',
    tagline: '记录第 1 到 12 个月真实收入和教训',
    type: 'content',
    stack: ['Astro', 'Tailwind', 'Cloudflare'],
    status: 'live', promo: ['xhs'],
    cover: { gradient: ['#D97706', '#92400E'], pattern: 'lines' },
    screenshots: [
      { gradient: ['#D97706', '#F59E0B'], pattern: 'lines',
        caption: '首页 · 月度收入曲线' },
    ],
    description: `把自己做独立开发 12 个月的真实数据全部公开 — 收入、失败的尝试、心理崩溃、再爬起来的过程。
不是教程，是给后来人的"我犯过哪些蠢"。`,
    metrics: { views: '52K', subscribers: '1.8K' },
    likes: 689, bookmarks: 234, comments: 88, views: 14250,
    wants: '哪篇最有帮助？想看收入数字还是经验教训？',
    link: 'https://indie-dev-journal.example.com',
    author: { name: 'aki', avatar: 'A', tone: '#D97706' },
    publishedAt: '2026-06-05',
  },
  {
    id: 'seed-8', name: 'LemonPrint',
    tagline: '把你的 AI 工具截图打印成海报 — 独立开发者周边',
    type: 'commerce',
    stack: ['Next.js', 'Supabase', 'Stripe', 'Trae'],
    status: 'dev', promo: [],
    cover: { gradient: ['#65A30D', '#16A34A'], pattern: 'wave' },
    screenshots: [
      { gradient: ['#16A34A', '#65A30D'], pattern: 'wave',
        caption: '上传截图 → 自动排版海报' },
      { gradient: ['#65A30D', '#84CC16'], pattern: 'grid',
        caption: '选材质 · 尺寸 · 下单' },
    ],
    description: `做 AI 产品的人，往往最自豪的是某个截图。
上传截图 → 自动配文案、排版、生成海报 → 我们帮你印出来寄到家。
也可以挂在 LemonPrint 卖给同行（5% 抽成）。`,
    likes: 54, bookmarks: 18, comments: 7, views: 308,
    wants: '会买自己产品的海报挂墙吗？¥49 / ¥99 / ¥149 哪个价位？',
    link: '',
    author: { name: 'lemon', avatar: 'L', tone: '#65A30D' },
    publishedAt: '2026-06-03',
  },
  {
    id: 'seed-9', name: 'PromptBuilder',
    tagline: '可视化编辑 / 测试 / 版本管理你的 AI prompt',
    type: 'ai',
    stack: ['Qoder', 'DeepSeek', 'Tailwind'],
    status: 'dev', promo: ['ph'],
    cover: { gradient: ['#D4452E', '#C2410C'], pattern: 'circuit' },
    screenshots: [
      { gradient: ['#9A3412', '#D4452E'], pattern: 'circuit',
        caption: 'Diff 视图 · 两个 prompt 版本对比' },
      { gradient: ['#D4452E', '#F97316'], pattern: 'dots',
        caption: 'A/B 测试 · 看哪版输出质量更高' },
    ],
    description: `做 AI 产品的人都遇到过：改了 prompt，结果变差了，但分不清是哪一改导致的。
PromptBuilder 给 prompt 加 git — 每次改都有 diff，可回滚，可 A/B 测试。`,
    likes: 213, bookmarks: 78, comments: 22, views: 3420,
    wants: '现在怎么管理 prompt？期望 Web 还是 VSCode 插件？',
    link: 'https://promptbuilder.example.com',
    author: { name: 'pp', avatar: 'P', tone: '#D4452E' },
    publishedAt: '2026-05-30',
  },
  {
    id: 'seed-10', name: '备案助手',
    tagline: 'AI 自动填 ICP 备案表 + 生成合规文案',
    type: 'tool',
    stack: ['Trae', 'EdgeOne', '混元', 'CloudBase'],
    status: 'idea', promo: [],
    cover: { gradient: ['#6366F1', '#1E293B'], pattern: 'grid' },
    screenshots: [
      { gradient: ['#4338CA', '#6366F1'], pattern: 'grid',
        caption: '原型 · 三步走完备案流程' },
    ],
    description: `想上线国内服务器但 ICP 备案吓到劝退。
让 AI 帮你填表、自动生成符合规范的隐私政策 / 用户协议 / 合规文案，
最快 1 天提交、平均 7-15 天下来。`,
    likes: 88, bookmarks: 33, comments: 14, views: 526,
    wants: 'ICP 备案花了多久？最痛苦环节？担心违禁词吗？',
    link: '',
    author: { name: 'beian', avatar: 'B', tone: '#6366F1' },
    publishedAt: '2026-05-28',
  },

  {
    id: 'real-cursor', name: 'Cursor',
    tagline: 'AI-first 代码编辑器，vibe coding 的代表工具',
    type: 'tool', stack: ['AI IDE', 'VS Code', 'LLM'], status: 'live', promo: ['ph','x'],
    cover: { gradient: ['#111827', '#3B82F6'], pattern: 'grid' },
    screenshots: [{ gradient: ['#111827', '#3B82F6'], pattern: 'grid', caption: 'AI IDE 工作台示意' }],
    description: 'Cursor 是 AI coding 最具代表性的工具之一，适合作为开张用户理解 AI IDE 的真实案例。',
    metrics: { source: 'public', category: 'AI IDE' },
    likes: 520, bookmarks: 210, comments: 64, views: 12000,
    wants: '你第一次用 Cursor 卡在哪里？最想看哪类教程？',
    link: 'https://cursor.com',
    author: { name: 'Cursor', avatar: 'C', tone: '#3B82F6' },
    publishedAt: '2026-06-25',
  },
  {
    id: 'real-openwebui', name: 'Open WebUI',
    tagline: '开源本地/私有化 AI 聊天界面，适合学习 AI 产品架构',
    type: 'ai', stack: ['Open Source', 'LLM', 'Docker'], status: 'live', promo: ['x'],
    cover: { gradient: ['#0F172A', '#10B981'], pattern: 'circuit' },
    screenshots: [{ gradient: ['#0F172A', '#10B981'], pattern: 'circuit', caption: '聊天产品架构案例' }],
    description: 'Open WebUI 是非常流行的开源 AI 聊天产品，适合作为学习 AI 产品功能架构、插件和私有化部署的案例。',
    metrics: { github: '100k+ stars level' },
    likes: 430, bookmarks: 180, comments: 52, views: 9800,
    wants: '你会想把它改造成什么垂直场景？',
    link: 'https://github.com/open-webui/open-webui',
    author: { name: 'Open WebUI', avatar: 'O', tone: '#10B981' },
    publishedAt: '2026-06-25',
  },
  {
    id: 'real-n8n', name: 'n8n',
    tagline: '开源自动化工作流工具，是 AI Agent 工作流的好参考',
    type: 'tool', stack: ['Workflow', 'Automation', 'AI'], status: 'live', promo: ['x'],
    cover: { gradient: ['#EA4B71', '#111827'], pattern: 'circuit' },
    screenshots: [{ gradient: ['#EA4B71', '#111827'], pattern: 'circuit', caption: '节点式工作流产品参考' }],
    description: 'n8n 是成熟的开源工作流产品，适合开张用户学习节点式自动化、工具调用和可视化编排。',
    metrics: { github: '100k+ stars level' },
    likes: 610, bookmarks: 260, comments: 75, views: 15000,
    wants: '如果做一个面向新手的 n8n 简化版，应该保留哪些节点？',
    link: 'https://github.com/n8n-io/n8n',
    author: { name: 'n8n', avatar: 'N', tone: '#EA4B71' },
    publishedAt: '2026-06-25',
  },
];
