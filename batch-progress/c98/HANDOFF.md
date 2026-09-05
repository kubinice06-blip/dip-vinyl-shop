# c-98 交接（2026-09-05）：鄉村／美國民謠與歐洲拉美民謠目錄深度，44 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

店主 2026-09-05「接力做完十批」的一批。`lineType: 廣度`。

**44 張、32 位掛名、零 §1 人工身分、零跨批撞卡、44/44 釘住 release-group MBID。
年份 1945–1999。**

| 組 | 場景 | 張數 |
|---|---|---:|
| a | 鄉村與美國民謠目錄深度 | 23 |
| b | 歐洲與拉美民謠目錄深度 | 21 |

**逐位**：Hank Williams 3，Woody Guthrie／Pete Seeger／Tammy Wynette／Marty Robbins／
The Louvin Brothers／Flatt & Scruggs／Georges Brassens／Léo Ferré／Víctor Jara／Alan Stivell 各 2，其餘各 1。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **41/44（93%）** | `c98/caa.json`；缺的三張見第四節 |
| 2. 三軸與 rarity | **雲端未做**——照 §0.8 錨點制（第 89 條） | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **44 張全部寫完並過機器 QA** | `desc-tools/batches/output/c98-out-{1,2}.json` |
| 5. 固定試聽 | **38/44（86%）**，命中 `us 30｜fr 4｜gb 1｜cl 1｜es 1｜ie 1` | `batch-progress/probe/previews.json` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

**簡介的機器 QA**：`qa-batch.mjs out c98` 全過；`fix-spacing` 兩檔各跑一次、待補 0；
主線另跑一次性複驗——**44 張的 `desc` 開頭與 `hook` 逐字相符**、
out-1 216–235、out-2 173–237（thin 1 張 173）、**未具名出處 0 盞、本批七條硬禁令 0 命中**。

## 三、**探測層被推翻十六筆——這是十批裡最高的一批**

試聽 **26/44 → 38/44**，靠的全是研究層逐張打藝人頁 `lookup`（裁定 166）而不是相信 `search`。

**一張配到別的藝人**（`rulings.md` 第 1 條）：
Hank Williams《Ramblin' Man》原記 us 815502171——那是 **Hank Williams III（孫子）** 2014 年 Curb 的 8 軌碟。
`titleOk` 過得了（盤名完全相等）、`artistOk` 也過得了（`norm('Hank Williams')` 是
`norm('Hank Williams III')` 的子字串）。**兩道都不擋祖孫同名。**
**`artistOk` 的雙向子字串比對對 Jr./III/父子檔家族天生無效**——鄉村、藍調、拉丁三條線都有這種家族。

**十三張誤記 unavailable、全部救回**，落空的原因清一色是盤名變形：
Apple 只作《Sings》／`&` 對 `and`／單數對複數（Song vs **Songs** of Robbins）／
班底副標（with The Foggy Mountain Boys）／編號寫成尾綴「(N°2)」／
動詞在前（《Léo Ferré **chante** Verlaine et Rimbaud》）／三重變形（`&`＋Bonus Tracks Edition＋[2002 Remaster]）。

**兩張 ready 是錯配**：Yupanqui《Basta ya》us 那筆是 ℗2006 的 19 軌再編輯、**前八軌全屬別張碟**，
依 c-97 第 10 條屬「換了內容」，改回 unavailable；Chavela《La Llorona》改 es 257207298（11 軌 ℗1993）。

**十三筆全部以 `lookup?id=<collectionId>&entity=song` 覆核過曲目列攤得開且每軌有 previewUrl**
才寫進探測檔——這是 c-97 第 11 條要的那道獨立檢查。

**六張確認真的沒有**：Marty Robbins《Devil Woman》、Garth Brooks《The Chase》、
Yupanqui《Basta ya》、Inti-Illimani《Inti-Illimani 2》、Nic Jones《The Noah's Ark Trap》、
Ruhi Su《Pir Sultan Abdal》。

## 四、**《The Chieftains》把三道防線同時打敗**（`rulings.md` 第 8 條）

Apple 上這張叫**《The Chieftains 1》**，卡片叫《The Chieftains》。於是
`titleOk` 的 selfTitled 嚴格比對、第 168 條的卷號記號、第 77 條那族的數字殘餘——
**三道都是對的規則，三道都擋掉了正解。**

**「自我同名的首作」這個型態，探測層天生配不到，只能人工釘。**
往後排到系列首作（The Chieftains、Chicago、Led Zeppelin 這一類）直接預期要人工。

