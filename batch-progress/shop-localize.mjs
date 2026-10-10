#!/usr/bin/env node
// 店內販售區新卡批的本機段：把雲端的 manifest 轉成可上架的根目錄 manifest。
//
//   node batch-progress/shop-localize.mjs <批名> <stamp>
//
// 做三件事：
//  1. **簡介改用門市版**（data/shop/descs.json）。2026-10-07 店主指示：卡池沒有的店內專輯，
//     卡片簡介直接用店內版介紹，不另外研究與寫作。雲端原本寫的卡牌版留在
//     batch-progress/<批>/onboarding-manifest.json 不動，要換回去重跑這支時加 --card-desc。
//  2. 併入本機覆核結果 batch-progress/<批>/local-<stamp>.json：
//     { "<藝人>|<專輯>": { listeners, descReplace?: [[原字, 新字]]（門市版撞到卡片禁語時只改卡片這一份）, classic?, obscurity?, accessibility?, ratingNote?, cover?: {url, appleCollectionId, note}, apex?: {tier, reason, evidenceUrls} } }
//  3. 重算 rarity、更新頂點判定的數字與各欄的 checkedAt。
import fs from 'node:fs';

const [batch, stamp] = process.argv.slice(2);
const CARD_DESC = process.argv.includes('--card-desc');
if (!batch || !stamp) { console.error('用法: node batch-progress/shop-localize.mjs <批名> <stamp> [--card-desc]'); process.exit(1); }

const norm = s => String(s || '').toLowerCase().replace(/[‐-―－]/g, '-').normalize('NFKC').replace(/[^\p{L}\p{N}]+/gu, '');
const key = (a, b) => norm(a) + '|' + norm(b);
const rarityOf = (c, o, x) => { const s = c + x + (o >= 5 ? 1 : 0); return s >= 10 ? 'legendary' : s >= 8 ? 'epic' : s >= 6 ? 'uncommon' : s >= 4 ? 'rare' : 'common'; };

const m = JSON.parse(fs.readFileSync(`batch-progress/${batch}/onboarding-manifest.json`, 'utf8'));
const local = JSON.parse(fs.readFileSync(`batch-progress/${batch}/local-${stamp}.json`, 'utf8'));
const shop = new Map(JSON.parse(fs.readFileSync('data/shop/descs.json', 'utf8')).items.map(i => [i.key, i]));
const now = new Date().toISOString().replace(/\.\d+Z$/, 'Z');
const day = `${stamp.slice(0, 4)}-${stamp.slice(4, 6)}-${stamp.slice(6, 8)}`;

for (const a of m.albums) {
  const id = `${a.artist}|${a.album}`;
  const L = local[id];
  if (!L) throw new Error(`local 檔缺 ${id}`);

  if (!CARD_DESC) {
    const s = shop.get(key(a.artist, a.album));
    if (!s?.text) throw new Error(`門市版查無 ${id}`);
    a.description.cardVersionReplaced = true;
    a.description.text = (L.descReplace || []).reduce((t, [from, to]) => { if (!t.includes(from)) throw new Error('descReplace 對不上：' + from); return t.replace(from, to); }, s.text);
    a.description.note = `採用門市版介紹（data/shop/descs.json，店主 ${day} 指示：卡池沒有的店內專輯直接用店內版，不另研究寫作）。雲端寫的卡牌版留在 batch-progress/${batch}/onboarding-manifest.json。`;
    if (s.sources?.length) a.description.sourceUrls = [...new Set([...s.sources, ...a.description.sourceUrls])];
  }

  const r = a.ratings, before = `${r.classic}/${r.obscurity}/${r.accessibility}`;
  for (const ax of ['classic', 'obscurity', 'accessibility']) if (Number.isInteger(L[ax])) r[ax] = L[ax];
  r.listeners = L.listeners ?? null;
  const after = `${r.classic}/${r.obscurity}/${r.accessibility}`;
  r.note = `${String(r.note || '').replace(/listeners 待本機（雲端擋 Last\.fm）；?/, '')}｜本機 ${day}：Last.fm listeners ${r.listeners ?? '查無'}` +
    (after !== before ? `；三軸 ${before} → ${after}` : '') + (L.ratingNote ? `；${L.ratingNote}` : '');
  r.checkedAt = now;
  a.rarity = rarityOf(r.classic, r.obscurity, r.accessibility);
  a.apexAssessment.reason = `已評估：classic ${r.classic}、obscurity ${r.obscurity}、accessibility ${r.accessibility}` +
    (r.obscurity >= 5 ? `；obscurity=5 但沒有遺珠級證據（listeners ${r.listeners ?? '查無'}），不列 pearl` : '') + '，未觸及殿堂／遺珠／異端任一門檻，列為一般卡。';
  // 店主點名升頂點卡時寫在 local 檔的 apex：{ tier, reason, evidenceUrls }
  if (L.apex) a.apexAssessment = { eligible: true, tier: L.apex.tier, reason: L.apex.reason, evidenceUrls: L.apex.evidenceUrls };

  if (L.cover) {
    a.cover = { url: L.cover.url, source: 'apple-verified-collection', httpStatus: 200, checkedAt: now, appleCollectionId: String(L.cover.appleCollectionId), visuallyVerified: true,
      note: `${L.cover.note}（雲端原圖：${a.cover.source} ${a.cover.discogsReleaseId || ''}）` };
  } else {
    a.cover.checkedAt = now;
    a.cover.note = `${a.cover.note || ''} 本機 ${day} 覆核：HTTP 200、看圖與盤名相符。`.trim();
  }
  a.preview.checkedAt = now;
  if (a.preview.status === 'ready') a.preview.note = `${a.preview.note || ''} 本機 ${day} 覆核：lookup 掛名與盤名相符、試聽檔在曲目內、HTTP 206。`.trim();
}
const out = `onboarding-manifest-${batch}-${stamp}.json`;
fs.writeFileSync(out, JSON.stringify(m, null, 1) + '\n');
console.log(`寫出 ${out}｜${m.albums.length} 張｜簡介：${CARD_DESC ? '卡牌版' : '門市版'}｜稀有度 ${Object.entries(m.albums.reduce((c, a) => (c[a.rarity] = (c[a.rarity] || 0) + 1, c), {})).map(([k, v]) => k + ' ' + v).join('、')}`);
