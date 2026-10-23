/* 調頻 —— 三顆輪子各轉一軸（能量／質地／色溫），轉過去的唱片一張張閃過，停下來鎖定一張。
 *
 * 資料：data/mood/card-moods.json（scripts/build-card-moods.mjs 產生，每張 [x, y, z, 把握] 加 id 雜湊 _h）；
 * 卡池物件用 id 的 FNV-1a 雜湊對上座標，不靠 seed 順序，舊快取的 seed 或還沒評分的新卡只是被跳過。面板外殼是店主的像素稿
 * tune/panel.jpg，滾筒、輪子、開關、按鍵是疊在上面的活件；輪子的滾花拿稿子裡的銅帶
 * （tune/tile-*.png）照圓柱投影取樣捲動。星圖用 Three.js（r128，與 starmap-lab 同版）。
 *
 * 用法（index.html 接線）：
 *   DipTune.configure({ host, loadCardPool, onResult, onBack, player, cardIdOf, onFirstGesture, onGesture, resolveCover, audioPref, setAudioPref });
 *   audioPref() → true/false：站上「自動試聽」開關的現值；setAudioPref(on)：喇叭鈕按下時回寫那顆開關。
 *   DipTune.setAudio(on)：頂欄開關或系統撤銷時由頁面推進來，讓喇叭鈕跟著變。
 *   DipTune.start();     // 進入分頁時呼叫；再次呼叫只會重新顯示，不重建
 *   DipTune.stop();      // 離開分頁：停試聽、停音效
 *   DipTune.pickAgain(); // 結果頁「同頻率再抽一張」：在目前頻率附近加權隨機
 *
 * onResult 收到 { card, cell, cellName, coords }，由呼叫端沿用既有結果頁（showGpResult），本模組不碰那段。
 * 抽卡層平均（MOOD_SCALE_PLAN §2.2）：掃描在百分位空間找卡（每一區密度一樣），不動任何卡的屬性。
 */
