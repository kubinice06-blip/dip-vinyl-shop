# c-170 交接（2026-09-19）：Blue Note 2016–2026（列舉漏切補批之二），15 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

**列舉腳本讀錯曲風層級之後的補批之二**（第 1557／1558 條），2020 年以後那一段
＋`Kandace Springs` 整組移後的三張。**16 張收 15 退 1**（退的是 `lophiile《The Good Days Between》`，EP）。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 項目 | 狀態 |
|---|---|
| 身分（rgMbid 釘住） | **15/15 全部 pinned，零 §1 人工** |
| 三軸與頂點資格 | 卡單已帶；**本批 apex 0 張** |
| 固定簡介（desc） | **15/15 全 full**，字數 **196–220** |
| 封面 | ⚠ **15/15** |
| 固定試聽／無來源狀態 | ⚠ **15/15，零無來源卡**（4 張靠人工回撈救回） |
| §5.5／§5.6 例外欄位 | 例外欄全空 |
| published gate | 本機端 |

**封面與串流雙滿批，本線第二次**（前一次是 c-167）。
**4 張的串流是回撈救回的**：`_BY.ALEXANDER`（在架、`lookup` 通、`search` 索引查不到）、
`R+R=NOW Live`（掛名拆成 feat. 串＋盤名大小寫被改寫）、
⚠ **`Out Of/Into` 兩張——店面把五位成員全寫進 feat.，`artistName` 欄裡根本沒有團名**。

## 三、⚠ 本機審稿要盯的六件事

1. ⚠ ⚠ **`Motion I` 與 `Motion II` 都不是現場盤。**「巡演途中錄下」≠ 現場，**Motion II 逐字錄於 EastWest Studios**。
   **「巡演途中錄下」這條只歸 `Motion II`，`Motion I` 的正文實掃「巡演」0 次——那是刻意的。**
2. ⚠ **`The Women Who Raised Me` 十二軌全翻唱，但是她本人 2019 年的新錄音**
   ——**絕不可寫成「收錄爵士名伶的經典錄音」**（正文實掃「收錄…經典」0 命中）。
3. ⚠ **`R+R=NOW Live` 是現場盤（MB 漏標）**：正文寫了現場、錄音 2018 年 10 月紐約 Blue Note 俱樂部、**發行年 2021 不是錄音年**。
4. ⚠ **本批 15 張專輯本身 0 獎項**（研究層逐項查過，三筆訊號都是側人或前作的）
   ——**正文實掃 `獎`／`葛萊美`／`Grammy` 全部 0 命中。本機不要補。**
   `Paul Cornish` 的兩個大賽**藝人頁自己就寫 finalist**（決選），而且整格捨去了。
5. ⚠ **日本盤整批不寫**（實掃「日本」「Infant Eyes」「Deluxe」皆 0）：
   `Motion I` 的日本盤 bonus〈Infant Eyes〉是 Wayne Shorter 的曲子、
   **`Maya Delilah` 本卡釘 2025 年十二軌原盤，2026-01 的十六軌 Deluxe 曲目不在卡上。**
6. **`Openness Trio` 的錄音地點採新聞稿的五個戶外場次**（Discogs 寫 Studio Tujunga，實掃 0 命中）。

## 四、兩張 2026 盤都已經發行

**`FATHERS《FATHERS》` 2026-07-10**（三邊逐字相同，廠牌稿逐字 `the July 10 release`）、
**`Joel Ross《Gospel Music》` 2026-01-30**。
⚠ **主線先前把年份當成狀態、以為兩張未發行，是錯的**（第 1828-B 條）——**正文照已發行寫。**
`FATHERS` 是同名專輯（`selfTitled: true`），**與 c-167 的 `Nate Smith《Fathers》` 是同一張碟，那張已退件**（目錄號 `00199957415965`）。

## 五、兩條這批立下、對後批有用的寫作層裁定

1. **拉丁專名上限的例外**（裁定 3347／3377）：**當某個專名是 `hook` 懸念的唯一收尾時，不受「壓到 4 個以內」約束**；
   **要壓的是「主故事後續」與「成績或聲音」兩格裡的名單型專名。** 本批三張超上限（7／6／5 個），**15 張全部落在區間內。**
2. **撞下限時補的那一格取 `sound` 欄**（裁定 3372）：**不從 `facts` 撈鉤子層已砍掉的格。**
   依據是 base 預算表第四格逐字「一筆成績**或聲音**」，且 `sound` 從來不在 note 鏈上、不屬「正文只寫上列各項」的排除範圍。

⚠ **兩組寫作層的偏差方向一致：單向高估，撞的是下限不是上限**（a 組初稿一張 175、b 組一張 167，都補回一整格才進區間）。
**根因：鉤子層整格砍完後 note 鏈只剩 3–4 格，照 base 的預算表列必然高估。**
**→ 鉤子層砍得越乾淨，寫作層越容易撞下限。**

## 六、⚠ 給本機的一條警告：180 下限沒有任何機器在看

`qa-batch out` 驗 `>260`、`qa-check-research` 驗 `<80||>280`、`thin` 那段只在有 thin 卡時才驗 180
——**full 卡的 180 下限，三支腳本合起來看不到。**
兩組的初稿（175／167）都是合法 JSON、三支自檢全過。**收件依據只能是字數分佈那一行。**

## 七、產物清單

```
desc-tools/batches/cards/c170-cards.json          15 張卡單
desc-tools/batches/research/c170-{a,b}.json       研究層（179 條 facts）
desc-tools/batches/hooks/c170-hooks-{a,b}.json    鉤子層（7／8）
desc-tools/batches/input/c170-writer-{1,2}.json   merge 產物
desc-tools/batches/output/c170-out-{1,2}.json     寫作層（7／8）
batch-progress/c170/{prop-a,prop-b,slice,caa,apple-candidates,chk-prop}
batch-progress/c170/rulings.md                    第 2346–3380 條（五層＋藝人軸稽核 2481–2497）
batch-progress/memory-entries/c170-pipeline.md    備忘錄條目
batch-progress/probe/previews.json                串流 15/15
```
