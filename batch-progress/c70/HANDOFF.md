# c-70 交接（2026-09-03）：日本 1980s 地下與 indie 廠牌 46 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 REMOTE_RUNBOOK
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

深掘線（`lineType: 深掘`）。**46 張、43 位藝人、零合輯、零跨批撞卡**。

| 組 | 場景 | 張數 |
|---|---|---|
| a | 日本 1979–84 地下 new wave 廠牌（ピナコテカ／テレグラフ／ヴァニティ） | 27 |
| b | 日本 1984–90 indie 廠牌（ナゴム／キャプテン／Wax／Transrecords／SSE） | 19 |

**池中已有的不收**：Phew、INU、Tolerance、有頂天、筋肉少女帯、たま。
c-60 的 b 組回報過「日本 underground／noise 在池中已相當完整」，**這批不碰 noise／PSF／Alchemy 那條線**。

策展層的判斷：**Vanity LP 系列、Telegraph、Captain、Transrecords／SSE、positive punk
原本池中整片為零**，這批補完後骨幹已齊；剩下的多為 MB 查無或無 Official 再發，再挖邊際效益低。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **32/46（70%）**，14 張要掃圖 | `c70/caa.json` |
| 2. 三軸與 rarity | **雲端未做**——照 §0.8 錨點制（第 89 條），`ratings.source` 記 `manual:depth-rubric` | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **46 張全部寫完並過機器 QA** | `desc-tools/batches/output/c70-out-{1,2}.json` |
| 5. 固定試聽 | **20/46 ready（43%）** | `c70/previews.json` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

### 身分：46/46 釘住 release-group MBID、零人工身分卡；45 張 Album ＋ 1 張 §5.5 EP

> **本機上架前務必補一件事**：**Non Band 那張是 §5.5 `asia-mini-album` 白名單的 10 吋 EP**，
> `prop-a.json` 裡有 `genreException`／`exceptionReason`／`exceptionEvidenceUrls`，
> 但 **`build-manifest.mjs` 不會把 `genreException` 帶進 manifest 的 `identity`**，
> 不補的話驗證器會擋掉這張 EP。策展層順手把 `chk-prop.mjs` 也修了：
> 原本會把「非合輯卻帶例外欄位」標成錯誤，現在 §5.5 EP 卡走與 §5.6 同等的舉證檢查。

### 封面 32/46——這條線 CAA 建檔很薄
**缺 14 張要本機掃圖**：EP-4《Multilevel Holarchy》、突然段ボール《成り立つかな？》、
Pablo Picasso《Soft Type》、Bananarians《Boner》、Ché-SHIZU《約束はできない》、
The Willard《Good Evening Wonderful Fiend》、遠藤ミチロウ《ベトナム伝説》、
JUN SKY WALKER(S)《J(S)W》、人生《顔として...》、Asylum《Crystal Days》、
Z.O.A《Humanical Garden》、カーネーション《Gong Show》、FRICTION《Replicant Walk》、
少年ナイフ《Pretty Little Baka Guy》。

### 試聽 20/46（43%）——全在 `jp` storefront
**剔除一筆**（第 129 條）：**Asylum《Crystal Days》配到 48 軌的條目**，
而 MB 的三個 release 都是 13 軌——是套裝或全集，不是這張碟。

另有三筆軌數可疑但逐張查證後接受：SAB《Crystallization》4 軌與 MB 原盤一致、
EP-4《Multilevel Holarchy》2 軌與原盤一致、Bananarians《Boner》28 軌是同一 release-group
的 2010 二碟再發（11＋17）。

## 三、研究層推翻策展層

**a 組**：VOD 卡帶套盒是 **VOD 160** 不是 168；Normal Brain「最後一張單一藝人 LP」、
Bananarians「前十號少數完整 LP」、Kimera「目錄末期」、Gauze「ADK 唯一 12 吋」、
EP-4 MH「離開 Columbia 後」、Pablo Picasso「第一張 7 吋簽下」——**facts 撐不住，全部禁寫**。
NON 本名「半沢暢子」查無來源；BGM 依 Discogs 是**四人 credit** 不是獨奏作。

**b 組三處硬錯**：黒百合姉妹的 **SSE Communications 是北村昌士**不是佐藤幸雄
（宝島 1991 專訪＋原盤 credit）；G-Schmitt 的 **Wechselbalg 是宮部智彦與 Genet 兩人**
1984 年創辦、**本碟製作人是宮部智彦不是 Genet**；カーネーション 的
「1988 年由 Metrotron 發表」與原盤廠牌（Wax／徳間）不符。

## 四、這批立了一條新裁定（第 130 條）

hook 層發現：**「Tam＝ザ・スターリン的吉他手」這條線被判給 Gauze，但那張卡的 facts 撐不住**
——Tam 彈吉他這件事在《trash》那張卡的 credit 裡，跨卡（第 33 條）。
研究層這樣分派，我在派工信裡照抄了一遍，**hook 層擋下來了**。

**裁定第 130 條：互斥條款的分派本身也要過 facts。** 分派是「這條線判給哪張卡」的調度，
不是事實的授權；被判到的那張卡的 facts 撐不住就換一張或整條不用。
**優先序：facts > notes > 派工信。**

