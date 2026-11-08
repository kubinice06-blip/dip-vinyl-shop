# A3 notes（命中與卡池）— game-lab v4 第一波

分支 `v4/A3`（worktree `/home/user/wt/A3`）。規格：`v4/SPEC-v4.md` §2.2.1、§2.4、§3.1 A3、§4、§5.1。

## 狀態
- [x] M1：deck-lists.json v4、bake-cards.mjs（跳 `_` 鍵、_region、bins.js）、pitches.json、cards.js＋bins.js（0 problems）、substitutions-v4.json、index.html 載入 bins.js → 分支 `v4/A3-M1`
- [x] 第二段開工：合併 `v4/A2-M1`（2026-11-08，merge commit，無衝突）
- [x] shop.js §2.4＋§2.3.7＋test/hit.test.mjs（commit 177c14e3f；hit.test 330 passed、shop.test 919、check-shops OK）
- [x] tools/check-covers.mjs（commit 41340b56a；OK，看得到的封面 60 張、12 箱）
- [x] tests/e2e-lib.mjs（從 e2e.spec.mjs:59-234 複製）、tests/e2e-taps.mjs（四尺寸 28/28，commit 841965e3d）
- [ ] 下一步：dev/bins-v4.md → 截圖（hitmap ×2、press、label-hiphop、covers）→ notes 收尾（index.html 的 bins.js 已在 M1 做完）

## 進度紀錄
（開工 2026-11-08）
1. `tools/deck-lists.json` v4：由 `v4/spec-work/rev/final.json`（評審後定稿）＋v3 的 gold／listen／stake 產生；
   28 組（10 位客人、man_drop、三組禮物、bargain、wall_a／wall_b、bin_×12）逐組逐序跟 SPEC-v4 §4 表格的 id 欄比過，0 差異
   （產生與比對腳本：scratchpad `A3/build-lists.cjs`、`A3/xcheck-spec.cjs`）。設定鍵 `_doc`、`_region`（12 筆，§4.5 列的那些＋王菲 zh）、`_bins`（14 區）、`_ost`（2）。
2. `tools/bake-cards.mjs`：跳過 `_` 鍵；`REGION_OVERRIDE`＋TW／JP 正規式補齊（五月天、伍佰、蔡琴、江蕙、陳建年、陳明章／吉田美奈子、松田聖子、久石譲、大野雄二）、
   新增 ZH（王菲）；needPitch＝ace_*、gift_*、bargain、gold；牆可以擺王牌（OK Computer，星數照王牌組）；產生 `bins.js`，
   並檢查每箱每張符合 rule、箱子不跟任何排他組重複、兩面牆不重複（BIN-RULE／BIN-OVERLAP），有問題就在打網路之前先停。
3. `tools/pitches.json`：刪 karen-dalton／miles／devo；新增 3 張禮物＋8 張特價箱推薦語（`新`）；腳本比對：pitch 鍵 31 ⊂ v4 所有卡、29 張需推薦語的卡 0 缺。
4. 烘焙（`NODE_USE_ENV_PROXY=1 node game-lab/tools/bake-cards.mjs`；這個容器的 Node fetch 要這個環境變數才走代理）：
   **0 problems**，207 張（v3 117 張：留 81、新 126、刪 36），封面 207/207、試聽 207/207 驗過，CAA→Apple 300px 57 張，
   連結 apple 207／spotify 176／bandcamp 47。保留卡的 region／星數／封面／試聽／推薦語 0 變動（腳本逐欄比對）。
   region：xx 156、tw 30、jp 20、zh 1（王菲）。bins.js 14 區 113 格（12 箱 ×8＋wallA 8＋wallB 9），獨立腳本對 final.json 與每區 rule 重驗 0 問題。
   之後只改了 bins.js 的輸出順序（箱子在前、牆在後），用 `--covers-only` 重寫（cards.js 位元組不變）。
5. `tools/substitutions-v4.json`：沒有替換（只有 `_doc`）。
6. `index.html`：`<script src="bins.js"></script>` 放在 cards.js 與 content.js 之間（沒加 `?v=`，C 統一加）。

### 給 A1／A2：v4 cards.js 不再有的卡（36 張；v3 的 content.js／shops 還在引用，換成 §4 的卡）
- content.js 引用到的：karen-dalton-in-my-own-time miles-davis-you-re-under-arrest devo-oh-no-it-s-devo westlife-coast-to-coast oasis-be-here-now
  linkin-park-one-more-light duster-stratosphere broadcast-tender-buttons xiu-xiu-fabulous-muscles joe-harriott-free-form 美秀集團-amazing-show-電火王
  deca-joins-鳥鳥鳥 老王樂隊-吾日三省吾身 生祥樂隊-圍庄 mogwai-young-team explosions-in-the-sky-the-earth-is-not-a-cold-dead-place this-heat-repeat
  silver-apples-silver-apples popol-vuh-in-den-garten-pharaos popol-vuh-hosianna-mantra 坂本龍一-async kenny-wheeler-gnu-high 美秀集團-amazing-show-多色寶山大王
  masonna-mademoiselle-anne-sanglante-ou-notre-nymphomanie-aur melt-banana-scratch-or-stitch peter-brotzmann-nipples sunn-o-life-metal
- shops/dip.json：坂本龍一-async miles-davis-you-re-under-arrest 美秀集團-amazing-show-電火王 deca-joins-鳥鳥鳥 老王樂隊-吾日三省吾身 kenny-wheeler-gnu-high melt-banana-scratch-or-stitch sunn-o-life-metal
- shops/basement.json：silver-apples-silver-apples（§3.1 A2 交件 1 已列）；taipei.json、index.json：無。

## 測試結果
- M1（2026-11-08）：`node game-lab/tools/bake-cards.mjs` 0 problems、exit 0；`lint-copy` 通過（LINES-REVIEW.md 已 checkout 回去，A1 擁有）。
  `engine.test`、`check-content`、`check-shops`、`shop.test` 失敗＝v3 的 content.js／shops 引用上面 36 張已刪的卡（預期，A1／A2 換成 v4 牌組與封面後就好）。

## 替換（§4.6）
- M1：無（207 張全部烘得出來）。

## 請求
- （無）

## 截圖
