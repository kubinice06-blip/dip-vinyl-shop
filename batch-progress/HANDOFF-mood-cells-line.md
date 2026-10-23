# 情緒薄格策展線交接（頹靡 md／冷冽 mc／恍惚 ml；2026-10-22 擴大到各 2,000）

店主 2026-10-22：「可以開始補缺少的頻率了 再策一次計畫」。計畫 `batch-progress/EXPANSION-PLAN-mood-thin-cells.md`（10-22 v2 定案節）。
裁定權已下放（CLAUDE.md「接力任務」）：中途不回報，策展／研究／管線裁定自己定、寫進各批 rulings.md；雲端開 PR 後自己合併（2026-10-21 起）。

## 一、進度

> **2026-10-22 擴大**：店主「新增的專輯數太少了 與雀躍嚴重不平衡」→ 三格**各補到約 2,000**、一批 45 張、**6 個子工作階段並行**、每個 2 批。**場景佇列、條號、狀態改看 `batch-progress/mood-cells-20261022/SCENES.md`**（約 80 批）；下表只留 md1–md4 的落格紀錄。調度的工作階段每輪從 SCENES.md 指派批號，子工作階段只做被指派的批。


| 批 | 場景 | 目標格 | 狀態 |
|---|---|---|---|
| md1 | dark ambient／drone／工業 drone | 頹靡 | ✅ 2026-10-22 上線 45；落頹靡 43/45＝95.6%（2 張落恍惚：Basinski、Belong 色溫判中性） |
| md2 | slowcore／sadcore 二線＋dark jazz | 頹靡 | ✅ 2026-10-22 上線 45；落頹靡 41/45＝91.1%（4 張乾編制 sadcore 落平靜：Arab Strap ×2、Germano、Songs: Ohia） |
| md3 | darkwave／goth 慢盤＋無鼓 drone metal／funeral doom | 頹靡 | ✅ 2026-10-22 上線 45；落頹靡 44/45＝97.8%（Ulver《Shadows of the Sun》弦樂＋鋼琴判輕落平靜） |
| md4 | 暗色嘻哈／cloud rap／暗 R&B＋dub techno＋亞洲 | 頹靡 | ✅ 2026-10-22 上線 43（候補挖不到 45）；落頹靡 39/43＝90.7%（Tirzah、HTDW、sogumm 色溫判微溫落恍惚；The Bug vs Earth 兇＋拍落亢奮） |
| md7 | 冷調 post-rock／鼓少器樂＋冷配樂＋無鼓吉他 drone | 頹靡 | ✅ 2026-10-22 上線 41（場景挖不到 45）；落頹靡 35/41＝85.4%（乾淨鋼琴弦樂配樂與 Labradford 後期判輕落平靜 5、Silver Wheel 色溫中性落恍惚 1） |
| md8 | dub techno／ambient techno 三線（Silent Season、Echocord、Chain Reaction 系） | 頹靡 | ✅ 2026-10-22 上線 41（研究層汰 15、讓 Köner 2 張給 md6）；落頹靡 40/41＝97.6%（Purl《Stillpoint》色溫中性落恍惚） |
| mc1–mc4 | 冷冽線（minimal synth／coldwave、post-punk／no wave、冷爵士、當代古典＋亞洲 synth-pop） | 冷冽 | 待寫 `CUR-DISPATCH-mc.md`（場景見計畫 §2.3） |
| ml1–ml4 | 恍惚線（lovers rock／roots、暖 shoegaze／dream pop、beats／dusty 饒舌、東亞恍惚） | 恍惚 | 待寫 `CUR-DISPATCH-ml.md`（場景見計畫 §2.2；質地尺改判後 dream pop／neo-soul 命中率升到 40%+） |

**條號**：md1 10681–10760、md2 10761–10840、md3 10841–10920、md4 10921–11000、mc1 11001 起每批 80。每批預留：研究 a–e 各 10、鉤子 10、寫作 10、主線 10。
**工作階段**：每個工作階段跑 2 批（WebSearch 200 次共用）。策展 4 組可在同一個工作階段先全派（每組 ≤6 次）。

