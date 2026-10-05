# Blue Note 1985 後線・列舉層缺口稽核（**藝人軸**重掃）

> **已掃 541／541 位藝人**（藝人＝MB artist MBID，由本線 1,231 個已知 release-group 精確反解，不是字串比對，因此沒有同名實體問題）。
> **Discogs 覆核 1025／1,025 筆**（MB 兩端都查不到 Blue Note 廠牌的候選）。
> 生成：2026-09-19　狀態：**全部跑完**

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
7. ⚠ **非拉丁掛名要用羅馬字重查**：`大西順子`／`山中千尋`／`日野皓正`／`桑原あい`／`森山威男`／`菊地雅章` 這 13 筆，用漢字打 Discogs `artist=` **一律回 0 筆**，而且正規化後變空字串會讓「掛名必須出現在標題裡」的守門一律不成立。本層對這 13 筆用羅馬字重查一次，**多撈出 1 筆真缺口**（`大西順子《Cruisin'》1993`）。**詳見第 2493 條。**

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
| `gap` | 25 |
| `unclear` | 0 |
| `not-blue-note` | 1000 |
| `already-covered` | 0 |
| **逐筆裁定合計** | **1025** |

⚠ **另有 6,159 筆 `other-label-only` 是整批篩掉的，不逐筆裁定**——它們的 MB `label-info` 明確掛著非 Blue Note 廠牌（Polydor、ECM、Verve、Concord……），**不是「查不到」而是「查到別家」**。完整清單在本檔 JSON 版的 `screened.otherLabelOnly`。

### `gap` 的「列舉檔碰不到」成因分類

| 成因 | 筆 |
|---|---:|
| `label-info` 空 | 18 |
| MB 只掛到母公司／他廠，Blue Note 那一筆的 `label-info` 是空的 | 6 |
| MB 掛成母公司 `Capitol Records`＋另一筆 `label-info` 空 | 1 |

---

## 三、`gap` 逐筆

### 1. Tommy Smith《Step By Step》(1989) — **`gap`**

- **RG MBID**：`d9aafa98-b294-4940-bab0-0044c2d6dc4a`
- **artist MBID**：`c511b970-7016-4bd4-b54a-1cd1cb06bb34`（／Scottish jazz saxophonist）
- **為什麼列舉檔碰不到它**：`label-info` 空
- **實查**：MB 這個 release-group 有 1 筆 release，其中 1 筆 `label-info` 為空；非空者掛的是 （無）——**沒有一筆掛 Blue Note 家族實體，所以以 label 為軸的列舉腳本碰不到它**。Discogs 則明確把它記在 Blue Note 名下。
- **佐證**：
  - MB release-group：https://musicbrainz.org/release-group/d9aafa98-b294-4940-bab0-0044c2d6dc4a（`first-release-date` 1989、`primary-type` Album）
  - MB release `e12f2f9b-e86e-4995-a0d1-36f75e993a6e`（1989、GB）——**`label-info` 逐字為空陣列 `[]`**
  - **Discogs release 5575629**：https://www.discogs.com/release/5575629-Tommy-Smith-Step-By-Step——`label` 逐字 `['Blue Note', 'Capitol Records, Inc.', 'Capitol Industries-EMI, Inc.', 'Manhattan Records', 'Capitol Records, Inc.', 'Capitol Records, Inc.', 'Specialty Records Corporation', 'Capitol Mastering', 'Sheffield Lab Matrix', 'Allied Record Company', 'Allied Record Company', 'Smythe Music Productions']`、`catno` 逐字 `B1-91930`、US 1989 Vinyl／LP／Album
  - **Discogs release 4402673**：https://www.discogs.com/release/4402673-Tommy-Smith-Step-By-Step——`label` 逐字 `['Blue Note']`、`catno` 逐字 `B4-91930`、US 1989 Cassette／Album／Promo
  - **Discogs release 13991478**：https://www.discogs.com/release/13991478-Tommy-Smith-Step-By-Step——`label` 逐字 `['Blue Note']`、`catno` 逐字 `TC-BLT 1001`、UK 1989 Cassette／Album
  - 四處比對結果：`enum/blue-note.json`、全部 `c*/slice.json`、全部 `c*-cards.json`、`seed_cards.json` 皆 0 筆（以 `rgMbid` ＋（正規化藝人名, 正規化盤名）兩種鍵逐列比對）
- **判定**：**`gap`**　**真缺口**：Discogs 廠牌鏈＋目錄號確認為 Blue Note 家族發行，四處皆無。

### 2. Tommy Smith《Paris》(1992) — **`gap`**

- **RG MBID**：`0fdc9ff7-28f1-4a70-8927-5fc558c02380`
- **artist MBID**：`c511b970-7016-4bd4-b54a-1cd1cb06bb34`（／Scottish jazz saxophonist）
- **為什麼列舉檔碰不到它**：`label-info` 空
- **實查**：MB 這個 release-group 有 2 筆 release，其中 2 筆 `label-info` 為空；非空者掛的是 （無）——**沒有一筆掛 Blue Note 家族實體，所以以 label 為軸的列舉腳本碰不到它**。Discogs 則明確把它記在 Blue Note 名下。
- **佐證**：
  - MB release-group：https://musicbrainz.org/release-group/0fdc9ff7-28f1-4a70-8927-5fc558c02380（`first-release-date` 1992、`primary-type` Album）
  - MB release `22e0f2b2-4a8d-4ee6-8aa2-dab1f8836721`（1992、GB）——**`label-info` 逐字為空陣列 `[]`**
  - MB release `15a08746-a7be-4178-addd-827a83482ffc`（無日期）——**`label-info` 逐字為空陣列 `[]`**
  - **Discogs release 9840348**：https://www.discogs.com/release/9840348-Tommy-Smith-Paris——`label` 逐字 `['Blue Note International']`、`catno` 逐字 `CD BLT 1005`、UK 1992 CD／Album／Stereo
  - **Discogs release 16953930**：https://www.discogs.com/release/16953930-Tommy-Smith-Paris——`label` 逐字 `['Blue Note International']`、`catno` 逐字 `TC-BLT1005`、UK & Europe 1992 Cassette／Stereo
  - **Discogs release 13110451**：https://www.discogs.com/release/13110451-Tommy-Smith-Paris——`label` 逐字 `['Blue Note International']`、`catno` 逐字 `780612 1`、UK 1992 Vinyl／LP／Album／Stereo
  - 四處比對結果：`enum/blue-note.json`、全部 `c*/slice.json`、全部 `c*-cards.json`、`seed_cards.json` 皆 0 筆（以 `rgMbid` ＋（正規化藝人名, 正規化盤名）兩種鍵逐列比對）
