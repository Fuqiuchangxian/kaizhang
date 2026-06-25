---
group: D-mcp-and-agent
card_id: D-06
title: AI Skill / Tool 与 MCP 的关系
difficulty: ⭐⭐
last_updated: 2026-06-23
status: 已核实
related: [A-06, D-01, D-02]
---

# D-06 AI Skill / Tool 与 MCP 的关系

## 一句话定义
**Tool / Function** = 模型可以调用的一个单一函数（A-06）；**MCP server** = 把一组工具打包成可即插即用模块的协议（D-01）；**Skill** = 比工具更高一层的"可复用工作流 + 资源 + prompt"模块，目前各家叫法略有不同（Anthropic Skills、Claude Code Skills、Cursor Skills、ChatGPT Apps、Custom GPTs 等）。

## 打个比方
- **Tool** = 一个**单一动作**："切土豆丝"
- **MCP server** = 一个**菜刀套装**：切丝、切片、切丁都在里面（多个 Tool 打包）
- **Skill** = **一道菜的完整菜谱**：先切丝（用工具 A）、再焯水（用工具 B）、再炒（用工具 C），还附带配料表 + 火候说明

简单说：**Tool 是动作，MCP 是工具箱，Skill 是工作流配方**。

## 和 vibe coding 的关系
- 早期（2023-2024）：你直接给 LLM 写 Function Schema
- 中期（2024-2025）：MCP 出现，让工具能被多个 host 复用
- 当下（2025-2026）：各家纷纷推出"Skill / Apps" 概念，**把工具 + prompt 模板 + 资源 + 工作流打包成一个可分发的单元**

对 vibe coder 意味着：**未来工作可以"装 Skill"获取整套能力**（如"PR review skill" 装上 = 自动有 review prompt + GitHub MCP + code review checklist + 已知最佳实践）。

## 典型场景 / 示例

### 三个层级对比

| 层级 | 是什么 | 谁定义 | 例子 |
|---|---|---|---|
| **Tool / Function** | 一个可被模型调用的函数 | 你的代码 / SDK 里写 schema | `get_weather(city)` |
| **MCP Server** | 一组 Tool 的标准化封装（含 prompt、resource） | 由 server 作者打包 | Supabase MCP 提供 read_table、run_migration、generate_types 等多个 tool |
| **Skill / App** | 工作流 + Tools + Prompts + Resources 一体化包 | 作者 / 平台定义格式 | "PR Review Skill" 内含 review prompt + GitHub MCP 依赖 + 输出模板 |

### 各家"Skill 类"的具体形态（核实窗口 2026-06）

| 平台 | 名称 | 形态 |
|---|---|---|
| **Anthropic Claude** | **Skills** | Claude.ai / Claude Code 中可装的"能力模块"，组合 prompt + tool |
| **Claude Code CLI** | **Claude Skills**（命令） | 把项目级工作流打包，分发到团队 |
| **Cursor** | **Skills / Marketplace** | 2026 上半年新增，可装第三方扩展（详见 C-01）|
| **ChatGPT** | **GPTs / Apps** | 用户可创建"自定义 GPT"，含 instructions + actions + knowledge |
| **微软 Copilot Studio** | **Plugins / Skills** | 企业级 skill 管理 |

### Skill 与 MCP 不矛盾

```mermaid
flowchart LR
    L[LLM] -->|思考调用| T1[Tool: query_db]
    L -->|思考调用| T2[Tool: send_email]
    L -->|思考调用| T3[Tool: post_to_slack]

    subgraph MCP[MCP Server: Supabase]
        T1
    end

    subgraph S[Skill: "Weekly Report Bot"]
        SP[Skill Prompt:<br/>每周一执行报告流程]
        SP -.use.-> MCP
        SP -.use.-> T2
        SP -.use.-> T3
    end

    classDef tool fill:#dbeafe,stroke:#2563eb;
    classDef mcp fill:#fef3c7,stroke:#d97706;
    classDef skill fill:#dcfce7,stroke:#16a34a;
    class T1,T2,T3 tool;
    class MCP mcp;
    class S,SP skill;
```

一个 Skill 可以：**自己定义 prompt + 引用现有 MCP servers + 引用独立 tools**——它在更高层组合所有能力。

## 常见误区
- ❌ **"Skill = MCP"**：不是。**MCP 是协议**（解决"工具怎么暴露给模型"）；**Skill 是封装**（解决"一个工作流怎么打包分发"）。Skill 通常**用 MCP 实现底层工具调用**。
- ❌ **"装一个 Skill 就一定独立工作"**：很多 Skill 依赖外部 MCP server 或 API key。**装 Skill 前看依赖清单**。
- ❌ **"Anthropic Skills = OpenAI GPTs"**：思路相近，**格式和发布方式不一样**。当前没有跨平台标准（2026-06 时点）。
- ❌ **"Skill 一定比直接 prompt 强"**：Skill 适合"高频复用、有固定流程"的任务。一次性 prompt 没必要包成 Skill。

## 延伸阅读
- [Anthropic Claude Skills 文档](https://docs.anthropic.com/en/docs/claude-code/skills) `[英 · ⭐⭐ · 免费 · 2025-2026]` ⚠️ 国内访问可能受限
- [Anthropic: Engineering Skills（博客系列）](https://www.anthropic.com/engineering) `[英 · ⭐⭐ · 免费 · 持续更新]`
- [OpenAI Custom GPTs / Apps](https://platform.openai.com/docs) `[英 · ⭐⭐ · 免费 · 持续更新]`
- [MCP Spec](https://modelcontextprotocol.io/specification) `[英 · ⭐⭐⭐ · 免费 · 持续更新]`
- A-06 Function Calling
- D-01 什么是 MCP
- `03-skills-repo/`（本资料库的 Skills 仓库——提供可直接复制的资产）

## 去问 AI
> 「请用'菜谱 vs 厨具 vs 单个动作'的比方再讲一遍 Tool / MCP / Skill 三者关系。然后给我一个完整例子：'每周给所有客户发周报' 这个需求，如果用 Skill 设计，应该包含哪些 Tools、引用哪些 MCP servers、Prompt 长什么样？」

---
**来源**：① https://docs.anthropic.com/en/docs/claude-code/skills  ② https://modelcontextprotocol.io
**查询日期**：2026-06-23 · **数据来源时间**：2024-2026
