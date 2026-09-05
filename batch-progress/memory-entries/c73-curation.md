## 2026-09-03 — dip-vinyl-shop — c-73 策展提案（深掘：日本 prog 私家版與小廠 1978–90）

- **改動摘要**：新增 `batch-progress/c73/prop-a.json`（21 張）與 `batch-progress/c73/prop-b.json`（20 張），
  合計 **41 張、23 位藝人**，零合輯，`lineType: 深掘`，`scene: 日本 prog 私家版與小廠 1978–90`。
  分組**照年份切**：a＝1978–86、b＝1987–90（簡報給的是「a＝1978–84／b＝1985–90」的例子，
  照那條切會變成 a 組 14 張、b 組 27 張，改在 1986／87 之間切才平衡）。
- **主要檔案**：`batch-progress/c73/prop-a.json`、`batch-progress/c73/prop-b.json`、
  `batch-progress/memory-entries/c73-curation.md`（本檔）。
- **驗證結果**：`node batch-progress/c73/chk-prop.mjs a b` → 41 張、23 位、**標記 0**、跨批撞卡 0。
  41 張全部釘住 release-group MBID 並**逐個回問 `release-group/<id>?inc=artist-credits+releases`**
  確認 `primary-type=Album`、artist-credit、first-release-date 與轄下 release 的國別／status（第 41 條）；
  每張的 `mbNote` 都寫明了**刻意不釘的對照組**（第 99／126 條）。
- **未做**（依 `REMOTE_RUNBOOK.md`，雲端不碰）：三軸與 rarity（應照 §0.8 錨點制、`manual:depth-rubric`）、
  頂點資格評估、封面下載、簡介、固定試聽寫入、Firestore／KV／`seed_cards.json`／`PROJECT_MEMORY.md`。

---

## 一、這批是什麼

**這塊在池中原本整片為零。** 實掃 `seed_cards.json` 全 13,913 列：Kenso、Ain Soph、美狂乱、
新月、Mr. Sirius、Outer Limits、Pageant、Gerard、Novela／ノヴェラ、Teru's Symphonia、
Vermilion Sands、Providence、Ataraxia、Bellaphon、Deja-Vu、Midas、Asturias、Terra Rosa、
Social Tension、Negasphere、Starless、夢幻／Mugen、難波弘之 **全部 0 張**。
唯一沾邊的是 `四人囃子`《一触即発》(1974) 一張與 `Far East Family Band`《Parallel World》(1976) 一張。

| 組 | 年份 | 內容 | 張數 |
|---|---|---|---|
| a | 1978–86 | 自主制作（KENSO 自家 Pam、夢幻 Not On Label、四人囃子 See･Saw）＋ King 系 Nexus 前期 | 21 |
| b | 1987–90 | Made in Japan Records 的 MIJ-10xx 黑膠系列 ＋ King 系 Crime 印記 | 20 |

三條廠牌主線都補齊了：

- **Nexus（King Records 的 prog 子廠牌，1980–）**：創業編號 GP 800（ノヴェラ）與 GP 801（Ain Soph）
  兩張全收，其後 K28P 系列收了 KENSO III、Gerard、テルズ・シンフォニア、Starless、美狂乱 ×2、
  ノヴェラ、Ain Soph、夢幻 共 12 張。
- **Made in Japan Records（1985–）**：MIJ-10xx 正規黑膠系列 1004／1005／1007／1009／1011／1012／
  1013／1014／1015／1016／1018LP／1020LP／1021LP／1022LP **十四號中收了十一張**
  （未收的 1001 與 1017 是 VA 合輯、1002／1003／1006／1008／1010 是 7 吋單曲）。
- **Crime（King 的後續 prog 印記，1988–）**：Asturias ×2、テルズ・シンフォニア ×2、KENSO、
  Pageant、Terra Rosa、Mr. Sirius、Providence 共 9 張。

另有三張是純自主制作：**夢幻《Sinfonia della Luna》**（1984，Discogs 廠牌欄就是 Not On Label、
編號只有 Luna 001）、**KENSO《Kenso II》**（1982，自家 Pam PAM-002）、
**Providence《And I'll Recite an Old Myth From...》**（1989，自主廠牌 B.S.P. Project B.S.P. 004）。

