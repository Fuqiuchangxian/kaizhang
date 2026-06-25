---
group: A-ai-basics
card_id: A-10
title: 流式输出 Streaming
difficulty: ⭐
last_updated: 2026-06-23
status: 已核实
related: [A-01, E-05, F-06]
---

# A-10 流式输出 Streaming

## 一句话定义
Streaming = AI 不等整段答案写完才一次性发给你，而是**生成一个字就推一个字**——就是你在 ChatGPT 看到的"打字机效果"。

## 打个比方
**非流式像快递包裹**：你下单后等 30 秒，"砰"一下完整答案送到你面前。
**流式像同事在微信里给你打字**：他每打几个字你就先看到了，不用等他全部输入完。

体感差别巨大——AI 生成一段 500 字的回复要 5-10 秒，非流式用户会盯着空白屏幕抓狂；流式哪怕总时间一样，用户从第 0.3 秒就能看到内容，焦虑感几乎消失。

## 和 vibe coding 的关系
**所有"AI 对话框"类产品都必须做流式**，这是用户体验的基础。
- 在前端：你需要处理 Server-Sent Events (SSE) 或 ReadableStream
- 在后端：你的 API 路由必须是流式的（Next.js Edge Function、Vercel AI SDK 帮你封装好了）
- 框架支持：**Vercel AI SDK** 是事实标准，5 行代码搞定流式聊天界面

## 典型场景 / 示例

**Next.js + Vercel AI SDK 最简流式 API**（服务端）：
```typescript
// app/api/chat/route.ts
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: openai('gpt-4o-mini'),
    messages,
  });
  return result.toDataStreamResponse();
}
```

**前端**（用 `useChat` hook）：
```tsx
'use client';
import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <div>
      {messages.map(m => <p key={m.id}>{m.role}: {m.content}</p>)}
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} />
      </form>
    </div>
  );
}
```
这样就有打字机效果了。

## 常见误区
- ❌ **"流式比非流式快"**：实际生成总时间一样。流式快的是"首字时间"（TTFB），不是总耗时。
- ❌ **"流式不需要错误处理"**：流到一半可能断、可能超时。前端要处理"流意外中断"的情况（继续等 / 重连 / 提示用户）。
- ❌ **"流式输出能边算 token 边收费"**：大多数云服务商按完整 token 数计费，不管你是不是中途取消。注意成本控制——用户关掉页面，token 可能还在烧。
- ❌ **"AI SDK 只支持 OpenAI"**：Vercel AI SDK 支持 Anthropic、Google、xAI、国产 DeepSeek/Qwen 等几十家，切换只改一行。

## 延伸阅读
- [Vercel AI SDK 官方文档](https://ai-sdk.dev/) `[英 · ⭐⭐ · 免费 · 持续更新]` 流式聊天事实标准，先看这个。
- [MDN: Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events) `[英 · ⭐⭐ · 免费 · 常青]` SSE 协议本身。
- [OpenAI Streaming Cookbook](https://cookbook.openai.com/examples/how_to_stream_completions) `[英 · ⭐⭐ · 免费 · 持续更新]` 不用 SDK 也能搞流式。

## 去问 AI
> 「我要用 Next.js + Vercel AI SDK 做一个流式聊天界面，模型用 OpenAI gpt-4o-mini。请给我完整可跑的代码（包括前端、后端、环境变量配置），并解释每一段在做什么。」

---
**来源**：① Vercel AI SDK 文档  ② MDN  ③ OpenAI Cookbook
**查询日期**：2026-06-23 · **数据来源时间**：2024-2026
