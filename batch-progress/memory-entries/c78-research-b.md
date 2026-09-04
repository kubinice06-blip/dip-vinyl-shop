## 2026-09-04 — dip-vinyl-shop — c-78 b 組研究層交件（美國 bluegrass 獨立廠與樂手自營盤，19 張）

- **改動摘要**：新增 `desc-tools/batches/research/c78-b.json`，19 張、**事實 181 條**（每張 9–10 條，全部帶可點的 HTTPS `src`），
  status 全 `full`、thin 0。來源網域：`discogs.com`（原盤條目、master 版本清單、廠牌與藝人條目，網頁對機器回 403、
  資料由 `api.discogs.com` 取得，網址本身可點——裁定第 22 條）、`musicbrainz.org`、
  `en.wikipedia.org`（只取有行內引註的段落，第 80 條）、`bluegrasshall.org`（Bluegrass Music Hall of Fame 傳記）、
  `rebelrecords.com`（官方廠牌史）、`ibiblio.org` 的 **Bluegrass Discography**（Charley Pennell 維護，可依盤名／樂手名檢索，
  帶 Release Date 與《Bluegrass Unlimited》評介年月，**本批最有用的第三方交叉來源**）、`music.apple.com`／`itunes.apple.com`。
- **主要檔案**：`desc-tools/batches/research/c78-b.json`、`batch-progress/memory-entries/c78-research-b.md`（本檔）。
- **驗證結果**：`cd desc-tools && node qa-batch.mjs research c78` → a 25／b 19、**key 與卡單完全一致 ✓、全部通過 ✓、標記 0**。
  109 個 `src` 逐個實測：41 個 Discogs 網址回 403（第 22 條記錄過的已知現象，API 全開、瀏覽器可開），
  其餘全部 200（兩個 ibiblio 網址在連續請求下曾被重置，單獨重測皆 200）。
- **推翻策展層五處**（詳見各卡 `notes`，均已指名「策展層說 X，實際是 Y，禁用 X」）：
  1. **Del McCoury《Livin' on the Mountain》**：策展層說「1971 年由 Grasshound 發行十三軌」。實際原盤是
     **1976 年 Grassound Records GRS 102、單聲道、12 軌、盤名《Collector's Special》、掛名 Del McCoury And The Dixie Pals**；
     1992 年 Rebel CD-1709 才改名並加進第 13 軌〈Rain & Snow〉。**卡單的 1971 是納許維爾 1971-08-09 的錄音日**。
     廠牌名亦錯：Discogs 上沒有 Grasshound，只有 **Grassound**。
  2. **Joe Val《One Morning in May》**：策展層說原盤 13 軌。**原盤是 12 軌**（Discogs 兩筆獨立的 Rounder 0003 黑膠條目一致）；
     MB 那筆 1971 release 的第 13 軌〈Sparkling Brown Eyes〉只存在於 1996 年 CD。
  3. **Ted Lundy《Slipping Away》**：策展層說「1972 年的同名盤」是 Rounder 的。**那是德國 GHP Records GHP-909**；
     Rounder 的三張是 0020《The Old Swinging Bridge》(1973)、0055、0107，策展層漏了 0020。
  4. **Country Cooking**：策展層說《26 Bluegrass Instrumentals》是 1982 年再發。MB 有 1982 與 1988 兩筆、
     Bluegrass Discography 只登 1988 年的 Rounder CD 11551，**年份無定論，禁用 1982**。
  5. **Charlie Moore《Avery County》**：掛名補正——Bluegrass Discography 上四筆條目全部作
     「Charlie Moore & his Dixie Partners」，下游字串比對兩種寫法都要試。
- **推翻探測層三處**：
  1. **Del McCoury《Livin' on the Mountain》Apple 13 軌是加曲版**（原盤 12 軌），探測層未標 `expandedReissue`；
     Apple `releaseDate` 為 `1971-01-01` 佔位值、`yearDrift` 因此算不出來，真正的訊號在 `copyright` 的「℗ 2005 Rebel Records Llc」。
  2. **Joe Val《One Morning in May》Apple 16 軌是 1996 年 CD**（原盤 12 軌），同樣未標；Apple 的 ℗ 寫 1971，兩個欄位都算不出漂移。
  3. **Jim Eanes《A Statesman of Bluegrass Music》**：探測層標了 `yearDrift: 6` 但未判定。**卡單的 1977 是對的**——
     MB、Discogs、**Bluegrass Discography 記 BU Date 197707（《Bluegrass Unlimited》1977 年 7 月評介）** 三份支持；
     Apple 的 1971 來自佔位日期與數位授權方的 ℗ 標記。
  逐張核對軌數的七張裡，**五張 Apple 與原盤相符**（Don Stover 14、Charlie Moore 12、Jim Eanes 12、
  Curly Ray Cline《Chicken Reel》12、Jimmy Arnold 12），**兩張是加曲版**（上列 1、2）。
- **互斥分派（一線一卡）**：Rounder 廠牌史**依 a 組的分派全數禁用**（a 組已判給 Ola Belle Reed《Ola Belle Reed》，
  並明文延伸禁止 b 組），僅 Joe Val 保留「這張碟是 Rounder 的第一張藍草專輯」這一句（有來源直記，**列為待主線裁定**）；
  Rebel 廠牌沿革→Curly Ray Cline《Chicken Reel》；Dick Freeland 這個人→The II Generation《Head Cleaner》；
  Ridge Runner→Alan Munde；Old Homestead→Charlie Moore；Lemco→Red Allen；Jessup→Jim Eanes；
  Folk-Lyric→Snuffy Jenkins；Grassound→Del McCoury《Livin' on the Mountain》。
  骨架（第 131 條）：「在 Bill Monroe 團裡待過」與「多年後進了名人堂」→Don Stover；「父子／兄弟同團」→Red Allen；
  「第二代接手」→The II Generation；「樂手與廠牌是同一個圈子」→Alan Munde；「日本也發了盤」→Del McCoury《Our Kind of Grass》。
  **全批禁用**：壓量與稀有度（第 109 條）、型錄編號當序數（第 125 條）、「樂手自己掏錢壓片」（查無來源）、
  「碟出來時人已經不在」（a 組已判給 Wade Ward）。
- **撞名警告已寫進 notes**：Bobby Patterson（全批告示，寫在 Ted Lundy《Slipping Away》）、
  Red Allen 對紐奧良爵士小號手 Henry「Red」Allen、Alan Munde 對池中的 Hugh Mundell；
  另抓到兩處本批內部的同名：**Red Allen 的本名就是 Harley Allen、而碟上另有一位同名的兒子**；
  **《Livin' on the Mountain》另有 Bill Keith & Jim Rooney 1963 年的同名 LP 與 45 轉**。
- **未做**（依 `REMOTE_RUNBOOK.md`，雲端不碰）：`seed_cards.json`／`apex_pool.json`／`PROJECT_MEMORY.md`／KV／Firestore，
  以及卡單、`prop-*.json`、`caa.json`、`previews.json`。
