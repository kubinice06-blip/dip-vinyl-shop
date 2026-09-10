## 2026-09-05 — dip-vinyl-shop — c-102 策展提案（動畫原聲正典）

- **改動摘要**：新增 `batch-progress/c102/prop-a.json`（22 張）與 `batch-progress/c102/prop-b.json`（23 張），
  合計 **45 張、19 位藝人**，`lineType: 廣度`。
  - **a 組＝動畫原聲正典：菅野・久石・梶浦世代**（22 張、4 位）：
    菅野よう子 9（マクロスプラス 1994／天空のエスカフローネ 1996／COWBOY BEBOP No Disc 1998／
    COWBOY BEBOP BLUE 1999／∀GUNDAM 1999／攻殻機動隊 S.A.C. 2003／WOLF'S RAIN 2003／
    マクロスF O.S.T.1 娘フロ。 2008／残響のテロル 2014；其中兩張掛複合名「菅野よう子、シートベルツ」）、
    久石譲 7（魔女の宅急便 1989／紅の豚 1992／ハウルの動く城 2004／崖の上のポニョ 2008／
    風立ちぬ 2013／かぐや姫の物語 2013／君たちはどう生きるか 2023）、
    梶浦由記 6（NOIR I 2001／.hack//SIGN 1 2002／MADLAX 2004／the Garden of sinners 音楽集 2011／
    魔法少女まどか☆マギカ OST I 2011／Fate/Zero OST I 2012）。
  - **b 組＝動畫原聲正典：機械與劇伴**（23 張、15 位）：
    鷺巣詩郎 3（NGE II 1996／THE END OF EVANGELION 1997／EVANGELION:1.0 2007）、
    川井憲次 3（パトレイバー Volume 1 INTERFACE 1988／Patlabor 2 the Movie 1993／INNOCENCE 2004）、
    平沢進 3（BERSERK 1997／千年女優 2002／パプリカ 2006）、
    羽田健太郎 2（The S.D.F. Macross 1982／愛・おぼえていますか 1984）、
    澤野弘之 2（ガンダムUC 2010／進撃の巨人 2013）、
    渡辺岳夫 1（機動戦士ガンダム 1979）、天野正道 1（ジャイアントロボ I 1992）、
    大谷幸 1（ガンダムW OPERATION 1 1995）、田中公平 1（トップをねらえ! 音楽大図鑑 1989）、
    大野雄二 1（Original Soundtrack from Lupin III 1978）、菊池俊輔 1（ドラゴンボール 音楽集 1986）、
    神前暁 1（化物語 音楽全集 2011）、Nujabes / Fat Jon 1（samurai champloo music record: departure 2004）、
    大島ミチル 1（鋼の錬金術師 OST 1 2004）、横山菁児 1（聖闘士星矢 音楽集 1987）。
  - **`primary-type` 全部是 Album**；`secondary-types` 43 張是 `[Soundtrack]`、2 張是
    `[Compilation, Soundtrack]`（梶浦由記《the Garden of sinners》、神前暁《化物語 音楽全集》）。
    依 §5.6 明文與 c-90 裁定第 3 條，`primary-type=Album` 照一般 Album 寫法，
    **`exceptionReason` 與 `exceptionEvidenceUrls` 全部留空，走 §5.6 的合輯 0 張。**
    `primary-type=Compilation` 0 筆——**與 c-95（1,676 個 RG）、c-98（2,051 個 RG）的實測一致，
    本批分頁掃了 1,922 個 RG 也是 0 筆。**
- **主要檔案**：`batch-progress/c102/prop-a.json`、`batch-progress/c102/prop-b.json`、
  `batch-progress/c102/rulings.md`、`batch-progress/memory-entries/c102-curation.md`（本檔）。
