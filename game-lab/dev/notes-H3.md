# notes-H3：FIXLIST 11 驗收修正——RH-1..8、RV11-1..6、?v= 加一、全部檢查、店主截圖 hand5

分支 `claude/card-game-fun-lab`，直接在 `/home/user/dip-vinyl-shop` 做（不 push）。依據：FIXLIST 11＋RH／RV11 審查 findings。
不碰 roguelike.html、dip-character.js、PROJECT_MEMORY、Firebase/KV。逐檔 git add。容器會重啟：每步做完更新這裡＋commit。

## 進度
- [ ] 0 讀程式、逐項重現
- [x] RV11-1 長按開唱片資訊，放開那下 click 打到 #ciClose／串流鈕（major）——重現（390 攤開／浮起全部關掉、疊著落在串流鈕）；cardinfo.js 整個面板 armed，e2e #18 加攤開／浮起、400 ms 後還開著
- [x] RH-1 .tighter 換手忽有忽無（major）——重現（390 sh 538>512，新牌 slideNew translateY(40)）；.tiles overflow:clip → 三尺寸 tighter 不再切換
- [~] RH-3 四行結果框超出牌桌（major）——placeCallout：放不下就往上挪（最多到封面下緣）；量測在跑
- [x] RH-2 換手疊著那排一次跳位——renderHand FLIP（180 ms）；layoutHand 位置沒變不碰（記 t._tf／t._w）
- [x] RH-4 序章 430 開面板 1 px 暗線——shop fit bh＝round((vy+vh)k)−round(vy·k)；@2 最暗列 20→77（正常 85）
- [~] RH-5 序章 430 開面板鏡頭上移 58 px——ui.js floorRoom：接地板時面板的高從地板讓、鏡頭不換 reward；量測在跑
- [~] RH-6 教學 k2 平手 .top 落在經——topOf：並列最高給預覽那色（preview 時換；滑鼠 hover 不換）
- [ ] RH-7 攤開封面縮一半（選做）
- [~] RH-8 教學圖例洞切過「第 n／6 手」——lookFor 有 tri 時連 rounds 一起框
- [~] RV11-2 屬性鈕縫隙——.abgap（10 px、自己有 click 監聽＝觸控校正候選）；onClick 點 .pop 非 .ab＝不做事
- [~] RV11-3 攤開後空白帶點了收回——手牌區空白／你那列／「你丟的」預覽＝不做事；縫與那一排上下 10／6 px＝最近那張
- [~] RV11-4 教學結算說明 280 ms 被連點跳過——結算時講的 say 1000 ms 才收點擊
- [~] RV11-5 雙擊疊著那排——同一點 320 ms／24 px 內的第二下不算；教學剛攤開 350 ms 內點遮罩不罵
- [~] RV11-6 長按屬性鈕＝出牌——LP_SEL 加 .ab：按住 450 ms 跳「經典 5 星」小字、放開那下吞掉
- [ ] ?v= 加一
- [ ] 全部檢查
- [ ] 截圖 dev/shots/hand5/

## 記錄
- RV11-1：cardinfo.js open() 加 armed（面板裡 pointerdown 過才收 click；detail 0＝鍵盤／el.click() 照常）。lpmap 390／360 全部 stillOpen=true，lppop 不再開 Spotify 分頁；e2e.spec #18（390）PASS（hand／ace／spread／lifted）。
