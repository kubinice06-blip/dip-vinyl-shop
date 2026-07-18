# 音樂地圖 2.0 執行計畫（給 Codex）

> 目標：把音樂地圖從靜態統計圖表升級成「會長大、有內容、有獎勵」的收藏地圖，
> 並讓唱片櫃能像真的唱片櫃一樣瀏覽＋像素唱盤機播放，對戰出牌也能播音樂。
> 本計畫由店主與 Claude 確認過方向；依階段順序執行，每階段獨立 commit + push。

## 執行守則（必讀）

1. 遵守 `CLAUDE.md`／`AGENTS.md` 的開工前協作交接檢查與 `PROJECT_MEMORY.md` 記錄規則：每階段完成都要在備忘錄「逐次改動記錄」最上方加一筆。
2. 每個階段做完各自 commit + push（shop 推 Cloudflare Pages 自動部署；worker 用 `wrangler deploy`）。驗證 Pages 部署時用 `curl -L`（`/music-map.html` 會 308 轉 `/music-map`）。
3. 手機版任何視覺改動都要檢查窄螢幕（≤520px）不裁切、不橫向捲動；戰鬥頁維持 100dvh 一屏原則。
4. Cloudflare KV 免費方案每日寫入額度有限（先前已因額度滿出過 10048 事故）；worker 內所有 KV 寫入一律走現有的 `kvPut` 安全包裝，寫不進就略過，不得裸 `put`。

## 全域同步點：曲風 ID 清單共有六處

十角化時以下六處必須同步改成同一組 10 個 id（順序也要一致）：

| 位置 | 內容 |
|---|---|
| `dip-vinyl-worker/src/index.js` `musicMapGenres()` | 對映規則物件 |
| `music-map-widget.js` `GENRES` | id + 英文顯示名 |
| `music-map.html` `ids` 陣列與 `healthy()` | 建圖與健檢 |
| `index.html` 的 `validMapGenres` 一帶（約 860–930 行） | 收卡記點 |
| `battle.html` 的 `validMapGenres` 一帶（約 555–566 行） | 收卡記點 |
| `roguelike.html` 的 `validMapGenres` 一帶（約 410–418 行） | 收卡記點 |

十類 id（固定順序）：`jazz, rock, electronic, soul, hiphop, folk, classical, world, pop, blues`。

---

## P1｜資料層十角化＋中文對映（worker 為主，前端六處同步）

**改什麼**

- `musicMapGenres()` 新增兩類並補缺口：
  - `pop`: `/(^|[^kj-])pop|mandopop|cantopop|c-pop|city ?pop|jpop|j-pop|kpop|synth-?pop 以外的泛 pop/`——實作時注意：`k-pop`/`j-pop`/`kpop`/`jpop`/`city pop` 歸 `pop`（不再歸 world）；`synthpop|synth-pop` 維持 electronic 優先也可同時中 pop（每張最多取 2 類的規則不變）。
  - `blues`: `/blues|rhythm and blues 排除（r&b 已歸 hiphop）|delta|boogie/`——至少涵蓋 `blues`。
  - 全部規則加中文關鍵字：搖滾→rock、龐克/金屬→rock、民謠/鄉村→folk、電子/氛圍→electronic、嘻哈/饒舌→hiphop、爵士→jazz、靈魂/放克/迪斯可→soul、古典/交響/室內樂→classical、流行/華語流行/國語流行→pop、藍調→blues、雷鬼/拉丁/世界→world。（例：五月天的 tag 若是「rock／taiwanese rock／搖滾」都要落在 rock。）
- KV 快取鍵 `mapgenre1:` 升版為 `mapgenre2:`（舊快取是八類結果，不升版 pop/blues 永遠長不出來）。
- `musicMap` 資料 schema 升版：`version: 2`，`credits` 十鍵，新增 `untagged`（有收藏但查不到曲風的張數）。`music-map.html` 的 `healthy()` 改查 `version === 2` 與十鍵齊全——舊八類地圖會自動判定不健康、觸發全量重建，正好完成資料遷移，不需要另寫遷移程式。
- `music-map.html` 的 `build()` 從逐張序列 await 改成**並行批次（一次 8 張）**，收藏上千張也能在合理時間重建；進度文字照舊更新。Last.fm 有速率限制，批次間可 sleep 200ms。
- 前端六處 id 清單同步十類（見上表）。
- 地圖側欄顯示「未分類 N 張」（讀 `untagged`），讓對映缺口可見。

