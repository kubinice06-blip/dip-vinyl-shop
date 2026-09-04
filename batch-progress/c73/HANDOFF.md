# c-73 交接（2026-09-04）：日本前衛搖滾自主／小廠 41 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 REMOTE_RUNBOOK
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

深掘線（`lineType: 深掘`，`scene: 日本前衛搖滾自主／小廠`）。
**41 張、23 位藝人、零合輯、零跨批撞卡。**

| 組 | 張數 |
|---|---:|
| a | 21 |
| b | 20 |

**藝人數比張數少很多是這批的特徵**——KENSO、Ain Soph、ノヴェラ、Outer Limits、
Mr. Sirius、Pageant、Negasphere、テルズ・シンフォニア、夢幻、Social Tension
這些團各收兩到三張。**同團多張是這批最大的同調風險**，三層都花了力氣在拆。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **32/41（78%）**，9 張要掃圖 | `c73/caa.json` |
| 2. 三軸與 rarity | **雲端未做**——照 §0.8 錨點制（第 89 條），`ratings.source` 記 `manual:depth-rubric` | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **41 張全部寫完並過機器 QA** | `desc-tools/batches/output/c73-out-{1,2}.json` |
| 5. 固定試聽 | **22/41 ready（54%）** | `c73/previews.json` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

### 身分：41/41 釘住 release-group MBID、零人工身分卡

### 封面缺 9 張，要本機掃圖
難波弘之《Sense of Wonder》、ノヴェラ《サンクチュアリ (聖域)》、
Outer Limits《A Boy Playing the Magical Bugle Horn》、
Ataraxia《Adolescence of an Ancient Warrior》、Vermilion Sands《Water Blue》、
テルズ・シンフォニア《エッグ・ザ・ユニヴァース》、Social Tension《Macbethia》、
Terra Rosa《Honesty》、Social Tension《It Reminds Me of Those Days》。

### 試聽缺 19 張（這批命中率最低，54%）
難波弘之《Sense of Wonder》、ノヴェラ《魅惑劇》《サンクチュアリ (聖域)》、
Ain Soph《A Story of Mysterious Forest》《Hat and Field》、美狂乱《美狂乱》、
Negasphere《Castle in the Air》《Disadvantage》、夢幻《Sinfonia della Luna》
《レダと白鳥》《過ぎ去りし王国の王女》、テルズ・シンフォニア《Symphonia》
《エッグ・ザ・ユニヴァース》、Starless《Silver Wings》、
Ataraxia《Adolescence of an Ancient Warrior》、Midas《Beyond the Clear Air》、
Social Tension《Macbethia》《It Reminds Me of Those Days》、
Providence《And I'll Recite an Old Myth From...》。

## 三、三層的攔截

### hook 層依第 130 條擋下兩處分派
- a 組《包》與《魅惑劇》的 notes 把「受某某影響」的比較句判給 Ain Soph《Hat and Field》，
  但**同批 KENSO《Kenso II》與 Ain Soph 兩張的 notes、以及派工信都判給 KENSO**
  ——依 facts 優先（只有 KENSO 有清水義央在 King Records 官網自撰內頁逐首點名），
  採 KENSO，**其餘 40 張零比較句**。
- b 組《The Scene of Pale Blue》的 notes 要求「先確認 a 組是否已用掉 Made in Japan 廠牌史」
  ——a 組已判給《Misty Moon》，**b 組全面停用**。

### 寫作層攔下四處「note 的區間歸納在邊界上錯」——**立為第 135 條**
- Negasphere《Disadvantage》：note 寫「A 面五首都在三到五分之間」，facts 的 A2 是 **5:05**。
- Pageant《La Mosaïque de la Rêverie》：note 與 researchNotes 都寫「六首全部四分半以上」，
  facts 的 B1 是 **4:28**。
- テルズ・シンフォニア《Symphonia》：note 寫「前四首在三分半到五分半之間」，
  facts 兩端**都出界**（3:29 與 5:31）。
- Ain Soph《A Story of Mysterious Forest》：「其餘三人**只**分到吉他、貝斯與鼓」
  ——credit 另有效果器、打擊與 crystal gong。

三處都改用 facts 的原始值行文（「從三分一秒到五分五秒」「六首最短的也有四分二十八秒」）。

### 寫作層另攔下的
- **Terra Rosa《Honesty》不寫「開場曲不到一分半」**——facts 只給毫秒（79333），
  換算成分秒是第 112 條的算術。改用「〈Evelyn〉是全碟最長的一軌」。
- **Pageant《The Pay For Dreamer's Sin》不寫「主唱包辦全碟詞曲」**——note 指派了，
  但同卡 `researchNotes` 明令不得重述（同團《Abysmal Masquerade》已用）。
- **Mr. Sirius《Barren Dream》的難波弘之 PFM 引用整段不寫**——卡層 note 指派了它，
  但派工信的跨組裁定是「b 組零比較句」（第 111 條的但書：主線獨有的資訊優先）。
