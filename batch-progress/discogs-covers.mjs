// 封面第四層：Discogs（ALBUM_ONBOARDING §4，2026-09-10 店主核定增列）。
//
// **為什麼需要這一層**：CAA 以 release-group MBID 為鍵，對私壓、小廠與非英美發行的覆蓋率低
// （c-79 只有 48%、c-82 47%、c-114 的 40 張裡 39 張 CAA 全空）。Discogs 是版本級資料庫，
// 卡上既有的年份、廠牌、目錄號可以直接拿來釘同一張壓片。
//
// **與被禁的「iTunes 模糊搜尋」的差別在證據種類**：禁的是拿標題相似度當證據
// （c-52 實測 12 個命中有 5 個可證明是錯的）。這裡的規則是**版本欄位比對**——
// 藝人與盤名相符只是入場券，還要在年份／廠牌／目錄號裡**至少對上兩項**才算命中。
// 對不上兩項的一律不收，寧可留著缺封面，也不要放一張看起來像的錯圖進去。
//
// 用法：node batch-progress/discogs-covers.mjs <批名> [--write] [--min=2]
//   不加 --write 只回報命中與依據，方便先看一輪再決定。
//
// 產出：寫回 <批>/covers.json，並逐張登錄 data/discogs-cover-registry.json
// （名單是店主核可這條來源時的附帶條件：要註記、能管理）。
import fs from 'node:fs';

const ROOT = 'C:/Users/User/dip-vinyl-home/dip-vinyl-shop';
const batch = process.argv[2];
const WRITE = process.argv.includes('--write');
const minArg = process.argv.find(a => a.startsWith('--min='));
const MIN_FIELDS = minArg ? Number(minArg.split('=')[1]) : 2;
if (!batch) { console.error('用法: node batch-progress/discogs-covers.mjs <批名> [--write]'); process.exit(1); }

const UA = { 'User-Agent': 'dip-vinyl-shop/1.0 (+https://dipvinyl.tw)', accept: 'application/json' };
const REGISTRY = `${ROOT}/data/discogs-cover-registry.json`;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const rd = p => JSON.parse(fs.readFileSync(p, 'utf8'));

// 未認證的 Discogs 是 25 req/min。放慢到 2.6 秒一次，留一點餘裕給重試，
// 免得整批跑到一半被 429 打斷、又要從頭辨識哪些做過。
const GAP = 2600;

const dir = `${ROOT}/batch-progress/${batch}`;
const rows = rd(`${dir}/covers.json`);
const cand = fs.existsSync(`${dir}/cand-all.json`) ? rd(`${dir}/cand-all.json`) : [];
const candBy = new Map(cand.map(c => [c.artist + '|' + c.album, c]));

const norm = s => String(s || '').toLowerCase().normalize('NFKD')
  .replace(/[\u0300-\u036f]/g, '').replace(/[^\p{L}\p{N}]+/gu, '');
// 目錄號比對要更寬：Discogs 寫 "SML-001"、MB 寫 "SML 001"、策展層寫 "SML001"
const normCat = s => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '');
// Discogs 的 title 是 "Artist - Album"，但藝人含連字號時會切錯，所以兩邊都試
const splitTitle = t => {
  const i = String(t || '').indexOf(' - ');
  return i < 0 ? ['', String(t || '')] : [t.slice(0, i), t.slice(i + 3)];
};
// 策展層沒有 catno 欄，但 mbNote／curatorWhy 幾乎都寫了目錄號。抓出像目錄號的字串當比對候選。
const catnosFrom = c => {
  const text = [c?.mbNote, c?.curatorWhy, c?.curatorRisk].filter(Boolean).join(' ');
  const out = new Set();
  for (const m of text.matchAll(/\b([A-Z]{1,6}[- ]?\d{2,6})\b/g)) out.add(normCat(m[1]));
  return out;
};

async function dgGet(url) {
  for (let attempt = 0; attempt < 4; attempt++) {
    const r = await fetch(url, { headers: UA });
    if (r.status === 429) { await sleep(8000); continue; }
    if (r.status === 404) return null;
    if (!r.ok) { await sleep(1500); continue; }
    return r.json();
  }
  return null;
}

