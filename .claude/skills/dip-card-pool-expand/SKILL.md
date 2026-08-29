---
name: dip-card-pool-expand
description: Run dip vinyl's canonical end-to-end album onboarding — identity and duplicate checks, cover resolution, three-axis ratings, apex-card assessment, researched zh-TW introduction, fixed preview, Firestore/KV writes, publication, and live verification. Use for every request to 新增專輯／新增卡片／補卡池／匯入廠牌或藝人目錄／上架專輯；never publish a partial album with only seed_cards or cover data.
---

# dip vinyl — 卡池擴充工作流

> **2026-08-10 起，新增專輯的入口改為 `dip-card-create`**（一句話輸入：藝人／專輯／曲風延伸，
> 簡介直接產 desc-restyle 的 180–240 字新規格）。本 skill 保留為底層腳本庫與
> 封面來源／精選模式／歷史實績的詳細參考，`scripts/` 照常被新 skill 呼叫。

封裝「選定目標 → 身分與去重 → 封面 → 三軸／頂點判定 → 固定簡介 → 固定試聽 → 寫入 → 線上驗收」整套流程。
目標：新卡與現有卡池同一套標準，且上架當下就是完整成品，不把簡介或試聽留給前端臨時查詢。

## 核心原則

- **封面是硬門檻**：抓不到封面的專輯**不進池**。寧可少收也不要讓玩家抽到空白卡——卡牌遊戲的封面就是卡面。
- **三軸不要自己編**：一律打 worker `/album-rating`，與全站同一套標準。
- **廠牌／藝人目錄反查，不要憑印象列清單**：憑記憶列會漏掉大半目錄，也分不清「查不到封面」是沒收錄還是名字寫錯。
- **完整性是硬門檻**：封面、三軸、頂點判定、固定簡介、固定試聽／無來源狀態缺一不可；不准先把 seed 上線再回頭補。
- **固定資料先寫，seed 最後寫**：先完成 `card_catalog`、Worker KV、`album_overrides`，回讀成功後才用 `seed_cards.json`／`apex_pool.json` 打開曝光。
- **不要把 MusicBrainz 放進 worker 即時查詢**（見下方「架構紅線」）。

## 唯一完成契約（每次新增專輯必讀）

開始批次前完整讀取 `dip-vinyl-shop/ALBUM_ONBOARDING.md`，並以它作為上架完成定義。每批維護一份 scratch manifest；正式寫入前與上架後分別通過：

```bash
node dip-vinyl-shop/scripts/verify-album-onboarding.mjs <manifest.json>
node dip-vinyl-shop/scripts/verify-album-onboarding.mjs <manifest.json> --published
```

不得以「模型已經寫了」「API 有回資料」代替驗收。簡介需有來源證據、試聽需固定或明確標記無來源，頂點卡需逐張判斷但不得由分數自動升格。

## 三軸的定義（勿搞反）

| 軸 | 來源 | 意義 |
|---|---|---|
| `obscurity` 冷門度 | Last.fm 真實聽眾數 | 5＝極冷門幾乎沒人知道，1＝人人都聽過 |
| `classic` 經典度 | Haiku 依 AllMusic／Pitchfork／RYM 共識 | 5＝公認經典里程碑 |
| `accessibility` 硬蕊度 | 同上 | **是「入耳難度」**，5＝晦澀前衛，1＝旋律親切。**不是「好聽度」** |

稀有度公式（`admin.html` 與後台一致）：
`score = classic + accessibility + (obscurity>=5 ? 1 : 0)`
→ `>=10 legendary / >=8 epic / >=6 uncommon / >=4 rare / 其餘 common`

> 注意：「冷門好聽」的卡（classic 3、accessibility 2、obscurity 5）score 只有 6，
> 大量加入會把稀有度分布往 uncommon 壓。想撐住曲線就要刻意留一成 accessibility 3–4 的硬派作品。

## 執行步驟

