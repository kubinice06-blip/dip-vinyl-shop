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
