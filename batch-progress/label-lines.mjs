// 批次類型標示：替每張卡補 lineType（深掘／廣度）與 scene（場景標籤），未來好分類。
// 用法：node batch-progress/label-lines.mjs [--write]
// 2026-09-02 店主指示「記得標示類型 未來好分類」而建。
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib.mjs';

// scene 可以是字串（整批同一個），也可以是 { 組別: 場景 }（一批分幾條線）。
export const LINES = {
  c52: { lineType: '廣度', scene: '東南亞' },
  c53: { lineType: '廣度', scene: { a: '蘇聯末期搖滾', b: '蘇聯吟遊歌謠與 estrada', c: '蘇聯爵士' } },
  c54: { lineType: '廣度', scene: '南斯拉夫地下搖滾' },
  c55: { lineType: '廣度', scene: '土耳其 Anadolu 與阿拉伯世界' },
  c56: { lineType: '廣度', scene: '捷克匈牙利與中東歐地下' },
  c57: { lineType: '廣度', scene: '牙買加' },
  c58: { lineType: '深掘', scene: '靈魂與放克' },
  c59: { lineType: '深掘', scene: '爵士' },
  c60: { lineType: '深掘', scene: { a: '北美私壓搖滾與迷幻', b: '歐日地下搖滾與迷幻' } },
  c61: { lineType: '深掘', scene: { a: '義大利與法國地下 prog', b: '北歐 progg 與荷比澳紐' } },
  // c-62 是單組（一位代理涵蓋 rebetiko／έντεχνο／地下三線），所以 scene 用單一字串。
  c62: { lineType: '廣度', scene: '希臘 rebetiko 與 έντεχνο' },
  c63: { lineType: '深掘', scene: { a: '民謠的冷門硬蕊', b: '藍調的冷門硬蕊' } },
  c64: { lineType: '廣度', scene: '柬埔寨與越南 1960–70s' },
  c65: { lineType: '深掘', scene: { a: '私壓電子與磁帶實驗', b: '圖書館音樂與早期電腦音樂' } },
  c66: { lineType: '廣度', scene: { a: '寶萊塢黃金期與印度流行', b: '印度古典與民俗' } },
  // 2026-09-03 店主指示「繼續策展 20 批次，回到日本、英國、美國等地的深度小眾有趣的專輯，比如 Johnny's Disk 這種廠牌」。
  // c-67～c-86 全是深掘線，以廠牌與場景為單位，日／英／美三地輪替。
  c67: { lineType: '深掘', scene: '日本自主爵士小廠 1975–88' },
  c68: { lineType: '深掘', scene: '英國私壓與小廠 prog／psych 1969–75' },
  c69: { lineType: '深掘', scene: '美國私壓 SSW 與 loner folk 二線 1968–80' },
  c70: { lineType: '深掘', scene: { a: '日本 1979–84 地下 new wave 廠牌（ピナコテカ／テレグラフ／ヴァニティ）', b: '日本 1984–90 indie 廠牌（ナゴム／キャプテン／Wax／Transistor）' } },
  c71: { lineType: '深掘', scene: '英國自主爵士與即興廠牌 1969–85' },
  c72: { lineType: '深掘', scene: '美國耶穌搖滾與 Xian 私壓 1969–80' },
  c73: { lineType: '深掘', scene: '日本 prog 私家版與小廠 1978–90' },
  c74: { lineType: '深掘', scene: '英國 1980s indie pop 微廠' },
  c75: { lineType: '深掘', scene: '美國黑人福音小廠二線 1955–80' },
  c76: { lineType: '深掘', scene: { a: '沖繩民謡與島唄 1960–95', b: '日本環境音樂與ニューエイジ二線 1982–92' } },
  c77: { lineType: '深掘', scene: '英國 DIY post-punk 與卡帶文化 1978–84' },
  c78: { lineType: '深掘', scene: '美國 old-time 與 bluegrass 小廠二線' },
  c79: { lineType: '深掘', scene: '日本 SSW 與 folk 私家版／小廠二線 1971–80' },
  c80: { lineType: '深掘', scene: '英國 neo-prog 自主制作 1980–86' },
  c81: { lineType: '深掘', scene: '美國 1980s 地下廠牌 B 面' },
  c82: { lineType: '深掘', scene: '日本 1990s 地下 techno／ambient 廠牌' },
  c83: { lineType: '深掘', scene: '英國 1990s 微廠二線' },
  c84: { lineType: '深掘', scene: '美國 1990s lo-fi 卡帶與微廠' },
  c85: { lineType: '深掘', scene: { a: '英國 lovers rock 與 UK roots 小廠 1975–88', b: '英國 1990s dub 小廠' } },
  c86: { lineType: '深掘', scene: '美國自主爵士廠牌 1969–82' },
  // 2026-09-04 店主核可開 §1 人工身分路線後新增的補遺批。
  // c-67 收尾時記下：Johnny's Disk 其餘 9 張、Aketa's Disk 5、Nadja 7、Union Jazz 6 在 MB 查無，
  // 走 pinned 補不了。這批專收那些「唱片實體確鑿、MB 沒建檔」的日本自主爵士盤。
  c87: { lineType: '深掘', scene: '日本自主爵士小廠 §1 人工身分補遺' },
};

// 給 make-cards-generic 用：查某批某組的類型標示。
export function lineOf(batch, group) {
  const def = LINES[batch];
  if (!def) return null;
  const scene = typeof def.scene === 'string' ? def.scene : (def.scene[group] || '');
  return scene ? { lineType: def.lineType, scene } : null;
}

// 直接執行才跑回填；被 import 時只提供 LINES 與 lineOf。
const RUN = process.argv[1] && process.argv[1].endsWith('label-lines.mjs');
const write = process.argv.includes('--write');
if (RUN) {
let touched = 0;
for (const [batch, def] of Object.entries(LINES)) {
  const f = path.join(ROOT, `desc-tools/batches/cards/${batch}-cards.json`);
  if (!fs.existsSync(f)) { console.log(`${batch}：查無卡單，略過`); continue; }
  const cards = JSON.parse(fs.readFileSync(f, 'utf8'));
  const seen = {};
  for (const c of cards) {
    const g = c.group || c.g || '';
    const scene = typeof def.scene === 'string' ? def.scene : (def.scene[g] || '');
    if (!scene) throw new Error(`${batch} 的組別 ${g} 沒有對應的 scene`);
    c.lineType = def.lineType;
    c.scene = scene;
    seen[`${def.lineType}／${scene}`] = (seen[`${def.lineType}／${scene}`] || 0) + 1;
  }
  if (write) fs.writeFileSync(f, JSON.stringify(cards, null, 1));
  touched += cards.length;
  console.log(`${batch}：${cards.length} 張｜` + Object.entries(seen).map(([k, n]) => `${k} ${n}`).join('、'));
}
console.log(`\n合計 ${touched} 張${write ? ' 已寫入' : '（試跑，加 --write 才寫入）'}`);
}
