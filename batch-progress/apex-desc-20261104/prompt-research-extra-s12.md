# 研究層補充（s12：流亡 ad-23、異端尾批 ad-24）

## 共通

- 卡單的 `currentDesc` 是舊稿，**每個具體事實都要查證**，錯的寫進 notes。
- **Discogs**：網頁版會 403，改用 `https://api.discogs.com/` 的 `/releases/<id>`、`/masters/<id>`、`/artists/<id>/releases`、`/labels/<id>`（database/search 要 token，不可用）。MusicBrainz API（`https://musicbrainz.org/ws/2/...?fmt=json`，每秒 1 次）也可用。**這兩個不耗 WebSearch，資料薄的卡一定要用。** UA 照規定 `dip-vinyl-shop/1.0 (+https://dipvinyl.tw)`。
- 收藏擁有／想要人數只寫質性，不給數字。只查到單一版本時寫「沒有再版紀錄」，不寫「從未再版」。
- 再版廠文案的形容詞不當評價；事實可用、notes 註明是廠商文案。團體層級事實要在 text 裡寫明是團體層級。
- 卡單 year 欄可能是再版年或錄音年，查到不同就寫進 notes。查不到的塊標 none，不要湊。
- **暫存檔一律放你自己的目錄** `/tmp/claude-0/-home-user-dip-vinyl-shop/d9b6c5e1-3975-5497-836c-a776d66668cb/scratchpad/{BATCH}-{G}/`，不要用共用檔名。
- 本工作階段 6 支研究代理共用 WebSearch 額度：**你這支最多 25 次 WebSearch**。

## ad-23（流亡）

先完整讀 `prompt-research-extra-s7.md`（流亡節）、`prompt-research-extra-s8.md`、`prompt-research-extra-s11.md`，照做。重點：

- **status 塊分兩半查，每半至少 1 條 fact**：(1) **為什麼少有人聽**——私壓、壓量（有出處才寫張數）、地方發行、沒再版多久、樂團早散、只在某地流通；(2) **為什麼值得聽**——後來被哪個廠（廠名＋年份）重新發行或點名（DJ、合輯、書、具名樂評、Paul Major、Fuzz, Acid and Flowers、Acid Archives〔Patrick Lundborg〕、Nurse With Wound list）、收藏圈怎麼看、它做到了什麼。
- 本批多為 1960–80 年代美英私壓民謠／迷幻搖滾（找 Acid Archives、Guerssen、Shadoks、Out-Sider、Lion Productions、Gear Fab、Fruits de Mer、Riverman、Sommor、Wah Wah、Paradise of Bachelors、Tompkins Square、Numero 等再版廠頁與收藏圈部落格），以及 1970–80 年代美國獨立靈性爵士／自由爵士（Strata-East、Black Jazz、Muse、Theresa、Center of the World、JCOA 等廠，找再版廠頁、All About Jazz、Dusted、Free Jazz Collective、Penguin Guide、Jazz Times、AllMusic、liner notes）。荷蘭盤找荷蘭文來源。
- 美國爵士盤很多不是私壓（Muse、JCOA 等正規小廠）：查不到稀少證據就不寫難找，寫實際流通（小廠、沒 CD 化、絕版多久、何時再版）。

## ad-24（異端）

先完整讀 `prompt-heresy-addendum.md` 與 `prompt-research-extra-s7.md`（異端節），照做：每張至少 2 條 `block:"extreme"`、2 條 `block:"reception"`，coverage 加 `extreme`、`reception` 兩欄。

- 本批是噪音（harsh noise、harsh noise wall、Japanoise、power electronics）、聲音詩（Henri Chopin、François Dufrêne）、黑金屬／死亡金屬極端分支、電腦噪音。找 The Wire、Quietus、Pitchfork、Dusted、Tiny Mix Tapes、Aquarius Records、Decibel、Invisible Oranges、Metal-Archives（reviews）、Angry Metal Guy、Spellemannprisen 官網、Japanoise 專書（David Novak《Japanoise》）、Noise 專書（Paul Hegarty《Noise/Music》）、廠牌頁（RRRecords、Hospital Productions、Mego、Smalltown Supersound、Season of Mist、Relapse、Deathlike Silence、Sub Rosa、Alga Marghen、Metamkine、Siltbreeze、Agaric、Helicopter、At War With False Noise、Self Abuse）。日本盤找日文、法國盤找法文、挪威盤找挪威文。
- **ax1／ax2 上架時已有研究稿**：`/home/user/dip-vinyl-shop/desc-tools/batches/research/add-20261104-ax1-{a..e}.json`、`add-20261104-ax2-{a..e}.json`（照 artist／album 找你負責的卡）。**先讀它當起點**，裡面的事實要沿用前先確認出處網址真的這樣寫，再補地位、極端、反應三塊（舊研究多半偏盤號與發行日，缺評價與聲音手法）。
- 極端的證據要具體可量化（總長、單軌長、軌數、聲源、器材、音量指示、錄音方式、限量套數）；反應要具名（媒體、年份、評者、榜單名次、獎項入圍／得獎分清）。