(function (global) {
  'use strict';

  let cfg = { host: null, loadCardPool: null, onResult: null, onBack: null, player: null, cardIdOf: null };
  const ORDER = ['calm', 'still', 'languid', 'decay', 'lift', 'crisp', 'boil', 'charge'];
  // 八格配色（2026-10-22 店主定稿，八個色相照色相環排）：暖半邊 放鬆金黃→雀躍橙→沸騰朱紅→恍惚洋紅；
  // 冷半邊 平靜青→冷冽冰藍白→暴躁電藍→頹靡紫。星圖、命中光暈、結果頁「頻率 ●」、就這張的線框都用這一套。
  const CELL_COLOR = { calm: '#f2cf5b', lift: '#ff9a3c', boil: '#ff4d3a', languid: '#e8578f', still: '#5ee6f0', crisp: '#bfe8ff', charge: '#4f8dff', decay: '#9b6bff' };
  const AX = { x: '#f2b341', y: '#8fe0a0', z: '#ff7a6b', cold: '#a08cff' };
  const SIGMA = [0.2, 0.2, 0.3], FLOOR = 0.02, SWEEP_R = 10, FINE_PX = 14;   // 距離權重與掃描半徑（MOOD_LAUNCH_PLAN §4.2，σ 0.35 太寬，實測改 0.2）
  const idOf = (a, b) => (cfg.cardIdOf ? cfg.cardIdOf(a, b) : ((a || '') + '|' + (b || '')).toLowerCase().replace(/\//g, '-').trim());

  function configure(next) { cfg = Object.assign(cfg, next); }

  // ── 狀態 ──────────────────────────────────────────────────────────
  const state = { p: { x: 25, y: 50, z: 50 }, spin: { x: 0, y: 0, z: 0 }, fine: false, seen: [], audioOn: true, built: false, visible: false };
  let DATA = null, CARDS = null, N = 0, T = null, BR = null, NAMES = null;
  let previewCard = null, litIdx = -1, idleTimer = 0, lastTurn = 0;
  let scene, camera, renderer, controls, geo, col, base, sizeAttr, pmat, marker, PX, PY, PZ, THREE_OK = false;
  let el = {}; // DOM refs
  let WHEELS = {}, raf = 0;

  // ── 資料 ──────────────────────────────────────────────────────────
  let dataPromise = null;
  function loadData() {
    if (!dataPromise) {
      dataPromise = Promise.all([
        fetch('data/mood/card-moods.json').then(r => { if (!r.ok) throw new Error('情緒座標載入失敗'); return r.json(); }),
        cfg.loadCardPool(),
      ]).then(([moods, pool]) => {
        if (!Array.isArray(moods._h) || moods._h.length !== moods.cards.length) throw new Error('情緒座標檔格式不對');
        const byHash = new Map();
        moods._h.forEach((h, i) => { const m = moods.cards[i]; if (m) byHash.set(h, m); });
        return { moods, byHash, pool };
      }).catch(e => { dataPromise = null; throw e; });
    }
    return dataPromise;
  }

  function pOf(axis, v) { const b = BR[axis]; let lo = 0, hi = 100; while (lo < hi) { const m = (lo + hi) >> 1; if (b[m] < v) lo = m + 1; else hi = m; } let hi2 = lo; while (hi2 < 100 && b[hi2 + 1] === b[lo]) hi2++; return (lo + hi2) / 2; }
  const rawOf = (axis, p) => { p = Math.max(0, Math.min(100, p)); const i = Math.floor(p), f = p - i; const b = BR[axis]; return i >= 100 ? b[100] : b[i] + (b[i + 1] - b[i]) * f; };
  // 同一個原始值在百分位表上是一段平台（例如能量 3.0 佔 p42–49）；把同值的卡依固定亂數均勻鋪在這段平台上，
  // 轉輪子時才會一張接一張掃過去，而不是幾百張疊在同一點
  function pSpread(axis, v, u) { const b = BR[axis]; let lo = 0, hi = 100; while (lo < hi) { const m = (lo + hi) >> 1; if (b[m] < v) lo = m + 1; else hi = m; } let hi2 = lo; while (hi2 < 100 && b[hi2 + 1] === b[lo]) hi2++; const w = Math.max(1, hi2 - lo); return lo - 0.5 + (w + 1) * u; }
  const hashU = (i, m, k) => ((i * m) % k) / k;
  const cellOf = (x, y, z) => (x >= T.x ? (y >= T.y ? (z >= T.z ? 'boil' : 'charge') : (z >= T.z ? 'lift' : 'crisp')) : (y >= T.y ? (z >= T.z ? 'languid' : 'decay') : (z >= T.z ? 'calm' : 'still')));
  const target = () => ({ x: rawOf('x', state.p.x), y: rawOf('y', state.p.y), z: rawOf('z', state.p.z) });

  const fnv = s => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };
  function buildCards({ moods, byHash, pool }) {
    DATA = moods; T = moods.thresholds; BR = moods.breaks; NAMES = moods.names;
    CARDS = [];
    // 頂級牌（殿堂／遺珠／異端）在卡池裡另放在 pool.apex，一般抽卡不碰；頻率選歌要全部都在星圖上
    // （2026-10-23 店主：A Love Supreme 不見了——917 張頂級牌從頻率選歌上線起就沒進來）
    const rows = [...pool.cards], seenId = new Set();
    for (const t of ['hall', 'pearl', 'heresy']) for (const [artist, album, genres, year] of (pool.apex?.[t] || [])) rows.push({ artist, album, genres: genres || [], year: year || 0, tier: t });
    for (const c of rows) {
      const h = fnv(idOf(c.artist, c.album)); if (seenId.has(h)) continue; seenId.add(h);
      const m = byHash.get(h);
      if (!m) continue;
      const i = CARDS.length;
      CARDS.push({ i, card: c, x: m[0], y: m[1], z: m[2], conf: m[3], cell: cellOf(m[0], m[1], m[2]),
        px: pSpread('x', m[0], hashU(i, 7919, 997)), py: pSpread('y', m[1], hashU(i, 104729, 991)), pz: pSpread('z', m[2], hashU(i, 1299709, 983)) });
    }
    N = CARDS.length;
  }

  // ── 畫面 ──────────────────────────────────────────────────────────
  const CSS = `
.tune-app{--pix:'DotGothic16','Space Mono',monospace;position:relative;display:grid;grid-template-columns:1fr;grid-template-rows:minmax(200px,1fr) auto;width:100%;max-width:720px;margin:0 auto;height:var(--tvh,100dvh);background:#0b0c10;color:#e9e2c8;font-family:var(--pix);font-size:11px;letter-spacing:.04em;overflow:hidden}
/* 轉成橫向（手機側放、矮視窗）才左右並排 */
@media (orientation:landscape) and (max-height:600px) and (min-width:560px){.tune-app{grid-template-columns:minmax(0,1fr) clamp(300px,calc((var(--tvh,100dvh) - 24px) / 0.86),48vw);grid-template-rows:minmax(0,1fr);max-width:none}}
.tune-stage{position:relative;min-width:0;min-height:0;background:#060609;overflow:hidden}
.tune-stage canvas{display:block;width:100%;height:100%;touch-action:none}
.tune-stage .tune-hint{position:absolute;left:12px;bottom:10px;font-size:9px;letter-spacing:.14em;color:#777;pointer-events:none}
.tune-hud{position:absolute;left:10px;top:10px;display:flex;flex-direction:column;gap:6px;align-items:flex-start;max-width:55%}
.tune-readout{display:flex;gap:6px;align-items:center;padding:2px 6px;border:1px solid rgba(233,226,200,.2);background:rgba(10,12,9,.16);font-size:10px;line-height:1.3;font-variant-numeric:tabular-nums;white-space:nowrap}
.tune-readout b{color:var(--c);text-shadow:0 0 5px var(--c);font-weight:400;display:inline-block;min-width:2.9em;text-align:right}
.tune-readout span+span{border-left:1px solid rgba(233,226,200,.18);padding-left:6px}
.tune-spk,.tune-back{height:24px;padding:2px 6px;border:1px solid rgba(233,226,200,.2);background:rgba(10,12,9,.16);color:#e9e2c8;font-family:var(--pix);font-size:10px;cursor:pointer;display:inline-flex;align-items:center;gap:4px}
.tune-spk{width:24px;padding:2px}
.tune-back{width:24px;padding:0;justify-content:center;font-size:14px;line-height:1}
.tune-spk svg{display:block}.tune-spk .b{fill:#e9e2c8}.tune-spk .w{fill:#ffd166}.tune-spk .o{fill:#ff6a3d;display:none}
.tune-spk[aria-pressed="false"] .w{display:none}.tune-spk[aria-pressed="false"] .o{display:block}.tune-spk[aria-pressed="false"] .b{fill:#8d9478}
.tune-now{position:absolute;right:10px;top:10px;display:flex;align-items:center;gap:8px;max-width:min(240px,calc(100% - 20px));padding:4px 8px 4px 4px;border:1px solid rgba(233,226,200,.2);background:rgba(10,12,9,.16);color:#e9e2c8;font-family:var(--pix);font-size:11px;text-align:left;cursor:pointer}
.tune-now:hover{border-color:#ffd166;background:rgba(10,12,9,.4)}
.tune-now img,.tune-now .ph{width:34px;height:34px;object-fit:cover;background:rgba(27,30,24,.4);flex:none;display:grid;place-items:center;color:#6a7058;font-size:11px;opacity:.85}
.tune-now .t{min-width:0;display:grid;gap:0}
.tune-now .a{font-size:9px;color:#b5bb9f;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tune-now .b{font-size:11px;line-height:1.3;color:#fff3c8;text-shadow:0 0 6px rgba(255,220,150,.5);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tune-now .c{display:inline-flex;align-items:center;gap:4px;font-size:9px;letter-spacing:.08em;color:var(--cc);text-shadow:0 0 5px var(--cc);white-space:nowrap;min-width:0}
.tune-now .c i{width:5px;height:5px;background:var(--cc);box-shadow:0 0 5px var(--cc)}
.tune-now .np{display:inline-flex;align-items:center;gap:3px;font-size:8px;color:#9aa088;margin-left:6px;text-shadow:none;letter-spacing:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:110px}
.tune-now .np.on{color:#ffd166}
.tune-now .np i{display:inline-block;width:3px;height:8px;background:#ff6a3d;animation:tuneEq .6s steps(3) infinite alternate}
.tune-now .np i:nth-child(2){animation-delay:.2s}.tune-now .np i:nth-child(3){animation-delay:.4s}
@keyframes tuneEq{from{transform:scaleY(.3)}to{transform:scaleY(1)}}
.tune-now .dot{width:5px;height:5px;background:#ff4d3d;box-shadow:0 0 6px #ff4d3d;animation:tuneBlink .9s steps(2) infinite;flex:none;align-self:flex-start}
@keyframes tuneBlink{50%{opacity:.15}}
.tune-msg{position:absolute;inset:0;display:grid;place-items:center;color:#9aa088;font-size:12px;text-align:center;padding:20px;line-height:1.8}
.tune-app [hidden],#tuneApp[hidden],#tuneResultWrap[hidden]{display:none!important}
.tune-panel{position:relative;min-width:0;min-height:0;display:grid;place-items:end center;padding:10px 10px 0;background:#2c3037 repeating-linear-gradient(135deg,rgba(255,255,255,.025) 0 2px,transparent 2px 9px);border-top:2px solid #14161a;overflow:hidden}
@media (orientation:landscape) and (max-height:600px) and (min-width:560px){.tune-panel{border-top:0;border-left:2px solid #14161a;padding:12px}}
/* 主機由上而下：搜尋列、FREQUENCY（靠左 76% 寬，右側一塊直立的黃銅「就這張」）、輪子模組全寬。整台高 ≈ 1.08 倍寬，依視窗高度反推寬度，一定塞進一個畫面 */
.tune-console{position:relative;width:min(100%,600px,calc((var(--tvh,100dvh) - 340px) / 1.08));display:flex;flex-direction:column;align-items:stretch;gap:1.2cqw;container-type:inline-size;user-select:none}
@media (orientation:landscape) and (max-height:600px) and (min-width:560px){.tune-console{width:min(100%,calc((var(--tvh,100dvh) - 24px) / 1.08))}}
/* 手機直放：面板放大塞滿寬度（2026-10-23 店主：左右空位太多），星圖讓出高度。
   高度一律用 --tvh（JS 記下的視窗高，打字時鍵盤彈出不更新）：不然 100dvh 跟著鍵盤縮、直式被判成橫式，整台版面會跳成左右並排 */
@media (max-width:520px){.tune-console{width:min(100%,calc((var(--tvh,100dvh) - 230px) / 1.08))}.tune-panel{padding:8px 6px 0}}
.tune-mod{position:relative;background-size:100% 100%;background-repeat:no-repeat;image-rendering:pixelated}
.tune-row1{display:flex;gap:2cqw;align-items:stretch}
.tune-mod-freq{width:76%;flex:none;aspect-ratio:1438/499;background-image:url(tune/panel-freq.jpg)}
.tune-mod-wheels{width:100%;aspect-ratio:1438/983;background-image:url(tune/panel-wheels.jpg)}
.tune-btncol{flex:1 1 0;min-width:0;display:grid;place-items:center;padding:1cqw 0}
.tune-draw{height:100%;max-width:100%;aspect-ratio:168/358;background:url(tune/btn-v.png) center/100% 100% no-repeat;image-rendering:pixelated;border:0;padding:0;cursor:pointer;writing-mode:vertical-rl;text-orientation:upright;font-family:var(--pix);font-size:5cqw;letter-spacing:.3em;color:#2a1e07;text-shadow:.15cqw .15cqw 0 rgba(255,236,170,.55);display:grid;place-items:center}
.tune-draw:active{transform:translateY(.4cqw);filter:brightness(1.08)}
.tune-draw[disabled]{opacity:.55;cursor:default}
.tune-console .abs{position:absolute}
.tune-drumwin{left:14.26%;top:36.2%;width:61.2%;height:54.7%;background:#0d0f0d;display:flex;gap:1.1cqw;padding:1.2cqw 1.3cqw;align-items:stretch}
.tune-drum{position:relative;flex:1 1 0;overflow:hidden;background:linear-gradient(180deg,#000 0,#2b2f2a 30%,#3a3f38 50%,#2b2f2a 70%,#000 100%);box-shadow:inset 0 0 0 .3cqw #000}
.tune-drum.wide{flex:2.3 1 0}
.tune-drum .strip{transition:transform .5s cubic-bezier(.25,.9,.3,1.08)}
.tune-drum span{display:block;height:4cqw;line-height:4cqw;text-align:center;font-family:var(--pix);font-size:3cqw;color:var(--w,#e9e2c8);text-shadow:0 0 1cqw var(--w,#e9e2c8)}
.tune-drum.wide span{font-size:2.6cqw;letter-spacing:.2em;padding-left:.2em}
.tune-drum::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.85) 0,rgba(0,0,0,.35) 30%,transparent 40%,transparent 60%,rgba(0,0,0,.35) 70%,rgba(0,0,0,.85) 100%);pointer-events:none}
.tune-sw{left:80.7%;top:40.6%;width:7.6%;height:48.5%;background:transparent;border:0;cursor:pointer;padding:0}
.tune-swlab{left:77%;width:15%;text-align:center;font-family:var(--pix);font-size:1.9cqw;letter-spacing:.1em;color:#8d9478;pointer-events:none}
.tune-swlab.top{top:29%}.tune-swlab.bot{top:90.8%}
.tune-swlab.on{color:#ffd34d;text-shadow:0 0 .8cqw #ffd34d}
.tune-led{left:83.3%;width:1.8%;height:2.8%;background:#2b2a1f;pointer-events:none}
.tune-led.top{top:42.5%}.tune-led.bot{top:84.1%}
.tune-led.on{background:#ffd34d;box-shadow:0 0 .8cqw #ffd34d}
.tune-wheel{background:transparent;cursor:ns-resize;touch-action:none;overflow:hidden;top:15.36%;height:54.5%}
.tune-wheel canvas{display:block;width:100%;height:100%;image-rendering:pixelated}
.tune-wheel[data-axis="x"]{left:15.58%;width:12.66%}.tune-wheel[data-axis="y"]{left:44.78%;width:12.24%}.tune-wheel[data-axis="z"]{left:73.7%;width:12.24%}
.tune-wheel:focus-visible{outline:2px solid #ffd166;outline-offset:-2px}
/* SCAN／FINE 撥桿：原稿槽位上疊三格（上｜中｜下），撥的時候走一格中間 */
/* FREQUENCY 只有 76% 寬又被壓矮，原稿螺絲看起來小一號、扁的；疊上與輪子模組同大小的螺絲 */
.tune-screw{top:1%;width:6.405%;height:18.458%;background:url(tune/screw.png) center/100% 100% no-repeat;image-rendering:pixelated;pointer-events:none}
.tune-screw.l{left:.414%}.tune-screw.r{left:93.181%;top:.648%}
.tune-lever{left:82.197%;top:52.734%;width:4.103%;height:24.162%;background:url(tune/switch.png) 0 0/300% 100% no-repeat;image-rendering:pixelated;pointer-events:none}
.tune-lever[data-pos="mid"]{background-position:50% 0}.tune-lever[data-pos="down"]{background-position:100% 0}
/* 搜尋列：照原稿配色畫的模組（scripts/build-tune-sprites.py），名牌、液晶、黃銅鍵上疊 HTML */
.tune-mod-search{width:100%;aspect-ratio:1440/144;background-image:url(tune/panel-search.png)}
.tune-search-plate{left:8.75%;top:20.833%;width:23.333%;height:58.333%;display:flex;align-items:center;justify-content:center;gap:.35em;font-family:'Noto Sans TC','PingFang TC','Microsoft JhengHei',sans-serif;font-weight:700;font-size:2.3cqw;letter-spacing:.04em;color:#2a1e07;white-space:nowrap;pointer-events:none}
.tune-search-plate small{font-family:system-ui,sans-serif;font-weight:500;font-size:.82em;letter-spacing:.06em}
.tune-search-in{left:34.167%;top:20.833%;width:46.25%;height:58.333%;margin:0;padding:0 1.4cqw;border:0;border-radius:0;outline:0;background:transparent;-webkit-appearance:none;appearance:none;font-family:var(--pix);font-size:16px;line-height:1;color:#ffd34d;text-shadow:0 0 6px rgba(255,211,77,.55);caret-color:#ffd34d}
.tune-search-in::placeholder{color:#6d6440;text-shadow:none;opacity:1}
.tune-search-in::-webkit-search-cancel-button{display:none}
.tune-search-in:focus{box-shadow:inset 0 0 0 2px rgba(255,211,77,.28)}
.tune-search-go{left:82.083%;top:16.667%;width:9.167%;height:66.667%;padding:0;border:0;background:transparent;cursor:pointer}
.tune-search-go:active{background:rgba(42,30,7,.22)}
.tune-search-go:focus-visible{outline:2px solid #ffd166;outline-offset:1px}
.tune-sugg{position:absolute;left:8px;right:8px;bottom:8px;z-index:6;max-height:min(62%,330px);overflow:auto;background:rgba(7,8,7,.95);border:1px solid rgba(233,226,200,.28);box-shadow:0 0 0 1px #000;font-family:var(--pix)}
.tune-sg{display:grid;grid-template-columns:30px minmax(0,1fr);gap:0 8px;align-items:center;width:100%;padding:5px 8px 5px 5px;border:0;border-bottom:1px solid rgba(233,226,200,.08);background:transparent;color:#e9e2c8;font-family:var(--pix);text-align:left;cursor:pointer}
.tune-sg img,.tune-sg .ph{grid-row:span 2;width:30px;height:30px;object-fit:cover;background:#15171a;border-left:3px solid var(--cc)}
.tune-sg .a{font-size:9px;color:#9aa088;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tune-sg .b{font-size:12px;color:#fff3c8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tune-sg[aria-selected="true"],.tune-sg:hover{background:rgba(255,211,77,.12)}
.tune-sg[aria-selected="true"] .b{color:#ffd34d;text-shadow:0 0 5px rgba(255,211,77,.5)}
.tune-sugg .none{padding:10px;font-size:11px;color:#8d9478}
/* 頻率選歌開著時，頁面底色跟面板同色（不再露出白邊） */
#tuneModal.open:has(> #tuneApp:not([hidden])),body:has(#tuneModal.open > #tuneApp:not([hidden])){background:#2c3037}
`;
  const SPK = '<svg viewBox="0 0 12 12" shape-rendering="crispEdges" width="20" height="20"><path class="b" d="M1 4h2v4H1zM3 3h1v6H3zM4 2h1v8H4zM5 1h1v10H5z"/><path class="w" d="M8 4h1v4H8zM10 2h1v1h-1zM10 9h1v1h-1zM11 3h1v6h-1z"/><path class="o" d="M8 3h1v1H8zM9 4h1v1H9zM10 5h1v2h-1zM9 7h1v1H9zM8 8h1v1H8zM11 3h1v1h-1zM11 8h1v1h-1zM10 4h1v1h-1zM10 7h1v1h-1z"/></svg>';

  function html() {
    return `
<div class="tune-app" id="tuneApp">
  <div class="tune-stage" id="tuneStage"><canvas id="tuneGl"></canvas>
    <div class="tune-hud">
      <div class="tune-readout" id="tuneReadout" title="能量 / 質地 / 色溫"><span style="--c:${AX.x}"><b>-.--</b></span><span style="--c:${AX.y}"><b>-.--</b></span><span style="--c:${AX.z}"><b>-.--</b></span></div>
      <button class="tune-spk" id="tuneSpk" type="button" aria-pressed="true" aria-label="聲音">${SPK}</button>
      <button class="tune-back" id="tuneBack" type="button" aria-label="回找一張來聽" title="找一張來聽">↩</button>
    </div>
    <button class="tune-now" id="tuneNow" type="button" hidden></button>
    <div class="tune-hint" id="tuneHint">拖曳旋轉　滾輪縮放</div>
    <div class="tune-sugg" id="tuneSugg" role="listbox" aria-label="搜尋結果" hidden></div>
    <div class="tune-msg" id="tuneMsg">載入中…</div>
  </div>
  <div class="tune-panel"><div class="tune-console" id="tuneConsole">
    <div class="tune-mod tune-mod-search">
      <span class="abs tune-search-plate">搜尋<small>/ SEARCH</small></span>
      <input class="abs tune-search-in" id="tuneSearch" type="search" enterkeyhint="search" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="藝人或專輯" aria-label="搜尋專輯" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="tuneSugg">
      <button class="abs tune-search-go" id="tuneSearchGo" type="button" aria-label="搜尋"></button>
    </div>
    <div class="tune-row1">
    <div class="tune-mod tune-mod-freq">
    <div class="abs tune-drumwin">
      <div class="tune-drum" id="tuneDx" style="--w:${AX.x}"><div class="strip"><span>靜</span><span>躁</span></div></div>
      <div class="tune-drum" id="tuneDy" style="--w:${AX.y}"><div class="strip"><span>輕</span><span>重</span></div></div>
      <div class="tune-drum" id="tuneDz"><div class="strip"><span style="color:${AX.cold};text-shadow:0 0 1cqw ${AX.cold}">冷</span><span style="color:${AX.z};text-shadow:0 0 1cqw ${AX.z}">暖</span></div></div>
      <div class="tune-drum wide" id="tuneDcell"><div class="strip" id="tuneCellStrip"></div></div>
    </div>
    <span class="abs tune-swlab top on" id="tuneSwTop">SCAN</span><span class="abs tune-swlab bot" id="tuneSwBot">FINE</span>
    <i class="abs tune-screw l"></i><i class="abs tune-screw r"></i>
    <i class="abs tune-lever" id="tuneLever" data-pos="up"></i>
    <button class="abs tune-sw" id="tuneMode" type="button" aria-label="SCAN 連續掃描／FINE 一格一張" aria-pressed="false"></button>
    <i class="abs tune-led top on" id="tuneLedTop"></i><i class="abs tune-led bot" id="tuneLedBot"></i>
    </div>
    <div class="tune-btncol"><button class="tune-draw" id="tuneDraw" type="button" disabled>就這張</button></div>
    </div>
    <div class="tune-mod tune-mod-wheels">
    <div class="abs tune-wheel" data-axis="x" role="slider" tabindex="0" aria-label="能量" aria-valuemin="0" aria-valuemax="100" aria-valuenow="25"><canvas></canvas></div>
    <div class="abs tune-wheel" data-axis="y" role="slider" tabindex="0" aria-label="質地" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50"><canvas></canvas></div>
    <div class="abs tune-wheel" data-axis="z" role="slider" tabindex="0" aria-label="色溫" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50"><canvas></canvas></div>
    </div>
  </div></div>
</div>`;
  }

  const esc = s => String(s).replace(/[&<>"]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));

  // ── 星圖 ──────────────────────────────────────────────────────────
  function buildScene() {
    const THREE = global.THREE;
    if (!THREE) return false;
    const stage = el.stage, glc = el.gl;
    renderer = new THREE.WebGLRenderer({ canvas: glc, antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(2, global.devicePixelRatio || 1)); renderer.setClearColor(0x060609, 1);
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100); camera.position.set(2.4, 1.7, 2.6);
    if (THREE.OrbitControls) {
      controls = new THREE.OrbitControls(camera, glc); controls.enableDamping = true; controls.dampingFactor = .08; controls.autoRotate = true; controls.autoRotateSpeed = .6; controls.minDistance = 1.6; controls.maxDistance = 7; controls.enablePan = false;
      let idleT = 0; controls.addEventListener('start', () => { controls.autoRotate = false; clearTimeout(idleT); }); controls.addEventListener('end', () => { idleT = setTimeout(() => { controls.autoRotate = true; }, 6000); });
    }
    const S = c => [c.px / 50 - 1, -(c.py / 50 - 1), c.pz / 50 - 1];
    const pos = new Float32Array(N * 3); col = new Float32Array(N * 3); base = new Float32Array(N * 3);
    const tmp = new THREE.Color();
    for (let i = 0; i < N; i++) { const c = CARDS[i]; tmp.set(CELL_COLOR[c.cell]); base[i * 3] = tmp.r; base[i * 3 + 1] = tmp.g; base[i * 3 + 2] = tmp.b; const [x, y, z] = S(c); pos[i * 3] = x; pos[i * 3 + 1] = y; pos[i * 3 + 2] = z; }
    geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(pos, 3)); geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    sizeAttr = new Float32Array(N); geo.setAttribute('psize', new THREE.BufferAttribute(sizeAttr, 1));
    pmat = new THREE.ShaderMaterial({ transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, uniforms: { uScale: { value: 1 } },
      vertexShader: 'attribute float psize;attribute vec3 color;varying vec3 vC;uniform float uScale;void main(){vC=color;vec4 mv=modelViewMatrix*vec4(position,1.0);gl_PointSize=psize*uScale*(1.0/-mv.z);gl_Position=projectionMatrix*mv;}',
      fragmentShader: 'varying vec3 vC;void main(){vec2 d=gl_PointCoord-.5;float r=length(d);if(r>.5)discard;float a=smoothstep(.5,.15,r);gl_FragColor=vec4(vC,a);}' });
    scene.add(new THREE.Points(geo, pmat));
    scene.add(new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(2, 2, 2)), new THREE.LineBasicMaterial({ color: 0x8a7a55, transparent: true, opacity: .22 })));
    const ax = (hex, a, b) => { const g = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(...a), new THREE.Vector3(...b)]); scene.add(new THREE.Line(g, new THREE.LineBasicMaterial({ color: new THREE.Color(hex), transparent: true, opacity: .32 }))); };
    ax(AX.x, [-1.18, 0, 0], [1.18, 0, 0]); ax(AX.y, [0, -1.18, 0], [0, 1.18, 0]); ax(AX.z, [0, 0, -1.18], [0, 0, 1.18]);
    const faceGrid = (rx, rz, px, py, pz) => { const g = new THREE.GridHelper(2, 10, 0x8a7a55, 0x8a7a55); g.material.transparent = true; g.material.opacity = .16; g.material.depthWrite = false; g.rotation.x = rx; g.rotation.z = rz; g.position.set(px, py, pz); scene.add(g); };
    faceGrid(0, 0, 0, -1, 0); faceGrid(0, 0, 0, 1, 0); faceGrid(Math.PI / 2, 0, 0, 0, -1); faceGrid(Math.PI / 2, 0, 0, 0, 1); faceGrid(0, Math.PI / 2, -1, 0, 0); faceGrid(0, Math.PI / 2, 1, 0, 0);
    const label = (txt, color, p) => { const c = document.createElement('canvas'); c.width = 128; c.height = 128; const g = c.getContext('2d');
      g.font = '700 44px "Space Mono","PingFang TC","Microsoft JhengHei",sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
      g.shadowColor = '#060609'; g.shadowBlur = 14; g.fillStyle = '#060609'; for (let i = 0; i < 3; i++) g.fillText(txt, 64, 66);
      g.shadowBlur = 0; g.fillStyle = color; g.globalAlpha = .9; g.fillText(txt, 64, 66);
      const t = new THREE.CanvasTexture(c); t.minFilter = THREE.LinearFilter; const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, depthTest: false })); s.scale.set(.34, .34, 1); s.renderOrder = 10; s.position.set(...p); scene.add(s); };
    label('靜', AX.x, [-1.3, 0, 0]); label('躁', AX.x, [1.3, 0, 0]); label('輕', AX.y, [0, 1.3, 0]); label('重', AX.y, [0, -1.3, 0]); label('冷', AX.cold, [0, 0, -1.3]); label('暖', AX.z, [0, 0, 1.3]);
    const plane = hex => { const c = new THREE.Color(hex); const m = new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: .05, side: THREE.DoubleSide, depthWrite: false });
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), m); const edge = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(2, 2)), new THREE.LineBasicMaterial({ color: c, transparent: true, opacity: .55 }));
      const grid = new THREE.GridHelper(2, 10, c.getHex(), c.getHex()); grid.material.transparent = true; grid.material.opacity = .3; grid.material.depthWrite = false; grid.rotation.x = Math.PI / 2;
      const g = new THREE.Group(); g.add(mesh, edge, grid); scene.add(g); return g; };
    PX = plane(AX.x); PX.rotation.y = Math.PI / 2; PY = plane(AX.y); PY.rotation.x = Math.PI / 2; PZ = plane(AX.z);
    const glowTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d'); const r = g.createRadialGradient(32, 32, 0, 32, 32, 32); r.addColorStop(0, 'rgba(255,220,150,.9)'); r.addColorStop(.4, 'rgba(255,200,120,.25)'); r.addColorStop(1, 'rgba(255,200,120,0)'); g.fillStyle = r; g.fillRect(0, 0, 64, 64); return new THREE.CanvasTexture(c); })();
    marker = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, transparent: true, depthTest: false, color: 0xffffff })); marker.scale.set(0, 0, 1); scene.add(marker);
    const resize = () => { const r = stage.getBoundingClientRect(); if (r.width < 2 || r.height < 2) return; renderer.setSize(r.width, r.height, false); camera.aspect = r.width / r.height; camera.updateProjectionMatrix(); pmat.uniforms.uScale.value = r.height * renderer.getPixelRatio() / 160; };
    new ResizeObserver(resize).observe(stage); resize();
    (function loop() { if (state.visible) { if (controls) controls.update(); renderer.render(scene, camera); } requestAnimationFrame(loop); })();
    THREE_OK = true;
    return true;
  }
  const S3 = c => [c.px / 50 - 1, -(c.py / 50 - 1), c.pz / 50 - 1];
  function light(c) {
    if (!THREE_OK) return;
    const dimK = 0.45;
    const dim = i => { const k = dimK * (CARDS[i].conf === 0 ? 0.7 : 1); col[i * 3] = base[i * 3] * k; col[i * 3 + 1] = base[i * 3 + 1] * k; col[i * 3 + 2] = base[i * 3 + 2] * k; sizeAttr[i] = 3.2; };
    if (litIdx < 0) { for (let i = 0; i < N; i++) dim(i); } else dim(litIdx);
    litIdx = c.i; col[c.i * 3] = base[c.i * 3]; col[c.i * 3 + 1] = base[c.i * 3 + 1]; col[c.i * 3 + 2] = base[c.i * 3 + 2]; sizeAttr[c.i] = 16;
    geo.attributes.color.needsUpdate = true; geo.attributes.psize.needsUpdate = true;
    const [mx, my, mz] = S3(c); marker.position.set(mx, my, mz); marker.scale.set(.34, .34, 1); marker.material.color.set(CELL_COLOR[c.cell]);
  }

  // 命中那顆星在頁面上的座標（給「就這張」特效當起點）；星圖沒畫或沒命中就回 null
  function litScreenPos() {
    if (!THREE_OK || litIdx < 0 || !state.visible || !el?.gl) return null;
    const r = el.gl.getBoundingClientRect(); if (r.width < 2) return null;
    const v = new THREE.Vector3(...S3(CARDS[litIdx])).project(camera);
    if (v.z > 1) return null;
    return { x: r.left + (v.x + 1) / 2 * r.width, y: r.top + (1 - v.y) / 2 * r.height };
  }

  // ── 「就這張」特效（2026-10-22 店主：復古向量電玩）──────────────────────
  // 該格顏色的線框從命中的星飛到眼前（拖磷光殘影），等專輯卡資料到了：貼到真卡的位置、
  // 把卡裡每個元素的骨架線畫出來、閃白、CRT 掃描線由上往下把卡掃出來，之後就是一般的專輯卡。
  // 用法：const w = warpStart({ color, from }) → 卡渲染好（還沒顯示）先 w.prepare(cardEl) →
  //       切到結果頁後 await w.land(cardEl)；中途又抽了一張就 w.cancel()。
  let warpCanvas = null, warpCtx = null;
  function warpCanvasEl() {
    if (!warpCanvas) { warpCanvas = document.createElement('canvas'); warpCanvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;z-index:2147483000;pointer-events:none;display:none'; document.body.appendChild(warpCanvas); warpCtx = warpCanvas.getContext('2d'); }
    const D = Math.min(2, global.devicePixelRatio || 1), W = global.innerWidth, H = global.innerHeight;
    if (warpCanvas.width !== W * D || warpCanvas.height !== H * D) { warpCanvas.width = W * D; warpCanvas.height = H * D; }
    warpCtx.setTransform(D, 0, 0, D, 0, 0); warpCanvas.style.display = 'block';
    return { W, H };
  }
  function warpSound(kind, dur) {
    if (!state.audioOn) return;
    let a = null; try { a = cfg.player?.audioContext?.() || AC; } catch (_) {}
    if (!a || a.state !== 'running') return;
    const t = a.currentTime;
    if (kind === 'sweep') {
      const o = a.createOscillator(), g = a.createGain(), f = a.createBiquadFilter();
      o.type = 'sawtooth'; o.frequency.setValueAtTime(90, t); o.frequency.exponentialRampToValueAtTime(1400, t + dur);
      f.type = 'lowpass'; f.frequency.setValueAtTime(600, t); f.frequency.exponentialRampToValueAtTime(5000, t + dur);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.08, t + 0.05); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(f).connect(g).connect(a.destination); o.start(t); o.stop(t + dur + 0.05);
    } else {
      const o = a.createOscillator(), g = a.createGain(); o.type = 'square'; o.frequency.setValueAtTime(330, t); o.frequency.exponentialRampToValueAtTime(110, t + 0.14);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.06, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
      o.connect(g).connect(a.destination); o.start(t); o.stop(t + 0.2);
    }
  }
  function warpStart({ color = '#5ee6f0', from = null, artist = '', album = '', year = '' } = {}) {
    const RM = global.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const easeOut = t => 1 - Math.pow(1 - t, 3);
    const { W, H } = warpCanvasEl(); const ctx = warpCtx;
    const FLY = 900, SKEL = 320, FLASH = 120, REVEAL = 520, HOLD = 160, MORPH = 520, FADE = 220;
    // 一、線框飛到「剛好一個螢幕」的大小
    const R = { x: 8, y: 8, w: W - 16, h: H - 16 };
    // 二、揭露的是一張剛好一螢幕的專輯畫面：大封面＋藝人／專輯／年份（黑底，與星圖同世界）
    const intro = document.createElement('div');
    intro.style.cssText = 'position:fixed;inset:0;z-index:2147482999;background:#060609;color:#e9e2c8;display:grid;place-content:center;justify-items:center;gap:10px;padding:24px;box-sizing:border-box;font-family:ui-monospace,"SF Mono",Menlo,Consolas,"Courier New",monospace;text-align:center;pointer-events:none;clip-path:inset(0 0 100% 0);-webkit-clip-path:inset(0 0 100% 0)';
    const side = Math.round(Math.min(W - 48, H * 0.56));
    const cover = document.createElement('img'); cover.alt = ''; cover.style.cssText = `width:${side}px;height:${side}px;object-fit:cover;display:block;border:1px solid rgba(233,226,200,.25);background:#111;transform-origin:0 0`;
    const ph = document.createElement('div'); ph.style.cssText = `width:${side}px;height:${side}px;display:none;place-items:center;border:1px solid rgba(233,226,200,.25);color:#6a7058;font-size:12px;transform-origin:0 0`; ph.textContent = '沒有封面';
    const mk = (txt, css) => { const d = document.createElement('div'); d.textContent = txt; d.style.cssText = css + ';transform-origin:0 0;white-space:nowrap;max-width:100%;overflow:hidden;text-overflow:ellipsis'; return d; };
    const tArtist = mk(artist, `font-size:15px;letter-spacing:.06em;color:${color};margin-top:6px`), tAlbum = mk(album, 'font-size:22px;font-weight:700;line-height:1.4'), tYear = mk(year ? String(year) : '', 'font-size:13px;letter-spacing:.14em;color:#8d9478');
    intro.append(cover, ph, tArtist, tAlbum, tYear); document.body.appendChild(intro);
    let hasCover = false; cover.style.display = 'none'; ph.style.display = 'grid';
    let shapes = [], phase = 'fly', t0 = performance.now(), pt0 = 0, trails = [], raf = 0, cancelled = false, backdrop = from ? 0 : 1, revealDone = null;
    const origin = from || { x: W / 2, y: H / 2 };
    const quad = (p, tr, breathe) => {
      const cx = origin.x + (tr.x + tr.w / 2 - origin.x) * p, cy = origin.y + (tr.y + tr.h / 2 - origin.y) * p;
      const s = (0.06 + 0.94 * p) * (breathe || 1), w = tr.w * s, h = tr.h * s, ay = (1 - p) * 1.1, ax = (1 - p) * -0.45, f = 900;
      const pts = [[-w / 2, -h / 2], [w / 2, -h / 2], [w / 2, h / 2], [-w / 2, h / 2]].map(([x, y]) => { let z = 0, X = x * Math.cos(ay) - z * Math.sin(ay); z = x * Math.sin(ay) + z * Math.cos(ay); let Y = y * Math.cos(ax) - z * Math.sin(ax); z = y * Math.sin(ax) + z * Math.cos(ax); const k = f / (f + z); return [cx + X * k, cy + Y * k]; });
      return { pts };
    };
    const strokeQuad = (q, alpha, width, glow) => { ctx.save(); ctx.globalAlpha = alpha; ctx.lineWidth = width; ctx.strokeStyle = glow ? color : '#fff'; if (glow) { ctx.shadowColor = color; ctx.shadowBlur = 14; } ctx.beginPath(); q.pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.closePath(); ctx.stroke(); ctx.restore(); };
    // 骨架線＝揭露畫面裡那四個元素的實際位置（封面方框、三條文字線）
    const measureIntro = () => {
      const rel = n => { const q = n.getBoundingClientRect(); return { u0: (q.left - R.x) / R.w, v0: (q.top - R.y) / R.h, u1: (q.right - R.x) / R.w, v1: (q.bottom - R.y) / R.h, w: q.width, h: q.height }; };
      shapes = [];
      const c = hasCover ? cover : ph; const cq = rel(c); shapes.push({ t: 'rect', u0: cq.u0, v0: cq.v0, u1: cq.u1, v1: cq.v1 });
      for (const n of [tArtist, tAlbum, tYear]) { const q = rel(n); if (q.w < 4 || q.h < 4) continue; shapes.push({ t: 'line', u0: q.u0, u1: q.u1, v: (q.v0 + q.v1) / 2 }); }
    };
    const skeleton = (q, alpha, draw) => {
      if (!shapes.length) return; const [a, b, c, d] = q.pts;
      const P = (u, v) => { const top = [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u], bot = [d[0] + (c[0] - d[0]) * u, d[1] + (c[1] - d[1]) * u]; return [top[0] + (bot[0] - top[0]) * v, top[1] + (bot[1] - top[1]) * v]; };
      const segs = []; for (const sh of shapes) { if (sh.t === 'rect') segs.push([P(sh.u0, sh.v0), P(sh.u1, sh.v0)], [P(sh.u1, sh.v0), P(sh.u1, sh.v1)], [P(sh.u1, sh.v1), P(sh.u0, sh.v1)], [P(sh.u0, sh.v1), P(sh.u0, sh.v0)]); else segs.push([P(sh.u0, sh.v), P(sh.u1, sh.v)]); }
      const total = segs.length, upto = Math.floor(draw * total), frac = draw * total - upto;
      ctx.save(); ctx.globalAlpha = alpha; ctx.strokeStyle = color; ctx.lineWidth = 1; ctx.shadowColor = color; ctx.shadowBlur = 8; ctx.beginPath();
      segs.forEach(([p, r], i) => { if (i < upto) { ctx.moveTo(p[0], p[1]); ctx.lineTo(r[0], r[1]); } else if (i === upto) { ctx.moveTo(p[0], p[1]); ctx.lineTo(p[0] + (r[0] - p[0]) * frac, p[1] + (r[1] - p[1]) * frac); } });
      ctx.stroke(); ctx.restore();
    };
    const scanlines = (alpha) => { if (alpha <= 0) return; ctx.save(); ctx.globalAlpha = alpha * 0.28; ctx.fillStyle = '#000'; for (let y = 0; y < H; y += 3) ctx.fillRect(0, y, W, 1); ctx.restore(); };
    const clear = () => { ctx.clearRect(0, 0, W, H); if (backdrop > 0) { ctx.save(); ctx.globalAlpha = backdrop; ctx.fillStyle = '#060609'; ctx.fillRect(0, 0, W, H); ctx.restore(); } };
    const clipIntro = pct => { const v = `inset(0 0 ${pct.toFixed(2)}% 0)`; intro.style.clipPath = v; intro.style.webkitClipPath = v; };
    const teardown = () => { cancelAnimationFrame(raf); if (warpCanvas) { ctx.clearRect(0, 0, W, H); warpCanvas.style.display = 'none'; } intro.remove(); };
    if (!RM && state.audioOn) warpSound('sweep', FLY / 1000);
    function frame(now) {
      if (cancelled) return;
      const e = now - t0;
      if (phase === 'fly') { // 飛到整個螢幕，資料還沒到就在那裡呼吸等
        const p = easeOut(Math.min(1, e / FLY)); const breathe = e > FLY ? 1 + 0.006 * Math.sin((e - FLY) / 180) : 1;
        clear(); const q = quad(p, R, breathe); trails.push(q); if (trails.length > 7) trails.shift();
        trails.forEach((tq, i) => strokeQuad(tq, 0.08 + 0.12 * i / trails.length, 1, false)); strokeQuad(q, 1, 2, true);
      } else if (phase === 'skel') { // 黑底、畫骨架
        const p = Math.min(1, (now - pt0) / SKEL); backdrop = 1; clear(); const q = quad(1, R); strokeQuad(q, 1, 2, true); skeleton(q, 1, p);
        if (p >= 1) { phase = 'flash'; pt0 = now; warpSound('land'); }
      } else if (phase === 'flash') {
        const p = Math.min(1, (now - pt0) / FLASH); clear(); const q = quad(1, R); strokeQuad(q, 1, 2 + (1 - p) * 3, true); strokeQuad(q, 1 - p, 1, false); skeleton(q, 1 - p, 1); scanlines(p);
        if (p >= 1) { phase = 'reveal'; pt0 = now; backdrop = 0; }
      } else if (phase === 'reveal') { // 掃描線由上往下掃出一螢幕的專輯畫面（intro 自己是黑底，畫布不再蓋黑）
        const p = Math.min(1, (now - pt0) / REVEAL); clear(); clipIntro(100 - p * 100);
        const q = quad(1, R), y = R.y + R.h * p; strokeQuad(q, 1, 2, true); scanlines(1 - p);
        ctx.save(); ctx.strokeStyle = '#fff'; ctx.shadowColor = color; ctx.shadowBlur = 16; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(R.x - 6, y); ctx.lineTo(R.x + R.w + 6, y); ctx.stroke(); ctx.restore();
        if (p >= 1) { phase = 'hold'; pt0 = now; clipIntro(0); }
      } else if (phase === 'hold') {
        const p = Math.min(1, (now - pt0) / HOLD); clear(); strokeQuad(quad(1, R), 1 - p, 2, true);
        if (p >= 1) { phase = 'wait'; clear(); if (revealDone) revealDone(); }
      } else { return; }
      raf = requestAnimationFrame(frame);
    }
    if (!RM) raf = requestAnimationFrame(frame);
    const api = {
      // 封面網址到了就放進揭露畫面（可能比卡渲染早）
      setCover(url) { if (!url) return; hasCover = true; cover.src = url; cover.style.display = 'block'; ph.style.display = 'none'; },
      // 卡資料到了：等封面載好（最多 1.5 秒）→ 骨架 → 閃白 → 掃描揭露；回傳揭露完成的 Promise
      reveal() {
        return new Promise(res => {
          if (RM || cancelled) { res(); return; }
          const go = () => { if (cancelled) { res(); return; } measureIntro(); revealDone = res; phase = 'skel'; pt0 = performance.now(); };
          if (hasCover && !cover.complete) { let done = false; const once = () => { if (!done) { done = true; go(); } }; cover.addEventListener('load', once, { once: true }); cover.addEventListener('error', once, { once: true }); setTimeout(once, 1500); } else go();
        });
      },
      // 三、結果頁已顯示（還沒看得到）：封面與三行文字各自飛到真卡的位置、黑底淡成白頁、其餘資訊淡入
      land(cardEl) {
        return new Promise(res => {
          if (RM || cancelled || !cardEl) { teardown(); if (cardEl) cardEl.style.opacity = ''; res(); return; }
          const pairs = [[hasCover ? cover : ph, cardEl.querySelector('.quiz-result-cover')], [tArtist, cardEl.querySelector('.quiz-result-artist')], [tAlbum, cardEl.querySelector('.quiz-result-album')], [tYear, cardEl.querySelector('.quiz-result-year')]];
          const moves = [];
          for (const [src, dst] of pairs) {
            const a = src.getBoundingClientRect(); if (a.width < 1) continue;
            if (!dst) { moves.push([src, null]); continue; }
            const b = dst.getBoundingClientRect(); if (b.width < 1 || b.height < 1) { moves.push([src, null]); continue; }
            const isImg = src === cover || src === ph;
            const sx = isImg ? b.width / a.width : b.height / a.height, sy = isImg ? b.height / a.height : b.height / a.height;
            // 文字等比縮放，水平對齊到目標的中心
            const dx = isImg ? b.left - a.left : (b.left + b.width / 2) - (a.left + a.width / 2 * sx), dy = b.top - a.top;
            moves.push([src, `translate(${dx}px,${dy}px) scale(${sx},${sy})`]);
          }
          cardEl.style.opacity = '0'; cardEl.style.transition = `opacity ${FADE}ms ease`;
          intro.style.transition = `background-color ${MORPH}ms ease`;
          requestAnimationFrame(() => {
            intro.style.backgroundColor = 'rgba(6,6,9,0)';
            for (const [src, tf] of moves) { src.style.transition = `transform ${MORPH}ms cubic-bezier(.2,.8,.2,1), opacity ${FADE}ms ease`; if (tf) src.style.transform = tf; else src.style.opacity = '0'; }
            setTimeout(() => { cardEl.style.opacity = '1'; for (const [src] of moves) src.style.opacity = '0'; }, MORPH - 60);
            setTimeout(() => { teardown(); cardEl.style.opacity = ''; cardEl.style.transition = ''; res(); }, MORPH + FADE);
          });
        });
      },
      cancel() { cancelled = true; teardown(); },
    };
    return api;
  }

  // ── 滾筒與讀數 ──────────────────────────────────────────────────────
  function roll(d, idx) { const st = d.querySelector('.strip'); const n = st.dataset.n | 0; const h = st.firstElementChild.offsetHeight || 1; const mid = (d.clientHeight - h) / 2; st.style.transform = `translateY(${mid - (idx + n) * h}px)`; }
  const fmt = v => (v < 0 ? '−' : '') + Math.abs(v).toFixed(2);
  function readout(t) { const j = performance.now() - lastTurn < 160; const bs = el.readout.querySelectorAll('b'); const vals = [t.x, t.y, t.z]; bs.forEach((b, i) => { b.textContent = fmt(j ? vals[i] + (Math.random() - .5) * 0.04 : vals[i]); }); if (j) requestAnimationFrame(() => readout(target())); }
  function updateScene() {
    const p = state.p, t = target(); readout(t);
    if (THREE_OK) { PX.position.x = p.x / 50 - 1; PY.position.y = -(p.y / 50 - 1); PZ.position.z = p.z / 50 - 1; }
    if (!previewCard) scan(nearest());
    const cell = cellOf(t.x, t.y, t.z);
    roll(el.dx, t.x >= T.x ? 1 : 0); roll(el.dy, t.y >= T.y ? 1 : 0); roll(el.dz, t.z >= T.z ? 1 : 0); roll(el.dcell, ORDER.indexOf(cell));
    el.draw.disabled = false;
  }
  function scheduleUpdate() { if (raf) return; raf = requestAnimationFrame(() => { raf = 0; updateScene(); }); }

  // ── 輪子：拿像素稿裡的銅帶當貼圖，每一列照圓柱投影取樣，轉動就是稿子本身的滾花在捲 ──
  let SPANS = null; const TILES = {};
  function wheel(node) {
    const axis = node.dataset.axis, cv = node.querySelector('canvas'), g = cv.getContext('2d'); const tile = TILES[axis]; let W = 0, H = 0, D = 1, shade = null;
    function size() { const r = node.getBoundingClientRect(); D = Math.min(2, global.devicePixelRatio || 1); W = Math.max(8, Math.round(r.width * D)); H = Math.max(8, Math.round(r.height * D)); cv.width = W; cv.height = H; shade = null; draw(); }
    function draw() {
      const sp = SPANS && SPANS[axis]; g.clearRect(0, 0, W, H); if (!sp || !tile || !tile.complete || !tile.naturalWidth) return; const v = state.p[axis];
      const sx = W / sp.w, sy = H / sp.h; const y0 = sp.y0 * sy, y1 = sp.y1 * sy, cy = (y0 + y1) / 2, R = (y1 - y0) / 2;
      const th = tile.naturalHeight; const scale = sy * (sp.h / 536); const off = (v * 4.2 + state.spin[axis]) * scale;
      g.imageSmoothingEnabled = false;
      for (let y = Math.ceil(y0); y < Math.floor(y1); y++) { const k = (cy - y) / R; if (k <= -1 || k >= 1) continue;
        const row = sp.rows[Math.min(sp.rows.length - 1, Math.max(0, Math.floor(y / sy) - sp.y0))]; if (!row) continue;
        const u = R * Math.asin(k); let t = ((u + off) / scale) % th; if (t < 0) t += th;
        g.drawImage(tile, 0, Math.floor(t), tile.naturalWidth, 1, row[0] * sx, y, (row[1] - row[0]) * sx, 1); }
      if (!shade) { shade = document.createElement('canvas'); shade.width = W; shade.height = H; const sg = shade.getContext('2d');
        for (let y = Math.ceil(y0); y < Math.floor(y1); y++) { const k = (cy - y) / R; if (k <= -1 || k >= 1) continue; const row = sp.rows[Math.min(sp.rows.length - 1, Math.max(0, Math.floor(y / sy) - sp.y0))]; if (!row) continue;
          const c = Math.sqrt(1 - k * k); const dark = Math.min(.85, Math.pow(1 - c, 1.2) * 0.95); sg.fillStyle = `rgba(0,0,0,${dark})`; sg.fillRect(row[0] * sx, y, (row[1] - row[0]) * sx, 1);
          if (c > 0.92) { sg.fillStyle = `rgba(255,240,200,${(c - 0.92) * 1.2})`; sg.fillRect(row[0] * sx, y, (row[1] - row[0]) * sx, 1); } } }
      g.drawImage(shade, 0, 0);
    }
    if (tile) tile.addEventListener('load', draw);
    let drag = null, wacc = 0;
    const sync = () => { node.setAttribute('aria-valuenow', Math.round(state.p[axis])); draw(); };
    const setV = nv => { const v0 = state.p[axis]; state.p[axis] = Math.max(0, Math.min(100, nv)); sync(); sweep(axis, v0, state.p[axis]); scheduleUpdate(); };
    // FINE：不是「轉得比較慢」，是一格一張——每撥一格（拖 FINE_PX 或滾一下）就跳到這條軸上的下一張，輪子跟著咔一格
    const step = dir => { if (stepCard(axis, dir)) { state.spin[axis] += dir * 7; sync(); } };
    node.addEventListener('pointerdown', e => { cancelTravel(); drag = { y: e.clientY, v: state.p[axis], ly: e.clientY, acc: 0 }; node.setPointerCapture(e.pointerId); e.preventDefault(); ensureAudio(); cfg.onGesture?.(state.audioOn); });
    node.addEventListener('pointermove', e => { if (!drag) return;
      if (!state.fine) { setV(drag.v + (e.clientY - drag.y) * 0.2); return; }
      drag.acc += e.clientY - drag.ly; drag.ly = e.clientY;
      while (Math.abs(drag.acc) >= FINE_PX) { const d = Math.sign(drag.acc); drag.acc -= d * FINE_PX; step(d); } });
    const end = () => { if (drag && !state.fine) drag.v = state.p[axis]; drag = null; cfg.onGesture?.(state.audioOn); }; node.addEventListener('pointerup', end); node.addEventListener('pointercancel', () => { drag = null; });
    node.addEventListener('wheel', e => { e.preventDefault(); ensureAudio(); cancelTravel();
      if (!state.fine) { setV(state.p[axis] - Math.sign(e.deltaY)); return; }
      wacc += e.deltaMode ? e.deltaY * 40 : e.deltaY; if (Math.abs(wacc) >= 40) { step(-Math.sign(wacc)); wacc = 0; } }, { passive: false });
    node.addEventListener('keydown', e => { const up = e.key === 'ArrowUp' || e.key === 'ArrowRight', dn = e.key === 'ArrowDown' || e.key === 'ArrowLeft'; if (!up && !dn) return; e.preventDefault(); cancelTravel();
      if (state.fine) step(up ? 1 : -1); else setV(state.p[axis] + (up ? 1 : -1) * (e.shiftKey ? 10 : 1)); });
    new ResizeObserver(size).observe(node); size();
    return { draw: sync, set: setV };
  }

  // ── 掃描：輪子從 v0 轉到 v1，這段路上（其他兩軸在半徑內）的卡依序閃過去 ──
  const queue = []; let qTimer = 0;
  function nearest() { const p = state.p; let best = 0, bd = Infinity; for (let i = 0; i < N; i++) { const c = CARDS[i]; const d = (c.px - p.x) ** 2 + (c.py - p.y) ** 2 + (c.pz - p.z) ** 2; if (d < bd) { bd = d; best = i; } } return CARDS[best]; }
  function sweep(axis, v0, v1) {
    if (v0 === v1) return; lastTurn = performance.now(); stopPreview(); armPreview(); sfxTurn(axis, v0, v1);
    const o = axis === 'x' ? ['py', 'pz'] : axis === 'y' ? ['px', 'pz'] : ['px', 'py']; const key = 'p' + axis;
    const R = SWEEP_R; const a = Math.min(v0, v1), b = Math.max(v0, v1), r2 = R * R; const p = { px: state.p.x, py: state.p.y, pz: state.p.z }; const hit = [];
    for (let i = 0; i < N; i++) { const c = CARDS[i]; const v = c[key]; if (v1 > v0) { if (v <= a || v > b) continue; } else { if (v < a || v >= b) continue; }
      const d = (c[o[0]] - p[o[0]]) ** 2 + (c[o[1]] - p[o[1]]) ** 2; if (d <= r2) hit.push(c); }
    hit.sort((u, w) => v1 > v0 ? u[key] - w[key] : w[key] - u[key]);
    for (const c of hit) queue.push(c); while (queue.length > 14) queue.shift();
    if (!qTimer) pump();
  }
  function pump() { qTimer = 0; const c = queue.shift(); if (!c) return; scan(c); qTimer = setTimeout(pump, queue.length > 8 ? 30 : 55); }
  const OTHER = { x: ['py', 'pz'], y: ['px', 'pz'], z: ['px', 'py'] };
  function clearQueue() { queue.length = 0; clearTimeout(qTimer); qTimer = 0; }
  // FINE 一格：沿這條軸往 dir 方向，在附近（另兩軸半徑內，找不到就放寬）找下一張，位置停在那張上
  function stepCard(axis, dir) {
    cancelTravel();
    const key = 'p' + axis, o = OTHER[axis], cur = state.p[axis], p = { px: state.p.x, py: state.p.y, pz: state.p.z };
    let best = null;
    for (const R of [5, 9, 15]) {
      const r2 = R * R; let bv = dir > 0 ? Infinity : -Infinity;
      for (let i = 0; i < N; i++) { const c = CARDS[i], v = c[key]; if (dir > 0 ? v <= cur + 1e-6 : v >= cur - 1e-6) continue;
        if ((c[o[0]] - p[o[0]]) ** 2 + (c[o[1]] - p[o[1]]) ** 2 > r2) continue; if (dir > 0 ? v < bv : v > bv) { bv = v; best = c; } }
      if (best) break;
    }
    if (!best) { sfxClick(); return null; }   // 到底了
    const v0 = state.p[axis]; state.p[axis] = Math.max(0, Math.min(100, best[key]));
    lastTurn = performance.now(); stopPreview(); sfxTurn(axis, v0, state.p[axis]); sfxTick();
    clearQueue(); scan(best); scheduleUpdate();
    return best;
  }

  // ── 搜尋：找到的那張，三顆輪子依序轉過去（能量→質地→色溫），轉的路上照樣掃過沿途的唱片 ──
  let travelTok = 0;
  function cancelTravel() { travelTok++; }
  function travelTo(c) {
    const tok = ++travelTok; let k = 0;
    ensureAudio(); stopPreview(); clearQueue();
    const leg = () => {
      if (tok !== travelTok) return;
      if (k >= 3) { clearQueue(); previewCard = null; scan(c); scheduleUpdate(); armPreview(); return; }
      const axis = ['x', 'y', 'z'][k++], from = state.p[axis], to = c['p' + axis], dist = Math.abs(to - from);
      if (dist < 0.05) { leg(); return; }
      const dur = Math.min(1000, 280 + dist * 10), t0 = performance.now();
      const tick = now => {
        if (tok !== travelTok) return;
        const u = Math.min(1, (now - t0) / dur), e = u < .5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2;
        const v0 = state.p[axis]; state.p[axis] = from + (to - from) * e; WHEELS[axis]?.draw(); sweep(axis, v0, state.p[axis]); scheduleUpdate();
        if (u < 1) requestAnimationFrame(tick); else setTimeout(leg, 110);
      };
      requestAnimationFrame(tick);
    };
    leg();
  }
  // 英式拼法照美式比（favourite＝favorite、colour＝color）：兩邊都換，不會漏
  const norm = s => String(s || '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/our/g, 'or').replace(/[\s\-_.,'’"!?:;()\[\]\/&+*~]+/g, '');
  let SEARCH = null;
  function findCards(q) {
    const toks = String(q).trim().split(/\s+/).map(norm).filter(Boolean); if (!toks.length) return [];
    if (!SEARCH) SEARCH = CARDS.map(c => ({ c, a: norm(c.card.artist), b: norm(c.card.album) }));
    const all = toks.join(''), out = [];
    for (const r of SEARCH) { const hay = r.a + '|' + r.b; if (!toks.every(t => hay.includes(t))) continue;
      let sc = 0; if (r.b === all || r.a === all) sc += 100; if (r.b.startsWith(all)) sc += 40; if (r.a.startsWith(all)) sc += 30; if (hay.includes(all)) sc += 10; sc -= (r.a.length + r.b.length) * 0.01;
      out.push([sc, r.c]); }
    out.sort((u, w) => w[0] - u[0]); return out.slice(0, 8).map(x => x[1]);
  }
  let sugg = [], suggAt = -1, suggTimer = 0;
  function renderSugg(open) {
    const q = el.search.value.trim(); const show = open && !!q;
    el.sugg.hidden = !show; el.search.setAttribute('aria-expanded', String(show)); if (!show) return;
    if (!sugg.length) { el.sugg.innerHTML = '<div class="none">卡池裡找不到這張</div>'; return; }
    el.sugg.innerHTML = sugg.map((c, i) => { const cv = c.card.coverUrl;
      return `<button class="tune-sg" type="button" role="option" id="tuneSg${i}" data-i="${i}" aria-selected="${i === suggAt}" style="--cc:${CELL_COLOR[c.cell]}">${cv ? `<img src="${esc(cv)}" alt="" referrerpolicy="no-referrer" loading="lazy">` : '<span class="ph"></span>'}<span class="a">${esc(c.card.artist)}</span><span class="b">${esc(c.card.album)}</span></button>`; }).join('');
    if (suggAt >= 0) { el.search.setAttribute('aria-activedescendant', 'tuneSg' + suggAt); el.sugg.querySelector(`[data-i="${suggAt}"]`)?.scrollIntoView({ block: 'nearest' }); } else el.search.removeAttribute('aria-activedescendant');
  }
  function chooseSugg(i) {
    const c = sugg[i]; if (!c) return;
    el.search.value = `${c.card.artist} — ${c.card.album}`; sugg = []; suggAt = -1; renderSugg(false); el.search.blur();
    sfxClick(); travelTo(c);
  }
  function wireSearch() {
    el.search.addEventListener('input', () => { clearTimeout(suggTimer); suggTimer = setTimeout(() => { sugg = findCards(el.search.value); suggAt = sugg.length ? 0 : -1; renderSugg(true); }, 70); });
    el.search.addEventListener('focus', () => { if (el.search.value.includes(' — ')) el.search.select(); else if (sugg.length) renderSugg(true); });
    el.search.addEventListener('blur', () => setTimeout(() => renderSugg(false), 160));
    el.search.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { if (!sugg.length) return; e.preventDefault(); suggAt = (suggAt + (e.key === 'ArrowDown' ? 1 : -1) + sugg.length) % sugg.length; renderSugg(true); }
      else if (e.key === 'Enter') { e.preventDefault(); clearTimeout(suggTimer); if (!sugg.length) { sugg = findCards(el.search.value); suggAt = sugg.length ? 0 : -1; } if (sugg.length) chooseSugg(Math.max(0, suggAt)); else renderSugg(true); }
      else if (e.key === 'Escape') { renderSugg(false); }
    });
    el.sugg.addEventListener('pointerdown', e => e.preventDefault());   // 點選項時不要先讓輸入框失焦把清單收掉
    el.sugg.addEventListener('click', e => { const b = e.target.closest('.tune-sg'); if (b) chooseSugg(+b.dataset.i); });
    el.searchGo.addEventListener('click', () => { const q = el.search.value.trim(); if (!q || q.includes(' — ')) { el.search.value = ''; el.search.focus(); return; } sugg = findCards(q); suggAt = sugg.length ? 0 : -1; if (sugg.length) chooseSugg(0); else { el.search.focus(); renderSugg(true); } });
  }
  function scan(c) {
    if (c === previewCard) return; previewCard = c; light(c); armPreview();
    const card = c.card; const cover = card.coverUrl || '';
    el.now.hidden = false;
    el.now.innerHTML = `${cover ? `<img src="${esc(cover)}" alt="" referrerpolicy="no-referrer">` : `<div class="ph">♪</div>`}<div class="t"><div class="a">${esc(card.artist)}</div><div class="b">${esc(card.album)}</div><span class="c" style="--cc:${CELL_COLOR[c.cell]}"><i></i>${NAMES[c.cell]}<span class="np" id="tuneNp"></span></span></div><i class="dot"></i>`;
  }
  // 封面：卡池裡沒帶，停下來那一張才交給呼叫端查（card_catalog／worker），查過就記住；掃過去的不查
  function settleCover(c) {
    const card = c.card; if (card.coverUrl || c.coverTried || !cfg.resolveCover) return; c.coverTried = true;
    cfg.resolveCover(card).then(url => { if (url && previewCard === c) { card.coverUrl = url; const ph = el.now.querySelector('.ph'); if (ph) ph.outerHTML = `<img src="${esc(url)}" alt="" referrerpolicy="no-referrer">`; } }).catch(() => {});
  }

  // ── 試聽：停下來 0.7 秒就播站上的固定試聽（電台式硬切，不淡入淡出；轉動就停） ──
  let playing = null;
  function stopPreview() { clearTimeout(idleTimer); if (!playing) return; playing = null; try { cfg.player?.stop?.(); } catch (_) {} setNowPlaying(false); }
  function armPreview() { clearTimeout(idleTimer); idleTimer = setTimeout(() => { if (previewCard) settleCover(previewCard); if (state.audioOn) playPreview(); }, 700); }
  function playPreview() {
    const c = previewCard; if (!c || !state.audioOn || !cfg.player) return;
    const card = c.card;
    if (card.previewUnavailable) { setNowPlaying(false, '這張沒有試聽'); return; }
    playing = c; watchPlayer(); setNowPlaying(false, '找試聽中');
    Promise.resolve(cfg.player.playAlbum({ artist: card.artist, album: card.album, prefer: 'itunes', previewUrl: card.previewUrl || '', fixedOnly: !!card.previewUrl || !!card.previewUnavailable, cover: card.coverUrl || '', auto: true }))
      .then(ok => { if (playing !== c) return; if (ok) setNowPlaying(true); else { playing = null; const code = cfg.player.debugState?.().code || ''; setNowPlaying(false, code === 'NO-AUTOPLAY' ? '再碰一下輪子開聲音' : '這張沒有試聽'); } })
      .catch(() => { if (playing === c) { playing = null; setNowPlaying(false, '這張沒有試聽'); } });
  }
  function setNowPlaying(on, msg) { const n = document.getElementById('tuneNp'); if (!n) return; n.classList.toggle('on', !!on); n.innerHTML = on ? '<i></i><i></i><i></i>' : (msg ? '· ' + msg : ''); }
  // 播放器的狀態回報：只看目前這張，把 loading／error 的原因寫在小卡上
  let unsubState = null;
  function watchPlayer() {
    if (unsubState || !cfg.player?.onStateChange) return;
    unsubState = cfg.player.onStateChange(st => {
      const c = playing; if (!c) return;
      const card = c.card; if (!st || st.artist !== card.artist || st.album !== card.album) return;
      if (st.status === 'loading') setNowPlaying(false, '找試聽中');
      else if (st.status === 'playing') setNowPlaying(true);
      else if (st.status === 'error') { playing = null; setNowPlaying(false, '這張沒有試聽'); }
      else if (st.status === 'stopped' && st.code === 'NO-AUTOPLAY') { playing = null; setNowPlaying(false, '再碰一下輪子開聲音'); }
    });
  }

  // ── 調頻音效：粉紅雜訊過帶通（轉越快越響、越亮）＋ 跟著位置滑的嘯聲，全部現場合成 ──
  let AC = null, bp = null, noiseGain = null, whistle = null, whistleGain = null, sfxTimer = 0, unlocked = false;
  const unlock = new Audio('data:audio/wav;base64,UklGRmQfAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YUAfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==');
  unlock.loop = false; unlock.volume = 0.01;
  function buildAudio() {
    if (AC) return; const Ctx = global.AudioContext || global.webkitAudioContext; if (!Ctx) return; try { AC = new Ctx(); } catch (e) { return; }
    const buf = AC.createBuffer(1, AC.sampleRate * 2, AC.sampleRate); const d = buf.getChannelData(0); let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < d.length; i++) { const w = Math.random() * 2 - 1; b0 = 0.99765 * b0 + w * 0.0990460; b1 = 0.96300 * b1 + w * 0.2965164; b2 = 0.57000 * b2 + w * 1.0526913; d[i] = (b0 + b1 + b2 + w * 0.1848) * 0.12; }
    const fadeN = Math.floor(AC.sampleRate * 0.05); for (let i = 0; i < fadeN; i++) { const k = i / fadeN; d[i] *= k; d[d.length - 1 - i] *= k; }
    const src = AC.createBufferSource(); src.buffer = buf; src.loop = true; bp = AC.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 1200; bp.Q.value = 0.9;
    noiseGain = AC.createGain(); noiseGain.gain.value = 0; src.connect(bp).connect(noiseGain).connect(AC.destination); src.start();
    whistle = AC.createOscillator(); whistle.type = 'sine'; whistle.frequency.value = 800; whistleGain = AC.createGain(); whistleGain.gain.value = 0; whistle.connect(whistleGain).connect(AC.destination); whistle.start();
  }
  function ensureAudio() {
    if (!state.audioOn) return;
    // 第一次手勢：先讓站上的播放器武裝（同時授權這次造訪的自動試聽），再叫醒音效
    if (!unlocked) { unlocked = true; try { unlock.play().catch(() => {}); } catch (_) {} cfg.onFirstGesture?.(state.audioOn); }
    if (!AC) buildAudio(); if (AC && AC.state !== 'running') AC.resume().catch(() => {});
  }
  function sfxTurn(axis, v0, v1) {
    if (!state.audioOn || !AC) return; if (AC.state !== 'running') { ensureAudio(); return; } const t = AC.currentTime; const sp = Math.min(6, Math.abs(v1 - v0));
    noiseGain.gain.setTargetAtTime(0.09 + sp * 0.03, t, 0.05); bp.frequency.setTargetAtTime(600 + sp * 180 + Math.random() * 200, t, 0.06);
    whistle.frequency.setTargetAtTime(300 + state.p[axis] * 34 + Math.random() * 40, t, 0.05); whistleGain.gain.setTargetAtTime(0.006 + sp * 0.002, t, 0.05);
    clearTimeout(sfxTimer); sfxTimer = setTimeout(sfxStop, 140);
  }
  function sfxStop() { if (!AC) return; const t = AC.currentTime; noiseGain.gain.setTargetAtTime(0, t, 0.08); whistleGain.gain.setTargetAtTime(0, t, 0.06); }
  function sfxTick() { if (!state.audioOn || !AC || AC.state !== 'running') return; const t = AC.currentTime; const o = AC.createOscillator(), g = AC.createGain(); o.type = 'square'; o.frequency.value = 1400; g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.018, t + 0.002); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.025); o.connect(g).connect(AC.destination); o.start(t); o.stop(t + 0.03); }
  function sfxClick() { if (!state.audioOn) return; ensureAudio(); if (!AC) return; const t = AC.currentTime; const o = AC.createOscillator(), g = AC.createGain(); o.type = 'square'; o.frequency.value = 180; g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.03, t + 0.004); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05); o.connect(g).connect(AC.destination); o.start(t); o.stop(t + 0.06); }

  // ── 抽卡：同頻率再來一張（高斯加權隨機，看過 200 張內不重複；稀有度由呼叫端的結果頁處理） ──
  function weightedPick() {
    const t = target(); const [sx, sy, sz] = SIGMA; const seen = new Set(state.seen); const ws = new Float64Array(N); let g = 0, n = 0;
    for (let i = 0; i < N; i++) { const c = CARDS[i]; if (seen.has(i)) continue; const d2 = ((c.x - t.x) / sx) ** 2 + ((c.y - t.y) / sy) ** 2 + ((c.z - t.z) / sz) ** 2; ws[i] = Math.exp(-d2 / 2); g += ws[i]; n++; }
    const fl = n ? FLOOR * g / n / (1 - FLOOR) : 0; let sum = 0;
    for (let i = 0; i < N; i++) { if (seen.has(i)) continue; ws[i] += fl; sum += ws[i]; }
    if (sum <= 0) return null; let u = Math.random() * sum; for (let i = 0; i < N; i++) { u -= ws[i]; if (u <= 0) return CARDS[i]; } return CARDS[N - 1];
  }
  function emit(c) {
    if (!c) return;
    state.seen.push(c.i); if (state.seen.length > 200) state.seen.shift();
    stopPreview(); sfxStop();
    const t = target();
    cfg.onResult?.({ card: c.card, cell: c.cell, cellName: NAMES[c.cell], coords: { x: c.x, y: c.y, z: c.z }, target: t, targetCell: cellOf(t.x, t.y, t.z), targetCellName: NAMES[cellOf(t.x, t.y, t.z)] });
  }
  function pickAgain() { const c = weightedPick(); if (c) { previewCard = c; light(c); emit(c); } }

  // ── 進出 ──────────────────────────────────────────────────────────
  let leverT = 0;
  function setModeUI(animate) {
    const f = state.fine, pos = f ? 'down' : 'up';
    el.ledTop.classList.toggle('on', !f); el.ledBot.classList.toggle('on', f); el.swTop.classList.toggle('on', !f); el.swBot.classList.toggle('on', f); el.mode.setAttribute('aria-pressed', String(f));
    clearTimeout(leverT); if (animate) { el.lever.dataset.pos = 'mid'; leverT = setTimeout(() => { el.lever.dataset.pos = pos; }, 70); } else el.lever.dataset.pos = pos;
    el.hint.textContent = f ? 'FINE：轉一格換一張' : 'SCAN：轉輪連續掃過　拖曳旋轉　滾輪縮放';
  }
  function setAudioUI() { el.spk.setAttribute('aria-pressed', String(state.audioOn)); }
  // on：開或關；fromSpk：是不是喇叭鈕按出來的（要回寫站上的開關、這一下手勢可以武裝音訊）
  function setAudio(on, fromSpk = false) {
    on = !!on;
    if (fromSpk) { try { cfg.setAudioPref?.(on); } catch (_) {} }
    if (on === state.audioOn && !fromSpk) { if (el) setAudioUI(); return; }
    state.audioOn = on;
    if (el) setAudioUI();
    if (!on) { stopPreview(); sfxStop(); }
    else if (fromSpk) { ensureAudio(); armPreview(); }
  }
  // 進場時以站上的開關為準（沒表態過的裝置照舊預設開；第一次碰輪子才寫成開）
  function syncAudioFromPref() { try { const v = cfg.audioPref?.(); if (typeof v === 'boolean') state.audioOn = v; } catch (_) {} }

  // 鍵盤彈出時視窗會變矮，版面不跟著動：搜尋框有焦點就不更新，收起鍵盤（失焦）後再量
  function trackViewport(host) {
    const set = () => { if (document.activeElement === el.search) return; host.style.setProperty('--tvh', global.innerHeight + 'px'); };
    set(); global.addEventListener('resize', set); global.addEventListener('orientationchange', () => setTimeout(set, 250));
    el.search.addEventListener('blur', () => setTimeout(set, 350));
  }
  async function build() {
    const host = cfg.host();
    if (!document.getElementById('tuneStyle')) { const st = document.createElement('style'); st.id = 'tuneStyle'; st.textContent = CSS; document.head.appendChild(st); }
    host.innerHTML = html();
    el = { stage: host.querySelector('#tuneStage'), gl: host.querySelector('#tuneGl'), readout: host.querySelector('#tuneReadout'), spk: host.querySelector('#tuneSpk'), back: host.querySelector('#tuneBack'), now: host.querySelector('#tuneNow'), msg: host.querySelector('#tuneMsg'),
      dx: host.querySelector('#tuneDx'), dy: host.querySelector('#tuneDy'), dz: host.querySelector('#tuneDz'), dcell: host.querySelector('#tuneDcell'), cellStrip: host.querySelector('#tuneCellStrip'),
      mode: host.querySelector('#tuneMode'), lever: host.querySelector('#tuneLever'), hint: host.querySelector('#tuneHint'), search: host.querySelector('#tuneSearch'), searchGo: host.querySelector('#tuneSearchGo'), sugg: host.querySelector('#tuneSugg'), swTop: host.querySelector('#tuneSwTop'), swBot: host.querySelector('#tuneSwBot'), ledTop: host.querySelector('#tuneLedTop'), ledBot: host.querySelector('#tuneLedBot'), draw: host.querySelector('#tuneDraw'), console: host.querySelector('#tuneConsole') };
    trackViewport(host);
    el.back.onclick = () => cfg.onBack?.();
    // 喇叭鈕與站上頂欄的「自動試聽」開關是同一顆（2026-10-22 店主：切到串流後站上自動關掉網頁音源，
    // 頻率選歌就沒聲音，按喇叭也沒反應）。按下去先回寫站上的開關，再照新狀態開停。
    el.spk.onclick = () => { setAudio(!state.audioOn, true); };
    el.mode.onclick = () => { state.fine = !state.fine; setModeUI(true); sfxClick(); };
    el.now.onclick = () => { if (previewCard) emit(previewCard); };
    el.draw.onclick = () => { if (previewCard) emit(previewCard); };
    setAudioUI(); setModeUI();
    let data;
    try { data = await loadData(); } catch (e) { el.msg.textContent = e.message || '載入失敗'; return; }
    buildCards(data);
    if (!N) { el.msg.textContent = '卡池裡沒有座標'; return; }
    el.msg.hidden = true;
    // 滾筒：每個前後各接一圈
    { const items = ORDER.map(k => `<span style="color:${CELL_COLOR[k]};text-shadow:0 0 1cqw ${CELL_COLOR[k]}">${NAMES[k]}</span>`); el.cellStrip.dataset.n = items.length; el.cellStrip.innerHTML = items.join('') + items.join('') + items.join(''); }
    host.querySelectorAll('.tune-drum .strip').forEach(st => { if (st.id === 'tuneCellStrip') return; const items = [...st.children].map(e => e.outerHTML); st.dataset.n = items.length; st.innerHTML = items.join('') + items.join('') + items.join(''); });
    // 輪子素材
    try { SPANS = await fetch('tune/wheel-spans.json').then(r => r.json()); } catch (_) { SPANS = null; }
    for (const k of ['x', 'y', 'z']) { const im = new Image(); im.src = `tune/tile-${k}.png`; TILES[k] = im; }
    try { buildScene(); } catch (e) { console.warn('[tune] 星圖建不起來，只用面板', e); THREE_OK = false; }
    host.querySelectorAll('.tune-wheel').forEach(n => { WHEELS[n.dataset.axis] = wheel(n); });
    wireSearch();
    new ResizeObserver(() => scheduleUpdate()).observe(el.console);
    buildAudio();
    for (const ev of ['pointerdown', 'touchstart', 'keydown']) host.addEventListener(ev, () => ensureAudio(), { passive: true, capture: true });
    state.built = true;
    updateScene();
  }

  async function start() {
    state.visible = true;
    syncAudioFromPref();
    if (!state.built) await build();
    else { setAudioUI(); el.draw.disabled = false; if (previewCard) armPreview(); }
  }
  function stop() { state.visible = false; cancelTravel(); stopPreview(); sfxStop(); }

  global.DipTune = { configure, start, stop, pickAgain, setAudio, litScreenPos, warpStart, CELL_COLOR, get state() { return state; } };
})(window);
