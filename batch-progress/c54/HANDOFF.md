# c-54 交接（2026-09-02）：南斯拉夫地下搖滾 41 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 REMOTE_RUNBOOK
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

店主點名的第二條線（與蘇聯爵士同一則指示）。**41 張、27 位藝人**，年份 1972–1987，
從 Korni Grupa、YU Grupa、Smak 的前衛搖滾期，走到 Šarlo Akrobata、Idoli、
Električni Orgazam 的新浪潮（novi val），再到 Disciplina Kičme、Paraf 的後龐克。
曲風 rock 41、jazz 3、electronic 1、folk 1、pop 1。

**10 張自我同名卡**是這批的結構特徵，不是疏漏——novi val 的首作大量用同名。
依 §1 自我同名屬高風險，是否留置由本機逐張決定。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **38/41（93%）**，3 張要掃圖 | `c54/caa.json` 的 `art` 欄 |
| 2. 三軸與 rarity | **雲端未做**（需 `/album-rating`） | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **41 張全部寫完並過機器 QA** | `desc-tools/batches/output/c54-out-{1,2}.json` |
| 5. 固定試聽 | 已探測，**0/41 ready** | `c54/previews.json` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

### 身分：41 張全部釘住 release-group MBID，零人工身分卡

南斯拉夫盤在 MB 上建得意外完整（Jugoton、PGP-RTB、ZKP RTLJ 三大廠牌都有系統性建檔）。
本機組 manifest 不需要備 `mbAbsenceProof`。

### 封面：38/41，全部來自 CAA。93% 是七批裡最高的

**3 張缺封面**（要掃圖）：Disciplina Kičme《Sviđa mi se da ti ne bude prijatno》、
Film《Zona sumraka》、Paraf《A dan je tako lijepo počeo》。

### 試聽：0/41——這個零是結論，不是沒跑

九個 storefront（hr／si／rs／ba／mk／de／at／us／gb）全試過。
**21 張在 Apple 上完全查無，20 張查得到條目但沒有 preview URL。**

那 20 張是關鍵訊息：**南斯拉夫目錄確實有數位化，但 Apple 沒有拿到試聽權**。
這不是探測失敗，重跑不會有不同結果——**別重跑試聽線**。
若要補試聽，得走 Apple 以外的來源，那是本機的事。

## 三、上架前必須先看 `rulings.md`

主檔在 `c53/rulings.md`（42 條，c-53 至 c-59 共用）。與 c-54 直接相關的三條：

1. **第 20 條：`ZKP RTVL` 與 `ZKP RTLJ` 是同一家廠牌**，兩種寫法都要試。
   （盧比安納廣播電視台的出版部，MB 與 Discogs 上兩種縮寫並存。）
2. **第 21 條：三筆審查紀錄寫成事件、三筆商業退稿標明不是政治。**
   這批很容易把「唱片沒發成」一律寫成政治審查，實際上有三筆是廠牌的商業判斷。
   行文已逐筆區分，**本機改寫時不要把兩者合併**。
3. **第 22 條：四處策展層的說法被唱片內頁推翻**，`curatorWhy` 已直接改寫。

另外，`batch-progress/c53/rulings.md` 第 16 條（多藝人拼盤用 " / " 斜線）
在這批也用得上。

## 四、簡介產線的數字

| | out-1 | out-2 | 合計 |
|---|---|---|---|
| 卡數 | 21 | 20 | **41** |
| 字數範圍 | 202–239 | 216–235 | 202–239 |
| 超過 240 | 0 | 0 | **0** |
| `qa-check-research` | 0 | 0 | **0** |
| `fix-spacing` | 0 | 0 | **0** |

`qa-batch out c54` 與卡單 41 張相符。研究層 **41 張全部 `status: full`**——
七批裡四批零 thin 卡之一（另三批是 c-57、c-58、c-59）。無合輯，
不涉 §5.6 例外。
