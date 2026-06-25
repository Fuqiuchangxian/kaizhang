// ========================================================================
// 开张 · 每张知识卡片的"附加资源"（视频 / 互动 / 推荐工具）
// 站内嵌入：YouTube 用 youtube-nocookie 嵌入；B站用 player.bilibili.com 嵌入
// 设计：让"学"图文并茂，不只是 Markdown 渲染
// ========================================================================

// 每条 video 形如：{ platform: 'yt' | 'bilibili', id: '...', title, dur, lang, year, by }
// platform 决定 iframe URL：
//   yt → https://www.youtube-nocookie.com/embed/{id}
//   bilibili → https://player.bilibili.com/player.html?bvid={id}&autoplay=0
// 注：B 站要求高字段，传 bvid（BV开头）
// 这些都是被广泛传播的公开视频，仅用于教学嵌入

export const CARD_RESOURCES = {
  'A-01': {
    summary: 'LLM 是接龙机：读过半个互联网的文字 → 给你接最可能的下一个字',
    keyConcepts: [
      { term: 'Token', def: 'LLM 看见的最小单位，不是字也不是词' },
      { term: '上下文窗口', def: '一次能看进的 token 总量' },
      { term: '幻觉', def: '"接龙"接出来的不一定是事实' },
    ],
    videos: [
      { platform: 'yt', id: 'zjkBMFhNj_g',
        title: 'Intro to Large Language Models · Andrej Karpathy',
        dur: '1h', lang: '英', year: 2023, by: 'Karpathy',
        why: '一小时把 LLM 工作原理讲透，最经典入门' },
      { platform: 'yt', id: '7xTGNNLPyMI',
        title: 'But what is a GPT? · 3Blue1Brown',
        dur: '27min', lang: '英 / 中字', year: 2024, by: '3Blue1Brown',
        why: '动画讲清 Transformer 背后的数学' },
    ],
    askPresets: [
      '用"幼儿园老师玩词语接龙"的例子解释 LLM 为什么会胡说八道',
      '我用 Cursor 写代码，背后到底发生了什么？一步步描述给我',
      'GPT-5 和 Claude 4.5 同样问一道题，结果可能不一样吗？为什么？',
    ],
  },
  'A-03': {
    summary: 'Prompt = 你给 LLM 的输入。好 prompt = 背景 + 角色 + 任务 + 约束 + 输出格式',
    keyConcepts: [
      { term: '角色设定', def: '"你是一名 senior 工程师"等于给模型套滤镜' },
      { term: 'Few-shot', def: '给 2-3 个示例，模型立刻学会你的风格' },
      { term: 'CoT', def: '让模型 step-by-step 推理 → 准确率显著上升' },
    ],
    videos: [
      { platform: 'yt', id: 'dOxUroR57xs',
        title: 'Prompt Engineering Tutorial',
        dur: '40min', lang: '英', year: 2023, by: 'freeCodeCamp',
        why: '系统讲完 prompt 七大技巧' },
    ],
    askPresets: [
      '我写的这个 prompt 哪里不好？帮我改：[贴你的 prompt]',
      '给我一个写"产品 PRD"用的 prompt 模板',
    ],
  },
  'A-07': {
    summary: 'Agent = LLM + 工具 + 循环（Think → Act → Observe）',
    keyConcepts: [
      { term: 'Tool Use', def: 'LLM 不直接说答案，而是说"我要调 search()"' },
      { term: '循环上限', def: 'Agent 必须有 max_steps，否则跑飞' },
      { term: 'ReAct', def: 'Thought → Action → Observation 模式' },
    ],
    videos: [
      { platform: 'yt', id: 'sal78ACtGTc',
        title: 'How to Build Effective AI Agents',
        dur: '45min', lang: '英', year: 2024, by: 'Anthropic',
        why: '官方讲怎么不把 Agent 做成黑盒' },
    ],
    askPresets: [
      '帮我设计一个能"读邮件 + 自动回复"的 Agent，给我 ReAct 系统 prompt',
    ],
  },
  'D-01': {
    summary: 'MCP = AI 工具调用的"USB-C 接口" — 任意客户端 × 任意工具',
    keyConcepts: [
      { term: '客户端', def: 'Cursor / Claude Code / Cline 等' },
      { term: 'Server', def: '工具提供方：Supabase / GitHub / 浏览器 / 数据库' },
      { term: 'stdio / HTTP', def: 'MCP 支持两种传输' },
    ],
    videos: [
      { platform: 'yt', id: 'sahuZMMXNpI',
        title: 'MCP Explained · Anthropic',
        dur: '12min', lang: '英', year: 2024, by: 'Anthropic',
        why: '官方一手介绍 MCP 概念' },
    ],
    askPresets: [
      '给我一个 Supabase MCP 的完整配置 + 怎么验证它生效',
      '没有 MCP 之前，我们是怎么让 AI 调工具的？两者的差别在哪？',
    ],
  },
  'C-01': {
    summary: 'Cursor = 基于 VSCode 改的 AI-first IDE，最适合 vibe coding 起步',
    keyConcepts: [
      { term: 'Composer', def: '多文件改动一次性预览 + apply' },
      { term: '.cursorrules', def: '把你的代码规范固化给 AI' },
      { term: 'Cmd+K', def: '行内编辑：选中代码 → 一句话改写' },
    ],
    videos: [
      { platform: 'yt', id: 'gYLNxUxVomY',
        title: 'Cursor in 60 seconds',
        dur: '1min', lang: '英', year: 2024, by: 'Cursor 官方',
        why: '快速感受 Cursor 全貌' },
    ],
    askPresets: [
      '给我一份 .cursorrules · Next.js + Supabase 全栈版',
      'Cursor 的 Composer 和 Cmd+K 啥时候用哪个？',
    ],
  },
  'G-01': {
    summary: 'Vercel 是 vibe coder 默认部署平台 — `git push` 即上线',
    keyConcepts: [
      { term: 'Preview Deploy', def: '每个 PR 自动一个临时 URL，可分享给同事' },
      { term: '环境变量', def: 'Dashboard → Settings → Env Variables' },
      { term: 'Edge Functions', def: '部署到 CDN 边缘，冷启动 < 50ms' },
    ],
    videos: [
      { platform: 'yt', id: 'AvLEd6UNs_k',
        title: 'Deploy Next.js to Vercel · 5min walkthrough',
        dur: '5min', lang: '英', year: 2024, by: 'Vercel',
        why: '官方 5 分钟全流程' },
    ],
    askPresets: [
      '我把代码推 GitHub 后，Vercel 报 "环境变量未配置"，一步步教我修',
    ],
  },
  // 其他卡片若没显式定义，渲染时回退到通用模板
};

// 通用的 ask presets（任何卡片都可以用）
export const GENERIC_ASK_PRESETS = [
  '用打比方的方式给我重新解释一遍',
  '我准备做一个项目用到这个，给我一个最小可运行示例',
  '这个概念最容易踩的 3 个坑是什么',
  '我不懂 [某段]，能用更简单的话讲一下吗',
];
