# mood-axes 裁定紀錄

## 2026-10-14｜100 張人工錨點（anchors-v1）

- **判定者**：雲端主線，憑聆聽知識人工判定，尚無音訊層、模型層。每張附一句理由（`why`）。
- **選盤原則**：六個區域都要有、各曲風都要有、店主舉例一定要在。卡池沒有溫蒂漫步、事後菸，以 deca joins《Go Slow》補台灣「要死不活」位；兩張待店主決定是否走 `dip-card-create` 上架。
- **區域規則改版**：只看 (X, Y) 時，Head Hunters、Remain in Light、Fela《Zombie》、Paul's Boutique 會被判成亢奮（中高能量、中等厚度）。改成中心帶 Z、權重 0.5 後，熱的放克回到雀躍或愉悅，冷的龐克留在亢奮。
- **四張邊界卡的處理**：
  - Nujabes《Modal Soul》、Fishmans《Long Season》：能量由 2.6 調到 2.3、質地由 0.8 調到 1.0。理由是兩張的拍子都鬆、低頻都 dusty，2.6 高估了推力。
  - De La Soul《3 Feet High and Rising》：預期愉悅、算出雀躍。嬉鬧明亮，雀躍說得通，改預期。
  - Radiohead《OK Computer》：中速但陰冷厚重，落在要死不活，標為邊界卡。全池跑完後若音訊層把它的能量算到 3.3 以上，會移到亢奮。
  - 大貫妙子《Sunshower》：預期雀躍、算出愉悅。都會 AOR 的溫吞，愉悅更貼切，改預期。
- **與舊三軸相關（Spearman，n=100）**：能量與三者都 <0.1；質地與硬蕊 0.64；色溫與硬蕊 −0.63。手挑樣本偏極端，全池要重算。
- **存放**：本目錄不進網站部署，前台看不到。驗收用私人預覽頁（星圖原型）。

## 2026-10-14｜補 4 張（add-20261014 上架後）→ 104 張

- 溫蒂漫步《Spring Spring》(2.4, +1.0, +1.0) → 要死不活。dream pop 的殘響與溫潤合成器；質地給 +1.0 是因為殘響朦朧，與店主「溫蒂漫步＝要死不活」的舉例一致。
- 溫蒂漫步《Midnight Blue》(3.2, +0.4, +0.6) → 愉悅。第二張刻意加進 Disco、Funk、Jungle 讓節奏變強（專輯研究稿 facts 5），能量高過前作，判到要死不活會違背研究事實。同團兩張落在相鄰兩區，正好示範區域是看專輯不是看藝人。
- Cigarettes After Sex《Cry》(1.6, +1.2, +0.2)、《X's》(2.0, +1.2, 0.0) → 要死不活。《X's》律動比前作緊（研究稿 facts 6），能量略高。
- 重算後六區：放鬆 16、要死不活 27、愉悅 18、雀躍 16、亢奮 19、興奮 8；預期與計算零落差。與舊三軸 Spearman：能量 ≤0.12；質地～硬蕊 0.62；色溫～硬蕊 −0.62。

## 2026-10-15｜六區改八格（店主定）

- **店主裁定**：「興奮 亢奮 愉悅 雀躍 這兩組太像了」→「我要六個向度組合都有詞」→ Z 用冷暖（不用亮暗）→ 三對詞（靜躁、輕重、冷暖）排列組合成 8 格，每格一詞。愉悅、興奮退役。名稱暫定，「先開始做 未來要改名再改」。
- **八格名稱**：放鬆（靜輕暖）、平靜（靜輕冷）、要死不活（靜重暖）、頹靡（靜重冷）、雀躍（躁輕暖）、冷冽（躁輕冷）、沸騰（躁重暖）、亢奮（躁重冷）。平靜、頹靡是店主取的；冷冽、沸騰是主線提的（店主否決「興奮」當躁重暖，太像亢奮）。
- **門檻**（`build-anchors.mjs` 的 `T`）：x ≥ 3.0 躁、y ≥ 0.5 重、z ≥ 0 暖。取法：x 3.0 是 1–5 的中點；y 取 0.5 而不是 0，因為 0～0.4 的盤（Abbey Road、Thriller、Daft Punk、Midnight Blue）聽感是「不輕不重的流行」，算進重會讓沸騰吃掉一整批 disco／AOR；z 取 0，中性盤歸暖，因為冷調要有明確的疏離感才算。
- **舊區域規則作廢**：v0.3 的六中心最近距離（Z 權重 0.5）＋ X ≥ 4.75 興奮門檻整套拿掉。舊規則為了把熱放克拉出亢奮而加的 Z 權重，在八格裡由 z 切刀直接解決：Fela、Talking Heads、Head Hunters、Paul's Boutique 全落沸騰，冷的龐克落亢奮。
- **錨點座標只改一張**：Miles Davis《Kind of Blue》z +0.5 → −0.2（cool jazz 的冷調；原本是為了落在愉悅才給暖）。落平靜。其餘 103 張座標不動，只把 `intent` 改成八格 id。
- **改格的邊界卡**：Radiohead《OK Computer》(3.0, 0.9, −1.4) x 剛好碰門檻，由舊的要死不活改落亢奮；理由註記同步改。之乎者也 (3.0, −0.2, 0)、風街ろまん (3.0, −0.5, 0.6)、Abbey Road (3.1, 0, 1.0) 落雀躍，接受——座標是連續值，P1 照距離抽，邊界只影響顯示名。
- **薄格**：冷冽 2（Kraftwerk、YMO）、平靜 5。躁輕冷、靜輕冷的盤本來就少。全池跑完若 <300，P1 向只差一軸的三格借，或下修 y 門檻；調門檻要重跑錨點並記在本檔。
- **重算結果**（104 張，預期與計算零落差）：放鬆 17、平靜 5、要死不活 14、頹靡 12、雀躍 20、冷冽 2、沸騰 11、亢奮 23。與舊三軸 Spearman：能量 ≤0.12；質地～硬蕊 0.62；色溫～硬蕊 −0.61（Kind of Blue 微調所致，原 −0.62）。

## 2026-10-15｜v0 子曲風先驗＋店主實驗頁（「用我的唱片櫃收藏測試」）

- **為什麼要先驗**：店主唱片櫃絕大多數不在 104 張錨點裡；要看真收藏的星圖，全池每張都得先有位置。照計畫 §3 的第一層（子曲風先驗）先做，音訊層、模型層之後覆蓋。
- **做法**：116 個子曲風標籤各定一組 (x, y, z)；卡取平均（三段子標籤權重 2）；無子曲風用主曲風；硬蕊度用錨點最小平方擬合微調；錨點直接覆蓋；±0.15 確定性抖動避免同標籤疊成一點。
- **調參一輪**：第一版八格對 45/104。依錨點系統性偏差改了 15 個標籤（嘻哈能量下修 0.2–0.3、ambient 改暖改輕、downtempo 更重、bass 能量下修、synth 改冷、funk 更暖等），升到 48/104。沒有再往下調——再調就是在背 104 張答案，對全池沒有意義。
- **天花板**：同一標籤內差異太大（jrock-asia、indie-pop、rock/classic、jazz/bop），標籤平均先天抓不到。邊界附近的卡格子容易翻；三軸同側率約八成才是這層該看的數字。
- **實驗頁的身分邊界**：雲端沒有店主身分，讀不到唱片櫃（`collections/{uid}/cards` 規則只給本人與管理員），所以做成網站上的頁面，由店主登入後在自己瀏覽器裡讀。頁面只讀、不寫任何 Firestore。
- **驗證**：本機 Chromium 以假 Firebase（350 張隨機卡池卡＋1 張卡池外）測桌機與手機寬度，0 錯誤；統計列正確報出「1 張不在卡池」。

