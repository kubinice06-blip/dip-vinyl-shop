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
// 活店（SPEC-H §12.2，棒 1）：LP7 r1 退役（actors 只剩 o、regularNote、spots.regular＝c-pay、bad3 抓 crowd.stops c-pay 站口袋）；LP2 停留點（家具、口袋、離對決者 ≥38×44、熱點吃既有熱點 ≤20）；
//     LP3 路線（via、跨排走上面、y ≤250、主線客人只碰 c-listen、老闆 counter→ref 穿右排三格、不加 via 會掉到 y≈270）；LP4 互斥表；
//     LP6 舞台（假 shop：hold 任何人＝carry、back、addHot、camRect、route、crowdStops／Via／Guest、finishAll 不收走動槽、unmount 清 w1–w3、onTapAny）；
//     LP1／LP5／LP6（真 shop.js 掛假 DOM）：addHot／removeHot／minY／noLabel／結帳壓過櫃檯、聊天泡泡（more、名字行、150／220／260、quote、框內、蓋過半改旁邊、onTapAny、chat ms）、talk 格、carry 朝向、背對時畫在身體後。
//     node game-lab/test/shop.test.mjs --bubbles   # 另外印每個停留點的泡泡放頭頂還是旁邊
import path from 'path';
import fs from 'fs';
import vm from 'vm';
import { fileURLToPath, pathToFileURL } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const LAB = path.resolve(HERE, '..');
const CS = await import(pathToFileURL(path.join(LAB, 'tools/check-shops.mjs')).href);
const CC = await import(pathToFileURL(path.join(LAB, 'tools/check-covers.mjs')).href);

let pass = 0, fail = 0; const fails = [];
function ok(cond, name, info) { if (cond) pass++; else { fail++; fails.push(name + (info !== undefined ? ' :: ' + (typeof info === 'string' ? info : JSON.stringify(info)) : '')); } }
function eq(a, b, name) { const A = JSON.stringify(a), B = JSON.stringify(b); ok(A === B, name, A + ' !== ' + B); }
function section(name, fn) { const f0 = fail; try { fn(); } catch (e) { fail++; fails.push(name + ' threw: ' + (e.stack || e)); } console.log((fail === f0 ? 'ok  ' : 'FAIL') + ' ' + name); }

const lib = CS.loadLib();
const cards = CS.loadCards();
const content = CS.loadContent();
const read = (f) => JSON.parse(fs.readFileSync(path.join(LAB, 'shops', f), 'utf8'));
const dip = read('dip.json'), taipei = read('taipei.json'), basement = read('basement.json'), index = read('index.json'), home = read('home.json');
const DS = lib.DipShop, KS = dip.spriteScale, PERSON = 16 * KS;
const propById = id => dip.props.find(p => p.id === id);
const BINS = CS.loadBins();

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
  // FIXLIST 4／5（X／Y 契約）：前排兩箱 jazz、tw；中島 8＝rock elec soul hiphop citypop classical world folk；左木箱 new；門口牆 feature（靠門）＋picks
  // v5 店面改版（店主 11-13）：門口長櫃拆成 INDIE ROCK／INDIE POP 兩個 4 欄櫃、中島 POP 改 CITY POP、BLUES 搬到窗下矮櫃（winbin，7 欄）
  eq(bins.map(p => p.id + ':' + p.bin.key), ['wall-feature:feature', 'wall-picks:picks', 'backbin-ir:indierock', 'backbin-ip:indiepop', 'winbin:blues', 'isl-0a:rock', 'isl-0b:elec', 'isl-1a:soul', 'isl-1b:hiphop',
    'isl-2a:citypop', 'isl-2b:classical', 'isl-3a:world', 'isl-3b:folk', 'crate-jazz:jazz', 'crate-tw:tw', 'crate-new:new', 'crate-sale:sale'], '十大類（POP 改 CITY POP）＋INDIE ROCK／INDIE POP＋TW＋NEW＋門口牆兩區＋特價箱，位置照契約');
  eq(bins.map(p => p.bin.label), ['店長推薦精選', '店長推薦', '獨立搖滾', '獨立流行', '藍調', '搖滾', '電子', '靈魂放克', '嘻哈 R&B', '城市流行', '古典', '世界', '民謠', '爵士', '台灣', '新進', '特價區'], '點了掛的中文全名');
  eq(bins.map(p => CC.plateOf(p)), ['FEATURE', 'PICKS', 'INDIE ROCK', 'INDIE POP', 'BLUES', 'ROCK', 'ELEC', 'SOUL', 'HIP-HOP', 'CITY POP', 'CLASSICAL', 'WORLD', 'FOLK', 'JAZZ', 'TW', 'NEW', 'SALE'], '名牌英文');
  eq([propById('backbin-ir'), propById('backbin-ip'), propById('winbin')].map(p => [p.type, p.cols, p.x]), [['binCabinet', 4, 44], ['binCabinet', 4, 99], ['binCabinet', 7, 162]], '門口長櫃拆兩個 4 欄櫃、窗下矮櫃換成 7 欄藍調櫃');
  ok(!dip.props.some(p => p.type === 'lowShelf' || p.id === 'backbin'), '沒有舊的 backbin／lowShelf');
  ok(dip.props.filter(p => p.type === 'binTable' || p.type === 'binCabinet').every(p => p.bin || p.decor === true), '每個箱子有 bin 或 decor');
  ok(dip.props.every(p => !('lean' in p)), '沒有 lean（島上那一格＝front[1]）');
  const boxes = bins.filter(p => p.type !== 'ledge'), walls = bins.filter(p => p.type === 'ledge');
  ok(boxes.every(p => Array.isArray(p.front) && p.front.length === (p.cols || 3) && !p.hot), '每箱 front 張數＝欄數、不帶 hot');
  ok(walls.every(p => Array.isArray(p.cards) && p.cards.length === p.n * (p.rows || 1) && !p.hot && !p.section), '門口牆每格都有唱片（n×rows）、不帶 hot／section');
  eq(walls.map(p => [p.x, p.n, p.rows, p.plate]), [[44, 2, 2, 'FEATURE'], [76, 5, 2, 'PICKS']], '門口牆：靠門 2×2＝FEATURE、其餘 5×2＝PICKS');
  ok(propById('wall-feature').x < propById('wall-picks').x && propById('wall-feature').x - (propById('door').x + propById('door').w) < 10, 'FEATURE 在最靠門那一格');
  eq(propById('isl-2a').front, ["miki matsubara|pocket park", "大貫妙子|grey skies", "吉田美奈子|monochrome"], 'CITY POP 正面＝松原みき、大貫妙子、吉田美奈子');
  eq([propById('shelving').section, propById('booth').section], ['picks', 'picks'], '高櫃＋試聽桌的封面＝店長推薦');
  const seen = new Set(), dup = [];
  for (const p of dip.props) for (const id of [].concat(p.front || [], p.type === 'ledge' || p.type === 'shelving' ? p.cards : [], p.type === 'listenDesk' ? [p.stack] : [])) { if (seen.has(id)) dup.push(id); seen.add(id); }
  eq(dup, [], '看得到的封面整家店不重複');
  eq(seen.size, 67, '看得到的封面 67 張（14 箱 48＋特價 2＋門口牆 14＋高櫃 2＋試聽 1）');
  // bins.js（契約形狀）：每一區 { key, label, zh, pool, front }；front＝店裡畫出來的；feature＝史詩／傳奇、其他＝一般稀有度
  const BJ = BINS.shops.dip, KEYS = ['jazz', 'tw', 'rock', 'elec', 'soul', 'hiphop', 'citypop', 'classical', 'world', 'folk', 'indierock', 'indiepop', 'blues', 'new', 'feature', 'picks'];
  eq(Object.keys(BJ), KEYS, 'bins.js 的區（契約順序）');
  const ZH = { jazz: '爵士', tw: '台灣', rock: '搖滾', elec: '電子', soul: '靈魂放克', hiphop: '嘻哈 R&B', citypop: '城市流行', classical: '古典', world: '世界', folk: '民謠', indierock: '獨立搖滾', indiepop: '獨立流行', blues: '藍調', new: '新進', feature: '店長推薦精選', picks: '店長推薦' };
  const EN = { jazz: 'JAZZ', tw: 'TW', rock: 'ROCK', elec: 'ELEC', soul: 'SOUL', hiphop: 'HIP-HOP', citypop: 'CITY POP', classical: 'CLASSICAL', world: 'WORLD', folk: 'FOLK', indierock: 'INDIE ROCK', indiepop: 'INDIE POP', blues: 'BLUES', new: 'NEW', feature: 'FEATURE', picks: 'PICKS' };
  // 子曲風區（v5 店面改版）：上架規則 sub＝card-subgenres.json 的路徑（bake 烘進 cards.js 的 subs）
  const SUB_BINS = { citypop: ['pop/jp-pop/city-pop'], indierock: ['rock/indie-alt/indie-rock', 'rock/indie-alt/alt-rock', 'rock/indie-alt/lo-fi', 'rock/dream-post/slowcore'], indiepop: ['pop/indie-pop', 'rock/indie-alt/indie-pop', 'pop/pop-rock/power-pop'] };
  for (const k of KEYS) {
    const b = BJ[k];
    ok(b.key === k && b.label === EN[k] && b.zh === ZH[k] && Array.isArray(b.pool) && Array.isArray(b.front), 'bins.js ' + k + ' 形狀＝{key,label,zh,pool,front}', [b.key, b.label, b.zh]);
    ok(!b.display, 'bins.js ' + k + ' 沒有 display（每一區都賣）');
    ok(b.front.every(id => b.pool.includes(id)), 'bins.js ' + k + ' front ⊂ pool');
    ok(b.pool.length >= b.front.length + (k === 'feature' ? 3 : 6), 'bins.js ' + k + ' pool 夠每晚上貨（' + b.pool.length + ' ≥ 看得到 ' + b.front.length + '＋' + (k === 'feature' ? 3 : 6) + '）');
    const rar = b.pool.map(id => CC.rarityOf(cards[id]));
    ok(rar.every(r => k === 'feature' ? (r === 'epic' || r === 'legendary') : ['common', 'rare', 'uncommon'].includes(r)), 'bins.js ' + k + ' 稀有度', rar);
    if (SUB_BINS[k]) {
      eq(b.rule.sub, SUB_BINS[k], 'bins.js ' + k + ' 上架規則 sub');
      ok(b.pool.every(id => CC.subMatch(SUB_BINS[k], cards[id].subs)), 'bins.js ' + k + ' 每張的子曲風都在 ' + SUB_BINS[k].join('／') + ' 底下', b.pool.filter(id => !CC.subMatch(SUB_BINS[k], cards[id].subs)));
    } else if (!['new', 'feature', 'picks'].includes(k)) ok(b.pool.every(id => CC.catOf(cards[id]) === k), 'bins.js ' + k + ' 每張的分類（第一個曲風／台灣地區）＝' + k, b.pool.filter(id => CC.catOf(cards[id]) !== k));
  }
  // 宇多田《First Love》（D §6：不准出現在搖滾）：POP 改 CITY POP 之後在店長推薦的卡池（不在正面）
  ok(BJ.picks.pool.includes("宇多田ヒカル|first love") && !BJ.rock.pool.includes("宇多田ヒカル|first love") && !BJ.indierock.pool.includes("宇多田ヒカル|first love"), '宇多田在店長推薦（picks）的卡池、不在搖滾');
  const allPool = KEYS.flatMap(k => BJ[k].pool);
  eq(allPool.length, new Set(allPool).size, '各區卡池互不重疊（全店當天不會重複）');
  eq(JSON.stringify(BJ.feature.front), JSON.stringify(propById('wall-feature').cards), 'feature front＝牆上那 4 格');
  eq(BJ.picks.front, propById('wall-picks').cards.concat(propById('shelving').cards, [propById('booth').stack]), 'picks front＝牆上 10＋高櫃 2＋試聽桌 1（照道具順序）');
  ok(CC.runCovers().problems.length === 0, 'check-covers 0 problems', CC.runCovers().problems.slice(0, 5));
  ok(!dip.props.some(p => /rug/i.test(p.type)), '沒有地毯（店主）');
  ok(!dip.bg, '沒有背景圖：全部是程式畫的');
  // 地下室（格子版）照舊
  eq(basement.kind, 'shop', 'basement kind');
  for (const c of CS.SHOP_CAMERAS) ok(basement.cameras[c], 'basement camera ' + c);
});

