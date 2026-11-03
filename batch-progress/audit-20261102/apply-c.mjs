#!/usr/bin/env node
// 方案 C 套用（店主 2026-11-03 拍板「1 c」）：apply-c.json 2,713 張 → seed／manifest／card_catalog payload。
// 用法：
//   node batch-progress/audit-20261102/apply-c.mjs --seed       # seed_cards.json 三軸欄＋tier 欄
//   node batch-progress/audit-20261102/apply-c.mjs --manifest   # 根目錄 manifest＋batch-progress/add-*/ 副本
//   node batch-progress/audit-20261102/apply-c.mjs --catalog    # 產 publish-stage/audit-20261102/card-catalog-patches.json
// 冪等：seed 已是新值的列算「已是新值」略過；manifest 值相同且 source 已是本輪的略過。
// seed 列慣例（scripts/pool.mjs、publish-manifest.mjs）：一般卡無 composer 長 7、有 composer 長 8；頂點卡補到 8 再加 tier。
import fs from 'node:fs';
const D = 'batch-progress/audit-20261102/';
const SRC = 'manual:audit-20261102', AT = '2026-11-03T00:00:00Z';
const J = p => JSON.parse(fs.readFileSync(p, 'utf8'));
const rarityOf = (c, o, a) => { const s = c + a + (o >= 5 ? 1 : 0); return s >= 9 ? 'legendary' : s >= 8 ? 'epic' : s >= 7 ? 'uncommon' : s >= 6 ? 'rare' : 'common'; };
const TN = { hall: '殿堂', pearl: '流亡', heresy: '異端' };
const list = J(D + 'apply-c.json');
const map = new Map(list.map(x => [x.key, x]));
if (map.size !== list.length) throw new Error('apply-c 有重複鍵');

