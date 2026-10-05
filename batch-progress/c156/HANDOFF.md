# c-156 交接（2026-09-18）：Blue Note 1998–2000，42 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

切片 45 張，**收 42 退 3**——**退貨率 6.7%，是本線最低的一批。**
理由很單純：1998–2000 這一段 Blue Note 的自家新錄音佔絕大多數，
**收藏線判準六句（甲～己）幾乎用不到**，母體在他廠或屬再發系列的碟本來就少。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 項目 | 狀態 |
|---|---|
| 身分（rgMbid 釘住） | **42/42 全部 pinned，零 §1 人工** |
| 三軸與頂點資格 | 卡單已帶，本機組 manifest 時照跑；**本批 apex 0 張** |
| 固定簡介（desc） | **42/42 全 full**，out-1 208–238／out-2 208–238，**兩端都沒撞到** |
| 封面 | **38/42**（缺 4，替代來源 4/4 全部查實） |
| 固定試聽／無來源狀態 | **39/42 有來源**，**3 張走固定無來源狀態** |
| §5.5／§5.6 例外欄位 | 本批無合輯，例外欄全空 |
| published gate | 本機端 |

**3 張走固定無來源狀態**：Ron Carter《Orfeu》／Jackie McLean《Nature Boy》／
Kurt Elling《Live in Chicago - Out Takes》。**三張的正文都零處提串流或試聽**，機器掃過確認。

## 三、⚠ 這一批最重要的一條（第 1433 條）：兩張卡共用同一個 collectionId，而探測層兩張都判 ready

**《Live in Chicago - Out Takes》探測到的 `723467420` 是同批正盤《Live in Chicago》的 id（14 軌）**，
不是這張 6 軌的續篇碟。**同批的正盤卡用的正是同一個 id。**

**兩個獨立理由**：**第 1067 條的錯碟形狀**（`ready` 只保證找到一個有預覽的條目）
＋ **第 646 條（兩張卡不得共用同一個 collectionId）**。**已退回 `unavailable`。**

⚠ **這是本線「失敗與正常長得一樣」家族的又一員**：
**「找到了對的碟」與「找到了同藝人另一張碟」在 `previews.json` 裡長得一模一樣。**
**→ 建議本機在上傳前加一道檢查：`collectionId` 在全卡池必須唯一。**

## 四、⚠ 策展層的編制表會過期，而派工詞會把它當現值抄（第 1434／1435 條）

**第 1420(三) 條把《The Dropper》記成「三人，Marc Ribot 是唯一客座、無逐軌標記」**，
主線照抄進派工詞；**但該卡 hook 原文逐字是「七位客座各只待一兩軌」、note 也逐字寫「七位全部標了軌號」
並列出 Marshall Allen／Eddie Bobé／Charles Burnham。**

**成因**：**第 1420 條寫於研究層之前，研究層補正後沒有回頭改那張表。**
寫作層依 hook＋note 寫成七位客座，**判斷正確**。

⚠ **這與第 1429 條（研究稿的「卡池現值」是過期快照）是同一個形狀，方向相反——這次過期的是策展層的表。**
**→ 派工詞引用策展層編制表前，一律先對照該卡的 `note`／`facts` 現值；不一致時以 note／facts 為準。**

第 1420(一) 的《For the Love》那格同樣不準（說「完全查不到編制」，note 卻列了整組洛杉磯班底），
**寫作層取了兩種讀法都不違反的作法**（只寫製作人與外包軌主唱），不必回頭改。

## 五、⚠ 手算字數在這一段單向低估 30–60 字元（第 1437 條）

**writer-1 初稿 11／21 超過 240（最高 283）、writer-2 初稿 21／21 全部超過 240（最高 303）**，
**兩組都沒有任何一張掉到下限以下**。

**writer-2 量化了幅度**：這批（2000 年前後 Blue Note 爵士，每張要點名 4–8 個拉丁人名）
**手算低估落在 30–60 字元，比 `writer-base.md` 記的「爵士／靈魂樂 +30」還高一截。**
**→ 建議本機把 writer-base 的上浮幅度表補一列：「2000 年前後爵士、拉丁專名密集者 +30～+60」。**

兩組都靠**整格捨去**壓回（砍整句客座名單、整串軌號、整句錄音室／母帶工程），**沒有逐字削字**。

## 六、本機接手時要注意的

1. **通論帳本讀不到**（`desc-restyle/progress.json` 不在版控內）——
   雲端只做到「批內不重複」，**跨批次的通論重複請在逐張審稿時把關**。
2. **`collectionId` 全卡池唯一性檢查**（見第三節）。
3. **四張封面走替代來源**，其中《Road Runner》的 Discogs 全站唯一條目只有 1 張 secondary 300×300，
   **已改用 Apple `695992109` 的 `600x600bb`**（原圖 1404×1404 300dpi）。
4. **第 1422 條有一處已訂正**：`F: PM 520`／`PM 516`／`PM 262`／`UK: 520 2082` 在 Discogs 是
   **`Price Code` 欄（EMI 歐洲價格代碼）**，**不是壓片廠模壓代碼**。

## 七、產物清單

```
desc-tools/batches/cards/c156-cards.json          42 張卡單
desc-tools/batches/research/c156-{a,b}.json       研究層
desc-tools/batches/hooks/c156-hooks-{a,b}.json    鉤子層
desc-tools/batches/input/c156-writer-{1,2}.json   merge 產物（21／21）
desc-tools/batches/output/c156-out-{1,2}.json     寫作層（21／21）
batch-progress/c156/{prop-a,prop-b,slice,caa,apple-candidates}.json/md
batch-progress/c156/rulings.md                    第 1391–1437 條
batch-progress/memory-entries/c156-pipeline.md    備忘錄條目（本機貼進 PROJECT_MEMORY.md）
```