**驗收**

- Worker 部署後在 `dip-vinyl-shop` 執行 `node verify-music-map.mjs`；腳本以 UTF-8 原始檔與 `URLSearchParams` 測五月天→rock、竹内まりや《Variety》→pop、B.B. King→blues、Taylor Swift→pop，避免命令列直接傳 CJK 造成編碼損壞。
- 登入後開 `/music-map`：舊帳號自動重建成十角圖，`users/{uid}.musicMap.version === 2`。
- 注意：全量重建冷快取時 KV 寫入量大，可能當日寫不完額度——`kvPut` 會安全略過，快取分幾天自然回填，屬預期行為，不要改成硬重試。

**⚠️ 出手時機（2026-07-17 當日指示）**：店主目前 Cloudflare KV 寫入額度受限中。P1 的程式碼**今天先寫完、本機 commit，但不 `wrangler deploy`、不 `git push`**（worker 部署與 shop 前端六處 id 同步一旦上線，會讓每個開地圖頁的玩家觸發 `healthy()` 判定舊地圖失效並全量重建，瞬間打大量 KV 寫入，額度限制中會整批被 `kvPut` 略過、當天測不出結果）。等**明天額度重置（台北 08:00，晚一點到 08:15 後最保險，避開既有 `dip-vinyl-kv-auto-import` 排程）**再執行部署與推送，見下方「P1 上線時機」指令。P2–P7 本身不新增 KV 寫入，但目前 shop commits 與 P1 位於同一條線性提交鏈，**不得單獨 push；整條 shop 鏈一併等 Worker 上線驗收通過後再推送**。

## P2｜成長模型：里程碑等級半徑（music-map-widget.js）

**改什麼**

- `MARKS` 延伸為十階：`[1, 3, 7, 15, 30, 60, 120, 250, 500, 1000]`。
- 雷達每軸半徑改為**等級制**（不再用占比）：
  `completed = MARKS 中 ≤ credits 的個數`；`frac = (credits − 上一階) / (本階 − 上一階)`（最高階之後 frac=0）；`radiusRatio = (completed + frac) / 10`。
  收 1 張＝0.1 格起跳，前期長得快、上千張仍有空間，圖形只會變大不會縮，兌現「蒐集越多地圖越大」文案。
- 占比 % 降級為側欄文字資訊保留；外圈 rail 節點改為每軸 10 顆（間距縮小）、側欄「下一節點」直接吃同一組 MARKS——順便修掉原本寫死的假「下一節點 120」。
- 滿級（1000）後側欄顯示「已滿級」。

**驗收**：用假資料（含 0、1、61、999、1200 點的軸）驗證半徑與節點正確；compact 版（pvp.html）與手機版不裁切。

## P3｜點路徑看封面牆（music-map.html）

**改什麼**

- 點十角圖任一軸或側欄路徑 → 頁面下方展開該曲風的專輯封面牆：查 `collections/{uid}/cards` 中 `mapGenres` 含該類的卡，顯示封面、藝人、專輯名、稀有度框（沿用卡冊現有稀有度樣式），按稀有度再按取得時間排序。
- 封面直接用卡片文件裡保存的封面欄位（收藏卡保留抽卡當下資料）；沒有封面欄位的卡再打 worker 補。
- 純前端查詢，不改 Firestore 規則、不改 schema。

**驗收**：點 Jazz 顯示的張數與側欄點數邏輯一致（跨界卡會同時出現在兩條路徑，屬正常）；手機單欄不裁切。

## P4｜節點獎勵＋稱號＋分享圖

**改什麼**

