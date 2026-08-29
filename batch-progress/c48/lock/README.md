# c-48 版本鎖定派工說明（雲端段）

## 你的工作
對派給你的每一張古典卡，**確定它到底指哪一份錄音**，並釘出正確的 MusicBrainz
release-group MBID。這是 `REMOTE_RUNBOOK.md` 說「偷懶整批交接都會卡住」的那一步。

`packet-*.json` 每筆有兩塊：
- `seed`：策展意圖（演奏者、作品、**期望的錄音年**、廠牌、作曲家、稽核軸線）
- `mbCandidates`：主線已預先查好的 MB 候選（含 `credit` 掛名、`firstRelease`、
  `primaryType`、`secondaryTypes`）。**先用這份，不夠再自己查 MB。**

## MB 查詢的節流規定（很重要）
MusicBrainz 是 1 req/sec 全域限流，**四組同時打會互相拖垮**。所以：
- 能用 `mbCandidates` 判定的就不要再查。
- 真的要查，每次呼叫之間至少 `sleep 3`，遇 503 就退避重試，
  User-Agent 一律帶 `dip-vinyl-shop/1.0 (kubinice06@gmail.com)`。
- 判斷版本時**優先查 release 層**（`/ws/2/release/?query=...`）：古典 release-group 的
  artist-credit 掛的是作曲家，只有 release 的掛名才看得到演奏者。

## 主線已踩過的坑（不要重蹈）
主線眼過一輪候選，發現自動評分**不可信**，以下是實際抓到的錯配型態：

1. **同演奏者的同曲重錄**——Cluytens 錄過兩次佛瑞安魂曲（1950 與 1962），
   自動挑中 1950 那次，但稽核要的是 1962 的 de los Ángeles／Fischer-Dieskau 版。
2. **Highlights 精選冒充全曲**——Bonynge 的《霍夫曼故事》自動挑中 "Highlights"。
   **凡標題含 Highlights／Excerpts／Querschnitt 一律不收。**
3. **搭檔換人**——Karl Leister 的兩張自動挑中 Brandis Quartett 版，
   但稽核指定的是 Amadeus Quartet。搭檔不同就是不同錄音。
4. **現場版冒充錄音室版**——Jochum 布魯克納五號挑中 Concertgebouw 現場，
   稽核要的是 DG 1958 錄音室版；Abbado 的《塞維利亞理髮師》挑中 1989 維也納現場，
   稽核要的是 DG 1971 錄音室版（Berganza）。
5. **雜誌附片冒充正規盤**——Pavel Haas Quartet 挑中 "BBC Music, Volume 30 Number 9"。
6. **指揮換人**——Oistrakh 的柴可夫斯基協奏曲挑中 Konwitschny／德勒斯登版，
   稽核要的是 Ormandy／CBS 版。
7. **Compilation 掛在 secondaryTypes**——`primaryType` 是 Album 但 `secondaryTypes`
   含 `Compilation` 的，依 §5.6 必須補 `exceptionReason`（≥12 字）與
   ≥2 個 HTTPS `exceptionEvidenceUrls`，不能當一般專輯放行。

