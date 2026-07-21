# dip vinyl 專案備忘錄

### 2026-07-20｜移除 #auddbg 偵錯層，保留核心修復邏輯

- Repo：`dip-vinyl-shop`
- 店主確認 iOS 音訊問題已完全修復（「已經沒問題了」），決定拆掉 `#auddbg` 偵錯層。
- 改動：
  1. 刪除 `dip-player.js` 裡所有偵錯函式（`dbg()`、`dbgPeak()`、`dbgSnap()`）及 AUD_DEBUG 檢查
  2. 保留關鍵修復邏輯：keep-alive 節流、resume() 逾時保護、previewArmedAt 狀態追蹤
  3. 刪除獨立診斷頁 `audio-debug.html`
- 主要檔案：`dip-player.js`（移除偵錯）、`battle.html` / `index.html` / `roguelike.html`（v=28，版號不變）
- 驗證：`node --check` 通過。所有修復相關的功能邏輯保留無誤。

### 2026-07-20｜iOS 首次沒聲音修復確認生效＋去掉多餘的 1.5 秒等待

- Repo：`dip-vinyl-shop`
- 店主 iPhone 實機截圖確認 v=27 已修好：`ctx=running`、`peak=0.1839` 真的出聲了，
  但仍感覺「不是立即播放」——log 顯示 `loadPreviewBuffer 完成（3994ms）`。
  這 4 秒裡有一段是修法本身多花的：`loadPreviewBuffer()` 開頭那個 `await withTimeout(resume(), 1500)`
  是在**下載開始之前**空等，但下載與 `decodeAudioData` 在 suspended 的 context 上一樣能做，
  真正需要 running 的只有稍後的 `source.start()`（那裡已經有自己的 resume＋逾時）。
- 改動：拿掉 `loadPreviewBuffer()` 開頭那次 resume 等待，直接進入 fetch。
  `ensurePreviewGraph()`（在它之前就會呼叫）已經用 fire-and-forget 的方式發過
  `resume().catch(()=>{})`，不需要在這裡重複等待一次。`source.start()` 前那個
  `await withTimeout(resume(), 1500)` 原樣保留，作為起播前的最後把關。
- 主要檔案：`dip-player.js`、`battle.html`、`index.html`、`roguelike.html`（v=27 → v=28）
- 驗證：`node --check` 通過。桌機帶 `#auddbg` 實測首播與快取路徑（靜音→重播）皆乾淨無
  AbortError、正常播放（peak 0.16～0.29）；不帶 hash 時 overlay 不存在、播放狀態 playing；
  battle 與 roguelike 兩頁 console 皆無錯誤。桌機環境本來就重現不出 iOS 的 resume 延遲，
  這次改動省下的 1.5 秒需由店主 iPhone 實機驗證是否感覺到起播變快。

### 2026-07-20｜找到真凶：await resume() 吊死 14.7 秒（iOS 首次沒聲音）

- Repo：`dip-vinyl-shop`
- 實機 log（`#auddbg`）決定性證據：
  - `10.30s 下載解碼前｜ctx=suspended t=0.00` — AudioContext 從 1.83s 建立起一直是 `suspended`，
    `currentTime` 十秒都還停在 `0.00`，一個 sample 都沒算過。
  - `25.05s loadPreviewBuffer 完成（14747ms）` — **卡了 14.7 秒**，卡在
    `loadPreviewBuffer()` 裡的 `await audioCtx.resume?.()`。iOS 在手勢外收到的 resume 請求
    會被無限期擱置、promise 永不 resolve，整條下載解碼路徑被吊死。所以根本不是「播了沒聲音」，
    **是壓根還沒播到**。它一直等到店主點唱盤機那兩下才被解開。
  - 對照差異：`10.29s unlock｜自認播放中 → 重發 play()`（ctx 仍 suspended、卡死）
    vs `24.76s unlock｜keep-alive 重新起播（paused=true）`（ctx 變 running、有聲音）。
- 根因：對「自認還在播」的 `<audio>` 呼叫 `play()` 是 no-op，**不會建立新的 audio session**，
  AudioContext 因此永遠 resume 不了。keep-alive 從進頁面就一直 loop 著，所以第一次點開簡介
  必定走到 no-op 分支 → 必定沒聲音；而任何一次成功播放結尾或 `stop()` 都會 pause keep-alive，
  之後就都會走到完整起播分支 → 之後都正常。（上一版 v=23「一律重發 play()」失敗正是因為
  補的是 no-op，沒有 pause→換 src→play 的完整循環。）
- 改動：
  1. `primePreviewFromGesture()` 改為**一律完整重新武裝**：`pause()` → 重設 `src` → `play()`，
     並在同一手勢內接著呼叫 `resume()`（session 由 play() 建立後才要求 resume 才有效）。
  2. 兩處 `await audioCtx.resume?.()` 一律包 `withTimeout(..., 1500)`。獨立防禦：
     就算 session 假設再次出錯，也不可能再出現整條路徑吊死十幾秒。
  3. 節流：同一次觸碰常連帶觸發兩次 unlock，若都重新武裝，第二次的 pause 會把第一次的
     `play()` 打成 AbortError。改為「剛武裝過且仍在播」時略過（400ms 內）。
  4. `playItunes` 釋放 keep-alive 改為等武裝的 promise 落定後才 `pause()`，
     否則快取命中時 start 與武裝幾乎同一 tick，必定把自己的 `play()` 打成 AbortError。
- 主要檔案：`dip-player.js`、`battle.html`、`index.html`、`roguelike.html`（v=24 → v=27）
- 驗證：`node --check` 通過。桌機帶 `#auddbg` 實測：首播 log 乾淨無 AbortError、
  `loadPreviewBuffer` 515ms 完成、start+2.2s gain=0.500 peak=0.1046；
  靜音→重播的快取路徑（loadPreviewBuffer 0ms）同樣乾淨 resolve 並正常播放；
  不帶 hash 時 overlay 不存在、播放狀態 playing、console 無錯誤。iOS 實機待店主驗證。

### 2026-07-20｜殭屍假設也被推翻 → dip-player 內建 #auddbg 實機偵錯層

- Repo：`dip-vinyl-shop`
- 背景：keep-alive 殭屍修正（v=23）經店主 iPhone 實測**無效**，「第一次點開簡介沒聲音」依舊。
  至此兩個假設（session 空窗、keep-alive 殭屍）都被實機推翻；且獨立診斷頁 `audio-debug.html`
  在同一支 iPhone 上**全部路徑有聲音**——問題只出現在正式頁面的真實首播路徑上，
  只能在那條路徑上直接量測。
- 改動：`dip-player.js` 內建偵錯層，**只有網址帶 `#auddbg` 才啟動**，平常一行邏輯都不多跑：
  1. 畫面底部固定 log 面板，記錄：AudioContext 建立、unlock 各分支與 keep-alive `play()`
     的 promise 結果、playItunes 來源／曲目／buffer 快取命中、下載解碼耗時、每個關鍵點的
     `ctx.state`／`currentTime`／gain／**AnalyserNode 輸出峰值**／keep-alive 狀態、狀態機轉換、stop 呼叫。
  2. AnalyserNode 只作為 previewGain 的旁支（sink），不動原本輸出鏈。
  3. **自動修復實驗**：起播後 0.8 秒若量到輸出峰值=0（訊號沒到輸出端），自動執行
     `suspend()→resume()` 一次並記錄結果；2.2 秒再量一次。若音樂在約 1 秒後突然出來，
     即證明「輸出端卡死、suspend/resume 可解」，正式修法就照這個做成無偵錯版 watchdog。
- 主要檔案：`dip-player.js`、`battle.html`、`index.html`、`roguelike.html`（v=23 → v=24）
- 驗證：`node --check` 通過。桌機帶 `#auddbg` 實測：overlay 逐步記錄完整（含 unlock 重發、
  下載 656ms、start+0.8s peak=0.173、start+2.2s peak=0.3527、keep-alive 交接 playing→paused）；
  不帶 hash 時 overlay 不存在、播放正常、console 無錯誤。
  待店主用 iPhone 開 `https://dipvinyl.tw/battle.html#auddbg` 重現第一次開簡介後截圖回報。
- 交接注意：本機測試時 python http.server 的 HTML 會被瀏覽器啟發式快取＋service worker 蓋住，
  改了 `?v=` 後要清 SW 並用 `?nocache=` 之類的 query 重載才拿得到新 HTML。

### 2026-07-20｜iOS 首次點開簡介沒聲音：真正根因是 keep-alive 殭屍狀態

- Repo：`dip-vinyl-shop`
- 診斷過程：店主 iPhone 實測 `audio-debug.html` ——最小重現路徑**全部有聲音**（連跳過解鎖鈕直接播
  都正常），證明 `dip-player.js` 的下載→解碼→BufferSource 播放管線在 iOS 上本身沒問題。
  同時發現新線索：正式頁第一次開簡介沒聲音時，**不用關視窗**，點小唱盤機兩下（靜音→再播）就有聲音。
- 根因：診斷頁與正式頁失敗那一下的唯一差別＝「該次手勢內有沒有真的對靜音 keep-alive `<audio>`
  重發 `play()`」。`primePreviewFromGesture()` 原本有 `if (!audio.paused && !audio.ended) return true`
  的提前返回——靜音循環從進頁面第一次觸碰就開始播，元素自認還在播；但 iOS 會把長時間循環的
  靜音元素實際停掉而 `paused` 仍回報 `false`（殭屍狀態），audio session 已不在頁面手上。
  於是開簡介那次手勢被提前返回白白流掉，稍後 `source.start(0)` 的訊號有產生卻被 iOS 擋在輸出端。
  一切觀察都吻合：點唱盤第一下 `stop()` 把元素真正 `pause()` 掉，第二下 unlock 看到 `paused===true`
  終於在手勢內重發 `play()`、session 抓回來就有聲；之後每次成功播放結尾都會 pause keep-alive，
  所以後續開簡介永遠走到重發分支 → 都正常 → 「只有第一次沒聲音」。