- **驗證結果**：`node batch-progress/c102/chk-prop.mjs a b` → 45 張、19 位、**標記 0**；
  串跑 `dedup-crossbatch.mjs` 掃 53 批（其中 4 批讀 prop）、2,435 張卡，**跨批撞卡 0**
  （含同時在跑的 c-101 遊戲原聲）。
  45 張全部釘住 release-group MBID 並**逐一回問
  `release-group/<id>?fmt=json&inc=artist-credits+releases`**（第 41 條），確認 title、artist-credit、
  first-release-date、primary-type、secondary-types 與轄下 release 的國別／status；
  另以 `release?release-group=<id>&inc=labels` 逐張取原盤廠牌與目錄號。
  藝人目錄一律用 `release-group?artist=<MBID>&limit=100&offset=` 分頁（第 116 條）——
  久石譲 266、川井憲次 248、澤野弘之 181、田中公平 151、平沢進 131、鷺巣詩郎 123、梶浦由記 122、
  菅野よう子 112、大島ミチル 103、大野雄二 86、大谷幸 76、神前暁 79、羽田健太郎 58、宮川泰 41、
  天野正道 34、菊池俊輔 34、横山菁児 34、渡辺岳夫 25、芸能山城組 18 個 RG，**合計 1,922 筆全列**
  （預設 25 筆的 browse 在久石譲身上會漏掉九成）。
  撞卡檢查在 `seed_cards.json` 全 14,424 列上做，**日文與羅馬拼音兩種寫法各掃一遍**
  （久石／Hisaishi、菅野／Kanno、梶浦／Kajiura、鷺巣／Sagisu、川井／Kawai、平沢／Hirasawa、
  大野雄二／Yuji Ohno、澤野／Sawano、神前／Kousaki、芸能山城組／Yamashirogumi 等），
  並依第 71 條**以盤名為主鍵再掃一次**（作品名的日文、羅馬拼音、英文譯名三種）——真撞卡 1 筆，見下。

### 這批的裁定（策展層自決，依 2026-09-02 店主下放；全文見 `batch-progress/c102/rulings.md`）

1. **簡報說「久石譲池中僅 1」是錯的——實掃是 7 張，簡報點名要補的三張（トトロ／ナウシカ／もののけ姫）池中全部已有。**
   成因是規劃時用羅馬拼音 `Joe Hisaishi` 抽測，而池中六張掛日文新字体「久石譲」——
   **第 115 條「我提案用轉寫、池中用漢字」的同一個形狀，也是第 27 條第六次應驗。**
   久石譲改補真正缺的七張。
2. 池中久石譲有兩個掛名鍵（`久石譲` 6 張／`Joe Hisaishi 久石讓` 1 張），本批七張一律沿用前者（MB 實體名），
   不製造第三個鍵；`Joe Hisaishi`／`久石讓` 進 `queryAlias`。屬線上資料的併鍵留給本機。
3. 十四位作曲家的 MB 實體名全部是日文，掛名依第 70／120 條一律取日文；
   **但 Apple 的藝人條目幾乎全掛羅馬拼音**（Yoko Kanno／Yuki Kajiura／Shiro SAGISU／Kenji Kawai…），
   羅馬拼音一定要進 `queryAlias`，探測層打藝人頁才找得到人。
4. 六處 artist-credit 不是單一作曲家（マクロスプラス 掛 Israel Philharmonic、機動戦士ガンダム 掛
   渡辺岳夫 / 松山祐士、Macross 兩張 Apple 掛主唱 飯島真理、∀GUNDAM 與 Gガンダム Apple 掛 Various Artists、
   ガンダムW Apple 掛 大谷幸, TWO-MIX & 大石ルミ），全部依第 121 條取作曲者掛名，原文寫進 `mbNote` 與 `risk`。
   **唯一例外**是 Nujabes / Fat Jon《departure》——那是兩人共同署名的碟，另立共同掛名鍵。
5. Cowboy Bebop 兩張沿用池中既有的複合掛名 `菅野よう子、シートベルツ`（與 MB artist-credit 字串完全相同）。
6. **空の境界改釘 2011 音楽集**（4aaf1dff），七張分章 OST 依第 87 條（分卷不是一張碟）寫進「刻意不釘」。
7. **化物語同理釘 2011 音楽全集**（c39bf004）——2010 那兩張的 MB RG 標題把 OP 單曲名串進了劇伴集名
   （`「sugar sweet nightmare」&「化物語」劇伴音楽集 其ノ壹`），卡片盤名無法乾淨取用，是第 152 條的建檔面版本。
8. 四張未收：宮川泰《交響組曲 宇宙戦艦ヤマト》**真撞卡**（MB 記英文《Symphonic Suite Yamato》、
   池中記日文，是同一張碟，`chk-prop` 兩道都判不出來——第 49 條第一種形狀）；
   芸能山城組（AKIRA 該收的池中已有，國際版收了就是分裂鍵）；
   渡辺岳夫《アルプスの少女ハイジ》（MB 兩個候選 1974 英文名／1996 日文名都對得上，依第 73 條釘不住就不收）；
   田中公平《Gガンダム ROUND 1&2》（資料齊全，純因張數上限割捨，要擴編可直接補）。
9. 五處盤名微變體依第 50 條取通行寫法（WOLF'S RAIN 的彎引號、残響のテロル 的「」、
   EVANGELION:1.0 的彎引號、機動戦士ガンダム 的半形中黑）；
   **崖の上のポニョ 例外走第 45 條**——RG 短標題會指到藤岡藤巻と大橋のぞみ 2007 年的同名主題曲單曲，
   改取 JP 官方 release（TKCA-73340）的《崖の上のポニョ サウンドトラック》。
