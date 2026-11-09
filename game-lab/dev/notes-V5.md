# notes-V5：V5 審查 findings 修正（F1–F6、V5-play-1..10）

分支 `claude/card-game-fun-lab`，直接在 `/home/user/dip-vinyl-shop` 做（不 push）。依據：V5 審查（review＋play＋verify-0..15）確認過的 16 項。
不碰 game-lab/ 以外、不碰 PROJECT_MEMORY。逐檔 git add（同一檔不同項目用 `git apply --cached` 分 hunk 提交）。
腳本與記錄：scratchpad `v4/V5/fix/`（progress.md、各項 *-after.log、rv/＝review 腳本副本、v6／v7／v9／v11–v14＝verify 腳本副本；伺服器 :8851）。

每一項都先照 finding／verifier 的腳本重現（修前數字取自 review／verify-N 的 log），修完用同一支腳本（改埠）重跑。

## 修了

| 項目 | 檔案 | 怎麼修 | 修前 → 修後（驗證） |
|---|---|---|---|
| **V5-play-1**（major）揭曉時連點牌桌開了唱片資訊，下一下開串流連結 | cardinfo.js | document 捕獲階段記「連點串」（跟上一下按下 <350 ms 算同一串）；面板只認打開之後才開始的那一串裡的按下（armed）。打開前就在連點的手指之後的 click 一律吞掉，停一下再點照常；RV11-1 長按照舊 | verify-6 repro（ck-run1-night1、觸控）：360／390 A、375 C、430 G 都開了 Apple Music／YT Music → 四尺寸 A,B,C,G,F,P,Q 全部 0 個彈窗；430 G／Q 第二下落在 Apple Music 上被吞（`fix/v6`） |
| **V5-play-2**（major）今晚來客老闆小提示的泡泡點了穿過去開箱子 | tutorial.css、tutorial.js | `#tut.m-soft .tut-bub{pointer-events:auto}`：點泡泡＝換句／收掉；看了 ≥1.2 s 才被開抽屜／下一位收掉的，下次再出一次，第二次又被收掉就算看過 | verify-7 v7.mjs：390／375／360 點泡泡開 TW 抽屜、關掉又從第一句來 → 四尺寸點泡泡＝第二句、再點＝seen.night；reshow.mjs：開 ROCK 關掉再出一次，第二次開關後不再出、seen.night=true |
| **F4／V5-play-3** 尾聲撿 Fishmans 那張：高螢幕鏡頭換 reward 裁掉店頂、地板長回來 | ui.js | `UI.floorX` 改跟真的畫出來的地板（`shop.view().ext`，`floorNow()`），不跟上一次 `floorExt` 的回傳（鏡頭移動中回 0、停下來卻畫了 181 px）；`cam()` 停下來再 `floorSoon()`；非 scene 畫面一律 `floorExt(0)`（要過還沒畫的也收） | seamEnd.mjs：430@2 one 那張 cam y40 h282、地板 231、面板 254 → y0 h322、地板 166、面板 260（跟配件那張一樣）；414@3 y40／210 → y0／147 |
| **F3** 地板讓完還不夠時 reward 鏡頭固定裁 40 列＋下面一條空地板 | ui.js | roomForSheet：`camCssH('full',{panelMin})` 比 reward 高（＝沒縮倍率、看得到的列比 reward 多）就用 full 鏡頭帶 panelMin（只裁放不下的那幾列），`UI.camSheet` 記著讓 camBackSoon 收回 | recs2.mjs 老闆的四張：430@2 珍珠 [40,282]＋46 px 空地板 → [9,313]、沒有地板帶、面板＝內容 440；414@3 異端 [40,282]＋42 → [11,311]；414 珍珠 [35,287]、430 殿堂 [45,277]（兩種鏡頭都得裁，照舊） |
| **V5-play-8** 375 老闆的四張：橫條鏡頭、面板比內容高 65–120 px 白 | ui.js、stage.js | 收成對決橫條時帶 `growPanel`（面板內容要的高）：stage.js `fitCam` 讓沒有 grow 的 stripS 也往上長到剛好放得下面板 | verify-13 recsm.mjs：375 面板 437、店景 79 px、空白 65–120 → 面板 376、店景 140 px、空白 4；360 空 10 → 5（店景 111 → 150）；390（Low 那組內容 487）空白 4 |
| **V5-play-4(a)** 430 今晚來客錢／包包下面 193 px 白 | ui.js | fitFloor 今晚來客也接木地板（今晚來客那塊被面板撐滿，量 naturalH）；抽屜開著（econCall、bargainPickFlow 期間 `UI.econBusy`）或面板蓋了 sheet 時不接 | verify-9 band.mjs：430 店景 32–506、面板 506–932、包包條到 739 → 地板 506–689、面板 689–932、包包條到 922；開櫃檯／ROCK／特價區時地板 0，抽屜上面照 R2 是舞台黑（171／138／183 px，跟修前一樣）；390／375／360 不變（沒有空位） |
| **V5-play-5** 對白框連點跳字，選項在手指底下冒出來被替你選 | ui.js | guardClicks：記連點串；面板／選單出現之前就開始的那一串，之後的點擊不算（GUARD_MS 過了也一樣），停一下（≥350 ms）再點照常；el.click()／鍵盤不受影響 | verify-10 mash3.mjs（每 150 ms 點下緣）：四尺寸 13 s 走到對決、跳過教學 → 連點 30 s 停在猜歌；STOP=1500（連點 1.5 s 後停一下再點）：390／360 照自己點的走到教學 |
| **V5-play-7** 375 挑王牌說明那行被擠成 4 px | ui.js、style.css | 說明那行先 `mark()` 再 `roomForSheet`（矮螢幕它沒有最小高，空著量＝0）；`.note.detail{flex-shrink:0}` | verify-12 ace.mjs：375 [479,483] 4 px、被「就這張」蓋住 → [460,479] 19 px、一行字整個看得到、面板不捲；360／390／430 照舊 38 px |
| **V5-play-9** 他丟過的唱片：專輯名一行、只剩第一個字「The…」 | style.css | `.lb-rgrid .lb-ct .al` 改 `display:block;white-space:nowrap;text-overflow:ellipsis`（照字切，高度不變） | verify-14 rw.mjs：見下「驗證」 |
| **V5-play-6** 先賣一張：「賣這張」小字把價錢切掉 | econ.js、econ.css | 小字拆成專輯名＋「買 $n」：只切專輯名，價錢 `flex:none` | verify-11 sweep（ROCK／SOUL／NEW／PICKS／FEATURE 每張買一次）：390 修前 34/65 看不到價 → 四尺寸各 0/24 |
| **F1** `.tiles` overflow:clip 切掉貼邊浮起那張的金框／黑框 | duel.css | `@supports (overflow:clip){ .dl .hand .tiles{overflow:visible;overflow-y:clip} }`（只裁上下；不支援 clip 的照舊 hidden） | review clip.mjs（@2，跟 overflow:visible 比像素）：390 浮起王牌 1066 px 不同、第一張 816、攤開 658；375 472；430 272；360 228 → 四尺寸五種狀態全部 0 |
| **F5** 屬性鈕內緣 2–6 px 被 .abgap 的觸控校正吸走、什麼都不做 | duel.js | .abgap 拿掉 click 監聽（不再是校正候選）；縫裡不做事改用 pointerdown 的原始座標判斷（`inChipGap`：校正只改 click 的座標，pointerdown 是手指真正的位置；f5probe.mjs 實測） | f5real.mjs（CDP 觸控 r4–r16、不擋 click）：修前內緣 2／3 px（r10／r12）都沒反應 → 四尺寸內緣 2–4.5 px 都丟出那顆；縫中間（r10／r12）、縫裡離鈕 1.5 px 都不出牌（RV11-2 照舊）；鈕中間照丟 |
| **F6** 長按屬性鈕後觸控取消，下一下點同一顆被吞 | duel.js | 吞 click 不限時（`S.swallow={el}`、只吞 detail>0 的那一下），新的 pointerdown 與 pointercancel 就作廢 | f6.mjs：四尺寸 cancel 後 +150／+400 ms 再點都出牌（修前不出）；長按 600／1500／2000 ms 放開都吞掉（修前 ≥1.45 s 放開會出牌——verifier 的旁注一併修）；一般點照出 |
| **F2** 教學：點在洞裡的縫、被算給隔壁那張就罵「先點我指的這裡。」 | duel.js、tutorial.js | 縫裡由 nearCover 算出來的那張帶 `near:true` 給 gate；教學擋下 near 的那一下＝不罵、不抖，當沒點到 | review tutgap.mjs：390／360 滑鼠、390 觸控 warn=true → warn=false |
| **V5-play-10** 盤面滑進來那 0.6 s 點手牌沒反應 | duel.js | 進場還沒完就點疊著的手牌：記著（`S.pendSpread`），afterEnter 一完就攤開（雙擊的第二下照 RV11-5）；教學中只抖一下 | verify-15 enter.mjs：390 修前 68–471 ms 的點都丟掉 → 82–730 ms 每一下都攤開；375／430／360 100／300／500 ms 都攤開 |

