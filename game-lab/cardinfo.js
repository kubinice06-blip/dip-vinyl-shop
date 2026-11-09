/* game-lab/cardinfo.js：唱片資訊（店主 roguelike 版 openCardInfo 移植；SPEC-v2 §4）。Agent U。
 *
 * window.DipLabCardInfo = {
 *   open(card | cardId, { attr, from }) → Promise<void>   // 關掉時 resolve（duel.js 用它暫停結算、教學用它等「關閉」）
 *   close(), isOpen(), current() → card|null
 *   on('open'|'close', cb) → off()
 *   fetchDesc(card) → Promise<string>                      // /album-desc（只在 DESC_OK 網域打；2.5 s 逾時、快取）
 *   config({ onSoundUnlock(), cardOf(id) })                // ui.js：唱機第一次開聲音時寫存檔；id → 帶改造（洗過）的卡
 * }
 *
 * 版面（由上到下，置中、最寬 360）：唱片資訊 → 封面 200px → 藝人 → 專輯 → 年份 → 王牌徽章 → 三軸色格（這一手的那軸標籤金色）
 *   → 像素唱機（FX().music；點一下停／播）→ 老闆推薦語 → 店家簡介框 → 四平台鈕（烘焙好的連結；執行期不打網路）
 *   → Preview provided courtesy of iTunes → 「關閉」黑色整條（sticky，永遠在畫面底部）。
 * 原始碼：roguelike.html openCardInfo R:L4915–4949、closeCardInfo R:L4874、starsHTML R:L1726、streamingBtnsHtml R:L3748、
 *   .drawmask／.drawcard R:L444–466、.pip R:L69–72、.rogue-mini-player R:L312–326（改名 .lb-mini-player）。CSS 在 style.css。
 * 規則：不用 Firebase；絕不 DipPlayer.mount；只有 #cardInfoMask 吃點擊；封面 draggable=false＋-webkit-touch-callout:none。
 */