## 二、每批流程（腳本在 `batch-progress/mood-cells-20261022/`，複製自薄細項線，只差兩處：卡單多 `moodGuess`、研究層要寫聲音事實）

0. 策展：派工讀 `CUR-DISPATCH.md`（md 線）。4 組同時派：「工作目錄 /home/user/dip-vinyl-shop。先完整讀 `batch-progress/mood-cells-20261022/CUR-DISPATCH.md` 並照做。組別：md1。」交件後 `node batch-progress/mood-cells-20261022/build-master.mjs md1` → `master-md1.json`（每批一組，不混組）。主線刪改寫 `master-override.json`（`{drop:[[藝人,盤]], fix:{"藝人|盤":{…}}}`）。
1. **主線挑 45 張**：先跑 **moodGuess 邊距檢查**（下面的指令），貼邊的先汰；再看 MB 回查（type 不是 Album、年份差很多的汰）、同藝人太多的勻一勻。寫 `batch-progress/<批>/pick.json`（`["藝人|盤",…]`），`node batch-progress/mood-cells-20261022/build-cards.mjs <批> <pick.json> <master>`；建 `batch-progress/<批>/rulings.md`（檔頭格式照 `batch-progress/add-20261022-ts6/rulings.md`，條號照上表）。
   ```
   # 頹靡 md：x<=2.7&&y>=0.8&&z<=-0.3　冷冽 mc：x>=3.3&&y<=0.2&&z<=-0.3　恍惚 ml：x<=2.7&&y>=0.8&&z>=0.3
   node -e 'const m=require("./batch-progress/mood-cells-20261022/master-md5.json");for(const a of m){const g=a.moodGuess||{};const ok=g.x<=2.7&&g.y>=0.8&&g.z<=-0.3;if(!ok)console.log("貼邊/出格",a.artist,"|",a.album,JSON.stringify(g))}'
   ```
2. 研究層 5 支 Sonnet：「工作目錄 /home/user/dip-vinyl-shop。先完整讀 `batch-progress/mood-cells-20261022/RES-DISPATCH.md` 並照做。批名：<批>；組別：a。」同時背景跑 `node batch-progress/mood-cells-20261022/meta.mjs <批>`。
3. 研究交件後：看報告裡「moodGuess 存疑」的卡——聲音跟預估不符的**直接汰換**（補候補），不要硬留；照研究層推翻的改卡單 → `cd desc-tools && node qa-batch.mjs research <批>`。
4. 鉤子 2 支 Opus（a–c、d–e）讀 `HOOK-DISPATCH.md` → `qa-batch hooks`、`chk-hook-crossgroup`、`merge-writer-input.mjs <批> --split=2`。派工加一句：媒體名與媒體榜單名次不進正文。
5. 寫作 2 支 Opus 讀 `WRITER-DISPATCH.md` → `qa-batch out`、`qa-check-research`、`fix-spacing`。派工加：「note 裡的媒體名與媒體榜單名次整句不寫，不要只換掉媒體名；不用『據說／據傳』」。
6. 主線：試聽（`preview-override.json` → `picks.mjs`）、封面（人工身分卡一定要 `covers.json`；上線前 **live-check 每張封面 URL**，CAA 原圖 500 就換 `/release/<id>/<imgid>-500.jpg` 縮圖或 Apple／Discogs）、三軸（冷門軸錨點制 §0.8，`ratings-override.json`）、逐張審稿（媒體年終榜整句刪、「據說」刪、單源評價句刪）→ `build-manifest.mjs <批>` → `scripts/verify-album-onboarding.mjs`。
7. 寫入照 `REMOTE_RUNBOOK.md` 與 ts11 先例：`cp` manifest 到根目錄 → `publish-manifest`（乾跑）→ `push-card-catalog-patches publish-stage/<manifest 名>/card-catalog-patches.json` → `kv-token-check` → `kv-from-manifest` → `wrangler@4 kv bulk put … --remote` → `verify-wave-kv` → `--write-preview` → `build-apple-audio-runtime-map` → `--write-pool` → `build-seed-genres` → `mark-manifest-published --catalog --kv --preview` → `verify --published`。
8. 子曲風：`node batch-progress/mood-cells-20261022/warm-batch.mjs https://dip-vinyl-worker.kubinice06.workers.dev <批>` → `build-genre-tree.mjs --pull --write` → `build-draw-covers.mjs --pull --write`。標籤推不出節點的藝人寫進 `genre-l3-artist-map.json`。
9. **情緒評分（這條線的驗收）**：上線當天建 `batch-progress/mood-axes/score-<批>/`（照 `score-md/` 的 select／DISPATCH／merge 與 `score-md34/landing.mjs`），代理照 `score500/BRIEF.md` 打分（**含 10-22 的兩條新規則**）→ merge 出 `scored-<批>.json` → `build-priors.mjs`（**2026-10-22 起自動讀所有 `score*/scored-*.json`，不要改它**）→ `build-scale.mjs v0` → `scripts/build-card-moods.mjs` gate 綠。
   **算落格率＝落目標格張數／上線張數，寫進該批 rulings.md 與本檔進度表**。低於 40% 的場景下一批換場景；低於 30% 的線停下來回報店主。
