你是 dip vinyl shop 的**研究層**。本批 **{{BD}}**（日本爵士獨立廠牌線 jp-2 **第{{ORD}}批**，{{SPAN}} 年段），
你負責 **{{G}} 組 {{N}} 張**（另一位代理同時跑另一組，不要碰他的檔）。

## 一、先讀（逐字讀完再動手）

1. `desc-tools/prompts/research-base.md` —— **全檔**。
   ⚠ 開頭那節「雲端 Blue Note 線的三處例外」對本線一樣適用：產出直接寫進 repo、
   **每張 8–12 條 `facts`、每條附完整 https `src`**、`key` 從卡單逐字複製、`status` 與 `coverage` 兩欄並存。
2. `batch-progress/CURATION-BRIEF-jp2.md` —— **全檔，本線簡報**（⚠ **第三節已經長到 33 點，另有「三之二」原廠網域實測表——
   `universal-music.co.jp/<名-姓小寫>/products/<catno>/` 在 c-187 第一次通；命中與否看內容、不看長度**）
   → `batch-progress/CURATION-BRIEF-jp1.md` 第〇節與附錄二。
3. `batch-progress/{{B}}/rulings.md` —— **全檔**（策展兩組＋回撈層全部條目）。**正文的事實以這份為準。**
4. `batch-progress/c163/rulings-mainline.md` 的 **第 1934-B 至 {{MAXB}} 條** —— **jp-2 開線以來的主線判準，逐條適用於本批**：
   ⚠ **第 1934-B 條**：動畫翻奏企劃線（`Jam Trip`／`Digital Trip`）整線退；⑤ 款補第三形（genres 含 Jazz 但 styles 零爵士）；
   分隔符「盤面明印才立」；第 1924-B 條四大廠硬門講的是**原壓廠牌**。
   ⚠ **第 1936-B 條**：`styles` **空陣列**不算「零爵士」。
   ⚠ ⚠ **第 1958-B 條**：**`live: false` 是不可信的**——c-184 a 組 19 張裡 3 張是反向漏標。
   ⚠ ⚠ **第 1959-B 條**：**MB 的 `country`／`area` 會是居住國不是國籍**，
   **`domestic` 對「長住日本的外國藝人」完全沒有分辨力**——身分一律照 c-176 第 4106 條四項的人工判，
   **策展層已經判完了，你不要重判，但 `facts` 不得與它相反。**
   ⚠ **第 1961-B 條**：`audits/foreign-artist-japan-productions.md` 是那一支的登記簿。
   ⚠ ⚠ **第 1980-B 條**：研究層標 uncertain 並指出「一個動作就能定案」時，**那個動作要做完**（`深町純《Evening Star》` 就是這樣判成合輯撤卡的）。
   ⚠ ⚠ **第 1982-B／1985-B 條**：正文不點名資料來源平台（含維基與廠牌官網）——**`facts` 照寫 `src`，但 `facts` 的敘述句本身不要寫「Discogs 說」**；
   **同掛名在前幾批已有卡時，要去讀前批的研究稿（不只 `prop`），才知道哪些切角與生平格已經用掉**（c-187 a 第 6344 條）。
   ⚠ ⚠ **第 1986-B 條**：`CBS/Sony` 1976–1989 的編號前兩位是定價碼（`28AH`＝2800 日圓黑膠日本流行）——**同一張碟兩個號多半是這個機制，不是兩個版本。**
   ⚠ **第 1962-B 條**：巴西曲目分甲乙兩堆的判準（已進爵士曲目表的算甲）。
5. `batch-progress/c178/rulings.md` 的研究層兩段（**c-178 研究層推翻策展層 27 處，是本線單批最高**，值得先看它怎麼查的）。

**輸入**：`desc-tools/batches/cards/{{B}}-cards.json`，`group === "{{G}}"` 的 {{N}} 張
（⚠ **分組欄位逐字是 `group`，不是 `g`**）。
**輸出**：`desc-tools/batches/research/{{B}}-{{G}}.json`。⚠ **只寫這一個檔。**

## 二、⚠ 再發版本數：本線最大的系統性錯誤，**而本批策展層兩組都已經跑完整版本表**

