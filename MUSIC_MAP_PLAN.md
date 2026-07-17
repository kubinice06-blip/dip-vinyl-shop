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

- `curl "https://dip-vinyl-worker.kubinice06.workers.dev/album-genres?artist=五月天&album=後青春期的詩"` → rock。
- 竹内まりや《Variety》→ pop（city pop）；B.B. King → blues；Taylor Swift → pop。
- 登入後開 `/music-map`：舊帳號自動重建成十角圖，`users/{uid}.musicMap.version === 2`。
- 注意：全量重建冷快取時 KV 寫入量大，可能當日寫不完額度——`kvPut` 會安全略過，快取分幾天自然回填，屬預期行為，不要改成硬重試。

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
- **兩條線可並行**：P1–P5（音樂地圖線）與 P6a–P7（播放器線）互不依賴，可交錯做；若一次只做一件事，建議順序 P1 → P2 → P6a → P7 → P3 → P4 → P6b → P5（先把資料地基和店主最想玩的播放做出來，封面牆/獎勵/動畫殿後）。
- P1 是唯一動 worker 的階段（P6a 只是呼叫現有端點），worker 部署一次就好。
- 每階段 commit 訊息用英文祈使句（沿用現有 git 風格），備忘錄一階段一筆。

## 風險與注意

1. **KV 寫入額度**：P1 重建與 mapgenre2 冷快取會大量寫 KV；一律走 `kvPut`，寫不進就略過，禁止重試迴圈。
2. **Last.fm 速率**：並行批次 8 張＋批間 200ms sleep；若見 429 再放慢。
3. **healthy() 觸發全量重建**是預期的遷移路徑，別「順手」把它改成沿用舊資料。
4. **不要動戰鬥平衡**：本計畫全部是收藏側功能；獎勵只發特殊抽卡券與稱號，不得加任何可見的對戰數值 buff（隱形平衡原則）。
5. **Spotify embed 在少數瀏覽器（iOS 低電量模式等）可能延遲出聲**：屬平台限制，不要為此加 workaround，靜默降級即可。
