# c-61 交接（2026-09-02）：深掘搖滾與迷幻續批 51 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 REMOTE_RUNBOOK
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

深掘線第四批（`lineType: 深掘`），補 c-60 實掃後確認整片為零的四塊（裁定第 53 條）。
**51 張、51 位藝人（零重複）**，年份 1968–1978：

| 組 | 場景 | 張數 |
|---|---|---|
| a | 義大利與法國地下 prog（義 17、法 10） | 27 |
| b | 北歐 progg 與荷比澳紐（瑞典 5、丹麥 2、挪威 2、芬蘭 2、冰島 2、荷蘭 3、比利時 2、澳洲 4、紐西蘭 2） | 24 |

**b 組那 24 位藝人在池中連字串都不存在**——北歐這一區的廣度缺口比預期大（第 69 條）。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **49/51（96%）**，2 張要掃圖 | `c61/caa.json` |
| 2. 三軸與 rarity | **雲端未做**——**照 §0.8 錨點制**（第 89 條），`ratings.source` 記 `manual:depth-rubric` | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **51 張全部寫完並過機器 QA** | `desc-tools/batches/output/c61-out-{1,2}.json` |
| 5. 固定試聽 | **31/51 ready（61%）** | `c61/previews.json` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

### 身分：51/51 釘住 release-group MBID，**本次擴充第一次零修正**

兩組策展代理都照第 41 條的推廣做法逐個回問 `release-group/<id>` 確認實體類型，
`fix-rgmbid` 複驗 51 張原本就對、修正 0（對照 c-55 那次一口氣釘錯 27 張）。

### 封面 49/51、試聽 31/51——兩項都是本次擴充的最高

**試聽的分佈很有訊息**（第 75 條）：`it` 16、`fr` 7、北歐四國 7、`gb` 1，
**美日德荷比澳紐全部掛零**。義法北歐盤的數位再發權在各國本地的考古廠牌手上。

## 三、上架前必須先看 `rulings.md`（主檔 `c53/rulings.md`，92 條）

**這批立的：第 65–69、78–80、92 條。** 直接影響本機操作的：

1. **第 65 條：「廠牌名＋目錄號」不足以識別一次再發。** a、b 兩組各自獨立撞到——
   盜版直接盜用正牌廠牌的名字與原始編號（Trident TRI 1005、Ricordi SMRL 6113、Mellow MMP 181、
   Pan PACD012、Triangle BE 920321⋯共十例），只有 Discogs 廠牌實體的括號序號分得出來。
   **研究稿的再發 fact 都已指到 entity 編號。**
2. **第 78 條：版本頁沒標 Unofficial 也不等於乾淨。** Discogs 的 Shadoks Music 廠牌條目自己寫
   「正當性可疑」——Burnin Red Ivanhoe 與 Young Flowers 的舉證已改用 Sonet／Turn It Over。
3. **第 67 條：Opus Avantra 收《Introspezione》**，掛名不帶 Donella Del Monaco。
   與 Debris'、Ed Askew 同走第 45 條（已定案）。
4. **第 68 條：兩個看起來像錯字、其實是規則正確結果的寫法**——Trúbrot《....Lifun》的四個前置句點、
   Kebnekajse（團名 j）／《Kebnekaise II》（盤名 i）。**不要「修正」。**
5. **第 69 條：Bo Hansson 不在這批**（屬正典），但池中零張，已記進 `CURATION_WISHLIST.md` 給廣度批。

### 研究層推翻策展層七處，本機改寫時不要改回去

| 卡 | 策展層 | 實查 |
|---|---|---|
| Murple | 三人團 | **四人** |
| Corte dei Miracoli | 熱那亞 | **薩沃納**（熱那亞只是錄音室所在） |
| Besombes-Rizet | Pôle 廠牌由 Rizet 創辦 | **Paul Putti 夫婦經營**，Besombes 說封面「Pôle」未經他同意 |
| Campo di Marte | 編號 30 UAS 29497 | 那是卡帶，黑膠是 **UAS 29497** |
| Hoola Bandoola | Wiehe 與 Afzelius 雙主唱兼詞曲 | 詞曲只有 **Mikael 與 Thomas Wiehe**，主唱三位 |
| Wigwam《Fairyport》 | Gustavson 自繪封面 | 封面美術 **Jorma Auersalo** |
| Haikara | 四位管樂客席 | **五個未標樂器的名字** |

另 **解除**了兩處策展層自己下的禁令（第 80 條）：Horrific Child 與 Jean-Pierre Massiera 的關聯
（原盤標籤印著他）、Cervello 與 Osanna 的關係（掛製作統籌，**只能寫牽線、不能寫參與演奏**）。

### 三張年份不斷言、兩張不指名樂器

Shylock《Gialorgues》（1976／1977 兩說）、Irish Coffee（荷蘭文維基同一頁自相矛盾）——行文不斷言發行年。
Shylock 與 Emmanuelle Parrenin——來源互相顛倒且自標 `réf. nécessaire`，不指名誰彈什麼。

### 研究稿的兩處待複核（第 92 條）

Emmanuelle Parrenin 的 facts 裡同一地名兩種拼法（Frémontel／Fromentel），簡介已避開；
Campo di Marte 的 Paul Richard 與 Richard Ursillo 似為同一貝斯手。**留研究層日後查證，不影響上架。**

## 四、簡介產線的數字

| | out-1 | out-2 | 合計 |
|---|---|---|---|
| 卡數 | 27 | 24 | **51** |
| 字數範圍 | 220–236 | 223–235 | 220–236 |
| 超過 240 | 0 | 0 | **0** |
| `qa-check-research` | 0 | 0 | **0** |
| `fix-spacing` | 0 | 0 | **0** |

`qa-batch out c61` 與卡單 51 張相符。研究層 **51 張全部 `full`**、facts 437 條、非 HTTPS src 0。
hook 層：a 組 hook 加權 22–39.5、b 組 23–42，`chk-hook-crossgroup` 零項——
再發史一張都沒有進 hook，a 組 27 張只有 Horrific Child 的 note 帶再發條款，
b 組 24 個 hook 落在 24 種互不重疊的機制上。

**寫作層兩組共回報十二處 note／sound 與 facts 對不上、全部改用 facts 寫得出的說法**
（第 62、64 條連續第三批運作正常）；**hook 與 facts 零矛盾**（第 61 條未觸發）。
