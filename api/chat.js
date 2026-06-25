// /api/chat — Vercel Serverless Function
// 把前端发来的 OpenAI-compat 请求 streaming 转发给火山方舟 codingplan
//
// 环境变量（在 Vercel Project Settings → Environment Variables 配置）：
//   ARK_API_KEY = ark-xxxxxxxx-...
//   ARK_BASE_URL = https://ark.cn-beijing.volces.com/api/coding/v3   (可选，默认这个)
//   ARK_MODEL    = ark-code-latest                                   (可选，默认这个)
//
// 注意：不要把 key 写进代码 / 提交到 git。

export const config = { runtime: 'edge' };

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const apiKey = process.env.ARK_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Missing ARK_API_KEY env var on Vercel' }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    });
  }

  const base = (process.env.ARK_BASE_URL || 'https://ark.cn-beijing.volces.com/api/coding/v3').replace(/\/$/, '');
  const model = process.env.ARK_MODEL || 'ark-code-latest';

  let body;
  try { body = await req.json(); }
  catch { return new Response('Bad JSON', { status: 400 }); }

  // 透传 messages / stream，强制使用环境变量里的 model（前端无法越权）
  const payload = {
    model,
    messages: body.messages || [],
    stream: body.stream !== false,
    temperature: typeof body.temperature === 'number' ? body.temperature : 0.7,
  };

  let upstream;
  try {
    upstream = await fetch(`${base}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Upstream fetch failed', detail: String(e) }), {
      status: 502, headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!upstream.ok) {
    const text = await upstream.text().catch(() => '');
    return new Response(JSON.stringify({ error: 'Upstream error', status: upstream.status, body: text.slice(0, 400) }), {
      status: upstream.status,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // 直接把 SSE 流透传给前端
  const headers = new Headers({
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache, no-transform',
    'Connection': 'keep-alive',
    'X-Accel-Buffering': 'no',
  });

  return new Response(upstream.body, { status: 200, headers });
}
