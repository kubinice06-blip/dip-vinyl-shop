# 頹靡 Bandcamp 線（md37／md38）策展補充（2026-11-05）

本檔是 `CUR-DISPATCH.md` 的補充：門檻、moodGuess、共同規則、輸出格式一律照 `CUR-DISPATCH.md` 的「共通」「頹靡 md」「共同規則」「輸出格式」四節。這裡只寫來源與這條線多出來的規則。

## 背景
店主 2026-11-05 剛以「不夠有名、沒有故事性」從卡池移出 1,042 張；頹靡多數場景已見底（`SCENES.md` md1–md36 收工註記）。店主：「恍惚跟頹靡可以去 Bandcamp 爬梳」。

## 來源怎麼用
- **Bandcamp Daily（daily.bandcamp.com）可直接 curl**（UA 一律 `dip-vinyl-shop/1.0 (+https://dipvinyl.tw)`，不准放 email）。專欄索引：`/best-ambient`、`/best-experimental`、`/best-electronic`、`/album-of-the-day`、`/lists`、`/scene-report`、`/label-profile`、`/features`（索引可能分頁，試 `?page=2`）。單期頁含 `https://<藝人>.bandcamp.com/album/<slug>` 連結與每張評介。
  - 抓頁：`curl -sS -A 'dip-vinyl-shop/1.0 (+https://dipvinyl.tw)' <url>`；抽連結：`grep -o 'https://[a-z0-9-]*\.bandcamp\.com/album/[^"?]*' | sort -u`。評介文字可用 `sed 's/<[^>]*>//g'` 粗剝。
- **`bandcamp.com/discover/<tag>` 是前端渲染，抓不到，不要花時間。**
- 個別專輯頁（`<藝人>.bandcamp.com/album/…`）可讀：發行日、廠牌、tags、曲目數與長度、封面（`f4.bcbits.com/img/a…_10.jpg`）。頁內 `<script type="application/ld+json">` 有 `datePublished`、`numTracks`、`byArtist`、`publisher`；用它判斷是不是全長專輯（曲目長度合計 ≥ 30 分鐘，或廠牌／Discogs 稱 LP／album）。
- **要有故事才收**：每張至少要有一個 Bandcamp Daily 專文／月度或年度榜／廠牌專訪／Album of the Day 的出處（網址寫進 `evidence` 第一個），最好再有第二個來源（樂評、廠牌頁、訪談、Discogs、維基）。只在 tag 頁出現、沒人寫過的不收。`why` 要說它在 Bandcamp Daily 被怎麼寫（一句），以及聲音為什麼落頹靡。
- **只收正規專輯**：不收 EP、單曲、合輯（含廠牌合輯、split）、現場、重混集、數位小品（<30 分鐘）。重發盤以原盤首發年為年份。
- **身分**：Bandcamp-only 的盤 MB 常查無 → 照 ALBUM_ONBOARDING §1 人工身分：`mbRgMbid` 留空、`mbAbsenceProof:{queries:[藝人方向查詢網址或字串, 作品方向], checkedAt:"2026-11-05", conclusion:"…"}`、`manualEvidenceUrls` 至少兩個 https（Bandcamp 專輯頁算一個；另一個用 Discogs release／master、廠牌頁、Bandcamp Daily 該期）。MB 查得到就照 MB 釘 `mbRgMbid`（primary-type Album、secondary-types 空）。
- **封面**：CAA 或 Bandcamp 封面（`f4.bcbits.com/img/a<id>_10.jpg`，寫進 `evidence` 或另填 `coverUrl`）。
- WebSearch **每支最多 4 次**（整個工作階段共用 200 次）；Bandcamp Daily、Bandcamp 專輯頁、MB API、Discogs API（`https://api.discogs.com/database/search` 需 token，改用 `https://api.discogs.com/artists/<id>/releases` 或 WebFetch Discogs 網頁）不限。

## 落格判準（照 CUR-DISPATCH「頹靡 md」，這條線最常踩的雷）
- Bandcamp Daily 的 ambient 榜很多是**暖、明亮、有旋律**（鋼琴、吉他、合成器琶音、new age、鳥鳴 field recording）→ 落恍惚或平靜，**不收**。只收冷、暗、重：低頻轟鳴、厚殘響霧、磁帶糊、失真長音、工業金屬質地、陰冷。
- **乾淨、稀疏、空氣感的**（microsound、單一細長音、Radigue 式、極簡鋼琴、乾淨弦樂四重奏）判輕落平靜，不收。
- **有鼓推進、脈動、techno 拍、嘶吼**判躁，不收。評介寫 pulse、propulsive、rhythmic、beats、danceable、bright、lush、warm、sunlit、gentle melody 的一律不提。
- 評介寫 crushing、murky、oppressive、bleak、cavernous、corroded、funereal、glacial、smothered、decayed tape、subterranean、dread 的才是我們要的。

## 去重（每張都要跑，0 才可提）
`node batch-progress/mood-cells-20261022/dedup-md37.mjs "藝人" "專輯" --self <你的組>`（含 seed、所有 manifest、`data/pool-removed.json`、所有卡單（含並行的 ml66／ml67）、所有 curation 檔）。
同藝人在池中已有幾張：`node batch-progress/mood-cells-20261022/dedup-md37.mjs --artist "藝人"`；池中同人三軸：`node batch-progress/mood-cells-20261022/pool-axes.mjs "藝人"`（同人池中已落頹靡的最穩；同人池中判輕／判暖／判躁的要特別小心）。
交件前跑 `node batch-progress/mood-cells-20261022/dedup-md37.mjs --file curation-<你的組>.json --self <你的組>`，撞 0 才交。

## 續跑
**每做完 5 張就把目前結果寫進輸出檔**；若輸出檔已有部分內容就接續補完，不要從頭重寫。輔助腳本放 `/tmp/claude-0/-home-user-dip-vinyl-shop/47e6ee06-951a-5826-983a-0d6eecfe6c1d/scratchpad/md3738/cur-<組>/`。
不要 git add／commit，不要改其他任何檔案（只寫自己的 curation 檔）。
