# c-166 b 組 證據層來源清單

本檔記錄 b 組（22 筆、2024–2025、全 jazz）策展所用的原始抓取與可追溯網址。
抓取日期：2026-09-19。MusicBrainz User-Agent 逐字 `dip-vinyl-shop/1.0 (kubinice06@gmail.com)`。
Discogs 未帶 token（`api.discogs.com` 以 `User-Agent: dip-vinyl-shop/1.0 +kubinice06@gmail.com` 直呼即可，實測 200）。

## 批次抓取的原始資料（已入庫，不留在暫存目錄）

| 檔案 | 端點 | 內容 |
|---|---|---|
| `mb.json` | `musicbrainz.org/ws/2/release-group/<rgMbid>?inc=artist-credits+tags` ＋ `ws/2/release?release-group=<rgMbid>&inc=labels+media+artist-credits&limit=100` | 22 筆 RG 的 title／artist-credit（含 `name`、`joinphrase`、`artist.id`、`artist.type`、`sort-name`）／first-release-date／primary-type／secondary-types／tags，以及轄下全部 release 的 date／country／barcode／label-info（含 label id，供第 1817 條核對）／media／status／disambiguation |
| `tracks.json` | `musicbrainz.org/ws/2/release/<id>?inc=recordings` | 每張取「軌數最多的那一筆 release」的全部軌名，供撞陳列掃描（⚠ `Gerald Clayton —《Ones & Twos》` 取到的是 21 軌 Expanded Edition、不是本卡釘的 12 軌標準版，見裁定第 2002 條） |
| `apple.json` | `itunes.apple.com/search?term=<掛名 盤名>&entity=album&country=us｜jp&limit=8` ＋ `itunes.apple.com/lookup?upc=<MB barcode>&country=us`（逐一 MB barcode 反查） | collectionId／artistName／collectionName／releaseDate／trackCount／copyright（℗ 欄）／collectionExplicitness／primaryGenreName／collectionViewUrl |
| `dg.json` | `api.discogs.com/database/search?type=release&artist=…&release_title=…&per_page=25`（落空時退回 `&q=<掛名 盤名>`；`Orchestras` 與 `Ooh-La-La` 兩張另以 `&barcode=` 與羅馬拼音掛名補抓） ＋ `api.discogs.com/releases/<id>`（每張取前五筆完整條目） | `artists`（含 `name`／`anv`／`join`）／`formats`／`series`／`labels`（**整條廠牌鏈**，第 1794／1919 條要用）／`companies`／`released`／`notes`／`genres`／`styles`／`tracklist`／`identifiers` |
| `bluenote.json` | `https://www.bluenote.com/artist/<藝人>/` | **28 個路徑**的 HTTP 狀態碼與去標籤後的內文（上限 9,000 字，切在 `SIGN UP TO THE BLUE NOTE NEWSLETTER` 之前） |
| `bluenote-extra.json` | `https://www.bluenote.com/?s=<關鍵字>` 站內搜尋 ＋ `https://www.universal-music.co.jp/<slug>/` | 藝人頁落空或無本碟報導時的補查：`?s=Celebration+Volume+1`（**地雷 1 第三張的 (甲) 唯一證據來源**）、`?s=Blue+Eclipse`、`?s=Chihiro+Yamanaka`、`universal-music.co.jp/yamanaka-chihiro/`（404）、`universal-music.co.jp/chihiro-yamanaka/`（200） |

抓取腳本：`fetch-mb.mjs`／`fetch-tracks.mjs`／`fetch-apple.mjs`／`fetch-dg.mjs`／`fetch-bn.mjs`，
**全部可續跑**（已抓到的鍵直接跳過，每 3 筆落檔）。

## ③ 廠牌官網（可引用序數的唯一來源，第 1714／1747-B／1750-B 條）

**`https://www.bluenote.com/artist/<藝人>/` 逐一實測狀態碼（裸名形與團名形都試）**：

- **200（24 個路徑）**：`melissa-aldana`／`bill-frisell`／`blue-lab-beats`／`meshell-ndegeocello`／
  `walter-smith-iii`／`wayne-shorter`／`immanuel-wilkins`／`mccoy-tyner`／`joe-henderson`／`bill-charlap`／
  `aaron-parks`／`nels-cline`／`artemis`／`gerald-clayton`／`brandon-woody`／`branford-marsalis`／
  `johnathan-blake`／`joshua-redman`／`harold-lopez-nussa`／`charles-lloyd`／`jason-moran`／
  **`marvin-sewell`（200 但正文 0 字，整頁只有導覽列）**／`dave-mcmurray`／`horace-silver`
- **404（4 個路徑）**：`bill-charlap-trio`／`chihiro-yamanaka`／`the-branford-marsalis-quartet`＋`branford-marsalis-quartet`

**兩項可引用的廠牌目錄序數（第 1714 條）**，逐字出處：
`nels-cline` → `2025 brings the release of Cline’s fourth Blue Note album Consentrik Quartet`；
`gerald-clayton` → `an expanded digital release of his 3rd Blue Note album`；
`artemis` → `ARTEMIS returns with their third Blue Note album ARBORESQUE`；
`dave-mcmurray` → `his fourth Blue Note album I LOVE LIFE even when I’m hurting`；
`walter-smith-iii` → `his sophomore Blue Note album, three of us are from Houston and Reuben is not`。
其餘 17 張只有身分敘述、無目錄序數，依第 1732 條（三）**不寫「第 N 張」**。

## ① 紙本

**整層跳過。** Billboard OCR 只覆蓋到 2015，本組 22 張全部是 2024–2025 的碟，結構性查不到。
依派工信指示，「紙本 0 命中」不寫成缺失或疑點，也不花工時去抓。

## 未使用的來源

⑤ AllMusic 與 ⑥ 維基本組未查——②④③ 三層在 22 張上全部有獨立證據（Discogs 零售條目 ≥1、
Apple `collectionId` ≥1、Blue Note 官網內文 ≥1），不需要再往下一層。
