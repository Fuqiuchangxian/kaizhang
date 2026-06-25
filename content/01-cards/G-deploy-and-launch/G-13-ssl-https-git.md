---
group: G-deploy-and-launch
card_id: G-13
title: SSL/HTTPS + Git 最小必要（合卡）
difficulty: ⭐
last_updated: 2026-06-23
status: 已核实
related: [G-01, G-12]
---

# G-13 SSL/HTTPS + Git 最小必要

> 这张是 G 组的"两个基础知识合并卡"——上线前必须知道、但 2026 年几乎完全被部署平台自动化掉的两件事。

---

## Part 1：SSL / HTTPS

### 一句话定义
**HTTPS = HTTP + SSL/TLS 加密**——浏览器与你服务器之间所有数据都加密。**2026 年所有正式产品都必须是 HTTPS**（HTTP 浏览器会标"不安全"，Google 不收录、表单不让填）。

### 打个比方
- **HTTP** = 明信片——邮局所有人都能看见
- **HTTPS** = 加密的密封信——只有收件人能拆开

### vibe coder 该知道什么？

**好消息**：你**几乎不用做任何事**。
- Vercel / Netlify / Cloudflare / Zeabur / EdgeOne / Railway 等所有现代部署平台 → 绑域名后**自动签 Let's Encrypt 证书**
- 浏览器锁图标自动变绿
- 证书自动续期（Let's Encrypt 90 天有效，自动续）

### 自己手动配证书的少数情况
- 自部署服务器 / VPS（没有现成 PaaS）→ 用 `certbot` + Let's Encrypt
- 需要 EV 证书（绿条带公司名）→ 付费购买（一般独立开发者不需要）
- 通配符证书 `*.yourapp.com` → Cloudflare / Let's Encrypt 都免费支持

### 强制 HTTPS（避免 HTTP 漏掉）
所有现代平台默认就是 force HTTPS，HTTP 请求自动 301 到 HTTPS。

---

## Part 2：Git / GitHub 最小必要

### 一句话定义
**Git** = 代码版本控制工具（让你能"撤销"、对比、和别人合作）；**GitHub** = 全球最大的 Git 仓库托管平台。**vibe coder 必备**——你写的所有 vibe coding 项目都该放 GitHub。

### 为什么必备？
- **回退**：AI 改坏了 → `git reset`
- **对比**：看 AI 改了什么 → `git diff`
- **协作**：和朋友一起做项目 → push / pull
- **部署**：Vercel / Cloudflare 等都靠 git push 触发部署
- **备份**：电脑炸了也不丢代码

### 你必须会的 7 个命令

```bash
# 1. 初始化
git init

# 2. 看哪些文件改了
git status

# 3. 看具体改了什么
git diff

# 4. 提交一次"快照"
git add .
git commit -m "加了登录页"

# 5. 推到 GitHub
git push

# 6. 拉别人的更新
git pull

# 7. 撤销最近一次（小心用）
git reset --hard HEAD~1
```

### 分支工作流（最小）

```bash
# 切到新分支
git checkout -b feature/login

# ... 改代码 ...
git add .
git commit -m "..."
git push -u origin feature/login

# 在 GitHub 上提 PR → 合并到 main
```

### 必须 .gitignore 的东西
```
node_modules/
.env*.local
.env
.next/
dist/
build/
*.log
.DS_Store
.vscode/
```

### vibe coder 的"AI 友好" git 习惯
1. **每个 AI 任务前先 commit 一次** —— 万一改坏了能立刻 `git reset`
2. **AI 改完先 `git diff` 看一眼** —— 防止它偷改无关文件
3. **永远不要把 secret 提交到 git** —— 详见 F-05
4. **新功能开新分支** —— main 永远是能跑的

### 在 IDE 里管理 git
- **Cursor / VS Code / Trae** 都有 Source Control 面板（左侧边栏）
- 大部分操作不用敲命令，点点就行
- 但仍建议至少懂 `commit / push / diff / reset` 四个命令

## 常见误区
- ❌ **"HTTPS 配置很难"**：2026 年几乎所有现代部署平台都自动化了。**99% 情况零配置**。
- ❌ **"Let's Encrypt 证书不安全"**：完全安全，和付费证书加密强度一样。区别仅在于"有没有公司名验证"（EV 证书）。
- ❌ **"GitHub Private 仓库就一定安全"**：仍可能 token / collaborator 泄露。**secret 永远不放 git**（哪怕 private）。
- ❌ **"我不用 git，AI 帮我备份就行"**：AI 不备份。**git 是你自己写代码的"撤销键"**——丢了一晚上工作的人都没了 git 准备。
- ❌ **"force push 没事"**：在共享分支 force push 会**覆盖别人提交**。除非你确认是个人分支，永远不要 `git push --force` 到 main。

## 延伸阅读
- [Pro Git Book（中文版）](https://git-scm.com/book/zh/v2) `[中 · ⭐⭐ · 免费 · 持续更新]` 最权威 git 教材
- [GitHub Docs（中文）](https://docs.github.com/zh) `[中 · ⭐ · 免费 · 持续更新]`
- [Let's Encrypt 官网](https://letsencrypt.org/) `[英 · ⭐ · 免费 · 持续更新]`
- [Cloudflare SSL/TLS 文档](https://developers.cloudflare.com/ssl/) `[英 · ⭐⭐ · 免费 · 持续更新]`
- [Oh Shit, Git!?!（中文版）](https://ohshitgit.com/zh) `[中 · ⭐ · 免费 · 常青]` 各种 git 翻车的救命指南
- G-01 Vercel · G-12 域名 / DNS

## 去问 AI
> 「我从来没用过 git，刚装好 Cursor。请教我 10 分钟内做完：(1) 在终端配 git 用户名邮箱；(2) 在 github.com 创建仓库；(3) 把 Cursor 里的项目 push 上去；(4) 改完代码 commit + push 一次。每一步给完整命令。」

---
**来源**：① Pro Git Book  ② GitHub Docs  ③ Let's Encrypt
**查询日期**：2026-06-23 · **数据来源时间**：常青
