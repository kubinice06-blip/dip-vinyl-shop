// game-lab/test/shop.test.mjs — 像素店 layout 與舞台純邏輯的測試。
//   node game-lab/test/shop.test.mjs        # 有失敗 exit 1
// 本店 dip＝斜俯視 3/4（店主選的路線 P2，layout.projection 'oblique34'）：292×322 美術格、人＝16×16 小人 ×3（48 格）。
// 測：check-shops 全綠、schema、熱點（id 唯一、本店該有的都有、牆上唱片、箱子 bin:<key>）、spots（畫布內、門外的人在門洞裡、他左你右、橫條看得到全身）、
//     一台唱盤（SPEC-v4 §2.3.1／§5.1：置中、兩人在兩側、老闆在台後）、走位（繞過家具、每個 spot 從門口與櫃檯都走得到、
//     §2.3.2 路線表：每段不穿家具、1 倍速不超過上限、counter→dig 經過右側走道；navRoute 回 null＝「走不到」）、
//     舊 POS 別名、矮螢幕鏡頭規則（fitCamera 細格子版）、對決鏡頭自動換 stripS、像素字寬度（箱子標籤放得下）、
//     比例（人明顯比箱子桌、櫃檯、唱盤台高；耳機在桌面高度）、唱盤區幾何、櫃檯 logo、index.json 與台北地圖；
//     D §3 沒有任何路線穿過家具腳下範圍（foot，不加邊）；舞台 v4（假 shop、手動推時間）：version、INTERACT、bins()、hold('o')、finish／finishAll、
//     faceTo、floorRecord、一手的時間軸（剋中／v3 呼叫／剋不動／平手搖頭／王牌／減少動態／四倍速）、duelIn 接 route []／null。
import path from 'path';
import fs from 'fs';
import vm from 'vm';
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
  // 後走道對峙站位（§2.3.1 原本 leaving [150,110]、mid [96,112]——站在中島最上排畫出來的範圍裡；FIXLIST 1 移到後走道：後牆矮櫃前緣與中島上緣之間）
  eq([dip.spots.leaving, dip.spots.mid], [[170, 95], [96, 100]], '後走道對峙站位（FIXLIST 1）');
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
  ok(obs.length >= 12, '家具都有腳下範圍（中島 10 箱合成一塊）', obs.length);
  const inside = (p, r) => DS.inObs(p, r);
  const clear = (a, b) => DS.navClear(obs, a, b);
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
  const clear = (a, b) => DS.navClear(obs, a, b);
  // §2.3.5 原文「不擋 door→atdoor→nav[30,100]→nav[72,110]」：FIXLIST 1 之後特價箱的腳下範圍＝畫出來的那一塊（後排唱片頂到 y102），
  // [30,100] 剛好在它上緣，從那裡往右下走會擦過箱子；進店的路改驗 door→atdoor→[72,110]，[30,100] 只要不在家具裡、atdoor 走得到
  const doorPath = [dip.spots.door, dip.spots.atdoor, [72, 110]].map(p => p.slice(0, 2));
  ok(dip.nav.some(q => q[0] === 30 && q[1] === 100) && dip.nav.some(q => q[0] === 72 && q[1] === 110), 'nav 有 [30,100]、[72,110]');
  ok(doorPath.every((p, i) => i === 0 || clear(doorPath[i - 1], p)), '特價箱不擋 door→atdoor→[72,110]（進店的路）');
  ok(!obs.some(o => DS.inObs([30, 100], o)) && clear(dip.spots.atdoor.slice(0, 2), [30, 100]) && clear(dip.spots.door.slice(0, 2), [30, 100]), '[30,100] 不在家具裡、door／atdoor 走得到');
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

