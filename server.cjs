// Local dev server for KAIZHANG
// - serves static files from this folder
// - proxies /api/chat to Volcengine Ark OpenAI-compatible endpoint
// Run: node server.cjs

const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const ROOT = __dirname;
const PORT = Number(process.env.PORT || 5174);

// Optional local env loader. Do NOT commit .env.local.
const localEnv = path.join(ROOT, '.env.local');
if (fs.existsSync(localEnv)) {
  const lines = fs.readFileSync(localEnv, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
  }
}

const ARK_API_KEY = process.env.ARK_API_KEY;
const ARK_BASE_URL = (process.env.ARK_BASE_URL || 'https://ark.cn-beijing.volces.com/api/coding/v3').replace(/\/$/, '');
const ARK_MODEL = process.env.ARK_MODEL || 'ark-code-latest';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
};

function send(res, status, body, headers = {}) {
  res.writeHead(status, headers);
  res.end(body);
}

function safePath(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0]);
  const fp = path.join(ROOT, clean === '/' ? 'index.html' : clean);
  const rel = path.relative(ROOT, fp);
  if (rel.startsWith('..') || path.isAbsolute(rel)) return null;
  return fp;
}

async function proxyChat(req, res) {
  if (req.method === 'OPTIONS') {
    return send(res, 204, '', {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    });
  }
  if (req.method !== 'POST') return send(res, 405, 'Method Not Allowed');
  if (!ARK_API_KEY) {
    return send(res, 500, JSON.stringify({ error: 'Missing ARK_API_KEY. Create .env.local or set environment variable.' }), {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    });
  }

  let raw = '';
  req.on('data', chunk => { raw += chunk; });
  req.on('end', async () => {
    let body;
    try { body = raw ? JSON.parse(raw) : {}; }
    catch { return send(res, 400, JSON.stringify({ error: 'Bad JSON' }), { 'Content-Type': 'application/json' }); }

    const payload = {
      model: ARK_MODEL,
      messages: body.messages || [],
      stream: body.stream !== false,
      temperature: typeof body.temperature === 'number' ? body.temperature : 0.7,
    };

    try {
      const upstream = await fetch(`${ARK_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ARK_API_KEY}`,
        },
        body: JSON.stringify(payload),
      });

      if (!upstream.ok) {
        const text = await upstream.text().catch(() => '');
        return send(res, upstream.status, JSON.stringify({ error: 'Upstream error', status: upstream.status, body: text.slice(0, 1000) }), {
          'Content-Type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
        });
      }

      res.writeHead(200, {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no',
        'Access-Control-Allow-Origin': '*',
      });

      const reader = upstream.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(Buffer.from(value));
      }
      res.end();
    } catch (e) {
      send(res, 502, JSON.stringify({ error: 'Proxy fetch failed', detail: String(e && e.message || e) }), {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      });
    }
  });
}

const server = http.createServer(async (req, res) => {
  const u = new URL(req.url, `http://${req.headers.host}`);
  if (u.pathname === '/api/chat') return proxyChat(req, res);

  const fp = safePath(u.pathname);
  if (!fp) return send(res, 403, 'Forbidden');
  fs.stat(fp, (err, st) => {
    if (err || !st.isFile()) return send(res, 404, 'Not Found');
    const ext = path.extname(fp).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=60',
    });
    fs.createReadStream(fp).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`KAIZHANG local server: http://localhost:${PORT}`);
  console.log(`Proxying /api/chat -> ${ARK_BASE_URL}/chat/completions (${ARK_MODEL})`);
});
