# 开张 KAIZHANG · 项目架构、内容维护与本地启动手册

> 当前版本：v2.2  
> 形态：纯前端 Web 工作台 + 本地/线上 AI 代理  
> 定位：帮一个零基础的人，从学会到做出，再到被人看到自己的第一个 AI 产品。

---

## 0. 当前推荐启动方式

### 本地启动（推荐）

不要再用 `npx serve`，因为它没有 `/api/chat`，AI 会不可用。当前项目已经有本地代理服务器：

```bash
cd D:\Viber\site
node server.cjs
```

打开：

```txt
http://localhost:5174/
```

`server.cjs` 会同时做两件事：

1. 托管静态网页
2. 代理 `/api/chat` 到火山方舟 OpenAI-compatible 接口

默认：

```txt
Base URL: https://ark.cn-beijing.volces.com/api/coding/v3
Model: ark-code-latest
```

如果你想覆盖 key / model：

```bash
set ARK_API_KEY=ark-xxxx
set ARK_MODEL=ark-code-latest
node server.cjs
```

### 线上部署（Vercel）

线上走 `site/api/chat.js`，在 Vercel 配环境变量：

| 变量 | 示例 | 必填 |
|---|---|---|
| `ARK_API_KEY` | `ark-xxxx` | 是 |
| `ARK_BASE_URL` | `https://ark.cn-beijing.volces.com/api/coding/v3` | 否，默认已有 |
| `ARK_MODEL` | `ark-code-latest` | 否，默认已有 |

---

## 1. 项目结构总览

```txt
site/
├─ index.html              # 主 HTML：Mac 浮窗、欢迎页、modal、CMD、Bug 窗、今日宜忌等 DOM
├─ server.cjs              # 本地开发服务器 + /api/chat AI 代理（推荐本地启动用它）
├─ vercel.json             # Vercel 配置
├─ README.md               # 本文件
│
├─ api/
│  └─ chat.js              # Vercel Edge Function：线上 /api/chat 代理
│
├─ assets/
│  ├─ favicon.svg          # favicon
│  └─ og.svg               # 分享预览图 og:image / twitter:image
│
├─ css/
│  ├─ main.css             # 全局 UI、布局、动画、浮窗、地图、广场、工具箱、笔记等样式
│  └─ markdown.css         # Markdown / prose 初始排版
│
├─ js/
│  ├─ app.js               # 主程序：路由、渲染、AI、副驾、笔记、广场、游戏、黄历等
│  ├─ manifest.js          # 学习路径、卡片索引、分组、首页预置按钮
│  ├─ card-resources.js    # 卡片增强：summary / keyConcepts / videos / askPresets
│  ├─ skills-data.js       # 工具箱结构化数据：AgentSkills / MCP / Prompt / Rules / Workflow 等
│  └─ square-data.js       # 发布广场种子数据 + SVG icon 字典
│
└─ content/
   ├─ 00-learning-path/    # 学习路径原始 Markdown
   ├─ 01-cards/            # 80+ 知识卡片 Markdown
   ├─ 02-resources/        # 资料导航
   ├─ 03-skills-repo/      # 旧版 Skills Markdown 资产（保留来源）
   └─ 04-launch-square/    # 旧版广场 seed Markdown（保留来源）
```

---

## 2. 网站功能模块

### 2.1 首页 Welcome

- Mac 风格背景 + 大输入框
- 输入内容回车：进入工作台并发送给 AI
- 如果未登录：先弹邀请码，登录成功后自动续发
- 预置按钮：零基础开始 / 解释概念 / 验证想法 / 怎么让人用 / 随便逛逛
- 顶栏：首页 / 学习 / 工具箱 / 发布广场 / 我的 / 记笔记 / 跳Bug / CMD / 主题 / 登录

### 2.2 学习模块

相关文件：

- `manifest.js`：`PHASES`、`CARDS`、`GROUPS`
- `content/01-cards/**.md`：知识卡片正文
- `card-resources.js`：卡片增强资源
- `app.js`：`renderPhaseIndex`、`renderPhaseDetail`、`renderCardDetail`

功能：

- 开张地图：建造/旅途式地图，从空地到开张
- Phase 详情页：卡片网格 + 进度 + 动手检查点
- 卡片详情页：Hero / 关键概念 / 阅读 / 视频 / 浮动问 AI
- Mermaid 流程图渲染
- 大表格自动转卡片行，避免横向溢出
- 选中文本后浮出「问 AI / 归档」工具条

