# c-149 交接（2026-09-18）：Blue Note 1984–90，37 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

**1985 年重啟後第二段（1987–90）的新錄音**，另含三張 1984–86 的漏網。
切片 45 張，**收 37 退 8**（a 組收 22 退 1、b 組收 15 退 7）。

⚠ **這一段與前十三批最大的差別：不是黑膠時代。**
CD 是主要載體，黑膠常是附屬甚至沒有——**本批有 2 張是 CD-only 首發**
（McCoy Tyner《Things Ain't What They Used to Be》、日野皓正《Bluestruck》美版），
**另有 1 張（Don Grolnick《Weaver of Dreams》）1990 年上市只出 CD 與卡帶**。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 項目 | 狀態 |
|---|---|
| 身分（rgMbid 釘住） | **37/37，全部 pinned，零 §1 人工** |
| 三軸與頂點資格 | 卡單已帶，本機組 manifest 時照跑 |
| 固定簡介（desc） | **37/37 全 full**，out-1 223–240／out-2 230–239 |
| 封面 | **28/37**（缺 9，**替代來源 9 張全部查實可用**） |
| 固定試聽／無來源狀態 | **32/37 有來源**（探測 28 ＋ 研究層以 search 撈回 5），**5 張走固定無來源狀態** |
| §5.5／§5.6 例外欄位 | 本批無合輯，例外欄全空 |
| published gate | 本機端 |

## 三、⚠ 這批最重要的事：黑膠與 CD 是兩個不同的碟

**第 609／972 條在本批大量命中**。以下各張**卡上寫的是黑膠原盤**，加軌只在 CD 上：

| 碟 | 黑膠／CD |
|---|---|
| Song Everlasting | 5／6 |
| Ever Since the World Ended | 10／12 |
| Romance and Revolution | 4／5（〈Tenderly〉只在 CD） |
| Bordertown | 8／9（〈It's Only A Paper Moon〉只在 CD） |
| Foreign Affairs | 9／11 |
| Revelations | 10／＋3 |
| New Beginnings | 6／7（〈Silence = Death〉只在 CD） |
| Neohippus | 6／8 |
| Mindscape | 8／10 |
| Eternal Spirit | 6／9 |
| Color | 10／11（CD 多〈Change-Up〉） |
| Music | 8／10 |
| Native Heart | 6／7（黑膠缺〈Liberty〉） |
| Cornucopia | 8／＋（標題曲黑膠是 13:00 短版、缺〈Fundance〉） |
| Things Ain't What They Used to Be | 13 軌中 7–9 是加軌，**且無黑膠** |
| So Far So Close | **軌數相同但黑膠與 CD 曲序完全不同** |

## 四、撞陳列四件（全部逐軌比到 CD／串流層，四件都並存、risk 互指）

1. **《The Eternal Triangle》〈The Moontrane〉↔ 池中 Woody Shaw《The Moontrane》**
   ——不同錄音（1974-12 Muse vs **1987-06-11 Van Gelder**），三項全異。
2. **《…at Storyville》〈Now's the Time〉↔ 池中 Charlie Parker《Now's the Time》**
   ——1953-09-22 波士頓 WHDH 實況 vs 1952–53 Verve 錄音室。
3. **《Three Blind Mice, Volume 2》〈Ping Pong〉↔ 池中 seed《Ugetsu》第 4 軌**
   ——不同場、早一年、長四分鐘。
4. **Tyner 的〈Search for Peace〉〈Blues on the Corner〉＝ 池中 seed《The Real McCoy》(1967) 第 4／5 軌的重錄**
   ——Billboard 1990-06-30 評介原文即寫 "are re-created here"。**正文寫成「重錄」，不是新曲。**

另：《Bluestruck》與池中《Alone, Alone and Alone》只有同名曲一首重疊，其餘七軌零重疊。

## 五、⚠ 研究層擋下策展層四處正文錯

| 卡 | 策展層寫的 | 實際 |
|---|---|---|
| Neohippus | 七重奏、Rick Margitza 次中音 | **六重奏**，Margitza 只列在 CD 那筆 |
| So Far So Close | 製作人 Don Alias／Deodato | **製作人是 Eliane Elias 自己** |
| Peeping Tom | 製作人 Gary Burton | **無 Producer credit**（Burton 製作的是前一張《Step by Step》） |
| Music | Joe Lovano 參與 | **兩個 Discogs 條目都查無，未經證實** |

**通則：策展層的編制與製作人欄是待證的宣稱，研究層一律要回到盤面 credits 再核一次。**

## 六、本機端待辦

1. **上傳 37 張。**
2. **封面缺 9 張**，替代來源已逐張寫在研究層 `notes`（多為 Discogs 原壓的 `images[0].uri`）：
   Romance and Revolution 4537785／Bordertown 3839671／No Question About It 3865287／
   The Nearness of You 3909394（次選日本黑膠 3466401）／Weaver of Dreams 5139884／
   Color 5358745／Peeping Tom 4777145／Bluestruck 8438791（美版；日版 10649524 封面可能不同，**不可混用**）／
   **Swing & Sweet 7614677 僅 1 圖 225px，是九張裡最弱的一張**（另記 Apple 1755674209 的 artwork 較大）。
3. **試聽無來源 5 張**（The Nearness of You／Weaver of Dreams／Triangular／Peeping Tom／Bluestruck）
   ——都跑滿第 254 條三種查法、明寫查無，走固定無來源狀態。
4. **池中既有卡待修**：`Bill Evans — The Paris Concert, Edition One` 年份 **1982 應為 1983**
   （Cash Box 1983-02-05 p8 評介＋兩刊 1983 全年榜位）。
5. ⚠ **留給後續覆核兩筆**：維基把 Tyner《Revelations》記成 1987（本批改判 1989，證據是 Billboard 爵士榜
   二十週、最高第 3 名、1989 年終榜第 14 名）；池中 seed 日野《Alone, Alone and Alone》寫 1967，
   MB RG 98c8b312 的 frd 是 1970、掛名是 Terumasa Hino Quartet。
