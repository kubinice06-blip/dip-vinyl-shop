# notes-H3：FIXLIST 11 驗收修正——RH-1..8、RV11-1..6、?v= 加一、全部檢查、店主截圖 hand5

分支 `claude/card-game-fun-lab`，直接在 `/home/user/dip-vinyl-shop` 做（不 push）。依據：FIXLIST 11＋RH／RV11 審查 findings。
不碰 roguelike.html、dip-character.js、PROJECT_MEMORY、Firebase/KV。逐檔 git add。容器會重啟：每步做完更新這裡＋commit。

## 進度
- [x] 0 讀程式、逐項重現（RV11-1 lpmap、RH-1 tighter、RH-2 handstart、RH-4 seam2、RH-5 prol2 都重現；其他照 findings 的證據）
- [x] RV11-1 長按開唱片資訊，放開那下 click 打到 #ciClose／串流鈕（major）——重現（390 攤開／浮起全部關掉、疊著落在串流鈕）；cardinfo.js 整個面板 armed，e2e #18 加攤開／浮起、400 ms 後還開著
- [x] RH-1 .tighter 換手忽有忽無（major）——重現（390 sh 538>512，新牌 slideNew translateY(40)）；.tiles overflow:clip → 三尺寸 tighter 不再切換
- [x] RH-3 四行結果框超出牌桌（major）——placeCallout：放不下就往上挪（最多到封面下緣＝蓋封面下那行字、不蓋封面），還不夠再 .tight 收行距；ResizeObserver 字型晚到重擺。四尺寸 label/critic×seed 11/7：結果框底 ≤ 牌桌底−2、不蓋封面
- [x] RH-2 換手疊著那排一次跳位——renderHand FLIP（180 ms）；layoutHand 位置沒變不碰（記 t._tf／t._w）
- [x] RH-4 序章 430 開面板 1 px 暗線——shop fit bh＝round((vy+vh)k)−round(vy·k)；@2 最暗列 20→77（正常 85）
- [x] RH-5 序章 430 開面板鏡頭上移 58 px——ui.js floorRoom：接地板時面板的高從地板讓、鏡頭不換 reward；猜歌／挑王牌／推薦單三個面板店景都 32–506（原本 448），地板 166／113／0；地板讓完還不夠才換鏡頭，且 sheetNeed 留著（地板不把讓出的高補回去）
- [x] RH-6 教學 k2 平手 .top 落在經——topOf：並列最高給預覽那色（preview 時換；滑鼠 hover 不換）；四尺寸 k2 大鈕＝冷 4
- [-] RH-7 攤開封面縮一半（選做）——不做：寬度決定（6 張要放進 336–406 px），改成重疊的一排或兩排＝改店主定的「攤開成不重疊的一排」，留給店主決定
- [x] RH-8 教學圖例洞切過「第 n／6 手」——lookFor 有 tri 時連 rounds 一起框；四尺寸 k1 那行字四角都在洞裡（isPointInFill）
- [x] RV11-2 屬性鈕縫隙——.abgap（10 px、自己有 click 監聽＝觸控校正候選）；onClick 點 .pop 非 .ab＝不做事；390／360 觸控與滑鼠點縫都不出牌、不收回
- [x] RV11-3 攤開後空白帶點了收回——手牌區空白／你那列／「你丟的」預覽＝不做事；縫與那一排上下 10／6 px＝最近那張；點 slot-e 照舊收回（e2e-duel #4）
- [x] RV11-4 教學結算說明 280 ms 被連點跳過——連點中的一下（跟上一下按下 <400 ms）要等滿 1 秒；停下來再點照舊 280 ms（walkTutorial 不用改）。四尺寸 k3 在 150 ms 連點下撐 1.17 s
- [x] RV11-5 雙擊疊著那排——同一點 320 ms／24 px 內的第二下不算（90–260 ms 都只攤開）；別的位置照收（G8 照舊浮起）；教學剛攤開 350 ms 內點遮罩不罵（四尺寸 warn false）
- [x] RV11-6 長按屬性鈕＝出牌——LP_SEL 加 .ab：按住 450 ms 跳「經典 2 星」小字、放開那下吞掉；之後一般點照常出牌
- [x] ?v= 加一（43→44；dip-character／dip-player 跟主站不動）、README
- [~] 全部檢查——單元 engine 2040482／tutorial 182142／shop 1280／hit 343／chars 30061 全 0 失敗；sim --n 3000 22/22；lint-copy 過（LINES-REVIEW 重產沒變）；check-content／shops／covers OK。e2e 四尺寸在跑：scratchpad/v4/H3/runall.sh → run1/（spec LAB_FULL=1 → duel → prologue×4 → econ → taps title,night）
- [ ] 截圖 dev/shots/hand5/（腳本 scratchpad/v4/H3/shots.mjs，e2e 跑完再拍）

## 記錄
- RV11-1：cardinfo.js open() 加 armed（面板裡 pointerdown 過才收 click；detail 0＝鍵盤／el.click() 照常）。lpmap 390／360 全部 stillOpen=true，lppop 不再開 Spotify 分頁；e2e.spec #18（390）PASS（hand／ace／spread／lifted）。
- 探針：scratchpad/v4/H3/input.mjs（RV11-1／2／3／5／6，390／360 全 PASS）、tutprobe.mjs（RH-6／8、RV11-4／5，四尺寸 PASS）、callout.mjs、flip.mjs、prol2.mjs、seam2.mjs。單元：tutorial 182142／0、chars、hit 綠。
