// check-shops.mjs：像素店 layout（shops/*.json）自檢（SPEC-v2 §5.2、§5.6、§9.3）。改了店的配置或道具庫之後跑一次。
//
//   node game-lab/tools/check-shops.mjs          # 有問題 exit 1；--quiet 只印結論
//
// 卡只驗核心（第 B 波 SPEC-B §1.4【定稿 A4】）：loadCards() 讀 cards.js＝核心 368 張（店裡道具、熱點、牆上封面只引用核心卡）；
//   精選新卡（cards-pool.js 4,677 張）不在這裡驗（沒有 localCover、不上道具；封面試聽由 v5/pool5k check 逐張驗過）。不要改成讀 content.js 的整池。
//
// 檢查：schema（id、kind、size、safe、cameras、spots、props、hotspots、actors、meta）；熱點 id 唯一、動作合法；
//       spots／熱點／鏡頭都在畫布內；舊 POS 別名表（stage.js）每個目標在每家店都有；引用的唱片都在 cards.js；
//       箱子對到 content.js 的卡池；地圖圖釘對到 shops/index.json；每個道具都畫得出來（假畫布）、畫在畫布內；
//       比例：唱片箱整體不高過一個小人（14 格），所有站立道具的格子跟小人同一個尺度（不縮放）。
//       斜俯視 3/4（layout.projection＝'oblique34'，本店 dip，店主選的路線 P2）：道具用 DipShop.O34.PROPS 畫（量外框＋假畫布各畫一次）；
//       人＝16×16 小人 ×spriteScale（48 格）；箱子桌、櫃檯、唱盤台、試聽桌都比人矮；耳機掛勾在桌面高度；
//       v4（SPEC-v4 §2.3、§5.1）：唱盤區剛好一台 duelDeck（duel.deck＝轉盤中心、在兩個對決者中間）＋特效層；櫃檯招牌 o.sign 合法（EMBLEM 點陣）；
//       每個箱子有 bin（key 唯一、label、stand 貼著箱子、不在家具裡）或 decor、front 張數＝欄數、沒有 lean，主熱點 bin:<key> 由資料推出；
//       交叉比對（v4 整合 C）：由資料推出的 bin:* 集合＝DipShop.buildHotList(L) 真的產生的 bin:* 集合；
//       門口牆（FIXLIST 4／5）：有 bin 的牆架（feature／picks）同樣要 key 唯一、label、stand（站在牆前的走道上）、每格都有唱片（n×rows）；
//       section 是 bins.js 的區；看得到的封面 ⊂ bins.js 那一區（只警告；嚴格檢查在 check-covers）；
//       走位：每個 spot 與 bin.stand 不站在家具裡，任兩個之間的 navRoute 每一段都不穿過家具（navRoute 回 null＝走不到）；
//       另外逐段對每個站立家具的腳下範圍（不加邊、端點不豁免）再查一次（D §3），站立道具一定要有 foot。
//       腳下範圍（FIXLIST 1，店主「不要跨過中島唱片區」）＝DipShop.footprints：道具實際畫出來的那一塊（量的）∪ foot；
//       layout.footprints.groups（中島）合成一塊多邊形；behind（櫃檯、唱盤台：老闆站後面）留一個口袋，只有站在口袋裡的人的路線可以進去。避障、這裡、shop.test 同一份。
//       站著不動的人（老闆以外的 actors；r1 已退役，這條留著擋之後再有站樁的人）：離任何 bin.stand |dx|≥38 或 |dy|≥44（R-02）、不站在口袋裡（店主 11-18：客人不會跑到櫃檯裡面）。
//       活店（SPEC-H §4.1、§12.2 LP2／LP3／LP7）：crowd.stops 每格（bin＝那一箱的 stand、at＝spot）不在家具裡、不在任何 footprints.behind 口袋
//       （「crowd.stops <id>（<at 或 bin> [x,y]）站在 <口袋> 後面的口袋裡…」）、離 duelE／duelP／ref／between／map／counter ≥38×44；
//       非短停的格頭上 24×28 熱點吃掉任何既有熱點的可見區 ≤20 格（短停 c-listen、c-pay 只列出來）；crowd.stops 本來就站在 bin.stand 上，不套「不准貼 stand」；
//       路線：門 →（左排 via.left／右排 via.right）→ 每格、每格 → 門、同排直走、跨排走 via.cross、右排 → duelE（leaving、mid、in、frontleft）每一點 y ≤250
//       （走到對戰台那段 in 之後除外）、不進口袋；主線客人 crowd.guest.in／out 的身體框（20×14）只碰 guestClear 的格。
//       房間（kind:'room'，v5 第六項第三期：你家＝聆聽室）：斜俯視同一條檢查，但不套店的必備清單（店站位、對決鏡頭、O34_HOTS、唱盤區 duel、牆上 ≥8 張）；
//       改查 ROOM_HOTS／ROOM_SPOTS、剛好一台唱盤（duelDeck#deck）與一台控制台（tuneConsole）、唱片架 ledge#shelf fill:'owned'（cards 執行時才塞，JSON 可空）、不放翻箱；
//       index.json rooms[]＝{id, layout, pin}：layout 是 kind:room、圖釘在地圖上、圖釘動作＝房間 id。
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { createRequire } from 'module';
import { fileURLToPath, pathToFileURL } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const LAB = path.resolve(HERE, '..');
const require = createRequire(import.meta.url);

export const STATIC_DX = 38, STATIC_DY = 44;   // 兩個小人疊在一起的距離（身體寬、高；R-02）
export const CHAR_H = 14;   // 小人看得到的列數（16×16 格，腳底在第 14 列）
export const SHOP_SPOTS = ['out', 'q1', 'q2', 'door', 'atdoor', 'in', 'counter', 'pay', 'aisle', 'browse', 'crateP', 'dig1', 'dig2', 'dig3',
  'listen', 'between', 'duelE', 'duelP', 'near', 'visit', 'leave', 'map', 'frontleft'];