10. 藝人介紹：**6 個並行時子工作階段一律不切**（roster 與 ar-d 編號會互撞）；在該批 rulings.md 末尾列出「本批新藝人（無介紹）」名單即可，調度的工作階段每輪收尾統一切批。藝人介紹由店主另開對話寫。
11. PROJECT_MEMORY → 逐檔 git add → commit → push → 開 PR → **合併前照第三節處理衝突** → 自己合併 → 退訂 PR → 在 SCENES.md 該列寫 `✅ 上線 N／落格 M`（同一個 PR 裡）。

## 三、6 個並行的合併規矩（2026-10-22）

同時有 6 個工作階段在寫同一批共用檔，合併前一定 `git fetch origin && git merge origin/main`，衝突照下面處理，**不要手改產生檔**：
- `PROJECT_MEMORY.md`、`SCENES.md`、本檔：兩邊都留（SCENES.md 各改各的列，不會真的撞同一行）。
- `seed_cards.json`、`card-preview-status.js`、`data/apple-audio-map-v1.json`：取 origin/main 版（`git checkout --theirs`），再對**自己的** manifest 重跑 `publish-manifest.mjs <manifest> --write-preview`、`--write-pool`（冪等，只補自己的列），然後 `build-apple-audio-runtime-map.mjs`、`build-seed-genres.mjs`。
- `data/mood/*.json`、`batch-progress/mood-axes/{priors,scale}-v0-report.json`：取 origin/main 版，重跑 `build-priors.mjs` → `build-scale.mjs v0` → `scripts/build-card-moods.mjs`（會把兩邊的 `score*/scored-*.json` 都讀進來）。
- `genre-tree.json`、`card-subgenres.json`、`draw-covers/*`：取 origin/main 版，重跑 `build-genre-tree.mjs --pull --write`、`build-draw-covers.mjs --pull --write`。
- `genre-l3-artist-map.json`、`rock-asia-country-map.json`：兩邊的鍵都留（JSON 合併後 `node -e` 驗一次能 parse）。
- 重跑完再 `scripts/verify-album-onboarding.mjs <自己的 manifest> --published` 與 mood gate，都綠才推。

