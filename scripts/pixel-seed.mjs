#!/usr/bin/env node
// 把現有的唱片行舞台（stage-preview.html 的圖層、站位、小人；roguelike.html 的序章對白）
// 轉成像素工坊的 JSON（art/pixel/），讓編輯器一打開就有現成的場景可以改。
//
// 一次性的種子腳本：art/pixel/ 已經有內容時不會覆蓋（加 --force 才會）。
// 之後的改動一律在編輯器或直接改 JSON，然後跑 scripts/pixel-index.mjs 重建 index.json。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'art', 'pixel');
const force = process.argv.includes('--force');

// ── 從 dip-character.js 借小人零件（不執行它的預覽站重置 IIFE：location.hostname 給假的就會提早 return）
const charSrc = fs.readFileSync(path.join(ROOT, 'dip-character.js'), 'utf8');
const stub = { hostname: 'localhost' };
const lib = new Function('window', 'location', 'document', 'localStorage', 'sessionStorage', 'indexedDB',
  charSrc + '\n;return { PIX_PAL, SPR_BODY, sprRows, AVATAR_HEADS, avatarRows };')({}, stub, { addEventListener(){} }, {}, {}, {});

const now = Date.now();
const pixel = (id, name, rows, extra) => Object.assign({ id, name, kind:'pixel', w: rows[0].length, h: rows.length,
  palette: { ...lib.PIX_PAL }, frames:[rows], anchor:{ x:8, y:15 }, tags:['小人'], notes:'', updatedAt: now }, extra);
const image = (id, name, frames, w, h, extra) => Object.assign({ id, name, kind:'image', w, h, frames,
  anchor:{ x: Math.floor(w/2), y: h }, tags:['圖檔'], notes:'', updatedAt: now }, extra);

// ── 物件
const objects = [
  pixel('owner', '老闆', lib.sprRows(['................','.....dddddd.....','....dddddddd....','....dssssssd....','....ekkeekke....','....sdssssds....','.....dddddd.....'],
      'w','d',{8:'...wnnnnnnnnw...',9:'...snnnnnnnns...',10:'...snnnnnnnns...',11:'....nnnnnnnn....'}),
    { notes:'唱片行老闆。灰髮、眼鏡、白上衣、綠圍裙。與 stage-preview.html 的 SPRITES.owner 同一份；腳點 (8,15)＝鞋底。' }),
  pixel('player', '玩家（預設造型）', lib.avatarRows({ head:'neat', hair:'k', shirt:'b', pants:'k', skin:'s' }),
    { notes:'玩家的替身。實際遊戲裡玩家的造型來自捏角色（avatarRows(META.avatar)），這一個只是場景排位用的預設樣子。' }),
  pixel('foe', '男子', lib.sprRows(['.....gggggg.....','.....kkkkkk.....','....kkkkkkkk....','...gksssssskg...','...gssksskssg...','....ssssssss....','.....ssssss.....'],'w','b'),
    { notes:'序章裡推門進來嗆聲的男子（金耳機、黑髮、白上衣、藍褲）。' }),
  image('shop2-door', '門', ['art/shop2-door-0.png','art/shop2-door-1.png','art/shop2-door-2.png'], 192, 426,
    { tags:['圖檔','門'], notes:'三格＝關／半開／全開。門洞在場景邏輯座標 x 12–86、y 156–325，放場景時 scale 0.4。' }),
  image('shop2-fg-back', '前景後層（櫃檯＋器材＋右邊唱片櫃）', ['art/shop2-fg-back.png'], 1120, 1231,
    { tags:['圖檔','圖層'], notes:'整張前景圖。放場景時 scale 0.4、depth 401.5：腳底 y < 402 的小人排在它後面（＝站櫃檯後面被檯身擋住）。' }),
  image('shop2-fg-front', '前景前層（折疊長桌＋木箱＋黑籃）', ['art/shop2-fg-front.png'], 1120, 1231,
    { tags:['圖檔','圖層'], notes:'整張前景圖。放場景時 scale 0.4、depth 457.5：腳底 y < 458 的小人排在它後面。' }),
  image('table', '折疊長桌', ['art/props/table.png'], 850, 540, { tags:['圖檔','道具'], notes:'scripts/make-table.py 產的；150×70cm，原圖 5.5 px/cm，放進 448 邏輯寬的場景 scale 約 0.25。' }),
  image('crate-wood', '木箱（PROGRESSIVE ROCK）', ['art/props/crate-wood.png'], 382, 250, { tags:['圖檔','道具'] }),
  image('crate-wood-2', '木箱（SOUL / FUNK）', ['art/props/crate-wood-2.png'], 382, 250, { tags:['圖檔','道具'] }),
  image('crate-black', '黑色塑膠籃 1', ['art/props/crate-black.png'], 261, 228, { tags:['圖檔','道具'] }),
  image('crate-black-2', '黑色塑膠籃 2', ['art/props/crate-black-2.png'], 261, 228, { tags:['圖檔','道具'] }),
  image('crate-black-3', '黑色塑膠籃 3', ['art/props/crate-black-3.png'], 261, 228, { tags:['圖檔','道具'] }),
  image('crate-new', 'NEW ARRIVALS 木箱', ['art/props/crate-new.png'], 206, 228, { tags:['圖檔','道具'], notes:'店主決定不用，留著備用。' }),
  image('crate-new-wide', 'NEW ARRIVALS 木箱（寬）', ['art/props/crate-new-wide.png'], 382, 250, { tags:['圖檔','道具'], notes:'店主決定不用，留著備用。' }),
  image('box-a', '紙箱 A', ['art/props/box-a.png'], 444, 426, { tags:['圖檔','道具'], notes:'店主另外畫的整個紙箱、已去背。' }),
  image('box-b', '紙箱 B', ['art/props/box-b.png'], 434, 463, { tags:['圖檔','道具'], notes:'店主另外畫的整個紙箱、已去背（備用）。' }),
];