## 2026-10-15｜刻度階段 A：百分位＋條件中位數（MOOD_SCALE_PLAN）

- **店主裁定**：數值留後台不給玩家看；八格平均照規劃（條件中位數）；S 曲線看過再定；階段 B 音訊層先掃一半。
- **產出**：`build-priors.mjs` 改兩位小數；新 `build-scale.mjs` → `data/mood/scale-v0.json`（每軸 101 斷點、三組門檻樹）＋ `card-moods-v0.json` 每張卡多 [pX, pY, pZ]。
- **平均切法結果**：八格各 2,390 張（沸騰 2,391，除不盡）。門檻：能量 p50；質地 靜 p34／躁 p66；色溫 靜輕 p58、靜重 p46、躁輕 p75、躁重 p20。前端判斷式重算全池 0 不一致；重跑兩次結果相同。
- **代價（主線發現，已在 MOOD_SCALE_PLAN §2.4 記給店主）**：錨點 81/104 同格。躁輕的色溫門檻 p75 讓 NewJeans、《葉惠美》、Perfume、《Midnight Blue》變冷冽；靜重的 p46 讓事後菸兩張、Slowdive、MBV、BoC、King Tubby 變頹靡——事後菸是店主親口舉的要死不活例子。
- **處置**：預設照核准的平均切法，另存折衷（λ=0.5：4.9%–22.9%、錨點 90/104）與語意門檻（λ=0：1.6%–32.1%、104/104）兩組門檻樹，實驗頁切換比較，由店主看真實唱片櫃後定。理由：可逆（只是門檻）、代價是店主沒看過的新資訊、v0 暫估會讓數字在階段 B 再變。
- **兩位小數的極限**：v0 每軸只有約 360 個不同值（子曲風組合少），並列以 FNV-1a 卡鍵雜湊切開；≥ 2,000 的目標留給階段 B。
- **實驗頁**：位置改百分位（均勻撒滿立方體）；加「八格切法」三鈕、「往中間收」（顯示層冪次 1.7 壓縮）；點星顯示後台 p 與原始值。假 Firebase 測桌機／手機 0 錯誤，三種切法的頁面計數與腳本完全一致。

## 2026-10-15｜店主否決為平均移門檻：八格回語意門檻

- **店主裁定**：「不要為了平均而改變原本的屬性」。看過條件中位數的代價（23/104 錨點換格、事後菸變頹靡、NewJeans 變冷冽）後否決，折衷（14 張換格）一併否決。
- **改動**：`build-scale.mjs` 移除條件中位數與折衷兩種門檻樹；八格只看原始值對語意門檻（x 3.0／y +0.5／z 0），錨點 104/104 同格。p（百分位）保留為後台數值與星圖定位，**不決定格子**。`scale-v0.json` 改存 `thresholds`（raw）與 `thresholdP`（門檻落在第幾百分位，只供畫星雲）。
- **實驗頁**：拿掉「八格切法」三鈕；格子用原始值判，位置用百分位；引力中心的格子看收藏原始值平均。
- **v0 全池八格**：放鬆 4,913、平靜 1,148、要死不活 927、頹靡 316、雀躍 6,052、冷冽 444、沸騰 2,068、亢奮 3,253（1.7%–31.7%）。v0 先驗把兩端往中間擠，頹靡、冷冽被低估，階段 B 應會變厚。
- **平均改在抽卡層**（MOOD_SCALE_PLAN §2.2）：抽某一格時八格等機率；格內不足 300 張向只差一軸的三格借最近的卡（借來的卡顯示自己的格名）；成就門檻改該格比例；星圖與調頻板用百分位定位，空間等密度。
- **驗證**：實驗頁假 Firebase 桌機／手機 0 錯誤，頁面八格計數與腳本一致。

## 2026-10-15｜500 張主要專輯模型評分（score500）

- **店主指示**：「先評分五百張主要專輯 放上去看」。
- **選盤**（`score500/select.mjs`）：經典度 5 的 1,318 張中，依主曲風配額、冷門度低者優先（搖滾 108、爵士 70、電子 50、靈魂 45、嘻哈 40、流行 32、民謠 35、古典 25、世界 20、藍調 15），另保留 60 個亞洲名額（經典度 ≥4，台日韓港）；排除 104 錨點。
- **評分**：10 支代理各 50 張，照 `score500/BRIEF.md`（MOOD_SCALE_PLAN §3.1 說明書＋104 張錨點校正表），只憑聲音知識、不上網、標 conf。conf：high 278、mid 205、low 17。
- **意外**：chunk-01／02／03 三支代理共用 scratchpad 的同名輔助腳本 `add.py` 互相覆蓋，chunk-03 的 10 筆曾被寫進 chunk-02 的輸出；chunk-02 代理自行移出，主線核對各檔 0 筆外來 id。merge.mjs 只收各卡單自己的 id。之後的代理都要求輔助腳本檔名帶 chunk 號。
- **主線審稿**（`score500/review.json`，5 張）：Coltrane《Live at the Village Vanguard》（理由寫灼熱卻給冷，質地低估）、James Brown《The Payback》、Stones《Let It Bleed》、Art of Noise、Max Romeo《War ina Babylon》。以關鍵字找理由與分數矛盾者再逐張判，原值保留在 `orig`。
- **結果**：八格 放鬆 148、平靜 26、要死不活 18、頹靡 21、雀躍 154、冷冽 32、沸騰 60、亢奮 41。分布寬度比錨點窄（sd 0.68／0.86／0.83 對錨點約 1.1）——主流名盤本來就比刻意挑的極端錨點靠中間。
- **獨立性**：能量對舊三軸 |r| ≤ 0.13；質地～冷門 −0.26；色溫～硬蕊 −0.41（在 0.4–0.7 預期內）。三軸彼此：能量～質地 0.42、質地～色溫 −0.42。
- **子曲風暫估有多準**（拿這 500 張對照）：三軸同側 66%／81%／80%、八格 43%、平均誤差 0.44／0.52／0.54。能量最差——主流名盤擠在 3.0 門檻附近，標籤平均分不出。全池其餘 18,517 張仍是暫估，正式產線前不要拿個別卡的格子當真。
- **上圖**：`build-priors.mjs` 加來源層（錨點 > 模型評分 > 子曲風暫估），`card-moods-v0.json` 第 5 欄改來源碼 0／1／2；實驗頁顯示來源；私人星圖預覽改為 604 張已評分專輯（Version 7）。