## 二、與 c-67 的實況相反：**MB 在這條線上建檔相當完整**

`c67/HANDOFF.md` 第二節記日本自主爵士小廠在 MB 上大量查無（Johnny's Disk 16 張只釘得住 5 張、
Aketa's Disk／Nadja／Union Jazz 共 19 張查無）。**日本 prog 這條線完全不是這樣**：
候選的 23 位藝人**在 MB 上全部有實體、全部釘得住 release-group**，本批 41 張零人工身分卡、
不需要開 §1。原因推測是這條線 1990 年代起持續有 King（Nexus／Crime）、Musea、Spalax、
Belle Antique、Altavoz、Arcàngelo 的授權再發，CD 化把目錄推進了資料庫。

**授權狀態逐筆實查（第 43／57／65／78 條）**：41 張的 Discogs master 版本頁全部看過，
**只有兩張出現 Unofficial**——
- **ノヴェラ《魅惑劇》**：台灣 Taiwan Nova Records 21-A 的無年份黑膠標 Unofficial Release。
- **Vermilion Sands《Water Blue》**：1999 年俄羅斯 G. & P. 的兩筆（Essential Music 000014 與
  Substantial Music 無編號）標 Unofficial Release。

兩張的 `risk` 都已寫明那幾筆**不得引為背書**，背書分別由 King 系再發與 Musea FGBG 4293. AR 承擔。
其餘 39 張零筆未授權。

## 三、未收清單（逐項記清楚，免得日後重查）

### 3.1 Apple 查無而不收的自我同名碟——只有一張，但是這批最可惜的一張

- **新月《新月》(1979, Zen ZEN-1009)**。MB 釘得住（release-group `cb1044ef-8708-37e3-b07e-58f9d23d89fc`，
  Album，轄下 6 個 release 全 Official，含 1989 年 Made in Japan Records 的 MHL-28001 黑膠與
  MHD-32001 CD、1994／2007／2010／2016 四次 Belle Antique 再發），Discogs master 441442 零筆 Unofficial，
  **資料完全齊全**。但**實測 Apple 的 `jp` 目錄查無**：用「新月 新月」「新月 遠い頌歌」「Shingetsu New Moon」
  三種字串都只回別的藝人的單曲。依簡報「自我同名的碟若 Apple 上查不到就不收」剔除。
  **要收的話只差固定試聽這一項**——本機若確認可走 `unavailable` 上架，這張隨時可以撿回來。

### 3.2 MB 上型別不符而不收

