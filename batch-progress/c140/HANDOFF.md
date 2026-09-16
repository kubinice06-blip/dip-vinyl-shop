# c-140 交接（2026-09-16）：Blue Note 1964–66（Lion 時代收尾），30 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

Blue Note 目錄補齊線的**第六批，也是 1939–66 這一段的最後一批**（`lineType: 深掘`）。
**BLP 4200 系列前段**——Alfred Lion 還在、new thing 與硬咆勃並存的最後兩年，
外加兩張 1981／1985 才從庫房出土的 vault 盤。

**30 張、20 位掛名、零 §1 人工身分、30/30 釘住 release-group MBID、全部 Album。**

| 組 | 內容 | 張 |
|---|---|---:|
| a | 1964–66：Johnny Coles、Stanley Turrentine、Grachan Moncur III、Freddie Hubbard、Duke Pearson、Pete La Roca、Lee Morgan…… | 18 |
| b | 1964–66（含 1985 vault 盤）：Ornette Coleman（Golden Circle 兩卷）、Lee Morgan、Freddie Hubbard…… | 12 |

**原 slice 36 張，退 6**（理由逐筆在 `rulings.md`）。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 項目 | 狀態 |
|---|---|
| 身分（rgMbid 釘住） | **30/30，全部 pinned，零 §1 人工** |
| 三軸與頂點資格 | 卡單已帶，本機組 manifest 時照跑 |
| 固定簡介（desc） | **30/30 全 full**，out-1 229–240／out-2 232–240 |
| 封面 | **30/30** |
| 固定試聽／無來源狀態 | **30/30，無來源 0 張** |
| §5.5／§5.6 例外欄位 | **不適用**——30 張全是純 Album |
| published gate | 本機端 |

**這是這條線第一批封面與試聽都滿分的批次。**

**驗證**：`qa-batch out c140` 30 張與卡單相符、全部通過；`qa-batch hooks c140`＋`chk-hook-crossgroup c140` 全過
（hook 加權 19–36、note 306–350）；`fix-spacing --field desc` 兩檔待補 0；research 兩組全 full。
**鉤子層的發行年逐筆比對（第 556 條）30/30 相符。**

## 三、⚠ 年份：改了 4 張，其中兩張是「盤面 ℗© 年不是上市年」

| 碟 | 原 | 改 | 依據 |
|---|---:|---:|---|
| Bobby Hutcherson《Extension》 | 1964 | **1967** | Cash Box 1967-01-21 p25 Blue Note 整版廣告（頁腳已是 Liberty） |
| Lou Donaldson《Bring It Home to Me》 | 1966 | **1967** | Cash Box 1967-03-04 p42 評論 |
| Ornette Coleman《The Empty Foxhole》 | 1966 | **1967** | CB 1967-01-21 短訊「to be released in the near future」＋1967-04-15 JAZZ PICKS |
| Lee Morgan《The Rajah》 | 1984 | **1985** | CB 1985-01-19 Lundvall 訪談列出 Blue Note 重啟首批四張庫存盤 |

另 **《Little Johnny C》維持 1964** 但推翻了 Discogs：**它的美國原壓整群標 1963（＝錄音年）是錯的**
（CB 1964-04-04 評論＋04-11 三四月新貨總表）。

⚠ **這批立的兩條（後批都在用）**：
1. **盤面的 ℗© 年是版權年，不是上市年**——**Discogs 原壓群多半抄它，所以會整群一起錯**。
2. **Cash Box 常在正式評介前幾個月先登「to be released in the near future」短訊**
   ——**預告 ＋ 評介兩則一起用可以夾出上市月份**。
3. **紙本零命中只能推翻「某年已上市」，不能單獨建立另一個年份**（第 573 條）
   ——差別在同號段別的號碼有沒有命中。

## 四、⚠ 兩張把握度低的（正文已收斂）

- **Duke Pearson《Wahoo!》（BLP 4191）**：jazzdisco 寫「1966+」、Discogs 原壓 1965／1966 混雜、
  154 期 Cash Box **4191 全段零命中**。取 Discogs 最早壓片 1965，**正文不寫月份與市場反應**。
- **Pete La Roca《Basra》（BLP 4205）**：**全組唯一沒有同期紙本的一張**，Discogs 兩筆原壓乾淨標 1965，
  維持 1965，**正文同樣不寫月份**。

## 五、⚠ 研究層修掉的事實錯五處（第 571／574 條）

《The Rajah》**曲目作者原本寫反**（〈The Rajah〉是 Lee Morgan、〈A Pilgrim's Funny Farm〉是 Cal Massey）；
《Of Love and Peace》的〈Pavanne〉作者是 **Morton Gould**；
《Delightfulee》大樂團漏了 **Jim Buffington（法國號）與 Don Butterfield（低音號）**；
《Vibrations》MB 第 7 軌〈Pavane〉**就是** jazzdisco／維基的〈The Lamp Is Low〉（同一軌兩個名字）；
**《Mustang!》的「Freddie Waits 出道作」查無獨立來源，已擋**。
另 **MB 曲名錯**：《Little Johnny C》第 4 軌應是〈My **Secret** Passion〉不是 Sweet。

## 六、缺的

- **無**。封面 30/30、試聽 30/30。
- ⚠ **《A Chip off the Old Block》的試聽版本第 6／7 軌是早期七重奏版**（前 5 軌同序對應原盤）。
- ⚠ **Night of the Cookers 兩卷在店面是兩個條目**（Vol. 1 `1442950621`／Vol. 2 `1443156966`），**沒有合訂**。

## 七、下一批

- **c-135～c-140 全部走完雲端段，1939–66 這一段到此結束**（共 228 張）。
- **c-141（1967–69）**寫作層在跑；**c-142（1968–70）**策展層在跑；c-143～c-146 待派。
- ⚠ **第 312 條：1939–66 六批跑完，該開 §5.6 子批把資料庫標 Compilation 的正典撈回來了**
  （Miles Davis《Volume 1》BLP 1501、Navarro《Vol. 2》BLP 1532、Monk／Powell 的 Volume 系列……）。
- 紙本涵蓋表在 `batch-progress/enum/SOURCES-billboard-cashbox.md`：
  **Cash Box 已覆蓋 1960-11→1969 年底無缺口，1970 年起還沒有人掃。**
