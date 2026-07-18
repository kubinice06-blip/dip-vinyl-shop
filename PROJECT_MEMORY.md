# dip vinyl 專案備忘錄

> 這是 `dip-vinyl-shop` 與 `dip-vinyl-worker` 共用的長期記憶。
> Claude 開始工作前必須先讀完本檔；任何檔案改動完成前必須追加一筆紀錄。

## 使用與維護規則

1. 開始工作前先讀本檔，並以「目前狀態」與「既定決策」為準。
2. 有修改檔案時，在「逐次改動記錄」最上方新增一筆；純讀取或分析不記。
3. 每筆至少記錄：日期、repo、改動摘要、主要檔案、驗證結果。
4. 紀錄的是使用者看得懂的成果與重要技術決策，不要只貼 commit message 或 diff。
5. 撤回或修正舊改動時新增一筆，不改寫舊紀錄，讓決策過程可追溯。
6. 備忘錄要在 commit 前更新；commit hash 可從同一時段的 Git 歷史查得，不必為了回填 hash 再製造一個 commit。
7. 若同一項工作同時改到兩個 repo，合併成一筆並分別列出檔案與驗證。
8. 「歷史改動摘要」不能代替逐次日誌；同一天有多個獨立 commit／工作項目時，必須逐筆記錄，不可只寫成一個籠統總結。
9. Claude 與 Codex 交替協作時，每次開工先對相關 repo 執行 `git fetch origin`、`git status --short`、`git log --oneline HEAD..origin/main`、`git diff --name-status HEAD..origin/main`，確認本機與遠端新增／修改／刪除項目；工作區乾淨且遠端領先才用 `git pull --ff-only` 同步。
10. 正式提交前再次 fetch 並確認遠端沒有工作期間的新提交；若有分歧或重疊，先保留、理解並整合對方工作，不得直接覆寫。

建議格式：

```md
### YYYY-MM-DD｜短標題
- Repo：`dip-vinyl-shop` / `dip-vinyl-worker`
- 改動：完成了什麼，以及重要行為或決策。
- 主要檔案：`path/to/file`
- 驗證：執行了什麼，結果如何。
```

## 目前狀態（基線：2026-07-16）

### 儲存庫與版本基線

- `dip-vinyl-shop`：靜態前端、後台與遊戲頁面；`main` 基線為 `b25a022`，從 2026-04-29 到 2026-07-15 共 467 次提交。
- `dip-vinyl-worker`：Cloudflare Worker API；`main` 基線為 `4234824`，從 2026-05-20 到 2026-07-15 共 62 次提交。
- 兩個 repo 都直接 commit 並 push 到 `origin/main`，不開 PR、不使用 worktree。
- 本基線依 Git 歷史整理；需要逐筆細節時，以各 repo 的 `git log` 為準。

### 系統輪廓

- 前端以原生 HTML、CSS、JavaScript 為主，核心集中在 `index.html`、`admin.html`、`battle.html`、`roguelike.html`。
- Firebase / Firestore 負責商品、會員、卡冊、遊戲設定與玩家進度；Google 登入是玩家身分來源。
- Worker 位於 `dip-vinyl-worker/src/index.js`，目前提供 `/claude`、`/spotify-token`、`/spotify-search`、`/album-genres`、`/bandcamp-search`、`/spotify-artist-albums`、`/spotify-album-link`、`/yt-music-link`、`/yt-album-verify`、`/album-desc`、`/album-rating` 等端點，並使用 KV / Cache 降低重複查詢。
- 商品站、選歌功能、卡冊、單場對戰、無止盡試煉與音樂地圖共用專輯封面、介紹、評分和玩家收藏資料。

### 現行產品與命名

- 首頁商店：新品／二手、曲風與標籤篩選、排序、商品詳情、多圖、購物車與結帳。
- 後台：商品與上下架、多幣別成本、售價、OBI／見本盤等標籤、試聽連結、Banner、Reels、會員、卡牌校正、頂級牌及遊戲參數管理。
- 「歌荒救星」：包含心情選歌、類型挑片、直接抽一張、歷史紀錄與串流平台連結。
- 卡牌收藏：Google 登入、我的卡冊、五階稀有度與殿堂／流亡／異端等頂點卡、分享圖、特殊抽卡券。
- 「品味生死鬥」是入口頁；`battle.html` 為單場對決，`roguelike.html` 為「無止盡品味試煉」。
- 三項卡牌屬性目前為冷門度、經典度、硬蕊度；戰鬥中的簡稱使用「硬蕊／硬」，不要再改回「入耳難易度／入耳／入」。
- Roguelike 的「遺物」已正式改名為「發燒配件」；有解鎖、最多三件出戰、跨趟耗損、現金與趟間保養機制。
- `music-map.html` 與 `music-map-widget.js` 依永久收進卡冊的專輯建立音樂地圖，跨曲風專輯可同時計入多個節點，並與探索獎勵及玩家收藏連動。

## 歷史改動摘要

### 2026-04｜商店與後台成形

- 建立商店首頁與管理後台，接上商品新增、編輯、刪除／下架流程。
- 加入曲風列、卡片標籤、新品／二手分頁、數位典藏、排序與商品詳情。
- 商品圖片改用 Cloudinary，支援多圖上傳、拖曳排序與前台輪播。
- 加入購物車、結帳、首版標籤，以及商品視窗內加入購物車。

### 2026-05｜選歌體驗、分享與 Worker 分工

- 後台補齊價格、成本、建議售價、NEW／見本盤／OBI 標籤、試聽連結、Discogs 價格搜尋與 Reels 管理。
- 建立「心情選歌」，反覆調整推薦多樣性、專輯真實性驗證、Spotify 封面配對、結果文案、再一張、歷史紀錄與 9:16 分享圖。
- 曾開發 Music Akinator，之後於 `f963eb2` 完整移除；不要把它視為現行功能。
- 建立「類型挑片」，加入曲風、年代、地區與深度／快速模式，並整合庫存、Reels、Spotify、YouTube Music 等結果來源。
- 建立自訂網域、OG 圖、hash 路由、首頁 Banner 管理及品牌圖像調整。
- 拆出 `dip-vinyl-worker`，讓 AI 推薦與 Spotify／YouTube 等外部服務透過 Worker 執行，並加入錯誤處理、限流、串流與快取。

### 2026-06｜PWA、卡冊與卡牌對戰

