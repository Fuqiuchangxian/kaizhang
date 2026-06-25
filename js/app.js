// ========================================================================
// 开张 KAIZHANG · 前端入口
// 纯前端：localStorage 存笔记 / 积分 / 历史对话；
// AI 调用走 /api/chat 中转（Vercel 环境变量保 key）
// ========================================================================

import { PHASES, CARDS, GROUPS, PRESET_BUTTONS, ALMANAC_POOL } from './manifest.js';
import { SQUARE_SEEDS, TAG_ICONS, TYPE_OPTIONS, STATUS_OPTIONS, PROMO_OPTIONS } from './square-data.js';
import { SKILLS, SKILL_CATEGORIES } from './skills-data.js';
import { CARD_RESOURCES, GENERIC_ASK_PRESETS } from './card-resources.js';

// ---------- 工具函数 ----------
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const html = (s) => { const t = document.createElement('template'); t.innerHTML = s.trim(); return t.content.firstElementChild; };
const escapeHtml = s => (s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const seededRand = (seed) => {
  let s = 0; for (const c of seed) s = (s * 31 + c.charCodeAt(0)) >>> 0;
  return () => { s = (s * 1103515245 + 12345) >>> 0; return (s % 100000) / 100000; };
};
const todayStr = () => new Date().toISOString().slice(0, 10);

// ---------- 状态 ----------
const State = {
  route: 'learn',
  cardId: null,
  phaseId: 'P0',
  user: null,                 // { name, code }
  notes: [],
  points: 0,
  history: [],                // [{id, title, ts, messages:[{role,content,attachments}]}]
  currentChatId: null,
  spicy: false,
  worksLocal: [],             // 本地发布
  doneCards: [],              // 已读
  doneCheckpoints: [],        // phase id
};

// localStorage helpers
const LS_KEY = 'kaizhang.state.v1';
function loadState() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) Object.assign(State, JSON.parse(raw));
  } catch {}
  if (typeof State.points !== 'number' || State.points < 30) State.points = Math.max(State.points || 0, 120);
  if (!State.history?.length) {
    State.history = [{ id: 'main', title: '主对话', ts: Date.now(), messages: [] }];
    State.currentChatId = 'main';
  }
}
function saveState() {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify({
      user: State.user, notes: State.notes, points: State.points,
      history: State.history, spicy: State.spicy, worksLocal: State.worksLocal,
      doneCards: State.doneCards, doneCheckpoints: State.doneCheckpoints,
      phaseId: State.phaseId,
    }));
  } catch {}
}

// ---------- Toast ----------
function toast(msg, type = 'ok', timeout = 1800) {
  const stack = $('#toastStack');
  const t = html(`<div class="toast ${type}">
    <span class="ico">${ICONS[type] || ICONS.ok}</span>
    <span>${escapeHtml(msg)}</span>
  </div>`);
  stack.appendChild(t);
  setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 250); }, timeout);
}
const ICONS = {
  ok:   '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><polyline points="20 6 9 17 4 12"/></svg>',
  warn: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M12 2 1 21h22z"/><line x1="12" y1="9" x2="12" y2="13"/><circle cx="12" cy="17" r="1" fill="currentColor"/></svg>',
  err:  '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
};

// ---------- Time on dock ----------
function tickDock() {
  const d = new Date();
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  $('#dockTime').textContent = `${hh}:${mm}`;
}
setInterval(tickDock, 30 * 1000);

// ---------- SVG icons for phase / preset ----------
const PHASE_SVG = {
  plot:     '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 17h18"/><path d="M5 17l1-3h12l1 3"/><circle cx="9" cy="11" r="1.2" fill="currentColor"/><circle cx="15" cy="11" r="1.2" fill="currentColor"/></svg>',
  sign:     '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h12l2 3-2 3H4z"/><line x1="10" y1="10" x2="10" y2="20"/><line x1="6" y1="20" x2="14" y2="20"/></svg>',
  paint:    '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 19h12"/><path d="M6 16c0-4 3-6 6-6s6 2 6 6"/><circle cx="9" cy="8" r="1.5"/><circle cx="14" cy="6" r="1.5"/></svg>',
  door:     '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="3" width="12" height="18"/><circle cx="14" cy="12" r=".8" fill="currentColor"/></svg>',
  tools:    '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-6 6 2 2 6-6a4 4 0 0 0 5.4-5.4l-2 2-1.4-1.4 2-2z"/></svg>',
  lantern:  '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="12" rx="6" ry="7"/><line x1="12" y1="3" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><path d="M8 9c0 4 8 4 8 0"/></svg>',
  firework: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1.5" fill="currentColor"/><line x1="12" y1="3" x2="12" y2="7"/><line x1="12" y1="17" x2="12" y2="21"/><line x1="3" y1="12" x2="7" y2="12"/><line x1="17" y1="12" x2="21" y2="12"/><line x1="5.6" y1="5.6" x2="8.5" y2="8.5"/><line x1="15.5" y1="15.5" x2="18.4" y2="18.4"/><line x1="5.6" y1="18.4" x2="8.5" y2="15.5"/><line x1="15.5" y1="8.5" x2="18.4" y2="5.6"/></svg>',
};

// 八大分组 logo（替换 A/B/C/... 字母）
const GROUP_ICONS = {
  A: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="8" stroke-dasharray="2 3"/></svg>',
  B: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C7 2 4 6 4 10c0 3 1.5 5.5 4 7v3h8v-3c2.5-1.5 4-4 4-7 0-4-3-8-8-8z"/><line x1="9" y1="22" x2="15" y2="22"/></svg>',
  C: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  D: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><circle cx="5" cy="5" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><line x1="7" y1="7" x2="10" y2="10"/><line x1="17" y1="7" x2="14" y2="10"/></svg>',
  E: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="14" rx="2"/><line x1="3" y1="8" x2="21" y2="8"/><line x1="8" y1="22" x2="16" y2="22"/></svg>',
  F: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 2 4 3 8 3s8-1 8-3V6"/><path d="M4 12v6c0 2 4 3 8 3s8-1 8-3v-6"/></svg>',
  G: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12h4l3-9 6 18 3-9h4"/></svg>',
  H: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11l9-7 9 7v9a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2z"/></svg>',
};
const PRESET_SVG = {
  sprout:  '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21v-7"/><path d="M12 14c-2-3-6-3-6-6 3 0 5 1 6 4"/><path d="M12 14c2-3 6-3 6-6-3 0-5 1-6 4"/></svg>',
  book:    '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h6a3 3 0 0 1 3 3v13"/><path d="M20 4h-6a3 3 0 0 0-3 3v13"/></svg>',
  idea:    '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 13l1 3h6l1-3a7 7 0 0 0-4-13z"/></svg>',
  broadcast:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 13v-2l10-5v12L4 13z"/><path d="M14 8c3 0 5 2 5 4s-2 4-5 4"/><path d="M7 14l2 6h3l-2-5"/></svg>',
  rocket:  '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 13s2-9 9-10c-1 7-10 9-10 9z"/><path d="M14 6a3 3 0 0 1 4 4"/><path d="M9 14l1 5 5 1z"/></svg>',
  compass: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><polygon points="16 8 14 14 8 16 10 10" fill="currentColor"/></svg>',
};

// ============================================================
//  视图层 · 各路由
// ============================================================

function renderWelcome() {
  $$('.wtab').forEach(t => t.classList.toggle('active', t.dataset.route === 'welcome'));
  const row = $('#presetRow');
  row.innerHTML = '';
  PRESET_BUTTONS.forEach(b => {
    const btn = html(`<button type="button" class="preset-btn ${b.tone === 'primary' ? 'primary' : ''}" data-id="${b.id}">
      <span class="ico">${PRESET_SVG[b.icon] || ''}</span>
      <span>${b.label}</span>
    </button>`);
    btn.addEventListener('click', () => onPreset(b));
    row.appendChild(btn);
  });

  // Greeting variant if returning
  if (State.history.some(h => h.messages.length > 0) || State.doneCards.length) {
    $('#welcomeTip').textContent = `欢迎回来，已读 ${State.doneCards.length} 张卡 · 你上次在 ${State.phaseId}。回车继续，或点 "▶ 继续上次"。`;
    // Replace first preset
    const firstBtn = row.querySelector('.preset-btn');
    if (firstBtn) {
      firstBtn.innerHTML = `<span class="ico">${PRESET_SVG.sprout}</span><span>▶ 继续上次：${State.phaseId}</span>`;
    }
  }
}

function onPreset(btn) {
  if (btn.action === 'goto-phase-0') {
    State.phaseId = State.phaseId || 'P0';
    enterWorkbench('learn');
  } else if (btn.action === 'goto-square') {
    enterWorkbench('square');
  } else if (btn.action === 'ai-prefill') {
    $('#welcomeInput').value = btn.prefill;
    $('#welcomeInput').focus();
  }
}

// ============================================================
//  进入工作台
// ============================================================
function enterWorkbench(route = 'learn') {
  if (route === 'welcome') {
    $('#route-work').hidden = true;
    $('#route-welcome').hidden = false;
    State.route = 'welcome';
    $$('.wtab').forEach(t => t.classList.toggle('active', t.dataset.route === 'welcome'));
    renderWelcome();
    return;
  }
  $('#route-welcome').hidden = true;
  $('#route-work').hidden = false;
  switchRoute(route);
  try { renderAIThread(); } catch (e) { console.error(e); }
}

function switchRoute(route) {
  if (route === 'welcome') return enterWorkbench('welcome');
  State.route = route;
  State.squareDetailId = null;   // 切换主路由时清掉广场详情态
  State.skillDetailId = null;
  $$('.wtab').forEach(t => t.classList.toggle('active', t.dataset.route === route));
  renderLeft();
  renderCenter();
  try { renderAIThread(); } catch (e) { console.error(e); }
  $('#statusCenter').textContent = ({
    learn: '学习路径 · 边学边问边归档',
    skills: '工具箱 · AgentSkills / MCP / Prompt / Rules',
    square: '发布广场 · 让世界看到你的作品',
    me: '我的空间 · 笔记 / 作品 / 积分',
  })[route];
}

// ============================================================
//  左栏渲染
// ============================================================
function renderLeft() {
  const scroll = $('#leftScroll');
  const title = $('#leftTitle');
  scroll.innerHTML = '';

  if (State.route === 'learn') {
    title.textContent = '学习路径';
    PHASES.forEach(p => {
      const totalCards = p.cards.length;
      const doneCount = p.cards.filter(c => State.doneCards.includes(c)).length;
      const node = html(`
        <div class="phase-item ${p.id === State.phaseId ? 'active' : ''}" data-pid="${p.id}">
          <div class="phase-icon">${PHASE_SVG[p.icon] || ''}</div>
          <div class="phase-meta">
            <div class="pname"><span class="px">${p.id}</span> ${p.name}</div>
            <div class="pdesc">${p.goal}</div>
            ${State.doneCheckpoints.includes(p.id) ? '<div class="pcheck">✓ 已通关</div>' : ''}
          </div>
        </div>`);
      node.addEventListener('click', () => {
        State.phaseId = p.id;
        State.cardId = null;
        State.phaseDetail = p.id;   // 直接进 Phase 详情页
        saveState();
        renderLeft(); renderCenter();
      });
      scroll.appendChild(node);

      if (p.id === State.phaseId) {
        const list = html('<div class="phase-cards"></div>');
        p.cards.forEach(cid => {
          const c = CARDS.find(x => x.id === cid);
          if (!c) return;
          const item = html(`
            <div class="card-item ${c.id === State.cardId ? 'active' : ''} ${State.doneCards.includes(c.id) ? 'done' : ''}" data-cid="${c.id}">
              <span class="card-name">${c.id} · ${escapeHtml(c.title)}</span>
              <span class="card-diff">${'⭐'.repeat(c.diff)}</span>
            </div>`);
          item.addEventListener('click', () => openCard(c.id));
          list.appendChild(item);
        });
        scroll.appendChild(list);
      }
    });

    // 全部分组（可记忆展开状态）
    State.openGroups = State.openGroups || {};
    const allWrap = html('<div class="group-list"></div>');
    allWrap.appendChild(html('<div style="margin-top:18px;padding:0 8px;font-size:11px;color:var(--text-3);letter-spacing:.12em;text-transform:uppercase;">全部分组 · 80 张卡</div>'));
    GROUPS.forEach(g => {
      const cards = CARDS.filter(c => c.group === g.id);
      const isOpen = !!State.openGroups[g.id];
      const sec = html(`<div class="group-section ${isOpen ? 'open' : ''}" data-gid="${g.id}">
        <div class="group-head">
          <div class="gtag" style="color:${g.color}">${GROUP_ICONS[g.id] || ''}</div>
          <div style="flex:1;min-width:0">
            <div class="gname">${escapeHtml(g.name)}</div>
            <div class="gdesc">${escapeHtml(g.desc)} · ${cards.length} 张</div>
          </div>
          <svg class="g-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" style="transform:rotate(${isOpen ? '90deg' : '0'});transition:transform .2s var(--easing);color:var(--text-3)"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
        <div class="group-cards"></div>
      </div>`);
      const cardsBox = sec.querySelector('.group-cards');
      cards.forEach(c => {
        const it = html(`<div class="card-item ${c.id === State.cardId ? 'active' : ''} ${State.doneCards.includes(c.id) ? 'done' : ''}" data-cid="${c.id}">
          <span class="card-name">${c.id} · ${escapeHtml(c.title)}</span>
          <span class="card-diff">${'⭐'.repeat(c.diff)}</span>
        </div>`);
        it.addEventListener('click', (ev) => { ev.stopPropagation(); openCard(c.id); });
        cardsBox.appendChild(it);
      });
      sec.querySelector('.group-head').addEventListener('click', () => {
        State.openGroups[g.id] = !State.openGroups[g.id];
        sec.classList.toggle('open');
        const chev = sec.querySelector('.g-chevron');
        if (chev) chev.style.transform = State.openGroups[g.id] ? 'rotate(90deg)' : 'rotate(0deg)';
      });
      allWrap.appendChild(sec);
    });
    scroll.appendChild(allWrap);

  } else if (State.route === 'skills') {
    title.textContent = '工具箱';
    const cats = SKILL_CATEGORIES;
    const intro = html(`<div class="phase-item ${!State.skillCat && !State.skillDetailId ? 'active' : ''}" data-cat="intro">
      <div class="phase-icon" style="color:var(--primary-2)">${ICONS_SKILL.skill}</div>
      <div class="phase-meta"><div class="pname">工具箱介绍</div><div class="pdesc">AgentSkills / MCP / Prompt 的区别</div></div>
    </div>`);
    intro.addEventListener('click', () => { State.skillCat = null; State.skillDetailId = null; renderLeft(); renderCenter(); });
    scroll.appendChild(intro);
    cats.forEach(cat => {
      const count = SKILLS.filter(s => s.cat === cat.id).length;
      const item = html(`<div class="phase-item ${State.skillCat === cat.id ? 'active' : ''}" data-cat="${cat.id}">
        <div class="phase-icon" style="color:${cat.color}">${ICONS_SKILL[cat.icon] || PHASE_SVG.tools}</div>
        <div class="phase-meta">
          <div class="pname">${escapeHtml(cat.name)}</div>
          <div class="pdesc">${count} 件资产 · ${escapeHtml(cat.short || cat.name)}</div>
        </div>
      </div>`);
      item.addEventListener('click', () => {
        State.skillCat = cat.id;
        State.skillDetailId = null;
        renderLeft(); renderCenter();
      });
      scroll.appendChild(item);
    });

  } else if (State.route === 'square') {
    title.textContent = '发布广场';
    const navs = [
      { id:'feed', label:'广场首页', desc:'看大家发布了什么', icon:'square' },
      { id:'publish', label:'发布作品', desc:'消耗积分，触发开张大吉', icon:'rocket' },
      { id:'mine', label:'我的作品', desc:'本地发布记录', icon:'user' },
    ];
    const ICON_NAV = {
      square:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',
      rocket:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19V5a2 2 0 0 1 2-2h9l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><polyline points="14 3 14 9 20 9"/><path d="M12 17V11"/><polyline points="9 14 12 11 15 14"/></svg>',
      user:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a8 8 0 0 1 16 0v1"/></svg>',
    };
    navs.forEach(n => {
      const active = (State.squareMode || 'feed') === n.id;
      const it = html(`<div class="phase-item ${active ? 'active' : ''}">
        <div class="phase-icon">${ICON_NAV[n.icon]}</div>
        <div class="phase-meta"><div class="pname">${n.label}</div><div class="pdesc">${n.desc}</div></div>
      </div>`);
      it.addEventListener('click', () => {
        if (n.id === 'publish') return openPublish();
        State.squareMode = n.id;
        State.squareDetailId = null;
        renderLeft(); renderCenter();
      });
      scroll.appendChild(it);
    });

  } else if (State.route === 'me') {
    title.textContent = '个人';
    const summary = html(`<div style="padding:12px;color:var(--text-2);font-size:12px;line-height:1.7">
      <div style="font-size:13px;color:var(--text-1);margin-bottom:4px">${State.user ? escapeHtml(State.user.name) : '未登录'}</div>
      <div>笔记 ${State.notes.length} · 作品 ${State.worksLocal.length} · 积分 ${State.points}</div>
    </div>`);
    scroll.appendChild(summary);
    if (!State.user) return;
    const actions = [
      { label:'写一条笔记', cb:()=>openNoteModal() },
      { label:'发布作品', cb:()=>openPublish() },
      { label:'导出笔记', cb:()=>exportNotes() },
      { label:'设置', cb:()=>{ State.meTab='settings'; renderCenter(); } },
    ];
    actions.forEach(a=>{
      const it=html(`<div class="phase-item"><div class="phase-meta"><div class="pname">${a.label}</div></div></div>`);
      it.addEventListener('click', a.cb);
      scroll.appendChild(it);
    });
  }
}

const ICONS_SKILL = {
  skill:    '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v12H8l-4 4z"/><path d="M8 8h8M8 12h5"/></svg>',
  prompt:   '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v12H8l-4 4z"/></svg>',
  rules:    '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 4h14v16H5z"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/></svg>',
  mcp:      '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><circle cx="5" cy="5" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><line x1="7" y1="7" x2="10" y2="10"/><line x1="17" y1="7" x2="14" y2="10"/><line x1="7" y1="17" x2="10" y2="14"/><line x1="17" y1="17" x2="14" y2="14"/></svg>',
  template: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="9" x2="9" y2="21"/></svg>',
  workflow: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="12" cy="18" r="3"/><line x1="6" y1="9" x2="12" y2="15"/><line x1="18" y1="9" x2="12" y2="15"/></svg>',
  loop:     '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><polyline points="21 3 21 8 16 8"/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>',
  harness:  '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><line x1="4" y1="10" x2="20" y2="10"/><line x1="10" y1="4" x2="10" y2="20"/><circle cx="15" cy="15" r="2" fill="currentColor"/></svg>',
};

