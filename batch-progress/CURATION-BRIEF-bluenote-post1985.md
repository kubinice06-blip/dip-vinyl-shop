# 策展簡報：Blue Note 1985 後（c-148～c-167，871 張）

**店主 2026-09-18：「繼續跑剩下的」。** Blue Note 線的最後一段：
**1985 年 2 月重啟之後的爵士盤，MB 建檔 929 張、池中 58，缺 871。**

`lineType: 深掘`，`scene: Blue Note 目錄補齊（1985 後）`。清單已切好在 `batch-progress/c1XX/slice.json`
（每批 45 張，`g: "a"` 前 23、`g: "b"` 後 22；c-167 只有 16 張），**依年份 → 目錄號排序**。

## 〇、固定規格與共通條款

固定規格照 `CURATION-BRIEF-bluenote.md` 第〇節（→ `c131` → `c127` → `c126` → `c103plus` → `c93plus`），一字不改。
**交件形狀照 `batch-progress/c141/prop-b.json`。**

## 一、⚠ 這一段與前面十三批最大的差別

**前面十三批的主要風險是「年份錯」，這一段的主要風險是「這張根本不是新錄音」。**

1. ⚠ **再發盤混在裡面**。1985 後 Blue Note 大量再發 Lion 時代的目錄
   （RVG Edition、Connoisseur Series、Blue Note 75／80、Tone Poet、Classic Vinyl）。
   列舉檔已把**十個再發系列折進原盤 RG**，但**折不乾淨的會以「1985 後首發」的樣子留在你的清單裡**。
   **判準：看錄音年。錄音年在 1985 前的，先假設它是再發**，要嘛是前面十三批已收的碟，
   要嘛是庫存盤（那要照 c-145 的寫法：`year` 取首次商業發行年、`risk` 寫錄音年與原定目錄號）。
   **實掃卡池時，除了盤名也要用錄音年＋藝人交叉查**——**撞的可能是別名不同的同一張碟**。
2. ⚠ **合輯的形狀變多**。第 397／613／782 條在這一段會更常中：
   **盤名帶 Best of／Greatest／Collection／Anthology／The Very Best／Blue Note Trip／Sidetracks 的一律細看**；
   **Discogs 的 format 欄會錯**（第 782 條），**MB 的 `secondary-types` 兩個方向都會漏**。
   **判準只讀逐張文案與軌目來源，不讀標題、不看尾碼。**
3. ⚠ **現役藝人的掛名要照池中先例**（第 307 條）。這一段有 Cassandra Wilson、Joe Lovano、Greg Osby、
   Medeski Martin & Wood、Robert Glasper、Ambrose Akinmusire、Gregory Porter、Kandace Springs……
   **很多人池中已經有卡，掛名字串一定要沿用，絕不新造分裂。**
4. **非爵士 44 張與待判曲風 97 張不在你的清單裡**（列舉檔已排掉）——**撞到疑似非爵士的，退並寫進 rulings。**

## 二、年份：判準要換一套

**1985 後 MB 與 Discogs 的建檔品質比 1950–70 年代好得多，失效方式也不一樣。**

- **階序改成**：**廠牌新聞稿／同期紙本 ＞ 榜位 ＞ Discogs 原壓群 ＞ MB first-release-date ＞ 其他**。
- ⚠ **紙本的可得性在這一段是斷的**：
  - `batch-progress/enum/billboard-bn-1984h2-1985h1-ocr.txt`（43 期）與 `cashbox-bn-1984-85-ocr.txt`（44 期）
    只到 1985 年中。**1985 下半年起還沒有人掃。**
  - **Cash Box 1996 年停刊**——1996 後只剩 Billboard。
  - **Billboard 的 worldradiohistory 檔案到 2000 年代初就不完整**。
  **2000 年後的碟，紙本不是主要來源**：改用 **Discogs 原壓群（第 531 條）＋ 廠牌官網／新聞稿 ＋ AllMusic**，
  並在 `yearVerified` 寫明用的是哪一層。
- ⚠ **第 550／570／708 條仍然成立**：Discogs 的年份欄**會整群抄盤面 ℗© 年**、**也會與它自己的 notes 打架**。
- ⚠ **數位發行的年份與實體首發常常不同**——**`year` 取實體首發年**（若只有數位發行，取數位那次並在 risk 寫明）。
- ⚠ **日本首發**（BNJ／TOCJ／UCCQ 等）在這一段仍然很多，**首發地要自己核**（第 817 條：MB 會建出不存在的版本）。

## 三、逐筆要做的事（與前十三批相同的部分）

1. **回問 MB**：`release-group/<id>?inc=artist-credits` 與
   **`release?release-group=<id>&fmt=json&inc=media+labels+recordings+artist-credits&limit=100`**
   ——⚠ **第 642 條：MB 取不到某欄位時，先換一種端點組合再說「MB 沒有」**。
   **每秒最多 1 次請求**，UA 一律 `dip-vinyl-shop/1.0 (kubinice06@gmail.com)`，**503 不等於查無**，退避重試。
2. **實掃卡池**（`seed_cards.json` ＋ `desc-tools/batches/cards/c1*.json`）。
   ⚠ **第 611 條：`chk-prop` 標記 0 不等於沒撞卡**。已知五種盲區：群組掛名 vs 個人掛名、
   同名但不同盤的 Volume 碟、**MB 把同一張碟建成兩個 RG**、斜線掛名、同名但不同盤。
   ⚠ **第 409b／439 條**：`why` 寫「池中現有 N 張」要寫成「漢字 N／羅馬字 M／英文字串 K」並註明有沒有算進未上傳的批次。
3. **`releaseType`**：照 MB 原值寫，`live: true` 的收但要標。
4. **三種店面查法**（第 254 條）**只寫觀察不寫結論**。
   ⚠ **這一段店面命中率應該很高**（現役目錄），**但要逐軌核**——第 528／707／709／865 條：
   `apple-candidates.md` 的候選會給錯碟，**Apple 一個條目裡甚至可能混了三張碟**。
5. **撞陳列**（第 738／859 條）：**內容重疊要用軌目比對，而且要看到 CD／串流那一層**
   ——這一段的再發盤與精選盤特別容易與池中既有卡重疊。

## 四、續跑與交件

**每做完 5 筆就把 `prop-<組>.json` 整份寫回磁碟；開工先讀它，接續補完，不要從頭重寫。**
⚠ **第 315 條：`prop 筆數 ＋ rulings 退表筆數 = slice 筆數` 才算跑完。**
中間檔放 scratchpad 的批次專屬目錄（`c148a/` 這種），**不要放 repo 根目錄**（第 533 條）。

交件 `batch-progress/c1XX/prop-{a,b}.json`；裁定 append 進 `batch-progress/c1XX/rulings.md`，
**編號區間由派工信指定**。**退掉的逐筆列在 rulings，附理由分類。**
收工前跑 `node batch-progress/c1XX/chk-prop.mjs <組>`，**標記清成 0**。**不要 git commit／push。**
