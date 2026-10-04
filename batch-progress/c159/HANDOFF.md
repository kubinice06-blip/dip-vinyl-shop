# c-159 交接（2026-09-18）：Blue Note 2004–2006，34 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

切片 45 張，**收 34 退 11**（a 收 18 退 5、**b 收 16 退 6**）。
**b 組的退貨率 27.3% 是 1985 後十四批最高**——這一格的清單裡復刻盤又回來了。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 項目 | 狀態 |
|---|---|
| 身分（rgMbid 釘住） | **34/34 全部 pinned，零 §1 人工** |
| 三軸與頂點資格 | 卡單已帶；**本批 apex 0 張** |
| 固定簡介（desc） | **34/34 全 full**，out-1 201–240／out-2 219–239 |
| 封面 | **30/34**（缺 4，替代來源 4/4 全部查實且目視核過） |
| 固定試聽／無來源狀態 | **28/34 有來源**，**6 張走固定無來源狀態** |
| §5.5／§5.6 例外欄位 | 本批無合輯，例外欄全空 |
| published gate | 本機端 |

**6 張走固定無來源狀態**：Anita Baker《My Everything》／Monk-Coltrane《At Carnegie Hall》／
Tania Maria《Intimidade》／Trio Töykeät《Wake》／Al Green《Everything's OK》／Jane Bunnett《Radio Guantánamo》。

## 三、⚠ 這一批最有用的一條（第 1614／1620-D 條）：兩種「查不到」要分清，一種救得回、一種救不回

**救得回的那種**：**這張碟在美日加三個大市場被抽掉、在其他 23 個市場都在。**
Jukka Perko《Kuunnelmia》的 `lookup?upc=724387524828` **在 23 個店面都回得到，唯獨 us／jp／ca 沒有**，
逐軌 13／13 都有 preview。**探測層的十五市場清單裡有 fi，照樣沒救到它**——因為要靠 UPC 不是盤名。
**→ 建議本機把「UPC × 23+ 店面」寫成探測層的固定步驟，不是救援手段。** 本線靠這一步另外救回兩張。

**救不回的那種**：**「藝人目錄完整、前後作都在、唯獨這一張缺」，而且缺的都是同一家廠牌直屬的那幾張。**
- Al Green 的藝人目錄在七個市場各 43–60 張，Hi Records／Fat Possum 舊目錄幾乎全在，
  **但 Blue Note 時期的兩張專輯一張都不在。**
- Jane Bunnett 的目錄涵蓋 1988–2024，**2004 與 2008 兩張（她自己的廠牌）都在，唯獨夾在中間的 Blue Note 直屬這張不在。**
**→ 這是廠牌層級的版權缺口，掃再多市場也沒有用。判到這個形狀就可以停手。**

## 四、⚠ 「編制完全查不到」在這一批被推翻三次，三張各靠不同一招（第 1620-E 條）

| 卡 | 靠哪一招 |
|---|---|
| Al Green | **紙本**（BB 2005-03-19 p19 點名和聲三人、貝斯、八人弦樂組；資料庫全空） |
| Dr. John《Mercernary》 | ⚠⚠ **日版 TOCP-67975 有完整名單而且帶軌號**——**本線第一次靠日版救回編制** |
| Rubalcaba《Solo》 | **換版本**（歐版有 22 筆：逐軌作者、三個日期、Bösendorfer Model 280 與調音師） |

**→「換一個條目再看一遍」現在有三種來源可換：歐版、日版、紙本。**
**判「完全查不到」之前，一定要把該 master 轄下的每個條目都開過一遍。**

## 五、⚠ 獎項與編制的兩種腦補（本批各中兩次）

**獎項**：策展層 34 張一張都沒查。研究層補齊後是**兩項得獎、七項入圍未得**。
⚠ **三個「不得併計」的陷阱**：Wynton Marsalis 第 48 屆入圍的是《Live at the House of Tribes》不是《The Magic Hour》；
Stefon Harris 第 46 屆入圍的是《The Grand Unification Theory》不是《Evolution》；
**Gianluca Petrella 的三個獎都是頒給他這個人、都在本碟之外的年份。**
⚠ **另一處是入圍與得獎混了**：**Jane Bunnett 其實是 2006 年 Juno 的「得獎者」**，2005 年的 Urban Music Award 才是入圍。

**編制**：⚠ **「輪流／分工／互不重疊」這種話本批被推翻兩次**
——策展層說「Cassandra Wilson 三位鼓手互不重疊」，實際在第 3、6、7、9 軌重疊、**第 6 軌三人全在**；
研究稿說「Don Byron 兩位歌手輪流上陣」，實際**第 6 軌同時在場**。
**→ 後批通則：同樂器多人時，「輪流／分工／互不重疊」一律要逐軌核過才准寫。**

## 六、⚠ 給本機的三條檢查建議

1. **「第一張／最後一張／唯一一張」這類序數宣稱，一律要有 src**——本批出現三次
   （Rubalcaba「Blue Note 最後一張領班盤」、Petrella「長號手的第一張領班盤」、
   Ayşe Tütüncü「土耳其分部唯一一張 Blue Note」），**三處都查無來源、三處都沒寫進正文。**
2. **`billboard-bn-*-ocr.txt.gz` 是「關鍵字過濾過」的**——只有帶 Blue Note／jazz 關鍵字的頁進了檔。
   **「檔裡零命中」不等於「那一期沒有」**（查非爵士類別的獎要另走網路）。
3. **`BB-2004-05-22.pdf` 的合訂分界量出來了**：**低頁碼（p31）屬 5/22、p115 以後屬 2004-10-23，分界約在 p73。**

## 七、產物清單

```
desc-tools/batches/cards/c159-cards.json          34 張卡單
desc-tools/batches/research/c159-{a,b}.json       研究層
desc-tools/batches/hooks/c159-hooks-{a,b}.json    鉤子層
desc-tools/batches/input/c159-writer-{1,2}.json   merge 產物（18／16）
desc-tools/batches/output/c159-out-{1,2}.json     寫作層（18／16）
batch-progress/c159/{prop-a,prop-b,slice,caa,apple-candidates}.json/md
batch-progress/c159/rulings.md                    策展層第 1560–1609 條
batch-progress/c159/rulings-mainline.md           主線第 1610–1620-U 條
batch-progress/memory-entries/c159-pipeline.md    備忘錄條目
```
