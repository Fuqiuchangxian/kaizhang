---
group: G-deploy-and-launch
card_id: G-12
title: 域名与 DNS
difficulty: ⭐
last_updated: 2026-06-23
status: 已核实
related: [G-01, G-13]
---

# G-12 域名与 DNS

## 一句话定义
**域名** = 你的"互联网门牌号"（`yourapp.com`）；**DNS（Domain Name System）** = 全球电话簿，把域名翻译成服务器 IP，浏览器才能找到你。

## 打个比方
- IP（如 `76.76.21.21`）= 真实地理坐标
- 域名（如 `yourapp.com`）= 好记的店名
- DNS = 大众点评：用户搜店名 → 查到地址 → 导航过去

## 和 vibe coding 的关系
- 部署到 Vercel / EdgeOne / Zeabur 后，**默认子域名（如 `xxx.vercel.app`）只够 demo**
- 想做正式产品 → 必须买域名 + 配 DNS 解析
- 全程 30 分钟以内、年费 ¥40-¥200

## 典型场景 / 示例

### 买域名去哪里？

**海外注册商**：
- **Namecheap**（namecheap.com） — 价格中等、UI 友好
- **Cloudflare Domains**（cloudflare.com） — **零加价**（成本价转售）、自带最强 DNS
- **Porkbun**（porkbun.com） — 价格便宜、独立开发者口碑好
- **Google Domains** — **已停服**，全部转给 Squarespace（不推荐）

**国内注册商**（**国内备案必须用**）：
- 阿里云万网（wanwang.aliyun.com）
- 腾讯云 DNSPod（dnspod.com）
- 华为云

### 选什么后缀（TLD）？

| TLD | 年费区间 | 优势 |
|---|---|---|
| **.com** | ¥70-¥120 | 经典、可信 |
| **.io** | ¥250-¥400 | 科技产品流行 |
| **.dev** | ¥80-¥120 | 程序员友好 |
| **.app** | ¥80-¥150 | 强制 HTTPS |
| **.ai** | ¥600-¥1000+ | AI 产品热门，但贵 |
| **.xyz / .me / .co** | ¥30-¥80 | 备用 / 短一些 |
| **.cn** | ¥40-¥70 | 国内必须 ICP 备案才能解析到国内主机 |

> 价格波动频繁，**查询日期：2026-06-23**。续费价通常比首年贵。

### DNS 解析 6 种核心记录

| 记录类型 | 用途 | 例子 |
|---|---|---|
| **A** | 域名 → IPv4 地址 | `@ → 76.76.21.21` |
| **AAAA** | 域名 → IPv6 地址 | `@ → 2606:4700::6810` |
| **CNAME** | 域名 → 另一个域名 | `www → cname.vercel-dns.com` |
| **MX** | 邮件路由 | `@ → mx.zoho.com` |
| **TXT** | 文本（验证 / SPF / DKIM） | `@ → "v=spf1 include:..."` |
| **NS** | 域名服务器 | `@ → ns1.cloudflare.com` |

### 接 Vercel 的标准配置

在域名注册商 DNS 控制台加：
```
A     @     76.76.21.21
CNAME www   cname.vercel-dns.com
```
等 5-60 分钟 DNS 生效 → Vercel 自动签发 HTTPS 证书。

### Cloudflare 作为"DNS 加速 + 安全层"

把域名 NS 改成 Cloudflare 的：
```
ns1.cloudflare.com
ns2.cloudflare.com
```
然后所有 DNS 记录在 Cloudflare 控制台管理。**好处**：DNS 全球加速、免费 DDoS 防护、免费 CDN、免费 SSL。

## 常见误区
- ❌ **"国内服务器只能用 .cn 域名"**：错。用任意 TLD 都可以指向国内服务器，**但都必须 ICP 备案**才能在国内提供服务（这是国内法规要求）。
- ❌ **"买便宜域名续费一样便宜"**：首年常 ¥10-¥30 优惠，**续费通常恢复到 ¥70+**。买之前看续费价。
- ❌ **"DNS 改了立刻生效"**：DNS 有缓存（TTL），通常 5 分钟到 24 小时才完全生效。
- ❌ **"用代理就不用买域名"**：vercel.app 子域名国内访问被干扰、品牌也不专业。**正式上线一定要自己域名**。
- ❌ **"备案就是给政府交钱"**：备案免费，但需要提交资料（身份证、营业执照、网站说明），通常 5-20 个工作日。

## 延伸阅读

### 📺 视频教程
- [DNS 原理入门 (YouTube)](https://www.youtube.com/watch?v=dl-C6cBF93s) `[英 · ⭐ · 免费 · 2024 · 8min]` DNS 工作原理动画解释
- [域名购买与配置实战 (B站)](https://www.bilibili.com/video/BV1ZM4m1y7Pm) `[中 · ⭐⭐ · 免费 · 2024 · 15min]` 从购买到解析完整流程
- [Cloudflare DNS 配置教程 (YouTube)](https://www.youtube.com/watch?v=dU-xk852pvk) `[英 · ⭐⭐ · 免费 · 2024 · 12min]` Cloudflare 作为 DNS 管理

### 📰 文章
- [Cloudflare Domains](https://www.cloudflare.com/products/registrar/) `[英 · ⭐ · 成本价 · 持续更新]`
- [Namecheap](https://namecheap.com) `[英 · ⭐ · 持续更新]`
- [Porkbun](https://porkbun.com) `[英 · ⭐ · 持续更新]`
- [阿里云万网](https://wanwang.aliyun.com) `[中 · ⭐ · 持续更新]`
- [Cloudflare DNS 文档](https://developers.cloudflare.com/dns/) `[英 · ⭐⭐ · 免费 · 持续更新]`
- [MDN DNS 入门（中文）](https://developer.mozilla.org/zh-CN/docs/Glossary/DNS) `[中 · ⭐ · 免费 · 常青]`
- G-01 Vercel · G-13 SSL/HTTPS + Git

## 去问 AI
> 「我刚在 Namecheap 买了 myapp.com，要绑到 Vercel 部署的项目。请教我一步步：(1) Vercel 那边怎么加；(2) Namecheap DNS 控制台怎么加 A 和 CNAME；(3) 等多久能访问；(4) 怎么验证 HTTPS 自动签发成功了。」

---
**来源**：① Cloudflare / Namecheap / Porkbun 官方页  ② MDN DNS
**查询日期**：2026-06-23 · **数据来源时间**：常青
