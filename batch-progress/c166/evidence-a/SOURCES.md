# c-166 a 組 證據層來源清單

本檔記錄 a 組（23 筆、2023–2024、全 jazz）策展所用的原始抓取與可追溯網址。
抓取日期：2026-09-19。MusicBrainz User-Agent 逐字 `dip-vinyl-shop/1.0 (kubinice06@gmail.com)`。

## 批次抓取的原始資料（已入庫，不留在暫存目錄）

| 檔案 | 端點 | 內容 |
|---|---|---|
| `mb.json` | `musicbrainz.org/ws/2/release-group/<rgMbid>?inc=artist-credits+tags` ＋ `ws/2/release?release-group=<rgMbid>&inc=labels+media+artist-credits&limit=100` | 23 筆 RG 的 title／artist-credit（含 `credited-name` 與 `artist.name` 兩欄）／first-release-date／primary-type／secondary-types／tags，以及轄下全部 release 的 date／country／barcode／label-info／media |
| `tracks.json` | `musicbrainz.org/ws/2/release/<id>?inc=recordings` | 每張取「軌數最多的那一筆 release」的全部軌名，供撞陳列掃描（⚠ `Christmas Wish`／`Dolce Vita`／`One Deep River` 三筆取到的不是本卡釘的版本，見裁定第 1979 條） |
| `apple.json` | `itunes.apple.com/search?term=<掛名 盤名>&entity=album&country=us｜jp&limit=8` ＋ `itunes.apple.com/lookup?upc=<MB barcode>&country=us`（逐一 MB barcode 反查） | collectionId／artistName／collectionName／releaseDate／trackCount／copyright（℗ 欄）／collectionExplicitness／primaryGenreName |
| `dg.json` | `api.discogs.com/database/search?type=release&artist=…&release_title=…&per_page=25` ＋ `api.discogs.com/releases/<id>`（每張取前五筆完整條目） | `formats`／`series`／`labels`（整條廠牌鏈）／`companies`／`extraartists`／`released`／`notes`／`genres`／`styles`／`tracklist`／`identifiers` |
| `bluenote.json` | `https://www.bluenote.com/artist/<藝人>/` | 22 個藝人頁的 HTTP 狀態碼與去標籤後的內文 |

抓取腳本：`fetch-mb.mjs`／`fetch-tracks.mjs`／`fetch-apple.mjs`／`fetch-dg.mjs`／`fetch-bn.mjs`，**全部可續跑**（已抓到的鍵直接跳過）。
併檔腳本：`append.mjs`（`OUT` 逐字 `batch-progress/c166/prop-a.json`）。

## ③ 廠牌官網（可引用序數的唯一來源，第 1714／1747-B 條）

**`https://www.bluenote.com/artist/<藝人>/` 逐一實測狀態碼（裸名形與團名形都試）**：

- **200（19 個路徑、涵蓋 22 張卡）**：`arturo-ofarrill`／`chris-botti`／`dave-mcmurray`／`kendrick-scott`／`walter-smith-iii`／`erik-truffaz`／`gregory-porter`／`norah-jones`／`joe-chambers`／`artemis`／`harold-lopez-nussa`／`meshell-ndegeocello`／`cautious-clay`／`aaron-parks`／`ron-miles`／`nduduzo-makhathini`／`ethan-iverson`／`charles-lloyd`／`julian-lage`
- **404（3 個路徑）**：`reuben-rogers`／`chihiro-yamanaka`／`mark-knopfler`

**新聞稿頁與站內搜尋（第 1747-B(二) 條：藝人頁落空時值得試 `?s=` 與新聞稿頁）**：

- `https://www.bluenote.com/blue-note-to-release-ron-miles-live-recording-old-main-chapel-featuring-bill-frisell-brian-blade/` → **200**（(甲) 的決定性逐字；頁面日期逐字 `May 10, 2024`）
- `https://www.bluenote.com/releases/old-main-chapel/` → **200**（⚠ 空殼頁，只有標題與日期逐字 `March 28, 2024`）
- `https://www.bluenote.com/norah-jones-record-store-day-lp-playing-along/` → **200**（(己) 判斷與完整曲序；頁面日期逐字 `October 2, 2023`）
- `https://www.bluenote.com/mark-knopfler-down-the-road-wherever-out-now/` → **200**（(丙) 判斷的決定性逐字 `on British Grove Records via Blue Note`；頁面日期逐字 `November 16, 2018`）
- `https://www.bluenote.com/?s=Old+Main+Chapel`／`?s=Playing+Along+vinyl`／`?s=Mark+Knopfler` → 皆 **200**
- `https://www.bluenote.com/releases/one-deep-river/` → **404**

**日本線（第 1800 條路徑三）**：

- `https://www.universal-music.co.jp/chihiro-yamanaka/products/uccj-2227/` → **200**（商品名逐字 `Dolce Vita [通常盤] [SHM-CD]`、`レーベル Blue Note`、`品番 UCCJ-2227`、`オリジナル発売日 2023.08.23`、`録音年 2023年3月`、`録音場所 ニューヨーク`）
- `https://www.universal-music.co.jp/yamanaka-chihiro/products/uccj-2227/` → **404**（另一形也試過）

## ④ Apple 的兩筆關鍵單頁查詢

- **淨化／未淨化雙胞胎**：`https://itunes.apple.com/lookup?id=1692484931,1692470376&country=us` → 兩筆逐字只有 `collectionExplicitness` 不同（`cleaned`／**`explicit`**）。條目頁逐字 `https://music.apple.com/us/album/karpeh/1692470376?uo=4`（explicit，**上架取這一筆**）與 `https://music.apple.com/us/album/karpeh/1692484931?uo=4`（cleaned）。
- **兩張全空的卡**（實測回空，供本機覆核）：`https://itunes.apple.com/lookup?upc=602455728791&country=us`（Norah Jones《Playing Along》）、`https://itunes.apple.com/lookup?upc=602448976796&country=us`（Norah Jones《Little Broken Hearts: Live at Allaire Studios》）。

## ① 紙本

**本組 23 筆全部是 2023–2024 的碟，Billboard OCR 只覆蓋到 2015（第 1723／1728 條）——結構性查不到，依第 1728 條第 2 點不查、不寫進 `risk`。**
