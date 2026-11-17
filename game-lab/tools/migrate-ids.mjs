// migrate-ids.mjs：一次性把遊戲卡片 id 從舊 slug 換成主站 catalogId（第 B 波 SPEC-B §1.1、§1.4；2026-11-16）。
//
//   node game-lab/tools/migrate-ids.mjs           # 寫 tools/legacy-ids.json＋換掉下列檔裡寫死的舊 id＋grep 檢查
//   node game-lab/tools/migrate-ids.mjs --grep    # 只做 grep 檢查（368 個舊 slug 在程式／資料／測試檔應為 0 處；有就 exit 1）
//
// 跑過一次、產物已提交；之後留著當紀錄（再跑一次是 no-op：對照表從每張卡的藝人／專輯推，不看 cards.js 的鍵）。
//
// 1. 對照表 LEGACY＝{ 舊 slug: catalogId }（核心 368 張）：舊 slug＝oldSlug(藝人, 專輯)（bake-cards.mjs 原本的 cardId，照抄），
//    catalogId＝(藝人+'|'+專輯).toLowerCase().replace(/\//g,'-').trim()（＝主站 cardIdOf）。寫 tools/legacy-ids.json（不給瀏覽器載；
//    check-content.mjs 比對 content.js C.legacyIds() 執行期推出來的＋C.legacyExtra＝這份，一筆不同就失敗）。
// 2. 換字面：只換「整個字串字面等於舊 id」的（'舊id'／"舊id"／`舊id` → JSON.stringify(新id)；catalogId 可能含 '，一律雙引號），
//    不做子字串取代；JSON 檔照原排版逐字換，換完 parse 比對＝parse→換鍵與值的結果（排版不動、鍵順序不動）。
//    範圍：FILES（下面）＋test/*.mjs、tests/*.mjs、dev/*.html。不碰 cards.js／bins.js（bake 重產）、pool-index.json（build-pool-index 重產）。
//    歷史紀錄不換：dev/*.md、dev/sim-v4.json、tools/substitutions-v4.json。
// 3. grep：368 個舊 slug（前後不接 slug 字元＝[a-z0-9中日文-]）在 game-lab 程式／資料／測試檔＋主站幾支碰 game-lab 的檔應為 0 處。
//    例外（SPEC-B §1.4 定稿 A2）：歷史紀錄（上面）、LINES-REVIEW.md（lint-copy 每次重產）、tools/legacy-ids.json（對照表本身）、
//    `art/covers/<slug>.jpg`（是封面檔名 coverSlug，不是卡 id：cover-overrides.json 註解、cards.js 的 localCover）、
//    網址路徑裡剛好同字的（cards.js appleUrl 的 music.apple.com/…/album/<slug>/<id>，是 Apple 的 slug，不是卡 id）。
//    藏在長字串裡的（e2e.spec 的正規式、?card= 網址）migrate 不換，手改（A2）；grep 會抓到漏的。
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const LAB = path.resolve(HERE, '..');
const ROOT = path.resolve(LAB, '..');
const require = createRequire(import.meta.url);
const GREP_ONLY = process.argv.includes('--grep');