## 沒做

- **V5-play-4(b)**（抽屜開著時店景與抽屜之間的黑帶）：是 R2 的定案（econ.css「店景與抽屜之間如果空一條：跟舞台的黑邊同色，不是一條白」、commit 9816bb31b、notes-R2「抽屜上面的空隙改舞台黑」，店主看過截圖）。verify-9 也判定是刻意的。不改；今晚來客接地板時抽屜開著一律不接，黑帶照舊。

## 補充驗證

- F1 的 RH-1 回歸：verify-2 rh1.mjs（三手、@2）四尺寸 .tighter 0 幀、scrollHeight 溢出 0（只改成 overflow:visible 會回到 13–28 px／.tighter 開著）。
- V5-play-1 的正向對照（`fix/v6/control.mjs`）：點牌桌開資訊後停 500／1000 ms 再點 Apple Music＝照開；150 ms 那下＝吞掉。
- V5-play-9：rw.mjs 的 fracShown 量的是寬度比，修前修後數字一樣；看截圖（`fix/v14/shots/390x664-g6.png`）：「Making Oran…」「The Disinteg…」「Homotopy t…」，修前是「Making…」「The…」「Homotopy…」。
- V5-play-4：430 今晚來客截圖 `fix/shots/night-430-after.png`（地板接到「今晚來客」上面，泡泡在地板上）。