// ============================================================
//  中栏渲染
// ============================================================
async function renderCenter() {
  const scroll = $('#centerScroll');
  const head = $('#centerHead');
  scroll.innerHTML = '';
  head.style.display = 'flex';
  // Clean up floating FAB/pop from previous detail page
  document.querySelectorAll('.ask-fab, .ask-pop').forEach(n => n.remove());

  if (State.route === 'learn') {
    if (State.cardId) {
      await renderCardDetail(State.cardId);
    } else {
      renderPhaseIndex(State.phaseId);
    }
  } else if (State.route === 'skills') {
    renderSkillsHome();
  } else if (State.route === 'square') {
    renderSquare();
  } else if (State.route === 'me') {
    renderMe();
  }
}

// ----- 学习路径首页（旅程图） -----
function renderPhaseIndex(pid) {
  // 路由分流：被点过具体 phase → 详情页；否则 → 学习路径首页
  if (State.phaseDetail) return renderPhaseDetail(State.phaseDetail);

  const current = PHASES.find(x => x.id === pid) || PHASES[0];
  const scroll = $('#centerScroll');
  $('#crumbs').innerHTML = `学习路径 · <b>从上到下走完 7 个阶段</b>`;

  const wrap = html(`<div class="vertical-path">
    <header class="vp-hero">
      <div class="vp-kicker">LEARNING PATH</div>
      <h2>从 0 到第一个 AI 产品</h2>
      <p>学习路径是推荐主线：按阶段从上到下推进；全部分组是资料索引：按主题快速查卡片。新手优先走学习路径，查资料再用全部分组。</p>
    </header>
    <div class="vp-explain">
      <div><b>学习路径</b><span>按顺序学：Phase 0 → 6，每阶段有检查点。</span></div>
      <div><b>全部分组</b><span>按主题找：AI 基础 / 模型 / 工具 / MCP / 前端 / 后端 / 部署 / 宣发。</span></div>
    </div>
    <div class="vp-list kz-stagger" id="vpList"></div>
  </div>`);
  const list = wrap.querySelector('#vpList');

  PHASES.forEach((ph, i) => {
    const totalCards = ph.cards.length;
    const doneCount = ph.cards.filter(c => State.doneCards.includes(c)).length;
    const pct = totalCards ? Math.round(doneCount / totalCards * 100) : 0;
    const done = State.doneCheckpoints.includes(ph.id);
    const node = html(`<button class="vp-node ${ph.id === current.id ? 'active' : ''} ${done ? 'done' : ''}" data-pid="${ph.id}">
      <span class="vp-index">${String(i + 1).padStart(2, '0')}</span>
      <span class="vp-main">
        <span class="vp-meta">${ph.id} · ${done ? '已通关' : (pct ? pct + '% 进度' : '未开始')} · ${doneCount}/${totalCards} 张</span>
        <span class="vp-title">${escapeHtml(ph.name)}</span>
        <span class="vp-goal">${escapeHtml(ph.goal)}</span>
        <span class="vp-progress"><i style="width:${pct}%"></i></span>
      </span>
    </button>`);
    node.addEventListener('click', () => {
      State.phaseId = ph.id;
      State.phaseDetail = ph.id;
      State.cardId = null;
      renderLeft(); renderCenter();
    });
    list.appendChild(node);
  });

  scroll.appendChild(wrap);
}

// ====== Phase 详情页（点旅程节点后进入） ======
function renderPhaseDetail(pid) {
  const p = PHASES.find(x => x.id === pid);
  if (!p) { State.phaseDetail = null; return renderPhaseIndex(State.phaseId); }
  const scroll = $('#centerScroll');
  scroll.innerHTML = '';
  $('#crumbs').innerHTML = `学习路径 · 开张地图 · <b>${p.id} · ${escapeHtml(p.name)}</b>`;

  const totalCards = p.cards.length;
  const doneCount = p.cards.filter(c => State.doneCards.includes(c)).length;
  const pct = totalCards ? Math.round(doneCount / totalCards * 100) : 0;
  const cpDone = State.doneCheckpoints.includes(p.id);

  const wrap = html(`<div class="phase-detail">
    <div class="pd-back"><button class="btn-ghost mini" id="pdBack">← 回开张地图</button></div>
    <header class="pd-hero">
      <div class="pd-id">${p.id} · 学完你能做什么</div>
      <h2 class="pd-title"><span class="pdi">${PHASE_SVG[p.icon] || ''}</span>${escapeHtml(p.name)}</h2>
      <div class="pd-goal">${escapeHtml(p.goal)}</div>
      <div class="pd-prog">
        <div class="bar"><i style="width:${pct}%"></i></div>
        <span>${doneCount}/${totalCards} 张已读 · ${pct}%</span>
        ${cpDone ? '<span style="color:var(--ok)">✓ 检查点已完成</span>' : ''}
      </div>
    </header>

    <h3 class="pd-section">这一阶段的知识卡片（${totalCards}）</h3>
    <div class="pd-cards kz-stagger" id="pdCards"></div>

    <h3 class="pd-section">动手检查点 · ${p.id}</h3>
    <div class="checkpoint-card">
      <h4>${escapeHtml(p.checkpoint)}</h4>
      <div class="cp-actions">
        <button class="btn-primary mini" id="cpDone2">${cpDone ? '已通关 · 重做一次' : '标记完成 · 归档为笔记'}</button>
        <button class="btn-ghost mini" id="cpAsk2">让 AI 帮我做</button>
      </div>
    </div>
  </div>`);
  scroll.appendChild(wrap);

  const cards = wrap.querySelector('#pdCards');
  p.cards.forEach((cid, i) => {
    const c = CARDS.find(x => x.id === cid);
    if (!c) return;
    const done = State.doneCards.includes(c.id);
    const item = html(`<div class="pd-card ${done ? 'done' : ''}" data-cid="${c.id}">
      <div class="pdc-num">${done ? '✓' : String(i+1).padStart(2,'0')}</div>
      <div style="flex:1;min-width:0">
        <div class="pdc-id">${c.id}</div>
        <div class="pdc-title">${escapeHtml(c.title)}</div>
        <div class="pdc-diff">${'⭐'.repeat(c.diff)}</div>
      </div>
    </div>`);
    item.addEventListener('click', () => openCard(c.id));
    cards.appendChild(item);
  });

  wrap.querySelector('#pdBack').addEventListener('click', () => { State.phaseDetail = null; renderCenter(); });
  wrap.querySelector('#cpDone2').addEventListener('click', () => {
    if (!State.doneCheckpoints.includes(p.id)) State.doneCheckpoints.push(p.id);
    addNote({ title: `${p.id} 检查点 · ${p.name}`, content: p.checkpoint, source: p.id });
    saveState(); renderLeft(); renderCenter();
    toast(`${p.id} 阶段通关`, 'ok');
  });
  wrap.querySelector('#cpAsk2').addEventListener('click', () => askAI(`请把 ${p.id} 的动手检查点拆成 5 步：${p.checkpoint}`));
}

// 卡片悬浮 3D 倾斜（微交互）
function tiltCard(e) {
  const r = this.getBoundingClientRect();
  const mx = ((e.clientX - r.left) / r.width) * 100;
  const my = ((e.clientY - r.top) / r.height) * 100;
  this.style.setProperty('--mx', mx + '%');
  this.style.setProperty('--my', my + '%');
}
function resetTilt() {
  this.style.removeProperty('--mx');
  this.style.removeProperty('--my');
}


function videoIdFromUrl(url) {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtu.be')) return { platform:'yt', id:u.pathname.slice(1) };
    if (u.hostname.includes('youtube.com')) return { platform:'yt', id:u.searchParams.get('v') || (u.pathname.split('/embed/')[1] || '') };
    if (u.hostname.includes('bilibili.com')) {
      const m = u.href.match(/BV[0-9A-Za-z]+/);
      return { platform:'bilibili', id:m ? m[0] : '' };
    }
  } catch {}
  return { platform:'link', id:'' };
}

function parseVideoResourcesFromMarkdown(md) {
  const out = [];
  const lines = md.split('\n');
  let inVideo = false;
  for (const line of lines) {
    if (/^###\s*.*视频/.test(line)) { inVideo = true; continue; }
    if (inVideo && /^###\s+/.test(line)) break;
    if (!inVideo) continue;
    const m = line.match(/^-\s*\[([^\]]+)\]\(([^)]+)\)\s*(?:`\[([^`]+)\]`)?\s*(.*)$/);
    if (!m) continue;
    const [, title, url, meta='', why=''] = m;
    const vi = videoIdFromUrl(url);
    if (!vi.id || vi.platform === 'link') continue;
    const parts = meta.split('·').map(x => x.trim());
    out.push({ platform: vi.platform, id: vi.id, title, url, lang: parts[0] || '', dur: parts.find(x=>/min|分钟|h/.test(x)) || '', year: (parts.find(x=>/^20\d{2}/.test(x)) || ''), by:'', why: why || '' });
  }
  return out;
}

// ----- 知识卡片详情 -----
async function renderCardDetail(cardId) {
  const c = CARDS.find(x => x.id === cardId);
  if (!c) return;
  const scroll = $('#centerScroll');
  $('#crumbs').innerHTML = `学习路径 · <b>${c.id}</b> · ${escapeHtml(c.title)}`;

  scroll.innerHTML = `<div style="padding:60px;text-align:center;color:var(--text-3)">加载中…</div>`;

  let raw;
  try {
    const res = await fetch(`./content/01-cards/${c.path}`);
    if (!res.ok) throw new Error(res.status);
    raw = await res.text();
  } catch (e) {
    scroll.innerHTML = `<div class="prose" style="padding:40px"><h2>加载失败</h2><p>无法读取卡片：${c.path}</p><p style="color:var(--text-3)">${escapeHtml(String(e))}</p></div>`;
    return;
  }

  const { frontmatter, body } = parseFrontmatter(raw);
  const mdVideos = parseVideoResourcesFromMarkdown(body);

  // 七段式解析 ---
  const sections = splitSections(body);
  // sections = [{ heading, content }]

  // 找资源
  const baseRes = CARD_RESOURCES[c.id] || {};
  const res = { ...baseRes, videos: [...(baseRes.videos || []), ...mdVideos] };
  const groupMeta = GROUPS.find(g => g.id === c.group);
  const groupColor = groupMeta?.color || '#3B82F6';

  // 构建 hero + tabs
  const wrap = html(`<div class="card-deck">
    <header class="card-hero" style="background:linear-gradient(135deg, ${groupColor}25, transparent 60%)">
      <div class="ch-id">${c.id} · ${escapeHtml(groupMeta?.name || '')}</div>
      <h1 class="ch-title">${escapeHtml(c.title)}</h1>
      ${res.summary ? `<p class="ch-summary">${escapeHtml(res.summary)}</p>` : ''}
      <div class="ch-meta">
        <span class="mb diff">难度 ${'★'.repeat(c.diff)}${'☆'.repeat(3 - c.diff)}</span>
        <span class="mb ok">${escapeHtml(frontmatter.status || '已核实')}</span>
        <span class="mb date">更新于 ${escapeHtml(frontmatter.last_updated || '2026-06')}</span>
      </div>
    </header>

    ${res.keyConcepts ? `
      <section class="ch-concepts">
        ${res.keyConcepts.map(k => `<div class="ch-concept">
          <div class="cc-term">${escapeHtml(k.term)}</div>
          <div class="cc-def">${escapeHtml(k.def)}</div>
        </div>`).join('')}
      </section>
    ` : ''}

    <nav class="card-tabs" id="cardTabs">
      <button class="ct active" data-tab="read">阅读</button>
      ${res.videos?.length ? `<button class="ct" data-tab="video">视频 (${res.videos.length})</button>` : ''}
    </nav>

    <section class="card-panel" id="ctPanel-read"></section>
    ${res.videos?.length ? '<section class="card-panel" id="ctPanel-video" hidden></section>' : ''}
  </div>`);
  scroll.innerHTML = '';
  scroll.appendChild(wrap);

  // ===== Tab: 阅读 — 七段式分卡片渲染 =====
  const read = $('#ctPanel-read');
  if (sections.length > 1) {
    sections.forEach((sec) => {
      const card = html(`<div class="prose section-card">
        <h3 class="sec-heading">${escapeHtml(sec.heading || '正文')}</h3>
        <div class="sec-body"></div>
      </div>`);
      const inner = card.querySelector('.sec-body');
      inner.innerHTML = marked.parse(preprocessMermaid(sec.content));
      // Code blocks copyable
      inner.querySelectorAll('pre').forEach(pre => {
        pre.style.position = 'relative';
        const btn = html('<button class="btn-ghost mini" style="position:absolute;right:8px;top:8px;font-size:10.5px">复制</button>');
        pre.appendChild(btn);
        btn.addEventListener('click', () => { navigator.clipboard.writeText(pre.querySelector('code')?.innerText || pre.innerText); toast('已复制', 'ok'); });
      });
      promoteAskAIQuote(inner);
      prettifyTables(inner);
      read.appendChild(card);
    });
  } else {
    // 没有分节，整体渲染
    const card = html(`<div class="prose section-card"></div>`);
    card.innerHTML = marked.parse(preprocessMermaid(body));
    promoteAskAIQuote(card);
    prettifyTables(card);
    read.appendChild(card);
  }
  // mermaid
  try { renderMermaidIn(read); } catch {}

  // ===== 浮动「问 AI」按钮 + 弹窗（替代内嵌区块） =====
  const presets = [...(res.askPresets || []), ...GENERIC_ASK_PRESETS.slice(0, Math.max(0, 4 - (res.askPresets?.length || 0)))];
  mountAskFab(presets, c.title);

  // ===== Tab: 视频 =====
  if (res.videos?.length) {
    const vp = $('#ctPanel-video');
    res.videos.forEach(v => {
      const src = v.platform === 'yt'
        ? `https://www.youtube-nocookie.com/embed/${v.id}`
        : `https://player.bilibili.com/player.html?bvid=${v.id}&autoplay=0&high_quality=1`;
      const card = html(`<div class="video-card">
        <div class="vc-frame">
          <iframe src="${src}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>
        </div>
        <div class="vc-body">
          <h5>${escapeHtml(v.title)}</h5>
          <div class="vc-meta">${escapeHtml(v.by || '')} · ${escapeHtml(v.lang || '')} · ${escapeHtml(v.dur || '')} · ${escapeHtml(String(v.year || ''))}</div>
          ${v.why ? `<p class="vc-why">${escapeHtml(v.why)}</p>` : ''}
        </div>
      </div>`);
      vp.appendChild(card);
    });
    vp.appendChild(html(`<p style="color:var(--text-3);font-size:11.5px;padding:8px 4px;text-align:center">视频来自第三方（YouTube / B 站），加载受所在网络影响</p>`));
  }

  // ===== Tabs 切换（只 read / video 二选一） =====
  $$('#cardTabs .ct').forEach(t => {
    t.addEventListener('click', () => {
      $$('#cardTabs .ct').forEach(x => x.classList.toggle('active', x === t));
      ['read','video'].forEach(name => {
        const p = $('#ctPanel-' + name);
        if (p) p.hidden = (name !== t.dataset.tab);
      });
    });
  });

  // 标记已读
  if (!State.doneCards.includes(c.id)) {
    State.doneCards.push(c.id);
    saveState();
    renderLeft();
  }

  // foot
  scroll.appendChild(html(`<div style="padding:24px 0 40px;display:flex;justify-content:space-between;color:var(--text-3);font-size:12px;">
    <span>选中正文文字 → 浮出工具条「问 AI / 归档」</span>
    <span>${c.id} · 数据来源：${escapeHtml(frontmatter.last_updated || '2026-06')}</span>
  </div>`));
}

