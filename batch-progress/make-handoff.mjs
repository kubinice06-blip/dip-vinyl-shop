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

// ── 三塊 runbook 沒規定、但本批實際需要的交接內容 ────────────────
// 這些是查證過程中累積的判斷與衝突，無法從候選檔推導，只能逐條記下來。
// 寫在腳本裡而不是另開資料檔，是為了讓內容跟著 diff 一起被審。
// 各層 QA 的實測結果。誤報一律寫明「複核後為誤報」與原因，
// 不要只寫「通過」——本機才能判斷同類標記下次還能不能放行。
const QA = {
  c48: {
    research: 'c48a／c48b／c48c 三批 qa-batch research 全部通過：key 與卡單完全一致、字元三掃描零標記。status 共 96 full ＋ 1 thin（嚴良堃《長恨歌》，見 poolIssues）。',
    hooks: 'chk-hook-crossgroup 三批全綠。c48b 有一項「辭世 ×2」的同構命中，經複核為誤報——兩張分屬不同敘事角色（Lassus 是題獻教宗後三週辭世的時序註記、Purcell 是總譜在他身後散佚的流傳史），兩張 hook 都沒用這個骨架當主軸。hook 加權 20–35.5、note 285–350，全部在上限內。',
    out: 'qa-batch out 三批合計 97 張與卡單相符、超過 260 字零張、字數 167–240。qa-check-research 15 檔共 2 個標記，複核後皆為誤報：研究稿寫廠牌縮寫（DG 2530 720、RCA Victor Red Seal 的 LSC-2603），寫作層展開或相鄰寫出，比對器認不得縮寫；兩張的發行事實在事實表裡都有據。',
  },
  c49: {
    research: 'c49a／c49b 兩批 qa-batch research 全部通過：key 與卡單完全一致。status 共 79 full ＋ 7 thin（台語與粵語老盤資料薄，來源不足時如實標記）。唯一持續出現的標記是客語「个」的已知誤報，見 specConflicts。',
    hooks: 'chk-hook-crossgroup c49a 39 張唯一標記經複核為誤報——葉麗儀《上海灘》的「滿分」是 1969 年無線電視《聲寶之夜》歌唱比賽評判顧嘉煇給的分數，有維基佐證、屬生平事實；規格禁的是樂評對唱片的評分（Metacritic、Pitchfork、X/10、幾顆星），不含選秀評分。hook 加權 20–36、note 226–341。',
    out: 'c49a 39 張：qa-batch out 與卡單相符、超過 260 字零張、字數 198–238；qa-check-research 唯一標記為誤報（崔萍那張引用〈上海灘〉歌詞「愛你恨你，問君知否」，屬引文非稱呼讀者，該誤報已在工具端修掉）。c49b 47 張：見下方 generatedAt 當日的最終結果。',
  },
};