(function () {
  'use strict';
  var W = window, D = document;
  var WORKER = 'https://dip-vinyl-worker.kubinice06.workers.dev';
  var ZH = { c: '經典', o: '冷門', h: '硬蕊' };
  var ACE_ZH = { hall: '殿堂', pearl: '流亡', heresy: '異端' };
  // worker 只對正式站、Pages 預覽與 localhost:5179 開 CORS；其他來源（例如本機 8765）不打，主控台不噴錯（B07）
  var DESC_OK = (function () { try { var h = location.hostname; return /(^|\.)dipvinyl\.tw$/.test(h) || /\.pages\.dev$/.test(h) || location.port === '5179'; } catch (_) { return false; } })();
  var CFG = { onSoundUnlock: null, cardOf: null };
  var S = { mask: null, card: null, resolve: null, offMusic: null, offSound: null, prev: null, started: false, keyH: null, lastFocus: null, cbs: { open: [], close: [] } };

  function FX() { return W.DipLabFx || null; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (m) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]; }); }
  function emit(n, a) { S.cbs[n].slice().forEach(function (cb) { try { cb(a); } catch (e) { console.error(e); } }); }
  function lookup(id) {
    if (CFG.cardOf) { try { var m = CFG.cardOf(id); if (m) return m; } catch (_) {} }
    var C = W.DipLabContent; if (C && C.cards && C.cards[id]) return C.cards[id];
    var K = W.DipLabCards; return (K && K[id]) || null;
  }

  // cards.js 的卡 → 原版卡物件（SPEC-v2 §4.3）
  function toOrigCard(c) {
    return { id: c.id, artist: c.artist || '', album: c.album || '', year: c.year || '', coverUrl: c.localCover || c.coverUrl || '',
      classic: c.c | 0, obscurity: c.o | 0, accessibility: c.h | 0, ace: c.tier || null, gold: !!c.gold, previewUrl: c.previewUrl || '', previewResolved: true,
      junk: !!c.junk, pitch: c.pitch || '', _attr: c._attr || null, painted: !!c.painted,
      appleUrl: c.appleUrl || '', spotifyUrl: c.spotifyUrl || '', bandcampUrl: c.bandcampUrl || '' };
  }
  // 原版 starsHTML：平常 5 格；王牌那軸 7 格。這一手出的那軸（act）標籤金色粗體
  function starsHTML(o, act) {
    var rows = [['c', 'classic'], ['o', 'obscurity'], ['h', 'accessibility']];
    return rows.map(function (r) {
      var n = o[r[1]] | 0, tot = n > 5 ? 7 : 5, pips = '';
      for (var i = 0; i < tot; i++) pips += '<span class="pip' + (i < n ? ' on ' + r[0] : '') + '"></span>';
      return '<div class="st' + (act === r[0] ? ' act' : '') + '" data-axis="' + r[0] + '"><span class="sl">' + ZH[r[0]] + '</span><div class="pips" aria-label="' + ZH[r[0]] + ' ' + n + '">' + pips + '</div></div>';
    }).join('');
  }
  // 原版 streamingBtnsHtml：四平台；Apple／Spotify／Bandcamp 用烘焙的直連，沒有就灰（Apple 退回搜尋連結）；YT Music 永遠是搜尋
  function streamingBtnsHtml(o) {
    var q = encodeURIComponent((o.artist + ' ' + o.album).trim());
    var a = function (plat, label, url) {
      return url ? '<a class="streaming-btn" data-platform="' + plat + '" href="' + esc(url) + '" target="_blank" rel="noopener">' + label + '</a>'
        : '<a class="streaming-btn" data-platform="' + plat + '" aria-disabled="true" tabindex="-1">' + label + '</a>';
    };
    return '<div class="streaming-btns">' +
      a('apple', 'Apple Music', o.appleUrl || ('https://music.apple.com/tw/search?term=' + q)) +
      a('spotify', 'Spotify', o.spotifyUrl) +
      a('yt', 'YT Music', 'https://music.youtube.com/search?q=' + q) +
      a('bandcamp', 'Bandcamp', o.bandcampUrl) +
      '</div><div class="stream-attribution">Preview provided courtesy of iTunes</div>';
  }

  // ---- 簡介（ui.js 舊 fetchDesc 搬過來；兩邊共用這一份）
  var descCache = {};
  function fetchDesc(c) {
    if (!c || !DESC_OK) return Promise.resolve('');
    if (descCache[c.id] != null) return Promise.resolve(descCache[c.id]);
    var ctl = W.AbortController ? new AbortController() : null;
    var to = setTimeout(function () { if (ctl) ctl.abort(); }, 2500);
    var url = WORKER + '/album-desc?artist=' + encodeURIComponent(c.artist) + '&album=' + encodeURIComponent(c.album);
    return Promise.race([
      fetch(url, ctl ? { signal: ctl.signal } : {}).then(function (r) { return r.ok ? r.json() : {}; }).then(function (j) { return (j && typeof j.desc === 'string') ? j.desc.trim() : ''; }),
      new Promise(function (r) { setTimeout(function () { r(''); }, 2600); })
    ]).catch(function () { return ''; }).then(function (d) { clearTimeout(to); if (d) descCache[c.id] = d; return d; });
  }

  // ---- 像素唱機（狀態永遠跟 FX().music 的真實狀態走：B05／B13）
  function syncPlayer() {
    var m = S.mask; if (!m) return;
    var b = m.querySelector('.lb-mini-player'); if (!b) return;
    var f = FX(), c = S.card;
    var cur = f && f.music && f.music.current ? f.music.current() : null;
    var mine = !!(c && cur && cur.id === c.id);
    var playing = !!(mine && f.music.playing());
    b.classList.toggle('playing', playing);
    b.classList.toggle('muted', !playing && !b.classList.contains('loading'));
    b.setAttribute('aria-pressed', String(playing));
    b.setAttribute('aria-label', playing ? '停止試聽' : '播放試聽');
  }
  function playCard(c, fromTap) {
    var f = FX(); if (!f || !f.music || !c || !c.previewUrl) return;
    var b = S.mask && S.mask.querySelector('.lb-mini-player');
    if (fromTap && !f.soundOn()) {
      try { f.unlockFromGesture(true); } catch (_) {}
      if (CFG.onSoundUnlock) try { CFG.onSoundUnlock(); } catch (_) {}
    }
    if (!f.soundOn()) { syncPlayer(); return; }
    S.started = true;
    if (b) { b.classList.add('loading'); b.classList.remove('muted'); }
    f.music.play(c, { fadeMs: 1500 }).then(function () {
      if (b) b.classList.remove('loading');
      syncPlayer();
    });
  }
  function toggleMusic(e) {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    var f = FX(), c = S.card; if (!f || !c) return;
    var cur = f.music.current && f.music.current();
    if (cur && cur.id === c.id && f.music.playing()) { f.music.stop({ fadeMs: 600 }); S.started = false; syncPlayer(); return; }
    playCard(c, true);
  }

  // ---- 開／關
  function close() {
    var m = S.mask; if (!m) return;
    S.mask = null;
    var c = S.card; S.card = null;
    if (S.offMusic) { S.offMusic(); S.offMusic = null; }
    if (S.offSound) { S.offSound(); S.offSound = null; }
    if (S.keyH) { D.removeEventListener('keydown', S.keyH, true); S.keyH = null; }
    if (m.parentNode) m.remove();
    D.body.classList.remove('ci-open');
    // 試聽：資訊卡換了歌才收（淡出）；原本在放的那張（例：押盤翻開那張）接著放
    var f = FX();
    if (f && f.music && S.started && c) {
      var cur = f.music.current && f.music.current();
      if (cur && cur.id === c.id) {
        var prev = S.prev;
        if (prev && prev.id !== c.id && f.soundOn()) f.music.play(prev, { fadeMs: 1200 });
        else if (!prev || prev.id !== c.id) f.music.stop({ fadeMs: 1500 });
      }
    }
    S.prev = null; S.started = false;
    try { if (S.lastFocus && S.lastFocus.focus && S.lastFocus.isConnected) S.lastFocus.focus({ preventScroll: true }); } catch (_) {}
    S.lastFocus = null;
    var r = S.resolve; S.resolve = null;
    emit('close', c);
    if (r) r();
  }
  // 連點偵測：跟上一下按下隔不到 SERIES_MS 的算同一串，seriesAt＝這一串第一下的時間（document 捕獲階段先記，面板自己的監聽再看）
  var SERIES_MS = 350, lastDown = -1e9, seriesAt = -1e9;
  function tnow() { return (W.performance && performance.now) ? performance.now() : Date.now(); }
  D.addEventListener('pointerdown', function () { var t = tnow(); if (t - lastDown >= SERIES_MS) seriesAt = t; lastDown = t; }, true);
  function open(card, opts) {
    opts = opts || {};
    if (typeof card === 'string') card = lookup(card);
    if (!card) return Promise.resolve();
    if (S.mask) close();
    var o = toOrigCard(card);
    var act = opts.attr || o._attr || null;
    var aceTag = o.ace ? '<span class="acebadge ' + o.ace + '">' + ACE_ZH[o.ace] + '</span>' : (o.gold ? '<span class="acebadge gold">私藏</span>' : '');
    var mods = o.painted ? '<span class="mod">店裡的手繪封面</span>' : '';
    var cover = o.coverUrl
      ? '<img class="cov" src="' + esc(o.coverUrl) + '" alt="' + esc(o.artist + '《' + o.album + '》') + '" draggable="false">'
      : '<div class="cov noimg"><span>' + esc(o.album) + '</span></div>';
    var m = D.createElement('div');
    m.className = 'drawmask'; m.id = 'cardInfoMask';
    m.setAttribute('role', 'dialog'); m.setAttribute('aria-modal', 'true'); m.setAttribute('aria-label', '唱片資訊');
    if (opts.from) m.setAttribute('data-from', String(opts.from));
    m.innerHTML = '<div class="drawcard" data-card="' + esc(o.id) + '">' +
      '<div class="lab">唱片資訊</div>' + cover +
      '<div class="ar">' + esc(o.artist) + '</div>' +
      '<div class="al">' + esc(o.album) + '</div>' +
      '<div class="yr">' + esc(o.year) + mods + '</div>' +
      (aceTag ? '<div class="acerow">' + aceTag + '</div>' : '') +
      (o.painted ? '' : '<div class="stats">' + starsHTML(o, act) + '</div>') +
      (o.previewUrl ? '<button class="lb-mini-player muted" type="button" aria-pressed="false" aria-label="播放試聽"><span class="note n1">♪</span><span class="note n2">♫</span><span class="note n3">♪</span></button>' : '<div class="lb-mini-none">（這張沒有試聽）</div>') +
      (o.pitch ? '<div class="pitch">' + esc(o.pitch) + '</div>' : '') +
      '<div class="intro wait">介紹載入中…</div>' +
      streamingBtnsHtml(o) +
      '<div class="ci-foot"><button class="btn pri" type="button" id="ciClose" data-tut="info-close">關閉</button></div>' +
      '</div>';
    // 封面讀不到：換成斜紋底＋專輯名（原版 .cov.noimg）
    var img = m.querySelector('img.cov');
    if (img) img.addEventListener('error', function () { var d = D.createElement('div'); d.className = 'cov noimg'; d.innerHTML = '<span>' + esc(o.album) + '</span>'; if (img.parentNode) img.parentNode.replaceChild(d, img); });
    // 點遮罩（面板外）關掉：只認「在遮罩上按下」的那一下。長按封面開資訊時手指還按著，放開補送的 click 會落在遮罩上——那一下不算（notes-B2 請求）
    var downOnMask = false;
    // 整個面板也一樣（H3／RV11-1）：手牌攤開時那一排在畫面最底下，正好是「關閉」那條（sticky）；疊著時介紹文還沒到，手指底下是串流鈕。
    //   打開之後還沒在面板裡按下過（armed＝false）的 click 一律吞掉——放開長按補送的那一下不會關掉面板、不會開串流連結、不會按到唱機。
    //   鍵盤（Enter／空白鍵，detail＝0）與程式 el.click()（detail＝0）照常。
    //   連點（V5-play-1）：揭曉時連點盤面加速，點到牌桌那兩張就開了這個面板，下一下 150 ms 後正好落在串流鈕上。
    //   打開之前就在連點的那一串（每下隔不到 SERIES_MS）都不算按下過；停一下（≥ SERIES_MS）再點才 armed。
    var armed = false, openAt = tnow();
    m.addEventListener('pointerdown', function () { if (seriesAt >= openAt) armed = true; }, true);
    m.addEventListener('click', function (e) {
      if (armed || e.detail === 0) return;
      e.preventDefault(); e.stopPropagation();
    }, true);
    m.addEventListener('pointerdown', function (e) { downOnMask = e.target === m; });
    m.addEventListener('click', function (e) {
      if (e.target === m) { if (!downOnMask) return; downOnMask = false; close(); return; }
      var t = e.target.closest && e.target.closest('#ciClose');
      if (t) { e.preventDefault(); close(); return; }
      if (e.target.closest && e.target.closest('.streaming-btn[aria-disabled=true]')) { e.preventDefault(); }
    });
    m.addEventListener('contextmenu', function (e) { if (e.target && e.target.tagName === 'IMG') e.preventDefault(); });
    var pb = m.querySelector('.lb-mini-player');
    if (pb) pb.addEventListener('click', toggleMusic);
    S.lastFocus = D.activeElement;
    S.mask = m; S.card = card; S.started = false;
    var f = FX();
    S.prev = (f && f.music && f.music.current && f.music.playing && f.music.playing()) ? f.music.current() : null;
    D.body.appendChild(m);
    D.body.classList.add('ci-open');
    S.keyH = function (e) { if (e.key === 'Escape' && S.mask) { e.preventDefault(); e.stopPropagation(); close(); } };
    D.addEventListener('keydown', S.keyH, true);
    if (f && f.music && f.music.onChange) S.offMusic = f.music.onChange(function () { syncPlayer(); });
    if (f && f.onSound) S.offSound = f.onSound(function () { syncPlayer(); });
    syncPlayer();
    // 原版：開了就放這張（只有已經開聲音的人才會出聲）
    if (o.previewUrl && f && f.soundOn && f.soundOn()) playCard(card, false);
    // 簡介：載不到就寫灰字，框留著（B07）
    var intro = m.querySelector('.intro');
    fetchDesc(card).then(function (d) {
      if (!intro.isConnected) return;
      intro.classList.remove('wait');
      if (d) intro.textContent = d;
      else { intro.textContent = '（介紹文載不到）'; intro.classList.add('none'); }
    });
    try { var cb = m.querySelector('#ciClose'); if (cb) cb.focus({ preventScroll: true }); } catch (_) {}
    emit('open', card);
    return new Promise(function (res) { S.resolve = res; });
  }

  W.DipLabCardInfo = {
    open: open,
    close: close,
    isOpen: function () { return !!S.mask; },
    current: function () { return S.card; },
    on: function (n, cb) { if (!S.cbs[n]) return function () {}; S.cbs[n].push(cb); return function () { var i = S.cbs[n].indexOf(cb); if (i >= 0) S.cbs[n].splice(i, 1); }; },
    fetchDesc: fetchDesc,
    config: function (o) { if (o) for (var k in o) CFG[k] = o[k]; },
    _toOrigCard: toOrigCard,
    DESC_OK: DESC_OK
  };
})();
