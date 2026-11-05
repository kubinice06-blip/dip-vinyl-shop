const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const fs = require('fs'), path = require('path'), http = require('http');
const ROOT = '/home/user/dip-vinyl-shop', S = process.argv[2];
const apex = JSON.parse(fs.readFileSync(path.join(S, 'apex_pool.json'), 'utf8')).map(d => {
  const o = { ...d }; delete o.createTime;
  for (const k of ['addedAt', 'generatedAt', 'demotedAt']) if (o[k]) o[k] = Number(o[k]);
  if (o.demoted !== undefined) o.demoted = o.demoted === true || o.demoted === 'true' || o.demoted === true;
  if (o.noCover !== undefined) o.noCover = o.noCover === true || o.noCover === 'true';
  return o;
});
const srv = http.createServer((q, r) => {
  const p = path.join(ROOT, decodeURIComponent(q.url.split('?')[0]));
  fs.readFile(p, (e, b) => { if (e) { r.writeHead(404); r.end(); return; } r.writeHead(200, { 'content-type': p.endsWith('.html') ? 'text/html; charset=utf-8' : p.endsWith('.json') ? 'application/json' : 'text/plain' }); r.end(b); });
}).listen(8765);
const stubApp = `export const initializeApp = () => ({});`;
const stubAuth = `export const getAuth = () => ({}); export class GoogleAuthProvider {}; export const signInWithPopup = async () => {}; export const signOut = async () => {};
export const onAuthStateChanged = (a, cb) => setTimeout(() => cb({ email: 'kubinice06@gmail.com', displayName: 'test' }), 0);`;
const stubFs = `const APEX = ${JSON.stringify(apex)};
export const getFirestore = () => ({});
export const collection = (db, name) => ({ name });
export const doc = (db, c, id) => ({ c, id });
export const where = (f, op, v) => ({ f, op, v });
export const limit = n => ({ limit: n });
export const query = (c, ...w) => ({ ...c, w });
export const deleteField = () => ({ __del: 1 });
window.__writes = [];
const mk = (id, data) => ({ id, data: () => data, exists: () => !!data });
export const getDocs = async (q) => ({ docs: q.name === 'apex_pool' ? APEX.map(d => { const { id, ...x } = d; return mk(id, x); }) : [], size: 0, empty: true, forEach() {} });
export const getDoc = async (r) => {
  if (r.c === 'card_catalog') { const res = await fetch('/__fs/card_catalog/' + encodeURIComponent(r.id)); const j = await res.json(); return mk(r.id, j.coverUrl ? j : null); }
  return mk(r.id, null);
};
export const setDoc = async (r, d) => { window.__writes.push(['set', r.c, r.id, d]); };
export const updateDoc = async (r, d) => { window.__writes.push(['upd', r.c, r.id, d]); };
export const deleteDoc = async () => {}; export const addDoc = async () => ({ id: 'x' });
export const writeBatch = () => ({ set(r, d) { window.__writes.push(['bset', r.c, r.id, d]); }, commit: async () => {} });`;
const curl = (url, bin) => execFileSync('curl', ['-sS', '-m', '20', url], { maxBuffer: 50e6, encoding: bin ? null : 'utf8' });
(async () => {
  const b = await chromium.launch();
  const pg = await b.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2 });
  pg.on('pageerror', e => console.log('PAGEERROR', e.message));
  pg.on('dialog', d => d.accept());
  await pg.route('https://www.gstatic.com/firebasejs/**', r => {
    const u = r.request().url();
    r.fulfill({ contentType: 'application/javascript', body: u.includes('firestore') ? stubFs : u.includes('auth') ? stubAuth : stubApp });
  });
  await pg.route('**/__fs/card_catalog/**', r => {
    const id = decodeURIComponent(r.request().url().split('/__fs/card_catalog/')[1]);
    let j = {}; try { const x = JSON.parse(curl(`https://firestore.googleapis.com/v1/projects/price-manager-e8846/databases/(default)/documents/card_catalog/${encodeURIComponent(id)}?key=AIzaSyBpR5XKKHwT_eQoShtBPtFNRXz4ymzPWQg`)); j = { coverUrl: x.fields?.coverUrl?.stringValue }; } catch (e) {}
    r.fulfill({ contentType: 'application/json', body: JSON.stringify(j) });
  });
  await pg.route(/dip-vinyl-worker/, r => {
    const u = r.request().url();
    if (/spotify-search|bandcamp-search/.test(u) && !global.allowCovers) return r.fulfill({ contentType: 'application/json', body: '{}' });
    let body = '{}'; try { body = curl(u); } catch (e) {}
    r.fulfill({ contentType: 'application/json', body, headers: { 'access-control-allow-origin': '*' } });
  });
  await pg.route(/mzstatic|coverartarchive|scdn|bcbits|discogs/, r => { try { r.fulfill({ body: curl(r.request().url(), true), contentType: 'image/jpeg' }); } catch (e) { r.abort(); } });
  await pg.route(/fonts\.(googleapis|gstatic)/, r => r.abort());
  await pg.goto('http://localhost:8765/admin.html');
  await pg.waitForTimeout(1500);
  await pg.evaluate(() => { document.querySelector('.tab-btn[data-tab="cards"]')?.click(); });
  await pg.waitForTimeout(300);
  await pg.evaluate(() => document.querySelector('[data-sub="sub-apex"]').click());
  await pg.waitForSelector('#apexList.cardgrid', { timeout: 20000 });
  const res = {};
  for (const t of ['hall', 'heresy', 'pearl']) {
    await pg.click(`[data-apex-tier="${t}"]`);
    res[t] = { cells: await pg.locator('#apexList .cardgrid-cell').count(), stat: await pg.textContent('#apexStat') };
  }
  console.log(JSON.stringify(res, null, 1));
  console.log('orphan rows', await pg.locator('#apexOrphans tr').count());
  await pg.click('[data-apex-tier="hall"]');
  const tang = await pg.locator('#apexList .cardgrid-cell', { hasText: '唐朝' }).allTextContents();
  console.log('tang cells', tang.map(s => s.replace(/\s+/g, ' ').trim()));
  // 按鈕不開彈窗
  await pg.locator('#apexList [data-apex-open="唐朝樂隊|唐朝"] .apex-edit').click();
  console.log('after edit-click open?', await pg.evaluate(() => document.getElementById('apexCdOv').classList.contains('open')), await pg.textContent('#apexEditMsg'));
  await pg.locator('#apexList [data-apex-open="唐朝樂隊|唐朝"] .cardgrid-album').click();
  await pg.waitForFunction(() => !/載入介紹/.test(document.getElementById('apexCdDesc')?.textContent || ''), null, { timeout: 30000 });
  await pg.waitForTimeout(2500);
  console.log('open?', await pg.evaluate(() => document.getElementById('apexCdOv').classList.contains('open')));
  console.log('stars', (await pg.locator('#apexCd .cd-stars').innerText()).replace(/\s+/g, ' '));
  console.log('desc', (await pg.textContent('#apexCdDesc')).slice(0, 60));
  console.log('img', await pg.locator('#apexCd .cd-cover img').count());
  await pg.screenshot({ path: path.join(S, 'apex-popup.png') });
  await pg.keyboard.press('Escape');
  console.log('closed?', !(await pg.evaluate(() => document.getElementById('apexCdOv').classList.contains('open'))));
  // heresy 一張看 7 顆在硬蕊度
  await pg.click('[data-apex-tier="heresy"]');
  await pg.locator('#apexList .cardgrid-cell .cardgrid-album').first().click();
  console.log('heresy stars', (await pg.locator('#apexCd .cd-stars').innerText()).replace(/\s+/g, ' '));
  await pg.keyboard.press('Escape');
  await pg.click('[data-apex-tier="hall"]');
  await pg.waitForTimeout(300);
  await pg.screenshot({ path: path.join(S, 'apex-grid.png') });
  console.log('writes so far', JSON.stringify(await pg.evaluate(() => window.__writes.length)));
  // 同步按鈕：統計 ops
  await pg.evaluate(() => { window.__writes = []; });
  await pg.click('#apexSyncBtn');
  await pg.waitForFunction(() => /已同步|一致|失敗/.test(document.getElementById('apexImportMsg').textContent), null, { timeout: 20000 });
  const w = await pg.evaluate(() => window.__writes);
  const cnt = {}; w.forEach(x => { const k = x[1] + (x[3].demoted === true ? ':demote' : ''); cnt[k] = (cnt[k] || 0) + 1; });
  console.log('sync writes', JSON.stringify(cnt), 'tang old demoted?', w.some(x => x[2] === '唐朝乐队|唐朝' && x[3].demoted === true));
  await b.close(); srv.close();
})();
