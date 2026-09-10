## 2026-09-04 — dip-vinyl-shop — c-88 走完雲端段（電影原聲帶，45 張）

- **改動摘要**：**這批是店主當天的指示直接催生的**——「冷門電影專輯有點太多了，
  反而耳熟能詳的不多……確保熱門電影專輯都要有，影展電影的專輯也要有，
  比如敕使河原宏的砂之女、塔可夫斯基的索拉利星這種經典老電影」。
  廣度線 **45 張、33 位藝人**（a：主流熱門 22 張、1969–2016；b：影展與作者電影 23 張、1963–2021）。
  b 組收了塔可夫斯基、早坂文雄《七人の侍／羅生門》、武満徹、高達、奇士勞斯基、Greenaway、
  貝托魯奇、塔爾、王家衛、張藝謀與陳凱歌、尤杜洛夫斯基、安東尼奧尼、林區、法斯賓達、
  溫德斯、Liška、de Roubaix。零 §1 人工身分、零跨批撞卡、45/45 釘住 release-group、
  **合輯 10 張全部走 §5.6 例外並寫了 `exceptionReason`**。
- **主要檔案**：`batch-progress/c88/`（prop-{a,b}、caa、previews、fix-rgmbid.log、HANDOFF.md）、
  `desc-tools/batches/research/c88-{a,b}.json`、`hooks/c88-hooks-{a,b}.json`、
  `input/c88-writer-{1,2}.json`、`output/c88-out-{1,2}.json`、
  `batch-progress/fix-rgmbid.mjs`（修 bug）、`desc-tools/batches/probe/probe-previews.mjs`（新增 `OST` 店面序）、
  `batch-progress/label-lines.mjs`（註冊 c88）、`batch-progress/ost-coverage-audit.mjs`（新建）、
  `batch-progress/c53/rulings.md`（第 158 條在本批立、第 151／153 條加附錄）。
- **驗證結果**：`qa-batch hooks c88` 全部通過；`chk-hook-crossgroup c88` 45 張全過
  （hook 加權 21–40.5、note 212–350）；`qa-batch out c88` out-1 22 張 216–235、
  out-2 23 張 201–239、合計 45 張相符、`>260` 為 0；`qa-check-research` 兩檔各 0 標記；
  `fix-spacing` 待補 0。**封面 44/45、試聽 29/45。**
  `out` 僅有的兩盞「未具名出處」燈都是第 143 條的純字串誤報（Woodstock 的葛萊美名人堂、
  Reservoir Dogs 的《滾石》史上百大原聲），出處與主辦者都具名，依第 128 條保留。
- **這批的裁定與教訓**：
  1. **立第 158 條：「拆到只剩 ASCII」對跨書寫系統的碟是反的。**
     29 張 ready 裡**有 9 張是探測層原本判 `unavailable`、研究層回查後推翻的**，
     其中五張的成因是**用錯的語言去搜錯的店面**：塔可夫斯基那張在 `ru` 上叫
     《Солярис. Зеркало. Сталкер》、《花樣年華》在 `tw` 上**盤名是拼音而掛名是中文「群星」
     ——同一筆裡兩套書寫系統混用**（拆 ASCII 丟掉掛名那一半、用中文搜丟掉盤名那一半）、
     《霸王別姬》同形且掛名被記成兩位歌手、《Le Samouraï》在 `fr` 且
     「(Bande originale du film…)」被**串進每一個曲名**。
     **storefront 序只決定「試哪些店面」，不決定「用什麼字串去試」。**
     另四張是第 152 條的盤名形狀問題（Score vs Soundtrack、長副標、多了「Music From the」、德文副標）。
     命中店面分佈：us 23／tw 2／ru 1／gb 1／de 1／fr 1。
  2. **`fix-rgmbid` 的 bug 是這批抓到的（第 153 條附錄）**：策展層在 `mbNote` 明寫「刻意不釘」，
     **腳本仍因為計分高一分而換掉**——那一分來自把 primary-type 的鏡射欄拿去比
     secondary-types 裡的 Compilation。腳本已改成排除標「不釘」的候選。
     **同一個形狀當天在試聽端又出現一次**：探測層把《Rocky Horror》配到了
     **《Karaoke Version》——正是那個「刻意不釘」的對照組**。
     **卡拉 OK 版的曲目表與原盤一模一樣，少的是人聲**——只比曲名與軌數會直接放行。
  3. **另一張探測層配錯碟**：L'Avventura 配到 33 軌、曲名體系完全不同、℗ 1960 的另一版；
     本卡釘的 release-group 底下只有那一筆 2016 年 16 軌黑膠 → 改判不採用。
  4. **一處主線裁定：Dances With Wolves 採用、標 `expandedReissue`。**
     Apple 是 2004 年 24 軌擴充版、原盤 18 軌。依第 140 條「**差別不在軌數多少，
     在多出來的那些是誰的**」——多出來的六軌是同一份配樂的其他樂段，**是擴充版不是二合一**。
     但 **Apple 的曲序與原盤不同、有兩軌被併成一個長串曲名**，曲名與曲序一律以原盤為準。
  5. **兩張同族於第 157 條**：Nyman 那張曲長對得起來但曲序不同（**取試聽要按曲名不按軌號**）；
     Jurassic Park 同一 RG 三個版本軌數不同（US CD 16／US LP 15／CA CD 14），
     **行文寫軌數必須指明是哪一版**。
  6. **寫作層又攔到研究稿兩處**：Querelle 的 note 寫 B3 的作詞欄與演唱欄都是 Jeanne Moreau，
     但 facts 的逐軌人聲欄明寫 **B3 的 Vocals 是 Günther Kaufmann**；
     Raise the Red Lantern 的 facts 句首寫「五軌用斜線串場景」卻列出**六軌**。兩處都已回頭修。
  7. **`ost-coverage-audit.mjs` 有它要偵測的那個毛病（第 151 條）**：
     它拿英文片名去掃 `seed_cards.json`，而卡池存的是原文盤名
     （《C'era una volta il West》《Per un pugno di dollari》），**會同時產生偽陽性與偽陰性**。
     我曾據此向店主回報過一個灌水約三分之一的缺口，隔天更正。腳本開頭已加警語。
  8. **12/45 的 `previews.json` 帶限定語，是本線比例最高的一批**——上架前必須逐張讀。
- **下一步**：本機端上傳（三軸、頂點資格、四處寫入與回讀、1 張封面掃圖、
  跑 `build-genre-tree.mjs --write`、清掉十二支暫存腳本，清單在 HANDOFF 第十節）。
  **這批是廣度線且有 10 張合輯，頂點資格要逐張看、不要整批照抄。**