- 選歌頁改為內嵌分頁，加入 PWA、首頁 hub、紀錄展開與專輯／串流資訊。
- Worker 加入專輯介紹與三維評分，封面搜尋改走 Spotify，並陸續加入 Bandcamp、YouTube 驗證及跨語言比對。
- 建立 Google 登入與「我的卡冊」；收藏卡保留抽卡當下資料，卡牌目錄與玩家擁有狀態分離。
- 稀有度發展為普通、稀有、獨特、史詩、傳奇五階，另有殿堂、流亡、異端頂點卡及特殊抽卡券。
- 後台加入會員管理、卡牌人工校正、頂級牌指定與 Firestore 權限收緊。
- 完成 PvE 卡牌對戰的品味氣勢制、相生相剋、半公開讀心、王牌反制、戰績、戰利品與手機版面。
- 建立 `CARD_GAME_DESIGN.md` 與 `ROGUELIKE_DESIGN.md`，並完成 Roguelike beta：選流派、種子專輯、局內／局外雙層經驗、無限賽局和局末收卡。

### 2026-07｜正式卡池、Roguelike 深化與音樂地圖

- 一般卡池先擴至 13,055 張，經人工精選與複驗後定為 5,526 張；對戰與 Roguelike 接上正式卡池及頂級卡池。
- 強化卡片 ID、封面／簡介重試、Firestore 失敗備援、稀有度外框、後台分頁和頂級牌批次入庫。
- Roguelike 加入難度曲線、隱形 DDA、樂歷、反輾壓、傳說藏家、像素角色、出牌動畫、發燒配件及其耗損／保養經濟。
- 大量修正桌面與手機戰鬥版面、卡牌堆、對手提示、相剋圖、檯面卡和攻防勢資訊排列。
- 將「入耳難易度／入耳」正式改為「硬蕊度／硬蕊」，Worker 評分欄位的中文顯示同步更新。
- 建立 Roguelike 實際遊玩檢查與平衡紀錄 `ROGUELIKE_PLAYTEST.md`。
- 曾加入像素戰鬥介面預覽，隨即以 `cae1b4c` 撤回；現行介面不包含該預覽。
- 新增音樂地圖預覽、探索獎勵、玩家收藏串接及手機標籤可讀性修正；Worker 新增專輯曲風查詢。
- Worker 完成 75 張華語卡片的人工專輯簡介，並持續修正 CJK 名稱、封面誤配、Spotify 限流空結果污染與 AI 事實性。

## 既定決策與工作提醒

- 修改前先確認 `git status`，不得把使用者既有或無關變更一起提交。
- `dip-vinyl-shop/CLAUDE.md` 規定：`git reset`、`git revert`、`winget install` 必須先在中文對話取得「可以」；一般 commit / push 不需事先詢問。
- 前端多個大型頁面仍是單檔 HTML；改共用戰鬥規則時，要同步檢查 `battle.html`、`roguelike.html` 與設計文件是否一致。
- 封面、專輯介紹、評分、曲風等資料有多層快取；修改查詢或配對邏輯時要考慮快取版本與舊錯誤資料污染。
- 商品、玩家卡冊、`card_catalog`、遊戲設定與進度都是既有資料；變更 schema 時需保留向後相容或補值策略。
- 行動版使用 `100dvh` 與緊湊戰鬥佈局；視覺修改至少檢查窄螢幕不裁切手牌、提示、牌桌與數值列。

## 逐次改動記錄（新到舊）

### 2026-07-18｜P9b 重做唱片櫃唱盤機與卡片播放互動

- Repo：`dip-vinyl-shop`
- 改動：唱片收藏移除卡片／木紋唱片櫃雙檢視與整組木架 HTML/CSS，保留乾淨卡片網格及曲風 chips；唱盤機移到 chips 下方、卡片網格上方，畫面只留機體與可點擊停止的唱臂，Spotify／YouTube 改用 P9a 1×1 隱藏掛載。點卡片本體改為封面飛行上盤並立即播放，右上低調 ⓘ 獨立開啟原卡片詳情，鍵盤 Enter／Space 亦可上盤。可見卡片連結以每批 4 張、批間 80ms 預抓。唱片旋轉改由 rAF 維護角度與角速度，播放約 1 秒升到 180°/s、停止約 1.2 秒降至零；換盤保持轉速並播放唱臂快速抬放動畫。唱臂加長、原點與播放角度重畫，針頭落到唱片外緣溝槽。
- 主要檔案：`index.html`
- 驗證：HTML module 語法、`dip-player.js` 語法與 `git diff --check` 通過；靜態回歸確認舊雙檢視／木架／可見播放器抽屜字串全數移除，唱盤排序在網格前、隱藏掛載、卡片播放、ⓘ 詳情、rAF 與 4 張批次預抓均存在；依 270px deck 幾何驗算針頭距唱片中心 72.1px，對齊 74px 外緣溝槽。

### 2026-07-18｜P9a 強化共用播放器的行動裝置自動播放

- Repo：`dip-vinyl-shop`
- 改動：`DipPlayer.mount(container,{hidden:true})` 新增 1×1 畫面外隱藏模式，不使用 `display:none`；掛載即預建 Spotify 控制器與 YouTube Player，第一次可用的 pointer／touch／click 以 mute→play→pause 解鎖 YouTube 音訊。新增 `prefetch()`，同時預抓 Spotify／YouTube 連結並以 artist＋album 記憶體快取去重；`playAlbum()` 優先使用快取，Spotify 起播後等待官方 `playback_started`／`playback_update`，1.5 秒未確認播放便暫停並改走 YouTube。兩平台都確認實際播放後才回報 `playing`，所有失敗仍收斂為 `false`，cache-bust 升至 v2。
- 主要檔案：`dip-player.js`、`index.html`、`battle.html`
- 驗證：`node --check dip-player.js` 與 `git diff --check` 通過；VM 回歸確認隱藏掛載、Spotify 控制器預建、重複預抓只發兩個端點請求、Spotify 看門狗逾時後由 YouTube 起播、`onStateChange` 與 `stop()` 正常。iOS 真機「點一下 1 秒內出聲」及首次解鎖後非手勢切歌待店主配合驗收。

### 2026-07-18｜P9 音樂體驗改版計畫定稿（店主 iPhone 實測六點回饋）

- Repo：`dip-vinyl-shop`
- 改動：店主真機實測後回饋六點，Claude 整合成 `MUSIC_MAP_PLAN.md` 新章節 P9 供 Codex 執行。重點：①診斷手機不自動出聲的根因是 tap 後的網路來回燒掉 iOS user activation，P9a 以連結預抓＋控制器預建＋首次互動音訊解鎖＋Spotify 起播看門狗（1.5s 沒起播改走 YouTube）解決，並新增播放器隱藏模式（1×1 off-screen，不可 display:none）；②P9b 唱片櫃移除雙檢視切換、唱盤機去文字移到最上方、點卡片＝上盤自動播（原卡片詳情改小 ⓘ 圖示）、唱臂修圖讓針頭落在唱片上、rAF 角速度緩升緩降＋唱臂緩入緩出；③P9c 對戰移除播放器抽屜、改回合結算播「勝方」專輯（平手不換曲）、VS 下方空白處放約 44×30px 迷你像素唱盤（轉動＋音符動畫、點擊＝喇叭開關）；④P9d roguelike 同機制接入、喇叭偏好共用 `dipBattleMusic` 鍵。全章節以「手機版面不得推擠、100dvh 不變」為最高原則，每階段固定 390×844 量測。
- 主要檔案：`MUSIC_MAP_PLAN.md`
- 驗證：純計畫文件；執行順序 P9a→P9b→P9c→P9d，每階段獨立 commit+push＋備忘錄。

