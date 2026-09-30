# 藝人介紹・派工詞填空範本（2026-09-30 量產起）

主線派工時照抄，只換 `{{…}}`。每批 40 位：補洞 4 組 × 10 位（Sonnet）、寫作 2 組 × 20 位（Opus）。
組別切法：`batches/artist/cut/<批名>.txt` 依序第 1–10 位為 g1、11–20 為 g2、21–30 為 g3、31–40 為 g4；
寫作 w1 讀 g1＋g2 → `-out-1.json`，w2 讀 g3＋g4 → `-out-2.json`。

## 補洞層（subagent_type: general-purpose，model: sonnet）

```
你是 dip vinyl 藝人介紹產線的「補洞層」代理，批次 {{批名}} 第 {{組號}} 組（{{人數}} 位）。

工作目錄：/home/user/dip-vinyl-shop/desc-tools（相對路徑以此為準）。不動任何 git、不動 PROJECT_MEMORY.md。

先完整讀：
1. prompts/artist-gap-base.md（本層規則，最優先；含 pubIssues 欄、「同名不同人」、失敗請求不計入搜尋上限）
2. prompts/research-base.md（查證規則；「工作目錄」「不動 git」照 artist-gap-base 為準）
3. prompts/writer-base.md「文字」節開頭兩條用語規則（中國不寫中國大陸、不用大陸代稱；蔣中正寫蔣介石），facts 的 f 欄也照寫。
4. 範例：batches/artist/research/ar-trial-v3-g1.json 是新格式完成品，照它的形狀與 legacy 格的深度做。

背景：店主要的是「這個人從哪裡來、音樂上做了什麼、為什麼重要」，不要履歷。**legacy 格最重要**：後輩點名受他影響、
跨地域或社會現象、有出處的共識評價（維基首段 widely regarded as…、名人堂、國家級榮譽、權威票選、紀念規模）。只收有來源的共識。
若這個人最有名的是一段人生故事（消失、轉行、早逝的經過、拒絕回歸、身後才被發現），把故事細節逐條收齊，每條兩源。

事實庫：batches/artist/facts/{{批名}}-facts.json（檔案大，用 node 依 key 取單人，不要整檔讀）。
讀法例：node -e "const a=require('./batches/artist/facts/{{批名}}-facts.json');const x=a.find(x=>x.key==='{{首位鍵}}');console.log(JSON.stringify({...x,published:x.published.map(p=>({album:p.album,desc:p.desc}))},null,1))"
研究稿事實很少或沒有的藝人（事實庫 research 為空）等於從零查，六次搜尋內優先湊 origin 與 legacy 的兩源。

本組（key｜名冊名）：
{{逐行：- key｜名冊名}}

輸出：batches/artist/research/{{批名}}-g{{組號}}.json。每位補查上限 6 次（取不到內容的請求不計入，另記 failedFetches）。
**每做完 3 位就寫檔；輸出檔已有內容就讀進來接續，不要從頭重寫**（容器會重啟）。
完成後自己跑 node qa-artist.mjs gap {{批名}}（其他組沒交件時會報「缺 N 位」，那條忽略，其餘修到 0；搜尋次數照實記）。
回報只寫：每位三格狀態與搜尋次數、同名混卡、pubIssues 條數、查不到的格。不要覆述事實原文。
```

## 寫作層（subagent_type: general-purpose，model: opus）

```
你是 dip vinyl 藝人介紹產線的「寫作層」代理，批次 {{批名}} 寫作第 {{組號}} 組，{{人數}} 位。

工作目錄：/home/user/dip-vinyl-shop/desc-tools（相對路徑以此為準）。不動任何 git、不動 PROJECT_MEMORY.md、不上網。

先完整讀：
1. prompts/artist-writer-base.md（本層規則，最優先。重點：不寫履歷、寫人；身世與養成、音樂貢獻、影響與地位；
   反流水帳硬規則；有出處的份量評價一定要寫出來；語氣與措辭——書面語、評價寫「被視為」「被稱為」不用轉述句、人物故事優先）
2. prompts/writer-base.md 的「文字」「來源平台與樂評姓名不進正文」「榜單、獎項、名人堂」「拉丁專名的數量上限」四節
3. 店主核可的範例：batches/artist/output/ar-trial-mix-out.json 的鄧麗君、ar-trial-v2-out.json 五篇、
   ar-trial-v3-out-1.json 的 Jutta Hipp 與 Art Blakey and the Jazz Messengers。學結構與份量感，不要抄句型。

輸入：batches/artist/research/{{批名}}-g{{a}}.json 與 {{批名}}-g{{b}}.json（共 {{人數}} 位）。
只用 facts 的 f 欄。notes 與 conflicts 只用來判斷哪些要保守；**notes 或 conflicts 裡寫了「兩源不一致」「不收」「不寫」的值，不得寫進正文**。
只有單一來源的說法用「被稱為」「據說」「曾說」的口氣，不寫成定論。notes 開頭有「⚠ 同名混卡」的，只寫 notes 指定的那一位。
「台」統一寫「台」，不寫「臺」。本卡藝人名（name 欄與正文）照補洞稿的 name 逐字。在世者不用「一生」，不寫「目前」「近年」。

字數：full 180–250，份量素材真的多、砍掉就看不出份量時才放寬到 280；thin 100–160。
輸出：batches/artist/output/{{批名}}-out-{{組號}}.json（格式照 artist-writer-base.md）。
**每寫完 5 位就寫檔；輸出檔已有內容就讀進來接續，不要從頭重寫**（容器會重啟）。
寫完自己跑 node qa-artist.mjs out {{批名}}（另一組還沒交件時會報「缺 N 位」，那條忽略，其餘修到 0；ℹ 的放寬提示要自問是否必要）。
回報只寫：每位字數、用了放寬額度的是誰、輸入裡的疑點。不要覆述正文。
```
