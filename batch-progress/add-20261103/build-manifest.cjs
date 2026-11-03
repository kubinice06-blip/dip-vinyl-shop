// add-20261103：濁水溪公社《台客的復仇》onboarding manifest（店主指定殿堂）
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '../..');
const out = JSON.parse(fs.readFileSync(path.join(ROOT, 'desc-tools/batches/output/add-20261103-out-1.json'), 'utf8'));
const research = JSON.parse(fs.readFileSync(path.join(ROOT, 'desc-tools/batches/research/add-20261103-a.json'), 'utf8'));
const now = '2026-11-03T14:00:00Z';
const cover = 'https://i.discogs.com/rfCvMTEm_Z85bTXztDia-kaNcAZDc4ZxqsLzTpPsvLo/rs:fit/g:sm/q:90/h:480/w:480/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQ4MTM3/OTMtMTM3NjMzOTM3/MC03NTY3LmpwZWc.jpeg';
const m = {
  schemaVersion: 1,
  batch: '2026-11-03-add-taike',
  batchNote: '店主指定單張上架（add-20261103）：濁水溪公社《台客的復仇》，殿堂',
  createdAt: now,
  albums: [{
    artist: '濁水溪公社',
    album: '台客的復仇',
    identity: {
      releaseType: 'Album',
      identitySource: 'pinned',
      rgMbid: '500b56c7-1350-4876-966e-ebcd41d9cba7',
      upc: '4719260991428',
      aliasesChecked: true,
      aliasReview: '池中同團 5 張（鄉土．人民．勃魯斯、臭死了、天涯棄逃人、鬼島社會檔案、亞洲衝擊）皆為不同碟；本張英文名 Taik\'s Eye For An Eye、掛名 L.T.K. Commune／LTK Commune，池中無此英文寫法。MB release-group 500b56c7：Album、secondary types 空（非現場、非合輯）、first-release-date 1999-05-10、TW、條碼 4719260991428、18 軌。Discogs release 4813793 同條碼、Keboyin Music 99142、1999 Taiwan。為該團第二張專輯（第一張為 1995《肛門樂慾期作品輯》，友善的狗）。證據：https://musicbrainz.org/release-group/500b56c7-1350-4876-966e-ebcd41d9cba7 https://www.discogs.com/release/4813793 https://zh.wikipedia.org/wiki/濁水溪公社',
      queryAlias: '',
    },
    research: { suggestedYear: 1999, yearNote: 'MB first-release-date 1999-05-10；Discogs 1999；中文維基「1999 年五月」。' },
    genres: ['rock'],
    cover: {
      url: cover,
      source: 'discogs',
      discogsReleaseId: '4813793',
      httpStatus: 200,
      checkedAt: now,
      visuallyVerified: true,
      note: 'CAA 404、Spotify／Apple 皆無；Discogs release 4813793 封面平掃（L.T.K. C 標誌＋腦與膀胱插畫），條碼／年份／廠牌三項相符，已登錄 data/discogs-cover-registry.json；主線 2026-11-03 目視。',
    },
    ratings: {
      classic: 5,
      obscurity: 5,
      accessibility: 3,
      listeners: 97,
      source: 'manual:regional-rubric',
      checkedAt: now,
      note: 'worker /album-rating 機器值 classic 3／obscurity 5／accessibility 3、L=97。經典度：台灣地下搖滾與台語龐克的里程碑、「台客」自我標籤的源頭盤，中英文維基與 Taipei Times 皆以 classic album 稱之，店主指定殿堂 → 5。冷門度：L=97 <1,000 且串流無此盤（試聽 unavailable）→ 下限 5。硬蕊度：龐克、噪音吉他與那卡西旋律混用，有門檻但有旋律 → 3（與池中同團 3–4 一致）。',
    },
    rarity: 'legendary',
    apexAssessment: {
      eligible: true,
      tier: 'hall',
      reason: '店主指定（2026-11-03「濁水溪公社 台客的復仇 殿堂」）。台灣場景例外：一般 7 星殿堂標準要求跨類型史上正典，本張依店主裁定以台灣地下搖滾／台語龐克源頭盤收入殿堂；同團其他 4 張不當頂點（《鬼島社會檔案》拿掉流亡由頂點重整套用工作階段處理）。',
      evidenceUrls: [
        'https://www.taipeitimes.com/News/feat/archives/2010/09/03/2003481971',
        'https://zh.wikipedia.org/wiki/台客',
        'https://zh.wikipedia.org/wiki/濁水溪公社',
      ],
      decidedBy: '店主指定',
    },
    description: {
      text: out[0].desc,
      sourceUrls: [...new Set(research[0].facts.map(f => f.src))],
      note: 'add-20261103 單張：研究（主線）→ hook（主線）→ 寫作（主線）→ 主線審稿。',
    },
    preview: {
      status: 'unavailable',
      source: 'none',
      checkedAt: now,
      note: 'Apple tw storefront 搜尋「濁水溪公社」0 筆；池中同團 5 張皆 unavailable；Spotify 亦無此專輯（封面登錄時已查）。無可靠來源，照實標 unavailable。',
    },
    published: { cardCatalog: false, descriptionKv: false, albumOverride: false, seedCards: false, apexPool: false },
  }],
};
const file = path.join(ROOT, 'onboarding-manifest-add-20261103-20261103.json');
if (fs.existsSync(file)) {
  // 保留已寫入的 published 旗標
  const old = JSON.parse(fs.readFileSync(file, 'utf8'));
  m.albums[0].published = old.albums[0].published;
}
fs.writeFileSync(file, JSON.stringify(m, null, 1) + '\n');
fs.copyFileSync(file, path.join(__dirname, 'onboarding-manifest.json'));
console.log('寫出', file);
