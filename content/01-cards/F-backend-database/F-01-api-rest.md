---
group: F-backend-database
card_id: F-01
title: API 与 REST
difficulty: ⭐
last_updated: 2026-06-23
status: 已核实
related: [F-03, F-05, E-05]
---

# F-01 API 与 REST

## 一句话定义
**API（Application Programming Interface）** 是程序之间"对话的接口"；**REST** 是一种**用 HTTP 方法（GET / POST / PUT / DELETE）操作资源**的 API 设计风格——2026 年仍是最主流的 Web API 风格。

## 打个比方
**API 像餐厅服务员**：你（前端）不能直接进厨房（后端 / 数据库），只能通过服务员（API）下单 → 厨师做菜 → 服务员端给你。服务员有一套**点单规则**——这就是 API 接口契约。

**REST 是一种"点单话术规范"**：
- 看菜单 = `GET /menu`
- 下单 = `POST /orders`
- 改单 = `PUT /orders/123`
- 取消 = `DELETE /orders/123`

## 和 vibe coding 的关系
- 你做的每个 vibe coding 项目都要写或调 API
- 前端调后端、调 OpenAI、调 Stripe、调 Supabase——全是 API
- 看懂 HTTP 方法 + 状态码 = 看懂 80% 报错的能力

## 典型场景 / 示例

### HTTP 方法核心 4 个

| 方法 | 用途 | 例子 |
|---|---|---|
| **GET** | 查询（读取，不应改服务端状态） | `GET /api/users` 获取用户列表 |
| **POST** | 创建 | `POST /api/users` 创建用户 |
| **PUT / PATCH** | 更新（PUT 全量替换、PATCH 部分更新） | `PATCH /api/users/123` 改用户名 |
| **DELETE** | 删除 | `DELETE /api/users/123` |

### HTTP 状态码核心 6 个

| 状态码 | 含义 | 典型场景 |
|---|---|---|
| `200 OK` | 成功 | GET 拿到数据 |
| `201 Created` | 创建成功 | POST 成功新建 |
| `400 Bad Request` | 客户端参数错 | 缺字段 / 格式不对 |
| `401 Unauthorized` | 未登录 | 没传 token |
| `403 Forbidden` | 登录了但没权限 | 普通用户访问管理员页 |
| `404 Not Found` | 资源不存在 | id=999 但没这条 |
| `500 Internal Server Error` | 服务器自己挂了 | 后端崩了 |

### 一个完整的 API 调用流程

**后端**（Next.js 14 App Router）：
```ts
// app/api/users/[id]/route.ts
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const user = await db.user.findUnique({ where: { id: params.id } });
  if (!user) return Response.json({ error: "not found" }, { status: 404 });
  return Response.json(user);
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const updated = await db.user.update({ where: { id: params.id }, data: body });
  return Response.json(updated);
}
```

**前端调用**：
```ts
// 查用户
const user = await fetch(`/api/users/${id}`).then(r => r.json());

// 改用户名
await fetch(`/api/users/${id}`, {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "新名字" }),
});
```

### 请求 / 响应格式（一般用 JSON）

```http
POST /api/users HTTP/1.1
Content-Type: application/json
Authorization: Bearer eyJhbGciOi...

{
  "name": "Alice",
  "email": "alice@example.com"
}
```

返回：
```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": "u_abc123",
  "name": "Alice",
  "email": "alice@example.com",
  "createdAt": "2026-06-23T08:30:00Z"
}
```

## 常见误区
- ❌ **"GET 也能改数据"**：技术上能但**禁忌**——浏览器、爬虫、CDN 会随意 GET，可能导致数据被多次错改。改数据永远用 POST / PUT / PATCH / DELETE。
- ❌ **"REST = JSON"**：REST 是一种**风格**（用 HTTP 方法 + 资源 URL），载体可以是 JSON / XML / HTML。**JSON 是 2026 的事实标准**。
- ❌ **"401 和 403 一样"**：**401 = 你是谁不知道**（没登录 / token 过期）；**403 = 知道你是谁但没权限**。在登录系统里千万别混。
- ❌ **"API 只有 REST 一种"**：另外还有 **GraphQL**（一次请求拿想要的字段）、**tRPC**（TS 类型安全 RPC）、**WebSocket**（实时双向，见 F-07）。各有场景。
- ❌ **"前端能直接调用 OpenAI / Stripe API"**：**绝对不要**。前端代码暴露给所有人，**API key 会泄露**。必须经过你的后端中转。

## 延伸阅读
- [MDN HTTP 协议入门](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Overview) `[中 · ⭐ · 免费 · 持续更新]`
- [REST API 设计指南（中文）](https://restfulapi.cn/) `[中 · ⭐⭐ · 免费 · 2024-2026]`
- [HTTP 状态码完整列表（MDN）](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status) `[中 · ⭐ · 免费 · 持续更新]`
- [Postman 学习中心](https://learning.postman.com/) `[英 · ⭐ · 免费 · 持续更新]` 调试 API 的事实标准工具
- E-05 Next.js（写 API 路由的框架）
- F-07 WebSocket（API 之外的实时通信）

## 去问 AI
> 「我做一个'用户笔记 SaaS'。请帮我设计 RESTful API：(1) 列出 5-8 个端点（GET/POST/PUT/DELETE 各种）；(2) 每个端点的 URL、HTTP 方法、请求体、响应体示例；(3) 错误处理用什么状态码。用 Next.js App Router 的写法。」

---
**来源**：① MDN  ② restfulapi.cn  ③ Postman Learning Center
**查询日期**：2026-06-23 · **数据来源时间**：常青
