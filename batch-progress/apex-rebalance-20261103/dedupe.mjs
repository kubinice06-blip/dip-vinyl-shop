#!/usr/bin/env node
// 池中重複卡合併（店主 2026-11-03「3 好」，HALL-EXPANSION.md「同批處理」）。
// 做法沿用 audits/pool-fix-20261016/apply.mjs（刪重複）與 rename-utada-20261025（換鍵＋刪舊）。
//   [刪, 留]：
//     The Beatles《The Beatles (White Album)》(2000) → 留《The Beatles》(1968)
//     Guru《Jazzmatazz Volume 1》→ 留《Jazzmatazz, Vol. 1》（本批升殿堂）
// 用法（repo 根目錄）：
//   node batch-progress/apex-rebalance-20261103/dedupe.mjs --local    本機檔：seed 刪 2 列、manifest 刪 1 列、子曲風／情緒底稿／年份刪鍵、
//                                                                     試聽對照併入保留卡後刪鍵（接著重建 runtime 與情緒前台檔）
//   node batch-progress/apex-rebalance-20261103/dedupe.mjs --kv       KV：被刪那筆有、保留那筆沒有的併過去；被刪那筆的鍵刪除（先備份）
//   node batch-progress/apex-rebalance-20261103/dedupe.mjs --catalog  card_catalog：保留那筆補欄位；被刪那筆文件刪除（先備份）
//   node batch-progress/apex-rebalance-20261103/dedupe.mjs --verify   全部終態檢查
// 每一段都可重跑（已是終態就 0 變動）。
import fs from 'node:fs';

const D = 'batch-progress/apex-rebalance-20261103/';
const BK = D + 'dedupe-backup/';
const J = p => JSON.parse(fs.readFileSync(p, 'utf8'));
const DUPES = [
  { drop: ['The Beatles', 'The Beatles (White Album)'], keep: ['The Beatles', 'The Beatles'] },
  { drop: ['Guru', 'Jazzmatazz Volume 1'], keep: ['Guru', 'Jazzmatazz, Vol. 1'] },
];
const pk = (a, b) => `${a}|${b}`;
const kvKey = (a, b) => `${a}|${b}`.toLowerCase();
const cardId = (a, b) => `${a}|${b}`.toLowerCase().replace(/\//g, '-').trim();
const audioNorm = v => String(v || '').normalize('NFKD').toLowerCase().replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9㐀-鿿぀-ヿᄀ-ᇿ㄰-㆏가-힯]+/g, '');
const audioKey = (a, b) => `${audioNorm(a)}\u0000${audioNorm(b)}`;
const ACC = '3a23f905e8f31d91c85050f2ed304321', NS = '5f65e74b17d644b68a3f542b08a5c105';
const KVB = `https://api.cloudflare.com/client/v4/accounts/${ACC}/storage/kv/namespaces/${NS}`;
const KH = { Authorization: 'Bearer ' + process.env.CLOUDFLARE_API_TOKEN, 'Content-Type': 'application/json' };
const PRE = ['desc', 'desc1', 'desc2', 'desc3', 'desc4', 'rating', 'rating1', 'rating2', 'rating3', 'rating4',
  'mapgenre1', 'mapgenre2', 'mapgenre3', 'cover', 'cover2', 'cover3', 'cover4', 'cover5', 'cover6', 'bc1', 'bc2'];
