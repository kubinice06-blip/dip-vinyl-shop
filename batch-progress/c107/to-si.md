# c-107：MB 查無、可進 §1 人工身分補遺批的候選

**本批不開 §1**（依 `CURATION-BRIEF-c103plus.md` 第二節第 1 點：只有 c-113／c-114／c-115 開）。
下面是策展過程中**確認 MB 真的查無**、但唱片實體確鑿的碟，附 Discogs 連結供補遺批舉證。

**「查無」的四種假形狀都已排除**（裁定 28／98／116／122）：503／403 都退避重試過；
藝人目錄一律用 `release-group?artist=<MBID>&limit=100&offset=` 分頁（不用 `inc=release-groups` 的 25 筆上限）；
MB 回不相干實體的情況已用 area／type／disambiguation 逐一回問（裁定 179）。

---

## 一、強候選（MB 完全無實體或名下 0 個 release-group）

### 1. White+（白+）《White+》2012 — 兵馬司 Maybe Mars

- **派工信明列的「白／Chui Wan」裡的「白」就是這一支**（Chui Wan 吹萬那一半 MB 有建檔，已收進 prop-b）。
- **MB 查無**：`artist?query="White+" AND area:China` 回的全是 Barry White／The White Stripes／Jack White 等不相干高分實體，
  以 `白+`／`White+`／`White Plus` 三種寫法各查一次，**沒有任何 area 為中國的實體**；
  沒有藝人實體就沒有 release-group 可釘。
- **唱片實體確鑿**：Discogs 有兩筆兵馬司發行——
  - White+《White+》(2012, Maybe Mars) https://www.discogs.com/release/4351432
  - White (6)《White》(2009, Maybe Mars／andereBaustelle) https://www.discogs.com/release/1652312
  - 旁證：Various《Independent China In Stereo - Maybe Mars 5th Anniversary》(2012, Maybe Mars) https://www.discogs.com/release/4399617
- **建議**：兩張裡取 2009 那張《White》（兵馬司初期、與 Carsick Cars／Snapline 同一批）。
  **⚠ 但那是自我同名（盤名＝掛名）且掛名只有一個拉丁字**，`coverSourceHint` 不能用 caa（無 rgMbid），
  必須走 `apple-verified-collection` 且要先確認 Apple 上找得到——本批未查（超出範圍）。

### 2. 子曰《第一冊》1997／2000 — 京文音像

- **MB 藝人實體存在但目錄是空的**：`子曰秋野`（Group／Beijing／MBID 0b7006e0-07bc-4c65-87ab-b2b9ebcd6e41）
  以 `release-group?artist=…&limit=100` 分頁查詢**回 0 個 release-group**；另一個實體 `子曰`（Group／China）同樣 0 筆。
- **唱片實體確鑿**：Discogs 三筆——
  - https://www.discogs.com/release/13345215 （JingWen Records 京文，2000）
  - https://www.discogs.com/release/8188035 （駿驎實業／搖滾中國，2000，台版）
  - https://www.discogs.com/release/29510857 （JingWen Records／SeeU Music，2023 再版）
- **為什麼值得收**：秋野把北方曲藝的唸白與嗩吶放進搖滾，與本批收的二手玫瑰是同一條「本土戲曲挪用」的線，
  但比二手玫瑰早六年。池中這條線只有本批新收的二手玫瑰一張。

## 二、弱候選（MB 查無，但 Discogs 也只見於合輯，舉證未必湊得齊）

### 3. 呼吸樂隊《太陽升》1990

- **MB**：藝人實體 `呼吸`（Group／China／MBID b158ee58-1706-4d1e-b42c-3afbabac594d）名下**只有 1 個 release-group**
  ——《呼吸》(1992-01-31，XW／Official)，**沒有《太陽升》**。
- **本批原本要收《呼吸》(1992) 那一張，後來撤掉**：自我同名（盤名＝掛名）＋ Apple 四店藝人目錄 lookup 連 artistId 都搜不出來
  ＋ CAA 回 404，封面無路可解（見 `rulings.md` 第 2 條）。
- **Discogs**：以「呼吸乐队」查 24 筆，**全部是合輯**（《搖滾北京》1993 https://www.discogs.com/release/10612649 、
  《摇滚北京》1994 P-Vine 版 https://www.discogs.com/release/12983889 、《中國大搖滾》1993 https://www.discogs.com/master/3962546 ），
  **沒有《太陽升》的單獨條目**。§1 要「Discogs 條目 ＋ 兩個獨立來源」，這一項目前只湊得出合輯收錄。
- **建議**：補遺批若要收，改收合輯《搖滾北京》(1993) 本身（走 §5.6），比追《太陽升》務實。

### 4. 清醒樂隊《我猜你也是》1998 — 摩登天空

- **MB**：藝人實體 `清醒`（Group／China／MBID 30cd5416-4c2b-45b7-b47a-5542c8628923）名下 **0 個 release-group**。
- **Discogs**：有藝人頁 https://www.discogs.com/artist/4907046 ，但專輯本身無條目，
  只在摩登天空精選《天空之城+2》裡出現（https://www.discogs.com/release/18047203 ）。
- **建議**：舉證湊不齊，除非補遺批另找到唱片公司頁或館藏目錄，否則不建議追。

---

## 三、**不列進本清單**的兩類（避免誤會）

1. **MB 有建檔、但封面與試聽兩路都解不出來而未收的碟** —— 那是「未收」不是「§1 候選」，
   全部記在 `rulings.md` 的未收清單（盤古《欲火中燒》、張楚《造飛機的工廠》、萬曉利《走過來 走過去》、
   P.K.14《上樓就往左拐》、頂樓的馬戲團《蒂米重訪零陵路93號》、木馬《果凍帝國》等 7 張）。
   §1 的門檻是「MB 真的查無」，不是「這張很難做」。
2. **MB 有建檔、只是本批額度用完的碟** —— 同樣記在 `rulings.md`，那是下一批的名單。

## 四、合計

| 級別 | 張數 | 備註 |
|---|---:|---|
| 強候選（Discogs 有專輯條目） | **2** | White+《White》2009／2012、子曰《第一冊》 |
| 弱候選（Discogs 只有合輯或藝人頁） | **2** | 呼吸樂隊《太陽升》、清醒《我猜你也是》 |
| **合計** | **4** | 遠低於 c-103 演歌批預期的 10–20 張——**中國搖滾在 MB 上的建檔率比預期好很多**（見 `rulings.md` 第 1 條） |