10. 與 c-101 的分界照派工信「遊戲歸 c-101、動畫歸 c-102」：本批把菅野よう子的光栄遊戲 12 張、
    田中公平的サクラ大戦 全系列、以及**平沢進 1999 年的《ベルセルク 千年帝国の鷹篇 …
    オリジナルゲームサウンドトラック》**全部寫進「刻意不釘」讓給 c-101，本批只收 1997 年 TV 版的《BERSERK》。
    `dedup-crossbatch` 與 c-101 `prop-a.json` 比對結果 0 筆重疊。

### §1 候選（MB 釘不住或型別不符，本批不開 §1，記給 c-113～c-115）

- **渡辺岳夫《アルプスの少女ハイジ》**：MB 兩個 RG（9b27a147 英文名 1974-01-06／e8bb16ea 日文名 1996-03-06）
  都對得上，要收得先舉證哪一個是 1974 原盤。
- **宮川泰 除《交響組曲 宇宙戦艦ヤマト》以外的原盤**：名下 41 個 RG 有 40 個是 1995 年之後的
  BGM コレクション／YAMATO SOUND ALMANAC 再發，1974–83 年的原盤 MB 上幾乎沒有獨立條目。
- **芸能山城組《Akira: Original Motion Picture Soundtrack》**（53c4d1be）：與池中既有的
  《Symphonic Suite AKIRA》是同一份音樂的兩種發行，收了就是分裂鍵；要收得先裁定併鍵方式。

### 封面與試聽預估

- **jp 店面（GAME 序第一順位）**：45 張裡 **28 張**在 Apple jp 找得到明確的 `collectionId`
  （已逐張寫進 `risk`），其中 **8 張是靠藝人頁 `lookup?id=<artistId>&entity=album` 才撈到的**——
  用原文盤名走 `search` 端點回 0 筆，**第 166 條的形狀在動畫原聲上與嘻哈一樣普遍**
  （マクロスプラス 469332697、天空のエスカフローネ 491294074、マクロスF 469356626、MADLAX 1554832043、
  the Garden of sinners 1576617520、INNOCENCE 911385018、ガンダムUC 1524640230、BERSERK 1652625970）。
- **us／gb／de／fr／ca／au**：只多救回 1 張（∀GUNDAM 在 us 是 1522451466，掛 Various Artists、
  盤名 TURN A GUNDAM (Original **MoCon** Picture Soundtrack I)，Apple 那邊自己的錯字）。
  **jp 對 us 大約是 28 比 1，第 158 條在這個品類完全成立。**
- **Apple 全店面 0 筆的 16 張**集中在三塊：1980 年代東映與 Sunrise 的 LP 期原盤
  （ドラゴンボール／聖闘士星矢／機動戦士ガンダム／The S.D.F. Macross／トップをねらえ!／ジャイアントロボ／
  パトレイバー 兩張）、平沢進自營廠牌 Teslakite 的兩張（千年女優／パプリカ）、
  以及 1990 年代 EVANGELION TV 版與 まどか☆マギカ／Fate/Zero 的分冊 OST。
  這些要走 §6 的第二順位（YouTube 官方專輯播放清單）或依 §4 人工核對的 `collectionId`。
- **封面**：45 張全部有 release-group MBID，CAA 這條路可走；日本盤在 CAA 的覆蓋一向比歐美盤薄，
  預估 CAA 命中約六到七成，其餘退到已記下 `collectionId` 的 Apple 頁（§4 `apple-verified-collection`）。

### 這個品類補完之後還剩多大的洞

補完之後日本動畫原聲的**正典主幹**（菅野・久石・梶浦・鷺巣・川井・澤野・平沢・大野・羽田・渡辺岳夫）
在池中就從 12 張變成 57 張、從 9 位變成 24 位，等於這個品類第一次有骨架；
但**仍空的是 1960–70 年代的東映／虫プロ第一代**（渡辺宙明、菊池俊輔的仮面ライダー與ドラえもん線、
横山菁児 的キャプテンハーロック、青木望 的銀河鉄道999 除既有那張以外、宮川泰 的ヤマト原盤——
這一整代在 MB 上多半只有 1995 年之後的 BGM コレクション 再發，屬 §1 補遺批的範圍），
以及**2015 年之後的新一代**（牛尾憲輔、横山克、林ゆうき、岩崎太整、椎名豪 池中皆 0）。