- **獎勵結算集中在 music-map.html 載入時**（不改三個遊戲頁的記點程式）：比對每軸 credits 已跨過的獎勵階與 `users/{uid}.musicMapRewards`（形如 `{jazz:[7,30], ...}`）的已領清單，補發差額並寫回。
- 獎勵階：每軸在 **7、30、120、500** 張時各發 1 張特殊抽卡券。發券前先讀 `index.html` 找到現有特殊抽卡券的欄位與發放寫法，沿用同一機制，不要另造一套。發券時顯示 toast／小動畫告知。
- 稱號：每軸三級——7 張「{曲風}探索者」、60 張「{曲風}行家」、500 張「{曲風}藏家傳奇」（中文曲風名；店主之後可改文案）。目前達成的最高稱號顯示在側欄該路徑旁與分享圖上。
- **9:16 分享圖**：canvas 1080×1920，內容＝十角圖＋總收藏數＋最強三條路徑與稱號＋dip logo。做法沿用 `index.html` 心情選歌分享圖的 canvas 流程；SVG 可轉 blob 再畫進 canvas。

**驗收**：新帳號補發邏輯正確、重整不重複發；分享圖在手機可下載/分享；Firestore 寫入只動 `users/{uid}` 自己文件（現有規則已允許）。

## P5｜動畫＋空狀態

**改什麼**

- 雷達形狀變化加 transition（SVG path 補間或 CSS transition）；節點點亮加一個脈衝效果；首次建圖完成加「地圖展開」動畫（從中心長出）。
- 未登入空狀態不再顯示全 0 圖：改放一份寫死的示範資料（標註「示範地圖」），讓訪客理解功能長相。

**驗收**：動畫在手機順暢（避免大量 DOM 重繪，全圖仍是單一 SVG 重繪即可）；未登入顯示示範圖＋登入按鈕。

## P6｜共用播放器模組＋唱片櫃改版＋像素唱盤機

### P6a 共用播放器 `dip-player.js`（新檔，先做，P6b 與 P7 都吃它）

- 對外 API：`DipPlayer.mount(container)`、`DipPlayer.playAlbum({artist, album})`、`DipPlayer.stop()`、`DipPlayer.onStateChange(cb)`。
- `playAlbum` 流程：打 worker `/spotify-album-link` 解析出 Spotify album id（KV 已有快取）→ 用 **Spotify iFrame Embed API**（`https://open.spotify.com/embed/iframe-api/v1`）`loadUri('spotify:album:...')` 並播放；解析不到 → 打 `/yt-music-link` 換 YouTube embed；再不行 → 靜默失敗回傳 false，絕不 throw、絕不卡呼叫端。
- 免登入為 30 秒試聽、使用者在 embed 內登入 Spotify 即全曲——這是平台行為，介面上不用特別解釋。
- 瀏覽器手勢限制：首次播放必須由點擊觸發；「點唱片」「出牌」本身就是點擊，符合規範。

### P6b 唱片櫃改版＋像素唱盤機（index.html）

- 唱片櫃（record shelf）加**曲風篩選 chips**（十類，吃卡片 `mapGenres`；無 tag 的卡歸「未分類」chip）。
- 新增「唱片櫃檢視」：格狀櫃位、封面朝前的翻找感（現有卡冊檢視保留，兩種檢視可切換）。
- 櫃下方常駐一台**像素唱盤機**：轉盤、唱臂、唱片。可從 `roguelike.html` 的 pixArtHTML 引擎複製精簡版，或用獨立小型 canvas 像素圖實作，不強制共用模組。
- 互動：點一張唱片 →「上盤」動畫（封面縮成黑膠滑到轉盤）→ 唱臂擺上、唱片旋轉 → `DipPlayer.playAlbum(...)` 出聲；再點另一張就換盤；點唱臂收回＝停止。
- 播放器 iframe 藏在唱盤機旁的小面板（Spotify embed 本身要可見才能操作登入/切曲，不要 display:none，可以做成小抽屜）。

**驗收**：篩選正確；點唱片有動畫且能出聲（30 秒試聽）；解析失敗的專輯有輕量提示（如唱臂彈回）；手機版唱盤機不裁切、不擋櫃位捲動。

## P7｜對戰出牌播音樂（battle.html，選配 roguelike.html）

**改什麼**

- `battle.html` 引入 `dip-player.js`：**玩家自己出牌**時呼叫 `DipPlayer.playAlbum(該卡)`，換牌即換曲；對手出牌不播（避免混亂）。
- 頂欄加一顆喇叭鈕：開／關出牌音樂，狀態存 localStorage，預設開。關閉時完全不呼叫播放器。
- 播放器面板收在角落小抽屜，不佔戰鬥版面、不影響 100dvh 一屏佈局。
- 解析失敗或播放器未就緒→靜默跳過，**任何情況都不得阻塞出牌流程**（fire-and-forget，不 await 在出牌主流程上）。
- 完成後若順利，可加開 `roguelike.html` 同樣 hook（獨立 commit，選配）。