- **判定**：**`gap`**　**真缺口**：Discogs 廠牌鏈＋目錄號確認為 Blue Note 家族發行，四處皆無。

### 3. Don Pullen & The African-Brazilian Connection《Ode to Life》(1993) — **`gap`**

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

### 4. 大西順子《Cruisin'》(1993) — **`gap`**

- **RG MBID**：`e50b89cb-4c01-3c6c-99d8-69f4adb37814`
- **artist MBID**：`fc224843-542a-488e-b9e5-3dc7856d44e6`
- **為什麼列舉檔碰不到它**：MB 只掛到母公司／他廠，Blue Note 那一筆的 `label-info` 是空的
- **實查**：MB 這個 release-group 有 2 筆 release，其中 1 筆 `label-info` 為空；非空者掛的是 somethin’else——**沒有一筆掛 Blue Note 家族實體，所以以 label 為軸的列舉腳本碰不到它**。Discogs 則明確把它記在 Blue Note 名下。
- **佐證**：
  - MB release-group：https://musicbrainz.org/release-group/e50b89cb-4c01-3c6c-99d8-69f4adb37814（`first-release-date` 1993-07-21、`primary-type` Album）
  - MB release `f494fcd9-105b-44ee-b8e6-c2aaad79bd59`（1993-07-21、JP）——somethin’else（catno TOCJ-5555）
  - MB release `1044266a-6c0c-4dec-bf5b-da9a9af2135a`（無日期）——**`label-info` 逐字為空陣列 `[]`**
  - **Discogs release 7578461**：https://www.discogs.com/release/7578461-Junko-Onishi-Trio-Cruisin——`label` 逐字 `['Blue Note', "Somethin' Else", 'Toshiba EMI Ltd', 'Blue Note Records', 'Capitol Records, Inc.', "Somethin' Else Records", "Somethin' Else Records", 'Sanyo, U.S.A.', 'EMI Jax']`、`catno` 逐字 `CDP 7243 8 28447 2 3`、US 1993 CD／Album
  - 四處比對結果：`enum/blue-note.json`、全部 `c*/slice.json`、全部 `c*-cards.json`、`seed_cards.json` 皆 0 筆（以 `rgMbid` ＋（正規化藝人名, 正規化盤名）兩種鍵逐列比對）
- **判定**：**`gap`**　**真缺口**：Discogs 廠牌鏈＋目錄號確認為 Blue Note 家族發行，四處皆無。

### 5. Ron Carter《Jazz, My Romance》(1994) — **`gap`**

- **RG MBID**：`d4da0e99-768e-42bd-83f3-7d37b5149f6c`
- **artist MBID**：`57db3f59-9c58-4f68-a00e-e044666c4828`（／US jazz double-bassist）
- **為什麼列舉檔碰不到它**：`label-info` 空
- **實查**：MB 這個 release-group 有 1 筆 release，其中 1 筆 `label-info` 為空；非空者掛的是 （無）——**沒有一筆掛 Blue Note 家族實體，所以以 label 為軸的列舉腳本碰不到它**。Discogs 則明確把它記在 Blue Note 名下。
- **佐證**：
  - MB release-group：https://musicbrainz.org/release-group/d4da0e99-768e-42bd-83f3-7d37b5149f6c（`first-release-date` 1994、`primary-type` Album）
  - MB release `00d0ff2f-a637-43a0-9729-a5b54b3229cd`（1994、US）——**`label-info` 逐字為空陣列 `[]`**
  - **Discogs release 4638376**：https://www.discogs.com/release/4638376-Ron-Carter-Jazz-My-Romance——`label` 逐字 `['Blue Note', 'Capitol Records, Inc.', 'Vine Street', 'Blue Note Records', 'BMG Direct Marketing, Inc.', 'Retrac Productions Inc.', "Somethin' Else", "Somethin' Else", 'Clinton Recording Studio']`、`catno` 逐字 `D 106382`、US 1994 CD／Album／Club Edition
  - **Discogs release 8815844**：https://www.discogs.com/release/8815844-Ron-Carter-Jazz-My-Romance——`label` 逐字 `['Blue Note', 'Capitol Records, Inc.', 'Vine Street', 'Blue Note Records', 'Retrac Productions Inc.', "Somethin' Else", "Somethin' Else", 'Clinton Recording Studio']`、`catno` 逐字 `CDP 7243 8 30492 2 6`、US 1994 CD／Album
  - 四處比對結果：`enum/blue-note.json`、全部 `c*/slice.json`、全部 `c*-cards.json`、`seed_cards.json` 皆 0 筆（以 `rgMbid` ＋（正規化藝人名, 正規化盤名）兩種鍵逐列比對）
- **判定**：**`gap`**　**真缺口**：Discogs 廠牌鏈＋目錄號確認為 Blue Note 家族發行，四處皆無。

### 6. Kevin Eubanks《Spiritalk 2: Revelations》(1995) — **`gap`**