// 把 markdown body 按 ## 标题切成段
function splitSections(md) {
  const lines = md.split('\n');
  const sections = [];
  let current = { heading: '', content: '' };
  for (const line of lines) {
    const m = line.match(/^##\s+(.+)$/);
    if (m) {
      if (current.heading || current.content.trim()) sections.push(current);
      current = { heading: m[1].trim(), content: '' };
    } else {
      current.content += line + '\n';
    }
  }
  if (current.heading || current.content.trim()) sections.push(current);
  // skip if very first one has no heading and is title-only
  if (sections[0] && !sections[0].heading && sections[0].content.match(/^#\s+/)) {
    sections[0].content = sections[0].content.replace(/^#\s+[^\n]+\n/, '');
  }
  return sections;
}

function parseFrontmatter(raw) {
  if (!raw.startsWith('---')) return { frontmatter: {}, body: raw };
  const end = raw.indexOf('\n---', 4);
  if (end < 0) return { frontmatter: {}, body: raw };
  const fm = raw.slice(4, end).trim();
  const body = raw.slice(end + 4).replace(/^\s*\n/, '');
  const frontmatter = {};
  fm.split('\n').forEach(line => {
    const i = line.indexOf(':');
    if (i > 0) frontmatter[line.slice(0,i).trim()] = line.slice(i+1).trim();
  });
  return { frontmatter, body };
}

// Mermaid 块在 marked 之前抽出来用占位符替换，避免被 HTML 转义把 `-->` 变成 `--&gt;`
function preprocessMermaid(md) {
  if (!md) return md;
  if (!window.__mermaidStash) window.__mermaidStash = {};
  return md.replace(/```mermaid\s*\n([\s\S]*?)```/g, (_, code) => {
    const id = 'MMD_' + Math.random().toString(36).slice(2, 9);
    window.__mermaidStash[id] = code.trim();
    return `\n\n<div class="mermaid" data-mmd="${id}"></div>\n\n`;
  });
}

// 把容器内的 mermaid 占位符填回真实代码，然后调用 mermaid.run
async function renderMermaidIn(container) {
  if (!window.mermaid || !window.__mermaidStash) return;
  const nodes = container.querySelectorAll('.mermaid[data-mmd]');
  if (!nodes.length) return;
  nodes.forEach(n => {
    const id = n.getAttribute('data-mmd');
    const src = window.__mermaidStash[id];
    if (src) n.textContent = src;          // textContent 保留 `<` `>` 原文
    n.removeAttribute('data-mmd');
    n.removeAttribute('data-processed');   // 让 mermaid 重新渲染
  });
  try { await window.mermaid.run({ nodes }); }
  catch (e) { console.warn('mermaid render', e); }
}

// 把宽表格转为卡片行（防止溢出 + 提升可读）
function prettifyTables(container) {
  container.querySelectorAll('table').forEach(table => {
    const headers = Array.from(table.querySelectorAll('thead th')).map(th => th.innerHTML.trim());
    const rows = Array.from(table.querySelectorAll('tbody tr'));
    if (!headers.length || !rows.length) {
      // 没 thead 时尝试用第一行
      const firstRow = table.querySelector('tr');
      if (firstRow && !table.querySelector('thead')) {
        firstRow.querySelectorAll('td,th').forEach(c => headers.push(c.innerHTML.trim()));
      }
    }
    // 大于 3 列 OR 列内容很长 → 转卡片
    const totalLen = headers.join('').length + rows.slice(0,3).map(r => r.textContent).join('').length;
    const wide = headers.length > 3 || totalLen > 220;
    if (!wide) return;

    const wrap = document.createElement('div');
    wrap.className = 'kz-table-cards';
    rows.forEach(tr => {
      const cells = Array.from(tr.querySelectorAll('td'));
      if (!cells.length) return;
      const card = document.createElement('div');
      card.className = 'kz-tcard';
      // 第一列作为标题
      const titleHTML = cells[0]?.innerHTML || '';
      const title = document.createElement('div');
      title.className = 'kz-tcard-title';
      title.innerHTML = titleHTML;
      card.appendChild(title);
      const grid = document.createElement('dl');
      grid.className = 'kz-tcard-grid';
      cells.slice(1).forEach((td, i) => {
        const k = headers[i + 1] || '';
        if (!td.innerHTML.trim()) return;
        const dt = document.createElement('dt'); dt.innerHTML = k;
        const dd = document.createElement('dd'); dd.innerHTML = td.innerHTML;
        grid.appendChild(dt); grid.appendChild(dd);
      });
      card.appendChild(grid);
      wrap.appendChild(card);
    });
    table.replaceWith(wrap);
  });
}

// 浮动「问 AI」按钮 + 弹出预设问题面板
function mountAskFab(presets, title) {
  // 先清掉旧的
  document.querySelectorAll('.ask-fab, .ask-pop').forEach(n => n.remove());
  if (!presets?.length) return;
  const fab = html(`<button class="ask-fab" title="问 AI">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
      <path d="M21 11.5a8.4 8.4 0 0 1-1 4L21 21l-5-1.5a8.5 8.5 0 1 1 5-8z"/>
    </svg>
  </button>`);
  const pop = html(`<div class="ask-pop" hidden>
    <div class="ask-pop-head">
      <span><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 11.5a8.4 8.4 0 0 1-1 4L21 21l-5-1.5a8.5 8.5 0 1 1 5-8z"/></svg> 问 AI · 关于「${escapeHtml(title || '')}」</span>
      <button class="ask-pop-x" aria-label="关闭">×</button>
    </div>
    <div class="ask-pop-body"></div>
  </div>`);
  const body = pop.querySelector('.ask-pop-body');
  presets.forEach(q => {
    const b = html(`<button class="ask-pop-item"><span class="apa">→</span>${escapeHtml(q)}</button>`);
    b.addEventListener('click', () => { askAI(q); pop.hidden = true; });
    body.appendChild(b);
  });
  // 自定义输入
  const customWrap = html(`<div class="ask-pop-custom">
    <input type="text" placeholder="或自定义问一句…" />
    <button class="btn-primary mini">发送</button>
  </div>`);
  const send = () => {
    const v = customWrap.querySelector('input').value.trim();
    if (!v) return;
    askAI(v); pop.hidden = true;
    customWrap.querySelector('input').value = '';
  };
  customWrap.querySelector('button').addEventListener('click', send);
  customWrap.querySelector('input').addEventListener('keydown', e => { if (e.key === 'Enter') send(); });
  body.appendChild(customWrap);

  pop.hidden = false; // 内容页默认展开
  fab.addEventListener('click', () => { pop.hidden = !pop.hidden; });
  pop.querySelector('.ask-pop-x').addEventListener('click', () => { pop.hidden = true; });

  // 挂到中间栏内，而不是整个窗口角落
  const host = document.querySelector('#colCenter');
  host.appendChild(fab);
  host.appendChild(pop);
}

function promoteAskAIQuote(container) {
  // Find h2 "去问 AI" then its sibling blockquote -> make clickable
  const heads = container.querySelectorAll('h2, h3');
  heads.forEach(h => {
    if (/去问\s*AI/.test(h.textContent)) {
      let next = h.nextElementSibling;
      while (next && next.tagName !== 'BLOCKQUOTE') next = next.nextElementSibling;
      if (next) {
        next.classList.add('ask-ai-quote');
        next.title = '点击：发到右侧 店小二';
        next.addEventListener('click', () => askAI(next.textContent.replace(/^\s*[「『"]?/, '').trim()));
      }
    }
  });
}

// ----- Skills 仓库首页 -----
function renderSkillsHome() {
  if (State.skillDetailId) return renderSkillDetail(State.skillDetailId);

  const scroll = $('#centerScroll');
  scroll.innerHTML = '';

  // ===== 落地页：没有选类目 → 显示介绍 + 类目大卡片 =====
  if (!State.skillCat) {
    $('#crumbs').innerHTML = `工具箱 · <b>${SKILLS.length} 件可复用资产</b> · AgentSkills / MCP / Prompt`;
    const land = html(`<div class="skill-landing">
      <header class="sl-hero">
        <div class="sl-bg"></div>
        <div class="sl-id">TOOLS · AgentSkills / MCP / Prompt</div>
        <h1>工具箱：不只是 Skills</h1>
        <p>这里不是把所有东西都叫 Skill：AgentSkills 是标准化任务能力包；MCP 是接工具的协议；Prompt / Rules / Workflow 是辅助资产。每件都能复制、下载或挂到 店小二。</p>
        <div class="sl-stats">
          <div><b>${SKILLS.length}</b><span>件资产</span></div>
          <div><b>${SKILL_CATEGORIES.length}</b><span>大类目</span></div>
          <div><b>3</b><span>种使用方式</span></div>
        </div>
        <p class="sl-tip">← 从左侧选一个类目开始浏览；AgentSkills 遵循 SKILL.md + scripts/references/assets 结构</p>
      </header>

      <h3 class="sl-h3">按类目浏览</h3>
      <div class="sl-cats kz-stagger"></div>
    </div>`);
    const catsBox = land.querySelector('.sl-cats');
    SKILL_CATEGORIES.forEach(cat => {
      const count = SKILLS.filter(s => s.cat === cat.id).length;
      const card = html(`<div class="sl-cat" data-cat="${cat.id}" style="--cat:${cat.color}">
        <div class="slc-ico" style="color:${cat.color};background:${cat.color}1a;border-color:${cat.color}33">
          ${ICONS_SKILL[cat.icon] || ''}
        </div>
        <div class="slc-body">
          <h4>${escapeHtml(cat.name)}</h4>
          <p>${escapeHtml(cat.desc)}</p>
          <div class="slc-meta">${count} 件 · 点开查看</div>
        </div>
      </div>`);
      card.addEventListener('click', () => { State.skillCat = cat.id; renderLeft(); renderCenter(); });
      catsBox.appendChild(card);
    });
    scroll.appendChild(land);
    return;
  }

  // ===== 类目页：网格 =====
  const cat = SKILL_CATEGORIES.find(c => c.id === State.skillCat);
  if (!cat) { State.skillCat = null; return renderSkillsHome(); }
  $('#crumbs').innerHTML = `工具箱 · <b>${escapeHtml(cat.name)}</b>`;

  const head = html(`<div class="sl-cat-head" style="background:linear-gradient(180deg, ${cat.color}1a, transparent)">
    <button class="btn-ghost mini" id="slBack">← 回 Skills 介绍</button>
    <div class="slh-meta">
      <h2 style="color:${cat.color}">${escapeHtml(cat.name)}</h2>
      <p>${escapeHtml(cat.desc || '')}</p>
    </div>
  </div>`);
  head.querySelector('#slBack').addEventListener('click', () => { State.skillCat = null; renderLeft(); renderCenter(); });
  scroll.appendChild(head);

  const grid = html('<div class="skills-grid kz-stagger"></div>');
  const filtered = SKILLS.filter(s => s.cat === State.skillCat);
  filtered.forEach(s => {
    const c2 = SKILL_CATEGORIES.find(c => c.id === s.cat);
    const c = html(`<article class="skill-card" data-id="${s.id}">
      <header>
        <span class="sc-tag" style="background:${c2?.color}22;color:${c2?.color};border-color:${c2?.color}44">${c2?.short || ''}</span>
        <span class="sc-id">${s.id}</span>
      </header>
      <h4>${escapeHtml(s.title)}</h4>
      <p class="sc-use">${escapeHtml(s.use)}</p>
      <div class="sc-stack">
        ${(s.stack || []).map(x => `<span class="tag">${escapeHtml(x)}</span>`).join('')}
      </div>
      <footer>
        <button class="sc-act" data-act="copy" title="复制内容"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg></button>
        <button class="sc-act" data-act="download" title="下载 zip"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg></button>
        <button class="sc-act primary" data-act="open">查看 / 喂给 AI</button>
      </footer>
    </article>`);
    c.querySelector('[data-act="open"]').addEventListener('click', () => { State.skillDetailId = s.id; renderCenter(); });
    c.querySelector('[data-act="copy"]').addEventListener('click', (e) => { e.stopPropagation(); navigator.clipboard.writeText(s.body); toast('已复制到剪贴板', 'ok'); });
    c.querySelector('[data-act="download"]').addEventListener('click', (e) => { e.stopPropagation(); downloadSkillZip(s); });
    c.addEventListener('click', () => { State.skillDetailId = s.id; renderCenter(); });
    grid.appendChild(c);
  });
  scroll.appendChild(grid);

  const bulk = html(`<div style="padding:18px 24px 60px;text-align:center">
    <button class="btn-ghost mini" id="dlAllZip">下载整个 ${escapeHtml(cat.name)} 类资产为 zip</button>
  </div>`);
  bulk.querySelector('#dlAllZip').addEventListener('click', () => downloadSkillsZipBulk(filtered));
  scroll.appendChild(bulk);
}

function renderSkillDetail(sid) {
  const s = SKILLS.find(x => x.id === sid);
  if (!s) { State.skillDetailId = null; return renderSkillsHome(); }
  const cat = SKILL_CATEGORIES.find(c => c.id === s.cat);
  const scroll = $('#centerScroll');
  $('#crumbs').innerHTML = `工具箱 · ${escapeHtml(cat?.name || '')} · <b>${s.id} · ${escapeHtml(s.title)}</b>`;
  scroll.innerHTML = '';
  const wrap = html(`<div class="skill-detail">
    <div class="sd-back"><button class="btn-ghost mini" id="sdBack">← 返回 Skills 仓库</button></div>
    <header class="sd-head" style="background:linear-gradient(135deg, ${cat?.color}26, transparent)">
      <div class="sd-meta">
        <span class="sc-tag" style="background:${cat?.color}26;color:${cat?.color};border-color:${cat?.color}55">${cat?.name || ''}</span>
        <span class="sc-id">${s.id}</span>
      </div>
      <h2>${escapeHtml(s.title)}</h2>
      <p>${escapeHtml(s.use)}</p>
      <div class="sd-stack">
        ${(s.stack || []).map(x => `<span class="tag">${escapeHtml(x)}</span>`).join('')}
        ${(s.tags || []).map(x => `<span class="tag" style="color:${cat?.color};border-color:${cat?.color}55">#${escapeHtml(x)}</span>`).join('')}
      </div>
      <div class="sd-actions">
        <button class="btn-primary mini" id="sdCopy">复制内容</button>
        <button class="btn-ghost mini" id="sdDl">下载 .zip</button>
        <button class="btn-ghost mini" id="sdFeed">喂给 店小二</button>
      </div>
    </header>

    <section class="sd-body">
      <h4>内容</h4>
      <pre><code id="sdBodyCode">${escapeHtml(s.body)}</code></pre>

      ${s.install ? `<h4>怎么用</h4><div class="sd-tip">${marked.parseInline(s.install)}</div>` : ''}
      ${s.example ? `<h4>示例</h4><pre><code>${escapeHtml(s.example)}</code></pre>` : ''}
      ${s.refs ? `<h4>引用 / 参考</h4><ul>${s.refs.map(r => `<li><a href="${escapeHtml(r.split(': ').pop() || r)}" target="_blank" rel="noopener">${escapeHtml(r)}</a></li>`).join('')}</ul>` : ''}
      ${s.repo ? `<p><b>仓库：</b><a href="${escapeHtml(s.repo)}" target="_blank" rel="noopener">${escapeHtml(s.repo)}</a></p>` : ''}
    </section>
  </div>`);
  scroll.appendChild(wrap);
  wrap.querySelector('#sdBack').addEventListener('click', () => { State.skillDetailId = null; renderCenter(); });
  wrap.querySelector('#sdCopy').addEventListener('click', () => { navigator.clipboard.writeText(s.body); toast('已复制', 'ok'); });
  wrap.querySelector('#sdDl').addEventListener('click', () => downloadSkillZip(s));
  wrap.querySelector('#sdFeed').addEventListener('click', () => {
    State.loadedSkill = { id: s.id, title: s.title, body: s.body };
    renderLoadedSkillChip();
    $('#aiInput')?.focus();
    toast(`已加载技能：${s.id} · ${s.title}`, 'ok');
  });
}

// ====== Skill zip 下载（JSZip） ======
async function downloadSkillZip(s) {
  if (!window.JSZip) return toast('JSZip 未加载，刷新一下', 'err');
  const zip = new JSZip();
  const cat = SKILL_CATEGORIES.find(c => c.id === s.cat);
  const readme = `# 开张 Skill · ${s.id} · ${s.title}

> 类别：${cat?.name}
> 用途：${s.use}
> 适用栈：${(s.stack || []).join(', ')}
${s.tags?.length ? `> 标签：${s.tags.join(', ')}\n` : ''}

## 怎么用

把 \`SKILL.md\` 或 \`content.txt\` 喂给你的 AI（Cursor / Claude / ChatGPT），或者按 INSTALL.md 的说明放到 IDE 里。

${s.install ? `## 安装\n\n${s.install}\n` : ''}
${s.example ? `## 示例\n\n${s.example}\n` : ''}
${s.refs?.length ? `## 引用\n\n${s.refs.map(r => '- ' + r).join('\n')}\n` : ''}
${s.repo ? `## 仓库\n\n${s.repo}\n` : ''}

---
开张 KAIZHANG · 学 → 做 → 成
`;
  zip.file('README.md', readme);
  zip.file('content.txt', s.body);
  // Skill.md 是 Anthropic Skills 约定
  zip.file('SKILL.md',
`---
name: ${s.id}
title: ${s.title}
description: ${s.use}
tags: [${(s.tags || []).map(t => '"' + t + '"').join(', ')}]
---

${s.body}
`);
  // metadata.json 方便程序读
  zip.file('metadata.json', JSON.stringify({
    id: s.id, cat: s.cat, title: s.title, use: s.use,
    stack: s.stack, tags: s.tags,
  }, null, 2));

  if (s.cat === 'rule') {
    // 顺便给一个 .cursorrules 文件
    zip.file('.cursorrules', s.body);
  } else if (s.cat === 'mcp') {
    zip.file('mcp.json', s.body);
  }

  const blob = await zip.generateAsync({ type: 'blob' });
  triggerDownload(blob, `kaizhang-skill-${s.id}.zip`);
  toast(`已下载 kaizhang-skill-${s.id}.zip`, 'ok');
}

async function downloadSkillsZipBulk(list) {
  if (!window.JSZip) return toast('JSZip 未加载', 'err');
  const zip = new JSZip();
  list.forEach(s => {
    const folder = zip.folder(`${s.cat}/${s.id}`);
    folder.file('SKILL.md',
`---
name: ${s.id}
title: ${s.title}
description: ${s.use}
---

${s.body}
`);
    folder.file('content.txt', s.body);
  });
  zip.file('README.md', `# 开张 Skills 合集 · ${list.length} 件

每个目录是一个独立 Skill。
把整个文件夹丢给你的 AI，或挑你需要的复制走。

---
${list.map(s => `- ${s.id} · ${s.title} — ${s.use}`).join('\n')}
`);
  const blob = await zip.generateAsync({ type: 'blob' });
  triggerDownload(blob, `kaizhang-skills-${list.length}.zip`);
  toast(`已下载 ${list.length} 件 Skill`, 'ok');
}

function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ============================================================
//  发布广场 · 列表 / 详情（小红书风格 in-page）
// ============================================================
function svgIcon(name, size = 14) {
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle">${(TAG_ICONS[name] || '').replace(/<svg[^>]*>|<\/svg>/g, '')}</svg>`;
}
function typeLabel(id) { return TYPE_OPTIONS.find(t => t.id === id)?.name || id; }
function statusLabel(id) { return STATUS_OPTIONS.find(t => t.id === id)?.name || id; }
function promoLabel(id) { return PROMO_OPTIONS.find(t => t.id === id)?.name || id; }

// 生成 SVG pattern overlay（给 cover 用，纯 SVG 不用图片）
function coverPattern(kind) {
  switch (kind) {
    case 'grid':
      return `<defs><pattern id="p" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M0 20h20M20 0v20" stroke="rgba(255,255,255,.18)" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#p)"/>`;
    case 'dots':
      return `<defs><pattern id="p" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="1.6" fill="rgba(255,255,255,.22)"/></pattern></defs><rect width="100%" height="100%" fill="url(#p)"/>`;
    case 'circuit':
      return `<defs><pattern id="p" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M0 15h12M15 0v12M15 18v12M18 15h12" stroke="rgba(255,255,255,.16)" stroke-width="1" fill="none"/><circle cx="15" cy="15" r="2" fill="rgba(255,255,255,.4)"/></pattern></defs><rect width="100%" height="100%" fill="url(#p)"/>`;
    case 'wave':
      return `<defs><pattern id="p" width="40" height="20" patternUnits="userSpaceOnUse"><path d="M0 10 Q10 0 20 10 T 40 10" stroke="rgba(255,255,255,.2)" stroke-width="1.5" fill="none"/></pattern></defs><rect width="100%" height="100%" fill="url(#p)"/>`;
    case 'lines':
    default:
      return `<defs><pattern id="p" width="14" height="14" patternUnits="userSpaceOnUse"><path d="M-2 14L14 -2" stroke="rgba(255,255,255,.12)" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#p)"/>`;
  }
}

function coverSVG(cover, big = false) {
  if (cover?.type === 'upload' && cover.data) return `<img class="cover-img" src="${cover.data}" alt="作品截图"/>`;
  if (!cover) cover = { gradient: ['#3B82F6', '#6366F1'], pattern: 'grid' };
  const [c1, c2] = cover.gradient || ['#3B82F6', '#6366F1'];
  return `<svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%;display:block">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/></linearGradient></defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    ${coverPattern(cover.pattern || 'grid')}
  </svg>`;
}

function renderSquare() {
  // detail mode（小红书风格 in-page）
  if (State.squareDetailId) return renderSquareDetail(State.squareDetailId);

  const scroll = $('#centerScroll');
  scroll.innerHTML = '';
  const allWorks = [...State.worksLocal.map(w => ({ ...w, _local: true })), ...SQUARE_SEEDS];
  $('#crumbs').innerHTML = `发布广场 · <b>${allWorks.length} 个作品</b> · 作品流`;

  const wrap = html('<div class="square-wrap"></div>');

  const bar = html(`
    <div class="square-bar">
      <button class="square-filter ${!State.squareFilterType && !State.squareFilterStatus ? 'active' : ''}" data-clear="1">全部</button>
      ${TYPE_OPTIONS.slice(0,4).map(t => `<button class="square-filter ${State.squareFilterType === t.id ? 'active' : ''}" data-type="${t.id}">${typeLabel(t.id)}</button>`).join('')}
      ${STATUS_OPTIONS.map(st => `<button class="square-filter ${State.squareFilterStatus === st.id ? 'active' : ''}" data-status="${st.id}">${statusLabel(st.id)}</button>`).join('')}
      <span class="points-badge">${svgIcon('like')} 积分 <b style="margin-left:4px">${State.points}</b></span>
      <div class="square-actions">
        <button class="btn-ghost mini" id="sqShare">分享广场</button>
        <button class="btn-primary mini" id="sqPub">+ 发布我的作品</button>
      </div>
    </div>
  `);
  bar.querySelectorAll('.square-filter').forEach(btn => btn.addEventListener('click', () => {
    if (btn.dataset.clear) { State.squareFilterType = null; State.squareFilterStatus = null; }
    if (btn.dataset.type) State.squareFilterType = State.squareFilterType === btn.dataset.type ? null : btn.dataset.type;
    if (btn.dataset.status) State.squareFilterStatus = State.squareFilterStatus === btn.dataset.status ? null : btn.dataset.status;
    renderCenter();
  }));
  wrap.appendChild(bar);

  const grid = html('<div class="square-grid kz-stagger"></div>');
  let shown = State.squareMode === 'mine' ? allWorks.filter(w => w._local) : allWorks;
  if (State.squareFilterType) shown = shown.filter(w => w.type === State.squareFilterType);
  if (State.squareFilterStatus) shown = shown.filter(w => w.status === State.squareFilterStatus);

  shown.forEach(w => {
    const card = html(`
      <article class="work-card" data-id="${w.id}">
        <div class="work-cover">
          ${coverSVG((w.screenshots && w.screenshots[0]) || w.cover)}
          <span class="status-pill" title="${escapeHtml(statusLabel(w.status))}">
            ${svgIcon(w.status)} <span>${escapeHtml(statusLabel(w.status))}</span>
          </span>
          ${w._local ? '<span class="local-pill">我刚发布的</span>' : ''}
          <div class="cover-title">${escapeHtml(w.name)}</div>
        </div>
        <div class="work-body">
          <div class="work-tagline">${escapeHtml(w.tagline)}</div>
          <div class="work-tags">
            <span class="tag tag-type">${svgIcon(w.type)} ${escapeHtml(typeLabel(w.type))}</span>
            ${(w.stack || []).slice(0,3).map(s => `<span class="tag">${escapeHtml(s)}</span>`).join('')}
            ${(w.promo || []).map(p => `<span class="tag">${svgIcon(p)} ${escapeHtml(promoLabel(p))}</span>`).join('')}
          </div>
          <div class="work-meta">
            <span class="m">${svgIcon('like')} ${w.likes ?? 0}</span>
            <span class="m">${svgIcon('book')} ${w.bookmarks ?? 0}</span>
            <span class="m">${svgIcon('msg')} ${w.comments ?? 0}</span>
            <span class="m" style="margin-left:auto;color:var(--text-3)">${w.publishedAt || ''}</span>
          </div>
        </div>
      </article>`);
    card.addEventListener('click', () => { State.squareDetailId = w.id; renderCenter(); window.scrollTo({ top: 0 }); $('#centerScroll').scrollTo({ top: 0 }); });
    grid.appendChild(card);
  });

  if (!shown.length) {
    wrap.appendChild(html(`
      <div style="text-align:center;padding:60px 20px;color:var(--text-3)">
        <h3 style="font-size:16px;color:var(--text-1)">广场还没人开张呢</h3>
        <p>先陪老板跑一会儿 — 或者你去成为第一个开张的人</p>
        <button class="btn-primary mini" id="sqEmptyPub">去发布我的作品</button>
      </div>
    `));
    wrap.querySelector('#sqEmptyPub').addEventListener('click', () => openPublish());
  } else {
    wrap.appendChild(grid);
  }

  scroll.appendChild(wrap);
  $('#sqPub').addEventListener('click', () => openPublish());
  $('#sqShare')?.addEventListener('click', () => { navigator.clipboard?.writeText(location.href); toast('链接已复制', 'ok'); });
}

function getWorkComments(w) {
  State.workComments = State.workComments || {};
  if (!State.workComments[w.id]) {
    State.workComments[w.id] = [
      { id:'seed-a', user:'a friend', avatar:'A', text:'挺好的，已收藏；定价能再分析下不？', ts:'2 天前', useful: false },
      { id:'seed-b', user:'lemon', avatar:'L', text:'UI 风格我很喜欢，配色可以再降一点饱和度。', ts:'5 天前', useful: true },
    ];
  }
  return State.workComments[w.id];
}

function renderSquareDetail(id) {
  const all = [...State.worksLocal.map(w => ({ ...w, _local: true })), ...SQUARE_SEEDS];
  const w = all.find(x => x.id === id);
  if (!w) { State.squareDetailId = null; return renderSquare(); }
  $('#crumbs').innerHTML = `发布广场 · <b>${escapeHtml(w.name)}</b>`;
  const scroll = $('#centerScroll');
  scroll.innerHTML = '';
  const comments = getWorkComments(w);

  const screenshots = w.screenshots && w.screenshots.length ? w.screenshots : [{ gradient: w.cover?.gradient || ['#3B82F6','#6366F1'], pattern: w.cover?.pattern || 'grid', caption: '产品主视图' }];

  const wrap = html(`<div class="work-detail work-detail-v2">
    <div class="wd-back"><button class="btn-ghost mini" id="wdBack">← 回到广场</button></div>
    <div class="wd-top">
      <div class="wd-left">
        <div class="wd-gallery">
          <div class="wd-shot main" id="wdMain">${coverSVG(screenshots[0])}</div>
          <div class="wd-thumbs">
            ${screenshots.map((s, i) => `<div class="wd-thumb ${i === 0 ? 'active' : ''}" data-i="${i}">${coverSVG(s)}</div>`).join('')}
          </div>
          <div class="wd-caption" id="wdCaption">${escapeHtml(screenshots[0].caption || '')}</div>
        </div>
      </div>
      <div class="wd-right">
        <div class="wd-author-mini">
          <span class="avatar" style="background:${w.author?.tone}22;color:${w.author?.tone}">${escapeHtml(w.author?.avatar || (w.author?.name || '?').charAt(0))}</span>
          <div><b>${escapeHtml(w.author?.name || '匿名')}</b><span>${w.publishedAt || ''} · ${escapeHtml(statusLabel(w.status))}</span></div>
        </div>
        <h1 class="wd-name-big">${escapeHtml(w.name)}</h1>
        <p class="wd-tag-big">${escapeHtml(w.tagline)}</p>
        <div class="wd-pill-row">
          <span class="tag tag-type">${svgIcon(w.type)} ${escapeHtml(typeLabel(w.type))}</span>
          <span class="tag">${svgIcon(w.status)} ${escapeHtml(statusLabel(w.status))}</span>
          ${(w.promo || []).map(p => `<span class="tag">${svgIcon(p)} ${escapeHtml(promoLabel(p))}</span>`).join('')}
        </div>
        ${w.link ? `<a class="wd-link" href="${escapeHtml(w.link)}" target="_blank" rel="noopener">${svgIcon('link')} ${escapeHtml(w.link)}</a>` : ''}
        <div class="wd-actions">
          <button class="btn-ghost" id="wdLikeBtn">${svgIcon('like')} 点赞 +5</button>
          <button class="btn-ghost" id="wdBookBtn">${svgIcon('book')} 收藏 +3</button>
          <button class="btn-primary" id="wdFocusComment">${svgIcon('msg')} 写反馈 +10</button>
        </div>
      </div>
    </div>

    <section class="wd-section-main">
      <h4 class="wd-h4">产品介绍</h4>
      <div class="wd-desc">${escapeHtml(w.description || w.tagline).replace(/\n/g, '<br>')}</div>
      <h4 class="wd-h4">技术栈</h4>
      <div class="wd-stack">${(w.stack || []).map(s => `<span class="tag">${escapeHtml(s)}</span>`).join('')}</div>
      ${w.metrics && Object.keys(w.metrics).length ? `<h4 class="wd-h4">数据</h4><div class="wd-metrics">${Object.entries(w.metrics).map(([k, v]) => `<div class="wd-metric"><span class="wm-k">${escapeHtml(k)}</span><span class="wm-v">${escapeHtml(String(v))}</span></div>`).join('')}</div>` : ''}
      <h4 class="wd-h4">作者想要的反馈</h4>
      <p class="wd-wants">${escapeHtml(w.wants || '—')}</p>
    </section>

    <section class="wd-comment-section">
      <div class="wcs-head"><h4>评论与反馈 <span id="wdCmt">${comments.length}</span></h4><p>留下具体、有帮助的反馈会获得积分。</p></div>
      <div class="comment-composer">
        <textarea id="commentInput" rows="3" placeholder="写一条有用反馈：哪里清楚、哪里困惑、你会不会用、你愿意付多少钱…"></textarea>
        <div class="composer-actions"><button class="btn-primary mini" id="submitComment">发布反馈 +10</button></div>
      </div>
      <div class="wd-comments" id="commentList"></div>
    </section>
  </div>`);
  scroll.appendChild(wrap);

  const renderComments = () => {
    const list = wrap.querySelector('#commentList');
    list.innerHTML = '';
    getWorkComments(w).forEach(c => {
      const item = html(`<div class="wd-cmt"><span class="avatar small" style="background:#3B82F622;color:#3B82F6">${escapeHtml(c.avatar || 'U')}</span><div><b>${escapeHtml(c.user)}</b> · ${escapeHtml(c.ts)} ${c.useful ? '<span class="useful">有用</span>' : ''}<br>${escapeHtml(c.text)}</div></div>`);
      list.appendChild(item);
    });
    wrap.querySelector('#wdCmt').textContent = getWorkComments(w).length;
  };

  wrap.querySelector('#wdBack').addEventListener('click', () => { State.squareDetailId = null; renderCenter(); });
  wrap.querySelectorAll('.wd-thumb').forEach(th => th.addEventListener('click', () => {
    wrap.querySelectorAll('.wd-thumb').forEach(t => t.classList.remove('active'));
    th.classList.add('active');
    const i = parseInt(th.dataset.i, 10);
    wrap.querySelector('#wdMain').innerHTML = coverSVG(screenshots[i]);
    wrap.querySelector('#wdCaption').textContent = screenshots[i].caption || '';
  }));
  wrap.querySelector('#wdLikeBtn').addEventListener('click', () => { if (!requireLogin()) return; w.likes = (w.likes || 0) + 1; gainPoints(5, '点赞作品'); });
  wrap.querySelector('#wdBookBtn').addEventListener('click', () => { if (!requireLogin()) return; w.bookmarks = (w.bookmarks || 0) + 1; gainPoints(3, '收藏作品'); });
  wrap.querySelector('#wdFocusComment').addEventListener('click', () => wrap.querySelector('#commentInput').focus());
  wrap.querySelector('#submitComment').addEventListener('click', () => {
    if (!requireLogin()) return;
    const input = wrap.querySelector('#commentInput');
    const text = input.value.trim();
    if (!text) return toast('先写一点具体反馈', 'warn');
    getWorkComments(w).unshift({ id:'c-'+Date.now(), user: State.user?.name || '我', avatar:(State.user?.name || '我').charAt(0), text, ts:'刚刚', useful:false });
    w.comments = getWorkComments(w).length;
    input.value = '';
    renderComments();
    gainPoints(10, '留有用反馈');
  });
  renderComments();
}

function gainPoints(n, why) {
  if (!requireLogin()) return;
  State.points += n;
  saveState();
  $('#pointsTxt').textContent = `积分 ${State.points}`;
  toast(`+${n} 积分 · ${why}`, 'ok');
}

// ============================================================
//  我的空间（未登录 → 提示登录）
// ============================================================
function renderMe() {
  const scroll = $('#centerScroll');
  scroll.innerHTML = '';
  $('#crumbs').innerHTML = `我的空间`;

  if (!State.user) {
    const gate = html(`<div class="login-gate">
      <div class="lg-card">
        <div class="lg-ico">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a8 8 0 0 1 16 0v1"/></svg>
        </div>
        <h2>请先登录</h2>
        <p>我的空间存放你在开张的笔记 / 作品 / 积分。<br>用邀请码登录后即可查看。</p>
        <button class="btn-primary" id="lgBtn">用邀请码登录</button>
        <p class="muted tiny" style="margin-top:14px">演示码：<code>KAIZHANG-2026</code> · <code>VIBE-GUEST</code> · <code>DEMO</code></p>
      </div>
    </div>`);
    scroll.appendChild(gate);
    gate.querySelector('#lgBtn').addEventListener('click', () => $('#modalLogin').hidden = false);
    return;
  }

  $('#crumbs').innerHTML = `我的空间 · <b>${({notes:'笔记',works:'作品',points:'积分',settings:'设置'})[State.meTab || 'notes']}</b>`;
  const wrap = html(`<div class="me-wrap">
    <div class="me-tabs">
      <button class="me-tab" data-tab="notes">我的笔记 (${State.notes.length})</button>
      <button class="me-tab" data-tab="works">我的作品 (${State.worksLocal.length})</button>
      <button class="me-tab" data-tab="points">我的积分</button>
      <button class="me-tab" data-tab="settings">设置</button>
    </div>
    <div class="me-content" id="meContent"></div>
  </div>`);
  scroll.appendChild(wrap);
  wrap.querySelectorAll('.me-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === (State.meTab || 'notes'));
    t.addEventListener('click', () => { State.meTab = t.dataset.tab; renderLeft(); renderCenter(); });
  });

  const c = $('#meContent');
  const tab = State.meTab || 'notes';
  if (tab === 'notes') {
    if (!State.notes.length) {
      c.innerHTML = `<div style="text-align:center;padding:40px;color:var(--text-3)">
        <h3 style="font-size:15px;color:var(--text-1)">笔记本是空的</h3>
        <p>去学习路径选一张卡片，选中文字 → 点「归档」就在这里了。</p>
      </div>`;
      return;
    }
    if (State.noteDetailId) {
      const n = State.notes.find(x => x.id === State.noteDetailId);
      if (!n) { State.noteDetailId = null; return renderMe(); }
      const detail = html(`<div class="note-detail">
        <button class="btn-ghost mini" id="ndBack" style="margin-bottom:14px">← 回笔记列表</button>
        <h2>${escapeHtml(n.title)}</h2>
        <div class="nd-meta">${new Date(n.ts).toLocaleString()} · 来源：${escapeHtml(n.source || '—')}</div>
        <div class="nd-body" id="ndBody"></div>
        <div class="nd-actions">
          <button class="btn-ghost mini" id="ndOpen">回到来源</button>
          <button class="btn-ghost mini" id="ndCopy">复制</button>
          <button class="btn-ghost mini" id="ndDel" style="color:var(--danger)">删除</button>
        </div>
      </div>`);
      c.appendChild(detail);
      const ndBody = detail.querySelector('#ndBody');
      const structuredNote = renderStructuredAI(n.content);
      if (structuredNote) {
        ndBody.classList.add('structured-note');
        ndBody.appendChild(structuredNote);
      } else {
        ndBody.textContent = n.content;
      }
      detail.querySelector('#ndBack').addEventListener('click', () => { State.noteDetailId = null; renderCenter(); });
      detail.querySelector('#ndOpen').addEventListener('click', () => {
        if (n.source && CARDS.find(c2 => c2.id === n.source)) openCard(n.source);
        else if (n.source && PHASES.find(p => p.id === n.source)) { State.phaseId = n.source; State.cardId = null; State.phaseDetail = n.source; switchRoute('learn'); }
      });
      detail.querySelector('#ndCopy').addEventListener('click', () => { navigator.clipboard.writeText(n.content); toast('已复制', 'ok'); });
      detail.querySelector('#ndDel').addEventListener('click', () => {
        State.notes = State.notes.filter(x => x.id !== n.id);
        State.noteDetailId = null; saveState(); renderCenter();
        toast('已删除', 'warn');
      });
      return;
    }
    // 网格视图（默认）
    const grid = html('<div class="note-list kz-stagger"></div>');
    State.notes.slice().reverse().forEach(n => {
      let snippet = (n.content || '').replace(/\s+/g, ' ').slice(0, 120);
      const st = renderStructuredAI(n.content);
      if (st) {
        const sum = st.querySelector('.ais-summary')?.textContent || st.querySelector('.ais-card p')?.textContent || snippet;
        snippet = sum.replace(/\s+/g, ' ').slice(0, 120);
      }
      const tile = html(`<div class="note-tile">
        <h6>${escapeHtml(n.title)}</h6>
        <div class="nt-snippet">${escapeHtml(snippet)}${n.content?.length > 120 ? '…' : ''}</div>
        <div class="nt-meta">${new Date(n.ts).toLocaleDateString()} · 来源：${escapeHtml(n.source || '—')}</div>
      </div>`);
      tile.addEventListener('click', () => { State.noteDetailId = n.id; renderCenter(); });
      grid.appendChild(tile);
    });
    c.appendChild(grid);
    const exp = html(`<div style="margin-top:14px;text-align:center"><button class="btn-ghost mini">导出全部为 Markdown</button></div>`);
    exp.querySelector('button').addEventListener('click', exportNotes);
    c.appendChild(exp);

  } else if (tab === 'works') {
    if (!State.worksLocal.length) {
      c.innerHTML = `<div style="text-align:center;padding:40px;color:var(--text-3)">还没发布过作品 — 去发布广场点 <b>+ 发布</b>，触发「开张大吉」</div>`;
      return;
    }
    State.worksLocal.forEach(w => {
      const card = html(`<div class="note-card">
        <h5>${escapeHtml(w.name)}</h5>
        <div class="meta">${w.publishedAt} · ${escapeHtml(statusLabel(w.status))}</div>
        <div class="content">${escapeHtml(w.tagline)}</div>
      </div>`);
      c.appendChild(card);
    });

  } else if (tab === 'points') {
    c.innerHTML = `
      <div style="text-align:center;padding:30px 20px">
        <div style="font-size:48px;color:var(--vermilion);font-weight:600">${State.points}</div>
        <p style="color:var(--text-3)">当前积分余额</p>
        <hr style="border:0;border-top:1px solid var(--border);margin:20px 0">
        <p style="text-align:left;font-size:12.5px;color:var(--text-2);line-height:1.8">
          <b>积分规则</b><br>
          · 点赞作品 <b>+5</b>　·　收藏作品 <b>+3</b>　·　写有用反馈 <b>+10</b><br>
          · 发布一个作品 <b>-10</b>（含积分校验）<br>
          · 同一作品对同一用户奖励上限 10 次（防刷）
        </p>
      </div>`;
  } else if (tab === 'settings') {
    const hasKey = !!localStorage.getItem('kz.localKey');
    c.innerHTML = `
      <h3 style="font-size:14px">设置</h3>

      <div class="setting-card">
        <h5>本地 AI 调用</h5>
        <p>线上跑（部署到 Vercel）走 <code>/api/chat</code> 中转 — 不需要在这里配。<br>
        但如果是 <b>本地直连 npx serve</b>，没有 serverless function — 可以在这里贴一个 ARK API Key，前端会直接调火山方舟。</p>
        <input type="password" id="setLocalKey" placeholder="ark-xxxxxxxx-... (仅存浏览器)" value="${hasKey ? '已配置 · 留空可清除' : ''}" />
        <div style="margin-top:8px;display:flex;gap:8px">
          <button class="btn-primary mini" id="setKeySave">保存</button>
          <button class="btn-ghost mini" id="setKeyClear">清除</button>
        </div>
        <p class="tiny muted">⚠ 这个 key 只存在你浏览器的 localStorage 里，不会传到任何服务器。但任何能打开你电脑的人都能看到 — 别用生产 key。</p>
      </div>

      <div class="setting-card">
        <h5>数据</h5>
        <div style="display:flex;gap:8px">
          <button class="btn-ghost mini" id="setExport">导出所有数据</button>
          <button class="btn-ghost mini" id="setReset" style="color:var(--danger)">清除本地数据</button>
        </div>
        <p class="tiny muted">数据存储：localStorage · 清缓存会丢</p>
      </div>

      <div class="setting-card">
        <h5>账号</h5>
        <p>邀请码：<b>${escapeHtml(State.user.code)}</b> · ${escapeHtml(State.user.name)}</p>
        <button class="btn-ghost mini" id="setLogout">退出登录</button>
      </div>
    `;
    $('#setKeySave').addEventListener('click', () => {
      const v = $('#setLocalKey').value.trim();
      if (!v || v === '已配置 · 留空可清除') return toast('请粘贴 key', 'warn');
      localStorage.setItem('kz.localKey', v);
      toast('本地 key 已保存', 'ok');
    });
    $('#setKeyClear').addEventListener('click', () => { localStorage.removeItem('kz.localKey'); toast('已清除', 'ok'); renderCenter(); });
    $('#setExport').addEventListener('click', () => {
      const blob = new Blob([JSON.stringify({ notes: State.notes, points: State.points, works: State.worksLocal }, null, 2)], { type: 'application/json' });
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'kaizhang-backup.json'; a.click();
    });
    $('#setReset').addEventListener('click', () => {
      if (!confirm('确定要清除所有本地数据吗？这会删除笔记 / 作品 / 积分。')) return;
      localStorage.removeItem(LS_KEY);
      location.reload();
    });
    $('#setLogout').addEventListener('click', () => {
      State.user = null; saveState();
      $('#loginText').textContent = '登录';
      $('#userName').textContent = '游客 · 未登录';
      $('#userAvatar').textContent = '游';
      renderCenter();
    });
  }
}

// ============================================================
//  打开卡片
// ============================================================
function openCard(cid) {
  State.cardId = cid;
  const c = CARDS.find(x => x.id === cid);
  if (c) {
    // 找到所在 Phase（若卡片在某个 phase 列表里）
    const p = PHASES.find(p => p.cards.includes(cid));
    if (p) State.phaseId = p.id;
  }
  saveState();
  switchRoute('learn');
}

// ============================================================
//  Notes
// ============================================================
function addNote({ title, content, source }) {
  if (!requireLogin()) return;
  const id = 'n-' + Date.now() + '-' + Math.random().toString(36).slice(2,6);
  State.notes.push({ id, title, content, source, ts: Date.now() });
  saveState();
  toast('已归档到「我的笔记」', 'ok');
}

function exportNotes() {
  if (!State.notes.length) return toast('暂无笔记', 'warn');
  const md = State.notes.map(n => `## ${n.title}\n\n*来源：${n.source || '—'} · ${new Date(n.ts).toLocaleString()}*\n\n${n.content}\n\n---\n`).join('\n');
  const blob = new Blob([`# 我的开张笔记\n\n${md}`], { type: 'text/markdown' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'kaizhang-notes.md'; a.click();
}


function currentNoteSource() {
  const card = State.cardId ? CARDS.find(c => c.id === State.cardId) : null;
  const phase = PHASES.find(p => p.id === State.phaseId);
  if (card) return `${card.id} · ${card.title}`;
  if (phase) return `${phase.id} · ${phase.name}`;
  return 'manual';
}

function openNoteModal(seed = {}) {
  if (!requireLogin()) return;
  const modal = $('#modalNote');
  $('#noteTitle').value = seed.title || '';
  $('#noteSource').value = seed.source || currentNoteSource();
  $('#noteBody').value = seed.content || '';
  modal.hidden = false;
  setTimeout(() => ($('#noteTitle').value ? $('#noteBody') : $('#noteTitle')).focus(), 50);
}

function closeNoteModal() {
  $('#modalNote').hidden = true;
  $('#noteForm').reset();
}

// ============================================================
//  店小二
// ============================================================

function currentAskSource() {
  const card = State.cardId ? CARDS.find(c => c.id === State.cardId) : null;
  const phase = PHASES.find(p => p.id === State.phaseId);
  if (card) return { type:'card', id:card.id, title:card.title, label:`${card.id} · ${card.title}` };
  if (phase) return { type:'phase', id:phase.id, title:phase.name, label:`${phase.id} · ${phase.name}` };
  return { type:'workspace', id:'workspace', title:'工作台', label:'开张工作台' };
}

function askAI(prompt, attachments = []) {
  if (!requireLogin()) return;
  enterWorkbench(State.route || 'learn');
  const input = $('#aiInput');
  State.pendingAskSource = currentAskSource();
  input.value = prompt;
  attachments.forEach(a => { State.aiAttachments = (State.aiAttachments || []); State.aiAttachments.push(a); });
  renderAttachPreview();
  sendAIMessage();
}

function getCurrentChat() {
  return State.history.find(c => c.id === State.currentChatId) || State.history[0];
}

function renderAIThread() {
  const thread = $('#aiThread');
  thread.innerHTML = '';
  const chat = getCurrentChat();
  if (!chat || !chat.messages.length) {
    thread.appendChild(html(`<div class="bubble system"><span class="pill">${State.user ? `${State.user.name}，你好。问点什么？` : '请先登录解锁店小二'}</span></div>`));
    return;
  }
  chat.messages.forEach(m => thread.appendChild(renderBubble(m)));
  thread.scrollTop = thread.scrollHeight;
}



function parseJsonLoose(raw) {
  const text = String(raw || '').trim().replace(/^```json\s*/i, '').replace(/```$/,'').trim();
  try { return JSON.parse(text); } catch {}
  if (!text.startsWith('{')) return null;

  function extractString(key) {
    const re = new RegExp(`"${key}"\s*:\s*"([\s\S]*?)"\s*(?:,\s*"|,\s*\]|,\s*\}|\n\s*"[a-zA-Z_]|$)`, 'm');
    const m = text.match(re);
    if (!m) return '';
    let v = m[1];
    // 容错：如果因为下一个 key 被吃掉，截断常见字段
    v = v.replace(/"\s*,\s*$/,'');
    return v;
  }

  function extractArrayBlock(key) {
    const idx = text.indexOf(`"${key}"`);
    if (idx < 0) return '';
    const start = text.indexOf('[', idx);
    if (start < 0) return '';
    let depth = 0;
    let inStr = false;
    let esc = false;
    for (let i = start; i < text.length; i++) {
      const ch = text[i];
      if (esc) { esc = false; continue; }
      if (ch === '\\') { esc = true; continue; }
      if (ch === '"') inStr = !inStr;
      if (!inStr) {
        if (ch === '[') depth++;
        if (ch === ']') {
          depth--;
          if (depth === 0) return text.slice(start, i + 1);
        }
      }
    }
    return '';
  }

  const result = {};
  const summary = extractString('summary') || extractString('answer') || extractString('overview');
  if (summary) result.summary = summary;

  // cards: 用对象边界粗暴拆，兼容 body 内代码块
  const cardsBlock = extractArrayBlock('cards');
  if (cardsBlock) {
    const cards = [];
    const objRe = /\{\s*"title"\s*:\s*"([\s\S]*?)"\s*,\s*"body"\s*:\s*"([\s\S]*?)"\s*\}/g;
    let m;
    while ((m = objRe.exec(cardsBlock))) {
      cards.push({ title: m[1], body: m[2] });
    }
    if (cards.length) result.cards = cards;
  }

  const actionsBlock = extractArrayBlock('actions') || extractArrayBlock('next_steps') || extractArrayBlock('steps');
  if (actionsBlock) {
    const arr = [];
    const itemRe = /"([\s\S]*?)"\s*(?:,|\])/g;
    let m;
    while ((m = itemRe.exec(actionsBlock))) {
      const v = m[1].trim();
      if (v && !v.includes('title') && !v.includes('body')) arr.push(v);
    }
    if (arr.length) result.actions = arr;
  }

  const recBlock = extractArrayBlock('recommend') || extractArrayBlock('recommended_cards');
  if (recBlock) {
    const rec = [];
    const itemRe = /"([A-H]-\d{2}|C-tree|G-选型)"/g;
    let m;
    while ((m = itemRe.exec(recBlock))) rec.push(m[1]);
    if (rec.length) result.recommend = rec;
  }

  return Object.keys(result).length ? result : null;
}

function renderStructuredAI(content) {
  const raw = String(content || '').trim();
  let txt = raw;
  const m = raw.match(/```json\s*([\s\S]*?)```/i);
  if (m) txt = m[1].trim();
  if (!txt.startsWith('{') && !txt.startsWith('[')) return null;

  function valueToText(v) {
    if (v == null) return '';
    if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') return String(v);
    if (Array.isArray(v)) return v.map(valueToText).filter(Boolean).join('\n');
    if (typeof v === 'object') return Object.entries(v).map(([k,val]) => `${k}: ${valueToText(val)}`).join('\n');
    return String(v);
  }

  function appendCard(grid, title, body) {
    const text = valueToText(body).trim();
    if (!text) return;
    grid.appendChild(html(`<div class="ais-card"><h5>${escapeHtml(title || '要点')}</h5><p>${escapeHtml(text).replace(/\n/g,'<br>')}</p></div>`));
  }

  try {
    const data = parseJsonLoose(txt);
    if (!data) return null;
    const root = Array.isArray(data) ? { cards: data } : data;
    if (!root || typeof root !== 'object') return null;

    const box = document.createElement('div');
    box.className = 'ai-structured';
    let rendered = 0;

    const summary = root.summary || root.title || root.answer || root.conclusion || root.overview;
    if (summary) { box.appendChild(html(`<div class="ais-summary">${escapeHtml(valueToText(summary)).replace(/\n/g,'<br>')}</div>`)); rendered++; }

    const grid = html('<div class="ais-cards"></div>');
    const cardLike = root.cards || root.sections || root.points || root.key_points || root.items || root.blocks;
    if (Array.isArray(cardLike)) {
      cardLike.forEach((c, i) => {
        if (typeof c === 'string') appendCard(grid, `要点 ${i + 1}`, c);
        else appendCard(grid, c.title || c.heading || c.name || `要点 ${i + 1}`, c.body || c.content || c.text || c.description || c);
      });
    }
    if (!grid.children.length) {
      Object.entries(root).forEach(([k, v]) => {
        if (['summary','title','answer','conclusion','overview','actions','next_steps','recommend','recommended_cards'].includes(k)) return;
        appendCard(grid, k, v);
      });
    }
    if (grid.children.length) { box.appendChild(grid); rendered += grid.children.length; }

    const actions = root.actions || root.next_steps || root.todos || root.steps;
    if (Array.isArray(actions) && actions.length) {
      const ol = html('<ol class="ais-actions"></ol>');
      actions.forEach(a => ol.appendChild(html(`<li>${escapeHtml(valueToText(a))}</li>`)));
      box.appendChild(ol); rendered++;
    }

    const recIds = root.recommend || root.recommended || root.recommended_cards || root.cards_to_read;
    if (Array.isArray(recIds) && recIds.length) {
      const rec = html('<div class="ais-rec"></div>');
      recIds.forEach(x => {
        const id = typeof x === 'string' ? x : (x.id || x.card_id);
        const c = CARDS.find(card => card.id === id);
        if (c) {
          const b = html(`<button>${c.id} · ${escapeHtml(c.title)}</button>`);
          b.addEventListener('click', () => openCard(c.id));
          rec.appendChild(b);
        }
      });
      if (rec.children.length) { box.appendChild(rec); rendered++; }
    }

    return rendered ? box : null;
  } catch { return null; }
}

function renderBubble(m) {
  const role = m.role; // 'user' | 'ai'
  const cls = role === 'ai' ? `bubble ai${State.spicy ? ' spicy' : ''}` : 'bubble user';
  const wrap = html(`<div class="${cls}"></div>`);
  if (role === 'ai') {
    const structured = renderStructuredAI(m.content);
    if (structured) wrap.appendChild(structured);
    else wrap.innerHTML = renderMarkdownSafe(m.content);
  } else {
    wrap.innerHTML = escapeHtml(m.content).replace(/\n/g,'<br>');
    if (m.attachments?.length) {
      m.attachments.forEach(a => {
        if (a.type === 'image') wrap.appendChild(html(`<img class="img-attach" src="${a.data}"/>`));
        else if (a.type === 'voice') wrap.appendChild(html(`<div style="font-size:11px;opacity:.7;margin-top:4px">🎙 ${escapeHtml(a.transcript || '语音输入')}</div>`));
      });
    }
  }
  // 挂载相关卡片
  if (m.citations?.length) {
    const foot = html('<div class="bub-foot"></div>');
    m.citations.forEach(cid => {
      const c = CARDS.find(x => x.id === cid);
      if (!c) return;
      const chip = html(`<span class="cite-chip">📎 ${c.id} · ${escapeHtml(c.title)}</span>`);
      chip.addEventListener('click', () => openCard(c.id));
      foot.appendChild(chip);
    });
    wrap.appendChild(foot);
  }
  // 归档按钮（AI 消息）
  if (role === 'ai' && m.content) {
    const archive = html(`<button class="btn-ghost mini" style="margin-top:6px;font-size:10.5px">归档此回答</button>`);
    archive.addEventListener('click', () => {
      addNote({ title: 'AI 回答 · ' + new Date().toLocaleString(), content: m.content, source: State.cardId || State.phaseId });
    });
    wrap.appendChild(archive);
  }
  return wrap;
}

function renderMarkdownSafe(md) {
  try { return marked.parse(md, { breaks: true }); } catch { return escapeHtml(md); }
}

async function sendAIMessage() {
  if (!requireLogin()) return;
  const input = $('#aiInput');
  const text = input.value.trim();
  const attachments = State.aiAttachments || [];
  if (!text && !attachments.length) return;

  const chat = getCurrentChat();
  // 附加当前卡片上下文（若有）
  let userContent = text;
  if (State.cardId && State.aiAttachCard) {
    const c = CARDS.find(x => x.id === State.cardId);
    if (c) userContent = `（上下文：当前在看 ${c.id} · ${c.title}）\n${userContent}`;
    State.aiAttachCard = false;
  }
  const userMsg = { role: 'user', content: userContent, attachments };
  chat.messages.push(userMsg);
  input.value = '';
  State.aiAttachments = [];
  renderAttachPreview();
  renderAIThread();

  // AI bubble
  const aiMsg = { role: 'ai', content: '', citations: detectCitations(text) };
  chat.messages.push(aiMsg);
  const thread = $('#aiThread');
  const bubble = renderBubble(aiMsg);
  thread.appendChild(bubble);
  const cursor = html('<span class="streaming-cursor"></span>');
  bubble.appendChild(cursor);
  thread.scrollTop = thread.scrollHeight;

  try {
    await streamChat({
      messages: buildModelMessages(chat),
      onDelta: (chunk) => {
        aiMsg.content += chunk;
        const partial = aiMsg.content.trim();
        const looksJson = partial.startsWith('{') || partial.startsWith('```json');
        if (looksJson && !renderStructuredAI(aiMsg.content)) {
          bubble.innerHTML = `<div class="ai-typing-card"><b>店小二正在整理成卡片…</b><span>结构化回答生成中</span></div>`;
        } else {
          const structured = renderStructuredAI(aiMsg.content);
          if (structured) { bubble.innerHTML = ''; bubble.appendChild(structured); }
          else bubble.innerHTML = renderMarkdownSafe(aiMsg.content);
        }
        // restore citations footer
        if (aiMsg.citations?.length) {
          const foot = html('<div class="bub-foot"></div>');
          aiMsg.citations.forEach(cid => {
            const c = CARDS.find(x => x.id === cid);
            if (!c) return;
            const chip = html(`<span class="cite-chip">📎 ${c.id} · ${escapeHtml(c.title)}</span>`);
            chip.addEventListener('click', () => openCard(c.id));
            foot.appendChild(chip);
          });
          bubble.appendChild(foot);
        }
        bubble.appendChild(cursor);
        thread.scrollTop = thread.scrollHeight;
      },
    });
    cursor.remove();
    // Auto-title chat
    if (chat.id !== 'main' && chat.title === '新对话') {
      chat.title = text.slice(0, 20);
    }
    saveState();
    renderAIThread();
  } catch (e) {
    console.error(e);
    cursor.remove();
    aiMsg.content = `> ⚠ 店小二在抽签：${escapeHtml(String(e.message || e))}\n\n要不要先陪老板跳两只 bug？点状态栏右下角 🐛。`;
    bubble.innerHTML = renderMarkdownSafe(aiMsg.content);
    saveState();
  }
}


function getAIKnowledgeContext() {
  const phase = PHASES.find(p => p.id === State.phaseId);
  const card = State.cardId ? CARDS.find(c => c.id === State.cardId) : null;
  const recentNotes = (State.notes || []).slice(-5).map(n => `${n.title}: ${(n.content || '').slice(0, 80).replace(/\s+/g, ' ')}`);
  const readTitles = (State.doneCards || []).slice(-12).map(id => {
    const c = CARDS.find(x => x.id === id);
    return c ? `${c.id} ${c.title}` : id;
  });
  return `用户学习上下文：
- 当前阶段：${phase ? `${phase.id} · ${phase.name}（目标：${phase.goal}）` : State.phaseId}
- 正在阅读：${card ? `${card.id} · ${card.title}` : '未打开具体卡片'}
- 已读卡片数：${(State.doneCards || []).length}
- 最近读过：${readTitles.length ? readTitles.join('；') : '无'}
- 已完成检查点：${(State.doneCheckpoints || []).join('、') || '无'}
- 最近笔记：${recentNotes.length ? recentNotes.join('；') : '无'}
回答要求：
1. 优先结合当前阶段和正在阅读的卡片回答。
2. 不要重复讲用户已学过的基础；必要时用一句话回顾即可。
3. 如果问题和当前卡片相关，明确指出“结合你现在看的 ${card ? card.id : '卡片'}”。
4. 尽量返回结构化 JSON，格式：{summary:string, cards:[{title,body}], actions:[string], recommend:[cardId]}。如果不适合 JSON，也用分段短卡片式文本，不要一大坨长文。`;
}

function getCardAliases(card) {
  const base = [card.id, card.title];
  const lower = card.title.toLowerCase();
  const extras = [];
  const map = {
    'D-01': ['MCP', 'Model Context Protocol', '工具调用协议'],
    'D-02': ['配置 MCP', 'mcp.json'],
    'C-01': ['Cursor', 'AI IDE'],
    'C-03': ['Lovable'],
    'G-01': ['Vercel', '部署', 'vercel.app'],
    'F-03': ['Supabase', '数据库', 'BaaS'],
    'A-07': ['Agent', '智能体', '代理'],
    'A-08': ['RAG', '检索增强'],
    'A-03': ['Prompt', '提示词'],
    'F-08': ['Stripe', '支付'],
    'E-05': ['Next.js', 'Nextjs'],
    'E-04': ['React'],
    'E-06': ['Tailwind'],
    'H-01': ['Product Hunt', 'PH'],
    'H-03': ['小红书', 'Xiaohongshu'],
    'B-07': ['火山引擎', '方舟', 'Ark', '国产模型 API'],
  };
  if (map[card.id]) extras.push(...map[card.id]);
  // Title heuristics
  if (lower.includes('vercel')) extras.push('Vercel');
  if (lower.includes('supabase')) extras.push('Supabase');
  if (lower.includes('cursor')) extras.push('Cursor');
  if (lower.includes('mcp')) extras.push('MCP');
  return Array.from(new Set([...base, ...extras].filter(Boolean)));
}

function buildModelMessages(chat) {
  const sys = State.spicy
    ? '你是开张工作台的「毒舌前辈」店小二。给独立开发者真话，不哄人。语气可以扎心（像「这个想法 PH 上已经死了 17 个了」），但事实必须准确、建议必须落地。当前面对的是 vibe coder（用 AI 做产品的人）。用中文，简洁。'
    : '你是开张工作台的 店小二，专为 vibe coder（用 AI 做产品的人）服务。回答要：① 用打比方的方式解释 ② 给出可落地步骤 ③ 不确定就说不确定 ④ 中文，简洁。如果用户问的是知识卡片中的概念（LLM/Token/MCP/Agent/RAG/Vercel/Supabase 等），自然地引用，但不要编造 URL。';
  const msgs = [{ role: 'system', content: sys }, { role: 'system', content: getAIKnowledgeContext() }];
  // 已加载技能 → 作为附加 system message
  if (State.loadedSkill) {
    msgs.push({ role: 'system', content:
`用户已加载一个 Skill 资产作为本次对话的工作模式：

--- Skill: ${State.loadedSkill.id} · ${State.loadedSkill.title} ---
${State.loadedSkill.body}
--- End Skill ---

请把这个 Skill 当作可用工具或工作流，按用户的问题套用它。回答开头简单确认你在使用哪个 Skill，然后按需展开。` });
  }
  // 只取最近 20 条
  const recent = chat.messages.slice(-20);
  recent.forEach(m => {
    if (m.role === 'user') {
      const parts = [];
      if (m.content) parts.push({ type: 'text', text: m.content });
      (m.attachments || []).forEach(a => {
        if (a.type === 'image') parts.push({ type: 'image_url', image_url: { url: a.data } });
        else if (a.type === 'voice') parts.push({ type: 'text', text: `（语音转写：${a.transcript || '...'}）` });
      });
      msgs.push({ role: 'user', content: parts.length === 1 && parts[0].type === 'text' ? parts[0].text : parts });
    } else if (m.role === 'ai' && m.content) {
      msgs.push({ role: 'assistant', content: m.content });
    }
  });
  return msgs;
}

function detectCitations(text) {
  const cites = [];
  const safe = String(text || '');
  // 先识别显式卡片 ID
  const idMatches = safe.matchAll(/\b([A-H]-\d{2}|C-tree|G-选型)\b/g);
  for (const m of idMatches) {
    if (CARDS.find(c => c.id === m[1]) && !cites.includes(m[1])) cites.push(m[1]);
  }
  // 再遍历卡片 aliases，而不是硬编码一张关键词表
  for (const card of CARDS) {
    if (cites.includes(card.id)) continue;
    const aliases = getCardAliases(card);
    if (aliases.some(a => a && safe.toLowerCase().includes(String(a).toLowerCase()))) {
      cites.push(card.id);
    }
    if (cites.length >= 3) break;
  }
  return cites.slice(0, 3);
}
// ----- 流式调用后端 -----
async function streamChat({ messages, onDelta }) {
  let localKey = localStorage.getItem('kz.localKey');
  let resp;
  let usedLocal = false;

  // 第一次尝试：有 key 直连，否则走 /api/chat
  async function attempt() {
    if (localKey) {
      usedLocal = true;
      return await fetch('https://ark.cn-beijing.volces.com/api/coding/v3/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localKey,
        },
        body: JSON.stringify({ model: 'ark-code-latest', messages, stream: true, temperature: 0.7 }),
      });
    } else {
      usedLocal = false;
      return await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'ark-code-latest', messages, stream: true }),
      });
    }
  }

  try { resp = await attempt(); }
  catch (e) {
    // 网络层失败 — 提示贴 key
    if (!usedLocal && !localKey) {
      const k = await promptForLocalKey();
      if (k) { localKey = k; resp = await attempt(); }
      else throw new Error('没拿到 AI 凭据 — 在「我的 → 设置」贴一个 ARK Key 即可。');
    } else throw e;
  }

  if (!resp.ok || !resp.body) {
    const txt = await resp.text().catch(() => '');
    // 没 key 且 /api/chat 不存在 → 弹一个 inline 输入框让用户立即贴 key
    if (!usedLocal && (resp.status === 404 || resp.status === 405)) {
      const k = await promptForLocalKey();
      if (k) {
        localKey = k;
        resp = await attempt();
        if (!resp.ok || !resp.body) {
          const t2 = await resp.text().catch(() => '');
          throw new Error(`贴了 key 但调用仍失败：HTTP ${resp.status} ${t2.slice(0,200)}`);
        }
      } else {
        throw new Error('需要 ARK Key 才能本地用 AI — 在「我的 → 设置」可永久保存。');
      }
    } else {
      throw new Error(`HTTP ${resp.status} ${txt.slice(0,200)}`);
    }
  }
  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buf = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
    let idx;
    while ((idx = buf.indexOf('\n')) >= 0) {
      const line = buf.slice(0, idx).trim();
      buf = buf.slice(idx + 1);
      if (!line) continue;
      if (line.startsWith('data:')) {
        const data = line.slice(5).trim();
        if (data === '[DONE]') return;
        try {
          const j = JSON.parse(data);
          const delta = j.choices?.[0]?.delta?.content || '';
          if (delta) onDelta(delta);
        } catch { /* ignore parse errors */ }
      }
    }
  }
}

// 弹个浮窗让用户贴 ARK Key（本地使用场景）
function promptForLocalKey() {
  return new Promise(resolve => {
    const modal = html(`<div class="modal">
      <div class="modal-card" style="width:min(460px, 95vw)">
        <button class="modal-x">×</button>
        <h3>本地 AI 调用 · 贴一个 ARK Key</h3>
        <p class="muted">检测到没有 <code>/api/chat</code>（本地 <code>npx serve</code> 场景）。<br>
        贴一个火山方舟 ARK Key，就可以直连模型 — 只存浏览器本地，不上传任何服务器。</p>
        <input type="password" id="pkInput" placeholder="ark-xxxxxxxx-..." autofocus />
        <p class="muted tiny" style="margin-top:10px">提示：这个 key 之后会自动用于所有 AI 调用，去「我的 → 设置」可以替换 / 清除。</p>
        <div class="modal-actions">
          <button class="btn-ghost" id="pkCancel">取消</button>
          <button class="btn-primary" id="pkOK">保存并继续</button>
        </div>
      </div>
    </div>`);
    document.body.appendChild(modal);
    const close = (v) => { modal.remove(); resolve(v); };
    modal.querySelector('.modal-x').addEventListener('click', () => close(null));
    modal.querySelector('#pkCancel').addEventListener('click', () => close(null));
    modal.querySelector('#pkOK').addEventListener('click', () => {
      const v = modal.querySelector('#pkInput').value.trim();
      if (!v) return toast('请粘贴一个 key', 'warn');
      localStorage.setItem('kz.localKey', v);
      toast('Key 已保存到本地浏览器', 'ok');
      close(v);
    });
    modal.querySelector('#pkInput').addEventListener('keydown', e => {
      if (e.key === 'Enter') modal.querySelector('#pkOK').click();
    });
    setTimeout(() => modal.querySelector('#pkInput')?.focus(), 50);
  });
}

function renderLoadedSkillChip() {
  const wrap = $('#attachPreview');
  // Remove old skill chip if exists
  wrap.querySelector('.loaded-skill-chip')?.remove();
  if (!State.loadedSkill) return;
  // Ensure the attach area visible
  wrap.hidden = false;
  const chip = html(`<div class="loaded-skill-chip">
    <span class="lsc-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="20 6 9 17 4 12"/></svg></span>
    <span class="lsc-name"><span class="lsc-prefix">已加载技能：</span>${escapeHtml(State.loadedSkill.id)} · ${escapeHtml(State.loadedSkill.title)}</span>
    <button class="lsc-x" title="移除">×</button>
  </div>`);
  chip.querySelector('.lsc-x').addEventListener('click', () => {
    State.loadedSkill = null;
    renderLoadedSkillChip();
    renderAttachPreview();
  });
  wrap.prepend(chip);
}

function renderAttachPreview() {
  const wrap = $('#attachPreview');
  const list = State.aiAttachments || [];
  const hasSkill = !!State.loadedSkill;
  // Clear non-skill children
  Array.from(wrap.children).forEach(ch => { if (!ch.classList.contains('loaded-skill-chip')) ch.remove(); });
  if (!list.length && !hasSkill) { wrap.hidden = true; return; }
  wrap.hidden = false;
  list.forEach((a, i) => {
    if (a.type === 'image') {
      const el = html(`<div class="att"><img src="${a.data}"/><span class="rm">×</span></div>`);
      el.querySelector('.rm').addEventListener('click', () => { State.aiAttachments.splice(i,1); renderAttachPreview(); });
      wrap.appendChild(el);
    } else if (a.type === 'voice') {
      const el = html(`<div class="att" style="display:flex;align-items:center;justify-content:center;background:var(--panel-2);font-size:11px;color:var(--text-2)">mic<span class="rm">×</span></div>`);
      el.querySelector('.rm').addEventListener('click', () => { State.aiAttachments.splice(i,1); renderAttachPreview(); });
      wrap.appendChild(el);
    }
  });
}

// ============================================================
//  邀请码 / 登录
// ============================================================
const VALID_CODES = ['KAIZHANG-2026', 'VIBE-GUEST', 'DEMO'];
function requireLogin() {
  if (State.user) return true;
  $('#modalLogin').hidden = false;
  setTimeout(() => $('#inviteInput')?.focus(), 50);
  toast('请先登录（邀请码）', 'warn');
  return false;
}
function loginWith(code) {
  code = code.trim().toUpperCase();
  if (!VALID_CODES.includes(code)) { toast('邀请码无效（试试 KAIZHANG-2026）', 'err'); return false; }
  State.user = { name: code === 'KAIZHANG-2026' ? '开张同学' : code === 'VIBE-GUEST' ? '体验访客' : '演示员', code };
  saveState();
  $('#modalLogin').hidden = true;
  $('#loginText').textContent = State.user.name;
  $('#userName').textContent = State.user.name + ' · ' + code;
  $('#userAvatar').textContent = State.user.name.charAt(0);
  toast('登录成功 · 开张愉快', 'ok');
  // 如果欢迎页 / 别处有挂起的问题，登录后立即发送
  if (State.pendingWelcomeQuestion) {
    const q = State.pendingWelcomeQuestion;
    State.pendingWelcomeQuestion = null;
    setTimeout(() => {
      const ai = $('#aiInput');
      if (ai) { ai.value = q; autoGrow(ai); sendAIMessage(); }
    }, 200);
  }
  return true;
}

// ============================================================
//  Voice (Speech Recognition)
// ============================================================
let recognizer = null;
let recordingTarget = null;
function toggleVoice(targetInput, btn) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { toast('当前浏览器不支持语音识别（试试 Chrome / Edge）', 'warn', 2500); return; }
  if (recognizer && recordingTarget === btn) {
    recognizer.stop();
    return;
  }
  recognizer = new SR();
  recognizer.lang = 'zh-CN';
  recognizer.continuous = false;
  recognizer.interimResults = true;
  recordingTarget = btn;
  btn.classList.add('recording');
  let final = '';
  recognizer.onresult = (e) => {
    let interim = '';
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const t = e.results[i][0].transcript;
      if (e.results[i].isFinal) final += t; else interim += t;
    }
    const prev = targetInput.dataset.beforeVoice || '';
    targetInput.value = prev + final + interim;
  };
  recognizer.onstart = () => {
    targetInput.dataset.beforeVoice = targetInput.value;
    toast('🎙 听着呢…', 'ok', 1200);
  };
  recognizer.onerror = (e) => {
    toast('语音识别失败：' + e.error, 'err');
  };
  recognizer.onend = () => {
    btn.classList.remove('recording');
    recordingTarget = null;
    delete targetInput.dataset.beforeVoice;
    // Auto-grow
    targetInput.dispatchEvent(new Event('input'));
  };
  recognizer.start();
}