export const SHOP_CAMERAS = ['full', 'reward', 'strip', 'stripS'];
export const O34_CAMERAS = ['full', 'scene', 'map', 'reward', 'strip', 'stripS'];
// 斜俯視本店一定要有的熱點；箱子的主熱點 bin:<key> 由資料推出（o34HotIds，SPEC-v4 §5.1：check-shops 自己從 o.bin.key 推，不呼叫 shop.js 的 buildHotList）
export const O34_HOTS = ['door', 'now', 'poster-event', 'booth', 'counter', 'cat', 'owner', 'radio'];   // radio：收音機轉頻率（v5 第六項第二期）
export function o34HotIds(L) { return O34_HOTS.concat((L.props || []).filter(o => o.bin && o.bin.key).map(o => 'bin:' + o.bin.key)); }
// v4 新增的站位（序章後走道對峙、特價箱前）
export const O34_SPOTS = SHOP_SPOTS.concat(['leaving', 'mid', 'sale', 'wait']);
// 房間（kind:'room'，v5 第六項第三期：你家＝聆聽室）：斜俯視、跟本店同一套畫法，但不是店（沒有老闆、箱子、對決、序章）。
//   一定要有的熱點：門（回本店）、唱片架（我的收藏分頁）、唱盤、控制台；站位：門口、進門、三件家具前；鏡頭只要 full
export const ROOM_HOTS = ['door', 'shelf', 'deck', 'console'];
export const ROOM_SPOTS = ['door', 'in', 'atShelf', 'atDeck', 'atConsole'];
export const ROOM_CAMERAS = ['full'];
// 房間熱點的動作（ui.js 的房間段）：唱片架分頁、唱盤、控制台；地圖圖釘進房間＝動作寫房間 id（index.json rooms[]）
export const ROOM_ACTIONS = ['shelf:own', 'deck:play', 'tune'];
// 沒有 bin、但畫著封面的道具（高櫃、試聽桌）標 section＝它的封面屬於哪一區（bins.js 的 key；FIXLIST 4／5 起＝picks 店長推薦）
export const SECTION_RE = /^[a-z0-9]+$/;
// 斜俯視的路線：navRoute 走不到回 null（A3 加固後）或舊版的 [b]；回 { pts, len, clear }，走不到回 null
// （clear＝每一段都過得了 navClear：避障框是 DipShop.navObstacles 的多邊形，端點在框裡的那個框跳過）
export function routeOf(DS, L, a, b, obs) {
  obs = obs || DS.navObstacles(L);
  const r = DS.navRoute(L, a, b, obs);
  if (!r) return null;
  const clear = DS.navClear ? (p, q) => DS.navClear(obs, p, q) : (p, q) => !obs.some(o => !inRect(p, o) && !inRect(q, o) && DS.segHitsRect(p, q, o));
  const pts = [a].concat(r); let len = 0, ok = true, bad = null;
  for (let i = 1; i < pts.length; i++) { len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); if (ok && !clear(pts[i - 1], pts[i])) { ok = false; bad = [pts[i - 1], pts[i]]; } }
  return { pts, len, clear: ok, bad };
}
const inRect = (p, q) => p[0] > q[0] && p[0] < q[0] + q[2] && p[1] > q[1] && p[1] < q[1] + q[3];
let LIB = null;
const libDS = () => (LIB || (LIB = loadLib())).DipShop;
// 站立家具的腳下範圍（不加 navMargin）：[[id, poly, props], …]，poly＝[[x,y],…]（DipShop.footprints：畫出來的那一塊 ∪ foot；群組一塊）。
// wall／bg／fx 層與 hidden 不算；站立道具沒有 foot＝bad（口袋的下緣要用它、量不到時也退回它）；block:false（刻意可以走過的）不算
export function footprints(L, OP, bad, DS) {
  (L.props || []).forEach((o, i) => {
    const sp = OP[o.type], layer = o.layer || (sp && sp.layer);
    if (!sp || o.hidden || layer === 'wall' || layer === 'bg' || layer === 'fx') return;
    if (!sp.foot && bad) bad('props[' + i + '] ' + o.type + (o.id ? '#' + o.id : '') + '：站立道具沒有 foot（腳下範圍），走位看不到它');
  });
  DS = DS || libDS();
  return DS.footprints(L, OP).map(f => [f.id, f.poly, f.props]);
}
// 路線（點列）的任一段穿過任一個腳下範圍（多邊形內部）→ { seg, id, foot }；都沒碰到 → null
export function routeHitsFeet(DS, pts, feet) {
  const hits = (a, b, f) => (Array.isArray(f[0]) ? DS.segHitsPoly(a, b, f) : DS.segHitsRect(a, b, f));
  for (let i = 1; i < pts.length; i++) for (const [id, f] of feet) if (hits(pts[i - 1], pts[i], f)) return { seg: [pts[i - 1], pts[i]], id, foot: f };
  return null;
}
const ACTION_RE = /^(door|listen|radio|counter|duel|cat|talk:owner|poster:event|now|locked|home|shelf:own|deck:play|tune|wall-record:.+|wall-painted:.+|crate:[a-z0-9]+|shop:[a-z0-9-]+)$/;
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

