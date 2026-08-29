// c-49 人工身分卡的 MB 缺席複查（2026-08-29）
//
// 起因：陳光榮《無間道 電影原聲配樂》的 mbAbsenceProof 結論寫「該碟未建檔」，
// 但 MB 其實有——release ecee1377-437a-4f17-bae4-710c315907c0（2002 HK、
// Click Music CM001、13 軌），release-group 189a203a-611b-3258-aeca-b9ab119f131d。
//
// 原本的舉證查詢有兩個結構性問題，兩個都會把「查得到」誤判成「查無」：
//   1. 只查 release-group 層。華語盤在 MB 常常只建到 release 層，RG 層是空的。
//   2. 用卡片帶後綴的全名去比對（「無間道 電影原聲配樂」），
//      而 MB 的標題是裸名「無間道」。精確字串查詢必然落空。
//
// 這支改用「先抓藝人全目錄、再回頭比對標題」：每位藝人一次 release-group 查詢
// （不是每張卡一次），拿回目錄後在本地做寬鬆比對。這樣查詢語法不再是單點失敗的來源。
//
// 為什麼主查 release-group 而不是 release：MB 的 release 搜尋帶 limit=100 時穩定回 503
// （伺服器忙碌），RG 搜尋則正常。而 2026-08-29 實測的反例（無間道）在 RG 層**也查得到**
// （189a203a-611b-3258-aeca-b9ab119f131d，標題就是裸名「無間道」），
// 可見原本舉證落空的真正原因不是層級，是拿卡片帶後綴的全名去做精確比對。
// release 層僅在 RG 沒命中時補查，且降到 limit=25、退避拉長。
//
// ⚠ 逾時與 HTTP 錯誤一律不得當成「查無」——那正是本批前兩次缺陷的成因。
//   任何一位藝人查詢失敗，該藝人的卡一律標 ERROR 而非 CLEAR，並以非零狀態碼結束。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const UA = 'dip-vinyl-shop/1.0 (kubinice06@gmail.com)';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const fold = s => String(s || '').normalize('NFKC').toLowerCase()
  .replace(/[^\p{L}\p{N}]+/gu, '');
// 比對用的「核心標題」：去掉系列前綴（「百代…：」後面才是盤名）與載體後綴。
const core = s => {
  let t = String(s || '');
  if (t.includes('：')) t = t.slice(t.lastIndexOf('：') + 1);
  t = t.replace(/電影原聲(帶|配樂|大碟)|原聲帶|典藏集|\(\d+\)|（\d+）/g, ' ');
  return t.trim();
};

async function mb(entity, artist, limit = 100) {
  const url = `https://musicbrainz.org/ws/2/${entity}/?query=artist:${encodeURIComponent(`"${artist}"`)}&fmt=json&limit=${limit}`;
  // 退避要夠長：MB 忙碌時 2 秒後重試幾乎必然再撞 503。實測 5／15／30／60 秒可過。
  const BACKOFF = [5000, 15000, 30000, 60000];
  let last = '';
  for (let attempt = 0; attempt < BACKOFF.length; attempt++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': UA } });
      if (res.status === 503 || res.status === 429) {
        last = `HTTP ${res.status}`;
        await sleep(BACKOFF[attempt]);
        continue;
      }
      if (!res.ok) return { _error: `HTTP ${res.status}` };
      return await res.json();
    } catch (e) {
      last = String(e.message || e);
      await sleep(BACKOFF[attempt]);
    }
  }
  // 把最後一次的原因帶出來——上一版只回「重試三次仍失敗」，害我得另外 curl 才知道是 503。
  return { _error: `重試 ${BACKOFF.length} 次仍失敗（最後：${last}）` };
}

const cards = [];
for (const f of fs.readdirSync(DIR)) {
  if (!f.startsWith('cand-')) continue;
  const a = JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8'));
  for (const c of a.albums) if (c.identitySource === 'manual') cards.push({ file: f, ...c });
}
const artists = [...new Set(cards.map(c => c.artist))];
console.log(`人工身分卡 ${cards.length} 張，涉及 ${artists.length} 位藝人\n`);

const wantOf = new Map();
for (const c of cards) wantOf.set(`${c.artist}|${c.album}`, fold(core(c.album)));

const cat = {};
for (const a of artists) {
  const rg = await mb('release-group', a); await sleep(1100);
  // RG 目錄已命中該藝人任何一張本批卡時，就不必再打 release 層——省下最容易 503 的查詢。
  const rgHit = !rg._error && (rg['release-groups'] || []).some(r => {
    const t = fold(r.title);
    return cards.filter(c => c.artist === a).some(c => {
      const w = wantOf.get(`${c.artist}|${c.album}`);
      return t && w && (t === w || t.includes(w) || w.includes(t));
    });
  });
  let rel = { releases: [], _skipped: true };
  if (!rgHit) { rel = await mb('release', a, 25); await sleep(1100); }
  cat[a] = { rel, rg };
  const m = rg._error ? 'ERROR ' + rg._error : (rg['release-groups'] || []).length;
  const n = rel._skipped ? '略過（RG 已命中）' : (rel._error ? 'ERROR ' + rel._error : (rel.releases || []).length);
  console.log(`  ${a}：RG ${m} ／ release ${n}`);
}

console.log('\n=== 比對結果 ===');
let hits = 0, errors = 0;
for (const c of cards) {
  const { rel, rg } = cat[c.artist];
  if ((rel._error && !rel._skipped) || rg._error) {
    console.log(`ERROR  ${c.artist} | ${c.album} → 藝人目錄查詢失敗，不得判為查無`);
    errors++; continue;
  }
  const want = fold(core(c.album));
  const wantFull = fold(c.album);
  const found = [];
  for (const r of rel.releases || []) {
    const t = fold(r.title);
    if (t && want && (t === want || t.includes(want) || want.includes(t)))
      found.push(`release ${r.id} 「${r.title}」 ${r.date || '?'} ${r.country || '?'}`);
  }
  for (const r of rg['release-groups'] || []) {
    const t = fold(r.title);
    if (t && want && (t === want || t.includes(want) || want.includes(t)))
      found.push(`RG ${r.id} 「${r.title}」 ${r['first-release-date'] || '?'}`);
  }
  if (found.length) {
    hits++;
    console.log(`⚠ 命中  ${c.artist} | ${c.album}`);
    console.log(`        核心標題「${core(c.album)}」`);
    found.slice(0, 4).forEach(x => console.log('        ' + x));
  }
}
console.log(`\n人工身分 ${cards.length} 張｜MB 疑似有建檔 ${hits} 張｜查詢失敗 ${errors} 張`);
if (errors) { console.error('有藝人目錄查詢失敗，結果不完整'); process.exit(2); }
process.exit(hits ? 1 : 0);
