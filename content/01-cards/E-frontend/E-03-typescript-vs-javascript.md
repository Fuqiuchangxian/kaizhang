---
group: E-frontend
card_id: E-03
title: TypeScript vs JavaScript
difficulty: ⭐⭐
last_updated: 2026-06-23
status: 已核实
related: [E-02, E-04, E-05]
---

# E-03 TypeScript vs JavaScript

## 一句话定义
TypeScript（TS）= **JavaScript + 类型标注**。它在 JS 之上加了"这个变量必须是字符串、那个函数必须返回数字"的检查，**写代码时 IDE 就能提前发现 bug**，运行时还是普通 JS。

## 打个比方
- **JavaScript** = 不看说明书装家具——能装上，但拧错螺丝不会立刻发现，可能用着用着倒了
- **TypeScript** = 带说明书 + 螺丝有"防呆设计"——拧错螺丝在装的时候就装不进去，逼你停下检查

代价是：写说明书（写类型）要多花一点时间。

## 和 vibe coding 的关系
- **2026 年新项目几乎都用 TS**（Next.js / Vue / Svelte 默认推 TS）
- **AI 写 TS 比写 JS 还熟**——因为类型是天然的"prompt 提示"
- 用 TS 之后 AI 改代码的"幻觉"（A-05）显著降低——类型不对它自己就会修
- **强烈建议**：哪怕你不懂 TS，新项目也开 TS strict 模式让 AI 写

## 典型场景 / 示例

### 同一段代码 JS vs TS

**JavaScript**：
```javascript
const greet = (user) => {
  return `Hello ${user.name}`;
};

greet({ id: 1 });  // 运行时才报错: undefined name
```

**TypeScript**：
```typescript
type User = { id: number; name: string };

const greet = (user: User): string => {
  return `Hello ${user.name}`;
};

greet({ id: 1 });
//    ~~~~~~~~~ 编辑器立刻飘红：Property 'name' is missing
```

### 你常见的 TS 语法

```typescript
// 1. 基础类型
const age: number = 25;
const name: string = "Alice";
const tags: string[] = ["js", "ts"];
const user: { id: number; name: string } = { id: 1, name: "Alice" };

// 2. 函数类型
const add = (a: number, b: number): number => a + b;

// 3. type alias / interface
type Status = "loading" | "success" | "error";    // 联合类型
interface Post {
  id: number;
  title: string;
  author?: string;     // ? 表示可选
}

// 4. 泛型
function first<T>(items: T[]): T | undefined {
  return items[0];
}

// 5. 类型断言 / 缩窄
const elem = document.querySelector("input") as HTMLInputElement;
```

### 必须打开的两个配置

`tsconfig.json` 里至少打开：
```json
{
  "compilerOptions": {
    "strict": true,          // 严格模式
    "noUncheckedIndexedAccess": true   // 防止 array[i] 返回值被当成确定存在
  }
}
```

**不开 strict 等于把 TS 退化回 JS**——白写。

## 常见误区
- ❌ **"TS 比 JS 难学很多"**：基础语法和 JS 一样，**只是多了"在变量后面 : 写类型"**。一个下午就够上手。
- ❌ **"TS 让 AI 写代码更慢"**：相反——AI 在 TS 项目里**写得更稳**，因为类型系统约束让它幻觉更少。
- ❌ **"any 解决一切"**：到处写 `any` 等于关闭 TS 的好处。**遇到不会的类型，先让 AI 帮你推**，实在不行再短期 any。
- ❌ **"TS 要单独学一整套"**：不用。会 JS（E-02）之后，**主要新东西就两个：` : 类型`、`interface/type`**。其他随用随查。

## 延伸阅读
- [TypeScript 官方文档（含中文）](https://www.typescriptlang.org/zh/) `[中/英 · ⭐⭐ · 免费 · 持续更新]`
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) `[英 · ⭐⭐ · 免费 · 持续更新]` 官方教程
- [Total TypeScript（Matt Pocock）](https://www.totaltypescript.com/) `[英 · ⭐⭐⭐ · 部分免费 · 持续更新]` 进阶必看
- [TypeScript 入门教程（中文）](https://ts.xcatliu.com/) `[中 · ⭐ · 免费 · 2023-2026]` 系统中文教程
- E-04 React（TS + React 最常配）

## 去问 AI
> 「我有一个 JS 项目想迁到 TS。请告诉我：(1) 第一步该做什么？(2) tsconfig.json 应该怎么配？(3) 把所有 `.js` 直接重命名为 `.ts` 会发生什么？我应该怎么 incremental 迁移？给我一个 5 步迁移计划。」

---
**来源**：① https://www.typescriptlang.org  ② Total TypeScript
**查询日期**：2026-06-23 · **数据来源时间**：常青
