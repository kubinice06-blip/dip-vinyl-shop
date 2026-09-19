# Blue Note 1985 後線・列舉層缺口稽核（**藝人軸**重掃）

> **已掃 541／541 位藝人**（藝人＝MB artist MBID，由本線 1,231 個已知 release-group 精確反解，不是字串比對，因此沒有同名實體問題）。
> **Discogs 覆核 147／1,025 筆**（MB 兩端都查不到 Blue Note 廠牌的候選）。
> 生成：2026-09-19　狀態：**覆核未跑完，逐筆詳見第五節**

> ⚠ **「筆數對了」不等於「定稿了」（第 1803-B 條）——工作區當下版本才是交件版。**

本檔回答的問題與 `enum/blue-note.json` 不同：**該檔以廠牌（label）為軸產生，一筆 `label-info` 為空的 MB release，label 軸永遠碰不到，那個 release-group 就整個不在列舉檔裡（c-170 第 2356 條）。** 本檔改以**藝人**為軸重掃同一個宇宙，找出這一類漏網碟。

---

## 一、方法

1. **藝人宇宙**：取 `batch-progress/c1[4-7]*/slice.json`（c-148～c-170，共 23 個 slice、624 列）＋`desc-tools/batches/cards/c1[4-7]*-cards.json`（31 個卡單）的 `artist` 欄，再加 `seed_cards.json`（唯讀）中與 `enum/blue-note.json` 1985 年後列對得上的卡，取聯集去重。⚠ **`seed_cards.json` 實際上沒有 `label`／`scene` 欄位**（它是 7／8／9 元素的緊湊陣列 `[artist, album, a, b, c, genres, year, (composer), (hall)]`）——派工信第二節第 3 點的敘述與檔案不符，本層改用「seed 的 (artist, album) 能對到 `enum/blue-note.json` 且該列 `year >= 1985`」作等效替代（第 2483 條）。
2. **藝人 MBID 解析不走 `artist?query=`**：本線每一列都帶 `rgMbid`，改用 `release-group?query=rgid:(A OR B OR …)`（每批 20 個）把 1,231 個已知 release-group 的 `artist-credit` 整批反解，**直接拿到 artist MBID**。這樣**完全避開同名實體問題**（派工信舉的 `Joel Ross` `6d09039b` US vibraphonist ／ `02f84b16` pianist 之分，本法不需要靠 `type`＋`disambiguation` 猜）。1,231 個 RG **全數解析成功、0 筆落空**，得到 **541 個相異 artist MBID**（第 2482 條）。
3. **藝人軸列舉**：對每個 artist MBID 打 `release-group?artist=<id>&type=album&fmt=json&limit=100`（含分頁），取 `first-release-date >= 1985`、且 secondary-type 不含 Compilation／Soundtrack／DJ-mix／Remix／Spokenword 的（與列舉檔同一組條件）。
4. **四處比對**：`enum/blue-note.json`（1,812 列）、**全部** `batch-progress/c*/slice.json`、**全部** `desc-tools/batches/cards/c*-cards.json`、`seed_cards.json`（17,248 列），另加 `batch-progress/c*/prop-*.json` 當補充層。命中條件＝`rgMbid` 相同，或（正規化藝人名, 正規化盤名）相同。
5. **Blue Note 家族判定**：對四處都沒有的，打 `release?query=rgid:(…)`（每批 15 個）取 `label-info`。`Blue Note Compagnie`（`BNS-` 目錄號）與 `Blue Note Digital`（MB label `0293ae5c`）**不算家族**。**`label-info` 空的正是本次要找的那一種**，改查 Discogs（`api.discogs.com` 無需授權可讀）的廠牌鏈與目錄號。
6. MusicBrainz UA 一律 `dip-vinyl-shop/1.0 (kubinice06@gmail.com)`，節流 1 req/1.15s，503 走指數退避重試（不視為查無）。

---

## 二、整體結論（**先看這一節**）

| 量 | 數 |
|---|---:|
| 藝人宇宙（相異 MB artist MBID） | **541** |
| 由已知 release-group 反解、全數解析成功 | 1,231 ／ 1,231 |
| 藝人軸看到的 1985 年後 Album（扣掉 secondary-type／無日期後） | **8,937** |
| 其中以 `rgMbid` 命中四處既有資料 | 1,128 |
| 其中以（藝人, 盤名）命中 | 176 |
| **四處都沒有、進入 Blue Note 家族判定的相異 RG** | **7,184** |
| ├ MB 掛著非 Blue Note 廠牌（整批篩掉） | 6,159 |
| ├ MB `label-info` 全空 | 609 |
| ├ MB `label-info` 部分空 | 416 |
| └ **MB 掛著 Blue Note 家族廠牌卻不在列舉檔裡** | **0** |

### ⚠ 最重要的一條：**`bn-label-present` 掛零**

**7,184 個候選裡，沒有任何一個「MB 上掛著 Blue Note 家族廠牌」的 release-group 被列舉檔漏掉。**

也就是說 —— **`enum/blue-note.json` 的 label 軸，對「MB 那一端有把 Blue Note 填上去」的碟是完整的，它唯一的盲區就是 MB 那一端沒填**。這把 c-170 第 2356 條的推測收斂成一句可操作的結論：**改軸要補的不是「label 軸漏抓」，而是「MB 的 `label-info` 殘缺」**，因此 `release-group?inc=genres+tags` 重跑補不到、**只有藝人軸（或 Discogs 反查）補得到**。

### verdict 分佈

| verdict | 筆 |
|---|---:|
| `gap` | 6 |
| `unclear` | 876 |
| `not-blue-note` | 143 |
| `already-covered` | 0 |
| **逐筆裁定合計** | **1025** |

⚠ **另有 6,159 筆 `other-label-only` 是整批篩掉的，不逐筆裁定**——它們的 MB `label-info` 明確掛著非 Blue Note 廠牌（Polydor、ECM、Verve、Concord……），**不是「查不到」而是「查到別家」**。完整清單在本檔 JSON 版的 `screened.otherLabelOnly`。

### `gap` 的「列舉檔碰不到」成因分類

| 成因 | 筆 |
|---|---:|
| `label-info` 空 | 5 |
| MB 掛成母公司 `Capitol Records`＋另一筆 `label-info` 空 | 1 |

---

## 三、`gap` 逐筆

### 1. Don Pullen & The African-Brazilian Connection《Ode to Life》(1993) — **`gap`**

- **RG MBID**：`9ea8ad16-cfbb-382c-a4d9-b1382208cfff`
- **artist MBID**：`5f633e7f-12d1-4a91-a304-03275a144c16`
- **為什麼列舉檔碰不到它**：`label-info` 空
- **實查**：MB 這個 release-group 有 1 筆 release，其中 1 筆 `label-info` 為空；非空者掛的是 （無）——**沒有一筆掛 Blue Note 家族實體，所以以 label 為軸的列舉腳本碰不到它**。Discogs 則明確把它記在 Blue Note 名下。
- **佐證**：
  - MB release-group：https://musicbrainz.org/release-group/9ea8ad16-cfbb-382c-a4d9-b1382208cfff（`first-release-date` 1993、`primary-type` Album）
  - MB release `bbdd3b03-903c-4805-936b-ef3efd6a121c`（1993、US）——**`label-info` 逐字為空陣列 `[]`**
  - **Discogs release 3981313**：https://www.discogs.com/release/3981313-Don-Pullen-The-African-Brazilian-Connection-Ode-To-Life——`label` 逐字 `['Blue Note', 'Blue Note', 'BMG Direct Marketing, Inc.', 'BMG Direct Marketing, Inc.', 'Capitol Records, Inc.', 'Capitol Records, Inc.', 'Capitol Records, Inc.', 'Sonopress USA', 'Sorcerer Sound', 'DB Plus', 'Andredon Music', 'Dogo Music', 'Lito Publishing']`、`catno` 逐字 `D 125428`、US 1993 CD／Album／Club Edition
  - **Discogs release 4692547**：https://www.discogs.com/release/4692547-Don-Pullen-The-African-Brazilian-Connection-Ode-To-Life-A-Tribute-To-George-Adams——`label` 逐字 `['Blue Note', 'Capitol Records, Inc.', 'Capitol Records, Inc.', 'Capitol Records, Inc.', 'Sorcerer Sound', 'DB Plus', 'Andredon Music', 'Dogo Music', 'Lito Publishing']`、`catno` 逐字 `CDP 0777 7 89233 2 9`、US 1993 CD／Album
  - **Discogs release 25730341**：https://www.discogs.com/release/25730341-Don-Pullen-The-African-Brazilian-Connection-Ode-To-Life-A-Tribute-To-George-Adams-%E5%A4%AA%E9%99%BD%E3%81%AE%E8%AE%83%E6%AD%8C%E3%82%B8——`label` 逐字 `['Blue Note', 'Capitol Records, Inc.', 'Capitol Records, Inc.', 'Toshiba EMI Ltd', 'Sorcerer Sound', 'DB Plus', 'Andredon Music', 'Dogo Music', 'Lito Publishing']`、`catno` 逐字 `TOCJ5834`、Japan 1993 CD／Album／Promo
  - 四處比對結果：`enum/blue-note.json`、全部 `c*/slice.json`、全部 `c*-cards.json`、`seed_cards.json` 皆 0 筆（以 `rgMbid` ＋（正規化藝人名, 正規化盤名）兩種鍵逐列比對）
- **判定**：**`gap`**　**真缺口**：Discogs 廠牌鏈＋目錄號確認為 Blue Note 家族發行，四處皆無。

### 2. Dianne Reeves《That Day…》(1997) — **`gap`**

- **RG MBID**：`bb230b81-f930-3b99-9d16-9df70f85ea6a`
- **artist MBID**：`069c1f30-fd2a-4342-924a-cca7c605807f`
- **為什麼列舉檔碰不到它**：`label-info` 空
- **實查**：MB 這個 release-group 有 1 筆 release，其中 1 筆 `label-info` 為空；非空者掛的是 （無）——**沒有一筆掛 Blue Note 家族實體，所以以 label 為軸的列舉腳本碰不到它**。Discogs 則明確把它記在 Blue Note 名下。
- **佐證**：
  - MB release-group：https://musicbrainz.org/release-group/bb230b81-f930-3b99-9d16-9df70f85ea6a（`first-release-date` 1997-11-04、`primary-type` Album）
  - MB release `afd34c7a-6ed4-4346-bd5a-e3c32f9fc08f`（1997-11-04、US）——**`label-info` 逐字為空陣列 `[]`**
  - **Discogs release 3268377**：https://www.discogs.com/release/3268377-Dianne-Reeves-That-Day——`label` 逐字 `['Blue Note', 'Capitol Records, Inc.', 'Capitol Records, Inc.', 'Capitol Records, Inc.', 'Capitol Mastering']`、`catno` 逐字 `CDP 7243 8 56973 2 6`、US 1997 CD／Album
  - **Discogs release 3905548**：https://www.discogs.com/release/3905548-Dianne-Reeves-That-Day——`label` 逐字 `['Blue Note', 'EMI', 'Capitol Records, Inc.', 'Capitol Records, Inc.', 'EMI Uden', 'Capitol Mastering']`、`catno` 逐字 `7243 8 56973 2 6`、Europe 1997 CD／Album
  - **Discogs release 8708791**：https://www.discogs.com/release/8708791-Dianne-Reeves-That-Day——`label` 逐字 `['Blue Note', 'Capitol Records, Inc.', 'Capitol Records, Inc.', 'Columbia House']`、`catno` 逐字 `CDP 556973`、Canada 1997 CD／Album／Club Edition
  - 四處比對結果：`enum/blue-note.json`、全部 `c*/slice.json`、全部 `c*-cards.json`、`seed_cards.json` 皆 0 筆（以 `rgMbid` ＋（正規化藝人名, 正規化盤名）兩種鍵逐列比對）
- **判定**：**`gap`**　**真缺口**：Discogs 廠牌鏈＋目錄號確認為 Blue Note 家族發行，四處皆無。

### 3. Brian Blade Fellowship《Brian Blade Fellowship》(1998) — **`gap`**

- **RG MBID**：`20765029-3ac1-3dae-bc61-76eefcf58e32`
- **artist MBID**：`ad45a94c-8afb-4091-afc4-829b6d52c3c1`
- **為什麼列舉檔碰不到它**：`label-info` 空
- **實查**：MB 這個 release-group 有 1 筆 release，其中 1 筆 `label-info` 為空；非空者掛的是 （無）——**沒有一筆掛 Blue Note 家族實體，所以以 label 為軸的列舉腳本碰不到它**。Discogs 則明確把它記在 Blue Note 名下。
- **佐證**：
  - MB release-group：https://musicbrainz.org/release-group/20765029-3ac1-3dae-bc61-76eefcf58e32（`first-release-date` 1998、`primary-type` Album）
  - MB release `724df581-74c0-45ca-bee4-b8becf26643b`（無日期）——**`label-info` 逐字為空陣列 `[]`**
  - **Discogs release 12144726**：https://www.discogs.com/release/12144726-Brian-Blade-Fellowship-Brian-Blade-Fellowship——`label` 逐字 `['Blue Note', 'Toshiba EMI Ltd', 'Toshiba EMI Ltd', 'Capitol Records, Inc.', 'Capitol Records, Inc.']`、`catno` 逐字 `TOCJ-6192`、Japan 1998 CD／Album／Promo
  - **Discogs release 2414197**：https://www.discogs.com/release/2414197-Brian-Blade-Fellowship-Brian-Blade-Fellowship——`label` 逐字 `['Blue Note', 'Blue Note', 'Capitol Records, Inc.', 'Capitol Records, Inc.', 'Capitol Records, Inc.', 'Middle Way Music, Inc.', "The Colonel's Music", 'The Teatro, Oxnard, California', 'The Teatro, Oxnard, California', 'Masterdisk', 'EMI MFG.']`、`catno` 逐字 `7243 8 59417 2 6`、US 1998 CD／Album
  - **Discogs release 37798677**：https://www.discogs.com/release/37798677-Brian-Blade-Fellowship-Brian-Blade-Fellowship——`label` 逐字 `['Blue Note', 'EMI MFG.']`、`catno` 逐字 `CDP 7243 8 59417 2 6 V`、US 1998 CD／Advance／Album／Promo
  - 四處比對結果：`enum/blue-note.json`、全部 `c*/slice.json`、全部 `c*-cards.json`、`seed_cards.json` 皆 0 筆（以 `rgMbid` ＋（正規化藝人名, 正規化盤名）兩種鍵逐列比對）
- **判定**：**`gap`**　**真缺口**：Discogs 廠牌鏈＋目錄號確認為 Blue Note 家族發行，四處皆無。

### 4. Bill Charlap《Love Is Here to Stay》(2005) — **`gap`**

- **RG MBID**：`6820c0ec-085b-4a2f-ab50-ac941198f509`
- **artist MBID**：`85cc88c3-f595-463a-8674-a54a6891eaa9`
- **為什麼列舉檔碰不到它**：`label-info` 空
- **實查**：MB 這個 release-group 有 1 筆 release，其中 1 筆 `label-info` 為空；非空者掛的是 （無）——**沒有一筆掛 Blue Note 家族實體，所以以 label 為軸的列舉腳本碰不到它**。Discogs 則明確把它記在 Blue Note 名下。
- **佐證**：
  - MB release-group：https://musicbrainz.org/release-group/6820c0ec-085b-4a2f-ab50-ac941198f509（`first-release-date` 2005、`primary-type` Album）
  - MB release `6b65b194-994a-4e48-90f5-f63ffbe04583`（無日期）——**`label-info` 逐字為空陣列 `[]`**
  - **Discogs release 5992975**：https://www.discogs.com/release/5992975-Sandy-Stewart-2-Bill-Charlap-Love-Is-Here-To-Stay——`label` 逐字 `['Blue Note']`、`catno` 逐字 `7243 5 600341 2 9`、Thailand 2005 CD／Album／Copy Protected
  - **Discogs release 10351326**：https://www.discogs.com/release/10351326-Bill-Charlap-Sandy-Stewart-Love-Is-Here-To-Stay——`label` 逐字 `['Blue Note']`、`catno` 逐字 `7243 5 60340 2 0V`、US 2005 CD／Album／Copy Protected／Promo
  - **Discogs release 8390356**：https://www.discogs.com/release/8390356-Sandy-Stewart-2-Bill-Charlap-Love-Is-Here-To-Stay——`label` 逐字 `['Blue Note']`、`catno` 逐字 `7243 5 60340 2 0`、US 2005 CD／Album
  - 四處比對結果：`enum/blue-note.json`、全部 `c*/slice.json`、全部 `c*-cards.json`、`seed_cards.json` 皆 0 筆（以 `rgMbid` ＋（正規化藝人名, 正規化盤名）兩種鍵逐列比對）
- **判定**：**`gap`**　**真缺口**：Discogs 廠牌鏈＋目錄號確認為 Blue Note 家族發行，四處皆無。

### 5. Joel Ross《KingMaker》(2019) — **`gap`**

- **RG MBID**：`6cd0a509-b96a-40cc-a807-7b6025bc2a99`
- **artist MBID**：`6d09039b-3e1f-49ef-b8e3-b8b7267a8578`（Person／US vibraphonist）
- **為什麼列舉檔碰不到它**：`label-info` 空
- **實查**：MB release `0d190bc8-5715-41b9-8968-ec3d32b2ef9b`（2019-05-03、US、title 逐字 `KingMaker`）是這個 release-group **唯一**的 release，實查 `label-info` 逐字為空陣列 `[]`。`enum/blue-note.json` 是以 label 為軸把 Blue Note 的 release 拉完再折成 RG 的，**一筆沒有 `label-info` 的 release，label 軸永遠碰不到**，該 RG 就整個不在 1,812 列裡——因此曲風重掃、`inPool`、`chk-prop`、`dedup-crossbatch` 沒有一個會亮。
- **佐證**：
  - MB release-group：https://musicbrainz.org/release-group/6cd0a509-b96a-40cc-a807-7b6025bc2a99（`first-release-date` 2019-05-03、`primary-type` Album、`secondary-types` 空）
  - MB release：https://musicbrainz.org/release/0d190bc8-5715-41b9-8968-ec3d32b2ef9b——`release?query=rgid:6cd0a509…` 回傳 `label-info: []`（**實查複驗，與 c-170 第 2356 條一致**）
  - **Discogs release 13619280**：https://www.discogs.com/release/13619280-Joel-Ross-3-KingMaker——`labels` 逐字 `[{"name":"Blue Note","catno":"B003003802","entity_type_name":"Label"}]`、US 2019 CD Album、barcode 602577555282、`companies` 為 UMG Recordings, Inc.（(p)＋(c)）、Brooklyn Recording（Recorded At）；Discogs master 1589139。**目錄號 `B003003802` 是 Blue Note／UMe 的正規美版形制，不是 `BNS-`（Blue Note Compagnie）**。
  - **bluenote.com Joel Ross 藝人頁**：https://www.bluenote.com/artist/joel-ross/——逐字列出五張 Blue Note 專輯 `KingMaker`(2019)／`Who Are You?`(2020)／`The Parable of the Poet`(2022)／`nublues`／`Gospel Music`(2026)，**本線只有後四張**。
  - 四處比對結果：`enum/blue-note.json` 的 `Joel Ross` 只有四筆、無 `KingMaker`；全部 `c*/slice.json`、全部 `c*-cards.json`、`seed_cards.json` 亦 0 筆。
- **判定**：**`gap`**　**真缺口**：Blue Note 正廠家族發行（Discogs 廠牌鏈＋目錄號＋官網藝人頁三重佐證），四處皆無。

### 6. Kendrick Scott Oracle《A Wall Becomes a Bridge》(2019) — **`gap`**

- **RG MBID**：`c8f8ec1c-1899-4495-a6a1-57a555df47c8`
- **artist MBID**：`71d3da26-aafb-4e29-9159-a4ae9cf4ae9f`（Group）
- **為什麼列舉檔碰不到它**：MB 掛成母公司 `Capitol Records`＋另一筆 `label-info` 空
- **實查**：⚠ **派工信第三節把這一張列為「已排除的一筆」，理由是「它在 `desc-tools/batches/cards/c166-cards.json` 裡」——實查不成立。** 全部 `c*/slice.json`、全部 `c*-cards.json`、`enum/blue-note.json`、`seed_cards.json` 逐列比對，**沒有任何一筆記錄的 `album` 等於這張碟**；`c166-cards.json` 裡出現的那一次，是**別張卡的 `label` 敘述文字裡引用到它**（逐字「The anticipated follow-up to A Wall Becomes A Bridge, Scott’s much-lauded 2019 release with his band Oracle」），不是一筆卡。`c169/prop-b.json` 那一次同樣是 `curatorWhy` 的引文。**這是第 611 條「盤名撞字串不等於撞卡」的反向形：字串命中被誤讀成卡片存在。**