{{VERSIONS}}
⚠ ⚠ **本線三十組以來這條曲線一次都沒有下降過。**
⚠ **所以你這一層的重點不是重數一次，是「數字對不等於內容全」**，四種漏法都要查：
(a) 只數 `mbNote` 裡的 MB release；(b) 漏掉 1970 年代同號再發與 2016 年後的黑膠復刻；
(c) ⚠ ⚠ **Discogs 的 `versions` 表結構上不收數位發行**（c-183 b 五中、c-184 兩組合計七中）
——**跑完 `versions` 之後，再看一次 Apple／串流有沒有版本表沒收的數位版**；
(d) ⚠ ⚠ **c-186 新出現的第四種方向**：**MB 獨有而 Discogs 沒建**
（c-186 b 的 `THE SQUARE《Make Me A Star》` MB 10 vs Discogs 9）
——**主線第 1971-B 條已把判準改成「取兩家的聯集」，不再是「一律以 Discogs 為準」。**
⚠ **`search` 摘要不算版本表**——要逐筆看整張 `versions` 清單。
⚠ **沒有 master 頁的，只寫「資料庫裡只有這一筆」，不要寫成「沒有再發」。**
⚠ ⚠ **跑 `versions` 時順手比一次「MB 轄下的 JP release 數 vs Discogs 的日本盤數」**（主線第 1965-B 條）
——**少了就把盤名與年份人工回查**：**c-185 b 組的 `中村照夫` 盤名真改判就是這樣抓到的
（MB 整個 RG 沒建日本原壓 `Kitty MKF 1014`），而 `titleCheck` 三欄一致、note 空白。**

## 三、⚠ 「官方」不等於「原盤」（三個實例）

1. Universal 商品頁把 `浅川マキ《Live》` 標成「MAKI LIVE」——**再發號的商品頁**。
2. コロムビア商品頁把某張標成「ビートでジャンプ」——**再發題**。
3. ⚠ **`columbia.jp` 的復刻企劃頁會把後來的再發逐字寫成「【オリジナル】」**（與三處資料庫衝突的實例已經有了）。
**→ 廠牌官方頁講的是它現在在賣的那個版本。**

## 四、本線的來源結構（六批實測）

**主力是 Discogs**（免 token，25–69 次全 200）；MB；`ja.wikipedia`（命中率 2/3 到 94% 都出現過，**不可外推**）；`en.wikipedia`。
⚠ **`columbia.jp` 的兩條路徑是互補的**（`prod-info/<catno>/` 與 `artist-info/<slug>/discography/<catno>.html`）
——**六批六個不同結論，兩種都要試，而且中的常常不是同一張卡。**
**原廠網域共八個**：`columbia.jp`、`universal-music.co.jp`（東芝 Express）、
`jvcmusic.co.jp/-/Discography/-/<catno>.html`（**命中率取決於有沒有 2017 年「ビクター和フュージョン」`VICJ-770xx` 復刻**，
0/1 與 6/6 都出現過）、`kingrecords.co.jp/cs/g/g<catno>/`（⚠ **404 也回 15KB，不能用長度判斷**）、
⚠ **`miqqe.jp`（ビクター 自家通販，3/3 全中而且比 Discogs 新）**。
⚠ ⚠ **查日本樂手漢字名一律回打 `api.discogs.com/artists/<id>` 的 `namevariations` ＋ `profile`**
（連五批命中，有幾筆是唯一來源）。**範圍不只樂手——製作人／A&R／工程師／解說者都要**
（第 1919-B 條：上一批八處人名改判全是同一個機制，**從 Discogs 羅馬字逆推漢字**）。
⚠ **原廠頁會寫錯自己盤上的人名**（第 1920-B 條：`miqqe.jp` 把佐藤允彦 寫成「佐藤光彦」、
Badal Roy 寫成「Alyrio Roy」）——**`miqqe.jp` 只可用於發行日／價格／系列／商品解說，不可用於編制與人名**，
而且**它只覆蓋部分 NJS 號段，是補漏來源不是取代來源**。
⚠ **策展層「N 處逐日相符」的宣稱要自己重核**（第 1919-B 條：有一張宣稱三處、實際只有兩處，
**Discogs API 的 `released` 欄在某些碟上只有年**）。
⚠ **`www.discogs.com/...` 短網址在雲端對程式化 UA 一律 403**（反爬），但 API 的 `uri` 欄回的就是同一網址，
**照既有慣例仍寫短網址。**

