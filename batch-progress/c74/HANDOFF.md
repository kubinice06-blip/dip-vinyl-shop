# c-74 交接（2026-09-04）：英國 1980s indie pop 微廠 45 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 REMOTE_RUNBOOK
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

深掘線（`lineType: 深掘`，`scene: 英國 1980s indie pop 微廠`）。
**45 張、40 位藝人、兩張合輯（走 §5.6）、零跨批撞卡。**

| 組 | 場景 | 張數 |
|---|---|---|
| a | Sarah Records（Bristol，1987–95） | 22 |
| b | él／Creation／Ron Johnson／In Tape／Midnight Music／Pop Aural 等微廠 | 23 |

**a 組是單一廠牌的深挖**——22 張全部是 Sarah 目錄；b 組刻意打散成七八家微廠，
避免整批寫成同一部廠牌史。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **36/45（80%）**，9 張要掃圖 | `c74/caa.json` |
| 2. 三軸與 rarity | **雲端未做**——照 §0.8 錨點制（第 89 條），`ratings.source` 記 `manual:depth-rubric` | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **45 張全部寫完並過機器 QA** | `desc-tools/batches/output/c74-out-{1,2}.json` |
| 5. 固定試聽 | **33/45 ready（73%）**，全在 `gb` storefront | `c74/previews.json` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

### 身分：45/45 釘住 release-group MBID、零人工身分卡
`fix-rgmbid` 修正後全數對上。

**Marine Girls《Beach Party》的試聽依第 129 條剔除**——Apple 上那筆是
《Lazy Ways/Beach Party》31 軌的二合一套裝，不是原盤。

### 封面缺 9 張，要本機掃圖
Blueboy《If Wishes Were Horses》、Brighter《Laurel》、The Sweetest Ache《Jaguar》、
St. Christopher《Bacharach》、The Groove Farm《Alvin Is King!》、
Biff Bang Pow!《Pass the Paintbrush, Honey》、The Jasmine Minks《Another Age》、
Yeah Yeah Noh《Cutting the Heavenly Lawn of Greatness...》、The Wolfhounds《Bright and Guilty》。

### 試聽缺 12 張
The Field Mice《Skywriting》、Northern Picture Library《Alaska》、St. Christopher《Bacharach》、
The Flatmates《Love and Death》、The Chesterfields《Kettle》、The Pooh Sticks《Orgasm》、
The King of Luxembourg《Royal Bastard》、The Membranes《The Gift of Life》、
Momus《Tender Pervert》、Marine Girls《Beach Party》（見上）、
Yeah Yeah Noh《Cutting the Heavenly Lawn...》、Fire Engines《Lubricate Your Living Room》。

## 三、研究層推翻策展層 11 處

**a 組 7 處**：
1–3. **《Skywriting》《Jaguar》《Heavenly vs. Satan》都不是 10 吋**——三張都在
   SARAH 601–623 的十二吋系列，Discogs formats 無 `10"`；10 吋只有 SARAH 401–407。
4. **Northern Picture Library 的第三人是 Mark Dobson**，不是 Michael Hiscock。
5. **The Sea Urchins 是 West Bromwich**，不是 Birmingham。
6. **《Stardust》不含 Fierce 時期單曲、也沒有新錄音**（只收 Sarah 時期發行）。
7. Brighter 的〈Next Summer〉〈A Winter's Tale〉不在 Sarah 主線目錄，已剔除；
   「三人團」與第二位團員名字查無來源，**明令禁用**。
（另：Subway Organization 成立於 **1985** 不是 1986。）

**b 組 4 處**：
1. **Anthony Adverse 不是「Michael Hunt」**——《Guardian》2015（Caroline Sullivan）
   明寫是演員 **Julia Gilbert**，為這張碟改名；盤名出處是 1948 年 Powell & Pressburger
   的電影（唱片內註「Dedicated to Emeric Pressburger」），不是 1933 年小說。
2. **Ron Johnson Records 在 Long Eaton、經營者 Dave Parsons**，不是 Nottingham；
   編號是 ZRON1 不是 RON 1；「58 張出版品」查無來源。
3. **Midnight Music 的「Nick Ralph／Kent」查無來源**——有來源的只有
   「跟著 Pink 老闆到 September Records，September 演變成 Midnight Music」。
4. **In Tape 的「Jim Khambatta／Manchester」查無來源**，只能寫「Marc Riley 經營的廠牌」。

另擋下：Would-Be-Goods 兩位 Griffin 的「姊妹」關係、Marden Hill 的成員人數、
A Witness 的 Peel session 次數（策展層寫兩次、維基寫四次）。
並確認 Wolfhounds 卡的 `curatorWhy` 把本批 McCarthy 誤寫成《I Am a Wallet》。

## 四、互斥條款分派——廠牌史是這批最大的同調來源