const shapeRow = (r, nw) => {
  const row = r.slice(0, 8); while (row.length < 8) row.push(null);
  row[2] = nw.classic; row[3] = nw.obscurity; row[4] = nw.accessibility;
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
    const cur = { classic: r[2], obscurity: r[3], accessibility: r[4], tier: r[8] || null };
    const eq = (a, b) => a.classic === b.classic && a.obscurity === b.obscurity && a.accessibility === b.accessibility && a.tier === b.tier;
    if (eq(cur, x.new)) { already++; return r; }
    if (!eq(cur, x.old)) throw new Error('seed 現值與 old 不符 ' + x.key);
    hits++; return shapeRow(r, x.new);
  });
  // 防呆 1：總筆數不變；防呆 2：命中＝要改數；防呆 3：逐列只動三軸、tier（與降級時無作曲家的尾端 null）
  if (after.length !== before.length) throw new Error('總筆數變了');
  if (hits + already !== list.length) throw new Error(`命中 ${hits}+${already} ≠ ${list.length}`);
  for (let i = 0; i < before.length; i++) {
    const b = before[i], a = after[i], x = map.get(b[0] + '|' + b[1]);
    const rest = r => JSON.stringify([r[0], r[1], r[5], r[6], r[7] ?? null]);
    if (rest(a) !== rest(b)) throw new Error('非三軸／tier 欄變動 ' + b[0]);
    if (!x) { if (JSON.stringify(a) !== JSON.stringify(b)) throw new Error('範圍外變動 ' + b[0]); continue; }
    if (a[2] !== x.new.classic || a[3] !== x.new.obscurity || a[4] !== x.new.accessibility || (a[8] || null) !== x.new.tier) throw new Error('新值不符 ' + x.key);
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
  let mfiles = 0, mcards = 0; const seen = new Set(), touched = [];
  for (const f of files) {
    const b = (f.match(/^onboarding-manifest-(add-.*?)-\d{8}b?\.json$/) || [])[1];
    const paths = [f]; if (b && fs.existsSync(`batch-progress/${b}/onboarding-manifest.json`)) paths.push(`batch-progress/${b}/onboarding-manifest.json`);
    for (const p of paths) {
      const raw = fs.readFileSync(p, 'utf8'); const m = JSON.parse(raw); let n = 0;
      const ind = (raw.match(/^\{\r?\n( +|\t)/) || [, ' '])[1];
      for (const a of m.albums || []) {
        const x = map.get(a.artist + '|' + a.album); if (!x) continue;
        seen.add(x.key);
        const nw = x.new, r = a.ratings, ap = a.apexAssessment || {};
        const rar = rarityOf(nw.classic, nw.obscurity, nw.accessibility);
        const curTier = ap.eligible ? ap.tier : null;
        const done = r.classic === nw.classic && r.obscurity === nw.obscurity && r.accessibility === nw.accessibility && a.rarity === rar && curTier === nw.tier;
        if (done) continue;
        const axChanged = x.old.classic !== nw.classic || x.old.obscurity !== nw.obscurity || x.old.accessibility !== nw.accessibility;
        if (axChanged || r.classic !== nw.classic || r.obscurity !== nw.obscurity || r.accessibility !== nw.accessibility) {
          if (r.source !== SRC) r.previous = { classic: r.classic, obscurity: r.obscurity, accessibility: r.accessibility, source: r.source, checkedAt: r.checkedAt, ...(r.note ? { note: r.note } : {}), rarity: a.rarity };
          r.classic = nw.classic; r.obscurity = nw.obscurity; r.accessibility = nw.accessibility;
          r.source = SRC; r.checkedAt = AT;
          r.note = '全池稽核 audit-20261102（方案 C）：' + (x.why || '') + (nw.obscurity !== undefined && x.listeners != null ? `｜L=${x.listeners}` : '');
        }
        if (curTier !== nw.tier) {
          const prev = { eligible: !!ap.eligible, tier: ap.tier ?? null, reason: ap.reason ?? null, evidenceUrls: ap.evidenceUrls || [] };
          const reason = nw.tier
            ? `方案 C（audit-20261102，2026-11-03）：升為${TN[nw.tier]}（該軸 7 星）。` + (nw.tier === 'pearl' && !x.apexWhy ? `流亡照原始定義：Last.fm listeners ${x.listeners}（1–299、非疑錯配）、稽核冷門度 5。` : (x.apexWhy || ''))
            : `方案 C（audit-20261102，2026-11-03）：原${TN[curTier] || curTier}未達該軸 7 星，降為一般卡。` + (x.apexWhy || x.why || '');
          a.apexAssessment = { eligible: !!nw.tier, tier: nw.tier, reason, evidenceUrls: nw.tier ? (x.evidence || []) : [], previous: ap.previous || prev, assessedAt: AT, source: SRC };
        }
        a.rarity = rar; n++;
      }
      if (n) { fs.writeFileSync(p, JSON.stringify(m, null, ind) + (raw.endsWith('\n') ? '\n' : '')); mfiles++; mcards += n; touched.push(p); }
    }
  }
  if (touched.length) fs.writeFileSync(D + 'touched-manifests.json', JSON.stringify(touched, null, 1) + '\n');
  console.log(`manifest：改 ${mfiles} 檔、${mcards} 筆｜apply-c 有 manifest 的 ${seen.size}／${list.length}（其餘為早期無 manifest 的卡）`);
}

if (process.argv.includes('--catalog')) {
  // card_catalog：classic／obscurity／accessibility／rarity＋tier／apex。降級卡 tier、apex 欄刪除（updateMask 帶欄名、body 不帶＝刪），與一般卡一致（一般卡無這兩欄）。
  const cardIdOf = (artist, album) => `${artist}|${album}`.toLowerCase().replace(/\//g, '-').trim();
  const iv = n => ({ integerValue: String(n) });
  const patches = list.map(x => {
    const nw = x.new, fields = { classic: iv(nw.classic), obscurity: iv(nw.obscurity), accessibility: iv(nw.accessibility), rarity: { stringValue: rarityOf(nw.classic, nw.obscurity, nw.accessibility) } };
    const mask = ['classic', 'obscurity', 'accessibility', 'rarity', 'tier', 'apex'];
    if (nw.tier) { fields.tier = { stringValue: nw.tier }; fields.apex = { booleanValue: true }; }
    else if (x.old.tier) { fields.seed = { booleanValue: true }; mask.push('seed'); } // 降級：與一般卡一致（後台 seed 匯入寫的 seed:true）
    return { key: x.key, docId: cardIdOf(...x.key.split('|')), updateMask: mask, body: { fields } };
  });
  fs.mkdirSync('publish-stage/audit-20261102', { recursive: true });
  fs.writeFileSync('publish-stage/audit-20261102/card-catalog-patches.json', JSON.stringify(patches, null, 0));
  console.log(`card_catalog payload ${patches.length} 筆（頂點 ${patches.filter(p => p.body.fields.tier).length}）`);
}