## 主線已裁定的 MBID（直接採用，不要重查）
| 卡 | rgMbid | 備註 |
|---|---|---|
| Martha Argerich｜Liszt: Piano Sonata in B minor | `b081a3af-1d0d-47c4-9389-6d01c1897a1c` | MB 標題是德文 "Liszt: Sonate h-Moll / Schumann: Sonate g-Moll"，1972 |
| Panocha Quartet｜Dvořák: String Quartet "American" | `ddc49367-87c6-354d-b103-2ad8e2eab88a` | MB 標題有錯字 "String Quatets"，1989 |
| André Cluytens｜Fauré: Requiem | `b157d329-6ced-36d7-a1e5-e184612473fa` | **1962 錄音**（de los Ángeles／Fischer-Dieskau），不是 1950 那次 |
| Herbert von Karajan｜Mussorgsky: Boris Godunov | `3d7351ef-2624-452d-88a4-15d905144163` | 已查 release 層確認掛名有 Karajan／Ghiaurov／維也納愛樂；林姆斯基高沙可夫配器版 |
| Domus｜Fauré: Piano Quartets | `83c38ebc-3e50-49c2-a44f-2e8f037fe8f9` | 1986-09。卡名請改成 "Fauré: Piano Quartets"（MB 是兩首的合集） |
| Jascha Heifetz｜Korngold: Violin Concerto | `ec333e24-0708-406a-9806-48256e4a9566` | **secondaryTypes 含 Compilation**，必須補 §5.6 舉證 |
| Maurizio Pollini｜Schoenberg: Piano Works | `9407609d-ca05-4bb7-9d4a-1c2b17b3692c` | MB 標題 "Schoenberg: The Piano Music"，1975 |
| Daniel Barenboim｜Mendelssohn: Songs Without Words | `8f93c24e-8b8d-4af6-b7c7-4544dd05a2ca` | MB 無首發日期，年份用錄音年 |
| Riccardo Chailly｜Schoenberg: Gurre-Lieder | `5cf81ebb-c2ab-3899-b1cd-b6c38ac21774` | MB 拼 "Gurrelieder" 一個字，首發標 1990-07 |
| Michelangeli｜Ravel / Rachmaninoff 協奏曲 | `917841c6-86da-40ff-8c14-01b680f81e8a` | MB 首發 1958-09；錄音年 1957 需覆核 |
| Michelangeli｜Beethoven / Galuppi / Scarlatti Recital | `31441c08-a2bf-457f-a6fa-d3d4ce6a29a7` | |
| Tan Dun 譚盾｜Water Passion after St. Matthew | `f6dc3bd7-8800-305c-a50d-28d04576102c` | 2002 |
| Lang Lang 郎朗｜Bach: Goldberg Variations (2020) | `2162703b-3d66-4b5d-9cb8-72e0cfff87c2` | 2020-09-04 錄音室版，**不要**選 2021 extended edition |
| Ensemble Organum｜Chant de l'Église de Rome | `be93ac67-75f5-4311-9ffd-5dda147b72c4` | 1986《Période byzantine》；稽核寫的 1998 有誤，卡名與年份請一併改 |

## 主線已裁定的替換（MB 查無稽核指定的版本，改釘替代盤）
| 原稽核指定 | 改成 | rgMbid |
|---|---|---|
| The Tallis Scholars｜Josquin: Missa L'homme armé | The Tallis Scholars｜Josquin: Missa Sine nomine / Missa Ad fugam | `e8ad0f95-7c88-3d3f-a95b-a44aad44a85b`（2008-02） |
| The Binchois Consort｜Dufay: Missa Se la face ay pale | Diabolus in Musica｜Dufay: Missa Se la face ay pale | `d76a6bcc-a532-3a82-901f-b1a0aa1b4e52`（2004；稽核原本就允許二擇一） |
| Rinaldo Alessandrini｜Monteverdi: Selva morale e spirituale | La Venexiana｜Monteverdi: Selva morale e spirituale | `3f2896c0-cd94-4ecc-acb4-4af1a648a39a`（2008） |
| Mstislav Rostropovich｜Dutilleux: Tout un monde lointain | Marc Coppey｜Dutilleux: Tout un monde lointain | `ce5dd2ba-0ed6-4152-9d6b-0a38932e467b`（2008-04-07，與 Caplet《Épiphanie》同碟） |
| Fou Ts'ong 傅聰｜Debussy: Préludes | Fou Ts'ong 傅聰｜Chopin: Nocturnes | `ccf17096-50c5-4508-9be2-a2e3c1501337`（MB 無首發日期，年份待查） |
| Grumiaux Ensemble｜Mozart: String Quintets K. 515 & 516 | Grumiaux Trio｜Mozart: The String Quintets | `07f23c2c-d5fb-4d30-9e41-a595e3f30890`（掛名 Grumiaux Trio＋Gérecz＋Lesueur，與 1973 Philips 錄音人員相符） |