// ============================================================
//  Selection toolbar
// ============================================================
function setupSelectionToolbar() {
  const tb = $('#selToolbar');
  document.addEventListener('mouseup', () => {
    setTimeout(() => {
      const sel = window.getSelection();
      const text = sel.toString().trim();
      if (!text || text.length < 2) { tb.hidden = true; return; }
      const anchor = sel.anchorNode?.parentElement;
      if (!anchor || !anchor.closest('.prose')) { tb.hidden = true; return; }
      const range = sel.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      tb.style.left = (rect.left + rect.width / 2) + 'px';
      tb.style.top = (rect.top - 4 + window.scrollY) + 'px';
      tb.hidden = false;
      tb.dataset.text = text;
    }, 10);
  });
  document.addEventListener('mousedown', (e) => {
    if (!e.target.closest('.sel-toolbar')) tb.hidden = true;
  });
  $('#stbAsk').addEventListener('click', () => {
    askAI(`请帮我解释这一段：「${tb.dataset.text}」`);
    tb.hidden = true;
    window.getSelection()?.removeAllRanges();
  });
  $('#stbArchive').addEventListener('click', () => {
    const c = CARDS.find(x => x.id === State.cardId);
    addNote({
      title: c ? `${c.id} · 选段` : '选段笔记',
      content: tb.dataset.text,
      source: State.cardId || State.phaseId,
    });
    tb.hidden = true;
  });
}

