# c-81 交接（2026-09-04）：美國 1980 年代地下搖滾廠牌的 B 面，44 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

深掘線（`lineType: 深掘`，`scene: 美國 1980 年代地下搖滾廠牌的 B 面`）。
**44 張、44 位藝人（一人一張）、零 §1 人工身分、零跨批撞卡、44/44 釘住 release-group MBID。**

這批的核心概念是「**B 面**」——不挖無名廠牌，**挖知名地下廠牌目錄裡沒人談的那些盤**。
刻意避開 Hüsker Dü／Minutemen／Black Flag／Meat Puppets／Sonic Youth／Dinosaur Jr／Big Black／
Butthole Surfers／Replacements／Dead Kennedys／Camper Van Beethoven 的代表作（池中已有 40 張，全是正典側）。

| 組 | 場景 | 張數 | 年份 |
|---|---|---:|---|
| a | 硬蕊／post-hardcore／noise rock 廠牌線 | 22 | 1980–1991 |
| b | paisley underground、cowpunk 與 college rock 小廠 | 22 | 1982–1990 |

`fix-rgmbid` **修正 0**。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **37/44（84%）**，7 張要掃圖 | `c81/caa.json`、`c81/caa.log` |
| 2. 三軸與 rarity | **雲端未做**——照 §0.8 錨點制（第 89 條），`ratings.source` 記 `manual:depth-rubric` | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **44 張全部寫完並過機器 QA** | `desc-tools/batches/output/c81-out-{1,2}.json` |
| 5. 固定試聽 | **28/44 ready（64%）**，**命中全部在 `us`** | `c81/previews.json`、`c81/previews.log` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

## 三、探測層被研究層推翻六處——**全部是「標 ready 卻漏標擴充版」**

主線**逐一開 `release?release-group=<id>&inc=recordings` 回問 MusicBrainz 覆核**後才落地：

| 卡 | Apple | MB 原盤 | 多出來的是 |
|---|---:|---:|---|
| Scream《This Side Up》 | 11 | **10**（1985-05 US 黑膠） | 2016 數位版的〈Walking Song Dub〉 |
| Tar《Jackson》 | 11 | **10**（1991 US CD） | 2021 Chunklet／No Blow 版的〈TSN〉 |
| Alice Donut《Bucketfulls…》 | 12 | **11**（1989 US 黑膠） | 同年 CD 版的〈Lisa's Father (Waka Baby)〉 |
| Thin White Rope《Moonhead》 | 14 | **10**（1987-01 US 黑膠） | Frontier CD 版：〈Take It Home〉改長版另加四首 |
| Rain Parade《Emergency Third Rail Power Trip》 | 10 | **9**（1983 US 黑膠） | 海外／數位線的〈Look Both Ways〉（Discogs 明寫美國原盤沒有） |
| The Feelies《The Good Earth》 | 11 | **10**（1986 US 黑膠／CD／GB 黑膠） | 2009 數位版的〈She Said She Said〉 |

**Rain Parade 那筆的形狀值得記**：**同一年的美國盤與海外盤軌數就不同**——
不是「原盤 vs 再發」，是**同期不同地區**。判擴充版時不能只看年份。

**另兩張軌數兩說、依第 141 條兩個數字都不填、行文禁止給總數**：
Soul Asylum《Made to Be Broken》（Discogs 12 vs MB 13）、
Beefeater《House Burning Down》（MB 12 vs Discogs 16，差在算不算 1 段 Introlude 與 3 段 Interlude）。

**Gray Matter《Food for Thought》要本機再核一次**：Apple 12 軌、原盤 10，
多出的是 2016 數位版的〈Phobias (demo version)〉與〈The Spy〉；
**但要確認 Apple 那筆是 2016 數位加曲版、還是 Dischord 48 的合併版**——若是合併版，依第 129 條連試聽都不採。

## 四、策展層被研究層推翻十七處（a 9、b 8）——**全部以研究稿為準**

**a 組**：Slovenly 是**舊金山**不是洛杉磯（唯一有來源的地理是團員都念曼哈頓灘 Mira Costa 高中）；
Universal Congress Of 的 Ornette Coleman 曲在**下一張 EP**、不在本張；
**Alice Donut 目錄號是 VIRUS 73 不是 71**（Discogs 原盤、master 全七版、MB 三處一致）——**卡單 `label` 欄本機要改**；
Das Damen 下架是因為其中一軌是未具名的〈Magical Mystery Tour〉、不是封面模仿《Abbey Road》；
Die Kreuzen 1981 年成軍於**伊利諾州 Rockford**、之後才搬密爾瓦基；
Shudder to Think／God Bullies／Laughing Hyenas 的序數各有兩說；Beefeater 曲風那段維基無行內引註。

**b 組**：Green on Red 在 Slash **只有這一張**（不是四張）、成軍城市不得斷言；
**Pylon 那句稱讚是 R.E.M. 鼓手 Bill Berry、1987 年 12 月一次**，不是 Michael Stipe 多次；
Love Tractor「本張才開始加人聲」與 Rank and File「cowpunk 起點之一」**皆查無來源**；
The Suburbs「兩筆版本代表流通規模極小」是稀有度推論（第 109 條）；
Opal「SST 目錄裡最不像 SST 的一格」與 Naked Prey「沒有考古再發」都不得寫。

**教訓**：**策展層自己下的警告也要查證**——這條在 c-87 已經踩過一次（警告「不是 MJQ 的那位 John Lewis」，實際上就是）。

