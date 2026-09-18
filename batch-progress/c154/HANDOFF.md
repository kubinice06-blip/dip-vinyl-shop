# c-154 交接（2026-09-18）：Blue Note 1996–99（主體 1997–98），37 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

切片 45 張，**收 37 退 8**（a 組收 21 退 2、b 組收 16 退 6）。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 項目 | 狀態 |
|---|---|
| 身分（rgMbid 釘住） | **37/37，全部 pinned，零 §1 人工** |
| 三軸與頂點資格 | 卡單已帶，本機組 manifest 時照跑 |
| 固定簡介（desc） | **37/37 全 full**，out-1 220–239／out-2 229–240 |
| 封面 | **27/37**（缺 10，替代來源 10/10 全部查實） |
| 固定試聽／無來源狀態 | **34/37 有來源**，**3 張走固定無來源狀態** |
| §5.5／§5.6 例外欄位 | 本批無合輯，例外欄全空 |
| published gate | 本機端 |

## 三、⚠ 這一批最值得記的：兩張同三人同場地的現場盤，差在「年」

**《Alone Together》（b 組）與《Another Shade of Blue》（a 組）**
——**同三人、同場地（洛杉磯 Jazz Bakery）、同封面畫家、同錄音師**，
**但是不同年的兩個十二月檔期**，**6 軌對 5 軌零重疊**。

- **《Alone Together》的盤面只印「December 21 & 22」沒有年**（**美版 Discogs 自己寫「(1996?)」**）
  ——**以發行日 1997-10-23／11-04／11-27 早於 1997 年 12 月定死為 1996**；
  ⚠ **Billboard 1998-03-14 評介的「Recorded live last year」與發行日矛盾，不採信。**
- **《Another Shade of Blue》的盤面逐字 `12/21/1997`**，年份 **1999**。

⚠ **這一組推翻了研究 a 組先前的結論**（它曾認為兩張是同一批母帶）——**盤面逐字勝過紙本敘述。**

## 四、⚠ 第 611 條盲區表的新變形：原盤帶重音、翻唱盤不帶

**策展層寫「原盤不在池中」的兩筆都是錯的**：
- **Charlie Hunter《Natty Dread》↔ seed `Bob Marley & The Wailers —《Natty Dread》`(1974)**（catno 52420）
- **Fareed Haque《Deja Vu》↔ seed `Crosby, Stills, Nash & Young —《Déjà Vu》`(1970)**（catno 52419）

⚠ **CSNY 那筆掃不到的原因是「原盤帶重音、翻唱盤不帶」**（`Déjà Vu` vs `Deja Vu`）
——`dedup-crossbatch` 的折疊鍵有去重音，**但人工用盤名 grep 卡池時不會**。
⚠ **通則：翻唱整張專輯的碟一律要查池中有沒有原盤，而且要去重音再查。**

## 五、⚠ 編制：擋下 57 處，極端案例

**《All Sides Now》（Pat Martino）的 10 軌就是 10 組不同搭檔**，
**而美版 credits 漏了 Charlie Hunter／Lou Pallo／Jeff Hirshfield 三個人、製作人欄全空。**

其餘形狀：**Elling 的 Cassandra Wilson 只唱第 11 軌**（⚠ **軌號只有歐版有、美版是平的**）／
**Doky 的封面貼紙六個大名字各只上一軌**／**Silvano 的製作人 Lovano 第 8 軌打鼓、第 12 軌敲鑼**／
**Green《Kaleidoscope》六人掛名、沒有一軌六人全上**／**Irby 的 Charlie Persip 只打第 4 軌**／
**`Arranged By [Original]` 不能讀成「被請回來重做」**／**主唱與合聲要分清**／
**「八軌全是某人的曲」要逐軌查**／**Apple 的曲名會對調（要用長度才判得出來）**／
**年齡要用 MB life-span 算**（Konitz 錄音時 69 歲不是 70 歲）。

