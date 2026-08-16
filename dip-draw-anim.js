/* dip vinyl 抽卡動畫共用引擎
 *
 * 用在四個地方，共兩組參數（profile）：
 *   front  → 心情選歌 / 類型挑片 / 直接來一張（gameConfig/drawAnimation）
 *   battle → 卡牌對戰的戰利品揭曉（gameConfig/drawAnimationBattle，節奏更快）
 *
 * 流程：狂閃封面 → 急停蓋回牌背 → 彈起 → 翻牌揭曉 → （可選）飛進結果頁封面框。
 * 抽卡與封面解析由呼叫端在背景並行跑；資產晚到就多閃幾拍掩蓋延遲，
 * state.ready 才進急停，state.fail 則淡出跳過動畫。
 *
 * 頁面用法：
 *   DipDrawAnim.configure({ fetchConfig, fetchCovers });   // 兩者皆 async，由頁面接 Firestore
 *   DipDrawAnim.preload('front');                          // 載入後預熱（非必要但強烈建議）
 *   const anim = await DipDrawAnim.start({ host, profile:'front' });
 *   ... 背景抽卡 ...
 *   anim.state.cover = url; anim.state.apex = true; anim.state.ready = true;   // 或 .fail = true
 *   await anim.done;
 *   渲染結果頁;
 *   await DipDrawAnim.finishHandoff({ coverSelector:'#genreContent .quiz-result-cover' });
 */
