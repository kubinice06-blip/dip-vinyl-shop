你是 dip vinyl shop 的**策展層**。本批 **{{BD}}**（日本爵士補遺線 hoyi 第{{ORD}}批，**{{SPAN}} 年段**），
你負責 **{{G}} 組 {{N}} 張**（另一位代理同時跑另一組，不要碰他的檔）。
⚠ ⚠ **這一條線是 jp-1（四大廠）與 jp-2（十五家獨立廠牌）收線後的補遺**——**兩條線的全部機制都沿用**，
本線只改了「四堆各自的收件門檻」（見第二節）。
⚠ ⚠ **`batch-progress/{{B}}/rulings.md` 已經由主線建好了**——**不要「建立」它，只 append 自己那一段**
（c-185 的 b 組 30 條裁定就是被並行的另一組整份蓋掉的）。

## 一、先讀（逐字讀完再動手）

1. ⚠ ⚠ `batch-progress/CURATION-BRIEF-hoyi.md` —— **本線簡報，全檔**（四堆各自怎麼判寫在第〇節）。
2. `batch-progress/CURATION-BRIEF-jp2.md` —— **全檔**（第三節已長到 35 點，含 `house: Denon` 找 LP 原壓、`28AP 3xxx` 看 ℗ 行、原廠網域實測、維基改用 `index.php?action=raw`）。
3. `batch-progress/CURATION-BRIEF-jp1.md` —— **全檔**（欄位定義、三道池比對、曲風判準、Discogs／MB 的每一種失效、交付格式）。
4. {{READ_S1}}
5. `batch-progress/c163/rulings-mainline.md` 的 **第 1934-B 至 {{MAXB}} 條**（**第 2007-B 條起是本線的**）。
6. ⚠ **最近收線的四批**：`batch-progress/c18{8,9}/rulings.md`、`c19{0,1}/rulings.md` 的策展兩段（**引用裁定一律寫「c-18X 第 NNNN 條」**）；
   以及 `audits/between-the-lines-candidates.md`、`audits/foreign-artist-japan-productions.md` 兩份登記簿。
7. 固定規格鏈：`CURATION-BRIEF-bluenote-post1985.md`（含附錄二）→ `CURATION-BRIEF-bluenote.md` → `CURATION-BRIEF-c131.md`。**一字不改。**
8. `audits/pool-artist-name-splits.md`、`batch-progress/enum/name-corrections.json`（`pairs`／`_to_romaji`／`_romaji_collisions`／`_entity_mislinks` 四欄的差別要讀懂）。

**輸入**：`batch-progress/{{B}}/slice.json` 裡 `g === "{{G}}"` 的 {{N}} 筆（**每筆帶 `pile` 欄，1–4**）。
**輸出**：`batch-progress/{{B}}/prop-{{G}}.json`（**每一筆多帶 `pile` 欄，原樣照抄 slice**）。

## 二、⚠ ⚠ 本組的四堆（判準按堆走，細節在簡報第〇節）

{{PILES}}

## 三、⚠ slice 的提示欄（與 jp-2 同）

1. **`poolRecheck`**（今天的池重掃、六道全開＋`titlesSeen`）：**本組「確定撞池」{{SURE}} 筆、「要逐張人工比」{{MAN}} 筆、「池中查無此藝人」{{NONE}} 筆、「變體全是羅馬字」{{ROMA}} 筆。**
   ⚠ ⚠ **六道都只是候選產生器——每一筆都要自己再掃一次池，掛名的每一種寫法都試**；
   ⚠ ⚠ **第 4 堆的外國藝人池中多半已有他們的美國盤**——**同一場錄音在日本與美國各出一版就是撞池**（第 1948-B 條看的是錄音）。
2. **`titleCheck`**：`album` 欄以「最早 release 的 title」為準；**本組 `note` 有警語的 {{TNOTE}} 筆。**
3. **`priorRulingHits`**（這個 RG 在更早批次的裁定標題裡出現過）：**本組 {{PRIOR}} 筆**——**讀那一條，判斷退件理由在本線還成不成立**
   （第 4 堆的舊退件理由多半是「第 4106 條四項」，**那一條在本線取消**；但同一條裡若還有曲風、演奏主體、乙過半、合輯、原盤在外國等理由，**那些照樣成立**）。