// ── 場景：stage-preview.html 的座標契約（邏輯 448×492）
const SPR = 4.875;                         // 16 格 → 78px，跟 stage-preview 的 SVG=78 一樣
const place = (obj, cx, footY) => ({ x: +(cx - obj.anchor.x*SPR).toFixed(3), y: +(footY - obj.anchor.y*SPR).toFixed(3) });
const byId = Object.fromEntries(objects.map(o => [o.id, o]));
const A = (group, name, x, y) => ({ name, group, x, y });
// 與 roguelike.html 的 RPG_POS 一字不差（名字對得上，劇本才能兩邊互貼）
const anchors = [
  A('p','door',48,408), A('p','browse',136,458), A('p','pay',168,430), A('p','leaving',132,418), A('p','atdoor',128,420),
  A('o','counter',174,325), A('o','aisle',72,345), A('o','frontleft',74,424),
  A('o','dig1',196,432), A('o','dig2',228,420), A('o','dig3',210,440), A('o','between',85,452),
  A('f','out',42,336), A('f','door',42,344), A('f','in',42,396),
];
const item = (iid, obj, name, x, y, scale, extra) => Object.assign({ iid, obj, name, x, y, scale, flip:false, layer:'auto', depth:null, role:'', frame:0, hidden:false, lock:false }, extra);
const po = place(byId.owner, 174, 325), pp = place(byId.player, 48, 408), pf = place(byId.foe, 42, 336);
const scene = {
  id:'shop2', name:'巷子裡的唱片行', w:448, h:492, bg:{ src:'art/shop2-bg.jpg' },
  items:[
    item('door', 'shop2-door', '門', 12, 155, 0.4, { layer:'back', lock:true }),
    item('fgback', 'shop2-fg-back', '前景後層', 0, 0, 0.4, { depth:401.5, lock:true }),
    item('fgfront', 'shop2-fg-front', '前景前層', 0, 0, 0.4, { depth:457.5, lock:true }),
    item('owner', 'owner', '老闆', po.x, po.y, SPR, { role:'o' }),
    item('player', 'player', '玩家', pp.x, pp.y, SPR, { role:'p' }),
    item('foe', 'foe', '男子', pf.x, pf.y, SPR, { role:'f', hidden:true }),
  ],
  anchors,
  notes:[
    '描自 art/ref-shop.jpg（scripts/trace-shop-art.py），邏輯 448×492 ＝ 原圖 ÷4；圖層檔是 2.5× 所以 scale 0.4。',
    '座標契約：牆／地板交界 y=325；門洞 x 12–86、y 156–325；櫃檯 x 102–307、檯面上緣 y=299、檯身下緣 400；',
    '前景後層 depth 401.5（腳底 <402 在它後面）、前景前層 depth 457.5（腳底 <458 在它後面）——跟 stage-preview.html 的 zOf 同一個門檻。',
    '老闆翻片一律站桌子左端（dig1–3），腳底 ≥402 才不會掉到櫃子後面。走回櫃檯要走 frontleft → aisle → counter 三段，直線會穿櫃檯。',
  ].join('\n'),
  updatedAt: now,
};

