// check-content.mjs：content.js／cards.js 結構自檢（品味對決 v3；SPEC-v3 §2.1、§3、§8、§9、§10.6）。改了客人、牌組、教學或重烘 cards.js 之後跑一次。
//
//   node game-lab/tools/check-content.mjs     # 有問題 exit 1
//
// 檢查：
//   卡片：欄位、星數（一般卡 ≤5、王牌那軸 7）、封面、試聽；所有引用的卡 id 都存在；王牌只能當王牌。
//   王牌與包包：三張王牌各一軸 7 星（aceAxis）；老闆送四張、門口一百塊三張＝開局 7 張（engine CFG.bagStart）。
//   客人（10 位）：脾氣 habit／第二句 phase2 都在 C.habits 裡（＝engine HABIT_KEYS）；聲望 男子 10、一般 14、菁英 16、藏家 18
//     （SPEC-v3 原案 13／15／17；發燒配件加回來後各 +1，sim.mjs 調過）；唱片 一般與菁英 7 張、藏家 6 張（＋你沒選的王牌）、男子 6 張；
//     不重複、不含王牌；taste 是 c／o／h 的排列；照脾氣率 p 在 (0,1]；菁英與藏家有第二句；名牌那句與第二句的字都在。
//   發燒配件：6 件、欄位齊全；序章三選一（防塵套／黑膠唱針／洗碟水）；relicPool ⊂ relics；最多 3 件。
//   序章引導教學 C.tutorial（SPEC-v3 §8）：聲望 14；他的唱片 7 張、依序 Coldplay《Mylo Xyloto》→ Sigur Rós《Von》→ 老王樂隊《暮夜徐行》→ Imagine Dragons；
//     前四手丟經→硬→冷→經（＝他亮出那張最大的星：老實＝照名牌）；三王牌的起手 3 張＋抽牌＝老闆四張＋門口三張；
//     10 步（t1–t10，說／做／建議的順序照表）、目標名、allow、三角邊、學會的小卡 L1–L4；expect 是正數。
//   一次性小提示 5 個 id、規則卡六行＋頁尾的聲望數字＝實際數字、今晚來客、箱子、店裡熱點的鍵、劇本的 ui、回嘴 2 句、名字與造型。
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const HERE = path.dirname(new URL(import.meta.url).pathname);
const LAB = path.resolve(HERE, '..');
const ROOT = path.resolve(LAB, '..');
const require = createRequire(import.meta.url);
const C = require(path.join(LAB, 'content.js'));
let E = null; try { E = require(path.join(LAB, 'engine.js')); } catch (_) { E = null; }
const CARDS = C.cards;
const bad = [];
const ok = (cond, msg) => { if (!cond) bad.push(msg); };
const TIERS = ['hall', 'pearl', 'heresy'];
const ATTRS = ['c', 'o', 'h'];
const sameSet = (a, b) => JSON.stringify([...a].sort()) === JSON.stringify([...b].sort());