- **RG MBID**：`d783536c-ce83-378a-9211-ba829dee7003`
- **artist MBID**：`23e37f53-d40d-47c4-b247-d60727c25532`（／American jazz & fusion guitarist, and composer）
- **為什麼列舉檔碰不到它**：`label-info` 空
- **實查**：MB 這個 release-group 有 1 筆 release，其中 1 筆 `label-info` 為空；非空者掛的是 （無）——**沒有一筆掛 Blue Note 家族實體，所以以 label 為軸的列舉腳本碰不到它**。Discogs 則明確把它記在 Blue Note 名下。
- **佐證**：
  - MB release-group：https://musicbrainz.org/release-group/d783536c-ce83-378a-9211-ba829dee7003（`first-release-date` 1995-02-07、`primary-type` Album）
  - MB release `ead3bb30-5992-4603-b649-c8fb253b7c9f`（1995-02-07、US）——**`label-info` 逐字為空陣列 `[]`**
  - **Discogs release 14842193**：https://www.discogs.com/release/14842193-Kevin-Eubanks-Spiritalk-2-Revelations——`label` 逐字 `['Blue Note', 'Columbia House']`、`catno` 逐字 `CDP 530132`、US 1995 CD／Album／Club Edition
  - **Discogs release 11402781**：https://www.discogs.com/release/11402781-Kevin-Eubanks-Spiritalk-2-Revelations——`label` 逐字 `['Blue Note', 'Capitol Records, Inc.', 'Capitol Records, Inc.', 'Nivek Publishing', 'Sound On Sound, New York', 'Sterling Sound', 'EMI Jax']`、`catno` 逐字 `CDP 7243 8 30132 2 7`、US 1995 CD／Album
  - **Discogs release 4716426**：https://www.discogs.com/release/4716426-Kevin-Eubanks-Spiritalk-2-Revelations——`label` 逐字 `['Blue Note']`、`catno` 逐字 `CDP 7243 8 30132 2 7`、Europe 1995 CD／Album
  - 四處比對結果：`enum/blue-note.json`、全部 `c*/slice.json`、全部 `c*-cards.json`、`seed_cards.json` 皆 0 筆（以 `rgMbid` ＋（正規化藝人名, 正規化盤名）兩種鍵逐列比對）
- **判定**：**`gap`**　**真缺口**：Discogs 廠牌鏈＋目錄號確認為 Blue Note 家族發行，四處皆無。

### 7. Jackie McLean《Hat Trick》(1996) — **`gap`**

- **RG MBID**：`823b61c2-8402-4f27-a611-d95806fd703c`
- **artist MBID**：`5b6993ef-14af-4374-aa91-d42622b133d1`（／jazz saxophonist）
- **為什麼列舉檔碰不到它**：`label-info` 空
- **實查**：MB 這個 release-group 有 1 筆 release，其中 1 筆 `label-info` 為空；非空者掛的是 （無）——**沒有一筆掛 Blue Note 家族實體，所以以 label 為軸的列舉腳本碰不到它**。Discogs 則明確把它記在 Blue Note 名下。
- **佐證**：
  - MB release-group：https://musicbrainz.org/release-group/823b61c2-8402-4f27-a611-d95806fd703c（`first-release-date` 1996、`primary-type` Album）
  - MB release `7f6f2a8a-ba02-4397-a484-ad8ddd2a10e7`（1996、JP）——**`label-info` 逐字為空陣列 `[]`**
  - **Discogs release 12750647**：https://www.discogs.com/release/12750647-Jackie-McLean-meets-Junko-Onishi-Hat-Trick——`label` 逐字 `['Blue Note', 'Power Station', 'Power Station', "Somethin' Else Records", "Somethin' Else Records", 'Toshiba EMI Ltd', 'Capitol Records, Inc.', 'Blue Note Records', 'BMG Direct Marketing, Inc.']`、`catno` 逐字 `CDP 7243 8 38363 2 1`、US 1996 CD／Album／Club Edition
  - **Discogs release 33077577**：https://www.discogs.com/release/33077577-Jackie-McLean-meets-Junko-Onishi-Hat-Trick——`label` 逐字 `['Blue Note', 'Toshiba EMI Ltd', 'Blue Note Records', 'Capitol Records, Inc.', "Somethin' Else Records", "Somethin' Else Records", 'Power Station', 'Power Station', 'EMI MFG.']`、`catno` 逐字 `CDP 7243 8 38363 2 1`、US 1996 CD／Album／Promo
  - **Discogs release 10811254**：https://www.discogs.com/release/10811254-Jackie-McLean-meets-Junko-Onishi-Hat-Trick——`label` 逐字 `['Blue Note', 'Power Station', 'Power Station', "Somethin' Else Records", "Somethin' Else Records", 'Toshiba EMI Ltd', 'Capitol Records, Inc.', 'Blue Note Records']`、`catno` 逐字 `CDP 7243 8 38363 2 1`、US 1996 CD／Album
  - 四處比對結果：`enum/blue-note.json`、全部 `c*/slice.json`、全部 `c*-cards.json`、`seed_cards.json` 皆 0 筆（以 `rgMbid` ＋（正規化藝人名, 正規化盤名）兩種鍵逐列比對）
- **判定**：**`gap`**　**真缺口**：Discogs 廠牌鏈＋目錄號確認為 Blue Note 家族發行，四處皆無。

### 8. Dexter Gordon《Tenor Titans》(1997) — **`gap`**

- **RG MBID**：`03d9e3b3-32d3-426b-a173-44b7a94341f3`
- **artist MBID**：`cc1588e1-5ba3-45a6-b80c-b31035c89339`
- **為什麼列舉檔碰不到它**：MB 只掛到母公司／他廠，Blue Note 那一筆的 `label-info` 是空的
- **實查**：MB 這個 release-group 有 3 筆 release，其中 1 筆 `label-info` 為空；非空者掛的是 SOLID RECORDS／Storyville Records——**沒有一筆掛 Blue Note 家族實體，所以以 label 為軸的列舉腳本碰不到它**。Discogs 則明確把它記在 Blue Note 名下。
- **佐證**：
  - MB release-group：https://musicbrainz.org/release-group/03d9e3b3-32d3-426b-a173-44b7a94341f3（`first-release-date` 1997、`primary-type` Album）
  - MB release `cf4672bc-0201-45e2-8fdd-2c3817af3b9b`（1997、DK）——Storyville Records（catno STCD 8288）
  - MB release `f710e1f0-ce61-4db2-a019-818e913f84bf`（2016-03-26、JP）——SOLID RECORDS（catno CDSOL-6975）
  - MB release `986f22ec-648f-41b5-b596-ec700da34545`（2022-10-26、XW）——**`label-info` 逐字為空陣列 `[]`**
  - **Discogs release 1742763**：https://www.discogs.com/release/1742763-Dexter-Gordon-Sonny-Rollins-John-Coltrane-The-Three-Tenors-Titans-Of-The-Tenor-Sax-Blue-Notables-Vol——`label` 逐字 `['Blue Note', 'Blue Note', 'Blue Notables', 'EMI', 'EMI', 'EMI Records Ltd.', 'EMI Records Ltd.', 'EMI Swindon']`、`catno` 逐字 `7243 8 53223 2 7`、UK & Europe 1996 CD／Compilation／Sampler／Stereo／Mono
  - 四處比對結果：`enum/blue-note.json`、全部 `c*/slice.json`、全部 `c*-cards.json`、`seed_cards.json` 皆 0 筆（以 `rgMbid` ＋（正規化藝人名, 正規化盤名）兩種鍵逐列比對）
