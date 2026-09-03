import fs from 'node:fs';
const id = JSON.parse(fs.readFileSync('batch-progress/c52/identity.json', 'utf8'));
const caa = JSON.parse(fs.readFileSync('batch-progress/c52/caa.json', 'utf8'));
const adj = JSON.parse(fs.readFileSync('batch-progress/c52/covers-adjudicated.json', 'utf8'));
const caaBy = new Map(caa.map(r => [r.artist + '|' + r.album, r]));
const adjBy = new Map(adj.map(r => [r.artist + '|' + r.album, r]));

// desc4 是 CJK 卡的鍵；本批藝人名沒有漢字／假名／諺文，全部 desc2。
const isCJK = s => /[぀-ヿ㐀-鿿가-힯]/.test(s);
let total = 0;
const cards = [];
for (const g of ['a', 'b', 'c']) {
  const rows = JSON.parse(fs.readFileSync(`batch-progress/c52/group-${g}.json`, 'utf8'));
  for (const r of rows) {
    const k = r.artist + '|' + r.album;
    const prefix = (isCJK(r.artist) || isCJK(r.album)) ? 'desc4' : 'desc2';
    const cov = caaBy.get(k)?.art || (adjBy.get(k)?.verdict === 'accept' ? adjBy.get(k).cover : null);
    cards.push({
      key: `${prefix}:${r.artist}|${r.album}`,
      artist: r.artist, album: r.album, year: r.year,
      genre: (r.genres || [])[0] || '', genres: r.genres || [], label: '',
      rgMbid: r.rgMbid || '', identitySource: r.identitySource,
      mbTitle: r.rgTitle || '', mbFirstRelease: r.rgDate || '',
      curatorWhy: r.why || '', curatorRisk: r.risk || '', mbNote: r.mbNote || '',
      releaseType: r.releaseType, exceptionReason: r.exceptionReason || '',
      exceptionEvidenceUrls: r.exceptionEvidenceUrls || [],
      selfTitled: !!r.selfTitled, apex: null,
      group: g, yearFlag: r.yearFlag || '',
      cover: cov ? { url: cov.url, source: cov.source } : null,
    });
    total++;
  }
}
fs.writeFileSync('desc-tools/batches/cards/c52-cards.json', JSON.stringify(cards, null, 1));
console.log('c52-cards.json 寫出', total, '張');
console.log('  釘住身分', cards.filter(c => c.rgMbid).length, '｜人工身分', cards.filter(c => !c.rgMbid).length);
console.log('  有封面', cards.filter(c => c.cover).length, '｜合輯', cards.filter(c => c.releaseType === 'Compilation').length);
const dup = cards.map(c => c.key).filter((k, i, a) => a.indexOf(k) !== i);
if (dup.length) throw new Error('重複鍵：' + dup.join(', '));
console.log('  重複鍵 0 ✓');
