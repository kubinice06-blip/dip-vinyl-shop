import fs from 'node:fs';
const rg   = JSON.parse(fs.readFileSync('batch-progress/c122/rg-probe.json','utf8'));
const cl   = JSON.parse(fs.readFileSync('batch-progress/c122/caa-label.json','utf8'));
const ap   = JSON.parse(fs.readFileSync('batch-progress/c122/apple.json','utf8'));
const artp = JSON.parse(fs.readFileSync('batch-progress/c122/artist-probe.json','utf8'));
const MB='https://musicbrainz.org';

const relLine = r => `${r.date||'無日期'} ${r.country||'無國別'} ${r.status||'status 未填'} ${r.media}`;
function appleTxt(id){
  const a=ap[id]||{}; const hit=Object.entries(a).find(([k,v])=>!v.miss);
  if(!hit) return `Apple：us／gb／de 三店以「掛名＋盤名」搜尋皆未命中（us 回 ${a.us&&a.us.n||0} 筆、gb ${a.gb&&a.gb.n||0} 筆、de ${a.de&&a.de.n||0} 筆，無一筆掛名與盤名同時對得上）。`;
  return `Apple：${hit[0]} 店命中 collectionId ${hit[1].id}（Apple 標題「${hit[1].name}」、Apple 年份 ${hit[1].year}），非 cleaned 版；配對一律用 collectionId、不得用盤名字串。`;
}
function nameTxt(aid){
  const a=artp[aid]; if(!a) return '';
  return `掛名回問（裁定 179／250）：MB artist 搜尋「${a.name}」回 ${a.hits} 個同名實體，所釘的 ${aid.slice(0,8)} 排第 ${a.rank}、score ${a.score}，disambiguation「${a.dis||'（空白）'}」。`;
}
function build(rows,g){
  const out=rows.map(r=>{
    const v=rg[r.rg], c=cl[r.rg];
    const relsTxt=v.releases.map(relLine).join('／');
    const base = `${nameTxt(r.aid)} 年份：MB first-release-date ${v.firstRelease||'未填'}，year 取 ${r.year}（裁定 220：再發年不得蓋掉原盤年）。轄下 release ${v.releases.length} 筆：${relsTxt}（裁定 251：軌數隨載體變動，label 欄已寫明所釘的是哪一版）。封面 CAA release-group/${r.rg.slice(0,8)}/front 實測回 ${c.caa}。${appleTxt(r.rg)}`;
    const card={
      releaseType:r.rt,
      genreException:r.rt==='Album'?'':'hardcore-7inch',
      exceptionReason:r.rt==='Album'?'':r.ex,
      exceptionEvidenceUrls:r.rt==='Album'?[]:r.ev,
      selfTitled:!!r.self,
      queryAlias:r.alias,
      reissuedBy:r.reissue||'',
      g,
      artist:r.artist, album:r.album, year:r.year,
      genres:['rock'],
      label:r.label,
      why:r.why,
      risk:`撞卡：實掃 seed_cards.json 全 14,424 列，${r.pool} ${base} ${r.risk||''}`.replace(/\s+/g,' ').trim(),
      mbNote:r.mb
    };
    return card;
  });
  fs.writeFileSync(`batch-progress/c122/prop-${g}.json`, JSON.stringify(out,null,1));
  console.log(`prop-${g}.json 寫入 ${out.length} 張`);
}
export { build, MB };
