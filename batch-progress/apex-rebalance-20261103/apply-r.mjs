#!/usr/bin/env node
// 頂點重整套用（2026-11-03）：decisions-q1.json＋decisions-q2.json（202 筆）→ seed 第 9 欄／manifest／card_catalog payload。
// 只動 tier；三軸不變（取 seed 現值），稀有度依公式。
// 用法（repo 根目錄）：
//   node batch-progress/apex-rebalance-20261103/apply-r.mjs --build      # 合併兩份決定、驗 from＝seed 現值、檢查目標 → apply-r.json
//   node batch-progress/apex-rebalance-20261103/apply-r.mjs --seed       # seed_cards.json 第 9 欄
//   node batch-progress/apex-rebalance-20261103/apply-r.mjs --manifest   # 根目錄 manifest＋batch-progress/add-*/ 副本
//   node batch-progress/apex-rebalance-20261103/apply-r.mjs --catalog    # publish-stage/apex-rebalance-20261103/card-catalog-patches.json
//   node batch-progress/apex-rebalance-20261103/apply-r.mjs --overrides  # album_overrides.tier 要設／要清清單
// 冪等：seed 已是新值的列略過；manifest tier 已一致的略過。
import fs from 'node:fs';
const D = 'batch-progress/apex-rebalance-20261103/';
const PS = 'publish-stage/apex-rebalance-20261103/';
const SRC = 'manual:apex-rebalance-20261103', AT = '2026-11-03T00:00:00Z';
const J = p => JSON.parse(fs.readFileSync(p, 'utf8'));
const rarityOf = (c, o, a) => { const s = c + a + (o >= 5 ? 1 : 0); return s >= 9 ? 'legendary' : s >= 8 ? 'epic' : s >= 7 ? 'uncommon' : s >= 6 ? 'rare' : 'common'; };
const TN = { hall: '殿堂', pearl: '流亡', heresy: '異端' };
const TARGET = { hall: 170, pearl: 254, heresy: 85 };

if (process.argv.includes('--build')) {
  const dec = [...J(D + 'decisions-q1.json').map(x => ({ ...x, q: 'Q1' })), ...J(D + 'decisions-q2.json').map(x => ({ ...x, q: 'Q2' }))];
  const seed = J('seed_cards.json'); const m = new Map();
  for (const r of seed) { const k = r[0] + '|' + r[1]; if (m.has(k)) throw new Error('seed 重複鍵 ' + k); m.set(k, r); }
  const seen = new Set();
  const out = dec.map(x => {
    if (seen.has(x.key)) throw new Error('決定重複鍵 ' + x.key); seen.add(x.key);
    const r = m.get(x.key); if (!r) throw new Error('seed 無此卡 ' + x.key);
    const cur = r[8] || null;
    if (cur !== x.from && cur !== x.to) throw new Error(`from 不符 ${x.key}：seed ${cur}／from ${x.from}`);
    if (x.from === x.to) throw new Error('from＝to ' + x.key);
    const ax = { classic: r[2], obscurity: r[3], accessibility: r[4] };
    return { key: x.key, q: x.q, old: { ...ax, tier: x.from }, new: { ...ax, tier: x.to }, why: x.why, evidence: x.evidence || [], ...(x.listeners != null ? { listeners: x.listeners } : {}) };
  });
  // 套用後狀態檢查：三級張數、同級一藝人一張
  const nm = new Map(out.map(x => [x.key, x.new.tier]));
  const cnt = {}, per = {};
  for (const r of seed) { const k = r[0] + '|' + r[1]; const t = nm.has(k) ? nm.get(k) : (r[8] || null); if (!t) continue; cnt[t] = (cnt[t] || 0) + 1; const pk = t + '|' + r[0]; per[pk] = (per[pk] || 0) + 1; }
  for (const t in TARGET) if (cnt[t] !== TARGET[t]) throw new Error(`${t} ${cnt[t]} ≠ 目標 ${TARGET[t]}`);
  const multi = Object.entries(per).filter(([, n]) => n > 1);
  if (multi.length) throw new Error('同級多張：' + multi.map(([k, n]) => k + '×' + n).join('；'));
  fs.writeFileSync(D + 'apply-r.json', '[\n' + out.map(x => JSON.stringify(x)).join(',\n') + '\n]\n');
  const tr = {}; for (const x of out) { const k = (x.old.tier || 'null') + '→' + (x.new.tier || 'null'); tr[k] = (tr[k] || 0) + 1; }
  console.log(`apply-r.json ${out.length} 筆｜套用後`, cnt, '｜同級多張 0｜', tr);
}

