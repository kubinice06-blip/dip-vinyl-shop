### 2026-09-19｜dip-vinyl-shop｜c-163（Blue Note 2013–2016）五層管線走完，36 張

**改動摘要**：切片 45 張走完五層，**收 36 退 9**（a 17、b 19）。
身分 36/36 pinned、**簡介 36 張全 full 且字數 185–236**、封面 33/36、
⚠ **串流 36/36 全部有來源、零張走無來源狀態——本線目前唯一一批滿分**（其中 9 張人工回收）。
本批 apex 0 張、無合輯、例外欄全空。

**主要檔案**：`desc-tools/batches/{cards,research,hooks,input,output}/c163-*.json`、
`batch-progress/c163/{prop-a,prop-b,slice,caa,apple-candidates,rulings,rulings-mainline,HANDOFF}`、
`batch-progress/probe/previews.json`。

**驗證結果**：`chk-prop` 標記 0、`qa-batch research/hooks/out c163` 三層全清、
`chk-hook-crossgroup` 36 張全過且開頭四字互異、`qa-check-research` 兩檔標記 0 且 **hook 原封開頭 36/36**、
`fix-spacing` 兩檔待補 0。

**五條值得記住的**：
1. ⚠ ⚠ **第 1763-B 條（本線第一次）：研究層的中間欄會整段夾帶同批另一張卡的內容。**
   `Breathless` 的 `hookCandidate` 寫的其實是 `ArtScience` 的 Riley Glasper——兩張同批、同為「樂手的兒子在碟上說話」。
   **機器抓不到**（`qa-batch` 會歸到 `互指?`，而互指正是刻意讓軸的正常形狀）。
   **中間欄至此三種污染形狀**：多加沒出處的修飾／斷語超出引文／整段來自同批別張。
2. **第 1753-B 條：`0→0` 的四種成因，後三種都是「掛名不同形」**
   （店面把 feat. 子句塞進盤名欄／`artistName` 是本地語言形／`artistName` 用團名形而卡單用裸名）。
   **往後第一步固定用「第一位藝人的裸名」反查藝人目錄。這一條讓本批九張全部找回、零張無來源。**
3. **第 1739-B 條的字元預算在正確的位置生效了**：兩組初稿共 14 張超標，**全部在鉤子層整格捨去、零張留給寫作層**
   （對照 c-162 是寫作層被迫砍 13 張）。⚠ 殘餘誤差 1/36，成因是 `note` 末尾的「引用限制」式附註沒被算進預算。
4. **第 1764-B 條：反同構要逐句讀對組的 hook、比對句子骨架，不是比對開頭四字。**
   本批兩個真撞點都在派工信列的軸線之外，`chk-hook-crossgroup` 一次都沒亮。
5. **第 1751-B 條：一個樣本只能立「那一個樣本的事實」，不能立規律。**
   我從單一樣本推出「日本線 slug 一律姓在前」，實測 `chihiro-yamanaka` 200／`yamanaka-chihiro` 404，
   而 `kuroda-takuya` 剛好相反。**要立規律至少兩個同向樣本，且要在裁定裡寫明樣本數。**
