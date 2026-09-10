# c-77 交接（2026-09-04）：英國 DIY post-punk 與卡帶文化 1978–84 共 43 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 REMOTE_RUNBOOK
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

深掘線（`lineType: 深掘`，`scene: 英國 DIY post-punk 與卡帶文化 1978–84`）。
**43 張、39 位藝人、1 張 §5.6 合輯、零跨批撞卡、43/43 釘住 release-group MBID。**

| 組 | 場景 | 張數 |
|---|---|---:|
| a | 自壓與獨立小廠的黑膠 LP，1978–82 | 21 |
| b | 卡帶廠牌與郵購網絡，1980–84 | 22 |

**刻意避開** c-74 的 indie pop 微廠線（Sarah／él／Creation／Ron Johnson 等 45 張）
與 Rough Trade 正典、*Messthetics* 系列、近年復刻熱潮反覆挑走的那批；
池中已 3 張的 Crass、Whitehouse、NWW、Coil、Current 93 一律不碰。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **35/43（81%）**，8 張要掃圖 | `c77/caa.json` |
| 2. 三軸與 rarity | **雲端未做**——照 §0.8 錨點制（第 89 條），`ratings.source` 記 `manual:depth-rubric` | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **43 張全部寫完並過機器 QA** | `desc-tools/batches/output/c77-out-{1,2}.json` |
| 5. 固定試聽 | **17/43 ready（40%）**，**命中全部在 `gb`** | `c77/previews.json` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

`fix-rgmbid` **修正 0**——策展層 43 張全部原本就對。

### 封面缺 8 張，要本機掃圖
The Passage《Pindrop》、Grow-Up《The Best Thing》、
The Diagram Brothers《Some Marvels of Modern Science》、
The Door and the Window《Detailed Twang》、Metabolist《Hansten Klork》、
The Lines《Therapy》、L. Voag《The Way Out》、Nocturnal Emissions《Fruiting Body》。
**Storm Bugs 的 CAA 封面來自 2011 Harbinger 再發**，與 1980 原捲封套未必相同
——notes 已提醒標 `coverVersionDoubt`。

### 試聽 17/43，命中全部在 `gb`
`us`／`de`／`nl`／`fr`／`be`／`ca`／`au`／`jp` 八個 storefront **零命中**——第 75 條再次成立。

## 三、逐張複檢：**這批是第 141 條的來源，也是我自己錯得最多的一批**

**剔除兩張**：
- **we·be·echo《Ceza·Evi》**——Apple 的《Ceza Evi - Compleat Edition》32 軌、
  **軌號在第 19 軌重新從 1 開始**，是雙碟合集（第 129 條）。
  研究層另查證 Cold Spring 自己說第一片是「自製 Special Edition」的曲目、
  第二片才是本卡原捲。
- **Nocturnal Emissions《Fruiting Body》**——我原本把它判成可接受的加曲版，
  `originalTrackCount` 填 **18**（**憑 Apple 曲目表的形狀推的、沒有來源**）。
  研究層查出原盤是 **13 軌**，MB 該 RG 唯一一筆 1981 release 確實 13 軌；
  Apple 那筆 26 軌是 2025 Klanggalerie 雙 CD，**第二片含另一捲 1981 Sterile 卡帶**
  ——依第 129／140 條剔除。

**恢復一張**：
- **Attrition《Death House》**——我原本看到 Apple 只有兩軌，判成
  「是單曲／EP 不是本張卡的專輯」而剔除。**判錯了。**
  **這張碟本來就只有兩軌**（A〈Crawling〉／B〈Dead Of Night〉），
  MB 該 release-group 轄下**五筆 release 全部兩軌**、primary-type 是 Album。
  Apple 那筆是同一張碟，只是沿用 1997 年後的再發盤名（第 91 條的形狀）。

**這兩個錯誤方向相反，共同機制是我全程只看 Apple**
——Apple 給的是「這個店面上架了什麼」，它不知道原盤長什麼樣。
**第 141 條就是從這裡立的**，並在 c-78／c-79／c-80 又各生效一次
（總共六次），最後在第 141 條附錄二改成流程：
**探測階段一律不填 `originalTrackCount`，留空待研究層查。**

