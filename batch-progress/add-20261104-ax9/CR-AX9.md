# ax9 策展＋研究派工（異端：日本／亞洲／歐陸／拉美的地下 hardcore／punk；2026-11-04）

你是 dip vinyl 的**策展兼研究層**，全程台灣繁體中文。這一輪把策展與研究併成一層：你自己提名、自己查證、自己判定。
只寫你自己的兩個輸出檔與 rulings.md 自己那段；不碰 seed、PROJECT_MEMORY、KV、Firestore、git。

## 先讀（全部讀完再開工）
1. `batch-progress/apex-new-20261104/RES-RULES-CLOUD.md`（不 cd 出工作目錄、Bash 保持單純）——**最重要**。
2. `desc-tools/prompts/apex-desc-base.md` 的「二、研究層」與「三、寫作層」那張夠格理由表。
3. `batch-progress/apex-new-20261104/CUR-DISPATCH-AX.md`（策展檔格式、去重、身分規矩）。
4. `batch-progress/apex-new-20261104/PLAN.md` 的「異端標準放寬」節、`ALBUM_ONBOARDING.md` §3 異端段、§5.5 `hardcore-7inch`。

## 店主 2026-11-04
「繼續補，繼續查，應該還有地下冷門 hardcore punk 可以找。」

## 標準（套到 hardcore）
- **收（heresy）**：可信來源**描述出具體、持續整張的高強度聽感**。在 hardcore 裡就是：
  - noise punk／crasher crust／「ノイズコア」：整張失真與回授糊成一片、人聲被淹沒、錄音刻意爆表；
  - 早期 thrashcore／powerviolence：整張極速（被描述為當時最快、blast 式）、暴烈、曲子短到沒有結構；
  - noisecore、chaos punk：不成曲式的噪音化 hardcore。
  描述要落在**這一張**，而且是**整張**（不是一兩首）。不必有「極端」結論，描述到位即可。
- **不收**：一般結構清楚、旋律明確、有吉他獨奏或副歌的 hardcore（即使很快很吵）；metal 化的 crossover；
  只有局部噪音的盤；oi!、street punk、melodic hardcore、d-beat 的「正常」錄音。
- 證據：≥2 個不同網域 https，至少 1 個可信——樂評（Pitchfork、AllMusic、The Quietus、Decibel、Terrorizer、Maximum Rocknroll、
  Noisey／Vice、Bandcamp Daily、Trouser Press、Exclaim!、Aquarius Records 評語、在地樂評雜誌）、專書、有引註維基、廠牌／重發廠說明（輔證）。
  Discogs 風格標籤、RYM、純零售文案、單一部落格不算。
- **流亡（pearl）替代路線**：不夠格異端、但 worker `_listeners` 是 1–299 的有效值、原盤私壓／極小廠且**沒有串流再發**（iTunes Search 查不到即視為無）、
  查得出不是錯配（盤名、藝人名在 Last.fm 對得上）——可判 `pearl`。同一位藝人跨級可以（異端一張＋流亡另一張），同級只一張。
  listeners 查法：`curl -s -m 20 -A "dip-vinyl-shop/1.0 (+https://dipvinyl.tw)" "https://dip-vinyl-worker.kubinice06.workers.dev/album-rating?artist=…&album=…"` 取 `_listeners`；回 `{}` 或沒有 `_listeners` 就是查無，**不得當 0**，不能判 pearl。
- **發行型態**：正規 LP（MB primary-type Album）優先。1980–90 年代的 **7 吋 EP、split、demo 卡帶**若是該團最重要的錄音，可走 `hardcore-7inch` 例外：
  策展檔填 `"releaseType":"EP"`（或 `"Single"`）、`"genreException":"hardcore-7inch"`、`releaseException` 寫歷史地位（≥12 字），`evidence` ≥2 網址。
  2000 年後的 EP 不收（例外只到 90 年代）。合輯只在「唯一可得形態」時收（`releaseException`）。

