// 把 c-50 的策展提案（prop-all.json）與 MB 查詢結果（mb-raw.json）合成候選檔。
// 用法：node batch-progress/c50/consolidate.mjs [--write]
//
// 本輪 c-48／c-49 踩過的坑，這裡一次擋掉：
//
// 1. **逾時與 HTTP 錯誤不是「查無」**。c-49 的收斂器把 MB 逾時當成查無，
//    產出 11 張假的缺席舉證，等於讓 §1 的 MBID 硬規則作廢。這裡分辨三種狀態：
//    真的空陣列（查無）、`_http`（查詢失敗）、`undefined`（沒查過），
//    後兩者一律不產出候選並以非零狀態碼結束。
// 2. **標題比對要寬鬆**。c-49 拿卡片帶後綴的全名去做精確比對，
//    MB 標題是裸名就配不上（陳光榮《無間道 電影原聲配樂》vs MB 的「無間道」）。
//    這裡先精確比、再用摺疊後的雙向包含比。
// 3. **選到的 release-group 要排除 Compilation／Live／Soundtrack**，
//    本批只收正規錄音室專輯；命中這些 secondary type 的降為待裁定、不自動採用。
// 4. **兩支上游腳本的欄位命名不同，必須先正規化再讀**。2026-08-30 實踩：
//    `mb.mjs` 產 camelCase（primaryType／secondaryTypes／firstRelease），
//    `requery.mjs` 產 MB 原生的 kebab-case（primary-type／…）。本檔原本只讀
//    kebab-case，於是主查那條路的合輯懲罰從未生效——127 張裡有 7 張把
//    Compilation／Live 當正規盤收進去，而「帶 secondary type 的 0 張」這個
//    驗證是在讀一個永遠是 undefined 的欄位，等於沒驗。凡新增欄位讀取一律走 nz()。
import fs from 'node:fs';
import path from 'node:path';
import { fold, ROOT } from '../lib.mjs';

const DIR = path.join(ROOT, 'batch-progress/c50');
const write = process.argv.includes('--write');
const props = JSON.parse(fs.readFileSync(path.join(DIR, 'prop-all.json'), 'utf8'));
const mb = JSON.parse(fs.readFileSync(path.join(DIR, 'mb-raw.json'), 'utf8'));
// 補查結果（藝人目錄法）：主查零候選的那批在這裡有解，且其中四筆是主線逐張定點查證後
// 手動修正的——寬鬆比對曾把 Santana III 配到 1997 精選、Weezer 綠專配到 2026 年同名作、
// Ray Charles 第二集配到第一集。這些的 `_note` 記了為什麼卡名不照抄 MB 標題。
const rq = fs.existsSync(path.join(DIR, 'requery-out.json'))
  ? JSON.parse(fs.readFileSync(path.join(DIR, 'requery-out.json'), 'utf8')) : {};

const norm = s => fold(s).replace(/[^\p{L}\p{N}]+/gu, '');
// 少數卡的 secondary type 是作品本質、不是配錯碟。ALBUM_ONBOARDING §5.6 明訂
// 「primary-type 為 Album 但 secondary-type 含 Compilation 者，照一般 Album 寫法即可」，
// 這裡把同樣道理套到 Live／Soundtrack：逐張具名放行，不做整類開放。
const ACCEPT_SECONDARY = {
  'Jackson Browne|Running on Empty': '本作就是巡演途中在舞台、旅館房間與巴士上錄成的，Live 是作品形式本身而非誤配；策展層已按代表作收錄並記過風險。',
  'Henry Mancini|Charade': 'Mancini 的正典輸出就是電影配樂，Soundtrack 是其創作形態；本張為 1963 年原始配樂盤，非後製精選。',
};
const BAD_SECONDARY = ['Compilation', 'Live', 'Soundtrack', 'Remix', 'DJ-mix', 'Demo', 'Interview'];

// 上游兩種命名一律正規化成同一組欄位；缺欄位回 undefined 而非空字串，
// 讓「沒有這個欄位」和「欄位是空的」在後面分得開。
const nz = c => ({
  id: c.id,
  title: c.title,
  primaryType: c.primaryType ?? c['primary-type'] ?? null,
  secondaryTypes: c.secondaryTypes ?? c['secondary-types'] ?? [],
  firstRelease: c.firstRelease ?? c['first-release-date'] ?? '',
  credit: c.credit ?? c.artist ?? (c['artist-credit'] || []).map(x => x.name).join(', '),
});

const mkCard = (p, raw, extraNote) => {
  const c = nz(raw);
  return {
    artist: p.artist, album: p.album,
    rgMbid: c.id,
    mbTitle: c.title,
    mbCredit: c.credit,
    mbFirstRelease: c.firstRelease,
    releaseType: c.primaryType || '',
    secondaryTypes: c.secondaryTypes,
    suggestedYear: p.year,
    yearNote: p.year && String(c.firstRelease).slice(0, 4) !== String(p.year)
      ? `策展層取 ${p.year}，MB 首發標 ${c.firstRelease || '未載'}。本批為正規錄音室專輯，年份取原盤首發年；兩者不一致時本機以碟面為準。`
      : `策展層與 MB 首發年一致（${p.year}）。`,
    label: p.label || '',
    genres: p.genres,
    curatorWhy: p.why,
    curatorRisk: p.risk || '',
    mbNote: [p.mbNote || '', extraNote || ''].filter(Boolean).join('｜'),
    selfTitled: !!p.selfTitled,
    group: p.g,
  };
};