### 2026-07-18｜音樂地圖 2.0 全系列（P1–P7）正式上線；Gate 2 抓到並修正曲風排序缺陷

- Repo：`dip-vinyl-worker`、`dip-vinyl-shop`
- 改動：依三道 gate 完成部署。Gate 1：worker push＋deploy。Gate 2 驗收**首輪 3/4 FAIL**，查出兩個 worker 真 bug 並由 Claude 當場修正（commit `055c066`）：①`musicMapGenres` 固定規則順序取前二，pop／blues 排最後永遠被擠掉（竹内まりや city pop 變 soul+hiphop、B.B. King 變 rock+hiphop）→ 改為依「命中標籤數」計分排序、平手保留規則序；②Last.fm 藝人 tag fallback 只在專輯 tag 全空時觸發，垃圾標籤（五月天回「Chinese 2008」）會卡住 → 改為「對映結果為空」就追加藝人 tag。錯誤結果已入快取，KV 鍵升版 `mapgenre3:` 清除污染。重測四案例全 PASS：五月天→[rock,pop]、竹内まりや→[pop,soul]、B.B. King→[blues,rock]、Taylor Swift→[pop,electronic]。Gate 3：shop 11 個 commit push 上線（`4ac4e07..f720bc4`）。
- 主要檔案：`../dip-vinyl-worker/src/index.js`（musicMapGenres 計分、Last.fm fallback、mapgenre3）；shop 為既有本機提交鏈整批發布
- 驗證：worker 離線單元測試 23/23（含三組實戰 tag）；`verify-music-map.mjs` 4/4 PASS；wrangler deploy Version `8faa2910`；Pages 部署確認 widget v12 上線。手機版 390×844 逐頁量測（依店主指示加強）：music-map（無橫向捲動、十路徑、100 節點、示範地圖、點路徑開封面牆、軸高亮）、pvp（compact 前四路徑）、battle（100dvh=844 完整、收合抽屜 y=48–79 只蓋大廳框不壓手牌、喇叭鈕開關與 localStorage 記憶正常）、首頁（dip-player 載入、僅既有 main-tabs 水平捲動容器超寬屬原設計）、roguelike 正常，全部頁面 console 零錯誤。待真帳號驗收：登入後全量重建 v2、Spotify/YouTube 實際出聲、分享圖 Web Share。

### 2026-07-17｜收斂音樂地圖與播放器上線前 Medium／Low 項目

- Repo：`dip-vinyl-shop`
- 改動：依交叉檢驗清單完成非阻斷問題。曲風封面牆改為每批最多 8 張並行、批間 100ms，切換路徑時以 request token 在批次前後與等待後停止舊工作，避免大收藏一次爆發數百個 Firestore／Worker 請求。`DipMusicMap` 匯出唯一的 `levelRatio` 與 marks，分享圖移除重複公式並直接共用；示範資料調為 484 點，不超過 278 張已分類專輯的 556 點上限。外圈節點中心距改 9.5px、半徑改 4px，留出 1.5px 邊緣間距。新唱片櫃的 cover、card id、artist、album 與唱盤文字加入 HTML escape。手機戰鬥播放器改在頂欄下方以 `max-height` 收合，標題按鈕保持可見且不再覆蓋右下手牌。widget cache 升至 v12。`MUSIC_MAP_PLAN.md` 修正線性 commit 鏈的發布說明，加入 Worker→四案例驗收→Shop 三道硬 gate；新增 UTF-8 Node 驗收腳本，取代容易破壞 CJK query 的命令列 curl。
- 主要檔案：`music-map.html`、`music-map-widget.js`、`pvp.html`、`index.html`、`battle.html`、`MUSIC_MAP_PLAN.md`、`verify-music-map.mjs`
- 驗證：四個 HTML module、widget 與驗收腳本 Node 語法通過；離線測試確認 18 張封面最大並行 8、批間兩次 100ms、示範 484/556、levelRatio 單一來源、escape 輸出與兩處 v12 cache。browser skill 本機實測：390px 地圖 100 節點、邊緣間距 1.5px、文字零裁切、無橫向捲動；1280px 地圖零裁切／console error。390×844 戰鬥頁收合抽屜位於 y=48–79、與 y=713 起的手牌不重疊，展開後高度 111px、`aria-expanded=true`、`100dvh` 仍為 844px；1280px 固定抽屜不改 900px 戰鬥高度且 console 無 error。`git diff --check` 通過。因整串 commits 仍含待額度重置的 P1，本階段只本機 commit，不 push、不 deploy。

### 2026-07-17｜防止音樂地圖重建以暫時失敗清空曲風

- Repo：`dip-vinyl-shop`
- 改動：依上線前交叉檢驗修正高風險資料污染。`genres()` 現在以 `null` 區分網路錯誤、非 2xx、JSON 錯誤或回應 schema 異常，與成功查無曲風的 `[]` 不再混用；重建遇到失敗，或既有有效 `mapGenres` 卻突然查回空陣列時，保留舊標籤且不執行卡片 `setDoc`。任一批有此情況便中止本輪，不寫入最終 `musicMap.version: 2`，避免暫時性限流資料被標成 healthy 後永久保留；不加入自動重試迴圈。
- 主要檔案：`music-map.html`
- 驗證：HTML module Node 語法通過；離線 VM 測試涵蓋成功有標籤、成功確定無標籤、HTTP 500、fetch throw、JSON throw、缺少 genres schema，以及既有標籤遇空結果；確認所有暫時失敗均不清空卡片、不寫入 schema v2，正常空結果仍計入 untagged；8 張 `Promise.all` 與 200ms 批間隔保持不變，`git diff --check` 通過。依額度限制仍只本機 commit，不 push、不 deploy。

### 2026-07-17｜修正 PVP 地圖讀取 schema v2