## 2026-10-15｜「要死不活」改名「慵懶」（店主）

- **店主裁定**：靜重暖那一格改叫「慵懶」。id `languid` 不變，座標與門檻不動，只改名稱表。
- **改動**：`build-anchors.mjs` 的 `NAME`、`starmap-lab.html`、星圖原型、`score500/BRIEF.md`、`MOOD_ENERGY_PLAN.md`、`MOOD_SCALE_PLAN.md`；重跑 anchors／priors／scale／merge 四個產出。本檔與 `PROJECT_MEMORY.md` 的舊條目、add-20261014 批次裡引用店主原話的「要死不活」保留不改。
- **順帶**：星圖原型飄的封面縮到跟星星一樣（6–18px，上限 400 張），無封面者改成純色小方塊。

## 2026-10-15｜再評 3,000 張（score3000）

- **店主指示**：「再評三千張 不要一次全放上星圖會lag」。
- **選盤**（`score3000/select.mjs`）：未評分的經典度 ≥4 卡，依全池曲風比例配額、冷門度低者優先；保留 300 個亞洲名額。曲風：搖滾 712、爵士 560、流行 304、電子 300、嘻哈 250、靈魂 250、民謠 228、古典 166、世界 130、藍調 100。
- **評分**：30 份 100 張的工單，照 `score500/BRIEF.md`，同時最多 6 支代理；每 5 張寫回、可續跑；輔助腳本檔名一律帶 `s3k-cNN`。conf：high 995、mid 1,637、low 368；0 錯誤、0 外來 id。
- **結果**：八格 放鬆 894、平靜 216、慵懶 105、頹靡 108、雀躍 949、冷冽 120、沸騰 257、亢奮 351。三軸彼此 能量～質地 0.48、質地～色溫 −0.42；色溫～硬蕊 −0.43；能量對舊三軸 |r| ≤ 0.12。這批未做主線覆寫。
- **星圖預覽**：照店主「不要一次全放」，預設只點亮 600 張（拉桿可加），簡介拆到 `descs.json`、開卡時才載。

## 2026-10-15｜接力補到一萬張（score10k）

- **店主指示**：「直接跑到一萬張 接力跑」。
- **選盤**（`score10k/select.mjs`）：本批＝10,000 −（104 錨點＋500＋3,000）＝6,396 張。曲風配額照剩餘池比例；知名度＝經典度×2 − 冷門度，高者優先；亞洲名額照全池占比加權 1.3。曲風：爵士 1,632、搖滾 1,526、電子 644、靈魂 519、古典 440、嘻哈 438、民謠 431、流行 378、世界 289、藍調 99。
- **評分**：64 份工單（最後一份 96 張），同時 6 支代理接力；輔助腳本帶 `s10k-cNN`。conf：high 1,091、mid 3,688、**low 1,617（25%）**；0 錯誤、0 外來 id、與前兩批及錨點 0 重複。
- **主線審稿**（`score10k/review.json`，4 張）：關鍵字掃理由與分數矛盾 49 張，逐張判後只改質地低估的 Gilels《Waldstein - Appassionata》、McCoy Tyner《Revelations》、Weyes Blood《And in the Darkness》、Gas《Pop》（Pop 是收輕），皆未換格。其餘 45 張是字面誤報：情緒義的「沉重」、酸性 house 的「催眠」、Pole 的「爆裂」雜訊、四重奏偶發的「狂暴」段。
- **低把握熱區**（品質接近子曲風先驗，正式產線的試聽音訊層要優先覆蓋）：昭和歌謠與演歌、韓國八〇–九〇、七〇–八〇粵語國語、越南印尼老唱片、日本冷門爵士（c37 一份 low 71：富樫雅彦、浅川マキ、山下洋輔、日野皓正）、世界音樂 78 轉合輯與田野錄音（c58 low 42）、2025–26 新盤（aespa、BTS、Drake、Denzel Curry、M.I.A.、Ice Cube 等，超出代理知識）。同藝人多張分不開：Umm Kulthum ×5、Orhan Gencebay ×3、Amazonian chicha 四張、MC Solaar 兩張。
- **代理回報的卡池資料問題**（未處理，記給店主）：重複卡 Happy End《Kazemachi Roman》＝はっぴいえんど《風街ろまん》、Nick Cave《Let Love In》兩筆（& 與 and）；子曲風標錯 Cicada（室內樂標 house）、Frost（嘻哈標 house）、The Ronettes（流行標古典）、Barbara《L'Aigle noir》（香頌標 doom metal）、Pylon《Chomp》（後龐克標 doom）、Ruth Brown《Blues on Broadway》（藍調標嘻哈）；年份或身分疑誤 Justice《Cross》標 1992、Monk《In Orbit》實為 Clark Terry 領銜、Clark《Cave Dog》疑為《Sus Dog》、Peter Gabriel《Melt》標重發年 2009。
- **結果**：本批八格 放鬆 1,728、平靜 463、慵懶 168、頹靡 356、雀躍 1,909、冷冽 313、沸騰 608、亢奮 851。三軸彼此 能量～質地 0.47、質地～色溫 −0.46、能量～色溫 0；色溫～硬蕊 −0.50。
- **一萬張合計**（錨點＋三批評分）：放鬆 2,787、平靜 710、慵懶 305、頹靡 497、雀躍 3,032、冷冽 467、沸騰 936、亢奮 1,266（3.1%–30.3%）。全池 19,121 張中 10,000 張已脫離子曲風暫估。
- **星圖預覽**（Version 12）：10,000 張、預設亮 600。swiftshader 測得幀率比 3,604 張版低，改兩處：沒點亮的星在頂點著色器直接剔除、透明度動畫收斂後不再每幀上傳；之後 10,000 張版在軟體渲染下反比舊版快（桌機 8 對 6）。封面 7,292／10,000——本批 1,988 張 KV 沒有 `cover6`，顯示為純色小方塊。

## 2026-10-16｜評完剩下的全部卡（score-rest）：全池 19,116 張都有模型評分

