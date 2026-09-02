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
  let rg = null;
  for (const id of ids) {
    const j = await get(`https://musicbrainz.org/ws/2/release-group/${id}?fmt=json`);
    await sleep(1100);
    if (j.title) { rg = { id, title: j.title, date: j['first-release-date'] || '', type: j['primary-type'], sec: j['secondary-types'] || [] }; break; }
  }
  if (!rg) { none++; report.push(`✗ ${c.artist}《${c.album}》mbNote 裡沒有任何 release-group MBID`); c.rgMbid = ''; c.identitySource = 'manual'; continue; }
  if (c.rgMbid === rg.id) { ok++; continue; }
  report.push(`修 ${c.artist}《${c.album}》: ${(c.rgMbid || '空').slice(0, 8)}… → ${rg.id.slice(0, 8)}…「${rg.title}」`);
  c.rgMbid = rg.id; c.mbTitle = rg.title; c.mbFirstRelease = rg.date; c.identitySource = 'pinned';
  fixed++;
}
fs.writeFileSync(P, JSON.stringify(cards, null, 1));
console.log(`${batch}: 原本就對 ${ok}｜**修正 ${fixed}**｜無 RG ${none}`);
for (const r of report.slice(0, 40)) console.log('  ' + r);