(function (global) {
  'use strict';

  // 店主 2026-08-15 調校版。battle 走更快的節奏：對戰中不該為了儀式感拖住玩家。
  const DEFAULTS = {
    front: {
      flashDuration: 1600, startInterval: 45, endInterval: 250, easePow: 2, jitter: 8, maxBlur: 3.5, ghosts: true,
      pauseBeforePop: 150, popDuration: 400, popScale: 1.45, popLift: 60, popOvershoot: 1.6, floatWobble: true,
      autoDelay: 450, flipDuration: 500, burstCount: 50, sound: true,
      handoffDelay: 650, handoffDuration: 450, backColor: '#ffffff', cardMax: 200, fullscreen: true,
    },
    battle: {
      flashDuration: 900, startInterval: 35, endInterval: 150, easePow: 2, jitter: 6, maxBlur: 3, ghosts: true,
      pauseBeforePop: 100, popDuration: 300, popScale: 1.35, popLift: 40, popOvershoot: 1.5, floatWobble: false,
      autoDelay: 250, flipDuration: 380, burstCount: 30, sound: true,
      handoffDelay: 300, handoffDuration: 350, backColor: '#ffffff', cardMax: 150, fullscreen: false,
    },
  };
  const FALLBACK_COVERS = [
    'https://i.scdn.co/image/ab67616d0000b273dc30583ba717007b00cceb25',
    'https://i.scdn.co/image/ab67616d0000b273f7009b199768fc7ff3a8d7e0',
    'https://i.scdn.co/image/ab67616d0000b273e79dc1438d650f426b5e99a7',
    'https://i.scdn.co/image/ab67616d0000b2738b9cf42f267a8c162b9594b1',
    'https://i.scdn.co/image/ab67616d0000b273668e3aca3167e6e569a9aa20',
    'https://i.scdn.co/image/ab67616d0000b27371d840defb002ed3b180f7cd',
    'https://i.scdn.co/image/ab67616d0000b273cdb645498cd3d8a2db4d05e1',
    'https://i.scdn.co/image/ab67616d0000b273db8e38addb58131f77b48377',
    'https://i.scdn.co/image/ab67616d0000b2739eee212bba82bed8da96a8f7',
    'https://i.scdn.co/image/ab67616d0000b2738f3cdfeac0678371b16f601d',
    'https://i.scdn.co/image/ab67616d0000b273d4d4cd6954bd161fd3a8b4a5',
    'https://i.scdn.co/image/ab67616d0000b2731e6080bcea9c1d05762084a1',
  ];

  let hooks = { fetchConfig: null, fetchCovers: null };
  const cfgCache = {};            // profile → 線上設定
  let coversCache = null;

  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const rndf = (a, b) => a + Math.random() * (b - a);

  function defaultsFor(profile) { return { ...(DEFAULTS[profile] || DEFAULTS.front) }; }

  async function loadConfig(profile) {
    if (cfgCache[profile]) return cfgCache[profile];
    let online = null;
    if (hooks.fetchConfig) { try { online = await hooks.fetchConfig(profile); } catch (e) {} }
    cfgCache[profile] = { ...defaultsFor(profile), ...(online || {}) };
    return cfgCache[profile];
  }
  async function loadCovers() {
    if (coversCache) return coversCache;
    let list = null;
    if (hooks.fetchCovers) { try { list = await hooks.fetchCovers(); } catch (e) {} }
    coversCache = (list && list.length >= 12) ? list : FALLBACK_COVERS;
    coversCache.forEach(u => { const im = new Image(); im.src = u; });
    return coversCache;
  }

  /* ── 合成音效（無外部檔；由點擊手勢觸發，行動端可播）── */
  let AC = null;
  const ac = () => { if (!AC) AC = new (global.AudioContext || global.webkitAudioContext)(); return AC; };
  // 抽卡音效同樣受店主的自動試聽開關管。這是獨立於 DipPlayer 的第二套音訊系統，
  // 一旦出聲就會向系統要走音訊焦點、停掉玩家正在聽的串流——而且因為它從頭到尾
  // 不經過 DipPlayer，先前所有的授權修正都管不到它。沒開試聽就完全不建立 context。
  function soundAllowed(cfg) {
    if (!cfg || !cfg.sound) return false;
    const pref = global.DipPlayer && global.DipPlayer.autoplayPreference;
    return pref ? pref() === 'on' : true;
  }
  function snd(kind, cfg, arg) {
    if (!soundAllowed(cfg)) return;
    try {
      const c = ac();
      if (kind === 'tick') {
        const o = c.createOscillator(), g = c.createGain();
        o.type = 'square'; o.frequency.value = 1400 - 700 * arg;
        g.gain.setValueAtTime(0.028 + 0.03 * arg, c.currentTime);
        g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.035);
        o.connect(g); g.connect(c.destination); o.start(); o.stop(c.currentTime + 0.04);
      } else if (kind === 'thud') {
        const o = c.createOscillator(), g = c.createGain();
        o.type = 'sine'; o.frequency.setValueAtTime(150, c.currentTime);
        o.frequency.exponentialRampToValueAtTime(45, c.currentTime + 0.16);
        g.gain.setValueAtTime(0.5, c.currentTime); g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.2);
        o.connect(g); g.connect(c.destination); o.start(); o.stop(c.currentTime + 0.22);
      } else if (kind === 'whoosh') {
        const o = c.createOscillator(), g = c.createGain(), d = cfg.popDuration / 1000;
        o.type = 'sine'; o.frequency.setValueAtTime(220, c.currentTime);
        o.frequency.exponentialRampToValueAtTime(880, c.currentTime + d * 0.7);
        g.gain.setValueAtTime(0.001, c.currentTime); g.gain.exponentialRampToValueAtTime(0.12, c.currentTime + 0.08);
        g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + d);
        o.connect(g); g.connect(c.destination); o.start(); o.stop(c.currentTime + d + 0.05);
      } else if (kind === 'fanfare') {
        (arg ? [523.25, 659.25, 783.99, 1046.5] : [523.25, 659.25]).forEach((f, i) => {
          const o = c.createOscillator(), g = c.createGain(), t0 = c.currentTime + i * 0.05;
          o.type = 'triangle'; o.frequency.value = f;
          g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.09, t0 + 0.03);
          g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.9);
          o.connect(g); g.connect(c.destination); o.start(t0); o.stop(t0 + 1);
        });
      }
    } catch (e) {}
  }

  const STAGE_HTML =
    '<div class="da-stage">' +
      '<div class="da-aura"></div>' +
      '<div class="da-card"><div class="da-lift"><div class="da-floaty"><div class="da-flip">' +
        '<div class="da-face da-back"><div class="da-backlabel">?</div><div class="da-backbrand">dip vinyl</div></div>' +
        '<div class="da-face da-front"></div>' +
      '</div></div></div></div>' +
      '<div class="da-burst"></div>' +
    '</div>';

  let pendingClone = null;
  let activeFs = null;              // 目前的全螢幕覆蓋層（同時只會有一個）

  // 收掉全螢幕層並解除捲動鎖。fade=true 時先淡出再移除（給接軌時「白幕退場」用）。
  function teardownFs(fade) {
    const el = activeFs; if (!el) return;
    activeFs = null;
    document.documentElement.classList.remove('da-fs-lock');
    if (fade) { el.classList.add('out'); setTimeout(() => el.remove(), 400); }
    else el.remove();
  }

  async function start(opts) {
    const o = opts || {};
    const profile = o.profile || 'front';
    const host = o.host;
    if (!host) return null;
    const known = cfgCache[profile];
    if (known && known.enabled === false) return null;    // 已知停用 → 呼叫端自理

    // 全螢幕模式：舞台不放進 host，改放進覆蓋整個視窗的固定層（連站頂選單一起蓋掉），
    // 揭曉後由 finishHandoff 淡出、同時把卡片飛進結果頁——「動畫時全螢幕、出簡介才還原」。
    // 呼叫端傳 fullscreen:true 啟用；後台可用 cfg.fullscreen=false 關掉。
    const fs = !!o.fullscreen && (cfgCache[profile] ? cfgCache[profile].fullscreen !== false : true);
    let fsEl = null;
    if (fs) {
      teardownFs();                       // 上一輪殘留（極少見）先收掉
      fsEl = document.createElement('div');
      fsEl.className = 'da-fs';
      fsEl.innerHTML = STAGE_HTML;
      document.body.appendChild(fsEl);
      document.documentElement.classList.add('da-fs-lock');
      activeFs = fsEl;
    } else {
      host.innerHTML = STAGE_HTML;
    }
    const root = fs ? fsEl : host;
    const q = s => root.querySelector(s);
    const stage = q('.da-stage'), card = q('.da-card'), lift = q('.da-lift'),
          floaty = q('.da-floaty'), flip = q('.da-flip'), front = q('.da-front'),
          aura = q('.da-aura'), burstHost = q('.da-burst');
    // 中止判斷：非全螢幕看舞台是否還在（結果頁覆蓋 host 即中止）；
    // 全螢幕的舞台掛在 body 上不會被 host 影響，所以另外收呼叫端給的 alive()（例如 modal 是否還開著）。
    const alive = () => fs ? (fsEl.isConnected && (!o.alive || o.alive())) : stage.isConnected;

    // 不等 Firestore：先用「已快取線上設定或內建預設」＋「已快取封面池或內建樣本」立刻開跑，
    // 資料晚到熱插拔（cfg 就地合併，閃卡迴圈每拍讀最新值；封面池整組換掉）。
    const cfg = { ...defaultsFor(profile), ...(cfgCache[profile] || {}) };
    let order = (coversCache || FALLBACK_COVERS).slice().sort(() => Math.random() - 0.5);
    loadConfig(profile).then(c => { Object.assign(cfg, c); applyVisuals(); }).catch(() => {});
    loadCovers().then(list => { if (list && list.length >= 4) order = list.slice().sort(() => Math.random() - 0.5); }).catch(() => {});
    if (soundAllowed(cfg) && ac().resume) ac().resume();

    // 牌背顏色（品牌字自動對比）＋版面：卡片放大 popScale、上移 popLift 都要塞進舞台，
    // 卡片先往下擺 popLift/2，彈起後正好落在視覺中央；光暈與粒子對齊彈起後的位置。
    function applyVisuals() {
      const backEl = q('.da-back');
      if (backEl && cfg.backColor) {
        backEl.style.background = cfg.backColor;
        const hx = String(cfg.backColor).replace('#', '');
        const lum = 0.299 * (parseInt(hx.substr(0, 2), 16) || 0)
                  + 0.587 * (parseInt(hx.substr(2, 2), 16) || 0)
                  + 0.114 * (parseInt(hx.substr(4, 2), 16) || 0);
        const brand = backEl.querySelector('.da-backbrand');
        if (brand) brand.style.color = lum > 150 ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.45)';
      }
      const scale = Math.max(1, cfg.popScale), liftPx = Math.max(0, cfg.popLift);
      const availW = fs ? global.innerWidth : (stage.clientWidth || global.innerWidth);
      let cardSize = Math.max(110, Math.min(cfg.cardMax || 200, Math.floor((availW - 48) / scale)));
      // 全螢幕：舞台就是整個視窗，卡片再受視窗高度限制一次（彈起後也不能頂到上緣）
      if (fs) cardSize = Math.max(110, Math.min(cardSize, Math.floor((global.innerHeight * 0.62 - liftPx) / scale)));
      const stageH = fs ? global.innerHeight : Math.round(cardSize * scale + liftPx + 44);
      const restOffset = Math.round(liftPx / 2);
      stage.style.height = fs ? '100%' : stageH + 'px';
      card.style.width = card.style.height = cardSize + 'px';
      card.style.top = restOffset + 'px';
      const poppedY = Math.round(stageH / 2 + restOffset - liftPx);
      aura.style.top = poppedY + 'px'; burstHost.style.top = poppedY + 'px';
    }
    applyVisuals();

    const state = { ready: false, fail: false, cover: '', apex: false };

    const done = (async () => {
      flip.style.transform = 'rotateY(180deg)';
      let t = 0, i = 0, last = null;
      // 閃卡：跑滿設定時長；資產未到就用收尾間隔繼續閃（上限再等 15 秒）
      while ((t < cfg.flashDuration || !state.ready) && !state.fail) {
        if (t > cfg.flashDuration + 15000) { state.fail = true; break; }
        if (!alive()) { teardownFs(); return; }             // 使用者關掉畫面 → 靜默中止
        const prog = Math.min(1, t / cfg.flashDuration);
        const interval = cfg.startInterval + (cfg.endInterval - cfg.startInterval) * Math.pow(prog, cfg.easePow);
        const c = order[i % order.length];
        if (cfg.ghosts && last && interval < 140) {
          const g = document.createElement('div'); g.className = 'da-ghost';
          g.style.backgroundImage = 'url(' + last + ')';
          g.style.transform = 'translate(' + rndf(-cfg.jitter, cfg.jitter) + 'px,' + rndf(-cfg.jitter, cfg.jitter) + 'px) scale(1.02)';
          card.appendChild(g);
          requestAnimationFrame(() => { g.style.opacity = '0'; g.style.transform += ' scale(1.12)'; });
          setTimeout(() => g.remove(), 200);
        }
        front.style.backgroundImage = 'url(' + c + ')'; last = c;
        const blur = cfg.maxBlur * (1 - prog), j = cfg.jitter * (1 - prog * 0.6);
        front.style.filter = blur > 0.2 ? 'blur(' + blur.toFixed(1) + 'px)' : '';
        lift.style.transform = 'translate(' + rndf(-j, j) + 'px,' + rndf(-j, j) + 'px) rotate(' + rndf(-1.5, 1.5) + 'deg)';
        snd('tick', cfg, prog); i++;
        await sleep(interval); t += interval;
      }
      // 跳過動畫（無封面可翻／中止）：非全螢幕就地淡出；全螢幕淡出白幕，
      // 淡出期間呼叫端正好把結果頁渲染好，使用者看到的是白幕退去露出結果，而不是閃一下舊畫面。
      if (state.fail || !alive()) { if (alive()) stage.style.opacity = '0'; teardownFs(true); return; }
      front.style.filter = ''; lift.style.transform = 'none';
      // 急停蓋回牌背
      flip.style.transition = 'none'; flip.style.transform = 'rotateY(0deg)';
      card.classList.add('slam'); snd('thud', cfg);
      setTimeout(() => card.classList.remove('slam'), 300);
      front.style.backgroundImage = 'url(' + state.cover + ')';
      await sleep(cfg.pauseBeforePop);
      if (!alive()) { teardownFs(); return; }
      // 彈起
      aura.className = 'da-aura ' + (state.apex ? 'on-apex' : 'on-normal');
      lift.style.transition = 'transform ' + cfg.popDuration + 'ms cubic-bezier(.2,' + cfg.popOvershoot + ',.35,1)';
      lift.style.transform = 'translateY(-' + cfg.popLift + 'px) scale(' + cfg.popScale + ')';
      snd('whoosh', cfg);
      await sleep(cfg.popDuration);
      if (!alive()) { teardownFs(); return; }
      if (cfg.floatWobble) floaty.classList.add('on');
      // 翻牌揭曉
      await sleep(Math.max(150, cfg.autoDelay));
      if (!alive()) { teardownFs(); return; }
      floaty.classList.remove('on');
      flip.style.transition = 'transform ' + cfg.flipDuration + 'ms cubic-bezier(.4,0,.2,1)';
      flip.style.transform = 'rotateY(180deg)';
      await sleep(cfg.flipDuration * 0.55);
      if (!alive()) { teardownFs(); return; }
      const n = cfg.burstCount * (state.apex ? 1.5 : 1);
      for (let k = 0; k < n; k++) {
        const s = document.createElement('span'); s.className = 'da-pt';
        const gold = state.apex || Math.random() < 0.3;
        s.style.background = gold ? (Math.random() < 0.5 ? '#b8860b' : '#e6c34d') : (Math.random() < 0.5 ? '#111' : '#999');
        if (Math.random() < 0.4) s.style.borderRadius = '50%';
        burstHost.appendChild(s);
        const ang = rndf(0, Math.PI * 2), dist = rndf(80, 200) * (state.apex ? 1.2 : 1);
        s.animate([
          { transform: 'translate(0,0) scale(1) rotate(0deg)', opacity: 1 },
          { transform: 'translate(' + Math.cos(ang) * dist + 'px,' + (Math.sin(ang) * dist - 40) + 'px) scale(' + rndf(0.2, 0.7) + ') rotate(' + rndf(-360, 360) + 'deg)', opacity: 0 }
        ], { duration: rndf(500, 950), easing: 'cubic-bezier(.15,.8,.4,1)' }).onfinish = () => s.remove();
      }
      snd('fanfare', cfg, state.apex);
      if (state.apex) card.classList.add('ace-border');
      await sleep(cfg.flipDuration * 0.45 + Math.max(0, cfg.handoffDelay));
      // 留一個 fixed clone 停在卡片視覺位置：呼叫端渲染結果頁時（舞台被拆掉）由它蓋住版面跳動，
      // 之後 finishHandoff() 讓它飛進結果頁封面框。呼叫端不接軌就 cancel()。
      if (alive() && state.cover) {
        const ra = front.getBoundingClientRect();
        const cl = document.createElement('div'); cl.className = 'da-handoff-clone';
        cl.style.backgroundImage = 'url(' + state.cover + ')';
        cl.style.left = ra.left + 'px'; cl.style.top = ra.top + 'px';
        cl.style.width = ra.width + 'px'; cl.style.height = ra.height + 'px';
        document.body.appendChild(cl);
        cancelHandoff();          // 上一輪殘留的 clone（極少見）先清掉
        pendingClone = { el: cl, duration: cfg.handoffDuration };
      }
    })();

    return { state, done, cfg };
  }

  // 結果頁渲染完成後呼叫：clone 飛進目標封面框，期間目標暫時隱形，抵達後換回真圖
  async function finishHandoff(opts) {
    const p = pendingClone; pendingClone = null;
    if (!p) { teardownFs(true); return; }
    const o = opts || {};
    const target = typeof o.target === 'string' ? document.querySelector(o.target) : o.target;
    if (!target) { p.el.remove(); teardownFs(true); return; }
    const fadeWrap = typeof o.fadeWrap === 'string' ? document.querySelector(o.fadeWrap) : o.fadeWrap;
    if (fadeWrap) fadeWrap.classList.add('da-fadein');
    const prevVis = target.style.visibility;
    target.style.visibility = 'hidden';
    // 全螢幕白幕在這一刻淡出、還原正常版面；卡片（fixed clone）同時飛進結果頁封面框
    teardownFs(true);
    let rb = target.getBoundingClientRect();
    // 目標若不在可視範圍（結果頁比一屏長時會發生），先捲進畫面再量，否則卡片會飛到看不見的地方
    if (rb.top < 0 || rb.bottom > global.innerHeight) {
      target.scrollIntoView({ block: 'center' });
      rb = target.getBoundingClientRect();
    }
    const d = p.duration, ease = 'cubic-bezier(.25,.8,.3,1)';
    p.el.style.transition = 'left ' + d + 'ms ' + ease + ', top ' + d + 'ms ' + ease
      + ', width ' + d + 'ms ' + ease + ', height ' + d + 'ms ' + ease;
    requestAnimationFrame(() => {
      p.el.style.left = rb.left + 'px'; p.el.style.top = rb.top + 'px';
      p.el.style.width = rb.width + 'px'; p.el.style.height = rb.height + 'px';
    });
    await sleep(d + 40);
    target.style.visibility = prevVis || '';
    p.el.remove();
  }
  function cancelHandoff() {
    if (pendingClone) { pendingClone.el.remove(); pendingClone = null; }
    teardownFs();     // 錯誤／中止時務必收掉白幕，否則整站被蓋住
  }

  global.DipDrawAnim = {
    DEFAULTS,
    configure(h) { hooks = { ...hooks, ...(h || {}) }; },
    preload(profile) { loadConfig(profile || 'front').catch(() => {}); loadCovers().catch(() => {}); },
    invalidate() { Object.keys(cfgCache).forEach(k => delete cfgCache[k]); },
    start, finishHandoff, cancel: cancelHandoff,
  };
})(window);
