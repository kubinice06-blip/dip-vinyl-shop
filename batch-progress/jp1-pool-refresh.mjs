// 第 1908-B 條：poolRecheck 第三次改良 —— 三件事一起做
//  (1) 用**今天的池**重掃（c-173…c-177 的卡單已落地，列舉檔的比對日是 2026-09-15）；
//  (2) 加第三道比對：**本名出現在既有聯名字串裡**（`鈴木茂` vs 池中 `細野晴臣・鈴木茂・山下達郎`）；
//  (3) 既有的等值與前綴兩道保留。
import fs from 'node:fs';
const norm = s => String(s).toLowerCase().replace(/[&＆]/g,'and').replace(/[^\p{L}\p{N}]+/gu,'');
const hasCJK = s => /[぀-ヿ一-鿿]/.test(s);
const hasKanji = s => /[一-鿿]/.test(String(s));
// ⚠ 2026-09-25（c-184 a 第 5731 條第 1 點，主線第 1960-B 條）：**編制後綴要先削掉再比**。
// 雙向前綴那一道只在有漢字時才做（`本田竹曠トリオ` vs 池中 `本田竹曠` 靠它救到），
// **純羅馬字的編制串整個掃不到**（`Cecil Taylor Unit`／`Kenny Barron Trio` vs 池中本名）。
// 這一道把後綴削掉之後做等值比，羅馬字側門檻 8 字、漢字側 3 字。
const ENSEMBLE = /(トリオ|カルテット|クヮルテット|クワルテット|クインテット|クヰンテット|セクステット|セプテット|オクテット|ユニット|アンサンブル|オーケストラ|バンド|グループ|と[^\s]*オールスターズ|[\s,]*(trio|quartet|quintet|sextet|septet|octet|unit|ensemble|orchestra|band|group|all[\s-]?stars)s?)$/i;
const stripEns = v => { let x = String(v).trim(), n = 0; while (n < 3) { const y = x.replace(ENSEMBLE, '').trim(); if (y === x || !y) break; x = y; n++; } return n ? x : ''; };
// ⚠ 2026-09-25（c-184 b 第 5775 條第 4 點，主線第 1963-B 條）：**「聯名內含」沒把 `・`(U+30FB) 當切點**，
// 於是池中 `三上寛・古澤良治郎` 那兩列對上 slice 的 `三上寛` 整個漏列。
// 改成把池中九種分隔符一併當切點，**兩邊都切**，逐段比。
// 門檻沿用（漢字 3 字、羅馬字 8 字）——這一道只產生「要人工比」的候選，寬一點比漏掉好。
const SEP = /\s*(?:・|／|\/|,|，|＆|&|＋|\+|〜|～|~|\sfeat\.?\s|\swith\s|\smeets\s|\sMeets\s|と(?=[一-鿿])) */gi;
const segs = v => String(v).split(SEP).map(x => (x || '').trim()).filter(x => Array.from(x).length >= 2);
// ⚠ 同條第 5 點：**盤面印「外文 = 和文」雙題的碟，兩半都要拿去掃池**
// （c-184 b 第 5753 條的真撞池就是這一種：`Mort À Crédit` ↔ `なしくずしの死`，
//  ALM「New Improvisational Music」系列幾乎每一張都是雙題，Frasco／Union／Trio 也常見）。
const titleForms = t => {
  const raw = String(t || '');
  const out = new Set([raw]);
  for (const part of raw.split(/\s*[=＝]\s*/)) if (Array.from(part.trim()).length >= 3) out.add(part.trim());
  return [...out];
};
const pool = [];
for (const r of JSON.parse(fs.readFileSync('seed_cards.json','utf8'))) pool.push({artist:r[0],album:r[1],year:r[6],src:'seed'});
for (const f of fs.readdirSync('desc-tools/batches/cards').filter(x=>/^c\d+-cards\.json$/.test(x))) {
  const a = JSON.parse(fs.readFileSync('desc-tools/batches/cards/'+f,'utf8'));
  for (const c of (Array.isArray(a)?a:Object.values(a))) pool.push({artist:c.artist,album:c.album,year:c.year,rgMbid:c.rgMbid,src:f.replace('-cards.json','')});
}
const poolRg = new Set(pool.filter(p=>p.rgMbid).map(p=>p.rgMbid));
// ── 策展層已裁定的撞池名單餵回來（主線第 1960-B 條）──
// 上一批把「這張在池中」寫成裁定了，下一批的 slice 還是把同一張切進來
// （c-183 第 5703 條 (1) → c-184 #2《This Is Honda》）。
let KNOWN = { items: [] };
try { KNOWN = JSON.parse(fs.readFileSync('batch-progress/enum/known-pool-collisions.json','utf8')); } catch {}
const knownByRg = new Map(), knownByKey = new Map();
for (const it of (KNOWN.items||[])) {
  if (it.rgMbid) knownByRg.set(it.rgMbid, it);
  knownByKey.set(norm(it.artist)+'\u0000'+norm(it.album), it);
}
// rgMbid 在名單裡是短碼（前八位），slice 是完整 uuid——用前綴比
const knownHit = r => {
  for (const [k, it] of knownByRg) if (String(r.rgMbid||'').startsWith(k)) return it;
  return knownByKey.get(norm(r.artist)+'\u0000'+norm(r.album)) || null;
};
const TODAY = new Date().toISOString().slice(0, 10);
const POOLBATCHES = new Set(pool.filter(p=>p.src!=='seed').map(p=>p.src)).size;
console.log(`池：${pool.length} 列（含本機卡單 ${new Set(pool.filter(p=>p.src!=='seed').map(p=>p.src)).size} 批）`);