**七張擴充再發已標原盤軌數**（研究層查證，行文不得把加曲當原盤曲目）：
The Passage《Pindrop》**13 軌**（我原填 11，也是憑印象、研究層更正）、
The Cravats《In Toytown》14、L. Voag《The Way Out》18（19–22 明標 Bonus Track）、
Alternative TV **8**（Apple 那筆是 **1996 Anagram 合輯**、16 軌，
**Apple 顯示的 1979-01-01 是佔位日期，`yearDrift` 因此算成 0**）、
The Diagram Brothers 14、The Deep Freeze Mice《Teenage Head》12、《My Geraniums》7。
**Clock DVA《White Souls in Black Suits》原盤軌數兩說**
（Discogs 原捲 8 軌／Mute 2025 說明欄寫「第 1–9 軌原本收在原捲」）——**兩個都不填**。

## 四、研究層推翻策展層 27 處

**a 組 14 處**，最重要的：
- **The Lines 的 Red Records 是經理人 Steve Brown 1979 年創辦的**，不是樂團自己的。
- **The Work 不是「唯一一張錄音室 LP」**（1989《Rubber Cage》、1992《See》）。
- **《Bouquet of Steel》是單張 LP、15 軌**，不是雙碟。
- **Metabolist 1975 年於倫敦成軍**，不是英格蘭中部。
- **United Dairies 的外團發行由 John Fothergill 主導**，Stapleton 之後才接手。
- **Maximum Joy 的 Y Records 是他們經理人 Disc O'Dell 開的**，
  發起人是**前 Glaxo Babies** 的 Wrafter＋Rainforth，只有 Waddington 來自 Pop Group；
  2020 年那家「1972」廠牌 Discogs 兩筆國別皆 **US** 不是英國。
- **Indiscreet Music 的錄音不在 Graveyard**（那是 Mastered At／「搶救剪輯」地）。
- **Diagram Brothers 的人數與親屬關係兩源衝突**（維基列五人且「並非真的是兄弟」、
  LTM 說只有節奏組是兄弟）——**禁止任何斷言**。
- Ludus 錄在**三間**錄音室；The Cravats 錄在**托基 Blaze Studio**；
  Androids of Mu 是**西倫敦占屋場景／諾丁丘門 Frestonia**；
  Family Fodder 的「Rough Trade 配銷」那一半查無來源；
  The Astronauts 的 Street Level 是 Produced At／Recorded At、另有 Stevenage 的 The Crypt。

**確認策展層正確的**：Indiscreet Music《Dubious Collaberations》的**原盤錯拼保留**
——實查 MB 與 Discogs 各只有一筆、**從無再發訂正**，第 117 條確實不適用。

**b 組 13 處**，最重要的：
- **YHR Tapes 是 David Elliott 開的、據點在 Sussex／Brighton**
  ——策展層寫的「赫爾的 Andrew Cox 自己經營」**四張卡全批禁用**。
  目錄做到 **YHR 031（1983）**，Cox 名下**四號**（003／008／017／025）。
- **MFH 就是廠牌主人自己的團**，且**有授權再發**
  （2012 Forced Nostalgia、2016 Cherry Red 盒裝收〈Mistral〉）。
- **Storm Bugs 原捲演出 credit 是三人**（多 Sarah Pomeroy）；
  Goldsmiths 是 **Recorded At** 欄不是共同發行。
- **Industrial Records 的 IRC 卡帶系列絕大多數是 TG 自己的現場帶**。
- **Bladder Flask 與 Nurse With Wound 那一圈的關聯查無來源**；
  **盤名長度那個「78 個字元」的數字也不對——全面禁止寫盤名長度**。
- **Zoviet France 是五軌**、封套是**壓花鋁箔＋噴綠紅點＋絹印內襯**，不是麻布瀝青紙。
- **Metgumbnerbone 錄在 Newcastle-upon-Tyne 的 Elswick**、
  **credit 上四人一件樂器都沒掛**。
- **Nocturnal Emissions 的「Sterile 第二張 LP」序數不乾淨**
  （廠牌檔案明寫從來沒有過 SR1）。
