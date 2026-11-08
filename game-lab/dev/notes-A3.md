# A3 notes（命中與卡池）— game-lab v4 第一波

分支 `v4/A3`（worktree `/home/user/wt/A3`）。規格：`v4/SPEC-v4.md` §2.2.1、§2.4、§3.1 A3、§4、§5.1。

## 狀態
- [ ] M1：deck-lists.json v4、bake-cards.mjs（跳 `_` 鍵、_region、bins.js）、pitches.json、cards.js＋bins.js（0 problems）、substitutions-v4.json
- [ ] 第二段：shop.js §2.4、check-covers、hit.test、e2e-lib、e2e-taps、index.html、bins-v4.md、截圖

## 進度紀錄
（開工 2026-11-08）
1. `tools/deck-lists.json` v4：由 `v4/spec-work/rev/final.json`（評審後定稿）＋v3 的 gold／listen／stake 產生；
   28 組（10 位客人、man_drop、三組禮物、bargain、wall_a／wall_b、bin_×12）逐組逐序跟 SPEC-v4 §4 表格的 id 欄比過，0 差異
   （產生與比對腳本：scratchpad `A3/build-lists.cjs`、`A3/xcheck-spec.cjs`）。設定鍵 `_doc`、`_region`（12 筆，§4.5 列的那些＋王菲 zh）、`_bins`（14 區）、`_ost`（2）。
2. `tools/bake-cards.mjs`：跳過 `_` 鍵；`REGION_OVERRIDE`＋TW／JP 正規式補齊（五月天、伍佰、蔡琴、江蕙、陳建年、陳明章／吉田美奈子、松田聖子、久石譲、大野雄二）、
   新增 ZH（王菲）；needPitch＝ace_*、gift_*、bargain、gold；牆可以擺王牌（OK Computer，星數照王牌組）；產生 `bins.js`，
   並檢查每箱每張符合 rule、箱子不跟任何排他組重複、兩面牆不重複（BIN-RULE／BIN-OVERLAP），有問題就在打網路之前先停。
3. `tools/pitches.json`：刪 karen-dalton／miles／devo；新增 3 張禮物＋8 張特價箱推薦語（`新`）；腳本比對：pitch 鍵 31 ⊂ v4 所有卡、29 張需推薦語的卡 0 缺。

## 測試結果

## 替換（§4.6）

## 請求

## 截圖
