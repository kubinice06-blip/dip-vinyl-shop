# c-SEA 主線裁定（2026-08-31）

研究層與 hook 層提出、需要主線決定的項目。**逐條裁定，不留「待議」。**

## 1. 廠牌欄七筆更正，全數採用研究層的值

見 `apply-label-fixes.mjs`（已 `--write` 套用到七個批次卡單，冪等）。

| 卡 | 原值 | 改為 |
|---|---|---|
| Kembara《Kembara》 | WEA | Polygram |
| Koes Plus《Volume 2》 | Melody Records | Mesra |
| Dara Puspita《A Go Go》 | Mesra Records | El Shinta Records |
| Banyuhay《Tayo'y Mga Pinoy》 | Vicor | Dyna Records |
| Fariz RM《Sakura》 | （空） | Akurama Records |
| Sheila Majid《Emosi》 | Roslan Aziz Productions | EMI Music Malaysia |
| Elvy Sukaesih《Menghitung Bintang》 | （空） | Purnama Records |

**Koes Plus 與 Dara Puspita 兩筆是同一種錯**：策展層把該藝人**前一張**的廠牌
沿用到這一張。這個型態值得記住——同藝人連續作最容易在 label 欄出這種錯。

**Sheila Majid 那筆是欄位語意問題不是事實錯誤**：Roslan Aziz 是製作人兼出版者、
EMI 是發行商。`label` 欄取發行商，製作人寫進正文。

腳本會在卡單原值與預期不符時**拋錯停手**，不硬改——那代表卡單已被別處改過，
本腳本的前提不再成立。

## 2. 《Chế Linh 4: Xin yêu tôi bằng tình người》：年份維持 1974

研究層依 cdnhacviet 建議改成 1975 年 3 月，但那是**單一來源**，而卡單與
MusicBrainz 都作 1974。依 `research-base.md` 的交叉驗證條款，單一來源不足以
推翻兩個獨立來源。

**裁定：卡片年份維持 1974。** hook 層已把 note 寫成不釘月份的區間寫法
（「他在 1975 年之前完成的最後一卷」），那個處理正確，維持。

同理適用於另兩張越南卡的年份兩說（《Tiếng hát Chế Linh 1》1973／1974、
《Sơn Ca 6》1973／1974）：**維持卡單值**，正文寫時間區間不釘單一年份。

## 3. Rolling Stone Indonesia 150 大榜：可查證，cseaa 的處置過保守

cseaa 的派工詞要研究層把這個名次只寫進 notes，理由是「該榜的英文維基條目是
無清單的 stub」。cseab-a 的研究層**推翻了這一點**：印尼文維基的
〈150 Album Indonesia Terbaik〉有完整 150 項逐名清單並註明出處為 2007 年 12 月
第 31 期，逐項覆核後四個名次全部命中。

**裁定：cseab／cseac 照研究層的做法，名次可寫進 facts 與正文。**

**cseaa 不回頭重跑。** 那批的研究與 hook 都已完成，為了補一個名次重跑兩層
不划算；受影響的只有 Ebiet G. Ade《Camellia I》一張，其 notes 已記下這個名次
與「查不到清單」的當時判斷，本機審稿時可自行決定要不要補進正文。
**這是資訊少了一項，不是寫錯。**

教訓記在這裡：**「英文維基是 stub」不等於「查不到」。** 這批的題材有一半以上
的主要來源是印尼文、越南文、泰文與他加祿文，用英文維基的覆蓋率判斷「有沒有
來源」會系統性低估。派工詞往後一律明寫「允許並鼓勵非英文來源」。

## 4. 《The Complete Crescendos》：走 §5.6 合輯例外

研究層判定是回顧性合輯、但有歷史定位值得保留。`ALBUM_ONBOARDING.md` §5.6
（2026-08-21 店主核定、全曲風開放）正是為這種卡設的。

**裁定：保留，走 §5.6。** 本機上架時要備妥 `releaseType: "Compilation"`、
≥12 字的 `exceptionReason` 與 ≥2 個 HTTPS `exceptionEvidenceUrls`。
hook 層已指派正文寫成「回顧性合輯」，正確。

同批其他合輯卡（cseab-b 三張、cseab-c 七張、cseab-d 一張、cseac-e 部分）
一律同辦。

## 5. 資料極薄的兩張：維持收錄，走短篇，不補空白

- **Waldjinah《Walang Kekek》(1968)**：專輯層級資料等於零——曲目表、首發日、
  專輯廠牌全查不到。研究層**沒有編廠牌**，並明寫「不得寫成這張 LP 由 Elshinta
  發行」。這個處置完全正確。
