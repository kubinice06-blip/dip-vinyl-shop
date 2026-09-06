## 2026-09-06 — dip-vinyl-shop — c-118 走完雲端段（美國地下 house／techno 二線小廠，42 張）

- **改動摘要**：店主 2026-09-06「接著跑完 16 批」的最後一批，**`lineType: 深掘`**
  （本輪十六批唯一的深掘批）。**42 張、42 位掛名（無一重複）**
  （a 芝加哥 house 二線小廠 12 吋 19／b 底特律與紐澤西 techno／house 23），年份 1988–1999。
  **零 §1、零跨批撞卡、42/42 釘住 release-group MBID。**
  §5.5 electronic 白名單 7 張，研究層逐張覆核**全數成立**。
- **主要檔案**：`batch-progress/c118/`（prop-{a,b}、chk-prop.mjs、caa.json、rulings.md、
  HANDOFF.md、apple-candidates.md）、`desc-tools/batches/research/c118-{a,b}.json`、
  `hooks/c118-hooks-{a,b}.json`、`input/c118-writer-{1,2}.json`、
  `output/c118-out-{1,2}.json`、`batch-progress/probe/previews.json`（**補 8 筆**）。
- **驗證結果**：`qa-batch research/hooks/out c118` 全過、`chk-hook-crossgroup c118` 42 張
  （hook 加權 19–33、note 266–350）、`fix-spacing --write` 兩檔待補 0。
  out-1 19 張 154–233、out-2 23 張 187–236，>260 零筆，**42 張全部落在所屬字數帶**
  （full 40 張 187–236、partial 2 張 154／162）。
  主線一次性複驗：**42 張 `desc` 開頭與 `hook` 逐字相符**、**四位中文數字年 0 筆**、
  資料庫名與榜單評分兩類皆 0 次、**禁寫項逐條掃描 0 次**
  （Trax／Fourth Floor／Ray Barney／Duane Buford／Sub-Urban；Armando 與 Virgo Four
  兩處命中經覆核是有來源的正確寫法）。
  **封面 42/42；試聽 15 → 23（us 21｜gb 1｜jp 1）**，剩下 19 張是這條線真的不在串流上。
- **研究層擋下策展層 27 張卡、31 處**（本輪單批最高）：
  Boo Williams 不是「名下第一張」（排第 3）、Tyree 的〈Turn Up the Bass〉就是本張第 5 軌、
  Virgo Four 與 Todd Terry 的 release 沒有一筆掛 Trax／Fourth Floor、
  Sterling Void 本名是 Duane Pelt 不是 Duane Buford、
  Dance Mania 創辦人是 Jesse Saunders 不是 Ray Barney、
  N.Y. House'n Authority 的 2018 重發是 Nu Groove NG025D 不是 Rush Hour、
  Eddie Fowlkes 本張排第 5 不是第一張。
  **另 9 張的人名與廠牌來歷查不到來源，已標為不得寫——簡介裡一個人名都沒有**，
  唯一寫得出成員名的是 Mood II Swing。
- **這批的裁定與教訓**（`c53/rulings.md` 第 222–226、247–251 條）：
  1. **第 247 條**：策展層的 collectionId 配錯又多兩種形狀——**2010 年新混音集**
     （Photon Inc.）與 **2024 年單軌新混音**（Adonis），**兩種都盤名與掛名全對、
     三店都命中，只有逐軌比對分得出來**。
  2. **第 248 條**：**撤下要雙向**——策展層判成「後世整編、不是本張」的 collectionId
     可能就是本張（Eddie Fowlkes 的八軌與原盤逐軌長度一秒不差）。
  3. **第 249 條**：§5.5 的 `exceptionReason` 引數字要寫「**純** Album」，
     只寫 Album 會與第 167／190 條那條線的門檻混淆。
  4. **第 250 條**：第 224 條加強——**score 差距小也不能當判準**
     （Jellybean 正解 91／錯的 100、The Martian 正解 100／錯的 96 同時出現）；
     三個實體**連 disambiguation 都沒填**時，正確處置是標「不得寫」。
  5. **第 251 條**：**42 張裡 12 張的黑膠／CD／數位軌數都不同**
     （Blaze 五個版本 9／10／8／10／8 無一相同）。**行文引軌數前必須先選版本**，
     最容易犯的錯是拿串流那一版的軌數配上卡單那一版的廠牌編號。
  6. **裁定 242 在這批被推翻一半**：我派工時說「這批要防上限」（拉丁曲名吃字元），
     **a 組實際是 4 張初稿低於下限、0 張超上限**；b 組也是 2 張不足、0 張超標。
     **決定字數偏差方向的是「事實格數」，不是字元寬度。**
