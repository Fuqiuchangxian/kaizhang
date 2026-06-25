---
group: A-ai-basics
card_id: A-06
title: Function Calling / Tool Use
difficulty: ⭐⭐
last_updated: 2026-06-23
status: 已核实
related: [A-07, D-01, D-06]
---

# A-06 Function Calling / Tool Use（工具调用）

## 一句话定义
Function Calling = 让 AI 在回答前**先去调用一个外部函数**（查天气、查数据库、发邮件……），拿到结果后再组织答案。它让 LLM 从"只能说话"变成"能动手做事"。

## 打个比方
**没有 Function Calling 的 LLM 像图书馆里的学者**：只能根据脑子里读过的书回答你。问"今天上海几度？"——他答不上来，最多说"通常 6 月上海大约 25-30 度"。
**有 Function Calling 的 LLM 像学者+一台电话**：他想答"今天几度"，他先打个电话给天气服务，听到对方说"27 度"，然后告诉你"今天上海 27 度"。

电话 = Tool（工具）；学者决定打哪个电话 + 问什么 = Function Calling。

## 和 vibe coding 的关系
这是几乎所有"看起来很神奇"的 AI 产品背后的机制：
- Cursor 能改你的文件 → 它通过 Function Calling 调用 `write_file()` 工具
- ChatGPT 能搜网页 → 它调用 `web_search()` 工具
- Claude 能跑代码 → 它调用 `code_execution()` 工具
- 你接入支付的 AI 客服 → 它调用 `stripe.refund()` 工具

**MCP（D 组）** 就是把"工具"这件事标准化的协议——你接 MCP Server 后，AI 自动多了一堆能力。

## 典型场景 / 示例

**一个最小完整流程**：
```
用户："帮我把刚才那笔订单退款"

LLM 思考：我需要先查订单，再调用退款 API
  └ 调用 Tool: search_order(user_id="123", recent=true)
  └ 返回: {order_id: "ord_xx", amount: 99}
LLM 思考：找到了，现在退款
  └ 调用 Tool: refund_order(order_id="ord_xx", amount: 99)
  └ 返回: {success: true, refund_id: "re_yy"}

LLM 回复用户："好的，您 99 元的订单已退款，到账约 5 个工作日。"
```

**最小代码（OpenAI 风格）**：
```python
tools = [{
  "type": "function",
  "function": {
    "name": "get_weather",
    "description": "查询某城市当前天气",
    "parameters": {
      "type": "object",
      "properties": {"city": {"type": "string"}},
      "required": ["city"]
    }
  }
}]

# 调用时模型可能返回:
# { "tool_calls": [{ "name": "get_weather", "arguments": {"city": "上海"} }] }
# 你的程序执行真实函数，把结果发回，模型再生成最终答复
```

## 常见误区
- ❌ **"AI 自己会调用"**：不会。Function Calling 只是模型**告诉你**"我想调用 X 函数"，**真正执行是你写的代码**。模型本身不能访问任何外部世界。
- ❌ **"工具越多越好"**：同时给 AI 几十个工具，它选择会变迟钝、错调用增多。推荐 ≤10 个、描述写清楚。
- ❌ **"和 prompt 里写步骤一样"**：不一样。在 prompt 里写"第一步搜索第二步退款"是让 AI 假装；Function Calling 是真的执行了。

## 延伸阅读

### 📺 视频教程
- [Function Calling 详解 (YouTube)](https://www.youtube.com/watch?v=0XZ38qFUoCs) `[英 · ⭐⭐ · 免费 · 2024 · 18min]` 可视化讲解 function calling 完整流程
- [吴恩达 · Building Systems with the ChatGPT API](https://www.deeplearning.ai/short-courses/building-systems-with-chatgpt/) `[英 · ⭐⭐ · 免费 · 2023 · 1h]` 含 function calling 系统设计
- [LangChain Function Calling Tutorial (YouTube)](https://www.youtube.com/watch?v=1bUy-1hGZpI) `[英 · ⭐⭐ · 免费 · 2024 · 25min]` LangChain 框架视角的 tool use

### 📰 文章
- [OpenAI Function Calling 官方指南](https://platform.openai.com/docs/guides/function-calling) `[英 · ⭐⭐ · 免费 · 持续更新]` 最权威，含完整代码。
- [Anthropic Tool Use 指南](https://docs.anthropic.com/en/docs/build-with-claude/tool-use) `[英 · ⭐⭐ · 免费 · 持续更新]` Claude 的实现方式略有不同。
- [LangChain Tools 教程（含中文）](https://python.langchain.com/docs/concepts/tools/) `[英 · ⭐⭐ · 免费 · 2024]` 框架视角的工具调用。

## 去问 AI
> 「请用'人去外卖 App 点单'的例子，给我讲清楚 Function Calling 整个流程：LLM 像谁？外卖 App 像谁？工具调用过程对应哪一步？」

---
**来源**：① OpenAI 官方  ② Anthropic 官方  ③ LangChain 文档
**查询日期**：2026-06-23 · **数据来源时间**：2024-2026
