// game-lab/sim.mjs — v5 無限試煉 balance simulation + thresholds（SPEC 無限試煉 §4 第三棒）。Runs on the REAL engine.js / content.js / cards.js / bins.js.
//   每一趟照 run API 跑到輸（newRun → 特價箱挑三張 → 序章男子 → 第 1 位 → … 最多 --cap 位）；規則、曲線、升級、商店、獎勵一行都不在這裡重寫，
//   選擇全用引擎自己的 bargainPolicy／runPolicy（獎勵、升級＝harness MIX、說情）／shopPolicy('smart')。
// Usage: node game-lab/sim.mjs [--n 2000] [--mode all|runs|man] [--flows smart,none,bare] [--gate smart] [--cap 300] [--json out.json]
//                              [--lot off] [--browse 16] [--seeds k:rarity] [--want N]
//                              [--policies thoughtful,novice,random,humanRead,oldReader,high,formula,mirrorHint,oracle] [--tier k]
//                              [--set mercy=false] [--patch '{"trial":{"curve":{"atk":{"add":1}}}}'] [--data <dir with cards.js and bins.js>]
//                              [--apex [--apex-ace <頂點卡 id>] [--apex-params '{"<能力 id>":{"n":3}}']] [--ace hall|pearl|heresy]
//   --apex   頂點卡純輔助卡試做（＝遊戲網址 ?apex=1；scratchpad v5/apextrial）：startFight 傳 {apex:true}（序章照舊 7 星）；王牌＝各派預設那張（C.aces），
//            策略自己決定什麼時候發動（engine policies 的頂點卡分支）。--apex-ace＝每一趟都帶這張（流派跟著它；用來量單張能力，跟沒給時的三派輪流不是同一批客人組成）
//            --apex-params＝試調參數（只在這次模擬裡蓋掉 C.apexTrial 那幾張的 params；{"<id>":{"hold":{…}}} 蓋留著的小效果；@檔名＝從 JSON 檔讀；不改 content.js）
//              兩個原語合一（combo）：{"ops":[…]} 整組換；{"mirrorPlus":{"n":2}} 只改那個原語；平的 {"n":2} 蓋到組裡有 n 的每個原語（都沒有＝報錯）
//            旗標下多印一張「頂點卡發動」表（發動率、第幾手、發動那手的勝負、作用幾手）；不開 --apex 時輸出跟以前一字不差
//   --ace    每一趟都用這一派（沒給＝三派輪流 TIERS[i % 3]）；不開 --apex 也能用＝現行 7 星王牌的分派基準（跟 --apex-ace 同一批客人組成）
//   --unlock 流派與頂點卡靠遊戲解鎖（店主 11-16；scratchpad v5/unlock）：每一趟都當新玩家（只解鎖這一趟的派；--apex 時擁有的頂點卡只有那派預設那張，
//            --apex-ace 給的那張也算擁有），藏家照被剋鏈帶卡（engine bossCardFor）。多印一張「頂點卡收集」表；不開時輸出跟以前一字不差（模擬照舊三派都能用、藏家照 run.bossAce）
//   包包不限張數（店主 11-16；engine CFG.bagMax＝Infinity）：獎勵照 runPolicy（收這張 bagScore 漲才拿，見 engine 檔頭）、買照 shopPolicy（要漲才買、不用賣）＋瘦身（thinPolicy：
//            賣掉每一軸都排不進包包前 5 名的牌）；收音機那張也要漲才買。--no-thin＝不瘦身（只靠「不拿」控制牌組大小）。
//            --set bagMax=8＝舊規則對照（choose／策略走舊路、收音機包包滿賣最弱的；JSON 跟改版前逐字相同）。不限時 JSON 的 end 多 bagN（最後幾張）、bagMaxN（最多幾張）、sold（賣掉幾張）
//   第 A 波（店主 11-16）：賣牌只走櫃檯（engine choose sell；收獎勵、買唱片不能順手丟／賣）＝shopPolicy 的 thinPolicy；老闆送的、種子也會交還（$0）。
//            客人主屬性（engine roundMains／mainAt）：收音機挑格照 guestDef（換牌、加星後、照主屬性組的牌）。多印一張「客人出牌三色、放水、交還老闆」表（JSON 每格多 eplay）
//   第 B 波（SPEC-B §3.8、§5.4、§7）：架上唱片＝一檔貨（engine drawLot／shelve；C.lot.on，預設開）。開著時多印一張「一檔貨」表（smart 流程：每輪看到幾張不同的、
//            每位架上幾張、架上剋下一位主屬性那軸 ≥4 星幾張〔中位／最小／0 張的比例〕、每趟從架上買幾張、架上稀有度），JSON 的 smart 格多 lot、report 多 lot（C.lot）
//   --lot off  ＝--patch '{"lot":{"on":false}}'（今天的每輪補貨＋新卡池；對照組、緊急關閉）。關著時不印一檔貨表、JSON 不多欄位＝跟一檔貨之前的 sim 逐字相同
//   --browse k 一檔貨每位換貨，真人要每位都打開抽屜：smart 每位客人前只「打開」k 箱（FEATURE＋其他箱裡 hash01(seedKey#runNo#pos#browse#箱) 最小的 k−1 箱）；
//              shopPolicy 只看得到那幾箱、買的動作照常做在真的 run 上。預設 16＝全看（＝舊定義，輸出不變）；k=4＝一檔貨效益的下緣（SPEC-B §7.3 D25）
//   --seeds k:rarity  每一趟開局帶 k 張種子（CFG.seedMax 以內）＝稀有度 rarity 的非頂點、非特價、非王牌卡裡 peak 最高、同分 hash01('seeds#'+趟+'#'+id) 最小的 k 張
//              （主站帶卡／今日推薦獎勵的上限；只量、不是門檻）。種子只在不打序章的那一趟有效（engine 裁定 2）→ 這個旗標下每一趟都不打序章；
//              對照組＝--seeds 0:<rarity>（同樣不打序章、沒有種子）
//   --want N   每一趟的想要清單（run.want）＝有箱子的非頂點卡裡 hash01('want#'+趟+'#'+id) 最小的 N 張（固定、跟策略無關）；多印「想要清單」表
//              （第 1 檔／第 2 檔起分開：每檔進來幾張、每張每檔進來的機率〔÷N、÷那一檔來源裡合規的〕、每趟架上看到幾次、每趟從架上買到幾張）
//   --data     換完 C.cards／C.bins 後叫 C.deriveAll(C)（箱子的 all）；箱子沒有 all → 第 2 檔起退回策展池，結尾印警告（engine lotWarn）
//   --n      趟數／格（序章男子 S5 也是 N 場）　--cap 一趟最多打到第幾位（打完還沒輸＝censored，深度記成 cap）
//   --flows  smart＝真的玩法：獎勵照 runPolicy（挑唱片／配件）、每位客人前照 shopPolicy('smart') 買；
//            ＋收音機（v5 第六項第二期）：每輪第一次能買東西時轉一次（radioSmart：挑抽卡池裡「剋下一位主屬性那軸」平均星最高的那格），買得起就買（照原價；
//            包包滿就賣掉能賣的最弱那張，但電台那張要比它強）；none＝同上但不買、不轉；
//            bare＝最像 ../curve V3 模擬（curvesim.cjs）：不打序章、包包＝老闆四張＋特價箱三張＋男子那張、整趟不換（不拿獎勵、不買、沒有配件）；
//            cards／relics＝none 但只拿唱片／只拿配件（拆解用，要自己點）。每個流程都有升級（runPolicy）與每輪一次說情
//   --gate   門檻看哪個流程（預設 smart＝真的玩法）　--set 改 engine CFG　--patch deep-merge 進 content（例：C.trial.curve 旋鈕）　--tier C.trial.tiers 第 k 階
//   第 C 波（獎勵與店內攤位；scratchpad v5/wave-c SPEC-C §7）：content 的 C.waveC 全開＝預設就量 C 波（戰利品列、藏家寶箱、今天的攤位、中繼點開局選秀；客人補償 C.trial.guestHpSteps）。
//            攤位、選秀、獎勵交給引擎 cPolicy（smart／none；bare 不逛攤位＝stallLeave，其他流程照 cPolicy）。新手保底（C.waveC.safety）要 newRun 給 safety 才有：預設不給（門檻照「沒保底」量）
//   --wc '<json>'  deep-merge 進 C.waveC（例 --wc '{"stall":{"on":false}}' 拆解）。--wc off＝C 波全關（loot／chest／stall／safety 關＋C.trial.guestHpSteps []）＝現行對照，輸出跟 C 波之前逐字相同
//              （JSON 只差 report.trial 多 guestHpSteps:[]）。--wc 先套、--patch 再蓋。C 波開著時多印三張表（printWC：錢、各件次數、每種站出現→被選），JSON 每格多 wcx、report 多 waveC
//   --copt '<json>' cPolicy 選項：pickFirst、firstSide、dare 'auto'|'always'|'never'、dareHp、reserve（1e9＝永遠不買門票）、reroll、takeSell（bagScore 不漲的照收、下一位前拿去櫃檯賣）、boostFirst
//   --safety   每一趟都有新手保底（第 1 位輸了免費重打）＝新帳號第一趟（ui createRun：沒有上一趟就給）。驗收修正（2026-11-17）：D1／D2 照這個判
//              （沒加 --safety 只列參考：真人新帳號第一趟一定有保底）；T1 照沒保底量（加了 --safety 只列參考）；其他門檻照舊
//   --cpbase <json>  中繼點開局（--from N）的「從頭打」對照：新帳號、會讀的、smart 的 --json（要打得到第 N＋10 位，例 n 4000）。印 C1 參考：
//              從中繼點開的 10 位存活率 − 從頭打到第 N 位的人再撐 10 位，在 −8～+3 點內（驗收修正：加第 50 位、加下限）
//   --from N   從第 N 位中繼點開局（快速選秀；N 要是中繼點 10／20／30／50／75／100…）；--from-relics a,b,c＝身上配件。多印「中繼點開局」表（只印、不判 C1）
//   --returning a,b,c  老玩家＝不打序章、帶這三件配件開局（建議 dustcover,stylus,boost_c）；D3 用它判
//   --dbase <json>  現況對照（同 n、同旗標、--wc off 跑出來的 --json 檔）：D1（新帳號）／D3（--returning）照它判；沒給就只列參考
//   深度＝run.pos（備份盤不上，沒有 run.far）
//   第 D 波棒一（樂歷；scratchpad v5/wave-d SPEC-D §7.1）：
//   --talent '{"atk":1,"def":1,"hp":1,"plea":1,"xp":2}'  樂歷主幹固定檔位（每一趟都帶；newRun talent，engine applyTalent）。序章那場也帶（sim 照舊每趟打序章；真人第 1 趟沒有天賦）
//   --ladder L｜'{"seedMax":4,"relicPick":3,"goldAdd":0.01}'  樂歷階梯那幾項：數字＝樂歷 Lv L 開了的（engine talentArgs 去掉天賦）；JSON＝直接給
//   --seeds k:rarity  k 的上限＝seedMax（--ladder 給的，沒給＝CFG.seedMax 3）
//   --i0 k  趟的編號從 k 起（seedKey sim5-<k+i>；另一批獨立的客人，跟 --i0 0 的合併＝加大樣本；C1 第 75 位的 cpbase 用）
//   --posmax N  JSON 每格 pos（每一位的到過／首戰／死亡率）存到第 N 位（預設 60；C1 的 --cpbase 要 --from＋10 位，量第 75／100 位中繼點用 --posmax 120）
//   給了 --talent／--ladder 或 --tier 時多印「到第 21 位（打倒第 20 位藏家）」表（試煉過關率）＋每趟樂歷（基本／路線）；JSON 每格多 reach21、lexp。沒給時輸出跟以前一字不差
//   第 D 波棒二（三流派＝遊戲網址 ?fac=1；SPEC-D §7.1、§8.1）：
//   --fac  newRun fac:true：派別被動＋代價、本派選項（升級每 5 級第 4 格；runPolicy 出了就拿）。序章那場照舊沒有。三派一定分開量（--ace 各一支，同一批客人）
//   --nofacpick  本派選項不出（C.factions.levelEvery 0＝只量被動；F6 的對照組）
//   第 D 波棒三（派樹＋試煉階級；SPEC-D §3.7、§5、§7.1、§8.1 F6／F10、§8.3 T）：
//   --factal full|a|b|'{"a1":1,"a2":1,"a3":3,"b1":1,"b2":1,"b3":1}'  派樹（newRun facTal；要 --fac）。full＝每派 D 波開放的節點全點滿（甲 I II＋深耕 3＋乙全部；丙路線之後開放）、
//     a／b＝只點那條路線；JSON＝直接給（節點 id 三派共用 a1…c3；engine facTalOf 只留這派活的、截上限，不驗前置）。多印深耕多回、刺蝟、圈內人
//   --tier k  試煉階級第 k 階＝C.trial.tiers 前 k 條全部疊上（engine trialCfg）；「到第 21 位」那一欄＝試煉過關率（T-1–T-5、F10）
//   --facfx '{"heresy":{"critPre":2}}'  疊進那派的被動 fx（Object.assign C.factions[t].fx；調數字、量第二招從開局就有：{"hall":{"leech":1,"leechMax":2}}）
//   第 I 波 I-1 翻面（程式識別字 encore；scratchpad v5/wave-i SPEC-I §1.8 AN1–AN6）：content C.encore.on 預設開＝預設 7 星王牌、--apex 頂點卡都有翻面
//   --encore off  ＝C.encore.on false（對照組：兩半都關、對決／run 一個欄位都不多）。關著時不印翻面表、JSON 不多 enc／report.encore
//   --encpol      每支策略外面包 engine encorePolicy（會湊條件、6 星翻面盤一定丟、頂點卡能力回來就再發動＝AN6 上界；預設策略照舊＝下限）
//   開著時多印「翻面」兩張表（客人場：每場成立〔含剛好打完、留到下一位〕＝當場＋留到下一位、吃到上一位留下來的、真的用到〔再丟／再發動／吃到下一手加成／回聲望〕、
//            丟出或發動過的場裡成立〔AN3；留下來的那場不另外等條件，不算〕、每趟幾次；逐條件 mode:when、逐派）；JSON 每格多 enc、report 多 encore。
//            --apex 的發動表照舊只看每場第一次發動（翻面再發動那次另記：發動表多一欄「再發動」）
//   --encset '{"<能力 id>":{"when":"caught","give":"hit"}}'  試調頂點卡的翻面（只在這次模擬蓋 C.apexTrial 那幾張的 encore；@檔名＝從 JSON 檔讀；不改 content.js）；
//            家族整列試調用 --patch '{"encore":{"byFamily":{…}}}'
//   11-20 I-1 量測（scratchpad v5/wave-i/build1/SIM.md）：預設模式 AN1 n4000 會讀的到第 50 位 19.2 對 18.9%（+0.3）、新手逐值相同、亮起 16.8%／場；
//            --encpol「6 星盤一定丟／照提示剋」不看讀牌，量起來比預設策略差（預設 −2.5、冷門頂點卡 −13.6）＝不是上界，上界看預設策略本身。
//            --apex 照現行家族表：OK Computer +6.0（n4000）、Filth +3.0；連剋兩手新手成立 52–57%（＝不是讀牌獎勵，AN4 25 張全不過）
//   11-20 I-1 修正輪（scratchpad v5/wave-i/build1/FIX.md、fix/GATES.md）：7 星翻面盤 6→5 星（AN1 +0.0、會湊條件的策略 一般玩家 +0.3／+0.6）；頂點卡家族表換成「連剋全換掉、
//            整場型／回聲望／他少 1 星／你 +1 星／照出真假＝看穿或同色比贏 → 下一手剋中多扣 1」，其他手型照留再發動 → 45 張逐張（21 組能力）AN2–AN4 全過
//   --fac --apex  兩個旗標同開：engine apexAbilityOf 照 C.factions.apexSwap「三家換一格」（F9；調三個數字用 --patch '{"factions":{"apexSwap":{…}}}'，
//            退回只標示＝--patch '{"factions":{"apexSwap":{"on":false}}}'）
//   開 --fac 時多印「流派被動」表（每場平均觸發幾手：整張／借／以小搏大／拆穿／爆擊／回聲望／吸血／比星輸／被剋／平手／反傷／少扣；本派那幾手合計＝F4；
//            每趟拿到各本派選項的比例）＋「到第 21 位」表；JSON 每格多 fac {fights, perFight, picks}、reach21、lexp。不開 --fac 時輸出跟以前一字不差
//   打法差異（F7）另一支：game-lab/diffplay.mjs
//   活店第二階段「切磋」（＝店主說的遭遇戰；scratchpad v5/liveshop SPEC-H §7、§13；engine 的 run.spar；契約 p2/CONTRACT.md）：
//   --enc on|off  切磋開關（＝C.encounter.on；預設 off＝輸出跟沒有這個旗標逐字相同：LS0(a)）。開著時每位主線客人推門之前照 engine encOffer 出邀請（第 6 位起、一般客人位、
//            每輪 ≤1、50%；攤位、領獎、說情、接帖那輪不出），照 --enc-policy 接／不接、打（主線同一個出牌腦，策略亂數另一條＝同一個 i 主線決策照舊）、收／不收；bare 流程不打
//   --enc-policy always|never|smart|cash（預設 smart＝最會撿便宜的：零風險一律接；唱片櫃模式沒擁有就收、否則拿錢；包包模式照主線戰利品列的挑法、會變強就收、否則拿錢。
//            always＝都接、一律收；never＝都改天（LS0(b)：JSON 拿掉 spar／encounter 跟 off 逐字相同）；cash＝都接、一律拿錢（唱片櫃模式對這一趟最有利的上界，只印））
//   --enc-reward shelf|bag  獎勵模式（預設 content C.encounter.reward＝shelf 收進唱片櫃；bag 進這一趟包包）
//   --encbase <json>  同 n、同 cap、同 tier／--fac／--apex／--safety、--enc off 的 --json：LS1–LS4 配對比較（同一批種子）；n ≥ 4000 才判 LS1–LS3
//   --trace <file>  每一趟主線每場開打種子（duel.e.hkey）＋每次配件獎勵寫成 JSON（LS0(c)：on／off 在共同前綴逐筆相同；tools 比對）
//   開著時多印「切磋」表（每趟邀請、每 10 位邀請、接受率、勝率、手數、收牌／拿錢、錢與占總收入、被讀／手 vs 主線同位數、切磋手數÷主線手數、出錯位的計數、連玩 20 趟收進唱片櫃）、
//            LS1–LS8 門檻（LS9＝既有門檻在 --enc on 下照樣全過）；JSON 每格多 spar、report 多 encounter
//   第 I 波 I-2 上場＋耐聽（scratchpad v5/wave-i SPEC-I §3、§5、§3.8、§5.7；engine 的 lineup 段；契約 wave-i/build2/CONTRACT.md）：
//   --lineup on|off  ＝C.lineup.on（預設跟 content）　--wear on|off＝C.wear.on（沒給＝跟著 --lineup：兩個一起開關，SPEC-I §A-5）。量測一律寫明 --lineup on／off（content 開關改了也是同一份）
//   --lineupFrom k   上場制從第 k 位那一輪起（newRun lineupFrom；沒給＝content 的 from 11，--safety＝新帳號第一趟 firstRunFrom 11）　--bench n＝每趟替補格（newRun lineupBonus＝樂歷 Lv3；配件側袋另 +1）
//   --lubase <json>  同 n、同 cap、同旗標、上場與耐聽都關的 --json：W2（會讀的到第 50 位 −4～+1 點、一般玩家中位 −3～+1 位、新手第 1–3 位死亡 ≥ 關 −1 點、到第 10 位 ≤ +2 點；n ≥ 4000 才判）、
//                    L1（第 1–5 位首戰勝率 會讀的／新手差 ≤1 點、新手第 1–3 位死亡差 ≤1 點）、W5（門票 on÷off ≥0.8、樂歷 on÷off ≥0.95；樂歷用每趟平均 基本＋路線）
//   --l2base <json>  同旗標、--bench 0 的 --json：L2（這份 --bench ≥1：會讀的到第 50 位 0 ≤ on − off ≤ +3 點；n ≥ 4000 才判）
//   開著時多印「上場」「耐聽」兩張表＋W1（第 16–30 位收新唱片 ≥50%；n ≥1000 才判）、W3（第 16–30 位打出去的唱片裡聽膩的 5–25%）、W4（會讀的花掉 ≥60%）；
//   JSON 每格多 lineup、report 多 lineup（cfg）。關著＝輸出跟沒有這些旗標逐字相同（engine 策略全走 lineupOn(run) 分支）
//   11-21 I-2 施工量測（scratchpad v5/wave-i/build2/m、m4；n4000 會讀的／一般玩家／新手各一支、同一批客人）：出貨數字 from 11、pen 1.5、耐聽 7 格、替補備案 'worn'——
//     會讀的 到第 50 位 18.6→17.0%（−1.6，W2 過）、一般玩家中位 29→29、新手逐值相同（L1、W2 過）；W1 86.0%、W3 7.3%、W4 74.3%、W5 門票 0.92／樂歷 0.98；
//     L2：--bench 1 手動換（'swap'）−0.1 點（≤0）→ 改備案 'worn' +1.1 點（過）；有替補時 W3 掉到 1.4%（聽膩的被自動換下）。from 6 時新手到第 10 位 30.9→37.2%（T2c 破）＝改 11
//   11-21 I-2 sim 棒驗收（scratchpad v5/wave-i/build2/SIM.md、sim/；同一批客人、上場與耐聽同開 vs 全關）：數字照上（沒調）、耐聽 6／7／8 格掃過定 7——
//     n1000 P8 mode all：關 26/26、開 30/30（W1 86.0%、W3 7.0%、W4 74.2%、W5 0.92／0.973）；n4000（會讀的＋新手、一般玩家各一支）：關 17/17＋3/3、開 27/27＋4/4——
//     會讀的 到第 50 位 18.6→17.0%（−1.6）、一般玩家中位 29→29、新手第 1–3 位死 13.7→13.7%、到第 10 位 30.9→30.9%（W2、L1、§9 三條過）；W1 86.0%、W3 7.3%、W4 74.3%、W5 0.92／0.980；
//     L2 'worn' +1.1（'swap' −0.0）；耐聽 6 格 −2.2／W3 8.6%、8 格 −1.3／W3 6.1%；--enc on（上場開）LS1 +0.0、LS3 +0.0、LS5 91.1／75.7%、LS6 2.70／2.40／2.75 手；
//     ?fac=1 三派 n1000 F1 1.06／1.13、F5 25.2／25.7／27.8%、F8 三派平均全過（但異端 --ace heresy --fac n4000 會讀的到第 50 位 25.1→28.0%＝+3.0，只列）。旗標關 n200 smart／--enc on 跟改前位元相同
//   11-22 I-2 修正棒（build2/FINAL.md、fix/sim/）：側袋不佔配件格（smart 器材行看到就買，會讀的 24% 趟）、攤位不再停在上場那一步（上場一律 lineupDue）、寶箱那張換輪算新——
//     n4000 會讀的 到第 50 位 17.4% 對 關 18.6%（−1.3）、一般玩家中位 30 對 29（+1）、新手逐值相同；W1 86.7%、W3 6.4%、W4 74.7%、W5 0.92／0.981；
//     --bench 1（樂歷 Lv3）：會讀的 18.2%（−0.4）、一般玩家中位 +1、L2 +0.9、W3 1.2%（替補分攤＝規格 W3 只判沒替補）；benchMode 'worn2'（兩層才頂上）W3 7.0% 但 L2 −0.3（不採）。
//     出貨 content C.lineup.on／C.wear.on＝true：量「全關」一律寫明 --lineup off（n200 smart／--enc on 跟改前 base 位元相同）
//   第 I 波 I-3a 市集殼（scratchpad v5/wave-i SPEC-I §6.7；engine 的 Market 段；契約 wave-i/build3/CONTRACT.md）：
//   --market on|off  ＝C.waveC.stall.mode 'market'｜'pick'（沒給＝content；施工期間 content 是 'pick'）。開著時多印「市集」兩張表（每輪時段／用掉／收攤剩／還有剩的輪、
//            算命翻第 1／2／3 張、凶籤、冬瓜茶、錄音室 demo／試錄、進了又退出；每種攤出現→被去／排第一個去）＋M3（用掉 2.0–2.8、還有剩 ≥15%）、K1′（被去 15–85%、
//            排第一個去 ≤60%；n ≥1000 才判、有 --copt 只列）；JSON 每格多 mk、report 多 market。關著＝輸出跟沒有這個旗標逐字相同（report.waveC 不多 stall.mode／fair）
//   --copt 市集多收：slotMin（攤的價值低於這個就不去、留時段換錢；預設 0.5）、whim（先去哪一攤的心情，只排順序；預設 0.4）、flips（算命最多翻幾張 1–3；沒給＝錢夠才多翻）、
//            studio（試錄先挑哪條路線 a｜b｜c）。--ladder 多收 marketTiles／fortuneFree／digN（＝樂歷 Lv4／6／7；數字等級時市集開著才有）
// 新帳號＝不帶配件進來（relics []、等級 1）；新手＝novice（明指就剋、半指／不露照常出猜）、會讀的＝thoughtful（精確客人模型）、亂出＝random。同一個 i 不管策略／流程都是同一批客人（common random numbers）。
//   11-17 讀牌加難（scratchpad v5/harder DESIGN §1.2）多兩支：一般玩家＝humanRead（會讀、數字抓大概＝店主學會新規則之後）、舊腦袋＝oldReader（會算照實機率、
//   以為只有一種唬人、不知道會被讀＝店主第一次玩新版）；兩步公式＝formula（舊版懂反讀：上一手照提示剋過，這手出提示同色）。門檻流程多印一張「每手拆解」
// 名詞（照 ../curve/results.md）：深度＝這一趟輸在第幾位（打完 cap 位還沒輸記 cap）；到第 N 位＝深度 ≥ N；不說情＝同一趟在第一次輸的地方切斷；
//   單位死亡率＝到了這一位的趟裡有幾成在這一位結束；首戰＝這一位的第一場（說情重打不算）；懸崖＝相鄰兩個非藏家位（都 ≥200 趟到過）首戰勝率掉最多的地方。
//
// 門檻（SPEC §4 第三棒；全部看 --gate 流程。2026-11-12 先跑一次 --n 2000 再定數字。任一條沒過 process.exitCode = 1）：
//   T1 新手 第 1–3 位死亡 8–15%（2026-11-16 店主「前期太簡單了，沒有挑戰性」；原本 ≤5%＝刻意的暖身，V3 2%、smart 1.5%）：
//      C.trial.curve 第 1–4 位加難（第 1 位就會唬人）後 smart n=2000 9.8%；第 A 波合併（客人第 1 位起照主屬性組牌、easy 也吃放水唬人）掉到 6.8%，
//      q.easy 0.8→0.75 拉回：smart n=1000／2000／4000＝10.4／8.6／9.4%（scratchpad v5/wave-a/merge/FIX.md）。下限 8% 擋退回送分（q.easy 0.9 只有 4.1%、0.85 也只 5.0%）；
//      上限 15% 擋把只會照提示剋的新手卡死在前三位（掃描裡有一組 18.7%）。scratchpad v5/early/PICK.md
//   T1b 會讀的 第 1–3 位死亡 ≤3%（11-16 新增：加的難度要「讀得出唬人就過得去」，不是全面變難；選定組 1.0%）
//   T2 照規劃書 #s3 的目標（主線 11-12 裁定：SPEC 原本照 V3 bare 寫的 8–20 不含獎勵與商店，改回店主的目標）＋11-17 讀牌加難（店主「玩起來太簡單、
//      很容易讀到對方的牌，舊版難度剛好」；DESIGN §1.3–§1.4，原型 n 1000 cap 300 實測在括號）：
//      T2a 一般玩家（humanRead；原本指新手）深度中位數 15–35（原型 25）：「一般玩家走到第 10–30 位」改指會看提示、知道會被唬的人
//      T2c 新手（只會照提示剋）深度中位數 4–8、到第 10 位 15–35%（原型 5、27%）：舊版照剋死在第 5–9 位；只會照提示剋要走不遠
//      T2b 會讀的 到第 50 位 8–30%（原型 15%）；到第 100 位只印、不擋（原本 10–70%：拿掉「出提示色永遠不會被剋」那張安全牌後，後段每手都可能被剋，原型 2%）
//   T3 會讀的 藏家位死亡率是非藏家位的 2–4 倍：第 4–60 位、到過 ≥200 趟的位置合併算（第 1–3 位是前期、另有 T1／T1b 看，不算進來；V3 13–20% 對 5–7%）
//      n ≥ 4000 才照 2–4 倍判（會讀的 n 1000 標準誤約 ±0.15、n 4000 約 ±0.08）；n 更小只列「參考」不計，偏離 2–4 倍超過 2 個標準誤才算沒過（第 B 波合併 11-17）
//   T4 相鄰非藏家位首戰勝率掉 ≤20 點（新手、會讀的各一條；V3 新手第 4→6 位 19 點、會讀的 14 點）
//   T5 一場平均手數：新手 3–4.5（舊版試玩表 3–4 招）；會讀的 2.5–4.5（後段包包變強、一場變短；之後用 C.trial.tiers 難度階梯給高手加難度，店主 11-12 參考 Monster Train）
//   T6 亂出 到第 5 位 ≤5%：第一次跑出 smart 1.5%、none 0.5%、bare 0.05%（亂出第 1 位首戰只贏 2 成，97% 死在第 1–3 位）；留 3 倍餘裕（舊 S3 也是 ≤5%）
//   T7 會讀的比亂出走得遠：深度中位數 ≥ 亂出的 2 倍且至少多 5 位（第一次跑出 smart 90 對 1、bare 14 對 1）
//   R1 讀牌拉開差距（11-17）：會讀的 − 新手 到第 10 位 ≥ 50 點（原型 95 − 27＝68；改版前 97 − 95＝2：讀不讀都一樣）
//   R2 舊讀法會被騙（11-17）：舊腦袋 到第 10 位 55–80%（原型 72%；改版前會讀的 97%）：店主第一次玩新版要被騙到，但不是打不過
//   R3 沒有安全牌（11-17）：跟提示同色 到第 10 位 ≤10%（原型 3%；改版前 47%）；兩步公式 到第 10 位 ≤ 會讀的 −8 點（背公式不能等於會讀）
//   R4 會讀的前 10 位不要變成拼運氣（11-17）：會讀的 第 1–4、6–9 位首戰 ≥92%；第 5、10 位（藏家）≥82%（原型最低 88）
//   11-17 施工後（--n 1000，243 秒）：23/23，旋鈕＝DESIGN 選定組沒調。T1 14.5%（--n 2000 只跑新手／會讀的／亂出：12.6%）、T2a 中位 25、T2c 中位 5／到第 10 位 28.6%、
//      T2b 到第 50 位 14.8%（到第 100 位 2.2%）、R1 66.2 點、R2 72.1%、R3 2.9%／81.4 對 94.8、R4 最低 89（第 10 位）、T3 2.04 倍（貼下緣：掉到 2 以下就 read.rho.boss +.05）
//   第 B 波合併（11-17，5,045 張＋一檔貨；scratchpad v5/wave-b/merge/sim.md、FIX.md）：T3 n 1000 掉到 1.92（--lot off 1.97）。n 4000 只跑會讀的：main 2.18、合併 2.19
//      ＝真值沒變（≥2），是 n 1000 那批亂數偏低 → T3 改成 n ≥ 4000 才判（上面 T3），read.rho 不動（.45／.55／0；調 hard／max 上去、boss 下來 T3 會過，
//      但那是一般位變好過、藏家反而比一般客人少讀你，跟加難相反：n 4000 非藏家死亡率 2.50→2.26%、到第 50 位 16.6→19.3%）。
//      上面「boss +.05」方向不對（會讀的照精確機率變招，讀你越多越好剋；n 1000 同一批亂數：+.05 1.92 沒動、+.15 1.82、−.10 1.96、−.20 2.26）；
//      真要拉 T3 是 boss 往下，但只調 boss −.20 新手過得了第 5 位（T2c 到第 10 位 39%），要連一般位一起看＝難度決定，給店主
//   S5 序章男子（保留 v4 §5.2）：會讀的 ≥97%、平均 ≤4 手；只出最大星 ≥90%；新手（永遠剋提示）≥90%
//   M6 最多 6 手（CFG.maxRounds）；HP 聲望單調 C.trial.guestHp 一般 ≤ 菁英 ≤ 藏家（不靠模擬）
//   第 C 波（SPEC-C §8 定稿；C 波開著才檢查，上面 13 條照舊全看 C 波開著的 smart）：
//   D1 C 波不放水：新帳號 會讀的 到第 50 位 ≤ 現況＋4 點（--dbase 給同 n、同旗標的現況）　D2 新手 到第 10 位 ≤33%（D1／D2 要 --safety＝新帳號第一趟）
//   D3 老玩家不變難也不變簡單（--returning）：會讀的 到第 50 位在現況 ±4 點內　——D1–D3 n ≥ 4000 才判，更小只列參考（跟 T3 一樣）
//   K1 選路有差：會讀的 每種站出現時被選 15–85%（出現 <50 次的站只列）　K2 踢館帖：smart 接帖率（接÷走到那站）20–80%；--copt '{"dare":"always"}' 時接帖那輪首戰勝率比平常少 ≤10 點（第 31 位起）
//   K4 新手 到第 5 位 ≥75%　N1 會讀的 第 15 位起路上的盤重複 ≤10%、一趟新認識 ≥50 張
//   （K1、K2 接帖率只在沒給 --copt 時判；--from 不判 K／N）
//   參考（只印）：E1 會讀的花掉 ≥60%、E2 新手 ≥40%、E3 每輪開頭的錢中位 ≤ 現況 $41,350 的 60%、E4 演唱會 ≤ 基本樂歷 25%、路線 ≤40%、到第 100 位
// 第一次跑（2026-11-12，--n 2000，171 秒）：smart 13/15，沒過的是 T2 會讀的中位 90（平均 103.9）、T5 會讀的 2.57 手。T1／T3–T7 的 SPEC 數字照用、不放寬。
//   會讀的 深度中位／平均（新手）拆解：V3 12／15.8（6／6.6）→ bare 但放水唬人 0（--patch '{"trial":{"curve":{"mercyFeint":0}}}'）12／15.5（6／6.6，逐位對得上 V3）
//   → bare 14／17.1（6／7.1；＋放水唬人）→ relics 18／21.7（8／8.6；＋序章、菁英、藏家給的配件）→ cards 61／67.2（15／14.8；＋客人丟的唱片）
//   → none 68／74.8（15／15.7）→ smart 90／103.9（16／18.8；＋買，幾乎都是櫃檯的屬性加成配件：每趟買唱片 0.2 張、配件 0.96 件，賺 $220,057 只花 $3,113）。
//   主因是獎勵唱片：後段客人的牌經過下限替換（第 14 位起總星 ≥13），拿回來包包平均總星 9.1→13.2，V3 的 harness 包包整趟不換。要改曲線還是改獎勵由主線定。
import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const require = createRequire(import.meta.url);
const HERE = path.dirname(fileURLToPath(import.meta.url));
const EN = require(path.join(HERE, 'engine.js'));
const C = require(path.join(HERE, 'content.js'));
const { CFG, TIERS } = EN;

