# c-68 交接（2026-09-03）：英國私壓與小廠 prog／psych 1969–75 共 45 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 REMOTE_RUNBOOK
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

深掘線（`lineType: 深掘`，`scene: 英國私壓與小廠 prog／psych 1969–75`）。
**45 張、45 位藝人（一團一張）、零合輯、零跨批撞卡**。

| 組 | 內容 | 張數 |
|---|---|---|
| a | 私壓與客製壓片（Deroy、SRT、Holyground、Acorn） | 9 |
| b | 小廠二線（Dawn、Neon、Deram Nova、Vertigo swirl、Middle Earth、Young Blood、Pegasus、Kingdom、Morgan Blue Town） | 36 |

**策展層的判斷**：英國小廠端（Vertigo／Dawn／Neon／Pegasus／Deram Nova）收完這批
**已接近飽和**；私壓端（Deroy／SRT／Holyground 目錄）**還很空**，但受再發授權與 MB 建檔限制。

**未收的原因分佈**：自我同名且 Apple 查無 7 張（Tonton Macoute、Spring、Czar、Leviathan、
Gracious!、Affinity、Complex 首張）、池中已有 5 張、再發只有 Shadoks 1 張（第 78 條）、
無原盤年 2 張、大廠範圍外 9 張。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **43/45（96%）**，2 張要掃圖 | `c68/caa.json` |
| 2. 三軸與 rarity | **雲端未做**——照 §0.8 錨點制（第 89 條），`ratings.source` 記 `manual:depth-rubric` | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **45 張全部寫完並過機器 QA** | `desc-tools/batches/output/c68-out-{1,2}.json` |
| 5. 固定試聽 | **35/45 ready（78%）** | `c68/previews.json` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

### 身分：45/45 釘住 release-group MBID、零人工身分卡、`fix-rgmbid` 修正 0

### 封面 43/45
**缺 2 張要本機掃圖**：Complex《The Way We Feel》、Parameter《Galactic Ramble》。

### 試聽 35/45（78%）
`gb` 32、`us` 2、`jp` 1。逐張複檢：35 筆盤名全部相符；軌數偏多的四筆
（Quiet World、Writing on the Wall、Zior、Demon Fuzz）都是同一張碟的擴充再發，
依 Balaklava 先例接受，不是第 129 條的套裝。

## 三、研究層推翻策展層 11 處

1. **Shape of the Rain 成軍於 Eckington**（近 Chesterfield 的礦村）**不是 Sheffield**。
2. **Neon 在英國只發行 11 張 LP**（《Record Collector》463 期 Ian Shirley 專文），策展層寫十二張。
3. **Grannie 的「Seelie Court 有授權爭議」查無來源**——實查 Discogs 廠牌條目與版本頁都無記載。
   **依第 55 條禁寫：反向誤標同樣會誤判分量。**
4. **Tudor Lodge 的封面不是 Roger Dean**，原盤 credit 是 Phil Duffy／P. D. Graphics。
5. **Room《Pre-Flight》不是 Deram Nova 系列**——SML 是 Deram 一般專輯序列，Nova 用 SDN／DN 前綴。
6. **Arcadium 的 Middle Earth 出五張 LP** 不是四張。
7. **Elias Hulk 的澳洲 Young Blood 再壓仍作《Unchained》**，沒有改題。
8. **Black Cat Bones 與 Free 的人事說法（Paul Kossoff／Simon Kirke）查無來源。**
9. **Cressida 的「已解散半年」是算術**，只能寫兩個時間點。
10. Aardvark 的「Nova 只出二十餘張」無來源；Complex／Cirkus／Parameter 三處「最常被引用」評價語，全部禁用。
11. Bodkin 的授權舉證改採 2022 Seelie Court（自述是第一次得到成員合作、用原始母帶的合法再發），
    Akarma 依第 78 條不採。

## 四、十一張「行文不得斷言發行年」

**a 組七張**：Cirkus（卡單 1973，MB 與訪談都說 1974）、Bill Nelson（卡單 1971，維基記 1973，
**且他官網自承發行日從未被準確記錄**）、Trifle、Bulldog Breed、Galliard、Sunforest（封套 ©1969）、
Clark-Hutchinson。
**b 組四張**：Bobak Jons Malone、Clear Blue Sky、Black Cat Bones（**另禁月份**）、
**Steel Mill——唱片上根本沒印年份，1972 是 Discogs 條目編者依廠牌沿革推定的，
連「1972 年出版」都不能寫**，只能寫先德國後英國。簡介照辦（只寫「晚了三年」並把
年份歸屬寫成條目編者的推定）。

## 五、互斥條款分派

**「私壓／限量／只壓 XXX 張」全批只有三張**：Sindelfingen（99 張＋英國稅制門檻）、
Grannie（SRT 的 100 英鎊包套：8 小時錄音＋母帶＋99 張成品）、Bill Nelson（250 張編號＋照片冊）。
**其餘 42 張的壓量數字只當發行事實，不得展開。**

**「原盤稀有／收藏家高價搶手」依第 109 條全批禁用**——這 45 張客觀上張張成立，寫了會一個樣。

