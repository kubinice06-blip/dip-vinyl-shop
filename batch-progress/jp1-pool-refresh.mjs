// 第 1908-B 條：poolRecheck 第三次改良 —— 三件事一起做
//  (1) 用**今天的池**重掃（c-173…c-177 的卡單已落地，列舉檔的比對日是 2026-09-15）；
//  (2) 加第三道比對：**本名出現在既有聯名字串裡**（`鈴木茂` vs 池中 `細野晴臣・鈴木茂・山下達郎`）；
//  (3) 既有的等值與前綴兩道保留。
import fs from 'node:fs';
const norm = s => String(s).toLowerCase().replace(/[&＆]/g,'and').replace(/[^\p{L}\p{N}]+/gu,'');
const hasCJK = s => /[぀-ヿ一-鿿]/.test(s);
const pool = [];
for (const r of JSON.parse(fs.readFileSync('seed_cards.json','utf8'))) pool.push({artist:r[0],album:r[1],year:r[6],src:'seed'});
for (const f of fs.readdirSync('desc-tools/batches/cards').filter(x=>/^c\d+-cards\.json$/.test(x))) {
  const a = JSON.parse(fs.readFileSync('desc-tools/batches/cards/'+f,'utf8'));
  for (const c of (Array.isArray(a)?a:Object.values(a))) pool.push({artist:c.artist,album:c.album,year:c.year,rgMbid:c.rgMbid,src:f.replace('-cards.json','')});
}
const poolRg = new Set(pool.filter(p=>p.rgMbid).map(p=>p.rgMbid));
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
        if (nv.length >= 4 && hasCJK(v) && na.length > nv.length && na.startsWith(nv)) { how = how || '前綴'; }
        // 第三道：本名（要有漢字、夠長）出現在池中聯名字串裡
        // ⚠ 2026-09-22（c-182 a 組抓到，主線第 1944-B 條）：這一道原本要求 `hasCJK(v)`，
        // 於是**純羅馬字的掛名整個掃不到**——池中的 `John Kaizan Neptune / 直居隆雄` 這種
        // ` / ` 聯名字串含著 slice 的掛名，卻因為 `John Kaizan Neptune` 沒有漢字而被跳過。
        // 漢字那一條保留 4 字門檻；羅馬字改用 8 字門檻（夠長就不會誤撞）。
        if (na.length > nv.length && na.includes(nv)
            && ((hasCJK(v) && nv.length >= 4) || (!hasCJK(v) && nv.length >= 8))) { how = how || '聯名內含'; }
      }
      if (!how) continue;
      const line = `${q.src}｜${q.artist}｜${q.album}｜${q.year}`;
      if (seen.has(line)) continue;
      seen.add(line); hits.push(line); why[line] = how;
      if (how === '聯名內含') newSub++;
    }
    const exact = hits.filter(l => norm(l.split('｜')[2]) === norm(r.album));
    const inPoolNow = exact.length > 0 || poolRg.has(r.rgMbid);
    const anyCJK = vs.some(hasCJK);
    if (inPoolNow) { coll++; r.poolRecheck = { status:'⚠ 確定撞池——退', hit: exact, artistAlbumsInPool: hits, matchedBy: why }; }
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