根因也與 `KingMaker` 不同：MB 這個 RG 有**兩筆** release——`eef85a5d` 的 `label-info` 掛的是 **`Capitol Records`（MB label `abea2d3e`，母公司，不是 Blue Note imprint）**、`ac837ebb`（2019-04-05、US）的 `label-info` 是**空陣列**。**兩筆都不掛 Blue Note 家族實體，所以 label 軸一樣碰不到。**
- **佐證**：
  - MB release-group：https://musicbrainz.org/release-group/c8f8ec1c-1899-4495-a6a1-57a555df47c8（`first-release-date` 2019-04-05、`primary-type` Album、`secondary-types` 空）
  - MB release `eef85a5d-7efc-4baf-bf61-d604cce54215`——`label-info` 逐字 `Capitol Records`／catno `null`，barcode `602577492068`（UMG 段）
  - MB release `ac837ebb-d3ca-4cf3-a9b4-ccc43bd5de9a`（2019-04-05、US）——`label-info` 逐字 `[]`
  - **Discogs**（`api.discogs.com/database/search`，`artist=Kendrick Scott Oracle`＋`release_title=A Wall Becomes A Bridge`）**回 1 筆**：US 2019 CD Album、`label` 逐字 `["Blue Note"]`、`catno` 逐字 `774920 6`
  - 四處比對結果：`enum/blue-note.json`、全部 `c*/slice.json`、全部 `c*-cards.json`、`seed_cards.json` 皆 **0 筆**（以正規化盤名逐列比對，不是 grep）
  - 旁證：c-169 b 第 2208 條與 c-170 第 2356(四) 條都把這一張列為「給主線的回頭查」，**本層確認它們是對的、派工信的排除是錯的**
- **判定**：**`gap`**　**真缺口**，且與 `KingMaker` 是**不同成因**（母公司掛名＋空 label-info，而非單純空 label-info）。

---

## 四、`unclear`（未覆核）逐筆

共 **876** 筆：MB 兩端都沒有 Blue Note 廠牌可判，Discogs 覆核在本層時間內沒跑到。**這些不是「判為不是 Blue Note」，是「還沒判」**——接手的人請從這張表往下跑。

