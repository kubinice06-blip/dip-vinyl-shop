## 2026-09-06 — dip-vinyl-shop — c-112 走完雲端段（2026 新譜至 9 月，42 張）

- **改動摘要**：店主 2026-09-06「接著跑完 16 批」的一批，`lineType: 廣度`。
  **42 張、42 位掛名（無一位重複）**（a 英美 23／b 日韓與華語 19），年份全部 2026。
  **零 §1 人工身分、零跨批撞卡、42/42 釘住 release-group、§5.6 合輯 0 張。**
  依店主 09-06「2010 之後的中文圈只收獨立音樂」拿掉周杰倫《太陽之子》與
  Asiaboy 禁藥王《猛虎下山》；另依**裁定 201** 移除 GEZAN《I KNOW HOW NOW》。
- **主要檔案**：`batch-progress/c112/`（prop-{a,b}、caa.json、chk-prop.mjs、HANDOFF.md、
  apple-candidates.md）、`desc-tools/batches/research/c112-{a,b}.json`、
  `hooks/c112-hooks-{a,b}.json`、`input/c112-writer-{1,2}.json`、`output/c112-out-{1,2}.json`、
  `batch-progress/probe/previews.json`（**11 筆人工改指**）。
- **驗證結果**：`qa-batch research/hooks/out c112` 全過、`chk-hook-crossgroup c112` 42 張
  （hook 加權 24–38.5、note 243–350）、`fix-spacing` 兩檔各跑一次。
  out-1 23 張 214–240、out-2 19 張 206–239。
  主線一次性複驗：**42 張 `desc` 開頭與 `hook` 逐字相符**、
  **資料庫名出現 0 次**、榜單獎項評分 0 次。
  **封面 42/42、試聽 42/42（us 33／jp 8／tw 1）——兩項都是滿的。**
- **這批的裁定與教訓**：
  1. **裁定 201：移除 GEZAN《I KNOW HOW NOW》**。樂團 2026-07-30 公告主唱性加害事案、
     活動休止；碟 2026-02-11 早於事件。依「可逆、不卡線、寧可少收一張」裁決移除。
     **這是卡池第一次遇到藝人的加害事案，是商譽判斷不是策展技術判斷**，
     已列為要單獨向店主提報的項目。往後同形狀照此處理。
  2. **撤下版（Withdrawn）是新譜批的重災區**：策展層 `risk` 引用的「另一種軌數切法」
     有三處出自 Withdrawn 的 release（Kacey Musgraves、Charli xcx、Baby Keem）。
     **`status` 欄要逐筆讀，Withdrawn 的數字不得當背書。**
  3. **淨化版不是嘻哈盤特有的病**：Olivia Rodrigo（流行盤）原本指到 cleaned 版，
     而三張嘻哈卡逐張查過全是 explicit 原版。**第 166 條的適用範圍要放寬到全曲風。**
  4. **同一張碟的兩個母帶只有逐軌長度能分**：Charli xcx 的黑膠與數位都是 11 軌、
     曲名曲序全同，只有末軌 3:06 對 5:42（黑膠拿掉一段，總長 30:05→27:21）。
     **第 174 條的另一種形狀——不是重錄，是同一次錄音的兩種剪法。**
  5. **7 張 unavailable 全部是假的**（裁定 185），全數回撈；試聽因此從 36/43 到 42/42。
  6. **裁定 200 首次在 hook 層就守住**：42 筆的 hook 與 note 裡資料庫名出現 0 次，
     寫作層不必再擦。c-105 是寫作層補救的，這批是上游就對了。
