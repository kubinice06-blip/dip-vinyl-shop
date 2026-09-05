## 2026-09-05 — dip-vinyl-shop — c-98 走完雲端段（鄉村民謠與歐洲拉美民謠，44 張）

- **改動摘要**：店主「接力做完十批」的一批，`lineType: 廣度`。
  **44 張、32 位掛名**（a 鄉村與美國民謠 23／b 歐洲與拉美民謠 21），年份 1945–1999。
  Hank Williams 3，Woody Guthrie／Pete Seeger／Tammy Wynette／Marty Robbins／
  The Louvin Brothers／Flatt & Scruggs／Georges Brassens／Léo Ferré／Víctor Jara／Alan Stivell 各 2。
  **零 §1 人工身分、零跨批撞卡、44/44 釘住 release-group。**
- **主要檔案**：`batch-progress/c98/`（prop-{a,b}、caa.json、chk-prop.mjs、**rulings.md 10 條**、HANDOFF.md）、
  `desc-tools/batches/research/c98-{a,b}.json`、`hooks/c98-hooks-{a,b}.json`、
  `input/c98-writer-{1,2}.json`、`output/c98-out-{1,2}.json`、
  `batch-progress/probe/previews.json`（**16 筆人工改寫**）、
  `batch-progress/fix-rgmbid.mjs`（**第 170／171 條的兩個修正**）。
- **驗證結果**：`qa-batch research/hooks/out c98` 全過、`chk-hook-crossgroup c98` 44 張
  （hook 加權 20–35、note 270–350）、`fix-spacing` 兩檔待補 0、`chk-prop.mjs` 標記 0。
  主線一次性複驗：**44 張 `desc` 開頭與 `hook` 逐字相符**、out-1 216–235、out-2 173–237、
  **未具名出處 0 盞、本批七條硬禁令 0 命中**。
  **封面 41/44、試聽 38/44（us 30／fr 4／gb 1／cl 1／es 1／ie 1）。**
- **這批的裁定與教訓**：
  1. **探測層被推翻十六筆，十批裡最高的一批**（試聽 26/44 → 38/44）。
     **一張配到別的藝人**：Hank Williams《Ramblin' Man》配到**孫子 Hank Williams III**
     2014 年的碟——`titleOk` 過得了（盤名完全相等）、`artistOk` 也過得了
     （`norm('Hank Williams')` 是 `norm('Hank Williams III')` 的子字串）。
     **`artistOk` 的雙向子字串比對對 Jr./III/父子檔家族天生無效**，
     鄉村、藍調、拉丁三條線都有這種家族，往後研究層要把「藝人是不是同一個人」當獨立一項查。
     十三張誤記 unavailable 全是盤名變形（只作《Sings》／`&` 對 `and`／單數對複數／班底副標／
     編號寫成尾綴／動詞在前／三重變形），兩張 ready 是錯配。
  2. **《The Chieftains》把三道防線同時打敗。** Apple 上叫《The Chieftains **1**》——
     `titleOk` 的 selfTitled 嚴格比對、第 168 條的卷號記號、第 77 條那族的數字殘餘，
     **三道都是對的規則，三道都擋掉了正解**。
     **「自我同名的首作」這個型態探測層天生配不到，只能人工釘。**
     順帶：`cl`（智利）與 `ie`（愛爾蘭）店面存在且回得出結果，但現行店面組都沒有它們。
  3. **這批是第 170／171 條的發源地**（記在 `c53/rulings.md`）。跑 c-99 探測時發現
     `fix-rgmbid.mjs` 的逾時 25 秒**比 MB 當天的回應（28–34 秒，回 200 不是 503）還短**，
     每一筆都逾時、`found` 永遠是空的，**整支腳本變成要跑七小時的空轉而畫面跟正常跑完一樣**；
     同一支腳本的 noPin 區段旗標還會把「刻意不釘：…」之後再提一次的**釘位**也掃掉，
     實測 **c-97 11/44、c-98 34/44、c-99 22/45 的卡等於沒跑過**。
     兩者都修好並以六批複驗（誤判 0；回問 1330 → 265 筆）。
     **c-97 與 c-98 用修過的版本重跑，各自「原本就對 39／44、修正 0」——已出貨的釘位確認無誤。**
  4. **策展層的時序／序數主張被攻破第六、七次，一批就佔兩次。**
     a 組五處與來源相反（Wynette「第三張」實為第四、Odetta 是 Vanguard 的**最後一張**不是入口、
     Louvin 的《Tragic Songs》**早於**本張、Dock Boggs「復出後第一張」無來源、
     Garth Brooks「商業曲線的轉折點」與數字相反）；
     b 組五處，其中最嚴重的是 **José Afonso《Venham mais cinco》「收錄〈Grândola, Vila Morena〉」是假的**
     ——該曲收在《Cantigas do Maio》，**而那張池中已經有了**。
  5. **策展層 catno 錯三處**（T 1385、CL 1951／CS 8751、Luke the Drifter 是十吋 E-203 與
     十二吋 E-3267 兩種規格），已改 `prop-a.json` 與卡單。
  6. **三張缺 CAA 圖**（Louvin《My Baby's Gone》、Dock Boggs、Violeta Parra），
     release-group 與轄下所有 release 端點逐一實測全 404，不是釘位問題。
     **這三張是「放寬 §4 讓釘住 MBID 的卡也能用 `apple-verified-collection` 取封面」的實例**——
     那個放寬是收尾要問店主的議題。