- Repo：`dip-vinyl-shop`
- 改動：全階段回歸時發現 `pvp.html` 的共用 widget 已升版，但個人地圖讀取條件仍殘留 `musicMap.version === 1`，導致 P1 schema v2 上線後 PVP 入口會誤顯示尚未同步；改為只接受 v2，並全域搜尋確認前端不再殘留 v1 判斷。
- 主要檔案：`pvp.html`
- 驗證：PVP module Node 語法通過；全站搜尋無 `musicMap.version === 1` 殘留，schema v2 靜態斷言與 `git diff --check` 通過。修正仍位於待上線 P1 的本機提交鏈上，不提前 push。

### 2026-07-17｜P7 對戰出牌串接專輯音樂

- Repo：`dip-vinyl-shop`
- 改動：`battle.html` 引入共用 `dip-player.js`，只在玩家自己的出牌已被主流程接受後 fire-and-forget 播放該卡專輯，對手牌不觸發；頂欄新增預設開啟的喇叭切換並以 `dipBattleMusic` 保存至 localStorage，關閉時停止現有播放且後續出牌不呼叫播放器。Spotify／YouTube 控制面板收在固定於戰鬥區角落的小抽屜，不參與版面流、保留原 `100dvh` 一屏高度；找不到連結、播放器未就緒或 Promise 拒絕都靜默收起，不影響出牌與結算。
- 主要檔案：`battle.html`
- 驗證：battle module 與 `dip-player.js` Node 語法通過；VM 測試確認音樂關閉時播放器呼叫為 0、開啟時玩家出牌恰呼叫一次，靜態驗證確認唯一 hook 為 `playBattleAlbum(pCard)`、無對手 hook、無 `await`、固定抽屜與 `100dvh` 保留，手機寬度隱藏 beta 避免頂欄擠壓；`git diff --check` 通過。因 commit 仍以待上線 P1 為祖先，本階段先本機 commit、不提前 push。

### 2026-07-17｜P6b 加入曲風唱片櫃與像素唱盤

- Repo：`dip-vinyl-shop`
- 改動：唱片收藏新增全部、十種曲風與未分類篩選，並提供原卡片／木製唱片櫃雙檢視；唱片櫃手機版維持兩欄。頁面下方新增像素唱盤、換盤飛行動畫、旋轉唱片與唱臂狀態，點唱片即以 P6a 共用播放器播放，點唱臂可停止，Spotify／YouTube iframe 收進可展開的控制抽屜；播放查找失敗時唱臂退回且不阻塞收藏操作。
- 主要檔案：`index.html`
- 驗證：HTML module 與 `dip-player.js` Node 語法檢查通過；靜態驗證涵蓋十一個篩選 chip、雙檢視、共用播放器掛載／播放／停止、唱盤狀態與 `max-width:520px` 兩欄手機結構；`git diff --check` 通過。因 commit 仍以待上線 P1 為祖先，本階段先本機 commit、不提前 push。

### 2026-07-17｜P6a 建立共用專輯播放器模組

- Repo：`dip-vinyl-shop`
- 改動：新增全站共用 `dip-player.js`，提供 `DipPlayer.mount(container)`、`playAlbum({artist,album})`、`stop()`、`onStateChange(cb)`。播放時先呼叫既有 `/spotify-album-link` 取 album id，延遲載入 Spotify iFrame Embed API 並 `loadUri`／播放；解析或控制器失敗時改呼叫 `/yt-music-link`，建立可見的 YouTube playlist／video embed。所有網路、API、播放器與瀏覽器限制錯誤一律收斂為 `false`，不 throw；以 request token 防止快速換盤的舊請求蓋過新請求，`stop()` 同時取消待播、暫停 Spotify 與清空 YouTube。
- 主要檔案：`dip-player.js`
- 驗證：Node 語法與 VM 整合測試通過；模擬 Spotify controller 建立／播放、YouTube playlist fallback、無連結、網路 throw、無效輸入、快速停止與 state callback 均符合預期；`git diff --check` 通過。因 commit 仍以待上線 P1 為祖先，本階段先本機 commit、不提前 push。

### 2026-07-17｜P5 音樂地圖成長動畫與示範空狀態

- Repo：`dip-vinyl-shop`
- 改動：地圖資料更新時以固定十點 SVG path 進行 650ms 數值補間，形狀由舊等級平滑長到新等級；首次讀入玩家資料會由中心展開。新跨過的外圈節點各自播放一次 pulse，並尊重 `prefers-reduced-motion`。未登入時不再顯示全零圖，改用固定的十路徑非零示範資料並清楚標註「示範地圖」，登入與分享狀態仍保持隔離。元件快取升至 v11。
- 主要檔案：`music-map-widget.js`、`music-map.html`、`pvp.html`
- 驗證：widget／module Node 語法通過；以 jazz 7、rock 60、pop 500 模擬更新，確認 path／十個 dot 補間無 NaN 且 18 個新跨越節點觸發 pulse；靜態檢查確認非零 demo、示範標示、reduced-motion 分支與 v11 快取同步；`git diff --check` 通過。因 commit 仍以待上線 P1 為祖先，本階段先本機 commit、不提前 push。

### 2026-07-17｜P4 音樂地圖節點獎勵、稱號與分享圖

- Repo：`dip-vinyl-shop`
- 改動：音樂地圖載入後集中結算每條路徑 7、30、120、500 張里程碑，以 Firestore transaction 同步更新 `musicMapRewards` 已領清單並沿用唱片櫃既有 `specialDraws` 陣列補發 `random3` 特殊抽卡券，避免重整或多分頁重複發券；補發時顯示脈衝 toast。十類曲風加入 7 張探索者、60 張行家、500 張藏家傳奇稱號並顯示在側欄。新增 1080×1920 PNG 分享圖，包含十階地圖、總收藏、最強三條路徑與稱號、dip logo，支援手機 Web Share，無檔案分享能力時下載。元件快取升至 v10。
- 主要檔案：`music-map-widget.js`、`music-map.html`、`pvp.html`
- 驗證：widget 與 module Node 語法通過；稱號 6／7／60／500 邊界測試通過；模擬交易第一次補發 4 張、第二次 0 張，確認 rewards ledger、`random3` ticket schema 與冪等性正確；靜態檢查確認 canvas 1080×1920、logo、十角圖、最強三路徑、Web Share／下載 fallback 齊全；`git diff --check` 通過。因 commit 仍以待上線 P1 為祖先，本階段先本機 commit、不提前 push。

### 2026-07-17｜P3 點音樂地圖路徑展開專輯封面牆