- 修法（一行語意）：提前返回的分支改為**手勢內一律重發 `audio.play()`** ——正常播放中的元素呼叫
  `play()` 是 no-op、立即 resolve；殭屍元素則重新起播、把 session 抓回來。單向保險，
  不動 `installAudioUnlock`／`unlock` 的任何其他邏輯。版號 v=22 → v=23。
- 主要檔案：`dip-player.js`、`battle.html`、`index.html`、`roguelike.html`
- 驗證：`node --check` 通過。桌機回歸四條路徑全過——keep-alive 播放中重複 unlock 不炸、
  首播 gain 0.5＋keep-alive 正確交接（start 後 paused=true）、靜音→重播淡入 0.05→0.5 走滿 1.5 秒、
  關窗淡出 0.45→0 走滿 1.5 秒；console 無錯誤。iOS 實機由店主驗證（見下一步回報）。

### 2026-07-20｜新增試聽診斷頁（iOS 首次沒聲音仍未解）

- Repo：`dip-vinyl-shop`
- 背景：上一筆的 keep-alive 修正經店主 iPhone 實機驗證——**淡出、小唱盤機重播都好了，但「第一次點開簡介沒聲音」依舊**。
  代表「空窗期 audio session 被收掉」這個假設被推翻（keep-alive 全程墊著仍然無聲）。桌機 Chrome
  完全無法重現，繼續猜只會亂改核心音訊管線，因此改為先取得實機數據。
- 改動：新增獨立診斷頁 `audio-debug.html`（**全新檔案，不 import、不修改任何現有程式**，零風險）。
  以與 `dip-player.js` 相同形狀的最小碼重現整條路徑，並在手機上印出逐步數據：
  AudioContext state／sampleRate／currentTime 是否前進、keep-alive `<audio>.play()` 成功或被拒、
  音檔 fetch status 與耗時、`decodeAudioData` 結果、**解碼後 buffer 的峰值**（判斷音檔本身是否無聲）、
  以及用 AnalyserNode 量到的**圖形實際輸出峰值**（判斷訊號有沒有真的產生）。
  五個按鈕構成 A/B：⓪ 只解鎖（讓 AudioContext 在更早一次觸碰建立，與正式版一致）→ ① 完整首播
  → ② 快取路徑 → ③ 手勢當下立刻播 → ④ 同一份快取音但刻意空等 3 秒才播。
  ③ 與 ④ 的差別只有「離手勢多久」，可單獨隔離延遲是不是主因。
- 判讀方式：輸出峰值 >0 但耳朵沒聲音 → 訊號有產生、被 iOS 擋在輸出端（系統層路由）；
  峰值為 0 但時鐘正常 → 圖形連接或起播時機問題；時鐘沒前進 → context 根本沒在算圖。
- 主要檔案：`audio-debug.html`（新增）
- 驗證：桌機 Chrome 實測五個按鈕全部正常運作、log 累積不清空可一次截圖；
  首播路徑量到解碼峰值 0.9976、輸出峰值 0.4861、時鐘前進 2.51s，判讀邏輯正確。
  線上路徑為 `https://dipvinyl.tw/audio-debug.html`，待店主用 iPhone 實測回報。

### 2026-07-20｜試聽淡出失效修正（fadePreview 缺錨點）

- Repo：`dip-vinyl-shop`
- 改動：試聽的 1.5 秒淡出其實從來沒有生效，聽起來一直是硬切。成因在 `fadePreview()`：
  `cancelAndHoldAtTime(now)` 只有在「now 之後還有排程事件」時才會補上保持點；淡入的 ramp
  早在 28.5 秒前就結束，所以它什麼都不做，接著的 `linearRampToValueAtTime(0, now+1.5)`
  會從那個舊事件（t=1.5s、值 0.5）起算整條斜線 → 呼叫當下音量就已經掉到約 0.025（2.5%），
  剩下的 1.5 秒只是在聽不見的音量下慢慢爬到 0。修法：不再依賴 `cancelAndHoldAtTime`，
  一律自己 `cancelScheduledValues(now)` + `setValueAtTime(現值, now)` 當錨點再拉 ramp
  （原本 else 分支的寫法才是對的）。淡入不受影響（它前面本來就有 `setPreviewLevel(0)` 當錨點）。
  同一修正同時讓「30 秒播完」與「關閉簡介視窗」兩條淡出路徑都真的走滿 1.5 秒。
  另把三頁的 `dip-player.js?v=19` 一起改成 `?v=20`，讓已裝 PWA／service worker 的使用者拿得到新檔。
- 主要檔案：`dip-player.js`、`battle.html`、`index.html`、`roguelike.html`
- 驗證：`node --check dip-player.js` 通過。本機 static server 瀏覽器實測（攔截 GainNode 取樣真實 gain）：
  修正前 30 秒結束時 gain 由 0.5 在一個取樣內塌到 0.026；修正後 0.5 → 0.43 → 0.345 → 0.264
  → 0.179 → 0.094 → 0 走滿 1.5 秒。關閉視窗的 `stop({fade:true})` 同樣由「瞬間 0.038」修正為
  0.45 → 0.396 → … → 0。另以 OfflineAudioContext 獨立重現並確認 `cancelAndHoldAtTime` 的行為
  （28.6s 時值 0.0246，與線上量到的 0.026 吻合）。battle 與 roguelike console 皆無錯誤。
### 2026-07-20｜iOS 首次點開簡介沒聲音：靜音 keep-alive 提早被收掉

- Repo：`dip-vinyl-shop`
- 背景：iOS 以前幾乎完全不會觸發試聽，現在這套解鎖流程是好不容易調到最接近理想的狀態，
  **除了「第一次點開簡介沒聲音、關掉重開才正常」之外其他都順**。因此本次修改刻意做成單向的：
  只延長 audio session 的維持時間，完全不動 `installAudioUnlock()`／`primePreviewFromGesture()`／
  `unlock()` 這三個負責解鎖的函式，避免補東牆壞西牆。
- 改動：
  1. **首次沒聲音的根因**：`playItunes()` 原本在 `await loadPreviewBuffer()` **之前**就把用來維持
     iOS audio session 的靜音 `<audio>` keep-alive `pause()` 掉。第一次點開要等網路下載＋解碼
     （手機 1～3 秒），這段空窗沒有任何東西在發聲，iOS 會把 session 收掉，之後 `source.start(0)`
     就沒有輸出——而且 `AudioContext` 仍回報 `running`，不會拋錯，所以完全查不出來。第二次因為
     buffer 已在 `previewBufferCache`，幾乎同一個 tick 就 start，來不及被收掉，所以正常。
     修法：把 `audio.loop=false; audio.pause()` 移到 `source.start(0)` 之後，讓靜音檔在整個
     下載解碼空窗期間持續墊著，等真實試聽開始輸出、由它接手 session 之後才釋放。失敗分支一律
     不收，讓下一次重試仍有 session 可用。小唱盤機「再點一次重播」推定同一根因（該邏輯本來就寫好了）。
  2. **順手修掉自己前一筆改動引入的回歸**：`fadePreview()` 改成讀 `gain.value` 當錨點後，
     「靜音後重播」會沒有淡入——因為 `setPreviewLevel(0)` 才剛在同一個 render quantum 排下去，
     `gain.value` 還是舊值 0.5，於是拉出一條 0.5→0.5 的平線、瞬間全音量進場。改成自己追蹤
     `previewLevel`／`previewRampEnd`：ramp 還在跑就取實際值（中途打斷不跳音），已跑完就取記錄值。
- 主要檔案：`dip-player.js`、`battle.html`、`index.html`、`roguelike.html`（版號 v=20 → v=22）
- 驗證：`node --check` 通過。本機瀏覽器實測（攔截 GainNode 取樣、並人工延遲音檔下載 3 秒放大空窗）：
  下載解碼的 0～3.3 秒期間 keep-alive 維持 `paused:false`，3.6 秒真實試聽開始輸出（gain 0.019 起淡入）
  的同時才被釋放，交接正確。回歸測試四條路徑全過——首播淡入 0.031→…→0.5；靜音後重播淡入
  0.043→…→0.5（修正前是直接 0.5）；30 秒自然結束淡出 0.45→0.368→…→0 收在 30.5 秒；
  淡入途中打斷由 0.097 平順降到 0 不跳音。Apple 查無資料（S3）的失敗路徑仍照舊由 `playAlbum`
  錯誤分支收掉 keep-alive。battle 與 roguelike console 皆無錯誤。
- 注意：iOS 實機尚未驗證（桌機 Chrome 無法重現首次沒聲音的症狀，即使人工延遲 3.5 秒仍正常播放），
  需由店主用 iPhone 實測確認。若仍無聲，則本節的 session 假設被推翻，要再往下一層查。

### 2026-07-20｜整備面板列出全收藏＋趟中修理真正生效

