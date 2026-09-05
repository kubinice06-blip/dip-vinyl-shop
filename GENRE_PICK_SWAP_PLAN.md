# 對調計畫：類型挑片 v2（細分類型）／猜你喜歡（舊三位藝人品味）

> 2026-09-04 店主指示：「類型挑片」這個名字與入口留給**新的細分類型機制**；
> 舊的三位藝人品味機制搬到**新分頁、改名「猜你喜歡」**。先完整規劃，過目後再動工。
> 分層資料的研究結論在 `GENRE_LAYER_PLAN.md`（兩層為主、第三層只開四桶）。
>
> **2026-09-04 二修（店主裁示，已定案）**：不做冷門過濾、不顯示冷門張數、每次抽一張、
> 全部入口留在 `find.html`、後台舊開關直接移除、R&B 修正已套用（`86fef85`）。

## 0. 一句話

`/genre`＝類型挑片（新機制：十大類 → 子類型 → 抽一張）；`/guess`＝猜你喜歡（舊機制原封搬家）；
`/random`＝直接來一張（不動）。三個入口連同心情選歌都掛在 `find.html`。

## 1. 名稱與路由對照

| | 現況 | 對調後 |
|---|---|---|
| 類型挑片 | `/genre`、`#genre`、`genreModal`、`og-genre-v3.png`、manifest 捷徑 | **全部保留**，只把裡面的機制換成細分類型 |
| 猜你喜歡 | （不存在） | 新 tab id `guess`、`#guess`、`/guess`（新 OG 導向頁 `guess/index.html`）、新 `guessModal`、`find.html` 新增一張卡、manifest 加捷徑、分享網址 `https://dipvinyl.tw/guess`、新 OG 圖 `og-guess.png` |
| 直接來一張 | `/random`，與類型挑片共用 `genreModal` 與 `gpIsRandom` 分支 | 路由與名稱不動；改為共用 `guessModal` 與猜你喜歡的引擎（它本來就是舊引擎「不選類型不選藝人」的特例） |

`find.html` 最終四張卡：心情選歌／類型挑片／猜你喜歡／直接來一張。

抽卡紀錄型別：舊紀錄 `type:'genre'` 保留不動；猜你喜歡新存 `type:'guess'`；類型挑片 v2 存
`type:'genre'` 並多帶 `path`（如 `rock/punk-wave/post-punk`）。紀錄頁徽章：genre→「Genre」、
guess→「猜你喜歡」、quiz 不變。

## 2. 猜你喜歡（舊機制搬家）——純搬遷，零邏輯改動

舊引擎在 `index.html` 的這些函式**一行邏輯都不改**：`GENRE_DATA`、`gpArtistListFor`、
`gpFindArtistCards`、`gpAnchorProfile`、`pickSeedCard`、`pickApexCard`、`renderGpGenreSelect`、
`renderGpRound`、`submitGenrePick`、`showGpResult`、`shareGpResult`、`buildShareCanvas`。
只改「外殼」：

1. 容器：新增 `guessModal`／`guessContent`（複製 `genreModal` 那段 HTML 與 `game-topbar`）；
   舊引擎所有 `getElementById('genreContent')`（約 20 處）改讀變數 `gpHost`，
   由 `startGuess()`／`startRandomPick()` 設成 `guessContent`。
2. 入口：`startGenrePick()` 改名 `startGuess()`；`setActiveTab` 的 `gameModal` 對照加
   `guess → guessModal`、`random` 改指 `guessModal`；`bootstrapView` 的 `valid` 兩組都加 `'guess'`。
3. 文案：選類型頁「你想探索哪個領域？／透過三位藝人的品味」不動（那正是猜你喜歡的玩法說明）；
   `shareUrl(... '/genre', '類型挑片 — …')` 兩處改 `/guess`、「猜你喜歡 — dip vinyl shop」；
   `gpShareUrl` 分流改 `gpIsRandom ? /random : /guess`；分享圖上的遊戲名同步。
