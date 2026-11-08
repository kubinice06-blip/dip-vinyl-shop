// game-lab/test/shop.test.mjs — 像素店 layout 與舞台純邏輯的測試。
//   node game-lab/test/shop.test.mjs        # 有失敗 exit 1
// 本店 dip＝斜俯視 3/4（店主選的路線 P2，layout.projection 'oblique34'）：292×322 美術格、人＝16×16 小人 ×3（48 格）。
// 測：check-shops 全綠、schema、熱點（id 唯一、本店該有的都有、牆上唱片、箱子 bin:<key>）、spots（畫布內、門外的人在門洞裡、他左你右、橫條看得到全身）、
//     一台唱盤（SPEC-v4 §2.3.1／§5.1：置中、兩人在兩側、老闆在台後）、走位（繞過家具、每個 spot 從門口與櫃檯都走得到、
//     §2.3.2 路線表：每段不穿家具、1 倍速不超過上限、counter→dig 經過右側走道；navRoute 回 null＝「走不到」）、
//     舊 POS 別名、矮螢幕鏡頭規則（fitCamera 細格子版）、對決鏡頭自動換 stripS、像素字寬度（箱子標籤放得下）、
//     比例（人明顯比箱子桌、櫃檯、唱盤台高；耳機在桌面高度）、唱盤區幾何、櫃檯 logo、index.json 與台北地圖。
import path from 'path';
import fs from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const LAB = path.resolve(HERE, '..');
const CS = await import(pathToFileURL(path.join(LAB, 'tools/check-shops.mjs')).href);

let pass = 0, fail = 0; const fails = [];
function ok(cond, name, info) { if (cond) pass++; else { fail++; fails.push(name + (info !== undefined ? ' :: ' + (typeof info === 'string' ? info : JSON.stringify(info)) : '')); } }
function eq(a, b, name) { const A = JSON.stringify(a), B = JSON.stringify(b); ok(A === B, name, A + ' !== ' + B); }
function section(name, fn) { const f0 = fail; try { fn(); } catch (e) { fail++; fails.push(name + ' threw: ' + (e.stack || e)); } console.log((fail === f0 ? 'ok  ' : 'FAIL') + ' ' + name); }

const lib = CS.loadLib();
const cards = CS.loadCards();
const content = CS.loadContent();
const read = (f) => JSON.parse(fs.readFileSync(path.join(LAB, 'shops', f), 'utf8'));
const dip = read('dip.json'), taipei = read('taipei.json'), basement = read('basement.json'), index = read('index.json');
const DS = lib.DipShop, KS = dip.spriteScale, PERSON = 16 * KS;
const propById = id => dip.props.find(p => p.id === id);

section('check-shops 全綠（schema、熱點、spots、別名、卡池、圖釘、比例、走位）', () => {
  const r = CS.runChecks();
  eq(r.problems, [], 'check-shops problems');
});

section('schema：本店＝斜俯視 3/4（P2）', () => {
  eq(dip.kind, 'shop', 'kind');
  eq(dip.projection, 'oblique34', 'projection');
  eq(dip.size, [292, 322], '畫布 292×322 美術格');
  eq(KS, 3, '小人 ×3（16×16 → 48 格）');
  eq(PERSON, 48, '人 48 格高（1.70 m）');
  ok(Math.abs(PERSON / dip.pxPerM - 1.7) < 0.01, '48 格＝1.70 m', PERSON / dip.pxPerM);
  for (const c of CS.O34_CAMERAS) ok(dip.cameras[c], 'camera ' + c);
  for (const s of CS.O34_SPOTS) ok(Array.isArray(dip.spots[s]), 'spot ' + s);
  eq([dip.cameras.full.y, dip.cameras.full.h], [0, 322], 'full＝整間店');
  eq([dip.cameras.strip.y, dip.cameras.strip.h], [228, 90], 'strip＝唱盤區橫條');
  eq([dip.cameras.stripS.y, dip.cameras.stripS.h], [256, 62], 'stripS＝矮螢幕橫條（375 寬 ≤ 80 CSS px，跟 v3 一樣高）');
  ok(Math.round(dip.cameras.stripS.h * 375 / 292) <= 80, 'stripS 在 375 寬不比舊版高（挑唱片面板不被擠出捲動）');
  eq(dip.cameras.full.anchor, 'bottom', 'full 從牆頂裁（唱盤區留著）');
  ok(dip.meta && dip.meta.crates === null, 'meta.crates＝null（箱子由 bin 推出，SPEC-v4 §2.3.1）');
  const bins = dip.props.filter(p => p.bin);
  eq(bins.map(p => p.id + ':' + p.bin.key), ['backbin:folk', 'isl-0a:rnb', 'isl-0b:ost', 'isl-1a:rock', 'isl-1b:jp', 'isl-2a:hiphop', 'isl-2b:elec', 'isl-3a:new', 'isl-3b:cpop',
    'crate-jazz:jazz', 'crate-tw:tw', 'crate-noise:noise', 'crate-sale:sale'], '12 箱＋特價箱，key 照 §2.3.5');
  eq(bins.map(p => p.bin.label), ['民謠／藍調', 'R&B／靈魂', '原聲／圖庫', '搖滾／龐克', '日本／CITY', '嘻哈／放克', '電子／氛圍', '新進', '華語／台語', '爵士區', '台灣區', '噪音區', '特價區'], '箱子的曲風名');
  ok(dip.props.filter(p => p.type === 'binTable' || p.type === 'binCabinet').every(p => p.bin || p.decor === true), '每個箱子有 bin 或 decor');
  ok(dip.props.every(p => !('lean' in p)), '沒有 lean（島上那一格＝front[1]）');
  ok(bins.every(p => Array.isArray(p.front) && p.front.length === (p.cols || 3) && !p.hot), '每箱 front 張數＝欄數、不帶 hot');
  eq(['isl-0a', 'isl-1b', 'isl-2a', 'isl-3b'].map(id => propById(id).front[1]), ['roberta-flack-born-to-love', '大貫妙子-grey-skies', 'dalek-negro-necro-nekros', '蔡琴-蔡琴老歌'], '島上原本 lean 那一格（front[1]）改從該箱卡池挑');
  eq(propById('isl-1b').front[0], '宇多田ヒカル-first-love', '宇多田在日本／CITY 正面');
  eq([propById('rack-a').section, propById('rack-b').section, propById('shelving').section, propById('booth').section], ['wallA', 'wallB', 'wallB', 'wallA'], '牆上兩區＋高櫃＋試聽桌');
  const seen = new Set(), dup = [];
  for (const p of dip.props) for (const id of [].concat(p.front || [], p.type === 'ledge' || p.type === 'shelving' ? p.cards : [], p.type === 'listenDesk' ? [p.stack] : [])) { if (seen.has(id)) dup.push(id); seen.add(id); }
  eq(dup, [], '看得到的封面整家店不重複');
  eq(seen.size, 60, '看得到的封面 60 張（12 箱 41＋特價 2＋牆 14＋高櫃 2＋試聽 1）');
  ok(!dip.props.some(p => /rug/i.test(p.type)), '沒有地毯（店主）');
  ok(!dip.bg, '沒有背景圖：全部是程式畫的');
  // 地下室（格子版）照舊
  eq(basement.kind, 'shop', 'basement kind');
  for (const c of CS.SHOP_CAMERAS) ok(basement.cameras[c], 'basement camera ' + c);
});

