# c-101 交接（2026-09-05）：遊戲原聲正典，45 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

店主 2026-09-05「接力做完十批」的一批。`lineType: 廣度`。**這是池中原本完全空白的一條線。**

**45 張、26 位掛名、零 §1 人工身分、零跨批撞卡、45/45 釘住 release-group MBID、
零池中重複卡（逐一實掃）。年份 1991–2020。**

| 組 | 場景 | 張數 |
|---|---|---:|
| a | 遊戲原聲正典：日本廠牌世代 | 26 |
| b | 遊戲原聲正典：獨立遊戲與西方大作 | 19 |

**逐位**：植松伸夫 4，近藤浩治／下村陽子／光田康典／Darren Korb 各 3，
崎元仁／古代祐三／岡部啓一／目黒将司／Toby Fox／C418／Austin Wintory／Mick Gordon 各 2，其餘各 1。

**規劃書兩處數字錯，實掃更正**：「Christopher Larkin 已 3 張」實為 **0 張**。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **45/45（100%）** | `c101/caa.json` |
| 2. 三軸與 rarity | **雲端未做**——照 §0.8 錨點制（第 89 條） | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **45 張全部寫完並過機器 QA** | `desc-tools/batches/output/c101-out-{1,2}.json` |
| 5. 固定試聽 | **37/45（82%）**，命中 `jp 32｜us 5` | `batch-progress/probe/previews.json` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

**簡介的機器 QA**：`qa-batch.mjs out c101` 全過；`fix-spacing` 兩檔各跑一次、待補 0；
主線另跑一次性複驗——**45 張的 `desc` 開頭與 `hook` 逐字相符**、
out-1 224–239、out-2 157–235（thin 3 張 157／159／174）、
**未具名出處 0 盞、本批五條硬禁令 0 命中**。

## 三、**試聽 21/45 → 37/45：十七張誤記 unavailable，一張 ready 是錯配**

**a 組救回 12 張、b 組救回 5 張**（全部以 `lookup?id=<collectionId>&entity=song` 覆核過曲目列攤得開、每軌有 previewUrl）。

**⚠ 最重要的一個形狀（`rulings.md` 第 8 條）——裁定 166 的反例**：
**Apple 常把日本遊戲原聲掛在「發行商／音樂團隊」而不是作曲家**，
作曲家的藝人頁目錄端點**看不到**，搜尋端點才看得到。本組四張是這個原因落空：

| 卡 | Apple 掛在誰名下 |
|---|---|
| NieR Gestalt & Replicant | **SQUARE ENIX MUSIC** |
| ペルソナ3 | **アトラスサウンドチーム** |
| ペルソナ5 | **アトラスサウンドチーム** |
| 悪魔城ドラキュラX〜月下の夜想曲〜 | **悪魔城ドラキュラ サウンドチーム** |

**兩張的盤名整個換成歐美版遊戲名**：古代祐三《Bare Knuckle》→《Streets of Rage》、
菊田裕樹《聖剣伝説2》→《Secret of Mana》。
**Chrono Cross 的方向與 FF 兩張相反**——FF IV／VI 是「卡片日文、Apple 英文」，Chrono Cross 是「卡片英文、Apple 日文」。
**Romancing Sa・Ga 有三種中點寫法**（全形「・」／ASCII「-」／半形「･」）。
b 組五張：DELTARUNE（OST vs Original Game Soundtrack）、Journey（**卡片盤名只有一個單字**，被長副標吃掉）、
Assassin's Creed II（**羅馬數字對阿拉伯數字＋彎撇號對直撇號**）、
FEZ（**七店的 search 端點全回 0、目錄端點有**——裁定 173 的實例）、Calling All Dawns（Apple 沒有那個副標）。

**一張 ready 是錯配**：Grant Kirkhope《Banjo-Kazooie》原記 jp 1592541500
**「Banjo Kazooie: Re - Jiggyed」——那是 2021 年的 10 軌重編曲盤**，
**而且策展層的 mbNote 早就把它寫成「刻意不釘」**（**裁定 153 附錄那個形狀第二次**：
策展層已經指名不要的東西，探測層又把它配了回來）。已改判 unavailable，⚠ **下游不得改配該 id**。

**八張確認真的沒有**：Super Mario 64／時のオカリナ／ムジュラの仮面（任天堂三張是四個藝人實體×六店面全空）、
Kingdom Hearts 2002（只有 HD ReMIX 合輯，全掛 Various Artists）、クロノ・トリガー 1995（只有 DS 版 78 軌）、
DOOM Eternal、Banjo-Kazooie、Donkey Kong Country 2。
**⚠ 遊戲原聲特有的陷阱**：後三張查無時，**搜尋結果裡塞滿了翻奏、鋼琴改編與 lofi 版**，
比「什麼都沒有」更容易讓人配錯。

## 四、兩張 ready 的軌數不是原盤軌數

- **FF XII**：Apple 那 98 軌是**數位版**，**原盤 CD 是 100 軌**——缺第四片第 19／20 軌
  〈Kiss Me Good-Bye〉與〈交響詩「希望」〉。**卡單的 `trackCount=98` 不是原盤軌數**，已鎖 `originalTrackCount=100`。
- **LIVE A LIVE**：Apple 的「(再発売)」43 軌是 **2012 SQEX-10308 加曲版**，**原盤 41 軌**。已鎖 `originalTrackCount=41`。

另 **VAGRANTSTORY**：策展層 rulings §9 把它列進「12 張 Apple 查無」——**不成立**，jp 647861379 是原盤、57 軌全對。

