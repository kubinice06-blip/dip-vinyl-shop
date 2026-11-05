# 恍惚 ml66／ml67 策展補充：從 Bandcamp 爬梳（2026-11-05）

先讀 `CUR-DISPATCH.md`（「共通」「恍惚 ml」「共同規則」「輸出格式」四節）、`batch-progress/mood-axes/score500/BRIEF.md` 的 X／Y／Z 三節（以 2026-10-23 店主體感標準為準）、`SCENES.md` 恍惚 ml 表（看各批收工註記：哪些場景已見底、什麼聲音會判輕／判冷）。本檔只寫與 CUR-DISPATCH 不同或新增的地方。

## 來源怎麼用
- `https://daily.bandcamp.com/` 可直接 curl／WebFetch（UA：`dip-vinyl-shop/1.0 (+https://dipvinyl.tw)`，**不放 email**）。專欄索引頁：`/best-ambient`、`/best-electronic`、`/best-jazz`、`/best-soul`、`/best-rock`、`/album-of-the-day`、`/lists`、`/scene-report`、`/label-profile`、`/features`（索引可加 `?page=N` 翻頁，先試）。單期頁含 `https://<藝人>.bandcamp.com/album/<slug>` 連結與每張的評介。
- `bandcamp.com/discover/<tag>` 是前端渲染，抓不到，**不要花額度**。個別專輯頁可讀（發行日、廠牌、tags、曲目長度、封面 f4.bcbits.com）。`<藝人>.bandcamp.com` 直連有時回 403，改用 WebFetch 或換 `bandcamp.com/album/...` 形式，再不行就以 Bandcamp Daily 該期文字＋Discogs／MB 為證。
- **要有故事才收**（店主剛用「不夠有名、沒有故事性」砍了 1,042 張）：每張至少要有 Bandcamp Daily 專文／月度或年度榜（Best of 20XX）／廠牌專訪／Album of the Day 之一，**那個網址必須寫進 `evidence`**；另有第二個來源（Pitchfork、The Quietus、Resident Advisor、The Wire、維基、廠牌頁、AllMusic）更好。只在 tag 頁出現、沒人寫過的不收。
- **不收嘻哈、雷鬼、dub**（店主：太多了）。不收 beat tape 小品、EP、單曲、合輯、現場、remix 集、DJ mix。全長正規專輯才收（Bandcamp 頁的曲目總長通常 ≥ 28 分鐘、≥ 6 軌；短的寧可不收）。
- **身分**：先查 MB（CUR-DISPATCH 共同規則第 1 條，1 req/s）。Bandcamp-only 的盤 MB 常查無 → 走人工身分：`mbAbsenceProof`（兩個查詢：藝人方向、作品方向，`checkedAt:"2026-11-05"`）＋`manualEvidenceUrls` 至少兩個 https（Bandcamp 專輯頁、Discogs、廠牌頁、Bandcamp Daily）。年份＝Bandcamp 頁 released 日期年份（或 Discogs 最早版本）。
- **封面**：MB 釘得住且 CAA 有圖的寫 CAA；否則寫 Bandcamp 圖網址（專輯頁 `og:image`，形如 `https://f4.bcbits.com/img/a<數字>_10.jpg`），寫進 `evidence` 並另填欄位 `coverUrl`。
- **WebSearch 每支最多 6 次**（整個工作階段共用 200 次）。以 curl／WebFetch Bandcamp Daily、MB API、Discogs API 為主。

## 落恍惚的經驗（從 ml1–ml65 收工註記歸納，挑片時照這個篩）
- 門檻 x ≤ 2.7、y ≥ +0.8、z ≥ +0.3，三軸都留邊距；貼邊的不提。
- **色溫最難**：2026-10-23 起「旋律不明、靠音色／即興撐 → 冷」。所以**純 drone、無調性 ambient、純質感 field recording 多判冷**（Slowdive《Pygmalion》z −1、Grouper 全在 −0.6）。暖 ambient 要有**清楚的和聲／旋律線、溫暖大調和弦、人聲或明確的主題**；new age 有旋律的又常判**輕**（空氣感、乾淨）——兩頭都要過：要厚（墊、殘響、磁帶糊、低頻）又要暖（旋律好入耳）。
- spiritual jazz：Pharoah《Karma》、Alice Coltrane《Journey in Satchidananda》都判冷（旋律不明）。只收**主題清楚、慢、厚（弦樂／風琴／合唱／人聲墊）**的；長段即興、自由段多的不收。當代暖爵士常判**輕**（原聲、乾淨、聲部分明），要有厚殘響、合成器墊、弦樂或濕的製作才收。
- neo-soul／alt R&B：快的、硬拍取樣、帶饒舌客串的不收（判躁）；乾淨數位製作判輕。
- dream pop／shoegaze：airy／bright、鼓機推進的判輕或躁；陰冷的落頹靡。要暖、慢、霧。
- **池中同人錨點最可靠**：`node batch-progress/mood-cells-20261022/pool-axes.mjs "藝人"` 看同藝人已上線卡的三軸；同人已落恍惚（x<3、y≥0.5、z≥0）的盤最穩，同人全判輕／判冷的不要提。
- **去重**（每張必跑，`OK` 才可提）：`node batch-progress/mood-cells-20261022/dupchk.mjs "藝人" "專輯"`——比對 seed、所有 manifest、`data/pool-removed.json`（被移出的不重新上架）、所有 `curation-*.json` 既有提名；同一行也印池中同人三軸。

## 輸出
格式同 CUR-DISPATCH「輸出格式」，每張多三個欄位：`storyUrls`（Bandcamp Daily 等「有人寫過」的網址陣列，至少 1）、`coverUrl`（CAA 以外時填）、`bandcampUrl`。`why` 寫明出處（例：「BC Daily Best Ambient 2021-04」）。
**每做完 5 張就把目前結果寫進輸出檔；若輸出檔已有部分內容就接續補完，不要從頭重寫。** 輔助腳本放 `/tmp/claude-0/-home-user-dip-vinyl-shop/ef1363d3-b97e-58ba-90cd-8c43b694155d/scratchpad/cur-<組>/`。不要 git add／commit，不要改其他任何檔案（除了自己的 curation 檔）。
完成後回報要短：張數、各 faction 張數、MB 釘住／人工身分各幾張、moodGuess 分布、Bandcamp Daily 掃了哪些期、產量與坑（一兩句）。
