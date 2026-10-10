// dip vinyl 藝人介紹：卡片上的藝人名 → 可點的按鈕 → 小視窗。
//
// 頁面只要做兩件事：
//   1. 載入本檔（<script src="dip-artist-intro.js?v=N"></script>）
//   2. 在顯示藝人名的元素上加 data-artist-intro="<卡池藝人欄原字>"
// 其餘（樣式、視窗 DOM、關閉、Esc、捲動鎖）全由本檔處理。
//
// 按鈕只在「分片裡真的有這位的介紹」時才長出來；沒稿的藝人維持原本的純文字，
// 不會出現點了才說「整理中」的空按鈕。所以前端可以先上線，文字批次陸續上架後按鈕自動變多。
// 手法與 dip-player.js 的 upgradeAppleLinks()（2026-09-28）相同：MutationObserver 看新節點。
//
// 資料：/data/artist-intros/manifest.json ＋ <00–63>.json，由 scripts/build-artist-intros.mjs 產生。
(function () {
  'use strict';
  const BASE = '/data/artist-intros/';
  const SKIP = new Set(['various artists']);

  const norm = s => String(s || '').normalize('NFC').trim().toLowerCase();
  // ⚠ 必須與 scripts/build-artist-intros.mjs 的 shardOf() 完全一致
  function shardOf(key, shards) {
    let h = 0x811c9dc5;
    for (let i = 0; i < key.length; i++) {
      h ^= key.charCodeAt(i);
      h = Math.imul(h, 0x01000193) >>> 0;
    }
    return h % shards;
  }

  let manifestP = null;
  const shardP = new Map();
  // 網路失敗不能快取：失敗就把快取清掉，下一次（下一張卡、下一次點擊）再試。
  // 否則手機網路抖一下，這一整個工作階段所有藝人名都不會再變成按鈕。
  // 「分片存在但沒這位」是正常結果，照常快取；只有請求本身失敗才清。
  function loadManifest() {
    if (!manifestP) {
      manifestP = fetch(BASE + 'manifest.json', { cache: 'no-cache' })
        .then(r => {
          if (!r.ok) throw new Error('manifest ' + r.status);
          return /json/.test(r.headers.get('content-type') || '') ? r.json() : null;
        })
        .catch(() => { manifestP = null; return null; });
    }
    return manifestP;
  }
  async function lookup(key) {
    const m = await loadManifest();
    if (!m || !m.count) return null;
    const s = shardOf(key, m.shards || 64);
    if (!shardP.has(s)) {
      const url = `${BASE}${String(s).padStart(2, '0')}.json?v=${encodeURIComponent(m.updatedAt || '')}`;
      // 沒內容的分片不存在：Pages 對不存在的路徑回 200＋index.html，所以要看 content-type，不能只看 ok
      shardP.set(s, fetch(url)
        .then(r => {
          // 不存在的分片：Pages 回 200＋index.html（text/html）→ 當成空分片快取，這是正常結果
          if (r.ok && !/json/.test(r.headers.get('content-type') || '')) return {};
          if (!r.ok) throw new Error('shard ' + r.status);
          return r.json().then(j => (j && j.entries) || {});
        })
        .catch(() => { shardP.delete(s); return {}; }));
    }
    return (await shardP.get(s))[key] || null;
  }

  // ── 樣式（自帶，battle／roguelike 載入本檔即可用）──
  const css = `
  .artist-intro-btn { font: inherit; color: inherit; letter-spacing: inherit; background: none; border: 0; padding: 4px 0; margin: 0; cursor: pointer;
    text-decoration: underline dotted; text-decoration-thickness: 1px; text-underline-offset: 3px; -webkit-tap-highlight-color: transparent; }
  .artist-intro-btn::after { content: ' ›'; }
  .artist-intro-btn:hover, .artist-intro-btn:active, .artist-intro-btn:focus-visible { color: #111; }
  .artist-intro-overlay { position: fixed; inset: 0; z-index: 600; background: rgba(0,0,0,0.55); display: none; align-items: center; justify-content: center; padding: 24px 16px; }
  .artist-intro-overlay.open { display: flex; }
  .artist-intro-box { background: #fff; color: #111; width: 100%; max-width: 420px; max-height: 80vh; overflow-y: auto; padding: 26px 22px 24px; position: relative; text-align: center; box-sizing: border-box; }
  .artist-intro-close { position: absolute; top: 10px; right: 12px; background: none; border: none; font-size: 18px; cursor: pointer; color: var(--gray, #888); line-height: 1; padding: 4px; }
  .artist-intro-label { font-size: 9px; color: var(--gray, #888); letter-spacing: 0.14em; margin-bottom: 14px; }
  .artist-intro-name { font-size: 17px; font-weight: 700; line-height: 1.5; }
  .artist-intro-text { font-size: 12.5px; line-height: 2; text-align: left; padding: 14px; border: 1px solid var(--line, #ddd); margin-top: 14px; }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ── 視窗 ──
  let overlay = null, prevOverflow = '', token = 0;
  function ensureOverlay() {
    if (overlay) return overlay;
    overlay = document.createElement('div');
    overlay.className = 'artist-intro-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML = `<div class="artist-intro-box">
      <button type="button" class="artist-intro-close" aria-label="關閉">✕</button>
      <div class="artist-intro-label">藝人介紹</div>
      <div class="artist-intro-name"></div>
      <div class="artist-intro-text"></div>
    </div>`;
    overlay.addEventListener('click', e => {
      if (e.target === overlay || e.target.closest('.artist-intro-close')) close();
    });
    document.body.appendChild(overlay);
    return overlay;
  }
  function isOpen() { return !!overlay && overlay.classList.contains('open'); }
  async function open(key, fallbackName) {
    const ov = ensureOverlay();
    const my = ++token;
    ov.querySelector('.artist-intro-name').textContent = fallbackName || '';
    ov.querySelector('.artist-intro-text').textContent = '載入介紹…';
    if (!isOpen()) {
      // 捲動鎖要「記住前值、關時還原」：底下常常還開著卡片詳情或專輯介紹，
      // 它們也把 body 設成 hidden；這裡若關閉時設回 ''，底下那層就失去捲動鎖。
      prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      ov.classList.add('open');
    }
    const entry = await lookup(key);
    if (my !== token || !isOpen()) return;
    ov.querySelector('.artist-intro-name').textContent = (entry && entry.name) || fallbackName || '';
    ov.querySelector('.artist-intro-text').textContent = (entry && entry.intro) || '（暫無介紹）';
    ov.querySelector('.artist-intro-close').focus({ preventScroll: true });
  }
  function close() {
    if (!isOpen()) return;
    overlay.classList.remove('open');
    document.body.style.overflow = prevOverflow;
    token++;
  }
  // Esc 只關最上層：掛在 window 的捕獲階段，藝人視窗開著時吃掉這次按鍵，
  // 底下 document 上「Esc 關專輯介紹」那條就不會跟著觸發。
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen()) { e.stopPropagation(); e.preventDefault(); close(); }
  }, true);

  // ── 把藝人名升級成按鈕 ──
  async function upgrade(el) {
    const raw = el.getAttribute('data-artist-intro');
    const key = norm(raw);
    if (!key || SKIP.has(key)) return;
    if (el.dataset.aiDone === key && el.querySelector('.artist-intro-btn')) return;
    el.dataset.aiDone = key;
    const entry = await lookup(key);
    if (!entry || norm(el.getAttribute('data-artist-intro')) !== key) return;
    if (el.querySelector('.artist-intro-btn')) return;
    const label = el.textContent.trim() || entry.name;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'artist-intro-btn';
    btn.dataset.artistKey = key;
    btn.setAttribute('aria-haspopup', 'dialog');
    btn.setAttribute('aria-label', `藝人介紹：${entry.name}`);
    btn.textContent = label;
    el.textContent = '';
    el.appendChild(btn);
  }
  function scan(root) {
    if (!root || root.nodeType !== 1) return;
    if (root.hasAttribute('data-artist-intro')) void upgrade(root);
    root.querySelectorAll('[data-artist-intro]').forEach(el => void upgrade(el));
  }

  document.addEventListener('click', e => {
    const btn = e.target.closest('.artist-intro-btn');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();   // 不要讓外層（卡片、結果頁）把這次點擊當成自己的
    void open(btn.dataset.artistKey, btn.textContent.trim());
  }, true);

  const mo = new MutationObserver(list => {
    for (const m of list) {
      if (m.type === 'attributes') { m.target.removeAttribute('data-ai-done'); void upgrade(m.target); continue; }
      m.addedNodes.forEach(scan);
      // 元素本身沒換、只換了文字（例如專輯介紹視窗每次改 textContent），按鈕會被洗掉，要重掛
      if (m.target.nodeType === 1 && m.target.hasAttribute('data-artist-intro') && !m.target.querySelector('.artist-intro-btn')) {
        m.target.removeAttribute('data-ai-done');
        void upgrade(m.target);
      }
    }
  });
  function start() {
    scan(document.body);
    mo.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-artist-intro'] });
  }
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);

  window.DipArtistIntro = { open, close, lookup, shardOf };
})();