// D §3「Add an automated check that no actor route intersects furniture footprints」：任兩個 spot／stand 的路線，逐段對每個站立家具的腳下範圍（不加邊、端點不豁免）
// 腳下範圍＝畫出來的那一塊（FIXLIST 1，DipShop.footprints；中島 10 箱一塊）
section('D §3：沒有任何人的路線穿過家具的腳下範圍（任兩個 spot／bin.stand）', () => {
  const OP = DS.O34.PROPS, feet = CS.footprints(dip, OP);
  const standing = dip.props.filter(o => { const sp = OP[o.type], ly = o.layer || (sp && sp.layer); return sp && !o.hidden && !['wall', 'bg', 'fx'].includes(ly); });
  const covered = standing.map(o => o.id || o.type + '#' + dip.props.indexOf(o)).filter(id => feet.filter(f => f[2].includes(id)).length === 1);
  eq(covered.length, standing.length, '每個站立道具都剛好在一塊腳下範圍裡（' + standing.length + ' 件）');
  for (const id of ['counter', 'deck', 'booth', 'crate-sale', 'crate-noise', 'shelving', 'island', 'backbin']) ok(feet.some(f => f[0] === id), id + ' 算在家具裡');
  ok(['isl-0a', 'isl-0b', 'crate-jazz', 'crate-tw'].every(id => feet.find(f => f[0] === 'island')[2].includes(id)), '中島（含最上排 isl-0a／isl-0b）一塊');
  const obs = DS.navObstacles(dip), pts = Object.entries(dip.spots).filter(([, s]) => !s[2]).map(([k, s]) => [k, s.slice(0, 2)])
    .concat(dip.props.filter(p => p.bin).map(p => ['bin:' + p.bin.key, p.bin.stand]));
  let n = 0; const bad = [];
  for (const [ka, a] of pts) for (const [kb, b] of pts) {
    if (ka === kb) continue; n++;
    const r = CS.routeOf(DS, dip, a, b, obs); if (!r) { bad.push('走不到 ' + ka + '→' + kb); continue; }
    const h = CS.routeHitsFeet(DS, r.pts, feet); if (h) bad.push(ka + '→' + kb + ' 穿過 ' + h.id);
  }
  ok(n >= 1400, '路線數 ' + n);
  eq(bad, [], '沒有路線穿過家具腳下範圍');
  // 抓得到：手畫一條穿過櫃檯的路；把 navMargin 縮成負的（navRoute 以為直線走得過去）
  ok(CS.routeHitsFeet(DS, [[200, 200], [290, 200]], feet) && CS.routeHitsFeet(DS, [[200, 200], [290, 200]], feet).id === 'counter', '穿過櫃檯抓得到');
  const b3 = JSON.parse(JSON.stringify(dip)); b3.navMargin = [-40, -40];
  const r3 = CS.checkLayout(b3, 'shops/dip.json', lib, cards, content);
  ok(r3.problems.some(p => /穿過 .* 的腳下範圍/.test(p)), 'navRoute 自己放水時，腳下範圍檢查照樣抓得到', r3.problems.slice(0, 3));
  // 站立道具沒有 foot＝抓得到
  const probs = []; CS.footprints({ props: [{ type: 'noFoot', id: 'x' }] }, { noFoot: { draw() {} } }, m => probs.push(m));
  ok(probs.some(p => /沒有 foot/.test(p)), '站立道具沒有 foot 抓得到', probs);
});

