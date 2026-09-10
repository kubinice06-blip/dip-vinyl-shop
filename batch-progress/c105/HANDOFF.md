# c-105 交接（2026-09-06）：K-pop 韓版里程碑＋K-indie 第二輪，45 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

`EXPANSION-PLAN-c89plus.md` B 線，`lineType: 廣度`。

**45 張、26 位掛名、零 §1 人工身分、零跨批撞卡、45/45 釘住 release-group MBID。年份 1996–2023。**

| 組 | 場景 | 張數 |
|---|---|---:|
| a | K-pop 韓版里程碑 | 25 |
| b | K-indie 第二輪 | 20 |

**曲風**：pop 24、rock 20、hiphop 1。**§5.6 合輯 0 張。**
19 位掛名各 2 張（H.O.T.、S.E.S.、Fin.K.L、G.O.D、BIGBANG、Girls' Generation、SHINee、BTS、IU、
Crying Nut、No Brain、NELL、장기하와 얼굴들、브로콜리 너마저、The Black Skirts、9와 숫자들、
언니네 이발관、델리스파이스、Parannoul），其餘各 1。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **43/45（96%）** | `c105/caa.json` |
| 2. 三軸與 rarity | **雲端未做**——照 §0.8 錨點制（第 89 條） | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **45 張全部寫完並過機器 QA** | `desc-tools/batches/output/c105-out-{1,2}.json` |
| 5. 固定試聽 | **43/45（96%）**，命中 `us 31｜jp 12` | `batch-progress/probe/previews.json` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

**真的查無 2 張**（search 四種寫法＋藝人目錄兩端點皆空、目錄未達 200 上限）：
No Brain《청년폭도맹진가》、브로콜리 너마저《보편적인 노래》——固定試聽走無來源狀態。

**簡介的機器 QA**：`qa-batch.mjs out c105` 全過（out-1 25 張 191–240、out-2 20 張 169–240、
thin 2 張皆 ≤180、>260 零筆）；`fix-spacing` 兩檔待補 0；
`qa-batch research/hooks c105` 與 `chk-hook-crossgroup c105` 皆 0 標記（hook 加權 13–29、note 283–350）。
主線一次性複驗：**45 張裡 44 張 `desc` 開頭與 `hook` 逐字相符**，唯一的差異是
Fin.K.L《White》——hook 寫「MB 上同一天的兩筆」，寫作層改成「同一天建檔的兩筆」，
**這個改法是對的並已立為第 200 條**（行文不得出現資料庫名稱）。行文中資料庫名出現 0 次。

## 三、**試聽從 18/45 救到 43/45**（本批最重要的一條）

`probe-previews` 只走 Apple 的 `search` 端點，諺文盤名整組查不到。
**兩輪回撈共補回 25 張**：研究層 a 組 16 個、b 組 9 個 collectionId，全部逐軌比對過。

**⚠ 韓國獨立樂團在 Apple 上的 artistName 幾乎全是羅馬字**——
`장기하와 얼굴들`→Kiha & The Faces、`언니네 이발관`→Sister's Barbershop、
`9와 숫자들`→9 and the Numbers、`브로콜리 너마저`→Broccoli you too。
諺文與羅馬字零字元重疊，`recover-unavailable.mjs` 的藝人閘必然擋掉（**第 194 條**）。
那支工具的「目錄裡找不到」**不是結論**。

**三張韓國卡的 kr 店面 `entity=song` 攤不出曲目列**，曲目與試聽一律走 us／jp。

## 四、策展層被推翻的 25 處（a 組 14、b 組 11）

**序數口徑打架 6 處以上**，最嚴重的是 **NELL《Let It Rain》**：策展層寫「第三張正規盤」，
韓文維基寫「通算第三、**正規第一**」、英文維基往前推是第一張（2001 年那兩張被稱為 indie），
**兩票對 MB 機械數的一票**。另有 No Brain《Viva No Brain》、Parannoul 兩張、
BTS《BE》（維基首句自己給兩個數）、Girls' Generation《Gee》、
SHINee《Replay》（Apple 同年標了兩個「第一」）。

**廠牌硬錯 3 處**：Parannoul《After the Magic》卡單記「自主發行」，
**實為 Topshelf Records TSR262，英文維基明寫這是他第一張不是自主發行的專輯**；
《Let's Walk…》有 POCLANOS 與 Longinus Recordings；The Black Skirts《TEAM BABY》漏 HIGHGRND。

**軌數／版本 5 處**：No Brain《청년폭도맹진가》唯一 KR Official 是**雙片 10+8＝18 軌、72:16**；
장기하와 얼굴들《사람의 마음》CD 版 **13 軌且曲序不同**（bonus 放第 1 軌）；
브로콜리 너마저《졸업》MB 12 軌含隱藏曲；The Black Skirts 第 10 軌 MB 15:40 但 Apple 只有 4:53；
Parannoul《After the Magic》US 雙片黑膠 11 軌多〈Your Place〉。

**其他**：신화《신화》的「自我同名」不成立（只有 MB 這樣建檔，Apple 題《해결사 - The 1st Album》）；
G.O.D《Chapter 1》年份四票裡三票是 **1999**（MB 記 1998-12-15）；
Red Velvet《The Red》實際 **10 軌**（卡單 11 是第 175 條的落差）；
三處 `exceptionReason` 把「KR Official 實體盤」的數字灌水。

## 五、韓版／日版（c-43 教訓）

**Girls' Generation 在 Apple jp 有三筆同名**：854885986（2007、11 軌、℗ SM＝本卡）、
**1440769276（2011、12 軌、℗ NAYUTAWAVE／UNIVERSAL＝日版出道盤，盤名完全相同）**、
1443318186（Re:Package，15 軌）。
2NE1 同一 RG 內韓版 7 軌／日版 10 軌（盤名改成《2NE1》）／泰菲版 11 軌。
**MB 的 Album 排序本身就含日版**，數序數時會多算：SHINee 5 筆、TWICE 5 筆、BTS 4 筆、
S.E.S. 2 筆、BIGBANG 3 筆、EXO 1 筆、Red Velvet 1 筆。

## 六、一處要注意的鍵值

研究層清單把 H.O.T.《Resurrection》誤記成「Jaurim」，主線已依 lookup 回的掛名更正。
**Apple 自己把盤名拼成「Resurretion - The 3rd Album」**（少一個 c），查詢時要預期。
