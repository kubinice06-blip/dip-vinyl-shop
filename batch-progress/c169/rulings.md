# c-169 裁定（Blue Note 1985 年後線・列舉漏切補批之一）

本批與 `c170` 都不是原始列舉切出來的，是 **2026-09-18 查出列舉腳本曲風判錯層級**之後的補批。
背景見 `batch-progress/enum/blue-note-unknown-genre.md`
與 `batch-progress/CURATION-BRIEF-bluenote-post1985.md` 的 2026-09-18 附錄。

## 第 1557 條（主線，**新立；c168／c169／c170 共用**）：**列舉漏切的 75 張 `jazz-missing` 全部補成 slice——這是「失敗與正常長得一樣」在**列舉層**的一次應驗**

- **根因**：列舉腳本讀 **artist 端**的 genres 來判曲風，而不是 **release-group 端**。
  97 張進 `unknown` 的盤裡，**artist 端 92／97 是空的**，**RG 端卻有 54／97 明寫 `jazz`／`hard bop`／`post-bop`**。
  `blue-note.json` 的 `generated` 是 **2026-09-15**，**不是舊資料**——腳本當天就讀錯了層。
- **形狀**：`unknown` 這個值本身沒有錯，**「MB 真的沒標曲風」與「我讀錯層所以沒讀到」回報的是同一個值**。
  整條線因此少切 75 張、而且**沒有任何一道檢查會亮燈**（卡池對得起來、dedup 全清、chk-prop 四道全過）。
  **列入第 1370／1371／1433 條那一族。**
- **處置**：
  - **1985–1999 的 17 張 → `c168/slice.json`**（18 張：另含 Don Byron《Nu Blaxploitation》的真 RG
    `6aab4e1b-5c96-32e8-a3ba-328fcd8f1c50`，原判 `jazz-dup` 是因為對到了錯的 RG）。
  - **#96 Wilkins《Live at the Village Vanguard Vol. 1》→ 補進 `c167/slice.json`**，
    否則本線會出現**只有 Vol. 2、Vol. 3 沒有 Vol. 1 的斷號**。
  - **其餘 57 張 → `c169`（41 張，a 21／b 20）＋ `c170`（16 張，a 8／b 8）**，切法見下一條。
- ⚠ **同一支腳本產出的其他廠牌線可能有同樣的缺口。** 雲端這邊沒有重跑列舉的權限，
  **建議本機用 `release-group?inc=genres+tags` 重跑各線的 `unknown` 列**，逐線比對數字。

## 第 1558 條（主線）：**c169／c170 的切批界線取 2020 年，唯一例外是 Kandace Springs 整組移後**

- **2000–2019 → c169（41）；2020 年以後 → c170（16）。**
- **例外**：**Kandace Springs 的三張（2016 Soul Eyes／2018 Indigo／2020 The Women Who Raised Me）整組移進 c170。**
  理由：她與 Joel Ross（2020／2022／2024／2026 四張）是本線**卡池裡一張卡都沒有**的兩條線，
  整條落在同一批，**反同構條款與掛名判定各只需做一次**，也避開第 1418 條「同一位藝人被兩批各判一次掛名」的風險。
- **c170 是本線最小的一批（16 張），不再往下拆。**
- 兩批 slice 的 `genre` 欄統一 `jazz`；人工判定的細曲風存 `triageGenre`，
  `triageN` 保留 `blue-note-unknown-genre.md` 的編號以便回查；
  `note` 欄逐張寫明「列舉層曲風判錯層級（讀藝人端而非 RG 端）而漏切」＋人工判定值。

## 第 1559 條（主線，**策展層必讀**）：**本批有四種「邊界張」，判準與既有裁定的對應**

`blue-note-unknown-genre.md` 標了 ⚠「邊界張，可逆」的，在 c169 落了 5 張：
**Jackie Allen《Tangled》**（人聲爵士唱 folk-rock 曲目）、
**Anna-Mari Kähärän Orkesteri** 同名盤（爵士×北歐民謠）、
**Kitty Hoff & Forêt-Noire《Zuhause》**（德語 chanson-jazz）、
**Emma Salokoski & UMO《Rytmihyrrä / Rytmyra》**（大樂團演兒童歌曲企劃）、
**Sunaga t Experience《STE》**（DJ 企劃 jazzdance）。

- 這五張**已經通過 jazz／non-jazz 判準進了 slice**，策展層**不要再拿曲風把它們退掉**；
  要退只能靠**收藏線判準六句（甲～己）**或 published gate。
