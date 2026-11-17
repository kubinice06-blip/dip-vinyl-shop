# 一般卡嚴重簡介重寫（desc-severe-20261117，批名 sd-XX）

店主 2026-11-17 看到林強《驚蟄》整段只講軌序和曲長：「這介紹跟沒介紹一樣，這到底是什麼專輯？故事在哪？概念在哪？……檢查是不是很多都這樣。」
抽查 400 張一般卡：severe 17%、rewrite 48%、keep 35%（`batch-progress/desc-audit-20261117/`）。店主：「修嚴重的先」。

**規則全在 `desc-tools/prompts/general-desc-base.md`**（檢查標準、研究三塊、寫作骨架、審稿）。語氣、格式、審稿四問沿用 `desc-tools/prompts/apex-desc-base.md`。
派工詞不要重打規則，叫代理先讀那兩份。

## 範圍

seed 裡**沒有 tier** 的一般卡，第 0 步判為 `severe` 的全部（推估約 3,600 張）。`rewrite` 級另案，等店主決定。
以第 0 步當下的 `origin/main` seed 為準；之後新上架的卡不在本線。

## 流程

### 第 0 步：全卡池判定（第一個工作階段做）

1. 讀現行簡介：`node batch-progress/desc-audit-20261117/dump-descs.mjs <輸出目錄>`（寫到 `<輸出目錄>/da/descs.json`，中斷重跑會接續）（Cloudflare KV bulk get，desc2 → desc4；需 `kv-token-check` 通過）。**不要用 `/album-desc` 大量讀。**
2. 一般卡切成每份約 300 張（`{k, artist, album, year, desc}`），Sonnet 子代理照 general-desc-base 第一節判 severe／rewrite／keep，附 codes 與 why（≤25 字）。不上網。
   每做完 50 張寫進輸出檔；輸出檔已有內容就接續。同時最多 8 支在飛。→ `triage/triage-NNN.json`，合併成 `triage.json`。
3. 主線抽查：severe 至少抽 40 張、keep 至少抽 40 張，對照 `desc-audit-20261117/sample-400.json` 的判準；偏鬆或偏嚴就調整派工詞重判那幾份。
4. severe 清單切批，**每批 30 張**，順序：**中日韓台的卡先**（藝人或盤名有 CJK 字）→ 經典度 ≥4 → 其餘；同一藝人盡量同批。批名 `sd-001`、`sd-002`…，寫進 `batches.json` 與本檔「分批表」。

### 每一批（30 張）

照 `batch-progress/apex-desc-20261104/PLAN.md`「每一批」的七步，差別：

- 卡單 → `desc-tools/batches/cards/sd-XXX-cards.json`（含現行簡介）。
- 研究層 3 支 Sonnet 各 10 張，照 **general-desc-base 第二節**（MB／Discogs 只確認身分，不當 facts 主體）。每做完 3 張寫進輸出檔；已有內容就接續。
- 寫作層 2 支 Opus 各 15 張，照 **general-desc-base 第三節**，字數 180–240。每寫完 5 張寫進輸出檔；已有內容就接續。
- 機器 QA：字數、禁簡體、全形標點、fix-spacing，**再加一條：全文不得出現軌序／曲長（`\d+:\d\d`）／盤號／目錄號**。
- **主線逐張審稿**（不派子代理），照 general-desc-base 第四節，紀錄寫進本目錄 `rulings.md`。
- 寫 KV：`kv-token-check` exit 0 才寫。**一律寫 desc2**，該卡原本有 desc4 的也同步寫 desc4；寫前存 `kv-before-sd-XXX.json`；bulk put 後逐字回讀；抽 3 張前台確認。
- onboarding manifest 有這張卡的 `description.text`，同步改。
- 工具可沿用 `batch-progress/apex-desc-20261104/tools/`（`ad.mjs cards|before|bulk|manifest`、`apply-review.mjs`、`front-check.mjs`、`check-curated.mjs`），複製到本目錄 `tools/` 改批名與路徑後用。
  **非 CJK 卡注意 worker 的 CURATED_DESCS 會蓋過 desc2**（apex 線《Kind of Blue》前例）——`front-check` 對不上的列進「待店主處理」。