腳本都在本 skill 的 `scripts/`，依序執行。工作目錄建議用 scratchpad，不要污染 repo。

### 1. 取得專輯清單

```bash
node scripts/1-label-catalog.mjs "Three Blind Mice" tbm.json
```

用 MusicBrainz 廠牌條目撈全目錄，自動去重、排除 Various Artists 合輯。
會先印出候選廠牌讓你確認選對（同名廠牌很多），選錯就改用 `--mbid <正確id>` 重跑。

若目標不是廠牌而是「某藝人全集」或「某主題選盤」，就自己準備同格式的 JSON：
`[{ "artist": "...", "title": "...", "ids": ["<mbid>"], "date": "1974" }, ...]`（`ids` 可留空陣列），
或用下面兩支專用腳本自動產生。

### 1b（藝人清單版）：目標是「一群藝人」而非廠牌時

```bash
echo "Kamaal Williams" >> artists.txt   # 一行一位
node scripts/1b-artist-discography.mjs artists.txt modern-uk.json
```

逐位藝人查 MB 官方專輯（release-group type=Album）。適用時機：目標藝人群散在很多小廠牌，
用廠牌反查會漏掉大半（實測現代英國新浪潮 20 位藝人，若用廠牌反查會漏掉至少一半，因為
Kamaal Williams、Nala Sinephro 這些人分散在 Brownswood、Gearbox 等十幾個小廠牌）。

**藝人名要消歧義，不要只打常見名**：搜尋「Christian Scott」會抓到一位電玩配樂作曲家而不是
爵士小號手，必須用全名「Christian Scott aTunde Adjuah」查詢才對。結果裡看到候選藝人的
`disambiguation` 明顯不符（職業、國籍對不上）就是抓錯人，換更完整的名字重查。

### 1c（系列版）：目標是 MB 的某個「release-group series」而非整個廠牌時

```bash
node scripts/1c-series-catalog.mjs "Polish Jazz" polish-jazz.json
```

**為什麼需要這支**：國家／官方廠牌（如波蘭的 Polskie Nagrania "Muza"）的 label 目錄是
**整個廠牌全部產出**——實測波蘭那批用廠牌反查抓出蕭邦、哥雷茨基古典樂、Bruce Springsteen
授權版、波蘭搖滾樂團，完全不是爵士專屬，那次評分排序結果整批作廢。目標其實是廠牌底下一條
精選子系列（「Polish Jazz」編號 1–80 那套）時，要查 MB 的 series 條目才對。

**注意 MB 社群維護的系列條目可能不完整**：「Polish Jazz」系列在 MB 只登錄了 17 張
（實際約 80 卷），這時候用 1b 補一批該系列相關藝人的清單，跟系列結果合併去重即可
（實測 17 + 202 藝人候選 → 去重後 215，比只用系列的 17 張實用得多）。

**這支腳本踩過兩個坑**：
1. MB API 回傳的欄位是底線 `release_group`，不是連字號 `release-group`——第一次寫反了，
   結果永遠是 0 張，且沒有任何錯誤訊息（因為 `.filter()` 對不存在的欄位就是回傳空陣列）。
2. MusicBrainz 偶爾會回 503（暫時過載），不是查詢有問題。已加重試（間隔 2 秒、最多 3 次）
   與逐筆存檔，某一筆持續失敗只會跳過那筆繼續往下跑，不會讓已經抓到的幾十筆全部作廢重來。

### 2b（精選模式）：候選量大、只想留精華時，先評分排序再解封面

若店主要求「都只留精華」或候選數量太大（幾百到上千張），**不要**對整批候選都跑步驟 2 的
封面解析鏈——反正大部分會被砍掉，跑封面鏈是浪費。改成：

```bash
node scripts/2b-rate-and-rank.mjs venus.json 45 venus-ranked.json
```