section('熱點：id 唯一、本店該有的都有、牆上的唱片可以點', () => {
  for (const [f, L] of [['dip.json', dip], ['basement.json', basement], ['taipei.json', taipei]]) {
    const r = CS.checkLayout(L, 'shops/' + f, lib, cards, content);
    eq(r.hotIds.length, new Set(r.hotIds).size, f + ' 熱點 id 唯一');
    eq(r.problems, [], f + ' layout 問題');
  }
  const r = CS.checkLayout(dip, 'shops/dip.json', lib, cards, content);
  for (const id of CS.o34HotIds(dip)) ok(r.hotIds.includes(id), 'dip 有熱點 ' + id);
  eq(CS.o34HotIds(dip).filter(h => h.startsWith('bin:')).length, 13, '箱子主熱點 bin:<key> ×13（從 o.bin.key 推出）');
  ok(!r.hotIds.some(h => /^crate-/.test(h)), '沒有 v3 的 crate-* 熱點');
  const racks = r.hotIds.filter(h => h.startsWith('rack:'));
  eq(racks.length, 24, '牆上 14＋高櫃 2＋靠牆矮櫃 8 張唱片都是熱點');
  ok(racks.every(h => cards[h.slice(5)]), '每張都在卡池（點了開唱片資訊）');
  // 熱點產生器跟 layout 一樣：牆上第一排的位置
  const ledge = propById('rack-a'), hs = DS.O34.PROPS.ledge.hots(ledge, { card: id => cards[id] });
  eq(hs[0].rect, [47, 17, 12, 12], '牆上第一張的熱點');
  eq(hs[0].action, 'wall-record:' + ledge.cards[0], '牆上唱片＝唱片資訊');
  // 櫃檯上的子熱點：正在放、店貓
  const ct = DS.O34.PROPS.counter.hots(propById('counter'), { card: id => cards[id] });
  eq(ct.map(h => h.id), ['now', 'cat'], '櫃檯上：正在放、店貓');
  ok(ct.every(h => h.pri > 0), '子熱點比櫃檯優先');
  // 故意做壞：重複 id、超出畫布的 spot、站在家具裡要被抓到
  const broken = JSON.parse(JSON.stringify(dip));
  broken.hotspots.push({ id: 'cat', rect: [1, 1, 2, 2], label: '重複', action: 'cat' });
  broken.spots.duelP = [300, 112];
  broken.spots.browse = [120, 140];
  const rb = CS.checkLayout(broken, 'shops/dip.json', lib, cards, content);
  ok(rb.problems.some(p => /重複/.test(p)), '抓得到重複熱點 id', rb.problems);
  ok(rb.problems.some(p => /duelP.*畫布外/.test(p)), '抓得到畫布外的 spot', rb.problems);
  ok(rb.problems.some(p => /browse.*家具裡/.test(p)), '抓得到站在箱子桌裡的 spot', rb.problems);
  // 故意做壞箱子：bin.key 重複、lean、front 張數、stand 在家具裡、沒有 bin 也沒有 decor、兩台唱盤、牆上空格、壞招牌
  const b2 = JSON.parse(JSON.stringify(dip)), P2 = id => b2.props.find(p => p.id === id);
  P2('isl-0b').bin.key = 'rnb';
  P2('isl-1a').lean = 'the-band-music-from-big-pink';
  P2('isl-2a').front = P2('isl-2a').front.slice(0, 2);
  P2('isl-2b').bin.stand = [160, 190];
  delete P2('isl-3a').bin;
  b2.props.push(Object.assign({}, P2('deck'), { id: 'deck2', x: 20 }));
  P2('rack-b').cards = P2('rack-b').cards.slice(0, 6);
  P2('counter').sign = { emblem: 'nope' };
  const r2 = CS.checkLayout(b2, 'shops/dip.json', lib, cards, content), has = re => r2.problems.some(p => re.test(p));
  ok(has(/bin\.key 重複 rnb/), '抓得到 bin.key 重複', r2.problems);
  ok(has(/isl-1a.*lean/), '抓得到 lean', r2.problems);
  ok(has(/isl-2a.*front 要剛好 3 張/), '抓得到 front 張數不對', r2.problems);
  ok(has(/isl-2b.*bin\.stand.*家具裡/), '抓得到 stand 在家具裡', r2.problems);
  ok(has(/isl-3a.*要有 bin.*decor/), '抓得到沒有 bin 也沒有 decor', r2.problems);
  ok(has(/剛好一台 duelDeck/), '抓得到兩台唱盤', r2.problems);
  ok(has(/rack-b.*7 格都要有唱片/), '抓得到牆上空格', r2.problems);
  ok(has(/emblem「nope」/), '抓得到壞招牌', r2.problems);
});