4. `gpMatchNoteText`（「依你選的 X 校準口味挑出」）不動，那是猜你喜歡的特色。
5. **後台 `admin.html:746`「類型挑片模式（深挖／快速）」直接移除**（店主裁示）——
   那是 AI 錨點時代的開關，現行引擎沒讀它。連同 `modeDeepBtn`／`modeFastBtn`／`modeDesc`
   與其讀寫 Firestore 的程式一併清掉。抽卡動畫面板「前台抽卡＝心情選歌／類型挑片／直接來一張」
   文案改成四個遊戲名。

這一段可**先獨立上線**（P1）：`#guess` 只是舊機制的別名，`#genre` 暫時仍指舊機制，
使用者看不出差別；等 P2 完成再把 `#genre` 切到新機制。

## 3. 類型挑片 v2（新機制）——產品規格

### 3.1 畫面流程

| 畫面 | 內容 | 互動 |
|---|---|---|
| S1 大類 | **十大類**：搖滾／爵士／電子／靈魂放克／嘻哈 R&B／古典／民謠／流行／世界／藍調 | 點一格進 S2 |
| S2 子類型 | 該類的第二層晶片，只顯示名稱；例：搖滾 → 龐克新浪潮／金屬／迷幻前衛／獨立另類／音牆後搖／老搖滾／日亞搖滾／根源其他 | 有第三層就進 S3，沒有直接抽 |
| S3 細分（只在四桶出現） | 龐克新浪潮 → 龐克硬蕊／後龐克／新浪潮合成器／哥德暗潮／工業；金屬、迷幻前衛、音牆後搖同理 | 點一格開抽；另有「這一桶隨便挑」直接抽 |
| S4 結果 | **抽一張**，走 `DipDrawAnim` 翻牌，版面與猜你喜歡的結果頁相同 | 試聽／進卡片詳情／收進唱片櫃／分享／「再一張」（沿用 `GP_ANOTHER_MAX` 3 次）／「換個類型」 |

每層都有「← 上一層」。**晶片不顯示張數**；卡數過少的節點在建樹時就不生成（見 §3.3 門檻）。

### 3.2 抽卡規則（全本地、零 API）

- 候選＝落在該節點的卡（多重歸屬，見 `GENRE_LAYER_PLAN.md` §2），且**主類型等於 S1 選的大類**
  （沿用 2026-09-04 的主類型判定，避免電子卡從搖滾的音牆後搖桶漏出來）。
- **不做冷門過濾、不做冷門加權**（店主裁示）。節點內均勻隨機抽一張。
- 本次 session 抽過的不重複（沿用 `gpSeenAlbums`）；候選抽完提示「這一桶都抽過了」。
- 結果頁「為什麼是這張」一行改成路徑：「搖滾 › 龐克新浪潮 › 後龐克」。

### 3.3 資料層（沿 `GENRE_LAYER_PLAN.md` §3）

- `scripts/build-genre-tree.mjs` → `genre-tree.json`（樹）＋ `card-subgenres.json`（卡 → 節點路徑）。
- 三步落位：Last.fm 標籤命中（86.6%）→ 同藝人傳播（rock 併入 `rock-subgenre-map.json`）→
  剩餘派代理補標。
- **節點生成門檻改為單一條件：該節點卡數 ≥ 20 才成為可選項**（原本的「冷門 ≥15」條件作廢）。
  L3 是否開放同樣只看卡數，門檻寫在腳本裡，資料長大自動開。
- 古典第二層不用標籤，用作曲家欄＋年份推時期（巴洛克／古典／浪漫／20 世紀／當代極簡／
  電影配樂／古樂），在 P0 一併做。
- **流行與藍調**這兩類過去沒進過類型挑片（`GENRE_DATA` 只有八格），P0 要一併建它們的第二層：
  流行 833 張、藍調 329 張（主類型計）。藍調桶較小，若第二層切不出 ≥20 的節點，
  就讓藍調只有一層（S1 選完直接抽）。