只打 `/album-rating`（不解封面），依 `classic` 分數為主、Last.fm `listeners` 為輔排序，
取前 N 張。輸出兩個檔：`venus-ranked.json`（精選 N 張）與
`venus-ranked-full-ranked.json`（完整排序備份，封面解析失敗需要候補時從這裡取下一名）。

實測（2026-07-21 Venus/SteepleChase/ECM）：候選 449／559／1185 張，
評分排序後只對 45～50 張跑封面解析，比照三盲鼠那種「全跑封面鏈」的做法省下大量無用查詢。

**候補流程**：封面解析難免有查無的（實測命中率 76–98% 不等），若沒補到目標張數，
從 `*-full-ranked.json` 裡跳過已試過的、取下一批候選再跑一次步驟 2，直到補齊。

### 2. 解析封面

```bash
node scripts/2-resolve-covers.mjs tbm.json tbm-covers.json
```

依序試 **Bandcamp → Spotify → Cover Art Archive**，再對漏網的跑一輪寬鬆補救。
實測三盲鼠 105 張 → 90 張有封面（86%）。

> **注意**：若走 1b 精選模式，步驟 2 的輸入檔只需要 `{artist, title}`（從 ranked 結果轉出），
> 但**輸出只會有封面欄位，不會帶著 classic/obscurity/accessibility 一起走**。
> 最終合併寫入卡池前，務必用 `*-ranked-full-ranked.json` 依 artist+album 把三軸評分接回去，
> 否則會出現「封面都有、三軸全部 undefined」的資料流失（已踩過這個坑，見下方「實績」）。

### 3. 產三軸數值

```bash
node scripts/3-build-cards.mjs tbm-covers.json tbm-ready.json
```

去重選定名、排除與現有卡池重複的，再逐張打 `/album-rating`。
最後會印出三軸與稀有度分布，**並列出需要人工覆核的可疑項**。

### 3b. 挑「曲風分類器認得出來」的藝人名

```bash
node scripts/3b-optimize-names.mjs tbm-ready.json tbm-named.json jazz
```

**這步會直接影響曲風流派功能**：卡片屬於哪個曲風的抽牌池，是靠 `/album-genres` 的標籤決定的，
而該端點對藝人名寫法極敏感，且**沒有單一規則**（實測三盲鼠）：

| 寫法 | 結果 |
|---|---|
| `Hideto Kanai & King's Roar` | `jazz` ✓ |
| `Hideto Kanai` | 無 ✗（縮短反而查不到）|
| `Masaru Imada Trio +2` | 無 ✗ |
| `Masaru Imada Trio` | `jazz` ✓（縮短才查得到）|

所以要逐張試候選寫法。**改名後必須回頭覆核**：有可能換到「查得到但分錯類」的寫法——
`Shuko Mizuno's "Jazz Orchestra '75"` 縮成 `Shuko Mizuno`（現代古典作曲家）會被判成 `classical`，
要改用同專輯的樂團名 `Toshiyuki Miyama & The New Herd` 才回到 `jazz`。

> **若這步在寫入卡池之後才做**：改名會讓 Firestore 文件 id 變動，
> 必須把改名前的舊文件刪掉，否則會留下沒有卡片對應的孤兒。
> 刪除前先確認該文件 `updatedAt === 1` 且沒有 `desc`，免得誤刪玩家抽過的卡。

### 3d（多來源合併時）：批次內部與跨批次去重

多個廠牌／來源一起收錄時，「artist+album 完全一致」的去重擋不住這兩種常見漏網：

```bash
node scripts/3c-dedupe-finalize.mjs venus-final-covers.json venus-deduped.json
```

1. **同一張碟被拆成不同 artist-credit 字串**（同一批候選內部就重複）：
   `Chet Baker` vs `Chet Baker Trio`、`Sun Ra & Walt Dickerson` vs `Walt Dickerson & Sun Ra`
   （順序顛倒）——這個腳本依**專輯名**（忽略藝人寫法）分組，只留 rank 最好的一筆。
