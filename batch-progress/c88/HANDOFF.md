# c-88 交接（2026-09-04）：電影原聲帶，45 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼，以及它為什麼存在

**這批是店主 2026-09-04 的指示直接催生的**：
「冷門電影專輯有點太多了，反而耳熟能詳的不多……確保熱門電影專輯都要有，
影展電影的專輯也要有，比如敕使河原宏的砂之女、塔可夫斯基的索拉利星這種經典老電影。」

廣度線（`lineType: 廣度`）。**45 張、33 位藝人、零 §1 人工身分、零跨批撞卡、
45/45 釘住 release-group MBID。合輯 10 張，全部走 §5.6 例外並寫了 `exceptionReason`。**

| 組 | 場景 | 張數 | 年份 |
|---|---|---:|---|
| a | 電影原聲：主流熱門 | 22 | 1969–2016 |
| b | 電影原聲：影展與作者電影 | 23 | 1963–2021 |

**b 組收的正是店主點名的那一類**：塔可夫斯基（Артемьев《Солярис／Зеркало／Сталкер》）、
早坂文雄《七人の侍／羅生門》、武満徹、高達（Delerue《Le Mépris》、Duhamel《Pierrot le Fou》）、
奇士勞斯基（Preisner 兩張）、Greenaway（Nyman 兩張）、貝托魯奇（Barbieri《Last Tango in Paris》）、
塔爾（Víg《Sátántangó》）、王家衛（Galasso《In the Mood for Love》）、
張藝謀與陳凱歌（趙季平兩張）、尤杜洛夫斯基《El Topo》、安東尼奧尼（《Zabriskie Point》《L'Avventura》）、
林區兩張、法斯賓達（Raben《Querelle》）、溫德斯《柏林蒼穹下》、
Liška《Marketa Lazarová》、de Roubaix《Le Samouraï》。

**廠牌**：MCA Records 4、United Artists 3、Virgin France 3、Milan 3、Epic Soundtrax 2、Mercury 2，
其餘 Cotillion／Ode／Sony Classical／Nostalgia-Sepia／Interscope／Restless 等各 1。

`fix-rgmbid` 見第三節——**這批把腳本本身修掉了一個 bug**。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **44/45（98%）**，只有 1 張要掃圖 | `c88/caa.json`、`caa.log` |
| 2. 三軸與 rarity | **雲端未做**——照 §0.8 錨點制（第 89 條） | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **45 張全部寫完並過機器 QA** | `desc-tools/batches/output/c88-out-{1,2}.json` |
| 5. 固定試聽 | **29/45（64%）** | `c88/previews.json`、`previews.log` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

**唯一沒有封面的是** Mihály Víg《Music From the Film Sátántangó》。

## 三、`fix-rgmbid` 的 bug 是這批抓到的（第 153 條附錄）

策展層在《Rocky Horror》那張的 `mbNote` 明寫某個候選「**刻意不釘**」，
**腳本仍因為計分高一分而換掉**——那一分來自把 primary-type 的鏡射欄拿去比 secondary-types 裡的
Compilation。**`fix-rgmbid.mjs` 已改成排除 `mbNote` 裡標「不釘」的候選**，
本卡 rgMbid 已還原成 `c5461038-3477-4f07-8771-25216cec119a` 並複跑確認穩定。

**同一個形狀當天在試聽端又出現一次**（見下節第一項）——`mbNote` 標了「不釘」的對照組，
兩個不同的自動化階段都會被它騙過去。

## 四、這批的核心結論：**探測層的 `unavailable` 大多是誤判**

**29 張 ready 裡，有 9 張是探測層原本判 `unavailable`、研究層回查後推翻的。**
命中店面的分佈把原因說得很清楚：

```
us 23｜tw 2｜ru 1｜gb 1｜de 1｜fr 1
```

**九張誤判分兩類：**

**（1）盤名形狀不合——四張（第 152 條）**
- Midnight Cowboy：**卡片寫 Score、Apple 寫 Soundtrack**。
- O Brother：**卡片帶長副標**「Music From a Film by Joel Coen & Ethan Coen」，Apple 作「Music from the Motion Picture」。
- Jurassic Park：**卡片盤名多了「Music From the」**。
- Querelle：**卡片帶德文長副標**。

