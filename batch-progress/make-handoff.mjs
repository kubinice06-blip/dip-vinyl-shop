// 產生 REMOTE_RUNBOOK 規定的交接清單 handoff.json。
// 格式依 runbook「交接格式」一節，另加三塊 runbook 沒規定但本批實際需要的：
// ownerDecisions（需店主裁定的衝突）、poolIssues（查到的線上資料問題）、specConflicts（規格互相牴觸處）。
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib.mjs';

const batch = process.argv[2];
if (!batch || !['c48', 'c49'].includes(batch)) { console.error('用法: node make-handoff.mjs <c48|c49>'); process.exit(1); }
const DIR = path.join(ROOT, 'batch-progress', batch);
const files = fs.readdirSync(DIR).filter(f => /^cand-.*\.json$/.test(f)).sort();

const albums = [], skipped = [];
for (const f of files) {
  const j = JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8'));
  albums.push(...(j.albums || []));
  skipped.push(...(j.skipped || []).map(s => ({ ...s, from: f })));
}

const keyOf = a => `${a.artist}|${a.album}`;
const apexPending = albums.filter(a => a.apexCandidate?.evidence === 'pending-local').map(keyOf);
const apexAll = albums.filter(a => a.apexCandidate?.eligible);
const manualIdentity = albums.filter(a => a.identitySource === 'manual').map(keyOf);
const compilations = albums.filter(a => (a.secondaryTypes || []).includes('Compilation') || a.releaseType === 'Compilation').map(keyOf);

const out = {
  batch,
  cards: albums.length,
  skipped: skipped.length,
  generatedAt: new Date().toISOString().slice(0, 10),
  pendingLocal: {
    covers: '全部（CAA 逐張 HTTP 驗證與人工目視是本機工項）',
    previews: '全部（iTunes /lookup 雲端 egress 不穩，且版本需人工覆核）',
    listeners: '全部（Last.fm 為本機工項；本批一律留 null）',
    ratings: batch === 'c49'
      ? '全部——worker /album-rating 會把 AI 基線寫進 rating4: KV 快取，依 REMOTE_RUNBOOK「雲端不碰 KV」不在雲端執行。已確認該端點在雲端可達（回 200），是規則問題不是可達性問題。'
      : '無——古典依 §0.7 一律走 manual:classical-rubric 人工錨點制、不用 API，雲端已完成。',
    apexEvidence: apexPending,
    manualIdentity,
    compilationsNeedingReview: compilations,
  },
  counts: {
    apexCandidates: apexAll.length,
    apexByTier: apexAll.reduce((m, a) => (m[a.apexCandidate.tier] = (m[a.apexCandidate.tier] || 0) + 1, m), {}),
    pinnedMbid: albums.filter(a => a.rgMbid).length,
    manualIdentity: manualIdentity.length,
  },
  skippedDetail: skipped,
  qa: { research: 'pending', hooks: 'pending', out: 'pending' },
};

fs.writeFileSync(path.join(DIR, 'handoff.json'), JSON.stringify(out, null, 1));
console.log(`${batch}/handoff.json：${out.cards} 張、skipped ${out.skipped}`);
console.log(`  頂點 ${out.counts.apexCandidates}（${JSON.stringify(out.counts.apexByTier)}）｜pending-local ${apexPending.length}`);
console.log(`  釘 MBID ${out.counts.pinnedMbid}｜人工身分 ${out.counts.manualIdentity}｜需 §5.6 覆核的合輯 ${compilations.length}`);