## 2026-11-17 研究補強（店主指正《驚蟄》）

店主：「驚蟄這張專輯故事這麼多，怎麼可能查不到？根本沒用心找資料吧？」sd-006 研究層對《驚蟄》只搜 3 次就標 sound thin，靠主線補商品頁才勉強成稿；協調端再搜兩次就找到公視與人間福報的 2005 坎城報導（唯一受邀的亞洲音樂人、故宮數位影像、媽祖繞境鞭炮與電視雜訊取樣），已重寫上線（`kv-before-jingzhe-fix.json`）。
**之後每批照新版 `prompt-research.md`「判 thin／none 之前必查清單」做**：母語報導搜尋、通路商品頁（WebFetch 不吃額度）、維基年表、英文樂評與 Discogs notes，逐項寫進 notes 才准標 thin；研究稿 story／sound 標 thin 的卡，主線一律再補查一次。

## 2026-11-17 開頭要用鉤子（店主：「一樣要開頭給 hook 的方式」）

寫作層第一句改回鉤子（形式照 `hook-base.md`「對每張」第 2 點），**材料只能取自故事、概念、聲音或地位**，不准拿軌序、曲長、盤號、曲名體例、封套、版本；第二句講這是什麼。規則在 `general-desc-base.md` 第三節、派工詞 `prompt-writer.md`。範例：林強《驚蟄》已改為「2005 年坎城影展只請了四位音樂人，唯一的亞洲人是林強。」開頭重新上線（`kv-before-jingzhe-fix2.json`）。

- **sd-015 起**的新批直接照新版 `prompt-writer.md` 寫。主線審稿加查：鉤子材料、同批開頭前四字互異、鉤子加權 ≤50 字。
- **sd-001～sd-014 補鉤子**（批名 `sd-hook-1`＝sd-001～007、`sd-hook-2`＝sd-008～014，各約 200 張）：不重做研究，Opus 寫作層讀研究稿 facts 與現行新稿，給每張加一句鉤子、第二句改成「這是什麼」的接法，全文仍 180–240 字、不得新增研究稿以外的事實；主線逐張審；kv-before → bulk → verify → front-check → manifest 同步。

## 工作階段分配

- 第一個工作階段：第 0 步＋sd-001、sd-002。
- 之後協調工作階段一次開 3 個，各領兩批（批號寫在派工詞）。
- 每個工作階段做 2 批（60 張）就收工：開 PR、merge origin/main 解衝突、自己合併；本檔分批表標完成、`PROJECT_MEMORY.md` 最上方追加一筆。
- 容器會重啟：派子代理一律加「每做完 N 筆寫進輸出檔」「輸出檔已有內容就接續」。

## 分批表

第 0 步 2026-11-17 完成（s1）：一般卡 21,523 張 → **severe 2,963／rewrite 13,711／keep 4,849**（keep 主線抽查偏鬆約兩成，rewrite 另案時要再篩）。severe 切 **99 批**：中日韓台 539（sd-001～sd-018）、經典度≥4 999、其餘 1,365。明細 `triage.json`、各批 key `batches.json`、裁定 `rulings.md`。sd-001／sd-002 在 CJK 分片判完時先鎖定（`locked.json`）。

每批工具：`tools/sd.mjs cards|before|qa|bulk|verify|manifest <批>`、`tools/apply-review.mjs`（審稿改動檔 `review-sd-XXX.json`）、`tools/front-check.mjs`；派工詞 `prompt-research.md`、`prompt-writer.md`（{EXTRA} 放本批特注）。研究檔 `desc-tools/batches/research/sd-XXX-{a,b,c}.json`。
每批約用 WebSearch 35–50 次；CJK 冷門盤資料普遍薄，查不到任何專輯層級資料的卡**留置**（KV 保留舊稿），寫進 rulings。