## 五、hook 與寫作層攔下的東西

**hook 層**（兩組合計）
- **跨組同構六處**（第 131 條，機器掃不到）：刻紋刻字、兩次錄音、封面畫與版面掛團員、
  出版公司名連到樂器 credit、盤名變成場景名、內標版權印反——**a 組先到先得，b 組逐一讓開**。
- **候選 hook 退回六個**：God Bullies 的「46 秒那軌夾在兩首四分多鐘的歌中間」**讀錯 facts**（前一首 3:45）；
  Scream 的「兩面隔了四個月」是 facts 沒有的算術（第 64 條）；
  Gray Matter「和聲欄五個名字沒有一個是團員」是一步比對推論（第 110 條）；
  Big Boys「兩個人的樂器欄一模一樣」（facts 只寫「互相重疊」，順序不同）；
  另兩個含禁語「你」「我們」，一個是否定句。

**寫作層**
- **b 組攔下一處 note 與 facts 打架**：Big Dipper 的 note 寫「Michener 與 Waleik 找來 Goffrier 與 Oliphant，
  **後兩人**是表兄弟」，但 facts（英文維基）寫的是 **Waleik 與 Oliphant**。
  依第 41／64 條以 facts 為準；**主線已回頭改 `c81-hooks-b.json` 與 `c81-writer-2.json` 兩處**。
- **b 組攔下 Soul Asylum 的 `sound` 欄寫「十二首歌」**——`researchNotes` 依第 141 條明令不得寫本碟軌數。
  全文改用〈Tied To The Tracks〉2:33 當錨點。
- **a 組把兩處有 facts 撐著的序數也改掉**：Necros 改成只留廠牌側的「第一個出版品」、
  Das Damen 改寫成「1986 年的同名專輯」，**全批序數只剩 Saccharine Trust 一張**。
- **第 135 條逐項回數**：a 組 Gone 的「九首落在 2:10 到 3:59」逐首數過成立、照用端點式寫法；
  Saccharine Trust 的「A 面有五首在四分鐘以內」改成單一端點值。
  b 組七處計數全部回 facts 數過成立、無需改寫。**這批是第一次「回去數之後大多成立」。**

## 六、機器 QA 結果

```
node desc-tools/qa-batch.mjs research c81          a 22／b 22，key 與卡單完全一致 ✓
node desc-tools/qa-batch.mjs hooks c81             0 標記
node desc-tools/chk-hook-crossgroup.mjs c81        2 組｜44 張｜hook 加權 15–41｜note 304–350｜✓ 全部通過
node desc-tools/qa-batch.mjs out c81               out-1｜22 張｜字數 219–238
                                                   out-2｜22 張｜字數 224–239
                                                   合計 44 張，與卡單相符 ✓，>260: 0
qa-check-research（兩檔各一次）                      各 0 標記
fix-spacing（兩檔各一次）                             待補 0
```

**「未具名出處」燈兩組都是零，且不是靠刪內容關的**（第 143 條）：
a 組有來源的評語全部具名寫出並保留——Trouser Press 的 Ira Robbins、Andrea 'Enthal、
《紐約時報》Robert Palmer、《Toronto Star》（連同它自註的「諧擬」）、AllMusic 的 Christopher True、
《Windy City Times》、Colin Larkin；Die Kreuzen 的 WAMI 名人堂**是因為沒寫進去、不是為了關燈刪掉**。
b 組唯一具名獎項是 Soul Asylum 的葛萊美最佳搖滾歌曲，不觸發該規則；
Rank and File 的 Pazz & Jop 與 The Suburbs 的明尼蘇達音樂獎**是字數排不進去**，不是為了避開檢查。

## 七、行文上的兩個敏感處置（本機審稿要看）

- **Big Boys B 面第七軌曲名含種族歧視字眼**：研究稿刻意不轉錄，**全批禁止引用**；
  a 組行文**整段未提該軌**，管樂客席只寫 A3 那一首。
- **Beefeater 的製作人「Gumbo Mackaye」**：唱片與 Dischord 官網都印這個名字，
  但**查無任何來源說明是誰的化名**，**明令不得等同 Ian MacKaye**；行文照印出來的字寫。

## 八、本機還要做的事

1. **掃 7 張封面**（`c81/caa.log` 的「無圖」列）。
2. **改 Alice Donut 卡單的 `label` 目錄號**：VIRUS 71 → **VIRUS 73**。
3. **核 Gray Matter 的 Apple 那筆是數位加曲版還是 Dischord 48 合併版**（若是合併版，依第 129 條連試聽都不採）。
4. **三軸與 rarity**、**頂點資格判定**——照 §0.8 錨點制。
5. **四處寫入與回讀**（`seed_cards.json`／`apex_pool.json`／KV／Firestore），雲端不碰。
6. **`node scripts/build-genre-tree.mjs --write`**（2026-09-04 店主新增的檢查）——
   **要排在 seed 上架之後**，否則本批的卡還不在 `seed_cards.json` 裡、算不進曲風樹。
   `data/rawgenres-cache.json` 過期就先跑一次 `--pull`。**這一步雲端做不到**
   （快取不在 git 裡，重建它要碰 KV），見 `REMOTE_RUNBOOK.md` 本機接手清單第 6 步與裁定第 147 條。
7. **清掉本批的暫存腳本**：`desc-tools/chk-c81-ha.mjs`、`desc-tools/chk-c81-hb.mjs`
   （hook 層兩位代理的字數檢查腳本，被續跑快照一併提交進來的）。
