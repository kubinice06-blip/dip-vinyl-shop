// game-lab/fx.js — 品味對決・試做版：聲光（Agent C）。SPEC §5.1、§5.2、§5.3、§7.3。
// window.DipLabFx：WebAudio 合成音效（不載任何音檔）、試聽播放（fetch → decodeAudioData → BufferSource）、
// 震屏／打擊停頓／閃白／飄字／蓋章、encounterFx 移植、傳說藏家蓋章出場。
// 規則：
//  - 音效與音樂共用 fx.js **自己的** AudioContext（v2 B13：不再借 DipPlayer.audioContext()——DipPlayer 切背景時會把它 close 掉）。
//    DipPlayer 只借全站的聲音偏好 autoplayPreference。**絕不 DipPlayer.mount**。
//  - 切背景（visibilitychange hidden）：記下正在放的那張、真的停掉、suspend()；回來後下一次觸碰 resume() 並從頭放（B13）。
//    playing() 同時檢查 ctx.state === 'running'，「播放中」永遠是真的（B05／B13）。
//  - 「有聲音」的手勢（unlockFromGesture(true)、setSound(true)）：navigator.audioSession.type='playback'，舊 iOS 用循環靜音 <audio> 後備（B05）。
//  - 這次造訪呼叫過 unlockFromGesture(true)（或在 🔊 開關上打開）且偏好為 'on' 才出聲。
//  - 動畫永遠不等音樂；抓檔 2.5 s 內沒好就放棄這次換歌。
//  - 所有浮層 pointer-events:none。prefers-reduced-motion：不震、不閃白，改 150 ms 淡入。
(function () {
  'use strict';
  if (typeof window === 'undefined') return;

  // LRU_MAX：存「抓下來的原始檔」（每首約 1 MB）；DEC_MAX：解碼後的 PCM（每首約 10 MB）只留目前＋下一首
  const MASTER = 0.35, MUSIC_VOL = 0.5, GIVE_UP_MS = 2500, LRU_MAX = 6, DEC_MAX = 2;
  const S = {
    ctx: null, own: null, master: null, noise: null, pink: null,
    unlocked: false, localPref: 'off',
    rain: null, speed: 1,
    soundCbs: new Set(), toggles: new Set(), resumeCard: null,
  };
  const DP = () => (window.DipPlayer && typeof window.DipPlayer.audioContext === 'function') ? window.DipPlayer : null;

  // ---------------------------------------------------------------- CSS（只放 fx 自己的浮層；遇敵 CSS 逐字搬自 roguelike.html L187–203）
  const CSS = `
  .rpg-excl{position:absolute;left:11px;top:-24px;font-size:15px;font-weight:900;line-height:18px;color:#c11628;background:#fff;border:2px solid #111;padding:0 5px;animation:rpgExcl .18s steps(2,end);z-index:40;pointer-events:none;}
  @keyframes rpgExcl{0%{transform:translateY(6px);opacity:0;}100%{transform:none;opacity:1;}}
  .enc-ov{position:fixed;inset:0;z-index:2147482000;pointer-events:none;}
  .enc-ov .enc-flash{position:absolute;inset:0;background:#fff;opacity:0;}
  .enc-ov.flash .enc-flash{animation:encFlash .22s steps(1,end) 3;}
  @keyframes encFlash{0%{opacity:1;}50%{opacity:0;}100%{opacity:0;}}
  .enc-ov .enc-bars{position:absolute;inset:0;display:flex;flex-direction:column;}
  .enc-ov .enc-bars i{flex:1;background:#000;transform:translateX(-101%);}
  .enc-ov .enc-bars i:nth-child(even){transform:translateX(101%);}
  .enc-ov.bars .enc-bars i{animation:encBar .5s steps(6,end) forwards;}
  .enc-ov.bars .enc-bars i:nth-child(2),.enc-ov.bars .enc-bars i:nth-child(7){animation-delay:.04s;}
  .enc-ov.bars .enc-bars i:nth-child(3),.enc-ov.bars .enc-bars i:nth-child(6){animation-delay:.08s;}
  .enc-ov.bars .enc-bars i:nth-child(4),.enc-ov.bars .enc-bars i:nth-child(5){animation-delay:.12s;}
  @keyframes encBar{to{transform:translateX(0);}}
  .enc-ov.black{background:#000;} .enc-ov.black .enc-bars{display:none;}
  .enc-ov.out{transition:opacity .35s;opacity:0;pointer-events:none;}
  .enc-ov.soft{background:#000;opacity:0;transition:opacity .15s;} .enc-ov.soft.on{opacity:1;}
  /* 傳說藏家開場（roguelike.html L521–535 逐字搬；位置改 fixed＋不吃點擊） */
  @keyframes bossMaskIn{0%{opacity:0;}100%{opacity:1;}}
  @keyframes bossStamp{0%{transform:scale(3);opacity:0;}55%{transform:scale(.92);opacity:1;}75%{transform:scale(1.06);}100%{transform:scale(1);}}
  @keyframes bossLine{0%{transform:scaleX(0);}100%{transform:scaleX(1);}}
  @keyframes bossShake{0%,100%{transform:translate(0,0);}20%{transform:translate(-6px,2px);}40%{transform:translate(5px,-3px);}60%{transform:translate(-4px,-2px);}80%{transform:translate(3px,2px);}}
  @keyframes bossGlow{0%,100%{text-shadow:0 0 0 rgba(184,134,11,0);}50%{text-shadow:0 0 26px rgba(184,134,11,.75);}}
  .bossmask{position:fixed;inset:0;z-index:2147481000;background:rgba(255,255,255,.97);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;animation:bossMaskIn .25s;pointer-events:none;font-family:'Space Mono','Noto Sans TC',monospace;}
  .bossmask.out{opacity:0;transition:opacity .45s;}
  .bossmask .bline{width:min(320px,70vw);height:2px;background:#b8860b;transform-origin:left;animation:bossLine .5s .15s both;}
  .bossmask .bline.r{transform-origin:right;}
  .bossmask .bemoji{font-size:64px;line-height:1;animation:bossStamp .6s .1s both cubic-bezier(.2,1.4,.4,1);}
  .bossmask .btitle{font-size:32px;font-weight:700;letter-spacing:.35em;text-indent:.35em;color:#111;animation:bossStamp .55s .35s both cubic-bezier(.2,1.4,.4,1),bossGlow 1.2s .9s infinite;}
  @keyframes bossSub{0%{transform:scale(1.6);opacity:0;}100%{transform:none;opacity:1;}}
  .bossmask .bsub{font-size:13px;color:#b8860b;letter-spacing:.14em;font-weight:700;animation:bossSub .4s .62s both ease-out;max-width:90vw;white-space:nowrap;}
  body.boss-shake #app>:not(.lb-top):not(.lb-scr.duel),body.boss-shake #app .dl-root>:not(.dl-top){animation:bossShake .5s .55s;}   /* 上排鈕不震（不會被推出右緣） */
  /* 飄字／蓋章／閃白 */
  .dlfx-layer{position:fixed;inset:0;pointer-events:none;z-index:2147480000;overflow:hidden;}
  .dlfx-float{position:fixed;transform:translate(-50%,-100%);text-align:center;pointer-events:none;white-space:nowrap;
    font-family:'Space Mono','Noto Sans TC',monospace;font-weight:700;line-height:1;color:#c11628;
    text-shadow:0 2px 0 #fff,2px 0 0 #fff,-2px 0 0 #fff,0 -2px 0 #fff,0 3px 6px rgba(0,0,0,.35);}
  .dlfx-float .n{font-size:32px;letter-spacing:-.02em;}
  .dlfx-float.big .n{font-size:40px;}
  .dlfx-float .s{display:block;font-size:12px;margin-top:3px;color:#111;font-weight:700;letter-spacing:0;}
  .dlfx-float.toE{color:#b8860b;} .dlfx-float.toP{color:#c11628;}
  .dlfx-float.small .n{font-size:13px;} .dlfx-float.small{color:#2e7d52;}
  .dlfx-float.small.qi{color:#b8860b;} .dlfx-float.small.neg{color:#888;}
  .dlfx-stamp{position:fixed;transform:translate(-50%,-50%) rotate(-6deg);pointer-events:none;white-space:nowrap;
    font-family:'Space Mono','Noto Sans TC',monospace;font-weight:900;font-size:26px;letter-spacing:.06em;line-height:1.1;
    padding:4px 12px;border:3px solid currentColor;background:rgba(255,255,255,.92);color:#b8860b;text-align:center;}
  .dlfx-stamp small{display:block;font-size:13px;font-weight:700;letter-spacing:.1em;margin-top:2px;}
  .dlfx-stamp.gold{color:#b8860b;} .dlfx-stamp.red{color:#c11628;} .dlfx-stamp.grey{color:#666;} .dlfx-stamp.blue{color:#1f5fae;}
  .dlfx-stamp.green{color:#2e7d52;} .dlfx-stamp.ink{color:#111;}
  .dlfx-stamp small.c{color:#1f5fae;} .dlfx-stamp small.o{color:#6a3fa0;} .dlfx-stamp small.h{color:#c11628;}
  .dlfx-spark{position:fixed;width:6px;height:6px;background:#f0c75e;pointer-events:none;box-shadow:0 0 6px #f0c75e;}
  .dlfx-flash{position:fixed;inset:0;pointer-events:none;z-index:2147480500;}
  `;
  function injectCss() {
    if (document.getElementById('dlfx-css')) return;
    const st = document.createElement('style'); st.id = 'dlfx-css'; st.textContent = CSS;
    (document.head || document.documentElement).appendChild(st);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', injectCss); else injectCss();

  // ---------------------------------------------------------------- audio context
  function ctx() {
    if (!S.own || S.own.state === 'closed') {
      const C = window.AudioContext || window.webkitAudioContext;
      if (C) { try { S.own = new C(); } catch (_) { S.own = null; } }
    }
    const c = S.own;
    if (c && c !== S.ctx) {
      S.ctx = c; S.master = null; S.noise = null; S.pink = null;
      try { S.master = c.createGain(); S.master.gain.value = MASTER; S.master.connect(c.destination); } catch (_) { S.master = null; }
      // 換了 context（被系統關掉重建）：舊的音樂節點已經失效
      if (M.cur && M.cur.ctx !== c) { M.cur = null; }
      if (S.rain) { S.rain = null; }
    }
    return c;
  }
  function pref() {
    const dp = DP();
    if (dp && typeof dp.autoplayPreference === 'function') { try { return dp.autoplayPreference(); } catch (_) {} }
    return S.localPref;
  }
  function soundOn() { return !!S.unlocked && pref() === 'on'; }
  // B05：iOS 靜音切換。Web Audio 預設是「環境音」，靜音模式下整個沒聲音；在有聲音的手勢裡把 session 拉成 playback。
  function audioSessionPlayback() {
    try { if (navigator.audioSession) { navigator.audioSession.type = 'playback'; return; } } catch (_) {}
    // 舊 iOS 後備：同一個手勢裡放一個循環、playsinline 的極短靜音 WAV
    try {
      if (!/iP(hone|ad|od)|Macintosh/.test(navigator.userAgent || '') || !('ontouchend' in document)) return;
      if (!S.silentEl) {
        const n = 2000, b = new Uint8Array(44 + n), v = new DataView(b.buffer);
        const w = (o, t) => { for (let i = 0; i < t.length; i++) b[o + i] = t.charCodeAt(i); };
        w(0, 'RIFF'); v.setUint32(4, 36 + n, true); w(8, 'WAVE'); w(12, 'fmt '); v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
        v.setUint32(24, 8000, true); v.setUint32(28, 8000, true); v.setUint16(32, 1, true); v.setUint16(34, 8, true); w(36, 'data'); v.setUint32(40, n, true); b.fill(128, 44);
        const a = document.createElement('audio');
        a.src = URL.createObjectURL(new Blob([b], { type: 'audio/wav' }));
        a.loop = true; a.setAttribute('playsinline', ''); a.setAttribute('webkit-playsinline', ''); a.preload = 'auto'; a.volume = 0;
        S.silentEl = a;
      }
      const p = S.silentEl.play(); if (p && p.catch) p.catch(() => {});
    } catch (_) {}
  }
  function resumeNow() {
    const c = ctx(); if (!c) return null;
    try { if (c.state !== 'running') { const p = c.resume(); if (p && p.catch) p.catch(() => {}); } } catch (_) {}
    try { const b = c.createBuffer(1, 1, 22050); const s = c.createBufferSource(); s.buffer = b; s.connect(c.destination); s.start(0); } catch (_) {}
    return c;
  }
  // 每一顆 🔊（對決頂欄、⏸ 選單、地圖…）都跟著同步；已經不在畫面上的順手收掉
  function syncToggles() {
    S.toggles.forEach(t => {
      if (!t || !t.el || !t.el.isConnected) { try { if (t && t.destroy) t.destroy(); } catch (_) {} S.toggles.delete(t); }
      else { try { t.sync(); } catch (_) {} }
    });
  }
  function emitSound() { const on = soundOn(); S.soundCbs.forEach(cb => { try { cb(on); } catch (e) { console.error(e); } }); syncToggles(); }

  function init() { injectCss(); return api; }
  // 只能在 click handler 內呼叫
  function unlockFromGesture(withSound) {
    const dp = DP();
    if (dp && typeof dp.setAutoplayPreference === 'function') { try { dp.setAutoplayPreference(!!withSound); } catch (_) {} }
    else S.localPref = withSound ? 'on' : 'off';
    S.unlocked = true;
    if (withSound) { audioSessionPlayback(); resumeNow(); resumeMusic(); }
    else { music.stop({ fadeMs: 0 }); rainStop(); }
    emitSound();
    return soundOn();
  }
  // ⏸ 選單的「聲音 開／關」（文字開關，不用 🔊 emoji）：只能在 click handler 內呼叫
  function setSound(on) {
    const dp = DP();
    if (dp && typeof dp.setAutoplayPreference === 'function') { try { dp.setAutoplayPreference(!!on); } catch (_) {} }
    S.localPref = on ? 'on' : 'off';
    S.unlocked = true;
    if (on) { audioSessionPlayback(); resumeNow(); resumeMusic(); }
    else { music.mute(); rainStop(); }
    emitSound(); syncToggles();
    return soundOn();
  }
  function mountToggle(el) {
    if (!el) return null;
    const onToggle = enable => {
      // 關：聲音停，但「唱盤上那張」留著（迷你唱盤照轉、圈標不消失）；開：接著放剛剛那張
      if (enable) { S.unlocked = true; if (!DP()) S.localPref = 'on'; audioSessionPlayback(); resumeNow(); resumeMusic(); }
      else { if (!DP()) S.localPref = 'off'; music.mute(); rainStop(); }
      emitSound();
      return false;
    };
    const dp = DP();
    if (dp && typeof dp.createToggle === 'function') {
      try { const t = dp.createToggle(el, { armOnEnable: false, onToggle }); if (t) S.toggles.add(t); return t; } catch (e) { console.error(e); }
    }
    // 沒有 DipPlayer：自己做一顆
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'dip-autoplay-toggle dlfx-toggle';
    const sync = () => { const on = pref() === 'on' && S.unlocked; b.textContent = on ? '🔊' : '🔇'; b.setAttribute('aria-pressed', String(on)); b.setAttribute('aria-label', on ? '關閉聲音' : '開啟聲音'); };
    b.addEventListener('click', ev => { ev.preventDefault(); ev.stopPropagation(); const en = !(pref() === 'on' && S.unlocked); S.localPref = en ? 'on' : 'off'; onToggle(en); sync(); });
    el.appendChild(b); sync();
    const h = { el: b, sync, destroy() { S.toggles.delete(h); b.remove(); } };
    S.toggles.add(h);
    return h;
  }
  function resumeMusic() {
    const c = S.resumeCard; S.resumeCard = null;
    if (c && !M.cur && soundOn()) music.play(c, { fadeMs: 800 }).catch(() => {});
  }
  function onSound(cb) { S.soundCbs.add(cb); return () => S.soundCbs.delete(cb); }

  // ---------------------------------------------------------------- synth helpers
  function out() { return S.master || (S.ctx && S.ctx.destination); }
  function noiseBuf(c) {
    if (S.noise && S.noise.sampleRate === c.sampleRate) return S.noise;
    const len = Math.floor(c.sampleRate * 1.0), b = c.createBuffer(1, len, c.sampleRate), d = b.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    return (S.noise = b);
  }
  function pinkBuf(c) {
    if (S.pink && S.pink.sampleRate === c.sampleRate) return S.pink;
    const len = Math.floor(c.sampleRate * 1.0), b = c.createBuffer(1, len, c.sampleRate), d = b.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + w * 0.0555179; b1 = 0.99332 * b1 + w * 0.0750759; b2 = 0.969 * b2 + w * 0.153852;
      b3 = 0.8665 * b3 + w * 0.3104856; b4 = 0.55 * b4 + w * 0.5329522; b5 = -0.7616 * b5 - w * 0.016898;
      d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11; b6 = w * 0.115926;
    }
    return (S.pink = b);
  }
  // tone: o = { type, f, f2 (end freq), t (start offset s), d (dur s), g (peak gain), a (attack s), lin (linear decay), dest }
  function tone(c, o) {
    const t0 = c.currentTime + (o.t || 0), d = o.d || 0.1, a = o.a == null ? 0.004 : o.a, g = o.g == null ? 0.3 : o.g;
    const osc = c.createOscillator(), gn = c.createGain();
    osc.type = o.type || 'sine';
    osc.frequency.setValueAtTime(Math.max(1, o.f), t0);
    if (o.f2) osc.frequency.exponentialRampToValueAtTime(Math.max(1, o.f2), t0 + d);
    gn.gain.setValueAtTime(0.0001, t0);
    gn.gain.linearRampToValueAtTime(g, t0 + a);
    if (o.lin) gn.gain.linearRampToValueAtTime(0.0001, t0 + d); else gn.gain.exponentialRampToValueAtTime(0.0001, t0 + d);
    osc.connect(gn);
    if (o.filter) { const fl = c.createBiquadFilter(); fl.type = o.filter.type; fl.frequency.setValueAtTime(o.filter.f, t0); if (o.filter.f2) fl.frequency.exponentialRampToValueAtTime(o.filter.f2, t0 + d); gn.connect(fl); fl.connect(o.dest || out()); }
    else gn.connect(o.dest || out());
    osc.start(t0); osc.stop(t0 + d + 0.03);
    return osc;
  }
  // noise: o = { t, d, g, a, filter:{type,f,f2,q}, pink, curve:'exp'|'lin'|'rev' }
  function noise(c, o) {
    const t0 = c.currentTime + (o.t || 0), d = o.d || 0.05, g = o.g == null ? 0.3 : o.g, a = o.a == null ? 0.002 : o.a;
    const src = c.createBufferSource(); src.buffer = o.pink ? pinkBuf(c) : noiseBuf(c);
    src.loop = d > 0.9;
    const gn = c.createGain();
    if (o.curve === 'rev') { gn.gain.setValueAtTime(0.0001, t0); gn.gain.linearRampToValueAtTime(g, t0 + d); gn.gain.setValueAtTime(0, t0 + d + 0.002); }
    else {
      gn.gain.setValueAtTime(0.0001, t0); gn.gain.linearRampToValueAtTime(g, t0 + a);
      if (o.curve === 'lin') gn.gain.linearRampToValueAtTime(0.0001, t0 + d); else gn.gain.exponentialRampToValueAtTime(0.0001, t0 + d);
    }
    let node = src;
    if (o.filter) {
      const fl = c.createBiquadFilter(); fl.type = o.filter.type; fl.Q.value = o.filter.q == null ? 0.9 : o.filter.q;
      fl.frequency.setValueAtTime(o.filter.f, t0); if (o.filter.f2) fl.frequency.exponentialRampToValueAtTime(o.filter.f2, t0 + d);
      node.connect(fl); node = fl;
    }
    node.connect(gn); gn.connect(o.dest || out());
    src.start(t0, Math.random() * 0.5); src.stop(t0 + d + 0.05);
    return src;
  }
  const NOTE = { C4: 261.63, E4: 329.63, G4: 392.0, C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880, B5: 987.77, C6: 1046.5, D6: 1174.66, E6: 1318.51 };
  const QI_SCALE = [NOTE.C5, NOTE.D5, NOTE.E5, NOTE.F5, NOTE.G5, NOTE.A5, NOTE.B5, NOTE.C6, NOTE.D6, NOTE.E6];

  const SFX = {
    bell(c) { [1320, 1760].forEach(f => tone(c, { f, d: 0.9, g: 0.22, a: 0.002 })); [1320, 1760].forEach(f => tone(c, { f, t: 0.14, d: 0.9, g: 0.22 * 0.7, a: 0.002 })); },
    tick(c) { tone(c, { type: 'square', f: 880, d: 0.025, g: 0.12, a: 0.001 }); },
    select(c) { tone(c, { type: 'triangle', f: 440, f2: 660, d: 0.07, g: 0.3, a: 0.003 }); },
    // 低頻本體照 SPEC；另外疊一點 250 Hz 以上的泛音／噪音，手機喇叭才聽得到（手機喇叭 250 Hz 以下幾乎不出聲）
    slam(c) { tone(c, { f: 60, f2: 40, d: 0.12, g: 0.65, a: 0.002 }); noise(c, { d: 0.03, g: 0.35, filter: { type: 'highpass', f: 2000 } }); noise(c, { d: 0.05, g: 0.45, filter: { type: 'bandpass', f: 500, q: 0.8 } }); tone(c, { type: 'square', f: 240, f2: 160, d: 0.09, g: 0.4, filter: { type: 'lowpass', f: 1600 } }); },
    // 落針：90 Hz 的「咚」手機喇叭放不出來，疊一個 250 Hz 以上的短「叩」（三角波＋中頻噪音）
    needle(c) { noise(c, { d: 0.04, g: 0.35, filter: { type: 'bandpass', f: 3000, q: 1.2 } }); tone(c, { f: 90, d: 0.06, g: 0.5, a: 0.002 }); tone(c, { type: 'triangle', f: 340, f2: 210, d: 0.06, g: 0.34, a: 0.002 }); noise(c, { d: 0.035, g: 0.3, filter: { type: 'bandpass', f: 900, q: 1 } }); },
    readHit(c, o) { const k = (o && o.oct) || 1; [NOTE.C5, NOTE.E5, NOTE.G5].forEach((f, i) => tone(c, { type: 'triangle', f: f * k, t: i * 0.04, d: 0.14, g: 0.32 })); },
    seeThrough(c) { SFX.readHit(c, { oct: 2 }); noise(c, { d: 0.18, g: 0.28, filter: { type: 'bandpass', f: 6000, f2: 2000, q: 1.4 } }); },
    feintHit(c) { tone(c, { type: 'sawtooth', f: 400, f2: 90, d: 0.22, g: 0.25, a: 0.003, filter: { type: 'lowpass', f: 2400 } }); noise(c, { d: 0.2, g: 0.18, filter: { type: 'bandpass', f: 1800, f2: 500, q: 0.8 } }); },
    scratch(c) { tone(c, { type: 'sawtooth', f: 300, f2: 120, d: 0.14, g: 0.16, a: 0.003, filter: { type: 'lowpass', f: 2000 } }); noise(c, { d: 0.12, g: 0.12, filter: { type: 'bandpass', f: 1500, f2: 600, q: 0.8 } }); },
    hurt(c) { tone(c, { f: 110, d: 0.18, g: 0.5 }); tone(c, { type: 'square', f: 55, d: 0.08, g: 0.25 }); tone(c, { type: 'square', f: 220, f2: 110, d: 0.14, g: 0.38, filter: { type: 'lowpass', f: 1800 } }); noise(c, { d: 0.06, g: 0.3, filter: { type: 'bandpass', f: 800, q: 0.9 } }); },
    mirror(c) { tone(c, { f: 720, d: 0.06, g: 0.5, a: 0.001 }); },
    qiUp(c, o) { const n = Math.max(1, Math.min(10, (o && o.n) || 1)); tone(c, { type: 'square', f: QI_SCALE[n - 1], d: 0.04, g: 0.1, a: 0.002 }); },
    ultCharge(c) { noise(c, { d: 0.45, g: 0.3, a: 0.05, curve: 'lin', filter: { type: 'highpass', f: 200, f2: 6000, q: 0.7 } }); },
    ult(c) {
      tone(c, { f: 50, d: 0.3, g: 0.7 });
      tone(c, { type: 'triangle', f: 120, f2: 60, d: 0.3, g: 0.35 });
      tone(c, { type: 'square', f: 200, f2: 100, d: 0.24, g: 0.38, filter: { type: 'lowpass', f: 1800 } });
      noise(c, { d: 0.14, g: 0.7, filter: { type: 'bandpass', f: 600, q: 0.8 } });
      noise(c, { d: 0.4, g: 0.5, a: 0.04, pink: true, filter: { type: 'bandpass', f: 1200, q: 0.5 } });
    },
    eUltWarn(c) {
      [0, 0.18].forEach(t => {
        tone(c, { f: 55, t, d: 0.09, g: 0.7, a: 0.004 });
        tone(c, { type: 'square', f: 110, t, d: 0.09, g: 0.42, a: 0.004, filter: { type: 'lowpass', f: 1400 } });
        noise(c, { t, d: 0.04, g: 0.6, filter: { type: 'bandpass', f: 700, q: 1 } });
      });
    },
    reflect(c) { noise(c, { d: 0.4, g: 0.45, curve: 'rev', filter: { type: 'highpass', f: 3000 } }); [NOTE.C4, NOTE.G4, NOTE.C5, NOTE.E5].forEach(f => tone(c, { type: 'triangle', f, t: 0.4, d: 0.4, g: 0.2 })); },
    faceChange(c) { SFX.feintHit(c); tone(c, { type: 'square', f: 220, t: 0.06, d: 0.07, g: 0.15 }); tone(c, { type: 'square', f: 220, t: 0.2, d: 0.07, g: 0.15 }); },
    ko(c) { tone(c, { f: 300, f2: 80, d: 0.5, g: 0.6, a: 0.005, lin: true }); },
    win(c) { [NOTE.C5, NOTE.E5, NOTE.G5, NOTE.C6].forEach((f, i) => tone(c, { type: 'square', f, t: i * 0.09, d: 0.09, g: 0.14, a: 0.002 })); },
    lose(c) {
      [392.0, 329.63].forEach((f, i) => tone(c, { type: 'square', f, t: i * 0.15, d: 0.15, g: 0.14, a: 0.002 }));
      tone(c, { type: 'square', f: 261.63, t: 0.3, d: 0.3, g: 0.14, a: 0.002, filter: { type: 'lowpass', f: 3000, f2: 200 } });
    },
    flip(c) { noise(c, { d: 0.025, g: 0.3, filter: { type: 'highpass', f: 4000 } }); noise(c, { t: 0.09, d: 0.025, g: 0.3, filter: { type: 'highpass', f: 4000 } }); },
  };

  function sfx(name, opts) {
    if (!soundOn()) return;
    const f = SFX[name]; if (!f) return;
    const c = ctx(); if (!c || !out()) return;
    try { if (c.state !== 'running' && !S.hidden) { const p = c.resume(); if (p && p.catch) p.catch(() => {}); } } catch (_) {}
    try { f(c, opts || {}); } catch (e) { /* 音效失敗不影響遊戲 */ }
  }
  // 打字機嗶聲（每 2 字呼叫一次；說話者音高 §4.1）。jitter：跳針王 ±20 Hz
  function blip(freq, wave, jitter) {
    if (!soundOn() || !freq) return;
    const c = ctx(); if (!c || !out()) return;
    const f = freq + (jitter ? (Math.random() * 2 - 1) * jitter : 0);
    try { tone(c, { type: wave || 'square', f, d: 0.012, g: 0.06 / MASTER * 0.35, a: 0.001 }); } catch (_) {}
  }
  // 雨聲：白噪音 → bandpass 1.2 kHz Q 0.7 → gain 0.05；每 80–200 ms 一顆 3 ms 高通「滴」
  function rainStart() {
    if (!soundOn()) return;
    const c = ctx(); if (!c) return;
    if (S.rain && S.rain.ctx === c) return;
    try {
      const src = c.createBufferSource(); src.buffer = noiseBuf(c); src.loop = true;
      const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 1200; bp.Q.value = 0.7;
      const g = c.createGain(); g.gain.setValueAtTime(0.0001, c.currentTime); g.gain.linearRampToValueAtTime(0.05, c.currentTime + 0.6);
      src.connect(bp); bp.connect(g); g.connect(c.destination); src.start();
      const R = S.rain = { ctx: c, src, g, timer: 0 };
      const drip = () => {
        if (S.rain !== R) return;
        if (soundOn()) { try { noise(c, { d: 0.003, g: 0.05 + Math.random() * 0.05, a: 0.0005, dest: c.destination, filter: { type: 'highpass', f: 3500 + Math.random() * 3000 } }); } catch (_) {} }
        R.timer = setTimeout(drip, 80 + Math.random() * 120);
      };
      drip();
    } catch (_) { S.rain = null; }
  }
  function rainStop() {
    const R = S.rain; S.rain = null; if (!R) return;
    clearTimeout(R.timer);
    try { const t = R.ctx.currentTime; R.g.gain.cancelScheduledValues(t); R.g.gain.setValueAtTime(R.g.gain.value, t); R.g.gain.linearRampToValueAtTime(0.0001, t + 0.4); R.src.stop(t + 0.45); } catch (_) {}
  }

  // ---------------------------------------------------------------- music（試聽）
  // cache：url → 抓下來的原始檔（ArrayBuffer，約 1 MB／首，留 6 首）；dec：url → 解碼後的 AudioBuffer（約 10 MB／首，只留 2 首）
  const M = { cache: new Map(), dec: new Map(), cur: null, card: null, token: 0, cbs: new Set(), endCbs: new Set() };
  function lru(map, key, entry, max) { map.delete(key); map.set(key, entry); while (map.size > max) { const k = map.keys().next().value; map.delete(k); } }
  function fetchBytes(url) {
    const hit = M.cache.get(url);
    if (hit) { lru(M.cache, url, hit, LRU_MAX); return hit.p; }
    const entry = { p: null };
    entry.p = (async () => {
      const r = await fetch(url, { mode: 'cors', credentials: 'omit' });
      if (!r.ok) throw new Error('http ' + r.status);
      return r.arrayBuffer();
    })();
    entry.p.catch(() => { if (M.cache.get(url) === entry) M.cache.delete(url); });
    lru(M.cache, url, entry, LRU_MAX);
    return entry.p;
  }
  function load(url) {
    const hit = M.dec.get(url);
    if (hit) { lru(M.dec, url, hit, DEC_MAX); return hit.p; }
    const entry = { p: null };
    entry.p = (async () => {
      const c = ctx(); if (!c) throw new Error('no audio');
      const bytes = await fetchBytes(url);
      // decodeAudioData 會把傳進去的 ArrayBuffer 拿走：給它一份複本，原始檔留在快取
      const ab = bytes.slice(0);
      return new Promise((res, rej) => { try { const p = c.decodeAudioData(ab, res, rej); if (p && p.then) p.then(res, rej); } catch (e) { rej(e); } });
    })();
    entry.p.catch(() => { if (M.dec.get(url) === entry) M.dec.delete(url); });
    lru(M.dec, url, entry, DEC_MAX);
    return entry.p;
  }
  function emitMusic() { const card = M.card; M.cbs.forEach(cb => { try { cb(card); } catch (e) { console.error(e); } }); }
  function fadeOutCur(fadeMs) {
    const cur = M.cur; M.cur = null; if (!cur) return;
    clearTimeout(cur.maxT);
    try { const t = cur.ctx.currentTime, d = Math.max(0.02, fadeMs / 1000); cur.g.gain.cancelScheduledValues(t); cur.g.gain.setValueAtTime(cur.g.gain.value, t); cur.g.gain.linearRampToValueAtTime(0.0001, t + d); cur.src.stop(t + d + 0.05); } catch (_) {}
  }
  const music = {
    // play(card,{fadeMs, maxMs, exclusive}) → Promise<boolean>：真的出聲才 true。靜音時只換「唱盤上那張」（視覺），不出聲。
    //   maxMs：放這麼久就淡出（試聽機 15 秒）；exclusive：一呼叫就先把正在放的那首收掉（抓檔慢時，不會讓上一首墊在底下被當成題目）
    play(card, opts) {
      opts = opts || {};
      const fadeMs = opts.fadeMs != null ? opts.fadeMs : 1500;
      const tok = ++M.token;
      if (!card) return Promise.resolve(false);
      if (!soundOn() || !card.previewUrl) {
        if (!card.previewUrl) return Promise.resolve(false);
        M.card = card; S.resumeCard = card; emitMusic(); return Promise.resolve(false);
      }
      if (M.card && M.card.id === card.id && M.cur && !opts.maxMs) return Promise.resolve(true);
      if (opts.exclusive) fadeOutCur(Math.min(fadeMs, 400));
      return new Promise(resolve => {
        let done = false;
        const giveUp = setTimeout(() => { if (!done) { done = true; resolve(false); } }, GIVE_UP_MS);
        load(card.previewUrl).then(buf => {
          if (done || tok !== M.token || !soundOn()) { if (!done) { done = true; clearTimeout(giveUp); resolve(false); } return; }
          done = true; clearTimeout(giveUp);
          const c = ctx(); if (!c) { resolve(false); return; }
          try {
            if (c.state !== 'running') { const p = c.resume(); if (p && p.catch) p.catch(() => {}); }
            fadeOutCur(fadeMs);
            const src = c.createBufferSource(); src.buffer = buf;
            const g = c.createGain(); const t = c.currentTime, d = Math.max(0.02, fadeMs / 1000);
            g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(MUSIC_VOL, t + d);
            src.connect(g); g.connect(c.destination); src.start(t);
            const me = { ctx: c, src, g, card, maxT: 0 };
            // 自然放完（不是被換掉、不是被 maxMs 收掉）才通知：讓對決畫面接著放下一張，不留 20 秒的空白
            src.onended = () => { if (M.cur === me) { M.cur = null; M.endCbs.forEach(cb => { try { cb(card); } catch (e) { console.error(e); } }); } };
            if (opts.maxMs) me.maxT = setTimeout(() => { if (M.cur === me) fadeOutCur(1200); }, Math.max(0, opts.maxMs - 1200));
            M.cur = me; M.card = card;
            sfx('scratch');
            emitMusic(); resolve(true);
          } catch (e) { resolve(false); }
        }).catch(() => { if (!done) { done = true; clearTimeout(giveUp); resolve(false); } });
      });
    },
    stop(opts) { M.token++; fadeOutCur((opts && opts.fadeMs != null) ? opts.fadeMs : 1500); S.resumeCard = null; if (M.card) { M.card = null; emitMusic(); } },
    // 🔇：聲音收掉，但唱盤上那張（圈標）留著；🔊 打開時從這張接著放
    mute() { M.token++; if (M.card) S.resumeCard = M.card; fadeOutCur(0); },
    // 預抓（最多 3 首；只在有聲時抓，避免靜音玩家白下載）：只抓原始檔，換歌時再解碼（約 0.1 s）
    preload(cards) {
      if (!soundOn()) return;
      (cards || []).filter(c => c && c.previewUrl).slice(0, 3).forEach(c => { fetchBytes(c.previewUrl).catch(() => {}); });
    },
    current() { return M.card; },
    // 真的在出聲才 true：有來源、context 在跑、頁面在前景（B05／B13）
    playing() { return !!(M.cur && M.cur.ctx && M.cur.ctx.state === 'running' && !S.hidden); },
    onChange(cb) { M.cbs.add(cb); return () => M.cbs.delete(cb); },
    onEnded(cb) { M.endCbs.add(cb); return () => M.endCbs.delete(cb); },
  };

  // ---------------------------------------------------------------- 切背景／回前景（B13）
  // hidden：記下正在放的那張、真的停掉、suspend；visible：下一次觸碰 resume＋從頭放（iOS 要手勢才能 resume）
  function onVisibility() {
    if (document.hidden) {
      S.hidden = true;
      if (M.cur) { S.resumeCard = M.card; M.token++; fadeOutCur(0); }
      rainStop();
      const c = S.own; if (c && c.state === 'running') { try { const p = c.suspend(); if (p && p.catch) p.catch(() => {}); } catch (_) {} }
      emitMusic(); emitSound();
      return;
    }
    S.hidden = false;
    emitMusic(); emitSound();
    if (S.armed) return;
    S.armed = true;
    const once = () => {
      S.armed = false;
      document.removeEventListener('pointerdown', once, true); document.removeEventListener('keydown', once, true);
      if (!soundOn()) return;
      resumeNow();
      resumeMusic();
    };
    document.addEventListener('pointerdown', once, true); document.addEventListener('keydown', once, true);
  }
  document.addEventListener('visibilitychange', onVisibility);

  // ---------------------------------------------------------------- visual fx
  function reducedMotion() { try { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (_) { return false; } }
  const sp = () => S.speed || 1;
  function setSpeed(n) { S.speed = Math.max(0.25, +n || 1); }
  function layer() {
    let l = document.getElementById('dlfx-layer');
    if (!l) { l = document.createElement('div'); l.id = 'dlfx-layer'; l.className = 'dlfx-layer'; document.body.appendChild(l); }
    return l;
  }
  function anim(el, kf, o) {
    try { const a = el.animate(kf, Object.assign({}, o, { duration: (o.duration || 100) / sp() })); return a; } catch (_) { return null; }
  }
  function fin(a, ms) { return new Promise(r => { if (a && a.finished) a.finished.then(r, r); else setTimeout(r, ms / sp()); }); }

  function shake(el, px, ms) {
    if (!el || reducedMotion()) return Promise.resolve();
    px = px || 4; ms = ms || 120;
    const n = Math.max(3, Math.round(ms / 40)), kf = [];
    for (let i = 0; i <= n; i++) { const k = i === n ? 0 : (1 - i / n); const dx = (i % 2 ? -1 : 1) * px * k, dy = ((i * 7) % 3 - 1) * px * 0.4 * k; kf.push({ transform: `translate(${dx.toFixed(1)}px,${dy.toFixed(1)}px)` }); }
    return fin(anim(el, kf, { duration: ms, easing: 'linear' }), ms);
  }
  // 打擊停頓：整個畫面的動畫凍住 ms（WAAPI＋CSS 動畫都暫停）
  function hitStop(ms) {
    ms = ms || 90;
    let list = [];
    try { list = document.getAnimations().filter(a => a.playState === 'running'); list.forEach(a => a.pause()); } catch (_) {}
    return new Promise(r => setTimeout(() => { list.forEach(a => { try { a.play(); } catch (_) {} }); r(); }, ms / sp()));
  }
  function flash(color, ms) {
    ms = ms || 120;
    if (reducedMotion()) return Promise.resolve();
    const f = document.createElement('div'); f.className = 'dlfx-flash'; f.style.background = color || '#fff';
    document.body.appendChild(f);
    const a = anim(f, [{ opacity: 0.9 }, { opacity: 0 }], { duration: ms, easing: 'ease-out', fill: 'forwards' });
    return fin(a, ms).then(() => f.remove());
  }
  function anchorPt(el) {
    if (!el || !el.getBoundingClientRect) return { x: window.innerWidth / 2, y: window.innerHeight / 2, w: 0, h: 0 };
    const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top, w: r.width, h: r.height, cy: r.top + r.height / 2 };
  }
  // 飄字：大數字＋一行 12px 拆解；cls：'toE'|'toP'|'big'|'small'|'qi'|'neg'
  // 同時飄的字不疊在一起，也不壓在 opt.avoid 給的重要標籤（聲望條、品味輾壓鈕、橫幅…）上：
  // 先試原位，再往上／下一格一格挪（opt.prefer 'down' 先往下），都不行就挑壓得最少的位置。整條上飄的路徑都算佔位。
  const liveFloats = new Set();
  function boxOf(e) {
    if (!e) return null;
    if (Array.isArray(e)) return e;
    if (!e.getBoundingClientRect || !e.isConnected) return null;
    const cs = getComputedStyle(e);
    if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity < 0.1) return null;   // 收起來的泡泡不算
    const r = e.getBoundingClientRect();
    return r.width && r.height ? [r.left, r.top, r.right, r.bottom] : null;
  }
  function overlap(a, b) {
    const w = Math.min(a[2], b[2]) - Math.max(a[0], b[0]), h = Math.min(a[3], b[3]) - Math.max(a[1], b[1]);
    return w > 0 && h > 0 ? w * h : 0;
  }
  function floatText(anchorEl, text, sub, cls, opt) {
    opt = opt || {};
    const p = anchorPt(anchorEl);
    const d = document.createElement('div');
    d.className = 'dlfx-float ' + (cls || '');
    d.innerHTML = `<span class="n"></span>${sub ? '<span class="s"></span>' : ''}`;
    d.querySelector('.n').textContent = text;
    if (sub) d.querySelector('.s').textContent = sub;
    d.style.left = '0px'; d.style.top = '0px';
    layer().appendChild(d);
    const dur = opt.ms || 600, rise = opt.rise || 34;
    const vw = window.innerWidth || 390, vh = window.innerHeight || 700;
    const fw = (d.offsetWidth || 120) * 1.2, fh = (d.offsetHeight || 20) * 1.2;   // 彈出時放大 1.15：多留一點
    const half = Math.ceil(fw / 2) + 4;
    const clampX = x => Math.max(half, Math.min(vw - half, x));
    const clampY = y => Math.max(fh + rise + 2, Math.min(vh - 2, y));
    const x0 = clampX(p.x + (opt.dx || 0)), y0 = clampY(p.y + (opt.dy || 0) + 6);
    const foot = (x, y) => [x - fw / 2, y - fh - rise, x + fw / 2, y];
    const now = performance.now();
    const others = [];
    liveFloats.forEach(f => { if (f.until > now && f.el.isConnected) others.push(f.box); else liveFloats.delete(f); });
    const avoid = (opt.avoid || []).map(boxOf).filter(Boolean).map(b => [b[0] - 4, b[1] - 4, b[2] + 4, b[3] + 4]);   // 留 4px：畫面震的時候也不擦到
    const score = b => others.reduce((t, o) => t + overlap(b, o) * 4, 0) + avoid.reduce((t, o) => t + overlap(b, o), 0);
    // 候選位置：上下各 3 格 × 左右 0／半個字寬／一個字寬；離原位越近越先試（opt.prefer 'down' 時往下的先試）
    // 挪動也有代價（pen＝每一單位挪動抵多少重疊面積）：寧可輕微壓到標籤，也不要飄離它描述的東西太遠；
    // 字壓字的權重是 4 倍，所以兩個飄字撞在一起時還是會挪開。
    const step = fh + 4, down = opt.prefer === 'down' ? 1 : -1, cands = [];
    const pen = 0.06 * fw * fh;
    for (let k = -3; k <= 3; k++) for (const j of [0, -0.5, 0.5, -1, 1]) {
      const x = clampX(x0 + j * fw), y = clampY(y0 + k * step);
      cands.push({ x, y, cost: Math.abs(k) * 2 + Math.abs(j) * 3 + (k && Math.sign(k) !== down ? 1 : 0) });
    }
    cands.sort((p, q) => p.cost - q.cost);
    let best = null;
    for (const c of cands) {
      const sc = score(foot(c.x, c.y)), tot = sc + c.cost * pen;
      if (!best || tot < best.tot) best = { x: c.x, y: c.y, sc, tot };
      if (sc === 0) break;   // 依挪動成本排序：第一個完全不壓的位置就是最佳
    }
    d.style.left = Math.round(best.x) + 'px'; d.style.top = Math.round(best.y) + 'px';
    const rec = { el: d, box: foot(best.x, best.y), until: now + (dur + 300) / sp() };
    liveFloats.add(rec);
    let a;
    if (reducedMotion()) a = anim(d, [{ opacity: 0 }, { opacity: 1, offset: 0.25 }, { opacity: 1, offset: 0.75 }, { opacity: 0 }], { duration: dur + 300, fill: 'forwards' });
    else a = anim(d, [
      { transform: 'translate(-50%,-100%) scale(.6)', opacity: 0 },
      { transform: 'translate(-50%,-110%) scale(1.15)', opacity: 1, offset: 0.15 },
      { transform: `translate(-50%,calc(-100% - ${rise * 0.6}px)) scale(1)`, opacity: 1, offset: 0.7 },
      { transform: `translate(-50%,calc(-100% - ${rise}px)) scale(1)`, opacity: 0 },
    ], { duration: dur + 300, easing: 'ease-out', fill: 'forwards' });
    return fin(a, dur + 300).then(() => { liveFloats.delete(rec); d.remove(); });
  }
  // 蓋章：300 ms 彈出，停 ms（預設 900）後淡出。sub＝章下屬性色小字（技能名），subCls 'c'|'o'|'h'
  function stamp(anchorEl, text, cls, ms, sub, subCls) {
    const p = anchorPt(anchorEl);
    const d = document.createElement('div');
    d.className = 'dlfx-stamp ' + (cls || 'gold');
    d.textContent = text;
    if (sub) { const s = document.createElement('small'); s.textContent = sub; if (subCls) s.className = subCls; d.appendChild(s); }
    d.style.left = p.x + 'px'; d.style.top = (p.cy != null ? p.cy : p.y) + 'px';
    layer().appendChild(d);
    const hold = ms == null ? 900 : ms;
    let a;
    if (reducedMotion()) a = anim(d, [{ opacity: 0 }, { opacity: 1, offset: 0.12 }, { opacity: 1, offset: 0.85 }, { opacity: 0 }], { duration: 300 + hold + 200, fill: 'forwards' });
    else a = anim(d, [
      { transform: 'translate(-50%,-50%) rotate(-6deg) scale(2.4)', opacity: 0 },
      { transform: 'translate(-50%,-50%) rotate(-6deg) scale(.92)', opacity: 1, offset: 300 / (500 + hold) * 0.7 },
      { transform: 'translate(-50%,-50%) rotate(-6deg) scale(1)', opacity: 1, offset: 300 / (500 + hold) },
      { transform: 'translate(-50%,-50%) rotate(-6deg) scale(1)', opacity: 1, offset: (300 + hold) / (500 + hold) },
      { transform: 'translate(-50%,-50%) rotate(-6deg) scale(.5)', opacity: 0 },
    ], { duration: 500 + hold, easing: 'ease-out', fill: 'forwards' });
    return fin(a, 500 + hold).then(() => d.remove());
  }
  // 碎光（看穿）
  function sparks(anchorEl, n) {
    if (reducedMotion()) return;
    const p = anchorPt(anchorEl);
    for (let i = 0; i < (n || 10); i++) {
      const s = document.createElement('i'); s.className = 'dlfx-spark';
      s.style.left = p.x + 'px'; s.style.top = (p.cy != null ? p.cy : p.y) + 'px';
      layer().appendChild(s);
      const ang = Math.random() * Math.PI * 2, r = 40 + Math.random() * 50;
      const a = anim(s, [{ transform: 'translate(0,0) scale(1)', opacity: 1 }, { transform: `translate(${Math.cos(ang) * r}px,${Math.sin(ang) * r}px) scale(.3)`, opacity: 0 }], { duration: 520, easing: 'cubic-bezier(.2,.7,.3,1)', fill: 'forwards' });
      fin(a, 520).then(() => s.remove());
    }
  }

  // 遇敵：roguelike.html L2344–2361 encounterFx 逐字搬（mark 改接受目標元素）。resolve＝原版 done()（≈2,021 ms）
  function encounterFx(done, opts) {
    opts = opts || {};
    const foe = opts.target || null;
    if (foe && opts.mark !== false) { const ex = document.createElement('div'); ex.className = 'rpg-excl'; ex.textContent = '！'; if (getComputedStyle(foe).position === 'static') foe.style.position = 'relative'; foe.appendChild(ex); }
    const ov = document.createElement('div'); ov.className = 'enc-ov';
    ov.innerHTML = '<div class="enc-flash"></div><div class="enc-bars">' + '<i></i>'.repeat(8) + '</div>';
    document.body.appendChild(ov);
    const t = ms => new Promise(r => setTimeout(r, ms));
    (async () => {
      await t(opts.mark === false ? 0 : 520);
      ov.classList.add('flash'); await t(3 * 220);
      ov.classList.remove('flash'); ov.classList.add('bars'); await t(640);
      ov.classList.add('black'); await t(200);
      try { if (done) done(); } catch (e) { console.error(e); }
      await t(160);
      ov.classList.add('out'); await t(380); ov.remove();
    })();
  }
  function encounter(targetEl, opts) {
    injectCss();
    return new Promise(resolve => {
      if (reducedMotion()) {
        // 不閃白：150 ms 淡入黑幕 → 換畫面 → 淡出
        const ov = document.createElement('div'); ov.className = 'enc-ov soft';
        document.body.appendChild(ov);
        requestAnimationFrame(() => ov.classList.add('on'));
        setTimeout(() => { resolve(); setTimeout(() => { ov.classList.remove('on'); setTimeout(() => ov.remove(), 200); }, 60); }, 200);
        return;
      }
      sfx('bell');
      encounterFx(resolve, Object.assign({ target: targetEl || null }, opts || {}));
    });
  }
  // v2 進對決（SPEC-v2 §3.7＋主線裁定 #6）：保留店主拍板的「！＋閃白＋黑條」，整段 ≤2 s，鏡頭推近在黑條「之下／之後」同時跑：
  //   0 ms 他頭上「！」＋門鈴 → 200 ms 閃白一次 → 320 ms onPush()：呼叫端開始推鏡頭（約 760 ms）＋盤面從下方淡入，同時黑條一條條掃進來（steps(6)）
  //   → 約 960 ms 蓋滿：onCovered() →「！」收掉 → 1000 ms 黑條往兩邊退開（鏡頭還在收最後一段）→ 約 1420 ms 收掉、resolve。
  //   掃進來的時候縫隙裡看得到店內畫面往上收，退開時已經是兩個對決者的橫條＋盤面 → 讀起來是同一個動作。
  //   減少動態：不閃、不掃，「！」300 ms 後 onPush（鏡頭由舞台改 150 ms 淡入淡出），600 ms resolve。
  const ENC2_CSS = `
  .enc2{position:fixed;inset:0;z-index:2147482000;pointer-events:none;}
  .enc2 .f{position:absolute;inset:0;background:#fff;opacity:0;}
  .enc2.flash .f{animation:enc2Flash .18s ease-out 1;}
  @keyframes enc2Flash{0%{opacity:.85;}100%{opacity:0;}}
  .enc2 .b{position:absolute;inset:0;display:flex;flex-direction:column;}
  .enc2 .b i{flex:1;background:#000;transform:translateX(-101%);}
  .enc2 .b i:nth-child(even){transform:translateX(101%);}
  .enc2.in .b i{animation:encBar .5s steps(6,end) forwards;}
  .enc2.in .b i:nth-child(2),.enc2.in .b i:nth-child(7){animation-delay:.04s;}
  .enc2.in .b i:nth-child(3),.enc2.in .b i:nth-child(6){animation-delay:.08s;}
  .enc2.in .b i:nth-child(4),.enc2.in .b i:nth-child(5){animation-delay:.12s;}
  .enc2.out .b i{transform:translateX(0);animation:enc2OutR .4s steps(5,end) forwards;}
  .enc2.out .b i:nth-child(even){animation-name:enc2OutL;}
  @keyframes enc2OutR{to{transform:translateX(101%);}}
  @keyframes enc2OutL{to{transform:translateX(-101%);}}
  .enc2.soft{background:#000;opacity:0;transition:opacity .15s;} .enc2.soft.on{opacity:.85;}
  `;
  function encounter2(targetEl, opts) {
    opts = opts || {};
    injectCss();
    if (!document.getElementById('dlfx-css2')) { const st = document.createElement('style'); st.id = 'dlfx-css2'; st.textContent = ENC2_CSS; (document.head || document.documentElement).appendChild(st); }
    const t = ms => new Promise(r => setTimeout(r, ms));
    const call = fn => { try { if (fn) fn(); } catch (e) { console.error(e); } };
    let ex = null;
    if (targetEl && opts.mark !== false) {
      ex = document.createElement('div'); ex.className = 'rpg-excl'; ex.textContent = '！';
      try { if (getComputedStyle(targetEl).position === 'static') targetEl.style.position = 'relative'; } catch (_) {}
      targetEl.appendChild(ex);
    }
    sfx('bell');
    if (reducedMotion()) {
      return (async () => {
        await t(300); call(opts.onPush); await t(300); if (ex) ex.remove(); call(opts.onCovered);
      })();
    }
    const ov = document.createElement('div');
    ov.className = 'enc2';
    ov.innerHTML = '<div class="f"></div><div class="b">' + '<i></i>'.repeat(8) + '</div>';
    document.body.appendChild(ov);
    return (async () => {
      await t(200); ov.classList.add('flash');
      await t(120); call(opts.onPush); ov.classList.add('in');
      await t(640); if (ex) ex.remove(); call(opts.onCovered);
      await t(40); ov.classList.remove('flash', 'in'); ov.classList.add('out');
      await t(420); ov.remove();
    })();
  }
  // 傳說藏家蓋章出場（roguelike.html bossIntro 移植；文字由呼叫端給）：resolve 於 2.35 s 移除時
  function bossIntro(o) {
    injectCss();
    o = o || {};
    const old = document.getElementById('dlfxBossMask'); if (old) old.remove();
    const m = document.createElement('div'); m.className = 'bossmask'; m.id = 'dlfxBossMask';
    m.innerHTML = `<div class="bline"></div><div class="bemoji"></div><div class="btitle"></div><div class="bsub"></div><div class="bline r"></div>`;
    if (o.spriteHtml) m.querySelector('.bemoji').innerHTML = o.spriteHtml; else m.querySelector('.bemoji').textContent = '👑';
    m.querySelector('.btitle').textContent = o.title || '傳說藏家';
    m.querySelector('.bsub').textContent = o.sub || '';
    document.body.appendChild(m);
    if (!reducedMotion()) document.body.classList.add('boss-shake');
    sfx('slam');
    return new Promise(r => {
      setTimeout(() => { m.classList.add('out'); }, 1850);
      setTimeout(() => { m.remove(); document.body.classList.remove('boss-shake'); r(); }, 2350);
    });
  }
  function vibrate(ms) { try { if (navigator.vibrate) navigator.vibrate(ms || 15); } catch (_) {} }

  const api = {
    init, unlockFromGesture, soundOn, mountToggle, onSound, sfx, blip, rainStart, rainStop, music,
    shake, hitStop, flash, floatText, stamp, sparks, encounter, encounter2, bossIntro, reducedMotion, setSpeed, vibrate, setSound,
    get speed() { return S.speed; },
    _state: S,
  };
  window.DipLabFx = api;
})();
