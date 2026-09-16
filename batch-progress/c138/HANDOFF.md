# c-138 交接（2026-09-16）：Blue Note／United Artists 1959–63，43 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

Blue Note 目錄補齊線的第四批（`lineType: 深掘`），**BLP 4000 系列中段**，
外加 Blue Note 經由 Liberty／UA 併進來的 **United Artists Jazz、Pacific Jazz、World Pacific、Felsted** 原盤。

**43 張、30 位掛名、零 §1 人工身分、43/43 釘住 release-group MBID、全部 Album。**

| 組 | 內容 | 張 |
|---|---|---:|
| a | 1959–62：Dizzy Reece、Duke Jordan、Horace Silver、Donald Byrd、Freddie Redd、Bob Brookmeyer & Bill Evans、Clifford Brown、Cecil Taylor、Jimmy Witherspoon、Milt Jackson、Booker Little、The Three Sounds…… | 23 |
| b | 1961–63：Donald Byrd、Wes Montgomery、Carmell Jones、Leo Parker、Horace Silver、Art Blakey、Freddie Hubbard、Stanley Turrentine、Grant Green、Lou Donaldson、Kenny Clarke & Francy Boland…… | 20 |

**原 slice 45 張，退 2**（理由逐筆在 `rulings.md`，含第 313 條邊界退的 Frank Sinatra／George Shearing）。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 項目 | 狀態 |
|---|---|
| 身分（rgMbid 釘住） | **43/43，全部 pinned，零 §1 人工** |
| 三軸與頂點資格 | 卡單已帶，本機組 manifest 時照跑 |
| 固定簡介（desc） | **42 full ＋ 1 partial**，out-1 179–239／out-2 219–240 |
| 封面 | **41/43**（缺 2，見第六節） |
| 固定試聽／無來源狀態 | **43/43，無來源 0 張** |
| §5.5／§5.6 例外欄位 | **不適用**——43 張全是純 Album |
| published gate | 本機端 |

**驗證**：`qa-batch out c138` 43 張與卡單相符、全部通過；`qa-batch hooks c138`＋`chk-hook-crossgroup c138` 全過
（hook 加權 30.5–44、note 318–350）；`fix-spacing --field desc` 兩檔待補 0；research 兩組 42 full／1 partial。
主線複驗：43 張 `desc` 開頭與 `hook` 逐字相符。

## 三、⚠ 年份：這批改了 6 張，而且推翻了策展層自己的一次改判

**策展層原改 6 張、研究層推翻 1 張、另外自己再改 3 張，淨改 6 張**：

| 碟 | 原 | 改 | 依據 |
|---|---:|---:|---|
| The Three Sounds《Moods》 | 1961（策展層改的） | **改回 1960** | Cash Box 1960-11-05 預告、11-12 新片表、12-03 評論、**12-31 Blue Note 自家整版廣告** |
| Booker Little《Booker Little 4 & Max Roach》 | 1959 | **1960** | Billboard 1960-01-18 p24「UA Jan. Plan」＋同期 p56 評論；1959 年三份 UA 目錄段獨缺 4034 |
| Donald Byrd《Byrd in Flight》 | 1960 | **1961** | jazzdisco 1961＋Cash Box 1961-02-25 p32 評論；1960 全年零命中 |
| Duke Pearson《Tender Feelin's》 | 1960 | **1961** | jazzdisco＋Billboard 1961-03-20 p30 評論＋Cash Box 1961-03-18 新片表 |
| Donald Byrd《At the Half Note Cafe, Volume 2》 | 1961 | **1963** | jazzdisco 4061＝1963；**Discogs 美國原壓五筆全 1963、無 1961–62 壓片** |
| Stanley Turrentine《Up at Minton's, Volume 2》 | 1961 | **1962** | jazzdisco 4070＝1962；**Discogs 美國壓片六筆全 1962** |