⚠ **第 1281 條：Discogs 的 credits 空白只代表「那一版的條目空白」**
——**《Being Myself》美版 `10222154` 全空，歐版 `6844541` 完整**，寫作層因此可以寫人名。

## 六、其他要記的

- ⚠ **《Bemsha Swing》是雙片 CD**（Disc1 五軌／Disc2 四軌），**卡單與策展層都沒寫**；
  **兩片的分法與錄音的兩晚對不起來**（2/26 ＝ Disc2 全部 ＋ Disc1 第 1 軌）。
- ⚠ **《Fire & Love》歐版是七軌不是九軌**；
  **Eriksen《Standards》的「德版 14 軌」第 14 軌是一段 2:11 的未命名隱藏軌**，不是兩種剪輯。
- ⚠ **《Live in Australia, 1959》的「最高第 2」證實不了**——**實見最高 #3**（兩期名次欄被 OCR 吃掉），
  **正文寫「前三名」**；在榜 33 週、跨 1997–98、年終榜 #14。
- ⚠ **黑膠在同一個系列內就分歧**：**Charlie Hunter《Natty Dread》有英國原壓 LP `85424201`**
  ——**本批 37 張唯一一張**；**同系列的《Deja Vu》只有 CD ＋宣傳卡帶。**
- ⚠ **MB 的 `status: Promotion` 本身也會錯**：**《Rendezvous》日版 `TOCJ-6096` 被標 Promotion，
  Discogs 描述的卻是帶 obi、28 頁內頁、Swing Journal 推薦章的零售盤**，`released` 1997-08-20，
  **早於美版約兩週**——**首發地兩說並陳。**
- ⚠ **CAA 要逐張重探**：研究層對 16 張重探 `/front`，**12 個 200、4 個 404**
  ——**其中 Osby《Zero》策展層寫「三試皆 404」，實測 RG 層回 200。**

## 七、本機端待辦

1. **上傳 37 張。**
2. **封面缺 10 張**，替代來源已逐張寫在研究層 `notes`（含 release 號、圖數與 primary 尺寸）：
   Shaw《Bemsha Swing》Discogs **4634162**（594×599）／Osby《Further Ado》**793049**（596×600）／
   Eriksen **1811197**（600×597，15 圖）／Silvano《Vocalise》**3276344**（590×600）／
   Haque《Deja Vu》**2631617**（593×600）／Harp《What's Going On》**2389140**（600×596）／
   Irby《Big Mama's Biscuits》**2166020**（600×598）／
   Cortés《Veneno》**10548990**（US Metro Blue 宣傳盤，600×523；
   ⚠ **古巴原盤 12789383 唯一一圖是 secondary 225×225、歐版 13101771 primary 僅 355×355**）／
   ⚠ **Irby《Full Circle》Discogs 兩筆 `images[0]` 全是 secondary，走 Apple `1462110730` 的 `600x600bb`**／
   ⚠ **Shim《Mind Over Matter》Discogs 三個條目全無可用 primary**（**其中一筆的 primary 是卡帶殼照片**），
   **走 Apple `1763274447` 的 `600x600bb`。**
3. **試聽無來源 3 張**：Ron Carter《The Bass and I》（**全組唯一店面完全查不到的**）、
   Sarah Vaughan & Lester Young《One Night Stand》、Frank Sinatra《Live in Australia, 1959》。
4. ⚠ **上架要帶 catno 的**：Eriksen《Standards》**53325**（池中 5 張同名卡）／
   Green《Kaleidoscope》**52037**（撞 Kelis 1999）／Irby《Full Circle》**52251**／
   **Doky Brothers《2》8564582**（**盤名「2」撞 Mac DeMarco／Pole，本組最容易在店面撞的字串，
   必須帶掛名**）／Irby《Big Mama's Biscuits》**56234**（**寫作層因字數沒帶進正文**）／
   Prysm《Second Rhythm》**`493565 2`**（**首作 1998 年被 Blue Note 法國分部重發、同年同廠**）。
