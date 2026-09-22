// 每批總檢查（合併原本主會話手寫的十多段 inline script）
// 用法：
//   node qa-batch.mjs research w2-031   研究稿：key 對卡單、狀態統計、字元三掃描
//   node qa-batch.mjs hooks w2-031      hook：qa-check-hooks 之外的事實對照＋字元三掃描
//   node qa-batch.mjs out w2-031        輸出稿：key／字元／字數統計（qa-check-research 另跑）
// 回傳非零即有標記。
import fs from 'node:fs';
import { execSync } from 'node:child_process';

const [stage, batch] = process.argv.slice(2);
if (!stage || !batch) { console.error('用法: node qa-batch.mjs <research|hooks|out> w2-0XX'); process.exit(1); }

// 實際存在幾組就驗幾組（wave2 固定五組；cjk-* 與 add-* 的小批可能只有 1–3 組）。
// 一組都找不到才維持 a–e，讓下游照舊報「缺檔」而不是靜默通過。
const GROUPS = (() => {
  const found = ['a', 'b', 'c', 'd', 'e'].filter(g =>
    fs.existsSync(`batches/research/${batch}-${g}.json`) ||
    fs.existsSync(`batches/hooks/${batch}-hooks-${g}.json`));
  return found.length ? found : ['a', 'b', 'c', 'd', 'e'];
})();
// 卡單路徑：wave2 預切批放 batches/wave2/，臨時批（dip-card-create 的 add-*）放 batches/cards/
const cardsPath = [`batches/wave2/${batch}-cards.json`, `batches/cards/${batch}-cards.json`, `batches/recut/${batch}-cards.json`]
  .find(p => fs.existsSync(p));