// ============================================================
//  发布 / 开张大吉
// ============================================================
function openPublish() {
  if (!requireLogin()) return;
  if (State.points < 10) {
    toast('积分不足 10 — 再去给 2 个作品留有用反馈就够了', 'warn', 2400);
  }
  $('#modalPublish').hidden = false;
}


State.pendingScreenshots = State.pendingScreenshots || [];

function renderScreenshotThumbs() {
  const box = $('#screenshotThumbs');
  if (!box) return;
  box.innerHTML = '';
  const shots = State.pendingScreenshots || [];
  if (!shots.length) {
    box.innerHTML = '<div class="su-empty">还没有截图。建议至少上传 1 张，广场卡片会更好看。</div>';
    return;
  }
  shots.forEach((shot, i) => {
    const item = html(`<div class="su-thumb"><img src="${shot.data}" alt="截图 ${i+1}"/><button type="button" title="删除">×</button><span>${i+1}</span></div>`);
    item.querySelector('button').addEventListener('click', () => { State.pendingScreenshots.splice(i,1); renderScreenshotThumbs(); });
    box.appendChild(item);
  });
}

function imageFileToBitmap(file) {
  if ('createImageBitmap' in window) return createImageBitmap(file);
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

async function compressImageFile(file, maxW = 1600, quality = 0.82) {
  const bitmap = await imageFileToBitmap(file);
  const ratio = bitmap.width && bitmap.height ? bitmap.width / bitmap.height : 1.6;
  const w = Math.min(maxW, bitmap.width || maxW);
  const h = Math.round(w / ratio);
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#111'; ctx.fillRect(0,0,w,h);
  ctx.drawImage(bitmap, 0, 0, w, h);
  const data = canvas.toDataURL('image/webp', quality);
  return { type:'upload', data, name:file.name, caption:'作品截图', width:w, height:h, size:data.length };
}

async function handleScreenshotFiles(files) {
  const list = Array.from(files || []).filter(f => f.type.startsWith('image/'));
  if (!list.length) return;
  State.pendingScreenshots = State.pendingScreenshots || [];
  for (const file of list) {
    if (State.pendingScreenshots.length >= 5) { toast('最多上传 5 张截图', 'warn'); break; }
    try {
      toast('正在压缩截图…', 'ok', 900);
      const shot = await compressImageFile(file);
      State.pendingScreenshots.push(shot);
    } catch (e) {
      toast('图片压缩失败：' + (e.message || e), 'err');
    }
  }
  renderScreenshotThumbs();
}

function handlePublish(formData) {
  const w = {
    id: 'local-' + Date.now(),
    name: formData.get('name'),
    tagline: formData.get('tagline'),
    type: formData.get('type'),
    stack: (formData.get('stack') || '').split(/[,，]/).map(s => s.trim()).filter(Boolean),
    status: formData.get('status'),
    link: formData.get('link'),
    wants: formData.get('wants'),
    promo: [],
    screenshots: [...(State.pendingScreenshots || [])],
    likes: 0, bookmarks: 0, comments: 0,
    cover: {
      gradient: [
        ['#3B82F6','#6366F1'],['#A855F7','#EC4899'],['#F59E0B','#EF4444'],
        ['#10B981','#06B6D4'],['#EC4899','#F59E0B'],['#06B6D4','#3B82F6'],
        ['#D97706','#92400E'],['#65A30D','#16A34A'],['#D4452E','#C2410C'],
        ['#6366F1','#1E293B'],
      ][Date.now() % 10],
      pattern: ['grid','dots','circuit','wave','lines'][Date.now() % 5],
    },
    publishedAt: todayStr(),
    author: { name: State.user?.name || '匿名', avatar: (State.user?.name || '?').charAt(0), tone: '#3B82F6' },
  };
  State.worksLocal.unshift(w);
  State.pendingScreenshots = [];
  renderScreenshotThumbs();
  State.points = Math.max(0, State.points - 10);
  saveState();
  $('#modalPublish').hidden = true;
  $('#publishForm').reset();
  showCeremony(w);
  setTimeout(() => { switchRoute('square'); }, 1600);
}

function showCeremony(w) {
  const cer = $('#ceremony');
  $('#cerTitle').textContent = State.worksLocal.length > 1 ? '又开一家分店！' : '恭喜开张！';
  $('#cerSub').textContent = `《${w.name}》 — ${w.tagline}`;
  cer.hidden = false;
  // 生成真正可保存的喜报 PNG
  setTimeout(() => generatePoster(w), 60);
  // confetti
  burstConfetti(cer);
  const dismiss = () => { cer.hidden = true; cer.removeEventListener('click', dismiss); };
  cer.addEventListener('click', dismiss);
  setTimeout(dismiss, 5000);
}

function loadImage(src) { return new Promise((resolve,reject)=>{ const img=new Image(); img.onload=()=>resolve(img); img.onerror=reject; img.src=src; }); }
async function generatePoster(w) {
  const old = document.querySelector('.poster-actions');
  old?.remove();
  const canvas = document.createElement('canvas');
  canvas.width = 1080; canvas.height = 1350;
  const ctx = canvas.getContext('2d');
  const grd = ctx.createLinearGradient(0,0,1080,1350);
  grd.addColorStop(0, '#0E0F12'); grd.addColorStop(1, '#1E293B');
  ctx.fillStyle = grd; ctx.fillRect(0,0,1080,1350);
  ctx.fillStyle = 'rgba(59,130,246,.16)'; ctx.beginPath(); ctx.arc(180,160,360,0,Math.PI*2); ctx.fill();
  ctx.fillStyle = '#1C1E24'; roundRect(ctx, 90, 130, 900, 980, 36); ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,.12)'; ctx.lineWidth = 2; ctx.stroke();
  ctx.fillStyle = '#D4452E'; roundRect(ctx, 790, 190, 130, 130, 16); ctx.fill();
  ctx.fillStyle = '#FFF7E6'; ctx.font = 'bold 42px serif'; ctx.fillText('開張', 812, 245); ctx.fillText('大吉', 812, 295);
  ctx.fillStyle = '#fff'; ctx.font = '600 72px -apple-system,Segoe UI,sans-serif'; ctx.fillText(w.name || '我的产品', 150, 420);
  ctx.fillStyle = 'rgba(255,255,255,.72)'; ctx.font = '34px -apple-system,Segoe UI,sans-serif'; wrapText(ctx, w.tagline || '', 150, 500, 760, 48);
  ctx.fillStyle = '#23262D'; roundRect(ctx, 150, 650, 780, 300, 28); ctx.fill();
  const firstShot = w.screenshots && w.screenshots[0] && w.screenshots[0].type === 'upload' ? w.screenshots[0].data : null;
  if (firstShot) {
    try {
      const img = await loadImage(firstShot);
      ctx.save(); roundRect(ctx, 170, 670, 740, 250, 20); ctx.clip();
      const iw = img.width, ih = img.height, boxW = 740, boxH = 250;
      const scale = Math.max(boxW/iw, boxH/ih);
      const dw = iw*scale, dh = ih*scale;
      ctx.drawImage(img, 170 + (boxW-dw)/2, 670 + (boxH-dh)/2, dw, dh);
      ctx.restore();
    } catch {}
  } else {
    ctx.fillStyle = '#3B82F6'; ctx.font = '600 36px -apple-system,Segoe UI,sans-serif'; ctx.fillText('我在开张发布了一个作品', 190, 760);
    ctx.fillStyle = 'rgba(255,255,255,.62)'; ctx.font = '28px -apple-system,Segoe UI,sans-serif'; ctx.fillText('学 → 做 → 成', 190, 820); ctx.fillText('kaizhang.app', 190, 875);
  }
  ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.font = '24px -apple-system,Segoe UI,sans-serif'; ctx.fillText(new Date().toLocaleDateString(), 150, 1190);
  ctx.fillStyle = '#fff'; ctx.font = '500 28px -apple-system,Segoe UI,sans-serif'; ctx.fillText('开张 KAIZHANG', 150, 1240);
  const url = canvas.toDataURL('image/png');
  const actions = html(`<div class="poster-actions"><a class="btn-primary mini" download="kaizhang-poster.png" href="${url}">保存喜报 PNG</a><button class="btn-ghost mini" id="copyPosterText">复制分享文案</button></div>`);
  actions.querySelector('#copyPosterText').addEventListener('click', () => { navigator.clipboard?.writeText(`我在开张发布了《${w.name}》：${w.tagline}`); toast('分享文案已复制', 'ok'); });
  document.querySelector('.cer-stamp')?.appendChild(actions);
}

