# c-142 交接（2026-09-16）：Blue Note／Liberty 期 1968–71，39 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

Blue Note 目錄補齊線的第八批，**1967–84 這一段的第二批**。
Liberty／United Artists 期，**soul jazz／boogaloo／電風琴當道**，Francis Wolff 1971 年過世前的最後幾年。

**39 張、29 位掛名、零 §1 人工身分、39/39 釘住 release-group MBID、全部 Album。**

| 組 | 內容 | 張 |
|---|---|---:|
| a | 1968–70：The Three Sounds、Reuben Wilson、Jimmy Smith、Lou Donaldson、Blue Mitchell、Lee Morgan、Duke Pearson、Jack Wilson、Jean-Luc Ponty…… | 20 |
| b | 1969–71：Elvin Jones、Duke Pearson、Lee Morgan、Eddie Gale、Andrew Hill、Donald Byrd、Stanley Turrentine、Horace Silver、Jeremy Steig、Randy Brecker、Candido…… | 19 |

**原 slice 45 張，退 6**（理由逐筆在 `rulings.md`）。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 項目 | 狀態 |
|---|---|
| 身分（rgMbid 釘住） | **39/39，全部 pinned，零 §1 人工** |
| 三軸與頂點資格 | 卡單已帶，本機組 manifest 時照跑 |
| 固定簡介（desc） | **39/39 全 full**，out-1 221–238／out-2 222–240 |
| 封面 | **32/39**（缺 7，替代來源全部查好，見第六節） |
| 固定試聽／無來源狀態 | **34/39 有來源，5 張走固定無來源狀態** |
| §5.5／§5.6 例外欄位 | **不適用**——39 張全是純 Album |
| published gate | 本機端 |

**驗證**：`qa-batch out c142` 39 張與卡單相符、全部通過；hooks 兩支 QA 全過
（hook 加權 18–37.5、note 304–350）；`fix-spacing` 待補 0；research 兩組全 full。
**鉤子層發行年逐筆比對 39/39 相符。**

## 三、⚠ 年份：這批改了 16 張——1968–70 這一段是整條線偏移最嚴重的

**策展層改判 16 張**（a 12、b 4），**研究層兩組逐條獨立覆核全部成立**。

| 段 | 改判 |
|---|---|
| 1968→1969 | On Broadway／Plain Talk／Heaven on Earth／The Ultimate／Understanding |
| 1969→1970 | The Flip／The Prisoner／The Sixth Sense／King Kong／Soul Symphony／Accent on the Blues／Song for My Daughter／Poly-Currents／Multidirection／How Insensitive |
| 1970→1971 | Wayfaring Stranger |

⚠ **共同形狀：這一段 MB 與 jazzdisco 系統性提前一年——配好目錄號卻拖到隔年才上市。**
**下一批（c-143，1970–74）沒有這個形狀**（22 筆只改 1 張），**所以這是 1968–70 特有的，不是通則。**

⚠ **這批立下的判準（第 612 條）**：**廠牌的「檔期廣告」＞ 評論欄／新片欄 ＞ Discogs 原壓群 ＞ jazzdisco／MB 欄位**
——Billboard 1970-07-18 一整版「Liberty/UA, Inc. presents a solid Jazz program for July & August」
一次釘死好幾張。理由：檔期廣告是廠牌自己在**上市當月**掛的。

**研究層再往上補到「榜位」層級三張**（第 641 條）：《Soul Symphony》Billboard 爵士榜 1970-10-31 新進第 15；
《Fancy Free》爵士榜 13 週峰值第 7 ＋ Soul LP's 兩週；《Say It Loud!》爵士榜 21 週峰值第 4。
⚠ **其餘 36 張沒有榜位**——**正文一律不暗示暢銷**（第 645 條）。

**兩張疑議，維持卡單並在 `yearVerified` 寫明理由**：《Score》（紙本零命中）、
《Something To Listen To》（**第 631 條交代的改判條件查過、沒有**——「改判條件沒被滿足」本身有寫進去）。

