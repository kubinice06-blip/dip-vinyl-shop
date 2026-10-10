#!/usr/bin/env node
// round2-rebind-check.md 核對出來的五樣小修（2026-10-04 店主「1、2 都做」）：
//   1. 蔡琴《蔡琴老歌》固定試聽：Apple 1114507022（2003 鄉城 32 軌選輯）→ 993111862（1985 飛碟 10 軌的重製版）
//   2. Ana Moura《Desfado》曲風 jazz → world（fado）
//   3. Queen《Greatest Hits》：補固定試聽（Apple 6781080300）、UPC 換掉俄羅斯盜版條碼、頂點資格補評
//   4. c-129 簡介結尾的「這張沒有試聽來源。」——刪掉那一句
//   5. 서태지와 아이들《서태지와 아이들 IV》正文的諺文機構名與人名改成中文
//
// 用法：node audits/pub-fix/round2-smallfix-apply.mjs [--write | --verify]
// --write 改本機檔案、PATCH card_catalog，並把 KV bulk 檔寫到 publish-stage/（之後用 wrangler 上傳）。
import fs from 'node:fs';

const WRITE = process.argv.includes('--write'), VERIFY = process.argv.includes('--verify');
const ACC = '3a23f905e8f31d91c85050f2ed304321', NS = '5f65e74b17d644b68a3f542b08a5c105';
const AUTH = { Authorization: 'Bearer ' + process.env.CLOUDFLARE_API_TOKEN };
const KV = `https://api.cloudflare.com/client/v4/accounts/${ACC}/storage/kv/namespaces/${NS}`;
const FS = 'https://firestore.googleapis.com/v1/projects/price-manager-e8846/databases/(default)/documents';
const FKEY = 'AIzaSyBpR5XKKHwT_eQoShtBPtFNRXz4ymzPWQg';
const OUT = 'publish-stage/pub-fix-20261004';
const NOW = '2026-10-04T00:00:00.000Z';
const TAIL = '這張沒有試聽來源。';

const kvGet = async keys => {
  const out = {};
  for (let i = 0; i < keys.length; i += 90) {
    const r = await (await fetch(`${KV}/bulk/get`, { method: 'POST', headers: { ...AUTH, 'Content-Type': 'application/json' }, body: JSON.stringify({ keys: keys.slice(i, i + 90) }) })).json();
    if (!r.success) throw new Error(JSON.stringify(r.errors));
    Object.assign(out, r.result.values);
  }
  return out;
};
const audioNorm = v => String(v || '').normalize('NFKD').toLowerCase().replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9㐀-鿿぀-ヿᄀ-ᇿ㄰-㆏가-힯Ͱ-Ͽἀ-῿Ѐ-ԯ԰-֏֐-׿؀-ۿݐ-ݿऀ-ॿঀ-৿฀-๿຀-໿က-႟Ⴀ-ჿሀ-፿ក-៿]+/g, '');
const audioKey = (a, b) => `${audioNorm(a)}\u0000${audioNorm(b)}`;