| 卡 | 症狀 |
|---|---|
| Terra Rosa《Terra Rosa》(1984)、《Terra Rosa Ⅱ》(1985) | MB `primary-type` 是 **Other**（前者另標 Demo），不符 §1；《Ⅱ》的羅馬數字還是全形 U+2161 |
| Providence《Tradition》(1986) | Album/**Demo** |
| Negasphere《Negasphere》(1982) | Album/**Live**，且自我同名 |
| KENSO《Music for Unknown Five Musicians》(1990) | Album/**Live**（且 KENSO 已收滿三張） |
| Outer Limits《Outer Mania》(1989)、Pageant《Indies Collection》(1988)、Ain Soph《Studio Live Tracks ’80s and ’05》 | Album/**Compilation** |
| Asturias《In Search of the Soul Trees Deluxe Edition -樹霊-》(2014) | `primary-type` **null**（同 c-65 第 118 條的形狀） |
| Gerard《夢の中の夢》(1985, Nexus K18P 569) | MB 標 Album，但 Discogs 的原盤條目標為 **12", Mini-Album**；不走 §5.5 硬收 |
| Pageant《仮面の笑顔》(1987) | 同上，2006 年 ALT-14 的 Discogs 條目標 **min**；且 Pageant 已收滿三張 |

### 3.3 盤名踩工具反模式而不收

- **Terra Rosa《刹那の甘露—SASE—》(1990)**：盤名含 **U+2014**（em dash），踩 `chk-prop.mjs`
  的非 ASCII 連字號反模式（c-50 踩過）。資料齊全（Crime K28P 738 系列、三次 Official 再發），
  **日後若處理了連字號正規化可以直接撿回**。同一形狀的還有
  **Providence《There Once Was a Night of “Choko‐Muro” – The Paradise》(1996)**（U+2010 與 U+2013 各一）。

### 3.4 年代不在窗內而不收（1978–90 之外）

Ars Nova（首張 1992）、Wappa Gappa（1996）、Marge Litch（1991）、Schéhérazade（MB 上最早只到 1992）、
Magdalena（1996）、魔璃鴉《Maria》(1991)、Negasphere《Negasphere 1985-1986》(1991 才編成的現場輯)、
Starless《Song of Silence》《WISH》(皆 1992)。
**Schéhérazade 特別記一筆**：這團 1980 年代的作品在 MB 上**一張都沒有**，MB 藝人實體
`9907e80e-4b83-4239-a453-0651359645ef` 名下最早的 release-group 是 1992 年的自我同名盤。

### 3.5 因藝人三張上限而割捨（資料齊全，要擴編可直接補、不必重查）

- **Outer Limits《Silver Apples of the Moon》(1989)**，RG `cebfb220-745d-3709-a5a1-0d91c601c9e7`。
- **KENSO《KENSO》(1981)**，RG `4d3a2b3f-6bdd-3e4f-b6ea-f0887632d8a8`（自我同名，另有 Apple 未查）。
- **ノヴェラ《イン・ザ・ナイト(星降る夜のおとぎ話)》(1980, Nexus K26P-30)**，RG
  `6d075cc9-6d6d-4b73-913c-da624d7299e7`——**未收的真正理由是盤名寫法未定**：MB 的 release
  標題作片假名帶括號副題，Discogs 的四筆 1980 年原盤條目**一律作英文「In The Night」**，
  兩邊字串完全不重疊，而「In the Night」又是極通用的字串。要收得先裁定取哪一種。
- **四人囃子《NEO-N》(1979)**，RG `640419b8-fd3a-42f9-b172-172188d71386`——MB 釘得住，
  但 Discogs 上找不到對應的 master（用 `Yonin Bayashi`／`Yoninbayashi`／`NEO-N` 都查無），
  再發史與壓片證據撐不起一段有內容的 `why`，本批不收。
- ノヴェラ 名下 1983 年後的《Harmagedon Story》《Brain Of Balance》《The Words》、
  Gerard 名下 1984 年的自我同名首作（Discogs 盤名作《Gerard》、MB 作《ジェラルド》）。

### 3.6 與池中撞卡而未收

**零筆。** 這是本批最特別的地方：23 位藝人在池中全部 0 張，41 個「掛名｜盤名」鍵零撞卡；
跨批比對 46 個其他批次的 `prop-*.json` 也是 0 撞卡、0 同藝人。
唯一有交集的是 `四人囃子`（池中 1 張《一触即発》＋本批 1 張《包》＝2 張，未達上限）。

**注意**：`dedup-crossbatch.mjs` 實際只掃 `desc-tools/batches/cards/c*-cards.json`，
**不掃 `prop-*.json`**（共用簡報第三節說它會掃 prop 檔，與程式碼不符）。
本批的跨批比對是另外手跑的，掃了 46 個 prop 檔。

## 四、身分與盤名的逐項裁定（都寫進了對應卡的 `mbNote`／`risk`）

1. **掛名一律取 MB 藝人實體的文字**（第 6／70／120 條）：漢字 4 位（四人囃子、難波弘之、美狂乱、夢幻）、
   片假名 2 位（ノヴェラ、テルズ・シンフォニア）、其餘 17 位拉丁。
   `queryAlias` 依第 25 條**只填外部服務實測認得的字串**——
   其中 6 個是**片假名**（ミスター・シリウス ×2、ジェラルド、スターレス、ページェント、プロビデンス、
   アストゥーリアス ×2），因為 Apple 的 `jp` 目錄把這幾個團掛成片假名；
   4 個是**羅馬拼音**（Yonin Bayashi、Hiroyuki Namba、Novela、Bi Kyo Ran、Mugen、Teru's Symphonia）。
   **Pageant 一團在 Apple 上有兩種掛名**（兩張掛 `Pageant`、一張掛 `ページェント`），`queryAlias` 逐張填。
2. **Pageant《La Mosaïque de la Rêverie》取 ï 不取 ä**：Discogs 的 1986 年原盤 MIJ-1005 與
   Apple（collectionId 811917960）都作正確法文 **Mosaïque**，1989 年 Crime 292E 2007 起的日本再發
   與 MB 的 release-group 標題才變成 **Mosäique**。這是第 117 條的**反向情形**——原盤正確、再發引入錯字，
   依第 6／50 條取原盤。
3. **KENSO 兩張取 Discogs 原盤的盤名**：MB 的 release-group 標題是《KENSO II》與**單獨一個「III」**，
   Discogs 的 Pam PAM-002 與 Nexus K28P-542 原盤條目作《Kenso II》《Kenso III》。
   依第 6 條取原盤寫法；第 91 條已定「RG 標題與卡片盤名不必相等」。
4. **KENSO《Sparta》取拉丁不取希臘文**：Discogs 原盤標題作「ἡ Σπάρτη = Sparta」，
   MB 與 Apple 都只取拉丁側。取拉丁，希臘文寫進 `risk` 供去重。
5. **Social Tension《It Reminds Me of Those Days》取 MB 的正確拼法**：Discogs 的 1990 年原盤條目
   （release 8300444）作「It Rem**ain**ds Me Of Those Days」。依第 117 條，錯字不是一種寫法。
6. **三張的年份與所釘 RG 脫鉤（第 95 條：rgMbid 是身分鍵不是年份來源）**：
   - **ノヴェラ《サンクチュアリ (聖域)》**：MB 記 1982，Discogs master 425142 與 Nexus K28P-332
     原盤條目記 **1983** → 卡單 1983。
   - **美狂乱《Parallax》**：MB 記 1984，Discogs master 261960 與兩筆 K28P-410 原盤條目記 1983，
     Apple（collectionId 1726149986）記 1983-11-21 → 卡單 **1983**（三份獨立來源）。
   - **Providence《And I'll Recite an Old Myth From...》**：MB 記 1990（那是 Crime KICP 10 的 CD），
     Discogs master 499375 與 B.S.P. Project B.S.P. 004 原盤條目記 **1989** → 卡單 1989。
   三張的 `risk` 都已依第 18／46 條註明**行文不得正面斷言發行年**。
   另 **夢幻《Sinfonia della Luna》** 的 1984（Not On Label 自壓）vs 1986（MIJ-1011）也已註明。
7. **五張的盤名在 MB 與 Discogs 之間跨語言**，`risk` 都寫出了三種寫法供下游去重（第 49 條）：
   レダと白鳥／Léda Et Le Cygne、過ぎ去りし王国の王女／The Princess of Kingdom Gone、
   エッグ・ザ・ユニヴァース／Egg the Universe、螺鈿幻想／La Mosaïque de la Rêverie、
   奈落の舞踏会／Abysmal Masquerade、夢の報酬／The Pay For Dreamer's Sin、虚実の城／Empty Lie, Empty Dream、
   妖精の森／A Story of Mysterious Forest、銀の翼／Silver Wings、少年の不思議な角笛／A Boy Playing…、
   ペール・ブルーの情景／The Scene of Pale Blue、ミスティームーン／Misty Moon、
   伝説を語りて／And I'll Recite an Old Myth From…。

## 五、封面與試聽預估（雲端實測）

- **CAA 封面 32/41（78%）**，探測錯誤 0，比 c-67 的 24/36（67%）好。
  **缺 9 張要本機掃圖**：難波弘之《Sense of Wonder》、ノヴェラ《サンクチュアリ (聖域)》、
  Outer Limits《A Boy Playing the Magical Bugle Horn》、Ataraxia《Adolescence of an Ancient Warrior》、
  Vermilion Sands《Water Blue》、テルズ・シンフォニア《エッグ・ザ・ユニヴァース》、
  Social Tension《Macbethia》、Terra Rosa《Honesty》、Social Tension《It Reminds Me of Those Days》。
- **Apple 命中 27/41（66%）**，比 c-67 的 13/36（36%）高一倍，**27 張全部落在 `jp` storefront、
  `us` 零命中**——與第 75 條一致：這條線的再發權從頭到尾在 King Records 與日本廠牌手上。
  27 個 collectionId 都已逐張寫進該卡的 `risk`，本機做固定試聽時可直接 lookup、不必重搜。
- **查無而預估 unavailable 的 14 張**：ノヴェラ ×2、Ain Soph ×2、Negasphere ×2、夢幻 ×3、
  テルズ・シンフォニア《Symphonia》、Ataraxia、Midas、Social Tension ×2。
  共同點是**沒有 2010 年代的數位再發**——Negasphere 兩張只有 2016 年 Arcàngelo 的 CD、
  夢幻《過ぎ去りし王国の王女》三十七年零再發、Social Tension 兩張只有原廠自己的黑膠加 CD。
- **四張的 Apple 條目要本機核版本**（第 77 條「Apple 記的是數位上架年」的形狀）：
  難波弘之《Sense of Wonder (+1)》（**加一曲版**，11 軌）、Pageant《Abysmal Masquerade》（Apple 記 2001、9 軌，
  2006 年 ALT-13 是加一曲版）、Terra Rosa《The Endless Basis》（Apple 記 1989、原盤 1987）、
  Bellaphon《Firefly》（Apple 記 1996 ＝ Musea 盤年份、原盤 1987）。
- **三張的 Apple 專輯名與卡片盤名在字串比對下完全不相等**，本機要靠 collectionId 而不是字串：
  美狂乱《美狂乱》→「BI KYO RAN」(1726146077)、KENSO《Kenso II》→「KENSO Ⅱ」全形 Ⅱ (1675295836)、
  KENSO《Kenso III》→「KENSO(Ⅲ)」(1675294812)、
  テルズ・シンフォニア《エッグ・ザ・ユニヴァース》→「EGG THE UNIVERSE」(1726146842)。

## 六、同調風險預警（給下游的 hook 層，第 58／131 條）

41 張全是「日本樂團在小廠或自家印記壓的 prog 盤、後來被 King／Musea 系統性復刻」的形狀，
同構骨架的風險與 c-67 同級。已看得出來的共同標籤，**每條只能給少數幾張**：

- **「Nexus／Crime 是 King Records 的 prog 子廠牌」**——12＋9 張都成立，建議只給 GP 800／GP 801
  那兩張（創業編號，講得出獨有因果）。
- **「Made in Japan Records 的 MIJ-10xx 系列」**——11 張都成立，建議只給 MIJ-1004（系列第一張正規 LP）
  與 MIJ-1022LP（系列最後一號）。
- **「法國 Musea／Spalax 把它帶進歐洲市場」**——14 張都成立，建議只給 Ataraxia
  （二十七年後才被 Musea 收進去）與 Vermilion Sands（Musea 那次是它唯一乾淨的背書）。
- **「原盤是自己壓的／廠牌欄是 Not On Label」**——建議只給夢幻《Sinfonia della Luna》。
- **「這個團名下只有一張碟」**——Ataraxia 與 Deja-Vu 都成立，兩張都可用（因果各自獨立）。
- **「掛名在 MB 上撞到好幾個不同的團」**——Ataraxia、Deja-Vu、Midas、Starless、Outer Limits、
  Pageant、Providence、Gerard 八張都成立，這是**背景資訊不是敘事素材**，建議一張都不寫進行文。

## 七、場景飽和度

**還很空，而且空的方式與 c-67 不同**：這條線在 MB 上建檔完整、再發史乾淨、41 張輕鬆就湊出來，
真正的限制是「同一藝人上限三張」——KENSO、Outer Limits、Pageant、ノヴェラ、夢幻、
テルズ・シンフォニア 六位已收滿，Ain Soph、美狂乱、Mr. Sirius、Negasphere、Terra Rosa、
Social Tension、Asturias 七位收到二張，**要再開一批得靠新藝人而不是補深**。
第 3.5 節那份「資料齊全、純因上限或盤名未定而割捨」的名單可直接取用，
另外 1991–96 年那一段（Ars Nova、Marge Litch、Wappa Gappa、Starless 後期、Providence 1996、
Teru's Symphonia 1991–97、Midas 1996）是完整的一批量，只是超出本批的年份窗。