## 四、⚠ 研究層擋下／訂正的

- **策展層三處**：《Moods》的改判被推翻回 1960；Witherspoon 的「Rip Records 1956 原錄」退成「據 Deffaa 的記載」；
  《The Ivory Hunters》的 Billboard 引用複驗不到、改引 1959-10-05 p46。
- **無出處的「最／第一／唯一」三句全擋**（Brookmeyer「唯一一張純鋼琴專輯」、《Horace-Scope》「Blue Note 最暢銷」、
  《Five Spot》的 Andy Summers 名言要具名）。
- **《Song for My Daughter》的目錄號是 BST 84328**——MB 登成 84238（那是《Mustang!》的號），
  Discogs 反查四筆與 Billboard 1970-02-14 都印 84328。
- **《Score》錄音地是 Van Gelder 不是 A&R Studios**；《Worth Waiting For...》在**洛杉磯**錄；
  **《Another Story》引軌長要用 Apple／維基**（MB 第 2 軌差 163 秒）；
  **《Roots & Herbs》兩軌曲名是〈The Back Sliders〉〈Look At The Birdie〉**（MB 登錯）。
- ⚠ **`Jack Wilson` 是美國爵士鋼琴家（1936–2007）**，MB 同字串實測 **17 個實體**；
  **英文維基的「Jack Wilson (pianist)」講的是 1907–2006 的英國樂團領班、不是本人。**

## 五、⚠ 這批立下的兩條方法通則（後批都在用）

1. **第 642 條**：**MB 取不到某個欄位時，先換一種端點組合再說「MB 沒有」**
   ——用 `release?release-group=<rg>&inc=media+labels+recordings+artist-credits` 瀏覽端點，
   策展層說「有軌數無軌序」的 5 張全部取得到完整軌序與軌長。
2. **第 646 條**：**合訂版可以當試聽來源，但兩張卡不得共用同一個 collectionId**
   ——《Multidirection》的內容確實在姊妹盤的二合一版本裡（第 7–12 軌逐軌相符），
   **但姊妹盤那張卡極可能已用同一個 id，共用會讓固定試聽指錯碟**，故不採信。

## 六、缺的

**封面缺 7 張，替代來源全部查好（本機上傳時用）**：
- **《That Healin' Feelin'》可直接取被退掉的重複 RG `cbd38639` → release `a0d32fd4` 的 front**（研究層驗過 200）
- Collision in Black → Discogs master 332288 系列（**沒有日本再發盤**）
- Soul Symphony → Discogs master 177750，或 **Apple `716184995` 的 artwork**
- Song for My Daughter → Discogs master 1041075，或 **Apple `1768828974` 的 artwork**
- Black Rhythm Happening／Worth Waiting For...／Something To Listen To → Discogs 原壓 `r1018259`／`r1188467`／`r17230279`

**試聽 34/39，5 張走固定無來源狀態**（都跑滿三種查法、明寫查無）：
Collision in Black、To Seek a New Home、Worth Waiting For...、Something To Listen To、Multidirection。

⚠ **《The Sixth Sense》的試聽是 9 軌 RVG 版，前 6 軌逐軌對應原盤**；
**《Roots & Herbs》已從探測層的 RVG 9 軌改採 6 軌原盤版 `1444212001`。**

## 七、下一批

- **c-135～c-142 已走完雲端段（共 306 張）**；c-143（1970–74）寫作層在跑、c-144（1974–79）策展 b 在跑、
  **c-147（§5.6 合輯正典，13 張）鉤子層在跑**。
- 紙本涵蓋表在 `batch-progress/enum/SOURCES-billboard-cashbox.md`——
  **Billboard 與 Cash Box 已覆蓋到 1979 年底**（c-144 兩組陸續補齊）。**開工看表不看檔名**（第 533 條）。