4. **§1 那幾筆沒有 `rgMbid`，也就沒有 `poolRecheck`／`titleCheck`**——**池比對與盤名全部自己做。**
5. ⚠ **`source` 欄的準確度（c-193 b 實測）**：標「甲」的 10 張全是日本原盤；**標「不明」的 4 張沒有一張是**（MB 的「同日」其實只填到年份）——**「不明」先假設是授權壓片，逐張查 Discogs 最早那一版。**
   ⚠ ⚠ **「甲」也會錯（c-193 a 實測 4/12）**：MB 對 **MPS／Freedom／GMP** 這幾家歐洲原盤常常只建了日本版。**兩個必查特徵**：`house: columbia` 配上 MPS 系的歐洲樂手；**日本盤的 `labels` 欄同時印著外國目錄號**——遇到就先假設是授權版。
   ⚠ ⚠ **c-196 b 實測：「甲」13 筆錯 3、「不明」2 筆反而都是日本原盤**——`source` 欄只能當提示。再加三個必查特徵：
   **日本盤印著 `Licensed by`／`Licensed Through`**（授權版）；**同名廠牌陷阱**（美國 King 被 MB 連到日本キング）；
   **Discogs 同一張有兩個 master、日本那個晚一年**（改編授權，例：Clayderman）。
   ⚠ **西德 Bellaphon 版先看它沿用誰的目錄號**（c-197 a 第 7734 條）：K 字號是 King、`GW-`／`CJ-` 是 Concord、`MCD` 是 Limetree——**Bellaphon 替好幾家代工，看到它不能就當成 King。**
   ⚠ **日本原壓早好幾年、外國版 ℗ 寫外國公司卻沒有 Licensed 字樣時**（c-198 a 第 7979 條，`David Matthews《Super Funky Sax》`）：**先發地優先**，外國版上印著日本方的製作人／母帶師就是旁證；反轉條件寫明。
   ⚠ **日本先發而 Apple 寫外國公司的 ℗**（`℗ 1972 Fantasy`）時：**先發地優先，但 `risk` 寫明反轉條件**（c-193 a 第 7315 條）。

## 四、⚠ 再發版本數、官方不等於原盤、其餘（全部照 jp-1／jp-2）

- **`/masters/<id>/versions` 全表不可省**；版本數取 MB 與 Discogs 的**聯集**；沒有 master 頁的只寫「資料庫裡只有這一筆」。
- **廠牌官方頁講的是它現在在賣的那個版本**（「【オリジナル】」也會是再發）。
- **掛名照第 307 條池中先例**；外國藝人照 MB 實體名與池中先例；**`with`／`Featuring` 照盤面**。
- MB 守 1 req/s，UA 逐字 `dip-vinyl-shop/1.0 (kubinice06@gmail.com)`；Discogs 約 1 req/3s；Apple 403／429 退避重試。

## 五、容器會重啟，要能續跑

1. **每做完 5 筆就把目前結果整份寫回 `batch-progress/{{B}}/prop-{{G}}.json`。**
2. **若該檔已有部分內容，先讀、判斷哪幾筆已完成，接續補完，不要從頭重寫。**
⚠ **判斷檔案在不在要用 `ls`／直接讀檔，不要用 `git status`**（主線會做 checkpoint commit）。
臨時檔放 `/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad/{{B}}{{G}}/`（絕對路徑）。

## 六、交件前自己跑

- `node batch-progress/{{B}}/chk-prop.mjs {{G}}` —— **標記 0 才算交件**。
- `node batch-progress/dedup-crossbatch.mjs`（**不帶批號跑全池**）。
- 第 315 條結算：收 ＋ 退 ＝ {{N}}；**逐堆也結算一次**（例：第 4 堆 收 x 退 y）。

## 七、裁定

`batch-progress/{{B}}/rulings.md`（**主線已建好骨架**），條號 **{{R1}}**（另一組用 {{R2}}，不要越界）。
⚠ **寫之前先跑 `git show HEAD:batch-progress/{{B}}/rulings.md` 與 `ls` 兩者都看**，**只 append 自己那段、絕不覆寫對方的**。

## 八、邊界（硬邊界）

- **只准動** `batch-progress/{{B}}/prop-{{G}}.json` 與 `batch-progress/{{B}}/rulings.md`；**以及 `desc-tools/jp-proper-names.json`（只准 append）**。
- **絕對不碰**：`seed_cards.json`（唯讀掃描可以）、`apex_pool.json`、`PROJECT_MEMORY.md`、其他批次的檔案、另一組的 `prop` 檔、KV、Firestore。
- **不要 `git commit`／`git push`／`git add`／不要動 git 索引。**

交件報告要短：收幾退幾（逐堆）、退件的條款分佈、§1 走人工身分幾張、年份／盤名／live／再發數改判幾筆、裁定條號區間、需要上層裁定的事。
