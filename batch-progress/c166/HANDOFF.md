# c-166 交接（2026-09-19）：Blue Note 2023–2025，45 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

切片 45 張，**收 45 退 0**（a 23／b 22）。**Blue Note 線最近三年的現役目錄。**

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 項目 | 狀態 |
|---|---|
| 身分（rgMbid 釘住） | **45/45 全部 pinned，零 §1 人工** |
| 三軸與頂點資格 | 卡單已帶；**本批 apex 0 張** |
| 固定簡介（desc） | **45/45 全 full**，字數 **184–230**（a 189–230／b 184–214） |
| 封面 | ⚠ **45/45 全部有圖，本線第一次滿批** |
| 固定試聽／無來源狀態 | **43/45**，**2 張走固定無來源狀態** |
| §5.5／§5.6 例外欄位 | 本批無合輯，例外欄全空 |
| published gate | 本機端 |

**2 張無來源**：`Norah Jones《Playing Along》`（2023-11-24）與
`《Little Broken Hearts: Live at Allaire Studios》`（2023-04-22）
——**兩張都是 RSD 黑膠獨佔**：MB release 端點**沒有任何 `Digital Media` 版**、UPC 掃八個市場全 0、
藝人目錄其餘作品（含八筆以上 podcast 單曲）全部在架（第 1792-B 條）。
⚠ **`Little Broken Hearts (Deluxe Edition)`（31 軌）的第二碟是 Austin City Limits 2012，不是 Allaire**——**不可拿來頂替。**

**另 5 張的串流是人工回撈救回的**（探測層原本判 unavailable）：
`Corridors`（店面拆成 `Kendrick Scott《…(feat. …)》`）、`Forces of Nature`（同形）、
`The Omnichord Real Book`／`No More Water`／`Blue Eclipse`（**在架、`lookup` 通、`search` 索引查不到**）。
**五張的軌數與首發日與 MB release 端點逐筆對過。**

## 三、⚠ 本機審稿要盯的四件事

1. **`Meshell Ndegeocello《No More Water》` 寫「得獎」是對的**（第 67 屆最佳另類爵士專輯）。
   ⚠ **策展層完全沒寫獎項，而官網上唯一相關的是入圍名單稿**——**只讀官網會寫成入圍。**
   **同批另四張（Frisell／Wilkins／Branford／Clayton）是入圍未得獎，正文刻意不寫得主名字。**
2. ⚠ **`Chris Botti《Vol. 1》` 的合作名單整格不寫，是刻意的。**
   策展層的名單多了 Steven Tyler，三份 2023 發片稿的逐字名單沒有他
   ——**正文零提及名單、零否定句**（否定句會被當成校對痕跡）。**本機不要把名單補回去。**
3. ⚠ **`note` 沒列的軌名是刻意不寫的，不可從 `facts` 補回來。**
   鉤子層 b 組用了一種手法：**把軌名整格拿掉，綁在它上面的引用指示就一起消失**（比留軌名再加指示便宜 30–45 字元）。
   實測有 6 張走這個路子。
4. **`Little Broken Hearts: Live at Allaire Studios` 的正文不引用本碟盤名**
   （完整副標題 41 字元，加進去實測約 244 撞破上限）。
   **若店主堅持要副標題，要砍的是三位樂手那一格**（裁定 2573）。

## 四、寫作層兩組的偏差方向相反，兩邊都撞到邊

- **a 組**：鉤子層預期會超標，**實測 23 張初稿無一超標、1 張撞破下限**（`Joe Chambers` 初稿 175，
  把原本捨去的 `Francis Wolff` 整格補回，定稿 213）。
- **b 組**：**手算偏高、實測低 10–20，初稿 4 張掉到 180 以下（176／172／162／173），零張超標**，四張補回的都是 `note` 已列、預算階段先捨去的格。

⚠ **→ 「鉤子層超標 ⇒ 寫作層也會超標」不成立。偏差是雙向的，兩端都要驗。**

## 五、⚠ 一條規則的字面歧義（b 組提，建議本機看一眼）

**`note` 末尾的「正文只寫上列各項。」字面會讀成「列的每一項都必須寫」**，
與 `writer-base` 的「整格捨去」在預算吃緊時直接打架。
**b 組判定它是排除條款、不是必寫清單**（裁定 2606），**7 張各捨一格**
（Shorter 的英文原名、Tyner 的〈Taking Off〉、Charlap 的作曲者清單、山中千尋的假名原題、
López-Nussa 的祖父全名與〈Gitanerías〉、Charles Lloyd 的長曲名；Blue Lab Beats 三首路線曲名全留）。
**每張捨後主故事仍完整、懸念仍收尾。**

## 六、產物清單

```
desc-tools/batches/cards/c166-cards.json          45 張卡單
desc-tools/batches/research/c166-{a,b}.json       研究層（278＋264 條 facts）
desc-tools/batches/hooks/c166-hooks-{a,b}.json    鉤子層（23／22）
desc-tools/batches/input/c166-writer-{1,2}.json   merge 產物
desc-tools/batches/output/c166-out-{1,2}.json     寫作層（23／22）
batch-progress/c166/{prop-a,prop-b,slice,caa,apple-candidates,chk-prop}
batch-progress/c166/rulings.md                    第 1967–2630 條（五層）
batch-progress/memory-entries/c166-pipeline.md    備忘錄條目
batch-progress/probe/previews.json                串流 43/45
```