2. **跟現有卡池撞名但只有藝人名尾綴不同**：`Duke Jordan` 已在池子裡，
   `Duke Jordan Trio - Flight to Denmark` 專輯名相同、藝人名互為子字串，判定為同一張予以排除。

**這個腳本抓不到的兩類**：
1. 文字上就是不同字串的縮寫變體，例如 `Standards, Vol. 1` vs `Standards, Volume 1`
   （正規化後 `standardsvol1` ≠ `standardsvolume1`）。
2. **同一張碟用不同文字系統表示**，例如 `Ryo Fukui - シーナリィ`（片假名拼音「Scenery」）
   vs `福居良 - SCENERY`（漢字本名＋英文標題）——這是他 1976 年同一張名盤，但片假名跟
   拉丁字母的正規化字串完全不會重疊，腳本不可能抓到。這類要靠人工掃一眼藝人／專輯清單，
   對日系／中文卡尤其要注意「同一張碟是否同時以羅馬拼音與原文兩種寫法出現在清單裡」。
   合併時三軸數值選較符合實際定位的那筆（不要盲目取平均或取第一筆——實測片假名版的
   Last.fm 聽眾數 26 萬多，明顯是名稱誤配到別的熱門作品，漢字版的聽眾數 1347 才合理）。

**跑完自動去重後務必人工掃一眼輸出清單**，這兩類都要手動移除或合併。

去重後若張數不夠，從 `*-full-ranked.json` 取下一批候選補足（見上方 2b 的候補流程）。

### 4. 人工覆核（不可略過）

看步驟 3 的警示區段：

- **聽眾數異常高**＝同名藝人誤配。實例：三盲鼠的日本前衛爵士團 **Air**《Air》被 Last.fm 算到
  **法國電子雙人組 Air** 的 66856 位聽眾，冷門度從 5 掉到 3。這類要手動改回。
- **冷門度靠 AI 推估**（Last.fm 查無）的，數值較不可靠，掃一眼有無離譜值。
- **藝人名過長**：聯名一長串（`A & B & C +2`）在卡面會爆版，取主奏者即可。
- 名稱含 `/` 會在文件 id 被轉成 `-`（與 `ovCardId` 一致），屬正常。
- **「樂團名＝專輯名」的自我同名卡，直接排除**：這類卡在 `/yt-music-link` 找試聽連結時
  極容易撞到別的同名作品——三盲鼠實測 `Air - Air`（配到法國電子雙人組 Air 的《Moon Safari》）、
  `Mari Nakamoto - Mari`（配到同廠牌另一張《Little Girl Blue》）、`Window Pane - Window Pane`
  （配到 2024 年另一支同名樂團），三張全部配錯。不值得為了收錄而冒「玩家點下去聽到完全不相干專輯」
  的風險——這類卡辨識度低，收錄的邊際價值本來就不高，**篩選階段看到專輯名與藝人名相同（或只是
  藝人名的簡稱）就直接跳過，不必等實際觸發 YT 誤配才發現**。

修正後另存 `*-final.json` 再往下走。

### 5. 補齊 manifest：頂點判定、固定簡介、固定試聽

- 依 `ALBUM_ONBOARDING.md` 為每張填 `identity`、`cover`、`ratings`、`rarity`、`apexAssessment`、`description`、`preview`。
- 頂點卡只做嚴格資格評估：hall 需經典共識、pearl 需 listeners 有效且 <300、heresy 需極端難入耳證據；三軸 5 或 legendary 不等於頂點。
- 簡介每張先查證至少兩個來源，再寫 3–4 句、80–180 字繁體中文。新卡簡介預生成到 Worker `desc2:`／`desc4:` KV；不要只寫 `items.description`，遊戲卡片讀的是 `/album-desc`。
- 試聽只接受核對過的 Apple 直連、YouTube Music Album playlist 或完整專輯影片；寫 `album_overrides.previewUrl`＋`previewStatus=ready`。無可靠來源寫 `unavailable`，明確不試聽寫 `disabled`；三種狀態都禁止前端即時 provider 搜尋。

