# c-46 電影原聲＋跨域：進度快照與續跑指引

**狀態：策展、身分、封面、試聽四階段完成；封面補救做到一半；寫作尚未開始。**
**2026-08-28 因 session 額度上限中斷，店主指示先停。**

這個目錄是把 scratchpad 的中間成果固化進 repo，因為**遠端容器閒置後會被回收**，
scratchpad 會連同數小時的 agent 工作一起消失。續跑時把這些檔案複製回
`<scratchpad>/batch-c46/` 即可從斷點接續，不需要重做任何一步。

## 各階段結果

| 階段 | 結果 |
|---|---|
| 策展（5 條線） | **245 筆**，池內零撞鍵、批次內零重複 |
| 身分 | **243 釘上 rgMbid**（自動 214／人工裁定 29）、人工身分 1、drop 1 |
| 封面 | CAA 命中 **216/243（88.9%）**，27 筆需補救 |
| 封面補救 | **已救 9 筆**（見 `cover-fix.json`），**剩 18 筆未做** |
| 試聽 | ready **153/243（63%）**，90 筆無來源待救援 |
| 寫作 | **尚未開始** |

策展分線：配樂 85、戰前爵士 47、福音 43、雷鬼 40、新世紀 30。合輯 75 筆（走 §5.6）。

## 續跑步驟

1. 把本目錄所有檔案複製到 `<scratchpad>/batch-c46/`。
   （`identity.json` 已剝除 `candidates` 欄以節省體積，那是 MB 搜尋結果、下游不需要。）
2. **封面補救剩 18 筆**：清單見 `cover-rescue-list.json` 扣掉 `cover-fix.json` 已有的 9 筆。
   已知情況：**這 27 筆在 release 層也全部 404**（補救 agent 實測），所以只能走 Apple。
   Apple 來源的 `coverSource` 一律記 `manual`，寫 `apple` 會被驗證器擋
   （只認 bandcamp／spotify／caa／manual）。
   `covers/` 底下的圖檔未進 repo（體積考量），可依 `cover-fix.json` 的 `coverUrl` 重抓。
3. **試聽救援 90 筆**：清單見 `preview-rescue-list.json`（含 `line` 欄可分工）。
   各線命中率：新世紀 83%／福音 67%／配樂 60%／戰前爵士 57%／雷鬼 57%。
   - **配樂那 60% 偏低是查法問題不是真的沒有**：卡在外語題名
     （《Per un pugno di dollari》《Nuovo Cinema Paradiso》），Apple 常用英文片名建檔。
     外語原題與英文片名要雙查；日本作曲家用 `jp` 商店並對日文名與羅馬拼音各查一次。
   - **戰前爵士與雷鬼有相當比例是真的沒有**：JSP、Proper、ASV/Living Era、
     Blood & Fire、Studio One 這些 1990 年代 CD 結集很多沒上串流。判 `none` 是正確結果。
   - **結集的曲序比對要特別小心**：同藝人不同結集大量收錄相同曲目，
     「前 5 軌有幾首相同」不足以判定同一張，要曲數與曲序都吻合或用 barcode 交叉確認。
     配錯結集比沒有試聽更糟。
4. 合併：`node merge-cover-fix.mjs batch-c46`、`node merge-preview-fix.mjs batch-c46`
5. 產 writer-inputs → 寫作（**店主要求一次只放 3–4 塊**，每塊落地是一個存檔點）
6. 組裝 → `node scripts/verify-album-onboarding.mjs <manifest> --prepare` 到 0 error
7. PROJECT_MEMORY 記錄 → commit → push

## 這批已知要單獨處理的

- **人工身分 1 筆：Jack Teagarden《That's a Serious Thing》**。
  `pipe-cover-upc.mjs` 與 `pipe-preview.mjs` 都會過濾 `r.rgMbid`，
  **沒有 rgMbid 的列會被靜默跳過**——c-41 整條客語／原民線就是這樣消失的，
  只在組裝器的 SKIP 清單裡才看得到。這筆的封面與試聽要手動補。
- **drop 1 筆：Georges Delerue《Le mépris》**。MB 只有 1963 的 7 吋 EP（非白名單不可收）
  與 1991 Auvidis CD，而後者 14 軌裡只有前 4 軌屬本片，其餘是另外三部片——
  是 Delerue 配樂選輯不是本片原聲帶。若日後 soundtrack 進 §5.5 白名單可回頭收 EP。

## 寫作階段的 brief 要帶的重點

- **年份**：店主 2026-08-23 裁示 `year` 填**該盤發行年**。manifest 沒有 year 欄位，
  年份是存成 `research.suggestedYear` ＋ `yearNote` 給店主本機寫入時參考，
  gate 不檢查。合輯的錄音年寫進 `yearNote`，兩個數字都攤給店主。
  戰前爵士線的候選另存了 `recordingYear`，福音／雷鬼／新世紀部分筆數也有。
- **§5.6 合輯**：75 筆需 `exceptionReason`（≥12 字）與 `exceptionEvidenceUrls`（≥2 個 HTTPS）。
  §5.6 **不要求原廠母帶**，「唯一可得的錄音形態」是規則明文承認的理由。
- **戰前結集的封面本來就是後製拼貼**（戰前沒有專輯封套），那不算錯圖；
  但 JSP／Proper／ASV／Frémeaux 的系列設計高度相似，要防抓到別的結集的美術。

## 策展階段的教訓（下一批的 brief 要帶）

1. **不要相信 brief 對「缺口在哪」的假設，先查再決定重心。**
   雷鬼線與新世紀線都推翻了我的前提：池內 roots reggae 早被 c-31 鋪滿、
   ambient 與日本環境音樂也已有 15 張以上，真正的缺口分別在
   ska/rocksteady 與 lovers rock 兩端、以及「新世紀作為 1970–1995 商品品類」
   （Windham Hill 整條線掛零）。兩位 agent 因此重新配置整批重心，成果好得多。
2. **`seed_cards.json` 是 8,314 列，全池（含 apex 與 manifest）才 12,511。**
   戰前爵士線把全池數字當成 seed 的，據此推論「VA 掛名零先例」而放棄
   《From Spirituals to Swing》——實際上 manifest 裡有 25 筆 Various Artists。
3. **策展 agent 標「MusicBrainz 查無」要複驗**：c-46 有 7 筆這樣標的其實都有條目，
   其中 5 筆的 `compEvidenceUrls` 裡就直接放著該 release-group 的 MB 連結。
4. **跨文字系統掛名分裂是工具解不掉的**，只能人工雙查（漢字一輪、羅馬拼音一輪）。
   本批實例：`Tan Dun 譚盾` 在 MB 是**簡體「谭盾」**；`浜瀬元彦` 的 MB 藝人實體是
   **異體字「濱瀬元彦」**、RG 掛名卻是羅馬拼音 `Motohiko Hamase`，三種寫法各不相同。
   詳見 `audits/pool-artist-name-splits.md`。
