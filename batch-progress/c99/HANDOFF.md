# c-99 交接（2026-09-05）：非洲、加勒比、中東、南亞與拉丁目錄深度，45 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

店主 2026-09-05「接力做完十批」的一批。`lineType: 廣度`。

**45 張、26 位掛名、零 §1 人工身分、零跨批撞卡、45/45 釘住 release-group MBID。年份 1960–2017。**

| 組 | 場景 | 張數 |
|---|---|---:|
| a | 非洲與加勒比目錄深度 | 22 |
| b | 中東、南亞與拉丁目錄深度 | 23 |

**逐位**：Umm Kulthum 5，R.D. Burman 4，A.R. Rahman 3，
Franco & le TPOK Jazz／Tabu Ley Rochereau／Orchestra Baobab／King Tubby／U-Roy／Big Youth／
Shankar／Fania All-Stars／Juan Luis Guerra y 440／Juan Gabriel 各 2，其餘各 1。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **43/45（96%）** | `c99/caa.json`；缺的兩張見第四節 |
| 2. 三軸與 rarity | **雲端未做**——照 §0.8 錨點制（第 89 條） | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **45 張全部寫完並過機器 QA** | `desc-tools/batches/output/c99-out-{1,2}.json` |
| 5. 固定試聽 | **44/45（98%）**，命中 `us 38｜gb 3｜za 2｜fr 1` | `batch-progress/probe/previews.json` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

**簡介的機器 QA**：`qa-batch.mjs out c99` 全過；`fix-spacing` 兩檔各跑一次、待補 0；
主線另跑一次性複驗——**45 張的 `desc` 開頭與 `hook` 逐字相符**、
out-1 215–235、out-2 206–238、**未具名出處 0 盞、本批六條硬禁令 0 命中**。

## 三、**試聽 35/45 → 44/45：九張誤記 unavailable 全部救回**

研究層逐張打藝人頁 `lookup`（裁定 166），落空的原因清一色是盤名變形：

| 卡 | 正解 | 原因 |
|---|---|---|
| Franco《20ème…Volume 2》 | fr 981590446 | **三處變形同時發生**：拿掉「6 Juin」、破折號改冒號、Volume→Vol. |
| Ali Farka Touré & Toumani Diabaté《Ali and Toumani》 | us 1716601796 | Apple 作《Ali **&** Toumani》——**c-98 Pete Seeger 那筆的鏡像** |
| The Mighty Diamonds《Stand Up to Your Judgment》 | us 1734234201 | 英式拼法「Judg**e**ment」，**只差一個字母** |
| Dr Alimantado《Sons of Thunder》 | us 1251027239 | 1987 年 CD 化整張改名《Born for a Purpose (Aka Sons of Thunder)》 |
| Umm Kulthum《Amal Hayaty》 | us 922602673 | 羅馬轉寫作「Amal Hayate - Aroh Le Men」 |
| Umm Kulthum《Fakarouni》 | us 922813005 | 作「Fakarony (Remastered)」 |
| Umm Kulthum《Hazehi Laylaty》 | us 920509422 | 作「Hazehe Lailaty (Remastered)」 |
| A.R. Rahman《Slumdog Millionaire》 | us 1443884661 | 盤名過長，且 **Apple 的 artistName 是「Various Artists」——藝人閘必擋** |
| Fania All-Stars《Our Latin Thing》 | us 1465813337 | 全店只有 40 週年版，盤名帶副標 |

**五張 Umm Kulthum 的 `trackCount=1` 不是「只上架了一段」**——MB 那幾筆 CD 也都是單軌，時長逐秒或差幾秒相同。

**一張 ready 是錯配**：Yabby You《Beware Dub》原記 us 1891251455，那是
**「Yabby You aka Jesus Dread」**（同名次要實體）的 ℗2026 拼盤，原盤十軌缺〈Freedom〉、第一軌來自別張碟。
正解 us 1165105352。**這是 c-98 第 1 條的第二個實例**——`artistOk` 的雙向子字串比對擋不住
「本名＋後綴」的另一個實體（前次是 Hank Williams vs Hank Williams III）。

**一張真的沒有**：Franco《Mario 2》——十一個 Franco／OK Jazz 藝人實體的 fr 目錄（合計 277 筆）
＋us／gb＋曲名反查全空。**⚠ 陷阱**：us 389199096《Mario》的**第 4 軌就叫〈Mario 2〉**，
長度與原盤差七分鐘、混了兩張碟，**不得取用**。

## 四、兩張缺封面與一張固定試聽的取軌

Tabu Ley《Africa Worldwide》與 U-Roy《Rasta Ambassador》的 release-group 與轄下所有 release
**逐一實測全部 404**，不是釘位問題。兩張走 §4 `apple-verified-collection`，
依裁定 134 同時當試聽來源：us 1443763479、gb 724913612。
**又兩張落在「放寬 §4」那個待店主裁定的議題上。**

**A.R. Rahman《Taal》的固定試聽已人工改指〈Ishq Bina〉**（裁定 157 的形狀）：
Apple us 1536519242 十二軌曲名時長全對，**曲序卻是英文字母序**——
首軌是 2:51 的片頭器樂〈Beat Of Passion〉，原盤開場是〈Ishq Bina〉。**取首軌會取錯。**

