// 逐張審稿前的機械掃描：把 SKILL 列出的高頻錯誤型態先撈出來，人工只讀命中的卡。
// 機器驗不出「來源對不對」，所以這支不取代逐張人工審稿，只是縮小要細看的範圍。
//
// 用法：node batch-progress/review-scan.mjs c48a c48b …   （不給就掃全部 c48/c49/c50）
import fs from 'node:fs';

const OUT = 'C:/Users/User/dip-vinyl-home/dip-vinyl-shop/desc-tools/batches/output';
const subs = process.argv.slice(2).length ? process.argv.slice(2)
  : ['c48a', 'c48b', 'c48c', 'c49a', 'c49b', 'c50a', 'c50b', 'c50c'];

const RULES = [
  // 1. 榜單年代錯置：Billboard Hot 100 是 1958 年 8 月才創設（已重演兩次）
  { id: 'hot100', re: /Hot\s*100/i, why: 'Billboard Hot 100 一九五八年八月才創設，早於此的單曲不得掛此榜' },
  // 3b. 校對痕跡漏進正文：特注的否定句被原樣寫進 desc
  { id: '校對痕跡', re: /卡池|查無來源|無從查證|並非|而非[^，。]*的重發|兩者是完全不同|標為\d{4}年|以查證/, why: '校對指示疑似寫進正文' },
  // 5. 音樂人名的中文音譯（人名一律拉丁原文）——只抓「常見譯名用字」組合，避免誤報
  { id: '人名音譯', re: /巴布·狄倫|披頭四|滾石樂團|貓王|麥可·傑克森|大衛·鮑伊|路易斯·阿姆斯壯|邁爾士·戴維斯|約翰·柯川|比莉·哈樂黛/, why: '音樂人名應留拉丁原文' },
  // 榜單名次的中文數字殘留（應為阿拉伯數字）
  { id: '中文名次', re: /第[一二三四五六七八九十]+名/, why: '榜單名次應用阿拉伯數字' },
  // 6. 超譯的最高級（禁語表之外，仍要人工看有無來源）
  { id: '最高級', re: /史上首度|前所未見|空前絕後|無人能及|最偉大的/, why: '最高級宣稱要有來源' },
  // 千分位逗號（c50 抓過整組寫成「281,948 張」）
  { id: '千分位', re: /\d{1,3},\d{3}/, why: '數字不用千分位逗號' },
  // 逐字引歌詞（題材無禁區的三限制之一）
  { id: '疑似引歌詞', re: /[「『][^」』]{6,}[」』]/, why: '長引號內容需確認不是逐字歌詞' },
];

let total = 0;
const hits = [];
for (const sub of subs) {
  for (let n = 1; n <= 5; n++) {
    const f = `${OUT}/${sub}-out-${n}.json`;
    if (!fs.existsSync(f)) continue;
    const j = JSON.parse(fs.readFileSync(f, 'utf8'));
    const arr = Array.isArray(j) ? j : (j.cards || Object.values(j).find(Array.isArray) || []);
    for (const c of arr) {
      total++;
      const d = c.desc || c.description || '';
      for (const r of RULES) {
        const m = d.match(r.re);
        if (!m) continue;
        const i = d.indexOf(m[0]);
        hits.push({ sub, key: c.key, rule: r.id, why: r.why, snippet: d.slice(Math.max(0, i - 30), i + 45) });
      }
    }
  }
}
const byRule = {};
for (const h of hits) (byRule[h.rule] ||= []).push(h);
console.log(`掃了 ${total} 張，命中 ${hits.length} 處`);
for (const [rule, list] of Object.entries(byRule)) {
  console.log(`\n### ${rule}（${list.length}）— ${list[0].why}`);
  for (const h of list) console.log(`  ${h.key}\n     …${h.snippet}…`);
}