- Repo：`dip-vinyl-shop`
- 改動：完整地圖的十條 SVG 軸與側欄路徑改為可選取控制項；點擊後以 Firestore `array-contains` 查詢玩家該曲風的永久收藏，在地圖下方展開封面牆。封面牆顯示總張數與款數、複本數、藝人、專輯及沿用唱片櫃層級的稀有度框，排序為稀有度優先、再依最後／首次取得時間；卡片既有封面優先，缺圖才呼叫 Worker Spotify 搜尋並回填既有 `coverUrl` 欄位。跨界卡可出現在多條路徑；手機改為單欄卡片列。元件快取升至 v9。
- 主要檔案：`music-map-widget.js`、`music-map.html`、`pvp.html`
- 驗證：四個 module／widget Node 語法檢查通過；互動單元測試確認十條 axis hit、十個側欄按鈕、滑鼠與鍵盤選取及 compact 靜態模式正確；靜態檢查確認 `array-contains` 查詢、總張數含 count、稀有度＋取得時間排序、封面／評分 fallback 與 ≤520px 單欄規則齊全；`git diff --check` 通過。因 commit 仍以待上線 P1 為祖先，本階段同樣先本機 commit、不提前 push。

### 2026-07-17｜P2 音樂地圖改用十階里程碑半徑

- Repo：`dip-vinyl-shop`
- 改動：將音樂地圖成長模型由曲風占比半徑改為固定十階里程碑 `[1,3,7,15,30,60,120,250,500,1000]`；每軸依已完成階數與下一階間進度計算半徑，滿 1000 張封頂，收藏增加時圖形不會因其他曲風成長而縮小。外圈改為每軸十顆節點，側欄保留占比、顯示真實下一節點，滿級改顯示「已滿級」；地圖說明與元件快取同步更新至 v8。
- 主要檔案：`music-map-widget.js`、`music-map.html`、`pvp.html`
- 驗證：0、1、61、999、1200 五組等級半徑公式全數通過；完整、compact、桌面與手機渲染分支皆通過本機測試並確認每張圖為 100 顆節點；本機瀏覽器 1280px／390px 實測皆為十條路徑、無橫向捲動，390px 二十個 SVG 標籤零越界且 console 無 error；Node 語法與 `git diff --check` 通過。因 P2 commit 以尚未上線的 P1 為祖先，為避免 push 時連帶提前觸發 P1 全量重建，本階段先本機 commit，待 2026-07-18 08:15 後與 P1 依序上線。

### 2026-07-17｜P1 音樂地圖資料層十角化（僅本機提交，待額度重置上線）

- Repo：`dip-vinyl-worker`、`dip-vinyl-shop`
- 改動：完成音樂地圖 P1。Worker 曲風對映依固定順序擴為 jazz、rock、electronic、soul、hiphop、folk、classical、world、pop、blues，補齊中英文關鍵字，將 city pop／j-pop／k-pop 歸入 pop、排除 rhythm and blues 誤入 blues，並把 KV 鍵升為 `mapgenre2:`。前端六個同步點改用同一組十類 id；地圖資料升為 `version: 2`、十鍵 credits 與 `untagged`，舊 v1 會判定不健康並以每批 8 張、批間 200ms 的並行查詢重建，同時刷新卡片上的舊曲風結果。三個收卡入口不主動覆寫 schema version，確保尚未重建的 v1 帳號仍會走完整遷移；v2 建立後則持續累加曲風或未分類張數。地圖側欄顯示未分類張數，元件與品味生死鬥引用快取升至 v7。
- 主要檔案：`../dip-vinyl-worker/src/index.js`、`music-map-widget.js`、`music-map.html`、`index.html`、`battle.html`、`roguelike.html`、`pvp.html`
- 驗證：Worker `musicMapGenres()` 本機 29 組案例全過（含全部中文關鍵字、city/j/k/synth pop、blues、rhythm and blues 排除與跨界最多兩類），Worker 與 widget 通過 Node 語法檢查；四個 HTML module script 通過 Node `--check`；v1/v2 健康判斷、十鍵順序、8 張 `Promise.all` 批次、`untagged` 與兩處 v7 快取參數靜態測試通過；本機瀏覽器以 1280px／390px 實測皆渲染十條路徑與二十個 SVG 標籤，手機無橫向捲動或標籤越界，console 無 error；兩 repo 皆通過 `git diff --check`。依 2026-07-17 額度限制指示，本階段只做本機 commit，未 push、未執行 `wrangler deploy`，線上專輯驗收留待 2026-07-18 08:15 後。

### 2026-07-17｜音樂地圖計畫補上 KV 額度限制期間的執行時機

- Repo：`dip-vinyl-shop`
- 改動：店主回報目前 Cloudflare KV 寫入額度受限中。更新 `MUSIC_MAP_PLAN.md`：P1（會觸發大量 KV 寫入的資料層十角化）今天只寫程式碼＋本機 commit，不 `wrangler deploy`／不 `git push`，等明天（2026-07-18）台北 08:15 後額度重置再上線；P2–P7 不受影響照常當天推送。新增「給 Codex 的今日工作清單」段落，把上述時序寫成明確步驟與指令，供 Codex 直接照做。
- 主要檔案：`MUSIC_MAP_PLAN.md`
- 驗證：純計畫文件更新，無程式改動。

### 2026-07-17｜音樂地圖 2.0 執行計畫定稿（給 Codex 執行）

- Repo：`dip-vinyl-shop`
- 改動：Claude 檢查現行音樂地圖後與店主確認方向，寫成 `MUSIC_MAP_PLAN.md` 供 Codex 依階段執行。重點決策：①雷達改「里程碑等級半徑」十階制（1→1000，對數式成長，解決上千張收藏也要有成長感）；②八角圖十角化，新增 pop、blues 兩軸，city pop／k-pop／j-pop 改歸 pop，曲風對映補中文關鍵字（五月天→rock 這類）；③`musicMap` schema 升 version 2（十鍵＋untagged），靠 `healthy()` 自動觸發重建完成遷移，KV 鍵升版 `mapgenre2:`；④點路徑看封面牆、節點發特殊抽卡券＋稱號（結算集中在 music-map 頁）、9:16 分享圖、動畫與示範空狀態；⑤新增共用播放器 `dip-player.js`（Spotify iFrame Embed→YT fallback），唱片櫃加曲風篩選＋像素唱盤機播放，對戰出牌也接同一播放器（僅玩家出牌、喇叭鈕可關、不阻塞出牌）。
- 主要檔案：`MUSIC_MAP_PLAN.md`（新增）
- 驗證：純計畫文件，無程式改動；六處曲風 id 清單位置、KV 額度風險與依賴順序皆已寫入計畫。

### 2026-07-17｜修 KV 額度滿導致簡介全掛的 500；IG 介紹文入快取管線

