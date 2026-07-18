(() => {
  const WORKER_URL = 'https://dip-vinyl-worker.kubinice06.workers.dev';
  const SPOTIFY_API = 'https://open.spotify.com/embed/iframe-api/v1';
  const YOUTUBE_API = 'https://www.youtube.com/iframe_api';
  const SPOTIFY_PLACEHOLDER = 'spotify:album:4aawyAB9vmqN3uQ7FjRGTy';
  const YOUTUBE_PLACEHOLDER = 'M7lc1UVf-VE';
  const linkCache = new Map();
  const listeners = new Set();
  let root = null, spotifyHost = null, youtubeHost = null, youtubeFrameHost = null;
  let hiddenMode = false, requestId = 0;
  let spotifyApi = null, spotifyApiPromise = null, spotifyController = null, controllerPromise = null;
  let youtubeApiPromise = null, youtubePlayer = null, youtubePlayerPromise = null, youtubeReady = false, youtubePrimed = false;
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
      .dip-player{width:100%;min-width:0}.dip-player-provider{width:100%;min-height:80px}
      .dip-player iframe{display:block;width:100%;border:0;border-radius:8px;background:#111}
      .dip-player-provider.is-inactive{position:fixed!important;width:1px!important;height:1px!important;min-height:1px!important;left:-9999px!important;top:0!important;opacity:0!important;overflow:hidden!important;pointer-events:none!important}
      .dip-player-hidden{position:fixed!important;width:1px!important;height:1px!important;left:-9999px!important;top:0!important;opacity:0!important;overflow:hidden!important;pointer-events:none!important;z-index:-1!important}
      .dip-player-hidden .dip-player-provider,.dip-player-hidden iframe{width:1px!important;height:1px!important;min-height:1px!important;border:0!important}
    `;
    document.head.appendChild(style);
  }

  function setProvider(provider) {
    spotifyHost?.classList.toggle('is-inactive', provider !== 'spotify');
    youtubeHost?.classList.toggle('is-inactive', provider !== 'youtube');
  }

  function mount(container, options = {}) {
    if (!container?.appendChild) return false;
    addStyle();
    hiddenMode = options.hidden === true;
    if (!root) {
      root = document.createElement('div');
      root.className = 'dip-player';
      spotifyHost = document.createElement('div');
      spotifyHost.className = 'dip-player-provider dip-player-spotify is-inactive';
      youtubeHost = document.createElement('div');
      youtubeHost.className = 'dip-player-provider dip-player-youtube is-inactive';
      youtubeFrameHost = document.createElement('div');
      youtubeHost.appendChild(youtubeFrameHost);
      root.append(spotifyHost, youtubeHost);
    }
    root.classList.toggle('dip-player-hidden', hiddenMode);
    if (root.parentNode !== container) container.appendChild(root);
    installAudioUnlock();
    void ensureController(SPOTIFY_PLACEHOLDER);
    void ensureYoutubePlayer();
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

  function loadYoutubeApi() {
    if (window.YT?.Player) return Promise.resolve(window.YT);
    if (youtubeApiPromise) return youtubeApiPromise;
    youtubeApiPromise = new Promise(resolve => {
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        resolve(window.YT || null);
        if (typeof previous === 'function') { try { previous(); } catch (_) {} }
      };
      let script = document.getElementById('youtubeIframeApi');
      if (!script) {
        script = document.createElement('script');
        script.id = 'youtubeIframeApi';
        script.src = YOUTUBE_API;
        script.async = true;
        script.onerror = () => resolve(null);
        document.head.appendChild(script);
      }
    });
    return withTimeout(youtubeApiPromise, 10000);
  }

  async function ensureController(uri = SPOTIFY_PLACEHOLDER) {
    if (spotifyController) return spotifyController;
    if (controllerPromise) return withTimeout(controllerPromise, 8000);
    const api = await loadSpotifyApi();
    if (!api?.createController || !spotifyHost) return null;
    controllerPromise = new Promise(resolve => {
      try {
        api.createController(spotifyHost, { uri, width: '100%', height: 152 }, controller => {
          spotifyController = controller;
          resolve(controller);
        });
      } catch (_) { resolve(null); }
    });
    return withTimeout(controllerPromise, 8000);
  }

  async function ensureYoutubePlayer() {
    if (youtubePlayer && youtubeReady) return youtubePlayer;
    if (youtubePlayerPromise) return withTimeout(youtubePlayerPromise, 8000);
    const api = await loadYoutubeApi();
    if (!api?.Player || !youtubeFrameHost) return null;
    youtubePlayerPromise = new Promise(resolve => {
      try {
        youtubePlayer = new api.Player(youtubeFrameHost, {
          width: '100%', height: '152', videoId: YOUTUBE_PLACEHOLDER,
          playerVars: { playsinline: 1, controls: 1, rel: 0, origin: location.origin },
          events: {
            onReady: () => { youtubeReady = true; resolve(youtubePlayer); },
            onError: () => {}
          }
        });
      } catch (_) { resolve(null); }
    });
    return withTimeout(youtubePlayerPromise, 8000);
  }

  function installAudioUnlock() {
    if (document.documentElement.dataset.dipAudioUnlock === '1') return;
    document.documentElement.dataset.dipAudioUnlock = '1';
    const prime = () => {
      if (youtubePrimed || !youtubeReady || !youtubePlayer) return;
      try {
        youtubePlayer.mute?.();
        youtubePlayer.playVideo?.();
        youtubePrimed = true;
        setTimeout(() => { try { youtubePlayer.pauseVideo?.(); } catch (_) {} }, 120);
        ['pointerdown', 'touchstart', 'click'].forEach(type => document.removeEventListener(type, prime, true));
      } catch (_) {}
    };
    ['pointerdown', 'touchstart', 'click'].forEach(type => document.addEventListener(type, prime, true));
  }

  function spotifyAlbumId(url) {
    try { return new URL(url).pathname.match(/\/album\/([a-zA-Z0-9]+)/)?.[1] || ''; } catch (_) { return ''; }
  }

  function youtubeTarget(url) {
    try {
      const parsed = new URL(url), list = parsed.searchParams.get('list'), video = parsed.searchParams.get('v') || parsed.pathname.match(/\/embed\/([a-zA-Z0-9_-]{11})/)?.[1] || '';
      if (list) return { list, video: '' };
      if (video) return { list: '', video };
    } catch (_) {}
    return null;
  }

  async function fetchLink(path, artist, album) {
    try {
      const response = await fetch(`${WORKER_URL}${path}?artist=${encodeURIComponent(artist)}&album=${encodeURIComponent(album)}`);
      return response.ok ? ((await response.json()).url || '') : '';
    } catch (_) { return ''; }
  }

  function cacheKey(artist, album) {
    return `${String(artist).trim().toLowerCase()}\u0000${String(album).trim().toLowerCase()}`;
  }

  function prefetch({ artist = '', album = '' } = {}) {
    artist = String(artist).trim();
    album = String(album).trim();
    if (!artist || !album) return Promise.resolve({ spotifyUrl: '', youtubeUrl: '' });
    const key = cacheKey(artist, album);
    if (!linkCache.has(key)) {
      linkCache.set(key, Promise.all([
        fetchLink('/spotify-album-link', artist, album),
        fetchLink('/yt-music-link', artist, album)
      ]).then(([spotifyUrl, youtubeUrl]) => ({ spotifyUrl, youtubeUrl })).catch(() => ({ spotifyUrl: '', youtubeUrl: '' })));
    }
    return linkCache.get(key);
  }

  function waitForSpotifyPlayback(controller, token) {
    return new Promise(resolve => {
      let settled = false;
      const finish = value => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        try { controller.removeListener?.('playback_started', started); } catch (_) {}
        try { controller.removeListener?.('playback_update', updated); } catch (_) {}
        resolve(value && token === requestId);
      };
      const started = () => finish(true);
      const updated = event => {
        const data = event?.data || {};
        if (data.isPaused === false && data.isBuffering !== true) finish(true);
      };
      const timer = setTimeout(() => finish(false), 1500);
      try {
        controller.addListener?.('playback_started', started);
        controller.addListener?.('playback_update', updated);
      } catch (_) { finish(false); }
    });
  }

  async function playSpotify(id, token) {
    const uri = `spotify:album:${id}`, controller = await ensureController(uri);
    if (!controller || token !== requestId) return false;
    try {
      setProvider('spotify');
      const started = waitForSpotifyPlayback(controller, token);
      if (typeof controller.loadEntity === 'function') controller.loadEntity(uri);
      else controller.loadUri?.(uri);
      controller.play?.();
      if (await started) return true;
      controller.pause?.();
      return false;
    } catch (_) { return false; }
  }

  function waitForYoutubePlayback(player, token) {
    return new Promise(resolve => {
      let settled = false;
      const finish = value => {
        if (settled) return;
        settled = true;
        clearInterval(poll);
        clearTimeout(timer);
        resolve(value && token === requestId);
      };
      const poll = setInterval(() => {
        try { if (player.getPlayerState?.() === 1) finish(true); } catch (_) {}
      }, 50);
      const timer = setTimeout(() => finish(false), 1800);
    });
  }

  async function playYoutube(url, token) {
    const target = youtubeTarget(url), player = await ensureYoutubePlayer();
    if (!target || !player || token !== requestId) return false;
    try {
      spotifyController?.pause?.();
      setProvider('youtube');
      const started = waitForYoutubePlayback(player, token);
      if (target.list) player.loadPlaylist?.({ listType: 'playlist', list: target.list, index: 0, startSeconds: 0 });
      else player.loadVideoById?.(target.video);
      player.unMute?.();
      player.playVideo?.();
      if (await started) return true;
      player.pauseVideo?.();
      return false;
    } catch (_) { return false; }
  }

  async function playAlbum({ artist = '', album = '' } = {}) {
    artist = String(artist).trim();
    album = String(album).trim();
    if (!artist || !album || !root) return false;
    const token = ++requestId;
    emit({ status: 'loading', provider: null, artist, album });
    try {
      const { spotifyUrl, youtubeUrl } = await prefetch({ artist, album });
      if (token !== requestId) return false;
      const spotifyId = spotifyAlbumId(spotifyUrl);
      if (spotifyId && await playSpotify(spotifyId, token)) {
        if (token !== requestId) return false;
        emit({ status: 'playing', provider: 'spotify', artist, album });
        return true;
      }
      if (token !== requestId) return false;
      if (youtubeUrl && await playYoutube(youtubeUrl, token)) {
        if (token !== requestId) return false;
        emit({ status: 'playing', provider: 'youtube', artist, album });
        return true;
      }
    } catch (_) {}
    if (token === requestId) {
      setProvider(null);
      emit({ status: 'error', provider: null, artist, album });
    }
    return false;
  }

  function stop() {
    requestId++;
    try { spotifyController?.pause?.(); } catch (_) {}
    try { youtubePlayer?.pauseVideo?.(); } catch (_) {}
    setProvider(null);
    emit({ status: 'stopped', provider: null });
  }

  function onStateChange(callback) {
    if (typeof callback !== 'function') return () => {};
    listeners.add(callback);
    try { callback({ ...state }); } catch (_) {}
    return () => listeners.delete(callback);
  }

  window.DipPlayer = { mount, prefetch, playAlbum, stop, onStateChange };
})();
