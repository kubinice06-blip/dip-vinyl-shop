# 對調計畫：類型挑片 v2（細分類型）／猜你喜歡（舊三位藝人品味）

> 2026-09-04 店主指示：「類型挑片」這個名字與入口留給**新的細分類型機制**；
> 舊的三位藝人品味機制搬到**新分頁、改名「猜你喜歡」**。先完整規劃，過目後再動工。
> 分層資料的研究結論在 `GENRE_LAYER_PLAN.md`（兩層為主、第三層只開四桶），本文件只講對調與產品。

## 0. 一句話

`/genre`＝類型挑片（新機制：十類 → 子類型 → 冷門專輯）；`/guess`＝猜你喜歡（舊機制原封搬家）；
`/random`＝直接來一張（不動，但它底層跟舊機制同一個引擎，跟著猜你喜歡走）。

## 1. 名稱與路由對照

| | 現況 | 對調後 |
|---|---|---|
| 類型挑片 | `/genre`、`#genre`、`genreModal`、`og-genre-v3.png`、manifest 捷徑 | **全部保留**，只把裡面的機制換成細分類型 |
| 猜你喜歡 | （不存在） | 新 tab id `guess`、`#guess`、`/guess`（新 OG 導向頁 `guess/index.html`）、新 `guessModal`、`find.html` 第四張卡、manifest 加捷徑、分享網址 `https://dipvinyl.tw/guess`、新 OG 圖 `og-guess.png` |
| 直接來一張 | `/random`，與類型挑片共用 `genreModal` 與 `gpIsRandom` 分支 | 路由與名稱不動；**改為共用 `guessModal` 與猜你喜歡的引擎**（它本來就是「不選類型不選藝人」的舊引擎特例） |

抽卡紀錄型別：舊紀錄 `type:'genre'` 保留不動；猜你喜歡新存 `type:'guess'`；類型挑片 v2 存 `type:'genre'`
並多帶 `path`（如 `rock/punk-wave/post-punk`）。紀錄頁徽章對照：genre→「Genre」、guess→「猜你喜歡」、quiz 不變。

## 2. 猜你喜歡（舊機制搬家）——純搬遷，零邏輯改動

舊引擎在 `index.html` 的這些函式**一行邏輯都不改**：`GENRE_DATA`、`gpArtistListFor`、
`gpFindArtistCards`、`gpAnchorProfile`、`pickSeedCard`、`pickApexCard`、`renderGpGenreSelect`、
`renderGpRound`、`submitGenrePick`、`showGpResult`、`shareGpResult`、`buildShareCanvas`。
只改「外殼」：

1. 容器：`genreModal`／`genreContent` → 新增 `guessModal`／`guessContent`（複製同一段 HTML 與 `game-topbar`）；
   舊引擎所有 `getElementById('genreContent')`（約 20 處）改讀一個變數 `gpHost`，
   由 `startGuess()`／`startRandomPick()` 設成 `guessContent`。
2. 入口：`startGenrePick()` 改名 `startGuess()`；`setActiveTab` 的 `gameModal` 對照加 `guess → guessModal`，
   `random` 改指 `guessModal`；`bootstrapView` 的 `valid` 清單兩組都加 `'guess'`。
3. 文案：選類型頁標題「你想探索哪個領域？／透過三位藝人的品味」不動（那正是猜你喜歡的玩法說明）；
   `shareUrl(... '/genre', '類型挑片 — …')` 兩處改 `/guess`、「猜你喜歡 — dip vinyl shop」；
   `gpShareUrl` 分流改 `gpIsRandom ? /random : /guess`；分享圖上的遊戲名字串同步。
4. 說明行「依你選的 X 校準口味挑出」等 `gpMatchNoteText` 文案不動（是猜你喜歡的特色）。
5. 後台 `admin.html:746`「類型挑片模式（深挖／快速）」——這是 AI 錨點時代的舊開關，
   現行引擎沒讀它：**改標為「猜你喜歡（舊制）」或直接移除**，店主裁。
   抽卡動畫面板「前台抽卡＝心情選歌／類型挑片／直接來一張」文案改成四個遊戲名。

風險評估：這一段可以**先獨立上線**（P1），因為新 `#guess` 只是舊機制的別名，`#genre` 暫時也還指舊機制，
使用者看不出差別；等 P2 完成再把 `#genre` 切到新機制。

## 3. 類型挑片 v2（新機制）——產品規格

### 3.1 畫面流程

| 畫面 | 內容 | 互動 |
|---|---|---|
| S1 大類 | 沿用現有八格（爵士／搖滾／電子／靈魂放克／嘻哈 R&B／民謠／古典／世界） | 點一格進 S2 |
| S2 子類型 | 該類的第二層晶片，每格顯示「冷門 n 張」；例：搖滾 → 龐克新浪潮 / 金屬 / 迷幻前衛 / 獨立另類 / 音牆後搖 / 老搖滾 / 日亞搖滾 / 根源其他 | 點一格：有第三層就進 S3，沒有直接進 S4 |
| S3 細分（只在四桶出現） | 龐克新浪潮 → 龐克硬蕊 / 後龐克 / 新浪潮合成器 / 哥德暗潮 / 工業；金屬、迷幻前衛、音牆後搖同理 | 點一格進 S4；另有「這一桶隨便挑」直接進 S4 |
| S4 結果 | **三張冷門專輯**（同藝人不重複），主推那張走 `DipDrawAnim` 翻牌、其餘兩張以縮圖列在下方「這條路上還有」 | 每張可試聽／進卡片詳情／收進唱片櫃；「換一批」重抽三張（最多 3 次，同猜你喜歡的 `GP_ANOTHER_MAX`）；分享 |

