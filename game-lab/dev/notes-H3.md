# notes-H3：FIXLIST 11 驗收修正——RH-1..8、RV11-1..6、?v= 加一、全部檢查、店主截圖 hand5

分支 `claude/card-game-fun-lab`，直接在 `/home/user/dip-vinyl-shop` 做（不 push）。依據：FIXLIST 11＋RH／RV11 審查 findings。
不碰 roguelike.html、dip-character.js、PROJECT_MEMORY、Firebase/KV。逐檔 git add。容器會重啟：每步做完更新這裡＋commit。

## 進度
- [ ] 0 讀程式、逐項重現
- [x] RV11-1 長按開唱片資訊，放開那下 click 打到 #ciClose／串流鈕（major）——重現（390 攤開／浮起全部關掉、疊著落在串流鈕）；cardinfo.js 整個面板 armed，e2e #18 加攤開／浮起、400 ms 後還開著
- [ ] RH-1 .tighter 換手忽有忽無（major）
- [ ] RH-3 四行結果框超出牌桌（major）
- [ ] RH-2 換手疊著那排一次跳位
- [ ] RH-4 序章 430 開面板 1 px 暗線
- [ ] RH-5 序章 430 開面板鏡頭上移 58 px
- [ ] RH-6 教學 k2 平手 .top 落在經
- [ ] RH-7 攤開封面縮一半（選做）
- [ ] RH-8 教學圖例洞切過「第 n／6 手」
- [ ] RV11-2 屬性鈕縫隙
- [ ] RV11-3 攤開後空白帶點了收回
- [ ] RV11-4 教學結算說明 280 ms 被連點跳過
- [ ] RV11-5 雙擊疊著那排
- [ ] RV11-6 長按屬性鈕＝出牌
- [ ] ?v= 加一
- [ ] 全部檢查
- [ ] 截圖 dev/shots/hand5/

## 記錄
- RV11-1：cardinfo.js open() 加 armed（面板裡 pointerdown 過才收 click；detail 0＝鍵盤／el.click() 照常）。lpmap 390／360 全部 stillOpen=true，lppop 不再開 Spotify 分頁；e2e.spec #18（390）PASS（hand／ace／spread／lifted）。