// ---------------- args ----------------
const argv = process.argv.slice(2);
const arg = (name, def) => { const i = argv.indexOf('--' + name); return i >= 0 && argv[i + 1] != null ? argv[i + 1] : def; };
const N = +arg('n', 2000);
const MODE = arg('mode', 'all');
const CAP = +arg('cap', 300);
const TIER = +arg('tier', 0);
const APEX = argv.includes('--apex');
const NO_THIN = argv.includes('--no-thin');
const APEX_ACE = arg('apex-ace', null);
if (APEX_ACE && !(C.cards[APEX_ACE] && EN.apexList(C, C.cards[APEX_ACE].tier).some(x => x.card === APEX_ACE))) { console.error('--apex-ace 要是 C.apexTrial 名單裡的頂點卡 id'); process.exit(2); }
if (APEX_ACE && !APEX) { console.error('--apex-ace 要跟 --apex 一起用'); process.exit(2); }
const ACE_T = arg('ace', null);
if (ACE_T && !TIERS.includes(ACE_T)) { console.error('--ace ' + TIERS.join('|')); process.exit(2); }
if (ACE_T && APEX_ACE && C.cards[APEX_ACE].tier !== ACE_T) { console.error('--ace 跟 --apex-ace 那張的派不同'); process.exit(2); }
const UNLOCK = argv.includes('--unlock');
const APEX_PARAMS = arg('apex-params', null) ? JSON.parse(arg('apex-params').startsWith('@') ? fs.readFileSync(arg('apex-params').slice(1), 'utf8') : arg('apex-params')) : null;   // @檔名＝從檔案讀
if (APEX_PARAMS && !APEX) { console.error('--apex-params 要跟 --apex 一起用'); process.exit(2); }
if (APEX_PARAMS) for (const id of Object.keys(APEX_PARAMS)) {
  const e = TIERS.flatMap(t => EN.apexList(C, t)).find(x => x.id === id);
  if (!e) { console.error('--apex-params：沒有能力 ' + id); process.exit(2); }
  const o = APEX_PARAMS[id];
  if (o.hold) { if (!e.hold) { console.error('--apex-params：' + id + ' 不是留著型'); process.exit(2); } e.hold = Object.assign({}, e.hold, { params: Object.assign({}, e.hold.params, o.hold) }); }
  const pp = Object.assign({}, o); delete pp.hold;
  if (e.op === 'combo' && Object.keys(pp).length) {                     // 兩個原語合一：{"ops":[…]}＝整組換掉；平的鍵（{"n":2}）＝蓋到組裡有這個參數的原語（沒有任何原語有它＝報錯，不默默不改）
    const ops = Array.isArray(pp.ops) ? pp.ops.map(x => ({ op: x.op, params: Object.assign({}, x.params) })) : (e.params.ops || []).map(x => ({ op: x.op, params: Object.assign({}, x.params) }));
    for (const [k, v] of Object.entries(pp)) {
      if (k === 'ops') continue;
      const byOp = ops.filter(x => x.op === k);                           // {"mirrorPlus":{"n":2}}＝只改組裡那個原語
      if (byOp.length && v && typeof v === 'object') { for (const x of byOp) Object.assign(x.params, v); continue; }
      const hit = ops.filter(x => k in (x.params || {}));
      if (!hit.length) { console.error('--apex-params：' + id + ' 是 combo（' + ops.map(x => x.op).join('＋') + '），沒有參數 ' + k + '；整組換用 {"ops":[…]}'); process.exit(2); }
      for (const x of hit) x.params[k] = v;
    }
    e.params = { ops };
  } else if (Object.keys(pp).length) e.params = Object.assign({}, e.params, pp);
}
const JSON_OUT = arg('json', null);
const ALL_FLOWS = ['smart', 'none', 'bare', 'cards', 'relics'];
const FLOWS = arg('flows', 'smart,none,bare').split(',').filter(Boolean);
const GATE = arg('gate', 'smart');
for (const f of FLOWS) if (!ALL_FLOWS.includes(f)) { console.error('--flows ' + ALL_FLOWS.join('|')); process.exit(2); }
if (!ALL_FLOWS.includes(GATE)) { console.error('--gate ' + ALL_FLOWS.join('|')); process.exit(2); }
if (!['all', 'runs', 'man'].includes(MODE)) { console.error('--mode all|runs|man'); process.exit(2); }
if (!(CAP >= 5)) { console.error('--cap ≥ 5'); process.exit(2); }
if (arg('set', null)) for (const kv of arg('set').split(',')) {
  const [k, v] = kv.split('=');
  if (!(k in CFG)) throw new Error('unknown CFG ' + k);
  CFG[k] = v === 'true' ? true : v === 'false' ? false : +v;
}
if (arg('data', null)) {
  const dir = path.resolve(arg('data'));
  const cards = require(path.join(dir, 'cards.js')), bins = require(path.join(dir, 'bins.js'));
  const B = (bins.shops && bins.shops.dip) || bins.bins || {};
  for (const id of Object.keys(C.cards)) if (!cards[id]) console.error('--data: cards.js 沒有 ' + id + '（沿用本地的）');
  C.cards = Object.assign({}, C.cards, cards);
  C.bins = {}; for (const k of Object.keys(B)) if (B[k] && Array.isArray(B[k].pool)) C.bins[k] = Object.assign({}, B[k]);
  C.deriveAll(C);                                                         // 箱子的 all（第 2 檔起的來源）照換過的卡重推；推不出來＝engine 退回 pool＋lotWarn（結尾印警告）
  console.log('--data ' + dir + '：卡 ' + Object.keys(C.cards).length + ' 張、箱子 ' + Object.keys(C.bins).join(' '));
}
const deepMerge = (t, s) => { for (const k in s) { if (s[k] && typeof s[k] === 'object' && !Array.isArray(s[k]) && t[k] && typeof t[k] === 'object') deepMerge(t[k], s[k]); else t[k] = s[k]; } return t; };
// 第 B 波旗標（見檔頭）：--lot off＝--patch '{"lot":{"on":false}}'（先套，--patch 可以再蓋）
const LOT_ARG = arg('lot', null);
if (LOT_ARG != null && !['on', 'off'].includes(LOT_ARG)) { console.error('--lot on|off'); process.exit(2); }
if (LOT_ARG) deepMerge(C, { lot: { on: LOT_ARG === 'on' } });
// 第 C 波旗標（見檔頭）：--wc 先套（off＝全關＋客人補償關）、--patch 再蓋
const WC_ARG = arg('wc', null);
if (WC_ARG === 'off') deepMerge(C, { waveC: { loot: { on: false }, chest: { on: false }, stall: { on: false }, safety: { on: false } }, trial: { guestHpSteps: [] } });
else if (WC_ARG) { C.waveC = C.waveC || {}; deepMerge(C.waveC, JSON.parse(WC_ARG)); }
if (arg('patch', null)) deepMerge(C, JSON.parse(arg('patch')));
// 第 D 波棒二（見檔頭）：--fac 三流派、--nofacpick 本派選項不出、--facfx 疊進被動 fx（--patch 之後套）
const FAC = argv.includes('--fac');
const NOFACPICK = argv.includes('--nofacpick');
const FACFX = arg('facfx', null) ? JSON.parse(arg('facfx')) : null;
if ((NOFACPICK || FACFX) && !FAC) { console.error('--nofacpick／--facfx 要跟 --fac 一起用'); process.exit(2); }
if (FAC && !EN.facCfg(C)) { console.error('--fac：content 沒有 C.factions（或 on:false）'); process.exit(2); }
if (FACFX) for (const t of Object.keys(FACFX)) {
  if (!TIERS.includes(t) || !FACFX[t] || typeof FACFX[t] !== 'object') { console.error('--facfx 的鍵要是 ' + TIERS.join('|') + '，值是物件'); process.exit(2); }
  C.factions[t].fx = Object.assign({}, C.factions[t].fx, FACFX[t]);
}
if (NOFACPICK) C.factions.levelEvery = 0;
const FACTAL_ARG = arg('factal', null);                                   // 第 D 波棒三派樹（見檔頭）
if (FACTAL_ARG && !FAC) { console.error('--factal 要跟 --fac 一起用'); process.exit(2); }
const FACTAL_FOR = !FACTAL_ARG ? null : (ace => {
  const all = EN.treeNodes(C, ace), lv = n => n.op === 'deep' ? Math.max(1, n.max | 0) : 1;
  if (['full', 'a', 'b'].includes(FACTAL_ARG)) return Object.fromEntries(all.filter(n => !n.soon && (FACTAL_ARG === 'full' || n.id[0] === FACTAL_ARG)).map(n => [n.id, lv(n)]));
  return JSON.parse(FACTAL_ARG);
});
// 第 I 波 I-1 翻面（見檔頭）：--encore on|off（--patch 之後套）、--encpol 量上界
const ENC_ARG = arg('encore', null);
if (ENC_ARG != null && !['on', 'off'].includes(ENC_ARG)) { console.error('--encore on|off'); process.exit(2); }
if (ENC_ARG && C.encore && typeof C.encore === 'object') C.encore.on = ENC_ARG === 'on';
const ENC_ON = !!(EN.encCfg && EN.encCfg(C));
const ENCPOL = argv.includes('--encpol');
if (ENCPOL && !ENC_ON) { console.error('--encpol 要翻面開著（不要 --encore off）'); process.exit(2); }
// --encset '{"<能力 id>":{"when":"caught","give":"heal"}}'＝試調頂點卡的翻面（只在這次模擬裡蓋 C.apexTrial 那幾張的 encore；@檔名＝從 JSON 檔讀；不改 content.js）
const ENCSET = arg('encset', null) ? JSON.parse(arg('encset').startsWith('@') ? fs.readFileSync(arg('encset').slice(1), 'utf8') : arg('encset')) : null;
if (ENCSET && !ENC_ON) { console.error('--encset 要翻面開著'); process.exit(2); }
if (ENCSET) for (const id of Object.keys(ENCSET)) {
  const e = TIERS.flatMap(t => EN.apexList(C, t)).find(x => x.id === id), v = ENCSET[id];
  if (!e) { console.error('--encset：沒有能力 ' + id); process.exit(2); }
  if (!v || !EN.ENC_WHEN.includes(v.when) || !EN.ENC_GIVE.includes(v.give)) { console.error('--encset：' + id + ' 的 when 要是 ' + EN.ENC_WHEN.join('|') + '、give 要是 ' + EN.ENC_GIVE.join('|')); process.exit(2); }
  e.encore = { when: v.when, give: v.give };
}
// 活店第二階段切磋（見檔頭；--patch 之後套）：--enc on|off（預設 off＝輸出跟沒有這個旗標逐字相同）、--enc-policy、--enc-reward、--encbase、--trace
const SPAR_ARG = arg('enc', null);
if (SPAR_ARG != null && !['on', 'off'].includes(SPAR_ARG)) { console.error('--enc on|off'); process.exit(2); }
const SPAR_ON = SPAR_ARG === 'on';
const SPAR_POL = arg('enc-policy', 'smart'), SPAR_REW_ARG = arg('enc-reward', null);
if (!EN.SPAR_POLICIES.includes(SPAR_POL)) { console.error('--enc-policy ' + EN.SPAR_POLICIES.join('|')); process.exit(2); }
if (SPAR_REW_ARG != null && !EN.SPAR_MODES.includes(SPAR_REW_ARG)) { console.error('--enc-reward ' + EN.SPAR_MODES.join('|')); process.exit(2); }
if (!SPAR_ON && (argv.includes('--enc-policy') || SPAR_REW_ARG != null || arg('encbase', null))) { console.error('--enc-policy／--enc-reward／--encbase 要跟 --enc on 一起用'); process.exit(2); }
if (SPAR_ON) C.encounter = Object.assign({}, C.encounter || {}, { on: true }, SPAR_REW_ARG ? { reward: SPAR_REW_ARG } : {});
const SPAR_REW = SPAR_ON ? EN.sparMode(C) : null;
const ENCBASE = arg('encbase', null) ? JSON.parse(fs.readFileSync(arg('encbase'), 'utf8')) : null;
const TRACE = arg('trace', null), TRACE_OUT = TRACE ? {} : null;
// 第 I 波 I-2 上場＋耐聽（見檔頭；--patch 之後套）
const LU_ARG = arg('lineup', null), WR_ARG = arg('wear', null) != null ? arg('wear', null) : LU_ARG;
if (LU_ARG != null && !['on', 'off'].includes(LU_ARG)) { console.error('--lineup on|off'); process.exit(2); }
if (WR_ARG != null && !['on', 'off'].includes(WR_ARG)) { console.error('--wear on|off'); process.exit(2); }
if (LU_ARG) C.lineup = Object.assign({}, C.lineup || {}, { on: LU_ARG === 'on' });
if (WR_ARG) C.wear = Object.assign({}, C.wear || {}, { on: WR_ARG === 'on' });
const LU_ON = !!EN.luCfg(C).on, WR_ON = !!EN.wearCfg(C).on, LUX = LU_ON || WR_ON;
const LU_FROM = arg('lineupFrom', null) != null ? +arg('lineupFrom') : null, BENCH = arg('bench', null) != null ? +arg('bench') : null;
if (LU_FROM != null && !(Number.isInteger(LU_FROM) && LU_FROM >= 2)) { console.error('--lineupFrom k（≥2 的整數）'); process.exit(2); }
if (BENCH != null && !(Number.isInteger(BENCH) && BENCH >= 0 && BENCH <= 2)) { console.error('--bench n（0–2）'); process.exit(2); }
if ((LU_FROM != null && !LUX) || (BENCH != null && !LU_ON)) { console.error('--lineupFrom／--bench 要上場制開著（--lineup on）'); process.exit(2); }
const LUBASE = arg('lubase', null) ? JSON.parse(fs.readFileSync(arg('lubase'), 'utf8')) : null, L2BASE = arg('l2base', null) ? JSON.parse(fs.readFileSync(arg('l2base'), 'utf8')) : null;
if ((LUBASE || L2BASE) && !LUX) { console.error('--lubase／--l2base 要上場制開著'); process.exit(2); }          // LS0(c)：每一趟主線每場開打種子（duel.e.hkey）＋每次配件獎勵（pending.relics）
// 第 I 波 I-3a 市集（見檔頭；--patch 之後套）：--market on|off＝C.waveC.stall.mode 'market'｜'pick'（沒給＝content）
const MK_ARG = arg('market', null);
if (MK_ARG != null && !['on', 'off'].includes(MK_ARG)) { console.error('--market on|off'); process.exit(2); }
if (MK_ARG) { C.waveC = C.waveC || {}; C.waveC.stall = Object.assign({}, C.waveC.stall || {}, { mode: MK_ARG === 'on' ? 'market' : 'pick' }); }
const MK_ON = !!EN.fairOn(C);
const ENC_KEYS = ['ace:caught','ace:combo2', 'apex:caught', 'apex:combo2', 'apex:sameWin', 'apex:lowhp'];   // 翻面逐條件表的欄位順序（其他照出現順序接在後面）
const FAC_KEYS = EN.FAC_NOTE_ORDER.concat(['cut', 'deep']);              // duel.stats.fac 的鍵（結果行小字＋本派選項「每場第一次被剋少扣」）＋棒三深耕多回的聲望（finishFight out.deep）
const FAC_OWN = { hall: ['full', 'tieCost'], pearl: ['borrow', 'underdog', 'cCost'], heresy: ['crit', 'crit2', 'loseCost'] };   // F4：被動或代價觸發的手（三派互斥）
const WCC = EN.wcCfg(C), WC_ON = !!(WCC.loot.on || WCC.chest.on || WCC.stall.on || WCC.safety.on);
const COPT = JSON.parse(arg('copt', '{}')), COPT_SET = Object.keys(COPT).length > 0;
const SAFETY = argv.includes('--safety');
const FROM = arg('from', null) != null ? +arg('from') : null;
if (FROM != null && !(Number.isInteger(FROM) && FROM > 1 && EN.isCheckpoint(FROM, C))) { console.error('--from N（N 要是中繼點：' + [10, 20, 30, 50, 75, 100].join('／') + '…）'); process.exit(2); }
const FROM_RELICS = (arg('from-relics', '') || '').split(',').filter(Boolean);
const RET_RELICS = arg('returning', null) ? arg('returning').split(',').filter(Boolean) : null;
for (const id of FROM_RELICS.concat(RET_RELICS || [])) if (!(C.relics || {})[id]) { console.error('沒有配件 ' + id); process.exit(2); }
if ((FROM || SAFETY || COPT_SET) && !WC_ON) { console.error('--from／--safety／--copt 要 C 波開著（不要 --wc off）'); process.exit(2); }
const DBASE = arg('dbase', null) ? JSON.parse(fs.readFileSync(arg('dbase'), 'utf8')) : null;
const CPBASE = arg('cpbase', null) ? JSON.parse(fs.readFileSync(arg('cpbase'), 'utf8')) : null;   // C1：中繼點開局的「從頭打」對照（新帳號 會讀的 smart）
const LOT_ON = !!EN.lotCfg(C).on;
const BROWSE = +arg('browse', 16);
if (!(Number.isInteger(BROWSE) && BROWSE >= 1)) { console.error('--browse k（1–16 的整數；16＝全看）'); process.exit(2); }
// 第 D 波棒一（見檔頭）：--talent 主幹固定檔位、--ladder 階梯（seedMax／relicPick／goldAdd）、--posmax
const TALENT = arg('talent', null) ? JSON.parse(arg('talent')) : null;
if (TALENT) for (const k of Object.keys(TALENT)) if (!EN.talentDef(C, k) || !(Number.isInteger(TALENT[k]) && TALENT[k] >= 0)) { console.error('--talent：沒有天賦 ' + k + '（或級數不是非負整數）'); process.exit(2); }
const LADDER_ARG = arg('ladder', null), LADDER_KEYS = ['seedMax', 'relicPick', 'goldAdd', 'lineupBonus', 'marketTiles', 'fortuneFree', 'digN'];
let LADDER = null;
if (LADDER_ARG != null) {
  if (/^\d+$/.test(LADDER_ARG)) { const t = EN.talentArgs(C, { xp: EN.careerXpAt(C, +LADDER_ARG), spent: {} }); LADDER = {}; for (const k of LADDER_KEYS) if (t[k]) LADDER[k] = t[k]; }
  else LADDER = JSON.parse(LADDER_ARG);
  for (const k of Object.keys(LADDER)) if (!LADDER_KEYS.includes(k)) { console.error('--ladder 只收 ' + LADDER_KEYS.join('／') + '（或樂歷等級數字；lineupBonus＝第 I 波 I-2 Lv3，上場制開著才有；marketTiles／fortuneFree／digN＝I-3a Lv4／6／7，市集開著才有）'); process.exit(2); }
}
const SEED_MAX = LADDER && LADDER.seedMax > 0 ? LADDER.seedMax | 0 : CFG.seedMax;
const POSMAX = +arg('posmax', 60);
const I0 = +arg('i0', 0);                                                 // 第 D 波：趟的編號從 i0 起（另一批獨立的客人；跟 i0 0 的同 n 合併＝加大樣本）
if (!(Number.isInteger(I0) && I0 >= 0)) { console.error('--i0 k（非負整數）'); process.exit(2); }
if (!(Number.isInteger(POSMAX) && POSMAX >= 1)) { console.error('--posmax N（正整數）'); process.exit(2); }
const D1EX = !!(TALENT || LADDER || TIER || FAC);                           // 多印「到第 21 位」＋樂歷表、JSON 多 reach21／lexp（棒二：--fac 也印）
const SEEDS_ARG = arg('seeds', null);
let SEEDS = null;
if (SEEDS_ARG != null) {
  const m = /^(\d+):([a-z]+)$/.exec(SEEDS_ARG);
  if (!m || !EN.RARITY.includes(m[2]) || m[2] === 'apex' || +m[1] > SEED_MAX) { console.error('--seeds k:rarity（k 0–' + SEED_MAX + '（seedMax；--ladder 可放大）、rarity ' + EN.RARITY.filter(r => r !== 'apex').join('|') + '）'); process.exit(2); }
  SEEDS = { k: +m[1], rarity: m[2] };
}
const WANT_N = +arg('want', 0);
if (!(Number.isInteger(WANT_N) && WANT_N >= 0)) { console.error('--want N（非負整數）'); process.exit(2); }