- Repo：`dip-vinyl-shop`
- 改動：
  1. **趟中修理不顯示、還會被吃掉的 bug**：`doRepair` 原本只寫 `META.relicWear`，但趟中面板顯示與實際效果都讀 `RUN.relicWear`，且下一場結束 `syncWearToMeta()` 會用 RUN 的舊耗損把 META 蓋回去——趟中花的修理費等於白花。修法：新增 `curWearOf(id)` 單一入口（趟中帶著的讀 RUN、沒帶上路的讀跨趟紀錄），`doRepair`／`openRelicCare`／整備面板列全部改用；修理時 RUN 與 META 同步寫入，並 `recomputeMaxHp`（品相回升會改 ×倍率）＋`saveRun()`。
  2. **整備面板列出所有收藏配件**：`benchedRelics()` 從「只列 RUN.relics 沒出戰的」改為「RUN 帶著的＋收藏（`META.relicsOwned`）裡其他所有健在件」的聯集，出戰 3 件在上、其餘列在庫存區可隨時換上場。`loAct('equip')` 對還沒帶上路的收藏件走 `carryRelic()`（耐久沿用跨趟紀錄）。勝利畫面的「🎒 整備」按鈕條件放寬為 `RUN.relics.length || ownedRelicIds().length`，開局沒帶配件也能中途裝備。
- 主要檔案：`roguelike.html`
- 驗證：兩個 script 區塊 `node --check` 通過。本機 static server 瀏覽器 JS 實測：收藏 6 件、帶 3 件開趟 → 整備面板庫存正確列出未帶的 3 件且耐久讀 META（30/75/5）；卸下唱針換上見本盤，耐久 70 正確帶入 RUN；小保養唱針 40→15，RUN／META／面板三處同步、`syncWearToMeta()` 後不回退、現金 500→485；庫存件整新到全新 META 歸 0；開局零配件時勝利畫面照樣出現整備按鈕、可從收藏直接裝上。console 無錯誤。

### 2026-07-20｜試煉進度保留改跨裝置（存進玩家帳號）

- Repo：`dip-vinyl-shop`
- 改動：進行中那一趟的存檔改成登入者跟著帳號走，存 `users/{uid}` 的 `rogueRun` 欄位——和 `rogueMeta` 同一份文件，**不用改 Firestore 規則**。訪客行為不變（只存本機）。
  - **同步頻率**：平時只在場間畫面同步（戰鬥中每一手都寫太耗流量，留在本機就好）；按「⏸ 保留進度離開」時強制連戰鬥狀態一起上傳，換裝置能接在同一手、同一個對手暗定牌。跳頁前等寫入完成（最多 1.5 秒、按鈕顯示「儲存中…」），否則 fire-and-forget 的寫入會在導頁時被丟掉。
  - **墓碑 `rogueRunClearedAt`**：清檔（死亡結算／放棄／開新趟）時把 `rogueRun` 設 null 並記時間，讓別台裝置上同一趟的舊存檔作廢——否則同一趟能在兩台裝置各結算一次樂歷。
  - **比對規則**（`pullCloudRun`，跟著 `bindMetaToAccount` 在登入後跑）：墓碑較新 → 清本機；雲端較新 → 換裝置接續（後存的贏）；本機較新 → 保留本機。只在還沒開打時才動本機存檔，避免登入回應太慢時把正在玩的局面抽掉。
  - 離開對話框的說明文字改成依登入狀態顯示「換裝置也接得回來」或「只存這台裝置」。
- 主要檔案：`roguelike.html`（module 段新增 `__loadRogueRun`／`__saveRogueRun`；遊戲端新增 `syncRunToCloud`／`pullCloudRun`）、`ROGUELIKE_DESIGN.md`（§5.3 補「跨裝置」段）
- 驗證：注入假雲端在瀏覽器實測兩台裝置情境——戰鬥中不上雲、場間才同步（快照 3KB）；裝置 B 本機無存檔時從雲端拉回第 3 場並接續；裝置 B 打到死後立墓碑，裝置 A 上那份舊存檔被清掉、不能重複結算；「保留進度離開」強制同步含戰鬥狀態（8.4KB），另一台接回來是同一手同一個對手暗定牌；本機比雲端新時保留本機；`_phase` 非 menu（正在玩）時不動本機存檔；訪客完全不碰雲端。module 與主 script 兩段語法檢查通過、console 無錯誤。

### 2026-07-20｜試煉三機制：進度保留、備份盤倒帶、中繼票

- Repo：`dip-vinyl-shop`
- 改動：
  1. **⏸ 進度保留（自動續玩）**：一趟自動存一份在本機（`dipRogueRun_v1`），關掉分頁再開，主選單最上方出現「上一趟還在進行中」一鍵接續，不用被迫一次打完。存檔時機＝每回合開始、**玩家出牌的當下**、以及每個場間畫面（勝利／藏家三選一／升級／抽盤／撿盤／倒帶詢問／快速選秀）。存的是狀態快照而非亂數種子，**AI 每回合仍重新讀局**（虛晃、留手照舊隨機），續玩不會變成背版；又因為出牌當下就存檔，看到結果再關掉分頁也沒用——續玩會把那一手原樣打完，場間的三選一與抽到的盤也照原樣還原，關掉重開不會重骰獎品。戰鬥中的 ✕ 改成三選一：保留進度離開／放棄這趟離開（原本不結算的行為保留）／留下來繼續打；選流派開新趟若偵測到未完成存檔會先確認。
  2. **💿 備份盤（整趟一次的倒帶）**：每打贏一位傳說藏家，勝利畫面問要不要把當下壓成備份盤，整趟只能壓一次。死亡時先問要不要倒帶回那一場再決定結不結算，用掉就沒了。只回捲戰局（HP／牌組／深度／局內等級），**現金與配件耗損不回捲**、已毀損的配件不會回來。
  3. **🎫 中繼票（中繼點第 10 場）**：從頭打贏第 10 場才賺到一張票，同時存下踏進第 10 場前的 build 快照。用票才能從第 10 場開打，兩條路——照快照配置接續，或重選流派種子＋快速選秀（5 次撿盤二選一＋5 次升級三選一，刻意比正常略少）。票是 1:1 換來的，所以「再也不從頭打」不可能發生；樂歷結算改按**實際打過的場數**（`depth − baseDepth`），中繼開局沒有刷等優勢，最深紀錄仍用原始 depth。`MID`（depth／draftCards／draftLevels）可由後台 `roguelike.mid` 覆寫。
- 主要檔案：`roguelike.html`、`ROGUELIKE_DESIGN.md`（新增 §5.3）
- 驗證：本機 static server 實測（瀏覽器 JS 驅動）：開局→存檔→重整→接續，局面與手牌、對手暗定牌完全一致；出牌當下重整會自動把那一手打完（手牌少一張、HP 12→8、回合前進），不能重選；藏家三選一與抽到的盤重整後還原同一批；打到第 10 場正確發票並存下 depth 9 快照；照快照開局＝第 10 場藏家戰、扣票、耐久取現況；重選配置走完 5 撿盤（牌組 15 張）＋5 升級後直接開第 10 場；死亡先跳倒帶詢問、倒帶後 depth 回到 11 且現金不回捲、第二次死亡直接結算並清除存檔；中繼趟結算只算實際場數。375px 無橫向溢位、console 無錯誤；三個 script 區塊語法檢查通過。

### 2026-07-20｜移除「中國內地」用語＋種子選擇頁加回上一步

- Repo：`dip-vinyl-worker`、`dip-vinyl-shop`
- 改動：
  1. 崔健《新长征路上的摇滚》的人工簡介把「中國內地第一張原創搖滾專輯」改為「中國第一張原創搖滾專輯」，移除以中國為主體、矮化台灣的用語。同時全庫掃描 `內地／大陸／台灣地區／中國台灣／港澳台／兩岸三地` 與常見中國用語（視頻、質量、信息、網絡、軟件、硬件、屏幕、音頻⋯），確認 CURATED_DESCS、NEOCLASSIC_LIST、desc-gen 批次與已入 KV 的 5,773 筆簡介都沒有其他違例；`index.html` 的「歐洲大陸」是地理名詞、`水準` 是台灣用語，均保留。
  2. Roguelike 種子選擇頁（選完流派後挑專輯）標題左側加一顆 `←` 小箭頭按鈕，點了回到選流派畫面。與標題同一行、寬 27px，不增加任何版面高度。`chooseClass()` 每次都會 `initRun()` 重建 RUN，所以回上一步再選流派不會殘留舊狀態。
- 主要檔案：`dip-vinyl-worker/src/index.js`、`dip-vinyl-shop/roguelike.html`
- 驗證：`node --check src/index.js` 通過；`npx wrangler deploy` 已部署（Version `6375beac`），線上 `/album-desc` 回傳新文案且 `X-Cache: CURATED`（第一次查到舊文案是 CDN 邊緣快取，加 cache buster 後確認正確）。前端一律走 `/album-desc`、不從 Firestore 讀簡介，故各頁面同步生效。瀏覽器實測：選流派 → 種子頁出現「回上一步：重選流派」→ 點擊回到流派清單；桌機與 375px 手機下箭頭與標題同一行、無橫向溢位。

### 2026-07-20｜Apple 試聽首次開啟：預配對、手勢解鎖與預熱快取

- Repo：`dip-vinyl-shop`
- 改動：新增 5,349 筆可直接播放的精簡 Apple 音源索引；頁面掛載時背景載入索引，命中後直接使用預存 preview URL，避免首次開啟再做名稱搜尋。首次指標手勢同時解鎖 Apple Web Audio；Roguelike 長按在 `pointerdown` 當下解鎖，不再等 450ms 計時器。預熱與正式播放共用下載／解碼 Promise（保留最近 3 筆）；若預存 URL 失效，會自動退回 Apple 搜尋。對戰與試煉唱機新增載入旋轉狀態。
- 主要檔案：`dip-player.js`、`battle.html`、`roguelike.html`、`index.html`、`data/apple-audio-runtime-v1.json`、`scripts/build-apple-audio-runtime-map.mjs`、`verify-playback.mjs`
- 驗證：`node verify-playback.mjs` 通過（包含預配對免搜尋、預熱共用下載、失效 URL 搜尋修復）；`node --check dip-player.js`、`node scripts/build-apple-audio-runtime-map.mjs`、`git diff --check` 通過。The Clash／Diana Ross／Ol’ Dirty Bastard／Sarah Vaughan with Clifford Brown 均確認命中索引。

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

