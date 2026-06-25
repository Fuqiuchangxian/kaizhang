---
group: E-frontend
card_id: E-08
title: npm / package.json
difficulty: ⭐
last_updated: 2026-06-23
status: 已核实
related: [E-02, E-05]
---

# E-08 npm / package.json

## 一句话定义
**npm（Node Package Manager）** 是 JS 世界的"应用商店 + 包管理器"——所有第三方库（React、Next.js、Stripe SDK……）都从这里下载。
**package.json** 是你项目的"说明书"，写明项目名 + 依赖了哪些包 + 怎么启动。

## 打个比方
**npm = App Store**：你 `npm install react` 就像在 App Store 装个 App。
**package.json = 装机清单**：项目交给别人时，对方 `npm install` 就能按这份清单一次性装齐所有依赖。
**node_modules/ = 应用文件夹**：所有装上的 App 实际存放的地方，自动生成，永远 .gitignore。

## 和 vibe coding 的关系
- 每个 vibe coding 项目都是从 `npm install` / `pnpm install` 开始
- AI 让你装包时（"先 `npm install stripe`"）你要知道在哪儿跑
- 读懂 package.json 能帮你**辨别 AI 写代码用的版本是不是过时**

## 典型场景 / 示例

### 一个真实 package.json

```json
{
  "name": "my-saas",
  "version": "0.1.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@supabase/supabase-js": "^2.45.0",
    "stripe": "^16.0.0"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "typescript": "^5.5.0",
    "tailwindcss": "^4.0.0"
  }
}
```

字段含义：
- `scripts`：常用命令的别名。`npm run dev` 实际执行 `next dev`
- `dependencies`：**运行时**需要的包（生产环境也要装）
- `devDependencies`：**开发时**需要的（TS 编译器、ESLint 等，部署后不用装）
- `^15.0.0`：版本范围，表示"允许 15.x 的任意小版本"

### 你最常用的 8 个 npm 命令

```bash
# 装依赖
npm install              # 按 package.json 装齐
npm install <pkg>        # 装新包，加到 dependencies
npm install -D <pkg>     # 装到 devDependencies

# 卸载
npm uninstall <pkg>

# 跑 scripts
npm run dev              # 等价于执行 package.json 里 scripts.dev
npm run build

# 升级 / 查版本
npm outdated             # 看哪些包有新版本
npm update <pkg>         # 升级到 package.json 允许的最新

# 全局工具
npm install -g <pkg>     # 装到系统全局
npx <pkg>                # 临时下载并跑一次（不装到 node_modules）
```

### npm vs pnpm vs yarn vs bun

| 工具 | 速度 | 磁盘占用 | 兼容性 | 推荐场景 |
|---|---|---|---|---|
| **npm** | 中 | 大 | 100% | 默认选择 |
| **pnpm** | 快 | 极小（硬链接） | 99% | **2026 年独立开发者首选** |
| **yarn** | 中 | 中 | 99% | 老项目 / 公司有标准 |
| **bun** | 极快 | 小 | 90%+（少数包不兼容） | 新项目尝鲜 |

> 它们 `package.json` 格式完全一样，可以无缝切换。锁文件不同：`package-lock.json` / `pnpm-lock.yaml` / `yarn.lock` / `bun.lockb`。

### .gitignore 必加这一行

```
node_modules/
```

`node_modules` 通常几百 MB，**绝对不能提交到 git**。

## 常见误区
- ❌ **"node_modules 要提交"**：绝对不要。靠 package.json + lock 文件即可还原。
- ❌ **"^ 和 ~ 一样"**：`^1.2.3` 允许 1.x.x 任意版本；`~1.2.3` 只允许 1.2.x。常青项目用 `^`。
- ❌ **"npm install 后忘了 commit lock 文件"**：lock 文件（`package-lock.json` / `pnpm-lock.yaml` 等）**必须提交** —— 它保证团队 / CI 装的是同样版本。
- ❌ **"装得越多越强"**：每个 npm 包都是潜在攻击面（供应链攻击）。**不必要的包不装**。
- ❌ **"AI 提到的包都存在"**：经典幻觉（A-05）。装之前先 `npm view <pkg>` 或上 [npmjs.com](https://www.npmjs.com) 搜一搜。

## 延伸阅读
- [npm 官方文档](https://docs.npmjs.com/) `[英 · ⭐ · 免费 · 持续更新]`
- [pnpm 官方文档](https://pnpm.io/) `[英 · ⭐⭐ · 免费 · 持续更新]`
- [npm package.json 字段详解](https://docs.npmjs.com/cli/v10/configuring-npm/package-json) `[英 · ⭐⭐ · 免费 · 持续更新]`
- [npmjs.com](https://www.npmjs.com) `[英 · ⭐ · 免费 · 持续更新]` 搜包、查版本必备

## 去问 AI
> 「我刚 clone 一个 Next.js 项目下来。请教我从 0 跑起来：(1) 我电脑要先装什么？(2) 用 npm / pnpm / bun 哪个最快？(3) 装完依赖怎么跑 dev / build？(4) 我看到 'peer dependency warning' 该怎么办？」

---
**来源**：① https://docs.npmjs.com  ② https://pnpm.io
**查询日期**：2026-06-23 · **数据来源时间**：常青
