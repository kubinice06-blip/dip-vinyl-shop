# c-137 交接（2026-09-16）：Blue Note 1957–59（BLP 1500 系列末段＋4000 系列開端），39 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

Blue Note 目錄補齊線的第三批（`lineType: 深掘`），**1500 系列末段接 4000 系列開端**——
這一段正好是 Blue Note 從 10 吋／1500 系列轉進 4000 系列的交界，也是**年份最不可信的一段**。

**39 張、28 位掛名、零 §1 人工身分、39/39 釘住 release-group MBID、全部 Album（live 0 張）。**

| 組 | 內容 | 張 |
|---|---|---:|
| a | BLP 1500 系列末段（Hank Mobley、Curtis Fuller、Paul Chambers、Sonny Clark、Art Blakey、Jimmy Smith、Sabu Martinez、Cecil Taylor、Art Pepper……） | 19 |
| b | BLP 4000 系列開端（Lou Donaldson、Tina Brooks、Louis Smith、Dizzy Reece、Duke Pearson、Walter Davis Jr.、Bennie Green、The Three Sounds、Gil Evans、Charles Mingus……） | 20 |

**原 slice 45 張，退 6**：
- **第 490 條**《Gil Evans Orchestra》——列舉檔用了再發盤名，池中早有這張《New Bottle Old Wine》。
- **第 313 條（邊界）**George Shearing《The Shearing Piano》《Black Satin》、June Christy《Fair and Warmer!》
  ——Capitol 自家藝人的原盤，Blue Note 只在 1985 後再發時掛名，不歸此線。
- **第 509a 條**Peggy Lee《Things Are Swingin'》（同上邊界）、The Three Sounds《Introducing … Volume 2》
  （實為 1985 東芝EMI BNJ 61019 的 outtakes 盤）。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 項目 | 狀態 |
|---|---|
| 身分（rgMbid 釘住） | **39/39，全部 pinned，零 §1 人工** |
| 三軸與頂點資格 | 卡單已帶，本機組 manifest 時照跑 |
| 固定簡介（desc） | **39/39 全 full**，out-1 210–238／out-2 215–240 |
| 封面 | **38/39**（缺 1：Jimmy Smith《Jimmy Smith at the Organ, Volume 2》） |
| 固定試聽／無來源狀態 | **39/39**（探測 20 ＋ 研究層第三種查法 19） |
| §5.5／§5.6 例外欄位 | **不適用**——39 張全是純 Album |
| published gate | 本機端 |

**驗證**：`qa-batch out c137` 39 張與卡單相符、全部通過；`qa-batch hooks c137`＋`chk-hook-crossgroup c137` 全過
（hook 加權 26.5–41、note 297–350）；`fix-spacing --field desc` 兩檔待補 0；`qa-batch research c137` 全 full、key 與卡單一致。
主線複驗：39 張 `desc` 開頭與 `hook` 逐字相符、禁語 0。

## 三、⚠ 年份：這批改了 15 張——本線目前為止比例最高的一批

**策展層改 14 張**（a 組 6 張第 492 條、b 組 8 張第 501 條）、**研究層再改 1 張**（第 509b 條《Blue Lights, Volume 2》→ 1961）。

共同形狀仍是**資料庫把錄音年當發行年**，但這批抓到**兩個新形狀**：
1. **帶月日的 `first-release-date` 也可能是錄音日**（Paul Chambers 1957-05-19、Bennie Green 1958-03-23）
   ——**比無月日更會誤導，因為看起來像有出處。**
2. **目錄號順序與上市順序脫節**：BLP 1583《Curtis Fuller Volume 3》錄 1957-12、**出 1960-12**；
   BLP 4053《Light-Foot》錄 1958-12、**出 1961**。
3. **三張是日本首發的庫存盤**：《Two Bones》1980（King GXF 3064）、《Minor Move》1980（GXF 3072）——
   錄音年與首次商業發行差二十年以上，正文兩個年份要分開講。

**方法**：jazzdisco 的 Blue Note 目錄頁（逐號記出版年）在這一段是**廠牌目錄頁級來源**，
與維基引的 Billboard／Cash Box 新片欄互相獨立；研究層再以同期紙本覆核。
**兩份 jazzdisco 目錄已收進 `batch-progress/enum/jazzdisco-bn-1500.txt`／`jazzdisco-bn-4000.txt`。**

