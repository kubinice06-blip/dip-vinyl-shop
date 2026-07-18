(() => {
  const WORKER_URL = 'https://dip-vinyl-worker.kubinice06.workers.dev';
  const SPOTIFY_API = 'https://open.spotify.com/embed/iframe-api/v1';
  const YOUTUBE_API = 'https://www.youtube.com/iframe_api';
  const SPOTIFY_PLACEHOLDER = 'spotify:album:4aawyAB9vmqN3uQ7FjRGTy';
  const YOUTUBE_PLACEHOLDER = 'M7lc1UVf-VE';
  const IOS_DEVICE = /iPad|iPhone|iPod/.test(navigator.userAgent || '') ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const linkCache = new Map();
  const listeners = new Set();
  let root = null, spotifyHost = null, youtubeHost = null, youtubeFrameHost = null;
  let hiddenMode = false, requestId = 0;
  let spotifyApi = null, spotifyApiPromise = null, spotifyController = null, controllerPromise = null;
  let youtubeApiPromise = null, youtubePlayer = null, youtubePlayerPromise = null, youtubeReady = false, youtubePrimed = false, youtubeGeneration = 0;
  let previewAudio = null, previewTimer = null, lastPreviewTrackId = '', previewPrimed = false, silentPreviewUrl = '';
  let currentPreviewData = null, lastFailCode = '';
  // 店主要求：整體音量降 70%（播 30%），開頭 1.5 秒淡入、結尾 1.5 秒淡出。
  // iOS 忽略 audio.volume，iTunes 路徑須經 Web Audio GainNode 才能真正控音量。
  const BASE_GAIN = 0.3, YT_BASE_VOLUME = 30, FADE_MS = 1500;
  let audioCtx = null, previewGain = null, previewVolumeTimer = null, previewFadeTimer = null, youtubeFadeTimer = null;
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
      /* YouTube IFrame API requires a real player surface. Keep it 200px inside the
         clipped 1px root so hidden playback never participates in page layout. */
      .dip-player-hidden .dip-player-youtube,.dip-player-hidden .dip-player-youtube iframe{width:200px!important;height:200px!important;min-height:200px!important}
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

  function primeYoutubeFromGesture() {
    if (youtubePrimed || !youtubeReady || !youtubePlayer) return false;
    try {
      // iOS 只把手勢處理器直接觸發的有聲播放視為授權；mute→play 不會解鎖後續有聲切歌。
      // 同一個常駐 iframe 以 1% 音量短播後暫停，回合結算時只需換這個 player 的內容。
      youtubePlayer.unMute?.();
      youtubePlayer.setVolume?.(1);
      youtubePlayer.playVideo?.();
      youtubePrimed = true;
      const generation = youtubeGeneration;
      setTimeout(() => {
        try {
          // 若手勢後已開始載入真正要播的專輯，generation 會遞增；此時不能再讓
          // 解鎖用的延遲動作把 1.5 秒淡入直接跳回 30%。
          if (generation === youtubeGeneration) {
            youtubePlayer.pauseVideo?.();
            youtubePlayer.setVolume?.(YT_BASE_VOLUME);
          }
        } catch (_) {}
      }, 160);
      return true;
    } catch (_) { return false; }
  }

  function silentPreviewSource() {
    if (silentPreviewUrl) return silentPreviewUrl;
    const samples = 2000, bytes = new Uint8Array(44 + samples), view = new DataView(bytes.buffer);
    const write = (offset, value) => { for (let i = 0; i < value.length; i++) bytes[offset + i] = value.charCodeAt(i); };
    write(0, 'RIFF'); view.setUint32(4, 36 + samples, true); write(8, 'WAVE'); write(12, 'fmt ');
    view.setUint32(16, 16, true); view.setUint16(20, 1, true); view.setUint16(22, 1, true);
    view.setUint32(24, 8000, true); view.setUint32(28, 8000, true); view.setUint16(32, 1, true); view.setUint16(34, 8, true);
    write(36, 'data'); view.setUint32(40, samples, true); bytes.fill(128, 44);
    silentPreviewUrl = URL.createObjectURL(new Blob([bytes], { type:'audio/wav' }));
    return silentPreviewUrl;
  }

  // 建立 audio 元件 → GainNode → 喇叭 的固定路徑。必須在手勢內建立／喚醒
  // AudioContext；Apple 試聽 CDN 帶 ACAO:*，crossOrigin 模式下不會被靜音。
  function ensurePreviewGraph() {
    if (!previewAudio) return;
    if (!audioCtx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      try {
        audioCtx = new Ctx();
        const source = audioCtx.createMediaElementSource(previewAudio);
        previewGain = audioCtx.createGain();
        previewGain.gain.value = BASE_GAIN;
        source.connect(previewGain);
        previewGain.connect(audioCtx.destination);
      } catch (_) { audioCtx = null; previewGain = null; }
    }
    if (audioCtx && audioCtx.state !== 'running') { try { audioCtx.resume?.()?.catch?.(() => {}); } catch (_) {} }
  }

  function fadePreview(toValue, ms) {
    clearInterval(previewVolumeTimer);
    if (previewGain && audioCtx) {
      try {
        const now = audioCtx.currentTime;
        previewGain.gain.cancelScheduledValues(now);
        previewGain.gain.setValueAtTime(previewGain.gain.value, now);
        previewGain.gain.linearRampToValueAtTime(toValue, now + ms / 1000);
        return;
      } catch (_) {}
    }
    // 無 Web Audio 的後備：漸變 element volume（桌面有效；iOS 會忽略，只是不淡）。
    if (!previewAudio) return;
    const from = previewAudio.volume ?? 1, steps = Math.max(1, Math.round(ms / 60));
    let step = 0;
    previewVolumeTimer = setInterval(() => {
      step++;
      try { previewAudio.volume = Math.min(1, Math.max(0, from + (toValue - from) * (step / steps))); } catch (_) {}
      if (step >= steps) clearInterval(previewVolumeTimer);
    }, 60);
  }

  function setPreviewLevel(value) {
    clearInterval(previewVolumeTimer);
    if (previewGain && audioCtx) {
      try {
        previewGain.gain.cancelScheduledValues(audioCtx.currentTime);
        previewGain.gain.setValueAtTime(value, audioCtx.currentTime);
        return;
      } catch (_) {}
    }
    if (previewAudio) { try { previewAudio.volume = Math.min(1, Math.max(0, value)); } catch (_) {} }
  }

  function fadeYoutube(fromValue, toValue, ms) {
    clearInterval(youtubeFadeTimer);
    if (!youtubePlayer?.setVolume) return;
    const generation = youtubeGeneration, steps = Math.max(1, Math.round(ms / 60));
    let step = 0;
    try { youtubePlayer.setVolume(Math.round(fromValue)); } catch (_) {}
    youtubeFadeTimer = setInterval(() => {
      if (generation !== youtubeGeneration) { clearInterval(youtubeFadeTimer); return; }
      step++;
      try { youtubePlayer.setVolume(Math.round(fromValue + (toValue - fromValue) * (step / steps))); } catch (_) {}
      if (step >= steps) clearInterval(youtubeFadeTimer);
    }, 60);
  }

  function primePreviewFromGesture() {
    if (!root) return false;
    try {
      const audio = ensurePreviewAudio();
      ensurePreviewGraph();
      if (!audio.paused && !audio.ended) return true;
      audio.loop = true;
      audio.src = silentPreviewSource();
      audio.currentTime = 0;
      const attempt = audio.play();
      previewPrimed = true;
      if (attempt?.catch) attempt.catch(() => { previewPrimed = false; });
      return true;
    } catch (_) { previewPrimed = false; return false; }
  }

  function installAudioUnlock() {
    if (document.documentElement.dataset.dipAudioUnlock === '1') return;
    document.documentElement.dataset.dipAudioUnlock = '1';
    const prime = () => {
      if (primeYoutubeFromGesture()) {
        ['pointerdown', 'touchstart', 'click'].forEach(type => document.removeEventListener(type, prime, true));
      }
    };
    ['pointerdown', 'touchstart', 'click'].forEach(type => document.addEventListener(type, prime, true));
  }

  function unlock() {
    const previewReady = primePreviewFromGesture();
    const youtubeReadyNow = primeYoutubeFromGesture();
    return previewReady || youtubeReadyNow;
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

  function normalizePreviewText(value) {
    return String(value || '').normalize('NFKD').toLowerCase()
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9㐀-鿿぀-ヿ가-힯]+/g, '');
  }

  function previewArtistMatches(candidate, artist) {
    const candidateKey = normalizePreviewText(candidate), artistKey = normalizePreviewText(artist);
    return candidateKey.length > 2 && artistKey.length > 2 &&
      (candidateKey.includes(artistKey) || artistKey.includes(candidateKey));
  }

  function previewAlbumMatches(candidate, album) {
    const editions = /\b(?:remaster(?:ed)?(?:\s+version)?|deluxe(?:\s+edition)?|expanded(?:\s+edition)?|anniversary(?:\s+edition)?|mono|stereo|reissue|edition)\b/gi;
    const candidateKey = normalizePreviewText(candidate), albumKey = normalizePreviewText(album);
    const candidateCore = normalizePreviewText(String(candidate || '').replace(editions, ''));
    const albumCore = normalizePreviewText(String(album || '').replace(editions, ''));
    return albumKey.length > 1 && (candidateKey === albumKey || (albumCore.length > 1 && candidateCore === albumCore));
  }

  function fetchItunesJsonp(requestUrl) {
    return new Promise(resolve => {
      const callback = `dipItunesCallback${Date.now()}_${Math.random().toString(36).slice(2)}`;
      const script = document.createElement('script');
      let settled = false;
      const finish = value => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        try { delete window[callback]; } catch (_) { window[callback] = undefined; }
        script.remove?.();
        resolve(value && typeof value === 'object' ? value : {});
      };
      window[callback] = value => finish(value);
      requestUrl.searchParams.set('callback', callback);
      script.src = requestUrl.toString();
      script.async = true;
      // __stage 只作診斷代碼：S1=腳本載入失敗（403 封鎖／斷網），S2=逾時或有載入但無資料。
      script.onerror = () => finish({ __stage: 'S1' });
      script.onload = () => setTimeout(() => finish({ __stage: 'S2' }), 50);
      const timer = setTimeout(() => finish({ __stage: 'S2' }), 7000);
      document.head.appendChild(script);
    });
  }

  async function fetchItunesDirect(artist, album) {
    try {
      const requestUrl = new URL('https://itunes.apple.com/search');
      requestUrl.searchParams.set('term', `${artist} ${album}`);
      requestUrl.searchParams.set('country', 'TW');
      requestUrl.searchParams.set('media', 'music');
      requestUrl.searchParams.set('entity', 'song');
      requestUrl.searchParams.set('limit', '50');
      const json = await fetchItunesJsonp(requestUrl);
      if (json.__stage) { lastFailCode = json.__stage; return {}; }
      const cjkArtist = /[㐀-鿿぀-ヿ가-힯]/.test(artist);
      const tracks = (json.results || []).filter(item => {
        if (item.kind !== 'song' || !item.previewUrl || !previewAlbumMatches(item.collectionName, album)) return false;
        return previewArtistMatches(item.artistName, artist) ||
          (cjkArtist && normalizePreviewText(item.collectionName) === normalizePreviewText(album));
      }).map(item => ({
        id:String(item.trackId || ''), trackName:item.trackName || '', trackNumber:Number(item.trackNumber || 0),
        duration:Number(item.trackTimeMillis || 0), previewUrl:item.previewUrl,
        storeUrl:item.trackViewUrl || item.collectionViewUrl || '', artistName:item.artistName || artist,
        collectionName:item.collectionName || album
      }));
      const unique = [...new Map(tracks.map(item => [item.id || item.previewUrl, item])).values()]
        .sort((a, b) => a.trackNumber - b.trackNumber);
      if (!unique.length) {
        // S3=Apple 查無任何結果，S4:n=有 n 筆結果但專輯／藝人配對全數不符。
        lastFailCode = (json.results || []).length ? `S4:${json.results.length}` : 'S3';
        return {};
      }
      return { source:'itunes-preview', tracks:unique };
    } catch (_) { lastFailCode = 'S0'; return {}; }
  }

  async function fetchSource(path, artist, album) {
    try {
      if (path === '/itunes-album-preview') return await fetchItunesDirect(artist, album);
      const response = await fetch(`${WORKER_URL}${path}?artist=${encodeURIComponent(artist)}&album=${encodeURIComponent(album)}`);
      return response.ok ? (await response.json()) : {};
    } catch (_) { return {}; }
  }

  function cacheKey(artist, album) {
    return `${String(artist).trim().toLowerCase()}\u0000${String(album).trim().toLowerCase()}`;
  }

  function linkEntry(artist, album) {
    const key = cacheKey(artist, album);
    if (!linkCache.has(key)) linkCache.set(key, {
      spotifyData: null, youtubeData: null, itunesData: null,
      spotifyPromise: null, youtubePromise: null, itunesPromise: null,
      itunesRetryAt: 0, youtubeRetryAt: 0
    });
    return linkCache.get(key);
  }

  // iTunes 與 YouTube 的空結果都只黏 15 秒：暫時性失敗（限流、YT Music 被擋）
  // 不應該讓整個瀏覽期都拿快取空資料。
  function sourceEmpty(type, data) {
    if (type === 'itunes') return !data?.tracks?.length;
    if (type === 'youtube') return !(data?.url || data?.highlight);
    return false;
  }

  function loadCachedSource(entry, type, path, artist, album) {
    const dataKey = `${type}Data`, promiseKey = `${type}Promise`, retryKey = `${type}RetryAt`;
    const retriable = type === 'itunes' || type === 'youtube';
    if (retriable && entry[dataKey] !== null && sourceEmpty(type, entry[dataKey]) && Date.now() >= (entry[retryKey] || 0)) {
      entry[dataKey] = null;
      entry[promiseKey] = null;
    }
    if (entry[dataKey] !== null) return Promise.resolve(entry[dataKey]);
    if (!entry[promiseKey]) {
      entry[promiseKey] = fetchSource(path, artist, album)
        .then(data => {
          entry[dataKey] = data && typeof data === 'object' ? data : {};
          if (retriable && sourceEmpty(type, entry[dataKey])) {
            entry[retryKey] = Date.now() + 15000;
            entry[promiseKey] = null;
          }
          return entry[dataKey];
        })
        .catch(() => {
          entry[dataKey] = {};
          if (retriable) { entry[retryKey] = Date.now() + 15000; entry[promiseKey] = null; }
          return entry[dataKey];
        });
    }
    return entry[promiseKey];
  }

  function prefetch({ artist = '', album = '', spotify = true, youtube = true, itunes = false } = {}) {
    artist = String(artist).trim();
    album = String(album).trim();
    if (!artist || !album) return Promise.resolve({ spotifyUrl: '', youtubeUrl: '', itunesData: {} });
    const entry = linkEntry(artist, album);
    const spotifySource = spotify ? loadCachedSource(entry, 'spotify', '/spotify-album-link', artist, album) : Promise.resolve(entry.spotifyData || {});
    const youtubeSource = youtube ? loadCachedSource(entry, 'youtube', '/yt-music-link', artist, album) : Promise.resolve(entry.youtubeData || {});
    const itunesSource = itunes ? loadCachedSource(entry, 'itunes', '/itunes-album-preview', artist, album) : Promise.resolve(entry.itunesData || {});
    return Promise.all([spotifySource, youtubeSource, itunesSource]).then(([spotifyData, youtubeData, itunesData]) => ({
      spotifyUrl: spotifyData.url || '', youtubeUrl: youtubeData.url || '', spotifyData, youtubeData, itunesData
    }));
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
      clearTimeout(previewTimer);
      if (previewAudio) { previewAudio.loop = false; previewAudio.pause?.(); }
      youtubePlayer?.pauseVideo?.();
      controller.pause?.();
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

  function waitForYoutubePlayback(player, token, target) {
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
        try {
          const currentVideo = player.getVideoData?.()?.video_id || '';
          const currentList = player.getPlaylistId?.() || '';
          const correctSource = target.video ? currentVideo === target.video : target.list ? currentList === target.list : false;
          if (correctSource && player.getPlayerState?.() === 1) finish(true);
        } catch (_) {}
      }, 50);
      const timer = setTimeout(() => finish(false), 6000);
    });
  }

  function ensurePreviewAudio() {
    if (previewAudio) return previewAudio;
    previewAudio = document.createElement('audio');
    previewAudio.crossOrigin = 'anonymous';
    previewAudio.preload = 'auto';
    previewAudio.setAttribute('playsinline', '');
    previewAudio.setAttribute('aria-hidden', 'true');
    Object.assign(previewAudio.style, { position:'fixed', width:'1px', height:'1px', left:'-9999px', top:'0', opacity:'0', pointerEvents:'none' });
    root?.appendChild(previewAudio);
    return previewAudio;
  }

  function waitForPreviewPlayback(audio, token) {
    return new Promise(resolve => {
      let settled = false;
      const finish = value => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        audio.removeEventListener('playing', playing);
        audio.removeEventListener('error', failed);
        resolve(value && token === requestId);
      };
      const playing = () => finish(true), failed = () => finish(false);
      // 行動網路首包 m4a 偶爾超過 3 秒，放寬到 8 秒避免誤判成失敗。
      const timer = setTimeout(() => finish(false), 8000);
      audio.addEventListener('playing', playing, { once:true });
      audio.addEventListener('error', failed, { once:true });
    });
  }

  function previewTrackSummary(data) {
    return (Array.isArray(data?.tracks) ? data.tracks : [])
      .filter(track => track?.previewUrl)
      .map(track => ({ id: String(track.id || track.previewUrl), trackName: track.trackName || '' }));
  }

  async function playItunes(data, token, forcedTrackId = '') {
    const tracks = Array.isArray(data?.tracks) ? data.tracks.filter(track => track?.previewUrl) : [];
    if (!tracks.length || token !== requestId) return false;
    const forced = forcedTrackId ? tracks.find(track => String(track.id || track.previewUrl) === forcedTrackId) : null;
    const choices = tracks.length > 1 ? tracks.filter(track => track.id !== lastPreviewTrackId) : tracks;
    const track = forced || choices[Math.floor(Math.random() * choices.length)] || tracks[0];
    const audio = ensurePreviewAudio();
    if (!audio || !track) return false;
    try {
      clearTimeout(previewTimer);
      clearTimeout(previewFadeTimer);
      spotifyController?.pause?.();
      youtubePlayer?.pauseVideo?.();
      audio.loop = false;
      audio.src = track.previewUrl;
      audio.currentTime = 0;
      audio.load();
      setProvider('itunes');
      setPreviewLevel(0);
      const started = waitForPreviewPlayback(audio, token);
      const attempt = audio.play();
      // S6=play() 被拒（授權／格式），S5:n=音檔 MediaError 代碼，S7=8 秒內未開始播放。
      if (attempt?.catch) attempt.catch(err => { lastFailCode = `S6:${err?.name || 'play'}`; });
      if (!(await started)) {
        if (!/^S6/.test(lastFailCode)) lastFailCode = audio.error ? `S5:${audio.error.code}` : 'S7';
        audio.pause();
        setPreviewLevel(BASE_GAIN);
        return false;
      }
      fadePreview(BASE_GAIN, FADE_MS);
      currentPreviewData = data;
      lastPreviewTrackId = track.id || track.previewUrl;
      previewTimer = setTimeout(() => {
        if (token !== requestId) return;
        fadePreview(0, FADE_MS);
        previewFadeTimer = setTimeout(() => {
          if (token !== requestId) return;
          audio.pause();
          emit({ status:'stopped', provider:null });
        }, FADE_MS);
      }, 30500 - FADE_MS);
      return {
        trackName:track.trackName || '', storeUrl:track.storeUrl || '', attribution:'Apple Music 試聽',
        trackId:String(track.id || track.previewUrl), tracks:previewTrackSummary(data)
      };
    } catch (_) { return false; }
  }

  // 點唱盤下方播放列表的某一首：資料已在手上，同一顆已解鎖的 audio 元件直接換源播放。
  async function playTrack(trackId) {
    if (!currentPreviewData || !trackId || !root) return false;
    const token = ++requestId;
    lastFailCode = '';
    emit({ status:'loading', provider:'itunes', code:'' });
    const played = await playItunes(currentPreviewData, token, String(trackId));
    if (played && token === requestId) {
      emit({ status:'playing', provider:'itunes', ...played });
      return true;
    }
    if (token === requestId) emit({ status:'error', provider:null, code:lastFailCode || 'S8' });
    return false;
  }

  async function playYoutube(data, token) {
    const highlight = data?.highlight?.videoId ? data.highlight : null;
    const target = highlight ? { list:'', video:highlight.videoId } : youtubeTarget(data?.url || '');
    const player = await ensureYoutubePlayer();
    if (!target || !player || token !== requestId) return false;
    try {
      clearTimeout(previewTimer);
      clearTimeout(previewFadeTimer);
      if (previewAudio) { previewAudio.loop = false; previewAudio.pause?.(); }
      spotifyController?.pause?.();
      player.pauseVideo?.();
      setProvider('youtube');
      youtubeGeneration++;
      try { player.setVolume?.(0); } catch (_) {}
      const started = waitForYoutubePlayback(player, token, target);
      let startSeconds = 0;
      if (highlight) {
        const duration = Number(highlight.duration || 0);
        startSeconds = duration > 70 ? Math.floor(10 + Math.random() * (duration - 50)) : 0;
        const endSeconds = duration ? Math.min(startSeconds + 30, duration) : startSeconds + 30;
        player.loadVideoById?.({ videoId:target.video, startSeconds, endSeconds });
      } else if (target.list) {
        player.setShuffle?.(false);
        player.setLoop?.(false);
        player.loadPlaylist?.({ listType: 'playlist', list: target.list, index: 0, startSeconds: 0 });
      } else player.loadVideoById?.(target.video);
      player.unMute?.();
      player.playVideo?.();
      if (await started) {
        fadeYoutube(0, YT_BASE_VOLUME, FADE_MS);
        if (highlight) {
          // YT 會在 endSeconds（約 30 秒處）自行停止，淡出要提早開始才播得完。
          previewFadeTimer = setTimeout(() => {
            if (token === requestId) fadeYoutube(YT_BASE_VOLUME, 0, FADE_MS);
          }, 30500 - FADE_MS - 500);
          previewTimer = setTimeout(() => {
            if (token !== requestId) return;
            player.pauseVideo?.();
            emit({ status:'stopped', provider:null });
          }, 30500);
        }
        return { trackName:highlight?.title || '', startSeconds };
      }
      player.pauseVideo?.();
      return false;
    } catch (_) { return false; }
  }

  async function playAlbum({ artist = '', album = '', prefer = 'auto' } = {}) {
    artist = String(artist).trim();
    album = String(album).trim();
    if (!artist || !album || !root) return false;
    const token = ++requestId;
    lastFailCode = '';
    emit({ status: 'loading', provider: null, artist, album, trackName:'', storeUrl:'', attribution:'', code:'' });
    try {
      const entry = linkEntry(artist, album);
      // 唱片櫃混合路徑：iTunes 優先（真 30 秒試聽＋曲目列表），使用者 IP 被 Apple
      // 封鎖或查無專輯時，自動退到對戰同款的 YouTube 高觀看曲目 30 秒片段。
      const order = prefer === 'itunes' ? ['itunes', 'youtube']
        : prefer === 'spotify' ? ['spotify', 'youtube']
        : prefer === 'youtube' ? ['youtube', 'spotify']
        : IOS_DEVICE ? ['youtube', 'spotify'] : ['spotify', 'youtube'];
      for (const provider of order) {
        const path = provider === 'youtube' ? '/yt-music-link' : provider === 'itunes' ? '/itunes-album-preview' : '/spotify-album-link';
        // 一律經過 loadCachedSource：它會回傳既有快取，並讓 iTunes 的空結果在
        // 重試窗過後於「點擊當下」真正重新查詢，而不是永遠回快取的空資料。
        const source = await loadCachedSource(entry, provider, path, artist, album);
        const target = provider === 'spotify' ? spotifyAlbumId(source?.url || '') : source;
        if (!target || token !== requestId) continue;
        const played = provider === 'youtube' ? await playYoutube(target, token)
          : provider === 'itunes' ? await playItunes(target, token)
          : await playSpotify(target, token);
        if (played && token === requestId) {
          // 先清空曲目欄位再展開本次結果，避免退到 YouTube 時殘留上一張 iTunes 的列表。
          emit({ status: 'playing', provider, artist, album, trackName:'', storeUrl:'', attribution:'', tracks:[], trackId:'', ...(played === true ? {} : played) });
          return true;
        }
      }
    } catch (_) {}
    if (token === requestId) {
      if (previewAudio && silentPreviewUrl && previewAudio.src === silentPreviewUrl) {
        previewAudio.loop = false;
        previewAudio.pause();
      }
      setProvider(null);
      // S8=沒有任何新查詢就失敗（重試窗內回快取空結果等），保證 toast 一定有代碼可回報。
      emit({ status: 'error', provider: null, artist, album, code: lastFailCode || 'S8', tracks: [], trackId: '' });
    }
    return false;
  }

  function stop() {
    requestId++;
    clearTimeout(previewTimer);
    clearTimeout(previewFadeTimer);
    clearInterval(previewVolumeTimer);
    clearInterval(youtubeFadeTimer);
    try { if (previewAudio) { previewAudio.loop = false; previewAudio.pause?.(); } } catch (_) {}
    try { spotifyController?.pause?.(); } catch (_) {}
    try { youtubePlayer?.pauseVideo?.(); } catch (_) {}
    setProvider(null);
    emit({ status: 'stopped', provider: null, tracks: [], trackId: '' });
  }

  function onStateChange(callback) {
    if (typeof callback !== 'function') return () => {};
    listeners.add(callback);
    try { callback({ ...state }); } catch (_) {}
    return () => listeners.delete(callback);
  }

  window.DipPlayer = { mount, unlock, prefetch, playAlbum, playTrack, stop, onStateChange };
})();
