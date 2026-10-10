#!/usr/bin/env node
// 已上線專輯簡介的「第二輪待修清單」：把還沒有改寫稿的問題排成一份可以直接派工的佇列。
//
//   node scripts/build-pub-fix-queue.mjs          寫 audits/pub-fix/ROUND2-QUEUE.json 與 .md
//
// 三個來源：
//   A. 藝人介紹補洞層記下的 pubIssues（desc-tools/batches/artist/research/*-g*.json），
//      扣掉第一輪（pub-fixes-1/2.json）已經逐條定案的卡。
//   B. 全池掃描：正文裡的退件說明、管線字樣、出處字樣（維基／MusicBrainz／Discogs）。
//   C. 人工補記（MANUAL）：稽核時看到、但 A、B 的規則抓不到的。
//
// 每一條都會對 KV 現值核一次「原句還在不在」——第一輪的去出處改寫可能已經順手把句子改掉了。
import fs from 'node:fs';
import path from 'node:path';

const ACC = '3a23f905e8f31d91c85050f2ed304321', NS = '5f65e74b17d644b68a3f542b08a5c105';
const AUTH = { Authorization: 'Bearer ' + process.env.CLOUDFLARE_API_TOKEN };
const BASE = `https://api.cloudflare.com/client/v4/accounts/${ACC}/storage/kv/namespaces/${NS}`;

async function listKeys(prefix) {
  const keys = []; let cursor = null;
  do {
    const j = await (await fetch(`${BASE}/keys?limit=1000&prefix=${encodeURIComponent(prefix)}` + (cursor ? `&cursor=${encodeURIComponent(cursor)}` : ''), { headers: AUTH })).json();
    if (!j.success) throw new Error('列鍵失敗 ' + JSON.stringify(j.errors));
    for (const k of j.result) keys.push(k.name);
    cursor = j.result_info?.cursor || null;
  } while (cursor);
  return keys;
}
async function bulkGet(keys) {
  const out = new Map();
  for (let i = 0; i < keys.length; i += 90) {
    const batch = keys.slice(i, i + 90); let j = null;
    for (let a = 0; a < 5 && !j; a++) {
      try {
        const t = await (await fetch(`${BASE}/bulk/get`, { method: 'POST', headers: { ...AUTH, 'Content-Type': 'application/json' }, body: JSON.stringify({ keys: batch }) })).json();
        if (t.success) j = t; else await new Promise(s => setTimeout(s, 1000 * (a + 1)));
      } catch { await new Promise(s => setTimeout(s, 1000 * (a + 1))); }
    }
    if (!j) throw new Error('bulk get 失敗於第 ' + i + ' 筆');
    for (const k of batch) { const v = j.result.values[k]; if (v != null) { try { out.set(k, JSON.parse(typeof v === 'string' ? v : JSON.stringify(v)).desc || ''); } catch { out.set(k, ''); } } }
  }
  return out;
}

// ── 線上現值 ─────────────────────────────────────────────────────
const k2 = await listKeys('desc2:'), k4all = await listKeys('desc4:');
const has2 = new Set(k2.map(k => k.slice(6)));
const k4 = k4all.filter(k => !has2.has(k.slice(6)));
const live = await bulkGet([...k2, ...k4]);
const keyOf = (artist, album) => {
  const b = `${artist}|${album}`.toLowerCase();
  return live.has('desc2:' + b) ? 'desc2:' + b : (live.has('desc4:' + b) ? 'desc4:' + b : null);
};
const seed = JSON.parse(fs.readFileSync('seed_cards.json', 'utf8'));
const byAlbum = new Map();
for (const r of seed) { const a = String(r[1]).toLowerCase(); (byAlbum.get(a) || byAlbum.set(a, []).get(a)).push(r); }

// ── A. 補洞層的 pubIssues ────────────────────────────────────────
const RDIR = 'desc-tools/batches/artist/research';
const done = new Set();
for (const f of ['pub-fixes-1.json', 'pub-fixes-2.json'])
  for (const r of JSON.parse(fs.readFileSync('audits/pub-fix/' + f, 'utf8'))) done.add(`${r.artist}|${r.album}`.toLowerCase());