- **Chaweewan Dumnern《Mo Lam Singing of Northeast Thailand》(1991)**：
  `keyTracks` 全空，因為找不到 KICC 5123 的可開啟曲目表。研究層**沒有拿別張
  合輯的曲目充數**。同樣正確。

**裁定：兩張都維持收錄，寫作層走 120–180 字短篇。**

理由與 c-51 的 thin 卡裁定相反方向但同一原則（見 `batch-progress/c51/rulings.md`
第 2 條）：c-51 那七張標 thin 是「查無商業成績」但事實表很厚，所以維持
180–240；這兩張是**真的事實少**，那正是 `writer-base` 短篇條款設想的情況。
**同一個 `thin` 字撐兩個意思的問題依舊存在**，本機要拆欄位時，這兩批各是一個
乾淨的樣本。

## 6. 《เวลคัมทูไทยแลนด์》：正文照來源寫「路線軟化」，不寫策展層的「諷刺」

curatorWhy 寫「觀光化景觀的諷刺／社會批判路線的另一支柱」，泰文維基說的是
前兩張遭封殺後刻意軟化調性、貼合觀光年。**兩者方向相反。**

**裁定：以來源為準。** hook 層已照來源寫成「路線軟化」，維持。

## 7. Thái Thanh《Sơn Ca 10》：派工詞指定的軸線落空，已換掉

我在派工詞裡指定寫「她與 Phạm Duy 曲目的關係」，但研究層查不到原卷 18 首的
曲目表，該卡 `keyTracks` 空。hook 層改用有來源的歌手側素材承載同一位置
（18 首獨唱／合唱交替、Ban hợp ca Thăng Long 三人編制、唱法特徵）。

**裁定：採 hook 層的替代方案。** 這是派工詞寫錯而不是產出有問題——
我指定了一條研究層驗不到的軸線，下游照規矩換掉，流程運作正常。

## 8. 三處「查不到就不寫」，全部支持

- VST《VST》：〈Rock Baby Rock〉確切收在 VST 2 還 VST 3 查不到 → 只寫「1979 年
  單曲、不在首作」。
- Grace Nono《Tao Music》：「Tao 在他加祿語是人」查不到來源 → 不寫。
  （這是我在派工詞裡寫的，研究層驗不到就不採用，正確。）
- Djanger Bali：第六位樂手 Kiboud Maulana 只有單一來源 → 不採用。

**這三筆都是我在派工詞裡給的假設被推翻。** 派工詞的特注是「指派與提問」不是
已查證的事實，這條 `research-base.md` 的方法論條款在這批確實生效了。

---

# 追加裁定（cseac 研究層交件後）

## 9. 廠牌再六筆，全數採用

`apply-label-fixes.mjs` 已擴充到十六筆（冪等）。cseac 這六筆：

| 卡 | 原值 | 改為 |
|---|---|---|
| Rien Djamain《Api Asmara》 | （空） | Hidayat |
| Wings《Belenggu Irama》 | Warner Music Malaysia | ASP (Antarctic Sound Production) |
| Yano《Yano》 | BMG Records Pilipinas | Alpha Records |
| Harry Roesli Gang《Philosophy Gang》 | （空） | Lion Records |
| Benny Soebardja《Gimme a Piece of Gut Rock》 | （空） | SM Recording |
| Abbhama《Alam Raya》 | （空） | Tala & Co Record |

**Yano 那筆與 Koes Plus／Dara Puspita 是第三個同型錯**，但方向相反：前兩筆是把
**前一張**的廠牌沿用過來，Yano 是把**後來的重發廠牌**（1998 BMG）當成首發廠牌。
兩個方向的錯都源自同一件事——策展層拿到的是「某處看到的廠牌」而不是「原盤的廠牌」。

## 10. Joey Ayala《Panganay ng Umaga》：卡片維持 1991，但正文要交代它是重發

研究層建議把年份從 1991 改成 1985，理由充分：1991／1992 是 WEA-Universal 的
重發，原始版是達沃 NGO「DEMS」少量製作的地下卡帶。

**但這張改不動，因為 §1 的 MBID 硬規則會被違反。** 我逐一查過 MB 上 Joey Ayala
名下的全部 release-group：**沒有 1985 年原盤的條目**，只有 1991 的兩筆
（`5bccaba9`、`83ea45e8`，互為重複）。卡片現在的三個值是自洽的——
year 1991 ＋ label WEA Philippines ＋ rgMbid 指向 1991 那個 group，
它誠實地描述了那個重發版。**只改年份會讓 1985 配上 WEA Philippines，反而不自洽。**