- **Providence 的塚田円掛名照 facts 收緊**：note 寫「掛四首的詞曲」，
  facts 是「四首作詞＋兩首作曲與吉他手共掛」。
- **第 63 條（曲目只點 vs 敘述鏈）**：KENSO《Kenso II》、ノヴェラ《サンクチュアリ》、
  Starless、夢幻《レダと白鳥》四張的 note 敘述鏈點到「曲目只點」以外的曲名，
  一律以「曲目只點」為準。

### 主線裁定一處，三檔同步改——**立為第 136 條**
Social Tension《Macbethia》的 hook 原本是「黑膠**封套上**沒有印任何人彈什麼」，
但 facts 給的是「**Discogs 的黑膠條目** credit 只有四欄」。
**「條目上沒有」不等於「唱片上沒有」**（第 110 條的一步推論），
且 hook 必須是 desc 的開頭，寫作層只能跟著違規或跟 hook 裂開。
hook 改成「**黑膠這一版的 credit 只有四欄，全是幕後。**」，
`hooks`／`writer-input`／`out` 三檔同步。

## 四、互斥條款分派

**一線一卡**：Made in Japan 廠牌史→《Misty Moon》（a）；「受某某影響」的比較句→
KENSO《Kenso II》（a，全批唯一）；「B 面一首佔滿整面」→Outer Limits
《The Scene of Pale Blue》（b）；「兩處印的字差一個字」→Ataraxia（a）；
「只有兩個版本」的現況陳述→Negasphere《Castle in the Air》（a）；
Genesis 比較→Midas（b，全批唯一出現西方團名的正文，且出處在句首的具名引用）。

**全批禁用的套語，三層零出現**：
- **「和製キング・クリムゾン」「日本的 King Crimson」與任何「日本的某某西方樂團」的比附。**
- **「幻の名盤」與同義的稀有度說法。**
- 第 109 條的壓量與稀有度。**唯一的「一千張」在 KENSO《Kenso II》的 hook 裡**
  （卡層明文允許，來源逐字寫了）。

**hook 層自己擋掉的無來源敘述**：KENSO《Sparta》的 Lovecraft 關聯、
Mr. Sirius《Dirge》的 Terry Kath 與「沢村氏」職稱、難波弘之的手塚治虫／中島梓封面說、
ノヴェラ的デモテープコンテスト優勝、Ain Soph 的 1980 年 6 月出道。
Ain Soph〈A Canterbury Tale〉**只照曲名寫、不接坎特伯里典故**。
Terra Rosa《Honesty》的廠牌史出處是 Discogs 廠牌條目而非唱片公司自述，行文已相稱。

## 五、同構骨架（第 131 條）：兩層共處理 20 組

**hook 層 9 組**：五個「某某欄上寫著⋯」、三個「作曲全掛一人」、三個「錄音地點＋日期」、
兩個「只有兩個版本」、兩個「某樂器只出現在第 N 軌」、兩個「黑膠 vs CD」、
「一人低成本錄音器材」，另加兩則跨組讓渡（「B 面一首佔滿整面」讓給 b 組、
「兩處印的字差一個字」讓給 a 組）。

**寫作層 a 組 4 組**：6 張以曲長收尾、2 張第二句是「那首歌叫〈X〉。」的短句、
4 張第二句都以「Discogs 的條目⋯」起手、2 張以「五個人的 credit」名單收尾。
重排後結尾分屬 14 種。

**寫作層 b 組 4 組**：5 張都收在「原盤是⋯編號」（拆成 credit／文學典故／概念文案／曲長）、
2 張テルズ・シンフォニア列同一份五人 credit、2 張 Mr. Sirius 第二句都是「宮武和広的自述⋯」、
Asturias《Brilliant Streams》的客座樂器清單收尾與 a 組美狂乱《Parallax》開頭幾乎同構。

**算術一律不做（第 64／112 條）**：十七天、三十二年、二十七年全部未出現，
以原始日期／年份呈現；曲長逐秒照抄，未取概數。

## 六、機器 QA

```
qa-batch.mjs research c73     41 張｜key 與卡單完全一致 ✓
qa-batch.mjs hooks c73        0 標記
chk-hook-crossgroup.mjs c73   41 張｜hook 加權 14–36｜note 301–350｜✓ 全部通過
qa-batch.mjs out c73          out-1 21 張 211–237｜out-2 20 張 216–235｜>260: 0｜合計 41 與卡單相符 ✓
qa-check-research.mjs         兩檔各 0 標記
fix-spacing.mjs               兩檔各待補 0
chk-prop.mjs                  41 張｜標記 0｜跨批撞卡 0
```

## 七、跨批去重

已過 `dedup-crossbatch.mjs`。上傳前務必再對現行卡池跑一次 `dedup-vs-live.mjs`。
