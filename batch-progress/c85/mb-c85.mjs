const UA = 'dip-vinyl-shop/1.0 ( kubinice06@gmail.com )';
const sleep = ms => new Promise(r => setTimeout(r, ms));
export async function mb(path) {
  const url = `https://musicbrainz.org/ws/2/${path}${path.includes('?') ? '&' : '?'}fmt=json`;
  for (let i = 0; i < 6; i++) {
    await sleep(1100);
    let res;
    try { res = await fetch(url, { headers: { 'User-Agent': UA } }); }
    catch (e) { await sleep(2000 * (i + 1)); continue; }
    if (res.status === 503 || res.status === 403 || res.status === 429) { await sleep(2500 * (i + 1)); continue; }
    if (!res.ok) return { __err: res.status, __url: url };
    return await res.json();
  }
  return { __err: 'retries', __url: url };
}
