#!/usr/bin/env node
// 維護 rock-asia-country-map.json：搖滾主類型的亞洲藝人 → 國別代碼（tw/jp/kr/cn/hk/th/vn/id/ph/my/sg/kh/pk/in/mn）。
// build-genre-tree.mjs 用它把亞洲藝人掛進「日亞搖滾」並依國別分第三層（2026-10-18 店主指示）。
//
//   node scripts/build-asia-country-map.mjs [--write]
//
// 既有條目（人工裁定）一律保留。新藝人只在證據夠強時自動定國別：
//   1. Last.fm 標籤只指向一個國家（「chinese」常被拿來標台港藝人，所以有 tw／hk 時忽略 cn）；
//   2. 藝人名含假名 → 日本、諺文 → 韓國、泰文 → 泰國；
//   3. tw-pop-artists.json 名單 → 台灣。
// 其餘列成「待裁定」印出來，由人判定後手寫進 JSON。純漢字名（台／港／中／日都可能）一定是待裁定。
// 值寫 "-" 代表「裁定過：不是亞洲藝人」（Last.fm 把同名藝人混在一起，例如西班牙歌手 Raphael
// 被標成 visual kei），建樹時略過，這裡也不再提案。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const WRITE = process.argv.includes('--write');
const MAP_FILE = path.join(ROOT, 'rock-asia-country-map.json');
const CACHE = path.join(ROOT, 'data', 'rawgenres-cache.json');

const seed = JSON.parse(fs.readFileSync(path.join(ROOT, 'seed_cards.json'), 'utf8'));
const raw = fs.existsSync(CACHE) ? JSON.parse(fs.readFileSync(CACHE, 'utf8')) : {};
if (!Object.keys(raw).length) console.error('⚠ 沒有 data/rawgenres-cache.json（先跑 build-genre-tree.mjs --pull），只能靠文字系統與名單判斷');
const existing = fs.existsSync(MAP_FILE) ? JSON.parse(fs.readFileSync(MAP_FILE, 'utf8')) : {};
const TW_POP = new Set(JSON.parse(fs.readFileSync(path.join(ROOT, 'tw-pop-artists.json'), 'utf8')).artists || []);

const HINTS = [
  ['jp', /^(japanese|japan|j-rock|jrock|j-pop|jpop|visual kei|japanese .*|jp punk and new wave|kayokyoku|shibuya-kei|city pop|okinawa|okinawan|日本|邦楽)$/],
  ['kr', /^(korean|korea|south korea|k-rock|k-indie|k-pop|kpop|korean .*|韓國)$/],
  ['tw', /^(taiwan|taiwanese|taiwanese .*|taiwan .*|t-pop|mandarin rock|台灣|臺灣|hokkien)$/],
  ['hk', /^(hong kong|hongkong|cantopop|canto-pop|cantonese|cantorock|hk)$/],
  ['cn', /^(chinese|china|c-rock|chinese .*|mandopop|c-pop|cpop|mandarin|beijing|mainland china)$/],
  ['th', /^(thai|thailand|thai .*|luk thung|molam|mor lam)$/],
  ['vn', /^(vietnamese|vietnam|v-pop|saigon)$/],
  ['id', /^(indonesian|indonesia|indonesian .*|dangdut)$/],
  ['ph', /^(filipino|philippines|pinoy|pinoy .*|opm|manila sound)$/],
  ['my', /^(malaysian|malaysia|malay)$/],
  ['sg', /^(singapore|singaporean)$/],
  ['kh', /^(cambodian|cambodia|cambodian .*|khmer)$/],
  ['pk', /^(pakistani|pakistan)$/],
  ['mn', /^(mongolian|mongolia)$/],
];
const script = s => /[぀-ヿ]/.test(s) ? 'jp' : /[가-힯]/.test(s) ? 'kr' : /[฀-๿]/.test(s) ? 'th' : /[一-鿿]/.test(s) ? 'han' : '';

const perArtist = new Map();
for (const r of seed) {
  if ((r[5] || [])[0] !== 'rock') continue;
  const a = r[0];
  if (!perArtist.has(a)) perArtist.set(a, { n: 0, hints: {}, albums: [] });
  const x = perArtist.get(a); x.n++; x.albums.push(`${r[6] || '----'} ${r[1]}`);
  const tags = (raw[`${a.toLowerCase()}|${r[1].toLowerCase()}`]?.rawGenres || []).map(t => String(t).toLowerCase().trim());
  for (const t of tags) for (const [cc, re] of HINTS) if (re.test(t)) x.hints[cc] = (x.hints[cc] || 0) + 1;
}

const out = { ...existing };
const auto = [], pending = [];
for (const [a, x] of perArtist) {
  if (a === 'Various Artists' || existing[a]) continue;
  const h = { ...x.hints };
  if (h.cn && (h.tw || h.hk)) delete h.cn;           // 「chinese」泛指華語圈，有更精確的就不算
  const keys = Object.keys(h);
  const sc = script(a);
  let cc = '';
  if (keys.length === 1 && h[keys[0]] >= 2) cc = keys[0];
  else if (TW_POP.has(a)) cc = 'tw';
  else if (sc && sc !== 'han') cc = sc;
  if (cc && sc === 'han' && !(h.tw || h.hk || h.cn || h.jp)) cc = '';   // 純漢字名要有標籤佐證，否則交人判
  if (cc) { out[a] = cc; auto.push([a, cc, keys.map(k => `${k}:${h[k]}`).join(',')]); }
  else if (keys.length || sc) pending.push([a, x, keys.map(k => `${k}:${h[k]}`).join(',')]);
}

console.log(`搖滾藝人 ${perArtist.size}｜對照表既有 ${Object.keys(existing).length}｜本次自動判定 ${auto.length}｜待裁定 ${pending.length}`);
for (const [a, cc, h] of auto) console.log(`  auto ${cc}  ${a}  (${h})`);
if (pending.length) {
  console.log('\n待裁定（手寫進 rock-asia-country-map.json）：');
  for (const [a, x, h] of pending) console.log(`  ?  ${a}  hints=${h || '-'}  ${x.albums.slice(0, 2).join(' / ')}`);
}
const dist = {};
for (const cc of Object.values(out)) if (cc !== '-') dist[cc] = (dist[cc] || 0) + 1;
console.log('\n國別分布（藝人數）:', JSON.stringify(dist));

if (WRITE) {
  const sorted = Object.fromEntries(Object.entries(out).sort((a, b) => a[0].localeCompare(b[0], 'zh-Hant')));
  fs.writeFileSync(MAP_FILE, JSON.stringify(sorted, null, 1) + '\n', 'utf8');
  console.log(`已寫出 ${path.relative(ROOT, MAP_FILE)}（${Object.keys(sorted).length} 位）`);
} else console.log('\n(未加 --write，未寫檔)');