export const oldSlug = (a, b) => (a + '-' + b).normalize('NFD').replace(/[̀-ͯ]/g, '').normalize('NFC').toLowerCase()
  .replace(/[^a-z0-9㐀-鿿぀-ヿ]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
export const catalogId = (a, b) => ((a || '') + '|' + (b || '')).toLowerCase().replace(/\//g, '-').trim();

const cards = require(path.join(LAB, 'cards.js'));
const LEGACY = {};
const problems = [];
for (const [k, c] of Object.entries(cards)) {
  const o = oldSlug(c.artist, c.album), n = catalogId(c.artist, c.album);
  if (k !== o && k !== n) problems.push('cards.js 的鍵 ' + k + ' 既不是舊 slug（' + o + '）也不是 catalogId（' + n + '）');
  if (o.indexOf('|') >= 0 || n.indexOf('|') < 0) problems.push('新舊分不出：' + o + ' → ' + n);
  if (LEGACY[o] && LEGACY[o] !== n) problems.push('舊 slug 撞號：' + o + ' → ' + LEGACY[o] + '／' + n);
  LEGACY[o] = n;
}
if (Object.keys(LEGACY).length !== Object.keys(cards).length) problems.push('對照表 ' + Object.keys(LEGACY).length + ' 筆 ≠ cards.js ' + Object.keys(cards).length + ' 張');
if (new Set(Object.values(LEGACY)).size !== Object.keys(LEGACY).length) problems.push('catalogId 撞號');
if (problems.length) { console.error(problems.join('\n')); process.exit(1); }
const OLD = Object.keys(LEGACY);

// ---- 1. legacy-ids.json ----
const LEGACY_FILE = path.join(HERE, 'legacy-ids.json');
if (!GREP_ONLY) {
  const text = '{\n' + OLD.map(k => JSON.stringify(k) + ': ' + JSON.stringify(LEGACY[k])).join(',\n') + '\n}\n';
  fs.writeFileSync(LEGACY_FILE, text);
  console.log('wrote tools/legacy-ids.json：' + OLD.length + ' 筆');
}

// ---- 2. 換字面 ----
const FILES = ['tools/pitches.json', 'tools/cover-overrides.json', 'tools/deck-lists.json', 'shops/dip.json', 'shops/basement.json', 'shops/home.json',
  'content.js', 'tools/bake-cards.mjs', 'tools/check-covers.mjs'];
const dirFiles = (d, re) => fs.existsSync(path.join(LAB, d)) ? fs.readdirSync(path.join(LAB, d)).filter(f => re.test(f)).sort().map(f => d + '/' + f) : [];
const TARGETS = FILES.filter(f => fs.existsSync(path.join(LAB, f)))
  .concat(dirFiles('test', /\.m?js$/), dirFiles('tests', /\.m?js$/), dirFiles('dev', /\.html$/));
const SLUGCH = 'a-z0-9\\u3400-\\u9fff\\u3040-\\u30ff';
const LIT = new RegExp('([\'"`])([' + SLUGCH + '-]+)\\1', 'g');
const LIT_JSON = new RegExp('"([' + SLUGCH + '-]+)"', 'g');
function mapDeep(v) {
  if (typeof v === 'string') return Object.prototype.hasOwnProperty.call(LEGACY, v) ? LEGACY[v] : v;
  if (Array.isArray(v)) return v.map(mapDeep);
  if (v && typeof v === 'object') { const o = {}; for (const k of Object.keys(v)) o[mapDeep(k)] = mapDeep(v[k]); return o; }
  return v;
}
if (!GREP_ONLY) {
  const rep = [];
  for (const rel of TARGETS) {
    const file = path.join(LAB, rel);
    const before = fs.readFileSync(file, 'utf8');
    let n = 0;
    const isJson = /\.json$/.test(rel);
    const after = isJson
      ? before.replace(LIT_JSON, (m, s) => Object.prototype.hasOwnProperty.call(LEGACY, s) ? (n++, JSON.stringify(LEGACY[s])) : m)
      : before.replace(LIT, (m, q, s) => Object.prototype.hasOwnProperty.call(LEGACY, s) ? (n++, JSON.stringify(LEGACY[s])) : m);
    if (isJson) {
      const want = JSON.stringify(mapDeep(JSON.parse(before))), got = JSON.stringify(JSON.parse(after));
      if (want !== got) { console.error(rel + '：逐字換的結果跟 parse→換鍵與值不一樣，沒寫'); process.exitCode = 1; continue; }
    }
    if (n) fs.writeFileSync(file, after);
    rep.push([rel, n]);
  }
  console.log('換字面（整串等於舊 id 的字面）：');
  for (const [f, n] of rep) if (n) console.log('  ' + f + '：' + n);
  console.log('  合計 ' + rep.reduce((s, x) => s + x[1], 0) + ' 處／' + rep.filter(x => x[1]).length + ' 檔（掃了 ' + rep.length + ' 檔）');
}

// ---- 3. grep：舊 slug 在程式／資料／測試檔應為 0 處 ----
const EXCLUDE = [/^game-lab\/dev\/.*\.md$/, /^game-lab\/dev\/sim-v4\.json$/, /^game-lab\/tools\/substitutions-v4\.json$/, /^game-lab\/LINES-REVIEW\.md$/, /^game-lab\/tools\/legacy-ids\.json$/];
const scan = [];
(function walk(d) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) { if (!/^(node_modules|\.git)$/.test(f.name)) walk(p); continue; }
    if (/\.(m?js|cjs|json|html|css|md)$/.test(f.name)) scan.push(p);
  }
})(LAB);
for (const f of ['index.html', 'sw.js', 'roguelike.html', 'dip-tune.js', 'music-map.html']) if (fs.existsSync(path.join(ROOT, f))) scan.push(path.join(ROOT, f));
const slugRe = new RegExp('[' + SLUGCH + '-]');
const COVER_FILE = /art\/covers\/$/;
const hits = [];
for (const file of scan) {
  const rel = path.relative(ROOT, file).split(path.sep).join('/');
  if (EXCLUDE.some(re => re.test(rel))) continue;
  const t = fs.readFileSync(file, 'utf8');
  for (const id of OLD) {
    let i = -1;
    while ((i = t.indexOf(id, i + 1)) >= 0) {
      const pre = t[i - 1] || '', post = t[i + id.length] || '';
      if (slugRe.test(pre) || slugRe.test(post)) continue;            // 包在更長的 slug 裡（另一個詞的一部分）
      if (COVER_FILE.test(t.slice(Math.max(0, i - 11), i)) && t.slice(i + id.length, i + id.length + 4) === '.jpg') continue;   // art/covers/<coverSlug>.jpg
      if (/^https?:\/\//.test(t.slice(Math.max(0, i - 300), i).match(/[^\s"'`\\]*$/)[0])) continue;   // 網址路徑（例：appleUrl 的 /album/<slug>/ 剛好同字）
      const ln = t.slice(0, i).split('\n').length;
      hits.push(rel + ':' + ln + '  ' + id + '  …' + JSON.stringify(t.slice(Math.max(0, i - 30), i + id.length + 15)));
    }
  }
}
console.log('grep 舊 slug（' + OLD.length + ' 個；掃 ' + scan.length + ' 檔，排除歷史紀錄／LINES-REVIEW／legacy-ids／art/covers 檔名／網址路徑）：' + hits.length + ' 處');
if (hits.length) {
  const byFile = {}; for (const h of hits) { const f = h.split(':')[0]; byFile[f] = (byFile[f] || 0) + 1; }
  for (const [f, n] of Object.entries(byFile)) console.log('  ' + f + '：' + n);
  hits.slice(0, 80).forEach(h => console.log('  ' + h)); process.exitCode = 1;
}
