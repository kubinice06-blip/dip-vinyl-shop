// c-51（155 張）與 c-SEA（99 張）共 254 張的封面探測。
// 用法：node batch-progress/probe/probe-covers.mjs [批名...]（省略＝全部七批）
//
// 為什麼雲端做這件事：`ALBUM_ONBOARDING.md` 的完成標準第 1 項是「正確且實際可讀的
// 封面」，第 5 項是固定試聽。這兩項在本機是逐張手工，但**判定所需的全部資訊都在
// 公開 HTTP 端點上**，雲端跑完等於把本機的工作從「逐張查」降成「逐張決定」。
// 雲端不寫 KV／Firestore／seed_cards（REMOTE_RUNBOOK），只產出探測結果檔。
//
// 這批的有利條件：**254 張全部已有 rgMbid**，所以不必再向 MB 做模糊查詢，
// 直接拿 ID 問 CAA。ctw3 那次要先查 MB 是因為那批本來就沒有 MBID。
//
// CAA 的坑（ctw3 實測）：**封面常常只掛在某一個 release 上、release-group 層是空的**。
// 只查 group 會系統性低估覆蓋率。所以 group 落空時要列出底下的 release 逐一試。
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib.mjs';

const UA = { 'User-Agent': 'dip-vinyl-shop/1.0 (https://github.com/kubinice06-blip/dip-vinyl-shop)' };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const DIR = path.join(ROOT, 'batch-progress/probe');
const BATCHES = process.argv.slice(2).length ? process.argv.slice(2)
  : ['c51a', 'c51b', 'c51c', 'c51d', 'cseaa', 'cseab', 'cseac'];

const cards = [];
for (const b of BATCHES)
  for (const c of JSON.parse(fs.readFileSync(path.join(ROOT, `desc-tools/batches/cards/${b}-cards.json`), 'utf8')))
    cards.push({ ...c, batch: b });

const OUT = path.join(DIR, 'covers.json');
// 可續跑：MB／CAA 會逾時，重跑時已有結果的不再打。
const out = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {};

// HTTP 錯誤與逾時**不是**「查無」——ctw3 的前身就是把逾時當成 404，
// 產出的覆蓋率報告整份不可信。這裡把三種狀態分開記。
const head = async url => {
  try {
    const r = await fetch(url, { headers: UA, redirect: 'follow', signal: AbortSignal.timeout(20000) });
    return r.ok ? { ok: true, status: r.status } : { ok: false, status: r.status };
  } catch (e) { return { _err: String(e.name || e).slice(0, 40) }; }
};

let n = 0, done = 0;
for (const c of cards) {
  const k = `${c.artist}|${c.album}`;
  n++;
  if (out[k] && !out[k]._err) { done++; continue; }
  if (!c.rgMbid) { out[k] = { batch: c.batch, _noMbid: true }; continue; }

  const rec = { batch: c.batch, rgMbid: c.rgMbid };
  const g = await head(`https://coverartarchive.org/release-group/${c.rgMbid}`);
  if (g.ok) rec.art = { level: 'release-group', id: c.rgMbid };
  else if (g._err) rec._err = 'group:' + g._err;

  // group 層無圖才往下列 release。404 是真的沒有，其他狀態碼與逾時不往下走，
  // 否則會拿一個未知狀態去產生「逐一試過都沒有」的假結論。
  if (!rec.art && g.status === 404) {
    let rels = [];
    try {
      const j = await (await fetch(
        `https://musicbrainz.org/ws/2/release?release-group=${c.rgMbid}&fmt=json&limit=25`,
        { headers: UA, signal: AbortSignal.timeout(25000) })).json();
      rels = (j.releases || []).map(x => ({ id: x.id, date: x.date || '', country: x.country || '' }));
    } catch (e) { rec._err = 'mb:' + String(e.name || e).slice(0, 30); }
    await sleep(1100);                       // MB 規定 1 req/s
    rec.releaseCount = rels.length;
    for (const r of rels) {
      const a = await head(`https://coverartarchive.org/release/${r.id}`);
      if (a.ok) { rec.art = { level: 'release', id: r.id, date: r.date, country: r.country }; break; }
      await sleep(350);
    }
  }
  out[k] = rec;
  done++;
  const mark = rec.art ? '✓' : (rec._err ? '!' : '✗');
  console.log(`${mark} [${c.batch}] ${c.artist}《${c.album}》${rec.art ? ` CAA ${rec.art.level}` : rec._err ? ` 未完成 ${rec._err}` : ' 無圖'}`);
  if (done % 10 === 0) fs.writeFileSync(OUT, JSON.stringify(out, null, 1));
  await sleep(250);
}
fs.writeFileSync(OUT, JSON.stringify(out, null, 1));
const v = Object.values(out);
console.log(`\n共 ${cards.length} 張｜CAA 有圖 ${v.filter(x => x.art).length}｜無圖 ${v.filter(x => !x.art && !x._err).length}｜未完成 ${v.filter(x => x._err).length}`);
