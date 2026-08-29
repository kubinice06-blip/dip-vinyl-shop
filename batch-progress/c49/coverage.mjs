// c-49 開工前覆蓋重驗：稽核是 2026-08-22 做的，c-41 華語低風險批（111 張，08-23）
// 與 c-TW／c-TW2（65 張）都在那之後。先看這些藝人現在池內到底有什麼。
import fs from 'node:fs';
import { loadPool, fold } from '../lib.mjs';

const GROUPS = {
  'D 時代曲與老歌': ['周璇','白光','姚莉','吳鶯音','李香蘭','葛蘭','紫薇','美黛','姚蘇蓉','青山','鳳飛飛','劉文正','費玉清','歐陽菲菲','甄妮','鄧麗君','蔡琴','崔萍','潘秀瓊','張露','逸敏','靜婷','顧媚'],
  'E 台語經典': ['文夏','洪一峰','陳芬蘭','紀露霞','郭金發','劉福助','葉啟田','沈文程','洪榮宏','陳小雲','江蕙','黃乙玲','詹雅雯','蕭煌奇','金門王','李炳輝','豬頭皮','朱約信','陳明章','伍佰','新寶島康樂隊','陳雷','林強','黑名單工作室','龍千玉','西卿'],
  'F 原民與客語': ['郭英男','Difang','桑布伊','Sangpuy','阿爆','Abao','以莉·高露','以莉高露','王宏恩','Biung','昊恩家家','檳榔兄弟','林生祥','交工樂隊','生祥樂隊','黃連煜','羅思容','米莎','Misa','謝宇威','陳永淘','陳建年','紀曉君','巴奈','胡德夫','舒米恩','Suming'],
  'G 華語電影配樂': ['黃霑','顧嘉煇','陳勳奇','胡偉立','史擷詠','李泰祥','范宗沛','雷光夏','盧律銘','林強','陳明章','侯志堅','鮑比達','金培達','梅林茂'],
  'H 台灣獨立剩餘': ['濁水溪公社','骨肉皮','賽璐璐','刺客','1976','董事長','盪在空中','旺福','透明雜誌','深白色','持修','傷心欲絕','農村武裝青年','亂彈','妮波寺','好客樂隊','觀子音樂坑','何欣穗','潑猴','表兒','草莓救星','廢物樂隊','無政府','貓打架','停看聽','阿飛西雅'],
};

const { all } = loadPool();
const out = {};
for (const [g, names] of Object.entries(GROUPS)) {
  out[g] = {};
  console.log(`\n════ ${g} ════`);
  for (const n of names) {
    const fn = fold(n);
    const hits = all.filter(r => fold(r.artist).includes(fn) || fold(r.album).includes(fn));
    out[g][n] = hits;
    console.log(`  ${n}：${hits.length ? hits.length + ' 張' : '★ 0（缺口成立）'}`);
    for (const h of hits) console.log(`      [${h.where}] ${h.artist} — ${h.album}（${h.year ?? '?'}）`);
  }
}
fs.writeFileSync(new URL('./pool-coverage.json', import.meta.url), JSON.stringify(out, null, 1));
const zero = Object.values(out).flatMap(g => Object.entries(g)).filter(([, v]) => !v.length).length;
const tot = Object.values(out).flatMap(g => Object.keys(g)).length;
console.log(`\n合計查 ${tot} 位／團｜池內為 0 者 ${zero}`);
