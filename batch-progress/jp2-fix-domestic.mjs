// jp-2 線：重算 `domestic`，因為列舉層那一欄整欄失效。
//
// ⚠ 2026-09-24（c-183 a 組開線第一批就抓到，主線第 1953-B 條）：
// 列舉時的判準是「掛名藝人 country=JP **或** RG 初版國家含 JP」，
// **而後半那一句把「在日本發過片的外國藝人」全部標成本土**
// ——Miles Davis／Archie Shepp／Cecil Taylor／Jack DeJohnette 在 CBS/Sony・Denon・Trio 的
// 日本盤全是 `domestic: true`。c-183 a 組 19 張裡 4 張（21%）是外國藝人。
// ⚠ **jp-1 的四家列舉檔用的是另一支腳本、欄位叫 `foreignArtist`，那一欄是對的**
// （jp-1 因此正確剔掉 412 張）；**出錯的是 jp-2 這十五家。**
//
// 改法：**只認掛名藝人的 country**（MB `artist/<id>` 的 `country`／`area`），不看 release 國家。
// ⚠ **MB 沒給 country 的藝人**（日本獨立廠牌的樂手很常見）→ 退回看別名：
// **有假名／漢字變體就當本土**，兩者都沒有才標成非本土並列進報告給人看。
//
// 用法：node batch-progress/jp2-fix-domestic.mjs c184 c185 …   （不給批次就只印報告）
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib.mjs';

const UA = 'dip-vinyl-shop/1.0 (kubinice06@gmail.com)';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const RGC = path.join(ROOT, 'batch-progress/enum/jp-1-rg-cache.json');
const CNT = path.join(ROOT, 'batch-progress/enum/jp-artist-country.json');
const rgc = JSON.parse(fs.readFileSync(RGC, 'utf8'));
const arc = JSON.parse(fs.readFileSync(path.join(ROOT, 'batch-progress/enum/jp-1-artist-cache.json'), 'utf8'));
let cnt = {}; try { cnt = JSON.parse(fs.readFileSync(CNT, 'utf8')); } catch {}

const batches = process.argv.slice(2);
const slices = {};
for (const b of batches) slices[b] = JSON.parse(fs.readFileSync(path.join(ROOT, `batch-progress/c${b.replace(/^c/, '')}/slice.json`), 'utf8'));

// 先把要查的藝人湊齊
const need = new Set();
for (const rows of Object.values(slices)) for (const r of rows)
  for (const id of (rgc[r.rgMbid]?.artistIds || [])) if (!(id in cnt)) need.add(id);
let n = 0;
for (const id of need) {
  n++;
  try {
    const res = await fetch(`https://musicbrainz.org/ws/2/artist/${id}?fmt=json`, { headers: { 'User-Agent': UA } });
    // ⚠ 2026-09-25（c-184 a 組抓到，主線第 1958-B 條）：**MB 的 `country`／`area` 會是「現居地」**。
    // `Sonia Rosa` 的 `country` 逐字 `JP`、`area` `Japan`，**只有 `begin-area` 是 `São Paulo`**
    // （Discogs profile 逐字「Brazilian singer … living in Japan」）。
    // 所以 `begin-area` 要一起抓——但**它不判退**，見下方 verdict 的第 1959-B 條註解。
    if (res.ok) {
      const j = await res.json();
      const ba = j['begin-area'] || null;
      const c = j.country || j.area?.['iso-3166-1-codes']?.[0] || j.area?.iso_3166_1_codes?.[0] || '';
      cnt[id] = { country: c, begin: ba?.name || '', beginId: ba?.id || '',
                  beginIso: ba?.['iso-3166-1-codes']?.[0] || '' };
    }
    else cnt[id] = { country: '', begin: '', beginId: '', beginIso: '' };
  } catch { cnt[id] = { country: '', begin: '', beginId: '', beginIso: '' }; }
  await sleep(1100);
  if (n % 25 === 0) { fs.writeFileSync(CNT, JSON.stringify(cnt, null, 1)); process.stderr.write(`\r藝人國別 ${n}/${need.size}   `); }
}
fs.writeFileSync(CNT, JSON.stringify(cnt, null, 1));
process.stderr.write('\n');