**（2）用錯的語言去搜錯的店面——五張，第 158 條就是這批立的**
- Артемьев：拉丁盤名搜不到，Apple `ru` 上它叫**《Солярис. Зеркало. Сталкер》**。
- 《In the Mood for Love》：Apple `tw` 上盤名是拼音、**掛名卻是中文「群星」——同一筆裡兩套書寫系統混用**。
  拆成 ASCII 會丟掉掛名那一半，用中文搜會丟掉盤名那一半。
- 《霸王別姬》：同上，**且 Apple 把掛名記成兩位歌手**。
- Le Samouraï：`fr`，且 **Apple 把「(Bande originale du film…)」串進了每一個曲名與盤名**。
- Nyman《The Draughtsman's Contract》：`gb` **搜到 10 筆卻一筆都沒配上**。

**通則（第 158 條）**：第 152 條附錄的「拆到只剩 ASCII」對**同一套書寫系統的變形**有效
（`Tånk`→`Tank`），**對跨書寫系統的碟是反的**。
`OST` 那組 storefront 序已經把 `ru`／`pl` 放進去了，**但序只決定「試哪些店面」，不決定「用什麼字串去試」**。

## 五、兩張是探測層**配錯了碟**，改判不採用／換 collectionId

- **Rocky Horror**：探測層配到的 6796518964 是**《Karaoke Version》——卡拉 OK 版**，
  **正是策展層在 `mbNote` 標「刻意不釘」的那個對照組**（與第 153 條同一形狀，發生在試聽端）。
  正解是 **6795892154**：16 軌、**前 14 軌與 1975 原盤逐項相同**，多的兩軌是 1989 混音。
  **原盤 14 軌，那兩軌不得當原盤曲目。**
- **L'Avventura**：探測層配到的 1541254085 是 **33 軌、曲名體系完全不同、℗ 1960** 的另一版；
  本卡釘的 release-group 底下**只有那一筆 2016 年 16 軌黑膠**。依第 140／141 條**改判不採用**。

## 六、一處主線裁定：Dances With Wolves 採用，標 `expandedReissue`

研究層問「是否仍採用」。Apple 那筆是 **2004 年的 24 軌擴充版**（℗ 欄列 1990／1995／2004），
**原盤 18 軌**。依第 140 條的判準「**差別不在軌數多少，在多出來的那些是誰的**」：
多出來的六軌是**同一份配樂的其他樂段**，不是別張碟的東西、也不是合輯
——**這是擴充版，不是二合一**，比照 c-81 的 Scream／Tar／Thin White Rope 採用。

**但行文限制較嚴**：那六軌不得當原盤曲目；**Apple 的曲序與原盤不同**、
而且**有兩軌被併成一個長串曲名**——**曲名與曲序一律以原盤為準。**

## 七、兩張同族於第 157 條：曲序不可信

- **Nyman《The Draughtsman's Contract》**：7 軌曲長對得起來，**但曲序不同**
  （〈Chasing Sheep…〉被排到第 1）——**取固定試聽要按曲名取、不要按軌號取**。
- **Jurassic Park**：同一 RG 的**三個版本軌數不同**（US CD 16／US LP 15／CA CD 14）
  ——**行文寫軌數必須指明是哪一版**。

**另外八張 ready 的 `note` 都寫著「Apple 的年份欄不得寫成發行年」**，上架時一併注意。

## 八、下游層層攔下的東西

**hook a 組**（22 張，加權 26–40.5、note 268–350）：攔下 The Matrix 候選的兩個錯數字
（13 筆授權裡 A&M 出現兩次、**只有 12 家**；℗ 年**只有五個不是十三個**）、
一處由 reprise 這個字做的一步推論、一處把地點清單串成因果、一處曲長掛錯軌、三處否定句。

**hook b 組**（23 張，加權 21–40.5、note 212–350）：交件時回報自查出三處自己的錯並回頭改掉。

**寫作 a 組**：**Gladiator 的 `sound` 欄寫「三人交錯分派」，但 facts 的 Music By 是四個名字**
（Zimmer／Badelt／Gerrard 加 hook 裡的 Djivan Gasparyan）——**與 hook 自相矛盾**，
改成「作曲欄另在三個名字間交錯」。**Rocky 的 Rights Society 不是互斥分派**
（A1 與 B1 同時掛 ASCAP），「其餘標 BMI」改成「多數標 BMI」。

