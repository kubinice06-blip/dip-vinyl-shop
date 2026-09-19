# c-163 交接（2026-09-19）：Blue Note 2013–2016，36 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

切片 45 張，**收 36 退 9**（a 17、b 19）。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 項目 | 狀態 |
|---|---|
| 身分（rgMbid 釘住） | **36/36 全部 pinned，零 §1 人工** |
| 三軸與頂點資格 | 卡單已帶；**本批 apex 0 張** |
| 固定簡介（desc） | **36 張全 full**，**185–236**，兩端都沒撞到 |
| 封面 | **33/36**（缺 3，研究層三張都撿到兩個可用網址，見下） |
| 固定試聽／無來源狀態 | ⚠ ⚠ **36/36 全部有來源，零張走無來源狀態——本線目前唯一一批滿分**（其中 **9 張是人工回收**） |
| §5.5／§5.6 例外欄位 | 本批無合輯，例外欄全空 |
| published gate | 本機端 |

**缺封面 3 張，研究層各給了兩個網址讓本機挑**：
- `Tim Hagans《Audible Architecture》` → Discogs 3941957 主圖 ＋ Apple `1443084065`（1200×1200）
- `Fabian Almazan《Rhizome》` → Discogs 13713629 主圖 ＋ Apple `836179351`
- `Charles Lloyd《Wild Man Dance》` → ⚠ **美版 Discogs 9354939 沒有圖，歐版 6907361 有** ＋ Apple `1443196436`

## 三、⚠ 九筆人工回收的試聽，本機不可改動

**全部經第 1433 條核對（id 未被任何其他卡使用）。** 最需要知道的四筆：

| 卡 | collectionId | 市場 | 為什麼探測層找不到 |
|---|---|---|---|
| `Marcus Miller《Afrodeezia》` | `960994951` | **jp 獨有** | ⚠ **jp 的 `artistName` 逐字 `マーカス・ミラー`**（℗ `Victor Entertainment`）——**用拉丁掛名搜不到**。us／gb／fr／de／it 對同一 id 都回 0 軌 |
| `Robert Glasper《ArtScience》` | `1440834038` | us | ⚠ **us 的 `artistName` 逐字 `Robert Glasper Experiment`，卡單用裸名** |
| `Charles Lloyd《Wild Man Dance》` | `1443196436` | us | 盤名的括號後綴 `(Live At Jazztopad Festival, Wroclaw, Poland)` 撞上標題比對的長度差 |
| `Bobby Hutcherson, David Sanborn & Joey DeFrancesco《Enjoy the View》` | `1444043015` | us | ⚠ **店面把 feat. 子句塞進盤名欄、artist 欄只掛短形**——三位並列的長掛名搜不到 |

其餘五筆：`José James《While You Were Sleeping》` `1442224969`、`THE SPHÈRES《Live in Osaka!!》` `1442540804`（jp）、
`Robert Glasper《Covered》` `1440873451`（⚠ **13 軌對的是日版 UCCQ-1042／MB frd 那版，美版 CD 是 12 軌**）、
`Terence Blanchard featuring The E-Collective《Breathless》` `1442942572`、`Joe Lovano Quartet《Classic! Live at Newport》` `1443215479`。

⚠ ⚠ **本批推翻了第 1733 條**：該條記「`Afrodeezia` 與 `ArtScience` 的 Apple 店面全空」——**兩張都在架上，是搜尋用的掛名不對。**

## 四、⚠ 研究層推翻策展層：a 組 12 張、b 組多處

**本機不要拿策展層的 `curatorWhy` 當事實，一律以 `desc-tools/batches/research/c163-{a,b}.json` 為準。**
最容易誤寫的幾條：
- **`José James《While You Were Sleeping》` 的鼓手是 Richard Spaven，不是 Nate Smith**
  （⚠ **Nate Smith 是同批 `黒田卓也《Rising Son》` 那張的**——策展層就是在這裡掛錯的）。
- **`Yaron Herman《Everyday》` 是雙人錄音（Herman ＋ Ziv Ravitz），不是三重奏**；軌 9 作曲者**是 Alexander Scriabin 不是蕭邦**。
- **`Bobby Hutcherson…《Enjoy the View》`**：〈Hey Harold〉是 Hutcherson 的曲；**七軌全部出自這三位**；**錄音其實在 2013 年**。
- **`Jason Moran`**：Ndegeocello 在這張不彈貝斯（credit 只有 Producer＋Vocals）。
- **`Tim Hagans`**：⚠ **年份是 1995 不是 2014**；Bob Belden 只在第 4、6、7、9 軌；自作 7 軌。

## 五、⚠ 一筆研究層中間欄的跨卡污染，已處理，本機知悉即可

`Terence Blanchard《Breathless》` 的研究層 `hookCandidate` 寫了「五歲兒子看新聞時說的話」——
**那其實是同批 `Robert Glasper《ArtScience》` 的 Riley Glasper**（兩張同批、同為「樂手的兒子在碟上說話」）。
**鉤子層抓到並把本卡口白整格拿掉、該軸整條歸 `ArtScience`；寫作層已核對，全批只有《ArtScience》出現「五歲」。**
⚠ **`qa-batch` 抓不到這種形狀**——它會歸到 `互指?`，而互指正是刻意讓軸的正常形狀（主線第 1763-B 條）。

## 六、⚠ 兩筆經主線覆核的寫作判斷

1. **兩張葛萊美卡沒有互相點名對方。** `Covered` 與 `Breathless` 同為第 58 屆同項入圍，鉤子層的 `note` 要求互指，
   **寫作層判定不寫，主線覆核後同意**（見主線第 1767-B 條）：**兩張都沒有宣稱「唯一入圍」，
   而「同批」對讀者沒有意義、且對方的榜位不在本卡 facts 裡。** 兩張都只寫「入圍第 58 屆葛萊美的爵士器樂專輯」。
   ⚠ **本機若要補回對方名字，兩張各加約 14 字仍在區間內。**
2. **葛萊美類別用中文**（「第 58 屆葛萊美的爵士器樂專輯／當代器樂專輯」），沿用卡池 c14x 的既有先例。
   ⚠ 英文原名 28–29 字元，三張都寫會吃掉整格預算；**若本機要統一用英文原名，`Afrodeezia` 會到 228（仍在區間內）。**

## 七、QA 結果

- `chk-prop a b`：標記 0。
- `qa-batch research/hooks/out c163`：**三層全清**（`out` 零 `未具名出處?`）。
- `chk-hook-crossgroup c163`：**36 張跨組全過**，開頭四字 36 張互異。
- `qa-check-research`：兩檔各一次，**標記 0**；**hook 原封開頭 36/36**。
- `fix-spacing`：兩檔 dry-run **待補 0**，未加 `--write`。