function roundRect(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();}
function wrapText(ctx,text,x,y,maxWidth,lineHeight){const words=String(text).split('');let line='';for(const ch of words){const test=line+ch;if(ctx.measureText(test).width>maxWidth&&line){ctx.fillText(line,x,y);line=ch;y+=lineHeight;}else line=test;}if(line)ctx.fillText(line,x,y);}

function burstConfetti(host) {
  const N = 28;
  for (let i = 0; i < N; i++) {
    const p = document.createElement('span');
    const color = ['#D4452E','#EBA400','#fff','#FECACA','#FBBF24'][i % 5];
    p.style.cssText = `position:absolute;left:50%;top:30%;width:8px;height:10px;background:${color};border-radius:2px;z-index:3;
      transform: translate(-50%,-50%);
      animation: cf ${1 + Math.random() * 1.2}s var(--easing) forwards;`;
    const dx = (Math.random() - 0.5) * 600;
    const dy = (Math.random() * 400) + 100;
    p.style.setProperty('--dx', dx + 'px');
    p.style.setProperty('--dy', dy + 'px');
    host.appendChild(p);
    setTimeout(() => p.remove(), 2300);
  }
}

// Add confetti keyframes (one-time)
const styleTag = document.createElement('style');
styleTag.textContent = `@keyframes cf { to { transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) rotate(720deg); opacity: 0; } }`;
document.head.appendChild(styleTag);