**驗收**：出牌後 1–2 秒內出聲；連續出牌快速切換不報錯；關閉喇叭後零網路請求；手機一屏佈局不變形。

---

## 執行順序與效率建議

- **依賴關係**：P1 → P2 → (P3、P4、P5 可任意順序)；P6a → P6b → P7。
- **兩條線可並行**：P1–P5（音樂地圖線）與 P6a–P7（播放器線）互不依賴，可交錯做。
- P1 是唯一動 worker 的階段（P6a 只是呼叫現有端點），worker 部署一次就好。
- 每階段 commit 訊息用英文祈使句（沿用現有 git 風格），備忘錄一階段一筆。

## 給 Codex 的今日工作清單（2026-07-17）

依序執行，每一項做完再進下一項：

1. **開工前檢查**（兩個 repo 都要）：`git fetch origin`、`git status --short`、`git log --oneline HEAD..origin/main`、`git diff --name-status HEAD..origin/main`；乾淨且落後才 `git pull --ff-only origin main`。完整讀 `PROJECT_MEMORY.md` 與兩個 `CLAUDE.md`。
2. **寫 P1 全部程式碼**（worker `musicMapGenres()`、KV 鍵升版、schema version 2、六處 id 清單同步、`build()` 並行批次）。
   - `dip-vinyl-worker`：`git add` 相關檔案、**本機 commit，先不要 push、不要 `wrangler deploy`**。
   - `dip-vinyl-shop`：六處前端同步的檔案先寫完、**本機 commit，先不要 push**。
   - 這一步做完先停下回報，不要自動接著做 P1 的「上線時機」那一步。
3. **接著做 P2 → P3 → P4 → P5 → P6a → P6b → P7**。每階段照常本機 commit 並在 `PROJECT_MEMORY.md` 加一筆逐次改動記錄；因這些 commits 以未上線的 P1 為祖先，當天不 push，避免線性歷史連同 P1 一起發布。
4. **P1 上線時機（硬性順序，不得交換）**：等台北時間**明天（2026-07-18）08:15 以後**，確認 KV 額度已重置（可先以 PowerShell `Invoke-WebRequest` 打一次純 ASCII 的 `/album-desc` 或 `/album-genres`，確認 HTTP 200 且無 10048 錯誤），再：
   - **Gate 1 — Worker 先上**：`dip-vinyl-worker` 執行 `git fetch origin`，確認無新提交後 `git push` → `wrangler deploy`。
   - **Gate 2 — Worker 驗收**：到 `dip-vinyl-shop` 執行 `node verify-music-map.mjs`，四個案例全部 PASS 才可繼續；任何 FAIL 都禁止 push shop。
   - **Gate 3 — Shop 後上**：`dip-vinyl-shop` 執行 `git fetch origin`，確認無新提交後才 `git push`（Cloudflare Pages 自動部署）→ 驗證舊帳號登入 `/music-map` 能自動重建成十角圖。
   - 更新 `PROJECT_MEMORY.md`（P1 這筆現在才算真正完成上線，含 deploy 版本號與驗收結果）。
5. 全部完成後在對話中總結七個階段各自的 commit hash 與驗證結果。

## 風險與注意

1. **KV 寫入額度**：P1 重建與 mapgenre2 冷快取會大量寫 KV；一律走 `kvPut`，寫不進就略過，禁止重試迴圈。
2. **Last.fm 速率**：並行批次 8 張＋批間 200ms sleep；若見 429 再放慢。
3. **healthy() 觸發全量重建**是預期的遷移路徑，別「順手」把它改成沿用舊資料。
4. **不要動戰鬥平衡**：本計畫全部是收藏側功能；獎勵只發特殊抽卡券與稱號，不得加任何可見的對戰數值 buff（隱形平衡原則）。
5. **Spotify embed 在少數瀏覽器（iOS 低電量模式等）可能延遲出聲**：屬平台限制，不要為此加 workaround，靜默降級即可。

---