// ── 目標 ─────────────────────────────────────────────────────────
const PREVIEWS = [
  { artist: '蔡琴', album: '蔡琴老歌', storefront: 'TW', collectionId: '993111862', collectionName: '蔡琴老歌 (Remastered)', previewTrackCount: 10,
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/b4/70/7c/b4707caf-729d-cb74-6f6a-d2387edd8d3c/mzaf_18363374181948631617.plus.aac.p.m4a',
    collectionViewUrl: 'https://music.apple.com/tw/album/%E8%94%A1%E7%90%B4%E8%80%81%E6%AD%8C-remastered/993111862',
    note: '2026-10-04 改配。原配 1114507022 是 2003 年鄉城唱片的 32 軌《蔡琴老歌》（不了情／懷念／夢中人…），與本卡 1985 年飛碟 10 軌一首都不重疊。993111862 為 ℗ 2015 華納（飛碟的後身）的重製版，10 軌曲序與 MB release d23ad463／efb3ba51 逐首相符：癡癡的等／寒雨曲／落花流水／是夢是真／總有一天等到你／三年／訴衷情／紅淚／一年又一年／恨不相逢未嫁時。取第 1 軌，實測 HTTP 206 audio/x-m4p。' },
  { artist: 'Queen', album: 'Greatest Hits', storefront: 'TW', collectionId: '6781080300', collectionName: 'Greatest Hits', previewTrackCount: 17,
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/c3/29/40/c3294027-644c-ca9d-ea2a-68a498431c8f/mzaf_1930657702308615235.plus.aac.p.m4a',
    collectionViewUrl: 'https://music.apple.com/tw/album/greatest-hits/6781080300',
    note: '2026-10-04 補配。08-21 時 Apple 只配到三碟套裝《The Platinum Collection》而降級為 unavailable；現在 TW／US／GB 三店面都有單張正版 6781080300（17 軌、1981-10-26、notExplicit、℗ 1981 Queen Productions／Hollywood），曲目 Bohemian Rhapsody／Another One Bites the Dust／Killer Queen…We Will Rock You／We Are the Champions，是 1981 年 EMI 版的十七軌。取第 1 軌，實測 HTTP 206 audio/x-m4p。' },
];
const SEED_FIX = [{ artist: 'Ana Moura', album: 'Desfado', genres: ['world'] }];
const MAPGENRE = { 'mapgenre3:ana moura|desfado': ['world'] };
const CATALOG = [{ docId: 'queen|greatest hits', upc: '602527583648' }];   // 2011 Virgin EMI 重製 CD，同 RG 69ce61c8
// 這張沒有 desc2（產線稿），線上讀的是 desc4
const HANGUL_KEYS = ['desc2:서태지와 아이들|서태지와 아이들 iv', 'desc4:서태지와 아이들|서태지와 아이들 iv'];
const HANGUL = [['遭한국공연윤리위원회 判定', '遭韓國公演倫理委員會判定'], ['서태지 不改詞', '徐太志不改詞']];

// ── c-129：找出結尾帶那一句的卡 ───────────────────────────────────
const c129 = JSON.parse(fs.readFileSync('onboarding-manifest-c129-20260917.json', 'utf8'));
const tailKeys = c129.albums.filter(a => (a.description?.text || '').endsWith(TAIL)).map(a => `desc2:${a.artist}|${a.album}`.toLowerCase());

const live = await kvGet([...tailKeys, ...HANGUL_KEYS, ...Object.keys(MAPGENRE)]);
const HANGUL_KEY = HANGUL_KEYS.find(k => live[k] != null) || HANGUL_KEYS[0];
const puts = [], backup = {};
const setDesc = (key, fn, label) => {
  const raw = live[key]; if (raw == null) { console.log(`  ? KV 無 ${key}`); return; }
  const o = JSON.parse(raw), nd = fn(o.desc);
  if (nd === o.desc) { console.log(`  = ${label} 已是新值 ${key}`); return; }
  puts.push({ key, value: JSON.stringify({ ...o, desc: nd }) }); backup[key] = raw;
  console.log(`  ▸ ${label} ${key}\n      …${nd.slice(-46)}`);
};
console.log(`【4】c-129 結尾「${TAIL}」：manifest 命中 ${tailKeys.length} 則`);
for (const k of tailKeys) setDesc(k, d => d.endsWith(TAIL) ? d.slice(0, -TAIL.length) : d, '刪句');
console.log('【5】諺文');
setDesc(HANGUL_KEY, d => HANGUL.reduce((s, [a, b]) => s.split(a).join(b), d), '改字');
console.log('【2】mapgenre3');
for (const [key, genres] of Object.entries(MAPGENRE)) {
  const o = JSON.parse(live[key] || '{}'), v = JSON.stringify({ ...o, genres });
  if (v !== live[key]) { puts.push({ key, value: v }); backup[key] = live[key]; console.log(`  ▸ ${key}  ${JSON.stringify(o.genres)} → ${JSON.stringify(genres)}`); }
  else console.log(`  = 已是新值 ${key}`);
}

