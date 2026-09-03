# c-67 交接（2026-09-03）：日本自主爵士小廠 1975–88 共 36 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 REMOTE_RUNBOOK
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

**這是店主點名 Johnny's Disk 之後開的第一批。**

## 一、這批是什麼

深掘線（`lineType: 深掘`，`scene: 日本自主爵士小廠 1975–88`）。
**36 張、31 位藝人、零合輯、零跨批撞卡。**

| 組 | 內容 | 張數 |
|---|---|---|
| a | Johnny's Disk、Aketa's Disk、爵士喫茶自主盤、私家版 | 21 |
| b | Frasco 6、Union Jazz 1、Whynot 1、Nadja 1、Aketa's Disk 1、BBE J Jazz Masterclass 挖出的私壓 5 | 15 |

**Johnny's Disk** 是店主點名的形狀：岩手縣陸前高田的爵士喫茶「開運橋のジョニー」老闆
照井顕自己開的廠牌，1978–87 年出了 JD-01～JD-16 十幾張 LP，當年只在店裡與同好間流通，
2010 年代被 BBE 的《J Jazz》系列與 Studio Mule、Solid／Ultra-Vybe 的授權復刻挖出來。

## 二、**要給店主決定的一件事：Johnny's Disk 其餘 9 張 MB 查無**

**Johnny's Disk 在 MB 上只釘得住 5 張**（池中已有中山英二 2 張＋本批 3 張），
**其餘 9 張全數查無**——包括 Studio Mule 復刻過的園田まゆみ、キングコングパラダイス，
以及**三次再版、Apple 上有條目的三上寛・古澤良治郎《職業》**（最可惜的一張）。

同樣情形：**Aketa's Disk 5 張、Nadja 7 張、Union Jazz 6 張、Whynot 1 張** 也是 MB 查無。

**要補只能走 §1 人工身分路線**（`identitySource: manual`、`rgMbid` 留空、
需 `mbAbsenceProof` 的實際查詢紀錄與外部佐證）——c-64 的 b 組做過 8 張。
**這 20 批依共用簡報不自行開 §1，這是店主的決定。**

**其餘未收**：坂田明、安田南等 8 張因再發不足或形狀不符；池中撞卡或已達 3 張上限的
另有中山英二 2 張與明田川荘之、峰厚介、鈴木勲、今田勝、山本剛、富樫雅彦、高柳昌行。

## 三、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **24/36（67%）**，12 張要掃圖 | `c67/caa.json` |
| 2. 三軸與 rarity | **雲端未做**——照 §0.8 錨點制（第 89 條），`ratings.source` 記 `manual:depth-rubric` | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **36 張全部寫完並過機器 QA** | `desc-tools/batches/output/c67-out-{1,2}.json` |
| 5. 固定試聽 | **13/36 ready（36%）** | `c67/previews.json` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

### 身分：36/36 釘住 release-group MBID、零人工身分卡
`fix-rgmbid` 原本就對 35、修正 0；Yasuhiro Kohno Trio + 1《Peace》那筆這輪回問 MB 失敗，
**第 129 條的新防線生效、既有值保留不動**。

### 封面 24/36——這條線 CAA 建檔很薄
**缺 12 張要本機掃圖**：Yoshimi Ueno Bestrio《Live in Otsuchi》、明田川荘之《アローン・イン・徳山》、
明田川荘之トリオ《外はいい天気》、生活向上委員会《Live in Masuda》、Makoto Terashita《Topology》、
渋谷毅《Shibuyan》、吉沢元治《割れた鏡 または 化石の鳥》、武田和命《Gentle November》、
古沢良治郎カルテット《You Wanna Rain》、菅野邦彦《Opa! Brasil》、
Hideto Sasaki, Toshiyuki Sekine Quartet + 1《Stop Over》、早坂紗知 & Stir Up《Free Fight》。

### 試聽 13/36（36%）——這條線最低
`jp` 11、`us` 2。13 筆盤名全部相符，多為 2019–2026 的 Ultra-Vybe／BBE 數位再發。
**Frasco 的 UCCJ 再版未上數位平台**，那 6 張全數 unavailable。

## 四、研究層推翻策展層 7 處

1. **《Sea Sound》的上野好美是鼓手，不是薩克斯手**——Discogs 原盤、2010 Solid CD、
   Studio Mule 三份 credit 都列 Drums；**吹次中音的是清水靖晃**。
2. **《Live in Masuda》陣容裡沒有梅津和時與原田依幸**（實為松風鉱一 as／明田川荘之 p／
   山崎弘一 b／宮坂高史 ds），**錄音是 1976 年、1978 是發行年**。Jazz Tokyo 的松風訪談
   說明了紐約那張與益田這張的分別。
3. **《First Flight》的「バイソン片山」不是同名另一人**（diskunion 同一商品分類）。
4. **《Full Load》的「離開山下洋輔三重奏後的第一張領銜作」不成立**——Tower 商品頁寫
   「山下洋輔トリオ在籍時に制作された」，官方年表只把退團記在 1975 整年、錄音是同年 9 月。
