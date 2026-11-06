# add-20261106-md40 裁定（情緒薄格線・頹靡：Bandcamp downtempo 候選 md40）

> 店主 2026-11-06：協調端從 Bandcamp downtempo 等標籤抓 1,901 張、依 Last.fm 收聽排序、便宜模型粗估落格；店主選「先做最遠的」——預估離邊界遠的 289 張分六批，三個工作階段並行。本工作階段做 md40＋md41（並行：ml68＋ml69、ml70＋md39）。卡單 `batch-progress/bandcamp-dt-20261105/pick-md40.json`（47 張）即策展結果，不派策展代理；說明見同目錄 `README.md`。
> 目標格：**頹靡＝靜（x<3.0）＋重（y≥0.5）＋冷（z<0）**；評分照 `batch-progress/mood-axes/score500/BRIEF.md`（10-23 店主體感標準）。卡單的 moodGuess 是只看 Bandcamp 標籤的粗估、把握多半 low，**研究層要照聲音再判一次**：判輕、有拍子推進、判暖的汰掉，不補人。
> 流程：卡單 47 → 主線初篩（身分、去重、資格、文案直述聲音）→ `curation-md40.json`（32）→ `master-md40.json`（MB 釘住 32、§1 人工 0）→ `build-cards.mjs` → 研究 3 組（a 11、b 11、c 10；組數由五組併成三組，壓尖峰代理數）。
> **預留：研究 a 23801–23810、b 23811–23820、c 23821–23830（d、e 不用）、鉤子 23851–23860、寫作 23861–23870、主線 23871–23880。**
---

## 主線初篩（不佔條號；2026-11-06）
- 身分：Bandcamp 專輯頁 ld+json（發行日、曲數、總長、發行者）＋ MB release-group 查詢（score 100、primary Album、無 secondary）逐張比對；留下的全數 MB 釘得住。
- 去重：`dedup-md37.mjs`（seed、所有 manifest、`data/pool-removed.json`、所有卡單、所有 curation）0 撞。
- **主線初篩汰 15**（卡單 47 → 32）：
  - 資格（EP／合輯／demo 集／remix）：Arms and Sleepers《NOSTALGIA FOR THE ABSOLUTE》（MB 標 EP、28 分）、All India Radio《Diamonds In The Dark》（Bandcamp 自述「orphaned songs」合集）、36《The Lower Lights》（MB Album＋Compilation）、All India Radio《ISO 2020》《Utopia 2021》（Patreon demo／早期混音集）、2814《Lost Fragments》（MB Compilation，稀有曲與未發表）、Sorrow《Unrequited》（MB EP、29 分）、Kaya Project《Ambient Mixes 2》（舊曲重製混音）。
  - 去重：Yagya《Stormur》（md8 已提名、研究後以「純 techno、像 DJ set」汰掉，不再提）。
  - 聲音明顯不落頹靡（文案直述）：Martin Nonstatic《Granite》（「smooth catchy drifts、soothing」，判暖判輕）、International Observer《Seen》（旋律 dub、「gorgeously seductive」，判暖；店主 11-05 dub 太多）、Moth Equals《Honey Trap》（「colourful plunderphonics、sticky melodies、runny beats」）、Gaudi & Antonio Testa《CONTINVVM》（民族打擊樂儀式、psydub；MB 查無、2005 錄 2018 發）、rest symbol《rest symbol》（「smoke-choked soul、psychedelic dub、exotica」判暖，29 分）、Lavurn《Baby it Cold Outside》（R&B、懷舊情歌，判暖）。
- 年份以原盤首發為準：Blackbird《Lonely Bird》2018（2026 Doki Doki Beats 重發）、mars kumari 2023（Bandcamp 2023-12-01 早於 MB 2024-02-21）、Bed《Spacebox》2002。
- 自我同名：Halou《Halou》（MB rgMbid 釘住，2008 年 Halou 第四張專輯，身分以 rgMbid 為證）。
- 同人多張：Disparition 3、Between Interval 2、2814 1（池中另 1）、All India Radio 1；同人不設上限。

