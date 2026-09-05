# c-83 交接（2026-09-04）：英國 1990 年代微廠二線，45 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

深掘線（`lineType: 深掘`）。**45 張、45 位藝人（一人一張）、零 §1 人工身分、
零跨批撞卡、45/45 釘住 release-group MBID、合輯 0、EP 0。**

| 組 | 場景 | 張數 | 年份 |
|---|---|---:|---|
| a | 吉他／post-rock 側 | 21 | 1991–1999 |
| b | 電子／實驗側 | 24 | 1991–1999 |

**廠牌**：Ankst、Ochre、Earworm、Enraptured、Wurlitzer Jukebox、Worm Interface、Lo Recordings、
Ash International、Shinkansen／Sarah、Guided Missile、Pickled Egg、ché、Lissy's、Rocket Girl、Domino 等
——**這十一家在本批之前池中零張**（池中英國 1990s 只有正典側 37 張）。

`fix-rgmbid` **修正 0**（依第 28 條附錄跑兩輪取聯集）。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **33/45（73%）**，12 張要掃圖 | `c83/caa.json`、`caa.log` |
| 2. 三軸與 rarity | **雲端未做**——照 §0.8 錨點制（第 89 條） | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **45 張全部寫完並過機器 QA** | `desc-tools/batches/output/c83-out-{1,2}.json` |
| 5. 固定試聽 | **29/45（64%）**，命中 28 個在 `gb`、1 個在 `de` | `c83/previews.json`、`previews.log` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

## 三、試聽回補一張：**第 152 條附錄就是從這批立的**

**Tånk《Upwards at 66°N》** 探測層判 `unavailable`，其實 Apple 上就有。
**成因是掛名與盤名各壞一層，而且兩層都是 Unicode 同形異碼**：

| | 卡片 | Apple |
|---|---|---|
| 掛名 | **Tånk** | **Tank**（圓圈符整個沒了，全字串零個非 ASCII 字元） |
| 盤名 | **Upwards at 66°N**（U+00B0 度符、無空格） | **Upwards at 66º N**（**U+00BA 陽性序數指示符**、有空格） |

`°` 與 `º` 在多數字型下幾乎一模一樣，**但它們是兩個不同的字元**——
任何字串比對、任何 `toLowerCase`、任何去符號正規化都判不相等。
主線用 collectionId 1889741951 直查覆核：**8 軌、曲名與曲序逐項相同**，八軌都有預覽。
**但第 4／6 軌的曲長對調**（原盤 Drangar 8:20／Landslag 6:14，Apple 作 6:14／8:21）
——**那兩軌的曲長禁止入文**。℗ 2026 與 releaseDate 2026-04-24 都不是發行年。

## 四、三張 `ready` 的探測結果要加限定語

| 卡 | 探測層 | 實際 |
|---|---|---|
| Prolapse《backsaturday》 | ready、11 軌 | collectionId 1512462101 是 **2019 再發**（℗ 2019，第 8–11 軌是 Flex (Edit)／Unroadkill 與兩首 Session）。**原盤 7 軌**——**試聽可用、軌數與年份不可用** |
| Ectogram《I Can't Believe It's Not Reggae!》 | ready、14 軌 | Apple 標題多了「**(Live)**」，但**十四軌與曲序與 1996 Ankst 原盤逐軌相同、℗ 1996**——**那是店面雜訊，不是現場專輯** |
| Scanner《Mass Observation》 | ready、5 軌 | **原盤 4 軌且四軌無題**；Apple 第 5 軌是 2018 現場、℗ 2018 |
| Longstone《Surrounded by Glass》 | ready、12 軌 | **原盤 10 軌**；Apple 11–12 是同碟曲目的現場版、℗ 2011 |
| Freeform《Elastic Speakers》 | ready、15 軌 | **不是加曲版**——Apple 第 15 軌〈Clonk〉是**原盤第 14 個位置裡的隱藏段落被切出來單獨計軌**（Discogs 註記：「Track 14 ends at 5:28 and a hidden track begins at 6:00」）。**寫軌數要說「曲目表列十四個位置」** |

## 五、身分三處更正——**策展層把廠牌的國籍當成了藝人的國籍**

策展層把全批放在「英國 1990s 微廠二線」的框架下，但**英國的是廠牌**：
- **Tånk 是法國團**（MB country FR，Discogs 註記錄音於 **Brest**）
- **Ma Chérie for Painting 是德國團**（DE，**Stuttgart**）
- **Hazard 是瑞典人**（SE，錄混音於**斯德哥爾摩**）

三張的 `notes` 都明令不得寫成英國藝人，寫作層也逐張照辦。

## 六、下游層層攔下的東西

