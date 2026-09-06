# c-105（K-pop 韓版里程碑＋K-indie 第二輪）：策展層裁定與未收清單

日期 2026-09-06。交件 `prop-a.json` 25 張／16 位、`prop-b.json` 20 張／10 位，合計 **45 張、26 位**。
`node batch-progress/c105/chk-prop.mjs` → **標記 0**（跨批去重掃 56 批、2,603 張卡，撞卡 0）。

---

## 1. 掛名取用順序：**① 池中已有該藝人 → 沿用池中寫法；② 池中沒有 → 取所釘 release-group 的 artist-credit**

派工信寫的是「掛名一律用諺文（빅뱅、소녀시대、크라잉넛、장기하와 얼굴들），
例外是團名本身就是拉丁字母註冊的（f(x)、H.O.T.、god、S.E.S、Fin.K.L、EXO、TWICE、NewJeans、
Red Velvet、SHINee、IU、BTS、2NE1、Parannoul）」。**實查 MB 之後，這份例外名單的邊界與實情不符**：

| 派工信說用諺文 | MB 藝人實體主名 | 所釘 RG 的 artist-credit | 池中現況 | 本批採用 |
|---|---|---|---|---|
| 빅뱅 | **BIGBANG** | BIGBANG | **BIGBANG（2 張）** | `BIGBANG` |
| 소녀시대 | **Girls’ Generation** | Girls’ Generation | **Girls' Generation（1 張）** | `Girls' Generation`（直撇號，同池中） |
| 크라잉넛 | **Crying Nut** | Crying Nut | 0 張 | `Crying Nut` |
| 검정치마 | 검정치마 | 檔內不一致（2011 諺文／2017 拉丁） | **The Black Skirts（1 張）** | `The Black Skirts` |
| （未列） 노브레인 | **No Brain** | No Brain | 0 張 | `No Brain` |
| （未列） 넬 | **NELL** | Nell | **NELL（1 張）** | `NELL` |
| （未列） 신화 | SHINHWA | **신화** | 0 張 | `신화` |
| （未列） god | **G.O.D** | G.O.D | 0 張 | `G.O.D` |
| （派工列為拉丁）Parannoul | **파란노을** | 파란노을 | **Parannoul（1 張）** | `Parannoul` |
| （派工列為拉丁）Deli Spice | **Deli Spice** | Deli Spice | **델리스파이스（1 張）** | `델리스파이스` |

**裁定：以上兩條取用順序，取代派工信的例外名單。**

理由三條，順序即權重：

1. **避免製造新的分裂鍵。** `audits/pool-artist-name-splits.md` 的 2026-09-06 續補開宗明義記了 24 組分裂
   與 86 個不合裁定的掛名，並明寫成因是「下一批只要有人用不同寫法提案，就會生出新的重複卡
   （`林強 Lim Giong` 就是這樣）」。若照派工信把 빅뱅／소녀시대 寫成諺文，本批當場就會生出
   **3 組新分裂、4 張新重複卡**，而且 `chk-prop` 的撞卡比對完全看不見。
2. **有先例。** 裁定第 6／70／120 條的共同判準是「掛名與盤名用 MB 實體的文字」；第 20 條補充
   「`artist:` 比對的是 artist-credit 字串不是實體名」。②取 artist-credit 是這兩條的直接合成。
3. **與派工信的意圖一致。** 派工信的例外條本來就是「團名本身以拉丁字母註冊者照原樣用拉丁」——
   BIGBANG／Girls' Generation／Crying Nut／No Brain／NELL／G.O.D **正是這一類**，
   派工信只是沒把它們列進例外名單。反過來 신화 的 artist-credit 是諺文，本批就照諺文寫，
   派工信要的效果並沒有被推翻。

**往下游要傳的兩件事：**
- `Girls' Generation` 取**直撇號**（同池中那張《Oh!》）。MB 用彎撇號 `Girls’ Generation`，已入 queryAlias。
  這與稽核型態二「撇號一律取彎撇號」相反，理由是那條規則是為了合併**已經分裂**的兩形；
  這裡池中只有一形，改成彎撇號等於自己造一組新分裂。
