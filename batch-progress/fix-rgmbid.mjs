// 修 make-cards-generic.mjs 的 bug：它抽 mbNote 裡的「第一個」MBID 當 rgMbid，
// 但策展層若用 `release-group?artist=<MBID>` browse，寫下的第一個就是**藝人 MBID**。
// 這正是 c-52 裁定第 1 條記錄過的錯（mbNote 混了兩種實體），我卻在通用腳本裡重蹈覆轍。
//
// 正確做法：把 mbNote 裡**所有** MBID 都拿去回問 MB，取第一個確實是 release-group 的。
// 用法：node batch-progress/fix-rgmbid.mjs <批名>
import fs from 'node:fs';
const UA = { 'User-Agent': 'dip-vinyl-shop/1.0 (kubinice06@gmail.com)' };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const MBID = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/g;
const get = async u => {
  for (let i = 0; i < 4; i++) {
    const r = await fetch(u, { headers: UA, signal: AbortSignal.timeout(25000) }).catch(() => null);
    if (!r) { await sleep(1500); continue; }
    if (r.status === 503) { await sleep(2000 * (i + 1)); continue; }   // 裁定第 28 條
    if (r.status === 404) return { _404: 1 };
    if (!r.ok) return { _s: r.status };
    return await r.json().catch(() => ({ _bad: 1 }));
  }
  return { _err: 1 };
};