- Repo：`dip-vinyl-worker`
- 改動：使用者回報 IG 卡（JAGATARA《それから》、Fraction《Moon Blood》）與推薦卡（Bonnie 'Prince' Billy《Beware》）看不到簡介。偵錯發現主因：昨日大量 KV 匯入吃滿 Cloudflare 免費方案每日寫入額度後，worker 7 處 `COVER_CACHE.put()` 沒有 try/catch，寫入被拒直接 throw → 所有快取未命中的請求（簡介／封面／評分／曲風）整個 500。修法：新增 `kvPut` 安全包裝取代全部裸 put——寫不進快取就略過、回應照常。另確認《Beware》不是「隨機從 Bandcamp 抓」，而是心情選歌／類型挑片的 AI 推薦卡（推薦後以 Spotify→Bandcamp→YT 驗證），此路線修好 500 即恢復正常。
- 優化：把 Firestore `reels` 36 篇店主 IG 介紹文抓下（`fetch_reels.mjs`）、逐篇人工摘要成簡介、寫入 `desc2:/desc4:` 快取鍵（`reels_to_kv.mjs`）——battle／roguelike 本來只打 `/album-desc` 看不到 IG 文，入 KV 後三頁零改動通吃，也蓋掉 AI 對冷門盤的幻覺（Fraction 曾被寫成「暗黑電子」，實為 1971 迷幻搖滾私壓盤）；另補寫《Beware》人工簡介。因當日 KV 寫入額度仍滿，37 筆放入 `pending-import/`，以 Windows 排程 `dip-vinyl-kv-auto-import`（每日 08:10，額度台北 08:00 重置）自動匯入，成功歸檔、全部完成後排程自動移除。
- 主要檔案：`src/index.js`（kvPut）、`scripts/desc-gen/`（`fetch_reels.mjs`、`reels_to_kv.mjs`、`reels_raw.json`、`kv-import-reels.json`、`auto_import.mjs`、`auto_import.cmd`）
- 驗證：wrangler deploy 成功（Version 96709c2f）；修復前三張卡 `/album-desc` 都是 500 HTML，修復後皆 200 即時生成；auto_import.mjs 手動試跑正確偵測 10048 並保留待傳檔；`schtasks` 確認排程 Ready。IG 摘要正式生效待明日 08:10 匯入後自動完成。

### 2026-07-16｜卡池簡介批次預生成全部完成（5,773 張入 KV）

- Repo：`dip-vinyl-worker`（工具與產物）、`dip-vinyl-shop`（本備忘錄）
- 改動：延續同日稍早的第一階段，分十二個階段（每階段約 500 張）陸續生成剩餘 059 批，全部由本機 Sonnet／Opus 子代理撰寫（冷門度 5 的 167 張用 Opus、其餘 Sonnet，CJK 卡 0 張全被 CURATED_DESCS 涵蓋）。過程中兩度遇到 Cloudflare KV 免費方案每日寫入額度用滿（code 10048），依使用者指示先生成囤積、隔日額度重置後一次補匯入；期間也遇到 Claude Code 子代理 API 額度／OAuth token 過期的錯誤，但檔案多半已在報錯前寫入完成，逐批驗證確認無缺漏。全部 12 個 `kv-import-stage-N.json` 最終於額度重置後一次匯入成功。
- 過程中發現並修正的品質問題：batch-028 一筆未跳脫雙引號導致 JSON 壞掉；batch-046 系統性半形逗號混用（85 處自動修正）；多筆誤用禁止用語（「層次豐富」「獨樹一格」「傑作」）與 validate.mjs 對「誠實地」「無法辨識」「你來我往」等正常用語的拒答字樣誤判，逐筆手動改寫。另發現 `seed_cards.json` 原始資料有 18 筆藝人／專輯名稱含編碼壞掉的問號（如 `Guns N??Roses`、`Ice?`），屬既有資料品質問題，不影響本次任務（KV 鍵與前端查詢字串來源一致），留待未來清洗。
- 主要檔案：`dip-vinyl-worker/scripts/desc-gen/`（`build_tasks.mjs`、`validate.mjs`、`to_kv_bulk.mjs`、`tasks.json`、`batches/`（001–059）、`kv-import-stage-1~12.json`、`progress.json`）
- 驗證：validate.mjs 全部 5,773 筆最終 0 異常；每階段人工抽樣（每 50–90 筆抽 1）核對事實無幻覺、曲風無安錯；`wrangler kv bulk put` 全部 12 階段回報 Success；線上抽驗 8 筆（涵蓋 sonnet／opus、各階段、含極冷門卡）皆 `X-Cache: KV-HIT`；`wrangler kv key list --prefix desc2:` 統計 6,081 把鍵（含既有 308＋本次新增）。任務狀態記於 `progress.json`（`status: COMPLETE`）。

### 2026-07-16｜卡池簡介批次預生成第一階段（500 張入 KV）

- Repo：`dip-vinyl-worker`（工具與產物）、`dip-vinyl-shop`（本備忘錄）
- 改動：建立 `scripts/desc-gen/` 批次簡介工具鏈，改用 Claude Code 本機 Sonnet／Opus 子代理預先撰寫卡池簡介、匯入 worker KV（沿用 `desc2:`/`desc4:` 鍵與 `{desc}` 值格式），worker 的付費 API 現場生成保留當新卡 fallback。任務清單共 5,773 張（seed 5,526＋apex 600，扣除人工精選 76、殿堂 2、KV 既有 275）；模型分工為冷門度 5 的 167 張用 Opus、其餘用 Sonnet（兩輪試做後棄用 Haiku——對冷門卡會安錯曲風）。第一階段 batch 001–005 共 500 張已生成、驗證並匯入 KV；**因額度用滿暫停，續跑從 batch-006 起**，流程為每 500 張驗證＋人工抽查＋使用者確認後匯入（見 `progress.json`）。
- 主要檔案：`dip-vinyl-worker/scripts/desc-gen/`（`build_tasks.mjs`、`validate.mjs`、`to_kv_bulk.mjs`、`tasks.json`、`batches/`、`progress.json`）
- 驗證：validate.mjs 500/500 通過（拒答／簡體／禁語／標點；英文專輯名內逗號與〈Funk #49〉的 # 為合法，已修驗證器誤判）；每 50 筆抽 1 人工核對事實無幻覺；`wrangler kv bulk put` 回報 Success；線上抽 3 筆 `/album-desc` 皆 `X-Cache: KV-HIT` 即時回應。

### 2026-07-16｜音樂地圖曲風標籤改為純英文

- Repo：`dip-vinyl-shop`
- 改動：八個音樂地圖曲風名稱移除中文並統一顯示英文；曲風 ID、點數與資料結構不變。同步將完整地圖與品味生死鬥引用的地圖元件快取版本升至 v6。
- 主要檔案：`music-map-widget.js`、`music-map.html`、`pvp.html`
- 驗證：`music-map-widget.js` 通過 Node 語法檢查；確認舊中英並列標籤皆已移除、兩個引用頁皆使用 v6，並通過 `git diff --check`。

