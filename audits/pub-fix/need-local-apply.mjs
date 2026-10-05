// audits/pub-fix/need-local.json 的兩則：雲端沒有上線全文、只給了建議改法，本機照建議做最小改動。
// 用法：node audits/pub-fix/need-local-apply.mjs [--emit]
// （audit 把《Here 'Tis》記在 Grant Green 名下，卡片其實掛 Lou Donaldson；Casanova 的卡名是義大利文全名。）
import fs from 'node:fs';
const ACC = '3a23f905e8f31d91c85050f2ed304321', NS = '5f65e74b17d644b68a3f542b08a5c105';
const D = 'publish-stage/pub-fix-20261004';
const JOBS = [
  { key: "desc2:lou donaldson|here 'tis",
    find: '把 Grant Green 從東聖路易拉到紐約的正是這張碟的領班，五天後 Green 錄了自己的碟。',
    to: '1959 年在 St. Louis 發掘 Grant Green、把他引到紐約的正是這張碟的領班，這場錄音五天後 Green 錄了自己的碟。' },
  { key: 'desc2:nino rota|il casanova di federico fellini',
    find: 'Rota 生前最後一部 Fellini 長片的音樂，',
    to: 'Rota 替 Fellini 晚期這部長片寫的音樂，' },
];
const j = await (await fetch(`https://api.cloudflare.com/client/v4/accounts/${ACC}/storage/kv/namespaces/${NS}/bulk/get`, {
  method: 'POST', headers: { Authorization: 'Bearer ' + process.env.CLOUDFLARE_API_TOKEN, 'Content-Type': 'application/json' },
  body: JSON.stringify({ keys: JOBS.map(x => x.key) }),
})).json();
const puts = [], rec = [];
for (const job of JOBS) {
  const raw = j.result.values[job.key]; const o = JSON.parse(raw);
  if (o.desc.includes(job.to)) { console.log('已是新稿 ' + job.key); continue; }
  if (o.desc.split(job.find).length !== 2) { console.log('✗ 找不到原句（或不只一處） ' + job.key); process.exitCode = 1; continue; }
  const value = JSON.stringify({ ...o, desc: o.desc.replace(job.find, () => job.to) });
  puts.push({ key: job.key, value }); rec.push({ key: job.key, kinds: ['need-local'], oldValue: raw, newValue: value });
  console.log('▸ ' + job.key + '\n  ' + JSON.parse(value).desc + '\n  字數 ' + [...JSON.parse(value).desc].length);
}
if (process.argv.includes('--emit') && puts.length) {
  fs.writeFileSync(`${D}/kv-need-local-puts.json`, JSON.stringify(puts));
  fs.writeFileSync(`${D}/applied-need-local.json`, JSON.stringify(rec, null, 1));
  console.log(`已寫出 ${puts.length} 筆`);
}
