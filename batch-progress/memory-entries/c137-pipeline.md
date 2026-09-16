## 2026-09-16 — dip-vinyl-shop — c-137 走完雲端段（Blue Note 1957–59，39 張）

- **改動摘要**：Blue Note 目錄補齊線第三批，**1500 系列末段接 4000 系列開端**。
  原 slice 45 張、**收 39 退 6**（Gil Evans 列舉用再發盤名池中已有；George Shearing 兩張、June Christy、Peggy Lee
  依第 313 條邊界退——Capitol 自家藝人原盤只在 1985 後掛 Blue Note 名；Three Sounds Vol. 2 是 1985 東芝EMI outtakes 盤）。
  **39 張、28 位掛名、零 §1、全部純 Album、live 0 張。**
- **主要檔案**：`batch-progress/c137/`（prop-{a,b}、chk-prop.mjs、caa.json、slice.json、rulings.md、HANDOFF.md、apple-candidates.md）、
  `desc-tools/batches/research/c137-{a,b}.json`、`hooks/c137-hooks-{a,b}.json`、`input/c137-writer-{1,2}.json`、
  `output/c137-out-{1,2}.json`、`batch-progress/enum/jazzdisco-bn-1500.txt`＋`jazzdisco-bn-4000.txt`（廠牌目錄頁，後批共用）。
- **驗證結果**：`qa-batch out c137` 39 張與卡單相符、全部通過；`qa-batch hooks`＋`chk-hook-crossgroup` 全過
  （hook 加權 26.5–41、note 297–350）；`fix-spacing` 待補 0；research 全 full。desc 210–240。
  **封面 38/39**（缺 Jimmy Smith at the Organ Vol. 2）、**試聽 39/39**（探測 20 ＋ 第三種查法 19）。
- **⚠ 年份改 15 張，本線目前比例最高的一批**（第 492／501／509b 條）。除了既有的「錄音年當發行年」，抓到兩個新形狀：
  **(1) 帶月日的 first-release-date 也可能是錄音日**（Paul Chambers 1957-05-19）——比無月日更會誤導，因為看起來像有出處；
  **(2) 目錄號順序與上市順序脫節**（BLP 1583 錄 1957-12 出 1960-12、BLP 4053 錄 1958-12 出 1961）。
  另三張是**日本首發的庫存盤**（《Two Bones》《Minor Move》1980 King GXF），錄音與首發差二十年以上。
- **⚠ 盤名改一張：《Light Foot》→《Light-Foot》**（第 509e 條）。盤面／Discogs／Apple／維基／MB 自己的數位 release
  五邊都有連字號，只有 MB 的 RG title 沒有——**舉證階序下盤面勝**。
  **為什麼在雲端就改**：上架後盤名進 `seed_cards.json`，雲端沒權限改，**盤名必須在上架前定**。
- **⚠ 研究層擋下／修正策展層七處**（第 509f 條）：店面軌數描述錯兩張、《Love for Sale》us 回空但 gb／jp 有官方條目、
  《Jazz Alive!》Phil Woods 必須寫進正文、《Bottoms Up!》是三場錄音不是一場、《Davis Cup》是八張改判裡唯一沒紙本的一張、
  《Here Comes Louis Smith》錄音年兩說故正文避開。另推翻維基／Billboard 四則敘述。
- **⚠ 第 509g／533 條：Billboard 1961 年的 PDF 幾乎沒有文字層**（52 期只有兩期可全文搜），
  1961 之後改用 **Cash Box**（每期都有廠牌新片列表，週六日期）；**1962 年起 Billboard 也改週六**。
  **`batch-progress/enum/SOURCES-billboard-cashbox.md` 記了六份掃描檔的實際涵蓋範圍**——
  **檔名會騙人**（`billboard-bn-1959-61` 實際沒有 1961，c-138 b 為此白跑一輪）。
- **⚠ 第 475 條（程序教訓）**：c-135 的第 466 條裁定表列五列、實際只改四筆，鉤子層對卡單時才抓到漏改的 BLP 5018。
  **裁定表列 N 列改動，commit 前要逐列回查卡單值**——commit 訊息裡的數字不能當驗收依據。
- **缺的**：封面 1 張（Jimmy Smith at the Organ Vol. 2）。⚠《Love for Sale》的試聽走 gb 店面不是 us。
- **下一批**：c-135 寫作層在跑、c-138 鉤子層在跑、c-139 研究 a 在跑；c-140／c-141 待派。