**廠牌史每家一張**：Deroy→Parameter、Holyground→Astral Navigations、SRT→Grannie、
Acorn→Oberon、Neon→Indian Summer、Dawn→Titus Groan、Deram Nova（含封底指示孔與
紅／藍內袋辨識機制）→Aardvark、Middle Earth→Arcadium、Vertigo swirl→Cressida、
Young Blood 編號體系→Elias Hulk 那組、Pegasus 與 Kingdom 各一、Morgan Blue Town
錄音室內部→Bobak, Jons, Malone。

**其他線**：成員後續去向只給四張（Complex→Monsoon、Sindelfingen→Status Quo、
Trifle→The Specials、Bulldog Breed→T2／Asgærd）；Keef 封套設計→Raw Material
（Zior 的 Keef 只當純 credit）；Rockfield／Kingsley Ward→Shape of the Rain；
《發條橘子》→Sunforest；John Peel→Astral Navigations 與 Clark-Hutchinson；
Roger Dean 與 Patrick Campbell-Lyons→Clear Blue Sky；《Melody Maker》比賽→Ginhouse。

**分派撞線處理過一次**：研究稿把「團名出自 Mervyn Peake《Gormenghast》」同時派給
Titus Groan 與 Fuchsia，前者已用掉——依第 58／107 條**先到先得**，Fuchsia 改走
「只登過一則《Melody Maker》廣告」。

## 六、這批立了一條新裁定（第 131 條）：同構骨架也是同調

hook 層發現 `chk-hook-crossgroup.mjs` **掃不到**的一組撞線：

```
The Running Man   碟出來時，創辦人已經離職
Cressida          唱片出來時，樂團已經解散
```

**同一個骨架，只換了主詞與述語**，機器比對的是開頭四字與詞形，換了具體名詞就過關。

**裁定第 131 條：跨卡同構的判斷是人的工作，機器只是第一道網。**
與第 130 條互補——**分派管「同一條事實線不要重複用」，這條管「同一種敘事形狀不要重複用」；
事實不同、形狀相同，一樣是同調。**

**寫作層依這條處理了七組**：
- 前半：「團員後來去了更紅的團」原本四張→拿掉 Sindelfingen 的 Status Quo 那條降到三張；
  「一場變故結束了這支樂團」原本 Grannie 與 Titus Groan 都收尾→後者移到中段；
  「小廠出沒幾張就收攤」原本三張→Indian Summer 改成只寫「在英國只發行十一張 LP」。
- 後半：「小樂團外面包一整組管弦客席」讓給 Room；「後來被再發改題」判給 Bram Stoker；
  「編制裡缺一件標準樂器」判給 Sam Gopal；「模切鏤空封套」只留 Tudor Lodge。
  另主動避開 Big Sleep 的「唱片出來不久就散了」，**以免把 Cressida 那組骨架救回來**。

## 七、資料受限與逐張禁令

**Room《Pre-Flight》完全查無樂團背景**（團名太通用、無維基條目、Discogs 只有 credit），
只能靠唱片實體與編制寫；策展層的「Dorset 樂團」同樣無出處、已禁用。

**單點禁令**（依第 80 條不收）：Arzachel「一天錄完」、Bram Stoker 團名由來與 Woolworth's、
Julian's Treatment 樂團陣容與劇情、Pussy 前身團名三說、Parameter 的「在家用雙軌機錄」與
「英國私壓聖杯」、Fuchsia 的淡紫色插頁（來源自相矛盾）。
**Bobak, Jons, Malone 的「兩人是 Morgan Studios 的錄音師」只出自唱片行商品頁**，
依第 128 條行文要帶歸屬。

**寫作層另擋下九處 note 撐不住的**：Sindelfingen 的「開在管風琴商號裡的錄音室」、
Titus Groan 的「五軌全部超過五分半」（facts 是「超過五分鐘」且 A1 正好 5:30）與
「雙簧管在搖滾編制裡罕見」（只在 `sound`）、Demon Fuzz 與 Black Cat Bones 的
需要自己數的首數、Tudor Lodge 的編曲首數（研究層自承與逐首 credit 對不上）、
Fuchsia 的性別、Second Hand 的「三位創辦人裡有兩位出現在碟上」（隱含對第三人的否定斷言）。

## 八、機器 QA

```
qa-batch.mjs research c68   45 張全 full｜key 與卡單完全一致 ✓｜全部通過
qa-batch.mjs hooks c68      0 標記
chk-hook-crossgroup.mjs c68 45 張｜hook 加權 17–44｜note 311–350｜✓ 全部通過
qa-batch.mjs out c68        out-1 9 張 220–235｜out-2 36 張 217–235｜合計 45 與卡單相符 ✓
qa-check-research.mjs       兩檔各 0 標記
fix-spacing.mjs             兩檔各待補 0
chk-prop.mjs                45 張、45 位｜標記 0｜跨批撞卡 0
```

**注意**：`qa-check-research.mjs` **要求 hook 必須是 desc 的開頭**，不能放句中——
寫作層初稿被標了 7 筆，已全部重排。

## 九、跨批去重

已過 `dedup-crossbatch.mjs`。上傳前務必再對現行卡池跑一次 `dedup-vs-live.mjs`。