- **判定**：**`gap`**　**真缺口**：Discogs 廠牌鏈＋目錄號確認為 Blue Note 家族發行，四處皆無。

### 9. Dianne Reeves《That Day…》(1997) — **`gap`**

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

### 10. Jackie McLean《Fire and Love》(1997) — **`gap`**

- **RG MBID**：`eca6903a-3e10-43ad-a40d-f480aa474255`
- **artist MBID**：`5b6993ef-14af-4374-aa91-d42622b133d1`（／jazz saxophonist）
- **為什麼列舉檔碰不到它**：`label-info` 空
- **實查**：MB 這個 release-group 有 1 筆 release，其中 1 筆 `label-info` 為空；非空者掛的是 （無）——**沒有一筆掛 Blue Note 家族實體，所以以 label 為軸的列舉腳本碰不到它**。Discogs 則明確把它記在 Blue Note 名下。
- **佐證**：
  - MB release-group：https://musicbrainz.org/release-group/eca6903a-3e10-43ad-a40d-f480aa474255（`first-release-date` 1997、`primary-type` Album）
  - MB release `9043f594-97e2-4272-a5ff-d47bb9df48bd`（1997、JP）——**`label-info` 逐字為空陣列 `[]`**
  - **Discogs release 14071935**：https://www.discogs.com/release/14071935-Jackie-McLean-The-MacBand-Fire-Love——`label` 逐字 `['Blue Note', 'BMG Direct']`、`catno` 逐字 `CDP 7243 4 93254 2 5`、US 1997 CD／Album／Club Edition
  - **Discogs release 5343073**：https://www.discogs.com/release/5343073-Jackie-McLean-The-MacBand-Fire-Love——`label` 逐字 `['Blue Note', "Somethin' Else", "Somethin' Else", 'EMI', 'EMI', 'Capitol Records']`、`catno` 逐字 `7 24349 32542 5`、Europe 1998 CD／Album
  - **Discogs release 11316980**：https://www.discogs.com/release/11316980-Jackie-McLean-The-MacBand-Fire-Love——`label` 逐字 `['Blue Note', "Somethin' Else Records", "Somethin' Else Records", 'Capitol Records, Inc.']`、`catno` 逐字 `CDP 7243 4 93254 2 5`、US 1997 CD／Album
  - 四處比對結果：`enum/blue-note.json`、全部 `c*/slice.json`、全部 `c*-cards.json`、`seed_cards.json` 皆 0 筆（以 `rgMbid` ＋（正規化藝人名, 正規化盤名）兩種鍵逐列比對）
- **判定**：**`gap`**　**真缺口**：Discogs 廠牌鏈＋目錄號確認為 Blue Note 家族發行，四處皆無。

### 11. Ron Carter《Brandenburg Concerto》(1997) — **`gap`**

- **RG MBID**：`3f03b660-8de5-33f8-a552-84365722a4d0`
- **artist MBID**：`57db3f59-9c58-4f68-a00e-e044666c4828`（／US jazz double-bassist）
- **為什麼列舉檔碰不到它**：`label-info` 空
- **實查**：MB 這個 release-group 有 1 筆 release，其中 1 筆 `label-info` 為空；非空者掛的是 （無）——**沒有一筆掛 Blue Note 家族實體，所以以 label 為軸的列舉腳本碰不到它**。Discogs 則明確把它記在 Blue Note 名下。
- **佐證**：
  - MB release-group：https://musicbrainz.org/release-group/3f03b660-8de5-33f8-a552-84365722a4d0（`first-release-date` 1997、`primary-type` Album）
  - MB release `e8a7893f-86f1-475e-ae6d-7f2a7977e50d`（無日期）——**`label-info` 逐字為空陣列 `[]`**
  - **Discogs release 11424011**：https://www.discogs.com/release/11424011-Ron-Carter-Brandenburg-Concerto——`label` 逐字 `['Blue Note', 'EMI Music Canada', 'BMG Direct Ltd.', 'EMI MFG.']`、`catno` 逐字 `CDP 7243 8 54559 2 6`、Canada 1996 CD／Album／Club Edition
  - **Discogs release 11783863**：https://www.discogs.com/release/11783863-Ron-Carter-Brandenburg-Concerto——`label` 逐字 `['EAU Records', 'EAU Records', 'EAU Records', 'Blue Note', 'Toshiba EMI Ltd', 'Clinton Recording Studio']`、`catno` 逐字 `TOCJ-6037`、Japan 1996 CD／Album／Promo
  - **Discogs release 17381494**：https://www.discogs.com/release/17381494-Ron-Carter-Brandenburg-Concerto——`label` 逐字 `['Blue Note', 'EAU Records', 'EAU Records', 'Blue Note', 'Capitol Records, Inc.', 'Retrac Productions Inc.', 'Clinton Recording Studio', 'EMI MFG.']`、`catno` 逐字 `CDP 7243 8 54559 26`、US 1996 CD／Album／Promo
  - 四處比對結果：`enum/blue-note.json`、全部 `c*/slice.json`、全部 `c*-cards.json`、`seed_cards.json` 皆 0 筆（以 `rgMbid` ＋（正規化藝人名, 正規化盤名）兩種鍵逐列比對）
- **判定**：**`gap`**　**真缺口**：Discogs 廠牌鏈＋目錄號確認為 Blue Note 家族發行，四處皆無。

### 12. Brian Blade Fellowship《Brian Blade Fellowship》(1998) — **`gap`**

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

### 13. Elvin Jones《At This Point in Time》(1998) — **`gap`**

