// 研究版批次自動 QA：字數／禁語／開頭／格式＋零編造比對——
// 改寫版的〈曲名〉、西文專名、年份必須全部存在於「事實表 blob」（facts+sound+keyTracks+hook+note+artist+album）
// 用法：node qa-check-research.mjs <writer-input.json> <batch-out.json>
import fs from 'node:fs';

const [inFile, outFile] = process.argv.slice(2);
if (!inFile || !outFile) { console.error('用法: node qa-check-research.mjs <writer-input.json> <batch-out.json>'); process.exit(1); }
const inputs = new Map(JSON.parse(fs.readFileSync(inFile, 'utf-8')).map(x => [x.key, x]));
const rows = JSON.parse(fs.readFileSync(outFile, 'utf-8'));
const norm = s => String(s || '').toLowerCase().replace(/[^a-z0-9㐀-鿿぀-ヿ]/g, '');
const BANNED = /融合多種元素|具有代表性|層次豐富|傑作|必聽|里程碑|獨樹一格|(?<![迷你])你(?!的)/;

let issues = 0;
for (const r of rows) {
  const e = [];
  const src = inputs.get(r.key);
  if (!src) { console.log('⚠ 找不到輸入資料：', r.key); issues++; continue; }
  const n = Array.from(r.desc || '').length;
  if (n < 80 || n > 280) e.push('字數' + n);
  // 《》與〈〉內是原始標題，禁語只約束自己的行文、不約束專名。
  // 舊版只剝《》漏了〈〉，而本專案的**曲名一律用〈〉**——華語批的曲名極常帶「你」
  // （〈我只在乎你〉〈讀你〉），每批都會誤報一輪。禁「你」擋的是第二人稱稱呼讀者，
  // 不是標題用字。
  const proseR = String(r.desc).replace(/《[^》]*》/g, '').replace(/〈[^〉]*〉/g, '');
  if (BANNED.test(proseR)) e.push('禁語:' + (proseR.match(BANNED) || [''])[0]);
  if (/^這張專輯/.test(r.desc)) e.push('「這張專輯」開頭');
  // hook 前綴比對：忽略半形空格差異（審稿層的中英空格補丁不算改動 hook）
  const stripSp = s => String(s || '').replace(/ /g, '');
  if (!stripSp(r.desc).startsWith(stripSp(src.hook))) e.push('hook 未原封開頭');
  // 《》內是原始專輯名，可含 * ? ! 等符號（例：《Live ?!*@ Like a Suicide》），排除後再檢查
  if (/[\n*`]|&amp;/.test(String(r.desc).replace(/《[^》]*》/g, ''))) e.push('格式(換行/markdown/entity)');
  if (/([㐀-鿿぀-ヿ가-힯][,;])|([,;][㐀-鿿぀-ヿ가-힯])/.test(r.desc)) e.push('半形標點貼中文');
  let blobRaw = [src.artist, src.album, src.hook, src.note, src.sound, ...(src.facts || []), ...(src.keyTracks || []), src.researchNotes || ''].join(' ');
  // 研究稿常混用中文數字年份（一九八六年），轉阿拉伯數字併入 blob 再比對，避免誤報
  const CN = { 〇: '0', 零: '0', 一: '1', 二: '2', 三: '3', 四: '4', 五: '5', 六: '6', 七: '7', 八: '8', 九: '9' };
  blobRaw += ' ' + blobRaw.replace(/[一二][〇零一二三四五六七八九]{3}/g, m => [...m].map(c => CN[c]).join(''));
  // 綽號夾在名與姓中間是常見寫法（Lee "Scratch" Perry、Stevie Ray Vaughan 那類），
  // 而正文用短形式（Lee Perry）完全正當。檢查器比對的是連續字串，事實表裡的
  // leescratchperry 不含 leeperry，於是把正當簡寫報成編造專名。
  // 2026-08-31 c51a 實踩。把去掉引號綽號的版本一併併入 blob。
  blobRaw += ' ' + blobRaw.replace(/\s*[「"'"'"'][^」"'"'"']{1,20}[」"'"'"']\s*/g, ' ');
  const blob = norm(blobRaw);
  for (const m of (r.desc || '').matchAll(/〈([^〉]+)〉/g)) if (!blob.includes(norm(m[1]))) e.push('編造曲名?〈' + m[1] + '〉');
  const names = new Set([...(r.desc || '').matchAll(/[A-Z][a-zA-Z.'"]+(?: [A-Z][a-zA-Z.'"&]+)*/g)].map(x => x[0]).filter(x => x.length > 5));
  for (const nm of names) if (!blob.includes(norm(nm))) e.push('編造專名?' + nm);
  for (const y of (r.desc || '').matchAll(/(19|20)\d{2}/g)) if (!blobRaw.includes(y[0])) e.push('編造年份?' + y[0]);
  // 輸出檔只有 key 與 desc 兩個欄位，r.artist／r.album 永遠是 undefined，
  // 標記會印成「undefined - undefined」而指認不出是哪張卡，複核時得逐張翻檔案。
  // 改用輸入檔（研究稿）的掛名，取不到再退回從 key 解析。
  if (e.length) {
    issues++;
    const [ka, kb] = String(r.key || '').replace(/^desc[24]:/, '').split('|');
    console.log('⚠', src.artist || ka || '?', '-', src.album || kb || '?', '→', e.join(' | '));
  }
}
console.log('QA 完成｜', rows.length, '張｜標記', issues);
process.exit(issues ? 1 : 0);