| 藝人 | 盤名 | 年 | RG MBID | MB 形狀 |
|---|---|---:|---|---|
| Aaron Neville | Believe | 2003 | `aa2430c1-e690-38d6-8c6f-7b136649925e` | label-info 部分空 |
| Al Green | He Is the Light | 1985 | `32922e5a-2a87-331d-98c8-029f64bbd1ba` | label-info 部分空 |
| Alphonse Mouzon | As You Wish | 1989 | `b70bee1d-30d3-4562-ad2b-3aaf6ce43984` | label-info 部分空 |
| Amsterdam Sinfonietta | Clarinet Concerto & Quintet | 2003 | `81e004a5-fc61-3923-8671-06f34f9de54b` | label-info 部分空 |
| André Ceccarelli | Django ! | 2024 | `66bc16ba-9325-4a2d-9bd7-bd54ed6986c2` | label-info 部分空 |
| André Manoukian | Anouch | 2022 | `aea859f2-d6f9-47f6-bf9c-3cb67d73eac8` | label-info 部分空 |
| Andy Sheppard | Lyrisme | 2000 | `aabda44a-77ec-3b17-8009-5744a804d6e7` | label-info 部分空 |
| Annie Lennox | MTV Unplugged | 1992 | `0aead118-be59-4580-9d0f-387310e092ce` | label-info 部分空 |
| Annie Lennox | 1992-07-03: Casino Barrière de Montreux, Montreux, Switzerland | 1992 | `76f3afb0-4f3c-3013-a6a7-7b15b23dcbe9` | label-info 部分空 |
| Annie Lennox | A Christmas Cornucopia | 2010 | `b47cd518-7c4a-4da5-a133-a39af4da417f` | label-info 部分空 |
| Annie Lennox | Live in Central Park | 2026 | `e324d31a-ff16-4d78-9ec1-db76d7fe2b00` | label-info 部分空 |
| Art Blakey | Ritual: The Modern Jazz Messengers | 1988 | `15c9d18c-3a11-38dc-8dfd-ea276a27ece5` | label-info 部分空 |
| Art Blakey & The Jazz Messengers | Au Club Saint-Germain | 1990 | `67b95dd3-2754-4607-a4f0-c497650882db` | label-info 部分空 |
| Art Farmer | Ph.D. | 1989 | `1be89e7f-64b8-3de3-ab50-606053210453` | label-info 部分空 |
| Art Pepper | Among Friends | 1988 | `16cc7391-d443-4938-b2c5-a87b2e5a44cb` | label-info 部分空 |
| Art Pepper | Art Pepper Today | 1990 | `cb4d5cc5-c9c0-3684-a700-6c11c47ddf3c` | label-info 部分空 |
| Art Pepper | One September Afternoon | 1991 | `89001d8f-c533-35b0-a3bc-bb3563ac53c6` | label-info 部分空 |
| Arturo O’Farrill | Familia: Tribute to Bebo + Chico | 2017 | `267ed083-b323-4fbb-80d9-dd6020de9ee7` | label-info 部分空 |
| Avishai Cohen | Continuo | 2006 | `9184e4d1-ff05-3cd6-9d1d-dcfd797dbce5` | label-info 部分空 |
| Avishai Cohen | Sea Inside | 2007 | `94f9edca-25ea-4b95-a36f-78e6953035a4` | label-info 部分空 |
| Avishai Cohen | שעות רגישות | 2009 | `d4fda981-5438-4590-84f4-5beeb9820c1f` | label-info 部分空 |
| Ben l’Oncle Soul | Live Paris | 2011 | `eba16b48-5a6e-4d31-972f-310226cdbe2c` | label-info 部分空 |
| Benny Golson | This Is for You John | 1987 | `c052853a-74a5-4fef-8146-71ebb1db8239` | label-info 部分空 |
| Benny Golson | The Curtis Fuller Jazztet | 1991 | `99e7c306-2578-3316-8f12-7fafe89f0e8a` | label-info 部分空 |
| Benny Golson | California Message | 1995 | `3d771f27-e48a-413f-946e-8efe1bc9737f` | label-info 部分空 |
| Bill Charlap | Bill Charlap Plays George Gershwin | 2005 | `4bea5b5d-cc8f-32f2-a045-cf2f2f0a6448` | label-info 部分空 |
| Bill Evans | Jazzhouse | 1987 | `5a302c25-ef92-3471-b537-d41615b4d7c0` | label-info 部分空 |
| Bill Evans | You're Gonna Hear From Me | 1988 | `d9afddb4-e03f-31f6-b308-f40d5e2dbc23` | label-info 部分空 |
| Bill Evans | Push | 1994 | `36f7cb3b-6a4b-3b3c-9936-36818c556d91` | label-info 部分空 |
| Bill Evans | Live in Europe | 1995 | `12537215-4248-3915-a730-b6df850f9229` | label-info 部分空 |
| Bill Evans | Escape | 1996 | `5717e17b-a891-3522-a40c-96afbdf0b959` | label-info 部分空 |
| Bill Evans | Starfish & the Moon | 1997 | `726aba42-61e6-397b-92e1-85c1b58dc047` | label-info 部分空 |
| Bill Evans | From Left to Right | 1998 | `b3131d27-2b9d-357f-b348-d17e4945e66a` | label-info 部分空 |
| Bill Evans | Touch | 1999 | `3b197e9e-6117-345b-b450-63b42906e6db` | label-info 部分空 |
| Bill Evans | Soul Insider | 2000 | `48806d8e-e9fb-31d5-8e7c-5c8a08c5dceb` | label-info 部分空 |
| Bill Evans | Big Fun | 2002 | `bb283b2e-ee5e-302b-8a6d-6fab04246772` | label-info 部分空 |
| Bill Evans | A Day in New York | 2003 | `d447abc0-2cbf-3386-8a67-b7846ce6af4b` | label-info 部分空 |
| Bill Evans | Soul Bop Band Live | 2005 | `b0e6821e-fffd-34bd-9a6e-642eaea851b8` | label-info 部分空 |
| Bill Evans | Theme From The V.I.P.s and Other Great Songs | 2008 | `74c14087-81d9-312f-bcd9-f80ba854ba8a` | label-info 部分空 |
| Bill Frisell | The Sweetest Punch | 1999 | `c2b1897f-ba3a-3958-b571-c0fcae9cddb4` | label-info 部分空 |
| Bill Frisell | Petra Haden and Bill Frisell | 2003 | `c363e2e2-4a47-3c58-b0e8-c1f98cc671c4` | label-info 部分空 |
| Bill Frisell | Further East / Further West | 2005 | `8afdabcf-4492-44fa-9806-8914d8a05db7` | label-info 部分空 |
| Bill Frisell | RICHTER 858 | 2005 | `b8656118-0a43-3408-a091-63f039700883` | label-info 部分空 |
| Bill Holman | Satin Nights | 1986 | `5e5caa2c-c731-461c-8513-4ee503bc6dc3` | label-info 部分空 |
| Bill Stewart | Swallow Tales | 2020 | `6f493572-3ac8-42cb-b871-0568e65690dc` | label-info 部分空 |
| Billy Hart | First Sight | 1991 | `d4524465-5689-4bfd-93b3-a9ed2fffa509` | label-info 部分空 |
| Biréli Lagrène | Duet | 1999 | `dc470e52-36da-328c-beeb-57a8d61afb74` | label-info 部分空 |
| Biréli Lagrène | Loco Cello - Tangorom | 2023 | `3b30e3d6-869a-4bbb-a2d5-0442715377cc` | label-info 部分空 |
| Bobby Hutcherson | Acoustic Masters II | 1994 | `2a76fa43-2658-325d-a997-b7cb21a93e7f` | label-info 部分空 |
| Booker Ervin | Down in the Dumps | 1986 | `1857ac88-030b-466e-820e-18d0f283daa5` | label-info 部分空 |
| Booker Ervin | Legends of Acid Jazz | 1996 | `a4c2025c-1c91-386c-b73d-f0bb493ae370` | label-info 部分空 |
| Brad Mehldau | Umbria Jazz 1999 | 1999 | `9c58c24f-1f69-4b40-8861-58fea5cbef9c` | label-info 部分空 |
| Brad Mehldau | Elegiac Cycle | 1999 | `b5831c2f-bb40-387e-85a9-f56a7499185e` | label-info 部分空 |
| Brad Mehldau | Live in Tokyo | 2004 | `7f62956a-fd75-3f94-a66a-151f2c67682e` | label-info 部分空 |
| Brad Mehldau | Chris Thile & Brad Mehldau | 2017 | `1abf2a8b-e7b3-4014-9241-a6a4c2ee60bd` | label-info 部分空 |
| Brian Blade | Children of the Light | 2015 | `cfcd661b-6200-497a-b310-b269757f8e00` | label-info 部分空 |
| Brian Blade | Trilogy 2 | 2018 | `e81026e1-99a1-4cb2-b729-7f0ee28fbad8` | label-info 部分空 |
| Brussels Philharmonic | Romantic Suites | 2017 | `2069dad2-d213-44a8-a88c-f12254f58b9b` | label-info 部分空 |
| Candido | Brujeias De Candido | 2004 | `d7584377-2a24-3794-b22a-30a3d8b03fb3` | label-info 部分空 |
| Carlos “Patato” Valdés | Masterpiece | 1993 | `98f30ce3-cb97-310c-995d-db0d0c824875` | label-info 部分空 |
| Carlos “Patato” Valdés | Único y diferente | 2000 | `2fcbc6ca-6578-396e-9ff7-75e4f9586b85` | label-info 部分空 |
| Carmen McRae | As Time Goes By: Carmen McRae Alone Live at the Dug | 1987 | `b89a9776-d684-35a6-82d1-5c35acd447c5` | label-info 部分空 |
| Carmen McRae | Live at Bubba's | 1988 | `e95ac19c-f65f-3bb3-be1f-383fbe646541` | label-info 部分空 |
| Carmen McRae | Ms. Jazz | 1990 | `18c8d6af-a068-42d4-8a64-3987bfa9f060` | label-info 部分空 |
| Carmen McRae | The Carmen McRae and Betty Carter Duets | 1996 | `215125e5-3d7d-3b11-a834-49b7fdd05c7e` | label-info 部分空 |
| Carmen McRae | In London | 1999 | `21bc10e3-a20b-318e-8e83-7d0abf9345be` | label-info 部分空 |
| Charles Lloyd | Notes From Big Sur | 1991 | `3a3c0b8a-2a4e-437a-bf74-92e5df8f1049` | label-info 部分空 |
| Charles Lloyd | Acoustic Masters I | 1994 | `f9b951bb-fd34-3036-9415-0ac10d661c47` | label-info 部分空 |
| Charles Pasi | Uncaged | 2009 | `94c7fb8d-c745-4f6b-ab97-14798b0344c5` | label-info 部分空 |
| Charlie Haden | Quartet West | 1987 | `9f97020f-e3a5-36fb-8ced-e71d48d4d41a` | label-info 部分空 |
| Charlie Haden | Live Montreal ’89 | 2016 | `0f3e42a1-9cbd-413f-9e2d-538e697adaae` | label-info 部分空 |
| Charlie Hunter | Lo sagrado | 2017 | `5d79ad2d-bd12-4049-b590-ed40b72175e2` | label-info 部分空 |
| Charlie Parker | Charlie Parker in Sweden 1950 | 1986 | `5b528e97-545b-432f-b225-37aafd536c45` | label-info 部分空 |
| Charlie Parker | An Evening at Home With the Bird | 1992 | `6bcf15a5-0c8f-334b-bb3a-a86a448fb178` | label-info 部分空 |
| Chet Baker | Chet Baker Sings Again | 1986 | `e2a9fdf9-7742-3352-b0f4-cf953cce9095` | label-info 部分空 |
| Chet Baker | Rique Pantoja & Chet Baker | 1989 | `27b4c9df-e3ef-397f-ac31-edf2be35e828` | label-info 部分空 |
| Chet Baker | Stella by Starlight | 1989 | `c6dbcff6-6e97-3764-a725-11723ee939df` | label-info 部分空 |
| Chet Baker | Live At Fat Tuesday's | 1991 | `7ad6097c-7e67-4a70-99ce-7ab547acc8b5` | label-info 部分空 |
| Chick Corea | Blanchard: New Earth Sonata / Telemann: Suite in A Minor (Overture/Air a L'Italien/Rejouissance) | 1985 | `b39cdabb-2659-4914-b5b7-eea272e6e510` | label-info 部分空 |
| Chick Corea | Fiesta | 1988 | `3bc23d86-3db8-3fe0-a8a0-912903ffb5a4` | label-info 部分空 |
| Chick Corea | From Nothing: Solo Piano | 1996 | `375bd269-8698-41a2-bd2b-9f46d6400475` | label-info 部分空 |
| Chick Corea | Remembering Bud Powell | 1997 | `aaf9af68-5de0-3d16-9272-1fd08986f363` | label-info 部分空 |
| Chick Corea | Seabreeze | 2000 | `01d52b9f-447e-4f25-8a8c-af749d41357e` | label-info 部分空 |
| Chick Corea | Solo Piano, Part Two: Standards | 2000 | `4913e5c2-c055-305f-b0e1-912c63dffa16` | label-info 部分空 |
| Chick Corea | Forever | 2010 | `d3b57119-1244-4b3e-b445-8e3b73811363` | label-info 部分空 |
| Chick Corea | Hot House | 2012 | `6b2edcf0-ba15-4317-9a41-7b926f27069e` | label-info 部分空 |
| Chick Corea | The Vigil | 2013 | `11dca4a6-aae6-4f81-998b-2271e537246d` | label-info 部分空 |
| Chick Corea | The Musician | 2016 | `0576bc79-83e3-4e61-94f7-45e9dd2517ed` | label-info 部分空 |
| Chris Botti | December | 2002 | `1473c0a0-e2df-3d8d-87f9-0af4caddf24b` | label-info 部分空 |
| Chucho Valdés | Lucumi | 1988 | `535b18cf-ebd2-357d-811b-dcaa6986a587` | label-info 部分空 |
| Chucho Valdés | Straight Ahead | 1988 | `6a840563-795f-3fa5-b841-c946a84d5df7` | label-info 部分空 |
| Clifford Brown | Memorial | 1987 | `98806c99-2b9d-3961-96a3-3de2ae11cc74` | label-info 部分空 |
| Clifford Brown | The Complete Paris Sessions, Volume 2 | 1997 | `ddce479a-6435-365d-9d28-f39575f67adc` | label-info 部分空 |
| DR Big Band | Impulsive ! | 1997 | `2b1aaf83-04fa-4e1e-b937-cd19865180c1` | label-info 部分空 |
| DR Big Band | Ways of Seeing (live at the Basement, Sydney) | 1999 | `ca968cc5-de8b-4b82-abde-7a21f7860f2d` | label-info 部分空 |
| DR Big Band | The Power And The Glory | 2001 | `1bcb0d5b-e505-4ce8-9d58-b305d352dd98` | label-info 部分空 |
| Danilo Rea | So Right | 2005 | `9f2238b9-82d6-40fa-9fb0-bf32574192f3` | label-info 部分空 |
| Danny Gatton | Funhouse | 2004 | `1a331e9d-d5da-4c31-85f0-81d6e5b4f5ef` | label-info 部分空 |
| Dave Koz | The Dance | 1999 | `4aedc5b6-3d79-3ef1-8da5-a184ae0b3cf2` | label-info 部分空 |
| David Sanborn | Double Vision | 1985 | `a7e2eaa9-1012-49ed-97d9-cf30dbf9d9a8` | label-info 部分空 |
| David Sanborn | Another Hand | 1991 | `1f80537d-6ed2-3887-b013-11221954b390` | label-info 部分空 |
| Dexter Gordon | Dexter Gordon at Montreux (with Junior Mance) | 1987 | `e8c42c4a-e76e-3431-8d0c-54817a0d09d1` | label-info 部分空 |
| Dexter Gordon | Both Sides of Midnight | 1988 | `29ca6fd8-5515-3586-8163-d2d711d0804d` | label-info 部分空 |
| Dexter Gordon | Body and Soul | 1988 | `60539e22-f969-37a7-9bd4-0eaf5fd3fa1e` | label-info 部分空 |
| Dexter Gordon | The Chase | 1996 | `f2ae5b70-d173-319a-996c-941f57f22ceb` | label-info 部分空 |
| Dexter Gordon | Tenor Titans | 1997 | `03d9e3b3-32d3-426b-a173-44b7a94341f3` | label-info 部分空 |
| Dianne Reeves | Art and Survival | 1993 | `213e8f39-95e6-3b3a-8729-796f3fd98b33` | label-info 部分空 |
| Dizzy Gillespie | Endlessly | 1988 | `e4064d60-9811-4ddd-8927-9f12a4197ffa` | label-info 部分空 |
| Dizzy Gillespie | Something Old, Something New | 1998 | `477e11b4-c449-3fcb-b7f4-ea72095ba44c` | label-info 部分空 |
| Dizzy Gillespie | BD Music Presents: Dizzy Gillespie | 2003 | `17d11059-dc52-4249-881d-bf82b0a59c5b` | label-info 部分空 |
| Don Cherry | Studio session for Tambourinen | 2014 | `040869e5-77db-37f1-ab5e-dbf46af7bd20` | label-info 部分空 |
| Dr. John | Television | 1994 | `43ee9f1b-b74d-314a-bf0d-c00dfb9454cc` | label-info 部分空 |
| Dr. John | Big Band Voodoo | 2019 | `6dc4852c-43bd-47e4-8754-44b075387afe` | label-info 部分空 |
| Dr. John | Things Happen That Way | 2022 | `b9a5545c-c409-4bd5-8a77-dfca7cbb2023` | label-info 部分空 |
| Dr. John and the Lower 911 | Tribal | 2010 | `6f814a19-71f2-4120-b472-ebd73e0990ca` | label-info 部分空 |
| Dr. Lonnie Smith | Spiral | 2010 | `c667530b-70bb-4a9e-9b5b-a9c3c0cf5fee` | label-info 部分空 |
| Duke Ellington | The First Annual Connecticut Jazz Festival, July 28, 1956 | 1987 | `b8f18e51-c86f-4bd8-9edc-a0074714403d` | label-info 部分空 |
| Duke Ellington | Hot Summer Dance | 1991 | `528f6107-a2f9-393f-a95d-910e876c276b` | label-info 部分空 |
| Duke Ellington | The Piano Player | 2005 | `4dea6f3c-c220-42b7-b97a-5a9a86fba31d` | label-info 部分空 |
| Duke Ellington | Nutcracker Suites | 2013 | `c556b291-3e21-4b3c-94b3-1e37a09979d3` | label-info 全空 |
| Duke Ellington | The Duke in Munich | 2022 | `74b72626-8c60-4831-9899-a04b99f54001` | label-info 全空 |
| Duke Ellington and His Orchestra | Harlem | 1985 | `38a4b0af-2771-3dda-aec7-0a1ad8cd846b` | label-info 部分空 |
| Duke Ellington and His Orchestra | The 1953 Pasadena Concert | 1986 | `559a9364-9aca-33d8-85f0-df2654b7695a` | label-info 部分空 |
| Duke Ellington and His Orchestra | Essential Jazz | 1990 | `8524d047-0918-35dc-be73-2871a46aaa81` | label-info 部分空 |
| Duke Ellington and His Orchestra | The Symphonic Ellington | 1992 | `1a7ca676-e0f2-3710-90bf-137b02980f52` | label-info 部分空 |
| Duke Ellington and His Orchestra | Happy Birthday, Duke! The Birthday Sessions Vol. 5 | 1992 | `2242e073-bfb3-4304-8531-075238ce7204` | label-info 全空 |
| Duke Ellington and His Orchestra | Concert in the Virgin Islands | 2007 | `6db1959c-f88b-4c38-94d8-e8d6843699b2` | label-info 部分空 |
| Duke Ellington and His Orchestra | Caravan - The Fargo Concert 1940 Vol. II | 2014 | `26580b39-185f-4deb-ac35-efa98ca74ede` | label-info 全空 |
| Duke Ellington and His Orchestra | Rotterdam 1969 | 2016 | `55db4feb-450f-4063-afa5-4688005993b7` | label-info 部分空 |
| Earl Klugh | Naked Guitar | 2005 | `cd623a0a-af33-3d49-b942-98ec96bc3547` | label-info 全空 |
| Earl Klugh | The Spice of Life | 2008 | `74954ad8-8ab3-3243-92e7-0a8b6b9c60ff` | label-info 部分空 |
| Edmond Hall | One Time Too Many | 2012 | `f812baaa-5912-49c9-807d-9ca125591aee` | label-info 全空 |
| Eliane Elias | Amanda | 1985 | `2d16719d-d44d-355e-ac72-33d1da314943` | label-info 部分空 |
| Eliane Elias | Kissed by Nature | 2002 | `0071cfe3-388c-3274-ba25-018c5eeac0c3` | label-info 部分空 |
| Eliane Elias | On the Classical Side | 2010 | `f25c0bb6-c18a-4e6d-91c1-eeec11b1f593` | label-info 全空 |
| Eliane Elias | Made in Brazil | 2015 | `98bfbff4-7ba2-4902-890a-c9f5bc475a42` | label-info 部分空 |
| Elvin Jones | Live at "Pit Inn" Tokyo Japan | 1992 | `ee188504-8e96-4bda-8e52-edebaa29a285` | label-info 部分空 |
| Elvin Jones | At This Point in Time | 1998 | `0351ea63-7b0f-31af-b871-8716589821ac` | label-info 全空 |
| Elvis Costello | Mighty Like a Rose | 1991 | `61bbd4a1-9275-3a0e-9435-f315ee9e3076` | label-info 部分空 |
| Elvis Costello | 1996‐05‐20: Paradise Theater, Boston, MA, USA | 1996 | `5fb709d0-f0d8-34eb-961f-802a13fb150a` | label-info 全空 |
| Elvis Costello | Later | 1996 | `dbcbcb09-19a7-46b9-a8c1-960e53d9ff2f` | label-info 全空 |
| Elvis Costello | 1996‐05‐15: The Fillmore, San Francisco, CA, USA | 1996 | `e5fc5d25-f13d-3cd3-94bd-829288458b53` | label-info 全空 |
| Elvis Costello | 1999‐06‐16: Massey Hall, Toronto, ON, Canada | 1999 | `61b15d04-35a1-45d6-8dcd-186f9ba7aed9` | label-info 全空 |
| Elvis Costello | Il sogno | 2002 | `27452452-23d4-347b-bd68-adc7488bd149` | label-info 部分空 |
| Elvis Costello | North | 2003 | `c8b51e53-df15-3418-a566-affe80e07d77` | label-info 部分空 |
| Elvis Costello | Secret, Profane & Sugarcane | 2009 | `b1b6052d-ff2b-449a-83d8-a2f718030f1b` | label-info 部分空 |
| Elvis Costello | Brilliant Parade | 2020 | `b2996110-63b5-3253-82d5-82cdf50d46c2` | label-info 部分空 |
| Elvis Costello | Radio Broadcast, Part One (live American radio broadcast) | 2022 | `b982cb8c-0fbe-41ec-89af-507ead28a133` | label-info 全空 |
| Elvis Costello | 1978-02-07 Berkeley (Remastered, Live On Broadcasting) | 2024 | `cebe114c-4f95-415f-a37d-a8ba15ccdb1d` | label-info 全空 |
| Enrico Rava | Rava Ullmann Willers Lillich Schäuble | 1989 | `ba53d70a-d92b-4412-92d9-93d705ef5954` | label-info 部分空 |
| Eric Darius | Retro Forward | 2014 | `6c381fff-951d-45ca-8c54-ffac2f681012` | label-info 全空 |
| Eric Darius | Breakin’ thru | 2018 | `44cedcd2-30a1-4097-8bd2-73cedba03486` | label-info 全空 |
| Eric Dolphy | Eric Dolphy in Europe, Volume 2 | 1990 | `2adffebc-21fd-3332-9909-854590707b71` | label-info 部分空 |
| Eric Dolphy | Left Alone | 2003 | `054716e7-79e3-38ff-afd2-e58466d83330` | label-info 部分空 |
| Eric Dolphy | Eric Dolphy, a Night in Copenhagen | 2009 | `a3a631e1-9f24-4d0a-8e0a-edf4c5a2aad3` | label-info 全空 |
| Ettore Fioravanti | Sotto il sole giaguaro | 1989 | `525a926f-09b1-4c6d-81b8-5e8ed3a9c201` | label-info 全空 |
| Ettore Fioravanti | Sette canzoni | 1990 | `a340bdaa-13c8-4dae-b345-a9b5a1fd3fab` | label-info 全空 |
| Ettore Fioravanti | Canzoni Non Cantate | 1993 | `18ec8c93-5676-442e-9442-d67831141a35` | label-info 全空 |
| Ettore Fioravanti | Quasi troppo serio | 2009 | `652d1616-b9ff-4cd7-8274-91ebae263e97` | label-info 全空 |
| Ettore Fioravanti | Opus Magnum | 2010 | `48fa6318-78aa-4640-87bd-cc9e534ed077` | label-info 全空 |
| Ettore Fioravanti | Le vie del pane e del fuoco | 2011 | `3cca1444-eadf-408a-be04-849ce1bbb9af` | label-info 全空 |
| Ettore Fioravanti | Traditori | 2014 | `e77d60f9-22c9-4afe-8ad1-3724b25b61e2` | label-info 全空 |
| Ettore Fioravanti | Old and New Dances | 2024 | `7e17d7a0-e788-44b2-a247-7f2440233796` | label-info 全空 |
| Fabrizio Bosso | The Golden Circle | 2013 | `47c51c16-b3dc-4916-a936-56fa60a98495` | label-info 全空 |
| Fabrizio Bosso | Dialogo a due | 2013 | `60edeefb-408b-42d0-9c46-7f995a835f07` | label-info 全空 |
| Fabrizio Bosso | Love Vibrations | 2020 | `788ca6c4-0dae-4e64-8154-e418ed64b589` | label-info 全空 |
| Flavio Boltro | Volare | 2005 | `0842a2dd-a504-3c43-95d8-f518c7fb134c` | label-info 全空 |
| Flavio Boltro | With Love | 2018 | `46e4a964-919b-4dc2-8480-066a8b75e717` | label-info 全空 |
| Floratone | Floratone II | 2012 | `48a1142b-f638-4136-9544-cd22ffe9c26e` | label-info 部分空 |
| Franco D’Andrea Quartet | Dancin' Structures | 2004 | `4390b8bd-65d6-43ff-8e67-2bfa5cae9ad4` | label-info 全空 |
| Frank Sinatra | Songs Selected From Young At Heart (Restored 2024) | 2024 | `98f6a522-8061-491d-8082-ae15f468b0c2` | label-info 全空 |
| Freddie Hubbard | Piazzetta Trepponti Comacchio, July 8, 1984 | 1985 | `5d2e2293-fd29-4874-8696-edf67080b72f` | label-info 全空 |
| Freddie Hubbard | At Jazz Jamboree Warszawa ’91: A Tribute to Miles | 1991 | `043ccfd0-7830-3091-8e45-21c5683542eb` | label-info 部分空 |
| Gabrielle Cavassa | Gabrielle Cavassa | 2020 | `bc6883d1-c7a1-4695-998e-184ddee7c73d` | label-info 全空 |
| Gare du Nord | In Search of Excellounge | 2001 | `5f3731a6-d2f0-3486-8712-5afba1fa9666` | label-info 部分空 |
| Gare du Nord | Kind Of Cool | 2002 | `910d2ac0-9b08-36e7-a492-41ec12970d95` | label-info 部分空 |
| Geoffrey Keezer | Rising Tide | 2003 | `2465a17e-9ff2-4927-832d-8951601d8783` | label-info 全空 |
| Geoffrey Keezer | Curveball | 2007 | `ff60a2b2-8ea6-3956-b634-ff505cd723d8` | label-info 全空 |
| Geoffrey Keezer | Hymn | 2012 | `4e99267d-aa1c-4fce-a91e-5d2cab94457e` | label-info 全空 |
| George Howard | Love Will Follow | 1986 | `3ce1a1fa-7a80-4a12-905d-ddc4382b4cdc` | label-info 部分空 |
| George Robert | Live in Taormina | 2001 | `87a184fa-7256-4135-935b-933303c422ff` | label-info 全空 |
| George Robert | Soul Eyes | 2007 | `8314fa5c-e941-4a00-97e2-e268671064be` | label-info 全空 |
| Geri Allen | The Gathering | 1998 | `7f60b122-b25f-35da-abd0-85ca1936a9c9` | label-info 部分空 |
| Geri Allen | The Life of a Song | 2004 | `4c7234f5-359b-30e1-9d53-5fbfd6e0ee3c` | label-info 部分空 |
| Gino Paoli | Insieme | 1985 | `29cc16cd-079a-3a95-91fe-1ec76847d592` | label-info 部分空 |
| Gino Paoli | Sempre | 1988 | `6d457a62-ca13-375b-955a-bc07dae1747b` | label-info 全空 |
| Gino Paoli | Matto come un gatto | 1991 | `ee8d9bd2-32d9-36b3-9e46-7b91803755a2` | label-info 部分空 |
| Gino Paoli | Per una storia | 2000 | `06165b6d-7ca8-3db8-85a4-a183285a716e` | label-info 全空 |
| Gino Paoli | Live @ RTSI 25 nov 1980 | 2001 | `74c7d3a3-078e-49fe-a2de-4fbe13ff6f41` | label-info 全空 |
| Gino Paoli | Se | 2002 | `a5badf09-bd14-304c-9e81-a8c802e49302` | label-info 全空 |
| Gino Paoli | Ti ricordi? No non mi ricordo | 2004 | `a6007d36-8dca-3e2b-8ad6-a2528d45f481` | label-info 全空 |
| Gino Paoli | L'unica volta insieme: I mitici lunedì del Sistina 1969-1979 | 2012 | `f56ce762-2ce1-4a3f-9156-7a1d8219a5ae` | label-info 全空 |
| Gonzalo Rubalcaba | The Trio | 1998 | `8ebd5349-dd56-3257-9378-dff56259e57c` | label-info 部分空 |
| Gonzalo Rubalcaba | XXI Century | 2011 | `0e638512-2187-40b1-94e3-0d4e9ed741b8` | label-info 部分空 |
| Gov’t Mule | 1994-12-29: Lake Boone Country Club Raleigh, NC | 1994 | `6d9885da-8ba6-4b57-8b83-ce330cf56a0b` | label-info 全空 |
| Gov’t Mule | 1996-06-11: Lawrence, KS, USA | 1996 | `30ca71e7-42fe-3c7d-b471-64c3d71bb186` | label-info 全空 |
| Gov’t Mule | Lynaughs (live, 1997-11-14: Lynaughs, Lexington, KY, USA) | 1997 | `324ff5a7-358a-473c-9977-39ab0b52decb` | label-info 全空 |
| Gov’t Mule | 1997-03-05: Lynaugh's, Lexington, KY | 1997 | `a9ff4ca2-2252-41e6-a3be-8f460b8da3b9` | label-info 全空 |
| Gov’t Mule | 1998-09-26: The Odeon, Cleveland, OH | 1998 | `258c341d-7120-4b1c-bd0e-deee6081893d` | label-info 全空 |
| Gov’t Mule | Live... With a Little Help From Our Friends | 1999 | `d2ed8ba7-4d9b-3f76-9ae2-0ad31c9f4b5a` | label-info 部分空 |
| Gov’t Mule | 2001‐05‐05: Orpheum Theatre, New Orleans, LA, USA | 2001 | `a5c09042-0357-4a36-99dd-0d8e3a04e0a0` | label-info 全空 |
| Gov’t Mule | 2003-11-15: The Fillmore, San Francisco, CA, USA | 2003 | `24b27a1f-69d9-36bb-96f6-a08086189ba2` | label-info 全空 |
| Gov’t Mule | The Deepest End: Live in Concert | 2003 | `c3c6bef1-223e-318e-b2a6-21aa64c18b4f` | label-info 部分空 |
| Gov’t Mule | Mule Tracks Presents... Deep Ellum Mule | 2004 | `1435d516-7226-3bde-a53e-c1679bb75785` | label-info 全空 |
| Gov’t Mule | 2004-04-16: The Warfield, San Francisco, CA | 2004 | `71bff388-8116-4d83-8182-3177a9656eea` | label-info 全空 |
| Gov’t Mule | 2004-09-18: Town Park, Telluride, CO | 2004 | `8845c0c5-4a7b-4a1a-b563-68bd660edd2f` | label-info 全空 |
| Gov’t Mule | 2005-02-13: Fox Theater, Boulder, CO, USA | 2005 | `7a3af815-3bab-33ab-aef6-970434c8607f` | label-info 全空 |
| Gov’t Mule | High & Mighty | 2006 | `ce684e6e-8bbc-305d-8752-4ff268c3472e` | label-info 部分空 |
| Gov’t Mule | 2007-06-16: Bonnaroo Music Festival, Manchester, TN | 2007 | `467f4430-68b7-4c6e-9aab-b096208b57c8` | label-info 全空 |
| Gov’t Mule | Miles Tour Summer '07 Sala Joy Eslava, Madrid, Spain | 2007 | `82642e28-1d1c-4fbd-9263-7440662b5459` | label-info 全空 |
| Gov’t Mule | Warren Haynes Presents: The 19th Annual X-Mas Jam & Pre-Jam Ashville, NC | 2007 | `a3460a6e-7edc-4714-af67-b2ae4a452a3f` | label-info 全空 |
| Gov’t Mule | 2007-12-31: Beacon Theatre, New York, NY | 2007 | `e1b7ac10-520c-4a7e-b210-3c3c767ea277` | label-info 全空 |
| Gov’t Mule | 2007-06-02: Mountain Jam, Hunter, NY | 2007 | `eb131f9c-24f0-467d-8280-3b40d58f60de` | label-info 全空 |
| Gov’t Mule | Bonnaroo Music & Arts Festival-Manchester, TN 6/13/09 | 2009 | `164f3b8c-8cad-420c-a4d6-97194852e3fd` | label-info 全空 |
| Gov’t Mule | Fall '09 - Tower Theatre, Philadelphia, PA 10.31.09 | 2009 | `49eb4eed-a3e3-4db5-abf9-91f0ad4a1d3c` | label-info 全空 |
| Gov’t Mule | The Soundcheck Series | 2009 | `d1dcaed3-7eaa-4517-90f3-cacd9b8dc45e` | label-info 全空 |
| Gov’t Mule | 2011-12-31: Mad Mules & Englishmen: The Beacon Theatre, New York City, NY, USA | 2011 | `d2cb1086-79a5-47cf-9520-c5c8d6acc580` | label-info 全空 |
| Gov’t Mule | Beacon Theatre, New York, December 31, 2011 | 2011 | `ff96b0e4-339f-4d97-834b-d483fa323098` | label-info 全空 |
| Gov’t Mule | 2012-06-24: Oakdale Theater, Wallingford, CT | 2012 | `0727ccfb-18ce-46fb-b093-0f474fbbf3cd` | label-info 全空 |
| Gov’t Mule | 2012-12-30 / 31: The Beacon Theatre, New York City, NY, USA | 2012 | `0e8aa2fb-812f-4263-8e49-6ff97e1f217b` | label-info 全空 |
| Gov’t Mule | Mountain Jam - Hunter Mountain, NY (June 1, 2012) | 2012 | `64d0bb3a-d697-4ab8-81b6-6a82f06f37ba` | label-info 全空 |
| Gov’t Mule | 2013-05-03: Mahalia Jackson Theater New Orleans, LA, USA | 2013 | `70489e26-4fba-4deb-a644-85291999bc3f` | label-info 全空 |
| Gov’t Mule | Gov’t Mules’s, Island Exodus IV | 2013 | `b9fe5ceb-424f-4aba-ab04-d08d72a1d687` | label-info 全空 |
| Gov’t Mule | 2014-10-31: Taft Theatre, Cincinnati, OH, USA | 2014 | `2029bac0-dadf-463d-b0c1-2e5c201caa6e` | label-info 全空 |
| Gov’t Mule | The Beacon Theatre | 2015 | `81bd8dd7-4655-4b20-b15d-b92921787a5a` | label-info 全空 |
| Gov’t Mule | 2017-11-02: Fabrik, Hamburg, DE | 2017 | `2fa25b23-aa66-4c5c-b99d-2e6cec462eda` | label-info 全空 |
| Gov’t Mule | 2017-10-31 Paradiso, Amsterdam, NL | 2017 | `3638584a-1c10-44db-8312-7c8f0ad28c4d` | label-info 全空 |
| Gov’t Mule | 2017-06-15 Live Club, Milan, IT | 2017 | `43c85977-0a4f-4898-a9ee-6bfd3098fce9` | label-info 全空 |
| Gov’t Mule | 2017-06-14 Kaufleuten, Zurich, CH | 2017 | `4d1216c6-fa80-4be7-95b6-284e9fe888e2` | label-info 全空 |
| Gov’t Mule | 2017-12-31: The Beacon Theatre, New York City, NY, USA | 2017 | `9f0fcb57-43d8-4260-b748-57a0feb8e304` | label-info 全空 |
| Gov’t Mule | 2018-07-13: PNC Bank Center, Holmdel, NJ | 2018 | `ba860df0-7388-4b00-ba68-7b5c1d006bc3` | label-info 全空 |
| Gov’t Mule | 2019‐07‐07 Roanoke Island Festival Park, Manteo, NC | 2019 | `2cd2eb2b-df3a-4265-a1af-fea280de760f` | label-info 全空 |
| Gov’t Mule | 2019-07-11 MECU Pavilion, Baltimore, MD | 2019 | `53c1361c-0729-4e1b-9ff1-1d4165c93276` | label-info 全空 |
| Gov’t Mule | Bring On the Music: Live at the Capitol Theatre, Part 2 | 2019 | `a015c82d-5cb7-43d1-920c-e98ac80f2557` | label-info 全空 |
| Gov’t Mule | 2022-08-13: Westville Bowl, New Haven, CT, USA | 2022 | `3ee47fdb-ca76-43bc-9ec0-6d6a7d1cfe31` | label-info 全空 |
| Gov’t Mule | 2022-01-19: Jewel Paradise Cove Runaway Bay, Jamaica | 2022 | `7cf884dc-d75c-4485-8a48-8af2dbb98453` | label-info 全空 |
| Gov’t Mule | 2022-08-06: Beak & Skiff Apple Orchards, Lafayette, NY, USA | 2022 | `e93ba6f1-a4da-4e94-b924-ee0662006c82` | label-info 全空 |
| Gov’t Mule | 2023-01-18: Govt Mule & Friends, Island Exodus 13, Runaway Bay, Jamaica | 2023 | `be8d6e01-549f-474f-8ee7-5c0bb1594dab` | label-info 全空 |
| Gov’t Mule | 2024-12-28: College Street Music Hall New Haven, CT | 2024 | `96ed30b9-f1c0-46bf-b949-454682d2d7ca` | label-info 全空 |
| Gov’t Mule | 2024-05-01: Daze Between New Orleans | 2024 | `cb56c498-9c90-4a8a-82d7-8ba1e24911e1` | label-info 全空 |
| Greg Osby | Reflections of the Eternal Line | 2020 | `19e956ed-727d-438c-9ec7-9e73d0048b3b` | label-info 全空 |
| Grover Washington, Jr. | Grover Live | 2010 | `3cb9628c-bb80-4137-8040-0b9385d40ebf` | label-info 部分空 |
| Götz Alsmann | Eventuell | 2018 | `bb584195-4f5c-48fd-892a-335255b2e725` | label-info 全空 |
| Hampton Hawes | All Night Session!, Volume 2 | 1991 | `08e7a126-455a-3568-a1cf-54b4ac8338d4` | label-info 部分空 |
| Hampton Hawes | All Night Session!, Volume 3 | 1991 | `c5d89afc-cdc1-3656-abc7-d116b62d630d` | label-info 部分空 |
| Hampton Hawes | The Sermon | 2002 | `c031d202-f25c-3dc5-b026-18db800aa20c` | label-info 部分空 |
| Hank Jones | I Remember You | 1987 | `39e10860-f9f3-44f9-9861-b4927523f76c` | label-info 部分空 |
| Hank Jones | The Oracle | 1989 | `3fce0fb8-9675-381f-9656-3d6b2a2625a0` | label-info 部分空 |
| Hank Jones | Just for Fun | 1991 | `0bfcb1b1-7023-38d3-bfb1-31043049aeb3` | label-info 全空 |
| Hank Jones | Jesper Thilo Quintet Featuring Hank Jones | 1991 | `81f3774d-e4ca-412b-ac44-ee0f54e013d4` | label-info 部分空 |
| Hank Jones | Bluesette | 2002 | `17408d06-4f3c-3e48-8ee7-8f8d09bef859` | label-info 全空 |
| Hank Jones | Hank and Frank | 2006 | `4d237414-2eda-407b-adb5-f59be6afed0d` | label-info 全空 |
| Henri Salvador | Ma chère et tendre | 2003 | `738adfa4-024e-3aaa-a17a-7aebc80be4d3` | label-info 部分空 |
| Herbie Hancock | Dis Is da Drum | 1994 | `56859652-9ec0-312f-bc84-2e2f15fcf39e` | label-info 部分空 |
| Herbie Hancock | 1+1 | 1997 | `929696e9-fff3-3720-8736-0a4af7ab5ef6` | label-info 部分空 |
| Herbie Hancock | Gershwin’s World | 1998 | `4942f382-8e44-3d31-9b50-07fb940598ea` | label-info 部分空 |
| Herbie Hancock | Possibilities | 2005 | `6b984369-6e16-3600-9f75-b0f1e6f8d8c0` | label-info 部分空 |
| Herbie Hancock | River: The Joni Letters | 2007 | `056a9f39-b5a6-338f-946f-4cc4e22ce1e7` | label-info 部分空 |
| Herbie Hancock | 2007-06-18: Britt Amphitheater, Jacksonville, OR | 2007 | `70f5c76a-32db-4335-b5a8-57d56b26c2be` | label-info 全空 |
| Herbie Hancock | 2008-12-08: Goeteborg, SE | 2008 | `5a142253-7ec6-46da-ac5c-f937308949e0` | label-info 全空 |
| Herbie Hancock | Complete Live at Jorgie's 1961 | 2012 | `20c69e97-a517-4aaf-980f-c80a5abd7f28` | label-info 全空 |
| Herbie Hancock | Future Shock Live – Live at Yumiuri Land Open East Theatre 1984 | 2022 | `b6737c1b-8b78-441d-b338-e47283a28084` | label-info 部分空 |
| Herbie Hancock | Live in Chicago 1977 | 2022 | `f1218504-8c44-479a-b668-4fb25ab1a125` | label-info 部分空 |
| Horace Silver | The Baghdad Blues - 1959 | 1999 | `7fff707f-b3c3-3a51-a7a3-c48ed2cde0eb` | label-info 部分空 |
| Irakere | Boleros inigualables | 1996 | `58ff131f-1206-48de-bc55-ff1083764eaa` | label-info 部分空 |
| Israel “Cachao” López | Descargas: Cuban Jam Sessions | 2000 | `36b07e53-9105-3b3d-bc69-8150ab640224` | label-info 全空 |
| J.J. Cale | Number 10 | 1992 | `f9f3732a-97cf-3955-b74c-6dab024ce7fa` | label-info 部分空 |
| J.J. Cale | Live in London | 1994 | `60751eca-4dd2-4e1b-801d-c585a38a56ca` | label-info 全空 |
| J.J. Cale | KFOG Private Show, San Francisco 2002 | 2002 | `1ba2ac07-12e7-48a2-9812-24c65d9f1030` | label-info 全空 |
| J.J. Cale | After Hours in Minneapolis | 2019 | `a4c7216e-c919-469b-8943-4ecbf7f2e41a` | label-info 全空 |
| Jack DeJohnette | The Jack DeJohnette Piano Album | 1985 | `11f62416-38b4-3149-8b8e-11d0ffed567f` | label-info 部分空 |
| Jack DeJohnette | Parallel Realities | 1990 | `f40479e4-e4b7-3e00-a560-19e3e714eb65` | label-info 部分空 |
| Jack DeJohnette | For Evans Sake | 1992 | `3994657c-3d8f-4be0-a2e7-81890bddd9ed` | label-info 全空 |
| Jack DeJohnette | Music for the Fifth World | 1992 | `ae189b70-5cd0-3cdf-adb5-f49844f93708` | label-info 部分空 |
| Jack DeJohnette | Dancing With Nature Spirits | 1996 | `275348a3-9bb2-3363-9865-26e62442ada7` | label-info 部分空 |
| Jack DeJohnette | Music in the Key of Om | 2005 | `c86f1d3e-ac24-4f4a-9d63-35e33136ff9f` | label-info 全空 |
| Jack DeJohnette | The Green Field | 2006 | `a8b13f46-08a6-3162-ba4c-ca32548cb6d5` | label-info 全空 |
| Jack DeJohnette | Saalfelden | 2021 | `f0516819-e747-47dd-863b-adb00e265dda` | label-info 全空 |
| Jack DeJohnette | The Art of The Quartet Vol.1 (Remastered) | 2025 | `85ba61cd-b228-46c1-a6af-4a632b1bb34d` | label-info 全空 |
| Jack Walrath | Gut Feelings | 1990 | `6ece7e3b-d6c2-47e2-936e-2dad00baf9e3` | label-info 全空 |
| Jack Walrath | Single Petal of a Rose | 1994 | `2c7f8eaa-baa6-3514-9860-e2b60d99c3ce` | label-info 部分空 |
| Jackie McLean | The Jackie Mac Attack Live | 1993 | `131e9076-a8b5-4ece-852f-d434f9d36205` | label-info 部分空 |
| Jackie McLean | Hat Trick | 1996 | `823b61c2-8402-4f27-a611-d95806fd703c` | label-info 全空 |
| Jackie McLean | Fire and Love | 1997 | `eca6903a-3e10-43ad-a40d-f480aa474255` | label-info 全空 |
| Jackie McLean | Monuments | 2016 | `63e46365-b900-40a3-a80d-7cbd306c4bb3` | label-info 全空 |
| Jacky Terrasson | Claude Debussy… et le jazz: Preludes for a quartet | 2018 | `c08b54ab-2068-480c-ae49-0d8a23ef345f` | label-info 部分空 |
| James Blood Ulmer | Guitar Music | 2003 | `c5a3eda0-1a5a-3d6c-beee-cbd2d13d7147` | label-info 部分空 |
| James Blood Ulmer | The Stone Residency 2015 - Day 2 Set 2 | 2021 | `1addd634-b5c1-4eef-b131-c75e92f4bb98` | label-info 全空 |
| James Blood Ulmer | The Stone Residency 2015 - Day 2 Set 1 | 2021 | `4229dd4f-79b4-4f1a-8dd8-7c5907d9516c` | label-info 全空 |
| James Francies | Flight | 2018 | `f4539fe1-df19-4ad4-99d3-c2d5a2539471` | label-info 全空 |
| James Moody | Moody Plays Mancini | 1997 | `d48bb2c4-8a75-304a-8391-5887246491ad` | label-info 部分空 |
| James Newton | If Love | 1990 | `c89e1131-b86f-48a8-9080-ab830ce8fb30` | label-info 全空 |
| Jamie Cullum | Live at Blenheim Palace | 2004 | `c3b9a04d-e682-3e5a-a201-2ec2a727eb50` | label-info 部分空 |
| Jamie Cullum | Live at Ronnie Scott's | 2005 | `8e5645cc-643a-3d1f-8451-e1978ac95981` | label-info 全空 |
| Jamie Cullum | The Pursuit | 2009 | `86a4f207-945a-4a3b-bd78-4eb2dbb4d51c` | label-info 部分空 |
| Jamie Cullum | The Song Society Playlist | 2018 | `220a0b61-bc64-4c4b-a5d1-8d4d9d079cdc` | label-info 部分空 |
| Jason Moran | The Bandwagon | 2003 | `77690c69-cda4-3031-a834-bcdb3521a2b4` | label-info 全空 |
| Jason Moran | The Sound Will Tell You | 2021 | `7cda364c-88a5-4077-b081-208b059d3981` | label-info 全空 |
| Jason Moran | Let My People Go | 2021 | `f5f8f5db-9cc1-4fa6-bc06-75c3d941f196` | label-info 部分空 |
| Jason Moran | From the Dancehall to the Battlefield | 2023 | `3caf1de2-9fb7-468d-a8d4-1ccd0104175e` | label-info 全空 |
| Jason Moran | Go To Your North | 2025 | `a417747d-7217-4ff7-ace7-01290d081049` | label-info 全空 |
| Jason Moran | Shards | 2026 | `33494d69-85ec-4a1f-8b1a-5eca481366eb` | label-info 全空 |
| Javier Edgardo Girotto | 10/15 | 2009 | `4b21417e-6ef9-41c3-a1d4-ef1d14565a5c` | label-info 全空 |
| Javier Edgardo Girotto | Alrededores de la ausencia | 2009 | `fd073e7b-0c7a-4e6e-a6e3-9b354020db32` | label-info 全空 |
| Javier Edgardo Girotto | Kaleidoscopic Arabesque | 2010 | `2ac88c18-1256-44af-9f14-64bcba992c5d` | label-info 全空 |
| Javier Edgardo Girotto | Iguazù | 2011 | `b5d95340-18e4-4113-9167-98b0d654b8cc` | label-info 全空 |
| Javier Edgardo Girotto | Tango or Not Tango | 2015 | `0cb68970-15be-4e1a-958f-dd2a19798e24` | label-info 全空 |
| Javon Jackson | Jackson Plays Dylan | 2026 | `2dfb9ebf-1f03-49ac-a6ce-21d7788a0f5e` | label-info 全空 |
| Jazztronik | Horizon | 2003 | `bfc17d43-1899-39f7-bd9f-d2537d326781` | label-info 部分空 |
| Jazztronik | 七色 | 2004 | `62c27b64-8849-3716-8d80-f6c61d6ea1af` | label-info 部分空 |
| Jazztronik | Nu Balance | 2005 | `63785fd2-4cf5-34eb-ba57-e21b2371d212` | label-info 部分空 |
| Jazztronik | Real Clothes: Motion Pictures Sound Track | 2009 | `0a753e43-fa9d-430f-9bca-c957931adec6` | label-info 部分空 |
| Jean-Pierre Como | Padre | 1998 | `16ddfb78-4ea7-4d01-8e99-ddba88643303` | label-info 全空 |
| Jean-Pierre Como | Storia... | 2001 | `8ed4cf7b-a1c9-4379-8bbf-47973f14f40e` | label-info 全空 |
| Jean‐Luc Ponty | Storytelling | 1989 | `ecf3287f-175d-354a-a59a-16386205bfe1` | label-info 部分空 |
| Jean‐Luc Ponty | The Atacama Experience | 2007 | `989f420c-475d-3c13-a983-ce82fd3afa3f` | label-info 部分空 |
| Jeff Mills | And Then There Was Light | 2017 | `7b855892-220a-40fd-ba15-ccb3b379b15b` | label-info 部分空 |
| Jeff Mills | Moon - The Area of Influence | 2019 | `90d50613-eb20-4820-b21b-0e7d6b59a859` | label-info 全空 |
| Jerry Bergonzi | Art | 1999 | `8f39f3c6-7dbb-4b51-9764-4c4891fe0f59` | label-info 全空 |
| Jerry Bergonzi | Sunday | 2018 | `1c436a0b-a0a3-4314-a3be-f02f004de330` | label-info 全空 |
| Jimmy McGriff | Steppin' Up | 1987 | `18d33458-7597-395b-9db5-e7e9b97ee48a` | label-info 部分空 |
| Jimmy McGriff | Blue to the Bone | 1988 | `72e37800-da59-4210-b43e-cd0bdcd5829b` | label-info 全空 |
| Jimmy McGriff | You Ought to Think About Me | 1990 | `0a277e6d-bc29-4c13-8f3c-e1cc67723d5b` | label-info 部分空 |
| Jimmy McGriff | On the Blue Side | 1990 | `ffd83419-0da2-3947-934d-62305f86361f` | label-info 部分空 |
| Jimmy McGriff | Straight Up | 1998 | `7475c7ce-8360-49f5-95d8-1930f6263786` | label-info 全空 |
| Jimmy Smith | Prime Time | 1989 | `3e71b400-58c6-389c-9548-81cd07f942f2` | label-info 部分空 |
| Jimmy Smith | Fourmost - Recorded Live at Fat Tuesday's NYC | 1991 | `3409a02c-7049-33ff-bbab-a4e9405a2848` | label-info 部分空 |
| Jimmy Smith | Fourmost Return | 2006 | `cd71f39d-4715-48c4-bfcd-dbfe0400ae2e` | label-info 部分空 |
| Jimmy Witherspoon | Jimmy Witherspoon With the Junior Mance Trio | 1997 | `d5fe04de-e89b-3cf8-add2-99f83af21694` | label-info 部分空 |
| Jimmy Witherspoon | Spoon Meets Pao | 2002 | `7ef26579-8dc3-415b-a2a8-dcbe14ee5052` | label-info 全空 |
| Joe Chambers | Crystals | 2004 | `11573dd7-93f1-4751-aa10-65da451456df` | label-info 全空 |
| Joe Henderson | Akio | 1989 | `13388ae2-5039-41e7-b6a7-14673bfde01e` | label-info 部分空 |
| Joe Henderson | Four! | 1994 | `d146e7de-4fd8-3419-80e1-4c623c7df8ba` | label-info 部分空 |
| Joe Henderson | Sextet & Quartet | 1995 | `06d7f4f3-649d-4c1c-9bc9-cb8793e47cb8` | label-info 全空 |
| Joe Henderson | Porgy and Bess | 1997 | `134fad0e-804f-3bff-a566-38c6dc3a559a` | label-info 部分空 |
| Joe Henderson | Consonance: Live at the Jazz Showcase | 2026 | `61fa6454-ed1f-4366-b721-e491d4a91701` | label-info 部分空 |
| Joe Lovano | Solid Steps | 1986 | `c26b2a19-44ca-4915-9461-b49de407bd6b` | label-info 部分空 |
| Joe Lovano | Kurdish Dance | 1992 | `1ff3b078-46c2-320e-934a-86f3338a3d27` | label-info 部分空 |
| Joe Pass | Sound Project | 1987 | `7d51b6ee-1e74-393a-80b0-80b5fc0f2794` | label-info 部分空 |
| Joe Pass | Copenhagen Jazz Festival 1988 | 1988 | `8eed405e-d7e8-4dc1-8b5e-768f8d1423fc` | label-info 全空 |
| Joe Pass | Joe Pass Quartet Live at Yoshi's | 1992 | `ccd1e566-3aeb-352c-ac8f-ccf5649c403a` | label-info 部分空 |
| Joe Pass | Songs for Ellen | 1994 | `54808341-3fb7-32f7-b70b-cacf7cfa21e5` | label-info 部分空 |
| Joe Williams | Having the Blues Under a European Sky | 1985 | `e4f0a202-b385-3abc-a4e0-5830d1d04915` | label-info 部分空 |
| Joe Williams | The Overwhelming Joe Williams | 1988 | `bc982d56-6120-3eb5-b2dd-1fb4c2da01a3` | label-info 部分空 |
| Joe Williams | Joe Williams With Thad Jones / Mel Lewis Orchestra | 1994 | `d9c99855-3b29-302c-b5de-4a4966a208a5` | label-info 全空 |
| Joe Williams | Me and the Blues | 1999 | `6827dd0e-51cc-3d40-ab21-0dace415948c` | label-info 全空 |
| Joe Williams | End of a Beautiful Friendship | 2020 | `ef1f16fc-3c3a-4db6-89a2-34924bf41cca` | label-info 全空 |
| Joey Calderazzo | Simply Music | 1997 | `70031008-d34c-3b08-b00a-5f185cf381f9` | label-info 全空 |
| Joey Calderazzo | Calderazzo Trio: 2011-10-20, Toulouse | 2011 | `0256c34a-17e9-47d4-b64c-a71122fbf269` | label-info 全空 |
| Joey DeFrancesco | All of Me | 1989 | `1f496ed1-d5a2-329c-b997-aa14586beff4` | label-info 部分空 |
| Joey DeFrancesco | Reboppin' | 1992 | `54238428-f0aa-3672-97ae-176ddc210cec` | label-info 部分空 |
| Joey DeFrancesco | The Champ, Round 2 | 2000 | `8adeb690-4a40-4ae5-933f-4b3f5410de4f` | label-info 全空 |
| Joey DeFrancesco | 40 | 2001 | `0231d965-8660-465c-92da-8df24767dbed` | label-info 全空 |
| Joey DeFrancesco | Estate | 2008 | `88a11fb9-538f-429f-a067-d1f532b0eb26` | label-info 全空 |
| Joey DeFrancesco | In the Key of the Universe | 2019 | `32089a73-3737-4466-8331-915f038be34c` | label-info 部分空 |
| John Coltrane | On Green Dolphin Street | 1997 | `35537d22-bdb3-39b9-a528-1264893119ef` | label-info 部分空 |
| John Coltrane | Complete Live in Stuttgart 1963 | 2010 | `4a22b297-9231-4d31-926f-60e3fb6368b6` | label-info 部分空 |
| John Patton | Green 14 | 2015 | `b8ffca66-51fd-4f09-9dcc-bdeb9bf7ca50` | label-info 全空 |
| John Scofield | Live at the Artpark, Lewiston, NY | 1995 | `08b854e5-d73e-4a23-af86-d4ac66778cbd` | label-info 全空 |
| John Scofield | Live in Zürich | 1998 | `e59173a5-d504-44e6-9983-a80f35246ced` | label-info 全空 |
| John Scofield | Old Folks | 1999 | `a37c53e0-2ccd-45e0-8337-ec44ee3c4214` | label-info 部分空 |
| John Scofield | Live at the Palace Theatre | 2000 | `308e5317-9fc8-42cd-b0ad-e70b7dac961e` | label-info 全空 |
| John Scofield | Live Fasching Stockholm Sweden 2000 | 2000 | `6c9fd708-b921-4977-854b-b6055555d06f` | label-info 全空 |
| John Scofield | Live at Michelson Hall | 2002 | `b348e354-2239-4d2b-8201-97dc227606a5` | label-info 全空 |
| John Scofield | Berkfest, MA 8.11.02 | 2002 | `d7ed269a-6823-4552-aaf0-bed723fcc1b0` | label-info 全空 |
| John Scofield | Dortmund 2007 | 2007 | `6638db85-7188-44c0-acde-db99e7b1c6d9` | label-info 全空 |
| John Scofield | Linz 2007 | 2007 | `a8f70761-7546-4b02-b05b-1f732a03d4e8` | label-info 全空 |
| John Storgårds | Percussion Concertos | 2021 | `7a6e98c4-a270-4156-9405-ae07a011c749` | label-info 全空 |
| Johnathan Blake | Trion | 2018 | `27c7c982-718b-49ce-be80-767bea943ad8` | label-info 部分空 |
| Johnathan Blake | Lost In Geneva | 2026 | `ed3e742e-521c-4427-b984-46f1d344eac2` | label-info 全空 |
| Josh Johnson | Spring Garden Promenade | 2025 | `40874b33-54ba-4a04-85cf-6da5236fb1eb` | label-info 全空 |
| Juliano Rossi | If my friends could see me now | 2004 | `8d740c63-1b67-41a4-ad87-f7bf94ed418e` | label-info 全空 |
| Junko Onishi Trio | Play, Piano, Play: Live in Europe | 1996 | `8ef986a9-7b22-4bae-ba3c-28c7879daeb4` | label-info 全空 |
| Kandace Springs | My Name Is Sheba | 2022 | `f8e36b01-eded-42ab-9f5b-6b29ee2e8ea5` | label-info 全空 |
| Karsh Kale | Tokyo Rotation 1 - Day 2 Set 2 | 2021 | `7beb4802-71e4-4275-8273-2068893875f2` | label-info 全空 |
| Karsh Kale | Our April Tigers | 2023 | `d5214960-193d-4ce6-80b4-bdbcfbd17d01` | label-info 全空 |
| Kendrick Scott | The New Black: Darrell Grant Live at Birdland | 2022 | `5e193227-37fb-4283-adae-434cd2919fcc` | label-info 全空 |
| Kenny Burrell | A La Carte | 1985 | `5fe9d04b-cd06-4b0f-96a8-31ab61ea6ab0` | label-info 全空 |
| Kenny Cox | Duet at Kerrytown | 2009 | `c876171b-4028-4b09-8433-34548615d1be` | label-info 全空 |
| Kenny Dorham | Swedish Sessions | 2019 | `2757e5a3-97cb-4684-8fc3-04ed7d408776` | label-info 全空 |
| Kenny Werner | Effortless Mastery | 1996 | `3b572ec2-673c-3d24-b60f-1e0fa3cc0fd5` | label-info 全空 |
| Kenny Werner | Democracy Live At The Blue Note | 2006 | `25215ef1-e7ff-4c4b-9113-60bd8e4a0335` | label-info 全空 |
| Kenny Werner | Oltreoceano | 2011 | `3a45eaf3-1639-46f8-a37b-6d2a5347d2a9` | label-info 全空 |
| Kenny Werner | Fire and Praise | 2023 | `da3340ff-a1df-4468-bdb2-e62a9af6f3db` | label-info 全空 |
| Kevin Eubanks | Face to Face | 1986 | `ca5c1795-168e-41f9-be71-d36d623b56fd` | label-info 部分空 |
| Kevin Eubanks | Spiritalk 2: Revelations | 1995 | `d783536c-ce83-378a-9211-ba829dee7003` | label-info 全空 |
| Kitty Hoff & Forêt-Noire | Argonautenfahrt | 2013 | `1c9e5684-6277-4e0a-bbbc-7fd9ba4bba1a` | label-info 部分空 |
| Kitty Hoff & Forêt-Noire | Curiose Geschichten | 2013 | `421adde8-7b19-4858-8586-d6f6ced43957` | label-info 部分空 |
| Kurt Elling | Nightmoves | 2007 | `db0a84bb-ddec-3832-b3fa-715f0ed8ecef` | label-info 部分空 |
| Kurt Elling | The Questions | 2018 | `864ba197-7638-44d6-ad65-d85fc4937f54` | label-info 部分空 |
| Kurt Elling | Secrets Are The Best Stories | 2020 | `28fe6467-f22f-4193-ac3b-5aebc5f03679` | label-info 部分空 |
| Lee Konitz | 12 Gershwin In 12 Keys | 1988 | `42f8999f-9440-4c9e-b916-445146368e07` | label-info 部分空 |
| Lee Konitz | Rhapsody II | 1993 | `613a7fd7-6b13-453b-9a46-481510f8ea60` | label-info 全空 |
| Lee Konitz | Live At The Half Note | 1994 | `ab7615cb-ffaa-4077-86a8-0624c635908e` | label-info 部分空 |
| Lee Konitz | Breaths and Whispers | 1995 | `4391866f-7f2b-417e-9ee7-95f427dbfb7a` | label-info 全空 |
| Lee Konitz | Marian McPartland's Piano Jazz with Guest Lee Konitz | 1995 | `8458a685-7c19-3983-882c-abe34aed4a71` | label-info 部分空 |
| Lee Konitz | Brazilian Rhapsody | 1995 | `985cc7b6-53af-4ef3-a449-9be321f1241b` | label-info 全空 |
| Lee Konitz | Tenorlee | 1996 | `96a72cf6-5e01-3c81-96ac-e44e3febe62a` | label-info 部分空 |
| Lee Konitz | DiG DuG DoG | 1997 | `6a5acaf7-53e0-4c95-a1dd-8ff29ddb2331` | label-info 全空 |
| Lee Konitz | Saxophone Dreams | 1997 | `c8ad6e20-efe2-4b04-9b53-66534bc002b6` | label-info 全空 |
| Lee Konitz | Where's the Blues | 1998 | `5076f8b9-408d-4c94-83b7-07202631d667` | label-info 全空 |
| Lee Konitz | On Track | 1999 | `089f8e3c-36c2-46e2-9bed-a45d2a714346` | label-info 全空 |
| Lee Konitz | Three Guys | 1999 | `94938d32-bf8c-4697-b873-5fe8a02d9ece` | label-info 全空 |
| Lee Konitz | Inside Rodgers | 2001 | `53b737b9-a9ad-4e79-9f38-221c586fd0da` | label-info 全空 |
| Lee Konitz | Ides Of March | 2001 | `fe11d8b3-42c9-4077-bf35-95b603e62da5` | label-info 全空 |
| Lee Konitz | Duas Contas | 2002 | `6c23f312-0aaf-4dc8-8c50-308b3248e064` | label-info 全空 |
| Lee Konitz | Live-Lee | 2003 | `7a029ddc-c0a5-485c-864f-a96d50e81a74` | label-info 部分空 |
| Lee Konitz | Live at Dinant Jazz Nights | 2005 | `8000e73f-4795-48b1-94e7-2ce0d7629bf7` | label-info 全空 |
| Lee Konitz | The Glenn Gould Session | 2005 | `9c288f79-78a1-4073-9dc4-762bc2711377` | label-info 全空 |
| Lee Konitz | Poetical Lee 81+15=96! | 2007 | `f05ce39c-96c4-41bf-8d6c-3c9ae44e3373` | label-info 全空 |
| Lee Konitz | GRACEfulLEE | 2008 | `ee77ed0d-4fe4-4fa5-b794-8d97eba631ee` | label-info 全空 |
| Lee Konitz | It's All Right With Me | 2011 | `96713c22-a06d-47f1-a345-a419f470a365` | label-info 全空 |
| Lee Konitz | Owls Talk | 2012 | `ef2bd1f5-4a17-4855-9a6a-c9f350247fae` | label-info 部分空 |
| Lee Konitz | En la Fundación Valparaíso | 2024 | `6b2ae0ae-b37b-489d-8679-180c3c1ff76e` | label-info 全空 |
| Lena Horne | It’s Love / Songs by Burke & Van Heusen | 2004 | `28010825-1216-47c2-8641-dfb274b51aab` | label-info 全空 |
| Lenny White | Tribute to Earth, Wind & Fire | 2004 | `622f62f6-f0e4-4d28-86fb-62729b678f6f` | label-info 全空 |
| Lenny White | Twennynine with Lenny White | 2007 | `c8968ec1-d421-42ff-913f-b4bc9a0ed6f0` | label-info 部分空 |
| Leon Parker | The LEO | 2021 | `04dafff1-3439-4827-8df2-1f70b087839f` | label-info 部分空 |
| Leon Russell | 1988-10-31: Kaiser Center, Oakland, CA | 1988 | `30aa80fa-9e68-45f8-95cd-380cdfe53b47` | label-info 全空 |
| Leon Russell | Legend in My Time: Hank Wilson, Volume III | 1998 | `ab1af49e-e003-3743-859f-a4aa4ed13c00` | label-info 部分空 |
| Leon Russell | Moonlight & Love Songs | 2000 | `5f61b11b-5c90-48a1-b7d2-d5a12955ea1d` | label-info 部分空 |
| Leon Russell | 11/23/72 - Armadillo | 2000 | `8bbdf700-ffbb-4957-8e1a-19ce907bbb21` | label-info 全空 |
| Leon Russell | Signature Songs | 2001 | `08fe5db9-3efe-3c5a-8ae5-b80dd52247b3` | label-info 部分空 |
| Leon Russell | In Your Dreams | 2003 | `87f35540-0468-4491-87ae-3294776d113d` | label-info 全空 |
| Leon Russell | 1970-11-20: Late Show, Fillmore East, New York, NY | 2018 | `64753eb4-a4c7-4e3d-a3d3-548951453f89` | label-info 全空 |
| Leon Russell | 1974-08-02: The Midnight Special, The Church Studio, Tulsa, OK | 2025 | `5be213b9-710b-4d47-ba31-3b5f37df8a72` | label-info 全空 |
| Leon Russell | 1999-02-20: House of Blues, Los Angeles, CA | 2025 | `bf4c2688-7766-4adf-aae5-8746ccaffc89` | label-info 全空 |
| Leon Russell | 2011-10-07: Songwriters' Circle, Porchester Hall, London | 2025 | `cb4fbf87-b3c6-4a62-9c31-8424211d7bed` | label-info 全空 |
| Leon Russell | 1983-11-18: CHCH-TV Studios, Hamilton, Canada | 2026 | `155668ae-4be7-4d24-bc00-4a3d45d377eb` | label-info 全空 |
| Leonardo Amuedo | Otro mundo | 1995 | `23883892-8c2d-3233-bf27-b182069c28e5` | label-info 全空 |
| Leonardo Amuedo | Leonardo Amuedo | 1997 | `b7caae83-1118-368a-af88-e1a89529b4bc` | label-info 全空 |
| Leonardo Amuedo | Ángel de la guardia | 2001 | `1a97070d-d870-38a6-aa54-641cfaf93fb7` | label-info 全空 |
| Leonardo Amuedo | Saudade | 2023 | `f2b20400-3c1e-45bb-9a91-4ba95331eaf7` | label-info 全空 |
| Lester Young | In Washington, D.C., 1956, Volume 4 | 1998 | `bb86b27c-73ca-36c3-ac90-00a01f60f921` | label-info 部分空 |
| Lionel Loueke | Pannon Blue | 2016 | `9e4e76ac-0ddf-4bb0-914b-89f740c469c8` | label-info 全空 |
| Logan Richardson | Blues People | 2018 | `12fb7169-f7d4-4f84-b8f2-e53064b9ed7c` | label-info 部分空 |
| Lou Donaldson | Play the Right Thing | 1990 | `c139b767-3951-492d-836c-92302cd3636b` | label-info 全空 |
| Lou Rawls | Family Reunion | 1987 | `07c92227-043d-4cb3-8452-f311f2124edc` | label-info 全空 |
| Lou Rawls | Gold | 1993 | `c18cd169-0eb9-4c0d-ba42-57b4da5711aa` | label-info 全空 |
| Louis Hayes | Una Max | 1990 | `87a4a2a3-2519-48cc-aef6-b4ee7c07adb0` | label-info 全空 |
| Louis Hayes | Dreamin' of Cannonball | 2001 | `5303b20b-f26a-4dbf-b1e7-59fa7d499765` | label-info 全空 |
| Louis Hayes | The Real Thing | 2009 | `6174f00f-75e8-4a27-9537-f39173b587a4` | label-info 全空 |
| Louis Hayes | Live at Jazzhus Montmartre | 2020 | `3ea29136-fee3-4433-bde9-0327299bd279` | label-info 全空 |
| Marcus Miller | The Ozell Tapes: The Official Bootleg | 2002 | `37d0e26f-dd64-3f5e-9876-f2be1b70ef79` | label-info 部分空 |
| Marcus Miller | Tutu Revisited | 2011 | `e1922bde-ca46-4331-896b-73e06163dbac` | label-info 部分空 |
| Marcus Strickland | Brothrhood | 2002 | `7d899751-8bab-4f11-acc4-172b539e904b` | label-info 全空 |
| Mark Knopfler | The Twelfth Night | 1989 | `c552796e-ee8a-3fff-ac57-2d69dc792e9f` | label-info 全空 |
| Mark Knopfler | Neck and Neck | 1990 | `3f831051-75f4-3085-8d0f-8b94adbb3c5e` | label-info 部分空 |
| Mark Knopfler | Golden Heart | 1996 | `36d64288-e9ae-309b-864a-f9acdaca7387` | label-info 部分空 |
| Mark Knopfler | The Ragpicker’s Dream | 2002 | `9855c588-2fec-315a-93cd-c613752c9de2` | label-info 部分空 |
| Mark Knopfler | 2002-07-28: Palace House, Beaulieu, England | 2002 | `bae8ca2c-6085-4db3-b3fe-f5a6f52abf6e` | label-info 全空 |
| Mark Knopfler | Guitar Dreams | 2003 | `74507d81-aff1-421b-a4b8-0727cd96327d` | label-info 全空 |
| Mark Knopfler | Shangri‐La | 2004 | `b21318ca-ba79-3d9a-aa46-ffc3b8a9b98a` | label-info 部分空 |
| Mark Knopfler | Lyon | 2005 | `0cfb1b9e-6d4d-4eec-88c2-176cee7e9848` | label-info 全空 |
| Mark Knopfler | Live from Nashville | 2005 | `7f423027-0a72-4519-b680-2a64bd8d24b6` | label-info 全空 |
| Mark Knopfler | On the Road to Milano | 2005 | `948d1c9e-ac13-357e-8a5b-7b4964d5cead` | label-info 全空 |
| Mark Knopfler | 2005-07-28: Britt Amphitheatre, Jacksonville, OR, USA | 2005 | `ee12353a-0966-4930-acd5-5d1e2a55df5e` | label-info 全空 |
| Mark Knopfler | All the Roadrunning | 2006 | `1b4d7819-4523-3ef6-beb4-dcc491e3e65c` | label-info 部分空 |
| Mark Knopfler | Live at Boothbay | 2006 | `991603d4-f982-4b1c-9f4e-67824267fe8b` | label-info 全空 |
| Mark Knopfler | Kill to Get Crimson | 2007 | `73e7b1df-648c-3bca-88f1-db3b4622c23a` | label-info 部分空 |
| Mark Knopfler | 2008-03-31: Ahoy, Rotterdam, Netherlands | 2008 | `c58f47bf-79cb-4718-9c59-24a702f1e40d` | label-info 全空 |
| Mark Knopfler | Get Lucky Tour 2010 - Bergen (NO) (2010-06-14) | 2010 | `3bf447be-80a7-4d11-a027-c0974c522a87` | label-info 全空 |
| Mark Knopfler | 2010-05-23: Get Lucky Tour: Birmingham, UK | 2010 | `9fd12271-9bb5-47be-84fd-e43d8707be24` | label-info 全空 |
| Mark Knopfler | Get Lucky Tour - Live in Frankfurt - 07.06.2010 | 2010 | `e0d167a6-7ef2-41d3-a288-4541ddd7af62` | label-info 全空 |
| Mark Knopfler | Privateering Tour Live Recordings – Clermont-Ferrand 2013‐06‐29 | 2013 | `1bc4893a-d73c-45aa-8db0-632d54f2c97e` | label-info 全空 |
| Mark Knopfler | Privateering Tour 2013 - Bergen (NO) (2013-06-12) | 2013 | `827dd269-7cfe-421f-8b58-644695e5c3cc` | label-info 全空 |
| Mark Knopfler | Privateering Tour 2013: Live in Cologne 2nd July | 2013 | `96271460-de11-4562-9e9f-0f2ee52ae085` | label-info 全空 |
| Mark Knopfler | Privateering Tour Live Recordings – Antwerpen 2013‐05‐12 | 2013 | `a2c01065-a584-4d16-9b19-14df26817133` | label-info 全空 |
| Mark Knopfler | Tracker Tour 2015 (Live at the Beacon Theatre, NYC 21/10/2015) | 2015 | `13d069bd-5d0c-40fe-aa61-771f3765a8fc` | label-info 全空 |
| Mark Knopfler | Tracker | 2015 | `1b7e182d-5c13-41cc-8ee6-780fba9da71b` | label-info 部分空 |
| Mark Knopfler | Tracker Tour 2015 (Live in Dublin IE 15/05/2015) | 2015 | `2eb8e5b3-d795-4309-9891-7ca438a5f5ba` | label-info 全空 |
| Mark Knopfler | Tracker Tour 2015 (Live in Bergen NO 09/06/2015) | 2015 | `2f8fe669-b58e-48c1-8d97-958d98069efb` | label-info 全空 |
| Mark Knopfler | Tracker Tour 2015 (Live in Paris FR 02/06/2015) | 2015 | `4fccf7eb-e3c6-4374-b17a-76e84bc7d825` | label-info 全空 |
| Mark Knopfler | Tracker Tour 2015 (Live in Milwaukee, WI 30/09/2015) | 2015 | `86d679ec-aaf6-4182-9808-99223947e66c` | label-info 全空 |
| Mark Knopfler | Tracker Tour 2015 (Live in Birmingham UK 23/05/2015) | 2015 | `a221589d-8a15-4230-be52-c06c6a632bc9` | label-info 部分空 |
| Mark Knopfler | 2015-05-23: LG Arena, Birmingham, UK | 2015 | `a3b90243-131e-48dd-bc34-3a585316d48c` | label-info 全空 |
| Mark Knopfler | Tracker - Live in Lucca 22/07/2015 | 2015 | `abb58882-002f-40d2-9e00-2a05ee97b974` | label-info 全空 |
| Mark Knopfler | Tracker-Live in-Amsterdam-2015-06-06 | 2015 | `add7e3fd-ec5f-45f5-bcd1-fa5b8db48f2d` | label-info 全空 |
| Mark Knopfler | Tracker Tour 2015 (Live in Paris FR 03/06/2015) | 2015 | `f80c51fd-4829-45a7-895c-b5436254ba85` | label-info 全空 |
| Mark Knopfler | Tracker Tour 2015 (Live in London UK 26/05/2015) | 2015 | `fd7d45dc-c469-4520-adfe-a0e5e20cf67f` | label-info 全空 |
| Mark Knopfler | Down The Road Wherever Tour 2019 | 2019 | `3fc897ce-1fd5-4967-a5dd-ef6abe08e4dc` | label-info 全空 |
| Mark Knopfler | Down The Road Wherever Tour 2019 - Bergen (Bergenhus Festning - Plenen) (2019.06.08) | 2019 | `7d570e68-17fd-4d3c-b062-93e01b838c4b` | label-info 全空 |
| Mark Knopfler | Tokyo 1988 | 2019 | `b09eb827-18c6-4cb6-abdc-76c1a0809120` | label-info 部分空 |
| Mark Knopfler | 2019-05-30: Genting Arena, Birmingham, UK | 2019 | `b15cff93-4399-4a0b-8220-59ab9ad732d6` | label-info 全空 |
| Mark Knopfler | Solid Rock Live | 2020 | `b1d90623-a4ec-4bfa-89d2-e27dc9b4282c` | label-info 全空 |
| Martial Solal | Solal - Lockwood | 1993 | `70da8b40-d0ac-4fe7-b30a-ef0f17dd739e` | label-info 全空 |
| Martial Solal | In & Out | 1999 | `a667f71b-49b9-44ed-8be5-93999a2ad93d` | label-info 部分空 |
| Martial Solal | Stella by Starlight (Remastered) | 2018 | `5d00fd34-646b-47fe-b854-0d69d19f1619` | label-info 全空 |
| Martial Solal | Picture Window | 2020 | `392bbbb5-0b61-4df1-8746-196aa49c9970` | label-info 全空 |
| Martial Solal | Coming Yesterday - Live at Salle Gaveau 2019 | 2021 | `344694b9-5a2d-450f-9114-77b1ab6fbd4e` | label-info 全空 |
| Marvin Stamm | Mystery Man | 1993 | `956e6cd1-7bbb-3768-b15a-772807c9c60d` | label-info 部分空 |
| Marvin Stamm | Delaware River Suite - The Inventions Trio | 2008 | `e4e177bc-9f1b-4335-b9c9-9d35b675a679` | label-info 全空 |
| Marvin Stamm | Life's A Movie - The Inventions Trio | 2013 | `91e9f8e5-ba6b-4279-840e-bca4f83eb7fd` | label-info 全空 |
| Marvin Stamm | Fantasy - The Inventions Trio | 2020 | `d1dd58d5-76f4-4434-a71e-bde5b937d027` | label-info 全空 |
| Max Roach | Creating The Beat | 2007 | `81cdd995-6da9-4e9d-af6f-346714562afc` | label-info 全空 |
| Max Roach | Audio Blues | 2011 | `cf7566f1-3327-4a64-975b-3f594ecf1c93` | label-info 全空 |
| McCoy Tyner | Live at the Musicans Exchange Cafe | 1987 | `2c4dd5d2-7602-3fc9-9130-4b77d881d875` | label-info 部分空 |
| McCoy Tyner | Live in Warsaw | 1992 | `cd4e3135-60a6-4900-8cf6-663fdb1506ff` | label-info 部分空 |
| McCoy Tyner | Journey and Turning Point | 2002 | `06a4e2f0-7d86-34b2-a59e-abf99819b2cc` | label-info 全空 |
| McCoy Tyner | The Quartet Live Chicago 1982 | 2021 | `58bbed87-43b4-4f33-82d5-2d9f5b0c5d73` | label-info 全空 |
| McCoy Tyner | Reve (Live Basel '74) | 2025 | `3b43247d-e61c-42c3-8b40-21e8dfdcdad8` | label-info 全空 |
| Medeski, Martin & Wood | 1995-11-03: Wetlands, New York, NY | 1995 | `b657f4e1-bb0f-4511-828f-8522ee71bc9b` | label-info 全空 |
| Medeski, Martin & Wood | 1995-10-14: Emo's, Austin, TX, USA | 1995 | `c2e0394a-121c-3b92-a5f0-4ee2c83589d9` | label-info 部分空 |
| Medeski, Martin & Wood | 1996-04-18: Fox Theater, Boulder, CO, USA | 1996 | `f5757e8e-3251-40f0-994e-bf31152209d6` | label-info 全空 |
| Medeski, Martin & Wood | Farmer's Reserve | 1997 | `2302e674-1801-3aca-8c5f-59a86f62584b` | label-info 部分空 |
| Medeski, Martin & Wood | 1998-06-08: Jazz Festival: New York, NY, USA | 1998 | `ed7cfa99-d314-3209-954a-8eb615845b1a` | label-info 全空 |
| Medeski, Martin & Wood | 1999-08-03: Liquid Room, Tokyo, Japan | 1999 | `3de4ba4d-f2bf-35da-aa4f-5a55bce21ddf` | label-info 全空 |
| Medeski, Martin & Wood | 2003-11-13: The Canopy Club, Urbana, IL, USA | 2003 | `fbead108-a9af-397c-92dc-a864134354b6` | label-info 全空 |
| Medeski, Martin & Wood | 2004-10-31: Hammerstein Ballroom, New York, NY, USA | 2004 | `306fb130-7e09-35f8-8661-481fbe4e91f9` | label-info 全空 |
| Medeski, Martin & Wood | 2004-02-28: Bowery Ballroom, New York, NY, USA | 2004 | `4137f81f-a35a-33e0-a11a-59a94b6f7cdd` | label-info 全空 |
| Meshell Ndegeocello | Jazz Poetry Concert 2012 | 2013 | `fc8e1300-82d7-49e8-9382-832d93e8c0b1` | label-info 全空 |
| Metropole Orkest | Straight Into Your Heart | 2007 | `ee0a9907-4938-4827-9dfc-6c949adcaad9` | label-info 全空 |
| Metropole Orkest | Black Symphony | 2008 | `06821f37-9a5b-3e58-b90c-c75c7ca7c17b` | label-info 部分空 |
| Metropole Orkest | Sint | 2010 | `b1d713cd-a58c-4dcb-bfc1-1a402a0cebff` | label-info 全空 |
| Metropole Orkest | Sint | 2011 | `4c53e5bd-4f09-4022-9e88-34d1435f6066` | label-info 全空 |
| Metropole Orkest | Markus Stockhausen and the Metropole Orkest | 2013 | `646c1af2-c5c6-4fa1-a585-cb10cbe5ff78` | label-info 全空 |
| Metropole Orkest | Metropole Studio Sessions: Dutch Jazz Jam II | 2021 | `46ccb3d0-6af2-4d20-9132-faf63bc7c093` | label-info 全空 |
| Metropole Orkest | nothing | 2024 | `5ea3bcc1-347d-4140-bd0e-f26d9ba46b8e` | label-info 部分空 |
| Metropole Orkest | Metropolarity | 2025 | `c381aaa3-e75a-4f97-a8a2-cd8f391e620e` | label-info 全空 |
| Metropole Orkest | TORÓ | 2026 | `be64c050-2355-4e1c-b5bb-c29bbffa000c` | label-info 全空 |
| Michel Petrucciani | Cold Blues | 1985 | `f04bbcc6-a0d4-39d2-b21a-2843be250277` | label-info 部分空 |
| Michel Petrucciani | Conference De Presse (With Eddie Louiss) | 1994 | `effece54-1ac0-4cdc-adea-6658c09628bc` | label-info 全空 |
| Michel Petrucciani | Jazz Festival de Nice | 1998 | `4ee56060-7af4-4ab8-adeb-e39dad810047` | label-info 全空 |
| Michel Petrucciani | Trio in Tokyo | 1999 | `8b89c2f8-8d7a-3147-af17-1fd33f7d5d2d` | label-info 部分空 |
| Michel Petrucciani | Solo in Denmark | 2022 | `521977ad-68f3-47d6-8369-3ec704740cec` | label-info 部分空 |
| Miles Davis | Cookin’ at the Plugged Nickel | 1987 | `14e719f1-2647-3652-ba4b-e471194c7e38` | label-info 部分空 |
| Miles Davis | Miles in Antibes | 1989 | `87531a6a-d89a-32e4-a7fc-8e2a5c6fe606` | label-info 部分空 |
| Miles Davis | Round Midnight | 1991 | `5e9aaaf6-34c2-4263-9938-325a2f94a980` | label-info 部分空 |
| Miles Davis | From His Last Concert in Avignon | 1992 | `0296217c-404c-36db-abbe-3dde60ddd1d5` | label-info 部分空 |
| Miles Davis | 1969 Miles – Festiva de Juan Pins | 1993 | `be5fb01c-09d0-3a8f-a56b-44a45d7a4baa` | label-info 部分空 |
| Miles Davis | Another Bitches Brew, Two Concerts in Belgrade | 1995 | `086bf5c8-4a7b-3ec0-b7d3-a967c813bc40` | label-info 部分空 |
| Miles Davis | Highlights from the Plugged Nickel | 1995 | `a5495015-9d20-390d-8be6-7539cd7b55ae` | label-info 部分空 |
| Miles Davis | No (More) Blues | 1999 | `0d5f1af3-6dde-3303-a488-548d2d05b27b` | label-info 部分空 |
| Miles Davis | Chasin' the Bird | 2000 | `ff6a579a-47f2-3d11-9460-314918002025` | label-info 全空 |
| Miles Davis | Highlights from the Complete Miles Davis at Montreux | 2002 | `c8d7c551-0e9f-386c-9426-cb15244c3bae` | label-info 全空 |
| Miles Davis | Setlist: The Very Best of Miles Davis LIVE - (Electric) | 2011 | `2fb597b4-81bb-4cba-9e7d-db3821afdb2d` | label-info 部分空 |
| Miles Davis | Melbourne Concert Hall, Australia, May 2nd, 1988 (Remastered, Live On Broadcasting) | 2025 | `51bfb8b0-937b-4aa8-a2e9-e596e8975357` | label-info 全空 |
| Miles Davis | Helligdom | 2025 | `edf9db96-6b0d-49ed-856a-3fe330b66909` | label-info 全空 |
| Miles Davis | Lady Be Good: Live in Europe with the Birdland All-Stars 1956 | 2026 | `65b0454d-fb70-4bb4-bae1-b5ec845f4bf4` | label-info 全空 |
| Milt Jackson | Milt Jackson, Ray Brown Jam Montreux '77 | 1989 | `7b3095b4-6536-46ff-ae96-8b6c2c87fecf` | label-info 部分空 |
| Milt Jackson | Mostly Duke | 1991 | `306081ed-d944-4613-b311-63a464f0d938` | label-info 全空 |
| Milt Jackson | + The Big Band - Vol.1 | 1992 | `ac3ff3ba-c45e-3c29-9070-5e1b9589565b` | label-info 部分空 |
| Milton Nascimento | Encontros e despedidas | 1985 | `e895fd48-e1d8-3126-9061-4b7ce2507c88` | label-info 部分空 |
| Milton Nascimento | A barca dos amantes | 1986 | `b78473f5-381c-3dcd-825f-ee8db6be19fb` | label-info 部分空 |
| Milton Nascimento | Yauaretê | 1987 | `cc86f805-0177-394c-a065-7a85185da94d` | label-info 部分空 |
| Milton Nascimento | Txai | 1990 | `5b62c2b5-f78d-338d-ac6a-3dde03f00d34` | label-info 部分空 |
| Milton Nascimento | O planeta Blue na estrada do Sol | 1992 | `5c317cae-f68b-345c-9fe8-053b1d08f08f` | label-info 部分空 |
| Milton Nascimento | Tambores de Minas | 1998 | `76591cb6-e8fb-35cb-92b8-bfc4f2dff506` | label-info 部分空 |
| Milton Nascimento | Crooner | 1999 | `3ba12959-0129-3e05-ae07-b539c60e2e6b` | label-info 部分空 |
| Milton Nascimento | Impecável | 2000 | `a026f2aa-f920-3a34-b38c-64e62d73690a` | label-info 全空 |
| Milton Nascimento | As gralhas | 2026 | `44070d38-fbd2-443b-aa0e-204bef599b7e` | label-info 全空 |
| Mose Allison | 1975-08-12: PBS Soundstage, WTTW Studios, Chicago, IL | 2025 | `265a469b-82a7-42d5-af62-f2075c80771e` | label-info 全空 |
| Musica Nuda | Little Wonder | 2015 | `5047a945-258d-4e00-a9d8-2c3db79990f6` | label-info 部分空 |
| Musica Nuda | Leggera | 2017 | `63bedcc4-d94a-4ecd-90b4-d134c7020921` | label-info 部分空 |
| Nate Mercereau | Live in Venice | 2023 | `3249d348-91c9-4a20-b92d-2a463db850b8` | label-info 全空 |
| Nate Mercereau | Excellent Traveler | 2024 | `2907f528-9449-4b15-9d44-f7ca03dafde9` | label-info 全空 |
| Nate Mercereau | digi-squires | 2025 | `b544afaa-0fda-4435-aa59-d392c0ce93e8` | label-info 全空 |
| Nate Smith | Quasar | 2013 | `a7cbee6c-f685-4762-b9a1-02cebb9d5b53` | label-info 全空 |
| Nate Smith | Pocket Change | 2018 | `ecbd5061-fd8f-45b0-8a66-a54d3e50c9bb` | label-info 全空 |
| Nate Smith | Live-Action (Deluxe) | 2025 | `53643c7b-5720-4963-aa0f-96e65d989a5e` | label-info 全空 |
| Nels Cline | THE ART SPIRIT - Ben Goldberg, Nels Cline, Tom Rainey Live at the Owl Music Parlor | 2022 | `9dc3facb-c410-460e-8f5a-e73861f9a0b9` | label-info 全空 |
| Nicola Conte | Let Your Light Shine On | 2018 | `1ce21aea-c161-41a0-856b-e17eecdd325b` | label-info 部分空 |
| Nicola Conte | Viaggio | 2025 | `4a6bbfab-9ce2-454c-b396-072c7948b0f7` | label-info 全空 |
| Niels‐Henning Ørsted Pedersen | Threesome | 1986 | `8846b357-6244-3449-a8f8-371d4ed32a69` | label-info 部分空 |
| Niels‐Henning Ørsted Pedersen | Friends Forever | 1997 | `3c8d31e4-d177-34a9-8562-566956f5497c` | label-info 部分空 |
| Niels‐Henning Ørsted Pedersen | This Is All I Ask | 1998 | `051037a9-8831-3759-832e-9e6a618cd9e9` | label-info 部分空 |
| Niels‐Henning Ørsted Pedersen | The Duets | 1999 | `ff78386a-2bef-3766-b77a-332420297f7b` | label-info 全空 |
| Niels‐Henning Ørsted Pedersen | Django | 2017 | `886d65c9-c49d-4400-b81d-6f1113dd7f4f` | label-info 全空 |
| Niels‐Henning Ørsted Pedersen | The Duo - Duke Ellington 100 | 2020 | `7238aa05-8069-4d58-89f8-40081fce7c2b` | label-info 全空 |
| Nitai Hershkovits | Lemon the Moon | 2019 | `b62b7956-8667-4d6a-9c63-e13387e47e5c` | label-info 部分空 |
| Nitai Hershkovits | Rollin' Until Late | 2022 | `6eaca1e9-8419-4763-a99f-3a2d7600a561` | label-info 全空 |
| Nitai Hershkovits | Found & Found | 2026 | `6658728c-93e0-4a5c-ad2b-9d8a0048f1e2` | label-info 全空 |
| Norah Jones | Marian McPartland’s Piano Jazz | 2003 | `15a68b1f-f487-3082-af61-f85ef4989903` | label-info 部分空 |
| Norah Jones | New York City | 2003 | `76352c83-9b40-3b49-9b65-5a4fde8e8306` | label-info 部分空 |
| Norah Jones | Live in PARIS (Palais Des Congrès) | 2004 | `259af1d7-7839-3d11-99ae-265e27da1058` | label-info 全空 |
| Norah Jones | Live at Heineken Music Hall | 2004 | `74a05f8b-4118-4d5f-96b3-0654b43d9d28` | label-info 全空 |
| Norah Jones | Singing About You | 2012 | `0bc61fcc-cecf-438f-aef2-9f3ce756f9bf` | label-info 全空 |
| Norah Jones | Norah Jones in London 2007 | 2026 | `e80c8ca8-25d1-4df8-8d61-e2f2561fa8ca` | label-info 部分空 |
| Ornette Coleman | Opening the Caravan of Dreams | 1985 | `c26130ff-b142-3219-aeaa-63be09ba71ac` | label-info 部分空 |
| Ornette Coleman | Song X | 1986 | `8b9217e4-5d29-3f9b-aeec-5d66f83954fe` | label-info 部分空 |
| Ornette Coleman | Colors: Live From Leipzig | 1997 | `0b3112aa-a257-3f15-b133-b40f2a4863b4` | label-info 部分空 |
| Ornette Coleman | Love Revolution: Complete 1968 Italian Tour | 2005 | `c256de9c-b91c-33a2-abda-e0d5274f7529` | label-info 部分空 |
| Ornette Coleman | Jazz Jamboree ’93 | 2007 | `b276bdac-b83f-475c-900f-51d6e2e112a9` | label-info 全空 |
| Paolo Fresu | Live at Vaulx Jazz festival | 2016 | `e4351b56-1521-413d-954f-da6f5652e0e5` | label-info 全空 |
| Paolo Fresu | Grido | 2020 | `07b325d3-25e1-402f-811b-3ad5b2c08b30` | label-info 全空 |
| Paolo Fresu | Tango macondo | 2021 | `ef2520f6-7cf0-407b-a332-1c1a748625f6` | label-info 部分空 |
| Paolo Fresu Devil Quartet | Desertico | 2013 | `2212fe4c-1e5d-4d8d-a3a9-8284290a4650` | label-info 部分空 |
| Paolo Fresu Quintet | Mélos | 2000 | `b2b0eb83-3fff-37b3-9ab6-aeecd197e635` | label-info 全空 |
| Pat Martino | Bronx Tale | 1994 | `9682e8dd-71ff-4995-9d4e-2d187a1ae60f` | label-info 全空 |
| Pat Martino | The Maker | 1995 | `a4334f28-4fc5-4267-b2cf-e71523499961` | label-info 部分空 |
| Pat Metheny | This World | 1994 | `c04bb621-0a7b-3e9f-aa94-476d93a10499` | label-info 全空 |
| Pat Metheny | Move to the Groove | 2001 | `0e600194-0aa3-3e51-996d-e4700ed30815` | label-info 部分空 |
| Pat Metheny | Upojenie | 2002 | `c80b4a86-a115-38bc-8c95-37920bd44de9` | label-info 部分空 |
| Pat Metheny | JAZZBALTICA 2003 | 2003 | `4a882873-9ebf-4ad5-a536-d6f68fe4d833` | label-info 全空 |
| Pat Metheny | One Quiet Night | 2003 | `fc2a8b24-7992-3c1a-9f4a-d86b959ba3f4` | label-info 部分空 |
| Pat Metheny | Down in Texas (Live Houston ’81) | 2021 | `21e638f7-2c23-4dfc-ab9a-fae0dcdcf952` | label-info 全空 |
| Pat Metheny | WLIR FM Broadcast Hofstra Playhouse Hempstead New York 17th November 1979 2nd Show | 2021 | `3848be2d-c624-4696-8a14-16df2dde05d2` | label-info 全空 |
| Pat Metheny | Side‐Eye III+ | 2026 | `9935bcb4-6fe1-4c9f-a705-434d5300273f` | label-info 部分空 |
| Patricia Barber | Café Blue | 1994 | `3bfcecef-1cf2-3c7f-957b-dd84043a035d` | label-info 部分空 |
| Patricia Barber | Monday Night | 2009 | `4598bb65-7113-493f-be2a-25d62a7c869d` | label-info 全空 |
| Patricia Barber | Monday Night Volume 2 | 2011 | `19b93a29-9f89-4ba0-970b-7c214d6b6f6c` | label-info 全空 |
| Phil Woods | Você E Eu | 2000 | `1fc72858-af05-333e-844d-5ea94263687a` | label-info 全空 |
| Phil Woods | Voyage - with the Bill Charlap Trio | 2001 | `2519774e-d745-3500-a275-00eb71c7ff7e` | label-info 全空 |
| Phil Woods | Our Man Benny | 2010 | `f427f856-c271-4b40-9f0f-2a0307d297f1` | label-info 全空 |
| Phil Woods | The Gershwin Affair (Dedicated to the New Orleans People) | 2011 | `8113a178-6626-4200-8868-ee1940aa2c0f` | label-info 全空 |
| Phil Woods | Bird with Strings...and More! | 2023 | `ed1b899a-bdc3-4821-ba91-efd178315032` | label-info 全空 |
| Pieces of a Dream | Bout Dat Time | 1989 | `f4bb867e-6867-3f2b-984f-62ea8dce0cc8` | label-info 部分空 |
| Pieces of a Dream | No Assembly Required | 2004 | `4f031d9b-96b5-36dd-b64a-4e86b9ddce68` | label-info 部分空 |
| Prysm | Time | 1999 | `1e8ff572-72cb-3a59-a31c-163b03c7acf7` | label-info 全空 |
| Rachelle Ferrell | Rachelle Ferrell | 1990 | `93906821-5f00-3889-9544-ea001b69a83c` | label-info 部分空 |
| Rachelle Ferrell | Individuality (Can I Be Me?) | 2000 | `53f305b3-2f1b-3d3f-aec4-6ad4df969f30` | label-info 部分空 |
| Randy Brecker | Jazz Suite "Tykocin" | 2009 | `c111db75-8d96-473d-a473-5f31d8b537f5` | label-info 部分空 |
| Randy Brecker | Trumpet Story | 2014 | `46858711-1ba3-411b-acba-5745783356cd` | label-info 全空 |
| Randy Brecker | Dearborn Station | 2015 | `2221938a-411e-4326-817b-44bd75567e8e` | label-info 全空 |
| Ravi Coltrane | Mad 6 | 2002 | `6533a2ac-e4e0-3295-9224-3f7c04621ab6` | label-info 部分空 |
| Ray Barretto & New World Spirit | Taboo | 1994 | `c2e0f1bb-a0af-34c2-9135-08e76c3b63bd` | label-info 全空 |
| Ray Barretto & New World Spirit | Trancedance | 2001 | `47ac6b02-6805-4567-b407-13a78c0a9e23` | label-info 全空 |
| Reuben Rogers | At Play | 2020 | `ddcb7558-8bfe-4617-9508-cc6c8be5aaeb` | label-info 全空 |
| Reuben Wilson | Got to Get Your Own | 2008 | `0b60c107-9691-4c39-a727-89dfab8033b8` | label-info 部分空 |
| Rick Margitza | Community Standards | 2022 | `f2e0b424-6801-46e3-ac9e-0fc001413544` | label-info 全空 |
| Ricky Dillard | Amazing | 2014 | `f99485ad-9692-4f58-a30f-2aaa4a195c4b` | label-info 全空 |
| Rita Reys | Live at the Concertgebouw | 1986 | `469cbdb9-469c-4fb3-b455-f1e28969b90b` | label-info 全空 |
| Rita Reys | Young at Heart | 2010 | `46422450-1570-4825-bcfe-2fb035939b8f` | label-info 全空 |
| Robby Krieger | Robby Krieger | 1985 | `4045fa95-319c-46f5-8e08-41c71744e139` | label-info 全空 |
| Robby Krieger | Live at The China Club and More.. | 2012 | `5eda5190-12c5-4747-8060-a3cd9c0a4874` | label-info 全空 |
| Robby Krieger | Red Shift | 2019 | `61ca667e-809b-4b2a-a62b-fcf808782d5c` | label-info 全空 |
| Robert Randolph & The Family Band | Live at the Wetlands | 2002 | `924a6494-b5c5-32ba-9455-6cae0062b71a` | label-info 部分空 |
| Robert Randolph & The Family Band | 2007-05-04: Crossroads, Kansas City, MO, USA | 2007 | `aae3603f-cafc-4ace-bc6d-e0544ba550ce` | label-info 全空 |
| Robert Randolph & The Family Band | 2009-09-26: Crossroads, Kansas City, MO, USA | 2009 | `90765940-5dc5-4743-bd71-0591a1376fab` | label-info 全空 |
| Roberto Gatto | Cammino Personale | 1995 | `ac579f78-484d-4be0-a57c-a3fa0453ce9b` | label-info 全空 |
| Roberto Gatto | Melodies | 2004 | `094799a7-871e-47a4-be94-592cae56ae36` | label-info 全空 |
| Roberto Gatto | Gershwin & More... Live! | 2006 | `25bc23f9-a4f9-4277-b030-56d0b3c42134` | label-info 部分空 |
| Ron Carter | Eight Plus | 1990 | `e8ac5e3f-d39d-42e9-aaca-c32feac53cb3` | label-info 部分空 |
| Ron Carter | Speak Low | 1990 | `2282ec14-7af1-46b0-903a-f897c95eaba1` | label-info 部分空 |
| Ron Carter | Panamanhattan | 1991 | `b4ae2e15-25d6-389e-a443-0fc445502006` | label-info 部分空 |
| Ron Carter | Jazz, My Romance | 1994 | `d4da0e99-768e-42bd-83f3-7d37b5149f6c` | label-info 全空 |
| Ron Carter | Brandenburg Concerto | 1997 | `3f03b660-8de5-33f8-a552-84365722a4d0` | label-info 全空 |
| Ron Carter | Holiday in Rio | 2001 | `9f1e1d5c-93be-42b6-9057-3ca9967c6f09` | label-info 全空 |
| Ron Carter | Stardust | 2001 | `bfb6c1ec-2f72-328e-a0f9-a844802cef07` | label-info 全空 |
| Ron Carter | The Art of Three | 2001 | `b5501c36-2b3d-355e-a22b-536af0b27a0b` | label-info 部分空 |
| Ron Carter | Apres Un Reve | 2003 | `c67e6812-3231-43ab-b484-3d475f4a6b0a` | label-info 部分空 |
| Ron Carter | In New York | 2004 | `2aee0346-abae-4076-8391-b688cfbc52df` | label-info 部分空 |
| Ron Carter | It's the Time | 2007 | `49922212-4401-4a30-ad92-7a8d5f2c7ef2` | label-info 部分空 |
| Ron Carter | The World of Ron Carter | 2009 | `5889e567-88cf-4fe0-8818-59567828c33e` | label-info 全空 |
| Ron Carter | The Vanguard Date | 2013 | `a9b3ed1c-e9be-41a2-b73e-8fb676f7b6f0` | label-info 全空 |
| Ron Carter | Cocktails at the Cotton Club | 2013 | `b5bbb766-7963-4864-a40d-54c320376327` | label-info 全空 |
| Ron Carter | Remembering Bob Freedman | 2021 | `6f2114aa-7be1-4224-bcce-dbc9693cc135` | label-info 全空 |
| Ron Miles | I Am a Man | 2017 | `6f8668bc-8a98-407a-a4f6-26d6daf6a1d1` | label-info 全空 |
| Ronnie Laws | Identity | 1990 | `f3c4fdee-8aaa-45c3-8ef6-4a782cb25c66` | label-info 部分空 |
| Ronnie Laws | Everlasting | 2004 | `6b982d57-dc93-3a3e-bef2-c34dcaf8a440` | label-info 全空 |
| Ronnie Laws | The Three Kings Vol. 2 | 2008 | `8bb01505-53d6-473a-a2a6-cacafc5979c6` | label-info 全空 |
| Ronnie Laws | Voices in the Water | 2009 | `1517e4c1-2a55-4a0f-8001-a2552a72f38d` | label-info 全空 |
| Ronny Jordan | After 8 | 2004 | `1dc667fd-c127-3cda-bb6b-39e1a4c1d8e3` | label-info 部分空 |
| Ronny Jordan | The Rough & The Smooth | 2009 | `6ff53567-3fde-4567-9aa9-ca5ed18c8b6d` | label-info 部分空 |
| Ruben Hein | Live | 2011 | `d00a707f-f318-434e-890a-dad529f8744b` | label-info 全空 |
| Ruben Hein | Groundwork Rising | 2018 | `66ed6a71-ae03-45b8-a4b4-0c7ad34c5337` | label-info 全空 |
| Ryan Adams | Exit Inn: Nashville, TN October 28 1999 | 1999 | `56af0fb9-c245-3ca1-be7b-fe957d1b5cad` | label-info 全空 |
| Ryan Adams | Live at the Dive ’00 | 2000 | `81dfe599-465f-3539-ae3b-a2a2cfac4423` | label-info 全空 |
| Ryan Adams | The Heartbreaker Demos | 2000 | `a1ee0a01-6a25-3a31-b47b-8f8484760676` | label-info 全空 |
| Ryan Adams | 2002-02-13: Century Ballroom, Seattle, WA, USA | 2001 | `0aded8c4-5aaa-30bc-98ec-bf54bfe44ce1` | label-info 全空 |
| Ryan Adams | Gold | 2001 | `4c7d8cfb-0678-38a4-ac3b-8ff98705a6b5` | label-info 部分空 |
| Ryan Adams | Suicide Handbook | 2002 | `372fabec-9278-336a-b1fc-81d50672465b` | label-info 部分空 |
| Ryan Adams | Rock n Roll | 2003 | `36fd3d9d-754b-3703-8f43-6ecd80b943a4` | label-info 部分空 |
| Ryan Adams | Love Is Hell | 2003 | `6aa30ea1-f494-3492-a416-ebab3255dbc7` | label-info 部分空 |
| Ryan Adams | 2003-01-17; Housing Works Book Cafe, New York, NY, USA | 2003 | `bcf47cd5-4b68-4bce-95f2-57c11213c7af` | label-info 全空 |
| Ryan Adams | Wednesdays | 2020 | `57c36790-3705-45af-b175-08efe90f5cb0` | label-info 部分空 |
| Sabrina Starke | Lean on Me | 2013 | `14b7f9c4-79ef-4853-9929-571785b8d7e3` | label-info 全空 |
| Sabrina Starke | Sabrina Starke | 2015 | `980b8592-d518-42f0-8366-5f379112d16b` | label-info 全空 |
| Sam Rivers | Tangens | 1998 | `dec71361-3f14-4021-81a2-18548c61f054` | label-info 全空 |
| Sarah Vaughan | It’s You or No One | 1993 | `122937e8-4931-306d-ba1a-a59f4e86866d` | label-info 全空 |
| Sarah Vaughan | Sweet Affection | 1996 | `6a3aa624-d746-32c9-a82d-21b6ddc86f54` | label-info 全空 |
| Sarah Vaughan | Swingin’ Ladies of Jazz | 2002 | `2e5db352-4392-4eca-9a59-d50bfe004175` | label-info 全空 |
| Sarah Vaughan | A Night of Sass & Brass | 2006 | `d531a370-112f-45cf-847e-52732334d8c4` | label-info 全空 |
| Sarah Vaughan | I Had a Ball: Concert in Paris | 2021 | `02a44a34-a41d-4ff4-83ba-1a0475eeda14` | label-info 全空 |
| Sarah Vaughan | Live at the Berlin Philharmonie 1969 | 2021 | `8bc85811-7dc0-4e00-af2b-56bf56e94141` | label-info 全空 |
| Severi Pyysalo | Turn Out of the Stars | 2020 | `1afafd04-79c0-4e21-9b38-79f23129af65` | label-info 全空 |
| Sherman Irby | A Jazz Christmas Celebration for Banfi | 2009 | `268d7287-00f3-457f-8c98-f6d3d764521f` | label-info 全空 |
| Sidney Bechet | Jazz at Storyville | 1988 | `4f496abb-bb35-4495-a32e-7461190f166e` | label-info 部分空 |
| Sidney Bechet | Le soir où... l'on cassa l'Olympia | 1996 | `e5a68cf9-59a4-3886-8e4b-9e502da0def1` | label-info 全空 |
| Sly Johnson | Silvère | 2019 | `cda66f53-7f8f-4a6c-a089-1b25d73409cc` | label-info 全空 |
| Sonny Clark | Oakland 1955 | 1995 | `03dc2a70-4b7c-3194-a85d-b8dc5196c35c` | label-info 部分空 |
| Sonny Clark | Lost and Found | 2021 | `1dbbbd76-7f21-44ba-9fcd-c0f820727d27` | label-info 全空 |
| Soulive | 2001-07-20 Perugia, IT | 2001 | `7245896e-2bcf-4832-b77e-4caa38bb0353` | label-info 全空 |
| Soulive | 13 June 2004 :: Bonnaroo Music Festival | 2004 | `24f1cd82-7bee-47e0-b5a4-0fc5e894dbe0` | label-info 全空 |
| Soulive | Live at Lollapalooza 2007: Soulive | 2007 | `d93cd228-a1e2-4759-a68f-fd6b5cb90329` | label-info 全空 |
| Soulive | Live at Funk Fest 2010 | 2010 | `65d5711f-65f5-4601-8b9b-e94c0c112d4c` | label-info 全空 |
| Soulive | Flowers | 2026 | `8b4b957b-094b-46a0-9050-ece8c2952b06` | label-info 全空 |
| Stacey Kent | Let Yourself Go: Celebrating Fred Astaire | 1999 | `a3120ea4-f0cd-31b4-a819-93d83eb26656` | label-info 部分空 |
| Stacey Kent | Brazilian Sketches | 2001 | `ccfe67b6-e352-3c14-9f86-72960dc9610b` | label-info 部分空 |
| Stacey Kent | The Boy Next Door | 2003 | `f2dcb85c-4663-3fb7-b839-feaf7287951e` | label-info 部分空 |
| Stacey Kent | Songs From Other Places | 2021 | `c5dc8a1a-02b6-4b25-98cd-72efa9713727` | label-info 部分空 |
| Stan Getz | Just Friends | 1989 | `67e4c028-60ed-3a46-97ab-244ac193d3d8` | label-info 全空 |
| Stan Getz | Serenity | 1991 | `f16eefd5-3f46-3359-b027-7493e95036c6` | label-info 部分空 |
| Stan Getz | The Carnegie Hall Concert | 1993 | `1ec8909c-9056-30ba-a14b-642d083c464e` | label-info 部分空 |
| Stan Getz | Stan Getz | 1994 | `f20d791f-37ea-4f32-8665-ff87d369dd51` | label-info 部分空 |
| Stan Getz | Tonight In Paris | 1995 | `6d54a322-671b-4a3e-9040-8509eeed2a2d` | label-info 全空 |
| Stan Getz | Live in Europe | 1995 | `9cc5e7e7-0e51-3c58-aedc-c19035c47fd3` | label-info 全空 |
| Stan Getz | Live | 1999 | `22b6c395-e6ac-3454-b412-1f72d18ef7ba` | label-info 部分空 |
| Stan Getz | The Steamer | 1999 | `4c1346be-754e-373e-a3fc-8b1e7701239f` | label-info 部分空 |
| Stan Getz | Pennies From Heaven | 1999 | `9eac72cc-5db8-349e-8ce6-3b4f829cfec1` | label-info 部分空 |
| Stan Getz | Stan Getz and the Cool Sounds | 2002 | `73065291-38cf-3081-b1c9-6419b6522e20` | label-info 部分空 |
| Stan Getz | The Essential Stan Getz: The Columbia Years | 2013 | `24841a1e-3c14-4c52-a405-3c049d7b672a` | label-info 全空 |
| Stan Getz | Getz/Gilberto '76 | 2016 | `7240b056-31c9-428a-86d3-98dad55ccf73` | label-info 部分空 |
| Stan Getz | City Nights | 2025 | `9255caef-7cf7-4df4-a7e9-b29fd0e98888` | label-info 全空 |
| Stan Kenton | With The Danish Radio Big Band | 2002 | `9075a531-29b5-464b-a3d7-8cd648a8fa49` | label-info 部分空 |
| Stan Kenton | Clearwater '72 | 2002 | `e419d2c1-1aad-4398-8e5b-b7d862f7401a` | label-info 全空 |
| Stan Tracey | Tracey / Wellins Play Monk | 2007 | `d60c636d-6456-4d70-892f-dd3fd930c395` | label-info 全空 |
| Stanley Clarke | The Stanley Clarke Band featuring Hiromi with Ruslan & Ronald Bruner, Jr. | 2010 | `095f9aa7-ae05-4337-b995-2181d06f8255` | label-info 全空 |
| Stanley Jordan | Precious Gems | 2020 | `56202d32-742f-4aaa-a2fa-84107db71c7d` | label-info 全空 |
| Stefano Di Battista | Round About Roma | 2002 | `0762a45c-b1b7-3f51-9cb4-753b0746a011` | label-info 部分空 |
| Stefano Di Battista | La dolce vita | 2024 | `be770356-ddf7-4e31-aaf7-d552e8df50c4` | label-info 部分空 |
| Stefon Harris | Ninety Miles: Live at Cubadisco | 2012 | `514dcac4-7204-4b28-a6f6-36dca4ebe414` | label-info 部分空 |
| Steve Gadd | 2013-08-13: Charley's Saloon, Paia, HI | 2013 | `e50cf54a-5786-49d5-b5c6-31d074870f27` | label-info 全空 |
| Steve Smith | Vital Tech Tones | 1998 | `219674fd-2616-3ae6-b4b6-b4679f3dba61` | label-info 部分空 |
| Steve Smith | Cause & Effect | 1998 | `7bf18bab-9eb7-345c-83d2-192e86a462da` | label-info 全空 |
| Steve Smith | New Perspective | 2025 | `f5025723-be17-48b6-84c1-94315e98f0f7` | label-info 全空 |
| Sunaga t Experience | Re Blue | 2022 | `49b90ef1-4924-45f9-a8dd-e14ec222ff76` | label-info 全空 |
| Takuya Kuroda | Bitter and High | 2010 | `50b9a0ea-253e-4760-b6d5-68a53b913830` | label-info 全空 |
| Takuya Kuroda | Edge | 2011 | `f4a68bb7-d4b7-43f9-b985-02b83d3d0570` | label-info 全空 |
| Takuya Kuroda | Add a Zero | 2025 | `032a94e9-3082-428f-884a-69a3e592c3f6` | label-info 全空 |
| Tania Maria | Live | 1989 | `f143a2f0-8565-3002-9b3b-e725b5472b02` | label-info 全空 |
| Tania Maria | Viva Brazil | 2000 | `4d3908a6-e209-3b16-a85a-dfe80713bd90` | label-info 全空 |
| Tania Maria | Brazil With My Soul | 2005 | `0f146d13-57f2-4dce-a744-f84758be77c3` | label-info 部分空 |
| Thad Jones/Mel Lewis Orchestra | Basel 1969 | 1995 | `87ef9e9f-0d92-3df1-a2e1-c788eec17e3f` | label-info 部分空 |
| The Al Di Meola Project | Kiss My Axe | 1991 | `6c6042ba-6073-373f-8b10-46154f07633d` | label-info 部分空 |
| The Branford Marsalis Quartet | The Secret Between the Shadow and the Soul | 2019 | `53f6d715-ef18-494e-8f08-0182c0e45512` | label-info 部分空 |
| The Clayton–Hamilton Jazz Orchestra | Absolutely! | 1995 | `7572169a-62cc-4ff6-a635-6b1dc5ab6477` | label-info 全空 |
| The Count Basie Orchestra | Basie in London | 1988 | `281997bb-76b2-3592-92f9-2e5fc68efa24` | label-info 部分空 |
| The Count Basie Orchestra | The Giants of Boogie Woogie | 1989 | `3433f40f-9ed9-3ac6-982d-ccc1f016cf82` | label-info 全空 |
| The Count Basie Orchestra | Flip, Flop & Fly | 1989 | `ad65796c-8458-35a0-8bd9-c3fb324d9c77` | label-info 部分空 |
| The Count Basie Orchestra | Tony Bennett with the Count Basie Orchestra | 1989 | `fa89cf9b-8b15-4332-8971-2791dba77879` | label-info 部分空 |
| The Count Basie Orchestra | The Swingin' Machine, Live! | 1996 | `53062d63-f631-34da-9d10-25007ca09b3e` | label-info 全空 |
| The Count Basie Orchestra | Live in Stockholm 1954 | 1996 | `d5df0ccf-9a8b-3e68-9b86-1a1b5a3ed499` | label-info 全空 |
| The Count Basie Orchestra | Basie Big Band | 1999 | `7134745c-e62b-38e2-9c4d-f6021cce7337` | label-info 部分空 |
| The Count Basie Orchestra | Jumpin' At The Woodside | 2006 | `8480104d-2d10-48f1-8fd0-8a353ef2422d` | label-info 全空 |
| The Count Basie Orchestra | Complete Live at the Americana Hotel 1959 (1) | 2011 | `d32e2848-74a9-449a-88a9-c1a0f4e1e7ca` | label-info 全空 |
| The Count Basie Orchestra | Jumpin' at the Woodside | 2017 | `dd534817-d7f3-3726-b5cd-5f26e9c2f65d` | label-info 部分空 |
| The Count Basie Orchestra | All About That Basie | 2018 | `199b9c95-4ef1-4718-bb57-6b0a5cca0b85` | label-info 部分空 |
| The Crusaders | Soul Axess | 2003 | `fd47b34e-2fd3-3fda-8813-1b8c52beff56` | label-info 全空 |
| The Ellis Marsalis Trio | Twelve's It | 1998 | `c66a53ed-2e6d-3c5c-aee3-f366242e6b94` | label-info 全空 |
| The Horace Silver Quintet | Swiss Radio Days Vol. 40 - Zurich 1959 | 2016 | `b8b3b30f-e954-4a36-8634-3b13e489ba0e` | label-info 全空 |
| The Michel Petrucciani Trio | Estate | 1989 | `527b5f13-b010-3929-b61c-294430e72ccc` | label-info 部分空 |
| The Michel Petrucciani Trio | Brecon Jazz Festival | 1992 | `315e6121-e762-4a9e-9c51-175ccfd803fe` | label-info 全空 |
| The Michel Petrucciani Trio | Jazzbaltica | 1996 | `a2ff3ddf-2e2c-4e99-ba21-f8d3209882b3` | label-info 全空 |
| The Roots | Do You Want More?!!!??! | 1994 | `8db4c09a-eeaf-3887-96fa-144ac1723651` | label-info 部分空 |
| The Roots | Wake Up! | 2010 | `563d758b-aa16-4e35-8986-6d402ea3cef8` | label-info 部分空 |
| The Wood Brothers | 2006-08-06: Waterslide, Newport Folk Festival, Newport, RI, USA | 2006 | `9bc748b8-5cab-3bfe-bf38-5867e6319bbd` | label-info 全空 |
| The Wood Brothers | Smoke Ring Halo | 2010 | `a74681b7-fff6-46d8-9270-2dd36f3ba71b` | label-info 部分空 |
| The Wood Brothers | Paradise | 2015 | `46eea992-b1a5-4642-a6db-1374a478d883` | label-info 全空 |
| The Wood Brothers | Live At The Barn | 2017 | `99a01676-e20a-474f-8ae9-dddc26c36428` | label-info 全空 |
| The Wood Brothers | One Drop of Truth | 2018 | `fa35ac5b-54be-4791-b78e-5f3f1856de29` | label-info 部分空 |
| The Wood Brothers | Live at the Fillmore | 2019 | `a0e3ce5b-7714-48f1-93f3-d6ebb59e7759` | label-info 部分空 |
| The Wood Brothers | Kingdom In My Mind | 2020 | `a89d7c15-7a08-4a45-a23f-182897d668a8` | label-info 部分空 |
| The Wood Brothers | Heart Is the Hero | 2023 | `9cfefab2-0bb0-464a-b2e1-4aa9f1170113` | label-info 部分空 |
| Thelonious Monk | The London Collection | 1988 | `b2d27c98-61b5-4a4f-8efb-90f6850ddd12` | label-info 部分空 |
| Thelonious Monk | 1963 in Japan | 2000 | `b8fec99b-1475-33dc-86e5-c39821209acb` | label-info 部分空 |
| Thelonious Monk Quartet | 1965‐03‐08: Sendesaal, Radio Bremen, Bremen, Germany | 2022 | `664277ad-c887-4cd9-8dcf-cdbc33c0bdd9` | label-info 部分空 |
| Thomas Dutronc | Éternels jusqu’à demain | 2015 | `52711420-e727-459e-944f-3890ceefae65` | label-info 部分空 |
| Thomas Dutronc | Il n’est jamais trop tard | 2024 | `583129d2-bdae-4f5d-b168-be87ffcd7d6d` | label-info 部分空 |
| Thomas Morgan | Consort in Motion | 2011 | `99c90393-0832-4b15-bbe6-6bce5fdc7c0d` | label-info 部分空 |
| Thomas Morgan | A Place Where We Once Lived | 2021 | `62edf2ec-6437-4cb3-aba6-b14b0b9a16d6` | label-info 全空 |
| Thomas Morgan | Zephyr | 2026 | `4e6fef0d-26d9-4a51-af0d-02004d2f7246` | label-info 全空 |
| Tina Brooks | Music From the Connection Composed By: Freddie Redd | 1996 | `22ddc62e-967a-4122-abfe-fec66b189c55` | label-info 全空 |
| Tommy Smith | Step By Step | 1989 | `d9aafa98-b294-4940-bab0-0044c2d6dc4a` | label-info 全空 |
| Tommy Smith | Paris | 1992 | `0fdc9ff7-28f1-4a70-8927-5fc558c02380` | label-info 全空 |
| Tommy Smith | Embodying the Light | 2017 | `88700d08-f67d-4a54-80fd-645991cd662e` | label-info 全空 |
| Tony Allen | Home Cooking | 2002 | `46cc65fb-a476-37ae-b248-d0e2f46280ce` | label-info 部分空 |
| Tony Allen | What Goes Up | 2017 | `a0663de3-01a1-43e7-bcc3-b5bde2df228e` | label-info 部分空 |
| Tony Allen | What Goes Up (Remixed) | 2019 | `4cb70cf8-3413-4f07-bee6-4323c7e244aa` | label-info 全空 |
| Tony Allen | Awa Band Live At Cargo, East London | 2022 | `c07bb994-e0b9-4904-8fc3-3c80aae85455` | label-info 全空 |
| Tony Williams | Wilderness | 1996 | `a497e36c-ea59-37a7-97bc-21581483fc8f` | label-info 部分空 |
| Trijntje Oosterhuis | Wrecks We Adore | 2012 | `78da7166-36ef-431d-877c-175ffec64380` | label-info 部分空 |
| Trijntje Oosterhuis | Mensen veel geluk - Liedjes van haar vader Huub Oosterhuis | 2018 | `1e7decef-4198-488f-9fdf-c343669442c8` | label-info 部分空 |
| Trio Töykeät | Sisu | 1997 | `28944a65-b680-390a-8b0c-b5388be469d2` | label-info 全空 |
| Trombone Shorty | Second Line Sunday | 2025 | `ccc19860-ccba-424a-97d2-cea557618e21` | label-info 全空 |
| UMO Jazz Orchestra | UMO Plays the Music of Muhal Richard Adams | 1989 | `a17affd5-75b5-4186-a612-fa45e9be364d` | label-info 部分空 |
| UMO Jazz Orchestra | UMO Jazz Orchestra | 1997 | `2d2c0c2c-f696-435e-a4ac-133804c4d67c` | label-info 部分空 |
| UMO Jazz Orchestra | UMO Jazz Orchestra Celebrates Ellington / Ellington Tribute | 1999 | `a161cc22-ad2e-43e2-b687-4cc6330a0db9` | label-info 部分空 |
| UMO Jazz Orchestra | One More Time | 2000 | `2f9e8625-c114-453f-964e-3bdcfa8c191e` | label-info 部分空 |
| UMO Jazz Orchestra | Terra Exotica | 2021 | `88cc14f6-8c88-4b5f-8bd5-5c7ffc7c54a3` | label-info 部分空 |
| Urbie Green | The Complete Persuasive Trombone | 2007 | `f874e935-917e-4054-91a5-7551ffdb507b` | label-info 部分空 |
| Uri Caine | Songs We Like a Lot | 2015 | `13ca7adc-5274-445e-b72a-8bd8e6e35155` | label-info 部分空 |
| Uri Caine | Introducing Uri Caine - Shortlist 1992-2015 | 2015 | `f32e9083-0576-47be-bd06-de64412f2d80` | label-info 部分空 |
| Us3 | Say What!? | 2007 | `1122ccb8-433d-399e-a69a-c158c0d9417d` | label-info 部分空 |
| Van Hunt | What Were You Hoping For? | 2011 | `eeaa5f90-072f-4a24-9bdd-f213e1631562` | label-info 部分空 |
| Van Hunt | Swarf | 2015 | `a62d0ba5-2a7b-48ad-b437-541062bd1cc3` | label-info 全空 |
| Van Morrison | Live at the Roxy | 1989 | `d80c3442-e7bb-3142-bc3a-fa0999bcb03f` | label-info 全空 |
| Van Morrison | Together | 1992 | `bc90d5b9-c0c2-4065-b36e-3c8f37217057` | label-info 全空 |
| Van Morrison | 1997-02-2/3: Belfast Child: Waterfront Hall, Belfast, Northern Ireland, UK | 1998 | `18266b89-88a0-316b-bf69-61341b9b3c38` | label-info 全空 |
| Van Morrison | 1998-05-19: Burning Ground: San Jose Arena, San Jose, CA, USA | 1998 | `3b2ae63a-9159-30d4-80b1-d0546efc2dd9` | label-info 全空 |
| Van Morrison | 1998-02-18/20: Brighton Dome Memoirs: The Dome, Brighton, Sussex, UK | 1998 | `817823b1-6e3a-30a9-8e20-f3bbe0555bf0` | label-info 全空 |
| Van Morrison | How Long Is a Piece of String? | 1999 | `a35db324-bd40-3346-95d8-b85a74c0b26b` | label-info 部分空 |
| Van Morrison | Duets | 2001 | `d2d69ba5-d133-3a04-8f40-11a555a3f831` | label-info 全空 |
| Van Morrison | Down the Road | 2002 | `e3418ce7-0a9c-3b2c-ae91-42e24aedb9d2` | label-info 部分空 |
| Van Morrison | The Early Years | 2002 | `305eccf9-9826-47a0-9637-308daca8c68b` | label-info 全空 |
| Van Morrison | The Unreleased Live Album 2003 | 2003 | `5c7ab82f-4f2d-4647-a888-a5394657bdb0` | label-info 全空 |
| Van Morrison | Irish Troubadour | 2004 | `fea2a91b-7e51-4230-8ea0-47613f5b5a10` | label-info 全空 |
| Van Morrison | Pay the Devil | 2006 | `48fdff5d-2c77-3a38-864c-9c5c4946309d` | label-info 部分空 |
| Van Morrison | Live at Austin City Limits Festival | 2006 | `5ab6fa6a-ae24-316d-aae9-f96c076689d2` | label-info 全空 |
| Van Morrison | Live - 2006-03-07 - Live at the Ryman Auditorium, Nashville, TN | 2006 | `a8c69da7-dd43-4ad8-a0d1-949929b47f4a` | label-info 全空 |
| Van Morrison | Together | 2007 | `70bcea93-6219-4771-9875-3f56aade5fa2` | label-info 全空 |
| Van Morrison | This Is Van Morrison | 2009 | `b3f98d17-bef2-3563-8bc2-3a1d22a8fa2f` | label-info 部分空 |
| Van Morrison | Born to Sing: No Plan B | 2012 | `de243950-fafd-420f-bcf9-668241d61b45` | label-info 部分空 |
| Van Morrison | 2016-09-18: Culodden Estate and Spa, Hollywood, Northern Ireland, UK | 2016 | `f05ba380-18e6-4a25-b7eb-ee2adcca79a2` | label-info 全空 |
| Van Morrison | Live in Boston 1968 | 2018 | `45d6d70b-b0b8-4b52-8f01-d7fe5c0e7b20` | label-info 部分空 |
| Van Morrison | 1971-08-08: The Lion's Share, San Anselmo, CA | 2018 | `fd185cd3-d0fa-4592-bab0-598172e3c4b6` | label-info 全空 |
| Van Morrison | 1973-11-02: Talk about Pop, RTE Television Studios, Dublin, Ireland | 2020 | `c89dbc0c-f447-427d-878d-c20bf0002dc1` | label-info 全空 |
| Van Morrison | Moving on Skiffle | 2023 | `a9f0e037-efb0-46af-9eff-c24b24585513` | label-info 部分空 |
| Van Morrison | 1974‐03‐14: Harvard Square Theatre, Cambridge, MA | 2023 | `f791719f-5839-47a7-833e-9ae7ae3f0c52` | label-info 全空 |
| Van Morrison | 1990‐02‐19: One Irish Rover, Barbican Centre, London | 2025 | `6a4a94dd-71df-4ac7-8157-a7b338aa8000` | label-info 全空 |
| Viktoria Tolstoy | Pictures of Me | 2006 | `cf0aac2d-9794-3bde-bbb6-2589c1e7eb30` | label-info 部分空 |
| Viktoria Tolstoy | Who We Are | 2026 | `add5f61d-1206-4366-af8d-a76b6c490f2c` | label-info 部分空 |
| Vital Information | Time Flies | 2023 | `4117f9df-9e13-4a06-a67d-1a7d2a3c6ece` | label-info 全空 |
| Vital Information | A Prayer For The Generations | 2023 | `6bcc3e62-66f5-496a-ba06-47849331b2c7` | label-info 全空 |
| Walter Smith III | Still Casual | 2014 | `a17b6bda-383b-403d-aa81-ac1b437feae4` | label-info 全空 |
| Wayne Shorter | High Life | 1995 | `ed6351d9-5a2f-383a-9136-5488d82b656e` | label-info 部分空 |
| Wayne Shorter Quartet | Beyond the Sound Barrier | 2005 | `88775dfe-4218-31aa-beca-93fe23fedfa8` | label-info 部分空 |
| Will Lee | Peace of Mind | 2022 | `f9de7564-d257-4768-a10c-3a8171874787` | label-info 部分空 |
| Willie Nelson | The Promiseland | 1986 | `fc49f76a-f54d-3b04-b7db-f4c5f769f636` | label-info 部分空 |
| Willie Nelson | Partners | 1987 | `cf9e1f40-c912-3672-b5f2-b994e5a416dc` | label-info 部分空 |
| Willie Nelson | What a Wonderful World | 1988 | `156d40bf-c98a-3144-8925-ecfb7d4cf9df` | label-info 部分空 |
| Willie Nelson | Six Hours at Pedernales | 1995 | `2db5577b-e07e-3a18-8bd8-f91c9fd1a1a0` | label-info 全空 |
| Willie Nelson | 1996-10-04: Valley Forge Music Fair, Devon, PA | 1996 | `8139d8a7-bc7f-423a-99ee-dd6fdb6ac6e8` | label-info 全空 |
| Willie Nelson | 1997-12-03: Live at La Zona Rosa, Austin, TX, USA | 1997 | `a3031116-23a2-4e80-9dde-44c5ea3eeb01` | label-info 全空 |
| Willie Nelson | Willie Nelson Live | 1998 | `b44a6382-4aab-4803-a2e5-7b9a66cea724` | label-info 全空 |
| Willie Nelson | The Eyes of Texas | 2002 | `4767abfa-a770-4266-bca6-d075e48cefbd` | label-info 全空 |
| Willie Nelson | Stars & Guitars | 2002 | `ce27185d-3ab8-39c3-bbd8-b24a214f6a75` | label-info 部分空 |
| Willie Nelson | Outlaws and Angels | 2004 | `c46c1901-420a-331c-b2fa-4bd0501edf4b` | label-info 部分空 |
| Willie Nelson | It’s Magic | 2007 | `37045e73-d1fc-4d21-9fb5-2ab4e9815d84` | label-info 全空 |
| Willie Nelson | 1996-02-18: Live Set, KUT, Studio One, Austin, TX | 2020 | `4c323fcc-9153-40ac-94ea-26d91412b56f` | label-info 全空 |
| Willie Nelson | Willie Nelson Live on Air Vol. 2 | 2022 | `2d3d76a4-5ec8-4b93-af6f-c74b13d85512` | label-info 全空 |
| Willie Nelson | Live in St Augustine 2/24/23 | 2023 | `0ea7d808-74e1-4f9e-b027-a782db563954` | label-info 全空 |
| Willie Nelson | 1979-08-18: Missouri State Fair Sedalia, MO | 2026 | `e889b3ea-3942-4c67-9186-d6f81c3c755c` | label-info 全空 |
| Woody Shaw | Time Is Right | 1994 | `9549d016-80f6-38c8-ad10-315dc9b3f674` | label-info 全空 |
| Woody Shaw | Dr. Chi | 2000 | `813b8a32-2b8a-4aad-8988-4c1e3d8bce0f` | label-info 全空 |
| Woody Shaw | Stepping Stones (Live at The Village Vanguard, NY August 1978) - Bonus Tracks | 2012 | `a932d290-e910-4cb1-a0f5-06301ad53a78` | label-info 全空 |
| Wynton Marsalis | The London Concert | 1994 | `627035a2-fd2b-35f2-a577-141f049a4fa5` | label-info 部分空 |
| Wynton Marsalis | Standard Time, Volume 5: The Midnight Blues | 1998 | `0565b79b-7dd1-31ac-831c-681c9e661881` | label-info 部分空 |
| Wynton Marsalis | Sweet Release & Ghost Story | 1999 | `014488f8-9cc3-3c69-934f-190f6ce32b96` | label-info 全空 |
| Wynton Marsalis | Big Train | 1999 | `c4472c57-9664-34f5-b02a-bd16e3517b44` | label-info 部分空 |
| Wynton Marsalis | Round 'Bout Midnight | 2001 | `928b63ab-2cb7-348a-94d9-d90a8e63e041` | label-info 全空 |
| Wynton Marsalis | Plays the Music of Duke Ellington | 2004 | `79f1e8e2-ccfe-42be-96e2-22b284cb1413` | label-info 全空 |
| Wynton Marsalis | The Abyssinian Mass | 2016 | `39ffcf6f-986c-4200-b11a-f5e8a9bea529` | label-info 部分空 |
| Wynton Marsalis | Essentially Ellington: The JLCO Recordings, 1999-2025 | 2025 | `40119f37-d199-4bf5-9762-2a2695ce2efc` | label-info 全空 |
| Yaron Herman | Variations | 2006 | `016d7d27-58bd-328e-bf4e-ceccba21d631` | label-info 全空 |
| Yussef Dayes | Live From the Greenhouse | 2025 | `79260173-a327-41a1-beef-03b1c4dbfbe9` | label-info 全空 |
| Zakir Hussain | Hundred Strings of Santoor | 1986 | `f8e7d5ee-b4b4-3e9c-8923-3e1be8672ff4` | label-info 全空 |
| Zakir Hussain | Master of the Bamboo Flute Volume II | 1989 | `23e212de-6fca-3b0d-b2bd-e63dd26e78d6` | label-info 全空 |
| Zakir Hussain | Romantic Sound of Sitar | 1990 | `733f4371-53bd-45ce-836b-77fc5e34e6e5` | label-info 全空 |
| Zakir Hussain | Sangeet Sartaj, Volumes 1 & 2 | 1992 | `28586dfe-f241-3c94-8547-c818136a4b26` | label-info 全空 |
| Zakir Hussain | Violin, Tabla | 1992 | `ff570f4e-16cc-4eef-ad26-63ad0caa3bdb` | label-info 全空 |
| Zakir Hussain | Tabla | 1994 | `525ed369-9166-3e2c-9b83-c3590a4d2066` | label-info 部分空 |
| Zakir Hussain | Maestro's Choice - Zakir Hussain | 1995 | `3678ad2d-087b-4757-acaf-11ac4c5d8fd7` | label-info 全空 |
| Zakir Hussain | The Elements: Space | 1995 | `3af42289-9d26-4e7b-957d-f1f2c2eced06` | label-info 部分空 |
| Zakir Hussain | Raga Aberi | 1995 | `878368da-f518-3b25-84a8-dbc0a97ff9ef` | label-info 部分空 |
| Zakir Hussain | Energy | 1996 | `1d2214e3-ee92-31e3-8689-b98ffcd1c869` | label-info 部分空 |
| Zakir Hussain | In Concert: Volume 1: Vancouver B.C: August 10: 1996 | 1996 | `e60249f9-31b8-4cfa-8e72-726685cf0599` | label-info 全空 |
| Zakir Hussain | Night Spinner | 1998 | `a72c9b37-5dfc-30e2-8ce6-cc68aabc6ef0` | label-info 全空 |
| Zakir Hussain | Drums of India: Ecstasy | 1998 | `d0e186a0-0d72-4428-81bc-2a0d69eda71f` | label-info 部分空 |
| Zakir Hussain | A Gift To Ustad Alla Rakha 75th Birthday | 2010 | `c7d0540c-5efd-3124-8ca5-f9d8ba026e6a` | label-info 部分空 |
| Zakir Hussain | Good Hope | 2019 | `4eb7235f-4cda-41c4-9714-c0ab9f03140f` | label-info 部分空 |
| Zakir Hussain | Zara | 2022 | `2b0acf4d-91fc-4aeb-bbc0-e91f75490505` | label-info 全空 |
| Önder Focan | 36 mm Biometric | 2009 | `7e5b77e2-936b-43cc-ae24-edbebd4958a9` | label-info 全空 |
| 大西順子 | Cruisin' | 1993 | `e50b89cb-4c01-3c6c-99d8-69f4adb37814` | label-info 部分空 |
| 山中千尋 | Outside by the Swing | 2005 | `7ae54f7a-f662-3a23-9e75-d7c7aed28e32` | label-info 部分空 |
| 山中千尋 | Lach doch mal | 2006 | `3488c0cf-6e0a-3a91-b817-d0816a9e59ef` | label-info 部分空 |
| 山中千尋 | Bravogue | 2008 | `00181530-9f72-3587-83c1-a95cd0c82ac7` | label-info 部分空 |
| 山中千尋 | After Hours | 2008 | `277f725c-98fa-45a5-89cc-0f80ce9fa850` | label-info 部分空 |
| 山中千尋 | Runnin’ Wild | 2009 | `e912aecf-e959-4abb-9763-c0bc38079c8b` | label-info 部分空 |
| 山中千尋 | Because | 2012 | `7096763c-016a-4d10-904a-edd9a13227b6` | label-info 部分空 |
| 日野皓正 | Trans-Blue | 1985 | `2ccaa318-0016-4bdd-b0c1-9d6658ce1123` | label-info 部分空 |
| 日野皓正 | Live in Warsaw | 1991 | `d691bac5-f4ee-488f-a798-e2e5bd9bf119` | label-info 全空 |
| 桑原あい | Opera | 2021 | `1a80ab25-8f19-40e7-8163-495ba221c74b` | label-info 部分空 |
| 森山威男 | Central Park East | 2010 | `ee52df05-b54e-461c-ad48-bb093eddf006` | label-info 全空 |
| 菊地雅章 | Hanamichi | 2021 | `b609351e-3139-4f3c-9070-3b40bd0780cb` | label-info 全空 |
| 菊地雅章 | Dreamachine | 2021 | `b60f16c6-a92e-4b22-ad00-e740ba37bfe0` | label-info 全空 |

---

## 五、掃描進度明細

- **藝人軸列舉：541／541 位藝人全部掃完**（`release-group?artist=<id>&type=album`，含分頁）。
- 藝人軸共看到 **8,937 張 1985 年後的 Album**（另扣掉 5,616 張 secondary-type 被排除、863 張無日期）。
- 其中 **1,128 張以 `rgMbid` 命中四處既有資料、176 張以（藝人, 盤名）命中**，**其餘 7,184 個相異 release-group 進入 Blue Note 家族判定**。
- **MB 廠牌判定 7,184／7,184 全數跑完**，結果：`other-label-only` 6,159／`all-label-info-empty` 609／`partial-label-info-empty` 416／**`bn-label-present` 0**。
- ⚠ **`bn-label-present` 掛零是本層最重要的整體結論**：**沒有任何一個「MB 上掛著 Blue Note 家族廠牌」的 release-group 被列舉檔漏掉。**換句話說，`enum/blue-note.json` 的 label 軸對「MB 有填 Blue Note 廠牌」的碟是**完整的**，**它唯一的盲區就是 MB 那一端沒把 Blue Note 填上去**（空 `label-info`，或掛成母公司）。
- **Discogs 覆核進度：30／1,025**。
- **Discogs 覆核：147／1,025**（順序：`label-info` 全空且該藝人在 ±8 年內有已知 Blue Note 盤者優先，其次是部分空且鄰近者，最後是其餘）。
- **`not-blue-note` 143 筆是逐筆核過年份與掛名的**（Discogs 搜尋結果須年份差 ≤2 年、且掛名字串含該藝人名，才拿來判廠牌——否則會被 `Love Is Here to Stay` 這種同名碟帶偏）。