## 每張要交付的欄位
```json
{
 "artist": "卡片掛名（若版本鎖定後該改，就改，並在 versionNote 說明）",
 "album": "卡片專輯名。**同曲池內已有其他版本時必須帶括註區辨**（年份、廠牌或指揮），例如 Bach: Cello Suites (Mercury)、Beethoven: Symphony no. 9 (Bayreuth 1951)",
 "composer": "作曲家（進 seed_cards 第 8 欄／apex 第 5 欄，§0.6）",
 "genreFamily": "classical",
 "rgMbid": "釘定的 release-group MBID",
 "mbTitle": "該 RG 在 MB 上的標題（供本機對帳）",
 "mbCredit": "該 RG／release 的掛名字串",
 "releaseType": "Album 等 primary-type",
 "secondaryTypes": ["MB 的 secondary-types 原樣"],
 "firstRelease": "MB 的 first-release-date，沒有就 null",
 "suggestedYear": 1962,
 "yearNote": "**卡片年份用錄音年**（古典慣例，見 audit 的風險提醒第 6 條）。MB 的 first-release-date 對古典幾乎都是 CD 再版年，兩者不同時要寫明：錄音年是哪年、依據為何、MB 首發年是多少",
 "versionNote": "**最重要的一欄**：為什麼是這一份錄音不是別份。同演奏者重錄、Highlights、現場 vs 錄音室、搭檔差異、配器版本，逐項交代",
 "exceptionReason": "secondaryTypes 含 Compilation 時依 §5.6 寫歷史重要性（≥12 字）；否則留空字串",
 "exceptionEvidenceUrls": ["填了 exceptionReason 就要 ≥2 個 https"],
 "curatorWhy": "為什麼這張該進卡池（這份錄音的樂史地位）",
 "curatorRisk": "策展風險，要具體",
 "apexCandidate": {
   "eligible": true,
   "tier": "hall｜pearl｜heresy",
   "reason": "",
   "evidenceUrls": ["≥2 個 https"],
   "evidence": "查得到證據留空字串；連不到來源填 \"pending-local\""
 }
}
```

## 硬規則
1. **頂點判定不得因「查不到」降級**——夠格但連不到佐證來源時 `evidence` 填 `"pending-local"`、
   `eligible` 仍 true。**絕不因查不到就判普卡。** c-46 有 40 張因此被誤作普卡，本機補證後 22 張夠格。
   古典 hall 的有效依據包含：Gramophone 名人堂、企鵝三星帶花、《唱片藝術》名曲名盤、
   大廠傳奇再版系列（Great Recordings of the Century、DG The Originals、Decca Legends、
   Living Stereo／Living Presence），**以及發燒天碟正典**（TAS 榜、香港 CD 聖經、
   Analogue Productions／Classic Records 復刻、首版黑膠行情）——後者與詮釋正典並列有效。
   古典 **pearl 不適用 listeners <300 門檻**（§0.7），改為人工判定＋≥2 個證據網址。
2. **不要填三軸**。三軸由主線依 §0.7 錨點制統一評分，已完成，你填了會被覆蓋。
   但**若你改了 `artist` 或 `album`，一定要在回報中逐筆列出「原名 → 新名」**，
   否則主線的評分表對不上。
3. **不確定就不猜**。查不到錄音年就在 `yearNote` 寫明「待本機補」並在 `curatorRisk` 標出。
   若某張你判斷 MB 根本沒有可用條目，放進 `skipped` 並寫明查過哪些查詢式，不要硬釘一個不對的 MBID。
4. **不要動 `seed_cards.json`、`apex_pool.json`、`PROJECT_MEMORY.md`，不要碰 KV 與 Firestore。**
5. listeners 一律不填（本機才查得到 Last.fm）。

## 交付
寫成 `batch-progress/c48/lock/out-<你的組別>.json`：
```json
{ "group": "A", "albums": [ ... ], "skipped": [ { "artist": "", "album": "", "reason": "" } ] }
```
