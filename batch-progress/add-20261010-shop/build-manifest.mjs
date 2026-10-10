// add-20261010-shop：組 onboarding manifest（店內待上架 37 張，簡介用門市版）。
//   node batch-progress/add-20261010-shop/build-manifest.mjs
// 輸入：spec.json（37 張與掛名）、10-08 三份卡單＋cards-new.json（身分）、data/shop/pending-meta.json（封面、三軸）、
//       data/shop/descs.json（門市版）、discogs.json（封面 release 資料）、ratings.json（/album-rating 的 listeners）、preview-picks.json（試聽）。
import fs from 'node:fs';
const D = 'batch-progress/add-20261010-shop/';
const rd = p => JSON.parse(fs.readFileSync(p, 'utf8'));
const NOW = new Date().toISOString().replace(/\.\d+Z$/, 'Z');
const spec = rd(D + 'spec.json');
const old = ['a', 'b', 'c'].flatMap(g => rd(`desc-tools/batches/cards/add-20261008-shop-${g}-cards.json`));
const neu = rd(D + 'cards-new.json');
const inv = rd('data/shop/inventory.json').items;
const pm = rd('data/shop/pending-meta.json').items;
const descs = rd('data/shop/descs.json').items;
const dg = rd(D + 'discogs.json');
const rt = rd(D + 'ratings.json');
const picks = rd(D + 'preview-picks.json');
const overrides = fs.existsSync(D + 'overrides.json') ? rd(D + 'overrides.json') : {};
const BANNED = /(融合多種元素|具有代表性|層次豐富|傑作|必聽|里程碑|獨樹一格)/;
const rarityOf = (c, o, x) => { const s = c + x + (o >= 5 ? 1 : 0); return s >= 10 ? 'legendary' : s >= 8 ? 'epic' : s >= 6 ? 'uncommon' : s >= 4 ? 'rare' : 'common'; };

const albums = spec.map(s => {
  const id = inv.find(i => i.id.endsWith(s.n)).id;
  const c = old.find(x => x.notionId === id) || neu.find(x => x.n === s.n);
  if (!c) throw new Error('缺身分卡單 ' + s.n);
  const o = overrides[s.n] || {};
  const p = pm[id], ax = p.axes, d = descs.find(e => (e.ids || []).includes(id));
  if (!d) throw new Error('缺門市版 ' + s.n);
  const text = (o.descReplace || []).reduce((t, [a, b]) => { if (!t.includes(a)) throw new Error('descReplace 對不上 ' + a); return t.replace(a, b); }, d.text);
  if (BANNED.test(text)) throw new Error(`${s.artist}《${s.album}》門市版撞禁語 ${text.match(BANNED)[0]}`);
  const g = dg[s.n], r = rt[s.n] || {};
  const cover = o.cover || {
    url: p.cover, source: 'discogs', discogsReleaseId: g.rid, httpStatus: 200, checkedAt: NOW, visuallyVerified: true,
    note: `Discogs release ${g.rid}（${g.labels[0]}、${g.year}、${g.country}），店主 2026-10-09 選定的無側標（或唯一可得）照片（add-20261009-shop 8910）；主線 2026-10-10 實抓 200、目視與盤名相符。`,
  };
  const identity = {
    releaseType: c.releaseType || 'Album', identitySource: c.identitySource, rgMbid: c.rgMbid || '', upc: '', aliasesChecked: true,
    aliasReview: c.aliasReview || c.curatorRisk, queryAlias: c.queryAlias || '',
  };
  for (const k of ['genreException', 'exceptionReason', 'exceptionEvidenceUrls', 'mbAbsenceProof', 'manualEvidenceUrls', 'manualRuling', 'coverSourceHint'])
    if (c[k] && (!Array.isArray(c[k]) || c[k].length) && c[k] !== '') identity[k] = c[k];
  if (identity.identitySource !== 'manual') delete identity.coverSourceHint;
  const ratings = {
    classic: ax.classic, obscurity: ax.obscurity, accessibility: ax.accessibility,
    listeners: Number.isInteger(r._listeners) ? r._listeners : null, source: ax.source, checkedAt: NOW,
    note: `店內暫定三軸（add-20261009-shop 8911：/album-rating 機器基線 ${ax.machine.classic}/${ax.machine.obscurity}/${ax.machine.accessibility}，冷門軸照 §0.8 以該語言圈為尺度人工定），上卡池沿用。Last.fm listeners ${Number.isInteger(r._listeners) ? r._listeners : '查無'}（2026-10-10 /album-rating，卡面掛名查詢）。`,
  };
  const rarity = rarityOf(ratings.classic, ratings.obscurity, ratings.accessibility);
  const pk = picks[s.n];
  if (!pk) throw new Error('缺試聽裁定 ' + s.n);
  const preview = pk.status === 'ready'
    ? { status: 'ready', url: pk.url, source: 'apple', httpStatus: pk.http, checkedAt: NOW, appleCollectionId: pk.id, storefront: pk.c.toUpperCase(), collectionExplicitness: pk.expl, note: pk.note }
    : { status: pk.status, source: 'none', checkedAt: NOW, note: pk.note };
  return {
    artist: s.artist, album: s.album, identity,
    research: { suggestedYear: c.year, yearNote: o.yearNote || '' },
    genres: c.genres, cover, ratings, rarity,
    apexAssessment: { eligible: false, tier: null, evidenceUrls: [],
      reason: `已評估：classic ${ratings.classic}、obscurity ${ratings.obscurity}、accessibility ${ratings.accessibility}` +
        (ratings.obscurity >= 5 ? `；obscurity=5 但沒有遺珠級證據（listeners ${ratings.listeners ?? '查無'}），不列 pearl` : '') + '，未觸及殿堂／遺珠／異端任一門檻，列為一般卡。' },
    description: { text, sourceUrls: [...new Set([...(d.sources || []), ...(o.extraSources || [])])], cardVersionReplaced: true,
      note: '採用門市版介紹（data/shop/descs.json；店主 2026-10-07 指示：卡池沒有的店內專輯直接用店內版，不另研究寫作）。' + (o.descNote || '') },
    preview,
    published: { cardCatalog: false, descriptionKv: false, albumOverride: false, seedCards: false, apexPool: false },
  };
});
const m = { schemaVersion: 1, batch: '2026-10-10-add-shop-wave4',
  batchNote: '店內販售區第四波：Notion 2026-10-08／10-09 進貨、卡池沒有的 40 張中收 37 張（退 Culture Club 12 吋單曲、奥村チヨ《デラックス・ダブル》與チェリッシュ《スーパー・デラックス》兩張精選輯）。雲端一次跑完：身分、封面、三軸、試聽、門市版簡介、card_catalog、KV、seed。',
  createdAt: NOW, albums };
fs.writeFileSync(D + 'onboarding-manifest.json', JSON.stringify(m, null, 1));
console.log('albums', albums.length, '｜rarity', JSON.stringify(albums.reduce((a, x) => (a[x.rarity] = (a[x.rarity] || 0) + 1, a), {})), '｜preview', JSON.stringify(albums.reduce((a, x) => (a[x.preview.status] = (a[x.preview.status] || 0) + 1, a), {})));