// **一定要用 q= 自由字串，不要用 artist=＋release_title=。**
// 後者對 CJK 掛名整組回 0：板倉克行《海猫の島》用欄位查回 0 筆，用 q= 第一筆就是
// 正確的 Johnny's Disk JD-07。Discogs 的 CJK 掛名寫成「板倉克行* = Katsuyuki Itakura」，
// 欄位查比對的是掛名欄本身，對不上這種雙語寫法。
async function dgSearch(artist, album) {
  const params = new URLSearchParams({ q: `${artist} ${album}`, type: 'release', per_page: '10' });
  const j = await dgGet(`https://api.discogs.com/database/search?${params}`);
  return j ? (j.results || []) : null;
}

// 搜尋結果的 cover_image 對老盤常是空的（實測 Johnny's Disk 那批全空），
// 但 release 端點的 images 有——所以圖一律走 release 端點取，不看搜尋結果那欄。
async function dgPrimaryImage(id) {
  const j = await dgGet(`https://api.discogs.com/releases/${id}`);
  if (!j || !Array.isArray(j.images) || !j.images.length) return null;
  const img = j.images.find(x => x.type === 'primary') || j.images[0];
  return img && img.uri ? { url: img.uri, width: img.width, height: img.height } : null;
}

// 舊批的 cand-all.json 只有 artist／album／year，**沒有 label 也沒有 mbNote**
// （c-49 實測：三個欄位就沒了）。那樣可比對的只剩年份一項，永遠過不了兩項門檻——
// 2026-09-10 首跑 c48～c52 全數 0 命中，根因就是這個，不是 Discogs 沒有那些碟。
// 有 rgMbid 的話，廠牌與目錄號在 MusicBrainz 上本來就查得到，補上去再比。
// MB 未認證是 1 req/s，所以只在真的缺料時才查。
const MB_UA = { 'User-Agent': 'dip-vinyl-onboarding/1.0 ( kubinice06@gmail.com )', accept: 'application/json' };
const mbCache = new Map();
async function mbLabelsAndCats(rgMbid) {
  if (!rgMbid) return { labels: [], cats: new Set(), years: [] };
  if (mbCache.has(rgMbid)) return mbCache.get(rgMbid);
  let out = { labels: [], cats: new Set(), years: [] };
  for (let i = 0; i < 3; i++) {
    const r = await fetch(`https://musicbrainz.org/ws/2/release?release-group=${rgMbid}&fmt=json&inc=labels&limit=25`, { headers: MB_UA });
    if (r.ok) {
      const j = await r.json();
      for (const rel of (j.releases || [])) {
        if (rel.date) out.years.push(Number(String(rel.date).slice(0, 4)));
        for (const li of (rel['label-info'] || [])) {
          if (li.label && li.label.name) out.labels.push(norm(li.label.name));
          if (li['catalog-number']) out.cats.add(normCat(li['catalog-number']));
        }
      }
      break;
    }
    await sleep(1200);
  }
  await sleep(1100);
  mbCache.set(rgMbid, out);
  return out;
}

const results = [];
const miss = rows.filter(r => !r.cover);
console.log(`${batch}｜共 ${rows.length}｜缺封面 ${miss.length}`);

