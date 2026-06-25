---
group: E-frontend
card_id: E-02
title: JavaScript 最小必要
difficulty: ⭐
last_updated: 2026-06-23
status: 已核实
related: [E-01, E-03, E-04]
---

# E-02 JavaScript 最小必要

## 一句话定义
JavaScript（JS）是**让网页"动起来"的语言**——点击按钮触发动作、表单校验、调 API、动态改 DOM……都是 JS 干的。它是浏览器里唯一的编程语言，也是 Node.js 的语言。

## 打个比方
- HTML 是**骨架**（页面有什么）
- CSS 是**外貌**（长什么样）
- **JavaScript 是肌肉和神经**（怎么动、按按钮会发生什么）

## 和 vibe coding 的关系
- React / Next.js / Vue / Svelte 全是 JS 框架——你的 vibe coding 项目几乎必然用到 JS
- 你**不用自己从零写 JS**：AI 写、你看懂大致逻辑就行
- 但理解几个核心概念能让你**和 AI 高效交流**：变量、函数、async/await、数组方法、对象解构

## 典型场景 / 示例

### 你必须看得懂的 7 个核心语法

```javascript
// 1. 变量
const name = "Alice";       // 永远首选 const
let age = 25;                // 会变才用 let
// var 不要用了

// 2. 函数（推荐箭头函数写法）
const greet = (name) => `Hello, ${name}`;

// 3. 对象 / 数组
const user = { name: "Alice", age: 25 };
const items = ["苹果", "香蕉", "橘子"];

// 4. 解构（vibe coding 里 90% 见到）
const { name, age } = user;
const [first, second] = items;

// 5. 数组方法（这 3 个最常用）
items.map(item => item.toUpperCase());        // 改造每个
items.filter(item => item.length > 2);        // 筛选
items.find(item => item === "苹果");          // 找一个

// 6. 异步：async / await
const fetchUser = async () => {
  const res = await fetch("/api/user");
  const data = await res.json();
  return data;
};

// 7. 模块导入
import { useState } from "react";
export const Button = () => <button>点我</button>;
```

### 你最容易看到的 6 个"看起来很怪"写法

```javascript
// 1. ?. 可选链：如果 user 是 undefined 不报错，直接返回 undefined
user?.profile?.email

// 2. ?? 空值合并：null 或 undefined 才用默认值（0 / 空字符串不会触发）
const name = input ?? "未命名"

// 3. ... 展开 / 剩余
const newArr = [...oldArr, "新项"];
const newObj = { ...oldObj, age: 26 };
const sum = (...nums) => nums.reduce((a, b) => a + b, 0);

// 4. 模板字符串
const msg = `你好 ${name}，你今年 ${age} 岁`;

// 5. 三元
const status = isLoading ? "加载中..." : "完成";

// 6. 短路求值
isLoggedIn && <Dashboard />        // 仅在 true 时渲染
```

### 异步 / Promise 一句话

```javascript
// 老写法（不要再写）
fetch("/api").then(r => r.json()).then(data => console.log(data));

// 现代写法（让 AI 都写这个）
const data = await fetch("/api").then(r => r.json());
```

## 常见误区
- ❌ **"JavaScript = Java"**：完全两种语言，名字像但毫无关系。
- ❌ **"== 和 === 没区别"**：`==` 会自动转换类型（容易出 bug）；**永远用 `===`**。
- ❌ **"var、let、const 一样"**：`var` 已过时；现代代码只用 `const`（默认）和 `let`（必须重赋值时）。
- ❌ **"AI 写的 JS 都对"**：AI 经常会用过时的写法（`var`、callback 而不是 async/await、jQuery）。给它明确说"使用 ES2020+ 现代语法"。

## 延伸阅读
- [MDN JavaScript 入门（中文）](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Scripting) `[中 · ⭐ · 免费 · 持续更新]` 最权威
- [现代 JavaScript 教程（中文）](https://zh.javascript.info/) `[中 · ⭐⭐ · 免费 · 持续更新]` 体系完整中文免费教程，必看
- [JavaScript Info](https://javascript.info/) `[英 · ⭐⭐ · 免费 · 持续更新]` 英文版
- E-03 TypeScript vs JavaScript（下一步学的）
- E-04 React（最常配套的框架）

## 去问 AI
> 「我刚学会 const / let / 函数 / async-await 这几个 JS 基础。下一步学什么最划算？请给我列 5 个'最值得花 30 分钟学'的语法/API，按重要性排序，每个给一个 vibe coding 场景的实际例子。」

---
**来源**：① MDN  ② javascript.info（中英版）
**查询日期**：2026-06-23 · **数据来源时间**：常青