section('熱點：id 唯一、本店該有的都有、牆上的唱片可以點', () => {
  for (const [f, L] of [['dip.json', dip], ['basement.json', basement], ['taipei.json', taipei], ['home.json', home]]) {
    const r = CS.checkLayout(L, 'shops/' + f, lib, cards, content);
    eq(r.hotIds.length, new Set(r.hotIds).size, f + ' 熱點 id 唯一');
    eq(r.problems, [], f + ' layout 問題');
  }
  const r = CS.checkLayout(dip, 'shops/dip.json', lib, cards, content);
  for (const id of CS.o34HotIds(dip)) ok(r.hotIds.includes(id), 'dip 有熱點 ' + id);
  eq(CS.o34HotIds(dip).filter(h => h.startsWith('bin:')).length, 17, '主熱點 bin:<key> ×17（14 箱＋特價箱＋門口牆兩區，從 o.bin.key 推出）');
  ok(r.hotIds.includes('bin:feature') && r.hotIds.includes('bin:picks'), '門口牆 FEATURE／PICKS 都是可以點的熱點');
  ok(!r.hotIds.some(h => /^crate-/.test(h)), '沒有 v3 的 crate-* 熱點');
  const racks = r.hotIds.filter(h => h.startsWith('rack:'));
  eq(racks.length, 17, '高櫃 2＋門口長櫃 4＋4＋窗下藍調櫃 7 張唱片是單張熱點（門口牆整面＝翻那一區）');
  ok(racks.every(h => cards[h.slice(5)]), '每張都在卡池（點了開唱片資訊）');
  // 門口牆：有 bin 的牆架不出單張熱點；box 含名牌；沒有 bin 的牆架照舊每格一個（位置不變）
  const fw = propById('wall-feature'), pk = propById('wall-picks');
  eq(DS.O34.PROPS.ledge.hots(fw, { card: id => cards[id] }), [], '有 bin 的牆架不出單張熱點');
  eq(DS.O34.PROPS.ledge.box(fw), [43, 6, 33, 44], 'FEATURE 牆架 box＝2×2 格＋名牌');
  eq(DS.O34.PROPS.ledge.box(pk), [76, 6, 74, 44], 'PICKS 牆架 box＝5×2 格＋名牌');
  const plain = Object.assign({}, fw, { bin: null, plate: null, rows: 1, n: 7, cards: pk.cards.slice(0, 7) }), hs = DS.O34.PROPS.ledge.hots(plain, { card: id => cards[id] });
  eq(hs[0].rect, [47, 17, 12, 12], '沒有 bin 的牆架：第一張的熱點位置照舊');
  eq(hs[0].action, 'wall-record:' + plain.cards[0], '沒有 bin 的牆架：唱片＝唱片資訊');
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
  P2('isl-0b').bin.key = 'rock';
  P2('isl-1a').lean = "the band|music from big pink";
  P2('isl-2a').front = P2('isl-2a').front.slice(0, 2);
  P2('isl-2b').bin.stand = [160, 190];
  delete P2('isl-3a').bin;
  b2.props.push(Object.assign({}, P2('deck'), { id: 'deck2', x: 20 }));
  P2('wall-picks').cards = P2('wall-picks').cards.slice(0, 9);
  P2('wall-feature').bin.stand = [60, 200];
  P2('shelving').section = 'wallb';
  P2('counter').sign = { emblem: 'nope' };
  const r2 = CS.checkLayout(b2, 'shops/dip.json', lib, cards, content), has = re => r2.problems.some(p => re.test(p));
  ok(has(/bin\.key 重複 rock/), '抓得到 bin.key 重複', r2.problems);
  ok(has(/isl-1a.*lean/), '抓得到 lean', r2.problems);
  ok(has(/isl-2a.*front 要剛好 3 張/), '抓得到 front 張數不對', r2.problems);
  ok(has(/isl-2b.*bin\.stand.*家具裡/), '抓得到 stand 在家具裡', r2.problems);
  ok(has(/isl-3a.*要有 bin.*decor/), '抓得到沒有 bin 也沒有 decor', r2.problems);
  ok(has(/剛好一台 duelDeck/), '抓得到兩台唱盤', r2.problems);
  ok(has(/wall-picks.*10 格都要有唱片/), '抓得到牆上空格（n×rows）', r2.problems);
  ok(has(/wall-feature.*bin\.stand y＝200/), '抓得到門口牆的 stand 不在牆前走道', r2.problems);
  ok(has(/shelving.*section「wallb」在 bins\.js 沒有/), '抓得到不存在的 section', r2.problems);
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
  // 3.5 → 3.6（R2／V08）：走道的轉角點往外移 3–5 格（人的半個身體不再蓋到中島箱子的邊），mid→ref 從 3.45 變 3.52 s（D §3「約 3 秒」）
  [['counter', 'mid'], ['mid', 'ref'], ['pay', 'leaving'], ['atdoor', 'duelE'], ['leaving', 'duelP'], ['ref', 'visit'], ['visit', 'dig1'], ['duelE', 'door']], 3.6,
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
  eq(n, 18 * 17, '箱子 15 個（含特價箱）＋門口牆 2 個 stand＋browse 兩兩');
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

// v5 第五項：走路朝向 faceDir（寶可夢黃版三向：往上走背面、往下正面、橫走側面＋左右翻；遲滯 ≥55° 上下、≤35° 橫走、中間保持；<6 格不轉；換向後 0.12 秒內不再換）
//   第一步（沒有側面圖，?chars=0 或 DipLabChars 沒有 'side'）橫走＝正面左右翻；第二步 DipLabChars.DIRS 有 'side' → shop.js 給 side:true
section('走路朝向 faceDir：純函式、路線表每一段、來回不抖', () => {
  const FD = DS.faceDir, F = DS.FACE;
  ok(typeof FD === 'function', 'DipShop.faceDir 有匯出');
  eq([F.hi, F.lo, F.minSeg, F.hold], [55, 35, 6, 0.12], '門檻：55°／35°／6 格／0.12 秒');
  const at = (deg, len = 40) => [Math.cos(deg * Math.PI / 180) * len, -Math.sin(deg * Math.PI / 180) * len];   // 角度：0°＝往右、90°＝往上（離鏡頭）
  const F0 = { dir: 'front', flip: false, at: null };
  const d = (cur, deg, o = {}) => { const [dx, dy] = at(deg, o.len || 40); return FD(cur, dx, dy, Object.assign({ t: 10 }, o)); };
  eq(d(F0, 90).dir, 'back', '正上（90°）＝背面');
  eq(d(F0, -90).dir, 'front', '正下（-90°）＝正面');
  eq(d({ dir: 'back', flip: false }, -90).dir, 'front', '背面往下走 → 正面');
  eq([d(F0, 0).dir, d(F0, 0).flip], ['front', false], '往右＝正面、不翻');
  eq([d(F0, 180).dir, d(F0, 180).flip], ['front', true], '往左＝正面、翻面');
  eq([d({ dir: 'back', flip: false }, 180).dir, d({ dir: 'back', flip: false }, 180).flip], ['front', true], '背面往左走 → 正面＋翻面');
  eq(d(F0, 55).dir, 'back', '55° 算上下'); eq(d(F0, 125).dir, 'back', '125°（往左上 55°）算上下');
  for (const deg of [36, 45, 54, 126, 135, 144, -45, -135]) {
    const b = d({ dir: 'back', flip: true }, deg), f = d({ dir: 'front', flip: false }, deg);
    eq([b.dir, b.flip, f.dir, f.flip], ['back', true, 'front', false], deg + '° 在死區：保持原方向（含左右）');
  }
  eq(d({ dir: 'back', flip: false }, 34).dir, 'front', '34° 算橫走'); eq(d({ dir: 'back', flip: false }, 34).flip, false, '往右上 34° 不翻');
  eq(d({ dir: 'back', flip: false }, 146).flip, true, '往左上 34° 翻面');
  // 上下走不動左右：往下走時單肩包不會突然換邊
  eq(d({ dir: 'back', flip: true }, -80).flip, true, '往下（略偏右）保留原本的翻面');
  eq(d({ dir: 'front', flip: false }, 100).flip, false, '往上（略偏左）保留原本的不翻');
  // 短段不轉
  eq(d(F0, 90, { len: 5, seg: 5 }).dir, 'front', '這段只有 5 格：不轉');
  eq(d(F0, 90, { len: 3, seg: 30 }).dir, 'back', '這段 30 格、剩 3 格：照轉（看的是起點時的長度）');
  eq(FD(F0, 0, 0, { t: 10, seg: 30 }).dir, 'front', '剩 0 格：不轉');
  // 換向後 0.12 秒內不再換
  const c1 = d(F0, 90, { t: 5 }); eq([c1.dir, c1.at], ['back', 5], '換向記時間');
  eq(d(c1, -90, { t: 5.1 }).dir, 'back', '0.1 秒後：還不能換回來');
  eq(d(c1, -90, { t: 5.13 }).dir, 'front', '0.13 秒後：可以換');
  eq(d(c1, 180, { t: 5.05 }).flip, false, '0.12 秒內也不翻面');
  eq(d(c1, 90, { t: 5.01 }), c1, '同方向：不動、時間不變');
  eq(FD({ dir: 'back', flip: false, at: 5 }, 0, -40, {}).dir, 'back', '沒給時間：不擋');   // o.t 缺 → 沒有最短停留
  // 三向（side:true，DipLabChars 有側面圖時 shop.js 都這樣叫）
  const sd = (cur, deg, o = {}) => d(cur, deg, Object.assign({ side: true }, o));
  eq([sd(F0, 0).dir, sd(F0, 0).flip], ['side', false], '三向：往右＝側面朝右');
  eq([sd(F0, 180).dir, sd(F0, 180).flip], ['side', true], '三向：往左＝側面朝左（翻面＝鏡像）');
  eq([sd(F0, 90).dir, sd(F0, -90).dir], ['back', 'front'], '三向：往上背面、往下正面照舊');
  eq([sd({ dir: 'side', flip: true }, 90).dir, sd({ dir: 'side', flip: true }, 90).flip], ['back', true], '側面往上走 → 背面（保留左右）');
  eq([sd({ dir: 'side', flip: false }, -90).dir, sd({ dir: 'side', flip: false }, -90).flip], ['front', false], '側面往下走 → 正面');
  eq([sd({ dir: 'back', flip: false }, 34).dir, sd({ dir: 'front', flip: false }, 146).dir, sd({ dir: 'front', flip: false }, 146).flip], ['side', 'side', true], '三向：34° 算橫走');
  for (const deg of [36, 45, 54, 126, 135, 144, -45, -135]) {
    const a = sd({ dir: 'side', flip: true }, deg), b = sd({ dir: 'back', flip: false }, deg);
    eq([a.dir, a.flip, b.dir, b.flip], ['side', true, 'back', false], '三向 ' + deg + '° 在死區：保持原方向（含左右）');
  }
  eq(sd(F0, 0, { len: 5, seg: 5 }).dir, 'front', '三向：這段只有 5 格不轉');
  { const c = sd(F0, 0, { t: 5 }); eq([c.dir, c.at], ['side', 5], '三向：換向記時間'); eq(sd(c, 90, { t: 5.1 }).dir, 'side', '0.1 秒內不換'); eq(sd(c, 180, { t: 5.1 }).flip, false, '0.1 秒內不翻面'); eq(sd(c, 90, { t: 5.13 }).dir, 'back', '0.13 秒後可以換'); }
  eq(d(F0, 70, { hi: 75 }).dir, 'front', 'hi 可調（layout.faceDeg）');

  // 照 shop.js stepActors 走一遍（每格 0.1 秒、1 倍速 72 格/秒；路點吸附）：記錄每一格的朝向
  const obs = DS.navObstacles(dip), S = Object.assign({}, dip.spots);
  for (const p of dip.props) if (p.bin) S['bin:' + p.bin.key] = p.bin.stand;
  function walkSim(pts, cur = { dir: 'front', flip: false, at: null }, o = {}) {
    const side = o.side !== false;   // 預設照第二步（有側面圖）；o.side:false＝第一步／?chars=0
    let x = pts[0][0], y = pts[0][1], t = 0; const dt = o.dt || 0.1, sp = (o.k || 1) * 72 * dt, log = [], path = pts.slice(1).map((p, i) => ({ x: p[0], y: p[1], i }));
    let segTo = null, segLen = 0, guard = 0;
    while (path.length && guard++ < 5000) {
      t += dt * (o.k || 1); const tg = path[0], dx = tg.x - x, dy = tg.y - y, dist = Math.hypot(dx, dy);
      if (segTo !== tg) { segTo = tg; segLen = dist; }
      cur = FD(cur, dx, dy, { t, seg: segLen, side }); log.push({ t, seg: tg.i, dir: cur.dir, flip: cur.flip, at: cur.at });
      if (dist <= sp) { x = tg.x; y = tg.y; path.shift(); } else { x += dx / dist * sp; y += dy / dist * sp; }
    }
    return { log, cur };
  }
  const pairs = [['door', 'browse'], ['browse', 'pay'], ['pay', 'leave'], ['counter', 'dig1'], ['counter', 'dig2'], ['dig2', 'counter'], ['counter', 'mid'], ['mid', 'ref'], ['pay', 'leaving'], ['atdoor', 'duelE'],
    ['leaving', 'duelP'], ['ref', 'visit'], ['visit', 'dig1'], ['duelE', 'door'], ['browse', 'sale'], ['sale', 'pay'], ['door', 'in'], ['in', 'counter']];
  for (const k of Object.keys(S).filter(k => k.startsWith('bin:'))) pairs.push(['door', k], [k, 'pay']);
  let nRoutes = 0, upLen = 0, allLen = 0, changes = 0, upSegs = 0, sideSegs = 0, changes1 = 0;
  for (const [a, b] of pairs) {
    if (!S[a] || !S[b]) continue;
    const r = CS.routeOf(DS, dip, S[a].slice(0, 2), S[b].slice(0, 2), obs); if (!r) { ok(false, '走不到 ' + a + '→' + b); continue; }
    const pts = [S[a].slice(0, 2)].concat(r.pts), { log } = walkSim(pts); nRoutes++;
    { const L1 = walkSim(pts, undefined, { side: false }).log; for (let j = 0; j < L1.length; j++) { ok(L1[j].dir !== 'side', a + '→' + b + ' 沒有側面圖時不出 side'); const p = j ? L1[j - 1] : { dir: 'front', flip: false }; if (L1[j].dir !== p.dir || L1[j].flip !== p.flip) changes1++; } }
    // 每一段：夠長（≥ 6 格）、往上 ≥ 55° → 這段走完的時候是背面；往下 ≥ 55° → 正面；橫走 ≤ 35° → 側面、左右對
    for (let i = 1; i < pts.length; i++) {
      const dx = pts[i][0] - pts[i - 1][0], dy = pts[i][1] - pts[i - 1][1], len = Math.hypot(dx, dy), th = Math.atan2(Math.abs(dy), Math.abs(dx)) * 180 / Math.PI;
      allLen += len; const L0 = log.filter(s => s.seg === i - 1); if (!L0.length || len < 6) continue;
      const end = L0[L0.length - 1];
      if (th >= 55) { eq(end.dir, dy < 0 ? 'back' : 'front', a + '→' + b + ' 第 ' + i + ' 段（' + Math.round(th) + '°、' + Math.round(len) + ' 格）' + (dy < 0 ? '往上＝背面' : '往下＝正面')); if (dy < 0) { upLen += len; upSegs++; } }
      else if (th <= 35) { eq([end.dir, end.flip], ['side', dx < 0], a + '→' + b + ' 第 ' + i + ' 段橫走＝側面、' + (dx < 0 ? '朝左' : '朝右')); sideSegs++; }
      // 同一段裡最多換一次（上一段剛換過向、0.12 秒內不能再換，會延到這一段開頭才轉），不來回（不抖）
      let ch = 0; for (let j = 1; j < L0.length; j++) if (L0[j].dir !== L0[j - 1].dir || L0[j].flip !== L0[j - 1].flip) ch++;
      ok(ch <= 1, a + '→' + b + ' 第 ' + i + ' 段裡不來回換', L0.map(s => s.dir[0] + (s.flip ? 'L' : 'R')).join(''));
    }
    // 整條路：兩次換向至少隔 0.12 秒
    const ts = []; for (let j = 0; j < log.length; j++) { const p = j ? log[j - 1] : { dir: 'front', flip: false }; if (log[j].dir !== p.dir || log[j].flip !== p.flip) ts.push(log[j].t); }
    changes += ts.length; for (let j = 1; j < ts.length; j++) ok(ts[j] - ts[j - 1] >= 0.12 - 1e-9, a + '→' + b + ' 換向間隔 ≥ 0.12 秒', ts);
  }
  ok(nRoutes >= 50, '跑了 ≥ 50 條常用路線', nRoutes);
  ok(upSegs >= 10 && upLen / allLen > 0.08, '有一成左右的路是往上走（換背面）', [upSegs, +(upLen / allLen).toFixed(3)]);
  ok(sideSegs >= 30, '橫走的段（≥ 6 格、≤ 35°）都是側面', sideSegs);
  ok(changes > 0 && changes < nRoutes * 3, '三向換向次數合理（不抖）', [changes, nRoutes]);
  ok(changes1 > 0 && changes1 < changes, '沒有側面圖時（正／背）換得比三向少', [changes1, changes]);
  if (process.argv.includes('--routes')) console.log('  朝向：' + nRoutes + ' 條路線、往上 ' + upSegs + ' 段（路長 ' + (upLen / allLen * 100).toFixed(1) + '%）、橫走 ' + sideSegs + ' 段、換向 ' + changes + ' 次（只有正背 ' + changes1 + ' 次）');
  // 來回不抖：沿 45° 左右的鋸齒走（每段 10 格、44°↔46°）→ 一次都不換；短段上下交錯（每段 4 格）→ 不換
  { const pts = [[100, 200]]; for (let i = 0; i < 20; i++) { const p = pts[pts.length - 1], [dx, dy] = at(i % 2 ? 44 : 46, 10); pts.push([p[0] + dx, p[1] + dy]); }
    const { log } = walkSim(pts, { dir: 'front', flip: false, at: null }); ok(log.every(s => s.dir === 'front' && !s.flip), '45° 鋸齒：一次都不換', log.map(s => s.dir[0]).join(''));
    const L2 = walkSim(pts, { dir: 'side', flip: false, at: null }).log; ok(L2.every(s => s.dir === 'side' && !s.flip), '45° 鋸齒（從側面開始）：一次都不換', L2.map(s => s.dir[0]).join('')); }
  // 35° 上下的鋸齒（每段 10 格、33°↔37°，往右）：橫走一進側面就不再換
  { const pts = [[100, 200]]; for (let i = 0; i < 20; i++) { const p = pts[pts.length - 1], [dx, dy] = at(i % 2 ? 33 : 37, 10); pts.push([p[0] + dx, p[1] + dy]); }
    const { log } = walkSim(pts, { dir: 'front', flip: false, at: null }); let ch = 0; for (let j = 1; j < log.length; j++) if (log[j].dir !== log[j - 1].dir) ch++;
    ok(ch === 1 && log[log.length - 1].dir === 'side', '33°／37° 鋸齒：轉成側面一次之後不抖', log.map(s => s.dir[0]).join('')); }
  { const pts = [[100, 200]]; for (let i = 0; i < 20; i++) { const p = pts[pts.length - 1]; pts.push([p[0] + 1, p[1] + (i % 2 ? 4 : -4)]); }
    const { log } = walkSim(pts); ok(log.every(s => s.dir === 'front'), '4 格的短段上下交錯：不轉', log.map(s => s.dir[0]).join('')); }
  // 長的上下交錯（每段 12 格、快轉 4 倍）：會換，但兩次換向至少隔 0.12 秒（走路時鐘＝真時間 × 倍速，跟 shop.js 一樣）
  { const pts = [[100, 200]]; for (let i = 0; i < 12; i++) { const p = pts[pts.length - 1]; pts.push([p[0], p[1] + (i % 2 ? 12 : -12)]); }
    const { log } = walkSim(pts, undefined, { k: 4, dt: 0.016 }); const ts = []; for (let j = 1; j < log.length; j++) if (log[j].dir !== log[j - 1].dir) ts.push(log[j].t);
    ok(ts.length >= 4 && ts.every((v, j) => !j || v - ts[j - 1] >= 0.12 - 1e-9), '12 格上下交錯：有換、間隔 ≥ 0.12 秒', ts.map(v => v.toFixed(3))); }
});

// 審查修正：到站之後朝哪（走完留在背面＝來客畫面你是後腦勺、門邊等的客人面向門口）→ 預設回正面，只有試聽桌 listen 背面
section('到站朝向 arriveDir：預設正面、試聽桌背面、layout.faceAt 可改', () => {
  const AD = DS.arriveDir;
  ok(typeof AD === 'function', 'DipShop.arriveDir 有匯出');
  eq(DS.FACE.arrive, 0.2, '到站 0.2 秒（走路時鐘）後才轉：接連走不閃一格正面');
  eq(DS.FACE_AT, { listen: 'back' }, '預設表只有試聽桌');
  // 審查重現的兩條：duelP→browse（打完客人回來客畫面）、wait→atdoor（第一位客人回門邊）都是最後一段往上；走完都要回正面
  for (const k of ['browse', 'atdoor', 'wait', 'pay', 'counter', 'duelP', 'duelE', 'door', 'in', 'bin:jazz', '[198,240]', undefined]) eq(AD(dip, k, 'back'), 'front', '到 ' + k + '（剛往上走完）＝正面');
  eq(AD(dip, 'listen', 'front'), 'back', '到試聽桌＝背面（戴著桌邊的耳機面向桌子）');
  ok(!dip.faceAt || !Object.keys(dip.faceAt).length, 'dip.json 沒另外設 faceAt（用預設表）');
  const L2 = { faceAt: { listen: 'front', pay: 'back', counter: 'keep' } };
  eq([AD(L2, 'listen', 'back'), AD(L2, 'pay', 'front'), AD(L2, 'counter', 'back'), AD(L2, 'counter', 'front'), AD(L2, 'browse', 'back')], ['front', 'back', 'back', 'front', 'front'], 'layout.faceAt：蓋掉預設、指定背面、keep＝留在最後走的方向、沒寫的回正面');
  eq(AD(null, 'listen'), 'back', '沒有 layout 也照預設表');
  // 劇本走位每一條（同上面路線表）：走完那一刻的方向不管是什麼，到站後只有試聽桌是背面
  const obs = DS.navObstacles(dip), S = Object.assign({}, dip.spots); for (const p of dip.props) if (p.bin) S['bin:' + p.bin.key] = p.bin.stand;
  const ends = [['duelP', 'browse'], ['duelP', 'listen'], ['wait', 'atdoor'], ['browse', 'listen'], ['pay', 'listen'], ['bin:jazz', 'pay'], ['dig2', 'counter']];
  for (const [a, b] of ends) {
    const r = CS.routeOf(DS, dip, S[a].slice(0, 2), S[b].slice(0, 2), obs); if (!r) { ok(false, '走不到 ' + a + '→' + b); continue; }
    const pts = [S[a].slice(0, 2)].concat(r.pts); let cur = { dir: 'front', flip: false, at: null }, x = pts[0][0], y = pts[0][1], t = 0, segTo = -1, segLen = 0;
    for (let i = 1; i < pts.length; i++) { while (true) { t += 0.1; const dx = pts[i][0] - x, dy = pts[i][1] - y, d = Math.hypot(dx, dy); if (segTo !== i) { segTo = i; segLen = d; } cur = DS.faceDir(cur, dx, dy, { t, seg: segLen }); if (d <= 7.2) { x = pts[i][0]; y = pts[i][1]; break; } x += dx / d * 7.2; y += dy / d * 7.2; } }
    eq(AD(dip, b, cur.dir), b === 'listen' ? 'back' : 'front', a + '→' + b + '：走完 ' + cur.dir + ' → 到站 ' + (b === 'listen' ? '背面' : '正面'));
  }
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
  for (const st of [null, { rec: { attr: 'o', card: "radiohead|ok computer", kind: null }, state: 'land', by: 'p' }, { rec: { attr: 'c', card: "swans|filth", kind: 'ace' }, state: 'spin', by: 'e' }, { rec: { attr: 'h', card: null }, state: 'armMid', by: 'p' }]) {
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
  const ledge = Object.assign({}, propById('wall-picks'), { cards: propById('wall-picks').cards.slice(0, 5) }), bin = Object.assign({}, propById('isl-0a'), { front: null }), desk = Object.assign({}, propById('booth'), { stack: null });
  for (const o of [ledge, bin, desk]) DS.O34.PROPS[o.type].draw(P, o, S);
  eq(picks, 0, '空格畫素色封套／空架，不抽卡');
  const seen = [...covers].filter(id => id !== "caetano veloso|transa");
  eq(seen.length, 67, '畫出來的固定封面＝資料裡的 67 張（不含櫃檯 NOW）');
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
  for (const id of ['counter', 'deck', 'booth', 'crate-sale', 'crate-new', 'shelving', 'island', 'backbin-ir', 'backbin-ip', 'winbin']) ok(feet.some(f => f[0] === id), id + ' 算在家具裡');
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
  const own = { counter: 'counter', deck: 'deck', 'backbin-ir': 'backbin-ir', 'backbin-ip': 'backbin-ip', winbin: 'winbin', booth: 'booth', 'crate-sale': 'crate-sale', 'crate-new': 'crate-new', shelving: 'shelving' };
  for (const o of dip.props) if (/^isl-|^crate-(jazz|tw)$/.test(o.id || '')) own[o.id] = 'island';
  for (const [id, fid] of Object.entries(own)) {
    const o = P(id), f = F(fid), px = maskOfProp(o), bx = (dip.footprints.behind || {})[id], fy = o.y - o.d;
    const inPocket = ([x, y]) => bx && y < fy && x + 0.5 > bx[0] && x + 0.5 < bx[1];   // 口袋（老闆站的那一條）不算
    const miss = px.filter(p => !inPocket(p) && !DS.inPoly([p[0] + 0.5, p[1] + 0.5], f.poly));
    ok(px.length > 50 && miss.length === 0, id + '：畫出來的每一格都在腳下範圍（' + fid + '）裡' + (bx ? '（口袋 x ' + bx.join('–') + ' 以外）' : ''), miss.slice(0, 4));
  }
  // 口袋：櫃檯整個寬（老闆在櫃檯後面走動：spots.counter）、唱盤台只有轉盤那一段（ref／between／map），兩側照擋
  eq(dip.footprints.behind, { counter: [212, 284], deck: [134, 158] }, '口袋：櫃檯 212–284、唱盤台 134–158（轉盤正後面）');
  const dk = F('deck'), dkTop = DS.drawnExtent(P('deck'), DS.O34.PROPS, { L: dip, state: {}, card: () => null }).top;
  ok(DS.inPoly([125, dkTop + 3], dk.poly) && DS.inPoly([166, dkTop + 3], dk.poly) && !DS.inPoly([146, dkTop + 3], dk.poly), '唱盤台兩側後面擋、轉盤後面是口袋', dk.poly);
  for (const k of ['ref', 'between', 'map']) ok(dk.pocket && DS.inPoly(dip.spots[k], DS.rectPoly(dk.pocket)), k + ' 在唱盤台的口袋裡', [dip.spots[k], dk.pocket]);
  ok(DS.inPoly(dip.spots.counter, DS.rectPoly(F('counter').pocket)), 'spots.counter 在櫃檯的口袋裡');
  // visit、near 原本在唱盤台畫出來的範圍裡（v4 把唱盤台移到 y316 之後）→ 移到旁邊；E5／E8 老闆走到 visit 看著你（duelP）
  eq([dip.spots.visit, dip.spots.near], [[180, 292], [112, 292]], 'visit、near 移到唱盤台旁邊（FIXLIST 1）');
  // 中島最上排（R&B／OST）畫出來的上緣：箱身與唱片 y≈104–106；腳下範圍從那裡起算（原本的 foot 只從 y128 起＝店主看到的「走在箱子上」）
  ok(isl.box[1] <= 106 && isl.box[0] <= 97 && isl.box[0] + isl.box[2] >= 185 && isl.box[1] + isl.box[3] >= 262, '中島腳下範圍 x 97–185、y ≤106–262', isl.box);
  // 後走道：門口長櫃（INDIE ROCK／INDIE POP）與窗下藍調櫃前緣以後、中島上緣以前；mid、leaving 站在這裡（不被中島擋住腳）
  const backY = Math.max(...['backbin-ir', 'backbin-ip', 'winbin'].map(id => F(id).box[1] + F(id).box[3]));
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
  // 抓得到：舊站位（站在最上排箱子畫出來的範圍裡）、舊路點 [146,110]、舊路線 sale→pay 那一段 [90,124]→[192,124]、拿掉櫃檯的口袋（老闆站進櫃檯裡）、
  // 唱盤台整個寬都是口袋（別人的路線從唱盤台上走過去）、口袋放在箱子上、群組有不存在的 id
  const bad1 = JSON.parse(JSON.stringify(dip)); bad1.spots.leaving = [150, 110]; bad1.spots.mid = [96, 112]; bad1.nav.push([146, 110]);
  const r1 = CS.checkLayout(bad1, 'shops/dip.json', lib, cards, content).problems;
  ok(r1.some(p => /spots\.leaving 站在家具裡 island/.test(p)) && r1.some(p => /spots\.mid 站在家具裡 island/.test(p)) && r1.some(p => /nav\[\d+\] 在家具裡 \[146,110\]/.test(p)), '抓得到 A2 的舊站位與舊路點（站在中島最上排）', r1.slice(0, 4));
  const h1 = CS.routeHitsFeet(DS, [[90, 124], [192, 124]], CS.footprints(dip, DS.O34.PROPS));
  ok(h1 && h1.id === 'island', '抓得到 A2 路線圖 13（sale→pay）那一段 [90,124]→[192,124] 穿過中島', h1);
  ok(!CS.routeHitsFeet(DS, [[90, 124], [192, 124]], dip.props.filter(o => /^isl-/.test(o.id)).map(o => [o.id, DS.O34.PROPS.binTable.foot(o)])), '（對照：舊的 foot 只框地面那塊，這一段抓不到）');
  const bad2 = JSON.parse(JSON.stringify(dip)); bad2.footprints.behind = { deck: [100, 200], 'isl-0b': [150, 160], booth: [0, 1] }; bad2.footprints.margin = { island: [8, 2], nope: [1, 1], booth: [3] }; bad2.footprints.groups.island = bad2.footprints.groups.island.filter(i => i !== 'isl-0a').concat(['nope']);
  const r2 = CS.checkLayout(bad2, 'shops/dip.json', lib, cards, content).problems;
  ok(r2.some(p => /spots\.counter 站在家具裡 counter/.test(p)), '拿掉櫃檯的口袋：老闆的站位在櫃檯畫出來的範圍裡 → 抓得到', r2.slice(0, 3));
  ok(r2.some(p => /從 deck 後面的口袋穿過/.test(p)), '唱盤台整個寬都是口袋：別人的路線從唱盤台後面（台上）穿過 → 抓得到', r2.filter(p => /口袋/.test(p)).slice(0, 2));
  ok(r2.some(p => /behind：isl-0b 不能同時在群組裡/.test(p)) && r2.some(p => /behind\.booth：口袋是空的/.test(p)) && r2.some(p => /groups\.island：沒有道具 nope/.test(p)), '抓得到口袋放在箱子上、口袋是空的、群組有不存在的 id', r2.slice(0, 6));
  ok(r2.some(p => /footprints\.margin：沒有這一塊 nope/.test(p)) && r2.some(p => /footprints\.margin\.booth 要是/.test(p)), '抓得到壞的 footprints.margin', r2.slice(0, 8));
  // 店主 11-18「沒有客人會跑到櫃檯裡面」：spots.regular（r1 退役後＝活店結帳點 c-pay）放回 11-13 那格（櫃檯後面高櫃前 [272,168]）
  //   → 抓得到 crowd.stops c-pay 站在櫃檯後面的口袋裡（SPEC-H §2.4、LP7）；老闆自己站口袋不算
  const bad3 = JSON.parse(JSON.stringify(dip)); bad3.spots.regular = [272, 168];
  const r3 = CS.checkLayout(bad3, 'shops/dip.json', lib, cards, content).problems;
  ok(r3.some(p => /crowd\.stops c-pay（regular \[272,168\]）站在 counter 後面的口袋裡/.test(p)), '結帳點（spots.regular）放回櫃檯後面（11-13 的 [272,168]）→ 抓得到', r3.slice(0, 3));
  ok(!r3.some(p => /actors o（/.test(p)), '老闆站在櫃檯後面的口袋裡不算', r3.filter(p => /actors o/.test(p)));
  // 櫃檯前那一格 spots.regular（regular-spot 第二棒定的熟客位；r1 退役後＝活店結帳點 c-pay＋同業調貨攤站主，SPEC-H §2.4、LP7）：
  //   腳在櫃檯前緣之前、頭頂（y−40）在櫃檯檯面（熱點上緣）之下＝不蓋老闆和檯面上的 NOW、收銀機、貓；
  //   腳＋影子（+2）在對決橫條 strip／stripS 上緣之上＝不會在每場對決右上角露出沒有頭的下半身（第一版 [262,248] 在 390×664 每場都會）；
  //   跟 pay（你在櫃檯付錢站的地方）並排不疊（|dx|≥38，R-02 那組數字）；結帳的人不擺 dig（背面翻箱兩手舉在頭邊，前面沒有箱子＝像在舉手）
  { const s = dip.spots.regular, ct = propById('counter'), cam = dip.cameras, pay = dip.spots.pay, cp = (dip.crowd.stops || []).find(x => x.id === 'c-pay') || {};
    ok(s[1] > ct.y && (s[1] - 40) >= ct.hot.rect[1], 'spots.regular 在櫃檯外（腳在櫃檯前緣 y' + ct.y + ' 之前）、頭頂（y−40）不高過櫃檯檯面 y' + ct.hot.rect[1], s);
    ok(s[1] + 2 <= cam.strip.y && s[1] + 2 <= cam.stripS.y, 'spots.regular 整個人在對決橫條上緣之上（strip y' + cam.strip.y + '、stripS y' + cam.stripS.y + '）', s);
    ok(Math.abs(s[0] - pay[0]) >= 38 || Math.abs(s[1] - pay[1]) >= 44, 'spots.regular 跟 pay 並排不疊（|dx|≥38）', [s, pay]);
    ok(cp.at === 'regular' && cp.kind === 'pay' && cp.pose !== 'dig', 'c-pay 站 spots.regular、kind pay、不擺 dig', cp); }
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
    say(id, t) { log.push(['say', id, t == null ? null : t]); return null; }, emote(id, k) { log.push(['emote', id, k || null]); return api; }, render() {},
    back(id, on) { log.push(['back', id, on !== false]); return api; }, addHot(h) { log.push(['addHot', h]); return api; }, removeHot(id) { log.push(['removeHot', id]); return api; }, hotspots() { return []; }, highlight() { return api; }, destroy() {}, dim() { return api; }, play() { return api; },
    step(ms) { rt += ms / 1000; ticks.slice().forEach(f => f(rt)); }
  };
  return { api, actors, log };
}
async function loadStage(F) {
  const flush = () => new Promise(r => setImmediate(r));
  const sw = { location: { search: '', href: 'http://localhost/game-lab/' }, innerHeight: 664, addEventListener() {}, removeEventListener() {}, matchMedia: () => ({ matches: false }),
    DipShop: { mount: (h, L, o) => { F.opts = o; return F.api; }, O34: DS.O34 }, DipLabCards: cards };
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
  eq(bins.length, 17, 'bins() 17 區（14 箱＋特價箱＋門口牆 FEATURE／PICKS）');
  eq(bins.map(b => b.hotId), dip.props.filter(p => p.bin).map(p => 'bin:' + p.bin.key), 'hotId＝bin:<key>');
  ok(bins.every(b => { const p = propById(b.propId); return p && p.bin.label === b.label && JSON.stringify(p.bin.stand) === JSON.stringify(b.stand); }), 'label／stand／propId 照 layout');
  // hold('o')：老闆手上有那張、arm show；不呼叫 setFlips、不記進 TT.held（§2.3.2、§5.1 A2）
  st.put('f', 'duelE', 'e0'); st.put('p', 'duelP'); st.put('o', 'ref');
  st.hold('e', { back: true });
  const held0 = st.clashState().held, n0 = F.log.length;
  st.hold('o', { sleeve: "swans|filth" });
  eq(F.actors.o.hold, { sleeve: "swans|filth" }, 'hold(\'o\')：shop 的老闆手上有那張');
  eq(F.actors.o.arm, 'show', 'hold(\'o\')：arm show');
  eq(st.clashState().held, held0, 'hold(\'o\')：TT.held 不變');
  ok(!F.log.slice(n0).some(x => x[0] === 'flip' || (x[0] === 'hold' && x[1] !== 'o')), 'hold(\'o\')：不動 p／f 的翻面與手', F.log.slice(n0));
  eq(F.actors.p.hold, null, 'hold(\'o\') 不會給到玩家（v3 sid() 把 o 當 p 的 bug）');
  st.hold('o', null); ok(F.actors.o.hold === null && F.actors.o.arm === null, 'hold(\'o\', null) 收起');
  st.hold('p', { sleeve: "radiohead|ok computer" });
  eq(st.clashState().held, { f: { back: true }, p: { sleeve: "radiohead|ok computer" } }, 'hold(\'e\'／\'p\') 記進 TT.held');
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
  st.floorRecord('duelE', { attr: 'o', card: "swans|filth" }); await run(40);
  ok((F.api.state.fx.discs || []).some(d => d.flat && d.x === dip.spots.duelE[0] && d.y === dip.spots.duelE[1] && d.attr === 'o'), 'floorRecord(duelE)：地上一張冷門唱片', F.api.state.fx);
  await run(3000);
  ok(F.api.state.fx.discs.some(d => d.flat), 'floorRecord 一直留著（不像 flatDisc 會消失）');
  st.floorRecord(null); await run(40);
  ok(!F.api.state.fx.discs.some(d => d.flat), 'floorRecord(null) 收掉');
});

asection('舞台 v4：一手的時間軸 roundItem（剋中、v3 呼叫、平手搖頭、減少動態、四倍速）', async () => {
  const pc = "radiohead|ok computer", ec = "swans|filth";
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

section('你家（聆聽室，v5 第六項第三期）：房間 layout', () => {
  eq(home.kind, 'room', 'kind:room');
  eq(home.projection, 'oblique34', '斜俯視（跟本店同一套）');
  eq(home.size[0], dip.size[0], '跟本店一樣寬（292）：人跟本店一樣大');
  eq([home.spriteScale, home.pxPerM, home.wallBase], [dip.spriteScale, dip.pxPerM, dip.wallBase], '比例、牆高跟本店一樣');
  const r = CS.checkLayout(home, 'shops/home.json', lib, cards, content);
  eq(r.problems, [], 'check-shops 房間分支 0 問題');
  for (const id of CS.ROOM_HOTS) ok(r.hotIds.includes(id), '房間有熱點 ' + id);
  for (const k of CS.ROOM_SPOTS) ok(Array.isArray(home.spots[k]), '房間有站位 ' + k);
  const by = id => home.props.find(p => p.id === id);
  eq([by('shelf').type, by('shelf').n * by('shelf').rows, by('shelf').fill], ['ledge', 18, 'owned'], '唱片架 6×3＝18 格、fill:owned（執行時塞擁有的）');
  eq(by('shelf').hot.action, 'shelf:own', '唱片架整面＝分頁面板');
  eq([by('deck').type, by('deck').hot.action], ['duelDeck', 'deck:play'], '唱盤＝duelDeck、動作 deck:play');
  eq([by('console').type, by('console').hot.action], ['tuneConsole', 'tune'], '控制台＝tuneConsole、動作 tune');
  eq([by('door').style, by('door').hot.action], ['home', 'shop:dip'], '門：家門樣子、回本店');
  ok(!home.props.some(p => p.bin), '房間不放翻箱');
  ok(!home.props.some(p => /rug/i.test(p.type)), '沒有地毯（店主）');
  ok(!home.duel && !home.props.some(p => p.type === 'duelfx' || p.type === 'counter'), '沒有對決、沒有櫃檯');
  // 站位兩兩走得到、每段不穿家具腳下範圍
  const obs = DS.navObstacles(home), feet = CS.footprints(home, DS.O34.PROPS, null, DS), S = home.spots, ks = Object.keys(S).filter(k => !S[k][2]);
  for (const a of ks) for (const b of ks) {
    if (a === b) continue;
    const rt = CS.routeOf(DS, home, S[a].slice(0, 2), S[b].slice(0, 2), obs);
    ok(rt && rt.clear && !CS.routeHitsFeet(DS, rt.pts, feet), '房間 ' + a + '→' + b + ' 走得到、不穿家具');
  }
  // 店景上的唱片架：塞了卡＝每格一個 rack:<id>（唱片資訊）；空格不出熱點
  const L2 = JSON.parse(JSON.stringify(home)), ids = Object.keys(cards).filter(id => !cards[id].tier).slice(0, 5);
  L2.props.find(p => p.id === 'shelf').cards = ids.concat(Array(13).fill(null));
  const hl = DS.buildHotList(L2, DS.O34.PROPS, { card: id => cards[id] || null }).filter(h => !h.occluder);
  eq(hl.filter(h => /^rack:/.test(h.id)).map(h => h.id.slice(5)), ids, '擁有 5 張＝唱片架前 5 格有封面熱點，其他空著');
  ok(hl.some(h => h.id === 'shelf') && hl.some(h => h.id === 'console') && hl.some(h => h.id === 'deck') && hl.some(h => h.id === 'door'), 'buildHotList 有唱片架、控制台、唱盤、門');
  // 新道具畫得出來（量外框）：控制台比人矮、在畫布裡
  const sp = DS.O34.PROPS.tuneConsole, bx = sp.box(by('console'));
  ok(bx[1] >= home.wallBase - 30 && bx[3] < PERSON, '控制台（含桌子）比人矮', bx);
});

section('index.json 與台北地圖預告', () => {
  eq(index.map, 'shops/taipei.json', 'map');
  eq(index.shops.map(s => s.id + ':' + s.status), ['dip:open', 'basement:debug'], '本店開、地下室只在 debug');
  const pins = taipei.props.filter(p => p.type === 'pin');
  // v5 第六項第三期：你家（rooms[]）也開著；圖釘動作＝房間 id，地圖上畫成小房子
  eq(pins.filter(p => !p.locked).map(p => p.id), ['pin-dip', 'pin-home'], '開著的圖釘：本店與你家');
  eq((index.rooms || []).map(r => r.id + ':' + r.layout + ':' + r.pin), ['home:shops/home.json:pin-home'], 'index.json rooms＝你家');
  const ph = pins.find(p => p.id === 'pin-home');
  ok(ph && ph.hot.action === 'home' && ph.hot.label === '你家' && ph.icon === 'home', '你家的圖釘：動作 home、名牌「你家」、小房子圖示', ph);
  ok(Array.isArray(taipei.spots.home), '地圖 spots.home');
  ok(pins.filter(p => p.locked).every(p => p.hot.label === '？？？（還沒開）' && p.hot.action === 'locked'), '其他圖釘：？？？（還沒開）');
  ok(taipei.fictional === true, '地圖是示意');
});

// ---------- 活店（SPEC-H §12.2：LP1–LP7；棒 1 舞台）
const CROWD_IDS = ['c-rock', 'c-soul', 'c-citypop', 'c-world', 'c-elec', 'c-hiphop', 'c-classical', 'c-folk', 'c-listen', 'c-pay'];
section('LP7 r1 退役：actors 只剩老闆；spots.regular 留給活店結帳點 c-pay 與同業調貨攤站主', () => {
  eq(dip.actors.map(a => a.id), ['o'], 'actors 只有 o（熟客不站樁，SPEC-H §2.4）');
  eq(dip.spots.regular, [264, 224], 'spots.regular [264,224] 保留、名字不改');
  ok(typeof dip.regularNote === 'string' && /^r1 退役（SPEC-H）：這格現在是活店結帳點 c-pay 與同業調貨攤站主的位置/.test(dip.regularNote) && /照常理沒有客人會跑到櫃檯裡面/.test(dip.regularNote), 'regularNote：開頭寫 r1 退役，後面接原本的搬位紀錄', (dip.regularNote || '').slice(0, 60));
  ok(dip.hotspots.every(h => !h.follow || h.follow === 'o'), 'layout 的 follow 熱點只跟老闆（活店的人用執行期 addHot，不碰 check-shops「follow 的人要在 actors」）');
  const cp = dip.crowd.stops.find(x => x.id === 'c-pay');
  eq([cp.at, cp.kind, cp.back, cp.short, cp.hotPri, cp.pose], ['regular', 'pay', true, true, 3, undefined], 'c-pay：spots.regular、kind pay、背對、短停、熱點 pri 3、不擺 dig');
  // bad3（在 FIXLIST 1 那段）：spots.regular 放回 [272,168] → crowd.stops c-pay 站在 counter 後面的口袋裡；這裡再驗：r1 回來站口袋也照樣抓（actors 那條規則留著）
  const bad = JSON.parse(JSON.stringify(dip)); bad.spots.regular = [272, 168]; bad.actors.push({ id: 'r1', at: 'regular', sprite: 'girl', back: true });
  const r = CS.checkLayout(bad, 'shops/dip.json', lib, cards, content).problems;
  ok(r.some(p => /actors r1（regular \[272,168\]）站在 counter 後面的口袋裡/.test(p)) && r.some(p => /crowd\.stops c-pay（regular \[272,168\]）站在 counter 後面的口袋裡/.test(p)), '之後再有站樁的人站進口袋照樣抓（actors 規則留著）', r.filter(p => /口袋裡/.test(p)).slice(0, 3));
});

section('LP2 停留點（§4.1）：10 格、不在家具與口袋裡、離對決者／裁判／櫃檯後 ≥38×44、熱點不擋名牌封面', () => {
  const st = CS.crowdStops(dip), S = dip.spots, stand = k => propById(dip.props.find(o => o.bin && o.bin.key === k).id).bin.stand;
  eq(st.map(x => x.id), CROWD_IDS, '十格：中島兩側八箱＋試聽桌＋櫃檯前結帳');
  eq(st.map(x => [x.x, x.y]), [stand('rock'), stand('soul'), stand('citypop'), stand('world'), stand('elec'), stand('hiphop'), stand('classical'), stand('folk'), S.listen, S.regular], '座標全借 bin.stand 與 spots（不新增地板座標）');
  eq(st.map(x => x.side), ['left', 'left', 'left', 'left', 'right', 'right', 'right', 'right', 'left', 'right'], '左排 x<140、右排');
  eq(st.filter(x => x.short).map(x => x.id), ['c-listen', 'c-pay'], '短停：試聽桌、結帳');
  eq(st.filter(x => x.guestClear).map(x => x.id), ['c-listen'], '主線客人走路時保留：試聽桌');
  ok(st.filter(x => x.bin).every(x => x.pose === 'dig' && !x.kind), '八箱擺 dig');
  const obs = DS.navObstacles(dip), pk = DS.footprints(dip).filter(f => f.pocket).map(f => [f.id, f.pocket]);
  eq(pk.map(x => x[0]).sort(), ['counter', 'deck'], '口袋：櫃檯、唱盤台');
  for (const x of st) {
    ok(!obs.some(o => DS.inObs([x.x, x.y], o)), x.id + ' 不在家具裡（含避障邊）');
    ok(!pk.some(([, r]) => x.x > r[0] && x.x < r[0] + r[2] && x.y > r[1] && x.y < r[1] + r[3]), x.id + ' 不在任何口袋（客人不會跑到櫃檯裡面）');
    for (const k of CS.CROWD_KEEP_OFF) ok(Math.abs(S[k][0] - x.x) >= 38 || Math.abs(S[k][1] - x.y) >= 44, x.id + ' 離 ' + k + ' ≥38×44', [x.x, x.y, S[k]]);
  }
  for (const k of ['aisle', 'sale', 'radio', 'browse', 'pay', 'in', 'stSnack', 'stFortune', 'mid', 'leaving', 'door']) ok(!st.some(x => x.x === S[k][0] && x.y === S[k][1]), '不收 ' + k);
  // 跟著人走的熱點（24×28）吃掉既有熱點：非短停 ≤20 格（左排只吃自己那一箱一點點、右排 0）；短停列出來（試聽桌吃試聽機、結帳吃櫃檯，那 3–20 秒點那裡＝跟他聊）
  const rel = dip.crowd.hot.rel;
  eq(rel, [-12, -46, 24, 28], '熱點 rel（頭到腰）'); eq(dip.crowd.hot.minY, 150, 'minY 150');
  for (const x of st) {
    const m = CS.crowdSteal(DS, dip, [x.x, x.y], rel, x.hotPri ? { pri: x.hotPri } : null), worst = Math.max(0, ...Object.values(m));
    if (!x.short) ok(worst <= CS.CROWD_STEAL_MAX && Object.keys(m).every(h => x.bin && h === 'bin:' + x.bin), x.id + '：只吃自己那一箱、≤20 格', m);
    else if (x.id === 'c-listen') eq(Object.keys(m), ['booth'], 'c-listen 只吃試聽機（短停）');
    else eq(Object.keys(m), ['counter'], 'c-pay 只吃櫃檯（短停；NOW、貓照點得到）');
  }
  // 抓得到：收 aisle（主線客人與左排路人的進門走廊）、前排 JAZZ（離裁判太近、吃掉整箱熱點）、門口牆 PICKS（吃名牌封面）
  const add = (stop) => { const L = JSON.parse(JSON.stringify(dip)); L.crowd.stops.push(stop); return CS.checkLayout(L, 'shops/dip.json', lib, cards, content).problems; };
  ok(add({ id: 'c-aisle', at: 'aisle' }).some(p => /crowd\.guest\.in（主線客人的路）身體框碰到停留點 c-aisle/.test(p)), '收 aisle → 抓得到（主線客人進門會穿過他）');
  const pj = add({ id: 'c-jazz', bin: 'jazz', pose: 'dig' });
  ok(pj.some(p => /c-jazz（jazz \[119,272\]）離 ref/.test(p)) && pj.some(p => /c-jazz：站在這裡，頭上的熱點吃掉 bin:jazz/.test(p)), '收前排 JAZZ → 抓得到（離裁判太近、吃掉整箱）', pj.slice(0, 3));
  ok(add({ id: 'c-picks', bin: 'picks', pose: 'dig' }).some(p => /c-picks：站在這裡，頭上的熱點吃掉 rack:/.test(p)), '收門口牆 PICKS → 抓得到（吃牆上封面）');
  const bk = JSON.parse(JSON.stringify(dip)); bk.crowd.stops[0] = { id: 'c-rock', bin: 'rock', at: 'in' }; bk.crowd.stops.push({ id: 'c-rock', bin: 'soul' });
  const pb = CS.checkLayout(bk, 'shops/dip.json', lib, cards, content).problems;
  ok(pb.some(p => /c-rock：bin（站那一箱的 bin\.stand）與 at（spots 的一格）只能寫一個/.test(p)) && pb.some(p => /crowd\.stops：id 重複 c-rock/.test(p)), '抓得到 bin／at 都寫、id 重複', pb.slice(0, 3));
});

section('LP3 路線（§4.2、§4.3）：左排走 in、右排走後走道、跨排走上面；主線客人只碰試聽桌；老闆去裁判穿右排', () => {
  const st = CS.crowdStops(dip), obs = DS.navObstacles(dip), C = dip.crowd;
  const chain = (from, keys) => CS.crowdChain(DS, dip, from, keys, obs);
  const maxY = r => Math.max(...r.pts.map(q => q[1]));
  eq(C.via, { left: 'in', right: 'leaving', cross: ['mid', 'leaving'] }, 'via：左排 in、右排 leaving、跨排 mid→leaving');
  eq(C.guest, { in: ['in', 'frontleft', 'duelE'], out: ['frontleft', 'in', 'door', 'leave'] }, '主線客人：in→frontleft→duelE、出門反過來');
  for (const x of st) {
    const v = x.side === 'left' ? C.via.left : C.via.right, a = chain(C.door, [v, x.id]), b = chain(x.id, [v, C.door]);
    ok(a && maxY(a) <= CS.CROWD_MAX_Y && b && maxY(b) <= CS.CROWD_MAX_Y, '門↔' + x.id + '（經 ' + v + '）每一點 y ≤250', [a && maxY(a), b && maxY(b)]);
  }
  let worstCross = 0;
  for (const a of st) for (const b of st) if (a.side !== b.side) { const r = chain(a.id, (a.side === 'left' ? C.via.cross : C.via.cross.slice().reverse()).concat([b.id])); worstCross = Math.max(worstCross, r ? maxY(r) : 999); }
  ok(worstCross <= CS.CROWD_MAX_Y, '跨排一律走上面（mid／leaving）：每條 y ≤250', worstCross);
  // via 不能拿掉：不加 via 直走會從中島下面（唱盤區，主線客人站 duelE、你站 browse）繞到 y≈270
  for (const [a, b] of [['c-pay', 'in'], ['c-hiphop', 'c-soul']]) { const r = chain(a, [b]); ok(r && maxY(r) >= 260, a + '→' + b + ' 不加 via 直走會掉到 y≈270（提醒 via 不能拿掉）', r && r.pts.map(q => q.map(Math.round))); }
  // 右排的人走到對戰台（切磋邀請者）：leaving→mid→in→frontleft→duelE，走到 in 之前 y ≤250
  for (const x of st.filter(q => q.side === 'right')) { const r = chain(x.id, ['leaving', 'mid', 'in', 'frontleft', 'duelE']); ok(r && Math.max(...r.pts.slice(0, r.marks.in + 1).map(q => q[1])) <= CS.CROWD_MAX_Y, x.id + '→對戰台：走到 in 之前不從中島下面繞', r && r.pts.map(q => q.map(Math.round))); }
  // 主線客人（ui.js guestToTable、輸了出門讀 crowd.guest）身體框只碰 guestClear 的格（＝c-listen）；舊路（in→duelE）穿左排三格
  eq(CS.routeTouches(chain(C.door, C.guest.in).pts, st), ['c-listen'], '主線客人進門 door→in→frontleft→duelE：只碰 c-listen');
  eq(CS.routeTouches(chain('duelE', C.guest.out).pts, st), ['c-listen'], '主線客人輸了出門 duelE→frontleft→in→door→leave：只碰 c-listen');
  eq(CS.routeTouches(chain(C.door, ['in', 'duelE']).pts, st), ['c-soul', 'c-citypop', 'c-world', 'c-listen'], '（對照：舊路 in→duelE 會穿過左排三格）');
  // 老闆 counter→ref（每場開打、打完回櫃檯）身體框碰到的格（寫死：店面改了這條會紅，提醒去看 crowd.js clearDuel）
  eq(CS.routeTouches(chain('counter', ['ref']).pts, st), ['c-hiphop', 'c-classical', 'c-folk'], '老闆 counter→ref 穿 c-hiphop、c-classical、c-folk（clearDuel 要清）');
  eq(CS.routeTouches(chain('ref', ['counter']).pts, st), ['c-hiphop', 'c-classical', 'c-folk'], '老闆 ref→counter 同上');
  eq(CS.routeTouches(chain('counter', ['stSnack']).pts, st), ['c-rock', 'c-elec', 'c-listen'], '老闆去宵夜攤 counter→stSnack 穿 c-rock、c-elec、c-listen（攤位讓站主要清）');
  // 抓得到：跨排改走前面（frontleft）、主線客人走回舊路
  const p1 = (() => { const L = JSON.parse(JSON.stringify(dip)); L.crowd.via.cross = ['frontleft']; return CS.checkLayout(L, 'shops/dip.json', lib, cards, content).problems; })();
  ok(p1.some(p => /crowd 路線 c-rock→c-elec（跨排） 走到 y296/.test(p)), '跨排改從前面繞 → 抓得到 y>250', p1.slice(0, 2));
  const p2 = (() => { const L = JSON.parse(JSON.stringify(dip)); L.crowd.guest.in = ['in', 'duelE']; return CS.checkLayout(L, 'shops/dip.json', lib, cards, content).problems; })();
  ok(p2.some(p => /crowd\.guest\.in（主線客人的路）身體框碰到停留點 c-soul、c-citypop、c-world/.test(p)), '主線客人走回舊路 → 抓得到', p2);
});

section('LP4 停留點互斥表（§4.3：|dx|<38 且 |dy|<44 算撞）＝照座標算出來', () => {
  const st = CS.crowdStops(dip), hit = (a, b) => Math.abs(a[0] - b[0]) < 38 && Math.abs(a[1] - b[1]) < 44;
  const T = {}; for (const a of st) T[a.id] = st.filter(b => b !== a && hit([a.x, a.y], [b.x, b.y])).map(b => b.id);
  eq(T, { 'c-rock': ['c-soul', 'c-listen'], 'c-soul': ['c-rock', 'c-citypop', 'c-listen'], 'c-citypop': ['c-soul', 'c-world', 'c-listen'], 'c-world': ['c-citypop'],
    'c-elec': ['c-hiphop'], 'c-hiphop': ['c-elec', 'c-classical'], 'c-classical': ['c-hiphop', 'c-folk'], 'c-folk': ['c-classical'],
    'c-listen': ['c-rock', 'c-soul', 'c-citypop'], 'c-pay': [] }, '互斥表：同排相鄰 dy27 撞、試聽桌撞左排上三格、結帳不撞任何格');
  // 一排最多兩人（四格隔一格才不撞）
  for (const side of ['left', 'right']) {
    const ids = st.filter(x => x.side === side && x.bin).map(x => x.id); let best = 0;
    for (let m = 1; m < (1 << ids.length); m++) { const pick = ids.filter((_, i) => m & (1 << i)); if (pick.every(a => pick.every(b => a === b || !T[a].includes(b)))) best = Math.max(best, pick.length); }
    eq(best, 2, (side === 'left' ? '左' : '右') + '排四箱同時最多兩人');
  }
  const S = dip.spots;
  eq(st.filter(x => hit([x.x, x.y], S.browse)).map(x => x.id), ['c-classical', 'c-folk'], '你站 browse 擋掉 c-classical／c-folk');
  eq(st.filter(x => hit([x.x, x.y], S.pay)).map(x => x.id), ['c-hiphop', 'c-classical', 'c-folk'], '你站 pay 擋掉 c-hiphop／c-classical／c-folk');
  eq(st.filter(x => hit([x.x, x.y], S.radio)).map(x => x.id), ['c-elec'], '收音機 radio 擋掉 c-elec（openRadio 也要讓位）');
});

asection('LP6 舞台（stage.js）：hold 任何人、back、addHot、camRect、route、crowdStops／Via／Guest、finishAll 不收走動槽、unmount 清 w1–w3、onTapAny', async () => {
  const F = fakeShop(dip), { st, sw, flush } = await loadStage(F), obs = DS.navObstacles(dip);
  const xy = k => Array.isArray(k) ? k : dip.spots[k];
  F.api.routeImpl = (a, b) => DS.navRoute(dip, xy(a).slice(0, 2), xy(b).slice(0, 2), obs) || [];
  // crowdStops／Via／Guest：照 dip.json；是複本
  const cs = st.crowdStops();
  eq(cs.map(x => x.id), CROWD_IDS, 'crowdStops() 十格');
  eq(cs.find(x => x.id === 'c-pay'), { id: 'c-pay', x: 264, y: 224, side: 'right', pose: null, kind: 'pay', back: true, short: true, guestClear: false, hotPri: 3, bin: null, at: 'regular' }, 'c-pay：櫃檯前、背對、短停、pri 3');
  eq(cs.find(x => x.id === 'c-listen'), { id: 'c-listen', x: 54, y: 186, side: 'left', pose: null, kind: 'listen', back: false, short: true, guestClear: true, hotPri: 2, bin: null, at: 'listen' }, 'c-listen：試聽桌、短停、主線客人走路時保留');
  eq(cs.find(x => x.id === 'c-world'), { id: 'c-world', x: 86, y: 243, side: 'left', pose: 'dig', kind: 'dig', back: false, short: false, guestClear: false, hotPri: 2, bin: 'world', at: null }, 'c-world：WORLD 那箱的 stand、翻箱');
  eq(cs.map(x => [x.x, x.y]), CS.crowdStops(dip).map(x => [x.x, x.y]), '座標跟 check-shops 算的同一份');
  eq(st.crowdVia(), dip.crowd.via, 'crowdVia()'); eq(st.crowdGuest(), dip.crowd.guest, 'crowdGuest()');
  st.crowdGuest().in.push('zz'); st.crowdVia().cross.push('zz'); eq(st.crowdGuest().in, ['in', 'frontleft', 'duelE'], '回的是複本（改了不影響 layout）');
  eq(st.crowdConf().hot, { rel: [-12, -46, 24, 28], minY: 150 }, 'crowdConf().hot');
  // camRect：這支螢幕的鏡頭框（美術座標）；可視高 <600 自動換 stripS
  eq(st.camRect('strip'), { x: 0, y: 228, w: 292, h: 90, name: 'strip' }, 'camRect(strip)＠664 高');
  eq(st.camRect('full'), { x: 0, y: 0, w: 292, h: 322, name: 'full' }, 'camRect(full)');
  sw.innerHeight = 548; eq(st.camRect('strip'), { x: 0, y: 256, w: 292, h: 62, name: 'stripS' }, 'camRect(strip)＠548 高＝stripS');
  sw.innerHeight = 664;
  // route：含起點、逐段 navRoute（跟 walk 同一條）、可以給一串 keys、起點可以是人
  const S = dip.spots, CC = (from, keys) => CS.crowdChain(DS, dip, from, keys, obs).pts.map(q => q.slice(0, 2));
  eq(st.route('counter', 'ref'), CC('counter', ['ref']), 'route(counter, ref)＝[counter, …navRoute]');
  eq(st.route('door', ['in', 'frontleft', 'duelE']), CC('door', ['in', 'frontleft', 'duelE']), 'route(door, [in, frontleft, duelE])＝主線客人那條');
  st.put('o', 'counter', 'owner');
  eq(st.route('o', 'ref'), CC('counter', ['ref']), 'route(人, …)：從那個人現在的位置');
  eq(st.route([197, 243], [264, 224]), CC([197, 243], [[264, 224]]), 'route([x,y], [x,y])');
  eq(st.route('out', 'door'), [[S.out[0], S.out[1]], [S.door[0], S.door[1]]], '門外那段直走（跟 walk 一樣）');
  eq(st.route('nope', 'ref'), [], '起點不認得 → []');
  // hold：e／f／p／o 以外＝隨手拿著（carry）、不舉起、不記進 TT.held；p 照舊
  st.put('w1', [86, 243], { skin: 't' });
  const held0 = JSON.stringify(st.clashState().held);
  st.hold('w1', { sleeve: 'swans|filth' });
  eq([F.actors.w1.hold, F.actors.w1.arm], [{ carry: true, sleeve: 'swans|filth' }, null], "hold('w1', {sleeve})：carry、不舉起");
  eq(JSON.stringify(st.clashState().held), held0, 'hold(w1) 不記進唱盤區的 TT.held');
  st.hold('w2', 'ace'); eq(F.actors.w2.hold, { carry: true, ace: true }, "hold(w2, 'ace')");
  st.hold('w1', null); eq(F.actors.w1.hold, null, 'hold(w1, null) 放下');
  st.hold('p', { sleeve: 'radiohead|ok computer' }); eq(F.actors.p.arm, 'show', "hold('p') 照舊舉起（對決）");
  // back、addHot／removeHot 轉給 shop
  st.back('w1', true); st.back('w1', false);
  eq(F.log.filter(x => x[0] === 'back'), [['back', 'w1', true], ['back', 'w1', false]], 'back(id, on) 轉給 shop.back');
  const hot = { id: 'cw-w1', follow: 'w1', rel: [-12, -46, 24, 28], action: 'talk:xiaoyu', label: '小魚', pri: 2, noSparkle: true, minY: 150, noLabel: true };
  st.addHot(hot); st.removeHot('cw-w1');
  eq(F.log.filter(x => x[0] === 'addHot' || x[0] === 'removeHot'), [['addHot', hot], ['removeHot', 'cw-w1']], 'addHot／removeHot 轉給 shop');
  // finishAll 只收 p o f q1 q2：走動槽不快轉
  let wd = 0; st.walk('w1', ['browse']).then(() => wd++); st.walk('p', ['pay']);
  const n0 = F.log.length; st.finishAll(); await flush();
  ok(!F.log.slice(n0).some(x => x[0] === 'put' && x[1] === 'w1') && wd === 0, 'finishAll 不把走動槽 w1 放到終點（閒逛的人不快轉）', F.log.slice(n0));
  ok(F.log.slice(n0).some(x => x[0] === 'put' && x[1] === 'p'), 'finishAll 照收 p');
  // unmount：w1–w3 收泡泡與頭上圖示（姿勢不動，翻箱的照翻）
  const n1 = F.log.length; st.unmount();
  const um = F.log.slice(n1);
  for (const id of ['w1', 'w2', 'w3']) ok(um.some(x => x[0] === 'say' && x[1] === id && x[2] == null) && um.some(x => x[0] === 'emote' && x[1] === id && x[2] == null), 'unmount 收 ' + id + ' 的泡泡與圖示');
  ok(!um.some(x => x[0] === 'pose' && /^w/.test(x[1])), 'unmount 不動走動槽的姿勢');
  // onTapAny：shop 的每一下點擊轉給 stage.onTapAny（可以 mount 後再設）
  const got = []; st.onTapAny = (x, y, h) => got.push([x, y, h && h.id]);
  F.opts.onTapAny(10, 20, null); F.opts.onTapAny(30, 40, { id: 'bin:rock' });
  eq(got, [[10, 20, null], [30, 40, 'bin:rock']], 'onTapAny 照轉');
  st.onTapAny = null; F.opts.onTapAny(1, 1, null); eq(got.length, 2, '沒設就不叫');
});
// 真的 shop.js 掛在很小的假 DOM 上（canvas 只記不畫；跟 hit.test 同一招）：LP1 熱點、LP5 聊天泡泡、LP6 talk 與隨手拿著
const DOMLOG = [];
function fakeCtx2d() {
  const base = { measureText: t => ({ width: String(t).length * 7 }), createRadialGradient: () => ({ addColorStop() {} }), createLinearGradient: () => ({ addColorStop() {} }),
    getImageData() { throw new Error('no pixels'); }, isPointInPath: () => false, drawImage(cv) { if (cv && cv.tag) DOMLOG.push(['img', cv.tag]); } };
  return new Proxy(base, { get: (t, k) => (k in t ? t[k] : (typeof k === 'string' && /^[a-z]/.test(k) ? (t[k] = function () {}) : undefined)), set: (t, k, v) => { t[k] = v; return true; } });
}
function fakeEl(tag, W0) {
  const kids = [], cls = new Set(), lis = {}, attrs = {};
  const style = { setProperty(k, v) { style[k] = v; }, removeProperty(k) { delete style[k]; } };
  const el = {
    tagName: String(tag).toUpperCase(), style, dataset: {}, children: kids, parent: null, width: 0, height: 0, id: '', attrs, _text: '',
    classList: { add: (...a) => a.forEach(c => cls.add(c)), remove: (...a) => a.forEach(c => cls.delete(c)), toggle: (c, on) => { if (on === undefined ? !cls.has(c) : on) cls.add(c); else cls.delete(c); }, contains: c => cls.has(c) },
    set className(v) { cls.clear(); String(v).split(/\s+/).filter(Boolean).forEach(c => cls.add(c)); }, get className() { return [...cls].join(' '); },
    set innerHTML(v) { kids.length = 0; }, get innerHTML() { return ''; },
    set textContent(v) { kids.length = 0; el._text = String(v); }, get textContent() { return el._text + kids.map(k => k.textContent).join(''); },
    appendChild(c) { kids.push(c); c.parent = el; return c; }, insertBefore(c) { kids.push(c); c.parent = el; return c; },
    remove() { if (el.parent) { const i = el.parent.children.indexOf(el); if (i >= 0) el.parent.children.splice(i, 1); el.parent = null; } },
    setAttribute(k, v) { attrs[k] = String(v); }, getAttribute(k) { return attrs[k]; }, getContext: () => fakeCtx2d(),
    addEventListener(t, f) { (lis[t] = lis[t] || []).push(f); }, removeEventListener() {}, dispatch(t, ev) { (lis[t] || []).forEach(f => f(ev || {})); },
    getBoundingClientRect: () => ({ left: 0, top: 0, x: 0, y: 0, width: W0 || 0, height: 0, right: W0 || 0, bottom: 0 }),
    get clientWidth() { return W0 || 0; },
    // 泡泡的大小：聊天泡泡＝max-width 那麼寬、64 高（3 行＋名字行），其他 40×20
    get offsetWidth() { return cls.has('chat') ? (parseFloat(style.maxWidth) || 150) : 40; }, get offsetHeight() { return cls.has('chat') ? 64 : 20; },
    animate: () => ({ cancel() {} })
  };
  return el;
}
const ROWS = Array.from({ length: 16 }, (_, j) => (j < 2 ? '.'.repeat(16) : '....kkkkkkkk....'));
let rafQ = [], TS = 0;
function frames(n, ms = 100) { for (let i = 0; i < n; i++) { TS += ms; const q = rafQ; rafQ = []; q.forEach(f => f(TS)); } }
function installDom() {
  globalThis.document = { createElement: t => fakeEl(t), addEventListener() {}, removeEventListener() {}, hidden: false };
  globalThis.window = globalThis.window || {};
  globalThis.Image = function () { this.onload = null; this.onerror = null; this.src = ''; };
  globalThis.requestAnimationFrame = f => { rafQ.push(f); return rafQ.length; };
  globalThis.cancelAnimationFrame = () => {};
  globalThis.devicePixelRatio = 1;
  globalThis.location = globalThis.location || { search: '', href: 'http://localhost/game-lab/' };
}
function mountReal(opts, W0) { const host = fakeEl('div', W0 || 390); return DS.mount(host, JSON.parse(JSON.stringify(dip)), Object.assign({ cards, sprites: { owner: ROWS, girl: ROWS }, sparkle: false }, opts || {})); }
const HOT = (who, slot, pri) => ({ id: 'cw-' + slot, follow: slot, rel: dip.crowd.hot.rel.slice(), action: 'talk:' + who, label: who === 'passer' ? '客人' : who, pri: pri || 2, noSparkle: true, minY: dip.crowd.hot.minY, noLabel: true });
const tapAt = (shop, x, y) => { const v = shop.view(), ev = { clientX: (x + 0.5) * v.scale, clientY: (y - v.y + 0.5) * v.scale, pointerType: 'touch' }; shop.canvas.dispatch('pointerdown', ev); shop.canvas.dispatch('pointerup', ev); };

asection('LP1 addHot／removeHot（真 shop.js）：進出 hotspots()、跟著人走、腳底 y<150 時 gone、noLabel、結帳時壓過櫃檯', async () => {
  installDom();
  const acts = [];
  const shop = mountReal({ onAction: (a, h) => acts.push([a, h.id]) });
  const idOf = h => (h ? h.id : null);
  shop.put('o', 'counter', 'owner');
  shop.put('w1', [86, 243], 'girl');
  shop.addHot(HOT('xiaoyu', 'w1'));
  let h = shop.hotspots().find(x => x.id === 'cw-w1');
  ok(h && h.dyn && h.follow === 'w1' && !h.gone && h.action === 'talk:xiaoyu' && h.label === 'xiaoyu', 'addHot：hotspots() 列得到（dyn、follow、gone）', h);
  eq(h && h.rect, [74, 197, 24, 28], '熱點＝腳底 [86,243]＋rel [-12,-46,24,28]');
  eq(h && h.depth, 243.5, '深度＝那個人的 y＋0.5');
  eq(idOf(shop.pick(86, 210)), 'cw-w1', '點他的胸口＝聊天熱點');
  ok(shop.hotPoints().some(p => p.id === 'cw-w1'), 'hotPoints 有他（e2e 真點得到）');
  shop.put('w1', [197, 189]);
  eq(shop.hotspots().find(x => x.id === 'cw-w1').rect, [185, 143, 24, 28], '換站：熱點跟著走');
  shop.put('w1', [62, 127]);   // 進門走廊（特價箱、INDIE ROCK 前）
  h = shop.hotspots().find(x => x.id === 'cw-w1');
  ok(h.gone && idOf(shop.pick(62, 100)) !== 'cw-w1' && !shop.hotPoints().some(p => p.id === 'cw-w1'), '腳底 y127 < minY 150 → gone（點不到、hotPoints 沒有）', h);
  shop.put('w1', [86, 150]); ok(!shop.hotspots().find(x => x.id === 'cw-w1').gone, '腳底 y150 → 點得到（停留點最高 y162）');
  shop.hide('w1', true); ok(shop.hotspots().find(x => x.id === 'cw-w1').gone, '藏起來 → gone');
  shop.put('w1', [86, 243]);
  // 真點：放開＝onAction(talk:xiaoyu)；noLabel：不浮名牌（名字寫在泡泡第一行）
  const before = shop.overlay.children.length; tapAt(shop, 86, 210);
  eq(acts.pop(), ['talk:xiaoyu', 'cw-w1'], '真點他＝onAction(talk:xiaoyu)');
  ok(!shop.overlay.children.some(c => c.className.includes('ds-label')), 'noLabel：點到不浮名牌', shop.overlay.children.map(c => c.className));
  shop.reveal(800); ok(!shop.overlay.children.some(c => c.className.includes('ds-label') && c.textContent === 'xiaoyu'), 'noLabel：reveal 也不浮他的名牌');
  ok(shop.overlay.children.some(c => c.className.includes('ds-label') && c.textContent === '搖滾'), '（對照：reveal 照樣浮箱子的名牌）');
  // 同 id 再加＝換掉；跟 layout 熱點同 id → 不加
  shop.addHot(Object.assign(HOT('akai', 'w1'), {}));
  eq(shop.hotspots().filter(x => x.id === 'cw-w1').map(x => x.action), ['talk:akai'], '同 id 再加＝換掉（不重複）');
  const warns = [], cw = console.warn; console.warn = (...a) => warns.push(a.join(' '));
  shop.addHot({ id: 'owner', follow: 'w1', rel: [0, 0, 4, 4], action: 'talk:x', label: 'x' }); console.warn = cw;
  eq(shop.hotspots().filter(x => x.id === 'owner').length, 1, '跟 layout 熱點同 id → 不加（console.warn）');
  ok(warns.some(w => /addHot: id 跟 layout 的熱點重複 owner/.test(w)), 'warn 有寫是哪個 id', warns);
  shop.removeHot('cw-w1');
  ok(!shop.hotspots().some(x => x.id === 'cw-w1') && idOf(shop.pick(86, 210)) !== 'cw-w1', 'removeHot：hotspots() 沒有、點不到');
  // 結帳（c-pay＝spots.regular、pri 3）：熱點整塊在櫃檯熱點裡，點他＝聊；腿（櫃檯熱點下面、容錯）也是他；櫃檯左半照樣是櫃檯
  shop.put('w2', 'regular', 'girl'); shop.back('w2', true); shop.addHot(HOT('afang', 'w2', 3));
  eq(shop.hotspots().find(x => x.id === 'cw-w2').rect, [252, 178, 24, 28], 'c-pay 的熱點 [252,178,24,28]（在櫃檯 [212,178,72,28] 裡）');
  for (const [x, y] of [[264, 192], [253, 180], [275, 204], [264, 212], [258, 222]]) eq(idOf(shop.pick(x, y)), 'cw-w2', '站櫃檯前結帳：點 (' + x + ',' + y + ')＝跟他聊（壓過櫃檯，含容錯）');
  for (const [x, y] of [[220, 192], [236, 200], [246, 185]]) eq(idOf(shop.pick(x, y)), 'counter', '櫃檯左半 (' + x + ',' + y + ')＝櫃檯');
  shop.removeHot('cw-w2'); eq(idOf(shop.pick(264, 192)), 'counter', '他走了：那裡又是櫃檯');
  shop.destroy();
});

asection('LP5 聊天泡泡（真 shop.js）：只有 more 吃點擊、名字行、窄螢幕 150／摘句 220、quote＋出處、夾在舞台框內、蓋到封面過半改放旁邊、onTapAny 每一下', async () => {
  installDom();
  const any = [], acts = [];
  const shop = mountReal({ onAction: (a, h) => acts.push(a), onTapAny: (x, y, h) => any.push([x, y, h ? h.id : null]) });
  shop.put('w1', [86, 243], 'girl');
  const kids = el => el.children.map(c => [c.className, c.textContent]);
  let n = 0;
  const el = shop.say('w1', '這箱有張封面我盯好久了', { chat: true, who: '小魚', more: true, onTap: () => n++ });
  ok(el.classList.contains('ds-say') && el.classList.contains('chat') && el.classList.contains('more'), '有下一句：.ds-say.chat.more（CSS 只讓 .more 吃點擊）', el.className);
  eq(kids(el), [['who', '小魚'], ['tx', '這箱有張封面我盯好久了'], ['nx', '▼']], '第一行名字、字、右下角 ▼');
  eq([el.getAttribute('role'), el.getAttribute('aria-live'), el.getAttribute('tabindex')], ['status', 'polite', '0'], 'role=status、aria-live=polite、可以 Tab 到');
  el.dispatch('click', { stopPropagation() {}, preventDefault() {} }); eq(n, 1, '點泡泡＝onTap（下一句）');
  el.dispatch('keydown', { key: 'Enter', stopPropagation() {}, preventDefault() {} }); el.dispatch('keydown', { key: ' ', stopPropagation() {}, preventDefault() {} }); el.dispatch('keydown', { key: 'a' });
  eq(n, 3, 'Enter／空白鍵＝下一句；其他鍵不算');
  eq(el.style.maxWidth, '150px', '舞台寬 ≤400（390）：max-width 150');
  let closed = 0;
  const el2 = shop.say('w1', '下次見。', { chat: true, who: '小魚', onClose: () => closed++ });
  ok(!shop.overlay.children.includes(el), '同一個人的新泡泡換掉舊的');
  ok(!el2.classList.contains('more') && !el2.children.some(c => c.className === 'nx') && el2.getAttribute('tabindex') === undefined, '最後一句：沒有 more、沒有 ▼、不吃點擊（點下去落到底下的封面）', el2.className);
  shop.say('w1', null); eq(closed, 1, 'say(id, null) 收掉 → onClose 一次');
  const el3 = shop.say('w1', '那張專輯是她在家裡自己錄的', { chat: true, who: '周姐', quote: true, src: '藝人介紹・某某', more: true, onTap() {} });
  eq(kids(el3), [['who', '周姐'], ['tx', '「那張專輯是她在家裡自己錄的」'], ['src', '藝人介紹・某某'], ['nx', '▼']], '行家摘句：字外加「」、下緣一行出處');
  ok(el3.classList.contains('quote') && el3.style.maxWidth === '220px', '摘句 max-width 220', el3.style.maxWidth);
  const plain = shop.say('o', '歡迎。');
  ok(!plain.classList.contains('chat') && !plain.classList.contains('more') && plain.textContent === '歡迎。' && !plain.style.maxWidth, '一般泡泡照舊（沒有 chat／more、不吃點擊、寬照現行）', plain.className);
  // 位置：每個停留點的頭頂泡泡，算它蓋到 bin:*／rack:*／poster:*／feature／sale 熱點的最大比例；>0.5 而且放得下的那一邊擋得比較少
  //   （蓋過半的熱點個數少，一樣多比總面積）→ .side，否則頭頂（店裡箱子很密：中島旁的人頭頂和旁邊常常都蓋過半，換到旁邊不能反而擋更多）；而且整個在舞台框內
  const v = shop.view(), OW = 292 * v.scale, OH = v.h * v.scale, hs = shop.hotspots().filter(x => /^(bin:|rack:|poster:)/.test(x.id) || x.id === 'feature' || x.id === 'sale');
  const cov = r => { let fr = 0, ar = 0, n = 0; for (const x of hs) { const q = x.rect, X = q[0] * v.scale, Y = (q[1] - v.y) * v.scale, w = q[2] * v.scale, hh = q[3] * v.scale, a = Math.max(0, Math.min(r[0] + r[2], X + w) - Math.max(r[0], X)) * Math.max(0, Math.min(r[1] + r[3], Y + hh) - Math.max(r[1], Y)); fr = Math.max(fr, a / (w * hh)); if (a / (w * hh) > 0.5) n++; ar += a; } return { fr, ar, n }; };
  const less = (a, b) => a.n !== b.n ? a.n < b.n : a.ar < b.ar, NONE = { n: Infinity, ar: Infinity };
  let sides = 0, tops = 0; const table = [];
  for (const x of CS.crowdStops(dip)) {
    shop.put('w1', [x.x, x.y]);
    const b = shop.say('w1', '一二三四五六七八九十一二三四五六七八九十一二三四五六七八', { chat: true, who: '阿凱' });
    const W = 150, H = 64, left = parseFloat(b.style.left), top = parseFloat(b.style.top), sh = parseFloat(b.style['--shift'] || '0');
    const headY = (x.y - 39 - v.y) * v.scale, cx = x.x * v.scale, sh0 = (() => { const l = cx - W / 2; return l < 2 ? 2 - l : l + W > OW - 2 ? (OW - 2) - (l + W) : 0; })();
    const rX = (x.x + 24) * v.scale + 6, lX = (x.x - 24) * v.scale - 6, mY = Math.min(Math.max((x.y - 30 - v.y) * v.scale, H / 2 + 2), OH - H / 2 - 2);
    const cR = rX + W <= OW - 2 ? cov([rX, mY - H / 2, W, H]) : NONE, cL = lX - W >= 2 ? cov([lX - W, mY - H / 2, W, H]) : NONE, bestS = less(cL, cR) ? cL : cR;
    const topRect = [cx + sh0 - W / 2, headY - 7 - H, W, H], cT = cov(topRect), want = headY - H - 8 < 2 || (cT.fr > 0.5 && less(bestS, cT));
    table.push(x.id + ' 頭頂蓋過半 ' + cT.n + ' 個' + (b.classList.contains('side') ? '→旁邊 ' + bestS.n + ' 個' : ''));
    eq(b.classList.contains('side'), want, x.id + '：頭頂蓋過半 ' + cT.n + ' 個（最多 ' + Math.round(cT.fr * 100) + '%）、旁邊 ' + [cR.n, cL.n].join('／') + ' 個' + (want ? ' → 放身體旁' : ' → 頭頂'));
    const R = b.classList.contains('side') ? (b.classList.contains('sl') ? [left - W, top - H / 2, W, H] : [left, top - H / 2, W, H]) : [left + sh - W / 2, top - 7 - H, W, H];
    ok(R[0] >= 0 && R[1] >= 0 && R[0] + R[2] <= OW + 0.5 && R[1] + R[3] <= OH + 0.5, x.id + '：泡泡整個在舞台框內', R.map(Math.round));
    if (b.classList.contains('side')) { sides++; if (headY - H - 8 >= 2) ok(less(cov(R), cT), x.id + '：放旁邊擋得比頭頂少', [cov(R), cT]); } else tops++;
  }
  ok(sides > 0 && tops > 0, '兩種都有出現（頭頂 ' + tops + '、旁邊 ' + sides + '）', table);
  if (process.argv.includes('--bubbles')) console.log('  ' + table.join('；'));
  shop.put('w1', [86, 162]);
  ok(!shop.say('w1', '二二', { chat: true, who: '阿凱', sideIfCover: 2 }).classList.contains('side'), 'sideIfCover 2（永不）→ 頭頂（機制可以關）');
  // onTapAny：每一下點擊都通知（沒點中熱點也算），點中的照常 onAction；拖曳不算
  shop.say('w1', null); any.length = 0; acts.length = 0;
  let empty = null; for (const [x, y] of [[150, 140], [140, 128], [120, 145], [260, 300], [10, 320]]) if (!shop.pick(x, y)) { empty = [x, y]; break; }
  ok(empty, '找到一個沒熱點的地方', empty);
  if (empty) { tapAt(shop, empty[0], empty[1]); eq(any.map(a => a[2]), [null], '點空地：onTapAny(x, y, null)'); eq(acts, [], '點空地：沒有 onAction'); }
  const bp = shop.hotPoints().find(p => p.id === 'bin:hiphop');
  shop.canvas.dispatch('pointerdown', { clientX: bp.x, clientY: bp.y, pointerType: 'touch' }); shop.canvas.dispatch('pointerup', { clientX: bp.x, clientY: bp.y, pointerType: 'touch' });
  eq(any.map(a => a[2]), [null, 'bin:hiphop'], '點箱子：onTapAny 先通知（hit＝那個熱點）'); eq(acts, ['crate:hiphop'], '那一下照常生效（走去翻）');
  shop.canvas.dispatch('pointerdown', { clientX: bp.x, clientY: bp.y, pointerType: 'touch' }); shop.canvas.dispatch('pointerup', { clientX: bp.x + 40, clientY: bp.y, pointerType: 'touch' });
  eq(any.length, 2, '拖曳（移動超過 tapTol）不算一下點擊');
  // 寬螢幕（舞台 >400）：260（摘句也 260）
  shop.destroy();
  const wide = mountReal({}, 500); wide.put('w1', [86, 243], 'girl'); wide.put('w2', [197, 243], 'girl');
  eq([wide.say('w1', '一句話', { chat: true, who: '阿凱' }).style.maxWidth, wide.say('w2', '摘句', { chat: true, who: '周姐', quote: true, src: '藝人介紹・某某' }).style.maxWidth], ['260px', '260px'], '舞台寬 >400：聊天泡泡 260（摘句也 260）');
  // chat 的 ms：到時自動收、不除動畫速度；沒給 ms＝不自動收
  const sp = mountReal({ speed: () => 4 }); sp.put('w1', [86, 243], 'girl'); sp.put('w2', [197, 243], 'girl'); sp.put('o', 'counter', 'owner');
  sp.say('w1', '停久一點', { chat: true, who: '阿凱', ms: 120 }); sp.say('w2', '不收', { chat: true, who: '大頭' }); sp.say('o', '老闆的話', { ms: 120 });
  await new Promise(r => setTimeout(r, 60));
  const sayIds = () => sp.overlay.children.filter(c => c.className.includes('ds-say')).map(c => c.textContent);
  ok(sayIds().some(t => /停久一點/.test(t)) && !sayIds().includes('老闆的話'), '動畫 ×4：一般泡泡 120÷4 已收、聊天泡泡還在（不吃動畫加速）', sayIds());
  await new Promise(r => setTimeout(r, 120));
  ok(!sayIds().some(t => /停久一點/.test(t)) && sayIds().some(t => /不收/.test(t)), 'chat ms 120 到時收；沒給 ms 的不自動收', sayIds());
  sp.destroy(); wide.destroy();
});

asection('LP6 talk 與隨手拿著（真 shop.js＋DipLabChars 樁）：pose talk 對到 talk 格、carry 不強迫正面、背對時畫在身體後面、back(id,on)', async () => {
  installDom();
  const drawn = [];
  const CH = { POSES: { idle: 2, walk: 2, throw: 2, hurt: 2, ko: 1, cheer: 2, dig: 2, hold: 1, point: 1, sit: 1, talk: 2 }, DIRS: ['front', 'back', 'side'], ARM: { show: ['hold', 0], wind: ['throw', 0] },
    render: () => ({ h: 17, y: 0 }), npc: () => ({}), normalize: s => s, anchor: () => [6, -20],
    toCanvas: (spec, pose, frame, o) => { drawn.push([pose, frame, o.dir]); return { width: 30, height: 52, ax: 15, ay: 48, tag: (spec.tag || '?') + ':' + pose + ':' + o.dir } } };
  const W0 = globalThis.window; globalThis.window = Object.assign({}, W0, { DipLabChars: CH });
  try {
    const holds = [];
    const shop = mountReal({ holdDraw: (P, a) => { holds.push(a.id); DOMLOG.push(['hold', a.id]); } });
    shop.put('w1', [86, 243], { tag: 'w1', skin: 't' });
    shop.pose('w1', 'talk'); drawn.length = 0; shop.setTime(10); shop.setTime(10.5); shop.setTime(11); shop.setTime(11.5);
    ok(drawn.some(d => d[0] === 'talk' && d[2] === 'front'), "pose('talk') → DipLabChars 的 talk 格（正面）", drawn);
    eq([...new Set(drawn.filter(d => d[0] === 'talk').map(d => d[1]))].sort(), [0, 1], 'talk 兩格輪著換（每 0.5 秒）');
    shop.setTime(null); shop.pose('w1', null);
    // carry：走路照轉向（往上走＝背面），不像對決拿封套一律正面
    shop.hold('w1', { sleeve: 'swans|filth', carry: true });
    frames(1); shop.walk('w1', [[86, 162]]); frames(3);
    eq(shop.pos('w1').dir, 'back', '隨手拿著往上走：背面（照走路轉向）');
    shop.put('w1', [86, 243]); shop.hold('w1', { sleeve: 'swans|filth' }); shop.walk('w1', [[86, 162]]); frames(3);
    eq(shop.pos('w1').dir, 'front', '（對照：對決那種拿法一律正面）');
    shop.put('w1', [86, 243]); shop.hold('w1', null);
    // back(id, on)：站著也背對；拿著東西也維持背面；on=false 回正面
    shop.back('w1', true); frames(2); eq(shop.pos('w1').dir, 'back', 'back(w1, true)：背對鏡頭');
    shop.hold('w1', { sleeve: 'swans|filth', carry: true }); eq(shop.pos('w1').dir, 'back', '背對時拿著東西也維持背面（結帳把唱片遞給老闆）');
    DOMLOG.length = 0; shop.render();
    const iImg = DOMLOG.findIndex(d => d[0] === 'img' && /^w1:/.test(d[1])), iHold = DOMLOG.findIndex(d => d[0] === 'hold' && d[1] === 'w1');
    ok(iHold >= 0 && iImg >= 0 && iHold < iImg, '背對時手上那張畫在身體後面（先畫唱片、再畫人）', DOMLOG.slice(0, 8));
    shop.back('w1', false); frames(1); DOMLOG.length = 0; shop.render();
    const jImg = DOMLOG.findIndex(d => d[0] === 'img' && /^w1:/.test(d[1])), jHold = DOMLOG.findIndex(d => d[0] === 'hold' && d[1] === 'w1');
    ok(jHold > jImg && jImg >= 0, 'back(w1, false)：正面時唱片畫在身體前面', DOMLOG.slice(0, 8));
    eq(shop.pos('w1').dir, 'front', 'back(w1, false)：回正面');
    shop.destroy();
  } finally { globalThis.window = W0; }
});

for (const [name, fn] of asections) { const f0 = fail; try { await fn(); } catch (e) { fail++; fails.push(name + ' threw: ' + (e.stack || e)); } console.log((fail === f0 ? 'ok  ' : 'FAIL') + ' ' + name); }

if (process.argv.includes('--routes')) for (const [a, b, len, sec, lim] of routeTimes.filter(r => !(String(r[0]).startsWith('bin:') && String(r[1]).startsWith('bin:')))) console.log('  ' + (a + '→' + b).padEnd(24) + String(len).padStart(4) + ' 格 ' + sec.toFixed(2) + ' s（≤' + lim + '）');
console.log('\n' + pass + ' passed, ' + fail + ' failed');
if (fail) { fails.forEach(f => console.log('  ✗ ' + f)); process.exit(1); }
