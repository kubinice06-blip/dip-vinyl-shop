## 2026-09-16 — dip-vinyl-shop — c-139 走完雲端段（Blue Note／UA 1962–64，36 張）

- **改動摘要**：Blue Note 目錄補齊線第五批，**BLP 4100 系列**（硬咆勃轉 soul jazz／管風琴爵士那幾年）
  ＋United Artists Jazz 併進來的一段。原 slice 45 張、**收 36 退 9**。
  **36 張、26 位掛名、零 §1、全部純 Album。封面 33/36、試聽 36/36。**
- **主要檔案**：`batch-progress/c139/`（prop-{a,b}、chk-prop.mjs、caa.json、slice.json、rulings.md、HANDOFF.md）、
  `desc-tools/batches/research/c139-{a,b}.json`、`hooks/c139-hooks-{a,b}.json`、`input/c139-writer-{1,2}.json`、
  `output/c139-out-{1,2}.json`、**`batch-progress/enum/billboard-bn-1962-63-ocr.txt`＋`cashbox-bn-1962-66-ocr.txt`**。
- **驗證結果**：`qa-batch out c139` 36 張與卡單相符；hooks 兩支 QA 全過（加權 19–37、note 294–350）；
  `fix-spacing` 待補 0。desc 36/36 全 full（217–240）。
  ⚠ 剩一個誤報：《Rockin' the Boat》的「Cash Box 的百大專輯榜第 99 名」——具名出處就在數字前，人工複核放行。
- **⚠ 年份改 7 張**（第 550／553 條）。**這批最重要的方法學：Discogs 原壓群會整群繼承同一個錯誤的回填年**
  ——《Soul Stream》的 1963 是錄音年回填；**整個 UAJ 14000 段的 Discogs 年份兩個方向都錯**
  （14001《Coltrane Time》明明 1962-07 首發卻標 1963），**多半抄封套 ℗© 年，而 ℗© 是版權年不是上市年**。
  **第 531 條（同目錄號原壓群全標同一年）不是萬能的，同期紙本永遠壓過它。**
- **⚠ 一張靠「紙本零命中」反證**：《Blue John》91 期 Cash Box 對「Blue John／4143」零命中 → 當年未上市，改 1986。
  但 c-140 立刻補了限制（第 573 條）：**零命中只能推翻「某年已上市」，不能單獨建立另一個年份**
  ——差別在同段別的號碼有沒有命中、有沒有另一個年份的正面證據。
- **⚠ 研究層擋下資料庫錯誤五處**（《Black Orchid》MB 目錄號與年份兩欄都錯、《Out of This World》應 1966、
  《Portrait of Sheila》應 1963、《My Hour of Need》原盤 10 軌、三張 MB 只收立體聲沒收 mono）。
  **第 509c 條（紙本自己誤植目錄號）本批中三次。**
- **⚠ 第 556 條（新程序關卡，後批已沿用）**：**鉤子層每筆 note 都帶「發行年寫 XXXX 年」並逐筆與卡單比對**
  ——把第 475 條那種「裁定改了、卡單沒改」的漏接擋在鉤子層。c-140 跑出 30/30 相符。
- **缺的**：封面 3 張（替代來源已查好）。⚠《Ladylove》試聽是 16 軌合訂盤（取第 2 軌，第 1 軌是報幕）、
  Blakey Vol. 2 取自 2002 兩張一套的合併盤。
- **池中既有卡待修（雲端不能改）**：`Jimmy Smith — Back at the Chicken Shack` 年份 1960 應為 1963。
- **下一批**：c-135～c-139 共 198 張已走完雲端段；c-140 寫作層、c-141 鉤子層、c-142 策展層在跑。
  **Cash Box 已覆蓋 1960-11→1969 年底無缺口，1970 年起還沒有人掃。**
