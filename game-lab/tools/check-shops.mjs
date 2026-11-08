// check-shops.mjs：像素店 layout（shops/*.json）自檢（SPEC-v2 §5.2、§5.6、§9.3）。改了店的配置或道具庫之後跑一次。
//
//   node game-lab/tools/check-shops.mjs          # 有問題 exit 1；--quiet 只印結論
//
// 檢查：schema（id、kind、size、safe、cameras、spots、props、hotspots、actors、meta）；熱點 id 唯一、動作合法；
//       spots／熱點／鏡頭都在畫布內；舊 POS 別名表（stage.js）每個目標在每家店都有；引用的唱片都在 cards.js；
//       箱子對到 content.js 的卡池；地圖圖釘對到 shops/index.json；每個道具都畫得出來（假畫布）、畫在畫布內；
//       比例：唱片箱整體不高過一個小人（14 格），所有站立道具的格子跟小人同一個尺度（不縮放）。
//       斜俯視 3/4（layout.projection＝'oblique34'，本店 dip，店主選的路線 P2）：道具用 DipShop.O34.PROPS 畫（量外框＋假畫布各畫一次）；
//       人＝16×16 小人 ×spriteScale（48 格）；箱子桌、櫃檯、唱盤台、試聽桌都比人矮；耳機掛勾在桌面高度；唱盤區他左白台、你右黑台＋特效層；
//       走位：每個 spot 不站在家具裡、從門口都走得到（沿 nav 路點、不穿過家具）。
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { createRequire } from 'module';
import { fileURLToPath, pathToFileURL } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const LAB = path.resolve(HERE, '..');
const require = createRequire(import.meta.url);

export const CHAR_H = 14;   // 小人看得到的列數（16×16 格，腳底在第 14 列）
export const SHOP_SPOTS = ['out', 'q1', 'q2', 'door', 'atdoor', 'in', 'counter', 'pay', 'aisle', 'browse', 'crateP', 'dig1', 'dig2', 'dig3',
  'listen', 'between', 'duelE', 'duelP', 'near', 'visit', 'leave', 'map', 'frontleft'];
export const SHOP_CAMERAS = ['full', 'reward', 'strip', 'stripS'];
export const O34_CAMERAS = ['full', 'scene', 'map', 'reward', 'strip', 'stripS'];
export const O34_HOTS = ['door', 'now', 'poster-event', 'booth', 'counter', 'cat', 'owner', 'crate-jazz', 'crate-tw', 'crate-noise'];
const ACTION_RE = /^(door|listen|counter|cat|talk:owner|poster:event|now|locked|wall-record:.+|wall-painted:.+|crate:[a-z0-9]+|shop:[a-z0-9-]+)$/;
// 小人看得到的列數 × 每格場景像素（斜俯視：人整格 16×spriteScale＝48 格；腳底在第 14 列）
export function charH(L) { return L && L.projection ? 16 * (L.spriteScale || 3) : CHAR_H * ((L && L.fine && L.spriteScale) || 1); }
// 本店箱子的卡池：v2 content.pools.crate[key]（陣列）；v3 content.bins[key].ids
function cratePool(content, key) {
  if (!content) return null;
  if (content.pools && content.pools.crate && content.pools.crate[key]) return content.pools.crate[key];
  if (content.bins && content.bins[key]) return content.bins[key].ids || content.bins[key];
  return null;
}
const FORBIDDEN = [/派對/, /——/, /—/];

// ---------- 把 shop.js／shop-props.js／stage.js 放進沙盒載入（跟瀏覽器同一份程式）
export function loadLib() {
  const DipShop = require(path.join(LAB, 'shop.js'));
  const win = { DipShop };
  const sb = { window: win, console, Math, JSON, Object, Array, String, Number, Promise, RegExp, parseInt, parseFloat, isFinite };
  vm.createContext(sb);
  vm.runInContext(fs.readFileSync(path.join(LAB, 'shop-props.js'), 'utf8'), sb, { filename: 'shop-props.js' });
  const PropsO = win.DipPropsO || null;
  const sw = { location: { search: '', href: 'http://localhost/game-lab/' } };
  const sb2 = { window: sw, document: {}, location: sw.location, URLSearchParams, console, Promise, JSON, Object, Array, String, RegExp, setTimeout, clearTimeout };
  vm.createContext(sb2);
  vm.runInContext(fs.readFileSync(path.join(LAB, 'stage.js'), 'utf8'), sb2, { filename: 'stage.js' });
  return { DipShop, PROPS: DipShop.PROPS, PropsO, ALIAS: sw.DipLabStage.ALIAS, Stage: sw.DipLabStage };
}

