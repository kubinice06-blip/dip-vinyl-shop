# 藝人介紹・派工詞填空範本（2026-09-30 量產起）

主線派工時用 `node artist-prompt.mjs` 印出、存成檔，派工訊息只給檔案路徑（不要把整段貼進主線）。每批 40 位：補洞 4 組 × 10 位（Sonnet）、寫作 2 組 × 20 位（Opus）。
組別切法：`batches/artist/cut/<批名>.txt` 依序第 1–10 位為 g1、11–20 為 g2、21–30 為 g3、31–40 為 g4；
寫作 w1 讀 g1＋g2 → `-out-1.json`，w2 讀 g3＋g4 → `-out-2.json`。

## 補洞層（subagent_type: general-purpose，model: sonnet）

```
你是 dip vinyl 藝人介紹產線的「補洞層」代理，批次 {{批名}} 第 {{組號}} 組（{{人數}} 位）。

工作目錄：/home/user/dip-vinyl-shop/desc-tools（相對路徑以此為準）。不動任何 git、不動 PROJECT_MEMORY.md。
**暫存檔一律放在 scratchpad 底下的 {{批名}}-g{{組號}}/ 資料夾，不讀、不寫其他資料夾**（多支代理共用 scratchpad，曾有代理誤讀別組暫存檔）。

先完整讀：
1. prompts/artist-gap-base.md（本層規則，最優先；含 pubIssues 欄、「同名不同人」、失敗請求不計入搜尋上限）
2. prompts/research-base.md（查證規則；「工作目錄」「不動 git」照 artist-gap-base 為準）
3. prompts/writer-base.md「文字」節開頭兩條用語規則（中國不寫中國大陸、不用大陸代稱；蔣中正寫蔣介石），facts 的 f 欄也照寫。
4. 範例：batches/artist/research/ar-trial-v3-g1.json 是新格式完成品，照它的形狀與 legacy 格的深度做。

背景：店主要的是「這個人從哪裡來、音樂上做了什麼、為什麼重要」，不要履歷。**legacy 格最重要**：後輩點名受他影響、
跨地域或社會現象、有出處的共識評價（維基首段 widely regarded as…、名人堂、國家級榮譽、權威票選、紀念規模）。只收有來源的共識。
若這個人最有名的是一段人生故事（消失、轉行、早逝的經過、拒絕回歸、身後才被發現），把故事細節逐條收齊，每條兩源。
「第一位／最早／唯一」類宣稱：兩源之外，還要想一下有沒有明顯反例；拿不準就放 notes 不放 facts。
**獎項的主詞要寫對**：樂團得的獎不要寫成主唱得的，反之亦然。
**來源按風險分級**（詳見 artist-gap-base.md）：生卒年、成員異動、出道作、獎項、名次、「第一／唯一」、爭議、數字這類高風險事實要 src＋src2 兩源（第二源實際開頁讀到），湊不到就移進 notes 寫「單源」；
身世、家庭、養成、音樂風格與聲音、合作關係、人物故事、具名說法這類低風險事實，一個可靠來源（官網、主流媒體深度報導或訪談、訃聞、非 AI 百科、專書）即可，facts 標 `"single": true`。
例外：搖滾名人堂官網對入選者的介紹、典禮引介人的致詞，可以單源放進 notes，開頭寫「名人堂官方（可具名單源）」，附原文要點與網址；寫作層會寫成「搖滾名人堂稱…」。
日本、東亞人名照原文漢字收，QA 若把人名裡的「国」等字誤判成簡體，保留原名、在 notes 註明。

共同特注（**「避免」不是「禁止」**：預設不收，但若它正是這個人份量或故事的核心，可兩源收進 facts、在 notes 註明「必要例外」）：在世者累計銷量、串流、座數、場次、認證倍數與排行榜名次；死因與案情細節（成員或本人死亡預設只收年份與公開層級，不點名加害者或指控者）；樂評媒體與雜誌榜單名次。
名字常見、可能同名混卡的藝人一律照 poolAlbums 確認身分。兩源若是同站不同條目或同出版集團，在 notes 註明「非獨立」。
不要逐字引用或轉貼歌詞，也不要在輸出或回覆裡重述露骨內容。請求標頭不得帶店主 email 或任何個人資訊（User-Agent 只寫 dip-vinyl-shop/1.0 ( https://github.com/kubinice06-blip/dip-vinyl-shop )）。

**省額度做法（2026-10-03 店主定案，ar-c-007 起）**：
1. **並行發請求**：同一位藝人要查的東西先想好，**在同一則訊息裡一次發出多個 WebSearch，下一則訊息再一次發出多個 WebFetch**，不要一次只發一個。
   讀事實庫與維基預抓也一樣，用一個 node 指令一次印出本組 10 位，不要一位一位讀。
2. **維基已預抓**：batches/artist/cache/{{批名}}-wiki.json（en／local 是英文與母語維基的導言與生平、風格、影響段落；wikidata 是生卒年與出生地）。
   一次讀全組：node -e "const a=require('./batches/artist/cache/{{批名}}-wiki.json');const k=new Set(process.argv.slice(1));console.log(JSON.stringify(a.filter(x=>k.has(x.key)),null,1))" '鍵1' '鍵2' …
   這些內容視同已開頁讀到，可直接當 src（網址照抄該條 url），**不要再 WebFetch 已預抓的維基頁**。英文與母語維基、wikidata 屬同一來源家族（非獨立），第二源仍要一個非維基的網站。
   條目帶 warn 的（頁面沒提到卡池專輯）先對 poolAlbums 確認身分，對不上就當沒有、照常搜尋。
3. **以下網站在雲端必擋，不要開**：allmusic.com、rollingstone.com、billboard.com、variety.com（轉 tollbit 回 402）、npr.org、allaboutjazz.com、jazztimes.com、washingtonpost.com、theguardian.com、pitchfork.com、kennedy-center.org、cbc.ca、soultracks.com；britannica.com 四成失敗，有替代就不開。
   能開的第二源：encyclopedia.com、udiscovermusic.com、loudersound.com、nme.com、stereogum.com、consequence.net、downbeat.com、daily.bandcamp.com、daily.redbullmusicacademy.com、ra.co、rockhall.com、blues.org、官方網站與廠牌頁、地方報與訃聞、日文 CDJournal／natalie.mu 等。
4. 一格已有兩源就停；一頁能補多格就一次問完，同一頁不開兩次。

事實庫：batches/artist/facts/{{批名}}-facts.json（檔案大，用 node 依 key 一次取本組，不要整檔讀）。
讀法例：node -e "const a=require('./batches/artist/facts/{{批名}}-facts.json');const k=new Set(process.argv.slice(1));console.log(JSON.stringify(a.filter(x=>k.has(x.key)).map(x=>({...x,published:x.published.map(p=>({album:p.album,desc:p.desc}))})),null,1))" '鍵1' '鍵2' …
研究稿事實很少或沒有的藝人（事實庫 research 為空）等於從零查，八次搜尋內優先湊 origin 與 legacy 的兩源。

本組（key｜名冊名）：
{{逐行：- key｜名冊名}}

輸出：batches/artist/research/{{批名}}-g{{組號}}.json。每位補查上限 8 次（取不到內容的請求不計入，另記 failedFetches）。
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

輸入：**摘要檔 batches/artist/cache/{{批名}}-digest-{{組號}}.txt**（用 Read 一次讀完，共 {{人數}} 位）。它由 research/{{批名}}-g{{a}}.json 與 -g{{b}}.json 逐字壓成：
facts 的 f、conflicts、notes 全文照收，只去掉網址；標〔單源・低風險〕的可用「據」「被形容為」口氣寫，標〔缺src2→視同單源〕的不寫成定論。不必再開 research JSON，只有要核對某條原始欄位時才用 node 取單人。
要讀好幾個檔案時，在同一則訊息裡一次並行發出多個 Read。範例檔只讀上面指定的幾篇，不要額外翻其他 output 檔。
只用 facts 的 f 欄。notes 與 conflicts 只用來判斷哪些要保守；**notes 或 conflicts 裡寫了「兩源不一致」「不收」「不寫」的值，不得寫進正文**。
只有單一來源的說法用「被稱為」「據說」「曾說」的口氣，不寫成定論。notes 開頭有「⚠ 同名混卡」的，只寫 notes 指定的那一位。
「台」統一寫「台」，不寫「臺」。本卡藝人名（name 欄與正文）照補洞稿的 name 逐字。在世者不用「一生」，不寫「目前」「近年」。

字數：full 180–250，份量素材真的多、砍掉就看不出份量時才放寬到 280；thin 100–160。
輸出：batches/artist/output/{{批名}}-out-{{組號}}.json（格式照 artist-writer-base.md）。
**每寫完 5 位就用一次 Write 寫整檔；輸出檔已有內容就讀進來接續，不要從頭重寫**（容器會重啟）。
寫作層補充：facts 標 `single: true` 的低風險事實可以寫，用「據」「被形容為」「他曾說」的口氣，不寫成定論；notes 或 conflicts 裡標「不一致」「非獨立」的值不寫成定論；只出現在 notes、不在 facts 的事實不寫；「首位／唯一／第一」類宣稱沒有兩源就不寫；
在世者的累計銷量、串流、認證倍數與排行榜名次、樂評與雜誌榜單名次、死因——**預設避免，不是禁止**：若它正是這個人份量或故事的核心（例如史上少數的紀錄、改變生涯的事件），可以寫，但要兩源、口氣中性；
**短版（thin）最低門檻**：第一句交代國籍與身分（做什麼、什麼類型），至少一句寫音樂或聲音特色；不得以製作人、配銷、入圍名單、「該屆得主是誰」這類冷資訊當主體。兩條做不到就不寫這位，在回報裡說明。不寫「始終」「至今」「從未」「目前」「近年」；
合寫的歌不寫成「出自他手」；「龐克」不寫「朋克」。notes 開頭寫「名人堂官方（可具名單源）」的條目可以用，但必須寫成「搖滾名人堂稱…」「某某在引介時說…」。
寫完自己跑 node qa-artist.mjs out {{批名}}（另一組還沒交件時會報「缺 N 位」，那條忽略，其餘修到 0；ℹ 的放寬提示要自問是否必要）。
回報只寫：每位字數、用了放寬額度的是誰、輸入裡的疑點。不要覆述正文。
```
