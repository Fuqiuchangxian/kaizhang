# Skills 仓库 · mcp-configs.md

> 本文件提供 **M-01 ~ M-08 可直接复制的 MCP 配置片段** + 每个的"配置步骤"。
> 配 D-02（MCP 怎么配置）使用。
> 把对应片段加到 `~/.cursor/mcp.json`（Cursor）或 `~/Library/Application Support/Claude/claude_desktop_config.json`（Claude Desktop）/ `.mcp.json`（项目级）里即可。

---

## 目录

| # | MCP | 解决什么问题 | 难度 |
|---|---|---|---|
| M-01 | Supabase MCP | AI 直接读写你的数据库、跑迁移 | ⭐⭐ |
| M-02 | GitHub MCP | AI 直接提 PR / 看 issue / 评论 | ⭐ |
| M-03 | Filesystem MCP | AI 读写指定目录文件 | ⭐ |
| M-04 | Browser MCP（Puppeteer / Playwright） | AI 控制浏览器、截图、抓数据 | ⭐⭐ |
| M-05 | Stripe MCP | AI 查订单、退款、生成支付链接 | ⭐⭐ |
| M-06 | Vercel MCP | AI 部署、查日志、看分析 | ⭐⭐ |
| M-07 | Notion MCP | AI 读写 Notion 页面 | ⭐ |
| M-08 | Slack MCP | AI 看消息、发通知 | ⭐⭐ |

---

## 配置文件位置速查

| Host | 路径 |
|---|---|
| **Cursor** | `~/.cursor/mcp.json` (macOS/Linux) `%USERPROFILE%\.cursor\mcp.json` (Windows) |
| **Claude Desktop** | `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) `%APPDATA%\Claude\claude_desktop_config.json` (Windows) |
| **Claude Code（项目级）** | `<project_root>/.mcp.json` |
| **Cline / 其他** | 各家文档 |

⚠️ 改完配置文件一般要**重启 host**才生效。

---

## M-01 · Supabase MCP

**用途**：让 AI 在 Cursor 里直接查/改你的 Supabase 数据库、跑迁移、生成 TypeScript 类型。

### 准备
1. 在 https://supabase.com/dashboard/account/tokens 创建 Personal Access Token（PAT），命名如 `cursor-mcp-supabase`
2. 找到你项目的 ref（在 dashboard URL：`https://supabase.com/dashboard/project/<ref>`）

### 配置（加到 mcp.json）

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": [
        "-y",
        "@supabase/mcp-server-supabase@latest",
        "--read-only",
        "--project-ref=YOUR_PROJECT_REF"
      ],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "sbp_xxxxxxxxxxxx"
      }
    }
  }
}
```

> 去掉 `--read-only` 后 AI 可以写数据 / 跑迁移——⚠️ 重要操作前确认 AI 在动什么。

### 验证
重启 Cursor → 在 chat 里说：「列出 users 表所有字段」——AI 会调用 MCP 返回真实表结构。

---

## M-02 · GitHub MCP

**用途**：AI 能直接读 issue / 提 PR / 评论 / 合并、看 commit 历史。

### 准备
在 https://github.com/settings/tokens 创建 Personal Access Token (classic)：
- 勾选 `repo`（私有库需要）、`read:org`、`workflow`
- 命名如 `mcp-github`

### 配置

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

> 注：GitHub 官方现在也提供了官方 GitHub MCP server（`@github/github-mcp-server`），功能更全。包名 / 用法以 [modelcontextprotocol/servers GitHub README](https://github.com/modelcontextprotocol/servers) 为准。

### 验证
在 chat 里说："看一下 my-app 仓库最近 3 个 issue"——AI 调用 MCP 列出真实 issue。

---

## M-03 · Filesystem MCP

**用途**：让 AI 显式读写指定目录的文件——比 IDE 自带"读项目"权限更细。

### 配置

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/yourname/projects/my-app",
        "/Users/yourname/docs"
      ]
    }
  }
}
```

> **最小权限原则**：只列出 AI 真正需要的目录路径，**永远不要传 `/` 或 `~`**。Windows 用 `C:\\Users\\yourname\\projects\\my-app` 双反斜杠。

### 验证
"读一下 /Users/yourname/projects/my-app/package.json"——AI 返回文件内容。

---

## M-04 · Browser MCP（Puppeteer / Playwright）

**用途**：AI 控制无头浏览器——截图、点按钮、抓页面数据、测试交互。

### 配置（Puppeteer，最常用）

```json
{
  "mcpServers": {
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    }
  }
}
```