**裁定：卡片三值維持不動。改由 hook 層指派正文寫清楚**——這張最初是 1980 年代
中期獨立製作的卡帶，1992 年 WEA 三張齊發的重發才把它帶到大眾面前。
年份指的是卡片釘住的那個版本，作品的來歷寫在正文裡。

**留給本機的選項**：若願意去 MB 建 1985 年原盤的 release-group，這張就能改釘
原盤、年份改 1985、廠牌改 DEMS。那是比較好的終局，但不是雲端段能做的。

**順帶回報三組 MB 重複條目**（本機可考慮提報合併）：
Joey Ayala《Panganay ng Umaga》`5bccaba9`／`83ea45e8`、
《Magkabilaan》`ea22ae35`(1987)／`21903dea`(1991)、
Paradise Bangkok《Planet Lam》`1d391140`／`7cc6c3dc`。

## 11. Shark Move《Ghede Chokra's》年份維持 1970——這條已經裁過了

cseac-d 的研究層跨批提醒「Discogs 印尼原盤標 1973，c 組那張若沿用 1970 請覆核」。

**覆核結果：c 組的研究層已經查過而且查得更全。** 它的 `yearVerified` 記下了
三方分歧——1970（echoesanddust 與成軍年，兩份可開啟來源）、MusicBrainz 1971、
Discogs 與 Rolling Stone Indonesia 1973——並據此取 1970。d 組看到的是這個分歧的
一個分支，不是新證據。

**裁定：維持 1970。** 記在這裡是為了讓本機不要因為 d 組的提醒再開一輪。

## 12. 兩條「主線設想被推翻」值得記住

- **Bhaskara ↔ Indra Lesmana 查無關係**。我在派工詞裡把兩者連起來，印尼文維基
  的 Bhaskara 條目全文未提及他，1985 與 1986 兩份編制名單也沒有。真正與
  Lesmana 家族相關的是同組另一張 Rien Djamain《Api Asmara》的 Jack Lesmana。
- **Ian Antono 不是《Cermin》才加入 God Bless**，他 1974 年重建時就進團、1976 年
  首輯就是他彈的。我給三張 God Bless 劃的分工因此有一格站不住，研究層自行把
  《Cermin》改成「Jockie 出、Abadi Soesman 進＋路線前衛化＋最差銷量」，
  仍與另兩張不重疊。**下游自行修好分工並說明，這正是分層要的效果。**

## 13. Dick Lee《The Mad Chinaman》：我給的主軸被反向證據推翻

我在派工詞裡寫「這張在日本賣得比新加坡好，這個落差是本卡核心」。
研究層查到的反向證據較強：新加坡國家圖書館 BiblioAsia 明載本作在新加坡
**四個月內白金**；日本方面只有「得過獎」與 1990 年移居兩件事。

**裁定：以來源為準，主軸改用〈Rasa Sayang〉的 Singlish 禁播爭議與同名曲的身分
困惑。** 這是我這批第四次派工詞的假設被推翻（另三次：Rolling Stone Indonesia
榜、Bhaskara、Ian Antono）。**四次都是下游查證後推翻主線，四次主線都採納。**

## 14. พุ่มพวง《ลำเพลิน พุ่มพวง ดวงจันทร์》：卡片改成 EM Records 2017 選輯

**這張不是廠牌寫錯，是卡片與它釘住的 MBID 描述的不是同一張唱片。**

卡單原記 year 1979、label「Asona Promotion（2017 年由 EM Records 復刻）」，
兩者皆不成立：泰文維基本傳明載她 **2525（1982）才進 อโซน่า**，這張不在該廠名下；
而釘住的 `430d1db9` 在 MB 上的 first-release-date 是 **2017-07-26**，
且研究層查出 **EM 那張不是 1979 原盤的復刻**——十軌裡三軌來自 2528（1985）的
《พุ่มพวง 85》。卡片宣稱 1979，釘住的卻是一張 2017 年、曲目橫跨兩張原盤的選輯。

我逐一 browse 了該藝人（`6b3c73bc`）名下全部六筆 release-group：
**MB 上沒有 1979 原盤的條目。** 所以改釘原盤這條路走不通。

**裁定：卡片改成誠實描述 EM Records 這張 2017 年選輯**——year 2017、
label EM Records、`releaseType: "Compilation"`、走 §5.6 合輯例外，
`exceptionReason` 與兩個 `exceptionEvidenceUrls` 已填（見 `fix-lamphloen.mjs`）。
1979 與 1985 兩張原盤的來歷由正文承載。