export function loadCards() { return require(path.join(LAB, 'cards.js')); }   // 只有核心 368（見檔頭）
// bins.js（A3 烘的：每一區的規則與卡池）；還沒有就回 null
export function loadBins() { try { return require(path.join(LAB, 'bins.js')); } catch (e) { return null; } }
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
  if (L.kind !== 'shop' && L.kind !== 'room') bad('斜俯視的 layout 要是 kind:shop 或 kind:room');
  const room = L.kind === 'room';   // 房間：只做通用的（畫布、鏡頭、站位、道具畫得出來、熱點、走位、腳下範圍）＋房間自己的必備清單
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
  for (const c of (room ? ROOM_CAMERAS : O34_CAMERAS)) if (!cams[c]) bad('缺 cameras.' + c);
  for (const [n, c] of Object.entries(cams)) {
    if (!isInt(c.y) || !isInt(c.h) || c.y < 0 || c.h < 8 || c.y + c.h > H) bad('cameras.' + n + ' 超出畫布：' + JSON.stringify(c));
    if (c.minH != null && !(isInt(c.minH) && c.minH > 0 && c.minH <= c.h)) bad('cameras.' + n + '.minH 要 ≤ h');
    if (c.anchor != null && !['bottom', 'top', 'center'].includes(c.anchor)) bad('cameras.' + n + '.anchor ' + c.anchor);
  }
  if (cams.strip && cams.stripS && cams.stripS.h > cams.strip.h) bad('stripS 要比 strip 矮');
  for (const n of ['full', 'scene', 'map']) if (cams[n] && cams[n].y + cams[n].h !== H) bad('cameras.' + n + ' 要看到地板最下緣' + (room ? '' : '（唱盤區）'));
  // spots
  const spots = L.spots || {};
  for (const [k, s] of Object.entries(spots)) {
    if (!Array.isArray(s) || s.length < 2 || s.length > 3) { bad('spots.' + k + ' 格式'); continue; }
    if (!inside(s[0], s[1])) bad('spots.' + k + ' 在畫布外：' + JSON.stringify(s));
    if (s.length === 3 && typeof s[2] !== 'boolean') bad('spots.' + k + ' 第三格要是 true/false');
  }
  for (const k of (room ? ROOM_SPOTS : O34_SPOTS)) if (!spots[k]) bad('缺 spots.' + k);
  if (!room) for (const [from, to] of Object.entries(lib.ALIAS)) if (!spots[to]) bad('別名 ' + from + ' → ' + to + '：這家店沒有這個 spot');
  if (spots.duelE && spots.duelP) {
    if (!(spots.duelE[0] < spots.duelP[0])) bad('duelE 要在 duelP 左邊（他＝左、你＝右）');
    for (const cn of ['strip', 'stripS']) { const c = cams[cn]; if (!c) continue; for (const k of ['duelE', 'duelP']) { const y = spots[k][1]; if (y > c.y + c.h - 1 || y - 15 * KS < c.y) bad(cn + ' 鏡頭看不到 ' + k + ' 的全身'); } }
    if (cams.strip && spots.ref && spots.ref[1] - 15 * KS < cams.strip.y) bad('strip 鏡頭看不到老闆裁判（ref）的頭');
  }
  // 道具：量外框（不能丟錯、畫在畫布內）＋假畫布再畫一次（文字、封面、裁切的路徑）
  const props = Array.isArray(L.props) ? L.props : (bad('props 要是陣列'), []);
  const S = {
    L, layout: L, W, H, card: (id) => cards[id] || null, t: 1.3, rt: 1.3, frame: 1,
    state: { door: 'closed', playing: true, poke: {}, deck: { rec: { attr: 'o', card: Object.keys(cards)[0], kind: null }, state: 'spin', by: 'p' }, fx: { discs: [{ x: 100, y: 280, attr: 'o', fr: 1 }, { x: 120, y: 282, attr: 'c', split: 2 }, { x: 140, y: 300, attr: 'h', flat: true }], trails: [[90, 280, 'rgba(255,241,194,0.7)']], sparks: [{ x: 140, y: 280, size: 'ring' }], shards: [[130, 300, 3, 'c']], notes: [{ x: 80, y: 270 }], flag: { x: 160, y: 270, side: 'p' }, dots: [[70, 283]], excl: [{ x: 200, y: 260 }] }, dim: 1 },
    drawOutside() {}, outsideCount() { return 1; }
  };
  const ids = new Map(), recRefs = [], kinds = {}, binKeys = new Map(), stands = [], decks = [];
  const BINS0 = loadBins(), binsShop0 = BINS0 && BINS0.shops && BINS0.shops[L.id];
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
    if (room && o.bin) bad(src + '：房間不是店，不放翻箱（bin 會開店裡的抽屜）');
    if (room && o.hot && o.hot.action && !ROOM_ACTIONS.includes(o.hot.action) && !/^shop:[a-z0-9-]+$/.test(o.hot.action)) bad(src + '：房間的道具動作要是 ' + ROOM_ACTIONS.join('／') + ' 或 shop:<店>（門）：' + o.hot.action);
    if (o.type === 'binTable' || o.type === 'binCabinet') {
      // 斜俯視：畫面上的高＝深度＋高度；真的高度＝前板 h＋露出的唱片 rec＋分隔卡（約 5）
      const hh = (o.h || 0) + (o.rec || 8) + 5;
      info.scale.push({ id: o.id || o.type, h: hh });
      if (hh >= CH * 0.8) bad(src + '：箱子桌連唱片高 ' + hh + '，人（' + CH + '）沒有明顯比較高');
      [].concat(o.front || [], o.cards || [], o.lean ? [o.lean] : []).forEach(r => recRefs.push([r, src]));
      // v4（SPEC §2.3.5）：每個箱子要嘛有 bin、要嘛標 decor；front 張數＝欄數；沒有 lean（front[1] 就是那一格）；箱子不再自己帶 hot
      if ('lean' in o) bad(src + '：v4 不用 lean（島上那一格＝front[1]）');
      if (!o.bin && o.decor !== true) bad(src + '：箱子要有 bin（可以翻）或標 decor:true');
      if (o.bin) {
        if (o.hot) bad(src + '：有 bin 的箱子不要再寫 hot（主熱點由 bin 產生）');
        const k = o.bin.key;
        if (typeof k !== 'string' || !/^[a-z0-9]+$/.test(k)) bad(src + '：bin.key 要是小寫英數：' + k);
        else if (binKeys.has(k)) bad(src + '：bin.key 重複 ' + k + '（' + binKeys.get(k) + '）'); else binKeys.set(k, src);
        if (!Array.isArray(o.front) || o.front.length !== (o.cols || 3)) bad(src + '：front 要剛好 ' + (o.cols || 3) + ' 張（＝欄數），現在 ' + (o.front || []).length);
        if (Array.isArray(o.front) && o.front.some(r => typeof r !== 'string' || !r)) bad(src + '：front 有空格');
        const st = o.bin.stand;
        if (!Array.isArray(st) || st.length !== 2 || !inside(st[0], st[1])) bad(src + '：bin.stand 要是畫布內的 [x, y]：' + JSON.stringify(st));
        else {
          stands.push(['bin:' + k, st, src]);
          // stand 貼著箱子：離箱子 box 最近邊的距離（特價箱 ≤10，其他 ≤16）
          const bx = spec.box(o), dx = Math.max(bx[0] - st[0], 0, st[0] - (bx[0] + bx[2])), dy = Math.max(bx[1] - st[1], 0, st[1] - (bx[1] + bx[3])), dd = Math.hypot(dx, dy), lim = k === 'sale' ? 10 : 16;
          if (dd > lim) bad(src + '：bin.stand 離箱子 ' + dd.toFixed(1) + ' 格（要 ≤' + lim + '）');
        }
        if (typeof o.bin.label === 'string' && o.bin.label) addHot('bin:' + k, spec.box(o).map(v => Math.round(v)), 'crate:' + k, o.bin.label, src + ' 箱子');
        else bad(src + '：bin.label（點了放開掛的曲風名、抽屜標題）要有字');
      }
    }
    if (o.section != null) {
      if (typeof o.section !== 'string' || !SECTION_RE.test(o.section)) bad(src + '：section 要是小寫英數的區名（bins.js 的 key）：' + o.section);
      else if (binsShop0 && !binsShop0[o.section]) bad(src + '：section「' + o.section + '」在 bins.js 沒有這一區');
      if (o.bin) bad(src + '：有 bin 的道具不用再寫 section（封面就屬於 bin.key 那一區）');
    }
    if (o.type === 'ledge') {
      const n = (o.n || 7) * Math.max(1, o.rows || 1);
      // fill:'owned'（你家的唱片架）：執行時才由 ui.js 換成唱片櫃裡擁有的前 n×rows 張；JSON 裡可以是空的，不准超過格數
      if (o.fill != null && !(room && o.fill === 'owned')) bad(src + '：fill 只有房間的唱片架能寫（\'owned\'）：' + o.fill);
      if (o.fill === 'owned') { if (!Array.isArray(o.cards) || o.cards.length > n) bad(src + '：fill:owned 的 cards 要是陣列、不超過 ' + n + ' 格'); }
      else if (!Array.isArray(o.cards) || o.cards.length !== n || o.cards.some(r => !r)) bad(src + '：牆上 ' + n + ' 格都要有唱片（cards.length＝n×rows、不准空格；不能用 poolPick 退路）');
      if (o.plate != null && (typeof o.plate !== 'string' || !/^[A-Z0-9&\- .!?]+$/.test(o.plate))) bad(src + '：plate 要是像素字畫得出來的大寫英文：' + o.plate);
      // 門口牆一區（FIXLIST 4／5）：主熱點 bin:<key>＝整面架子（box，含名牌）；stand＝站在牆前的走道上（x 在架子範圍 ±8 格、離架子下緣 ≤60 格）
      if (o.bin) {
        if (o.hot) bad(src + '：有 bin 的牆架不要再寫 hot（主熱點由 bin 產生）');
        const k = o.bin.key;
        if (typeof k !== 'string' || !/^[a-z0-9]+$/.test(k)) bad(src + '：bin.key 要是小寫英數：' + k);
        else if (binKeys.has(k)) bad(src + '：bin.key 重複 ' + k + '（' + binKeys.get(k) + '）'); else binKeys.set(k, src);
        const st = o.bin.stand, bx = spec.box(o);
        if (!Array.isArray(st) || st.length !== 2 || !inside(st[0], st[1])) bad(src + '：bin.stand 要是畫布內的 [x, y]：' + JSON.stringify(st));
        else {
          stands.push(['bin:' + k, st, src]);
          if (st[0] < bx[0] - 8 || st[0] > bx[0] + bx[2] + 8) bad(src + '：bin.stand x＝' + st[0] + ' 不在牆架前（' + (bx[0] - 8) + '–' + (bx[0] + bx[2] + 8) + '）');
          if (!(st[1] > bx[1] + bx[3] && st[1] - (bx[1] + bx[3]) <= 60)) bad(src + '：bin.stand y＝' + st[1] + ' 要在牆架下緣（' + (bx[1] + bx[3]) + '）之下 60 格內（站在牆前的走道上）');
        }
        if (typeof o.bin.label === 'string' && o.bin.label) addHot('bin:' + k, bx.map(v => Math.round(v)), 'crate:' + k, o.bin.label, src + ' 牆架');
        else bad(src + '：bin.label（點了放開掛的區名、抽屜標題）要有字');
      }
    }
    if (o.type === 'duelDeck') { decks.push(o); if (tall >= CH) bad(src + '：唱盤台比人高'); }
    if (o.type === 'counter') { if (tall >= CH) bad(src + '：櫃檯比人高'); if (o.now) recRefs.push([o.now, src]); checkSign(o.sign, src + '.sign', lib, bad); }
    if (o.type === 'deckStand') bad(src + '：v4 只有一台 duelDeck（deckStand 已刪）');
    if (o.type === 'listenDesk') {
      if (tall >= CH) bad(src + '：試聽桌比人高');
      const hookM = (o.h - 1) / (L.pxPerM || 28.2); if (hookM < 0.55 || hookM > 0.9) bad(src + '：耳機掛勾離地 ' + hookM.toFixed(2) + ' m，要在桌面高度（0.55–0.9 m）');
      if (o.stack) recRefs.push([o.stack, src]);
    }
    if (o.type === 'ledge' || o.type === 'shelving') (o.cards || []).forEach(r => r && recRefs.push([r, src]));
    if (o.type === 'tuneConsole' && tall >= CH) bad(src + '：控制台的桌子比人高');
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
  for (const id of (room ? ROOM_HOTS : o34HotIds(L))) if (!ids.has(id)) bad('缺熱點 ' + id);
  // 交叉比對（SPEC-v4 §3.3，C 整合後加）：從 o.bin.key 推出的 bin:<key> 集合＝shop.js DipShop.buildHotList(L) 真的產生的 bin:* 集合
  if (lib.DipShop && typeof lib.DipShop.buildHotList === 'function') {
    let built = null;
    try { built = lib.DipShop.buildHotList(JSON.parse(JSON.stringify(L)), lib.DipShop.O34 && lib.DipShop.O34.PROPS, { card: id => cards[id] || null }); }
    catch (e) { bad('DipShop.buildHotList 丟錯：' + (e && e.message)); }
    if (built) {
      const fromData = new Set(o34HotIds(L).filter(h => h.startsWith('bin:')));
      const fromHot = new Set(built.filter(h => !h.occluder && typeof h.id === 'string' && h.id.startsWith('bin:')).map(h => h.id));
      for (const id of fromData) if (!fromHot.has(id)) bad('交叉比對：' + id + ' 由 o.bin 推得出來，但 buildHotList 沒有這個熱點');
      for (const id of fromHot) if (!fromData.has(id)) bad('交叉比對：buildHotList 有 ' + id + '，但沒有哪個道具的 o.bin.key 對得上');
    }
  } else bad('shop.js 沒有 DipShop.buildHotList：交叉比對做不了');
  // 每張單點看唱片資訊的封面（沒有 bin 的牆架、後牆矮櫃 hotCovers、高櫃）都要有 rack:<id>；門口牆有 bin＝整面翻那一區，不出單張熱點
  if (!room && [...ids.keys()].filter(h => h.startsWith('rack:')).length < 8) bad('可以單點看唱片資訊的封面少於 8 張（後牆矮櫃 8 張要有 rack:<id>）');
  for (const [r, src] of recRefs) if (!cards[r]) bad(src + '：唱片 ' + r + ' 不在 cards.js');
  (L.actors || []).forEach((a, i) => {
    if (!a.id || typeof a.id !== 'string') bad('actors[' + i + '] 缺 id');
    if (!spots[a.at]) bad('actors[' + i + '] 站的位置 ' + a.at + ' 不存在');
    if (typeof a.sprite !== 'string') bad('actors[' + i + '] sprite 要是字串');
  });
  // meta.crates：v4 由每個箱子的 bin 推出，留 null（SPEC §2.3.1）；寫了物件就要對得上 bin
  const meta = L.meta || {};
  if (meta.crates != null) {
    if (typeof meta.crates !== 'object') bad('meta.crates 要是 null（由 bin 推出）');
    else for (const [hid, key] of Object.entries(meta.crates)) { const pr = props.find(o => o.id === hid); if (!pr || !pr.bin || pr.bin.key !== key) bad('meta.crates：' + hid + ' 對不到 bin.key ' + key); }
  }
  // 箱子露出的封面 ⊂ 那一區的卡池（bins.js 有的話；嚴格的曲風／不重複檢查在 A3 的 tools/check-covers.mjs）
  const BINS = loadBins(), binsShop = BINS && BINS.shops && BINS.shops[L.id];
  if (binsShop) props.forEach(o => {
    const key = o.bin ? o.bin.key : o.section; if (!key || key === 'sale') return;
    const pool = binsShop[key] && binsShop[key].pool; if (!pool) { warn((o.id || o.type) + '：bins.js 沒有區 ' + key); return; }
    [].concat(o.front || [], o.type === 'listenDesk' ? [o.stack] : (o.cards || [])).filter(Boolean).forEach(r => { if (!pool.includes(r)) warn((o.id || o.type) + '：看得到的封面 ' + r + ' 不在 bins.js 的 ' + key); });
  });
  // 唱盤區：剛好一台 duelDeck，在兩個對決者中間；duel.deck＝轉盤中心；特效層（房間：剛好一台唱盤＝duelDeck#deck；沒有對決，不要 duel／duelfx）
  if (decks.length !== 1) bad((room ? '房間要剛好一台唱盤（duelDeck）' : '唱盤區要剛好一台 duelDeck') + '（現在 ' + decks.length + ' 台）');
  if (room) {
    if (L.duel) bad('房間沒有對決，不要寫 duel');
    if (props.some(o => o.type === 'duelfx' || o.type === 'counter')) bad('房間不放 duelfx／counter（那是店的）');
    if (decks.length === 1 && decks[0].id !== 'deck') bad('房間的唱盤 id 要是 deck（stage.deck 與熱點 deck）');
    if (props.filter(o => o.type === 'tuneConsole').length !== 1) bad('房間要剛好一台控制台（tuneConsole）');
    const shelf = props.find(o => o.id === 'shelf');
    if (!shelf || shelf.type !== 'ledge' || shelf.fill !== 'owned') bad('房間的唱片架要是 ledge#shelf、fill:owned（放唱片櫃裡擁有的）');
  }
  const D = L.duel || {};
  if (room) { /* 房間沒有 duel */ }
  else if (!Array.isArray(D.deck)) bad('缺 duel.deck（轉盤中心）');
  else {
    if (!inside(D.deck[0], D.deck[1])) bad('duel.deck 在畫布外');
    if (spots.duelE && spots.duelP && !(spots.duelE[0] < D.deck[0] && D.deck[0] < spots.duelP[0])) bad('duel.deck 要在兩個對決者中間');
    if (decks.length === 1 && OP.duelDeck && OP.duelDeck.center) { const c = OP.duelDeck.center(decks[0]); if (Math.abs(c[0] - D.deck[0]) > 1 || Math.abs(c[1] - D.deck[1]) > 1) bad('duel.deck ' + JSON.stringify(D.deck) + ' 不是 duelDeck 的轉盤中心 ' + JSON.stringify(c)); }
  }
  for (const k of ['deckE', 'deckP', 'clash', 'rug']) if (D[k]) bad('duel.' + k + ' 是 v3 兩台唱盤的資料，v4 刪掉');
  if (spots.ref && !inside(spots.ref[0], spots.ref[1])) bad('spots.ref 在畫布外');
  if (props.some(o => /rug/i.test(o.type))) bad('店主：不要地毯');
  // 腳下範圍的設定（layout.footprints，FIXLIST 1）：groups＝{名字: [道具 id…]}（合成一塊，欄間的縫 ≤2 格）；behind＝老闆站在它後面的口袋（櫃檯、唱盤台）
  const FP = L.footprints || {}, byId = new Map(props.filter(o => o.id).map(o => [o.id, o])), inGroup = new Map();
  const standingProp = (o) => { const sp = OP[o.type], ly = o.layer || (sp && sp.layer); return sp && !o.hidden && !['wall', 'bg', 'fx'].includes(ly); };
  if (FP.groups != null && (typeof FP.groups !== 'object' || Array.isArray(FP.groups))) bad('footprints.groups 要是 {名字: [道具 id…]}');
  for (const [g, ids0] of Object.entries(FP.groups || {})) {
    if (!Array.isArray(ids0) || ids0.length < 2) { bad('footprints.groups.' + g + ' 要是兩件以上道具的 id'); continue; }
    for (const id of ids0) {
      const o = byId.get(id);
      if (!o) bad('footprints.groups.' + g + '：沒有道具 ' + id); else if (!standingProp(o)) bad('footprints.groups.' + g + '：' + id + ' 不是站立道具');
      if (inGroup.has(id)) bad('footprints：' + id + ' 同時在 ' + inGroup.get(id) + ' 與 ' + g); inGroup.set(id, g);
    }
  }
  // behind＝{道具 id: [xa, xb]}：老闆站在它後面的口袋（地面那塊後面、x 在 xa–xb 的那一條）；口袋裡一定要有 spot（不然不需要口袋）
  if (FP.behind != null && (typeof FP.behind !== 'object' || Array.isArray(FP.behind))) bad('footprints.behind 要是 {道具 id: [xa, xb]}');
  const pockets = [];
  for (const [id, xr] of Object.entries(FP.behind || {})) {
    const o = byId.get(id);
    if (!o) { bad('footprints.behind：沒有道具 ' + id); continue; }
    if (!standingProp(o)) { bad('footprints.behind：' + id + ' 不是站立道具'); continue; }
    if (inGroup.has(id)) bad('footprints.behind：' + id + ' 不能同時在群組裡');
    if (!Array.isArray(xr) || xr.length !== 2 || !xr.every(v => typeof v === 'number') || !(xr[0] < xr[1])) { bad('footprints.behind.' + id + ' 要是 [xa, xb]（xa < xb）'); continue; }
    const pr = DS.pocketRect && DS.pocketRect(o, OP, { L, layout: L, state: {}, card: () => null }, xr);
    if (!pr) { bad('footprints.behind.' + id + '：口袋是空的（不在道具畫出來的左右範圍裡，或道具後面沒有被它擋住的那一條）'); continue; }
    const who = Object.entries(spots).filter(([, s]) => !s[2] && inRect(s, pr)).map(([k]) => k);
    if (!who.length) bad('footprints.behind.' + id + '：口袋 ' + JSON.stringify(pr) + ' 裡沒有任何 spot（口袋是給老闆站後面用的）');
    pockets.push({ id, rect: pr, who });
  }
  const feetAll = DS.footprints ? DS.footprints(L, OP) : [];
  for (const f of feetAll) if (f.gap > 2) bad('footprints.groups.' + f.id + '：成員之間有 ' + f.gap + ' 格寬的縫（>2），不是一塊');
  // footprints.margin＝{那一塊的 id: [mx, my]}：逐塊的避障邊（取代 navMargin）；id 要是 footprints 算出來的某一塊
  if (FP.margin != null && (typeof FP.margin !== 'object' || Array.isArray(FP.margin))) bad('footprints.margin 要是 {id: [mx, my]}');
  for (const [id, m] of Object.entries(FP.margin || {})) {
    if (!feetAll.some(f => f.id === id)) bad('footprints.margin：沒有這一塊 ' + id);
    if (!Array.isArray(m) || m.length !== 2 || !m.every(v => typeof v === 'number' && v >= 0 && v <= 20)) bad('footprints.margin.' + id + ' 要是 [mx, my]（0–20）');
  }
  // 走位：spot 不站在家具裡；從門口都走得到（每一段不穿過家具）
  const obs = DS.navObstacles(L);
  const obsAt = (q) => obs.find(o => (DS.inObs ? DS.inObs(q, o) : inRect(q, o)));
  const obsName = (o) => o && o.box ? o.id + ' ' + JSON.stringify(o.box) : JSON.stringify(o);
  (L.nav || []).forEach((q, i) => { if (!inside(q[0], q[1])) bad('nav[' + i + '] 在畫布外'); const r = obsAt(q); if (r) bad('nav[' + i + '] 在家具裡 ' + JSON.stringify(q) + ' ' + obsName(r)); });
  for (const [k, s] of Object.entries(spots)) {
    if (s[2]) continue;
    const r = obsAt(s);
    if (r) bad('spots.' + k + ' 站在家具裡 ' + obsName(r));
  }
  for (const [k, st, src] of stands) { const r = obsAt(st); if (r) bad(src + '：bin.stand ' + JSON.stringify(st) + ' 站在家具裡 ' + obsName(r)); }
  // 站著不動的人（老闆以外的 actors；熟客 r1 已退役＝SPEC-H，活店的人走 crowd 段、下面 checkCrowd 另外查）旁邊不能是 bin.stand：你走過去翻箱子會被他整個蓋掉（R-02：FEATURE 的站位在熟客正後面）。
  //   一個小人的身體寬約 38 格、高 44 格以內就會疊到（ui.js makeRoom 用同一組數字請門邊等的客人讓開）
  //   v5 店面改版：窗下矮櫃改成 BLUES 藍調櫃，熟客原本站它前面 [200,104]，名牌和封面被她蓋掉、藍調站位也被這條擠到 INDIE POP 前面——
  //   所以熟客搬到櫃檯後面的高櫃前，藍調站位回到藍調櫃正前面。要站人就挑旁邊沒有任何箱子站位、也不擋名牌的地方。
  //   店主 11-18：「照常理沒有客人會跑到櫃檯裡面」→ 熟客搬到櫃檯外、櫃檯右半邊正前面（spots.regular；頭肩在檯面下、腳在對決橫條上緣之上，見 shop.test）；下面加一條：老闆以外的人不准站在 footprints.behind 的口袋裡。
  for (const a of (L.actors || [])) {
    if (a.id === 'o' || !spots[a.at]) continue;
    const s0 = spots[a.at];
    for (const [k, st, src] of stands) if (Math.abs(st[0] - s0[0]) < STATIC_DX && Math.abs(st[1] - s0[1]) < STATIC_DY) bad(src + '：bin.stand ' + JSON.stringify(st) + ' 跟站著不動的 ' + a.id + '（' + a.at + ' ' + JSON.stringify(s0) + '）疊在一起（|dx|<' + STATIC_DX + '、|dy|<' + STATIC_DY + '）');
    // 櫃檯、唱盤台後面的口袋是老闆站的地方（店主 11-18：沒有客人會跑到櫃檯裡面）
    for (const pk of pockets) if (inRect(s0, pk.rect)) bad('actors ' + a.id + '（' + a.at + ' ' + JSON.stringify(s0) + '）站在 ' + pk.id + ' 後面的口袋裡（那是老闆站的地方，客人不會跑到櫃檯裡面）');
  }
  // 任兩個 spot（含每個 bin.stand）之間的路線每一段都不穿過家具（SPEC §5.1；v3 只查 door／counter 出發）
  info.routes = 0;
  const pts = Object.entries(spots).filter(([, s]) => !s[2]).map(([k, s]) => [k, s.slice(0, 2)]).concat(stands.map(([k, st]) => [k, st]));
  // D §3「路線絕不穿過箱子、櫃檯或任何家具」＋店主「不要跨過中島唱片區」：另外拿每個站立家具的腳下範圍（畫出來的那一塊，不加邊、端點不豁免）逐段再查一次，
  // 不只信 navRoute 自己的 clear（它會跳過「端點在框裡」的那個框）；站立道具一定要有 foot
  const feet = footprints(L, OP, (m) => bad(m), DS);
  info.feet = feet.length;
  for (const [ka, a] of pts) for (const [kb, b] of pts) {
    if (ka === kb) continue;
    const r = routeOf(DS, L, a, b, obs); info.routes++;
    if (!r) { bad('走不到 spots.' + kb + '（從 ' + ka + '）'); continue; }
    if (!r.clear) bad('走不到 spots.' + kb + '（從 ' + ka + '，' + JSON.stringify(r.bad[0]) + '→' + JSON.stringify(r.bad[1]) + ' 穿過家具）');
    const hit = routeHitsFeet(DS, r.pts, feet);
    if (hit) bad(ka + '→' + kb + ' 的路線 ' + JSON.stringify(hit.seg[0]) + '→' + JSON.stringify(hit.seg[1]) + ' 穿過 ' + hit.id + ' 的腳下範圍');
    // 口袋只給站在口袋裡的人進出：兩端都不在口袋裡的路線不准經過口袋（不然就是從櫃檯後面、唱盤台上面穿過去）
    for (const pk of pockets) {
      if (inRect(a, pk.rect) || inRect(b, pk.rect)) continue;
      const k = r.pts.findIndex((q, i) => i > 0 && (DS.segHitsRect(r.pts[i - 1], q, pk.rect) || inRect(q, pk.rect)));
      if (k > 0) bad(ka + '→' + kb + ' 的路線 ' + JSON.stringify(r.pts[k - 1]) + '→' + JSON.stringify(r.pts[k]) + ' 從 ' + pk.id + ' 後面的口袋穿過（那是老闆站的地方）');
    }
  }
  // 活店（SPEC-H §4.1、§4.3、§12.2 LP2–LP4、LP7）：crowd 段＝走動的熟客與路人停的格、走的路
  if (!room) checkCrowd(L, { DS, OP, spots, stands, pockets, obs, obsAt, bad, warn, info, cards, inside });
  info.charH = CH; info.kinds = kinds;
  return { problems: P, warnings: Wn, hotIds: [...ids.keys()], info };
}