if (VERIFY) {
  const rec = JSON.parse(fs.readFileSync(`${OUT}/smallfix-kv-puts.json`, 'utf8'));
  const now = await kvGet(rec.map(p => p.key));
  const bad = rec.filter(p => now[p.key] !== p.value);
  console.log(`\nKV 回讀 ${rec.length} 個鍵：一致 ${rec.length - bad.length}｜不符 ${bad.length}`); bad.forEach(p => console.log('  ✗ ' + p.key));
  let cbad = 0;
  for (const c of CATALOG) {
    const d = await (await fetch(`${FS}/card_catalog/${encodeURIComponent(c.docId)}?key=${FKEY}`)).json();
    const ok = d.fields?.upc?.stringValue === c.upc; if (!ok) cbad++;
    console.log(`card_catalog ${c.docId} upc ${ok ? '✓' : '✗ ' + d.fields?.upc?.stringValue}`);
  }
  const rt = JSON.parse(fs.readFileSync('data/apple-audio-runtime-v1.json', 'utf8')).entries;
  for (const p of PREVIEWS) console.log(`runtime 試聽 ${p.artist}《${p.album}》 ${rt[audioKey(p.artist, p.album)]?.[1] === p.collectionId ? '✓ ' + p.collectionId : '✗'}`);
  process.exit(bad.length || cbad ? 1 : 0);
}

// ── 本機檔案 ─────────────────────────────────────────────────────
const seedRaw = fs.readFileSync('seed_cards.json', 'utf8'), seed = JSON.parse(seedRaw);
const eol = /\r\n/.test(seedRaw) ? ',\r\n' : ',\n', tail = /\r?\n$/.exec(seedRaw)?.[0] || '';
const render = rows => '[' + rows.map(r => JSON.stringify(r)).join(eol) + ']' + tail;
if (render(seed) !== seedRaw) { console.error('✗ seed_cards.json 排版自檢失敗'); process.exit(1); }
console.log('【2】seed');
for (const f of SEED_FIX) {
  const row = seed.find(r => r[0] === f.artist && r[1] === f.album), before = JSON.stringify(row);
  row[5] = f.genres; console.log(`  ${before} → ${JSON.stringify(row)}`);
}

