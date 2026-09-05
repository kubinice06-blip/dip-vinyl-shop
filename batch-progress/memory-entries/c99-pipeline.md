## 2026-09-05 — dip-vinyl-shop — c-99 走完雲端段（非洲、加勒比、中東、南亞與拉丁，45 張）

- **改動摘要**：店主「接力做完十批」的一批，`lineType: 廣度`。
  **45 張、26 位掛名**（a 非洲與加勒比 22／b 中東、南亞與拉丁 23），年份 1960–2017。
  Umm Kulthum 5，R.D. Burman 4，A.R. Rahman 3，Franco & le TPOK Jazz／Tabu Ley Rochereau／
  Orchestra Baobab／King Tubby／U-Roy／Big Youth／Shankar／Fania All-Stars／
  Juan Luis Guerra y 440／Juan Gabriel 各 2。
  **零 §1 人工身分、零跨批撞卡、45/45 釘住 release-group。**
- **主要檔案**：`batch-progress/c99/`（prop-{a,b}、caa.json、chk-prop.mjs、**rulings.md 10 條**、HANDOFF.md）、
  `desc-tools/batches/research/c99-{a,b}.json`、`hooks/c99-hooks-{a,b}.json`、
  `input/c99-writer-{1,2}.json`、`output/c99-out-{1,2}.json`、
  `batch-progress/probe/previews.json`（**11 筆人工改寫**）。
- **驗證結果**：`qa-batch research/hooks/out c99` 全過、`chk-hook-crossgroup c99` 45 張
  （hook 加權 18–36、note 261–350）、`fix-spacing` 兩檔待補 0。
  主線一次性複驗：**45 張 `desc` 開頭與 `hook` 逐字相符**、out-1 215–235、out-2 206–238、
  **未具名出處 0 盞、六條硬禁令 0 命中**。
  **封面 43/45、試聽 44/45（us 38／gb 3／za 2／fr 1）——試聽是十批裡最高的。**
- **這批的裁定與教訓**：
  1. **試聽 35/45 → 44/45，九張誤記 unavailable 全部救回**，落空原因清一色是盤名變形：
     Franco 那張**三處變形同時發生**（拿掉「6 Juin」＋破折號改冒號＋Volume→Vol.）、
     《Ali and Toumani》是 **c-98 Pete Seeger 那筆的鏡像**（`&` 對 `and`，方向相反）、
     Mighty Diamonds **只差一個字母**（Judg**e**ment）、Dr Alimantado 1987 年 CD 化**整張改名**、
     Umm Kulthum 三張是羅馬轉寫不同、**Slumdog 的 Apple artistName 是「Various Artists」，藝人閘必擋**。
  2. **Yabby You《Beware Dub》是 c-98 第 1 條的第二個實例**：原本配到
     **「Yabby You aka Jesus Dread」**這個同名次要實體的 ℗2026 拼盤（原盤十軌缺〈Freedom〉、
     第一軌來自別張碟）。**`artistOk` 的雙向子字串比對擋不住「本名＋後綴」的另一個實體**
     ——前次是 Hank Williams vs Hank Williams III。**這個病兩批連續出現，往後要當常態防。**
  3. **《Taal》是裁定 157 的形狀**：Apple 那筆十二軌曲名時長全對，**曲序卻是英文字母序**，
     首軌是 2:51 的片頭器樂。**固定試聽已人工改指原盤開場〈Ishq Bina〉。** 印度原聲帶要預期這種排序。
  4. **Max Romeo《Reconstruction》年份改 1978 → 1977**（裁定 127 直接適用）：
     Discogs 17 個版本裡 14 筆直記 1977，維基與 Apple ℗1977 亦然；MB 那筆 1978 無佐證，
     牙買加 Dynamic 的 1978 是晚一年的壓片。**對照 U-Roy《Rasta Ambassador》**：MB RG 記 1991-07-26，
     那是資料庫缺 1977 黑膠 release 的結果——**「MB 只有晚年的 release」不等於「有兩說」。**
  5. **策展層的時序／序數主張被攻破第八次：34 處，其中 14 處與來源相反。**
     最嚴重的兩處：**Amal Hayaty「與同年的《Enta Omri》」**（差一年）、
     **1942: A Love Story「過世前完成的最後一部」**（維基寫他**在音樂完成前就過世**，
     〈Kuch na Kaho〉女聲版由 Lata Mangeshkar 身後重錄）。
  6. **Latin-Soul-Rock 的錄音地點，Apple 與原盤相反**：Apple 八軌全標聖胡安，
     1974 年 Fania 原壓說明欄印的是**洋基球場 1973-08-24** ＋紐約 Good Vibrations，
     **只有〈Soul Makossa〉在聖胡安**。**上架資料與原盤說明欄衝突時以原盤為準。**
  7. **這批也是第 172 條的發源地**（記在 `c53/rulings.md`）：兩支併行寫作代理
     在共用的 scratchpad 用了同樣的通用檔名（`build.mjs`／`descs.json`），
     **writer-1 的腳本被 writer-2 覆寫、有一輪修訂被吃掉**。往後派工單一律要求
     暫存檔名加「批號＋組別」前綴。與第 169／170／171 條同族：**被覆寫的腳本不會報錯。**
