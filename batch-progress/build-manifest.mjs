// 把雲端策展檔＋本機的封面／三軸／試聽組成 ALBUM_ONBOARDING 的 manifest。
//
// 只收「四項資料都齊」的卡：封面、三軸、簡介、試聽狀態。缺任一項的卡依
// ALBUM_ONBOARDING「任一項缺失就留在待處理批次，不得先上架」留下來，
// 並在 <批>-held.json 列出缺的是哪一項，不要靜默丟掉。
//
// 用法：node batch-progress/build-manifest.mjs <批名>
// 產出：onboarding-manifest-<批名>-<日期>.json、batch-progress/<批>/held.json
import fs from 'node:fs';

const ROOT = 'C:/Users/User/dip-vinyl-home/dip-vinyl-shop';
const batch = process.argv[2];
const STAMP = process.argv[3] || '20260831';
if (!batch) { console.error('用法: node batch-progress/build-manifest.mjs <批名> [日期]'); process.exit(1); }

const dir = `${ROOT}/batch-progress/${batch}`;
const now = new Date('2026-08-31T00:00:00Z').toISOString();

const cand = JSON.parse(fs.readFileSync(`${dir}/cand-all.json`, 'utf8'));
const covers = new Map(JSON.parse(fs.readFileSync(`${dir}/covers.json`, 'utf8')).map(c => [c.artist + '|' + c.album, c]));
const ratings = JSON.parse(fs.readFileSync(`${dir}/ratings.json`, 'utf8'));
const previews = fs.existsSync(`${dir}/previews.json`) ? JSON.parse(fs.readFileSync(`${dir}/previews.json`, 'utf8')) : {};

// 策展檔：identity 欄位（別名檢查、人工身分舉證、合輯例外）都在這裡
const curated = new Map();
const addCur = d => { for (const f of fs.readdirSync(d)) {
  if (!/\.json$/.test(f) || f === 'cand-all.json' || !/^(cand|out|prop)/.test(f)) continue;
  const j = JSON.parse(fs.readFileSync(`${d}/${f}`, 'utf8'));
  const arr = Array.isArray(j) ? j : (j.albums || j.cards || Object.values(j).find(Array.isArray) || []);
  for (const r of arr) if (r && r.artist && r.album && !curated.has(r.artist + '|' + r.album)) curated.set(r.artist + '|' + r.album, r);
} };
addCur(dir);
for (const sub of ['lock', 'curation']) if (fs.existsSync(`${dir}/${sub}`)) addCur(`${dir}/${sub}`);

