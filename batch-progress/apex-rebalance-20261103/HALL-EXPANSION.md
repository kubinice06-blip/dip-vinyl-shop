# 殿堂擴充到 303（2026-11-03 店主定案）

**店主**：
- 「殿堂變太少了 再策一次 增加到300 有歷史意義的 策給我看」
- 審稿意見：
  - 「Miles Davis允許重複（第一張電氣）」
  - 「爵士Alice Coltrane不要 然後可以多找一點有歷史意義的」
  - 「華語太少了 張惠妹姐妹或bad boy 鄧麗君 張雨生 還有什麼歷史意義嗎？」
  - 「Slum village vol 1應該要入殿堂的」
  - 「Jazzmatazz也應該要入殿堂」
- 最後定案：「Flaming Lips、Primal Scream、Alice in Chains 留」「林強換成 娛樂世界」

## 內容

- `hall-expansion.json`：
  - `add` 共 133 張，from null → hall，全都是池中現有的卡。
  - `alternates` 是備選，這次不套用。
- 殿堂 170 → **303**。
- 一藝人一張的原則不變，**只有 Miles Davis 例外**：《Kind of Blue》＋《In a Silent Way》（第一張電氣專輯）。
- 華語從 12 張增加到 31 張。
- 爵士多 14 張；嘻哈多 Slum Village《Fan-Tas-Tic, Vol. 1》、Guru《Jazzmatazz, Vol. 1》。

## 同批處理：池中重複卡合併（店主：「3 好」）

1. The Beatles：`The Beatles|The Beatles`（1968）與 `The Beatles|The Beatles (White Album)`（2000）。
   - 留 1968 那筆。
   - 2000 那筆的 card_catalog、簡介 KV、試聽對照等，若有內容比較完整的欄位，先併到保留那筆，再移除。
2. Guru：`Guru|Jazzmatazz, Vol. 1` 與 `Guru|Jazzmatazz Volume 1`（皆 1993）。
   - 留 `Jazzmatazz, Vol. 1`，它會升殿堂。
   - 另一筆照上面同樣方式處理。