// 標點比對用：第一輪已把半形標點改全形，claim 是當時抄下來的舊寫法
const loose = s => String(s || '').replace(/[，,；;：:\s]/g, '');
const A = [];
for (const f of fs.readdirSync(RDIR).filter(f => /-g\d+\.json$/.test(f)).sort()) {
  const batch = f.replace(/-g\d+\.json$/, '');
  for (const r of JSON.parse(fs.readFileSync(path.join(RDIR, f), 'utf8'))) for (const i of r.pubIssues || []) {
    if (done.has(`${r.name}|${i.album}`.toLowerCase())) continue;
    // 卡片未必掛在這位藝人名下（《Here 'Tis》記在 Grant Green，卡掛 Lou Donaldson）→ 用專輯名回頭找
    let artist = r.name, key = keyOf(r.name, i.album);
    if (!key) {
      const c = (byAlbum.get(String(i.album).toLowerCase()) || []).filter(x => keyOf(x[0], x[1]));
      if (c.length === 1) { artist = c[0][0]; key = keyOf(c[0][0], c[0][1]); }
    }
    if (key && done.has(`${artist}|${i.album}`.toLowerCase())) continue;
    const text = key ? live.get(key) : '';
    const claim = String(i.claim || '').replace(/^上線簡介[：:]/, '').trim();
    A.push({ batch, auditArtist: r.name, artist, album: i.album, key, claim: i.claim, problem: i.problem, src: i.src,
      claimFound: !key ? null : loose(text).includes(loose(claim)) });
  }
}

// ── B. 全池掃描 ──────────────────────────────────────────────────
// 退件說明：只收不可能出現在正常行文裡的說法（「重新配對」「退回重畫」「兩版本列入」都是正常句子，試過會誤中）
const WORKFLOW = /本筆|此筆|本卡配到|本列所配|應退回|建議退回|策展意圖|策展指定|策展年份/u;
// 「本卡是 1989 年的 CD 版」這種版本說明：不是退件，但把卡池當主詞講給客人聽，另列一區
const CARDTALK = /本卡/u;
const SOURCE = /維基|Wikipedia|MusicBrainz|\bMB\b|Discogs|AllMusic|RateYourMusic|\bRYM\b|release[- ]group/iu;
// 資料庫口吻：把 MusicBrainz 的條目結構講給客人聽（「這個條目底下的三張碟」「另外兩筆連日期都沒有」）。
// 2026-10-04 店主裁示排進第二輪改寫。集中在 c-9x 之後資料稀薄的卡。
const DBTALK = /條目底下|這一筆|那一筆|另外兩筆|另一筆|[兩三四五]筆|一筆記|建檔|資料庫端/u;
// 正文夾諺文：機構名、人名沒譯（書名號與引號內的原文標題不算）
const HANGUL = /\p{Script=Hangul}{2,}/u;
const stripTitles = t => t.replace(/《[^》]*》|〈[^〉]*〉|「[^」]*」/g, '');
const B1 = [], B1b = [], B2 = [], B3 = [], B4 = [];
for (const [key, text] of live) {
  const w = text.match(new RegExp(WORKFLOW.source, 'gu'));
  if (w) { B1.push({ key, hits: [...new Set(w)], desc: text }); continue; }
  if (CARDTALK.test(text)) B1b.push({ key, context: (text.match(/.{0,30}本卡.{0,40}/u) || [''])[0] });
  const body = stripTitles(text);
  if (DBTALK.test(body)) B3.push({ key, context: (body.match(new RegExp('.{0,24}(?:' + DBTALK.source + ').{0,30}', 'u')) || [''])[0] });
  if (HANGUL.test(body)) B4.push({ key, context: (body.match(new RegExp('.{0,16}(?:' + HANGUL.source + ').{0,24}', 'u')) || [''])[0] });
  const s = text.match(new RegExp(SOURCE.source, 'giu'));
  if (s) B2.push({ key, hits: [...new Set(s.map(x => x.toLowerCase()))] });
}

// ── C. 人工補記 ──────────────────────────────────────────────────
const MANUAL = [
  { key: 'desc2:fabrizio de andré|sogno nº 1', note: '正文有校對痕跡「而非雜牌彙編」——那是給審稿看的卡池裁定語，不該給客人看。' },
  { key: 'desc4:齊豫|橄欖樹', note: '這張只有 desc4（沒有產線稿）。兩處：禁歌原因只寫了「我的故鄉在遠方」，文獻上新聞局主要針對「流浪」（歌詞被迫改成「流浪流浪」）；「齊豫以〈歡顏〉拿下金馬獎最佳電影插曲」主詞錯，第 16 屆得獎人是作曲的李泰祥。建議直接走產線寫一則 desc2。' },
  { key: 'desc2:khaled|khaled', note: '「1985 年在奧蘭音樂節得首獎後被冠上 Cheb」因果寫反：Cheb 是他少年時期錄音就用的稱號，1985 年得到的是「raï 之王」，1992 年拿掉 Cheb。' },
  { key: 'desc2:ofra haza|yemenite songs', note: 'Shalom Shabazi 生卒 1619–約 1720，是十七世紀，不是十六世紀。' },
  { key: 'desc2:souad massi|raoui', note: '「受死亡威脅後離開阿爾及利亞」——她本人受訪否認（The Markaz Review、Arab News），改中性寫法。' },
  { key: 'desc2:souad massi|deb', note: '同上，「因伊斯蘭保守派的死亡威脅於 1999 年遷居巴黎」。' },
];
for (const m of MANUAL) m.exists = live.has(m.key);