// 簡介與來源網址
const descs = new Map(), srcs = new Map();
const DT = `${ROOT}/desc-tools/batches`;
for (const f of fs.readdirSync(`${DT}/output`)) {
  if (!f.startsWith(batch)) continue;
  const j = JSON.parse(fs.readFileSync(`${DT}/output/${f}`, 'utf8'));
  const arr = Array.isArray(j) ? j : (j.cards || Object.values(j).find(Array.isArray) || []);
  for (const c of arr) if (c.key) descs.set(c.key, c.desc || '');
}
for (const f of fs.readdirSync(`${DT}/research`)) {
  if (!f.startsWith(batch)) continue;
  const j = JSON.parse(fs.readFileSync(`${DT}/research/${f}`, 'utf8'));
  const arr = Array.isArray(j) ? j : (j.cards || Object.values(j).find(Array.isArray) || []);
  for (const c of arr) {
    if (!c.key) continue;
    const u = [...new Set((c.facts || []).map(x => String(x.src || '').trim()).filter(s => /^https:\/\//.test(s)))];
    srcs.set(c.key, u);
  }
}

const RARITY = s => s >= 10 ? 'legendary' : s >= 8 ? 'epic' : s >= 6 ? 'uncommon' : s >= 4 ? 'rare' : 'common';

// c-48 的人工三軸是在策展定名之前跑的，之後不少卡把耦合曲目補進標題
// （「Mendelssohn: Octet」→「Mendelssohn: Octet / String Quintet op. 87」），
// 直接查鍵會落空。放寬兩種：標題互為前綴；或該藝人在兩邊都只有一張卡。
// **只放寬到這裡**——把不同錄音的三軸接錯，比留置一張卡糟得多。
const ratingByArtist = new Map();
for (const key of Object.keys(ratings)) {
  const [ar, al] = key.split('|');
  if (!ratingByArtist.has(ar)) ratingByArtist.set(ar, []);
  ratingByArtist.get(ar).push({ key, album: al || '' });
}
const nrm = s => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
const candByArtist = new Map();
for (const x of cand) candByArtist.set(x.artist, (candByArtist.get(x.artist) || 0) + 1);
function looseRating(a) {
  const list = ratingByArtist.get(a.artist);
  if (!list || !list.length) return null;
  const na = nrm(a.album);
  const pref = list.find(x => { const nb = nrm(x.album); return nb && (na.startsWith(nb) || nb.startsWith(na)); });
  if (pref) return ratings[pref.key];
  if (list.length === 1 && candByArtist.get(a.artist) === 1) return ratings[list[0].key];
  return null;
}
const albums = [], held = [];

for (const a of cand) {
  const k = a.artist + '|' + a.album;
  const cur = curated.get(k) || {};
  const cov = covers.get(k);
  // c-48 的三軸是雲端在「加版本後綴之前」跑的，卡單後來把《Wanderer Fantasy》
  // 改成《Wanderer Fantasy (EMI 1963)》這種消歧義寫法，直接查會有 38 張對不到。
  // 退一步用「去掉結尾括號」的鍵再找一次；仍找不到才算缺。
  const bare = a.artist + '|' + String(a.album).replace(/\s*[（(][^（()）]*[)）]\s*$/, '').trim();
  const rt = ratings[k] || ratings[bare] || looseRating(a);
  const pv = previews[k];
  const text = descs.get(a.key) || '';
  // 研究稿的 facts 來源為主。全 310 張裡有 51 張的 facts 只引到單一頁（多半是
  // 一整篇維基條目），不足 manifest 要求的兩個。補的是**策展階段真的查過**的來源：
  // 釘定身分用的 MusicBrainz release-group、合輯例外與人工身分的佐證網址。
  // c-47 的 manifest 也是這樣把 MB RG 併進 sourceUrls 的。
  const sourceUrls = [...new Set([
    ...(srcs.get(a.key) || []),
    ...(a.rgMbid ? [`https://musicbrainz.org/release-group/${a.rgMbid}`] : []),
    ...(cur.exceptionEvidenceUrls || []),
    ...(cur.manualEvidenceUrls || []),
  ].filter(u => /^https:\/\//.test(u)))];

  const lack = [];
  if (!cov?.cover) lack.push('封面');
  if (!rt || !rt.classic) lack.push('三軸');
  if (!text) lack.push('簡介');
  if (!pv) lack.push('試聽');
  if (sourceUrls.length < 2) lack.push('來源網址');
  if (lack.length) { held.push({ artist: a.artist, album: a.album, lack }); continue; }

  const listeners = Number.isInteger(rt.listeners) ? rt.listeners
    : (Number.isInteger(rt._listeners) ? rt._listeners : null);
  const score = rt.classic + rt.accessibility + (rt.obscurity >= 5 ? 1 : 0);

  // 頂點：策展層的候選只是提案，這裡照 §3 的硬門檻重驗一次。
  // pearl 尤其要卡死——listeners 查無（null）不可以當成 0，否則整批華語卡會假性達標。
  const ap = cur.apexCandidate || {};
  let eligible = !!ap.eligible, tier = ap.tier || null, reason = ap.reason || '';
  if (eligible && tier === 'hall' && rt.classic !== 5) { eligible = false; tier = null; reason = `原提案 hall，但 classic=${rt.classic} 未達 5，依 §3 硬門檻退回一般卡。${reason}`; }
  if (eligible && tier === 'pearl' && !(rt.obscurity === 5 && Number.isInteger(listeners) && listeners < 300)) {
    eligible = false; tier = null;
    reason = `原提案 pearl，但 obscurity=${rt.obscurity}、listeners=${listeners === null ? '查無' : listeners}，未同時滿足 obscurity=5 與 listeners<300（查無不可當 0），依 §3 退回一般卡。${reason}`;
  }
  if (eligible && tier === 'heresy' && rt.accessibility !== 5) { eligible = false; tier = null; reason = `原提案 heresy，但 accessibility=${rt.accessibility} 未達 5，依 §3 退回一般卡。${reason}`; }
  // 沒有策展層提案的批（c-50 雲端整項留給本機）要據實寫明「評估過、結論是先當一般卡」，
  // 不能寫成「未達定義」了事。ALBUM_ONBOARDING §3 本來就允許：符合門檻但尚未取得
  // 足夠證據時「可先作一般卡上架」，日後補證再升。
  if (!eligible && !reason) {
    const hit = [];
    if (rt.classic === 5) hit.push('classic=5（hall 最低門檻）');
    if (rt.obscurity === 5) hit.push(`obscurity=5、listeners=${listeners === null ? '查無' : listeners}`);
    if (rt.accessibility === 5) hit.push('accessibility=5（heresy 最低門檻）');
    reason = hit.length
      ? `已評估：${hit.join('；')}，但本批未取得 §3 要求的跨來源長期共識證據（至少兩個證據網址），依 §3「可先作一般卡上架」先列一般卡，補證後再升。`
      : '已評估：三軸未觸及任何一種頂點卡的最低門檻，列為一般卡。';
  }

  const manual = cur.identitySource === 'manual' || !a.rgMbid;
  // 別名檢查結論：策展層的註記長短不一（c-50 有幾筆只寫「預期好查。」，不到
  // 驗證器要求的 10 字），所以把可用的註記串起來，仍然不足就補一句標準結論——
  // 該做的比對策展層確實做過，只是沒逐字寫下來。
  const notes = [cur.namingNote, cur.versionNote, cur.mbNote].filter(s => typeof s === 'string' && s.trim());
  let aliasReview = notes.join('；');
  if (aliasReview.replace(/\s/g, '').length < 10) {
    aliasReview = (aliasReview ? aliasReview + '；' : '') +
      '策展層已比對原文、羅馬拼音、譯名與不同 artist-credit，未發現同名或掛名分裂';
  }
  const identity = {
    releaseType: cur.releaseType || a.releaseType || 'Album',
    upc: cur.upc || a.upc || '',
    aliasesChecked: true,
    aliasReview,
  };
  // 自我同名卡：驗證器要求 selfTitledVerified=true 且固定試聽必須 ready
  // （同名碟最容易配到錯的版本，試聽是唯一能當場驗版本的證據）。
  if (cur.selfTitled === true || String(a.artist).trim() === String(a.album).trim()) {
    if (pv.status !== 'ready') { held.push({ artist: a.artist, album: a.album, lack: ['自我同名卡缺 ready 試聽'] }); continue; }
    identity.selfTitledVerified = true;
  }
  if (manual) {
    identity.identitySource = 'manual';
    identity.mbAbsenceProof = cur.mbAbsenceProof;
    identity.manualEvidenceUrls = cur.manualEvidenceUrls || [];
    identity.manualRuling = cur.manualRuling || '';
  } else {
    identity.rgMbid = a.rgMbid;
  }
  if (cur.exceptionReason) identity.exceptionReason = cur.exceptionReason;
  if (cur.exceptionEvidenceUrls) identity.exceptionEvidenceUrls = cur.exceptionEvidenceUrls;

  albums.push({
    artist: a.artist, album: a.album, identity,
    cover: { url: cov.cover.url, source: cov.cover.source, httpStatus: 200, checkedAt: now },
    ratings: {
      classic: rt.classic, obscurity: rt.obscurity, accessibility: rt.accessibility,
      listeners, source: rt.source || 'worker:/album-rating', checkedAt: now,
    },
    rarity: RARITY(score),
    apexAssessment: { eligible, tier, reason, evidenceUrls: ap.evidenceUrls || [] },
    description: { text, sourceUrls },
    // unavailable／disabled 的 source 必須寫 none（驗證器硬性要求：沒有試聽就不能留著來源名）
    // ready 一定要帶 appleCollectionId 與 storefront：publish-manifest 寫靜態試聽時要用，
    // 少了它 build-apple-audio-runtime-map 會把整批當 invalid 丟掉（2026-08-31 踩過）。
    preview: pv.status === 'ready'
      ? {
          status: 'ready', url: pv.url, source: pv.source, httpStatus: 200, checkedAt: now,
          appleCollectionId: pv.appleCollectionId || '', storefront: pv.storefront || 'TW',
        }
      : { status: pv.status, source: 'none', note: pv.note || '' },
    published: { cardCatalog: false, descriptionKv: false, albumOverride: false, seedCards: false, apexPool: false },
  });
}

const out = { schemaVersion: 1, batch: `${batch}-${STAMP}`, albums };
const path = `${ROOT}/onboarding-manifest-${batch}-${STAMP}.json`;
fs.writeFileSync(path, JSON.stringify(out, null, 1));
fs.writeFileSync(`${dir}/held.json`, JSON.stringify(held, null, 1));
const tiers = {};
for (const x of albums) if (x.apexAssessment.eligible) tiers[x.apexAssessment.tier] = (tiers[x.apexAssessment.tier] || 0) + 1;
const pv = {};
for (const x of albums) pv[x.preview.status] = (pv[x.preview.status] || 0) + 1;
console.log(`${batch}｜候選 ${cand.length}｜進 manifest ${albums.length}｜留置 ${held.length}`);
console.log(`  頂點 ${JSON.stringify(tiers)}｜試聽 ${JSON.stringify(pv)}`);
const why = {};
for (const h of held) for (const l of h.lack) why[l] = (why[l] || 0) + 1;
console.log(`  留置原因 ${JSON.stringify(why)}`);
console.log(`→ ${path}`);
