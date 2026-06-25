---
group: A-ai-basics
card_id: A-03
title: Prompt 提示词
difficulty: ⭐
last_updated: 2026-06-23
status: 已核实
related: [A-04, A-12]
---

# A-03 Prompt 提示词

## 一句话定义
Prompt 就是你对 AI 说的那段话——但写得好的 prompt 不是"提问"，而是"下达带背景、带角色、带格式要求的工作指令"。

## 打个比方
**好 prompt 像给新来的实习生派活**：
- 差："写点文案。" → 实习生一脸懵
- 好："你是我的小红书运营。给一款帮独立开发者找用户的 SaaS 写 3 条种草笔记，每条 200 字以内，要有 emoji、要有钩子开头、要带 3 个相关 hashtag。"

后者给了实习生：**身份 + 任务 + 输入材料 + 输出格式 + 数量约束**。AI 也是同一回事。

## 和 vibe coding 的关系
Prompt 是你在 Cursor / Lovable / Claude Code 里**唯一的输入手段**。同样一个产品想法，差的 prompt 让 AI 生成出来的代码漏洞百出、风格混乱，需要反复返工；好的 prompt 一次产出 80 分作品。**写 prompt 的能力 = vibe coder 的核心能力**。

## 典型场景 / 示例
**差 prompt**：
> 给我做个登录页

**好 prompt**：
> 你是一个资深 Next.js 全栈开发者。
> 帮我用 Next.js 14 (App Router) + Tailwind + shadcn/ui，做一个登录页面 `app/login/page.tsx`：
> - 支持邮箱密码登录 + Google OAuth
> - 用 Supabase Auth 实现
> - 提交按钮要有 loading 状态
> - 错误信息用 toast 弹出
> - 整体风格参考 linear.app，深色背景 + 渐变光晕
> - 写完后告诉我还需要在 `.env.local` 里配哪些变量

## 常见误区
- ❌ **"AI 应该懂我的意思"**：AI 不会读心。你脑子里那张 UI 草图，必须用文字描述出来它才看得到。
- ❌ **"短 prompt 才是高手"**：恰好相反——明确、结构化的长 prompt 通常效果更好。简短可以，但前提是 AI 已经有足够的上下文。
- ❌ **"一次没成功就放弃"**：先反问 AI："为什么你这样做？" 让它解释。理解了它的"误解"，再调整 prompt 重发。

## 延伸阅读

### 📺 视频教程
- [Prompt Engineering 大师课 (YouTube · 1h)](https://www.youtube.com/watch?v=_ZvnD73m40s) `[英 · ⭐⭐ · 免费 · 2023]` 系统讲解 prompt 设计原则
- [The Prompt Engineer (YouTube 系列)](https://www.youtube.com/@thepromptengineer) `[英 · ⭐⭐ · 免费 · 持续]` 专做 prompt engineering 的频道，案例丰富
- [AI Chat Lab: Prompt Engineering 入门 (B站)](https://www.bilibili.com/video/BV1no4y1M7Zf) `[中 · ⭐ · 免费 · 2023]` 中文入门

### 📰 文章
- [OpenAI Prompt Engineering 官方指南](https://platform.openai.com/docs/guides/prompt-engineering) `[英 · ⭐⭐ · 免费 · 持续更新]` 官方最权威。
- [Anthropic Prompt Library](https://docs.anthropic.com/en/prompt-library) `[英 · ⭐ · 免费 · 持续更新]` 各种现成 prompt 模板可参考。
- [Learn Prompting (中文)](https://learnprompting.org/zh-Hans/docs/intro) `[中 · ⭐ · 免费 · 2024]` 系统化中文教程，免费完整。

## 去问 AI
> 「我要做一个 [你的产品]。请你扮演一个 prompt 工程师，问我 5 个问题，帮我把模糊想法转换成一个高质量的开发 prompt。」

---
**来源**：① OpenAI 官方  ② Anthropic 官方  ③ Learn Prompting
**查询日期**：2026-06-23 · **数据来源时间**：2024-2026