### 6. Prepare gate

```bash
node dip-vinyl-shop/scripts/verify-album-onboarding.mjs <manifest.json>
```

必須 0 error。跨文字系統、artist-credit、縮寫／符號差異的重複仍需人工掃過並寫入 `identity.aliasReview`。

### 7. 先寫固定資料（卡片尚未曝光）

#### 7a. 封面與三軸預熱進 Firestore

```bash
node scripts/4-prewarm-covers.mjs tbm-final.json --dry   # 先乾跑
node scripts/4-prewarm-covers.mjs tbm-final.json         # 實際寫入
```

**為什麼非做不可**：前台／對戰的封面查找順序是 `card_catalog` → worker `/spotify-search`。
這批卡多半在 Spotify 查無（正是靠 Bandcamp／CAA 才找到封面），
不預熱的話卡片第一次被抽到會顯示空白 ♪，而且**永遠補不回來**。

寫入用 Firestore REST PATCH，`card_catalog` 規則是 `allow write: if true`，**不需要登入或 service account**。
- 專案：`price-manager-e8846`
- 文件 id：`(artist + '|' + album).toLowerCase().replace(/\//g,'-').trim()` —— 必須與 `admin.html` 的 `ovCardId()` 完全一致
- 用 `updateMask` 只更新指定欄位，才不會蓋掉既有的 `desc` / `apex` / `tier`
- `updatedAt: 1` 讓新卡在後台「卡牌校正」沉底，不洗掉玩家抽過的卡

#### 7b. 固定簡介與試聽

- 先通過 onboarding prepare gate 並人工抽查事實，再用 `dip-vinyl-worker/scripts/desc-gen/from_onboarding_manifest.mjs` 直接轉成 KV bulk 匯入；既有 `validate.mjs` 可作額外格式複驗。不要依賴先讀 seed 的 `build_tasks.mjs`，否則會顛倒「固定資料先寫、seed 最後曝光」的順序。
- 回讀 `/album-desc`，文字必須與 manifest 一致，`X-Cache` 必須是 `KV-HIT` 或 `CURATED`，不能是現場生成的 `MISS`。
- 透過後台固定試聽批次工具 merge 寫入 `album_overrides`；`ready`、`unavailable`、`disabled` 都要存，不能只記在本機報告。

### 8. 最後才上架

依 manifest 把一般卡追加到 `seed_cards.json`；本批明確採用的頂點卡才寫入 `apex_pool.json`。兩者只能選一個作為該筆的上架入口。

`seed_cards.json` 維持一列一張 `[artist, album, classic, obscurity, accessibility, genres]`（第 6 欄為音樂地圖曲風 id 陣列；`apex_pool.json` 每列第 3 欄同義）。追加後執行 `node dip-vinyl-shop/scripts/build-seed-genres.mjs` 自動補缺欄的列（KV 幾乎全命中、可重複執行），寫完驗 parse、欄數、三軸範圍與全檔重複。缺曲風欄的卡在首頁「類型挑片」抽不到，published gate 會擋。

### 9. Published gate

把 manifest 的 `published` 欄位補齊後執行：

```bash
node dip-vinyl-shop/scripts/verify-album-onboarding.mjs <manifest.json> --published
```

它會回讀 seed／apex、Firestore、Worker KV，並實抓封面與固定試聽網址。全部通過才算完成。

### 10. 驗證與收尾

- 在 `dip-vinyl-shop/PROJECT_MEMORY.md` 的「逐次改動記錄」**最上方**加一筆（日期／repo／改動摘要／主要檔案／驗證結果）。
- commit + push（此專案不需事先問用戶）。
- 回報候選、排除、一般卡、頂點候選、preview ready／unavailable／disabled 的精確數量。

## 架構紅線

