// dip 選歌 PWA service worker
// 原則：線上內容永遠優先取最新（網站更新 → App 同步），
// service worker 只負責「離線時的後備」與靜態資源快取。
// Firestore / Firebase SDK / 字型等跨網域請求一律不攔截，直接走網路。

const VERSION = 'v1';
const CACHE = `dip-song-${VERSION}`;

// 只預快取「外殼」與離線後備所需的同源靜態檔。
const PRECACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.png',
  '/logo-tc.png',
  '/questions.json',
  '/reels.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-maskable-512.png',
  '/icons/apple-touch-icon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      // 個別加入，避免單一檔 404 就讓整包安裝失敗
      Promise.allSettled(PRECACHE.map((url) => cache.add(url)))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // 只處理 GET
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // 跨網域（Firestore、Firebase SDK、Google Fonts 等）不攔截，交給瀏覽器，
  // 確保即時資料永遠是最新的。
  if (url.origin !== self.location.origin) return;

  // HTML 導覽：網路優先，失敗才回退快取（離線可用）。
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put('/index.html', copy));
          return res;
        })
        .catch(() =>
          caches.match(req, { ignoreSearch: true })
            .then((hit) => hit || caches.match('/index.html') || caches.match('/'))
        )
    );
    return;
  }

  // 其他同源靜態資源：stale-while-revalidate（先回快取、背景更新）。
  event.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