## 四、⚠ 研究層擋下／修正策展層七處（第 509f 條）

1. 《Further Explorations》《Here Comes Louis Smith》**店面實測只有 6 軌可播，就是原盤 6 軌完整對應**（第 508 條的「RVG 7 軌」不成立）。
2. 《Love for Sale》**us 店面回空，但 gb／jp 有官方條目 `724725669`**——本批唯一要換店面的一張。
3. 《Jazz Alive!》**Phil Woods 必須寫進正文**（只在後兩軌）——策展層當成「客座、無來源」是錯的。
4. 《Bottoms Up!》是**三場錄音**（1958-09-16／09-28／1959-02-11），不是一場。
5. 盤名《Light Foot》→ **《Light-Foot》**（第 509e 條，見下）。
6. 《Davis Cup》**是 8 張改判裡唯一沒有同期紙本的一張**；維持 1960（jazzdisco＋Schwann 1966 兩份目錄型來源）。
7. 《Here Comes Louis Smith》**錄音年兩說**（jazzdisco 1957 vs 維基 1958）——正文避開錄音年。

另推翻四則外部來源：**維基說《At the Jazz Corner of the World》兩卷都 1959 發行是錯的**
（Vol. 2／BLP 4016 的 Billboard 評論遲至 1960-11-14；本卡是 Vol. 1，1959 正確）；
維基《Blues in Trinity》技術表把 Van Gelder 列錄音師，與同條目「錄於倫敦 Decca Studios」自相矛盾（正文不寫）；
Billboard 1959-09-21 說《Great Jazz Standards》用「西岸樂手」與實際編制不符；
Billboard 1959-03-30 說《Off to the Races》是 Byrd「第一張領銜作」應寫成「他在 Blue Note 的第一張」。

## 五、⚠ 盤名改了一張：《Light Foot》→《Light-Foot》（第 509e 條）

原盤盤面、Discogs master 361255、Apple 條目、維基、**MB 自己的 2014 數位 release** 五邊都有連字號，
只有 MB 的 RG title 沒有。**這條線的舉證階序下盤面勝**，`queryAlias` 改放無連字號版，`rgMbid` 不動。
**為什麼在雲端就改**：上架後盤名進 `seed_cards.json`，雲端沒有權限改——**盤名要在上架前定。**

## 六、⚠ 同場拆盤與同名撞擊（本機組 manifest 時要知道）

- **同場拆盤四組**（第 495 條）：Blue Lights Vol. 1／2、Holiday for Skins Vol. 1／2、Orgy in Rhythm Vol. 1（Vol. 2 在 c-136）、
  Jimmy Smith at the Organ Vol. 2（Vol. 1 在 c-136）。**正文四組角度已分開，不得寫成同一張。**
- **Manhattan Towers 五張皆非現場**（延續 c-136 第 485 條）——**本組 live 0 張。**
- **同名撞擊三處**（第 496 條）：正文與試聽比對務必帶 BLP 號。
- 《At the Jazz Corner of the World》**Vol. 1／Vol. 2 在 MB 折在同一 RG，本批只收一張**（Vol. 1）。

## 七、缺的

- **封面缺 1 張**：Jimmy Smith《Jimmy Smith at the Organ, Volume 2》（CAA 無圖）。
- 試聽 39/39，**無來源 0 張**。
- ⚠ 《Love for Sale》的 `previews.json` 走的是 **gb 店面**（`724725669`，℗1998、6 軌，第 6 軌是 CD 加軌）
  ——**本機上傳時要知道那不是 us 店面。**

## 八、下一批

- **c-135（1945–55 十吋盤）**鉤子層已交、寫作層在跑；**c-138（1959–63）**研究兩組已交、鉤子層在跑；
  **c-139** 研究 a 在跑；c-140／c-141 待派。
- **第 312 條**：資料庫標 Compilation 的正典（Miles Davis《Volume 1》BLP 1501、Navarro《Vol. 2》BLP 1532……）
  被列舉檔濾掉了，**1939–66 六批跑完要另開 §5.6 子批撈回。**
- **1961 年之後的年份舉證改用 Cash Box**（第 529 條）：Billboard 1961 的 PDF 幾乎沒有文字層。
  各掃描檔的**實際**涵蓋範圍看 `batch-progress/enum/SOURCES-billboard-cashbox.md`（**檔名會騙人**，第 533 條）。