**MusicBrainz／CAA 只能離線批次跑，絕對不要放進 worker 當即時查詢。**
MusicBrainz 硬性 1 req/s 並檢查 User-Agent，而 Cloudflare 是共用出口 IP —— worker 即時打會被整個封掉。
這和 **Apple `/search` 從 worker IP 被長效封鎖**是同一種死法，不要再踩。
正確做法與 `desc-gen` 預生成管線一致：本機批次 → 寫進 KV／Firestore → 前端只讀快取。

## 各封面來源的脾氣（實測）

| 來源 | 強項 | 雷點 |
|---|---|---|
| **Bandcamp**（worker `/bandcamp-search`）| 無限流；日系復刻盤命中率高 | 只有有上架的才有 |
| **Cover Art Archive** | 老黑膠／冷門盤最強（現有卡池抽樣 97%）；免金鑰免額度 | 需先向 MB 要 mbid（1 req/s）；圖檔 302 轉 Internet Archive 節點**會逾時，必須重試**；新專輯覆蓋差 |
| **Spotify**（worker `/spotify-search`）| 主流盤最準 | **會 429**。限流時整批回空，**這不代表那些碟不存在**——別把限流期的結果當「查無此碟」，更別讓空值進 KV |
| **iTunes** | — | **不要用來抓封面**。模糊比對會配到錯的碟：`Midnight Sugar` → `Midnight Sugar (Short Ver.) - Single`、`Misty` → `Misty - Live at Jazz is`。要用也必須專輯名完全吻合 |
| **Deezer** | — | 台灣不可用，實測 10/10 全空 |

## CAA 比對門檻

- 主輪 `score >= 80`（嚴格），避免通用單字標題誤配。
- 補救輪放寬到 `score >= 60`，但**查詢字串一定要帶藝人名**——這樣即使門檻放寬也不會配到別人的同名專輯
  （已實測 `Air`／`Mari`／`Blow Up`／`Smile`／`North Plain` 等通用標題，回查 MusicBrainz 原始資料全部正確）。
- 原盤沒人掃封面時，改查同一個 **release-group** 的再版，實測可多救回約 5%。

## 實績

**2026-07-21 三盲鼠 TBM**：MB 目錄 184 releases → 去重 113 → 排除合輯 105 →
封面命中 90（Bandcamp 26／CAA 43／CAA 補救 21）→ 標題去重 73 張入池 →
「樂團名＝專輯名」自我同名卡排除 3 張（`Air`／`Mari Nakamoto - Mari`／`Window Pane`，
逐一實測 `/yt-music-link` 皆配到別的同名作品）→ 70 張 →
**店主指示不必全收，只留熱門經典 → 依 classic 分數（同分用 Last.fm listeners 排序）
取前 40 張，移除其餘 30 張普通盤 → 最終 40 張**。
若之後其他廠牌／領域也遇到「候選夠多但只想收精華」的情況，可直接沿用這個排序法：
`classic` 分數為主排序鍵、`listeners` 為同分時的熱門度排序鍵，不必另外設計篩選規則。

各領域可收量參考（用步驟 1 先跑一次就知道，不必猜）：一個經營二十年的爵士廠牌約產出 70–90 張可用卡。
若要補到某個曲風的目標張數，用「目標缺口 ÷ 80」估算需要幾個廠牌——但若店主要求「只留精華」，
實際收錄數會遠低於這個估算，規劃配額時先問清楚是要「全收」還是「精選」。

**2026-07-21 Venus／SteepleChase／ECM 精選模式**：三個廠牌都在串流上、都只要精華，
直接採用 2b 精選流程（先評分排序、只對短名單解封面），不像三盲鼠對全部候選跑封面鏈：

| 廠牌 | MB 候選 | 評分排序取前 N | 封面命中 | 去重後最終 |
|---|---|---|---|---|
| Venus | 449 | 45（classic 門檻線 4）| 44/45 | 43 |
| SteepleChase | 559 | 45（classic 門檻線 4，兩輪候補湊齊）| 34→45 | 45 |
| ECM | 1185 | 50（**前 50 名全部 classic=5**）| 49/50 | 40 |

