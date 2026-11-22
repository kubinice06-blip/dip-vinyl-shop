// game-lab/engine.js — 品味對決 v4 pure rules engine (Agent A1).  SPEC-v4 §2.1（契約一字照做）、§2.2（content 由參數傳入）。
// No DOM, no Math.random, no Date. Every state object is plain JSON (save it as is); RNG = mulberry32 with its integer state in `.rng`.
// Browser: window.DipLabEngine ; Node: module.exports.  Content (content.js) is always passed in, never required.
//
// ============================================================================================================================
// API (VERSION 'lab-4'＝對決狀態；run.v === 5＝無限試煉)
// ----------------------------------------------------------------------------------------------------------------------------
// Constants  ATTRS ['c','o','h'] · ZH {c:'經典',o:'冷門',h:'硬蕊'} · ZH1 {c:'經',o:'冷',h:'硬'} · TIERS · TIER_AXIS · COLOR_RELIC
//            BEATS {o:'c',c:'h',h:'o'} (x beats BEATS[x]) · COUNTER_OF {c:'o',o:'h',h:'c'} (the attr that beats x) · beats(x,y)
//            CFG {playerHp 12, handSize 5, enemyHand 3, bagMax Infinity（包包不限，店主 11-16；--set bagMax=8＝舊規則對照）, retries 1, relicMax 3, threshold 2, maxRounds 6, aceStar 7,
//                 colorRelicBonus 1, dustcoverCut 1, cleanerTie 1, boostStar 1, bargainPick 3, mercy true}  (sim --set k=v 改這裡)
//            手牌 5 張＋王牌（FIXLIST 11：點牌才跳出三個屬性、平時疊成一排錯開；原版起手也是 5）；他的暗手維持 3 張。
//            你 12 聲望（無限試煉 §0；整趟帶著走，＝content.trial.youHp）；客人 12、藏家 14（content.trial.guestHp），一晚版的 9 對 20–28 不用了
// Cards      topAttr(card) 峰值軸，並列 c→o→h · peak(card) max(c,o,h) · deckMain(cards, taste) 牌單主屬性（並列峰值各算一票，票數並列照 taste）
// Clash      clash(p, e, {threshold}) p/e = {attr, star, ace} -> {kind, toE, toP, blocked: null|'gap', by: 'p'|'e'|null}
//              kind ∈ counter|countered|mirrorWin|mirrorLose|tie（mirror＝比星分出勝負，含「剋不動改比星」）
//              王牌沒有「不會被剋」（FIXLIST 2）：王牌＝那軸 7 星，照三相剋＋差 2 星門檻（≤5 星剋不動它；王牌對王牌照三相剋）。p.ace／e.ace 只是標記
//            playerAhead(pHp, pMax, eHp, eMax) 比聲望條剩幾成（hp÷max，一樣算你贏；FIXLIST 3）· hpPct(hp, max) 畫面用的 %（四捨五入、≥0）
//            pctPair(pHp, pMax, eHp, eMax) -> {p, e} 結果句的兩個 %（字串；整數一樣但勝負分得出來時改一位小數，數字永遠跟勝負一致）
//              （v3 墊片：clash(pStar, pAttr, eStar, eAttr) 也收，第二波 B2 改掉 ui.js 的舊呼叫後可刪）
// Duel       enemyDef(content, id, {tutorial, pos?, seedKey?, runNo?, playerAce?, bossAce?, bossCard?, planner?}) -> eDef（pos＝無限試煉第幾位：聲望／品味／底氣／
//              出招難度／說真話機率照位數曲線、牌組照 trialDeck、eDef.ace＝他帶的王牌）· playerDef(content, {bag, ace, relics, hp?, maxHp?, atk?, def?}) -> pDef
//            startDuel(pDef, eDef, {seed, enemyAce?, script?, hintTable?}) -> {duel, events}
//            品味／底氣（SPEC 無限試煉 §0；逐字照 curve harness core.cjs modded＋TAKEN.half）：你剋中（counter 且 toE>0）＋你的品味；
//              half(x, D) = max(ceil(x/2), x−D) 套在被扣的那方（他扣你：先＋他的品味再套你的底氣；你扣他：套他的底氣）。配件先算、再算這兩項；
//              notes 多 {stat:'atk'|'def'|'eAtk'|'eDef', n, text}（text＝C.trial.notes 代入 n）。preview 與 resolve 走同一個 outcome
//            legalActions(duel) · isLegal(duel, act)          act = {i:0..handSize−1（0..4）, attr} | {ace:true}
//            preview(duel, act, eSide) -> {kind,toE,toP,blocked,by,notes}   eSide = {i, attr}（他手牌第 i 張）| {attr, star, ace}（假設值）
//            resolveTurn(duel, act, {forcedPlay?:{i,attr}, debugOutcome?:{kind,toE,toP}}) -> Event[]   (illegal act → [] and nothing changes)
//            view(duel) -> 公開資訊（§2.1.5；不含他這手出哪張、哪色、有沒有唬人）；多 pAtk pDef eAtk eDef、eDeck（公開牌單的星數 {id,c,o,h,tier,plus}）、
//              honesty.qNow（這手放水後的說真話機率的期望值；策略用，畫面不寫）、eTitle（無限試煉的稱號，guestTitle；沒有＝null）、eMain（客人主屬性 'c'|'o'|'h'｜null）
//            bestChip(duel, attr, {ace}) · blockedChoice(duel, attr) -> {i, attr} | null（用 attr 出會被 'gap' 擋下的那張；教學第 5 手）
//            Events {t:'hand', n, hint:{attr, line}, eHandN, pile}
//                   {t:'clash', n, pCard, pAttr, pStar, pBase, ace, eCard, eAttr, eStar, eAce, kind, toE, toP, blocked, by, hint, bluff, notes, pHp, eHp}
//                   {t:'draw', i, card, reshuffled}     {t:'over', win, by:'hp'|'rounds'|'pile', pHp, eHp, pMax, eMax, pPct, ePct, pct:{p,e}}
//            勝負：誰的聲望先 ≤0 誰輸；兩邊同一手都 ≤0、六手打完（rounds）、他牌出完（pile）→ playerAhead（比聲望條剩幾成，一樣算你贏）
//            order per resolve: clash → draw (not after the ace) → over | hand
// Trial      無限試煉（run.v === 5；SPEC 無限試煉 §0–§2、map-engine §F）：序章打完＝第 1 位；一輪 5 位（一般 3、菁英、傳說藏家），打到輸為止；數字全在 content.trial
//            newRun(content, {seedKey, runNo（舊名 nightNo 照收）, ace, prologue?, relics?, bossAce?}) -> run    nextStep(run) → 'prologue'|'fight'|'duel'|'reward'|'level'|'retry'|null
//            current(run, content) · startFight(run, content, {tutorial?}) -> {duel, events, enemyId}   (run.duel already there → {…, events:[], resumed:true})
//            finishFight(run, content, duel?) -> {win, by, enemyId, met:[ids], offer, over, earn, pos, cls, heal, levelUps, aceWon}
//              贏：聲望 = min(上限, max(1, 剩下) + 3)；經驗 一般 2／菁英 3／藏家 4，滿「目前等級＋3」升一級（上限 +1、聲望 +1，再三選一）；連勝 +1；
//                走到中繼點那一位（第 10、20、30、50、75、100 位，之後每 50；SPEC §0「走到就記」：打贏前一位、advance 到那一位時記進 run.checkpoints，第 1 位不算；
//                jumpTo 不記）；打贏藏家 aceWon＝他的王牌（收進唱片櫃，畫面做）
//              輸：連勝歸 0；這一輪還能說情 → pending retry（同一位、同一副牌、聲望回到開打前 run.hpIn）；不能 → over 'dead'（沒有 'clear'）
//            順序：贏 → reward（挑唱片／配件）→ level（有升級才有，連升就連選）→ 下一位（第 5 位打完換新一輪：新面孔、說情重設、商店補貨）
//            classAt(pos) · roundOf(pos) · trialGuest(content, pos, cls) -> {hp, atk, def, planner, q} · trialDeck(content, id, pos, {seedKey, runNo, playerAce, bossAce, bossCard?})
//              -> {deck:[cards], ace, floor, buff, replaced}（換牌、加星、王牌全用 run 的雜湊 seedKey#runNo#pos，不碰對決亂數）
//              組牌快取（第 B 波 WP2-0）：選牌按條件分桶、只取前 k 張、同一組輸入記住（卡池＝content.cards 物件；卡的星數／tier／tune 視為不變），結果跟原本逐字相同；
//              _noCache（API 上的旗標，預設 false）＝true 時 trialDeck／radioPool 走原本的寫法（engine.test #25 對照）
//            roundGuests(run, content) -> [{id, pos, cls, hp, atk, def, hasAce, done, cur, title, main}]（這一輪 5 位）· levelOffer(run, content) -> [{pick:'atk'|'def'|'hp', n}]×3
//            nextCheckpoint(pos, content?) · toCheckpoint(run, content?)（從目前這位到下一個「在前面」的中繼點還有幾位：第 7 位 → 3、走到第 10 位 → 10）· runSummary(run) -> {reached, bestStreak, taken, wins, level, checkpoints, kept, aces?（解鎖制：這一趟收的頂點卡）}
//            restock(run, content)（每輪開頭補貨：箱子、櫃檯、特價箱；扣掉包包裡的）· fixBins(run, content)（舊存檔：只補缺的區、丟掉沒有的區；回 true＝有改）· fixBargain(run, content)（舊存檔停在開局特價箱還沒挑、箱子還擺換下來的舊牌：用現在的池子重擺；回 true＝有改）· jumpTo(run, content, pos)（?debug=1 的 __lab：直接跳到第 n 位）
//            第 A 波（店主 11-16）：
//              放水照位數機率：mercyPAt(content, pos, tier?)＝第 11 位起每手放水的機率（C.trial.curve.mercyP；第 1–10 位 1）。enemyDef 帶 eDef.mercyP（<1 才有）→
//                startDuel 存 e.mercyP、e.mercyKey（＝對決種子）；beginHand 這手放不放水＝hash01('mercy#'＋mercyKey＋'#'＋n) < mercyP（不取 duel.rng，每手照樣 8 次；
//                plan.mercy 記結果）。不放水的手：出招不鈍化（mercy 0）、說真話機率＝q。view.honesty.qNow＝期望值 1−(1−q)(1−qMercy×mercy×mercyP)
//              稱號：titleAt(content, pos, tier?)＝C.trial.titles[min(末, ⌊(位−1)/titleEvery⌋)]；guestTitle(content, pos, id, cls?, tier?)＝要顯示的（藏家、跟名字一樣＝null）
//              客人主屬性：roundMains(content, seedKey, runNo, 輪, order?) -> [5 個 'c'|'o'|'h']（一般 3 位三色各一，照「原本牌組的主屬性」對上最多的排列、一樣多照雜湊；
//                菁英／藏家照種子輪）· mainAt(run, content, pos) · guestDef(run, content, id, pos)（＝startFight／roundGuests／shopPolicy 用的 eDef，含 main、title、mercyP）
//                run.mainFrom＝第幾位起帶主屬性（newRun 1）；fixMain(run)：主屬性以前存的進行中 run（沒有 mainFrom）載入時補——這一輪開打過＝下一輪起才帶（說情重打＝同一副牌）
//                trialDeck 多收 o.main：牌組至少 round(deck.mainShare×張數) 張主屬性那軸最高的牌、其他格子另外兩軸輪流補、加星加在主屬性那軸；沒給 main／mainShare 0＝舊規則
//              出招偏主屬性（第 A 波審查）：C.trial.curve.mainBias {from, n}＝第 from 位起 enemyDef 帶 eDef.mainBias → startDuel 存 e.mainBias；
//                beginHand 挑計畫時主屬性那色的星數多算 n（不多取亂數）。duel.log 每手多記打完的 pHp／eHp（＋heal＝這手實際回的聲望，有才記）
//              櫃檯賣給老闆：移出包包只有 choose sell（見下面 Economy／sellQuote）；take 的 dropId、buy 的 sellId、buyBargain 的 sellIds → 'counterOnly'（不限張數時）
//            run 多 pos(1 起) round idx(輪內 0–4) order(這一輪 5 位) hp maxHp hpIn level xp atk def levelUps picks streak bestStreak checkpoints taken(收了幾張)
//            choose(run, content, ch) -> {ok, effects} | {ok:false, error}
//              ch: take／relic／skip／retry／end（v3）＋ bargainPick／buy／buyBargain／buyRelic（§2.1.6；錯的選擇完全不改 run）＋ level {pick:'atk'|'def'|'hp'}
//              賣回（第 A 波起只走櫃檯 sell；下面 buy {sellId}／buyBargain {sellIds} 只剩 --set bagMax=8 舊規則那條路）：只收包包裡、不是老闆送的（isGift）、不是種子（isSeed）的卡；送的 → 'giftNoSell'、種子 → 'seedNoSell'
//              buyBargain {ids:[1–3], sellIds?}：每張照特價（bargainPriceOf）分開算、一次付總和；effects 每張 {gainCard, spend: 那張的價}
//            包包不限張數（店主 11-16「手牌不要只限八張，可以無限多直到結束才重置」；CFG.bagMax＝Infinity，一趟結束 newRun 才重置，不跨趟）：
//              take 不用 dropId、buy 不用 sellId、buyBargain 不用 sellIds——第 A 波（店主 11-16「要去櫃檯賣給老闆才能移出包包」）：給了就 'counterOnly'（run 不動）；
//              bargainPick、收音機不會 'bagFull'。sell {cardId}：櫃檯賣給老闆，canShop（兩位客人之間）時賣一張：一般唱片半價；老闆送的、種子＝老闆收回 $0
//              （effects {loseCard, earn: 0, reclaim:'gift'|'seed'}；從 run.gifts／run.seeds 拿掉）。sellQuote(run, content, id) -> {ok, earn, reclaim} | {ok:false, error}（同一套檢查、不改 run）。
//              賣完包包不能少於手牌張數（CFG.handSize 5）→ 'bagMin'。bagCap()（Infinity｜n）· bagLimited() · bagFull(run)
//              有上限時（sim --set bagMax=8）take／buy／buyBargain／runPolicy／shopPolicy 走舊規則那條路（逐字照舊；sell 照樣可用）
//            策略判斷「值不值得放進包包」：bagScore(content, ids)＝手牌 5 張每軸最大星的期望值三軸加總（精確解）；bagGain(run, content, id, drop?)＝收這張漲多少（負＝稀釋）
//              runPolicy 收獎勵：挑漲最多的那張，漲不到 0.005 就不拿；shopPolicy 'smart'：舊挑法＋要漲才買、不用賣，買完 thinPolicy 瘦身
//              thinPolicy(run, content) -> [{type:'sell', cardId}]：賣掉每一軸都排不進包包前 5 名的牌（deadWeight；第 A 波起送的、種子也交還 $0，先賣有錢拿的；包包剩 5 張停）
//            canShop(run) · canBargainPick(run)
//            收音機轉頻率（v5 第六項第二期，店主 11-15）：choose {type:'radio', cell}（cell＝八格之一，content.tunes.order）：canShop 才能轉（兩位客人之間）、每輪一次（第二次 → 'used'）；
//              抽卡池 radioPool(run, content, cell)＝trialPool（非頂點）∩ tune===cell ∩ SHELF_RARITY（普通／稀有／獨特）− 包包 − 現在架上的（一檔貨＝這一位的架子；之後幾位 shelve 跳過收音機那張）− 特價箱（池子 9 張與現在擺的）；
//              空的 → 'empty'（不算轉過、什麼都不改）。種子＝seedKey#runNo#radio#輪#cell（獨立，不碰 run.rng、不碰補貨）。抽到的放進 run.shop.bargain 第一格、記 run.shop.radio＝{cell, id}；
//              effects [{radio: cell, card: id}]。canRadio(run)＝canShop 且這輪還沒轉。tune 只用在抽卡池，outcome／星數不讀它（頻率不進戰鬥規則）
//            bargainPriceIn(run, content, id)：特價箱這一格的價＝電台那張照原價（priceOf：稀有度價；特價箱封頂 $300 會被低買高賣）、其他照 bargainPriceOf；buyBargain 用它
// Seeds      從唱片櫃挑牌開局（SPEC 從唱片櫃挑牌開局 §0–§1；引擎不碰存檔：「擁有」由畫面傳進來，owned＝函式 id→bool｜陣列｜{id: truthy}）
//            newRun 多收 seeds:[ids]（0–3 張，CFG.seedMax；第 D 波 o.seedMax 蓋過）：序章那一趟不收；頂點卡、不存在的卡、重複的丟掉。包包＝種子＋老闆送的（這次王牌那組）補到 4 張
//              （種子跟送的重複：送的往下補下一張）；特價箱 3 張照舊 → 7 張。run.seeds＝包包裡從唱片櫃帶來的（不能賣回換錢；第 A 波起可以在櫃檯交還老闆 $0，
//              交還就不再是種子；舊規則路 buy／buyBargain → 'seedNoSell'）；run.gifts＝這一趟實際放進包包的老闆送的（isGift 照它）
//            canSeed(content, id)（卡存在、不是頂點卡）· isSeed(run, content, id) · seedPolicy(content, ids, n?)（自動遊玩：照最高星挑；同星看總星、再看 id）
//            bossAceFor(seedKey, runNo, ace)（這一趟藏家帶哪張王牌＝newRun 的 run.bossAce；存檔遷移用）
//            這一趟出現過的：run.entered＝進過包包的（獎勵、買的、特價箱的；老闆送的、種子不算）、run.drops＝客人掉落（打贏客人的獎勵候選，沒拿的也算；序章男子掉的 Eminem 也算：它在他牌組裡、他一定打出來，店主 11-13）
//            keepCandidates(run, content, owned) -> [ids]（一趟留一張的候選：entered＋drops，已經擁有的、頂點卡不列）
//            keepOne(run, content, id, owned) -> {ok, error}（只在這一趟結束後、只能一次；run.kept＝那張）
//            runPolicy(run, content, {preferRelic}) · shopPolicy(run, content, 'none'|'smart', {thin?}) -> [ch] · thinPolicy(run, content) -> [ch] · bargainPolicy(run, content) -> ch
// Ace        換王牌（店主 11-13：開局不再三選一、沿用上次那張；想換跟老闆說＝換流派。流派目前只決定王牌那張、老闆送的四張、教學手牌，沒有被動規則）
//            店主 11-16「換流派只能每局一開始，中間不能換」：就是這條（只在第 1 位開打前）；能換到哪派、哪張看解鎖（見 Unlock）
//            canSwitchAce(run, content)：這一趟第 1 位還沒開打（序章那一趟＝序章打完、第 1 位開打前）；run.fought＝這一趟跟客人開打過（startFight 記，序章不算；
//              舊的 run 沒有這欄：第 1 輪的說情用掉了＝打過第 1 位）
//            switchAce(run, content, tier) -> {ok, effects:[{ace, from}, {loseCard}…, {gainCard}…]} | {ok:false, error:'badAce'|'notNow'|'same'}（錯的不改 run）
//              王牌換掉；包包裡老闆送的（run.gifts 還在包包裡的）原位換成新流派那組（照順序、跳過包包裡已經有的：種子、特價箱、買的；不夠就少）；其他不動。
//              run.gifts、run.taken 跟著改；藏家王牌撞到新王牌就重抽（bossAceFor：雜湊，不碰 run.rng）；店裡擺著、現在進了包包的那幾張下架
// Apex       頂點卡純輔助卡試做（店主 11-15；只在 ?apex=1：畫面／sim 每次把 {apex:true} 傳進 startFight，不存在 run 裡）。scratchpad v5/apextrial 的 FRAME.md（規則）、CONTRACT.md（給畫面的 API）。
//            旗標關時下面這些全部不走：duel 沒有 apexMode、run.aceId 不讀，舊行為一字不改（engine.test 逐一驗）。
//            能力資料＝content.apexTrial（hall／pearl／heresy 各 15 張 {card, id, name, text, timing, op, params, hold}；winHeal＝旗標下打贏回幾聲望）。
//            apexList(content, tier) · apexAceId(run, content)（run.aceId 在這派名單裡＝它，否則 C.aces[run.ace]）· abilityOf(content, cardId) · APEX_OPS（原語、參數範圍、可用時機）
//            newRun 多收 aceId；switchAce(run, content, tier, {aceId})：同一派換卡只改 run.aceId（effects [{ace, from, aceId, fromId}]）；換派照舊再設 aceId
//            startFight(run, content, {apex:true})：序章那場不開（序章照舊 7 星教學）；duel.apexMode、duel.p.ability（能力複本）、duel.p.apexOn（null｜{n, heal?, reveal?}）
//              playerDef(content, run, {apex:true}) 的王牌＝apexAceId 那張＋ability；startDuel(pDef, eDef, {apex:true})
//            你的王牌不比星：legalActions 不列 {ace:true}、isLegal 擋 {ace:true}；view.ace＝null（王牌不能當唱片丟）、view.aceCard 照舊
//            canApex(duel)（只會回聲望的能力在聲望滿時＝false，view.apex.full 給畫面寫原因）· activateApex(duel) -> Event[]（[{t:'apex', n, card, id, name, op, timing, heal?, reveal?:'honest'|'bluff', pHp}]；不合法 []、什麼都不改；不取 duel.rng、不推進手數）
//            resolveTurn(duel, {i, attr, apex:true})＝先 activateApex 再結算（act.apex 但 !canApex → 不合法）；preview(duel, {…, apex:true}, eSide)＝假設這手發動（不寫回）
//            時機：hand＝發動那手；duel＝發動那手起到這場結束；hold＝還沒發動前每手套 hold 小效果，發動＝放掉它、換這手的 op。一手最多一個王牌效果
//            outcome 的步驟（FRAME 1.4）：①你 +N 星 ②他 −N 星 ③判相剋（剋得動門檻 pThr、以小搏大）④改寫比星（比星多算、同色同星扣他、比星輸不扣）⑤配件 ⑥品味
//              ⑦剋中多扣→剋中加倍→拆穿（他這手是看得出來的唬（feintOf）而你剋中＝抓到唬人；11-17 起跟結果句的「你看穿了！」同一個判準）⑧彈回一半（他品味前）⑨他的底氣 ⑩他的品味 ⑪你的底氣 ⑫被剋少扣／減半（最少扣 1）⑬拆穿回血（扣完聲望後）
//            clash 事件多 apex: null｜{id, op, src:'on'|'hold', first, hit, dE, dP, d, h, caught, pStar, eStar}；notes 多一句 {apex, op, src, d, h, hit, text}（text＝content.apexTrial.notes／holdNotes 代入）
//            view 多 apex {card, id, name, text, timing, op, params, hold, can, used, on, live:'on'|'hold'|null, full}、apexReveal（看穿：發動那手、揭曉前 'honest'|'bluff'；11-17 起照 feintOf＝結果句的唬：明指出的不是提示那色、半指正好出他說不出那色＝bluff，不露一律 honest）
//            finishFight：duel.apexMode 時打贏回 content.apexTrial.winHeal（沒給＝C.trial.heal）。藏家、客人帶的王牌照舊 7 星、沒有能力
//            策略：policies 在 duel.apexMode 且 canApex 時自己決定發動（會讀的＝期望增益 ≥ APEX_TAU[第 n 手]；整場型第 1 手就發動；回聲望＝聲望 ≤ 上限 − N；
//              看穿＝用「知道真假」的資訊價值；新手、只出最大星、兩步公式、跟提示同色＝第 1 手就發動；亂出＝每手 1/6；先知＝有好處就發動）
// Unlock     流派與頂點卡靠遊戲解鎖（店主 11-16；scratchpad v5/unlock 的 BRIEF.md、CONTRACT.md）。引擎不碰存檔：「擁有」由畫面傳進來（owned＝ownedFn 那三種形狀）
//            TIER_BEATS {pearl:'hall', hall:'heresy', heresy:'pearl'}（流亡剋殿堂、殿堂剋異端、異端剋流亡＝冷剋經、經剋硬、硬剋冷）· unlockChain(start) -> [初始, 它剋的, 再下一派]
//            apexCards(content, tier?)（頂點卡：三派預設＋試做名單，照 TIERS、名單順序）· tierOfApex(content, id)
//            unlockedTiers(content, owned, {start?}) -> [tiers]（擁有那派任一張頂點卡就解鎖；start＝初始流派／目前在玩的那派，一定算）
//            ownedApex(content, owned, {tiers?|start?}) -> [ids]（擁有的頂點卡＋已解鎖各派預設那張）· nextUnlock(tiers) -> tier|null（鎖著、被某個已解鎖的派剋的那派；0 或 3 派＝null）
//            unlockMigrate(content, owned, lastAce) -> {tiers, apex, own:[ids]}（舊存檔：lastAce ∪ 擁有頂點卡的派；own＝要補記成擁有的 lastAce 那派預設那張，src 'start'）
//            newRun 多收 unlocked:[tiers]、start、apexOwned:[ids]（只有旗標開才給）。沒給 unlocked＝舊行為（sim、舊呼叫：三派都能用、藏家照 run.bossAce），run 一個欄位都不多
//              給了：run.unlock {tiers, start, apex:[ids]|null}（開局快照；tiers 一定含 start 與這次的王牌）、run.acesWon [ids]（這一趟打倒藏家收的，每張一次）、
//              run.bossCard（這一輪藏家帶的頂點卡＝bossCardFor：①還有鎖著的派→nextUnlock 那派預設那張 ②三派都開、旗標開→一張還沒擁有的試做卡（先別派；
//              雜湊 seedKey#runNo#bossApex#輪，不碰 run.rng）③其他＝content.aces[run.bossAce] 照舊）；newRun、每輪開頭、jumpTo、switchAce 重算。o.aceId 要擁有才收（旗標開）
//            finishFight 多回 aceFirst（這一趟第一次收這張）、aceNew（開局時還沒擁有）、aceUnlock（這張讓哪一派解鎖｜null）；aceWon＝藏家這場真的帶的那張（duel 牌單裡的頂點卡）
//              run.unlock 時每張新卡 run.taken +1（舊行為：一趟只算一次）
//            unlockTiersOf(run, content) · ownedApexOf(run, content)（開局快照＋這一趟收到的）· aceChoices(run, content) -> {tiers, apex:[ids]|null}（換王牌能換的）
//            switchAce 多兩個錯誤碼：'locked'（那派還鎖著）、'notOwned'（旗標開：那張還沒擁有）；檢查順序 badAce → notNow → locked → notOwned → same
//            fixUnlock(run, content, {unlocked, start?, apexOwned?})：載入存檔時把 run 對齊存檔（畫面每次 loadSave 呼叫；apexOwned 有給＝現在開著 ?apex=1）。
//              舊的進行中 run（沒有 run.unlock）補上快照（打過藏家＝aceWon 那張算這一趟收的）；已經有的換成存檔現在的 tiers／apex（旗標只看網址）；
//              還能換王牌、王牌是沒擁有的試做卡 → 回預設；這一輪藏家的卡重算（藏家那場打到一半／剛打完領獎 → 不動）。回 true＝有改
// Economy    台幣行情（FIXLIST 8＋X／Y 契約；數字在 content.economy，這裡的 ECON 是沒給時的預設）
//            categoryOf(card)：地區台灣 → 'tw'；否則第一個曲風（genre-tree 頂層十類，electronic → 'elec'）；對不到 → null · GENRE_BIN
//            rarityScore(card) ＝ c＋h＋(o===5 ? 1 : 0) · rarity(card) → 'common'≤5｜'rare'6｜'uncommon'7｜'epic'8｜'legendary'≥9｜'apex'（tier hall／pearl／heresy）
//              RARITY（由低到高）· FEATURE_RARITY ['epic','legendary'] · SHELF_RARITY ['common','rare','uncommon'] · SHOP_ORDER（上貨順序）
//            topAxes(card) 峰值那幾軸（並列都算）· bargainLane(card) 特價箱的色（峰值那軸，並列取後面那軸）· priceOf(content, card|id)：特價箱的卡（bargain.pool＋retired 換下的舊特價箱）＝bargainPriceOf；其他＝economy.price[rarity]（800／1000／1200／3000／4000；頂點 8000 先備好、不上架）
//            bargainPriceOf(content, card|id)：economy.bargain[最高星 1–3] ＝ 100／200／300 · relicPrice(content, id)：relics[id].price ?? economy.relicPrice（3000）
//            sellValue(content, card|relicId) ＝ floor(價 × sellRate 0.5) · moneyText(n) ＝ 千分位字串（1200 → '1,200'；C.shopUi 的字串自己帶 '$'）
//            isGift(run, content, id)：老闆送的（這一趟王牌那組的四張＋王牌本身）。第 A 波起櫃檯 sell 收（老闆收回 $0）；舊規則路 buy sellId／buyBargain sellIds 照舊 'giftNoSell'。
//              客人丟的、買的、特價箱的照舊半價。take 的 dropId（拿掉一張）只剩 --set bagMax=8 舊規則那條路（包包滿才要）
//            run.shop（restock：newRun 與每輪開頭；種子＝seedKey#runNo#shop#輪，不碰 run.rng；架上唱片 lot 開時見下面 Lot）：
//              { bins: { [key]: [ids] },     // content.bins（bins.js：每個 key { key, label, zh, pool, front }）的每一區：
//                                            //   feature 2–3 張（economy.featureStock；只抽史詩／傳奇）；jazz tw rock elec soul hiphop citypop classical world folk indierock indiepop blues
//                                            //   new picks 各 4–6 張（economy.stock；只抽普通／稀有／獨特）；照 SHOP_ORDER 上貨、全店同一輪不重複；
//                                            //   不上你的王牌、包包裡的、特價箱的、頂點卡；display:true 的區（舊牆面）不賣
//                relics: [ids],              // 櫃檯 2–3 件（economy.relicStock；relicShop.pool 扣掉身上的）
//                bargain: [ids],             // 特價箱 6 張＝經／冷／硬各 2（bargain.pool 12 張洗牌；「色」＝bargainLane：峰值那軸、並列取後面那軸 硬→冷→經）
//                bargainPicked: boolean,     // 開局挑三張（免費）做過沒；只在第 1 位之前（canBargainPick：run.pos === 1）
//                radio: {cell, id} | null,   // 這一輪收音機轉到的（每輪開頭 restock 清成 null；舊存檔沒有這欄＝這輪還沒轉）
//                firstGuestInside: boolean, // UI 用
//                lot: {…} }                  // 一檔貨（下面 Lot；content.lot.on 關＝沒有這欄、bins 照上面的舊補貨）
// Lot        一檔貨（第 B 波 SPEC-B §3、§5；店主 11-16「固定一大批輪流上架，打完傳說藏家整批換新」）。數字＝content.lot（沒給的欄位用 LOT）：
//              { on: true, size: 100, floor: 5, feature: 6, show: 3, featureShow: 2, firstCurated: true, wantP: 0.35, wantMax: 3, firstShow?: n }
//            run.shop.lot＝{ no＝抽的那輪, src 'cur'（第 1 輪、策展池 bins[k].pool）|'all'（第 2 輪起、全卡池 bins[k].all＝content.deriveAll 推的）,
//              bins {k: [ids]}（輪流上架的順序，想要的排最前）, cur {k: 下一位從第幾張接}, gone [ids]（這一檔從架上買走的，不再上架）,
//              want [ids]（這一檔因為想要清單進來的）, told [ids]（畫面寫：吐司過的；engine 不讀）, fb? [keys]（沒有 all、退回 pool 的箱） }
//            run.want＝想要清單快照（newRun o.want：字串、去重、留最後 200；沒給＝[]；ui 每次載入重同步）。不升 RUN_V（舊 run 沒有 lot → fixLot）
//            restock（newRun、每輪開頭、jumpTo）：收音機清空 → stockBins（舊箱子迴圈原封不動；lot 關＝它就是 run.shop.bins，lot 開＝結果丟掉、只消耗 #shop# 亂數）
//              → 配件 → 特價箱 →（lot 開）drawLot（亂數 seedKey#runNo#lot#輪）→ shelve。→ 配件、特價箱 lot on／off 逐字相同；lot 關＝WP2 以前逐字相同
//            lotQuota(content) -> {k: 張數}：FEATURE feature；其他每箱 floor＋剩下的照各箱 all 張數比例（最大餘數法，同分照 SHOP_ORDER；沒有 all 的箱用 pool）＝合計 size
//            drawLot(run, content)：每箱可抽＝來源 uniq − 查不到 − 稀有度不合（FEATURE 史詩／傳奇、其他普通／稀有／獨特；頂點自然不在）− 特價箱（新舊）− 王牌 − 包包
//              − 前面箱子抽到的（全檔不重複）；第 2 檔起沒有 all（或空）→ 退回 pool、lot.fb、lotWarn[k]＝true（sim 印警告）。想要清單：見 §5（每檔重洗順序、每張擲 wantP、最多 wantMax）
//            shelve(run, content)：每箱從 cur 往後拿 show（FEATURE featureShow；第 1 輪有 firstShow 用它）張，跳過包包、gone、收音機這輪那張、查不到的；繞一圈為止 → run.shop.bins
//            advance：輪首 restock；其他每位客人之間 shelve（沒有檔／不是這一輪的檔先 fixLot）。序章那次直接 return（第 1 位＝newRun 那批）；說情重打不換
//            jumpTo：restock 後再 shelve idx 次（沒買東西時＝正常走到這一位）· choose buy：買走的進 lot.gone（櫃檯賣、特價箱、收音機不動）
//            fixLot(run, content)（ui.js loadSave：舊 run 沒有 lot、形狀壞、不是這一輪的檔）：同種子重抽，先扣掉這一位架上的；這一位架上的排在各箱最前、cur 指在後面
//              → 下一位接著上沒擺過的；架上原樣不動。want／told 不是陣列補 []。lot 關不做。回 true＝有改 · lotOk(run, content)
//            lotLeft(run, key)：這一檔這一箱還沒賣掉的（扣包包、gone、收音機那張；含現在架上的）→ 畫面選空箱字 · stockBins(run, content, st) · LOT · lotCfg · lotWarn
//            fixBins／fixBargain 的暫時 run 帶 want:[]（想要清單不影響補的那幾張）
// Ids        mapIds(v, map, merge?)（第 B 波 SPEC-B §2.2；ui.js migrateIds 呼叫）：深走訪，「整個字串剛好是 map 的鍵、不含 |」的值與物件鍵換成 map[字串]；
//              鍵換完撞在一起 → merge(先的, 後的, 鍵)（沒給＝後蓋前）；不改傳進來的、跑兩次一樣
// Daily      今日推薦集點卡（第 B 波 SPEC-B §4；純函式，存檔與日期在 ui.js）：
//            dailyPick(content, {day, known, owned, want, tunes}) -> id|null：非頂點、非特價、非王牌、沒擁有、沒認識過（想要清單裡的例外）；權重 想要 ×5、tunes（≤2 格）的頻率 ×3（相乘）；
//              k＝hash01('daily#'+day+'#'+id)^(1/w) 取最大（同一天同輸入＝同一張）。known／owned＝函式｜陣列｜{id: 值}
//            dailyReward(content, {n, owned}) -> [3 ids]：史詩／傳奇、非頂點／特價／王牌、沒擁有；經冷硬（topAttr）各取 hash01('dailyReward#'+n+'#'+id) 最小的，缺色從別色補
// WaveC      第 C 波：獎勵與店內攤位（scratchpad v5/wave-c SPEC-C；給畫面的契約 build/CONTRACT.md）。數字＝content.waveC（沒給的用 WAVEC；全關＝舊行為逐字相同）
//            run 多 far0、road、lexp{gig,home,promo,packet,demo}、tickets、chestDry、dare{round,mode}|null、dareLast、consign{card,due}|null、fortune、safety、found、cpFrom?、stats.c（計數）
//              newRun 多收 bestFar、chestDry、safety、from（中繼點開局：pending draft、pos 先 1）；fixWaveC(run, content, {bestFar, chestDry})＝舊 run 補欄位、濾掉不在卡池的 id
//            打贏一般／菁英 → pending reward kind 'loot'（三張蓋牌 cards／src／gold／packet、skipCash 400）；藏家 → kind 'chest'（踢館帖撐完四張＋$5,000：out.dareCash）；
//              take 收的＝撿來的（run.found：sellCore 賣回 $400）；skip 有 kind＝+$400（effects {cash}）；finishFight 多回 packetCash（紅包已入帳的那筆）
//            輸：序章照舊 → run.safety 而且第 1 位 → pending retry {free, safety}（新手保底一次）→ 說情 → 死
//            advance 換輪（補貨之後）→ pending stall {after, cp, first, groups:[[k,k],[k,k]], pick, q, k, post, cur, done}；choose stallPick {group}、stallAct {act,…}、stallLeave；
//              stallResume(run, content)（cur 是 null 而且 k<q.length → 重進那一站）；guestDef／roundGuests 帶踢館帖（dare）、roundGuests 藏家格帶算命（fortune）
//            choose draft {cardId}|{pick}（中繼點開局選秀；做完 pos＝N）；canBargainPick／canSwitchAce 看 run.cpFrom
//            sellCore(run, content, id)（賣回規則，不看時機）＝sellQuote 去掉 canShop；keepCandidates 扣 stats.bought；客人補償 trialGuest 加 content.trial.guestHpSteps
//            setCtx({owned, tunes})（畫面 boot 設一次；金邊、公關片先扣擁有的、公關片兩格頻率 ×3；sim 不設）· gigPrice · gigKeepN · lexpBase · stallLadder · stallUnlocked
//            draftPlan · expLevel · wcCfg · wcTh · wcPool · floorAt · lootRow · chestRow · stallSession · cPolicy（runPolicy 遇到 stall／draft 交給它）
// Career     第 D 波樂歷（scratchpad v5/wave-d SPEC-D §2；給畫面的契約 build1/CONTRACT.md）。純函式、不碰存檔；數字＝content.career（沒給的用 CAREER）
//            newRun 多收 talent {atk, def, hp, xp, plea, money, pay, rare}、seedMax、relicPick、goldAdd（＝talentArgs 給的；全沒給／全 0＝run 一個欄位都不多）
//              → run 多 talent（非 0 的級數）、xpMul／xpFrac（局內經驗）、plea（備用說情）、payMul（酬勞）、goldAdd（戰利品列金邊 +n）、relicPick（菁英／藏家配件幾選一）
//            輸：序章 → 新手保底（第 1 位）→ 這一輪的說情（retryLeft）→ 備用說情（run.plea：pending retry {plea:true}；choose retry 扣 run.plea、不每輪補）→ 死
//            careerCfg · careerGain(content, runSummary(run), {best, tier, quit, open}) · posFought(run)（放棄時站著那一位打完了沒）· careerLevel(content, xp) · careerXpAt · careerPoints(content, career) · talentCost · talentOpen
//            talentBuy／talentSell／careerRespec（回新的 career）· talentArgs(content, career) · applyTalent · gigRoom(run, content) · ladderList／ladderAt／ladderNext
//            careerDraw(content, key, level, owned) · profLevel · profGain · profFirst · careerDeposit(content, save) · careerFix(content, career) · seedsOf(content, ids, max)
//            第 I 波 I-0（SPEC-I §7；契約 wave-i/build0/CONTRACT.md）：curve.table（100／150／250／350／500／650／800）· careerGain 多收 first（第一趟保底到 lexp.firstLv、回 first＝補了幾點）、
//              lowMul（覆寫新手倍率；顯示用）· careerLive(content, run, {best, tier, xp})（一趟裡的樂歷細條）· careerRecurve(content, career)（曲線改了補抽的等級）
//            局內：xpNeed(T, level)（Lv1→2＝trial.firstNeed）· levelHpAt(T, level)（Lv1→2＝trial.firstHp）；gainXp、選秀照它們；expLevel(N, content)＝逐位累計（量測用；draftPlan 照舊封閉式）
// Factions   第 D 波棒二三流派（?fac=1 試做旗標；SPEC-D §3.2–§3.5、§3.10、§4.2、§6-3；給畫面／sim 的契約 build2/CONTRACT.md）。數字＝content.factions（facCfg）
//            newRun o.fac:true → run.fac {picks:{id:1}, tal:{}, trialNodes:{}}（存在 run 裡；沒旗標的頁面續玩照樣生效）；startFight 照 run.fac 給 playerDef {fac}（序章不給）
//            → duel.p.fac（派）、p.fx（facFxOf：被動＋本派選項）、p.facN（這場計數）、stats.fac；outcome 的派別路（被動＋代價＋第二招），notes 多 {fac, kind, n, text}
//            levelOffer：逢 levelEvery 級多第 4 格 {pick:'fac', id}（佔那一級）；{draft:true}（選秀）不出 · choose level {pick:'fac', id} · choose draft 送 fac → 'bad'
//            facCfg · facPickDef(content, tier, id) · facFxOf(content, run, tier) · facDue · facOffer · fixFac(run, content)（讀檔整理）· FAC_OPS
//            apexAbilityOf(content, cardId, run)：?fac=1&apex=1 同開（run.fac）＝照 content.factions.apexSwap 換一格；沒有 run.fac＝abilityOf 逐字照舊。新 apex op critAdd（只給換一格用）
//            第 D 波棒三派樹（?fac=1；SPEC-D §3.6–§3.7；契約 scratchpad v5/wave-d/build3/CONTRACT.md）：content.factions[派].tree 九格 a1–c3、treeCost、treeStart（'first'＝本派格先出）
//              存檔 career.tree[派]（careerFix→treeFixOne）；treeList · treePoints · treeWhy · treeBuy／treeSell／treeRespec · treeArgs(content, career, ace)＝newRun 的 facTal（off＝{}）· facTalOf
//              進局 run.fac.tal：facFxOf 多 deep／deepCell／deepPer（finishFight 打贏多回、out.deep）、spine（刺蝟）、tieHeal（圈內人）、pick2（levelOffer 出兩個）；choose retry 的 pleaHp
//              ?fac=1 那一趟的客人 content.factions.guest {hpSteps, atkSteps}（guestDef；只在 run.fac）＝棒三的 G3／「整體變簡單」調法
// Trial      第 D 波棒三試煉階級（SPEC-D §5）：trialCfg 依序疊 C.trial.tiers（addMerge 相對值；add:{healAdd}）· trialTiers · trialFix · trialPick · trialRecord（TRIAL_PASS 21）· runSummary.tier
// Encore     第 I 波 I-1「安可」（scratchpad v5/wave-i SPEC-I §1、附錄 Y；給畫面／sim 的契約 build1/CONTRACT.md）。數字與字＝content.encore（encCfg；on false＝兩半都關、逐字現況）
//            每張王牌多一條「條件 → 加成」：條件 caught 看穿｜combo2 連剋兩手｜sameWin 同色比贏｜lowhp 聲望 ≤ lowPct%（只配回聲望型）；加成 again 再發動／王牌回到手上｜star 下一手 +1 星｜
//              hit 下一手剋中多扣 2（倍數之後、他的底氣之前）｜heal 回 2（當場、跟同一手其他回聲望取大）。一場一次；頂點卡發動那手不算（下一手起）、7 星王牌丟的那手就算；
//              成立了還沒用到、這場就結束 → duel.over.encCarry {give}、finishFight 寫 run.encCarry、下一次 startFight 吃掉（說情重打也算；只留一場；一趟結束清掉）
//            encoreOf(content, entry, tier)（頂點卡：自己寫的 encore 優先、沒寫照 byFamily）· aceEncoreOf(content, tier, fac)（7 星王牌；fac 異端＝facHeresy）· encoreLine／encoreTag（說明句、籤）
//            abilityOf／apexAbilityOf 多 encore（換一格照換後的家族）· playerDef o.encore → encNum、encText、aceEnc · startDuel opts.encore／encCarry → duel.p.enc、encPrev、encAce|apexHist、stats.enc
//            startFight：主線對決（非序章、o.encore !== false）自動開；resolveTurn：encFire（丟王牌）→ outcome（encBonus）→ … → encoreStep（aceUsed、補牌之後、finish 之前）→ {t:'encore'} 事件
//            pAceStar(duel)（安可回來的王牌 6 星：actPlay、bestChip、view.aceStar、pubOpts）· view.enc · encorePolicy(name)（sim 量上界：會湊條件、安可盤一定丟）· debugOutcome.caught（e2e）
// Spar       活店第二階段「切磋」（＝店主說的遭遇戰；scratchpad v5/liveshop SPEC-H §7、§8；給畫面／sim 的契約 p2/CONTRACT.md）。數字＝content.encounter（sparCfg；on false＝不出）
//            熟客第 6 位起、一般客人位、每輪最多一次（hash01，不吃 run.rng）走到對戰台嗆你；短局（雙方聲望＝上限＝六成）；贏了三張蓋牌挑一張（唱片櫃／包包模式）或 $200；輸了不扣
//            欄位一律叫 spar（規格寫 enc；run.stats.enc 是翻面的）：run.spar {round, pos, who, state, mode?, loot?, taken?, skipped?}、run.stats.spar、run.stats.c.income.spar
//            encOffer(run, content) · encView(content, who) · encDef(run, content, who) · encStart(run, content, {apex}) · encFinish(run, content, duel, {reward, owned}) · encVoid(run)
//            encLoot(run, content, duel, {reward, owned}) · fixEnc(run, content?) · encPolicy(run, content, {policy, reward, owned}) · encPending(run) · sparCfg · sparMode · sparDeck(content, who, posEff, {main, tier})
//            choose：encOpen／encAccept／encDecline {lapse}／encTake {id}／encSkip。fightSetup(run, content, o)＝主線 startFight 與切磋 encStart 共用的開局參數（你這一邊）
//            強度（下半，主線 11-21 裁定「牌組身分跟強度分開」）：熟客一律出自己那 7 張（sparDeck：照等效位數只補星、不換牌）；強度＝等效位數 posEff＝pos＋off＋位移
//              的客人參數（品味、底氣、讀你、放水…）＋短局 content.encounter.short；encounter.ace true＝照一般客人機率帶王牌（試調用，出貨不開）。數字與量測見 p2b/SIM.md
//              審查修正（p2b）：位移 posAdd 可以是照位數走的折線 [[第幾位, 位移], …]（sparAddAt）——全程 +31 讓前期切磋比主線難很多、後段又比主線好打；
//              改成每一段跟同段主線一般客人首戰勝率差不多（sim 分段表、LS5 分段門檻）。數字與量測見 p2b/fix/SIM.md
// Lineup     第 I 波 I-2 上場＋耐聽（scratchpad v5/wave-i SPEC-I §3、§5、§10；給畫面／sim／e2e 的契約 wave-i/build2/CONTRACT.md）。數字＝content.lineup／content.wear（luCfg／wearCfg）；
//            開關＝newRun o.lineup／o.wear（沒給＝content 的 on）；關著 run 一個欄位都不多、策略全走 lineupOn(run) 分支的舊程式（sim 旗標關逐字現況）。
//            run：lineup [ids]|null、bench、lineupFresh、lineupDue、lineupFrom、lineupBonus?、wear {id:{g,n}}、rested、wearPos?；換輪攤位 pending 多 lineup {pick, bench, quiet}
//            choose：{type:'stall', act:'lineup', ids, bench}／{type:'lineup', ids, bench}／{type:'lineupSwap', inId, outId}／{type:'benchSwap', inId, outId}（luChoose）；
//              其他選擇做完 luBagSync（新進包包＝lineupFresh；離開＝上場空一格 lineupDue、wear 拿掉）
//            lineupOn · wearOn · luRound(run)（這一輪是上場制）· benchN(run, content) · wornCard(content, run, id) · wearLayers · lineupOf(run, content) · lineupPolicy(run, content) -> {ids, bench}
//            lineupQuiet · lineupPrep(run, content) -> [choose…]（sim／自動遊玩：開打前）· luMains · luScoreOf · fixLineup(run, content, {on, wear})
//            fightSetup：上場制那幾輪包包＝lineupOf、耐聽開著唱片＝wornCard 拷貝；startFight：這一位第一場 → opts.wear（duel.wearOn、duel.p.plays）、duel.lineup；
//            view.hand 每張 worn／ear；finishFight：wearRecord → out.effects [{t:'worn', id, n}]、pending.worn；advance 換輪 luNewRound（坐板凳回滿）
//            策略：bagScore(content, ids, run)（上場制：每軸前三 1／.5／.25＋夠格第 6–9 張）、deadWeight(…, run)、thinPolicy 上場制不賣、runPolicy／cPolicy 會挑上場
// Policies  policies[name](duel, R, mem, content) -> act：random, high, counterHint, formula, mirrorHint, thoughtful, oracle, novice(=counterHint)
//            只有 oracle 讀 duel.plan／e.hand／e.pile；其他只看 view(duel)＋content。thoughtful 照 curve harness：讀實際（加星後）的公開牌單、
//            用放水後的 qNow、溢出傷害不算（打到 0 為止）、同分先取那軸星高的再取總星小的（tieHigh）
//            runPolicy 的升級照 harness MIX（A D A H D A X D A H；X＝引擎沒有「不加」，改拿聲望上限）
// ============================================================================================================================
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.DipLabEngine = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  const VERSION = 'lab-4';
  const RUN_V = 5;                                   // 無限試煉（v4 一晚版是 4；存檔 v4→v5 丟掉 run）
  const ATTRS = ['c', 'o', 'h'];
  const ZH = { c: '經典', o: '冷門', h: '硬蕊' };
  const ZH1 = { c: '經', o: '冷', h: '硬' };
  const BEATS = { o: 'c', c: 'h', h: 'o' };          // 冷剋經、經剋硬、硬剋冷：x beats BEATS[x]
  const COUNTER_OF = { c: 'o', o: 'h', h: 'c' };     // COUNTER_OF[x] = the attribute that beats x
  const beats = (x, y) => !!x && !!y && BEATS[x] === y;
  const TIERS = ['hall', 'pearl', 'heresy'];
  const TIER_AXIS = { hall: 'c', pearl: 'o', heresy: 'h' };
  const COLOR_RELIC = { c: 'obi', o: 'testpress', h: 'stylus' };          // X剋中多扣 1

  const CFG = {
    playerHp: 12,        // 無限試煉 §0：你 12 聲望（＝content.trial.youHp，check-content 對）；規則卡頁尾「你 12 聲望」照這個寫
    handSize: 5,         // FIXLIST 11：你的手牌 5 張（＋王牌格）；從包包抽、打出一張補一張、牌堆抽完把丟過的洗回；也是賣回之後包包最少要留的張數
    enemyHand: 3,        // 他的暗手維持 3 張（H5-A：他 3／4／5 張對通關率影響 ≤2 點，5 張反而讓 S2／S6 餘裕少 1–2 點）
    // 包包上限：店主 11-16「手牌不要只限八張，可以無限多直到結束才重置」→ Infinity＝不限（一趟結束 newRun 才重置）。
    //   sim --set bagMax=8 回到舊規則對照（choose／runPolicy／shopPolicy 走舊的那條路，一字不差）；null／0 也當不限（bagCap）
    bagMax: Infinity, retries: 1, relicMax: 3,
    threshold: 2,        // D §5 規則 4：被剋方星數 − 剋方星數 ≥ 2 → 剋不動，改比星
    maxRounds: 6,        // D §5 規則 6：第 6 手結算完還沒人倒 → 比聲望條剩幾成（playerAhead），一樣算你贏
    aceStar: 7,
    colorRelicBonus: 1,  // 原版側標／神秘見本盤／黑膠唱針：那色剋中多扣 1
    dustcoverCut: 1,     // 防塵套：每場第一次被剋少扣 1
    cleanerTie: 1,       // 洗碟水：tie 時你扣他 1
    boostStar: 1,        // 重量盤／絕版編號標／內圈刻字：那色出招時 +1 星（王牌不加）
    bargainPick: 3,      // 每一趟開局特價箱挑 3 張（序章與再挑戰一趟都一樣；只在第 1 位之前）
    seedMax: 3,          // 從唱片櫃帶來開局的種子最多 3 張（店主 11-13 §0：種子制；第二趟起才挑）
    mercy: true,         // 原版 aiPlan 的 mercyLevel（你落後時他出招變鈍，roguelike.html:3618-3624）；sim 可 --set mercy=false 對照
  };
  // content 沒給時的預設（＝content.js 的 C.honesty／C.planners／C.economy／C.trial；直接呼叫 startDuel 的地方不傳 content 也不會壞）
  // 誠實度只在引擎裡（照實出的機率 q）；畫面上不寫任何誠實度字（FIXLIST 6，店主 2026-11-08 06:05）
  const HONESTY = { honest: { q: 1 }, sometimes: { q: 0.8 }, often: { q: 0.75 }, veteran: { q: 0.75 } };   // FIXLIST 10 平衡 R1（FIXLIST 11 H5-1 照用）
  const PLANNERS = { easy: { w: 0.45, nz: 2.4, mercy: false }, normal: { w: 0.6, nz: 1.4, mercy: true }, hard: { w: 0.7, nz: 0.8, mercy: true } };
  const DEFAULT_HINTS = { c: ['c1', 'c2', 'c3', 'c4', 'c5'], o: ['o1', 'o2', 'o3', 'o4', 'o5'], h: ['h1', 'h2', 'h3', 'h4', 'h5'] };
  const HINT_SEEN_MAX = 200;                         // run.hintSeen 最多留幾句（舊的先丟；約 1.5 KB）
  // 台幣行情（FIXLIST 8＋X／Y 契約）：唱片照稀有度定價、特價箱每張照最高星、櫃檯配件一件 3000、賣回半價
  const ECON = { start: 1000, win: { prologue: 0, normal: 1500, elite: 2500, boss: 3750 },
    price: { common: 800, rare: 1000, uncommon: 1200, epic: 3000, legendary: 4000, apex: 8000 },
    bargain: { 1: 100, 2: 200, 3: 300 }, relicPrice: 3000, sellRate: 0.5, stock: [4, 6], featureStock: [2, 3], relicStock: [2, 3] };
  // 無限試煉（＝content.js 的 C.trial；沒給時的預設）。曲線 V3（../curve/curves.cjs：舊版 roguelike enemyForDepth 的形狀＋甲的斜率）
  //   ＋店主 11-16「前期太簡單」：只動第 1–4 位（q.easy 1→0.8→0.75〔第 A 波合併：T1〕、q.normal 0.85→0.75、atk／def.lateFrom 3→1），第 5 位起跟 V3 逐位一樣
  const TRIAL = {
    classes: ['normal', 'normal', 'normal', 'elite', 'boss'],   // 一輪 5 位：一般 3、菁英、傳說藏家
    retry: 1, youHp: 12, heal: 3, guestHp: { normal: 12, elite: 12, boss: 14 },
    xp: { normal: 2, elite: 3, boss: 4 }, levelNeed: 3, levelHp: 1, picks: { atk: 1, def: 1, hp: 2 },
    firstNeed: 2, firstHp: 0,                                   // 第 I 波 I-0（SPEC-I §7.2）：Lv1→2 只要 2 經驗（打贏第 1 位就升）、那一級不自動加聲望上限（xpNeed／levelHpAt）
    checkpoints: [10, 20, 30, 50, 75, 100], checkpointEvery: 50,
    curve: {
      planner: { easyTo: 2, normalTo: 4 },                                         // 第 1–2 位 easy、3–4 normal、5 起 hard
      q: { easy: 0.75, normal: 0.72, feintBase: 0.25, feintStep: 0.05, feintFrom: 5, feintMax: 0.40 },   // hard：q＝1−min(.40, .25＋.05·max(0, 位−5))（11-17 讀牌加難：原本 .75／.18／.55）
      // 11-17 讀牌加難（scratchpad v5/harder DESIGN §2.2；＝content C.trial.curve.read／hintMix）：客人讀你上一手、兩種唬人、被唬到多扣；提示分級（明指／半指／不露）
      //   from 0（或沒有）＝整條關掉（＝改版前）。content 一定要有這兩個鍵：trialCfg 只合併 TRIAL.curve 有的鍵
      read: { from: 3, rho: { normal: 0.30, hard: 0.45, step: 0.02, max: 0.55, boss: 0 }, streakMul: 2, cap: 0.90, beta: 0.65, mercy: 0.7, hit: { from: 5, n: 1 }, watch: false },
      hintMix: { half: { from: 3, normal: 0.15, hard: 0.20, step: 0.01, max: 0.30 }, none: { from: 6, base: 0.05, step: 0.02, max: 0.15 } },
      mercyFeint: 0.8,                                                              // 放水：唬人率 ×(1−0.8×mercy)（roguelike.html:3693-3695；easy 也吃）
      // 放水照位數機率（店主 11-16 選 C）：第 from 位以前每手都放水；之後每手照機率 p＝max(min, p0 − step×⌊(位−from)/every⌋) 才放水（mercyPAt）
      //   放水唬人（mercyFeint）所有出招難度都吃（easy 也算：主線 11-16「放水前期保留」，第 1–2 位 q 0.75 也會唬，你落後時他少唬）；出招變鈍只有 normal／hard（PLANNERS.mercy）
      mercyP: { from: 11, p0: 0.9, step: 0.1, every: 5, min: 0.2 },
      // 出招偏主屬性（第 A 波 6 審查）：第 from 位起，他挑這手打哪色時，主屬性那色的星數當作多 n 星（只影響計畫，不改牌、不多取亂數）；n 0＝不偏。
      //   第 1–3 位不偏（新手第 1–3 位死亡率 T1：偏了以後他少出硬蕊、多出你難剋的色，死亡率翻倍）
      mainBias: { from: 4, n: 1.5 },
      atk: { lateFrom: 1, rate: 0.75, cap: 2, slopeFrom: 6, slopeEvery: 5, boss: 1, add: 0 },   // min(2, round(.75·max(0, 位−1)))＋⌊max(0, 位−6)/5⌋（藏家 +1）
      def: { lateFrom: 1, rate: 0.45, cap: 1, boss: 1, add: 0 },                                  // min(1, round(.45·max(0, 位−1)))（藏家 +1）
      // mainShare：客人主屬性（第 A 波 6）那副牌至少幾成是主屬性那軸最高的牌（trialDeck o.main）
      deck: { floorBase: 3, floorRate: 0.7, floorMax: 13, minPool: 7, buffFrom: 3, buffEvery: 3, buffCap: 5, aceFrom: 5, aceRate: 0.15, aceMax: 0.6, mainShare: 0.7 },
    },
    // 客人稱號（舊版 enemyForDepth 的 titles；第 A 波 3）：每 titleEvery 位換一次，最後一個之後停在最後一個（titleAt／guestTitle）
    titles: ['音樂小白', '文青同好', '社團學長', '資深樂評', '二手店老闆', '地下廠牌主理人', '品味行家', '品味之神'], titleEvery: 2,
    tiers: [],
  };
  const POS_CLASSES = TRIAL.classes, PER_ROUND = POS_CLASSES.length;
  // 稀有度（CARD_GAME_DESIGN §5）：score＝經典＋硬蕊＋(冷門 5 ? 1 : 0)；≤5 普通、6 稀有、7 獨特、8 史詩、≥9 傳奇；頂點卡（殿堂／流亡／異端）＝頂點
  const RARITY = ['common', 'rare', 'uncommon', 'epic', 'legendary', 'apex'];
  const FEATURE_RARITY = ['epic', 'legendary'];            // 門口牆最靠門那格（FEATURE 店長推薦精選）只放這兩種
  const SHELF_RARITY = ['common', 'rare', 'uncommon'];     // 其他箱子、新進、店長推薦：一般稀有度
  // 上貨順序（全店同一輪不重複：先上的先拿）：FEATURE → 十三個分類箱 → 新進 → 店長推薦；不認得的鍵照字母排在最後
  //   v5 店面改版（店主 11-13）：POP 改 CITY POP（城市流行）、門口長櫃拆 INDIE ROCK／INDIE POP（接在民謠後面）、BLUES 搬到窗下矮櫃
  const SHOP_ORDER = ['feature', 'jazz', 'tw', 'rock', 'elec', 'soul', 'hiphop', 'citypop', 'classical', 'world', 'folk', 'indierock', 'indiepop', 'blues', 'new', 'picks'];

  // ---------- RNG (mulberry32; state lives in the object so clones are deterministic) ----------
  function rng(st) {
    let a = st.rng = (st.rng + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  function makeRng(seed) { const o = { rng: seed | 0 }; return () => rng(o); }
  function shuffle(arr, st) { for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(rng(st) * (i + 1)); const t = arr[i]; arr[i] = arr[j]; arr[j] = t; } return arr; }
  const pickOne = (arr, st) => arr[Math.floor(rng(st) * arr.length)];
  function fnv1a32(str) { let h = 0x811c9dc5; str = String(str); for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193); } return h >>> 0; }
  // 字串 → [0,1)：fnv1a32 再過 murmur3 的 fmix32（fnv 的低位元與高位元對相近的字串不夠亂；run 的雜湊都走這個）
  function hash01(str) { let h = fnv1a32(str); h ^= h >>> 16; h = Math.imul(h, 0x85ebca6b); h ^= h >>> 13; h = Math.imul(h, 0xc2b2ae35); h ^= h >>> 16; return (h >>> 0) / 4294967296; }
  const clone = o => JSON.parse(JSON.stringify(o));
  const round6 = x => Math.round(x * 1e6) / 1e6;
  const star = (card, a) => (card && card[a]) | 0;
  const power = c => star(c, 'c') + star(c, 'o') + star(c, 'h');
  function tasteStr(t) { let s = Array.isArray(t) ? t.join('') : String(t || ''); s = s.split('').filter((x, k, a) => ATTRS.includes(x) && a.indexOf(x) === k).join(''); for (const a of ATTRS) if (!s.includes(a)) s += a; return s; }

  // ---------- 卡片 ----------
  function topAttr(card) { let b = 'c'; for (const a of ['o', 'h']) if (star(card, a) > star(card, b)) b = a; return b; }
  function peak(card) { return Math.max(star(card, 'c'), star(card, 'o'), star(card, 'h')); }
  // 峰值那幾軸（並列都算；＝ui.js topAxes）
  function topAxes(card) { const m = peak(card); return ATTRS.filter(a => star(card, a) === m); }
  // 特價箱的「色」（店主 11-16 換牌：最高 ≤3、加總 ≤5 的牌照 topAttr 分幾乎全是經典，冷、硬靠 2/2/1、2/1/2 這種並列補）：
  //   峰值那軸；並列時取後面那軸（硬 → 冷 → 經；經典的牌最多）。沒有並列的＝topAttr（舊 9 張全是這種）
  function bargainLane(card) { const t = topAxes(card); return t[t.length - 1] || 'c'; }
  // 牌單主屬性：每張卡的峰值軸算一票（並列的每一軸都算一票）；票數最多的那軸，並列照 taste
  function deckMain(cards, taste) {
    const t = tasteStr(taste), votes = { c: 0, o: 0, h: 0 };
    for (const c of cards || []) { if (!c) continue; const p = peak(c); for (const a of ATTRS) if (star(c, a) === p) votes[a]++; }
    let best = t[0];
    for (const a of t) if (votes[a] > votes[best]) best = a;
    return best;
  }
  const aceAxis = ace => ace ? (TIER_AXIS[ace.tier] || topAttr(ace)) : null;
  const isAce = c => !!(c && c.tier);
  const isAcePlay = (c, a) => isAce(c) && aceAxis(c) === a;                 // 王牌只在自己那軸算王牌
  const eStarOf = (c, a) => isAcePlay(c, a) ? CFG.aceStar : star(c, a);

  // ---------- 三相剋＋門檻：一手的結算（§2.1.3） ----------
  function clash(p, e, opts) {
    if (typeof p === 'number') { const x = arguments; return clash({ star: x[0], attr: x[1] }, { star: x[2], attr: x[3] }); }   // v3 墊片（ui.js 舊規則卡例子）
    const N = opts && opts.threshold != null ? opts.threshold : CFG.threshold;
    const NP = opts && opts.pThr != null ? opts.pThr : N;   // 頂點卡試做：只改你剋他那邊的門檻（剋得動 3、以小搏大＝不判剋不動）
    const ps = p.star | 0, es = e.star | 0;
    const cmp = (blocked, by) => {
      const d = ps - es;
      if (d > 0) return { kind: 'mirrorWin', toE: d, toP: 0, blocked, by };
      if (d < 0) return { kind: 'mirrorLose', toE: 0, toP: -d, blocked, by };
      return { kind: 'tie', toE: 0, toP: 0, blocked, by };
    };
    // 王牌沒有「不會被剋」（FIXLIST 2，店主 2026-11-08）：王牌只是 7 星，照三相剋＋差 2 星門檻；王牌對王牌一樣照三相剋
    if (p.attr === e.attr) return cmp(null, null);
    if (BEATS[p.attr] === e.attr) {                       // 你剋他
      if (es - ps >= NP) return cmp('gap', 'p');
      return { kind: 'counter', toE: ps, toP: 0, blocked: null, by: 'p' };
    }
    if (ps - es >= N) return cmp('gap', 'e');             // 他剋你
    return { kind: 'countered', toE: 0, toP: es, blocked: null, by: 'e' };
  }

  // ---------- relics ----------
  function relicObj(r, content) {
    if (!r) return null;
    const id = typeof r === 'string' ? r : r.id;
    if (!id) return null;
    const d = typeof r === 'string' ? ((content && content.relics && content.relics[r]) || {}) : r;
    const o = { id, name: d.name || id, icon: d.icon || id, line: d.line || d.desc || '', note: d.note || '' };
    if (d.boost) o.boost = d.boost;
    if (d.v4 != null) o.v4 = !!d.v4;
    if (d.type === 'slot') o.slot = true;                 // 第 I 波 I-2：唱片袋側袋（替補格；對決裡沒有效果）
    return o;
  }
  const hasRelic = (st, id) => st.p.relics.some(r => r.id === id);
  // 第 I 波 I-2 修正棒（11-22）：type 'slot' 的配件（唱片袋側袋＝替補格）不佔配件格——relicMax 只算一般配件（原本佔一格＝花 $3,000 換一個陷阱，審查 #5）。
  //   isSlotRelic(content, id)、relicN(run, content)＝一般配件幾件、relicFull(run, content, id)＝要放進 id 得先丟一件。上場制關著（沒有側袋）＝跟 run.relics.length 一模一樣
  const isSlotRelic = (content, id) => !!(content && content.relics && content.relics[id] && content.relics[id].type === 'slot');
  const relicN = (run, content) => (run.relics || []).filter(id => !isSlotRelic(content, id)).length;
  const relicFull = (run, content, id) => !isSlotRelic(content, id) && relicN(run, content) >= CFG.relicMax;
  const noteOf = (st, id) => { const r = st.p.relics.find(x => x.id === id); return { relic: id, text: (r && r.note) || id }; };
  // 監聽耳機：v4 新效果（第一手他不唬人）只在 relic.v4 打開時生效（〔補〕⚠規則，預設不上架）
  const headphoneOn = st => st.p.relics.some(r => r.id === 'headphone' && r.v4 === true);

  // ---------- 頂點卡純輔助卡試做（?apex=1；檔頭 Apex）。旗標關時（st.apexMode 沒有）這一段一行都不走 ----------
  // 原語表：params＝參數範圍（[最小, 最大]；'bool'＝布林，可省）；timing＝當主效果可用的時機（hold 的大效果算 hand）；small＝可以當「留著」的小效果；
  //   duelMax／smallMax＝整場、留著時參數上限（FRAME 第 2.1 節：整場比星多算 1、整場少扣 1…）；now＝發動當下做完（不進 outcome）。check-content 照這張表擋
  const APEX_OPS = {
    heal:        { params: { n: [2, 5] }, timing: ['hand'], now: true },
    reveal:      { params: {}, timing: ['hand'], now: true },
    star:        { params: { n: [1, 1] }, timing: ['hand'] },
    eStar:       { params: { n: [1, 1] }, timing: ['hand'] },
    pThr:        { params: { n: [3, 4] }, timing: ['hand', 'duel'], duelMax: { n: 3 } },
    theirStar:   { params: {}, timing: ['hand', 'duel'] },
    mirrorPlus:  { params: { n: [1, 3] }, timing: ['hand', 'duel'], duelMax: { n: 1 } },
    loseZero:    { params: {}, timing: ['hand'] },
    tieWin:      { params: { n: [1, 2] }, timing: [], small: true, smallMax: { n: 1 } },
    counterPlus: { params: { n: [1, 3] }, timing: ['hand', 'duel'], small: true, duelMax: { n: 1 }, smallMax: { n: 1 } },
    counterMult: { params: { mult: [2, 2] }, timing: ['hand'] },
    crit:        { params: { mult: [2, 3] }, timing: ['hand', 'duel'] },
    critLeech:   { params: { mult: [1, 3] }, timing: ['hand', 'duel'] },
    critAdd:     { params: { n: [1, 3] }, timing: ['hand', 'duel'], swapOnly: true },   // 第 D 波棒二：?fac=1&apex=1 同開「換一格」才用（C.factions.apexSwap；C.apexTrial 沒有這個）：抓到他唬你多扣 n（加法、跟異端被動同一步取大）
    bounce:      { params: { lose: 'bool' }, timing: ['hand', 'duel'] },
    shield:      { params: { n: [1, 3] }, timing: ['hand', 'duel'], small: true, duelMax: { n: 1 }, smallMax: { n: 1 } },
    halfIn:      { params: {}, timing: ['hand'] },
  };
  const APEX_TIMINGS = ['hand', 'duel', 'hold'];
  const apexCfg = content => (content && content.apexTrial && typeof content.apexTrial === 'object') ? content.apexTrial : null;
  // 這一派可以挑的頂點卡（content.apexTrial[tier]；第 1 張＝content.aces[tier]）
  function apexList(content, tier) { const A = apexCfg(content); return A && TIERS.includes(tier) && Array.isArray(A[tier]) ? A[tier] : []; }
  function apexEntry(content, cardId) {
    for (const t of TIERS) { const x = apexList(content, t).find(e => e && e.card === cardId); if (x) return Object.assign({ tier: t }, x); }
    return null;
  }
  // 旗標下 run 帶的那張：run.aceId 在這一派名單裡、卡存在、tier 對 → 它；否則（舊存檔、沒挑過、換了派）＝content.aces[run.ace]
  function apexAceId(run, content) {
    const t = run && TIERS.includes(run.ace) ? run.ace : 'hall', def = (content.aces || {})[t] || null;
    const id = run && run.aceId, c = id ? cardOf(content, id) : null;
    return id && c && c.tier === t && apexList(content, t).some(e => e && e.card === id) ? id : def;
  }
  // 那張的能力（複本；對決狀態裡存這份，存檔讀檔不用再查 content）
  function abilityOf(content, cardId) {
    const e = apexEntry(content, cardId);
    if (!e) return null;
    const out = { id: e.id, card: e.card, tier: e.tier, name: e.name, text: e.text, timing: e.timing, op: e.op, params: clone(e.params || {}), hold: e.hold ? clone(e.hold) : null };
    const enc = encoreOf(content, e, e.tier);                           // 第 I 波安可（content.encore 開著才有；自己寫的 encore 優先、沒寫照家族）
    if (enc) out.encore = enc;
    return out;
  }
  const apexOps = (op, params) => op === 'combo' ? ((params && params.ops) || []).map(o => ({ op: o.op, params: o.params || {} })) : [{ op, params: params || {} }];
  const apexHas = (A, op) => !!A && apexOps(A.op, A.params).some(x => x.op === op);
  // 只會回聲望的能力（安全氣囊、身心靈、新的一天、逃生梯）：聲望滿的時候發動＝白白用掉 → 不讓發動（canApex false；view.apex.full 給畫面寫原因）
  const apexHealOnly = A => !!A && apexOps(A.op, A.params).every(x => x.op === 'heal');
  const apexFull = st => apexHealOnly(st.p.ability) && st.p.hp >= st.p.max;
  // 一組原語 → outcome 讀的旗標
  function apexModsOf(ops) {
    const M = {};
    for (const o of ops) {
      const q = o.params || {}, n = q.n | 0, mult = q.mult | 0;
      switch (o.op) {
        case 'star': M.star = (M.star | 0) + n; break;
        case 'eStar': M.eStar = (M.eStar | 0) + n; break;
        case 'pThr': M.pThr = n; break;
        case 'theirStar': M.theirStar = true; M.pThr = Infinity; break;          // 你剋他一律剋得動
        case 'mirrorPlus': M.mirrorPlus = (M.mirrorPlus | 0) + n; break;
        case 'loseZero': M.loseZero = true; break;
        case 'tieWin': M.tieWin = (M.tieWin | 0) + n; break;
        case 'counterPlus': M.counterPlus = (M.counterPlus | 0) + n; break;
        case 'counterMult': M.mult = mult; break;
        case 'crit': M.crit = mult; break;
        case 'critLeech': if (mult > 1) M.crit = mult; M.leech = true; break;
        case 'critAdd': M.critAdd = Math.max(M.critAdd | 0, n); break;          // 第 D 波棒二（換一格）：拆穿那手多扣 n
        case 'bounce': M.bounce = true; M.bounceLose = !!q.lose; break;
        case 'shield': M.shield = (M.shield | 0) + n; break;
        case 'halfIn': M.halfIn = true; break;
        default: break;                                                         // heal／reveal：發動當下做完
      }
    }
    return M;
  }
  // 這手哪個王牌效果在作用：{src:'on'|'hold', first, ops, M, on} | null。hyp＝假設這手發動（preview 的 act.apex、策略估值；不寫回）
  function apexNow(st, hyp) {
    if (!st || !st.apexMode) return null;
    const P = st.p, A = P.ability;
    if (!A || !P.ace) return null;
    const on = P.apexOn || (hyp ? { n: st.n, hyp: true } : null);
    if (on) {
      if (!(A.timing === 'duel' ? on.n <= st.n : on.n === st.n)) return null;
      const ops = apexOps(A.op, A.params);
      return { src: 'on', first: on.n === st.n, ops, M: apexModsOf(ops), on };
    }
    if (A.timing === 'hold' && A.hold && !P.aceUsed) { const ops = apexOps(A.hold.op, A.hold.params); return { src: 'hold', first: false, ops, M: apexModsOf(ops), on: null }; }
    return null;
  }
  // 結果行那一句與 clash 事件的 apex 欄（b＝同一手不算王牌的結果）
  const CRIT_OPS = ['crit', 'critLeech', 'critAdd'];
  //   facOver＝這手的回聲望被流派（?fac=1）蓋過（取大、不相加）：r.heal 是流派回的，不算這張卡回的（審查 棒二：原本兩邊各寫一次「回 2 聲望」、apexHits 也多算）
  function apexInfo(st, AX, r, b, pPlay, ePlay, caught, ps, es, facOver) {
    const P = st.p, A = P.ability, T = st.apexText || {};
    const op = AX.ops.length === 1 ? AX.ops[0].op : 'combo';
    const dE = r.toE - b.toE, dP = b.toP - r.toP, h = facOver ? 0 : r.heal | 0;
    let d, hit;
    if (op === 'heal') { const n = AX.ops[0].params.n | 0; d = AX.on && AX.on.heal != null ? AX.on.heal : Math.max(0, Math.min(n, P.max - P.hp)); hit = AX.first && d > 0; }
    else if (op === 'reveal') { d = 0; hit = false; }
    else if (CRIT_OPS.includes(op)) { d = dE; hit = caught && (d > 0 || h > 0); }          // 拆穿回血 ×1 在滿聲望時抓到：沒多扣、也沒回到＝沒作用
    else if (op === 'counterPlus' || op === 'counterMult' || op === 'tieWin') { d = dE; hit = d > 0; }
    else if (op === 'shield' || op === 'halfIn' || op === 'loseZero') { d = dP; hit = d > 0; }
    else if (op === 'bounce') { d = r.bounced | 0; hit = d > 0; }
    else { d = dE + dP; hit = d > 0; }                                           // star eStar mirrorPlus theirStar pThr combo：兩邊加起來
    const info = { id: A.id, op, src: AX.src, first: !!AX.first, hit: !!hit, dE, dP, d, h, caught: !!caught, pStar: ps, eStar: es };
    let tpl = null, full = false;
    const N = T.notes || {};
    if (AX.src === 'hold') tpl = hit ? (T.holdNotes || {})[op] : null;
    else if (op === 'reveal') tpl = null;                                       // 看穿：提示框蓋章，不進結果句
    else if (hit) tpl = op === 'critLeech' ? (d <= 0 ? N.leech : h > 0 ? N.critLeech : (N.crit || N.critLeech)) : N[op];   // 拆穿回血：沒回到（滿聲望）就不寫「回 0 聲望」
    else if (op === 'critLeech' && caught && facOver) tpl = N.leechFac || null;             // 抓到唬人、也有回，但回的是流派那份（取大）：這張沒另外加
    else if (op === 'critLeech' && caught) { tpl = N.leechFull || null; full = true; }      // 抓到唬人但聲望是滿的（不算「沒碰到條件」）
    else if (AX.first) tpl = CRIT_OPS.includes(op) && !feintOf(st, ePlay.attr) ? (N.noneHonest || N.none) : N.none;   // 他這手沒唬你（照結果句的判準）
    const note = tpl ? Object.assign({ apex: A.id, op, src: AX.src, d, h, hit: !!hit, text: String(tpl).replace(/\{d\}/g, d).replace(/\{h\}/g, h).replace(/\{name\}/g, A.name || '') }, full ? { full: true } : {}) : null;
    return { info, note };
  }
  function canApex(st) { return !!(st && st.apexMode && st.p && st.p.ace && st.p.ability && !st.p.aceUsed && st.plan && !st.over) && !apexFull(st); }
  // 發動（一場一次、出唱片前、不佔這一手）：回聲望、看穿在這裡做完；不取 st.rng、不推進手數、不動他的牌
  function activateApex(st) {
    if (!canApex(st)) return [];
    const P = st.p, A = P.ability;
    P.aceUsed = true; P.apexOn = { n: st.n };
    const ev = { t: 'apex', n: st.n, card: P.ace, id: A.id, name: A.name, op: A.op, timing: A.timing };
    for (const o of apexOps(A.op, A.params)) {
      if (o.op === 'heal') { const h = Math.max(0, Math.min(P.max - P.hp, o.params.n | 0)); P.hp += h; P.apexOn.heal = h; ev.heal = h; }
      if (o.op === 'reveal') { const v = feintOf(st, st.plan.attr) ? 'bluff' : 'honest'; P.apexOn.reveal = v; ev.reveal = v; }   // 11-17：章＝結果句的唬（feintOf），不看藏起來的計畫色
    }
    ev.pHp = P.hp;
    st.stats.apexAt = st.n;
    if (P.enc) encFire(st, 'apex');                    // 第 I 波安可：第一次發動＝開始等條件（下一手起）；留下來的＝這手打完能力回來；安可那次＝用掉
    return [ev];
  }

  // ---------- 第 I 波 I-1「安可」（SPEC-I §1、附錄 Y；契約 wave-i/build1/CONTRACT.md；數字與字在 content.encore）----------
  //   每張王牌多一條「條件 → 加成」：讀對了才有、一場一次、條件成立時這場剛好打完就留到下一位（只留一場；說情重打也算下一場）。
  //   開關：content.encore.on（總開關；false＝兩半都關、對決／run 一個欄位都不多）＋startDuel opts.encore（startFight 主線對決才給；序章、直接開打、切磋沒有）。
  //   預設 7 星王牌（mode 'ace'）：丟出去那手起看條件；成立＝王牌回到手上（aceStar 6 星，P.encAce）。頂點卡（mode 'apex'）：發動那手不算，從下一手起；
  //     again＝能力回來（apexOn 先存進 apexHist、清掉；留著型回到「留著」），star／hit＝下一手（outcome 吃 encBonus），heal＝當場回（跟同一手其他回聲望取大）。
  //   P.enc＝{when, give, mode, state:'idle'|'wait'|'carry'|'hit'|'next'|'done', start, from, at, src:null|'carry', lit}（契約 §2）；P.encPrev＝上一手 {n, kind}（連剋用）
  const ENC_WHEN = ['caught', 'combo2', 'sameWin', 'lowhp'];
  const ENC_GIVE = ['again', 'star', 'hit', 'heal'];
  const ENC_NUM = { aceStar: 6, star: 1, hit: 2, heal: 2, lowPct: 30, carry: true };
  function encCfg(content) { const X = content && content.encore; return X && typeof X === 'object' && X.on !== false ? X : null; }
  const encOk = e => !!e && ENC_WHEN.includes(e.when) && ENC_GIVE.includes(e.give);
  // 家族鍵＝'原語:時機'（combo 看第一個原語；留著型＝發動那個原語的 hand）
  function encFamilyKey(A) {
    if (!A) return null;
    const op = A.op === 'combo' ? ((((A.params && A.params.ops) || [])[0]) || {}).op : A.op;
    return op + ':' + (A.timing === 'duel' ? 'duel' : 'hand');
  }
  // 一張頂點卡（C.apexTrial 那一筆或 ability 複本）的安可：自己寫的 encore 優先，沒有照 content.encore.byFamily（異端用 heresy 那欄）。content 沒開＝null
  function encoreOf(content, A, tier) {
    const X = encCfg(content); if (!X || !A) return null;
    if (encOk(A.encore)) return { when: A.encore.when, give: A.encore.give };
    const F = X.byFamily || {}, row = F[encFamilyKey(A)] || F['*:' + (A.timing === 'duel' ? 'duel' : 'hand')];
    if (!row) return null;
    const out = { when: (tier || A.tier) === 'heresy' && row.heresy ? row.heresy : row.when, give: row.give };
    return encOk(out) ? out : null;
  }
  // 預設 7 星王牌的安可（give 一定是 again＝王牌回到手上）；fac＝這一趟開 ?fac=1（異端改 facHeresy）
  function aceEncoreOf(content, tier, fac) {
    const X = encCfg(content), a = X && TIERS.includes(tier) ? (X.aces || {})[tier] : null;
    if (!a || !ENC_WHEN.includes(a.when)) return null;
    return { when: fac && tier === 'heresy' && ENC_WHEN.includes(X.facHeresy) ? X.facHeresy : a.when, give: 'again' };
  }
  function encNumOf(content) {
    const X = encCfg(content) || {}, out = {};
    for (const k of Object.keys(ENC_NUM)) out[k] = typeof ENC_NUM[k] === 'boolean' ? X[k] !== false : (Number.isInteger(X[k]) && X[k] > 0 ? X[k] : ENC_NUM[k]);
    return out;
  }
  const encFill = (t, o) => String(t || '').replace(/\{(\w+)\}/g, (m, k) => o[k] != null ? o[k] : m);
  // 說明句：「安可：看穿他一次，再發動一次。」；o.ace＝7 星王牌那句（「安可：丟出之後看穿他一次，王牌回到手上（6 星）。」）
  function encoreLine(content, enc, o) {
    const X = encCfg(content); if (!X || !encOk(enc)) return '';
    const U = X.ui || {}, N = encNumOf(content), ace = !!(o && o.ace), G = U.give || {};
    const give = encFill(ace && enc.give === 'again' ? G.ace : G[enc.give], { n: N[enc.give], star: N.aceStar });
    return encFill(ace ? U.aceTpl : U.tpl, { when: (U.when || {})[enc.when] || enc.when, give });
  }
  // 王牌格下方的籤：「看穿→再丟」「連剋→再一次」「同色贏→+1 星」
  function encoreTag(content, enc, o) {
    const X = encCfg(content); if (!X || !encOk(enc)) return '';
    const U = X.ui || {}, N = encNumOf(content), G = U.tagGive || {};
    const give = encFill(o && o.ace && enc.give === 'again' ? G.ace : G[enc.give], { n: N[enc.give], star: N.aceStar });
    return encFill(U.tag || '{when}→{give}', { when: (U.tagWhen || {})[enc.when] || enc.when, give });
  }
  // 7 星王牌這次丟出去是幾星：安可回來的那張＝aceStar（6），其他＝CFG.aceStar（客人那邊 eStarOf 不動）
  const pAceStar = st => st && st.p && st.p.encAce && st.encNum ? st.encNum.aceStar : CFG.aceStar;
  // 這一手吃的加成（下一手型）：{give, n} | null
  function encBonus(st) {
    const Q = st && st.p && st.p.enc;
    if (!Q || Q.state !== 'next' || Q.at !== st.n || st.over) return null;
    return { give: Q.give, n: (st.encNum || ENC_NUM)[Q.give] | 0 };
  }
  function encNote(st, give, n) { const t = ((st.encText || {}).note || {})[give]; return { enc: give, n, text: t ? encFill(t, { n }) : '' }; }
  // 王牌丟出去／頂點卡發動那一刻（resolveTurn act.ace、activateApex）：idle → 開始等（7 星王牌那手就算、頂點卡下一手起）；carry → 這手打完回來；hit → 安可那次用掉
  function encFire(st, how) {
    const Q = st.p.enc; if (!Q) return;
    if (Q.state === 'idle') { Q.state = 'wait'; Q.start = st.n; Q.from = how === 'apex' ? st.n + 1 : st.n; }
    else if (Q.state === 'carry') Q.go = st.n;
    else if (Q.state === 'hit') { Q.state = 'done'; st.stats.enc.used = 1; if (how === 'apex') st.stats.apexAt2 = st.n; }
  }
  // 條件（那一手結算完；用 resolveTurn 的區域 hint，不用 st.plan：1123 起已經是 null）。dbg＝debugOutcome（e2e 用 caught:true|false 造看穿）
  function encWhen(st, Q, r, pPlay, ePlay, hint, dbg) {
    const P = st.p;
    switch (Q.when) {
      case 'caught': return r.kind === 'counter' && r.toE > 0 && (dbg && typeof dbg.caught === 'boolean' ? dbg.caught : lieOf(hint, ePlay.attr));
      case 'combo2': { const pv = P.encPrev; return r.kind === 'counter' && !!pv && pv.kind === 'counter' && pv.n === st.n - 1 && pv.n >= Q.start; }
      case 'sameWin': return pPlay.attr === ePlay.attr && r.kind === 'mirrorWin';
      case 'lowhp': return P.hp > 0 && P.hp * 100 <= P.max * ((st.encNum || ENC_NUM).lowPct | 0);
      default: return false;
    }
  }
  // 每一手結算完（aceUsed／補牌之後、finish 判斷之前）：吃掉這手的加成、留下來的那份生效、或看條件成立沒有 → {t:'encore'} 事件；log 那手多 enc
  //   healed＝這手已經回的聲望（發動回聲望＋拆穿回血＋流派；安可的回 2 跟它取大）
  function encoreStep(st, r, pPlay, ePlay, hint, events, dbg, healed) {
    const P = st.p, Q = P.enc; if (!Q) return;
    const n = st.n, S = st.stats.enc, L = st.log[st.log.length - 1];
    let src = null;
    if (Q.state === 'next' && Q.at === n) { Q.state = 'done'; S.used = 1; if (L) L.encBonus = Q.give; }
    else if (Q.state === 'carry' && Q.go === n) src = 'carry';
    else if (Q.state === 'wait' && Q.from != null && n >= Q.from && encWhen(st, Q, r, pPlay, ePlay, hint, dbg)) { src = 'hit'; Q.lit = n; S.lit = 1; }
    P.encPrev = { n, kind: r.kind };
    delete Q.go;
    if (!src) return;
    const ev = { t: 'encore', n, when: Q.when, give: Q.give, mode: Q.mode, src };
    if (Q.give === 'again') {
      if (Q.mode === 'apex') { if (P.apexOn) P.apexHist.push(clone(P.apexOn)); P.apexOn = null; }
      else P.encAce = true;
      P.aceUsed = false; Q.state = 'hit';
    } else if (Q.give === 'star' || Q.give === 'hit') { Q.state = 'next'; Q.at = n + 1; }
    else {                                                             // heal：當場回、跟同一手其他回聲望取大（不相加）；這場結束也照回
      const N = st.encNum || ENC_NUM, h = P.hp > 0 ? Math.max(0, Math.min((N.heal | 0) - Math.max(0, healed | 0), P.max - P.hp)) : 0;
      P.hp += h; ev.heal = h; S.heal = h; S.used = 1; Q.state = 'done';
      if (L) { L.pHp = P.hp; if (h > 0) L.heal = (L.heal | 0) + h; }
    }
    ev.pHp = P.hp;
    if (L) L.enc = Object.assign({ when: Q.when, give: Q.give, src }, ev.heal != null ? { heal: ev.heal } : {});
    events.push(ev);
  }

  // ---------- 第 D 波棒二：三流派（?fac=1 試做旗標；scratchpad v5/wave-d SPEC-D §3.2–§3.5、§4.2、§6-3；契約 build2/CONTRACT.md）----------
  //   數字＝content.factions（facCfg；沒有或 on:false＝沒有流派）。run.fac＝{picks:{id:1}, tal:{}, trialNodes:{}}（newRun o.fac；存在 run 裡，續玩不看網址：R-F9）。
  //   旗標關（run 沒有 fac）時這一段一行都不走。序章那場沒有 fac（startFight）。
  const FAC_NOTE_ORDER = ['full', 'borrow', 'underdog', 'crit', 'crit2', 'heal', 'leech', 'insider', 'loseCost', 'spine', 'cCost', 'tieCost', 'thorn'];   // 結果行小字的順序（notes 的鍵；insider／spine＝棒三派樹）
  // 本派選項的 op（content.factions[t].picks[].op）→ facFxOf 疊進被動 fx 的鍵；maxHp 在 choose 當下加（地下串連）
  const FAC_OPS = ['starPlus', 'fullPlus', 'tieFree', 'counteredCut', 'critPrePlus', 'critHealPlus', 'loseFree', 'cCostFree', 'lowHeal', 'maxHp', 'leech', 'thorn', 'critSafe'];
  function facCfg(content) { const F = content && content.factions; return F && typeof F === 'object' && F.on !== false ? F : null; }
  function facPickDef(content, tier, id) { const F = facCfg(content), D = F && F[tier]; return D && Array.isArray(D.picks) ? D.picks.find(p => p && p.id === id) || null : null; }
  // 被動 fx（content.factions[tier].fx 的複本）疊上這一趟拿過的本派選項（src.fac.picks）。starPlus＝{c,o,h} 加星
  function facFxOf(content, src, tier) {
    const F = facCfg(content), D = F && F[tier]; if (!D) return null;
    const fx = Object.assign({}, clone(D.fx || {}));
    fx.starPlus = { c: 0, o: 0, h: 0 };
    const picks = (src && src.fac && src.fac.picks) || {};
    for (const id of Object.keys(picks)) {
      const p = facPickDef(content, tier, id); if (!p || !(picks[id] > 0)) continue;
      const n = p.n | 0;
      switch (p.op) {
        case 'starPlus': if (ATTRS.includes(p.axis)) fx.starPlus[p.axis] += n; break;   // 識貨（經典 +1）／失真（硬蕊 +1）
        case 'fullPlus': fx.fullPlus = (fx.fullPlus | 0) + n; break;                 // 初版：整張那手再 +1
        case 'tieFree': fx.tieFree = 1; break;                                       // 老派：每場第一次同色平手不扣
        case 'counteredCut': fx.counteredCut = Math.max(fx.counteredCut | 0, n); break;   // 見過世面／冷板凳：每場第一次被剋少扣 n（最少 1）
        case 'critPrePlus': fx.critPre = (fx.critPre | 0) + n; break;                // 破音：拆穿再多扣 1
        case 'critHealPlus': fx.critHealPlus = (fx.critHealPlus | 0) + n; break;     // 回音：拆穿再多回 1
        case 'loseFree': fx.loseFree = 1; break;                                     // 臉皮厚：每場第一次比星輸不多扣
        case 'cCostFree': fx.counteredCost = 0; break;                               // 有人記得：被剋不多扣（取消代價）
        case 'lowHeal': fx.lowHeal = (fx.lowHeal | 0) + n; break;                    // 熟客：聲望不到一半時打贏多回 n（finishFight）
        case 'leech': fx.leech = 1; fx.leechMax = p.max | 0; break;                  // 第二招吸血（經典）：整張那手扣到的一半回聲望，一場最多 max
        case 'thorn': fx.thorn = n; fx.thornMax = p.max | 0; break;                  // 第二招反傷（冷門）：被剋他也扣 n，一場最多 max 次
        case 'critSafe': fx.critPre = (fx.critPre | 0) + n; fx.loseCost = 0; fx.critSafe = 1; break;   // 第二招爆擊（異端）：拆穿再多扣 n、比星輸不再多扣
        default: break;                                                              // maxHp：choose 當下加
      }
    }
    // 第 D 波棒三派樹（src.fac.tal；空的＝一個鍵都不多）：深耕 deep／deepCell／deepPer（finishFight）、刺蝟 spine（他的品味少算幾點）、圈內人 tieHeal（outcome）、挑著學 pick2（levelOffer）。
    //   start 節點：'start' 模式 newRun 已經記進 picks（上面那段照算）、'first' 模式在 facOffer 排前面；pleaHp 在 choose retry 讀 run.fac.tal
    const tal = src && src.fac && isPlain(src.fac.tal) ? src.fac.tal : null;
    if (tal) for (const id of Object.keys(tal)) {
      const N = treeNode(content, tier, id), k = nonNeg(tal[id]); if (!treeLive(N) || !k) continue;
      if (N.op === 'deep') {                                     // 深耕：per＝幾手回 1（陣列＝第 1／2／3 級各幾手；數字＝每級一樣；沒寫＝1）；acc＝跨場累積（run.fac.deepAcc）
        fx.deep = Math.min(treeMaxOf(N), k); fx.deepCell = N.cell === 'caught' ? 'caught' : 'honest';
        const per = deepPerOf(N, fx.deep); if (per > 1) fx.deepPer = per;
        if (N.carry) { fx.deepCarry = 1; fx.deepAcc = nonNeg(src.fac.deepAcc); }
      }
      else if (N.op === 'spine') fx.spine = N.n > 0 ? N.n | 0 : 99;   // 刺蝟：他的品味少算 n（沒寫 n＝整個不加）
      else if (N.op === 'tieHeal') fx.tieHeal = Math.max(1, nonNeg(N.n));
      else if (N.op === 'pick2') fx.pick2 = 1;
      else if (N.op === 'fx' && isPlain(N.fx)) for (const key of Object.keys(N.fx)) {   // 棒三審查：派樹自己的小效果（跟本派選項同一套 fx 鍵、數字較小；不佔本派格）
        const v = nonNeg(N.fx[key]); if (!v) continue;
        if (TREE_FX_MAX.includes(key)) fx[key] = Math.max(fx[key] | 0, v); else if (TREE_FX_ADD.includes(key)) fx[key] = (fx[key] | 0) + v;
      }
    }
    return fx;
  }
  // 深耕這場（P＝對決裡的你 st.p）：{carry, k, cell, per, hands（這場記到幾手）, acc（含這場的累積；沒 carry＝hands）, got（打贏會多回幾）, left（打贏後留到下一場的手數）}
  //   carry（content 節點 carry:true）＝跨場累積：每記滿 per 手、打贏那場多回 1；沒 carry＝舊規則：這一場 min(級, ⌊手數÷per⌋)
  function deepNow(P) {
    const fx = (P && P.fx) || {}, N = (P && P.facN) || {}, cell = fx.deepCell === 'caught' ? 'caught' : 'honest';
    const k = fx.deep | 0, per = Math.max(1, fx.deepPer | 0), hands = N[cell] | 0, carry = !!fx.deepCarry;
    if (!carry) return { carry, k, cell, per, hands, acc: hands, got: Math.min(k, Math.floor(hands / per)), left: 0 };
    const acc = nonNeg(fx.deepAcc) + hands, got = Math.floor(acc / per);
    return { carry, k, cell, per, hands, acc, got, left: acc - got * per };
  }
  const deepKeep = (run, n) => { if (!run.fac) return; if (n > 0) run.fac.deepAcc = n | 0; else delete run.fac.deepAcc; };   // 存回 run.fac.deepAcc（0＝不留鍵）
  // 這一級（lv＝要選的那一級）有沒有本派格：每 levelEvery 級一次（Lv5、10、15…）；run 沒有 fac 或 levelEvery 0＝沒有
  function facDue(run, content, lv) {
    const F = facCfg(content); if (!F || !run || !run.fac) return false;
    const every = F.levelEvery | 0; return every > 0 && lv > 1 && lv % every === 0;
  }
  // 本派格：從這一派還沒拿過的裡雜湊挑（hash01(seedKey#runNo#fac<lv>#id) 最小的在前）；回 [{pick:'fac', id}]（levelOffer 只取第 1 個）
  function facOffer(run, content, lv) {
    const F = facCfg(content), D = F && run && run.fac ? F[run.ace] : null; if (!D) return [];
    const got = run.fac.picks || {}, first = treeFirst(run, content), fr = id => { const i = first.indexOf(id); return i < 0 ? 99 : i; };   // 棒三派樹 'first'：樹上點的先出（照節點順序），其他照雜湊
    return (D.picks || []).filter(p => p && p.id && !(got[p.id] > 0))
      .map(p => ({ id: p.id, h: hash01(run.seedKey + '#' + run.runNo + '#fac' + lv + '#' + p.id) })).sort((a, b) => fr(a.id) - fr(b.id) || a.h - b.h)
      .map(x => ({ pick: 'fac', id: x.id }));
  }
  // ?fac=1&apex=1 同開（SPEC-D §6-3「三家換一格」）：run.fac 有、而且 content.factions.apexSwap 有那張的對照＝換掉 op／params／text（timing 改這一格的；留著型照舊留著），
  //   name、fact、card 不動；C.apexTrial 本身不改。沒有 run.fac（只開 ?apex=1）＝abilityOf 逐字照舊。多 swapped＝原本的 {op, params, timing, text}（畫面標「換過」）
  function apexAbilityOf(content, cardId, run) {
    const A = abilityOf(content, cardId);
    if (!A || !run || !run.fac || !facCfg(content)) return A;
    const S = facCfg(content).apexSwap, T = S && S.on !== false ? S[A.tier] : null;
    if (!T) return A;
    const sw = (T.cards && T.cards[A.id]) || (A.op !== 'combo' && T.ops && T.ops[A.op]) || null;
    if (!sw || !sw.op) return A;
    const was = { op: A.op, params: clone(A.params || {}), timing: A.timing, text: A.text };
    const B = Object.assign(A, { op: sw.op, params: clone(sw.params || {}), timing: A.timing === 'hold' ? 'hold' : (sw.timing || A.timing), text: sw.text || A.text, swapped: was });
    if (B.encore) { const e = encOk(sw.encore) ? { when: sw.encore.when, give: sw.encore.give } : encoreOf(content, { op: B.op, params: B.params, timing: B.timing, hold: B.hold }, B.tier); if (e) B.encore = e; else delete B.encore; }   // 第 I 波：換過的照換後的家族（或換一格自己寫的 encore）
    return B;
  }
  // 讀檔整理（畫面 loadSave／續玩前叫；回 true＝有改）：run.fac 形狀、picks 只留這一派有的 id、待選的升級 offer 裡不認得的本派格拿掉
  function fixFac(run, content) {
    if (!run || typeof run !== 'object' || run.fac == null) return false;
    const before = JSON.stringify(run);
    if (typeof run.fac !== 'object' || Array.isArray(run.fac)) { delete run.fac; return true; }
    const f = run.fac, picks = {};
    for (const id of Object.keys(f.picks && typeof f.picks === 'object' ? f.picks : {})) if (f.picks[id] > 0 && facPickDef(content, run.ace, id)) picks[id] = 1;
    run.fac = Object.assign({}, f, { picks, tal: facTalOf(content, run.ace, f.tal), trialNodes: f.trialNodes && typeof f.trialNodes === 'object' && !Array.isArray(f.trialNodes) ? f.trialNodes : {} });   // 棒三：tal 只留這派活的節點（facTalOf）
    if ('deepAcc' in f) { if (Number.isInteger(f.deepAcc) && f.deepAcc > 0) run.fac.deepAcc = f.deepAcc; else delete run.fac.deepAcc; }   // 棒三審查：深耕跨場累積的手數（非負整數；0／壞值＝拿掉）
    const p = run.pending;
    if (p && p.type === 'level' && Array.isArray(p.offer)) p.offer = p.offer.filter(x => !(x && x.pick === 'fac') || (facPickDef(content, run.ace, x.id) && !(picks[x.id] > 0)));
    return JSON.stringify(run) !== before;
  }

  // ---------- 第 D 波棒三：派樹（?fac=1；scratchpad v5/wave-d SPEC-D §3.6–§3.7；契約 build3/CONTRACT.md）----------
  //   節點＝content.factions[派].tree：id＝路線＋層（a 本派／b 抵代價／c 收藏 × 1–3）；op：
  //     start（那項本派選項 pick：treeStart 'first'＝本派格先出它、'start'＝開局就有；棒三審查後 content 沒有用）｜
  //     pick2（挑著學：本派格出兩個挑一，次數不變；nth＝只有這一趟第 nth 次本派格、once＝第 1 次、都沒寫＝每次）｜
  //     deep（深耕：cell〔honest 信對／caught 拆穿〕的手；carry＝跨場累積 run.fac.deepAcc，每記滿 per 手打贏那場多回 1（per 可逐級陣列）；
  //       沒 carry＝舊規則：這一場 min(級, ⌊手數÷per⌋)；max＝封頂級數）｜pleaHp（說情重打那場開打聲望 +n；再說情不疊：run.pleaUp）｜
  //     spine（刺蝟：每場第一次比星輸，他的品味少算 n；沒寫 n＝整個不加）｜tieHeal（同色平手回 n，每場一次）｜
  //     fx（棒三審查：派樹自己的小效果，鍵＝TREE_FX_MAX／TREE_FX_ADD）；soon（'later'｜'apex'｜'market'）＝之後開放（畫鎖、不能點、進局不算）。
  //   價（content.factions.treeCost）：第 1／2／3 層 layer[0..2] 點，第 3 層另要熟練 Lv5（careerCfg.prof.auto tier3）；深耕第 2 級起每級 more 點。
  //     第 2 層要先點同路線第 1 層、第 3 層要先點第 2 層。派點＝熟練等級 − (pointFrom − 1)（Lv2 起每級 1 點）。兩趟之間免費重配。
  //   存檔 save.career.tree[派]＝{節點 id: 級}（careerFix 驗）；進局 newRun({fac:true, facTal: treeArgs(content, career, ace)}) → run.fac.tal（facTalOf 驗）
  const TREE_OPS = ['start', 'pick2', 'deep', 'pleaHp', 'spine', 'tieHeal', 'fx'];
  // op 'fx' 認得的鍵（棒三審查）：取大的（每場第一次被剋少扣 n）／相加的（扣整張再 +n、拆穿多扣 +n、拆穿多回 +n、聲望不到一半打贏多回 n、每場第一次同色平手／比星輸不扣）
  const TREE_FX_MAX = ['counteredCut', 'tieFree', 'loseFree'], TREE_FX_ADD = ['fullPlus', 'critPre', 'critHealPlus', 'lowHeal', 'lowHealQ'];
  const treeLayer = id => +String(id).slice(1) | 0, treePathOf = id => String(id).charAt(0);
  function treeNodes(content, ace) { const F = facCfg(content), D = F && F[ace]; return D && Array.isArray(D.tree) ? D.tree.filter(x => isPlain(x) && typeof x.id === 'string' && /^[abc][123]$/.test(x.id)) : []; }
  function treeNode(content, ace, id) { return treeNodes(content, ace).find(x => x.id === id) || null; }
  const treeLive = N => !!N && !N.soon && TREE_OPS.includes(N.op);
  const treeMaxOf = N => N && N.op === 'deep' ? Math.max(1, N.max | 0) : 1;
  // 深耕第 k 級：幾手回 1（N.per 陣列＝逐級；數字＝每級一樣；沒寫＝1）
  const deepPerOf = (N, k) => { const P = N && N.per; const v = Array.isArray(P) ? P[Math.max(0, Math.min(P.length, k | 0) - 1)] : P; return Math.max(1, v | 0); };
  function treeCostCfg(content) { const F = facCfg(content) || {}, T = isPlain(F.treeCost) ? F.treeCost : {}; return { layer: Array.isArray(T.layer) ? T.layer : [1, 2, 2], more: T.more != null ? nonNeg(T.more) : 1 }; }
  // 第 k 級要幾點（沒有這個節點、之後開放、超過上限＝Infinity）
  function treeCost(content, ace, id, k) {
    const N = treeNode(content, ace, id); k = Math.max(1, k | 0);
    if (!treeLive(N) || k > treeMaxOf(N)) return Infinity;
    const T = treeCostCfg(content);
    return k === 1 ? nonNeg(T.layer[treeLayer(id) - 1]) : T.more;
  }
  function treeLv3(content) { const A = (careerCfg(content).prof.auto || []).find(x => x && x.key === 'tier3'); return A && A.lv > 0 ? A.lv | 0 : 5; }
  // 這一派的派點：{level（熟練等級）, total, spent, left}
  function treePoints(content, career, ace) {
    const c = career || {}, P = careerCfg(content).prof, lv = profLevel(content, (c.prof || {})[ace]).level, tr = ((c.tree || {})[ace]) || {};
    let spent = 0;
    for (const id of Object.keys(tr)) { const n = nonNeg(tr[id]); for (let k = 1; k <= n; k++) { const x = treeCost(content, ace, id, k); if (isFinite(x)) spent += x; } }
    const total = Math.max(0, lv - Math.max(1, P.pointFrom | 0) + 1);
    return { level: lv, total, spent, left: total - spent };
  }
  // 能不能點下一級：null＝可以；'locked'（沒有／之後開放）｜'max'｜'need'（同路線上一層還沒點）｜'prof'（第 3 層要熟練 Lv5）｜'points'
  function treeWhy(content, career, ace, id) {
    const N = treeNode(content, ace, id); if (!treeLive(N)) return 'locked';
    const tr = ((career && career.tree) || {})[ace] || {}, k = nonNeg(tr[id]), L = treeLayer(id);
    if (k >= treeMaxOf(N)) return 'max';
    if (L > 1 && !(nonNeg(tr[treePathOf(id) + (L - 1)]) > 0)) return 'need';
    const P = treePoints(content, career, ace);
    if (L >= 3 && P.level < treeLv3(content)) return 'prof';
    if (P.left < treeCost(content, ace, id, k + 1)) return 'points';
    return null;
  }
  const treeCopy = (career, ace) => { const c = careerCopy(career), t = {}; for (const x of TIERS) t[x] = Object.assign({}, ((career && career.tree) || {})[x] || {}); c.tree = t; return c; };
  function treeBuy(content, career, ace, id) {
    if (!TIERS.includes(ace)) return { ok: false, error: 'locked' };
    const why = treeWhy(content, career, ace, id); if (why) return { ok: false, error: why };
    const c = treeCopy(career, ace); c.tree[ace][id] = nonNeg(c.tree[ace][id]) + 1;
    return { ok: true, career: c };
  }
  // 退一級：同路線下一層還點著＝'dep'（先退下一層）；沒點過＝'none'
  function treeSell(content, career, ace, id) {
    const tr = ((career && career.tree) || {})[ace] || {}, k = nonNeg(tr[id]);
    if (!TIERS.includes(ace) || !k) return { ok: false, error: 'none' };
    if (k === 1 && nonNeg(tr[treePathOf(id) + (treeLayer(id) + 1)]) > 0) return { ok: false, error: 'dep' };
    const c = treeCopy(career, ace); if (k > 1) c.tree[ace][id] = k - 1; else delete c.tree[ace][id];
    return { ok: true, career: c };
  }
  function treeRespec(content, career, ace) { const c = treeCopy(career, ace); if (TIERS.includes(ace)) c.tree[ace] = {}; return { ok: true, career: c }; }
  // 一派的樹整理（careerFix、treeArgs）：只留活的節點、級數截到上限、上一層沒點的拿掉（第 3 層熟練不到 Lv5 也拿掉）；點數超過＝這派全部退回
  function treeFixOne(content, ace, tree, profXp) {
    const tr = isPlain(tree) ? tree : {}, out = {};
    for (const N of treeNodes(content, ace)) {                    // 節點照 a1…c3 的順序：同路線上一層一定先看過
      if (!treeLive(N)) continue;
      const k = Math.min(treeMaxOf(N), nonNeg(tr[N.id])), L = treeLayer(N.id); if (!k) continue;
      if (L > 1 && !(out[treePathOf(N.id) + (L - 1)] > 0)) continue;
      if (L >= 3 && profLevel(content, profXp).level < treeLv3(content)) continue;
      out[N.id] = k;
    }
    const prof = {}; prof[ace] = nonNeg(profXp);
    const t = {}; t[ace] = out;
    return treePoints(content, { prof, tree: t }, ace).left < 0 ? {} : out;
  }
  // newRun 的 facTal（畫面 createRun：?fac=1 才給）：關樂歷（career.off）＝{}（等於新帳號）；其他＝treeFixOne 過的 {節點: 級}
  function treeArgs(content, career, ace) {
    const c = career || {}; if (c.off || !TIERS.includes(ace) || !facCfg(content)) return {};
    return treeFixOne(content, ace, (c.tree || {})[ace], (c.prof || {})[ace]);
  }
  // 樂歷頁派樹分頁用：[{id, path, layer, name, text, op, pick?, cell?, n?, max, k（已點幾級）, cost（下一級幾點；滿了 null）, why（treeWhy；滿了 'max'）, soon?}]
  function treeList(content, career, ace) {
    const tr = ((career && career.tree) || {})[ace] || {};
    return treeNodes(content, ace).map(N => {
      const k = nonNeg(tr[N.id]), live = treeLive(N), max = treeMaxOf(N);
      const x = { id: N.id, path: treePathOf(N.id), layer: treeLayer(N.id), name: N.name || '', text: N.text || '', op: N.op || null, max, k: live ? Math.min(k, max) : 0,
        cost: live && k < max ? treeCost(content, ace, N.id, k + 1) : null, why: live ? treeWhy(content, career, ace, N.id) : 'locked' };
      if (N.pick) x.pick = N.pick; if (N.cell) x.cell = N.cell; if (N.n != null) x.n = N.n | 0; if (N.soon) x.soon = String(N.soon);
      return x;
    });
  }
  // newRun／switchAce 收的 facTal：只留這派活的節點、級數截到上限（不驗前置與點數：sim --factal 可以直接給；畫面一律走 treeArgs）
  function facTalOf(content, ace, tal) {
    const out = {}; if (!isPlain(tal)) return out;
    for (const N of treeNodes(content, ace)) { if (!treeLive(N)) continue; const k = Math.min(treeMaxOf(N), nonNeg(tal[N.id])); if (k) out[N.id] = k; }
    return out;
  }
  // 派樹 start 節點的意思（content.factions.treeStart；棒三裁定 'first'，build3/SIM.md）：'first'＝本派格先出這項（照節點順序排在雜湊前面；照樣佔那一級、不白送）；
  //   'start'＝規格原意「開局就有」（白送：一項≈一級屬性，全樹 F6 +90–124% → 不採，留著當對照；沒寫＝'start'）
  const treeMode = content => { const m = (facCfg(content) || {}).treeStart; return m === 'first' ? m : 'start'; };
  // 派樹 'first'：本派格先出的那幾項（start 節點的 pick，照節點順序）
  const treeFirst = (run, content) => { if (treeMode(content) !== 'first') return []; const tal = (run.fac && run.fac.tal) || {}, out = [];
    for (const N of treeNodes(content, run.ace)) if (treeLive(N) && N.op === 'start' && tal[N.id] > 0 && N.pick && !out.includes(N.pick)) out.push(N.pick); return out; };
  // 'start' 模式的 start 節點：開局就有那項本派選項（sign +1：記進 run.fac.picks；地下串連 maxHp 照加）；sign −1（換派前）：把地下串連加的聲望上限拿回來。'first' 模式什麼都不做
  function facStart(run, content, sign) {
    const tal = (run.fac && run.fac.tal) || {};
    if (treeMode(content) === 'first') return;
    for (const id of Object.keys(tal)) {
      const N = treeNode(content, run.ace, id); if (!treeLive(N) || N.op !== 'start') continue;
      const P = facPickDef(content, run.ace, N.pick); if (!P) continue;
      if (sign > 0) run.fac.picks[P.id] = 1;
      if (P.op === 'maxHp') { const n = (P.n | 0) * (sign > 0 ? 1 : -1); run.maxHp += n; run.hp = Math.max(1, run.hp + n); run.hpIn = run.hp; }
    }
  }
  const facTalHas = (run, content, op) => { const tal = (run && run.fac && run.fac.tal) || {}; for (const id of Object.keys(tal)) { const N = treeNode(content, run.ace, id); if (treeLive(N) && N.op === op && tal[id] > 0) return N; } return null; };

  // 加成與配件（§2.1.3 outcome）。pPlay/ePlay = {attr, star, ace}。純函式，除非 commit（只會改 dustUsed、第 D 波流派的這場計數 st.p.facN／st.stats.fac）
  //   hyp：'on'＝假設這手發動王牌（preview act.apex）；'off'＝不算王牌（結果句的「差幾點」）；沒給＝照對決現在的狀態
  //   第 D 波棒二三流派（?fac=1；st.p.fac＝'hall'|'pearl'|'heresy'、st.p.fx＝facFxOf 疊好的被動＋本派選項；SPEC-D §3.3–§3.4）：不靠 apexMode 的派別路，沒有 st.p.fac 時一行都不走（逐字現況）。
  //     步驟：①本派選項加星（識貨／失真）③冷門門檻 Infinity ④冷門扣他那張的星／經典同色大 2 星扣整張 ⑥品味（冷門以小搏大那手不加）⑦拆穿多扣（異端 critPre；換一格的 critAdd 同一步取大）
  //     ⑨′異端比星輸多扣 ⑪′冷門被剋多扣（他的品味、被唬到多扣之後，你的底氣之前）⑫′經典同色平手你扣 1（不吃底氣、不加他的品味）⑬回聲望（吸血／拆穿回聲望；跟頂點卡取大、不相加）
  //   hypPeek（只給 base 那次內部呼叫）：假設這手發動的是看穿（reveal）＝跟 resolve 一樣當作「看穿確認過的那手」（審查 棒二：preview 原本只看 P.apexOn，resolve 才有）
  function outcome(st, pPlay, ePlay, commit, hyp, hypPeek) {
    const AX = st.apexMode && hyp !== 'off' ? apexNow(st, hyp === 'on') : null, M = AX ? AX.M : null;
    const hPeek = !!hypPeek || !!(AX && AX.on && AX.on.hyp && AX.ops.some(x => x.op === 'reveal'));   // preview 假設這手發動看穿：resolve 時 activateApex 已寫好 P.apexOn.reveal
    const base = AX ? outcome(st, pPlay, ePlay, false, 'off', hPeek) : null;   // 先算（commit 會改 dustUsed）
    const FX = st.p.fac && st.p.fx ? st.p.fx : null, fac = FX ? st.p.fac : null, FN = FX ? (st.p.facN || {}) : null, fk = FX ? {} : null;
    const notes = [];
    let ps = pPlay.star | 0;
    const boost = 'boost_' + pPlay.attr;
    if (!pPlay.ace && hasRelic(st, boost)) { ps += CFG.boostStar; notes.push(noteOf(st, boost)); }
    if (FX && !pPlay.ace && FX.starPlus && FX.starPlus[pPlay.attr] > 0) ps += FX.starPlus[pPlay.attr] | 0;   // ① 本派選項：識貨（經典 +1）／失真（硬蕊 +1）；王牌不加
    let es = ePlay.star | 0;
    if (M) { if (M.star) ps += M.star; if (M.eStar) es = Math.max(0, es - M.eStar); }      // ①②
    const EB = encBonus(st);                                                   // 第 I 波安可「下一手」：+1 星（王牌不加，跟頂點卡加星相加）／剋中多扣（倍數之後）
    if (EB && EB.give === 'star' && !pPlay.ace && EB.n > 0) { ps += EB.n; notes.push(encNote(st, 'star', EB.n)); }
    const thr = FX && FX.counterAlways ? Infinity : M && M.pThr ? M.pThr : 0;          // ③ 冷門：你剋他永遠剋得動（取代頂點卡的門檻）
    const r = clash({ attr: pPlay.attr, star: ps, ace: !!pPlay.ace }, { attr: ePlay.attr, star: es, ace: !!ePlay.ace }, thr ? { pThr: thr } : undefined);
    const same = pPlay.attr === ePlay.attr, r0 = r.kind;                       // 經典的整張只認「本來就比贏」的同色（頂點卡比星多算造出來的照差額）
    if (FX && FX.counterAlways && r.kind === 'counter') {                     // ④ 冷門：扣他那張的星數（你丟王牌照扣 7、他更大照他的）
      r.toE = pPlay.ace ? Math.max(ps, es) : es;
      r.underdog = !pPlay.ace && es - ps >= CFG.threshold;
      fk[r.underdog ? 'underdog' : 'borrow'] = 1;
    }
    if (M) {                                                                    // ③④
      if (M.theirStar && r.kind === 'counter') r.toE = Math.max(r.toE, es);
      if (M.mirrorPlus && (r.kind === 'mirrorWin' || r.kind === 'mirrorLose' || r.kind === 'tie')) {
        const d = ps + M.mirrorPlus - es;
        r.kind = d > 0 ? 'mirrorWin' : d < 0 ? 'mirrorLose' : 'tie'; r.toE = Math.max(0, d); r.toP = Math.max(0, -d);
      }
      if (M.tieWin && r.kind === 'tie') r.toE += M.tieWin;
      if (M.loseZero && r.kind === 'mirrorLose') r.toP = 0;
    }
    if (FX && FX.mirrorWinFull && same && r0 === 'mirrorWin' && r.kind === 'mirrorWin' && ps - es >= (FX.fullMin | 0)) {   // ④ 經典：同色比星大 fullMin 以上＝扣整張（＋初版）；跟頂點卡比星多算取大
      r.toE = Math.max(r.toE, ps + (FX.fullPlus | 0)); fk.full = 1;
    }
    if (r.kind === 'counter' && hasRelic(st, COLOR_RELIC[pPlay.attr])) { r.toE += CFG.colorRelicBonus; notes.push(noteOf(st, COLOR_RELIC[pPlay.attr])); }
    if (r.kind === 'countered' && !st.p.dustUsed && hasRelic(st, 'dustcover')) {
      r.toP = Math.max(0, r.toP - CFG.dustcoverCut); notes.push(noteOf(st, 'dustcover'));
      if (commit) st.p.dustUsed = true;
    }
    if (r.kind === 'tie' && hasRelic(st, 'cleaner')) { r.toE += CFG.cleanerTie; notes.push(noteOf(st, 'cleaner')); }
    // 品味／底氣（無限試煉；逐字照 harness core.cjs modded＋TAKEN.half）：配件算完才加減
    const P = st.p, E = st.e, pA = P.atk | 0, pD = P.def | 0, eA = E.atk | 0, eD = E.def | 0;
    if (r.kind === 'counter' && r.toE > 0 && pA) {
      const a = FX && FX.underdogNoAtk && r.underdog ? 0 : pA;                 // ⑥ 冷門：以小搏大（他大你 2 星以上）那手不加品味
      if (a) { r.toE += a; notes.push(statNote(st, 'atk', a)); }
    }
    let caught = false, spineN = 0;
    if (M || FX) caught = r.kind === 'counter' && r.toE > 0 && feintOf(st, ePlay.attr);   // 他這手是看得出來的唬、被你剋中＝抓到（＝結果句「你看穿了！」；11-17 起不看計畫色：半指出另一色＝照實、不露不算、第二種唬法照樣算）
    const peeked = !!(FX && ((P.apexOn && P.apexOn.reveal && P.apexOn.n === st.n) || hPeek));   // 看穿確認過的那手：異端不多扣、不回聲望（preview 假設發動看穿＝hPeek）
    const crit = fac === 'heresy' && caught && !peeked && ((FX.critMult || 1) > 1 || FX.critPre > 0 || FX.critHeal > 0);
    const cAdd = caught && M && M.critAdd > 0 ? M.critAdd | 0 : 0;             // 換一格（?fac=1&apex=1）：拆穿那手多扣 n
    if (M && M.counterPlus && r.kind === 'counter' && r.toE > 0) r.toE += M.counterPlus;
    let critN = 0;
    if (crit || cAdd) {                                                         // ⑦ 拆穿：多扣（加法；異端 critPre 跟頂點卡 critAdd 同一步取大）、倍數跟頂點卡同一步取大、不相乘
      critN = crit ? FX.critPre | 0 : 0;
      r.toE += Math.max(critN, cAdd);
      const m = Math.max(crit ? FX.critMult || 1 : 1, M && M.mult && r.kind === 'counter' ? M.mult : 1, M && M.crit > 1 && caught ? M.crit : 1);
      if (m > 1) r.toE = Math.ceil(r.toE * m);
      if (crit && critN > 0 && critN >= cAdd) fk[FX.critSafe ? 'crit2' : 'crit'] = 1;
    } else if (M) {                                                             // ⑦⑧
      if (M.mult && r.kind === 'counter' && r.toE > 0) r.toE *= M.mult;
      if (M.crit > 1 && caught) r.toE *= M.crit;
    }
    if (EB && EB.give === 'hit' && EB.n > 0 && r.kind === 'counter' && r.toE > 0) { r.toE += EB.n; notes.push(encNote(st, 'hit', EB.n)); }   // 安可多扣：倍數之後、他的底氣之前（SPEC-I §1.1-8）
    if (M) {
      if (M.bounce && (r.kind === 'countered' || (M.bounceLose && r.kind === 'mirrorLose')) && r.toP > 0) {   // 他這手要扣你的（他品味前）一半捨去改扣他
        const k = Math.floor(r.toP / 2); r.toE += k; r.toP -= k; r.bounced = k;
      }
    }
    if (r.toE > 0 && eD) { const v = half(r.toE, eD); if (v < r.toE) { notes.push(statNote(st, 'eDef', r.toE - v)); r.toE = v; } }
    if (FX && FX.loseCost > 0 && r.kind === 'mirrorLose' && r.toP > 0 && !(FX.loseFree && (FN.lose | 0) === 0)) { r.toP += FX.loseCost | 0; fk.loseCost = 1; }   // ⑨′ 異端代價：比星輸多扣 1（臉皮厚：每場第一次不多扣）
    if (r.toP > 0) {
      let x = r.toP;
      const sp = eA && FX && FX.spine > 0 && r.kind === 'mirrorLose' && (FN.lose | 0) === 0 ? Math.min(eA, FX.spine | 0) : 0;   // 棒三派樹「刺蝟」（異端乙 II）：每場第一次比星輸，他的品味少算 n
      if (sp) { fk.spine = 1; spineN = sp; }
      if (eA - sp > 0) { x += eA - sp; notes.push(statNote(st, 'eAtk', eA - sp)); }
      if (E.hit > 0 && r.kind === 'countered' && feintOf(st, ePlay.attr)) { x += E.hit; notes.push(statNote(st, 'feint', E.hit)); }   // 11-17 被唬到多扣（他的品味之後）
      if (FX && FX.counteredCost > 0 && r.kind === 'countered') { x += FX.counteredCost | 0; fk.cCost = 1; }   // ⑪′ 冷門代價：被剋多扣 1（有人記得＝不多扣）
      if (pD) { const v = half(x, pD); if (v < x) { notes.push(statNote(st, 'def', x - v)); x = v; } }
      if (M && r.kind === 'countered') { if (M.shield) x = Math.max(1, x - M.shield); if (M.halfIn) x = Math.ceil(x / 2); }   // ⑫ 最少扣 1
      if (FX && FX.counteredCut > 0 && r.kind === 'countered' && (FN.countered | 0) === 0) { x = Math.max(1, x - FX.counteredCut); fk.cut = 1; }   // 見過世面／冷板凳：每場第一次被剋少扣 2（最少 1）
      r.toP = x;
    }
    if (FX && FX.tieCost > 0 && same && r.kind === 'tie' && !(FX.tieFree && (FN.tie | 0) === 0)) { r.toP += FX.tieCost | 0; fk.tieCost = 1; }   // ⑫′ 經典代價：同色平手你扣 1（老派：每場第一次不算）
    if (FX && FX.thorn > 0 && r.kind === 'countered' && (FN.thorn | 0) < (FX.thornMax | 0)) { r.toE += FX.thorn | 0; fk.thorn = 1; }   // 第二招反傷（冷門）：被剋他也扣 2（不吃他的底氣），一場最多 thornMax 次
    if (M && M.leech && caught) r.heal = Math.min(Math.max(0, st.p.max - st.p.hp), Math.ceil(Math.min(r.toE, Math.max(0, st.e.hp)) / 2));   // ⑬（resolveTurn 扣完聲望後回）
    let facHealOver = false;
    if (FX) {                                                                   // ⑬ 回聲望：第二招吸血（經典：整張那手扣到的一半，一場最多 leechMax）、異端拆穿回 critHeal（＋回音）；跟頂點卡取大、不相加
      let fh = 0, hk = null;
      if (FX.leech && fk.full && (FN.leech | 0) < (FX.leechMax | 0)) { fh = Math.min((FX.leechMax | 0) - (FN.leech | 0), Math.ceil(Math.min(r.toE, Math.max(0, E.hp)) / 2)); hk = 'leech'; }
      if (crit && r.toE >= 1 && FX.critHeal > 0) { const h = (FX.critHeal | 0) + (FX.critHealPlus | 0); if (h > fh) { fh = h; hk = 'heal'; } }
      if (FX.tieHeal > 0 && same && r.kind === 'tie' && !((FN.tieHeal | 0) > 0) && (FX.tieHeal | 0) > fh) { fh = FX.tieHeal | 0; hk = 'insider'; }   // 棒三派樹「圈內人」（異端乙 III）：同色平手回 n，每場一次
      const pre = AX && AX.on && AX.on.hyp ? AX.ops.reduce((a, x) => a + (x.op === 'heal' ? x.params.n | 0 : 0), 0) : 0;   // preview 假設這手發動回聲望型王牌：resolve 時已先回了（activateApex）
      const fv = fh > 0 ? Math.min(Math.max(0, P.max - Math.min(P.max, P.hp + pre)), fh) : 0;
      if (fv > 0 && fv > (r.heal | 0)) { if (M && M.leech && caught) facHealOver = true; r.heal = fv; fk[hk] = 1; }   // 頂點卡回的被流派蓋過（取大）：r.heal 不是那張卡的（apexInfo 不算它回的）
    }
    r.notes = notes; r.pStar = ps;
    if (AX) {
      const x = apexInfo(st, AX, r, base, pPlay, ePlay, caught, ps, es, facHealOver);
      r.apex = x.info; if (x.note) notes.push(x.note);
    }
    if (FX) {                                                                   // 結果行小字 {fac, kind, n, text}（SPEC-D §3.10）；{n}：整張／借／以小搏大＝這手扣他的總數，其他＝多扣／回的那一份
      const NT = st.facNotes || {};
      const nOf = { full: r.toE, borrow: r.toE, underdog: r.toE, crit: critN, crit2: critN, heal: r.heal | 0, leech: r.heal | 0, loseCost: FX.loseCost | 0, cCost: FX.counteredCost | 0, tieCost: FX.tieCost | 0, thorn: FX.thorn | 0,
        spine: spineN, insider: r.heal | 0 };
      r.fac = Object.assign({}, fk);
      for (const k of FAC_NOTE_ORDER) if (fk[k] && NT[k]) notes.push({ fac, kind: k, n: nOf[k], text: String(NT[k]).replace(/\{n\}/g, nOf[k]) });
      if (commit) {
        const FC = P.facN || (P.facN = {});
        if (same && r.kind === 'tie') FC.tie = (FC.tie | 0) + 1;
        if (r.kind === 'countered') FC.countered = (FC.countered | 0) + 1;
        if (r.kind === 'mirrorLose') FC.lose = (FC.lose | 0) + 1;
        if (fk.thorn) FC.thorn = (FC.thorn | 0) + 1;
        if (fk.leech) FC.leech = (FC.leech | 0) + (r.heal | 0);
        if (fk.insider) FC.tieHeal = (FC.tieHeal | 0) + 1;
        if (r.kind === 'counter' && r.toE > 0 && !caught && st.plan && st.plan.hint && (st.plan.hint.kind || 'one') === 'one' && ePlay.attr === st.plan.hint.attr) FC.honest = (FC.honest | 0) + 1;   // 信對（明指照實、你剋中）：派樹深耕用（棒三）
        if (caught && !peeked) FC.caught = (FC.caught | 0) + 1;                // 拆穿（剋中他看得出來的唬）
        const SF = st.stats.fac || (st.stats.fac = {}); for (const k of Object.keys(fk)) SF[k] = (SF[k] | 0) + 1;
      }
    }
    return r;
  }
  // 11-17 看得出來的唬：他這手出的 eAttr 跟提示對不上——明指＝不是提示那色（含讀你那手）；半指＝正好出他說不出的那色；不露＝沒說什麼，不算。
  //   （DESIGN §2.2 原寫「他出的 ≠ 計畫色」；半指時計畫色你看不到，出另一色也沒說謊，結果句寫「他照實出」，所以只算看得出來的那種）
  //   用在：被唬到多扣（read.hit）、頂點卡試做的看穿章與拆穿（＝duel.js clashText 的 lie）。lieOf 吃 plan.hint 或 view().hint（明指有 attr、半指有 not）
  function lieOf(h, eAttr) {
    if (!h) return false;
    const k = h.kind || 'one';
    return k === 'one' ? eAttr !== h.attr : k === 'half' ? eAttr === h.not : false;
  }
  function feintOf(st, eAttr) { return lieOf(st.plan && st.plan.hint, eAttr); }
  // 底氣最多擋一半：被扣 x、底氣 D → max(⌈x/2⌉, x−D)（variants TAKEN.half）
  const half = (x, D) => Math.max(Math.ceil(x / 2), x - D);
  // 結果行補的那句（C.trial.notes 由 playerDef 帶進對決；沒有字時 text 空、畫面不顯示）
  function statNote(st, stat, n) {
    const t = (st.noteText && st.noteText[stat]) || '';
    return { stat, n, text: t ? String(t).replace('{n}', n) : '' };
  }

  // ---------- duel creation ----------
  function cardFrom(content, id) { const c = content && content.cards && content.cards[id]; if (!c) throw new Error('engine: missing card ' + id); return c; }
  // 提示句表（只有 id）。content 有 hintLines（11-17 句庫）→ { one:{c,o,h}, half:{c,o,h}, none:[], voice:{id → 客人鍵} }：明指每色＝C.hints 那 5 句＋hintLines.one；
  //   沒有 hintLines（舊 content）→ 舊形狀 {c,o,h}（startDuel 照舊選句，同種子一字不差）
  function hintTableOf(content) {
    const H = content && content.hints;
    if (!H || !ATTRS.every(a => Array.isArray(H[a]) && H[a].length)) return null;
    const idOf = h => (h && typeof h === 'object') ? h.id : h;
    const t = {}; for (const a of ATTRS) t[a] = H[a].map(idOf).filter(Boolean);
    const L = content.hintLines;
    if (!L || typeof L !== 'object' || !L.one) return t;
    const voice = {}, ids = arr => (Array.isArray(arr) ? arr : []).filter(x => x && x.id).map(x => { if (x.voice) voice[x.id] = x.voice; return x.id; });
    const out = { one: {}, half: {}, none: ids(L.none), voice };
    for (const a of ATTRS) { out.one[a] = t[a].concat(ids((L.one || {})[a])); out.half[a] = ids((L.half || {})[a]); }
    return out;
  }
  // 新形狀的表 → 這位客人那一份（對決只存這份：誰都會講的＋他自己的；別人的個性句不帶進來）
  function hintTableFor(T, eid) {
    const v = T.voice || {}, gen = ids => ids.filter(id => !v[id]), own = ids => ids.filter(id => v[id] && v[id] === eid);
    const arr = x => (Array.isArray(x) ? x : []).filter(id => typeof id === 'string' && id);
    const out = { one: {}, half: {}, none: gen(arr(T.none)), own: { one: {}, half: {}, none: own(arr(T.none)) } };
    for (const a of ATTRS) {
      out.one[a] = gen(arr((T.one || {})[a])); out.own.one[a] = own(arr((T.one || {})[a]));
      out.half[a] = gen(arr((T.half || {})[a])); out.own.half[a] = own(arr((T.half || {})[a]));
    }
    return out;
  }
  const newHintTable = T => !!(T && T.one && ATTRS.every(a => Array.isArray(T.one[a]) && T.one[a].length));
  // enemyDef(content, id, {tutorial, pos, cls?, seedKey, runNo, playerAce, bossAce, planner}) — content enemy → eDef（§2.1.4）
  //   pos（無限試煉第幾位）：聲望、品味、底氣、出招難度、說真話機率照位數曲線（trialGuest；不再看角色），牌組照 trialDeck（eDef.ace＝他帶的王牌）；
  //     名字、小人、口頭禪、taste、誠實度的鍵照原角色。cls 沒給＝classAt(pos)
  //   沒給 pos（序章、教學、直接開打的對決）：聲望與牌單照 content；序章男子 easy、藏家 hard、其他 normal
  function enemyDef(content, id, o) {
    o = o || {};
    const E = content.enemies[id]; if (!E) throw new Error('engine: unknown enemy ' + id);
    const T = content.tutorial, tut = !!o.tutorial && !!T;
    const HT = content.honesty || HONESTY;
    const hk = HT[E.honesty] ? E.honesty : (E.prologue ? 'honest' : 'sometimes');
    const H = HT[hk] || HONESTY[hk];
    const pos = !E.prologue && Number.isInteger(o.pos) && o.pos > 0 ? o.pos : null;
    const cls = pos ? (POS_CLASSES.includes(o.cls) ? o.cls : classAt(pos)) : null;
    const g = pos ? trialGuest(content, pos, cls, o.tier) : null;
    let planner = o.planner || (g ? g.planner : E.prologue ? 'easy' : E.boss ? 'hard' : 'normal');
    const PL = content.planners || PLANNERS;
    const co = PL[planner] || PLANNERS[planner] || PLANNERS.normal;
    const d = { id, name: E.name, title: E.title || null, hp: tut ? T.hp : E.hp, taste: tasteStr(E.taste),
      deck: (E.deck || []).map(x => cardFrom(content, x)),
      honesty: hk, q: H.q, planner, coef: { w: co.w, nz: co.nz, mercy: !!co.mercy },
      elite: !!E.elite, boss: !!E.boss, atk: 0, def: 0, qMercy: trialCfg(content, o.tier).curve.mercyFeint, ace: null, pos: null, cls: null,
      sig: E.sig && E.sig.id && Number.isInteger(E.sig.n) ? { id: E.sig.id, n: E.sig.n } : null };   // 招牌（店主 11-13：序章男子第 2 手出 Eminem，打完掉在地上）
    if (g) {
      const main = ATTRS.includes(o.main) ? o.main : null;
      const td = trialDeck(content, id, pos, { seedKey: o.seedKey, runNo: o.runNo, playerAce: o.playerAce, bossAce: o.bossAce, bossCard: o.bossCard, cls, tier: o.tier, main, deckIds: o.deckIds });
      Object.assign(d, { hp: g.hp, atk: g.atk, def: g.def, q: g.q, deck: td.deck, ace: td.ace, pos, cls, elite: cls === 'elite', boss: cls === 'boss',
        title: guestTitle(content, pos, id, cls, o.tier), main });
      const MB = trialCfg(content, o.tier).curve.mainBias || {}, mb = pos >= (MB.from | 0) ? +MB.n || 0 : 0;
      if (main && mb > 0) d.mainBias = mb;                       // 出招偏主屬性（startDuel 存進 e.mainBias；beginHand 挑計畫時主屬性那色多算 mainBias 星）
      const mp = mercyPAt(content, pos, o.tier);
      if (mp < 1) d.mercyP = mp;                                // 第 11 位起：每手放水的機率（startDuel 存進 e.mercyP）
      // 11-17 讀牌加難（trialGuest）：有才帶（startDuel 存進 e；沒有＝0／1＝改版前）
      if (g.rho > 0) Object.assign(d, { rho: g.rho, rhoMul: g.rhoMul, rhoCap: g.rhoCap, rMercy: g.rMercy });
      if (g.beta < 1) d.beta = g.beta;
      if (g.half > 0) d.half = g.half;
      if (g.none > 0) d.none = g.none;
      if (g.hit > 0) d.hit = g.hit;
    }
    return d;
  }
  // playerDef(content, {bag:[ids], ace:tier, aceId?, relics:[ids], hp?, maxHp?, atk?, def?}, {apex?}) — a run (or anything shaped like it) → pDef
  //   run 帶著走的聲望（hp／maxHp）、品味（atk）、底氣（def）；沒有就 CFG.playerHp、0、0（教學重看、直接開打）
  //   o.apex（頂點卡試做）：王牌＝apexAceId(src, content) 那張，多 ability（能力複本）、apexText（結果句樣板）；沒有 content.apexTrial 就照舊
  //   o.fac（第 D 波棒二三流派；startFight 照 run.fac 給、序章不給）：src.fac 有＋content.factions 有 → 多 fac（派）、fx（facFxOf：被動＋本派選項）、facNotes（結果行樣板）、facIcon；
  //     跟 o.apex 同開時王牌能力走 apexAbilityOf（換一格），結果句樣板多 apexSwap.notes（critAdd）
  function playerDef(content, src, o) {
    const hp = Number.isInteger(src.hp) && src.hp > 0 ? src.hp : CFG.playerHp;
    const maxHp = Number.isInteger(src.maxHp) && src.maxHp >= hp ? src.maxHp : Math.max(hp, CFG.playerHp);
    const apex = !!(o && o.apex) && !!src.ace && !!apexCfg(content);
    const d = { hp, maxHp, atk: src.atk | 0, def: src.def | 0, noteText: (((content || {}).trial || {}).notes) || null,
      bag: (src.bag || []).map(x => (o && o.wear && wornCard(content, src, x)) || cardFrom(content, x)), ace: src.ace ? cardFrom(content, apex ? apexAceId(src, content) : content.aces[src.ace]) : null,
      relics: (src.relics || []).map(r => relicObj(r, content)).filter(r => r && !r.slot) };   // 側袋（slot）對決裡沒有效果、也不佔對決的配件格
    const fac = !!(o && o.fac) && !!src.fac && typeof src.fac === 'object' && TIERS.includes(src.ace) && !!facCfg(content);
    if (apex && d.ace) {
      d.ability = fac ? apexAbilityOf(content, d.ace.id, src) : abilityOf(content, d.ace.id);
      const A = apexCfg(content);
      d.apexText = { notes: clone(A.notes || {}), holdNotes: clone(A.holdNotes || {}) };
      if (fac) { const S = facCfg(content).apexSwap; if (S && S.notes) Object.assign(d.apexText.notes, clone(S.notes)); }
    }
    if (fac) {                                                // 第 D 波棒二：派別被動（outcome 的派別路）
      const F = facCfg(content);
      d.fac = src.ace; d.fx = facFxOf(content, src, src.ace); d.facNotes = clone(F.notes || {}); d.facIcon = (F[src.ace] && F[src.ace].icon) || null;
    }
    // 第 I 波安可（o.encore：startFight 主線對決才給）：數字、結果句樣板；7 星王牌那半多 aceEnc（頂點卡那半在 ability.encore）
    if (o && o.encore && d.ace && encCfg(content)) {
      const X = encCfg(content);
      d.encNum = encNumOf(content); d.encText = { note: clone((X.ui || {}).note || {}) };
      if (!apex) { const e = aceEncoreOf(content, src.ace, fac); if (e) d.aceEnc = e; }
    }
    return d;
  }
  function normScript(sc) {
    if (!sc || !Array.isArray(sc.plays)) return null;
    return { plays: sc.plays.map(p => ({ id: p.id, attr: p.attr })), hints: (sc.hints || []).slice(), hand: (sc.hand || []).slice(), draw: (sc.draw || []).slice() };
  }

  function startDuel(pDef, eDef, opts) {
    opts = opts || {};
    const sc = normScript(opts.script);
    const hp = pDef.hp || CFG.playerHp;
    const hk = HONESTY[eDef.honesty] ? eDef.honesty : 'honest';
    const co = eDef.coef || PLANNERS[eDef.planner] || PLANNERS.normal;
    const st = {
      v: VERSION, rng: (opts.seed >>> 0) || 1, n: 0, over: null,
      p: { hp, max: Math.max(hp, pDef.maxHp || hp), draw: [], hand: [], disc: [], ace: pDef.ace || null, aceUsed: false,
        relics: (pDef.relics || []).map(r => relicObj(r)).filter(Boolean).slice(0, CFG.relicMax), dustUsed: false, last: null,
        atk: pDef.atk | 0, def: pDef.def | 0 },
      e: { id: eDef.id, name: eDef.name, title: eDef.title || null, elite: !!eDef.elite, boss: !!eDef.boss,
        honesty: hk, q: eDef.q != null ? +eDef.q : HONESTY[hk].q, qMercy: eDef.qMercy != null ? +eDef.qMercy : 0,
        planner: eDef.planner || 'normal', coef: { w: co.w, nz: co.nz, mercy: !!co.mercy }, taste: tasteStr(eDef.taste),
        hp: eDef.hp, max: eDef.hp, atk: eDef.atk | 0, def: eDef.def | 0, deckIds: [], deckPub: [], pile: [], hand: [], thrown: [], last: null, deckSize: 0,
        main: ATTRS.includes(eDef.main) ? eDef.main : null },   // 客人主屬性（第 A 波 6；view.eMain「常出：冷門」）；沒有＝null
      hintTable: newHintTable(opts.hintTable) ? hintTableFor(opts.hintTable, eDef.id)
        : opts.hintTable && ATTRS.every(a => Array.isArray(opts.hintTable[a]) && opts.hintTable[a].length) ? clone(opts.hintTable) : clone(DEFAULT_HINTS),
      noteText: pDef.noteText ? Object.assign({}, pDef.noteText) : null,
      script: sc, plan: null, last: null, log: [],
      stats: { hands: 0, counter: 0, countered: 0, mirror: 0, tie: 0, blocked: 0, blockedYou: 0, bluffs: 0, honest: 0, caught: 0, ace: 0, relicNotes: 0 },
    };
    // 頂點卡試做（opts.apex＋pDef.ability）：你的王牌改成一場一次的輔助卡（不比星）；沒有就照舊 7 星王牌（不加任何欄位）
    if (opts.apex && pDef.ace && pDef.ability) {
      st.apexMode = true; st.p.ability = clone(pDef.ability); st.p.apexOn = null;
      st.apexText = pDef.apexText ? clone(pDef.apexText) : null;
      st.stats.apexAt = 0; st.stats.apexHits = 0;
    }
    // 第 I 波安可（opts.encore＋pDef 有安可：7 星王牌 aceEnc／頂點卡 ability.encore）；opts.encCarry＝上一場留下來的 {give}（give 對得上才吃）。沒有就一個欄位都不加
    if (opts.encore && pDef.ace && pDef.encNum) {
      const ec = st.apexMode ? st.p.ability && st.p.ability.encore : pDef.aceEnc;
      if (encOk(ec) && (st.apexMode || ec.give === 'again')) {
        const P0 = st.p, cy = opts.encCarry;
        P0.enc = { when: ec.when, give: ec.give, mode: st.apexMode ? 'apex' : 'ace', state: 'idle', start: null, from: null, at: null, src: null, lit: null };
        P0.encPrev = null;
        if (st.apexMode) P0.apexHist = []; else P0.encAce = false;
        st.encNum = Object.assign({}, pDef.encNum); st.encText = clone(pDef.encText || { note: {} });
        st.stats.enc = { lit: 0, carryIn: 0, carryOut: 0, used: 0, heal: 0 };
        if (cy && typeof cy === 'object' && cy.give === ec.give && ec.give !== 'heal') {
          P0.enc.src = 'carry'; st.stats.enc.carryIn = 1;
          if (ec.give === 'again') P0.enc.state = 'carry'; else { P0.enc.state = 'next'; P0.enc.at = 1; }
        }
      }
    }
    // 第 D 波棒二三流派（pDef.fac）：被動 fx、這場的計數 facN（同色平手／被剋／比星輸／反傷次數／吸血回了幾／信對／拆穿）、結果行樣板；沒有就一個欄位都不加
    if (pDef.fac && pDef.fx) {
      st.p.fac = pDef.fac; st.p.fx = clone(pDef.fx); st.p.facN = {}; st.p.facIcon = pDef.facIcon || null;
      st.facNotes = pDef.facNotes ? clone(pDef.facNotes) : null; st.stats.fac = {};
    }
    // 第 I 波 I-2：opts.wear＝這場算耐聽（主線、上場制那幾輪、這一位第一場）→ 出牌次數記在 p.plays；opts.lineup＝上場制（手牌＝上場那幾張；畫面不播滑入）。沒有就不加欄位
    if (opts.wear) { st.p.plays = {}; st.wearOn = true; }
    if (opts.lineup) st.lineup = true;
    const P = st.p, E = st.e;
    // 放水照位數機率（第 11 位起；eDef.mercyP < 1 才有這兩欄，其他對決的狀態一字不改）：mercyKey＝對決種子（mercyOn 的雜湊用；不取 duel.rng）
    if (eDef.mercyP != null && +eDef.mercyP < 1) { E.mercyP = Math.max(0, +eDef.mercyP); E.mercyKey = st.rng >>> 0; }
    if (E.main && +eDef.mainBias > 0) E.mainBias = +eDef.mainBias;   // 出招偏主屬性（第 A 波 6 審查；有主屬性的客人才有這欄）
    // 11-17 讀牌加難（eDef 有才存；舊存檔、序章、直接開打沒有＝0／1＝改版前）。hkey＝對決種子：讀心、唬法、提示分級、半指那色的雜湊用（不取 duel.rng）
    E.hkey = st.rng >>> 0;
    if (+eDef.rho > 0) { E.rho = +eDef.rho; E.rhoMul = +eDef.rhoMul > 0 ? +eDef.rhoMul : 1; E.rhoCap = eDef.rhoCap != null ? +eDef.rhoCap : 0.9; E.rMercy = eDef.rMercy != null ? +eDef.rMercy : 0.7; }
    if (eDef.beta != null && +eDef.beta < 1) E.beta = Math.max(0, +eDef.beta);
    if (+eDef.half > 0) E.half = +eDef.half;
    if (+eDef.none > 0) E.none = +eDef.none;
    if (+eDef.hit > 0) E.hit = eDef.hit | 0;
    // 一趟內看過的提示句（新形狀的表才有；startFight 傳 run.hintSeen，舊的在前、最近的在後；這場抽到的也接上去，finishFight 寫回 run）
    if (st.hintTable.own) st.hintSeen = Array.isArray(opts.hintSeen) ? opts.hintSeen.filter(x => typeof x === 'string').slice(-HINT_SEEN_MAX) : [];
    // 你的牌堆：script 的起手＋抽牌在前，剩下的照包包順序（有 script 不洗；教學第 5 手要抽到特價箱那幾張）；沒 script 整包洗
    const bag = (pDef.bag || []).filter(Boolean).slice();
    const takeIds = ids => { const out = []; for (const id of ids || []) { const k = bag.findIndex(c => c.id === id); if (k >= 0) out.push(bag.splice(k, 1)[0]); } return out; };
    if (sc) { const h = takeIds(sc.hand), d = takeIds(sc.draw); P.draw = h.concat(d, bag); }
    else P.draw = shuffle(bag, st);
    // 他的牌堆：牌單＋（藏家）你沒選的王牌；洗牌、不洗回（script：照 plays 的順序，其餘照牌單順序接在後面）
    const deck = (eDef.deck || []).slice();
    if (opts.enemyAce) deck.push(opts.enemyAce);
    E.deckSize = deck.length; E.deckIds = deck.map(c => c.id);
    E.deckPub = deck.map(c => ({ id: c.id, c: star(c, 'c'), o: star(c, 'o'), h: star(c, 'h'), tier: c.tier || null, plus: c.plus ? { attr: c.plus.attr, n: c.plus.n } : null }));   // 公開牌單的星數（加星後；view.eDeck）
    if (sc) {
      const first = []; for (const pl of sc.plays) { const k = deck.findIndex(c => c.id === pl.id); if (k >= 0) first.push(deck.splice(k, 1)[0]); }
      E.pile = first.concat(deck);
    } else {
      E.pile = shuffle(deck, st);
      // 招牌那張排到最前面（一開場就在手上、第 sig.n 手打出來）；不多抽亂數（每手固定 8 次）
      const sg = eDef.sig, k = sg ? E.pile.findIndex(c => c && c.id === sg.id) : -1;
      if (k > 0) E.pile.unshift(E.pile.splice(k, 1)[0]);
      E.sig = sg || null;
    }
    for (let i = 0; i < CFG.handSize; i++) P.hand.push(pull(st).card);
    const events = [];
    beginHand(st, events);
    return { duel: st, events };
  }

  // one card off your draw pile (reshuffles the discards when it runs out)
  function pull(st) {
    const P = st.p; let reshuffled = false;
    if (!P.draw.length && P.disc.length) { P.draw = shuffle(P.disc, st); P.disc = []; reshuffled = true; }
    return { card: P.draw.length ? P.draw.shift() : null, reshuffled };
  }

  // 手牌裡 a 軸星最大的那張（同星取三軸總和大的，再同取前面）；王牌只算在自己那一軸；noAce＝王牌不算
  function bestIdx(hand, a, noAce) {
    let bi = -1, bs = -1, bp = -1;
    for (let i = 0; i < hand.length; i++) {
      const c = hand[i]; if (!c) continue;
      if (isAce(c) && (noAce || aceAxis(c) !== a)) continue;
      const s = eStarOf(c, a), p = power(c);
      if (s > bs || (s === bs && p > bp)) { bi = i; bs = s; bp = p; }
    }
    return bi;
  }
  // 原版 mercyLevel（roguelike.html:3618-3624）：你落後越多，他出招越鈍
  function mercyOf(st) {
    const P = st.p, E = st.e;
    const pR = Math.max(0, P.hp) / (P.max || 1), eR = Math.max(0, E.hp) / (E.max || 1);
    let m = Math.max(0, eR - pR) * 1.3;
    if (P.hp <= 3) m += 0.35;
    return Math.min(1, m);
  }

  // 放水照位數機率（店主 11-16 選 C；C.trial.curve.mercyP）：e.mercyP＝這位客人每手放水的機率（第 1–10 位、序章、直接開打＝沒有這欄＝每手都放水）。
  //   這手放不放水＝hash01('mercy#'＋對決種子＋'#'＋第幾手) < mercyP：不取 duel.rng（每手照樣 8 次、既有序列不動），同種子同手數一定一樣、存讀檔照舊
  const mercyPOf = st => { const p = st.e.mercyP; return p == null ? 1 : Math.max(0, Math.min(1, +p)); };
  function mercyOn(st) {
    const p = mercyPOf(st);
    if (p >= 1) return true;
    if (!(p > 0)) return false;
    return hash01('mercy#' + (st.e.mercyKey >>> 0) + '#' + st.n) < p;
  }
  // 這手的說真話機率（放水後）：你落後時他少唬，唬人率 ×(1−qMercy×mercy)（舊版 roguelike.html:3693-3695，feintP×(1−0.8·mercy)）。
  //   CFG.mercy 開就算，不看出招難度（主線 11-16「放水前期保留」：前期加難後第 1–2 位 easy 也會唬〔q 0.75〕，easy 也吃這套；
  //   出招變鈍〔beginHand useMercy〕仍只有 normal／hard——原版 easy 不鈍化）；不多取亂數（每手照樣 8 次）。view.honesty.qNow 給策略
  //   on：true／false＝這手確定放水／不放水（beginHand 用）；沒給＝期望值（view 用；策略不知道這手有沒有放水）：1−(1−q)(1−qMercy×mercy×mercyP)
  function qNowOf(st, on) {
    const E = st.e, q = +E.q;
    if (!CFG.mercy || !E.qMercy) return q;
    if (on === false) return q;
    return 1 - (1 - q) * (1 - E.qMercy * mercyOf(st) * (on === true ? 1 : mercyPOf(st)));
  }
  // 11-17 讀牌加難（DESIGN §2.2）：客人讀你上一手。rel＝你上一手（明指那手）怎麼應付他的提示：counter 照提示剋｜mirror 跟提示同色｜third 防他唬人（出剋他唬法那色）
  //   本場第 1 手、上一手半指／不露 → null（沒有可以讀的）。streak＝從上一手往回數，連續幾手（明指）是同一種應對（斷在半指／不露）
  const relType = (pAttr, h) => pAttr === COUNTER_OF[h] ? 'counter' : pAttr === h ? 'mirror' : 'third';
  function relOf(st) {
    const L = st && st.last;
    if (!L || !L.hint || !ATTRS.includes(L.hint.attr) || !ATTRS.includes(L.pAttr) || (L.hint.kind && L.hint.kind !== 'one')) return null;
    return relType(L.pAttr, L.hint.attr);
  }
  function streakOf(st) {
    const rel = relOf(st); if (!rel) return 0;
    let k = 0;
    for (let j = st.log.length - 1; j >= 0; j--) { const l = st.log[j]; if (l.hk && l.hk !== 'one') break; if (relType(l.pAttr, l.hint) !== rel) break; k++; }
    return k;
  }
  // 這手讀你的機率：e.rho（位數曲線）；連兩手同一種應對 ×rhoMul（上限 rhoCap）；放水 ×(1−rMercy×m)（m＝這手放水程度；舊版 roguelike.html:3652）
  function rhoOf(st, m) {
    const E = st.e, rel = relOf(st); if (!rel || !(E.rho > 0)) return 0;
    const base = streakOf(st) >= 2 ? Math.min(E.rhoCap != null ? +E.rhoCap : 0.9, E.rho * (E.rhoMul || 1)) : E.rho;
    return Math.max(0, base * (1 - (E.rMercy || 0) * (m || 0)));
  }
  // 選句（新形狀的表；DESIGN §3.2）：候選＝這種提示（kind＋色；不露沒有色）誰都會講的＋這位客人自己的，扣掉這一趟看過的（st.hintSeen；含這場）。
  //   自己的還有沒看過的 → u < OWN_P 抽自己的；否則抽通用的（u 拉伸回 [0,1)）。候選照 id 排序取 ⌊u×長度⌋（同種子同結果；不多取亂數）。
  //   全部看過了 → 從這一趟最久沒出現的一半裡抽，不跟上一手同一句。抽到的接到 st.hintSeen 最後（已有就搬到最後），最多留 HINT_SEEN_MAX
  const OWN_P = 0.4;
  function pickLine(st, kind, key, u) {
    const T = st.hintTable, seen = Array.isArray(st.hintSeen) ? st.hintSeen : (st.hintSeen = []);
    const poolOf = src => ((kind === 'none' ? src.none : (src[kind] || {})[key]) || []).slice().sort();
    const gen = poolOf(T), own = poolOf(T.own || {});
    const seenSet = new Set(seen), g = gen.filter(id => !seenSet.has(id)), o = own.filter(id => !seenSet.has(id));
    const at = (arr, x) => arr[Math.max(0, Math.min(arr.length - 1, Math.floor(x * arr.length)))];
    let line = null;
    if (o.length && (u < OWN_P || !g.length)) line = at(o, g.length ? u / OWN_P : u);
    else if (g.length) line = at(g, o.length ? (u - OWN_P) / (1 - OWN_P) : u);
    else {
      const all = gen.concat(own); if (!all.length) return null;
      const rank = id => seen.lastIndexOf(id);
      const old = all.slice().sort((a, b) => rank(a) - rank(b) || (a < b ? -1 : a > b ? 1 : 0)).slice(0, Math.max(1, Math.ceil(all.length / 2)));
      line = at(old, u);
      const prev = st.last && st.last.hint ? st.last.hint.line : null;
      if (old.length > 1 && line === prev) line = old[(old.indexOf(line) + 1) % old.length];
    }
    const k = seen.indexOf(line); if (k >= 0) seen.splice(k, 1);
    seen.push(line); if (seen.length > HINT_SEEN_MAX) seen.splice(0, seen.length - HINT_SEEN_MAX);
    return line;
  }
  // 開手（§2.1.4）：他補牌 → 計畫屬性（原版 aiPlan 去掉相生／氣勢）→ 提示句 → 讀你／照實／唬人 → 出哪張。
  // RNG 每手固定 8 次（計畫 6＋提示 1＋照實 1），script／王牌／耳機都照取，讓 RNG 流不分支。
  //   11-17 讀牌加難（DESIGN §2.2；e.rho／beta／half／none 有才走，沒有＝改版前一字不差）：讀你、唬法、提示分級、半指那色都用 hash01(標籤#hkey#手數)，不多取 duel.rng。
  //   ① 王牌手／招牌手／耳機第一手／教學劇本照舊（不讀、不唬）
  //   ② 你上一手有應對（relOf）而且 hash 'read' < ρ（rhoOf）→ 出剋你「照舊那招」的顏色：預測 counter→COUNTER_OF[X]、mirror→X、third→BEATS[X]；出 COUNTER_OF[預測]（＝X 時 why readHonest）
  //   ③ 照實機率 qNow → X（honest）
  //   ④ 唬人：hash 'beta' < beta → BEATS[X]（剋你剋法；現行唬法）；否則 COUNTER_OF[X]（剋提示色本身）（why bluff）
  //   提示分級（跟上面獨立）：hash 'mix' < none → 不露；< none＋half → 半指（not＝X 以外兩色擇一，hash 'not'）；其他明指。教學劇本、舊形狀的表（沒有半指／不露句）＝一律明指
  function beginHand(st, events) {
    const E = st.e, P = st.p;
    st.n++;
    while (E.hand.length < CFG.enemyHand && E.pile.length) E.hand.push(E.pile.shift());
    const best = {}; for (const a of ATTRS) best[a] = bestIdx(E.hand, a, false);
    const mOn = mercyOn(st);                              // 這手放不放水（第 11 位起照機率；雜湊，不取亂數）
    const co = E.coef || PLANNERS.normal, m = mOn ? mercyOf(st) : 0, useMercy = !!co.mercy && !!CFG.mercy;
    let plan = null, ps = -Infinity;
    const mb = E.main && E.mainBias > 0 ? +E.mainBias : 0;   // 出招偏主屬性：主屬性那色多算 mainBias 星（不多取亂數）
    for (const a of ATTRS) {
      const u1 = rng(st), u2 = rng(st);
      if (best[a] < 0) continue;
      const s = co.w * (eStarOf(E.hand[best[a]], a) + (a === E.main ? mb : 0)) + u1 * co.nz + (useMercy ? u2 * 5 * m : 0);
      if (plan === null || s > ps) { plan = a; ps = s; }
    }
    const uLine = rng(st), r = rng(st);
    const sc = st.script, sp = sc && sc.plays[st.n - 1];
    const hu = tag => hash01(tag + '#' + (E.hkey >>> 0) + '#' + st.n);
    let idx = -1, attr, why, rel = null;
    if (sp) {
      plan = sp.attr; attr = sp.attr; why = 'script';
      idx = E.hand.findIndex(c => c && c.id === sp.id);
      if (idx < 0) idx = bestIdx(E.hand, attr, true);
    } else if (E.sig && st.n === E.sig.n && E.hand.some(c => c && c.id === E.sig.id)) {
      idx = E.hand.findIndex(c => c && c.id === E.sig.id);   // 招牌：照實出它最強那軸（老實人；亂數照樣抽完）
      plan = attr = topAttr(E.hand[idx]); why = 'honest';
    } else if (plan !== null && isAce(E.hand[best[plan]])) {
      attr = plan; why = 'ace'; idx = best[plan];
    } else if (st.n === 1 && headphoneOn(st)) {
      attr = plan; why = 'headphone';
    } else {
      rel = E.rho > 0 ? relOf(st) : null;
      if (rel && hu('read') < rhoOf(st, CFG.mercy ? m : 0)) {
        const pred = rel === 'counter' ? COUNTER_OF[plan] : rel === 'mirror' ? plan : BEATS[plan];
        attr = COUNTER_OF[pred]; why = attr === plan ? 'readHonest' : 'read';
      } else if (r < qNowOf(st, mOn)) {
        attr = plan; why = 'honest';
      } else {
        attr = E.beta != null && E.beta < 1 && hu('beta') >= E.beta ? COUNTER_OF[plan] : BEATS[plan]; why = 'bluff';
      }
    }
    if (idx < 0) idx = bestIdx(E.hand, attr, true);       // 唬人、讀你絕不出王牌
    if (idx < 0) {                                        // 手上只剩王牌（理論上第 2 步已讓 plan＝王牌那軸）：照實出王牌
      idx = E.hand.findIndex(isAce); plan = attr = aceAxis(E.hand[idx]); why = 'ace';
    }
    // 提示分級（新形狀的表才有半指／不露句；教學劇本一律明指）
    const nt = !!(st.hintTable && st.hintTable.own);
    let kind = 'one', not = null;
    if (!sp && nt && (E.half > 0 || E.none > 0)) {
      const u = hu('mix'), nn = E.none > 0 ? +E.none : 0, hh = E.half > 0 ? +E.half : 0;
      if (u < nn) kind = 'none';
      else if (u < nn + hh) { kind = 'half'; const two = ATTRS.filter(a => a !== plan); not = two[hu('not') < 0.5 ? 0 : 1]; }
    }
    // 提示句：照劇本；新形狀的表照 pickLine（一趟內盡量不重複）；舊形狀照舊（那色的句子抽一句，不跟上一手同一句）
    let line;
    if (sp && sc.hints[st.n - 1]) line = sc.hints[st.n - 1];
    else if (nt) line = pickLine(st, kind, kind === 'half' ? not : plan, uLine);
    else {
      const lines = (st.hintTable && st.hintTable[plan]) || DEFAULT_HINTS[plan];
      let k = Math.floor(uLine * lines.length);
      const prev = st.last && st.last.hint ? st.last.hint.line : null;
      if (lines.length > 1 && lines[k] === prev) k = (k + 1) % lines.length;
      line = lines[k];
    }
    st.plan = { hint: { attr: plan, line, kind, not }, attr, idx, bluff: attr !== plan, why, mercy: mOn, rel };
    // hand 事件跟 view 一樣：半指／不露不給他打算的那色（attr null）
    events.push({ t: 'hand', n: st.n, hint: { attr: kind === 'one' ? plan : null, line, kind, not }, eHandN: E.hand.length, pile: E.pile.length });
  }

  function legalActions(st) {
    if (st.over) return [];
    const out = [];
    st.p.hand.forEach((c, i) => { if (c) for (const a of ATTRS) out.push({ i, attr: a }); });
    if (st.p.ace && !st.p.aceUsed && !st.apexMode) out.push({ ace: true, attr: aceAxis(st.p.ace) });   // 頂點卡試做：王牌不能當唱片丟
    return out;
  }
  function isLegal(st, act) {
    if (!st || st.over || !act) return false;
    if (act.ace) return !st.apexMode && !!st.p.ace && !st.p.aceUsed && (!act.attr || act.attr === aceAxis(st.p.ace));
    if (act.apex && !canApex(st)) return false;                       // {i, attr, apex:true}＝這手先發動王牌
    return Number.isInteger(act.i) && act.i >= 0 && act.i < st.p.hand.length && !!st.p.hand[act.i] && ATTRS.includes(act.attr);
  }
  function actPlay(st, act) {
    if (act.ace) { const a = aceAxis(st.p.ace); return { card: st.p.ace, attr: a, star: pAceStar(st), ace: true }; }   // 第 I 波：安可回來的那張＝6 星
    const card = st.p.hand[act.i];
    return { card, attr: act.attr, star: star(card, act.attr), ace: false };
  }
  // 他那一側：{i, attr}＝他手牌第 i 張；{attr, star, ace}＝假設值（策略估算用）
  function ePlayOf(st, eSide) {
    if (!eSide || !ATTRS.includes(eSide.attr)) return null;
    if (Number.isInteger(eSide.i)) { const c = st.e.hand[eSide.i]; if (!c) return null; return { card: c, attr: eSide.attr, star: eStarOf(c, eSide.attr), ace: isAcePlay(c, eSide.attr) }; }
    return { card: null, attr: eSide.attr, star: eSide.star | 0, ace: !!eSide.ace };
  }

  // 結果預告（純函式）：不變式 resolveTurn 的 clash ＝ preview(st0, act, {i: plan.idx, attr: plan.attr})
  function preview(st, act, eSide) {
    if (!isLegal(st, act)) return null;
    const e = ePlayOf(st, eSide); if (!e) return null;
    const r = outcome(st, actPlay(st, act), e, false, act.apex ? 'on' : undefined);
    const out = { kind: r.kind, toE: r.toE, toP: r.toP, blocked: r.blocked, by: r.by, notes: r.notes };
    if (st.apexMode) { out.heal = r.heal | 0; out.apex = r.apex || null; }
    if (st.p.fac) { out.heal = r.heal | 0; out.fac = r.fac || {}; }   // 第 D 波棒二：回聲望（吸血／拆穿）、這手觸發了哪些派別效果（＝clash 事件的 heal、fac）
    return out;
  }

  function resolveTurn(st, act, opts) {
    opts = opts || {};
    if (!isLegal(st, act) || !st.plan) return [];
    const P = st.p, E = st.e, plan = st.plan, p0 = P.hp, events = act.apex ? activateApex(st) : [];   // 頂點卡試做：先發動（{t:'apex'}）再結算；p0＝這手開打前你的聲望（log 的 heal 用）
    const fp = opts.forcedPlay;
    const eSide = (fp && Number.isInteger(fp.i) && E.hand[fp.i] && ATTRS.includes(fp.attr)) ? { i: fp.i, attr: fp.attr } : { i: plan.idx, attr: plan.attr };
    const pPlay = actPlay(st, act), ePlay = ePlayOf(st, eSide), eCard = ePlay.card;
    if (act.ace && P.enc) encFire(st, 'ace');                           // 第 I 波安可：7 星王牌丟出去（那手就算）／留下來的這手打完回來／6 星安可盤用掉
    let r;
    if (opts.debugOutcome) {
      const d = opts.debugOutcome;
      r = { kind: d.kind, toE: d.toE | 0, toP: d.toP | 0, blocked: d.blocked || null, by: d.by || null, notes: [], pStar: pPlay.star };
    } else r = outcome(st, pPlay, ePlay, true);
    E.hp -= r.toE; P.hp -= r.toP;
    if (r.heal) P.hp = Math.min(P.max, P.hp + r.heal);                // 頂點卡試做：拆穿回血（扣完聲望後）
    const hint = { attr: plan.hint.attr, line: plan.hint.line, kind: plan.hint.kind || 'one', not: plan.hint.not || null }, bluff = ePlay.attr !== hint.attr;
    const S = st.stats;
    S.hands++; if (act.ace) S.ace++; S.relicNotes += r.notes.length;
    if (r.kind === 'counter') S.counter++; else if (r.kind === 'countered') S.countered++; else if (r.kind === 'tie') S.tie++; else S.mirror++;
    if (r.blocked) { S.blocked++; if (r.by === 'p') S.blockedYou++; }
    if (bluff) { S.bluffs++; if (r.kind !== 'countered') S.caught++; } else S.honest++;
    const sum = { n: st.n, pCard: pPlay.card, pAttr: pPlay.attr, pStar: r.pStar, pBase: pPlay.star, ace: !!act.ace,
      eCard, eAttr: ePlay.attr, eStar: ePlay.star, eAce: ePlay.ace,
      kind: r.kind, toE: r.toE, toP: r.toP, blocked: r.blocked, by: r.by, hint, bluff, notes: r.notes,
      why: plan.why, rel: plan.rel || null };                       // 11-17：why（honest｜bluff｜read｜readHonest｜ace…）、rel（他讀你時看的你上一手應對）給結果句
    if (st.script) sum.script = true;                               // 教學那場：結果句照舊念關鍵字（duel.js clashText）
    if (st.apexMode) { sum.apex = r.apex || null; if (r.apex && r.apex.hit) S.apexHits = (S.apexHits | 0) + 1; }
    if (P.fac) { sum.fac = Object.assign({}, r.fac || {}); sum.heal = r.heal | 0; }   // 第 D 波棒二：這手觸發了哪些派別效果（{full:1…}；結果行小字在 notes）、回了幾聲望
    st.last = sum;
    // log 每手記打完的聲望（pHp／eHp）：結算「第 n 手被翻盤」直接用，不從 toP／toE 往回推（頂點卡回聲望不在 toP 裡，推回來會造假；審查 A-1）。
    //   heal＝這手你實際回了幾聲望（頂點卡發動＋拆穿回血；有才記）：這手開打前＝pHp＋toP−heal
    const hl = P.hp - p0 + r.toP;
    // 11-17 本場紀錄（recap.js：上一手詳情、這場紀錄）：純加欄位、不取亂數；跟 clash 事件同值。pId／eId（卡）、pStar（含配件加星＝牌桌那個數）、eStar、by、not（半指他說不出的那色）、
    //   rel、notes（結果句的小字；複本）、ace／eAce／script（有才記）、apex（頂點卡試做的旗標下才有）。舊欄位一個不動（hint 照舊是計畫色：畫面只能經 clashText 讀，不能拿來判真假）
    st.log.push(Object.assign({ n: st.n, pAttr: pPlay.attr, eAttr: ePlay.attr, hint: hint.attr, hk: hint.kind, line: hint.line, bluff, why: plan.why, kind: r.kind, toE: r.toE, toP: r.toP, blocked: r.blocked, pHp: P.hp, eHp: E.hp }, hl > 0 ? { heal: hl } : {},
      { pId: pPlay.card ? pPlay.card.id : null, eId: eCard ? eCard.id : null, pStar: r.pStar, eStar: ePlay.star, by: r.by == null ? null : r.by, not: hint.not, rel: plan.rel || null,
        notes: r.notes.map(x => Object.assign({}, x)) },
      act.ace ? { ace: true } : {}, ePlay.ace ? { eAce: true } : {}, st.script ? { script: true } : {},
      st.apexMode ? { apex: r.apex ? Object.assign({}, r.apex) : null } : {}, P.fac ? { fac: Object.assign({}, r.fac || {}) } : {}));
    events.push(Object.assign({ t: 'clash' }, sum, { pHp: P.hp, eHp: E.hp }));
    P.last = pPlay.attr; E.last = ePlay.attr;
    E.thrown.push(eCard); E.hand.splice(eSide.i, 1); st.plan = null;
    if (act.ace) P.aceUsed = true;
    else {
      if (st.wearOn && P.plays && pPlay.card) P.plays[pPlay.card.id] = (P.plays[pPlay.card.id] | 0) + 1;   // 第 I 波耐聽：非王牌出一次＝1 格
      P.disc.push(P.hand[act.i]);
      const d = pull(st); P.hand[act.i] = d.card;
      events.push({ t: 'draw', i: act.i, card: d.card, reshuffled: d.reshuffled });
    }
    // 第 I 波安可：放在 aceUsed＝true 之後（不然會被蓋回去）、finish 之前（最後一手成立也算＝留到下一場）；hint＝上面的區域變數（st.plan 已清成 null）
    if (P.enc) encoreStep(st, r, pPlay, ePlay, hint, events, opts.debugOutcome || null, hl);
    if (P.hp <= 0 || E.hp <= 0) return finish(st, 'hp', events);
    if (st.n >= CFG.maxRounds) return finish(st, 'rounds', events);
    if (!E.hand.length && !E.pile.length) return finish(st, 'pile', events);
    beginHand(st, events);
    return events;
  }
  // 比聲望（FIXLIST 3，店主 2026-11-08 選 1）：比「聲望條剩幾成」＝剩餘聲望÷滿血，高的贏；一樣算你贏。
  //   全引擎只有這一個比法：六手打完、他牌出完、兩邊同一手都 ≤0（負數也照比例比）、策略的終局估值都呼叫它。
  //   交叉相乘，不用浮點：pHp/pMax ≥ eHp/eMax ⇔ pHp·eMax ≥ eHp·pMax（max 一律 > 0）
  function playerAhead(pHp, pMax, eHp, eMax) {
    const pm = pMax > 0 ? pMax : 1, em = eMax > 0 ? eMax : 1;
    return pHp * em >= eHp * pm;
  }
  // 畫面用：聲望條剩幾 %（四捨五入、不顯示負數）
  function hpPct(hp, max) { return Math.max(0, Math.round(100 * hp / (max > 0 ? max : 1))); }
  // 結果句用的一對 %（字串）：整數；整數一樣大但其實分得出高低時（例：你 9/10＝90%、他 28/31≈90.3%）兩邊都改一位小數，畫面上的數字永遠跟勝負一致
  function pctPair(pHp, pMax, eHp, eMax) {
    const p = hpPct(pHp, pMax), e = hpPct(eHp, eMax);
    const exactTie = playerAhead(pHp, pMax, eHp, eMax) && playerAhead(eHp, eMax, pHp, pMax);
    if (p !== e || exactTie || (pHp <= 0 && eHp <= 0)) return { p: String(p), e: String(e) };
    const one = (hp, max) => (Math.max(0, Math.round(1000 * hp / (max > 0 ? max : 1))) / 10).toFixed(1);
    return { p: one(pHp, pMax), e: one(eHp, eMax) };
  }
  // 聲望 ≤0 就輸；兩邊同一手都 ≤0、六手打完、他牌出完 → playerAhead
  function finish(st, by, events) {
    const P = st.p, E = st.e;
    const cmp = playerAhead(P.hp, P.max, E.hp, E.max);
    const win = by === 'hp' ? ((P.hp <= 0 && E.hp <= 0) ? cmp : E.hp <= 0) : cmp;
    st.over = { win, by }; st.plan = null;
    const ov = { t: 'over', win, by, pHp: P.hp, eHp: E.hp, pMax: P.max, eMax: E.max, pPct: hpPct(P.hp, P.max), ePct: hpPct(E.hp, E.max), pct: pctPair(P.hp, P.max, E.hp, E.max) };
    // 第 I 波安可：成立了還沒用到（王牌回來沒再丟／能力回來沒再發動／下一手加成還沒吃）→ 留到下一場（只留一場：留下來的那份不再往下留）
    const Q = P.enc;
    if (Q && Q.src !== 'carry' && (Q.state === 'hit' || Q.state === 'next') && (!st.encNum || st.encNum.carry !== false)) {
      st.over.encCarry = { give: Q.give }; ov.encCarry = { give: Q.give }; st.stats.enc.carryOut = 1;
      // 修正輪：條件就成立在這最後一手＝這手的 {t:'encore'} 事件與 log 那手多 carry:true（結果句寫「翻面！留到下一位」，不寫「王牌回到手上」）
      if (Q.lit === st.n) { const L = st.log[st.log.length - 1]; if (L && L.enc) L.enc.carry = true; for (const e of events) if (e && e.t === 'encore' && e.n === st.n) e.carry = true; }
    }
    events.push(ov);
    return events;
  }

  function hintView(h) {
    const k = h.kind || 'one';
    if (k === 'half') return { attr: null, line: h.line, kind: k, not: h.not, set: ATTRS.filter(a => a !== h.not) };
    if (k === 'none') return { attr: null, line: h.line, kind: k, not: null, set: ATTRS.slice() };
    return { attr: h.attr, line: h.line, kind: 'one', not: null, set: [h.attr] };
  }
  // 公開資訊（§2.1.5）：提示只給屬性（畫面上不得寫出屬性名）與句子 id；揭曉前不給他出哪張、哪色、有沒有唬人
  function view(st) {
    const P = st.p, E = st.e;
    const aceLive = P.aceUsed ? null : P.ace;
    const pl = st.over ? null : st.plan;
    const out = {
      n: st.n, maxRounds: CFG.maxRounds, over: st.over ? { win: st.over.win, by: st.over.by } : null,
      pHp: P.hp, pMax: P.max, eHp: E.hp, eMax: E.max,
      eId: E.id, eName: E.name, eTitle: E.title, eMain: E.main || null, elite: E.elite, boss: E.boss,
      // honesty：策略用（畫面不寫）。11-17 多 rho（這位的讀心）、rhoNow（這手讀你的機率，放水期望值）、streak、rel（你上一手的應對）、beta、hit
      honesty: { key: E.honesty, q: E.q, qNow: pl ? qNowOf(st) : null, rho: E.rho > 0 ? +E.rho : 0,
        rhoNow: pl ? rhoOf(st, CFG.mercy ? mercyOf(st) * mercyPOf(st) : 0) : null, streak: pl ? streakOf(st) : 0, rel: pl ? relOf(st) : null,
        beta: E.beta != null ? +E.beta : 1, hit: E.hit | 0 },
      // hint：明指 {attr, line, kind:'one', not:null, set:[attr]}；半指 {attr:null, line, kind:'half', not, set:另外兩色}；不露 {attr:null, line, kind:'none', not:null, set:三色}
      hint: pl ? hintView(pl.hint) : null,
      eHandN: E.hand.length, pile: E.pile.length, pileMax: E.deckSize,
      eDeckIds: E.deckIds.slice(), eThrownIds: E.thrown.map(c => c.id),
      hand: P.hand.slice(), ace: aceLive, aceCard: P.ace, aceAxis: aceAxis(P.ace), aceUsed: P.aceUsed,
      last: st.last, relics: P.relics.map(r => Object.assign({}, r)), dustUsed: P.dustUsed,
      pAtk: P.atk | 0, pDef: P.def | 0, eAtk: E.atk | 0, eDef: E.def | 0,
      eDeck: (E.deckPub || []).map(x => Object.assign({}, x, { plus: x.plus ? Object.assign({}, x.plus) : null })),
    };
    if (P.hand.some(c => c && c.worn != null)) {           // 第 I 波耐聽：手牌每張帶 worn（聽膩幾層）、ear（現在剩幾格＝開打時減這場出過幾次）
      // 修正棒 11-22：不記耐聽的對決（說情重打、切磋）ear＝null＝畫面不畫「再一次就膩」（出了也不會膩）；聽膩的紅字照畫（星照樣扣）
      out.hand = P.hand.map(c => c && c.worn != null ? Object.assign({}, c, { ear: st.wearOn && P.plays ? Math.max(0, (c.ear | 0) - (P.plays[c.id] | 0)) : null }) : c);
    }
    if (st.lineup) out.lineup = true;                     // 第 I 波上場制：手牌＝上場那幾張（畫面不播滑入、不出洗牌字）
    if (st.apexMode) {                                    // 頂點卡試做：王牌不能當唱片丟（ace＝null；aceCard 照舊），多能力欄
      const A = P.ability, AX = pl ? apexNow(st, false) : null;
      out.ace = null;
      out.apex = { card: P.ace, id: A.id, name: A.name, text: A.text, timing: A.timing, op: A.op, params: clone(A.params || {}), hold: A.hold ? clone(A.hold) : null,
        can: canApex(st), used: !!P.aceUsed, on: P.apexOn ? P.apexOn.n : null, live: AX ? AX.src : null, full: !P.aceUsed && apexFull(st) };
      out.apexReveal = pl && P.apexOn && P.apexOn.reveal && P.apexOn.n === st.n ? P.apexOn.reveal : null;
    }
    if (P.enc) {                                          // 第 I 波安可（契約 §3）：籤的狀態、這手吃的加成（next）、王牌格寫幾星（aceStar）
      const Q = P.enc;
      out.enc = { when: Q.when, give: Q.give, mode: Q.mode, state: Q.state, from: Q.from, at: Q.at, carry: Q.src === 'carry', lit: Q.lit,
        next: !st.over && Q.state === 'next' && Q.at === st.n ? Q.give : null, aceStar: pAceStar(st) };
      out.aceStar = pAceStar(st);
    }
    if (P.fac && P.fx) {                                  // 第 D 波棒二三流派：頂欄一字圖示、本派說明（被動＋代價＋這場第二招還剩幾）
      const fx = P.fx, N = P.facN || {};
      out.fac = { tier: P.fac, icon: P.facIcon || null, fx: clone(fx), n: { tie: N.tie | 0, countered: N.countered | 0, lose: N.lose | 0, leech: N.leech | 0, thorn: N.thorn | 0 },
        left: { leech: fx.leech ? Math.max(0, (fx.leechMax | 0) - (N.leech | 0)) : null, thorn: fx.thorn > 0 ? Math.max(0, (fx.thornMax | 0) - (N.thorn | 0)) : null } };
      if (fx.deep > 0 && !st.spar) { const D = deepNow(P); out.fac.deep = { k: D.k, cell: D.cell, per: D.per, hands: D.hands, got: D.got }; if (D.carry) { out.fac.deep.carry = true; out.fac.deep.acc = D.acc; } }   // 棒三派樹深耕：這場記到幾手（跨場＝acc 累積）、打贏多回 got；沒有樹＝不多這個鍵；切磋（活店 duel.spar：打贏不回聲望）不秀
      if (fx.tieHeal > 0) out.fac.n.tieHeal = N.tieHeal | 0;                                                                 //   圈內人用過了沒（每場一次）
    }
    return out;
  }

  function bestChip(st, attr, o) {
    let best = null, bs = -1;
    if (o && o.ace && !st.apexMode && st.p.ace && !st.p.aceUsed && aceAxis(st.p.ace) === attr) { best = { ace: true, attr }; bs = pAceStar(st); }
    st.p.hand.forEach((c, i) => { if (c && star(c, attr) > bs) { bs = star(c, attr); best = { i, attr }; } });
    return best;
  }
  // 手牌裡用 attr 出、對上「他這手的提示屬性、他手牌該軸最大星」會被 blocked:'gap' 的那張（最左）；沒有 → null（教學第 5 手的手指）
  function blockedChoice(st, attr) {
    if (!st || st.over || !st.plan || !ATTRS.includes(attr)) return null;
    const h = st.plan.hint.attr, bi = bestIdx(st.e.hand, h, false);
    if (bi < 0) return null;
    const c = st.e.hand[bi], e = { attr: h, star: eStarOf(c, h), ace: isAcePlay(c, h) };
    for (let i = 0; i < st.p.hand.length; i++) {
      if (!st.p.hand[i]) continue;
      if (outcome(st, actPlay(st, { i, attr }), e, false).blocked === 'gap') return { i, attr };
    }
    return null;
  }

  // ============================================================================================================================
  // 無限試煉（SPEC 無限試煉 §0–§2）：序章打完＝第 1 位；一輪 5 位（一般 3、菁英、傳說藏家），打到輸為止。
  //   錢、包包、配件、王牌整趟帶著走；商店每輪補貨一次；老闆說情每輪 1 次；聲望帶到下一場、打贏回 3。數字全在 content.trial
  // ============================================================================================================================
  // 試煉階級的部分覆寫（第 D 波棒三；SPEC-D §5.3）：b 疊到 a 上、回新物件（a 不動）。鍵 'add'＝相加（curve.atk.add 疊兩階＝+2）；
  //   值是 {add:n}、現值是數字或沒有＝相加（guestHp:{boss:{add:3}}＝14→17，不是換成物件）；兩邊都是物件＝遞迴；其他＝蓋掉
  const isPlain = x => !!x && typeof x === 'object' && !Array.isArray(x);
  const isAddOnly = v => isPlain(v) && Object.keys(v).length === 1 && Object.prototype.hasOwnProperty.call(v, 'add');
  function addMerge(a, b) {
    const o = Object.assign({}, a);
    for (const k of Object.keys(b || {})) {
      const v = b[k], cur = o[k];
      if (k === 'add') o[k] = round6((+cur || 0) + (+v || 0));
      else if (isAddOnly(v) && !isPlain(cur)) o[k] = round6((+cur || 0) + (+v.add || 0));
      else if (isPlain(v)) o[k] = addMerge(isPlain(cur) ? cur : {}, v);
      else o[k] = v;
    }
    return o;
  }
  const TIER_META = ['name', 'text', 'id'];                       // 階表裡給畫面的鍵（trialCfg 不疊）
  const TRIAL_PASS = 21;                                          // 試煉「過關」＝走到第 21 位（打倒第 20 位傳說藏家；SPEC-D §5.1、R-T4）
  // 開下一階只算從第 1–10 位開局的那一趟（棒三審查：規格 §5.1 原本「中繼點 cpFrom ≤20 也算」——從第 20 位開只打藏家一場，十三階照樣一路開完，
  //   會讀的從第 20 位開 第 0／5／8／10／13 階 93／91／84／65／58%，從頭打 72／60／35／19／3%）。從第 10 位開＝要打第 10–20 位 11 場（菁英、藏家都在）
  const TRIAL_OPEN_FROM = 10;
  // C.trial（沒給的欄位用 TRIAL 預設）；run.tier＞0 時再依序疊 C.trial.tiers[0..tier−1]（第 D 波棒三試煉階級：第 k 階＝前 k 條全部算；addMerge 相對值）。
  //   頂層 guestHpSteps 串接；頂層 add:{healAdd:n}＝out.healAdd 相加（finishFight 打贏回的聲望）。tier 0＝跟改前逐字一樣（沒有 healAdd 鍵）
  function trialCfg(content, tier) {
    const src = (content && content.trial) || {};
    const out = Object.assign({}, TRIAL, src);
    const curve = {};
    for (const k of Object.keys(TRIAL.curve)) curve[k] = typeof TRIAL.curve[k] === 'object' ? Object.assign({}, TRIAL.curve[k], (src.curve || {})[k]) : ((src.curve || {})[k] != null ? src.curve[k] : TRIAL.curve[k]);
    out.curve = curve;
    out.guestHp = Object.assign({}, TRIAL.guestHp, src.guestHp); out.xp = Object.assign({}, TRIAL.xp, src.xp); out.picks = Object.assign({}, TRIAL.picks, src.picks);
    const L = tier > 0 && Array.isArray(out.tiers) ? out.tiers.slice(0, tier | 0) : [];
    for (const ov of L) {
      if (!isPlain(ov)) continue;
      for (const k of Object.keys(ov)) {
        if (TIER_META.includes(k)) continue;
        const v = ov[k];
        if (k === 'curve') { for (const c of Object.keys(isPlain(v) ? v : {})) curve[c] = isPlain(curve[c]) ? addMerge(curve[c], v[c]) : isAddOnly(v[c]) ? round6((+curve[c] || 0) + (+v[c].add || 0)) : v[c]; }
        else if (k === 'guestHpSteps' && Array.isArray(v)) out[k] = (Array.isArray(out[k]) ? out[k] : []).concat(v);
        else if (k === 'add' && isPlain(v)) { for (const a of Object.keys(v)) out[a] = round6((+out[a] || 0) + (+v[a] || 0)); }
        else if (isAddOnly(v) && !isPlain(out[k])) out[k] = round6((+out[k] || 0) + (+v.add || 0));
        else if (isPlain(v) && isPlain(out[k])) out[k] = addMerge(out[k], v);
        else out[k] = v;
      }
    }
    return out;
  }
  // ---------- 試煉階級（第 D 波棒三；SPEC-D §5；存檔 save.trial＝{open, pick, best:{階: 最遠}}；契約 build3/CONTRACT.md）----------
  //   trialTiers(content)＝[{k, name, text}]（k 從 1；畫面的推門那列、過場卡）；trialFix(content, trial)＝讀檔整理（回新物件：open 0…階數、pick 0…open、best 非負整數）；
  //   trialPick(content, trial)＝newRun 的 tier（pick 夾在 0…open）；
  //   trialRecord(content, trial, sum)：一趟結束（sum＝runSummary(run)；第 0 階沒有 sum.tier）→ best[這一階]＝max；在第 open 階走到第 21 位、而且真的打了第 20 位那場
  //     （from ≤20：中繼點從第 50 位開不算）→ open＋1（最多 tiers.length）。回 {trial（新物件；pick 不動）, opened（開了第幾階，0＝沒開）, passed, record（這一階破紀錄）}
  function trialTiers(content) { const L = trialCfg(content).tiers; return (Array.isArray(L) ? L : []).map((x, i) => ({ k: i + 1, name: (x && x.name) || '', text: (x && x.text) || '' })); }
  function trialFix(content, trial) {
    const t = isPlain(trial) ? trial : {}, max = trialTiers(content).length;
    const open = Math.min(max, nonNeg(t.open)), pick = Math.min(open, nonNeg(t.pick)), best = {};
    for (const k of Object.keys(isPlain(t.best) ? t.best : {})) { const n = nonNeg(t.best[k]), kk = +k; if (Number.isInteger(kk) && kk >= 0 && kk <= max && n) best[kk] = n; }
    return Object.assign({}, t, { open, pick, best });
  }
  function trialPick(content, trial) { return trialFix(content, trial).pick; }
  function trialMul(content, k) { return round6(1 + careerCfg(content).lexp.tierMul * nonNeg(k)); }   // 推門那列「樂歷 ×{m}」（＝careerGain 的 tierMul）
  function trialRecord(content, trial, sum) {
    const t = trialFix(content, trial), s = sum || {}, max = trialTiers(content).length;
    const tier = Math.min(max, nonNeg(s.tier)), reached = nonNeg(s.reached), from = s.from > 1 ? s.from | 0 : 1;
    const best = Object.assign({}, t.best), was = best[tier] | 0;
    if (reached > was) best[tier] = reached;
    const passed = reached >= TRIAL_PASS && from < TRIAL_PASS;
    const opened = passed && from <= TRIAL_OPEN_FROM && tier === t.open && t.open < max ? t.open + 1 : 0;   // 開下一階：還要從第 TRIAL_OPEN_FROM 位以前開局（棒三審查）
    return { trial: Object.assign({}, t, { best, open: opened || t.open }), opened, passed, record: reached > was };
  }
  // 第幾位 → 類別（每 5 位：一般 3、菁英、藏家）、第幾輪
  const classAt = pos => POS_CLASSES[((Math.max(1, pos | 0) - 1) % PER_ROUND)];
  const roundOf = pos => Math.ceil(Math.max(1, pos | 0) / PER_ROUND);
  // 客人曲線 V3（../curve/curves.cjs：atkV3f、defV3f、oldQ、oldDiff；聲望固定 12、藏家 14）＋11-16 前期加難（第 1–4 位，見 TRIAL）
  function trialGuest(content, pos, cls, tier) {
    const T = trialCfg(content, tier), K = T.curve, d = Math.max(1, pos | 0);
    cls = POS_CLASSES.includes(cls) ? cls : classAt(d);
    const boss = cls === 'boss', P = K.planner, Q = K.q, A = K.atk, D = K.def;
    const planner = d <= P.easyTo ? 'easy' : d <= P.normalTo ? 'normal' : 'hard';
    const q = planner === 'easy' ? Q.easy : planner === 'normal' ? Q.normal : 1 - Math.min(Q.feintMax, Q.feintBase + Q.feintStep * Math.max(0, d - Q.feintFrom));
    const atk = Math.min(A.cap, Math.round(A.rate * Math.max(0, d - A.lateFrom))) + Math.floor(Math.max(0, d - A.slopeFrom) / A.slopeEvery) + (boss ? A.boss : 0) + (A.add | 0)
      + (cls === 'elite' && A.elite ? A.elite | 0 : 0);   // 第 D 波棒三試煉「挑剔」：curve.atk.elite（菁英另加；TRIAL 沒這個鍵＝0）
    const def = Math.min(D.cap, Math.round(D.rate * Math.max(0, d - D.lateFrom))) + (boss ? D.boss : 0) + (D.add | 0);
    // 11-17 讀牌加難（C.trial.curve.read／hintMix；from 0 或沒給＝關）：hard（第 normalTo＋1 位起）照 hard＋step×(位−hardFrom) 封頂 max，之前 normal
    const R = K.read || {}, RH = R.rho || {}, M = K.hintMix || {}, HF = M.half || {}, NO = M.none || {}, hard0 = (P.normalTo | 0) + 1;
    const on = R.from > 0 && d >= R.from, hardOf = (o, base) => planner === 'hard' ? Math.min(+o.max || 0, (+o.hard || 0) + (+o.step || 0) * Math.max(0, d - hard0)) : base;
    const rho = on ? hardOf(RH, +RH.normal || 0) + (boss ? +RH.boss || 0 : 0) : 0;
    const beta = on && R.beta != null ? Math.max(0, Math.min(1, +R.beta)) : 1;
    const hit = R.from > 0 && R.hit && R.hit.from > 0 && d >= R.hit.from ? Math.max(0, R.hit.n | 0) : 0;   // read.from 0＝整條關（含被唬到多扣）
    const half = HF.from > 0 && d >= HF.from ? hardOf(HF, +HF.normal || 0) : 0;
    const none = NO.from > 0 && d >= NO.from ? Math.min(+NO.max || 0, (+NO.base || 0) + (+NO.step || 0) * (d - NO.from)) : 0;
    const r6 = x => Math.round(x * 1e6) / 1e6;
    // 第 C 波客人補償（SPEC-C §5.5；C.trial.guestHpSteps＝[[第幾位起, +n], …]，可多段；沒給或 []＝關）：第 31 位起一般／菁英 12→13、藏家 14→15，之後不再長
    const hpAdd = (Array.isArray(T.guestHpSteps) ? T.guestHpSteps : []).reduce((t, x) => t + (Array.isArray(x) && d >= (x[0] | 0) ? (x[1] | 0) : 0), 0);
    return { hp: T.guestHp[cls] + hpAdd, atk: Math.max(0, atk), def: Math.max(0, def), planner, q: r6(q),
      rho: r6(Math.max(0, Math.min(1, rho))), rhoMul: R.streakMul > 0 ? +R.streakMul : 1, rhoCap: R.cap != null ? +R.cap : 0.9, rMercy: R.mercy != null ? +R.mercy : 0.7,
      beta: r6(beta), half: r6(Math.max(0, half)), none: r6(Math.max(0, none)), hit };
  }
  // 放水照位數機率（店主 11-16 選 C；C.trial.curve.mercyP）：第 from 位以前 1（每手都放水）；之後 max(min, p0 − step×⌊(位−from)/every⌋)
  //   預設：第 11–15 位 90%、16–20 位 80%…、第 46 位起 20%。放水唬人（qNowOf：落後時少唬）三種出招難度都吃這個機率（主線 11-16「放水前期保留」起 easy 也算）；
  //   出招變鈍（beginHand useMercy）仍只有出招難度有 mercy 的（normal／hard）才有、一樣照這個機率——easy 客人不鈍化，但唬人率照樣逐手照 mercyP 放水
  function mercyPAt(content, pos, tier) {
    const MP = trialCfg(content, tier).curve.mercyP || {}, d = Math.max(1, pos | 0);
    if (!(MP.from > 0) || d < MP.from) return 1;
    const every = MP.every > 0 ? MP.every : 1;
    const p = (MP.p0 != null ? +MP.p0 : 1) - (+MP.step || 0) * Math.floor((d - MP.from) / every);
    return Math.round(Math.max(+MP.min || 0, Math.min(1, p)) * 1e6) / 1e6;
  }
  // 客人稱號（第 A 波 3；舊版 enemyForDepth）：每 titleEvery 位換一次（第 1–2 位 titles[0]、第 3–4 位 titles[1]…），最後一個之後停在最後一個（第 15 位起品味之神）
  function titleAt(content, pos, tier) {
    const T = trialCfg(content, tier), L = Array.isArray(T.titles) ? T.titles : [];
    if (!L.length) return null;
    const every = T.titleEvery > 0 ? T.titleEvery | 0 : 2;
    return L[Math.min(L.length - 1, Math.floor((Math.max(1, pos | 0) - 1) / every))] || null;
  }
  // 要顯示的稱號（來客條、對決他名字旁）：傳說藏家沒有（舊版藏家的稱號就是「傳說藏家」＝他的名字）；跟他的名字一樣（第 3–4 位碰上社團學長）也不顯示 → null
  function guestTitle(content, pos, id, cls, tier) {
    cls = POS_CLASSES.includes(cls) ? cls : classAt(pos);
    if (cls === 'boss') return null;
    const t = titleAt(content, pos, tier), E = content && content.enemies && content.enemies[id];
    return t && !(E && E.name === t) ? t : null;
  }
  // 客人牌組越來越好（curve harness core.cjs bcDeck，V3：加星上限 5）：
  //   三軸總星低於下限 min(13, 3＋⌊0.7×位⌋) 的換成池子裡夠格的（照雜湊排序；王牌不進池）；主軸加 ⌊max(0, 位−3)/3⌋ 星（上限 5，王牌不加）；
  //   藏家帶你們都沒選的那張王牌（run.bossAce）；一般客人第 5 位起帶王牌機率 min(60%, 15%×(位−4))（你沒選的兩張之一）。
  //   加星的卡保留原 id（獎勵、唱片資訊、估星都照 id 找），另加 plus {attr, n}。全部用 run 的雜湊（seedKey#runNo#pos），不碰對決亂數
  const POOL_CACHE = typeof WeakMap === 'function' ? new WeakMap() : null;
  function trialPool(content) {
    const cards = content.cards || {};
    if (POOL_CACHE && POOL_CACHE.has(cards)) return POOL_CACHE.get(cards);
    const p = Object.keys(cards).sort().map(id => cards[id]).filter(c => c && !c.tier);
    if (POOL_CACHE) POOL_CACHE.set(cards, p);
    return p;
  }
  // ---------- 組牌快取（第 B 波 WP2-0；SPEC-B §6.2 第 2 步、定稿 C5）：只改速度、不改結果 ----------
  //   5,045 張下 trialDeck 每次都對整池篩、算雜湊、全排序（×6），radioPool 每次篩整池（×10）。改成：
  //   ① 按 trialDeck 用到的條件（下限 fl、主屬性 M、strict、obAll 退路、M 那軸總星排序、另外兩軸的 lane）預先分桶，快取在 content.cards 物件上
  //      （跟 trialPool 同一個鍵：卡池換物件才重算；卡物件的星數、tier、tune 視為不變——cards-media 只原地寫封面／試聽，不影響）
  //   ② 每次只對要用的桶算雜湊（tag|客人| 的 fnv 狀態算一次、每張只續算自己的 id；同一次呼叫同一張只算一次）、只取需要的前 k 張
  //      （部分選擇；順序照原本的排序鍵：雜湊小的先、同分 id 小的先）
  //   ③ 同一組輸入選出的牌（卡池物件參照）記住：鍵＝客人、tag（seedKey#runNo#位）、M、fl、minPool、mainShare、他原本的牌單；
  //      來客那排一次畫 5 位、shopPolicy 與 startFight 同一位各叫一次 → 第二次起不重選。加星、王牌、複本照舊每次重做（不共用物件）
  //   ④ radioPool：每格（tune）∩ 普通／稀有／獨特 記住，每次只扣包包與架上
  //   API._noCache＝true → 全部走原本的寫法（deckSlow、radioPool 篩整池）；engine.test #26 對照 200 個 seed × 第 1–15 位結果 JSON 相同
  const POOL_INFO = typeof WeakMap === 'function' ? new WeakMap() : null;
  const AXIS_BIT = { c: 1, o: 2, h: 4 };
  const DECK_MEMO_MAX = 512;
  function poolInfo(content) {
    const pool = trialPool(content), cards = content.cards || {};
    let P = POOL_INFO.get(cards);
    if (P && P.pool === pool) return P;
    const n = pool.length, pw = new Array(n), mk = new Array(n), sid = new Array(n);
    for (let i = 0; i < n; i++) {
      const c = pool[i], m = peak(c);
      pw[i] = power(c);
      mk[i] = (star(c, 'c') === m ? 1 : 0) | (star(c, 'o') === m ? 2 : 0) | (star(c, 'h') === m ? 4 : 0);   // 峰值那幾軸（＝isM／lane／topAxes）
      sid[i] = '' + c.id;
    }
    P = { pool, n, pw, mk, sid, bk: new Map(), hv: new Float64Array(n), hg: new Uint32Array(n), gen: 0, memo: new Map() };
    POOL_INFO.set(cards, P);
    return P;
  }
  function poolBucket(P, key, keep) {
    let b = P.bk.get(key);
    if (!b) { b = []; for (let i = 0; i < P.n; i++) if (keep(i)) b.push(i); P.bk.set(key, b); }
    return b;
  }
  function subBucket(P, key, src, keep) {
    let b = P.bk.get(key);
    if (!b) { b = src.filter(keep); P.bk.set(key, b); }
    return b;
  }
  function fnvMore(h, str) { for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193); } return h >>> 0; }   // fnv1a32 接著前綴的狀態算
  function fmix01(h) { h ^= h >>> 16; h = Math.imul(h, 0x85ebca6b); h ^= h >>> 13; h = Math.imul(h, 0xc2b2ae35); h ^= h >>> 16; return (h >>> 0) / 4294967296; }   // ＝hash01 的後半
  function deckFast(content, K, base, E, id, tag, fl, M) {
    const P = poolInfo(content), pool = P.pool, pw = P.pw, mk = P.mk;
    const key = id + '\u0001' + tag + '\u0001' + (M || '') + '\u0001' + fl + '\u0001' + K.minPool + '\u0001' + K.mainShare + '\u0001' + (E.deck || []).join('\u0002');
    const hit = P.memo.get(key);
    if (hit) return hit;
    if (++P.gen > 0x3fffffff) { P.hg.fill(0); P.gen = 1; }
    const gen = P.gen, hv = P.hv, hg = P.hg, sid = P.sid, h0 = fnvMore(0x811c9dc5, tag + '|' + id + '|');
    const hOf = i => { if (hg[i] === gen) return hv[i]; const v = fmix01(fnvMore(h0, sid[i])); hv[i] = v; hg[i] = gen; return v; };   // ＝u(id + '|' + c.id)
    const before = (i, j) => { const a = hOf(i), z = hOf(j); return a < z || (a === z && pool[i].id < pool[j].id); };
    // ＝byHash(桶, used) 的前 k 張：桶裡不在 used 的，照（雜湊, id）排序取前 k
    const top = (idx, k, used) => {
      const out = [];
      if (!(k > 0)) return out;
      for (let t = 0; t < idx.length; t++) {
        const i = idx[t];
        if (out.length >= k && !before(i, out[out.length - 1])) continue;
        if (used.has(pool[i].id)) continue;
        let j = out.length; out.push(i);
        while (j > 0 && before(i, out[j - 1])) { out[j] = out[j - 1]; j--; }
        out[j] = i;
        if (out.length > k) out.pop();
      }
      return out;
    };
    const deck = [], used = new Set();
    const put = c => { deck.push(c); used.add(c.id); };
    const ALL = poolBucket(P, 'A', () => true);
    if (!M) {
      let bag = poolBucket(P, 'F' + fl, i => pw[i] >= fl); if (bag.length < K.minPool) bag = ALL;
      for (const c of base) if (power(c) >= fl) put(c);
      if (deck.length < base.length) for (const i of top(bag, base.length - deck.length, used)) put(pool[i]);
    } else {
      const bit = AXIS_BIT[M], isM = c => star(c, M) === peak(c);
      const need = Math.min(base.length, Math.max(0, Math.round((+K.mainShare || 0) * base.length)));
      const keepM = base.filter(c => power(c) >= fl && isM(c)), keepO = base.filter(c => power(c) >= fl && !isM(c));
      for (const c of keepM) put(c);
      for (const c of keepO.slice(0, Math.max(0, base.length - Math.max(need, keepM.length)))) put(c);
      if (keepM.length < need) {
        let mb = poolBucket(P, 'M' + M + fl, i => (mk[i] & bit) && pw[i] >= fl);
        const strict = poolBucket(P, 'S' + M + fl, i => mk[i] === bit && pw[i] >= fl);
        if (strict.length >= K.minPool) mb = strict;
        if (mb.length < K.minPool) {
          let z = P.bk.get('Z' + M);
          if (!z) { z = poolBucket(P, 'm' + M, i => mk[i] & bit).slice().sort((a, b) => pw[b] - pw[a] || (pool[a].id < pool[b].id ? -1 : 1)); P.bk.set('Z' + M, z); }
          mb = z.slice(0, Math.max(K.minPool, mb.length));
        }
        const r = Math.min(need - keepM.length, base.length - deck.length);
        for (const i of top(mb, r, used)) put(pool[i]);
      }
      const others = ATTRS.filter(a => a !== M), first = BEATS[M];
      const ob = poolBucket(P, 'O' + M + fl, i => !(mk[i] & bit) && pw[i] >= fl);
      const allKey = ob.length >= K.minPool ? 'O' + M + fl : 'N' + M;
      const obAll = ob.length >= K.minPool ? ob : poolBucket(P, 'N' + M, i => !(mk[i] & bit));
      const lane = (c, a) => star(c, a) === peak(c);
      for (let guard = 0; deck.length < base.length && guard < 40; guard++) {
        const cnt = a => deck.filter(c => !isM(c) && lane(c, a)).length;
        const order = others.slice().sort((a, z) => cnt(a) - cnt(z) || (a === first ? -1 : z === first ? 1 : 0));
        let got = null;
        for (const a of order) { const i = top(subBucket(P, 'L' + allKey + a, obAll, i => mk[i] & AXIS_BIT[a]), 1, used)[0]; if (i !== undefined) { got = pool[i]; break; } }
        if (!got) { const i = top(obAll, 1, used)[0]; if (i !== undefined) got = pool[i]; else { const k = top(ALL, 1, used)[0]; if (k !== undefined) got = pool[k]; } }
        if (!got) break;
        put(got);
      }
    }
    if (P.memo.size >= DECK_MEMO_MAX) P.memo.clear();
    P.memo.set(key, deck);
    return deck;
  }
  // 原本的寫法（API._noCache 對照用；一行不改，只從 trialDeck 抽出來）
  function deckSlow(content, K, base, id, fl, M, u) {
    const pool = trialPool(content);
    const hv = new Map(), hOf = c => { let v = hv.get(c.id); if (v === undefined) { v = u(id + '|' + c.id); hv.set(c.id, v); } return v; };   // 同一張只算一次雜湊
    const byHash = (arr, used) => arr.filter(c => !used.has(c.id)).map(c => [hOf(c), c]).sort((a, z) => a[0] - z[0] || (a[1].id < z[1].id ? -1 : 1)).map(x => x[1]);
    const deck = [], used = new Set();
    const put = c => { deck.push(c); used.add(c.id); };
    if (!M) {                                                    // 沒給主屬性（直接開打、測試直接呼叫）或 mainShare 0：舊規則一字不改
      let bag = pool.filter(c => power(c) >= fl); if (bag.length < K.minPool) bag = pool;
      for (const c of base) if (power(c) >= fl) put(c);
      if (deck.length < base.length) for (const c of byHash(bag, used)) { if (deck.length >= base.length) break; put(c); }
    } else {
      // 客人主屬性（第 A 波 6，店主問「為何對手都打經典」）：這副牌至少 need＝round(mainShare×張數) 張是 M 那軸最高（並列算）的牌。
      //   ① 他自己夠下限的牌：M 那軸最高的全留；其他的留到「張數 − max(need, 留下的主屬性張數)」為止（照原本順序）
      //   ② 主屬性不夠 need → 從池子補 M 那軸最高、夠下限的（照雜湊；其中「只有 M 最高、不並列」的有 minPool 張以上就只用這些；
      //      夠下限的不到 minPool 張 → 改用 M 那軸最高裡總星最高的 minPool 張）
      //   ③ 剩下的格子補非主屬性的牌：另外兩軸輪流補（張數少的那軸先；一樣多先補 BEATS[M]＝他唬人時出的那軸），池子照雜湊；某軸補不到就用另一軸
      //   池子大多是經典最高的牌（323 張裡經 249、冷 73、硬 61，並列都算），不這樣分，冷門／硬蕊客人換來的牌又會是經典
      const isM = c => star(c, M) === peak(c);
      const need = Math.min(base.length, Math.max(0, Math.round((+K.mainShare || 0) * base.length)));
      const keepM = base.filter(c => power(c) >= fl && isM(c)), keepO = base.filter(c => power(c) >= fl && !isM(c));
      for (const c of keepM) put(c);
      for (const c of keepO.slice(0, Math.max(0, base.length - Math.max(need, keepM.length)))) put(c);
      if (keepM.length < need) {
        let mb = pool.filter(c => isM(c) && power(c) >= fl);
        const strict = mb.filter(c => topAxes(c).length === 1);
        if (strict.length >= K.minPool) mb = strict;
        if (mb.length < K.minPool) mb = pool.filter(isM).sort((a, z) => power(z) - power(a) || (a.id < z.id ? -1 : 1)).slice(0, Math.max(K.minPool, mb.length));
        let k = keepM.length;
        for (const c of byHash(mb, used)) { if (k >= need || deck.length >= base.length) break; put(c); k++; }
      }
      const others = ATTRS.filter(a => a !== M), first = BEATS[M];
      const ob = pool.filter(c => !isM(c) && power(c) >= fl), obAll = ob.length >= K.minPool ? ob : pool.filter(c => !isM(c));
      const lane = (c, a) => star(c, a) === peak(c);
      for (let guard = 0; deck.length < base.length && guard < 40; guard++) {
        const cnt = a => deck.filter(c => !isM(c) && lane(c, a)).length;
        const order = others.slice().sort((a, z) => cnt(a) - cnt(z) || (a === first ? -1 : z === first ? 1 : 0));
        let got = null;
        for (const a of order) { got = byHash(obAll.filter(c => lane(c, a)), used)[0]; if (got) break; }
        if (!got) got = byHash(obAll, used)[0] || byHash(pool, used)[0];
        if (!got) break;
        put(got);
      }
    }
    return deck;
  }
  function trialDeck(content, id, pos, o) {
    o = o || {};
    const T = trialCfg(content, o.tier), K = T.curve.deck, d = Math.max(1, pos | 0);
    const E = content.enemies[id]; if (!E) throw new Error('engine: unknown enemy ' + id);
    const cls = POS_CLASSES.includes(o.cls) ? o.cls : classAt(d);
    const base = (E.deck || []).map(x => cardFrom(content, x));
    const tag = String(o.seedKey || 'lab') + '#' + (o.runNo || 1) + '#' + d;
    const u = s => hash01(tag + '|' + s);
    const fl = Math.min(K.floorMax, K.floorBase + Math.floor(K.floorRate * d));
    const M0 = ATTRS.includes(o.main) ? o.main : null, M = M0 && +K.mainShare > 0 ? M0 : null;   // mainShare 0＝主屬性只標示、不改牌組（sim 對照用）
    const pin = Array.isArray(o.deckIds) && o.deckIds.length && o.deckIds.every(x => typeof x === 'string' && cardOf(content, x) && !cardOf(content, x).tier) ? o.deckIds.map(x => cardOf(content, x)) : null;   // run.retryDeck（pinOldDeck）
    const deck = pin || (API._noCache || !POOL_INFO ? deckSlow(content, K, base, id, fl, M, u) : deckFast(content, K, base, E, id, tag, fl, M));
    const b = Math.floor(Math.max(0, d - K.buffFrom) / K.buffEvery);
    // 每張都是他自己的一份（換來的牌可能跟你包包裡的是同一張唱片：對決狀態裡不共用物件）
    //   加星：加在那張最高那軸（topAttr）；有主屬性時，主屬性那軸也是最高（並列）的牌加在主屬性那軸（「加星偏主屬性」）
    const out = deck.map(c => {
      const m = M && star(c, M) === peak(c) ? M : topAttr(c), s0 = star(c, m), nv = b && !c.tier ? Math.min(K.buffCap, Math.max(s0, s0 + b)) : s0;
      return nv === s0 ? Object.assign({}, c) : Object.assign({}, c, { [m]: nv, plus: { attr: m, n: nv - s0 } });
    });
    let ace = null;
    const aces = content.aces || {};
    if (cls === 'boss') ace = o.bossCard && tierOfApex(content, o.bossCard) ? cardFrom(content, o.bossCard)   // 解鎖制：這一輪的 run.bossCard
      : o.bossAce && aces[o.bossAce] ? cardFrom(content, aces[o.bossAce]) : null;
    else {
      const p = d >= K.aceFrom ? Math.min(K.aceMax, K.aceRate * (d - K.aceFrom + 1)) : 0;
      if (p > 0 && u('ace') < p) {
        const others = TIERS.filter(t => t !== o.playerAce && aces[t]);
        if (others.length) ace = cardFrom(content, aces[others[Math.floor(u('acepick') * others.length) % others.length]]);
      }
    }
    const res = { deck: out, ace, floor: fl, buff: b, replaced: base.length - deck.filter(c => base.includes(c)).length };
    if (M0) res.main = M0;
    return res;
  }
  // 中繼點：第 10、20、30、50、75、100 位，之後每 50 位（走到就記：advance 到那一位時）
  function checkpointsOf(content) { const T = trialCfg(content); return { list: (T.checkpoints || []).slice().sort((a, b) => a - b), every: T.checkpointEvery | 0 }; }
  function nextCheckpoint(pos, content) {
    const { list, every } = checkpointsOf(content), d = Math.max(1, pos | 0);
    for (const c of list) if (c >= d) return c;
    const last = list.length ? list[list.length - 1] : 0;
    if (!(every > 0)) return null;
    return last + Math.max(1, Math.ceil((d - last) / every)) * every;
  }
  const isCheckpoint = (pos, content) => nextCheckpoint(pos, content) === pos;
  // 離下個中繼點還有幾位（從目前這位往前數、只算在前面的：第 7 位 → 第 10 位還有 3；走到第 10 位 → 下一個第 20 位還有 10）
  function toCheckpoint(run, content) { const p = Math.max(1, run.pos | 0), c = nextCheckpoint(p + 1, content); return c == null ? null : c - p; }

  function econ(content) {
    const e = (content && content.economy) || {};
    return { start: e.start != null ? e.start : ECON.start, win: Object.assign({}, ECON.win, e.win || {}), price: Object.assign({}, ECON.price, e.price || {}),
      bargain: Object.assign({}, ECON.bargain, e.bargain || {}), relicPrice: e.relicPrice != null ? e.relicPrice : ECON.relicPrice,
      sellRate: e.sellRate != null ? e.sellRate : ECON.sellRate,
      stock: e.stock || ECON.stock, featureStock: e.featureStock || ECON.featureStock, relicStock: e.relicStock || ECON.relicStock };
  }
  const relicOk = (content, id) => !!(content.relics && content.relics[id]) && content.relics[id].v4 !== false;
  const cardOf = (content, id) => (content.cards && content.cards[id]) || null;
  const uniq = a => a.filter((x, k) => a.indexOf(x) === k);

  // 第 r 輪的 5 位：一般客人從 C.normals 挑 3 位不重複（先挑上一輪沒來的）、菁英從 C.elites（上一輪沒來的優先）、藏家最後。
  //   種子＝seedKey#runNo#r<輪>（不碰 run.rng：同一天同一趟的客人不管挑哪張王牌都一樣）
  //   沒給 prev（jumpTo）：從第 1 輪往上逐輪算（迴圈，不遞迴；跳到第 50000 位也不會爆堆疊），結果跟一輪一輪 advance 一樣
  function roundOrder(content, seedKey, runNo, r, prev) {
    if (r > 1 && !prev) { let o = null; for (let k = 1; k < r; k++) o = roundOne(content, seedKey, runNo, k, o); prev = o; }
    return roundOne(content, seedKey, runNo, r, prev);
  }
  function roundOne(content, seedKey, runNo, r, prev) {
    const N = content.normals || [], EL = content.elites || [], B = content.boss || 'boss';
    prev = prev || [];
    const st = { rng: fnv1a32(String(seedKey) + '#' + runNo + '#r' + r) || 1 };
    const sh = shuffle(N.slice(), st), fresh = sh.filter(x => !prev.includes(x)), seen = sh.filter(x => prev.includes(x));
    const normals = fresh.concat(seen).slice(0, PER_ROUND - 2);
    const eFresh = EL.filter(x => !prev.includes(x)), ePool = eFresh.length ? eFresh : EL;
    const elite = ePool.length ? ePool[Math.floor(rng(st) * ePool.length)] : null;
    return normals.concat([elite, B]).filter(Boolean);
  }
  // 客人主屬性（第 A 波 6，店主 11-16）：同一輪 5 位三種都有——一般 3 位各一（經／冷／硬的排列裡挑「跟他原本那副牌的主屬性對上最多」的那個，
  //   一樣多照雜湊 seedKey#runNo#main#輪）；菁英、藏家照種子輪：k＝雜湊 seedKey#runNo#mainrot（0–2），菁英 ATTRS[(k＋輪)%3]、藏家 ATTRS[(k＋輪＋1)%3]
  //   （同一輪兩位不同色，每三輪各色各輪到一次）。不碰 run.rng；同一天同一趟不管挑哪張王牌都一樣
  const PERMS = [['c', 'o', 'h'], ['c', 'h', 'o'], ['o', 'c', 'h'], ['o', 'h', 'c'], ['h', 'c', 'o'], ['h', 'o', 'c']];
  function naturalMain(content, id) {
    const E = content && content.enemies && content.enemies[id];
    return E ? deckMain((E.deck || []).map(x => cardOf(content, x)).filter(Boolean), E.taste) : null;
  }
  function roundMains(content, seedKey, runNo, r, order) {
    r = Math.max(1, r | 0);
    order = Array.isArray(order) ? order : roundOrder(content, seedKey, runNo, r, null);
    const tag = String(seedKey || 'lab') + '#' + (runNo || 1), out = order.map(() => null);
    const nIdx = order.map((id, i) => POS_CLASSES[i] === 'normal' ? i : -1).filter(i => i >= 0);
    const nat = nIdx.map(i => naturalMain(content, order[i]));
    let best = PERMS[0], bs = -1, bh = 2;
    for (const p of PERMS) {
      const s = nIdx.reduce((t, i, k) => t + (nat[k] === p[k % 3] ? 1 : 0), 0), h = hash01(tag + '#main#' + r + '#' + p.join(''));
      if (s > bs || (s === bs && h < bh)) { best = p; bs = s; bh = h; }
    }
    nIdx.forEach((i, k) => { out[i] = best[k % 3]; });
    const k0 = Math.floor(hash01(tag + '#mainrot') * 3) % 3;
    order.forEach((id, i) => { if (POS_CLASSES[i] === 'elite') out[i] = ATTRS[(k0 + r) % 3]; else if (POS_CLASSES[i] === 'boss') out[i] = ATTRS[(k0 + r + 1) % 3]; });
    return out;
  }
  // 第 pos 位客人的主屬性（這一輪＝run.order；別輪照 roundOrder 算）
  function mainAt(run, content, pos) {
    if (!run) return null;
    const d = Math.max(1, pos | 0), r = roundOf(d), i = (d - 1) % PER_ROUND;
    const order = r === run.round && Array.isArray(run.order) ? run.order : roundOrder(content, run.seedKey, run.runNo, r, null);
    return roundMains(content, run.seedKey, run.runNo, r, order)[i] || null;
  }

  // 種子（SPEC 從唱片櫃挑牌開局 §0、§1 裁定 3）：卡存在、不是頂點卡（頂點卡只能放王牌格）
  function canSeed(content, id) { const c = typeof id === 'string' ? cardOf(content, id) : null; return !!c && !c.tier; }
  //   max＝這一趟的種子格（第 D 波樂歷 Lv12 起 4；SPEC-D §2.4）；沒給＝CFG.seedMax（3）
  function seedsOf(content, ids, max) {
    const m = Number.isInteger(max) && max > 0 ? max : CFG.seedMax;
    return (Array.isArray(ids) ? ids : []).filter((id, k, a) => canSeed(content, id) && a.indexOf(id) === k).slice(0, m);
  }
  // 這一趟藏家帶哪張王牌（＝newRun 的 run.bossAce：run.rng 的第一個亂數；存檔遷移用它補「打倒藏家拿到的王牌」）
  function bossAceFor(seedKey, runNo, ace) {
    ace = TIERS.includes(ace) ? ace : 'hall';
    const st = { rng: fnv1a32(String(seedKey || 'lab') + '#' + (runNo || 1)) || 1 };
    return pickOne(TIERS.filter(t => t !== ace), st);
  }
  // ---------- 流派與頂點卡解鎖（店主 11-16：「流派的頂點卡要透過遊戲蒐集才能解鎖」；scratchpad v5/unlock） ----------
  //   引擎不碰存檔：「擁有」由畫面傳（owned＝ownedFn 三種形狀）。解鎖順序＝被剋鏈：流亡剋殿堂、殿堂剋異端、異端剋流亡（冷剋經、經剋硬、硬剋冷）
  const TIER_BEATS = { pearl: 'hall', hall: 'heresy', heresy: 'pearl' };
  function unlockChain(start) { const s = TIERS.includes(start) ? start : 'hall'; return [s, TIER_BEATS[s], TIER_BEATS[TIER_BEATS[s]]]; }
  function tierOfApex(content, id) { const c = typeof id === 'string' ? cardOf(content, id) : null; return c && TIERS.includes(c.tier) ? c.tier : null; }
  // 頂點卡：三派預設（content.aces）＋試做名單（content.apexTrial）；照 TIERS、名單順序、不重複；卡要存在、tier 要對
  function apexCards(content, tier) {
    const out = [];
    for (const t of TIERS) {
      if (tier && t !== tier) continue;
      for (const id of [(content.aces || {})[t]].concat(apexList(content, t).map(e => e && e.card))) if (id && tierOfApex(content, id) === t && !out.includes(id)) out.push(id);
    }
    return out;
  }
  // 已解鎖的派：擁有那一派任一張頂點卡；o.start（初始流派／目前在玩的那派；舊存檔＝save.lastAce）一定算。照 TIERS 順序
  function unlockedTiers(content, owned, o) {
    const has = ownedFn(owned), st = o && o.start;
    return TIERS.filter(t => t === st || apexCards(content, t).some(id => has(id)));
  }
  // 擁有的頂點卡（?apex=1 挑王牌能挑的）：owned 裡的頂點卡＋已解鎖各派預設那張（解鎖的派至少有預設那張：舊存檔的初始派只「認識」也算）
  //   o.tiers＝已解鎖的派（沒給＝unlockedTiers(content, owned, o)）
  function ownedApex(content, owned, o) {
    const has = ownedFn(owned), tiers = o && Array.isArray(o.tiers) ? o.tiers : unlockedTiers(content, owned, o);
    const def = TIERS.filter(t => tiers.includes(t)).map(t => (content.aces || {})[t]).filter(Boolean);
    return apexCards(content).filter(id => has(id) || def.includes(id));
  }
  // 下一個要解鎖的派：還鎖著、而且被某個已解鎖的派剋的那一派（解鎖 1 派 → 它剋的那派；2 派 → 剩下那派；0 或 3 派 → null）
  function nextUnlock(tiers) {
    const u = (tiers || []).filter(t => TIERS.includes(t));
    return u.length ? (TIERS.find(t => !u.includes(t) && u.some(x => TIER_BEATS[x] === t)) || null) : null;
  }
  // 舊存檔（解鎖制以前，BRIEF 第 6 條）：已解鎖＝save.lastAce ∪ 唱片櫃擁有頂點卡的派；擁有的試做卡＝唱片櫃擁有的（只「認識」的不算）。
  //   own＝要補記成擁有的：lastAce 那派預設那張（src 'start'；之後換到別派，初始派也不會鎖回去）。畫面每次載入都可以跑（新規則的存檔 own 永遠是空的）
  function unlockMigrate(content, owned, lastAce) {
    const has = ownedFn(owned), st = TIERS.includes(lastAce) ? lastAce : null;
    const tiers = unlockedTiers(content, has, { start: st }), def = st ? (content.aces || {})[st] : null;
    return { tiers, apex: ownedApex(content, has, { tiers }), own: def && cardOf(content, def) && !has(def) ? [def] : [] };
  }
  // run 的解鎖狀態＝開局快照（run.unlock）＋這一趟收到的（run.acesWon）＋這次的王牌那派；沒有 run.unlock＝三派都開（舊行為）
  function unlockTiersOf(run, content) {
    const U = run && run.unlock;
    if (!U) return TIERS.slice();
    const got = (run.acesWon || []).map(id => tierOfApex(content, id));
    return TIERS.filter(t => (U.tiers || []).includes(t) || got.includes(t) || t === run.ace);
  }
  // run 擁有的頂點卡：快照（旗標關＝null：只算各派預設）＋這一趟收到的＋已解鎖各派預設那張
  function ownedApexOf(run, content) {
    const U = run && run.unlock, tiers = unlockTiersOf(run, content);
    if (!U) return apexCards(content).filter(id => tiers.includes(tierOfApex(content, id)));
    const has = new Set([].concat(Array.isArray(U.apex) ? U.apex : [], run.acesWon || []));
    return ownedApex(content, id => has.has(id), { tiers });
  }
  // 換王牌能換的：已解鎖的派；旗標開（run.unlock.apex 是陣列）＝擁有的頂點卡（旗標關＝null：每派只有預設那張）
  function aceChoices(run, content) {
    const U = run && run.unlock;
    return { tiers: unlockTiersOf(run, content), apex: !U || Array.isArray(U.apex) ? ownedApexOf(run, content) : null };
  }
  // 這一輪的藏家帶哪張頂點卡（7 星比星，跟以前一樣；run.unlock 才走，沒有＝content.aces[run.bossAce]）：
  //   ①還有鎖著的派 → 被剋鏈下一派（nextUnlock）的預設那張；②三派都開、旗標開 → 一張還沒擁有的試做頂點卡（先挑別派的、別派都收齊了才挑你這派；
  //   雜湊 seedKey#runNo#bossApex#輪，每輪各抽、不碰 run.rng）；③其他（旗標關、或 45 張全收齊）→ content.aces[run.bossAce] 照舊
  function bossCardFor(run, content) {
    const aces = content.aces || {}, legacy = aces[run.bossAce] || null, U = run && run.unlock;
    if (!U) return legacy;
    const nx = nextUnlock(unlockTiersOf(run, content));
    if (nx && cardOf(content, aces[nx])) return aces[nx];
    if (!Array.isArray(U.apex)) return legacy;
    const have = new Set(ownedApexOf(run, content)), free = apexCards(content).filter(id => !have.has(id));
    const tag = String(run.seedKey || 'lab') + '#' + (run.runNo || 1) + '#bossApex#' + (run.round || 1);
    const first = ids => ids.map(id => [hash01(tag + '|' + id), id]).sort((a, b) => a[0] - b[0] || (a[1] < b[1] ? -1 : 1)).map(x => x[1])[0];
    return first(free.filter(id => tierOfApex(content, id) !== run.ace)) || first(free) || legacy;
  }
  // 藏家這一場真的帶的那張（他牌單裡的頂點卡）；沒有就照這一輪的設定
  function bossWonCard(run, content, duel) {
    const ids = (duel && duel.e && duel.e.deckIds) || [];
    return ids.find(id => tierOfApex(content, id)) || run.bossCard || (content.aces || {})[run.bossAce] || null;
  }
  // 載入存檔時把 run 的解鎖狀態對齊存檔（畫面每次 loadSave 都呼叫；o＝{unlocked, start?, apexOwned?}，apexOwned 有給＝現在開著 ?apex=1）：
  //   ・舊的進行中 run（解鎖制以前存的，沒有 run.unlock）：補上快照；打過藏家（run.aceWon）＝那張（content.aces[run.bossAce]）算這一趟收的、start＝o.start 或這次的派
  //   ・已經有的：tiers／apex 換成存檔現在的（旗標只看網址：同一份存檔開關 ?apex=1，三派都開後藏家帶試做卡或照舊跟著變）；start、acesWon 不動
  //   還能換王牌、旗標開、王牌是沒擁有的試做卡 → 拿掉 run.aceId（回那派預設）。這一輪藏家的卡重算；藏家那場打到一半、剛打完在領獎／升級、
  //   或輸給他、說情重打還沒按（pending retry；重打＝同一位、同一副牌）→ 不動（舊 run＝他真的帶的那張：打到一半看牌單、其他＝content.aces[run.bossAce]）。回 true＝有改
  function fixUnlock(run, content, o) {
    if (!run || !o || !Array.isArray(o.unlocked) || !TIERS.includes(run.ace)) return false;
    const before = JSON.stringify([run.unlock, run.acesWon, run.bossCard, run.aceId]);
    const aces = content.aces || {}, old = !run.unlock;
    if (old) run.acesWon = run.aceWon && aces[run.bossAce] && cardOf(content, aces[run.bossAce]) ? [aces[run.bossAce]] : [];
    if (!Array.isArray(run.acesWon)) run.acesWon = [];
    const apex = Array.isArray(o.apexOwned) ? uniq(o.apexOwned.filter(id => tierOfApex(content, id))) : null;
    const tiers = TIERS.filter(t => o.unlocked.includes(t) || t === run.ace || (apex || []).some(id => tierOfApex(content, id) === t));
    run.unlock = { tiers, start: !old && TIERS.includes(run.unlock.start) ? run.unlock.start : TIERS.includes(o.start) ? o.start : run.ace, apex };
    if (run.aceId != null && apex && canSwitchAce(run, content) && !ownedApexOf(run, content).includes(run.aceId)) delete run.aceId;
    const p = run.pending, bossNow = !!(run.duel && run.duel.e && run.duel.e.boss) || !!(p && !p.prologue && run.prologue !== 'pending' && classAt(p.pos || run.pos) === 'boss');
    if (!bossNow) run.bossCard = bossCardFor(run, content);
    else if (old || !run.bossCard) run.bossCard = run.duel ? bossWonCard(run, content, run.duel) : (p.aceWon || aces[run.bossAce] || null);
    return JSON.stringify([run.unlock, run.acesWon, run.bossCard, run.aceId]) !== before;
  }
  function newRun(content, o) {
    o = o || {};
    const seedKey = String(o.seedKey || 'lab'), runNo = o.runNo || o.nightNo || 1;
    const ace = TIERS.includes(o.ace) ? o.ace : 'hall';
    const tier = Math.max(0, o.tier | 0), T = trialCfg(content, tier), EC = econ(content);
    const from = Number.isInteger(o.from) && o.from > 1 ? o.from : null;   // 第 C 波中繼點開局（SPEC-C §4.7）：從第 N 位開＝不打序章
    const prologue = from ? false : o.prologue != null ? !!o.prologue : runNo === 1;
    // 包包＝種子（0–3 張）＋老闆送的補到 4 張（種子跟送的重複：送的往下補下一張）；序章那一趟不挑（裁定 2）
    const G = ((content.gifts || {})[ace] || []).slice();
    const seeds = prologue ? [] : seedsOf(content, o.seeds, o.seedMax);   // 第 D 波：o.seedMax（樂歷 Lv12 起 4 格＝送的全換掉）
    const gifts = G.filter(id => !seeds.includes(id)).slice(0, Math.max(0, G.length - seeds.length));
    const run = {
      v: RUN_V, seedKey, runNo, tier, rng: fnv1a32(seedKey + '#' + runNo) || 1, ace, bossAce: null,
      bag: seeds.concat(gifts), seeds: seeds.slice(), gifts: gifts.slice(), entered: [], drops: [], kept: null,
      relics: (o.relics || []).filter((id, k, a) => relicOk(content, id) && a.indexOf(id) === k).slice(0, CFG.relicMax),
      pos: 1, round: 1, order: roundOrder(content, seedKey, runNo, 1, null), idx: 0, mainFrom: 1,
      prologue: prologue ? 'pending' : null,
      retryLeft: T.retry, pending: null, duel: null, duelEnemy: null, over: null,
      hp: T.youHp, maxHp: T.youHp, hpIn: T.youHp, level: 1, xp: 0, atk: 0, def: 0, levelUps: 0, picks: [],
      streak: 0, bestStreak: 0, checkpoints: [], taken: 0, aceWon: false,
      hintSeen: [],                                               // 11-17：這一趟看過的提示句 id（舊的在前；engine pickLine 盡量不重複）
      money: EC.start,
      shop: { bins: {}, relics: [], bargain: [], bargainPicked: false, firstGuestInside: false, radio: null },
      stats: { wins: 0, beaten: 0, fights: 0, hands: 0, retries: 0, taken: [], met: [], relicsGot: [], lostAt: null,
        earned: 0, spent: 0, bought: [], sold: [], relicsBought: [], relicsSold: [] },
    };
    // 解鎖制（店主 11-16）：畫面傳 o.unlocked（已解鎖的派）、o.start（初始流派）、o.apexOwned（旗標開：擁有的頂點卡）。沒給 unlocked＝舊行為、run 不多欄位（sim、舊呼叫）
    if (Array.isArray(o.unlocked)) {
      const apex = Array.isArray(o.apexOwned) ? uniq(o.apexOwned.filter(id => tierOfApex(content, id))) : null;
      const start = TIERS.includes(o.start) ? o.start : ace;
      run.unlock = { tiers: TIERS.filter(t => o.unlocked.includes(t) || t === start || t === ace || (apex || []).some(id => tierOfApex(content, id) === t)), start, apex };
      run.acesWon = [];
    }
    if (o.aceId != null && apexList(content, ace).some(e => e && e.card === o.aceId) &&
      !(run.unlock && run.unlock.apex && !ownedApexOf(run, content).includes(o.aceId))) run.aceId = o.aceId;   // 頂點卡試做：挑的那張（旗標關時不讀；解鎖制旗標開：要擁有）
    run.taken = run.bag.length;                                   // 收了幾張：老闆送的也算（裁定 9）；種子補的是送的那幾格，一樣算
    // 第 C 波（SPEC-C §2.2）：功能全關也照樣有這幾欄（舊 run 載入時 fixWaveC 補）；全關時永遠停在初值
    const W = wcCfg(content);
    Object.assign(run, { far0: Math.max(0, o.bestFar | 0), road: [], lexp: {}, tickets: 0, chestDry: Math.max(0, o.chestDry | 0), dare: null, dareLast: null,
      consign: null, fortune: null, safety: !!(W.safety.on && o.safety && !from), found: [] });
    // 第 D 波樂歷（SPEC-D §2.7）：talent／relicPick／goldAdd（＝talentArgs 給的）。全沒給或全 0＝run 一個欄位都不多（逐字現況）
    if (o.talent || o.relicPick || o.goldAdd) applyTalent(run, content, o);
    // 第 I 波 I-2 上場＋耐聽（o.lineup／o.wear；沒給＝content 的 on，兩個一起開關）：關著＝一個欄位都不多（逐字現況）。lineupFrom：o.lineupFrom（sim）＞新帳號第一趟（o.firstRun）11＞6
    const LU = o.lineup != null ? !!o.lineup : !!luCfg(content).on, WR = o.wear != null ? !!o.wear : !!wearCfg(content).on;
    if (LU || WR) {
      const L = luCfg(content);
      run.lineupFrom = Number.isInteger(o.lineupFrom) && o.lineupFrom > 0 ? o.lineupFrom : (o.firstRun ? L.firstRunFrom | 0 : L.from | 0) || LINEUP.from;
      if (LU) { Object.assign(run, { lineup: null, bench: [], lineupFresh: [], lineupDue: false }); if ((o.lineupBonus | 0) > 0) run.lineupBonus = o.lineupBonus | 0; }
      if (WR) run.wear = {};
      run.rested = [];
    }
    if (o.fac && facCfg(content)) {                              // 第 D 波棒二三流派（?fac=1；畫面 createRun 傳 fac:true）：存在 run 裡、續玩照 run（R-F9）。trialNodes 給錄音室試錄（第 I 波 I-3a）
      run.fac = { picks: {}, tal: {}, trialNodes: {} };
      const tal = facTalOf(content, ace, o.facTal);              // 第 D 波棒三派樹（o.facTal＝treeArgs）：'start' 模式 start 節點開局就送；'first' 模式這裡不送（facOffer 排前面）
      if (Object.keys(tal).length) { run.fac.tal = tal; facStart(run, content, 1); }
    }
    if (from) {                                                  // 中繼點開局：快速選秀（撿盤 k 次二選一＋升級 m 次三選一）→ 特價箱 → 從第 N 位開打（pos 先留 1，draftDone 才跳）
      run.cpFrom = from;
      const D = draftPlan(content, from);
      run.pending = { type: 'draft', k: D.k, m: D.m, ck: 0, cm: 0, offer: null };
      run.pending.offer = draftOffer(run, content);
    }
    const others = TIERS.filter(t => t !== ace);
    run.bossAce = others.includes(o.bossAce) ? o.bossAce : pickOne(others, run);   // ＝bossAceFor(seedKey, runNo, ace)（run.rng 的第一個亂數；解鎖制照樣抽，run.rng 序列不變）
    if (run.unlock) run.bossCard = bossCardFor(run, content);    // 這一輪藏家帶的頂點卡（被剋鏈／試做卡／照舊）
    run.want = wantOf(o.want);                                   // 想要清單快照（一檔貨加權；SPEC-B §5.2）：畫面傳 save.want，沒給＝[]
    restock(run, content);
    if (run.pending && run.pending.type === 'draft' && run.pending.k <= 0 && run.pending.m <= 0) draftDone(run, content);   // 選秀 0 題（content 設 k、m 都 0）：直接跳到第 N 位
    return run;
  }
  // 補貨（newRun 與每輪開頭；種子＝seedKey#runNo#shop#輪，不碰 run.rng）
  //   每一區從 bins.js 的 pool 抽：FEATURE 2–3 張（只抽史詩／傳奇）、其他每區 4–6 張（只抽普通／稀有／獨特；新進與店長推薦本來就不限曲風）；
  //   全店同一輪不重複（照 SHOP_ORDER 先上的先拿）；不上：你的王牌、包包裡的、特價箱的、頂點卡。display:true 的舊牆面區只展示、不賣
  //   櫃檯：relicShop 扣掉身上的；特價箱 6 張＝經／冷／硬各 2（池子扣掉包包裡的，不夠就少擺）
  //   一檔貨（第 B 波 SPEC-B §3；content.lot.on，預設開）：架上唱片改成「每輪抽一檔（drawLot）、每位客人從檔裡輪流上架（shelve）」。
  //     順序：收音機清空 → stockBins（舊的箱子迴圈原封不動；lot 關＝寫進 run.shop.bins，lot 開＝結果丟掉、只為了把 #shop# 亂數消耗到同一個位置）
  //     → 配件 → 特價箱 →（lot 開）drawLot（自己的 #lot# 亂數）→ shelve。→ 配件、特價箱 lot on／off 逐字相同（定稿 E2）
  function restock(run, content) {
    const EC = econ(content), st = { rng: fnv1a32(run.seedKey + '#' + run.runNo + '#shop#' + (run.round || 1)) || 1 };
    const SH = run.shop || (run.shop = { bins: {}, relics: [], bargain: [], bargainPicked: false, firstGuestInside: false, radio: null });
    SH.radio = null;                                   // 收音機每輪一次：新一輪重來（電台那張跟特價箱一起換掉）
    const span = (lohi, fallback) => { const lo = (lohi && lohi[0]) | 0 || fallback[0], hi = (lohi && lohi[1]) | 0 || fallback[1]; return lo + Math.floor(rng(st) * (Math.max(hi, lo) - lo + 1)); };
    const LT = lotCfg(content);
    const bins = stockBins(run, content, st);
    if (!LT.on) SH.bins = bins;                        // lot 關：今天的補貨（每輪一次、從 pool 抽）
    const rp = (((content.relicShop || {}).pool) || []).filter(id => relicOk(content, id) && !run.relics.includes(id));
    shuffle(rp, st);
    SH.relics = rp.slice(0, Math.min(span(EC.relicStock, ECON.relicStock), rp.length));
    const bp = (((content.bargain || {}).pool) || []).filter(id => cardOf(content, id) && !run.bag.includes(id));
    shuffle(bp, st);
    // 每色 2 張；「色」＝bargainLane（峰值那軸、並列取後面那軸；店主 11-16 換牌）。舊 9 張沒有並列 → 跟舊的 topAttr 分堆逐張相同
    const by = { c: [], o: [], h: [] };
    for (const id of bp) by[bargainLane(cardOf(content, id))].push(id);
    const out = [];
    for (let k = 0; k < 2; k++) for (const a of ATTRS) if (by[a][k]) out.push(by[a][k]);
    SH.bargain = out;
    if (LT.on) { SH.lot = drawLot(run, content, LT); shelve(run, content); }
    else if (SH.lot) delete SH.lot;                    // lot 關（sim --lot off、緊急關閉）：沒有檔
    return SH;
  }
  // 今天的箱子迴圈（restock 拆出來，一行不改；定稿 E2）：每一區從 bins.js 的 pool 抽 FEATURE 2–3／其他 4–6 張、全店不重複。回 {key: [ids]}
  function stockBins(run, content, st) {
    const EC = econ(content);
    const taken = new Set([content.aces && content.aces[run.ace], ...run.bag, ...bargainIds(content)].filter(Boolean));
    const span = (lohi, fallback) => { const lo = (lohi && lohi[0]) | 0 || fallback[0], hi = (lohi && lohi[1]) | 0 || fallback[1]; return lo + Math.floor(rng(st) * (Math.max(hi, lo) - lo + 1)); };
    const B = content.bins || {};
    const keys = SHOP_ORDER.filter(k => B[k]).concat(Object.keys(B).filter(k => !SHOP_ORDER.includes(k)).sort());
    const bins = {};
    for (const key of keys) {
      const b = B[key]; if (!b || b.display) continue;
      const feat = key === 'feature', ok = feat ? FEATURE_RARITY : SHELF_RARITY;
      const pool = uniq(b.pool || []).filter(id => !taken.has(id) && cardOf(content, id) && ok.includes(rarity(cardOf(content, id))));
      shuffle(pool, st);
      const got = pool.slice(0, Math.min(feat ? span(EC.featureStock, ECON.featureStock) : span(EC.stock, ECON.stock), pool.length));
      bins[key] = got;
      for (const id of got) taken.add(id);
    }
    return bins;
  }

  // ---------- 一檔貨（第 B 波 SPEC-B §3、§5.2）----------
  //   run.shop.lot＝{ no, src:'cur'|'all', bins:{k:[ids]}, cur:{k:int}, gone:[ids], want:[ids], told:[ids], fb?:[keys] }（見檔頭契約）
  //   數字＝content.lot（沒給的欄位用 LOT）。firstShow（沒給＝不用）＝第 1 輪每個非 FEATURE 箱上幾張（SPEC-B §7.4 第 2 步的旋鈕，資料改就好）
  const LOT = { on: true, size: 100, floor: 5, feature: 6, show: 3, featureShow: 2, firstCurated: true, wantP: 0.35, wantMax: 3 };
  function lotCfg(content) { return Object.assign({}, LOT, (content && content.lot) || {}); }
  // 箱子沒有 all（sim --data、engine.test 假箱子、之後換 bins 沒叫 deriveAll）→ 第 2 檔起退回 pool 並記在這裡（sim 結尾印警告；定稿 E1）
  const lotWarn = {};
  const shopKeysOf = content => { const B = (content && content.bins) || {}; return SHOP_ORDER.filter(k => B[k]).concat(Object.keys(B).filter(k => !SHOP_ORDER.includes(k)).sort()).filter(k => B[k] && !B[k].display); };
  const hasAll = b => !!b && Array.isArray(b.all) && b.all.length > 0;
  // 每箱配額：FEATURE＝feature；其他每箱 floor（不超過那箱張數），剩下的照全卡池各箱張數（all；沒有 all 的箱用 pool）比例、最大餘數法分（同分照 SHOP_ORDER）。
  //   抽的時候再 min(配額, 那一箱可抽張數)。正式資料＝SPEC-B §3.2 的表（合計 100）
  function lotQuota(content, L) {
    L = L || lotCfg(content);
    const B = (content && content.bins) || {}, keys = shopKeysOf(content);
    const size = k => hasAll(B[k]) ? B[k].all.length : (B[k].pool || []).length;
    const q = {}, others = keys.filter(k => k !== 'feature');
    if (keys.includes('feature')) q.feature = Math.max(0, Math.min(L.feature | 0, size('feature')));
    let rest = (L.size | 0) - (q.feature || 0);
    for (const k of others) { q[k] = Math.max(0, Math.min(L.floor | 0, size(k))); rest -= q[k]; }
    rest = Math.max(0, rest);
    const tot = others.reduce((a, k) => a + size(k), 0);
    if (tot > 0 && rest > 0) {
      const share = others.map((k, i) => ({ k, i, x: rest * size(k) / tot }));
      let left = rest;
      for (const s of share) { const f = Math.floor(s.x); q[s.k] += f; left -= f; }
      share.sort((a, b) => (b.x - Math.floor(b.x)) - (a.x - Math.floor(a.x)) || a.i - b.i);
      for (const s of share) { if (left <= 0) break; q[s.k]++; left--; }
    }
    return q;
  }
  // 一箱的來源（靜態部分）：uniq、卡存在、稀有度合規（FEATURE 史詩／傳奇、其他普通／稀有／獨特；頂點自然不在）、不是特價箱（新舊）。
  //   記在來源陣列上（WeakMap；卡池物件、特價箱、陣列長度變了就重算）；動態的（王牌、包包、前面箱子抽到的）每次扣
  const LOT_SRC = typeof WeakMap === 'function' ? new WeakMap() : null;
  function lotSrc(content, arr, feat) {
    const bg = (content && content.bargain) || {}, cards = content.cards;
    const hit = LOT_SRC && !API._noCache ? LOT_SRC.get(arr) : null;
    if (hit && hit.cards === cards && hit.bg === bg && hit.bp === bg.pool && hit.br === bg.retired && hit.n === arr.length && hit.feat === feat) return hit;
    const ok = feat ? FEATURE_RARITY : SHELF_RARITY, bset = new Set(bargainIds(content));
    const list = Array.from(new Set(arr)).filter(id => { const c = cardOf(content, id); return !!c && !bset.has(id) && ok.includes(rarity(c)); });
    const E = { cards, bg, bp: bg.pool, br: bg.retired, n: arr.length, feat, list, set: null };
    E.has = id => (E.set || (E.set = new Set(list))).has(id);
    if (LOT_SRC) LOT_SRC.set(arr, E);
    return E;
  }
  // 抽一檔（restock 呼叫；SPEC-B §3.3）：亂數＝seedKey#runNo#lot#輪（跟 run.rng、#shop# 分開）。第 1 輪（firstCurated）從策展池 pool、第 2 輪起從全卡池 all。
  //   全檔不重複（照 SHOP_ORDER）；不上：王牌（content.aces[run.ace]、run.aceId）、包包裡的、特價箱（新舊）、頂點、稀有度不合的。
  //   想要清單（run.want；§5.2）：照 hash01(…#wantord#id) 每檔重洗順序，每張在它那一箱可抽、那一箱想要的還不到配額、這一檔還不到 wantMax 時
  //   擲 hash01(…#want#id) < wantP → 收進來、排在那一箱最前面（下一位就上架）。
  //   每箱其餘的：在來源（靜態合規的那份）上做部分 Fisher–Yates（只洗到收滿配額為止；不在場的——王牌、包包、前面箱子抽到的——抽到就跳過），
  //   想要的照樣算「收到」再拿掉 → 想要清單長短不影響任何一箱抽到哪幾張的亂數（消耗跟沒有想要清單一樣）。每箱只花「配額＋跳過的」次亂數，
  //   不用整箱洗（全卡池 jazz 868 張；整箱洗 0.23 ms／檔、這樣 0.02 ms）。skip（fixLot 用）＝另外不抽的 id（這一位架上已經擺的）
  function drawLot(run, content, L, skip) {
    L = L || lotCfg(content);
    const round = run.round || 1, pre = run.seedKey + '#' + run.runNo + '#lot#' + round;
    const st = { rng: fnv1a32(pre) || 1 };
    const B = content.bins || {}, keys = shopKeysOf(content), Q = lotQuota(content, L);
    const first = round === 1 && !!L.firstCurated;
    const lot = { no: round, src: first ? 'cur' : 'all', bins: {}, cur: {}, gone: [], want: [], told: [] };
    const taken = new Set([content.aces && content.aces[run.ace], run.aceId, ...(run.bag || []), ...(skip || [])].filter(Boolean));
    const fb = [], src = {};
    for (const key of keys) {
      const b = B[key];
      let arr = b.pool || [];
      if (!first) { if (hasAll(b)) arr = b.all; else { fb.push(key); lotWarn[key] = true; } }
      src[key] = lotSrc(content, arr, key === 'feature');
    }
    // 想要清單：每張找它第一個（SHOP_ORDER）可抽的箱
    const wantBy = {}, wantP = +L.wantP || 0, wantMax = Math.max(0, L.wantMax | 0);
    const W = Array.from(new Set((Array.isArray(run.want) ? run.want : []).filter(x => typeof x === 'string' && !taken.has(x))));
    if (W.length && wantP > 0 && wantMax > 0) {
      const ord = W.map(id => ({ id, h: hash01(pre + '#wantord#' + id) })).sort((a, b) => a.h - b.h || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
      const where = {};
      let n = 0;
      for (const { id } of ord) {
        if (n >= wantMax) break;
        const key = keys.find(k => src[k].has(id));
        if (!key) continue;
        const got = wantBy[key] || (wantBy[key] = []);
        if (got.length >= Math.min(Q[key] | 0, src[key].list.length)) continue;
        if (hash01(pre + '#want#' + id) < wantP) { got.push(id); where[id] = key; n++; }
      }
      for (const { id } of ord) if (where[id]) taken.add(id);
    }
    for (const key of keys) {
      const mine = wantBy[key] || [], mset = new Set(mine), arr = src[key].list, n = arr.length, q = Q[key] | 0;
      const sw = new Map(), out = [];                                // 部分 Fisher–Yates（sw＝被換過的位置，不複製整箱）
      for (let i = 0; i < n && out.length < q; i++) {
        const j = i + Math.floor(rng(st) * (n - i)), id = sw.has(j) ? sw.get(j) : arr[j];
        sw.set(j, sw.has(i) ? sw.get(i) : arr[i]);
        if (!taken.has(id) || mset.has(id)) out.push(id);
      }
      const got = mine.concat(out.filter(id => !mset.has(id)).slice(0, Math.max(0, q - mine.length)));
      lot.bins[key] = got; lot.cur[key] = 0;
      for (const id of got) taken.add(id);
      for (const id of mine) lot.want.push(id);
    }
    if (fb.length) lot.fb = fb;
    return lot;
  }
  // 每位上架（SPEC-B §3.4）：從這一檔每箱的游標往後拿，跳過包包裡的、這一檔買走的（gone）、收音機這輪抽到那張、查不到的卡；
  //   拿滿 show（FEATURE featureShow；第 1 輪有 firstShow 就用它）或繞一圈為止。寫 run.shop.bins（形狀不變）。沒有檔回 false
  function shelve(run, content) {
    const SH = run && run.shop, L = SH && SH.lot;
    if (!L || !L.bins || typeof L.bins !== 'object') return false;
    const LT = lotCfg(content), bag = new Set(run.bag || []), gone = new Set(Array.isArray(L.gone) ? L.gone : []), radioId = SH.radio && SH.radio.id;
    if (!L.cur || typeof L.cur !== 'object') L.cur = {};
    const bins = {};
    for (const key of shopKeysOf(content)) {
      const list = Array.isArray(L.bins[key]) ? L.bins[key] : [], n = list.length;
      const k = Math.max(0, key === 'feature' ? LT.featureShow | 0 : ((L.no === 1 && LT.firstShow) | 0) || LT.show | 0), out = [];
      let i = n ? (((L.cur[key] | 0) % n) + n) % n : 0, step = 0;
      while (out.length < k && step < n) { const id = list[i % n]; i++; step++; if (!bag.has(id) && !gone.has(id) && id !== radioId && cardOf(content, id)) out.push(id); }
      L.cur[key] = n ? i % n : 0;
      bins[key] = out;
    }
    SH.bins = bins;
    return true;
  }
  // 檔的形狀對不對（fixLot、advance 用）：bins／cur 每個現在的箱都有（陣列／非負整數）、gone 字串陣列、是這一輪的檔（no＝run.round）
  function lotOk(run, content) {
    const L = run && run.shop && run.shop.lot;
    if (!L || typeof L !== 'object' || !L.bins || typeof L.bins !== 'object' || Array.isArray(L.bins) || !L.cur || typeof L.cur !== 'object' || !Array.isArray(L.gone)) return false;
    if (L.no !== (run.round || 1)) return false;
    if (!L.gone.every(x => typeof x === 'string')) return false;
    return shopKeysOf(content).every(k => Array.isArray(L.bins[k]) && L.bins[k].every(x => typeof x === 'string') && Number.isInteger(L.cur[k]) && L.cur[k] >= 0);
  }
  // 舊存檔（B 波以前存的進行中 run 沒有 lot、形狀壞、不是這一輪的檔；ui.js loadSave 呼叫）：同種子重抽這一輪的檔（每次載入一樣），
  //   這一位架上的 run.shop.bins 原樣不動；每箱＝這一位架上現有的排最前＋檔裡的、游標指在它們後面 → 下一位接著上不在這一位架上的（定稿 B3）。
  //   架上已經擺的不算這一檔的名額：抽檔時先扣掉它們（drawLot skip），配額全給沒擺過的——舊 restock 一箱 4–6 張、第 1 輪的策展池一箱只有 11–24 張，
  //   照「front＋檔裡扣掉 front、切到配額」的話下一位常繞回來重上。lot 關＝不做。回 true＝有改
  function fixLot(run, content) {
    const SH = run && run.shop;
    if (!lotCfg(content).on || !SH || !SH.bins || typeof SH.bins !== 'object' || !Array.isArray(run.bag)) return false;
    if (lotOk(run, content)) {
      let ch = false;
      for (const f of ['want', 'told']) if (!Array.isArray(SH.lot[f]) || !SH.lot[f].every(x => typeof x === 'string')) { SH.lot[f] = []; ch = true; }
      return ch;
    }
    const fronts = {}, onShelf = [];
    for (const k of shopKeysOf(content)) { fronts[k] = uniq(Array.isArray(SH.bins[k]) ? SH.bins[k].filter(x => typeof x === 'string' && !onShelf.includes(x)) : []); onShelf.push(...fronts[k]); }
    const lot = drawLot(run, content, null, onShelf);
    for (const k of Object.keys(lot.bins)) {
      const list = fronts[k].concat(lot.bins[k]), n = list.length;
      lot.bins[k] = list; lot.cur[k] = n ? fronts[k].length % n : 0;
    }
    SH.lot = lot;
    return true;
  }
  // 這一檔這一箱還沒賣掉的張數（不算包包裡的、買走的、收音機這輪抽到的；含現在架上的）。沒有檔＝0（畫面照 content.lot.on 選字）
  function lotLeft(run, key) {
    const SH = run && run.shop, L = SH && SH.lot;
    if (!L || !L.bins || !Array.isArray(L.bins[key])) return 0;
    const bag = new Set(run.bag || []), gone = new Set(Array.isArray(L.gone) ? L.gone : []), rid = SH.radio && SH.radio.id;
    return L.bins[key].filter(id => !bag.has(id) && !gone.has(id) && id !== rid).length;
  }
  // 想要清單快照：字串、去重（留第一次出現的位置）、留最後 200 張
  function wantOf(w) { return Array.isArray(w) ? uniq(w.filter(x => typeof x === 'string')).slice(-200) : []; }

  // ---------- 存檔換 id（第 B 波 SPEC-B §2.2；純函式，ui.js migrateIds 挑欄位後呼叫）----------
  //   mapIds(v, map, merge?)：深走訪 v（陣列逐個、物件的鍵與值都換），「整個字串剛好是 map 的鍵、而且不含 |」才換成 map[字串]；其他原樣。
  //   物件的鍵換完撞在一起（同一張的舊、新鍵都在）→ merge(先寫進去的, 這一個, 鍵)；沒給 merge＝後蓋前。回新的值（不改傳進來的）；跑兩次結果一樣
  function mapIds(v, map, merge) {
    const own = Object.prototype.hasOwnProperty, M = map && typeof map === 'object' ? map : {};
    const m = x => (typeof x === 'string' && x.indexOf('|') < 0 && own.call(M, x) && typeof M[x] === 'string') ? M[x] : x;
    const put = (o, k, x) => { if (k === '__proto__') Object.defineProperty(o, k, { value: x, enumerable: true, writable: true, configurable: true }); else o[k] = x; };
    function walk(x) {
      if (Array.isArray(x)) return x.map(walk);
      if (x && typeof x === 'object') {
        const o = {};
        for (const k of Object.keys(x)) { const nk = m(k), w = walk(x[k]); put(o, nk, own.call(o, nk) ? (typeof merge === 'function' ? merge(o[nk], w, nk) : w) : w); }
        return o;
      }
      return m(x);
    }
    return walk(v);
  }

  // ---------- 今日推薦集點卡（第 B 波 SPEC-B §4.3、§4.5；純函式，不碰 run／存檔，ui.js 呼叫）----------
  const idCmp = (a, b) => (a < b ? -1 : a > b ? 1 : 0);
  const aceIdsOf = content => new Set(Object.values((content && content.aces) || {}));
  // known／owned 的三種形狀：函式 id→bool、陣列、{id: 值}（known：有這格就算；owned：照 ownedFn，值是物件看 .own）
  function knownFn(x) {
    if (typeof x === 'function') return x;
    if (Array.isArray(x)) { const s = new Set(x); return id => s.has(id); }
    if (x && typeof x === 'object') return id => Object.prototype.hasOwnProperty.call(x, id) && !!x[id];
    return () => false;
  }
  // dailyPick(content, {day, known, owned, want, tunes}) -> id | null
  //   候選：非頂點、不在特價箱（新舊）、不是王牌、沒認識過（想要清單裡、還沒擁有的例外）。權重：想要清單 ×5、頻率在 tunes（最多 2 格）×3（兩個都中＝×15）、其他 ×1。
  //   挑法：每張 k＝hash01('daily#'+day+'#'+id)^(1/w)，取 k 最大的（Efraimidis–Spirakis；同分 id 小的）→ 同一天同一份唱片櫃＝同一張
  function dailyPick(content, o) {
    o = o || {};
    const cards = (content && content.cards) || {}, day = String(o.day || ''), known = knownFn(o.known), owned = ownedFn(o.owned);
    const want = new Set(Array.isArray(o.want) ? o.want : []), tunes = Array.isArray(o.tunes) ? o.tunes.slice(0, 2) : [];
    const bset = new Set(bargainIds(content)), aces = aceIdsOf(content);
    let best = null, bk = -1;
    for (const id of Object.keys(cards).sort()) {
      const c = cards[id];
      if (!c || c.tier || bset.has(id) || aces.has(id) || owned(id)) continue;
      const w0 = want.has(id);
      if (!w0 && known(id)) continue;                        // 認識過的不推；想要清單裡（還沒擁有）的照推
      const w = (w0 ? 5 : 1) * (c.tune != null && tunes.includes(c.tune) ? 3 : 1);
      const k = Math.pow(hash01('daily#' + day + '#' + id), 1 / w);
      if (k > bk) { bk = k; best = id; }
    }
    return best;
  }
  // dailyReward(content, {n, owned}) -> [ids]（最多 3 張）：集點卡第 n 次換獎勵的三選一。史詩（驗收：傳奇帶上場太好打、店裡不收＝主線 M2，
  //   換來的會當種子帶上場，所以不給傳奇）、非頂點、不在特價箱、不是王牌、沒擁有；
  //   經／冷／硬（topAttr）各一張，每色取 hash01('dailyReward#'+n+'#'+id) 最小的；某色沒有就從其他色剩下的照同一個雜湊補。跟日期無關（不能靠重開洗）
  function dailyReward(content, o) {
    o = o || {};
    const cards = (content && content.cards) || {}, n = o.n | 0, owned = ownedFn(o.owned);
    const bset = new Set(bargainIds(content)), aces = aceIdsOf(content);
    const pool = [];
    for (const id of Object.keys(cards)) {
      const c = cards[id];
      if (!c || c.tier || bset.has(id) || aces.has(id) || rarity(c) !== 'epic' || owned(id)) continue;
      pool.push({ id, a: topAttr(c), h: hash01('dailyReward#' + n + '#' + id) });
    }
    pool.sort((x, y) => x.h - y.h || idCmp(x.id, y.id));
    const out = [];
    for (const a of ATTRS) { const x = pool.find(p => p.a === a); if (x) out.push(x.id); }
    for (const x of pool) { if (out.length >= 3) break; if (!out.includes(x.id)) out.push(x.id); }
    return out.slice(0, 3);
  }
  // 舊存檔的貨對不上現在的箱子（v5 店面改版：改版前存的 run 有 pop、沒有 citypop／indierock／indiepop → 點了說「賣完了」）：
  //   載入時（ui.js loadSave 的 validRun 之後）只補缺的區、丟掉 content.bins 已經沒有（或只展示）的區；其他區原樣不動（這一輪可能已經買走幾張）。
  //   補的貨＝這一輪 restock 本來就會上的那幾張（同一個種子，拿一份暫時的 run 跑一次；不碰 run.rng），再扣掉別區已經有的、包包裡的
  //   → 同一份存檔每次載入補出來一樣。區的順序照 restock（SHOP_ORDER）。回傳 true＝有改。
  function fixBins(run, content) {
    const SH = run && run.shop;
    if (!SH || !SH.bins || typeof SH.bins !== 'object') return false;
    const B = content.bins || {};
    const keys = SHOP_ORDER.filter(k => B[k]).concat(Object.keys(B).filter(k => !SHOP_ORDER.includes(k)).sort()).filter(k => !B[k].display);
    const miss = keys.filter(k => !Array.isArray(SH.bins[k])), stale = Object.keys(SH.bins).filter(k => !keys.includes(k));
    if (!miss.length && !stale.length) return false;
    const bag = Array.isArray(run.bag) ? run.bag : [];
    let fresh = {};
    if (miss.length) {
      const tmp = { seedKey: run.seedKey, runNo: run.runNo, round: run.round, ace: run.ace, bag: bag.slice(), relics: (run.relics || []).slice(), want: [] };
      fresh = restock(tmp, content).bins;
    }
    const have = new Set(keys.filter(k => !miss.includes(k)).flatMap(k => SH.bins[k]));
    const bins = {};
    const radioId = SH.radio && SH.radio.id;            // 收音機這輪抽到、擺在特價箱的那張：補的區不再上它
    for (const k of keys) bins[k] = miss.includes(k) ? (fresh[k] || []).filter(id => !have.has(id) && !bag.includes(id) && id !== radioId) : SH.bins[k];
    SH.bins = bins;
    return true;
  }
  // 舊存檔停在「開局特價箱還沒挑」（canBargainPick：序章 O13 之前、或再挑戰一趟特價區挑到一半），箱子擺的還是換下來的舊特價箱
  //   （content.bargain.retired，或任何已經不在 pool 的卡；店主 11-16 換牌：每張最高星 ≤3、三軸加起來 ≤5）→ 載入時（ui.js loadSave，fixBins 之後）
  //   用現在的池子重擺：＝這一輪 restock 本來就會擺的那 6 張（同一個種子，拿一份暫時的 run 跑一次；不碰 run.rng），扣掉包包裡的 → 同一份存檔每次載入一樣。
  //   只管還沒挑的開局三張（免費）；挑過了（之後每輪要買）舊牌照特價賣到這一輪結束，下一輪 restock 自然換新。回傳 true＝有改
  function fixBargain(run, content) {
    const SH = run && run.shop;
    if (!SH || !Array.isArray(SH.bargain) || !Array.isArray(run.bag) || !canBargainPick(run)) return false;
    const pool = ((content && content.bargain) || {}).pool || [];
    if (SH.bargain.every(id => pool.includes(id))) return false;
    const tmp = { seedKey: run.seedKey, runNo: run.runNo, round: run.round, ace: run.ace, bag: run.bag.slice(), relics: (run.relics || []).slice(), want: [] };
    SH.bargain = restock(tmp, content).bargain.slice();
    return true;
  }
  function current(run, content) {
    if (run.duel && run.duelEnemy) return run.duelEnemy;
    if (run.pending && run.pending.enemyId) return run.pending.enemyId;
    return run.prologue === 'pending' ? ((content && content.prologueEnemy) || 'man') : run.order[run.idx];
  }
  function nextStep(run) {
    if (run.pending) return ['reward', 'level', 'stall', 'draft'].includes(run.pending.type) ? run.pending.type : 'retry';   // 第 C 波多 stall（今天的攤位）、draft（中繼點開局選秀）
    if (run.over) return null;
    if (run.duel) return 'duel';
    return run.prologue === 'pending' ? 'prologue' : 'fight';
  }
  // 這一位的客人設定（畫面的來客那排、shopPolicy、startFight 共用）
  //   主屬性（第 A 波 6）：mainAt（這一輪三色都有）→ trialDeck 照它組牌；第 run.mainFrom 位以前不帶（fixMain：升版前那一輪照舊牌組）；稱號：guestTitle（藏家、跟名字一樣＝null）
  function guestDef(run, content, id, pos) {
    const main = pos >= (run.mainFrom || 1) ? mainAt(run, content, pos) : null;
    const rd = run.retryDeck, deckIds = rd && rd.pos === pos && rd.id === id && Array.isArray(rd.ids) ? rd.ids : null;   // 升版前的舊 run（pinOldDeck）
    const d = enemyDef(content, id, { pos, cls: classAt(pos), seedKey: run.seedKey, runNo: run.runNo, playerAce: run.ace, bossAce: run.bossAce, bossCard: run.bossCard, tier: run.tier, main, deckIds });
    if (run.dare && run.dare.round === roundOf(pos)) {           // 第 C 波踢館帖（SPEC-C §5.4）：接了的那一輪 5 位，狠角色品味 +1／耐打聲望 +4；d.dare＝來客條、對決頭上的記號
      const D = wcCfg(content).stall.dare[run.dare.mode] || {};
      d.atk += D.atk | 0; d.hp += D.hp | 0; d.dare = run.dare.mode;
    }
    if (run.fac) { const FA = facGuestAdd(run, content, pos); d.hp += FA.hp; d.atk += FA.atk; }   // 第 D 波棒三：?fac=1 那一趟的客人（content.factions.guest；只在 run.fac，旗標關一行不走）
    return d;
  }
  // ?fac=1 那一趟第 pos 位的客人多幾（content.factions.guest 的 hpSteps／atkSteps；[[第幾位起, +n]…] 累加）→ {hp, atk}；沒有 run.fac＝{0, 0}。
  //   guestDef 用；活店切磋（encDef，另一支 worktree）合併時也要加這兩個數（棒三審查：切磋客人不走 guestDef，會比主線同位的一般客人弱）
  function facGuestAdd(run, content, pos) {
    const FG = run && run.fac && facCfg(content) ? facCfg(content).guest : null;
    if (!FG) return { hp: 0, atk: 0 };
    const st = L => (Array.isArray(L) ? L : []).reduce((t, x) => t + (Array.isArray(x) && pos >= (x[0] | 0) ? (x[1] | 0) : 0), 0);
    return { hp: st(FG.hpSteps), atk: st(FG.atkSteps) };
  }
  // 第 B 波升版（存檔 v4–6 → v7）：卡池從舊 323 張變 5,000 張、id 換成 catalogId，同一位重組會換牌。停在「待說情」或「打到一半的對決」的舊 run，
  //   說情重打要拿到原本那副牌（45 行「同一位、同一副牌」）→ 載入時（ui.js loadSave，換完 id 之後）用「只有舊卡、鍵改回舊 slug」的 content 視圖
  //   跑一次 guestDef，把選出的牌單（catalogId）釘在 run.retryDeck {pos, id, ids}；guestDef 同一位、同一人就照它（加星、王牌照舊算）；advance／jumpTo 換位就拿掉
  //   legacyView(content, L)：L＝{舊 slug: catalogId}（C.legacyIds()）。oldDeckIds(run, content, L, id, pos) -> [catalogId] | null（舊碼的 guestDef 會選出的牌）
  function legacyView(content, L) {
    const rev = {}; for (const k of Object.keys(L)) if (typeof L[k] === 'string') rev[L[k]] = k;
    const back = id => (typeof id === 'string' && Object.prototype.hasOwnProperty.call(rev, id)) ? rev[id] : id;
    const cards = {}, enemies = {}, aces = {};
    for (const k of Object.keys(L)) { const c = content.cards && content.cards[L[k]]; if (c) cards[k] = Object.assign({}, c, { id: k }); }
    for (const k of Object.keys(content.enemies || {})) { const E = content.enemies[k]; enemies[k] = Object.assign({}, E, { deck: (E.deck || []).map(back) }); }
    for (const t of Object.keys(content.aces || {})) aces[t] = back(content.aces[t]);
    return { V: Object.assign({}, content, { cards, enemies, aces }), back };
  }
  function oldDeckIds(run, content, L, id, pos) {
    if (!run || !L || typeof L !== 'object' || !content || !content.enemies || !content.enemies[id]) return null;
    try {
      const { V, back } = legacyView(content, L);
      const r = Object.assign({}, run, { bossCard: back(run.bossCard), retryDeck: null });
      const ids = guestDef(r, V, id, pos).deck.map(c => (Object.prototype.hasOwnProperty.call(L, c.id) ? L[c.id] : c.id));
      return ids.length && ids.every(x => content.cards[x] && !content.cards[x].tier) ? ids : null;
    } catch (_) { return null; }
  }
  function pinOldDeck(run, content, L) {
    if (!run || typeof run !== 'object' || run.prologue === 'pending' || !Number.isInteger(run.pos) || run.pos < 1) return false;
    const p = run.pending;
    const id = run.duel ? (run.duelEnemy || (run.duel.e && run.duel.e.id)) : (p && p.type === 'retry' && p.pos != null ? p.enemyId : null);
    const ids = id ? oldDeckIds(run, content, L, id, run.pos) : null;
    if (!ids) return false;
    run.retryDeck = { pos: run.pos, id, ids };
    return true;
  }
  // 主屬性以前（v72／v75 上線版）存的進行中 run 沒有 run.mainFrom（合併審查 11-16）：guestDef 一律帶主屬性的話 trialDeck 會照主屬性重組牌組，
  //   輸了說情重打就不是同一副牌（fixUnlock 只保住藏家那張王牌，其他 6 張照樣換）。載入時（ui.js loadSave）補上：
  //   這一輪已經有客人上場過（打過第 1 位以後、打到一半、輸了等說情、打完在領獎／升級）＝這一輪照舊、下一輪第 1 位起才帶；還沒人上場（序章、特價箱、第 1 位開打前）＝馬上帶。
  //   打到一半的那場已經帶 e.main（主屬性以後的版本開打的；舊版的對決狀態沒有這欄）＝照主屬性的牌，馬上帶。回 true＝有改（newRun 本來就是 1）
  function fixMain(run) {
    if (!run || typeof run !== 'object' || Number.isInteger(run.mainFrom) || !Number.isInteger(run.pos)) return false;
    const e = run.duel && run.duel.e, withMain = !!(e && Object.prototype.hasOwnProperty.call(e, 'main'));
    const met = !withMain && (run.idx > 0 || !!(run.duel && run.prologue !== 'pending') || !!(run.pending && run.pending.pos != null));
    run.mainFrom = met ? roundOf(run.pos) * PER_ROUND + 1 : 1;
    return true;
  }
  // 開局參數（主線 startFight、切磋 encStart 共用的單一入口；活店第二階段 SPEC-H §7.4「你這一邊走 fightSetup」）——從 startFight 抽出來，行為逐字不變（sim LS0）。
  //   fightSetup(run, content, o) -> { pDef, eDef, opts }：只讀 run、不寫（主線那幾個寫回 run 的動作留在 startFight）。之後「每輪挑 5 張上場」（第 I 波 I-2）只改這裡。
  //   o：eDef（他：guestDef／enemyDef／encDef 組好的，原樣回傳）、seed（對決種子）、prologue（序章那場）、tut（教學劇本）、apex（頂點卡試做）、
  //      encore（false＝這場沒有翻面）、encCarry（上一場留下來的 {give}；startFight 從 run.encCarry 拿、切磋不給）、
  //      hp（短局：你這一邊的聲望＝上限＝hp；沒給＝照 run.hp／run.maxHp）
  //   你這一邊（包包、王牌／頂點卡、配件、品味、底氣、〔D〕三流派被動與本派選項、〔I〕翻面）全部照 run 組，主線、切磋一模一樣
  function fightSetup(run, content, o) {
    o = o || {};
    const eDef = o.eDef, prologue = !!o.prologue;
    const opts = { seed: o.seed, hintTable: hintTableOf(content) };
    if (Array.isArray(run.hintSeen)) opts.hintSeen = run.hintSeen;   // 11-17：這一趟看過的提示句（舊存檔沒有＝空）
    const apex = !!o.apex && !prologue && !!apexCfg(content);   // 頂點卡試做：序章那場照舊 7 星教學
    if (apex) opts.apex = true;
    if (eDef.ace) opts.enemyAce = eDef.ace;
    else if (eDef.boss && (run.bossCard || run.bossAce)) opts.enemyAce = cardFrom(content, run.bossCard || content.aces[run.bossAce]);
    if (o.tut && content.tutorial.script) opts.script = content.tutorial.script[run.ace] || null;
    const fac = !!run.fac && !prologue && !!facCfg(content);   // 第 D 波棒二三流派：照 run.fac（不看網址，R-F9）；序章那場沒有，第 1 位客人起生效
    // 第 I 波翻面：主線對決自動有（序章、o.encore false＝切磋沒有；content.encore.on false＝沒有）
    const enc = !prologue && o.encore !== false && !!encCfg(content);
    if (enc) { opts.encore = true; if (o.encCarry && typeof o.encCarry === 'object') opts.encCarry = { give: o.encCarry.give }; }
    // 第 I 波 I-2：上場制那幾輪＝包包換成這一輪上場那幾張（lineupOf）；耐聽開著＝唱片換成聽膩後的拷貝（wornCard；主線、切磋、說情重打都吃）；
    //   o.wear＝這場要記出牌次數（startFight 決定：上場制那幾輪、這一位第一場；切磋不給＝不耗耐聽）
    const lu = !prologue && lineupOn(run) && luRound(run), wr = !prologue && wearOn(run);
    if (wr && o.wear) opts.wear = true;
    if (lu) opts.lineup = true;
    const po = apex || fac || enc || wr ? Object.assign(apex ? { apex: true } : {}, fac ? { fac: true } : {}, enc ? { encore: true } : {}, wr ? { wear: true } : {}) : undefined;
    let src = Number.isInteger(o.hp) && o.hp > 0 ? Object.assign({}, run, { hp: o.hp, maxHp: o.hp }) : run;
    if (lu) src = Object.assign({}, src, { bag: lineupOf(run, content) });
    return { pDef: playerDef(content, src, po), eDef, opts };
  }
  function startFight(run, content, o) {
    o = o || {};
    if (run.duel) return { duel: run.duel, events: [], enemyId: run.duelEnemy || run.duel.e.id, resumed: true };   // a saved fight in progress (or over but not finished)
    if (run.over || run.pending) return null;
    const enemyId = current(run, content);
    if (!enemyId) return null;
    const prologue = run.prologue === 'pending';
    const tut = !!o.tutorial && prologue && !!content.tutorial;
    const eDef = prologue ? enemyDef(content, enemyId, { tutorial: tut }) : guestDef(run, content, enemyId, run.pos);
    const seed = (Math.floor(rng(run) * 4294967296) >>> 0) || 1;
    if (!Number.isInteger(run.hp) || run.hp < 1) run.hp = run.maxHp || CFG.playerHp;
    run.hpIn = run.hp;                                        // 說情重打從這裡開始（裁定 8）
    if (!prologue) run.fought = true;                          // 跟客人開打過：之後這一趟不能再換王牌（canSwitchAce）
    // 第 I 波翻面：吃掉上一場留下來的 run.encCarry（說情重打也算下一場）；這場沒有翻面（序章、o.encore false、關掉）就不讀不清
    const enc = !prologue && o.encore !== false && !!encCfg(content);
    const carry = enc && run.encCarry && typeof run.encCarry === 'object' ? { give: run.encCarry.give } : null;
    if (enc && 'encCarry' in run) run.encCarry = null;
    // 第 I 波 I-2 耐聽：上場制那幾輪、這一位第一場（run.wearPos 記著；說情重打＝同一位第二場不算）才記出牌次數；這一輪上場打過的移出 rested（坐板凳＝整輪沒上場）
    let wearNow = false;
    if (!prologue && (lineupOn(run) || wearOn(run)) && luRound(run)) {
      if (lineupOn(run) && run.wearPos !== run.pos) luAutoBench(run, content);   // 備案 'worn'：上場那張聽膩、替補比它新鮮＝自動頂上（說情重打照同一副，不換）
      if (wearOn(run) && run.wearPos !== run.pos) { wearNow = true; run.wearPos = run.pos; }
      if (Array.isArray(run.rested) && run.rested.length) { const L = lineupOf(run, content); run.rested = run.rested.filter(id => !L.includes(id)); }
    }
    const F = fightSetup(run, content, Object.assign({ eDef, seed, prologue, tut, apex: o.apex, encore: o.encore, encCarry: carry }, wearNow ? { wear: true } : {}));
    const r = startDuel(F.pDef, F.eDef, F.opts);
    run.duel = r.duel; run.duelEnemy = enemyId;
    return { duel: r.duel, events: r.events, enemyId };
  }
  // 升級：經驗滿「目前等級＋3」升一級；每升一級聲望上限 +1、現有聲望也 +1，再三選一（levelUps 記還沒選的次數）
  //   第 D 波樂歷「局內經驗」（run.xpMul＝1＋0.1×級）：每次 n×xpMul，零頭累積在 run.xpFrac（10 場 2 經驗 ×1.2＝24）
  //   第 I 波 I-0（SPEC-I §7.2；店主 11-20「第一輪就要讓玩家升級 局內升級也是」）：Lv1→2 只要 firstNeed（2＝打贏第 1 位就升；全贏 Lv2 第 1 位、Lv3 第 4 位、Lv4 第 5 位），
  //   之後照舊「等級＋levelNeed」；第一級不自動加聲望上限（firstHp 0）＝抵銷第一位升級讓前期變簡單（SPEC-I 附錄 Z5；q.easy 不動）。
  //   firstNeed 0／沒給＝舊規則；firstHp 不是非負整數＝照 levelHp。畫面的經驗條、選秀（choose draft）都用這兩個
  function xpNeed(T, level) { return (level | 0) <= 1 && T.firstNeed > 0 ? T.firstNeed | 0 : (level | 0) + T.levelNeed; }
  function levelHpAt(T, level) { return (level | 0) <= 1 && Number.isInteger(T.firstHp) && T.firstHp >= 0 ? T.firstHp : T.levelHp; }
  function gainXp(run, T, n) {
    if (run.xpMul > 1) { const x = n * run.xpMul + (+run.xpFrac || 0); n = Math.floor(x + 1e-9); run.xpFrac = Math.max(0, round6(x - n)); }
    run.xp += n; let ups = 0;
    while (run.xp >= xpNeed(T, run.level)) { const h = levelHpAt(T, run.level); run.xp -= xpNeed(T, run.level); run.level++; run.maxHp += h; run.hp += h; run.levelUps++; ups++; }
    return ups;
  }
  function finishFight(run, content, duel) {
    duel = duel || run.duel;
    if (!duel || !duel.over) return { error: 'notOver' };
    const enemyId = run.duelEnemy || duel.e.id;
    const E = content.enemies[enemyId] || {};
    const S = run.stats, win = duel.over.win, T = trialCfg(content, run.tier);
    if (Array.isArray(duel.hintSeen)) run.hintSeen = duel.hintSeen.slice(-HINT_SEEN_MAX);   // 11-17：這場抽到的提示句接上去（輸了說情重打也算看過）
    const prologue = run.prologue === 'pending' && enemyId === (content.prologueEnemy || 'man');
    const cls = prologue ? 'prologue' : classAt(run.pos), pos = run.pos;
    S.fights++; S.hands += duel.stats.hands;
    const met = uniq(duel.e.thrown.map(c => c.id));
    for (const id of met) if (!S.met.includes(id)) S.met.push(id);
    run.duel = null; run.duelEnemy = null;
    // 第 I 波 I-2 耐聽：這場要算（duel.wearOn）＝出牌次數先記進 run.wear（在領獎、換輪之前）；新聽膩的給領獎畫面（out.effects {t:'worn', id, n}；還在領獎＝pending.worn 也記一份，重新整理照畫）
    const worn = duel.wearOn && duel.p.plays && wearOn(run) ? wearRecord(run, content, duel.p.plays) : null;
    const pleaUp = run.pleaUp | 0; if ('pleaUp' in run) delete run.pleaUp;   // 第 D 波棒三「老客人的面子」這場加了幾（choose retry 記；打完就清）
    let earn = 0, heal = 0, ups = 0, aceWon = null, aceFirst = false, aceNew = false, aceUnlock = null, extra = null, lowHeal = 0, deepHeal = 0;
    if (duel.p.fac && duel.stats.fac) { if (!S.fac || typeof S.fac !== 'object') S.fac = {}; S.fac.fights = (S.fac.fights | 0) + 1; for (const k of Object.keys(duel.stats.fac)) S.fac[k] = (S.fac[k] | 0) + duel.stats.fac[k]; }   // 第 D 波棒二：一趟的派別觸發累計（run.stats.fac；sim、上線後記）
    if (win) {
      S.wins++;
      earn = Math.max(0, econ(content).win[cls] | 0);
      if (run.payMul > 1) earn = Math.round(earn * run.payMul);   // 第 D 波樂歷「酬勞」：打贏的錢 +10%／級
      run.money += earn; S.earned += earn;
      if (prologue) {
        run.prologue = 'done';
        run.hp = run.maxHp;                                   // 裁定 1：序章打完聲望回滿，第 1 位從滿血開始
        const cards = (E.drop ? [E.drop] : []).filter(id => !run.bag.includes(id) && content.cards[id]);
        const relics = (((content.rewards || {}).prologueRelics) || []).filter(id => !run.relics.includes(id));
        run.pending = { type: 'reward', enemyId, prologue: true, cards, relics, need: 'cardThenRelic', cardDone: !cards.length, relicDone: !relics.length };
        // 男子掉的 Eminem 在他牌組裡、也打出來過（店主 11-13）＝客人掉落，給一趟留一張
        if (!Array.isArray(run.drops)) run.drops = [];
        for (const id of cards) if ((E.deck || []).some(c => (c && c.id || c) === id) && !run.drops.includes(id)) run.drops.push(id);
      } else {
        S.beaten++;
        let winHeal = duel.apexMode && apexCfg(content) && Number.isInteger(apexCfg(content).winHeal) ? apexCfg(content).winHeal : T.heal;   // 頂點卡試做：回 winHeal
        if (T.healAdd || (T.healAddNormal && cls === 'normal')) winHeal = Math.max(0, winHeal + (T.healAdd | 0) + (cls === 'normal' ? T.healAddNormal | 0 : 0));   // 第 D 波棒三試煉階級「小氣」（add:{healAdd:−1}；§14-5 備案 healAddNormal＝只有一般客人）：兩種模式都少回（SPEC-D §5.2、CRITIQUE 2.2）
        if (duel.p.fac && duel.p.fx && duel.p.fx.lowHeal > 0 && duel.p.hp * 2 < duel.p.max) { lowHeal = duel.p.fx.lowHeal | 0; winHeal += lowHeal; }   // 第 D 波棒二 冷門「熟客」：聲望不到一半時打贏多回
        if (duel.p.fac && duel.p.fx && duel.p.fx.lowHealQ > 0 && duel.p.hp * 3 < duel.p.max) { lowHeal += duel.p.fx.lowHealQ | 0; winHeal += duel.p.fx.lowHealQ | 0; }   // 棒三審查派樹「撐住」：聲望不到三分之一時打贏多回（跟熟客疊）
        if (duel.p.fac && duel.p.fx && duel.p.fx.deep > 0) {      // 第 D 波棒三派樹「深耕」（口碑／識破／破例）
          const D = deepNow(duel.p);                               //   carry＝跨場累積：記滿 per 手、打贏那場多回 1（棒三審查：一場最多 3 手，舊的「一場記到 2k 手」第 2、3 級永遠用不到）；沒 carry＝舊規則（這一場 min(級, ⌊手數÷per⌋)）
          deepHeal = D.got;
          if (D.carry) deepKeep(run, D.left);
          if (deepHeal > 0) { winHeal += deepHeal; if (S.fac && typeof S.fac === 'object') S.fac.deep = (S.fac.deep | 0) + deepHeal; }
        }
        run.hp = Math.min(run.maxHp, Math.max(1, duel.p.hp) + winHeal);   // 打贏回 3（不超過上限）
        heal = run.hp - Math.max(1, duel.p.hp);
        ups = gainXp(run, T, T.xp[cls] | 0);
        run.streak++; if (run.streak > run.bestStreak) run.bestStreak = run.streak;
        if (cls === 'boss' && run.unlock) {                   // 解鎖制：他這場真的帶的那張（每輪可以不同）；這一趟每張新卡各算一次「收了」
          const won = bossWonCard(run, content, duel);
          if (won) {
            const tiers0 = unlockTiersOf(run, content), had = ownedApexOf(run, content).includes(won), t = tierOfApex(content, won);
            if (!Array.isArray(run.acesWon)) run.acesWon = [];
            aceWon = won; aceFirst = !run.acesWon.includes(won); aceNew = aceFirst && !had;
            aceUnlock = aceFirst && t && !tiers0.includes(t) ? t : null;
            if (aceFirst) { run.acesWon.push(won); run.taken++; }
            run.aceWon = true;
          }
        } else if (cls === 'boss' && content.aces && content.aces[run.bossAce]) {
          aceWon = content.aces[run.bossAce];                 // 藏家的王牌收進唱片櫃（畫面做；同一張每輪都送，只算一次「收了」）
          aceFirst = !run.aceWon;
          if (!run.aceWon) { run.aceWon = true; run.taken++; }
        }
        let cards = met.filter(id => content.cards[id] && !content.cards[id].tier && !run.bag.includes(id));
        // 第 C 波（SPEC-C §3.3、§3.4）：一般／菁英＝戰利品列（三張蓋牌）、藏家＝寶箱（踢館帖那輪撐完四張＋$5,000）；候選換成翻出來的那幾張。
        //   藏家頂點卡（上面 bossWonCard／acesWon）一行不動；寶箱、戰利品列都不放頂點卡
        const W = wcCfg(content), dareWon = cls === 'boss' && !!run.dare && run.dare.round === run.round;
        if (cls === 'boss' && W.chest.on) {
          extra = chestRow(run, content, duel, met, pos, dareWon); extra.kind = 'chest'; cards = extra.cards;
          if (dareWon) { wcEarn(run, 'dare', W.chest.dareCash); wcStats(run).dareWon++; extra.dareCash = W.chest.dareCash; }
        } else if (cls !== 'boss' && W.loot.on) { extra = lootRow(run, content, duel, met, pos, cls, earn); extra.kind = 'loot'; cards = extra.cards; }
        // 客人掉落（SPEC 從唱片櫃挑牌開局 §1 裁定 6、7）：獎勵候選＝他這一場真的丟過的（trialDeck 換牌、加星後那一副；王牌不掉）；沒拿的也記，給一趟留一張
        //   第 C 波開著：＝戰利品列／寶箱翻出來的那幾張（SPEC-C §6「從抽到或對方掉落的專輯裡帶走 1 片」）
        if (!Array.isArray(run.drops)) run.drops = [];
        for (const id of cards) if (!run.drops.includes(id)) run.drops.push(id);
        let relics = [];
        if (cls === 'elite' || cls === 'boss') {
          const pool = (((content.rewards || {}).relicPool) || Object.keys(content.relics || {})).filter(id => relicOk(content, id) && !run.relics.includes(id));
          // 第 D 波樂歷 Lv10（run.relicPick 3）：三選一＝照 run.rng 依序抽不重複的幾件；1 件時跟原本同一個亂數、同一件
          if (pool.length) { const left = pool.slice(), n = Math.min(left.length, run.relicPick > 1 ? run.relicPick | 0 : 1); for (let i = 0; i < n; i++) { const x = pickOne(left, run); relics.push(x); left.splice(left.indexOf(x), 1); } }
        }
        run.pending = { type: 'reward', enemyId, prologue: false, pos, cls, cards, relics, need: relics.length ? 'cardOrRelic' : 'card', cardDone: !cards.length, relicDone: !relics.length, aceWon };
        if (extra) Object.assign(run.pending, { kind: extra.kind, src: extra.src, gold: extra.gold, packet: extra.packet || null, apexSlot: extra.apexSlot || [],
          skipCash: extra.kind === 'chest' ? W.chest.skipCash : W.loot.skipCash, dare: dareWon });
      }
      settle(run, content);
    } else {
      if (!prologue) run.streak = 0;
      if (pleaUp) run.hpIn = Math.max(1, run.hpIn - pleaUp);   // 棒三審查：說情重打那場加的「老客人的面子」不算進開打前（choose retry 從 hpIn 起算），再說情才不會疊
      run.hp = run.hpIn;                                      // 輸了不寫回：說情從開打前的聲望重打
      if (duel.p.fac && duel.p.fx && duel.p.fx.deepCarry) deepKeep(run, deepNow(duel.p).acc);   // 深耕跨場累積：輸的那場記到的手也算（下一場打贏才回）
      if (prologue) run.pending = { type: 'retry', enemyId, free: true };
      else if (run.safety && pos === 1) { run.safety = false; wcStats(run).safety++; run.pending = { type: 'retry', enemyId, free: true, safety: true, pos }; }   // 第 C 波新手保底：第 1 位輸了免費重打一次（不吃說情）
      else if (run.retryLeft > 0) run.pending = { type: 'retry', enemyId, free: false, pos };
      else if (run.plea > 0) run.pending = { type: 'retry', enemyId, free: false, pos, plea: true };   // 第 D 波樂歷「備用說情」：這一輪的說情用完才用、這一趟一次、不每輪補（SPEC-D §2.7）
      else {
        run.over = 'dead';
        S.lostAt = { enemyId, pos, round: run.round, idx: run.idx, cls, n: duel.n, last: duel.last };
      }
    }
    let encCarry = null;
    if (duel.p.enc) {                                         // 第 I 波安可：這場留下來的（只有打過有安可的對決才寫 run.encCarry；一趟結束清掉）＋一趟的計數（sim 讀）
      encCarry = !prologue && !run.over && duel.over.encCarry && ENC_GIVE.includes(duel.over.encCarry.give) ? { give: duel.over.encCarry.give } : null;
      run.encCarry = encCarry;
      const SE = S.enc && typeof S.enc === 'object' ? S.enc : (S.enc = { fights: 0, lit: 0, carryIn: 0, carryOut: 0, used: 0 }), de = duel.stats.enc || {};
      SE.fights++; for (const k of ['lit', 'carryIn', 'carryOut', 'used']) SE[k] = (SE[k] | 0) + (de[k] | 0);
    }
    if (worn || Array.isArray(run.wornLate)) {                 // 第 I 波 I-2 領獎小字（pending.worn）；修正棒 11-22：輸了等說情＝先記 run.wornLate，重打贏了一起寫進領獎
      const pd = run.pending, all = [];
      for (const x of (Array.isArray(run.wornLate) ? run.wornLate : []).concat(worn || [])) {
        if (!x || !run.bag.includes(x.id)) continue;
        const k = all.findIndex(y => y.id === x.id); if (k >= 0) all[k].n = Math.max(all[k].n, x.n | 0); else all.push({ id: x.id, n: x.n | 0 });
      }
      if (pd && pd.type === 'retry') { if (all.length) run.wornLate = all; }
      else { if (all.length && pd && pd.type === 'reward' && !pd.prologue) pd.worn = all; delete run.wornLate; }
    }
    const out = { win, by: duel.over.by, enemyId, met, offer: run.pending, over: run.over, earn, pos, cls, heal, levelUps: ups, aceWon, aceFirst, aceNew, aceUnlock };
    if (worn) out.effects = worn.map(x => ({ t: 'worn', id: x.id, n: x.n }));
    if (duel.p.enc) out.encCarry = encCarry;
    if (extra) out.packetCash = extra.packet && extra.packet.kind === 'cash' ? extra.packet.n : 0;   // 第 C 波：紅包那筆（已入帳；畫面 cashAfter 起點要扣回、再演第二段）
    if (extra && extra.kind === 'chest' && extra.dareCash) out.dareCash = extra.dareCash;
    if (lowHeal) out.lowHeal = lowHeal;                      // 第 D 波棒二：熟客多回的那幾點（已含在 heal 裡；畫面可以補一句）
    if (deepHeal) out.deep = deepHeal;                       // 第 D 波棒三：深耕多回的那幾點（已含在 heal 裡；C.factions.ui.deepWin）
    return out;
  }
  // 獎勵收完：有升級就先選（連升就連選），選完才到下一位
  function settle(run, content) {
    const p = run.pending;
    if (!p || p.type !== 'reward' || !p.cardDone || !p.relicDone) return;
    if (!p.prologue && run.levelUps > 0) { run.pending = null; run.pending = { type: 'level', enemyId: p.enemyId, pos: p.pos, level: run.level - run.levelUps + 1, offer: levelOffer(run, content) }; return; }
    advance(run, p, content);
  }
  // 三選一：固定照 品味→底氣→聲望上限 的順序（店主 11-20：「三項升級不要選項一直跳動 就照品味底氣聲望這個順序固定」；原本第一格照雜湊在品味、底氣之間換）
  //   第 D 波棒二（run.fac）：要選的那一級（level − levelUps＋1）逢 levelEvery（Lv5、10、15…）多第 4 格本派 {pick:'fac', id}（佔那一級：拿了不加屬性，聲望上限 +1 照加）；
  //   o.draft（中繼點選秀）不出本派格（SPEC-D §3.5、CRITIQUE 2.1；跳過的不補發：R-F11）
  function levelOffer(run, content, o) {
    if (run.pending && run.pending.type === 'level' && Array.isArray(run.pending.offer)) return run.pending.offer.map(x => Object.assign({}, x));
    const T = trialCfg(content, run.tier);
    const out = ['atk', 'def', 'hp'].map(pick => ({ pick, n: T.picks[pick] | 0 }));
    if (run.fac && !(o && o.draft)) {
      const F = facCfg(content), lv = (run.level | 0) - (run.levelUps | 0) + 1;
      if (F && F.occupy !== false && facDue(run, content, lv)) {
        const P2 = facTalHas(run, content, 'pick2'), nth = P2 ? (P2.nth > 0 ? P2.nth | 0 : P2.once ? 1 : 0) : 0;   // 棒三派樹「挑著學」：出兩個（nth＝只有這一趟第 nth 次本派格；once＝第 1 次；都沒寫＝每次）
        const two = !!P2 && (!nth || (run.picks || []).filter(x => String(x).startsWith('fac:')).length === nth - 1);
        out.push(...facOffer(run, content, lv).slice(0, two ? 2 : 1));
      }
    }
    return out;
  }
  // 下一位（第 5 位打完：新一輪的 5 位、說情重設、商店補貨）；走到中繼點那一位就記（SPEC §0「走到就記」）
  function advance(run, p, content) {
    run.pending = null;
    if (p && p.prologue) return;
    delete run.retryDeck;
    run.pos++;
    if (isCheckpoint(run.pos, content) && !run.checkpoints.includes(run.pos)) run.checkpoints.push(run.pos);
    run.idx = (run.pos - 1) % PER_ROUND;
    if (run.idx === 0) {
      const prev = run.order;
      run.round = roundOf(run.pos);
      run.order = roundOrder(content, run.seedKey, run.runNo, run.round, prev);
      run.retryLeft = trialCfg(content, run.tier).retry;
      if (run.unlock) run.bossCard = bossCardFor(run, content);   // 解鎖制：新一輪的藏家帶哪張（上一輪收到的已經算進 run.acesWon）
      restock(run, content);
      // 第 C 波（SPEC-C §3.4）：上一輪的踢館帖、算命作廢；攤位在換輪（補貨、一檔貨換檔）之後、這一輪第 1 位之前
      if (run.dare && run.dare.round < run.round) run.dare = null;
      if (run.fortune && run.fortune.pos < run.pos) run.fortune = null;
      if (lineupOn(run) || wearOn(run)) luNewRound(run, content);   // 第 I 波 I-2：坐板凳回滿、這一輪重挑上場（攤位那一步／lineupDue）
      if (wcCfg(content).stall.on) stallSession(run, content);
    } else if (run.shop && lotCfg(content).on) {               // 一檔貨：每位客人之間從這一檔換下一批上架（沒有檔／不是這一輪的＝先 fixLot）
      if (!lotOk(run, content)) fixLot(run, content);
      shelve(run, content);
    }
  }
  // ?debug=1 的 __lab：直接跳到第 n 位（序章算完成、特價箱算挑過；聲望、等級不動；不記中繼點＝不是走到的）
  function jumpTo(run, content, pos) {
    pos = Math.max(1, pos | 0);
    run.duel = null; run.duelEnemy = null; run.pending = null; run.over = null; delete run.retryDeck;
    if (run.prologue === 'pending') run.prologue = 'done';
    if (run.shop) run.shop.bargainPicked = true;
    run.pos = pos; run.round = roundOf(pos); run.idx = (pos - 1) % PER_ROUND;
    run.order = roundOrder(content, run.seedKey, run.runNo, run.round, null);
    run.retryLeft = trialCfg(content, run.tier).retry;
    if (!Number.isInteger(run.hp) || run.hp < 1) run.hp = run.maxHp;
    if (run.unlock) run.bossCard = bossCardFor(run, content);
    restock(run, content);
    if (run.shop && run.shop.lot) for (let i = 0; i < run.idx; i++) shelve(run, content);   // 一檔貨：沒買東西時＝正常走到這一位的架子
    if (lineupOn(run) || wearOn(run)) luNewRound(run, content, { noRest: true });   // 第 I 波 I-2：上場制那幾輪＝lineupDue（來客畫面開面板）；跳的不算坐板凳
    return run;
  }
  // 這一輪 5 位（來客那排）：{id, pos, cls, hp, atk, def, hasAce, done, cur, title, main}
  //   title＝要顯示的稱號（guestTitle：藏家、跟名字一樣＝null）；main＝主屬性 'c'|'o'|'h'（「常出：冷門」＝C.trial.ui.mainAttr 代入 ZH[main]）
  function roundGuests(run, content) {
    const p = run.pending, beat = !!(p && (p.type === 'reward' || p.type === 'level') && !p.prologue);
    const first = (run.round - 1) * PER_ROUND + 1;
    return (run.order || []).map((id, i) => {
      const pos = first + i, g = guestDef(run, content, id, pos);
      const skip = run.cpFrom > 1 && pos < run.cpFrom;              // 第 C 波：中繼點開局，這一輪在第 N 位之前的那幾位這一趟沒遇到（不算打完）
      const x = { id, pos, cls: classAt(pos), hp: g.hp, atk: g.atk, def: g.def, hasAce: !!g.ace || (classAt(pos) === 'boss' && !!run.bossAce),
        done: !skip && (i < run.idx || (i === run.idx && beat)), cur: i === run.idx, title: g.title || null, main: g.main || null };
      if (skip) x.skip = true;
      if (g.dare) x.dare = g.dare;                                // 第 C 波：接了踢館帖的這一輪（'tough'｜'tank'）
      if (run.fortune && run.fortune.pos === pos) x.fortune = run.fortune;   // 第 C 波：算命看過的這一輪藏家（三色比例＋王牌）
      return x;
    });
  }
  // 結算：走到第幾位、最多連贏幾位、收了幾張
  function runSummary(run) {
    const S = run.stats || {};
    return { reached: run.pos | 0, bestStreak: run.bestStreak | 0, taken: run.taken | 0, wins: S.beaten | 0, level: run.level | 0, checkpoints: (run.checkpoints || []).slice(), kept: run.kept || null,
      ...(run.unlock ? { aces: (run.acesWon || []).slice() } : {}),   // 解鎖制：這一趟收的頂點卡（舊 run 不多這個鍵）
      from: run.cpFrom > 1 ? run.cpFrom : 1,                      // 第 C 波：這一趟從第幾位開始（1 或中繼點；save.runs[k].from）
      ...(run.tier > 0 ? { tier: run.tier | 0 } : {}),           // 第 D 波棒三試煉階級（第 0 階不多這個鍵）：save.runs[k].tier、trialRecord
      lexp: Object.assign({}, run.lexp || {}, { base: lexpBase(run) }) };   // 第 C 波樂歷記帳（C 波只記；D 波一次入帳）：路線分項＋base
  }

  // ---------- 稀有度、價格與時機 ----------
  function rarityScore(card) { return star(card, 'c') + star(card, 'h') + (star(card, 'o') === 5 ? 1 : 0); }
  function rarity(card) {
    if (!card) return null;
    if (TIERS.includes(card.tier)) return 'apex';
    const s = rarityScore(card);
    return s <= 5 ? 'common' : s === 6 ? 'rare' : s === 7 ? 'uncommon' : s === 8 ? 'epic' : 'legendary';
  }
  // 分類箱（X／Y 契約）：第一個曲風標籤＝genre-tree.json 頂層十類（electronic → elec）；地區台灣一律 tw（地區優先）。new／picks／feature 不看分類
  const GENRE_BIN = { rock: 'rock', jazz: 'jazz', electronic: 'elec', soul: 'soul', hiphop: 'hiphop', classical: 'classical', folk: 'folk', pop: 'pop', world: 'world', blues: 'blues' };
  function categoryOf(card) {
    if (!card) return null;
    if (card.region === 'tw') return 'tw';
    return GENRE_BIN[((card.genres || [])[0]) || ''] || null;
  }
  const cardArg = (content, card) => typeof card === 'string' ? cardOf(content, card) : card;
  // 特價箱的卡＝content.bargain.pool（現在擺的）＋retired（店主 11-16 換下的舊特價箱：舊存檔的包包、這一輪特價箱可能還有）。兩種都照特價算價、都不上架、收音機都不抽
  const bargainIds = content => { const B = (content && content.bargain) || {}; return [].concat(B.pool || [], B.retired || []); };
  const inBargain = (content, id) => bargainIds(content).includes(id);
  // 特價箱每張的價：照最高星 1／2／3 → 100／200／300（序章那次挑三張免費）；峰值 >3 照 3 算
  function bargainPriceOf(content, card) {
    const c = cardArg(content, card);
    if (!c || TIERS.includes(c.tier)) return null;
    const p = econ(content).bargain[Math.max(1, Math.min(3, peak(c)))];
    return p != null ? p : null;
  }
  // 這張在這間店的價：特價箱的照特價（賣回也照它算半價，不會一買一賣賺錢）；其他照稀有度（頂點 8000：表先備好，v4 不上架）
  function priceOf(content, card) {
    const c = cardArg(content, card);
    if (!c) return null;
    if (inBargain(content, c.id)) return bargainPriceOf(content, c);
    const p = econ(content).price[rarity(c)];
    return p != null ? p : null;
  }
  // 特價箱裡這一格的價（buyBargain、econ.js 的價籤）：收音機抽的那張照原價（priceOf＝稀有度價 $800–1,200）；
  //   不能用 bargainPriceOf（最高星 >3 一律 $300，賣回卻是 priceOf 的半價 $400–600 → 一買一賣就賺）。其他照特價
  function bargainPriceIn(run, content, id) {
    const R = run && run.shop && run.shop.radio;
    if (R && R.id === id) return priceOf(content, id);
    return bargainPriceOf(content, id);
  }
  // 收音機轉頻率（v5 第六項第二期）：抽卡池（見檔頭契約）；頻率八格＝content.tunes.order（沒給時用主站 ORDER）
  const TUNE_CELLS = ['calm', 'still', 'languid', 'decay', 'lift', 'crisp', 'boil', 'charge'];
  const tuneCells = content => ((content && content.tunes && Array.isArray(content.tunes.order) && content.tunes.order.length) ? content.tunes.order : TUNE_CELLS);
  function radioPool(run, content, cell) {
    if (!run || !tuneCells(content).includes(cell)) return [];
    const SH = shopOf(run), bag = new Set(run.bag || []);
    const shelf = new Set([].concat(...Object.values(SH.bins || {}).filter(Array.isArray), SH.bargain || [], bargainIds(content)));
    return radioBase(content, cell).filter(c => !bag.has(c.id) && !shelf.has(c.id)).map(c => c.id);
  }
  // 這一格合規的池子（trialPool ∩ tune ∩ 普通／稀有／獨特，照 trialPool 順序）：快取在 poolInfo（WP2-0）；API._noCache 每次重篩
  function radioBase(content, cell) {
    const keep = c => c.tune === cell && SHELF_RARITY.includes(rarity(c));
    if (API._noCache || !POOL_INFO) return trialPool(content).filter(keep);
    const P = poolInfo(content), k = 'R' + cell;
    let b = P.bk.get(k);
    if (!b) { b = P.pool.filter(keep); P.bk.set(k, b); }
    return b;
  }
  function canRadio(run) { return canShop(run) && !shopOf(run).radio; }
  function relicPrice(content, id) {
    const r = content && content.relics && content.relics[id];
    if (!r) return null;
    return r.price != null ? r.price : econ(content).relicPrice;
  }
  function sellValue(content, x) {
    const p = typeof x === 'string' ? relicPrice(content, x) : priceOf(content, x);
    return p == null ? 0 : Math.floor(p * econ(content).sellRate);
  }
  // 老闆送的不能賣回換錢（FIXLIST 11 追加；第 A 波起櫃檯交還老闆 $0，sellQuote）：這一趟王牌那組的四張禮物（content.gifts[run.ace]）＋王牌本身。別組的禮物卡如果是客人丟的或買的，照舊能賣
  //   run.gifts（從唱片櫃挑牌開局）＝這一趟實際放進包包的那幾張（種子佔掉的不算）；舊的 run 沒有 → 那組四張
  function isGift(run, content, x) {
    const id = x && typeof x === 'object' ? x.id : x;
    if (!run || !id || !content) return false;
    const G = Array.isArray(run.gifts) ? run.gifts : (((content.gifts || {})[run.ace]) || []);
    return id === ((content.aces || {})[run.ace]) || G.includes(id);
  }
  // 從唱片櫃帶來的種子不能賣回換錢（店主 11-13 §0 護欄；第 A 波起櫃檯交還老闆 $0，sellQuote）
  function isSeed(run, content, x) {
    const id = x && typeof x === 'object' ? x.id : x;
    return !!(run && id && Array.isArray(run.seeds) && run.seeds.includes(id));
  }
  // 櫃檯賣給老闆（第 A 波 5，店主 11-16「要去櫃檯賣給老闆才能移出包包，也是在局中備戰時發生，就是 Monster Train 的方式」）：
  //   移出包包只有這一條（choose sell）。兩位客人之間（canShop）；包包裡；賣完至少留 5 張（bagFloor，'bagMin'）。
  //   一般唱片半價（sellValue；特價箱的照特價算）；老闆送的（isGift）、從唱片櫃帶來的種子（isSeed）也可以交給老闆：老闆收回、$0（reclaim 'gift'｜'seed'）。
  //   回 {ok:true, earn, reclaim:null|'gift'|'seed', found} | {ok:false, error}（不改 run；畫面列「賣給老闆 $400」「交還老闆」用，choose sell 走同一套）
  //   第 C 波（SPEC-C §3.3 sellCore，CRITIQUE 1.5／2.1）：拆成「時機（canShop）＋sellCore（規則）」；撿來的（run.found）賣回 min(半價, $400)＝跟「不收」一樣，found:true
  function sellQuote(run, content, id) {
    if (!canShop(run)) return { ok: false, error: 'notNow' };
    return sellCore(run, content, id);
  }
  // 賣回的規則（不看時機）：櫃檯（sellQuote）、同業調貨與黑膠市集的「賣一張給他」（choose stallAct sell）共用
  function sellCore(run, content, id) {
    if (!run || !Array.isArray(run.bag) || !run.bag.includes(id) || !cardOf(content, id)) return { ok: false, error: 'badSell' };
    if (run.bag.length - 1 < bagFloor(run)) return { ok: false, error: 'bagMin' };
    const reclaim = isSeed(run, content, id) ? 'seed' : isGift(run, content, id) ? 'gift' : null;
    const found = !reclaim && Array.isArray(run.found) && run.found.includes(id), half = sellValue(content, cardOf(content, id));
    return { ok: true, earn: reclaim ? 0 : found ? Math.min(half, wcCfg(content).loot.skipCash) : half, reclaim, found };
  }
  // 賣掉（sellCore 驗過的 q）：扣包包、加錢、記 sold；種子從 run.seeds、送的從 run.gifts、撿來的從 run.found 拿掉（之後再買回來＝買的，照半價）
  function applySell(run, content, id, q, effects) {
    if (q.reclaim === 'gift') {
      if (!Array.isArray(run.gifts)) run.gifts = (((content.gifts || {})[run.ace]) || []).filter(x => run.bag.includes(x));   // 舊的 run 沒有這欄：先補上
      if (run.gifts.includes(id)) run.gifts.splice(run.gifts.indexOf(id), 1);
    }
    if (q.reclaim === 'seed' && Array.isArray(run.seeds)) run.seeds.splice(run.seeds.indexOf(id), 1);
    if (q.found) run.found.splice(run.found.indexOf(id), 1);
    if (Array.isArray(run.sellNext)) run.sellNext = run.sellNext.filter(x => x !== id);   // cPolicy takeSell（量「收了拿去賣」）
    run.bag.splice(run.bag.indexOf(id), 1); run.money += q.earn; run.stats.earned += q.earn; run.stats.sold.push(id);
    if (run.stats.c && q.earn > 0) wcAdd(run.stats.c.income, 'sell', q.earn);   // 第 C 波計數（全關時沒有 stats.c，不建）
    effects.push(q.reclaim ? { loseCard: id, earn: 0, reclaim: q.reclaim } : q.found ? { loseCard: id, earn: q.earn, found: true } : { loseCard: id, earn: q.earn });
  }
  // 自動遊玩挑種子：照最高星（峰值）挑，同星看總星、再看 id（決定性）
  //   max＝這一趟的種子格（第 D 波 talentArgs 的 seedMax；沒給＝CFG.seedMax）
  function seedPolicy(content, ids, n, max) {
    const M = Number.isInteger(max) && max > 0 ? max : CFG.seedMax;
    const k = n == null ? M : Math.max(0, Math.min(M, n | 0));
    return uniq((ids || []).filter(id => canSeed(content, id)))
      .sort((a, b) => peak(cardOf(content, b)) - peak(cardOf(content, a)) || power(cardOf(content, b)) - power(cardOf(content, a)) || (a < b ? -1 : a > b ? 1 : 0))
      .slice(0, k);
  }
  // 一趟留一張（SPEC 從唱片櫃挑牌開局 §1 裁定 6）：候選＝這一趟進過包包的（獎勵、買的、特價箱的）＋客人掉落（獎勵候選，沒拿的也算）；
  //   已經擁有的不列、頂點卡不列。owned 由畫面給（引擎不碰存檔）：函式 id→bool、陣列，或 {id: truthy}（值是物件就看 .own）
  function ownedFn(owned) {
    if (typeof owned === 'function') return owned;
    if (Array.isArray(owned)) return id => owned.includes(id);
    if (owned && typeof owned === 'object') return id => { const v = owned[id]; return !!(v && (typeof v === 'object' ? v.own : v)); };
    return () => false;
  }
  //   第 C 波（SPEC-C §3.4，CRITIQUE 2.6）：買的不算（#s34【已定】「只從抽到或對方掉落的帶走 1 片」）＝(entered − stats.bought) ∪ drops；特價箱開局免費挑的不是買的
  function keepCandidates(run, content, owned) {
    if (!run) return [];
    const has = ownedFn(owned), bought = new Set((run.stats && run.stats.bought) || []);
    return uniq([].concat((run.entered || []).filter(id => !bought.has(id)), run.drops || [])).filter(id => canSeed(content, id) && !has(id));
  }
  function keepOne(run, content, id, owned) {
    if (!run || !run.over) return { ok: false, error: 'notOver' };
    if (run.kept) return { ok: false, error: 'kept' };
    if (!keepCandidates(run, content, owned).includes(id)) return { ok: false, error: 'notOffered' };
    run.kept = id;
    return { ok: true, effects: [{ keep: id }] };
  }
  // 畫面上的錢：千分位（1200 → '1,200'）。C.shopUi 的字串自己帶 '$'，UI 代入 {n} 時用這個
  function moneyText(n) {
    const v = Math.round(+n || 0), s = String(Math.abs(v)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return (v < 0 ? '-' : '') + s;
  }
  const shopOf = run => run.shop || { bins: {}, relics: [], bargain: [], bargainPicked: false, radio: null };
  // 包包上限（店主 11-16：不限張數，一趟結束 newRun 才重置）。bagCap()＝CFG.bagMax（有限正數）或 Infinity；bagLimited()＝有上限（sim --set bagMax=8 對照）；
  //   bagFull(run)＝有上限而且滿了（不限時永遠 false）。有上限時 choose／runPolicy／shopPolicy 走舊規則那條路（逐字照舊）
  const bagCap = () => (typeof CFG.bagMax === 'number' && CFG.bagMax > 0) ? CFG.bagMax : Infinity;
  const bagLimited = () => Number.isFinite(bagCap());
  const bagFull = run => !!run && Array.isArray(run.bag) && run.bag.length >= bagCap();
  // 賣回之後包包最少留幾張：手牌 5 張要補得滿（CFG.handSize）；本來就不到的（理論上不會：開局 7 張）不能再少
  const bagFloor = run => Math.min(CFG.handSize, (run.bag || []).length);
  function canShop(run) { return !!run && !run.over && !run.pending && !run.duel && run.prologue !== 'pending' && !!shopOf(run).bargainPicked; }
  // 特價箱免費挑三張：只在第 1 位之前（裁定 4；之後每輪補貨、要買）
  function canBargainPick(run) { return !!run && !shopOf(run).bargainPicked && !run.duel && !run.over && run.pos === (run.cpFrom || 1); }   // 中繼點開局：第 N 位之前
  // 換王牌（店主 11-13）：只在這一趟第 1 位開打之前（序章那一趟：序章打完、領完撿到的那張之後）
  function canSwitchAce(run, content) {
    if (!run || run.over || run.pending || run.duel || run.prologue === 'pending' || run.pos !== (run.cpFrom || 1) || run.fought) return false;   // 中繼點開局：第 N 位開打前（CRITIQUE 1.6）
    return !(content && Number.isInteger(run.retryLeft) && run.retryLeft < trialCfg(content, run.tier).retry);   // 舊的 run：說情用掉了＝打過第 1 位
  }
  // o.aceId（頂點卡試做）：這一派名單裡的那張；同一派＝只換 run.aceId（送的不動）、換派＝照舊換送的再設 run.aceId。沒給＝照舊（換派時清掉舊的 aceId）
  function switchAce(run, content, tier, o) {
    const fail = error => ({ ok: false, error, effects: [] });
    if (!run || !TIERS.includes(tier) || !cardOf(content, (content.aces || {})[tier])) return fail('badAce');
    const want = o && o.aceId != null ? o.aceId : null;
    if (want != null && !apexList(content, tier).some(e => e && e.card === want && cardOf(content, want))) return fail('badAce');
    if (!canSwitchAce(run, content)) return fail('notNow');
    if (run.unlock) {                                          // 解鎖制（店主 11-16）：只能換到已解鎖的派；旗標開只能換擁有的那張
      if (!unlockTiersOf(run, content).includes(tier)) return fail('locked');
      if (want != null && Array.isArray(run.unlock.apex) && !ownedApexOf(run, content).includes(want)) return fail('notOwned');
    }
    if (tier === run.ace) {
      const cur = apexAceId(run, content);
      if (want == null || want === cur) return fail('same');
      run.aceId = want;
      return { ok: true, effects: [{ ace: tier, from: tier, aceId: want, fromId: cur }] };
    }
    const from = run.ace, G = content.gifts || {};
    const old = Array.isArray(run.gifts) ? run.gifts : (G[from] || []);
    const slots = run.bag.map((id, k) => old.includes(id) ? k : -1).filter(k => k >= 0);
    const rest = run.bag.filter((id, k) => !slots.includes(k));
    const next = uniq((G[tier] || []).filter(id => cardOf(content, id) && !rest.includes(id))).slice(0, slots.length);
    const lost = slots.map(k => run.bag[k]);
    let j = 0; const bag = [];
    run.bag.forEach((id, k) => { if (!slots.includes(k)) bag.push(id); else if (j < next.length) bag.push(next[j++]); });   // 原位換；不夠的格子拿掉
    const fromId = want != null || run.aceId != null ? apexAceId(run, content) : null;
    const bag0 = run.bag.slice(), lu0 = Array.isArray(run.lineup) ? run.lineup.slice() : null, bn0 = Array.isArray(run.bench) ? run.bench.slice() : [];
    run.bag = bag; run.ace = tier; run.gifts = next.slice();
    // 第 I 波 I-2（合併後修正）：換派換掉的送的牌＝離開包包——跟 choose 包裝層同一個同步（luBagSync：新的進 lineupFresh、走的從上場／替補／rested／耐聽拿掉）；
    //   上場或替補有人被換掉：還在這一趟第 1 位開打前（canSwitchAce）＝整組重挑（lineup null、lineupDue；來客畫面重開上場面板）。上場制／耐聽關著一行不走
    if (lineupOn(run) || wearOn(run)) {
      luBagSync(run, content, bag0);
      if (lineupOn(run) && luRound(run) && (lu0 && lu0.some(id => !bag.includes(id)) || bn0.some(id => !bag.includes(id)))) { run.lineup = null; run.bench = []; run.lineupDue = true; }
    }
    if (run.fac) {                                             // 第 D 波棒二：換派＝本派選項清空（第 1 位開打前，本來就空）；棒三：派樹換新派的（o.facTal＝新派的 treeArgs；沒給＝空）
      run.ace = from; facStart(run, content, -1); run.ace = tier;   // 舊派樹開局給的地下串連（聲望上限 +3）先拿回來
      run.fac = Object.assign({}, run.fac, { picks: {}, tal: facTalOf(content, tier, o && o.facTal) }); delete run.fac.deepAcc;
      facStart(run, content, 1);
    }
    if (want != null) run.aceId = want; else if (run.aceId != null) delete run.aceId;
    run.taken = Math.max(0, (run.taken | 0) + next.length - lost.length);
    if (run.bossAce === tier || !TIERS.includes(run.bossAce)) run.bossAce = bossAceFor(run.seedKey, run.runNo, tier);
    if (run.unlock) run.bossCard = bossCardFor(run, content);   // 解鎖制：試做卡先挑別派的，換派可能換掉這一輪藏家帶的那張
    const SH = run.shop;
    if (SH) {
      if (SH.bins) for (const k of Object.keys(SH.bins)) if (Array.isArray(SH.bins[k])) SH.bins[k] = SH.bins[k].filter(id => !bag.includes(id));
      if (Array.isArray(SH.bargain)) SH.bargain = SH.bargain.filter(id => !bag.includes(id));
    }
    const effects = [want != null ? { ace: tier, from, aceId: want, fromId } : { ace: tier, from }];
    for (const id of lost) if (!next.includes(id)) effects.push({ loseCard: id });
    for (const id of next) if (!lost.includes(id)) effects.push({ gainCard: id });
    return { ok: true, effects };
  }

  // ============================================================================================================================
  // 第 C 波（SPEC-C；scratchpad v5/wave-c）：戰利品列、藏家寶箱、店內攤位二選一、踢館帖、中繼點開局、新手保底（客人補償在 trialGuest 的 C.trial.guestHpSteps）
  //   決定性：全部用雜湊 hash01(seedKey#runNo#<標籤>)，標籤只看位數（loot#位、chest#位、stall#打完第幾位、stall#after#站#序、…#roll<j>、draft#c<i>），
  //   不碰 run.rng → 對決亂數跟現行同一序列（例外：菁英／藏家那一件配件照舊 pickOne，同一個位置）。說情重打換了 met，戰利品列「沒出過」那格就可能不同（CRITIQUE 2.3）
  //   引擎預設 WAVEC 全關；content.js 的 C.waveC 開（wcCfg 逐層合併：物件逐鍵、陣列整個換）。全關＝跟第 C 波以前逐字相同（sim、engine.test）
  //   一站一件事、做完就存：站的貨在進站時算好存在 pending.cur（重新整理、被切掉回來都一樣）
  // ============================================================================================================================
  const WAVEC = {
    loot: { on: false, n: 3, gold: 0.15, packet: 0.12, packetCash: 0.7, packetLexp: 15, skipCash: 400 },
    chest: { on: false, n: 3, apex: 0.08, gold: 0.30, pity: 5, dareN: 4, dareCash: 5000, skipCash: 400 },
    // 池子（總星門檻＝trialDeck 的下限 fl 加減、夾在 min～cap）：金邊 clamp(fl＋2, 10, 12)、好貨 clamp(fl＋1, 9, 12)、戰力 clamp(fl, 6, 11)；挖寶攤同色不足 colorMin 張就降 1
    pools: { goldPlus: 2, goldMin: 10, goldCap: 12, goodPlus: 1, goodMin: 9, goodCap: 12, powerMin: 6, powerCap: 11, colorMin: 30 },
    stall: {
      on: false,
      weights: { dig: 3, trade: 2, gear: 2, snack: 2, gig: 2, promo: 2, fortune: 1.5, consign: 1, home: 1 },
      unlock: { promo: 10, consign: 15, dare: 30 },               // promo／consign 看 max(最遠紀錄, 剛打完第幾位)；dare 只給解鎖階梯顯示（出不出照 dare.from）
      first: [['dig', 'fortune'], ['warehouse', 'home']],          // 第一趟（每一趟打完第 5 位）固定；後面再接錄音室
      paid: ['trade', 'gear', 'gig'], blue: ['gig', 'promo', 'home'],   // 花錢站每組最多 1 個；四站至少一個藍框（樂歷站）（CRITIQUE 3.1）
      leaveCash: 1000, reroll: 500, skipCash: 400, tradeN: 3, gearN: 2, gearPrice: 3000, snackHp: 3,
      gig: { base: 3000, step: 1000, lexp: 20, keep: 4000 },       // 第 k 張 $3,000＋$1,000×(k−1)，整趟累計；keep＝「買到剩 $4,000」
      promoN: 3, promoLexp: 10, homeLexp: 30, demoLexp: 15, consignRounds: 2,
      market: { cards: 6, gear: 3, bag: { price: 2500, n: 3, apex: 0.06, max: 1 } },
      dare: { from: 30, p: 0.35, tough: { atk: 1 }, tank: { hp: 4 } },   // from 看「這一趟剛打完第幾位」，不看最遠紀錄（CRITIQUE 3.2）
      digNames: [                                                  // 攤名＝曲風／地區 ×3（不是篩選）；lit＝店裡對到的箱（shops/dip.json prop id）
        { id: 'jazzTeacher', genres: ['jazz'], lit: ['crate-jazz'] },
        { id: 'bandRoom', genres: ['rock'], lit: ['isl-0a'] },
        { id: 'djAbroad', genres: ['electronic', 'hiphop'], lit: ['isl-0b', 'isl-1b'] },
        { id: 'oldRadio', region: ['tw', 'zh'], lit: ['crate-tw'] },
        { id: 'grandpa', genres: ['pop', 'soul', 'blues'], lit: ['isl-1a', 'winbin'] },
        { id: 'classicalStudy', genres: ['classical'], lit: ['isl-2b'] },
        { id: 'backpacker', genres: ['world'], lit: ['isl-3a'] },
        { id: 'closedShop', lit: [] }] },                          // 不加權
    safety: { on: false },
    draft: { k: null, m: null, mLess: 1, mRate: null },           // null＝照公式（SPEC-C §5.6；驗收修正：m＝round(L−1−mLess)，比期望等級少一級。mRate 給了＝舊公式 round(mRate×(L−1))，sim 對照用）
  };
  const LEXP_BASE = { pos: 15, streak: 8 };                        // 基本樂歷＝15×實際打過的位數＋8×最多連贏（D 波入帳時套路線上限用；C 波只記帳）
  function wcMerge(d, v) {
    if (v == null) return d;
    if (typeof v !== 'object' || Array.isArray(v) || !d || typeof d !== 'object' || Array.isArray(d)) return v;
    const o = Object.assign({}, d);
    for (const k of Object.keys(v)) o[k] = wcMerge(d[k], v[k]);
    return o;
  }
  function wcCfg(content) {
    const s = (content && content.waveC) || {}, out = {};
    for (const k of Object.keys(WAVEC)) out[k] = wcMerge(WAVEC[k], s[k]);
    return out;
  }
  // 畫面給引擎的兩個讀存檔函式（CRITIQUE 1.8）：owned(id)→bool（唱片櫃擁有）、tunes()→[最多的兩個頻率格]；呼叫時才讀存檔、不存進 run。
  //   金邊盤、寄賣領回、公關片先扣擁有的；公關片那兩格頻率 ×3。沒設（sim、單元測試）＝不扣、不加權。setCtx(null)＝清掉
  const WC_CTX = { owned: null, tunes: null };
  function setCtx(o) {
    WC_CTX.owned = o && o.owned != null ? ownedFn(o.owned) : null;
    WC_CTX.tunes = o && typeof o.tunes === 'function' ? o.tunes : null;
  }
  const ctxOwned = () => { const f = WC_CTX.owned; return f ? (id => { try { return !!f(id); } catch (_) { return false; } }) : null; };
  function ctxTunes() {
    if (!WC_CTX.tunes) return [];
    try { const t = WC_CTX.tunes(); return Array.isArray(t) ? t.filter(x => typeof x === 'string').slice(0, 2) : []; } catch (_) { return []; }
  }
  // 客人牌組總星下限（trialDeck 的 fl）：min(floorMax, floorBase＋⌊floorRate×位⌋)（第 15 位起 13）
  function floorAt(content, pos, tier) { const K = trialCfg(content, tier).curve.deck; return Math.min(K.floorMax, K.floorBase + Math.floor(K.floorRate * Math.max(1, pos | 0))); }
  const clampN = (x, lo, hi) => Math.max(lo, Math.min(hi, x));
  function wcTh(content, pos, kind, tier) {
    const P = wcCfg(content).pools, f = floorAt(content, pos, tier);
    if (kind === 'gold') return clampN(f + P.goldPlus, P.goldMin, P.goldCap);
    if (kind === 'good') return clampN(f + P.goodPlus, P.goodMin, P.goodCap);
    return clampN(f, P.powerMin, P.powerCap);
  }
  // 池子：非頂點、非特價箱、非王牌、總星 ≥ th，id 排序；依 th 快取在 content.cards 上
  const WC_POOL = typeof WeakMap === 'function' ? new WeakMap() : null;
  function wcPool(content, th) {
    const cards = content.cards || {};
    let M = WC_POOL && WC_POOL.get(cards);
    if (!M) { M = new Map(); if (WC_POOL) WC_POOL.set(cards, M); }
    if (M.has(th)) return M.get(th);
    const bg = new Set(bargainIds(content)), aces = new Set(Object.values(content.aces || {}));
    const p = Object.keys(cards).sort().map(id => cards[id]).filter(c => c && !c.tier && !bg.has(c.id) && !aces.has(c.id) && power(c) >= th);
    M.set(th, p); return p;
  }
  // 加權不重複抽 n 張（Efraimidis–Spirakis：ln(u)/w 最大的；u＝hash01(key#id)；同分 id 小的先）。
  //   skip（Set）先扣、soft（id→bool：唱片櫃擁有的）再扣；不夠先放回 soft、再放回 skip（一趟裡不重複：先扣包包和這趟路上出現過的）。
  //   skip.hard（wcSkip 帶的：包包＋這次已抽的）永遠不放回——深處金邊／好貨池（≥12 星 111 張）被 road 用完時，只放回路上出現過的，不給包包已有、同一列重複的
  function wcPick(pool, key, n, skip, wfn, soft) {
    if (!(n > 0)) return [];
    const score = c => Math.log(hash01(key + '#' + c.id) + 1e-12) / (wfn ? Math.max(1e-6, wfn(c)) : 1);
    const better = (a, b) => a.s > b.s || (a.s === b.s && a.id < b.id);
    const top = (arr, x) => { let i = arr.length; while (i > 0 && better(x, arr[i - 1])) i--; if (i < n) { arr.splice(i, 0, x); if (arr.length > n) arr.pop(); } };
    const t0 = [], t1 = [], rest = [];
    for (const c of pool) {
      if (skip && skip.has(c.id)) { if (!(skip.hard && skip.hard.has(c.id))) rest.push(c); continue; }
      const x = { id: c.id, s: score(c) };
      if (soft && soft(c.id)) top(t1, x); else top(t0, x);
    }
    const out = t0.map(x => x.id);
    for (const x of t1) { if (out.length >= n) break; out.push(x.id); }
    if (out.length < n) { const t2 = []; for (const c of rest) top(t2, { id: c.id, s: score(c) }); for (const x of t2) { if (out.length >= n) break; out.push(x.id); } }
    return out;
  }
  const wcKey = (run, s) => run.seedKey + '#' + run.runNo + '#' + s;
  // 一趟裡不重複：包包＋路上出現過的＋extra（這次已抽的）都先扣；.hard＝包包＋extra（wcPick 不夠時也不放回）
  const wcSkip = (run, extra) => { const s = new Set([].concat(run.bag || [], run.road || [], extra || [])); s.hard = new Set([].concat(run.bag || [], extra || [])); return s; };
  function wcRoad(run, ids) {
    if (!Array.isArray(run.road)) run.road = [];
    const S = wcStats(run);
    for (const id of ids) {
      if (!id) continue;
      if (run.pos >= 15) { S.r15++; if (run.road.includes(id)) S.r15d++; }   // N1：第 15 位起路上的盤重複幾張
      if (!run.road.includes(id)) run.road.push(id);
    }
  }
  // 計數（sim、結算頁、上線後記 §15；run.stats.c）
  function wcStats(run) {
    const S = run.stats || (run.stats = {});
    if (!S.c) S.c = { loot: 0, lootTake: 0, lootSkip: 0, lootRelic: 0, gold: 0, goldTake: 0, packet: 0, packetCash: 0, packetLexp: 0,
      chest: 0, chestTake: 0, chestRelic: 0, chestSkip: 0, chestGold: 0, chestApex: 0, chestGoldTake: 0,
      sess: 0, cpSess: 0, offered: {}, picked: {}, leave: 0, spend: {}, income: {}, snackHp: 0, tickets: 0, digTake: 0, digSkip: 0, rerolls: 0,
      tradeBuy: 0, gearBuy: 0, marketBuy: 0, bags: 0, consign: 0, consignGot: 0, dareOffer: 0, dareAccept: 0, dareTough: 0, dareTank: 0, dareWon: 0,
      safety: 0, r15: 0, r15d: 0, src: {} };
    return S.c;
  }
  const wcAdd = (o, k, n) => { o[k] = (o[k] || 0) + n; };
  function lexpAdd(run, src, n) { if (!run.lexp || typeof run.lexp !== 'object') run.lexp = {}; run.lexp[src] = (run.lexp[src] | 0) + n; }
  // 撿來的（戰利品列、寶箱、挖寶攤、老闆的倉庫、寄賣領回、選秀撿盤）：櫃檯／攤位賣回一律 $400（CRITIQUE 2.1）
  function wcFound(run, id) { if (!Array.isArray(run.found)) run.found = []; if (!run.found.includes(id)) run.found.push(id); }
  // 錢的入出（同時記 stats.earned／spent 與 stats.c.income／spend[src]）
  function wcEarn(run, src, n) { if (!(n > 0)) return; run.money += n; run.stats.earned += n; wcAdd(wcStats(run).income, src, n); }
  function wcSpend(run, src, n) { run.money -= n; run.stats.spent += n; wcAdd(wcStats(run).spend, src, n); }
  // 基本樂歷（SPEC-C §2.4、§4.7）：15×實際打過的位數（reached − from ＋ 1）＋8×最多連贏；中繼點開局只算實際打過的
  function lexpBase(run) {
    if (!run) return 0;
    const from = run.cpFrom > 1 ? run.cpFrom : 1;
    return LEXP_BASE.pos * Math.max(0, (run.pos | 0) - from + 1) + LEXP_BASE.streak * (run.bestStreak | 0);
  }

  // ---------- 戰利品列（每打贏一位一般／菁英客人；SPEC-C §3.3）----------
  //   三張蓋牌：他這一場整副牌（e.deckIds 扣頂點卡、包包已有）先放一張這場沒出過的（雜湊最小），再照雜湊補滿；不夠從戰力池補（src 'fill'）。
  //   15% 一張換金邊盤（不換「沒出過」那格、優先最後一格）；12% 紅包：七成酬勞再給一次（當下入帳）、三成樂歷 +15（記帳）
  function lootRow(run, content, duel, met, pos, cls, earn) {
    const L = wcCfg(content).loot, key = wcKey(run, 'loot#' + pos);
    met = met || [];
    const deck = uniq(((duel && duel.e && duel.e.deckIds) || []).filter(id => content.cards[id] && !content.cards[id].tier && !run.bag.includes(id)));
    const h = id => hash01(key + '#d#' + id);
    const unplayed = deck.filter(id => !met.includes(id)).sort((a, b) => h(a) - h(b));
    const cards = [], src = [];
    if (unplayed.length) { cards.push(unplayed[0]); src.push('unplayed'); }
    for (const id of deck.slice().sort((a, b) => h(a) - h(b))) { if (cards.length >= L.n) break; if (!cards.includes(id)) { cards.push(id); src.push(met.includes(id) ? 'played' : 'unplayed'); } }
    if (cards.length < L.n) for (const id of wcPick(wcPool(content, wcTh(content, pos, 'power', run.tier)), key + '#fill', L.n - cards.length, wcSkip(run, cards))) { cards.push(id); src.push('fill'); }
    const gold = [];
    if (cards.length && hash01(key + '#gold') < L.gold + (+run.goldAdd > 0 ? +run.goldAdd : 0)) {   // 第 D 波樂歷：稀有率天賦＋Lv15 階梯（run.goldAdd；只加戰利品列）
      let k = -1; for (let i = cards.length - 1; i >= 0; i--) if (i > 0 || src[i] !== 'unplayed') { k = i; break; }
      if (k < 0) k = cards.length - 1;
      const g = wcPick(wcPool(content, wcTh(content, pos, 'gold', run.tier)), key + '#g', 1, wcSkip(run, cards), null, ctxOwned())[0];
      if (g) { cards[k] = g; src[k] = 'gold'; gold.push(g); }
    }
    let packet = null;
    if (hash01(key + '#packet') < L.packet) packet = hash01(key + '#packetKind') < L.packetCash ? { kind: 'cash', n: earn | 0 } : { kind: 'lexp', n: L.packetLexp };
    const S = wcStats(run); S.loot++; if (gold.length) S.gold++; for (const x of src) wcAdd(S.src, x, 1);
    if (packet) { S.packet++; if (packet.kind === 'cash') { S.packetCash++; wcEarn(run, 'packet', packet.n); } else { S.packetLexp++; lexpAdd(run, 'packet', packet.n); } }
    wcRoad(run, cards.filter((id, i) => src[i] === 'gold' || src[i] === 'fill'));
    return { cards, src, gold, packet };
  }
  // ---------- 藏家寶箱（每打贏一位藏家）----------
  //   每張：<8% 鎮店盤格（C 波從金邊池抽、src 'apex'；九第二波換成 #s9 抽法）、<38% 金邊盤、其他他的牌（沒出過的先）；
  //   run.chestDry ≥ pity 而且這箱沒擲到 → 第一張改鎮店盤格（跨趟：save.chestDry）；踢館帖那輪撐完：4 張、沒有金邊就最後一張改金邊
  function chestRow(run, content, duel, met, pos, dare) {
    const X = wcCfg(content).chest, key = wcKey(run, 'chest#' + pos);
    met = met || [];
    const n = dare ? X.dareN : X.n;
    const deck = uniq(((duel && duel.e && duel.e.deckIds) || []).filter(id => content.cards[id] && !content.cards[id].tier && !run.bag.includes(id)));
    const h = id => hash01(key + '#d#' + id);
    const left = deck.slice().sort((a, b) => (met.includes(a) ? 1 : 0) - (met.includes(b) ? 1 : 0) || h(a) - h(b));   // 沒出過的先
    const kinds = [];
    for (let k = 0; k < n; k++) { const u = hash01(key + '#' + k); kinds.push(u < X.apex ? 'apex' : u < X.apex + X.gold ? 'gold' : 'deck'); }
    if (!kinds.includes('apex') && (run.chestDry | 0) >= X.pity) kinds[0] = 'apex';
    if (dare && !kinds.some(k => k === 'gold' || k === 'apex')) kinds[n - 1] = 'gold';
    const cards = [], src = [];
    const golds = wcPick(wcPool(content, wcTh(content, pos, 'gold', run.tier)), key + '#g', kinds.filter(k => k !== 'deck').length, wcSkip(run, deck), null, ctxOwned());
    let gi = 0;
    for (const k of kinds) {
      if (k !== 'deck') { const id = golds[gi++]; if (id) { cards.push(id); src.push(k); continue; } }
      const id = left.find(x => !cards.includes(x));
      if (id) { cards.push(id); src.push(met.includes(id) ? 'played' : 'unplayed'); continue; }
      const f = wcPick(wcPool(content, wcTh(content, pos, 'power', run.tier)), key + '#fill#' + cards.length, 1, wcSkip(run, cards))[0];
      if (f) { cards.push(f); src.push('fill'); }
    }
    const apexHit = src.includes('apex');
    run.chestDry = apexHit ? 0 : (run.chestDry | 0) + 1;
    const S = wcStats(run); S.chest++; if (src.some(s => s === 'gold' || s === 'apex')) S.chestGold++; if (apexHit) S.chestApex++;
    wcRoad(run, cards.filter((id, i) => src[i] !== 'played' && src[i] !== 'unplayed'));
    return { cards, src, gold: cards.filter((id, i) => src[i] === 'gold' || src[i] === 'apex'), apexSlot: cards.filter((id, i) => src[i] === 'apex') };
  }

  // ---------- 店內攤位二選一（每打完一輪；advance 換輪之後、這一輪第 1 位之前；SPEC-C §3.3、§4.3、§5.3）----------
  const STALL_KINDS = ['dig', 'trade', 'gear', 'snack', 'gig', 'promo', 'fortune', 'consign', 'home'];
  // 這種站開了沒：promo／consign 看 max(開局時的最遠紀錄, 剛打完第幾位)；沒列在 unlock 的一開始就開（dare 這格只給解鎖階梯，出不出照 dare.from）
  function stallUnlocked(run, content, kind, after) {
    const U = wcCfg(content).stall.unlock, far = Math.max((run && run.far0) | 0, after | 0);
    return !(kind in U) || far >= U[kind];
  }
  // 解鎖階梯（局外、看最遠紀錄；標題頁、結算頁一行「店內攤位 2/6｜再走 5 位開錄音室」）：攤位、店裡唱盤（一開始）→ 錄音室（打完第 5 位）→ 公關片 → 寄賣 → 踢館帖
  function stallLadder(content, far) {
    const U = wcCfg(content).stall.unlock, f = Math.max(0, far | 0);
    const steps = [['stall', 0], ['home', 0], ['studio', PER_ROUND], ['promo', U.promo | 0], ['consign', U.consign | 0], ['dare', U.dare | 0]].map(([id, at]) => ({ id, at, open: f >= at }));
    const nx = steps.find(x => !x.open);
    return { n: steps.filter(x => x.open).length, total: steps.length, steps, next: nx ? { id: nx.id, at: nx.at, left: nx.at - f } : null };
  }
  function stallSession(run, content) {
    const ST = wcCfg(content).stall, after = run.pos - 1, key = wcKey(run, 'stall#' + after);
    const cpStart = run.cpFrom > 1 && after === run.cpFrom;   // 中繼點開局那一位打完的攤位不算中繼點攤位（CRITIQUE 4.5）
    const cp = isCheckpoint(after, content) && !cpStart, first = after === PER_ROUND && !(run.cpFrom > 1);
    const PAID = ST.paid || [], BLUE = ST.blue || [];
    let groups;
    if (first) groups = ST.first.map(g => g.slice());
    else {
      const pool = STALL_KINDS.filter(k => (ST.weights[k] || 0) > 0 && stallUnlocked(run, content, k, after)).map(k => ({ id: k, w: ST.weights[k] }));
      // 抽 4 種不重複分兩組；要合「花錢站四站裡 ≤2、四站至少一個藍框」，不合就換鍵重抽（t＝0 跟原型同鍵、最多 40 次）
      let four = null;
      for (let t = 0; t < 40 && !four; t++) {
        const f = wcPick(pool, key + '#kinds' + (t ? '#' + t : ''), 4, null, c => c.w);
        if (f.filter(k => PAID.includes(k)).length <= 2 && (!BLUE.length || f.some(k => BLUE.includes(k)))) four = f;
      }
      if (!four) four = wcPick(pool, key + '#kinds', 4, null, c => c.w);
      groups = [[four[0], four[1]], [four[2], four[3]]].map(g => g.filter(Boolean)).filter(g => g.length);
      // 兩個花錢站分到同一組 → 跟另一組的非花錢站對調（每組 ≤1）
      if (groups[1]) for (const [a, b] of [[0, 1], [1, 0]]) if (groups[a].length === 2 && groups[a].every(k => PAID.includes(k))) {
        const j = groups[b].findIndex(k => !PAID.includes(k));
        if (j >= 0) { const t = groups[a][1]; groups[a][1] = groups[b][j]; groups[b][j] = t; }
      }
      // 踢館帖：一般輪（不是中繼點）、這一趟剛打完 ≥ dare.from、上一次不是上一輪 → 35% 把某一組的第 ② 站換成 dare（被換掉的是唯一的藍框 → 先跟那組第 ① 站對調）
      const D = ST.dare;
      if (!cp && after >= (D.from | 0) && run.dareLast !== after - PER_ROUND && hash01(key + '#dare') < D.p) {
        const g = groups.length > 1 && hash01(key + '#dareSide') >= 0.5 ? 1 : 0;
        if (groups[g].length === 2) {
          if (BLUE.includes(groups[g][1]) && [].concat(...groups).filter(k => BLUE.includes(k)).length === 1) { const t = groups[g][0]; groups[g][0] = groups[g][1]; groups[g][1] = t; }
          groups[g][1] = 'dare'; run.dareLast = after;
          wcStats(run).dareOffer++;
        }
      }
    }
    const post = [];
    if (cp && !first) post.push('market');
    if (first || cp) post.push('studio');
    const pre = run.consign && run.consign.due <= run.round ? ['consignGet'] : [];   // 寄賣到期：選組之前先走到櫃檯領
    const S = wcStats(run); S.sess++; if (cp) S.cpSess++;
    run.pending = { type: 'stall', after, pos: run.pos, cp, first, groups, pick: null, q: pre.slice(), k: 0, post, cur: null, done: [] };
    // 第 I 波 I-2：上場不進攤位 pending（修正棒 11-22；原本多一個鍵 lineup、q 走完停在上場那一步＝舊頁面讀到那一步會無限遞迴）：
    //   攤位照舊收攤，run.lineupDue 還是 true → 來客畫面一進來開上場面板（沒攤位那條同一條路）
    if (pre.length) stallEnter(run, content);
  }
  // 配件池（器材行、市集器材、老闆的倉庫）＝rewards.relicPool ∪ relicShop.pool 扣身上的；minusShop＝再扣這一輪櫃檯在賣的（同一輪兩邊不賣同一件；CRITIQUE 1.9c）
  function wcRelics(run, content, key, n, minusShop) {
    const shop = minusShop ? (shopOf(run).relics || []) : [];
    const rp = uniq([].concat(((content.rewards || {}).relicPool) || [], ((content.relicShop || {}).pool) || [], lineupOn(run) ? [luCfg(content).slotRelic] : []))   // 第 I 波 I-2：上場制的一趟多一件唱片袋側袋
      .filter(id => relicOk(content, id) && !run.relics.includes(id) && !shop.includes(id));
    return rp.map(id => ({ id, s: hash01(key + '#r#' + id) })).sort((a, b) => a.s - b.s || (a.id < b.id ? -1 : 1)).map(x => x.id).slice(0, n);
  }
  const digNameOf = (ST, id) => (ST.digNames || []).find(x => x && x.id === id) || null;
  // 進一站（＝畫面的 stallResume）：照 q[k] 產生這一站的貨存進 pending.cur；q 走完：還沒選組（pick == null，寄賣領完）→ cur＝null、等 stallPick；選過組 → pending＝null
  function stallEnter(run, content) {
    const p = run.pending; if (!p || p.type !== 'stall') return;
    if (p.k >= p.q.length) {                                     // 定稿 CRITIQUE 1.2：選組前（寄賣領完）不結束
      p.cur = null; if (p.pick == null) return;
      run.pending = null; return;                                  // 第 I 波 I-2：上場制那幾輪 lineupDue 還在＝收攤後來客畫面開上場面板
    }
    const ST = wcCfg(content).stall, kind = p.q[p.k], key = wcKey(run, 'stall#' + p.after + '#' + kind + '#' + p.k), pos = run.pos, T = run.tier;
    const cur = { kind, key };
    if (kind === 'dig') {
      const names = ST.digNames || [], nm = names.length ? names[Math.floor(hash01(key + '#name') * names.length) % names.length] : null;
      cur.name = nm ? nm.id : null; cur.lit = nm && Array.isArray(nm.lit) ? nm.lit.slice() : []; cur.rolls = 0;
      cur.cards = digDeal(run, content, cur, pos);
    } else if (kind === 'trade') {
      const pool = wcPool(content, wcTh(content, pos, 'good', T)), skip = wcSkip(run);
      const rare = pool.filter(c => ['epic', 'legendary'].includes(rarity(c)));
      const a = wcPick(rare.length ? rare : pool, key + '#rare', 1, skip);   // 「同業珍品」那格：史詩或傳奇
      cur.rare = a[0] || null;
      cur.cards = a.concat(wcPick(pool, key + '#good', ST.tradeN - a.length, wcSkip(run, a)));
    } else if (kind === 'gear') {
      cur.relics = wcRelics(run, content, key, ST.gearN, true);
    } else if (kind === 'warehouse') {
      cur.relics = relicN(run, content) >= CFG.relicMax ? [] : wcRelics(run, content, key, 2, false);
      if (!cur.relics.length) cur.cards = wcPick(wcPool(content, wcTh(content, pos, 'good', T)), key + '#wc', 2, wcSkip(run));   // 配件滿 3 件：改唱片二選一（好貨）
    } else if (kind === 'promo') {
      const tn = ctxTunes();                                       // 唱片櫃最多的兩個頻率 ×3（畫面 setCtx 給；沒設＝不加權）
      cur.cards = wcPick(wcPool(content, 0), key + '#promo', ST.promoN, wcSkip(run), tn.length ? (c => tn.includes(c.tune) ? 3 : 1) : null, ctxOwned());
    } else if (kind === 'fortune') {
      const bp = (run.round - 1) * PER_ROUND + PER_ROUND, bid = (run.order || [])[PER_ROUND - 1];
      if (bid) {
        const g = guestDef(run, content, bid, bp), cnt = { c: 0, o: 0, h: 0 };
        for (const c of g.deck) cnt[topAttr(c)]++;
        cur.boss = { pos: bp, id: bid, ratio: cnt, ace: g.ace ? g.ace.id : null };
        run.fortune = cur.boss;
      }
    } else if (kind === 'consignGet') {
      cur.cards = wcPick(wcPool(content, wcTh(content, pos, 'gold', T)), key + '#cg', 3, wcSkip(run), null, ctxOwned());
    } else if (kind === 'market') {
      const M = ST.market;
      cur.cards = wcPick(wcPool(content, wcTh(content, pos, 'good', T)), key + '#mc', M.cards, wcSkip(run));
      cur.relics = wcRelics(run, content, key, M.gear, true);
      cur.bags = 0; cur.bag = null;
    } else if (kind === 'dare') {
      cur.lead = (run.order || [])[0] || null;                    // 門口遞帖的＝這一輪帶頭那位
    }
    wcRoad(run, cur.cards || []);
    p.cur = cur;
  }
  // 挖寶攤三張：背面露顏色（經／冷／硬各一，topAttr；同色不足 colorMin 張就把門檻降 1）；攤名曲風 ×3；15% 一格換金邊盤
  function digDeal(run, content, cur, pos) {
    const W = wcCfg(content), P = W.pools, nm = digNameOf(W.stall, cur.name), key = cur.key + '#roll' + cur.rolls, skip = wcSkip(run);
    const hit = c => !!nm && ((Array.isArray(nm.genres) && (c.genres || []).some(g => nm.genres.includes(g))) || (Array.isArray(nm.region) && nm.region.includes(c.region)));
    const out = [];
    for (const a of ATTRS) {
      let th = wcTh(content, pos, 'power', run.tier), pool;
      for (;;) { pool = wcPool(content, th).filter(c => topAttr(c) === a && !skip.has(c.id) && !out.includes(c.id)); if (pool.length >= P.colorMin || th <= 3) break; th--; }
      const id = wcPick(pool, key + '#' + a, 1, null, c => (hit(c) ? 3 : 1))[0];
      if (id) out.push(id);
    }
    cur.gold = null;
    if (out.length && hash01(key + '#gold') < W.loot.gold) {
      const g = wcPick(wcPool(content, wcTh(content, pos, 'gold', run.tier)), key + '#g', 1, wcSkip(run, out), null, ctxOwned())[0];
      if (g) { out[out.length - 1] = g; cur.gold = g; }
    }
    return out;
  }
  // 演唱會門票：再買 n 張的總價（第 k 張 base＋step×(k−1)，整趟累計 run.tickets）；gigKeepN＝「買到剩 $4,000」買得起的張數
  function gigPrice(run, content, n) { const G = wcCfg(content).stall.gig; let s = 0; for (let k = 0; k < (n | 0); k++) s += G.base + G.step * ((run.tickets | 0) + k); return s; }
  function ticketsFor(run, content, reserve) { let n = 0; while (n < 999 && gigPrice(run, content, n + 1) <= run.money - reserve) n++; return n; }
  function gigKeepN(run, content) { return ticketsFor(run, content, wcCfg(content).stall.gig.keep); }
  function stallNext(run, content) { const p = run.pending; p.done.push(p.q[p.k]); p.k++; p.cur = null; stallEnter(run, content); return null; }
  // 各站動作（§4.4 表）：回 null＝成功（做完一站的自動 stallNext），字串＝錯誤（不動 run）
  function stallAct(run, content, ch, effects) {
    const p = run.pending, cur = p && p.cur, W = wcCfg(content), ST = W.stall, S = wcStats(run), a = ch.act;
    if (!cur) return 'noStation';
    const enter = id => { if (!Array.isArray(run.entered)) run.entered = []; if (!run.entered.includes(id)) run.entered.push(id); };
    const gain = (id, found) => { run.bag.push(id); run.stats.taken.push(id); run.taken++; enter(id); if (found) wcFound(run, id); effects.push({ gainCard: id }); };
    switch (cur.kind) {
      case 'dig':
        if (a === 'take') { if (!(cur.cards || []).includes(ch.cardId) || run.bag.includes(ch.cardId)) return 'notOffered'; gain(ch.cardId, true); S.digTake++; return stallNext(run, content); }
        if (a === 'reroll') {
          const c = ST.reroll * (cur.rolls + 1); if (run.money < c) return 'money';
          wcSpend(run, 'reroll', c); cur.rolls++; S.rerolls++; cur.cards = digDeal(run, content, cur, run.pos); wcRoad(run, cur.cards);
          effects.push({ reroll: cur.rolls, spend: c }); return null;
        }
        if (a === 'skip') { wcEarn(run, 'skip', ST.skipCash); S.digSkip++; effects.push({ cash: ST.skipCash }); return stallNext(run, content); }
        return 'badAct';
      case 'consignGet':                                           // 寄賣領回：三張金邊盤挑一（可以不拿，沒有 +$400）
        if (a === 'take') { if (!(cur.cards || []).includes(ch.cardId) || run.bag.includes(ch.cardId)) return 'notOffered'; gain(ch.cardId, true); S.consignGot++; run.consign = null; return stallNext(run, content); }
        if (a === 'skip') { run.consign = null; return stallNext(run, content); }
        return 'badAct';
      case 'trade': case 'market':
        if (a === 'buy') {
          if (!(cur.cards || []).includes(ch.cardId) || run.bag.includes(ch.cardId)) return 'notOffered';
          const pr = priceOf(content, ch.cardId); if (pr == null) return 'notOffered'; if (run.money < pr) return 'money';
          wcSpend(run, cur.kind, pr); gain(ch.cardId); run.stats.bought.push(ch.cardId); if (cur.kind === 'trade') S.tradeBuy++; else S.marketBuy++;
          effects.push({ spend: pr }); return null;
        }
        if (a === 'sell') {                                        // 「賣一張給他」＝櫃檯同一套（sellCore；CRITIQUE 1.5）
          const q = sellCore(run, content, ch.cardId); if (!q.ok) return q.error;
          applySell(run, content, ch.cardId, q, effects); return null;
        }
        if (cur.kind === 'market' && a === 'buyRelic') return stallRelic(run, content, cur, ch, effects, true);
        if (cur.kind === 'market' && a === 'tickets') return stallTickets(run, content, ch.n, effects);
        if (cur.kind === 'market' && a === 'bag') {
          const B = ST.market.bag; if (cur.bags >= B.max || cur.bag) return 'bagLimit'; if (run.money < B.price) return 'money';
          wcSpend(run, 'bag', B.price); cur.bags++; S.bags++;
          const pool = wcPool(content, 0).filter(c => ['epic', 'legendary'].includes(rarity(c))), bk = cur.key + '#bag' + cur.bags;
          cur.bag = wcPick(pool, bk, B.n, wcSkip(run)); cur.bagApex = null;
          if (cur.bag.length && hash01(bk + '#apex') < B.apex) {     // 6% 鎮店盤格（C 波＝金邊盤；九第二波換）
            const g = wcPick(wcPool(content, wcTh(content, run.pos, 'gold', run.tier)), bk + '#g', 1, wcSkip(run, cur.bag), null, ctxOwned())[0];
            if (g) { cur.bag[cur.bag.length - 1] = g; cur.bagApex = g; }
          }
          wcRoad(run, cur.bag); effects.push({ spend: B.price }); return null;
        }
        if (cur.kind === 'market' && a === 'bagTake') { if (!cur.bag || !cur.bag.includes(ch.cardId) || run.bag.includes(ch.cardId)) return 'notOffered'; gain(ch.cardId); run.stats.bought.push(ch.cardId); cur.bag = null; return null; }
        // 福袋開了還沒挑（有包包裡沒有的那張）：不能逛完（不然 $2,500 白花；畫面那顆鈕也擋著）
        if (a === 'done' && cur.kind === 'market' && cur.bag && cur.bag.some(id => content.cards[id] && !run.bag.includes(id))) return 'bagOpen';
        if (a === 'done') return stallNext(run, content);
        return 'badAct';
      case 'gear':
        if (a === 'buyRelic') { const e = stallRelic(run, content, cur, ch, effects, true); if (e) return e; S.gearBuy++; return stallNext(run, content); }
        if (a === 'done') return stallNext(run, content);
        return 'badAct';
      case 'warehouse':
        if (a === 'relic') { const e = stallRelic(run, content, cur, ch, effects, false); if (e) return e; return stallNext(run, content); }
        if (a === 'take') { if (!(cur.cards || []).includes(ch.cardId) || run.bag.includes(ch.cardId)) return 'notOffered'; gain(ch.cardId, true); return stallNext(run, content); }
        if (a === 'skip') return stallNext(run, content);
        return 'badAct';
      case 'snack': {
        if (a !== 'ok') return 'badAct';
        const h0 = run.hp; run.hp = Math.min(run.maxHp, run.hp + ST.snackHp); S.snackHp += run.hp - h0; effects.push({ hp: run.hp - h0 });
        return stallNext(run, content);
      }
      case 'gig':
        if (a === 'tickets') { const e = stallTickets(run, content, ch.n, effects); if (e) return e; return stallNext(run, content); }
        return 'badAct';
      case 'promo':                                                // 公關片：進唱片櫃「認識」（不是擁有、不能當種子；CRITIQUE 3.5），不進包包
        if (a !== 'ok') return 'badAct';
        lexpAdd(run, 'promo', ST.promoLexp); effects.push({ shelf: (cur.cards || []).slice(), lexp: ST.promoLexp }); return stallNext(run, content);
      case 'fortune':
        if (a !== 'ok') return 'badAct';
        return stallNext(run, content);
      case 'consign':
        if (a === 'consign') {
          if (!run.bag.includes(ch.cardId) || run.bag.length - 1 < bagFloor(run) || isGift(run, content, ch.cardId) || isSeed(run, content, ch.cardId)) return 'badConsign';
          run.bag.splice(run.bag.indexOf(ch.cardId), 1);
          if (Array.isArray(run.found) && run.found.includes(ch.cardId)) run.found.splice(run.found.indexOf(ch.cardId), 1);
          run.consign = { card: ch.cardId, due: run.round + ST.consignRounds }; S.consign++; effects.push({ loseCard: ch.cardId, consign: true });
          return stallNext(run, content);
        }
        if (a === 'skip') return stallNext(run, content);
        return 'badAct';
      case 'home':                                                 // 店裡唱盤：從這一趟的包包挑一張放上去（可不挑）＋樂歷 +30
        if (a !== 'ok') return 'badAct';
        if (ch.cardId != null && !run.bag.includes(ch.cardId)) return 'notOffered';
        lexpAdd(run, 'home', ST.homeLexp); if (ch.cardId != null) { cur.played = ch.cardId; effects.push({ nowPlaying: ch.cardId }); }
        effects.push({ lexp: ST.homeLexp }); return stallNext(run, content);
      case 'studio':                                               // 錄音室（C 波）：錄 demo 樂歷 +15，畫面自動送 ok
        if (a !== 'ok') return 'badAct';
        lexpAdd(run, 'demo', ST.demoLexp); effects.push({ lexp: ST.demoLexp }); return stallNext(run, content);
      case 'dare':
        if (a === 'accept') {
          if (!['tough', 'tank'].includes(ch.mode)) return 'badMode';
          run.dare = { round: run.round, mode: ch.mode }; S.dareAccept++; if (ch.mode === 'tough') S.dareTough++; else S.dareTank++;
          effects.push({ dare: ch.mode }); return stallNext(run, content);
        }
        if (a === 'decline') return stallNext(run, content);
        return 'badAct';
    }
    return 'badAct';
  }
  // 器材行（paid）、市集器材（paid）、老闆的倉庫（免費）：配件滿 3 件要指定丟哪件（paid＝半價賣掉；免費＝直接換）
  function stallRelic(run, content, cur, ch, effects, paid) {
    if (!(cur.relics || []).includes(ch.relicId) || run.relics.includes(ch.relicId) || !relicOk(content, ch.relicId)) return 'notOffered';
    const pr = paid ? wcCfg(content).stall.gearPrice : 0;
    let earn = 0, drop = null;
    if (relicFull(run, content, ch.relicId)) { if (!ch.dropRelicId || !run.relics.includes(ch.dropRelicId) || isSlotRelic(content, ch.dropRelicId)) return 'relicsFull'; drop = ch.dropRelicId; earn = paid ? sellValue(content, drop) : 0; }
    if (run.money + earn < pr) return 'money';
    if (drop) { run.relics.splice(run.relics.indexOf(drop), 1); run.stats.relicsSold.push(drop); wcEarn(run, 'sell', earn); effects.push({ loseRelic: drop, earn }); }
    if (pr) { wcSpend(run, 'gear', pr); run.stats.relicsBought.push(ch.relicId); }
    run.relics.push(ch.relicId); run.stats.relicsGot.push(ch.relicId); effects.push(pr ? { gainRelic: ch.relicId, spend: pr } : { gainRelic: ch.relicId });
    cur.relics = cur.relics.filter(x => x !== ch.relicId);
    return null;
  }
  function stallTickets(run, content, n, effects) {
    if (!Number.isInteger(n) || n < 0) return 'badN';
    const pr = gigPrice(run, content, n); if (run.money < pr) return 'money';
    if (n) {
      const L = n * wcCfg(content).stall.gig.lexp;
      wcSpend(run, 'gig', pr); run.tickets = (run.tickets | 0) + n; wcStats(run).tickets += n; lexpAdd(run, 'gig', L);
      if (effects) effects.push({ tickets: n, spend: pr, lexp: L });
    }
    return null;
  }
  // 「今天不逛了」（CRITIQUE 1.7）：剩下不是錄音室、不是寄賣領取的站各 +$1,000，直接跳到錄音室或結束。
  //   選組前也能叫：pick＝−1、當作排了一組（兩站）＋post（一般輪 +$2,000、中繼點 +$3,000 含市集）；寄賣領取那站照留。回這次給的錢
  function stallLeave(run, content) {
    const p = run.pending, ST = wcCfg(content).stall;
    if (!p || p.type !== 'stall') return 0;
    if (p.pick == null) { p.pick = -1; p.q = p.q.concat(p.groups[0] || [], p.post); }
    let n = 0;
    for (let k = p.k; k < p.q.length; k++) if (p.q[k] !== 'studio' && p.q[k] !== 'consignGet') n++;
    const cash = n * ST.leaveCash;
    wcEarn(run, 'leave', cash); wcStats(run).leave++;
    const rest = p.q.slice(p.k).filter(x => x === 'studio' || x === 'consignGet');
    const keepCur = p.cur && p.cur.kind === 'consignGet' ? p.cur : null;   // 寄賣領取那站正開著：照原貨留著
    p.q = p.q.slice(0, p.k).concat(rest);
    if (keepCur) p.cur = keepCur; else { p.cur = null; stallEnter(run, content); }
    return cash;
  }

  // ---------- 中繼點開局：快速選秀補到下限（SPEC-C §4.7、§5.6）----------
  //   期望等級 L(N)＝(−5＋√(49＋20.8N))/2（每輪 13 經驗、升級要「等級＋3」）；升級 m＝round(L−1−mLess)（比期望少 mLess＝1 級）、撿盤 k＝clamp(round(m/2), 2, 5)
  //   驗收修正（2026-11-17）：原本 m＝round(0.8×(L−1))，越深少越多（第 50 位少 3 級：從第 50 位開的 10 位存活 36.9%，從頭打到那裡的 60.2%）；
  //   改成固定少一級：第 10／20／30 位跟原本一樣（4／6／8），第 50 位 10→12、75 位 13→16、100 位 16→19
  //   第 I 波 I-0（SPEC-I §7.2 末條）：規格要改成照 gainXp 逐位累計（第一級只要 2 經驗＝約 +0.15 級）——量過不採：第 30 位 m 8→9、k 4→5，
  //   C1（從第 30 位開的 10 位存活 − 從頭打）−3.1 → +3.7 點（出 −8～+3；wave-i/build0/sim CP30／CP30off）。選秀的第一級照樣不加聲望上限（levelHpAt）＝跟從頭打同一條，
  //   所以 m／k 維持封閉式。expLevel(N, content)＝逐位累計版（只給量測、測試用）
  function expLevel(N, content, tier) {
    if (!content) return (-5 + Math.sqrt(49 + 20.8 * Math.max(1, N))) / 2;
    const T = trialCfg(content, tier);
    let L = 1, x = 0;
    for (let p = 1; p <= Math.max(1, N | 0); p++) { x += T.xp[classAt(p)] | 0; for (let g = 0; g < 1000 && x >= xpNeed(T, L); g++) { x -= xpNeed(T, L); L++; } }
    return L + x / xpNeed(T, L);
  }
  function draftPlan(content, N) {
    const D = wcCfg(content).draft, L1 = expLevel(N) - 1;
    const m = D.m != null ? Math.max(0, D.m | 0) : D.mRate != null ? Math.max(0, Math.round(D.mRate * L1)) : Math.max(0, Math.round(L1 - (D.mLess != null ? +D.mLess : 1)));
    const k = D.k != null ? Math.max(0, D.k | 0) : Math.min(5, Math.max(2, Math.round(m / 2)));
    return { k, m };
  }
  // 下一題：先撿盤（戰力池兩張二選一，雜湊 draft#c<i>）、再升級（levelOffer 三選一）
  function draftOffer(run, content) {
    const p = run.pending, N = run.cpFrom;
    if (p.ck < p.k) {
      const cards = wcPick(wcPool(content, wcTh(content, N, 'power', run.tier)), wcKey(run, 'draft#c' + p.ck), 2, wcSkip(run));
      wcRoad(run, cards);
      return { kind: 'card', cards };
    }
    return { kind: 'level', offer: levelOffer(run, content, { draft: true }) };   // 第 D 波棒二：選秀不出本派格
  }
  // 選秀做完：pos＝N、round、idx、order、說情、這一輪藏家的卡、補貨、一檔貨上架到 idx（＝jumpTo 的做法；不記中繼點＝不是走到的）
  function draftDone(run, content) {
    const N = run.cpFrom; run.pending = null;
    run.pos = N; run.round = roundOf(N); run.idx = (N - 1) % PER_ROUND;
    run.order = roundOrder(content, run.seedKey, run.runNo, run.round, null);
    run.retryLeft = trialCfg(content, run.tier).retry;
    if (run.unlock) run.bossCard = bossCardFor(run, content);
    restock(run, content);
    if (run.shop && run.shop.lot) for (let i = 0; i < run.idx; i++) shelve(run, content);
    if (lineupOn(run) || wearOn(run)) luNewRound(run, content);   // 第 I 波 I-2：中繼點開局選秀完挑一次上場（lineupDue）
  }

  // ---------- 舊 run 載入（畫面 loadSave 叫；SPEC-C §2.2、§2.4，CRITIQUE 4.3）----------
  //   o＝{bestFar, chestDry}（存檔的值，補欄位用）。缺欄位補上；不在卡池的卡 id 濾掉（road、found、pending.cards／gold／apexSlot、cur.cards／bag、offer.cards、consign.card），濾空各有退路：
  //   reward 剩 0 張＝只剩「不收（+$400）」；站的貨沒了＝重進那一站；選秀撿盤題 <2 張＝重出這一題。回 true＝有改
  function fixWaveC(run, content, o) {
    if (!run || typeof run !== 'object') return false;
    o = o || {};
    const before = JSON.stringify(run), has = id => typeof id === 'string' && !!cardOf(content, id);
    const def = { far0: Math.max(0, o.bestFar | 0), road: [], lexp: {}, tickets: 0, chestDry: Math.max(0, o.chestDry | 0), dare: null, dareLast: null, consign: null, fortune: null, safety: false, found: [] };
    for (const k of Object.keys(def)) if (!(k in run)) run[k] = def[k];
    if (!Array.isArray(run.road)) run.road = []; if (!Array.isArray(run.found)) run.found = [];
    if (!run.lexp || typeof run.lexp !== 'object' || Array.isArray(run.lexp)) run.lexp = {};
    run.road = run.road.filter(has); run.found = run.found.filter(has);
    if (run.consign && !has(run.consign.card)) run.consign.card = null;
    const p = run.pending;
    if (p && p.type === 'reward' && p.kind && Array.isArray(p.cards)) {
      const keep = p.cards.map((id, i) => has(id) ? i : -1).filter(i => i >= 0);
      if (keep.length !== p.cards.length) { if (Array.isArray(p.src)) p.src = keep.map(i => p.src[i]); p.cards = keep.map(i => p.cards[i]); }
      if (Array.isArray(p.gold)) p.gold = p.gold.filter(has);
      if (Array.isArray(p.apexSlot)) p.apexSlot = p.apexSlot.filter(has);
    }
    if (p && p.type === 'stall' && Array.isArray(p.q)) {
      const c = p.cur;
      if (c && (Array.isArray(c.cards) || Array.isArray(c.bag))) {
        const had = (c.cards || []).length + (c.bag || []).length;
        if (Array.isArray(c.cards)) c.cards = c.cards.filter(has);
        if (Array.isArray(c.bag)) c.bag = c.bag.filter(has);
        if (had && !(c.cards || []).length && !(c.bag || []).length && !(c.relics || []).length) p.cur = null;
      }
      if (!p.cur && Number.isInteger(p.k) && p.k < p.q.length) stallEnter(run, content);
    }
    if (p && p.type === 'draft') {
      if (!p.offer || (p.offer.kind === 'card' && (p.offer.cards || []).filter(has).length < 2)) p.offer = draftOffer(run, content);
      else if (p.offer.kind === 'card') p.offer.cards = p.offer.cards.filter(has);
    }
    return JSON.stringify(run) !== before;
  }

  // ============================================================================================================================
  // 第 I 波 I-2：上場＋耐聽（scratchpad v5/wave-i SPEC-I §3、§5、§10；給畫面／sim／e2e 的契約 wave-i/build2/CONTRACT.md）。數字＝content.lineup／content.wear（luCfg／wearCfg）
  //   店主 11-20：「卡好像可以設計類似耐久度的東西 或出牌次數限制 不然才第15回合 專輯已經固定不會想再購買或換牌」「一次能帶五張上場 發燒配件 或是 天賦 能讓帶上場的」
  //   §12-1 店主沒回＝（甲）每輪挑：每輪從包包挑 n 張上場（第 lineupFrom 位那一輪起；施工量過定 11＝第 3 輪、11-22 post 改 16＝第 4 輪（試煉階級不變簡單），§5.2 起點是第 2 輪）；替補（配件 sleeve、樂歷 Lv3）每位開打前可以換一張。
  //   開關：newRun o.lineup／o.wear（沒給＝content 的 on；兩個一起開、一起關）。關著＝run 一個欄位都不多、這一段一行都不走、策略逐字走舊程式（lineupOn(run) 分支）
  //   run 欄位（只加鍵、RUN_V 不升）：lineup [ids]|null（這一輪上場；null＝還沒挑＝整個包包）、bench [ids]（替補）、lineupFresh [ids]（這一輪新拿到的）、
  //     lineupDue 布林（要開上場面板：換輪那一刻、上場那張離開包包）、lineupFrom（上場制從第幾位那一輪起：content from／firstRunFrom，現在都 16）、lineupBonus（樂歷 Lv3 多帶幾張替補；有才有）、
  //     wear {id:{g 已用幾格, n 聽膩幾層}}、rested [ids]（這一輪還沒上場打過的；換輪時這些聽膩全清＝坐板凳回滿）、wearPos（這一位第一場算過耐聽了：說情重打不算）
  //   上場那一步：換輪的攤位 pending 多一個鍵 lineup {pick, bench, quiet}（q 走完、選過組＝停在這一步；choose {type:'stall', act:'lineup', ids, bench}）；沒攤位＝lineupDue
  //   choose 包一層（luBagSync）：新進包包的記進 lineupFresh；離開包包的（賣、寄賣）從上場／替補／rested／wear 拿掉，上場空一格＝lineupDue（不自動補：CRITIQUE 6-6）
  // ============================================================================================================================
  const LINEUP = { on: false, n: 5, from: 16, firstRunFrom: 16, slotRelic: 'sleeve', max: 7, pen: 1.5, quietMax: 6, depth: 1, deadAt: 9, benchMode: 'worn' };   // from／pen：施工量過（content.js C.lineup 註解；from 11→16＝11-22 post 試煉階級不變簡單）
  const WEAR = { on: false, grooves: 5, maxLayers: 2, star: 1, axes: 1, back: 0 };   // grooves 7→5（11-22 post：from 16 時 W3 要 ≥5%）
  function luCfg(content) { const L = content && content.lineup; return Object.assign({}, LINEUP, L && typeof L === 'object' ? L : {}); }
  function wearCfg(content) { const W = content && content.wear; return Object.assign({}, WEAR, W && typeof W === 'object' ? W : {}); }
  const lineupOn = run => !!run && typeof run === 'object' && Array.isArray(run.lineupFresh);
  const wearOn = run => !!run && typeof run === 'object' && !!run.wear && typeof run.wear === 'object' && !Array.isArray(run.wear);
  const luFrom = run => Number.isInteger(run.lineupFrom) && run.lineupFrom > 0 ? run.lineupFrom : LINEUP.from;
  const luRoundStart = run => (Math.max(1, run.round | 0) - 1) * PER_ROUND + 1;
  // 這一輪是上場制／耐聽要算的那幾輪：這一輪第 1 位 ≥ lineupFrom（序章那一趟的序章不算）
  function luRound(run) { return (lineupOn(run) || wearOn(run)) && run.prologue !== 'pending' && luRoundStart(run) >= luFrom(run); }
  // 策略用「上場制的包包評分」的時機（補量原型：run.pos ≥ lineupFrom）
  const luScore = run => lineupOn(run) && (run.pos | 0) >= luFrom(run);
  const luN = content => Math.max(1, luCfg(content).n | 0);
  // 替補格：配件 slotRelic（1）＋樂歷 Lv3（run.lineupBonus），上場＋替補最多 max
  function benchN(run, content) {
    if (!lineupOn(run)) return 0;
    const L = luCfg(content), k = ((run.relics || []).includes(L.slotRelic) ? 1 : 0) + Math.max(0, run.lineupBonus | 0);
    return Math.max(0, Math.min(k, (L.max | 0) - luN(content)));
  }
  function wearLayers(run, content, id) {
    if (!wearOn(run)) return 0;
    const w = run.wear[id];
    return w ? Math.max(0, Math.min(Math.max(0, wearCfg(content).maxLayers | 0), w.n | 0)) : 0;
  }
  // 聽膩扣哪幾軸：主打軸＝還沒膩之前星最高的那軸（同星 經→冷→硬＝topAttr）；axes 2＝再加次軸（剩下兩軸星高的，同星照 經→冷→硬）
  function wornAxes(card, W) {
    const m = topAttr(card); if ((W.axes | 0) < 2) return [m];
    let s = null; for (const a of ATTRS) if (a !== m && (s == null || star(card, a) > star(card, s))) s = a;
    return [m, s];
  }
  // wornCard(content, run, id) -> 卡的拷貝（耐聽開著）：worn＝聽膩幾層、ear＝開打時剩幾格、wornAxis＝扣的那軸（有膩才有）；那軸 −層數×star（最低 1）。耐聽關＝原卡
  function wornCard(content, run, id) {
    const c = cardOf(content, id); if (!c || !wearOn(run)) return c;
    const W = wearCfg(content), w = run.wear[id] || null, mx = Math.max(0, W.maxLayers | 0);
    const n = w ? Math.max(0, Math.min(mx, w.n | 0)) : 0, g = w ? Math.max(0, w.g | 0) : 0;
    const x = Object.assign({}, c, { worn: n, ear: Math.max(0, (W.grooves | 0) - g) });
    if (n > 0) {
      const ax = wornAxes(c, W), k = n * Math.max(0, W.star | 0);
      x.wornAxis = ax[0];
      for (const a of ax) { const s = star(c, a); x[a] = Math.max(Math.min(1, s), s - k); }
    }
    return x;
  }
  // 這一輪剩下的客人主屬性（來客條公開；第 run.pos 位起到這一輪第 5 位）
  function luMains(run, content) {
    const first = luRoundStart(run), from = Math.max(first, run.pos | 0);
    const ms = roundMains(content, run.seedKey, run.runNo, Math.max(1, run.round | 0), Array.isArray(run.order) ? run.order : null);
    const out = []; for (let p = from; p < first + PER_ROUND; p++) out.push(ATTRS.includes(ms[p - first]) ? ms[p - first] : null);
    return out.length ? out : [null];
  }
  // 「幫我挑」的分數（SPEC-I §5.3）：這幾位客人逐位「剋他主屬性那軸的星 ×3＋最高星＋總星 ÷10」的平均；每層聽膩 −pen（星數照原卡，扣分另算）
  function luCardScore(c, mains) {
    if (!c) return -Infinity;
    let s = 0; for (const m of mains) s += (m ? 3 * star(c, COUNTER_OF[m]) : 0) + peak(c) + power(c) / 10;
    return s / Math.max(1, mains.length);
  }
  function luScoreOf(run, content, id, mains) { return luCardScore(cardOf(content, id), mains) - (+luCfg(content).pen || 0) * wearLayers(run, content, id); }
  // lineupPolicy(run, content) -> {ids, bench} | null（上場制關＝null）：畫面「幫我挑」與 sim 同一個函式。
  //   一輪中途空一格（上場那張賣掉）＝留著上場的那幾張、只補空格；替補＝剩下分數最高的 benchN 張。同分照包包順序
  function lineupPolicy(run, content) {
    if (!lineupOn(run)) return null;
    const n = luN(content), bag = (run.bag || []).filter(id => cardOf(content, id)), mains = luMains(run, content), sc = {};
    for (const id of bag) sc[id] = luScoreOf(run, content, id, mains);
    const order = bag.slice().sort((a, b) => sc[b] - sc[a] || bag.indexOf(a) - bag.indexOf(b));
    const ids = Array.isArray(run.lineup) && luRound(run) ? run.lineup.filter((id, k, a) => bag.includes(id) && a.indexOf(id) === k).slice(0, n) : [];
    for (const id of order) { if (ids.length >= Math.min(n, bag.length)) break; if (!ids.includes(id)) ids.push(id); }
    const bench = [], bn = benchN(run, content);
    for (const id of order) { if (bench.length >= bn) break; if (!ids.includes(id)) bench.push(id); }
    return { ids, bench };
  }
  // 前期省一下（SPEC-I §5.4；CRITIQUE 6-3）：包包 ≤ quietMax 張、這一輪沒有新拿到的、也沒有聽膩的 → 畫面不出上場面板（吐司 C.lineup.ui.quiet、直接送 lineupPolicy）
  function lineupQuiet(run, content) {
    if (!lineupOn(run)) return false;
    const bag = run.bag || [];
    return bag.length <= (luCfg(content).quietMax | 0) && !(run.lineupFresh || []).some(id => bag.includes(id)) && !bag.some(id => wearLayers(run, content, id) > 0);
  }
  // 這一位要打的那幾張（fightSetup 用）：上場制那幾輪＝run.lineup（還沒挑＝整個包包；空一格還沒補＝照 lineupPolicy 補，手牌不缺）；其他＝整個包包
  function lineupOf(run, content) {
    const bag = (run.bag || []).slice();
    if (!lineupOn(run) || !luRound(run) || !Array.isArray(run.lineup)) return bag;
    const n = luN(content);
    if (bag.length <= n) return bag;
    const L = run.lineup.filter((id, k, a) => bag.includes(id) && a.indexOf(id) === k).slice(0, n);
    return L.length >= n ? L : lineupPolicy(run, content).ids;
  }
  function wearStats(run) { const S = run.stats || (run.stats = {}); if (!S.wear || typeof S.wear !== 'object') S.wear = { plays: 0, wornPlays: 0, layers: 0, rest: 0 }; return S.wear; }
  // 換輪（advance 新一輪的補貨之後、攤位之前；中繼點選秀完、jumpTo 也叫）：上一輪 rested 的聽膩全清（坐板凳回滿）、上場中的每輪回 back 格；
  //   上場制那幾輪：lineup＝null、bench＝[]、lineupDue（攤位那一步或來客畫面開面板）；rested＝現在的包包（開打時上場的那幾張移出去）
  function luNewRound(run, content, o) {
    const act = luRound(run);
    if (wearOn(run) && !(o && o.noRest)) {
      const W = wearCfg(content), rest = Array.isArray(run.rested) ? run.rested : [], back = Math.max(0, W.back | 0);
      for (const id of Object.keys(run.wear)) {
        const w = run.wear[id];
        if (!run.bag.includes(id) || !w || typeof w !== 'object') { delete run.wear[id]; continue; }
        if (rest.includes(id)) { if ((w.n | 0) > 0) wearStats(run).rest++; delete run.wear[id]; continue; }
        if (back && (w.n | 0) < (W.maxLayers | 0)) { w.g = Math.max(0, (w.g | 0) - back); if (!w.g && !(w.n | 0)) delete run.wear[id]; }
      }
    }
    if (lineupOn(run)) {
      run.lineupFresh = [];
      if (act) { run.lineup = null; run.bench = []; run.lineupDue = true; } else run.lineupDue = false;
    }
    run.rested = act ? run.bag.slice() : [];
  }
  // 主線對決算完耐聽（finishFight；duel.wearOn＝這場要算：上場制那幾輪、這一位第一場、不是序章）：每張 g＋出牌次數，滿 grooves 格＝聽膩一層、g 回 0；
  //   滿 maxLayers 層之後停在空的（g＝grooves）、不再扣。回 [{id, n}]（這場新聽膩的，n＝現在幾層）
  function wearRecord(run, content, plays) {
    const W = wearCfg(content), G = Math.max(1, W.grooves | 0), mx = Math.max(0, W.maxLayers | 0), out = [], S = wearStats(run);
    for (const id of Object.keys(plays || {})) {
      const k = plays[id] | 0; if (!(k > 0) || !run.bag.includes(id)) continue;
      const w = run.wear[id] || { g: 0, n: 0 }; S.plays += k; if ((w.n | 0) > 0) S.wornPlays += k;
      if ((w.n | 0) >= mx) { run.wear[id] = { g: G, n: mx }; continue; }
      let g = (w.g | 0) + k, n = w.n | 0, up = 0;
      while (g >= G && n < mx) { g -= G; n++; up++; }
      if (n >= mx) g = G;
      run.wear[id] = { g, n };
      if (up) { out.push({ id, n }); S.layers += up; }
    }
    return out;
  }
  // choose 之後（luBagSync）：包包多的進 lineupFresh；少的（賣、寄賣）從 lineup／bench／lineupFresh／rested／wear 拿掉，上場空一格＝lineupDue；替補多於格數就截掉
  function luBagSync(run, content, before) {
    const bag = run.bag || [], gone = before.filter(id => !bag.includes(id)), added = bag.filter(id => !before.includes(id));
    if (lineupOn(run)) for (const id of added) if (!run.lineupFresh.includes(id)) run.lineupFresh.push(id);
    if (gone.length) {
      const drop = a => a.filter(id => !gone.includes(id));
      if (lineupOn(run)) {
        if (Array.isArray(run.lineup) && run.lineup.some(id => gone.includes(id))) { run.lineup = drop(run.lineup); if (luRound(run)) run.lineupDue = true; }
        if (Array.isArray(run.bench)) run.bench = drop(run.bench);
        run.lineupFresh = drop(run.lineupFresh);
      }
      if (Array.isArray(run.rested)) run.rested = drop(run.rested);
      if (wearOn(run)) for (const id of gone) delete run.wear[id];
    }
    if (lineupOn(run) && Array.isArray(run.bench)) { const bn = benchN(run, content); if (run.bench.length > bn) run.bench = run.bench.slice(0, bn); }
  }
  // 驗上場（choose stall lineup／lineup 共用）：ids＝min(n, 包包) 張、不重複、都在包包；keep＝一輪中途補空格（原本上場那幾張要留著）；
  //   bench 沒給＝[]（keep 時照舊留著）；≤ benchN 張、不重複、在包包、不在上場
  function luSet(run, content, ids, bench, keep) {
    const bag = run.bag || [], n = luN(content);
    if (!Array.isArray(ids) || ids.length !== Math.min(n, bag.length) || new Set(ids).size !== ids.length || !ids.every(id => typeof id === 'string' && bag.includes(id))) return 'badLineup';
    if (keep && Array.isArray(run.lineup) && !run.lineup.filter(id => bag.includes(id)).every(id => ids.includes(id))) return 'keepLineup';
    const B = bench == null ? (keep ? (run.bench || []).filter(id => bag.includes(id) && !ids.includes(id)) : []) : bench;
    if (!Array.isArray(B) || B.length > benchN(run, content) || new Set(B).size !== B.length || !B.every(id => typeof id === 'string' && bag.includes(id) && !ids.includes(id))) return 'badBench';
    run.lineup = ids.slice(); run.bench = B.slice(); run.lineupDue = false;
    return null;
  }
  // 一輪中途能不能「換上場」（新拿到的）：上場制那幾輪、挑過了、不在打、兩位客人之間（沒 pending，或剛打完在領獎／升級）
  function luSwapOk(run) {
    const p = run.pending;
    return lineupOn(run) && luRound(run) && Array.isArray(run.lineup) && !run.over && !run.duel && (!p || p.type === 'reward' || p.type === 'level');
  }
  // 上場的四種選擇（choose 轉進來；上場制關著不會到這裡＝'badChoice'）
  function luChoose(run, content, ch) {
    const fail = error => ({ ok: false, error, effects: [] }), effects = [], bag = run.bag || [], n = luN(content);
    switch (ch.type) {
      // 換輪（攤位收攤之後、沒有攤位、中繼點選秀完）、上場那張離開包包之後（lineupDue）：{type:'lineup', ids, bench?}；一輪中途（lineup 還有人）只能補空格
      case 'lineup': {
        if (!run.lineupDue || run.pending || run.duel || run.over || !luRound(run)) return fail('noLineup');
        const e = luSet(run, content, ch.ids, ch.bench, Array.isArray(run.lineup)); if (e) return fail(e);
        effects.push({ lineup: run.lineup.slice(), bench: run.bench.slice() });
        return { ok: true, effects };
      }
      // 一輪中途拿到新唱片換上場：{type:'lineupSwap', inId（lineupFresh 裡、不在上場）, outId（上場那張；null＝補空格）}；被換下的回包包（inId 原本是替補＝換下的那張坐進替補格）
      case 'lineupSwap': {
        if (!luSwapOk(run)) return fail('notNow');
        const L = run.lineup, i = ch.inId, o = ch.outId == null ? null : ch.outId;
        if (!run.lineupFresh.includes(i) || !bag.includes(i) || L.includes(i)) return fail('notFresh');
        if (o == null) { if (L.length >= Math.min(n, bag.length)) return fail('badOut'); L.push(i); }
        else { const k = L.indexOf(o); if (k < 0) return fail('badOut'); L[k] = i; }
        const b = (run.bench || []).indexOf(i); if (b >= 0) { if (o != null) run.bench[b] = o; else run.bench.splice(b, 1); }
        if (Array.isArray(run.rested)) run.rested = run.rested.filter(x => x !== i);
        if (L.length >= Math.min(n, bag.length)) run.lineupDue = false;
        effects.push({ lineupIn: i, lineupOut: o });
        return { ok: true, effects };
      }
      // 替補換上場（每位開打前；{type:'benchSwap', inId（替補）, outId（上場）}）：對調，不換就照上一位。只有 benchMode 'swap'（備案 'worn'＝開打時自動頂上，不給手動換）
      case 'benchSwap': {
        if (luCfg(content).benchMode !== 'swap' || !canShop(run) || !luRound(run) || !Array.isArray(run.lineup)) return fail('notNow');
        const b = (run.bench || []).indexOf(ch.inId), k = run.lineup.indexOf(ch.outId);
        if (b < 0 || !bag.includes(ch.inId)) return fail('notBench');
        if (k < 0) return fail('badOut');
        run.lineup[k] = ch.inId; run.bench[b] = ch.outId;
        effects.push({ benchIn: ch.inId, benchOut: ch.outId });
        return { ok: true, effects };
      }
    }
    return fail('badChoice');
  }
  // 替補的備案（SPEC-I §5.2-3；benchMode 'worn'，施工 L2 量到手動替補 ≤0 才換）：主線開打前（這一位第一場），上場裡聽膩最多的那張
  //   比替補裡聽膩最少的那張多層 → 對調（替補頂上、聽膩的坐進替補格）；有幾格替補最多換幾次。回換了幾張（effects 不出：畫面看 run.lineup／bench 變了；run.stats.benchAuto 累計）
  //   修正棒 11-22：'worn2'（量測用的選項，出貨不用）＝上場那張聽膩到第 2 層才頂上（W3「有替補的人耐聽有沒有感」對照）
  function luAutoBench(run, content) {
    const mode = luCfg(content).benchMode, need = mode === 'worn2' ? 2 : 1;
    if ((mode !== 'worn' && mode !== 'worn2') || !wearOn(run) || !Array.isArray(run.lineup) || !Array.isArray(run.bench) || !run.bench.length) return 0;
    let k = 0;
    for (let g = 0; g < run.bench.length; g++) {
      const L = run.lineup, B = run.bench, lay = id => wearLayers(run, content, id);
      const w = L.slice().sort((a, b) => lay(b) - lay(a) || L.indexOf(a) - L.indexOf(b))[0], b = B.slice().sort((x, y) => lay(x) - lay(y) || B.indexOf(x) - B.indexOf(y))[0];
      if (w == null || b == null || !(lay(w) >= need && lay(w) > lay(b)) || !run.bag.includes(b)) break;
      L[L.indexOf(w)] = b; B[B.indexOf(b)] = w; k++;
      const S = run.stats || (run.stats = {}); S.benchAuto = (S.benchAuto | 0) + 1;
    }
    return k;
  }
  // lineupPrep(run, content) -> [choose…]（sim、自動遊玩；主線客人開打前呼叫，照順序做）：lineupDue＝照 lineupPolicy 挑；
  //   一輪中途新拿到的照「幫我挑」的分數比上場最弱那張高就換上場（一次一張、重算）；替補照這一位的主屬性比上場最弱那張高就對調。上場制關＝[]
  function lineupPrep(run, content) {
    if (!lineupOn(run) || !luRound(run) || run.over || run.duel || run.pending) return [];
    const n = luN(content), bag = run.bag || [];
    const fresh0 = Array.isArray(run.lineup) ? run.lineupFresh.some(id => bag.includes(id) && !run.lineup.includes(id)) : false;
    if (!run.lineupDue && !fresh0 && !((run.bench || []).length && canShop(run) && luCfg(content).benchMode === 'swap')) return [];
    // 只動上場／替補那幾個陣列：淺拷貝就夠（luChoose 只改 lineup、bench、rested、lineupDue），不用整個 run 深拷貝
    const r = Object.assign({}, run, { lineup: Array.isArray(run.lineup) ? run.lineup.slice() : run.lineup, bench: (run.bench || []).slice(), lineupFresh: run.lineupFresh.slice(),
      rested: Array.isArray(run.rested) ? run.rested.slice() : run.rested }), out = [];
    const go = ch => { const x = luChoose(r, content, ch); if (x && x.ok) out.push(ch); return !!(x && x.ok); };
    if (r.lineupDue) { const P0 = lineupPolicy(r, content); go({ type: 'lineup', ids: P0.ids, bench: P0.bench }); }
    if (!Array.isArray(r.lineup)) return out;
    for (let g = 0; g < 8; g++) {
      const mains = luMains(r, content), sc = id => luScoreOf(r, content, id, mains);
      const cand = r.lineupFresh.filter(id => bag.includes(id) && !r.lineup.includes(id)).sort((a, b) => sc(b) - sc(a) || (a < b ? -1 : a > b ? 1 : 0))[0];
      if (cand == null) break;
      if (r.lineup.length < Math.min(n, bag.length)) { if (!go({ type: 'lineupSwap', inId: cand, outId: null })) break; continue; }
      const worst = r.lineup.slice().sort((a, b) => sc(a) - sc(b) || r.lineup.indexOf(a) - r.lineup.indexOf(b))[0];
      if (!(sc(cand) > sc(worst) + 1e-9) || !go({ type: 'lineupSwap', inId: cand, outId: worst })) break;
    }
    if (r.bench.length && canShop(r) && luCfg(content).benchMode === 'swap') {
      const m = [mainAt(r, content, r.pos)], sc1 = id => luScoreOf(r, content, id, m);
      const b = r.bench.slice().sort((x, y) => sc1(y) - sc1(x) || r.bench.indexOf(x) - r.bench.indexOf(y))[0];
      const w = r.lineup.slice().sort((x, y) => sc1(x) - sc1(y) || r.lineup.indexOf(x) - r.lineup.indexOf(y))[0];
      if (b != null && w != null && sc1(b) > sc1(w) + 1e-9) go({ type: 'benchSwap', inId: b, outId: w });
    }
    return out;
  }
  // 讀檔整理（畫面 fixRun 叫；SPEC-I §10）：o.on／o.wear＝上場制／耐聽開著沒（沒給＝content 的 on；?lineup=1 的畫面開機已經把 content 兩個都設 true）。
  //   開著：缺的補（lineup null、bench／lineupFresh／rested []、lineupDue false、wear {}、lineupFrom）、型別錯的換掉、不在包包的拿掉、wear 形狀不對的丟、上場空一格＝lineupDue；
  //   關著（退回、舊 run 帶這些鍵）：這些鍵整個拿掉＝跟上場制之前的 run 一樣（整個包包上場、pending.lineup 拿掉＝攤位照舊收攤）。回 true＝有改
  function fixLineup(run, content, o) {
    if (!run || typeof run !== 'object' || !Array.isArray(run.bag)) return false;
    const before = JSON.stringify(run), on = o && o.on != null ? !!o.on : !!luCfg(content).on, won = o && o.wear != null ? !!o.wear : !!wearCfg(content).on;
    const has = id => typeof id === 'string' && run.bag.includes(id);
    const ids = a => Array.isArray(a) ? a.filter((id, k, x) => has(id) && x.indexOf(id) === k) : [];
    if ((on || won) && !(Number.isInteger(run.lineupFrom) && run.lineupFrom > 0)) run.lineupFrom = luCfg(content).from | 0;
    // 修正棒 11-22：攤位 pending 不再帶 lineup 鍵。施工期間的存檔停在「上場那一步」（有 lineup 鍵、q 走完、選過組、沒站在開）＝當成收攤
    //   （開著：lineupDue 照舊 → 來客畫面開上場面板；關著＝退回現況。原本關著只拿掉鍵、pending 留著 → 攤位 next() 直接收攤 → 回來客畫面 → 又是攤位，無限遞迴）
    const P = run.pending;
    if (P && typeof P === 'object' && P.type === 'stall' && 'lineup' in P) {
      const step = P.pick != null && Array.isArray(P.q) && Number.isInteger(P.k) && P.k >= P.q.length && !P.cur;
      if (step) { run.pending = null; if (on && luRound(run) && !Array.isArray(run.lineup)) run.lineupDue = true; } else delete P.lineup;
    }
    if (P && typeof P === 'object' && (P.type === 'reward' || P.type === 'level') && 'luLate' in P) { if (on) P.luLate = ids(P.luLate); else delete P.luLate; }   // 寶箱那張（choose 包裝層）
    if (Array.isArray(run.wornLate) || 'wornLate' in run) {           // 說情重打那位：第一場聽膩的（finishFight）
      const wl = won && Array.isArray(run.wornLate) ? run.wornLate.filter(x => x && has(x.id) && Number.isInteger(x.n) && x.n > 0) : [];
      if (wl.length) run.wornLate = wl; else delete run.wornLate;
    }
    if (on) {
      run.lineupFresh = ids(run.lineupFresh);
      run.lineup = Array.isArray(run.lineup) ? ids(run.lineup).slice(0, luN(content)) : null;
      if (run.lineupBonus != null && !(Number.isInteger(run.lineupBonus) && run.lineupBonus > 0)) delete run.lineupBonus;
      run.bench = ids(run.bench).filter(id => !(run.lineup || []).includes(id)).slice(0, benchN(run, content));
      run.lineupDue = run.lineupDue === true;
      if (Array.isArray(run.lineup) && luRound(run) && run.lineup.length < Math.min(luN(content), run.bag.length)) run.lineupDue = true;
    } else {
      for (const k of ['lineup', 'bench', 'lineupFresh', 'lineupDue', 'lineupBonus']) delete run[k];
    }
    if (won) {
      if (!wearOn(run)) run.wear = {};
      for (const id of Object.keys(run.wear)) { const w = run.wear[id]; if (!has(id) || !w || typeof w !== 'object' || !Number.isInteger(w.g) || !Number.isInteger(w.n) || w.g < 0 || w.n < 0) delete run.wear[id]; }
      if (run.wearPos != null && !Number.isInteger(run.wearPos)) delete run.wearPos;
    } else { delete run.wear; delete run.wearPos; }
    if (on || won) run.rested = ids(run.rested); else { delete run.rested; delete run.lineupFrom; }
    return JSON.stringify(run) !== before;
  }
  // ============================================================================================================================
  // 活店第二階段：切磋（＝店主說的遭遇戰；scratchpad v5/liveshop SPEC-H §7、§8、§13；給畫面棒 4b 與 sim 的契約 p2/CONTRACT.md）
  //   店主原話：「遭遇戰：跟主線分開的獎勵性對決，客人主動來嗆，可以選擇不打；打贏拿錢或唱片，輸了不扣主線進度」。
  //   欄位一律叫 spar（規格寫 run.enc／run.stats.enc；第 I 波翻面已經佔用 run.stats.enc、run.encCarry、duel.p.enc）：
  //     run.spar＝最近一筆 { round, pos, who, state:'offer'|'fighting'|'won'|'lost'|'declined'|'lapsed'|'void', mode?:'shelf'|'bag', loot?:{cards:[3], src:[3]}, taken?:id, skipped?:true }
  //       （下一次邀請整筆換掉；mode＝打贏那一刻的獎勵模式，收／不收照它）
  //     run.stats.spar＝這一趟的帳 { offered, accepted, won, lost, took, cash }（不進 runSummary）；不收的錢記 run.stats.c.income.spar（wcEarn）
  //   狀態機：（沒有／別位的）—encOpen→ offer —encAccept→ fighting —encFinish→ won|lost；offer —encDecline→ declined（{lapse:true}→ lapsed）；
  //           fighting —encVoid→ void（重新整理在打＝作廢，不能靠重整重打到贏）；won —encTake／encSkip→ won（taken／skipped，只能一次）
  //   亂數全部 hash01／fnv1a32（不吃 run.rng：主線之後的開打種子、配件獎勵一個都不變）。主線欄位一個都不動：encStart 用 run 的深拷貝開局、
  //     encFinish 只寫 run.spar 與 run.stats.spar；encSkip 只加錢；包包模式的 encTake 走主線拿牌記帳（不進 drops）。
  //   切磋那場沒有翻面（fightSetup encore:false；不讀、不吃、不寫 run.encCarry）、不給經驗（不碰 level／xp）、不給聲望回復、連勝、樂歷。
  // ============================================================================================================================
  const SPAR_STATES = ['offer', 'fighting', 'won', 'lost', 'declined', 'lapsed', 'void'];
  const SPAR_KEYS = ['offered', 'accepted', 'won', 'lost', 'took', 'cash'];
  const SPAR_MODES = ['shelf', 'bag'];
  const SPAR_POLICIES = ['always', 'never', 'smart', 'cash'];
  const SPAR = { on: false, reward: 'shelf', from: 6, p: 0.5, perRound: 1, slots: [0, 1, 2], lapse: 30000, short: 0.6, noDareRound: true, noStall: true, ace: false, posAdd: 0, tierAdd: 0, tierFrom: 1, deckAt: 'eff' };
  // content.encounter（沒給的欄位用 SPAR）；slots 只收一般客人位（菁英、藏家位不出：藏家那輪的寶箱不會跟切磋戰利品列連出）
  //   posAdd（下半，主線 11-21 裁定）＝切磋強度的位移：等效位數 posEff＝max(1, run.pos＋熟客自己的 off（−2～+2，個性差）＋位移)；
  //     整數＝全程同一個位移（|x| ≤ 99）；或照位數走的折線 [[第幾位, 位移], …]（第幾位遞增、位移 |x| ≤ 99、最多 12 個點；兩點之間線性內插後四捨五入、頭尾之外照頭尾）——
  //     審查修正（p2b）：全程 +31 讓第 6 位的熟客＝第 37 位客人（前期比主線難很多、後段又比主線好打），改成跟著位數走。不合法＝0
  function sparAddOk(x) {
    if (Number.isInteger(x)) return Math.abs(x) <= 99;
    if (!Array.isArray(x) || !x.length || x.length > 12) return false;
    return x.every((k, i) => Array.isArray(k) && k.length === 2 && Number.isInteger(k[0]) && k[0] >= 1 && Number.isInteger(k[1]) && Math.abs(k[1]) <= 99 && (i === 0 || k[0] > x[i - 1][0]));
  }
  // 第 pos 位的位移（sparCfg 驗過的 posAdd）
  function sparAddAt(posAdd, pos) {
    if (Number.isInteger(posAdd)) return posAdd;
    if (!Array.isArray(posAdd) || !posAdd.length) return 0;
    const p = pos | 0;
    if (p <= posAdd[0][0]) return posAdd[0][1];
    for (let i = 1; i < posAdd.length; i++) {
      const [p1, a1] = posAdd[i], [p0, a0] = posAdd[i - 1];
      if (p <= p1) return Math.round(a0 + (a1 - a0) * (p - p0) / (p1 - p0));
    }
    return posAdd[posAdd.length - 1][1];
  }
  function sparCfg(content) {
    const s = (content && content.encounter) || {}, X = Object.assign({}, SPAR, s);
    X.on = X.on === true;
    X.reward = SPAR_MODES.includes(X.reward) ? X.reward : 'shelf';
    X.from = Number.isInteger(X.from) && X.from >= 1 ? X.from : SPAR.from;
    X.p = typeof X.p === 'number' && X.p >= 0 ? Math.min(1, X.p) : SPAR.p;
    X.short = typeof X.short === 'number' && X.short > 0 ? Math.min(1, X.short) : SPAR.short;
    X.posAdd = sparAddOk(X.posAdd) ? (Array.isArray(X.posAdd) ? X.posAdd.map(k => k.slice()) : X.posAdd) : SPAR.posAdd;
    X.tierAdd = sparAddOk(X.tierAdd) ? (Array.isArray(X.tierAdd) ? X.tierAdd.map(k => k.slice()) : X.tierAdd) : SPAR.tierAdd;
    X.tierFrom = Number.isInteger(X.tierFrom) && X.tierFrom >= 1 ? X.tierFrom : SPAR.tierFrom;
    X.deckAt = ['base', 'pos'].includes(X.deckAt) ? X.deckAt : 'eff';   // 他的牌組照哪個位數補星：eff＝等效位數（含位移與 off）、base＝pos＋off、pos＝第幾位（＝同一位的主線一般客人）
    X.slots = (Array.isArray(X.slots) ? X.slots : SPAR.slots).filter((k, i, a) => Number.isInteger(k) && POS_CLASSES[k] === 'normal' && a.indexOf(k) === i);
    return X;
  }
  // 這次用哪種獎勵模式：o.reward（畫面 ?enc=bag、sim --enc-reward）＞ content.encounter.reward ＞ 'shelf'
  function sparMode(content, o) { return o && SPAR_MODES.includes(o.reward) ? o.reward : sparCfg(content).reward; }
  // 唱片櫃擁有：o.owned（函式／陣列／{id:{own}}；sim 給這一趟收過的）＞ 畫面 setCtx 的 owned（WC_CTX）＞ 沒有（全不算擁有）
  function sparOwned(o) {
    if (o && o.owned != null) { const f = ownedFn(o.owned); return id => { try { return !!f(id); } catch (_) { return false; } }; }
    return ctxOwned();
  }
  function sparStats(run) {
    const S = run.stats || (run.stats = {});
    if (!S.spar || typeof S.spar !== 'object' || Array.isArray(S.spar)) S.spar = {};
    for (const k of SPAR_KEYS) if (!(Number.isInteger(S.spar[k]) && S.spar[k] >= 0)) S.spar[k] = 0;
    return S.spar;
  }
  const ceil6 = x => Math.ceil(Math.round(x * 1e6) / 1e6);    // 0.6×12＝7.199999… 照 7.2 進位成 8（浮點誤差不多進一）
  // 誰來嗆：熟客照 encW 權重（hash01(seedKey#runNo#encWho#pos)）；沒有牌組的熟客不出
  function sparWho(content, key, pos) {
    const R = (content && content.regulars) || {};
    const ids = Object.keys(R).filter(id => R[id] && +R[id].encW > 0 && R[id].enc && Array.isArray(R[id].enc.deck) && R[id].enc.deck.length);
    const tot = ids.reduce((s, id) => s + +R[id].encW, 0);
    if (!(tot > 0)) return null;
    let u = hash01(key + 'encWho#' + pos) * tot;
    for (const id of ids) { u -= +R[id].encW; if (u < 0) return id; }
    return ids[ids.length - 1];
  }
  // encOffer(run, content) -> {round, pos, who} | null（純函式；畫面與 sim 共用；不看 run.spar——同一位已經開過由 choose encOpen 擋）
  //   出：開關開、主線下一步是對決（nextStep 'fight'：攤位、領獎、升級、說情、序章、打到一半、run.over 都不出）、run.pos ≥ from、
  //       這一輪 hash01(seedKey#runNo#enc#round) < p、這一位＝slots[⌊hash01(seedKey#runNo#encSlot#round)×slots 數⌋]、不是接了踢館帖的那一輪
  function encOffer(run, content) {
    const X = sparCfg(content);
    if (!X.on || !run || typeof run !== 'object' || !X.slots.length) return null;
    if (nextStep(run) !== 'fight') return null;
    const pos = run.pos | 0;
    if (pos < X.from) return null;
    const round = roundOf(pos), idx = (pos - 1) % PER_ROUND, key = run.seedKey + '#' + run.runNo + '#';
    if (X.noDareRound !== false && run.dare && run.dare.round === round) return null;
    if (!(hash01(key + 'enc#' + round) < X.p)) return null;
    if (X.slots[Math.floor(hash01(key + 'encSlot#' + round) * X.slots.length) % X.slots.length] !== idx) return null;
    const who = sparWho(content, key, pos);
    return who ? { round, pos, who } : null;
  }
  // 他的切磋句（content.chat 的 encDare／encYes／encLose／encWin；棒 3d）→ 對決用的四鍵：line＝口頭禪、intro＝接受時那句、lose＝他輸了（陣列）、win＝他贏了（陣列）。
  //   下半（照棒 3d 交件）：四鍵指定 id 尾巴（SPAR_LINE_IDS；<who>-encDare-03 這種）——嗆那句（encDare-01、02）留給來客畫面的邀請泡泡、
  //     「唱片你挑」那句（encLose-01）與安慰那句（encWin-02）留給打完回來客畫面時說，對決裡（duel.js pickLine）說另外那句，不重複。
  //   指定的那句沒有（台詞改了 id）＝退回舊對應：line／intro 那一類第一句、lose／win 那一類全部。
  //   一句多泡（text 是陣列）＝接起來當一個泡泡。那一類都沒有＝不給那個鍵（duel.js pickLine 回 null＝不說）
  //   審查修正 p2b：不給 line（duel.js 開場讀 lines.line || lines.intro，給了 line，答應那句 encYes 永遠不出）——盤面開場＝他答應那句 encYes；嗆那三句（encDare-01～03）都留給邀請泡泡
  const SPAR_LINE_IDS = { intro: ['encYes', '01'], lose: ['encLose', '02'], win: ['encWin', '01'] };
  function sparLines(content, who) {
    const L = Array.isArray(content && content.chat) ? content.chat : [];
    const txt = x => Array.isArray(x.text) ? x.text.filter(t => typeof t === 'string').join('') : typeof x.text === 'string' ? x.text : '';
    const of = cat => L.filter(x => x && x.who === who && x.cat === cat);
    const out = {};
    for (const k of Object.keys(SPAR_LINE_IDS)) {
      const [cat, tail] = SPAR_LINE_IDS[k], all = of(cat), pin = all.filter(x => x.id === who + '-' + cat + '-' + tail).map(txt).filter(Boolean);
      const got = pin.length ? pin : all.map(txt).filter(Boolean);
      if (!got.length) continue;
      out[k] = k === 'lose' || k === 'win' ? got : got[0];
    }
    return out;
  }
  // encView(content, who) -> content 的淺拷貝：enemies[who]（名字、avatar＝他的 look、聲音、牌組、品味、頻率）與 lines[who]（四鍵）多這位熟客；
  //   C.enemies／C.lines 一個字都不改（duel.js 一行不改：SCREENS.duel／duelTitle 讀 p.view 就找得到他）。不是熟客＝null
  function encView(content, who) {
    const R = content && content.regulars && content.regulars[who];
    if (!R || !R.enc || !Array.isArray(R.enc.deck)) return null;
    const X = R.enc, lines = sparLines(content, who);
    const en = { id: who, name: R.name, spr: null, avatar: R.look || null, honesty: X.honesty || 'sometimes', hp: trialCfg(content).guestHp.normal,
      taste: X.taste || 'coh', tune: X.tune || null, deck: X.deck.slice(), voice: R.voice ? Object.assign({}, R.voice) : null, regular: true };
    if (lines.line) en.line = lines.line;
    return Object.assign({}, content, { enemies: Object.assign({}, content.enemies, { [who]: en }), lines: Object.assign({}, content.lines, { [who]: lines }) });
  }
  // 試煉階級的位移（合併審查 F2）：content.encounter.tierAdd 在第 tier 階的值——寫法同 posAdd（整數＝第 1 階起都一樣；折線 [[第幾階, 位移], …] 兩點之間線性內插），
  //   只在第 tierFrom 位起加（pos 沒給＝不看位數）；第 0 階一律 0（跟沒有這兩個鍵逐字相同）。為什麼：試煉的「小氣／更小氣」與菁英、藏家加聲望只壓主線
  //   （打贏少回、打過藏家的累積傷），切磋開打一律 ceil(short×maxHp) 吃不到 → 階數越高、越後面，切磋相對同段主線越好打
  //   （n4000 會讀的：第 8 階 16–45 位 +4.5／+5.5／+4.6、第 13 階 11–15 位 +7.3；LS5 分段上限 +4）；第 6–10 位每一階都沒漂（第 13 階一般玩家已經 −4.7）＝從第 11 位起補
  function sparTierAt(X, tier, pos) { return (tier | 0) > 0 && (pos == null || (pos | 0) >= X.tierFrom) ? sparAddAt(X.tierAdd, tier | 0) : 0; }
  // 等效位數：max(1, run.pos＋off[who]＋位移＋階級位移)（off＝棋力個性差：小魚 −2 … 周姐 +2；位移＝content.encounter.posAdd 在這一位的值（sparAddAt），強度用；
  //   階級位移＝content.encounter.tierAdd 在 run.tier 的值、第 tierFrom 位起（sparTierAt；第 0 階 0））。
  //   base true＝兩種位移都不加（＝規格 §7.4 的 posEff；encLoot 補牌池用：獎勵不跟著強度旋鈕變）
  function sparPos(run, content, who, base) {
    const R = content.regulars && content.regulars[who], off = R && R.enc && Number.isInteger(R.enc.off) ? R.enc.off : 0;
    if (base) return Math.max(1, (run.pos | 0) + off);
    const X = sparCfg(content);
    return Math.max(1, (run.pos | 0) + off + sparAddAt(X.posAdd, run.pos) + sparTierAt(X, run.tier, run.pos));
  }
  // sparDeck(content, who, posEff, {main, tier}) -> [cards]：熟客的牌組（主線 11-21 裁定「牌組身分跟強度分開」）——一律他自己 C.regulars[who].enc.deck 那 7 張、
  //   照原順序、不換牌（trialDeck 的總星下限會把他的牌換光＝戰利品不再是他的唱片）；星數照等效位數的 trialDeck 規則「只補星」：
  //   ① 加星：b＝⌊(posEff−buffFrom)/buffEvery⌋ 加在 m 軸（有主屬性且那張主屬性那軸是峰值＝主屬性，否則 topAttr；同 trialDeck），封頂 buffCap
  //   ② 補到下限：總星還不到 fl＝floorAt(posEff)（trialDeck 會把這張換掉的那種）→ m 軸先補（封頂 buffCap），還不夠就從最低那軸一星一星往上補（並列照 c→o→h），每軸封頂 buffCap
  //   每張都是他自己的一份（對決狀態不共用物件）；plus＝m 軸總共加的 {attr, n}（同 trialDeck）、fill＝其他軸補的 {o:2, h:1}（有才給）。頂點卡／王牌不加（他的牌本來就沒有）
  function sparDeck(content, who, posEff, o) {
    o = o || {};
    const R = content.regulars && content.regulars[who]; if (!R || !R.enc || !Array.isArray(R.enc.deck)) throw new Error('engine: unknown regular ' + who);
    const K = trialCfg(content, o.tier).curve.deck, d = Math.max(1, posEff | 0), cap = K.buffCap;
    const fl = floorAt(content, d, o.tier), b = Math.floor(Math.max(0, d - K.buffFrom) / K.buffEvery);
    const M = ATTRS.includes(o.main) && +K.mainShare > 0 ? o.main : null;
    return R.enc.deck.map(id => {
      const g = cardFrom(content, id), c = Object.assign({}, g);
      if (c.tier) return c;
      const m = M && star(g, M) === peak(g) ? M : topAttr(g), s0 = star(g, m), fill = {};
      c[m] = Math.min(cap, Math.max(s0, s0 + b));
      if (power(c) < fl && c[m] < cap) c[m] = Math.min(cap, c[m] + (fl - power(c)));
      for (let k = 0; power(c) < fl && k < 3 * cap; k++) {
        const low = ATTRS.filter(a => a !== m && star(c, a) < cap).sort((a, z) => star(c, a) - star(c, z))[0];   // sort 穩定：並列照 c→o→h
        if (!low) break;
        c[low] = star(c, low) + 1; fill[low] = (fill[low] | 0) + 1;
      }
      if (c[m] !== s0) c.plus = { attr: m, n: c[m] - s0 };
      if (Object.keys(fill).length) c.fill = fill;
      return c;
    });
  }
  // encDef(run, content, who) -> eDef：同一條 V3 曲線的一般客人（enemyDef at posEff、cls normal；品味、底氣、說真話、讀你、半指、不露、被唬多扣、放水全照主線；
  //   posEff 含 content.encounter.posAdd），主屬性＝enc.main；牌組＝他自己的 7 張（sparDeck：不換牌、只照 posEff 補星；下半改，原本照 trialDeck 換牌）；
  //   不帶王牌（encounter.ace true＝照一般客人在 posEff 的機率帶，試調用）、沒有稱號、不吃踢館帖（不走 guestDef）；聲望＝上限＝ceil(short × 那位一般客人的聲望)
  function encDef(run, content, who) {
    const view = encView(content, who);
    if (!view) throw new Error('engine: unknown regular ' + who);
    const R = content.regulars[who], X = sparCfg(content), posEff = sparPos(run, content, who), main = ATTRS.includes(R.enc.main) ? R.enc.main : null;
    const d = enemyDef(view, who, { pos: posEff, cls: 'normal', seedKey: run.seedKey + '#enc', runNo: run.runNo, playerAce: run.ace, tier: run.tier, main,
      deckIds: R.enc.deck });                                 // deckIds＝釘住他的 7 張（trialDeck 不去換牌；王牌那顆雜湊照舊），下一行換成 sparDeck 補星的版本
    d.deck = sparDeck(view, who, X.deckAt === 'pos' ? Math.max(1, run.pos | 0) : X.deckAt === 'base' ? sparPos(run, content, who, true) : posEff, { main, tier: run.tier });
    if (run.fac) { const FA = facGuestAdd(run, content, Math.max(1, run.pos | 0)); d.hp += FA.hp; d.atk += FA.atk; }   // 第 D 波棒三：?fac=1 那一趟同一位的主線客人多幾，切磋跟著多（照第幾位、不照等效位數：切磋強度是對「同段主線客人」量的）；旗標關一行不走
    d.hp = Math.max(1, ceil6(X.short * d.hp));
    if (X.ace !== true) d.ace = null;                         // 規格：不帶王牌（encounter.ace true＝照一般客人的機率帶，只給試調強度用；出貨不開）
    d.title = null;
    return d;
  }
  // encStart(run, content, {apex}) -> {duel, events, enemyId:who, view} | null：run.spar 是這一位的 'fighting'（choose encAccept 之後）才開。
  //   你這一邊走 fightSetup（跟 startFight 同一個入口；頂點卡、〔D〕被動與第二招、配件照主線），差別只有：聲望＝上限＝ceil(short × run.maxHp)（不看你現在剩多少）、
  //   沒有翻面、種子＝fnv1a32(seedKey#runNo#enc#pos#who)、提示句看過的給拷貝不寫回。用 run 的深拷貝開局：run 一個欄位都不動（run.duel 照舊 null，不存檔、不會被當主線 resumed）
  //   duel.spar＝{round, pos, who}（encFinish 認這場）
  function encStart(run, content, o) {
    const S = run && run.spar;
    if (!S || S.state !== 'fighting' || S.pos !== run.pos || run.over || run.duel || run.pending) return null;
    const view = encView(content, S.who); if (!view) return null;
    const r = clone(run), X = sparCfg(content);
    const eDef = encDef(r, content, S.who), hp = Math.max(1, ceil6(X.short * (Number.isInteger(r.maxHp) && r.maxHp > 0 ? r.maxHp : CFG.playerHp)));
    const seed = fnv1a32(r.seedKey + '#' + r.runNo + '#enc#' + S.pos + '#' + S.who) || 1;
    const F = fightSetup(r, view, { eDef, seed, apex: !!(o && o.apex), encore: false, hp });
    const d = startDuel(F.pDef, F.eDef, F.opts);
    d.duel.spar = { round: S.round, pos: S.pos, who: S.who };
    return { duel: d.duel, events: d.events, enemyId: S.who, view };
  }
  // encLoot(run, content, duel, {reward, owned}) -> {cards:[3], src:[3]}（新函式，lootRow 一個字不動）：他這場的牌（沒出過的先：雜湊最小那張沒出過的、再照雜湊補）＋
  //   不夠從 wcPool(wcTh(posEff, 'power')) 用 wcPick 補（src 'fill'；posEff＝pos＋off，不加 posAdd）——跟主線打贏一般客人的戰利品列同一套挑法；種子鍵 seedKey#runNo#enc#pos。
  //   唱片櫃模式跳過已擁有（他的牌直接跳過、補牌時擁有的排最後）；包包模式跳過包包裡的。沒有金邊、沒有紅包、不碰 wcStats、不寫 run.road
  function encLoot(run, content, duel, o) {
    const S = run.spar || {}, pos = S.pos || run.pos, who = S.who || (duel && duel.e && duel.e.id);
    const mode = sparMode(content, Object.assign({}, o, S.mode ? { reward: S.mode } : {})), n = wcCfg(content).loot.n, key = wcKey(run, 'enc#' + pos);
    const owned = mode === 'shelf' ? sparOwned(o) : null, has = mode === 'bag' ? (id => run.bag.includes(id)) : (id => !!(owned && owned(id)));
    const met = uniq(((duel && duel.e && duel.e.thrown) || []).map(c => c && c.id).filter(Boolean));
    const deck = uniq(((duel && duel.e && duel.e.deckIds) || []).filter(id => content.cards[id] && !content.cards[id].tier && !has(id)));
    const h = id => hash01(key + '#d#' + id);
    const unplayed = deck.filter(id => !met.includes(id)).sort((a, b) => h(a) - h(b));
    const cards = [], src = [];
    if (unplayed.length) { cards.push(unplayed[0]); src.push('unplayed'); }
    for (const id of deck.slice().sort((a, b) => h(a) - h(b))) { if (cards.length >= n) break; if (!cards.includes(id)) { cards.push(id); src.push(met.includes(id) ? 'played' : 'unplayed'); } }
    if (cards.length < n) {
      const R = content.regulars && content.regulars[who], posEff = R ? sparPos(run, content, who, true) : run.pos;   // 補牌池：規格 posEff（不加 posAdd：獎勵不跟強度旋鈕變）
      const bag = mode === 'bag' ? run.bag || [] : [], skip = new Set([].concat(cards, bag, run.road || []));
      skip.hard = new Set([].concat(cards, bag));
      for (const id of wcPick(wcPool(content, wcTh(content, posEff, 'power', run.tier)), key + '#fill', n - cards.length, skip, null, owned)) { cards.push(id); src.push('fill'); }
    }
    return { cards, src };
  }
  // encFinish(run, content, duel, {reward, owned}) -> {win, loot:{cards,src}|null, hands, by} | {error}：只寫 run.spar（state won|lost、mode、loot）與 run.stats.spar
  function encFinish(run, content, duel, o) {
    const S = run && run.spar;
    if (!S || S.state !== 'fighting') return { error: 'notFighting' };
    if (!duel || !duel.over) return { error: 'notOver' };
    if ((duel.spar && (duel.spar.pos !== S.pos || duel.spar.who !== S.who)) || (duel.e && duel.e.id !== S.who)) return { error: 'notThisSpar' };
    const T = sparStats(run), win = !!duel.over.win;
    if (win) { S.state = 'won'; S.mode = sparMode(content, o); S.loot = encLoot(run, content, duel, o); T.won++; }
    else { S.state = 'lost'; T.lost++; }
    return { win, loot: win ? clone(S.loot) : null, hands: duel.stats ? duel.stats.hands : 0, by: duel.over.by };
  }
  // encVoid(run) -> bool：打到一半重新整理（state fighting）→ void（不給不扣）
  function encVoid(run) {
    const S = run && run.spar;
    if (!S || S.state !== 'fighting') return false;
    S.state = 'void';
    return true;
  }
  // fixEnc(run, content?) -> bool（有改）：讀檔整理（fixWaveC 旁邊）。run.spar 形狀不對就刪；'offer' 但 pos 不是 run.pos（舊分頁打過那一位了）就刪；
  //   'fighting' 留著（交給來客畫面判作廢：encVoid）；content 有給時：who 要是 C.regulars 的鍵、loot 濾掉卡池沒有的卡（同 fixWaveC）。
  //   run.stats.spar 不是物件就刪、數字不是非負整數改 0。validRun 不擋這兩個欄位（舊分頁照主線打）
  function fixEnc(run, content) {
    if (!run || typeof run !== 'object') return false;
    let ch = false;
    if ('spar' in run) {
      const S = run.spar, pi = x => Number.isInteger(x) && x >= 1, sid = x => typeof x === 'string' && x.length > 0 && x.length <= 200;
      const L = S && S.loot;
      const good = !!S && typeof S === 'object' && !Array.isArray(S) && pi(S.pos) && pi(S.round) && S.round === roundOf(S.pos) && sid(S.who) && SPAR_STATES.includes(S.state)
        && (!content || !content.regulars || !!content.regulars[S.who])
        && (S.mode == null || SPAR_MODES.includes(S.mode))
        && (L == null || (typeof L === 'object' && Array.isArray(L.cards) && Array.isArray(L.src) && L.cards.length === L.src.length && L.cards.every(sid) && L.src.every(x => typeof x === 'string')))
        && (S.state !== 'won' || !!L) && (S.taken == null || (sid(S.taken) && !!L && L.cards.includes(S.taken))) && (S.skipped == null || S.skipped === true) && !(S.taken != null && S.skipped);
      if (!good || (S.state === 'offer' && S.pos !== run.pos)) { delete run.spar; ch = true; }
      else if (content && content.cards && L) {
        const keep = L.cards.map((id, i) => content.cards[id] || id === S.taken ? i : -1).filter(i => i >= 0);
        if (keep.length !== L.cards.length) { L.src = keep.map(i => L.src[i]); L.cards = keep.map(i => L.cards[i]); ch = true; }
      }
    }
    if (run.stats && typeof run.stats === 'object' && 'spar' in run.stats) {
      const T = run.stats.spar;
      if (!T || typeof T !== 'object' || Array.isArray(T)) { delete run.stats.spar; ch = true; }
      else for (const k of SPAR_KEYS) if (!(Number.isInteger(T[k]) && T[k] >= 0)) { T[k] = 0; ch = true; }
    }
    return ch;
  }
  // encPolicy(run, content, {policy, reward, owned}) -> 下一個 choose | null（自動玩與 sim 共用；fighting 時回 null＝呼叫的人去 encStart → 打 → encFinish）
  //   policy：'always' 每個都接、贏了一律收（唱片櫃：沒擁有的先；包包：漲最多的那張、不漲也收）｜'never' 每個都改天｜
  //           'smart'（預設＝最會撿便宜的：零風險一律接；唱片櫃模式沒擁有就收、都擁有就拿錢；包包模式照主線戰利品列的挑法（runPolicy：bagScore 漲才收）否則拿錢）｜
  //           'cash'（sim 壓力測試：每個都接、一律拿錢＝唱片櫃模式對這一趟最有利的上界）
  function encPolicy(run, content, o) {
    o = o || {};
    const pol = SPAR_POLICIES.includes(o.policy) ? o.policy : 'smart', S = run && run.spar;
    if (!run || run.over) return null;
    if (S && S.state === 'offer' && S.pos === run.pos) return pol === 'never' ? { type: 'encDecline' } : { type: 'encAccept' };
    if (S && S.state === 'won' && S.taken == null && !S.skipped) {
      if (run.duel) return null;
      const cards = ((S.loot && S.loot.cards) || []).filter(id => cardOf(content, id));
      if (pol === 'cash' || !cards.length) return { type: 'encSkip' };
      const cOf = id => cardOf(content, id), order = cards.slice().sort((a, b) => peak(cOf(b)) - peak(cOf(a)) || power(cOf(b)) - power(cOf(a)));
      if ((S.mode || sparMode(content, o)) === 'bag') {
        const base = bagScore(content, run.bag, run);
        let pick = null, gain = pol === 'always' ? -Infinity : BAG_EPS;
        for (const id of order) { if (run.bag.includes(id)) continue; const g = bagScore(content, run.bag.concat([id]), run) - base; if (g > gain) { gain = g; pick = id; } }
        return pick ? { type: 'encTake', id: pick } : { type: 'encSkip' };
      }
      const owned = sparOwned(o), fresh = order.find(id => !(owned && owned(id)));
      return fresh ? { type: 'encTake', id: fresh } : pol === 'always' ? { type: 'encTake', id: order[0] } : { type: 'encSkip' };
    }
    if (S && S.pos === run.pos && S.round === roundOf(run.pos)) return null;   // 這一位的切磋已經開過（改天、打完、作廢）
    return encOffer(run, content) ? { type: 'encOpen' } : null;
  }
  // encPending(run) -> 'offer'|'fighting'|'loot'|null：畫面要處理的切磋（給 4b 少寫一份判斷）。
  //   'offer'＝這一位的邀請還在等（重新整理照樣在對戰台等）；'fighting'＝打到一半（重新整理＝encVoid 作廢）；'loot'＝打贏還沒收／拿錢（擋「下一位」、重開戰利品列）；
  //   null＝沒有要處理的（沒開過、改天、沒理他、輸了、作廢、收完）＝照常演主線客人
  function encPending(run) {
    const S = run && run.spar;
    if (!S || typeof S !== 'object') return null;
    if (S.state === 'offer') return S.pos === run.pos ? 'offer' : null;
    if (S.state === 'fighting') return 'fighting';
    if (S.state === 'won' && S.taken == null && !S.skipped) return 'loot';
    return null;
  }
  // choose 的五種（在 choose 裡 switch；這裡是共用的檢查）：run.spar 是這一位的 offer（接受／改天）
  const sparOfferNow = run => { const S = run.spar; return !!S && S.state === 'offer' && S.pos === run.pos; };

  // ---------- 模擬／自動遊玩的選擇（runPolicy 接不到的 pending 種類；SPEC-C §7.2）----------
  //   o：pickFirst（永遠選左邊）、firstSide（第一趟固定選哪邊）、dare 'auto'|'always'|'never'、dareHp（接帖要聲望 ≥ 幾成上限，預設 .7）、reserve（留底，預設 4000）、
  //      reroll（挖寶攤包包沒滿分時重翻一次）、takeSell（bagScore 不漲的照樣收、下一位前拿去櫃檯賣）、boostFirst（倉庫先拿加成配件）、levelMix
  function cPolicy(run, content, o) {
    o = o || {};
    const p = run.pending; if (!p) return null;
    const ST = wcCfg(content).stall;
    if (p.type === 'reward' || p.type === 'level' || p.type === 'retry') {
      const rp0 = runPolicy(run, content, o);
      if (o.takeSell && rp0 && rp0.type === 'skip' && p.type === 'reward' && p.kind && (p.cards || []).length && !p.cardDone &&
        !(p.need === 'cardOrRelic' && (p.relics || []).length && relicN(run, content) < CFG.relicMax)) {
        const best = p.cards.filter(id => !run.bag.includes(id)).sort((x, y) => priceOf(content, y) - priceOf(content, x))[0];
        if (best) { if (!Array.isArray(run.sellNext)) run.sellNext = []; run.sellNext.push(best); return { type: 'take', cardId: best }; }
      }
      return rp0;
    }
    if (p.type === 'draft') {
      const of = p.offer; if (!of) return null;
      if (of.kind === 'card') { const base = bagScore(content, run.bag, run); let best = null, g0 = -Infinity; for (const id of of.cards) { const g = bagScore(content, run.bag.concat([id]), run) - base; if (g > g0) { g0 = g; best = id; } } return best ? { type: 'draft', cardId: best } : null; }
      const mix = o.levelMix || LEVEL_MIX, want = mix[(run.picks || []).length % mix.length];
      const pk = ((of.offer || []).find(x => x.pick === want) || (of.offer || [])[0] || {}).pick;
      return pk ? { type: 'draft', pick: pk } : null;
    }
    if (p.type !== 'stall') return null;
    const reserve = o.reserve != null ? o.reserve : ST.gig.keep;
    if (p.pick == null && p.k >= p.q.length) {
      if (o.pickFirst) return { type: 'stallPick', group: 0 };
      if (p.first && o.firstSide != null) return { type: 'stallPick', group: o.firstSide };
      const val = g => g.reduce((s, k) => s + stallValue(run, content, k, reserve), 0);
      const v0 = val(p.groups[0]), v1 = p.groups[1] ? val(p.groups[1]) : -1;
      return { type: 'stallPick', group: v1 > v0 || (v1 === v0 && hash01(wcKey(run, 'pickTie#' + p.after)) < 0.5) ? 1 : 0 };
    }
    const cur = p.cur; if (!cur) return null;
    const base = bagScore(content, run.bag, run), gainOf = id => bagScore(content, run.bag.concat([id]), run) - base;
    const bestOf = ids => { let b = null, g = BAG_EPS; for (const id of ids || []) { if (run.bag.includes(id)) continue; const x = gainOf(id); if (x > g) { g = x; b = id; } } return b; };
    const act = (a, x) => Object.assign({ type: 'stallAct', act: a }, x || {});
    switch (cur.kind) {
      case 'dig': { const b = bestOf(cur.cards); if (b) return act('take', { cardId: b }); if (o.reroll && cur.rolls < 1 && base < 14.9 && run.money - reserve >= ST.reroll * (cur.rolls + 1)) return act('reroll'); return act('skip'); }
      case 'consignGet': { const b = bestOf(cur.cards) || (cur.cards || []).find(id => !run.bag.includes(id)); return b ? act('take', { cardId: b }) : act('skip'); }
      case 'trade': case 'market': {
        const afford = (cur.cards || []).filter(id => !run.bag.includes(id) && run.money - priceOf(content, id) >= reserve);
        const b = bestOf(afford); if (b) return act('buy', { cardId: b });
        if (cur.kind === 'market') {
          if (cur.bag) { const bb = bestOf(cur.bag) || cur.bag.find(id => content.cards[id] && !run.bag.includes(id)); if (bb) return act('bagTake', { cardId: bb }); return act('done'); }
          const n = ticketsFor(run, content, reserve); if (n > 0) return act('tickets', { n });
        }
        return act('done');
      }
      case 'gear': {
        if (relicN(run, content) < CFG.relicMax && (cur.relics || []).length && run.money - ST.gearPrice >= 0) return act('buyRelic', { relicId: cur.relics[0] });
        // 第 I 波 I-2 修正棒：側袋不佔配件格＝配件滿了看到也買（上場制開著才有這件）
        const sl = lineupOn(run) ? (cur.relics || []).find(id => isSlotRelic(content, id) && !run.relics.includes(id)) : null;
        if (sl && run.money - ST.gearPrice >= 0) return act('buyRelic', { relicId: sl });
        return act('done');
      }
      case 'warehouse': {
        if ((cur.relics || []).length && relicN(run, content) < CFG.relicMax) return act('relic', { relicId: (o.boostFirst && cur.relics.find(x => /^boost_/.test(x))) || cur.relics[0] });
        const b = bestOf(cur.cards); return b ? act('take', { cardId: b }) : act('skip');
      }
      case 'gig': return act('tickets', { n: ticketsFor(run, content, reserve) });
      case 'consign': { const dw = run.bag.filter(x => !isGift(run, content, x) && !isSeed(run, content, x) && deadWeight(content, run.bag, x, run)); return dw.length && run.bag.length > CFG.handSize ? act('consign', { cardId: dw[0] }) : act('skip'); }
      case 'dare': {
        const mode = o.dare === 'never' ? null : o.dare === 'always' ? 'tough' : (run.hp >= (o.dareHp != null ? o.dareHp : 0.7) * run.maxHp ? (hash01(wcKey(run, 'dareMode#' + p.after)) < 0.65 ? 'tough' : 'tank') : null);
        return mode ? act('accept', { mode }) : act('decline');
      }
      default: return act('ok');
    }
  }
  // 選組估值（合理玩家，不是最佳解；§7.2）
  function stallValue(run, content, k, reserve) {
    const ST = wcCfg(content).stall, sat = bagScore(content, run.bag) >= 14.9;
    switch (k) {
      case 'snack': return Math.min(ST.snackHp, run.maxHp - run.hp) * 1.0;
      case 'dig': return sat ? 0.4 : 2;
      case 'trade': return sat || run.money < reserve + 1000 ? 0.1 : 1.2;
      case 'gear': return relicN(run, content) < CFG.relicMax && run.money >= ST.gearPrice ? 1.5 : 0;
      case 'gig': return gigPrice(run, content, 1) <= run.money - reserve ? 1.0 : 0;
      case 'promo': return 0.6;
      case 'home': return 0.9;
      case 'fortune': return 0.3;
      case 'consign': return run.bag.length > CFG.handSize + 1 ? 0.5 : 0.1;
      case 'dare': return 0.2;
      case 'warehouse': return 1;
    }
    return 0;
  }
  const stallResume = stallEnter;                                  // 畫面用的名字（重新整理、cur 是 null 而且 k < q.length → 重進那一站）

  // 第 I 波 I-2：上場制／耐聽開著的 run＝四種上場選擇轉給 luChoose；其他照舊（chooseCore），做完同步上場、替補、新拿到的、耐聽（luBagSync）。關著＝逐字 chooseCore
  function choose(run, content, ch) {
    if (!(lineupOn(run) || wearOn(run)) || !Array.isArray(run.bag)) return chooseCore(run, content, ch);
    if (ch && lineupOn(run) && ['lineup', 'lineupSwap', 'benchSwap'].includes(ch.type)) return luChoose(run, content, ch);
    const before = run.bag.slice(), round0 = run.round, p0 = run.pending, r = chooseCore(run, content, ch);
    if (r && r.ok) {
      luBagSync(run, content, before);
      // 修正棒 11-22：打完一位、領獎／升級還沒選完就拿到的（藏家寶箱）＝記在這個 pending（luLate），換輪時併進新一輪的 lineupFresh——
      //   跟「領獎那一下就換輪」（沒有升級）同一個結果：下一輪算新拿到的（原本有升級＝被換輪清掉）
      if (lineupOn(run)) {
        const late = (p0 && Array.isArray(p0.luLate) ? p0.luLate : []).concat(run.bag.filter(id => !before.includes(id))).filter(id => run.bag.includes(id)), p = run.pending;
        if (run.round !== round0) { for (const id of late) if (!run.lineupFresh.includes(id)) run.lineupFresh.push(id); }
        else if (p && (p.type === 'reward' || p.type === 'level') && late.length) p.luLate = uniq(late);
      }
    }
    return r;
  }
  function chooseCore(run, content, ch) {
    const effects = [];
    const fail = error => ({ ok: false, error, effects: [] });
    const p = run.pending;
    if (!ch || !ch.type) return fail('badChoice');
    const rew = p && p.type === 'reward' ? p : null;
    const S = run.stats, EC = econ(content), SH = shopOf(run);
    // 這一趟進過包包的（一趟留一張的候選；老闆送的、種子不算）
    const enter = id => { if (!Array.isArray(run.entered)) run.entered = []; if (!run.entered.includes(id)) run.entered.push(id); };
    switch (ch.type) {
      case 'take': {
        if (!rew || rew.cardDone) return fail('noCardOffer');
        if (!rew.cards.includes(ch.cardId)) return fail('notOffered');
        if (run.bag.includes(ch.cardId)) return fail('owned');
        // 有上限（--set bagMax=8）：照舊，滿了才要 dropId、沒滿給了也不理。
        //   不限（預設）：收獎勵時不能順手丟（第 A 波 5：移出包包只能去櫃檯賣給老闆）→ 給了 dropId 就 'counterOnly'
        if (!bagLimited() && ch.dropId != null) return fail('counterOnly');
        const drop = bagLimited() && bagFull(run) ? ch.dropId : null;
        if (bagLimited() && bagFull(run) && (!drop || !run.bag.includes(drop))) return fail('bagFull');
        if (drop != null && !run.bag.includes(drop)) return fail('badDrop');
        if (drop != null) {
          run.bag.splice(run.bag.indexOf(drop), 1); effects.push({ loseCard: drop });
          if (Array.isArray(run.seeds) && run.seeds.includes(drop)) run.seeds.splice(run.seeds.indexOf(drop), 1);   // 拿掉的種子就不是種子了
        }
        run.bag.push(ch.cardId); S.taken.push(ch.cardId); run.taken++; enter(ch.cardId); effects.push({ gainCard: ch.cardId });
        if (rew.kind) {                                           // 第 C 波：戰利品列／寶箱收的＝撿來的（櫃檯賣回 $400）
          wcFound(run, ch.cardId);
          const X = wcStats(run), g = (rew.gold || []).includes(ch.cardId);
          if (rew.kind === 'loot') { X.lootTake++; if (g) X.goldTake++; } else { X.chestTake++; if (g) X.chestGoldTake++; }
        }
        rew.cardDone = true; if (rew.need === 'cardOrRelic') rew.relicDone = true;
        settle(run, content); return { ok: true, effects };
      }
      case 'relic': {
        if (!rew || rew.relicDone) return fail('noRelicOffer');
        if (!rew.relics.includes(ch.relicId)) return fail('notOffered');
        if (run.relics.includes(ch.relicId)) return fail('owned');
        if (relicFull(run, content, ch.relicId)) {
          if (!ch.dropRelicId || !run.relics.includes(ch.dropRelicId) || isSlotRelic(content, ch.dropRelicId)) return fail('relicsFull');
          run.relics.splice(run.relics.indexOf(ch.dropRelicId), 1); effects.push({ loseRelic: ch.dropRelicId });
        }
        run.relics.push(ch.relicId); S.relicsGot.push(ch.relicId); effects.push({ gainRelic: ch.relicId });
        if (rew.kind) wcStats(run)[rew.kind === 'loot' ? 'lootRelic' : 'chestRelic']++;
        rew.relicDone = true; if (rew.need === 'cardOrRelic') rew.cardDone = true;
        settle(run, content); return { ok: true, effects };
      }
      case 'skip': {
        if (!rew) return fail('nothingToSkip');
        if (rew.need === 'cardOrRelic' || rew.need === 'card') { rew.cardDone = true; rew.relicDone = true; }
        else if (!rew.cardDone) rew.cardDone = true; else rew.relicDone = true;
        if (rew.kind && rew.skipCash > 0 && (rew.need === 'cardOrRelic' || rew.need === 'card')) {   // 第 C 波：不收（+$400；fixWaveC 濾到沒牌的那一列也照給）
          wcEarn(run, 'skip', rew.skipCash); wcStats(run)[rew.kind === 'loot' ? 'lootSkip' : 'chestSkip']++; effects.push({ cash: rew.skipCash });
        }
        effects.push({ skip: true });
        settle(run, content); return { ok: true, effects };
      }
      case 'retry': {
        if (!p || p.type !== 'retry') return fail('noRetry');
        if (p.plea) run.plea = Math.max(0, (run.plea | 0) - 1); else if (!p.free) run.retryLeft--;   // 第 D 波備用說情：扣 run.plea、不動這一輪的說情
        S.retries++; run.pending = null; run.hp = run.hpIn;          // 裁定 8：同一位、同一副牌、聲望回到開打前
        effects.push(p.safety ? { retry: p.enemyId, free: true, safety: true } : p.plea ? { retry: p.enemyId, free: false, plea: true } : { retry: p.enemyId, free: !!p.free });   // 第 C 波新手保底、第 D 波備用說情（retryFlow 分支）
        const PH = !p.free && run.fac ? facTalHas(run, content, 'pleaHp') : null;   // 第 D 波棒三派樹「老客人的面子」：說情重打（這一輪的、備用的）那場開打聲望 +n（不超過上限）
        if (PH) { const was = run.hp; run.hp = Math.min(run.maxHp, run.hp + nonNeg(PH.n)); if (run.hp > was) { effects[effects.length - 1].pleaHp = run.hp - was; run.pleaUp = run.hp - was; } }   // pleaUp：startFight 會把加過的寫進 hpIn，再輸一次要扣回來（finishFight）
        return { ok: true, effects };
      }
      case 'end': {
        if (!p || p.type !== 'retry') return fail('noRetry');
        run.pending = null; run.over = 'dead';
        S.lostAt = { enemyId: p.enemyId, pos: run.pos, round: run.round, idx: run.idx, cls: run.prologue === 'pending' ? 'prologue' : classAt(run.pos) };
        effects.push({ end: true });
        return { ok: true, effects };
      }
      // 升級三選一（pending level）：品味 +1、底氣 +1、聲望上限 +2（現有聲望也 +2）；連升就再開一次，選完才到下一位
      case 'level': {
        if (!p || p.type !== 'level') return fail('noLevel');
        const o = (p.offer || []).find(x => x && x.pick === ch.pick && (ch.pick !== 'fac' || x.id === ch.id));
        if (!o) return fail('notOffered');
        if (o.pick === 'fac') {                                  // 第 D 波棒二本派選項（第 4 格；佔那一級＝不加屬性，聲望上限 +1 已在升級時加）：{type:'level', pick:'fac', id}
          const fd = run.fac && facPickDef(content, run.ace, o.id);
          if (!fd || run.fac.picks[o.id] > 0) return fail('notOffered');
          run.fac.picks[o.id] = 1;
          if (fd.op === 'maxHp') { run.maxHp += fd.n | 0; run.hp += fd.n | 0; }   // 冷門「地下串連」：聲望上限 +3（現有聲望也 +3）
          run.picks.push('fac:' + o.id); run.levelUps = Math.max(0, run.levelUps - 1);
          effects.push({ level: 'fac', id: o.id, n: fd.op === 'maxHp' ? fd.n | 0 : 0 });
        } else {
          const n = o.n | 0;
          if (o.pick === 'atk') run.atk += n; else if (o.pick === 'def') run.def += n; else { run.maxHp += n; run.hp += n; }
          run.picks.push(o.pick); run.levelUps = Math.max(0, run.levelUps - 1);
          effects.push({ level: o.pick, n });
        }
        run.pending = null;
        if (run.levelUps > 0) run.pending = { type: 'level', enemyId: p.enemyId, pos: p.pos, level: run.level - run.levelUps + 1, offer: levelOffer(run, content) };
        else advance(run, null, content);
        return { ok: true, effects };
      }
      // ---- 經濟（§2.1.6）：先驗完全部條件，才動 run ----
      case 'bargainPick': {
        if (!canBargainPick(run)) return fail('notNow');
        const ids = ch.ids;
        if (!Array.isArray(ids) || ids.length !== CFG.bargainPick || new Set(ids).size !== ids.length) return fail('badCount');
        if (!ids.every(id => SH.bargain.includes(id) && cardOf(content, id))) return fail('notInStock');
        if (ids.some(id => run.bag.includes(id))) return fail('owned');
        if (run.bag.length + ids.length > bagCap()) return fail('bagFull');
        for (const id of ids) { run.bag.push(id); SH.bargain.splice(SH.bargain.indexOf(id), 1); run.taken++; enter(id); effects.push({ gainCard: id }); }
        SH.bargainPicked = true;
        return { ok: true, effects };
      }
      case 'buy': {
        if (!canShop(run)) return fail('notNow');
        const stock = SH.bins[ch.key];
        if (!Array.isArray(stock) || !stock.includes(ch.cardId) || !cardOf(content, ch.cardId)) return fail('notInStock');
        if (run.bag.includes(ch.cardId)) return fail('owned');
        const price = priceOf(content, ch.cardId);
        if (price == null) return fail('notInStock');
        if (!bagLimited() && ch.sellId != null) return fail('counterOnly');   // 第 A 波 5：箱子買唱片不能順手賣（去櫃檯賣給老闆；錢不夠＝'noMoney'）
        let sell = null;
        if (ch.sellId != null) { if (!run.bag.includes(ch.sellId) || !cardOf(content, ch.sellId)) return fail('badSell'); if (isGift(run, content, ch.sellId)) return fail('giftNoSell'); if (isSeed(run, content, ch.sellId)) return fail('seedNoSell'); sell = ch.sellId; }
        else if (bagFull(run)) return fail('bagFull');            // 不限時不會滿：sellId 可給可不給（給了照賣、一換一）
        const earn = sell ? sellValue(content, cardOf(content, sell)) : 0;
        if (run.money + earn < price) return fail('noMoney');
        if (sell) { run.bag.splice(run.bag.indexOf(sell), 1); run.money += earn; S.earned += earn; S.sold.push(sell); effects.push({ loseCard: sell, earn }); }
        run.money -= price; S.spent += price;
        run.bag.push(ch.cardId); stock.splice(stock.indexOf(ch.cardId), 1); S.bought.push(ch.cardId); run.taken++; enter(ch.cardId);
        if (SH.lot && Array.isArray(SH.lot.gone) && !SH.lot.gone.includes(ch.cardId)) SH.lot.gone.push(ch.cardId);   // 一檔貨：架上買走的這一檔不再上架（D10）
        effects.push({ gainCard: ch.cardId, spend: price });
        return { ok: true, effects };
      }
      case 'buyBargain': {
        if (!canShop(run)) return fail('notNow');
        const ids = ch.ids;
        if (!Array.isArray(ids) || ids.length < 1 || ids.length > CFG.bargainPick || new Set(ids).size !== ids.length) return fail('badCount');
        if (!ids.every(id => SH.bargain.includes(id) && cardOf(content, id))) return fail('notInStock');
        if (ids.some(id => run.bag.includes(id))) return fail('owned');
        const sells = ch.sellIds == null ? [] : ch.sellIds;
        if (!Array.isArray(sells)) return fail('badSell');
        if (!bagLimited() && sells.length) return fail('counterOnly');   // 第 A 波 5：特價箱買唱片不能順手賣（去櫃檯賣給老闆）；空陣列照收
        // 有上限：照舊，賣的張數要剛好等於放不下的（多賣 → 'badSell'）。不限：need＝0、不收 sellIds（上一行；舊的「給幾張都照賣」拿掉了）
        const need = Math.max(0, run.bag.length + ids.length - bagCap());
        if (sells.length < need) return fail('bagFull');
        if ((bagLimited() && sells.length > need) || new Set(sells).size !== sells.length || !sells.every(id => run.bag.includes(id) && cardOf(content, id))) return fail('badSell');
        if (sells.some(id => isGift(run, content, id))) return fail('giftNoSell');
        if (sells.some(id => isSeed(run, content, id))) return fail('seedNoSell');
        if (run.bag.length + ids.length - sells.length < bagFloor(run)) return fail('bagMin');
        const each = ids.map(id => bargainPriceIn(run, content, id));   // 電台那張照原價（沒有套利）
        if (each.some(p => p == null)) return fail('notInStock');
        const earn = sells.reduce((s, id) => s + sellValue(content, cardOf(content, id)), 0), price = each.reduce((s, p) => s + p, 0);
        if (run.money + earn < price) return fail('noMoney');
        for (const id of sells) { const v = sellValue(content, cardOf(content, id)); run.bag.splice(run.bag.indexOf(id), 1); run.money += v; S.earned += v; S.sold.push(id); effects.push({ loseCard: id, earn: v }); }
        run.money -= price; S.spent += price;
        ids.forEach((id, k) => { run.bag.push(id); SH.bargain.splice(SH.bargain.indexOf(id), 1); S.bought.push(id); run.taken++; enter(id); effects.push({ gainCard: id, spend: each[k] }); });
        return { ok: true, effects };
      }
      // 收音機轉頻率（v5 第六項第二期）：先驗完全部條件，才動 run；抽不到（'empty'）不算轉過
      case 'radio': {
        if (!canShop(run)) return fail('notNow');
        if (!tuneCells(content).includes(ch.cell)) return fail('badCell');
        if (SH.radio) return fail('used');
        const pool = radioPool(run, content, ch.cell);
        if (!pool.length) return fail('empty');
        const st = { rng: fnv1a32(run.seedKey + '#' + run.runNo + '#radio#' + (run.round || 1) + '#' + ch.cell) || 1 };
        const id = pool[Math.floor(rng(st) * pool.length)];
        if (!Array.isArray(SH.bargain)) SH.bargain = [];
        SH.bargain.unshift(id);
        SH.radio = { cell: ch.cell, id };
        effects.push({ radio: ch.cell, card: id });
        return { ok: true, effects };
      }
      // 櫃檯賣給老闆（第 A 波 5；移出包包只有這一條）：{type:'sell', cardId}。兩位客人之間（canShop）、包包裡；賣完至少留 5 張（'bagMin'）。
      //   一般唱片半價（sellValue：特價箱的照特價算）；老闆送的、種子＝老闆收回 $0，effects 多 reclaim 'gift'｜'seed'，之後不再算送的／種子
      //   （從 run.gifts／run.seeds 拿掉：之後再買回來＝買的，照半價）。賣掉的不回貨架；run.entered 不動（一趟留一張照樣可以留它）
      case 'sell': {
        const id = ch.cardId, q = sellQuote(run, content, id);
        if (!q.ok) return fail(q.error);
        applySell(run, content, id, q, effects);                  // 第 C 波：一處做完（攤位的「賣一張給他」也走這裡）；撿來的 $400、effects 多 found
        return { ok: true, effects };
      }
      case 'buyRelic': {
        if (!canShop(run)) return fail('notNow');
        if (!SH.relics.includes(ch.relicId) || !relicOk(content, ch.relicId)) return fail('notInStock');
        if (run.relics.includes(ch.relicId)) return fail('owned');
        const price = relicPrice(content, ch.relicId);
        if (price == null) return fail('notInStock');
        let sell = null;
        if (ch.sellRelicId != null) { if (!run.relics.includes(ch.sellRelicId) || (isSlotRelic(content, ch.sellRelicId) && relicFull(run, content, ch.relicId))) return fail('badSell'); sell = ch.sellRelicId; }
        else if (relicFull(run, content, ch.relicId)) return fail('relicsFull');
        const earn = sell ? sellValue(content, sell) : 0;
        if (run.money + earn < price) return fail('noMoney');
        if (sell) { run.relics.splice(run.relics.indexOf(sell), 1); run.money += earn; S.earned += earn; S.relicsSold.push(sell); effects.push({ loseRelic: sell, earn }); }
        run.money -= price; S.spent += price;
        run.relics.push(ch.relicId); SH.relics.splice(SH.relics.indexOf(ch.relicId), 1); S.relicsBought.push(ch.relicId);
        effects.push({ gainRelic: ch.relicId, spend: price });
        return { ok: true, effects };
      }
      // ---- 第 C 波（SPEC-C §3.3）：今天的攤位、中繼點開局選秀 ----
      // 選組（{type:'stallPick', group: 0|1}）：寄賣領取那站（q 還沒走完）先做完才能選
      case 'stallPick': {
        if (!p || p.type !== 'stall' || p.pick != null || p.k < p.q.length) return fail('noStallPick');
        if (!Array.isArray(p.groups[ch.group])) return fail('badGroup');
        const X = wcStats(run);
        p.pick = ch.group; wcAdd(X.picked, '_n', 1);
        for (const g of p.groups) for (const k of g) wcAdd(X.offered, k, 1);
        for (const k of p.groups[ch.group]) wcAdd(X.picked, k, 1);
        p.q = p.q.concat(p.groups[ch.group], p.post); p.cur = null;
        stallEnter(run, content);
        return { ok: true, effects };
      }
      // 這一站的動作（{type:'stallAct', act, …}；§4.4 表）：做完一站自動進下一站（pending.cur 換掉；q 走完 pending＝null）
      case 'stallAct': {
        if (!p || p.type !== 'stall' || !p.cur) return fail('noStation');
        const e = stallAct(run, content, ch, effects); if (e) return fail(e);
        return { ok: true, effects };
      }
      // 今天不逛了（選組前、選組後、市集裡都能按）：剩下的站每站 +$1,000（錄音室照走、寄賣領取照領）
      case 'stallLeave': {
        if (!p || p.type !== 'stall') return fail('noStation');
        const n = stallLeave(run, content);
        if (n > 0) effects.push({ cash: n });
        effects.push({ leave: true });
        return { ok: true, effects };
      }
      // 中繼點開局選秀（{type:'draft', cardId}｜{type:'draft', pick}）：撿盤＝撿來的（$400）、進唱片櫃「認識」、可當一趟留一張；升級＝等級 +1、聲望上限 +levelHp、再三選一
      case 'draft': {
        if (!p || p.type !== 'draft' || !p.offer) return fail('noDraft');
        if (ch.pick === 'fac') return fail('bad');                 // 第 D 波棒二：選秀不收本派格（原型 bug：白升一級；CRITIQUE 2.1）
        const of = p.offer;
        if (of.kind === 'card') {
          if (!(of.cards || []).includes(ch.cardId) || !cardOf(content, ch.cardId)) return fail('notOffered');
          if (run.bag.includes(ch.cardId)) return fail('owned');
          run.bag.push(ch.cardId); run.taken++; S.taken.push(ch.cardId); enter(ch.cardId); wcFound(run, ch.cardId);
          effects.push({ gainCard: ch.cardId }); p.ck++;
        } else {
          const o = (of.offer || []).find(x => x && x.pick === ch.pick); if (!o) return fail('notOffered');
          const T = trialCfg(content, run.tier), n = o.n | 0, h = levelHpAt(T, run.level);   // 第 I 波 I-0：Lv1→2 那次照 firstHp（＝gainXp）
          run.level++; run.maxHp += h; run.hp += h;
          if (o.pick === 'atk') run.atk += n; else if (o.pick === 'def') run.def += n; else { run.maxHp += n; run.hp += n; }
          run.picks.push(o.pick); p.cm++;
          effects.push({ level: o.pick, n });
        }
        if (p.ck >= p.k && p.cm >= p.m) { draftDone(run, content); effects.push({ draftDone: run.pos }); }
        else p.offer = draftOffer(run, content);
        return { ok: true, effects };
      }
      // ---- 活店第二階段：切磋（SPEC-H §7.3、§7.5；run.spar；上面 encOffer 那段的狀態機）。每一種都只寫 run.spar／run.stats.spar（不收＝加錢、包包模式收＝主線拿牌記帳）----
      // 開邀請（{type:'encOpen'}）：encOffer 有結果、這一位還沒開過 → run.spar 整筆換成這一位的 offer、stats.spar.offered +1
      case 'encOpen': {
        const of = encOffer(run, content);
        if (!of) return fail('noSpar');
        if (run.spar && run.spar.pos === of.pos && run.spar.round === of.round) return fail('sparDone');
        run.spar = { round: of.round, pos: of.pos, who: of.who, state: 'offer' };
        sparStats(run).offered++;
        effects.push({ spar: 'offer', who: of.who });
        return { ok: true, effects };
      }
      // 來一盤（{type:'encAccept'}）：offer → fighting（畫面先存檔再 encStart；重新整理在打＝作廢）
      case 'encAccept': {
        if (!sparOfferNow(run) || nextStep(run) !== 'fight') return fail('noSparOffer');
        if (lineupOn(run) && luRound(run) && run.lineupDue) return fail('lineupDue');   // 第 I 波 I-2（合併後修正）：還沒挑上場（換輪、上場那張賣掉）＝先挑：切磋用這一輪上場那幾張（SPEC-I §5.6），不是整個包包
        run.spar.state = 'fighting'; sparStats(run).accepted++;
        effects.push({ spar: 'fighting', who: run.spar.who });
        return { ok: true, effects };
      }
      // 改天（{type:'encDecline'}）／30 秒沒理他（{type:'encDecline', lapse:true}）：offer → declined｜lapsed
      case 'encDecline': {
        const S = run.spar;
        if (!S || S.state !== 'offer') return fail('noSparOffer');
        S.state = ch.lapse ? 'lapsed' : 'declined';
        effects.push({ spar: S.state, who: S.who });
        return { ok: true, effects };
      }
      // 收這張（{type:'encTake', id}；cardId 也收）：打贏、還沒收／拿錢、是那三張之一。唱片櫃模式（run.spar.mode）＝只記 run.spar.taken（畫面 shelfOwn(id,'enc')）；
      //   包包模式＝主線同一套拿牌記帳（包包、stats.taken、taken、entered、撿來的 $400 賣回）；不進 drops
      case 'encTake': {
        const S = run.spar, id = ch.id != null ? ch.id : ch.cardId;
        if (!S || S.state !== 'won' || !S.loot) return fail('noSparLoot');
        if (S.taken != null || S.skipped) return fail('sparDone');
        if (run.over || run.duel) return fail('notNow');
        if (!S.loot.cards.includes(id) || !cardOf(content, id)) return fail('notOffered');
        const mode = SPAR_MODES.includes(S.mode) ? S.mode : sparMode(content);
        if (mode === 'bag') {
          if (run.bag.includes(id)) return fail('owned');
          if (bagLimited() && bagFull(run)) return fail('bagFull');
          run.bag.push(id); sparTakenPush(run, id); run.taken++; enter(id); wcFound(run, id); effects.push({ gainCard: id });
        } else effects.push({ shelf: id });
        S.taken = id; sparStats(run).took++;
        return { ok: true, effects };
      }
      // 不收（{type:'encSkip'}）：+C.waveC.loot.skipCash（$200，跟主線戰利品列不收一樣；不乘酬勞天賦 payMul）＝wcEarn(run, 'spar', n)
      case 'encSkip': {
        const S = run.spar;
        if (!S || S.state !== 'won') return fail('noSparLoot');
        if (S.taken != null || S.skipped) return fail('sparDone');
        if (run.over || run.duel) return fail('notNow');
        const n = wcCfg(content).loot.skipCash | 0;
        wcEarn(run, 'spar', n); S.skipped = true; sparStats(run).cash += n;
        effects.push({ cash: n });
        return { ok: true, effects };
      }
    }
    return fail('badChoice');
  }
  function sparTakenPush(run, id) { if (!Array.isArray(run.stats.taken)) run.stats.taken = []; run.stats.taken.push(id); }

  // ============================================================================================================================
  // 第 D 波：樂歷（局外成長；scratchpad v5/wave-d SPEC-D §2、§4.1；給畫面的契約 build1/CONTRACT.md）。全部純函式、不碰存檔、不碰 run.rng。
  //   career＝save.career 那包 {key, xp, spent:{id:級}, off, prof:{hall,pearl,heresy}, tree, drawn:[等級], banked, lastGain}；等級、點數都由 xp／spent 算、不存
  //   數字＝content.career（沒給的用 CAREER；careerCfg 逐層合併：物件逐鍵、陣列整個換）
  //   進局：newRun 收 talentArgs(content, career) 給的 {talent, seedMax, relicPick, goldAdd}（applyTalent）；Lv8 前、關樂歷＝{}（或只有錢類 talent）＝逐字現況
  // ============================================================================================================================
  const CAREER = {
    lexp: { pos: 15, streak: 8, record: 30, caps: { gig: 0.25, route: 0.40 }, tierMul: 0.10, lowMul: 2, lowBelow: 10, firstLv: 2 },
    curve: { table: [100, 150, 250, 350, 500, 650, 800], tri: 100, triTo: 10, after: 1000 },
    draw: { every5: 'epic', epicFrom: 10, other: ['rare', 'uncommon'] },
    talentFx: { atk: 1, def: 1, hp: 2, xp: 0.10, plea: 1, money: 500, pay: 0.10, rare: 0.02 },
    talents: [
      { id: 'atk', cat: 'power', cost: [6, 'k'], max: 0, open: 8 }, { id: 'def', cat: 'power', cost: [6, 'k'], max: 0, open: 8 },
      { id: 'hp', cat: 'power', cost: [6, 'k'], max: 0, open: 8 }, { id: 'xp', cat: 'xp', cost: [3, 'k'], max: 2, open: 8 },
      { id: 'plea', cat: 'safe', cost: [15, 'flat'], max: 1, open: 20 },
      { id: 'money', cat: 'money', cost: [1, 'flat'], max: 3, open: 2 }, { id: 'pay', cat: 'money', cost: [1, 'flat'], max: 3, open: 2 },
      { id: 'rare', cat: 'luck', cost: [2, 'flat'], max: 3, open: 8 },
      { id: 'piggy', cat: 'money', cost: [1, 'flat'], max: 3, open: 2, soon: true }, { id: 'reroll', cat: 'luck', cost: [2, 'flat'], max: 3, open: 2, soon: true },
      { id: 'ban', cat: 'luck', cost: [2, 'flat'], max: 3, open: 2, soon: true }, { id: 'intel', cat: 'info', cost: [2, 'k+1'], max: 2, open: 5, soon: true }],
    ladder: [
      { lv: 2, key: 'talents' }, { lv: 3, key: 'bench', lineupBonus: 1, needs: 'lineup' }, { lv: 8, key: 'power' }, { lv: 10, key: 'relic3', relicPick: 3 }, { lv: 10, key: 'off' },
      { lv: 12, key: 'seed4', seedMax: 4 }, { lv: 15, key: 'gold', goldAdd: 0.01 }, { lv: 20, key: 'plea' },
      { lv: 0, key: 'seed5', soon: true }, { lv: 0, key: 'relicsNew', soon: true }, { lv: 0, key: 'regulars', soon: true }, { lv: 0, key: 'outfit', soon: true }],
    offFrom: 10,
    prof: { stamp: 150, per: 10, lagMul: 2, lagBelow: 0.5, firstStamps: 2, pointFrom: 2,
      auto: [{ lv: 3, key: 'sigil', soon: true }, { lv: 5, key: 'tier3' }, { lv: 7, key: 'giftSwap', soon: true }, { lv: 10, key: 'outfit', soon: true }] }
  };
  const LEXP_ROUTE = ['gig', 'home', 'promo', 'packet', 'demo'];      // 路線五項（C 波 run.lexp 的鍵；base 另算）
  const nonNeg = x => (typeof x === 'number' && isFinite(x) && x > 0) ? Math.floor(x) : 0;
  function careerCfg(content) {
    const s = (content && content.career) || {}, out = {};
    for (const k of Object.keys(CAREER)) out[k] = wcMerge(CAREER[k], s[k]);
    return out;
  }
  function talentDef(content, id) { return careerCfg(content).talents.find(t => t && t.id === id) || null; }
  // 第 k 級要幾點：cost [a,'k']＝a×k、[a,'flat']＝a、[a,'k+1']＝a＋k−1（客人底細 2、3）；沒有這個天賦＝Infinity
  function talentCost(content, id, k) {
    const T = talentDef(content, id); if (!T || !Array.isArray(T.cost)) return Infinity;
    const a = +T.cost[0] || 0, n = Math.max(1, k | 0);
    return T.cost[1] === 'k' ? a * n : T.cost[1] === 'k+1' ? a + n - 1 : a;
  }
  const talentSpent = (content, id, n) => { let s = 0; for (let k = 1; k <= n; k++) s += talentCost(content, id, k); return s; };
  // 等級：Lv n→n+1 要 tri×n（n<triTo），之後每級 after。{level, into＝這一級已經有多少, need＝這一級要多少, total＝累計 xp}
  //   第 I 波 I-0（SPEC-I §7.3 c；店主 11-20「樂歷的成長曲線也要做好 第一輪就要讓玩家升級」）：table＝Lv1…Lv(表長) 每級要的量，表外照舊。
  //   100／150／250／350／500／650／800（每級只增不減、沒有斷崖；合計 2,800＝舊曲線 Lv1–7 → Lv8 戰力天賦開放的 xp 與點數不變，之後 900、1,000…照舊）
  const curveNeed = (V, n) => { const t = V.table; return Array.isArray(t) && n >= 1 && n <= t.length && t[n - 1] > 0 ? +t[n - 1] : n < V.triTo ? V.tri * n : V.after; };
  function careerNeed(content, n) { return curveNeed(careerCfg(content).curve, n | 0); }
  function curveLevel(V, xp) {
    const total = nonNeg(xp), start = Math.max(1, V.triTo | 0, (Array.isArray(V.table) ? V.table.length : 0) + 1);   // start 起每級都是 after（快速路徑）
    let head = 0; for (let n = 1; n < start; n++) head += curveNeed(V, n);
    if (V.after > 0 && total >= head) { const r = total - head; return { level: start + Math.floor(r / V.after), into: r % V.after, need: V.after, total }; }
    let rem = total, level = 1;
    for (let g = 0; g < 10000; g++) { const need = curveNeed(V, level); if (!(need > 0) || rem < need) break; rem -= need; level++; }
    return { level, into: rem, need: curveNeed(V, level), total };
  }
  function careerLevel(content, xp) { return curveLevel(careerCfg(content).curve, xp); }
  // 升到 Lv level 的累計 xp（Lv1＝0、Lv2＝100、Lv10＝4,500、Lv20＝14,500）
  function careerXpAt(content, level) { let s = 0; for (let n = 1; n < Math.max(1, level | 0); n++) s += careerNeed(content, n); return s; }
  // 點數：等級−1 − Σ（spent 每個天賦第 1…n 級的價）
  function careerPoints(content, career) {
    const c = career || {}, sp = c.spent || {}, level = careerLevel(content, c.xp).level;
    let spent = 0;
    for (const id of Object.keys(sp)) { const n = nonNeg(sp[id]); if (n && talentDef(content, id)) spent += talentSpent(content, id, n); }
    const total = Math.max(0, level - 1);
    return { level, total, spent, left: total - spent };
  }
  function talentOpen(content, id, level) { const T = talentDef(content, id); return !!T && !T.soon && (level | 0) >= (T.open | 0); }
  const careerCopy = c => { c = c && typeof c === 'object' ? c : {}; return Object.assign({}, c, { spent: Object.assign({}, c.spent || {}) }); };
  // 點一級／退一級／全部重配：回新物件（不改傳進來的）；錯誤 'locked'（還沒開、之後開放、沒有這個天賦）｜'max'｜'points'｜'none'（沒點過）
  function talentBuy(content, career, id) {
    const T = talentDef(content, id); if (!T || T.soon) return { ok: false, error: 'locked' };
    const P = careerPoints(content, career);
    if (P.level < (T.open | 0)) return { ok: false, error: 'locked' };
    const k = nonNeg(((career && career.spent) || {})[id]);
    if (T.max > 0 && k >= T.max) return { ok: false, error: 'max' };
    if (P.left < talentCost(content, id, k + 1)) return { ok: false, error: 'points' };
    const c = careerCopy(career); c.spent[id] = k + 1;
    return { ok: true, career: c };
  }
  function talentSell(content, career, id) {
    const k = nonNeg(((career && career.spent) || {})[id]); if (!k) return { ok: false, error: 'none' };
    const c = careerCopy(career); if (k > 1) c.spent[id] = k - 1; else delete c.spent[id];
    return { ok: true, career: c };
  }
  function careerRespec(content, career) { const c = careerCopy(career); c.spent = {}; return { ok: true, career: c }; }
  // newRun 的樂歷參數：{talent:{id:級}（開了的、非 0）, seedMax, relicPick, goldAdd}（沒有的鍵不給）。off＝{}（關掉樂歷＝新帳號的難度）
  function talentArgs(content, career) {
    const c = career || {}; if (c.off) return {};
    const K = careerCfg(content), lv = careerLevel(content, c.xp).level, out = {}, t = {};
    for (const T of K.talents) {
      if (!T || T.soon || lv < (T.open | 0)) continue;
      let k = nonNeg((c.spent || {})[T.id]); if (T.max > 0) k = Math.min(k, T.max);
      if (k) t[T.id] = k;
    }
    if (Object.keys(t).length) out.talent = t;
    for (const L of K.ladder) {
      if (!L || L.soon || !(L.lv > 0) || lv < L.lv) continue;
      if (L.seedMax > 0) out.seedMax = Math.max(out.seedMax | 0, L.seedMax | 0);
      if (L.relicPick > 1) out.relicPick = Math.max(out.relicPick | 0, L.relicPick | 0);
      if (L.goldAdd > 0) out.goldAdd = round6((out.goldAdd || 0) + L.goldAdd);
      if (L.lineupBonus > 0 && luCfg(content).on) out.lineupBonus = Math.max(out.lineupBonus | 0, L.lineupBonus | 0);   // 第 I 波 I-2 Lv3：上場制開著才給（newRun o.lineupBonus）
    }
    return out;
  }
  // 進局（newRun）：品味／底氣直接加；聲望上限＋現有 +2／級；局內經驗 xpMul；備用說情 run.plea；開局錢 +$500／級；酬勞 payMul；稀有率＋階梯 goldAdd；配件 relicPick
  //   全 0 的不寫欄位（run.talent 只記非 0 的級數）
  function applyTalent(run, content, o) {
    const F = careerCfg(content).talentFx, t = o.talent && typeof o.talent === 'object' ? o.talent : {}, k = x => nonNeg(t[x]);
    const tal = {}; for (const x of Object.keys(F)) if (k(x)) tal[x] = k(x);
    if (k('atk')) run.atk += k('atk') * F.atk;
    if (k('def')) run.def += k('def') * F.def;
    if (k('hp')) { const n = k('hp') * F.hp; run.maxHp += n; run.hp += n; run.hpIn = run.hp; }
    if (k('xp')) run.xpMul = round6(1 + k('xp') * F.xp);
    if (k('plea')) run.plea = k('plea') * F.plea;
    if (k('money')) run.money += k('money') * F.money;
    if (k('pay')) run.payMul = round6(1 + k('pay') * F.pay);
    const ga = round6((+o.goldAdd > 0 ? +o.goldAdd : 0) + k('rare') * F.rare);
    if (ga > 0) run.goldAdd = ga;
    if (nonNeg(o.relicPick) > 1) run.relicPick = nonNeg(o.relicPick);
    if (Object.keys(tal).length) run.talent = tal;
    return run;
  }
  // 一趟拿多少樂歷（SPEC-D §2.1）：sum＝runSummary(run)；o.best＝這一趟開局前的最遠紀錄（r.farBefore）、o.tier＝試煉階級
  //   第 I 波 I-0（SPEC-I §7.3 a）：o.first＝新帳號第一趟（save.runs 還沒有任何一趟）→ total＝max(原本, 升到 Lv firstLv 的累計)，回 first＝補了幾點（0＝沒補）；
  //   o.lowMul（數字 ≥1）＝覆寫新手倍率（careerLive 傳 1：細條不乘 ×2）
  //   total＝round((base＋record＋route) × mul)；mul＝(1＋tierMul×tier) × low
  //   base＝pos×實際打過的位數（fought＝reached − from ＋ 1；o.open＝放棄時站著的那一位還沒打完 → 少算那一位）＋streak×最多連贏
  //   low＝新手補貼 lowMul：只給「這一趟沒走到第 lowBelow 位、帳號也還沒走到過（o.best < lowBelow）、不是放棄（o.quit）」的那一趟
  //     （棒一審查：只看這一趟會被拿來刷——打 8 場就放棄、或故意輸在第 9 位，每場樂歷是正常打的 2 倍以上）
  //   route＝min(min(gig, ⌊caps.gig×base⌋)＋home＋promo＋packet＋demo, ⌊caps.route×base⌋)；cut＝五項原值 − route（「路線樂歷已到上限」）
  function careerGain(content, sum, o) {
    sum = sum || {}; o = o || {};
    const X = careerCfg(content).lexp, L = sum.lexp || {}, from = sum.from > 1 ? sum.from | 0 : 1, reached = sum.reached | 0;
    const fought = sum.reached != null ? Math.max(0, reached - from + 1 - (o.open ? 1 : 0)) : null;
    const base = fought != null ? X.pos * fought + X.streak * nonNeg(sum.bestStreak) : nonNeg(L.base);
    const best = nonNeg(o.best), record = best > 0 && reached > best ? X.record | 0 : 0, below = X.lowBelow | 0;
    const parts = {}; for (const k of LEXP_ROUTE) parts[k] = nonNeg(L[k]);
    const raw = LEXP_ROUTE.reduce((t, k) => t + parts[k], 0);
    const route = Math.min(Math.min(parts.gig, Math.floor(X.caps.gig * base)) + raw - parts.gig, Math.floor(X.caps.route * base));
    const tier = nonNeg(o.tier), tierMul = round6(1 + X.tierMul * tier);
    const low = typeof o.lowMul === 'number' && o.lowMul >= 1 ? +o.lowMul : X.lowMul > 1 && !o.quit && reached < below && best < below ? +X.lowMul : 1, mul = round6(tierMul * low);
    const raw0 = Math.round((base + record + route) * mul), first = o.first && X.firstLv > 1 ? Math.max(0, careerXpAt(content, X.firstLv) - raw0) : 0;
    return { base, fought, record, route, cut: raw - route, mul, tierMul, low, tier, total: raw0 + first, first, parts };
  }
  // 一趟裡就看得到（SPEC-I §7.3 b；只顯示、不入帳，入帳照舊在一趟結束）：o＝{best（r.farBefore）, tier（沒給＝run.tier）, xp（save.career.xp，開局時的）}
  //   n＝這一趟到現在至少拿多少（careerGain、lowMul 1＝不乘新手 ×2、沒有第一趟保底 → 只會越來越多）；level／into／need＝careerLevel(xp＋n)（細條的進度條）；
  //   from＝開局等級、up＝跨了幾級（畫面：比上次畫的等級大＝細條金色閃「Lv{n}！」）
  //   I-0 審查：站著的這一位還沒打（攤位時 run.pos 已經是下一位）就不算那一位（open＝!posFought，＝ui careerRecord 放棄的算法）→ n＝現在放棄也拿得到的下限，
  //   「至少」與跨級的「這一趟結束就能點天賦」放棄也成立；攤位與攤位之間照樣只增不減（打完那一位才多算）
  function careerLive(content, run, o) {
    o = o || {};
    const xp = nonNeg(o.xp), n = careerGain(content, runSummary(run || {}), { best: o.best, tier: o.tier != null ? o.tier : (run && run.tier), lowMul: 1, open: !posFought(run) }).total;
    const L = careerLevel(content, xp + n), from = careerLevel(content, xp).level;
    return { n, from, level: L.level, into: L.into, need: L.need, up: L.level - from };
  }
  // 曲線改了（SPEC-I §7.5；開機跑）：from＝舊曲線（沒有 table）的等級、to＝現在的、missing＝from+1…to 裡 career.drawn 沒有的等級（畫面補抽、吐司「補你 n 級」）。
  //   補抽完 drawn 就有了 → 下次 missing 空（不用旗標）。新曲線每級累計都 ≤ 舊的 → 等級只升不降、點數只多不少
  function careerRecurve(content, career) {
    const c = career || {}, V = careerCfg(content).curve, to = curveLevel(V, c.xp).level;
    const from = Array.isArray(V.table) ? Math.min(to, curveLevel(Object.assign({}, V, { table: null }), c.xp).level) : to;
    const drawn = Array.isArray(c.drawn) ? c.drawn : [], missing = [];
    for (let n = Math.max(2, from + 1); n <= to; n++) if (!drawn.includes(n)) missing.push(n);
    return { from, to, missing };
  }
  // 放棄（重新推門）的那一趟，站著的這一位打完了沒（careerGain 的 o.open＝!posFought）：打贏還在領獎／升級、輸了停在說情選單＝打過；
  //   還沒開打（路線上、中繼點選秀）、對決打到一半＝沒打過
  function posFought(run) {
    const p = run && run.pending;
    return !!(run && (run.over || (p && !p.prologue && p.pos === run.pos && (p.type === 'reward' || p.type === 'level' || p.type === 'retry'))));
  }
  // 這一趟演唱會還能算幾張（照現在的基本樂歷；基本只會變大，所以是下限）：max(0, ⌊(⌊caps.gig×base⌋ − 已算的 gig) / 每張⌋)
  function careerBase(content, run) { const X = careerCfg(content).lexp, from = run.cpFrom > 1 ? run.cpFrom : 1; return X.pos * Math.max(0, (run.pos | 0) - from + 1) + X.streak * nonNeg(run.bestStreak); }
  function gigRoom(run, content) {
    if (!run) return 0;
    const per = wcCfg(content).stall.gig.lexp | 0; if (!(per > 0)) return 0;
    const cap = Math.floor(careerCfg(content).lexp.caps.gig * careerBase(content, run));
    return Math.max(0, Math.floor((cap - nonNeg((run.lexp || {}).gig)) / per));
  }
  // 解鎖階梯：ladderList＝整條（open＝已開）；ladderAt＝剛好這一級開的（過場卡）；ladderNext＝下一個（標題第二行；沒有＝null）。soon 的不算開、不當下一個
  //   needs:'lineup'（第 I 波 I-2 Lv3 多帶一張替補）＝上場制開著才列（content.lineup.on；?lineup=1 的畫面開機已設好）
  function ladderList(content, level) { const lv = level | 0; return careerCfg(content).ladder.filter(L => L && !(L.needs === 'lineup' && !luCfg(content).on)).map(L => Object.assign({}, L, { open: !L.soon && L.lv > 0 && lv >= L.lv })); }
  function ladderAt(content, level) { return ladderList(content, level).filter(L => !L.soon && L.lv === (level | 0)); }
  function ladderNext(content, level) { return ladderList(content, level).filter(L => !L.soon && L.lv > (level | 0)).sort((a, b) => a.lv - b.lv)[0] || null; }
  // 升級抽盤（SPEC-D §2.2）：Lv(≥epicFrom、每 5 級) 史詩，其他 draw.other 擇一（hash01(key#lv<n>#r)）；從「非頂點、非特價、沒擁有」的那個稀有度裡挑
  //   hash01(key#lv<n>)（key＝save.career.key）；那個稀有度沒有可抽的＝null（跳過、不補）。owned＝函式｜陣列｜{id: 值}
  const DRAW_POOL = typeof WeakMap === 'function' ? new WeakMap() : null;
  function careerDrawPool(content, r) {
    const cards = content.cards || {};
    let M = DRAW_POOL && DRAW_POOL.get(cards);
    if (!M) { M = new Map(); if (DRAW_POOL) DRAW_POOL.set(cards, M); }
    if (M.has(r)) return M.get(r);
    const bg = new Set(bargainIds(content)), aces = new Set(Object.values(content.aces || {}));
    const p = Object.keys(cards).sort().filter(id => canSeed(content, id) && !bg.has(id) && !aces.has(id) && rarity(cards[id]) === r);
    M.set(r, p); return p;
  }
  function careerDrawRarity(content, key, level) {
    const D = careerCfg(content).draw, lv = level | 0;
    if (D.every5 && lv >= (D.epicFrom | 0) && lv % 5 === 0) return D.every5;
    const o = Array.isArray(D.other) ? D.other : [];
    return o.length ? o[Math.floor(hash01(String(key || '') + '#lv' + lv + '#r') * o.length)] : null;
  }
  function careerDraw(content, key, level, owned) {
    const r = careerDrawRarity(content, key, level); if (!r) return null;
    const has = ownedFn(owned), pool = careerDrawPool(content, r).filter(id => !has(id));
    return pool.length ? pool[Math.floor(hash01(String(key || '') + '#lv' + (level | 0)) * pool.length)] : null;
  }
  // 熟練度（SPEC-D §3.6；預設就記）：一章 stamp、per 章一級；profLevel(xp)＝{level: 1＋⌊xp/1500⌋, stamps: 這一級蓋了幾章 0–9, into: 這一章已經有多少, per, stamp}
  const profOf = prof => { const p = {}; for (const t of TIERS) p[t] = nonNeg((prof || {})[t]); return p; };
  function profLevel(content, xp) {
    const P = careerCfg(content).prof, x = nonNeg(xp), lvXp = P.stamp * P.per;
    return { level: 1 + Math.floor(x / lvXp), stamps: Math.floor((x % lvXp) / P.stamp), into: x % P.stamp, per: P.per, stamp: P.stamp };
  }
  // 一趟記熟練：那派 += gain ×（落後 ? lagMul : 1）；落後＝prof[ace] < lagBelow × 最高那派。回 {prof（新物件）, add, lag, stamps（新蓋的章）, levelUps}
  function profGain(content, prof, ace, gain) {
    const P = careerCfg(content).prof, p = profOf(prof);
    if (!TIERS.includes(ace)) return { prof: p, add: 0, lag: false, stamps: 0, levelUps: 0 };
    const mx = Math.max.apply(null, TIERS.map(t => p[t])), lag = p[ace] < P.lagBelow * mx, old = p[ace];
    const add = Math.round(nonNeg(gain) * (lag ? P.lagMul : 1));
    p[ace] = old + add;
    return { prof: p, add, lag, stamps: Math.floor(p[ace] / P.stamp) - Math.floor(old / P.stamp), levelUps: profLevel(content, p[ace]).level - profLevel(content, old).level };
  }
  // 第一次解鎖某派：先蓋 firstStamps 章（那派熟練還是 0 才給；給過或玩過＝不動）
  function profFirst(content, prof, ace) {
    const P = careerCfg(content).prof, p = profOf(prof);
    if (!TIERS.includes(ace) || p[ace] > 0) return { prof: p, add: 0 };
    p[ace] = P.firstStamps * P.stamp;
    return { prof: p, add: p[ace] };
  }
  // C 波 lexpBank 入帳（SPEC-D §2.6；每次開機都跑，畫面負責寫回）：lexpBank 金額鍵全 0＝null
  //   total＝B＋min(min(gig, ⌊0.25B⌋)＋home＋promo＋packet＋demo, ⌊0.40B⌋)（照總額截，比逐趟截寬鬆或一樣 → 下面逐趟分完的餘數 ≥0）
  //   熟練度：save.runs 裡有 ace、lexp、沒有 gain、沒有 banked 的（＝C 版頁面記的、還沒入過帳）照各自的派記（每趟照 §2.1 截、不算破紀錄與倍率），
  //   餘數給 save.lastAce（沒有＝hall）；不套落後 ×2。回 {total, xp, prof, per, runs（這次入帳的 save.runs 索引：畫面標 banked:1）, from, to, first}
  function lexpCapped(content, L) {
    const X = careerCfg(content).lexp, B = nonNeg(L && L.base), v = k => nonNeg(L && L[k]);
    const route = Math.min(Math.min(v('gig'), Math.floor(X.caps.gig * B)) + v('home') + v('promo') + v('packet') + v('demo'), Math.floor(X.caps.route * B));
    return { base: B, route, total: B + route };
  }
  function careerDeposit(content, save) {
    const LB = (save && save.lexpBank) || {};
    if (!['base'].concat(LEXP_ROUTE).some(k => nonNeg(LB[k]) > 0)) return null;
    const c = (save && save.career) || {}, xp0 = nonNeg(c.xp), total = lexpCapped(content, LB).total;
    const per = profOf(null), runs = [];
    let used = 0;
    (Array.isArray(save.runs) ? save.runs : []).forEach((r, k) => {
      if (!r || typeof r !== 'object' || !TIERS.includes(r.ace) || !r.lexp || typeof r.lexp !== 'object' || r.gain || r.banked) return;
      const g = Math.max(0, Math.min(lexpCapped(content, r.lexp).total, total - used));
      per[r.ace] += g; used += g; runs.push(k);
    });
    per[TIERS.includes(save.lastAce) ? save.lastAce : 'hall'] += total - used;
    const prof = profOf(c.prof); for (const t of TIERS) prof[t] += per[t];
    return { total, xp: xp0 + total, prof, per, runs, from: careerLevel(content, xp0).level, to: careerLevel(content, xp0 + total).level, first: !c.banked };
  }
  // 讀檔整理 save.career（ui loadSave 用；回新物件）：型別、非負整數；spent 的 id 不在 talents／之後開放的丟掉、超過上限的截掉，點數不夠＝全部退回；
  //   prof 三派、tree 三派（{node: 級}）、drawn（升過級抽過盤的等級，>1 的整數、不重複、遞增）、got（升級抽到的盤 id：卡池裡有的、不重複；
  //   退版到 C 版頁面會把唱片櫃 src 'lexp' 洗成 'gift'，回 D 版時 ui 照這張單補回來）；其他鍵照留
  function careerFix(content, career) {
    const c = career && typeof career === 'object' && !Array.isArray(career) ? career : {};
    const K = careerCfg(content), out = Object.assign({}, c, {
      key: typeof c.key === 'string' ? c.key : '', xp: nonNeg(c.xp), spent: {}, off: !!c.off, prof: profOf(c.prof), tree: {}, drawn: [], banked: !!c.banked,
      lastGain: c.lastGain && typeof c.lastGain === 'object' && !Array.isArray(c.lastGain) ? c.lastGain : null });
    for (const T of K.talents) {
      if (!T || T.soon) continue;
      let k = nonNeg((c.spent || {})[T.id]); if (T.max > 0) k = Math.min(k, T.max);
      if (k) out.spent[T.id] = k;
    }
    if (careerPoints(content, out).left < 0) out.spent = {};
    for (const t of TIERS) out.tree[t] = treeFixOne(content, t, (c.tree || {})[t], out.prof[t]);   // 第 D 波棒三：派樹照 content 驗（不認得／之後開放的丟掉、截上限、前置、點數不夠＝這派全退）
    out.drawn = uniq((Array.isArray(c.drawn) ? c.drawn : []).filter(x => Number.isInteger(x) && x > 1)).sort((a, b) => a - b);
    out.got = uniq((Array.isArray(c.got) ? c.got : []).filter(id => typeof id === 'string' && Object.prototype.hasOwnProperty.call(content.cards || {}, id)));
    return out;
  }
  // 策略（runPolicy）：配件不只一件可挑（樂歷 Lv10 菁英／藏家三選一）時挑哪件——顏色配件看包包那軸 ≥4 星幾張、防塵套 3、洗碟水 1，同分照給的順序
  function relicPref(run, content, ids) {
    const axis = {}; for (const a of ATTRS) axis[COLOR_RELIC[a]] = a;
    const bag = (run.bag || []).map(id => cardOf(content, id)).filter(Boolean);
    const score = id => axis[id] ? bag.filter(c => star(c, axis[id]) >= 4).length : id === 'dustcover' ? 3 : id === 'cleaner' ? 1 : 0;
    let best = ids[0], bs = score(best);
    for (const id of ids.slice(1)) { const s = score(id); if (s > bs) { best = id; bs = s; } }
    return best;
  }

  // 包包強度（策略用；店主 11-16 包包不限張數之後「這張值不值得放進包包」）：每一手從包包抽 5 張手牌（CFG.handSize），
  //   三軸各算「這 5 張裡那軸最大星」的期望值，三軸加總。精確解（不用模擬）：那軸星數由小到大 v1..vN、h＝min(5, N)，
  //   第 k 小的是這手最大的機率＝C(k−1, h−1)／C(N, h)。強牌越多分越高；加一張比手上常見那幾張都弱的牌 → 抽到強牌的機會變小 → 分數掉（稀釋）。
  //   王牌不在包包裡、不算。只給策略用（runPolicy／shopPolicy／thinPolicy／sim），引擎規則不讀它
  const BAG_EPS = 0.005;
  function comb(n, k) { if (k < 0 || k > n) return 0; let r = 1; for (let i = 1; i <= k; i++) r = r * (n - k + i) / i; return r; }
  function handMaxEv(vals, h) {
    const v = vals.slice().sort((a, b) => a - b), N = v.length, all = comb(N, h);
    let e = 0;
    for (let k = h; k <= N; k++) e += v[k - 1] * comb(k - 1, h - 1) / all;
    return e;
  }
  //   第 I 波 I-2（SPEC-I §3.7、附錄 Z4 補量那版）：第三個參數 run 上場制（luScore：lineupOn 且 pos ≥ lineupFrom）＝包包是板凳、多一張不稀釋——
  //   每軸前三張加權 1／0.5／0.25（星數用聽膩後的：wornCard）＋夠格（最高星 ≥4）的第 n+1…deadAt 張每張 +depth（要有替手輪換）。沒給 run／關著＝逐字舊算法
  function bagScore(content, ids, run) {
    const cs = (ids || []).map(id => cardOf(content, id)).filter(Boolean), N = cs.length;
    if (!N) return 0;
    if (run && luScore(run)) {
      const L = luCfg(content), n = luN(content), wr = wearOn(run);
      let sc = 0;
      const ws = wr ? cs.map(c => wornCard(content, run, c.id)) : cs;
      for (const a of ATTRS) { const v = ws.map(c => star(c, a)).sort((x, y) => y - x); sc += (v[0] || 0) + 0.5 * (v[1] || 0) + 0.25 * (v[2] || 0); }
      const n4 = cs.filter(c => peak(c) >= 4).length;
      return sc + (+L.depth || 0) * Math.min(Math.max(0, n4 - n), Math.max(0, (L.deadAt | 0) - n));
    }
    const h = Math.min(CFG.handSize, N);
    let sum = 0;
    for (const a of ATTRS) sum += handMaxEv(cs.map(c => star(c, a)), h);
    return sum;
  }
  // 收這張（或買這張）包包強度漲多少（負的＝稀釋）；drop＝同時拿掉／賣掉的那張
  function bagGain(run, content, id, drop) {
    const bag = (run && run.bag) || [], next = bag.filter(x => x !== drop);
    if (id != null && !next.includes(id)) next.push(id);
    return bagScore(content, next, run) - bagScore(content, bag, run);
  }
  const LEVEL_MIX = ['atk', 'def', 'atk', 'hp', 'def', 'atk', 'hp', 'def', 'atk', 'hp'];   // variants MIX（X→hp）
  // a reasonable player's choice for whatever the run waits on (sim, __lab autoplay)
  function runPolicy(run, content, o) {
    o = o || {};
    const preferRelic = o.preferRelic !== false;
    const p = run.pending;
    if (!p) {                                                  // 第 I 波 I-2：沒 pending 但要挑上場（沒攤位的換輪、上場那張賣掉）＝lineupPolicy
      if (lineupOn(run) && run.lineupDue && luRound(run) && !run.duel && !run.over) { const P0 = lineupPolicy(run, content); return { type: 'lineup', ids: P0.ids, bench: P0.bench }; }
      return null;
    }
    if (p.type === 'stall' || p.type === 'draft') return cPolicy(run, content, o);   // 第 C 波：攤位、選秀交給 cPolicy
    if (p.type === 'retry') return { type: 'retry' };
    if (p.type === 'level') {                                  // harness MIX：A D A H D A X D A H（X＝引擎沒有「不加」→ 聲望上限）
      const offer = p.offer || [];
      if (o.facPick !== false) {                               // 第 D 波棒二：本派格出了就拿（SPEC-D §3.5；o.facPick false＝不拿）；棒三「挑著學」出兩個＝照 content.factions[派].priority 挑前面的
        const fs = offer.filter(x => x && x.pick === 'fac'), pr = ((facCfg(content) || {})[run.ace] || {}).priority || [], rk = id => { const i = pr.indexOf(id); return i < 0 ? 99 : i; };
        const f = fs.length > 1 ? fs.slice().sort((a, b) => rk(a.id) - rk(b.id))[0] : fs[0];
        if (f) return { type: 'level', pick: 'fac', id: f.id };
      }
      const mix = o.levelMix || LEVEL_MIX, want = mix[(run.picks || []).filter(x => !String(x).startsWith('fac:')).length % mix.length];   // MIX 只數屬性那幾次（本派格不算）
      const pick = (offer.find(x => x.pick === want) || offer[0] || {}).pick;
      return pick ? { type: 'level', pick } : null;
    }
    const cOf = id => content.cards[id];
    const pickRelic = () => {
      const left = p.relics.filter(id => !run.relics.includes(id));
      if (!left.length || relicN(run, content) >= CFG.relicMax) return null;
      return { type: 'relic', relicId: p.prologue ? left[fnv1a32(run.seedKey + '#relic#' + run.runNo) % left.length] : left.length > 1 ? relicPref(run, content, left) : left[0] };
    };
    if (p.need === 'cardOrRelic' && preferRelic) { const r = pickRelic(); if (r) return r; }
    if (!p.cardDone) {
      const order = p.cards.slice().sort((a, b) => peak(cOf(b)) - peak(cOf(a)) || power(cOf(b)) - power(cOf(a)));
      // 包包不限（預設）：挑讓包包強度（bagScore：5 張手牌每軸最大星的期望值加總）漲最多的那張，漲不到 BAG_EPS 就不拿（牌組變大會稀釋）
      if (!bagLimited()) {
        const base = bagScore(content, run.bag, run);
        let pick = null, gain = BAG_EPS;
        for (const id of order) { if (run.bag.includes(id)) continue; const g = bagScore(content, run.bag.concat([id]), run) - base; if (g > gain) { gain = g; pick = id; } }
        return pick ? { type: 'take', cardId: pick } : { type: 'skip' };
      }
      // 有上限（--set bagMax=8 對照）：舊規則一字不差——沒滿拿峰值最大的；滿了換掉總星最少那張（不比它強就不拿）
      const best = order[0];
      if (!best) return { type: 'skip' };
      if (!bagFull(run)) return { type: 'take', cardId: best };
      const weakest = run.bag.slice().sort((a, b) => power(cOf(a)) - power(cOf(b)) || peak(cOf(a)) - peak(cOf(b)))[0];
      if (power(cOf(weakest)) >= power(cOf(best))) return { type: 'skip' };
      return { type: 'take', cardId: best, dropId: weakest };
    }
    if (!p.relicDone) return pickRelic() || { type: 'skip' };
    return { type: 'skip' };
  }
  // 特價箱挑三張（sim 的「三色各一、同色挑峰值大的」）：c、o、h 各挑一張；某色沒有就從剩下的挑峰值大的補
  function bargainPolicy(run, content) {
    if (!canBargainPick(run)) return null;
    const left = shopOf(run).bargain.filter(id => cardOf(content, id) && !run.bag.includes(id));
    const better = (a, b) => peak(cardOf(content, b)) - peak(cardOf(content, a)) || power(cardOf(content, b)) - power(cardOf(content, a));
    const ids = [];
    // 每色（bargainLane）挑峰值大的、同峰值挑總星大的（舊 9 張沒有並列：＝舊的 topAttr 挑法）
    for (const a of ATTRS) { const c = left.filter(id => !ids.includes(id) && bargainLane(cardOf(content, id)) === a).sort(better)[0]; if (c) ids.push(c); }
    for (const id of left.slice().sort(better)) if (ids.length < CFG.bargainPick && !ids.includes(id)) ids.push(id);
    return ids.length === CFG.bargainPick ? { type: 'bargainPick', ids } : null;
  }
  // 兩位客人之間怎麼買（§2.1.6）：'none' 不買；'smart' 看下一位客人的牌單（無限試煉：換牌、加星後，含他帶的王牌）主屬性 M，買 COUNTER_OF[M] 軸 ≥4 星、而且比包包裡該軸最強那張更強的唱片
  //   （包包滿就賣總星最少的那張；老闆送的不能賣，跳過），錢夠且還有空位就買加成 COUNTER_OF[M] 的配件
  //   包包不限（預設，店主 11-16）：同一條挑法，但要再加一個條件「放進包包 bagScore 會漲」（漲不到 BAG_EPS 不買，牌組變大會稀釋）、不用賣；
  //   買完再去櫃檯「瘦身」（o.thin，預設開；thinPolicy＝choose sell）：賣掉每一軸都排不進包包前 5 名的牌（第 A 波起送的、種子也交還），包包剩 5 張就停。
  //   有上限（--set bagMax=8）：舊規則一字不差、不瘦身
  function shopPolicy(run, content, mode, o) {
    if (mode !== 'smart' || !canShop(run)) return [];
    const thin = !(o && o.thin === false), unl = !bagLimited();
    const r = clone(run), out = [];
    const id = r.order[r.idx], E = id && content.enemies[id];
    if (!E) return [];
    const g = guestDef(r, content, id, r.pos);                // 實際的牌（換牌、加星後）＋他帶的王牌（藏家、第 5 位起的一般客人）
    const deck = g.deck.slice();
    if (g.ace) deck.push(g.ace);
    const T = COUNTER_OF[deckMain(deck, E.taste)];
    for (let guard = 0; guard < 8; guard++) {
      const bagBest = r.bag.reduce((m, x) => Math.max(m, star(cardOf(content, x), T)), 0);
      const cands = [];
      for (const key of Object.keys(r.shop.bins)) for (const cid of r.shop.bins[key]) {
        const c = cardOf(content, cid);
        if (c && star(c, T) >= 4 && star(c, T) > bagBest) cands.push({ key, cid, c, price: priceOf(content, c) });
      }
      cands.sort((a, b) => star(b.c, T) - star(a.c, T) || power(b.c) - power(a.c) || a.price - b.price);
      let bought = false;
      const base = unl ? bagScore(content, r.bag, r) : 0;
      for (const x of cands) {
        const ch = { type: 'buy', key: x.key, cardId: x.cid };
        if (unl && bagScore(content, r.bag.concat([x.cid]), r) - base <= BAG_EPS) continue;
        if (bagFull(r)) {                                       // 有上限而且滿了才要賣（bagMax null／0／負數＝不限，跟 Infinity 一樣不賣）
          ch.sellId = r.bag.filter(x => !isGift(r, content, x) && !isSeed(r, content, x)).sort((a, b) => power(cardOf(content, a)) - power(cardOf(content, b)) || peak(cardOf(content, a)) - peak(cardOf(content, b)))[0];   // 老闆送的不能賣
          if (ch.sellId == null) continue;
        }
        if (choose(r, content, ch).ok) { out.push(ch); bought = true; break; }
      }
      if (!bought) break;
    }
    const rid = 'boost_' + T;
    if (r.shop.relics.includes(rid) && relicN(r, content) < CFG.relicMax) {
      const ch = { type: 'buyRelic', relicId: rid };
      if (choose(r, content, ch).ok) out.push(ch);
    }
    if (unl && thin) for (const ch of thinPolicy(r, content)) if (choose(r, content, ch).ok) out.push(ch);
    return out;
  }
  // 包包瘦身（包包不限之後「拿了賣錢」那一半）：賣掉「在每一軸都排不進包包前 5 名」的牌（deadWeight：每一軸都有至少 5 張別的牌那軸星 ≥ 它
  //   ＝它永遠不會是你手上那軸最好的那張，只會佔掉手牌的格子）。先賣有錢拿的、再交還送的／種子（$0），同一類裡先賣總星最少的，一次一張、重算；
  //   沒有了、包包剩手牌張數（5）、或不能賣（canShop）就停。回傳 [{type:'sell', cardId}…]（照順序做；不改傳進來的 run）
  //   第 I 波 I-2：run 上場制（luScore）＝門檻改成 deadAt 張（要留替手輪換：上場 n＋夠格的替手）
  function deadWeight(content, bag, id, run) {
    const c = cardOf(content, id); if (!c) return true;
    const others = bag.filter(x => x !== id).map(x => cardOf(content, x)).filter(Boolean);
    const need = run && luScore(run) ? Math.max(CFG.handSize, luCfg(content).deadAt | 0) : CFG.handSize;
    return ATTRS.every(a => others.filter(o => star(o, a) >= star(c, a)).length >= need);
  }
  //   第 A 波 5（櫃檯賣給老闆）：老闆送的、種子也能交還（$0），一樣看 deadWeight；先賣有錢拿的，再交還 $0 的（同一類裡總星少的先）
  //   第 I 波 I-2：上場制（luScore）不瘦身（包包是板凳，多一張不稀釋；補量原型 thinPolicy 上場制下不賣）
  function thinPolicy(run, content) {
    if (!canShop(run) || luScore(run)) return [];
    const r = clone(run), out = [];
    const free = x => isGift(r, content, x) || isSeed(r, content, x);
    for (const id of (r.sellNext || []).slice()) { if (r.bag.includes(id) && choose(r, content, { type: 'sell', cardId: id }).ok) out.push({ type: 'sell', cardId: id }); }   // cPolicy takeSell：收了就拿去櫃檯賣（只有量測選項會設）
    for (let guard = 0; guard < 60 && r.bag.length > CFG.handSize; guard++) {
      const pick = r.bag.filter(x => deadWeight(content, r.bag, x))
        .sort((a, b) => (free(a) ? 1 : 0) - (free(b) ? 1 : 0) || power(cardOf(content, a)) - power(cardOf(content, b)) || (a < b ? -1 : a > b ? 1 : 0))[0];
      if (pick == null) break;
      const ch = { type: 'sell', cardId: pick };
      if (!choose(r, content, ch).ok) break;
      out.push(ch);
    }
    return out;
  }

  // ============================================================================================================================
  // 玩家策略（§2.1.7）：policies[name](duel, R, mem, content) -> act。只有 oracle 讀 duel.plan／e.hand／e.pile。
  // ============================================================================================================================
  function pubOpts(v) {
    const os = [];
    v.hand.forEach((c, i) => { if (c) for (const a of ATTRS) os.push({ act: { i, attr: a }, card: c, attr: a, star: star(c, a), ace: false }); });
    if (v.ace) os.push({ act: { ace: true }, card: v.ace, attr: v.aceAxis, star: v.aceStar != null ? v.aceStar : CFG.aceStar, ace: true });   // 第 I 波：安可回來的 6 星
    return os;
  }
  function pickMax(os) { let b = null; for (const o of os) if (!b || o.star > b.star) b = o; return b; }
  const onAxis = (os, a) => pickMax(os.filter(o => o.attr === a));
  const fallbackR = st => makeRng(((st.rng | 0) ^ 0x9e3779b9) + (st.n | 0));
  // 他各軸星數估計：公開牌單扣掉已亮過的，該軸前三大的平均（四捨五入）。星數讀 view.eDeck（實際、加星後的牌；curve harness core.cjs estStars）
  function estStars(v, content) {
    const left = v.eDeckIds.slice();
    for (const id of v.eThrownIds) { const k = left.indexOf(id); if (k >= 0) left.splice(k, 1); }
    const pub = {}; for (const x of v.eDeck || []) pub[x.id] = x;
    const cards = left.map(id => pub[id] || (content && content.cards && content.cards[id])).filter(Boolean);
    const est = {};
    for (const a of ATTRS) {
      const top = cards.map(c => star(c, a)).sort((x, y) => y - x).slice(0, 3);
      est[a] = top.length ? Math.round(top.reduce((s, x) => s + x, 0) / top.length) : 3;
    }
    return est;
  }
  // 一手的值：扣他的 − 他扣你的（打到 0 為止，溢出不算：harness 的 overkill clip）；這手會分勝負就 ±20
  function valueOf(v, r, terminal) {
    const p2 = v.pHp - r.toP, e2 = v.eHp - r.toE, ahead = playerAhead(p2, v.pMax, e2, v.eMax);
    let val = Math.min(r.toE, Math.max(0, v.eHp)) - Math.min(r.toP, Math.max(0, v.pHp));
    if (p2 <= 0 || e2 <= 0) val += ((p2 <= 0 && e2 <= 0) ? ahead : e2 <= 0) ? 20 : -20;
    else if (terminal) val += ahead ? 20 : -20;
    return val;
  }
  // 期望值一步最佳；同分先取出的那軸星高的（harness tieHigh：都能 KO 時不挑最弱、被 6 星剋不動的那張），再取總星小的（省大牌）
  function evPick(st, v, os, dist, aceCost) {
    const terminal = v.n >= v.maxRounds || (v.eHandN + v.pile) <= 1;
    let best = null, bv = -Infinity, bp = Infinity, bs = -Infinity;
    for (const o of os) {
      let ev = 0;
      for (const d of dist) { if (!d.p) continue; const r = preview(st, o.act, d.side); if (r) ev += d.p * valueOf(v, r, terminal); }
      if (o.ace && !terminal) ev -= aceCost;
      const pw = power(o.card), ps = o.star;
      if (ev > bv + 1e-9 || (Math.abs(ev - bv) <= 1e-9 && (ps > bs || (ps === bs && pw < bp)))) { best = o; bv = ev; bp = pw; bs = ps; }
    }
    return best;
  }
  // 11-17 讀牌加難：玩家心裡的客人模型 → 他這手出哪色的分布 {c,o,h}（DESIGN §1.2；scratchpad v5/harder proto/protopols.mjs guestDist）
  //   prm＝{q 照實、rho 讀你（上一手有應對才算）、beta 唬人走「剋你剋法」的比例、wMain 半指／不露時「常出」那色的先驗}。
  //   他的計畫色 X：明指＝提示那色；半指／不露＝提示 set 裡、常出那色 wMain、其他平分（沒有常出＝平分）
  //   每個 X：讀你 rho→COUNTER_OF[預測]；其他 (1−rho)：照實 q→X、唬人 (1−q)·beta→BEATS[X]、(1−q)(1−beta)→COUNTER_OF[X]
  function guestDist(v, prm) {
    const h = v.hint || {}, set = h.set || (ATTRS.includes(h.attr) ? [h.attr] : ATTRS), main = v.eMain, rel = v.honesty ? v.honesty.rel : null;
    const w = {}; let tot = 0;
    for (const a of set) { const p0 = main ? (a === main ? prm.wMain : (1 - prm.wMain) / 2) : 1; w[a] = p0; tot += p0; }
    const H = { c: 0, o: 0, h: 0 }, B = { c: 0, o: 0, h: 0 };
    for (const a of set) {
      const wa = tot > 0 ? w[a] / tot : 1 / set.length, rho = rel ? prm.rho || 0 : 0, q = prm.q, b = prm.beta != null ? prm.beta : 1;
      H[a] += wa * (1 - rho) * q; B[BEATS[a]] += wa * (1 - rho) * (1 - q) * b; B[COUNTER_OF[a]] += wa * (1 - rho) * (1 - q) * (1 - b);
      if (rel) { const pred = rel === 'counter' ? COUNTER_OF[a] : rel === 'mirror' ? a : BEATS[a], k = COUNTER_OF[pred]; (k === a ? H : B)[k] += wa * rho; }
    }
    return { c: H.c + B.c, o: H.o + B.o, h: H.h + B.h };
  }
  const distSides = (D, est) => ATTRS.map(a => ({ p: D[a], side: { attr: a, star: est[a], ace: false } }));
  const wMainOf = st => (st.e && st.e.mainBias ? 0.8 : 0.5);               // 常出那色的先驗：出招偏主屬性的位數（第 4 位起）0.8、之前 0.5
  // 照模型挑：會讀的（精確數字）／一般玩家（抓大概）／舊腦袋（以為只有一種唬人、不知道會被讀）
  const PRM = {
    thoughtful: (st, v) => ({ q: v.honesty.qNow != null ? v.honesty.qNow : v.honesty.q, rho: v.honesty.rhoNow || 0, beta: v.honesty.beta, wMain: wMainOf(st) }),
    humanRead: () => ({ q: 0.7, rho: 0.4, beta: 0.7, wMain: 0.7 }),
    oldReader: (st, v) => ({ q: v.honesty.qNow != null ? v.honesty.qNow : v.honesty.q, rho: 0, beta: 1, wMain: wMainOf(st) }),
  };
  const reader = name => (st, R, mem, content) => {
    const v = view(st), os = pubOpts(v); if (!os.length) return null;
    if (!v.hint) return pickMax(os).act;
    return evPick(st, v, os, distSides(guestDist(v, PRM[name](st, v)), estStars(v, content)), 2).act;
  };
  // 新手怎麼看提示：明指＝那色；半指＝常出在裡面就常出、否則兩色挑一個；不露＝常出（沒有常出＝看不懂）
  function guessAttr(st, v) {
    const h = v.hint; if (!h) return null;
    if ((h.kind || 'one') === 'one') return h.attr;
    const set = h.set || ATTRS, main = v.eMain;
    if (main && set.includes(main)) return main;
    if (h.kind === 'none') return null;
    return set[Math.floor(fallbackR(st)() * set.length)];
  }
  const policyFns = {
    random: (st, R) => { R = R || fallbackR(st); const acts = legalActions(st); return acts[Math.floor(R() * acts.length)] || null; },
    // 只出最大星：手牌＋王牌裡星最大的那一手（王牌算 7 → 第一手就丟）
    high: st => { const b = pickMax(pubOpts(view(st))); return b ? b.act : null; },
    // 永遠剋提示：只看明指（COUNTER_OF[提示] 軸最大的那張）；半指／不露看不懂＝high；那軸最大 ≤1 星就改 high
    counterHint: st => {
      const v = view(st), os = pubOpts(v); if (!os.length) return null;
      const o = v.hint && v.hint.attr ? onAxis(os, COUNTER_OF[v.hint.attr]) : null;
      return (o && o.star > 1 ? o : pickMax(os)).act;
    },
    // 新手（11-17）：明指就剋它；半指／不露照 guessAttr 猜一色剋；猜不出、那軸 ≤1 星＝high（背對照表的人＝提示一律看得懂＝同一條）
    novice: st => {
      const v = view(st), os = pubOpts(v); if (!os.length) return null;
      const g = guessAttr(st, v), o = g ? onAxis(os, COUNTER_OF[g]) : null;
      return (o && o.star > 1 ? o : pickMax(os)).act;
    },
    // 兩步公式（舊版懂反讀）：上一手你照提示剋（honesty.rel counter）→ 這手出提示同色最大的；否則剋提示（看不懂的提示照新手猜）
    formula: st => {
      const v = view(st), os = pubOpts(v); if (!os.length) return null;
      const g = guessAttr(st, v); if (!g) return pickMax(os).act;
      const two = !!(v.honesty && v.honesty.rel === 'counter');
      const o = onAxis(os, two ? g : COUNTER_OF[g]);
      return (o && o.star > 1 ? o : pickMax(os)).act;
    },
    // 跟提示同色（對照）：只看明指
    mirrorHint: st => { const v = view(st), os = pubOpts(v); if (!os.length) return null; const o = v.hint && v.hint.attr ? onAxis(os, v.hint.attr) : null; return (o || pickMax(os)).act; },
    // 會讀的：知道客人模型的精確數字（qNow 放水後、rhoNow、beta、上一手應對、常出先驗），三色分布算期望值；他各軸星數用公開牌單估；王牌在非最後一手扣 2
    thoughtful: reader('thoughtful'),
    // 一般玩家（11-17 新）：同上，但數字抓大概（照實 .7、讀心 .4、剋你剋法 .7、常出 .7）
    humanRead: reader('humanRead'),
    // 舊腦袋（11-17 新，sim 對照＝店主第一次玩新版）：會算照實機率，但以為只有一種唬人（BEATS[提示]）、不知道會被讀
    oldReader: reader('oldReader'),
    // 先知：知道他這手出哪張、哪色（王牌成本 0.5）
    oracle: st => {
      const v = view(st), os = pubOpts(v); if (!os.length) return null;
      if (!st.plan) return pickMax(os).act;
      return evPick(st, v, os, [{ p: 1, side: { i: st.plan.idx, attr: st.plan.attr } }], 0.5).act;
    },
  };
  // ---- 頂點卡試做：旗標下（duel.apexMode）而且這手還能發動，策略自己決定要不要發動（回傳的 act 多 apex:true）；旗標關時一行都不走（亂數也不多取）----
  //   會讀的：期望增益 ≥ APEX_TAU[第 n 手] 才發動（越後面越鬆；FRAME 附錄 A）；整場型第 1 手就發動；回聲望＝聲望 ≤ 上限 − N 才發動（不浪費）；
  //     看穿＝「知道真假」的資訊價值，發動後照真假挑最好的。拆穿回血把預期回的聲望算進增益。
  //   新手（永遠剋提示）、只出最大星、兩步公式、跟提示同色：第 1 手就發動（看穿：改剋他真正要出的那色）；亂出：每手 1/6；先知：有好處就發動
  const APEX_TAU = [0, 2.5, 1.5, 0.6, 0.2, 0.01, 0];
  const withApex = act => act ? Object.assign({}, act, { apex: true }) : act;
  function apexEv(st, v, act, dist) {
    const terminal = v.n >= v.maxRounds || (v.eHandN + v.pile) <= 1;
    let ev = 0;
    for (const d of dist) { if (!d.p) continue; const r = preview(st, act, d.side); if (r) ev += d.p * (valueOf(v, r, terminal) + (r.heal | 0)); }
    return ev;
  }
  function apexPolicy(name, f, st, R, mem, content) {
    const A = st.p.ability;
    if (apexHas(A, 'heal')) {
      const act = f(st, R, mem, content), n = apexOps(A.op, A.params).find(x => x.op === 'heal').params.n | 0;
      return st.p.hp <= st.p.max - n ? withApex(act) : act;
    }
    if (name === 'random') { const RR = R || fallbackR(st), act = f(st, RR, mem, content); return RR() < 1 / 6 ? withApex(act) : act; }
    const reveal = apexHas(A, 'reveal');
    if (name === 'thoughtful' || name === 'oracle') {
      const v = view(st), os = pubOpts(v);
      if (!os.length || !v.hint) return f(st, R, mem, content);
      let dist, D = null, est = null;
      if (name === 'oracle') dist = [{ p: 1, side: { i: st.plan.idx, attr: st.plan.attr } }];
      else {                                                             // 11-17：三色分布（guestDist；半指／不露沒有提示那色）
        est = estStars(v, content); D = guestDist(v, PRM.thoughtful(st, v));
        dist = distSides(D, est);
      }
      const b0 = evPick(st, v, os, dist, 2);
      let gain, act1;
      if (reveal) {
        if (!D) return b0.act;
        // 發動就知道這手是真是假（章＝feintOf：明指＝出不出提示那色、半指＝出不出他說不出那色、不露一律真話＝沒有資訊）：照真／假各自的分布挑最好的
        const part = lie => { const o = {}; for (const a of ATTRS) o[a] = lieOf(v.hint, a) === lie ? D[a] : 0; return o; };
        const J = { honest: part(false), bluff: part(true) };
        const sum = o => o.c + o.o + o.h, pH = sum(J.honest), pB = sum(J.bluff);
        const norm = (o, t) => ({ c: t > 0 ? o.c / t : 0, o: t > 0 ? o.o / t : 0, h: t > 0 ? o.h / t : 0 });
        const dh = distSides(norm(J.honest, pH), est), db = distSides(norm(J.bluff, pB), est);
        const bh = evPick(st, v, os, dh, 2), bb = evPick(st, v, os, db, 2);
        gain = pH > 1e-9 && pB > 1e-9 ? pH * (apexEv(st, v, bh.act, dh) - apexEv(st, v, b0.act, dh)) + pB * (apexEv(st, v, bb.act, db) - apexEv(st, v, b0.act, db)) : 0;   // 一邊是 0（不露）＝章沒有資訊
        act1 = withApex(feintOf(st, st.plan.attr) ? bb.act : bh.act);    // 發動就知道這手是真是假（＝activateApex 的章）
      } else {
        const b1 = evPick(st, v, os.map(o => Object.assign({}, o, { act: withApex(o.act) })), dist, 2);
        act1 = b1.act; gain = apexEv(st, v, act1, dist) - apexEv(st, v, b0.act, dist);
      }
      if (A.timing === 'duel') return act1;                              // 整場型：第 1 手就開（FRAME 量測同口徑）
      const tau = name === 'oracle' ? 0 : APEX_TAU[Math.min(6, v.n)];
      return gain > 0 && gain >= tau ? act1 : b0.act;
    }
    // 新手、只出最大星、兩步公式、跟提示同色：第 1 手就發動
    if (reveal && name !== 'high') {
      const a = st.plan.attr, o = bestChip(st, COUNTER_OF[a]);
      return withApex(o && star(st.p.hand[o.i], o.attr) > 1 ? o : f(st, R, mem, content));
    }
    return withApex(f(st, R, mem, content));
  }
  for (const k of Object.keys(policyFns)) {
    const f = policyFns[k];
    policyFns[k] = (st, R, mem, content) => (st && st.apexMode && canApex(st)) ? apexPolicy(k, f, st, R, mem, content) : f(st, R, mem, content);
  }
  const policies = policyFns;
  // ---- 第 I 波安可：會湊條件的策略（只給 sim 量上界，SPEC-I §1.7、AN6；畫面、預設策略不用）。encorePolicy(name) → 包一層 policies[name] ----
  //   7 星安可盤一定丟；頂點卡安可成立（能力回來）就再發動；還在等條件：同色比贏＝明指時出提示那色最大星、連剋＝上一手剋中就照提示剋（剋提示那色最大星）；其他照原策略
  function encorePolicy(name) {
    const f = policies[name] || policies.thoughtful;
    return (st, R, mem, content) => {
      const P = st && st.p, Q = P && P.enc;
      if (!Q || st.over || !st.plan) return f(st, R, mem, content);
      if (Q.mode === 'ace' && P.encAce && !P.aceUsed && isLegal(st, { ace: true })) return { ace: true, attr: aceAxis(P.ace) };
      const base = f(st, R, mem, content);
      if (Q.mode === 'apex' && Q.state === 'hit' && canApex(st) && base && !base.ace) return Object.assign({}, base, { apex: true });
      if (Q.state !== 'wait' || base == null || base.ace) return base;
      const h = view(st).hint;
      if (!h || h.kind !== 'one' || !h.attr) return base;
      let want = null;
      if (Q.when === 'sameWin') want = h.attr;
      else if (Q.when === 'combo2' && P.encPrev && P.encPrev.n === st.n - 1 && P.encPrev.kind === 'counter') want = COUNTER_OF[h.attr];
      if (!want) return base;
      const o = bestChip(st, want);
      return o ? Object.assign({}, o, base.apex ? { apex: true } : {}) : base;
    };
  }

  const API = { VERSION, RUN_V, ATTRS, ZH, ZH1, BEATS, COUNTER_OF, beats, TIERS, TIER_AXIS, COLOR_RELIC, CFG, HONESTY, PLANNERS, TRIAL,
    RARITY, FEATURE_RARITY, SHELF_RARITY, SHOP_ORDER,
    rng, makeRng, shuffle, fnv1a32, hash01, clone, star, power, aceAxis, topAttr, peak, deckMain, clash, relicObj, playerAhead, hpPct,
    enemyDef, playerDef, startDuel, beginHand, legalActions, isLegal, preview, resolveTurn, view, bestChip, blockedChoice,
    newRun, current, nextStep, startFight, finishFight, choose, canShop, canBargainPick,
    trialCfg, classAt, roundOf, trialGuest, trialDeck, roundGuests, levelOffer, mercyPAt, titleAt, guestTitle, roundMains, mainAt, guestDef, legacyView, oldDeckIds, pinOldDeck, sellQuote, nextCheckpoint, toCheckpoint, runSummary, restock, fixBins, fixBargain, fixMain, jumpTo, half, hintTableOf,
    relOf, streakOf, guestDist, hintTableFor,
    rarity, rarityScore, categoryOf, GENRE_BIN, pctPair, priceOf, bargainPriceOf, bargainPriceIn, relicPrice, sellValue, isGift, moneyText,
    radioPool, canRadio,
    LOT, lotCfg, lotQuota, lotWarn, stockBins, drawLot, shelve, lotOk, fixLot, lotLeft, mapIds, dailyPick, dailyReward,
    bagCap, bagLimited, bagFull, bagScore, bagGain, topAxes, bargainLane,
    runPolicy, shopPolicy, thinPolicy, bargainPolicy, policies,
    canSeed, isSeed, seedPolicy, bossAceFor, keepCandidates, keepOne, canSwitchAce, switchAce,
    TIER_BEATS, unlockChain, tierOfApex, apexCards, unlockedTiers, ownedApex, nextUnlock, unlockMigrate, unlockTiersOf, ownedApexOf, aceChoices, bossCardFor, fixUnlock,
    APEX_OPS, APEX_TIMINGS, APEX_TAU, apexList, apexAceId, abilityOf, canApex, activateApex,
    WAVEC, wcCfg, floorAt, wcTh, wcPool, lootRow, chestRow, stallSession, stallResume, stallUnlocked, stallLadder, cPolicy, gigPrice, gigKeepN, draftPlan, expLevel,
    deadWeight, isCheckpoint, sellCore, setCtx, lexpBase, fixWaveC, wcFound,
    CAREER, LEXP_ROUTE, careerCfg, careerGain, posFought, careerLevel, careerNeed, careerXpAt, careerPoints, talentDef, talentCost, talentOpen, talentBuy, talentSell, careerRespec,
    talentArgs, applyTalent, gainXp, xpNeed, levelHpAt, careerLive, careerRecurve, gigRoom, ladderList, ladderAt, ladderNext, careerDraw, careerDrawRarity, profLevel, profGain, profFirst, careerDeposit, careerFix, relicPref, seedsOf,
    FAC_OPS, FAC_NOTE_ORDER, facCfg, facPickDef, facFxOf, facDue, facOffer, apexAbilityOf, fixFac,
    facGuestAdd, deepNow,
    TREE_OPS, TREE_FX_MAX, TREE_FX_ADD, treeNodes, treeNode, treeCost, treePoints, treeWhy, treeBuy, treeSell, treeRespec, treeArgs, treeList, treeFixOne, facTalOf, treeLv3,
    TRIAL_PASS, TRIAL_OPEN_FROM, addMerge, trialTiers, trialFix, trialPick, trialMul, trialRecord,
    ENC_WHEN, ENC_GIVE, encCfg, encoreOf, aceEncoreOf, encoreLine, encoreTag, encFamilyKey, encorePolicy, pAceStar,
    fightSetup, SPAR, SPAR_STATES, SPAR_KEYS, SPAR_MODES, SPAR_POLICIES, sparCfg, sparAddAt, sparTierAt, sparMode, sparPos, sparDeck, SPAR_LINE_IDS, encPending, encOffer, encView, encDef, encStart, encLoot, encFinish, encVoid, fixEnc, encPolicy,
    LINEUP, WEAR, luCfg, wearCfg, lineupOn, wearOn, luRound, benchN, wornCard, wearLayers, lineupOf, lineupPolicy, lineupQuiet, lineupPrep, luMains, luScoreOf, fixLineup,
    isSlotRelic, relicN, relicFull };
  API._noCache = false;   // 組牌快取開關（WP2-0）：true＝trialDeck／radioPool 走原本的寫法（測試對照用；結果一樣、只是慢）
  return API;
});