const ALL_POLS = ['thoughtful', 'novice', 'random', 'humanRead', 'oldReader', 'high', 'formula', 'mirrorHint', 'oracle'];
const POLS = arg('policies', ALL_POLS.join(',')).split(',').filter(Boolean);
for (const p of POLS) if (!EN.policies[p]) { console.error('unknown policy ' + p); process.exit(2); }
const CORE = ['thoughtful', 'novice', 'random'];                 // 每個流程都跑；其他策略只跑門檻流程
const LABEL = { thoughtful: '會讀的', novice: '新手（剋提示）', random: '亂出', high: '只出最大星', counterHint: '永遠剋提示', formula: '兩步公式（舊版懂反讀）',
  mirrorHint: '跟提示同色（對照）', oracle: '先知', humanRead: '一般玩家', oldReader: '舊腦袋（不知道會被讀）' };
const FLOW_ZH = { smart: 'smart（獎勵＋買）', none: 'none（獎勵、不買）', bare: 'bare（＝V3）', cards: 'cards（只拿唱片）', relics: 'relics（只拿配件）' };
const MAN = C.prologueEnemy;
const pct = x => x == null ? '—' : (100 * x).toFixed(1) + '%';
const pt = x => x == null ? '—' : (100 * x).toFixed(1);
const p0 = x => x == null ? '—' : String(Math.round(100 * x));
const r3 = x => (x == null || Number.isNaN(x) ? null : Math.round(x * 1000) / 1000);
const f2 = x => x == null ? '—' : x.toFixed(2);
const t0 = Date.now();
const ok = (r, who, ch) => { if (!r || !r.ok) throw new Error(who + ' ' + (r && r.error) + ' ' + JSON.stringify(ch)); };

// V3（../curve/results.md 三、與「每一位」表；新帳號、每格 4,000 趟、harness 的包包整趟不換、沒有放水唬人）——只拿來對照，不是門檻
const V3 = {
  novice: { median: 6, mean: 6.6, nrMean: 5.4, reach: [0.89, 0.16, 0, 0, 0], hands: 3.7, r6: 0.15, byBar: 0.05, die13: 0.02,
    pos: '99/0 99/0 92/2 79/10 43/42 60/27 68/20 62/23 62/31 34/55 48/34 33/51' },
  thoughtful: { median: 12, mean: 15.8, nrMean: 8.9, reach: [1, 0.69, 0.28, 0.02, 0], hands: 3.9, r6: 0.24, byBar: 0.29, die13: 0,
    pos: '100/0 100/0 99/0 96/1 70/13 82/6 87/5 87/6 86/6 69/20 81/5 82/7 88/5 87/6 71/20 87/3' },
};

// ---------------- play one duel to the end ----------------
function play(duel, pol, R, mem, K) {
  const fn = ENCPOL ? EN.encorePolicy(pol) : EN.policies[pol]; let g = 0;   // 第 I 波：--encpol＝會湊翻面條件的上界策略
  K = K || C;                                                             // 切磋：content 視圖（encView；只有 estStars 讀 cards，跟 C 同一份）
  duel._mN = 0; duel._mOn = 0;
  while (!duel.over) {
    if (++g > 20) throw new Error('runaway duel');
    if (duel.e.mercyP != null && duel.plan) { duel._mN++; if (duel.plan.mercy) duel._mOn++; }   // 第 11 位起：這手有沒有放水（plan.mercy；只記不讀）
    const act = fn(duel, R, mem, K);
    if (!EN.isLegal(duel, act)) throw new Error('illegal act from ' + pol + ': ' + JSON.stringify(act));
    const ev = EN.resolveTurn(duel, act);
    if (act.apex) {                                                     // 頂點卡試做：記第一次發動那手（只有 --apex 會走到）；翻面再發動那次只計次數（_apexN）
      duel._apexN = (duel._apexN | 0) + 1;
      if (!duel._apexHand) {
        const a = ev.find(e => e.t === 'apex'), c = ev.find(e => e.t === 'clash');
        duel._apexHand = { n: c.n, toE: c.toE, toP: c.toP, kind: c.kind, heal: (a && a.heal) | 0, reveal: a ? a.reveal || null : null, d: c.apex ? c.apex.d : 0, hit: !!(c.apex && c.apex.hit) };
      }
    }
  }
  return duel;
}
const bagPower = run => run.bag.reduce((s, id) => s + EN.power(C.cards[id]), 0) / Math.max(1, run.bag.length);
// 收音機（smart 流程）：每輪一次。轉哪格＝抽卡池裡「剋下一位主屬性（換牌、加星後的牌單＋他帶的王牌）那軸」平均星最高的那格（抽到哪張不偷看；壓力測試：比隨便轉更強）；
//   轉到就看買不買得起（engine.bargainPriceIn＝原價）：包包有空位、錢夠就買；包包滿＝賣掉能賣的最弱那張（不是送的、不是種子）換，電台那張要比它強、錢加賣回的要夠
//   包包不限（預設）：不會滿；收進包包 bagScore 要漲（engine.bagGain > 0.005）才買，不然不買（牌組變大會稀釋）
function radioSmart(run, R) {
  if (!EN.canRadio || !EN.canRadio(run)) return;
  const id = run.order[run.idx], E = C.enemies[id]; if (!E) return;
  const g = EN.guestDef(run, C, id, run.pos);                         // 換牌、加星、照主屬性組的那副（＝startFight 會打到的）
  const deck = g.deck.slice(); if (g.ace) deck.push(g.ace);
  const T = EN.COUNTER_OF[EN.deckMain(deck, E.taste)];
  let best = null, bv = -1;
  for (const cell of C.tunes.order) {
    const pool = EN.radioPool(run, C, cell); if (!pool.length) continue;
    const v = pool.reduce((s, x) => s + EN.star(C.cards[x], T), 0) / pool.length;
    if (v > bv) { bv = v; best = cell; }
  }
  if (!best) return;
  ok(EN.choose(run, C, { type: 'radio', cell: best }), 'radio', best); R.spins++;
  const rid = run.shop.radio.id, price = EN.bargainPriceIn(run, C, rid), ch = { type: 'buyBargain', ids: [rid] };
  if (EN.bagFull(run)) {                                             // 有上限而且滿了才賣（bagMax null／0／負數＝不限，跟 Infinity 一樣）
    const weak = run.bag.filter(x => !EN.isGift(run, C, x) && !EN.isSeed(run, C, x)).sort((a, b) => EN.power(C.cards[a]) - EN.power(C.cards[b]))[0];
    if (weak == null || EN.power(C.cards[weak]) >= EN.power(C.cards[rid])) return;
    ch.sellIds = [weak];
  } else if (!EN.bagLimited() && EN.bagGain(run, C, rid) <= 0.005) return;
  const earn = (ch.sellIds || []).reduce((s, x) => s + EN.sellValue(C, C.cards[x]), 0);
  if (run.money + earn < price) return;
  ok(EN.choose(run, C, ch), 'radio buy', ch); R.bought++; R.spent += price;
}

// ---------------- 第 B 波：--want／--seeds／--browse 的輸入（每一趟固定、跟策略與流程無關＝同一批客人） ----------------
// --want N：有箱子的非頂點卡裡 hash01('want#'+趟+'#'+id) 最小的 N 張（照雜湊由小到大＝清單順序；engine 每檔自己重洗擲的順序）
const WANT_SRC = WANT_N ? Object.keys(C.cards).filter(id => { const c = C.cards[id]; return c && c.bin && C.bins[c.bin] && !c.tier; }) : [];
const WANT_MEMO = new Map();
function wantFor(i) {
  if (WANT_MEMO.has(i)) return WANT_MEMO.get(i);
  const w = WANT_SRC.map(id => ({ id, h: EN.hash01('want#' + i + '#' + id) })).sort((a, b) => a.h - b.h || (a.id < b.id ? -1 : 1)).slice(0, WANT_N).map(x => x.id);
  WANT_MEMO.set(i, w); return w;
}
// --seeds k:rarity：稀有度＝rarity 的非頂點、非特價（新舊）、非王牌卡裡 peak 最高、同分 hash01('seeds#'+趟+'#'+id) 最小的 k 張（engine canSeed 也要過）
const SEED_SRC = SEEDS ? (() => {
  const bg = new Set([].concat((C.bargain || {}).pool || [], (C.bargain || {}).retired || [])), aces = new Set(Object.values(C.aces || {}));
  return Object.keys(C.cards).filter(id => { const c = C.cards[id]; return c && !c.tier && !bg.has(id) && !aces.has(id) && EN.rarity(c) === SEEDS.rarity && EN.canSeed(C, id); })
    .map(id => ({ id, p: EN.peak(C.cards[id]) }));
})() : [];
const SEED_MEMO = new Map();
function seedsFor(i) {
  if (!SEEDS || !SEEDS.k) return [];
  if (SEED_MEMO.has(i)) return SEED_MEMO.get(i);
  const s = SEED_SRC.map(x => ({ id: x.id, p: x.p, h: EN.hash01('seeds#' + i + '#' + x.id) })).sort((a, b) => b.p - a.p || a.h - b.h || (a.id < b.id ? -1 : 1)).slice(0, SEEDS.k).map(x => x.id);
  SEED_MEMO.set(i, s); return s;
}
// --browse k：這一位只「打開」FEATURE＋其他箱裡 hash01(seedKey#runNo#pos#browse#箱) 最小的 k−1 箱。回 run 的淺複本（shop 也淺複製、bins 只留那幾箱、照原本箱子順序）；
//   shopPolicy 自己會 clone，不改真的 run。打開的箱 ≥ 全部＝回原 run（k=16 不走這裡＝輸出跟沒有這個旗標逐字相同）
function browseKeys(run) {
  const keys = Object.keys(run.shop.bins), rest = keys.filter(k => k !== 'feature');
  const open = new Set(rest.map(k => ({ k, h: EN.hash01(run.seedKey + '#' + run.runNo + '#' + run.pos + '#browse#' + k) })).sort((a, b) => a.h - b.h || (a.k < b.k ? -1 : 1)).slice(0, Math.max(0, BROWSE - 1)).map(x => x.k));
  if (keys.includes('feature')) open.add('feature');
  return keys.filter(k => open.has(k));
}
function browseView(run) {
  const keys = browseKeys(run);
  if (keys.length >= Object.keys(run.shop.bins).length) return run;
  const bins = {}; for (const k of keys) bins[k] = run.shop.bins[k];
  return Object.assign({}, run, { shop: Object.assign({}, run.shop, { bins }) });
}
// 一檔貨表（smart 流程）：這一位架上的統計。T＝剋下一位主屬性那軸（＝shopPolicy 的算法：換牌、加星後的牌單＋他帶的王牌、deckMain）
const SHELF_RAR = ['common', 'rare', 'uncommon', 'epic', 'legendary'];
function shelfAxis(run) {
  const id = run.order[run.idx], E = C.enemies[id]; if (!E) return null;
  const g = EN.guestDef(run, C, id, run.pos);
  const deck = g.deck.slice(); if (g.ace) deck.push(g.ace);
  return EN.COUNTER_OF[EN.deckMain(deck, E.taste)];
}
// 想要清單：這一檔這張想要的卡合不合規（在這一檔的來源、稀有度對、不是特價、不在包包、不是王牌）＝engine drawLot 擲得到的
const SRC_SET = new WeakMap();
const srcSet = arr => { let s = SRC_SET.get(arr); if (!s) { s = new Set(arr); SRC_SET.set(arr, s); } return s; };
const BARGAIN_ALL = new Set([].concat((C.bargain || {}).pool || [], (C.bargain || {}).retired || []));
function wantEligible(run, lot, id) {
  const c = C.cards[id]; if (!c || !c.bin || c.tier) return false;
  const b = C.bins[c.bin]; if (!b || b.display) return false;
  const arr = lot.src === 'cur' || (lot.fb || []).includes(c.bin) ? (b.pool || []) : (b.all || []);
  if (!srcSet(arr).has(id)) return false;
  if (!(c.bin === 'feature' ? EN.FEATURE_RARITY : EN.SHELF_RARITY).includes(EN.rarity(c))) return false;
  if (BARGAIN_ALL.has(id) || run.bag.includes(id) || id === (C.aces || {})[run.ace] || id === run.aceId) return false;
  return true;
}

// ---------------- one whole run through the real run API ----------------
//   A＝這一格的每一位累計（到過、死、場次、勝、首戰、手數、打到第 6 手、比聲望條、KO）
function runOnce(pol, flow, i, A) {
  const seedKey = 'sim5-' + i;
  const o0 = Object.assign({ seedKey, runNo: 1, ace: ACE_T || TIERS[i % 3], prologue: flow !== 'bare', tier: TIER }, APEX_ACE ? { ace: C.cards[APEX_ACE].tier, aceId: APEX_ACE } : {});
  if (UNLOCK) Object.assign(o0, { unlocked: [], start: o0.ace }, APEX ? { apexOwned: APEX_ACE ? [APEX_ACE] : [] } : {});   // --unlock：新玩家（只解鎖這一派）
  if (WANT_N) o0.want = wantFor(i);
  if (SEEDS) { o0.prologue = false; o0.seeds = seedsFor(i); }           // 種子只在不打序章的那一趟有效
  if (TALENT) o0.talent = Object.assign({}, TALENT);                   // 第 D 波：樂歷主幹固定檔位
  if (LADDER) Object.assign(o0, LADDER);                                //          階梯（seedMax／relicPick／goldAdd）
  if (SAFETY) o0.safety = true;                                         // 第 C 波：新手保底（只印對照）
  if (FAC) o0.fac = true;                                               // 第 D 波棒二：三流派（?fac=1）
  if (LUX && SAFETY) o0.firstRun = true;                                // 第 I 波 I-2：新帳號第一趟（--safety）上場制第 11 位起
  if (LU_FROM != null) o0.lineupFrom = LU_FROM;
  if (BENCH != null) o0.lineupBonus = BENCH;
  if (FACTAL_FOR) o0.facTal = FACTAL_FOR(o0.ace);                       // 第 D 波棒三：派樹
  if (FROM) { o0.from = FROM; o0.prologue = false; o0.relics = FROM_RELICS.slice(); }   // 中繼點開局（快速選秀）
  if (RET_RELICS) { o0.prologue = false; o0.relics = RET_RELICS.slice(); }   // 老玩家：不打序章、帶 3 件配件
  const run = EN.newRun(C, o0);
  const RM = [], CW = A.cw || null; let rmSeen = 0;                       // 第 C 波：每輪開頭（攤位之前）的錢；踢館帖那輪首戰
  const LS = A.lt || null, WS = A.wt || null, wantSet = WS ? new Set(run.want) : null;
  let lotRef = null, lotRec = null, shelfPos = 0;
  const closeLot = () => { if (LS && lotRec) { LS.rounds.push({ no: lotRec.no, seen: lotRec.seen.size, seenF: lotRec.seenF.size, guests: lotRec.guests }); } lotRec = null; };
  const R = EN.makeRng(EN.fnv1a32(seedKey + '|' + pol + '|' + flow)), mem = {};
  let manTries = 0, lostMan = false, cens = false, lastReached = 0, retryAt = 0, firstLoss = null, fatal = null, bag0 = null, maxHands = 0, bagMaxN = 0;
  const RADIO = { spins: 0, bought: 0, spent: 0 };
  const SPX = A.sp ? { R: EN.makeRng(EN.fnv1a32(seedKey + '|' + pol + '|' + flow + '|spar')), mem: {}, owned: new Set(), took: [], byRound: {} } : null;   // 切磋：另一條策略亂數（不吃主線的 R）、這一趟收進唱片櫃的
  if (SPX) SPX.ownedFn = id => SPX.owned.has(id);
  const TR = TRACE_OUT ? (TRACE_OUT[flow + '|' + pol + '|' + i] = []) : null;   // --trace（LS0(c)）
  const EP = A.ep;                                                      // 客人出牌三色、提示三色、出主屬性那色的手、放水、交還老闆（第 A 波）
  const LU = A.lu ? { snap: null, add: false, newOn: false, b30: false, prev: null } : null;   // 第 I 波 I-2：W1（第 16 位時的包包、之後到第 30 位收了沒）、上一輪的上場
  for (let guard = 0; ; guard++) {
    if (guard > 40 * CAP + 400) throw new Error('runaway run ' + seedKey + ' ' + pol + ' ' + flow);
    if (run.over) break;
    if (CW && run.pos > 1 && (run.pos - 1) % 5 === 0 && rmSeen < run.pos && !run.duel) { rmSeen = run.pos; RM.push({ pos: run.pos, m: run.money }); }   // 每輪開頭（攤位之前）的錢
    if (!run.pending && !run.duel && run.pos > CAP) { cens = true; break; }
    if (LU) luTrack(run, A.lu, LU);
    if (EN.canBargainPick(run) && !run.pending) {
      const ch = EN.bargainPolicy(run, C); ok(EN.choose(run, C, ch), 'bargainPick', ch);
      if (flow === 'bare') { const drop = C.enemies[MAN].drop; if (drop && !run.bag.includes(drop)) run.bag.push(drop); }   // bare：包包＝禮物 4＋特價 3＋男子那張
      continue;
    }
    const step = EN.nextStep(run);
    if (step === 'stall' || step === 'draft') {                         // 第 C 波：今天的攤位、中繼點開局選秀（bare 不逛攤位）
      const ch = step === 'stall' && flow === 'bare' && run.pending.pick == null ? { type: 'stallLeave' } : EN.cPolicy(run, C, COPT);   // bare 先不逛（剩下錄音室照帶過）
      ok(EN.choose(run, C, ch), 'cPolicy ' + step, ch);
      continue;
    }
    if (step === 'reward') {
      let ch = flow === 'bare' ? { type: 'skip' } : (flow === 'smart' || flow === 'none') ? EN.cPolicy(run, C, COPT) : EN.runPolicy(run, C);
      const p = run.pending;
      if (flow === 'cards' && ch.type === 'relic') ch = !p.cardDone && p.cards.length ? EN.runPolicy(run, C, { preferRelic: false }) : { type: 'skip' };
      if (flow === 'cards' && ch.type === 'relic') ch = { type: 'skip' };
      if (flow === 'relics' && ch.type === 'take') ch = p.need === 'cardOrRelic' && !p.relicDone ? (EN.runPolicy(run, C, { preferRelic: true })) : { type: 'skip' };
      if (flow === 'relics' && ch.type === 'take') ch = { type: 'skip' };
      ok(EN.choose(run, C, ch), 'runPolicy', ch); continue;
    }
    if (step === 'level' || step === 'retry') {
      if (step === 'retry' && run.pending.free && manTries >= 30) { lostMan = true; break; }
      const ch = EN.runPolicy(run, C); ok(EN.choose(run, C, ch), 'runPolicy', ch); continue;
    }
    if (step !== 'fight' && step !== 'prologue') throw new Error('unexpected step ' + step);
    if ((LS || WS) && step === 'fight' && run.shop && run.shop.lot) {     // 一檔貨表／想要清單表（smart、lot 開）：每一位第一次走到時記架子（說情重打不重記）
      const lot = run.shop.lot;
      if (lot !== lotRef) {                                             // 新的一檔（newRun、每輪開頭 restock）
        closeLot(); lotRef = lot;
        lotRec = { no: lot.no, seen: new Set(), seenF: new Set(), guests: 0 };
        if (WS) {
          const first = lot.no === 1, k = first ? 'l1' : 'l2', got = new Set(lot.want || []);
          WS[k].lots++; WS[k].in += got.size;
          for (const id of run.want) { if (wantEligible(run, lot, id)) { WS[k].elig++; if (got.has(id)) WS[k].inElig++; } }
        }
      }
      if (shelfPos !== run.pos) {
        shelfPos = run.pos; lotRec.guests++;
        const bins = run.shop.bins, T = LS ? shelfAxis(run) : null, open = LS && BROWSE < 16 ? new Set(browseKeys(run)) : null;
        let n = 0, good = 0, goodOpen = 0, wn = 0;
        for (const key of Object.keys(bins)) for (const id of bins[key]) {
          n++; lotRec.seen.add(id); if (key === 'feature') lotRec.seenF.add(id);
          if (wantSet && wantSet.has(id)) wn++;
          if (!LS) continue;
          const c = C.cards[id], r = EN.rarity(c);
          if (r in LS.rar) LS.rar[r]++;
          if (T && EN.star(c, T) >= 4) { good++; if (open && open.has(key)) goodOpen++; }
        }
        if (LS) { LS.shelf.push(n); LS.good.push(good); if (lot.no === 1) LS.good1.push(good); if (open) LS.goodOpen.push(goodOpen);
          if (run.pos === 10 || run.pos === 20) LS['bag' + run.pos].push(EN.bagScore(C, run.bag)); }   // 包包強度（bagScore；走到第 10／20 位、買之前）
        if (WS) WS.onShelf += wn;
      }
    }
    if (LU && step === 'fight') luPrep(run, A.lu, LU);                  // 第 I 波 I-2：lineupDue（沒攤位、中繼點）先挑上場（切磋也用這一輪上場那幾張）
    if (SPX && step === 'fight' && flow !== 'bare') sparStep(run, pol, A.sp, SPX);   // 切磋（--enc on）：主線客人推門之前；bare＝V3 對照不打
    if (flow === 'smart' && EN.canShop(run)) for (const ch of EN.shopPolicy(BROWSE < 16 ? browseView(run) : run, C, 'smart', NO_THIN ? { thin: false } : undefined)) {
      const r = EN.choose(run, C, ch); ok(r, 'shopPolicy', ch);
      for (const e of r.effects) if (e.reclaim) EP.reclaim[e.reclaim]++;
      if (ch.type === 'buy') { if (LS) { LS.buy++; if (ch.key === 'feature') LS.buyF++; } if (WS && wantSet.has(ch.cardId)) WS.bought++; }
    }
    if (flow === 'smart' && EN.canShop(run)) radioSmart(run, RADIO);
    if (LU && step === 'fight') luPrep(run, A.lu, LU);                  // 第 I 波 I-2：新拿到的換上場、替補照這一位主屬性換
    if (run.money < 0) throw new Error('money < 0');
    const prologue = step === 'prologue', d = run.pos, att = retryAt === d ? 1 : 0;
    if (!prologue && bag0 == null) bag0 = bagPower(run);
    if (run.bag.length > bagMaxN) bagMaxN = run.bag.length;
    if (!prologue && lastReached < d) { A.reached[d]++; lastReached = d; }
    if (LU && !prologue) luHit(run, A.lu, d);
    const wear0 = LU && run.stats.wear ? Object.assign({}, run.stats.wear) : null;
    const f = EN.startFight(run, C, APEX ? { apex: true } : {});
    if (TR && f) TR.push(['f', d, f.duel.e.hkey >>> 0]);
    if (!f) throw new Error('startFight null at ' + d);
    const duel = play(f.duel, pol, R, mem), hands = duel.stats.hands, by = duel.over.by;
    if (!prologue) {
      const mn = duel.e.main;
      for (const l of duel.log) { EP.play[l.eAttr]++; EP.hint[l.hint]++; EP.hands++; if (mn) { EP.mHands++; if (l.eAttr === mn) EP.mPlay++; if (l.hint === mn) EP.mHint++; } }
      // 每手拆解（11-17；DESIGN §1.1 那張表，算法照 proto/perhand.mjs）：第 1–2／3–4／5／6–9／10 位
      const PH = A.ph[phSeg(d)];
      if (PH) for (const l of duel.log) {
        PH.n++; PH.net += l.toE - l.toP;
        if (l.kind === 'counter') PH.counter++; else if (l.kind === 'countered') PH.countered++;
        if (l.blocked) PH.blocked++;
        if (l.why === 'read' || l.why === 'readHonest') PH.read++;
        if (l.hk === 'half') PH.half++; else if (l.hk === 'none') PH.none++;
      }
      EP.mercyN += duel._mN | 0; EP.mercyOn += duel._mOn | 0;
      if (A.sp) for (const l of duel.log) if (l.why === 'read' || l.why === 'readHonest') A.sp.mr[d]++;   // 切磋 LS5：主線同位數被讀次數
      if (A.en && duel.p.enc) encRec(A.en, duel, run);                  // 第 I 波翻面（客人場；說情重打也算一場）
    }
    const dareNow = !prologue && !!(run.dare && run.dare.round === run.round);
    const res = EN.finishFight(run, C);
    if (LU && !prologue && d >= 16 && d <= 30 && run.stats.wear) { const w1 = run.stats.wear; A.lu.p1630 += (w1.plays | 0) - ((wear0 && wear0.plays) | 0); A.lu.w1630 += (w1.wornPlays | 0) - ((wear0 && wear0.wornPlays) | 0); }
    if (TR && res.offer && Array.isArray(res.offer.relics) && res.offer.relics.length) TR.push(['r', d, res.offer.relics.join(',')]);
    if (prologue) { manTries++; continue; }
    if (CW && att === 0 && d >= 31) { const k = dareNow ? 'dare' : 'plain'; CW[k].f++; if (res.win) CW[k].w++; }   // K2：接帖那輪首戰 vs 平常（踢館帖第 30 位後才出）
    maxHands = Math.max(maxHands, hands);
    A.att[d]++; A.hands[d] += hands; if (hands >= CFG.maxRounds) A.r6[d]++;
    if (by === 'rounds') A.bar[d]++; else if (by === 'hp') A.ko[d]++;
    if (res.win) A.win[d]++;
    if (att === 0) { A.att1[d]++; if (res.win) A.win1[d]++; }
    if (A.fx) { A.fx.fights++; A.fx.hands += hands; const SF = duel.stats.fac || {}; for (const k of Object.keys(SF)) A.fx.k[k] = (A.fx.k[k] || 0) + SF[k]; if (res.deep) A.fx.k.deep = (A.fx.k.deep || 0) + res.deep; }   // 第 D 波棒二：每場派別觸發（客人場，說情重打也算）；棒三：深耕多回的聲望
    if (A.ax) {                                                         // 頂點卡發動統計（--apex）
      const X = A.ax, h = duel._apexHand, hits = duel.stats.apexHits | 0;
      X.fights++; X.hits += hits; if ((duel._apexN | 0) >= 2) X.again++;   // 第 I 波：翻面再發動（同一場第二次）
      if (h) {
        X.used++; X.nSum += h.n; X.nHist[Math.min(6, h.n)]++; X.dSum += h.d; X.healSum += h.heal; if (h.hit) X.hitHand++;
        if (h.toE > h.toP) X.hw++; else if (h.toE < h.toP) X.hl++; else X.ht++;
        X.netSum += h.toE - h.toP; if (h.reveal) X.rev[h.reveal]++;
        X.fUsed++; if (res.win) X.wUsed++;
      } else { X.fUnused++; if (res.win) X.wUnused++; }
    }
    if (!res.win) {
      if (firstLoss == null) firstLoss = d;
      if (run.pending && run.pending.type === 'retry') retryAt = d;
      else { A.deaths[d]++; fatal = { by, cls: res.cls, hands }; }
    }
  }
  closeLot();
  if (LU) luEnd(run, A.lu, LU);
  if (LS) LS.runs++;
  if (WS) WS.runs++;
  const end = lostMan ? 0 : cens ? CAP : run.pos;
  if (firstLoss == null) firstLoss = cens ? CAP + 1 : end;
  const S = run.stats, sum = EN.runSummary(run);
  if (A.fx && run.fac) { A.fx.runs++; for (const id of Object.keys(run.fac.picks || {})) A.fx.picks[id] = (A.fx.picks[id] || 0) + 1; }   // 每趟拿到哪些本派選項
  const dx = D1EX ? (() => { const g = EN.careerGain(C, sum, {}), L = sum.lexp || {}; return { lxBase: g.base, lxRoute: g.route, lxRaw: g.route + g.cut, lxGig: L.gig | 0 }; })() : {};   // 第 D 波：這一趟樂歷（沒破紀錄、沒倍率）
  return { ...dx, end, cens, lostMan, firstLoss, fatal, maxHands, level: run.level, atk: run.atk, def: run.def, maxHp: run.maxHp, relics: run.relics.length,
    taken: sum.taken, rewardCards: S.taken.length, bought: S.bought.length, relicsBought: S.relicsBought.length, relicsGot: S.relicsGot.length,
    earned: S.earned, spent: S.spent, money: run.money, checkpoints: sum.checkpoints.length, bestStreak: sum.bestStreak,
    bag0: bag0 == null ? bagPower(run) : bag0, bag1: bagPower(run), radioSpins: RADIO.spins, radioBought: RADIO.bought, radioSpent: RADIO.spent,
    bagN: run.bag.length, bagMaxN: Math.max(bagMaxN, run.bag.length), sold: S.sold.length,
    ...(SPX ? { sparTook: SPX.took, sparCash: (S.spar && S.spar.cash) | 0 } : {}),
    ...(CW ? { wc: S.c || {}, lexp: sum.lexp || {}, rm: RM, road: (run.road || []).length, drops: (run.drops || []).length, from: sum.from || 1 } : {}),
    ...(UNLOCK ? { aces: (run.acesWon || []).length, unlocks: (run.acesWon || []).filter(id => !(run.unlock.tiers || []).includes(EN.tierOfApex(C, id))).length,
    trialAces: (run.acesWon || []).filter(id => !Object.values(C.aces).includes(id)).length } : {}) };
}

