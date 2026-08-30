// c-48／c-49 雲端段共用函式庫。路徑一律 repo 相對（雲端 clone 沒有本機絕對路徑）。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// 摺連字號＋NFKC＋去重音＋小寫。與 pool-keys.mjs／c-47 chk-cand 同一套，跨批次可比。
export const fold = s => String(s || '').replace(/[‐-―－]/g, '-').normalize('NFKD')
  .replace(/[̀-ͯ]/g, '').normalize('NFKC').toLowerCase();
export const key = s => fold(s).replace(/[^\p{L}\p{N}]+/gu, '');

export function loadPool() {
  // 2026-08-30 起單一卡池檔：每列第 9 欄有 tier 的就是王牌（合併前王牌另存 apex_pool.json）
  const seed = JSON.parse(fs.readFileSync(path.join(ROOT, 'seed_cards.json'), 'utf8'));
  const rows = seed.map(r => ({ artist: r[0], album: r[1], where: r[8] ? `apex:${r[8]}` : 'seed', year: r[6] }));
  // 未上架 manifest 也要納入去重範圍（c-47 的 171 張還卡在 Firestore 配額沒進池）
  const manifestRows = [];
  for (const f of fs.readdirSync(ROOT).filter(f => /^onboarding-manifest-.*\.json$/.test(f))) {
    try {
      const j = JSON.parse(fs.readFileSync(path.join(ROOT, f), 'utf8'));
      for (const a of j.albums || []) manifestRows.push({ artist: a.artist, album: a.album, where: `manifest:${f}`, year: null });
    } catch { /* 略過壞檔 */ }
  }
  // c-47 的 171 張已定稿但卡在 Firestore 配額、未進池也未產 manifest，
  // 只存在於 batch-progress/c47/cand-all.json。不納入就會跟 c-48／c-49 撞卡。
  const pendingRows = [];
  const c47 = path.join(ROOT, 'batch-progress/c47/cand-all.json');
  if (fs.existsSync(c47)) {
    for (const a of JSON.parse(fs.readFileSync(c47, 'utf8'))) {
      pendingRows.push({ artist: a.artist, album: a.album, where: 'pending:c47', year: a.suggestedYear });
    }
  }
  return { rows, manifestRows, pendingRows, all: [...rows, ...manifestRows, ...pendingRows] };
}

export const poolKeySet = all => new Set(all.map(r => key(r.artist) + '|' + key(r.album)));