- `브로콜리 너마저` **中間有空格**（MB 實體與 artist-credit 皆如此），派工信寫的 `브로콜리너마저` 無空格。
  依裁定第 139 條這種差別會造出「查無此團」，兩種都已入 queryAlias。
  同理 `S.E.S.` 有結尾句點（派工信寫 `S.E.S`）。

## 2. **三組「池中與 MB 相反」的掛名，機器撞卡比對是瞎的——已逐張人工排除**

第 1 條的取用順序在這三組會造成一個副作用：卡單掛名與 MB 掛名不同，
所以 `chk-prop` 的 `artist|album` 鍵**永遠比不到池中那一張**。三組都已人工確認：

| 藝人 | 池中那張（不得再提案） | 本批提案 | 機器看得見嗎 |
|---|---|---|---|
| `델리스파이스`（MB：Deli Spice） | 《Deli Spice》1997 | 《Welcome to the DeliHouse》1999、《D》2001 | **看不見**，人工排除 |
| `The Black Skirts`（MB：검정치마） | 《201》2008 | 《Don't You Worry Baby (I'm Only Swimming)》2011、《TEAM BABY》2017 | **看不見**，人工排除 |
| `Parannoul`（MB：파란노을） | 《To See the Next Part of the Dream》2021 | 《Let's Walk on the Path of a Blue Cat》2020、《After the Magic》2023 | **看不見**，人工排除 |

**三組都應併入 `audits/pool-artist-name-splits.md`**（本機處理，雲端不動線上卡池）。
建議的正規形：三組都取**池中現行寫法**，理由同第 1 條①。

## 3. **Apple 的 `country=kr` 對 `search` 端點回 200 ＋ 0 筆——不是查無，是那個店面不供這個端點**

本批對 47 筆候選各打了一次 `search?...&country=kr`，**47 次全部 resultCount=0、HTTP 全 200、無任何錯誤訊息**。
對照組實測：同一個 `term=BTS` 查詢在 `us`／`jp`／`tw` 都回 3 筆，只有 `kr` 回 0。

**裁定：韓國線一律用 `us` 店面（K-pop 與 K-indie 的 Apple 目錄幾乎都在 us），`jp`／`tw` 備用，不要用 `kr`。**
`kr` 回 0 筆**不得記為「Apple 查無」**。

這是裁定第 28／98／116／163 條「假查無」家族的**第四種形狀**，而且是目前最安靜的一種：
前三種至少有 HTTP 狀態碼或截斷跡象，這一種回 200、回合法 JSON、`resultCount` 就是 0。
派工信（c-104 那格）預告過「自動配對會全滅，要走 collectionId 直查」——原因就在這裡。

**同時第 173 條又中兩次**：`search` 端點對 **BIGBANG《BIGBANG VOL.1 SINCE 2007》** 與
**H.O.T.《Wolf and Sheep》** 都回 0 筆，改打藝人頁目錄端點（`lookup?id=<artistId>&entity=album`）
才拿到 1330865135 與 1060461243；S.E.S. 的出道盤（1060481631）同樣只有目錄端點看得到。
三位藝人的目錄回傳量分別是 55／11／23 筆，**都沒有觸及 200 上限**，所以這不是截斷、是 search 端點本身漏碟。

## 4. `chk-prop.mjs` 補上 §5.5 `asia-mini-album` 分支（形狀照 c-97 的 electronic 分支）

從 c-102 複製過來的 `chk-prop.mjs` 只有 §5.6 合輯分支，
`releaseType: "EP"` ＋ 例外欄位會被判成「非合輯卻帶例外欄位」。已在 c105 這份補上：

- `EP`／`Single` ＋ `genreException`／`releaseTypeException` 為 `asia-mini-album`
  → 檢查 `exceptionReason` ≥12 字與 ≥2 個 HTTPS `exceptionEvidenceUrls`（門檻同 §5.6）。
- 其餘 `EP`／`Single`／`DJ-mix` → 判「非 Album 未走 §5.5 白名單」。

本批 6 張 EP 卡皆同時填 `genreException` 與 `releaseTypeException`（`fix-rgmbid.mjs:136` 兩個欄位都認，
`build-manifest.mjs:192` 亦然），確保下游任一支腳本都擋不掉。

## 5. 走 `asia-mini-album` 白名單的 **6 張**，逐張理由摘要