# P9｜音樂體驗改版（2026-07-18 店主實測回饋，給 Codex）

> P1–P7 已於 2026-07-18 全部上線。店主用 iPhone 實測後給了六點回饋，整合成本階段。
> **最高原則：手機版面。幾乎所有玩家都用手機。任何新元素都不得推擠、遮擋、撐爆既有版面；
> 戰鬥頁 100dvh 一屏鐵則不變。每一步改完都要在 390×844 量測驗證。**

## 背景：為什麼現在手機上沒有自動出聲（先讀懂再動工）

點擊（user activation）在 iOS Safari 只有幾秒有效期，而目前 `playAlbum` 在 tap 之後才去
fetch `/spotify-album-link`（網路來回）→ 載入 iFrame API → createController → play()，
activation 早就過期，所以 play() 被瀏覽器擋下、只出現待播的 embed。修法方向是「把 tap 和
play 之間的距離縮到最短」＋「首次互動先解鎖音訊」，見 P9a。

## P9a｜DipPlayer 核心強化：隱藏模式＋真自動播放（dip-player.js）

1. **隱藏模式**：`mount(container,{hidden:true})` — iframe 容器改為 `position:fixed;
   width:1px;height:1px;left:-9999px;opacity:0`。**不可用 display:none**（Spotify／YouTube
   都會暫停或拒載）。隱藏模式下不渲染任何可見 UI。
2. **連結預抓**：新增 `DipPlayer.prefetch({artist,album})` — 只打 `/spotify-album-link`（與
   fallback 需要的 `/yt-music-link`）並存進記憶體 Map，不播放。呼叫端在「卡片渲染完成時」
   「戰鬥雙方檯面卡揭示時」預抓，之後 tap→play 幾乎零網路延遲。
3. **控制器預建**：頁面掛載時就載入 Spotify iFrame API 並 createController（用任一 URI 佔位、
   不播放），tap 時只剩 `loadUri`＋`play()`，保住 activation。
4. **首次互動音訊解鎖**：頁面第一次任何 tap 時，對 YouTube iframe 做一次 mute→play→pause
   的 prime（經典解鎖手法），讓後續程式化播放（含非手勢觸發的勝方切歌）在 iOS 上可行。
5. **Spotify 起播看門狗**：play() 後 1.5 秒內若沒收到 iFrame API 的 playback update（未進入
   播放中），自動 fallback 改走 YouTube。iOS 上 Spotify embed 對程式化起播不可靠，YouTube
   iframe 掛 `allow="autoplay"` 後對 gesture-chain 起播可靠得多。
6. onStateChange 照舊；所有失敗依然收斂為 false 不 throw。

**驗收**：桌機＋**真 iPhone**（店主協助）實測：點一下唱片 1 秒內出聲；勝方切歌（非手勢）
在首次解鎖後能自動換曲。

## P9b｜唱片櫃唱盤機重做（index.html）

對應店主回饋一、二、三：

1. **移除「卡片檢視／唱片櫃檢視」切換**：木紋 `record-shelf-grid` 檢視整組刪除，一律用原本
   卡片檢視的乾淨網格。曲風篩選 chips 保留。
2. **唱盤機移到收藏區最上方**（chips 之下、卡片網格之上），**刪掉所有文字**：kicker、
   曲名敘述、hint、「收起/展開播放器」按鈕、播放器抽屜全部拿掉——版面只有唱盤機本體。
   播放器改用 P9a 隱藏模式。停止操作＝點唱臂（保留 aria-label）。
3. **點卡片＝上盤＋自動播放**（主要行為）。原本點卡片開的「卡片詳情浮層」功能不可消失：
   改成卡片右上角一顆小「ⓘ」圖示開詳情（或依現有 UI 慣例放角落小按鈕），視覺要低調不搶封面。
4. **唱臂修圖**（回饋一）：目前 rotate(-18deg→24deg) 針頭搆不到唱片。調整唱臂長度／
   transform-origin／角度，讓播放狀態時針頭端點落在唱片外緣溝槽上（目測像素對位）。
