# c-75 交接（2026-09-04）：美國黑人福音小廠二線 1957–80 共 37 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 REMOTE_RUNBOOK
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

深掘線（`lineType: 深掘`，`scene: 美國黑人福音小廠二線 1955–80`）。
**37 張、31 位藝人、零合輯、零 EP、曲風全 `soul`、年份 1957–1980、零跨批撞卡。**

| 組 | 場景 | 張數 |
|---|---|---:|
| a | 1957–72 四重唱與傳統群唱線 | 17 |
| b | 1972–80 合唱團與 soul gospel 線 | 20 |

**八家目標廠牌原本在池中全部 0 張，本批全部開口**：Peacock 5、Savoy 5、Jewel 4、
Sound of Gospel 4、Vee-Jay 3、Creed／Gospel Truth 3、Nashboro 2、Checker 2、
Birthright 1，另 Apollo／Andex／Westbound／HOB／Atlantic Religious Series／
Gospel Record Co. 各 1。

**藝人上限**：The Clark Sisters 池中已有 1 張＋本批 2＝**3，已達上限**，
其他並行批次不得再收；其餘 30 位皆 ≤2。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **21/37（57%）**，16 張要掃圖 | `c75/caa.json` |
| 2. 三軸與 rarity | **雲端未做**——照 §0.8 錨點制（第 89 條），`ratings.source` 記 `manual:depth-rubric` | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **37 張全部寫完並過機器 QA** | `desc-tools/batches/output/c75-out-{1,2}.json` |
| 5. 固定試聽 | **18/37 ready（49%）**，命中幾乎全在 `us` | `c75/previews.json` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

### 身分：37/37 釘住 release-group MBID、零人工身分卡
`fix-rgmbid` **修正 0**——策展層 37 張全部原本就對，是本輪唯一零修正的批次。

### 封面缺 16 張，要本機掃圖
**a 組 8 張**：Pilgrim Travelers《Look Up!》、Famous Ward Singers《Meeting Tonight》、
Highway QC's《Oh Lord I Pray》、Argo Singers《I'll Serve the Lord》、
Southwest Michigan State Choir《None but the Pure in Heart》、
Harmonizing Four《Shine on Me》、Rev. Julius Cheeks《Reverend Julius Cheeks Sings》、
East St. Louis Gospelettes《Shout for Joy》。
**b 組 8 張**：Carl Bean and Universal Love《All We Need Is Love》、
Napoleon Brown & The Southern Sisters《Yes, I Know the Man》、
Harmonizing Four《Working for the Lord》、Dorothy Norwood《He's a Friend》、
Twinkie Clark《Praise Belongs to God》、Morning Stars《I've Been Blessed…》、
Myrna Summers《Come to Jesus Now》、East St. Louis Gospelettes《Movin' On Up》。

### 試聽缺 19 張
**Carl Bean《All We Need Is Love》是 b 組唯一完全沒有數位版的一張**
（CAA 404 且 Apple 三個 storefront 皆無），notes 已**禁止行文提及串流**。

**三張年份漂移的逐張攤開查過曲目**，皆非二合一套裝、依第 77 條接受：
Pilgrim Travelers《Look Up!》Apple 是 2022 remaster（15 軌＝原盤 15 軌，
**但其 `releaseDate` 記 1985，禁引用**）；Harmonizing Four《Working for the Lord》
與 Dorothy Norwood《He's a Friend》是同名 CD 再發（10/10 與 8/8，逐首同曲名同曲長）。

## 三、研究層推翻策展層 17 處

**a 組 12 處**，最重要的三處：
1. **Ward《In a Gospel Concert》不得被寫成現場錄音**——策展層的 mbNote 寫
   「secondary-types 空」，實測 MB 是 `['Live']`；但 Discogs 兩版格式欄都沒有 Live、
   1973 重壓盤把 **Medallion Studios 掛成 Recorded At**。**「第二張現場型 LP」禁用**，
   note 另明令不得出現「現場／觀眾／台下」。