- **RG MBID**：`0351ea63-7b0f-31af-b871-8716589821ac`
- **artist MBID**：`d5ac66e4-ea5d-4ebb-9e0d-bed4063208e7`（／jazz drummer）
- **為什麼列舉檔碰不到它**：`label-info` 空
- **實查**：MB 這個 release-group 有 1 筆 release，其中 1 筆 `label-info` 為空；非空者掛的是 （無）——**沒有一筆掛 Blue Note 家族實體，所以以 label 為軸的列舉腳本碰不到它**。Discogs 則明確把它記在 Blue Note 名下。
- **佐證**：
  - MB release-group：https://musicbrainz.org/release-group/0351ea63-7b0f-31af-b871-8716589821ac（`first-release-date` 1998-03-31、`primary-type` Album）
  - MB release `0e5ab3d6-3083-4d4f-9586-a7bc84c5a70d`（1998-03-31、US）——**`label-info` 逐字為空陣列 `[]`**
  - **Discogs release 13883750**：https://www.discogs.com/release/13883750-Elvin-Jones-At-This-Point-In-Time——`label` 逐字 `['Blue Note', 'Capitol Records, Inc.', 'Capitol Records, Inc.', 'Capitol Records, Inc.', 'Capitol Records, Inc.', 'A&R Studios', 'EMI MFG.']`、`catno` 逐字 `CDP 7243 4 93385 2 4`、US 1998 CD／Compilation
  - **Discogs release 4963884**：https://www.discogs.com/release/4963884-Elvin-Jones-At-This-Point-In-Time——`label` 逐字 `['Blue Note', 'Capitol Records, Inc.', 'EMI', 'EMI', 'Capitol Records, Inc.', 'Capitol Records, Inc.', 'A&R Studios']`、`catno` 逐字 `7243 4 93385 2 4`、Europe 1998 CD／Compilation／Stereo
  - 四處比對結果：`enum/blue-note.json`、全部 `c*/slice.json`、全部 `c*-cards.json`、`seed_cards.json` 皆 0 筆（以 `rgMbid` ＋（正規化藝人名, 正規化盤名）兩種鍵逐列比對）
- **判定**：**`gap`**　**真缺口**：Discogs 廠牌鏈＋目錄號確認為 Blue Note 家族發行，四處皆無。

### 14. Gonzalo Rubalcaba《The Trio》(1998) — **`gap`**

- **RG MBID**：`8ebd5349-dd56-3257-9378-dff56259e57c`
- **artist MBID**：`70053535-a3ae-4aad-a6cd-68c55085b843`（／Afro-Cuban jazz pianist and composer）
- **為什麼列舉檔碰不到它**：MB 只掛到母公司／他廠，Blue Note 那一筆的 `label-info` 是空的
- **實查**：MB 這個 release-group 有 2 筆 release，其中 1 筆 `label-info` 為空；非空者掛的是 somethin’else——**沒有一筆掛 Blue Note 家族實體，所以以 label 為軸的列舉腳本碰不到它**。Discogs 則明確把它記在 Blue Note 名下。
- **佐證**：
  - MB release-group：https://musicbrainz.org/release-group/8ebd5349-dd56-3257-9378-dff56259e57c（`first-release-date` 1998、`primary-type` Album）
  - MB release `f84e05c7-963a-4175-8b4a-934cf2acd177`（無日期）——**`label-info` 逐字為空陣列 `[]`**
  - MB release `d67f178e-33fd-4d6e-b1a9-1957f55d94ea`（1998、JP）——somethin’else（catno 4944422）
  - **Discogs release 8259286**：https://www.discogs.com/release/8259286-Gonzalo-Rubalcaba-Dennis-Chambers-Brian-Bromberg-The-Trio——`label` 逐字 `['Blue Note', "Somethin' Else", "Somethin' Else", "Somethin' Else", 'EMI', 'EMI']`、`catno` 逐字 `4944422`、Europe 1998 CD／Album
  - 四處比對結果：`enum/blue-note.json`、全部 `c*/slice.json`、全部 `c*-cards.json`、`seed_cards.json` 皆 0 筆（以 `rgMbid` ＋（正規化藝人名, 正規化盤名）兩種鍵逐列比對）
- **判定**：**`gap`**　**真缺口**：Discogs 廠牌鏈＋目錄號確認為 Blue Note 家族發行，四處皆無。

### 15. Michel Petrucciani《Trio in Tokyo》(1999) — **`gap`**

- **RG MBID**：`8b89c2f8-8d7a-3147-af17-1fd33f7d5d2d`
- **artist MBID**：`2b75141c-05e9-42eb-ae63-6695d86cdc19`（／FR | jazz）
- **為什麼列舉檔碰不到它**：MB 只掛到母公司／他廠，Blue Note 那一筆的 `label-info` 是空的
- **實查**：MB 這個 release-group 有 5 筆 release，其中 1 筆 `label-info` 為空；非空者掛的是 Disques Dreyfus／Dreyfus Jazz——**沒有一筆掛 Blue Note 家族實體，所以以 label 為軸的列舉腳本碰不到它**。Discogs 則明確把它記在 Blue Note 名下。
- **佐證**：
  - MB release-group：https://musicbrainz.org/release-group/8b89c2f8-8d7a-3147-af17-1fd33f7d5d2d（`first-release-date` 1999-10-15、`primary-type` Album）
  - MB release `b4109b5f-1548-456b-9410-57329eeb5232`（1999、FR）——Dreyfus Jazz（catno FDM 36605-2）
  - MB release `4752d0fc-9749-40f7-885a-1401a8c050e9`（2009-01-19、DE）——Dreyfus Jazz
  - MB release `51e5f847-bf74-465b-9612-921309efa6c6`（1999-11-16、US）——**`label-info` 逐字為空陣列 `[]`**
  - MB release `ed7b1841-a59c-3a86-8239-ff057cc32dea`（1999-10-15、JP）——Disques Dreyfus（catno VACR-2039）
  - **Discogs release 776573**：https://www.discogs.com/release/776573-Michel-Petrucciani-Steve-Gadd-Anthony-Jackson-Trio-In-Tokyo——`label` 逐字 `['Dreyfus Jazz', 'Disques Dreyfus', 'Disques Dreyfus', 'The Blue Note Tokyo', 'Studios Ferber', 'Metropolis Mastering', 'MPO', 'Sony Music France', 'Jazzhorn Music', 'Mike P. Music Publishing']`、`catno` 逐字 `FDM 36605-2`、France 1999 CD／Album
  - **Discogs release 8390770**：https://www.discogs.com/release/8390770-Michel-Petrucciani-Steve-Gadd-Anthony-Jackson-Trio-In-Tokyo——`label` 逐字 `['Dreyfus Jazz', 'Disques Dreyfus', 'Disques Dreyfus', 'The Blue Note Tokyo', 'Studios Ferber', 'Metropolis Mastering', 'Koch International']`、`catno` 逐字 `FDM 36605-2`、US 1999 CD／Album
  - **Discogs release 5811384**：https://www.discogs.com/release/5811384-Michel-Petrucciani-Steve-Gadd-Anthony-Jackson-Trio-In-Tokyo——`label` 逐字 `['Dreyfus Jazz', 'The Blue Note Tokyo', 'Studios Ferber', 'Metropolis Mastering']`、`catno` 逐字 `FDM 36605`、France 1999 CD／Album／Promo
  - 四處比對結果：`enum/blue-note.json`、全部 `c*/slice.json`、全部 `c*-cards.json`、`seed_cards.json` 皆 0 筆（以 `rgMbid` ＋（正規化藝人名, 正規化盤名）兩種鍵逐列比對）
