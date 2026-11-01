# add-20261101-eb1 裁定（鐵幕爵士＋MPS 策展線・Kőrössy＋羅馬尼亞＋南斯拉夫＋保加利亞）

> 店主 2026-11-01：「Yancy Körössy* - Identification 收錄 並且擴展相關專輯」→「擴張到 200 張」（交接 `batch-progress/eastbloc-jazz-20261101/PLAN.md`）。本工作階段負責 eb1、eb2。流程沿用情緒薄格線腳本（`batch-progress/HANDOFF-mood-cells-line.md` §二），**不做 moodGuess 邊距檢查**；情緒評分照 `batch-progress/mood-axes/RULES.md`，不算落格率。
> 策展：`curation-eb1a.json`（23：Kőrössy＋羅馬尼亞）＋`curation-eb1b.json`（25：南斯拉夫＋保加利亞＋羅馬尼亞剩餘）→ 主線汰 8（`master-override-eb1aeb1b.json`）→ `master-eb1aeb1b.json`（40 張：MB 釘住 20、§1 人工 20）→ `pick.json`（40）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261101-eb1-cards.json`（40 張；研究 a–e 各 8）。
> **預留：研究 a 47001–47010、b 47011–47020、c 47021–47030、d 47031–47040、e 47041–47050、鉤子 47051–47060、寫作 47061–47070、主線 47071–47080。**（eb 線條號：ebN → 47001＋(N−1)×100 起，每批 80 條。）
---

## 主線策展（不佔條號）
- **策展 48 張 → 收 40 張；對 seed 與 origin 163 條 main／claude/* 分支 seed 去重 0 撞**（eb1b 自己剔除池中已有的 Leb i Sol《Leb i sol》）。
- **Kőrössy 統一掛名「Yancy Körössy」**：MPS《Identification》封面掛名；Electrecord《Seria Jazz Nr. 1》原掛 Jancsi Körössy、Qualiton 1964 原掛 Kőrössy János，三者同一人（匈牙利裔羅馬尼亞鋼琴手），原寫法放 queryAlias。《Identification》國別改 ro（藝人所屬場景；發行地西德寫在研究稿）。
- **《Identification》、《Seria Jazz Nr. 1》、Răducanu《Jazz în Trio》的 MB release-group 首發日是重發年**（2006 日本 CD、2011 數位重發），曲目經策展核對與原盤一致，照釘；年份填原盤首發 1970／1965／1967。
- **主線汰 8**：Aura Urziceanu《Aura》（1973，Discogs 標 smooth jazz，Aura 另收兩張）、Brigitte Petry／Oschanitzky 1966（流行舞曲人聲，爵士純度不足）、《Conexiuni Bop》（兩團各一面的 split 盤）、Tone Janša《Beogradski Jazz Festival '78》（音樂節現場、非其代表作，不開例外）、Jazz Quintet《Idea》（團名通用、成員資料薄）、Lyudmil Georgiev《Midnight Hour》（輕爵士）、Răducanu《Confesiuni》（第三張，Răducanu 已收兩張）、Trio Manusardi《Impresii din Vacanță》（Manusardi 另收 1968《Free Jazz》，義大利人只留一張）。
- Goykovich 1961 PGP 10 吋八重奏盤（與 Kenny Clarke）：策展填了 releaseException，主線清掉——10 吋六首是當時國營廠正規專輯形式，不是例外。1961「sastanak u studiju」系列另兩張（Roković、Dieval）同理照專輯收。
- 移民西方後的錄音（Goykovich MPS／Enja、Jazz Focus '65 MPS 盤、Roković《Ultra Native》、Vapirov Leo 盤）留給 eb5／eb4。

## 研究 a 組
- 47001：研究稿 `desc-tools/batches/research/add-20261101-eb1-a.json`（8 張）。Discogs API（master／release／artist）直連可用；維基 ro／en 用 `index.php?action=raw`（標題需 URL 編碼）；WebSearch 用 3 次（Weiner、Popp、Urziceanu 各一），另取 PopMatters、Sonar Kollektiv、Music Regular 三頁。
- 47002：身分核對 8 張盤名／年份／廠牌皆與卡單一致，無推翻。Seria Jazz Nr. 1 年份：Discogs 1965（錄音 1965-08、發行 1965-12）、羅馬尼亞維基寫 1966，照 Discogs 1965。Spirale：羅馬尼亞維基寫 1977，Discogs／MB 為 1976，照 1976。Nodul Gordian：維基寫 1983，Discogs／MB 1984，照 1984。
- 47003：《Kőrössy János És Együttese》Qualiton 1964 判為 thin：Discogs 無樂手 credits，樂團編制不明，facts 不寫成員；hook 已去掉「俄文標籤」與「出口市場」之類推測。《Oh, My Love》判 thin：只知 Orchestra Electrecord／Ron Rully 指揮，無樂手清單、無獨立樂評。
- 47004：moodGuess 存疑：Marius Popp《Nodul Gordian》（預估合成器；Discogs credits 只有鋼琴與電鋼琴，無合成器）。其餘 7 張無異議。不建議汰換。
- 47005：Aura《Oh, My Love》曲目為流行翻唱（含三首葡語曲名 Canto Triste／Reza／Dindi），原唱者未逐首查，facts 不指原唱。
- 47006：Weiner 四重奏成員取自 Discogs credits；維基只確認 Flora 咖啡館三重奏班底（Hromadka、Kamocsa、Butoi），兩者重疊但未見來源直接說明，寫作層宜保守。
