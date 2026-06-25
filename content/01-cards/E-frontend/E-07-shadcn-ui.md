---
group: E-frontend
card_id: E-07
title: shadcn/ui
difficulty: ⭐
last_updated: 2026-06-23
status: 已核实
related: [E-04, E-06]
---

# E-07 shadcn/ui

## 一句话定义
shadcn/ui 是**不是组件库**的组件库——它**不通过 npm install 安装**，而是用一条命令把组件源码**直接复制到你的项目目录**，你能完全掌控、随便改。基于 Tailwind + Radix UI，**2025-2026 React 生态最火的 UI 方案**。

## 打个比方
- **传统组件库（MUI / Antd）** = 买装修套餐——一切包好，但想改墙色要找原厂
- **shadcn/ui** = 买建材 + 自己装——它把按钮、对话框、表单的"源代码" 复制到你家，你想刷成什么色随便刷

## 和 vibe coding 的关系
- **v0 / Cursor 默认生成的组件库**就是 shadcn/ui
- 这意味着 AI 写出来的代码你能**直接看到、直接改**
- 替换 / 升级 / 加新组件都是命令行一行搞定

## 典型场景 / 示例

### 安装一个组件到你的项目

```bash
# 1. 一次性初始化（新项目）
npx shadcn@latest init

# 2. 加你需要的组件
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add form
```

每个命令会在你的 `components/ui/` 下生成一个文件，比如：

```
components/
└── ui/
    ├── button.tsx       # ← 这是真实组件代码，你能改！
    ├── dialog.tsx
    └── form.tsx
```

### 用一个组件

```tsx
import { Button } from "@/components/ui/button";

export function MyPage() {
  return (
    <Button variant="outline" size="lg">
      点我
    </Button>
  );
}
```

### 改样式 / 加变体

打开 `components/ui/button.tsx`，找到 `buttonVariants` 里加一行：
```ts
variant: {
  default: "...",
  outline: "...",
  // 加一个新变体
  brand: "bg-blue-600 hover:bg-blue-700 text-white",
},
```

然后用：`<Button variant="brand">…</Button>`。

### shadcn 最常用的 20 个组件

| 类别 | 组件 |
|---|---|
| 基础 | Button、Input、Textarea、Label、Checkbox、Radio、Select、Switch |
| 容器 | Card、Tabs、Accordion、Collapsible、Separator |
| 反馈 | Dialog、AlertDialog、Sheet、Toast / Sonner、Skeleton |
| 数据 | Table、DataTable、Badge、Avatar、DropdownMenu、Form |
| 导航 | NavigationMenu、Sidebar、Breadcrumb |

## 常见误区
- ❌ **"shadcn/ui 是组件库"**：它说自己**不是**——它是"可复用代码的集合"+ CLI 工具。这是它的核心哲学。
- ❌ **"装上就要升级"**：组件代码在你项目里，**不会自动升级**。要升级用 `npx shadcn add button --overwrite`（小心覆盖你的改动）。
- ❌ **"只能用 Tailwind 默认色"**：可以改 `tailwind.config` + shadcn 的 CSS 变量，**任何主题色都行**。shadcn 官网有 theme generator。
- ❌ **"shadcn = React 唯一选择"**：Vue 有 shadcn-vue，Svelte 有 shadcn-svelte 等社区移植；但原版仍是 React。

## 延伸阅读

### 📺 视频教程
- [shadcn/ui 入门教程 (YouTube)](https://www.youtube.com/watch?v=6dMjCa0nLHB) `[英 · ⭐⭐ · 免费 · 2024 · 15min]` shadcn 安装和基础使用
- [shadcn/ui + Next.js 实战 (YouTube)](https://www.youtube.com/watch?v=8KJtTvbRygM) `[英 · ⭐⭐ · 免费 · 2024 · 30min]` 全栈项目组件搭建
- [shadcn/ui 中文教程 (B站)](https://www.bilibili.com/video/BV1ZM4m1y7Pm) `[中 · ⭐⭐ · 免费 · 2024 · 20min]` 中文入门演示
- [Build a Dashboard with shadcn/ui (YouTube)](https://www.youtube.com/watch?v=O6P86uwfdR0) `[英 · ⭐⭐ · 免费 · 2024 · 25min]` 仪表盘实战

### 📰 文章
- [shadcn/ui 官网](https://ui.shadcn.com) `[英 · ⭐⭐ · 免费 · 持续更新]` 含每个组件的示例代码
- [shadcn/ui Themes Generator](https://ui.shadcn.com/themes) `[英 · ⭐ · 免费 · 持续更新]` 可视化生成主题
- [Tweakcn 在线编辑器（社区）](https://tweakcn.com) `[英 · ⭐ · 免费 · 持续更新]` 主题深度编辑
- [Aceternity UI / Magic UI（社区扩展组件库，shadcn 兼容）](https://magicui.design) `[英 · ⭐ · 部分免费 · 持续更新]`
- E-04 React · E-06 Tailwind

## 去问 AI
> 「我用 Next.js 14 + Tailwind，刚 `npx shadcn init` 完。请教我接下来 10 分钟做什么：(1) 装哪 5 个组件先；(2) 把首页的按钮、表单、卡片用 shadcn 重写；(3) 怎么在 Button 上加一个我自己的'brand'变体（蓝紫渐变 + 阴影）。给完整代码。」

---
**来源**：① https://ui.shadcn.com  ② https://ui.shadcn.com/themes
**查询日期**：2026-06-23 · **数据来源时间**：常青（2024-2026）