**hook 層（兩組合計退回八則自算錯的候選，全是第 154 條那一類）**
「十七首歌，十一首不到兩分鐘」實數 **9 首**；「四首超過七分鐘」實數 **3 首**；
「八首不到三分鐘」實數 **9 首**；「兩軌不到一分半」實數 **3 軌**；「五軌不到一分半」實數 **4 軌**；
「同一年，三家廠牌，三種形制」1996 那年只有**兩種**形制；
「每一軌的人聲都換人」實際 **Caroline Potter 一人就佔 4 軌**；
「資料庫一個曲長也沒登錄」——**MB 那筆 CD release 有完整曲長**。
另因規則命中而棄用五則（解釋曲名字根、兩處序數框架、「封面會隨體溫變色」的體溫無來源、替場地補身分）。

**寫作層**
- a 組：Jack 的「四首超過七分鐘」實為 3 首；自己初稿的「兩首在兩分半以下」實數 3；
  Tatay 的 `sound` 提到 facts 沒有的樂器與人事；把兩個欄位併成推論（「Bethesda 的 Stiwdio Les」）；
  「人聲欄一男一女」**facts 只有兩個名字、沒有性別來源**；客座列舉像窮舉卻漏了一人。
- b 組：六處計數句全部回 facts 逐項數過（Land of Nod 的錄音室分佈、Rothko 的軌號、
  Piano Magic 的人聲分佈、Freed Unit 的曲長區間、Avrocar 的 credit 條數）。

**兩處毫秒換算溢位**：Ghost 第一軌與 Piano Magic 第 8 軌若照 Apple 的毫秒換算會得到
**不合法的「6:60」與「4:60」**，兩處都沒有引用。（c-85 也出現同一形狀。）

**兩處依第 138 條讓分到的線閒置**：a 組 Night Club 的 Franz Ferdinand
（字數容不下規定的完整寫法，硬塞會寫成不合規的版本）；
b 組 Piano Magic 的 Rocket Girl 廠牌史（那張已被逐軌工程師／人聲 credit 與 US／UK 國別兩說占滿）。
**分派是許可不是義務。**

## 七、機器 QA 結果

```
node desc-tools/qa-batch.mjs research c83          a 21／b 24，key 與卡單完全一致 ✓，零標記
node desc-tools/qa-batch.mjs hooks c83             全部通過 ✓
node desc-tools/chk-hook-crossgroup.mjs c83        2 組｜45 張｜hook 加權 18–40｜note 267–349｜✓ 全部通過
node desc-tools/qa-batch.mjs out c83               out-1｜21 張｜字數 217–238
                                                   out-2｜24 張｜字數 217–236
                                                   合計 45 張，與卡單相符 ✓，>260: 0
qa-check-research（兩檔各一次）                      各 0 標記
fix-spacing（兩檔各一次）                             待補 0
```

**「未具名出處」四層都是零，且不是靠刪內容關的**（第 143 條）：
本批唯一的署名樂評是 Exclaim! 的 Ian Danzig 那篇（Piano Magic），**原樣寫進 desc**。
MB 掛的兩條 NME 樂評連結**都回 404**，內容無法核對，已註明不採用。

## 八、本機還要做的事

1. **掃 12 張封面**（`c83/caa.log` 的「無圖」列）。
2. **三軸與 rarity**、**頂點資格判定**——照 §0.8 錨點制。
3. **四處寫入與回讀**（`seed_cards.json`／`apex_pool.json`／KV／Firestore），雲端不碰。
4. **上架前逐張讀 `previews.json` 的 `note`**——第三、四節那六張都有限定語。
5. **`node scripts/build-genre-tree.mjs --write`**（第 147 條）——**要排在 seed 上架之後**，
   否則本批的卡還不在 `seed_cards.json` 裡、算不進曲風樹。**這一步雲端做不到**（重建快取要碰 KV）。
6. **清掉本批的暫存腳本**：`desc-tools/` 下的 `ap-c83a.mjs`、`aplk-c83a.mjs`、`dg-c83a.mjs`、
   `dga-c83a.mjs`、`dgl-c83a.mjs`、`dgls-c83a.mjs`、`dgs-c83a.mjs`、`dgsall-c83a.mjs`、
   `dig-c83a.mjs`、`mbart-c83a.mjs`、`fetch-c83a.mjs`、`mb-c83a.mjs`、`len-c83-w1.mjs`、
   `c83-w1-tail.json`；repo 根目錄的 `apple-c83b.mjs`、`applelk-c83b.mjs`、`art-c83b.mjs`、
   `dg-c83b.mjs`、`dg2-c83b.mjs`、`lab-c83b.mjs`、`misc-c83b.mjs`、`summ-c83b.mjs`、`mb-c83b.mjs`、
   `fetch-c83b.mjs`。
