---
group: D-mcp-and-agent
card_id: D-02
title: MCP 怎么配置（Cursor / Claude Code 实操）
difficulty: ⭐⭐
last_updated: 2026-06-23
status: 已核实
related: [D-01, D-03, C-01, C-02]
---

# D-02 MCP 怎么配置（Cursor / Claude Code 实操）

## 一句话定义
配置 MCP server = 在你的 IDE 配置文件里**告诉它"去哪儿启动哪个 server、用哪些环境变量"**。一般 2-3 行 JSON / 一个命令搞定。

## 打个比方
**像给你的电脑装一个新外设**：先到设备管理器（IDE 配置）把驱动声明一下，然后插上 USB（重启 IDE 或重新加载 MCP），就能用了。

## 和 vibe coding 的关系
**学会配 MCP = vibe coder 的中级毕业证**。
- 配上 Supabase MCP → AI 帮你查数据库、写迁移
- 配上 GitHub MCP → AI 帮你提 PR、看 issue
- 配上 Browser MCP → AI 帮你看页面截图、测交互

## 典型场景 / 示例

### Cursor 配置 MCP

#### 方式一：通过 UI（推荐新手）
1. 打开 Cursor → Settings → Cursor Settings → **MCP**
2. 点 "Add new MCP server"
3. 填名字 / command / args / env
4. 保存后 Cursor 自动尝试启动 server

#### 方式二：直接编辑配置文件

文件路径：
- macOS / Linux：`~/.cursor/mcp.json`
- Windows：`%USERPROFILE%\.cursor\mcp.json`

最小示例（**Filesystem MCP**，让 AI 读写本地文件）：

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/yourname/projects"
      ]
    }
  }
}
```

加 **GitHub MCP**（让 AI 直接操作仓库）：
```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxxxxxxxxxxxxxxx"
      }
    }
  }
}
```

保存后**重启 Cursor**。绿色圆点 = 已就绪；红色圆点 = 启动失败（看日志）。

### Claude Code（CLI）配置 MCP

Claude Code 用的是 `.mcp.json` 或 `claude_desktop_config.json`。

**项目级**（当前目录下的 `.mcp.json`）：
```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server-supabase@latest"],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "sbp_xxx",
        "SUPABASE_PROJECT_REF": "xxxxxxxxxxxx"
      }
    }
  }
}
```

**用户级**（全局）：
- macOS：`~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows：`%APPDATA%\Claude\claude_desktop_config.json`

CLI 中验证：
```bash
claude mcp list
```

### 三种 server 启动方式

| 方式 | 用什么 | 例子 |
|---|---|---|
| **stdio**（最常见） | `command` + `args` 启动一个本地进程 | 上面所有例子 |
| **HTTP / SSE** | 远程 server URL | 自己部署的 server / SaaS 提供的 MCP |
| **Docker** | `docker run ...` | 隔离环境，便于分发 |

### 配完后怎么用？

在 Cursor / Claude Code 的对话框里，**正常说话**就行：
- "看看 users 表有哪些字段" → 调用 Supabase MCP
- "把这个改动开个 PR" → 调用 GitHub MCP
- "读 /tmp/log.txt 最后 100 行" → 调用 Filesystem MCP

AI 会自动判断该用哪个 server。

## 常见误区
- ❌ **"配完不重启就生效"**：大部分情况下需要重启 IDE 或重新加载 MCP（Cursor 有 reload 按钮，Claude Code 需要重启会话）。
- ❌ **"npx 命令在 Windows 也一样"**：Windows 下有时要用 `cmd /c npx` 包一层。报错"command not found"先检查这个。
- ❌ **"env 里 key 写明文不安全"**：MCP 配置文件不要提交到 git。**加进 .gitignore**。或者把 key 存在系统环境变量，配置里写 `${VAR_NAME}`。
- ❌ **"装了 server 就一定有效"**：要看 IDE 用的模型支不支持 tool use（A-06）。GPT-5 / Claude Sonnet 系列都支持；早期非 instruct 模型可能不支持。
- ❌ **"server 越多 AI 越聪明"**：装 10 个以上 server 会让 AI 选工具迟钝、错调用增多。建议 ≤5 个。

## 延伸阅读

### 📺 视频教程
- [MCP 配置实战 (YouTube)](https://www.youtube.com/watch?v=0Bjy9SrXT4Q) `[英 · ⭐⭐ · 免费 · 2024 · 15min]` Cursor/Claude Code 配置 MCP 实操
- [MCP Server 配置指南 (B站)](https://www.bilibili.com/video/BV1rC41187rS) `[中 · ⭐⭐ · 免费 · 2024 · 18min]` 中文配置教程
- [Supabase MCP 配置演示 (YouTube)](https://www.youtube.com/watch?v=8KJtTvbRygM) `[英 · ⭐⭐ · 免费 · 2024 · 10min]` 具体 server 配置示例

### 📰 文章
- [Cursor MCP 官方文档](https://docs.cursor.com/context/mcp) `[英 · ⭐⭐ · 免费 · 持续更新]`
- [Claude Code MCP 文档](https://docs.anthropic.com/en/docs/claude-code/mcp) `[英 · ⭐⭐ · 免费 · 持续更新]` ⚠️ 国内访问可能受限
- [MCP servers 官方仓库](https://github.com/modelcontextprotocol/servers) `[英 · ⭐⭐ · 免费 · 持续更新]` 含官方维护的 server 完整 README
- [awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) `[英 · ⭐⭐ · 免费 · 持续更新]` 89K+ stars，社区 MCP server 大全
- D-03 好用的 MCP Server 导航（接着配什么）

## 去问 AI
> 「我在 Mac 上用 Cursor。请给我一份'15 分钟装 3 个 MCP'的步骤：(1) Filesystem MCP 给我项目目录读写权限；(2) GitHub MCP 让 AI 能提 PR；(3) Supabase MCP 让 AI 读我数据库。每一步给出完整 JSON 配置和我需要在哪儿生成 token。」

---
**来源**：① https://docs.cursor.com/context/mcp  ② https://docs.anthropic.com/en/docs/claude-code/mcp
**查询日期**：2026-06-23 · **数据来源时间**：2025-2026