### 2026-07-16｜音樂地圖文案與「唱片櫃」命名統一

- Repo：`dip-vinyl-shop`
- 改動：依指定縮短音樂地圖上方簡介與下方圖表說明；將商店首頁、唱片收藏、單場對戰、Roguelike、音樂地圖、品味生死鬥預覽及後台中原本顯示為「卡冊」的執行頁面文案統一改為「唱片櫃」。同步將地圖元件快取版本升至 v5，確保新說明立即載入；Firestore `collections` 路徑與程式識別字維持不變。
- 主要檔案：`index.html`、`admin.html`、`battle.html`、`roguelike.html`、`music-map.html`、`music-map-widget.js`、`pvp.html`
- 驗證：確認上述執行檔不再含「卡冊」、兩段指定文案完全吻合；六個 HTML module script 與 `music-map-widget.js` 皆通過 Node 語法檢查，兩個引用頁皆使用 `music-map-widget.js?v=5`，並通過 `git diff --check`。

### 2026-07-16｜修正音樂地圖隔日歸零並自動重建

- Repo：`dip-vinyl-shop`
- 改動：修正商店、單場對戰與 Roguelike 在曲風查詢回空時寫入 `credits: {}`、清除既有八大曲風點數的問題；改用 `mergeFields` 只更新實際命中的曲風欄位，空曲風仍保留收藏張數但不碰既有點數。音樂地圖若偵測到缺少曲風欄位或收藏非空但點數全為零，會自動從永久卡冊重建並回存。
- 主要檔案：`index.html`、`battle.html`、`roguelike.html`、`music-map.html`
- 驗證：抽出四個 HTML 的 module script 以 Node `--check` 驗證語法，`music-map-widget.js` 亦通過；靜態檢查確認三個收卡入口皆使用精準 `mergeFields` 且舊的整張 `credits` map 寫法已移除；另驗證損壞空 map、全零 map 與正常 map 三種健康判斷，並通過 `git diff --check`。

### 2026-07-16｜加入 Claude／Codex 開工前交接檢查

- Repo：工作區、`dip-vinyl-shop`、`dip-vinyl-worker`
- 改動：規定每次開工先 fetch 並檢查本機與遠端的新增、修改、刪除、重新命名及新提交；乾淨時才 fast-forward 同步，發現分歧或重疊時保留對方工作。提交前再檢查一次遠端，避免工作期間互相覆蓋。
- 主要檔案：`../AGENTS.md`、`../CLAUDE.md`、`AGENTS.md`、`CLAUDE.md`、`PROJECT_MEMORY.md`、`../dip-vinyl-worker/AGENTS.md`、`../dip-vinyl-worker/CLAUDE.md`
- 驗證：實際對兩個 repo 執行 fetch、status、遠端 commit 與 name-status 比對；本次開工時兩邊皆無本機或遠端待整合變更。

### 2026-07-16｜補齊昨天逐筆工作日誌

- Repo：`dip-vinyl-shop`
- 改動：修正初版備忘錄只有歷史摘要、沒有昨天逐筆紀錄的缺漏；依兩個 repo 的 Git 歷史補登 2026-07-15 全部 16 筆提交，並明訂歷史摘要不得取代逐筆日誌。
- 主要檔案：`PROJECT_MEMORY.md`
- 驗證：以台北時區查詢 2026-07-15，確認 `dip-vinyl-shop` 14 筆、`dip-vinyl-worker` 2 筆；逐筆比對 commit 時間、差異檔案與 shortstat。

### 2026-07-16｜建立 Claude 自動讀取的專案備忘錄

- Repo：工作區、`dip-vinyl-shop`、`dip-vinyl-worker`
- 改動：依兩個 repo 共 529 次既有提交建立歷史基線與目前狀態摘要；加入 Claude 啟動時自動讀取，以及所有專案代理每次檔案改動完成前必須追加紀錄的規則。
- 主要檔案：`../CLAUDE.md`、`../AGENTS.md`、`CLAUDE.md`、`AGENTS.md`、`PROJECT_MEMORY.md`、`../dip-vinyl-worker/CLAUDE.md`、`../dip-vinyl-worker/AGENTS.md`
- 驗證：確認兩個 repo 的 Git 基線與工作區狀態；確認三個啟動位置皆能指向同一份備忘錄。

### 2026-07-15｜逐筆工作日誌（由 Git 補登，共 16 筆）

> 以下依當天時間先後排列。這是事後依 commit 差異補登；「驗證」代表已用 Git
> 查證提交與檔案內容，不杜撰原提交沒有留下的人工或瀏覽器測試紀錄。

#### 12:10｜全站「入耳」屬性改名為「硬蕊」

- Repo／commit：`dip-vinyl-shop`／`d05a657`
- 改動：將使用者可見的「入耳難易度／入耳」改為「硬蕊度／硬蕊」，同步更新商店、後台、單場對戰、Roguelike 與兩份設計文件；底層相容欄位仍沿用 `accessibility`。
- 主要檔案：`index.html`、`admin.html`、`battle.html`、`roguelike.html`、`CARD_GAME_DESIGN.md`、`ROGUELIKE_DESIGN.md`
- 驗證：`git show --stat d05a657` 確認 6 個檔案、48 行新增與 48 行刪除。

#### 12:10｜Worker 評分提示同步「硬蕊度」命名

- Repo／commit：`dip-vinyl-worker`／`d9a49ad`
- 改動：`/album-rating` 的註解及 AI 評分提示改用「硬蕊度」，定義仍是越晦澀、實驗、需要時間消化，分數越高；JSON key 保持 `accessibility` 以維持前端相容。
- 主要檔案：`src/index.js`
- 驗證：`git show --stat d9a49ad` 確認 1 個檔案、3 行新增與 3 行刪除。

#### 12:15｜相生相剋圖節點由「入」改為「硬」

- Repo／commit：`dip-vinyl-shop`／`8892ade`
- 改動：單場對戰與 Roguelike 的 SVG 相生相剋圖，屬性節點簡稱同步由「入」改為「硬」。
- 主要檔案：`battle.html`、`roguelike.html`
- 驗證：`git show --stat 8892ade` 確認 2 個檔案各替換 1 行。

#### 17:06｜重畫 Roguelike 腳邊唱片堆

- Repo／commit：`dip-vinyl-shop`／`9e7eda8`
- 改動：把原本整齊色條改成散放的像素封套與黑膠，玩家唱片依手牌最高屬性顯示經典藍、冷門紫或硬蕊紅；顯示最近 5 張並隨抽牌／出牌更新。同時首次加入專案 `AGENTS.md` 協作規則。
- 主要檔案：`roguelike.html`、`AGENTS.md`
- 驗證：`git show --stat 9e7eda8` 確認 2 個檔案、30 行新增與 14 行刪除。