2. **Argo Singers 不是「芝加哥的、由 Willie Rogers 一家組成」**——Discogs 藝人條目
   記為「US female gospel group」、七位團員全女性，**無 Willie Rogers**
   （他是 Soul Stirrers 的人）；最早的唱片是密西西比 Trumpet Records、錄在 ACA。
   **且不得替這團指定城市。**
3. **Pilgrim Travelers 1936 年成立於德州休士頓**，1942 才遷洛杉磯（禁用「洛杉磯的」）。

另有：Roberta Martin 卡的 Kenwood **與 Nashboro 無隸屬關係**；
Jessy Dixon 與 Shirley Caesar 兩處時序斷言的維基段落**無行內引註**（第 80 條）；
Julius Cheeks「影響 David Ruffin、Wilson Pickett」、Gospelettes「Checker 的第一張 LP」、
Mattie Moss Clark「Westbound 福音出版品極少」三處**查無來源**；
Highway QC's「這張原盤 LP 反而少見」與 Argo「只在收藏市場流通」是第 109 條的稀有度。

**b 組 5 處**，其中**兩處是策展層自己認輸、但實際資料完整**：
- **The Crowns of Glory《God Save the Children》**與**The Morning Stars
  《I've Been Blessed…》**都被策展層標成「本批舉證最薄的一張、應改列未收」。
  **兩張都不成立**——Crowns of Glory 的原盤 credit 是 Motown 班底
  （吉他 Robert White、薩克斯風 Eli Fontaine、工程 Ken Sands），錄於 United Sound
  Systems；Morning Stars 有完整製作鏈（Mastersound Atlanta → Masterdisk → Hub-Servall）、
  逐首出版權歸屬、手刻與打刻並存的刻紋、主唱兼作者 Willie Johnson。
  **策展層只看廠牌與再發、沒開 credit 欄。**
- Williams Brothers 兩處（「以這張在 Savoy 出道」不成立、「Smithdale」查無來源，
  維基與 MB 都作 Jackson, Mississippi）。
- **Carl Bean「第一位公開出櫃的黑人福音歌手」**——三個來源沒有一個下這個最高級判斷。
- **Spirit of Love** 策展層預估「Apple 只有單曲、試聽 unavailable」——**已推翻**，
  Apple 有整張授權數位版（collectionId 1825692205，8 軌，℗ 2025 Birthright）。

## 四、第 135 條在這批出現**五次**——本批最大的品質風險

**hook 層抓到三處**：
- Carl Bean《All We Need Is Love》：「九首歌裡四首曲名有 Love」，逐項數只有**三首**。
  **同一張卡的 facts 還自相矛盾**（「Bean 唱 A1 到 B3 與 B5」與「B1 由 Romeo 唱」打架，
  `sound` 又寫成「八首＋兩首＝十首」但碟上只有九軌）。**該卡一律不寫任何軌數統計。**
- King James Version：「八首歌裡有五個不同的名字輪流站到前面」，逐項數 credit 是**六個**。
- Jessy Dixon：「十軌裡有兩軌是兩個人對唱」，facts 是**三軌**。

**寫作層再抓到兩處**：
- 《Shout for Joy》：「Oliver Sain 掛五首」，逐項數是**六首**（A1、A2、A3、A4、B1、B4）。
  **主線已把研究稿的 `sound` 欄一併改正並在 notes 註記**，免得本機再引用錯的數字。
- Spirit of Love：「B 面四首每首都超過五分鐘」，B4〈He's Alright〉正好 **5:00**，不是「超過」。

另攔下三處會寫錯的最高級與越界：Mattie Moss Clark 的〈A Building Not Made By Hand〉
6:32 是壓軸但**不是最長**（〈Joy!〉7:12）；King James Version 的「作者全部向外借」
超出 facts（只給 A 面四軌）；Harmonizing Four 的「十軌每首三分鐘上下」不成立（2:03、2:08）。

## 五、互斥條款——福音樂是全專案同調最強的一條線

**全批 37 張禁用**：
- **「從教會唱詩班出身」「牧師是誰」「家族樂團」這組同調三句。**
- 第 109 條的壓量與稀有度。
- **「身分成謎」「查無資料」這種修辭**——那是我們查不到，不是有來源說沒有（第 136 條）。

