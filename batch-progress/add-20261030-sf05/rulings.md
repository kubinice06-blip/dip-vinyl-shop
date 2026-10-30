# add-20261030-sf05 裁定（Spotify 追蹤藝人補卡池・台灣華語流行、R&B、獨立樂團）

> 店主 2026-10-30「依 Spotify 追蹤藝人補卡池」（`/dip-card-create`），交接 `batch-progress/spotify-follow-20261030/PLAN.md`；本工作階段負責 sf05、sf07。流程沿用 `batch-progress/HANDOFF-mood-cells-line.md` §二，策展層改 `CUR-DISPATCH-SF.md`；**不做 moodGuess 邊距檢查**，情緒評分照 `batch-progress/mood-axes/RULES.md`、不算落格率。
> 策展：`curation-sf05a.json`（10 張）＋`curation-sf05b.json`（10）＋主線補收 `curation-sf05m.json`（5）→ `master-sf05asf05bsf05m.json`（MB 釘住 12、§1 人工 13）→ `pick.json`（25）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261030-sf05-cards.json`（25 張；研究 a–e 各 5）。
> **預留：研究 a 30501–30510、b 30511–30520、c 30521–30530、d 30531–30540、e 30541–30550、鉤子 30551–30560、寫作 30561–30570、主線 30571–30590。**（條號以批號編段：sfNN → 30NN01 起，避免與並行的 sf 工作階段撞號）
---

## 主線策展（不佔條號）
- 清單 27 位：**收 21 位 25 張**、**跳過（已在池）1 位**、**不收 5 位**。
- **跳過**：Jo-Yu Chen → 池中寫法「陳珊妮」（2 張：《華盛頓砍倒櫻桃樹》《完美的呻吟》）。
- **不收**：Wendy Gondeln（只有 5 首《Fracking》EP）、台北公案（Apple／MB／Discogs 只有單曲）、趙謬（只有單曲）、大師兄（同名多位；Apple 該藝人只有 5 首 EP《老本行》）、不幻（Apple／MB／Discogs 查不到可對應的台灣藝人，身分不明）。
- **主線推翻策展層 5 處（補收 `curation-sf05m.json`）**：
  - Layton Wu：策展層照 PLAN 的等號當成吳卓源而跳過；Apple 藝人目錄與 MB 顯示是另一位台灣創作者（Apple 台灣站名「雷頓狗」，℗ 2024 Layton Wu，曲目有〈Taipei〉），收首張正規專輯《Blue Jeans》（MB 釘住）。**PLAN.md 的「Layton Wu＝吳卓源」有誤**，吳卓源（Julia Wu）不在本清單。
  - YELLOW黃宣：策展層以「curation-ml20 已收《浮世擊》」跳過，但 ml20 研究層已汰掉該張，**池中沒有黃宣**；收《浮世擊》（MB 釘住）。《BEANSTALK》8 首，第二張不收。
  - KUNG 龔敬文：策展層只查到單曲；Apple 藝人目錄 lookup 有 14 首正規專輯《甲洨斯丁》（2022），§1 人工身分收。
  - 潮州土狗（sf05b）：同上，8 首專輯《狗狗歷險記》（2022，Chill Entertainment），§1 人工。
  - Norton Street 諾頓街：同上，13 首首張專輯《街拍》（2025），§1 人工。
- 其他採策展層原選：徐佳瑩《LaLa首張創作專輯》《尋人啟事》、王心凌《Cyndi Loves You》《Honey》、Karencici《Sha Yan》、Yu Ching 黃雨晴《The Crystal Hum》、老貓偵探社《小港羅曼史》、宝島材料行《宝正好廳》、庸俗禿鷹《庸俗禿鷹》、Yo-Sea《Sea of Love》（日本沖繩 R&B 歌手，country jp）、絕命青年《來一場冒險》、聲子蟲《真面目》《午夜城》（6 首、releaseException）、荒山茉莉《水沒之都》、非／密閉空間《Flow, Gesture, and Spaces》、頭部組成者《刑天》、吳書齊《鹿港》（Apple 署名吳書齊爵士樂團）、狗毛《吠物之歌》、陳穎達《動物感傷》《你聽過Beige嗎》。
- **狗毛**：Apple「狗毛」藝人頁同時掛 1994 滾石《衝動》、2003《Live is Life》與 2025《吠物之歌》，另有「狗毛樂團」《不苟》（2023）。Spotify 追蹤的是「狗毛」；取最新的正規錄音室專輯《吠物之歌》，研究層要查清 1994 與 2025 是否同一人／團，查得是同一人且《衝動》才是公認代表作就改收《衝動》。
- 交研究層把關：庸俗禿鷹身分（勿與庸俗救星混淆）、Karencici 盤名官方寫法（Sha Yan／傻眼）、王心凌兩張原發行廠牌、吳書齊《鹿港》年份（2007 vs Discogs 2015）、潮州土狗／龔敬文的曲風與身分。
- 跨分支去重：對 origin/main 與 10-28 後更新的 `claude/*` 分支 seed 查藝人名、別名、Spotify 寫法，0 撞。
