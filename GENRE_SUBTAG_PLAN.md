# 曲風子標籤計畫（rock 先行）

> 2026-08-22 店主核定方向：先做 C（摘掉 rock 誤標），再做 B（加一層子曲風，頂層十類不動）。
> 本文件是 B 的規格；C 的修正清單見 `GENRE_FIX_ROCK_20260822.json`。

## 為什麼不是直接拆成新的頂層曲風

`rock` 目前 2,944 張、1,509 位藝人，是十類裡最肥的一類（次高的 jazz 1,620）。
直覺做法是拆成 punk／metal／indie 等新頂層曲風，但代價很高：

1. **六處曲風 ID 同步點全要動**（見 `MUSIC_MAP_PLAN.md`「全域同步點」）：
   worker 的 `musicMapGenres()`、`music-map-widget.js` 的 `GENRES`、`music-map.html`、
   以及 `index.html`／`battle.html`／`roguelike.html` 三處 `validMapGenres` 收卡記點。
2. **玩家資料要遷移**：音樂地圖的收藏點數按曲風 id 記在每位玩家的 Firestore 文件裡。
   rock 拆成多類後，既有的 rock 點數要嘛作廢、要嘛得寫遷移規則決定怎麼分配。
3. **雷達圖幾何撐不住**：現在十角形在手機（≤520px 原則）已經接近極限，
   13–14 軸會擠到不能看。

而且拆分要解決的問題，其實有一半不是「分類不夠細」，是**標籤髒**——見下節。

## C：先摘掉 rock 誤標（零架構風險）

三支 agent 獨立分桶 1,509 位搖滾藝人後，一致指向同一件事：
`rock` 裡混著大量根本不是搖滾的藝人（整批嘻哈、電子、主流流行、soul/funk），
它們多半在多標籤時代被額外掛上 `rock`。這批卡在「類型挑片選搖滾」時會抽出來，
是實際傷體驗的 bug，不是分類粒度問題。

處理方式：逐位覆核 → 產出修正清單（`GENRE_FIX_ROCK_20260822.json`）→ 店主過目 →
套用時只摘 `rock` 這個標籤，其餘標籤不動。若某卡摘掉後會沒有任何曲風，
清單會標明要補上的正確標籤，不得讓卡片變成無曲風。

**判定從寬**：只要「這張卡出現在搖滾抽卡結果裡不會突兀」就保留 rock。
Dylan 型民謠創作歌手、藍調搖滾、放克搖滾一律保留——摘標籤是破壞性操作，寧可保守。

## B：子曲風層（頂層十類不動）

### 資料

每張搖滾卡多帶一個子曲風欄位，取值為以下 8 個之一。對照表已建好：
`rock-subgenre-map.json`（藝人 → 子曲風，1,509 位；以藝人為單位，同一藝人的卡同桶）。

| 子曲風 id | 中文顯示 | 內容 | 藝人數 |
|---|---|---|---:|
| `classic` | 老搖滾 | 50s–70s 正典：rock'n'roll、英倫入侵、hard rock、藍調搖滾、南方搖滾 | 120 |
| `psych-prog` | 迷幻前衛 | 迷幻、前衛、krautrock、art rock、space rock | 109 |
| `punk-wave` | 龐克新浪潮 | 龐克、後龐克、新浪潮、no wave、goth、工業搖滾 | 216 |
| `metal` | 金屬 | 金屬全系：thrash、death、black、doom、metalcore、sludge | 160 |
| `indie-alt` | 獨立另類 | 80s 後獨立與另類：college rock、grunge、britpop、indie、emo、math rock | 347 |
| `dream-post` | 音牆後搖 | shoegaze、dream pop、post-rock、slowcore | 81 |
| `jrock-asia` | 日亞搖滾 | 日本與亞洲搖滾 | 61 |
| `roots-other` | 根源其他 | roots／Americana／alt-country／AOR／雜項 | 415＊ |

＊`roots-other` 的 415 位是 **C 執行前**的數字，含大量待摘除的誤標；
C 套用後這桶會縮到合理大小（估計 60–80 位）。

### 用在哪裡

子曲風**不進音樂地圖、不進收卡記點**——地圖軸與玩家點數完全不動，零遷移。
只用在「瀏覽與篩選」這一側：

1. **類型挑片**：選「搖滾」後多一排子選項（老搖滾／龐克新浪潮／金屬／獨立另類…），
   選了就只在該子桶抽。目前 `index.html` 的類型挑片已有「年代／副曲風小註記」的
   UI 位置（約 282 行的樣式註解），可沿用。
2. **唱片櫃與搜尋**：按子曲風篩選收藏。
3. **店內在售／IG reel 的比對**：`GP_STOCK_GENRE_WORDS`（`index.html` 約 4424 行）
   已經用關鍵字把商品曲風字串對到十類，子曲風可用同一套機制加細。

### 落地順序

1. C 的修正清單經店主確認並套用（`seed_cards.json` 的 rock 標籤清理）。
2. 把 `rock-subgenre-map.json` 併進卡片資料（建議放 `card_catalog` 的新欄位
   `subgenre`，或另出一份靜態對照檔由前端載入——後者不必動 Firestore）。
3. 前端加子曲風篩選 UI。
4. 之後新卡上架時，`ALBUM_ONBOARDING.md` 增加一個「搖滾卡必填子曲風」的欄位要求。

### 之後可複用

同樣機制可套到 `jazz`（1,788 張：bebop／vocal／fusion／和ジャズ／free…）與
`electronic`（1,502 張：techno／house／ambient／IDM／dub…），它們遲早會遇到一樣的問題。
先用 rock 驗證這套做法，再決定要不要推廣。

## 已知的邊界判例（落地時可逐條裁）

分桶時三支 agent 各自標記了難分案例，重要的幾條：

- **Swans** 放 `dream-post`（後期音牆），但 1987《Children of God》屬 no wave 期，
  照期別該進 `punk-wave`。
- **工業搖滾的切線**：industrial rock（Ministry、KMFDM）→ `punk-wave`；
  industrial metal（Rammstein、Rob Zombie）→ `metal`。
- **post-punk revival**（Interpol、Franz Ferdinand、Fontaines D.C.）目前在 `punk-wave`，
  若想讓該桶保持 1976–1990 原生代純度，可整批移到 `indie-alt`。
- **K-pop 不進 `jrock-asia`**：採「音樂本體優先於國籍」，
  日本的純嘻哈（DJ Krush、KOHH）同理不進區域桶。
- **slowcore** 在 `indie-alt` 與 `dream-post` 之間：音牆／器樂側歸 `dream-post`
  （Codeine、Duster），歌曲導向留 `indie-alt`（Sun Kil Moon、Smog）。
- **AOR／arena rock**（Journey、Pat Benatar、Boston）目前在 `roots-other`，
  C 執行後若這桶太小，可考慮讓 AOR 併入 `classic`。
