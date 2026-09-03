import fs from 'fs';
const UA = { 'User-Agent': 'dip-vinyl-shop/1.0 (kubinice06@gmail.com)' };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const cand = JSON.parse(fs.readFileSync('batch-progress/c52/cand.json','utf8'));

// 1972 印尼／馬來語拼寫改革：舊拼法 ↔ 新拼法。馬來西亞同年做了對應的改革。
// 兩個方向都要試：卡片用新拼法、MB 可能建成舊拼法（原盤封面），反之亦然。
const OLD2NEW = [[/oe/gi,'u'],[/dj/gi,'j'],[/tj/gi,'c'],[/nj/gi,'ny'],[/sj/gi,'sy'],[/ch/gi,'kh']];
const NEW2OLD = [[/\bj/gi,'dj'],[/c/gi,'tj'],[/ny/gi,'nj'],[/sy/gi,'sj']];
const applyAll = (s, rules) => rules.reduce((x,[re,to]) => x.replace(re,to), s);

const variants = s => {
  const v = new Set([s, applyAll(s, OLD2NEW), applyAll(s, NEW2OLD)]);
  v.add(s.replace(/-/g,' ').replace(/\s+/g,' ').trim());     // Angan-Angan → Angan Angan
  v.add(s.replace(/\s+/g,'-'));
  v.add(s.replace(/^(Vol(ume)?\.?)\s*(\d+)/i, 'Vol. $3'));   // Volume 4 → Vol. 4
  v.add(s.replace(/^(Vol(ume)?\.?)\s*(\d+)/i, 'Volume $3'));
  return [...v].filter(Boolean);
};

const MBID = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/g;
const q = async (path) => {
  for (let i = 0; i < 3; i++) {
    try {
      const r = await fetch('https://musicbrainz.org/ws/2/' + path, { headers: UA, signal: AbortSignal.timeout(25000) });
      if (r.status === 503) { await sleep(3000); continue; }
      if (!r.ok) return { _http: r.status };
      return await r.json();
    } catch (e) { await sleep(1500); }
  }
  return { _err: 'fail' };
};

const norm = s => s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]/g,'');
const out = [];
for (const c of cand) {
  // mbNote 裡若已記下 MBID，先採信但仍回問確認
  const noted = (c.mbNote || '').match(MBID) || [];
  const rec = { artist: c.artist, album: c.album, year: c.year, g: c.g,
                releaseType: c.releaseType, notedMbids: noted, hits: [] };

  const titles = variants(c.album);
  const artists = variants(c.artist);
  const seen = new Set();
  outer:
  for (const a of artists) for (const t of titles) {
    const key = norm(a) + '|' + norm(t);
    if (seen.has(key)) continue; seen.add(key);
    const query = `release-group?query=${encodeURIComponent(`artist:"${a}" AND releasegroup:"${t}"`)}&fmt=json&limit=8`;
    const j = await q(query); await sleep(1100);
    for (const rg of (j['release-groups'] || [])) {
      if (rg.score < 70) continue;
      const credit = (rg['artist-credit'] || []).map(x => x.name).join(' ');
      rec.hits.push({ id: rg.id, title: rg.title, credit,
                      type: rg['primary-type'], sec: rg['secondary-types'] || [],
                      date: rg['first-release-date'] || '', score: rg.score, via: `${a} / ${t}` });
      if (rec.hits.length >= 12) break outer;
    }
  }
  // 去重
  const byId = {}; for (const h of rec.hits) byId[h.id] = byId[h.id] || h;
  rec.hits = Object.values(byId);
  out.push(rec);
  console.log(`${c.artist} 《${c.album}》 → noted:${noted.length} hits:${rec.hits.length}`);
}
fs.writeFileSync('batch-progress/c52/requery-out.json', JSON.stringify(out, null, 1));
console.log('\n有命中的:', out.filter(r => r.hits.length).length, '／', out.length);
