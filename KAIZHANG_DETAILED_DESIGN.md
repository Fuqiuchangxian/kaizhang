# 开张 KAIZHANG · 详细产品与交互视觉设计文档

> 文件用途：给另一个 AI / 设计师 / 前端开发者完整理解并继续开发本网站。  
> 当前代码目录：`D:\Viber\site`  
> 当前网站地址（本地）：`http://localhost:5174/`  
> 当前版本：v2.2+  
> 最后更新：2026-06-25

---

# 0. 一句话总览

**开张 KAIZHANG** 是一个面向零基础 AI 产品创作者的深色工作台式网站。它把「学习路径、知识卡片、店小二 AI、工具箱、笔记、发布广场、传播仪式」整合到一个类似 AI coding 工具的 Mac 浮窗界面中，帮助用户从“不知道怎么开始”走到“做出第一个 AI 产品并被人看到”。

---

# 1. 产品定位

## 1.1 产品名

- 中文：开张
- 英文：KAIZHANG
- 含义：让用户的第一个 AI 产品真正“开张”，不是停留在本地 localhost。

## 1.2 产品定位

开张不是官网，不是课程站，也不是 AI 工具导航站。  
它的定位是：

> **AI 产品学习工作台**：用户沿「学 → 做 → 成」路径学习、提问、沉淀、下载工具资产、发布作品、获得反馈。

## 1.3 核心用户

### 用户 A：零基础造物者

特点：

- 非科班
- 对 AI coding 感兴趣
- 不知道 Cursor / MCP / Agent / Supabase / Vercel 是什么
- 看到代码和部署会紧张
- 需要明确路径和随时能问的 AI

核心诉求：

- 从哪里开始？
- 这个概念是什么意思？
- 现在该学什么？
- 我怎么做出第一个产品？

### 用户 B：已有产品但没用户的人

特点：

- 能 vibe coding 做出东西
- 卡在发布、反馈、宣发、定价
- 需要真实反馈和传播物料

核心诉求：

- 怎么让人看到？
- 产品想法有没有价值？
- 怎么上 PH / X / 小红书 / 即刻？
- 怎么拿到第一批用户？

---

# 2. 核心设计公理

## 2.1 资讯 × 咨询同源

这是产品最重要的原则。

- 知识卡片 = 可浏览态
- 店小二回答 = 可对话态

二者必须互通：

1. 用户在知识卡片中选中文字 → 可以问店小二
2. 店小二回答 → 可以挂载相关卡片 chip
3. 用户提问时 → 自动附带当前卡片 / Phase 来源
4. 店小二系统提示中 → 知道用户当前 Phase、正在阅读卡片、已读卡片、最近笔记

## 2.2 工作台，不是官网

视觉上不做营销站大 Hero，而是：

- 深色背景
- 中央 Mac 式浮窗
- 顶部窗口栏
- 三栏工作台
- 信息密度较高
- 控件像 AI coding tool

## 2.3 学习必须导向行动

学习不是读文章，而是：

```txt
读卡片 → 问店小二 → 归档笔记 → 完成检查点 → 下载工具资产 → 发布作品
```

## 2.4 工具箱不是讲解区

学习内容放在学习模块。  
工具箱只放能拿走用的资产：

- AgentSkills 标准包
- Prompt
- Cursor Rules
- MCP config
- Starter template
- Workflow
- Loop / Harness 模板

## 2.5 传播物是产品的一部分

开张大吉、今日宜忌、老板跳 Bug 都不是装饰，而是：

- 给用户仪式感
- 增加分享动力
- 让产品有记忆点

---

# 3. 当前文件架构

```txt
site/
├─ index.html
├─ server.cjs
├─ vercel.json
├─ README.md
├─ PRODUCT_INTRO_PRD.md
├─ KAIZHANG_DETAILED_DESIGN.md
│
├─ api/
│  └─ chat.js
│
├─ assets/
│  ├─ favicon.svg
│  └─ og.svg
│
├─ css/
│  ├─ main.css
│  └─ markdown.css
│
├─ js/
│  ├─ app.js
│  ├─ manifest.js
│  ├─ card-resources.js
│  ├─ skills-data.js
│  └─ square-data.js
│
└─ content/
   ├─ 00-learning-path/
   ├─ 01-cards/
   ├─ 02-resources/
   ├─ 03-skills-repo/
   └─ 04-launch-square/
```

## 3.1 index.html

负责静态 DOM 结构：