- **判定**：**`gap`**　**真缺口**：Discogs 廠牌鏈＋目錄號確認為 Blue Note 家族發行，四處皆無。

### 16. Prysm《Time》(1999) — **`gap`**

- **RG MBID**：`1e8ff572-72cb-3a59-a31c-163b03c7acf7`
- **artist MBID**：`94afe824-e2f3-47a1-8619-14d79901bc10`
- **為什麼列舉檔碰不到它**：`label-info` 空
- **實查**：MB 這個 release-group 有 1 筆 release，其中 1 筆 `label-info` 為空；非空者掛的是 （無）——**沒有一筆掛 Blue Note 家族實體，所以以 label 為軸的列舉腳本碰不到它**。Discogs 則明確把它記在 Blue Note 名下。
- **佐證**：
  - MB release-group：https://musicbrainz.org/release-group/1e8ff572-72cb-3a59-a31c-163b03c7acf7（`first-release-date` 1999、`primary-type` Album）
  - MB release `116507e0-1435-4455-98ff-b3d774a8e851`（1999、FR）——**`label-info` 逐字為空陣列 `[]`**
  - **Discogs release 930303**：https://www.discogs.com/release/930303-Prysm-Time——`label` 逐字 `['Blue Note', 'EMI Music France', 'EMI Music France', 'EMI Music France', 'Studios La Buissonne', 'Studios La Buissonne', 'Studios La Buissonne', 'EMI Uden', 'EMI Uden', 'La Firme']`、`catno` 逐字 `7243 5 21886 2 8`、France 1999 CD／Album
  - 四處比對結果：`enum/blue-note.json`、全部 `c*/slice.json`、全部 `c*-cards.json`、`seed_cards.json` 皆 0 筆（以 `rgMbid` ＋（正規化藝人名, 正規化盤名）兩種鍵逐列比對）
- **判定**：**`gap`**　**真缺口**：Discogs 廠牌鏈＋目錄號確認為 Blue Note 家族發行，四處皆無。

### 17. Ron Carter《Stardust》(2001) — **`gap`**

- **RG MBID**：`bfb6c1ec-2f72-328e-a0f9-a844802cef07`
- **artist MBID**：`57db3f59-9c58-4f68-a00e-e044666c4828`（／US jazz double-bassist）
- **為什麼列舉檔碰不到它**：`label-info` 空
- **實查**：MB 這個 release-group 有 1 筆 release，其中 1 筆 `label-info` 為空；非空者掛的是 （無）——**沒有一筆掛 Blue Note 家族實體，所以以 label 為軸的列舉腳本碰不到它**。Discogs 則明確把它記在 Blue Note 名下。
- **佐證**：
  - MB release-group：https://musicbrainz.org/release-group/bfb6c1ec-2f72-328e-a0f9-a844802cef07（`first-release-date` 2001、`primary-type` Album）
  - MB release `c8fe0162-c490-4f27-a2e7-c9125db0f187`（2001、RU）——**`label-info` 逐字為空陣列 `[]`**
  - **Discogs release 13146556**：https://www.discogs.com/release/13146556-Ron-Carter-Stardust——`label` 逐字 `['Blue Note', 'BMG Direct', 'BMG Direct']`、`catno` 逐字 `7243 5 37813 2 3`、US 2001 CD／Album／Club Edition
  - **Discogs release 11904625**：https://www.discogs.com/release/11904625-Ron-Carter-Stardust——`label` 逐字 `['Blue Note', 'Clinton Recording Studio', "Somethin' Else Records", "Somethin' Else Records", 'EMI MFG.', 'Retrac Productions Inc.']`、`catno` 逐字 `7243 5 37813 3`、US 2001 CD／Album／Promo
  - **Discogs release 9780419**：https://www.discogs.com/release/9780419-Ron-Carter-Stardust——`label` 逐字 `['Blue Note', 'Toshiba EMI Ltd', 'Capitol Records, Inc.', 'Capitol Records, Inc.', 'Capitol Records, Inc.', "Somethin' Else Records", "Somethin' Else Records", 'Retrac Productions Inc.', 'Clinton Recording Studio', 'EMI MFG.']`、`catno` 逐字 `7243 5 37813 2 3`、US 2001 CD／Album
  - 四處比對結果：`enum/blue-note.json`、全部 `c*/slice.json`、全部 `c*-cards.json`、`seed_cards.json` 皆 0 筆（以 `rgMbid` ＋（正規化藝人名, 正規化盤名）兩種鍵逐列比對）
- **判定**：**`gap`**　**真缺口**：Discogs 廠牌鏈＋目錄號確認為 Blue Note 家族發行，四處皆無。

### 18. Stefano Di Battista《Round About Roma》(2002) — **`gap`**

- **RG MBID**：`0762a45c-b1b7-3f51-9cb4-753b0746a011`
- **artist MBID**：`f6c8ec20-2761-434d-a812-0a9385edc120`
- **為什麼列舉檔碰不到它**：MB 只掛到母公司／他廠，Blue Note 那一筆的 `label-info` 是空的
- **實查**：MB 這個 release-group 有 2 筆 release，其中 1 筆 `label-info` 為空；非空者掛的是 EMI——**沒有一筆掛 Blue Note 家族實體，所以以 label 為軸的列舉腳本碰不到它**。Discogs 則明確把它記在 Blue Note 名下。
- **佐證**：
  - MB release-group：https://musicbrainz.org/release-group/0762a45c-b1b7-3f51-9cb4-753b0746a011（`first-release-date` 2002-11-07、`primary-type` Album）
  - MB release `76133874-e566-4212-9412-c7c347d57985`（無日期）——**`label-info` 逐字為空陣列 `[]`**
  - MB release `d23d691f-669c-4d05-a8e4-56693babdf54`（2002-11-07、DE）——EMI（catno 7243 542406 2 1）
  - **Discogs release 5074194**：https://www.discogs.com/release/5074194-Stefano-di-Battista-Round-About-Roma——`label` 逐字 `['Blue Note', 'EMI', 'EMI', 'EMI Music France', 'EMI Music France', 'Studio Davout', 'Studio Davout', 'Dyam']`、`catno` 逐字 `7243 542406 2 1`、Europe 2002 CD／Album
  - 四處比對結果：`enum/blue-note.json`、全部 `c*/slice.json`、全部 `c*-cards.json`、`seed_cards.json` 皆 0 筆（以 `rgMbid` ＋（正規化藝人名, 正規化盤名）兩種鍵逐列比對）