// 每手拆解的位數段（11-17）
const PH_SEGS = ['1–2', '3–4', '5', '6–9', '10'];
const phSeg = d => d <= 2 ? '1–2' : d <= 4 ? '3–4' : d === 5 ? '5' : d <= 9 ? '6–9' : d === 10 ? '10' : null;
// ---------------- one cell (policy × flow) ----------------
const q = (arr, p) => { const a = arr.slice().sort((x, y) => x - y); return a[Math.min(a.length - 1, Math.max(0, Math.ceil(p * a.length) - 1))]; };
const BANDS = [[1, 3], [4, 5], [6, 10], [11, 20], [21, 50], [51, 100], [101, 1e9]];
const HBANDS = [[1, 3], [4, 6], [8, 12], [18, 22], [48, 52]];
const REACH = [5, 10, 20, 50, 100];
function runCell(pol, flow, n) {
  const NP = CAP + 2, z = () => new Float64Array(NP);
  const A = { reached: z(), deaths: z(), att: z(), win: z(), att1: z(), win1: z(), hands: z(), r6: z(), bar: z(), ko: z(),
    ep: { play: { c: 0, o: 0, h: 0 }, hint: { c: 0, o: 0, h: 0 }, hands: 0, mHands: 0, mPlay: 0, mHint: 0, mercyN: 0, mercyOn: 0, reclaim: { gift: 0, seed: 0 } },
    ph: Object.fromEntries(PH_SEGS.map(k => [k, { n: 0, counter: 0, countered: 0, blocked: 0, read: 0, half: 0, none: 0, net: 0 }])) };
  if (APEX) A.ax = { fights: 0, used: 0, nSum: 0, nHist: [0, 0, 0, 0, 0, 0, 0], dSum: 0, healSum: 0, hitHand: 0, hw: 0, hl: 0, ht: 0, netSum: 0, rev: { honest: 0, bluff: 0 },
    hits: 0, fUsed: 0, wUsed: 0, fUnused: 0, wUnused: 0, again: 0 };
  if (LOT_ON && flow === 'smart') {                                      // 一檔貨表（第 B 波；lot 關＝不記、JSON 不多欄位）
    A.lt = { runs: 0, rounds: [], shelf: [], good: [], good1: [], goodOpen: [], bag10: [], bag20: [], buy: 0, buyF: 0, rar: Object.fromEntries(SHELF_RAR.map(r => [r, 0])) };
    if (WANT_N) A.wt = { runs: 0, l1: { lots: 0, in: 0, elig: 0, inElig: 0 }, l2: { lots: 0, in: 0, elig: 0, inElig: 0 }, onShelf: 0, bought: 0 };
  }
  if (WC_ON) A.cw = { dare: { f: 0, w: 0 }, plain: { f: 0, w: 0 } };   // 第 C 波（全關不記、JSON 不多欄位）
  if (FAC) A.fx = { runs: 0, fights: 0, hands: 0, k: {}, picks: {} };   // 第 D 波棒二（--fac 才記）
  if (ENC_ON) A.en = encZero();                                          // 第 I 波翻面（--encore off 不記、JSON 不多欄位）
  if (SPAR_ON) A.sp = sparZero(NP);                                      // 活店切磋（--enc on 才記、JSON 才多 spar）
  if (LUX) A.lu = luZero();                                              // 第 I 波 I-2 上場＋耐聽（關著不記、JSON 不多欄位）
  const recs = [];
  for (let i = 0; i < n; i++) recs.push(runOnce(pol, flow, I0 + i, A));
  const ends = recs.map(r => r.end), fl = recs.map(r => Math.min(r.firstLoss, CAP));
  const share = (arr, p) => (arr.length ? arr.filter(p).length / arr.length : null);
  const avg = k => recs.reduce((s, r) => s + r[k], 0) / n;
  const sum = (key, a, b) => { let s = 0; for (let d = a; d <= Math.min(b, CAP); d++) s += A[key][d]; return s; };
  const tot = k => sum(k, 1, CAP);
  const dead = recs.filter(r => r.fatal);
  const pos = [];
  for (let d = 1; d <= Math.min(POSMAX, CAP); d++) if (A.att[d]) pos.push({ d, cls: EN.classAt(d), reached: A.reached[d], win1: A.att1[d] ? A.win1[d] / A.att1[d] : null,
    win: A.win[d] / A.att[d], hazard: A.deaths[d] / A.reached[d], hands: A.hands[d] / A.att[d] });
  let cliff = { drop: 0, at: null, from: null }, prev = null;
  for (const p of pos) { if (p.cls === 'boss' || p.reached < 200) continue; if (prev && prev.win1 - p.win1 > cliff.drop) cliff = { drop: prev.win1 - p.win1, from: prev.d, at: p.d, w0: prev.win1, w1: p.win1 }; prev = p; }
  let hzMax = { h: 0, at: null }; for (const p of pos) if (p.cls !== 'boss' && p.reached >= 200 && p.hazard > hzMax.h) hzMax = { h: p.hazard, at: p.d };
  // T3：第 4–60 位、到過 ≥200 趟的位置，藏家位合併死亡率 ÷ 非藏家位合併死亡率（第 1–3 位是前期，看 T1／T1b，不算進來）
  let hb = 0, hbn = 0, hn = 0, hnn = 0;
  for (const p of pos) { if (p.d < 4 || p.reached < 200) continue; if (p.cls === 'boss') { hb += A.deaths[p.d]; hbn += p.reached; } else { hn += A.deaths[p.d]; hnn += p.reached; } }
  const hazBoss = hbn ? hb / hbn : null, hazNon = hnn ? hn / hnn : null;
  const handsBand = HBANDS.map(([a, b]) => { const at = sum('att', a, b); return at >= 100 ? sum('hands', a, b) / at : null; });
  const X = A.ax, apexStats = X ? { fights: X.fights, used: X.used, useRate: X.fights ? X.used / X.fights : null, perRun: X.used / n, n: X.used ? X.nSum / X.used : null,
    nHist: X.nHist.slice(1), handWin: X.used ? X.hw / X.used : null, handLose: X.used ? X.hl / X.used : null, handTie: X.used ? X.ht / X.used : null,
    net: X.used ? X.netSum / X.used : null, d: X.used ? X.dSum / X.used : null, heal: X.used ? X.healSum / X.used : null, hitHand: X.used ? X.hitHand / X.used : null,
    hitsPerFight: X.fights ? X.hits / X.fights : null, rev: X.rev, winUsed: X.fUsed ? X.wUsed / X.fUsed : null, winUnused: X.fUnused ? X.wUnused / X.fUnused : null, ...(ENC_ON ? { again: X.fights ? X.again / X.fights : null } : {}) } : null;
  return {
    pol, flow, n, cap: CAP,
    median: q(ends, 0.5), mean: avg('end'), p25: q(ends, 0.25), p75: q(ends, 0.75), p90: q(ends, 0.9), censored: share(recs, r => r.cens), lostMan: share(recs, r => r.lostMan),
    noRetry: { median: q(fl, 0.5), mean: fl.reduce((s, x) => s + x, 0) / n },
    reach: REACH.map(d => share(recs, r => r.end >= d)), reach3: share(recs, r => r.end >= 3),
    ...(D1EX ? { reach21: share(recs, r => r.end >= 21), lexp: { base: avg('lxBase'), route: avg('lxRoute'), raw: avg('lxRaw'), gig: avg('lxGig') } } : {}),
    die13: share(recs, r => !r.cens && r.end <= 3),
    deathBands: BANDS.map(([a, b]) => share(dead, r => r.end >= a && r.end <= b)),
    fights: tot('att'), hands: tot('hands') / Math.max(1, tot('att')), r6: tot('r6') / Math.max(1, tot('att')), barShare: tot('bar') / Math.max(1, tot('att')),
    koShare: tot('ko') / Math.max(1, tot('att')), win: tot('win') / Math.max(1, tot('att')), maxHands: Math.max(0, ...recs.map(r => r.maxHands)), handsBand,
    deaths: { n: dead.length, byBar: share(dead, r => r.fatal.by === 'rounds'), byKO: share(dead, r => r.fatal.by === 'hp'), atBoss: share(dead, r => r.fatal.cls === 'boss') },
    hazBoss, hazNon, bossRatio: hazBoss != null && hazNon ? hazBoss / hazNon : null, cliff, hzMax,
    end: { level: avg('level'), atk: avg('atk'), def: avg('def'), maxHp: avg('maxHp'), relics: avg('relics'), taken: avg('taken'), rewardCards: avg('rewardCards'),
      bought: avg('bought'), relicsBought: avg('relicsBought'), relicsGot: avg('relicsGot'), earned: avg('earned'), spent: avg('spent'), money: avg('money'),
      checkpoints: avg('checkpoints'), bestStreak: avg('bestStreak'), bag0: avg('bag0'), bag1: avg('bag1'),
      radioSpins: avg('radioSpins'), radioBought: avg('radioBought'), radioSpent: avg('radioSpent'),
      ...(EN.bagLimited() ? {} : { bagN: avg('bagN'), bagMaxN: avg('bagMaxN'), bagMaxMax: Math.max(...recs.map(r => r.bagMaxN)), sold: avg('sold') }) },   // 包包不限才有（--set bagMax=8 時 JSON 跟改版前一樣）
    pos: pos.map(p => ({ d: p.d, cls: p.cls, reached: p.reached, win1: r3(p.win1), hazard: r3(p.hazard), hands: r3(p.hands) })),
    ...(apexStats ? { apex: apexStats } : {}),
    ...(A.en ? { enc: encStats(A.en, n) } : {}),
    ...(A.sp ? { spar: sparStatsOf(A.sp, A, recs, n) } : {}),
    ...(A.lu ? { lineup: luStats(A.lu, n) } : {}),
    ...(A.fx ? { fac: { fights: A.fx.fights, hands: A.fx.hands / Math.max(1, A.fx.fights), perFight: Object.fromEntries(FAC_KEYS.filter(k => A.fx.k[k]).map(k => [k, A.fx.k[k] / Math.max(1, A.fx.fights)])),
      picks: Object.fromEntries(Object.entries(A.fx.picks).map(([k, v]) => [k, v / n])) } } : {}),
    ...(A.lt ? { lot: lotStats(A.lt, n) } : {}),
    ...(A.wt ? { want: wantStats(A.wt, n) } : {}),
    ...(A.cw ? { wcx: wcStatsOf(recs, A.cw, n) } : {}),
    ...(A.cw && MK_ON ? { mk: mkStatsOf(recs, n) } : {}),
    ...(FROM ? { cp: { from: FROM, reach10: share(recs, r => r.end >= FROM + 10), reach5: share(recs, r => r.end >= FROM + 5), first: A.reached[FROM] ? A.deaths[FROM] / A.reached[FROM] : null,
      median: q(ends, 0.5), p25: q(ends, 0.25), p75: q(ends, 0.75), mean: avg('end') } } : {}),
    ...(UNLOCK ? { unlock: { aces: avg('aces'), unlocks: avg('unlocks'), trialAces: avg('trialAces'),          // --unlock：每趟收幾張、解鎖幾派、收到第 k 張的趟（%）
      atLeast: [1, 2, 3, 4].map(k => share(recs, r => r.aces >= k)), unlock2: share(recs, r => r.unlocks >= 1), unlock3: share(recs, r => r.unlocks >= 2) } } : {}),
    perHand: Object.fromEntries(PH_SEGS.map(k => { const H = A.ph[k], f = x => (H.n ? x / H.n : null); return [k, { n: H.n, counter: f(H.counter), countered: f(H.countered),
      mirror: H.n ? (H.n - H.counter - H.countered) / H.n : null, blocked: f(H.blocked), read: f(H.read), half: f(H.half), none: f(H.none), net: f(H.net) }]; })),
    eplay: { play: shareOf(A.ep.play), hint: shareOf(A.ep.hint), hands: A.ep.hands, mainPlay: A.ep.mHands ? A.ep.mPlay / A.ep.mHands : null, mainHint: A.ep.mHands ? A.ep.mHint / A.ep.mHands : null,
      mercyOn: A.ep.mercyN ? A.ep.mercyOn / A.ep.mercyN : null, mercyHands: A.ep.mercyN, reclaim: { gift: A.ep.reclaim.gift / n, seed: A.ep.reclaim.seed / n } },
  };
}
const shareOf = o => { const t = o.c + o.o + o.h; return t ? { c: o.c / t, o: o.o / t, h: o.h / t } : null; };
// 第 I 波翻面統計（客人場）：f 場數、lit 這場條件成立（含剛好打完、留到下一位）、cOut 留到下一位、cIn 吃到上一位留下來的、used 真的用到、
//   fired 丟出／發動過（不含留下來的那場：那場不另外等條件）、litF 其中成立、heal 翻面回了幾、litN 成立在第幾手、usedIn 留下來的那場真的用到
const encB = () => ({ f: 0, lit: 0, cOut: 0, cIn: 0, used: 0, usedIn: 0, fired: 0, litF: 0, heal: 0, win: 0, winLit: 0, litN: [0, 0, 0, 0, 0, 0, 0] });
const encZero = () => ({ all: encB(), by: {}, tier: {} });
function encRec(E, duel, run) {
  const Q = duel.p.enc, S = duel.stats.enc || {}, key = Q.mode + ':' + Q.when;
  const tier = APEX ? (C.cards[duel.p.ace] && C.cards[duel.p.ace].tier) || run.ace : run.ace;
  const cin = !!S.carryIn, fired = Q.start != null, win = !!(duel.over && duel.over.win);
  for (const B of [E.all, E.by[key] || (E.by[key] = encB()), E.tier[tier] || (E.tier[tier] = encB())]) {
    B.f++; if (S.lit) { B.lit++; B.litN[Math.min(6, Q.lit | 0)]++; if (win) B.winLit++; } if (S.carryOut) B.cOut++; if (win) B.win++;
    if (cin) { B.cIn++; if (S.used) B.usedIn++; }
    if (S.used) B.used++; B.heal += S.heal | 0;
    if (fired && !cin) { B.fired++; if (S.lit) B.litF++; }
  }
}
function encOne(B, n) {
  const r = (a, b) => (b ? a / b : null);
  return { f: B.f, lit: r(B.lit, B.f), now: r(B.lit - B.cOut, B.f), carry: r(B.cOut, B.f), carryIn: r(B.cIn, B.f), used: r(B.used, B.f), usedIn: r(B.usedIn, B.cIn),
    fired: r(B.fired, B.f), litFired: r(B.litF, B.fired), perRun: n ? B.lit / n : null, heal: r(B.heal, B.f), win: r(B.win, B.f), winLit: r(B.winLit, B.lit),
    litN: B.litN.slice(1).map(k => r(k, B.lit)) };
}
function encStats(E, n) {
  const keys = ENC_KEYS.filter(k => E.by[k]).concat(Object.keys(E.by).filter(k => !ENC_KEYS.includes(k)));
  return Object.assign(encOne(E.all, n), { by: Object.fromEntries(keys.map(k => [k, encOne(E.by[k], n)])),
    tier: Object.fromEntries(TIERS.filter(t => E.tier[t]).map(t => [t, encOne(E.tier[t], n)])) });
}
function printEnc(rows) {
  const WZ = { caught: '看穿', combo2: '連剋', sameWin: '同色比贏', lowhp: '背水' }, MZ = { ace: '7 星王牌', apex: '頂點卡' };
  const kz = k => { const [m, w] = k.split(':'); return MZ[m] + '・' + (WZ[w] || w); };
  console.log(`\n翻面（第 I 波 I-1；客人場${ENCPOL ? '；--encpol 會湊條件的上界策略' : ''}；6 星翻面盤 ${EN.encCfg(C).aceStar} 星；成立＝這場條件成立，含剛好打完、留到下一位；用到＝再丟／再發動／吃到下一手加成／回聲望）：\n`);
  console.log('| 策略 | 流程 | 場數 | 成立／場（當場＋留到下一位） | 每趟成立 | 吃到上一位留的／場（那場用到） | 真的用到／場 | 丟出或發動過的場 | 其中成立（AN3） | 成立在第 1／2／3／4／5／6 手（%） | 場勝率 全部／成立的場 | 翻面回聲望／場 |');
  console.log('|---|---|---|---|---|---|---|---|---|---|---|---|');
  for (const x of rows) { const e = x.enc; if (!e) continue;
    console.log(`| ${LABEL[x.pol] || x.pol} | ${x.flow} | ${e.f} | **${pct(e.lit)}**（${pct(e.now)}＋${pct(e.carry)}） | ${f2(e.perRun)} | ${pct(e.carryIn)}（${pct(e.usedIn)}） | ${pct(e.used)} | ${pct(e.fired)} | **${pct(e.litFired)}** | ${e.litN.map(p0).join('／')} | ${pct(e.win)}／${pct(e.winLit)} | ${f2(e.heal)} |`); }
  const ks = []; for (const x of rows) if (x.enc) for (const k of Object.keys(x.enc.by)) if (!ks.includes(k)) ks.push(k);
  console.log('\n逐條件（成立／場；丟出或發動過的場裡成立）與逐派（成立／場、留到下一位／場、用到／場）：\n');
  console.log('| 策略 | 流程 | ' + ks.map(kz).join(' | ') + ' | ' + TIERS.map(t => (C.aceTitle && C.aceTitle[t]) || t).join(' | ') + ' |');
  console.log('|---|---|' + ks.map(() => '---').join('|') + '|' + TIERS.map(() => '---').join('|') + '|');
  for (const x of rows) { const e = x.enc; if (!e) continue;
    console.log(`| ${LABEL[x.pol] || x.pol} | ${x.flow} | ` + ks.map(k => { const b = e.by[k]; return b ? `${pct(b.lit)}；${pct(b.litFired)}（${b.f} 場）` : '—'; }).join(' | ') + ' | '
      + TIERS.map(t => { const b = e.tier[t]; return b ? `${pct(b.lit)}／${pct(b.carry)}／${pct(b.used)}` : '—'; }).join(' | ') + ' |'); }
}
// ---------------- 第 I 波 I-2：上場＋耐聽（--lineup／--wear；SPEC-I §3.8 W1–W5、§5.7 L1–L2；engine lineup 段） ----------------
//   W1＝第一次走到第 16–30 位時的包包，到第 30 位前收了包包以外的唱片（＝補量原型 wimeasure2 的定義）；w1on＝第 30 位前上場裡有那之後新拿到的
//   W3＝第 16–30 位主線對決、記耐聽的那幾場（說情重打不記），打出去的唱片裡開打時已經聽膩的（engine run.stats.wear 的差）
const luZero = () => ({ runs: 0, w1n: 0, w1a: 0, w1on: 0, p1630: 0, w1630: 0, plays: 0, worn: 0, layers: 0, rest: 0, picks: 0, steps: 0, quiet: 0, changed: 0, chN: 0,
  star: 0, pow: 0, starN: 0, fights: 0, hit: 0, hitBag: 0, bench: 0, swaps: 0, fills: 0, bag15: [], bag30: [], sleeve: 0 });
