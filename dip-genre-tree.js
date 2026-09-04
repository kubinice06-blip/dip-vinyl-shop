/* 類型挑片 v2 —— 從十大類一路選到細分類型，抽一張。
 *
 * 與「猜你喜歡」（舊的三位藝人品味機制，index.html 內）完全獨立：
 * 這裡不做口味推測，玩家選什麼就抽什麼，選擇與結果之間是直接的。
 *
 * 資料：genre-tree.json（樹）＋ card-subgenres.json（卡片 → 節點路徑），
 * 兩份都是 scripts/build-genre-tree.mjs 產生的靜態檔，走瀏覽器快取，抽卡零 API。
 *
 * 用法（index.html 接線）：
 *   DipGenreTree.configure({ host, loadCardPool, onResult, onError });
 *   DipGenreTree.start();
 *
 * onResult 收到 { artist, album, path, pathZh, ratings } 後，由呼叫端沿用既有的
 * 結果頁渲染（封面／三軸／試聽／收藏／分享），本模組不碰那一段。
 */
(function (global) {
  'use strict';

  const DATA = { tree: null, cards: null, promise: null };
  let cfg = { host: null, loadCardPool: null, onResult: null, onError: null };
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
    const fresh = all.filter(c => !seen.has(`${c.artist}|${c.album}`.toLowerCase()));
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

  function chips(items, back) {
    return `
      <div class="gt-chips">
        ${items.map(x => `<button class="gt-chip" data-gt-pick="${esc(x.id)}">${esc(x.zh)}</button>`).join('')}
      </div>
      <div class="gt-nav">
        ${path.length ? `<button class="gt-any" data-gt-any>這一層隨便挑 →</button>` : ''}
        <button class="gt-back" data-gt-back>${back}</button>
      </div>`;
  }

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
    if (!path.length) {
      render(`
        <div class="gt-head">
          <div class="quiz-question">想聽哪一類？</div>
          <div class="gt-sub">選一個大類，再一路選到你要的那種音樂。</div>
        </div>
        ${chips(DATA.tree.genres, '↩ 回上一頁')}`);
      return;
    }
    render(`
      <div class="gt-head">
        <div class="gt-crumb">${path.map(p => esc(p.zh)).join(' › ')}</div>
        <div class="quiz-question">${path.length === 1 ? '再細一點' : '還可以更細'}</div>
      </div>
      ${chips(children, '← 上一層')}`);
  }

  async function pick() {
    const pathZh = path.map(p => p.zh).join(' › ');
    let anim = null;
    if (global.DipDrawAnim) {
      anim = await global.DipDrawAnim.start({
        host: host(), profile: 'front',
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
        if (node) { path.push({ id: node.id, zh: node.zh }); renderStep(); }
        return;
      }
      if (e.target.closest('[data-gt-any]')) { pick(); return; }
      if (e.target.closest('[data-gt-back]')) {
        if (path.length) { path.pop(); renderStep(); }
        else location.href = 'find.html';
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

  global.DipGenreTree = { configure, start, get path() { return path.slice(); } };
})(window);