- **判定**：**`gap`**　**真缺口**：Discogs 廠牌鏈＋目錄號確認為 Blue Note 家族發行，四處皆無。

### 19. Jason Moran《The Bandwagon》(2003) — **`gap`**

- **RG MBID**：`77690c69-cda4-3031-a834-bcdb3521a2b4`
- **artist MBID**：`2f97f8ef-1bd6-439e-b725-c65081d12d86`（／American jazz pianist and composer）
- **為什麼列舉檔碰不到它**：`label-info` 空
- **實查**：MB 這個 release-group 有 1 筆 release，其中 1 筆 `label-info` 為空；非空者掛的是 （無）——**沒有一筆掛 Blue Note 家族實體，所以以 label 為軸的列舉腳本碰不到它**。Discogs 則明確把它記在 Blue Note 名下。
- **佐證**：
  - MB release-group：https://musicbrainz.org/release-group/77690c69-cda4-3031-a834-bcdb3521a2b4（`first-release-date` 2003、`primary-type` Album）
  - MB release `a75925b6-e0bd-4367-9c7b-bc7e4dbab30a`（2003、XE）——**`label-info` 逐字為空陣列 `[]`**
  - **Discogs release 442265**：https://www.discogs.com/release/442265-Jason-Moran-The-Bandwagon——`label` 逐字 `['Blue Note', 'Blue Note Records', 'Blue Note Records', 'EMI Uden', 'Village Vanguard', 'Lundvall Mastering', 'Lundvall Mastering', 'EMI Uden', 'Blue Note', 'Capitol Records, Inc.']`、`catno` 逐字 `7243 5 91893 2 1`、Europe 2003 CD／Album／Copy Protected
  - **Discogs release 18142315**：https://www.discogs.com/release/18142315-Jason-Moran-The-Bandwagon——`label` 逐字 `['Blue Note', 'BMG Direct', 'EMI MFG.']`、`catno` 逐字 `7243 5 80917 2 4`、US 2003 CD／Album／Club Edition
  - **Discogs release 1872228**：https://www.discogs.com/release/1872228-Jason-Moran-The-Bandwagon——`label` 逐字 `['Blue Note', 'EMI MFG.']`、`catno` 逐字 `7243 5 80917 2 4`、US 2003 CD／Album
  - 四處比對結果：`enum/blue-note.json`、全部 `c*/slice.json`、全部 `c*-cards.json`、`seed_cards.json` 皆 0 筆（以 `rgMbid` ＋（正規化藝人名, 正規化盤名）兩種鍵逐列比對）
- **判定**：**`gap`**　**真缺口**：Discogs 廠牌鏈＋目錄號確認為 Blue Note 家族發行，四處皆無。

### 20. Bill Charlap《Love Is Here to Stay》(2005) — **`gap`**

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

### 21. Ruben Hein《Live》(2011) — **`gap`**

- **RG MBID**：`d00a707f-f318-434e-890a-dad529f8744b`
- **artist MBID**：`347bd1f6-816a-4edc-ad0e-941ff78f50b9`
- **為什麼列舉檔碰不到它**：`label-info` 空
- **實查**：MB 這個 release-group 有 1 筆 release，其中 1 筆 `label-info` 為空；非空者掛的是 （無）——**沒有一筆掛 Blue Note 家族實體，所以以 label 為軸的列舉腳本碰不到它**。Discogs 則明確把它記在 Blue Note 名下。
- **佐證**：
  - MB release-group：https://musicbrainz.org/release-group/d00a707f-f318-434e-890a-dad529f8744b（`first-release-date` 2011、`primary-type` Album）
  - MB release `6c05749e-dff2-47b2-9811-fa2930ea3a90`（無日期）——**`label-info` 逐字為空陣列 `[]`**
  - **Discogs release 4604332**：https://www.discogs.com/release/4604332-Ruben-Hein-With-The-Metropole-Orchestra-Conducted-By-Jules-Buckley-Live-At-The-Royal-Theatre-Carr%C3%A9——`label` 逐字 `['EMI', 'Blue Note', 'EMI Music Netherlands BV', 'EMI Music Netherlands BV', 'EMI', 'EMI', 'Theater Carré', 'Optimal Media GmbH']`、`catno` 逐字 `50999 9410122 5`、Netherlands 2011 CD／Album
  - 四處比對結果：`enum/blue-note.json`、全部 `c*/slice.json`、全部 `c*-cards.json`、`seed_cards.json` 皆 0 筆（以 `rgMbid` ＋（正規化藝人名, 正規化盤名）兩種鍵逐列比對）
- **判定**：**`gap`**　**真缺口**：Discogs 廠牌鏈＋目錄號確認為 Blue Note 家族發行，四處皆無。

### 22. Van Morrison《Born to Sing: No Plan B》(2012) — **`gap`**