if (!cardsPath) { console.error(`找不到卡單：batches/wave2|cards|recut/${batch}-cards.json`); process.exit(1); }
const cards = JSON.parse(fs.readFileSync(cardsPath, 'utf8'));
const cardKeys = new Set(cards.map(x => x.key));
const cardByKey = new Map(cards.map(x => [x.key, x]));
// 2026-09-19：加上拉丁附加符號摺疊（NFD 後剝掉組合記號）。
// 在此之前 `ñ`／`á`／`é` 這類字元會被後面的白名單整個剝掉，於是
// 〈Danza De Los Ñañigos〉（盤面）折成 `danzadelosaigos`、
// 〈Danza de los Ñáñigos〉（成品）折成 `danzadelosigos` ——
// **同一首曲的兩種寫法折出不同鍵**，c-155 因此誤報。
// 這也正是裁定第 1702 條那個盲點（José vs Jose、Gaïa vs Gaia）在比對層的同一個根因。
const norm = s => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .toLowerCase().replace(/[^a-z0-9㐀-鿿぀-ヿ]/g, '');
// 簡體專用字表（正體字不會出現的字形；「制值台准」等正體字曾造成誤報，勿加入）
// 2026-09-05：**「个」移出字表。** 它不是「個」的簡體專用字——**「个」是教育部台語推薦用字**
// （讀作 ê，例：農村武裝青年〈Tsit 个老歲仔〉），台語盤的曲名與歌詞本來就會用它。
// c-91 b 的研究層代理自己預告了這個誤報並解釋對了。實掃全 batches：含「个」的片段 38 處，
// **零處與其他簡體字同時出現**——這個語料裡每一個都是台語用字，不是簡繁轉換的殘留。
// 依本字表原本的收錄原則（「正體字不會出現的字形；『制值台准』等正體字曾造成誤報，勿加入」），
// 它本來就不該在裡面。台灣線往後還會一直出現，留著等於每批都要人工複核一次同樣的誤報。
const SIMP = /[们这来说过时国际开关见证华语电视习动员双专辑签约终选价观论坛对从会众组织实现发达经济应该请问题让边书买卖东车马鸟鱼龙凤丰艺术录历纪乐为无与软权变现类点热战强气长闻队队]/;
const GARBAGE = /[Ѐ-ӿऀ-ॿ가-힯]/;
// 專名本身就用非拉丁文字時合法（例：박효신、가리온《가리온2》）。
// 從本批卡單的 artist|album 取出所有非拉丁片段當白名單，掃描前連同《》〈〉內的原始標題一併剝除，
// 剩下的才是真正的行文污染（把 riff 寫成 리프、trip-hop 寫成 трип-hop 之類）。
// 除了非拉丁片段，卡單的藝人名與專輯名**全字串**也一併豁免：
// 規則本來就是「專輯／曲目原標題照官方原文保留」，那些字出現在檔案任何地方都合法，
// 不只出現在《》裡面時才合法。
// （2026-08-29 客語卡《頭擺个事情》踩到：「个」是客語的所有格助詞、屬原標題用字，
//   卻被簡體表當成「個」的簡化字報錯；研究稿講到「个／的」兩種寫法時也會再中一次。
//   同類誤報在客語線上會反覆出現，靠人工每次複核不划算。）
// desc4:（CJK）與 desc2:（拉丁）兩種前綴都要剝，舊版只剝 desc2:，
// 華語批的 key 因此整串進了白名單、反而讓比對失去意義。
const ALLOW = [...new Set([
  ...cards.flatMap(x => String(x.key).replace(/^desc[24]:/, '').split('|'))
    .flatMap(s => s.match(/[Ѐ-ӿऀ-ॿ가-힯]+/g) || []),
  ...cards.flatMap(x => String(x.key).replace(/^desc[24]:/, '').split('|'))
    .filter(s => s.length > 1),
])].sort((a, b) => b.length - a.length);
// 研究稿的 keyTracks 依定義就是**原文曲名**，照規則要照官方原文保留。
// 但它們常常不被《》〈〉包起來（欄位本身就是曲名陣列），也不在卡單的
// artist|album 白名單裡，於是每一批都會誤報：崔健〈一无所有〉的官方簡體字、
// はっぴいえんど〈風来坊〉的日文原題、Verbal Jint 的本名 김진태 與曲名 좋아보여。
// 2026-08-31 三批各中一次，全是誤報。掃描前把 keyTracks 的值一併剝除。
let KEYTRACKS = [];
const collectKeyTracks = obj => {
  const out = [];
  const walk = v => {
    if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === 'object') {
      for (const [k, x] of Object.entries(v)) {
        if (k === 'keyTracks' && Array.isArray(x)) x.forEach(t => typeof t === 'string' && out.push(t));
        else walk(x);
      }
    }
  };
  walk(obj);
  return out;
};
// 2026-09-22（c-178 a 抓到，主線第 1930-B 條）：**`「」` 裡的逐字引用也要剝掉。**
// jp-1 線的 `facts` 常引日本廠牌官方頁的原句，那些句子裡本來就有半形逗號與英數夾中文；
// 那是**引文**，照原文抄才對，插空格或換標點就是改掉引文本身。
// 與 `《》〈〉` 同一個理由，只是括號換了一種——`fix-spacing` 已經在第 1916-B 條做過同樣的補。
// ⚠ 只剝成對的 `「」`（避免單邊出現時把半篇正文吃掉）。
const stripLegit = s => {
  let t = String(s).replace(/《[^》]*》/g, '').replace(/〈[^〉]*〉/g, '').replace(/「[^」]*」/g, '');
  for (const a of KEYTRACKS) t = t.split(a).join('');
  for (const a of ALLOW) t = t.split(a).join('');
  return t;
};
let flags = 0;
const warn = (...a) => { flags++; console.log('⚠', ...a); };