section('spots：門外的人在門洞裡、他左你右、橫條看得到全身', () => {
  const [W, H] = dip.size;
  for (const [k, s] of Object.entries(dip.spots)) ok(s[0] >= 0 && s[0] < W && s[1] >= 0 && s[1] < H, 'spot ' + k + ' 在畫布內', s);
  const door = propById('door');
  for (const k of ['out', 'q1', 'q2']) {
    const s = dip.spots[k];
    ok(s[2] === true, k + ' 在門外');
    ok(s[0] >= door.x && s[0] < door.x + door.w && s[1] <= door.y + door.h, k + ' 站在門洞裡', s);
  }
  ok(dip.spots.duelE[0] < dip.spots.duelP[0], '他在左你在右');
  for (const c of ['strip', 'stripS']) for (const k of ['duelE', 'duelP']) {
    const cam = dip.cameras[c], y = dip.spots[k][1];
    ok(y <= cam.y + cam.h - 1 && y - 15 * KS >= cam.y, c + ' 看得到 ' + k + ' 全身');
  }
  ok(dip.spots.ref[1] - 15 * KS >= dip.cameras.strip.y, 'strip 看得到老闆裁判全身');
  // 一台唱盤（SPEC-v4 §2.3.1、§5.1）：置中在兩人中間；人站在台子兩側不擋台；老闆在台後（ref）當裁判、矮螢幕橫條看得到頭
  const decks = dip.props.filter(p => p.type === 'duelDeck'), dk = decks[0], sE = dip.spots.duelE, sP = dip.spots.duelP, ref = dip.spots.ref;
  eq(decks.length, 1, '只有一台 duelDeck');
  ok(!dip.props.some(p => p.type === 'deckStand'), '沒有 v3 的兩座 deckStand');
  eq([dk.x, dk.y, dk.w, dk.d, dk.h], [122, 316, 48, 9, 18], 'duelDeck x122 y316 w48 d9 h18（y316：放 314 會吃掉 ref）');
  const dc = DS.O34.PROPS.duelDeck.center(dk);
  ok(Math.abs(dc[0] - (sE[0] + sP[0]) / 2) <= 1, '唱盤中心 x 在兩人正中間', [dc, sE, sP]);
  ok(sE[0] + 5 * KS <= dk.x + 1, '他在唱盤左邊', [sE, dk.x]);
  ok(sP[0] - 5 * KS >= dk.x + dk.w - 1, '你在唱盤右邊', [sP, dk.x + dk.w]);
  ok(ref[1] < dk.y - dk.d && ref[0] >= dk.x && ref[0] <= dk.x + dk.w, '老闆（ref）站在台後、x 在唱盤範圍內', [ref, dk]);
  ok(ref[1] - 15 * KS >= dip.cameras.stripS.y, 'stripS 看得到老闆的頭', ref);
  eq(dip.spots.between, ref, 'between＝ref');
  eq([dip.spots.leaving, dip.spots.mid], [[150, 110], [96, 112]], '後走道對峙站位（§2.3.1）');
  // 挖箱：站在箱子前面、x 在箱子範圍內
  const jazz = propById('crate-jazz'), tw = propById('crate-tw');
  for (const k of ['dig1', 'crateP']) ok(dip.spots[k][1] > jazz.y && dip.spots[k][0] >= jazz.x && dip.spots[k][0] <= tw.x + 42, k + ' 在爵士／台灣箱前面', dip.spots[k]);
  ok(dip.spots.dig2[1] > tw.y && dip.spots.dig2[0] >= tw.x, 'dig2 在台灣箱前面');
  // 老闆在櫃檯後面（腳比櫃檯前緣後面）
  const ct = propById('counter');
  ok(dip.spots.counter[1] < ct.y - ct.d && dip.spots.counter[0] > ct.x && dip.spots.counter[0] < ct.x + ct.w, '老闆站在櫃檯後面', dip.spots.counter);
});

