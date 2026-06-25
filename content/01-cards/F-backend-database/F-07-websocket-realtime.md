---
group: F-backend-database
card_id: F-07
title: WebSocket / 实时通信
difficulty: ⭐⭐
last_updated: 2026-06-23
status: 已核实
related: [F-03, E-05]
---

# F-07 WebSocket / 实时通信

## 一句话定义
**WebSocket** 在客户端和服务端之间**建立一条持久连接**，两边可以随时给对方推送数据——不像 HTTP 请求那样"你一句我一句"轮询。

## 打个比方
- **HTTP（REST API）** = 你发一条微信消息，对方看到回一条——每次都要建立新对话
- **WebSocket** = 你俩**开了一个视频通话**——可以随时说话、表情、拿东西给对方看，不用挂掉

**适用场景**：聊天、实时通知、协作编辑、实时数据面板——任何"服务端有数据更新要及时告诉用户"的场景。

## 和 vibe coding 的关系
- **最简单的方案：Supabase Realtime**（内置 WebSocket 服务，3 行代码搞定实时订阅）
- 做聊天、通知、AI 流式输出（A-10 的补充）都需要
- 2026 年一般**不直接写 WebSocket 协议**，而是用平台封装好的服务

## 典型场景 / 示例

### 主流实时方案对比

| 方案 | 类型 | 冷却速 | 适合场景 |
|---|---|---|---|
| **Supabase Realtime** | Postgres 变更监听 → WebSocket | ⭐⭐⭐ | 已经用 Supabase：表变化→前端实时更新 |
| **WebSocket API（原生）** | node ws / uWebSockets.js | ⭐ | 需要完全控制协议 |
| **Pusher** | 托管 WebSocket | ⭐⭐ | 不想管基础设施 |
| **Ably** | 托管 WebSocket + 历史 | ⭐⭐ | 企业级实时需求 |
| **Liveblocks** | 协作编辑专用 | ⭐⭐ | 多人编辑画布 / 文档 |
| **Server-Sent Events (SSE)** | HTTP 单向流，非 WebSocket | ⭐⭐⭐ | 服务器→客户端单向；更简单 |
| **Vercel / Cloudflare 原生** | Edge Runtime WebSocket | ⭐⭐ | 直接在 serverless 接 WebSocket（有限制） |

> 大部分 vibe coding 项目用 **Supabase Realtime** 就够了。

### Supabase Realtime 最简示例

```ts
// 监听 posts 表的 INSERT 事件（有新文章时前端自动收到）
const channel = supabase
  .channel("posts-changes")
  .on(
    "postgres_changes",
    { event: "INSERT", schema: "public", table: "posts" },
    (payload) => {
      console.log("新文章：", payload.new);
      updateUI(payload.new);
    }
  )
  .subscribe();
```

### 原生 WebSocket（Node.js）

**后端**：
```ts
// server.ts（用独立服务，不跑在 serverless 上）
import "https" from "node:http";
import { WebSocketServer } from "ws";

const server = http.createServer();
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    // 收到 ["join", "room-123"]
    const [type, payload] = JSON.parse(data.toString());
    ws.send(JSON.stringify({ type: "joined", payload }));
  });
});

server.listen(3001);
```

**客户端**：
```ts
const ws = new WebSocket("wss://myapp.com/api/realtime");
ws.onmessage = (event) => {
  console.log("收到：", JSON.parse(event.data));
};
```

### 什么时候不自己写 WebSocket

| 你的需求 | 推荐方案 |
|---|---|
| 数据库变更→前端更新 | Supabase Realtime |
| 多人协作编辑（类似 Google Docs） | Liveblocks / Yjs |
| 聊天 App | Pusher / Ably / Supabase Realtime |
| AI 流式输出 | Vercel AI SDK (SSE) —— 比 WebSocket 更适合 |
| 实时数据面板 | Supabase Realtime / SSE |

## 常见误区
- ❌ **"WebSocket 可以替代所有 HTTP API"**：不能。WebSocket 适合"服务端主动推"；客户端直接查数据（GET /api/users）用 HTTP 更快更简单。
- ❌ **"WebSocket 跑在 serverless 上"**：大部分 serverless 平台（Vercel / AWS Lambda）**不支持长连接**。WebSocket 需要一台"挂着了别关"的服务器。**Supabase Realtime 帮你托管了那台服务器**。
- ❌ **"ChatGPT 的实时效果 = WebSocket"**：ChatGPT 流式是 SSE（Server-Sent Events），不是 WebSocket。SSE 是单向的（服务端→客户端），更轻量。
- ❌ **"WebSocket 更安全"**：实际上它**容易被 CSRF 攻击**、无法用标准 HTTP 认证头。**连接建立后要自己再验证身份**。

## 延伸阅读
- [Supabase Realtime 文档](https://supabase.com/docs/guides/realtime) `[英 · ⭐⭐ · 免费 · 持续更新]`
- [MDN WebSocket API（中文）](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket) `[中 · ⭐ · 免费 · 持续更新]`
- [MDN Server-Sent Events（中文）](https://developer.mozilla.org/zh-CN/docs/Web/API/Server-sent_events) `[中 · ⭐ · 免费 · 持续更新]`
- [Ably 实时教程](https://ably.com/docs) `[英 · ⭐⭐ · 免费起 · 持续更新]`
- [Pusher](https://pusher.com/) `[英 · ⭐ · 免费起 · 持续更新]`
- F-03 Supabase · A-10 流式输出

## 去问 AI
> 「我用 Supabase + Next.js 做一个多人聊天 SaaS。请给我：(1) Supabase 的 messages 表结构 + RLS 策略；(2) 前端用 Realtime 订阅新消息的代码；(3) 发消息用 Server Action 还是 API route？(4) 每条消息显示后 5 分钟自动撤回怎么实现？」

---
**来源**：① Supabase Realtime 文档  ② MDN WebSocket  ③ Ably
**查询日期**：2026-06-23 · **数据来源时间**：常青