// 假畫布：記錄每一筆 fillRect 的範圍（道具畫得出來、畫在哪裡）
function fakeCtx() {
  const b = { x0: Infinity, y0: Infinity, x1: -Infinity, y1: -Infinity, n: 0 };
  let clip = null;
  const ctx = {
    fillStyle: '#000', globalAlpha: 1, b,
    fillRect(x, y, w, h) {
      if (!(w > 0 && h > 0)) return;
      if (/^rgba\(/.test(String(ctx.fillStyle))) return;   // 半透明的影子、光、反光不算道具本體
      let X0 = x, Y0 = y, X1 = x + w, Y1 = y + h;
      if (clip) { X0 = Math.max(X0, clip[0]); Y0 = Math.max(Y0, clip[1]); X1 = Math.min(X1, clip[0] + clip[2]); Y1 = Math.min(Y1, clip[1] + clip[3]); if (X1 <= X0 || Y1 <= Y0) return; }
      b.n++; b.x0 = Math.min(b.x0, X0); b.y0 = Math.min(b.y0, Y0); b.x1 = Math.max(b.x1, X1); b.y1 = Math.max(b.y1, Y1);
    },
    drawImage() {}, save() {}, restore() { clip = null; }, beginPath() {}, rect(x, y, w, h) { clip = [x, y, w, h]; }, clip() {},
    get ctx() { return ctx; },
    clearRect() {}, getImageData() { throw new Error('no getImageData in check'); }
  };
  return ctx;
}

export function loadCards() { return require(path.join(LAB, 'cards.js')); }
export function loadContent() { try { return require(path.join(LAB, 'content.js')); } catch (e) { return null; } }
export function readJSON(rel) { return JSON.parse(fs.readFileSync(path.join(LAB, rel), 'utf8')); }

const isInt = v => Number.isInteger(v);

// ---------- 斜俯視 3/4（本店 dip）
// 假畫布（裝置像素）：記外框；fillText／measureText 也要有（中文標籤）
function fakeCtx2() {
  const c = fakeCtx();
  Object.assign(c, { font: '', textAlign: 'left', textBaseline: 'alphabetic', globalCompositeOperation: 'source-over', imageSmoothingEnabled: false, imageSmoothingQuality: 'low',
    fillText() {}, measureText(t) { return { width: String(t).length * 7 }; }, setTransform() {}, translate() {}, scale() {} });
  return c;
}
// 點陣招牌（EMBLEM 表裡的一項，或 o.sign 直接給的 {pal, rows}）：rows 非空、每列等長、字元 ∈ pal∪'.'、pal 是色碼
export function checkEmblem(em, src, bad) {
  if (!em || typeof em !== 'object') { bad(src + '：不是點陣物件'); return; }
  const pal = em.pal, rows = em.rows;
  if (!pal || typeof pal !== 'object' || Array.isArray(pal) || !Object.keys(pal).length) bad(src + '：pal 要是 {字元: 色碼}');
  else for (const [ch, c] of Object.entries(pal)) {
    if (ch.length !== 1 || ch === '.' || ch === ' ') bad(src + '：pal 的鍵要是單一字元（不能是 . 或空白）：' + JSON.stringify(ch));
    if (typeof c !== 'string' || !/^#[0-9a-f]{3,8}$/i.test(c)) bad(src + '：pal.' + ch + ' 不是色碼');
  }
  if (!Array.isArray(rows) || !rows.length || !rows.every(r => typeof r === 'string' && r.length)) { bad(src + '：rows 要是非空字串陣列'); return; }
  const m = rows[0].length;
  rows.forEach((r, j) => {
    if (r.length !== m) bad(src + '：rows[' + j + '] 長 ' + r.length + '，跟第一列 ' + m + ' 不等長');
    for (const ch of r) if (ch !== '.' && !(pal && Object.prototype.hasOwnProperty.call(pal, ch))) { bad(src + '：rows[' + j + '] 有 pal 沒有的字元 ' + JSON.stringify(ch)); break; }
  });
}
// counter 的 o.sign：null／false／沒寫＝不畫；{emblem:key}／字串 key＝EMBLEM 表；{pal,rows}＝直接給；其他字串＝舊式字牌
export function checkSign(sg, src, lib, bad) {
  if (sg == null || sg === false) return;
  const EM = (lib.PropsO && lib.PropsO.EMBLEM) || {};
  if (typeof sg === 'string') { if (!sg.trim()) bad(src + '：空字串'); return; }
  if (typeof sg !== 'object' || Array.isArray(sg)) { bad(src + '：要是 {emblem:…}、{pal,rows}、字串或 null'); return; }
  if (sg.rows) { checkEmblem(sg, src, bad); return; }
  if (typeof sg.emblem !== 'string' || !Object.prototype.hasOwnProperty.call(EM, sg.emblem)) bad(src + '：emblem「' + sg.emblem + '」不在 shop-props.js 的 EMBLEM 表');
}
export function checkOblique(L, file, lib, cards, content) {
  const P = [], Wn = [];
  const bad = (m) => P.push(file + ': ' + m), warn = (m) => Wn.push(file + ': ' + m);
  const info = { props: 0, hots: 0, scale: [] };
  const DS = lib.DipShop, OP = DS.O34 && DS.O34.PROPS;
  if (!OP) { bad('shop.js 沒有斜俯視 renderer（DipShop.O34）'); return { problems: P, warnings: Wn, hotIds: [], info }; }
  const base = path.basename(file, '.json');
  if (L.id !== base) bad('id「' + L.id + '」跟檔名不一致');
  if (L.kind !== 'shop') bad('斜俯視的 layout 要是 kind:shop');
  if (typeof L.name !== 'string' || !L.name) bad('缺 name');
  if (!Array.isArray(L.size) || L.size.length !== 2 || !L.size.every(v => isInt(v) && v >= 64 && v <= 640)) { bad('size 要是 [寬, 高] 整數'); return { problems: P, warnings: Wn, hotIds: [], info }; }
  const [W, H] = L.size, KS = L.spriteScale, CH = charH(L);
  if (!(isInt(KS) && KS >= 2 && KS <= 6)) bad('spriteScale 要是 2–6 的整數（16×16 小人放大幾倍）');
  if (!(isInt(L.wallBase) && L.wallBase > 20 && L.wallBase < H / 2)) bad('wallBase（後牆和地板的交界）不合理');
  if (L.maxScale != null && !(L.maxScale >= 0.5 && L.maxScale <= 4)) bad('maxScale 0.5–4');
  if (!Array.isArray(L.safe) || L.safe.length !== 2 || !(L.safe[0] >= 0 && L.safe[1] <= W && L.safe[0] < L.safe[1])) bad('safe 要在 0..寬 之間');
  const inside = (x, y) => isInt(x) && isInt(y) && x >= 0 && y >= 0 && x < W && y < H;
  // 鏡頭
  const cams = L.cameras || {};
  for (const c of O34_CAMERAS) if (!cams[c]) bad('缺 cameras.' + c);
  for (const [n, c] of Object.entries(cams)) {
    if (!isInt(c.y) || !isInt(c.h) || c.y < 0 || c.h < 8 || c.y + c.h > H) bad('cameras.' + n + ' 超出畫布：' + JSON.stringify(c));
    if (c.minH != null && !(isInt(c.minH) && c.minH > 0 && c.minH <= c.h)) bad('cameras.' + n + '.minH 要 ≤ h');
    if (c.anchor != null && !['bottom', 'top', 'center'].includes(c.anchor)) bad('cameras.' + n + '.anchor ' + c.anchor);
  }
  if (cams.strip && cams.stripS && cams.stripS.h > cams.strip.h) bad('stripS 要比 strip 矮');
  for (const n of ['full', 'scene', 'map']) if (cams[n] && cams[n].y + cams[n].h !== H) bad('cameras.' + n + ' 要看到地板最下緣（唱盤區）');
  // spots
  const spots = L.spots || {};
  for (const [k, s] of Object.entries(spots)) {
    if (!Array.isArray(s) || s.length < 2 || s.length > 3) { bad('spots.' + k + ' 格式'); continue; }
    if (!inside(s[0], s[1])) bad('spots.' + k + ' 在畫布外：' + JSON.stringify(s));
    if (s.length === 3 && typeof s[2] !== 'boolean') bad('spots.' + k + ' 第三格要是 true/false');
  }
  for (const k of SHOP_SPOTS) if (!spots[k]) bad('缺 spots.' + k);
  for (const [from, to] of Object.entries(lib.ALIAS)) if (!spots[to]) bad('別名 ' + from + ' → ' + to + '：這家店沒有這個 spot');
  if (spots.duelE && spots.duelP) {
    if (!(spots.duelE[0] < spots.duelP[0])) bad('duelE 要在 duelP 左邊（他＝左、你＝右）');
    for (const cn of ['strip', 'stripS']) { const c = cams[cn]; if (!c) continue; for (const k of ['duelE', 'duelP']) { const y = spots[k][1]; if (y > c.y + c.h - 1 || y - 15 * KS < c.y) bad(cn + ' 鏡頭看不到 ' + k + ' 的全身'); } }
    if (cams.strip && spots.ref && spots.ref[1] - 15 * KS < cams.strip.y) bad('strip 鏡頭看不到老闆裁判（ref）的頭');
  }
  // 道具：量外框（不能丟錯、畫在畫布內）＋假畫布再畫一次（文字、封面、裁切的路徑）
  const props = Array.isArray(L.props) ? L.props : (bad('props 要是陣列'), []);
  const S = {
    L, layout: L, W, H, card: (id) => cards[id] || null, t: 1.3, rt: 1.3, frame: 1,
    state: { door: 'closed', playing: true, poke: {}, decks: { e: { rec: { attr: 'c' }, state: 'spin' }, p: { rec: { attr: 'h', kind: 'ace' }, state: 'land' } }, fx: { discs: [{ x: 100, y: 280, attr: 'o', fr: 1 }, { x: 120, y: 282, attr: 'c', split: 2 }, { x: 140, y: 300, attr: 'h', flat: true }], trails: [[90, 280, 'rgba(255,241,194,0.7)']], sparks: [{ x: 140, y: 280, size: 'ring' }], shards: [[130, 300, 3, 'c']], notes: [{ x: 80, y: 270 }], flag: { x: 160, y: 270, side: 'p' }, dots: [[70, 283]], excl: [{ x: 200, y: 260 }] }, dim: 1 },
    drawOutside() {}, outsideCount() { return 1; }
  };
  const ids = new Map(), recRefs = [], kinds = {};
  const addHot = (id, rect, action, label, src) => {
    if (typeof id !== 'string' || !id) { bad(src + '：熱點沒有 id'); return; }
    if (ids.has(id)) bad('熱點 id 重複：' + id + '（' + ids.get(id) + '、' + src + '）'); else ids.set(id, src);
    if (!Array.isArray(rect) || rect.length !== 4 || !rect.every(isInt)) bad('熱點 ' + id + ' rect 格式');
    else if (!(rect[0] >= 0 && rect[1] >= 0 && rect[0] + rect[2] <= W && rect[1] + rect[3] <= H && rect[2] > 0 && rect[3] > 0)) bad('熱點 ' + id + ' 超出畫布：' + JSON.stringify(rect));
    if (typeof action !== 'string' || !ACTION_RE.test(action)) bad('熱點 ' + id + ' 動作不合法：' + action);
    if (typeof label !== 'string' || !label) bad('熱點 ' + id + ' 沒有名牌文字');
    else for (const re of FORBIDDEN) if (re.test(label)) bad('熱點 ' + id + ' 名牌有禁字：' + label);
    info.hots++;
  };
  props.forEach((o, i) => {
    const src = 'props[' + i + '] ' + o.type + (o.id ? '#' + o.id : '');
    const spec = OP[o.type];
    if (!spec) { bad(src + '：沒有這種斜俯視道具'); return; }
    info.props++; kinds[o.type] = (kinds[o.type] || 0) + 1;
    if (o.layer && !['bg', 'wall', 'fx', 'stand'].includes(o.layer)) bad(src + '：layer ' + o.layer);
    const T = { ctx: null, k: 1, cx: 0, cy: 0, meas: [1e9, 1e9, -1e9, -1e9], cover: () => null, used: {}, pool: Object.keys(cards).slice(0, 20) };
    const Pn = DS.OPainter(T);
    try { spec.draw(Pn, o, S); if (spec.glow) { T.meas = [1e9, 1e9, -1e9, -1e9]; spec.glow(Pn, o, S); T.meas = null; } } catch (e) { bad(src + '：畫的時候出錯 ' + e.message); return; }
    T.meas = [1e9, 1e9, -1e9, -1e9]; spec.draw(Pn, o, S); const m = T.meas; T.meas = null;
    try { T.ctx = fakeCtx2(); spec.draw(Pn, o, S); if (spec.glow) spec.glow(Pn, o, S); } catch (e) { bad(src + '：在畫布上畫的時候出錯 ' + e.message); }
    if (m[2] > m[0] && (m[0] < -2 || m[1] < -2 || m[2] > W + 2 || m[3] > H + 2) && o.type !== 'duelfx' && (o.layer || spec.layer) !== 'bg') warn(src + '：畫到畫布外 ' + m.map(v => Math.round(v)).join(','));
    // 比例：人 CH（48）格；箱子桌（前板＋露出的唱片＋堆疊）、櫃檯、唱盤台、試聽桌都比人矮
    const tall = (o.h || 0) + (o.d || 0);
    if (o.type === 'binTable' || o.type === 'binCabinet') {
      // 斜俯視：畫面上的高＝深度＋高度；真的高度＝前板 h＋露出的唱片 rec＋分隔卡（約 5）
      const hh = (o.h || 0) + (o.rec || 8) + 5;
      info.scale.push({ id: o.id || o.type, h: hh });
      if (hh >= CH * 0.8) bad(src + '：箱子桌連唱片高 ' + hh + '，人（' + CH + '）沒有明顯比較高');
      [].concat(o.front || [], o.cards || [], o.lean ? [o.lean] : []).forEach(r => recRefs.push([r, src]));
    }
    if (o.type === 'counter') { if (tall >= CH) bad(src + '：櫃檯比人高'); if (o.now) recRefs.push([o.now, src]); checkSign(o.sign, src + '.sign', lib, bad); }
    if (o.type === 'deckStand') { if (tall >= CH) bad(src + '：唱盤台比人高'); if (!['e', 'p'].includes(o.side)) bad(src + '：side 要是 e 或 p'); }
    if (o.type === 'listenDesk') {
      if (tall >= CH) bad(src + '：試聽桌比人高');
      const hookM = (o.h - 1) / (L.pxPerM || 28.2); if (hookM < 0.55 || hookM > 0.9) bad(src + '：耳機掛勾離地 ' + hookM.toFixed(2) + ' m，要在桌面高度（0.55–0.9 m）');
      if (o.stack) recRefs.push([o.stack, src]);
    }
    if (o.type === 'ledge' || o.type === 'shelving') (o.cards || []).forEach(r => r && recRefs.push([r, src]));
    // 熱點
    if (spec.hots) (spec.hots(o, S) || []).forEach(h => addHot(h.id, (h.rect || []).map(v => Math.round(v)), h.action, h.label, src + ' 子熱點'));
    if (o.hot) {
      if (!o.id) bad(src + '：可點的道具要有 id');
      const box = o.hot.rect || (spec.box ? spec.box(o) : null);
      if (!box) bad(src + '：hot 要有 rect（這種道具沒有 box）');
      else addHot(o.id, box.map(v => Math.round(v)), o.hot.action, o.hot.label, src);
    }
  });
  (L.hotspots || []).forEach((h, i) => {
    addHot(h.id, h.rect, h.action, h.label, 'hotspots[' + i + ']');
    if (h.follow != null) {
      if (!(L.actors || []).some(a => a.id === h.follow)) bad('hotspots[' + i + '] follow 的小人 ' + h.follow + ' 不在 actors');
      if (!Array.isArray(h.rel) || h.rel.length !== 4 || !h.rel.every(isInt)) bad('hotspots[' + i + '] rel 要是 [dx,dy,w,h] 整數');
      else { const a = (L.actors || []).find(x => x.id === h.follow), s = a && spots[a.at]; if (s && (s[0] + h.rel[0] !== h.rect[0] || s[1] + h.rel[1] !== h.rect[1])) bad('hotspots[' + i + '] rect 跟小人起始位置＋rel 對不上'); }
    }
  });
  for (const id of O34_HOTS) if (!ids.has(id)) bad('缺熱點 ' + id);
  if ([...ids.keys()].filter(h => h.startsWith('rack:')).length < 12) bad('牆上（與櫃子裡）可點的唱片少於 12 張');
  for (const [r, src] of recRefs) if (!cards[r]) bad(src + '：唱片 ' + r + ' 不在 cards.js');
  (L.actors || []).forEach((a, i) => {
    if (!a.id || typeof a.id !== 'string') bad('actors[' + i + '] 缺 id');
    if (!spots[a.at]) bad('actors[' + i + '] 站的位置 ' + a.at + ' 不存在');
    if (typeof a.sprite !== 'string') bad('actors[' + i + '] sprite 要是字串');
  });
  // meta：三個箱子＝熱點＋動作＋卡池
  const meta = L.meta || {};
  if (!meta.crates || typeof meta.crates !== 'object') bad('缺 meta.crates');
  for (const [hid, key] of Object.entries(meta.crates || {})) {
    if (!ids.has(hid)) bad('meta.crates：熱點 ' + hid + ' 不存在');
    const pr = props.find(o => o.id === hid);
    if (pr && (!pr.hot || pr.hot.action !== 'crate:' + key)) bad('meta.crates：' + hid + ' 的動作是 ' + (pr.hot && pr.hot.action) + '，不是 crate:' + key);
    const pool = cratePool(content, key);
    if (content && !pool) bad('meta.crates：content.js 沒有卡池 ' + key);
    if (pool && pr) (pr.front || []).forEach(r => { if (!pool.includes(r)) warn(hid + '：露出的唱片 ' + r + ' 不在卡池 ' + key); });
  }
  // 唱盤區：他左白台、你右黑台、特效層、幾何點在畫布內
  const dE = props.find(o => o.type === 'deckStand' && o.side === 'e'), dP = props.find(o => o.type === 'deckStand' && o.side === 'p');
  if (!dE || !dP) bad('唱盤區要有兩座唱盤台（deckStand side e／p）');
  else if (!(dE.x < dP.x)) bad('他的白台（e）要在左、你的黑台（p）在右');
  if (!props.some(o => o.type === 'duelfx')) bad('唱盤區要有 duelfx 特效層');
  const D = L.duel || {};
  for (const k of ['deckE', 'deckP', 'clash', 'rug']) { const v = D[k]; if (!v) bad('缺 duel.' + k); else if (!inside(v[0], v[1])) bad('duel.' + k + ' 在畫布外'); }
  if (D.deckE && D.deckP && !(D.deckE[0] < D.deckP[0])) bad('duel.deckE 要在 deckP 左邊');
  if (spots.ref && !inside(spots.ref[0], spots.ref[1])) bad('spots.ref 在畫布外');
  if (props.some(o => /rug/i.test(o.type))) bad('店主：不要地毯');
  // 走位：spot 不站在家具裡；從門口都走得到（每一段不穿過家具）
  const obs = DS.navObstacles(L);
  (L.nav || []).forEach((q, i) => { if (!inside(q[0], q[1])) bad('nav[' + i + '] 在畫布外'); if (obs.some(r => q[0] > r[0] && q[0] < r[0] + r[2] && q[1] > r[1] && q[1] < r[1] + r[3])) bad('nav[' + i + '] 在家具裡 ' + JSON.stringify(q)); });
  for (const [k, s] of Object.entries(spots)) {
    if (s[2]) continue;
    const r = obs.find(r => s[0] > r[0] && s[0] < r[0] + r[2] && s[1] > r[1] && s[1] < r[1] + r[3]);
    if (r) bad('spots.' + k + ' 站在家具裡 ' + JSON.stringify(r));
  }
  const clear = (a, b) => !obs.some(r => !(a[0] > r[0] && a[0] < r[0] + r[2] && a[1] > r[1] && a[1] < r[1] + r[3]) && !(b[0] > r[0] && b[0] < r[0] + r[2] && b[1] > r[1] && b[1] < r[1] + r[3]) && DS.segHitsRect(a, b, r));
  info.routes = 0;
  if (spots.door) for (const [k, s] of Object.entries(spots)) {
    if (s[2] || k === 'door') continue;
    for (const from of ['door', 'counter']) {
      if (!spots[from]) continue;
      const pts = [spots[from].slice(0, 2)].concat(DS.navRoute(L, spots[from].slice(0, 2), s.slice(0, 2), obs));
      for (let i = 1; i < pts.length; i++) if (!clear(pts[i - 1], pts[i])) { bad('走不到 spots.' + k + '（從 ' + from + '，' + JSON.stringify(pts[i - 1]) + '→' + JSON.stringify(pts[i]) + ' 穿過家具）'); break; }
      info.routes++;
    }
  }
  info.charH = CH; info.kinds = kinds;
  return { problems: P, warnings: Wn, hotIds: [...ids.keys()], info };
}

// 單一 layout 的檢查；回傳 { problems, warnings, hotIds, info }
export function checkLayout(L, file, lib, cards, content, opts = {}) {
  if (L && L.projection === 'oblique34') return checkOblique(L, file, lib, cards, content);
  const P = [], Wn = [];
  const bad = (m) => P.push(file + ': ' + m), warn = (m) => Wn.push(file + ': ' + m);
  const info = { props: 0, hots: 0, scale: [] };
  if (!L || typeof L !== 'object') { bad('不是物件'); return { problems: P, warnings: Wn, hotIds: [], info }; }
  const base = path.basename(file, '.json');
  if (L.id !== base) bad('id「' + L.id + '」跟檔名不一致');
  if (!['shop', 'map'].includes(L.kind)) bad('kind 要是 shop 或 map：' + L.kind);
  if (typeof L.name !== 'string' || !L.name) bad('缺 name');
  if (!Array.isArray(L.size) || L.size.length !== 2 || !L.size.every(v => isInt(v) && v >= 32 && v <= (L.fine ? 640 : 400))) { bad('size 要是 [寬, 高] 整數'); return { problems: P, warnings: Wn, hotIds: [], info }; }
  const [W, H] = L.size, CH = charH(L);
  const inside = (x, y) => isInt(x) && isInt(y) && x >= 0 && y >= 0 && x < W && y < H;
  if (!Array.isArray(L.safe) || L.safe.length !== 2 || !(L.safe[0] >= 0 && L.safe[1] <= W && L.safe[0] < L.safe[1])) bad('safe 要在 0..寬 之間');
  if (L.maxScale != null && !(L.maxScale >= (L.fine ? 0.5 : 1) && L.maxScale <= 4)) bad('maxScale ' + (L.fine ? '0.5' : '1') + '–4');
  if (L.coverMode && !['raw', 'palette', 'poster'].includes(L.coverMode)) bad('coverMode ' + L.coverMode);
  for (const k of ['palette']) if (L[k] != null && (typeof L[k] !== 'object' || Array.isArray(L[k]))) bad(k + ' 要是物件');
  for (const [k, v] of Object.entries(L.palette || {})) if (!/^#[0-9a-f]{3,8}$/i.test(v)) bad('palette.' + k + ' 不是色碼');
  // 鏡頭
  const cams = L.cameras || {};
  if (!cams.full) bad('缺 cameras.full');
  if (L.kind === 'shop') for (const c of SHOP_CAMERAS) if (!cams[c]) bad('缺 cameras.' + c);
  for (const [n, c] of Object.entries(cams)) {
    if (!isInt(c.y) || !isInt(c.h) || c.y < 0 || c.h < 8 || c.y + c.h > H) bad('cameras.' + n + ' 超出畫布：' + JSON.stringify(c));
    if (c.minH != null && !(isInt(c.minH) && c.minH > 0 && c.minH <= c.h)) bad('cameras.' + n + '.minH 要 ≤ h');
    if (c.anchor != null && !['bottom', 'top', 'center'].includes(c.anchor)) bad('cameras.' + n + '.anchor ' + c.anchor);
  }
  if (L.kind === 'shop' && cams.strip && cams.stripS) {
    if (cams.stripS.h > cams.strip.h) bad('stripS 要比 strip 矮');
    if (!L.fine && cams.strip.y * 1 + cams.strip.h !== cams.stripS.y + cams.stripS.h) warn('strip 與 stripS 的下緣不一樣（兩個對決者的腳要都在）');
  }
  // spots
  const spots = L.spots || {};
  for (const [k, s] of Object.entries(spots)) {
    if (!Array.isArray(s) || s.length < 2 || s.length > 3) { bad('spots.' + k + ' 格式'); continue; }
    if (!inside(s[0], s[1])) bad('spots.' + k + ' 在畫布外：' + JSON.stringify(s));
    if (s.length === 3 && typeof s[2] !== 'boolean') bad('spots.' + k + ' 第三格要是 true/false');
  }
  if (L.kind === 'shop') for (const k of SHOP_SPOTS) if (!spots[k]) bad('缺 spots.' + k);
  // 對決兩人：他在左、你在右；腳都在 strip、stripS 裡
  if (L.kind === 'shop' && spots.duelE && spots.duelP) {
    if (!(spots.duelE[0] < spots.duelP[0])) bad('duelE 要在 duelP 左邊（他＝左、你＝右）');
    for (const cn of ['strip', 'stripS']) { const c = cams[cn]; if (!c) continue; for (const k of ['duelE', 'duelP']) { const y = spots[k][1]; if (y > c.y + c.h - 1 || y - CH + 2 < c.y) bad(cn + ' 鏡頭看不到 ' + k + ' 的全身'); } }
  }
  // 別名表
  if (L.kind === 'shop') for (const [from, to] of Object.entries(lib.ALIAS)) if (!spots[to]) bad('別名 ' + from + ' → ' + to + '：這家店沒有這個 spot');
  // 道具
  const props = Array.isArray(L.props) ? L.props : (bad('props 要是陣列'), []);
  const ids = new Map();
  const S = {
    W, H, layout: L, pal: Object.assign({}, lib.DipShop.DEFAULT_PAL, L.palette || {}), state: { door: 'closed', playing: true, poke: {}, decks: {}, fx: null, hi: [] },
    t: 1.3, frame: 1, cover: () => null, card: (id) => cards[id] || null, rand: lib.DipShop.seeded,
    wallBase: (L.wall && L.wall.h != null) ? L.wall.h : 58, drawOutside() {}
  };
  const recRefs = [];
  const addHot = (id, rect, action, label, src) => {
    if (typeof id !== 'string' || !id) { bad(src + '：熱點沒有 id'); return; }
    if (ids.has(id)) bad('熱點 id 重複：' + id + '（' + ids.get(id) + '、' + src + '）'); else ids.set(id, src);
    if (!Array.isArray(rect) || rect.length !== 4 || !rect.every(isInt)) bad('熱點 ' + id + ' rect 格式');
    else if (!(rect[0] >= 0 && rect[1] >= 0 && rect[0] + rect[2] <= W && rect[1] + rect[3] <= H && rect[2] > 0 && rect[3] > 0)) bad('熱點 ' + id + ' 超出畫布：' + JSON.stringify(rect));
    if (typeof action !== 'string' || !ACTION_RE.test(action)) bad('熱點 ' + id + ' 動作不合法：' + action);
    if (typeof label !== 'string' || !label) bad('熱點 ' + id + ' 沒有名牌文字');
    else for (const re of FORBIDDEN) if (re.test(label)) bad('熱點 ' + id + ' 名牌有禁字：' + label);
    info.hots++;
  };
  props.forEach((o, i) => {
    const src = 'props[' + i + '] ' + o.type + (o.id ? '#' + o.id : '');
    const spec = lib.PROPS[o.type];
    if (!spec) { bad(src + '：沒有這種道具'); return; }
    info.props++;
    if (o.layer && !['wall', 'floor', 'stand', 'ceiling', 'front', 'glow'].includes(o.layer)) bad(src + '：layer ' + o.layer);
    // 畫一次（假畫布）：不能丟錯、要畫在畫布內
    const ctx = fakeCtx(), Pn = lib.DipShop.Painter(ctx, S.pal);
    try { spec.draw(Pn, o, S); } catch (e) { bad(src + '：畫的時候出錯 ' + e.message); return; }
    const b = ctx.b;
    if (b.n && (b.x0 < 0 || b.y0 < 0 || b.x1 > W || b.y1 > H) && o.type !== 'mapBase') warn(src + '：畫到畫布外 ' + [b.x0, b.y0, b.x1, b.y1].join(','));
    const box = spec.box ? spec.box(o) : [o.x, o.y, o.w || 8, o.h || 8];
    if (b.n && o.hot && (b.x0 < box[0] - 3 || b.y0 < box[1] - 3 || b.x1 > box[0] + box[2] + 3 || b.y1 > box[1] + box[3] + 3)) warn(src + '：畫的範圍超出 box（點擊外框會不準）');
    // 比例：唱片箱整體（含露出的唱片）不高過一個小人；箱子正面不高過半個小人
    if (o.type === 'crate' || o.type === 'box') {
      const hh = b.y1 - b.y0; info.scale.push({ id: o.id || o.type, h: hh });
      if (hh > CHAR_H) bad(src + '：唱片箱連唱片高 ' + hh + ' 格，比小人（' + CHAR_H + '）還高');
      if ((o.h || 7) > CHAR_H / 2 + 2) bad(src + '：箱子正面 ' + (o.h || 7) + ' 格太高');
    }
    if (o.type === 'counter' && o.h > CHAR_H) bad(src + '：櫃檯比小人高');
    if (o.type === 'wallRack' && (o.cell || 10) > CHAR_H) bad(src + '：牆上封面比小人大');
    if (o.type === 'wallRack') (o.records || []).forEach(r => r && recRefs.push([r, src]));
    if (o.type === 'nowPlaying') recRefs.push([o.record, src]);
    if (o.type === 'crate' || o.type === 'box') (o.records || []).forEach(r => recRefs.push([r, src]));
    if (o.type === 'shelf') (o.faces || []).forEach(r => recRefs.push([r, src]));
    // 熱點
    if (spec.hots) (spec.hots(o, S) || []).forEach(h => addHot(h.id, h.rect, h.action, h.label, src + ' 子熱點'));
    if (o.hot) {
      if (!o.id) bad(src + '：可點的道具要有 id');
      addHot(o.id, (o.hot.rect || box).map(v => Math.round(v)), o.hot.action, o.hot.label, src);
    }
  });
  (L.hotspots || []).forEach((h, i) => {
    addHot(h.id, h.rect, h.action, h.label, 'hotspots[' + i + ']');
    if (h.follow != null) {
      if (!(L.actors || []).some(a => a.id === h.follow)) bad('hotspots[' + i + '] follow 的小人 ' + h.follow + ' 不在 actors');
      if (!Array.isArray(h.rel) || h.rel.length !== 4 || !h.rel.every(isInt)) bad('hotspots[' + i + '] rel 要是 [dx,dy,w,h] 整數');
      else { const a = (L.actors || []).find(x => x.id === h.follow), s = a && spots[a.at]; if (s && (s[0] + h.rel[0] !== h.rect[0] || s[1] + h.rel[1] !== h.rect[1])) bad('hotspots[' + i + '] rect 跟小人起始位置＋rel 對不上'); }
    }
  });
  for (const [r, src] of recRefs) if (!cards[r]) bad(src + '：唱片 ' + r + ' 不在 cards.js');
  // 小人
  (L.actors || []).forEach((a, i) => {
    if (!a.id || typeof a.id !== 'string') bad('actors[' + i + '] 缺 id');
    if (!spots[a.at]) bad('actors[' + i + '] 站的位置 ' + a.at + ' 不存在');
    if (typeof a.sprite !== 'string') bad('actors[' + i + '] sprite 要是字串');
  });
  // meta
  const meta = L.meta || {};
  if (L.kind === 'shop') {
    if (!meta.crates || typeof meta.crates !== 'object') bad('缺 meta.crates');
    const crateById = (hid) => { const top = props.find(o => o.id === hid); return top ? { rec: top.records, action: top.hot && top.hot.action } : null; };
    for (const [hid, key] of Object.entries(meta.crates || {})) {
      if (!ids.has(hid)) bad('meta.crates：熱點 ' + hid + ' 不存在');
      const hp = crateById(hid);
      if (hp && hp.action !== 'crate:' + key) bad('meta.crates：' + hid + ' 的動作是 ' + hp.action + '，不是 crate:' + key);
      const pool = cratePool(content, key);
      if (L.id === 'dip' && content && !pool) bad('meta.crates：content.js 沒有卡池 ' + key + '（pools.crate 或 bins）');
      // 本店的箱子露出的唱片要在那個箱子的卡池裡
      if (L.id === 'dip' && pool) (hp && hp.rec || []).forEach(r => { if (!pool.includes(r)) warn(hid + '：露出的唱片 ' + r + ' 不在卡池 ' + key); });
    }
  }
  info.charH = CH;
  return { problems: P, warnings: Wn, hotIds: [...ids.keys()], info };
}

export function runChecks() {
  const lib = loadLib(), cards = loadCards(), content = loadContent();
  const problems = [], warnings = [], stats = {};
  if (!lib.PropsO || !lib.PropsO.EMBLEM) problems.push('shop-props.js 沒有匯出 DipPropsO.EMBLEM（櫃檯招牌表）');
  for (const [k, em] of Object.entries((lib.PropsO && lib.PropsO.EMBLEM) || {})) checkEmblem(em, 'shop-props.js EMBLEM.' + k, m => problems.push(m));
  const dir = path.join(LAB, 'shops');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json') && f !== 'index.json');
  const layouts = {};
  for (const f of files) {
    let L; try { L = readJSON('shops/' + f); } catch (e) { problems.push('shops/' + f + '：JSON 讀不了 ' + e.message); continue; }
    layouts[L.id || f] = L;
    const r = checkLayout(L, 'shops/' + f, lib, cards, content);
    problems.push(...r.problems); warnings.push(...r.warnings);
    stats[f] = { hots: r.info.hots, props: r.info.props, crates: r.info.scale, hotIds: r.hotIds, charH: r.info.charH };
  }
  // index.json
  let idx = null;
  try { idx = readJSON('shops/index.json'); } catch (e) { problems.push('shops/index.json 讀不了'); }
  if (idx) {
    if (!idx.map || !fs.existsSync(path.join(LAB, idx.map))) problems.push('index.json：map 檔不存在 ' + idx.map);
    const mapL = idx.map ? layouts[path.basename(idx.map, '.json')] : null;
    if (mapL && mapL.kind !== 'map') problems.push('index.json：map 指到的不是 kind:map');
    const mapHots = mapL ? stats[path.basename(idx.map)].hotIds : [];
    const seen = new Set();
    if (!Array.isArray(idx.shops) || !idx.shops.length) problems.push('index.json：shops 要是非空陣列');
    (idx.shops || []).forEach((s, i) => {
      if (seen.has(s.id)) problems.push('index.json：店 id 重複 ' + s.id); seen.add(s.id);
      if (!['open', 'locked', 'debug'].includes(s.status)) problems.push('index.json：' + s.id + ' status ' + s.status);
      if (!s.layout || !fs.existsSync(path.join(LAB, s.layout))) problems.push('index.json：' + s.id + ' layout 檔不存在');
      else if (!layouts[s.id] || layouts[s.id].kind !== 'shop') problems.push('index.json：' + s.id + ' 的 layout id／kind 不對');
      if (s.pin && !mapHots.includes(s.pin)) problems.push('index.json：' + s.id + ' 的圖釘 ' + s.pin + ' 不在地圖上');
    });
    if (!(idx.shops || []).some(s => s.id === 'dip' && s.status === 'open')) problems.push('index.json：本店 dip 要是 open');
    // 地圖：本店開著，其他（v2 預告）都鎖住；動作要對到存在的店
    if (mapL) (mapL.props || []).filter(o => o.type === 'pin').forEach(o => {
      const a = o.hot && o.hot.action;
      if (a && a.startsWith('shop:') && !seen.has(a.slice(5))) problems.push('taipei：圖釘 ' + o.id + ' 指到不存在的店 ' + a);
      if (a === 'locked' && !o.locked) problems.push('taipei：圖釘 ' + o.id + ' 動作 locked 但沒有 locked 旗標');
    });
  }
  return { problems, warnings, stats, lib };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const quiet = process.argv.includes('--quiet');
  const { problems, warnings, stats } = runChecks();
  if (!quiet) {
    for (const [f, s] of Object.entries(stats)) console.log(f + '：道具 ' + s.props + '、熱點 ' + s.hots + (s.crates.length ? '、唱片箱高 ' + s.crates.map(c => c.id + ' ' + c.h).join(' / ') + '（小人 ' + s.charH + '）' : ''));
    warnings.forEach(w => console.log('  注意：' + w));
  }
  if (problems.length) { problems.forEach(p => console.log('✗ ' + p)); console.log('check-shops：' + problems.length + ' 個問題'); process.exit(1); }
  console.log('check-shops：OK（' + Object.keys(stats).length + ' 份 layout' + (warnings.length ? '，' + warnings.length + ' 個注意' : '') + '）');
}