for (const row of miss) {
  const c = candBy.get(row.artist + '|' + row.album) || {};
  const wantYear = Number(c.year);
  let wantLabels = norm(c.label) ? [norm(c.label)] : [];
  let wantCats = catnosFrom(c);
  const wantYears = [];
  if (!wantLabels.length && !wantCats.size) {
    const mb = await mbLabelsAndCats(c.rgMbid || row.rgMbid);
    wantLabels = mb.labels;
    wantCats = mb.cats;
    wantYears.push(...mb.years);
  }
  const res = await dgSearch(row.artist, row.album);
  await sleep(GAP);
  if (!res) { results.push({ row, why: 'Discogs 查詢失敗' }); continue; }

  let best = null;
  for (const x of res) {
    const [ta, tb] = splitTitle(x.title);
    const na = norm(row.artist), nb = norm(row.album);
    let gotA = norm(ta), gotB = norm(tb);
    // 入場券：藝人與盤名都要對得上（互相包含，短名另要求完全相等避免通用字誤配）
    const fits = (want, got) => want.length >= 5 ? (got.includes(want) || want.includes(got)) : got === want;
    let okA = fits(na, gotA), okB = fits(nb, gotB);
    // 盤名自己含 " - " 時上面的切法會切錯；退而求其次，看整串是否同時含藝人與盤名。
    if (!okA || !okB) {
      const whole = norm(x.title);
      okA = whole.includes(na) && na.length >= 3;
      okB = whole.includes(nb) && nb.length >= 3;
    }
    if (!okA || !okB) continue;

    // 版本欄位比對：年份、廠牌、目錄號
    const hits = [];
    const years = [wantYear, ...wantYears].filter(Number.isInteger);
    if (Number(x.year) && years.some(y => Math.abs(Number(x.year) - y) <= 1)) {
      hits.push(`年份 ${x.year}`);
    }
    const labels = (x.label || []).map(norm);
    if (wantLabels.length && labels.some(l => l && wantLabels.some(w => l.includes(w) || w.includes(l)))) {
      hits.push(`廠牌 ${(x.label || [])[0]}`);
    }
    const cat = normCat(x.catno);
    if (cat && wantCats.has(cat)) hits.push(`目錄號 ${x.catno}`);

    if (!best || hits.length > best.hits.length) best = { x, hits };
  }

  if (!best) { results.push({ row, why: '無藝人＋盤名同時相符的 release' }); continue; }
  if (best.hits.length < MIN_FIELDS) {
    results.push({ row, why: `只對上 ${best.hits.length} 項（${best.hits.join('、') || '無'}），未達 ${MIN_FIELDS} 項門檻`, cand: best });
    continue;
  }
  const img = await dgPrimaryImage(best.x.id);
  await sleep(GAP);
  if (!img) { results.push({ row, why: `#${best.x.id} 比對通過但該 release 沒有圖` }); continue; }
  best.img = img;
  results.push({ row, hit: best });
}

const hits = results.filter(r => r.hit);
console.log(`Discogs 命中 ${hits.length}／${miss.length}`);
for (const r of hits) {
  console.log(`  ✓ ${r.row.artist} — ${r.row.album}  ←  #${r.hit.x.id} ${r.hit.x.title} [${r.hit.x.year || '?'}]  依據：${r.hit.hits.join('、')}`);
}
for (const r of results.filter(x => !x.hit)) console.log(`  ✗ ${r.row.artist} — ${r.row.album}：${r.why}`);

if (!WRITE) { console.log('\n（乾跑，未寫回；加 --write 才落檔）'); process.exit(0); }
if (!hits.length) { console.log('沒有可寫回的命中。'); process.exit(0); }

const now = new Date().toISOString();
for (const r of hits) {
  const target = rows.find(x => x.artist === r.row.artist && x.album === r.row.album);
  target.cover = { url: r.hit.img.url, source: 'discogs' };
  target.discogsReleaseId = String(r.hit.x.id);
}
fs.writeFileSync(`${dir}/covers.json`, JSON.stringify(rows, null, 1));

// 名單：以 discogsReleaseId 為主鍵，重跑不重複登錄，但會更新最後一次抓取時間。
const reg = fs.existsSync(REGISTRY) ? rd(REGISTRY) : {
  note: '§4 Discogs 封面來源的管理名單（店主 2026-09-10 核可時的附帶條件）。'
      + 'reviewed 欄是人工看圖核對狀態：pending＝尚未看、ok＝看過正確、rejected＝看過是錯的（該卡應退回缺封面）。',
  entries: [],
};
const byId = new Map(reg.entries.map(e => [String(e.discogsReleaseId), e]));
for (const r of hits) {
  const id = String(r.hit.x.id);
  const e = byId.get(id) || { discogsReleaseId: id, reviewed: 'pending' };
  Object.assign(e, {
    artist: r.row.artist,
    album: r.row.album,
    batch,
    discogsUrl: `https://www.discogs.com/release/${id}`,
    discogsTitle: r.hit.x.title,
    year: r.hit.x.year || null,
    label: (r.hit.x.label || [])[0] || null,
    catno: r.hit.x.catno || null,
    country: r.hit.x.country || null,
    matchedOn: r.hit.hits,
    imageUrl: r.hit.img.url,
    imageSize: `${r.hit.img.width}x${r.hit.img.height}`,
    fetchedAt: now,
  });
  if (!byId.has(id)) { reg.entries.push(e); byId.set(id, e); }
}
reg.updatedAt = now;
reg.count = reg.entries.length;
fs.writeFileSync(REGISTRY, JSON.stringify(reg, null, 1));
console.log(`已寫回 covers.json，並登錄名單 ${REGISTRY}（目前 ${reg.entries.length} 筆）`);
