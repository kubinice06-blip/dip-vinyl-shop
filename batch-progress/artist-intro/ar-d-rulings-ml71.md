# ar-d-527（ml71，10 位）／ar-d-528（ml72，5 位）主線審稿（2026-11-06，cloud-main）

- 切批：`batch-progress/mood-cells-20261022/cut-artist-intros-ml71.mjs`，只收研究汰換後留下的卡的藝人；Monde UFO、Elaquent、't Geruis、Deadbeat、Lindsheaven Virtual Plaza、Funki Porcini、Krusseldorf、woob 已有介紹不重切。名冊 `roster-ml71-ar-d-527.json`、`roster-ml72-ar-d-528.json`。
- 補洞：ar-d-527 g1（10）、ar-d-528 g1（5）；qa-artist gap 皆 0 處。同名混卡排除：AES DANA 與法國凱爾特黑金屬團同名、Lauge 維基為丹麥人名消歧頁、ASURA 維基為印度神話、Edamame 維基為食物、Josh Lake／Josh Loughrey／Loscil《Clara》——皆未收。所在地裁定：desert sand feels warm at night 為英格蘭人，美國波特蘭是重發廠牌 Hushtones。
- 寫作：ar-d-527 寫 7 位（full 4：Delerium、AES DANA、desert sand feels warm at night、Atomic Skunk；thin 3：ASURA、Shwamp、Science Of Sleeping），不寫 3 位（Telenights：無國籍無身世；Yaima、Lauge & Baba Gnohm：國籍只有單一來源，過不了 thin 首句交代國籍的門檻）；ar-d-528 寫 2 位（Solar Fields full、CIRCULAR thin），不寫 3 位（Edamame、Josh Leake：出身單源；Hinkstep：只有 MB 流派標記，湊不到門檻）。比照 ar-d-521 先例（查無國籍或單一來源不寫），不放寬。
- **審稿改 ar-d-527 3 處**：
  1. Delerium：「Kristy Thirsk 後來被稱為『Delerium 的聲音』」→「那一年唱的是 Kristy Thirsk」（被動轉述的評價，只有維基一源；與專輯卡 ml71 審稿 24031 同步刪）。
  2. desert sand feels warm at night：刪「這兩種手法被認為推進了 slushwave 這個子類型」（只有維基一源的評價）。
  3. Atomic Skunk：「被評為保留了旋律的莊重」→「收了一首〈China Doll〉的翻唱」（單篇樂評評價句）。
- ar-d-528 逐位審過，未改字。ASURA 首句用 Vincent Villuis 兩源的法國國籍領句（Charles Farewell 法國籍只有單源），照留。
- 驗證：`qa-artist.mjs out` 兩批只剩刻意不寫的缺位。