- 背景层
- Mac 窗口
- 顶栏 tab
- 欢迎页
- 三栏工作台
- 登录 modal
- 记笔记 modal
- 发布作品 modal
- 开张大吉仪式
- CMD 控制台
- 今日宜忌
- 老板跳 Bug 浮窗

## 3.2 app.js

项目主逻辑，约 2800 行。负责：

- 路由切换
- 左栏渲染
- 中栏渲染
- 右栏店小二
- AI streaming
- localStorage 状态
- 笔记
- 发布广场
- 工具箱
- 今日宜忌
- CMD
- Bug 游戏

## 3.3 manifest.js

结构化内容索引：

- `PHASES`：7 阶段学习路径
- `CARDS`：80+ 知识卡片索引
- `GROUPS`：全部分组
- `PRESET_BUTTONS`：首页预置按钮
- `ALMANAC_POOL`：今日宜忌词库

## 3.4 card-resources.js

卡片增强资源：

- summary
- keyConcepts
- videos
- askPresets

这部分让 Markdown 卡片更像产品化内容，而不是纯文档。

## 3.5 skills-data.js

工具箱数据。  
注意：当前模块已经从「技能」改为「工具箱」。

数据分两层：

- `SKILL_CATEGORIES`
- `SKILLS`

当前类目：

- agentskill
- prompt
- rule
- mcp
- template
- workflow
- loop
- harness

## 3.6 square-data.js

发布广场数据与 icon 字典：

- `TAG_ICONS`
- `TYPE_OPTIONS`
- `STATUS_OPTIONS`
- `PROMO_OPTIONS`
- `SQUARE_SEEDS`

---

# 4. 全局布局

## 4.1 页面外壳

最外层：

```html
<div id="backdrop">
  <div class="grain"></div>
  <div class="aurora a1"></div>
  <div class="aurora a2"></div>
  <div class="aurora a3"></div>
</div>
```

视觉：

- 深空渐变背景
- 噪点
- 蓝紫光晕
- 底部 dock 文案

## 4.2 Mac 浮窗

```html
<main id="mac-window" class="mac-window">
```

特征：

- 居中浮窗
- 圆角
- 阴影
- 顶部 traffic lights
- 底部 status bar

## 4.3 顶栏

顶栏包含：

左侧：

- 红黄绿窗口按钮

中间 tabs：

1. 首页
2. 学习
3. 工具箱
4. 发布广场
5. 我的

右侧 actions：

1. 记笔记
2. 跳Bug
3. CMD
4. 主题切换
5. 登录

### 顶栏交互

- 点击首页 → 回欢迎页
- 点击学习 → 三栏工作台学习区
- 点击工具箱 → 工具箱页
- 点击发布广场 → 发布广场
- 点击我的 → 我的空间
- 点击记笔记 → 全局笔记 modal
- 点击跳Bug → 浮动 Bug 游戏窗
- 点击 CMD → 终端彩蛋
- 点击主题 → 深浅模式切换
- 点击登录 → 邀请码登录 / 退出登录

---

# 5. 页面与状态路由

项目没有真实前端路由，使用内存状态 `State.route`。

```js
State.route = 'welcome' | 'learn' | 'skills' | 'square' | 'me'
```

## 5.1 welcome

显示：

- 中央品牌
- 大输入框
- 预置按钮

提交逻辑：

1. 用户输入文本
2. 回车
3. 进入 workbench
4. 如果已登录：发送给店小二
5. 如果未登录：弹登录，登录成功后自动续发

## 5.2 learn

显示三栏工作台：

- 左栏：学习路径 + 全部分组
- 中栏：开张地图 / Phase 详情 / 卡片详情
- 右栏：店小二

## 5.3 skills

显示工具箱：

- 左栏：工具箱介绍 + 各类目
- 中栏：介绍页 / 类目资产网格 / 资产详情
- 右栏：店小二

## 5.4 square

显示发布广场：

- 左栏：广场首页 / 发布作品 / 我的作品
- 中栏：作品流 / 作品详情
- 右栏：店小二

## 5.5 me

显示我的空间：

- 未登录：登录提示
- 已登录：个人空间 tabs

---

# 6. 学习模块详细设计

## 6.1 学习路径首页

函数：`renderPhaseIndex(pid)`

当前设计：垂直学习路径。

视觉：

- 页面标题：从 0 到第一个 AI 产品
- 说明卡：学习路径 vs 全部分组
- 纵向列表：Phase 0 → Phase 6

每个 Phase 节点包含：

- 顺序编号 01 / 02 / ...
- Phase ID
- 阶段名
- 学习目标
- 进度条
- 已读卡片数