## 分組（派工訊息告訴你組別）

| 組 | 地區 | 起點名單（自己查卡池有沒有、哪張最極端；名單外的也可以提） |
|---|---|---|
| ax9a | **日本＋亞洲（韓國、台灣、東南亞）** | 卡池既有一般卡（**升格候選**，見下）：Confuse《Indignation》、Disclose《Tragedy》、G.I.S.M.《DETESTATION》、Gauze 三張、Lip Cream 三張、Bastard《Wind of Pain》、S.O.B.《Don't Be Swindle》。新上架：Kuro、Zouo、Execute、Systematic Death、Death Side、Crow、Gai 以外的初期ノイズパンク（Gai 已是流亡）、Framtid、Gloom、D-Clone、Zyanose、Isterismo、Contrast Attitude、Abraham Cross、Collapse、Selfish、Outo、Mobs、Ghoul、Kuro、Masami 周邊；韓國／台灣／印尼／馬來西亞／菲律賓的 noise punk、crust |
| ax9b | **北歐（瑞典、芬蘭、挪威、丹麥）** | Shitlickers、Anti Cimex（早期 EP）、Mob 47、Asocial、Crude SS、Avskum、Totalitär、Skitsystem、Meanwhile、Riistetyt、Kaaos、Terveet Kädet、Rattus、Appendix、Kansan Uutiset、Kuolema、Bastards（芬蘭）、Lama、Destrucktions、Svart Framtid、丹麥早期 hardcore |
| ax9c | **歐陸（德、荷、義、西、東歐）** | Lärm、BGK、Neuroot、Pandemonium、Indigesti、Wretched、Raw Power、Cheetah Chrome Motherfuckers、Negazione、Impact、Upset Noise、Declino、Kina、Peggio Punx、西班牙 Anti-Dogmatikss／Kangrena／Eskorbuto 初期、德國 Inferno／Chaos Z／Spermbirds 以外的極速團、東歐（Patareni、Dezerter 初期、波蘭／南斯拉夫／捷克／匈牙利地下 hardcore） |
| ax9d | **拉美（巴西、墨西哥、阿根廷、秘魯、智利、哥倫比亞）** | Olho Seco、Ratos de Porão（初期）、Cólera、Inocentes、Lobotomia、Fogo Cruzado、Psykóze、Armagedom、Juventude Maldita、Brigada do Ódio、Restos de Nada、秘魯 Narcosis、墨西哥 Atoxxxico／Massacre 68、哥倫比亞 Mutantex、智利 Pinochet Boys |

**升格候選（只有 ax9a）**：卡池已有的一般卡，照同一套標準判 heresy／none。升格卡**不寫策展檔**，研究稿 `key` 用卡池原 key（下面「key 寫法」），加 `"upgrade": true`。同藝人卡池有多張的，挑最極端的一張研究，其他寫 notes。

**提名數**：每組新上架 **10–12 張**（多兩成給汰換），池子不夠就照實交，不要湊數。每位藝人一張，挑他最極端的那張。

## 每張要做的事
1. **去重**：`node batch-progress/add-20261104-ax9/chk-artist.mjs "原文名" "別名" "羅馬拼音"`，新上架必須 `0`（明顯假陽性寫進 `uncertain`）。
   再 grep `batch-progress/mood-cells-20261022/curation-ax*.json`，別組／前批已提過的不要再提。
   **ax10（另一工作階段）做美、英、愛、加、澳、紐**——這些國家的團一律不碰。
2. **身分**：MB release-group（`https://musicbrainz.org/ws/2/release-group/?query=…&fmt=json`，UA 照下、每秒 1 次）填 `mbRgMbid`，核對 primary-type、first-release-date、artist-credit；
   查不到填 `mbAbsenceProof`＋`manualEvidenceUrls`（≥2 https，Discogs release／master＋第二來源）。年份取原盤首發年。
