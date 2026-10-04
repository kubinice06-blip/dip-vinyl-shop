# 「重配後只做一半」候選逐張核對（2026-10-04）

Coleman Hawkins《Body and Soul》與 Odyssey《Odyssey》是同一種病：release-group 重配正確了，
簡介、三軸、年份、曲風卻還停在對「配錯的那張碟」寫的值。這份是把同形狀的候選逐張對過的結果。

**結論：沒有第三張。** 候選 19 張（字樣命中 17 張＋改用較準的條件多掃到 2 張）裡，沒有任何一張是
「身分換了、其他欄位沒換」。但核對過程對出兩個資料錯誤、一個衛生問題，以及三種簡介寫法問題。

每張都對了五樣：池中那一列、`card_catalog`（rgMbid／封面／UPC／三軸）、MusicBrainz 的 release-group
（標題、掛名、首發年、類型、轄下 release）、線上簡介、固定試聽。

> **處理結果（同日，店主「1、2 都做，3 排進去」）**：下表前五列已修（`round2-smallfix-apply.mjs`）；
> 子曲風表已重建；Dariush 那種資料庫口吻與其餘夾諺文的簡介排進 `ROUND2-QUEUE.md` 的 B3、B4 區。

## 有問題的

| 卡 | 問題 | 建議 |
|---|---|---|
| 蔡琴《蔡琴老歌》 | **固定試聽配到另一張選輯。** 現配 Apple 1114507022 是 2003 年鄉城的 32 軌《蔡琴老歌》（不了情／懷念／夢中人…），與本卡的 1985 飛碟 10 軌（癡癡的等／寒雨曲／落花流水…）**一首都不重疊**。manifest 當時就寫了「本機請務必覆核」，沒人覆核。 | 改配 Apple 993111862《蔡琴老歌 (Remastered)》（TW，10 軌、曲序逐首相符，℗ 2015 華納） |
| Ana Moura《Desfado》 | **曲風標成 jazz**（子曲風 jazz/vocal）。這是 fado；`mapgenre3` 的原始標籤第一個就是 fado，對照表沒有 fado 才落到 jazz。 | 改 world |
| Queen《Greatest Hits》 | `card_catalog.upc` 還是最初誤配的 2008 年俄羅斯盜版的條碼（4607147861714）；固定試聽是 unavailable，但 Apple 三個店面都有正版（6781080300，17 軌、1981-10-26）；頂點資格當時寫「重配前不評估」，重配後沒有補評（classic 5）。 | 換 UPC、補試聽、補評頂點 |
| Various Artists《The Crying Princess: 78rpm Records From Burma》 | 簡介最後一句是「這張沒有試聽來源。」——那是給管線看的狀態，不是給客人看的。**c-129 整批有 11 則都這樣收尾。** | 刪掉那一句（11 則） |
| 서태지와 아이들《서태지와 아이들 IV》 | 正文夾諺文：「遭한국공연윤리위원회 判定」「서태지 不改詞」。同一則開頭已經寫了「徐太志」。全池正文（不含書名號內）有諺文的共 72 則。 | 改成「韓國公演倫理委員會」「徐太志」；其餘 71 則排第二輪 |
| Dariush《Cheshme Man》 | 身分、封面、試聽都對（三者都是 Caltex 的 12 軌版）。但簡介用資料庫的口吻講話：「同一個條目底下的三張碟」「這一筆的廠牌記…另外兩筆連日期都沒有」。全池這種寫法共 93 則，集中在 c-9x 之後資料稀薄的卡。 | 排第二輪，由店主決定這種寫法要不要留 |

## 沒問題的（13 張）

字樣命中的原因都是無害的註記：

- **「佔位」指的是 MusicBrainz 的日期**（`1976-01-01` 這種只有年份、月日補 01-01 的佔位值），或「listeners 查不到、人工評分」。
  Bo Diddley《His Best》、Steve Miller Band《Fly Like an Eagle》、Musiq Soulchild《Juslisen》、譚詠麟《愛情陷阱》、
  서태지와 아이들《서태지와 아이들 IV》（身分面）、George Winston《December》、Los Prisioneros《La Voz de los '80》、John Holt《1000 Volts of Holt》。
- **「不是同一張」是在排除近名的別張碟**（「刻意不釘：…名字近但不是同一張」）。
  Eddie "Flashin" Fowlkes《Black Technosoul》、Joe Williams《Worth Waiting For...》、Joy Division《Still》。
- **「與策展年不符」已經照 MB 改好了**：Malavoi《La Case à Lucie》（池中 1986）、Derrick Carter《Squaredancing in a Roundhouse》（池中 2002）。
- Johnny Dodds《Blue Clarinet Stomp》：「非權威全集」是如實註記，簡介也照實寫了「Past Perfect 的公版轉錄，非 Victor 原廠發行」。
- Lou Rawls《Lou Rawls Live!》：線上已於同日修好，只剩 manifest 裡的舊文字。

## 核對時順便看到的

- **池中 3,377 張卡沒有子曲風**（17,248 張的兩成）。`genre-tree.json`／`card-subgenres.json` 最後一次重建是 09-04，
  之後上架的批次都沒進去。爵士 915、搖滾 973、民謠 307、流行 296、電子 271。
  這些卡抽得到，但「類型挑片」的第二層選不到它們。要跑 `node scripts/build-genre-tree.mjs --pull --write`。
- Apple 的搜尋 API 現在從這台機器打得通了（先前長期被擋），補試聽可以直接用搜尋而不必先有 collectionId。
  **中文關鍵字要用 node 的 `fetch`，bash 的 curl 會回 0 筆。**
