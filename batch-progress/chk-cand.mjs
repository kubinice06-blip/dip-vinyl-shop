// 候選檔結構檢查（c-47 版移植到雲端：路徑改 repo 相對，並補古典與人工身分路線的規則）。
// 用法：node batch-progress/chk-cand.mjs c48/cand-axis1.json [...]
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, loadPool, poolKeySet, fold, key } from './lib.mjs';

const MBID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const { all } = loadPool();
const poolKeys = poolKeySet(all);

const byAlbum = new Map();
for (const r of all) {
  const k = key(r.album);
  if (!byAlbum.has(k)) byAlbum.set(k, []);
  byAlbum.get(k).push(r.artist);
}

let total = 0, errs = 0, warns = 0, manual = 0;
const seenKeys = new Map(), seenMbid = new Map();

for (const f of process.argv.slice(2)) {
  const j = JSON.parse(fs.readFileSync(path.join(ROOT, 'batch-progress', f), 'utf8'));
  console.log(`\n== ${f}：${j.albums.length} 張、skipped ${j.skipped?.length ?? 0} ==`);
  for (const a of j.albums) {
    total++;
    const k = `${a.artist} — ${a.album}`;
    const E = m => { errs++; console.log(`  ERROR ${k}: ${m}`); };
    const W = m => { warns++; console.log(`  WARN  ${k}: ${m}`); };

    for (const field of ['artist', 'album', 'suggestedYear', 'yearNote', 'curatorWhy', 'curatorRisk']) {
      if (!a[field] && a[field] !== 0) E(`缺 ${field}`);
    }

    // 身分：釘 MBID 或走人工，二擇一，不得兩存（對齊 verify-album-onboarding.mjs 的窄例外）
    if (a.identitySource === 'manual') {
      manual++;
      if (a.rgMbid) E('identitySource=manual 時 rgMbid 必須留空');
      const p = a.mbAbsenceProof;
      if (!p || typeof p !== 'object') E('走人工身分必須附 mbAbsenceProof');
      else {
        if (!Array.isArray(p.queries) || p.queries.filter(q => String(q).length >= 3).length < 2) {
          E('mbAbsenceProof.queries 至少兩組（藝人與作品兩個方向）');
        }
        if (!/^\d{4}-\d{2}-\d{2}/.test(String(p.checkedAt || ''))) E('mbAbsenceProof.checkedAt 需 ISO 日期');
        if (String(p.conclusion || '').length < 10) E('mbAbsenceProof.conclusion 需寫明查無的具體情況');
      }
      const ev = (a.manualEvidenceUrls || []).filter(u => /^https:\/\//.test(u));
      if (ev.length < 2) E('走人工身分必須 ≥2 個 HTTPS 佐證網址');
      if (String(a.manualRuling || '').length < 10) E('缺 manualRuling（核可依據）');
    } else {
      if (!a.rgMbid) E('缺 rgMbid');
      else if (!MBID.test(a.rgMbid)) E(`rgMbid 格式不對：${a.rgMbid}`);
    }

    if (/[‐‑]/.test(a.artist + a.album)) E('含 U+2010/U+2011 連字號，未正規化');
    if (!Number.isInteger(a.suggestedYear) || a.suggestedYear < 1900 || a.suggestedYear > 2027) E(`年份異常 ${a.suggestedYear}`);

    const kk = key(a.artist) + '|' + key(a.album);
    if (poolKeys.has(kk)) E('與現池撞鍵（該 skip 沒 skip）');
    if (seenKeys.has(kk)) E(`跨檔重複：與 ${seenKeys.get(kk)} 同鍵`); else seenKeys.set(kk, f);
    if (a.rgMbid) { if (seenMbid.has(a.rgMbid)) E(`rgMbid 重複：與 ${seenMbid.get(a.rgMbid)} 相同`); else seenMbid.set(a.rgMbid, k); }

    const others = byAlbum.get(key(a.album)) || [];
    const near = others.filter(o => { const fo = key(o), fa = key(a.artist); return fo !== fa && fo.length > 4 && fa.length > 4 && (fo.includes(fa) || fa.includes(fo)); });
    if (near.length) W(`池內同名專輯掛名相近：${[...new Set(near)].join('、')}（人工確認非同一張）`);

    if (a.releaseType && a.releaseType !== 'Album' && !a.exceptionReason) E(`releaseType=${a.releaseType} 但無 exceptionReason`);
    // c-47 實踩：MB 的 Compilation 常掛在 secondaryTypes、primary 仍是 Album
    if ((a.secondaryTypes || []).includes('Compilation') && !a.exceptionReason) {
      E('secondaryTypes 含 Compilation 但無 exceptionReason（§5.6）');
    }
    if (a.exceptionReason && (a.exceptionEvidenceUrls || []).filter(u => /^https:\/\//.test(u)).length < 2) {
      E('合輯／曲風例外需 ≥2 個 HTTPS 佐證網址（§5.5／§5.6）');
    }

    // 古典特例（§0.6／§0.7）
    if (a.genreFamily === 'classical') {
      if (!a.composer) E('古典卡必須帶 composer（seed 第 8 欄／apex 第 5 欄）');
      if (a.ratings && a.ratings.source !== 'manual:classical-rubric') {
        E(`古典三軸必須走錨點制，ratings.source 應為 manual:classical-rubric（現為 ${a.ratings.source}）`);
      }
      // 同曲多版必須在卡名帶區辨資訊
      const sameWork = all.filter(r => key(r.album) === key(a.album));
      if (sameWork.length && !/[（(]/.test(a.album)) W('同曲已有其他版本但卡名無括註區辨');
    }

    if (a.apexCandidate?.eligible) {
      const u = a.apexCandidate.evidenceUrls || [];
      if (a.apexCandidate.evidence === 'pending-local') {
        W('頂點證據標 pending-local（雲端連不到來源，本機補證；不得逕判普卡）');
      } else if (new Set(u).size < 2) E('頂點候選證據不足兩個唯一網址');
      if (!['hall', 'pearl', 'heresy'].includes(a.apexCandidate.tier)) E(`頂點 tier 異常 ${a.apexCandidate.tier}`);
      if (a.apexCandidate.tier === 'pearl' && a.ratings?.listeners !== null) {
        W('pearl 候選：listeners 依 REMOTE_RUNBOOK 應留 null 待本機補（古典另有 §0.7 特例）');
      }
    }
  }
}
console.log(`\n合計 ${total} 張｜ERROR ${errs}｜WARN ${warns}｜走人工身分 ${manual}`);
process.exit(errs ? 1 : 0);