const FS = 'https://firestore.googleapis.com/v1/projects/price-manager-e8846/databases/(default)/documents/card_catalog/';
const FKEY = 'AIzaSyBpR5XKKHwT_eQoShtBPtFNRXz4ymzPWQg';
const arg = k => process.argv.includes(k);
const writeKeepFormat = (p, raw, obj) => {
  const ind = raw.startsWith('{\n') || raw.startsWith('[\n') ? (raw.match(/^[\[{]\r?\n( +|\t)/) || [, ' '])[1] : undefined;
  const out = JSON.stringify(obj, null, ind) + (raw.endsWith('\n') ? '\n' : '');
  if (out !== raw) { fs.writeFileSync(p, out); return true; } return false;
};
const roundTrips = (raw, obj) => {
  const ind = raw.startsWith('{\n') || raw.startsWith('[\n') ? (raw.match(/^[\[{]\r?\n( +|\t)/) || [, ' '])[1] : undefined;
  return JSON.stringify(obj, null, ind) + (raw.endsWith('\n') ? '\n' : '') === raw;
};
fs.mkdirSync(BK, { recursive: true });

if (arg('--local')) {
  const log = [];
  // 1. seed：刪 2 列（三道防呆：總筆數 −2、只刪這 2 列、保留那筆存在且不動）
  {
    const raw = fs.readFileSync('seed_cards.json', 'utf8'), seed = JSON.parse(raw);
    const eol = raw.includes('],\r\n[') ? ',\r\n' : ',\n', tail = /\r?\n$/.exec(raw)?.[0] || '';
    const render = rows => '[' + rows.map(r => JSON.stringify(r)).join(eol) + ']' + tail;
    if (render(seed) !== raw) throw new Error('seed 排版自檢失敗');
    const dropKeys = new Set(DUPES.map(d => pk(...d.drop)));
    const hit = seed.filter(r => dropKeys.has(pk(r[0], r[1])));
    for (const d of DUPES) if (seed.filter(r => pk(r[0], r[1]) === pk(...d.keep)).length !== 1) throw new Error('保留列不是恰好 1 列 ' + pk(...d.keep));
    if (hit.length) {
      if (hit.length !== DUPES.length) throw new Error('刪除命中 ' + hit.length);
      if (!fs.existsSync(BK + 'seed-rows-dropped.json')) fs.writeFileSync(BK + 'seed-rows-dropped.json', JSON.stringify(hit) + '\n');
      const kept = seed.filter(r => !dropKeys.has(pk(r[0], r[1])));
      if (kept.length !== seed.length - DUPES.length) throw new Error('總筆數不符');
      // 逐列比對：其餘列一字不差
      const a = seed.filter(r => !dropKeys.has(pk(r[0], r[1]))).map(r => JSON.stringify(r)).join('\n');
      if (a !== kept.map(r => JSON.stringify(r)).join('\n')) throw new Error('範圍外變動');
      fs.writeFileSync('seed_cards.json', render(kept));
      log.push(`seed ${seed.length} → ${kept.length}`);
    } else log.push('seed 已是終態');
  }
  // 2. manifest：刪被刪那筆的 albums 列（根目錄＋batch-progress/add-*/ 副本）
  {
    const files = fs.readdirSync('.').filter(f => /^onboarding-manifest-.*\.json$/.test(f));
    for (const f of files) {
      const b = (f.match(/^onboarding-manifest-(add-.*?)-\d{8}b?\.json$/) || [])[1];
      const paths = [f]; if (b && fs.existsSync(`batch-progress/${b}/onboarding-manifest.json`)) paths.push(`batch-progress/${b}/onboarding-manifest.json`);
      for (const p of paths) {
        const raw = fs.readFileSync(p, 'utf8'); const m = JSON.parse(raw);
        const dropped = (m.albums || []).filter(a => DUPES.some(d => a.artist === d.drop[0] && a.album === d.drop[1]));
        if (!dropped.length) continue;
        if (!roundTrips(raw, m)) throw new Error('manifest 排版自檢失敗 ' + p);
        fs.writeFileSync(BK + 'manifest-rows-dropped-' + p.replace(/\//g, '__'), JSON.stringify(dropped, null, 1) + '\n');
        const n0 = m.albums.length;
        m.albums = m.albums.filter(a => !dropped.includes(a));
        writeKeepFormat(p, raw, m);
        log.push(`manifest ${p}：albums ${n0} → ${m.albums.length}（刪 ${dropped.map(a => a.artist + '《' + a.album + '》').join('、')}）`);
      }
    }
  }
  // 3. 子曲風表、情緒底稿、年份：刪被刪那筆的鍵（保留那筆都已有自己的值）
  const dropFrom = (p, keyOf, getObj = j => j) => {
    const raw = fs.readFileSync(p, 'utf8'), j = JSON.parse(raw), o = getObj(j);
    if (!roundTrips(raw, j)) throw new Error('排版自檢失敗 ' + p);
    const n = [];
    for (const d of DUPES) {
      const k = keyOf(...d.drop), kk = keyOf(...d.keep);
      if (k in o) { if (!(kk in o)) throw new Error(`${p}：保留那筆沒有值 ${kk}，先併再刪`); delete o[k]; n.push(k); }
    }
    if (writeKeepFormat(p, raw, j)) log.push(`${p}：刪 ${n.length} 鍵`); else log.push(`${p}：已是終態`);
  };
  dropFrom('card-subgenres.json', pk);
  dropFrom('data/mood/card-moods-v0.json', kvKey, j => j.cards || j);
  {
    const raw = fs.readFileSync('data/release-years-v1.json', 'utf8'), j = JSON.parse(raw); let n = 0;
    for (const d of DUPES) { const k = audioKey(...d.drop); if (k in j.entries) { delete j.entries[k]; n++; } }
    if (writeKeepFormat('data/release-years-v1.json', raw, j)) log.push(`release-years-v1：刪 ${n} 鍵`); else log.push('release-years-v1：已是終態');
  }
  // 4. 試聽對照：保留那筆 unavailable、被刪那筆 matched → 併過去（artist／album 改成保留那筆），再刪被刪那筆
  {
    const p = 'data/apple-audio-map-v1.json', raw = fs.readFileSync(p, 'utf8'), j = JSON.parse(raw), E = j.entries;
    if (!roundTrips(raw, j)) throw new Error('排版自檢失敗 ' + p);
    for (const d of DUPES) {
      const k = audioKey(...d.drop), kk = audioKey(...d.keep);
      const o = E[k], keep = E[kk];
      if (!o) continue;
      fs.writeFileSync(BK + 'apple-audio-' + audioNorm(d.drop[1]) + '.json', JSON.stringify({ drop: o, keepBefore: keep ?? null }, null, 1) + '\n');
      if (o.status === 'matched' && (!keep || keep.status !== 'matched')) {
        E[kk] = { ...o, artist: d.keep[0], album: d.keep[1], pool: keep?.pool ?? 'seed',
          note: `2026-11-03 重複卡合併：由《${d.drop[1]}》的配對併入（原本此筆 ${keep?.status || '無'}）` + (o.note ? '；' + o.note : '') };
        log.push(`試聽：${pk(...d.drop)} 的 matched 併入 ${pk(...d.keep)}`);
      }
      delete E[k]; log.push(`試聽：刪 ${pk(...d.drop)}`);
    }
    writeKeepFormat(p, raw, j);
  }
  console.log(log.join('\n'));
}

async function kvGet(keys) {
  const j = await (await fetch(`${KVB}/bulk/get`, { method: 'POST', headers: KH, body: JSON.stringify({ keys }) })).json();
  if (!j.success) throw new Error('KV 讀取失敗 ' + JSON.stringify(j.errors).slice(0, 200));
  const out = {}; for (const [k, v] of Object.entries(j.result.values)) if (v != null) out[k] = typeof v === 'string' ? v : JSON.stringify(v);
  return out;
}
const empty = v => v == null || v === '' || v === '{}' || v === 'null';

if (arg('--kv')) {
  const keys = DUPES.flatMap(d => PRE.flatMap(p => [`${p}:${kvKey(...d.drop)}`, `${p}:${kvKey(...d.keep)}`]));
  const kv = await kvGet(keys);
  if (!fs.existsSync(BK + 'kv-backup.json')) fs.writeFileSync(BK + 'kv-backup.json', JSON.stringify(Object.fromEntries(keys.map(k => [k, kv[k] ?? null])), null, 1) + '\n');
  const puts = new Map(), dels = [];
  for (const d of DUPES) for (const p of PRE) {
    const o = `${p}:${kvKey(...d.drop)}`, n = `${p}:${kvKey(...d.keep)}`;
    if (kv[o] == null) continue;
    dels.push(o);
    if (empty(kv[n]) && !empty(kv[o])) { puts.set(n, kv[o]); continue; }
    // 封面：保留那筆沒有 spotifyUrl、被刪那筆有 → 只補這一欄（圖仍用保留那筆的）
    if (p === 'cover6' && !empty(kv[n])) {
      const a = JSON.parse(kv[n]), b = JSON.parse(kv[o]);
      if (!a.spotifyUrl && b.spotifyUrl) puts.set(n, JSON.stringify({ ...a, spotifyUrl: b.spotifyUrl }));
    }
  }
  for (const [key, value] of puts) {
    const r = await fetch(`${KVB}/values/${encodeURIComponent(key)}`, { method: 'PUT', headers: { ...KH, 'Content-Type': 'text/plain' }, body: value });
    if (!r.ok) throw new Error('KV 寫入失敗 ' + key + ' ' + r.status);
  }
  const back = await kvGet([...puts.keys()]);
  const badPut = [...puts].filter(([k, v]) => back[k] !== v);
  if (badPut.length) throw new Error('KV 回讀不符 ' + badPut.map(x => x[0]).join(','));
  for (const key of dels) {
    const r = await fetch(`${KVB}/values/${encodeURIComponent(key)}`, { method: 'DELETE', headers: KH });
    if (!r.ok) throw new Error('KV 刪除失敗 ' + key + ' ' + r.status);
  }
  console.log(`KV：寫 ${puts.size}（回讀一致）${[...puts.keys()].map(k => '\n  寫 ' + k).join('')}\n刪 ${dels.length}${dels.map(k => '\n  刪 ' + k).join('')}`);
}

const fsGet = async id => { const r = await fetch(FS + encodeURIComponent(id) + '?key=' + FKEY); return r.status === 404 ? null : (await r.json()); };
if (arg('--catalog')) {
  const bkp = BK + 'card-catalog-backup.json';
  const bk = fs.existsSync(bkp) ? J(bkp) : {};
  for (const d of DUPES) for (const x of [d.drop, d.keep]) { const id = cardId(...x); if (!(id in bk)) bk[id] = await fsGet(id); }
  fs.writeFileSync(bkp, JSON.stringify(bk, null, 1) + '\n');
  for (const d of DUPES) {
    const o = bk[cardId(...d.drop)]?.fields, kId = cardId(...d.keep), cur = (await fsGet(kId))?.fields;
    if (!cur) throw new Error('保留那筆沒有 card_catalog 文件 ' + kId);
    // 身分欄：保留那筆沒有、被刪那筆有的 upc／rgMbid 併過去（同一張碟的 MB release-group 與條碼）
    const add = {};
    for (const f of ['upc', 'rgMbid']) if (o?.[f] && !cur[f]) add[f] = o[f];
    if (Object.keys(add).length) {
      const url = `${FS}${encodeURIComponent(kId)}?${Object.keys(add).map(f => 'updateMask.fieldPaths=' + f).join('&')}&currentDocument.exists=true&key=${FKEY}`;
      const r = await fetch(url, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ fields: add }) });
      console.log(r.ok ? '✓' : '✗', '補', kId, Object.keys(add).join(','), r.ok ? '' : (await r.text()).slice(0, 200));
    }
    const dId = cardId(...d.drop);
    if (await fsGet(dId)) {
      const r = await fetch(`${FS}${encodeURIComponent(dId)}?key=${FKEY}`, { method: 'DELETE' });
      console.log(r.ok ? '✓' : '✗', '刪', dId, r.ok ? '' : (await r.text()).slice(0, 200));
    } else console.log('- 已不存在', dId);
  }
}

if (arg('--verify')) {
  const bad = [];
  const seed = J('seed_cards.json');
  for (const d of DUPES) {
    if (seed.some(r => pk(r[0], r[1]) === pk(...d.drop))) bad.push('seed 仍有 ' + pk(...d.drop));
    if (seed.filter(r => pk(r[0], r[1]) === pk(...d.keep)).length !== 1) bad.push('seed 保留列不是 1 ' + pk(...d.keep));
  }
  const sub = J('card-subgenres.json'), mood = J('data/mood/card-moods-v0.json'), ry = J('data/release-years-v1.json').entries;
  const am = J('data/apple-audio-map-v1.json').entries, rt = J('data/apple-audio-runtime-v1.json').entries;
  for (const d of DUPES) {
    if (pk(...d.drop) in sub) bad.push('子曲風仍有'); if (kvKey(...d.drop) in (mood.cards || mood)) bad.push('情緒仍有');
    if (audioKey(...d.drop) in ry || audioKey(...d.drop) in am || audioKey(...d.drop) in rt) bad.push('年份／試聽仍有 ' + pk(...d.drop));
    if (!(audioKey(...d.keep) in rt)) bad.push('runtime 試聽缺保留那筆 ' + pk(...d.keep));
  }
  for (const f of fs.readdirSync('.').filter(f => /^onboarding-manifest-.*\.json$/.test(f)))
    for (const a of J(f).albums || []) if (DUPES.some(d => a.artist === d.drop[0] && a.album === d.drop[1])) bad.push('manifest 仍有 ' + f);
  if (process.env.CLOUDFLARE_API_TOKEN) {
    const kv = await kvGet(DUPES.flatMap(d => PRE.map(p => `${p}:${kvKey(...d.drop)}`)));
    for (const k of Object.keys(kv)) bad.push('KV 仍有 ' + k);
  }
  for (const d of DUPES) { if (await fsGet(cardId(...d.drop))) bad.push('card_catalog 仍有 ' + cardId(...d.drop)); if (!(await fsGet(cardId(...d.keep)))) bad.push('card_catalog 缺保留 ' + cardId(...d.keep)); }
  console.log(bad.length ? '✗ ' + bad.join('\n✗ ') : '✓ 重複合併終態全部相符'); process.exit(bad.length ? 1 : 0);
}