每層都有「← 上一層」；S2／S3 晶片依冷門卡數由多到少排，卡數 <8 的節點灰掉不可選（資料長大自動亮）。

### 3.2 抽卡規則（全本地、零 API）

- 候選＝落在該節點的卡（多重歸屬，見 `GENRE_LAYER_PLAN.md` §2），**主類型必須等於 S1 選的大類**
  （沿用 2026-09-04 的主類型判定，避免 electronic 卡從搖滾的音牆後搖桶漏出來）。
- 冷門優先：obscurity≥4 的卡權重 1、=3 權重 0.25、≤2 不抽；節點冷門卡不足 8 張才放寬到 =3。
- 三張之間同藝人不重複；本次 session 抽過的卡不重複（沿用 `gpSeenAlbums`）。
- 頂點卡（apex）不特別抽：pearl 卡本來就冷門，若落在節點就自然入候選；hall 卡多半 obscurity 低，自然不抽。
- 結果頁「為什麼是這張」一行改成路徑：「搖滾 › 龐克新浪潮 › 後龐克」。

### 3.3 資料層（沿 `GENRE_LAYER_PLAN.md` §3）

- `scripts/build-genre-tree.mjs` → `genre-tree.json`（樹＋每節點卡數／冷門數＋L3 開關）
  ＋ `card-subgenres.json`（卡 → 節點路徑陣列）。
- 三步落位：Last.fm 標籤命中（86.6%）→ 同藝人傳播（rock 直接併 `rock-subgenre-map.json`）→
  剩餘派代理補標（估 jazz 約 200 張、其他各數十）。
- 古典第二層不用標籤，用作曲家欄＋年份推時期（巴洛克／古典／浪漫／20 世紀／當代極簡／電影配樂／古樂），
  在 P0 一併做，規則簡單。
- 前端用 `fetch` 載兩份 JSON（與 `seed_cards.json` 同一批快取），首抽零等待。

### 3.4 新模組

新機制寫成 `dip-genre-tree.js`（不塞進 index.html），index.html 只留接線：載 JSON、`startGenreTree()`、
把結果交給共用的結果渲染。**結果頁抽成共用函式**：從 `showGpResult` 抽出
`renderPickResult(result, {host, shareUrl, historyType, matchNote})`，猜你喜歡、直接來一張、類型挑片 v2 三處共用
（封面／三軸／試聽鈕／收藏／分享／再一張這一整段目前寫死在 `showGpResult` 裡）。

## 4. 全站接點清單（動工時逐項打勾）

| 檔案 | 改什麼 |
|---|---|
| `index.html` | 新 `guessModal`；`setActiveTab` gameModal 對照；`bootstrapView` valid 加 `guess`；舊引擎 host 變數化；`shareUrl`×3；紀錄徽章；載 `dip-genre-tree.js`；結果渲染抽共用 |
| `dip-genre-tree.js`（新） | 類型挑片 v2 全部畫面與抽卡 |
| `scripts/build-genre-tree.mjs`（新） | 建樹與卡片歸屬 |
| `genre-tree.json`、`card-subgenres.json`（新） | 靜態資料 |
| `find.html` | 第四張卡「猜你喜歡」，類型挑片那張描述改「一路選到你要的那種冷門專輯」 |
| `guess/index.html`（新） | OG 導向頁，照 `genre/index.html` 格式 |
| `genre/index.html` | og:description 改新機制文案 |
| `og-guess.png`（新）、`og-genre-v4.png`（新） | 分享縮圖各一張 |
| `manifest.json` | 捷徑加「猜你喜歡」；name／description 文案 |
| `admin.html` | 「類型挑片模式」面板處置；抽卡動畫面板文案 |
| `sw.js` | 若有靜態快取清單，加兩份 JSON 與新 JS |
| `ALBUM_ONBOARDING.md` | 上架流程末尾加一行「跑 `build-genre-tree.mjs`」 |
| `battle.html`／`roguelike.html` | 只有註解提到類型挑片，不動 |

音樂地圖與收卡記點完全不動（只認 L1 十類）。

## 5. 執行順序與驗收

| 階段 | 內容 | 驗收 |
|---|---|---|
| P0 資料層 | 建樹腳本、兩份 JSON、代理補標 | 每個可選節點冷門卡 ≥8；四個 L3 桶自動開；`card-subgenres.json` 覆蓋 ≥95% 非古典卡 |
| P1 猜你喜歡搬家 | §2 全部、`/guess` OG 頁、find.html、manifest | `#guess`／`#random` 走舊機制無差異；`#genre` 暫仍指舊機制；分享網址正確 |
| P2 類型挑片 v2 | `dip-genre-tree.js`、共用結果渲染、`#genre` 切換 | 八類 × 每個 L2／L3 節點各走一次；三張主類型皆等於 S1；換一批不重複；紀錄與分享正確 |
| P3 收尾 | OG 圖兩張、admin 文案、備忘錄 | 線上 `curl -L` 兩個網址抓到新內容 |

P1 與 P0 可並行；P2 依賴 P0＋P1。

## 6. 需要店主裁定的點

1. **藍調要不要成為第九個大類？** 卡池有 660 張主類型 blues（純卡 130），目前八格沒有它；
   不加的話藍調卡只能從搖滾的「老搖滾／藍調搖滾」或靈魂放克底下摸到。
2. **結果頁三張還是一張？** 本計畫是三張（主推一張翻牌＋兩張縮圖）；改一張則與猜你喜歡體感相同。
3. **直接來一張**歸屬：本計畫讓它跟猜你喜歡共用引擎與 modal（現況本就如此），入口仍在 find.html。
4. **後台「類型挑片模式（深挖／快速）」**：改標舊制、還是移除。
5. 猜你喜歡與類型挑片 v2 的 OG 分享圖要各做一張新圖（沿用現有 og 圖風格）。