5. **《Introducing…》的顫音琴手是藤井寛**，不是「藤井裕」。
6. **《Stop Over》的鋼琴手是関根敏行**，不是「関根敏幸」。
7. **《Gentle November》的「生前唯一領銜作」查無來源**；武田和命生平整段無可引用來源，全禁。

## 五、同調風險：這批處理了 14 組同構骨架（第 131 條）

36 張全是「日本樂手自己或小廠壓的爵士盤、後來被復刻」的形狀，**是這條線同調風險最高的一批**。

**hook 層依第 131 條改寫 8 組**：「只壓 N 張」×2、「同一首曲子在唱片上出現兩次」×2、
「地方爵士社團出的碟」×2、「整張只有一件樂器的獨奏」×2、「掛頭牌的其實是鼓手」×2、
「一面一首長篇」×3、「N 首裡 M 首同一人寫」群（4 張）、「編制裡缺鋼琴／和聲樂器」×2。

**寫作層交件前排讀 36 張，又自行處理 6 組**：「一面一首長篇」只留《Toh》、
「原盤沒標曲長、再發才逐首標出」只留《ピラニア》、「第一次做成 CD」只留《Toh》、
「首張領班作」只留《At the Room 427》、「編號第一號＋他就是廠牌的人」只留
《Aketa's Erotical…》、「credit 只有一件樂器／只有一行」只留《割れた鏡》。

**36 個 hook 開頭前四字全互異。**

## 六、依第 130 條擋下的分派（兩層都擋了同一張）

**《Aketa's Erotical Piano Solo & Grotesque Piano Trio》被分到「爵士喫茶老闆自己開廠牌」，
但該卡的 facts 撐不住**——只有「廠牌編號從 AD-1 起算」「他掛制作、企画」
「B2 錄於アケタの店」「官網 aketa.org」，**沒有任何一條說明田川荘之開了 Aketa's Disk 或アケタの店**。

hook 層改成 facts 撐得住的說法；寫作層再確認一次，連「錄音就在自己的店裡」都不寫，
只寫「B2 的三重奏是 3 月 31 日在アケタの店的現場」。

**同一條線的另一半《海を見ていたジョニー》有 Discogs 廠牌頁直接寫「由爵士喫茶老闆經營」**，
但寫作層判斷要接到「照井顕」這個名字需兩步推論，**整條線也沒寫**，改以店名典故與內頁執筆者收尾。

## 七、年份

**禁斷言發行年**：《Topology》（BBE 商品頁寫原盤 1983，壓片證據是 1984）、
《You Wanna Rain》（標籤印 1975、封底 1976）、《Opa! Brasil》（再發註記寫原盤 1979）。
**《割れた鏡》的 MB 日期其實是錄音日**（第 86 條的形狀）。
**錄音日分歧禁斷言**：《外はいい天気》（3/28 vs 3/29）、《幻想ノート》（12/9・11 vs 9/11）、
《ローマ・イン・ザ・レイン》。**錄音年查無**：《アローン・イン・徳山》《彗星パルティータ》。
**七張依第 95 條 rgMbid 只當身分鍵**（MB first-release-date 是再發年），原盤年由 Discogs 直記撐住。
《Kemo-Sabe》的 Discogs 發行日與錄音日同一天、不可信，只落錄音日。

## 八、資料受限與逐張禁令

**六組查無來源的背景一律禁寫**：武田和命生平、つのだひろ 的搖滾流行經歷、
Jimmy Hopps／Donald Bailey／Steve Jackson／Al Satterwhite 來歷、
Red Horison／Sea Horse／Mobys Record 三家廠牌沿革、《Full Load》兩位打擊樂手出身、
**《Opa! Brasil》伴奏的國籍（只有名字與錄音地，不得讀成「巴西樂手」）**。

**《Mort À Crédit》的盤名取自 Céline 小說這條只在無腳註的日文維基**，依第 80 條不收。
**《彗星パルティータ》原盤無曲名**，`keyTracks` 刻意留空、不得編造。
**一張 thin**（《Live in Otsuchi》）：無再發、無樂評、無廠牌沿革，只有 Discogs 單一條目與 MB 建檔。

## 九、機器 QA

```
qa-batch.mjs research c67   36 張（full 35、thin 1）｜key 與卡單完全一致 ✓
qa-batch.mjs hooks c67      0 標記
chk-hook-crossgroup.mjs c67 36 張｜hook 加權 18–35｜note 297–350｜✓ 全部通過
qa-batch.mjs out c67        out-1 21 張 214–238｜out-2 15 張 217–237｜合計 36 與卡單相符 ✓
qa-check-research.mjs       兩檔各 0 標記
fix-spacing.mjs             兩檔各待補 0
chk-prop.mjs                36 張、31 位｜標記 0｜跨批撞卡 0
```

**誤報要認得**：日文假名與漢字會被標「非拉丁亂碼」；**`会`（坂戸文化会館、株式会社、
十年ぶりに再会）與 `国`（国仲勝男、国立音楽大学、曲名〈もう一つの国〉）會被標「簡體字」**——
那是現代日文正規字形，**不要「修」**。

## 十、跨批去重

已過 `dedup-crossbatch.mjs`。上傳前務必再對現行卡池跑一次 `dedup-vs-live.mjs`。