// ────────────────────────────────────────────────────────────────────────────
// 事實對照：把一段文字裡的〈曲名〉《專輯名》、拉丁專名、四位數年份逐一回查該卡的研究稿。
//
// 2026-09-19 新增。**在此之前這套比對只跑 hook 一個欄位**，note 與 desc 完全不驗——
// c-161 兩支鉤子代理各自寫了一支臨時掃描才發現一個曲名被掛到錯的卡上
// （〈Hub-Tones〉是 Freddie Hubbard 的末軌，派工信與裁定都誤植到 Marsalis 那張）。
// 靠代理自己想到要寫掃描才抓得到的檢查，等於沒有檢查。這裡把同一套比對接到三個欄位上。
// card：卡單那一列。只取它的 `year`——策展層覆核過的發行年是已查證的事實，
// 但它不在研究稿的 facts 裡，note 的「發行年寫 YYYY 年」會因此被誤報（c-161《Symphonica》實測）。
// ⚠ 只取 year，**不取 `curatorWhy`／`curatorRisk`／`mbNote`**：那三欄是長篇散文、夾帶大量
// 人名與曲名，摻進來等於讓這道檢查失效——寫作層只能寫研究層查證過的東西，這條界線不能鬆。
function factBlob(r, card) {
  let raw = [r.artist, r.album, r.sound || '', card && card.year ? String(card.year) : '',
    ...(r.facts || []).map(f => (typeof f === 'object' ? f.f : f)),
    ...(r.keyTracks || []), ...(r.hookCandidates || []), r.notes || ''].join(' ');
  // 研究稿常混用中文數字年份（一九八六年），轉成阿拉伯數字再比對，避免誤報
  const CN = { 〇: '0', 零: '0', 一: '1', 二: '2', 三: '3', 四: '4', 五: '5', 六: '6', 七: '7', 八: '8', 九: '9' };
  raw += ' ' + raw.replace(/[一二][〇零一二三四五六七八九]{3}/g, m => [...m].map(c => CN[c]).join(''));
  return { raw, norm: norm(raw) };
}

// otherCards：同批其他卡的「掛名／盤名」正規化字串集合。
// batchNorm：**同批全部研究稿**串成的正規化大字串。
//
// 三級判定，因為 note 與 desc 的互指是刻意的、但互指與「掛錯卡」長得一模一樣：
//   · 命中本卡研究稿                       → 過。
//   · 本卡沒有、但同批別張有               → **`xref`，印出前後文供人眼判**，不計入 flags。
//     （鉤子層會寫「這一軸歸《X》那張」把事實讓給別卡，那是對的；
//      但 c-161 的〈Hub-Tones〉被誤植到別人那張，形狀完全相同——
//      機器分不出「讓出去」和「拿錯了」，所以這一級不能靜默，也不該擋住整批。）
//   · 全批都沒有                           → 硬標記。
function factCheck(text, blob, otherCards, batchNorm) {
  const bad = [], xref = [];
  const seen = (t) => blob.norm.includes(norm(t));
  const elsewhere = (t) => otherCards.has(norm(t)) || (batchNorm && batchNorm.includes(norm(t)));
  const ctxOf = (t) => {
    const i = String(text).indexOf(t);
    if (i < 0) return t;
    return '…' + String(text).slice(Math.max(0, i - 20), i + t.length + 14).replace(/\s+/g, ' ') + '…';
  };
  for (const m of String(text).matchAll(/〈([^〉]+)〉|《([^》]+)》/g)) {
    const t = m[1] || m[2];
    if (seen(t)) continue;
    if (elsewhere(t)) xref.push('曲名/專輯 ' + t + ' ' + ctxOf(t));
    else bad.push('曲名/專輯?' + t);
  }
  // 專名比對：拆詞比對降低「綽號夾中間」誤報（Lisa "Left Eye" Lopes、Maureen Yancey 類）。
  // ⚠ 先把〈〉《》裡的內容整段挖掉再掃：那些字串上一輪已經**當成一個完整標題**驗過了，
  // 留著只會讓專名正則從標題中間切出殘片來重報一次——而殘片是對不上互指豁免的。
  // （c-160 實測：《I Am You》被切出 `Am You`、《A Tale of God's Will》被切出 `Tale` 與
  // `God's Will`，三筆都是指向同批另一張卡的互指，卻因為切碎了而全部誤報成標記。）
  const noTitles = String(text).replace(/〈[^〉]*〉|《[^》]*》/g, ' ');
  for (const nm of new Set([...noTitles.matchAll(/[A-Z][a-zA-Z.'’-]+(?: [A-Z][a-zA-Z.'’&-]+)*/g)]
    .map(x => x[0]).filter(x => x.length > 3))) {
    const parts = nm.split(' ').filter(w => w.length > 2);
    if (seen(nm) || parts.every(w => seen(w))) continue;
    if (elsewhere(nm)) xref.push('專名 ' + nm + ' ' + ctxOf(nm));
    else bad.push('專名?' + nm);
  }
  for (const y of String(text).matchAll(/(19|20)\d{2}/g)) if (!blob.raw.includes(y[0])) bad.push('年份?' + y[0]);
  return { bad, xref };
}

