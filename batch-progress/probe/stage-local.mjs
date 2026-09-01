// 把雲端的探測結果攤成本機管線吃的三份檔（cand-all／covers／previews）。
//
// 雲端把 254 張的封面與試聽探測結果放在 batch-progress/probe/，是**一份跨批的 map**；
// 本機的 build-manifest／fill-covers／itunes-* 都是**逐批、逐種形狀**在讀
// （cand-all 是陣列並且要有 key、covers 是陣列、previews 是 map）。這支只做轉檔，
// 不做任何判定，好讓「雲端查到什麼」與「本機決定什麼」兩件事在檔案層面分得開。
//
// 用法：node batch-progress/probe/stage-local.mjs
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib.mjs';

const GROUPS = { c51: ['c51a', 'c51b', 'c51c', 'c51d'], csea: ['cseaa', 'cseab', 'cseac'] };
const P = path.join(ROOT, 'batch-progress/probe');
const probeCov = JSON.parse(fs.readFileSync(path.join(P, 'covers.json'), 'utf8'));
const probePrev = JSON.parse(fs.readFileSync(path.join(P, 'previews.json'), 'utf8'));

for (const [batch, subs] of Object.entries(GROUPS)) {
  const dir = path.join(ROOT, 'batch-progress', batch);
  // key 只在卡單裡（desc2:藝人|專輯），策展檔沒有；build-manifest 要靠它撈簡介與研究來源
  const keyOf = new Map();
  for (const s of subs)
    for (const c of JSON.parse(fs.readFileSync(path.join(ROOT, `desc-tools/batches/cards/${s}-cards.json`), 'utf8')))
      keyOf.set(`${c.artist}|${c.album}`, { key: c.key, sub: s });

  const candRaw = JSON.parse(fs.readFileSync(path.join(dir, 'cand.json'), 'utf8'));
  const cand = candRaw.albums;   // { batch, albums, skipped }
  const missKey = [];
  const candAll = cand.map(a => {
    const k = `${a.artist}|${a.album}`;
    const m = keyOf.get(k);
    if (!m) missKey.push(k);
    return { ...a, key: m ? m.key : `desc2:${k}`, sub: m ? m.sub : '' };
  });

  const covers = candAll.map(a => {
    const p = probeCov[`${a.artist}|${a.album}`];
    const row = { artist: a.artist, album: a.album, rgMbid: a.rgMbid || '' };
    if (p && p.art) {
      row.cover = {
        url: `https://coverartarchive.org/${p.art.level}/${p.art.id}/front`,
        source: 'caa',
        note: p.art.level === 'release'
          ? `group 層無圖，取 release ${p.art.id}（${p.art.country || '?'} ${p.art.date || '?'}）`
          : '',
      };
    }
    return row;
  });

  const previews = {};
  for (const a of candAll) {
    const p = probePrev[`${a.artist}|${a.album}`];
    const k = `${a.artist}|${a.album}`;
    if (!p) { previews[k] = { status: 'unavailable', note: '雲端未探測' }; continue; }
    if (p.status === 'ready') {
      previews[k] = {
        status: 'ready', source: 'apple', storefront: String(p.front || 'US').toUpperCase(),
        url: p.previewUrl, appleCollectionId: String(p.collectionId),
        appleCollectionName: p.appleTitle, appleArtistName: p.appleArtist,
        explicitness: p.explicitness || '', matchedVia: 'probe-multistore',
      };
    } else {
      // 驗證器只認 ready／unavailable／disabled；探測器的 no-preview 是「有碟但整碟沒預覽」，
      // 那仍然是「這張卡沒有固定試聽」，歸 unavailable 並把原因寫進 note，不要遺失區別。
      previews[k] = {
        status: 'unavailable',
        note: p.status === 'no-preview'
          ? `Apple 有此碟（${p.appleTitle || ''}）但整碟無 previewUrl`
          : `逐店查無：${(p.tried || []).join('、')}`,
      };
    }
  }

  fs.writeFileSync(path.join(dir, 'cand-all.json'), JSON.stringify(candAll, null, 1));
  fs.writeFileSync(path.join(dir, 'covers.json'), JSON.stringify(covers, null, 1));
  fs.writeFileSync(path.join(dir, 'previews.json'), JSON.stringify(previews, null, 1));
  const ready = Object.values(previews).filter(p => p.status === 'ready').length;
  console.log(`${batch}｜卡 ${candAll.length}｜封面 ${covers.filter(c => c.cover).length}｜試聽 ready ${ready}｜卡單對不到 key ${missKey.length}`);
  missKey.forEach(k => console.log('    ✗ 無卡單：' + k));
}