**順帶記兩個店面**：`cl`（智利）與 `ie`（愛爾蘭）都存在且回得出結果，
但**現行的 WLD／USB 店面組都沒有它們**——本批兩張正解各只在其中一個店面上。本批不改店面組。

## 五、三張缺封面

Louvin《My Baby's Gone》與 Dock Boggs：**CAA 真的沒有圖**——release-group 端點與
轄下所有 release（3 個／2 個）**逐一實測全部 404**，不是釘位問題。
Violeta Parra《Recordando a Chile》同樣三個 release 全 404，改走 §4 `apple-verified-collection`：
**cl 1647764240**，依裁定 134 同時供封面與試聽。

**這三張正好落在收尾要問店主的那個議題上**（放寬 §4 讓釘住 MBID 的卡也能用
`apple-verified-collection` 取封面）——**它們是這個放寬的實例，不是特例。**

## 六、策展層的時序／序數主張被攻破第六、七次

**a 組五處與來源相反**：Tammy Wynette《D-I-V-O-R-C-E》「第三張」實為**第四張**；
Odetta《One Grain of Sand》寫成 Vanguard 目錄的「入口」，維基明寫是**最後一張**；
Louvin《Nearer My God to Thee》寫「福音在前」，但《Tragic Songs》1956 **早於**本張 1957；
Dock Boggs「復出後的第一張」無來源；Garth Brooks《The Chase》「商業曲線的轉折點」
與首週 403,000 張、雙榜冠軍、RIAA 鑽石**相反**。

**b 組五處與來源相反**，其中一處是本批最嚴重的事實錯誤：
**José Afonso《Venham mais cinco》「收錄〈Grândola, Vila Morena〉」是假的**——
該曲 1971 年 10 月錄、收在《Cantigas do Maio》，**而那張池中已經有了**。
其餘：Inti-Illimani 2 是義大利的**第二張**流亡專輯；Malicorne《Le Bestiaire》是第**六**張；
Planxty **不是** Tara 的創業盤（首發是 Christy Moore《Prosperous》）；
Neşet Ertaş **1979–2003 住德國、2003 才回國**。

另擋下十六處無來源的最高級／序數與五處時序事實錯誤（Chavela 復出在**墨西哥城**不在西班牙、
Violeta Parra 那五首錄於 1964 **聖地牙哥**不在巴黎、Nic Jones 是**五張**不是六張、
Selda 只有 1984-04-24 **一次**入獄不是三度）。

**兩處時序主張查證通過**：Jara《Canto por travesura》「生前最後一張」（限定錄音室專輯）、
Neşet Ertaş「Türkmen／Abdal 傳統最後一位大家」（tr 維基原話）。

## 七、其他要本機知道的

**策展層 catno 錯三處，已更正**（`prop-a.json` 與卡單都改了）：
Louvin《My Baby's Gone》**T 1385**（原寫 T 1834）、Flatt & Scruggs《Hard Travelin'》
**CL 1951／CS 8751**（原寫 CL 2151／CS 8951，兩個都錯）、
Hank Williams《Luke the Drifter》是**十吋 E-203（1953）與十二吋 E-3267（1955）兩種規格**
（MB 把兩者混在一筆上，**Apple 那個 1953 不是年份漂移**）。

**軌數落差七張全部查清，沒有一張是二合一**（詳表在 `rulings.md` 第 4 條與第 7 條）。
其中三處成為簡介的硬禁令：NGDB 不得說「這張碟有 23 首」（原盤是 16 個索引點，五個本身是組曲）、
Pete Seeger Vol.1 的 28 軌不得寫「完整收錄」（〈Buffalo Gals〉被拿掉了）、
Quilapayún《La Fragua》一個軌數都不得引用（原盤雙 LP，MB 併軌計 21、Apple 拆開計 31）。

**兩處年份兩說**（The Chieftains 1963／1964、Ruhi Su 1972／1973）一律維持卡單值、
`yearVerified` 寫明幾說、行文不正面斷言（裁定 141）。

## 八、本機接手要做的

1. 三軸與 rarity（§0.8 錨點制）、頂點資格評估。
2. 44 張寫進 `seed_cards.json`、封面與試聽寫進 `album_overrides`、KV 與 Firestore 回讀。
   **三張缺 CAA 圖的走 §4 `apple-verified-collection`**（見第五節）。
3. 逐張審稿時對照 `desc-restyle/progress.json` 的**通論帳本**——雲端讀不到那個檔，
   只擋得住批內重複（`chk-hook-crossgroup` 44 張全過）。本批 44 種切入型態的清單見兩支 hook 代理的交件紀錄。