const AUD = 'data/apple-audio-map-v1.json', audRaw = fs.readFileSync(AUD, 'utf8'), aud = JSON.parse(audRaw);
const audIndent = /^\{\r?\n( +)"/.exec(audRaw)?.[1]?.length ?? 0, audCRLF = /\r\n/.test(audRaw);
const renderAud = o => { const s = JSON.stringify(o, null, audIndent || undefined) + (/\n$/.test(audRaw) ? '\n' : ''); return audCRLF ? s.replace(/\n/g, '\r\n') : s; };
if (renderAud(aud) !== audRaw) { console.error('✗ apple-audio-map-v1.json 排版自檢失敗'); process.exit(1); }
console.log('【1】【3】固定試聽');
for (const p of PREVIEWS) {
  const k = audioKey(p.artist, p.album), old = aud.entries[k];
  const pool = seed.find(r => r[0] === p.artist && r[1] === p.album)?.[8] ? 'apex' : 'seed';
  const entry = { artist: p.artist, album: p.album, pool: old?.pool || pool, status: 'matched', storefront: p.storefront, collectionId: p.collectionId,
    collectionName: p.collectionName, previewTrackCount: p.previewTrackCount, previewUrl: p.previewUrl, matchedAt: NOW, source: 'manual-verify', note: p.note, collectionViewUrl: p.collectionViewUrl };
  console.log(`  ${p.artist}《${p.album}》 ${old ? old.collectionId + ' → ' : '（新增）'}${p.collectionId}`);
  if (old) aud.entries = Object.fromEntries(Object.entries(aud.entries).map(([kk, v]) => kk === k ? [kk, entry] : [kk, v]));
  else {
    // 新增的鍵插在第一個比它大的鍵之前；**不要整份重排**（重排會讓 diff 變成整個檔 14 萬行）
    const list = Object.entries(aud.entries); let at = list.findIndex(([kk]) => kk > k); if (at < 0) at = list.length;
    list.splice(at, 0, [k, entry]); aud.entries = Object.fromEntries(list);
  }
}
// 有了試聽就不能再留在「固定無來源」狀態檔
let pvs = fs.readFileSync('card-preview-status.js', 'utf8');
const pvLine = /^\s*"queen\|greatest hits": "unavailable",\r?\n/m;
if (pvLine.test(pvs)) { pvs = pvs.replace(pvLine, ''); console.log('  card-preview-status.js 移除 queen|greatest hits 的 unavailable'); }

// manifest 與批次輸出檔的文字要跟著改，否則日後重跑 gate 會因簡介不符而失敗
let mTail = 0;
for (const a of c129.albums) if ((a.description?.text || '').endsWith(TAIL)) { a.description.text = a.description.text.slice(0, -TAIL.length); mTail++; }
const outF = 'desc-tools/batches/output/c129-out-1.json'; let outRaw = fs.readFileSync(outF, 'utf8');
const outN = outRaw.split(TAIL).length - 1; outRaw = outRaw.split(TAIL).join('');
const c34f = 'onboarding-manifest-c34-canon-20260821.json', c34raw = fs.readFileSync(c34f, 'utf8'), c34 = JSON.parse(c34raw);
const q = c34.albums.find(a => a.artist === 'Queen' && a.album === 'Greatest Hits');
q.identity.upc = CATALOG[0].upc;
q.apexAssessment = { eligible: false, tier: null, evidenceUrls: [],
  reason: '2026-10-04 補評（身分已於 08-21 重釘到 1981 EMI 原版 RG）：classic 5 達殿堂最低門檻，但 Queen 的殿堂席次已由《A Night at the Opera》《Sheer Heart Attack》《News of the World》三張原始專輯代表；精選輯的份量來自銷量而非跨來源的樂評共識，不重複佔位，作一般卡。' };
const pv = PREVIEWS[1];
q.preview = { status: 'ready', url: pv.previewUrl, source: 'apple', httpStatus: 206, checkedAt: NOW, note: pv.note, appleCollectionId: pv.collectionId };
console.log(`【4】manifest c129 ${mTail} 則、輸出檔 ${outN} 處；【3】manifest c34 Queen 的 UPC／頂點／試聽`);

console.log(`\nKV 要寫 ${puts.length} 個鍵`);
if (!WRITE) { console.log('乾跑結束。加 --write 執行。'); process.exit(0); }

const dump = (f, raw, obj) => { const ind = /^\{\r?\n( +)"/.exec(raw)?.[1]?.length ?? 1; let s = JSON.stringify(obj, null, ind) + (/\n$/.test(raw) ? '\n' : ''); if (/\r\n/.test(raw)) s = s.replace(/\n/g, '\r\n'); fs.writeFileSync(f, s); };
fs.writeFileSync('seed_cards.json', render(seed));
fs.writeFileSync(AUD, renderAud(aud));
fs.writeFileSync('card-preview-status.js', pvs);
dump('onboarding-manifest-c129-20260917.json', fs.readFileSync('onboarding-manifest-c129-20260917.json', 'utf8'), c129);
dump(c34f, c34raw, c34);
fs.writeFileSync(outF, outRaw);
fs.mkdirSync(OUT, { recursive: true });
if (puts.length) {   // 重跑時 KV 已是新值、puts 為空，別把上一次的紀錄蓋掉
  fs.writeFileSync(`${OUT}/smallfix-kv-puts.json`, JSON.stringify(puts));
  fs.writeFileSync(`${OUT}/smallfix-kv-backup.json`, JSON.stringify(backup, null, 1));
}
fs.writeFileSync(`${OUT}/smallfix-catalog-patches.json`, JSON.stringify(CATALOG.map(c => ({ docId: c.docId, updateMask: ['upc'], body: { fields: { upc: { stringValue: c.upc } } } })), null, 1));
console.log(`✓ 本機檔案已改；KV bulk 檔與 card_catalog 補丁在 ${OUT}/`);