## 檢查（全部在最後的程式上跑；e2e 用 :8851）

- 單元：engine 2040482／tutorial 182142／shop 1280／hit 343／chars 30061，全 0 失敗。
- `sim.mjs --n 3000`：22/22（S1 78.3%、S9 47.8%）。
- lint-copy 過（LINES-REVIEW.md 重產沒變）；check-content／check-shops／check-covers OK。
- e2e 四尺寸（scratchpad `v4/V5/fix/e2e/runall.sh`，兩條線並行）：e2e.spec LAB_FULL=1 148/148（390,375 74/74＋430,360 74/74）；e2e-duel 124/124；
  e2e-prologue 52/52 ×4；e2e-econ 80/80；e2e-taps title,night 56/56。
- `?v=` 44 → 45（dip-character／dip-player 不動）；README 手牌那段、序章那段、高螢幕地板那段跟著改。

## 截圖 dev/shots/hand5/（@2；dev/.gitignore 不進版控，給店主本機看）

重拍（腳本＝H3 的 shots.mjs 改埠，`fix/hand5new/` 跟原本的逐像素比）：畫面因這次修改而變的才換——
390x664-2-spread、3-lift、5／6／7-tut-lesson2（貼邊那張的金框／黑框不再被裁，F1）、390x664-10-sell-gift（「《Midnight Mara… 買 $1,200」，修前價錢被切掉，V5-play-6）。
其他幾張（疊著、揭曉、430 序章、猜歌面板）只有店景小人／封面順序這類每次不同的差異，畫面沒變，留著原本的。