**Sarah 廠牌史只給兩張，且切開**：
《Lyceum》＝**創辦端**（1987 Bristol、Wadd／Haynes、fanzine 出身、不做多規格、
1990 年《Melody Maker》引語）；
《The Decline and Fall of Heavenly》＝**收攤端**（SARAH 623 是十二吋系列最後一號、
SARAH 99 後主動結束、《There and Back Again Lane》、Thekla 派對、半版廣告）。
**其餘 20 張 Sarah 盤全部禁用廠牌史。**

**「被罵 twee／樂評敵意」只給 Brighter《Laurel》**（Wadd 與 Haynes《Between Hello
and Goodbye》自述、Clare Wadd 1991 年投書《Melody Maker》原句、《NME》2015-03-07
把 Sarah 排到史上第二）。

**John Peel 切成兩層**：a 組《Feral Pop Frenzy》寫播放／session（a 組其餘四張有
Peel 紀錄的不供料）；b 組**只有 Bogshed《Brutal》**能引那句具名評語
（「往水源下毒的音樂版本」），b 組其餘卡一律禁用。

**刻紋（run-out groove）當敘事裝置只給 a 組兩張**（《Heavenly vs. Satan》
《Alvin Is King!》），**b 組全批禁用**。

**「Alan McGee 後來做了 Oasis」與任何 Creation 後續發展，五張 Creation 卡全批禁寫。**

其他一線一卡——a 組：Subway 廠牌史→《Love and Death》；53rd & 3rd→《Orgasm》；
Vinyl Japan→《Alaska》；Thunderball→《14 Iced Bears》；LTM→《Make It Loud》；
Ian Catt→《Skywriting》；The White House 錄音室→《Jaguar》；SAM Studio 與
Midi Inc.→《Alvin Is King!》；日本 Quattro→《Rebellion》；Danceteria→《Unholy Soul》；
「至今無任何復刻」→《Bacharach》。
b 組：él 廠牌史→Momus《Circus Maximus》；Alway 的美學與選角→King of Luxembourg；
él 的氣質三句→Would-Be-Goods；電影取材→Anthony Adverse；日本再發→Marden Hill；
Louis Philippe 本人→他自己那張；Creation 早期廠牌史→Biff Bang Pow!；
Alaska Studios＋McGee 自傳＋西班牙代理→Jasmine Minks；「Doing it for the kids」→Razorcuts；
Whaam!／Artpop! →The Times；Dan Treacy 個人線＋Fire Records 再發鏈→TVP；
Pat Bermingham 花園小屋→Marine Girls；Cherry Red 收 demo→Tracey Thorn；
Ron Johnson 廠牌史→A Witness；In Tape→Yeah Yeah Noh；Midnight Music＋C86→Wolfhounds；
Optic Nerve→McCarthy；Manufactured Recordings→Marine Girls；Pop Aural／Bob Last→Fire Engines。

## 五、hook 層攔下五處、寫作層再攔五處

**hook 層**：
- 《Unholy Soul》研究稿 `sound` 與 credit 打架（「四首各一位客席」，實際四位分佈在三首）
  ——依第 41 條不採。
- 《I Am John's Pancreas》「打鼓的是一台機器」是 facts 撐不住的斷言（第 110 條）。
- 《Mummy Your Not Watching Me》「B 面歌名一首接一首都是畫」誇大（五首裡三首）。
- 《Bright and Guilty》「最不看好」把 Callahan 原話升成最高級。
- 《Lyceum》的 hookCandidate「Sarah 的第一個專輯編號」被同卡 notes 明令禁用。

**寫作層**：
- 《Jaguar》產地字樣的句數**來源自相矛盾**（facts 說四句、引文只有兩句、note 說兩句）
  ——依第 33／64 條不採任何數字。
- 《Laurel》`sound` 的「最短與最長各自收在兩面尾巴」不成立（最長的 4:35 在 A 面第三軌）。
- 多處 note 的敘述鏈點名與「曲目只點」相衝，依第 63 條以「曲目只點」為準。
- **TVP 的 note 自我衝突**（敘述鏈點了 B 面兩個繪畫曲名、同段又寫「只點〈Adventure
  Playground〉」）——hook 就是那串繪畫曲名，裁定只點那兩個 B 面曲名。
- Tracey Thorn 與 Louis Philippe 同形（要寫翻唱／要寫某曲，但「曲目只點」是別首）
  ——改寫成不點曲名的說法，兩邊都不違反。

## 六、同構骨架（第 131 條）：三層共處理 13 組

**hook 層 5 組**：兩張「製作人⋯」開場、兩張「credit 用化名」、兩張「N 首歌最短幾秒」、
兩張「向別團借來的人」、兩張「廠牌的⋯」開場。
**寫作層 a 組 3 組**：第二拍「背標／封套寫著⋯」撞四張、
「hook 講編制→立刻列 credit」撞兩張、破折號插入語四次。
**寫作層 b 組 3 組**：Bad Dream Fancy Dress 與 King of Luxembourg 的「化名」同母題、
兩張「走進辦公室／寄信拿到合約」同骨架、Marine Girls 與 Would-Be-Goods 都以
「某來源說它刻意⋯」收尾。
**研究層先分派的 6 條**：「唯一一張當年發行的專輯」只給 Fire Engines；
「團員後來去了更紅的團」只給 McCarthy；「碟出來時人已經不在了／團已解散」**全批禁用**；
「某廠牌花數十年持續重發」只給 TVP；「多年後被更紅的團當成源頭」禁用
（Fire Engines 的 Franz Ferdinand 不得當收尾）；「廠牌老闆自己的團」四張各走不同錨點。

