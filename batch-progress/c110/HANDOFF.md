# c-110 交接（2026-09-06）：德語搖滾／NDW／義大利搖滾流行，44 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

`EXPANSION-PLAN-c89plus.md` C 線，`lineType: 廣度`。**德語七位藝人抽測全零。**

**44 張、34 位掛名、零 §1 人工身分、零跨批撞卡、44/44 釘住 release-group MBID。年份 1971–2021。**

| 組 | 場景 | 張數 |
|---|---|---:|
| a | 德語圈（NDW、德語搖滾、Neue Deutsche Härte） | 22 |
| b | 義大利搖滾流行 | 22 |

**曲風**：rock 29、pop 7、folk 4、electronic 3、jazz 1。**§5.6 合輯 0 張。**

**池中義大利線此前是「地下 prog 17 ＋ cantautore／流行 15」兩塊，中間的搖滾主線整段空白**——
本批 b 組 22 張補的就是這塊。與 c-61／c-55／c-56 逐筆比對**零重疊**。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **44/44（100%）** | `c110/caa.json` |
| 2. 三軸與 rarity | **雲端未做**——照 §0.8 錨點制（第 89 條） | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **44 張全部寫完並過機器 QA** | `desc-tools/batches/output/c110-out-{1,2}.json` |
| 5. 固定試聽 | **44/44（100%）**，命中 `de 43｜it 1` | `batch-progress/probe/previews.json` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

**封面與試聽都是滿的**——十六批裡第四批。

**簡介的機器 QA**：`qa-batch.mjs out c110` 全過（out-1 22 張 193–238、out-2 22 張 197–239、>260 零筆）；
`fix-spacing` 兩檔待補 0；`qa-batch research/hooks c110` 與 `chk-hook-crossgroup c110` 皆 0 標記
（hook 加權 18–32.5、note 259–350）。
主線一次性複驗：**44 張 `desc` 開頭與 `hook` 逐字相符**；
兩支寫作層各自掃過資料庫名、榜單評分、彎撇 `’`（另加掃 U+2013／U+2014），**三類都是 0 次**。

## 三、**⚠ 八張的試聽指到加曲版，不是原盤那一版**（本批最重要的一條）

| 卡 | 線上軌數 | 原盤軌數 |
|---|---:|---:|
| Die Ärzte《Debil》 | 18 | **13** |
| Die Toten Hosen《Ein kleines bisschen Horrorschau》 | 22 | **12** |
| Die Toten Hosen《Opel-Gang》 | — | **15** |
| Trio《Trio》 | 31 | **14** |
| Udo Lindenberg《Alles klar auf der Andrea Doria》 | 12 | **10** |
| Palais Schaumburg | — | **10** |
| Afterhours | — | **19** |
| Diaframma | — | **8** |

**店面上沒有原盤那一版。** 試聽可用，但**簡介一律只引原盤軌數與曲序**——已逐張守住。

## 四、策展層與上游被推翻的 15 處

**回撈清單本身錯 2 處**：Die Toten Hosen《Ein kleines bisschen Horrorschau》清單寫「目錄裡找不到」
——**找得到**（盤名用 ß）；Spliff 清單建議改用《Emergency Exit》——**原盤那筆《85555》也在架上**。

**研究層新發現 5 處（硬錯級）**
1. **Grauzone 的代表作〈Eisbär〉不在這張唯一的專輯上**——與 **Trio 的〈Da Da Da〉同形**，策展層未提。
2. Ligabue 2025《Naked + Tales》是**純 Album 型**，比策展層說的「超字串盤」更危險。
3. **Rammstein 的 release 實掃 29 筆**（策展層寫 25）。
4. Nina Hagen Band 常見的「1978 年二月」是誤傳。
5. **Trio 的 Apple 藝人 id 直搜會拿到 2026 年的同名新人。**

**序數 4 處不可斷言**（Grönemeyer《Mensch》、Afterhours、Battiato 兩張）。
**日期兩說 4 處**：**Nena《?》線上的 1984-09-21 是日本版日期、實為 01-27**；
Battiato《Patriots》07 對 10 月；Marlene Kuntz《Catartica》03-27 對 05-13；
Vasco Rossi《Bollicine》店面 02-01 對原盤 04-14。**簡介一律只寫年份。**

## 五、正字（策展層已定，本機不要改回去）

- **Falco 的盤名是 `Junge Roemer`，不是 `Junge Römer`**——10 筆 release 有 9 筆原盤印的就是 oe，
  這是**封面寫法不是查詢轉寫**（第 6／50 條）。
- **撇號一律 ASCII**（池中 800 張帶撇號的有 774 張是 ASCII，且原盤 release 本身就是 ASCII）。
- **`CCCP - Fedeli alla linea` 的掛名在 MB 上中間是 U+2013**，卡片是 ASCII 半形連接號。
  （這一筆促成了 `chk-prop` 加掃 `artist` 欄的非 ASCII 連字號，第 186 條。）

## 六、店面組已依實測重排

Falco 兩張命中在 **at** 不是 de；Grauzone 原盤登記在 **GB**；**義大利卡有一半靠 gb 命中**
（`it` 店面的 403 比例最高）。`DEIT` 店面組已把 `gb` 從第七位提到第四位。
最後 44 張的實際命中是 **de 43／it 1**——回撈階段用 lookup 直查補齊的那 12 筆全落在 de。

## 七、給下游

**第 221 條在這批誕生**：hook 層把「製作／混音／樂手」放在 `note` 節拍鏈的最後一格
並註明「字數不夠時先捨這一格」，寫作層的初稿超標從 c-109 的 15/24 降到 **6/22 與 4/22**。
**往後專名密度高的批一律照這個做法標。**