const list = fs.existsSync(D + 'apply-r.json') ? J(D + 'apply-r.json') : [];
const map = new Map(list.map(x => [x.key, x]));

// seed 列慣例（scripts/pool.mjs）：一般卡無 composer 長 7、有 composer 長 8；頂點卡補到 8 再加 tier。
const shapeRow = (r, nw) => {
  const row = r.slice(0, 8); while (row.length < 8) row.push(null);
  if (nw.tier) row.push(nw.tier); else if (row[7] == null) row.length = 7;
  return row;
};

if (process.argv.includes('--seed')) {
  const raw = fs.readFileSync('seed_cards.json', 'utf8');
  const before = JSON.parse(raw);
  const eol = raw.includes('],\r\n[') ? ',\r\n' : ',\n';
  const tail = /\r?\n$/.exec(raw)?.[0] || '';
  const render = rows => '[' + rows.map(r => JSON.stringify(r)).join(eol) + ']' + tail;
  if (render(before) !== raw) throw new Error('seed 排版與重建方式不符');
  let hits = 0, already = 0;
  const after = before.map(r => {
    const x = map.get(r[0] + '|' + r[1]); if (!x) return r;
    const cur = r[8] || null;
    if (r[2] !== x.old.classic || r[3] !== x.old.obscurity || r[4] !== x.old.accessibility) throw new Error('三軸與 build 時不同 ' + x.key);
    if (cur === x.new.tier) { already++; return r; }
    if (cur !== x.old.tier) throw new Error('seed 現值與 from 不符 ' + x.key);
    hits++; return shapeRow(r, x.new);
  });
  // 防呆 1：總筆數不變；防呆 2：命中＝要改數；防呆 3：逐列只動 tier（與降級時無作曲家的尾端 null）
  if (after.length !== before.length) throw new Error('總筆數變了');
  if (hits + already !== list.length) throw new Error(`命中 ${hits}+${already} ≠ ${list.length}`);
  for (let i = 0; i < before.length; i++) {
    const b = before[i], a = after[i], x = map.get(b[0] + '|' + b[1]);
    const rest = r => JSON.stringify([r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7] ?? null]);
    if (rest(a) !== rest(b)) throw new Error('非 tier 欄變動 ' + b[0]);
    if (!x) { if (JSON.stringify(a) !== JSON.stringify(b)) throw new Error('範圍外變動 ' + b[0]); continue; }
    if ((a[8] || null) !== x.new.tier) throw new Error('新值不符 ' + x.key);
    if (!x.new.tier && a.length > 8) throw new Error('降級列仍超過 8 欄 ' + x.key);
  }
  const out = render(after);
  if (out !== raw) fs.writeFileSync('seed_cards.json', out);
  const tc = {}; for (const r of after) { const t = r[8] || 'none'; tc[t] = (tc[t] || 0) + 1; }
  const rc = {}; for (const r of after) if (!r[8]) { const k = rarityOf(r[2], r[3], r[4]); rc[k] = (rc[k] || 0) + 1; }
  console.log(`seed：改 ${hits}（已是新值 ${already}）｜總筆數 ${after.length}｜tier`, tc, '｜一般卡稀有度', rc);
}