// ── 輸出 ─────────────────────────────────────────────────────────
const cards = new Set(A.filter(x => x.key).map(x => x.key));
const out = {
  generatedAt: new Date().toISOString().slice(0, 10),
  note: '第二輪待修。A＝事實更正（需要研究後改寫）；B1＝退件說明／管線字樣（最優先，客人看得到）；B2＝正文點名出處（改成不具名敘述）；C＝人工補記。',
  counts: { A_rows: A.length, A_cards: cards.size, A_unresolved: A.filter(x => !x.key).length, A_claimGone: A.filter(x => x.claimFound === false).length,
    B1: B1.length, B1b: B1b.length, B2: B2.length, B3: B3.length, B4: B4.length, C: MANUAL.length },
  A, B1, B1b, B2, B3, B4, C: MANUAL,
};
fs.writeFileSync('audits/pub-fix/ROUND2-QUEUE.json', JSON.stringify(out, null, 1));

const cell = s => String(s ?? '').replace(/\|/g, '／').replace(/\s+/g, ' ');
const md = [
  '# 已上線簡介・第二輪待修清單', '',
  `\`scripts/build-pub-fix-queue.mjs\` 產生於 ${out.generatedAt}（第一輪修正包套用之後的 KV 現值）。機器可讀版是 \`ROUND2-QUEUE.json\`。`, '',
  `| 區 | 內容 | 數量 |`, `|---|---|---:|`,
  `| B1 | 退件說明／管線字樣——**客人看得到，最優先** | ${B1.length} 則 |`,
  `| B1b | 正文以「本卡」當主詞的版本說明（非退件，次優先） | ${B1b.length} 則 |`,
  `| B3 | 資料庫口吻——把條目結構講給客人聽（2026-10-04 店主裁示改寫） | ${B3.length} 則 |`,
  `| B4 | 正文夾諺文（機構名、人名沒譯） | ${B4.length} 則 |`,
  `| C | 人工補記（含另一個工作區點名的五件） | ${MANUAL.length} 則 |`,
  `| A | 事實更正，需研究後改寫 | ${A.length} 條／${cards.size} 張卡 |`,
  `| B2 | 正文點名出處的**候選**（維基／MusicBrainz／Discogs／AllMusic…），逐則判斷要不要改成不具名敘述 | ${B2.length} 則 |`, '',
  `A 區有 ${out.counts.A_claimGone} 條的原句在線上已經找不到（多半被第一輪的去出處改寫順手改掉），派工前先看「原句還在」欄；${out.counts.A_unresolved} 條對不到卡。`, '',
  '## B1　退件說明／管線字樣', '',
  ...B1.flatMap(b => [`### \`${b.key}\`　命中：${b.hits.join('、')}`, '', '> ' + b.desc, '']),
  '## B1b　「本卡」版本說明', '', '| 鍵 | 前後文 |', '|---|---|', ...B1b.map(b => `| \`${cell(b.key)}\` | ${cell(b.context)} |`), '',
  '## B3　資料庫口吻', '', '| 鍵 | 前後文 |', '|---|---|', ...B3.map(b => `| \`${cell(b.key)}\` | ${cell(b.context)} |`), '',
  '## B4　正文夾諺文', '', '| 鍵 | 前後文 |', '|---|---|', ...B4.map(b => `| \`${cell(b.key)}\` | ${cell(b.context)} |`), '',
  '## C　人工補記', '', '| 鍵 | 問題 |', '|---|---|', ...MANUAL.map(m => `| \`${cell(m.key)}\` | ${cell(m.note)} |`), '',
  '## A　事實更正', '', '| 批次 | 卡 | 上線寫法 | 問題 | 依據 | 原句還在 |', '|---|---|---|---|---|---|',
  ...A.map(x => `| ${x.batch} | ${cell(x.artist)}《${cell(x.album)}》 | ${cell(x.claim)} | ${cell(x.problem)} | ${cell(x.src)} | ${x.claimFound === null ? '對不到卡' : (x.claimFound ? '是' : '否')} |`), '',
  '## B2　正文點名出處', '', '| 鍵 | 命中 |', '|---|---|', ...B2.map(b => `| \`${cell(b.key)}\` | ${b.hits.join('、')} |`), '',
].join('\n');
fs.writeFileSync('audits/pub-fix/ROUND2-QUEUE.md', md);
console.log(JSON.stringify(out.counts));
for (const b of B1) console.log('B1 ' + b.key + '  [' + b.hits.join('/') + ']');