// ---------------------------------------------------------------- 卡片本身
const ids = Object.keys(CARDS);
for (const id of ids) {
  const c = CARDS[id];
  ok(c.id === id, id + ': id 不一致');
  for (const k of ['artist', 'album']) ok(typeof c[k] === 'string' && c[k], id + ': 缺 ' + k);
  for (const k of ATTRS) ok(Number.isInteger(c[k]) && c[k] >= 1 && c[k] <= 7, id + ': 星數 ' + k + '=' + c[k]);
  ok(c.coverUrl || c.localCover, id + ': 沒有封面');
  ok(typeof c.previewUrl === 'string' && /^https:\/\//.test(c.previewUrl), id + ': 沒有試聽');
  ok(['tw', 'jp', 'xx'].includes(c.region), id + ': region ' + c.region);
  ok(Array.isArray(c.tags) && Array.isArray(c.genres), id + ': tags/genres');
  ok(c.tier === null || TIERS.includes(c.tier), id + ': tier ' + c.tier);
  if (c.tier) ok(Math.max(c.c, c.o, c.h) === 7, id + ': 王牌要有 7 星那軸');
  else ok(Math.max(c.c, c.o, c.h) <= 5, id + ': 一般卡最高 5 星');
}
const has = (id, where) => ok(CARDS[id], where + ': 找不到卡 ' + id);
const normalCard = (id, where) => { has(id, where); if (CARDS[id]) ok(!CARDS[id].tier, where + ': ' + id + ' 是王牌／頂點卡，不能當一般卡'); };

// ---------------------------------------------------------------- 王牌與包包
for (const t of TIERS) {
  has(C.aces[t], 'aces.' + t);
  ok(['c', 'o', 'h'].includes(C.aceAxis[t]), 'aceAxis.' + t);
  if (CARDS[C.aces[t]]) {
    const a = CARDS[C.aces[t]];
    ok(a.tier === t && a[C.aceAxis[t]] === 7, 'aces.' + t + ': tier／7 星軸不對');
    ok(ATTRS.filter(x => x !== C.aceAxis[t]).every(x => a[x] < 7), 'aces.' + t + ': 只有一軸 7 星');
  }
  if (E) ok(E.TIER_AXIS[t] === C.aceAxis[t], 'aceAxis.' + t + ' 要＝engine TIER_AXIS');
  ok(C.aceTitle && C.aceTitle[t], 'aceTitle.' + t);
  ok(C.gifts[t].length === 4, 'gifts.' + t + ' 要 4 張');
  C.gifts[t].forEach(id => normalCard(id, 'gifts.' + t));
}
ok(C.junk.length === 3, 'junk 要 3 張'); C.junk.forEach(id => normalCard(id, 'junk'));
if (E) ok(4 + C.junk.length === E.CFG.bagStart, '開局包包＝老闆四張＋門口三張＝engine CFG.bagStart（' + E.CFG.bagStart + '）');
for (const id of Object.values(C.aces).concat(...Object.values(C.gifts), C.junk)) ok(CARDS[id] && CARDS[id].pitch, id + ': 缺推薦語（王牌、老闆四張、門口三張）');

// ---------------------------------------------------------------- 脾氣
const HK = E ? E.HABIT_KEYS : ['honest', 'copy', 'grudge', 'repeat', 'rot', 'bluff', 'eye'];
ok(sameSet(Object.keys(C.habits || {}), HK), '脾氣要剛好是 ' + HK.join(' '));
for (const [k, h] of Object.entries(C.habits || {})) ok(h && h.zh && h.line, 'habits.' + k + ': zh／line');
ok(C.habitLabels && C.habitLabels.base && C.habitLabels.switched, 'habitLabels base／switched');

// ---------------------------------------------------------------- 客人
const EIDS = ['man', 'copycat', 'already', 'needle', 'skip', 'broke', 'buyer', 'label', 'critic', 'boss'];
ok(JSON.stringify(Object.keys(C.enemies)) === JSON.stringify(EIDS), '客人 id 要是 ' + EIDS.join(' '));
const HP = { man: 10, normal: 14, elite: 16, boss: 18 };
const dc = fs.readFileSync(path.join(ROOT, 'dip-character.js'), 'utf8');
const HEADS = [...dc.slice(dc.indexOf('const AVATAR_HEADS'), dc.indexOf('const AVATAR_COLORS')).matchAll(/\n\s*([a-z]+)\s*:\s*\{/g)].map(m => m[1]);
const PAL = [...(dc.match(/const PIX_PAL = \{([^}]*)\}/) || ['', ''])[1].matchAll(/([a-z]):'#/g)].map(m => m[1]);
const avatarOk = (a, where) => {
  ok(a && HEADS.includes(a.head), where + ': head ' + (a && a.head) + ' 不在 AVATAR_HEADS');
  for (const k of ['hair', 'shirt', 'pants', 'skin']) ok(a && PAL.includes(a[k]), where + ': ' + k + '=' + (a && a[k]) + ' 不在 PIX_PAL');
};
const kindOf = e => e.prologue ? 'man' : e.boss ? 'boss' : e.elite ? 'elite' : 'normal';
for (const id of EIDS) {
  const e = C.enemies[id]; const w = 'enemies.' + id;
  if (!e) continue;
  const kind = kindOf(e);
  ok(e.id === id && e.name, w + ': id／name');
  ok(e.spr ? /^(e[0-7]|boss)$/.test(e.spr) : !!e.avatar, w + ': 要有 spr 或 avatar');
  if (e.avatar) avatarOk(e.avatar, w + '.avatar');
  ok(HK.includes(e.habit), w + ': habit ' + e.habit + ' 不在 C.habits');
  ok(e.hp === HP[kind], w + ': 聲望要 ' + HP[kind] + '（' + kind + '），現在 ' + e.hp);
  ok(/^[coh]{3}$/.test(e.taste) && new Set(e.taste).size === 3, w + ': taste');
  if (e.p != null) ok(e.p > 0 && e.p <= 1, w + ': 照脾氣率 p');
  if (kind === 'man') ok(e.p === 1 && e.habit === 'honest', w + ': 男子老實、照脾氣 100%');
  if (kind === 'elite' || kind === 'boss') {
    ok(HK.includes(e.phase2) && e.phase2 !== e.habit, w + ': 菁英／藏家要有第二句脾氣 phase2');
    ok(C.phase2Lines && C.phase2Lines[id] && C.phase2Lines[id].includes(C.habits[e.phase2] ? C.habits[e.phase2].line : '\u0000'), w + ': phase2Lines 要含第二句脾氣的那句');
    ok(typeof e.phase2Label === 'string' && e.phase2Label, w + ': phase2Label');
  } else ok(!e.phase2, w + ': 一般客人與男子沒有第二句');
  const want = kind === 'normal' || kind === 'elite' ? 7 : 6;
  ok(e.deck.length === want, w + ': 唱片要 ' + want + ' 張，現在 ' + e.deck.length);
  ok(new Set(e.deck).size === e.deck.length, w + ': 唱片有重複');
  e.deck.forEach(cid => normalCard(cid, w + '.deck'));
  ok(e.voice && e.voice.freq > 0, w + ': voice');
  if (kind === 'man') { has(e.drop, w + '.drop'); ok(e.deck[0] === 'coldplay-mylo-xyloto', w + ': 第一張要是 Mylo Xyloto（回嘴）'); }
}
ok(C.normals.length === 6 && C.normals.every(id => C.enemies[id] && kindOf(C.enemies[id]) === 'normal'), 'normals 6 位一般客人');
ok(C.elites.length === 2 && C.elites.every(id => C.enemies[id] && C.enemies[id].elite), 'elites 2 位');
ok(C.enemies[C.boss] && C.enemies[C.boss].boss && C.enemies[C.prologueEnemy] && C.enemies[C.prologueEnemy].prologue, 'boss／prologueEnemy');
// 你沒選的那張王牌會進藏家的唱片：三張王牌都不能已經在他的唱片裡
ok(Object.values(C.aces).every(a => !C.enemies.boss.deck.includes(a)), '藏家的 6 張不含王牌（你沒選的那張由 engine 加）');

// ---------------------------------------------------------------- 發燒配件
const RELIC_IDS = Object.keys(C.relics || {});
ok(RELIC_IDS.length === 6, '發燒配件要 6 件，現在 ' + RELIC_IDS.length);
for (const [id, r] of Object.entries(C.relics || {})) ok(r.id === id && r.name && r.icon && r.desc && r.note, 'relics.' + id + ': id／name／icon／desc／note');
ok(C.rewards && sameSet(C.rewards.prologueRelics, ['dustcover', 'stylus', 'cleaner']), '序章三選一＝防塵套／黑膠唱針／洗碟水');
ok(C.rewards && C.rewards.relicPool.every(r => RELIC_IDS.includes(r)), 'rewards.relicPool ⊂ relics');
ok(C.relicMax === 3 && (!E || E.CFG.relicMax === 3), '發燒配件最多 3 件');

// ---------------------------------------------------------------- 序章引導教學（SPEC-v3 §8）
const TT = C.tutorial;
ok(TT && typeof TT === 'object', '沒有 C.tutorial');
if (TT) {
  ok(TT.hp === 14, 'tutorial.hp 要 14（教學場），現在 ' + TT.hp);
  ok(C.enemies.man.hp === 10, '男子本身仍是 10（直接開打）');
  const REC4 = ['coldplay-mylo-xyloto', 'sigur-ros-von', '老王樂隊-暮夜徐行', 'imagine-dragons-night-visions'];
  ok(Array.isArray(TT.records) && TT.records.length === 7 && new Set(TT.records).size === 7, 'tutorial.records 7 張不重複');
  ok(JSON.stringify((TT.records || []).slice(0, 4)) === JSON.stringify(REC4), 'tutorial.records 前四張要是 ' + REC4.join(' → '));
  (TT.records || []).forEach(id => normalCard(id, 'tutorial.records'));
  ok(JSON.stringify(TT.attrs) === JSON.stringify(['c', 'h', 'o', 'c']), 'tutorial.attrs 要是 經→硬→冷→經');
  // 老實＝丟他亮出那張最大的星：劇本的色要等於那張最大的那色（taste 決勝）
  (TT.attrs || []).forEach((a, k) => {
    const card = CARDS[TT.records[k]]; if (!card) return;
    const max = Math.max(card.c, card.o, card.h);
    const big = [...C.enemies.man.taste].find(x => card[x] === max);
    ok(a === big, 'tutorial 第 ' + (k + 1) + ' 手：老實會丟 ' + big + '，劇本寫 ' + a);
  });
  for (const t of TIERS) {
    const s = TT.script && TT.script[t];
    ok(s, 'tutorial.script.' + t);
    if (!s) continue;
    ok(s.hand.length === 3, 'tutorial.script.' + t + '.hand 要 3 張');
    ok(sameSet([...s.hand, ...s.draw], [...C.gifts[t], ...C.junk]), 'tutorial.script.' + t + '：起手＋抽牌要剛好＝老闆四張＋門口三張');
    ok(JSON.stringify(s.records) === JSON.stringify(TT.records) && JSON.stringify(s.attrs) === JSON.stringify(TT.attrs), 'tutorial.script.' + t + ' 的 records／attrs＝C.tutorial');
    ok(Array.isArray(TT.expect && TT.expect[t]) && TT.expect[t].length === 3 && TT.expect[t].every(n => Number.isInteger(n) && n > 0), 'tutorial.expect.' + t);
    if (TT.expect && TT.expect[t]) ok(TT.expect[t].reduce((a, b) => a + b, 0) < TT.hp, 'tutorial.expect.' + t + '：前三手不能就把他打倒（第 10 步要出現）');
  }
  const KINDS = ['say', 'do', 'soft'];
  const ORDER = ['say', 'say', 'say', 'do', 'do', 'say', 'do', 'do', 'do', 'soft'];
  const steps = TT.steps || [];
  ok(steps.length === 10, 'tutorial.steps 要 10 步');
  ok(JSON.stringify(steps.map(s => s.id)) === JSON.stringify(['t1', 't2', 't3', 't4', 't5', 't6', 't7', 't8', 't9', 't10']), 'tutorial.steps 的 id 要是 t1–t10');
  ok(JSON.stringify(steps.map(s => s.kind)) === JSON.stringify(ORDER), 'tutorial.steps 的種類要是 ' + ORDER.join(' '));
  const TARGET_OK = n => /^(e-habit|e-stars|e-rec|e-hud|e-hp|e-pile|e-star-[coh]|tri|tri-(oc|ch|ho)|table|slot-[ep]|result|lastline|hand|hand-ace|hand-[0-2]|chip-ace|chip-[0-2]-[coh]|throw|act|p-hud|p-hp|relics)$/.test(n) || /^chip:best:[coh](:ace)?$/.test(n) || /^@[fpo]$/.test(n);
  for (const st of steps) {
    const w = 'tutorial.steps.' + st.id;
    ok(KINDS.includes(st.kind), w + ': kind');
    ok(Array.isArray(st.target) && st.target.length && st.target.every(TARGET_OK), w + ': target ' + JSON.stringify(st.target));
    ok(typeof st.text === 'string' && st.text, w + ': text');
    if (st.tri) ok(Array.isArray(st.tri) && st.tri.every(x => ['oc', 'ch', 'ho'].includes(x)), w + ': tri');
    if (st.point) ok(TARGET_OK(st.point), w + ': point');
    if (st.learn) ok(TT.learned && TT.learned[st.learn], w + ': learn ' + st.learn);
    if (st.kind === 'do') {
      const al = st.allow || {};
      ok(Object.keys(al).length && Object.keys(al).every(k => ['chip', 'throw', 'ace', 'info', 'close'].includes(k)), w + ': allow 只能是 chip／throw／ace／info／close');
      if (al.chip) ok(ATTRS.includes(al.chip.attr) && (['best', 'any', 'ace'].includes(al.chip.i) || [0, 1, 2].includes(al.chip.i)), w + ': allow.chip');
    } else ok(!st.allow, w + ': 說明／建議步不用 allow');
  }
  // 每一手教的那條邊＝他丟的色被你剋：t3/t4/t5 冷剋經、t7/t8 經剋硬、t9 硬剋冷
  const BEATS = { o: 'c', c: 'h', h: 'o' };
  const byId = Object.fromEntries(steps.map(s => [s.id, s]));
  const edge = (a) => a + BEATS[a];
  if (byId.t4 && byId.t4.allow) ok(byId.t4.allow.chip && byId.t4.allow.chip.attr === 'o' && byId.t4.allow.chip.i === 'best' && (byId.t4.tri || []).includes(edge('o')), 't4：點最大的冷門星、三角亮冷剋經');
  if (byId.t7 && byId.t7.allow) ok(byId.t7.allow.chip && byId.t7.allow.chip.attr === 'c' && (byId.t7.tri || []).includes(edge('c')), 't7：經典星、三角亮經剋硬');
  if (byId.t9 && byId.t9.allow) ok(byId.t9.allow.chip && byId.t9.allow.chip.attr === 'h' && byId.t9.allow.throw && byId.t9.point === false && (byId.t9.tri || []).includes(edge('h')), 't9：只開放硬蕊、不給手指、三角亮硬剋冷');
  if (byId.t10) ok((byId.t10.target || []).includes('hand-ace'), 't10：指著王牌');
  ok(TT.learned && ['L1', 'L2', 'L3', 'L4'].every(k => TT.learned[k]), 'tutorial.learned 四張小卡 L1–L4');
  ok(TT.ui && TT.ui.wrong === '先點我指的這裡。' && TT.ui.skipTut && TT.ui.replay && TT.ui.skip && TT.ui.who, 'tutorial.ui（who／wrong「先點我指的這裡。」／skipTut／replay／skip）');
}

// ---------------------------------------------------------------- 小提示、規則卡、盤面字
const TIP_IDS = ['tip_mirror', 'tip_offhabit', 'tip_read', 'tip_switch', 'tip_eye'];
ok(C.coachTips && sameSet(Object.keys(C.coachTips), TIP_IDS), 'coachTips 要剛好是 ' + TIP_IDS.join(' '));
ok(C.rules && Array.isArray(C.rules.lines) && C.rules.lines.length === 6, 'rules：六行');
if (C.rules) {
  const foot = (C.rules.foot || []).join('');
  const pHp = E ? E.CFG.playerHp : 10;
  const want = '你 ' + pHp + ' 聲望；客人 ' + C.enemies.copycat.hp + '、菁英 ' + C.enemies.label.hp + '、傳說藏家 ' + C.enemies.boss.hp;
  ok(foot.includes(want), 'rules.foot 的聲望數字要＝實際數字（' + want + '）');
  if (C.rules.example) { has(C.rules.example.eCard, 'rules.example.eCard'); has(C.rules.example.pCard, 'rules.example.pCard'); ok(C.enemies[C.rules.example.enemy], 'rules.example.enemy'); }
}
ok(C.duelText && ['firstHand', 'throwBtn', 'seeThrough', 'koWin', 'koLose', 'pileOut', 'switchBubble', 'eyeMark'].every(k => C.duelText[k]), 'duelText 基本鍵');

// ---------------------------------------------------------------- 今晚來客、箱子、店裡
ok(C.night && C.night.times.length === 5 && C.night.normals === 3 && C.night.retry === 1 && C.night.label, 'night：5 個時間、一般 3 位、說情 1 次');
for (const k of ['jazz', 'tw', 'noise']) { ok(C.bins && C.bins[k] && C.bins[k].label && C.bins[k].ids.length >= 4, 'bins.' + k); if (C.bins && C.bins[k]) C.bins[k].ids.forEach(id => has(id, 'bins.' + k)); }
const SL = C.shopLines || {};
for (const k of ['poster', 'cat', 'locked', 'titleHint', 'taipeiHere', 'taipeiNote', 'taipeiLink', 'backToShop', 'bin', 'booth', 'boothEmpty']) ok(typeof SL[k] === 'string' && SL[k], 'shopLines.' + k);
ok(SL.ownerHint && ['title', 'scene', 'night', 'duel', 'reward'].every(k => typeof SL.ownerHint[k] === 'string'), 'shopLines.ownerHint 五個畫面（title／scene／night／duel／reward）');
ok(Array.isArray(SL.nightIntro) && SL.nightIntro.length === 2, 'shopLines.nightIntro 兩句');
ok(C.summary && C.summary.reached && C.summary.wins && C.summary.taken && C.summary.again, 'summary 結算三件事＋再來一夜');

// ---------------------------------------------------------------- 劇本、名字
const uis = new Set(Object.values(C.script).flat().map(b => b.ui).filter(Boolean));
for (const u of ['guess', 'acePick', 'retort', 'duel', 'stake', 'relic', 'map']) ok(uis.has(u), 'script 沒有 ui:' + u);
ok(C.retorts.length === 2, 'retorts 要 2 句');
const duelBeat = C.script.prologue.find(b => b.ui === 'duel');
ok(duelBeat && Array.isArray(duelBeat.prompts) && duelBeat.prompts.length === 2, '序章開打要有兩顆鈕（prompts：帶教學／直接開打）');
const enemyNames = Object.values(C.enemies).map(e => e.name);
ok(C.names.length >= 20 && C.names.every(n => !enemyNames.includes(n) && [...n].length <= 8), 'names：不能用客人的名字、≤8 字');
ok(C.avatarsFallback.length === 6, 'avatarsFallback 要 6 組'); C.avatarsFallback.forEach((a, k) => avatarOk(a, 'avatarsFallback[' + k + ']'));

// 沒被任何客人、贈禮、箱子用到的卡：v3 可以留在 cards.js（唱片櫃讀得到），只報數字
const used = new Set([...Object.values(C.aces), ...Object.values(C.gifts).flat(), ...C.junk, ...Object.values(C.enemies).flatMap(e => e.deck.concat(e.drop ? [e.drop] : [])),
  ...Object.values(C.bins || {}).flatMap(b => b.ids), ...((C.tutorial && C.tutorial.records) || [])]);
const unused = ids.filter(id => !used.has(id));

if (bad.length) { console.log('content 自檢沒過（' + bad.length + '）：'); bad.forEach(b => console.log('  ✗ ' + b)); process.exitCode = 1; }
else {
  const decks = Object.values(C.enemies).map(e => e.id + ' ' + e.deck.length + '／' + e.hp).join('、');
  console.log('content 自檢通過：卡 ' + ids.length + ' 張（王牌 3、本機封面 ' + ids.filter(i => CARDS[i].localCover).length + '、沒被用到 ' + unused.length + '）；客人 10 位（唱片／聲望 ' + decks + '）；發燒配件 ' + RELIC_IDS.length + '；教學 10 步。');
}