### 2026-07-21｜品味生死鬥大廳改回原排版，只把音樂地圖收成第一列（修正同日前一筆）
- Repo：`dip-vinyl-shop`
- 改動：店主看過並排雙卡版後決定**保留原本的直式全寬排版**，只採用地圖收合的做法。因此把 `pvp.html` 的 hero（含兩行副標）、`.cards` 直式全寬卡、置中文字、右側箭頭全部還原成改版前的樣子；音樂地圖不再放在 hero 與卡片之間佔 370px，而是變成 `.cards` 清單的**第一列**收合條（65px：40px 迷你雷達＋「我的聆聽品味地圖／收藏 N 張 · 主路徑 X / Y」＋展開箭頭），點擊才在原地展開完整 compact 地圖，狀態存 `localStorage` 的 `dipPvpMapOpen`（預設收合）。展開面板內隱藏 widget 自己的標題列（`.music-map-head`），避免與收合條標題重複。收合條內容用 `max-width:760px` 置中，桌機才不會貼齊最左。前一筆的 `:hover` 包 `@media (hover:hover)`、補 `:active` 觸控回饋、`:focus-visible` 保留；`music-map-widget.js` 的 `ranking`／`summary`／`thumb` 三個新匯出續用。
- 主要檔案：`pvp.html`
- 驗證：本機瀏覽器實測——iPhone 375×812 收合時地圖列 y=181 高 65px，兩張入口卡 y=246／355 各高 109px，內容到 464px 收尾，**兩個入口完整在第一屏**（改版前落在 700px 之後）；展開後地圖列 492px、最後一張卡底 891px、無橫向捲動；桌機 1280 版面與原版一致、`scrollWidth` 無溢出；截圖確認展開後不再有重複標題；`aria-expanded` 與 `localStorage` 開關切換正確；console 零錯誤。

### 2026-07-21｜品味生死鬥大廳版面重排（兩個入口優先、音樂地圖收合）
- Repo：`dip-vinyl-shop`
- 改動：店主反映 `pvp.html` 大廳「地圖太大、兩個對戰選項被壓在底部很難按」。實測 iPhone 375×812 下地圖區佔 ~370px（46% 螢幕），兩張入口卡落在 700px 之後、iPhone SE 完全在摺線下。採「優先權對調」方案：
  1. **兩個對戰入口上移並排**：`.deck` 改 2 欄格線放在 hero 正下方，直式卡（編號／名稱／描述／右下箭頭），卡高固定 148px（<400px 螢幕 138px）。
  2. **音樂地圖降級為可收合摘要條**：新增 `.mapbar`，收合時只有 70px 一條——44px 迷你雷達縮圖 ＋「收藏 N 張 · 主路徑 X / Y」一行字；點擊才展開完整 compact 地圖，開關狀態存 `localStorage` 的 `dipPvpMapOpen`（預設收合）。
  3. **hero 瘦身**：刪掉兩行副標（文案併入卡片描述），padding 40→26。
  4. 順手修：箭頭改 `position:absolute` 釘在卡片右下、不再與描述文字重疊；`:hover` 包進 `@media (hover:hover)` 並補 `:active` 給觸控回饋；地圖預設收合所以不再有 Firestore 回來才撐開高度的版面跳動。
  - `music-map-widget.js` 新增三個匯出供摘要條使用：`ranking(data)`（依點數排序、含中文名）、`summary(data)`（張數／點數／前兩大路徑）、`thumb(data)`（只有外框＋形狀的迷你 SVG）＋對應 `.music-map-thumb` 樣式；皆為新增，既有 `mount` 行為不變，其他頁面（`index.html` 等）沿用 `?v=12` 不受影響，`pvp.html` 引用改 `?v=13`。
- 主要檔案：`pvp.html`、`music-map-widget.js`
- 驗證：本機瀏覽器實測——iPhone 375×812 第一屏總高 **340px**（原 ~775px），兩張卡位在 y=116–256 完全在上半部，各 166.5×138px；展開地圖後 mapbar 488px、頁面不橫向捲動；桌機 1280 寬置中 680px、`scrollWidth` 無溢出；箭頭與描述經幾何量測確認無重疊；收合開關 `aria-expanded` 正確切換；console 零錯誤。開工前交接：`git fetch` 遠端無新提交，工作區僅先前已刪的 `audio-debug.html` 與未追蹤 `data/apple-audio-map-*.json`，無衝突。

### 2026-07-20｜對戰旅途六項改進（音樂、整備維修、對手卡池、無限續戰、手牌長按）
- Repo：`dip-vinyl-shop`
- 改動：依店主六點需求改 `roguelike.html`：
  1. **抽/撿盤彈窗播試聽**：`openDrawReveal`（單張）與 `openLootReveal` 加上像素唱機 `rogueMiniPlayer` 與 `playRogueAlbum(c)`，跟唱片資訊同一套；確認帶走時 `_takeDrawnCard`／`confirmLoot` 停播（`DipPlayer.stop`）。
  2. **標題正名**：卡片資訊彈窗標題「卡片資訊」→「唱片資訊」。
  3. **整備即可維修/升級**：`openLoadout` 每列加「🔧 保養/升級」鈕（`loCare`→`openRelicCare`，疊在整備面板上），面板標頭補現金顯示；`refreshCareContext` 增補 `loadoutMask` 開著時重繪。**這推翻先前「保養只能趟間」的經濟決策**——店主要求每場結束整備時就能花現金維修＋升級（出戰欄上限仍維持 `wearSlots()`＝3，只是換裝/維修更自由）。
  4. **對手用完整卡池、照深度撈**：新增 `enemyPoolBag(d)`——從 `allPool()`（5600+ 張）撈，品質下限 `minSum=min(13,3+floor(d*0.7))` 隨深度爬升（d1→門檻3幾乎全池、d12→只剩最強約 400 張）；`enemyForDepth` 與補牌共用，移除舊的 `ranked/strongBag/wildBag/bandN` 固定強牌帶。
  5. **牌出完不結束、補三張續戰**：新增 `refillDeck(side)`——**雙方都從卡池隨機補**（玩家 `allPool()` 非王牌、對手 `enemyPoolBag(depth)`），各 3 張，補的牌是 `copyCard` 進 `G.p/e.deck`、**只在本場用、不寫回 `RUN.deck`、打完即棄**；`resolveTurn` 抽牌前偵測牌庫空即補，刪掉「任一方無牌→速判」；`startTurn` 的 `aiPlan()` 落空改為補牌重規劃；免死續戰路徑同步補牌。打到一方 HP 歸零才分勝負。
  6. **手牌長按看簡介＋試聽**：新增 `attachHandPress(el,card)`（450ms 長按→`openCardInfo`），`renderHand` 逐格掛上；`selectCard` 加 `_handHeld` 守門避免長按誤選。
- 主要檔案：`roguelike.html`
- 驗證：本機 http-server（localhost:8788）載入 console 零錯誤；JS 實測——`allPool()`=5619、`enemyPoolBag(1)`=5571／`enemyPoolBag(12)`=401（深度分級生效）；用 `initRun('guard')`→塞 5 種子→`startRun()` 實開第 1 場，雙方手牌各 5、手牌 tile 5 格、敵牌全來自卡池且非王牌；深度 9 `refillDeck` 雙方各補 3 張、uid 齊、敵補平均總星 10.3；`openCardInfo` 標題顯示「唱片資訊」且含唱機；`openLoadout` 顯示「🔧 保養/升級」＋現金、`loCare`→保養視窗含維修＋升級、`doRepair` 實測耗損 40→0；`openDrawReveal` 含唱機、`confirmDraw` 正常關閉。開工前交接：`git fetch` 遠端無新提交、工作區僅 `data/` 未追蹤，無衝突。

### 2026-07-19｜配件像素圖真正隨等級進化（85 張手繪圖，取代等級外框）
- Repo：`dip-vinyl-shop`
- 改動：店主要的是「像素圖本體進化」而非只加外框。手繪 17 件 × Lv.1~5＝85 張專屬 12×12 像素圖並接進遊戲：Lv.1 陽春／磨舊 → Lv.2 標準（沿用原圖）→ Lv.3 進階材質 → Lv.4 鍍金精品 → Lv.5 傳說（金件＋星光）。演化有劇情感：集點卡點數 1→3→6→銀卡→金 VIP、洗碟水半瓶→滿瓶→金噴頭、名片 Lv.4 翻霧黑卡→Lv.5 黑金卡、唱針鈍尖→金尖→銀唱頭→金唱頭→鑽石針尖等。新增 `PIX_ICONS_LV` 資料表與青光色 `c:#3fb6c9`；`relicIconHTML(r,size,lvOverride)` 改依當前等級取 `PIX_ICONS_LV[icon][lv-1]`，缺表（後台自訂件）退回 `PIX_ICONS`、再無則 emoji；移除上一版的「等級外框」疊加邏輯（`LV_DECO`）與 `.lvspark`，改為 Lv.5 外圈淡金光暈 `.pixlv5` 脈動（`prefers-reduced-motion` 關閉）。藏家升級卡片仍預覽下一級圖。全站顯示點沿用同函式自動生效；admin 無需改（只存 icon 鍵，不畫等級圖）。
- 主要檔案：`roguelike.html`、`ROGUELIKE_DESIGN.md`
- 驗證：先產 85 張獨立預覽頁經店主確認；接進後 Node `--check` 語法通過；本機 http-server 實跑 console 驗證五級圖各異（SVG 長度/ rect 數不同）、Lv.5 帶 `.pixlv5`、17 件全覆蓋 `PIX_ICONS_LV`、emoji 自訂件正確退回、藏家升級預覽下一級；實際遊戲畫面截圖確認 17 件五級皆用遊戲真函式渲染出不同圖、Lv.5 金光暈可見；頁面載入 console 零錯誤。開工前交接：codex 已推 3 筆（Apple 音源二輪、四平台串流連結，動到 roguelike.html 的簡介區塊），與本次圖示程式不重疊、本機 HEAD 已含其提交、無衝突。