function luTrack(run, L, X) {
  if (!X.snap && run.pos >= 16 && run.pos <= 30) { X.snap = new Set(run.bag); L.bag15.push(run.bag.length); }
  if (X.snap && run.pos <= 30 && !X.add && run.bag.some(id => !X.snap.has(id))) X.add = true;
  if (X.snap && run.pos <= 30 && !X.newOn && Array.isArray(run.lineup) && run.lineup.some(id => !X.snap.has(id))) X.newOn = true;
  if (!X.b30 && run.pos >= 31) { X.b30 = true; L.bag30.push(run.bag.length); }
}
function luRecLineup(run, L, X) {                                        // 一輪的上場挑好了：跟上一輪比換了幾張、平均星
  const ids = Array.isArray(run.lineup) ? run.lineup : [];
  if (X.prev) { L.chN++; L.changed += ids.filter(id => !X.prev.includes(id)).length; }
  X.prev = ids.slice();
  for (const id of ids) { const c = C.cards[id]; if (c) { L.star += EN.peak(c); L.pow += EN.power(c); L.starN++; } }
}
function luPick(run, L, X, quiet) { L.picks++; L.steps++; if (quiet) L.quiet++; luRecLineup(run, L, X); }
function luPrep(run, L, X) {
  const wasNull = !Array.isArray(run.lineup), quiet = wasNull && run.lineupDue === true && EN.lineupQuiet(run, C);   // 修正棒 11-22：上場一律走 lineupDue（攤位收攤之後）＝這裡記每輪挑幾次、前期省一下幾次
  for (const ch of EN.lineupPrep(run, C)) {
    ok(EN.choose(run, C, ch), 'lineupPrep', ch);
    if (ch.type === 'lineup') { if (wasNull) luPick(run, L, X, quiet); else L.fills++; }
    else if (ch.type === 'lineupSwap') L.swaps++;
    else if (ch.type === 'benchSwap') L.bench++;
  }
}
function luHit(run, L, d) {                                              // 上場制那幾輪：剋這一位主屬性那軸最高幾星，上場那幾張 vs 整個包包（對照）
  if (!EN.luRound(run)) return;
  const m = EN.mainAt(run, C, d); if (!m) return;
  const T = EN.COUNTER_OF[m], best = ids => ids.reduce((s, id) => Math.max(s, EN.star(C.cards[id], T)), 0);
  L.fights++; L.hit += best(EN.lineupOf(run, C)); L.hitBag += best(run.bag);
}
function luEnd(run, L, X) {
  L.runs++; if (X.snap) { L.w1n++; if (X.add) L.w1a++; if (X.newOn) L.w1on++; }
  const W = run.stats.wear || {}; L.layers += W.layers | 0; L.rest += W.rest | 0; L.plays += W.plays | 0; L.worn += W.wornPlays | 0;
  if ((run.relics || []).includes(EN.luCfg(C).slotRelic)) L.sleeve++;
  L.bench += run.stats.benchAuto | 0;                                    // 備案 'worn'：開打時替補自動頂上的次數（手動 'swap' 的在 luPrep 記）
}
function luStats(L, n) {
  const r = (a, b) => (b ? a / b : null), mean = a => (a.length ? a.reduce((s, x) => s + x, 0) / a.length : null);
  return { w1: r(L.w1a, L.w1n), w1on: r(L.w1on, L.w1n), w1n: L.w1n, worn1630: r(L.w1630, L.p1630), plays1630: L.p1630, wornAll: r(L.worn, L.plays), layers: L.layers / n, rest: L.rest / n,
    picks: L.picks / n, changed: r(L.changed, L.chN), star: r(L.star, L.starN), pow: r(L.pow, L.starN), hit: r(L.hit, L.fights), hitBag: r(L.hitBag, L.fights), fights: L.fights,
    bench: L.bench / n, swaps: L.swaps / n, fills: L.fills / n, quiet: r(L.quiet, L.steps), bag15: mean(L.bag15), bag30: mean(L.bag30), sleeve: L.sleeve / n };
}
function printLu(rows) {
  console.log(`\n上場（第 I 波 I-2；${LU_ON ? '每輪挑 ' + EN.luCfg(C).n + ' 張' : '上場制關'}；每趟平均）：\n`);
  console.log('| 策略 | 流程 | 挑上場（輪）／面板不出（前期省一下） | 每輪換了幾張 | 上場平均 最高星／總星 | 剋這一位主屬性那軸最高幾星：上場／整個包包 | 新拿到的換上場 | 替補換上場 | 空格補上 | 包包 第 16／31 位 | 有側袋的趟 |');
  console.log('|---|---|---|---|---|---|---|---|---|---|---|');
  for (const x of rows) { const u = x.lineup; if (!u) continue;
    console.log(`| ${LABEL[x.pol] || x.pol} | ${x.flow} | ${f2(u.picks)}／${pct(u.quiet)} | ${f2(u.changed)} | ${f2(u.star)}／${f2(u.pow)} | ${f2(u.hit)}／${f2(u.hitBag)} | ${f2(u.swaps)} | ${f2(u.bench)} | ${f2(u.fills)} | ${f2(u.bag15)}／${f2(u.bag30)} | ${pct(u.sleeve)} |`); }
  console.log(`\n耐聽（第 I 波 I-2；${WR_ON ? EN.wearCfg(C).grooves + ' 格、最多 ' + EN.wearCfg(C).maxLayers + ' 層' : '耐聽關'}；每趟平均；第 16–30 位＝W1／W3 那段）：\n`);
  console.log('| 策略 | 流程 | 第 16–30 位收新唱片（W1）／上場有新的（走過第 15 位的趟） | 第 16–30 位打出去的裡聽膩的（W3）／全程 | 聽膩幾層 | 坐板凳回滿幾次 | 唱片醫生洗（I-3b） |');
  console.log('|---|---|---|---|---|---|---|');
  for (const x of rows) { const u = x.lineup; if (!u) continue;
    console.log(`| ${LABEL[x.pol] || x.pol} | ${x.flow} | **${pct(u.w1)}**／${pct(u.w1on)}（${u.w1n} 趟） | **${pct(u.worn1630)}**／${pct(u.wornAll)} | ${f2(u.layers)} | ${f2(u.rest)} | 0 |`); }
}
function luChecks(G, tag) {
  if (!G) return;
  const TH = G.thoughtful, HR = G.humanRead, NV = G.novice, sg = x => (x >= 0 ? '+' : '') + x, both = LU_ON && WR_ON && !FROM;
  const put = (id, name, okv, info, nMin) => { if (both && N >= nMin && okv != null) check(id, name, okv, info); else refs.push({ id, name, ok: okv, info: info + (both ? (N < nMin ? `；n ${N} < ${nMin} 只列參考（判 ${id} 用 --n ${nMin}）` : '') : '；上場、耐聽沒有一起開（或 --from）只列') + (okv == null ? '' : okv ? '［在門檻內］' : '［不在門檻內］') }); };
  if (TH && TH.lineup) {
    put('W1', `${tag}第 15 位以後還會換：會讀的 第 16–30 位收新唱片 ≥50%（擋開關）`, TH.lineup.w1 != null ? TH.lineup.w1 >= 0.50 - 1e-9 : null, `${pct(TH.lineup.w1)}（${TH.lineup.w1n} 趟；上場有新的 ${pct(TH.lineup.w1on)}）`, 1000);
    put('W3', `${tag}耐聽有感、不是懲罰：會讀的 第 16–30 位打出去的唱片裡聽膩的 5–25%`, TH.lineup.worn1630 != null ? TH.lineup.worn1630 >= 0.05 - 1e-9 && TH.lineup.worn1630 <= 0.25 + 1e-9 : null, `${pct(TH.lineup.worn1630)}（${TH.lineup.plays1630} 次）`, 1000);
    if (TH.wcx) put('W4', `${tag}錢有去處：會讀的花掉 ≥60%（E1 升回門檻；不過寫進 rulings 降回參考）`, TH.wcx.spentShare >= 0.60 - 1e-9, pct(TH.wcx.spentShare), 1000);
  }
  if (HR && HR.lineup) refs.push({ id: 'W1', name: `${tag}一般玩家 第 16–30 位收新唱片`, ok: null, info: `${pct(HR.lineup.w1)}（${HR.lineup.w1n} 趟）` });
  const okBase = (B, nm) => { if (!B) return null; if (B.N !== N || B.CAP !== CAP || (B.TIER | 0) !== TIER || !!B.fac !== FAC || (B.apex || null) !== (report.apex || null) || !!B.safety !== SAFETY) { console.error(nm + ' 要是同 n、同 cap、同 tier／--fac／--apex／--safety 的 --json'); process.exit(2); } return B.runs && B.runs[GATE]; };
  const B = okBase(LUBASE, '--lubase');
  if (LUBASE && LUBASE.lineup) { console.error('--lubase 要是上場、耐聽都關的 --json'); process.exit(2); }
  if (B) {
    const BT = B.thoughtful, BH = B.humanRead, BN = B.novice;
    if (TH && BT) { const d = TH.reach[3] - BT.reach[3]; put('W2', `${tag}不變簡單也不太難：會讀的 到第 50 位 −4 ≤ on − off ≤ +1 點`, d >= -0.04 - 1e-9 && d <= 0.01 + 1e-9, `${pct(TH.reach[3])} 對 關 ${pct(BT.reach[3])}（${sg(pt(d))} 點${d > 0.01 && d <= 0.02 ? '；落在 +1～+2：n 加倍重量一次再判' : ''}）`, 4000); }
    if (HR && BH) { const d = HR.median - BH.median; put('W2', `${tag}一般玩家 深度中位 −3 ≤ on − off ≤ +1 位`, d >= -3 && d <= 1, `${HR.median} 對 關 ${BH.median}（${sg(d)}）`, 4000); }
    if (NV && BN) {
      put('W2', `${tag}新手 第 1–3 位死亡 ≥ 關 −1 點`, NV.die13 >= BN.die13 - 0.01 - 1e-9, `${pct(NV.die13)} 對 關 ${pct(BN.die13)}`, 4000);
      put('W2', `${tag}新手 到第 10 位 ≤ 關 +2 點`, NV.reach[1] <= BN.reach[1] + 0.02 + 1e-9, `${pct(NV.reach[1])} 對 關 ${pct(BN.reach[1])}`, 4000);
      put('L1', `${tag}第 1 輪逐字不變：新手 第 1–3 位死亡差 ≤1 點`, Math.abs(NV.die13 - BN.die13) <= 0.01 + 1e-9, `${pct(NV.die13)} 對 關 ${pct(BN.die13)}`, 4000);
    }
    for (const [x, b] of [[TH, BT], [NV, BN]]) if (x && b) {
      const w = d => { const p = x.pos.find(o => o.d === d), q0 = b.pos.find(o => o.d === d); return p && q0 && p.win1 != null && q0.win1 != null ? p.win1 - q0.win1 : null; };
      const ds = [1, 2, 3, 4, 5].map(w), mx = Math.max(...ds.filter(v => v != null).map(Math.abs));
      put('L1', `${tag}第 1 輪逐字不變：${LABEL[x.pol]} 第 1–5 位首戰勝率差 ≤1 點`, ds.every(v => v != null) ? mx <= 0.01 + 1e-9 : null, ds.map(v => v == null ? '—' : sg(pt(v))).join('／') + ' 點', 4000);
    }
    if (TH && BT && TH.wcx && BT.wcx) {
      const tk = BT.wcx.k.tickets ? TH.wcx.k.tickets / BT.wcx.k.tickets : null, lx = (W => W.lexpBase + W.lexpRoute), lr = lx(BT.wcx) ? lx(TH.wcx) / lx(BT.wcx) : null;
      put('W5', `${tag}門票、樂歷不被拖慢：會讀的 每趟門票 on÷off ≥0.8、樂歷（基本＋路線，每趟平均） on÷off ≥0.95`, tk != null && lr != null ? tk >= 0.8 - 1e-9 && lr >= 0.95 - 1e-9 : null,
        `門票 ${f2(TH.wcx.k.tickets)} 對 ${f2(BT.wcx.k.tickets)}（${tk == null ? '—' : tk.toFixed(2)}）、樂歷 ${Math.round(lx(TH.wcx))} 對 ${Math.round(lx(BT.wcx))}（${lr == null ? '—' : lr.toFixed(3)}）`, 1000);
    }
  } else refs.push({ id: 'W2', name: `${tag}不變簡單也不太難（W2、L1、W5）`, ok: null, info: `會讀的 到第 50 位 ${TH ? pct(TH.reach[3]) : '—'}；沒給 --lubase（同 n、上場與耐聽都關的 --json）只列` });
  const B2 = okBase(L2BASE, '--l2base');
  if (B2 && TH && B2.thoughtful) {
    if (!(L2BASE.lineup && L2BASE.lineup.lineup && !(L2BASE.lineup.bench > 0)) || !(BENCH > 0)) { console.error('--l2base 要是上場制開著、--bench 0（或沒給）的 --json，這份要 --bench ≥1'); process.exit(2); }
    const d = TH.reach[3] - B2.thoughtful.reach[3];
    put('L2', `${tag}替補是好處、不暴衝：會讀的 到第 50 位 0 ≤ on − off ≤ +3 點（≤0＝改備案：聽膩自動頂上）`, d >= -1e-9 && d <= 0.03 + 1e-9, `${pct(TH.reach[3])} 對 沒替補 ${pct(B2.thoughtful.reach[3])}（${sg(pt(d))} 點）`, 4000);
  }
}
// ---------------- 活店第二階段：切磋（--enc on；SPEC-H §7、§13；engine encOffer／encPolicy／encStart／encFinish） ----------------
//   每一位主線客人推門之前（engine encOffer 判：第 6 位起、一般客人位、每輪最多一次、攤位／領獎／說情／接帖那輪不出）照 --enc-policy 走完一整段：
//   開邀請 → 接（或改天）→ 打（主線同一個出牌腦 play，但策略亂數另一條：同一個 i 主線的決策照舊）→ 收／不收。主線欄位 engine 保證不動（engine.test #34）
//   唱片櫃模式的「已擁有」＝這一趟收進唱片櫃的（新帳號；連玩 20 趟另印參考）
const sparZero = NP => ({ offered: 0, accepted: 0, fights: 0, won: 0, lost: 0, took: 0, cashN: 0, cash: 0, hands: 0, reads: 0, hp: new Float64Array(NP), rp: new Float64Array(NP),
  mr: new Float64Array(NP), ff: new Float64Array(NP), fw: new Float64Array(NP), wf: {}, ww: {}, first5: 0, eliteBoss: 0, multi: 0, byIdx: [0, 0, 0, 0, 0], who: {}, by: { hp: 0, rounds: 0, pile: 0 } });
// 分段（審查修正 p2b：強度要跟著位數走）：切磋勝率對同一段主線一般客人首戰勝率（第 6 位起、一般客人位、第一次打）
const SPAR_SEGS = [[6, 10], [11, 15], [16, 20], [21, 30], [31, 45], [46, 1e9]], SPAR_SEG_MIN = 300, SPAR_SEG_LO = -10, SPAR_SEG_HI = 4;   // 判：該段 ≥300 場，切磋 − 主線 在 −10～+4 點（不比主線難很多、也不比主線好打；+4＝n4000 一段約 400 場的抽樣誤差）
const segName = ([a, b]) => b >= 1e9 ? a + '+' : a + '–' + b;
function sparStep(run, pol, SP, X) {
  for (let g = 0; g < 8; g++) {
    const ch = EN.encPolicy(run, C, { policy: SPAR_POL, owned: X.ownedFn });
    if (!ch) return;
    const r = EN.choose(run, C, ch); ok(r, 'encPolicy', ch);
    const S = run.spar;
    if (ch.type === 'encOpen') {
      SP.offered++; SP.byIdx[(S.pos - 1) % 5]++; SP.who[S.who] = (SP.who[S.who] | 0) + 1;
      if (S.pos <= 5) SP.first5++;
      if (EN.classAt(S.pos) !== 'normal') SP.eliteBoss++;
      X.byRound[S.round] = (X.byRound[S.round] | 0) + 1; if (X.byRound[S.round] > 1) SP.multi++;
    } else if (ch.type === 'encAccept') {
      SP.accepted++;
      const s = EN.encStart(run, C, APEX ? { apex: true } : {});
      if (!s) throw new Error('encStart null at ' + run.pos);
      const duel = play(s.duel, pol, X.R, X.mem, s.view), fin = EN.encFinish(run, C, duel, { owned: X.ownedFn });
      if (fin.error) throw new Error('encFinish ' + fin.error);
      const h = duel.stats.hands, rd = duel.log.filter(l => l.why === 'read' || l.why === 'readHonest').length;
      SP.fights++; SP.hands += h; SP.reads += rd; SP.hp[run.pos] += h; SP.rp[run.pos] += rd; SP.by[duel.over.by] = (SP.by[duel.over.by] | 0) + 1;
      if (fin.win) SP.won++; else SP.lost++;
      SP.ff[run.pos]++; if (fin.win) SP.fw[run.pos]++;
      SP.wf[S.who] = (SP.wf[S.who] | 0) + 1; if (fin.win) SP.ww[S.who] = (SP.ww[S.who] | 0) + 1;
    } else if (ch.type === 'encTake') { SP.took++; X.took.push(ch.id); X.owned.add(ch.id); }
    else if (ch.type === 'encSkip') { SP.cashN++; SP.cash += (r.effects.find(e => e.cash) || {}).cash | 0; }
  }
  throw new Error('sparStep runaway at ' + run.pos);
}
const REG_CARDS = new Set(Object.values(C.regulars || {}).flatMap(R => (R && R.enc && R.enc.deck) || []));
function sparStatsOf(SP, A, recs, n) {
  let pos6 = 0, mainH = 0, expRead = 0;
  for (let d = 1; d < A.reached.length; d++) { if (d >= 6) pos6 += A.reached[d]; mainH += A.hands[d]; if (SP.hp[d] && A.hands[d]) expRead += SP.hp[d] * SP.mr[d] / A.hands[d]; }
  const r = (a, b) => (b ? a / b : null), earned = recs.reduce((s, x) => s + x.earned, 0);
  // 連玩 20 趟（只印）：同一格相鄰 20 趟收進唱片櫃的聯集（不同的幾張、其中熟客牌）——唱片櫃模式下一趟「從唱片櫃挑種子」多幾個選擇
  const blocks = []; for (let k = 0; k + 20 <= recs.length; k += 20) { const u = new Set(); for (const x of recs.slice(k, k + 20)) for (const id of x.sparTook || []) u.add(id); blocks.push(u); }
  const mean = a => a.length ? a.reduce((s, x) => s + x, 0) / a.length : null;
  const seg = SPAR_SEGS.map(([a, b]) => { let f = 0, w = 0, mf = 0, mw = 0;
    for (let d = a; d <= Math.min(b, A.att1.length - 1); d++) { f += SP.ff[d]; w += SP.fw[d]; if (EN.classAt(d) === 'normal') { mf += A.att1[d]; mw += A.win1[d]; } }
    return { seg: segName([a, b]), n: f, win: f ? w / f : null, mainN: mf, main: mf ? mw / mf : null }; });
  return { offered: SP.offered / n, seg, byWho: Object.fromEntries(Object.keys(SP.wf).map(k => [k, { n: SP.wf[k], win: (SP.ww[k] | 0) / SP.wf[k] }])), offers: SP.offered, pos6, per10: pos6 ? 10 * SP.offered / pos6 : null, accept: r(SP.accepted, SP.offered), fights: SP.fights, win: r(SP.won, SP.fights),
    hands: r(SP.hands, SP.fights), took: SP.took / n, cashN: SP.cashN / n, cash: SP.cash / n, readHand: r(SP.reads, SP.hands), mainReadHand: r(expRead, SP.hands),
    readRatio: expRead > 0 ? (SP.reads / SP.hands) / (expRead / SP.hands) : null, handShare: r(SP.hands, mainH), incomeShare: r(SP.cash, earned),
    first5: SP.first5, eliteBoss: SP.eliteBoss, multi: SP.multi, byIdx: SP.byIdx.slice(), who: Object.fromEntries(Object.keys(SP.who).map(k => [k, SP.who[k] / Math.max(1, SP.offered)])),
    by: { hp: r(SP.by.hp, SP.fights), rounds: r(SP.by.rounds, SP.fights), pile: r(SP.by.pile, SP.fights) },
    trips20: blocks.length ? { blocks: blocks.length, cards: mean(blocks.map(u => u.size)), regular: mean(blocks.map(u => [...u].filter(id => REG_CARDS.has(id)).length)) } : null };
}
function printSpar(rows) {
  const X = EN.sparCfg(C), f1 = x => x == null ? '—' : x.toFixed(1), f0 = x => x == null ? '—' : Math.round(x).toLocaleString('en');
  const tAdd = EN.sparTierAt ? EN.sparTierAt(X, TIER) : 0;   // 合併審查 F2：試煉第 k 階、第 tierFrom 位起再多幾位（encounter.tierAdd；第 0 階 0＝這行字跟以前一樣）
  const addTx = (Array.isArray(X.posAdd) ? '照位數走 ' + X.posAdd.map(k => '第 ' + k[0] + ' 位 +' + k[1]).join('、') : '＋' + X.posAdd) + (tAdd ? '、試煉第 ' + TIER + ' 階第 ' + X.tierFrom + ' 位起再 ' + (tAdd > 0 ? '+' : '') + tAdd : '');
  console.log(`\n### 切磋（活店第二階段；--enc on、--enc-policy ${SPAR_POL}、${SPAR_REW === 'bag' ? '包包' : '唱片櫃'}模式；第 ${X.from} 位起、每輪 ${X.p}、一般客人位、短局 ${X.short}、等效位數${addTx}（熟客出自己 7 張、星數照${X.deckAt === 'pos' ? '第幾位' : X.deckAt === 'base' ? ' pos＋off' : '等效位數'}補）${X.ace ? '、帶王牌' : ''}；每趟平均）\n`);
  console.log('| 策略 | 流程 | 邀請／趟（每 10 位，第 6 位起） | 接受率 | 打 | 勝率 | 一場幾手（KO／比聲望條） | 收牌／拿錢（每趟） | 錢／趟（占總收入） | 被讀／手（主線同位數；比） | 切磋手數÷主線手數 | 第 1–5 位／菁英藏家／一輪兩次 | 連玩 20 趟收進唱片櫃（熟客牌） |');
  console.log('|---|---|---|---|---|---|---|---|---|---|---|---|---|');
  for (const x of rows) { const s = x.spar; if (!s) continue;
    console.log(`| ${LABEL[x.pol] || x.pol} | ${x.flow} | ${f2(s.offered)}（${f2(s.per10)}） | ${pct(s.accept)} | ${s.fights} | **${pct(s.win)}** | ${f2(s.hands)}（${p0(s.by.hp)}／${p0(s.by.rounds)}） | ${f2(s.took)}／${f2(s.cashN)} | $${f0(s.cash)}（${pct(s.incomeShare)}） | ${f2(s.readHand)}（${f2(s.mainReadHand)}；${f2(s.readRatio)}） | ${pct(s.handShare)} | ${s.first5}／${s.eliteBoss}／${s.multi} | ${s.trips20 ? f1(s.trips20.cards) + '（' + f1(s.trips20.regular) + '）' : '—'} |`); }
  console.log(`\n分段：切磋勝率（場）／主線同段一般客人首戰勝率；差＝切磋 − 主線（LS5 分段判 ${SPAR_SEG_LO}～+${SPAR_SEG_HI} 點、該段 ≥${SPAR_SEG_MIN} 場）\n`);
  console.log('| 策略 | 流程 | ' + SPAR_SEGS.map(segName).map(x => '第 ' + x + ' 位').join(' | ') + ' |');
  console.log('|---|---|' + SPAR_SEGS.map(() => '---').join('|') + '|');
  for (const x of rows) { const s = x.spar; if (!s || !s.seg) continue;
    console.log(`| ${LABEL[x.pol] || x.pol} | ${x.flow} | ` + s.seg.map(g => g.n ? `${pct(g.win)}（${g.n}）／${pct(g.main)}；${(g.win - g.main >= 0 ? '+' : '') + (100 * (g.win - g.main)).toFixed(1)}` : '—').join(' | ') + ' |'); }
  const RG = Object.keys(C.regulars || {}).slice().sort((a, b) => ((C.regulars[a].enc || {}).off | 0) - ((C.regulars[b].enc || {}).off | 0));
  console.log('\n個性（off 小→大＝勝率應該越來越低）：' + rows.filter(x => x.spar && x.spar.byWho).map(x => (LABEL[x.pol] || x.pol) + ' ' +
    RG.map(k => (C.regulars[k].name || k) + '（' + ((C.regulars[k].enc || {}).off | 0) + '）' + (x.spar.byWho[k] ? pct(x.spar.byWho[k].win) : '—')).join('、')).join('；'));
  const g = rows.find(x => x.spar && x.pol === 'thoughtful') || rows.find(x => x.spar);
  if (g) console.log(`\n出在一般客人位 第 1／2／3 位（idx 0／1／2）：${g.spar.byIdx.slice(0, 3).join('／')}；誰來（${LABEL[g.pol] || g.pol}・${g.flow}）：` +
    Object.keys(C.regulars || {}).map(k => (C.regulars[k].name || k) + ' ' + pct(g.spar.who[k] || 0)).join('、'));
}
// LS 門檻（SPEC-H §13；用 --enc-policy smart 判＝對主線最有利的那支；always／never 只印）。LS1–LS3 要 --encbase（同 n、同旗標、--enc off 的 JSON：配對比較，同一批種子），
//   n ≥ 4000 才判、更小只列參考；LS4 錢中位要 --encbase；LS5／LS6 該策略打 ≥200 場才判；LS7 只在 always 判；LS8 計數
function sparChecks(G, tag) {
  if (!G) return;
  const L_N = 4000, judge = SPAR_POL === 'smart', who = `${tag}切磋（${SPAR_REW === 'bag' ? '包包' : '唱片櫃'}模式、${SPAR_POL}）`;
  const put = (id, name, okv, info, big) => { if (judge && (!big || N >= L_N)) check(id, name, okv, info); else refs.push({ id, name, ok: okv, info: info + (judge ? `；n ${N} < ${L_N} 只列參考（判 ${id} 用 --n ${L_N}）` : `；--enc-policy ${SPAR_POL} 只列（門檻用 smart 判）`) + (okv ? '［在門檻內］' : '［不在門檻內］') }); };
  const B = ENCBASE && ENCBASE.runs && ENCBASE.runs[GATE], TH = G.thoughtful, HR = G.humanRead, NV = G.novice, sg = x => (x >= 0 ? '+' : '') + x;
  const noBase = (id, name, info) => refs.push({ id, name, ok: null, info: info + '；沒給 --encbase（同 n、同旗標、--enc off 的 --json）只列' });
  if (TH) { const n1 = `${who} LS1 不放水：會讀的 到第 50 位 on − off ≤ +1 點`; if (B && B.thoughtful) { const d = TH.reach[3] - B.thoughtful.reach[3]; put('LS1', n1, d <= 0.01 + 1e-9, `${pct(TH.reach[3])} 對 ${pct(B.thoughtful.reach[3])}（${sg(pt(d))} 點）`, true); } else noBase('LS1', n1, pct(TH.reach[3])); }
  if (HR) { const n2 = `${who} LS2 一般玩家 深度中位 on − off ≤ +1 位`; if (B && B.humanRead) { const d = HR.median - B.humanRead.median; put('LS2', n2, d <= 1, `${HR.median} 對 ${B.humanRead.median}（${sg(d)} 位）`, true); } else noBase('LS2', n2, '中位 ' + HR.median); }
  if (NV) { const n3 = `${who} LS3 新手 到第 10 位 on − off ≤ +1 點`; if (B && B.novice) { const d = NV.reach[1] - B.novice.reach[1]; put('LS3', n3, d <= 0.01 + 1e-9, `${pct(NV.reach[1])} 對 ${pct(B.novice.reach[1])}（${sg(pt(d))} 點）`, true); } else noBase('LS3', n3, pct(NV.reach[1])); }
  if (TH && TH.wcx) { const n4 = `${who} LS4 錢：會讀的 每輪開頭的錢中位 on ≤ off × 1.05`; const bm = B && B.thoughtful && B.thoughtful.wcx ? B.thoughtful.wcx.rmMed : null;
    if (bm != null) put('LS4', n4, TH.wcx.rmMed <= bm * 1.05 + 1e-9, `$${Math.round(TH.wcx.rmMed).toLocaleString('en')} 對 $${Math.round(bm).toLocaleString('en')}（×${(TH.wcx.rmMed / bm).toFixed(3)}）`); else noBase('LS4', n4, '$' + Math.round(TH.wcx.rmMed).toLocaleString('en')); }
  { const xs = Object.values(G).filter(x => x.spar && x.spar.incomeShare != null), mx = xs.reduce((m, x) => x.spar.incomeShare > m.v ? { v: x.spar.incomeShare, p: x.pol } : m, { v: 0, p: null });
    if (xs.length) put('LS4', `${who} LS4 切磋收入 ≤ 總收入 5%（每支策略）`, mx.v <= 0.05 + 1e-9, `最多 ${pct(mx.v)}（${LABEL[mx.p] || mx.p || '—'}）`); }
  const enough = x => x && x.spar && x.spar.fights >= 200;
  if (enough(TH)) put('LS5', `${who} LS5 是真的對決：會讀的 勝率 75–95%`, TH.spar.win >= 0.75 - 1e-9 && TH.spar.win <= 0.95 + 1e-9, `${pct(TH.spar.win)}（${TH.spar.fights} 場）`);
  else if (TH) refs.push({ id: 'LS5', name: `${who} LS5 會讀的 勝率 75–95%`, ok: null, info: `只打 ${TH.spar ? TH.spar.fights : 0} 場（<200），不判` });
  if (enough(NV)) put('LS5', `${who} LS5 是真的對決：新手 勝率 45–80%`, NV.spar.win >= 0.45 - 1e-9 && NV.spar.win <= 0.80 + 1e-9, `${pct(NV.spar.win)}（${NV.spar.fights} 場）`);
  else if (NV) refs.push({ id: 'LS5', name: `${who} LS5 新手 勝率 45–80%`, ok: null, info: `只打 ${NV.spar ? NV.spar.fights : 0} 場（<200），不判` });
  // LS5 分段（審查修正 p2b）：每一段切磋勝率 − 主線同段一般客人首戰勝率 在 SPAR_SEG_LO～SPAR_SEG_HI 點（不比主線難太多、也不比主線好打）；該段 ≥SPAR_SEG_MIN 場才判
  for (const x of [TH, NV, HR]) { if (!x || !x.spar || !x.spar.seg) continue;
    const gs = x.spar.seg.filter(g => g.n >= SPAR_SEG_MIN && g.main != null), bad = gs.filter(g => !(100 * (g.win - g.main) >= SPAR_SEG_LO - 1e-9 && 100 * (g.win - g.main) <= SPAR_SEG_HI + 1e-9));
    if (gs.length) put('LS5', `${who} LS5 分段：${LABEL[x.pol]} 每段切磋勝率 − 主線同段一般客人首戰 在 ${SPAR_SEG_LO}～+${SPAR_SEG_HI} 點（≥${SPAR_SEG_MIN} 場的段）`, !bad.length,
      gs.map(g => `第 ${g.seg} 位 ${pct(g.win)}／${pct(g.main)}（${(g.win - g.main >= 0 ? '+' : '') + (100 * (g.win - g.main)).toFixed(1)}）`).join('、'), true); }
  if (SPAR_REW === 'bag' && enough(TH)) {
    put('LS5', `${who} LS5 包包模式：會讀的 勝率 ≤90%`, TH.spar.win <= 0.90 + 1e-9, pct(TH.spar.win));
    put('LS5', `${who} LS5 包包模式：會讀的 被讀次數／手 ≥ 主線同位數的 70%`, TH.spar.readRatio != null && TH.spar.readRatio >= 0.70 - 1e-9, `${f2(TH.spar.readHand)} 對 ${f2(TH.spar.mainReadHand)}（${f2(TH.spar.readRatio)} 倍）`);
  }
  for (const x of [TH, NV, HR]) if (enough(x)) put('LS6', `${who} LS6 短局：${LABEL[x.pol]} 切磋平均 1.8–3.5 手`, x.spar.hands >= 1.8 - 1e-9 && x.spar.hands <= 3.5 + 1e-9, `${f2(x.spar.hands)} 手（主線 ${f2(x.hands)}）`);
  { const xs = Object.values(G).filter(x => x.spar && x.spar.handShare != null), mx = xs.reduce((m, x) => Math.max(m, x.spar.handShare), 0);
    const n7 = `${who} LS7 時間：切磋手數 ÷ 主線手數 ≤ 10%（always）`;
    if (xs.length) { if (SPAR_POL === 'always') check('LS7', n7, mx <= 0.10 + 1e-9, `最多 ${pct(mx)}`); else refs.push({ id: 'LS7', name: n7, ok: mx <= 0.10 + 1e-9, info: `最多 ${pct(mx)}；--enc-policy ${SPAR_POL} 只列（判 LS7 用 always）` }); } }
  { const xs = Object.values(G).filter(x => x.spar), off = xs.reduce((s, x) => s + x.spar.offers, 0), p6 = xs.reduce((s, x) => s + x.spar.pos6, 0);
    const per10 = p6 ? 10 * off / p6 : null, bad = xs.reduce((s, x) => s + x.spar.first5 + x.spar.eliteBoss + x.spar.multi, 0);
    if (xs.length) check('LS8', `${who} LS8 次數：每 10 位邀請 0.8–1.1（第 6 位起）；第 1–5 位、菁英、藏家位 0；每輪 ≤1`, per10 != null && per10 >= 0.8 - 1e-9 && per10 <= 1.1 + 1e-9 && bad === 0,
      `${f2(per10)}（${off} 次／${Math.round(p6)} 位）；第 1–5 位 ${xs.reduce((s, x) => s + x.spar.first5, 0)}、菁英藏家 ${xs.reduce((s, x) => s + x.spar.eliteBoss, 0)}、一輪兩次 ${xs.reduce((s, x) => s + x.spar.multi, 0)}`); }
  if (HR && HR.spar) refs.push({ id: '切磋', name: `${who} 一般玩家每趟邀請平均（應 ≥1.5，玩家才看得到這個功能）`, ok: HR.spar.offered >= 1.5 - 1e-9, info: f2(HR.spar.offered) });
}