### 2.3 AI 副驾

关键函数：

- `sendAIMessage()`
- `streamChat()`
- `buildModelMessages()`
- `detectCitations()`

功能：

- OpenAI-compatible streaming
- 图片输入
- 语音输入
- 历史对话
- 新建对话
- 毒舌/鼓励人格
- 相关卡片 chip
- 加载工具箱资产为上下文
- 根据当前学习进度生成回答

AI 现在会知道：当前 Phase、当前卡片、已读卡片、已完成检查点、最近笔记摘要。

### 2.4 工具箱 Tools

这个模块已经从「技能」改名为 **工具箱**。

原因：AgentSkills / MCP / Prompt / Rules / Workflow 是并列资产，不能都混叫 Skill。

当前类目：

1. AgentSkills 标准包
2. Prompt 模板
3. Cursor Rules
4. MCP 配置
5. 起步模板
6. Workflow 工作流
7. Loop Engineering
8. Harness Engineering

AgentSkills 标准结构：

```txt
my-skill/
├─ SKILL.md          # 必填：元数据 + 触发条件 + SOP + 输出标准 + 自检规则
├─ scripts/          # 可选：脚本
├─ references/       # 可选：资料 / 行业文档
└─ assets/           # 可选：模板 / 表格 / 示例素材
```

每个工具资产支持：复制内容 / 下载 zip / 加载到 AI 副驾。

### 2.5 发布广场

相关文件：`square-data.js` + `app.js renderSquare/renderSquareDetail`

功能：种子作品卡片流、SVG 标签、小红书风详情页、点赞/收藏/评论赚积分、发布作品、开张大吉仪式、Canvas 生成 1080×1350 开张喜报 PNG。

### 2.6 我的空间

未登录展示登录提示；登录后有笔记、作品、积分、设置。笔记默认网格展示，点击进详情，支持导出 Markdown。

### 2.7 全局记笔记

入口：顶栏「记笔记」按钮，位于「跳Bug」旁边。

字段：标题 / 来源 / 正文。支持语音输入、填入当前选中文本，保存到 localStorage。

### 2.8 彩蛋 / 趣味系统

- CMD 控制台：`btnCmd` → `openCmd()`
- 老板跳 Bug：浮动终端窗，不再全屏
- 今日宜忌：窗口左下角，靠近用户位
- 开张大吉：发布作品后触发，并生成 PNG

---

## 3. 内容如何新增

### 3.1 新增知识卡片

1. 在 `content/01-cards/<group-folder>/` 新建 Markdown
2. 按格式写：

```md
---
group: A-ai-basics
card_id: A-13
title: 新概念名字
difficulty: ⭐⭐
last_updated: 2026-06-25
status: 已核实
related: [A-01, A-02]
---

# A-13 新概念名字

## 一句话定义
...

## 打个比方
...

## 和 vibe coding 的关系
...

## 典型场景 / 示例
...

## 常见误区
...

## 延伸阅读
- [标题](url) `[语言 · 难度 · 免费/付费 · 年份]` 推荐理由

## 去问 AI
> 「可以直接问 AI 的 prompt」

---
**来源**：...
**查询日期**：2026-06-25
```

3. 在 `js/manifest.js` 的 `CARDS` 加索引：

```js
{ id:'A-13', group:'A', title:'新概念名字', diff:2,
  path:'A-ai-basics/A-13-slug.md' },
```

4. 如需加入 Phase，在 `PHASES[x].cards` 里加入 `A-13`
5. 如需更漂亮的内容页，在 `card-resources.js` 加：

```js
'A-13': {
  summary: 'Hero 摘要',
  keyConcepts: [
    { term: '概念1', def: '解释' },
  ],
  videos: [
    { platform: 'yt', id: 'YouTubeID', title: '视频标题', dur: '12min', lang: '英', year: 2024, by: '作者', why: '推荐理由' },
  ],
  askPresets: ['用打比方解释一下', '给我一个例子'],
},
```

### 3.2 新增工具箱资产

编辑：`js/skills-data.js`

