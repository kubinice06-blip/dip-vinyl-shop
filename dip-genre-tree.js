/* 類型挑片 v2 —— 從十大類一路選到細分類型，抽一張。
 *
 * 與「猜你喜歡」（舊的三位藝人品味機制，index.html 內）完全獨立：
 * 這裡不做口味推測，玩家選什麼就抽什麼，選擇與結果之間是直接的。
 *
 * 資料：genre-tree.json（樹）＋ card-subgenres.json（卡片 → 節點路徑），
 * 兩份都是 scripts/build-genre-tree.mjs 產生的靜態檔，走瀏覽器快取，抽卡零 API。
 *
 * 用法（index.html 接線）：
 *   DipGenreTree.configure({ host, loadCardPool, onResult, onError, topOnly, backHref, onBack });
 *   topOnly：只選大類、選了就抽（店內挖寶用，2026-10-07 店主：「只需大分類就好，細分不用」），
 *            大類只列卡池裡有卡的，按鈕附張數。backHref：第一層「回上一頁」要去的頁面；
 *            onBack 給了就改呼叫它（hub 搬進同一份文件後走頁內切換，不換頁）。
 *   DipGenreTree.start();
 *
 * onResult 收到 { artist, album, path, pathZh, ratings } 後，由呼叫端沿用既有的
 * 結果頁渲染（封面／三軸／試聽／收藏／分享），本模組不碰那一段。
 */
