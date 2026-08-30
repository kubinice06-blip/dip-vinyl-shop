# c-50 主線裁決

店主 2026-08-29 明講「全部都是你可以決定的事情⋯其他你都知道怎麼做 不用問我」，
以下由主線逕行裁定，逐條記明理由與可推翻的條件，本機審稿時可覆蓋。

## 1. Frank Zappa《Sheik Yerbouti》——留卡，但不得寫成純錄音室製作

派工前提是「本批全部正規錄音室專輯」，這張不完全符合：英文維基歸為
*live album with studio elements*，基本音軌多為 1977 年紐約 The Palladium 與
1978 年倫敦 Hammersmith Odeon 的現場，回錄音室大量疊錄；MusicBrainz 標
Album、無 secondary type，兩邊分類不一致。

留卡的理由：本批要排除的是**沒有創作增量的再包裝**（精選、雜牌重發、
現場重錄舊曲），而這張全是當時未發表的新作，也是 Zappa 銷量最高的唱片，
歷史定位明確。分類爭議屬於製作方法，不屬於身分造假。

代價寫進派工詞：hook 與 note 不得寫成純錄音室製作，正面用「現場骨架加
錄音室疊錄」這個事實。

## 2. Jackson Browne《Running on Empty》、Henry Mancini《Charade》——具名放行

兩張的 MB secondary type 分別是 Live 與 Soundtrack，被收斂器的型別檢查擋下。
查證後判定型別是**作品性質**而非配錯碟：前者本來就是巡演途中在舞台、旅館房間
與巴士上錄成的，那是這張唱片的創作前提；後者是電影配樂作曲家的原始配樂盤，
不是後製精選。

作法比照 `ALBUM_ONBOARDING.md` §5.6 對 Album+Compilation 的處理：
**逐張具名放行、不做整類開放**，理由寫進 `consolidate.mjs` 的 `ACCEPT_SECONDARY`
並帶進卡片 mbNote，讓下游看得到為什麼它帶著 Live／Soundtrack。

## 3. Willie Colón《Siembra》——卡池維持單藝人寫法

MB 掛名是「Willie Colón + Rubén Blades」。卡池的鍵結構就是單藝人，
改成雙掛名會動到鍵格式，影響遠超過一張卡。裁定維持 `Willie Colón`，
但在 hook／note 寫明 Rubén Blades 是共同掛名者而非客串，讓簡介不至於失真。

**不得寫「列入國家錄音登記名冊」**——LoC 名單頁回 403 無法查證，
搜尋結果顯示入選的 Fania 錄音是《Celia & Johnny》《Azúcar Pa' Ti》
與《Live at Yankee Stadium》，未見本作。

## 4. 年份不一致的三張——保留衝突、不在雲端定案

`Albert Ayler《Spiritual Unity》`（策展 1964／MB 1965）、
`Tito Puente《Puente Goes Jazz》`（1956／MB 1993，MB 那筆顯然是再版）、
`Blondie《Plastic Letters》`（1978／MB 1977，疑為英美版差）。

三張的 `yearNote` 都已寫明兩個數字與來源，不在雲端硬定。
沿用既有原則：**實體佐證（唱片編號、條碼）勝過條目敘述**，本機有碟面資料時以碟面為準。

## 5. Beyoncé《Dangerously in Love》發行日——採 6 月，不採 MB 的 3 月

MB release-group 標 2003-03-10，但該 RG 底下 20 筆 release 裡，3 月 10 日
只有兩筆無國別的條目，其餘最早是 2003-06-23（英、法）與 06-24（美、澳）。
判定 3 月那兩筆是誤登，採 6 月。這是**版本表勝過導言**原則的又一次適用。

## 6. Albert Ayler《Spiritual Unity》年份 1964 → 1965（2026-08-30 定案）

第 4 條原本把這張列為「保留衝突、不在雲端定案」，研究層補上的證據足以直接判：
錄音日 1964-07-10、首發是 1965 年 5 月的 ESP-1002。策展層填的 1964 是**錄音年**。

本批是正規專輯、規則是取原盤首發年（古典那批取錄音年是 c-48 另外的裁定，不適用），
所以改 1965，與 MB 的首發年一致。facts 把錄音年與發行年分開寫，兩個數字都保留得住。

同一批的 Tito Puente《Puente Goes Jazz》維持 1956：MB 的 1993 是 CD 再版年，
Discogs 有 1956 年 RCA Victor LPM-1312 美國原盤，這正是「實體佐證勝過條目敘述」。
Blondie《Plastic Letters》的 1978 與 1977 之爭仍未定案，維持第 4 條的處理。

## 7. 冨田勲《Firebird》：不是純 Stravinsky 專輯

策展理由說「卡池已有德布西與穆索斯基、缺這張史特拉汶斯基」，但 Discogs 原盤曲目
A 面是 Firebird Suite 四段、**B 面是德布西〈牧神的午後前奏曲〉與穆索斯基〈荒山之夜〉**，
作曲家其實重疊（曲目不同）。留卡，但寫作層不得寫成純 Stravinsky 專輯。
另：curatorWhy 說的「1970 年代連續入圍葛萊美」只查到 1974 年《Snowflakes Are Dancing》
的四項入圍，本作自身的入圍或得獎查無來源，成績略過。

## 8. Henry Mancini《Charade》：1963 年原盤是原作曲者本人的重錄版

研究層查出 1963 年原盤是 Mancini 帶樂團重新錄製的版本，不是電影裡使用的原始錄音
（完整電影版 2012 年才由 Intrada 發行）。依規則屬「重錄須主動標記」。

留卡：重錄者就是原作曲者本人，且原盤有 Billboard 流行專輯榜第 6 名的成績、
歷史定位明確。〈Charade〉是第 36 屆奧斯卡最佳原創歌曲**入圍未得獎**。
本張的 Soundtrack 型別放行見第 2 條。