- Danielle Dax 那張不是「Lemon Kittens 解散後的第一張個人作」；
  Hula 不是「之後幾乎沒有被任何雪菲爾場景敘述提到」（有 2019 年署名訪談反證）。

## 五、年份

**禁斷言四張**：L. Voag《The Way Out》1979（MB 1980 無佐證）、
Alternative TV 1979（MB 1978 是**錄音版權年**）、
Ludus《The Seduction》1981（**研究層新發現的分歧**：LTM 傳記頁記 1982）、
Storm Bugs《A Safe Substitute》1980（**MB 的 `first-release-date` 是 2011**，
只建了 Harbinger 再發）。
**Clock DVA 月份兩說**（Discogs 1980-10／MB 1980-12），不得寫月份。
另有 4 張只是月份分歧（Spherical Objects、The Passage、Grow-Up、Maximum Joy），
可寫年、不得寫月。

## 六、互斥條款——這批同調來源極強

**a 組已用掉、b 組 22 張一律禁用的 15 條線**：自己出唱片這件事本身、
樂團自己開廠牌、多年後被考古廠牌整批挖出來重發、John Peel、
團員後來去了更紅的團、這是他們唯一一張、臥室錄音、自建掛名錄音室、
Rough Trade 配銷、MPO 法國壓片、Nimbus 壓片、Grant Showbiz、
Street Level／占屋場景、Manchester Musicians Collective、Graveyard Studios，
以及六家廠牌史。
**a 組刻意留給 b 組三條**：Genesis P-Orridge／Industrial Records、
Bryn Jones（Muslimgauze）、Nurse With Wound 名單——a 組全部不供料。

**廠牌史一線一卡**（a 組 16 家、b 組 15 家，逐張分派，清單在各卡 notes）。

## 七、同構骨架（第 131 條）：三層共處理 12 組

**hook 層 3 組**：這批天生長出**六個「兩面不叫 A／B」**與**四個「兩面刻紋各刻一句」**
——每種形狀只留一條當 hook（側名給 Lemon Kittens 的 L／K、刻紋給 The Cravats 的
ROUGH 70 與《Brighter Now》），其餘降到 note；「一面一首」只留 Bladder Flask 與 Sema。
另攔下一處雙重分派（「標籤與封套曲序對不起來」同時給了 Androids of Mu 與 The Astronauts，
**先到先得判給 Androids of Mu**）。

**寫作層 a 組 4 組**：「兩面不叫 A／B」六張壓到兩張、「兩面刻紋各刻一句」三張壓到一張、
兩張同樣的 LTM 引述歸屬、四張「曲名＋曲長」結尾壓到兩張、六張廠牌史結尾壓到三張。
**寫作層 b 組**：跨組同調再擋一次——a 組的 The Work 已寫
「兩面刻紋都蝕著 A PORKY PRIME CUT」，**Zoviet France 的刻紋是同一句，整條不寫**。

**寫作層攔下的其他**（值得記的三處）：
- **Diagram Brothers 的「碟上每個名字的姓都是 Diagram」是全稱斷言**，
  但 credit 上 B6 環境噪音掛的 Eric Random 不姓 Diagram
  ——改寫成「姓 Diagram 的那幾個人，其實不是一家人」，**一句避開人數、親屬與全稱三者**。
- **Teenage Head 的「長度全落在 B 面兩端」回 facts 逐項數不成立**
  （全碟最短的是 A 面 0:55 的〈Hegel's Brain〉），改用原始值（第 135 條）。
- **Androids of Mu 的「這是他們唯一一張 LP」整條沒寫**——那句只在 `researchNotes`
  （引英文維基）、**facts 裡沒有**，依第 33／130 條 facts > notes 不寫。
  **分派閒置，依第 138 條回報即可。**

**hook 層與寫作層都攔下「數數也是算術」**（第 64／108 條）：
DFM 的「兩間臥室」（facts 只列兩個人名）、Hydra 的「兩台手提卡帶機」（facts 只列廠牌）、
Astronauts 的「七個人」、Indiscreet Music 的「剪成二十四段」（facts 只有 A 面十段、B 面十四段）、
Zoviet France 的「另外四首」（5−1）、《Brighter Now》的卡帶版「少三首」（9−6）。