全部在 a 組，全部 `primary-type=EP`、全部有 KR Official 實體 release、
`exceptionEvidenceUrls` 一律「英文維基專條 ＋ MB release-group 頁」兩個 HTTPS（皆實測 200）。

| # | 卡 | 這一張為什麼是核心經典（摘要，卡上寫的是完整版、逐張不同） |
|---|---|---|
| 1 | BIGBANG《ALWAYS》2007 | 該團從編號單曲時期轉向自製曲路線的節點；MB 獨立 RG、兩筆 KR Official 實體盤（YG，YDCD-795），不是單曲附錄 |
| 2 | Girls' Generation《Gee》2009 | 2009 年韓國女團市場的分水嶺；流通含 KR 兩筆 Official 加 CN 一筆，規模與正規盤同級 |
| 3 | 2NE1《2NE1 1st Mini Album》2009 | **判準是跨市場流通規模**——同一 RG 下 KR 3／JP 3／TH 2／PH 1 共十筆實體 release，本批迷你專輯裡最廣的一張 |
| 4 | SHINee《누난 너무 예뻐 (Replay)》2008 | **判準是時序**——它排在池中已有的《The SHINee World》之前，缺了它該團在池中就從第二步開始 |
| 5 | IU《CHAT-SHIRE》2015 | **判準是創作歸屬**——維基專條記載 IU 在本作包辦全部作詞並參與作曲，是目錄由企劃導向轉自製導向的分界；池中 2013／2017 兩張正好夾住它 |
| 6 | NewJeans《New Jeans》2022 | `ALBUM_ONBOARDING` §5.5 條文自己舉的例子《Get Up》的**前一張**；KR 十筆 Official 實體盤（ADOR，ADR0174）加 JP 兩筆 |

**六張的理由各自不同**（節點／市場分水嶺／流通規模／時序／創作歸屬／條文既有先例），沒有套同一句。

## 6. 「只釘韓版」執行結果

**45 張全部逐一回問 `release-group/<id>?fmt=json&inc=artist-credits+releases`，
45/45 轄下都有 KR 的 Official release**（其中 Fin.K.L《Blue Rain》《White》另各有一筆 KR Pseudo-Release、
BTS《BE》另有一筆 GB Bootleg、Parannoul《After the Magic》另有一筆 KR status 未填——三者都已在 `risk` 明令不採為背書）。

**釘住 MBID 的比例：45/45（100%）。本批不開 §1，也沒有用到。**

**45 張每一張都有「刻意不釘」段落**，共列 **195 個對照 MBID**（含跨卡重複計數），
全部照裁定第 162 條的固定寫法（`刻意不釘：<id>《盤名》（理由）、…`，
標記寫在 MBID 前面、一個標記帶多個 MBID，要釘的與不釘的不寫在同一句）。
段落內標明「日版」的 **54 處**、Live **16 處**、Repackage／改版 **5 處**
（EXO《LOVE SHOT – The 5th Album Repackage》、TWICE《Merry & Happy》等），
其餘為同系列編號盤、同名雙胞胎、精選與 EP。

**最值得下游注意的三個假陽性**（`fix-rgmbid` 過去三次都栽在這個形狀）：
- **TWICE《twicetagram》→《Merry & Happy》**（eed97a60，型別 Other）：本張的改版包裝，**盤名完全不同**，字串比對抓不到。
- **Parannoul《After the Magic》→《After the Night》**（b265f92d，同年 Live）：只差一個詞。
- **신화《신화》→《Shinhwa》**（dd0e9b73，2008）：同名別碟，相隔十年。

## 7. 未收清單

### 7a. MB 查無而不收：**0 筆**
26 位藝人在 MB 全部有建檔，所有候選都找到 KR Official release。**本批沒有 §1 候選要轉去 c-115。**

### 7b. Apple 兩個端點都查不到（仍收，封面走 CAA、固定試聽預期走無來源狀態）：**2 張**
依裁定第 173 條，`search` 與藝人頁目錄兩端都跑過、目錄回傳量未達 200 上限，才判「Apple 確實沒有」。
- **No Brain《청년폭도맹진가》1998→2000**（目錄 36 筆，無對應條目）
- **브로콜리 너마저《보편적인 노래》2008**（目錄 29 筆，無對應條目）

