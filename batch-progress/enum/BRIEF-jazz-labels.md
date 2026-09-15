# 爵士廠牌列舉（店主 2026-09-15：「三盲鼠已經都有了／其他日本熱門先策展／美國先挖 blue note／不限數量 先列舉」）

**這不是建卡，是列舉。** 交付物是「這家廠牌 MB 上有、池中沒有」的完整清單，
**不限張數**，之後店主看過再決定開幾批。

## 共通規則

1. **廠牌實體先列全**：`label?query=label:"<名>"&fmt=json&limit=25`，
   同一家常有多個實體（母公司／imprint／各國分公司／再發系列），**每個都要拉**，
   記下 MBID 與 type（Original Production／Imprint／Holding／Reissue Production）。
   **再發系列（Reissue Production）另列，不與原盤混在一起。**
2. **拉目錄**：`release?label=<MBID>&fmt=json&limit=100&offset=N`，**逐頁到底**
   （Blue Note 有幾千筆，`release-count` 會告訴你總數；每拉 100 筆就落檔一次）。
   把 release 折疊到 release-group（`release-group.id`），去重。
3. **只留純 Album**：`primary-type=Album` 且 `secondary-types` 不含 `Compilation`／`Soundtrack`；
   **`Live` 留**（另標）。EP／Single 不列。
4. **只留爵士**：日本大廠什麼都出，**只要爵士系列／爵士藝人**——
   用 release-group 的 genres／tags、或藝人實體的 tags 判，判不出的另列「待人工判曲風」。
5. **比對池中**：`seed_cards.json` 每列 `[artist, album, …, year]`。
   **子字串雙向比對，但要看整個掛名字串**（第 255／309 條：`Ka`、`AI`、`X` 這種會亂命中）；
   日本藝人要同時試漢字與羅馬字（池中兩種都有：`渡辺貞夫`、`Hidehiko Matsumoto`）。
   另讀 `desc-tools/batches/cards/c1[23]*-cards.json`（c-121～c-131 本機未上架，池中看不到）。
6. **`release-group` 端點不回 `label-info`／country／format**（第 259 條）——
   目錄是從 `release?label=` 拉的所以有，**折疊時把 country／date／format 帶著**。
7. **MB 查無不等於不存在**（第 309 條）：日本大廠的爵士盤 MB 建檔率低，
   **每家要記「MB 建了幾筆」當涵蓋量參考**，並列出你知道但 MB 查無的代表作（標 §1 候選）。

## 交付格式

`batch-progress/enum/<label-slug>.json`：
```json
{ "label": "…", "entities": [{ "id": "…", "name": "…", "type": "…", "releases": 0 }],
  "rows": [{ "artist": "…", "album": "…", "year": 1965, "rgMbid": "…", "country": "US",
             "format": "12\" Vinyl", "live": false, "inPool": false, "poolString": "",
             "note": "" }] }
```
另一份 `batch-progress/enum/<label-slug>.md`：總數、池中已有幾張、**缺幾張**、
按年代／藝人的分佈、MB 建檔率的判斷、§1 候選。**那份 md 是給店主看的，要短。**

**每 50 筆落檔一次**；開工先讀已有的檔、接續補完。**臨時檔放
`/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad/enum-<slug>/`**
（絕對路徑，第 306 條）。MB 守 1 req/s，UA `dip-vinyl-shop/1.0 (kubinice06@gmail.com)`。
**不要碰 git、不要動 `PROJECT_MEMORY.md`／`seed_cards.json`。**

## 分工

| 支 | 廠牌 |
|---|---|
| **blue-note** | Blue Note 全部實體（1939– 原盤；再發系列另列） |
| **jp-1** | Victor／JVC（含 Victor 的爵士系列）、東芝 EMI／Express、日本コロムビア（含 Better Days）、King（含 **Paddle Wheel**） |
| **jp-2** | CBS/Sony、Polydor Japan、Alfa、East Wind、Trio Records、Denon、Nippon Crown、Kitty、Union、Frasco |

**Three Blind Mice 不列**（店主：已經都有了）。