- **店主指示**：「繼續幫剩下的專輯評分」。卡池先經另一工作階段的修正（刪 5 張重複卡），剩 9,120 張只有子曲風暫估。
- **工單**（`score-rest/select.mjs`）：剩下的全部，按主曲風 → 子曲風 → 藝人 → 年份排序，切 92 份（最後一份 20 張），讓同一位藝人的專輯落在同一份、由同一支代理比較著打。提示詞加一條「同藝人不要給成同一組分數」。
- **評分**：同時最多 6 支代理接力（有一段數漏、短暫 7 支）。0 錯誤、0 外來 id、跨四批 0 重複。conf：high 719、mid 4,437、**low 3,964（43%）**。比上一批（25%）高很多——剩下的本來就是冷門盤：日本爵士私藏與 TBM、冷門自由爵士、東南亞與台日老唱片、私壓迷幻、南方二線饒舌、福音小眾，加上 2025–26 新盤。部分份 low 超過 70%（c34、c35、c42、c50、c67）。
- **主線審稿**（`score-rest/review.json`，6 張）：關鍵字掃 55 張，改 Taj Mahal Travellers《August 1974》、The Fall《Live at the Witch Trials》、Count Bass D《Dwight Spitz》、Fatback《With Love》、Tomasz Stańko《Music for K》、Garth Brooks《The Chase》。其餘是爵士三重奏「厚實貝斯」、情緒義「沉重」、techno／afrobeat「催眠」等字面誤報。
- **全池結果**：錨點 104＋模型評分 19,012。八格 放鬆 5,102、平靜 1,309、慵懶 589、頹靡 970、雀躍 5,867、冷冽 873、沸騰 1,900、亢奮 2,506（3.1%–30.7%）。錨點 104/104 同格。全池 conf：high 3,079、mid 9,967、low 5,966（31%）。
- **卡池資料問題**：代理沿路回報的寫在 `score-rest/DATA-ISSUES.md`，未處理。最重要的是六類系統性問題（古典子曲風時期、古典年份填作曲年、舊卡 hiphop 誤對、主流流行歸 folk／soul、子曲風地區濫標、同名串線），要改規則或整批掃，不是逐卡改。
- **星圖預覽**（Version 13）：全池 19,116 張、預設亮 600。KV 只有 3,626 張新增卡有 `cover6`，改從 Firestore `card_catalog.coverUrl` 唯讀補到只剩 24 張無封面；Apple／CAA 封面改用小圖（100／250px）。建置時以 `seed_cards.json` 過濾，刪掉的重複卡不上圖。swiftshader 下桌機 7、手機 6 fps，0 錯誤。KV 一則簡介含亂碼 U+FFFD（Lazy Lester《All Over You》），預覽已去除、KV 原文未改。

## 2026-10-17｜「慵懶」改名「恍惚」（店主）

- **緣起**：店主看全池結果，指出慵懶、冷冽薄的主因是「評分怎麼判重」。主線驗證：Al Green 18 張、Marvin Gaye 13 張、Anita Baker 5 張、Bill Withers 8 張，一張都沒落慵懶，全在放鬆；真正落慵懶的是 Nujabes、J Dilla、D'Angelo、King Tubby、Slowdive、MBV、Beach House、事後菸。根因不是代理權重，是說明書的 Y 軸硬規則量「低頻、失真、殘響、壓縮」（製作髒度），Hi Records 式乾淨製作照規則就是 −0.4；且店主審過的錨點本來就把《Let's Get It On》放在放鬆（y 0.3）。門檻移動是零和（y≥0 時慵懶 575→1,199、冷冽 871→354），不採。
- **店主裁定**：格名改「恍惚」，承認這格裝的是「暖色的霧」（dusty 取樣、dub、shoegaze、dream pop），不是靈魂樂的懶。id `languid` 不變、座標門檻不動、分布不變。候選另有迷離、微醺、昏沉、朦朧、悶燒。
- **改動**：`build-anchors.mjs` 名稱表、`starmap-lab.html`、星圖原型、`score500/BRIEF.md`、`MOOD_ENERGY_PLAN.md`、`MOOD_SCALE_PLAN.md`、`EXPANSION-PLAN-mood-thin-cells.md`、`anchors-src.mjs` 註解；重跑 anchors／四批 merge／priors／scale。店主原話引用（MOOD_ENERGY_PLAN 第 3、4、383 行，補充計畫第 3 行）與舊紀錄保留。
- **順帶修**：重跑合併時發現 `score3000/chunk-15.json` 與 `out/chunk-15.json` 的《In Orbit》id 仍是舊掛名，merge 會把 10-16 另一工作階段改好的 `scored-3000.json` 蓋回去、全池少一張模型評分（19,011）。工單與輸出檔一起改成 `clark terry with thelonious monk|in orbit`，重跑後 19,012／0 暫估。星圖預覽亂碼改成全檔去除 U+FFFD，不再寫死索引。
- **未決（店主）**：Y 軸要不要改定義成「重量感」（律動拖、底部厚、編制密，刪「乾淨製作就是輕」）。改了要重審約 20 張錨點、重評靜暖與躁冷兩片約 9,000 張；以及 techno 該在冷冽還是亢奮。

## 2026-10-20 調頻上線裁定（預覽迭代 25 版後定稿）

- **σ 0.2／0.2／0.3**（規劃書 0.7）：全池座標一位小數、八成擠在能量 2.2–3.8，0.7 會把整池算進來；模擬深處點一下落目標格 86%→96%。
- **掃描在百分位空間**：同一原始值的卡依固定亂數均勻鋪在它那段百分位平台（能量 3.0＝p42–49），每張卡有唯一位置；輪子掃過的路上、另外兩軸半徑 10 格內的卡依序閃過（一整圈 600–800 張、每格 6–8 張）。FINE 模式半徑 4、靈敏度 1/4。
- **交會處只亮一張**（店主：不要範圍）；鎖定＝離頻率最近的一張，「同頻率再抽一張」才用高斯加權隨機（floor 2%，看過 200 張內不重複）。稀有度分層沒接 `pickSeedCard`——調頻的意義是「轉到哪張就是哪張」，隨機層只在再抽一張。
- **不走全螢幕抽卡動畫**：鎖定直接出結果頁，跟轉收音機的手感一致。
- **試聽電台式硬切**（店主：與一般抽卡區別）；第一次碰輪子即 `gpEnsurePlayer({grant:true})` 授權這次造訪的自動試聽——輪子本身就是「我要聽」的手勢。
- **音效只留掃頻雜訊與嘯聲**：每張一嗶、鎖定滑音都被店主否決（手機上是啪啪聲）。第 18 版的「無聲解鎖音軌」用 8-bit 全 0（＝負滿幅直流）且 0.1 秒迴圈，是「停了還啵啵啵」的真兇，改 16-bit 真靜音、只播一次。
- **面板用店主像素稿當外殼**，不再用 CSS／canvas 畫（店主：看起來很假）；輪子滾花取樣稿子的銅帶，不自己畫。
- **名稱暫用「調頻」**，路由 `/tune` 固定；店主定名後只改 `find.html`、`tune/index.html`、歷史徽章與 OG 圖的字。


## 2026-10-21｜店主改判：Celtic Frost《Monotheist》去躁的那一端