// FIXLIST 1（店主：「不要跨過中島唱片區」）：腳下範圍＝道具實際畫出來的那一塊。這裡用自己的假畫布重新量（不用 shop.js 的 drawnExtent），
// 驗 DipShop.footprints 真的把畫出來的箱身、唱片、標籤都包進去；中島一塊；往後走道的路線先走旁邊的走道、再沿後走道橫移，不斜切中島
function maskOfProp(o) {
  const [W, H] = dip.size, M = new Uint8Array(W * H); let clip = null;
  const ctx = { globalAlpha: 1, fillStyle: '#000', font: '7px x', textAlign: 'center', textBaseline: 'middle',
    fillRect(x, y, w, h) {
      if (ctx.globalAlpha < 0.99 || /^rgba\(/.test(String(ctx.fillStyle))) return;   // 影子、光、反光
      let x0 = x, y0 = y, x1 = x + w, y1 = y + h; if (clip) { x0 = Math.max(x0, clip[0]); y0 = Math.max(y0, clip[1]); x1 = Math.min(x1, clip[0] + clip[2]); y1 = Math.min(y1, clip[1] + clip[3]); }
      for (let yy = Math.max(0, y0); yy < Math.min(H, y1); yy++) for (let xx = Math.max(0, x0); xx < Math.min(W, x1); xx++) M[yy * W + xx] = 1;
    },
    fillText(t, x, y) { const sz = parseFloat(/([\d.]+)px/.exec(ctx.font)[1]); ctx.fillRect(Math.round(x - String(t).length * sz / 2), Math.round(y - sz / 2), Math.round(String(t).length * sz), Math.round(sz)); },
    measureText: t => ({ width: String(t).length * 7 }), drawImage() {}, save() {}, restore() { clip = null; }, beginPath() {}, rect(x, y, w, h) { clip = [x, y, w, h]; }, clip() {} };
  DS.O34.PROPS[o.type].draw(DS.OPainter({ ctx, k: 1, cx: 0, cy: 0, meas: null, cover: () => null, used: {}, pool: [] }), o, { L: dip, layout: dip, state: {}, t: 0, rt: 0, card: () => null });
  // 只留「連續 ≥3 格」的像素（1–2 格寬的細柱：鉻管、燈桿、線不算，跟 shop.js 同一條規則；這裡只用來挑像素，上緣由 footprints 自己量）
  const out = [];
  for (let y = 0; y < H; y++) { let run = 0; for (let x = 0; x <= W; x++) { if (x < W && M[y * W + x]) { run++; continue; } if (run >= 3) for (let k = x - run; k < x; k++) out.push([k, y]); run = 0; } }
  return out;
}
section('FIXLIST 1：腳下範圍＝畫出來的那一塊（中島一塊含最上排），往後走道走旁邊的走道、不斜切中島', () => {
  const feet = DS.footprints(dip), F = id => feet.find(f => f.id === id), P = id => propById(id);
  const isl = F('island');
  ok(isl && isl.props.length === 10 && isl.gap <= 2, '中島 10 箱合成一塊（縫 ≤2 格）', isl && [isl.props.length, isl.gap]);
  // 每件道具畫出來的（寬 ≥3 格的）每一格都在它的腳下範圍裡（格子中心嚴格在多邊形內）
  const own = { counter: 'counter', deck: 'deck', backbin: 'backbin', booth: 'booth', 'crate-sale': 'crate-sale', 'crate-noise': 'crate-noise', shelving: 'shelving' };
  for (const o of dip.props) if (/^isl-|^crate-(jazz|tw)$/.test(o.id || '')) own[o.id] = 'island';
  for (const [id, fid] of Object.entries(own)) {
    const o = P(id), f = F(fid), px = maskOfProp(o), wb = (dip.footprints.walkBehind || []).includes(id), fy = o.y - o.d;
    const miss = px.filter(([x, y]) => (!wb || y >= fy) && !DS.inPoly([x + 0.5, y + 0.5], f.poly));
    ok(px.length > 50 && miss.length === 0, id + '：畫出來的每一格都在腳下範圍（' + fid + '）裡' + (wb ? '（walkBehind：地面那塊以前）' : ''), miss.slice(0, 4));
    if (wb) { const xs = px.map(p => p[0]); ok(f.box[0] <= Math.min(...xs) && f.box[0] + f.box[2] >= Math.max(...xs) + 1 && f.box[1] <= fy, id + '：左右照畫出來的、上緣不晚於地面那塊', [f.box, Math.min(...xs), Math.max(...xs)]); }
  }
  // 中島最上排（R&B／OST）畫出來的上緣：箱身與唱片 y≈104–106；腳下範圍從那裡起算（原本的 foot 只從 y128 起＝店主看到的「走在箱子上」）
  ok(isl.box[1] <= 106 && isl.box[0] <= 97 && isl.box[0] + isl.box[2] >= 185 && isl.box[1] + isl.box[3] >= 262, '中島腳下範圍 x 97–185、y ≤106–262', isl.box);
  // 後走道：後牆矮櫃（民謠）與窗下矮櫃前緣以後、中島上緣以前；mid、leaving 站在這裡（不被中島擋住腳）
  const backY = Math.max(F('backbin').box[1] + F('backbin').box[3], feet.find(f => f.props[0].startsWith('lowShelf')).box[1] + feet.find(f => f.props[0].startsWith('lowShelf')).box[3]);
  const islTop = isl.box[1];
  for (const k of ['mid', 'leaving']) { const s0 = dip.spots[k]; ok(s0[1] > backY && s0[1] < islTop && !feet.some(f => DS.inPoly(s0, f.poly)), k + ' 站在後走道（y ' + backY + '–' + islTop + '）', s0); }
  // 路線：counter→mid、pay→leaving 走右側走道上到後走道再橫移；mid→ref、atdoor→duelE 走左側走道；sale→pay、browse→sale、leaving→duelP 也不碰中島的外框
  const obs = DS.navObstacles(dip), S0 = k => dip.spots[k].slice(0, 2), ib = isl.box;
  const inBox = (p) => p[0] > ib[0] && p[0] < ib[0] + ib[2] && p[1] > ib[1] && p[1] < ib[1] + ib[3];
  const crossBox = (pts) => pts.some((p, i) => i > 0 && (DS.segHitsRect(pts[i - 1], p, ib) || inBox(p)));
  const rightAisle = p => p[0] >= ib[0] + ib[2] && p[0] <= P('counter').x && p[1] >= islTop - 6;
  const leftAisle = p => p[0] <= ib[0] && p[0] >= 53 && p[1] >= islTop - 6;
  const corridor = p => p[1] > backY && p[1] < islTop;
  for (const [a, b, need] of [['counter', 'mid', 'R'], ['pay', 'leaving', 'R'], ['leaving', 'duelP', 'R'], ['mid', 'ref', 'L'], ['atdoor', 'duelE', 'L'], ['sale', 'pay', ''], ['browse', 'sale', ''], ['duelE', 'door', 'L']]) {
    const r = CS.routeOf(DS, dip, S0(a), S0(b), obs); if (!r) { ok(false, '走不到 ' + a + '→' + b); continue; }
    ok(!crossBox(r.pts), a + '→' + b + ' 不碰中島的外框（不斜切中島）', r.pts);
    if (need === 'R') ok(r.pts.some(rightAisle) && r.pts.some(corridor), a + '→' + b + ' 經過右側走道與後走道', r.pts);
    if (need === 'L') ok(r.pts.some(leftAisle), a + '→' + b + ' 經過左側走道', r.pts);
  }
  // 抓得到：舊站位（站在最上排箱子畫出來的範圍裡）、舊路點 [146,110]、舊路線 sale→pay 那一段 [90,124]→[192,124]、拿掉 walkBehind（老闆站進櫃檯裡）、walkBehind 放在箱子上、群組有不存在的 id
  const bad1 = JSON.parse(JSON.stringify(dip)); bad1.spots.leaving = [150, 110]; bad1.spots.mid = [96, 112]; bad1.nav.push([146, 110]);
  const r1 = CS.checkLayout(bad1, 'shops/dip.json', lib, cards, content).problems;
  ok(r1.some(p => /spots\.leaving 站在家具裡 island/.test(p)) && r1.some(p => /spots\.mid 站在家具裡 island/.test(p)) && r1.some(p => /nav\[\d+\] 在家具裡 \[146,110\]/.test(p)), '抓得到 A2 的舊站位與舊路點（站在中島最上排）', r1.slice(0, 4));
  const h1 = CS.routeHitsFeet(DS, [[90, 124], [192, 124]], CS.footprints(dip, DS.O34.PROPS));
  ok(h1 && h1.id === 'island', '抓得到 A2 路線圖 13（sale→pay）那一段 [90,124]→[192,124] 穿過中島', h1);
  ok(!CS.routeHitsFeet(DS, [[90, 124], [192, 124]], dip.props.filter(o => /^isl-/.test(o.id)).map(o => [o.id, DS.O34.PROPS.binTable.foot(o)])), '（對照：舊的 foot 只框地面那塊，這一段抓不到）');
  const bad2 = JSON.parse(JSON.stringify(dip)); bad2.footprints.walkBehind = ['deck', 'isl-0a']; bad2.footprints.margin = { island: [8, 2], nope: [1, 1], booth: [3] }; bad2.footprints.groups.island = bad2.footprints.groups.island.filter(i => i !== 'isl-0a').concat(['nope']);
  const r2 = CS.checkLayout(bad2, 'shops/dip.json', lib, cards, content).problems;
  ok(r2.some(p => /spots\.counter 站在家具裡 counter/.test(p)), '拿掉櫃檯的 walkBehind：老闆的站位在櫃檯畫出來的範圍裡 → 抓得到', r2.slice(0, 3));
  ok(r2.some(p => /walkBehind：isl-0a.*不是櫃檯或唱盤台/.test(p)) && r2.some(p => /groups\.island：沒有道具 nope/.test(p)), '抓得到 walkBehind 放在箱子上、群組有不存在的 id', r2.slice(0, 5));
  ok(r2.some(p => /footprints\.margin：沒有這一塊 nope/.test(p)) && r2.some(p => /footprints\.margin\.booth 要是/.test(p)), '抓得到壞的 footprints.margin', r2.slice(0, 8));
  // 中島兩側走道多留 3 格（footprints.margin.island）：避障框比腳下範圍左右各多 8 格
  const oIsl = DS.navObstacles(dip).find(o => o.id === 'island');
  eq([oIsl.box[0], oIsl.box[0] + oIsl.box[2]], [isl.box[0] - 8, isl.box[0] + isl.box[2] + 8], '中島的避障框左右各多 8 格（footprints.margin.island）');
});

// ---------- 舞台（stage.js v4）的純邏輯：假 shop 記下每個呼叫，手動推時間（SPEC-v4 §2.3.2、§2.3.3、§2.3.8、§5.1 A2）
function fakeShop(L) {
  const actors = {}, log = []; let ticks = [], rt = 0;
  const A = id => actors[id] || (actors[id] = { x: 0, y: 0, hidden: true, look: false, hold: null, arm: null, flip: false, ox: 0, pose: null, res: null });
  const spot = k => Array.isArray(k) ? { x: k[0], y: k[1] } : L.spots[k] ? { x: L.spots[k][0], y: L.spots[k][1], outside: !!L.spots[k][2] } : null;
  const api = {
    state: {}, layout: L, routeImpl: () => [],
    face() { return api; }, sprite(id) { A(id).look = true; return api; }, allow() { return api; }, sparkle() { return api; },
    view() { return { y: 0, h: L.size[1], x: 0, w: L.size[0], scale: 390 / 292, dev: 4, baseDev: 4, dpr: 3 }; },
    tweenView() { return Promise.resolve(); }, setView() { return api; },
    put(id, k) { const a = A(id), p = spot(k); if (p) { a.x = p.x; a.y = p.y; a.outside = p.outside; a.hidden = false; if (a.res) { const r = a.res; a.res = null; r(); } } log.push(['put', id, k]); return api; },
    walk(id, keys, sp) { const a = A(id); a.hidden = false; log.push(['walk', id, keys, sp]); return new Promise(res => { a.res = res; }); },
    route(from, to) { log.push(['route', from, to]); return api.routeImpl(from, to); },
    pos(id) { const a = actors[id]; return a ? { x: a.x, y: a.y, outside: a.outside, hidden: a.hidden } : null; },
    has(id) { const a = actors[id]; return !!(a && !a.hidden && a.look); },
    hold(id, w) { A(id).hold = w || null; log.push(['hold', id, w || null]); return api; },
    arm(id, k) { A(id).arm = k || null; return api; },
    flip(id, on) { A(id).flip = !!on; log.push(['flip', id, !!on]); return api; },
    nudge(id, dx) { A(id).ox = dx || 0; return api; },
    pose(id, n) { A(id).pose = n || null; log.push(['pose', id, n || null]); return api; },
    float(id, t) { log.push(['float', id, t]); return null; },
    handAt(id) { const a = A(id); return [a.x + (a.flip ? -6 : 6), a.y - 20]; },
    headY(id) { return A(id).y - 45; },
    hostCss(x, y) { return { x: x * 390 / 292, y: y * 390 / 292 }; },
    onTick(fn) { ticks.push(fn); return () => { ticks = ticks.filter(f => f !== fn); }; },
    now() { return rt; },
    fast() { return api; }, untag(id) { log.push(['untag', id]); return api; }, tag(id, t) { log.push(['tag', id, t]); return {}; },
    say() { return null; }, emote() { return api; }, render() {}, hotspots() { return []; }, highlight() { return api; }, destroy() {}, dim() { return api; }, play() { return api; },
    step(ms) { rt += ms / 1000; ticks.slice().forEach(f => f(rt)); }
  };
  return { api, actors, log };
}
async function loadStage(F) {
  const flush = () => new Promise(r => setImmediate(r));
  const sw = { location: { search: '', href: 'http://localhost/game-lab/' }, innerHeight: 664, addEventListener() {}, removeEventListener() {}, matchMedia: () => ({ matches: false }),
    DipShop: { mount: () => F.api, O34: DS.O34 }, DipLabCards: cards };
  const sb = { window: sw, document: {}, location: sw.location, URLSearchParams, console, Promise, JSON, Object, Array, String, RegExp, Math, setTimeout, clearTimeout };
  vm.createContext(sb);
  vm.runInContext(fs.readFileSync(path.join(LAB, 'stage.js'), 'utf8'), sb, { filename: 'stage.js' });
  const sfx = [];
  const st = await sw.DipLabStage.mount({}, { layout: JSON.parse(JSON.stringify(dip)), cards, sfx: (n, o) => sfx.push([n, o ? JSON.parse(JSON.stringify(o)) : null, F.api.now()]) });
  // 推時間：每 20 ms 一格，每格之後把 Promise 的回呼跑完；at[t]＝那一格之後要做的事
  const run = async (ms, at = {}) => { let t = 0; const ks = Object.keys(at).map(Number).sort((a, b) => a - b); while (t < ms) { F.api.step(20); t += 20; await flush(); while (ks.length && ks[0] <= t) at[ks.shift()](t); } };
  return { st, sw, sfx, run, flush };
}
const asections = [];
function asection(name, fn) { asections.push([name, fn]); }

asection('舞台 v4：version、INTERACT、bins()、hold(\'o\')、finish、faceTo、floorRecord', async () => {
  const F = fakeShop(dip), { st, sw, run, flush } = await loadStage(F);
  eq([sw.DipLabStage.version, st.version], ['4.0', '4.0'], 'DipLabStage.version＝stage.version＝4.0');
  const I = sw.DipLabStage.INTERACT;
  eq([I.scene, I.duel, I.reward].map(x => JSON.stringify(x)), [JSON.stringify(['rack:*', 'now', 'bin:*']), JSON.stringify(['rack:*', 'now', 'owner', 'bin:*']), JSON.stringify(['bin:*'])], 'INTERACT scene／duel／reward（§2.3.8）');
  ok(I.title === null && I.map === null, 'title／map 照舊全開');
  const bins = st.bins();
  eq(bins.length, 13, 'bins() 13 箱（含特價箱）');
  eq(bins.map(b => b.hotId), dip.props.filter(p => p.bin).map(p => 'bin:' + p.bin.key), 'hotId＝bin:<key>');
  ok(bins.every(b => { const p = propById(b.propId); return p && p.bin.label === b.label && JSON.stringify(p.bin.stand) === JSON.stringify(b.stand); }), 'label／stand／propId 照 layout');
  // hold('o')：老闆手上有那張、arm show；不呼叫 setFlips、不記進 TT.held（§2.3.2、§5.1 A2）
  st.put('f', 'duelE', 'e0'); st.put('p', 'duelP'); st.put('o', 'ref');
  st.hold('e', { back: true });
  const held0 = st.clashState().held, n0 = F.log.length;
  st.hold('o', { sleeve: 'swans-filth' });
  eq(F.actors.o.hold, { sleeve: 'swans-filth' }, 'hold(\'o\')：shop 的老闆手上有那張');
  eq(F.actors.o.arm, 'show', 'hold(\'o\')：arm show');
  eq(st.clashState().held, held0, 'hold(\'o\')：TT.held 不變');
  ok(!F.log.slice(n0).some(x => x[0] === 'flip' || (x[0] === 'hold' && x[1] !== 'o')), 'hold(\'o\')：不動 p／f 的翻面與手', F.log.slice(n0));
  eq(F.actors.p.hold, null, 'hold(\'o\') 不會給到玩家（v3 sid() 把 o 當 p 的 bug）');
  st.hold('o', null); ok(F.actors.o.hold === null && F.actors.o.arm === null, 'hold(\'o\', null) 收起');
  st.hold('p', { sleeve: 'radiohead-ok-computer' });
  eq(st.clashState().held, { f: { back: true }, p: { sleeve: 'radiohead-ok-computer' } }, 'hold(\'e\'／\'p\') 記進 TT.held');
  // finish／finishAll：正在走的那段直接放到終點、resolve 那個 walk、姿勢回 null
  let done = 0; st.walk('o', ['dig1'], 54).then(() => done++);
  st.walk('p', ['browse']).then(() => done++); st.walk('f', ['visit']).then(() => done++);
  await flush(); eq(done, 0, '還在走');
  st.finish('o'); await flush();
  eq([F.actors.o.x, F.actors.o.y, done, F.actors.o.pose], [dip.spots.dig1[0], dip.spots.dig1[1], 1, null], 'finish(o)：放到 dig1、walk resolve、姿勢 null');
  st.finishAll(); await flush();
  eq([done, F.actors.p.x, F.actors.f.x], [3, dip.spots.browse[0], dip.spots.visit[0]], 'finishAll：p、f 也到終點');
  const nPut = F.log.filter(x => x[0] === 'put').length; st.finish('o'); st.finishAll();
  eq(F.log.filter(x => x[0] === 'put').length, nPut, '走完了再 finish 不會再 put');
  // faceTo：依兩人 x 翻面
  st.put('f', 'duelE'); st.put('p', 'duelP');
  st.faceTo('p', 'f'); eq(F.actors.p.flip, true, 'faceTo(p, f)：你在右、面向左');
  st.faceTo('f', 'p'); eq(F.actors.f.flip, false, 'faceTo(f, p)：他在左、面向右');
  st.faceTo('o', [10, 100]); eq(F.actors.o.flip, true, 'faceTo(o, [x,y])');
  // floorRecord：地上平躺的唱片，直到 floorRecord(null)
  st.floorRecord('duelE', { attr: 'o', card: 'swans-filth' }); await run(40);
  ok((F.api.state.fx.discs || []).some(d => d.flat && d.x === dip.spots.duelE[0] && d.y === dip.spots.duelE[1] && d.attr === 'o'), 'floorRecord(duelE)：地上一張冷門唱片', F.api.state.fx);
  await run(3000);
  ok(F.api.state.fx.discs.some(d => d.flat), 'floorRecord 一直留著（不像 flatDisc 會消失）');
  st.floorRecord(null); await run(40);
  ok(!F.api.state.fx.discs.some(d => d.flat), 'floorRecord(null) 收掉');
});

asection('舞台 v4：一手的時間軸 roundItem（剋中、v3 呼叫、平手搖頭、減少動態、四倍速）', async () => {
  const pc = 'radiohead-ok-computer', ec = 'swans-filth';
  const setup = async () => { const F = fakeShop(dip), S = await loadStage(F); S.st.put('f', 'duelE', 'e0'); S.st.put('p', 'duelP'); S.st.put('o', 'ref'); S.st.tag('f', '男子', 'e', 'T'); S.st.tag('p', '你', 'p', 'T'); return Object.assign(S, { F }); };
  // ---- 剋中（你冷 4 剋他經 5 → counter 4）
  {
    const { st, F, sfx, run } = await setup(), snap = {}; let resolved = null, hit = [], land = [];
    st.clash({ kind: 'counter', blocked: null, by: 'p', toE: 4, toP: 0, p: { attr: 'o', star: 4, card: pc, ace: false }, e: { attr: 'c', star: 5, card: ec, ace: false }, onHit: s => hit.push([s, F.api.now()]), onLand: (s, c) => land.push([s, c]) })
      .then(() => { resolved = Math.round(F.api.now() * 1000); });
    const take = t => () => { snap[t] = { cs: st.clashState(), f: JSON.parse(JSON.stringify(F.actors.f)), p: JSON.parse(JSON.stringify(F.actors.p)), o: JSON.parse(JSON.stringify(F.actors.o)), deck: F.api.state.deck ? JSON.parse(JSON.stringify(F.api.state.deck)) : null, fx: JSON.parse(JSON.stringify(F.api.state.fx)) }; };
    await run(1900, { 100: take(100), 300: take(300), 520: take(520), 600: take(600), 1000: take(1000), 1500: take(1500), 1880: take(1880) });
    eq(snap[100].f.hold && snap[100].f.hold.back, true, 't=100：他舉起封套、背面朝外');
    eq(snap[100].p.hold && snap[100].p.hold.sleeve, pc, 't=100：你舉起自己那張');
    eq([snap[100].p.arm, snap[100].f.arm], ['wind', 'wind'], 't=100：兩人 arm wind');
    eq(snap[100].cs.badges, { e: null, p: null }, 't=100：還沒有方塊');
    ok(!snap[300].f.hold.back && snap[300].f.hold.sleeve === ec, 't=300：他翻面了');
    eq([snap[300].cs.badges.p.attr, snap[300].cs.badges.p.star, snap[300].cs.badges.e.attr, snap[300].cs.badges.e.star], ['o', 4, 'c', 5], 't=300：頭頂方塊 冷 4／經 5');
    ok(F.log.some(x => x[0] === 'untag' && x[1] === 'f') && F.log.some(x => x[0] === 'untag' && x[1] === 'p'), '方塊出現時名牌暫時收起');
    ok(sfx.some(x => x[0] === 'flip'), '翻面有聲音');
    ok(/zap/.test(snap[520].cs.badges.p.fx) && snap[520].fx.sparks.length > 0, 't=520：火花從贏家方塊射出（贏家方塊發亮）');
    eq(hit.map(x => x[0]), ['e'], 'onHit(e) 一次');
    ok(hit[0][1] * 1000 >= 559 && hit[0][1] * 1000 <= 581, 'onHit 在 560', hit);
    ok(F.log.some(x => x[0] === 'float' && x[1] === 'f' && x[2] === '−4'), '他頭上 −4');
    ok(F.log.some(x => x[0] === 'pose' && x[1] === 'f' && x[2] === 'hurt'), '輸家 hurt');
    ok(snap[600].p.ox < 0 && snap[600].p.ox >= -10, 't=600：贏家（你）往唱盤上前（向左）', snap[600].p.ox);
    eq(snap[1000].deck && [snap[1000].deck.state, snap[1000].deck.by, snap[1000].deck.rec.attr, snap[1000].deck.rec.card], ['spin', 'p', 'o', pc], 't=1000：唱片在轉、贏家的封面（NOW 小窗讀這張）');
    eq(snap[1000].f.hold, null, 't=1000：輸家已放下封套');
    eq(snap[1000].p.ox, -10, 't=1000：贏家站在唱盤前 10 格');
    ok(snap[1000].fx.flag && snap[1000].fx.flag.side === 'p' && snap[1000].o.arm === 'flag', 't=1000：老闆朝你舉旗');
    const needle = sfx.find(x => x[0] === 'needle'), chime = sfx.find(x => x[0] === 'chime');
    ok(needle && Math.abs(needle[2] * 1000 - 960) <= 20, '960 落針', needle);
    ok(chime && Math.abs(chime[2] * 1000 - 980) <= 20 && chime[1] && chime[1].attr === 'o', '980 屬性短音 chime {attr:o}（opts 有傳下去）', chime);
    eq(land, [['p', pc]], 'onLand(p, 卡) 一次');
    ok(resolved >= 1460 && resolved <= 1480, '1460 resolve', resolved);
    eq(snap[1500].cs.badges, { e: null, p: null }, '1460 之後方塊收起');
    ok(F.log.filter(x => x[0] === 'tag' && x[1] === 'f').length >= 2, '方塊收起時名牌還原');
    eq(snap[1500].p.ox, 0, '1400 贏家退回原位');
    eq(snap[1880].cs.items, 0, '1800 演完');
    ok(snap[1880].deck && snap[1880].deck.state === 'spin', '唱片一直轉到下一手 clearClash');
    st.clearClash(); await run(200);
    eq([st.clashState().deck, F.api.state.deck], [null, null], 'clearClash：抬針閃兩下後台上空了');
  }
  // ---- v3 呼叫（沒有 star／blocked／by）：方塊星數退回卡片那軸、by 從屬性推
  {
    const { st, F, run } = await setup(); let snap = null;
    st.clash({ kind: 'countered', toE: 0, toP: 3, p: { attr: 'c', card: pc }, e: { attr: 'o', card: ec } });
    await run(400, { 300: () => { snap = st.clashState(); } });
    eq([snap.badges.p.star, snap.badges.e.star], [cards[pc].c, cards[ec].o], 'v3 呼叫：星數＝卡片那軸（' + cards[pc].c + '／' + cards[ec].o + '）');
    await run(700);
    eq(F.api.state.deck && F.api.state.deck.by, 'e', 'countered：他的唱片上台');
  }
  // ---- 剋不動（blocked）：防守方方塊一圈白環；比星由大的贏
  {
    const { st, run } = await setup(); let snap = null;
    st.clash({ kind: 'mirrorLose', blocked: 'gap', by: 'p', toE: 0, toP: 2, p: { attr: 'o', star: 3, card: pc }, e: { attr: 'c', star: 5, card: ec } });
    await run(560, { 500: () => { snap = st.clashState(); } });
    ok(/ring/.test(snap.badges.e.fx) && !/ring/.test(snap.badges.p.fx), 'blocked：防守方（他）方塊一圈白環', snap.badges);
  }
  // ---- 平手：空盤、老闆左右翻面 6 次回到原本朝向、不舉旗、960 中性短音
  {
    const { st, F, sfx, run } = await setup(); let deck1000 = 'x', arm1000 = null; const sway = [];
    const n0 = F.log.length;
    st.clash({ kind: 'tie', toE: 0, toP: 0, p: { attr: 'c', star: 4, card: pc }, e: { attr: 'c', star: 4, card: ec } });
    await run(1900, { 1000: () => { deck1000 = F.api.state.deck; arm1000 = F.actors.o.arm; }, 660: () => sway.push(F.actors.o.ox), 780: () => sway.push(F.actors.o.ox), 1500: () => sway.push(F.actors.o.ox) });
    eq(sway, [-2, 2, 0], '平手：老闆跟著翻面左右晃 2 格（對稱的小人光翻面看不出來），結束回原位');
    eq(deck1000, null, '平手：台上空著');
    ok(arm1000 !== 'flag', '平手：不舉旗');
    const oflips = F.log.slice(n0).filter(x => x[0] === 'flip' && x[1] === 'o').map(x => x[2]);
    let changes = 0; for (let i = 0, prev = false; i < oflips.length; prev = oflips[i], i++) if (oflips[i] !== prev) changes++;
    eq(changes, 6, '平手：老闆從原本朝向左右翻面 6 次（三個來回）', oflips.join(','));
    eq(F.actors.o.flip, false, '平手：最後回到原本朝向');
    ok(!sfx.some(x => x[0] === 'needle'), '平手：不落針');
    const c0 = sfx.filter(x => x[0] === 'chime');
    ok(c0.length === 1 && c0[0][1] && c0[0][1].attr === null && Math.abs(c0[0][2] * 1000 - 960) <= 20, '平手：960 中性短音 chime {attr:null}', c0);
  }
  // ---- 王牌：台上唱片金色標籤（rec.kind ace）、方塊 ace
  {
    const { st, F, run } = await setup(); let snap = null;
    st.clash({ kind: 'counter', by: null, blocked: null, toE: 7, toP: 0, p: { attr: 'h', star: 7, card: pc, ace: true }, e: { attr: 'h', star: 2, card: ec } });
    await run(1000, { 300: () => { snap = st.clashState(); } });
    ok(snap.badges.p.ace && snap.badges.p.star === 7, '王牌方塊：ace、7');
    eq(F.api.state.deck && F.api.state.deck.rec.kind, 'ace', '王牌：台上唱片 kind ace');
  }
  // ---- 減少動態：不舉、不翻；560 resolve；方塊、唱片直接在轉、舉旗
  {
    const { st, F, run } = await setup(); let resolved = null, snap = null;
    st.clash({ kind: 'counter', by: 'p', toE: 4, toP: 0, reduced: true, p: { attr: 'o', star: 4, card: pc }, e: { attr: 'c', star: 5, card: ec } }).then(() => { resolved = Math.round(F.api.now() * 1000); });
    await run(700, { 300: () => { snap = { f: F.actors.f.hold, b: st.clashState().badges }; }, 600: () => { snap.d = F.api.state.deck; snap.fl = F.api.state.fx.flag; } });
    eq([snap.f, snap.b.p], [null, null], '減少動態：300 沒舉封套、沒方塊');
    ok(resolved >= 560 && resolved <= 580, '減少動態：560 resolve', resolved);
    ok(snap.d && snap.d.state === 'spin' && snap.fl, '減少動態：唱片直接在轉、舉旗');
  }
  // ---- 四倍速：1460 ÷ 4
  {
    const { st, F, run } = await setup(); let resolved = null;
    st.clash({ kind: 'counter', by: 'p', toE: 4, toP: 0, speed: 4, p: { attr: 'o', star: 4, card: pc }, e: { attr: 'c', star: 5, card: ec } }).then(() => { resolved = Math.round(F.api.now() * 1000); });
    await run(500);
    ok(resolved >= 365 && resolved <= 385, '四倍速：365 ms resolve', resolved);
  }
});

asection('舞台 v4：duelIn 在 shop.route 回 []／null 時不丟錯、照常走（SPEC-v4 §2.4.5）', async () => {
  for (const rv of [[], null]) {
    const F = fakeShop(dip), { st, flush } = await loadStage(F);
    F.api.routeImpl = () => rv;
    st.put('f', 'mid', 'e0'); st.put('p', 'leaving'); st.put('o', 'counter', 'owner');
    let err = null; const pr = st.duelIn({ ms: 600 }).catch(e => { err = e; });
    await flush();
    const walks = F.log.filter(x => x[0] === 'walk');
    eq(walks.map(x => x[1] + '→' + x[2].join(',')).sort(), ['f→duelE', 'o→ref', 'p→duelP'], 'route 回 ' + JSON.stringify(rv) + '：三個人照常 walk');
    ok(walks.every(x => x[3] > 0 && isFinite(x[3])), '速度用直線距離估（有限、> 0）', walks.map(x => x[3]));
    st.finishAll(); ['f', 'p', 'o'].forEach(id => { const a = F.actors[id]; if (a.res) { const r = a.res; a.res = null; r(); } });
    await pr; await flush();
    eq(err, null, 'duelIn 不丟錯');
  }
});

section('index.json 與台北地圖預告', () => {
  eq(index.map, 'shops/taipei.json', 'map');
  eq(index.shops.map(s => s.id + ':' + s.status), ['dip:open', 'basement:debug'], '本店開、地下室只在 debug');
  const pins = taipei.props.filter(p => p.type === 'pin');
  eq(pins.filter(p => !p.locked).map(p => p.id), ['pin-dip'], '只有本店圖釘開著');
  ok(pins.filter(p => p.locked).every(p => p.hot.label === '？？？（還沒開）' && p.hot.action === 'locked'), '其他圖釘：？？？（還沒開）');
  ok(taipei.fictional === true, '地圖是示意');
});

for (const [name, fn] of asections) { const f0 = fail; try { await fn(); } catch (e) { fail++; fails.push(name + ' threw: ' + (e.stack || e)); } console.log((fail === f0 ? 'ok  ' : 'FAIL') + ' ' + name); }

if (process.argv.includes('--routes')) for (const [a, b, len, sec, lim] of routeTimes.filter(r => !(String(r[0]).startsWith('bin:') && String(r[1]).startsWith('bin:')))) console.log('  ' + (a + '→' + b).padEnd(24) + String(len).padStart(4) + ' 格 ' + sec.toFixed(2) + ' s（≤' + lim + '）');
console.log('\n' + pass + ' passed, ' + fail + ' failed');
if (fail) { fails.forEach(f => console.log('  ✗ ' + f)); process.exit(1); }