交互：

- 点击节点 → `State.phaseDetail = ph.id` → 渲染 Phase 详情页

## 6.2 学习路径 vs 全部分组

### 学习路径

用于新手按顺序推进。  
回答：**下一步该学什么？**

特点：

- 有顺序
- 有阶段目标
- 有动手检查点
- 适合第一次学习

### 全部分组

用于按主题查资料。  
回答：**某个概念在哪里？**

特点：

- 无强顺序
- 按主题分类
- 适合搜索 / 回查

## 6.3 Phase 详情页

函数：`renderPhaseDetail(pid)`

显示：

- 返回学习路径按钮
- Phase hero
- 进度条
- 卡片网格
- 动手检查点

交互：

- 点击卡片 → 打开卡片详情页
- 点击检查点完成 → 写入 doneCheckpoints，并归档笔记
- 点击让 AI 帮我做 → 发送给店小二

## 6.4 卡片详情页

函数：`renderCardDetail(cardId)`

显示结构：

1. Hero
2. 关键概念
3. Tabs：阅读 / 视频
4. 阅读区七段式卡片
5. 浮动问 AI 按钮

### Hero

来源：

- `CARDS` 基础数据
- `card-resources.js` 的 `summary`

### 关键概念

来源：`card-resources.js keyConcepts`

### 阅读区

Markdown 被拆成 section card。  
表格会自动转成卡片行，避免横向溢出。

### 视频区

支持：

- YouTube embed
- Bilibili embed

### 问 AI 浮窗

函数：`mountAskFab(presets, title)`

位置：中间栏右下角。  
默认展开。  
点击圆形按钮可收起/展开。

预设问题来源：

- `card-resources.js askPresets`
- `GENERIC_ASK_PRESETS`

发送时会自动附带来源：

```txt
【提问来源：D-01 · 什么是 MCP】
用户问题
```

---

# 7. 店小二 AI 详细设计

## 7.1 名称

右栏 AI 不叫 AI 副驾，叫 **店小二**。

理由：

- 更贴合「开张」品牌
- 更轻松
- 有陪跑感

## 7.2 输入能力

支持：

- 文本
- 图片
- 语音
- 当前卡片上下文
- 已加载工具资产

## 7.3 对话结构

数据存 localStorage：

```js
State.history = [
  {
    id,
    title,
    ts,
    messages: [
      { role:'user', content, attachments, source },
      { role:'ai', content, citations }
    ]
  }
]
```

## 7.4 用户上下文

函数：`getAIKnowledgeContext()`

会注入：

- 当前阶段
- 正在阅读卡片
- 已读卡片数量
- 最近读过的卡
- 已完成检查点
- 最近笔记摘要

## 7.5 结构化回答

店小二被提示尽量返回 JSON：

```json
{
  "summary": "一句话总结",
  "cards": [
    { "title": "要点", "body": "内容" }
  ],
  "actions": ["下一步"],
  "recommend": ["D-01"]
}
```

前端函数：`renderStructuredAI(content)`

如果 JSON 完整，会渲染成：

- summary 卡
- 内容卡
- action list
- 推荐卡片按钮

如果 JSON 还在流式输出中，会显示：

```txt
店小二正在整理成卡片…
结构化回答生成中
```

避免半截 JSON 撑破气泡。

## 7.6 相关卡片推荐

函数：`detectCitations(text)`

逻辑：

1. 识别显式卡片 ID
2. 遍历卡片 aliases
3. 返回最多 3 张卡片

aliases 在 `getCardAliases(card)` 中维护。

---

# 8. 工具箱 Tools 详细设计

## 8.1 定位

工具箱不是学习讲解区。  
它是可用资产库。

它应该收纳：

- 可下载文件夹
- 可复制配置
- 可跳外部 repo
- 可喂给店小二的流程资产

## 8.2 类目

来自 `SKILL_CATEGORIES`：

- AgentSkills 标准包
- Prompt 模板
- Cursor Rules
- MCP 配置
- 起步模板
- 工作流配方
- Loop Engineering
- Harness Engineering

## 8.3 默认页

默认页是工具箱介绍，不高亮全部。

左栏包含：

- 工具箱介绍
- 各类目

点击类目后中栏显示该类目的资产网格。

## 8.4 AgentSkills 标准

一个 AgentSkill 是文件夹：

```txt
my-skill/
├─ SKILL.md
├─ scripts/
├─ references/
└─ assets/
```

这是和 MCP / Prompt 并列但不同层级的资产。

## 8.5 工具资产详情页