- **店主**：在頻率選歌抽到這張落頹靡，「這張一點都不靜啊 超躁的」「我聽起來就是死黑金屬 一點都不慢 我要他去躁的那一端」。
- **原評**：(2.6, 2, −2)，把握高，理由「碾壓式哥德毀滅，慢重 riff、嘆息低吟，極陰冷」——評分者看的是速度（能量軸定義），店主聽的是強度。
- **改判**：`data/mood/overrides.json` 第一筆，能量 2.6→3.4（與 Master of Reality 同級），質地與色溫不動 → 亢奮（躁＋重＋冷），與同團 To Mega Therion (3.9)、Morbid Tales (4.4) 同格。把握度記 3（店主改判）。
- **沒有連動**：同速同重的 Godflesh《Streetcleaner》(2.6)、Candlemass (2.4)、Electric Wizard (1.8) 留在頹靡；店主只點名這張，個案改判不改軸定義。
- **順手**：`build-card-moods.mjs` 加 `--allow-missing`——ts7–ts11 等 342 張新卡還沒評分、gate 紅，沒這個旗標改判寫不進前台檔（缺的卡存 null，前端用雜湊對卡會跳過；孤兒 id 與錨點換格仍擋）。正式還是要把那 342 張評完。
## 2026-10-21｜薄細項策展線新卡補評（score-ts）：342 張，頻率選歌與星圖全池恢復

- **店主指示**：「頻率也要做 前面沒做的補上 也放上星圖中」。ts1–ts11 上架的 342 張沒有座標，`build-card-moods.mjs` gate 紅、前台調頻與星圖都略過它們。
- **工單**（`score-ts/select.mjs`）：剩下全部（＝342 張），排序同 score-rest，切 6 份各 57 張，6 支代理同時打分，照 `score500/BRIEF.md`。
- **結果**：0 錯誤、0 外來 id、跨五批 0 重複。conf：high 1、mid 89、**low 252（74%）**——東南亞／南亞／蒙古搖滾與地區音樂大多只能憑藝人與曲風推。八格：放鬆 53、平靜 24、恍惚 7、頹靡 13、雀躍 76、冷冽 1、沸騰 83、亢奮 85。
- **主線審稿**：關鍵字掃（金屬卻低能量、抒情卻高能量、激烈卻低能量）5 張，皆為「快歌夾抒情」型的描述，分數合理，未改。
- **代理事故**：chunk-03 代理把輔助腳本放在共用 scratchpad 同名檔，前 10 筆一度寫進 out/chunk-05，已由它自行移除；合併時逐份核對 id 一一對應、無外來 id。日後派工要求各代理腳本放自己的子資料夾。
- **代理回報的卡池疑點**（未處理）：Exists《Exist》子曲風標 shoegaze（疑為九〇年代馬來流行搖滾）、Slam《Kesan Terbukti》標 punk（疑為馬來慢搖滾抒情）、Amateur Takes Control 標 no-wave（實為器樂後搖滾）、Instinct《อินเนอร์》標 black metal（疑為旋律硬搖滾）。
- **全池**：錨點 104＋模型評分 19,354＝19,458，暫估 0；錨點 104/104 同格。八格 放鬆 5,155、平靜 1,333、恍惚 596、頹靡 983、雀躍 5,943、冷冽 874、沸騰 1,983、亢奮 2,591。`data/mood/card-moods.json` 重建（頻率選歌星圖讀它），`card-moods-v0.json`（星圖實驗頁讀它）同步。

## 2026-10-22｜能量軸改標準：「兇不兇」優先於「快不快」，重判 60 張

- **店主**：承《Monotheist》改判，「所以要重新訂定標準」；追問 drone 類去向，裁定「Sunn O))) 算頹靡，依此制定標準」。
- **標準**（已寫進 `score500/BRIEF.md` X 軸硬規則）：躁 ＝ 攻擊性（失真牆／嘶吼／刺耳／音壓）**且**有打擊在推（鼓或拍子，再慢也算）；速度只決定高低。缺一不算：有拍沒攻擊性（dub、dub techno、trip-hop、dubstep、slowcore、shoegaze、cloud rap）留靜；有攻擊沒拍（drone、噪音牆、暗黑 ambient、現代古典音塊、工業 drone）留靜。
- **重判範圍**：靜而極重（能量 <3、質地 ≥1.5）共 267 張（`intensity-rejudge/candidates.json`，含評分者原理由）。另掃質地 0.8–1.5 帶金屬／工業字眼的 22 張，無一需動（Agalloch《The Mantle》民謠金屬留靜）。
- **移到躁的 60 張**（`overrides.json`，質地／色溫不動，能量 3.1–3.6）：doom／stoner（Candlemass 4、Electric Wizard 4、Sleep 4、Saint Vitus 2、Cathedral 2、My Dying Bride 3、Paradise Lost 3、Type O Negative 2、Melvins、Randy Holden、Marijannah、Estranged、Katatonia）、sludge／噪音龐克（Eyehategod 4、Flipper、Drunks with Guns、Killdozer、Alice in Chains s/t）、後金屬（Neurosis 2、Cult of Luna 2、Isis、Jesu、The Body）、工業（Godflesh 2、Dälek 5、Techno Animal、Swans《Cop》《Filth》）、黑金屬（Burzum《Filosofem》、Bathory《Hammerheart》、Alcest《Écailles》）、噪音搖滾（裸のラリーズ《'77 Live》《Oz Tapes》、Nick Cave《From Her to Eternity》）。
- **留在靜的典型**：Sunn O))) 3 張、Earth 2、Khanate 2、Boris《Altar》、Ben Frost、Haxan Cloak、Penderecki、Decasia、Arrival、Chernobyl、Throbbing Gristle 3、Nurse With Wound、Swans《Soundtracks for the Blind》、Coil、所有 dub／dub techno／Pole／Gas／Burial／Portishead／Tricky／Massive Attack、MBV 3、Slowdive、Low、Fennesz、Tim Hecker、MONO、GY!BE（後搖漸強不算，後金屬才算）、Alcest《Souvenirs》（清唱為主）、Om、Tom Waits《Bone Machine》、Kid Cudi。
- **邊界判例**：The Body《I Shall Die Here》有電子拍與尖叫 → 躁 3.1；Khanate 鼓極稀、每擊間死寂 → 照 Sunn O))) 留靜；Colin Stetson《Sorrow》只在高潮有鼓與失真 → 留靜；Armand Hammer 刺耳但嘻哈節拍不「打」→ 留靜，Dälek 是工業噪音牆 → 躁。
- **結果**：八格 頹靡 982→926、恍惚 596→592、沸騰 1983→1987、亢奮 2592→2648；錨點 104/104 同格（60 張無一是錨點）。
- **沒做**：舊批次評分檔不回改（v0 不動，覆寫層承擔）；日後新卡照新 BRIEF 評。

## 2026-10-22｜薄細項策展線 ts5／ts6 新卡補評（score-ts2）：90 張