**寫作 b 組——攔下研究稿兩處，主線已回頭修**：
- **Querelle**：note 寫「B3〈Young and Joyful Bandit〉的作詞欄與演唱欄都寫 Jeanne Moreau」，
  但 facts 的逐軌人聲欄明寫 **B3 的 Vocals 是 Günther Kaufmann**（Moreau 掛的是 A3／A5），
  Moreau 在 B3 上只有 Written-By。已改。
- **Raise the Red Lantern**：facts 句首寫「有**五軌**用斜線串場景」，同一條卻列出**六軌**。已改。

**主線往上游修一處**（在 c-85／c-88 混合的那一輪）：研究稿 Midnight Cowboy 的 facts
句首寫「十二軌分屬**六組**表演者」，同句逐項只列得出**五組**（2+5+2+1+2＝12 軌對得上）。

## 九、機器 QA 結果

```
node desc-tools/qa-batch.mjs hooks c88          全部通過 ✓
node desc-tools/chk-hook-crossgroup.mjs c88     2 組｜45 張｜hook 加權 21–40.5｜note 212–350｜✓ 全部通過
node desc-tools/qa-batch.mjs out c88            out-1｜22 張｜字數 216–235
                                                out-2｜23 張｜字數 201–239
                                                合計 45 張，與卡單相符 ✓，>260: 0
qa-check-research（兩檔各一次）                   各 0 標記
fix-spacing（兩檔各一次）                          待補 0
```

**`out` 的兩盞「未具名出處」燈都是第 143 條的純字串誤報**，兩處都在 a 組：
Woodstock 的「葛萊美名人堂」（出處是英文維基帶行內引註的段落，主辦者已具名）、
Reservoir Dogs 的「2024 年入選《滾石》的史上百大原聲」（出處具名）。
**依第 128 條保留，不刪事實。**
a 組另有兩處**改字面不改具名**以避開誤報：「年度專輯獎」→「年度專輯那一座葛萊美」、
「AFI 百大」→「兩版名片榜」。

## 十、本機還要做的事

1. **掃 1 張封面**：Mihály Víg《Music From the Film Sátántangó》。
2. **三軸與 rarity**、**頂點資格判定**——照 §0.8 錨點制。
   **這批是廣度線且有 10 張合輯，頂點資格要逐張看，不要整批照抄。**
3. **四處寫入與回讀**（`seed_cards.json`／`apex_pool.json`／KV／Firestore），雲端不碰。
4. **上架前逐張讀 `previews.json` 的 `note`**——**45 張裡有 12 張帶限定語**，比例是本線最高的一批。
   特別是 Rocky Horror（換過 collectionId）、Dances With Wolves（擴充版）、
   Nyman（**按曲名取試聽，不要按軌號**）、Jurassic Park（軌數要指明版本），
   以及八張「Apple 年份欄不得寫成發行年」。
5. **`node scripts/build-genre-tree.mjs --write`**（第 147 條）——**要排在 seed 上架之後**。
   **這一步雲端做不到**（重建快取要碰 KV，且 `data/rawgenres-cache.json` 不在版控內，需先 `--pull`）。
6. **`ost-coverage-audit.mjs` 要用得小心**（第 151 條）：
   它拿英文片名去掃 `seed_cards.json`，而卡池存的是原文盤名
   （《C'era una volta il West》《Per un pugno di dollari》），**會同時產生偽陽性與偽陰性**。
   腳本開頭已加警語，**它的輸出只能當線索、不能當結論**。
7. **清掉本批的暫存腳本**：
   repo 根目錄的 `dg-c88a.mjs`、`fetch-c88a.mjs`、`mb-c88a.mjs`、`merge-c88a.mjs`、`rel-c88a.mjs`；
   `desc-tools/` 下的 `ap-c88b.mjs`、`dg-c88b.mjs`、`fetch-c88b.mjs`、`mb-c88b.mjs`、
   `merge-c88b.mjs`、`wk-c88b.mjs`、`build-c88w1.mjs`。
   （`batch-progress/c88/chk-prop.mjs` 是共用的，**不要刪**；
   `batch-progress/ost-coverage-audit.mjs` 保留，見第 6 點。）
