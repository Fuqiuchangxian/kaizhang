---
group: B-models-and-selection
card_id: B-07
title: 国产模型 API 怎么接入（含接进 Claude Code 的做法）
difficulty: ⭐⭐
last_updated: 2026-06-23
status: 已核实
related: [B-01, B-06, C-01, C-02]
---

# B-07 国产模型 API 怎么接入（含接进 Claude Code 的做法）

> 这张卡是"驾驶舱"接"国产大脑"的实操手册。具体在 Cursor / Claude Code 里怎么用，详见 C 组对应卡片。

## 一句话定义
2026 年所有主流国产模型 API 都同时支持 **OpenAI 兼容协议** 和（多数）**Anthropic 兼容协议**——这意味着你**几乎不用改代码**就能把它们接进 Cursor、Cline、Claude Code、Roo Code 等几乎所有 AI IDE。

## 打个比方
**像把家里水龙头换装外国接口**：
- **OpenAI 兼容协议** = 国际通用接头（6 分牙 G3/4）
- **Anthropic 兼容协议** = 美式接头
- 国产模型厂全部"贴心地"在水龙头上提供这两种接头，你只要改一行 `base_url`，水照样流。

## 和 vibe coding 的关系
国内 vibe coder 的真实痛点：
- Claude / GPT 网络受限或要付海外信用卡
- Claude Code 的 Anthropic API 国内调用经常超时
- 用国产模型直接 + Claude Code 这套"组合拳"，**白菜价享受顶级 IDE 体验**

→ 这张卡告诉你怎么把 DeepSeek / Kimi / GLM / Qwen / MiniMax 这些直接接进 Claude Code（最经典组合）。

## 典型场景 / 示例

### 一、五家"Claude Code 友好"的国产模型 base_url 速查

> 全部为 Anthropic 协议兼容地址。**查询日期：2026-06-23**，请以各家官方文档为最终准。

| 厂商 | Anthropic 兼容地址（接 Claude Code） | OpenAI 兼容地址（接 Cursor / Cline 等） | 控制台申请 API Key |
|---|---|---|---|
| **DeepSeek** | `https://api.deepseek.com/anthropic` | `https://api.deepseek.com` | https://platform.deepseek.com |
| **智谱 GLM** | `https://open.bigmodel.cn/api/anthropic` | `https://open.bigmodel.cn/api/paas/v4` | https://bigmodel.cn |
| **Kimi（Moonshot）** | `https://api.moonshot.cn/anthropic` | `https://api.moonshot.cn/v1` | https://platform.kimi.com |
| **MiniMax** | `https://api.minimaxi.com/anthropic` | `https://api.minimaxi.com/v1` | https://platform.minimaxi.com |
| **阿里百炼（Qwen）** | 兼容 Anthropic Messages（见百炼文档） | `https://dashscope.aliyuncs.com/compatible-mode/v1` | https://bailian.console.aliyun.com |
| **豆包（火山方舟）** | ⚠️ 2025 年底起逐步支持，请查方舟控制台 | `https://ark.cn-beijing.volces.com/api/v3` | https://console.volcengine.com/ark |
| **腾讯混元** | 暂无公开 Anthropic 端点 | `https://api.hunyuan.cloud.tencent.com/v1`（请查控制台） | https://console.cloud.tencent.com/hunyuan |

### 二、把 Claude Code 接到国产模型的两种方式

#### 方式 A：环境变量（最简单，所有平台通用）

以 **智谱 GLM-5.2** 为例：
```bash
# Mac / Linux：写进 .bashrc / .zshrc
export ANTHROPIC_BASE_URL="https://open.bigmodel.cn/api/anthropic"
export ANTHROPIC_API_KEY="你的智谱 API Key"
export ANTHROPIC_DEFAULT_HAIKU_MODEL="glm-4.5-air"
export ANTHROPIC_DEFAULT_SONNET_MODEL="glm-5.2[1m]"
export ANTHROPIC_DEFAULT_OPUS_MODEL="glm-5.2[1m]"
export CLAUDE_CODE_AUTO_COMPACT_WINDOW=1000000

# Windows PowerShell：
# $env:ANTHROPIC_BASE_URL="https://open.bigmodel.cn/api/anthropic"
# $env:ANTHROPIC_API_KEY="..."
```
然后直接 `claude` 启动，所有 Opus/Sonnet/Haiku 请求都会路由到 GLM。

#### 方式 B：官方一键脚本