// ── begin-area → 國碼：**用 MB 的區域階層走上去，不用地名白名單** ──
// ⚠ 2026-09-25（主線第 1959-B 條，推翻同日自己寫的第 1958-B 條前半）：
// 第一版把 `begin-area` 的地名丟進一條 `/日本|Japan|Tokyo|Osaka|…/` 白名單，
// **判成非本土 70 張，其中約 66 張是日本市區町村**——`Shibuya`（渡辺香津美）、
// `Kita`（高中正義）、`Hakodate`、`Setagaya`、`Tomakomai`、`Chigasaki`、`Funabashi`、
// `Ōmiya-ku`、`Chiyoda`、`Atami`、`Kiso`、`Naka-ku`、`Nishinomiya`、`Sendai`⋯
// 日本有一千七百多個市町村，**白名單永遠列不完，這種寫法本身就是錯的**。
// 改成查 `area/<id>?inc=area-rels` 的 `part of` 往上走到帶 `iso-3166-1-codes` 的那一層。
const ARC2 = path.join(ROOT, 'batch-progress/enum/mb-area-country.json');
let areaC = {}; try { areaC = JSON.parse(fs.readFileSync(ARC2, 'utf8')); } catch {}
async function areaCountry(id) {
  if (!id) return '';
  if (id in areaC) return areaC[id];
  let cur = id, hops = 0, out = '';
  while (cur && hops < 6) {
    let j = null;
    try {
      const res = await fetch(`https://musicbrainz.org/ws/2/area/${cur}?inc=area-rels&fmt=json`, { headers: { 'User-Agent': UA } });
      if (res.ok) j = await res.json();
    } catch {}
    await sleep(1100);
    if (!j) break;
    const iso = j['iso-3166-1-codes']?.[0] || '';
    if (iso) { out = iso; break; }
    // `part of` 的 backward 方向才是「上一層」（cur 屬於 target）
    const up = (j.relations || []).find(x => x.type === 'part of' && x.direction === 'backward' && x.area);
    cur = up?.area?.id || '';
    hops++;
  }
  areaC[id] = out;
  fs.writeFileSync(ARC2, JSON.stringify(areaC, null, 1));
  return out;
}

const CJK = s => /[぀-ヿ一-鿿]/.test(String(s || ''));
// 舊格式（字串）與新格式（物件）都要吃，因為快取是漸進累積的
const asObj = v => (typeof v === 'string' ? { country: v, begin: '', beginId: '', beginIso: '' } : (v || null));

// 先把所有 begin-area 解到國碼（有快取，第二次跑幾乎不打網路）
const beginIds = new Set();
for (const rows of Object.values(slices)) for (const r of rows)
  for (const id of (rgc[r.rgMbid]?.artistIds || [])) {
    const o = asObj(cnt[id]); if (o?.beginId && !o.beginIso) beginIds.add(o.beginId);
  }
let m = 0;
for (const aid of beginIds) { m++; await areaCountry(aid); if (m % 20 === 0) process.stderr.write(`\r出身地國碼 ${m}/${beginIds.size}   `); }
process.stderr.write('\n');
const beginCountry = o => o?.beginIso || (o?.beginId ? (areaC[o.beginId] || '') : '');

const verdict = r => {
  const ids = rgc[r.rgMbid]?.artistIds || [];
  const cs = ids.map(id => asObj(cnt[id])).filter(Boolean);
  // ⚠ **`begin-area` 不判退**（第 1959-B 條後半）：這一欄要回答的是
  // 「這張是不是日本本土製作、掛名的人在不在日本的場景裡」，**不是出身地**。
  // `Marlene`（生於馬尼拉）、`Sonia Rosa`（生於 São Paulo）、`朝比奈マリア`（生於華府）
  // 都是長住日本、替日本廠牌錄日本市場的盤——與「Chet Baker 的日本壓片」是兩件事，
  // 而後者的 MB `country` 本來就不是 JP，**單看 country 就已經擋住了**。
  // 出身地只做兩件事：(1) `country` 缺漏時當正面證據；(2) 出身國不在日本時**加註記給策展層看**。
  const jpBegin = cs.some(c => beginCountry(c) === 'JP');
  if (cs.some(c => c.country === 'JP') || jpBegin) {
    const born = cs.find(c => c.country === 'JP' && beginCountry(c) && beginCountry(c) !== 'JP');
    const v = { domestic: true, how: cs.some(c => c.country === 'JP') ? 'artist country=JP' : 'begin-area 解到 JP' };
    if (born) v.bornOutside = `出身地 ${born.begin}（${beginCountry(born)}）不在日本，長住日本——**算本土，但策展層自行判斷是否算日本場景**`;
    return v;
  }
  const known = cs.map(c => c.country || beginCountry(c)).filter(Boolean);
  if (known.length) return { domestic: false, how: `artist country=${[...new Set(known)].join('/')}` };
  const vars = ids.flatMap(id => arc[id]?.variants || []).concat([r.artist]);
  if (vars.some(CJK)) return { domestic: true, how: '無 country，但別名有假名／漢字' };
  return { domestic: false, how: '⚠ 無 country、別名全羅馬字——**策展層務必自己查**' };
};

let flipped = 0, total = 0;
const report = [];
for (const [b, rows] of Object.entries(slices)) {
  for (const r of rows) {
    total++;
    const v = verdict(r);
    r.domesticRecheck = v;
    if (!v.domestic) { flipped++; report.push(`[${b}] ${r.artist} —《${r.album}》${r.year}｜${r.house}｜${v.how}`); }
  }
  fs.writeFileSync(path.join(ROOT, `batch-progress/${b}/slice.json`), JSON.stringify(rows, null, 1) + '\n');
}
console.log(`重算 ${total} 張｜判成非本土 ${flipped} 張（${(flipped / total * 100).toFixed(0)}%）\n`);
for (const line of report) console.log('  ' + line);