#### 17:12｜隱藏對手唱片堆的屬性線索

- Repo／commit：`dip-vinyl-shop`／`2a3ff3c`
- 改動：對手腳邊唱片一律使用中性色與暗色中心，不再用紅／藍／紫洩漏手牌主屬性；對手氣場提示同步改為靠右對齊。
- 主要檔案：`roguelike.html`
- 驗證：`git show --stat 2a3ff3c` 確認 1 個檔案、7 行新增與 6 行刪除。

#### 17:15｜建立 Roguelike 實玩與平衡紀錄

- Repo／commit：`dip-vinyl-shop`／`0bca788`
- 改動：新增逐趟實玩檢查表、健康指標、已知假設與一次只調一組數值的紀律；同時把 Roguelike 起始 HP 從 10 調回 12，與設計及後台預設一致，目標保留 3–4 個有效回合的反制空間。
- 主要檔案：`ROGUELIKE_PLAYTEST.md`、`roguelike.html`
- 驗證：`git show --stat 0bca788` 確認 2 個檔案、74 行新增與 1 行刪除。

#### 17:19｜替對手角色保留提示框空間

- Repo／commit：`dip-vinyl-shop`／`d35f889`
- 改動：對手氣場提示框左側預留 72px，避免提示框延伸到絕對定位的對手角色與唱片堆區域；桌面與手機規則同步。
- 主要檔案：`roguelike.html`
- 驗證：`git show --stat d35f889` 確認 1 個檔案、3 行新增與 2 行刪除。

#### 17:34｜讓對手提示框依內容收合

- Repo／commit：`dip-vinyl-shop`／`218f367`
- 改動：提示框改為靠右、`fit-content`，最大寬度扣除左側 72px；長文字維持單行並以省略號截斷，減少空白框佔據牌桌。
- 主要檔案：`roguelike.html`
- 驗證：`git show --stat 218f367` 確認 1 個檔案、3 行新增與 3 行刪除。

#### 18:47｜加入獨立像素戰鬥介面預覽

- Repo／commit：`dip-vinyl-shop`／`f522b6d`
- 改動：新增一份獨立的像素風戰鬥介面預覽頁，作為視覺方向試作，沒有直接替換正式對戰頁。
- 主要檔案：`battle-pixel-preview.html`
- 驗證：`git show --stat f522b6d` 確認新增 1 個檔案、297 行。

#### 18:48｜撤回像素戰鬥介面預覽

- Repo／commit：`dip-vinyl-shop`／`cae1b4c`
- 改動：完整撤回前一筆像素介面試作並刪除預覽頁；這個預覽不是現行產品功能。
- 主要檔案：`battle-pixel-preview.html`（刪除）
- 驗證：`git show --stat cae1b4c` 確認刪除 297 行，與 `f522b6d` 的新增互相抵銷。

#### 20:25｜建立音樂地圖預覽與勝場探索獎勵

- Repo／commit：`dip-vinyl-shop`／`c3e11a8`
- 改動：新增八大曲風雷達／里程碑音樂地圖、首頁入口、獨立頁與品味生死鬥預覽；Roguelike 勝利後改為必須先翻一張新專輯、閱讀介紹並帶入下一場，實玩檢查表也加入抽盤完成率指標。此階段地圖先使用可操作的示例資料。
- 主要檔案：`music-map-widget.js`、`music-map.html`、`index.html`、`pvp.html`、`roguelike.html`、`ROGUELIKE_PLAYTEST.md`
- 驗證：`git show --stat c3e11a8` 確認 6 個檔案、115 行新增與 8 行刪除。

#### 20:49｜Worker 新增專輯曲風查詢

- Repo／commit：`dip-vinyl-worker`／`4234824`
- 改動：新增 `/album-genres`，先從 Spotify 專輯／藝人曲風取得資料，空白時退回 Last.fm 專輯或藝人標籤，再映射到音樂地圖的八大曲風；跨界專輯最多回傳兩條路徑，成功結果寫入 KV 快取。
- 主要檔案：`src/index.js`
- 驗證：`git show --stat 4234824` 確認 1 個檔案、61 行新增；差異中可見 Spotify、Last.fm fallback 與 `musicMapGenres` 規則。

#### 20:49｜音樂地圖接上玩家永久卡冊

- Repo／commit：`dip-vinyl-shop`／`894d241`
- 改動：移除示例操作，改從玩家 `musicMap` 與永久卡冊讀取真實收藏；舊卡冊首次開啟時逐張補查 `mapGenres` 並建立地圖，之後在商店、單場對戰與 Roguelike 永久收卡時同步累加專輯數及曲風點數；品味生死鬥顯示登入玩家的精簡地圖。
- 主要檔案：`music-map-widget.js`、`music-map.html`、`index.html`、`pvp.html`、`battle.html`、`roguelike.html`
- 驗證：`git show --stat 894d241` 確認 6 個檔案、123 行新增與 76 行刪除；差異中可見卡冊回填、`mapGenres` 儲存及 Firestore `increment`。

#### 20:58｜更新音樂地圖元件快取版本

- Repo／commit：`dip-vinyl-shop`／`121db1d`
- 改動：將獨立音樂地圖與品味生死鬥引用的 `music-map-widget.js` 版本參數更新，強制瀏覽器取得接上真實收藏後的新元件。
- 主要檔案：`music-map.html`、`pvp.html`
- 驗證：`git show --stat 121db1d` 確認 2 個檔案各替換 1 行。

#### 21:13｜修正手機版音樂地圖標籤被裁切

- Repo／commit：`dip-vinyl-shop`／`7d8d1ea`
- 改動：手機完整地圖限制為 350px，並擴大 SVG `viewBox`，讓八大曲風標籤與數值有足夠外圍空間；同步更新元件快取版本。
- 主要檔案：`music-map-widget.js`、`music-map.html`、`pvp.html`
- 驗證：`git show --stat 7d8d1ea` 確認 3 個檔案、4 行新增與 4 行刪除。

#### 22:02｜提高手機版音樂地圖標籤可讀性

- Repo／commit：`dip-vinyl-shop`／`b25a022`
- 改動：手機完整地圖使用固定八方向標籤座標與專用 `viewBox`，曲風名稱及數值字級分別放大，避免依圓周計算的位置過小或靠邊；同步更新元件快取版本。
- 主要檔案：`music-map-widget.js`、`music-map.html`、`pvp.html`
- 驗證：`git show --stat b25a022` 確認 3 個檔案、15 行新增與 5 行刪除。