const batch = process.argv[2];
const P = `desc-tools/batches/cards/${batch}-cards.json`;
const cards = JSON.parse(fs.readFileSync(P, 'utf8'));
let fixed = 0, ok = 0, none = 0; const report = [];
for (const c of cards) {
  const ids = [...new Set((c.mbNote || '').match(MBID) || [])];
  if (!ids.length) { none++; continue; }
  // 只確認「是 release-group」不夠——mbNote 常同時記著**不可誤釘的對照組**
  // （c-58 的 Kashmere Stage Band 就在 mbNote 裡明寫「同藝人另有某某合輯，不可誤釘」）。
  // 第一版腳本沒比對標題，結果把正規盤換成了那張合輯。所以：先收集所有 release-group，
  // 標題與卡片盤名吻合者優先，其次才看順序；且合輯只在卡片本身就是合輯時才採用。
  const norm = x => String(x || '').toLowerCase().normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\u4e00-\u9fff]/g, '');
  let found = [];
  for (const id of ids) {
    const j = await get(`https://musicbrainz.org/ws/2/release-group/${id}?fmt=json`);
    await sleep(1100);
    if (j.title) found.push({ id, title: j.title, date: j['first-release-date'] || '',
                              type: j['primary-type'], sec: j['secondary-types'] || [] });
  }
  // 2026-09-04（c-88 早坂文雄《七人の侍 / 羅生門》）：**策展層明寫「刻意不釘」的對照組要排除。**
  // 那張卡的 mbNote 寫得清清楚楚——釘 c5461038《七人の侍 / 羅生門》（1978 Victor 的合成 LP，
  // primary=Album、secondary=[Compilation, Soundtrack]），並註明「945f4af7《七人の侍》刻意不釘」。
  // 這支腳本還是把它換掉了，因為計分 12 比 11 高一分，而那一分來自 **wantComp 的比法本身是錯的**：
  // `releaseType` 鏡射的是 **primary-type**，拿它去比 **secondary-types** 裡的 Compilation，
  // 等於用兩個不同層級的欄位互相檢查——原聲帶合輯天生就是 primary=Album ＋ secondary=[Compilation]，
  // 於是每一張都先被扣 6 分。這是第 99／126 條要防的那件事第三次發生
  // （前兩次：c-66 的《Guide》EP／Album 雙胞胎、c-69 的 Collie Ryan 三合一套裝），
  // 前兩次都是加防線去救，這次改成**直接聽策展層的話**：他已經指名不要哪一個了。
  // 「刻意不釘」的偵測。第一版只往**後**看（MBID 之後 200 字內有沒有「不釘」），
  // 2026-09-05 的 c-91 閃靈《武德》證明那不夠：策展層寫的是
  //   「**刻意不釘**：ea81389b…《暮沉武德殿》（2013 單曲）與 c446922d…《武德殿不插電演唱會實況》（2015 Live）」
  // ——標記在**前面**，是一個標題帶兩個 MBID 的清單。兩個 MBID 往後看都看不到「不釘」，
  // 於是兩筆都沒被排除，其中 Live 那筆還把正確的釘位換掉了。
  // 現在兩個方向都看：一旦出現「不釘」，其後的 MBID 全部進 noPin，直到出現正面的「釘」宣告
  // 才解除；原本的往後看保留當第二道網。
  const noPin = new Set();
  {
    const note = String(c.mbNote || '');
    const marks = [];
    for (const m of note.matchAll(MBID)) marks.push({ kind: 'id', at: m.index, id: m[0], len: m[0].length });
    for (const m of note.matchAll(/不釘/g)) marks.push({ kind: 'off', at: m.index });
    // 「釘 release-group xxx」「釘住」這種正面宣告會關掉不釘區；「刻意不釘」不算正面
    for (const m of note.matchAll(/(?<!不)釘(?=\s*release-group|\s*\*{0,2}[0-9a-f]{8}|住)/g)) marks.push({ kind: 'on', at: m.index });
    marks.sort((a, b) => a.at - b.at);
    let off = false;
    for (const mk of marks) {
      if (mk.kind === 'off') { off = true; continue; }
      if (mk.kind === 'on') { off = false; continue; }
      const tail = note.slice(mk.at + mk.len, mk.at + mk.len + 200).split(MBID)[0];
      if (off || /不釘/.test(tail)) noPin.add(mk.id);
    }
  }
  if (noPin.size) found = found.filter(x => !noPin.has(x.id));
  const wantComp = c.releaseType === 'Compilation';
  const score = x => {
    const a = norm(c.album), b = norm(x.title);
    let s = 0;
    if (a && b === a) s += 10; else if (a && (b.includes(a) || a.includes(b))) s += 4;
    const isComp = (x.sec || []).includes('Compilation');
    s += (isComp === wantComp) ? 3 : -6;
    // primary-type 要進計分（2026-09-03，c-66 的 S.D. Burman《Guide》發現）。
    // MB 上同名雙胞胎很常見：1965 的 EP 與 1966 的 Album 都叫《Guide》，
    // 策展層在 mbNote 明寫「本卡釘 Album 那個、EP 那個刻意不釘」，
    // 這支腳本卻因為 EP 的年份剛好等於卡片年份（+2）而把它換掉——
    // 標題同分、合輯同分，年份就成了決勝項，等於用年份推翻了 §1 的型別要求。
    // §1 只收 primary-type=Album；EP 只在 §5.5 的 asia-mini-album 白名單卡才允許。
    const epOk = c.genreException === 'asia-mini-album' || c.releaseTypeException === 'asia-mini-album';
    if (x.type === 'Album') s += 5;
    else if (x.type === 'EP' || x.type === 'Single') s += epOk ? 5 : -12;
    if (x.date && c.year && String(x.date).slice(0, 4) === String(c.year)) s += 2;
    return s;
  };
  found.sort((a, b) => score(b) - score(a));
  // 2026-09-03（c-69 Collie Ryan《The Giving Tree》）：既有的 rgMbid 明明在 mbNote 裡、
  // 只是這一輪回問 MB 時沒拿到（503／逾時），found 裡就只剩對照組那張 2009 年的三合一套裝，
  // 標題完全對不上也照樣 +3 +5 = 8 分勝出，把正確的釘位換掉了。兩道防線：
  // (1) 既有 rgMbid 在 mbNote 裡卻沒查到 → 這輪不動它（第 28 條：查詢失敗不是查無）；
  // (2) 要換掉既有值，候選的標題至少要跟盤名沾上邊（標題分 > 0），型別與年份分不能單獨決勝。
  const titleScore = x => { const a = norm(c.album), b = norm(x.title); return (a && b === a) ? 10 : (a && (b.includes(a) || a.includes(b))) ? 4 : 0; };
  if (c.rgMbid && ids.includes(c.rgMbid) && !found.some(x => x.id === c.rgMbid)) {
    report.push(`✗ ${c.artist}《${c.album}》既有 rgMbid ${c.rgMbid.slice(0, 8)}… 這輪回問失敗，保留不動`);
    continue;
  }
  let rg = found.length && score(found[0]) > 0 ? found[0] : null;
  // (3) 2026-09-05：不得把「正規盤」換成「Live／Compilation 版」。
  // 閃靈《武德》的卡片盤名被策展層依正名裁定去掉了台羅副標，正確的 RG 標題是「Bú-Tik」——
  // 與「武德」零重疊、標題分 0；而 2015 年的《武德殿不插電演唱會實況》**包含**「武德」、
  // 標題分 4，於是 12 分贏過 10 分把正確釘位換掉。**盤名被縮短過的卡，子字串比對是反的**：
  // 越短的卡片盤名越容易被更長的別碟包住。型別是比標題更硬的訊號，這裡拿它當否決權。
  const secOf = x => new Set(x.sec || []);
  if (rg && c.rgMbid && rg.id !== c.rgMbid) {
    const cur = found.find(x => x.id === c.rgMbid);
    const gainedLive = secOf(rg).has('Live') && !(cur && secOf(cur).has('Live'));
    const gainedComp = secOf(rg).has('Compilation') && !(cur && secOf(cur).has('Compilation'));
    if (gainedLive || gainedComp) {
      report.push(`✗ ${c.artist}《${c.album}》候選 ${rg.id.slice(0, 8)}…「${rg.title}」是 ${gainedLive ? 'Live' : 'Compilation'} 版，不替換既有的正規盤`);
      rg = null;
    }
  }
  if (rg && c.rgMbid && rg.id !== c.rgMbid && titleScore(rg) === 0) {
    report.push(`✗ ${c.artist}《${c.album}》候選 ${rg.id.slice(0, 8)}…「${rg.title}」標題對不上盤名，不替換既有值`);
    rg = null;
  }
  if (found.length && !rg) report.push(`⚠ ${c.artist}《${c.album}》mbNote 的 release-group 標題都對不上，未更動`);
  // **絕不因為這次查不到就清空既有的 rgMbid。** 查詢失敗（503、逾時、暫時性錯誤）
  // 與「這個 MBID 不是 release-group」在程式裡長得一樣——裁定第 28 條講的就是這件事，
  // 而第一版的這支腳本自己又犯了一次：c-55 的 Livaneli 第一輪修好、第二輪因 503
  // 查不到就被清成空值。既有值只在「查到了更好的」時才換掉。
  if (!rg) {
    if (!found.length) none++;
    report.push(`✗ ${c.artist}《${c.album}》這次沒查到可用的 release-group` +
                (c.rgMbid ? `（保留既有值 ${c.rgMbid.slice(0, 8)}…）` : '（本來就是空的）'));
    continue;
  }
  if (c.rgMbid === rg.id) { ok++; continue; }
  report.push(`修 ${c.artist}《${c.album}》: ${(c.rgMbid || '空').slice(0, 8)}… → ${rg.id.slice(0, 8)}…「${rg.title}」`);
  c.rgMbid = rg.id; c.mbTitle = rg.title; c.mbFirstRelease = rg.date; c.identitySource = 'pinned';
  fixed++;
}
fs.writeFileSync(P, JSON.stringify(cards, null, 1));
console.log(`${batch}: 原本就對 ${ok}｜**修正 ${fixed}**｜無 RG ${none}`);
for (const r of report.slice(0, 40)) console.log('  ' + r);