- **工單**（`score-ts2/select.mjs <批>`）：每批一份（`chunk-ts6.json`、`chunk-ts5.json` 各 45），各一支代理照 `score500/BRIEF.md`（含 10-22 能量軸新標準）評。`merge.mjs` 改讀資料夾內所有 `chunk-*.json`。
- **結果**：90 張、0 錯誤。conf：mid 52、low 38。八格：放鬆 11、平靜 12、恍惚 6、頹靡 9、雀躍 19、冷冽 0、沸騰 17、亢奮 16。
- **判例**：neofolk（含 Wardruna、ORE 的軍鼓）無失真無嘶吼 → 留靜；psy／Goa 比照錨點 techno 判躁 3.8–4.5；cloud／phonk 有拍不兇留靜（SpaceGhostPurrp 2.7、Xavier Wulf 2.4、BONES 2.4、Ecco2k 2.2），$uicideboy$ 失真 808＋嘶吼 3.5；La Rumeur「節拍不打」照 Armand Hammer 留靜 2.8、Lunatic 鼓重咬字兇 3.1；Lil Tracy 3.1（emo rap＋龐克吉他）邊界。主線未改分。
- **Carl Perkins 拆卡**：工單 id 隨卡改為 `carl perkins (rockabilly)|dance album of carl perkins`。
- **併 main 後補質地尺**：本批評分時分支還沒有 10-22 質地尺新規則（#117）。併入後主線對落放鬆／平靜的 22 張逐張照新規則複核，只抬 Five Satins《The 5 Satins Sing》y −0.6→+0.7（理由本身寫「殘響包著和聲」，放鬆→恍惚；`score-ts2/review.json`）。Platters、McPhatter 等 50 年代弦樂慢歌是單聲道乾淨錄音、不霧，neofolk 原聲民謠、韓語 R&B 饒舌皆維持。
- **全池**：`build-priors.mjs` 加 `score-ts2/scored-ts2.json`；`build-card-moods.mjs` gate 綠：19,548／19,548、錨點 104/104、店主改判 256。八格 放鬆 4,985、平靜 1,328、恍惚 779、頹靡 952、雀躍 5,962、冷冽 874、沸騰 2,004、亢奮 2,664。
## 2026-10-22｜質地尺改判：暖慢的包覆感算重（恍惚 592 → 772）

- **店主**：「落日飛車確實是恍惚（dream pop 大部分也都是恍惚）重新評斷」——選了 10-16 補充計畫 §5 的 (b)：改尺，不靠補卡。
- **規則**（寫進 `score500/BRIEF.md` Y 軸）：質地也看「是不是一層包住人的霧」。dream pop／shoegaze 殘響霧、chorus 夢幻吉他＋合成器墊的軟搖滾／AOR／city pop 慢歌、慢板靈魂／quiet storm／neo-soul 的厚低頻與弦樂墊、chillwave／lo-fi R&B 的糊濾波，沒有失真也給 +0.6～+1.3。乾淨、有空氣、聲部分明的（bossa、原聲民謠、Motown／disco 快歌、明亮 city pop 快歌如山下達郎《For You》）維持輕。能量與色溫不動。
- **錨點**：落日飛車《Jinji Kikko》y +0.2→+0.8、Marvin Gaye《Let's Get It On》+0.3→+0.8，兩張由放鬆改恍惚（後者在 10-16 計畫列為店主心中的恍惚典型）。`anchors-src.mjs`、BRIEF 校正表同步，`build-anchors` 重跑。
- **重判範圍**（`texture-rejudge/select.mjs`）：目前落放鬆／平靜的非錨點卡，子曲風屬 dream pop／shoegaze／chillwave／city pop／soft rock／慢板靈魂與 R&B／neo-soul，或點名藝人，共 705 張、9 份，代理只重判 y。
- **結果**：抬重 199 張；主線審稿退回 4 張（Sigur Rós《Liminal Sleep》是 ambient 長音，與校正表 ambient 偏輕衝突；Sade《Stronger Than Pride》編制稀疏、只因點名才抬；Beyoncé《Dangerously in Love》製作光滑不霧；American Music Club《Mercury》非四類之一）。定案 **195 張寫進 `data/mood/overrides.json`**（只改 y，x、z 沿用；#114 已在 overrides 的卡保留其 x）：放鬆→恍惚 178、平靜→頹靡 17（冷色的 dream pop／slowcore，如 Echo & the Bunnymen《Ocean Rain》、Low《I Could Live in Hope》、Red House Painters《Down Colorful Hill》）。
- **同藝人分判的例**：Al Green Hi 時期抬、福音與原聲盤不抬；Mac DeMarco《Salad Days》《Another One》抬、《2》《Here Comes the Cowboy》不抬；Stylistics 前兩張慢板抬、後期輕 disco 不抬；Cleo Sol 只抬《Rose in the Dark》。
- **全池八格**：放鬆 5,155→4,975、平靜 1,333→1,316、**恍惚 592→772**、**頹靡 926→943**，其餘不變；錨點 104/104 同格，gate 綠。
- **後續**：新卡評分照新 BRIEF 打，不必再走 overrides；恍惚若還要長，再跑 ml 策展線（補充計畫 §2.2）。

## 2026-10-22｜情緒薄格策展線 md3／md4 新卡補評（score-md34）：88 張

- **工單**（`score-md34/select.mjs <批>`，仿 score-ts2；`landing.mjs` 算落格率）：chunk-md3 45、chunk-md4 43，各一支 Opus 照 `score500/BRIEF.md`（含 10-22 兩條新規則）評，不上網。merge 88/88、0 錯誤；conf high 6／mid 56／low 26。
- **落格**：md3 44/45（98%，Ulver《Shadows of the Sun》y +0.3 落平靜）、md4 39/43（91%：Tirzah、How to Dress Well、sogumm 色溫判微溫落恍惚；The Bug vs Earth 兇＋拍判躁落亢奮）。
- **全池**：`build-priors.mjs` 來源層加 `score-md34/scored-md34.json`（與 md1／md2 的 `score-md` 並列）；併 main 後 `build-card-moods.mjs` gate 綠 19,726/19,726、錨點 104/104、店主改判 256。八格 放鬆 4,985、平靜 1,333、恍惚 784、頹靡 1,119、雀躍 5,962、冷冽 874、沸騰 2,004、亢奮 2,665。

## 2026-10-23｜酸冷重判：「酸」＝冷＋硬，157 張改判