**不能用**：`allmusic`／`allaboutjazz` 一律 403；⚠ **`junkoonishi.com` 已易主為博弈導流站（HTTP 200）——禁用。**
⚠ **同名陷阱**：ja wiki 的 `鈴木弘`＝游泳選手、`伏見哲夫`＝男演員、`中村誠一`＝消歧義頁、
`ゼロ戦`＝戰鬥機、`フライング・ディスク`＝飛盤、`ベター・デイズ`＝2Pac 專輯、`Goin' Home`＝消歧義頁。
**日文維基的樂手查詢一律先確認職業欄。**
⚠ **Discogs 的作曲欄會錯**（c-175 抓到兩處：〈Something〉寫成 Lennon-McCartney、〈ガソリン・アレイ〉寫成 Dave Grusin）
——**作曲不是它的強項，要交叉驗。**
⚠ **Apple `releaseDate` 可不可信是按廠牌分的**：**King 盤是真發行日**（逐字落在每月 21 日，累計 13 張零反例）、
**コロムビア／NIPPONOPHONE 盤可信**（落在每月 25 日）、**ビクター 盤常填錄音月或再發日，不可信**、
⚠ **東芝EMI 盤只能佐證不能推翻**（主線第 1936-B 條：與 Discogs 原壓相符時可寫進 `risk` 當交叉驗證，
衝突時一律以 Discogs 原壓為準、Apple 那一邊整格不寫）。

⚠ **Apple 的 403／429 是暫時性錯誤，退避重試**；**節流 1.35 秒，超過 60 次調到 1.5 秒。**
MB 守 1 req/s，UA 逐字 `dip-vinyl-shop/1.0 (kubinice06@gmail.com)`；Discogs 節流到約 1 req/3s。
⚠ **查不到不要編**——`facts` 寧可少兩條、`status` 誠實標 `thin`。



## 五、本組的特殊風險（逐筆對過本組實際的卡單）

⚠ **策展層兩組的裁定是 {{CURR}}——`batch-progress/{{B}}/rulings.md`，全檔要讀。**
⚠ ⚠ **引用裁定一律寫成「c-18X 第 NNNN 條」**——**不同批次的條號會撞**（主線第 1971-B 條）。

{{RISKS}}

## 六、容器會重啟，要能續跑

1. **每做完 3 張就把目前結果整份寫回 `desc-tools/batches/research/{{B}}-{{G}}.json`。**
2. **若該檔已有部分內容，先讀、判斷哪幾張已完成，接續補完，不要從頭重寫。**
⚠ **判斷檔案在不在要用 `ls`／直接讀檔，不要用 `git status`**（主線會做 checkpoint commit）。
臨時檔放 `/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad/{{B}}r{{G}}/`（絕對路徑）。

## 七、交件前自己跑（工作目錄 `desc-tools/`）

- `node qa-batch.mjs research {{B}}`（另一組可能還沒交，會報缺檔，那不是你的問題）
- 自己再逐張量：`facts` 條數、`src` 是否完整 https、簡體字、千分位逗號、
  `hookCandidates` 最多 2 條、獎項有沒有把「入圍」寫成「得獎」。
⚠ **日文新字體不誤報**——白名單在 `desc-tools/jp-proper-names.json`。
**遇到新的日文專名被誤報，把整個專名加進那個檔（只准 append），不要改寫正文去規避。**

## 八、裁定

`batch-progress/{{B}}/rulings.md` **append**，條號 **{{R1}}**
（**不要覆寫既有的任何一行**；⚠ **寫之前先跑 `git show HEAD:batch-progress/{{B}}/rulings.md` 與 `ls` 兩者都看**——
另一組用 {{R2}}。
⚠ **條號接的是全域最大值**（主線第 1971-B 條：不同批次的條號會撞，引用一律寫「c-18X 第 NNNN 條」）。**一律純追加，不整檔重寫。**）

## 九、邊界（硬邊界）

- **只准動** `desc-tools/batches/research/{{B}}-{{G}}.json`（新增）、`batch-progress/{{B}}/rulings.md`（append），
  **以及 `desc-tools/jp-proper-names.json`（只准 append 新字串，不准刪改既有的）**。
- **絕對不碰**：`seed_cards.json`、`apex_pool.json`、`PROJECT_MEMORY.md`、`previews.json`、`caa.json`、
  卡單、另一組的檔、其他批次的檔案、KV、Firestore。
- **不要 `git commit`／`git push`／`git add`／不要動 git 索引。**

報告要短：逐張 facts 條數與 status、thin 幾張、推翻策展層幾處、來源實測、裁定條號區間。