### 2026-07-19｜專輯簡介改為四平台串流連結
- Repo：`dip-vinyl-shop`
- 改動：單場對戰與 Roguelike 的專輯簡介、勝利抽盤及撿盤視窗，將原本單一「串流聽這張」改成與首頁抽專輯卡相同的 Apple Music、Spotify、YT Music、Bandcamp 四平台列；Apple／Spotify／YT 提供立即可點搜尋，Spotify 背景換成專輯直連，Bandcamp 只有確認到正式專輯頁才啟用。Apple 試聽成功後 Apple Music 鍵會換成內容直連，並補上 iTunes 試聽來源標示。
- 主要檔案：`battle.html`、`roguelike.html`
- 驗證：兩頁共五段 inline script 全數通過 Node module 語法檢查；確認舊單一串流按鈕與函式已移除，四平台元件、非同步直連更新與 iTunes 來源標示均存在，`git diff --check` 通過。正式站桌面版實際開啟對戰專輯簡介，四平台列、Apple／Spotify 專輯直連與 Bandcamp 無結果停用狀態正確；390×844 手機版四鍵維持單列，頁面、簡介與按鈕列皆無橫向溢出，console 零錯誤。Roguelike 正式站亦確認新版四平台模板已上線、390px 頁寬無溢出且 console 零錯誤。

### 2026-07-19｜Apple 音源第二輪安全補查
- Repo：`dip-vinyl-shop`
- 改動：確認 6,126 張卡實為 6,122 個唯一專輯加 4 個標點／大小寫重複別名，修正品質 gate 的完整覆蓋算法；新增第二輪 Apple 專輯層級搜尋，依序檢查 TW／US／JP／GB storefront，並以 collectionId 回查實際試聽後才接受高信心配對，模糊結果保留待人工確認。
- 主要檔案：`scripts/build-apple-audio-map.mjs`、`scripts/verify-apple-audio-map.mjs`、`scripts/refine-apple-audio-map.mjs`
- 驗證：三支腳本均通過 `node --check`、`git diff --check`；完整覆蓋檢查為 6,126 張卡／6,122 唯一專輯／4 重複別名／0 缺漏並通過；以前三筆無試聽項目試跑，正確補回 The Allman Brothers Band《At Fillmore East》，另兩筆維持無試聽。

### 2026-07-19｜配件像素圖示隨等級進化（等級鑲框）
- Repo：`dip-vinyl-shop`
- 改動：發燒配件的 12×12 像素圖示會隨 Lv.1~5 越來越高級——本體不重畫，`relicIconHTML` 把 viewBox 外擴一圈疊「等級鑲框」：Lv.1 素面 → Lv.2 四角銅釘 → Lv.3 銀色 L 形角框 → Lv.4 金色角框 → Lv.5 金滿框＋兩點星光交錯閃爍（`.lvspark` CSS 動畫）。全站沿用同一個函式，開戰前選單／整備面板／圖鑑／保養視窗／戰鬥列自動生效；藏家三選一的「升級」卡片圖示先預覽下一級外框（`relicIconHTML(r,36,lv+1)`）。emoji 自訂圖示（後台加的）維持原樣不加框。
- 主要檔案：`roguelike.html`
- 驗證：本機 console 逐級檢查 SVG 結構（Lv.2 +4 銅釘、Lv.3/4 +12 角框、Lv.5 +52 滿框＋2 星光、viewBox 12→14）；產出 17 件 × 5 級的獨立預覽頁人工目視確認；頁面載入無 console 錯誤。

### 2026-07-19｜發燒配件大改版：五階品相、毀損即移除、Lv.1~5 升級制
- Repo：`dip-vinyl-shop`
- 改動：依店主三點指示優化發燒配件系統。①品相改唱片行邏輯五階：只有耐久 100 算「全新」，1 點耗損就掉「近全新」（M 0／NM 1–39 皆 ×1 → VG 良品 40–69 ×0.6 → G 堪用 70–99 ×0.3 → F 毀損 100）；各類別語彙補到五階（耗材滿瓶→空瓶、唱針全新→斷針）、戰鬥列耗損條改 5 格。②耐久磨到 0＝整件毀損、直接從收藏移除（`META.relicsOwned` 新欄位＝現持有清單；`relicsSeen` 仍當圖鑑永久點亮，未持有顯示「已毀損 · 未持有」），只能再打贏傳說藏家重新入手；原「♻ 回收報廢件」機制與報廢保養分支全數移除；洗碟水保養改在毀損判定前結算（最後一口氣救得回）。③新增配件等級 Lv.1~5（`META.relicLv`，跨趟且毀損後保留、帳號合併取較高）：fx＝Lv.1 起始值（整體壓低，如開局氣勢 2→1、輾壓傷 2→1、經驗 +25%→+10%）、fx5＝Lv.5 滿級值，線性內插（`fxAt`）；desc 用 `{v}` 帶入當前數值；升級管道＝藏家三選一撞已持有同款（免費升一級＋整新，滿級退出掉落池）或花現金升級（`CASH.upCost` 60/100/150/220、tier2 ×1.5，不附整新）；每級再 −6% 磨損（`WEAR.lvDura`）。神秘見本盤免死回魂 HP 改隨等級（4→10）。admin.html 同步：`DEF_ROGUE.relics` 更新＋配件編輯器加「Lv5 值」欄；roguelike `applyConfig` 對舊版後台存檔自動補回 `fx5`／`{v}` desc。
- 主要檔案：`roguelike.html`、`admin.html`、`ROGUELIKE_DESIGN.md`
- 驗證：本機 http-server 載入 roguelike.html／admin.html 皆無 console 錯誤；console 實測品相階梯門檻（0 全新／1 近全新／100 毀損）、fxAt 內插（唱針 1/2/3）、desc 帶值、升級成本表與 tier2 倍率、舊存檔 `relicsOwned` 遷移（耗損 100 的自動剔除）、applyWear 毀損整件移除（RUN＋META 同步、等級保留）、`upgradeRelic` 整新、滿級退出 relicPool、保養視窗與毀損播報渲染全數正確；Node `--check` 兩檔 script 語法通過。

### 2026-07-19｜像素唱機搬進專輯介紹彈窗、兩遊戲介紹版面統一
- Repo：`dip-vinyl-shop`
- 改動：依店主指示把像素唱機從戰場移進「專輯介紹（卡片資訊）」彈窗：battle 移除牌桌正中央的 `#battleMiniPlayer`、roguelike 移除我方小人旁那台，唱機改為彈窗內「三屬性下方、簡介上方」置中一台，播放時唱盤轉動＋音符飄出，點一下靜音停播、再點恢復播放目前這張（battle 用 recModal 事件委派，roguelike 用全域 `toggleCardInfoMusic()`；皆記住彈窗當前卡片以便恢復）。修正 roguelike 介紹彈窗三屬性跑版的根因：`.st` 的橫排規則只套在 `.card .st`，彈窗內沒套到，且屬性名稱誤吃 `.drawcard .lab` 金色大標樣式——補上 `.drawcard .st`／`.st .lab` 專屬規則，名稱＋星格同列、整組置中。單場對決的卡片資訊彈窗改成與 roguelike 一致的排版：封面→藝人→專輯→王牌徽章→三屬性星格（同色 pips、出招屬性名稱金色）→唱機→簡介→「▶ 串流聽這張」（雜牌不給串流鍵；battle 補上 `--classic/--obscurity/--accessibility` 色票與 `streamSearchUrl`/`hookStreamLink`，先給 Spotify 搜尋連結、抓到直連再換上）。
- 主要檔案：`battle.html`、`roguelike.html`
- 驗證：本機 http-server 實跑兩頁。battle：牌桌中央唱機消失；出牌後點檯面卡，彈窗順序與置中量測（stats/唱機 center offset 皆 0、三列 lab/pips X 對齊）、唱機 playing→點擊 muted 停播→再點恢復 playing、串流鍵存在。roguelike：戰場上無唱機；彈窗屬性名稱恢復灰 9px 非大寫、名稱與星格同列、整組置中、唱機置中並可靜音/恢復。兩頁手機 375px 寬皆無橫向溢出、彈窗內容置中完整。console 全程無 error。截圖工具逾時（既知環境問題），以 DOM 幾何量測代替。

### 2026-07-19｜啟動全卡池 Apple collectionId 預匹配管線
- Repo：`dip-vinyl-shop`
- 改動：依店主指示，將播放來源方向改為事先替 5,526 張 seed 卡與 600 張 apex 卡（共 6,126 張不重複專輯）建立 Apple 音源對照，不再於玩家點開介紹時依名稱臨時猜測。新增可中斷續跑、原子保存的批次工具：以保守速率查 TW／US storefront，嚴格核對藝人、專輯、合作藝人及版本，保存 `collectionId`、storefront、正式名稱、試聽數與代表 preview；低信心結果不強配，區分待複核、Apple 無試聽與查詢錯誤。第一批 1,000 張完成後會先通過結構、成功率、錯誤率與真實 `/lookup` 抽驗 gate；通過後自動重新分類第一批模糊結果，再接續掃完剩餘卡池。加入每小時進度／完成通知，遇品質 gate 失敗會停止，不會重複啟動批次。
- 主要檔案：`scripts/build-apple-audio-map.mjs`、`scripts/verify-apple-audio-map.mjs`、`scripts/continue-apple-audio-map.mjs`、`.gitignore`；執行中產物位於 `data/apple-audio-map-*.json`
- 驗證：三支腳本通過 `node --check`；前 5 張實跑可即時續存，3 張精準匹配、2 張保守列待確認、0 API 錯誤；部分資料執行品質檢查為 matched rate 86.41%、0 結構問題、0 錯誤並通過。第一批與後續全卡池程序仍在背景執行，完成後另新增最終結果紀錄。

