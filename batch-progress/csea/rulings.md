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
