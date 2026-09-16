## 2026-09-16 — dip-vinyl-shop — c-136 走完雲端段（Blue Note BLP 1500 系列，43 張）

- **改動摘要**：店主 2026-09-15「美國先挖 blue note」→「Blue 太少了 這麼多你才選 198 張？」。
  **Blue Note 在資料庫上有 1,812 張純專輯、池中 290，缺 1,506——全部要跑。**
  主線把 1939–66 缺的 261 張切成 c-135～c-140、1967–84 缺的 233 張切成 c-141～c-146，
  簡報寫在 `batch-progress/CURATION-BRIEF-bluenote.md`，每批的清單落在 `batch-progress/c1XX/slice.json`。
  **c-136 是第一批走完全程的**：43 張、24 位掛名、零 §1、零跨批撞卡、全部純 Album。
- **主要檔案**：`batch-progress/c136/`（prop-{a,b}、chk-prop.mjs、caa.json、rulings.md、HANDOFF.md、apple-candidates.md）、
  `desc-tools/batches/research/c136-{a,b}.json`、`hooks/c136-hooks-{a,b}.json`、`input/c136-writer-{1,2}.json`、
  `output/c136-out-{1,2}.json`、`batch-progress/enum/blue-note.json`＋`blue-note.md`（1,812 張全目錄列舉）、
  **`batch-progress/enum/billboard-bn-1955-57-ocr.txt`（同期紙本 OCR 2.1 MB，後續批次共用）**。
- **驗證結果**：`qa-batch out c136` 43 張與卡單相符、全部通過；`chk-hook-crossgroup` 全過
  （hook 加權 25.5–41.5、note 304–350）；`fix-spacing` 待補 0；`chk-prop` 標記 0。desc 187–238，**43 張全 full**。
  **封面 43/43、試聽 43/43**（探測 23 ＋ 研究層第三種查法 20）——**這條線的命中率遠高於日本爵士線**。
- **⚠ 年份改 11 張，全部以同期紙本定案**（第 471／484／489a 條）。共同形狀是**資料庫把錄音年當發行年**。
  研究層掃了 1955-10～1957-09 共 105 期的 OCR，**全文命中頁留在 repo 給後續批次 grep**（第 489 條）。
  **這是這條線最重要的方法建立**：Blue Note 1950 年代的年份，同期紙本的評論日／廣告日是唯一硬證據。
- **⚠ 裁定 313（全域第 313 條）：這條線的邊界**——他廠（Capitol／Roulette／EMI／Riverside／Odeon）自家藝人的原盤、
  Blue Note 只在 1985 後再發時掛名的，一律退。**判準是「Blue Note 的關聯始於哪一年」：1985 前有 BN 目錄號的收。**
  Pacific Jazz／Transition／Jazz:West／Vogue／World Pacific／United Artists 那種 1960–80 年代以 BN 號再發的照收。
  c-137～c-141 依此退了 14 張（含 Sinatra、Peggy Lee、Ella Fitzgerald、Nancy Wilson、George Shearing）。
- **⚠ 裁定 312：資料庫標 Compilation 的正典被列舉檔濾掉了**（Miles Davis《Volume 1》BLP 1501、
  Navarro《Vol. 2》BLP 1532 這種 10 吋重組成 12 吋的碟）——**六批跑完要另開 §5.6 子批撈回。**
- **⚠ 裁定 314：探測鏈的串接閘門要用行首錨定**——`grep -q "CHAIN DONE"` 讀到的是「鏈腳本自己的內容」，
  害 c-138 的鏈提早啟動、與還在跑的 c-135 鏈同時寫 `previews.json`（在到試聽步驟前攔下，檔案無損）。
  **用來判斷「做完了」的訊號，本身必須不可能被「還沒做」的過程產生。**
- **⚠ 裁定 315：判斷策展代理跑完沒，要看 `prop 筆數 ＋ rulings 退表筆數`**——c-141 a 被額度砍掉時 prop 有 20 筆、
  slice 有 23 筆，但那 3 筆是退件。**「少了三筆」與「退了三筆」在 prop 檔上長得一模一樣。**
- **⚠ Manhattan Towers 不是演唱會場地**（第 485／489 條）：六張在那裡錄的碟、資料庫把兩張標成 Live 是錯的。
  **卡單 `releaseType` 照資料庫不動，正文六張全部寫成錄音室作品。**
- **研究層擋下策展層 9 處**（Thad Jones Vol.3 陣容沒有 Burrell、Burrell 1543 是四個來源含現場一軌、
  Chambers' Music 原盤是四重奏、Kenny Drew 原盤 9 軌、Jimmy Smith Vol.1 封底文案歸 Babs Gonzales、
  《Patterns in Jazz》封面設計歸 Reid Miles……）＋無出處「第一／唯一」4 句。
- **缺的：無。** ⚠ 但《Talkin' & Walkin'》的試聽採公版廠再發版（發行資訊以 Jazz:West 原盤為準）、
  4 張封面來源是再發圖不是原盤。
- **下一批**：c-135 研究已交、c-137～c-141 在產線上；Blue Note 還有 1,249 張沒動。