### 2026-07-19｜修正 Apple 台灣區在地化藝人名與週年重製版配對
- Repo：`dip-vinyl-shop`
- 改動：店主回報 The Clash《London Calling》、Diana Ross《Swept Away》與 Ol' Dirty Bastard《Return to the 36 Chambers: The Dirty Version》無音樂。逐張查 Apple 台灣區 Search JSON，確認前兩張的 `artistName` 被在地化成「衝擊合唱團」「黛安娜羅絲」，第三張只回傳帶 `(25th Anniversary Remaster)` 的版本；舊邏輯因此分別在藝人與專輯版本比對階段排除。現在當搜尋詞與專輯已吻合、輸入為拉丁藝人名但 Apple 回傳 CJK 在地化名稱時允許配對，拉丁字翻唱／同名專輯仍需通過原藝人檢查；版本清理則會整段移除含 remaster／anniversary／deluxe 等關鍵字的括號，避免殘留 `25th`。音訊仍沿用 v17 的純 Web Audio、50% 音量與 1.5 秒淡入淡出；快取參數升至 v18。
- 主要檔案：`dip-player.js`、`battle.html`、`roguelike.html`、`index.html`、`verify-playback.mjs`、`PROJECT_MEMORY.md`
- 驗證：`node verify-playback.mjs` 全數通過，新增三張實際 Apple TW 回傳型態的回歸。手機文字閘道真實查詢三張皆 200，修正後分別配對 23、10、18 首；本機真實瀏覽器逐張連線 Apple 並播放成功，狀態皆為 `playing/itunes`，console 無 error／warning。`node --check dip-player.js` 通過。

### 2026-07-19｜手機 Apple 試聽改走純 Web Audio，消除起播 100% 音量旁路
- Repo：`dip-vinyl-shop`
- 改動：店主真機確認上一版只有關閉介紹時會瞬間降到 50% 再淡出，點開介紹仍以 100% 突然起播。根因是 iOS 的 `MediaElementAudioSourceNode` 路由不穩定：雖然程式先把 GainNode 設為 0，實際 `<audio>` 聲音仍可能繞過節點直接輸出。本次不再讓 Apple `.m4a` 進入 `<audio>`：改為 CORS 抓取試聽檔、`decodeAudioData` 解碼，再以唯一的 `AudioBufferSourceNode → GainNode → destination` 路徑播放；起播前 Gain 固定為 0，開始後 1.5 秒線性升至 0.5，關窗仍以 1.5 秒降至 0 才停止。`<audio>` 只保留全靜音手勢解鎖，不會收到真實試聽 URL。快取參數升至 v17。
- 主要檔案：`dip-player.js`、`battle.html`、`roguelike.html`、`index.html`、`verify-playback.mjs`、`PROJECT_MEMORY.md`
- 驗證：`node verify-playback.mjs` 全數通過，明確檢查真實 Apple URL 只被 fetch／解碼、BufferSource 只能接到 GainNode、起播 0→0.5／1.5 秒與關窗 0／1.5 秒後才停止；`node --check dip-player.js` 通過。390×844 真實瀏覽器完成對局並點敵方 Todd Rundgren《Runt》：介紹開啟後成功進入 playing，頁面 `<audio>` 仍只有靜音 blob（沒有 Apple 真實音檔旁路），關閉介紹後播放狀態結束，console 無 error／warning。

### 2026-07-18｜手機 iTunes 查詢加入可用備援，介紹關閉淡出通過 390px 實測
- Repo：`dip-vinyl-shop`
- 改動：店主回報 Windows 已正常、手機仍抓不到 iTunes 且關閉介紹沒有淡出。再次分離驗證後確認：手機當時只停在手勢解鎖用的靜音 WAV，根本沒有取得試聽音檔，因此不是 GainNode 的 1.5 秒參數失效；Apple 同時也會封鎖 Cloudflare Worker 機房出口，不能把查詢單純搬到 Worker。播放器新增行動裝置專用查詢順序：手機先透過文字讀取閘道取得 Apple 公開 Search JSON，桌面維持官方 JSONP 優先，兩條路最後都只播放 Apple CDN 原始 `.m4a`，共同套用 Web Audio 的 50% 音量、1.5 秒淡入與 1.5 秒淡出。單場介紹關閉改為只要視窗原本開著就一律呼叫淡出停止，涵蓋手機關閉鈕、遮罩與 Esc；試煉頁原有關閉鈕／遮罩亦維持同一路徑。快取參數升至 v16。
- 主要檔案：`dip-player.js`、`battle.html`、`roguelike.html`、`index.html`、`verify-playback.mjs`、`PROJECT_MEMORY.md`
- 驗證：`node verify-playback.mjs` 全數通過，涵蓋手機閘道優先、桌面 JSONP 優先／失敗再備援、50% 增益、1.5 秒淡入及關窗淡出。390×844 本機真實瀏覽器完成一回合並開啟 Robbie Basho《Visions of the Country》：成功載入 Apple `.m4a` 且播放時間前進；關閉後 0.3 秒視窗已消失但音訊仍在淡出、約 1.5 秒後才 pause（非突然停止）。`node --check dip-player.js` 與 `git diff --check` 通過。

### 2026-07-18｜關閉專輯介紹時同步讓音樂淡出停止
- Repo：`dip-vinyl-shop`
- 改動：店主確認 Windows 桌面版的點擊播放、1.5 秒淡入淡出與 50% 音量皆正常後，新增介紹視窗生命週期連動：單場對戰與無止盡試煉在按關閉、點遮罩外或（單場）按 Esc 關閉專輯介紹時，播放器會從當下音量淡出 1.5 秒至 0，再真正 pause。單場對戰共用的「出過的牌」清單視窗不會誤停音樂；淡出期間若立刻點另一張專輯，舊停止計時器會被取消，不會誤停新音樂。播放器快取參數升至 v15。
- 主要檔案：`dip-player.js`、`battle.html`、`roguelike.html`、`index.html`、`verify-playback.mjs`
- 驗證：`node verify-playback.mjs` 全數通過，新增關窗後不立即 pause、Web Audio 於 1.5 秒 ramp 至 0、淡出完成才停止，以及淡出途中換專輯不受舊計時器影響的回歸；`battle.html`、`roguelike.html` 內嵌腳本通過 `node --check`；`git diff --check` 通過。

### 2026-07-18｜對戰改用可控音量的試聽來源，真正落實 1.5 秒淡入淡出與 50% 音量
- Repo：`dip-vinyl-shop`
- 改動：店主真機回報 v13 仍會突然全音量出聲。重新追查確認根因是 iPhone／iOS 不允許網頁控制 YouTube iframe 音量，`setVolume()` 模擬雖通過、真機卻會被平台忽略。為避免突發聲音，單場對戰與無止盡試煉改為點介紹時才查詢並播放可經 Web Audio GainNode 控制的 iTunes 30 秒試聽：同一點擊手勢先解鎖音訊圖，再從 gain 0 線性淡入 1.5 秒至 0.5；揭牌時不再預抓無用的 YouTube／Spotify，找不到試聽時也不退到無法保證音量的 YouTube。共用音量由 30% 改為店主指定的 50%。桌面仍使用 YouTube 的其他路徑也加強為載入與 buffering 全程 mute，確認目標影片播放後才在音量 0 解除靜音並淡入。播放器快取參數升至 v14。
- 主要檔案：`dip-player.js`、`battle.html`、`roguelike.html`、`index.html`、`verify-playback.mjs`
- 驗證：`node verify-playback.mjs` 全數通過，新增 Web Audio gain 由 0 在 1.5 秒 ramp 至 0.5、YouTube 於 0 音量才解除靜音、`itunes-only` 不得退 YouTube 三項回歸；`battle.html`、`roguelike.html` 內嵌腳本通過 `node --check`；本機真實瀏覽器完成一回合後點我方檯面專輯，介紹正常開啟、實際載入 Apple `.m4a` 試聽並持續播放，console 無 error／warning；`git diff --check` 通過。

### 2026-07-18｜對戰音樂改為點專輯介紹才播放；修正 YouTube 1.5 秒淡入被覆蓋
- Repo：`dip-vinyl-shop`
- 改動：單場對戰與無止盡試煉全面移除每回合勝方自動播放；揭牌仍只做背景預抓，玩家主動點擊敵方或我方專輯、介紹視窗實際開啟時才播放。追查 1.5 秒淡入未生效的原因，是 YouTube 首次手勢解鎖排定的 160ms 清理動作會在真實專輯已開始後仍把音量直接設為 30%，中途蓋掉淡入；現在以播放 generation 防止舊清理動作干擾新播放，原有 30 秒片段結尾 1.5 秒淡出計時維持。播放器快取參數升至 v13。
- 主要檔案：`battle.html`、`roguelike.html`、`dip-player.js`、`index.html`、`verify-playback.mjs`
- 驗證：`node verify-playback.mjs` 全數通過，新增 YouTube 解鎖清理不得在淡入期間直接跳至 30% 的回歸；抽取 `battle.html`、`roguelike.html` 內嵌腳本後以 `node --check` 確認語法通過；`rg` 確認勝方播放函式／呼叫已移除，單場與試煉只剩介紹開窗觸發播放；`git diff --check` 通過。