section('走位：繞過家具，從門口、櫃檯到每個 spot 都走得到', () => {
  const obs = DS.navObstacles(dip);
  ok(obs.length >= 15, '家具都有地面範圍', obs.length);
  const inside = (p, r) => p[0] > r[0] && p[0] < r[0] + r[2] && p[1] > r[1] && p[1] < r[1] + r[3];
  const clear = (a, b) => !obs.some(r => !inside(a, r) && !inside(b, r) && DS.segHitsRect(a, b, r));
  // navRoute 走不到（A3 加固後回 null）＝斷言失敗「走不到 a→b」，不 TypeError（SPEC-v4 §2.4.5）
  const routeOr = (navRoute, from, to) => { const r = navRoute(dip, from, to, obs); return r ? [from].concat(r) : '走不到 ' + JSON.stringify(from) + '→' + JSON.stringify(to); };
  const route = (from, to) => { const r = routeOr(DS.navRoute, from, to); if (typeof r === 'string') { ok(false, r); return [from]; } return r; };
  const okRoute = (pts) => pts.length > 1 && pts.every((p, i) => i === 0 || clear(pts[i - 1], p));
  // 直線會穿過中島的兩條：門口 → 你的唱盤區、櫃檯 → 裁判
  const a = dip.spots.door.slice(0, 2), b = dip.spots.duelP.slice(0, 2);
  ok(!clear(a, b), '門口到 duelP 的直線會穿過中島（要繞）');
  const r1 = route(a, b); ok(r1.length > 2 && okRoute(r1), '門口 → duelP 繞過中島', r1);
  const c = dip.spots.counter.slice(0, 2), d = dip.spots.ref.slice(0, 2);
  const r2 = route(c, d); ok(r2.length > 2 && okRoute(r2), '櫃檯 → 裁判 從櫃檯左端繞出來', r2);
  for (const [k, s] of Object.entries(dip.spots)) if (!s[2]) { ok(okRoute(route(a, s.slice(0, 2))), '門口 → ' + k); ok(okRoute(route(c, s.slice(0, 2))), '櫃檯 → ' + k); }
  // 每個 bin.stand 不在家具裡、從門口與櫃檯都走得到
  for (const p of dip.props.filter(p => p.bin)) {
    const st = p.bin.stand;
    ok(!obs.some(r => inside(st, r)), p.id + ' 的 stand 不在家具裡', st);
    ok(okRoute(route(a, st)) && okRoute(route(c, st)), p.id + ' 的 stand 從門口、櫃檯走得到');
  }
  // 「走不到」的處理：helper 先判 null（A3 加固後的 navRoute 走不到回 null，SPEC-v4 §2.4.5）
  eq(routeOr(() => null, [1, 2], [3, 4]), '走不到 [1,2]→[3,4]', 'navRoute 回 null 時報「走不到 a→b」而不是 TypeError');
  eq(CS.routeOf({ navObstacles: () => [], navRoute: () => null, segHitsRect: DS.segHitsRect }, dip, [1, 2], [3, 4]), null, 'check-shops 的 routeOf 也接得住 null');
  // 線段與矩形
  ok(DS.segHitsRect([0, 5], [10, 5], [4, 0, 2, 10]), '穿過');
  ok(!DS.segHitsRect([0, 5], [3, 5], [4, 0, 2, 10]), '沒碰到');
});