for (const b of process.argv.slice(2)) {
  const p = `batch-progress/${b}/slice.json`;
  const S = JSON.parse(fs.readFileSync(p,'utf8'));
  let coll=0, hint=0, none=0, flat=0, newSub=0;
  for (const r of S) {
    const vs = [...new Set([r.artist, ...(r.artistVariants||[])])].filter(v=>Array.from(v).length>=3);
    const seen = new Set(), hits = [], why = {};
    for (const q of pool) {
      const na = norm(q.artist);
      let how = null;
      for (const v of vs) {
        const nv = norm(v);
        if (nv.length < 3) continue;
        if (na === nv) { how = '等值'; break; }
        // ⚠ 2026-09-25（c-183 與 c-184 連兩批各漏掉真撞池，主線第 1955-B 條）：
        // 這一道原本**只做單向**（池中掛名以 slice 變體為前綴），
        // 於是反過來那一邊整個掃不到——slice 的 `坂田明トリオ`／`富樫雅彦カルテット`
        // 對上池中的 `坂田明`／`富樫雅彦`，**其中一筆撞的是 apex 卡**。
        // 兩個方向都比。
        if (nv.length >= 4 && hasCJK(v) && na.length > nv.length && na.startsWith(nv)) { how = how || '前綴'; }
        if (na.length >= 4 && hasCJK(v) && nv.length > na.length && nv.startsWith(na)) { how = how || '前綴（反向）'; }
        // 第三道：本名（要有漢字、夠長）出現在池中聯名字串裡
        // ⚠ 2026-09-22（c-182 a 組抓到，主線第 1944-B 條）：這一道原本要求 `hasCJK(v)`，
        // 於是**純羅馬字的掛名整個掃不到**——池中的 `John Kaizan Neptune / 直居隆雄` 這種
        // ` / ` 聯名字串含著 slice 的掛名，卻因為 `John Kaizan Neptune` 沒有漢字而被跳過。
        // 漢字那一條保留 4 字門檻；羅馬字改用 8 字門檻（夠長就不會誤撞）。
        if (na.length > nv.length && na.includes(nv)
            && ((hasCJK(v) && nv.length >= 4) || (!hasCJK(v) && nv.length >= 8))) { how = how || '聯名內含'; }
        // 第五道：九種分隔符兩邊都切，逐段比
        // ⚠ **切出來的段必須含漢字**（或是夠長的純羅馬字）：`・` 在片假名譯名裡是詞內連字號，
        // 不加這個條件會切出 `バンド`／`アンド`／`イエロー` 這種通用詞
        // （實測：不限制時 c-186…c-191 多出 45 列，絕大多數是
        //  `細野晴臣＆イエロー・マジック・バンド` 對上池中 `スカイドッグ・ブルース・バンド` 這種垃圾）。
        for (const x of segs(v)) {
          const nx = norm(x);
          if (!((hasKanji(x) && nx.length >= 3) || (!hasCJK(x) && nx.length >= 8))) continue;
          if (segs(q.artist).some(y => norm(y) === nx)) { how = how || '分隔符切段'; break; }
        }
        // 第四道：削掉編制後綴再比（兩邊都削）
        const sv = stripEns(v), sa = stripEns(q.artist);
        for (const [x, y] of [[sv, q.artist], [v, sa], [sv, sa]]) {
          if (!x || !y) continue;
          const nx = norm(x), ny = norm(y);
          if (nx.length < 3) continue;
          if (nx === ny && ((hasCJK(x) && nx.length >= 3) || (!hasCJK(x) && nx.length >= 8))) { how = how || '削編制後綴'; break; }
        }
      }
      if (!how) continue;
      const line = `${q.src}｜${q.artist}｜${q.album}｜${q.year}`;
      if (seen.has(line)) continue;
      seen.add(line); hits.push(line); why[line] = how;
      if (how === '聯名內含') newSub++;
    }
    const myForms = titleForms(r.album).map(norm);
    const exact = hits.filter(l => titleForms(l.split('｜')[2]).map(norm).some(x => myForms.includes(x)));
    const inPoolNow = exact.length > 0 || poolRg.has(r.rgMbid);
    const anyCJK = vs.some(hasCJK);
    const kn = knownHit(r);
    if (kn) { coll++; r.poolRecheck = { status: `⚠ ⚠ **前批策展層已裁定撞池——退**（${kn.ruling}）`, hit: [kn.poolRow], shape: kn.shape, artistAlbumsInPool: hits, matchedBy: why }; }
    else if (inPoolNow) { coll++; r.poolRecheck = { status:'⚠ 確定撞池——退', hit: exact, artistAlbumsInPool: hits, matchedBy: why }; }
    else if (hits.length) { hint++; r.poolRecheck = { status:'同藝人在池中，盤名不同——**逐張人工比**', artistAlbumsInPool: hits, matchedBy: why }; }
    else if (!anyCJK) { flat++; r.poolRecheck = { status:'⚠ ⚠ **變體全是羅馬字，等於沒查過**——務必自己查出漢字名再掃一次池（第 1868-B 條）', artistAlbumsInPool: [] }; }
    // ⚠ 2026-09-24：這一行原本把比對日與涵蓋批次寫死成 `2026-09-22、含 c-173…c-177`，
    // 於是 jp-2 線切出來的 slice 帶著一句與事實不符的說明。改成當場產生。
    else { none++; r.poolRecheck = { status:`池中查無此藝人（等值＋前綴＋聯名內含三道，比對日 ${TODAY}、池 ${pool.length} 列／${POOLBATCHES} 批卡單）`, artistAlbumsInPool: [] }; }
  }
  fs.writeFileSync(p, JSON.stringify(S,null,1) + '\n');
  console.log(`${b}：確定撞池 ${coll}｜要人工比 ${hint}｜全羅馬字 ${flat}｜查無 ${none}`);
}
console.log(`\n第三道「聯名內含」新增的候選共 ${'（見各批）'}`);