### 2026-07-18｜全站音量 30%＋1.5 秒淡入淡出；修好 CJK 專輯的 YouTube 備援
- Repo：`dip-vinyl-shop`、`dip-vinyl-worker`
- 改動：店主回報混合版已能播多數專輯，但伍佰、閃靈、JAGATARA、三上寬等仍 S1（iTunes 被封且 YouTube 備援落空）。兩線處理：(1) 依店主要求，所有播放（唱片櫃／對戰／roguelike）音量降為 30%，開頭 1.5 秒淡入、結尾 1.5 秒淡出——iOS 忽略 `audio.volume`，iTunes 路徑改走 Web Audio GainNode（audio 元件加 `crossOrigin`，Apple CDN 帶 ACAO:* 不會被靜音；AudioContext 在手勢內建立／resume），YouTube 路徑用 `setVolume` 漸變；快取參數升 v12。(2) 追查 YouTube 備援落空根因是 worker 比對太嚴：閃靈敗在雙語標題（賽德克巴萊 Seediq Bale）與別名藝人（閃靈樂團），JAGATARA／三上寛敗在英文介面把標題羅馬拼音化。worker `/yt-music-link` 補三招：解析清單列（musicResponsiveListItemRenderer，冷門藝人沒有頂部大卡片）、寬鬆比對（專輯名允許包含、藝人逐 token 命中）＋頂部大卡片信任備援、CJK 查詢在英文介面落空後改用原文介面（ja／zh-TW／ko）重試。空結果快取由 6 小時降為 15 分鐘、快取鍵升 v5；shop 端 YouTube 空結果也比照 iTunes 套 15 秒重試窗。
- 主要檔案：`dip-player.js`、`index.html`、`battle.html`、`roguelike.html`、`verify-playback.mjs`、`dip-vinyl-worker/src/index.js`
- 驗證：shop `verify-playback.mjs` 全數通過；真實瀏覽器 harness 攔截 AudioContext 實測——增益淡入後停在 0.3、RMS 0.083 證明未被 CORS 靜音、29 秒起漸弱 30 秒歸零停止。worker 部署後實測：三上寛（寬／寛皆可）、閃靈兩張、JAGATARA、伍佰全數解析出專輯清單與 highlight，Rolling Stones／辛曉琪迴歸正常。

### 2026-07-18｜唱片櫃改混合播放：iTunes 優先、失敗自動退 YouTube
- Repo：`dip-vinyl-shop`
- 改動：店主真機回報代碼 S8＋S1，證實其 iPhone 所有網路出口 IP 都被 Apple `/search` 長效封鎖（店主無 iCloud+，排除私密轉送因素；本機桌面同時段正常，確認是出口 IP 問題）。經店主選擇採混合方案：`prefer:'itunes'` 的搜尋順序改為 `['itunes','youtube']`——iTunes 可用時播真 30 秒試聽＋唱盤曲目列表；被封鎖（S1）或查無（S3/S4）時自動退到對戰同款、已在 iOS 驗證過的 YouTube 高觀看曲目 30 秒片段。播放成功的狀態事件先清空曲目欄位再展開結果，避免退 YouTube 時殘留上一張的 iTunes 列表；唱片櫃預抓同時抓 YouTube 連結（走 Worker KV 快取）讓備援即點即播。快取參數升 v11。治本備案（離線建 collectionId 表＋執行期 `/lookup`，被封 IP 實測仍可用）留待日後需要時再做。
- 主要檔案：`dip-player.js`、`index.html`、`battle.html`、`roguelike.html`、`verify-playback.mjs`
- 驗證：`verify-playback.mjs` 新增「prefer itunes 在 Apple 失敗時退 YouTube、曲目列表清空」回歸，並確認雙雙失敗時仍回報 S 代碼；全部案例通過。

### 2026-07-18｜修正點擊永遠吃到快取空結果的 bug，失敗 toast 保證有代碼
- Repo：`dip-vinyl-shop`
- 改動：店主真機回報 v9 仍失敗且 toast 沒有任何 SX 代碼。追查發現 `playAlbum` 只在快取為 null 時才呼叫 `loadCachedSource`，因此頁面載入時前 4 張預抓一旦失敗被記成空結果後，之後點擊永遠直接拿快取的空資料——既不會過重試窗重新查詢、也沒有任何失敗代碼（「15 秒可重試」只對預抓有效，對點擊無效）。修正：`playAlbum` 一律經過 `loadCachedSource`（內部本來就會回快取並處理空結果重試窗），並在錯誤事件加 `S8` 保底代碼（＝沒有發出新查詢就失敗，通常是重試窗內的快取空結果），確保 toast 一定有代碼可回報。快取參數升 v10。
- 主要檔案：`dip-player.js`、`index.html`、`battle.html`、`roguelike.html`、`verify-playback.mjs`
- 驗證：`verify-playback.mjs` 新增「首次真查詢回 S4:n、重試窗內再點回 S8」回歸並全數通過；真實瀏覽器 harness 以修正後檔案重測 Beware，自動播放與 11 首播放列表正常。

### 2026-07-18｜唱盤機下方加播放列表、失敗診斷代碼；確認 Apple 封鎖會自動過期
- Repo：`dip-vinyl-shop`
- 改動：本機實測確認三件事：(1) Apple 對 `/search` 的 IP 封鎖是長效但**會自動過期**（本機上午還全 403，晚間已恢復 200），店主 iPhone 全數失敗即是他用過的網路出口 IP（含行動網路 CGNAT、可能還有 iCloud Private Relay 的共用出口）被舊版全量預抓打進封鎖名單；(2) 被封期間 `/lookup` 與試聽音檔 CDN 仍可用，是日後備援方向；(3) Deezer API 在台灣回空 data（地區限制），**不能**當備援來源。本次上線：唱盤機下方新增小型像素風播放列表（曲序＋曲名，點任一首即在同一顆已解鎖 audio 元件換源播放，並附 Apple Music 商店連結作為 attribution 合規），播放器失敗時 toast 附診斷代碼（S1=JSONP 被封／斷網、S2=逾時、S3=查無、S4:n=配對全不符、S5:n=音檔 MediaError、S6=play() 被拒、S7=未開始播放），供店主真機回報失敗層；行動網路首包放寬 playing 等待 3→8 秒。快取參數升 v9。
- 主要檔案：`dip-player.js`、`index.html`、`battle.html`、`roguelike.html`、`verify-playback.mjs`
- 驗證：`verify-playback.mjs` 新增「playing 狀態帶曲目摘要＋playTrack 強制換源」回歸並全數通過；真實瀏覽器 harness 實測 Beware 自動播放〈You Don't Love Me〉並列出 11 首、點列表第 3 首成功切〈My Life's Work〉、切辛曉琪《一夜之間》自動播放並列出 10 首，audio currentTime 實際前進、來源為 Apple 試聽 CDN。待辦：離線建全卡池 collectionId 對照表＋執行期改走 `/lookup`，讓 IP 再被封時也能播。

### 2026-07-18｜停止唱片櫃全量預抓造成的 Apple 403／429，維持 iOS 播放授權至曲目載入
- Repo：`dip-vinyl-shop`
- 改動：店主真機回報 v7 仍是唱臂動一下即歸位。重新分離測試後確認 Apple 曲目 metadata 已回空，主因是唱片櫃原本會對數百張收藏四路連續全量預抓，超過 Apple 官方約 20 calls/min 限制，頁面一開即把使用者 IP 打入 403／429 限流；v7 只處理 iOS 手勢並未消除這個上游空結果。現在只預抓排序後首屏 4 張，Search `limit` 由 200 降為 50，單次失敗結果 15 秒後可重試，不再整個分頁永久記空。iOS 解鎖改成讓同一 audio 元件的 0.25 秒靜音 WAV 持續 loop 到 JSONP 回傳，再直接在仍播放的同一元件上換成實際 preview；不再先暫停靜音、遺失 per-element 播放授權。播放器快取參數升至 v8。
- 主要檔案：`dip-player.js`、`index.html`、`battle.html`、`roguelike.html`、`verify-playback.mjs`、`PROJECT_MEMORY.md`
- 驗證：官方 iTunes Search API 文件確認限制約 20 calls/min 並建議縮小 `limit`、加入快取；瀏覽器分離測試在舊流程實際得到 `tracks:0`，與店主全數失敗一致。`verify-playback.mjs` 模擬 JSONP 延遲及「靜音一旦暫停即失去授權」的 iOS 行為，確認新流程會保持同一元件播放到換源並通過；正式 Apple metadata／音檔待本機 IP 限流視窗退去後再驗。

### 2026-07-18｜修正 iOS iTunes 試聽全數失敗並移除唱機下方文字
- Repo：`dip-vinyl-shop`
- 改動：確認 Apple JSONP 能正確回傳曲目，真正失敗點是未預抓的專輯要等待非同步查詢，iOS Safari 在資料回來時已收回點擊播放權限。播放器現在於點擊當下用同一個隱藏 audio 元件播放極短靜音 WAV 完成解鎖，再等待曲目回來切換來源；JSONP 等候上限由 6 秒延長為 10 秒。唱機下方的提示／曲名／Apple Music 文字列與其佔位、CSS 全部移除，唱機本身和既有收藏版面不動；三頁播放器快取參數升至 v7。
- 主要檔案：`dip-player.js`、`index.html`、`battle.html`、`roguelike.html`、`verify-playback.mjs`、`PROJECT_MEMORY.md`
- 驗證：`verify-playback.mjs` 新增「未預抓、JSONP 非同步後仍保有 iOS 播放授權」回歸案例並通過；本機真實瀏覽器直接載入 Apple JSONP 與音檔，Bonnie 'Prince' Billy《Beware》成功播放〈You Don't Love Me〉，再切辛曉琪《一夜之間》成功播放〈我在你懷裡哭你並不知道〉；確認 `turntable-preview` 與所有唱機下方試聽文字皆已移除。

