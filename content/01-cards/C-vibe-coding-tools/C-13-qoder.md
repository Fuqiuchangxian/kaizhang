---
group: C-vibe-coding-tools
card_id: C-13
title: Qoder（与阿里相关 · 独立运营 Bright Zenith）
difficulty: ⭐⭐
last_updated: 2026-06-23
status: 已核实
related: [B-07, C-决策树, C-10]
---

# C-13 Qoder

## 一句话定义
Qoder 是 2025 年新发布的"Agentic Coding Platform"，主打 **Quest Window（并行多任务）+ Knowledge Engine + Repo Wiki**，宣称能处理"100k 文件、26 小时长任务"。底层使用 Qwen-Coder（阿里的 Qwen 系列），但**官方层面不挂阿里招牌**，由独立公司 Bright Zenith（新加坡）运营。

## 打个比方
**像把"放手让 AI 跑一整天"做到极致的 IDE**：和 Cursor 那种"AI 帮你边写边问"不同，Qoder 强调"你扔一个 Quest 给它，它在云端 Agent 上跑几小时甚至一天"——更像 Devin Desktop（C-07），但底层用国产模型。

## 和 vibe coding 的关系
- **大仓库 / 长任务**：100k 文件、26h 长任务是它的招牌
- **独立运营**：和通义灵码（C-10）功能上重叠但定位不同——灵码偏企业研发协同，Qoder 偏"国际 Agent 平台"
- **国内可用 + 中文站**：qoder.com.cn

## 典型场景 / 示例

### 关键事实（核实窗口 2026-06）

| 字段 | 内容 |
|---|---|
| 产品形态 | **Qoder Desktop**（独立 IDE / "Autonomous Development Desktop"）+ **Qoder CLI**（`npm i -g @qoder-ai/qodercli`）+ JetBrains 插件 + Mobile + Cloud Agents + QoderWork + QoderWake |
| 公司主体 | **BRIGHT ZENITH PRIVATE LIMITED**（新加坡） |
| 官方网站 | https://qoder.com（中文站：https://qoder.com.cn） |
| 博客 | https://qoder.com/blog |

### 定价（**查询日期：2026-06-23**）
- 新用户 **2 周 Pro Trial**，过期自动降级 Free
- 按 credits 计费
- 具体档位 USD 数字未在主页直接列出
- 👉 **完整档位价格**：访问 https://qoder.com/pricing 子页

### 支持的模型
- **底层 Qwen-Coder**（阿里通义系列，官方博客有专文 "Qwen-Coder-Qoder: Customizing a fast-evolving frontier model..."）
- **Community Edition** 支持 BYOK（Bring Your Own Key，可接其他模型）

### 国内能否直接用
- ✅ qoder.com 可访问；qoder.com.cn 为中文站

### 2025-2026 关键更新
- 2025 年内一系列发布：Qoder Subscriptions → Qoder CLI → QoderWork → **Qoder 1.0**（"From AI IDE to Autonomous Development Desktop"）→ Community Edition（BYOK 免费）→ QoderWake → Remote Control（Web + iOS/Android）
- 自报 "1,000,000+ developers"
- Product Hunt Product of the Day
- 创始人播客 2025-10-24

### 适合的场景
- 100k 级文件的大仓库
- 想"放手让 Agent 跑一整天"的开发者
- 想用 BYOK 自带模型 key 的高级用户
- 同时需要桌面 + CLI + 手机三端控制 Agent

### 不太适合
- 初学者（学习曲线较陡）
- 偏小型项目（杀鸡用牛刀）
- 重度依赖 Anthropic / GPT 旗舰（Qoder 底模是 Qwen 系）

## Qoder vs 通义灵码（同属阿里相关）

| 维度 | Qoder | 通义灵码 |
|---|---|---|
| 公司主体 | Bright Zenith（新加坡） | 阿里巴巴官方 |
| 定位 | 国际化 Agent 平台 | 国内企业研发助手 |
| 核心卖点 | Quest Window 长任务、大仓库 | 多端 IDE + Java 友好 |
| 是否官方挂阿里 | 否 | 是 |
| 中文资料 | qoder.com.cn 中文站 | 通义官方中文文档完整 |

**业界判断**：阿里并行运营两条 AI 编程产品线——灵码守国内企业市场，Qoder 试国际 + 独立运营。

## 常见误区
- ❌ **"Qoder = 通义灵码改名"**：不是。**两者并行运营**，定位不同。
- ❌ **"Qoder 是新加坡公司"**：注册主体在新加坡，但底模来自阿里 Qwen 系列。社区普遍认为 Qoder 是阿里"打到海外市场"的产品线。
- ❌ **"Qoder 只能用 Qwen"**：Community Edition 支持 BYOK，可接其他模型。
- ❌ **"Quest Window = 多窗口"**：是"并行多 Agent 任务"机制——你同时下 5 个 Quest，它在云端开 5 个 Agent 并行跑。

## 延伸阅读
- [Qoder 官方页](https://qoder.com) `[英 · ⭐⭐ · 免费试用 · 持续更新]`
- [Qoder 中文站](https://qoder.com.cn) `[中 · ⭐ · 免费试用 · 持续更新]`
- [Qoder 博客](https://qoder.com/blog) `[英 · ⭐⭐ · 免费 · 持续更新]` 含 Qwen-Coder-Qoder 技术细节
- [Qoder CLI npm 包](https://www.npmjs.com/package/@qoder-ai/qodercli) `[英 · ⭐ · 免费 · 持续更新]`
- C-10 通义灵码（阿里另一条产品线）
- C-07 Devin Desktop（类似"长任务 Agent" 定位）

## 去问 AI
> 「我有一个 50k 文件的大型遗留 Java 项目，要做安全升级和重构。请帮我比较 Qoder 和 Devin Desktop 在我这场景的胜负——长任务能力、对中文注释 / 文档的理解、对企业网络 / 私有部署的支持，分别如何？」

---
**来源**：① https://qoder.com  ② https://qoder.com/blog
**查询日期**：2026-06-23 · **数据来源时间**：2025-2026
