## 2026-09-16 — dip-vinyl-shop — Blue Note 合輯正典回撈（第 312／597 條），切出 c-147

- **改動摘要**：Blue Note 線的固定規格會濾掉 `secondary-types` 帶 Compilation／Soundtrack／DJ-mix／Remix 的碟，
  1939–66 開跑時就發現**正典會被一起濾掉**（第 312 條），六批跑完後回頭處理。
  列舉層把被濾網擋掉的 **687 個 album release-group 全部撈回逐筆分 tier**：
  **`canon` 17／`vault` 7／`realcomp` 396／`va` 264／`unknown` 3**。
  MB 全目錄重拉 7,092 release → 2,819 RG，**與 2026-09-15 那次列舉的數字完全相符**。
- **主要檔案**：`batch-progress/enum/blue-note-comp.json`（687 筆，欄位＝`blue-note.json` 17 欄 ＋ secondaryTypes／tier／tierWhy）、
  `batch-progress/enum/blue-note-comp.md`（分 tier 表、代表碟、inPool 人工核對結果）、
  **`batch-progress/c147/slice.json`（16 張）＋`chk-prop.mjs`**，並在 `label-lines.mjs`、`probe/probe-previews.mjs` 註冊 c147。
- **⚠ 結論比預期小，原因是好消息**：第 312 條擔心的「10 吋重組成 12 吋的 Volume 1／2」
  **大部分 MB 根本沒標 Compilation**，早就在 1,812 張純專輯那條線裡（Monk《Genius》Vol. 1／2、
  Powell Vol. 2、Cafe Bohemia Vol. 1／2 都在）。**真正被擋掉的正典只有 17 張。**
- **主線裁定（第 597 條）**：canon 17 全收（6 張池中已有、實收 11）；
  **vault 7 收 5 退 2**——**退的是兩張《Alternate Takes》**（與池中正盤同場同曲，上架會變成同一張碟兩張卡）；
  **判準：vault 盤收「錄音首度問世」，不收「同一張碟的另一個 take 集」**。
  unknown 3 全退（口語喜劇、查不清楚、與 BLP 1501 重複 RG）。realcomp 396 ＋ va 264 不收。
- **⚠ 第 611 條（工具盲區）又中新形狀**：`inPool` 機器算 22 張，人工逐張核對後**3 張是誤判、實際仍缺**
  （Bechet BLP 7020 對到 BLP 1207、Miles BLP 1502 對到 10 吋 BLP 5022、Kenny Burrell Vol. 3 對到 BLP 1543）
  ——**「同名但不同盤的 Volume 碟」是子字串比對的第二種盲區**（第一種是「群組掛名 vs 個人掛名」）。
  **`realcomp`／`va` 的 inPool 沒逐張核對，不可當涵蓋量。**
- **備查（這輪不收）**：`va` 裡的 1951《Mellow the Mood》BLP 5001 形狀其實是原始 10 吋發行，只是掛 Various Artists。