**a 組一線一卡**：Savoy 廠牌史＋Lubinsky→《In a Gospel Concert》｜Vee-Jay＋Sam Cooke→
《Oh Lord I Pray》｜Peacock＋Don Robey→《On Jesus' Program》｜Checker/Chess＋
Ralph Bass＋Oliver Sain→《Shout for Joy》｜Honest Jon's 2024 選輯→《Groovin' with Jesus》｜
Jewel＋Andre Williams＋United Sound→《Change Is Gonna Come》｜COGIC 州級合唱團體制→
《None but the Pure in Heart》｜Mattie Moss Clark 生平＋Westbound＋Clark 家族→
《Wonderful Grace of Jesus》｜Marion Williams→《Meeting Tonight》｜1998 郵票→
《Prayer Meeting》｜Gospel Record Co./Savoy 生產鏈→《Jessy Dixon…》｜
Atlantic Religious Series→《Shine on Me》｜「The Soul of…」系列→《The Soul of the Argo Singers》｜
HOB＝House of Beauty＋Bakermat 取樣→《Get Up My Brother》。

**b 組一線一卡**：Gospel Truth→Sons of Truth｜Peacock 1973 年賣給 ABC→Loving Sisters｜
Lee Young→King James Version｜Carl Bean 生平→Carl Bean｜Nappy Brown→Napoleon Brown｜
Clark 家族出身→Unworthy｜Sound of Gospel＋主導權交接→Count It All Joy｜
Motown 班底＋封套美術→Crowns of Glory｜Don Logan＋Masterfonics→Harmonizing Four｜
Savoy 1974 年後易手＋Fred Mendelsohn→Myrna Summers｜Nashboro 創辦史→Cleophus Robinson｜
Nashboro 下半場＋2008 年環球大火→Gospelettes｜Twinkie 個人身分→Praise Belongs to God｜
Dorothy Norwood 生平→He's a Friend。

**研究層讀完 a 組後刪掉 b 組 9 條 fact、改寫 12 張 notes**，避開八條 a 組已用掉的線
（Jewel 廠牌史、Oliver Sain＋Archway、Mattie 生平＋COGIC 職務、Peacock／Don Robey、
Savoy 創辦史、United Sound Systems 歷史、Westbound／〈You Brought the Sunshine〉、
Jessy Dixon 生平）。**在源頭刪掉 fact，比在下游禁止有效。**

## 六、同構骨架（第 131 條）

**a 組已用掉、b 組 20 張全面禁用的五個**：「唯一一張」（Julius Cheeks）、
「多年後被選輯挖出來」（Groovin' with Jesus）、「福音團員轉唱世俗／後來去了更紅的地方」
（On Jesus' Program）、「碟上的歌被後人取樣」（Get Up My Brother）、
**死亡敘事**（Oh Lord I Pray）。

**b 組 20 個骨架各不相同**：世俗名曲改寫成聖歌／像放克樂團的聖歌／某某是誰的親戚／
家族接棒／標籤與封面兩個廠牌名／為了跨出教會而做卻沒跨出去／這個人在別的音樂裡更有名／
唱片上出現不屬於教會的東西／交棒／看不見的班底比掛名的人有名／在家鄉做完最後一道手續／
團名裡被丟掉的那個字／一個人做完一整張碟／她在別人的舞台上唱過／從很遠的地方走過來／
很早就開始做這件事／掛名的人與動筆的人不是同一個／唱片本身印得亂七八糟／
掛名長到放不進搜尋框／唱片還在、母帶已經燒了。

**hook 層攤表後改掉四張**（三張「碟上有一首外來的歌」、一張「碟上的人是某名人的親屬」、
一張「曲名拼錯」、兩張都以「錄音」開頭）。
**寫作層 a 組攤表後改掉三處收尾撞形狀**（兩張「團＋年＋成軍於某城」、
兩張「廠牌名／廠牌創辦」），並把**七張都帶的「credit 欄空白」這句**拉開措辭
——那是本批最會同調的一句。

**37 條 hook 只有一條從廠牌名開場。**