- **c170 另有 `lophiile《The Good Days Between》（2023，8 軌 17 分鐘）**——
  **EP 收不收由策展層當場定並寫進 rulings**（裁定權下放）；判準先看池中同形狀的前例。

## 第 1560-AD 條（主線，**c-160 策展 a 提出的 `Blue Note Label Group` 疑慮已全線稽核；結論：前面各批乾淨**）

c-160 策展 a 新立第 1631／1633 條：**`Blue Note Label Group [2eb19785]` 不是 imprint，是 EMI 2006 年起的部門名**，
懷疑列舉檔可能因此把 Manhattan／Narada／Angel 的碟混進前面幾批。
**主線已對全 repo 做逐 RG 稽核**（MB 拉該實體全部 12 筆 release → 折成 11 個 RG →
比對 `enum/blue-note.json`、所有 `batch-progress/c*/`{`slice`,`prop-a`,`prop-b`}`.json`、
以及 `desc-tools/batches/cards/` 全部卡單）。

**結論：已發卡的各批（c-148～c-159）一張都沒有混進來。** 11 個 RG 的落點：

| RG | 落點 |
| --- | --- |
| Amos Lee《Last Days at the Lodge》／Priscilla Ahn《A Good Day》／the bird and the bee／Gregory Porter《Liquid Spirit》／Alejandro Escovedo《Real Animal》／Ambrose Akinmusire《on the tender spot…》 | **只在 `enum/blue-note.json`，未進任何 slice** |
| Various《The Best of Capitol Rare》／Marc Moulin《Into The Dark》／Norah Jones《Live in 2007》 | **連列舉檔都沒有**（前兩筆是合輯與非本線盤；Norah 那張在 c160 的是另一個 RG） |
| **Anoushka Shankar & Karsh Kale《Breathing Under Water》** | **c160/slice.json ——已由 c-160 策展 a 依第 1631 條退掉，正確** |
| **Dr. John and the Lower 911《Sippiana Hericane》** | **c169/slice.json（主線補批）——見下條** |

**→ 第 1631 條的風險是真的，但只在 2006 年以後的批次才碰得到，而本線 c-160 之前全是 2005 年以前的碟。**
c-160 策展 a 建議「用 label id 重跑 1,812 列過濾」**在雲端這一段已無必要**；
**c-161 以後（2008+）仍要逐批照第 1631 條的分界檢查。**

## 第 1560-AE 條（主線，**裁定**）：**Dr. John《Sippiana Hericane》留在 c169，但要標成 EP**

依第 1631／1633 條的分界逐項查：
- **MB 三筆 release 沒有任何一筆掛 `713c4a95`**（XE 掛 EMI、US 掛 `Blue Note Label Group:45687`、XW 掛 Parlophone）。
- **但 Discogs 美版零售條目（`0946 3 45687 2 2`）的廠牌鏈第一格逐字是 `Blue Note`**，
  另有一筆 2005 年的 `Blue Note` 宣傳 CDr。

**裁定：收。** 第 1631 條的分界是「**有沒有任何一版真的掛過 Blue Note**」，
**Anoushka 那張退掉是因為零售第一格逐字 `Manhattan Records`＋Billboard 榜欄逐字 `MANHATTAN 09539 /BLG`，
兩邊都指向別的 imprint；這張的零售第一格就是 Blue Note，方向相反。**
**MB 的 label-info 在 2005–08 這段本來就常把 `713c4a95` 記成 `2eb19785`（部門名蓋掉 imprint），
不能拿 MB 單邊的缺漏當退件理由。**

⚠ **但要標一件事：這張是 EP。** MB 兩筆 release 都是 **7 軌、總長約 25 分鐘**
（〈Clean Water〉2:31／〈Wade: Hurricane Suite〉四段／〈Sweet Home New Orleans〉8:14／〈Clean Water (reprise)〉0:25），
**Discogs 三筆零售條目的 format 欄都逐字帶 `EP`。** 這是卡崔娜風災的募款企劃盤。

**→ 已在 `batch-progress/c169/slice.json` 的該筆 `note` 標註。**
**收不收 EP 由 c-169 策展層當場定**（與 c170 的 `lophiile《The Good Days Between》`，8 軌 17 分鐘，同一個問題）
——**兩張一起決定，不要一張收一張退。** 判準先看池中同形狀的前例。
