// 冷門軸錨點制（ALBUM_ONBOARDING §0.8，2026-09-02 店主核可）。
//
// /album-rating 的冷門軸是 Last.fm listeners 的絕對分級，對「深掘線」與
// 「非拉丁文字的廣度批」系統性失真：考古再發會製造聽眾數，而 Last.fm 的
// 聽眾分佈本身偏英語圈。§0.8 因此規定這兩類批的冷門軸改人工錨點。
//
// 這支腳本**只產出提案**，不改 ratings.json。它把每張卡對到 §0.8 表格的哪一列、
// 依據哪些證據，逐張寫進 <批>/obscurity-anchor.json 供人工定案；並照 §0.8 的
// 「機器抽查（報警不評分）」列出兩種要複核的形態。
//
// 用法：node batch-progress/anchor-obscurity.mjs <批名> <depth|regional> [--write]
//   --write 才會把定案分數寫回 ratings.json（同時記 source 與 obscurityNote）
import fs from 'node:fs';

const ROOT = 'C:/Users/User/dip-vinyl-home/dip-vinyl-shop';
const [batch, mode] = process.argv.slice(2);
const WRITE = process.argv.includes('--write');
if (!batch || !['depth', 'regional'].includes(mode)) {
  console.error('用法: node batch-progress/anchor-obscurity.mjs <批名> <depth|regional> [--write]');
  process.exit(1);
}
const dir = `${ROOT}/batch-progress/${batch}`;
const cand = JSON.parse(fs.readFileSync(`${dir}/cand-all.json`, 'utf8'));
const ratings = JSON.parse(fs.readFileSync(`${dir}/ratings.json`, 'utf8'));
const previews = fs.existsSync(`${dir}/previews.local.json`)
  ? JSON.parse(fs.readFileSync(`${dir}/previews.local.json`, 'utf8')) : {};

// 私壓／小廠／卡帶流通：原盤這一層的訊號。三個欄位都掃，因為策展層把它寫在
// curatorWhy（為什麼收）或 curatorRisk（風險）都有可能。
const PRIVATE = /私壓|自資|自費|自行壓片|自主發行|自製|無廠牌|不掛廠牌|地下流通|磁帶流通|卡帶流通|磁帶專輯|磁帶原盤|магнитиздат|self-released|private press|限量壓|小廠|極小廠|教會自[資費]|家庭錄音|田野錄音/;
// 授權考古再發：進了串流就不是 5 分。廠牌名單是這幾批實際出現過的考古廠牌。
const REISSUE_LABEL = /Numero|Light in the Attic|Now-?Again|Soul Jazz|Analog Africa|Sublime Frequencies|Finders Keepers|Strut|Honest Jon|Trunk|Guerssen|Time-?Lag|Mississippi Records|Death Is Not the End|Superior Viaduct|Dark Entries|Black Editions|WRWTFWW|Awesome Tapes|Ostinato|Habibi Funk|Pharaway|Shadoks|Radio Martiko|Saigon Supersound|Sacred Bones|Palto Flats|Em Records|Jazzman|BBE|Tidal Waves|Anthology Recordings|Blank Forms|Efficient Space|Music From Memory/i;
const REISSUE_WORD = /再發|復刻|重發|再版|reissue|考古廠牌|重新發行|數位化上架/;

const rows = [];
for (const c of cand) {
  const k = c.artist + '|' + c.album;
  const rt = ratings[k];
  if (!rt || !rt.obscurity) continue;
  const listeners = Number.isInteger(rt.listeners) ? rt.listeners
    : (Number.isInteger(rt._listeners) ? rt._listeners : null);
  const text = [c.curatorWhy, c.curatorRisk, c.mbNote].filter(Boolean).join(' ');
  const isPrivate = PRIVATE.test(text);
  const reissued = REISSUE_LABEL.test(text) || REISSUE_WORD.test(text);
  const onApple = previews[k] && previews[k].status === 'ready';
  const streaming = onApple || (Number.isInteger(listeners) && listeners >= 3000);

  let score, why;
  if (isPrivate && !reissued && !streaming) {
    score = 5; why = '原盤私壓／小廠或僅卡帶流通，未見授權再發進串流';
  } else if (isPrivate) {
    score = 4; why = `原盤私壓／小廠，但${reissued ? '已有授權考古再發' : '已在串流可得'}——「被挖出來了，但仍是收藏家領域」`;
  } else if (mode === 'depth' && (!Number.isInteger(listeners) || listeners < 20000)) {
    // 深掘線收的就是各曲風的非正典那一端，整批都有考古廠牌的再發舉證。
    // 錨點表第 4 列講的正是這個狀態——「被挖出來了，但仍是收藏家領域」。
    // 這幾批的 listeners 中位數落在 300–3,900，第三四分位也還在五位數以下。
    score = 4; why = '考古再發後已可得，但仍在收藏家領域，未進入一般流通';
  } else if (!Number.isInteger(listeners) || listeners < 100000) {
    score = 3; why = mode === 'regional'
      ? '正規廠牌，該語言圈的作品在該圈以外幾乎無人知'
      : '正規廠牌但當年商業失敗或發行有限';
  } else if (listeners < 500000) {
    score = 2; why = '正規廠牌正常流通，有國際發行或該語言圈的主流流通';
  } else {
    score = 1; why = '入門名單常客';
  }

  // §0.8 的機器抽查：報警不評分。兩種形態都可能是資料本身有問題。
  const alerts = [];
  if (score === 5 && Number.isInteger(listeners) && listeners > 20000) alerts.push(`人工 5 但 listeners=${listeners}（常是再發後的串流流量）`);
  if (score <= 2 && Number.isInteger(listeners) && listeners < 3000) alerts.push(`人工 ${score} 但 listeners=${listeners}（常是 worker 查到別的實體）`);

  rows.push({
    key: k, artist: c.artist, album: c.album,
    machine: rt.obscurity, anchor: score, listeners,
    signals: { private: isPrivate, reissued, onApple },
    note: `§0.8 ${mode === 'regional' ? 'regional' : 'depth'} 錨點：${why}。機器值 ${rt.obscurity}（listeners=${listeners === null ? '查無' : listeners}）僅供對照。`,
    alerts,
  });
}

fs.writeFileSync(`${dir}/obscurity-anchor.json`, JSON.stringify(rows, null, 1));
const dist = {}; for (const r of rows) dist[r.anchor] = (dist[r.anchor] || 0) + 1;
const md = {}; for (const r of rows) md[r.machine] = (md[r.machine] || 0) + 1;
const moved = rows.filter(r => r.machine !== r.anchor).length;
console.log(`${batch}（${mode}）｜${rows.length} 張｜錨點分佈 ${JSON.stringify(dist)}｜機器分佈 ${JSON.stringify(md)}｜改動 ${moved}`);
const al = rows.filter(r => r.alerts.length);
if (al.length) {
  console.log(`  ⚠ 抽查報警 ${al.length} 張：`);
  for (const r of al.slice(0, 12)) console.log(`    ${r.artist}《${r.album}》 ${r.alerts.join('；')}`);
}
if (WRITE) {
  for (const r of rows) {
    const rt = ratings[r.key];
    rt.obscurity = r.anchor;
    rt.source = mode === 'regional' ? 'manual:regional-rubric' : 'manual:depth-rubric';
    rt.obscurityNote = r.note;
  }
  fs.writeFileSync(`${dir}/ratings.json`, JSON.stringify(ratings, null, 1));
  console.log('  → 已寫回 ratings.json');
}