const EXTRA = {
  c48: {
    ownerDecisions: [
      '【年份口徑】research-base 說 yearVerified.year 取首發年，但 audits/audit-classical.md 風險註 6 與池內慣例（Gould 1955、Richter 1958、Furtwängler 拜魯特 1951）用的是錄音年。本批一律填錄音年，首發年另記在同一欄的 note 裡，本機可一鍵切換。',
      '【傅聰《Chopin: Nocturnes》】碟面 ℗ 1978／1980 跨兩年。本批取 1978（首張 LP 年、與卡名一致）；若依 research-base「全集取完成年」則應為 1980。',
      '【Michelangeli《Beethoven / Galuppi / Scarlatti Recital》】MB 標 Compilation 與事實不符——這套曲目 1965 年就以單張原創獨奏會 LP 發行（Decca SXL 6181／LXT 6181，美版 London CS 6446），曲目與 1988 年 CD 完全相同。§5.6 的舉證需求應重估。',
    ],
    poolIssues: [
      '【嚴良堃《黃自: 長恨歌》】錄音本體五個途徑全查無：MB 條碼 4892440722422 零結果、Discogs 條碼 API 與關鍵字皆無、Apple/iTunes 港台區無、雨果豆瓣目錄無、香港聖樂團官網 1995–2002 大事記無 1999 年紀錄。演出者、日期、編號 HRP 7224-2、發行年全部未證實，facts 一律未寫。不建議移除（原創錄音、作品有明確歷史定位），但實體核實前簡介只能寫作品與人物——已照此執行，該卡正文 167 字元，低於 180 目標下限但屬正確結果。',
      '【掛名格式】「Tai-Hsiang Li 李泰祥」的中英並列寫法與本批其餘卡不一致，本機請決定統一格式。',
      '【掛名正規化】本批已用 normalize-artist.mjs 處理 6 處：「Lang Lang 郎朗」→「Lang Lang」（1 處）、「鄧麗君」→「鄧麗君 Teresa Teng」（5 處）。合作卡（A & B、A / B）一律不動，那是多位演奏者不是掛名分裂。',
    ],
    specConflicts: [
      '【年份口徑】同上 ownerDecisions 第 1 條，research-base 與 audit-classical 互相牴觸。',
      '【qa-check-hooks.mjs 不在 repo 裡】qa-batch.mjs 的 hooks 階段原本無條件 execSync 這支不存在的腳本，把「檔案不存在」和「檢查不通過」都算成一個標記，雲端每次跑必然多一個假標記。已改為先驗檔案存在與否、缺檔就提示改跑 chk-hook-crossgroup.mjs（字數／禁語／開頭雷同／分數星等這些檢查該支都齊備）。本機若有 qa-check-hooks.mjs，請決定是把它提交進 repo，還是把 qa-batch 的呼叫改掉。',
    ],
  },
  c49: {
    ownerDecisions: [
      '【白光〈如果沒有你〉年份】卡片現為 1942（策展層採 Apple 與百度）。研究層查到多方來源把此曲繫為 1948 年電影《柳浪聞鶯》插曲，且中文維基〈張露〉條目獨立地把該片繫在 1948 年，1942 恐不成立。未取得標日期的一手唱片證據，facts 未寫年份。',
      '【李香蘭〈夜來香〉】1943（Discogs 上百代 78 轉原盤編號 35610）vs 1944（中文維基）。卡片現為 1944。',
      '【姚莉〈玫瑰玫瑰我愛你〉】1940（中英文維基導言）vs 1941（同一中文條目的版本表與 Discogs 35500 號原盤）。編號本身也衝突：英文維基作 B. 597。',
      '【陳小雲〈舞女〉原唱歸屬】兩個中文維基條目直接互斥——〈陳小雲〉寫「俞隆華原唱、1984、靈波」，〈舞女 (歌曲)〉寫「陳小雲原唱、1985、吉馬」，原唱、年份、廠牌三項全衝突。hook 層已把正文範圍框在不涉原唱歸屬的其他面向，只寫詞曲皆為俞隆華。',
      '【蔡琴《蔡琴老歌》的 MB RG】本批已把該卡從人工身分改為釘 RG a59c45da（曲目相符），但 MB 收錄的最早版本是 2007 年加拿大盤、無廠牌資訊，查無 1985 年三洋飛碟原盤。請覆核該 RG 指的是不是 1985 原盤所屬的專輯；若不是同一張，需改回人工身分並重寫缺席舉證。',
      '【孫燕姿《克卜勒》的 hall 依據】中華音樂人交流協會 2014 年度十大專輯與十大單曲雙榜、第 19 屆新加坡金曲獎最佳專輯皆查證屬實，但本作未進回溯型正典名單、本次也未取得獨立樂評來源。依據成立但單薄，請覆核是否維持 hall。',
      '【葉麗儀《上海灘》的子域歸類】這是電視劇主題曲專輯，不是電影原聲帶。放在「華語電影配樂」子域裡需確認是否接受。',
      '【洪一峰《舊情綿綿》年份】1959 年譜曲完成 vs 1962 年電影主題曲，兩個年份指不同事件。卡片現為 1962。',
      '【黃霑《黃飛鴻》年份】1993（Discogs 台灣滾石 CH 46001，有條碼 4710149460011）vs 1992（MusicBrainz 香港滾石），兩者無法互證，兩個年份都寫進 facts。可確定的是種子的 1991 毫無實體佐證。另本碟性質為系列選輯而非單片原聲（§5.6 例外要件已備齊）。',
    ],
    poolIssues: [
      '【種子清單的錯誤，策展層已推翻】葉麗儀《上海灘》原掛「顧嘉煇」（他是作曲者，不是這張唱片的掛名藝人）；黃飛鴻盤名原作「黃飛鴻 男兒當自強」（〈男兒當自強〉是曲名，《黃飛鴻之二：男兒當自強》是 1992 年的續集電影，兩者都不是盤名）；杜麗莎年份原作 1978（其目錄查無）；青山《淚的小花》原作 1968 海山（實為 1969 麗歌）。',
      '【廠牌標記與卡單不同】同集團不同廠標，建議 manifest 兩者並記：草蜢 → Philips 838 333-2；李克勤《紅日》→ Philips 514 055-2；許冠傑《財神到》→ 寶麗多／Polydor 2427 312；黃耀明《信望愛》→ 音樂工廠 MFCR 9201 2。',
      '【曲名校正】許冠傑〈何處覓蓬萊〉（卡單作「伺處」）、〈錢會繼續嚟〉（卡單作「黎」）；林子祥〈丫嗚婆〉（卡單作「哎烏婆」）、〈清唱我愛你〉（卡單作「我愛你(清唱)」）。',
      '【陳雷早期藝名】應為「陳昭雄」，卡單作「陳朝雄」。',
      '【心願單】《倩女幽魂》從未發行過原聲帶，該項目應關閉。陳明章《戀戀風塵》是 1993 年水晶唱片發行、非 1987 年。',
      '【策展層說法被研究層推翻者】林子祥〈愛到發燒〉是改編自 Dazz Band〈Let It Whip〉，不是帶起 break dance 潮的原創；草蜢《Grasshopper III》三首派台歌全是改編曲（卡單稱「大幅減少日文翻唱」，事實相反）；李克勤《紅日》改編比例極高（卡單稱「從翻唱小生轉向自有代表作」）；盧冠廷《1989》的建議者是泰迪羅賓與徐克（卡單作吳宇森）；蔡健雅《呼吸》不是全創作專輯（10 首、歌詞全部出自他人，她只寫了 7 首的曲）；戴佩妮《Penny》外借的是曲不是詞。',
    ],
    specConflicts: [
      '【yearVerified 不適用於華語批】該欄是 research-base 第 181 行規定的**古典錄音卡專用必填欄**，華語批不產這欄，因此 reconcile-year.mjs 對 c49 不適用。年份走候選檔的 suggestedYear 與 yearNote，衝突記在研究稿的 facts／notes。',
      '【qa-batch 簡體掃描白名單】原本只收非拉丁片段（西里爾／天城體／諺文）且只剝 desc2: 前綴。已改為把卡單的藝人名與專輯名全字串一併豁免，並支援 desc4:。已知殘留誤報：研究稿說明客語「个／的」兩種寫法時，那個單獨出現的助詞不在標題字串裡，掃描器無從分辨客語助詞與簡體「個」，仍會報一次。',
      '【qa-check-research 禁語掃描】原本只剝《》漏了〈〉，而本專案的曲名一律用〈〉。華語批的曲名極常帶「你」（〈我只在乎你〉〈讀你〉〈愛你恨你，問君知否〉），每批都會誤報一輪。已修，回歸驗證 c48 三批 15 檔結果不變。',
    ],
  },
};

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
  qa: QA[batch],
  ownerDecisions: EXTRA[batch].ownerDecisions,
  poolIssues: EXTRA[batch].poolIssues,
  specConflicts: EXTRA[batch].specConflicts,
};

fs.writeFileSync(path.join(DIR, 'handoff.json'), JSON.stringify(out, null, 1));
console.log(`${batch}/handoff.json：${out.cards} 張、skipped ${out.skipped}`);
console.log(`  頂點 ${out.counts.apexCandidates}（${JSON.stringify(out.counts.apexByTier)}）｜pending-local ${apexPending.length}`);
console.log(`  釘 MBID ${out.counts.pinnedMbid}｜人工身分 ${out.counts.manualIdentity}｜需 §5.6 覆核的合輯 ${compilations.length}`);
