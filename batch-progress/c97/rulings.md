# c-97 電子目錄深度：策展層裁定（2026-09-05）

批次：`lineType: 廣度`，a 組＝house／techno／12 吋（19 張、12 位），
b 組＝氛圍／具象音樂／downtempo（25 張、11 位）。合計 44 張、23 位，`chk-prop` 標記 0。

以下九條依 c-53 裁定的三條判準（有先例／可逆／卡住整條線）在策展層自行定案，不上呈。

---

## 1. `c97/chk-prop.mjs` 加一條 §5.5 electronic 分支——不加就沒有一張白名單卡過得了

**問題**：c-97 拿到的 `chk-prop.mjs` 是未擴充的版本，它對 `releaseType` 的判斷只有兩支——
`Compilation` 走 §5.6 舉證，**其餘一律「非合輯卻帶例外欄位」報警**。
而本批的派工明文要求 §5.5 白名單卡要填 `exceptionReason` 與 `genreException: "electronic"`。
兩者直接打架：照派工寫，八張白名單卡會全部亮紅燈；照檢查器寫，等於把舉證拿掉。

**先例**：c-70 遇到同一個形狀（`asia-mini-album` 白名單），做法是**在該批自己的 `chk-prop.mjs`
加一支分支**，門檻與 §5.6 相同（`exceptionReason` ≥12 字、≥2 個 HTTPS 證據網址）。

**裁定：照 c-70 的形狀加一支 §5.5 electronic 分支**，條件是
`releaseType` 屬 `EP`／`Single`／`DJ-mix` **且** `genreException` 或 `releaseTypeException` 為 `electronic`；
不滿足白名單條件的非 Album 一律報「非 Album 未走 §5.5 白名單」。
只動 `batch-progress/c97/chk-prop.mjs`，不碰任何其他批次的檔案。

**可逆性**：改的是本批的檢查腳本，不是卡池結構；要退回只需刪掉那一支 `else if`。

**通則**：**檢查器沒有跟上規格時，缺的是檢查器不是規格。**
`ALBUM_ONBOARDING.md` §5.5 從 2026-07-22 就寫著 electronic 白名單，
但十九支 `chk-prop` 裡只有 c-70 那支認得白名單——認得的還是後來才加的另一種。
這與第 150 條是相反方向的同一個病：**那次是「派工信裡的一句話被當成規則」，
這次是「規格文件裡的一節沒有任何檢查器認得」。**

---

## 2. 八張 §5.5 白名單卡：逐張的「為什麼這一張是核心經典」

派工要求白名單是**白名單＋精選制**，不是通則。八張逐一列出採納理由的類型，
避免下游把它讀成「這批把 EP 都掃進來了」：

| 卡 | primary-type | 採納類型 |
|---|---|---|
| Rhythim Is Rhythim《Nude Photo》1987 | **Single** | Transmat MS-002，Derrick May 名下**不存在任何錄音室專輯**，12 吋就是作品單位 |
| Rhythim Is Rhythim《It Is What It Is》1988 | **EP** | 同上，Transmat MS-06 |
| Phuture《We Are Phuture》1988 | **EP** | Trax TX165，acid house 建立期文獻，該團 1994 年前無專輯 |
| Basic Channel《Phylyps Trak》1993 | **EP** | BC-02，dub techno 起點；這對人 1995 年前無專輯形態發行 |
| Frankie Knuckles presents Satoshi Tomiie《Tears》1989 | **Single** | FFRR FX 108，Knuckles 第一張專輯要到 1991 年 |
| Burial《South London Boroughs》2005 | **EP** | Hyperdub HDB001，**比池中已有的兩張專輯更早**，是那條線的第一格 |
| Burial《Antidawn》2022 | **EP** | Hyperdub 五十號目錄；43 分鐘單一連續作品，MB 依曲數而非長度標 EP |
| The Art of Noise《Into Battle with the Art of Noise》1983 | **EP** | ZTT 開張目錄 ZTIS 100，**池中已有的兩張專輯都在它之後** |

**共同判準**：**這一張要嘛早於池中已有的專輯、要嘛該藝人在那個時期根本沒有專輯形態**。
凡是「有專輯可收卻改收 EP」的候選一律不取——本批因此**沒有**收
Maurizio 的 M-4／M-4.5／M-5／M-6 任何一張（它們的曲目已在池中《Maurizio》1997 整編裡）、
沒有收 Burial 的《Kindred》《Rival Dealer》（曲目已在池中《Tunes 2011-2019》裡）。

`mbNote` 一律明寫 primary-type 是什麼，讓下游知道 Single／EP 不是漏檢。

