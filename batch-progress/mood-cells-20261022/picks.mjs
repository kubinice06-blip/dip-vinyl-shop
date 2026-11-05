// 情緒薄格策展線（md／mc／ml）：試聽裁定 → batch-progress/<批>/preview-picks.json。
// 預設取 meta.json 的最佳 Apple 候選（曲目命中 ≥70% 且 ≥3 首）；preview-override.json 可逐張改：
//   { "<key>": ["jp", "<collectionId>", <軌序(依碟序軌序排序後的第幾首)>, "備註"] } 或 { "<key>": { "none": "理由" } }
//   node batch-progress/mood-cells-20261022/picks.mjs add-20261020-ts1
import fs from 'node:fs';
const batch = process.argv[2], D = `batch-progress/${batch}/`;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const cards = JSON.parse(fs.readFileSync(`desc-tools/batches/cards/${batch}-cards.json`, 'utf8'));
const meta = JSON.parse(fs.readFileSync(D + 'meta.json', 'utf8'));
const ov = fs.existsSync(D + 'preview-override.json') ? JSON.parse(fs.readFileSync(D + 'preview-override.json', 'utf8')) : {};
const picks = {}, used = new Map();
for (const c of cards) {
  const m = meta[c.key], o = ov[c.key];
  let spec = null, note = '';
  if (o?.none) { picks[c.key] = { status: 'unavailable', note: o.none }; continue; }
  if (Array.isArray(o)) { spec = o; note = o[3]; }
  else {
    const b = m.apple?.[0];
    if (b && b.hit >= Math.max(3, Math.ceil(b.want * 0.7))) { spec = [b.cc, b.id, 1, `曲目 ${b.hit}/${b.want} 對上 MB 原盤（Apple 共 ${b.count} 軌）`]; note = spec[3]; }
  }
  if (!spec) { picks[c.key] = { status: 'unavailable', note: `Apple jp／us 以藝人＋盤名搜尋，無曲目對得上 MB 原盤的條目（最佳候選：${m.apple?.[0] ? `${m.apple[0].artist}《${m.apple[0].name}》${m.apple[0].hit}/${m.apple[0].want}` : '無'}）。` }; continue; }
  const [cc, id, tn] = spec;
  await sleep(1500);
  const l = await (await fetch(`https://itunes.apple.com/lookup?id=${id}&entity=song&country=${cc}`)).json();
  const col = l.results.find(x => x.wrapperType === 'collection');
  const t = l.results.filter(x => x.wrapperType === 'track').sort((a, b) => (a.discNumber - b.discNumber) || (a.trackNumber - b.trackNumber))[tn - 1];
  if (!t?.previewUrl) { picks[c.key] = { status: 'unavailable', note: `Apple ${cc} ${id} 第 ${tn} 軌無試聽檔。` }; continue; }
  const r = await fetch(t.previewUrl, { headers: { Range: 'bytes=0-1023' } });
  if (used.has(id)) console.log('⚠ collectionId 重複', id, used.get(id), c.key);
  used.set(id, c.key);
  picks[c.key] = { status: 'ready', c: cc, id, url: t.previewUrl, http: r.status, expl: col.collectionExplicitness,
    note: `Apple ${cc} ${id}「${col.artistName}《${col.collectionName}》」：${note}，取第 ${tn} 軌〈${t.trackName}〉。主線 ${new Date().toISOString().slice(0, 10)} lookup 核對、試聽檔 HTTP ${r.status}。` };
  console.log(r.status, col.collectionExplicitness, c.artist, '《' + c.album + '》', '→', col.collectionName, '/', t.trackName);
}
fs.writeFileSync(D + 'preview-picks.json', JSON.stringify(picks, null, 1));
const cnt = Object.values(picks).reduce((a, p) => (a[p.status] = (a[p.status] || 0) + 1, a), {});
console.log(JSON.stringify(cnt));