各家几乎都提供了：
- **DeepSeek**：见 https://api-docs.deepseek.com/zh-cn/guides/anthropic_api
  自动把 `claude-opus*` 映射到 `deepseek-v4-pro`，`claude-haiku*/sonnet*` 映射到 `deepseek-v4-flash`
- **智谱**：`npx @z_ai/coding-helper` 或 `curl -O "https://cdn.bigmodel.cn/install/claude_code_env.sh" && bash ./claude_code_env.sh`
- **Kimi**：模型名直接用 `kimi-k2.7-code`，把 Opus/Sonnet/Haiku 全映射到它即可；建议设 `CLAUDE_CODE_AUTO_COMPACT_WINDOW=262144`
- **MiniMax**：见官方文档 https://platform.minimaxi.com/docs/api-reference/text-anthropic-api

### 三、把任意 IDE 接到国产模型（OpenAI 兼容）

以 **Cursor** + **DeepSeek** 为例（详见 C-01 Cursor 卡）：
1. Cursor 设置 → Models → "Override OpenAI Base URL"
2. URL 填：`https://api.deepseek.com`
3. API Key 填：你的 DeepSeek key
4. 在 Custom Models 添加：`deepseek-v4-pro`、`deepseek-v4-flash`

OpenRouter 是另一种思路：一个 OpenRouter Key 包揽几乎所有模型（含国产），适合多模型切换重的开发者。

### 四、Python / Node 代码里调用的例子

**OpenAI 兼容（DeepSeek 为例）**：
```python
from openai import OpenAI

client = OpenAI(
    api_key="你的 DeepSeek key",
    base_url="https://api.deepseek.com"
)

resp = client.chat.completions.create(
    model="deepseek-v4-pro",
    messages=[{"role": "user", "content": "用 Python 写一个快速排序"}]
)
print(resp.choices[0].message.content)
```
代码几乎和调 OpenAI 没区别，**只改 api_key 和 base_url**。

**Anthropic 兼容（Kimi 为例）**：
```python
import anthropic

client = anthropic.Anthropic(
    api_key="你的 Kimi key",
    base_url="https://api.moonshot.cn/anthropic"
)

resp = client.messages.create(
    model="kimi-k2.7-code",
    max_tokens=1024,
    messages=[{"role": "user", "content": "..."}]
)
```

## 常见误区
- ❌ **"国产模型只能用国产 SDK"**：恰恰相反。**所有主流国产模型都做了 OpenAI 兼容**，你用 OpenAI SDK + 改 base_url 就行，根本不用学新 SDK。
- ❌ **"接进 Claude Code 后体验差很多"**：编程任务上 **Kimi K2.7 Code、GLM-5.2、DeepSeek V4-Pro、Qwen3-Coder-Plus** 的口碑非常接近 Claude Sonnet 当前版，部分场景甚至更优；省钱效果显著。
- ❌ **"国产 API 不稳定"**：DeepSeek、阿里、智谱这几家 SLA 与海外大厂相当；问题更多是**早期版本协议兼容度不完善**——2026 年这些已基本统一。
- ❌ **"我的代码会被国产厂偷看"**：数据合规请看各家"数据使用协议"。DeepSeek 等承诺**不使用 API 调用数据训练**；企业版有完全数据隔离选项。

## 延伸阅读
- [DeepSeek Anthropic 兼容指南（中文）](https://api-docs.deepseek.com/zh-cn/guides/anthropic_api) `[中 · ⭐ · 免费 · 2026]`
- [智谱 GLM 接入 Claude Code 教程](https://docs.bigmodel.cn/cn/guide/develop/claude) `[中 · ⭐ · 免费 · 2026]`
- [Kimi Claude Code 接入说明](https://platform.kimi.com/docs/guide/agent-support) `[中 · ⭐ · 免费 · 2026]`
- [MiniMax Anthropic 兼容文档](https://platform.minimaxi.com/docs/api-reference/text-anthropic-api) `[中 · ⭐ · 免费 · 2026]`
- [阿里百炼 OpenAI 兼容文档](https://help.aliyun.com/zh/model-studio/use-qwen-by-calling-api) `[中 · ⭐ · 免费 · 2026]`

## 去问 AI
> 「我在 Mac 上装了 Claude Code，但海外 API 太慢。请给我一份完整教程：用 DeepSeek API Key + Anthropic 兼容协议，把 Claude Code 配置成默认走 DeepSeek。一步步告诉我环境变量、验证命令、常见错误。」

---
**来源**：① DeepSeek / 智谱 / Kimi / MiniMax / 阿里百炼 官方接入文档  ② 各家控制台 URL
**查询日期**：2026-06-23 · **数据来源时间**：2026-06
