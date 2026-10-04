# c-168 交接（2026-09-19）：Blue Note 1985–1999（列舉漏切補批），18 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

**不是原始列舉切出來的**，是 2026-09-18 查出列舉腳本讀錯曲風層級後的補批（第 1557 條）
——`jazz-missing` 裡 1985–1999 的 17 張 ＋ `Don Byron《Nu Blaxploitation》` 的真盤 RG。
**18 張收 18 退 0，本線第一組零退件。**

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 項目 | 狀態 |
|---|---|
| 身分（rgMbid 釘住） | **18/18 全部 pinned，零 §1 人工** |
| 三軸與頂點資格 | 卡單已帶；**本批 apex 0 張** |
| 固定簡介（desc） | **18/18 全 full**，字數 **195–236** |
| 封面 | ⚠ **9/18**——**這一段最缺的一項** |
| 固定試聽／無來源狀態 | **11/18**，**7 張走固定無來源狀態** |
| §5.5／§5.6 例外欄位 | 例外欄全空 |
| published gate | 本機端 |

⚠ ⚠ **1985–1999 段的店面與封面覆蓋率只有現役目錄的一半上下**，這是這一段的結構性事實，不是漏做：

| 批 | 年代 | 串流 | 封面 |
|---|---|---|---|
| c-167 | 2025–2026 | 14/14 | 14/14 |
| c-170 | 2016–2026 | 15/15 | 15/15 |
| c-165 | 2020–2021 | 45/45 | 44/45 |
| c-166 | 2023–2025 | 43/45 | 45/45 |
| **c-168** | **1985–1999** | **11/18** | **9/18** |

**7 張無來源**：`Ralph Peterson` 三張（`V`／`Volition`／`Ornettology`）、`Superblue` 兩張、
`The Manhattan Project`、`Ron Carter Trio《So What》`——**七張裡六張是 Somethin' Else 線**，
**策展層交件時就預測「落空集中在 Somethin' Else 線」，實測完全命中。**
**3 張的串流是回撈救回的**：`O.T.B.`（⚠ **店面用團名 `Out Of The Blue` 當盤名**）、
`Post-Motown Bop`（拆成 feat. 形）、`Reflejos Ancestrales`（⚠ **us／jp 回 0，de／fr／es 才有**）。

**封面**：9 張有圖，**其中 4 張的圖來自再發或非原盤 release**（各卡 `risk` 已寫明該走哪個 Discogs 條目）；**9 張 RG 層 404。**

## 三、⚠ 本機審稿要盯的四件事

1. ⚠ **榜位只留一張，其餘六張刻意不寫。**
   **`Post-Motown Bop` 寫「Billboard 爵士專輯榜最高第 9 名」**；
   **`Live at Mt. Fuji`／`Superblue`／`The Manhattan Project` 也都是 #9，但四張都寫就是數字模子同構**，
   **`Inside Track` #31、`O.T.B.`／`V` #29 也一併不寫。本機不要補。**
2. ⚠ **`Spiral Staircase` 不寫軌數**（美國原壓 6 軌、CD 版 7 軌，版本間不一致）；
   **`Superblue 2` 的〈Flight To Jordan〉〈Blue Minor〉不指定作曲者**（兩邊說法相反、都只有單一來源）。
3. ⚠ **兩處措辭是鉤子層刻意降級的，不要改回去**：
   `Superblue` 寫「二十多年前的 Blue Note 舊曲」（**不寫「留在同一個房間」**——facts 沒說那些老曲也錄在 Van Gelder）；
   `Superblue 2` 寫「**在** Van Gelder 的錄音室」（**不寫「回到」**——「回到」預設了上一張也在那裡錄，那是別張卡的 facts）。
4. **`O.T.B.` 的正文寫了 `Stanley Crouch` 的名字但不寫「樂評人」三字**（裁定 2903）
   ——內頁執筆是印在盤上的製作掛名，不是評價背書。**全批零樂評媒體名、零評語引用。**

## 四、研究層推翻策展層六處，其中一處是「查錯版本」

⚠ **策展層說「三張錄音日期 Discogs 與 MB 兩邊都沒有」——其中兩張 Discogs 上本來就有**：
`Post-Motown Bop` 的 1990-09-17／18 在**日版 TOCJ-5286 的條目**、`Portraits Plus` 的 1992-03-30 在**另一個英版 CD 條目**。
**這是「我查的那個版本沒有」被寫成「查不到」**（第 1678 條那族的第三次）。
其餘：`Blue Spirit` 是十軌不是九軌；`Spiral Staircase` 軌數版本不一致；
`Portraits Plus` 的 Discogs `released` 欄其實是錄音日、實際發行晚九個月；
`Reflejos Ancestrales` 的 Barbarito Torres 是 **laúd** 不是長笛。

**策展層改判三筆年份，研究層覆核全部成立**：`Superblue` 1989→1988、`Superblue 2` 1990→1989、`My Summertime` 1998→1995。

## 五、這一段的來源結構與現役目錄完全相反（給後續同年代批次）

| 路徑 | c-168（18 張） | 對照 c-166／c-167 |
|---|---|---|
| **`api.discogs.com/releases/<id>` 整筆** | **18／18，絕對主力（113 條 src）** | 第六條路徑 |
| **repo 內 Billboard／Cash Box OCR** | **11／18，唯一能給榜位與樂評原句的** | 幾乎沒動用 |
| en.wikipedia.org | 6／18（多為引用 AllMusic 的段落） | 只用於獎項覆核 |
| **`bluenote.com` wp-json** | ⚠ **1／18** | **c-166 39／45、c-167 13／14 的主力** |
| **allmusic／allaboutjazz** | ⚠ **四次全 403（Cloudflare）** | — |

⚠ **那唯一有用的一筆 `bluenote.com` 是 `search=Namekata`**（製作人 Hitoshi Namekata 的悼念文），
**一篇同時餵飽富士山音樂節緣起、1986 首屆颱風、Somethin' Else 1988 年成立、1985-02-22 One Night With Blue Note 三條線。**
**→ 查八〇、九〇年代的廠牌史，關鍵字要用製作人／A&R 的人名，不是藝人名。**

## 六、產物清單

```
desc-tools/batches/cards/c168-cards.json          18 張卡單
desc-tools/batches/research/c168-a.json           研究層（216 條 facts）
desc-tools/batches/hooks/c168-hooks-a.json        鉤子層
desc-tools/batches/input/c168-writer-1.json       merge 產物
desc-tools/batches/output/c168-out-1.json         寫作層
batch-progress/c168/{slice,caa,apple-candidates,chk-prop,prop-a}
batch-progress/c168/rulings.md                    第 2076–2913 條（五層）
batch-progress/memory-entries/c168-pipeline.md    備忘錄條目
batch-progress/probe/previews.json                串流 11/18
```
