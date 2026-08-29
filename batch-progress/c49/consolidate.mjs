// c-49 候選收斂：五組策展產出 ＋ 主線集中查的 MB 結果 → chk-cand.mjs 可驗的候選檔。
// MB 有命中就釘 rgMbid；兩個方向都零結果才走人工身分路線（identitySource=manual），
// 並用實際下過的查詢字串組出 mbAbsenceProof（對齊 verify-album-onboarding.mjs 的窄例外）。
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib.mjs';

const DIR = path.join(ROOT, 'batch-progress/c49');
const CHECKED_AT = new Date().toISOString().slice(0, 10);
const load = p => fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : null;

const mbWork = load(path.join(DIR, 'mb-work.json')) || {};
const mbArtist = load(path.join(DIR, 'mb-artist.json')) || {};

const GROUPS = { D: '時代曲', E: '台語', FG: '原民客語＋華語電影配樂', A: '粵語第二圈', I: '星馬第二圈' };
let manual = 0, pinned = 0, total = 0;

for (const [g, label] of Object.entries(GROUPS)) {
  const src = load(path.join(DIR, `curation/out-${g}.json`));
  if (!src) { console.error(`缺 out-${g}.json`); continue; }
  const albums = [];
  for (const a of src.albums || []) {
    total++;
    const k = `${a.artist}|${a.album}`;
    const hits = Array.isArray(mbWork[k]) ? mbWork[k] : [];
    const aHits = Array.isArray(mbArtist[`${a.artist}|(藝人方向)`]) ? mbArtist[`${a.artist}|(藝人方向)`] : [];

    const rec = {
      artist: a.artist, album: a.album,
      composer: undefined,
      suggestedYear: a.suggestedYear, yearNote: a.yearNote || '',
      label: a.label || '', versionNote: a.versionNote || '', namingNote: a.namingNote || '',
      releaseType: a.releaseType || 'Album',
      secondaryTypes: a.secondaryTypes || [],
      exceptionReason: a.exceptionReason || '',
      exceptionEvidenceUrls: a.exceptionEvidenceUrls || [],
      upc: a.upcHint || '',
      curatorWhy: a.curatorWhy || '', curatorRisk: a.curatorRisk || '',
      apexCandidate: a.apexCandidate,
      // 三軸留空：/album-rating 會寫 rating4: KV，依 REMOTE_RUNBOOK「雲端不碰 KV」不在此執行
      ratings: null,
      ratingsNote: 'local：三軸走 worker /album-rating，該端點會寫入 rating4: KV 快取，依雲端規則不在雲端跑',
    };

    if (hits.length) {
      // 只在掛名或標題明確對得上時才釘；對不上一律退人工身分，不硬釘
      const best = hits[0];
      rec.rgMbid = best.id;
      rec.mbTitle = best.title;
      rec.mbCredit = best.artist;
      rec.mbFirstRelease = best.firstRelease || null;
      rec.mbNote = `MB 命中 ${hits.length} 筆，取最高分者；本機請覆核掛名與版本是否與 versionNote 一致`;
      pinned++;
    } else {
      rec.identitySource = 'manual';
      rec.mbAbsenceProof = {
        queries: [
          `release-group/?query=artist:"${a.artist}" AND releasegroup:"${a.album}"`,
          `release-group/?query=artist:"${a.artist}"（藝人全目錄方向）`,
        ],
        checkedAt: CHECKED_AT,
        conclusion: aHits.length
          ? `作品方向 count=0；藝人方向查得 ${aHits.length} 筆但無此盤，該藝人在 MB 有建檔、這張碟未建檔`
          : '作品方向與藝人方向皆 count=0，該藝人與該盤在 MusicBrainz 均未建檔',
      };
      rec.manualEvidenceUrls = a.manualEvidenceUrls || [];
      rec.manualRuling = a.manualRuling
        || `依 ALBUM_ONBOARDING.md §1 的 MBID 窄例外（2026-08-15 店主核定）走人工身分路線；策展層已附 ${(a.manualEvidenceUrls || []).length} 個可追溯佐證網址`;
      manual++;
    }
    delete rec.composer;
    albums.push(rec);
  }
  const out = { domain: `${g} ${label}`, albums, skipped: src.skipped || [] };
  fs.writeFileSync(path.join(DIR, `cand-${g}.json`), JSON.stringify(out, null, 1));
  console.log(`cand-${g}.json：${albums.length} 張（釘 MBID ${albums.filter(x => x.rgMbid).length}、人工身分 ${albums.filter(x => x.identitySource === 'manual').length}）`);
}
console.log(`\n合計 ${total} 張｜釘 MBID ${pinned}｜人工身分 ${manual}`);
