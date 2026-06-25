---
group: E-frontend
card_id: E-06
title: Tailwind CSS
difficulty: ⭐
last_updated: 2026-06-23
status: 已核实
related: [E-01, E-05, E-07]
---

# E-06 Tailwind CSS

## 一句话定义
Tailwind 是"**实用类优先**（utility-first）"的 CSS 框架——它不给你"按钮组件"，而是给你**几千个小积木 class**（`p-4` `bg-blue-500` `flex` `rounded-lg`），让你在 HTML 上直接拼出任何样式。

## 打个比方
- **传统 CSS** = 自己设计衣服：先剪裁、再缝、再染色（写 .btn-primary { ... }）
- **shadcn/ui 等组件库** = 买成品（按钮、对话框现成）
- **Tailwind** = **乐高积木**：每个 class 是一块积木，你拼出按钮、卡片、表单——风格统一、改起来快、所有规则都在 HTML 旁边

## 和 vibe coding 的关系
- **AI 写 Tailwind 比写裸 CSS 快 10 倍**——因为 class 名字是英文助记符，AI 一看就懂
- 几乎所有 vibe coding 工具（v0 / Lovable / Bolt / Cursor）默认推荐 Tailwind
- 改样式不用切到 CSS 文件——**直接在 JSX 里改 class 就行**

## 典型场景 / 示例

### 同一个按钮 三种写法对比

**裸 CSS**：
```html
<button class="primary-btn">登录</button>

<style>
.primary-btn {
  padding: 8px 16px;
  background: #3b82f6;
  color: white;
  border-radius: 8px;
  font-weight: 600;
}
.primary-btn:hover {
  background: #2563eb;
}
</style>
```

**Tailwind**：
```html
<button class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold">
  登录
</button>
```

**shadcn/ui（基于 Tailwind 的组件库 · E-07）**：
```tsx
<Button>登录</Button>
```

### 你需要记住的"前缀语法"

| 前缀 | 含义 | 例子 |
|---|---|---|
| `hover:` | 鼠标悬停 | `hover:bg-blue-700` |
| `focus:` | 聚焦时 | `focus:ring-2` |
| `dark:` | 暗黑模式 | `dark:bg-gray-900` |
| `sm: md: lg: xl:` | 响应式断点 | `md:flex lg:grid-cols-3` |
| `group-hover:` | 父级 hover 时 | （父加 `group`，子用 `group-hover:`） |
| `[&_p]:` | 任意 CSS 选择器 | 高级用法 |

### 一个真实卡片

```tsx
<div className="max-w-sm rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm hover:shadow-md transition">
  <h3 className="text-lg font-bold">VibeMaker</h3>
  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
    给独立开发者的 AI 学习站
  </p>
  <button className="mt-4 w-full rounded-lg bg-blue-600 px-3 py-2 text-white hover:bg-blue-700">
    去看看
  </button>
</div>
```

### 配置 / 主题

`tailwind.config.js`（或 v4 时代的 CSS 配置）控制：
- 颜色（自定义品牌色）
- 字体
- 断点
- 间距 / 圆角 / 阴影规模

让 AI 帮你写：**"用 Tailwind 写一份配置，品牌色用 #0EA5E9，再加 'gradient-radial' 工具类"**——它直接给完整 config。

## 常见误区
- ❌ **"Tailwind class 太多，HTML 看起来很丑"**：一开始确实——但**实际写久了发现重构最容易**（不用跨 .tsx 和 .css 两个文件）。可以用 `clsx` / `cn()` helper 拆长 class。
- ❌ **"Tailwind 不能做高级动画 / 复杂样式"**：能。复杂的用 `@layer` / 自定义 utility / CSS-in-JS，但 95% 情况下原生 class 够。
- ❌ **"Tailwind 包体积大"**：Tailwind 自带 PurgeCSS——生产构建只保留你用过的 class，最终 bundle 通常 < 10KB。
- ❌ **"必须用 shadcn 才能用 Tailwind"**：不必。shadcn（E-07）是**基于 Tailwind 的组件库**；Tailwind 独立用也很好。
- ❌ **"自定义颜色得改 config"**：可以临时用 `bg-[#0EA5E9]`（方括号语法）任意值。

## 延伸阅读

### 📺 视频教程
- [Tailwind CSS 官方教程 (YouTube)](https://www.youtube.com/watch?v=hdGsFpZ0J2E) `[英 · ⭐⭐ · 免费 · 2023 · 1h]` Tailwind 官方入门
- [Tailwind CSS 从入门到精通 (B站)](https://www.bilibili.com/video/BV1Zg411T71E) `[中 · ⭐⭐ · 免费 · 2023 · 系列]` 中文系统教程
- [Tailwind + React 实战 (YouTube)](https://www.youtube.com/watch?v=WU8MfADxIgg) `[英 · ⭐⭐ · 免费 · 2024 · 30min]` React 项目中使用 Tailwind
- [Tailwind CSS Tips & Tricks (YouTube)](https://www.youtube.com/watch?v=1wfr_YjAEEs) `[英 · ⭐ · 免费 · 2024 · 15min]` 实用技巧速查

### 📰 文章
- [Tailwind CSS 官方文档](https://tailwindcss.com/docs) `[英 · ⭐⭐ · 免费 · 持续更新]` **最权威，搜索引擎集成超好**
- [Tailwind 中文文档（社区）](https://www.tailwindcss.cn/docs) `[中 · ⭐⭐ · 免费 · 持续更新]`
- [Tailwind Play](https://play.tailwindcss.com/) `[英 · ⭐ · 免费 · 持续更新]` 在线 playground
- [Tailwind UI 组件 / Hero Patterns](https://tailwindui.com/) `[英 · ⭐⭐ · 付费 · 持续更新]` 高质量付费模板
- E-07 shadcn/ui（基于 Tailwind 的组件库）

## 去问 AI
> 「我想用 Tailwind 做一个深色主题、有玻璃质感的登录页。请直接给我完整 JSX 代码（用 Next.js App Router + TS），包括：标题 + 邮箱密码输入框 + 主按钮 + Google 第三方登录按钮 + 渐变光晕背景。class 写在 JSX 上即可。」

---
**来源**：① https://tailwindcss.com/docs  ② https://play.tailwindcss.com
**查询日期**：2026-06-23 · **数据来源时间**：常青（Tailwind 4+ 时代）