- **店主**：Marion Brown《Geechee Recollections》落放鬆（2.6, −0.4, +0.6）：「這種自由爵士類的、或是現代音樂類的（比如 Ligeti）都很酸冷難聽又硬蕊，絕對不會是輕鬆，再優化現在的標準」。
- **規則**（寫進 `score500/BRIEF.md` Z 軸）：不和諧、無調性、自由即興、噪音質地、刺耳張力 → 色溫一律 ≤ −1.2；有鼓／律動在推、或音塊密集刺耳有張力（Ligeti、Penderecki）→ 能量 ≥ 3.1（自由爵士／no wave／harsh 3.2）；質地不動。溫暖的靈性／調式爵士、後咆勃、ECM 抒情、cool jazz、極簡、新古典與配樂不算酸；同一張酸暖並存，酸優先。
- **範圍**：標籤（子曲風 jazz/free/avant、free-improv、classical/contemporary/avant、electronic/noise、no-wave；Last.fm free jazz／avant-garde jazz／free improvisation／noise／contemporary classical／modern classical）或評語有酸味、且目前落暖格或靜格的非錨點卡，共 1,208 張、8 份；標籤本身不可靠（Last.fm 把 Köln Concert、Jimmy Giuffre 3 也標 free jazz），所以逐張判，8 支代理（`sour-rejudge/out/`）。
- **結果**：判酸 200、主線退回 5（Pharoah《Karma》《Elevation》以吟唱與律動為主、酸只是爆發段；光束夜三張沿用 10-22 能量軸裁定留靜）；實際改值 157：雀躍→冷冽 23、平靜→冷冽 20、沸騰→亢奮 37、頹靡→亢奮 43、放鬆→冷冽 2（含 Geechee）、放鬆→平靜 2、同格只調值 30。八格 冷冽 936→978、亢奮 2,672→2,756、沸騰 2,004→1,967、雀躍 5,962→5,939、放鬆 4,990→4,986、頹靡 1,314→1,264；錨點 104/104。
- **判例**：Penderecki《Threnody》、Galás、Haas、Saunders、Kronos《Black Angels》依「音塊密集刺耳＝躁」進亢奮（10-22 曾留頹靡，店主 Ligeti 一句改了這條）；Throbbing Gristle 四張有脈衝 → 亢奮；Sunn O)))、Khanate、Earth、Boris《Altar》維持頹靡（店主 10-22 裁定，drone 不算推力）；Feldman、Kurtág、Bill Dixon、Derek Bailey 是「安靜的酸」：冷但靜（平靜）；Ornette 全系列進冷冽；Alice Coltrane《Journey in Satchidananda》、Lonnie Liston Smith、Köln Concert 不酸不動。
- **沒把握、留給店主翻案的**：Tim Buckley《Starsailor》→冷冽；Jonny Greenwood《There Will Be Blood》→冷冽（配樂但 Penderecki 式）；Fennesz《Hotel Paral.lel》→亢奮；Sun Ra《Astro Black》→亢奮；Boredoms《Super ae》、Melt-Banana《Fetch》、Fuck Buttons《Tarot Sport》判不酸（旋律大調）。

## 2026-10-23｜酸冷重判第二輪：「寒氣」也算酸，123 張改判（Scott Walker《The Drift》頹靡→亢奮）

- **店主**：「增加的太少了吧？是不是有漏，有些自由爵士或實驗音樂可能整首歌沒什麼聲音，但就是有寒氣，可能也被判為節奏慢的輕鬆」「Scott Walker 的 The Drift 歸類在哪？我覺得很有可能歸錯」。
- **漏的原因**：第一輪只抓窄標籤（jazz/free/avant、noise、no-wave、classical/contemporary/avant），《The Drift》的標籤是 art-rock＋Last.fm experimental，整個沒進候選；dark ambient、isolationist、現代古典的寒氣型也大多沒進。
- **補充規則**（`sour-rejudge-2/BRIEF.md`）：安靜但陰森、駭人、無調、疏離的也是酸（色溫 ≤ −1.2）；驟然爆裂、極端張力算推力（能量 ≥ 3.1），即使大部分時間很安靜。只有陰森沒有暖意的 dark ambient 算酸，帶憂鬱調性的不算。
- **範圍**：第一輪沒判過、目前不在冷冽／亢奮的卡，凡廣義實驗／前衛／art-rock／現代古典／dark ambient／industrial 標籤或評語有寒氣字眼的，共 2,397 張、8 份。
- **結果**：判酸 234、主線退回 17（調性還在、只是陰暗或悲：Slint《Spiderland》、Sigur Rós《Von》、Lankum《False Lankum》、小河、Mravinsky 的蕭士塔高維契 8／11、Weinberg《The Passenger》、兩版《藍鬍子城堡》、Kancheli《Vom Winde beweint》、PJ Harvey《White Chalk》、Reznor/Ross《Dragon Tattoo》、Harold Budd《Abandoned Cities》、Tim Hecker 兩張、Coil《Gold Is the Metal》、Fusco《L'avventura》）；實際改值 123：頹靡→亢奮 57、平靜→冷冽 23、雀躍→冷冽 9、沸騰→亢奮 4、恍惚→亢奮 1、同格調值 29。
- **Scott Walker**：《Tilt》《The Drift》《Bish Bosch》《Soused》都進亢奮（3.1, 1.0–1.2, −2）——長段留白後的駭人爆裂算張力。
- **放鬆格**：這輪 652 張放鬆格候選一張都沒判酸（多是古典、爵士抒情、新古典），兩輪合計放鬆格移出 4 張。寒氣型的卡原本大多就在平靜／頹靡（冷＋靜），問題是沒進冷冽／亢奮，不是被判成放鬆。
- **八格（兩輪合計，含同期新上架卡）**：冷冽 936→1,064、亢奮 2,672→2,818、頹靡 1,314→1,249、平靜 1,339→1,320；錨點 104/104。

## 2026-10-23｜更正：「驟然爆裂」不算推力，撤回 94 張的能量（Scott Walker《The Drift》回頹靡）

- **店主**：「The Drift 頹靡沒錯欸」。
- **錯在哪**：第二輪我自己加了「驟然爆裂、極端張力算推力」，第一輪也把「音塊密集刺耳」當推力。兩條都違反 10-22 能量標準（躁＝攻擊性**且有打擊在推**；Sunn O)))、現代古典音塊、drone 留靜），連 Sunn O)))《Monoliths & Dimensions》都被推到亢奮。
- **處理**：兩輪被拉高能量的 152 張逐張看，沒有鼓／節拍在推的 94 張能量回原值、**色溫（寒氣）保留**（`sour-rejudge-2/drive-revert.json`）。留在躁的 58 張是真的有鼓、節拍、工業脈衝或放克律動在推的（Ornette、Marion Brown《Geechee》、Throbbing Gristle 有脈衝的三張、This Heat《Repeat》、Swans《Children of God》、Neubauten、Univers Zero、Silent Hill 等）。
- **回頹靡／平靜的**：Scott Walker 四張、Sunn O)))、Penderecki《Threnody》《St Luke Passion》、Ligeti、Galás 三張、Current 93、AMM、Kevin Drumm、KTL、Lustmord、Ben Frost、Low《Double Negative》、Swans《Soundtracks for the Blind》、Feldman 以外的現代古典（Boulez、Berio、Stockhausen、Saariaho、Carter、Ferneyhough）等。
- **八格**：冷冽 1,064→1,035、亢奮 2,818→2,753、頹靡 1,249→1,314、平靜 1,320→1,349；錨點 104/104。
- **規則已改**：`score500/BRIEF.md` 酸的段落改成「安靜但有寒氣也算酸；推力只看打擊」。

## 2026-10-23｜店主試聽點選 50 張爭議盤，歸納出的標準

