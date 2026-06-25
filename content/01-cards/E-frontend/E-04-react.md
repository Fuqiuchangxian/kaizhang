---
group: E-frontend
card_id: E-04
title: React
difficulty: ⭐⭐
last_updated: 2026-06-23
status: 已核实
related: [E-02, E-03, E-05, E-07]
---

# E-04 React

## 一句话定义
React 是 Meta 开源的 **UI 库**——它让你用"组件"（component）的方式拼网页 UI，每个组件就像一个**可复用的乐高积木**，把状态（state）变了，对应的 UI 自动重新渲染。

## 打个比方
**传统写法 = 直接操作 DOM**：你要改"购物车数量" → 找到那个元素 → `element.innerHTML = newCount` → 还得记得改顶部 badge → 还得改总价区……每改一处状态，要手动同步十几个 UI 点。
**React 写法 = "声明 UI 长啥样"**：你只描述"购物车数量 = X 时长这样"，状态变了，React 自动算出 UI 该怎么变、自动改 DOM。**你只管状态，UI 自己跟上**。

## 和 vibe coding 的关系
- **2026 年前端的事实主流**（仍占据 npm 周下载量首位）
- Lovable / v0 / Cursor 等 vibe coding 工具默认都生成 React
- Next.js（E-05）是 React 之上的"全栈框架"——你用 vibe coding 做 Web App 几乎绕不开

## 典型场景 / 示例

### 最小 React 组件（函数式 + Hooks）

```tsx
import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>当前计数：{count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
```

- `useState`：组件的"记忆"
- `<button onClick={...}>`：事件绑定
- `{count}`：在 JSX 里插入 JS 表达式
- 函数组件 = 一个返回 JSX 的函数

### React 你最常用的 5 个 Hook

| Hook | 作用 | 例子 |
|---|---|---|
| `useState` | 组件局部状态 | `const [name, setName] = useState("")` |
| `useEffect` | 副作用（请求、订阅、定时器） | `useEffect(() => { fetchData() }, [])` |
| `useMemo` | 缓存复杂计算 | `const sorted = useMemo(() => arr.sort(), [arr])` |
| `useCallback` | 缓存函数引用（避免子组件重渲染） | `useCallback(() => doSth(), [dep])` |
| `useRef` | 引用 DOM 元素或可变值 | `const inputRef = useRef(null)` |

### 组件组合（核心思想）

```tsx
function App() {
  return (
    <Layout>
      <Header />
      <main>
        <PostList posts={posts} />
      </main>
      <Footer />
    </Layout>
  );
}
```

子组件像积木一样拼接；数据通过 props 从父传子。

### Server Components vs Client Components（Next.js 时代的核心区别）

```tsx
// 默认：Server Component（在服务端跑，能直接访问数据库）
async function PostList() {
  const posts = await db.post.findMany();
  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>;
}

// 需要交互（用 useState / onClick）就加 "use client"
"use client";
import { useState } from "react";
function LikeButton() {
  const [liked, setLiked] = useState(false);
  return <button onClick={() => setLiked(!liked)}>{liked ? "❤️" : "🤍"}</button>;
}
```

**经验**：默认全是 Server Component，**只有需要用户交互或 useState 才标 "use client"**。

## 常见误区
- ❌ **"React = 框架"**：React 严格说是 **UI 库**（不管路由、数据获取等）。框架是 Next.js / Remix。
- ❌ **"class 组件还在主流"**：早过时。**2026 年只写函数组件 + Hooks**。
- ❌ **"useEffect 万能"**：useEffect 是"副作用兜底方案"，**很多场景根本不该用**——能用 derived state、event handler、Server Component 解决就不要用 useEffect。
- ❌ **"key 随便填"**：列表项的 `key` 必须**稳定且唯一**（数据库 id 最佳），不要用数组 index。
- ❌ **"state 越多越灵活"**：相反——能从其他 state 派生的不要单独存。**state 越少 bug 越少**。

## 延伸阅读

### 📺 视频教程
- [React 官方教程 (YouTube)](https://www.youtube.com/watch?v=T_nDC0zB5Jg) `[英 · ⭐⭐ · 免费 · 2023 · 1h]` React 官方团队入门教程
- [React 入门到实战 (B站)](https://www.bilibili.com/video/BV1Zg411T71E) `[中 · ⭐⭐ · 免费 · 2023 · 系列]` 中文系统 React 教程
- [React Hooks 深度解析 (YouTube)](https://www.youtube.com/watch?v=O6P86uwfdR0) `[英 · ⭐⭐ · 免费 · 2024 · 25min]` useState/useEffect 等核心 Hook 详解
- [Scrimba · Learn React for Free](https://scrimba.com/learn/learnreact) `[英 · ⭐⭐ · 免费 · 持续]` 互动式 React 课程

### 📰 文章
- [React 官方文档（中文）](https://zh-hans.react.dev/) `[中 · ⭐⭐ · 免费 · 持续更新]` **最权威**，2023 年重写后非常好读
- [React Learn 教程（中文）](https://zh-hans.react.dev/learn) `[中 · ⭐⭐ · 免费 · 持续更新]`
- [React patterns](https://reactpatterns.com/) `[英 · ⭐⭐ · 免费 · 持续更新]`
- [React Hooks 速查](https://zh-hans.react.dev/reference/react/hooks) `[中 · ⭐⭐ · 免费 · 持续更新]`
- E-05 Next.js（React 的全栈框架）
- E-07 shadcn/ui（React 组件库）

## 去问 AI
> 「我会一点 HTML/CSS/JS，第一次用 React。请用一个'todo list'的最小例子（30 行以内）教我：(1) 怎么写函数组件；(2) 怎么用 useState 管状态；(3) 怎么处理 input + button + 列表渲染。每一行都解释为什么。」

---
**来源**：① https://zh-hans.react.dev  ② React Hooks API 文档
**查询日期**：2026-06-23 · **数据来源时间**：常青（React 19 时代）