// SPEC-v4 §2.3.2 的路線表：每一段都不穿過家具、1 倍速（每秒 72 格）不超過上限；counter→dig1／dig2 經過中島右側走道
const ROUTE_LIMITS = [
  [['counter', 'dig1'], ['counter', 'dig2'], ['dig2', 'counter']], 3.2,
  [['counter', 'mid'], ['mid', 'ref'], ['pay', 'leaving'], ['atdoor', 'duelE'], ['leaving', 'duelP'], ['ref', 'visit'], ['visit', 'dig1'], ['duelE', 'door']], 3.5,
  [['browse', 'sale'], ['sale', 'pay']], 4.5
];
const WALK_PX_PER_S = 36 * (dip.walkK || 2);   // shop.js：預設速度 36 × walkK 2＝每秒 72 格
export const routeTimes = [];
section('路線表（SPEC-v4 §2.3.2）：不穿家具、1 倍速不超過上限、counter→dig 走右側走道', () => {
  eq(WALK_PX_PER_S, 72, '1 倍速每秒 72 格');
  const obs = DS.navObstacles(dip), S = Object.assign({}, dip.spots);
  for (const p of dip.props) if (p.bin) S['bin:' + p.bin.key] = p.bin.stand;
  const one = (a, b, lim, aisle) => {
    const r = CS.routeOf(DS, dip, S[a].slice(0, 2), S[b].slice(0, 2), obs);
    if (!r) { ok(false, '走不到 ' + a + '→' + b); return; }
    const sec = r.len / WALK_PX_PER_S; routeTimes.push([a, b, Math.round(r.len), +sec.toFixed(2), lim]);
    ok(r.clear, a + '→' + b + ' 每一段都不穿過家具', r.bad);
    ok(sec <= lim, a + '→' + b + ' 1 倍速 ' + sec.toFixed(2) + ' s ≤ ' + lim + ' s', r.pts);
    if (aisle) ok(r.pts.some(p => p[0] >= 188 && p[0] <= 210 && p[1] >= 150 && p[1] <= 270), a + '→' + b + ' 經過中島右側走道（x 188–210、y 150–270）', r.pts);
  };
  for (let i = 0; i < ROUTE_LIMITS.length; i += 2) for (const [a, b] of ROUTE_LIMITS[i]) one(a, b, ROUTE_LIMITS[i + 1], i === 0);
  // 所有 bin.stand 兩兩之間、到 browse：≤4.5 s
  const ks = Object.keys(S).filter(k => k.startsWith('bin:')).concat(['browse']);
  let n = 0; for (const a of ks) for (const b of ks) if (a !== b) { one(a, b, 4.5, false); n++; }
  eq(n, 14 * 13, '箱子 13 個 stand＋browse 兩兩');
  // 特價箱：在門下方左牆邊、stand 貼著箱子、不擋 door→atdoor→nav[30,100]→nav[72,110]
  const sale = propById('crate-sale'), sb = DS.O34.PROPS.binTable.box(sale), st = sale.bin.stand;
  ok(sale.x <= 60 && sale.y >= 100 && sale.y <= 160, '特價箱在門下方的左牆邊（x ≤ 60、y 100–160）', [sale.x, sale.y]);
  const dx = Math.max(sb[0] - st[0], 0, st[0] - (sb[0] + sb[2])), dy = Math.max(sb[1] - st[1], 0, st[1] - (sb[1] + sb[3]));
  ok(Math.hypot(dx, dy) <= 10, '特價箱 stand 離箱子 ≤10 格', [st, sb]);
  eq(dip.spots.sale, st, 'spots.sale＝特價箱的 stand');
  const inside = (p, r) => p[0] > r[0] && p[0] < r[0] + r[2] && p[1] > r[1] && p[1] < r[1] + r[3];
  const clear = (a, b) => !obs.some(r => !inside(a, r) && !inside(b, r) && DS.segHitsRect(a, b, r));
  const doorPath = [dip.spots.door, dip.spots.atdoor, [30, 100], [72, 110]].map(p => p.slice(0, 2));
  ok(dip.nav.some(q => q[0] === 30 && q[1] === 100) && dip.nav.some(q => q[0] === 72 && q[1] === 110), 'nav 有 [30,100]、[72,110]');
  ok(doorPath.every((p, i) => i === 0 || clear(doorPath[i - 1], p)), '特價箱不擋 door→atdoor→[30,100]→[72,110]');
});

section('舊 POS 別名表齊全（SPEC-v2 §5.2）', () => {
  const want = {
    'p.door': 'door', 'p.browse': 'browse', 'p.pay': 'pay', 'p.leaving': 'leave', 'p.atdoor': 'atdoor', 'p.duel': 'duelP', 'p.map': 'map',
    'o.counter': 'counter', 'o.aisle': 'aisle', 'o.frontleft': 'frontleft', 'o.dig1': 'dig1', 'o.dig2': 'dig2', 'o.dig3': 'dig3', 'o.between': 'between',
    'f.out': 'out', 'f.door': 'door', 'f.in': 'in', 'f.duel': 'duelE', 'f.near': 'near', 'f.visit': 'visit', 'q.q1': 'q1', 'q.q2': 'q2'
  };
  for (const [k, v] of Object.entries(want)) eq(lib.ALIAS[k], v, 'alias ' + k);
  for (const [k, v] of Object.entries(lib.ALIAS)) { ok(dip.spots[v], 'dip 有 ' + v + '（' + k + '）'); ok(basement.spots[v], 'basement 有 ' + v + '（' + k + '）'); }
});

