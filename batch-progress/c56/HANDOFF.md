# c-56 交接（2026-09-02）：捷克／匈牙利／中東歐地下 38 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 REMOTE_RUNBOOK
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

普查時池中**零張**的一區。**38 張、28 位藝人**，年份 1967–1991，
從 The Plastic People of the Universe、Psí vojáci 的捷克地下，到 Marta Kubišová、
Karel Kryl 的抗議歌謠，Blue Effect、Collegium Musicum 的前衛搖滾，
再到匈牙利與保加利亞（ФСБ）。曲風 rock 32、folk 10、jazz 4、pop 1、soul 1、blues 1。
4 張自我同名。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **35/38（92%）**，3 張要掃圖 | `c56/caa.json` 的 `art` 欄 |
| 2. 三軸與 rarity | **雲端未做**（需 `/album-rating`） | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **38 張全部寫完並過機器 QA** | `desc-tools/batches/output/c56-out-{1,2}.json` |
| 5. 固定試聽 | 已探測，**12/38 ready** | `c56/previews.json` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

### 身分：38 張全部釘住 release-group MBID（其中 3 張經 `fix-rgmbid.mjs` 修正）

修正原因見 c-55 交接文件的同一段——`mbNote` 混著藝人 MBID 與 release-group MBID。

### 封面：35/38，全部來自 CAA

**3 張缺封面**（要掃圖）：The Plastic People of the Universe《Leading Horses》、
Psí vojáci《Nalej čistého vína, pokrytče》、ФСБ《Non Stop》。

### 試聽：12/38 ready

十個 storefront（cz／sk／hu／pl／ro／bg／de／at／us／gb）全試過。

## 三、這批最要緊的一件事：503 會偽裝成「查無」

**裁定第 28 條，這是全次擴充最重要的一條技術裁定，而且它是本批的策展代理發現的。**

MusicBrainz 回 503（速率限制）時給的空結果，**在程式裡與真正的「查無此碟」
長得一模一樣**——沒印錯誤碼就會把「暫時打不通」記成「這張碟不存在」。
這是裁定第 10 條缺的前提：第 10 條講「查不到要換查法」，但沒說「查不到可能根本
不是查不到」。

發現後回頭稽核了所有會查 MB 的腳本，並把 `probe-caa-generic.mjs` 與
`fix-rgmbid.mjs` 都改成 **503 一律退避重試、重試耗盡才算失敗**。
既有結論的污染檢查結果寫在裁定第 28 條底下的「回頭檢查」小節——**結論全部維持**。

**本機若要自行補查 MB，請沿用同樣的退避邏輯。**

## 四、上架前還要看的 `rulings.md`

主檔在 `c53/rulings.md`（42 條）。除第 28 條外，與 c-56 相關的：

1. **第 29 條：兩個不同對象搶同一個通行名。** 羅馬尼亞的 Phoenix 與池中既有的
   法國 Phoenix 撞名，第 11 條沒有涵蓋這種情況。
2. **第 30 條：《Egon Bondy's Happy Hearts Club Banned》年份採 1978。**
3. **第 31 條：三筆 `queryAlias` 刻意留空**，因為那些 alias 是策展代理自己編的，
   外部服務不認得（判準同第 25 條）。

**另外，研究層推翻了三個策展理由，行文已照事實寫**：
Marta Kubišová 那張是她的**首張個人專輯**，不是「被禁前的最後一張」；
Blue Effect 的合作對象是**廣播爵士管弦樂團**，不是 Jazz Q；
LGT 的首作**沒有 Illés 團員參與**，也不是壓倒性的成功。
**本機改寫簡介時不要把這三條改回去。**

## 五、簡介產線的數字

| | out-1 | out-2 | 合計 |
|---|---|---|---|
| 卡數 | 19（full 18／thin 1） | 19（full 17／thin 2） | **38** |
| 字數範圍 | 179–235 | 179–235 | 179–235 |
| 超過 240 | 0 | 0 | **0** |
| `qa-check-research` | 0 | 0 | **0** |
| `fix-spacing` | 0 | 0 | **0** |

`qa-batch out c56` 與卡單 38 張相符。研究層 35 張 `status: full`、3 張 thin。
無合輯，不涉 §5.6 例外。
