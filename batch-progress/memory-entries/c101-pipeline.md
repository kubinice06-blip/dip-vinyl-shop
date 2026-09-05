## 2026-09-05 — dip-vinyl-shop — c-101 走完雲端段（遊戲原聲正典，45 張）

- **改動摘要**：店主「接力做完十批」的一批，`lineType: 廣度`。**這是池中原本完全空白的一條線。**
  **45 張、26 位掛名**（a 日本廠牌世代 26／b 獨立遊戲與西方大作 19），年份 1991–2020。
  植松伸夫 4，近藤浩治／下村陽子／光田康典／Darren Korb 各 3，
  崎元仁／古代祐三／岡部啓一／目黒将司／Toby Fox／C418／Austin Wintory／Mick Gordon 各 2。
  **零 §1 人工身分、零跨批撞卡、45/45 釘住 release-group、零池中重複卡（逐一實掃）。**
  規劃書的「Christopher Larkin 已 3 張」實掃更正為 **0 張**。
- **主要檔案**：`batch-progress/c101/`（prop-{a,b}、caa.json、chk-prop.mjs、**rulings.md 十二條**、HANDOFF.md）、
  `desc-tools/batches/research/c101-{a,b}.json`、`hooks/c101-hooks-{a,b}.json`、
  `input/c101-writer-{1,2}.json`、`output/c101-out-{1,2}.json`、
  `batch-progress/probe/previews.json`（**18 筆人工改寫**）。
- **驗證結果**：`qa-batch research/hooks/out c101` 全過、`chk-hook-crossgroup c101` 45 張
  （hook 加權 16.5–31、note 304–350、開頭前四字跨組互異）、`fix-spacing` 兩檔待補 0。
  主線一次性複驗：**45 張 `desc` 開頭與 `hook` 逐字相符**、out-1 224–239、out-2 157–235（thin 3 張）、
  **未具名出處 0 盞、五條硬禁令 0 命中**。**封面 45/45、試聽 37/45（jp 32／us 5）。**
- **這批的裁定與教訓**：
  1. **試聽 21/45 → 37/45，十七張誤記 unavailable。最重要的形狀是裁定 166 的反例**：
     **Apple 常把日本遊戲原聲掛在「發行商／音樂團隊」而不是作曲家**——
     NieR＝SQUARE ENIX MUSIC、ペルソナ3／5＝アトラスサウンドチーム、月下＝悪魔城ドラキュラ サウンドチーム。
     **作曲家的藝人頁目錄端點看不到，搜尋端點才看得到。**
     連同裁定 173，結論是：**兩個端點都要跑，而「藝人頁查無」在日本遊戲／動畫原聲上特別不可靠。**
  2. **兩張的盤名整個換成歐美版遊戲名**（《Bare Knuckle》→《Streets of Rage》、
     《聖剣伝説2》→《Secret of Mana》）；**Chrono Cross 的方向與 FF 兩張相反**
     （FF 是卡片日文／Apple 英文，Chrono Cross 是卡片英文／Apple 日文）；
     Romancing Sa・Ga 有**三種中點寫法**（全形「・」／ASCII「-」／半形「･」）。
  3. **Banjo-Kazooie 是裁定 153 附錄那個形狀的第二次**：探測配到 2021 年的 10 軌重編曲盤
     「Banjo Kazooie: Re - Jiggyed」，**而策展層的 mbNote 早就把它寫成「刻意不釘」**。
     已改判 unavailable。**策展層已經指名不要的東西，探測層又配了回來——這個病要盯。**
  4. **遊戲原聲查無時的特有陷阱**：DOOM Eternal、DKC2、Banjo 三張的搜尋結果裡
     **塞滿了翻奏、鋼琴改編與 lofi 版**，比「什麼都沒有」更容易讓人配錯。
  5. **策展層的時序／序數主張被攻破第十次：17 處，其中 10 處與來源相反。**
     a 組那八處的共同形狀值得記——**全都是「最／唯一／第一」，而且全都能用它自己手上的同一批數字反證**
     （FF VI「篇幅最大」但 IX 是 110 軌、FF XII「第一次交給植松以外的人」但**本盤就收了植松的〈Kiss Me Good-Bye〉**）。
     **策展層手上就有那些數字，只是沒有互相比對。**
  6. **六張的黑膠／CD 軌數少於數位**（Undertale 101→41 最誇張），**DKC2 帳面 55 軌但真正的樂曲只有 29**
     （第 30–34 軌是 [silence]，之後全是數秒音效）。**軌數要標明載體，或乾脆不寫。**
  7. **七張的原聲早於遊戲**（FF IV −35 天、Minecraft Alpha 早 8 個月等）——反直覺，
     行文都已標明講的是遊戲日還是碟。