section('矮螢幕鏡頭規則（fitCamera 細格子版：先從牆頂裁到 minH，再不夠才把倍率每次降 8%）', () => {
  const F = lib.Stage.fitCamera, full = dip.cameras.full, reward = dip.cameras.reward;
  const at = (vh, pm, w = 390, dpr = 3) => ({ dpr, dev: Math.min(1.5 * dpr, w * dpr / 292), avail: vh - 32 - pm, fine: true });
  eq(F(full, at(664, 130)), { y: 0, h: 322, dev: null }, '390×664 title：整間店');
  eq(F(full, at(664, 200)), { y: 0, h: 322, dev: null }, '390×664 今晚來客：整間店');
  eq(F(full, at(664, 260)), { y: 44, h: 278, dev: null }, '390×664 面板高：從牆頂裁');
  eq(F(full, at(548, 130, 375)), { y: 22, h: 300, dev: null }, '375×548 title：裁 22 列');
  const m = F(full, at(548, 200, 375));
  ok(m.y + m.h === 322 && m.h >= full.minH && m.dev && m.dev < at(548, 200, 375).dev, '375×548 今晚來客：裁到 minH 再降倍率', m);
  eq(F(reward, at(664, 260)), { y: 44, h: 278, dev: null }, '390×664 reward');
  eq(F(dip.cameras.strip, at(548, 0)), { y: 228, h: 90, dev: null }, 'strip 沒有裁切規則');
  for (const vh of [480, 520, 548, 600, 640, 664, 700, 844]) for (const pm of [130, 150, 200, 260]) for (const w of [360, 375, 390]) {
    const r = F(full, at(vh, pm, w));
    ok(r.y + r.h === 322 && r.h >= full.minH, 'full ' + w + '×' + vh + '/' + pm + ' 唱盤區與腳都在', r);
  }
  eq(lib.Stage.pickCamera('strip', dip.cameras, 548), 'stripS', '548 高自動換 stripS');
  eq(lib.Stage.pickCamera('strip', dip.cameras, 664), 'strip', '664 高用 strip');
  eq(lib.Stage.pickCamera('full', dip.cameras, 400), 'full', 'full 不換');
});