// ── 劇本：roguelike.html 的 RPG_BEATS 一字不差（2026-09-08 換進描圖舞台那版；站位名、oPath、door 語彙相同）
const story = {
  id:'prologue', name:'序章 · 巷子裡的唱片行', scene:'shop2',
  beats:[
    { who:'', text:'下著雨。你推開巷子裡那間唱片行的門。門上的鈴鐺，響了一聲。', stage:{ p:'door', o:'counter', f:'out', door:'swing' } },
    { who:'', text:'櫃檯後面的老闆抬頭看了你一眼，又低下頭，繼續整理手上的唱片。', stage:{ oBusy:true } },
    { who:'', text:'你自己逛自己的。一排排的黑膠，大部分連名字都沒看過。', stage:{ p:'browse' } },
    { who:'', text:'這時候，店裡的音響傳出一段旋律。', stage:{ notes:true, oBusy:false } },
    { who:'', text:'……很迷人。你停下腳步，不自覺跟著點起頭來。' },
    { who:'', text:'你抬起頭。老闆正把一張唱片放上唱盤。櫃檯上還攤著兩張，封套邊緣磨損嚴重，顯然塵封已久。' },
    { who:'老闆', text:'「這三張，是我這裡最貴的三張。」他沒抬頭。「剛才那段，你覺得是哪一張？」', ui:'aces', prompt:'（挑一張。）' },
    { who:'老闆', text:'「……你眼光真不錯。」老闆終於抬起頭來，看著你。', stage:{ notes:false } },
    { who:'老闆', text:'「這張是我的私人收藏。今天讓給你。」' },
    { who:'', text:'老闆不發一語，走出櫃檯，在那張長桌上的木箱裡翻翻找找。', stage:{ oPath:['aisle','dig1','dig2','dig3'], oDig:true } },
    { who:'老闆', text:'「這四張也很適合你。跟你有緣，收下吧。」', ui:'recs', prompt:'（老闆把四張盤遞給你。）' },
    { who:'', text:'你把五張唱片放到櫃檯上。老闆一張一張看過，替你收進紙袋。', stage:{ p:'pay', oPath:['frontleft','aisle','counter'], oDig:false } },
    { who:'', text:'你抱著紙袋，心滿意足，往門口走去。', stage:{ p:'leaving' } },
    { who:'', text:'這時，門開了。', stage:{ f:'door', door:'open' } },
    { who:'', text:'一名男子走進來。他的視線，落在你手上的那幾張專輯上。', stage:{ f:'in', p:'atdoor', door:'shut' } },
    { who:'男子', text:'「……這品味，也敢出來丟臉？」' },
    { who:'', text:'你的憤怒表露無遺。', stage:{ anger:true } },
    { who:'', text:'老闆不發一語，緩步走出櫃檯，站在兩人之間。', stage:{ oPath:['aisle','between'], anger:false } },
    { who:'老闆', text:'「既然雙方都不服氣，不如來一場品味對決如何？」', ui:'choice' },
  ],
  notes:'與 roguelike.html 的 RPG_BEATS 同一份、同一套 stage 語彙（p/o/f、oPath、door、oDig、notes、anger）；「複製 beats」的結果可以直接貼回去。ui／prompt 是遊戲的面板掛點（aces／recs／choice），編輯器不顯示但原樣保留。',
  updatedAt: now,
};

// ── 寫檔
if(fs.existsSync(path.join(OUT, 'index.json')) && !force){
  console.error('art/pixel/ 已經有內容，不覆蓋（要重種請加 --force）。'); process.exit(1);
}
const write = (rel, data) => { const p = path.join(OUT, rel); fs.mkdirSync(path.dirname(p), { recursive:true }); fs.writeFileSync(p, JSON.stringify(data, null, 1) + '\n'); console.log('  ✓', path.relative(ROOT, p)); };
for(const o of objects) write(`objects/${o.id}.json`, o);
write(`scenes/${scene.id}.json`, scene);
write(`stories/${story.id}.json`, story);
const ent = (kind, list) => list.map(o => ({ id:o.id, name:o.name, kind:o.kind, file:`art/pixel/${kind}/${o.id}.json`, updatedAt:o.updatedAt }));
write('index.json', { version:1, generatedAt:new Date().toISOString(), objects:ent('objects', objects), scenes:ent('scenes', [scene]), stories:ent('stories', [story]) });
console.log(`完成：${objects.length} 物件、1 場景、1 劇本。`);
