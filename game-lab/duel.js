// game-lab/duel.js — 品味對決 v4：店內舞台下方的對決盤面（Agent B1；SPEC-v4 §2.5.1、§2.2.7、§2.3.3；手牌 FIXLIST 11：H2）
//
// ── v4 contract（tutorial.js／ui.js／e2e 照這些名字找）────────────────────────────────────────────────────
// data-tut  他的一塊：e-hud e-name e-hp e-stats e-hint e-rec e-sleeve e-pile（名牌只有名字：副標與誠實度都拿掉，FIXLIST 6）
//           牌桌    ：table slot-e slot-p tri tri-oc tri-ch tri-ho rounds result（浮框 .l1 .l2 .l3） lastline
//                     lastplay lp-e lp-p（上一手小列：牌桌最上面一列，第 2 手起才有；店主 11-16「打完要把上一手的專輯留在檯面上」）
//           你的一塊：p-hud p-hp p-stats relics relic-<id> hand hand-<i> hand-ace card-<i> card-ace pop chip-<i>-<attr> chip-ace
//             （e-stats／p-stats：無限試煉的品味／底氣小籤「品 n」「底 n」（content.trial.ui.atkShort／defShort；view 的 eAtk eDef／pAtk pDef，大於 0 才有）。
//              你那一列的在發燒配件右邊，算進屬性鈕的讓位清單（nameRowItems）；結果句的品味／底氣那句（clash.notes 的 stat）出現時那顆閃一下）
//             （v5 手風琴（店主 11-09「專輯尺寸相同、往旁邊攤開、只有點擊的專輯秀出來、其他維持疊著」）：手牌疊成水平一排（每張往右錯開、露出左邊一條，像新接龍；不轉角），
//              每張封面一樣大、不管疊著還是打開；點一張（露出來那一條）＝在那張打開：它右邊的牌往右滑開、那張整張露出來並浮起，其他照樣疊著；
//              正上方跳屬性鈕（pop；chip-<i>-<attr>／王牌 chip-ace 只有打開的那張有）；點屬性鈕＝照那個屬性丟出。沒有星鈕列、沒有「丟！」、沒有整排攤開）
// el(name)：上面的名字；
//           'card:best:<attr>'／'chip:best:<attr>'（＋':ace'＝王牌也算）＝那一色星最多的那張封面／屬性鈕（engine.bestChip）；
//           'card:id:<cardId>'＝那張的封面；'chip:id:<cardId>:<attr>'＝那張那色的屬性鈕（打開時才有）；
//           'card:blocked:<attr>'／'chip:blocked:<attr>'＝engine.blockedChoice 那張的封面／屬性鈕；
//           'card:<cardId>'＝那張的整格（v3）；'@f'|'@p'|'@o'＝舞台錨點。
//
// DipLabDuel.mount(panelEl, { duel, events, run, content, enter, onEnd(result), onSave(duel),
//   hooks: { stage, cardInfo(card,{attr,from}), hint(id,targets), settings()->{fastAnim}, onEvent(ev,duel), tut, resolveOpts(act),
//            beforeEnd(result)->Promise, endText(result)->{title,sub}|null, relicIcon(id,size)->html } })
//   result（onEnd／'over'）＝{ over:'win'|'lose', win, by:'hp'|'rounds'|'pile', pHp, eHp, duel }
// DipLabDuel.unmount() rerender() el(name) on(evt,cb)->off hold(bool)->count select(i|'ace'|null, attr?) preview(attr) play(act)->Promise
//           tri(lit|null)（教學：強制亮哪幾條箭頭，'oc'|'ch'|'ho' 或陣列） autoplay(policy) stopAuto() debug()
//           _fmt.clashText(clashEvent, T, hints) → { l1, l2, l3, cls, rule, notes }（e2e 比對浮框）
// gate（hooks.tut.gate(action) 回 false 就擋）：{kind:'card',i,attr,id}（點一張封面＝在那張打開、浮起，attr＝topAttr）
//   {kind:'throw',i,attr,id}（點屬性鈕＝出手，唯一的出手方式） {kind:'collapse'}（再點打開的那張、或點手牌外面＝收回疊好）
//   {kind:'chip',i,attr,id}（只有 API select(i, attr) 送：換預覽的屬性，不出手） {kind:'info',where} {kind:'close'}；i＝0..handSize−1 或 'ace'
// 事件：'phase'(choose|resolve|over) 'selected'({i,attr}|null：打開哪張／收回) 'resolved'(evs：560 ms 浮框剛出現時，同步) 'settled'(evs：1460 浮框收成一行)
//       'handStart'(view) 'over'(result) 'info'(where) 'infoClosed'(where) 'relic'(id) 'apex'({open}|{t:'apex',…}：頂點卡試做的能力框開關／發動)
//       info 的 where：hand｜hand-ace｜slot-e｜slot-p｜last-e｜last-p（上一手小列；cardinfo 收到的 from＝'duel:' + where）
//
// 頂點卡純輔助卡試做（?apex=1；view().apex 有才走，旗標關時下面這些一個元素都不建）：王牌格＝輔助卡格，不能拿來比星（不跳屬性鈕）。
//   點它＝正上方跳能力框（能力名・時機、說明、「王牌不比星。」＋「發動」；用過了只寫「這場用過了」）；點框外／點別張＝收起（不發動）。
//   「發動」＝engine.activateApex（不佔這一手，照樣出一張唱片）：王牌那格彈一下＋金光、提示框下面跳一行「王牌《專輯》：能力名」1.2 秒；
//   看穿＝提示框蓋章「真話／唬人！」到這手揭曉；回聲望＝你的聲望條往上長＋「聲望 +2」。結果句那一行（王牌：…）是引擎的 notes。
//   王牌格狀態：可發動＝金框；發動中＝發亮＋「這手／整場」；用過＝變淡＋「用過」；留著型還沒發動＝封面角小金點。
//   API：apex(open?)＝開／收能力框；fireApex()＝發動（同按鈕）。data-tut：apex-box、apex-go。
//
// 規則：畫面上每個數字都來自引擎的 view()／resolveTurn() 事件；UI 不算傷害、不讀 duel.plan。提示只寫句子，不寫屬性名（D §5）。
// 一手（T_FLIP 280／T_HIT 560／T_LINE 1460／T_NEXT 2060）：0 你的牌飛上牌桌、手牌收回疊好、他那格「蓋著」、舞台一台唱盤開演 → 280 他那格翻面
//   → 560 浮框三行、聲望 → 1460 收成「上一手」→ 2060 下一手（牌桌兩張縮小、搬進最上面的上一手小列）。結算中點畫面任一處（牌桌兩張、上一手小列除外：那是唱片資訊）＝這手 4 倍速；?fast=1 全程 4 倍速；?debug=1 → window.__dl。
(function () {
  'use strict';
  if (typeof window === 'undefined') return;

  const BASE = (function () {
    try { const s = document.currentScript && document.currentScript.src; if (s) return new URL('.', s).href; } catch (_) {}
    try { return new URL('.', location.href).href; } catch (_) { return ''; }
  })();
  const ZH = { c: '經典', o: '冷門', h: '硬蕊' }, ZH1 = { c: '經', o: '冷', h: '硬' }, ATTRS = ['c', 'o', 'h'];
  const EDGES = [['o', 'c'], ['c', 'h'], ['h', 'o']];   // 三角的箭頭（畫圖用；輸贏一律看引擎事件）：冷→經、經→硬、硬→冷
  // 相剋圖例的 SVG（純函式；盤面與序章「唱盤前」那個面板共用）。tone：{oc|ch|ho: 'k' 黑｜'g' 亮綠｜'r' 亮紅｜'f' 淡}；ring：哪一圈加黑框；idp：marker id 前綴（同頁兩張圖不撞）
  function triMarkup(tone, ring, idp) {
    const P = { c: [66, 23], h: [107, 94], o: [25, 94] }, R = 21;
    const col = { c: 'var(--c,#1f5fae)', o: 'var(--o,#6a3fa0)', h: 'var(--h,#c11628)' };
    const STROKE = { k: '#111', g: '#2e7d52', r: '#c11628', f: '#d6d6d6' };
    tone = tone || {};
    let s = `<svg viewBox="0 0 132 118" aria-label="冷剋經、經剋硬、硬剋冷" role="img"><defs>`;
    Object.keys(STROKE).forEach(k => { s += `<marker id="${idp}${k}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="3" markerHeight="3" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="${STROKE[k]}"/></marker>`; });
    s += '</defs>';
    EDGES.forEach(([a, b]) => {
      const p0 = P[a], p1 = P[b], dx = p1[0] - p0[0], dy = p1[1] - p0[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
      const x1 = p0[0] + ux * (R + 3), y1 = p0[1] + uy * (R + 3), x2 = p1[0] - ux * (R + 7), y2 = p1[1] - uy * (R + 7);
      const k = tone[a + b] || 'k', w = k === 'f' ? 3 : (k === 'k' ? 4 : 6);
      s += `<g data-tut="tri-${a}${b}" class="eg ${k}"><line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${STROKE[k]}" stroke-width="${w}" marker-end="url(#${idp}${k})"/></g>`;
    });
    ATTRS.forEach(a => {
      const p = P[a];
      s += `<circle cx="${p[0]}" cy="${p[1]}" r="${R}" fill="${col[a]}"${ring === a ? ' stroke="#111" stroke-width="5"' : ''}/>`;
      s += `<text x="${p[0]}" y="${p[1] + 8.5}" text-anchor="middle" font-size="24" font-weight="900" fill="#fff">${ZH1[a]}</text>`;
    });
    return s + '</svg>';
  }
  // 只亮 lit 那幾條（綠）、其他淡；lit 空＝三條照常黑（序章「唱盤前」面板用）
  function triLit(lit, idp) {
    const on = [].concat(lit || []), tone = {};
    EDGES.forEach(([a, b]) => { tone[a + b] = on.length ? (on.includes(a + b) ? 'g' : 'f') : 'k'; });
    return triMarkup(tone, null, idp || 'dlx');
  }
  const TIER_AXIS = { hall: 'c', pearl: 'o', heresy: 'h' };
  const LONG_MS = 450;     // 長按手牌封面＝唱片資訊
  const STACK_DX = 0.3;   // 疊著（店主 17:1x：不要扇形，水平直線像舊版新接龍）：同一條線上每張往右錯開 3 成寬，不轉角、不成弧形
  const OPEN_MIN = 0.22;   // 打開一張時寬度不夠：其他疊著的牌露出來的那一條先收窄（3 成 → 最窄 22%），還不夠才把所有封面一起縮小（sizeBoard）
  const OPEN_GAP = 4;      // 打開那張跟右邊那疊之間留的縫
  const LIFT = 6, POP_GAP = 4;   // 打開那張浮起 6 px；屬性鈕在它上面 4 px（屬性鈕往上蓋「你」那一列，不能再高：390／375 會蓋到相剋圖例的「硬」）
  const RUSH_MS = 350;     // 丟出後 350 ms 內的點擊不算「加速這一手」
  const DBL_MS = 320, DBL_PX = 24;   // 點一張打開後，同一個位置 320 ms 內的第二下＝雙擊的第二下：不算「再點打開那張＝收回」（不會一開就關）
  const T_FLIP = 280, T_HIT = 560, T_LINE = 1460, T_NEXT = 2060;
  // 看字的時間（跟對白同一條：約每秒 6–7 字，最多 6.5 秒；店主 11-12「他唬我 我還沒看清楚被唬了什麼就過去了」）
  const readMs = t => Math.min(6500, 1400 + 140 * String(t || '').length);
  const HOLD_GUARD = 500;  // 唬你／剋不動的結果框停住後 500 ms 內的點擊不算（連點不會一閃就過）
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  const Eng = () => window.DipLabEngine;
  const Fx = () => window.DipLabFx || null;
  const sfx = (n, o) => { const f = Fx(); if (f && f.sfx) try { f.sfx(n, o); } catch (_) {} };
  const qs = new URLSearchParams(location.search || '');
  const FAST = qs.get('fast') === '1';
  const rmq = () => { try { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (_) { return false; } };
  const cssEsc = s => (window.CSS && CSS.escape ? CSS.escape(String(s)) : String(s).replace(/["\\]/g, '\\$&'));

  // ------------------------------------------------------------------ covers
  function coverSrc(card) {
    if (!card) return '';
    if (card.localCover) { try { return new URL(card.localCover, BASE).href; } catch (_) {} }
    return card.coverUrl || '';
  }
  function img(card) {
    if (!card) return '<span class="cv noimg"></span>';
    const src = coverSrc(card);
    if (!src) return `<span class="cv noimg"><span>${esc(card.album)}</span></span>`;
    const fb = card.localCover && card.coverUrl ? ` data-fb="${esc(card.coverUrl)}"` : '';
    return `<img class="cv" src="${esc(src)}"${fb} alt="${esc((card.artist || '') + '《' + (card.album || '') + '》')}" draggable="false" decoding="async">`;
  }
  // 封套背面（他蓋著的那張；跟舞台 holdDraw 的背面同一個樣子：深色紙＋白色內圈標）
  const sleeveHTML = cls => `<span class="sleeve-bk${cls ? ' ' + cls : ''}" aria-hidden="true"><i></i></span>`;
  const title = c => c ? `${c.artist || ''}《${c.album || ''}》` : '';
  const starOf = (c, a) => (c && c[a] | 0) || 0;
  // 峰值那軸，並列 c→o→h（＝engine.topAttr；引擎沒載入時的退路）
  function topAttrOf(c) {
    const E = Eng(); if (E && typeof E.topAttr === 'function') try { return E.topAttr(c); } catch (_) {}
    let b = 'c'; for (const a of ['o', 'h']) if (starOf(c, a) > starOf(c, b)) b = a; return b;
  }
  const aceAxisOf = c => c ? (TIER_AXIS[c.tier] || topAttrOf(c)) : 'c';

  // ------------------------------------------------------------------ 字
  // 盤面上的字：content.duelText 有就用（lint 掃 content.js），沒有就用這份（同一套字，SPEC-v4 §2.2.7）
  const DT0 = {
    hintLabel: '提示', sleeve: '蓋著', rounds: '第 {n}／{max} 手', hp: '聲望', aceSlot: '王牌', aceWord: '王牌',
    he: '他・', you: '你・', slotE: '他丟的', slotP: '你丟的', lastPrefix: '上一手', pileLeft: '他還有 {n} 張',
    counter: '{a}剋{b}，命中！', countered: '{b}剋{a}，被剋了。',
    blockedYou: '{a}剋{b}，但他高你 2 星以上，剋不動。比星數，', blockedHim: '{b}剋{a}，但你高他 2 星以上，他剋不動。比星數，',
    mirror: '同樣是{a}，比星數，', tie: '一樣大，不扣。',
    hitE: '他 −{n}', hitP: '你 −{n}',
    bluff: '他唬你！『{key}』是{hint}，他出的是{e}。', honest: '『{key}』是{hint}，他照實出。',
    bluffNoKey: '他唬你！提示是{hint}，他出的是{e}。', honestNoKey: '提示是{hint}，他照實出。',
    koWin: '品味勝出', koWinSub: '你贏了【{name}】。', koLose: '聲望歸零',
    roundsOut: '六手打完，比聲望條', roundsScore: '你剩 {p}%，他剩 {e}%：{who}贏', roundsEven: '你剩 {p}%，他剩 {e}%：一樣，算你贏',
    tapOn: '點一下繼續',
    lpAria: '上一手{who}丟的：{t}，點一下看唱片資訊',
  };
  function dtOf(content) {
    const src = (content && content.duelText) || {};
    return (k, vars) => {
      let s = src[k] != null ? String(src[k]) : (DT0[k] != null ? DT0[k] : k);
      if (vars) s = s.replace(/\{(\w+)\}/g, (m, n) => (vars[n] != null ? vars[n] : ''));
      return s;
    };
  }
  const T0 = dtOf(null);
  // 提示句：view().hint.line（id）→ C.hints 那句 { id, text, key }（A1 notes 請求：字串＝C.hints[attr] 裡 id === line 那句）
  function hintOf(hints, h) {
    if (!h || !h.line) return null;
    const H = hints || (window.DipLabContent && window.DipLabContent.hints) || null;
    if (!H) return null;
    const find = arr => Array.isArray(arr) ? arr.find(x => x && (x.id === h.line)) : null;
    let x = find(H[h.attr]);
    if (!x) for (const a of ATTRS) { x = find(H[a]); if (x) break; }
    return x || null;
  }
  // 一手的結果字（SPEC-v4 §2.5.1）。c＝clash 事件（或 view().last）；hints＝C.hints。
  //   l1＝唬人時 bluff；否則規則句（counter｜countered｜blockedYou｜blockedHim｜mirror）；王牌沒有「不會被剋」（FIXLIST 2）：被 ≤5 星剋＝剋不動（gap）
  //   l2＝hitE｜hitP｜tie；l3＝照實時 honest（關鍵字那句）；唬人且剋不動時放規則句（句尾「，」改「。」）；其他空
  //   D 的三個例句：l1＋l2 逐字＝「冷門剋經典，命中！他 −4」「冷門剋經典，但他高你 2 星以上，剋不動。比星數，你 −3」「他唬你！『紀念版』是經典，他出的是硬蕊。你 −4」
  function ruleText(c, T) {
    const ace = c.ace ? T('aceWord') : '';
    const a = ace + ZH[c.pAttr], a0 = ZH[c.pAttr], b = ZH[c.eAttr];
    if (c.blocked === 'gap') return T(c.by === 'e' ? 'blockedHim' : 'blockedYou', { a, b });
    if (c.kind === 'counter') return T('counter', { a, b });
    if (c.kind === 'countered') return T('countered', { a, b });
    return T('mirror', { a: a0, b });                                                                  // 「同樣是經典」：同色不加「王牌」
  }
  // 頂點卡試做（?apex=1）的畫面字：content.apexTrial.ui（e2e 直接呼叫 _fmt.clashText 時沒給 U → 讀頁面上的 DipLabContent）
  const apexUIOf = () => { const Cn = (typeof window !== 'undefined' && window.DipLabContent) || null; return (Cn && Cn.apexTrial && Cn.apexTrial.ui) || {}; };
  const fillU = (t, o) => String(t || '').replace(/\{(\w+)\}/g, (m, k) => (o && o[k] != null ? o[k] : m));
  function clashText(c, T, hints, U) {
    T = T || T0;
    const rule = ruleText(c, T);
    const apx = !!c && 'apex' in c;                    // 頂點卡試做的對決（clash 事件才有 apex 鍵；旗標關時沒有 → 下面三種情形都不會發生，一字不改）
    if (apx && !U) U = apexUIOf();
    let l1 = rule, l2, l3 = '', cls = 'z';
    const tE = c.toE | 0, tP = c.toP | 0;
    if (tE > 0 && tP > 0) {                            // 同一手兩邊都扣（彈回：被剋的一半彈回去扣他）：兩個數字都寫，顏色看誰扣得多
      l2 = fillU((U && U.hitBoth) || '你 −{p}，他 −{e}', { p: tP, e: tE }); cls = tP > tE ? 'r' : tE > tP ? 'g' : 'z';
    }
    else if (tE > 0) { l2 = T('hitE', { n: c.toE }); cls = 'g'; }
    else if (tP > 0) { l2 = T('hitP', { n: c.toP }); cls = 'r'; }
    else if (apx && c.kind === 'mirrorLose') l2 = (U && U.loseFree) || '你輸了，但不扣。';   // 比星輸了、王牌免扣（不是「一樣大」）
    else l2 = T('tie');
    const h = c.hint && ATTRS.includes(c.hint.attr) ? c.hint : null;
    if (h) {
      const x = hintOf(hints, h), key = x && x.key ? x.key : null, hz = ZH[h.attr], e = ZH[c.eAttr];
      if (c.bluff) {
        l1 = key ? T('bluff', { key, hint: hz, e }) : T('bluffNoKey', { hint: hz, e });
        if (c.blocked) l3 = rule.replace(/[，,]\s*$/, '。');
      } else l3 = key ? T('honest', { key, hint: hz }) : T('honestNoKey', { hint: hz });
    }
    const notes = (c.notes || []).map(n => (typeof n === 'string' ? n : n && n.text) || '').filter(Boolean);
    if (apx && c.eAce && U && U.eAceNote) notes.push(U.eAceNote);   // 旗標下你的王牌不比星，他帶的照舊 7 星：丟出來那手寫明（審查 11-16）
    return { l1, l2, l3, cls, rule, notes, bluff: !!c.bluff };
  }

  // ------------------------------------------------------------------ module state
  let CUR = null;
  const LISTEN = {};
  function emit(evt, ...a) { const set = LISTEN[evt]; if (set) [...set].forEach(cb => { try { cb(...a); } catch (e) { console.error(e); } }); }
  function on(evt, cb) { (LISTEN[evt] = LISTEN[evt] || new Set()).add(cb); return () => { if (LISTEN[evt]) LISTEN[evt].delete(cb); }; }
  function mount(panel, opts) { unmount(); CUR = createDuel(panel, opts || {}); return CUR.api; }
  function unmount() { if (CUR) { const c = CUR; CUR = null; try { c.destroy(); } catch (e) { console.error(e); } } }

  // ================================================================== instance
  function createDuel(panel, opts) {
    const E = Eng();
    if (!E) throw new Error('DipLabDuel: DipLabEngine not loaded');
    const duel = opts.duel, content = opts.content || window.DipLabContent || {}, run = opts.run || null;
    const hooks = opts.hooks || {};
    const tut = hooks.tut || null;
    const eid = duel && duel.e ? duel.e.id : null;
    const enemy = Object.assign({ id: eid, name: duel && duel.e && duel.e.name }, (content.enemies && content.enemies[eid]) || {});
    const lines = (content.lines && content.lines[eid]) || {};
    const hints = content.hints || null;
    const T = dtOf(content);
    const settings = () => { try { return (hooks.settings && hooks.settings()) || {}; } catch (_) { return {}; } };
    const view = () => E.view(duel);
    const S = {
      v: view(), phase: 'choose', sel: null, busy: false, destroyed: false, speed: 1,
      anims: new Set(), timers: new Set(), infoOpen: 0, held: 0, table: null, flash: null, triForce: null,
      lp: null, swallow: null, enterDone: !opts.enter, ending: false, auto: false, tagged: false, lay: null, pendTap: null, openTap: null,
      rush: false, playAt: 0, fitRaf: 0, ro: null, lastLine: {}, lastCt: null, debug: { log: [], hands: [] },
      apxOpen: false, apxAt: 0, apxEv: null,
      lpd: null, lpOn: false, lpFade: false,   // 上一手小列：放的那一手（{e,p} 快照）、有沒有長出來（第一次換手起）、揭曉中變淡
    };
    const paused = () => !!(S.infoOpen || S.held);
    // 頻率（v5 第六項第二期，主線 11-15）：提示籤前一顆小圓點＝這位客人的「常聽頻率」（C.enemies[id].tune；content.tunes 的顏色）。
    //   不洩漏他這手（不看 plan、不看他要出哪張）；只上色、不進規則。不放進 .tx（e2e 逐字比 .tx）；1 px 墨框（淺色格在白底才看得到）；
    //   不染字、不染框（頻率色跟三軸色撞）；.done 時變灰；教學裡不出（多一個沒解釋的東西）
    function tuneDot() {
      const TN = content.tunes || {}, k = enemy.tune, col = TN.colors && TN.colors[k];
      if (tut || !col) return '';
      const lab = String(TN.guestAria || '{name}').replace('{name}', (TN.names && TN.names[k]) || '');
      return `<i class="tn" data-tune="${esc(k)}" role="img" style="--tn:${esc(col)}" aria-label="${esc(lab)}" title="${esc(lab)}"></i>`;
    }
    const baseSpeed = () => FAST ? 4 : (settings().fastAnim ? 2 : 1);
    S.speed = baseSpeed();
    const rm = () => { const f = Fx(); try { return f && f.reducedMotion ? f.reducedMotion() : rmq(); } catch (_) { return rmq(); } };
    const log = s => { S.debug.log.push(s); if (S.debug.log.length > 400) S.debug.log.shift(); };

    // ---------------- timing (speed- and pause-aware) ----------------
    function wait(ms) {
      return new Promise(res => {
        if (S.destroyed) return res();
        let left = ms, last = performance.now(), h;
        const tick = () => {
          S.timers.delete(h);
          if (S.destroyed) return res();
          const now = performance.now();
          if (!paused()) left -= (now - last) * S.speed;
          last = now;
          if (left <= 0) res(); else { h = setTimeout(tick, 16); S.timers.add(h); }
        };
        h = setTimeout(tick, Math.min(16, ms)); S.timers.add(h);
      });
    }
    function later(fn, ms) { const h = setTimeout(() => { S.timers.delete(h); if (!S.destroyed) fn(); }, ms); S.timers.add(h); return h; }
    function A(el, kf, o) {
      if (!el || !el.animate) return null;
      let a; try { a = el.animate(kf, o); } catch (_) { return null; }
      try { a.playbackRate = S.speed; if (paused()) a.pause(); } catch (_) {}
      S.anims.add(a);
      const done = () => S.anims.delete(a); a.finished.then(done, done);
      return a;
    }
    function setSpeed(s) {
      S.speed = s;
      S.anims.forEach(a => { try { a.playbackRate = s; } catch (_) {} });
      const f = Fx(); if (f && f.setSpeed) try { f.setSpeed(s); } catch (_) {}
      if (hasStage('speed')) stg('speed', s);
    }
    const pauseAnims = () => S.anims.forEach(a => { try { a.pause(); } catch (_) {} });
    // 結果框的進場動畫（showCallout）在 hold 時直接跳到終點：不然教學在浮框剛出現時 hold，浮框會停在 scale .3／透明（notes-B2 請求）
    const finishCallIn = () => S.anims.forEach(a => { try { const ef = a.effect; if (ef && ef.target === els.call && a.playState !== 'finished') { const kf = ef.getKeyframes(); if (kf.length && +kf[kf.length - 1].opacity === 1) a.finish(); } } catch (_) {} });
    const resumeAnims = () => S.anims.forEach(a => { try { if (a.playState === 'paused') a.play(); } catch (_) {} });
    // 外殼開 ⏸／登場卡、教學要停在浮框上時 hold(true)，收掉 hold(false)（計數，可巢狀）：結算停在原地、盤面不收點擊
    function hold(onOff) {
      const was = S.held;
      S.held = Math.max(0, S.held + (onOff ? 1 : -1));
      if (S.held && !was) { finishCallIn(); pauseAnims(); if (S.lp) { clearTimeout(S.lp.h); S.lp = null; } root.classList.add('held'); if (hasStage('pause')) stg('pause', true); }
      else if (!S.held && was) { root.classList.remove('held'); if (!paused()) resumeAnims(); if (hasStage('pause')) stg('pause', false); }
      return S.held;
    }

    // ---------------- stage（常駐 DipLabStage；duel.js 只呼叫 API） ----------------
    function stg(m, ...a) { const s = hooks.stage; if (!s || typeof s[m] !== 'function') return null; try { return s[m](...a); } catch (e) { console.error(e); return null; } }
    const hasStage = m => !!(hooks.stage && typeof hooks.stage[m] === 'function');
    // 他說話時先收起他頭上的名牌（矮螢幕的橫條鏡頭裡泡泡會被壓到名牌上），說完再掛回去；keepOff＝說完也不掛（打完那一句）
    function say(id, text, ms, keepOff) {
      if (!text) return;
      // 泡泡照字數給時間（真實時間：舞台會再除以動畫速度，這裡先乘回去）
      ms = Math.max(ms || 1500, readMs(text)) * baseSpeed();
      const tagOff = id === 'f' && S.tagged;
      if (tagOff) stg('untag', 'f');
      stg('say', id, text, { ms, lift: 7 });
      if (tagOff && !keepOff) later(() => { if (S.tagged) stg('tag', 'f', enemy.name || '他', 'e', 'L'); }, ms + 80);
    }
    function pickLine(keys) {
      for (const key of keys) {
        let arr = lines[key]; if (arr == null) continue;
        if (!Array.isArray(arr)) arr = [arr];
        if (!arr.length) continue;
        let i = Math.floor(Math.random() * arr.length);
        if (arr.length > 1 && i === S.lastLine[key]) i = (i + 1) % arr.length;
        S.lastLine[key] = i;
        return arr[i];
      }
      return null;
    }
    function tags(onOff) {
      if (onOff && !S.tagged) { stg('tag', 'f', enemy.name || '他', 'e', 'L'); stg('tag', 'p', '你', 'p', 'R'); S.tagged = true; }
      else if (!onOff && S.tagged) { stg('untag', 'f'); stg('untag', 'p'); S.tagged = false; }
    }
    // 舞台上手裡拿的：你＝選了哪張就拿哪張（王牌＝'ace'）；他＝選牌階段一直拿著背面朝外的封套（§2.3.3）
    function holdSleeve(side, card, ace) {
      if (!hasStage('hold')) return;
      stg('hold', side, card ? (ace ? 'ace' : { sleeve: card.id }) : null);
    }
    function holdBack() { if (hasStage('hold')) stg('hold', 'e', { back: true }); }

    // ---------------- hooks: tutorial / hints / info ----------------
    function gate(action) {
      if (!tut || typeof tut.gate !== 'function') return true;
      try { return tut.gate(action) !== false; } catch (e) { console.error(e); return true; }
    }
    const hinted = new Set();
    function hint(id, targets) {
      if (!hooks.hint || hinted.has(id)) return;        // 一場只送一次；一輩子只出一次由外殼／教學記
      hinted.add(id);
      try { hooks.hint(id, targets || []); } catch (e) { console.error(e); }
      log('hint:' + id);
    }
    function onEvent(ev) { if (hooks.onEvent) try { hooks.onEvent(ev, duel); } catch (e) { console.error(e); } }
    function setPhase(p) {
      S.phase = p;
      if (root) root.dataset.phase = p;
      if (tut && typeof tut.onPhase === 'function') try { tut.onPhase(p); } catch (e) { console.error(e); }
      emit('phase', p);
    }
    async function openInfo(card, where, attr) {
      if (!card || S.destroyed || S.held) return;
      if (!gate({ kind: 'info', where })) return;
      emit('info', where);
      const fn = typeof hooks.cardInfo === 'function' ? hooks.cardInfo
        : (window.DipLabCardInfo && typeof window.DipLabCardInfo.open === 'function' ? (c, o) => window.DipLabCardInfo.open(c, o) : null);
      log('info:' + where + ':' + card.id);
      if (!fn) return;
      S.infoOpen++; pauseAnims();
      try { await Promise.resolve(fn(card, { attr: attr || null, from: 'duel:' + where })); } catch (e) { console.error(e); }
      S.infoOpen = Math.max(0, S.infoOpen - 1);
      if (!paused()) resumeAnims();
      if (S.destroyed) return;
      if (tut && typeof tut.gate === 'function') try { tut.gate({ kind: 'close' }); } catch (_) {}
      emit('infoClosed', where);
    }

    // ---------------- DOM skeleton（§2.5.1 的樹） ----------------
    const root = document.createElement('div');
    root.className = 'dl';
    root.dataset.phase = 'choose';
    root.setAttribute('role', 'application');
    root.setAttribute('aria-label', '品味對決');
    root.innerHTML = `
      <section class="dl-e" data-tut="e-hud">
        <div class="nmrow"><b class="nm" data-tut="e-name"></b>
          <div class="rec" data-tut="e-rec"><div class="pile" data-tut="e-pile"><span class="bars"></span><small></small></div></div><span class="st" data-tut="e-stats"></span><span class="sp"></span>
          <span class="hpn" data-tut="e-hp"><span>${esc(T('hp'))}</span><b class="num key"></b></span></div>
        <div class="hp"><i class="lost"></i><i class="fill"></i></div>
      </section>
      <section class="dl-t" data-tut="table">
        <div class="lastplay" data-tut="lastplay" hidden></div>
        <div class="slot e" data-tut="slot-e"></div>
        <div class="slot p" data-tut="slot-p"></div>
        <div class="tcol"><div class="rounds num" data-tut="rounds"></div><div class="tri" data-tut="tri" role="button" aria-expanded="false"></div></div>
        <div class="trileg" data-tut="trileg" hidden></div>
        <div class="hint" data-tut="e-hint">${tuneDot()}<span class="lb">${esc(T('hintLabel'))}</span><span class="tx"></span></div>
        <div class="callout" data-tut="result" aria-live="polite"><div class="l1"></div><div class="l2"></div><div class="l3"></div><div class="l4" aria-hidden="true"></div></div>
        <div class="lastline" data-tut="lastline"></div>
        <div class="cheat" data-tut="cheat" hidden></div>
      </section>
      <section class="dl-p" data-tut="p-hud">
        <div class="nmrow"><b>你</b><span class="relics" data-tut="relics"></span><span class="st" data-tut="p-stats"></span><span class="sp"></span>
          <span class="hpn" data-tut="p-hp"><span>${esc(T('hp'))}</span><b class="num key"></b></span></div>
        <div class="hp"><i class="lost"></i><i class="fill"></i></div>
        <div class="hand" data-tut="hand" role="group" aria-label="手牌（點一張專輯）"><div class="tiles"></div><div class="pop" data-tut="pop" role="group" aria-label="選屬性出牌" hidden></div></div>
      </section>
      <div class="dl-pop" role="status" hidden></div>
      <div class="kost" aria-hidden="true"></div>
      <div class="dl-fx" aria-hidden="true"></div>`;
    panel.innerHTML = '';
    panel.appendChild(root);
    const $ = s => root.querySelector(s);
    const els = {
      e: $('.dl-e'), enm: $('.dl-e .nm'), ehpn: $('.dl-e .hpn .num'), ehp: $('.dl-e .hp'), est: $('.dl-e .st'), pst: $('.dl-p .st'),
      hint: $('.hint'), htx: $('.hint .tx'), rec: $('.rec'), bars: $('.pile .bars'), pileTx: $('.pile small'),
      table: $('.dl-t'), se: $('.slot.e'), sp: $('.slot.p'), tri: $('.tri'), rounds: $('.rounds'), call: $('.callout'), last: $('.lastline'), lp: $('.lastplay'), cheat: $('.cheat'), leg: $('.trileg'),
      p: $('.dl-p'), relics: $('.relics'), phpn: $('.dl-p .hpn .num'), php: $('.dl-p .hp'),
      hand: $('.hand'), tiles: $('.hand .tiles'), abpop: $('.hand .pop'), tcol: $('.tcol'),
      pop: $('.dl-pop'), kost: $('.kost'), fx: $('.dl-fx'),
    };
    // 封面載入失敗：本機 → 遠端 → 文字
    root.addEventListener('error', ev => {
      const t = ev.target; if (!t || t.tagName !== 'IMG') return;
      if (t.dataset.fb && t.src !== t.dataset.fb) { const fb = t.dataset.fb; t.removeAttribute('data-fb'); t.src = fb; return; }
      const d = document.createElement('span'); d.className = 'cv noimg'; const s = document.createElement('span'); s.textContent = (t.alt || '').replace(/^.*《|》$/g, ''); d.appendChild(s);
      t.replaceWith(d);
    }, true);

    // ---------------- helpers ----------------
    const pct = (x, m) => Math.max(0, Math.min(100, (x / (m || 1)) * 100));
    function setHp(bar, numEl, hp, max, animate) {
      const fill = bar.querySelector('.fill'), lost = bar.querySelector('.lost');
      const w = pct(Math.max(0, hp), max);
      numEl.textContent = `${Math.max(0, hp)}/${max}`;
      if (!animate) { fill.style.transition = 'none'; lost.style.transition = 'none'; fill.style.width = w + '%'; lost.style.width = w + '%'; void fill.offsetWidth; fill.style.transition = ''; lost.style.transition = ''; return; }
      const dur = Math.round(500 / S.speed);
      fill.style.transitionDuration = dur + 'ms';
      const old = parseFloat(fill.style.width) || 0;
      if (w < old) { lost.style.transition = 'none'; lost.style.width = old + '%'; void lost.offsetWidth; lost.style.transition = ''; fill.style.width = w + '%'; later(() => { lost.style.transitionDuration = dur + 'ms'; lost.style.width = w + '%'; }, dur + 250); }
      else { fill.style.width = w + '%'; lost.style.width = w + '%'; }
    }
    // 數字旁的小飄字（不吃點擊）：聲望數字正下方（蓋在聲望條上、右緣對齊數字）往下飄——不再放在數字左邊，那裡是品／底小籤（審查 #17）
    function floatAt(el, text, cls) {
      if (!el || !text || S.destroyed) return;
      const a0 = (el.closest && el.closest('.hpn')) || el, r = a0.getBoundingClientRect(), rr = root.getBoundingClientRect();
      if (!r.width) return;
      const d = document.createElement('span'); d.className = 'fl ' + (cls || ''); d.textContent = text;
      els.fx.appendChild(d);
      d.style.left = Math.round(r.right - rr.left) + 'px'; d.style.top = Math.round(r.bottom - rr.top - 2) + 'px';
      const kf = rm() ? [{ opacity: 0, transform: 'translate(-100%,0)' }, { opacity: 1, transform: 'translate(-100%,0)', offset: .2 }, { opacity: 1, transform: 'translate(-100%,0)', offset: .8 }, { opacity: 0, transform: 'translate(-100%,0)' }]
        : [{ transform: 'translate(-100%,-4px)', opacity: 0 }, { transform: 'translate(-100%,2px)', opacity: 1, offset: .2 }, { transform: 'translate(-100%,5px)', opacity: 1, offset: .75 }, { transform: 'translate(-100%,8px)', opacity: 0 }];
      d.style.transform = 'translate(-100%,0)';
      const a = A(d, kf, { duration: 1300, easing: 'ease-out', fill: 'forwards' });
      const rmv = () => d.remove(); if (a) a.finished.then(rmv, rmv); else later(rmv, 1300);
    }
    // 手牌的一格：i＝0..2 或 'ace'。王牌用過了仍留在王牌格（變淡、寫「用過」）
    const cardOf = (v, i) => i === 'ace' ? (v.aceCard || v.ace || null) : (v.hand || [])[i] || null;
    const aceLive = v => !!(v.ace && !v.aceUsed);
    const aceAx = v => v.aceAxis || aceAxisOf(v.aceCard || v.ace);
    function actOf(sel) { return sel.i === 'ace' ? { ace: true, attr: aceAx(S.v) } : { i: sel.i, attr: sel.attr }; }
    function legal(sel) {
      if (!sel) return false;
      try { return !!E.isLegal(duel, actOf(sel)); } catch (_) { return false; }
    }
    function idxOfCard(v, id) {
      const k = (v.hand || []).findIndex(c => c && c.id === id);
      if (k >= 0) return k;
      const ac = v.aceCard || v.ace;
      return ac && ac.id === id ? 'ace' : null;
    }

    // ---------------- render: 他的一塊 ----------------
    function hintText(v) { const x = hintOf(hints, v.hint); return x ? x.text : ''; }
    // 品味／底氣小籤（無限試煉；大於 0 才有）：「品 2」「底 1」
    const TU = (content.trial && content.trial.ui) || {};
    //   讀屏念全名（品味 2／底氣 1；審查 #11）
    function statsHTML(a, d) {
      const tag = (k, n, t, full) => n > 0 ? `<span class="s${k}" data-st="${k}" role="img" aria-label="${esc(String(full || t || '').replace('{n}', n))}">${esc(String(t || '').replace('{n}', n))}</span>` : '';
      return tag('a', a | 0, TU.atkShort, TU.atk) + tag('d', d | 0, TU.defShort, TU.def);
    }
    // 名字列放不下（360 寬、七個字的名字＋品／底兩籤；審查 #8）：先收「他還有 N 張」的字（條留著）→ 再收「聲望」兩字、名字可以省略號；聲望數字永遠在畫面裡
    function fitRow(sec) {
      const nm = sec && sec.querySelector('.nmrow'); if (!nm || !nm.clientWidth) return;
      nm.classList.remove('tight', 'tight2');
      if (nm.scrollWidth > nm.clientWidth + 1) { nm.classList.add('tight'); if (nm.scrollWidth > nm.clientWidth + 1) nm.classList.add('tight2'); }
    }
    function renderE(v, opt) {
      opt = opt || {};
      els.enm.textContent = enemy.name || v.eName || '';
      els.est.innerHTML = statsHTML(v.eAtk, v.eDef);
      if (!opt.keepHp) setHp(els.ehp, els.ehpn, v.eHp, v.eMax, false);
      renderHint(v);
      renderRec(v);
      fitRow(els.e);
    }
    // 打完了（v.over）：引擎不再給提示 → 留著最後一手那句、變淡（不留一個空框）
    function renderHint(v) {
      const tx = v.over ? '' : hintText(v);
      if (tx || !v.over) els.htx.textContent = tx;
      els.hint.classList.toggle('empty', !tx && !(v.over && els.htx.textContent));
      els.hint.classList.toggle('done', !!v.over);
      if (v.apex) renderStamp(v);
    }
    // 頂點卡試做・看穿：提示框上蓋的章（發動那手、揭曉前；view().apexReveal）
    function renderStamp(v) {
      const r = v.apexReveal && !v.over ? v.apexReveal : null, U = apxUI();
      let st = els.hint.querySelector('.apxst');
      if (!r) { if (st) st.hidden = true; return; }
      if (!st) { st = document.createElement('span'); st.className = 'apxst'; st.setAttribute('role', 'status'); els.hint.appendChild(st); }
      st.className = 'apxst ' + r; st.textContent = r === 'bluff' ? (U.revealBluff || '') : (U.revealHonest || ''); st.hidden = false;
    }
    // 他還有 N 張＝他手牌＋牌堆；丟出的那一刻（t=0）他已經把一張放上牌桌 → thrown＝1 先少一張（不等下一手的 view）
    function renderRec(v, thrown) {
      const n = Math.max(0, (v.pile | 0) + (v.eHandN | 0) - (thrown | 0)), max = Math.max(n + (thrown | 0), v.pileMax | 0);
      els.bars.innerHTML = Array.from({ length: max }, (_, k) => `<i${k < n ? '' : ' class="x"'}></i>`).join('');
      els.pileTx.textContent = T('pileLeft', { n });
    }

    // ---------------- render: 牌桌 ----------------
    // 出牌前（店主 FIXLIST 9：中間不留空帶）：他那格＝蓋著的封套＋「？」，你那格＝目前選的那張（半透明預覽＋屬性與星數），沒選才是空格。
    // 上一手的兩張不留在大格：換手時縮小、搬進牌桌最上面的上一手小列（renderStrip）；打完（over）大格照舊留著最後一手
    function preSlot(side) { return !S.busy && !(S.v && S.v.over) && (!S.table || S.table.dim); }
    function renderSlot(side) {
      const el = side === 'e' ? els.se : els.sp, Tb = S.table;
      el.removeAttribute('data-card'); el.removeAttribute('role'); el.removeAttribute('tabindex'); el.removeAttribute('aria-label');
      const who = esc(T(side === 'e' ? 'he' : 'you'));
      if (preSlot(side)) {
        if (side === 'e') {
          el.className = 'slot e pre';
          el.innerHTML = `<span class="cvw esl" data-tut="e-sleeve">${sleeveHTML('cv')}<b class="q" aria-hidden="true">?</b><span class="sl">${esc(T('sleeve'))}</span></span><div class="who">${who}<span class="z">${esc(T('sleeve'))}</span></div>`;
          return;
        }
        const v = S.v, c = S.sel && v ? cardOf(v, S.sel.i) : null;
        if (!c) { el.className = 'slot p empty'; el.innerHTML = `<span class="ph">${esc(T('slotP'))}</span>`; return; }
        const a = S.sel.attr, ace = S.sel.i === 'ace';
        el.className = 'slot p pre' + (ace ? ' ace' : '');
        el.innerHTML = `<span class="cvw">${img(c)}${ace ? `<span class="acetag">${esc(T('aceWord'))}</span>` : ''}</span><div class="who">${who}<span class="${a}">${ZH[a]} <span class="num">${starOf(c, a)}</span></span></div>`;
        return;
      }
      const d = Tb && Tb[side];
      el.className = 'slot ' + side + (Tb && Tb.dim ? ' dim' : '') + (d ? '' : ' empty') + (d && d.hidden ? ' back' : '');
      if (!d) { el.innerHTML = `<span class="ph">${esc(T(side === 'e' ? 'slotE' : 'slotP'))}</span>`; return; }
      if (d.hidden) { el.innerHTML = `<span class="cvw">${sleeveHTML('cv')}</span><div class="who">${who}<span class="z">${esc(T('sleeve'))}</span></div>`; return; }
      // 王牌：封面左上角掛「王牌」小標（跟手牌一樣），字只寫「你・經典 7」——字短才不會伸進中間的浮框
      el.innerHTML = `<span class="cvw">${img(d.card)}${d.ace ? `<span class="acetag">${esc(T('aceWord'))}</span>` : ''}</span><div class="who">${who}<span class="${d.attr}">${ZH[d.attr]} <span class="num">${d.star}</span></span></div>`;
      el.classList.toggle('ace', !!d.ace);
      if (d.card) { el.dataset.card = d.card.id; el.setAttribute('role', 'button'); el.tabIndex = 0; el.setAttribute('aria-label', (side === 'e' ? '他丟的：' : '你丟的：') + title(d.card)); }
    }
    // 相剋圖例（店主 2026-11-08：相剋圖縮小、專輯當主角）：牌桌中間一個約 64 px 的小三角，圓大一點、箭頭粗一點、不寫「剋」字（箭頭就是剋）；
    // 選了一顆星：你剋得到的那條亮綠、剋你的那條亮紅；揭曉：剋中的那條亮起
    function triSVG() {
      let ring = null;
      const tone = {};
      EDGES.forEach(([a, b]) => { tone[a + b] = 'k'; });
      if (S.triForce) { EDGES.forEach(([a, b]) => { tone[a + b] = S.triForce.includes(a + b) ? 'g' : 'f'; }); }
      else if (S.flash) {
        const f = S.flash;
        EDGES.forEach(([a, b]) => { tone[a + b] = 'f'; });
        if (f.edge) tone[f.edge] = f.tone; else ring = f.ring;
      } else if (S.sel && !S.busy) {
        const x = S.sel.attr; ring = x;
        EDGES.forEach(([a, b]) => { tone[a + b] = a === x ? 'g' : b === x ? 'r' : 'f'; });
      }
      return triMarkup(tone, ring, 'dlm');
    }
    function renderTri() { els.tri.innerHTML = triSVG(); renderLeg(); }
    // 選屬性時相剋圖旁那一行（v5 第二項小尾巴）：「冷門：剋經典｜怕硬蕊」。跟相剋圖的綠／紅同一個條件（選了一顆、還沒丟、不在揭曉閃那一下）；
    //   字放在提示框下面、貼著中間字帶下緣（相剋圖右下）；提示框會先往上讓出這一行（placeLeg），所以打開手牌時版面不跳
    function legHTML(x) {
      const b = (EDGES.find(e => e[0] === x) || [])[1], c = (EDGES.find(e => e[1] === x) || [])[0];
      const tpl = content.triLegend;
      if (!tpl || !b || !c) return '';
      const nm = a => `<span class="an"><span class="${a}">${ZH[a][0]}</span>${ZH[a][1]}</span>`;
      return esc(tpl).replace(/\{([abc])\}|剋|怕|｜/g, (m, k) => k ? nm(({ a: x, b, c })[k]) : m === '剋' ? '<span class="g">剋</span>' : m === '怕' ? '<span class="r">怕</span>' : '<span class="sep">｜</span>');
    }
    function renderLeg() {
      // 教學裡不出（審查 11-15：教學強制亮邊時圖上沒有紅箭頭、「怕」對不上；教學遮罩的洞邊會從這行字中間切過去）
      const x = !tut && !S.triForce && S.sel && !S.busy && !S.flash && S.v && !S.v.over ? S.sel.attr : null;
      const key = x || '';
      if (els.leg.dataset.a === key) return;
      els.leg.dataset.a = key;
      els.leg.innerHTML = x ? legHTML(x) : '';
      els.leg.hidden = !x || !els.leg.innerHTML;
      if (!els.leg.hidden && els.apxf) hideApxf();   // 頂點卡試做：「王牌《…》：…」那行跟相剋圖那行同一個位置——選了唱片就讓給相剋圖那行
    }
    // 提示框（中間字帶垂直置中）兩行時會蓋到最下面那一行字：先往上讓（只看提示框自己的高，不看有沒有選牌 → 打開手牌時不跳）
    function placeLeg() {
      const band = parseFloat(root.style.getPropertyValue('--band-h')) || els.tcol.offsetHeight || 0;
      const cs = getComputedStyle(els.leg), h = els.hint.offsetHeight, lh = parseFloat(cs.lineHeight) || 14, off = parseFloat(cs.getPropertyValue('--leg-off')) || 0;
      if (!band || !h) return;
      const shift = Math.max(0, Math.ceil(h / 2 + 4 + lh + off - band / 2));   // 4＝提示框陰影 3 px＋1 px 縫；off＝這行字離字帶下緣（讓屬性鈕的黑框與陰影）
      els.hint.style.setProperty('--hs', shift + 'px');
    }
    function renderRounds(v) { els.rounds.textContent = T('rounds', { n: Math.max(1, v.n | 0), max: v.maxRounds || (E.CFG && E.CFG.maxRounds) || 6 }); }
    function lastLineHTML(ct) {
      return `<span class="lb">${esc(T('lastPrefix'))}</span><b>${esc(ct.l1)}<span class="${ct.cls}">${esc(ct.l2)}</span></b>`
        + (ct.notes.length ? `<span class="nt">${esc(ct.notes.join('・'))}</span>` : '');
    }
    function renderLast() { els.last.innerHTML = S.lastCt ? lastLineHTML(S.lastCt) : ''; }
    // ---- 上一手小列（店主 11-16「打完要把上一手的專輯留在檯面上，不然玩家無法看清楚對方打的專輯，就無法認識新專輯」）----
    //   牌桌最上面一列：左＝他上一手（小封面＋「他・冷門 4」＋專輯名一行），中間灰籤「上一手」，右＝你上一手（鏡像）。點一下＝唱片資訊（where＝last-e／last-p）。
    //   第一手沒有上一手：不佔位置（照現行）。換手（t=2060）時牌桌兩張大封面縮小、搬進小列——第一次是長出來，之後是換掉；換掉的那一刻只有這一個。
    //   你丟出去（t=0）到換手前：小列淡到 40%、「上一手」籤藏起（這時中間那行「上一手 …」指的是這一手；畫面上的「上一手」永遠只指一手）。
    //   打完（over）：收起（visibility，高度不變、版面不跳）。他這手的大格照樣整格蓋著，不洩漏。
    const lpSnap = d => d && d.card ? { card: d.card, attr: d.attr, star: d.star, ace: !!d.ace } : null;
    const lpHas = () => !!(S.lpOn && S.lpd && S.lpd.e && S.lpd.p);
    function lpItem(side, d) {
      const c = d.card, lab = T('lpAria', { who: side === 'e' ? '他' : '你', t: title(c) });
      return `<button type="button" class="lp ${side}${d.ace ? ' ace' : ''}" data-side="${side}" data-card="${esc(c.id)}" data-tut="lp-${side}" aria-label="${esc(lab)}">`
        + `<span class="lpc">${img(c)}</span><span class="lpt"><span class="lpw">${esc(T(side === 'e' ? 'he' : 'you'))}<span class="${d.attr}">${ZH[d.attr]} <span class="num">${d.star}</span></span></span>`
        + `<span class="lpn">${esc(c.album || '')}</span></span></button>`;
    }
    function renderStrip() {
      const on = lpHas(), d = S.lpd;
      const key = on ? [d.e.card.id, d.e.attr, d.e.star, d.p.card.id, d.p.attr, d.p.star].join('|') : '';
      if (els.lp.dataset.k !== key) {
        els.lp.dataset.k = key;
        els.lp.innerHTML = on ? lpItem('e', d.e) + `<span class="lpl" aria-hidden="true">${esc(T('lastPrefix'))}</span>` + lpItem('p', d.p) : '';
      }
      els.lp.hidden = !on;
      els.lp.classList.toggle('fade', on && S.lpFade);
    }
    // 換手時：牌桌兩張大封面（換手前量的 rect）縮小、飛進小列；字與籤淡入。減少動態＝直接換
    function lpFly(bigE, bigP) {
      if (els.lp.hidden || rm()) return;
      fly(els.lp.querySelector('.lp.e .cv'), bigE, 300); fly(els.lp.querySelector('.lp.p .cv'), bigP, 300);
      fadeIn(els.lp.querySelector('.lpl'), 300); els.lp.querySelectorAll('.lpt').forEach(x => fadeIn(x, 300));
    }
    function renderTable(v) { renderSlot('e'); renderSlot('p'); renderStrip(); renderTri(); renderRounds(v); renderLast(); }

    // ---------------- render: 你的一塊、手牌、星鈕 ----------------
    function relicIconHTML(r) {
      const sz = 16;
      try { if (typeof hooks.relicIcon === 'function') { const h = hooks.relicIcon(r.id, sz); if (h) return h; } } catch (_) {}
      try { const U = window.DipLabUI; if (U && typeof U.relicIcon === 'function') { const h = U.relicIcon(r.id, sz); if (h && !/lb-ri/.test(h)) return h; } } catch (_) {}
      return `<span class="rl-t">${esc(String(r.name || '?').slice(0, 1))}</span>`;
    }
    function renderP(v, opt) {
      opt = opt || {};
      if (!opt.keepHp) setHp(els.php, els.phpn, v.pHp, v.pMax, false);
      els.pst.innerHTML = statsHTML(v.pAtk, v.pDef);
      els.relics.innerHTML = (v.relics || []).slice(0, 3).map(r => `<button type="button" class="rl" data-tut="relic-${esc(r.id)}" data-relic="${esc(r.id)}" aria-label="發燒配件：${esc(r.name || '')}">${relicIconHTML(r)}</button>`).join('');
      fitRow(els.p);
    }
    // ---------------- render: 手牌（v5 手風琴：疊成水平一排（錯開）；點一張＝在那張打開（右邊的往右滑開、它整張露出來並浮起），正上方跳屬性鈕） ----------------
    // 順序：手牌 0..n−1，王牌（還沒用）放最右＝疊著時最上面那張（金框）；用過的王牌不在手牌裡
    function handIds(v) {
      const ids = [];
      (v.hand || []).forEach((c, i) => { if (c) ids.push(i); });
      if (v.apex ? !!v.aceCard : aceLive(v)) ids.push('ace');   // 頂點卡試做：輔助卡格一直在（用過變淡），不是可以丟的唱片
      return ids;
    }
    // ---------------- 頂點卡試做（view().apex；旗標關時不走） ----------------
    const apxUI = () => (content.apexTrial && content.apexTrial.ui) || {};
    const apexMode = () => !!(S.v && S.v.apex);
    const fillT = (t, o) => String(t || '').replace(/\{(\w+)\}/g, (m, k) => (o && o[k] != null ? o[k] : m));
    function apexState(X) { return X.live === 'on' ? 'live' : X.used ? 'used' : X.can ? 'can' : 'idle'; }
    function apexTileHTML(v, c) {
      const X = v.apex, U = apxUI(), st = apexState(X), tm = (U.timing || {})[X.timing] || '';
      const lab = st === 'live' ? `<span class="apxs on">${esc(tm)}</span>` : st === 'used' ? `<span class="apxs">${esc(U.used || '')}</span>` : '';
      return `<div class="tile ace apx ${st}${X.live === 'hold' ? ' hold' : ''}${S.apxOpen ? ' apxon' : ''}" data-tut="hand-ace" data-card="${esc(c.id)}" data-i="ace" data-apex="${st}">`
        + `<button type="button" class="cvw" data-tut="card-ace" data-act="pick" aria-label="${esc(T('aceSlot') + '：' + title(c) + '・' + X.name + '（' + tm + '）')}">${img(c)}<span class="acetag">${esc(U.slot || T('aceSlot'))}</span>${lab}${X.live === 'hold' ? '<i class="apxdot" aria-hidden="true"></i>' : ''}</button></div>`;
    }
    function apexTileEl() { return els.tiles.querySelector('.tile[data-i="ace"]'); }
    function ensureApexEls() {
      if (els.apx) return;
      els.apx = document.createElement('div'); els.apx.className = 'apx-box'; els.apx.dataset.tut = 'apex-box'; els.apx.setAttribute('role', 'dialog'); els.apx.hidden = true;
      root.appendChild(els.apx);
      els.apxf = document.createElement('div'); els.apxf.className = 'apxf'; els.apxf.setAttribute('aria-live', 'polite'); els.apxf.hidden = true;
      els.table.appendChild(els.apxf);
    }
    function apexBoxHTML(X) {
      const U = apxUI(), tm = (U.timing || {})[X.timing] || '';
      return `<div class="hd"><b>${esc(X.name)}</b><span class="tm">${esc(tm)}</span></div>`
        + (X.used ? `<p class="tx used">${esc(U.usedNote || '')}</p>`
          : `<p class="tx">${esc(X.text)}</p><div class="ft">${X.full ? `<small class="full">${esc(U.full || '')}</small>` : `<small>${esc(U.noStar || '')}</small>`}<button type="button" class="go key" data-tut="apex-go"${X.can ? '' : ' disabled'}>${esc(U.use || '')}</button></div>`);   // 只會回聲望的王牌、聲望滿＝不能發動，寫原因
    }
    // 能力框：右緣對齊王牌格（夾在左右 16 px 裡）；放在提示框上面（蓋牌桌那兩格：出牌前只有蓋著的封套與空格）——要發動之前還看得到提示那句。
    //   提示框上面放不下（很矮的盤面）才放王牌格正上方
    function placeApex() {
      if (!els.apx || els.apx.hidden) return;
      const tl = apexTileEl(); if (!tl) return;
      const tr = tl.getBoundingClientRect(), rr = root.getBoundingClientRect(), bw = els.apx.offsetWidth, bh = els.apx.offsetHeight;
      const hr = els.hint.getBoundingClientRect(), tb = els.table.getBoundingClientRect();
      const left = Math.max(16, Math.min(rr.width - 16 - bw, tr.right - rr.left - bw));
      const overHint = hr.height ? hr.top - rr.top - bh - 8 : -1, floor = tb.top - rr.top + 2;
      els.apx.style.left = Math.round(left) + 'px';
      els.apx.style.top = Math.round(overHint >= floor ? overHint : Math.max(4, tr.top - rr.top - bh - 6)) + 'px';
    }
    function openApex() {
      const v = S.v, X = v && v.apex; if (!X || !canAct()) return false;
      ensureApexEls();
      if (S.sel) clearSel();
      els.apx.innerHTML = apexBoxHTML(X); els.apx.setAttribute('aria-label', X.name || '');
      els.apx.hidden = false; S.apxOpen = true; S.apxAt = performance.now();
      const tl = apexTileEl(); if (tl) tl.classList.add('apxon');
      placeApex();
      if (!rm()) A(els.apx, [{ opacity: 0, transform: 'translateY(6px) scale(.96)' }, { opacity: 1, transform: 'none' }], { duration: 140, easing: 'ease-out' });
      sfx('select');
      if (!X.used) hint('tip_apex', ['hand-ace']);
      log('apex:open');
      emit('apex', { open: true });
      return true;
    }
    function hideApxf() { if (els.apxf && !els.apxf.hidden) { els.apxf.hidden = true; clearTimeout(S.apxfT); } }
    function closeApex() {
      if (!S.apxOpen) return true;
      S.apxOpen = false;
      if (els.apx) els.apx.hidden = true;
      const tl = apexTileEl(); if (tl) tl.classList.remove('apxon');
      emit('apex', { open: false });
      return true;
    }
    function apexTap() {
      if (!canAct()) return false;
      return S.apxOpen ? closeApex() : openApex();
    }
    // 發動（＝按「發動」）：engine.activateApex（不推進手數、不取亂數）；演出 ≤400 ms＋提示框下面那行 1.2 秒
    function fireApex() {
      if (!canAct() || typeof E.canApex !== 'function' || !E.canApex(duel)) return false;
      let evs; try { evs = E.activateApex(duel) || []; } catch (e) { console.error(e); return false; }
      const ev = evs.find(e => e.t === 'apex'); if (!ev) return false;
      if (opts.onSave) try { opts.onSave(duel); } catch (e) { console.error(e); }
      closeApex();
      S.apxEv = ev;
      S.v = view();
      renderHand(S.v); renderHint(S.v); renderP(S.v, { keepHp: true });
      const U = apxUI(), tl = apexTileEl(), cv = tl && tl.querySelector('.cvw');
      if (cv && !rm()) {
        A(cv, [{ transform: 'translateY(0)' }, { transform: 'translateY(-10px)', offset: .35 }, { transform: 'translateY(0)' }], { duration: 360, easing: 'cubic-bezier(.2,.7,.3,1)' });
        const sw = document.createElement('span'); sw.className = 'apxsw'; cv.appendChild(sw);
        const a = A(sw, [{ backgroundPosition: '120% 0' }, { backgroundPosition: '-20% 0' }], { duration: 400, easing: 'ease-out' });
        const rmv = () => sw.remove(); if (a) a.finished.then(rmv, rmv); else later(rmv, 400);
      }
      sfx('readHit');
      // 提示框下面那一行：「王牌《Filth》：揭穿髒招」1.2 秒；專輯名太長只截專輯名（能力名一定看得到）。點唱片（相剋圖那行出來）、出手時就收掉，不蓋那行、不蓋結果框
      ensureApexEls();
      const f = els.apxf, fp = String(U.fired || '').split('{album}'), alb = (ev.card && ev.card.album) || '';
      f.innerHTML = fp.length === 2 ? `<span class="f0">${esc(fillT(fp[0], { name: ev.name || '' }))}</span><span class="al">${esc(alb)}</span><span class="f1">${esc(fillT(fp[1], { name: ev.name || '' }))}</span>`
        : `<span class="f1">${esc(fillT(U.fired, { album: alb, name: ev.name || '' }))}</span>`;
      f.hidden = false; clearTimeout(S.apxfT);
      if (!rm()) A(f, [{ opacity: 0, transform: 'translateY(3px)' }, { opacity: 1, transform: 'none' }], { duration: 160, easing: 'ease-out' });
      S.apxfT = later(() => { f.hidden = true; }, 1200);
      if ((ev.heal | 0) > 0) { setHp(els.php, els.phpn, S.v.pHp, S.v.pMax, true); floatAt(els.phpn, fillT(U.healToast, { n: ev.heal }), 'g'); }
      log('apex:fire:' + ev.id);
      onEvent(ev);
      emit('apex', ev);
      return true;
    }
    function tileHTML(v, i) {
      const isAce = i === 'ace', c = cardOf(v, i); if (!c) return '';
      if (isAce && v.apex) return apexTileHTML(v, c);
      return `<div class="tile${isAce ? ' ace' : ''}" data-tut="${isAce ? 'hand-ace' : 'hand-' + i}" data-card="${esc(c.id)}" data-i="${i}">`
        + `<button type="button" class="cvw" data-tut="${isAce ? 'card-ace' : 'card-' + i}" data-act="pick" aria-label="${esc((isAce ? '王牌：' : '') + title(c))}（按住看唱片資訊）">${img(c)}${isAce ? `<span class="acetag">${esc(T('aceSlot'))}</span>` : ''}</button></div>`;
    }
    function renderHand(v, opt) {
      opt = opt || {};
      // 換手時重畫：留下來的牌從原本的位置滑到新位置（FLIP，跟打開／收回同一個 180 ms 轉場），不在一格裡跳過去（RH-2）
      const prev = {};
      if (!rm()) els.tiles.querySelectorAll('.tile:not(.gone)').forEach(t => { if (t._tf && !prev[t.dataset.card]) prev[t.dataset.card] = { tf: t._tf, w: t._w }; });
      els.tiles.innerHTML = handIds(v).map(i => tileHTML(v, i)).join('');
      renderPop();
      layoutHand(false);
      const moves = [];
      els.tiles.querySelectorAll('.tile').forEach(t => {
        const p = prev[t.dataset.card];
        if (p && (p.tf !== t._tf || p.w !== t._w)) moves.push([t, p]);
      });
      if (moves.length) {
        els.hand.classList.add('noanim');
        moves.forEach(([t, p]) => { t.style.transform = p.tf; t.style.width = t.style.height = p.w + 'px'; });
        void els.hand.offsetWidth;
        els.hand.classList.remove('noanim');
        moves.forEach(([t]) => { t.style.transform = t._tf; t.style.width = t.style.height = t._w + 'px'; });
      }
      if (opt.slideNew != null) {
        const t = els.tiles.querySelector(`.tile[data-i="${opt.slideNew}"] .cvw`);
        if (t && !rm()) A(t, [{ transform: 'translateY(40px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 260, easing: 'cubic-bezier(.2,.7,.3,1)' });
      }
    }
    // 打開那張的屬性鈕：經 n／冷 n／硬 n（最高那顆大一點、黑框＝.top）；王牌只有一顆「王牌 經 7」。點了就丟
    function popHTML() {
      const v = S.v, sel = S.sel;
      if (!sel || S.busy || isOver()) return '';
      const c = cardOf(v, sel.i); if (!c) return '';
      if (sel.i === 'ace') {
        const a = aceAx(v);
        return `<button type="button" class="ab ace top ${a}" data-tut="chip-ace" data-i="ace" data-a="${a}" aria-label="${esc('王牌 ' + ZH[a] + ' ' + starOf(c, a) + ' 星：丟出')}"><span class="aw">${esc(T('aceWord'))}</span><i>${ZH1[a]}</i><b class="key">${starOf(c, a)}</b></button>`;
      }
      const top = topOf(c);
      // 鈕與鈕之間的縫（.abgap）什麼都不做：手指落在縫上被觸控校正吸到隔壁那顆時，用按下那一刻的原始座標認出來（inChipGap；RV11-2、V5 F5）
      return ATTRS.map(a => `<button type="button" class="ab ${a}${a === top ? ' top' : ''}" data-tut="chip-${sel.i}-${a}" data-i="${sel.i}" data-a="${a}" aria-label="${esc(ZH[a] + ' ' + starOf(c, a) + ' 星：丟出')}"><i>${ZH1[a]}</i><b class="key">${starOf(c, a)}</b></button>`).join('<span class="abgap" aria-hidden="true"></span>');
    }
    // 大一點、黑框的那顆（.top）：最高星那色；並列最高時給正在預覽的那色（教學指冷 4 時不讓經 4 看起來才是該按的；RH-6）
    function topOf(c) {
      const t = topAttrOf(c), a = S.sel && S.sel.attr;
      return a && ATTRS.includes(a) && starOf(c, a) === starOf(c, t) ? a : t;
    }
    function renderPop(opt) {
      const h = popHTML(), c = S.sel ? cardOf(S.v, S.sel.i) : null, key = h && c ? S.sel.i + ':' + c.id : '';
      if (els.abpop.dataset.k !== key) {          // 換了一張才重畫（滑鼠換預覽的屬性不重畫，按鈕不閃）
        els.abpop.innerHTML = h; els.abpop.dataset.k = key; els.abpop.hidden = !h;
        if (h && !rm()) A(els.abpop, [{ opacity: 0, transform: 'translateY(6px) scale(.9)' }, { opacity: 1, transform: 'none' }], { duration: 140, easing: 'ease-out' });
      } else if (h && c && S.sel.i !== 'ace' && !(opt && opt.hover)) {   // 預覽換了色（教學 preview）：並列最高時 .top 跟著換（滑鼠移過去不換：按鈕大小一變會在游標底下跳）
        const t = topOf(c);
        els.abpop.querySelectorAll('.ab').forEach(b => b.classList.toggle('top', b.dataset.a === t));
      }
      els.abpop.querySelectorAll('.ab').forEach(b => b.classList.toggle('pv', !!(S.sel && b.dataset.a === S.sel.attr)));
    }
    // 手牌一排的位置（每張絕對定位；transform＝位移，打開／換一張／收回時 CSS 轉場 180 ms；減少動態＝直接換）。
    //   每張封面一樣大（F），疊著與打開都一樣；疊著＝每張往右錯開 dx（3 成寬）。
    //   打開第 k 張（不是最右那張）：只有 k 右邊的牌整疊往右滑開，k 整張露出來（跟右邊那疊隔 OPEN_GAP）並浮起 LIFT；
    //     k 和它左邊那幾張不動（店主：「往旁邊攤開…其他維持疊著的狀態」；審查 F4）。
    //     所以疊著那排不置中：起點 x0 盡量置中，但不超過「打開倒數第二張時左邊那幾張都不用動」的位置（390／430／360 等於靠左，375 放得下就偏左一點）。
    //     右邊那疊露出來的那一條先收窄（最窄 OPEN_MIN）；還放不下（360 打開後面幾張、390／430 打開倒數第二張）才把 k 左邊那幾條收窄、k 往左挪一點（最多 22 px，360）。
    //     要改回整排置中：x0 改成 xc（那時候打開一張，k 和左邊會一起往左挪 30–50 px）。
    //   打開最右那張（王牌／最後一張）：本來就整張露出來，只浮起，其他不動。
    function handGeom(n, W, H, openIdx) {
      const L = S.lay || {};
      let F = L.F || 80;
      F = Math.min(F, Math.floor((W - 8) / (1 + STACK_DX * Math.max(0, n - 1))));
      if (n >= 2) F = Math.min(F, Math.floor((W - OPEN_GAP) / (2 + OPEN_MIN * Math.max(0, n - 2))));
      F = Math.max(30, F);
      const dx = Math.round(F * STACK_DX), wmin = Math.max(1, Math.min(dx, Math.floor(F * OPEN_MIN)));
      const y0 = Math.max(Math.min(LIFT + 3, H - F), Math.round((H - F) / 2 + 1));   // 上下置中（往下 1 px：屬性鈕離相剋圖例遠一點）；浮起那張的框不能被手牌區上緣切到
      const xc = Math.round((W - F - dx * Math.max(0, n - 1)) / 2);
      const x0 = n >= 2 ? Math.max(0, Math.min(xc, W - 2 * F - OPEN_GAP - (n - 2) * dx)) : Math.max(0, xc);
      const pos = [];
      if (openIdx == null || openIdx < 0 || openIdx >= n - 1) {
        for (let k = 0; k < n; k++) pos.push({ x: x0 + k * dx, y: y0, s: F, z: k + 1 });
        return { F, dx, w: dx, wl: dx, x0, y0, pos };
      }
      const K = openIdx, m = n - K - 2;                    // m＝k 右邊、最後一張以外的那幾條
      let xk = x0 + K * dx, wl = dx, w = dx;
      const room = W - xk - 2 * F - OPEN_GAP;              // 右邊那幾條可以用的寬
      if (m > 0) w = Math.min(dx, Math.floor(room / m));
      if (m > 0 ? w < wmin : room < 0) {                   // 右邊收到最窄還放不下：k 和左邊那幾條往左收（第 0 張盡量不動）
        w = m > 0 ? wmin : dx;
        const want = W - 2 * F - OPEN_GAP - m * (m > 0 ? wmin : 0);
        if (K > 0) { wl = Math.max(wmin, (want - x0) / K); xk = Math.round(Math.min(xk, x0 + wl * K, want)); }
        else xk = Math.min(xk, want);
      }
      const xl = K > 0 ? Math.min(x0, xk - wmin * K) : xk;   // 第 0 張（只有收到最窄還不夠時才動）
      for (let k = 0; k < n; k++) {
        const x = k < K ? Math.round(xl + (xk - xl) * k / K) : k === K ? xk : xk + F + OPEN_GAP + (k - K - 1) * w;
        pos.push({ x, y: y0, s: F, z: k + 1 });
      }
      return { F, dx, w, wl: K > 0 ? (xk - xl) / K : dx, x0, y0, pos };
    }
    // 「你」那一列裡會被屬性鈕蓋到的東西（手牌區座標）：「你」、每個發燒配件、品味／底氣小籤、聲望數字；w＝藏起來的代價（聲望數字最不想藏）
    function nameRowItems() {
      const nm = els.p.querySelector('.nmrow'); if (!nm) return [];
      const hr = els.hand.getBoundingClientRect();
      const list = [[nm.querySelector(':scope > b'), 1], ...[...els.relics.children].map(e => [e, 1]), ...[...els.pst.children].map(e => [e, 1]), [nm.querySelector('.hpn'), 3]];
      return list.filter(x => x[0]).map(([el, w]) => { const r = el.getBoundingClientRect(); return { el, w, l: r.left - hr.left, r: r.right - hr.left, t: r.top - hr.top, b: r.bottom - hr.top }; }).filter(x => x.r > x.l);
    }
    function unhideNameRow() { els.p.querySelectorAll('.nmrow .under').forEach(e => e.classList.remove('under')); }
    // 屬性鈕放哪：跟著打開那張（正上方置中，夾在手牌區裡）。往上蓋到「你」那一列時，先試讓開「你」＋發燒配件／聲望數字，
    //   但只在讓開之後整組的中心還在那張上面（離左右緣 CHIP_IN 以上）時才讓——不然屬性鈕跑到右邊那疊上面、看起來像別張的（審查 F1）。
    //   讓不開就蓋過去：被蓋到的那幾個先藏起來（.under），不露出半截、也不會點到被蓋住的配件（F2）；收回時再出來。
    const CHIP_IN = 6;
    function placeChips(p, W) {
      const pw = els.abpop.offsetWidth, ph = els.abpop.offsetHeight, top = Math.round(p.y - POP_GAP - ph);
      const clampL = l => Math.max(0, Math.min(W - pw, Math.round(l)));
      const nat = clampL(p.x + p.s / 2 - pw / 2);
      const all = nameRowItems(), items = all.filter(it => it.t < top + ph && it.b > top);   // 跟屬性鈕同一個高度的那幾個
      const hits = l => items.filter(it => it.l < l + pw + 2 && it.r > l - 2);
      let best = nat;
      if (items.length) {
        const lo = Math.max(...items.filter(it => it.w === 1).map(it => it.r + 6), 0), hpn = items.find(it => it.w > 1), hi = hpn ? hpn.l - 6 - pw : W - pw;
        const inCard = l => l + pw / 2 >= p.x + CHIP_IN && l + pw / 2 <= p.x + p.s - CHIP_IN;
        const cost = l => hits(l).reduce((s, it) => s + it.w, 0);
        const cands = [nat, Math.max(nat, lo), Math.min(nat, hi), hi >= lo ? Math.max(lo, Math.min(hi, nat)) : nat].map(clampL).filter((l, j) => j === 0 || inCard(l));
        cands.sort((a, b) => cost(a) - cost(b) || Math.abs(a - nat) - Math.abs(b - nat));
        best = cands[0];
      }
      els.abpop.style.left = best + 'px';
      els.abpop.style.top = top + 'px';
      const under = new Set(hits(best).map(it => it.el));
      all.forEach(it => it.el.classList.toggle('under', under.has(it.el)));
    }
    function layoutHand(animate) {
      const W = els.hand.clientWidth, H = els.hand.clientHeight;
      if (!W || !H) return;
      const tiles = [...els.tiles.querySelectorAll('.tile')].filter(t => !t.classList.contains('gone'));
      const n = tiles.length;
      const idOf = t => (t.dataset.i === 'ace' ? 'ace' : +t.dataset.i);
      const openIdx = S.sel ? tiles.findIndex(t => idOf(t) === S.sel.i) : -1;
      const open = openIdx >= 0;
      els.hand.classList.toggle('open', open); root.classList.toggle('hopen', open);
      const still = !animate || rm();
      const g = handGeom(n, W, H, open ? openIdx : null), pos = g.pos;
      if (open) { const p = pos[openIdx]; p.y -= LIFT; p.up = true; }   // 疊放順序照舊（右邊那疊在上面）：打開＝右邊那疊滑開把它露出來，像新接龍
      S.handGeom = { F: g.F, dx: g.dx, w: g.w, wl: g.wl, x0: g.x0, y0: g.y0, n, open: open ? openIdx : null };
      // 位置沒變的那張不碰（fit() 每次都會重排一次：不能把正在滑的那張打斷成直接跳到終點）
      //   （比的是上次寫進去的值 t._tf／t._w：style.transform 讀回來的字串瀏覽器會重排空白，不能直接比）
      const changed = tiles.some((t, k) => t._tf !== `translate(${pos[k].x}px,${pos[k].y}px)` || t._w !== pos[k].s);
      if (still && changed) els.hand.classList.add('noanim');
      tiles.forEach((t, k) => {
        const p = pos[k], tf = `translate(${p.x}px,${p.y}px)`;
        if (t._w !== p.s) { t._w = p.s; t.style.width = p.s + 'px'; t.style.height = p.s + 'px'; }
        if (t._tf !== tf) { t._tf = tf; t.style.transform = tf; }
        t.style.zIndex = String(p.z);
        t.classList.toggle('up', !!p.up);
      });
      // 屬性鈕：打開那張正上方（往上蓋到「你」那一列——.dl.hopen 讓你那一塊疊在牌桌上面；讓開或藏起那一列的東西見 placeChips）
      if (open && !els.abpop.hidden) placeChips(pos[openIdx], W);
      else unhideNameRow();
      if (S.apxOpen) placeApex();
      if (still && els.hand.classList.contains('noanim')) { void els.hand.offsetWidth; if (!rm()) els.hand.classList.remove('noanim'); }
      else if (rm()) els.hand.classList.add('noanim');
    }

    // ---------------- 尺寸：沒有捲動；依盤面可用高度換一級 ----------------
    function fit() {
      S.fitRaf = 0;
      if (S.destroyed) return;
      const H = root.clientHeight;
      root.classList.remove('roomy', 'compact', 'short', 'tighter');
      if (H > 0) {
        if (H >= 580) root.classList.add('roomy');   // 580：430×932 的橫條往上長之後盤面約 584（shops/dip.json strip.grow.panel）
        else if (H < 450) root.classList.add('short');
        else if (H < 500) root.classList.add('compact');
      }
      sizeBoard();
      if (root.scrollHeight > root.clientHeight + 1) { root.classList.add('tighter'); sizeBoard(); }
      fitRow(els.e); fitRow(els.p);
      placeLeg();
    }
    // 牌桌（兩張封面＋下面那行字＋中間字帶）與手牌區：
    //   手牌區至少 handMin（疊著那一排放得下；v4 的數字照留，牌桌的大小不變）；其餘給牌桌，兩張封面照剩下的高與寬放大（空出來的高度給牌桌）；
    //   封面到上限還有多的，給手牌區（疊著的那一排大一點、上下置中）——中間不留空帶（FIXLIST 9）。
    //   打開一張時屬性鈕在那張正上方、往上蓋到「你」那一列（不再要手牌區自己放得下屬性鈕；v5 手風琴）。
    //   兩張封面中間只留 --gap（相剋圖例與「第 n／6 手」搬到中間字帶的左邊）。
    //   [上緣 --tp, 字高 --lab, 中間字帶高, 封面最小, 封面最大, 手牌區最低]（上緣、字高跟 duel.css 的 .dl-t 一致）
    const BOARD = { short: [4, 17, 66, 84, 176, 120], compact: [6, 19, 72, 96, 176, 120], base: [6, 19, 74, 100, 176, 127], roomy: [12, 20, 80, 110, 196, 135] };
    const PAIR_GAP = 10, TX = 12;
    // 上一手小列的高（小封面＝高 − 2）與它跟兩張大封面之間的縫；小列出現時 --lp＝高＋縫（第一手 0）
    const LP_H = { short: 28, compact: 30, base: 32, roomy: 36 }, LP_GAP = 3;
    const HAND_R = 0.68, HAND_K = 1.15, HAND_PAD = 8;   // 手牌封面＝牌桌封面 × 0.68（上限）；手牌區要 F × 1.15 ＋ 8 才放得下（跟下面 F 的算法同一組數字）
    function sizeBoard() {
      const k = ['short', 'compact', 'roomy'].find(c => root.classList.contains(c)) || 'base';
      const [tp, lab, band, mn, mx, handMin] = BOARD[k];
      const total = root.clientHeight, W = root.clientWidth;
      if (!total || !W) return;
      // 你的一塊除了手牌區以外的高（上框線＋名字列＋聲望條＋留白；.dl-p 是 flex:1，不能用它自己的高去減）
      const eH = els.e.offsetHeight, pFixed = 1 + els.hand.offsetTop + (parseFloat(getComputedStyle(els.p).paddingBottom) || 0);
      const hw = els.hand.clientWidth || (W - 2 * TX), n = ((E.CFG && E.CFG.handSize) || 5) + 1;   // 一排照最多 6 張（手牌＋王牌）算，換手時不跳
      const lp = lpHas() ? LP_H[k] + LP_GAP : 0;
      root.style.setProperty('--lp', lp + 'px'); root.style.setProperty('--lp-h', LP_H[k] + 'px');
      const fixedT = tp + lp + lab + 6 + band + 6;
      const byW = Math.floor((W - 2 * TX - PAIR_GAP) / 2);
      let scv = Math.round(Math.max(mn, Math.min(mx, byW, total - eH - pFixed - handMin - fixedT - 1)));
      // 小列吃掉的高，牌桌封面跟手牌一起分攤：手牌封面被「不超過牌桌封面 7 成」卡住時，手牌區多出來的高還給牌桌封面（不然手牌上下留一大塊白）。
      //   只在小列出現時才分攤；第一手的算法跟以前一樣
      const handNeed = s2 => Math.round(s2 * HAND_R) * HAND_K + HAND_PAD;
      if (lp) { const room = total - eH - pFixed - fixedT - 1, cap = Math.min(mx, byW); for (let s2 = scv + 1; s2 <= cap && room - s2 >= handNeed(s2); s2++) scv = s2; }
      const tableH = fixedT + scv;
      const handH = Math.max(lp ? Math.min(handMin, Math.ceil(handNeed(scv))) : handMin, total - eH - pFixed - tableH - 1);
      els.table.style.height = tableH + 'px';
      els.hand.style.height = handH + 'px';
      root.style.setProperty('--scv', scv + 'px');
      root.style.setProperty('--band-h', band + 'px');
      // 手牌封面（疊著、打開都同一個大小）：手牌區放得下的最大，不超過牌桌封面的 7 成、128 px（牌桌那兩張才是主角）；
      //   直線疊法上下各留的空不能超過約 24 px（FIXLIST 9）→ 430×932 牌桌封面上限 196、手牌 128；
      //   寬：疊著一排（F＋5×3 成）放得下，而且打開一張（兩張整張＋其他四條收到最窄 22%＋縫）也放得下——寬度不夠先收窄那幾條，還不夠才整排一起縮小
      const byWStack = Math.floor((hw - 8) / (1 + STACK_DX * (n - 1))), byWOpen = Math.floor((hw - OPEN_GAP) / (2 + OPEN_MIN * (n - 2)));
      const F = Math.max(44, Math.min(Math.round(scv * HAND_R), 128, Math.floor((handH - HAND_PAD) / HAND_K), byWStack, byWOpen));
      S.lay = { F, handH, handMin, scv };
      layoutHand(false);
    }
    function scheduleFit() { if (!S.fitRaf) { fit(); S.fitRaf = requestAnimationFrame(() => { S.fitRaf = 0; fit(); }); } }
    try { S.ro = new ResizeObserver(() => scheduleFit()); S.ro.observe(root); } catch (_) {}
    try { S.roCall = new ResizeObserver(() => { if (els.call.classList.contains('on')) placeCallout(); }); S.roCall.observe(els.call); } catch (_) {}   // 字型晚到、換行變了：結果框重新擺（RH-3）
    try { S.roHint = new ResizeObserver(() => placeLeg()); S.roHint.observe(els.hint); } catch (_) {}   // 提示句換了、變兩行：提示框往上讓出相剋圖旁那一行
    try { if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => scheduleFit()); } catch (_) {}

    // ---------------- input（v5 手風琴：點一張＝在那張打開＋跳屬性鈕；點別張＝換那張打開；再點打開那張或點手牌外面＝收回；點屬性鈕＝照那個屬性丟出） ----------------
    function bumpEl(el) { if (el && !rm()) A(el, [{ transform: 'translateX(0)' }, { transform: 'translateX(-3px)' }, { transform: 'translateX(3px)' }, { transform: 'translateX(0)' }], { duration: 300 }); }
    const isOver = () => !!(S.v && S.v.over) || S.ending;
    const canAct = () => !S.busy && S.enterDone && !isOver() && !S.held;
    const idxOfTile = tl => (tl.dataset.i === 'ace' ? 'ace' : +tl.dataset.i);
    function applySel(sel, c) {
      const changedCard = !S.sel || S.sel.i !== sel.i;
      S.sel = sel;
      if (changedCard) sfx('select');
      renderPop(); layoutHand(true); renderTri(); renderSlot('p');
      if (changedCard) holdSleeve('p', c, sel.i === 'ace');
      emit('selected', { i: sel.i, attr: sel.attr });
      return true;
    }
    function clearSel() {
      if (!S.sel) return true;
      S.sel = null; S.openTap = null; renderPop(); layoutHand(true); renderTri(); renderSlot('p'); holdSleeve('p', null); emit('selected', null); return true;
    }
    // 收回疊好：user＝玩家點的（再點打開那張、點手牌外面、Esc）→ 經 gate 'collapse'（教學中一律不收；gate 不罵，但教學的遮罩蓋著時手指那兩下根本到不了這裡，是遮罩在罵）
    function closeHand(user) {
      if (!S.sel) return true;
      if (user && (!canAct() || !gate({ kind: 'collapse' }))) return false;
      return clearSel();
    }
    // 點一張封面（疊著時露出來那一條、或打開時整張）：在那張打開、浮起，預覽的屬性＝topAttr（王牌＝它那軸）；已經打開的那張不變（API select(i)）
    //   at＝真的點下去的位置（教學：點在洞裡、洞的邊緣多挖的 4 px 被算給隔壁那張時不罵；V5 F2 的同一件事）
    function liftCard(i, at) {
      if (!canAct()) return false;
      const v = S.v, c = cardOf(v, i); if (!c) return false;
      if (i === 'ace' && !aceLive(v)) return false;
      if (S.sel && S.sel.i === i) return true;
      const attr = i === 'ace' ? aceAx(v) : topAttrOf(c), sel = { i, attr };
      if (!legal(sel)) return false;
      if (!gate(at ? { kind: 'card', i, attr, id: c.id, at } : { kind: 'card', i, attr, id: c.id })) return false;
      return applySel(sel, c);
    }
    // API select(i, attr)：打開這張、預覽那個屬性（不出手；e2e／harness 用）
    function previewAttr(i, attr) {
      if (!canAct()) return false;
      if (i === null) return clearSel();
      const v = S.v, c = cardOf(v, i); if (!c) return false;
      if (i === 'ace') { if (!aceLive(v)) return false; attr = aceAx(v); }
      if (!ATTRS.includes(attr)) return false;
      if (S.sel && S.sel.i === i && S.sel.attr === attr) return true;
      const sel = { i, attr };
      if (!legal(sel)) return false;
      if (!gate({ kind: 'chip', i, attr, id: c.id })) return false;
      return applySel(sel, c);
    }
    // 點屬性鈕＝照那個屬性丟出（原版：點牌 → 選屬性＝出招；沒有「丟！」）
    function throwAttr(i, attr, btn) {
      if (!canAct()) return false;
      const v = S.v, c = cardOf(v, i); if (!c) return false;
      if (i === 'ace') attr = aceAx(v);
      const sel = { i, attr };
      if (!legal(sel)) { bumpEl(btn); return false; }
      if (!gate({ kind: 'throw', i, attr, id: c.id })) { bumpEl(btn); return false; }
      if (btn && !rm()) A(btn, [{ transform: 'scale(1)' }, { transform: 'scale(.92)' }, { transform: 'scale(1)' }], { duration: 90 });
      S.sel = sel;
      play(actOf(sel), sel);
      return true;
    }
    function abTap(btn) {
      const i = btn.dataset.i === 'ace' ? 'ace' : +btn.dataset.i;
      if (!canAct() || !S.sel || S.sel.i !== i) return;
      throwAttr(i, btn.dataset.a, btn);
    }
    function handTap(t, ev) {
      const cv = t.closest('.cvw[data-act="pick"]'), tl = cv && cv.closest('.tile');
      if (!S.enterDone && !S.busy && !S.held && !isOver()) {   // 盤面還在滑進來（約 0.6 s）就點了一張：記著，進場一完就打開那張；教學照它自己的手指走，只抖一下（V5-play-10）
        if (!tl) return;
        if (tut) bumpEl(els.tiles); else S.pendTap = { i: idxOfTile(tl), x: ev && ev.detail ? ev.clientX : null, y: ev && ev.detail ? ev.clientY : null };
        return;
      }
      if (!canAct()) return;
      if (!tl) return;            // 手牌區的空白（那一排左右、上下，打開那張旁邊的縫）：什麼都不做——收回只在再點打開那張、或點手牌外面（RV11-3）
      const i = idxOfTile(tl);
      if (i === 'ace' && apexMode()) { if (!apexTap()) bumpEl(cv); return; }   // 頂點卡試做：輔助卡格＝開／收能力框（不跳屬性鈕、不能拿來比星）
      if (S.sel && S.sel.i === i) {
        const o = S.openTap;      // 雙擊的第二下（同一點 320 ms 內）：剛打開就又收回不算（RV11-5 的同一件事）
        if (o && o.i === i && ev && ev.detail && performance.now() - o.t < DBL_MS && Math.hypot(ev.clientX - o.x, ev.clientY - o.y) < DBL_PX) return;
        closeHand(true);
        return;
      }
      const at = ev && ev.detail ? { x: ev.clientX, y: ev.clientY } : null;
      if (!liftCard(i, at)) { if (!(tut && typeof tut.quiet === 'function' && tut.quiet())) bumpEl(cv); return; }   // 教學說「當沒點到」的那一下不抖（V5 F2）
      S.openTap = at ? { i, x: at.x, y: at.y, t: performance.now() } : null;
    }
    // 屬性鈕之間的縫：觸控校正會把 click 吸到最近那顆（座標也跟著改），pointerdown 的座標是手指真正的位置。
    //   那一下按在兩顆中間的縫裡＝不做事（RV11-2）。縫本身不掛 click 監聽：掛了它就變成校正的候選，鈕的內緣 2–6 px 反而被它吸走（V5 F5）
    function inChipGap(ev) {
      const d = S.down; if (!ev.detail || !d || performance.now() - d.t > 1500) return false;
      const bs = [...els.abpop.querySelectorAll('.ab')].map(b => b.getBoundingClientRect()).sort((a, b) => a.left - b.left);
      for (let k = 0; k + 1 < bs.length; k++) {
        const a = bs[k], b = bs[k + 1];
        if (d.x > a.right && d.x < b.left && d.y > Math.min(a.top, b.top) - 16 && d.y < Math.max(a.bottom, b.bottom) + 16) return true;
      }
      return false;
    }
    // 按住屬性鈕：上面一行小字「經典 5 星」（像按住封面看唱片資訊一樣，按住不會出牌；RV11-6）
    function chipTip(btn) {
      if (!canAct() || !btn.isConnected) return false;
      const i = btn.dataset.i === 'ace' ? 'ace' : +btn.dataset.i, c = cardOf(S.v, i), a = btn.dataset.a;
      if (!c || !ATTRS.includes(a)) return false;
      els.pop.innerHTML = `<b>${esc((i === 'ace' ? T('aceWord') + ' ' : '') + ZH[a] + ' ' + starOf(c, a) + ' 星')}</b>`;
      els.pop.hidden = false;
      const br = btn.getBoundingClientRect(), rr = root.getBoundingClientRect();
      els.pop.style.left = Math.max(8, Math.min(rr.width - els.pop.offsetWidth - 8, br.left - rr.left + br.width / 2 - els.pop.offsetWidth / 2)) + 'px';
      els.pop.style.top = Math.max(4, br.top - rr.top - els.pop.offsetHeight - 6) + 'px';
      clearTimeout(S.popT); S.popT = later(() => { els.pop.hidden = true; }, 1600);
      return true;
    }
    // 牌桌小抄（店主 11-12）：點相剋圖打開、再點一下（哪裡都行）收起；別處那一下照常有作用（點手牌照樣打開那張）
    function cheatHTML() {
      const rows = (content.cheatSheet || []);
      // 店主 11-12：屬性寫全名，第一個字照屬性色、第二個字黑；「剋」灰
      const tint = s => esc(s).replace(/(經典|冷門|硬蕊)|剋/g, (m, name) => name ? `<span class="${({ 經典: 'c', 冷門: 'o', 硬蕊: 'h' })[name]}">${name[0]}</span>${name[1]}` : '<span class="kx">剋</span>');
      return rows.map(r => `<b>${tint(r[0])}</b><span>${esc(r[1])}</span>`).join('');
    }
    function setCheat(on) {
      on = !!on && !!(content.cheatSheet || []).length;
      if (on && !els.cheat.innerHTML) els.cheat.innerHTML = cheatHTML();
      els.cheat.hidden = !on;
      els.tri.setAttribute('aria-expanded', on ? 'true' : 'false');
      if (on) emit('cheat', true);
    }
    function relicTap(btn) {
      const id = btn.dataset.relic, r = (S.v.relics || []).find(x => x.id === id); if (!r) return;
      emit('relic', id);
      els.pop.innerHTML = `<b>${esc(r.name || '')}</b>${esc(r.line || r.desc || '')}`;
      els.pop.hidden = false;
      const br = btn.getBoundingClientRect(), rr = root.getBoundingClientRect();
      els.pop.style.left = Math.max(8, Math.min(rr.width - 230, br.left - rr.left - 8)) + 'px';
      els.pop.style.top = Math.max(4, br.top - rr.top - els.pop.offsetHeight - 6) + 'px';
      clearTimeout(S.popT); S.popT = later(() => { els.pop.hidden = true; }, 2600);
    }
    // 唱片資訊：手牌封面長按（疊著、打開都可以）；牌桌上兩張（揭曉後）點一下；上一手小列點一下或長按；他蓋著的封套不給看
    function infoOfLast(x) {
      const side = x.dataset.side, d = lpHas() && S.lpd[side];
      if (d && d.card) { openInfo(d.card, 'last-' + side, d.attr); return true; }
      return false;
    }
    function infoOfSlot(x) {
      const side = x.classList.contains('e') ? 'e' : 'p', d = S.table && S.table[side];
      if (d && d.card && !d.hidden) { openInfo(d.card, 'slot-' + side, d.attr); return true; }
      return false;
    }
    function infoOfTile(x) {
      const tl = x.closest('.tile'); if (!tl) return false;
      const i = tl.dataset.i === 'ace' ? 'ace' : +tl.dataset.i, c = cardOf(S.v, i);
      if (c) openInfo(c, i === 'ace' ? 'hand-ace' : 'hand');
      return !!c;
    }
    function onClick(ev) {
      const t = ev.target;
      const sw = S.swallow; S.swallow = null;
      if (sw && ev.detail && sw.el.contains(t)) { ev.preventDefault(); return; }   // 長按之後放開的那一下 click（不限時：按多久都一樣；下一次按下就作廢，V5 F6）
      if (S.held) { ev.preventDefault(); return; }
      if (S.apxOpen) {                               // 頂點卡試做：能力框開著——框裡只有「發動」有作用；框外（王牌格以外）＝收起，那一下照常（點別張＝打開那張）
        if (t.closest('.apx-box')) { const g = t.closest('.go'); if (g && !(ev.isTrusted && performance.now() - S.apxAt < 300)) fireApex(); return; }
        if (!t.closest('.tile[data-i="ace"]')) closeApex();
      }
      if (!els.pop.hidden && !t.closest('.rl')) els.pop.hidden = true;
      if (!els.cheat.hidden) { setCheat(false); if (t.closest('.cheat, .tri')) return; }
      else if (t.closest('.tri') && !S.busy) { setCheat(true); return; }
      let x;
      if ((x = t.closest('.lastplay .lp'))) { infoOfLast(x); return; }   // 上一手小列：手牌開著也不收回、結算中也不加速（跟點牌桌大格一樣）
      if ((x = t.closest('.slot[data-card]'))) { infoOfSlot(x); return; }
      if ((x = t.closest('.rl'))) { relicTap(x); return; }
      if (S.busy) {   // 結算中點畫面＝這手 4 倍速；唬你／剋不動的結果框停著時＝看完了、繼續
        if (S.hold) { if (performance.now() - S.hold.at > HOLD_GUARD) S.hold.done(); return; }
        if (!S.rush && performance.now() - S.playAt > RUSH_MS) { S.rush = true; setSpeed(Math.max(S.speed, 4)); }
        return;
      }
      if ((x = t.closest('.ab'))) { if (!inChipGap(ev)) abTap(x); return; }
      if (t.closest('.pop')) return;                 // 屬性鈕之間的縫：什麼都不做（RV11-2）
      if (t.closest('.hand')) { handTap(t, ev); return; }
      // 「你丟的」預覽（打開那張的半透明）、你的名字與聲望那列：還是手牌這一塊，不收回（RV11-3）
      if (t.closest('.slot.p.pre, .dl-p')) return;
      if (S.sel) closeHand(true);                    // 點手牌外面（牌桌、他那一塊）：收回疊好
    }
    // 盤面外面（舞台、頂欄）也算「手牌外面」；唱片資訊、教學遮罩、面板上的點擊不算
    function onDocClick(ev) {
      if (!els.cheat.hidden && ev.target && !(ev.target.closest && root.contains(ev.target))) setCheat(false);
      if (S.apxOpen && !S.infoOpen && ev.target && ev.target.closest && !root.contains(ev.target) && !ev.target.closest('#cardInfoMask, #tut, #tutTip, .lb-modal')) closeApex();
      if (!S.sel || S.destroyed || S.infoOpen) return;
      const t = ev.target;
      if (!t || !t.closest || root.contains(t) || t.closest('#cardInfoMask, #tut, #tutTip, .lb-modal')) return;
      closeHand(true);
    }
    const LP_SEL = '.cvw[data-act="pick"], .slot[data-card], .ab, .lastplay .lp';
    function onDown(ev) {
      S.down = { x: ev.clientX, y: ev.clientY, t: performance.now() };   // 手指真正按下的位置（觸控校正只改 click 的座標；inChipGap 用）
      S.swallow = null;   // 新的一次按下：上一次長按放開的 click 沒來（觸控取消、Android 長按不補 click）就不再等它，這一下照常（V5 F6）
      const t = ev.target.closest(LP_SEL);
      if (!t || S.held || (ev.button != null && ev.button > 0)) { S.lp = null; return; }
      const lp = S.lp = { el: t, x: ev.clientX, y: ev.clientY, h: 0 };
      lp.h = later(() => {
        if (S.lp !== lp) return;
        S.lp = null;
        const ok = t.matches('.ab') ? chipTip(t) : t.matches('.slot') ? infoOfSlot(t) : t.matches('.lp') ? infoOfLast(t) : infoOfTile(t);
        if (ok) S.swallow = { el: t };   // 放開手指的那一下 click 不再打開／收回／再開一次／丟出（按住屬性鈕＝看說明，不出牌；RV11-6）
      }, LONG_MS);
    }
    function onMove(ev) { const lp = S.lp; if (lp && (Math.abs(ev.clientX - lp.x) > 10 || Math.abs(ev.clientY - lp.y) > 10)) { clearTimeout(lp.h); S.lp = null; } }
    function onUp() { const lp = S.lp; if (lp) { clearTimeout(lp.h); S.lp = null; } }
    // 滑鼠移到屬性鈕上＝「你丟的」那格預覽那個屬性（觸控沒有 hover：預覽一直是最高那顆）
    function onOver(ev) {
      if (ev.pointerType !== 'mouse' || !S.sel || S.sel.i === 'ace' || !canAct()) return;
      const b = ev.target.closest && ev.target.closest('.ab'); if (!b) return;
      const a = b.dataset.a; if (!ATTRS.includes(a) || S.sel.attr === a) return;
      S.sel = { i: S.sel.i, attr: a };
      renderPop({ hover: true }); renderTri(); renderSlot('p');
      emit('selected', { i: S.sel.i, attr: a });
    }
    root.addEventListener('click', onClick);
    document.addEventListener('click', onDocClick);
    root.addEventListener('pointerdown', onDown);
    root.addEventListener('pointermove', onMove);
    root.addEventListener('pointerup', onUp);
    root.addEventListener('pointercancel', () => { onUp(); S.swallow = null; });   // 取消＝不會有 click 來（V5 F6）
    root.addEventListener('pointerover', onOver);
    root.addEventListener('contextmenu', ev => { if (ev.target.closest('.tile,.slot,.ab,.sleeve,.lp')) ev.preventDefault(); });
    root.addEventListener('keydown', ev => {
      if ((ev.key === 'Enter' || ev.key === ' ') && ev.target.classList && ev.target.classList.contains('slot')) { ev.preventDefault(); ev.target.click(); }
      if (ev.key === 'Escape' && S.apxOpen) { ev.preventDefault(); closeApex(); return; }
      if (ev.key === 'Escape' && S.sel) { ev.preventDefault(); closeHand(true); }
    });
    function renderAll(opt) {
      const v = S.v;
      renderE(v, opt); renderTable(v); renderP(v, opt); renderHand(v);
      scheduleFit();
    }

    // ---------------- 一手（約 2 s；SPEC-v4 §2.5.1） ----------------
    function rectOf(el) { if (!el) return null; const r = el.getBoundingClientRect(); return r.width ? r : null; }
    function fly(el, from, ms) {
      if (!el) return null;
      if (!from || rm()) return A(el, [{ opacity: 0 }, { opacity: 1 }], { duration: 150 });
      const to = el.getBoundingClientRect(); if (!to.width) return null;
      const dx = from.left - to.left, dy = from.top - to.top, s = from.width / to.width;
      el.style.transformOrigin = '0 0';
      const a = A(el, [{ transform: `translate(${dx}px,${dy}px) scale(${s})` }, { transform: 'translate(0,0) scale(1)' }], { duration: ms, easing: 'cubic-bezier(.2,.7,.3,1)' });
      if (a) a.finished.then(() => { el.style.transformOrigin = '50% 50%'; }, () => {});
      return a;
    }
    // 浮框的句子只在標點後面換行（「冷門」「自主發行」不會被拆成兩行）：每段（到，。！？為止）包成不拆的一塊（不用 lookbehind：iOS 16.3 以前不認）
    const segHTML = t => String(t || '').replace(/([，。！？；：])/g, '$1\n').split('\n').filter(Boolean).map(x => `<span class="sg">${esc(x)}</span>`).join('');
    function fadeIn(el, ms) { if (el) A(el, [{ opacity: 0 }, { opacity: 1 }], { duration: ms || 200, easing: 'ease-out' }); }
    function showCallout(ct) {
      const c = els.call;
      c.querySelector('.l1').className = 'l1' + (ct.bluff ? ' bl' : '');
      c.querySelector('.l1').innerHTML = segHTML(ct.l1);
      const l2 = c.querySelector('.l2');
      l2.className = 'l2 ' + ct.cls;
      l2.innerHTML = `<span class="v key">${esc(ct.l2)}</span>${ct.notes.length ? `<span class="nt">${ct.notes.map((x, k) => `<span class="ns">${esc(x)}${k < ct.notes.length - 1 ? '・' : ''}</span>`).join('')}</span>` : ''}`;
      c.querySelector('.l3').innerHTML = segHTML(ct.l3);
      c.querySelector('.l3').hidden = !ct.l3;
      c.classList.add('on');
      els.table.classList.add('res');
      // 補充句（配件、品味、底氣）跟數字同一行放不下：自己另起一行、可以折行（一句不拆開；審查 #9）
      if (l2.scrollWidth > l2.clientWidth + 1) l2.classList.add('wrap');
      placeCallout();
      if (rm()) A(c, [{ opacity: 0 }, { opacity: 1 }], { duration: 150, fill: 'both' });
      else A(c, [{ transform: 'scale(.3)', opacity: 0 }, { transform: 'scale(1.06)', opacity: 1, offset: .6 }, { transform: 'scale(1)', opacity: 1 }], { duration: 380, easing: 'cubic-bezier(.18,.9,.32,1.25)', fill: 'both' });
    }
    // 結果框長在字帶裡（上緣＝字帶上緣）；四行（唬你＋剋不動）在矮螢幕放不下時整個往上挪，不蓋到牌桌下的黑線與「你／聲望」那列（RH-3）；
    //   最多挪到封面下緣（蓋到封面下那行字，不蓋封面）
    //   挪到底還放不下（唬你＋剋不動兩句都換行）：行距收緊一點（.tight）
    function placeCallout() {
      const c = els.call;
      c.style.marginTop = ''; c.classList.remove('tight');
      const avail = els.table.clientHeight - 2 - c.offsetTop, up = (parseFloat(getComputedStyle(els.table).getPropertyValue('--lab')) || 19) + 4;
      let h = c.offsetHeight;
      if (h - avail > up) { c.classList.add('tight'); h = c.offsetHeight; }
      if (h > avail) c.style.marginTop = -Math.min(h - avail, up) + 'px';
    }
    function hideCallout() {
      const c = els.call; if (!c.classList.contains('on')) return;
      const a = A(c, [{ opacity: 1 }, { opacity: 0 }], { duration: 200, fill: 'forwards' });
      const done = () => { c.classList.remove('on'); els.table.classList.remove('res'); S.anims.forEach(x => { try { if (x.effect && x.effect.target === c) x.cancel(); } catch (_) {} }); };
      if (a) a.finished.then(done, done); else done();
    }
    // 唬你／剋不動的結果框：停到點一下為止（看夠久＝readMs 自己走；真實時間，不吃加速；唱片資訊開著、按住時不算時間）
    function readHold(ct) {
      return new Promise(res => {
        if (S.destroyed) return res();
        const c = els.call, l4 = c.querySelector('.l4');
        if (l4) l4.textContent = T('tapOn') + ' ▼';
        c.classList.add('wait'); placeCallout();
        let left = readMs((ct.l1 || '') + (ct.l3 || '')), last = performance.now(), h = 0;
        const done = () => { if (!S.hold) return; clearTimeout(h); S.timers.delete(h); S.hold = null; c.classList.remove('wait'); res(); };
        S.hold = { at: performance.now(), done };
        const tick = () => { S.timers.delete(h); if (S.destroyed) { S.hold = null; return res(); } const now = performance.now(); if (!paused()) left -= now - last; last = now; if (left <= 0) done(); else { h = setTimeout(tick, 50); S.timers.add(h); } };
        h = setTimeout(tick, 50); S.timers.add(h);
      });
    }
    function bigStamp(text, cls, sub) {
      const k = els.kost;
      k.className = 'kost on ' + (cls || '');
      k.innerHTML = `<b>${esc(text)}</b>${sub ? `<small>${esc(sub)}</small>` : ''}`;
      if (rm()) A(k, [{ opacity: 0 }, { opacity: 1 }], { duration: 200, fill: 'forwards' });
      else A(k, [{ transform: 'translate(-50%,-50%) rotate(-4deg) scale(1.8)', opacity: 0 }, { transform: 'translate(-50%,-50%) rotate(-4deg) scale(.96)', opacity: 1, offset: .5 }, { transform: 'translate(-50%,-50%) rotate(-4deg) scale(1)', opacity: 1 }], { duration: 420, easing: 'ease-out', fill: 'forwards' });
    }
    // 音效：counter→readHit、countered／mirrorLose→hurt、其他→mirror（§2.5.1）
    const hitSfx = c => c.kind === 'counter' ? 'readHit' : (c.kind === 'countered' || (c.kind === 'mirrorLose' && (c.toP | 0) > 0)) ? 'hurt' : 'mirror';   // 比星輸了但王牌免扣（toP 0）＝不是被打（旗標關時 mirrorLose 一定 toP>0）
    function flashOf(c) {
      if (c.kind === 'counter') return { edge: c.pAttr + c.eAttr, tone: 'g' };
      if (c.kind === 'countered') return { edge: c.eAttr + c.pAttr, tone: 'r' };
      if (c.blocked && c.by) return c.by === 'p' ? { edge: c.pAttr + c.eAttr, tone: 'f' } : { edge: c.eAttr + c.pAttr, tone: 'f' };
      return { ring: c.pAttr };
    }
    function stageClash(cl) {
      if (!hasStage('clash')) return null;
      if (hasStage('clearClash')) stg('clearClash');
      return stg('clash', {
        kind: cl.kind, blocked: cl.blocked || null, by: cl.by === undefined ? null : cl.by, toE: cl.toE | 0, toP: cl.toP | 0,
        p: { attr: cl.pAttr, star: cl.pStar, card: cl.pCard && cl.pCard.id, ace: !!cl.ace },
        e: { attr: cl.eAttr, star: cl.eStar, card: cl.eCard && cl.eCard.id, ace: !!cl.eAce },
        nameE: enemy.name || '', speed: S.speed, reduced: rm(),
      });
    }
    function stageFallbackHit(cl) {   // 沒有舞台時：受擊＋頭上飄字
      if (cl.toE > 0) { stg('pose', 'f', 'hurt', 200); stg('float', 'f', '−' + cl.toE); }
      if (cl.toP > 0) { stg('pose', 'p', 'hurt', 200); stg('float', 'p', '−' + cl.toP, 'r'); }
    }
    function oneTimeTips(cl) {
      if (cl.bluff) hint('tip_bluff', ['result']);
      if (cl.blocked === 'gap') hint('tip_block', ['result']);
      if (cl.ace) hint('tip_ace', ['result']);          // 第一次丟王牌（FIXLIST 2；hint 一場只送一次）
      if (cl.pAttr === cl.eAttr) hint('tip_mirror', ['result']);
      if ((cl.notes || []).some(n => n && n.apex && n.hit === false && !n.full)) hint('tip_apexMiss', ['result']);   // 頂點卡試做：第一次出現「沒作用」那句（看穿、回聲望沒有這句）
    }
    async function play(act, sel) {
      if (!canAct() || !legal(sel)) return false;
      closeApex(); if (els.apxf) hideApxf();
      S.busy = true; S.rush = false; S.playAt = performance.now();
      const v0 = S.v;
      const tileEl = els.tiles.querySelector(`.tile[data-i="${sel.i}"]`);
      const srcP = rectOf(tileEl && tileEl.querySelector('.cv'));
      const srcE = rectOf(els.se.querySelector('.sleeve-bk'));
      let evs;
      const ro = {};
      try { if (typeof hooks.resolveOpts === 'function') Object.assign(ro, hooks.resolveOpts(act) || {}); } catch (e) { console.error(e); }
      try { if (tut && typeof tut.resolveOpts === 'function') Object.assign(ro, tut.resolveOpts(act) || {}); } catch (e) { console.error(e); }
      try { evs = E.resolveTurn(duel, act, ro) || []; } catch (e) { console.error(e); S.busy = false; renderAll(); return false; }
      if (opts.onSave) try { opts.onSave(duel); } catch (e) { console.error(e); }
      const v1 = view();
      const cl = evs.find(e => e.t === 'clash');
      const over = evs.find(e => e.t === 'over'), hs = evs.find(e => e.t === 'hand'), dr = evs.find(e => e.t === 'draw');
      if (!cl) { console.error('DipLabDuel: no clash event', evs); S.busy = false; S.v = v1; renderAll(); return false; }
      const t0 = performance.now();
      const ct = clashText(cl, T, hints, apexMode() ? apxUI() : undefined);
      const rec = { n: v0.n, act, sel, evs, ct };
      S.debug.hands.push(rec); if (S.debug.hands.length > 300) S.debug.hands.shift();
      S.sel = null; S.openTap = null;                    // 丟出去：手牌收回疊好（下一手從疊著開始）
      setPhase('resolve');
      root.classList.add('busy');
      emit('selected', null);
      // ---- t=0：你的牌飛上牌桌、手牌收回疊好；他那格「蓋著」；舞台一台唱盤開演
      S.lastCt = null; S.flash = null;
      S.table = { e: { card: cl.eCard, attr: cl.eAttr, star: cl.eStar, ace: !!cl.eAce, hidden: true }, p: { card: cl.pCard, attr: cl.pAttr, star: cl.pStar, ace: !!cl.ace }, dim: false };
      S.lpFade = true;                                   // 上一手小列變淡、籤藏起：牌桌兩格才是這一手
      renderTable(v0);
      if (tileEl) tileEl.classList.add('gone');
      renderPop(); layoutHand(true);
      renderRec(v0, 1);
      fly(els.sp.querySelector('.cv'), srcP, 260); fadeIn(els.sp.querySelector('.who'), 260);
      fly(els.se.querySelector('.cv'), srcE, 260);
      let stagePr = stageClash(cl);
      if (!stagePr && !hasStage('clash')) { stg('pose', 'p', 'atk', 200); later(() => stg('pose', 'f', 'atk', 200), 260 / S.speed); }
      onEvent(cl);
      await wait(T_FLIP);
      if (S.destroyed) return true;
      // ---- t=280：他那格翻面（屬性＋星）
      S.table.e.hidden = false; renderSlot('e');
      const ecv = els.se.querySelector('.cvw');
      if (ecv && !rm()) A(ecv, [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: 120, easing: 'ease-out' });
      fadeIn(els.se.querySelector('.who'), 160);
      await wait(T_HIT - T_FLIP);
      if (S.destroyed) return true;
      // ---- t=560：浮框三行、聲望條、音效、一次性小提示
      S.flash = flashOf(cl); renderTri();
      root.classList.add('revealed');          // 中間字帶：提示句收起、換成結果句（之後是「上一手」那行），下一手才換回提示（FIXLIST 9）
      showCallout(ct);
      sfx(hitSfx(cl));
      if (!hasStage('clash')) stageFallbackHit(cl);
      setHp(els.ehp, els.ehpn, v1.eHp, v1.eMax, true);
      setHp(els.php, els.phpn, v1.pHp, v1.pMax, true);
      if (cl.toE > 0) floatAt(els.ehpn, '−' + cl.toE, 'g');
      if (cl.toP > 0) floatAt(els.phpn, '−' + cl.toP, 'r');
      // 結果句裡有配件或品味／底氣那句：那顆閃一下（品味／底氣：你的在你那一列、他的（eAtk／eDef）在他那一列）
      const noteEl = n => !n ? null : n.apex ? (apexTileEl() || {}).firstElementChild || null : n.relic ? els.relics.querySelector(`[data-relic="${cssEsc(n.relic)}"]`)
        : n.stat ? (/^e/.test(n.stat) ? els.est : els.pst).querySelector(`[data-st="${/atk$|Atk$/.test(n.stat) ? 'a' : 'd'}"]`) : null;
      if (ct.notes.length) (cl.notes || []).forEach(n => { const b = noteEl(n); if (b && !rm()) A(b, [{ transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(184,134,11,0)' }, { transform: 'scale(1.25)', boxShadow: '0 0 0 3px rgba(184,134,11,.6)', offset: .4 }, { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(184,134,11,0)' }], { duration: 700 }); });
      oneTimeTips(cl);
      rec.ui = snapUI();
      if (tut && typeof tut.onResolved === 'function') try { tut.onResolved(evs); } catch (e) { console.error(e); }
      emit('resolved', evs);
      if (!tut && !S.auto && !FAST && (ct.bluff || cl.blocked)) await readHold(ct);   // 唬你／剋不動：停到點一下（或看夠久自己走）
      else await wait(T_LINE - T_HIT);
      if (S.destroyed) return true;
      // ---- t=1460：浮框收成「上一手」
      hideCallout();
      S.lastCt = ct; S.flash = null;
      renderLast(); renderTri();
      if (!rm()) A(els.last, [{ opacity: 0 }, { opacity: 0, offset: .5 }, { opacity: 1 }], { duration: 420 });   // 結果框淡完才出「上一手」，不疊字（R-05a）
      rec.ui.lastline = els.last.textContent.replace(/\s+/g, ' ').trim();
      emit('settled', evs);
      if (over) { await finish(over, v1, cl); return true; }
      await wait(T_NEXT - T_LINE);
      if (S.destroyed) return true;
      if (stagePr && typeof stagePr.then === 'function' && !S.rush) { /* 舞台演完才換手（最多再等 400 ms） */ await Promise.race([stagePr.catch(() => {}), wait(400)]); }
      // ---- t=2060：下一手（提示句換字、手數加一）
      S.debug.lastMs = performance.now() - t0;
      S.v = v1;
      // 牌桌兩張搬進上一手小列（第一次＝長出來，版面縮一號；之後＝換掉）：先量大封面，換完版面再飛
      const bigE = rectOf(els.se.querySelector('.cv')), bigP = rectOf(els.sp.querySelector('.cv'));
      if (S.table && S.table.e && S.table.p) { S.lpd = { e: lpSnap(S.table.e), p: lpSnap(S.table.p) }; S.lpOn = !!(S.lpd.e && S.lpd.p); }
      S.lpFade = false;
      if (S.table) S.table.dim = true;
      S.speed = baseSpeed(); setSpeed(S.speed); S.rush = false;
      root.classList.remove('busy', 'revealed');
      S.busy = false;
      renderE(v1); renderTable(v1); renderP(v1); renderHand(v1, { slideNew: dr && dr.card ? dr.i : null });
      const fitPend = !!S.fitRaf; scheduleFit(); if (fitPend) fit();   // 小列第一次長出來：這一刻就要量好新版面（飛的終點）
      lpFly(bigE, bigP);
      // 提示從半透明開始：中間字帶不會只剩「提示」兩個字（R-05b）
      if (!rm()) { A(els.htx, [{ opacity: .45, transform: 'translateY(-3px)' }, { opacity: 1, transform: 'none' }], { duration: 240, easing: 'ease-out' }); A(els.rounds, [{ opacity: .2 }, { opacity: 1 }], { duration: 320 }); }
      if (hs) onEvent(hs);
      handStart(v1);
      setPhase('choose');
      return true;
    }
    function handStart(v) {
      holdBack();
      holdSleeve('p', null);
      if ((v.n | 0) >= (v.maxRounds || 6)) hint('tip_rounds', ['rounds']);
      if (lpHas() && !els.lp.hidden) hint('tip_lastplay', ['lastplay']);   // 一次性：上一手兩張留在上面、點得開（教學中不出，由 tutorial.js queueTip 擋）
      emit('handStart', v);
    }
    // 六手打完／他牌出完的副標（FIXLIST 3：比聲望條剩幾成）。% 用引擎 over 事件的 pct（＝E.pctPair：整數一樣但勝負不同時改一位小數），
    //   不自己四捨五入；兩邊比例真的一樣（一樣算你贏）用 roundsEven
    function roundsVars(over, v, win) {
      let pct = over && over.pct;
      if (!pct && typeof E.pctPair === 'function') pct = E.pctPair(v.pHp, v.pMax, v.eHp, v.eMax);
      pct = pct || { p: String(Math.max(0, v.pHp)), e: String(Math.max(0, v.eHp)) };
      const even = win && typeof E.playerAhead === 'function' && v.pMax > 0 && v.eMax > 0 && v.pHp * v.eMax === v.eHp * v.pMax;
      return { p: pct.p, e: pct.e, who: win ? '你' : '他', even };
    }
    // 勝利曲（D §4）：一律播整場贏家最後丟出的那張（＝最後一手贏家那邊的唱片；§2.5.1）
    function winnerSong(win, cl) {
      const card = cl ? (win ? cl.pCard : cl.eCard) : null;
      const f = Fx(); if (!card || !f || !f.music || typeof f.music.play !== 'function') return;
      try { const p = f.music.play(card, { fadeMs: 600 }); if (p && p.catch) p.catch(() => {}); } catch (e) { console.error(e); }
    }
    async function finish(over, v1, cl) {
      S.ending = true;
      closeApex();
      const win = !!over.win;
      const result = { over: win ? 'win' : 'lose', win, by: over.by || 'hp', pHp: v1.pHp, eHp: v1.eHp, duel };
      setPhase('over');
      root.classList.add('over');
      renderPop(); renderHint(v1); renderRec(v1);
      if (result.by === 'hp') stg('pose', win ? 'f' : 'p', 'ko', 700);
      sfx('ko');
      // 打完他說一句（只說一次，COPY-02）：序章男子的 E2／E3、藏家輸了的 C1 由接下來的對白講，盤面不冒泡泡；其他人在這裡說，挑唱片／說情畫面不再重複
      const endLine = (!enemy.prologue && !(win && enemy.boss)) ? pickLine(win ? ['lose'] : ['win']) : null;
      if (endLine) say('f', endLine, 1800, true);
      later(() => sfx(win ? 'win' : 'lose'), 300);
      winnerSong(win, cl);
      let tx = null;
      if (typeof hooks.endText === 'function') try { tx = hooks.endText(result); } catch (e) { console.error(e); }
      if (!tx) {
        const nm = enemy.name || '';
        if (result.by === 'rounds' || result.by === 'pile') { const rv = roundsVars(over, v1, win); tx = { title: T('roundsOut'), sub: T(rv.even ? 'roundsEven' : 'roundsScore', rv), cls: win ? 'ink' : 'red' }; }
        else if (win) tx = { title: T('koWin'), sub: nm ? T('koWinSub', { name: nm }) : '', cls: 'ink' };
        else tx = { title: T('koLose'), sub: '', cls: 'red' };      // 老闆說情由接下來的對白講（COPY-07：大章不再寫「老闆：……再一場。」）
      }
      if (els.call.classList.contains('on')) await wait(220);      // 結果框淡完再蓋大章（R-05c：大章被結果框蓋住半秒）
      if (S.destroyed) return;
      bigStamp(tx.title, tx.cls || (win ? 'ink' : 'red'), tx.sub);
      onEvent(over);
      S.v = v1;
      emit('over', result);
      // 比聲望條的大章有兩行要看：至少 3 秒（R-05c）；他打完說的那句也要看得完（真實時間）
      const endMs = result.by === 'rounds' || result.by === 'pile' ? 3000 : 1500;
      await wait(Math.max(endMs, (endLine && !FAST && !S.auto) ? (readMs(endLine) - 300) * S.speed : 0));
      if (S.destroyed) return;
      if (typeof hooks.beforeEnd === 'function') { try { await hooks.beforeEnd(result); } catch (e) { console.error(e); } }
      if (S.destroyed) return;
      if (!rm()) { const a = A(root, [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(24px)' }], { duration: 300, easing: 'ease-in', fill: 'forwards' }); if (a) await a.finished.catch(() => {}); }
      tags(false);
      stg('hold', 'e', null); holdSleeve('p', null);
      S.busy = false;
      if (opts.onEnd) try { opts.onEnd(result); } catch (e) { console.error(e); }
    }

    // ---------------- 起手 ----------------
    function initialTable() {   // 續玩：從 view().last 還原「上一手」兩張（放進上一手小列）
      const l = S.v.last;
      if (!l || S.v.over) return;
      S.lastCt = clashText(l, T, hints, l && 'apex' in l ? apxUI() : undefined);
      S.table = { e: { card: l.eCard, attr: l.eAttr, star: l.eStar, ace: !!l.eAce }, p: { card: l.pCard, attr: l.pAttr, star: l.pStar, ace: !!l.ace }, dim: true };
      S.lpd = { e: lpSnap(S.table.e), p: lpSnap(S.table.p) }; S.lpOn = !!(S.lpd.e && S.lpd.p);   // 上一手小列一開始就在
    }
    initialTable();
    renderAll();
    if (opts.enter && !rm()) {
      const a = A(root, [{ opacity: 0, transform: 'translateY(24px)' }, { opacity: 1, transform: 'none' }], { duration: 600, easing: 'cubic-bezier(.2,.7,.3,1)' });
      const done = () => { if (S.destroyed) return; S.enterDone = true; afterEnter(); };
      if (a) a.finished.then(done, done); else done();
    } else { S.enterDone = true; later(afterEnter, 0); }
    function afterEnter() {
      if (S.destroyed) return;
      tags(true);
      const fresh = (S.v.n | 0) <= 1 && !S.v.last;
      const open1 = lines.line || lines.intro;   // 口頭禪，沒有就用推門那句
      if (fresh && open1 && !tut && !enemy.prologue) say('f', Array.isArray(open1) ? open1[0] : open1, 1800);   // 序章男子沒有口頭禪（D §2、COPY-01）
      renderPop();
      handStart(S.v);
      setPhase('choose');
      const pend = S.pendTap; S.pendTap = null;          // 進場時點的那張：現在打開（雙擊的第二下照 RV11-5 不算「再點＝收回」）
      if (pend && !S.sel && liftCard(pend.i) && pend.x != null) S.openTap = { i: pend.i, x: pend.x, y: pend.y, t: performance.now() };
    }

    // ---------------- autoplay（e2e 用；走正常的點擊流程與 gate：點那張（打開）→ 點那個屬性） ----------------
    async function autoplay(policy) {
      const P = E.policies || {};
      const pol = P[policy] || P.novice || P.random;
      if (typeof pol !== 'function') return false;
      S.auto = true;
      const r = E.makeRng ? E.makeRng(1234) : Math.random, mem = {};
      const noApex = a => { const b = Object.assign({}, a); delete b.apex; return b; };
      let held = null;                                    // 頂點卡試做：發動之後要出的那張（策略一步到位挑的；看穿＝照真假挑的那張，不再問一次策略）
      while (S.auto && !S.destroyed && !isOver()) {
        if (!canAct() || paused()) { await wait(40); continue; }
        let act = null;
        if (held && held.n === (S.v && S.v.n) && E.isLegal(duel, held.act)) act = held.act;
        else held = null;
        if (!act) { try { act = pol(duel, r, mem, content); } catch (e) { console.error(e); break; } }
        if (!act) break;
        if (act.apex && apexMode() && E.canApex(duel)) {   // 頂點卡試做：策略要發動＝照畫面點王牌格、按「發動」，接著出策略同一步挑的那張（跟 sim 的 resolveTurn({…, apex:true}) 同一個出法）
          const n0 = S.v && S.v.n;
          if (!S.apxOpen) openApex();
          await wait(120);
          if (!fireApex()) closeApex();
          else held = { n: n0, act: noApex(act) };
          await wait(160);
          continue;
        }
        if (act.apex) act = noApex(act);
        const sel = act.ace ? { i: 'ace', attr: aceAx(S.v) } : { i: act.i, attr: act.attr };
        if (!(S.sel && S.sel.i === sel.i) && !liftCard(sel.i)) { await wait(80); continue; }
        await wait(100);
        if (!canAct() || !S.sel || S.sel.i !== sel.i) continue;
        throwAttr(sel.i, sel.attr, els.abpop.querySelector(`.ab[data-a="${sel.attr}"]`) || els.abpop.querySelector('.ab'));
        held = null;
        await wait(60);
      }
      return true;
    }

    function destroy() {
      S.destroyed = true;
      document.removeEventListener('click', onDocClick);
      tags(false);
      S.timers.forEach(h => clearTimeout(h)); S.timers.clear();
      S.anims.forEach(a => { try { a.cancel(); } catch (_) {} }); S.anims.clear();
      if (S.fitRaf) cancelAnimationFrame(S.fitRaf);
      if (S.ro) try { S.ro.disconnect(); } catch (_) {}
      if (S.roCall) try { S.roCall.disconnect(); } catch (_) {}
      if (S.roHint) try { S.roHint.disconnect(); } catch (_) {}
      root.remove();
    }
    // ---------------- 名字 → 元素（教學手指、e2e） ----------------
    const byTut = n => root.querySelector(`[data-tut="${cssEsc(n)}"]`);
    const chipEl = (b, a) => b ? byTut(b.ace || b.i === 'ace' ? 'chip-ace' : `chip-${b.i}-${a}`) : null;
    const coverEl = b => b ? byTut(b.ace || b.i === 'ace' ? 'card-ace' : `card-${b.i}`) : null;
    function bestOf(spec) {
      const [a, withAce] = spec.split(':');
      if (!ATTRS.includes(a)) return null;
      try { return E.bestChip(duel, a, { ace: withAce === 'ace' }); } catch (_) { return null; }
    }
    function elByName(name) {
      if (!name) return null;
      if (name[0] === '@') { const s = hooks.stage; return s && typeof s.anchor === 'function' ? (() => { try { return s.anchor(name.slice(1)); } catch (_) { return null; } })() : null; }
      if (name.startsWith('chip:best:')) { const s = name.slice(10), b = bestOf(s); return chipEl(b, s.split(':')[0]); }
      if (name.startsWith('card:best:')) return coverEl(bestOf(name.slice(10)));
      if (name.startsWith('card:blocked:')) {
        let b = null;
        try { b = E.blockedChoice(duel, name.slice(13)); } catch (_) { b = null; }
        return coverEl(b);
      }
      if (name.startsWith('chip:blocked:')) {
        const a = name.slice(13); let b = null;
        try { b = E.blockedChoice(duel, a); } catch (_) { b = null; }
        return chipEl(b, a);
      }
      if (name.startsWith('chip:id:')) {
        const s = name.slice(8), k = s.lastIndexOf(':'); if (k < 0) return null;
        const id = s.slice(0, k), a = s.slice(k + 1), i = idxOfCard(S.v, id);
        if (i == null) return null;
        if (i === 'ace') return a === aceAx(S.v) ? byTut('chip-ace') : null;
        return byTut(`chip-${i}-${a}`);
      }
      if (name.startsWith('card:id:')) { const i = idxOfCard(S.v, name.slice(8)); return i == null ? null : coverEl({ i }); }
      if (name.startsWith('card:')) return els.tiles.querySelector(`.tile[data-card="${cssEsc(name.slice(5))}"]`);
      return byTut(name);
    }
    const txt = el => el ? el.textContent.replace(/\s+/g, ' ').trim() : '';
    function snapUI() {
      const slot = el => ({ who: txt(el.querySelector('.who')), card: el.dataset.card || null, dim: el.classList.contains('dim'), back: el.classList.contains('back') });
      return {
        call: { l1: txt(els.call.querySelector('.l1')), l2: txt(els.call.querySelector('.l2 .v')), l3: txt(els.call.querySelector('.l3')), notes: txt(els.call.querySelector('.l2 .nt')), on: els.call.classList.contains('on') },
        slotE: slot(els.se), slotP: slot(els.sp), lastline: txt(els.last), hint: txt(els.htx), rounds: txt(els.rounds), leg: els.leg.hidden ? '' : txt(els.leg),
        eHp: txt(els.ehpn), pHp: txt(els.phpn), pile: txt(els.pileTx), open: S.sel ? S.sel.i : null, pop: txt(els.abpop),
        lastplay: { e: (els.lp.querySelector('.lp.e') || { dataset: {} }).dataset.card || null, p: (els.lp.querySelector('.lp.p') || { dataset: {} }).dataset.card || null,
          fade: els.lp.classList.contains('fade'), hidden: els.lp.hidden, text: txt(els.lp) },
        ...(S.v && S.v.apex ? { apx: els.apx && !els.apx.hidden ? txt(els.apx) : '', apxf: els.apxf && !els.apxf.hidden ? txt(els.apxf) : '', stamp: txt(els.hint.querySelector('.apxst:not([hidden])')),
          aceTile: (apexTileEl() || { dataset: {} }).dataset.apex || null } : {}),
      };
    }
    const api = {
      el: root,
      elByName,
      view: () => S.v,
      duel: () => duel,
      busy: () => S.busy,
      phase: () => S.phase,
      // select(i)＝打開那張（預覽屬性＝topAttr；經 gate 'card'）；select(i, attr)＝打開並預覽那個屬性（不出手）；select(null)＝收回疊好（不經 gate）
      select: (i, attr) => {
        if (i == null) return clearSel();
        if (attr == null) return liftCard(i);
        return previewAttr(i, attr);
      },
      // preview(attr)＝打開那張的預覽換成這個屬性（不經 gate、不出手；教學點屬性那步用：「你丟的」跟手指指的那顆一致）
      preview: attr => {
        if (!S.sel || S.sel.i === 'ace' || !ATTRS.includes(attr) || !canAct() || S.sel.attr === attr) return !!(S.sel && S.sel.attr === attr);
        S.sel = { i: S.sel.i, attr }; renderPop(); renderTri(); renderSlot('p'); emit('selected', { i: S.sel.i, attr });
        return true;
      },
      // play(act)＝直接照這個屬性丟出（gate 只看 'throw'）
      play: act => {
        if (!act || !canAct()) return Promise.resolve(false);
        const sel = act.ace ? { i: 'ace', attr: aceAx(S.v) } : { i: act.i, attr: act.attr };
        const c = cardOf(S.v, sel.i);
        if (!c || !legal(sel) || !gate({ kind: 'throw', i: sel.i, attr: sel.attr, id: c.id })) return Promise.resolve(false);
        S.sel = sel;
        return play(actOf(sel), sel);
      },
      hold: onOff => hold(onOff !== false),
      held: () => S.held,
      apex: open => (open === false ? closeApex() : open === true ? (S.apxOpen || openApex()) : apexTap()),   // 頂點卡試做：開／收能力框
      fireApex: () => fireApex(),
      tri: lit => { S.triForce = lit == null ? null : [].concat(lit); renderTri(); },
      autoplay: p => autoplay(p),
      stopAuto: () => { S.auto = false; },
      rerender: () => { if (S.destroyed || S.busy) return; S.v = view(); S.speed = baseSpeed(); setSpeed(S.speed); renderAll(); },
      debug: () => ({
        phase: S.phase, n: S.v.n, view: S.v, sel: S.sel, open: S.sel ? S.sel.i : null, lay: S.lay, hand: S.handGeom || null, busy: S.busy, held: S.held, speed: S.speed, enterDone: S.enterDone, rush: S.rush,
        ui: snapUI(), hands: S.debug.hands.map(h => ({ n: h.n, sel: h.sel, evs: h.evs, ct: h.ct, ui: h.ui })), last: S.debug.hands[S.debug.hands.length - 1] || null,
        log: S.debug.log.slice(), ms: S.debug.lastMs || null, cls: root.className,
      }),
    };
    if (qs.get('debug') === '1') window.__dl = api;
    return { api, destroy };
  }

  const DipLabDuel = {
    mount, unmount, on,
    el: name => (CUR ? CUR.api.elByName(name) : null),
    debug: () => (CUR ? CUR.api.debug() : null),
    api: () => (CUR ? CUR.api : null),
    select: (i, attr) => (CUR ? CUR.api.select(i, attr) : false),
    preview: attr => (CUR ? CUR.api.preview(attr) : false),
    hold: onOff => (CUR ? CUR.api.hold(onOff) : 0),
    play: act => (CUR ? CUR.api.play(act) : Promise.resolve(false)),
    tri: lit => { if (CUR) CUR.api.tri(lit); },
    autoplay: policy => (CUR ? CUR.api.autoplay(policy) : false),
    stopAuto: () => { if (CUR) CUR.api.stopAuto(); },
    rerender: () => { if (CUR) CUR.api.rerender(); },
    triSVG: (lit, idp) => triLit(lit, idp),
    _fmt: { clashText, ruleText, hintOf, text: dtOf },
  };
  window.DipLabDuel = DipLabDuel;
})();