// 一檔貨表的數字：完整一輪（5 位都走到）看到幾張不同的（全部／FEATURE；第 1 輪、第 2 輪起分開）、每位架上幾張、剋下一位主屬性那軸 ≥4 星幾張（中位／最小／0 張的比例；
//   全部、第 1 輪、--browse 時打開的那幾箱）、每趟從架上買幾張（唱片／其中 FEATURE）、架上稀有度（每格）
function lotStats(L, n) {
  const mean = a => a.length ? a.reduce((s, x) => s + x, 0) / a.length : null;
  const dist = a => a.length ? { median: q(a, 0.5), min: a.reduce((m, x) => Math.min(m, x), Infinity), zero: a.filter(x => x === 0).length / a.length, mean: mean(a), n: a.length } : null;
  const full = L.rounds.filter(r => r.guests === 5), f1 = full.filter(r => r.no === 1), f2 = full.filter(r => r.no > 1);
  const rt = SHELF_RAR.reduce((s, r) => s + L.rar[r], 0);
  return { rounds: L.rounds.length, fullRounds: full.length, seen: mean(full.map(r => r.seen)), seen1: mean(f1.map(r => r.seen)), seen2: mean(f2.map(r => r.seen)),
    seenF: mean(full.map(r => r.seenF)), seenF1: mean(f1.map(r => r.seenF)), seenF2: mean(f2.map(r => r.seenF)),
    shelf: mean(L.shelf), good: dist(L.good), good1: dist(L.good1), ...(L.goodOpen.length ? { goodOpen: dist(L.goodOpen) } : {}),
    bag10: mean(L.bag10), bag20: mean(L.bag20), buy: L.buy / n, buyF: L.buyF / n, rar: Object.fromEntries(SHELF_RAR.map(r => [r, rt ? L.rar[r] / rt : null])) };
}
// 想要清單表：第 1 檔（策展池）／第 2 檔起（全卡池）分開；每檔進來幾張、每張每檔進來機率（÷N＝清單全部；÷合規＝那一檔來源裡擲得到的）
function wantStats(W, n) {
  const one = x => ({ lots: x.lots, perLot: x.lots ? x.in / x.lots : null, perCard: x.lots ? x.in / (x.lots * WANT_N) : null, eligPerLot: x.lots ? x.elig / x.lots : null, perElig: x.elig ? x.inElig / x.elig : null });
  return { N: WANT_N, l1: one(W.l1), l2: one(W.l2), onShelf: W.onShelf / n, bought: W.bought / n };
}

// 第 C 波統計（每趟平均；SPEC-C §7.3）：run.stats.c 各計數、錢的入出（income／spend 分項）、樂歷記帳（基本＝engine lexpBase：15×實際打過的位數＋8×最多連贏）、
//   每輪開頭的錢（攤位之前）、每種站出現→被選、踢館帖那輪首戰 vs 平常（第 31 位起）、新認識（路上的盤＋客人掉落）
const WC_KEYS = ['loot', 'lootTake', 'lootSkip', 'lootRelic', 'gold', 'goldTake', 'packet', 'packetCash', 'packetLexp', 'chest', 'chestTake', 'chestRelic', 'chestSkip', 'chestGold', 'chestApex', 'chestGoldTake',
  'sess', 'cpSess', 'leave', 'snackHp', 'tickets', 'digTake', 'digSkip', 'rerolls', 'tradeBuy', 'gearBuy', 'marketBuy', 'bags', 'consign', 'consignGot', 'dareOffer', 'dareAccept', 'dareTough', 'dareTank', 'dareWon', 'safety', 'r15', 'r15d'];
const WC_KINDS = ['dig', 'trade', 'gear', 'snack', 'gig', 'promo', 'fortune', 'consign', 'home', 'dare', 'warehouse'];
function wcStatsOf(recs, CW, n) {
  const avg = f => recs.reduce((s, r) => s + (f(r) || 0), 0) / n;
  const sumK = f => { const o = {}; for (const r of recs) { const x = f(r) || {}; for (const k of Object.keys(x)) if (typeof x[k] === 'number') o[k] = (o[k] || 0) + x[k]; } for (const k of Object.keys(o)) o[k] /= n; return o; };
  const W = r => r.wc || {};
  const lexpAll = sumK(r => r.lexp), base = lexpAll.base || 0, lexp = Object.assign({}, lexpAll); delete lexp.base;
  const lexpRoute = Object.values(lexp).reduce((s, x) => s + x, 0);
  const rmAll = recs.flatMap(r => r.rm.map(x => x.m)), rmMed = rmAll.length ? q(rmAll, 0.5) : null;
  const rmMean = rmAll.length ? rmAll.reduce((s, x) => s + x, 0) / rmAll.length : null;
  const off = sumK(r => W(r).offered), pk = sumK(r => W(r).picked);
  const pick = {}; for (const k of Object.keys(off)) pick[k] = { offered: off[k] * n, picked: (pk[k] || 0) * n, rate: off[k] ? (pk[k] || 0) / off[k] : null };
  const k = {}; for (const x of WC_KEYS) k[x] = avg(r => W(r)[x]);
  const earned = avg(r => r.earned), spent = avg(r => r.spent);
  return { k, spend: sumK(r => W(r).spend), income: sumK(r => W(r).income), lexp, lexpRoute, lexpBase: base, gigShare: base ? (lexp.gig || 0) / base : null, routeShare: base ? lexpRoute / base : null,
    rmMed, rmMean, pick, dare: CW ? { f: CW.dare.f, w1: CW.dare.f ? CW.dare.w / CW.dare.f : null, pf: CW.plain.f, pw1: CW.plain.f ? CW.plain.w / CW.plain.f : null } : null,
    dareRate: pick.dare && pick.dare.picked ? (k.dareAccept * n) / pick.dare.picked : null,
    r15dup: k.r15 ? k.r15d / k.r15 : null, known: avg(r => r.road + r.drops), spentShare: earned ? spent / earned : null };
}
// ---------------- 第 I 波 I-3a 市集（--market on；SPEC-I §6.7 M3、K1′；engine run.stats.c.mk） ----------------
const MK_KINDS = ['dig', 'fortune', 'snack', 'gear', 'trade', 'gig', 'promo', 'consign', 'home', 'warehouse', 'market'];   // 扣時段的攤（K1′ 看這些）
const MK_FREE = ['studio', 'dare', 'consignGet'];
function mkStatsOf(recs, n) {
  const M = r => (r.wc && r.wc.mk) || null, has = recs.filter(M);
  const sum = f => has.reduce((t, r) => t + (f(M(r)) || 0), 0);
  const sess = sum(x => x.sess), slots = sum(x => x.slots), used = sum(x => x.used), leftSum = sum(x => x.leftSum), leftAny = sum(x => x.leftAny);
  const kinds = {}, all = MK_KINDS.concat(MK_FREE);
  for (const k of all) { const o = sum(x => x.offered[k]), w = sum(x => x.went[k]), f1 = sum(x => x.first[k]); if (o) kinds[k] = { offered: o, went: w, first: f1, rate: w / o, firstRate: f1 / o }; }
  return { sess: sess / n, slotsPer: sess ? slots / sess : null, usedPer: sess ? used / sess : null, leftPer: sess ? leftSum / sess : null, leftShare: sess ? leftAny / sess : null,
    flips: [0, 1, 2].map(i => sum(x => (x.flips || [])[i]) / n), omen: sum(x => x.omen) / n, tea: sum(x => x.tea) / n, teaHp: sum(x => x.teaHp) / n,
    demo: sum(x => x.demo) / n, trial: sum(x => x.trial) / n, back: sum(x => x.back) / n, kinds };
}
const mkZh = k => (C.waveC && C.waveC.fairStations && C.waveC.fairStations[k]) || (C.waveC && C.waveC.stations && C.waveC.stations[k]) || k;
function printMk(rows) {
  const F = EN.fairCfg(C);
  console.log(`\n### 第 I 波 I-3a 市集（每輪 ${F.slots} 個時段、中繼點 ${F.relaySlots}；一般輪 ${F.tiles} 攤；收攤每個時段 $${F.slotCash}${COPT_SET ? '；cPolicy ' + JSON.stringify(COPT) : ''}）\n`);
  console.log('| 策略 | 流程 | 市集 次／趟 | 每輪 時段／用掉／收攤剩（M3：2.0–2.8）／收攤還有剩的輪（M3：≥15%） | 算命 翻第 1／2／3 張（每趟）；凶籤 | 冬瓜茶 杯／回聲望 | 錄音室 demo／試錄 | 進了又退出 |');
  console.log('|---|---|---|---|---|---|---|---|');
  for (const x of rows) { const m = x.mk; if (!m) continue;
    console.log(`| ${LABEL[x.pol] || x.pol} | ${x.flow} | ${f2(m.sess)} | ${f2(m.slotsPer)}／**${f2(m.usedPer)}**／${f2(m.leftPer)}／**${pct(m.leftShare)}** | ${f2(m.flips[0])}／${f2(m.flips[1])}／${f2(m.flips[2])}；${f2(m.omen)} | ${f2(m.tea)}／${f2(m.teaHp)} | ${f2(m.demo)}／${f2(m.trial)} | ${f2(m.back)} |`); }
  const ks = MK_KINDS.concat(MK_FREE);
  console.log('\n| 策略 | 流程 | 每種攤：出現（每趟）→ 被去（K1′ 15–85%）／排第一個去（K1′ ≤60%） ' + ks.map(mkZh).join('／') + ' |');
  console.log('|---|---|---|');
  for (const x of rows) { const m = x.mk; if (!m) continue;
    console.log(`| ${LABEL[x.pol] || x.pol} | ${x.flow} | ` + ks.map(k => { const K = m.kinds[k]; return K ? f2(K.offered / x.n) + '→' + pct(K.rate) + (MK_FREE.includes(k) ? '' : '／' + pct(K.firstRate)) : '—'; }).join('／') + ' |'); }
}
function mkChecks(G, tag) {
  const TH = G && G.thoughtful, m = TH && TH.mk; if (!m) return;
  const put = (id, name, okv, info, nMin) => { if (!COPT_SET && !FROM && N >= nMin && okv != null) check(id, name, okv, info); else refs.push({ id, name, ok: okv, info: info + (COPT_SET || FROM ? '；有 --copt／--from 只列' : N < nMin ? `；n ${N} < ${nMin} 只列參考（判 ${id} 用 --n ${nMin}）` : '') + (okv == null ? '' : okv ? '［在門檻內］' : '［不在門檻內］') }); };
  put('M3', `${tag}時段有取捨：會讀的 每輪平均用掉 2.0–2.8 個時段、收攤時還有剩的輪 ≥15%`, m.usedPer >= 2.0 - 1e-9 && m.usedPer <= 2.8 + 1e-9 && m.leftShare >= 0.15 - 1e-9, `用掉 ${f2(m.usedPer)}／${f2(m.slotsPer)}、還有剩 ${pct(m.leftShare)}`, 1000);
  const judged = MK_KINDS.filter(k => m.kinds[k] && m.kinds[k].offered >= 50), few = MK_KINDS.filter(k => !m.kinds[k] || m.kinds[k].offered < 50);
  const bad = judged.filter(k => !(m.kinds[k].rate >= 0.15 - 1e-9 && m.kinds[k].rate <= 0.85 + 1e-9 && m.kinds[k].firstRate <= 0.60 + 1e-9));
  put('K1′', `${tag}每種攤出現時被去 15–85%、排第一個去 ≤60%（會讀的）`, judged.length ? !bad.length : null,
    judged.map(k => mkZh(k) + ' ' + p0(m.kinds[k].rate) + '／' + p0(m.kinds[k].firstRate)).join('、') + (bad.length ? '（沒過：' + bad.map(mkZh).join('、') + '）' : '') + (few.length ? '；出現 <50 次只列：' + few.map(mkZh).join('、') : ''), 1000);
}
function printWC(rows) {
  const f0 = x => x == null ? '—' : Math.round(x).toLocaleString('en'), f1 = x => x == null ? '—' : x.toFixed(1);
  const w = WCC, on = x => x ? '開' : '關';
  console.log(`\n### 第 C 波（每趟平均；戰利品列 ${on(w.loot.on)}、寶箱 ${on(w.chest.on)}、攤位 ${on(w.stall.on)}、客人補償 ${JSON.stringify(EN.trialCfg(C, TIER).guestHpSteps || [])}${SAFETY ? '、新手保底（--safety）' : ''}${COPT_SET ? '、cPolicy ' + JSON.stringify(COPT) : ''}${RET_RELICS ? '、老玩家 ' + RET_RELICS.join(',') : ''}${FROM ? '、從第 ' + FROM + ' 位開局' : ''}）\n`);
  console.log('| 策略 | 流程 | 賺／花（花掉%） | 每輪開頭的錢 中位／平均 | 花在：門票／唱片(調貨＋市集)／配件／重翻／福袋 | 多的收入：不收／紅包／先不逛／踢館帖／出清 | 樂歷：基本／路線（演唱會／店裡唱盤／公關片／紅包／錄 demo）／占比 演唱會·路線 |');
  console.log('|---|---|---|---|---|---|---|');
  for (const x of rows) { const W = x.wcx; if (!W) continue; const sp = W.spend, inc = W.income, l = W.lexp;
    console.log(`| ${LABEL[x.pol] || x.pol} | ${x.flow} | ${f0(x.end.earned)}／${f0(x.end.spent)}（${pct(W.spentShare)}） | ${f0(W.rmMed)}／${f0(W.rmMean)} | ${f0(sp.gig)}／${f0((sp.trade || 0) + (sp.market || 0))}／${f0(sp.gear)}／${f0(sp.reroll)}／${f0(sp.bag)} | ${f0(inc.skip)}／${f0(inc.packet)}／${f0(inc.leave)}／${f0(inc.dare)}／${f0(inc.sell)} | ${f0(W.lexpBase)}／${f0(W.lexpRoute)}（${f0(l.gig)}／${f0(l.home)}／${f0(l.promo)}／${f0(l.packet)}／${f0(l.demo)}）／${pct(W.gigShare)}·${pct(W.routeShare)} |`); }
  console.log('\n| 策略 | 流程 | 戰利品列 次／收／不收／配件；金邊 出／收；紅包 錢／樂歷 | 寶箱 次／收／配件／不收；有金邊／鎮店盤格；收金邊 | 攤位 次（中繼點）／先不逛；宵夜回聲望；門票張；挖寶 收／不收／重翻；調貨買／器材買／市集買／福袋；寄賣 放／領 | 踢館帖 出現／接（狠／耐）／撐完；接帖率；接帖那輪首戰 vs 平常（第 31 位起） | 新手保底用 | 路上的盤 第 15 位起 張／重複；新認識 |');
  console.log('|---|---|---|---|---|---|---|---|');
  for (const x of rows) { const W = x.wcx; if (!W) continue; const k = W.k, d = W.dare;
    console.log(`| ${LABEL[x.pol] || x.pol} | ${x.flow} | ${f1(k.loot)}／${f1(k.lootTake)}／${f1(k.lootSkip)}／${f2(k.lootRelic)}；${f2(k.gold)}／${f2(k.goldTake)}；${f2(k.packetCash)}／${f2(k.packetLexp)} | ${f1(k.chest)}／${f2(k.chestTake)}／${f2(k.chestRelic)}／${f2(k.chestSkip)}；${f2(k.chestGold)}／${f2(k.chestApex)}；${f2(k.chestGoldTake)} | ${f1(k.sess)}（${f2(k.cpSess)}）／${f2(k.leave)}；${f1(k.snackHp)}；${f1(k.tickets)}；${f2(k.digTake)}／${f2(k.digSkip)}／${f2(k.rerolls)}；${f2(k.tradeBuy)}／${f2(k.gearBuy)}／${f2(k.marketBuy)}／${f2(k.bags)}；${f2(k.consign)}／${f2(k.consignGot)} | ${f2(k.dareOffer)}／${f2(k.dareAccept)}（${f2(k.dareTough)}／${f2(k.dareTank)}）／${f2(k.dareWon)}；${pct(W.dareRate)}；${d && d.f ? pct(d.w1) : '—'}（${d ? d.f : 0} 場）vs ${d && d.pf ? pct(d.pw1) : '—'} | ${f2(k.safety)} | ${f1(k.r15)}／${pct(W.r15dup)}；${f1(W.known)} |`); }
  console.log('\n| 策略 | 流程 | 每種站：出現次數（每趟）→被選（%） ' + WC_KINDS.map(k => (C.waveC && C.waveC.stations && C.waveC.stations[k]) || k).join('／') + ' |');
  console.log('|---|---|---|');
  for (const x of rows) { const W = x.wcx; if (!W) continue; const P = W.pick; console.log(`| ${LABEL[x.pol] || x.pol} | ${x.flow} | ` + WC_KINDS.map(k => P[k] ? f2(P[k].offered / x.n) + '→' + pct(P[k].rate) : '—').join('／') + ' |'); }
}

