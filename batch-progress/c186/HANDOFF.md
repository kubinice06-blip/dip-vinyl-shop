# c-186 交接（2026-09-25）：**日本爵士獨立廠牌線 jp-2 第四批**，1978–1979，24 張

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端依 `REMOTE_RUNBOOK.md`
**不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、38 張提案收 25 退 13，⚠ **收件後主線又撤掉 1 張，最終 24 張（63%）**

**a 組 19 張收 13 退 6**（撞池 2 ＋ 演奏主體／曲目來源 2 ＋ 曲風 1 ＋ 批內同碟重複 RG 1）；
**b 組 19 張收 12 退 7**（演奏主體 3 ＋ ⑤ 款 2 ＋ 撞池 1 ＋ 合輯 1）。

⚠ ⚠ ⚠ **撤掉的那一張是 `深町純《Evening Star》`**（主線第 1980-B 條）：
**六軌裡 4 軌是《The Sea Of Dirac》1977 與《Spiral Steps》1976 的同一份錄音**
——**B1〈In The Holiday Groove〉與 B2〈Scoto Phonobine Type-II〉的 `Recorded By` 錄音室
（Media Sound／Polydor）、工程師與樂手在兩張碟上逐名相同，2018 CD 的時長 5:45／6:00 對本盤 5:42／6:00。**
**既有錄音 67% > 一半，依第 1948-B 條是合輯。卡單、`prop-b.json`、研究稿都已同步移除。**

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 項目 | 狀態 |
|---|---|
| 身分（rgMbid 釘住） | **24/24 全部 pinned，零 §1 人工** |
| 三軸與頂點資格 | 卡單已帶；**本批 apex 0 張** |
| 固定簡介（desc） | **24/24 全 full**，字數 **211–239**（a 組 211–239／b 組 214–239） |
| 封面 | **18/24**（CAA） |
| 固定試聽／無來源狀態 | **17/24**，**7 張走固定無來源狀態** |
| §5.5／§5.6 例外欄位 | 例外欄全空 |
| published gate | 本機端 |

⚠ ⚠ **無來源 7 張裡有 2 張是主線從「誤命中」降級來的**（主線第 1980-B 條）：
**`カリオカ《Sunny Place Carnival》`**（Apple 那筆是 `Samba《Carioca》2025`，**年份漂移 47 年**）與
**`The Players Featuring 鈴木宏昌《Galaxy》`**（`C-Money and the Players Inc《Players》2006`，**漂移 27 年**）。
**兩筆都帶 `downgradedBy: mainline-1980-B` 與逐字理由。**
⚠ **另 2 張是主線人工回撈救回的**（`THE SQUARE《Midnight Lover》`＝Apple 把六軌 LP 標成 `- EP`、
`上田力《Bos & Boz》`＝Apple 掛名是羅馬字形）。

## 三、⚠ 本機審稿要盯的七件事

1. ⚠ ⚠ **`THE SQUARE` 三張的序數是研究層改判的**：**`Lucky Summer Lady` 首張、`Midnight Lover` 第二張、
   `Make Me A Star` 第三張**（ja:T-SQUARE ＋ ja:安藤正容 互證）。
2. ⚠ ⚠ **`Richie Beirach with 富樫雅彦《Kahuna》` 的 `Recorded live` 不是實況**
   ——**它是 `Direct-To-Masterdisk` 的一次過錄音**（廠牌 2004 年併輯用場館名把兩種 `recorded live` 分開）。
3. ⚠ ⚠ **`GAP《GAP》` 的 `live` 是策展層從 `true` 改判成 `false` 的**——**本線第一次「機器多標」的方向。**
4. ⚠ **`Prism III` 的年份是 1979（策展層從 1978 改判）**；⚠ **MB 上另有一筆同名 `Prism` 是加拿大團。**
5. ⚠ ⚠ **`Samba Calioca` 與 `カリオカ` 是同一張 `Kitty MKF 1041`**——**收的是 `カリオカ` 那一筆，
   另一個 RG 已退。** **已登記進 `known-pool-collisions.json`。**
6. ⚠ ⚠ **人名 25 處改判**（`多忠昭グループ`／`中牟礼貞則`／`土井一郎`／`小貫聡明`／`笠井満`⋯）
   ——**卡單與 prop 都已由主線掃過**；**4 個退成羅馬字**（`Masao Tanaka`／`Kazuharu Nagayama`／
   `Akira Aimi`／`Katsuya Yasumuro`）。⚠ **`逐軌 anv` 欄本身會錯**（某張 2013 復刻內頁三處不一致）。
7. ⚠ ⚠ **三處「配信限定再發」是研究層新查到的**（`Voice From Yonder` 2025-12-03 `COKM-46072`／
   `Pavane Lachrymae` 2023-10-18《涙のパヴァーヌ》`COKM-44631`／`Sunny Place Carnival` 2026-09-23 限定黑膠）
   ——**策展層寫的「四十八年沒再發過」不成立，正文沒有寫那一句。**

## 四、雲端已做完的驗證（我自己重跑的，不是照抄代理報告）

- `chk-prop` 兩組標記 0、`dedup-crossbatch c186` 四道 0。
- `qa-batch research/hooks/out c186` 三階段全過；`chk-hook-crossgroup c186` 24 張全過。
- `qa-check-research` 兩組標記 0；`fix-spacing` 兩檔待補 0。
- **鉤子預算 207–230（24/24 ≤230）與 desc 211–239 都是我自己逐筆重算的。**
- **跨兩組 24 張的 4-gram（漢字＋片假名）我自己重掃**：⚠ ⚠ **≥3 張 0 條——本線第一次連專名都沒有撞到三張。**
  **2 張殘片 9 條，8 條是專名、1 條（`一人一軌`）兩端分屬 hook 原文與另一組正文、改不動。**
- **首句照抄 hook 24/24、`key` 逐字同序同數量。**

## 五、裁定條號

`batch-progress/c186/rulings.md`：策展 5936–5965（a）／5966–5995（b）、
研究 6146–6175（a）／6176–6205（b）、鉤子 6246–6285（一人做完兩組）、
寫作 6376–6390（a）／6391–6405（b）。**共 194 條。**