if (process.argv.includes('--manifest')) {
  const files = fs.readdirSync('.').filter(f => /^onboarding-manifest-.*\.json$/.test(f)).sort();
  let mfiles = 0, mcards = 0, drift = 0; const seen = new Set(), touched = [];
  for (const f of files) {
    const b = (f.match(/^onboarding-manifest-(add-.*?)-\d{8}b?\.json$/) || [])[1];
    const paths = [f]; if (b && fs.existsSync(`batch-progress/${b}/onboarding-manifest.json`)) paths.push(`batch-progress/${b}/onboarding-manifest.json`);
    for (const p of paths) {
      const raw = fs.readFileSync(p, 'utf8'); const m = JSON.parse(raw); let n = 0;
      const ind = (raw.match(/^\{\r?\n( +|\t)/) || [, ' '])[1];
      for (const a of m.albums || []) {
        const x = map.get(a.artist + '|' + a.album); if (!x) continue;
        seen.add(x.key);
        const nw = x.new, r = a.ratings || {}, ap = a.apexAssessment || {};
        if (r.classic !== nw.classic || r.obscurity !== nw.obscurity || r.accessibility !== nw.accessibility) drift++;
        const rar = rarityOf(nw.classic, nw.obscurity, nw.accessibility);
        const curTier = ap.eligible ? ap.tier : null;
        const pubOk = !a.published || (a.published.seedCards === !nw.tier && a.published.apexPool === !!nw.tier);
        const pearlEv = () => { const u = [`https://www.last.fm/music/${encodeURIComponent(a.artist)}/${encodeURIComponent(a.album)}`];
          if (a.identity?.rgMbid) u.push(`https://musicbrainz.org/release-group/${a.identity.rgMbid}`);
          if (a.cover?.discogsReleaseId) u.push(`https://www.discogs.com/release/${a.cover.discogsReleaseId}`);
          return u; };
        if (curTier === nw.tier && a.rarity === rar && pubOk) continue;
        if (!pubOk) { a.published.seedCards = !nw.tier; a.published.apexPool = !!nw.tier; }
        if (curTier !== nw.tier) {
          const prev = { eligible: !!ap.eligible, tier: ap.tier ?? null, reason: ap.reason ?? null, evidenceUrls: ap.evidenceUrls || [], ...(ap.source ? { source: ap.source } : {}) };
          const reason = nw.tier
            ? `頂點重整（apex-rebalance-20261103，2026-11-03）：升為${TN[nw.tier]}。${x.why || ''}`
            : `頂點重整（apex-rebalance-20261103，2026-11-03）：原${TN[curTier] || curTier}降為一般卡。${x.why || ''}`;
          let ev = nw.tier ? [...new Set(x.evidence || [])] : [];
          if (nw.tier && ev.length < 2) ev = [...new Set([...ev, ...pearlEv()])];
          a.apexAssessment = { eligible: !!nw.tier, tier: nw.tier, reason, evidenceUrls: ev, previous: prev, assessedAt: AT, source: SRC };
        }
        a.rarity = rar; n++;
      }
      if (n) { fs.writeFileSync(p, JSON.stringify(m, null, ind) + (raw.endsWith('\n') ? '\n' : '')); mfiles++; mcards += n; touched.push(p); }
    }
  }
  if (touched.length) { const prev = fs.existsSync(D + 'touched-manifests.json') ? J(D + 'touched-manifests.json') : []; fs.writeFileSync(D + 'touched-manifests.json', JSON.stringify([...new Set([...prev, ...touched])].sort(), null, 1) + '\n'); }
  console.log(`manifest：改 ${mfiles} 檔、${mcards} 筆｜有 manifest 的 ${seen.size}／${list.length}｜manifest 三軸與 seed 不同 ${drift}（未動）`);
}

if (process.argv.includes('--catalog')) {
  // card_catalog：tier／apex＋rarity。降級卡 tier、apex 欄刪除（updateMask 帶欄名、body 不帶＝刪），補 seed:true（與一般卡一致）。
  const cardIdOf = (artist, album) => `${artist}|${album}`.toLowerCase().replace(/\//g, '-').trim();
  const patches = list.map(x => {
    const nw = x.new, i = x.key.indexOf('|');
    const fields = { rarity: { stringValue: rarityOf(nw.classic, nw.obscurity, nw.accessibility) } };
    const mask = ['rarity', 'tier', 'apex'];
    if (nw.tier) { fields.tier = { stringValue: nw.tier }; fields.apex = { booleanValue: true }; }
    else { fields.seed = { booleanValue: true }; mask.push('seed'); }
    return { key: x.key, docId: cardIdOf(x.key.slice(0, i), x.key.slice(i + 1)), updateMask: mask, body: { fields } };
  });
  fs.mkdirSync(PS, { recursive: true });
  fs.writeFileSync(PS + 'card-catalog-patches.json', JSON.stringify(patches, null, 0));
  fs.writeFileSync(D + 'card-catalog-patches.json', JSON.stringify(patches, null, 0));
  console.log(`card_catalog payload ${patches.length} 筆（升 ${patches.filter(p => p.body.fields.tier).length}／降 ${patches.filter(p => !p.body.fields.tier).length}）`);
}

if (process.argv.includes('--overrides')) {
  const set = list.filter(x => x.new.tier).map(x => ({ key: x.key, tier: x.new.tier }));
  const clear = list.filter(x => !x.new.tier).map(x => ({ key: x.key, was: x.old.tier }));
  const o = { note: '頂點重整 apex-rebalance-20261103：album_overrides.tier 要設／要清（管理員集合，雲端寫不了）。本機後台「頂級牌管理」→「⇄ 依卡池同步頂點旗標」以 seed 第 9 欄為準一鍵處理。', set, clear };
  fs.mkdirSync(PS, { recursive: true });
  for (const p of [PS + 'album-overrides-tier.json', D + 'album-overrides-tier.json']) fs.writeFileSync(p, JSON.stringify(o, null, 1) + '\n');
  console.log(`album_overrides：要設 ${set.length}、要清 ${clear.length}`);
}
