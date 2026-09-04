## 2026-09-04 — dip-vinyl-shop — c-81 策展提案（深掘：美國 1980s 地下廠牌的 B 面）

- **改動摘要**：新增 `batch-progress/c81/prop-a.json`（22 張）與 `batch-progress/c81/prop-b.json`（22 張），
  合計 **44 張、44 位藝人**，`lineType: 深掘`，年份 1980–1991。
  這批的核心概念是「B 面」——不挖無名廠牌，挖**知名地下廠牌目錄裡沒人談的那些盤**；
  刻意避開 Hüsker Dü／Minutemen／Black Flag／Meat Puppets／Sonic Youth／Dinosaur Jr／Big Black／
  Butthole Surfers／Replacements／Dead Kennedys／Camper Van Beethoven 的代表作（這些在池中共 40 張，全是正典側）。
  - **a 組＝硬蕊／post-hardcore／noise rock 廠牌線**：SST 6、Dischord 與其姊妹廠 5、
    Touch and Go 5（含原盤在 Bone Air 的 Killdozer）、Amphetamine Reptile 2、
    Alternative Tentacles 2、Austin／Phoenix 的 Moment 與 Placebo 各 1。
  - **b 組＝美國地下的另翼線**：paisley underground 與 cowpunk（Slash 2、Frontier 4、
    Enigma／Restless 3、SST 的 Opal 1）＋ college rock 小廠（DB Recs 3、Twin/Tone 3、
    Coyote 1、Shimmy Disc 2、Ralph 1、Homestead 2）。
- **主要檔案**：`batch-progress/c81/prop-a.json`、`batch-progress/c81/prop-b.json`、
  `batch-progress/c81/chk-prop.mjs`（既有，批次名已為 c81）、
  `batch-progress/memory-entries/c81-curation.md`（本檔）。
- **驗證結果**：
  - `node batch-progress/c81/chk-prop.mjs` → 44 張、44 位、**標記 0**。
  - `node batch-progress/dedup-crossbatch.mjs` → **33 批（其中 3 批讀 prop）、1,617 張、跨批撞卡 0**；
    c81 以 prop 來源被納入。
  - 44 張全部釘住 release-group MBID 並逐個回問 `release-group/<id>?inc=artist-credits+releases`
    確認 **primary-type=Album**、secondary-types 空、標題與 artist-credit（第 41 條）；探測錯誤 0。
  - **以盤名為主鍵掃全池**（第 71 條，掃描器加 `length>=4` 守衛，c-79 教訓）：
    子字串命中 27 筆、**完全相等 2 筆**（Gray Matter《Food for Thought》↔ The J.B.'s 同名盤 1972、
    Rank and File《Sundown》↔ Gordon Lightfoot 同名盤 1974），逐筆人眼核對**皆為不同的碟，零撞卡**。
  - **掛名去 The 後完全相等 3 筆**：Killdozer（池中 1 張）、Babes in Toyland（1 張）、
    The Feelies（1 張），三者本批各加 1 張，合計 2 張，皆在同一藝人上限 3 張內。
  - **封面實測**：CAA release-group front **37/44（84%）**、無圖 7、探測錯誤 0。
  - **試聽實測**：Apple search 藝人＋盤名比對 **28/44（64%）**，a 組 14/22、b 組 14/22，
    **28 個命中全部在 `us` storefront，`gb`／`de`／`ca`／`au` 零命中**（第 75 條：
    美國地下廠牌的數位發行權在美國，與 c-63 美國藍調命中在 `gb` 的情形正好相反）。
- **本批自下的裁定**（依 2026-09-02 店主下放，判準：有先例／可逆／卡住整條線）：
  1. **Guadalcanal Diary《Walking in the Shadow of the Big Man》年份取 1984**，不採 MB 的 1985
     （MB 只建了 Elektra 再發，DB Recs 的四筆美國原壓皆直記 1984）——依第 86／95 條。
  2. **Death of Samantha《Strungout on Jargon》年份取 1985**，不採 MB 的 1986-03-01
     （Discogs master 與兩筆 Homestead 原壓皆記 1985）——同上。
  3. **廠牌欄一律採原盤廠牌，不採後來收編的廠牌**：Scream《This Side Up》記 Sixth International
     （非 Dischord 15½）、Gray Matter《Food for Thought》記 R&B Records（非 Dischord 48）、
     Killdozer《Intellectuals…》記 Bone Air（非 Touch and Go）、The Feelies《The Good Earth》
     記 Coyote（非 Twin/Tone）——依第 85 條。
  4. **The Dicks 採帶定冠詞的寫法**（MB 實體與 credit 皆為 `Dicks`，Discogs／AT 目錄／封面為 `The Dicks`）
     ——依第 25 條（掛名要讓外部服務查得到）。**Discogs 以「The Dicks」查 master 回 0 筆、
     改用「Dicks」才命中**，是第 139 條的實例。
  5. **Rain Parade 採無定冠詞的樂團現行寫法**（本張 release-group 的 artist-credit 是 `The Rain Parade`）
     ——依第 52 條；`The Rain Parade` 寫進 `risk` 供下游比對。
  6. **The Three O'Clock 採 ASCII 撇號**（MB 實體用 U+2019 彎引號）——c-79 三補的 Unicode 同形異碼形狀，
     `chk-prop` 的 key 函式剝掉非字母數字故去重不受影響，受影響的是逐字元比對的下游。
  7. **Naked Prey 盤名採 MB 的《Under The Blue Marlin》**（大寫 The），與 rgMbid 一致；
     大小寫在外部服務會被正規化（第 50／52 條）。
  8. **Shudder to Think 盤名採《Ten Spot》**（MB 與 Dischord 目錄），不採 Discogs master 的《Ten-Spot》。
- **未做**（依 `REMOTE_RUNBOOK.md`，雲端不碰）：三軸與 rarity（應照 §0.8 錨點制、`manual:depth-rubric`）、
  頂點資格評估、封面實際落檔、簡介、固定試聽寫入、Firestore／KV／`seed_cards.json` 寫入。
