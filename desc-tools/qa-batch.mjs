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
const norm = s => String(s || '').toLowerCase().replace(/[^a-z0-9㐀-鿿぀-ヿ]/g, '');
// 簡體專用字表（正體字不會出現的字形；「制值台准」等正體字曾造成誤報，勿加入）
const SIMP = /[们这来说过时国际开关见证华语电视习动员双专辑签约终选价观论坛对个从会众组织实现发达经济应该请问题让边书买卖东车马鸟鱼龙凤丰艺术录历纪乐为无与软权变现类点热战强气长闻队队]/;
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
const stripLegit = s => {
  let t = String(s).replace(/《[^》]*》/g, '').replace(/〈[^〉]*〉/g, '');
  for (const a of ALLOW) t = t.split(a).join('');
  return t;
};
let flags = 0;
const warn = (...a) => { flags++; console.log('⚠', ...a); };

function charScan(label, s) {
  const t = stripLegit(s);
  if (GARBAGE.test(t)) warn(label, '非拉丁亂碼:', [...new Set(t.match(new RegExp(GARBAGE, 'g')))].join(''));
  // 簡體掃描同樣剝除《》〈〉內的專名：中國發行的專輯官方標題本來就是簡體
  // （崔健《新长征路上的摇滚》），照原文保留是規定，不該報錯。整份寫成簡體的情況
  // （w2-121 e 組）仍會被抓到，因為那種錯誤絕大多數落在標題之外。
  if (SIMP.test(t)) warn(label, '簡體字:', [...new Set(t.match(new RegExp(SIMP, 'g')))].join(''));
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
    charScan('research-' + g, s);
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
      let blobRaw = [r.artist, r.album, r.sound || '', ...(r.facts || []).map(f => (typeof f === 'object' ? f.f : f)), ...(r.keyTracks || []), ...(r.hookCandidates || []), r.notes || ''].join(' ');
      // 研究稿常混用中文數字年份（一九八六年），轉成阿拉伯數字再比對，避免誤報
      const CN = { 〇: '0', 零: '0', 一: '1', 二: '2', 三: '3', 四: '4', 五: '5', 六: '6', 七: '7', 八: '8', 九: '9' };
      blobRaw += ' ' + blobRaw.replace(/[一二][〇零一二三四五六七八九]{3}/g, m => [...m].map(c => CN[c]).join(''));
      const blob = norm(blobRaw); const e = [];
      for (const m of h.hook.matchAll(/〈([^〉]+)〉|《([^》]+)》/g)) { const t = m[1] || m[2]; if (!blob.includes(norm(t))) e.push('曲名/專輯?' + t); }
      // 專名比對：拆詞比對降低「綽號夾中間」誤報（Lisa "Left Eye" Lopes、Maureen Yancey 類）
      for (const nm of new Set([...h.hook.matchAll(/[A-Z][a-zA-Z.'’-]+(?: [A-Z][a-zA-Z.'’&-]+)*/g)].map(x => x[0]).filter(x => x.length > 3))) {
        const parts = nm.split(' ').filter(w => w.length > 2);
        if (!blob.includes(norm(nm)) && !parts.every(w => blob.includes(norm(w)))) e.push('專名?' + nm);
      }
      for (const y of h.hook.matchAll(/(19|20)\d{2}/g)) if (!blobRaw.includes(y[0])) e.push('年份?' + y[0]);
      if (e.length) warn(g, r.album, '→', e.join(' | '));
    }
  }
}

if (stage === 'out') {
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
    for (const r of o) for (const [re, label] of UNSOURCED) {
      const m = r.desc.match(re);
      if (m) warn('out', '未具名出處?', label, '→', r.key, '::', m[0]);
    }
    const lens = o.map(r => Array.from(r.desc).length);
    outTotal += o.length;
    console.log(`out-${n}｜${o.length} 張｜字數 ${Math.min(...lens)}–${Math.max(...lens)}｜>260: ${lens.filter(x => x > 260).length}`);
  }
  // 總數對卡單——這是擋住「只驗到部分組別」的最後防線
  if (outTotal !== cardKeys.size) warn('輸出總張數與卡單不符', `${outTotal} vs ${cardKeys.size}`);
  else console.log(`out 合計 ${outTotal} 張，與卡單相符 ✓`);
  console.log(`（qa-check-research 與 fix-spacing 需另跑，共 ${outNums.length} 檔各一次）`);
}

console.log(flags ? `總標記 ${flags}` : '全部通過 ✓');
process.exit(flags ? 1 : 0);
