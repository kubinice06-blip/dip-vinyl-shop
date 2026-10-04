# c-171 交接（2026-09-19）：藝人軸稽核補批，20 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼——**它不是列舉檔切出來的**

⚠ ⚠ **這 25 張連一列都不在 `enum/blue-note.json` 裡。**
成因是 **MB 的 `label-info` 沒填（18 筆）或掛錯層級（7 筆，掛成母公司或他廠）**
——**以廠牌為軸的列舉腳本永遠碰不到它們，重跑列舉也補不到**（第 1812-B／1818-B 條）。
是**改用藝人軸重掃 541 位藝人、8,937 張 1985 後 Album** 才找出來的。

**25 張收 20 退 5**：
| 退件 | 理由 |
|---|---|
| `Dexter Gordon《Tenor Titans》` | **不是 Blue Note**（Storyville；⚠ **稽核層引的佐證是另一張同名系列碟**） |
| `Jackie McLean《Fire and Love》` | **與 c-154 的《Fire & Love》同一張碟**（⚠ 稽核層的正規化沒沿用 `&`→`and`） |
| `Elvin Jones《At This Point in Time》` | **合輯**，7 軌中 4 軌與池中《The Prime Element》重疊 66% 時長 |
| `Michel Petrucciani《Trio in Tokyo》` | **不是 Blue Note**（⚠ `The Blue Note Tokyo` 在 `companies` 欄、role 逐字 `Recorded At`＝**演出場地**） |
| `Van Morrison《Born to Sing: No Plan B》` | **曲風閘：非爵士**（十三處證據 `jazz` 出現 0 次；**完全可逆，rgMbid 與建議曲風已寫進第 2753 條**） |

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 項目 | 狀態 |
|---|---|
| 身分（rgMbid 釘住） | **20/20 全部 pinned，零 §1 人工** |
| 三軸與頂點資格 | 卡單已帶；**本批 apex 0 張** |
| 固定簡介（desc） | **20/20 全 full**，字數 **192–238** |
| 封面 | ⚠ **14/20** |
| 固定試聽／無來源狀態 | ⚠ **14/20**，**6 張走固定無來源狀態** |
| §5.5／§5.6 例外欄位 | 例外欄全空 |
| published gate | 本機端 |

⚠ **覆蓋率是本線最低的一批，而且有結構原因**（第 1827-B 條）：
**被廠牌軸列舉漏掉的碟，在 Apple 與 CAA 也同樣是低能見度發行。**
**回撈七張只救回一張**（`Hat Trick`——**Apple jp 的 `artistName` 逐字是 `ジャッキー・マクリーン`，
用羅馬字掛名永遠搜不到，要靠盤名搜**）。
⚠ **但這條相關性只在店面／封面那一層成立**：**文字史料完全不受影響，20 張全 `full`、無一張 thin。**

**6 張無來源**：`Tommy Smith《Step By Step》`、`Ron Carter` 三張、`Kevin Eubanks《Spiritalk 2》`、`Ruben Hein《Live》`。
⚠ **`Ruben Hein《Live》` 另有一層可救**：釘的 RG `d00a707f` 無 barcode、無 label-info，
**同碟另一個 RG `47b79830` 有 barcode `5099994101225`**——**本機要再試可改用那個 RG 跑 UPC。**

## 三、⚠ 本機審稿要盯的六件事

1. ⚠ ⚠ **研究層推翻策展層十二處，是本線單批最高**，六處寫進正文就是硬錯誤。最要記的：
   **`Hat Trick` 的〈Left Alone〉不是「Waldron 寫給 Billie Holiday」——是兩人合寫、Holiday 從沒錄過；
   首錄是 Waldron 1959 年的同名專輯，中音手就是 Jackie McLean，隔 37 年再錄一次。**
   **`Spiritalk 2` 的時序相反**（發片時他已在代理 Tonight Show 音樂總監）、**Robin Eubanks 是哥哥**。
   **`That Day…` 的兩首作者全錯**（〈That Day〉含詩人 Nikki Giovanni、〈Dark Truths〉是 Joan Armatrading）。
2. ⚠ **`Hat Trick` 的錄音地是 Power Studio，`Power Station` 是《Cruisin'》那張**——**兩張不可互套**（全批 `Power Station` 0 命中）。
3. ⚠ **三處刻意不寫**（全批實掃 0 命中）：`Brandenburg` 的 note 與正文**沒有 Blue Note／eau／美版／日版**
   （美加版掛 Blue Note、**日版 `TOCJ-6037` 只掛 EAU Records 且只有 4 軌**）；`Cruisin'` 沒有發行地與版本；**全批 0 次提官網。**
4. ⚠ **`junkoonishi.com` 已易主為博弈導流站（HTTP 200），而英文維基仍掛它當 Official website**——**禁用來源。**
5. **兩張現場盤**（`Jason Moran《The Bandwagon》`／`Ruben Hein《Live》`）正文寫成實況；
   ⚠ **卡單 `releaseType` 欄是 `Album`，那是全線慣例（照 MB primary-type），不是資料錯誤。**
6. **`Brandenburg` 的弦樂團名單與鼓手整格捨去，但指揮 Kermit Moore 與首席 Sanford Allen 留下**
   ——**那兩句是骨架不是點名**（Moore 是美國第一支種族融合樂團創辦人之一、Allen 是紐約愛樂史上第一位全職非裔小提琴家）。

## 四、⚠ 主線待辦：還有三筆同形線索沒接

1. **`Kevin Eubanks《Spiritalk》(1993, Blue Note)`** —— 池中與所有批次都沒有。
2. ⚠ **`Stefano Di Battista Quintet《A prima vista》(1998)`** —— **`primary-type` 欄未設**，
   **連藝人軸稽核的 `type=album` 過濾都會漏掉，可能是第六種列舉失效形狀。**
3. **`Stefano Di Battista《Parker's Mood》(2004)`** —— **在 enum 裡但該列 `year` 欄逐字 `null`**，依年份排序切批時掉出去。
   **→ 建議查 enum 裡還有多少列 `year` 是 null。**

## 五、產物清單

```
desc-tools/batches/cards/c171-cards.json          20 張卡單
desc-tools/batches/research/c171-{a,b}.json       研究層（120＋113 條 facts）
desc-tools/batches/hooks/c171-hooks-{a,b}.json    鉤子層（10／10）
desc-tools/batches/input/c171-writer-{1,2}.json   merge 產物
desc-tools/batches/output/c171-out-{1,2}.json     寫作層（10／10）
batch-progress/c171/{prop-a,prop-b,slice,caa,apple-candidates,chk-prop}
batch-progress/c171/rulings.md                    第 2691–3571 條（五層）
batch-progress/enum/blue-note-artist-axis-audit.{md,json}   稽核報告（541 位藝人、1,025 筆覆核）
batch-progress/memory-entries/c171-pipeline.md    備忘錄條目
batch-progress/probe/previews.json                串流 14/20
```
