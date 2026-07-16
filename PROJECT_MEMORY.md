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

### 2026-07-16｜建立 Claude 自動讀取的專案備忘錄

- Repo：工作區、`dip-vinyl-shop`、`dip-vinyl-worker`
- 改動：依兩個 repo 共 529 次既有提交建立歷史基線與目前狀態摘要；加入 Claude 啟動時自動讀取，以及所有專案代理每次檔案改動完成前必須追加紀錄的規則。
- 主要檔案：`../CLAUDE.md`、`../AGENTS.md`、`CLAUDE.md`、`AGENTS.md`、`PROJECT_MEMORY.md`、`../dip-vinyl-worker/CLAUDE.md`、`../dip-vinyl-worker/AGENTS.md`
- 驗證：確認兩個 repo 的 Git 基線與工作區狀態；確認三個啟動位置皆能指向同一份備忘錄。