- **做法**：試聽頁 https://claude.ai/artifact/JD9bmK2ramyoC6UsmTrt8L ，50 張逐張試聽、店主點格。原判同格 20、改格 29、不確定 1（Scott Walker《The Drift》）。29 張照點選寫進 overrides（`owner-review/apply.mjs`，只動翻過去的軸、推到門檻另一側中度值），`owner-review/picks.json` 存原始點選。
- **翻得最多的是能量（20 張）**，而且一面倒是「靜→躁」：Feldman《Rothko Chapel》、George Lewis、Ligeti、Penderecki、Kancheli、Tim Hecker《Konoyo》→冷冽；Mica Levi、Galás、《藍鬍子城堡》、Weinberg、蕭士塔高維契 8、PJ Harvey《White Chalk》、Velvet Underground & Nico、光束夜 →亢奮。同時這些維持靜：Sunn O)))／Boris《Altar》、Earth 2、Bohren、Nico《Desertshore》、Jóhannsson《Arrival》、Low《Double Negative》、Harold Budd、Slint、Sigur Rós《Von》。
  → **店主的能量軸是「張力、不安定」，不是「有沒有鼓」**：不和諧、尖、不可預測、讓人坐不住的，再安靜也是躁；沉、慢、把人包住往下拉的（drone、doom、dark ambient、slowcore）才是靜。這推翻了 10-22「躁要有打擊在推」與今天 drive-fix 的撤回邏輯（Ligeti、Penderecki、Galás 被店主拉回躁）。
- **色溫翻 10 張，幾乎都是暖→冷**：Pharoah《Karma》《Elevation》、Alice Coltrane《Journey in Satchidananda》、Boredoms《Super ae》、Fuck Buttons、Brotherhood of Breath、Nicole Mitchell、Enrico Rava。同時 Mingus《Black Saint》、Melt-Banana、Cecil Taylor《Hard Driving Jazz》留暖，Lankum 反而冷→暖（恍惚）。
  → 跟店主自己說的一致：**色溫看旋律清不清楚**。有唱得出來的旋律、調性明確 → 暖；旋律不明、靠即興、音色、噪音撐的 → 冷，不管樂器多溫潤、多「靈性」。
- **質地翻 9 張**：Penderecki、Ligeti、Tim Hecker、Reznor/Ross 被判輕（尖細高音、冷光）；Don Cherry、PJ Harvey、Rava、Alice Coltrane、Psycho 被判重。→ 尖、細、高頻的算輕，厚、密、低沉的算重。
- **離群值**：Herrmann《Psycho》店主選沸騰（暖）；Keith Jarrett《Köln Concert》選雀躍（躁）——旋律明確且頑固低音在推，符合「旋律＝暖」「推進感＝躁」。

## 2026-10-23｜體感標準全池重判：20,446 張逐張看，1,343 張改判

- **店主指示**：「用新標準全部重判。是讓人聽得很躁還是靜，是體感，不是音樂本身。」＋「旋律性也是冷暖標準之一。」
- **做法**：`batch-progress/mood-axes/felt-rejudge/`，seed 依藝人排序切 52 份（每份 400，鎖住店主點過的 50 張＋Celtic Frost《Monotheist》），52 支代理照 `BRIEF.md` 逐張判，只輸出要改的（差 0.4 以上或換格才改）。`merge.mjs` 寫進 `overrides.json`，why 加註「2026-10-23 體感重判：…。原 (x, y, z)」以便日後撤回。
- **結果**：改 1,343 張（z 動 1,052、x 動 315、y 動 107）。八格：放鬆 4,987→5,141、平靜 1,348→1,018、恍惚 1,074→1,110、頹靡 1,344→1,276、雀躍 5,932→5,917、冷冽 1,082→1,269、沸騰 1,959→1,921、亢奮 2,771→2,845。最大流向：平靜→放鬆 260（旋律清楚的民謠、歌謠、抒情回暖）、平靜→冷冽 147、雀躍→冷冽 100（緊繃現代音樂、噪音轉躁；自由／靈性爵士轉冷）、冷冽→雀躍 92、沸騰→亢奮 82、頹靡→亢奮 56。錨點 104/104 同格。
- **主線裁定**：
  1. **Khanate 4 張的能量撤回**（代理改躁，主線維持靜）：比照店主「Sunn O))) 算頹靡」，極慢 doom 的嗡鳴把人往下壓，屬靜。
  2. **中途補一條：主流硬咆勃／靈魂爵士／風琴 groove 不算旋律不明**（chunk-20 看到 Jimmy Smith、Lovano 被往冷推）。補在 BRIEF 後派出的 chunk-29 以後照新條判；之前的已交件不回頭重派——抽查往冷的 60 張幾乎全是調式／靈性／鼓樂盤，符合店主 Pharoah、Alice Coltrane 的方向；Joe Lovano《Vanguard》、MMW 兩張屬邊緣，留著，可逆。
  3. 頹靡→躁的 56 張逐張看過：都是緊繃的現代音樂、噪音、恐怖配樂、Galás／Swans／Tim Hecker 一類，與店主點的 Feldman、Ligeti、Konoyo、Galás 同方向，不撤。
- **說明書同步**：`score500/BRIEF.md` 的能量、色溫加「店主再改標準」兩段，取代 10-22「有打擊在推」、10-23「驟然爆裂不算推力」與「不是酸」那串（A Love Supreme 等改判冷），新卡評分照新標準。

## 2026-10-23｜店主：Eminem《Revival》不該在暴躁 → 主流 pop-rap 有唱的副歌＝暖，9 張改判

- 《Revival》原是 v0 先驗 (3.2, 0.6, −0.3)，三軸都卡邊，體感重判時差不到 0.4 沒動。整張靠 Beyoncé、Ed Sheeran、P!nk、Alicia Keys 的流行副歌撐，照「旋律清楚＝暖」應在沸騰。
- 同形狀一起改（z 拉到 +0.3～+0.6，x、y 不動，全落沸騰）：Eminem《Revival》《The Eminem Show》《MMLP2》、Kendrick《GNX》、Stray Kids《KARMA》、G-DRAGON《COUP D'ETAT》、Roddy Ricch、Polo G《Hall of Fame》、Trippie Redd《LIFE'S A TRIP》。
- 不動：《The Marshall Mathers LP》（陰冷 Dre 製作，−1.2）、Wu-Tang、Public Enemy、Carti、JPEGMAFIA、Travis Scott、drill／trap 主流（Future、Chief Keef、21 Savage）、Illmatic 等 boom-bap——聲響本身就冷硬。
- 說明書 score500/BRIEF 色溫段補一句。

## 2026-10-23｜店主：Theodorakis《Axion Esti》不是放鬆，「這張歌劇壓迫感很強」

- 原 v0 (2.8, 0, 0.6) 放鬆，體感重判沒動到。改 (3.5, 1.0, 0.2) 沸騰：大編制交響＋合唱朗誦把人往前壓＝躁、厚重；laïko 歌段旋律清楚，色溫仍偏暖。
- 同形狀一併改：Jochum《Carmina Burana》(3.6, 0.3, 0.4) 雀躍 → (3.6, 1.0, 0.4) 沸騰（大合唱＋銅管定音鼓的音牆是重，不是輕）。
- 規則補一句：大編制合唱／清唱劇／神劇的壓迫音牆算「重」，不因樂器原聲就判輕。
