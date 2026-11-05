# prune-20261105 裁定紀錄

只產移出候選名單，不改 seed／Firestore／KV／card-moods。

## 範圍
- 格子判定照 `data/mood/card-moods.json` 的 thresholds（x≥3 躁、y≥0.5 重、z≥0 暖）；雀躍＝躁＋輕＋暖、放鬆＝靜＋輕＋暖。
- 兩格合計 11,507 張；扣頂點 238、店內庫存 188（artist／album 正規化比對＋cardKey）→ 11,081 張非頂點非庫存。
- 判定範圍 3,260 張：A 範圍（三軸皆 ≤3）3,020 ∪ B 範圍（1970–1989、經典 ≤3、曲風含 soul 或子曲風屬 disco／smooth／philly／motown／funk）641。
  - B 範圍比協調端的 746（曲風首位 soul、不限經典）寬窄不同：加了經典 ≤3 的條件（店主規則），但曲風看全部標籤而非首位，把 jazz-funk／smooth fusion 標 soul 的也收進來。

## 管線裁定
- 子代理續跑門檻 N=20（分類工作每筆一行，N=5 會讓工具呼叫翻四倍；仍符合「重啟後接續」的目的）。
- 分 10 片（各 326 張）、按曲風＋藝人排序切，同曲風同片判、尺度較一致；10 支 Sonnet 同時在飛（不上網，不吃 WebSearch 額度，沒有補洞／寫作的併行上限問題）。
- listeners 3,182／3,260 查到；worker 單線 4 併發太慢（約 50 筆／分），改 10 併發後約 600 筆／分，未見錯誤。
- 同時符合 A 與 B 的標 B。
- listeners 查不到（null）不當作「不有名」的證據，只看知識。

## 子代理交件
- 10 片全交（3,260 筆，無缺漏）。多數子代理沒有照「每 20 筆寫檔」，而是一次寫完（各片 90–140 秒跑完，重啟風險低，不重派）。
- 尺度落差大：S05 候選 212／326、S06 56／326。S04 理由幾乎全是模板句。

## 主線審稿（1,357 筆初步候選逐張看過＋抽 90 筆保留）
機械規則（`merge.mjs`）：
- Last.fm 聽眾 ≥40 萬 → 不算「不夠有名」，改保留（8 筆：Timbaland《Shock Value II》、Usher《Raymond v Raymond》、Travis《The Boy With No Name》、Omarion《21》等）。
- 聽眾 15–40 萬 → 一律 borderline（44 筆）。
- B 類但曲風不含 soul（Grateful Dead《Go to Heaven》、George Harrison《Extra Texture》、Chicago 13 之類）→ borderline；三軸皆 ≤3 的改填 A（17 筆）。
個別改判（`main-overrides.json`，21 筆）：
- 改保留：Willie Dixon《Hidden Charms》（葛萊美）、Dustin O'Halloran《Piano Solos Vol. 2》、Lonnie Liston Smith《Renaissance》《Reflections of a Golden Dream》、Lalo Schifrin《Black Widow》、Joe Lee Wilson & Bond Street、Hank Mobley《Hank Mobley》（BN 1568）、Dane Donohue、Tom Jones《Along Came Jones》。
- 改 borderline：Dylan《Dylan》、Neil Young《Old Ways》、Cohen《Dear Heather》、Shakatak《Night Birds》、The Who《Face Dances》、Fred Wesley《House Party》、Curtis《Do It All Night》、Loose Ends《Zagora》、L.T.D.《Togetherness》、Sister Sledge《Love Somebody Today》、Temptations《A Song for You》、Commodores《Hot on the Tracks》。
- 保留側抽查：多數合理；偏寬處（日本融合、福音小廠、Steve Kuhn 現場等）不改，寧留給店主從 kept-near 挑。

## 自動保留（2026-11-05 店主：「歐洲爵士全部保留；Blue Note 留代表性的，查價格」）

- 459 張爵士候選逐張查 Discogs（廠牌、發行國、want/have），Blue Note 281 張再查 master 主版的最低售價。
- **歐洲爵士 61 張全保留**：依藝人國籍／活動地認定（含 Petrucciani、Terrasson、Yaron Herman、Maya Delilah）；
  Trijntje Oosterhuis 的 pop／soul 兩張、Aznavour／Trenet（香頌）、Van Morrison、以色列籍樂手不算。
- **Blue Note 代表作 68 張保留**：want ≥ 1000 或原版最低售價 ≥ US$100。只看價格會偏向 1955–67 原版，所以兩者取其一。
  其餘 174 張 Blue Note（多為 90 年代後 CD 期與 70–80 年代後期作）不自動保留，店主可再手動按。
- 明細 `auto-keep.json`；寫進 artifact db `keep`（欄位 `auto` 標來源）。
