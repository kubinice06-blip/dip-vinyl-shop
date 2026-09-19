# Blue Note 1985 後線・列舉層缺口稽核（**藝人軸**重掃）

> **已掃 541／541 位藝人**（藝人＝MB artist MBID，由本線 1231 個已知 release-group 精確反解，非字串比對）。
> 生成：2026-09-19　狀態：**進行中：541 位藝人全數掃完、7,184 筆候選的 MB 廠牌判定全數跑完；1,025 筆「MB 查不到 Blue Note 廠牌」的 Discogs 覆核執行中（已覆核 30 筆）**

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

## 二、結論總表

| verdict | 筆 |
|---|---:|
| `gap` | 2 |
| `already-covered` | 0 |
| `not-blue-note` | 0 |
| `unclear` | 0 |
| **合計** | **2** |

### `gap` 的「列舉檔碰不到」成因分類

| 成因 | 筆 |
|---|---:|
| `label-info` 空 | 1 |
| MB 掛成母公司 `Capitol Records`＋另一筆 `label-info` 空 | 1 |

---

## 三、逐筆

### 1. Joel Ross《KingMaker》(2019) — **`gap`**

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

### 2. Kendrick Scott Oracle《A Wall Becomes a Bridge》(2019) — **`gap`**

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

## 四、掃描進度明細

- **藝人軸列舉：541／541 位藝人全部掃完**（`release-group?artist=<id>&type=album`，含分頁）。
- 藝人軸共看到 **8,937 張 1985 年後的 Album**（另扣掉 5,616 張 secondary-type 被排除、863 張無日期）。
- 其中 **1,128 張以 `rgMbid` 命中四處既有資料、176 張以（藝人, 盤名）命中**，**其餘 7,184 個相異 release-group 進入 Blue Note 家族判定**。
- **MB 廠牌判定 7,184／7,184 全數跑完**，結果：`other-label-only` 6,159／`all-label-info-empty` 609／`partial-label-info-empty` 416／**`bn-label-present` 0**。
- ⚠ **`bn-label-present` 掛零是本層最重要的整體結論**：**沒有任何一個「MB 上掛著 Blue Note 家族廠牌」的 release-group 被列舉檔漏掉。**換句話說，`enum/blue-note.json` 的 label 軸對「MB 有填 Blue Note 廠牌」的碟是**完整的**，**它唯一的盲區就是 MB 那一端沒把 Blue Note 填上去**（空 `label-info`，或掛成母公司）。
- **Discogs 覆核進度：30／1,025**。

