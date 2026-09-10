# c-108 交接（2026-09-06）：拉丁第二圈，45 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

`EXPANSION-PLAN-c89plus.md` B 線，`lineType: 廣度`。
**chicha／cumbia／salsa dura／nueva canción**——這四塊在池中此前**全零**。

**45 張、22 位掛名、零 §1 人工身分、零跨批撞卡、45/45 釘住 release-group MBID。年份 1954–2011。**

| 組 | 場景 | 張數 |
|---|---|---:|
| a | 秘魯 chicha 與亞馬遜 cumbia | 21 |
| b | salsa dura、古巴、nueva canción、智利搖滾 | 24 |

**曲風**：world 34、rock 4、pop 3、soul 2、folk 2。**§5.6 合輯 0 張**（見第三節）。
多張的掛名：Los Destellos 3、Los Mirlos 3、Los Wembler's de Iquitos 3、Los Ángeles Negros 3、
Various Artists 3、Irakere 3，另 11 位各 2 張。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **39/45（87%）** | `c108/caa.json`；缺的六張見第五節 |
| 2. 三軸與 rarity | **雲端未做**——照 §0.8 錨點制（第 89 條） | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **45 張全部寫完並過機器 QA** | `desc-tools/batches/output/c108-out-{1,2}.json` |
| 5. 固定試聽 | **41/45（91%）**，命中 `pe 35｜cl 3｜us 2｜gb 1` | `batch-progress/probe/previews.json` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

**真的查無 4 張**（Apple 兩個端點、pe／cl／us／es／it 五個店面都覆核過）：
Irakere《Irakere》1978、《Irakere II》、Inti-Illimani《Palimpsesto》《Imaginación》——
固定試聽走無來源狀態，簡介也照 `partial` 寫（153–179 字）。

**簡介的機器 QA**：`qa-batch.mjs out c108` 全過（out-1 21 張 192–240、out-2 24 張 153–240、>260 零筆）；
`fix-spacing` 兩檔待補 0；`qa-batch research/hooks c108` 與 `chk-hook-crossgroup c108` 皆 0 標記
（hook 加權 21–45.5、note 244–348）。
主線一次性複驗：**45 張 `desc` 開頭與 `hook` 逐字相符**；
兩支寫作層各自掃過資料庫名、榜單評分、序數首創語，**三類都是 0 次**。

## 三、releaseType：**標錯 0 處**，但五張帶 `[Compilation]`

45 張逐張回問 `primary-type`／`secondary-types`：**全部 `primary-type=Album`**，
其中 **5 張帶 `[Compilation]`**（Mambo Loco、Cumbias Chichadélicas、Cartagena!、
Palenque Palenque、¡Demolición!）、**1 張帶 `[Live]`**（Irakere 1978）。
卡單全寫 `Album`，與第 167／184／190 條相符。**這是第五批得到同一結果。**

## 四、探測層的四處配對錯誤（本批最重要的一條）

| 卡 | 探測層配到 | 正解 |
|---|---|---|
| **Eddie Palmieri《Sentido》** | 6 軌 **2025 重製版**，曲序重排、三軌長度差 27 秒–2 分 8 秒 | pe `1630262310`（5 軌，逐軌與原盤相符 ≤1 秒） |
| **Chabuca Granda《Dialogando...》** | 17 軌 **℗1995 版**，掛名還多一個 Fetiche | pe `1686055998`（10 軌，℗1967 Odeon del Perú 與原盤同廠） |
| Los Ángeles Negros《Y volveré》 | 1970 數位版曲序，**原盤 A／B 面整段對調**（同名曲第 1↔第 7 軌） | 可用，但**行文禁提曲序** |
| Los Ángeles Negros《Esta noche la paso contigo》 | 同型，〈Puerto Vacío〉第 10→第 6 軌 | 同上 |

**另 3 張假 unavailable 回撈成功**：Cartagena! cl `1611876689`（盤名的 `and`→`&`）、
Quilapayún《Basta》pe `1596949918`（後綴「(Remasterizado 2021)」擋掉比對）、
Los Jaivas《El volantín》pe `1607176282`（**十店面 search 全 0，只有藝人目錄撈得到**）。

## 五、缺封面的六張（本機要補）

Los Mirlos《El sonido selvático》《Tirense con la escoba》、
Los Wembler's de Iquitos《Fiesta en la selva》、
Los Ángeles Negros《Esta noche la paso contigo》《Aplaude mi final》、
Joe Bataan《Gypsy Woman》。
**六張都有試聽**，所以 Apple 上有條目——`apple-verified-collection` 取得封面是可行的，
**但那要看 `ALBUM_ONBOARDING.md` §4 的那個未決問題**（MBID 已釘的卡能不能用 Apple 封面）。

## 六、策展層被推翻的 23 處

**實質糾正 11 處**：Sandunguera 店面寫 cl 實為 pe；Songo「Apple 十店面搜不到」實為 gb 有；
Cartagena!「Apple 查無」已不成立；La danza del petrolero 的 18 軌版是**換掉 2 首＋多 7 首**、不是多 6 首；
La cultura de la basura 的 10 軌哥倫比亞盤多一首 14 軌版沒有的〈We are sudamerican rockers〉；
Canción del sur 的線上版用的是原盤曲序而非 1994 重排版；
另 5 處是 `why` 的**無來源主張**（Los Destellos「少數有英美再發」與「Enrique Delgado／利馬」、
Destellantes「外流到巴西」、El gran cacique「頭一批」、Los Mirlos「亞馬遜 cumbia 的創造者」）。

**另 12 處序數／終結語預防警告**（首張／最後一張／告別作／第 N 張／最早的龐克）全部擋下。

## 七、店面組已依實測重排（第 183 條）

十店面實測命中是 **pe 30／cl 5／us 3**，`co mx ar gb es fr br` 七店零首次命中。
**哥倫比亞的 cumbia 反而落在 cl 與 us**——考古整輯的廠牌（Barbès、Analog Africa、
Soundway、Vampisoul、Munster）都是歐美廠牌。店面組現為 `pe cl us co mx ar es gb fr br`。
