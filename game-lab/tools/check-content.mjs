// check-content.mjs：content.js／cards.js 結構自檢（SPEC §4、§7.2）。改了敵人、卡池或重烘 cards.js 之後跑一次。
//
//   node game-lab/tools/check-content.mjs     # 有問題 exit 1
//
// 檢查：所有引用的卡 id 都存在；牌庫 6–8 張；頂點（apex）卡只能當王牌；每張卡有封面與試聽；
//       唱盤字、配件、點播標籤、事件效果、像素小人零件都合法。
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const HERE = path.dirname(new URL(import.meta.url).pathname);
const LAB = path.resolve(HERE, '..');
const ROOT = path.resolve(LAB, '..');
const require = createRequire(import.meta.url);
const C = require(path.join(LAB, 'content.js'));
const CARDS = C.cards;
const bad = [];
const ok = (cond, msg) => { if (!cond) bad.push(msg); };

// 卡片本身
const ids = Object.keys(CARDS);
for (const id of ids) {
  const c = CARDS[id];
  ok(c.id === id, id + ': id 不一致');
  for (const k of ['artist', 'album']) ok(typeof c[k] === 'string' && c[k], id + ': 缺 ' + k);
  for (const k of ['c', 'o', 'h']) ok(Number.isInteger(c[k]) && c[k] >= 1 && c[k] <= 7, id + ': 星數 ' + k + '=' + c[k]);
  ok(c.coverUrl || c.localCover, id + ': 沒有封面');
  ok(typeof c.previewUrl === 'string' && /^https:\/\//.test(c.previewUrl), id + ': 沒有試聽');
  ok(['tw', 'jp', 'xx'].includes(c.region), id + ': region ' + c.region);
  ok(Array.isArray(c.tags) && Array.isArray(c.genres), id + ': tags/genres');
  ok(c.tier === null || ['hall', 'pearl', 'heresy'].includes(c.tier), id + ': tier ' + c.tier);
  if (c.tier) ok(Math.max(c.c, c.o, c.h) === 7, id + ': 王牌要有 7 星那軸');
  else ok(Math.max(c.c, c.o, c.h) <= 5, id + ': 一般卡最高 5 星');
}
const has = (id, where) => ok(CARDS[id], where + ': 找不到卡 ' + id);
const normalCard = (id, where) => { has(id, where); if (CARDS[id]) ok(!CARDS[id].tier, where + ': ' + id + ' 是王牌／頂點卡，不能當一般卡'); };

// 王牌與起始牌組
for (const t of ['hall', 'pearl', 'heresy']) {
  has(C.aces[t], 'aces.' + t);
  if (CARDS[C.aces[t]]) ok(CARDS[C.aces[t]].tier === t && CARDS[C.aces[t]][C.aceAxis[t]] === 7, 'aces.' + t + ': tier／7 星軸不對');
  ok(C.gifts[t].length === 4, 'gifts.' + t + ' 要 4 張');
  C.gifts[t].forEach(id => normalCard(id, 'gifts.' + t));
  ok(C.ears[t] && C.acePassives[t], t + ': 缺耳朵或被動');
}
ok(C.junk.length === 3, 'junk 要 3 張'); C.junk.forEach(id => normalCard(id, 'junk'));

// 敵人
const GL = ['true', 'feint', 'copy', 'grudge', 'eye', 'hidden'];
const RELIC_IDS = Object.keys(C.relics);
ok(RELIC_IDS.length === 12, '發燒配件要 12 件，現在 ' + RELIC_IDS.length);
const EIDS = ['man', 'copycat', 'already', 'needle', 'skip', 'broke', 'buyer', 'label', 'critic', 'boss'];
ok(JSON.stringify(Object.keys(C.enemies)) === JSON.stringify(EIDS), '敵人 id 要是 ' + EIDS.join(' '));
const dc = fs.readFileSync(path.join(ROOT, 'dip-character.js'), 'utf8');
const HEADS = [...dc.slice(dc.indexOf('const AVATAR_HEADS'), dc.indexOf('const AVATAR_COLORS')).matchAll(/\n\s*([a-z]+)\s*:\s*\{/g)].map(m => m[1]);
const PAL = [...(dc.match(/const PIX_PAL = \{([^}]*)\}/) || ['', ''])[1].matchAll(/([a-z]):'#/g)].map(m => m[1]);
const avatarOk = (a, where) => {
  ok(a && HEADS.includes(a.head), where + ': head ' + (a && a.head) + ' 不在 AVATAR_HEADS');
  for (const k of ['hair', 'shirt', 'pants', 'skin']) ok(a && PAL.includes(a[k]), where + ': ' + k + '=' + (a && a[k]) + ' 不在 PIX_PAL');
};
for (const id of EIDS) {
  const e = C.enemies[id]; const w = 'enemies.' + id;
  ok(e.id === id && e.name && e.blurb, w + ': id／name／blurb');
  ok(e.spr ? /^(e[0-7]|boss)$/.test(e.spr) : !!e.avatar, w + ': 要有 spr 或 avatar');
  if (e.avatar) avatarOk(e.avatar, w + '.avatar');
  ok(Number.isInteger(e.hp) && e.hp > 0 && Number.isInteger(e.qiRate) && Number.isInteger(e.ultAt), w + ': 數值');
  ok(['c', 'o', 'h', 'reflectable', 'unreflectable'].includes(e.ultAttr), w + ': ultAttr');
  ok(/^[coh]{3}$/.test(e.taste) && new Set(e.taste).size === 3, w + ': taste');
  ok(e.disc.length === 6 && e.disc.every(g => GL.includes(g)), w + ': disc');
  ok(e.disc.includes('hidden') ? GL.includes(e.hidden) && e.hidden !== 'hidden' : true, w + ': 有 ？ 格就要有 hidden 習慣');
  for (const ph of e.phases) {
    ok(Number.isInteger(ph.atHp) && ph.atHp < e.hp, w + ': phase atHp');
    if (ph.disc) { ok(ph.disc.length === 6 && ph.disc.every(g => GL.includes(g)), w + ': phase disc'); if (ph.disc.includes('hidden')) ok(e.hidden || ph.hidden, w + ': phase ？ 格沒有 hidden'); }
  }
  ok(e.deck.length >= 6 && e.deck.length <= 8, w + ': 牌庫要 6–8 張，現在 ' + e.deck.length);
  ok(new Set(e.deck).size === e.deck.length, w + ': 牌庫有重複');
  e.deck.forEach(cid => normalCard(cid, w + '.deck'));
  if (e.boss) ok(e.stakePool.length === 0 && e.stakeIsUnchosenAce, w + ': Boss 押的是你沒選的王牌');
  else { ok(e.stakePool.length >= 1, w + ': 沒有押盤'); e.stakePool.forEach(cid => normalCard(cid, w + '.stakePool')); }
  ok(e.relicOffer === null || RELIC_IDS.includes(e.relicOffer), w + ': relicOffer');
  e.requests.forEach(t => ok(C.requests[t], w + ': 點播標籤 ' + t));
  ok(e.voice && e.voice.freq > 0, w + ': voice');
  if (e.stake) ok(e.stake.every(Number.isInteger), w + ': stake');
}
ok(C.normals.length === 6 && C.normals.every(id => C.enemies[id] && !C.enemies[id].elite && !C.enemies[id].boss), 'normals');
ok(C.elites.every(id => C.enemies[id] && C.enemies[id].elite), 'elites');
ok(C.enemies[C.boss] && C.enemies[C.boss].boss && C.enemies[C.prologueEnemy], 'boss／prologueEnemy');
// 每位一般客人身上一件配件（§4.1）
for (const id of C.normals) ok(C.enemies[id].relicOffer, 'enemies.' + id + ': 一般客人身上要帶一件發燒配件');

// 卡池
for (const k of ['jazz', 'tw', 'noise']) { ok(C.pools.crate[k].length === 6, 'pools.crate.' + k + ' 要 6 張'); C.pools.crate[k].forEach(id => normalCard(id, 'pools.crate.' + k)); }
ok(C.pools.gold.length === 5, 'pools.gold 要 5 張'); C.pools.gold.forEach(id => { normalCard(id, 'pools.gold'); if (CARDS[id]) ok(CARDS[id].gold && CARDS[id].pitch, 'pools.gold: ' + id + ' 要有 gold 與推薦語'); });
for (const id of ids) if (CARDS[id].gold) ok(C.pools.gold.includes(id), id + ': gold 卡不在金邊池');
ok(C.pools.listen.length === 9, 'pools.listen 要 9 張'); C.pools.listen.forEach(id => normalCard(id, 'pools.listen'));
for (const r of C.pools.tier1Relics.concat(C.pools.eliteRelics)) ok(RELIC_IDS.includes(r), 'pools relic ' + r);
ok(new Set(C.pools.tier1Relics.concat(C.pools.eliteRelics)).size === 12, 'tier1Relics＋eliteRelics 要剛好涵蓋 12 件');
for (const r of Object.values(C.relics)) ok(r.name && r.icon && r.desc, 'relics.' + r.id);
// 推薦語必填（王牌、老闆四張、門口三張、金邊池）
for (const id of Object.values(C.aces).concat(...Object.values(C.gifts), C.junk, C.pools.gold)) ok(CARDS[id] && CARDS[id].pitch, id + ': 缺推薦語');

// 事件
ok(C.events.length === 7, '事件要 7 則');
for (const ev of C.events) {
  ok(ev.id && ev.title && ev.text && ev.options.length >= 2, 'events.' + ev.id);
  for (const o of ev.options) {
    ok(o.label && o.note && o.result && Array.isArray(o.effects), 'events.' + ev.id + ': 選項欄位');
    const needsPick = o.effects.some(f => f.giveAwayPicked || f.starUpPicked);
    ok(!needsPick || o.needsCard, 'events.' + ev.id + ': 要挑盤的選項要 needsCard');
    ok(!o.effects.some(f => f.giveAwayPicked) || o.minDeck >= 6, 'events.' + ev.id + ': 送盤要 minDeck ≥6');
    for (const f of o.effects) {
      const k = Object.keys(f);
      const valid = ('hp' in f && Number.isInteger(f.hp) && k.length === 1) || ('nextStartQi' in f && k.length === 1) || (f.giveAwayPicked === true && k.length === 1)
        || (RELIC_IDS.includes(f.gainRelic) && Number.isInteger(f.elseHp)) || (['crate', 'gold'].includes(f.gainFromPool)) || (['c', 'o', 'h'].includes(f.starUpPicked));
      ok(valid, 'events.' + ev.id + ': 效果格式不對 ' + JSON.stringify(f));
    }
  }
}
// 名字與造型
const enemyNames = Object.values(C.enemies).map(e => e.name);
ok(C.names.length >= 20 && C.names.every(n => !enemyNames.includes(n) && [...n].length <= 8), 'names：不能用敵人的名字、≤8 字');
ok(C.avatarsFallback.length === 6, 'avatarsFallback 要 6 組'); C.avatarsFallback.forEach((a, k) => avatarOk(a, 'avatarsFallback[' + k + ']'));
ok(C.map.times.length === 7, 'map.times 要 7 欄');
// 劇本的 ui 都有
const uis = new Set(Object.values(C.script).flat().map(b => b.ui).filter(Boolean));
for (const u of ['guess', 'acePick', 'retort', 'duel', 'stake', 'relic', 'map']) ok(uis.has(u), 'script 沒有 ui:' + u);
ok(C.retorts.length === 2, 'retorts 要 2 句');

const used = new Set([...Object.values(C.aces), ...Object.values(C.gifts).flat(), ...C.junk, ...Object.values(C.enemies).flatMap(e => e.deck.concat(e.stakePool)),
  ...Object.values(C.pools.crate).flat(), ...C.pools.gold, ...C.pools.listen]);
for (const id of ids) if (!used.has(id)) bad.push('cards.js 有沒用到的卡：' + id);

if (bad.length) { console.log('content 自檢沒過（' + bad.length + '）：'); bad.forEach(b => console.log('  ✗ ' + b)); process.exitCode = 1; }
else {
  const decks = Object.values(C.enemies).map(e => e.id + ' ' + e.deck.length).join('、');
  console.log('content 自檢通過：卡 ' + ids.length + ' 張（王牌 3、金邊 ' + C.pools.gold.length + '、本機封面 ' + ids.filter(i => CARDS[i].localCover).length + '）；敵人 10 位（牌庫 ' + decks + '）；配件 12；事件 7。');
}