---

## 3. 十四張 `primary-type=Album` ＋ `secondary-types` 含 Compilation／DJ-mix 的卡，不填例外欄位

本批的 DJ 混音輯與目錄整編（Derrick May《Mix-Up, Volume 5》、Basic Channel《BCD-2》、
Rhythm & Sound《Rhythm & Sound》《See Mi Yah》、Richie Hawtin 的兩張 DE9、
Frankie Knuckles《Choice》、Sasha & John Digweed 三張、Akufen《Fabric 17》、
Global Communication《Fabric 26》）**MB 的 primary-type 全部是 Album**。

依 §5.6 明文與 c-90 裁定第 3 條，**這些照一般 Album 寫法、`releaseType` 填 `Album`、
不填任何例外欄位**（填了會被 `chk-prop` 判「非合輯卻帶例外欄位」）。
本批 `releaseType: "Compilation"` 的卡**是零張**。

---

## 4. 一人多掛名：五組、十四個 MB 實體，每個都單獨掃過線上池

派工第 20 條要求每個化名單獨查撞卡。實際掃到的分裂比名單多：

| 這一組人 | MB 實體 | 池中原有 | 本批新收 |
|---|---|---|---|
| Derrick May | Derrick May `371c8525`／Rhythim Is Rhythim `159edf29`／Mayday `412a26ba` | 2 張 | 3 張 |
| Moritz von Oswald & Mark Ernestus | Basic Channel `d145a57e`／Maurizio `21a25e0c`／Rhythm & Sound `0bf220da`／Quadrant `05beea21`／Cyrus `d85fa024` | 3 張 | 4 張 |
| Richie Hawtin | Richie Hawtin `76da816f`／Plastikman `abee98f6`／F.U.S.E. `99c0c596`（另有 UP!、Xenon、Chrome） | 7 張 | 3 張 |
| Tom Middleton & Mark Pritchard | Global Communication `8179e236`／Reload `05d28260`／Jedi Knights `0517ab8f` | 2 張 | 2 張 |
| Marc Leclair | Akufen `a5b263e3`／The Stowaway `d90fcd5d` | 1 張 | 1 張 |

**裁定：新收的卡一律用 MB 實體的 artist-credit 文字**（`F.U.S.E.`、`Reload`、`Rhythim Is Rhythim`），
其他化名全部寫進 `queryAlias` 與 `risk`。
理由是第 149 條倖存的那一半——**別名要填的理由不是計數，是「查得到」**，
而封面／評分／試聽三條線都會拿掛名字串去打外部服務。

**Reload 另過一道第 29 條的檢查**：MB 有五個以上不同對象叫 Reload（德國另類搖滾、法國 nu metal、
house 二人組、美國饒舌），但**池中目前沒有任何叫 Reload 的藝人**，通行名未被佔用，可以直接用。

---

## 5. Frankie Knuckles《Tears》的掛名取合併 credit，不取「Frankie Knuckles」

MB 的 artist-credit 是「**Frankie Knuckles presents Satoshi Tomiie**」，
Discogs master 61791 與唱片標籤的印法一致，Robert Owens 主唱。
照通行名收會寫成「Frankie Knuckles」，與池中既有的三張同鍵。

**裁定：取合併 credit。** 先例是第 51 條（Pekka Streng & Tasavallan Presidentti）——
**MB 的 artist-credit 就是外界實際使用的掛名**，而這不是同一個人的 credit 變體
（第 11 條管的那種），是三個人的實際共同署名。
「Frankie Knuckles」與「Satoshi Tomiie」都進 `queryAlias`。

**代價已知**：Frankie Knuckles 在池中會有兩個藝人鍵（3 張＋2 張＋本卡 1 張）。
可逆——要合併只需改 `artist` 欄一個字串。

---

## 6. 三張盤名取「不是 MB release-group 標題」的那一個

第 91 條已經定過「rgMbid 是身分鍵，RG 標題與卡片盤名不必相等」。本批用到三次，形狀各不同：

1. **Throbbing Gristle《Heathen Earth》**：RG 標題「Heathen Earth: The Live Sound of TG」、
   Apple 作「Heathen Earth - The Live Sound of Throbbing Gristle (Remastered)」、
   1980 原盤封面只有「Heathen Earth」。**取原盤短名**（第 50 條）。
2. **Merzbow《Noisembryo》**：RG 標題「Noisembryo: Psycho‐Analytic Study of Coital Noise Posture」，
   **副標的連字號是 U+2010，會踩 `chk-prop` 的非 ASCII 連字號反模式**。取封面短名。
