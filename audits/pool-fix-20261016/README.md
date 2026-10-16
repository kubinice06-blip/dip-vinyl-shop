# 卡池資料修正（2026-10-16，定案、已套用）

店主指示「順便修掉」：情緒三軸一萬張評分時，代理回報了一些卡池資料問題。主線逐筆查過 KV、Firestore 與 MusicBrainz 後定案如下。
**2026-10-16 已套用**：七行全部跑完，`--verify` 全部相符；情緒三軸已重建。舊 KV 鍵（`kv-deletes-pending.json`）與 card_catalog 舊文件未刪。（早先一次雲端嘗試被權限擋下，之後店主放行。）

## 怎麼套用（本機，或放行權限後）

```
node audits/pool-fix-20261016/apply.mjs            # 乾跑，只讀 KV
node audits/pool-fix-20261016/apply.mjs --write    # 本機檔：seed（刪重複、曲風、年份、合併評分）＋子曲風快取＋待套用清單
node scripts/build-genre-tree.mjs --write          # 用快取重建子曲風表（不加 --pull）
node audits/pool-fix-20261016/apply.mjs --live     # 寫 KV 22 鍵並回讀；通過才套用 In Orbit 改名
node scripts/migrate-card-catalog-ids.mjs --map audits/pool-fix-20261016/catalog-rename-map.json --write
node scripts/push-card-catalog-patches.mjs audits/pool-fix-20261016/catalog-patches-pending.json
node audits/pool-fix-20261016/apply.mjs --verify
```

`--live` 只寫不刪。重複卡和改名留下的 18 個舊 KV 鍵會列在 `kv-deletes-pending.json`，留著也無害，因為卡池已經不指向它們。
跑完後重跑情緒三軸：`node batch-progress/mood-axes/build-priors.mjs` 與 `build-scale.mjs v0`。In Orbit 的評分 id 在 `score3000/scored-3000.json`，改名後要跟著改。

## 定案

### 一、重複卡：刪 5 張（19,121 → 19,116）

| 刪 | 留 | 理由 |
|---|---|---|
| Happy End《Kazemachi Roman》 | はっぴいえんど《風街ろまん》 | 依 `ALBUM_ONBOARDING.md` 第 91 行，卡池的日籍藝人名照日文漢字或假名本名寫。「全假名改羅馬字」只適用於簡介內文提到的其他音樂人，見 cjk-06 的キングギドラ前例。`pool-artist-name-splits.md` 第四型把兩條規則混為一談，這裡不照它。留下的那張有封面、desc4，也是情緒錨點。 |
| Happy End《Happy End》 | はっぴいえんど《HAPPY END》 | 同上。 |
| Nick Cave and the Bad Seeds《Let Love In》 | Nick Cave & the Bad Seeds《Let Love In》 | MB 與封面掛名用 `&`，與稽核第三型的正規形一致。 |
| Nick Cave and the Bad Seeds《Murder Ballads》 | Nick Cave & the Bad Seeds《Murder Ballads》 | 同上。留下的那張經典度 4，被刪的是 3。 |
| Big Brother and the Holding Company《Cheap Thrills》 | Big Brother & The Holding Company《Cheap Thrills》 | 兩張都在殿堂。留 `&` 的鍵，掛名改成 MB 寫法 `Big Brother & the Holding Company`（只改大小寫，鍵不變）。三軸改用被刪那張的 5/1/3，因為經典度 3 明顯低估一張八週榜首、葛萊美名人堂的唱片。Firestore 的上架欄位一併帶過去。 |

被刪那張有、留下那張沒有的 KV 值會併過去，共 3 鍵：兩張はっぴいえんど的 `mapgenre3`，以及 Cheap Thrills 的 `rating4`。

### 二、曲風：16 張

主類型是池中曲風陣列的第一欄。子曲風來自 KV 的 `mapgenre3`，這幾張的標籤都是用同名他人查來的。

| 卡 | 池中曲風 | 原標籤的問題 |
|---|---|---|
| Cicada 全部 10 張 | electronic,classical → **classical,electronic** | 混進英國同名浩室團的 House／electro。比照 Ólafur Arnalds、Nils Frahm 的寫法 |
| The Ronettes《Presenting the Fabulous Ronettes》 | classical → **pop,soul** | Phil Spector 音牆女子團體，被歸進古典浪漫派 |
| Frost《Hispanic Causing Panic》 | electronic,rock → **hiphop** | Kid Frost 西岸 chicano rap，標籤是挪威黑金屬與浩室 |
| Barbara《L'Aigle noir》 | rock → **folk** | 法國香頌，標籤混進黑金屬與 sludge。比照她另一張與 Jacques Brel 的 folk |
| Pylon《Chomp》 | rock（不變） | Athens 後龐克，標籤混進 doom metal |
| Ruth Brown《Blues on Broadway》 | jazz,hiphop → **jazz,blues** | 她以這張拿下葛萊美最佳爵士女聲，jazz 正確；hiphop 是 R&B 誤對 |
| Ruth Brown《Miss Rhythm》 | jazz,hiphop → **soul,blues** | Atlantic 時期 R&B 精選，歸經典 R&B |

### 三、年份：2 張

- Justice《Cross》：1992 改為 **2007**。簡介本身寫的就是 2007 年 6 月。
- Peter Gabriel《Peter Gabriel (Melt)》：2009 改為 **1980**。2009 是重發年。

### 四、掛名：1 張（要搬鍵）

- Thelonious Monk《In Orbit》改為 **Clark Terry with Thelonious Monk**。依據是 MB release group b280ea34 與 Riverside 原盤封面。簡介已經寫「Clark Terry 帶著柔音號領銜，Monk 難得只當客座」，不用改字。
- 改名要動六處：seed、KV 全部前綴、card_catalog 文件 id、試聽狀態檔、試聽對照表、子曲風表。`mapgenre3` 不照搬，因為那是 Monk 的鋼琴標籤，改成 hard bop／bebop／flugelhorn，照 10-04 拆卡的教訓。

### 不改的

- **Clark《Cave Dog》是真的。** 2023-12-01 由 Throttle 發行，是《Sus Dog》的姊妹作，MB release group 5df67f10 可查證。代理判斷錯誤。

### 順帶看到、這次沒動的

- Nick Cave and the Bad Seeds 還有兩張用 `and`：《The Boatman's Call》《Tender Prey》。沒有重複卡，但要統一掛名就得搬鍵。
- Édith Piaf 同名專輯標 jazz，Jacques Brel《Ces gens-là》標 classical,folk。看起來都不對，這次沒有查證。
