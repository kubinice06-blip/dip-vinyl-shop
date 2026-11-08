# notes-A2 — game-lab v4 第一波 A2（舞台與店景）

分支 `v4/A2`（worktree `/home/user/wt/A2`），基底 origin/main @ ef763c573。規格：SPEC-v4 §2.3、§3.1 A2、§4.5、§5.1 A2。

## 進度
- [x] M0 logo：`shop-props.js` EMBLEM（B15 逐字）＋`counterSign`／`signEmblem`（匯出 `DipPropsO.EMBLEM/counterSign/signEmblem`）、`dip.json` counter `sign:{emblem:'dip'}`、check-shops `checkSign`／`checkEmblem`（每個 EMBLEM 項目也驗）、shop.test「櫃檯 logo」段（logo＝[241,184,15,15]、在正面板內、不碰任何熱點形狀、字串／null／壞招牌）
- [x] M0 截圖（段 1）
- [ ] M1 `shops/dip.json`（單台唱盤、spots、bin、封面、特價箱、nav）＋ basement 卡片修正 → `v4/A2-M1`
- [ ] 交件 2–6（stage 一手演出等）＝第二階段

## 測試結果
- M0：`node game-lab/test/shop.test.mjs` 427 passed 0 failed；`node game-lab/tools/check-shops.mjs` OK；390×664@2、430×932@3 主控台 0 錯誤

## 截圖
- 截圖好了（段 1 logo）：`game-lab/dev/shots/A2/390x664@2-logo.png`、`430x932@3-logo.png`、櫃檯放大 3 倍裁切 `390x664@2-logo-counter-x3.png`、`430x932@3-logo-counter-x3.png`（腳本：scratchpad `a2/logo-shots.cjs`，LAB_URL）

## 請求

## 實測路線時間
