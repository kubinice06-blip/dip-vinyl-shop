# c-165 a 組 證據層來源清單

本檔記錄 a 組（23 筆、2020–2021、全 jazz）策展所用的原始抓取與可追溯網址。
抓取日期：2026-09-19。

## 批次抓取的原始資料（已入庫，不留在暫存目錄）

| 檔案 | 端點 | 內容 |
|---|---|---|
| `mb.json` | `musicbrainz.org/ws/2/release-group/<rgMbid>?inc=artist-credits+tags` ＋ `ws/2/release?release-group=<rgMbid>&inc=labels+media+artist-credits&limit=100` | 23 筆 RG 的 title／artist-credit／first-release-date／primary-type／secondary-types／tags，以及轄下全部 release 的 date／country／barcode／label-info／media |
| `apple.json` | `itunes.apple.com/search?entity=album&country=us｜jp` | 23 筆的 Apple 店面條目（collectionId／artistName／collectionName／releaseDate／trackCount／copyright ℗ 欄） |
| `dg.json` | `api.discogs.com/database/search?type=release` ＋ `api.discogs.com/releases/<id>` | 23 筆的 Discogs 搜尋結果與前四筆的完整條目（`formats`／`series`／`labels` 廠牌鏈／`companies`／`released`／`notes`／`genres`／`styles`） |
| `tracks.json` | `musicbrainz.org/ws/2/release/<id>?inc=recordings` | 每張取「軌數最多的那一筆 release」的全部軌名，供撞陳列掃描 |

MusicBrainz User-Agent 逐字 `dip-vinyl-shop/1.0 (kubinice06@gmail.com)`。

## 補抓（`apple.json` 的關鍵字查法落空，改走 UPC lookup）

- `ARTEMIS —《ARTEMIS》`：`itunes.apple.com/lookup?upc=602508937361&country=us` → **`1522995342`**，`artistName` 逐字 `ARTEMIS`、`collectionName` 逐字 `Artemis`、`releaseDate` 逐字 `2020-09-11T07:00:00Z`、9 軌、℗ 欄逐字 `Blue Note Records; ℗ 2020 UMG Recordings, Inc.`
- `Norah Jones —《…’Til We Meet Again》`：`lookup?upc=602435689845&country=us` → **`1554405839`**，`collectionName` 逐字 **`‘Til We Meet Again (Live)`**（⚠ 開頭是 U+2018 左單引號、無刪節號）、`releaseDate` 逐字 `2021-04-16T07:00:00Z`、14 軌
- `山中千尋 —《Rosa》`：`search?term=山中千尋 Rosa&country=jp` → **`1517727137`**，`artistName` 逐字 **`山中千尋`**（漢字）、`collectionName` 逐字 `Rosa`、`2020-06-24T07:00:00Z`、10 軌、℗ 欄逐字 `A Universal Classics & Jazz release; ℗ 2020 UNIVERSAL MUSIC LLC`
- `Art Blakey & The Jazz Messengers —《First Flight to Tokyo》`：`search?term=Art Blakey First Flight to Tokyo&country=us` → **`1585996849`**，`artistName` 逐字 `Art Blakey & The Jazz Messengers`、`2021-12-10T08:00:00Z`、9 軌
- `Charles Pasi —《Zebra》`：`lookup?upc=00602508687051` 於 `us`／`fr`／`de`／`gb` 四個 storefront 全部回同一筆 **`1496742527`**，`releaseDate` 逐字 `2021-02-05T08:00:00Z`、℗ 欄逐字 **`℗ 2020 Decca Records France`**

## ③ 廠牌官網（可引用序數的唯一來源，第 1714／1800 條的三條路徑）

**`https://www.bluenote.com/artist/<藝人>/` 逐一實測狀態碼**：

- **200（14 個路徑、涵蓋 15 張卡）**：`gerald-clayton`／`artemis`／`immanuel-wilkins`／`ron-miles`／`joe-chambers`／`dr-lonnie-smith`／`bill-charlap`／`norah-jones`／`terence-blanchard`／`bill-frisell`／`nduduzo-makhathini`／`tony-allen`／`arturo-ofarrill`／`charles-lloyd`／`art-blakey`
- **404（6 個路徑、涵蓋 7 張卡）**：`thomas-dutronc`／`ben-loncle-soul`／`charles-pasi`／`andre-manoukian`／`trijntje-oosterhuis`／`chihiro-yamanaka`／`bill-charlap-trio`（⚠ 裸名 `bill-charlap` 有效、團名形 404，與第 1823 條的 `lonnie-smith`／`dr-lonnie-smith` 恰好相反）

**新聞稿頁**：
- `https://www.bluenote.com/art-blakey-the-jazz-messengers-first-flight-to-tokyo-the-lost-1961-recordings/`（(甲) 的決定性逐字證據）
- `https://www.bluenote.com/releases/first-flight-to-tokyo-the-lost-1961-recordings/`（同碟，發佈日 `September 15, 2021`）

**日本線（第 1800 條路徑三）**：
- `https://www.universal-music.co.jp/chihiro-yamanaka/products/uccj-2181/` → 200，商品名逐字 **`ローザ [通常盤] [SHM-CD]`**、發売日 `2020-06-24`、品番 `UCCJ-2181`

**歐陸線（廠牌官網的地區分站）**：
- `https://www.universal-music.de/charles-pasi/musik/zebra-587235` → 逐字 `VÖ: 05. Februar 2021`、廠牌逐字 `Blue Note`

## ⑥ 其他（只在年份爭議那一張用到）

- `https://www.paris-move.com/reviews/charles-pasi-zebra/` → 廠牌列逐字 `BLUE NOTE / UNIVERSAL`、街頭日逐字 `27 mars`、評論刊出日逐字 `PARIS-MOVE, February 28th 2020`
- `https://www.afrik.com/musique-zebra-le-nouvel-album-de-charles-pasi` → 刊出日逐字 `Publié le 30 janvier 2021 à 12h41`、內文逐字 `la sortie officielle de cette œuvre musicale est prévue le 5 février prochain`
- `https://www.parisjazzclub.net/en/69825/concert/2020/10/09/charles-pasi` → 場次逐字 `Charles Pasi : Zebra｜Friday October, 9th 2020`

## ① 紙本

**本組 23 筆全部是 2020–2021 的碟，Billboard OCR 只覆蓋到 2015（第 1723／1728 條）——結構性查不到，依第 1728 條第 2 點不查、不寫進 `risk`。**