- 前端 `fetch` 載兩份 JSON（與 `seed_cards.json` 同批快取），首抽零等待。

### 3.4 新模組

新機制寫成 `dip-genre-tree.js`（不塞進 index.html），index.html 只留接線。
**結果頁抽成共用函式**：從 `showGpResult` 抽出
`renderPickResult(result, {host, shareUrl, historyType, matchNote})`，
猜你喜歡、直接來一張、類型挑片 v2 三處共用（封面／三軸／試聽鈕／收藏／分享／再一張
目前寫死在 `showGpResult` 裡）。

## 4. 全站接點清單（動工時逐項打勾）

| 檔案 | 改什麼 |
|---|---|
| `index.html` | 新 `guessModal`；`setActiveTab` gameModal 對照；`bootstrapView` valid 加 `guess`；舊引擎 host 變數化；`shareUrl`×3；紀錄徽章；載 `dip-genre-tree.js`；結果渲染抽共用 |
| `dip-genre-tree.js`（新） | 類型挑片 v2 全部畫面與抽卡 |
| `scripts/build-genre-tree.mjs`（新） | 建樹與卡片歸屬 |
| `genre-tree.json`、`card-subgenres.json`（新） | 靜態資料 |
| `find.html` | 新增「猜你喜歡」卡；類型挑片那張描述改「一路選到你想要的那種音樂」 |
| `guess/index.html`（新） | OG 導向頁，照 `genre/index.html` 格式 |
| `genre/index.html` | og:description 改新機制文案 |
| `og-guess.png`（新）、`og-genre-v4.png`（新） | 分享縮圖各一張 |
| `manifest.json` | 捷徑加「猜你喜歡」；name／description 文案 |
| `admin.html` | **移除**「類型挑片模式」面板；抽卡動畫面板文案改四個遊戲名 |
| `sw.js` | 靜態快取清單加兩份 JSON 與新 JS |
| `ALBUM_ONBOARDING.md` | 上架流程末尾加一行「跑 `build-genre-tree.mjs`」 |
| `battle.html`／`roguelike.html` | 只有註解提到類型挑片，不動 |

音樂地圖與收卡記點完全不動（只認十大類）。

## 5. 執行順序與驗收

| 階段 | 內容 | 驗收 |
|---|---|---|
| P0 資料層 | 建樹腳本、兩份 JSON、古典時期規則、流行與藍調第二層、代理補標 | 每個可選節點卡數 ≥20；`card-subgenres.json` 覆蓋 ≥95% 非古典卡 |
| P1 猜你喜歡搬家 | §2 全部、`/guess` OG 頁、find.html 第四張卡、manifest、移除後台舊面板 | `#guess`／`#random` 走舊機制無差異；`#genre` 暫仍指舊機制；分享網址正確 |
| P2 類型挑片 v2 | `dip-genre-tree.js`、共用結果渲染、`#genre` 切換 | 十類 × 每個 L2／L3 節點各走一次；抽出的卡主類型皆等於 S1；紀錄與分享正確 |
| P3 收尾 | OG 圖兩張、admin 文案、備忘錄 | 線上 `curl -L` 兩個網址抓到新內容 |

P1 與 P0 可並行；P2 依賴 P0＋P1。

## 6. 已定案的裁示（2026-09-04）

1. **十大類全上**：搖滾／爵士／電子／靈魂放克／嘻哈 R&B／古典／民謠／流行／世界／藍調
   （舊版只有八格，漏了流行與藍調）。
2. **每次抽一張**，不是三張。
3. **不做冷門過濾、不顯示冷門張數**——節點內均勻隨機。
4. **四個入口全部留在 `find.html`**，含新的猜你喜歡。
5. **後台「類型挑片模式」面板直接移除。**
6. **R&B 錯位修正已套用**（38 張 soul→hiphop，commit `86fef85`）。