## 五、一處年份改值

**Max Romeo《Reconstruction》1978 → 1977**（裁定 127 的直接適用）：
Discogs master 260014 的 17 個版本裡 **14 筆直記 1977**（英美加 Mango ILPS/MLPS 9503，含卡帶與八軌帶），
維基專屬條目與 Apple ℗1977 都是 1977；MB 只有一筆無佐證的 GB Mango 1978。
牙買加 Dynamic DY 3378 的 1978 是**晚一年的壓片**，不是另一說。`prop-a.json` 與卡單都已改。

**對照**：U-Roy《Rasta Ambassador》卡單 1977 **正確**——MB RG 的 1991-07-26 是資料庫缺 1977 黑膠 release 的結果。
**「MB 只有晚年的 release」不等於「有兩說」。**

另兩張維持卡單值、禁止斷言：《Kati Patang》（1970／1971，**en 維基自己內部矛盾**）、
《Siempre en mi mente》（1977／1978）。**Franco《20ème…Volume 2》的 1989 是 CD 年不是曲目年**
（原始是 1976 年 African 360.082/83 雙唱片的 C／D 兩面），行文已避開。

## 六、策展層的時序／序數主張被攻破第八次：34 處，其中 14 處與來源相反

a 組九處：Mario 2「上下集」、Hit the Road Jack「第一張自製」、
King Yellowman「首張專輯」（且「第一個簽美國大廠的 dancehall 藝人」是 **1981 簽約**不是 1984 發行）、
Sons of Thunder「第一張／Greensleeves 第一張」、Roots of Dub「Tubby 第一張 dub」、
Rasta Ambassador「Front Line 第一張」、Reconstruction 不得寫成成功敘事、
Africa Worldwide 不得寫「合輯」（Discogs 明寫 newly recorded）、Bad Man Possee 不得拿〈Police and Thieves〉背書。

b 組五處：**Amal Hayaty「與同年的《Enta Omri》」**（Enta Omri 是 1964、本曲 1965）、
**1942: A Love Story「過世前完成的最後一部」**（維基寫他**在音樂完成前就過世**）、
Vision「ECM 這條線上被最多爵士名單收錄」（那屬 1985 年的《Song for Everyone》）、
Siempre en mi mente「從新人變成主流歌手」（維基明寫這是**第十張**）、
Slumdog「第一次由美國大廠全球發行」（發行廠牌是 **M.I.A. 的 N.E.E.T.**）。

**查證通過、確實寫進去的**：Tribute to Ndiouga Dieng 三條、Ali and Toumani「生前最後一張」（Diabaté 原話）、
Isaiah「Front Line 首發」、Psalms for I「首張專輯」＋「獻給不識字、無法自己讀聖經的人」。

## 七、軌數、曲序與掛名——本批最需要本機注意的

**軌數與曲序偏差八處，全部維持配對但鎖原盤值**：Roots of Dub 12（Apple 14）、Shalom Dub 16（18）、
Rasta Ambassador 10（11）、**Psalms for I 10 且 Apple／維基曲序整個倒過來**、
**Sons of Thunder 10 且 Apple 曲序重排**、Bad Man Possee 原盤軌數 6／9 兩說、
Hit the Road Jack 兩面對調兩說、Mouhamadou Bamba 1980／1981 兩說。

**Kati Patang 18 軌不是二合一**，是 Saregama 2017「歌曲＋對白」版（**原盤 7 軌**）；
同型：Amar Prem 9／原盤 6、Yaadon Ki Baaraat 9／原盤 6。**這三張行文不得說「這張碟有 N 首歌」。**

**Latin-Soul-Rock 的錄音地點，Apple 與原盤相反**：Apple 八軌全標聖胡安，
但 1974 年 Fania SLP 00470 **原壓說明欄印的是「Recorded Live at Yankee Stadium, Aug. 24, 1973」**
＋紐約 Good Vibrations 錄音室，**只有〈Soul Makossa〉錄於聖胡安**。行文以原盤為準。

**掛名亂區**：Orchestra Baobab《Mouhamadou Bamba》在 MB／Discogs 掛
**「Baobab-Gouye-Gui de Dakar」**（與卡片字串零重疊、實體同一個）；**Yabby You 一張碟五種掛名**；
King Tubby 兩張的製作人（Bunny Lee）與掛名要分開；Junior Murvin 這張製作人是 **Mikey Dread**，
四邊 artist-credit 都沒把他掛進去；印度原聲帶的 artist-credit 在 MB 常是作曲家、Apple 常是群星。

## 八、本機接手要做的

1. 三軸與 rarity（§0.8 錨點制）、頂點資格評估。
2. 45 張寫進 `seed_cards.json`、封面與試聽寫進 `album_overrides`、KV 與 Firestore 回讀。
   **兩張缺 CAA 圖的走 §4 `apple-verified-collection`**（見第四節）；
   **《Taal》的固定試聽要用〈Ishq Bina〉那一軌，不是首軌。**
3. 逐張審稿時對照 `desc-restyle/progress.json` 的**通論帳本**——雲端讀不到那個檔，
   只擋得住批內重複（`chk-hook-crossgroup` 45 張全過）。本批 45 種切入型態的清單見兩支 hook 代理的交件紀錄。