```js
{
  id: 'AS-02',
  cat: 'agentskill',
  title: 'Launch Copywriter Skill',
  use: '生成 PH / X / 小红书 / 即刻发布物料',
  stack: ['SKILL.md', 'assets'],
  body: `# Skill 正文...`,
  install: '安装说明',
  example: '示例',
  refs: ['https://...'],
  tags: ['AgentSkills', 'Launch'],
},
```

可用 cat：`agentskill / prompt / rule / mcp / template / workflow / loop / harness`

### 3.3 新增广场作品

编辑：`js/square-data.js` 的 `SQUARE_SEEDS`。

```js
{
  id: 'seed-11',
  name: '产品名',
  tagline: '一句话介绍',
  type: 'ai',
  stack: ['Next.js'],
  status: 'live',
  promo: ['xhs'],
  cover: { gradient: ['#3B82F6','#6366F1'], pattern: 'grid' },
  screenshots: [
    { gradient: ['#3B82F6','#1E3A8A'], pattern: 'dots', caption: '截图说明' },
  ],
  description: `详情介绍`,
  metrics: { users: '100' },
  likes: 0,
  bookmarks: 0,
  comments: 0,
  views: 0,
  wants: '想要的反馈',
  link: 'https://...',
  author: { name: '作者', avatar: 'A', tone: '#3B82F6' },
  publishedAt: '2026-06-25',
}
```

### 3.4 新增 Phase

编辑：`manifest.js` 的 `PHASES`：

```js
{
  id: 'P7',
  idx: 7,
  name: '运维与监控',
  icon: 'tools',
  goal: '上线后让产品别挂',
  cards: ['G-13', 'F-06'],
  checkpoint: '接入一个错误监控并触发一次报警',
}
```

---

## 4. AI 接口说明

本项目使用 OpenAI-compatible Chat Completions。

```http
POST /chat/completions
Authorization: Bearer <ARK_API_KEY>
Content-Type: application/json
```

Body：

```json
{
  "model": "ark-code-latest",
  "messages": [
    { "role": "system", "content": "..." },
    { "role": "user", "content": "..." }
  ],
  "stream": true,
  "temperature": 0.7
}
```

流式响应：

```txt
data: {"choices":[{"delta":{"content":"..."}}]}
data: [DONE]
```

本地：`server.cjs` 代理 `/api/chat`。线上：`api/chat.js` 代理 `/api/chat`。

---

## 5. 设计约束

- 工具感优先，不做营销官网大 Hero
- 背景 + Mac 浮窗
- 深色默认，浅色可切换
- 朱红只用于：开张大吉 / 今日宜忌 / 喜报
- 图标尽量用 SVG，不用大 emoji 装饰
- 发布广场作品截图是唯一主角
- 学习卡片正文少放装饰图，Mermaid / 卡片化信息优先

---

## 6. 常见问题

### 顶栏点了没反应？

```bash
cd D:\Viber\site
node -c js/app.js
```

然后 Ctrl+F5 强刷。当前入口有 cache bust：

```html
<script type="module" src="./js/app.js?v=20260625-2"></script>
```

如果改了 JS 仍不生效，就升级这个 v 值。

### AI 报 Failed to fetch？

请确认不是 `npx serve`，而是：

```bash
node server.cjs
```

测试：

```bash
curl -X POST http://localhost:5174/api/chat \
  -H "Content-Type: application/json" \
  -d "{\"messages\":[{\"role\":\"user\",\"content\":\"只回复pong\"}],\"stream\":false}"