### 2026-07-18｜唱片櫃改用 iTunes 試聽，對戰播放 YouTube 高觀看曲目片段
- Repo：`dip-vinyl-worker`、`dip-vinyl-shop`
- 改動：唱片櫃不顯示完整播放清單，改由使用者瀏覽器以 JSONP 直連 Apple iTunes Search API 取得台灣區專輯曲目，並在每次點擊時隨機播放一首 30 秒試聽；唱機下方只保留一行極小的曲名與 Apple Music 來源連結。曾嘗試由 Worker 代查，但 Apple 對 Cloudflare 共用出口回 429／403，普通跨網域 `fetch` 的 CORS 標頭也不穩定，因此正式路徑刻意不經 Worker、改用 JSONP，避免共用限流與 CORS。對戰與 Roguelike 的勝方專輯維持 YouTube 路徑，Worker 從官方 Album playlist 取得各曲觀看數並挑選最高者，播放器再從可容納 30 秒的時間範圍隨機起播。播放器會核對實際載入的 YouTube video id，避免切換專輯時把上一張仍在播放的狀態誤認為新專輯成功；Spotify／iTunes／YouTube 切換時也會先停止舊來源。
- 主要檔案：Worker `src/index.js`；Shop `dip-player.js`、`index.html`、`battle.html`、`roguelike.html`、`verify-playback.mjs`、`PROJECT_MEMORY.md`
- 驗證：`node --check`、三個 HTML 共 6 段 inline script 語法解析、`git diff --check` 均通過；`verify-playback.mjs` 通過瀏覽器直連 iTunes、隨機曲目／連續換專輯、YouTube 舊播放狀態隔離及隨機 30 秒區間回歸測試；Apple API 實測 Bonnie 'Prince' Billy《Beware》取得 11 首試聽、辛曉琪《一夜之間》取得 10 首，正式 Worker 的官方 YouTube playlist 則分別選出 `I Am Goodbye` 與〈一夜之間〉為最高觀看曲目。

### 2026-07-18｜整張專輯播放來源改為官方 Album playlist 優先
- Repo：`dip-vinyl-worker`、`dip-vinyl-shop`
- 改動：Worker `/yt-music-link` 使用全新 `album-v1` 快取命名空間，完全移除一般 YouTube 搜尋首片與 Data API 任意影片退路；現在先解析 YouTube Music 官方 OLAK Album playlist，需同時吻合專輯、藝人及版本，找不到時才接受標題明寫 `Full Album`、片長至少 20 分鐘且排除未要求的 live／concert／interview／commentary／cover／Taylor's Version 等版本。前端播放器新增明確來源偏好：唱片櫃逐張點播固定 Spotify 優先，對戰與 Roguelike 勝方專輯固定 YouTube 優先、Spotify 備援；解析與播放依優先序逐一進行，不再為等候備援來源延遲首選來源，Album playlist 保持第一首起播且關閉 shuffle／loop。
- 主要檔案：Worker `src/index.js`；Shop `dip-player.js`、`index.html`、`battle.html`、`roguelike.html`、`PROJECT_MEMORY.md`
- 驗證：Worker `node --check`、`wrangler deploy --dry-run`、前端 `node --check dip-player.js`、`git diff --check` 通過。本機 Worker 真實查詢：Eurythmics《Peace》、Chicago《Chicago III》、B.B. King《Live at the Regal》、五月天《人生海海》與辛曉琪《一夜之間》皆回官方 OLAK Album playlist；Taylor Swift《Red》未誤收 Taylor's Version，改採 4,523 秒且標題明寫 Full Album 的影片；無合格整張來源的 Ariana Grande《petal》與 Vulfpeck 合輯正確回空。390×844 單場對戰實測 viewport／scrollWidth 均為 390、無橫向捲動，100dvh 仍為 844，迷你唱盤座標與既有版面未位移；cache-bust 已升 v4。iOS Safari 的非手勢勝方自動出聲仍須店主真機複驗。

### 2026-07-18｜修正 iOS 多數專輯與對戰無聲、唱盤移至玩家血條上方
- Repo：`dip-vinyl-worker`、`dip-vinyl-shop`
- 改動：追查店主 iPhone 實測後確認，多數專輯雖有 Spotify 連結，但 iOS 無法在非同步流程後啟動有聲 Spotify iframe；同時 `/yt-music-link` 每張專輯使用兩次 YouTube Data API 搜尋，在卡冊預抓時迅速耗盡額度。Worker 將曲目快取升至 v5，優先以不耗 API quota 的 YouTube 公開搜尋結果選出可信音樂影片，官方 Data API 改為單次後備；前端 iOS 改成 YouTube 優先、在出牌／點唱手勢內以同一常駐 iframe 做 1% 有聲解鎖，並防止解鎖計時器誤停稍後載入的真正專輯。卡冊批次預抓只查 Spotify，使用者點唱時才查 YouTube，避免再度爆量。Roguelike 唱盤保持 absolute，移到玩家 nameplate 中央、血條上方並與右側像素小人水平置中，不參與現有版面流。
- 主要檔案：Worker `src/index.js`；Shop `dip-player.js`、`index.html`、`battle.html`、`roguelike.html`、`PROJECT_MEMORY.md`
- 驗證：Worker 7 組中英日專輯皆由線上 v5 端點回傳具體 YouTube URL，已部署 version `34aad4fc-79db-4fb9-b6da-275fbcd85eed`；本機實際 iframe 逐張播放 Etta James、Bonnie 'Prince' Billy、2Pac、The Sundays、辛曉琪均為 `playing/youtube`。iPhone UA 模擬確認 YouTube 優先、有聲手勢解鎖、解鎖計時器不會暫停目標曲，且卡冊批次不查 YouTube。390×844 實際完成 Roguelike 與單場 PVE 出牌，兩者唱盤均進入 `playing`；Roguelike 唱盤與玩家像素小人中心 Y 差 0.01px、位於 HP bar 上方、頁寬 390/390 無橫向捲動，既有雙卡、VS、HP 與手牌座標未位移。`node --check dip-player.js`、HTML inline script syntax、`git diff --check` 全數通過；仍待店主以 iOS Safari 真機複驗實際出聲。

### 2026-07-18｜P9d Roguelike 接入勝方音樂與迷你唱盤

- Repo：`dip-vinyl-shop`
- 改動：無止盡品味試煉載入 P9a 共用播放器並以 1×1 畫面外模式掛載；雙方專輯飛上檯面後並行預抓連結，回合結算依實際掉血差播放勝方專輯，平手不換曲，因此一般相剋／比星、品味輾壓、七星回擊、割捨防禦、派系額外傷害及 Boss 都走同一套實際結果判定。所有播放及預抓入口先檢查音樂開關；頂欄與 VS 下方 40×28px 像素唱盤共用 `dipBattleMusic` 偏好，關閉即停止播放。迷你唱盤以 absolute 疊在雙卡中央空隙，不參與牌桌 flex 尺寸，播放時唱片旋轉並有三顆純 CSS 音符上飄。
- 主要檔案：`roguelike.html`
- 驗證：三段 inline script 全數通過 Node 語法解析，靜態回歸確認隱藏掛載、雙卡預抓、勝方／平手判定、關閉音樂守衛及共用偏好鍵，`git diff --check` 通過。390×844 本機 guest 實戰：body=844、scrollWidth=390；敵方卡、VS、玩家卡的座標與改版前逐值相同；迷你唱盤 x=175.2–215.2、y=365.0–393.0，與雙卡及 VS 零重疊，console 零錯誤。開關在 `aria-pressed=true/false`、靜音 class 間正確同步；關閉狀態完成一回合後保持靜止且不影響勝負流程。

### 2026-07-18｜P9c 對戰改為播放勝方專輯並加入迷你唱盤

- Repo：`dip-vinyl-shop`
- 改動：單場對戰完整移除右下可見播放器抽屜，`DipPlayer` 改為 1×1 隱藏掛載；音樂觸發從玩家出牌當下移到回合結算，玩家勝播玩家卡、對手勝播對手卡，平手與雙方同時輾壓不換曲，七星回擊及單方品味輾壓按實際得利者播放。雙方檯面卡揭示即預抓連結；喇叭關閉時播放及預抓入口都先返回，避免新增播放器請求。VS 下方以 absolute 放入 40×28px 像素唱盤，不參與 flex 高度；播放時唱片旋轉並以純 CSS 讓三顆音符錯開上飄，點迷你唱盤與頂欄喇叭共用 `dipBattleMusic` 狀態。
- 主要檔案：`battle.html`
- 驗證：battle module、`dip-player.js` 語法與 `git diff --check` 通過；靜態回歸確認舊抽屜全數移除、無出牌起播 hook、勝方／平手／輾壓分支與關閉音樂零預抓守衛。390×844 本機 guest 實戰：body=844、scrollWidth=390；敵方卡、VS、玩家卡座標與改版前完全一致；迷你唱盤 x=175.2–215.2、y=283.8–311.8，與雙卡、VS、數值列、手牌皆零重疊，console 零錯誤。關閉迷你唱盤後頂欄與迷你按鈕均 `aria-pressed=false`，實跑一回合維持靜止。iOS 真機勝方自動切歌待店主配合驗收。

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
