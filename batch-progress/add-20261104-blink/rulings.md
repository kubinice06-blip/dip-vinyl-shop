# add-20261104-blink：blink-182《Buddha》《Cheshire Cat》《Dude Ranch》

店主（2026-11-04）：「blink-182 竟然沒有 Buddha。」卡池原有《Enema of the State》《Take Off Your Pants and Jacket》《Blink-182》《Neighborhoods》；補早期三張。

## 裁定（主線自決，CLAUDE.md 裁定權下放）

1. **藝人欄** `blink-182`（ASCII 連字號，與池內四張一致；MB 正規名用 U+2010 已正規化）。KV 鍵 `desc2:blink-182|…`。
2. **身分**：三張皆 pinned（MB RG）。
   - 《Buddha》b9ed79e9：MB 為 Album＋**Demo**。依任務指示比照 §5.5 精神以店主點名例外收，`identity.releaseException: 店主點名，demo 例外`、`mbSecondaryTypes: [Demo]`、`exceptionReason`／`exceptionEvidenceUrls` 寫進 manifest（驗證器對 primary=Album 不檢查，例外欄是給人看的紀錄）。
   - **版本鎖 1998-10-27 Kung Fu Records 重混再發**（CD 78765-2，條碼 610337876522，14 軌）：CAA RG front 即此版封面（「BLINK 182」綠佛像）、Apple 259070589 為 14 軌同曲序、seed 年份 1998。1994-01 Filter Records 卡帶（15 軌）是原貌，簡介交代。
   - 《Cheshire Cat》0a467c9c：1995-02-17 Cargo（條碼 723248613626），鎖原版。Apple 頁 releaseDate 寫 1994-02-17 為上架資料錯誤，不採。
   - 《Dude Ranch》19b6b24f：MB 最早日期 1997-04-14（澳洲版 16 軌）；鎖美國 1997-06-17 Cargo／MCA 15 軌（Apple 1440844811 同）。年份同為 1997。
3. **三軸**（§0.8.1 錨點，worker 機器值僅參考）：
   - 《Buddha》3／2／2 common；《Cheshire Cat》3／2／2 common；《Dude Ranch》4／1／2 rare。
   - 經典度：Dude Ranch 是公認代表作之一（RIAA 白金、〈Dammit〉Modern Rock Tracks 第 11 名）→ 4，與池內 Enema／TOYPAJ 一致；Buddha（demo 再發）與 Cheshire Cat（首作、評價零散）有明確地位但非代表作 → 3。
   - 冷門度：L 248k／465k／1.07M，正規發行、全面上串流 → 2／2／1；下限不觸發。
   - **硬蕊度 2**：開工時 origin/main 進來另一工作階段的 commit 3c635b4e0（店主：「他們的歌明明很硬蕊，硬蕊只有一顆星？」池內四張 1→2）。本批三張一律 2；早期兩張更粗更快，但沒有長篇／即興／不協和，不到 3。Dude Ranch 因此由初判 4/1/1 common 改 4/1/2 rare，card_catalog 已重推。
4. **頂點**：三張皆一般卡（經典 ≤4、冷門 ≤2、硬蕊 2）。
5. **封面**：三張 CAA RG front，主線目視（Buddha 1998 綠佛像、Cheshire Cat 暹羅貓、Dude Ranch 黑牛）。
6. **試聽**：三張 Apple TW ready（collectionExplicitness 皆 explicit、無 cleaned 雙胞胎）：Buddha 第 1 軌〈Carousel〉、Cheshire Cat 第 2 軌〈M+M's〉、Dude Ranch 第 3 軌〈Dammit〉。走靜態路徑，不需 album_overrides。
7. **流程縮放**：3 張批，研究 1 組（Sonnet，WebSearch 4 次，facts 12／12／13），hook 省略、寫作與審稿由主線做（照 add-20261104 先例的新寫法）。
8. **卡單更正**（研究層推翻）：Buddha 與 Cheshire Cat 的 Jeff Forrest 是工程師／混音，不是製作人（Buddha 製作署名 Pat Secor、Cheshire Cat 製作 Otis Barthoulameu）；Cheshire Cat 的「1998 Cargo 再發」查無；1998 Buddha 為重混＋重新母帶，來源未說重錄、未說誰重混 → 簡介只寫「重新混音再發」。

## 主線審稿（3 張，2026-11-04）

初稿 377／304／378 字全超上限，整格捨去後定稿 236／218／239。

- `desc2:blink-182|buddha`（236）：
  - 1994-01、三個晚上、Santee（寫成「聖地牙哥郊區」）、團名 Blink、Raynor 念高中 ← research f1、f4。
  - Filter Records、一次五卷寄賣 ← f3。版稅糾紛、Joe Escalante／Kung Fu、CD 抵律師費 ← f6。1998 重混再發 ← f7。
  - 「照 Descendents 的路子」← f9（DeLonge 訪談）；兩位主唱輪流 ← f10。
  - 捨去：Ben Weasel〈The Girl Next Door〉、拿掉三首的曲名、Doubletime 名稱、Escalante 的 The Vandals 身分（字數）。
- `desc2:blink-182|cheshire cat`（218）：
  - 1995-02 Cargo ← f1。改名經過照 research notes 建議保守寫「表示不滿、唱片公司怕官司打輸」← f2；182 由來玩笑說法 ← f3。
  - 聲音「快而單薄」← f10、f12；DeLonge 鼻音唱腔首度亮相 ← f10；91X 固定播出 ← f7。
  - 捨去：封面貓月曆（冷知識，字數）、Westbeach 三天遲到（第二個故事）、Raynor 的鼓。
  - qa-check-research 標「編造專名? Mark Hoppus／Tom DeLonge」：研究稿只寫姓，全名為團員正式名（Buddha 研究稿 f7、f10 有 Mark Hoppus），判誤報。
- `desc2:blink-182|dude ranch`（239）：
  - 1997-06 Cargo／MCA ← f1；〈Dammit〉Modern Rock Tracks 第 11 名 ← f5；RIAA 白金 ← f8（單源維基，只寫「拿到白金」不寫日期）。
  - Trombino 收緊演奏 ← f4；吉他刮耳、下刷與空弦 ← f13；輪流領唱 ← f13。
  - Raynor 坐輪椅錄鼓、最後一張、1998 Barker 接手 ← f4、f11（離團月份不寫）。
  - 刪：「互相和聲」「後來」「在團裡」（壓到 240 內）。Big Fish 地點兩說，改寫成不提錄音室。