**⚠ MB 沒有把 `430d1db9` 標成 Compilation**（`secondary-types` 是空的），
所以 §5.6 的舉證要靠 `exceptionEvidenceUrls`，**不能指望驗證器從 MB 讀到**。

### 這是第二張同型的卡，值得記成一類

| 卡 | 症狀 | 處置 |
|---|---|---|
| Joey Ayala《Panganay ng Umaga》 | 釘 1991 重發，原盤 1985 不在 MB | **維持重發**（內容相同，只是版本晚） |
| พุ่มพวง《ลำเพลิน》 | 釘 2017 選輯，曲目橫跨兩張原盤 | **改成選輯 ＋ §5.6**（內容根本不同） |

**兩張的差別在「釘住的東西內容是否相同」**：Joey Ayala 那張的重發曲目就是原盤，
卡片描述的作品沒有跑掉；พุ่มพวง 這張的選輯有三成曲目來自另一張唱片，
再寫成「1979 年的那張專輯」就是錯的。

**留給本機的通則**：`mbFirstRelease` 與卡片 `year` 差距大的卡要當成**身分問題**
查，不能當成年份問題改。這批 254 張裡這樣的有兩張，都在 c-SEA。
差距大而**無害**的情況也存在（The Mighty Diamonds《Deeper Roots》的 group
底下只掛 2002 再版，但那個 group 確實就是 1979 那張作品），所以不能只看數字，
要看**釘住的那個 group 的內容是不是同一張唱片**。

## 15. 兩筆泰國廠牌更正（累計十八筆）

| 卡 | 原值 | 改為 |
|---|---|---|
| พุ่มพวง《บ้านนอกในกรุง》 | Asona Promotion | Sake San Tape Records |
| Onuma Singsiri《สาวอิสานรอรัก》 | 不詳（1970 年代末泰國本地盤） | เอื้ออารีย์เจ้าเก่า |

《บ้านนอกในกรุง》的 rgMbid `6a10cb46` 在 MB 上就是 1980 年那筆，
**年份與身分都對得上，只有廠牌錯**——與上一條那張不同型，不必動身分。

## 16. Soman Loebis ＝ Soman Lubis？兩批之間唯一的實質交叉點

cseac 的 hook 層跨組讀稿時發現：**c 組 Shark Move 的鍵盤手 `Soman Loebis`
與 b 組 God Bless 的鍵盤手 `Soman Lubis` 極可能是同一人**——Loebis／Lubis
是印尼舊、新拼寫的同一個姓，兩人同樂器、同年代、同一個萬隆／雅加達場景。

這件事牽動 c 組研究稿裡**一條已被標為未採用的說法**：英文樂評稱 Shark Move
「1970 年底鍵盤手辭世導致樂團中止」。而 b 組的印尼文維基來源明載
**Soman Lubis 死於 1974 年 6 月**南雅加達 Pancoran 的交通事故（與 God Bless
鼓手 Fuad Hassan 同一場），樂團還以「Fuad Hasan 與 Soman Lubis 百日」
為題在 Taman Ismail Marzuki 演出、把棺材抬上舞台。

**若是同一人，那條英文說法就是把 1974 年的事故錯記成 1970 年。**

**裁定：兩張卡的成品不必改，因為它們沒有打架。** hook 層的處置正確——
Shark Move 那張只寫 gilanada 版的「成員各自散往別的樂團」（沒有採用那條英文
說法），God Bless 那張寫 1974 年 6 月。兩邊各自有來源、互不矛盾。

**留給本機**：這是 99 張裡唯一的跨批人物交叉點。若要確認同一人，
印尼文維基的 God Bless 條目是較強的一邊。**確認之後值得回頭在 Shark Move
那張補一句**——「同一位鍵盤手四年後死於車禍」是很好的素材，
但現在沒有可開啟的來源把兩個拼法連起來，所以這批不寫。

**這是拼寫變體的第四類。** 先前記過的三類是：領銜者 vs 領銜者＋Trio／Quartet、
只差大小寫（BOREDOMS／Boredoms）、彎引號 vs 直引號。
**第四類是同一語言的新舊正字法**（印尼文 1972 年拼寫改革：oe→u、dj→j、tj→c）。
這一類在東南亞卡池會反覆出現，本機做去重與 KV 鍵結時要留意——
`Djanger Bali`、`Koes Bersaudara`、`Waldjinah` 這些卡名本身就帶著舊拼寫。
