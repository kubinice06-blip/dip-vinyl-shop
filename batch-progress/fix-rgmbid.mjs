// 修 make-cards-generic.mjs 的 bug：它抽 mbNote 裡的「第一個」MBID 當 rgMbid，
// 但策展層若用 `release-group?artist=<MBID>` browse，寫下的第一個就是**藝人 MBID**。
// 這正是 c-52 裁定第 1 條記錄過的錯（mbNote 混了兩種實體），我卻在通用腳本裡重蹈覆轍。
//
// 正確做法：把 mbNote 裡**所有** MBID 都拿去回問 MB，取第一個確實是 release-group 的。
// 用法：node batch-progress/fix-rgmbid.mjs <批名>
import fs from 'node:fs';
const UA = { 'User-Agent': 'dip-vinyl-shop/1.0 (kubinice06@gmail.com)' };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const MBID = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/g;
const get = async u => {
  for (let i = 0; i < 4; i++) {
    const r = await fetch(u, { headers: UA, signal: AbortSignal.timeout(25000) }).catch(() => null);
    if (!r) { await sleep(1500); continue; }
    if (r.status === 503) { await sleep(2000 * (i + 1)); continue; }   // 裁定第 28 條
    if (r.status === 404) return { _404: 1 };
    if (!r.ok) return { _s: r.status };
    return await r.json().catch(() => ({ _bad: 1 }));
  }
  return { _err: 1 };
};

const batch = process.argv[2];
const P = `desc-tools/batches/cards/${batch}-cards.json`;
const cards = JSON.parse(fs.readFileSync(P, 'utf8'));
let fixed = 0, ok = 0, none = 0; const report = [];
for (const c of cards) {
  const ids = [...new Set((c.mbNote || '').match(MBID) || [])];
  if (!ids.length) { none++; continue; }
  // 只確認「是 release-group」不夠——mbNote 常同時記著**不可誤釘的對照組**
  // （c-58 的 Kashmere Stage Band 就在 mbNote 裡明寫「同藝人另有某某合輯，不可誤釘」）。
  // 第一版腳本沒比對標題，結果把正規盤換成了那張合輯。所以：先收集所有 release-group，
  // 標題與卡片盤名吻合者優先，其次才看順序；且合輯只在卡片本身就是合輯時才採用。
  const norm = x => String(x || '').toLowerCase().normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\u4e00-\u9fff]/g, '');
  const found = [];
  for (const id of ids) {
    const j = await get(`https://musicbrainz.org/ws/2/release-group/${id}?fmt=json`);
    await sleep(1100);
    if (j.title) found.push({ id, title: j.title, date: j['first-release-date'] || '',
                              type: j['primary-type'], sec: j['secondary-types'] || [] });
  }
  const wantComp = c.releaseType === 'Compilation';
  const score = x => {
    const a = norm(c.album), b = norm(x.title);
    let s = 0;
    if (a && b === a) s += 10; else if (a && (b.includes(a) || a.includes(b))) s += 4;
    const isComp = (x.sec || []).includes('Compilation');
    s += (isComp === wantComp) ? 3 : -6;
    if (x.date && c.year && String(x.date).slice(0, 4) === String(c.year)) s += 2;
    return s;
  };
  found.sort((a, b) => score(b) - score(a));
  const rg = found.length && score(found[0]) > 0 ? found[0] : null;
  if (found.length && !rg) report.push(`⚠ ${c.artist}《${c.album}》mbNote 的 release-group 標題都對不上，未更動`);
  // **絕不因為這次查不到就清空既有的 rgMbid。** 查詢失敗（503、逾時、暫時性錯誤）
  // 與「這個 MBID 不是 release-group」在程式裡長得一樣——裁定第 28 條講的就是這件事，
  // 而第一版的這支腳本自己又犯了一次：c-55 的 Livaneli 第一輪修好、第二輪因 503
  // 查不到就被清成空值。既有值只在「查到了更好的」時才換掉。
  if (!rg) {
    if (!found.length) none++;
    report.push(`✗ ${c.artist}《${c.album}》這次沒查到可用的 release-group` +
                (c.rgMbid ? `（保留既有值 ${c.rgMbid.slice(0, 8)}…）` : '（本來就是空的）'));
    continue;
  }
  if (c.rgMbid === rg.id) { ok++; continue; }
  report.push(`修 ${c.artist}《${c.album}》: ${(c.rgMbid || '空').slice(0, 8)}… → ${rg.id.slice(0, 8)}…「${rg.title}」`);
  c.rgMbid = rg.id; c.mbTitle = rg.title; c.mbFirstRelease = rg.date; c.identitySource = 'pinned';
  fixed++;
}
fs.writeFileSync(P, JSON.stringify(cards, null, 1));
console.log(`${batch}: 原本就對 ${ok}｜**修正 ${fixed}**｜無 RG ${none}`);
for (const r of report.slice(0, 40)) console.log('  ' + r);