// ============================================================
//  History drawer
// ============================================================
function openHistory() {
  const d = $('#historyDrawer');
  const list = $('#historyList');
  list.innerHTML = '';
  State.history.forEach(c => {
    const it = html(`<div class="drawer-item ${c.id === State.currentChatId ? 'active' : ''}" data-id="${c.id}">
      <div class="di-title">${escapeHtml(c.title || '未命名')}</div>
      <div class="di-meta">${c.messages.length} 条 · ${new Date(c.ts).toLocaleString()}</div>
    </div>`);
    it.addEventListener('click', () => {
      State.currentChatId = c.id;
      saveState(); renderAIThread(); d.hidden = true;
    });
    list.appendChild(it);
  });
  d.hidden = false;
}

function newChat() {
  if (!requireLogin()) return;
  const c = { id: 'c-' + Date.now(), title: '新对话', ts: Date.now(), messages: [] };
  State.history.unshift(c);
  State.currentChatId = c.id;
  saveState(); renderAIThread();
  toast('已开新对话线程', 'ok');
}

// ============================================================
//  CMD 控制台
// ============================================================
function openCmd() {
  $('#cmdConsole').hidden = false;
  setTimeout(() => $('#cmdInput').focus(), 50);
  if (!$('#cmdBody').children.length) {
    cmdPrint('Welcome to 开张 KAIZHANG console. Try: kaizhang --help', 'out');
  }
}
function cmdPrint(text, type = 'out') {
  const line = html(`<div class="cmd-line ${type}">${escapeHtml(text)}</div>`);
  $('#cmdBody').appendChild(line);
  $('#cmdBody').scrollTop = $('#cmdBody').scrollHeight;
}
function cmdStreamLine(prefix = '') {
  const line = html(`<div class="cmd-line out streaming">${escapeHtml(prefix)}</div>`);
  $('#cmdBody').appendChild(line);
  $('#cmdBody').scrollTop = $('#cmdBody').scrollHeight;
  return {
    append(text) {
      line.textContent += text;
      $('#cmdBody').scrollTop = $('#cmdBody').scrollHeight;
    },
    done() { line.classList.remove('streaming'); }
  };
}
async function runCmd(raw) {
  cmdPrint(raw, 'in');
  const cmd = raw.trim();
  if (!cmd) return;
  if (/^(kaizhang|开张)\s*(--help|-h)?$/.test(cmd)) {
    cmdPrint(`USAGE:
  kaizhang --help            show this help
  ask <question>             ask AI copilot
  goto <route>               learn | skills | square | me
  card <id>                  open card (e.g. card A-01)
  notes                      list notes
  points                     show points
  almanac                    today's 宜忌
  sudo make me a product     :)
  clear                      clear console
  exit | Esc                 close console`, 'out');
    return;
  }
  if (cmd === 'clear') { $('#cmdBody').innerHTML = ''; return; }
  if (cmd === 'exit') { $('#cmdConsole').hidden = true; return; }
  if (cmd === 'notes') { cmdPrint(State.notes.length ? State.notes.map(n => '- ' + n.title).join('\n') : '(empty)', 'out'); return; }
  if (cmd === 'points') { cmdPrint('points: ' + State.points, 'out'); return; }
  if (cmd === 'almanac') {
    const a = computeAlmanac();
    cmdPrint(`宜: ${a.yi.join(' / ')}\n忌: ${a.ji.join(' / ')}\n今日手气: ${a.model} · 流量吉位: ${a.pos} · 宜搭档: ${a.buddy}`, 'out');
    return;
  }
  if (cmd === 'sudo make me a product') {
    cmdPrint('Permission denied. (Tip: 产品不是 sudo 出来的，是 vibe 出来的。)', 'err');
    return;
  }
  if (cmd.startsWith('goto ')) {
    const r = cmd.slice(5).trim();
    if (['learn','skills','square','me'].includes(r)) { switchRoute(r); $('#cmdConsole').hidden = true; }
    else cmdPrint('unknown route: ' + r, 'err');
    return;
  }
  if (cmd.startsWith('card ')) {
    const id = cmd.slice(5).trim();
    if (CARDS.find(c => c.id === id)) { openCard(id); $('#cmdConsole').hidden = true; }
    else cmdPrint('no such card: ' + id, 'err');
    return;
  }
  if (cmd.startsWith('ask ')) {
    const q = cmd.slice(4).trim();
    if (!q) { cmdPrint('usage: ask <question>', 'err'); return; }
    const line = cmdStreamLine('店小二: ');
    let got = false;
    try {
      await streamChat({
        messages: [
          { role: 'system', content: '你是开张 CMD 控制台里的店小二。只能输出纯文本，不要 Markdown，不要 JSON，不要标题层级，不要代码围栏。用中文，简短直接。' },
          { role: 'user', content: q }
        ],
        onDelta: (d) => { got = true; line.append(d); }
      });
      if (!got) line.append('(empty)');
      line.done();
    } catch (e) {
      line.done();
      cmdPrint('ask failed: ' + (e.message || e), 'err');
    }
    return;
  }
  cmdPrint('unknown command. type: kaizhang --help', 'err');
}

// ============================================================
//  今日宜忌
// ============================================================
function computeAlmanac() {
  const d = todayStr();
  const rnd = seededRand(d);
  const pick = (arr, n = 3) => {
    const cp = [...arr]; const out = [];
    for (let i = 0; i < n && cp.length; i++) {
      const idx = Math.floor(rnd() * cp.length);
      out.push(cp.splice(idx, 1)[0]);
    }
    return out;
  };
  return {
    yi: pick(ALMANAC_POOL.yi, 4),
    ji: pick(ALMANAC_POOL.ji, 4),
    model: pick(ALMANAC_POOL.model, 1)[0],
    pos: pick(ALMANAC_POOL.pos, 1)[0],
    buddy: pick(ALMANAC_POOL.buddy, 1)[0],
  };
}
function renderAlmanac() {
  const a = computeAlmanac();
  $('#alYi').innerHTML = a.yi.map(s => `<li>${escapeHtml(s)}</li>`).join('');
  $('#alJi').innerHTML = a.ji.map(s => `<li>${escapeHtml(s)}</li>`).join('');
  $('#alModel').textContent = a.model;
  $('#alPos').textContent = a.pos;
  $('#alBuddy').textContent = a.buddy;
}

// ============================================================
//  老板跳 Bug 游戏（Canvas）
// ============================================================
function startBossGame() {
  const game = $('#bossGame');
  game.hidden = false;
  const cv = $('#bgCanvas');
  const ctx = cv.getContext('2d');
  // Match canvas to its visible CSS size for crisp rendering
  const rect = cv.getBoundingClientRect();
  if (rect.width && rect.height) {
    cv.width = Math.round(rect.width);
    cv.height = Math.round(rect.height);
  }
  const W = cv.width, H = cv.height;
  const GROUND = H - 22;
  let player = { x: 50, y: GROUND - 32, w: 22, h: 32, vy: 0, ducking: false };
  let bugs = [];
  let score = 0;
  let high = parseInt(localStorage.getItem('kz.bg.high') || '0', 10);
  let speed = 3.6;          // 起步更慢
  let running = true;
  let frame = 0;

  $('#bgHigh').textContent = high;
  function spawn() {
    // 更稀疏 + 上限 — 不要刷屏
    const max = score < 200 ? 1 : 2;
    if (bugs.length >= max) return;
    // 起始空白期：前 80 帧不刷怪
    if (frame < 80) return;
    const rate = 0.010 + Math.min(0.018, frame / 10000);
    if (Math.random() < rate) {
      const lastX = bugs.length ? bugs[bugs.length - 1].x : W + 999;
      // 保证两次怪间距足够远
      if (W - lastX > 0 && lastX > W - 220) return;
      const air = Math.random() < 0.2;
      bugs.push(air
        ? { x: W, y: GROUND - 50, w: 22, h: 16, type: 'err' }
        : { x: W, y: GROUND - 16, w: 18, h: 16, type: 'bug' });
    }
  }
  function jump() { if (player.y >= GROUND - 32 - 1) player.vy = -10.8; }
  function duck(on) { player.ducking = on; player.h = on ? 22 : 32; }
  function reset() { player.y = GROUND - 32; player.vy = 0; bugs = []; score = 0; speed = 3.6; frame = 0; running = true; loop(); }

  function loop() {
    if (!running) return;
    frame++;
    ctx.clearRect(0, 0, W, H);
    // ground
    ctx.fillStyle = '#2A2D34';
    ctx.fillRect(0, GROUND, W, 2);
    // ground tiles
    ctx.strokeStyle = 'rgba(255,255,255,.05)';
    for (let i = 0; i < W; i += 28) {
      const ox = -((frame * speed) % 28);
      ctx.beginPath(); ctx.moveTo(i + ox, GROUND); ctx.lineTo(i + ox + 14, GROUND + 8); ctx.stroke();
    }
    // player physics
    player.vy += 0.50;
    player.y += player.vy;
    if (player.y > GROUND - player.h) { player.y = GROUND - player.h; player.vy = 0; }
    const primary = getComputedStyle(document.body).getPropertyValue('--primary').trim() || '#3B82F6';
    // body
    ctx.fillStyle = primary;
    ctx.fillRect(player.x, player.y + 4, player.w, player.h - 4);
    // head
    ctx.fillStyle = '#fff7e6';
    ctx.fillRect(player.x + 5, player.y - 2, player.w - 10, 8);
    // product box
    ctx.fillStyle = '#D4452E';
    ctx.fillRect(player.x + 3, player.y + 12, player.w - 6, 8);

    spawn();
    for (const b of bugs) {
      b.x -= speed;
      if (b.type === 'err') {
        ctx.fillStyle = '#E65C53';
        ctx.fillRect(b.x, b.y, b.w, b.h);
        ctx.fillStyle = '#fff';
        ctx.font = '10px monospace';
        ctx.fillText('!', b.x + 9, b.y + 12);
      } else {
        ctx.fillStyle = '#E65C53';
        ctx.beginPath();
        ctx.ellipse(b.x + 9, b.y + 7, 9, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#0E0F12';
        ctx.fillRect(b.x + 4, b.y + 5, 2, 2);
        ctx.fillRect(b.x + 12, b.y + 5, 2, 2);
      }
    }
    bugs = bugs.filter(b => b.x + b.w > -2);

    // collision — 稍小的 hitbox 让游戏更宽容
    for (const b of bugs) {
      const px = player.x + 3, py = player.y + 2, pw = player.w - 6, ph = player.h - 4;
      if (b.x < px + pw && b.x + b.w > px && b.y < py + ph && b.y + b.h > py) {
        running = false;
        if (score > high) { high = score; localStorage.setItem('kz.bg.high', String(high)); }
        ctx.fillStyle = 'rgba(0,0,0,.55)';
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = '#fff';
        ctx.font = '14px ui-sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('被 bug 撞了，重来一次？', W/2, H/2 - 8);
        ctx.font = '11px ui-sans-serif';
        ctx.fillStyle = '#aaa';
        ctx.fillText(`得分 ${score} · 最高 ${high} · 按 R 重来 · Esc 退出`, W/2, H/2 + 14);
        ctx.textAlign = 'start';
        return;
      }
    }
    score++;
    if (score % 200 === 0) speed += 0.18;  // 更慢加速
    $('#bgScore').textContent = score;
    $('#bgHigh').textContent = high;
    requestAnimationFrame(loop);
  }

  function onKey(e) {
    if (game.hidden) return;
    if (e.code === 'Escape') { game.hidden = true; running = false; window.removeEventListener('keydown', onKey); window.removeEventListener('keyup', onKeyUp); return; }
    if (e.code === 'KeyP') { running = !running; if (running) loop(); return; }
    if (e.code === 'KeyR' && !running) { reset(); return; }
    if (e.code === 'Space' || e.code === 'ArrowUp') { e.preventDefault(); jump(); }
    if (e.code === 'ArrowDown') { duck(true); }
  }
  function onKeyUp(e) {
    if (e.code === 'ArrowDown') duck(false);
  }
  window.addEventListener('keydown', onKey);
  window.addEventListener('keyup', onKeyUp);
  $('#bgClose') && ($('#bgClose').onclick = () => { game.hidden = true; running = false; window.removeEventListener('keydown', onKey); window.removeEventListener('keyup', onKeyUp); });
  $('.bwl.r', game)?.addEventListener('click', () => { game.hidden = true; running = false; window.removeEventListener('keydown', onKey); window.removeEventListener('keyup', onKeyUp); });
  cv.addEventListener('click', jump);
  loop();
}

// ============================================================
//  Splitter (拖拽)
// ============================================================
function setupSplitter() {
  $$('.splitter').forEach(sp => {
    let startX, startWidth, target;
    const which = sp.dataset.split;
    sp.addEventListener('mousedown', (e) => {
      sp.classList.add('dragging');
      startX = e.clientX;
      target = which === 'left' ? $('#colLeft') : $('#colRight');
      startWidth = target.getBoundingClientRect().width;
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      function move(ev) {
        const dx = ev.clientX - startX;
        const w = which === 'left' ? startWidth + dx : startWidth - dx;
        target.style.width = Math.max(parseInt(getComputedStyle(target).minWidth) || 100, Math.min(parseInt(getComputedStyle(target).maxWidth) || 800, w)) + 'px';
      }
      function up() {
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        sp.classList.remove('dragging');
      }
      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
    });
  });
}

// ============================================================
//  自适应 textarea
// ============================================================
function autoGrow(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 200) + 'px';
}