显示：

- 标题
- 用途
- stack
- tags
- 正文
- 安装说明
- 示例
- 参考链接

操作：

- 复制内容
- 下载 zip
- 加载到店小二

---

# 9. 发布广场详细设计

## 9.1 侧栏

不再展示一堆筛选，而是导航：

- 广场首页
- 发布作品
- 我的作品

筛选项放在中栏顶部 chips。

## 9.2 广场首页

显示作品卡片流。

每张卡：

- 16:10 封面
- 状态 pill
- 产品名
- tagline
- 标签
- like/bookmark/comment 数

## 9.3 筛选 chips

中栏顶部：

- 全部
- 工具 / 设计 / 内容 / AI
- 想法 / 开发中 / 已上线 / 改版中

## 9.4 作品详情页

函数：`renderSquareDetail(id)`

布局：

1. 顶部：左图右文
2. 中部：产品介绍、技术栈、数据、作者想要的反馈
3. 底部：评论与反馈

### 评论区

不使用浏览器 prompt。  
使用页面内 textarea。

发布评论后：

- 插入评论列表
- 更新评论数
- 增加积分

## 9.5 发布作品弹窗

字段：

- 产品名（必填）
- 一句话介绍
- 类型
- 技术栈
- 状态
- 链接
- 想要的反馈
- AI 宣发物料

「让 AI 帮我写宣发物料」逻辑：

- 不跳转右栏
- 在弹窗内调用店小二
- 生成内容填入 `promoDraft`
- 产品名未填时禁止使用

## 9.6 开张大吉

发布成功后：

- 红绸动画
- 开张大吉印章
- confetti
- 生成喜报 PNG
- 支持保存图片
- 支持复制分享文案

---

# 10. 我的空间详细设计

## 10.1 未登录

显示登录提示。

## 10.2 登录后

中栏 tabs：

- 我的笔记
- 我的作品
- 我的积分
- 设置

左栏不再重复这些 tab，而是个人概览和快捷动作。

## 10.3 笔记

默认网格。

每个笔记 tile：

- 标题
- snippet
- 来源
- 日期

点击进入详情。

## 10.4 全局记笔记

入口在顶栏。  
字段：标题 / 来源 / 正文。  
支持语音输入和填入选中文本。

---

# 11. 彩蛋与传播功能

## 11.1 今日宜忌

位置：左栏底部用户位旁。  
不再悬浮到页面外面。

## 11.2 CMD 控制台

支持命令：

- `kaizhang --help`
- `ask <question>`
- `goto learn|skills|square|me`
- `card A-01`
- `notes`
- `points`
- `almanac`

重要：`ask` 在 CMD 内部回答，不跳右侧店小二。

## 11.3 老板跳 Bug

浮动终端窗，不全屏。  
关闭用左上红点。  
难度已降低。

---

# 12. 视觉规范

## 12.1 色彩

深色默认：

- 背景：`#0E0F12 → #16181D`
- Panel：`#1C1E24`
- Card：`#23262D`
- Primary：`#3B82F6`
- Accent：`#60A5FA`
- Vermilion：`#D4452E`

浅色模式：

- Primary 切为浅草绿
- 代码块专门做浅色适配

## 12.2 圆角

- 窗口：14px
- 面板：12px
- 按钮：10px
- 小标签：999px

## 12.3 动效

统一：

```css
cubic-bezier(.2,.8,.2,1)
```

已有：

- fade-up
- hover 光斑
- 按钮 scale
- toast
- 开张大吉
- Bug 游戏

---

# 13. 数据格式速查

## 13.1 新增卡片

见 `manifest.js` + `content/01-cards`。

## 13.2 新增卡片增强资源

见 `card-resources.js`。

## 13.3 新增工具资产

见 `skills-data.js`。

## 13.4 新增广场作品

见 `square-data.js`。

---

# 14. 给接手 AI 的注意事项

1. 不要再用 `npx serve`，本地要用 `node server.cjs`
2. 改 JS 后必须跑 `node -c js/app.js`
3. 改 `index.html` 后注意 modal div 闭合
4. 改 `app.js` 后记得更新 `index.html` 里 `app.js?v=...`
5. 学习内容不要塞进工具箱
6. 工具箱不要写成长文讲解，要写成可下载/可复制/可安装的资产
7. 发布广场需要真实 16:10 截图，否则视觉会弱
8. 店小二回答要尽量结构化，不要大段纯文本
9. 问 AI 时必须带来源卡片/Phase
10. 任何分享功能优先考虑能否生成图片