## 八、資料受限

**三張 thin**：Indiscreet Music《Dubious Collaberations》
（無再發、無 Discogs master、無維基、無可開啟樂評，**`keyTracks` 是空的、
明令禁止編造曲名**——段落標題是錄音日誌不是曲名，第 56／60 條的形狀）、
The Living Daylights《Any Way You Want》（**Discogs 藝人條目完全空白**）、
Attrition《Death House》。

**11 張唱片本身不印曲長、Discogs 亦無時間登錄**——行文無法談長度分布。
**六家廠牌在維基上零條目**（YHR、In Phaze、Cause For Concern、A-Mission、Le Rey、
Orgel Fesper）；Grow-Up、The Door and the Window、The Lines 都沒有維基條目；
The Astronauts（UK）在英文維基沒有條目（同名的是美國衝浪團與 Dan Carney 的獨立計畫）
——**Nik Turner 只能寫成「客席薩克斯風」、Hawkwind 那層無合格引註已禁用**；
**封套上的 Genious 拼法只能寫成封套上的拼法，不得寫成「印錯」**。
**Hula 的 Discogs 藝人條目是轉載粉絲網站的文字，已整段禁用**、改走署名訪談。
`snatchtapes.co.uk` 被出口代理擋掉（`connect_rejected`），Snatch Tapes 只能走 Discogs。

**未授權再發 3 筆，不算背書**：Metabolist EOS-443、Storm Bugs Rodent Tapes、
Clock DVA 德國 Not On Label。

## 九、機器 QA

```
qa-batch.mjs research c77     43 張（full 40、thin 3）｜key 與卡單完全一致 ✓
qa-batch.mjs hooks c77        0 標記
chk-hook-crossgroup.mjs c77   43 張｜hook 加權 16–35.5｜note 309–350｜✓ 全部通過
qa-batch.mjs out c77          out-1 21 張 219–239｜out-2 22 張 212–240｜>260: 0｜合計 43 與卡單相符 ✓
qa-check-research.mjs         兩檔各 0 標記
fix-spacing.mjs               兩檔各待補 0
chk-prop.mjs                  43 張、39 位｜標記 0｜跨批撞卡 0
fix-rgmbid.mjs                43/43 原本就對，修正 0
```

## 十、跨批去重與本機注意事項

已過 `dedup-crossbatch.mjs`（29 批、1,448 張，撞卡 0）；
另以盤名為主鍵掃全池 13,913 列，2 筆命中逐筆核對皆誤報。
上傳前務必再對現行卡池跑一次 `dedup-vs-live.mjs`。

1. **`Zoviet France` 的 MB 實體名是 `:zoviet*france:`**——
   下游打 MB 字串搜尋會落空，**一律吃 rgMbid**。
   （本批改掛 `Zoviet France` 是因為 c-65 先到已用此寫法，
   照 MB 實體名收會製造分裂鍵，第 29／49／115／119 條。）
2. **Metabolist 在 MB 上有兩個同名 Album RG**（1980 原盤 vs 2007 Vinyl Japan），
   `fix-rgmbid` 不得換掉釘位（第 129 條）。
3. **封面與試聽兩頭皆空 4 張**（全在 a 組）：Grow-Up《The Best Thing》、
   The Door and the Window《Detailed Twang》、Metabolist《Hansten Klork》、
   The Lines《Therapy》——要依 §4 順序改由 Bandcamp／Spotify 解析，解不出來就留置。

## 十一、這條線還有多少

策展層列出**近二十張 MB 查無的自壓盤**（Eric Random Meets The Bedlamites、
Steve Miro & The Eyes、Prag Vec、I'm So Hollow、The Distributors、God's Gift、
The Petticoats、Beyond the Implode、Danny & the Dressmakers、Twelve Cubic Feet、
A Primary Industry、The Sinister Cleaners、Alien Brains、The Grey Wolves、
Lemon Kittens《The Big Dentist》、Instant Automatons，
以及 Object Music OBJ 003 那張場景合輯）——**都只能走 §1 補遺批**（c-87 已證實可行）。