- **RG MBID**：`de243950-fafd-420f-bcf9-668241d61b45`
- **artist MBID**：`a41ac10f-0a56-4672-9161-b83f9b223559`
- **為什麼列舉檔碰不到它**：MB 只掛到母公司／他廠，Blue Note 那一筆的 `label-info` 是空的
- **實查**：MB 這個 release-group 有 2 筆 release，其中 1 筆 `label-info` 為空；非空者掛的是 Exile——**沒有一筆掛 Blue Note 家族實體，所以以 label 為軸的列舉腳本碰不到它**。Discogs 則明確把它記在 Blue Note 名下。
- **佐證**：
  - MB release-group：https://musicbrainz.org/release-group/de243950-fafd-420f-bcf9-668241d61b45（`first-release-date` 2012-09-29、`primary-type` Album）
  - MB release `5deed131-9124-46ac-a1ff-0ca21f7920fc`（2012-10-02、US）——Exile（catno 509996 23491 2 3）
  - MB release `ac55ea62-8272-4cfe-82e8-239bb8186c89`（無日期）——**`label-info` 逐字為空陣列 `[]`**
  - **Discogs release 12319738**：https://www.discogs.com/release/12319738-Van-Morrison-Born-To-Sing-No-Plan-B——`label` 逐字 `['Exile', 'Blue Note Records', 'Exile Productions Ltd.', 'Exile Records Ltd.', 'Exile Records Ltd.', 'Exile Publishing Ltd.', 'EB Music Services', 'Metropolis Mastering']`、`catno` 逐字 `509996 23491 2 3`、Russia 2012 CD／Album／Unofficial Release
  - **Discogs release 3917807**：https://www.discogs.com/release/3917807-Van-Morrison-Born-To-Sing-No-Plan-B——`label` 逐字 `['Exile', 'Exile Records Ltd.', 'Exile Records Ltd.', 'Blue Note Records', 'Exile Productions Ltd.', 'Metropolis Mastering', 'Optimal Media GmbH', 'Exile Publishing Ltd.', 'EB Music Services']`、`catno` 逐字 `509996 23491 2 3`、Europe 2012 CD／Album
  - **Discogs release 8960423**：https://www.discogs.com/release/8960423-Van-Morrison-Born-To-Sing-No-Plan-B——`label` 逐字 `['Exile', 'Exile Records Ltd.', 'Exile Records Ltd.', 'Exile Productions Ltd.', 'EMI Music Australia Pty. Limited', 'Metropolis Mastering', 'Blue Note Records', 'EMI Music Australia Pty. Limited', 'Exile Publishing Ltd.', 'Eb Music Services', 'Regency Media']`、`catno` 逐字 `509996 23491 2 3`、Australia 2012 CD／Album
  - 四處比對結果：`enum/blue-note.json`、全部 `c*/slice.json`、全部 `c*-cards.json`、`seed_cards.json` 皆 0 筆（以 `rgMbid` ＋（正規化藝人名, 正規化盤名）兩種鍵逐列比對）
- **判定**：**`gap`**　**真缺口**：Discogs 廠牌鏈＋目錄號確認為 Blue Note 家族發行，四處皆無。

### 23. James Francies《Flight》(2018) — **`gap`**

- **RG MBID**：`f4539fe1-df19-4ad4-99d3-c2d5a2539471`
- **artist MBID**：`604f0692-4d31-479b-a93a-e4c75be21f81`（／US jazz pianist/keyboardist）
- **為什麼列舉檔碰不到它**：`label-info` 空
- **實查**：MB 這個 release-group 有 1 筆 release，其中 1 筆 `label-info` 為空；非空者掛的是 （無）——**沒有一筆掛 Blue Note 家族實體，所以以 label 為軸的列舉腳本碰不到它**。Discogs 則明確把它記在 Blue Note 名下。
- **佐證**：
  - MB release-group：https://musicbrainz.org/release-group/f4539fe1-df19-4ad4-99d3-c2d5a2539471（`first-release-date` 2018、`primary-type` Album）
  - MB release `7c7e845f-4d50-44a2-ac3d-1ef8e4999291`（無日期）——**`label-info` 逐字為空陣列 `[]`**
  - **Discogs release 34231921**：https://www.discogs.com/release/34231921-James-Francies-Flight——`label` 逐字 `['Blue Note']`、`catno` 逐字 `B002868602`、US 2018 CD／Album
  - **Discogs release 13995462**：https://www.discogs.com/release/13995462-James-Francies-Flight——`label` 逐字 `['Blue Note']`、`catno` 逐字 `00602567741343`、Europe 2018 CD／Album／Stereo
  - **Discogs release 14779127**：https://www.discogs.com/release/14779127-James-Francies-Flight——`label` 逐字 `['Blue Note']`、`catno` 逐字 `none`、Unknown 2018 CDr／Album／Promo
  - 四處比對結果：`enum/blue-note.json`、全部 `c*/slice.json`、全部 `c*-cards.json`、`seed_cards.json` 皆 0 筆（以 `rgMbid` ＋（正規化藝人名, 正規化盤名）兩種鍵逐列比對）
- **判定**：**`gap`**　**真缺口**：Discogs 廠牌鏈＋目錄號確認為 Blue Note 家族發行，四處皆無。

### 24. Joel Ross《KingMaker》(2019) — **`gap`**

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

### 25. Kendrick Scott Oracle《A Wall Becomes a Bridge》(2019) — **`gap`**

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

共 **0** 筆：MB 兩端都沒有 Blue Note 廠牌可判，Discogs 覆核在本層時間內沒跑到。**這些不是「判為不是 Blue Note」，是「還沒判」**——接手的人請從這張表往下跑。


---

## 五、掃描進度明細

- **藝人軸列舉：541／541 位藝人全部掃完**（`release-group?artist=<id>&type=album`，含分頁）。
- 藝人軸共看到 **8,937 張 1985 年後的 Album**（另扣掉 5,616 張 secondary-type 被排除、863 張無日期）。
- 其中 **1,128 張以 `rgMbid` 命中四處既有資料、176 張以（藝人, 盤名）命中**，**其餘 7,184 個相異 release-group 進入 Blue Note 家族判定**。
- **MB 廠牌判定 7,184／7,184 全數跑完**：`other-label-only` 6,159／`all-label-info-empty` 609／`partial-label-info-empty` 416／**`bn-label-present` 0**。
- **Discogs 覆核 1,025／1,025 全數跑完**（含 13 筆羅馬字重查），**沒有留下 `unclear`**。
- **結果：25 筆 `gap`、1,000 筆 `not-blue-note`。**
- **Discogs 覆核：1025／1,025**（順序：`label-info` 全空且該藝人在 ±8 年內有已知 Blue Note 盤者優先，其次是部分空且鄰近者，最後是其餘）。
- **`not-blue-note` 1000 筆是逐筆核過年份與掛名的**（Discogs 搜尋結果須年份差 ≤2 年、且掛名字串含該藝人名，才拿來判廠牌——否則會被 `Love Is Here to Stay` 這種同名碟帶偏）。