```

### 发布广场喜报在哪里？

发布作品后弹出开张大吉仪式，里面有「保存喜报 PNG」和「复制分享文案」。

---

## 7. 维护建议

- 每次改 JS 后跑：`node -c js/app.js`
- 每次改 HTML modal 结构后检查闭合标签
- 新增卡片一定同步 `manifest.js`
- 新增卡片增强内容才改 `card-resources.js`
- 新增工具箱资产只改 `skills-data.js`
- 真上线前重置 API key，不要把 key 放 GitHub


---

## 8. 信息架构说明（给后续维护者）

### 学习路径 vs 全部分组

- **学习路径**：给新手从上到下走的主线。它回答“下一步学什么”。每个 Phase 有目标、卡片清单和动手检查点。
- **全部分组**：给查资料用的索引。它回答“我想查 MCP / Vercel / Supabase 在哪”。它不代表学习顺序。

### 工具箱定位

工具箱不是另一个讲解区。讲解放在学习模块；工具箱只放能“拿走用”的东西：

- 可下载的 AgentSkills 文件夹 / zip
- 可复制的 Prompt / Rules / MCP config
- 可跳转的外部模板仓库 / 官方工具
- 可直接喂给店小二的工作流资产

如果要补充工具箱素材，请按以下格式给：

```json
{
  "id": "AS-XX 或 M-XX 或 T-XX",
  "cat": "agentskill / prompt / rule / mcp / template / workflow / loop / harness",
  "title": "资产名",
  "use": "一句话用途",
  "stack": ["适用工具或技术"],
  "body": "可复制正文 / 配置 / SKILL.md 内容",
  "install": "安装步骤（可选）",
  "repo": "外部链接（可选）",
  "assetsNeeded": ["需要我提供的文件名，如 poster-template.png"]
}
```

### 发布广场素材需求

如果要替换 mock，请给每个作品：

```json
{
  "name": "产品名",
  "tagline": "一句话",
  "type": "tool/design/content/ai/commerce/mobile/game/life",
  "status": "idea/dev/live/iter",
  "stack": ["Next.js", "Supabase"],
  "promo": ["xhs", "x", "ph", "jike"],
  "link": "https://...",
  "description": "详情介绍",
  "wants": "想要的反馈",
  "screenshots": ["请提供 16:10 WebP/PNG 截图，建议 1600×1000"]
}
```


## 9. 本轮外部 Agent 内容补充处理记录

另一个搜索 Agent 已经把 24 张重点知识卡片的视频/文章资源写入 `content/01-cards/**.md`，并给 `content/00-learning-path/learning-path.md` 增加了每个 Phase 的推荐视频路线。

前端已做处理：

- 卡片详情页会自动解析 Markdown 里的 `### 视频教程` 分节。
- YouTube 链接会转成 `youtube-nocookie.com/embed/...`。
- B 站 BV 链接会转成 `player.bilibili.com/player.html?bvid=...`。
- 这些资源会合并到 `card-resources.js` 的视频资源中显示在「视频」tab。

本轮也补充了工具箱和发布广场种子：

- Awesome MCP Servers
- 官方 MCP Servers
- Playwright MCP
- Awesome Cursor Rules
- AGENTS.md 标准参考
- Next.js SaaS Starter
- Cursor / Open WebUI / n8n 等真实产品案例

后续如果继续补内容，优先补：

1. 每个广场作品的真实 16:10 截图。
2. 每个工具箱资产的 install 命令和 license。
3. 每个视频资源的可访问性复核。


---

## 10. GitHub + Vercel + 自定义域名上线流程

### 10.1 推到 GitHub

```bash
cd D:\Viber\site
git init
git add .
git commit -m "init kaizhang"
gh repo create kaizhang --private --source=. --push
```

如果不用 `gh`，就在 GitHub 网页新建仓库后：

```bash
git remote add origin https://github.com/<your-name>/<repo>.git
git branch -M main
git push -u origin main
```

注意：不要提交 `.env.local` 或任何真实生产 key。

### 10.2 Vercel 部署

1. 打开 Vercel → Add New Project
2. 选择 GitHub 仓库
3. Framework Preset 选 Other / Static
4. Build Command 留空
5. Output Directory 留空
6. 添加环境变量：

| Key | Value |
|---|---|
| `ARK_API_KEY` | 火山方舟 API Key |
| `ARK_BASE_URL` | `https://ark.cn-beijing.volces.com/api/coding/v3` |
| `ARK_MODEL` | `ark-code-latest` |

部署后访问 `https://your-project.vercel.app`。

### 10.3 绑定自定义域名

在 Vercel 项目中：

1. Settings → Domains
2. 输入你的域名，例如 `kaizhang.app`
3. 按 Vercel 提示到域名 DNS 平台添加记录：

根域名常见：

```txt
A     @      76.76.21.21
```

子域名常见：

```txt
CNAME www    cname.vercel-dns.com
```

等待 DNS 生效后，Vercel 会自动签发 HTTPS 证书。

### 10.4 本地与线上差异

- 本地推荐 `node server.cjs`，它会代理 `/api/chat`。
- 线上走 `api/chat.js` Edge Function。
- 前端代码不需要改。

### 10.5 CMD 彩蛋 AI

CMD 里可以输入：

```txt
ask 你的问题
```

它会在控制台内部流式输出，并强制店小二使用纯文本回答：不输出 Markdown、不输出 JSON、不跳到右侧聊天栏。