// 同批所有卡的掛名與盤名（含分號／冒號前的主標），供互指豁免用
function batchTitleSet(all) {
  const s = new Set();
  for (const r of all) {
    for (const v of [r.artist, r.album]) {
      if (!v) continue;
      s.add(norm(v));
      const base = String(v).split(/[:：(（]/)[0].trim();
      if (base) s.add(norm(base));
    }
  }
  return s;
}

// 2026-09-21（第 1866-B 條）：**日文新字體與簡體同形字**。
// `国`（稲葉国光）、`会`（東京厚生年金会館）這類在日文裡是正確字形，
// 而「專名一律照原文字形抄」是本產線的規定——改成 `國`／`會` 反而是錯的。
// ⚠ **不從 `SIMP` 字表移除那些字**（會整條線失去對真簡體的偵測），
// 改用**逐字串的白名單**：只把列在 `jp-proper-names.json` 的**完整專名**剝掉再掃。
// 名單是精確字串、不是字元，所以 `国际`／`开会` 這種真簡體仍然照報。
// 遇到新的日文專名被誤報，**把整個專名加進那個檔**，不要去動 SIMP。
const JP_NAMES = (() => {
  try { return JSON.parse(fs.readFileSync(new URL('./jp-proper-names.json', import.meta.url), 'utf8')); }
  catch { return []; }
})().sort((a, b) => b.length - a.length);   // 長的先剝，免得短名先吃掉長名的一部分
const stripJpNames = s => JP_NAMES.reduce((acc, n) => acc.split(n).join(''), String(s));
// ⚠ 2026-09-22（c-180 b 組研究層提出，主線第 1941-B 條）：`GARBAGE`（非拉丁）那一道**沒有白名單**，
// 而 `SIMP` 有。本批以 `「」` 逐字引用的 `Мелодия` 是靠 `stripLegit` 剝掉引號才合法通過的
// ——**沒被引號包起來的合法非拉丁專名（c-123／c-53 的舊稿裡就有）會誤報。**
// 補法與 `SIMP` 同構：多讀一份選用的非拉丁專名檔，**檔案不存在時行為與舊版完全一致。**
const NONLATIN_NAMES = (() => {
  try { return JSON.parse(fs.readFileSync(new URL('./nonlatin-proper-names.json', import.meta.url), 'utf8')); }
  catch { return []; }
})().sort((a, b) => b.length - a.length);
const stripNonLatinNames = s => NONLATIN_NAMES.reduce((acc, n) => acc.split(n).join(''), String(s));

function charScan(label, s) {
  const t = stripLegit(s);
  const tGarb = stripNonLatinNames(t);
  if (GARBAGE.test(tGarb)) warn(label, '非拉丁亂碼:', [...new Set(tGarb.match(new RegExp(GARBAGE, 'g')))].join(''));
  // 簡體掃描同樣剝除《》〈〉內的專名：中國發行的專輯官方標題本來就是簡體
  // （崔健《新长征路上的摇滚》），照原文保留是規定，不該報錯。整份寫成簡體的情況
  // （w2-121 e 組）仍會被抓到，因為那種錯誤絕大多數落在標題之外。
  const tSimp = stripJpNames(t);
  if (SIMP.test(tSimp)) warn(label, '簡體字:', [...new Set(tSimp.match(new RegExp(SIMP, 'g')))].join(''));
  // 這條原本掃的是未剝除專名的原文，於是林憶蓮《都市觸覺, Part II: Fuir la ville》
  // 這種官方標題本身就帶半形逗號的卡必然誤報。掃 t（已剝除《》〈〉與卡單全字串）才對。
  if (/[㐀-鿿],|,[㐀-鿿]/.test(t)) warn(label, '半形逗號貼中文');
  // 千分位逗號。行文一律寫 281948 不寫 281,948，但這條規則只寫在提示詞裡、
  // 沒有任何機器檢查，於是 c50a-c 有五張卡整批寫成千分位，是我逐檔用一次性
  // 指令掃出來的。掃描用剝除專名後的文字，免得專輯標題裡的數字誤報。
  // 樣式要求逗號後恰好三位數字且其後不再接數字，「1975,1980」這種連寫年份不會中。
  const kilo = t.match(/\d{1,3}(?:,\d{3})+(?!\d)/g);
  if (kilo) warn(label, '千分位逗號:', [...new Set(kilo)].slice(0, 8).join('、'));
}

if (stage === 'research') {
  const all = [];
  for (const g of GROUPS) {
    const p = `batches/research/${batch}-${g}.json`;
    if (!fs.existsSync(p)) { warn(g, '缺檔'); continue; }
    const s = fs.readFileSync(p, 'utf8');
    let r; try { r = JSON.parse(s); } catch (e) { warn(g, 'JSON 損壞:', e.message); continue; }
    if (!Array.isArray(r) && r && typeof r === 'object' && stage === 'research') r = Object.values(r);
    console.log(g, r.length, r.map(x => x.status).join(','));
    // 曲名可能含引號、括號等字元，長的先剝以免短的把長的切斷
    KEYTRACKS = collectKeyTracks(r).filter(x => x.length > 1).sort((a, b) => b.length - a.length);
    charScan('research-' + g, s);
    KEYTRACKS = [];
    r.forEach(x => {
      all.push(x.key);
      if (!cardKeys.has(x.key)) warn(g, 'key 不在卡單:', JSON.stringify(x.key));
      // 來源必須是完整可開啟的 https 網址。研究層唯一的防造假機制就是逐條附源，
      // 少一條源就等於少一條可查核的事實，這裡不容忍裸網域或 http。
      const noSrc = (x.facts || []).filter(f => !/^https:\/\/\S+$/.test(String(f.src || '')));
      if (noSrc.length) warn(g, `${x.key}：${noSrc.length} 條事實的 src 不是完整 https 網址`);
      // hookCandidates 上限 2。多給不會更好——hook 層本來就要自己挑，
      // 候選一多就變成研究層在越權定調。
      if ((x.hookCandidates || []).length > 2) warn(g, `${x.key}：hookCandidates ${x.hookCandidates.length} 條，上限 2`);
    });
  }
  if (JSON.stringify([...all].sort()) !== JSON.stringify([...cardKeys].sort())) warn('key 集合與卡單不一致');
  else console.log('key 與卡單完全一致 ✓');
}

if (stage === 'hooks') {
  const otherCards = batchTitleSet(cards);
  let xrefTotal = 0;
  // 同批全部研究稿串成一個大字串，供三級判定的第二級用
  let batchNorm = '';
  for (const g of GROUPS) {
    const rp = `batches/research/${batch}-${g}.json`;
    if (!fs.existsSync(rp)) continue;
    let R = JSON.parse(fs.readFileSync(rp, 'utf8'));
    if (!Array.isArray(R)) R = Object.values(R);
    for (const r of R) batchNorm += factBlob(r, cardByKey.get(r.key)).norm;
  }
  // 先跑既有 hook 品管（字數/禁語/開頭雷同/箭頭等）
  // ⚠ qa-check-hooks.mjs 目前不在 repo 裡（本機有、從未提交，雲端工作階段拿不到）。
  // 舊寫法把「檔案不存在」和「檢查不通過」都算成一個 flags，於是雲端每次跑 hooks 都必然
  // 多一個假標記，真正的事實對照結果反而被淹掉。改成先確認檔案在不在：
  // 不在就明講缺哪支、要改跑哪支，不計標記；在才跑，跑失敗才算標記。
  if (fs.existsSync('qa-check-hooks.mjs')) {
    try { execSync(`node qa-check-hooks.mjs ${batch}`, { stdio: 'inherit' }); }
    catch { flags++; }
  } else {
    console.log('（略過 qa-check-hooks.mjs：本 repo 無此檔。字數／禁語／開頭雷同／分數星等');
    console.log(`  請改跑 node chk-hook-crossgroup.mjs ${batch}，本階段只做事實對照與字元掃描。）`);
  }
  for (const g of GROUPS) {
    const rp = `batches/research/${batch}-${g}.json`, hp = `batches/hooks/${batch}-hooks-${g}.json`;
    if (!fs.existsSync(hp)) { warn(g, '缺 hook 檔'); continue; }
    const hs = fs.readFileSync(hp, 'utf8');
    charScan('hooks-' + g, hs);
    let R = JSON.parse(fs.readFileSync(rp, 'utf8')), H = JSON.parse(hs);
    if (!Array.isArray(R)) R = Object.values(R); // 古典批研究檔是物件格式
    if (!Array.isArray(H)) H = Object.values(H);
    // note 長度是成本控制項（過長會複製進寫手輸入被讀第二次）：>350 提示、>450 才算標記
    const longNotes = H.filter(h => Array.from(h.note || '').length > 350);
    if (longNotes.length) {
      const max = Math.max(...H.map(h => Array.from(h.note || '').length));
      console.log(`  note>350: ${longNotes.length}/${H.length}（最長 ${max}）${max > 450 ? ' ← 過長' : ''}`);
      if (max > 450) flags++;
    }
    const hm = new Map(H.map(h => [h.key, h]));
    for (const r of R) {
      const h = hm.get(r.key); if (!h) { warn('漏卡', r.key); continue; }
      if (!cardKeys.has(h.key)) warn(g, 'hook key 不在卡單:', JSON.stringify(h.key));
      const blob = factBlob(r, cardByKey.get(r.key));
      const kh = factCheck(h.hook, blob, otherCards, batchNorm);
      if (kh.bad.length) warn(g, r.album, 'hook →', kh.bad.join(' | '));
      // note 也要驗。它會被原樣複製進寫手輸入、當成劇本照寫，
      // 一個掛錯卡的曲名在這裡不攔，下游就會原封不動寫進 desc。
      const kn = factCheck(h.note || '', blob, otherCards, batchNorm);
      if (kn.bad.length) warn(g, r.album, 'note →', kn.bad.join(' | '));
      for (const x of [...kh.xref, ...kn.xref]) console.log(`  互指? ${g} ${r.album} → ${x}`);
      xrefTotal += kh.xref.length + kn.xref.length;
    }
  }
  if (xrefTotal) console.log(`  （互指 ${xrefTotal} 處：本卡研究稿沒有、同批別張有。刻意讓給別卡是對的，拿錯卡是錯的，機器分不出來——請逐條看上面的前後文。不計入標記。）`);
}

if (stage === 'out') {
  // desc 也要回查研究稿。2026-09-19 之前這一段完全沒有事實對照——
  // 寫作層拿到的 note 是劇本、facts 是素材庫，但成品從來沒有被機器比對回去過。
  const otherCards = batchTitleSet(cards);
  const research = new Map();
  for (const g of GROUPS) {
    const rp = `batches/research/${batch}-${g}.json`;
    if (!fs.existsSync(rp)) continue;
    let R = JSON.parse(fs.readFileSync(rp, 'utf8'));
    if (!Array.isArray(R)) R = Object.values(R);
    for (const r of R) research.set(r.key, r);
  }
  let descXref = 0, descNoResearch = 0;
  let batchNorm = '';
  for (const r of research.values()) batchNorm += factBlob(r, cardByKey.get(r.key)).norm;

  // 動態掃出所有 out-N（組數可能是 2 或 5），不要寫死，否則多出來的組會被安靜略過
  const outNums = fs.readdirSync('batches/output')
    .map(f => (f.match(new RegExp(`^${batch}-out-(\\d+)\\.json$`)) || [])[1])
    .filter(Boolean).map(Number).sort((a, b) => a - b);
  if (!outNums.length) warn('找不到任何輸出檔', `batches/output/${batch}-out-*.json`);
  let outTotal = 0;
  for (const n of outNums) {
    const p = `batches/output/${batch}-out-${n}.json`;
    if (!fs.existsSync(p)) { warn('缺輸出檔', p); continue; }
    const s = fs.readFileSync(p, 'utf8');
    charScan('out-' + n, s);
    const o = JSON.parse(s);
    o.forEach(r => { if (!cardKeys.has(r.key)) warn('out-' + n, 'key 不在卡單:', JSON.stringify(r.key)); });
    // 未指名出處的榜單／獎項／名人堂（2026-08-08 新增；075–083 連續七次靠人工審稿才抓到）
    // 規則見 writer-base：出處是樂評媒體而媒體名不能進正文的名次，整條不寫。此處只標記，人工複核後決定。
    const UNSOURCED = [
      [/一份[^。；]{0,14}(清單|名單|統計|票選|評選|榜單)/, '一份不具名的清單／統計'],
      [/名人堂/, '名人堂（未具名主辦者？）'],
      [/(?<!投)票選/, '票選（未具名主辦者？）'],  // 排除「投票選曲」跨詞誤觸
      [/(入選|被?選進|被?列進|收進)[^。；]{0,14}(名單|清單|百大)/, '入選不具名名單'],
      [/百大[^。；]{0,6}(專輯|唱片|名單|清單)/, '百大名單'],
      [/史上最(偉大|佳)[^。；]{0,10}(專輯|唱片)[^。；]{0,6}(評選|名單|清單|榜)/, '史上最佳評選'],
      [/年度(專輯|唱片)獎/, '年度專輯獎（未具名頒發單位？）'],
    ];
    // 純標記、不豁免（曾試過「附近有拉丁字母就放行」，被曲名《Legion》〈Gloria〉的字母誤觸）；
    // 具名合法者（葛萊美、Billboard、ACM…）由人工複核放行，比照既有 QA 誤報處理原則。
    //
    // 2026-08-30：豁免仍然不做，但**標記改帶前後文**。c-50 三批共標了五筆，全部是誤報，
    // 而且全是同一型態——具名的修飾語就緊貼在裸字串前面（「Pitchfork 的 1990 年代百大專輯」
    // 「拉丁葛萊美名人堂」「《Village Voice》當年的樂評票選」「A2IM Libera Awards 的年度專輯獎」）。
    // 只印裸字串等於逼複核者逐筆開檔案找上下文；印出前後各二十餘字，一眼就判得完。
    // 這不放寬任何判定，只是讓人工複核便宜到不會被跳過——那才是這道檢查真正的失效模式。
    for (const r of o) for (const [re, label] of UNSOURCED) {
      const m = r.desc.match(re);
      if (!m) continue;
      const i = m.index ?? r.desc.indexOf(m[0]);
      const ctx = r.desc.slice(Math.max(0, i - 24), i + m[0].length + 12).replace(/\s+/g, ' ');
      warn('out', '未具名出處?', label, '→', r.key, ':: …' + ctx + '…');
    }
    for (const r of o) {
      const rr = research.get(r.key);
      if (!rr) { descNoResearch++; continue; }
      const k = factCheck(r.desc, factBlob(rr, cardByKey.get(r.key)), otherCards, batchNorm);
      if (k.bad.length) warn('out-' + n, rr.album, 'desc →', k.bad.join(' | '));
      for (const x of k.xref) console.log(`  互指? out-${n} ${rr.album} → ${x}`);
      descXref += k.xref.length;
    }
    const lens = o.map(r => Array.from(r.desc).length);
    outTotal += o.length;
    console.log(`out-${n}｜${o.length} 張｜字數 ${Math.min(...lens)}–${Math.max(...lens)}｜>260: ${lens.filter(x => x > 260).length}`);
  }
  // thin 卡字數帶（2026-09-04 新增）。writer-base 給 thin 卡 120–180、full 卡 180–240，
  // 但**這條規則過去只寫在 writer-base 裡，沒有任何機器檢查在看它**——它要生效，
  // 全靠派工信有沒有轉述給寫作代理。雲端派工模板從 c-67 起就漏掉了這一句，
  // 結果 c-53–c-56 的 13 張 thin 卡全部守住 180，c-67 之後的 22 張全部超出（206–238）。
  // 規則沒被違反，是**沒有人把規則交到寫作層手上**，而檢查層也沒攔。這裡把它補上。
  //
  // status 只存在於研究稿與 writer 輸入，卡單裡沒有，所以從 batches/input/ 取。
  // 取不到就安靜略過（本機批可能沒有 input 檔），不要因此讓整個 out 檢查失敗。
  const thinKeys = new Set();
  for (const n of outNums) {
    const ip = `batches/input/${batch}-writer-${n}.json`;
    if (!fs.existsSync(ip)) continue;
    try {
      const raw = JSON.parse(fs.readFileSync(ip, 'utf8'));
      for (const c of (Array.isArray(raw) ? raw : raw.cards || [])) {
        if (c && c.status === 'thin' && c.key) thinKeys.add(c.key);
      }
    } catch { /* 輸入檔壞掉是別的檢查的事，這裡不接管 */ }
  }
  if (thinKeys.size) {
    const over = [];
    for (const n of outNums) {
      const p2 = `batches/output/${batch}-out-${n}.json`;
      if (!fs.existsSync(p2)) continue;
      for (const r of JSON.parse(fs.readFileSync(p2, 'utf8'))) {
        if (!thinKeys.has(r.key)) continue;
        const L = Array.from(r.desc).length;
        if (L > 180) over.push(`${r.key} (${L})`);
      }
    }
    if (over.length) warn('thin 卡超過 180 字', `${over.length}/${thinKeys.size}`, '→', over.join('、'));
    else console.log(`thin 卡 ${thinKeys.size} 張，全部 ≤180 ✓`);
  }

  if (descXref) console.log(`desc 互指 ${descXref} 處：本卡研究稿沒有、同批別張有——請逐條看上面的前後文，不計入標記`);
  if (descNoResearch) console.log(`desc 未比對 ${descNoResearch} 張：研究稿裡找不到對應 key`);

  // 總數對卡單——這是擋住「只驗到部分組別」的最後防線
  if (outTotal !== cardKeys.size) warn('輸出總張數與卡單不符', `${outTotal} vs ${cardKeys.size}`);
  else console.log(`out 合計 ${outTotal} 張，與卡單相符 ✓`);
  console.log(`（qa-check-research 與 fix-spacing 需另跑，共 ${outNums.length} 檔各一次）`);
}

console.log(flags ? `總標記 ${flags}` : '全部通過 ✓');
process.exit(flags ? 1 : 0);