3. **Enya《The Celts》**：RG 標題是「Enya」（1986 BBC Records 原盤自我同名），
   1987 年起 XW／US 的 release 標題已作「The Celts」，Apple 條目也是 The Celts。
   **依第 45 條取再發名**——照原名收會同時踩自我同名卡的身分風險與串流端查不到兩個坑。

另有兩張是**把 U+2010 換成 ASCII 連字號**：Derrick May《Mix-Up, Volume 5》、Basic Channel《BCD-2》
（後者 MB 自己的 XW release 就已經是 ASCII）。U+2010 寫法全部進 `queryAlias`。

---

## 7. DE9 系列統一用冒號，不用 MB 與原盤的直線分隔號

MB 與 M_nus 原盤封面都作「**DE9 | Closer to the Edit**」「**DE9 | Transitions**」（直線分隔號 U+007C），
池中既有的第一張卡作「**DE9: Decks, EFX & 909**」（冒號）。

**裁定：新收兩張沿用冒號。** 兩個理由：
1. **不讓同一個系列在池中出現兩種分隔法**——這與第 52 條（團名採現行寫法）同一個方向：
   一個持續存在的系列，要的是一致的鍵。
2. **直線分隔號在檔名、URL 與多數比對管線是欄位分隔字元**，不宜入盤名；
   這與第 50 條「標點差異在搜尋端會被正規化」不同，`|` 不是被正規化，是被當成語法。

分隔號寫法進 `queryAlias`。改回去只需改 `album` 欄一個字元。

---

## 8. fabric 系列取《Fabric 17》《Fabric 26》，不取 MB 的「Fabric NN: 藝人名」

MB 的 release-group 標題把系列編號與藝人名串成一個字串
（「Fabric 17: Akufen」「Fabric 26: Global Communication」），
廠牌封面作小寫「fabric 17」，**目錄號卻是 Fabric33／FABRIC51**（系列編號與 catno 不同步）。

**裁定：卡片盤名取《Fabric 17》《Fabric 26》。** 先例是池中既有的
John Digweed《Global Underground 006: Sydney》——池子對這類系列輯已經採「系列名＋編號」。
藝人名不入盤名（它已經在 `artist` 欄），MB 的長標題與小寫寫法進 `queryAlias`。
**數字是這兩張唯一的分辨點，去重的任何一層都不能把它剝掉。**

---

## 9. Coldcut《Sound Mirrors》年份取 2006，不取 MB 的 2005

MB 的 `first-release-date` 記 **2005**，但回問 `inc=releases` 之後看清楚：
**轄下唯一一筆 2005 年份的 release 是 `GB／Promotion` 宣傳盤**，
最早的 Official 是 2006-01-25（JP，Beat Records BRC-142）與 2006-01-30（GB，Ninja Tune ZENCD 115）。

**裁定：年份填 2006。** 依第 95 條（`rgMbid` 是身分鍵，不是年份來源）與第 1 條
（年份記作品問世年）——**宣傳盤不是問世**，它是問世前的動作，
與第 30 條把「錄音年」與「問世年」分開是同一個分別。

這是第 12／84／86／95 條那條線的第五個實例，形狀是新的：
前四次是「MB 只建了重發那一筆」，**這次是「MB 建了原盤，但把宣傳盤也算進 first-release-date」**。
`first-release-date` 是 RG 底下所有 release 日期的最小值，**它不看 status**。

---

## 附：七筆「同一張碟、池中用另一種字串」——字串去重全部看不見

實掃時抓到七組，`chk-prop` 一筆都不會報，因為兩邊的字串真的不相等：

| MB 的寫法 | 池中的寫法 |
|---|---|
| Coldcut《Let Us Play!》 | Coldcut《Let Us Play》（無驚嘆號） |
| Burial《Tunes 2011 to 2019》 | Burial《Tunes 2011-2019》（to → 連字號） |
| Global Communication《Blood Music: Pentamerous Metamorphosis》 | Global Communication《Pentamerous Metamorphosis》（無前綴） |
| Parmegiani《De natura sonorum》 | Bernard Parmegiani《De Natura Sonorum》（大小寫） |
| Parmegiani《La création du monde》 | Bernard Parmegiani《La Création du monde》（大小寫） |
| Pierre Henry《Messe pour le temps présent et musiques concrètes》 | Pierre Henry《Messe pour le temps présent》（無後綴） |
| Throbbing Gristle《D.o.A. The Third and Final Report》 | Throbbing Gristle《D.o.A: The Third and Final Report》（句號 vs 冒號） |
| Richie Hawtin《Decks, EFX & 909》 | Richie Hawtin《DE9: Decks, EFX & 909》（池中多了系列前綴） |