| 批 | 範圍 | 張數 | 工作階段 | 狀態 |
|---|---|---:|---|---|
| sd-001 | 中日韓台（ザ・スターリン … 1976） | 30 | s1 | ✅ 上線 30（前台 30） |
| sd-002 | 中日韓台（1976 … 丸山繁雄） | 30 | s1 | ✅ 上線 29（前台 29；《少年ㄞ國》查無資料留置） |
| sd-003 | 中日韓台（Igor Stravinsky … 友部正人） | 30 | s2 | ✅ 上線 30（前台 30） |
| sd-004 | 中日韓台（友部正人 … 張惠妹） | 30 | s2 | ✅ 上線 28（前台 28；吉沢元治《Inland Fish》、妮波寺《Sorry》查無資料留置） |
| sd-005 | 中日韓台（張淺潛 … 本多俊之） | 30 | s3 | ✅ 上線 27（前台 27；《鬧青》《Yellow Star》《Radio Club》查無專輯資料留置） |
| sd-006 | 中日韓台（李志 … 深町純） | 30 | s3 | ✅ 上線 28（前台 28；《ハニー・サンバ》《Some Years Parst》留置；《驚蟄》主線補查重寫） |
| sd-007 | 中日韓台（深町純 … 熊寶貝樂團） | 30 | s4 | ✅ 上線 28（前台 28；清水靖晃《Berlin》、無妄合作社《二十一世紀的破青年》查無資料留置） |
| sd-008 | 中日韓台（珂拉琪 … 菊地雅章） | 30 | s4 | ✅ 上線 27（前台 27；益田幹夫《Chi Chi》、登川誠仁《スタンド！》、舌頭《這就是你》留置） |
| sd-009 | 中日韓台（菊地雅章 … 豬頭皮） | 30 | s5 | ✅ 上線 29（前台 29；蕭福德《春秋大夢》補查後仍無資料留置） |
| sd-010 | 中日韓台（豬頭皮 … 面孔樂隊） | 30 | s5 | ✅ 上線 28（前台 28；陳小霞《化妝師》、零與聲音解放組織《哦！你宛若…甜美屍體》留置） |
| sd-hold-1 | sd-001～008 留置卡重查 | 13 | s5 | ✅ 上線 13（前台 13；13 張全數救回，sd-001～008 留置清空） |
| sd-hold-2 | sd-009～014 留置卡重查 | 7 | s8 | ✅ 上線 7（前台 7；7 張全數救回，sd-009～014 留置清空） |
| sd-hold-3 | sd-016／018 留置卡重查 | 3 | s11 | ✅ 上線 2（前台 2；花生隊長、美空ひばり救回；張露《繁星點點》續留置） |
| sd-hold-4 | sd-016／019 留置卡重查 | 2 | s14 | ✅ 上線 1（前台 1；黑豹《無是無非》救回；張露《繁星點點》身分不穩續留置） |
| sd-hold-5 | 張露、delayde 最終重查 | 2 | s18 | ⛔ 上線 0、最終留置 2（張露《繁星點點》實為台灣歌手張璐 1977 環球 LP，卡面藝人錯，**待店主處理**：改藝人或下架；delayde《finding solitude》網路上無任何專輯層級資料） |
| sd-011 | 中日韓台（高中正義 … 송골매） | 30 | s6 | ✅ 上線 30（前台 30；無留置） |
| sd-012 | 中日韓台（시인과 촌장 … Mal Waldron & 日野皓正） | 30 | s6 | ✅ 上線 30（前台 30；無留置） |
| sd-013 | 中日韓台（NANIWA EXPRESS … ゼロ戦） | 30 | s7 | ✅ 上線 27（前台 27；山本精一《NOA》、Woody Herman＋北村英治《We》、なぎらけんいち《街の風になって》留置） |
| sd-014 | 中日韓台（ダッチャ … 南正人） | 30 | s7 | ✅ 上線 29（前台 29；丘蒸汽《のすたるじあ》留置；主線補查救回 10 張 none／thin） |
| sd-hook-1 | sd-001～007 已上線卡補鉤子（扣《驚蟄》） | 209 | s10 | ✅ 上線 209（前台 209；審稿改 16 處；派工詞 `prompt-hook.md`、`sd.mjs` 已預填 sd-hook-2） |
| sd-hook-2 | sd-008～014 已上線卡補鉤子（扣 sd-hold-2 已有鉤子的 7 張） | 203 | s13 | ✅ 上線 203（前台 203；審稿改 10 處；sd-001～014 鉤子補齊） |
| sd-015 | 中日韓台（原信夫とシャープス・アンド・フラッツ … 崔健） | 30 | s8 | ✅ 上線 30（前台 30；無留置；第一批鉤子開頭） |
| sd-016 | 中日韓台（崔健 … 比屋定篤子） | 30 | s8 | ✅ 上線 29（前台 29；張露《繁星點點》留置） |
| sd-017 | 中日韓台（池田芳夫クインテット … 秋本奈緒美） | 30 | s9 | ✅ 上線 30（前台 30；無留置；主線補查 17 張） |
| sd-018 | 中日韓台（竇唯 … 閃靈） | 30 | s9 | ✅ 上線 28（前台 28；花生隊長《Oh My God》、美空ひばり《ひばりの渡り鳥だよ》留置） |
| sd-019 | 中日韓台（閃靈 … 델리스파이스） | 30 | s11 | ✅ 上線 29（前台 29；黑豹樂隊《無是無非》留置） |
| sd-020 | 中日韓台＋經典度≥4（델리스파이스 … Agnostic Front） | 30 | s11 | ✅ 上線 30（前台 30；無留置；CURATED 0） |
| sd-021 | 經典度≥4（Agnostic Front … Girls' Generation） | 30 | s12 | ✅ 上線 30（前台 30；無留置；主線補查 13 張） |
| sd-022 | 經典度≥4（Gorilla Biscuits … Shankar Jaikishan） | 30 | s12 | ✅ 上線 30（前台 30；無留置；CURATED 覆蓋 0） |
| sd-023 | 經典度≥4（Shankar Jaikishan … 14 Iced Bears） | 30 | s14 | ✅ 上線 30（前台 30；無留置；CURATED 0） |
| sd-024 | 經典度≥4（2NE1 … Andrew Hill） | 30 | s14 | ✅ 上線 30（前台 30；無留置；CURATED 0） |
| sd-025 | 經典度≥4（Androids of Mu … Bappi Lahiri） | 30 | s15 | ✅ 上線 30（前台 30；無留置；主線補查 14 張；CURATED 0） |
| sd-026 | 經典度≥4（Barrington Levy … Bobby McFerrin & Chick Corea） | 30 | s15 | ✅ 上線 30（前台 30；無留置；主線補查 8 張；CURATED 0） |
| sd-027 | 經典度≥4（Bodkin … CASHFORGOLD） | 30 | s16 | ✅ 上線 30（前台 30；無留置；CURATED 0） |
| sd-028 | 經典度≥4（Casino Versus Japan … Chico Freeman） | 30 | s16 | ✅ 上線 30（前台 30；無留置；CURATED 0） |
| sd-029 | 經典度≥4（Chris & Cosey … David Lynch & Alan R. Splet） | 30 | s17 | ✅ 上線 30（前台 30；無留置；CURATED 0） |
| sd-030 | 經典度≥4（David Oistrakh … Don Grolnick） | 30 | s17 | ✅ 上線 29（前台 29；delayde《finding solitude》查無專輯資料留置） |
| sd-031 | 經典度≥4（Don Pullen … Eliane Elias） | 30 | s18 | ✅ 上線 30（前台 30；無留置；CURATED 0） |
| sd-032 | 經典度≥4（Eliane Elias … Ffa Coffi Pawb） | 30 | s18 | ✅ 上線 30（前台 30；無留置；CURATED 0） |
| sd-033 | 經典度≥4（Fin.K.L … Gabinete Caligari） | 30 | s19 | ✅ 上線 30（前台 30；無留置；主線補查 Foje、板橋文夫等；CURATED 0） |
| sd-034 | 經典度≥4（Galliard … Guido Manusardi） | 30 | s19 | ✅ 上線 30（前台 30；無留置；主線補查 6 張；CURATED 0） |
| sd-035 | 經典度≥4（Gunnar Graps ja Magnetic Band … Horace Parlan） | 30 | s20 | ✅ 上線 30（前台 30；無留置；主線補查 7 張；CURATED 0） |
| sd-036 | 經典度≥4（Horace Silver … Jackie McLean） | 30 | s20 | ✅ 上線 30（前台 30；無留置；主線補查 7 張；CURATED 0） |
| sd-037 | 經典度≥4（Jacky Terrasson … jinsang） | 30 | s21 | ✅ 上線 30（前台 30；無留置；主線補查 7 張；CURATED 0） |
| sd-038 | 經典度≥4（JMSN … Junior Ross & The Spears） | 30 | s21 | ✅ 上線 30（前台 30；無留置；主線補查 2 張；CURATED 0） |
| sd-039 | 經典度≥4（K. Hand … Larry Young） | 30 | s22 | ✅ 上線 30（前台 30；無留置；主線補查 10 張；CURATED 0） |
| sd-040 | 經典度≥4（Laughing Hyenas … Los Mirlos） | 30 | s22 | ✅ 上線 30（前台 30；無留置；主線補查 2 張；CURATED 0） |
| sd-041 | 經典度≥4（Los Saicos … Martin Carthy） | 30 | s23 | ✅ 上線 30（前台 30；無留置；主線補查 5 張；CURATED 0） |
| sd-042 | 經典度≥4（Martin Carthy & Dave Swarbrick … Miles Davis） | 30 | s23 | ✅ 上線 30（前台 30；無留置；主線補查 7 張；CURATED 0） |
| sd-043 | 經典度≥4（Miles Davis … New Risen Throne） | 30 | s24 | ✅ 上線 30（前台 30；無留置；主線補查 5 張；CURATED 0） |
| sd-044 | 經典度≥4（Nieuw Ensemble … Paul Chambers） | 30 | s24 | ✅ 上線 30（前台 30；無留置；主線補查 7 張；CURATED 0） |
| sd-045 | 經典度≥4（Paul Jackson … Quartetto Italiano） | 30 | s25 | ✅ 上線 30（前台 30；無留置；主線補查 8 張；CURATED 0） |
| sd-046 | 經典度≥4（Quicksand … Robb Kunkel） | 30 | s25 | ✅ 上線 30（前台 30；無留置；主線補查 9 張；CURATED 0） |
| sd-047 | 經典度≥4（Robert Nighthawk … Shahram Nazeri） | 30 | | |
| sd-048 | 經典度≥4（SHAKKAZOMBIE … Stefon Harris） | 30 | | |
| sd-049 | 經典度≥4（Steps … The Black Skirts） | 30 | | |
| sd-050 | 經典度≥4（The Black Skirts … The Mercy's） | 30 | | |
| sd-051 | 經典度≥4（The Monochrome Set … Titus Groan） | 30 | | |
| sd-052 | 經典度≥4（Tod Dockstader … Virgo Four） | 30 | | |
| sd-053 | 經典度≥4（Vision of Disorder … Zbigniew Preisner） | 30 | | |
| sd-054 | 經典度≥4＋其餘（Zeni Geva … Al Campbell） | 30 | | |
| sd-055 | 其餘（Alain Bashung … Arlo Parks） | 30 | | |
| sd-056 | 其餘（Armando … B-Side & Philanthrope） | 30 | | |
| sd-057 | 其餘（B.T. Express … Big John Patton） | 30 | | |
| sd-058 | 其餘（Big Satan … Bobbi Humphrey） | 30 | | |
| sd-059 | 其餘（Bobby Hutcherson … Brock Berrigan） | 30 | | |
| sd-060 | 其餘（BROCKBEATS … Casiopea） | 30 | | |
| sd-061 | 其餘（Casiopea … Chế Linh） | 30 | | |
| sd-062 | 其餘（Cicada … Cæcilie Norby） | 30 | | |
| sd-063 | 其餘（Da Vàng … Dianne Reeves） | 30 | | |
| sd-064 | 其餘（Didjits … Doris Norton） | 30 | | |
| sd-065 | 其餘（Dorothy Norwood … Elvin Jones） | 30 | | |
| sd-066 | 其餘（Elvin Jones … Experimental Audio Research） | 30 | | |
| sd-067 | 其餘（Experimental Audio Research … Freeform） | 30 | | |
| sd-068 | 其餘（FRICTION … God Bullies） | 30 | | |
| sd-069 | 其餘（Gone … Growling Mad Scientists） | 30 | | |
| sd-070 | 其餘（Guitoud … Hope of Glory） | 30 | | |
| sd-071 | 其餘（Horace Parlan … Integrity） | 30 | | |
| sd-072 | 其餘（Interferon … James Brown） | 30 | | |
| sd-073 | 其餘（James Hurt … Jimmy Smith） | 30 | | |
| sd-074 | 其餘（Jimmy Smith … John Holt） | 30 | | |
| sd-075 | 其餘（John Kaizan Neptune … Katra Turana） | 30 | | |
| sd-076 | 其餘（Keith Christmas … Laserdance） | 30 | | |
| sd-077 | 其餘（Laserdance … Linval Thompson） | 30 | | |
| sd-078 | 其餘（Linval Thompson … Lull） | 30 | | |
| sd-079 | 其餘（Lustmord … Marlena Shaw） | 30 | | |
| sd-080 | 其餘（Marshall Jefferson … Miroslav Vitous） | 30 | | |
| sd-081 | 其餘（Mitty Collier … Native Son） | 30 | | |
| sd-082 | 其餘（Natural Snow Buildings … Organum） | 30 | | |
| sd-083 | 其餘（Organum … Pontiac Streator） | 30 | | |
| sd-084 | 其餘（Prince Jazzbo … quasimode） | 30 | | |
| sd-085 | 其餘（Quatuor Diotima … Riow Arai） | 30 | | |
| sd-086 | 其餘（Rita Reys … Sasha & John Digweed） | 30 | | |
| sd-087 | 其餘（Sasha & John Digweed … Skyray） | 30 | | |
| sd-088 | 其餘（Slint … Steve Lacy & Michael Smith） | 30 | | |
| sd-089 | 其餘（Stewart Walker … Ta-ku） | 30 | | |
| sd-090 | 其餘（Tabu Ley Rochereau … The Clark Sisters） | 30 | | |
| sd-091 | 其餘（The Comes … The Icemen） | 30 | | |
| sd-092 | 其餘（The II Generation … THE SQUARE） | 30 | | |
| sd-093 | 其餘（THE SQUARE … Third Quadrant） | 30 | | |
| sd-094 | 其餘（This Heat … Uncle Charlie Osborne） | 30 | | |
| sd-095 | 其餘（Urs Voerkel, Peter K. Frey, Paul Lovens … Wha-ha-ha） | 30 | | |
| sd-096 | 其餘（White Heaven … Zoviet France） | 30 | | |
| sd-097 | 其餘（Zoviet France … Gare du Nord） | 30 | | |
| sd-098 | 其餘（Geoff Mann … Raw Deal） | 30 | | |
| sd-099 | 其餘（Red Summer … Smasher） | 23 | | |