⚠ **這條線到目前為止最重要的結構發現（第 526 條）**：**BLP 號在 4021–4049 這一段完全不等於發行順序**
（Cash Box 新片表：4042→1960-11、4043／4044→1960-12、4048→1961-02、4035→1961-03、4045→1961-04、
**4034《Lee-Way》遲至 1961-04-29**）。**c-139 起的批次都不得用目錄號回推年份。**

⚠ **拆卷盤的時間差比想像中大**：Half Note Vol. 1（1961）與 Vol. 2（1963）差兩年、
Minton's Vol. 1（1961）與 Vol. 2（1962）差一年——**正文不得寫「與 Vol. 1 同年發行」。**

⚠ **方法論（第 531 條）**：`api.discogs.com/database/search?catno=<目錄號>` **不需 token**，
「同一目錄號的美國原壓全部標同一年、且完全沒有更早年份的壓片」是可重複驗證的實體盤面證據。
**但它不是萬能的**——c-139 抓到 Discogs 原壓群**會整群繼承同一個錯誤的回填年**，同期紙本永遠壓過它。

## 四、⚠ 研究層擋下策展層三處＋無出處的「最／第一／唯一」三句

1. 《Moods》年份改判被推翻（上表）。
2. **Witherspoon 的「Rip Records 1956 原錄」只有維基轉引 Deffaa 一個來源**，1957–59 全段紙本零條目
   → 正文退成「據 Deffaa 的記載」。
3. 《The Ivory Hunters》`label` 欄引的「Billboard 1959-09-21」**複驗不到**，改引 1959-10-05 p46 目錄段。

**三句全擋**：維基說 Brookmeyer「唯一一張純鋼琴專輯」；《Five Spot》的 Andy Summers 名言（要寫必須具名）；
《Horace-Scope》不得把 Billboard 的 "one of the better jazz sellers" 升級成「Blue Note 最暢銷」。

## 五、⚠ 原盤他廠 9 張（本機組 manifest 時要知道）

Pacific Jazz／World Pacific／United Artists／Felsted 的原盤，**`label` 與正文一律以原廠為準**，
Blue Note 只是後來的再發方。第 515 條確認《Hard Driving Jazz》＝《Stereo Drive》＝《Coltrane Time》
（掛 Cecil Taylor，Billboard 1959-03-30 p49 把 UAL 4014 與 UAS 5014 兩個題名並列）；
《Bags' Opus》的 UAL 4022／UAS 5022 用 Billboard 1959-03-30 p48 獨立確認。

## 六、缺的

- **封面缺 2 張**：Dizzy Reece《Soundin' Off》（CAA 兩個端點都 404 確認）、
  Stanley Turrentine《Up at Minton's, Volume 2》（**替代來源：Discogs BLP 4070 原壓，或 2019 日本盤 UCCQ-9530
  ——但該盤掛在第 524 條要退的重複 RG 26026a87 底下，取圖不取 RG**）。
- 試聽 **43/43，無來源 0 張**。
- ⚠ **兩張的試聽版本軌序與原盤不同**（第 528 條）：《Jazz Immortal》（RVG 9 軌，缺原盤第 7 軌〈Bones for Zoot〉、
  多兩首 alt）、《Hard Driving Jazz》（店面只有《Coltrane Time》4 軌）——**正文已按曲名寫，不是「前 N 軌」。**
- ⚠ **Art Blakey《Meet You at the Jazz Corner of the World, Volume 1》的試聽取自 2002 年 Vol. 1＋2 合併盤**
  （`723618161`，取本盤那一軌）——**那不是同一張碟，本機上傳時要知道。**
- 唯一的 partial：《Good Friday Blues》（維基無條目、紙本零命中）。

## 七、下一批

- **c-135／c-136／c-137 已走完雲端段**；c-139 鉤子層在跑、c-140 研究層在跑、c-141 待派。
- **第 312 條**：資料庫標 Compilation 的正典要另開 §5.6 子批撈回。
- 紙本涵蓋表在 `batch-progress/enum/SOURCES-billboard-cashbox.md`——**開工看表不看檔名**（第 533 條）。
