# c-164 a 組證據層來源清單

抓取日 2026-09-19。三份原始快取，供下游與覆核直接比對，不要當成裁定本身（裁定在 `rulings.md`）。

| 檔 | 端點 | 內容 |
|---|---|---|
| `mb.json` | `musicbrainz.org/ws/2/release-group/<rgMbid>?inc=artist-credits+genres+tags`＋`/release?release-group=<rgMbid>&inc=labels+media+artist-credits&limit=100` | 23 筆 RG 與其轄下全部 release（label-info、barcode、media、artist-credit 逐字）。User-Agent 逐字 `dip-vinyl-shop/1.0 (kubinice06@gmail.com)` |
| `dg.json` | `api.discogs.com/database/search?type=release&artist=&release_title=` ＋ `api.discogs.com/releases/<id>` | 每筆前 3–8 個零售條目的 `formats`／`labels`／`series`／`companies`／`identifiers`／`tracklist`／`notes`／`uri` 逐字。⚠ `www.discogs.com` 網頁端回 403，API 端 200 |
| `apple.json` | `itunes.apple.com/search?entity=album`，storefront `us`／`jp`／`gb`／`fr`／`de` | 每地區前 12 筆的 `artistName`／`collectionName`／`releaseDate`／`trackCount`／`copyright`（℗ 欄）／`collectionExplicitness`／`collectionId` |

⚠ **紙本 Billboard 本組不查**：主線第 1728 條（Billboard OCR 只覆蓋到 2015，本組全部 2016–2018）。
⚠ **③ `bluenote.com/artist/<藝人>/` 逐筆結果寫在 `rulings.md` 各條，未另存快取**（頁面是 HTML，逐字引用已入裁定）。
