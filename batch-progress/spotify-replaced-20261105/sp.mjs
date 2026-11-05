import fs from 'node:fs';
const F = 'batch-progress/spotify-replaced-20261105/replaced.json';
const rows = JSON.parse(fs.readFileSync(F, 'utf8'));
// 主線逐張判定為「同一張、只差寫法或版本後綴」者（理由見 rulings.md）
const ACCEPT = ['Duke Ellington|Masterpieces by Ellington', 'Ella Fitzgerald|Mack the Knife: Ella in Berlin', 'James Brown|Sex Machine',
  'Mikey Dread|African Anthem: The Mikey Dread Show Dubwise', 'Ohbliv|Rugged Tranquility', 'Robert Glasper|Covered', 'S.E.S.|S.E.S.',
  'Stephen Sondheim|Sweeney Todd: The Demon Barber of Fleet Street', 'Triana|El patio', '大滝詠一|NIAGARA MOON', 'Hang Raiji|Hang Raiji'];
const tok = (await (await fetch('https://dip-vinyl-worker.kubinice06.workers.dev/spotify-token')).json()).access_token;
const norm = s => String(s || '').toLowerCase().replace(/[^a-z0-9぀-ヿ㐀-鿿]/g, '');
for (const r of rows) {
  if (!ACCEPT.includes(`${r.artist}|${r.album}`) || r.sp) continue;
  const q = encodeURIComponent(`${r.replaced} ${r.artist}`.slice(0, 200));
  const res = await fetch(`https://api.spotify.com/v1/search?q=${q}&type=album&limit=10&market=TW`, { headers: { Authorization: 'Bearer ' + tok } });
  if (res.status === 429) { console.log('429 stop'); break; }
  const items = (await res.json()).albums?.items || [];
  const hit = items.find(it => it.name === r.replaced) || items.find(it => norm(it.name) === norm(r.replaced));
  r.sp = hit?.external_urls?.spotify || '';
  r.spArtist = hit ? hit.artists.map(a => a.name).join(', ') : '';
  console.log(`${r.artist} — ${r.album} → ${hit ? hit.name + ' / ' + r.spArtist + ' / ' + hit.release_date + ' ' + r.sp : '查無'}`);
  await new Promise(s => setTimeout(s, 1200));
}
fs.writeFileSync(F, JSON.stringify(rows, null, 1));