### 7c. CAA release-group 端點 404，封面改走 Apple collectionId：**2 張**
- **9와 숫자들《보물섬》2014** → Apple us 6770583221
- **언니네 이발관《꿈의 팝송》2002** → Apple us 1340071511

### 7d. 已完成回問與探測、但為守 45 張上限而未收（下一批可直接用，不必重查）
| 藝人 | 碟 | rgMbid | Apple us |
|---|---|---|---|
| 2NE1 | 《CRUSH》2014 | 16ff7f10-0809-41f8-be5a-343103acb92a | 887792618／1317764593 |
| f(x) | 《NU ABO》2010（EP，須走 asia-mini-album） | f8d98d87-9e28-431d-abfe-94656973f472 | 854928718 |
| Crying Nut | 《고물라디오》2002 | c0f53906-4818-3769-a594-662a01609bdf | — |
| No Brain | 《안녕, Mary Poppins》2003 | a9267fb7-ebd4-4f0f-8358-85b894e60a81 | 兩端點皆無 |
| No Brain | 《Never Mind The Sex Pistols, Here's The No Brain》2001 | b259c0ac-ec68-406e-a847-13223b2ede34 | — |

### 7e. 名單內、本批額度已滿而未收（骨幹已查完，留給後續）
BIGBANG《MADE》(2016，0d521add)、Girls' Generation《I GOT A BOY》(2013，2792f195)、
EXO《EXODUS》(2015，3d0798db)、SHINee《Don't Call Me》(2021，852adfdf)、
TWICE《Formula of Love: O+T=<3》(2021，378fe5ec)、IU《LILAC》(2021，bdeb7a5c)、
Red Velvet《The Red Summer》(2017 EP，75013bad)、H.O.T.《I yah!》(1999，fb4f8929)、
G.O.D《Chapter 5: Letter》(2002，d53eace6)、SHINHWA《Perfect Man》(2002，20d7da6b)、
Fin.K.L《Now》(2000，e7400092)、S.E.S.《Love》(1999，1a9568dc)。

### 7f. 主動換掉的兩張
- **NELL《Reflection of》(2001，8961c2e5) 與《Speechless》(2001，0926e688)**：
  MB 有、CAA 有，但 **Apple 兩個端點都沒有該團 2001 年的兩張碟**（目錄 41 筆、未達上限）。
  該團在池中只有 1 張，補深的目的用 2003《Let It Rain》(1645517169) 與 2008《Separation Anxiety》(1648914913)
  一樣達成，且兩張封面與試聽都齊。**《Reflection of》留在候選池，不是判它不夠格。**

## 8. 實掃後的池中現況（`seed_cards.json` 全 14,424 列，每位藝人以 2–5 種寫法比對）

本批 26 位藝人在池中共 **36 張**：
H.O.T. 1／S.E.S. 0／Fin.K.L 0／G.O.D 0／신화 0／BIGBANG 2／Girls' Generation 1／2NE1 1／
f(x) 3／SHINee 3／EXO 3／Red Velvet 3／BTS 6／IU 2／TWICE 4／NewJeans 1／
Crying Nut 0／No Brain 0／NELL 1／장기하와 얼굴들 1／브로콜리 너마저 0／The Black Skirts 1／
9와 숫자들 0／언니네 이발관 1／델리스파이스 1／Parannoul 1。

**26 位裡 9 位是 0 張**（S.E.S.、Fin.K.L、G.O.D、신화、Crying Nut、No Brain、브로콜리 너마저、9와 숫자들，
外加 H.O.T. 只有 1 張）。**兩塊最空的區段是 1996–2002 年的第一代偶像與弘大 punk**，
本批把這兩塊各補了 9 張與 4 張。

反過來，**2013 年之後的 K-pop 在池中已經不空**：BTS 6／TWICE 4／f(x) 3／SHINee 3／EXO 3／Red Velvet 3，
只是**日版與韓版混在一起數**——池中 BTS 的 6 張裡有 2 張是日版正規盤（《WAKE UP》《FACE YOURSELF》）、
TWICE 的 4 張裡有 2 張（《&TWICE》《Perfect World》）、Red Velvet 的 3 張裡有 1 張（《Bloom》）、
SHINee 的 3 張裡有 1 張（《Boys Meet U》）。**照「韓版正規盤」這條線重數，這六組其實只有 12 張、不是 22 張。**
本批補的全是韓版。
