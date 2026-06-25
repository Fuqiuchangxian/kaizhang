---
group: A-ai-basics
card_id: A-04
title: System Prompt 系统提示词
difficulty: ⭐
last_updated: 2026-06-23
status: 已核实
related: [A-03, D-04]
---

# A-04 System Prompt 系统提示词

## 一句话定义
System Prompt 是写在对话**最顶层**、AI 看不到但永远遵守的一段"角色设定 + 行为约束"，相当于给 AI 装的"出厂参数"。

## 打个比方
普通 prompt 是**老板每次开会布置的任务**；System Prompt 是**员工手册**——一旦签了，无论老板今天让他做啥，他都得照着手册的原则来。
- 员工手册写"我们公司不接酒类客户" → 老板让他去拉酒厂订单，他会拒绝。
- 员工手册写"对所有客户讲普通话" → 客户问他"你会粤语吗"，他会用普通话回"我目前的工作语言是普通话"。

## 和 vibe coding 的关系
- 在 Cursor 里，`.cursorrules` 文件就是 System Prompt（见 D-04）：你可以写"永远用 TypeScript 严格模式""所有数据库操作必须有 try-catch""中文回答"，AI 后续所有生成都会遵守。
- 在你自己做的 AI 产品里，System Prompt 决定了产品的"人格"——客服 bot 友善还是冰冷、是否能聊产品以外的话题，都是 System Prompt 设定的。

## 典型场景 / 示例

**用作"角色定义"**：
```
你是一个有 10 年经验的儿科医生，回答家长的育儿问题。
- 永远先表达共情
- 不开药方，只给观察建议
- 遇到严重症状立刻建议就医
- 用大白话，避免医学术语
```

**用作"格式约束"**（开发场景）：
```
You are a senior Next.js developer.
- Always use TypeScript with strict mode.
- Use App Router, never Pages Router.
- Database queries must use Supabase client.
- Reply in Chinese for explanations, English for code comments.
```

## 常见误区
- ❌ **把 System Prompt 写得太长太啰嗦**：System Prompt 也算 token、也占上下文窗口。每个字都要"挣到位置"。
- ❌ **以为 System Prompt 是 100% 保险锁**：它可以被用户用"角色扮演""忽略上面指令"等方式绕过——这就是著名的 prompt injection（提示词注入）。涉及敏感操作必须在代码层校验，不能只靠 System Prompt。
- ❌ **没意识到 Cursor Rules / Custom Instructions 就是 System Prompt**：很多人把 IDE 里"AI 规则"配置当成普通设置，其实它就是给 AI 的 System Prompt。

## 延伸阅读

### 📺 视频教程
- [吴恩达 · ChatGPT Prompt Engineering for Developers](https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/) `[英 · ⭐⭐ · 免费 · 2023 · 1h]` 系统 prompt 工程课程，含 system prompt 深度讲解
- [Prompt Engineering Guide (YouTube)](https://www.youtube.com/watch?v=dOxUroR57xs) `[英 · ⭐⭐ · 免费 · 2024 · 20min]` prompt 设计技巧与 system prompt 最佳实践

### 📰 文章
- [Anthropic: System Prompts](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/system-prompts) `[英 · ⭐⭐ · 免费 · 2024]` 官方解释 + 实例。
- [OpenAI Best Practices for Prompt Engineering](https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api) `[英 · ⭐ · 免费 · 持续更新]`
- [Awesome ChatGPT Prompts](https://github.com/f/awesome-chatgpt-prompts) `[英 · ⭐ · 免费 · 持续更新]` 8 万 star，各种角色 System Prompt 模板。

## 去问 AI
> 「我想给一个'每天提醒我喝水'的 AI 助手写 System Prompt。请你扮演 prompt 工程师，给我 3 个不同性格版本（严厉、温柔、搞笑），并解释每条规则的作用。」

---
**来源**：① Anthropic 官方  ② OpenAI 官方  ③ Awesome ChatGPT Prompts
**查询日期**：2026-06-23 · **数据来源时间**：2024-2026