**這七張本批全部沒有提案**——是策展層逐張比對 MB 目錄與池中清單時人眼擋下的，不是工具擋的。

**這是第 49 條的第五種形狀**：前四種是跨文字系統（羅馬拼音 vs 原文字），
**這一種是同一套文字系統內的標點、大小寫、前後綴差異**，
而且**方向是雙向的**——有時 MB 的長、有時池中的長。

`dedup-crossbatch.mjs` 與 `chk-prop` 的正規化已經用 `\p{L}\p{N}`，
它會處理掉大小寫與標點（前兩組、第四五七組），但**處理不掉前綴與後綴的有無**
（`Blood Music: ` `DE9: ` ` et musiques concrètes`）。
**這是現行去重管線的第二個結構性缺口**（第一個是第 49 條記的盤名羅馬拼音無處可放），
記在這裡，本批不改工具。

---

## （主線追加，2026-09-05）第 10 條：**「缺一段」與「換了內容」是兩回事** —— Messe de Liverpool 採用、Dedans dehors 不採用

研究層 b 組找到兩張 Apple 條目「對不太起來」的具象音樂盤，兩張的處置相反，理由在這裡：

| 卡 | Apple 那筆是什麼 | 裁定 |
|---|---|---|
| **Pierre Henry《Messe de Liverpool》** | fr 1452254000，**六段裡只有五段，缺〈Credo〉** | **採用**。缺的是**子集關係**——取到的那幾段確實出自本作。 |
| **Bernard Parmegiani《Dedans dehors》** | fr 1786647050，**只有標題曲對得上，A 面換成《L'Œil écoute》** | **不採用、維持 unavailable，collectionId 列黑名單。** 那不是子集，是**換了內容**。 |

**分界**：問「Apple 那一筆裡的東西，是不是全都出自本作？」
- **是，只是少了幾段** → 採用，但**該 collectionId 不得作為軌數、曲目或封面的來源**，封面走 CAA。
  （同形先例：This Heat《Repeat》只有一軌、Bone Thugs《The Art of War》被拆成兩張。）
- **不是，裡面混了別的作品** → 不採用。
  （同形先例：c-88 的《L'Avventura》配到 33 軌、曲名體系完全不同的另一版；
  c-95 的 Earl Hooker《Sweet Black Angel》配到 ℗2017 同名整編，11 軌沒一軌對得上。）

**這條要寫下來是因為「軌數對不上」本身不足以判斷**——
《Messe de Liverpool》與《Dedans dehors》的軌數都對不上，但一個能用、一個不能用。

## （主線追加）第 11 條：**gb 有條目不等於 gb 拿得到試聽** —— Burial《Antidawn》改回 jp

研究層正確地指出探測層在 gb 記的 `0→0` 是 search 漏碟，gb 確實有 1598131152。
**但那筆條目在 gb 與 de 都攤不出任何 song 列**（`lookup?entity=song` 只回得出 collection 那一列），
拿不到試聽——與同批《Tears》一模一樣的形狀。

**jp 1598321360 五軌全有 preview。** 依 c-53 那條
「同一張碟在不同 storefront 的試聽授權不一樣」，**試聽維持 jp，gb 那筆留作封面備援**。

**通則**：`search` 漏碟（第 166 條）與**條目存在但曲目未攤開**是兩個不同的問題，
補救方式也不同——前者換查法，後者換店面。**改店面之前要先確認新店面拿得到 previewUrl。**

## （主線追加）第 12 條：其餘三處兩說 —— 一律維持卡單值

- **Enya《The Celts》**：MB 的 release-group title 其實是「Enya」，《The Celts》是 1992 年的改名。
  **依第 45 條（改過名的碟取再發名），卡片盤名《The Celts》正確。**
  年份 MB 1986 vs 維基 1987-03 → **維持 1986**，兩說寫進 `yearVerified`。
- **Pierre Henry《Le Voyage》年份三說**（MB 1967／en-wiki 1967 芭蕾＋1968 專輯／fr-wiki 1962）
  → **維持卡單值**，**正文不得把年份與作品類型綁在一起**（芭蕾與專輯是兩件事）。
- **Coldcut《Sound Mirrors》**：MB 的 first-release-date 2005 來自宣傳盤，**卡單 2006 維持**。
- 另記一處資料面：**Enya《A Day Without Rain》的 MB 英版漏收〈The First of Autumn〉**，
  facts 已改採歐版 12 軌。