三批合計 128 張，去重踩到「同張碟不同 artist-credit 拆分」「跟現有卡池撞名但藝人名尾綴不同」
兩類（見上方 3d），另手動抓出 2 筆 `Vol.`/`Volume` 縮寫變體自動去重漏網的。中途也踩到「封面解析
輸出丟失三軸評分欄位」的資料流失 bug，合併前用 `*-full-ranked.json` 補回才驗證 0 缺漏（見上方
步驟 2 的提醒）。

**額外收穫**：ECM 主標籤同時發行爵士與現代古典（Bach／Beethoven／Bartók／Kurtág 等 ECM New
Series 錄音），曲風分類器把這些正確判成 `classical`——這不是誤判，剛好補到全站最小的曲風
（classical 194 張）。多廠牌／多來源合併時，非目標曲風的正確分類結果直接保留即可，不必為了
「這次是爵士擴充」而排除，等於免費撿到其他曲風流派的素材。

**2026-07-22 六批同時擴充：波蘭／義大利／現代英國／日本／德國**：先用 MB 偵察 36 個候選廠牌的
目錄規模，再拿現有卡池比對藝人覆蓋率找空洞（波蘭 0 張、日本非三盲鼠系 2 張、現代英國新浪潮
0 張），決定優先順序——主流現代爵士其實已經在池子裡不必重收。

| 批次 | 取得方式 | 候選 | 精選取前 N | 封面命中 | 去重後最終 |
|---|---|---|---|---|---|
| Black Saint | 廠牌反查 | 212 | 45 | 100% | 44 |
| Soul Note | 廠牌反查 | 335 | 45 | 96% | 43 |
| Enja | 廠牌反查 | 703 | 50 | 96% | 47 |
| 現代英國新浪潮 | **1b 藝人清單**（20 位） | 105 | 40 | 98% | 39 |
| 日本 East Wind＋Better Days＋Trio＋Paddle Wheel | 四廠反查合併 | 426 | 45 | 84% | 34 |
| 波蘭 | **1c 系列＋1b 藝人清單合併**（見下） | 215 | 45 | 84% | 38 |

六批合計 245 張，跨批次同名重複 0 筆，236/245 帶 `jazz` 標籤。

**波蘭這批印證了 1c 的存在必要**：第一輪直接用整個廠牌 Polskie Nagrania "Muza" 反查
（528 候選），評分排序出來的前 20 名全是蕭邦全集、哥雷茨基、Bruce Springsteen 授權版、
波蘭搖滾樂團——**整批作廢**。改用「Polish Jazz」系列條目才對，但 MB 該系列只登錄 17 張
（社群維護不完整，實際系列約 80 卷），補一批 18 位波蘭爵士藝人的清單（Komeda、Stańko、
Namysłowski、Urbaniak、Seifert、Marcin Wasilewski Trio 等）202 候選，兩者合併去重後
215 張才是真正可用的候選池。**目標若是「某廠牌下的精選子系列」而非整個廠牌，第一步就該用
1c 查系列，不要用 1 查廠牌**——尤其是國家／官方廠牌，目錄必然橫跨所有曲風。

**自動化去重抓不到跨文字系統的重複**：`Ryo Fukui - シーナリィ`（片假名）與
`福居良 - SCENERY`（漢字＋英文）是同一張 1976 名盤，字串正規化完全不會重疊，
人工合併成一張才發現。詳見上方 3d。

**現代爵士圈的藝人常常改名**：`Christian Scott` 現在的法定藝名是 `Chief Xian aTunde
Adjuah`，但這個新名字在 Spotify／Last.fm 上幾乎沒有標籤資料，6 張專輯全部查無曲風；
換回大眾熟悉的 `Christian Scott aTunde Adjuah` 就正確查到 `jazz`。**曲風分類器認的是
串流平台實際掛的名字，不是藝人現在的法定/偏好用名**，兩者常常不同步。