// ---------------- S5：序章男子（新包包 7 張＝禮物 4＋特價箱三色各一，沒有配件；你 12 聲望） ----------------
function manFight(pol, i) {
  const run = EN.newRun(C, { seedKey: 'sim5-man-' + i, runNo: 1, ace: TIERS[i % 3] });
  const ch = EN.bargainPolicy(run, C); ok(EN.choose(run, C, ch), 'bargainPick', ch);
  const f = EN.startFight(run, C, {});
  if (f.enemyId !== MAN) throw new Error('prologue guest is ' + f.enemyId);
  return play(f.duel, pol, EN.makeRng(EN.fnv1a32('man|' + pol + '|' + i)), {});
}
function fightCell(fn, n) {
  let w = 0, h = 0;
  for (let i = 0; i < n; i++) { const d = fn(i); if (d.over.win) w++; h += d.stats.hands; }
  return { n, win: w / n, hands: h / n };
}

// ---------------- run ----------------
const checks = [];
const check = (id, name, ok, info) => { checks.push({ id, name, ok: !!ok, info }); };
const refs = [];                                                           // 只列不擋的門檻（樣本不夠判；現在只有 T3，見檔頭）
const T3_N = 4000;
const report = { N, CAP, TIER, FLOWS, GATE, CFG: Object.assign({}, CFG), trial: EN.trialCfg(C, TIER), economy: C.economy, patch: arg('patch', null) };
if (APEX) report.apex = APEX_ACE || 'default';                           // 不開 --apex 時 JSON 跟以前逐字相同（不多 "apex": null）
if (ACE_T) report.ace = ACE_T;
if (UNLOCK) report.unlock = true;                                          // 不開 --unlock 時 JSON 跟以前逐字相同
if (APEX_PARAMS) report.apexParams = APEX_PARAMS;
if (LOT_ON) report.lot = EN.lotCfg(C);                                   // 第 B 波：一檔貨開著才多這些鍵（--lot off 時 JSON 跟一檔貨之前逐字相同）
if (BROWSE < 16) report.browse = BROWSE;
if (SEEDS) report.seeds = Object.assign({}, SEEDS, { example: seedsFor(0) });
if (TALENT) report.talent = TALENT;                                        // 第 D 波（沒給＝JSON 跟以前一樣）
if (FAC) report.fac = { levelEvery: C.factions.levelEvery, fx: Object.fromEntries(TIERS.map(t => [t, C.factions[t].fx])), ...(FACFX ? { facfx: FACFX } : {}), ...(APEX ? { apexSwap: C.factions.apexSwap } : {}), ...(FACTAL_FOR ? { factal: Object.fromEntries(TIERS.map(t => [t, FACTAL_FOR(t)])) } : {}) };   // 第 D 波棒二；棒三 --factal
if (LADDER) report.ladder = LADDER;
if (POSMAX !== 60) report.posmax = POSMAX;
if (I0) report.i0 = I0;
if (WANT_N) report.want = WANT_N;
if (WC_ON) report.waveC = MK_ON ? WCC : Object.assign({}, WCC, { stall: (({ mode, fair, ...rest }) => rest)(WCC.stall) });   // 第 C 波：開著才多這些鍵（--wc off 時 JSON 跟 C 波之前一樣，只差 trial.guestHpSteps）；第 I 波 I-3a 市集關（pick）＝不多 stall.mode／fair
if (MK_ON) report.market = EN.fairCfg(C);                                  // 第 I 波 I-3a 市集（--market off＝不多這個鍵）
if (COPT_SET) report.copt = COPT;
if (ENC_ON) report.encore = { aceStar: EN.encCfg(C).aceStar, carry: EN.encCfg(C).carry !== false, aces: EN.encCfg(C).aces, facHeresy: EN.encCfg(C).facHeresy, ...(ENCPOL ? { encpol: true } : {}) };   // 第 I 波（--encore off＝不多這個鍵）
if (SAFETY) report.safety = true;
if (SPAR_ON) report.encounter = { cfg: EN.sparCfg(C), policy: SPAR_POL, reward: SPAR_REW };   // 切磋（--enc off＝不多這個鍵）
if (LUX) report.lineup = { lineup: LU_ON, wear: WR_ON, cfg: EN.luCfg(C), wearCfg: EN.wearCfg(C), ...(LU_FROM != null ? { from: LU_FROM } : {}), ...(BENCH != null ? { bench: BENCH } : {}) };   // 第 I 波 I-2（關著＝不多這個鍵）
if (ENCBASE && !(ENCBASE.N === N && ENCBASE.CAP === CAP && (ENCBASE.TIER | 0) === TIER && !ENCBASE.encounter && !!ENCBASE.fac === FAC && (ENCBASE.apex || null) === (report.apex || null) && !!ENCBASE.safety === SAFETY)) {
  console.error('--encbase 要是同 n、同 cap、同 tier／--fac／--apex／--safety、--enc off 跑出來的 JSON'); process.exit(2);
}
if (FROM) report.from = { n: FROM, relics: FROM_RELICS };
if (RET_RELICS) report.returning = RET_RELICS;
if (RET_RELICS) console.log('\n老玩家（--returning）：不打序章、帶 ' + RET_RELICS.join('、') + ' 開局');
if (TALENT || LADDER) console.log('\n樂歷（第 D 波）：' + (TALENT ? '主幹 ' + Object.entries(TALENT).map(([k, v]) => k + ' ' + v).join('、') + '（每一趟都帶）' : '') + (TALENT && LADDER ? '；' : '') + (LADDER ? '階梯 ' + JSON.stringify(LADDER) : ''));
if (FROM) console.log('\n中繼點開局（--from ' + FROM + '）：快速選秀（撿盤 ' + EN.draftPlan(C, FROM).k + ' 次二選一、升級 ' + EN.draftPlan(C, FROM).m + ' 次三選一）→ 特價箱 → 從第 ' + FROM + ' 位開打；配件 ' + (FROM_RELICS.join('、') || '無'));
if (SAFETY) console.log('\n新手保底（--safety）：每一趟第 1 位輸了免費重打一次（＝新帳號第一趟；D1／D2 照這個判，T1 只列參考）');
if (DBASE && !(DBASE.N === N && DBASE.CAP === CAP && JSON.stringify(DBASE.returning || null) === JSON.stringify(RET_RELICS || null) && !DBASE.waveC)) {
  console.error('--dbase 要是同 n、同 cap、同 --returning、--wc off 跑出來的 JSON（這份 n ' + DBASE.N + '、cap ' + DBASE.CAP + '、returning ' + JSON.stringify(DBASE.returning || null) + (DBASE.waveC ? '、C 波開著' : '') + '）'); process.exit(2);
}
if (SEEDS) console.log('\n開局種子（--seeds ' + SEEDS.k + ':' + SEEDS.rarity + '）：每一趟都不打序章（種子只在不打序章的那一趟有效）' + (SEEDS.k ? '；種子＝' + (C.rarityZh || {})[SEEDS.rarity] + '裡 peak 最高的 ' + SEEDS.k + ' 張（同分照趟雜湊），例：第 0 趟 ' + seedsFor(0).map(id => C.cards[id].album).join('、') : '；沒有種子（對照組）'));
if (WANT_N) console.log('\n想要清單（--want ' + WANT_N + '）：每一趟 ' + WANT_N + ' 張（有箱子的非頂點卡、照趟雜湊取；跟策略無關）');
if (ACE_T) console.log('\n每一趟都用' + (C.aceTitle && C.aceTitle[ACE_T] || ACE_T) + '（--ace ' + ACE_T + '）');
if (FAC) console.log('\n三流派（--fac＝?fac=1）：被動 ' + TIERS.map(t => C.factions[t].name + ' ' + JSON.stringify(C.factions[t].fx)).join('；') + '；本派選項' + (NOFACPICK ? '不出（--nofacpick）' : '每 ' + C.factions.levelEvery + ' 級（runPolicy 出了就拿）') + (APEX ? '；跟 --apex 同開：換一格 ' + (C.factions.apexSwap && C.factions.apexSwap.on !== false ? '開' : '關（只標示）') : ''));
if (APEX_PARAMS) console.log('\n試調參數（--apex-params，不改 content.js）：' + JSON.stringify(APEX_PARAMS));
if (UNLOCK) console.log('\n解鎖制（--unlock）：每一趟都是新玩家，只解鎖這一趟的派' + (APEX ? '；擁有的頂點卡只有那派預設那張' : ''));
if (ENC_ON) console.log('\n翻面（第 I 波；--encore off 關）：7 星王牌 丟出之後' + TIERS.map(t => (C.aceTitle && C.aceTitle[t] || t) + ' ' + EN.aceEncoreOf(C, t, FAC).when).join('、') + ' → 王牌回到手上（' + EN.encCfg(C).aceStar + ' 星）；頂點卡照家族預設' + (ENCPOL ? '；策略包 encorePolicy（--encpol 上界）' : ''));
if (LUX) { const L = EN.luCfg(C), Wr = EN.wearCfg(C); console.log('\n上場＋耐聽（第 I 波 I-2）：' + (LU_ON ? '第 ' + (LU_FROM || (SAFETY ? L.firstRunFrom : L.from)) + ' 位那一輪起每輪挑 ' + L.n + ' 張上場（lineupPolicy）' + (BENCH != null ? '、替補 ' + BENCH + ' 格（＋側袋）' : '') : '上場制關') + '；' + (WR_ON ? '耐聽 ' + Wr.grooves + ' 格、聽膩一層主打軸 −' + Wr.star + '（最多 ' + Wr.maxLayers + ' 層）、坐板凳一輪回滿' : '耐聽關')); }
if (APEX) console.log('\n頂點卡純輔助卡試做（--apex）：王牌 ' + (APEX_ACE ? C.cards[APEX_ACE].album + '（' + EN.abilityOf(C, APEX_ACE).name + '）' : '各派預設那張') + '；打贏回 ' + ((C.apexTrial && C.apexTrial.winHeal) || EN.trialCfg(C, TIER).heal));
const cells = {};
const cellOf = (flow, pol) => (cells[flow] || {})[pol];