5. **轉動與唱臂動效**（回饋二）：
   - 唱片轉動改用 rAF 驅動角度＋角速度緩動：播放→速度從 0 緩升到定速（約 1 秒）；
     停止→緩降到 0（約 1.2 秒），不是瞬停。CSS `animation` 做不出緩升緩降，須用 JS。
   - 唱臂 transition 緩入（tap 後唱臂緩移到唱片上）＋緩出（停止時緩移離開）。
   - 順序：點卡片 → 封面飛行上盤 → 唱臂緩入 → 轉盤緩升速；停止反向。
   - **轉動狀態一律綁 DipPlayer onStateChange**：真的在 playing 才轉，stopped/error 緩停。
6. 換盤（播放中點另一張卡）：直接切歌，轉盤不用停——唱臂快速抬起放下即可，避免等待感。

**驗收**：390×844——唱盤機在最上方、無任何文字、點卡片出聲且唱臂落在唱片上、緩動自然、
詳情入口仍可用、頁面無橫向捲動、console 零錯誤。

## P9c｜對戰改「勝方音樂」＋迷你唱盤（battle.html）

對應回饋四、五、六：

1. **移除現有右下播放器抽屜**（整組 UI 刪掉），播放器改 P9a 隱藏模式背景執行。
   頂欄喇叭鈕保留（總開關，localStorage 鍵 `dipBattleMusic` 沿用）。
2. **觸發改為回合結算**：不再是出牌就播自己的牌。回合結算判定後——玩家勝→播玩家那張卡、
   對手勝→播對手那張卡、平手→不換曲（維持現狀）。相剋（counter）與比星（value）都算勝負；
   輾壓等特殊結算比照「由誰得利」。首回合的第一次播放靠出牌 tap 的 activation（結算通常
   1–2 秒內完成，在有效期內）；之後的自動切歌靠 P9a 的解鎖機制。
3. **迷你像素唱盤**（回饋五）：放在雙方檯面卡之間、VS 下方的空白處（店主截圖紅圈位置）。
   規格：約 44×30px 的像素唱盤（轉盤＋小唱臂），播放中轉盤旋轉＋往上飄的小音符動畫
   （♪ 兩三顆、CSS animation、循環錯開）；停止時靜止、音符消失。點它＝喇叭開關（同頂欄鈕）。
   **版面鐵則：它只能用該空白區既有的空間，不得增加牌桌高度、不得推擠檯面卡與手牌，
   100dvh 總高不變。** 若該處空間在某些機型不足，寧可縮小唱盤也不得擠版。
4. 預抓：雙方檯面卡揭示時就 `DipPlayer.prefetch` 兩張卡的連結，結算時切歌零延遲。

**驗收**：390×844 牌桌與手牌位置和改版前完全一致（量測對比）；勝負切歌正確；
關喇叭後零播放器請求；音符動畫在低階機不掉幀（純 CSS transform/opacity）。

## P9d｜Roguelike 同步接入（roguelike.html）

對應回饋四（roguelike 目前完全沒有音樂）：

1. 與 P9c 相同機制：隱藏背景播放、回合結算播勝方專輯、迷你像素唱盤放牌桌中央空位、
   預抓檯面卡連結。
2. 喇叭開關沿用同一個 localStorage 鍵 `dipBattleMusic`（玩家對「對戰音樂」的偏好是同一件事，
   不要分裂成兩個設定）；roguelike 頂欄加同款喇叭鈕。
3. Boss 戰（傳說藏家）照常播勝方；不要為 boss 做特殊音樂邏輯（超出本階段範圍）。

**驗收**：同 P9c，另確認 roguelike 手機一屏佈局（牌堆、配件列、手牌）零位移。

## P9 執行順序與紀律

- 順序：**P9a → P9b → P9c → P9d**（核心先行，三個頁面都吃它）。
- 每階段獨立 commit + push（現在無 KV 額度限制，改的都是前端），Pages 部署後用
  `curl -L` 確認新版字串上線，再做手機量測。
- 每階段結束在 `PROJECT_MEMORY.md` 最上方加一筆。
- **手機量測固定動作**（每階段必做，390×844）：`document.documentElement.scrollWidth===390`、
  戰鬥頁 `body` 高度＝viewport、新元素 getBoundingClientRect 不與手牌／檯面卡／數值列重疊、
  console 零錯誤。
- iOS 真機驗收（P9a、P9c）需要店主配合，完成後在對話中列出待店主確認的清單。
