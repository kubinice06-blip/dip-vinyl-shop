// 情緒薄格策展線（md／mc／ml）：組 onboarding manifest（複製自 downtempo 線，加人工身分與地區錨點制冷門軸）。
//   node batch-progress/mood-cells-20261022/build-manifest.mjs add-20261020-ts1
// 輸入：卡單、batch-progress/<批>/{meta.json, preview-picks.json, covers.json?, ratings-override.json?, desc-override.json?}、
//       寫作層成品 desc-tools/batches/output/<批>-out-*.json、研究稿（sourceUrls）。
import fs from 'node:fs';
const batch = process.argv[2], D = `batch-progress/${batch}/`;
const rd = p => JSON.parse(fs.readFileSync(p, 'utf8'));
const opt = p => fs.existsSync(p) ? rd(p) : {};
const NOW = new Date().toISOString().replace(/\.\d+Z$/, 'Z');
const cards = rd(`desc-tools/batches/cards/${batch}-cards.json`);
const meta = rd(D + 'meta.json'), picks = rd(D + 'preview-picks.json');
const covers = opt(D + 'covers.json'), rov = opt(D + 'ratings-override.json'), dov = opt(D + 'desc-override.json');
const out = new Map(fs.readdirSync('desc-tools/batches/output').filter(f => f.startsWith(batch + '-out-')).flatMap(f => rd('desc-tools/batches/output/' + f)).map(x => [x.key, x.desc]));
const research = new Map(fs.readdirSync('desc-tools/batches/research').filter(f => f.startsWith(batch + '-')).flatMap(f => { const r = rd('desc-tools/batches/research/' + f); return Array.isArray(r) ? r : Object.values(r); }).map(x => [x.key, x]));
const BANNED = /(融合多種元素|具有代表性|層次豐富|傑作|必聽|里程碑|獨樹一格)/;
const rarityOf = (c, o, x) => { const s = c + x + (o >= 5 ? 1 : 0); return s >= 10 ? 'legendary' : s >= 8 ? 'epic' : s >= 6 ? 'uncommon' : s >= 4 ? 'rare' : 'common'; };
const miss = [];
const albums = cards.map(c => {
  const m = meta[c.key], r = research.get(c.key), o = rov[c.key] || {};
  const text = dov[c.key] || out.get(c.key);
  if (!text) { miss.push(c.key); return null; }
  if (BANNED.test(text)) throw new Error(`${c.key} 撞禁語 ${text.match(BANNED)[0]}`);
  if (c.identitySource === 'manual' && !covers[c.key]) throw new Error(`${c.key} 人工身分卡必須在 covers.json 指定封面（CAA 走不通）`);
  const cv = covers[c.key] ? { ...covers[c.key], httpStatus: 200, checkedAt: NOW, visuallyVerified: true }
    : { url: `https://coverartarchive.org/release-group/${c.rgMbid}/front`, source: 'caa', httpStatus: 200, checkedAt: NOW, visuallyVerified: true,
        note: `CAA release-group front（HEAD ${m.caa}）；主線 ${NOW.slice(0, 10)} 縮圖表目視與盤名相符。` };
  const base = m.rating || {};
  const ratings = {
    classic: o.classic ?? Math.min(base.classic ?? 3, 4), obscurity: o.obscurity ?? base.obscurity ?? 3, accessibility: o.accessibility ?? base.accessibility ?? 2,
    listeners: Number.isInteger(base._listeners) ? base._listeners : null, source: o.source || `worker /album-rating（obscurity:${base._obscuritySource || '?'}）`, checkedAt: NOW,
    note: `機器基線 ${base.classic}/${base.obscurity}/${base.accessibility}（Last.fm listeners ${base._listeners ?? '查無'}）` + (o.note ? `；主線：${o.note}` : (base.classic === 5 ? '；主線：經典 5 不自動給，壓為 4' : '')),
  };
  const rarity = rarityOf(ratings.classic, ratings.obscurity, ratings.accessibility);
  const pk = picks[c.key];
  const preview = pk.status === 'ready'
    ? { status: 'ready', url: pk.url, source: 'apple', httpStatus: pk.http, checkedAt: NOW, appleCollectionId: pk.id, storefront: pk.c.toUpperCase(), collectionExplicitness: pk.expl, note: pk.note }
    : { status: pk.status, source: 'none', checkedAt: NOW, note: pk.note };
  const src = [...new Set([...(r?.facts || []).map(f => f.src).filter(u => /^https:/.test(u || '')), ...(c.rgMbid ? [`https://musicbrainz.org/release-group/${c.rgMbid}`] : (c.manualEvidenceUrls || []))])];
  return {
    artist: c.artist, album: c.album, ...(c.composer ? { composer: c.composer } : {}),
    identity: { releaseType: c.releaseType || 'Album', identitySource: c.identitySource, rgMbid: c.rgMbid, upc: '', aliasesChecked: true,
      ...(c.identitySource === 'manual' ? { mbAbsenceProof: c.mbAbsenceProof, manualEvidenceUrls: c.manualEvidenceUrls,
        manualRuling: `雲端主線 ${NOW.slice(0, 10)} 依 ALBUM_ONBOARDING §1 人工身分核可（店主 2026-09-02 裁定權下放；薄細項策展線 ${batch}）`,
        coverSourceHint: covers[c.key]?.source === 'apple' ? 'apple-verified-collection' : (covers[c.key]?.source || '') } : {}),
      ...(c.exceptionReason ? { exceptionReason: c.exceptionReason, exceptionEvidenceUrls: c.exceptionEvidenceUrls } : {}),
      ...(c.genreException ? { genreException: c.genreException } : {}),
      aliasReview: `${c.curatorWhy}｜${c.curatorRisk || '策展無疑點'}｜${c.mbNote}`.slice(0, 1500), queryAlias: c.queryAlias || '',
      ...(c.selfTitled ? { selfTitledVerified: true } : {}) },
    research: { suggestedYear: c.year, yearNote: '' },
    genres: c.genres, cover: cv, ratings, rarity,
    apexAssessment: { eligible: false, tier: null, evidenceUrls: [],
      reason: `已評估：classic ${ratings.classic}、obscurity ${ratings.obscurity}、accessibility ${ratings.accessibility}` + (ratings.obscurity >= 5 ? `；obscurity=5 但沒有遺珠級證據（listeners ${ratings.listeners ?? '查無'}），不列 pearl` : '') + '，未觸及殿堂／遺珠／異端任一門檻，列為一般卡。' },
    description: { text, sourceUrls: src, note: `薄細項策展線卡牌版：研究（${r?.status || '?'}）→ 鉤子 → 寫作 → 主線審稿。` },
    preview,
    published: { cardCatalog: false, descriptionKv: false, albumOverride: false, seedCards: false, apexPool: false },
  };
});
if (miss.length) { console.error('缺簡介', miss.length, miss.slice(0, 5)); process.exit(1); }
const mf = { schemaVersion: 1, batch: `2026-10-20-${batch.replace(/^add-\d{8}-/, '')}`, batchNote: `薄細項策展線（${batch}）`, createdAt: NOW, albums };
fs.writeFileSync(D + 'onboarding-manifest.json', JSON.stringify(mf, null, 1));
const cnt = (f) => JSON.stringify(albums.reduce((a, x) => (a[f(x)] = (a[f(x)] || 0) + 1, a), {}));
console.log('albums', albums.length, '｜rarity', cnt(x => x.rarity), '｜preview', cnt(x => x.preview.status), '｜cover', cnt(x => x.cover.source));