## 四、坑（沿用薄細項線）
- md1／md2 實跑（2026-10-22）：研究層聲音存疑是真的有用——md2 汰 7 張（鼓機／碎拍／synthwave）、md1 汰 4 張（KTL、Kreng、Desiderii、Hecker 有拍又兇），補位從 master 候補同位置替入、再派一支補研究 append 進各組檔（qa-batch 只認 a–e 五組，不要開第六組）。上線後評分 84/90 落格，遠高於預估；下一批可以把 45 張的 20% 汰換額度降到 10%。
- 評分工單 `batch-progress/mood-axes/score-md/`（select／merge 仿 score-ts2；`build-priors.mjs` 來源層已加 `scored-md.json`），md3／md4 直接 `select.mjs <批>` 切 chunk、派 Opus 照 BRIEF 打分、`merge.mjs` → priors → scale v0 → `build-card-moods`。
- 藝人介紹切批用 `cut-artist-intros.mjs`（已改成讀 `onboarding-manifest-add-2026102?-md?-*.json`，批序 md1→md4），md3／md4 上線後再跑一次會接著切 ar-d-138 起（冪等，roster 已有的鍵不重加）。
- 乾編制 sadcore（Arab Strap、Lisa Germano、Songs: Ohia 那型）質地判輕落平靜；slowcore 要收霧狀 lo-fi／doomgaze 與 dark jazz 才落頹靡。
- 容器會重啟：派工都加「每做完 N 筆寫檔」「已有內容就接續」；代理腳本放各自的 scratchpad 子資料夾。
- `push-card-catalog-patches` 要吃 `publish-stage/<manifest 名>/card-catalog-patches.json`，不是 manifest。
- Apple 專輯搜尋常回空：走 `entity=musicArtist` → `lookup?id=<artistId>&entity=album`。
- 同名藝人上線前查 `data/artist-intros`（Carl Perkins 先例）。
- 正文不點名資料平台、媒體名、媒體年度榜——寫作層仍會漏，主線審稿要掃。
- 封面上線前 live-check（ts10／ts11 各換過 1–2 張 CAA 500）。
- md3／md4 實跑（2026-10-22）：研究層汰 md3 7 張（真鼓＋兇：Rundle ×2、Chelsea Wolfe《Ἀποκάλυψις》、Cindytalk、Locrian、Okovi；Eurodisco：Medusa）、md4 9 張（拍子推進：Revelator、False Idols、The Ooz、King Night、秘神、Topdown；暖：Will I Dream；輕：腰；無來源：BONES），各回頭叫原策展代理補 7–10 張候補（SendMessage 續跑同一支，不用重讀派工）、再派一支補研究 append 進各組檔。**md4 暗 R&B 的色溫是最大風險**（出格 4 張有 3 張是色溫判微溫），下一輪同場景只挑明顯陰冷的，lo-fi R&B 不要再提。有鼓的 goth／darkwave（Zola Jesus、Chelsea Wolfe《Pain Is Beauty》、Anna von Hausswolff）評分都留在靜，鼓機推進但無攻擊性照新規則確實判靜。
- 同時開兩個工作階段各跑兩批會撞：`ar-d-137` 兩邊都切（本線改切 `ar-d-138`）、`build-priors.mjs` 來源層各加一行（兩行都留）、`seed_cards.json`／`card-preview-status.js`／`data/apple-audio-map-v1.json` 兩邊都 append（取 main 版再對自己的 manifest 重跑 `--write-preview`／`--write-pool`，腳本會略過已有的列）、`genre-l3-artist-map.json` JSON 層合併、樹／抽卡封面／mood 檔全部重建。`cut-artist-intros-md.mjs` 接批名參數、冪等。
- ml1／ml2 實跑（2026-10-22，恍惚線第一輪）：**策展前先查池中同藝人已評分的三軸**——lovers rock／rocksteady 池中 y 多 <0.5、dream pop 池中 z 常中性偏冷，策展層的 moodGuess 在這兩處都偏樂觀。主線兩輪汰換＋叫策展代理補「濕混音人聲盤」「明顯溫熱的慢盤」後，ml1 35 張落恍惚 34（97%）、ml2 39 張落 33（85%）；張數不足 45 照實上架。ml2 出格 4 張判輕全是原聲吉他／民謠成分（Bibio、Helado Negro、Hawley《Lowedges》），dream pop／dream folk 線把「原聲吉他為主」當反例。評分工單 `batch-progress/mood-axes/score-ml12/`（select 改成自動讀所有 `score*/scored-*.json`）。
- mc1／mc2 實跑（2026-10-22，冷冽線第一輪）：冷冽線的研究汰換率遠高於頹靡線——mc1 策展 47 汰到 22（研究層一查就偏暖／偏厚：樂團後期往 pop 或擴編走的盤）、mc2 31 汰到 15。落格 mc1 17/22（77%）、mc2 8/15（53%）。**評分對「吉他＋鼓機」冷浪潮與 post-punk 的 y 比策展估高 0.6–1.0（BRIEF 表 post-punk＝+1），中速 minimal synth 的 x 比估值低 0.3–0.4**；冷冽線策展邊距建議 x ≥ 3.6、有失真吉他的一律 y 估 +0.3 起跳。吉他樂團場景（mc21 post-punk revival）預期低命中，優先排電子類。
- md7／md8 實跑（2026-10-22）：**跨工作階段撞卡**——md8 候補時對 origin 各分支去重為 0，但 md6 之後才收進同兩張（Thomas Köner《Kaamos》《Aubrite》），上線時 KV／card_catalog 互蓋。**寫 card_catalog／KV 前再對 origin 所有 `claude/*` 分支的 seed 跑一次去重**（`git show <br>:seed_cards.json`）；撞了就讓給場景正位的那批，並用對方 manifest 重推 card_catalog 與 KV（`publish-manifest` 乾跑產 patches → `push-card-catalog-patches` → `kv-from-manifest` → bulk put → `verify-wave-kv`）。冷調 post-rock／配樂場景的風險在**質地**（乾淨鋼琴弦樂配樂判輕落平靜），不在能量；dub techno 三線研究層汰 15 張（暖 reggae 人聲、new age、舞池拍、EP）後落格 98%。CAA 原圖常連續 500：rg `front-500`、release `-500.jpg` 也可能同時 500，最後改 Apple 官方圖。
- md9／mc9 實跑（2026-10-22，第 2 輪）：**兩個大場景都比預期小**——md9 策展 51、主線汰 15、研究汰 13 → 上線 23（落頹靡 23/23）；mc9 策展 55、主線汰 30、研究汰 13 → 上線 12（落冷冽 9/12）。trip-hop／Bristol 與暗 R&B 主盤已在池，二線多帶暖（靈魂、爵士放克、情歌）或兇拍（drill'n'bass、Scorn 後期）；80s synth-pop 二線**多半是真鼓＋吉他＋管樂的樂團編制**，研究層一查就判重或判暖。主線汰換靠「池中同藝人已評分三軸」最有效（Yello、Telex、DAF、Wire、P-Model 都是池中值先擋下）。冷冽剩下的風險是中速 synth 的 x（出格 3 張全是能量判靜），下一批冷冽建議排純電子場景（mc6、mc7、mc5 純電子那半）。mc10、mc20、md17 已併入，不再單獨派。
- mc5／ml9 實跑（2026-10-23，第 2 輪）：mc5 策展 65、主線汰 30、研究汰 19 → 上線 16（落冷冽 11/16）；ml9 策展 71、主線汰 20、研究汰 18 → 上線 33（落恍惚 33/33）。**日本 techno-pop 二線跟 80s synth-pop 一樣多是樂團編制**（P-MODEL 中期、ヒカシュー、一風堂、立花ハジメ 全有真鼓＋吉他／薩克斯風），J-pop 甜人聲判暖（Perfume 池中錨點 z +0.4），日本 techno 二線多帶 funk／deep house 暖；能留的只剩極簡 techno（田中フミヤ、石野卓球 TITLE）與 glitch，而 **glitch／IDM 的 x 評分常落 2.4–2.9（青木孝允 SILICOM 兩張判靜）**。冷冽線剩下的大池子只剩 mc6／mc7 的四拍 techno，glitch 與 IDM 要當 x 風險看。**恍惚線 dub 的關鍵是池中三軸先擋**：器樂 dub 色溫往 0 收（Scientist、Jah Shaka、Yabby You 全偏冷），只收有旋律／人聲的暖盤；人聲盤要 Junjo／Channel One／King Tubby's 的類比濕混音（Levy 1979–85、Minott Black Roots），研究層查「是否數位、是否快」再汰——結果 100% 落格。mc17、mc25、ml25 已併入，不再單獨派。
