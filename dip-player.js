(() => {
  const WORKER_URL = 'https://dip-vinyl-worker.kubinice06.workers.dev';
  const SPOTIFY_API = 'https://open.spotify.com/embed/iframe-api/v1';
  let root = null, spotifyHost = null, youtubeHost = null;
  let spotifyApi = null, spotifyApiPromise = null, spotifyController = null, controllerPromise = null;
  let requestId = 0;
  const listeners = new Set();
  let state = { status: 'idle', provider: null, artist: '', album: '' };

  function emit(next) {
    state = { ...state, ...next };
    listeners.forEach(listener => { try { listener({ ...state }); } catch (_) {} });
  }

  function addStyle() {
    if (document.getElementById('dipPlayerStyle')) return;
    const style = document.createElement('style');
    style.id = 'dipPlayerStyle';
    style.textContent = `
      .dip-player{width:100%;min-width:0}.dip-player-provider{width:100%;min-height:80px}.dip-player-provider[hidden]{display:none}
      .dip-player iframe{display:block;width:100%;border:0;border-radius:8px;background:#111}
    `;
    document.head.appendChild(style);
  }

  function mount(container) {
    if (!container?.appendChild) return false;
    addStyle();
    if (!root) {
      root = document.createElement('div');
      root.className = 'dip-player';
      spotifyHost = document.createElement('div');
      spotifyHost.className = 'dip-player-provider dip-player-spotify';
      youtubeHost = document.createElement('div');
      youtubeHost.className = 'dip-player-provider dip-player-youtube';
      spotifyHost.hidden = true;
      youtubeHost.hidden = true;
      root.append(spotifyHost, youtubeHost);
    }
    if (root.parentNode !== container) container.appendChild(root);
    return root;
  }

  function withTimeout(promise, ms) {
    return new Promise(resolve => {
      const timer = setTimeout(() => resolve(null), ms);
      promise.then(value => { clearTimeout(timer); resolve(value); }, () => { clearTimeout(timer); resolve(null); });
    });
  }

  function loadSpotifyApi() {
    if (spotifyApi) return Promise.resolve(spotifyApi);
    if (spotifyApiPromise) return spotifyApiPromise;
    spotifyApiPromise = new Promise(resolve => {
      const previous = window.onSpotifyIframeApiReady;
      window.onSpotifyIframeApiReady = api => {
        spotifyApi = api;
        resolve(api);
        if (typeof previous === 'function') { try { previous(api); } catch (_) {} }
      };
      let script = document.getElementById('spotifyIframeApi');
      if (!script) {
        script = document.createElement('script');
        script.id = 'spotifyIframeApi';
        script.src = SPOTIFY_API;
        script.async = true;
        script.onerror = () => resolve(null);
        document.head.appendChild(script);
      }
    });
    return withTimeout(spotifyApiPromise, 10000);
  }

  function spotifyAlbumId(url) {
    try { return new URL(url).pathname.match(/\/album\/([a-zA-Z0-9]+)/)?.[1] || ''; } catch (_) { return ''; }
  }

  function youtubeEmbedUrl(url) {
    try {
      const parsed = new URL(url), list = parsed.searchParams.get('list'), video = parsed.searchParams.get('v');
      if (list) return `https://www.youtube.com/embed/videoseries?list=${encodeURIComponent(list)}&autoplay=1`;
      if (video) return `https://www.youtube.com/embed/${encodeURIComponent(video)}?autoplay=1`;
    } catch (_) {}
    return '';
  }

  async function ensureController(uri) {
    if (spotifyController) return spotifyController;
    if (controllerPromise) return withTimeout(controllerPromise, 8000);
    const api = await loadSpotifyApi();
    if (!api?.createController || !spotifyHost) return null;
    spotifyHost.hidden = false;
    controllerPromise = new Promise(resolve => {
      try { api.createController(spotifyHost, { uri, width: '100%', height: 152 }, controller => { spotifyController = controller; resolve(controller); }); }
      catch (_) { resolve(null); }
    });
    return withTimeout(controllerPromise, 8000);
  }

  async function fetchLink(path, artist, album) {
    try {
      const response = await fetch(`${WORKER_URL}${path}?artist=${encodeURIComponent(artist)}&album=${encodeURIComponent(album)}`);
      return response.ok ? ((await response.json()).url || '') : '';
    } catch (_) { return ''; }
  }

  async function playSpotify(id, token) {
    const uri = `spotify:album:${id}`, controller = await ensureController(uri);
    if (!controller || token !== requestId) return false;
    try {
      youtubeHost.replaceChildren();
      youtubeHost.hidden = true;
      spotifyHost.hidden = false;
      if (spotifyController === controller && controller.loadUri) controller.loadUri(uri);
      controller.play?.();
      return true;
    } catch (_) { return false; }
  }

  function playYoutube(url, token) {
    const src = youtubeEmbedUrl(url);
    if (!src || token !== requestId || !youtubeHost) return false;
    try {
      spotifyController?.pause?.();
      spotifyHost.hidden = true;
      youtubeHost.hidden = false;
      const iframe = document.createElement('iframe');
      iframe.src = src;
      iframe.height = '152';
      iframe.title = 'YouTube album player';
      iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.allowFullscreen = true;
      youtubeHost.replaceChildren(iframe);
      return true;
    } catch (_) { return false; }
  }

  async function playAlbum({ artist = '', album = '' } = {}) {
    artist = String(artist).trim();
    album = String(album).trim();
    if (!artist || !album || !root) return false;
    const token = ++requestId;
    emit({ status: 'loading', provider: null, artist, album });
    try {
      const spotifyUrl = await fetchLink('/spotify-album-link', artist, album);
      const spotifyId = spotifyAlbumId(spotifyUrl);
      if (spotifyId && await playSpotify(spotifyId, token)) {
        if (token !== requestId) return false;
        emit({ status: 'playing', provider: 'spotify', artist, album });
        return true;
      }
      if (token !== requestId) return false;
      const youtubeUrl = await fetchLink('/yt-music-link', artist, album);
      if (playYoutube(youtubeUrl, token)) {
        emit({ status: 'playing', provider: 'youtube', artist, album });
        return true;
      }
    } catch (_) {}
    if (token === requestId) emit({ status: 'error', provider: null, artist, album });
    return false;
  }

  function stop() {
    requestId++;
    try { spotifyController?.pause?.(); } catch (_) {}
    try { youtubeHost?.replaceChildren(); } catch (_) {}
    if (youtubeHost) youtubeHost.hidden = true;
    emit({ status: 'stopped', provider: null });
  }

  function onStateChange(callback) {
    if (typeof callback !== 'function') return () => {};
    listeners.add(callback);
    try { callback({ ...state }); } catch (_) {}
    return () => listeners.delete(callback);
  }

  window.DipPlayer = { mount, playAlbum, stop, onStateChange };
})();
