// 落實 c-57 研究層的更正。冪等，且對不上鍵就停手回報。
import fs from 'node:fs';

// ── 一、年份：兩筆證據最硬的 ──
const YEARS = [
  { key: 'The Heptones|Party Time', from: 1976, to: 1977,
    why: 'Discogs 沒有任何 1976 年的 LP，英文維基兩處都寫 1977；MB 的 1976 很可能是把七吋單曲的年份記到了專輯上。' },
  { key: 'Ken Boothe|Mr. Rock Steady', from: 1968, to: 1967,
    why: 'Discogs 的英國與牙買加原盤與英文維基一致記 1967。' },
];
// ── 二、廠牌：四筆可證明是錯的 ──
const LABELS = [
  { key: 'Various Artists|Nice Up the Dance: Studio One Discomixes', from: 'Soul Jazz', to: 'Heartbeat Records',
    why: 'Soul Jazz 的《Nice Up The Dance》是 2003 年另一張碟。' },
  { key: 'The Revolutionaries|Vital Dub: Well Charged', from: 'Virgin Front Line', to: 'Virgin',
    why: 'Front Line 1978 年才成立，1976 年不存在，其廠牌目錄也沒有這張。' },
  { key: 'Mikey Dread|African Anthem: The Mikey Dread Show Dubwise', from: 'Dread at the Controls', to: 'Cruise Records',
    why: 'Dread at the Controls 的壓片是 1980 年。' },
  { key: 'Josey Wales|The Outlaw Josey Wales', from: 'Volcano', to: '',
    why: 'Discogs 上 1983 年只有 Greensleeves 與 Arrival，沒有 Volcano 壓片；查不到確切廠牌，留空。' },
];
// ── 三、curatorWhy：會直接寫進簡介的事實錯誤 ──
const WHY = [
  { key: 'Desmond Dekker|This Is Desmond Dekker',
    to: 'Desmond Dekker 早期單曲的結集。**注意兩點**：原策展理由說本碟「收錄〈Israelites〉」，**曲目表上沒有這首**（〈Israelites〉在 1969 年另一張《The Israelites》）；另 MusicBrainz 記為 Album，但英文維基把它列在 Dekker 的合輯段（曲目全是先前的單曲），**行文不得寫成錄音室專輯**。' },
  { key: 'Prince Buster|FABulous Greatest Hits',
    to: 'Prince Buster 的代表性結集。**注意：原策展理由列的〈Al Capone〉〈Madness〉〈Judge Dread〉裡，〈Madness〉不在本碟的曲目表上。**' },
  { key: 'Max Romeo|Revelation Time',
    to: '**注意：原策展理由說這是「與 Lee Perry 合作的第一階段成果」，不準**——本碟的執行製作是 Geoffrey Chung，Perry 只掛工程與打擊。' },
  { key: 'Bunny Wailer|Protest',
    to: '**注意：原策展理由說節奏組是 Barrett 兄弟，實際是 Robbie Shakespeare 與 Horsemouth Wallace。**' },
  { key: 'Wailing Souls|Wild Suspense',
    to: '**注意：原策展理由說收錄〈Things and Time〉，那首不在本碟的曲目表上。**' },
  { key: 'Johnny Osbourne|Water Pumping',
    to: '**注意：原策展理由說是「Roots Radics 的較快節奏編制」，實際伴奏是 Sly & Robbie、製作 Prince Jammy。**' },
  { key: 'Yabby You|Deliver Me From My Enemies',
    to: '**注意：原策展理由說他「自居於 Rastafari 運動之外」，那不是來源的意思**——來源只說他信耶穌的神性而非塞拉西。' },
  { key: 'Dillinger|Bionic Dread',
    to: '**注意：原策展理由說是「Perry 與 Dodd 兩邊的底軌拼成」，實際製作人是 Jo Jo Hoo Kim、錄於 Channel One。**' },
  { key: 'Barrington Levy|Bounty Hunter',
    to: '**注意：原策展理由說「Roots Radics 伴奏、Junjo Lawes 製作」，實際製作人是 Hyman Wright、伴奏掛 Channel One All Stars**，而且英文維基明說這批錄音在他認識 Junjo **之前**就完成。' },
];

const FILES = ['batch-progress/c57/prop-a.json', 'desc-tools/batches/cards/c57-cards.json'];
let ny = 0, nl = 0, nw = 0; const miss = [];
for (const p of FILES) {
  const rows = JSON.parse(fs.readFileSync(p, 'utf8'));
  const find = k => rows.filter(r => `${r.artist}|${r.album}` === k);
  for (const f of YEARS) { const h = find(f.key); if (!h.length) { miss.push('year:' + f.key); continue; }
    for (const r of h) { if (r.year !== f.from && r.year !== f.to) throw new Error(`${f.key} 年份是 ${r.year}，既非 ${f.from} 也非 ${f.to}，停手`); if (r.year === f.from) { r.year = f.to; ny++; } } }
  for (const f of LABELS) { const h = find(f.key); if (!h.length) { miss.push('label:' + f.key); continue; }
    for (const r of h) { if ((r.label || '') !== f.from && (r.label || '') !== f.to) throw new Error(`${f.key} 廠牌是「${r.label}」，既非「${f.from}」也非目標值，停手`); if ((r.label || '') === f.from) { r.label = f.to; nl++; } } }
  for (const f of WHY) { const h = find(f.key); if (!h.length) { miss.push('why:' + f.key); continue; }
    for (const r of h) { const fl = 'curatorWhy' in r ? 'curatorWhy' : 'why'; if (r[fl] !== f.to) { r[fl] = f.to; nw++; } } }
  fs.writeFileSync(p, JSON.stringify(rows, null, 1));
}
console.log(`年份 ${ny}｜廠牌 ${nl}｜策展理由 ${nw}` + (miss.length ? `\n查無鍵：${[...new Set(miss)].join('、')}` : ''));