// ============================================================
//  事件绑定
// ============================================================
function bindEvents() {
  // P01 welcome submit
  $('#welcomeForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const text = $('#welcomeInput').value.trim();
    $('#welcomeInput').value = '';
    enterWorkbench('learn');
    if (text) {
      // 进入工作台后把文字塞进右栏 AI 输入框
      setTimeout(() => {
        const ai = $('#aiInput');
        ai.value = text;
        autoGrow(ai);
        // 若未登录 → 弹邀请码框，把 text 记下来等登录后接着发
        if (!State.user) {
          State.pendingWelcomeQuestion = text;
          $('#modalLogin').hidden = false;
          setTimeout(() => $('#inviteInput')?.focus(), 50);
          toast('登录后会自动发送你的问题', 'warn');
          return;
        }
        sendAIMessage();
      }, 220);
    }
  });
  $('#welcomeInput').addEventListener('input', e => autoGrow(e.target));
  // Enter 直接提交（Shift+Enter 换行）
  $('#welcomeInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
      e.preventDefault();
      $('#welcomeForm').requestSubmit ? $('#welcomeForm').requestSubmit() : $('#welcomeSend').click();
    }
  });
  $('#welcomeMic').addEventListener('click', () => toggleVoice($('#welcomeInput'), $('#welcomeMic')));
  $('#welcomeAttach').addEventListener('click', () => {
    enterWorkbench('learn');
    setTimeout(() => $('#aiAttachBtn').click(), 200);
  });

  // tabs already bound by bindCoreTabsOnce()

  // login
  $('#btnLogin').addEventListener('click', () => {
    if (State.user) {
      if (confirm('退出登录？本地数据不会丢失。')) {
        State.user = null; saveState();
        $('#loginText').textContent = '登录';
        $('#userName').textContent = '游客 · 未登录';
        $('#userAvatar').textContent = '游';
      }
    } else $('#modalLogin').hidden = false;
  });
  $('#loginClose').addEventListener('click', () => $('#modalLogin').hidden = true);
  $('#inviteOK').addEventListener('click', () => {
    if (loginWith($('#inviteInput').value)) $('#aiInput').focus();
  });
  $('#inviteTry').addEventListener('click', () => loginWith('DEMO'));
  $('#inviteInput').addEventListener('keydown', e => { if (e.key === 'Enter') $('#inviteOK').click(); });

  // theme
  $('#btnTheme').addEventListener('click', () => {
    document.body.classList.toggle('theme-light');
    document.body.classList.toggle('theme-dark');
    localStorage.setItem('kz.theme', document.body.classList.contains('theme-light') ? 'light' : 'dark');
  });

  // CMD
  $('#btnCmd').addEventListener('click', openCmd);
  $('#btnBugGame')?.addEventListener('click', startBossGame);
  $('#cmdClose').addEventListener('click', () => $('#cmdConsole').hidden = true);
  $('#cmdInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { const v = e.target.value; e.target.value = ''; runCmd(v); }
    if (e.key === 'Escape') $('#cmdConsole').hidden = true;
  });

  // AI input
  $('#aiInput').addEventListener('input', e => autoGrow(e.target));
  $('#aiInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendAIMessage(); }
  });
  $('#aiSendBtn').addEventListener('click', sendAIMessage);
  $('#aiMicBtn').addEventListener('click', () => toggleVoice($('#aiInput'), $('#aiMicBtn')));
  $('#aiAttachBtn').addEventListener('click', () => $('#fileInput').click());
  $('#fileInput').addEventListener('change', async (e) => {
    for (const f of e.target.files) {
      const data = await fileToDataURL(f);
      State.aiAttachments = State.aiAttachments || [];
      State.aiAttachments.push({ type: 'image', data, name: f.name });
    }
    renderAttachPreview();
    e.target.value = '';
  });
  $('#aiCardCtx').addEventListener('click', () => {
    if (!State.cardId) return toast('当前没有打开的卡片', 'warn');
    State.aiAttachCard = true;
    toast('已挂载当前卡片到下一条提问', 'ok');
  });
  $('#aiHistoryBtn').addEventListener('click', openHistory);
  $('#aiNewBtn').addEventListener('click', newChat);
  $('#historyClose').addEventListener('click', () => $('#historyDrawer').hidden = true);

  // persona toggle
  $('#personaToggle').addEventListener('change', (e) => {
    State.spicy = e.target.checked;
    $('#psLabel').textContent = State.spicy ? '毒舌' : '鼓励';
    saveState();
    if (State.spicy) toast('前辈说话比较冲，但都是为你好', 'warn', 2500);
  });

  // Phase nav prev/next
  $('#centerPrev').addEventListener('click', () => navCard(-1));
  $('#centerNext').addEventListener('click', () => navCard(1));
  $('#centerArchive').addEventListener('click', () => {
    if (!State.cardId) return;
    const c = CARDS.find(x => x.id === State.cardId);
    const text = $('#centerScroll').innerText.slice(0, 600);
    addNote({ title: `${c.id} · ${c.title}`, content: text, source: c.id });
  });

  // user pill
  $('#userPill').addEventListener('click', () => {
    if (!State.user) $('#modalLogin').hidden = false;
    else switchRoute('me');
  });

  // global note modal
  $('#btnQuickNote')?.addEventListener('click', () => openNoteModal());
  $('#newNoteBtn').addEventListener('click', () => openNoteModal());
  $('#noteClose')?.addEventListener('click', closeNoteModal);
  $('#noteClear')?.addEventListener('click', () => { $('#noteTitle').value = ''; $('#noteBody').value = ''; $('#noteTitle').focus(); });
  $('#noteUseSelection')?.addEventListener('click', () => {
    const text = window.getSelection()?.toString().trim();
    if (!text) return toast('当前没有选中文本', 'warn');
    const body = $('#noteBody');
    body.value = body.value ? body.value + '\n\n' + text : text;
    body.focus(); autoGrow(body);
  });
  $('#noteVoiceBtn')?.addEventListener('click', () => toggleVoice($('#noteBody'), $('#noteVoiceBtn')));
  $('#noteForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    addNote({ title: $('#noteTitle').value.trim(), content: $('#noteBody').value.trim(), source: $('#noteSource').value.trim() || currentNoteSource() });
    closeNoteModal();
    if (State.route === 'me' && State.meTab === 'notes') renderCenter();
  });

  // publish form
  $('#publishClose').addEventListener('click', () => $('#modalPublish').hidden = true);
  $('#pickScreenshots')?.addEventListener('click', () => $('#screenshotInput').click());
  $('#screenshotInput')?.addEventListener('change', (e) => { handleScreenshotFiles(e.target.files); e.target.value = ''; });
  $('#screenshotDrop')?.addEventListener('dragover', e => { e.preventDefault(); $('#screenshotDrop').classList.add('dragover'); });
  $('#screenshotDrop')?.addEventListener('dragleave', () => $('#screenshotDrop').classList.remove('dragover'));
  $('#screenshotDrop')?.addEventListener('drop', e => { e.preventDefault(); $('#screenshotDrop').classList.remove('dragover'); handleScreenshotFiles(e.dataTransfer.files); });
  $('#publishForm').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!requireLogin()) return;
    if (State.points < 10) { toast('积分不足 10', 'warn'); return; }
    handlePublish(new FormData(e.target));
  });
  $('#publishAIDraft').addEventListener('click', async () => {
    const fd = new FormData($('#publishForm'));
    const name = String(fd.get('name') || '').trim();
    if (!name) { toast('先填写产品名，再让店小二写宣发物料', 'warn'); $('#publishForm [name="name"]').focus(); return; }
    const tag = String(fd.get('tagline') || '').trim();
    const draft = $('#promoDraft');
    draft.value = '店小二正在写宣发物料...';
    const prompt = `请为这个产品生成发布物料，返回普通文本即可：
产品名：${name}
一句话：${tag || '未填写'}
状态：${fd.get('status') || ''}
请输出：1）Product Hunt tagline 2）X 开头 3）小红书标题+正文 4）即刻动态 5）三条评论区回复。`;
    try {
      let out = '';
      await streamChat({ messages: [{ role:'user', content: prompt }], onDelta: d => { out += d; draft.value = out; } });
      toast('宣发物料已填入表单', 'ok');
    } catch (e) {
      draft.value = `生成失败：${e.message || e}`;
      toast('宣发生成失败，已显示原因', 'err');
    }
  });

  // almanac
  renderAlmanac();
  $('#almanacFab').addEventListener('click', () => {
    const al = $('#almanac');
    al.hidden = !al.hidden;
    if (!al.hidden) renderAlmanac();
  });
  $('#alClose').addEventListener('click', () => $('#almanac').hidden = true);
  $('#alReroll').addEventListener('click', () => {
    // 用 random seed
    ALMANAC_POOL._seed = Math.random();
    // Force fresh by shuffling display
    $('#alYi').innerHTML = ALMANAC_POOL.yi.sort(() => Math.random() - .5).slice(0,4).map(s => `<li>${escapeHtml(s)}</li>`).join('');
    $('#alJi').innerHTML = ALMANAC_POOL.ji.sort(() => Math.random() - .5).slice(0,4).map(s => `<li>${escapeHtml(s)}</li>`).join('');
    $('#alModel').textContent = ALMANAC_POOL.model[Math.floor(Math.random() * ALMANAC_POOL.model.length)];
    $('#alPos').textContent = ALMANAC_POOL.pos[Math.floor(Math.random() * ALMANAC_POOL.pos.length)];
    $('#alBuddy').textContent = ALMANAC_POOL.buddy[Math.floor(Math.random() * ALMANAC_POOL.buddy.length)];
    toast('再抽一签 🎲', 'ok');
  });
  $('#alShare').addEventListener('click', () => {
    const a = computeAlmanac();
    const txt = `📜 今日宜忌（开张黄历）
宜：${a.yi.join('、')}
忌：${a.ji.join('、')}
今日手气：${a.model} · 流量吉位：${a.pos} · 宜搭档：${a.buddy}
— from 开张 KAIZHANG`;
    navigator.clipboard?.writeText(txt);
    toast('文案已复制 · 去发小红书 / 即刻吧', 'ok');
  });

  // Easter egg: click status dot to start boss game
  $('.sb-dot').addEventListener('click', startBossGame);

  // global escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      $$('.modal').forEach(m => { if (!m.hidden) m.hidden = true; });
      const al = $('#almanac'); if (!al.hidden) al.hidden = true;
      const hd = $('#historyDrawer'); if (!hd.hidden) hd.hidden = true;
    }
  });

  // Window controls
  $('.tl-close')?.addEventListener('click', () => {
    if (confirm('关闭工作台？（其实只是回到欢迎页）')) {
      $('#route-work').hidden = true;
      $('#route-welcome').hidden = false;
    }
  });
  $('.tl-max')?.addEventListener('click', () => {
    document.querySelector('.mac-window').classList.toggle('maxed');
  });
}

function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

function navCard(dir) {
  if (!State.cardId) return;
  const p = PHASES.find(p => p.cards.includes(State.cardId));
  if (!p) return;
  const i = p.cards.indexOf(State.cardId);
  const next = p.cards[i + dir];
  if (next) openCard(next);
  else toast(dir > 0 ? '已是本 Phase 最后一张' : '已是本 Phase 第一张', 'warn');
}


function mountAlmanacIntoUserFoot() {
  const fab = $('#almanacFab');
  const foot = $('#leftFoot');
  if (fab && foot && fab.parentElement !== foot) {
    fab.classList.add('in-user-foot');
    foot.appendChild(fab);
  }
}


function bindCoreTabsOnce() {
  if (window.__kzCoreTabsBound) return;
  window.__kzCoreTabsBound = true;
  $$('.wtab').forEach(t => t.addEventListener('click', (e) => {
    const route = t.dataset.route;
    if (!route) return;
    try {
      enterWorkbench(route);
    } catch (err) {
      console.error('core tab fallback', err);
      // 最低限度兜底：不要卡死在首页
      $$('.wtab').forEach(x => x.classList.toggle('active', x === t));
      if (route === 'welcome') {
        $('#route-work').hidden = true;
        $('#route-welcome').hidden = false;
      } else {
        $('#route-welcome').hidden = true;
        $('#route-work').hidden = false;
        $('#crumbs').textContent = route + ' · 初始化失败，请查看控制台';
      }
      toast('页面切换时出错：' + (err.message || err), 'err', 5000);
    }
  }));
}

function showRuntimeError(err) {
  console.error(err);
  try { toast('运行时错误：' + (err.message || err), 'err', 8000); } catch {}
}

// ============================================================
//  初始化
// ============================================================
function init() {
  try { bindCoreTabsOnce(); } catch (e) { console.error(e); }
  try { tickDock(); } catch (e) { showRuntimeError(e); }
  try { loadState(); } catch (e) { showRuntimeError(e); }
  // theme
  if (localStorage.getItem('kz.theme') === 'light') {
    document.body.classList.replace('theme-dark', 'theme-light');
  }
  // mermaid theme
  try { if (window.mermaid) {
    window.mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      securityLevel: 'loose',
      flowchart: { curve: 'basis', htmlLabels: true },
      themeVariables: {
        background: '#1C1E24',
        primaryColor: '#23262D',
        primaryTextColor: '#e6e6e6',
        primaryBorderColor: '#3B82F6',
        secondaryColor: '#1F2128',
        tertiaryColor: '#23262D',
        lineColor: '#60A5FA',
        textColor: '#cfd2d8',
        fontFamily: 'ui-sans-serif',
        fontSize: '13px',
      },
    });
  }} catch (e) { showRuntimeError(e); }
  if (State.user) {
    $('#loginText').textContent = State.user.name;
    $('#userName').textContent = State.user.name + ' · ' + State.user.code;
    $('#userAvatar').textContent = State.user.name.charAt(0);
  }
  $('#pointsTxt').textContent = `积分 ${State.points}`;
  $('#phaseTxt').textContent = State.phaseId;
  $('#personaToggle').checked = !!State.spicy;
  $('#psLabel').textContent = State.spicy ? '毒舌' : '鼓励';

  try { renderWelcome(); } catch (e) { showRuntimeError(e); }
  try { bindEvents(); } catch (e) { showRuntimeError(e); }
  try { setupSplitter(); } catch (e) { showRuntimeError(e); }
  try { setupSelectionToolbar(); } catch (e) { showRuntimeError(e); }
  try { setupHoverLight(); } catch (e) { showRuntimeError(e); }
  try { mountAlmanacIntoUserFoot(); } catch (e) { showRuntimeError(e); }
  try { renderAIThread(); } catch (e) { /* welcome 时右栏隐藏，但 DOM 存在 */ }
  window.__KZ_APP_READY__ = true;
}

// 全局 hover 光斑：跟随光标在卡片内移动
function setupHoverLight() {
  const SELECTOR = '.skill-card, .work-card, .j-node, .quick-card, .note-tile, .pd-card';
  document.addEventListener('mousemove', (e) => {
    const t = e.target.closest?.(SELECTOR);
    if (!t) return;
    const r = t.getBoundingClientRect();
    t.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
    t.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
  });
}

document.addEventListener('DOMContentLoaded', init);
