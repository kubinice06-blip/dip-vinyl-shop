// 派工信的數字一律由這支腳本產生，不要從上一批的模板用 sed 改。
//
// 為什麼要有這支（主線第 1937-B 條）：模板裡的數字連三批出錯，三次都是同一個機制——
//   c-177：內文留著舊的張數（27）而摘要寫新的（30）；
//   c-178 鉤子：張數欄寫 a12/b15，研究稿實際是 a15/b14；
//   c-178 寫作：倒量參考的檔名被 sed 從 `c177-out-*` 整批換成 `c178-out-*`，那兩個檔當時還不存在。
// 三次都是代理抓到、我沒抓到。**模板裡的數字要嘛由腳本產生，要嘛不要放。**
//
// 用法：node batch-progress/dispatch-stats.mjs <batch> [上一批]
//   例：node batch-progress/dispatch-stats.mjs c182 c181
import fs from 'node:fs';
const L = s => Array.from(s || '').length;
const readJson = p => { try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return null; } };
const rows = j => !j ? [] : (Array.isArray(j) ? j : Object.values(j));

const batch = process.argv[2];
const prev = process.argv[3];
if (!batch) { console.log('用法：node batch-progress/dispatch-stats.mjs <batch> [上一批]'); process.exit(1); }

console.log(`# ${batch} 派工數字（${new Date().toISOString().slice(0, 10)} 產生）\n`);

// ── slice（策展層要的）
const slice = readJson(`batch-progress/${batch}/slice.json`);
if (slice) {
  for (const g of ['a', 'b']) {
    const r = slice.filter(x => x.g === g);
    if (!r.length) continue;
    const why = {}; let manual = 0, romaji = 0, none = 0, collide = 0, live = 0, tnote = 0;
    for (const x of r) {
      why[x.why] = (why[x.why] || 0) + 1;
      const pr = JSON.stringify(x.poolRecheck || '');
      if (/人工比/.test(pr)) manual++;
      if (/羅馬字/.test(pr)) romaji++;
      if (/查無/.test(pr)) none++;
      if (/確定撞/.test(pr)) collide++;
      if (x.live) live++;
      if (x.titleCheck && x.titleCheck.note) tnote++;
    }
    console.log(`## slice ${g} 組：${r.length} 張`);
    console.log(`- why 分佈：${Object.entries(why).map(([k, v]) => `\`${k}\` ${v}`).join('、')}`);
    console.log(`- poolRecheck：要逐張人工比 ${manual}、池中查無 ${none}、變體全羅馬字 ${romaji}、確定撞池 ${collide}`);
    console.log(`- slice 標 live ${live} 筆、titleCheck note 有警語 ${tnote} 筆\n`);
  }
}

// ── 卡單（研究／鉤子／寫作層要的；⚠ 分組欄位是 `group` 不是 `g`）
const cards = rows(readJson(`desc-tools/batches/cards/${batch}-cards.json`));
if (cards.length) {
  const caa = rows(readJson(`batch-progress/${batch}/caa.json`));
  const P = readJson('batch-progress/probe/previews.json') || {};
  console.log(`## 卡單：${cards.length} 張（a ${cards.filter(c => c.group === 'a').length}／b ${cards.filter(c => c.group === 'b').length}）`);
  for (const g of ['a', 'b']) {
    const r = cards.filter(c => c.group === g);
    if (!r.length) continue;
    const noS = r.filter(c => { const p = P[`${c.artist}|${c.album}`]; return !p || p.status !== 'ready'; });
    const noC = caa.filter(c => c.g === g && !c.art);
    console.log(`- ${g} 組 ${r.length} 張｜無串流 ${noS.length}：${noS.map(c => c.album).join('／') || '—'}`);
    console.log(`  ｜無封面 ${noC.length}：${noC.map(c => c.album).join('／') || '—'}`);
  }
  console.log();
}

// ── 研究稿／鉤子稿／成品的實際張數（派工信最常寫錯的一欄）
for (const [label, dir, suffix] of [['研究稿', 'research', ['-a', '-b']],
                                    ['鉤子稿', 'hooks', ['-hooks-a', '-hooks-b']],
                                    ['寫作輸入', 'input', ['-writer-1', '-writer-2']],
                                    ['成品', 'output', ['-out-1', '-out-2']]]) {
  const got = suffix.map(sx => rows(readJson(`desc-tools/batches/${dir}/${batch}${sx}.json`)).length);
  if (got.some(x => x)) console.log(`- ${label}：${suffix.map((sx, i) => `${batch}${sx} **${got[i]} 筆**`).join('／')}`);
}

// ── 上一批的倒量參考（⚠ 檔名逐字印出來，不要自己改）
if (prev) {
  console.log(`\n## 倒量參考（上一批 ${prev}，檔名逐字照抄、不要改成本批）`);
  for (const sx of ['-out-1', '-out-2']) {
    const r = rows(readJson(`desc-tools/batches/output/${prev}${sx}.json`));
    if (r.length) console.log(`- \`${prev}${sx}.json\` ${r.length} 張＝**${r.map(x => L(x.desc)).join('／')}**`);
  }
  for (const sx of ['-hooks-a', '-hooks-b']) {
    const r = rows(readJson(`desc-tools/batches/hooks/${prev}${sx}.json`));
    if (!r.length) continue;
    const cnt = (s, t) => ((s || '').split(t).length - 1);
    const b = r.map(x => L(x.hook) + L(x.note) - cnt(x.note, '主故事：') * 4 - cnt(x.note, '→')
      - cnt(x.note, '正文只寫上列各項。') * 9 - cnt(x.note, '這條骨架全批只走本張。') * 11);
    console.log(`- \`${prev}${sx}.json\` ${r.length} 筆＝**${b.join('／')}**（預算，上限 230）`);
  }
}