if (MODE === 'all' || MODE === 'runs') {
  const flows = FLOWS.includes(GATE) ? FLOWS : [GATE, ...FLOWS];
  for (const flow of flows) {
    cells[flow] = {};
    const pols = POLS.filter(p => flow === GATE || CORE.includes(p));
    for (const pol of pols) cells[flow][pol] = runCell(pol, flow, N);
  }
  report.runs = cells;
  const rows = []; for (const flow of flows) for (const pol of Object.keys(cells[flow])) rows.push(cells[flow][pol]);
  const reachStr = x => x.reach.map(p0).join('／');

  console.log(`\n### 整趟無限試煉（${RET_RELICS ? '老玩家：不打序章、帶 ' + RET_RELICS.join('、') : FROM ? '從第 ' + FROM + ' 位中繼點開局' : '新帳號'}；每格 N=${N} 趟、最多打到第 ${CAP} 位；說情每輪一次；mercy ${CFG.mercy ? '開' : '關'}、放水唬人 ${EN.trialCfg(C, TIER).curve.mercyFeint}${TIER ? '、難度階梯 ' + TIER : ''}；門檻看 ${GATE}）\n`);
  if (BROWSE < 16) console.log(`smart 每位客人前只打開 ${BROWSE} 箱（--browse ${BROWSE}：FEATURE＋其他箱照雜湊挑 ${BROWSE - 1} 箱；門檻照 16 箱定義，這組是一檔貨效益的下緣）\n`);
  console.log('| 策略 | 流程 | 深度 中位／平均 | p25–p75 | 不說情 中位／平均 | 到第 5／10／20／50／100 位（%） | 第 1–3 位死 | 一場幾手 | 打到第 6 手 | 死在比聲望條 | 藏家÷非藏家 死亡率（第 4–60 位） | 懸崖（非藏家首戰勝率最大跌幅） | 最高單位死亡率（非藏家） |');
  console.log('|---|---|---|---|---|---|---|---|---|---|---|---|---|');
  for (const x of rows) console.log(`| ${LABEL[x.pol] || x.pol} | ${x.flow} | **${x.median}**／${x.mean.toFixed(1)}${x.censored ? `（${pct(x.censored)} 打完 ${CAP} 位）` : ''} | ${x.p25}–${x.p75} | ${x.noRetry.median}／${x.noRetry.mean.toFixed(1)} | ${reachStr(x)} | ${pct(x.die13)} | ${f2(x.hands)} | ${pct(x.r6)} | ${pct(x.deaths.byBar)} | ${pct(x.hazBoss)}÷${pct(x.hazNon)}＝${x.bossRatio == null ? '—' : x.bossRatio.toFixed(2) + ' 倍'} | ${x.cliff.at ? `第 ${x.cliff.from}→${x.cliff.at} 位 ${p0(x.cliff.w0)}→${p0(x.cliff.w1)}（${pt(x.cliff.drop)} 點）` : '—'} | ${x.hzMax.at ? `第 ${x.hzMax.at} 位 ${pct(x.hzMax.h)}` : '—'} |`);

  console.log(`\n平均手數分段、死在哪（死掉的趟裡）：\n`);
  console.log('| 策略 | 流程 | 手數 1–3｜4–6｜8–12｜18–22｜48–52 位 | 死在哪 1–3／4–5／6–10／11–20／21–50／51–100／>100（%） | 死在藏家位 | 輸的那場 KO／比聲望條 | 客人場勝率 |');
  console.log('|---|---|---|---|---|---|---|');
  for (const x of rows) console.log(`| ${LABEL[x.pol] || x.pol} | ${x.flow} | ${x.handsBand.map(f2).join('｜')} | ${x.deathBands.map(p0).join('／')} | ${pct(x.deaths.atBoss)} | ${pct(x.deaths.byKO)}／${pct(x.deaths.byBar)} | ${pct(x.win)} |`);

  console.log(`\n走到最後時（每趟平均）：成長、包包、錢\n`);
  console.log('| 策略 | 流程 | 等級 | 品味／底氣／聲望上限 | 配件（拿到／買） | 收了 N 張（獎勵唱片／買的） | 包包平均總星 開局→最後 | 賺／花 | 中繼點 | 最多連贏 | 收音機 轉／買（花） |');
  console.log('|---|---|---|---|---|---|---|---|---|---|---|');
  for (const x of rows) { const e = x.end;
    console.log(`| ${LABEL[x.pol] || x.pol} | ${x.flow} | ${e.level.toFixed(1)} | ${e.atk.toFixed(1)}／${e.def.toFixed(1)}／${e.maxHp.toFixed(1)} | ${e.relics.toFixed(2)}（${e.relicsGot.toFixed(2)}／${e.relicsBought.toFixed(2)}） | ${e.taken.toFixed(1)}（${e.rewardCards.toFixed(1)}／${e.bought.toFixed(1)}） | ${e.bag0.toFixed(1)}→${e.bag1.toFixed(1)} | $${Math.round(e.earned).toLocaleString('en')}／$${Math.round(e.spent).toLocaleString('en')} | ${e.checkpoints.toFixed(2)} | ${e.bestStreak.toFixed(1)} | ${e.radioSpins.toFixed(1)}／${e.radioBought.toFixed(1)}（$${Math.round(e.radioSpent).toLocaleString('en')}） |`); }
  if (!EN.bagLimited()) {                                            // 包包不限（店主 11-16）：包包長到幾張、賣掉幾張
    console.log(`\n包包不限張數${NO_THIN ? '（--no-thin：不瘦身）' : '（買完照 thinPolicy 瘦身）'}：每趟平均\n`);
    console.log('| 策略 | 流程 | 最後幾張 | 最多幾張（平均／全部最大） | 賣掉幾張 |');
    console.log('|---|---|---|---|---|');
    for (const x of rows) { const e = x.end; console.log(`| ${LABEL[x.pol] || x.pol} | ${x.flow} | ${e.bagN.toFixed(1)} | ${e.bagMaxN.toFixed(1)}／${e.bagMaxMax} | ${e.sold.toFixed(2)} |`); }
  }

  console.log(`\n客人出牌（第 A 波：主屬性、放水照位數機率、櫃檯交還；客人場、每手）：\n`);
  console.log('| 策略 | 流程 | 他出 經／冷／硬（%） | 他提示 經／冷／硬（%） | 出主屬性那色／提示主屬性那色 | 第 11 位起這手放水 | 每趟交還老闆 送的／種子 |');
  console.log('|---|---|---|---|---|---|---|');
  for (const x of rows) { const e = x.eplay, s3 = o => o ? [o.c, o.o, o.h].map(p0).join('／') : '—';
    console.log(`| ${LABEL[x.pol] || x.pol} | ${x.flow} | ${s3(e.play)} | ${s3(e.hint)} | ${pct(e.mainPlay)}／${pct(e.mainHint)} | ${pct(e.mercyOn)}（${e.mercyHands} 手） | ${e.reclaim.gift.toFixed(2)}／${e.reclaim.seed.toFixed(2)} |`); }

  const PCOLS = 16;
  console.log(`\n每一位：首戰勝率／單位死亡率（%；到過的趟 <200 打括號）\n`);
  console.log('| 策略・流程 | ' + Array.from({ length: PCOLS }, (_, k) => { const d = k + 1, c = EN.classAt(d); return c === 'boss' ? `**${d}藏**` : c === 'elite' ? d + '菁' : String(d); }).join(' | ') + ' |');
  console.log('|---|' + Array.from({ length: PCOLS }, () => '---').join('|') + '|');
  const posRow = x => Array.from({ length: PCOLS }, (_, k) => { const p = x.pos.find(o => o.d === k + 1); if (!p) return '—'; const s = `${p0(p.win1)}／${p0(p.hazard)}`; return p.reached < 200 ? `(${s})` : s; }).join(' | ');
  for (const pol of ['novice', 'thoughtful']) {
    if (V3[pol]) console.log(`| V3・${LABEL[pol]} | ${V3[pol].pos.split(' ').concat(Array(PCOLS).fill('—')).slice(0, PCOLS).join(' | ').replace(/\//g, '／')} |`);
    for (const flow of flows) if (cellOf(flow, pol)) console.log(`| ${LABEL[pol]}・${flow} | ${posRow(cellOf(flow, pol))} |`);
  }

  // 每手拆解（11-17；門檻流程每支策略）：第 1–2／3–4／5／6–9／10 位的你剋中／被剋／比星（含剋不動）／剋不動／他讀你那手／半指／不露／每手淨聲望（扣他−扣你）
  console.log(`\n每手拆解（${GATE}；客人場每手，%；DESIGN §1.1）：剋中／被剋／比星（含剋不動）／剋不動／讀你那手／半指／不露／每手淨聲望\n`);
  console.log('| 策略 | ' + PH_SEGS.map(k => '第 ' + k + ' 位').join(' | ') + ' |');
  console.log('|---|' + PH_SEGS.map(() => '---').join('|') + '|');
  for (const pol of Object.keys(cells[GATE])) { const x = cells[GATE][pol];
    console.log(`| ${LABEL[pol] || pol} | ` + PH_SEGS.map(k => { const H = x.perHand[k]; return H.n ? [H.counter, H.countered, H.mirror, H.blocked, H.read, H.half, H.none].map(p0).join('／') + '／' + f2(H.net) : '—'; }).join(' | ') + ' |'); }

  if (APEX) {                                                            // 頂點卡發動（--apex；只算客人場，序章不開）
    console.log(`\n頂點卡發動（客人場；發動那手的勝負＝那手扣他的 vs 他扣你的，回聲望不算在內）：\n`);
    console.log('| 策略 | 流程 | 發動率（每場） | 平均第幾手 | 第 1／2／3／4／5／6 手（%） | 那手 贏／平／輸 | 那手淨賺（扣他−扣你） | 能力改了幾點 | 那手作用到 | 整場作用手數 | 回聲望 | 看穿 真／唬 | 場勝率 發動／沒發動 |' + (ENC_ON ? ' 翻面再發動（每場） |' : ''));
    console.log('|---|---|---|---|---|---|---|---|---|---|---|---|---|' + (ENC_ON ? '---|' : ''));
    for (const x of rows) { const a = x.apex; if (!a) continue; const u = a.used || 1;
      console.log(`| ${LABEL[x.pol] || x.pol} | ${x.flow} | ${pct(a.useRate)} | ${f2(a.n)} | ${a.nHist.map(k => p0(k / u)).join('／')} | ${p0(a.handWin)}／${p0(a.handTie)}／${p0(a.handLose)} | ${f2(a.net)} | ${f2(a.d)} | ${pct(a.hitHand)} | ${f2(a.hitsPerFight)} | ${f2(a.heal)} | ${a.rev.honest}／${a.rev.bluff} | ${pct(a.winUsed)}／${pct(a.winUnused)} |` + (ENC_ON ? ` ${pct(a.again)} |` : '')); }
  }
  if (ENC_ON) printEnc(rows);                                            // 第 I 波翻面（--encore off 不印）

  if (FAC) {                                                             // 第 D 波棒二：流派被動（--fac；客人場，序章沒有）
    const FZ = { full: '整張', borrow: '借', underdog: '以小搏大', crit: '拆穿', crit2: '爆擊', heal: '回聲望', leech: '吸血', loseCost: '比星輸', cCost: '被剋', tieCost: '平手', thorn: '反傷', cut: '少扣',
      spine: '刺蝟', insider: '圈內人', deep: '深耕回' };
    const own = ACE_T ? FAC_OWN[ACE_T] : [].concat(...Object.values(FAC_OWN)), pk = {};
    for (const t of TIERS) for (const p of (C.factions[t] && C.factions[t].picks) || []) pk[p.id] = p.name;
    console.log(`\n流派被動（${ACE_T ? C.factions[ACE_T].name : '三派輪流'}${NOFACPICK ? '；--nofacpick 本派選項不出' : '；本派選項每 ' + C.factions.levelEvery + ' 級'}${FACFX ? '；--facfx ' + JSON.stringify(FACFX) : ''}${APEX ? '；--apex 同開：換一格 ' + (C.factions.apexSwap && C.factions.apexSwap.on !== false ? '開' : '關（只標示）') : ''}${FACTAL_FOR ? '；派樹 ' + (ACE_T ? JSON.stringify(FACTAL_FOR(ACE_T)) : FACTAL_ARG) : ''}；客人場每場平均觸發幾手（深耕回＝每場多回幾聲望）；本派選項＝每趟拿到的比例）：\n`);
    console.log('| 策略 | 流程 | 場數 | 每場觸發 ' + FAC_KEYS.map(k => FZ[k]).join('／') + ' | 被動或代價（F4） | 本派選項 |');
    console.log('|---|---|---|---|---|---|');
    for (const x of rows) { const F = x.fac; if (!F) continue; const pf = F.perFight;
      console.log(`| ${LABEL[x.pol] || x.pol} | ${x.flow} | ${F.fights} | ${FAC_KEYS.map(k => f2(pf[k] || 0)).join('／')} | ${f2(own.reduce((s, k) => s + (pf[k] || 0), 0))} | ${Object.entries(F.picks).sort((a, b) => b[1] - a[1]).map(([k, v]) => (pk[k] || k) + ' ' + p0(v) + '%').join('、') || '—'} |`); }
  }
  if (rows.some(x => x.lot)) {                                           // 一檔貨（第 B 波；lot 關不印）
    const L0 = EN.lotCfg(C), dz = d => d ? `${d.median}／${d.min}／${pct(d.zero)}` : '—', f1 = x => x == null ? '—' : x.toFixed(1);
    console.log(`\n一檔貨（每輪抽一檔 ${L0.size} 張、FEATURE ${L0.feature}；每位架上每箱 ${L0.show}、FEATURE ${L0.featureShow}${L0.firstShow ? '、第 1 輪每箱 ' + L0.firstShow : ''}；第 1 檔${L0.firstCurated ? '從策展池' : '從全卡池'}；smart、每位第一次走到時的架子）：\n`);
    console.log('| 策略 | 流程 | 完整一輪看到幾張不同的 全部（第 1 輪／第 2 輪起） | 其中 FEATURE（第 1 輪／第 2 輪起） | 每位架上幾張 | 剋下一位主屬性那軸 ≥4 星 中位／最小／0 張 | 第 1 輪 | ' + (BROWSE < 16 ? `打開的 ${BROWSE} 箱裡 | ` : '') + '每趟從架上買 唱片／其中 FEATURE | 包包強度 第 10／20 位 | 架上稀有度 普通／稀有／獨特／史詩／傳奇（%） |');
    console.log('|---|---|---|---|---|---|---|' + (BROWSE < 16 ? '---|' : '') + '---|---|---|');
    for (const x of rows) { const l = x.lot; if (!l) continue;
      console.log(`| ${LABEL[x.pol] || x.pol} | ${x.flow} | ${f1(l.seen)}（${f1(l.seen1)}／${f1(l.seen2)}） | ${f1(l.seenF)}（${f1(l.seenF1)}／${f1(l.seenF2)}） | ${f1(l.shelf)} | ${dz(l.good)} | ${dz(l.good1)} | ${BROWSE < 16 ? dz(l.goodOpen) + ' | ' : ''}${f2(l.buy)}／${f2(l.buyF)} | ${f2(l.bag10)}／${f2(l.bag20)} | ${SHELF_RAR.map(r => pt(l.rar[r])).join('／')} |`); }
  }
  if (rows.some(x => x.want)) {                                          // 想要清單（--want N）
    console.log(`\n想要清單（--want ${WANT_N}；每檔每張擲 ${EN.lotCfg(C).wantP}、一檔最多 ${EN.lotCfg(C).wantMax} 張；第 1 檔來源是策展池、第 2 檔起全卡池）：\n`);
    console.log('| 策略 | 流程 | 第 1 檔：檔數／每檔進來幾張／每張每檔（÷N）／合規幾張／每張每檔（÷合規） | 第 2 檔起：檔數／每檔進來幾張／每張每檔（÷N）／合規幾張／每張每檔（÷合規） | 每趟架上看到幾次 | 每趟從架上買到幾張 |');
    console.log('|---|---|---|---|---|---|');
    const w1 = o => `${o.lots}／${f2(o.perLot)}／${pct(o.perCard)}／${f2(o.eligPerLot)}／${pct(o.perElig)}`;
    for (const x of rows) { const w = x.want; if (!w) continue;
      console.log(`| ${LABEL[x.pol] || x.pol} | ${x.flow} | ${w1(w.l1)} | ${w1(w.l2)} | ${f2(w.onShelf)} | ${f2(w.bought)} |`); }
  }

  if (WC_ON) printWC(rows);                                              // 第 C 波（全關不印）
  if (MK_ON) printMk(rows);                                              // 第 I 波 I-3a 市集（--market off 不印）
  if (SPAR_ON) printSpar(rows);                                          // 活店切磋（--enc off 不印）
  if (D1EX) {                                                            // 第 D 波：試煉過關率（到第 21 位＝打倒第 20 位藏家）＋每趟樂歷（careerGain：沒破紀錄、沒倍率）
    console.log(`\n第 D 波：到第 21 位（打倒第 20 位藏家＝試煉過關）、每趟樂歷（基本＝15×位數＋8×最多連贏；路線＝截過的，括號未截）${TIER ? '；試煉第 ' + TIER + ' 階' : ''}：\n`);
    console.log('| 策略 | 流程 | 到第 21 位 | 開局 品味／底氣／聲望上限 | 樂歷 基本＋路線（未截）／演唱會 |');
    console.log('|---|---|---|---|---|');
    for (const x of rows) { if (x.reach21 == null) continue; const L = x.lexp;
      console.log(`| ${LABEL[x.pol] || x.pol} | ${x.flow} | ${pct(x.reach21)} | ${TALENT ? [(TALENT.atk | 0), (TALENT.def | 0), EN.trialCfg(C, TIER).youHp + 2 * (TALENT.hp | 0)].join('／') : '0／0／' + EN.trialCfg(C, TIER).youHp} | ${Math.round(L.base)}＋${Math.round(L.route)}（${Math.round(L.raw)}）／${Math.round(L.gig)} |`); }
  }
  if (FROM) {                                                            // 中繼點開局（--from N；只印；C1 列參考，要 --cpbase）
    console.log(`\n中繼點開局（從第 ${FROM} 位開；第一場是藏家）：\n`);
    console.log(`| 策略 | 流程 | 深度 中位（p25–p75）／平均 | 撐過 5 位（到第 ${FROM + 5} 位） | 撐過 10 位（到第 ${FROM + 10} 位） | 第 ${FROM} 位（第一場）死亡率 | 客人場勝率 |`);
    console.log('|---|---|---|---|---|---|---|');
    for (const x of rows) { const c = x.cp; if (!c) continue; console.log(`| ${LABEL[x.pol] || x.pol} | ${x.flow} | ${c.median}（${c.p25}–${c.p75}）／${c.mean.toFixed(1)} | ${pct(c.reach5)} | ${pct(c.reach10)} | ${pct(c.first)} | ${pct(x.win)} |`); }
    // C1（參考，SPEC-C §8；驗收修正：第 50 位也比、加下限）：從中繼點開的 10 位存活率 − 從頭打到第 N 位的人再撐 10 位，在 −8～+3 點內（--cpbase）
    const bp = CPBASE && CPBASE.runs && CPBASE.runs.smart && CPBASE.runs.smart.thoughtful && CPBASE.runs.smart.thoughtful.pos, cpT = cellOf(GATE, 'thoughtful');
    if (cpT && cpT.cp) {
      const a = bp && bp.find(o => o.d === FROM), b = bp && bp.find(o => o.d === FROM + 10), nm = `［${GATE}］中繼點開局：從第 ${FROM} 位開的 10 位存活率，跟從頭打到那裡的比在 −8～+3 點內（會讀的）`;
      if (a && b && a.reached >= 100) { const base = b.reached / a.reached, d = cpT.cp.reach10 - base;
        const okc = d >= -0.08 - 1e-9 && d <= 0.03 + 1e-9;
        refs.push({ id: 'C1', name: nm, ok: okc, info: `${pct(cpT.cp.reach10)} 對 從頭打 ${pct(base)}（${b.reached}/${a.reached} 趟；${(d >= 0 ? '+' : '') + pt(d)} 點）` + (okc ? '［在範圍內］' : '［不在範圍內］') }); }
      else refs.push({ id: 'C1', name: nm, ok: null, info: `${pct(cpT.cp.reach10)}；${CPBASE ? '--cpbase 打到第 ' + FROM + ' 位的不到 100 趟（或沒有第 ' + (FROM + 10) + ' 位）' : '沒給 --cpbase（新帳號 會讀的 smart 的 --json）'}，只列` });
    }
  }

  if (UNLOCK) {                                                          // 頂點卡收集（--unlock：每趟新玩家，只解鎖這一派）
    console.log(`\n頂點卡收集（--unlock：每一趟都是新玩家、只解鎖這一派；打倒藏家收他帶的那張：被剋鏈${APEX ? '→ 三派都開後收試做卡' : ''}）：\n`);
    console.log('| 策略 | 流程 | 每趟收幾張 | 收到 ≥1／≥2／≥3／≥4 張（%） | 解鎖第 2 派／第 3 派（%） | 其中試做卡 |');
    console.log('|---|---|---|---|---|---|');
    for (const x of rows) { const u = x.unlock; if (!u) continue;
      console.log(`| ${LABEL[x.pol] || x.pol} | ${x.flow} | ${f2(u.aces)} | ${u.atLeast.map(p0).join('／')} | ${p0(u.unlock2)}／${p0(u.unlock3)} | ${f2(u.trialAces)} |`); }
  }

  // 跟 ../curve/results.md 的 V3 比（新帳號）
  console.log(`\n跟 V3（../curve/results.md，harness：包包整趟不換、沒有商店／獎勵／配件、沒有放水唬人）比：\n`);
  console.log('| 誰 | 來源 | 深度 中位／平均 | 不說情平均 | 到第 5／10／20／50／100 位（%） | 第 1–3 位死 | 一場幾手 | 打到第 6 手 | 死在比聲望條 |');
  console.log('|---|---|---|---|---|---|---|---|---|');
  for (const pol of ['novice', 'thoughtful']) {
    const v = V3[pol];
    console.log(`| ${LABEL[pol]} | V3 | ${v.median}／${v.mean} | ${v.nrMean} | ${v.reach.map(p0).join('／')} | ${pct(v.die13)} | ${v.hands} | ${pct(v.r6)} | ${pct(v.byBar)} |`);
    for (const flow of flows) { const x = cellOf(flow, pol); if (x) console.log(`| ${LABEL[pol]} | ${flow} | ${x.median}／${x.mean.toFixed(1)} | ${x.noRetry.mean.toFixed(1)} | ${reachStr(x)} | ${pct(x.die13)} | ${f2(x.hands)} | ${pct(x.r6)} | ${pct(x.deaths.byBar)} |`); }
  }

  // ---- 門檻（--gate 流程；--from 中繼點開局不判，只印中繼點開局表，M6、HP 照判）----
  const G = FROM ? {} : cells[GATE], TH = G.thoughtful, NV = G.novice, RD = G.random, HR = G.humanRead, OR = G.oldReader, FM = G.formula, MR = G.mirrorHint, tag = `［${GATE}］`;
  if (NV) {                                                              // T1 照沒保底量（SPEC-C §13-15）：加了 --safety 只列參考
    const t1 = [`${tag}新手 第 1–3 位死亡 8–15%（前期要有挑戰，見檔頭）`, NV.die13 >= 0.08 - 1e-9 && NV.die13 <= 0.15 + 1e-9, `${pct(NV.die13)}（V3 2%；11-16 前期加難前 smart 1.5%）`];
    if (SAFETY) refs.push({ id: 'T1', name: t1[0], ok: t1[1], info: t1[2] + '；加了 --safety（新手保底）只列參考，T1 照沒保底量' }); else check('T1', ...t1);
  }
  if (TH) check('T1b', `${tag}會讀的 第 1–3 位死亡 ≤3%`, TH.die13 <= 0.03 + 1e-9, `${pct(TH.die13)}（V3 0%）`);
  // 11-17 讀牌加難（DESIGN §1.4）：T2a 改看一般玩家、T2c 新手走不遠、T2b 改看到第 50 位；R1–R4 讀牌要有用、舊讀法會被騙、沒有安全牌、會讀的前 10 位不靠運氣
  if (HR) check('T2a', `${tag}一般玩家 深度中位數 15–35（會看提示、知道會被唬的人走到第 10–30 位上下）`, HR.median >= 15 && HR.median <= 35, `中位 ${HR.median}、平均 ${HR.mean.toFixed(1)}`);
  if (NV) check('T2c', `${tag}新手 深度中位數 4–8、到第 10 位 15–35%（只會照提示剋走不遠）`, NV.median >= 4 && NV.median <= 8 && NV.reach[1] >= 0.15 - 1e-9 && NV.reach[1] <= 0.35 + 1e-9,
    `中位 ${NV.median}、平均 ${NV.mean.toFixed(1)}、到第 10 位 ${pct(NV.reach[1])}`);
  if (TH) check('T2b', `${tag}會讀的 到第 50 位 8–30%（到第 100 位只記錄）`, TH.reach[3] >= 0.08 - 1e-9 && TH.reach[3] <= 0.30 + 1e-9, `到第 50 位 ${pct(TH.reach[3])}、到第 100 位 ${pct(TH.reach[4])}、中位 ${TH.median}`);
  if (TH && NV) check('R1', `${tag}讀牌拉開差距：會讀的 − 新手 到第 10 位 ≥ 50 點`, TH.reach[1] - NV.reach[1] >= 0.50 - 1e-9, `${pt(TH.reach[1])} − ${pt(NV.reach[1])} ＝ ${pt(TH.reach[1] - NV.reach[1])} 點`);
  if (OR) check('R2', `${tag}舊讀法會被騙：舊腦袋 到第 10 位 55–80%`, OR.reach[1] >= 0.55 - 1e-9 && OR.reach[1] <= 0.80 + 1e-9, `${pct(OR.reach[1])}、中位 ${OR.median}`);
  if (MR) check('R3', `${tag}沒有安全牌：跟提示同色 到第 10 位 ≤10%`, MR.reach[1] <= 0.10 + 1e-9, pct(MR.reach[1]));
  if (FM && TH) check('R3', `${tag}背公式不等於會讀：兩步公式 到第 10 位 ≤ 會讀的 −8 點`, FM.reach[1] <= TH.reach[1] - 0.08 + 1e-9, `${pct(FM.reach[1])} 對 ${pct(TH.reach[1])}`);
  if (TH) {
    const w1 = d => { const p = TH.pos.find(o => o.d === d); return p ? p.win1 : null; };
    const lo = [1, 2, 3, 4, 6, 7, 8, 9].filter(d => w1(d) != null && w1(d) < 0.92 - 1e-9), lb = [5, 10].filter(d => w1(d) != null && w1(d) < 0.82 - 1e-9);
    check('R4', `${tag}會讀的前 10 位不靠運氣：第 1–4、6–9 位首戰 ≥92%；第 5、10 位 ≥82%`, !lo.length && !lb.length && [1, 5, 10].every(d => w1(d) != null),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(d => p0(w1(d))).join(' ') + (lo.length || lb.length ? '（沒過：第 ' + lo.concat(lb).join('、') + ' 位）' : ''));
  }
  if (TH) {                                                              // T3 n ≥ T3_N 才照 2–4 倍判；更小只列參考，偏離 2 個標準誤以上才算沒過（檔頭）
    let hb = 0, hn = 0; for (const p of TH.pos) if (p.d >= 4 && p.reached >= 200) { if (p.cls === 'boss') hb += Math.round(p.hazard * p.reached); else hn += Math.round(p.hazard * p.reached); }
    const r = TH.bossRatio, se = r != null && hb && hn ? r * Math.sqrt(1 / hb + 1 / hn) : null;   // 對數比的 Poisson 標準誤
    const inBand = r != null && r >= 2 - 1e-9 && r <= 4 + 1e-9, far = r == null || se == null || r + 2 * se < 2 || r - 2 * se > 4;
    const name = `${tag}會讀的 藏家位死亡率是非藏家位的 2–4 倍（第 4–60 位）`;
    const info = `${pct(TH.hazBoss)} ÷ ${pct(TH.hazNon)} = ${r == null ? '—' : r.toFixed(2)}${se == null ? '' : '±' + se.toFixed(2)} 倍（V3 13–20% 對 5–7%）`;
    if (TH.n >= T3_N || (!inBand && far)) check('T3', name, inBand, info);
    else refs.push({ id: 'T3', name, ok: inBand, info: info + `；n ${TH.n} < ${T3_N} 只列參考（${inBand ? '在 2–4 倍內' : '差在 2 個標準誤內＝抽樣'}），判 T3 用 --n ${T3_N} --policies thoughtful --flows smart` });
  }
  for (const x of [NV, TH]) if (x) check('T4', `${tag}${LABEL[x.pol]} 相鄰非藏家位首戰勝率掉 ≤20 點`, x.cliff.drop <= 0.20 + 1e-9,
    x.cliff.at ? `第 ${x.cliff.from}→${x.cliff.at} 位 ${pt(x.cliff.w0)}→${pt(x.cliff.w1)}（${pt(x.cliff.drop)} 點）` : '沒有下跌');
  for (const x of [NV, TH]) if (x) { const lo = x === TH ? 2.5 : 3; check('T5', `${tag}${LABEL[x.pol]} 一場平均 ${lo}–4.5 手`, x.hands >= lo - 1e-9 && x.hands <= 4.5 + 1e-9, `${f2(x.hands)} 手（V3 ${V3[x.pol].hands}）`); }
  if (RD) check('T6', `${tag}亂出 到第 5 位 ≤5%`, RD.reach[0] <= 0.05 + 1e-9, pct(RD.reach[0]));
  if (TH && RD) check('T7', `${tag}會讀的比亂出走得遠（中位 ≥ 亂出 ×2 且 ≥ 亂出 +5）`, TH.median >= 2 * RD.median && TH.median >= RD.median + 5,
    `會讀的 ${TH.median} 對 亂出 ${RD.median}`);
  const mh = Math.max(...rows.map(x => x.maxHands));
  check('M6', '最多 6 手', mh <= CFG.maxRounds, mh);
  if (WC_ON) {                                                           // 第 C 波門檻（SPEC-C §8 定稿；見檔頭）
    const refs0 = refs.length, D_N = 4000, gate = (id, name, okv, info) => { if (N >= D_N) check(id, name, okv, info); else refs.push({ id, name, ok: okv, info: info + `；n ${N} < ${D_N} 只列參考（判 ${id} 用 --n ${D_N}）` }); };
    // 新帳號（D1／D2）：真人第一趟一定有新手保底（ui createRun）→ 要 --safety 才判；沒加只列參考（驗收修正 2026-11-17）
    const gateS = (id, name, okv, info) => { if (SAFETY) return gate(id, name, okv, info); refs.push({ id, name, ok: okv, info: info + `；沒加 --safety 只列參考（新帳號第一趟一定有新手保底：判 ${id} 加 --safety）` }); };
    const B = DBASE && DBASE.runs && DBASE.runs[GATE] ? DBASE.runs[GATE] : null, BT = B && B.thoughtful, BN = B && B.novice;
    if (TH && !FROM && !RET_RELICS) {
      if (BT) gateS('D1', `${tag}C 波不放水：新帳號 會讀的 到第 50 位 ≤ 現況＋4 點`, TH.reach[3] <= BT.reach[3] + 0.04 + 1e-9, `${pct(TH.reach[3])} 對 現況 ${pct(BT.reach[3])}（${(TH.reach[3] - BT.reach[3] >= 0 ? '+' : '') + pt(TH.reach[3] - BT.reach[3])} 點）`);
      else refs.push({ id: 'D1', name: `${tag}C 波不放水：新帳號 會讀的 到第 50 位 ≤ 現況＋4 點`, ok: null, info: `${pct(TH.reach[3])}；沒給 --dbase（同 n、--wc off 的 JSON）只列參考` });
    }
    if (NV && !FROM && !RET_RELICS) gateS('D2', `${tag}C 波不放水：新手 到第 10 位 ≤33%`, NV.reach[1] <= 0.33 + 1e-9, `${pct(NV.reach[1])}${BN ? `（現況 ${pct(BN.reach[1])}）` : ''}`);
    if (TH && RET_RELICS && !FROM) {
      if (BT) gate('D3', `${tag}老玩家不變難也不變簡單：會讀的 到第 50 位在現況 ±4 點內`, Math.abs(TH.reach[3] - BT.reach[3]) <= 0.04 + 1e-9, `${pct(TH.reach[3])} 對 現況 ${pct(BT.reach[3])}（${(TH.reach[3] - BT.reach[3] >= 0 ? '+' : '') + pt(TH.reach[3] - BT.reach[3])} 點）`);
      else refs.push({ id: 'D3', name: `${tag}老玩家 會讀的 到第 50 位在現況 ±4 點內`, ok: null, info: `${pct(TH.reach[3])}；沒給 --dbase 只列參考` });
    }
    if (!FROM) {
      const W = TH && TH.wcx;
      if (W && WCC.stall.on && !COPT_SET) {
        const P = W.pick, judged = WC_KINDS.filter(k => P[k] && P[k].offered >= 50), out = judged.filter(k => !(P[k].rate >= 0.15 - 1e-9 && P[k].rate <= 0.85 + 1e-9)), few = WC_KINDS.filter(k => !P[k] || P[k].offered < 50);
        const zh = k => (C.waveC && C.waveC.stations && C.waveC.stations[k]) || k;
        check('K1', `${tag}選路有差：會讀的 每種站出現時被選 15–85%`, judged.length && !out.length,
          judged.map(k => zh(k) + ' ' + p0(P[k].rate)).join('、') + (out.length ? '（沒過：' + out.map(zh).join('、') + '）' : '') + (few.length ? '；出現 <50 次只列：' + few.map(k => zh(k) + (P[k] ? ' ' + Math.round(P[k].offered) + ' 次' : ' 0 次')).join('、') : ''));
        const dp = P.dare ? P.dare.picked : 0;
        if (dp >= 30) check('K2', `${tag}踢館帖：會讀的 接帖率（接÷走到那站）20–80%`, W.dareRate >= 0.20 - 1e-9 && W.dareRate <= 0.80 + 1e-9, `${pct(W.dareRate)}（走到 ${Math.round(dp)} 次）`);
        else refs.push({ id: 'K2', name: `${tag}踢館帖接帖率 20–80%`, ok: null, info: `走到那站只有 ${Math.round(dp)} 次，不判` });
      }
      if (W && COPT.dare === 'always' && W.dare) {
        const d = W.dare, okv = d.f >= 100 && d.pf >= 100 ? d.w1 >= d.pw1 - 0.10 - 1e-9 : null;
        if (okv == null) refs.push({ id: 'K2', name: `${tag}踢館帖不跳崖`, ok: null, info: `接帖那輪首戰 ${d.f} 場、平常 ${d.pf} 場，太少不判` });
        else check('K2', `${tag}踢館帖不跳崖：接帖那輪首戰勝率比平常少 ≤10 點（--copt dare always、第 31 位起、會讀的）`, okv, `${pct(d.w1)}（${d.f} 場）vs ${pct(d.pw1)}（${(d.w1 - d.pw1 >= 0 ? '+' : '') + pt(d.w1 - d.pw1)} 點）`);
      }
      if (NV && !RET_RELICS) check('K4', `${tag}新手看得到第一趟：新手 到第 5 位 ≥75%`, NV.reach[0] >= 0.75 - 1e-9, pct(NV.reach[0]));
      if (W && (WCC.loot.on || WCC.chest.on || WCC.stall.on)) check('N1', `${tag}新鮮度：會讀的 第 15 位起路上的盤重複 ≤10%、一趟新認識 ≥50 張`, (W.r15dup == null || W.r15dup <= 0.10 + 1e-9) && W.known >= 50 - 1e-9,
        `重複 ${pct(W.r15dup)}（第 15 位起 ${f2(W.k.r15)} 張／趟）、新認識 ${W.known.toFixed(1)} 張`);
      const fx = x => x == null ? '—' : '$' + Math.round(x).toLocaleString('en');
      if (W) refs.push({ id: 'E1', name: `${tag}會讀的花掉幾成 ≥60%`, ok: W.spentShare >= 0.60 - 1e-9, info: pct(W.spentShare) });
      if (NV && NV.wcx) refs.push({ id: 'E2', name: `${tag}新手花掉幾成 ≥40%`, ok: NV.wcx.spentShare >= 0.40 - 1e-9, info: pct(NV.wcx.spentShare) });
      if (W) refs.push({ id: 'E3', name: `${tag}會讀的 每輪開頭的錢中位 ≤ 現況 $41,350 的 60%（$24,810）`, ok: W.rmMed != null && W.rmMed <= 24810, info: `${fx(W.rmMed)}（${W.rmMed != null ? p0(W.rmMed / 41350) + '%' : '—'}；平均 ${fx(W.rmMean)}）` });
      if (W) refs.push({ id: 'E4', name: `${tag}會讀的 樂歷：演唱會 ≤ 基本 25%、路線全部 ≤40%`, ok: W.gigShare <= 0.25 + 1e-9 && W.routeShare <= 0.40 + 1e-9, info: `${pct(W.gigShare)}、${pct(W.routeShare)}（基本 ${Math.round(W.lexpBase)}／趟）` });
      if (TH) refs.push({ id: '100', name: `${tag}會讀的 到第 100 位`, ok: null, info: `${pct(TH.reach[4])}${BT ? `（現況 ${pct(BT.reach[4])}）` : ''}` });
    }
    for (const c of refs.slice(refs0)) if (typeof c.ok === 'boolean') c.info += c.ok ? '［在門檻內］' : '［不在門檻內］';
  }
  if (SPAR_ON && !FROM) sparChecks(cells[GATE], `［${GATE}］`);
  if (LUX) { printLu(rows); luChecks(cells[GATE], `［${GATE}］`); }
  if (MK_ON) mkChecks(cells[GATE], `［${GATE}］`);                         // 第 I 波 I-3a 市集 M3、K1′（--market off 不判）           // 活店切磋 LS1–LS8（LS9＝上面的既有門檻照樣全過；LS0 另跑，見檔頭）
  if (cells.smart && cells.none && cells.smart.thoughtful && cells.none.thoughtful)
    console.log(`\n會讀的：smart − none 深度中位 ${cells.smart.thoughtful.median - cells.none.thoughtful.median} 位、平均 ${(cells.smart.thoughtful.mean - cells.none.thoughtful.mean).toFixed(1)} 位（買東西有沒有用；只列不檢查）`);
}

if (MODE === 'all' || MODE === 'man') {
  const manPols = POLS.filter(p => p !== 'counterHint');
  const mt = {};
  for (const pol of manPols) mt[pol] = fightCell(i => manFight(pol, i), N);
  report.man = mt;
  console.log(`\n### 序章男子（聲望 ${C.enemies[MAN].hp}、你 ${CFG.playerHp}；包包 7 張＝禮物 4＋特價箱三色各一、planner easy、老實；N=${N}）\n`);
  console.log('| 策略 | 勝率 | 平均手數 |'); console.log('|---|---|---|');
  for (const pol of manPols) console.log(`| ${LABEL[pol] || pol} | ${pct(mt[pol].win)} | ${mt[pol].hands.toFixed(2)} |`);
  if (mt.thoughtful) { check('S5', '男子：會讀的 ≥97%', mt.thoughtful.win >= 0.97, pct(mt.thoughtful.win)); check('S5', '男子：會讀的 平均 ≤4 手', mt.thoughtful.hands <= 4, mt.thoughtful.hands.toFixed(2)); }
  if (mt.high) check('S5', '男子：只出最大星 ≥90%', mt.high.win >= 0.90, pct(mt.high.win));
  if (mt.novice) check('S5', '男子：新手（永遠剋提示）≥90%', mt.novice.win >= 0.90, pct(mt.novice.win));
}

// HP：聲望單調——C.trial.guestHp 一般 ≤ 菁英 ≤ 藏家（不靠模擬，每種 --mode 都檢查）
{
  const H = EN.trialCfg(C, TIER).guestHp;
  report.hpOrder = H;
  check('HP', '聲望單調：一般 ≤ 菁英 ≤ 藏家（C.trial.guestHp）', H.normal <= H.elite && H.elite <= H.boss, `一般 ${H.normal}／菁英 ${H.elite}／藏家 ${H.boss}（你 ${EN.trialCfg(C, TIER).youHp}）`);
}

{ const lw = Object.keys(EN.lotWarn || {}); if (lw.length) { report.lotWarn = lw; console.log('\n警告：箱子 ' + lw.join('、') + ' 沒有 all，第 2 檔起退回策展池（--data 的卡沒有 bin？見 C.deriveAll）'); } }
console.log('\n### 門檻（SPEC 無限試煉 §4 第三棒；數字見檔頭）');
for (const c of checks) console.log((c.ok ? '  ok   ' : '  FAIL ') + c.id + ' ' + c.name + (c.info !== undefined ? '：' + c.info : ''));
for (const c of refs) console.log('  參考 ' + c.id + ' ' + c.name + '：' + c.info);
const failed = checks.filter(c => !c.ok);
console.log(`\n${checks.length - failed.length}/${checks.length} 通過${refs.length ? `＋${refs.length} 條參考（${refs.map(c => c.id).join('、')}）` : ''}（${((Date.now() - t0) / 1000).toFixed(1)} 秒）`);
report.checks = checks;
if (refs.length) report.refs = refs;
if (JSON_OUT) fs.writeFileSync(JSON_OUT, JSON.stringify(report, null, 1));
if (TRACE) fs.writeFileSync(TRACE, JSON.stringify(TRACE_OUT));
if (failed.length) process.exitCode = 1;