section('像素字與標籤放得下（斜俯視 3×5 字）', () => {
  const P = DS.OPainter({ ctx: null, k: 1, cx: 0, cy: 0, meas: null });
  eq(P.pwidth('NOISE'), 20, 'NOISE 20 格（N 用 4 格寬，不會讀成 MOISE）');
  eq(P.pwidth('JAZZ'), 15, 'JAZZ 15 格');
  for (const c of dip.props.filter(p => p.type === 'binTable' && p.label && !/[^\x00-\x7f]/.test(p.label))) ok(P.pwidth(c.label) + 4 <= c.cols * 13 + 3, c.id + ' 標籤放得進箱子正面', [P.pwidth(c.label), c.cols]);
  for (const ch of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789') ok(DS.O34.FONT[ch], '字 ' + ch);
});

section('比例：人明顯比家具高；耳機掛在桌面高度', () => {
  const r = CS.runChecks(), s = r.stats['dip.json'];
  eq(s.charH, PERSON, '人 48 格');
  for (const c of s.crates) ok(c.h < PERSON * 0.8, c.id + ' 高 ' + c.h + ' < 人的 0.8');
  const ct = propById('counter'); ok(ct.h + ct.d < PERSON, '櫃檯到人的胸口');
  { const d = propById('deck'); ok(d.h + d.d < PERSON, '唱盤台比人矮'); }
  const desk = propById('booth'), hookM = (desk.h - 1) / dip.pxPerM;
  ok(hookM > 0.55 && hookM < 0.9, '耳機掛勾離地 ' + hookM.toFixed(2) + ' m（桌面高度）');
  ok(dip.maxScale >= 1.3, '390 寬 1 格≈1.336 CSS px 不被上限擋住');
});

section('唱盤區幾何（一台，SPEC-v4 §2.3.1、§2.3.4）', () => {
  const D = dip.duel, dk = propById('deck'), OP = DS.O34.PROPS.duelDeck, PO = lib.PropsO;
  eq(Object.keys(D).sort(), ['deck', 'note', 'step'], 'duel 只剩 deck／step／note（deckE、deckP、clash、rug、arc 刪掉）');
  eq(D.deck, [146, 293], 'duel.deck＝[146,293]');
  const c = OP.center(dk);
  ok(Math.abs(c[0] - D.deck[0]) <= 1 && Math.abs(c[1] - D.deck[1]) <= 1, 'duel.deck＝轉盤中心', [c, D.deck]);
  eq(D.step, 10, '贏的人上前 10 格');
  ok(PO.duelDeckGeo && !PO.deckGeo, 'DipPropsO 匯出 duelDeckGeo、不再有 deckGeo');
  ok(!DS.O34.PROPS.deckStand, 'deckStand 刪掉');
  const g = PO.duelDeckGeo(dk);
  ok(g.now[0] >= dk.x && g.now[0] + g.now[2] <= dk.x + dk.w && g.now[1] >= dk.y - dk.h && g.now[1] + g.now[3] <= dk.y, 'NOW 小窗在正面板裡', g.now);
  eq(g.now[2] + 'x' + g.now[3], '14x14', 'NOW 小窗 14×14');
  // 畫得出來：空台、落下、在轉（王牌）、抬到一半；在轉才冒音符
  const T = { ctx: null, k: 1, cx: 0, cy: 0, meas: [1e9, 1e9, -1e9, -1e9], cover: () => null, pool: [] }, P = DS.OPainter(T);
  for (const st of [null, { rec: { attr: 'o', card: 'radiohead-ok-computer', kind: null }, state: 'land', by: 'p' }, { rec: { attr: 'c', card: 'swans-filth', kind: 'ace' }, state: 'spin', by: 'e' }, { rec: { attr: 'h', card: null }, state: 'armMid', by: 'p' }]) {
    const S = { state: { deck: st }, rt: 1.2, t: 1.2, card: id => cards[id] || null };
    T.meas = [1e9, 1e9, -1e9, -1e9]; OP.draw(P, dk, S); const m = T.meas.slice();
    ok(m[2] > m[0] && m[0] >= dk.x - 3 && m[2] <= dk.x + dk.w + 3, '唱盤畫在自己的範圍：' + (st && st.state), m);
    T.meas = [1e9, 1e9, -1e9, -1e9]; OP.glow(P, dk, S); const gm = T.meas.slice();
    ok((gm[2] > gm[0]) === !!(st && st.state === 'spin'), '在轉才冒音符：' + (st && st.state));
  }
  ok(dip.props.some(p => p.type === 'duelfx' && p.layer === 'fx'), '特效層');
});

section('看得到的封面只來自資料（不用 P.poolPick 從全卡池隨機抽，SPEC-v4 §1.6、§2.3.5）', () => {
  const T = { ctx: null, k: 1, cx: 0, cy: 0, meas: [1e9, 1e9, -1e9, -1e9], cover: () => null, pool: Object.keys(cards) }, P0 = DS.OPainter(T), P = Object.create(P0);
  let picks = 0; const covers = new Set();
  P.poolPick = (seed) => { picks++; return P0.poolPick(seed); };
  P.cover = (id, x, y, w, h, o) => { if (id) covers.add(id); return P0.cover(id, x, y, w, h, o); };
  const S = { card: id => cards[id] || null, state: { playing: true, poke: {}, deck: null }, t: 1.3, rt: 1.3, L: dip, layout: dip, W: 292, H: 322, drawOutside() {}, outsideCount() { return 0; } };
  for (const o of dip.props) { const spec = DS.O34.PROPS[o.type]; if (spec && o.type !== 'duelfx') spec.draw(P, o, S); }
  eq(picks, 0, '整家店畫一次，poolPick 一次都沒被叫');
  // 空格不會偷偷補一張：拿掉牆上一格、箱子沒有 front、試聽桌沒有 stack
  const ledge = Object.assign({}, propById('rack-a'), { cards: propById('rack-a').cards.slice(0, 5) }), bin = Object.assign({}, propById('isl-0a'), { front: null }), desk = Object.assign({}, propById('booth'), { stack: null });
  for (const o of [ledge, bin, desk]) DS.O34.PROPS[o.type].draw(P, o, S);
  eq(picks, 0, '空格畫素色封套／空架，不抽卡');
  const seen = [...covers].filter(id => id !== 'caetano-veloso-transa');
  eq(seen.length, 60, '畫出來的固定封面＝資料裡的 60 張（不含櫃檯 NOW）');
});

section('櫃檯 logo（B15，SPEC-v4 §2.3.6）：畫在正面板中央、不蓋到任何可點的東西', () => {
  const PO = lib.PropsO, ct = propById('counter'), OP = DS.O34.PROPS;
  eq(ct.sign, { emblem: 'dip' }, 'dip.json counter.sign＝{emblem:"dip"}（招牌是店家資料）');
  ok(PO && PO.EMBLEM && PO.EMBLEM.dip, '匯出 DipPropsO.EMBLEM.dip');
  const em = PO.EMBLEM.dip;
  eq([em.rows.length, em.rows[0].length], [15, 15], 'B15＝15×15');
  eq(em.pal, { k: '#1d1712', c: '#eee5c6', m: '#756e5e' }, 'B15 三色');
  const S = { card: id => cards[id] || null, state: { playing: true, poke: {} }, t: 1.3, rt: 1.3 };
  // 量外框模式畫一次整個櫃檯；攔下 P.rows（只有招牌用它）記下 logo 實際上色的格子
  const measure = (o) => {
    const T = { ctx: null, k: 1, cx: 0, cy: 0, meas: [1e9, 1e9, -1e9, -1e9], cover: () => null, pool: [] };
    const P0 = DS.OPainter(T), P = Object.create(P0), box = [1e9, 1e9, -1e9, -1e9]; let calls = 0;
    P.rows = (rows, x, y, pal, q) => {
      calls++; q = q || 1;
      rows.forEach((r, j) => { for (let i = 0; i < r.length; i++) if (r[i] !== '.' && r[i] !== ' ') { const X = x + i * q, Y = y + j * q; box[0] = Math.min(box[0], X); box[1] = Math.min(box[1], Y); box[2] = Math.max(box[2], X + q); box[3] = Math.max(box[3], Y + q); } });
      return P0.rows(rows, x, y, pal, q);
    };
    OP.counter.draw(P, o, S);
    return { calls, rect: calls ? [box[0], box[1], box[2] - box[0], box[3] - box[1]] : null, all: T.meas };
  };
  const m = measure(ct), lip = ct.y - ct.h;
  eq(m.calls, 1, '櫃檯畫一次招牌');
  eq(m.rect, [241, 184, 15, 15], 'logo 中心 (248,191)：x＋⌊w/2⌋、lip＋⌊(h−2)/2⌋');
  const panel = [ct.x, lip + 2, ct.w, ct.h - 5];
  const within = (a, b) => a[0] >= b[0] && a[1] >= b[1] && a[0] + a[2] <= b[0] + b[2] && a[1] + a[3] <= b[1] + b[3];
  ok(m.rect && within(m.rect, panel), 'logo 落在正面板 [x, lip+2, w, h−5] 裡', [m.rect, panel]);
  // 不跟任何熱點形狀相交（櫃檯自己的主熱點 counter 除外）：道具子熱點（now、cat、rack:*）、道具主熱點、箱子（bin:<key> ＝ 道具 box）、layout.hotspots（跟著人走的照起始位置）
  const shapes = [];
  for (const o of dip.props) {
    const spec = OP[o.type]; if (!spec) continue;
    if (spec.hots) (spec.hots(o, S) || []).forEach(h => shapes.push([h.id, h.rect]));
    if (o.hot && o.id !== 'counter') shapes.push([o.id, o.hot.rect || spec.box(o)]);
    if (o.bin && spec.box) shapes.push(['bin:' + o.bin.key, spec.box(o)]);
  }
  for (const h of dip.hotspots || []) {
    shapes.push([h.id, h.rect]);
    if (h.follow) { const a = dip.actors.find(x => x.id === h.follow), s = a && dip.spots[a.at]; if (s) shapes.push([h.id + '@' + a.at, [s[0] + h.rel[0], s[1] + h.rel[1], h.rel[2], h.rel[3]]]); }
  }
  const hit = (a, b) => a[0] < b[0] + b[2] && b[0] < a[0] + a[2] && a[1] < b[1] + b[3] && b[1] < a[1] + a[3];
  ok(shapes.length >= 20, '熱點形狀都算進來', shapes.length);
  const over = shapes.filter(([, r]) => m.rect && hit(m.rect, r)).map(([id]) => id);
  eq(over, [], 'logo 外框不蓋到任何可點的東西');
  // 招牌規則：字串＝舊式金框字牌（畫在正面板裡、不用 rows）；null／false／不認得的 emblem＝不畫
  const plain = measure(Object.assign({}, ct, { sign: null }));
  for (const sg of [null, false, undefined, { emblem: 'nope' }]) eq(measure(Object.assign({}, ct, { sign: sg })).calls, 0, '不畫 logo：' + JSON.stringify(sg));
  eq(measure(Object.assign({}, ct, { sign: 'dip' })).rect, [241, 184, 15, 15], '字串 "dip"＝同一個 logo');
  eq(measure(Object.assign({}, ct, { sign: em })).rect, [241, 184, 15, 15], '{pal,rows} 直接給點陣');
  const T2 = { ctx: null, k: 1, cx: 0, cy: 0, meas: [1e9, 1e9, -1e9, -1e9], cover: () => null, pool: [] }, P2 = DS.OPainter(T2);
  PO.counterSign(P2, Object.assign({}, ct, { sign: 'B1' }), ct.x, lip, ct.w, ct.h);
  const pr = [T2.meas[0], T2.meas[1], T2.meas[2] - T2.meas[0], T2.meas[3] - T2.meas[1]];
  ok(within(pr, panel), '字串招牌（別家店）是畫在正面板裡的金框字牌', pr);
  ok(plain.all[2] > plain.all[0], '沒有招牌時櫃檯照樣畫得出來');
  // check-shops 抓得到壞招牌
  const probs = []; const badF = (msg) => probs.push(msg);
  CS.checkSign({ emblem: 'nope' }, 'x', lib, badF);
  CS.checkSign({ pal: { k: '#000' }, rows: ['kk', 'k'] }, 'y', lib, badF);
  CS.checkSign({ pal: { k: '#000' }, rows: ['kz'] }, 'z', lib, badF);
  CS.checkSign({ emblem: 'dip' }, 'ok', lib, badF); CS.checkSign(null, 'ok', lib, badF); CS.checkSign('B1', 'ok', lib, badF);
  ok(probs.some(p => /^x：.*EMBLEM/.test(p)) && probs.some(p => /^y：.*不等長/.test(p)) && probs.some(p => /^z：.*pal 沒有的字元/.test(p)) && !probs.some(p => /^ok/.test(p)), 'check-shops 的招牌檢查', probs);
});

section('index.json 與台北地圖預告', () => {
  eq(index.map, 'shops/taipei.json', 'map');
  eq(index.shops.map(s => s.id + ':' + s.status), ['dip:open', 'basement:debug'], '本店開、地下室只在 debug');
  const pins = taipei.props.filter(p => p.type === 'pin');
  eq(pins.filter(p => !p.locked).map(p => p.id), ['pin-dip'], '只有本店圖釘開著');
  ok(pins.filter(p => p.locked).every(p => p.hot.label === '？？？（還沒開）' && p.hot.action === 'locked'), '其他圖釘：？？？（還沒開）');
  ok(taipei.fictional === true, '地圖是示意');
});

if (process.argv.includes('--routes')) for (const [a, b, len, sec, lim] of routeTimes.filter(r => !(String(r[0]).startsWith('bin:') && String(r[1]).startsWith('bin:')))) console.log('  ' + (a + '→' + b).padEnd(24) + String(len).padStart(4) + ' 格 ' + sec.toFixed(2) + ' s（≤' + lim + '）');
console.log('\n' + pass + ' passed, ' + fail + ' failed');
if (fail) { fails.forEach(f => console.log('  ✗ ' + f)); process.exit(1); }
