# Blue Note 1985 後線・列舉層缺口稽核（**藝人軸**重掃）

> **已掃 541／541 位藝人**（藝人＝MB artist MBID，由本線 1231 個已知 release-group 精確反解，非字串比對）。
> 生成：2026-09-19　狀態：**進行中：541 位藝人已全數列舉完畢；候選 7,184 筆的 Blue Note 家族判定執行中（已判 2580 筆）**

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
| `gap` | 1 |
| `already-covered` | 0 |
| `not-blue-note` | 0 |
| `unclear` | 0 |
| **合計** | **1** |

### `gap` 的「列舉檔碰不到」成因分類

| 成因 | 筆 |
|---|---:|
| `label-info` 空 | 1 |

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

---

## 四、掃描進度明細

- **藝人軸列舉：541／541 位藝人全部掃完**（`release-group?artist=<id>&type=album`，含分頁）。
- 藝人軸共看到 **8,937 張 1985 年後的 Album**（已扣掉 5,616 張 secondary-type 被排除的、863 張無日期的）。
- 其中 **1,128 張以 `rgMbid` 命中四處既有資料、176 張以（藝人, 盤名）命中**，**其餘 7,184 個相異 release-group 進入 Blue Note 家族判定**。
- **Blue Note 家族判定進度：2580／7,184**。
- 第 1 筆（`Joel Ross《KingMaker》`）是派工信指名的已知種子，佐證已補齊。

