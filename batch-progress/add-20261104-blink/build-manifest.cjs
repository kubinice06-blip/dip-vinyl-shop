// add-20261104-blink：blink-182《Buddha》《Cheshire Cat》《Dude Ranch》onboarding manifest（店主點名）
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '../..');
const B = 'add-20261104-blink';
const out = JSON.parse(fs.readFileSync(path.join(ROOT, `desc-tools/batches/output/${B}-out-1.json`), 'utf8'));
const research = JSON.parse(fs.readFileSync(path.join(ROOT, `desc-tools/batches/research/${B}-a.json`), 'utf8'));
const pv = JSON.parse(fs.readFileSync(path.join(__dirname, 'previews.json'), 'utf8'));
const now = '2026-11-04T16:00:00Z';
const A = 'blink-182';
const descOf = album => out.find(o => o.key === `desc2:${A}|${album.toLowerCase()}`).desc;
const srcOf = album => [...new Set(research.find(r => r.album === album).facts.map(f => f.src.replace(/^http:/, 'https:')))];
const caa = rg => `https://coverartarchive.org/release-group/${rg}/front`;
const preview = album => {
  const p = pv[album];
  return { status: 'ready', url: p.previewUrl, source: 'apple', storefront: 'TW', appleCollectionId: p.collectionId,
    appleCollectionName: p.collectionName, httpStatus: p.http, checkedAt: now,
    note: `Apple tw collection ${p.collectionId}（artistId 116851 blink-182；曲目與 MB 對得上）第 ${p.track} preview；collectionExplicitness ${p.explicitness}（只有 explicit 一筆，無 cleaned 雙胞胎）。` };
};
const alias = '卡池既有 blink-182 四張（Enema of the State、Take Off Your Pants and Jacket、Blink-182、Neighborhoods）藝人欄皆為 ASCII 連字號「blink-182」，照用；MB 正規名 blink‐182 用 U+2010，已正規化為 ASCII。早期掛名「Blink」（改名前）與「Blink 182」（無連字號，Buddha 1998 封面）皆指同團。卡池以 poolKey 比對無同名卡。';
const albums = [
  {
    artist: A, album: 'Buddha',
    identity: {
      releaseType: 'Album', identitySource: 'pinned', rgMbid: 'b9ed79e9-b925-3631-bf80-98258226e5c6', upc: '610337876522',
      mbSecondaryTypes: ['Demo'],
      releaseException: '店主點名，demo 例外',
      exceptionReason: '店主 2026-11-04 點名收錄（「blink-182 竟然沒有 Buddha」）。MB release-group 為 Album＋Demo：1994-01 Filter Records 卡帶 15 軌為原貌，1998-10-27 Kung Fu Records 重混再發 CD／LP 14 軌為通行版本，是樂團最早的完整錄音。比照 §5.5 精神以店主點名例外收。',
      exceptionEvidenceUrls: ['https://musicbrainz.org/release-group/b9ed79e9-b925-3631-bf80-98258226e5c6', 'https://en.wikipedia.org/wiki/Buddha_(album)'],
      versionNote: 'MB RG b9ed79e9 first-release-date 1994-01（Filter Records 卡帶 d908246c，15 軌）；1998-10-27 Kung Fu Records CD e38e2042（78765-2，條碼 610337876522，14 軌）／LP a504a8b3；2013 澳洲 Sandman 再發。卡片鎖 1998 Kung Fu 版：封面（CAA RG front＝e38e2042 的 1998 版封面「BLINK 182」）、Apple 259070589（14 軌、曲序同 1998 CD）、seed 年份 1998 一致；簡介交代 1994 卡帶原貌。',
      aliasesChecked: true, aliasReview: alias,
    },
    research: { suggestedYear: 1998, yearNote: '1994-01 卡帶原發；卡片收 1998-10-27 Kung Fu 再發版（封面、試聽、曲目皆為此版）。' },
    genres: ['rock', 'pop'],
    cover: { url: caa('b9ed79e9-b925-3631-bf80-98258226e5c6'), source: 'caa', httpStatus: 200, checkedAt: now, visuallyVerified: true,
      note: 'CAA RG front（307 → release e38e2042 1998 Kung Fu CD）；主線目視：綠色佛像、上方黃字 BLINK 182、下方 BUDDHA，為 1998 版封面。' },
    ratings: null,
    rarity: null,
    apexAssessment: null,
    description: { text: descOf('Buddha'), sourceUrls: srcOf('Buddha') },
    preview: preview('Buddha'),
    published: { cardCatalog: false, descriptionKv: false, albumOverride: false, seedCards: false, apexPool: false },
  },
  {
    artist: A, album: 'Cheshire Cat',
    identity: {
      releaseType: 'Album', identitySource: 'pinned', rgMbid: '0a467c9c-c9f7-3a86-bce1-c013e3bacd5f', upc: '723248613626',
      versionNote: 'MB RG 0a467c9c first-release-date 1995-02-17（Grilled Cheese CD GRL-001 b237e335，條碼 723248613626，16 軌）；1998 Cargo 再發同條碼；日本 Toy\'s Factory 18 軌。卡片鎖 1995 原版：CAA front＝b237e335、Apple 1440846976 16 軌曲序同原版。',
      aliasesChecked: true, aliasReview: alias,
    },
    research: { suggestedYear: 1995, yearNote: 'MB 1995-02-17 Grilled Cheese／Cargo。Apple 頁 releaseDate 1994-02-17 為上架資料錯誤，不採。' },
    genres: ['rock', 'pop'],
    cover: { url: caa('0a467c9c-c9f7-3a86-bce1-c013e3bacd5f'), source: 'caa', httpStatus: 200, checkedAt: now, visuallyVerified: true,
      note: 'CAA RG front（307 → release b237e335 1995 原版）；主線目視：暹羅貓特寫、上方黃字 blink-182。' },
    ratings: null, rarity: null, apexAssessment: null,
    description: { text: descOf('Cheshire Cat'), sourceUrls: srcOf('Cheshire Cat') },
    preview: preview('Cheshire Cat'),
    published: { cardCatalog: false, descriptionKv: false, albumOverride: false, seedCards: false, apexPool: false },
  },
  {
    artist: A, album: 'Dude Ranch',
    identity: {
      releaseType: 'Album', identitySource: 'pinned', rgMbid: '19b6b24f-b273-3d4b-91f4-0720cd0f3bcd', upc: '008811162429',
      versionNote: 'MB RG 19b6b24f first-release-date 1997-04-14（澳洲 Cargo／MCA 1116242，16 軌）；美國 1997-06-17 Cargo／MCA MCD 11624（條碼 008811162429，15 軌）為通行版。卡片鎖美國版：Apple 1440844811 15 軌、releaseDate 1997-06-17。CAA RG front 指向澳洲版 81504761，封面圖相同（黑牛、DUDE RANCH 招牌）。',
      aliasesChecked: true, aliasReview: alias,
    },
    research: { suggestedYear: 1997, yearNote: '美國 1997-06-17；MB 最早日期 1997-04-14（澳洲），同年。' },
    genres: ['rock', 'pop'],
    cover: { url: caa('19b6b24f-b273-3d4b-91f4-0720cd0f3bcd'), source: 'caa', httpStatus: 200, checkedAt: now, visuallyVerified: true,
      note: 'CAA RG front（307 → release 81504761）；主線目視：荒野中的黑牛，身上紅字 BLINK 182 烙印、左上 DUDE RANCH 木招牌。' },
    ratings: null, rarity: null, apexAssessment: null,
    description: { text: descOf('Dude Ranch'), sourceUrls: srcOf('Dude Ranch') },
    preview: preview('Dude Ranch'),
    published: { cardCatalog: false, descriptionKv: false, albumOverride: false, seedCards: false, apexPool: false },
  },
];
const R = JSON.parse(fs.readFileSync(path.join(__dirname, 'ratings.json'), 'utf8'));
for (const a of albums) {
  const r = R[a.album];
  a.ratings = { ...r.ratings, source: 'manual:rubric-0.8.1', checkedAt: now };
  const sum = r.ratings.classic + r.ratings.accessibility + (r.ratings.obscurity >= 5 ? 1 : 0);
  a.rarity = sum >= 9 ? 'legendary' : sum === 8 ? 'epic' : sum === 7 ? 'uncommon' : sum === 6 ? 'rare' : 'common';
  a.apexAssessment = r.apex;
}
const m = { schemaVersion: 1, batch: '2026-11-04-add-blink182-early', batchNote: '店主點名上架（add-20261104-blink）：blink-182 早期三張', createdAt: now, albums };
const file = path.join(ROOT, 'onboarding-manifest-add-20261104-blink-20261104.json');
if (fs.existsSync(file)) {
  const old = JSON.parse(fs.readFileSync(file, 'utf8'));
  m.albums.forEach((a, i) => { if (old.albums[i]) a.published = old.albums[i].published; });
}
fs.writeFileSync(file, JSON.stringify(m, null, 1) + '\n');
fs.copyFileSync(file, path.join(__dirname, 'onboarding-manifest.json'));
console.log('寫出', file, albums.map(a => `${a.album} ${a.ratings.classic}/${a.ratings.obscurity}/${a.ratings.accessibility} ${a.rarity}`).join('；'));