3. **封面來源**：CAA（`https://coverartarchive.org/release-group/<rg>` 有 front）、Apple、Discogs release（記 release id）、Bandcamp 擇一，寫進 `evidence`。找不到封面就不提。
4. **listeners**：每張都查 worker `_listeners`，填 `listeners`（數字或 null）；用 iTunes Search（`https://itunes.apple.com/search?term=…&entity=album&country=jp`／`us`）看有沒有串流，寫進 `uncertain` 或 notes。
5. **研究**：照下面研究稿格式寫 facts，判 `apex.verdict`。

## 輸出（兩個檔）
### A. 策展檔 `batch-progress/mood-cells-20261022/curation-<組>.json`
格式照 CUR-DISPATCH-AX（`apexTier` 填你判的 `heresy`／`pearl`；判 none 的**不要寫進策展檔**），另加 `releaseType`、`genreException`（例外卡才填）。
`genres` 用 `["rock"]`（hardcore 卡池慣例；noisecore 可加 `"electronic"` 以外的不要亂加）。
### B. 研究稿 `desc-tools/batches/research/add-20261104-ax9-<組>.json`
JSON 陣列，**判 none 的也要寫一筆**（facts 可少、notes 寫為什麼不收），每張：
```json
{"key":"desc2:Artist|Album","artist":"…","album":"…","tier":"heresy|pearl","upgrade":false,
 "facts":[{"text":"…","src":"https://…","block":"status|making|sound|extreme|reception|after|identity"}],
 "coverage":{"status":"ok|thin|none","making":"…","sound":"…","extreme":"…","reception":"…"},
 "identity":{"label":"…","year":0,"catno":"…","releaseType":"Album|EP","notes":"推翻起點名單的年份／廠牌／型態"},
 "apex":{"verdict":"heresy|pearl|none","accessibility":5,"listeners":null,"why":"一句話依據","evidenceUrls":["https://…","https://…"]},
 "notes":"可疑處、寫作要注意的事"}
```
- **key 寫法**：藝人或盤名含日文假名／漢字／韓文 → `desc4:`，否則 `desc2:`；後面接 `藝人|盤名`，與策展檔的 `artist`、`album` **逐字相同**。升格卡用卡池 seed 的藝人與盤名逐字。
- 收的卡 facts 8–15 條：`sound` 至少 3 條具體（速度、錄音狀態、失真、人聲、長度、曲數）、`extreme` 與 `reception` 各至少 2 條；單一來源在 text 末註「（單一來源）」。
  另要有 `making`（錄音時地、廠牌、壓量）與 `status`（在場景裡的位置、影響了誰——要具名）。
- 地位宣稱要能指名是誰、在哪裡說的；找不到具名來源的評價不准進 facts。禁簡體字。母語來源優先（日文、瑞典文、芬蘭文、義大利文、葡文、西文）。

## 工具紀律
- **WebSearch 整組最多 20 次**（整個工作階段共用 200 次）。先 WebFetch 直接讀已知頁面（原生語言與英文維基、Discogs API `https://api.discogs.com/releases/<id>`、Bandcamp、廠牌頁、樂評頁）。
- 任何 HTTP 請求 User-Agent 一律 `dip-vinyl-shop/1.0 (+https://dipvinyl.tw)`，**不得含 email**。
- 輔助腳本放 `desc-tools/batches/research/tmp-ax9-<組>/`，交件前刪掉。
- **續跑**：每做完 2 張就把兩個輸出檔整個寫一次；輸出檔已有內容就讀進來，從還沒做的那張接續，不要從頭重寫。

## 裁定
append 到 `batch-progress/add-20261104-ax9/rulings.md` 自己那組的條號區間（檔頭「預留」行），先讀檔、只追加不覆寫，在「## 策展研究 <組> 組」小節下逐張一行（收／不收＋一句理由）。

回報 10 行內：提名幾張、heresy／pearl／none 各幾張（列盤名）、升格判定、用了幾次 WebSearch、疑點。