**三個軌數疑點排除**：UNDERTALE **101 軌就是數位原盤軌數**（黑膠才是 41 軌）；
**C418 兩張的新 collectionId 是整份目錄重新遞送**（「id 很新」不等於「是後來的版本」）；
**DOOM 31 軌對得上**（MB 那個更早的 `first-release-date` 2016-05-27 是一筆 **Bootleg**）。

**b 組六張的黑膠／CD 軌數少於數位**：Minecraft Alpha 24→12、Beta 30→17、Celeste 21→19、
DOOM 31→20、Ori 32→24/25、**Undertale 101→41**。**行文寫軌數時已標明載體，或乾脆不寫。**
**DKC2 美版帳面 55 軌，但真正的樂曲只有前 29 軌**（第 30–34 軌是 [silence]，之後全是數秒音效）。

## 五、策展層的時序／序數主張被攻破第十次：17 處，其中 10 處與來源相反

**a 組八處，共同形狀值得記——全都是「最／唯一／第一」，而且全都可以用它自己手上的同一批數字反證**：
FF IV「最早被美國市場接走」（FF VI 1994 SQ108 早七年）｜FF VI「篇幅最大」（IX 110、VII 85 > 61）｜
時のオカリナ「篇幅最大」（ムジュラ 112 > 82）｜Kingdom Hearts「第一張走一般零售通路」（LIVE A LIVE 1994 已是 NTT 出版）｜
Chrono Cross「再發次數最多」（Xenogears 13 > 10）｜VAGRANTSTORY「唯一單人掛名」（FF XII 也是崎元一人）｜
**FF XII「第一次交給植松以外的人」（本盤就收了植松的〈Kiss Me Good-Bye〉）**｜
月下「本批再發最多」（SH2 18 > 17）與 SH2「唯一日歐同日」（NieR:Automata 2017-03-29 JP+GB 同日）。

**b 組兩處**（都在 Undertale 卡）：「Toby Fox 名下唯一一張完整長篇原聲」——**同批就收了 40 軌的 DELTARUNE Chapter 1**；
「2010 年代獨立遊戲音樂有形化的起點」——無來源，且 Minecraft Volume Alpha 2011-03-04 就上架。

**三處事實更正**：ムジュラ 2015 TSCM-0029 是 **3DS 重製版原聲**不是重出；
NieR:Automata 黑膠是 **2017-09-21** 不是 12-20；
**Chrono Cross 的 MB `first-release-date` 1999-12-12 來自台灣盜版**，官方是 **12-18**。

**時序主張查證通過、確實寫進去的**：
Journey 是葛萊美 Best Score Soundtrack for Visual Media **史上第一張入圍**（**未得獎**）；
〈Baba Yetu〉是**史上第一次葛萊美頒給為電子遊戲寫的作品**（**得獎的是《Calling All Dawns》這張輯的錄音，不是 2005 年的遊戲版**）；
Bastion 是 Korb 配樂的**第一款**電玩；Minecraft Volume Alpha 是 Rosenfeld 的**第一張**商業發行、
2025 年入選 National Recording Registry 的**第二件**電玩音樂；
Banjo-Kazooie 是**最早採用垂直重混的遊戲之一**（維基原話「one of the first」，**不寫「第一款」**）。

## 六、掛名的逐項查證

- **崎元仁 / 岩田匡治**：MB 的順序是「岩田匡治 & 崎元仁」、**Apple 是「崎元仁 & 岩田匡治」**，卡片與 Apple 同序。
- **伊藤賢治 / 植松伸夫**：MB 兩人並列、**Apple 只掛伊藤賢治一人**、ja 維基也只記伊藤。
- **Akira Yamaoka 是本批唯一 MB 實體名本來就用拉丁的一位**（Apple jp 顯示「山岡晃」是店面在地化）
  ——池中 `Akira Yamaoka`／`山岡晃` 兩種寫法**都是 0 命中，沒有重複卡**。
- 四張掛在音樂團隊的（見第三節）**行文照卡片掛名，未寫成團隊作品**。

## 七、《Calling All Dawns》不是遊戲原聲帶

`secondary-types` 是空的。它是一張獨立的合唱／管弦作品，其中〈Baba Yetu〉出自《文明帝國 IV》。
**型態已照實記（裁定 167），行文未寫成遊戲原聲。**

## 八、遊戲發售年 vs 原聲帶發行年

a 組 24 張同年、2 張跨年（**ActRaiser 遊戲 1990-12-16／碟 1991-01-25，Apple 的日期標的是遊戲上市日**；
ペルソナ5 遊戲 2016-09-15／碟 2017-01-17）；**唱片早於遊戲 4 張**（FF IV −35 天、LIVE A LIVE −8、FF VI −8、Kingdom Hearts −1）。
b 組同日 4 張、**原聲早於遊戲 3 張**（Minecraft Alpha 早 8 個月、Hollow Knight 早 2 週、Hades 早 1 天）、晚於 9 張。

**「原聲早於遊戲」反直覺**，本批七張如此——行文都已標明講的是遊戲日還是碟。

## 九、本機接手要做的

1. 三軸與 rarity（§0.8 錨點制）、頂點資格評估。**這條線池中原本空白，錨點要另立。**
2. 45 張寫進 `seed_cards.json`、封面與試聽寫進 `album_overrides`、KV 與 Firestore 回讀。
   ⚠ **Banjo-Kazooie 不得改配 jp 1592541500**（2021 重編曲盤）。
3. 逐張審稿時對照 `desc-restyle/progress.json` 的**通論帳本**——雲端讀不到那個檔，
   只擋得住批內重複（`chk-hook-crossgroup` 45 張全過）。本批 45 種切入型態的清單見兩支 hook 代理的交件紀錄。