const out = [], skipped = [], failed = [];
for (const p of props) {
  const k = `${p.artist}|${p.album}`;
  // 補查已解出的直接採用（含主線手動修正的四筆）
  const fixed = rq[k];
  if (fixed && fixed.id) {
    out.push(mkCard(p, fixed, fixed._note || ''));
    continue;
  }
  if (fixed && fixed._http !== undefined) { failed.push({ ...p, reason: `補查失敗 ${fixed._http}` }); continue; }

  const raw = mb[k];
  // 沒查過或查詢失敗 → 不得當成查無，整張留待重查
  if (raw === undefined) { failed.push({ ...p, reason: '未查詢' }); continue; }
  if (raw && raw._http !== undefined) { failed.push({ ...p, reason: `查詢失敗 HTTP ${raw._http}` }); continue; }

  const cands = (Array.isArray(raw) ? raw : (raw['release-groups'] || raw.candidates || [])).map(nz);
  const want = norm(p.album), wantArtist = norm(p.artist);
  const scored = cands.map(c => {
    const t = norm(c.title);
    const credit = norm(c.credit);
    let s = 0;
    if (t === want) s += 100;
    else if (t.includes(want) || want.includes(t)) s += 60;
    if (credit === wantArtist) s += 40;
    else if (credit.includes(wantArtist) || wantArtist.includes(credit)) s += 20;
    if (c.primaryType === 'Album') s += 10;
    else if (c.primaryType) s -= 30;   // Single／EP 不是本批要的正規盤
    // 沒有 primary-type 的 release-group 多半是殘缺或重複條目。實例：Patti Smith《Wave》
    // 有兩筆，未定型那筆掛名剛好精確等於「Patti Smith」而分數贏過正解——正解掛名是
    // 樂團全名「Patti Smith Group」，只拿到部分比對分。掛名精確比對的加分必須被
    // 「這筆連版本類型都沒有」的扣分壓過去。
    else s -= 20;
    const sec = c.secondaryTypes || [];
    if (sec.some(x => BAD_SECONDARY.includes(x))) s -= 50;
    if (p.year && String(c.firstRelease).slice(0, 4) === String(p.year)) s += 15;
    return { c, s, sec };
  }).sort((x, y) => y.s - x.s);

  const best = scored[0];
  if (!best || best.s < 100) {
    skipped.push({ ...p, reason: best ? `最佳候選分數僅 ${best.s}（標題、掛名或版本類型對不上）` : 'MB 零候選',
                   top: scored.slice(0, 3).map(x => `${x.c.title} [${x.c.primaryType}${x.sec.length ? '+' + x.sec.join('/') : ''}] ${x.c.firstRelease || '?'}`) });
    continue;
  }
  out.push(mkCard(p, best.c));
}

// 保險起見再掃一次成品。分數懲罰只能降名次——若某張的候選全是合輯，
// 最高分的仍然是合輯，照樣會被收進來。這裡把漏網的一律退回待裁定。
// releaseType 必須確實等於 'Album'：空字串代表 MB 沒登錄版本類型，
// 那是「無法確認是正規盤」，不是「確認不是」，同樣不能靜默收下。
const bad = out.filter(c => !ACCEPT_SECONDARY[`${c.artist}|${c.album}`]
  && (c.releaseType !== 'Album' || (c.secondaryTypes || []).some(x => BAD_SECONDARY.includes(x))));
for (const c of bad) {
  out.splice(out.indexOf(c), 1);
  skipped.push({ artist: c.artist, album: c.album, g: c.group,
    reason: `最佳候選是 ${c.releaseType || '未登錄版本類型'}${(c.secondaryTypes || []).length ? '+' + c.secondaryTypes.join('/') : ''}，不是可確認的正規錄音室專輯，需定點重查`,
    top: [`${c.mbTitle} 【${c.rgMbid}】${c.mbFirstRelease || '?'}`] });
}
// 放行的例外把理由寫進卡片，讓下游寫作層與本機驗證看得到為什麼它帶著 Live／Soundtrack
for (const c of out) {
  const why = ACCEPT_SECONDARY[`${c.artist}|${c.album}`];
  if (why) c.mbNote = [c.mbNote, `版本類型例外（${c.releaseType}+${c.secondaryTypes.join('/')}）：${why}`].filter(Boolean).join('｜');
}

console.log(`提案 ${props.length}｜可用候選 ${out.length}｜待裁定 ${skipped.length}｜查詢未完成或失敗 ${failed.length}`);
if (skipped.length) {
  console.log('\n── 待裁定（MB 對不上，需人工看）──');
  skipped.forEach(s => { console.log(`  ${s.artist} — ${s.album}：${s.reason}`); (s.top || []).forEach(t => console.log(`      ${t}`)); });
}
if (failed.length) {
  console.log('\n── 查詢未完成或失敗（不得判為查無，須重查）──');
  failed.forEach(f => console.log(`  ${f.artist} — ${f.album}：${f.reason}`));
}
if (write) {
  fs.writeFileSync(path.join(DIR, 'cand.json'), JSON.stringify({ batch: 'c50', albums: out, skipped }, null, 1));
  console.log(`\n已寫出 cand.json（${out.length} 張）`);
}
process.exit(failed.length ? 2 : 0);
