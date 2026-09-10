## 2026-09-04 — dip-vinyl-shop — c-79 走完雲端段（日本 SSW 與 folk 私家版／小廠二線 1971–80，42 張）

- **改動摘要**：深掘線 **42 張、38 位藝人**（a：URC／Bellwood 主幹與同期自主制作 22 張、
  1972–75；b：後期 URC、Harvest／Elec／Trio 二線與真・私家版 20 張、1976–80）。
  廠牌 URC 18、Bellwood 6、Aard-Vark 4、Harvest 4、自主制作 2，其餘八家各 1。
  **零 §1 人工身分、零 §4 封面例外、零跨批撞卡、42/42 釘住 release-group MBID。**
- **主要檔案**：`batch-progress/c79/`（prop-{a,b}、caa.json／log、previews.json／log、
  fix-rgmbid.log、HANDOFF.md）、`desc-tools/batches/research/c79-{a,b}.json`、
  `hooks/c79-hooks-{a,b}.json`、`output/c79-out-{1,2}.json`、
  `batch-progress/c53/rulings.md`（第 139 條）、`audits/pool-artist-name-splits.md`（c-79 兩節）。
- **驗證結果**：`qa-batch research c79` 兩組 key 與卡單完全一致；`qa-batch hooks c79` 0 標記；
  `chk-hook-crossgroup c79` 全部通過；`qa-batch out c79` out-1 22 張 212–235、
  out-2 20 張 220–235、合計 42 張與卡單相符、`>260` 為 0；`qa-check-research` 兩檔各 0 標記；
  `fix-spacing` 待補 0。`fix-rgmbid` **修正 0**。**封面 20/42（本線目前最低）、試聽 27/42，命中全部在 `jp`。**
- **這批的裁定與教訓**：
  1. **立第 139 條：團名的空格是「查無」的第五種假形狀。**
     Apple jp 在姓與名之間多一個半形空格（「中川 イサト」「南 正人」），池中與 MB 都無空格；
     用卡片掛名查 Apple 零命中，**而它不會回錯誤碼，只會回一個乾淨的空結果**。
     連同 503／403／25 筆分頁上限／MB 回了個不相干的東西（第 122 條），「查無」現在有五種假形狀。
  2. **掛名分裂有兩筆是 MB 自己的兩層不一致**（已寫進 `audits/pool-artist-name-splits.md`）：
     **トメ北川《青春から》** 的 release-group artist-credit 是「トメ北川」、
     MB 藝人實體卻是「**麻上冬目**」——**藝名 ↔ 本名，兩個字面毫無交集**，
     用卡片掛名去 browse 藝人必定落空。なぎらけんいち／なぎら健壱 是平假名 ↔ 漢字的同形問題。
     **方法教訓：日本線還要逐張比對 MB 的 `artist-credit` 與藝人實體名。**
  3. **Unicode 同形異碼**：**ザ・ディランII** 卡片與 MB 用 ASCII 兩個大寫 `I`、
     Apple jp 用羅馬數字單字元 `Ⅱ`（U+2161）。**任何 `toLowerCase` ＋ 去符號的正規化都判不出兩者相同。**
     另有四張日文盤名在 Apple 上整串換成羅馬拼音（第 76 條的形狀，`queryAlias` 已填）。
  4. **上游被下游改掉三筆，都改在上游檔案裡**：西岡たかし 的樂器件數**整個拿掉**（不是改小，
     facts 撐不住那個數字）；南正人《Lady Let Me Go》廠牌 Showboat → **Blow Up (3)**（prop 與卡單兩處）；
     友川かずき《肉声》「曲名一半以上用秋田腔」→ 回 facts 數過只有四／十三，改成只寫開場那首。
  5. **寫作層另攔下三筆同形的區間歸納與憑印象數字**（第 135 條）：中島光一「一半寫社會題目」、
     三上寛「單簧管加弦樂**四人**」、スカイドッグ 1st「十首裡有三首的作者欄」。
     **第 135 條在這批的命中率高得反常——區間歸納是研究層最穩定的失效模式。**
  6. **第 138 條第一次被下游主動援用**：スカイドッグ 2nd 的 `researchNotes` 把
     「盤名是札幌的一個地址」判給本卡，**但 facts 沒有一條說它是地址**；
     寫作層依第 130 條（分派也要過 facts）＋第 138 條（分派是許可不是義務）**讓這條線閒置**。
     **分派不是義務，這件事下游真的照做了。**
  7. **三張真・私家版都沒有把「私家版」當骨架**，`Private press.` 只當 Discogs 說明欄的引文；
     壓量、稀有度、拍賣、零再發慨嘆一律零出現（第 109 條）。第 136 條的缺席句四張各用不同寫法。
  8. **工具誤報要換寫法、不是刪事實**：柴田容子那張把ヤマハ寫成 Discogs 欄位原文的
     拉丁 `Yamaha Music Foundation`，繞開 `qa-batch` 簡體字表把日文「会」誤報；
     五条坂那張把「(有)サン音芸」寫成「サン音芸」，避免 `fix-spacing` 在 `)` 與片假名之間補空格改壞專名。
- **下一步**：本機端上傳（三軸、頂點資格、四處寫入與回讀、**22 張封面掃圖**）。