**a 組 22 張的結尾調子逐條攤開比對，分屬 22 種**，沒有一批收在「多年後被重新發現」上。

**寫作層自己讓出的錨點**：《Alvin Is King!》棄用分派給它的
「一首歌在別人家錄、回錄音室補人聲與鋼琴」——與《Kettle》的
「整張在 SAM Studio 錄，只有收尾那首拉到另外兩地」同骨架，
Kettle 的 researchNotes 明文說那是它的錄音敘事錨點，**先到先得判給 Kettle**。

## 七、年份

**禁斷言發行年（5 張）**：
- The Wake《Make It Loud》1990（MB＋官方目錄 1990／Discogs 原盤 1991-01-21）
- The Flatmates《Love and Death》1989（MB 1989-09／Discogs 正式盤 1990，1989 那筆是 test pressing）
- The Pooh Sticks《Orgasm》1988（MB 1988-12-19／Discogs master 1989，1988 那筆是 test pressing）
- Harvey Williams《Rebellion》1994（MB／Discogs 1994／Sarah 官方目錄 1995）
- Biff Bang Pow!《Pass the Paintbrush, Honey》1985（MB 1984；Discogs 兩筆原始壓片都記 1985，
  正式盤印 1985-02-06，唱片內註寫「1985 年 1 月於法國蘭斯」，維基也寫「1985 年初」
  ——**依第 127 條採 1985**）。**且明令不得寫「Creation 1984 年的第一張 LP」。**

**只能用確切日期的**：Fire Engines《Lubricate Your Living Room》
（版權標 ℗+© 1980、錄音 1980-10-05、發行 1981-01）——行文只用「1980 年 10 月 5 日錄音」。

**禁用的年份說法**：Momus《Circus Maximus》的 1986-01-15（只引 Google Play）
與「Creation Records」這個廠牌說法（實為 él ACME 2）。

另有 9 張只有月份分歧、年份無爭議，已各自註明不指定月份。

## 八、資料受限與授權背書

**兩張合輯走 §5.6**（《Stardust》《Love and Death》），
卡片年份＝編輯版本首度問世年（第 84 條）。

**a 組授權背書**：22 張的 Discogs master 全部零筆 Unofficial；14 家復刻廠牌的
Discogs 實體頁已反向查過（第 55／78 條）。唯一非授權品項：《For Keeps》master 上
2024 年智利 Not On Label 015，**明令不得引用為背書**。

**b 組三處明列的缺口**：
- Louis Philippe《Appointment with Venus》的 Discogs 原盤條目**完全沒有 credit**
  ——不得補寫樂器編制。
- Marden Hill 的鼓手 Guy Evans 只能寫到「Discogs 把他連到那個藝人條目」，
  **不得直接斷言是 Van der Graaf Generator 的人**。
- King of Luxembourg 的〈Valleri〉〈Poptones〉〈Happy Together〉與 Yeah Yeah Noh 的
  〈She Said She Said〉**查不到逐軌作者，一律不得寫成翻唱**。

**第 133 條在這批第一次用上**：b 組有 5 條 src 只有 HTTP——兩個站台實測 HTTP 200、
HTTPS 的 TLS 直接失敗，且都是具名樂評、無替代來源。已在兩張卡的 notes 註明。

**第 109 條全批禁用壓量與稀有度**，並特別攔下五處會誤用的數字：él 早期英國銷量、
Bogshed 首張 EP 的一萬五千張、TVP 手壓的 500 張（**那是《Where's Bill Grundy Now?》EP，
不是本批這張**）、以及 a 組 notes 允許但寫作層主動不寫的三個再發限量
（Untouched 500、Jaguar 100、14 Iced Bears 500）。

## 九、機器 QA

```
qa-batch.mjs research c74     45 張（full 45、thin 0）｜key 與卡單完全一致 ✓
qa-batch.mjs hooks c74        0 標記
chk-hook-crossgroup.mjs c74   45 張｜hook 加權 12–27.5｜note 286–350｜✓ 全部通過
qa-batch.mjs out c74          out-1 22 張 220–236｜out-2 23 張 216–235｜>260: 0｜合計 45 與卡單相符 ✓
qa-check-research.mjs         兩檔各 0 標記
fix-spacing.mjs               兩檔各待補 0
chk-prop.mjs                  45 張｜標記 0｜跨批撞卡 0
fix-rgmbid.mjs                45/45 釘住，零人工身分卡
```

## 十、跨批去重

已過 `dedup-crossbatch.mjs`。上傳前務必再對現行卡池跑一次 `dedup-vs-live.mjs`。