## 七、一個陷阱：同批出現兩個「Napoleon Brown」，是兩個不同的人

卡 b7 的掛名是 Discogs artist 504845（**Nappy Brown**，R&B 歌手，ANV 印成 Napoleon Brown）；
卡 b15《Saved and Satisfied》的鋼琴是 artist 713315（為 Cleophus Robinson 伴奏數十年的
福音鋼琴手，約 1979 年過世）。**Discogs 自己做了消歧義。**
兩張卡的 hook、note 與 desc 都沒有把它們連起來，也沒有暗示有關聯。

## 八、年份

**a 組禁斷言三張**：Julius Cheeks 1970（**Discogs 原盤無年份、附註明寫 no date**，
1970 只有 MB 一個支點——改用碟上六首歌對應的 Peacock 45 編號年 3030/1964…3169/1969
當錨點）、Sunset Travelers 1965（MB 記 1964）、Ward《In a Gospel Concert》1962（Apple 記 1961）。

**b 組 20 張年份全部無分歧。** 兩張比卡單更精確、月日可寫：
**Harmonizing Four 1976 年 11 月**、**Cleophus Robinson 1979 年 7 月 9 日**。
**全批禁用 Apple 的 `releaseDate` 與 MB 的「01-01」佔位月日。**

**原盤軌數**：Ward《Meeting Tonight》原盤 **10 軌**、Apple 只有 **9 軌**（禁以 Apple 為準）；
**Sons of Truth 原盤 12 軌**（Apple 的 collection 欄位記 13，逐軌只列 12，**禁用 13**）；
**Morning Stars 原盤 8 軌**（Discogs 封底註記提到「A6」是該頁自己的內部矛盾，禁用）。

## 九、資料受限

**六個團查無任何傳記資料**（維基無條目、Discogs 藝人條目空白、Cross Rhythms 只有唱片列表）：
King James Version、Sons of Truth、The Crowns of Glory、The Morning Stars、
The Southern Sisters、Spirit of Love。
notes 已允許寫「掛名把城市寫進去了」這類觀察，**但明令禁用「身分成謎」這種修辭**。

**Argo Singers 兩張沒有任何維基條目、原盤無演奏掛名**，團體所在城市與領唱皆查無。
**Violinaires、Sunset Travelers、Gospelettes 原盤 credit 欄全空，無法寫編制。**
`globaldogproductions.info` 已成停放網域、無法用來補 Peacock LP 年份。

**授權背書**：兩組來源網域合計 12 個，全部 HTTPS，**第 133 條未動用**。

## 十、機器 QA

```
qa-batch.mjs research c75     37 張（full 37、thin 0）｜key 與卡單完全一致 ✓
qa-batch.mjs hooks c75        0 標記
chk-hook-crossgroup.mjs c75   37 張｜hook 加權 16–32｜note 311–350｜✓ 全部通過
qa-batch.mjs out c75          out-1 17 張 229–236｜out-2 20 張 218–235｜>260: 0｜合計 37 與卡單相符 ✓
qa-check-research.mjs         兩檔各 0 標記
fix-spacing.mjs               兩檔各待補 0
chk-prop.mjs                  37 張、31 位｜標記 0｜跨批撞卡 0
fix-rgmbid.mjs                37/37 原本就對，修正 0
```

## 十一、跨批去重

已過 `dedup-crossbatch.mjs`（覆蓋 27 批 1,373 張，另手跑全庫 1,618 張比對，撞卡 0）。
上傳前務必再對現行卡池跑一次 `dedup-vs-live.mjs`。

## 十二、這條線還有多少

**卡池這一側幾乎全空、本批一次補滿；真正的天花板在 MusicBrainz。**
策展層列出 **MB 釘不住、可進補遺批的 20 多個團／40 餘張原盤 LP**
——**Nashboro 一家在 Discogs 有 260 張 1955–81 LP，MB 只建了 4 筆**。
這條線還能再出一到兩批，**但只能走 §1 人工身分路線**（c-87 已證實可行）。
另有 11 筆因身分／年份／場景不合而剔除的，逐項理由寫在
`batch-progress/memory-entries/c75-curation.md`。
