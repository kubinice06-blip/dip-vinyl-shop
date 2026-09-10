## 2026-09-06 — dip-vinyl-shop — c-105 走完雲端段（K-pop 韓版里程碑＋K-indie，45 張）

- **改動摘要**：店主 2026-09-06「接著跑完 16 批」的一批，`lineType: 廣度`。
  **45 張、26 位掛名**（a K-pop 里程碑 25／b K-indie 第二輪 20），年份 1996–2023。
  **零 §1 人工身分、零跨批撞卡、45/45 釘住 release-group、§5.6 合輯 0 張。**
- **主要檔案**：`batch-progress/c105/`（prop-{a,b}、caa.json、chk-prop.mjs、HANDOFF.md、
  apple-candidates.md）、`desc-tools/batches/research/c105-{a,b}.json`、
  `hooks/c105-hooks-{a,b}.json`、`input/c105-writer-{1,2}.json`、`output/c105-out-{1,2}.json`、
  `batch-progress/probe/previews.json`（**25 筆人工改指**）。
- **驗證結果**：`qa-batch research/hooks/out c105` 全過、`chk-hook-crossgroup c105` 45 張
  （hook 加權 13–29、note 283–350）、`fix-spacing` 兩檔待補 0。
  out-1 25 張 191–240、out-2 20 張 169–240（thin 2 張 169／174）。
  主線一次性複驗：45 張裡 44 張 `desc` 開頭與 `hook` 逐字相符、行文中資料庫名出現 0 次。
  **封面 43/45、試聽 43/45（us 31／jp 12）——試聽從探測層的 18/45 救回來的。**
- **這批的裁定與教訓**：
  1. **試聽 18/45 → 43/45，25 張假 unavailable 全部救回。** 成因是第 185 條：
     `probe-previews` 只走 Apple 的 `search`，諺文盤名整組查不到。
     真的查無只有 2 張（No Brain《청년폭도맹진가》、브로콜리 너마저《보편적인 노래》）。
  2. **第 194 條的發源**：`recover-unavailable.mjs` 的藝人閘會擋掉羅馬字掛名的東亞團——
     `장기하와 얼굴들`→Kiha & The Faces、`언니네 이발관`→Sister's Barbershop、
     `9와 숫자들`→9 and the Numbers、`브로콜리 너마저`→Broccoli you too。
     諺文與羅馬字零字元重疊，子字串比對必然回 false，4 張被列成「目錄裡找不到」。
     **回撈清單的「找不到」不是結論。**
  3. **第 200 條的發源**：hook 有一筆寫成「MB 上同一天的兩筆」，寫作層改成「同一天建檔的兩筆」。
     **行文不得出現資料庫名稱**——出處留在 `facts` 的 `src` 欄。
  4. **策展層的時序／序數主張被攻破第十次：25 處。**
     最嚴重的是 NELL《Let It Rain》的「第三張正規盤」——韓文與英文維基兩票對 MB 機械數的一票，
     2001 年那兩張被稱為 indie。**MB 的 Album 排序不能當序數依據**，尤其韓國線那排序還含日版。
  5. **廠牌欄硬錯 3 處**，其中 Parannoul《After the Magic》卡單記「自主發行」，
     **英文維基明寫這是他第一張不是自主發行的專輯**（Topshelf Records TSR262）。
     **策展層的 `label` 欄要當成待查證欄位，不是既成事實。**
  6. **韓版與日版盤名可以完全相同**（Girls' Generation 在 jp 有三筆同名，其中一筆是日版出道盤）。
     c-43 的教訓在這批第二次應驗。