同批另兩處同型也由 hook 層擋掉：R.N.A. 的 facts 只有「佐藤薫製作」卻被寫成
「佐藤薫＝EP-4 主唱」；Aunt Sally 的「Phew 出道前的樂團」是時序推論。

**hook 層還依第 111 條反過來糾正了派工信**：我寫「四張不得斷言發行年」，
但卡層 `yearVerified` 只有 **FRICTION《Replicant Walk》** 真的禁年份——
Madame Edwarda 與木魚禁的是**月份**、カーネーション 明寫可寫一九八八年八月而
禁的是**「第幾張」序數**。**分層檢查有在運作。**

## 五、互斥條款分派

**a 組**：Vanity 的廠牌史／阿木譲／Rock Magazine→Dada；權利回歸與 2011 Box、2020 再發→SAB；
投稿卡帶百捲→BGM；六捲卡帶套裝與 VOD 160→Salaried Man Club；佐藤薫製作→R.N.A.。
Telegraph 的地引雄一創廠牌→Auto-Mod；5・21 貼紙與《昭和崩御》改題→EP-4《Lingua Franca-1》；
「CD 從黑膠翻回來」→EP-4《Multilevel Holarchy》；女裝主唱首次介紹→Katra Turana 首張。
Zero Records／平川晋、「8 吋」賣點、Calvin Johnson 與 Cobain→少年ナイフ《Burning Farm》。

**b 組**：ナゴム 的廠牌位置→木魚；ケラ 招攬故事→人生；「倒數第二賣不掉的單曲」→カーネーション。
Transrecords／SSE 的廠牌史→YBO²；Gazelle 監修＋SICK BOYS→Asylum
（Z.O.A 與黒百合姉妹只寫廠牌名，黒百合另分到「FOOL'S MATE 刊出後才受注目」）。
Wechselbalg 創立→G-Schmitt；Genet 共同製作＋CLUB WALPURGIS→Madame Edwarda。
Wax 的廠牌性質與 2016 二十二張復刻→FRICTION。
**跨組避讓乾淨**：《Pretty Little Baka Guy》改走「同年美國 Subversive 12 吋、
封套並印京都與佛州兩地址、五間錄音室」，Telegraph 與 Auto-Mod 全部留給 a 組。

## 六、年份與形態

**五張「行文不得斷言發行年」**（a 組）：EP-4《Multilevel Holarchy》
（**1985 vs 1983 證據強度相當，最需要本機留意**）、Gauze《Fuck Heads》、須山公美子、
Auto-Mod、Bananarians。**b 組只有 FRICTION《Replicant Walk》**（Discogs 原盤／℗／
徳間官方頁皆 1988 而 MB 記 1989）；Madame Edwarda 與木魚禁的是月份；
カーネーション 禁的是序數。

**形態**：Non Band 10 吋、少年ナイフ《Burning Farm》8 吋（20cm）、
Salaried Man Club 與 Den Sei Kwan 是 C46 卡帶、Lizard《彼岸の王国》是
**1985 年發行的 1978–79 現場**。壓片數只用有來源的（Dada「據稱 200」帶著「據稱」、
ザ・スターリン 兩說並列不斷言）。

## 七、寫作層的兩處相容解

- **Lizard《彼岸の王国》**：hook 概括「B 面是 1978 年福生 Chicken Shack」，但 facts 明載
  末曲〈王国〉是同年 11 月有楽町日立 Lo-D Plaza 的錄音室現場。依第 111 條找相容解——
  hook 原封保留，行文緊接著把兩處錄音分開寫明，**卡片整體不留下錯誤陳述**。
- **メトロファルス《STANDS》**：`sound` 的「七首都在五到七分鐘」與曲目表不符
  （A1+A2 連奏合計 7:01），改寫成曲目表可直接讀出的「七首歌沒有一首短於五分鐘」。

> **本機要注意的一個工具行為**：`fix-spacing.mjs` 的保護清單只涵蓋卡池的藝人／專輯欄，
> 吉野大作那張的第二吉他手 **`東条A機`** 會被拆成「東条 A 機」。
> 寫作層為此改寫成「另有第二把電吉他」避開；**日後若要寫這類人名，要先擴充保護清單。**

## 八、機器 QA

```
qa-batch.mjs research c70   46 張（full 45、thin 1）｜key 與卡單完全一致 ✓
qa-batch.mjs hooks c70      0 標記（「簡體字: 会」來自ヤマハ音楽振興会，是誤報）
chk-hook-crossgroup.mjs c70 46 張｜hook 加權 24–42.5｜note 314–349｜✓ 全部通過
qa-batch.mjs out c70        out-1 27 張 206–239｜out-2 19 張 221–236｜合計 46 與卡單相符 ✓
qa-check-research.mjs       兩檔各 0 標記
fix-spacing.mjs             兩檔各待補 0
chk-prop.mjs                46 張、43 位｜標記 0｜跨批撞卡 0
```

**誤報要認得**：日文假名與漢字會被標「非拉丁亂碼」；`会`（ヤマハ音楽振興会）會被標「簡體字」——
**那是現代日文正規字形，不要「修」。**

## 九、跨批去重

已過 `dedup-crossbatch.mjs`。上傳前務必再對現行卡池跑一次 `dedup-vs-live.mjs`。
