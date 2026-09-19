# c-160 交接（2026-09-19）：Blue Note 2006–2007，38 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

切片 45 張，**收 38 退 7**（a 收 18 退 5、**b 收 20 退 2，退貨率 9.1% 是 1985 後十六批最低**）。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 項目 | 狀態 |
|---|---|
| 身分（rgMbid 釘住） | **38/38 全部 pinned，零 §1 人工** |
| 三軸與頂點資格 | 卡單已帶；**本批 apex 0 張** |
| 固定簡介（desc） | **37 full ＋ 1 thin**，full 211–240／thin 158，**兩端都沒撞到** |
| 封面 | **32/38**（缺 6，替代來源 6/6 全部查實且目視核過版式） |
| 固定試聽／無來源狀態 | **36/38 有來源**，**2 張走固定無來源狀態** |
| §5.5／§5.6 例外欄位 | 本批無合輯，例外欄全空 |
| published gate | 本機端 |

**2 張走固定無來源狀態**：Ron Carter《Dear Miles,》／Stefano Di Battista《Trouble Shootin'》
——**兩張都是「藝人目錄前後作密集在架、唯獨這張缺」的單張版權缺口**
（Ron Carter 的 jp 目錄有 174 張、Di Battista 的 EMI 時期五張全在），**不是資料不足。**

## 三、⚠ 這一批最需要本機注意的一條（第 1681 條）：四張卡上同一屆葛萊美

**第 50 屆葛萊美在這一批有四張卡，而且兩組各佔兩張**：

| 卡 | 組 | 結果 |
|---|:---:|---|
| **Terence Blanchard《A Tale of God's Will》** | b | ✅ **Best Large Jazz Ensemble Album 得獎**（另一項〈Levees〉入圍未得） |
| **Charles Tolliver《With Love》** | b | ❌ 同項入圍未得——**輸給的正是同批的 Blanchard** |
| **Bill Charlap Trio《Live at the Village Vanguard》** | b | ❌ Best Jazz Instrumental Album 入圍未得 |
| **Joe Lovano & Hank Jones《Kids》** | **a** | ❌ **同屆同項，與 Charlap 一起入圍** |

**四張已互指、零張寫成「唯一入圍」。**
⚠ **但得主 Michael Brecker《Pilgrimage》只寫在 a 組的 Lovano 那張**（Charlap 那張為字數整格捨去）
——**兩張合起來資訊完整，單張看少一格。本機若要補，從 Charlap 那張的側人名挪。**

## 四、⚠ 事實硬錯誤二十處（策展層），研究層全部推翻

**兩組合計二十處**，其中六處是「把翻唱當成自作」：
**Grant Green 八軌沒有一軌是他自己寫的**、**Lovano／Hank Jones 的〈Lady Luck〉與〈Kids Are Pretty People〉
都是 Thad Jones（Hank 1986 年辭世的弟弟）寫的**（⚠ **碟名《Kids》就是從後者來的，策展層整個寫反**）、
**Steve Kuhn 三處作者欄全錯**、**Ron Carter 的開場〈Gone〉是 Gil Evans 的**、
**Fresu 的〈Almeno tu nell'universo〉作曲者寫錯**、**Petrella 的〈Almost Cried〉是 Ellington 的**。

**另有四處是「數字與自身清單對不上」**（Trijntje 十四首說全是 Bacharach 實際只有十首、
Jimmy Smith 同一句先寫四重奏再列三人、Fresu 說九段 Frammento 實際六段、Doky 說四軌 blog 實際三軌）。
⚠ **還有一處是跨卡傳染**：**Di Battista 那張「Bosso 客座四軌」的錯（實際六軌）被原封不動抄進了 Bosso 自己那張卡。**

⚠⚠ **Truffaz《Arkhangelsk》要特別注意**：**策展層寫的 Sophie Hunger 與 Sly Johnson 在這張碟上不存在**
（三層來源一致，客座只有 Ed Harcourt、Nya、Christophe）。

## 五、⚠ 本機審稿的三個檢查項

1. **`Jacky Terrasson|Mirror` 的 hook 與正文有數字上的鬆動**：
   **facts 逐字「credit 只有四個名字」卻只列出三個人，hook 也寫「工作人員只有四個」。**
   寫作層迴避了數字、只列三個名字，**但 hook 不可改**——**請回頭核盤面。**
2. **`Gwyneth Herbert` 的封面取 2006 原壓版式**（Discogs 14791324 primary，600×520，digipak 翻拍）
   ——⚠ **不要換成 Apple 那張 600×600，那是 2007 年 Blue Note 再發的版式**，
   而這張卡的 `year` 是 2006、走的是 (丙)（第 1675 條）。
3. **序數與無來源宣稱**：研究層與鉤子層合計攔掉十餘處
   （「Blue Note 第二張／第三張領班盤」「帶了二十年」「向 Kubrick 致敬」…）
   ——**唯一有紙本可引、寫進正文的序數是 `Charles Tolliver` 的「他在這家廠牌的第一張領班盤」**（BB-2007-01-13 p36）。

## 六、⚠ 給後批與本機的三條方法論

1. ⚠⚠ **`bluenote.com` 的藝人頁要列入固定查法**：**連續九組 0 之後第一次命中，而且是決定性的**
   ——它對 2000 年後的 Blue Note 藝人有作品表與敘事，**讓 Jason Moran 的「第七張領班盤」第一次有了 src**。
   **它比 AllMusic（連九組 0、常 403）值得花時間。**
2. **串流的「查不到」有三種，救法完全不同**：
   **(a) 只在某些市場上架**（Norah Jones《Live in 2007》只在英愛）→ **UPC 掃 27 市場就撈得到**；
   **(b) UPC 全 0 但 `search` 查得到**（Mingus《Cornell 1964》）→ **兩種端點都要跑**；
   **(c) 藝人目錄完整、前後作都在、唯獨這張缺** → **版權缺口，停手。**
   ⚠ **條碼的來源依序是「MB release 的 `barcode` 欄 ＞ Discogs 條目 ＞ slice 的 `catno` 欄」**
   ——**`catno` 是最不可靠的一個**（Norah Jones 那張的條碼只在 MB 的 barcode 欄，Discogs 根本沒有條目）。
   ⚠ **Apple 的 `collection.trackCount` 欄會錯**（Mingus 那張寫 11、實際十軌）。
3. **字數低估的形狀修正了**：**看的是「有幾組『曲名＋人名』成對出現」（一組 35–45 字元），
   不是「點名幾個拉丁專名」**——本批兩組初稿 38／38 全部撞破 240，最難壓的是九軌全翻唱的 Charlap（砍了 96 字）。

## 七、產物清單

```
desc-tools/batches/cards/c160-cards.json          38 張卡單
desc-tools/batches/research/c160-{a,b}.json       研究層
desc-tools/batches/hooks/c160-hooks-{a,b}.json    鉤子層
desc-tools/batches/input/c160-writer-{1,2}.json   merge 產物（18／20）
desc-tools/batches/output/c160-out-{1,2}.json     寫作層（18／20）
batch-progress/c160/{prop-a,prop-b,slice,caa,apple-candidates}.json/md
batch-progress/c160/rulings.md                    策展層第 1620–1669 條
batch-progress/c160/rulings-mainline.md           主線第 1673–1700-A 條
batch-progress/memory-entries/c160-pipeline.md    備忘錄條目
```