// ---------- 活店 crowd 段（SPEC-H §4.1）
export const CROWD_KEEP_OFF = ['duelE', 'duelP', 'ref', 'between', 'map', 'counter'];   // 停留點離這些都要 ≥38×44（對決者、裁判、櫃檯後的老闆）
export const CROWD_STEAL_MAX = 20;    // 非短停的格：跟著人走的熱點（24×28）吃掉任何一個既有熱點的可見區 ≤20 格
export const CROWD_MAX_Y = 250;       // 走動的人路上每一點 y ≤250（不從中島下面的唱盤區繞；唯一例外：走進對戰台 duelE 那段）
export const BODY_DX = 20, BODY_DY = 14;   // 身體框（兩個人身體疊在一起；SPEC-H §4.3）
// 停留點 → 座標：bin＝那一箱的 bin.stand、at＝spots 的一格（座標只有一份）
export function crowdStopXY(L, s) {
  if (!s) return null;
  if (s.bin) { const pr = (L.props || []).find(o => o.bin && o.bin.key === s.bin); return pr && Array.isArray(pr.bin.stand) ? pr.bin.stand.slice(0, 2) : null; }
  const sp = (L.spots || {})[s.at]; return sp ? sp.slice(0, 2) : null;
}
export function crowdStops(L) {
  const C = L.crowd; if (!C || !Array.isArray(C.stops)) return [];
  return C.stops.map(s => { const xy = crowdStopXY(L, s); return xy ? Object.assign({}, s, { x: xy[0], y: xy[1], side: xy[0] < 140 ? 'left' : 'right' }) : null; }).filter(Boolean);
}
// 一串地方（spot 名、停留點 id、[x,y]）逐段接成路線（跟 shop.walk／Stage.route 同一條：每段 navRoute）。回 { pts, marks:{key: 點的位置} } 或 null（走不到）
export function crowdChain(DS, L, from, keys, obs) {
  const stops = crowdStops(L), xyOf = k => Array.isArray(k) ? k.slice(0, 2) : (stops.find(s => s.id === k) ? [stops.find(s => s.id === k).x, stops.find(s => s.id === k).y] : (L.spots[k] ? L.spots[k].slice(0, 2) : null));
  let cur = xyOf(from); if (!cur) return null;
  const pts = [cur], marks = {};
  for (const k of keys) {
    const to = xyOf(k); if (!to) return null;
    const r = routeOf(DS, L, cur, to, obs); if (!r || !r.clear) return null;
    for (let i = 1; i < r.pts.length; i++) pts.push(r.pts[i]);
    marks[typeof k === 'string' ? k : JSON.stringify(k)] = pts.length - 1; cur = to;
  }
  return { pts, marks };
}
// 路線每 step 格取一點（身體框比對用）
export function samplePts(pts, step = 2) {
  const out = [];
  for (let i = 1; i < pts.length; i++) { const a = pts[i - 1], b = pts[i], d = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.ceil(d / step)); for (let k = 0; k <= n; k++) out.push([a[0] + (b[0] - a[0]) * k / n, a[1] + (b[1] - a[1]) * k / n]); }
  return out.length ? out : pts.slice();
}
// 路線的身體框（20×14）碰到哪些停留點 → [id…]
export function routeTouches(pts, stops, skip) {
  const sm = samplePts(pts), out = [];
  for (const s of stops) { if (skip && skip.includes(s.id)) continue; if (sm.some(p => Math.abs(p[0] - s.x) < BODY_DX && Math.abs(p[1] - s.y) < BODY_DY)) out.push(s.id); }
  return out;
}
// 一個人站在 xy、頭到腰一塊跟著人走的熱點（rel）：既有熱點的可見區各被吃掉幾格 → { hotId: n }（scratchpad tools/steal.mjs 的算法）
export function crowdSteal(DS, L, xy, rel, extra) {
  const PR = DS.O34.PROPS, base = DS.buildHotList(JSON.parse(JSON.stringify(L)), PR, {});
  const L2 = JSON.parse(JSON.stringify(L));
  L2.spots.__crowd = [xy[0], xy[1]];
  L2.actors = (L2.actors || []).concat([{ id: '__crowd', at: '__crowd', sprite: 'girl' }]);
  L2.hotspots = (L2.hotspots || []).concat([Object.assign({ id: '__crowd', follow: '__crowd', rel: rel.slice(), rect: [xy[0] + rel[0], xy[1] + rel[1], rel[2], rel[3]], label: '客人', action: 'talk:x' }, extra || {})]);
  const hl = DS.buildHotList(L2, PR, {}), me = hl.find(h => h.id === '__crowd'), mr = me.rect, clip = [0, 0, L.size[0], L.size[1]];
  const hitsMe = h => h.shape && h.shape.some(r => r[0] < mr[0] + mr[2] && r[0] + r[2] > mr[0] && r[1] < mr[1] + mr[3] && r[1] + r[3] > mr[1]);
  const out = {};
  for (const h of hl) {
    if (h.occluder || h.id === '__crowd' || !hitsMe(h)) continue;
    const b0 = base.find(x => x.id === h.id); if (!b0) continue;
    const A0 = DS.hotRegion(base, b0, clip), A1 = DS.hotRegion(hl, h, clip), n0 = A0 ? A0.n : 0, n1 = A1 ? A1.n : 0;
    if (n1 < n0) out[h.id] = n0 - n1;
  }
  return out;
}
function checkCrowd(L, X) {
  const { DS, spots, pockets, obsAt, bad, info, inside } = X;
  const C = L.crowd;
  if (C == null) { if (L.id === 'dip') bad('缺 crowd（活店停留點，SPEC-H §4.1）'); return; }
  if (typeof C !== 'object' || Array.isArray(C)) { bad('crowd 要是物件'); return; }
  const isSpot = k => typeof k === 'string' && Array.isArray(spots[k]);
  if (!Array.isArray(C.stops) || !C.stops.length) { bad('crowd.stops 要是非空陣列'); return; }
  const seen = new Set(), binKeys = new Set((L.props || []).filter(o => o.bin && o.bin.key && o.bin.stand).map(o => o.bin.key));
  C.stops.forEach((s, i) => {
    const src = 'crowd.stops[' + i + ']';
    if (!s || typeof s.id !== 'string' || !/^c-[a-z0-9]+$/.test(s.id)) { bad(src + '：id 要是 c-<小寫英數>'); return; }
    if (seen.has(s.id)) bad('crowd.stops：id 重複 ' + s.id); seen.add(s.id);
    if (!!s.bin === !!s.at) bad('crowd.stops ' + s.id + '：bin（站那一箱的 bin.stand）與 at（spots 的一格）只能寫一個');
    if (s.bin && !binKeys.has(s.bin)) bad('crowd.stops ' + s.id + '：沒有 bin.key ' + s.bin + '（要有 stand 的箱子）');
    if (s.at && (!isSpot(s.at) || spots[s.at][2])) bad('crowd.stops ' + s.id + '：at 要是店裡的 spot（不在門外）：' + s.at);
    if (s.pose != null && s.pose !== 'dig') bad('crowd.stops ' + s.id + '：pose 只認 dig（翻箱）：' + s.pose);
    if (s.kind != null && !['listen', 'pay'].includes(s.kind)) bad('crowd.stops ' + s.id + '：kind 只認 listen／pay：' + s.kind);
    if (s.kind && s.pose === 'dig') bad('crowd.stops ' + s.id + '：' + s.kind + ' 的格不擺 dig（前面沒有箱子可翻）');
    for (const f of ['back', 'short', 'guestClear']) if (s[f] != null && typeof s[f] !== 'boolean') bad('crowd.stops ' + s.id + '：' + f + ' 要是 true/false');
    if (s.hotPri != null && !(Number.isInteger(s.hotPri) && s.hotPri >= 1 && s.hotPri <= 9)) bad('crowd.stops ' + s.id + '：hotPri 要是 1–9 的整數');
  });
  const stops = crowdStops(L);
  const hot = C.hot || {};
  if (!Array.isArray(hot.rel) || hot.rel.length !== 4 || !hot.rel.every(Number.isInteger) || !(hot.rel[2] > 0 && hot.rel[3] > 0)) bad('crowd.hot.rel 要是 [dx,dy,w,h] 整數');
  if (hot.minY != null && !Number.isInteger(hot.minY)) bad('crowd.hot.minY 要是整數');
  const via = C.via || {};
  for (const k of ['left', 'right']) if (!isSpot(via[k])) bad('crowd.via.' + k + ' 要是 spot：' + via[k]);
  if (!Array.isArray(via.cross) || via.cross.length < 1 || !via.cross.every(isSpot)) bad('crowd.via.cross 要是一串 spot');
  const G = C.guest || {};
  for (const k of ['in', 'out']) if (!Array.isArray(G[k]) || !G[k].length || !G[k].every(isSpot)) bad('crowd.guest.' + k + ' 要是一串 spot');
  if (!isSpot(C.door)) bad('crowd.door 要是 spot：' + C.door);
  info.crowd = { stops: stops.length, steal: {}, short: {} };
  const rel = Array.isArray(hot.rel) && hot.rel.length === 4 ? hot.rel : [-12, -46, 24, 28];
  for (const s of stops) {
    const xy = [s.x, s.y], name = (s.at || s.bin) + ' ' + JSON.stringify(xy);
    if (!inside(s.x, s.y)) { bad('crowd.stops ' + s.id + ' 在畫布外'); continue; }
    const ob = obsAt(xy); if (ob) bad('crowd.stops ' + s.id + '（' + name + '）站在家具裡 ' + (ob.id || ''));
    // 店主 11-18：客人不會跑到櫃檯裡面
    for (const pk of pockets) if (inRect(xy, pk.rect)) bad('crowd.stops ' + s.id + '（' + name + '）站在 ' + pk.id + ' 後面的口袋裡（那是老闆站的地方，客人不會跑到櫃檯裡面）');
    for (const k of CROWD_KEEP_OFF) { const q = spots[k]; if (q && Math.abs(q[0] - s.x) < STATIC_DX && Math.abs(q[1] - s.y) < STATIC_DY) bad('crowd.stops ' + s.id + '（' + name + '）離 ' + k + ' ' + JSON.stringify(q) + ' 太近（|dx|<' + STATIC_DX + ' 且 |dy|<' + STATIC_DY + '）'); }
    // 跟著人走的熱點吃掉既有熱點：非短停 ≤20 格；短停（試聽桌、櫃檯前結帳 3–20 秒）只列出來
    const st = crowdSteal(DS, L, xy, rel, s.hotPri ? { pri: s.hotPri } : null);
    info.crowd[s.short ? 'short' : 'steal'][s.id] = st;
    if (!s.short) for (const [hid, n] of Object.entries(st)) if (n > CROWD_STEAL_MAX) bad('crowd.stops ' + s.id + '：站在這裡，頭上的熱點吃掉 ' + hid + ' ' + n + ' 格（>' + CROWD_STEAL_MAX + '；非短停的格不能擋名牌封面）');
  }
  // 路線（LP3）：門 →（左排走 via.left、右排走 via.right）→ 每格、每格 → 門、同排直走、跨排走 via.cross（反過來也是）：每一點 y ≤250、不進口袋
  const obs = X.obs, door = C.door;
  const pocketHit = (pts) => { for (const pk of pockets) { const k = pts.findIndex((q, i) => inRect(q, pk.rect) || (i > 0 && DS.segHitsRect(pts[i - 1], q, pk.rect))); if (k >= 0) return pk.id + ' ' + JSON.stringify(pts[k]); } return null; };
  const checkLeg = (label, from, keys, opt = {}) => {
    const r = crowdChain(DS, L, from, keys, obs);
    if (!r) { bad('crowd 路線 ' + label + ' 走不到（或穿過家具）'); return null; }
    const lim = opt.freeFrom != null ? r.marks[opt.freeFrom] : r.pts.length - 1;
    const hiY = r.pts.slice(0, lim + 1).find(q => q[1] > CROWD_MAX_Y);
    if (hiY) bad('crowd 路線 ' + label + ' 走到 y' + Math.round(hiY[1]) + '（>' + CROWD_MAX_Y + '：從中島下面的唱盤區繞；via 不能拿掉）' + JSON.stringify(r.pts.map(q => q.map(Math.round))));
    const pk = pocketHit(r.pts); if (pk) bad('crowd 路線 ' + label + ' 經過 ' + pk + ' 後面的口袋（那是老闆站的地方）');
    return r;
  };
  const sideVia = s => s.side === 'left' ? via.left : via.right;
  if (isSpot(door) && isSpot(via.left) && isSpot(via.right)) for (const s of stops) {
    checkLeg('門→' + s.id, door, [sideVia(s), s.id]);
    checkLeg(s.id + '→門', s.id, [sideVia(s), door]);
  }
  const cross = Array.isArray(via.cross) && via.cross.every(isSpot) ? via.cross : null;
  for (const a of stops) for (const b of stops) {
    if (a === b) continue;
    if (a.side === b.side) checkLeg(a.id + '→' + b.id, a.id, [b.id]);
    else if (cross) checkLeg(a.id + '→' + b.id + '（跨排）', a.id, (a.side === 'left' ? cross : cross.slice().reverse()).concat([b.id]));
  }
  // 右排的人走到對戰台（切磋邀請者）：leaving → mid → in → frontleft → duelE，走到 in 之前 y ≤250（之後是主線客人那條進場路）
  if (isSpot(via.right) && cross && isSpot('in') && G.in) for (const s of stops.filter(x => x.side === 'right')) checkLeg(s.id + '→duelE', s.id, [via.right].concat(cross.slice().reverse().filter(k => k !== via.right)).concat(G.in), { freeFrom: G.in[0] });
  // 主線客人進出（ui.js guestToTable／輸了出門讀 crowd.guest）：身體框（20×14）只准碰 guestClear 的格（＝c-listen：他走路那幾秒保留）
  if (Array.isArray(G.in) && G.in.every(isSpot) && Array.isArray(G.out) && G.out.every(isSpot) && isSpot(door)) {
    for (const [lab, from, keys] of [['guest.in', door, G.in], ['guest.out', G.in[G.in.length - 1], G.out]]) {
      const r = crowdChain(DS, L, from, keys, obs);
      if (!r) { bad('crowd.' + lab + ' 走不到'); continue; }
      const pk = pocketHit(r.pts); if (pk) bad('crowd.' + lab + ' 經過 ' + pk + ' 後面的口袋');
      const t = routeTouches(r.pts, stops), wrong = t.filter(id => !(stops.find(s => s.id === id) || {}).guestClear);
      info.crowd[lab] = t;
      if (wrong.length) bad('crowd.' + lab + '（主線客人的路）身體框碰到停留點 ' + wrong.join('、') + '（只准碰 guestClear 的格；不然挑戰者進門會穿過翻箱的人）');
    }
  }
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
    stats[f] = { hots: r.info.hots, props: r.info.props, crates: r.info.scale, hotIds: r.hotIds, charH: r.info.charH, crowd: r.info.crowd || null };
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
    // 房間（v5 第六項第三期：你家）：rooms[]＝{id, layout, pin}；layout 是 kind:room、圖釘在地圖上、圖釘的動作＝房間 id（ui.js 認 'home'）
    const roomIds = new Set();
    if (idx.rooms != null && !Array.isArray(idx.rooms)) problems.push('index.json：rooms 要是陣列');
    (Array.isArray(idx.rooms) ? idx.rooms : []).forEach(r => {
      if (!r || typeof r.id !== 'string' || !/^[a-z0-9-]+$/.test(r.id)) { problems.push('index.json：rooms 的 id 要是小寫英數：' + JSON.stringify(r)); return; }
      if (seen.has(r.id) || roomIds.has(r.id)) problems.push('index.json：房間 id 跟店或別的房間重複 ' + r.id); roomIds.add(r.id);
      if (!r.layout || !fs.existsSync(path.join(LAB, r.layout))) problems.push('index.json：房間 ' + r.id + ' layout 檔不存在');
      else if (!layouts[r.id] || layouts[r.id].kind !== 'room') problems.push('index.json：房間 ' + r.id + ' 的 layout id／kind 不對（要是 kind:room）');
      if (!r.pin || !mapHots.includes(r.pin)) problems.push('index.json：房間 ' + r.id + ' 的圖釘 ' + r.pin + ' 不在地圖上');
      else { const pin = (mapL.props || []).find(o => o.id === r.pin); if (!pin || !pin.hot || pin.hot.action !== r.id) problems.push('index.json：房間 ' + r.id + ' 的圖釘動作要是「' + r.id + '」'); if (pin && pin.locked) problems.push('index.json：房間 ' + r.id + ' 的圖釘不能鎖住'); }
    });
    for (const [id, L] of Object.entries(layouts)) if (L.kind === 'room' && !roomIds.has(id)) problems.push('shops/' + id + '.json 是房間，但 index.json 的 rooms 沒有它');
    // 地圖：本店與房間開著，其他（v2 預告）都鎖住；動作要對到存在的店或房間
    if (mapL) (mapL.props || []).filter(o => o.type === 'pin').forEach(o => {
      const a = o.hot && o.hot.action;
      if (a && a.startsWith('shop:') && !seen.has(a.slice(5))) problems.push('taipei：圖釘 ' + o.id + ' 指到不存在的店 ' + a);
      if (a === 'locked' && !o.locked) problems.push('taipei：圖釘 ' + o.id + ' 動作 locked 但沒有 locked 旗標');
      if (a && !a.startsWith('shop:') && a !== 'locked' && !roomIds.has(a)) problems.push('taipei：圖釘 ' + o.id + ' 的動作 ' + a + ' 不是店（shop:<id>）、locked 或 index.json 的房間');
    });
  }
  return { problems, warnings, stats, lib };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const quiet = process.argv.includes('--quiet');
  const { problems, warnings, stats } = runChecks();
  if (!quiet) {
    for (const [f, s] of Object.entries(stats)) console.log(f + '：道具 ' + s.props + '、熱點 ' + s.hots + (s.crates.length ? '、唱片箱高 ' + s.crates.map(c => c.id + ' ' + c.h).join(' / ') + '（小人 ' + s.charH + '）' : ''));
    for (const [f, s] of Object.entries(stats)) if (s.crowd) {
      const fmt = o => Object.entries(o).map(([id, m]) => id + (Object.keys(m).length ? ' 吃 ' + Object.entries(m).map(([h, n]) => h + ' ' + n).join('、') : ' 0')).join('；');
      console.log(f + '：活店停留點 ' + s.crowd.stops + ' 格；' + fmt(s.crowd.steal) + '｜短停（不擋）：' + fmt(s.crowd.short) + '｜主線客人進出碰到：' + [].concat(s.crowd['guest.in'] || [], s.crowd['guest.out'] || []).filter((v, i, A) => A.indexOf(v) === i).join('、'));
    }
    warnings.forEach(w => console.log('  注意：' + w));
  }
  if (problems.length) { problems.forEach(p => console.log('✗ ' + p)); console.log('check-shops：' + problems.length + ' 個問題'); process.exit(1); }
  console.log('check-shops：OK（' + Object.keys(stats).length + ' 份 layout' + (warnings.length ? '，' + warnings.length + ' 個注意' : '') + '）');
}
