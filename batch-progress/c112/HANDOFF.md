# c-112 交接（2026-09-06）：2026 新譜（至 9 月），42 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

`EXPANSION-PLAN-c89plus.md` D 線，`lineType: 廣度`。

**42 張、42 位掛名（無一位重複）、零 §1 人工身分、零跨批撞卡、42/42 釘住 release-group MBID。年份全部 2026。**

| 組 | 場景 | 張數 |
|---|---|---:|
| a | 2026 新譜：英美 | 23 |
| b | 2026 新譜：日韓與華語 | 19 |

**曲風**：rock 20、pop 12、folk 3、hiphop 3、soul 3、electronic 1。**§5.6 合輯 0 張。**

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **42/42（100%）** | `c112/caa.json` |
| 2. 三軸與 rarity | **雲端未做**——照 §0.8 錨點制（第 89 條） | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **42 張全部寫完並過機器 QA** | `desc-tools/batches/output/c112-out-{1,2}.json` |
| 5. 固定試聽 | **42/42（100%）**，命中 `us 33｜jp 8｜tw 1` | `batch-progress/probe/previews.json` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

**⚠ 三軸這批最要小心**：2026 年的新譜 Last.fm listeners 還沒長起來，**冷門軸會嚴重失真**。
三軸留給本機人工看，不要照既有錨點自動算。

**簡介的機器 QA**：`qa-batch.mjs out c112` 全過（out-1 23 張 214–240、out-2 19 張 206–239、>260 零筆）；
`fix-spacing` 兩檔各跑一次；`qa-batch research/hooks c112` 與 `chk-hook-crossgroup c112` 皆 0 標記
（hook 加權 24–38.5、note 243–350）。
主線一次性複驗：**42 張 `desc` 開頭與 `hook` 逐字相符**、
**資料庫名（MB／維基／Apple／Discogs／Spotify）出現 0 次**、榜單獎項評分 0 次。

## 三、⚠ 已移除一張：GEZAN《I KNOW HOW NOW》（裁定 201）

研究層查證時發現：**2026-07-30 樂團公告主唱性加害事案、宣布一定期間活動休止**
（朝日新聞 2026-07-31 朝刊、樂團官網）。碟本身 2026-02-11 發行，早於該事件。

**主線依「裁定權下放」判斷移除**（可逆、不卡線、寧可少收一張），
卡單 43→42、研究稿 20→19、`prop-b.json` 20→19 都已同步。
**這是商譽判斷、不是策展技術判斷，店主可能有不同意見**（例如「作品與人分開」）。
要收回來只要把那筆加回三個檔即可。

## 四、**撤下版（Withdrawn）是這批的重災區**（本批最重要的一條）

策展層 `risk` 欄裡引用的「另一種軌數切法」，**有三處根本出自 Withdrawn 的 release**：

| 卡 | 策展層寫的 | 實際 |
|---|---|---|
| Kacey Musgraves | 「19 筆 release 全 Official」、15／16 軌兩種切法 | **2 筆 Withdrawn**；Official 一律 **13 軌** |
| Charli xcx | 「24 筆全 Official」、19 軌切法 | **2 筆 Withdrawn** |
| Baby Keem | 「13 軌的較晚數位版 2026-04-03」 | 13 軌那筆是 `9fc95e48`、2026-02-20、**Withdrawn**；2026-04-03 那筆是 11 軌 Official |

**通則：`status` 欄要逐筆讀。Withdrawn 的數字一律不得當背書。**
b 組逐筆讀過，零 Withdrawn；但有真 Pseudo-Release 3 筆與 status 未填 2 筆。

## 五、其他要帶給本機的

- **同一張碟的兩個母帶**：Charli xcx 的黑膠與 CD／數位**都是 11 軌、曲名曲序全同**，
  只有第 11 軌 3:06 對 5:42——黑膠拿掉一段，總長 30:05 變 27:21。**只有逐軌長度能分。**
- **Madonna《CONFESSIONS II》的第 17 軌是 0:17 的預告影片、沒有試聽**，固定試聽不得取它。
  三筆 17 軌 release 前 16 軌完全相同，第 17 軌各自不同。
- **Olivia Rodrigo 原本指到 cleaned 淨化版**（6779097512），已改指 explicit 的 **1889992111**。
  ⚠ **這是流行盤不是嘻哈盤**——「淨化版是嘻哈盤特有的病」在 2026 新譜上不成立；
  反過來三張嘻哈卡（Vince Staples、Baby Keem、Isaiah Rashad）逐張查過**全是 explicit 原版**。
- **7 張 unavailable 全部是假的**（裁定 185），已全數回撈：
  坂本慎太郎 jp 1854043241、くるり jp 1893695487、ずっと真夜中でいいのに。jp 1881609986、
  MASS OF THE FERMENTING DREGS us 6794310247、AKMU us 1887773334、
  이승윤 us 6781229596（29 軌＝12＋17 兩片）、回聲樂團 tw 6772125716。
- **軌數兩處硬錯**：ずっと真夜中でいいのに。**沒有三種切法**，10 與 8 是初回限定魔導書盤
  UPCH-29504 **同一筆 release 的第三、四片現場錄音**；이승윤兩筆 Official **各自都是兩片裝**。
- **U+2010 連字號三處**：`L‐M Records`（Steve Lacy 的廠牌）、`Yoo‐hoo`（坂本慎太郎的羅馬字盤標題與末軌）、
  MONO 的藝人 disambiguation。Apple 與卡片都是 ASCII。
- **短掛名 `Neurosis` 有兩個實體**：正確的是 `a9416fb3`（US sludge metal band，1985），
  另一個 `4244eadf` 欄位全空、disambiguation 是「Note PC Studio」。
- **Stray Kids 的型態兩說**：MB primary-type Album、英文維基記 EP（第十張韓語 EP，25:11），已依 MB 走。
