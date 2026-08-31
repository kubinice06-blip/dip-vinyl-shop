# c-50 策展期間查出的線上池缺陷（2026-08-30）

策展代理在比對「這張是不是已經在池裡」時順帶查出的。**均為線上資料
（`seed_cards.json`／`apex_pool.json`），依 REMOTE_RUNBOOK 雲端未修改**，
列給本機處理。每一項都由主線親自查過池子核實，不是採信代理回報。

## 一、普卡與王牌重複：Weezer

```
seed  ["Weezer","Weezer",3,1,1,["rock","pop"],1994]
hall  ["Weezer","Weezer (Blue Album)",["rock","pop"],1994]
```

**同一張碟（1994 藍專）收成兩張**，一張普卡一張王牌。規則明定已在王牌池的
不得再以普卡上架，組裝器的 `already-apex` 檢查因為比對字串鍵而擋不下來——
與 `audits/pool-artist-name-splits.md` 已記的 The Velvet Underground 首作、
Lauryn Hill《The Miseducation》完全同型。

建議：刪 seed 那張，王牌保留。

## 二、王牌池內重複：Throbbing Gristle

```
heresy  ["Throbbing Gristle","D.o.A: The Third and Final Report",["electronic","pop"],1978]
heresy  ["Throbbing Gristle","D.o.A. The Third and Final Report",["electronic"],1978]
```

**同一張碟在 heresy 收了兩次**，標題只差冒號與句點，曲風欄還不一致
（一筆多掛了 `pop`）。這是本次唯一在王牌池內部的重複。

建議：擇一保留。MB 正規標題是 `D.o.A: The Third and Final Report`（冒號）。

## 三、掛名分裂：Smashing Pumpkins

```
Smashing Pumpkins      — Gish / Adore              [seed]
Smashing Pumpkins      — Siamese Dream             [hall]
Smashing Pumpkins      — Mellon Collie…            [hall]
The Smashing Pumpkins  — MACHINA/the machines of God / Monuments to an Elegy / Oceania  [seed]
```

同一個樂團的 7 張卡分散在兩個藝人字串。**影響不只是顯示**：本批的目標名單
是按「每位藝人的卡數」算的，分裂會讓同一位藝人被低估成兩個淺收藏藝人。
c 組原本要提《MACHINA》，發現它已在 `The Smashing Pumpkins` 名下才撤掉。

建議：統一為其中一種寫法（MB 正規名是 `The Smashing Pumpkins`）。

## 四、標題錯字：The Police

```
hall  ["The Police","Regatta de Blanc",[…],1979]
```

正確拼法是 **`Reggatta de Blanc`**（雙 g），這是樂團自創的仿法文拼寫。
池裡只有這一張，不是重複卡，是**單純拼錯**。

（策展代理原本回報「兩種拼法各有一張、是重複卡」，主線查池後確認只有一張，
已更正。這類回報一律要親自核對池子，不能直接採信。）

## 五、不算缺陷：Frank Zappa 與 The Mothers of Invention 並存

```
Frank Zappa             — Hot Rats / Apostrophe (') / Over-Nite Sensation / One Size Fits All / Lumpy Gravy
The Mothers of Invention — Freak Out! / We're Only in It for the Money
```

《Freak Out!》與《We're Only in It for the Money》的原盤掛名確實是
The Mothers of Invention，**不是分裂而是不同的掛名**，維持現狀正確。
記在這裡是因為它形態上很像上面第三項，避免日後被誤合併。