### 配置（Microsoft Playwright MCP，跨浏览器）

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"]
    }
  }
}
```

### 验证
"打开 https://example.com 并截图给我"——AI 调用 MCP 返回截图。

⚠️ 首次运行会下载几百 MB 的浏览器二进制——耐心等。

---

## M-05 · Stripe MCP

**用途**：AI 查订单、退款、创建价格、查 webhook 日志。

### 准备
在 Stripe Dashboard 拿 **restricted key**（不要用 sk_live_ 主密钥）：
1. Dashboard → Developers → API keys → "Create restricted key"
2. 勾你需要的权限（customers / charges / refunds 等）
3. 命名 `mcp-stripe`

### 配置

```json
{
  "mcpServers": {
    "stripe": {
      "command": "npx",
      "args": ["-y", "@stripe/mcp", "--tools=all"],
      "env": {
        "STRIPE_API_KEY": "rk_test_xxxxxxxxxxxx"
      }
    }
  }
}
```

> 测试模式用 `rk_test_*`，生产用 `rk_live_*`。**强烈建议**只给 read 权限，写操作（refund/cancel）手动来。

### 验证
"查一下昨天的成功支付订单"——AI 列出。

---

## M-06 · Vercel MCP

**用途**：AI 部署、查日志、看分析、管理域名。

### 准备
在 https://vercel.com/account/tokens 创建 token。

### 配置

```json
{
  "mcpServers": {
    "vercel": {
      "command": "npx",
      "args": ["-y", "@vercel/mcp-adapter"],
      "env": {
        "VERCEL_API_TOKEN": "xxx"
      }
    }
  }
}
```

> ⚠️ Vercel 官方 MCP 包名 / 启动方式更新较快，**以 [Vercel docs](https://vercel.com/docs/mcp) 为准**。

### 验证
"看一下 my-app 项目最近 10 次部署状态"——AI 列出。

---

## M-07 · Notion MCP

**用途**：AI 读写 Notion 页面、数据库、评论。

### 准备
1. 在 https://www.notion.so/profile/integrations 创建 internal integration
2. 拿 Integration Token
3. 在要让 AI 操作的页面/库 → 右上角 "..." → Connections → 添加你的 integration

### 配置

```json
{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["-y", "@notionhq/notion-mcp-server"],
      "env": {
        "OPENAPI_MCP_HEADERS": "{\"Authorization\":\"Bearer ntn_xxx\",\"Notion-Version\":\"2022-06-28\"}"
      }
    }
  }
}
```

### 验证
"在我的 'Tasks' 数据库新建一条今天要做的事"——AI 调用 MCP 创建。

---

## M-08 · Slack MCP

**用途**：AI 看消息、发通知到指定 channel。

### 准备
1. https://api.slack.com/apps → Create App → From Scratch
2. 加 Bot Token Scopes：`channels:history` `channels:read` `chat:write` 等
3. Install to Workspace → 拿 Bot User OAuth Token (`xoxb-...`)
4. 拿 Team ID（Workspace settings 里）

### 配置

```json
{
  "mcpServers": {
    "slack": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-slack"],
      "env": {
        "SLACK_BOT_TOKEN": "xoxb-xxxxxxxxxxxx",
        "SLACK_TEAM_ID": "T01234567"
      }
    }
  }
}
```

### 验证
"发送 'Deploy 完成' 到 #general"——AI 调用 MCP 发消息。

---

## 一个完整 mcp.json 示例（独立开发者套餐）

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/yourname/projects/my-saas"
      ]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxxxxxxxxxxxxxxx"
      }
    },
    "supabase": {
      "command": "npx",
      "args": [
        "-y",
        "@supabase/mcp-server-supabase@latest",
        "--read-only",
        "--project-ref=abcdefghijklmnop"
      ],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "sbp_xxxxxxxxxxxx"
      }
    },
    "stripe": {
      "command": "npx",
      "args": ["-y", "@stripe/mcp", "--tools=all"],
      "env": {
        "STRIPE_API_KEY": "rk_test_xxxxxxxxxxxx"
      }
    },
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    }
  }
}
```

5 个 server，覆盖 80% 独立开发者日常需求。

---

## 通用故障排查

### MCP server 启动失败
1. **打开 host 的 MCP 日志**（Cursor: Settings → Cursor Settings → MCP → 看红色错误）
2. 常见原因：
   - **npx 没有/路径错** → 装 Node.js 22+ + 重启终端
   - **Windows 要 `cmd /c npx`** → 把 `command` 改成 `cmd`，args 头部加 `["/c", "npx", ...]`
   - **token 错** → 重新生成
   - **权限不够** → 检查 token 范围
   - **包名错** → 上 [official servers repo](https://github.com/modelcontextprotocol/servers) 看最新

### Cursor 看不到 MCP server
- 重启 Cursor
- 检查 JSON 格式（必须有效 JSON，逗号别多）
- macOS：检查 `~/.cursor/mcp.json` 存在
- Windows：检查 `%USERPROFILE%\.cursor\mcp.json` 路径

### AI 不主动调用 MCP
- 在 prompt 里**显式说**"使用 supabase MCP 查 users 表"
- 检查 server 是绿点（已就绪）
- 减少同时 enable 的 server 数（≤5）

---

## 安全建议

1. **把 mcp.json 加进 .gitignore**（含 token）
2. **token 用最小权限**（GitHub 给 repo + read：org 就够）
3. **生产环境 token 不要复用开发**
4. **写权限的 MCP 慎给**——AI 误操作 = 你数据没了
5. **定期 rotate token**——3 个月轮换一次

---

## 怎么找新 MCP server？

| 渠道 | 说明 |
|---|---|
| [MCP Servers 官方仓库](https://github.com/modelcontextprotocol/servers) | 官方维护 + 社区合集 |
| [Awesome MCP Servers](https://github.com/punkpeye/awesome-mcp-servers) | 社区 awesome |
| [Smithery.ai](https://smithery.ai) | MCP 市场，可视化搜索 |
| [PulseMCP](https://www.pulsemcp.com) | MCP 资讯 + 目录 |

---

**最后更新**：2026-06-23 · MCP 协议持续演进，配置以最新文档为准