(function (global) {
  'use strict';

  const DATA = { tree: null, cards: null, promise: null, covers: {} };   // covers：大類 id → draw-covers/<id>.json
  let cfg = { host: null, loadCardPool: null, onResult: null, onError: null, topOnly: false, backHref: 'find.html', onBack: null };
  const leave = () => { if (cfg.onBack) cfg.onBack(); else location.href = cfg.backHref; };
  let seen = new Set();          // 本次 session 抽過的卡，跨層保留
  let path = [];                 // 目前選到的節點 [{id, zh}]
  let pool = null;               // seed 卡池（由 loadCardPool 提供）

  function configure(next) { cfg = Object.assign(cfg, next); }

  // ── 資料載入（與卡池同批快取；失敗時讓呼叫端顯示錯誤）────────────────
  function loadData() {
    if (!DATA.promise) {
      DATA.promise = Promise.all([
        fetch('genre-tree.json').then(r => { if (!r.ok) throw new Error('曲風資料載入失敗'); return r.json(); }),
        fetch('card-subgenres.json').then(r => { if (!r.ok) throw new Error('曲風資料載入失敗'); return r.json(); }),
      ]).then(([tree, cards]) => { DATA.tree = tree; DATA.cards = cards; return DATA; })
        .catch(e => { DATA.promise = null; throw e; });
    }
    return DATA.promise;
  }

  // ── 分類封面池（抽卡動畫閃卡用；scripts/build-draw-covers.mjs 產生，每大類一檔）────
  // 選到大類就載該檔並預載第一層的封面；越深的節點有自己的清單就用自己的，沒有就退回上層。
  function loadCoverPool(genreId) {
    if (!genreId) return Promise.resolve(null);
    if (!DATA.covers[genreId]) {
      DATA.covers[genreId] = fetch(`draw-covers/${genreId}.json`).then(r => (r.ok ? r.json() : null)).catch(() => null)
        .then(d => { if (d && global.DipDrawAnim) global.DipDrawAnim.preloadCovers(coversFrom(d, [genreId])); return d; });
    }
    return DATA.covers[genreId];
  }
  function coversFrom(d, ids) {
    if (!d || !d.nodes) return null;
    for (let i = ids.length; i >= 1; i--) {
      const list = d.nodes[ids.slice(0, i).join('/')];
      if (list && list.length >= 4) return list.map(k => d.urls[k]).filter(Boolean);
    }
    return null;
  }
  // 同步版：資料還沒到就回 null（呼叫端退回全站池）
  function coversFor(ids) {
    const p = DATA.covers[ids[0]];
    return (p && p._data) ? coversFrom(p._data, ids) : null;
  }
  const rememberPool = (genreId) => loadCoverPool(genreId).then(d => { const p = DATA.covers[genreId]; if (p && d) p._data = d; return d; });

  // ── 抽卡 ──────────────────────────────────────────────────────────
  // 候選＝主類型等於第一層、且落在目前節點的卡。沒選子類型時只看主類型，
  // 這樣未落位的卡（約 16%）也抽得到，不會因為分類沒做到就永遠消失。
  function candidates() {
    const genre = path[0]?.id;
    if (!genre || !pool) return [];
    const wantPath = path.map(p => p.id).join('/');
    const deep = path.length > 1;
    const out = [];
    for (const c of pool.cards) {
      if (c.genres[0] !== genre) continue;
      if (deep) {
        const paths = DATA.cards[`${c.artist}|${c.album}`];
        if (!paths || !paths.some(p => p === wantPath || p.startsWith(wantPath + '/'))) continue;
      }
      out.push(c);
    }
    return out;
  }

  function draw() {
    const all = candidates();
    if (!all.length) return null;
    let fresh = all.filter(c => !seen.has(`${c.artist}|${c.album}`.toLowerCase()));
    // 店內挖寶（topOnly）一類常只有幾張，抽光就把這一類的紀錄清掉重來，不讓客人卡在錯誤頁
    if (!fresh.length && cfg.topOnly) {
      for (const c of all) seen.delete(`${c.artist}|${c.album}`.toLowerCase());
      fresh = all;
    }
    const list = fresh.length ? fresh : null;   // 抽完就回報，不自動重來
    if (!list) return { exhausted: true };
    const c = list[Math.floor(Math.random() * list.length)];
    seen.add(`${c.artist}|${c.album}`.toLowerCase());
    return c;
  }

  // ── 畫面 ──────────────────────────────────────────────────────────
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));
  const host = () => (typeof cfg.host === 'function' ? cfg.host() : cfg.host);

  function render(html) {
    const el = host();
    if (el) el.innerHTML = html;
  }

  // 大類 → 卡池內主類型張數（topOnly 用）
  function topCounts() {
    const n = {};
    for (const c of (pool?.cards || [])) { const g = c.genres[0]; if (g) n[g] = (n[g] || 0) + 1; }
    return n;
  }

  // 晶片＋底部導覽。導覽只放「這一層隨便挑」；「上一層」改到內容區左上（backTop），
  // 跟遊戲頂欄的「↩ 找一張來聽」同位置同樣式，讓人直覺按得到（2026-10-18 店主：
  // 原本在最下方又是虛線，太不明顯）。第一層不另放返回鈕——頂欄那顆就是。
  function chips(items, opts) {
    const o = opts || {};
    const nav = [];
    if (o.any) nav.push('<button class="gt-any" data-gt-any>這一層隨便挑 →</button>');
    if (o.bottomBack) nav.push(`<button class="gt-back" data-gt-back>${o.bottomBack}</button>`);
    return `
      <div class="gt-chips">
        ${items.map(x => `<button class="gt-chip" data-gt-pick="${esc(x.id)}">${esc(x.zh)}${o.counts ? ` <span class="gt-chip-n">${o.counts[x.id]}</span>` : ''}</button>`).join('')}
      </div>
      ${nav.length ? `<div class="gt-nav">${nav.join('')}</div>` : ''}`;
  }
  const backTop = (label) => `<button class="gt-back-top" data-gt-back aria-label="回到上一層">${label}</button>`;

  function currentNode() {
    let node = null, list = DATA.tree.genres;
    for (const step of path) {
      node = list.find(x => x.id === step.id) || null;
      list = node ? (node.children || []) : [];
    }
    return { node, children: list };
  }

  function renderStep() {
    const { node, children } = path.length ? currentNode() : { node: null, children: DATA.tree.genres };
    // 沒有下一層可選就直接抽
    if (path.length && !children.length) return pick();
    if (!path.length && cfg.topOnly) {
      const n = topCounts();
      render(`
        <div class="gt-head">
          <div class="quiz-question">想聽哪一類？</div>
          <div class="gt-sub">選一個大類，從店裡現有的唱片抽一張。</div>
        </div>
        ${chips(DATA.tree.genres.filter(g => n[g.id]), { counts: n })}`);
      return;
    }
    if (!path.length) {
      render(`
        <div class="gt-head">
          <div class="quiz-question">想聽哪一類？</div>
          <div class="gt-sub">選一個大類，再一路選到你要的那種音樂。</div>
        </div>
        ${chips(DATA.tree.genres)}`);
      return;
    }
    render(`
      <div class="gt-head gt-head-deep">
        ${backTop('← 上一層')}
        <div class="gt-crumb">${path.map(p => esc(p.zh)).join(' › ')}</div>
        <div class="quiz-question">${path.length === 1 ? '再細一點' : '還可以更細'}</div>
      </div>
      ${chips(children, { any: true })}`);
  }

  async function pick() {
    const pathZh = path.map(p => p.zh).join(' › ');
    let anim = null;
    if (global.DipDrawAnim) {
      anim = await global.DipDrawAnim.start({
        host: host(), profile: 'front',
        covers: coversFor(path.map(p => p.id)),
        // 與心情選歌／猜你喜歡一致：動畫期間蓋滿視窗。漏了這個就會走非全螢幕，
        // 舞台是白→淺灰漸層（.da-stage），跟純白頁面接不起來，看起來像背景色 bug。
        fullscreen: true,
        alive: () => !!host()?.closest('.quiz-modal')?.classList.contains('open'),
      }).catch(() => null);
    }
    if (!anim) render(`<div class="quiz-loading"><div class="spinner"></div><div class="quiz-loading-text">挖掘中…</div></div>`);

    const card = draw();
    if (!card || card.exhausted) {
      if (anim) { anim.state.fail = true; await anim.done; }
      global.DipDrawAnim?.cancel();
      render(`
        <div class="quiz-error" style="padding:40px 20px;">
          ⚠ ${card ? '這條路上的唱片都抽過了' : '這一層目前沒有唱片'}<br><br>
          <button class="gt-back" data-gt-back>← 換一層</button>
        </div>`);
      return;
    }
    try {
      await cfg.onResult({ card, path: path.map(p => p.id).join('/'), pathZh, anim });
    } catch (e) {
      if (anim) { anim.state.fail = true; await anim.done.catch(() => {}); }
      global.DipDrawAnim?.cancel();
      (cfg.onError || (() => {}))(e);
      render(`<div class="quiz-error" style="padding:40px 20px;">⚠ ${esc(e.message || '出了點問題')}<br><br>
        <button class="gt-back" data-gt-back>← 回上一層</button></div>`);
    }
  }

  // ── 事件（委派在 host 上，重繪不必重綁）──────────────────────────────
  let bound = false;
  function bind() {
    if (bound) return;
    const el = host();
    if (!el) return;
    el.addEventListener('click', (e) => {
      const pickBtn = e.target.closest('[data-gt-pick]');
      if (pickBtn) {
        const id = pickBtn.dataset.gtPick;
        const { children } = path.length ? currentNode() : { children: DATA.tree.genres };
        const node = children.find(x => x.id === id);
        if (node) {
          path.push({ id: node.id, zh: node.zh });
          // 選到大類就載封面池；選到更深的節點就預載該節點自己的封面
          const ids = path.map(p => p.id);
          rememberPool(ids[0]).then(d => { if (d && ids.length > 1 && global.DipDrawAnim) global.DipDrawAnim.preloadCovers(coversFrom(d, ids)); });
          if (cfg.topOnly) pick(); else renderStep();
        }
        return;
      }
      if (e.target.closest('[data-gt-any]')) { pick(); return; }
      if (e.target.closest('[data-gt-back]')) {
        // topOnly 只有一層：大類選單上的「回上一頁」離開；錯誤頁的「換一層」回大類選單
        if (cfg.topOnly) {
          // 大類選單上已不放返回鈕（遊戲頂欄的「↩ 店內挖寶」就是）；錯誤頁的「換一層」回大類選單
          if (e.target.closest('.gt-nav')) leave();
          else { path = []; renderStep(); }
          return;
        }
        if (path.length) { path.pop(); renderStep(); }
        else leave();
        return;
      }
      if (e.target.closest('[data-gt-again]')) { pick(); return; }
      if (e.target.closest('[data-gt-restart]')) { path = []; renderStep(); }
    });
    bound = true;
  }

  async function start() {
    path = [];
    render(`<div class="quiz-loading"><div class="spinner"></div><div class="quiz-loading-text">載入中…</div></div>`);
    try {
      const [, p] = await Promise.all([loadData(), cfg.loadCardPool()]);
      pool = p;
      bind();
      renderStep();
    } catch (e) {
      (cfg.onError || (() => {}))(e);
      render(`<div class="quiz-error" style="padding:40px 20px;">⚠ ${esc(e.message || '載入失敗')}</div>`);
    }
  }

  global.DipGenreTree = { configure, start, loadCoverPool: rememberPool, coversFor, get path() { return path.slice(); } };
})(window);