**2026-07-22 法國／德國三廠牌：BYG／Saravah／MPS**：

| 廠牌 | 候選 | 精選取前 N | 封面命中 | 去重後最終 |
|---|---|---|---|---|
| BYG（法國自由爵士）| 103 | 40 | 98% | 37 |
| Saravah（法國香頌／世界音樂為主）| 111 | 40 | 93% | 33 |
| MPS（德國）| 511 | 45 | 87% | 38 |

三批合計 108 張，跨批次同名重複 0 筆，90/108 帶 `jazz` 標籤。

**`1-label-catalog.mjs`（廠牌反查腳本）補上 503 重試機制**：MPS 目錄反查第一次就在
MusicBrainz 暫時過載時整支腳本掛掉——這個腳本原本沒有重試，只有系列查詢的
`1c-series-catalog.mjs` 有。已補上同一套邏輯（503 重試、間隔 2 秒、最多 3 次；
分頁迴圈改成單頁持續失敗就跳出繼續，不會讓已抓到的頁數全部作廢）。**這兩支腳本現在都有
這個防護，若之後再寫新的 MB 查詢腳本，記得抄同一套 `mb()` 函式，不要重新發明。**

**BYG／Saravah 本身內容龐雜非爵士專屬**：BYG 混了前衛搖滾團 Gong、Saravah 混了大量法語
香頌（Brigitte Fontaine）——沿用 ECM New Series 古典樂那次的原則，非目標曲風的正確分類
結果直接保留，不必為了「這次是爵士擴充」而排除。

**又抓到兩筆自動化去重漏網的**（都是 BYG）：`Gong - Camembert Electrique` vs
`Gong - Camembert électrique`（有無重音符號）；`Anthony Braxton - B-X0 N0-47A` vs
`B-X° / NO-I-47ᴬ`（同一個神秘代號標題的不同符號轉寫，Braxton 的作品常用這種標題）。
這類「同一張碟因為特殊符號／變音字元寫法不同」的重複會持續出現，人工掃清單時
**特別留意含重音符號、特殊符號、代號式標題的專輯**。

**2026-07-22 Disques Vogue（法國全類型國家級廠牌）：只要 20 張精華，改用「先篩曲風、
再選卡」**：跟波蘭 Muza 同一種風險（1947–73 全類型廠牌，非爵士專屬），但這次目標張數
很小（20 張），不值得像波蘭那樣另外找系列／建藝人清單。改法：

```bash
# 1. 正常跑到 2b 評分排序，但取比目標大很多的候選（例如目標20張→取classic>=4的全部，這裡152張）
# 2. 對這批候選逐一打 /album-genres，只留帶目標曲風標籤的
# 3. 再依 classic/listeners 排序取真正要的張數，才進封面解析
```

實測 680 候選評分排序後，前 60 名幾乎全是法語香頌／流行／不相干授權再版（The Doors、
ABBA、Sugarhill Gang），真正的爵士（Monk、Django Reinhardt、Sidney Bechet）混在裡面
只佔約 1/6。對 `classic≥4` 的 152 張逐一查曲風，篩出 45 張帶 `jazz` 標籤的才是正確候選池。

**三種「廠牌內容混雜」的解法怎麼選**：
- 目標曲風要收到大量（上百張）→ 用 1c 查有沒有現成的精選系列，或用 1b 建藝人清單（波蘭）
- 目標只要一小批精華（幾十張）→ 直接對評分排序後的候選逐一查曲風篩選即可（Vogue），
  不必大費周章另建系列或藝人清單

**又抓到一張自我同名撞名卡**：`Experience - Experience`（1971 法國爵士搖滾團同名專輯）——
沿用三盲鼠那次的規則，看到「樂團名＝專輯名」就直接排除，不必等實際發生 YT 誤配才處理。
