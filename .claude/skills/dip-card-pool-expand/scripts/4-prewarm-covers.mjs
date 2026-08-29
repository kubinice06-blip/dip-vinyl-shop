// 步驟 5：封面預熱 —— 把封面直接 PATCH 進 Firestore card_catalog
// 用法：node 4-prewarm-covers.mjs <步驟3的輸出檔> [--dry]
//
// 為什麼一定要做這步：前台／對戰的封面查找順序是「card_catalog → worker /spotify-search」，
// 而這批卡多半在 Spotify 查無（正是靠 Bandcamp／CAA 才找到封面的）。
// 不預熱的話，卡片第一次被抽到會顯示空白♪，而且永遠補不回來。
import fs from 'fs';

const PROJECT_ID = 'price-manager-e8846';
const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/card_catalog`;

const inPath = process.argv[2];
const dry = process.argv.includes('--dry');
if (!inPath) { console.error('用法: node 4-prewarm-covers.mjs <步驟3輸出檔> [--dry]'); process.exit(1); }
const cards = JSON.parse(fs.readFileSync(inPath, 'utf-8'));

// 文件 id 必須與 admin.html 的 ovCardId() 完全一致，否則會另開一份孤兒文件
const cardId = (a, b) => ((a || '') + '|' + (b || '')).toLowerCase().replace(/\//g, '-').trim();
const rarityOf = (c, o, a) => { const s = c + a + (o >= 5 ? 1 : 0); return s >= 10 ? 'legendary' : s >= 8 ? 'epic' : s >= 6 ? 'uncommon' : s >= 4 ? 'rare' : 'common'; };

let ok = 0, fail = 0;
for (const c of cards) {
  const id = cardId(c.artist, c.album);
  const fields = {
    cardId: { stringValue: id },
    artist: { stringValue: c.artist },
    album: { stringValue: c.album },
    coverUrl: { stringValue: c.coverUrl },
    classic: { integerValue: String(c.classic) },
    obscurity: { integerValue: String(c.obscurity) },
    accessibility: { integerValue: String(c.accessibility) },
    rarity: { stringValue: rarityOf(c.classic, c.obscurity, c.accessibility) },
    seed: { booleanValue: true },
    updatedAt: { integerValue: '1' },   // 新卡沉底，不洗掉玩家抽過的卡在「卡牌校正」的排序
  };
  // 外部識別（2026-07-24 起）：MBID／UPC 寫進 card_catalog，不進 apple-audio runtime 地圖。
  // 只在有值時加入 updateMask，缺 UPC 的卡不會把欄位覆蓋成空。
  if (c.rgMbid) fields.rgMbid = { stringValue: c.rgMbid };
  if (c.upc) fields.upc = { stringValue: c.upc };
  // updateMask：只動這幾個欄位，不覆蓋既有的 desc／apex／tier
  const mask = Object.keys(fields).map(f => `updateMask.fieldPaths=${f}`).join('&');
  const url = `${BASE}/${encodeURIComponent(id)}?${mask}`;
  if (dry) { console.log(`[dry] PATCH ${id}`); ok++; continue; }
  try {
    const r = await fetch(url, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ fields }) });
    if (r.ok) { ok++; console.log(`✓ ${id}`); }
    else { fail++; console.log(`✗ ${id} HTTP ${r.status} ${(await r.text()).slice(0, 160)}`); }
  } catch (e) { fail++; console.log(`✗ ${id} ${e.message}`); }
}
console.log(`\n完成：成功 ${ok}、失敗 ${fail}${dry ? '（乾跑，未實際寫入）' : ''}`);
