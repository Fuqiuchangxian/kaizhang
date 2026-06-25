---
group: E-frontend
card_id: E-01
title: HTML / CSS 速览
difficulty: ⭐
last_updated: 2026-06-23
status: 已核实
related: [E-02, E-06]
---

# E-01 HTML / CSS 速览

## 一句话定义
**HTML 是网页的"骨架"**（决定页面上有什么元素：标题、段落、按钮、图片）；**CSS 是网页的"皮肤和衣服"**（决定每个元素长什么样：颜色、字体、布局、动画）。

## 打个比方
**HTML 像写一份大纲**：第一节标题、第二节段落、第三节有张图、第四节是按钮。
**CSS 像装修方案**：标题用蓝色 32px、段落两端对齐、图片圆角 8px、按钮 hover 时变深色。
没 CSS 的 HTML 就像没装修的毛坯房——能住，但很丑。

## 和 vibe coding 的关系
- vibe coder 自己**不用从零写 HTML/CSS**：AI 会帮你写，Tailwind（E-06）让你"用类名拼样式"
- 但你**必须看得懂大致结构**——AI 写完一个页面，你要能判断"这个元素是 `<button>` 还是 `<a>`""为什么背景色没生效"
- 30 分钟读懂这张卡 + MDN 入门，足够支撑 90% vibe coding 场景

## 典型场景 / 示例

### HTML 你只要知道的 12 个标签

```html
<h1>大标题</h1> <h2>中标题</h2> <h3>小标题</h3>
<p>段落</p>
<a href="https://...">链接</a>
<img src="/logo.png" alt="logo">
<button>按钮</button>
<input type="text" placeholder="请输入">
<form>表单</form>
<ul><li>列表项</li></ul>
<div>通用容器</div>
<span>行内容器</span>
```

### CSS 三种"挑选元素"的方法

```css
/* 1. 标签选择器 */
button { background: blue; }

/* 2. class 选择器（最常用） */
.primary-btn { background: blue; }

/* 3. id 选择器（唯一元素） */
#login-form { padding: 20px; }
```

```html
<button class="primary-btn">登录</button>
```

### 现代 CSS 你最该知道的两件事

1. **Flexbox**：横向 / 纵向排列子元素
   ```css
   .row { display: flex; gap: 16px; justify-content: space-between; }
   ```
2. **Grid**：二维网格布局
   ```css
   .gallery { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
   ```

> 现实工作中你**基本不写裸 CSS**——直接用 Tailwind（E-06）的类名 `flex gap-4 justify-between`，更快。

## 常见误区
- ❌ **"vibe coder 不用懂 HTML/CSS"**：完全不懂会很被动——AI 改样式总改不对你不知道为啥。**了解概念就够，不用记语法**。
- ❌ **"div 万能"**：滥用 div 会让页面对 SEO 和无障碍访问不友好。语义化标签（`<header>` `<nav>` `<article>` `<section>` `<footer>`）更好。
- ❌ **"CSS 写在 style 属性里就行"**：内联 style 难维护。**让 AI 用 Tailwind class 或外部 CSS 文件**。
- ❌ **"浏览器都一样"**：差异主要在旧 IE / 老 Safari；Chrome/Edge/Firefox/Safari 新版差异小。不用为兼容性焦虑。

## 延伸阅读
- [MDN HTML 入门（中文）](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Structuring_content) `[中 · ⭐ · 免费 · 持续更新]` 最权威入门
- [MDN CSS 入门（中文）](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Styling_basics) `[中 · ⭐ · 免费 · 持续更新]`
- [CSS-Tricks Flexbox 完整指南](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) `[英 · ⭐⭐ · 免费 · 常青]` 看图学 Flexbox 最快
- [CSS-Tricks Grid 完整指南](https://css-tricks.com/snippets/css/complete-guide-grid/) `[英 · ⭐⭐ · 免费 · 常青]`
- E-06 Tailwind CSS（你实际会用的"CSS 工具"）

## 去问 AI
> 「我想让 AI 生成一个登录页。请先用 3 段话给我讲清楚：(1) HTML 的语义化结构应该长什么样？(2) 这个页面的 CSS 布局用 Flex 还是 Grid 合适？(3) 用 Tailwind 实现时大致是哪几个 class？给我对应的 HTML 代码片段。」

---
**来源**：① MDN Web Docs  ② CSS-Tricks
**查询日期**：2026-06-23 · **数据来源时间**：常青（HTML/CSS 基础概念）
