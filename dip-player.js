(() => {
  const WORKER_URL = 'https://dip-vinyl-worker.kubinice06.workers.dev';
  const SPOTIFY_API = 'https://open.spotify.com/embed/iframe-api/v1';
  const YOUTUBE_API = 'https://www.youtube.com/iframe_api';
  const APPLE_AUDIO_MAP_URL = 'data/apple-audio-runtime-v1.json';
  const SPOTIFY_PLACEHOLDER = 'spotify:album:4aawyAB9vmqN3uQ7FjRGTy';
  const YOUTUBE_PLACEHOLDER = 'M7lc1UVf-VE';
  const IOS_DEVICE = /iPad|iPhone|iPod/.test(navigator.userAgent || '') ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const MOBILE_DEVICE = IOS_DEVICE || /Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent || '');
  const linkCache = new Map();
  const previewBufferCache = new Map();
  const listeners = new Set();
  let root = null, spotifyHost = null, youtubeHost = null, youtubeFrameHost = null;
  let hiddenMode = false, requestId = 0;
  let spotifyApi = null, spotifyApiPromise = null, spotifyController = null, controllerPromise = null;
  let youtubeApiPromise = null, youtubePlayer = null, youtubePlayerPromise = null, youtubeReady = false, youtubePrimed = false, youtubeGeneration = 0;
  let previewAudio = null, previewBufferSource = null, previewTimer = null, lastPreviewTrackId = '', previewPrimed = false, silentPreviewUrl = '';
  let previewArmedAt = 0, previewArmPromise = null;
  let currentPreviewData = null, lastFailCode = '';
  let appleAudioMap = null, appleAudioMapPromise = null;
  // 店主要求：整體音量固定 50%，開頭 1.5 秒淡入、結尾 1.5 秒淡出。
  // iOS 忽略 audio.volume，iTunes 路徑須經 Web Audio GainNode 才能真正控音量。
  const BASE_GAIN = 0.5, YT_BASE_VOLUME = 50, FADE_MS = 1500, PREVIEW_BUFFER_CACHE_LIMIT = 3;
  let audioCtx = null, previewGain = null, previewVolumeTimer = null, previewFadeTimer = null, youtubeFadeTimer = null;
  // 自己記住音量狀態：gain.value 要等下一個 render quantum 才會反映剛排下去的
  // setValueAtTime，緊接著讀會拿到舊值。previewRampEnd 是最後一段 ramp 的結束時間。
  let previewLevel = 0, previewRampEnd = 0;
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
    // 在玩家進遊戲後就先取得精簡音源索引；真正點專輯時不必再用名稱搜尋 Apple。
    void loadAppleAudioMap();
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

  // 真實試聽改由 AudioBufferSourceNode → GainNode → 喇叭，避免 iOS Safari
  // 的 MediaElementAudioSourceNode 偶發旁路，讓 <audio> 以 100% 直接出聲。
  // AudioContext 必須在點擊手勢內先建立／喚醒，稍後非同步解碼才能正常 start。
  function ensurePreviewGraph() {
    if (!audioCtx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      try {
        audioCtx = new Ctx();
        previewGain = audioCtx.createGain();
        previewGain.gain.value = 0;
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
        const gain = previewGain.gain;
        // cancelAndHoldAtTime 在「now 之後已經沒有排程事件」時不會補上保持點（淡入的
        // ramp 早在 28 秒前就結束了）。少了錨點，接著的 linearRamp 會從那個舊事件起算，
        // 音量在呼叫當下就直接塌到約 2%，聽起來是硬切而不是淡出。一律自己補
        // setValueAtTime(起點, now)，1.5 秒淡出才會真的走滿。
        // 起點：ramp 還在跑 → 取實際值（中途打斷才不會跳）；已經跑完 → 取自己記的值，
        // 因為 gain.value 這時可能還沒反映剛排下去的 setPreviewLevel。
        const from = now < previewRampEnd ? gain.value : previewLevel;
        gain.cancelScheduledValues(now);
        gain.setValueAtTime(from, now);
        gain.linearRampToValueAtTime(toValue, now + ms / 1000);
        previewLevel = toValue;
        previewRampEnd = now + ms / 1000;
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
        previewLevel = value;
        previewRampEnd = 0;
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
      // 送出一個全靜音 sample，確保 iOS 真正解鎖 Web Audio 輸出，不只把
      // AudioContext 狀態標成 running。gain 此時固定為 0，不會產生聲音。
      if (audioCtx?.createBuffer && audioCtx?.createBufferSource && previewGain) {
        try {
          const silentBuffer = audioCtx.createBuffer(1, 1, audioCtx.sampleRate || 44100);
          const silentSource = audioCtx.createBufferSource();
          silentSource.buffer = silentBuffer;
          silentSource.connect(previewGain);
          silentSource.start(0);
        } catch (_) {}
      }
      // 一律「完整重新武裝」：pause → 重設 src → play。不能只對自認還在播的元素
      // 補一次 play()——實機 log 證明那是 no-op，不會建立新的 audio session，
      // AudioContext 於是永遠停在 suspended（currentTime 十秒都還是 0.00），
      // 後面 loadPreviewBuffer 的 await resume() 就整條吊死（實測卡 14.7 秒），
      // 表現出來就是「第一次點開簡介沒聲音」。只有這個完整循環能讓 iOS 交出
      // audio session，接著 resume() 才會真的完成。靜音檔重播不可聞，無副作用。
      // 同一次觸碰常會連帶觸發兩次 unlock（捕獲階段的解鎖 + 播放前的解鎖）。若兩次
      // 都重新武裝，第二次的 pause 會把第一次的 play() 打成 AbortError，反而把剛
      // 建立的 session 弄丟。400ms 內只武裝一次，後續視為已完成。
      // 只在「剛武裝過而且還在播」時才略過；元素若已被 stop 停掉就一定要重新武裝。
      if (!audio.paused && Date.now() - previewArmedAt < 400) return true;
      previewArmedAt = Date.now();
      try { audio.pause(); } catch (_) {}
      audio.loop = true;
      audio.src = silentPreviewSource();
      audio.currentTime = 0;
      const attempt = audio.play();
      previewPrimed = true;
      previewArmPromise = attempt?.then ? attempt.then(
        () => {},
        e => { previewPrimed = false; }) : null;
      if (!attempt?.then && attempt?.catch) attempt.catch(() => { previewPrimed = false; });
      // session 已由上面的 play() 建立 → 在同一個手勢內再要求一次 resume，
      // 這樣稍後非同步路徑上的 resume 才不會等不到。
      if (audioCtx && audioCtx.state !== 'running') {
        try {
          const r = audioCtx.resume?.();
          if (r?.then) r.then(() => {}, () => {});
        } catch (_) {}
      }
      return true;
    } catch (_) { previewPrimed = false; return false; }
  }

  function installAudioUnlock() {
    if (document.documentElement.dataset.dipAudioUnlock === '1') return;
    document.documentElement.dataset.dipAudioUnlock = '1';
    const prime = () => {
      // iPhone 的 Web Audio 也必須在真實手勢內建立。先解鎖靜音 Apple 路徑，
      // 長按 450ms 後才開介紹時仍能安全起播。
      const previewReady = primePreviewFromGesture();
      const youtubeReadyNow = primeYoutubeFromGesture();
      if (previewReady || youtubeReadyNow) {
        ['pointerdown', 'touchstart', 'click'].forEach(type => document.removeEventListener(type, prime, true));
      }
    };
    ['pointerdown', 'touchstart', 'click'].forEach(type => document.addEventListener(type, prime, true));
  }

  function unlock({ youtube = true } = {}) {
    const previewReady = primePreviewFromGesture();
    const youtubeReadyNow = youtube ? primeYoutubeFromGesture() : false;
    return previewReady || youtubeReadyNow;
  }

  function spotifyAlbumId(url) {
    try { return new URL(url).pathname.match(/\/album\/([a-zA-Z0-9]+)/)?.[1] || ''; } catch (_) { return ''; }
  }

  // 卡片可在 card_catalog 存一條固定試聽連結（previewUrl），不必每次即時查來源。
  // 兩種型態：
  //   1. 直接音檔（.m4a/.mp3/…）→ 走 Web Audio buffer 路徑，**有淡入淡出、音量可控、iOS 相容**，
  //      對戰／Roguelike 也能用（那兩頁刻意排除 YouTube 正是因為 iframe 音量控不了）。
  //   2. YouTube 連結 → 走 iframe 路徑，僅適用唱片櫃。
  function pinnedPreviewKind(url) {
    if (!/^https?:\/\//i.test(String(url || ''))) return '';
    try {
      const path = new URL(url).pathname.toLowerCase();
      if (/\.(m4a|mp3|aac|wav|ogg|oga|opus|flac)$/.test(path)) return 'file';
    } catch (_) { return ''; }
    return /youtu\.?be|youtube\.com/i.test(url) ? 'youtube' : '';
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

  function appleAudioKey(artist, album) {
    return `${normalizePreviewText(artist)}\u0000${normalizePreviewText(album)}`;
  }

  function loadAppleAudioMap() {
    if (appleAudioMap) return Promise.resolve(appleAudioMap);
    if (!appleAudioMapPromise) {
      appleAudioMapPromise = fetch(APPLE_AUDIO_MAP_URL, { cache:'force-cache' })
        .then(response => response?.ok ? response.json() : null)
        .then(data => {
          appleAudioMap = data?.version === 1 && data?.entries && typeof data.entries === 'object' ? data : null;
          return appleAudioMap;
        })
        .catch(() => null);
    }
    return appleAudioMapPromise;
  }

  async function mappedItunesPreview(artist, album) {
    // 索引尚在背景載入時只等短時間；離線或首次快取失敗仍可走既有搜尋備援。
    const map = await withTimeout(loadAppleAudioMap(), 1200);
    const hit = map?.entries?.[appleAudioKey(artist, album)];
    if (!Array.isArray(hit) || hit.length < 3) return {};
    const [storefront, collectionId, previewUrl] = hit;
    if (!/^[A-Z]{2}$/.test(String(storefront || '')) || !/^\d+$/.test(String(collectionId || '')) || !/^https:\/\//.test(String(previewUrl || ''))) return {};
    return {
      source:'itunes-map',
      tracks:[{
        id:`map:${collectionId}`, trackName:'', trackNumber:1, duration:30000,
        previewUrl:String(previewUrl), storeUrl:'', collectionId:String(collectionId), storefront:String(storefront)
      }]
    };
  }

  function previewArtistMatches(candidate, artist) {
    const candidateKey = normalizePreviewText(candidate), artistKey = normalizePreviewText(artist);
    return candidateKey.length > 2 && artistKey.length > 2 &&
      (candidateKey.includes(artistKey) || artistKey.includes(candidateKey));
  }

  function previewAlbumMatches(candidate, album) {
    const editions = /\b(?:remaster(?:ed)?(?:\s+version)?|deluxe(?:\s+edition)?|expanded(?:\s+edition)?|anniversary(?:\s+edition)?|mono|stereo|reissue|edition)\b/gi;
    const candidateKey = normalizePreviewText(candidate), albumKey = normalizePreviewText(album);
    // Apple 常只供應週年重製版；先整段移除含版本關鍵字的括號，避免
    // 「(25th Anniversary Remaster)」清掉文字後仍殘留 25th 而配對失敗。
    const decoratedEdition = /[\(\[\{][^\)\]\}]*(?:remaster(?:ed)?|deluxe|expanded|anniversary|reissue|edition)[^\)\]\}]*[\)\]\}]/gi;
    const albumCore = value => normalizePreviewText(String(value || '').replace(decoratedEdition, ' ').replace(editions, ' '));
    const candidateCore = albumCore(candidate);
    const requestedCore = albumCore(album);
    return albumKey.length > 1 && (candidateKey === albumKey || (requestedCore.length > 1 && candidateCore === requestedCore));
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

  function previewDataFromApple(json, artist, album, requireAppleHost = false) {
    const cjkArtist = /[㐀-鿿぀-ヿ가-힯]/.test(artist);
    const tracks = (json?.results || []).filter(item => {
      if (item.kind !== 'song' || !item.previewUrl || !previewAlbumMatches(item.collectionName, album)) return false;
      if (requireAppleHost) {
        try { if (!new URL(item.previewUrl).hostname.toLowerCase().endsWith('.itunes.apple.com')) return false; }
        catch (_) { return false; }
      }
      // 台灣 Apple Music 會把部分西洋藝人直接本地化（The Clash→衝擊合唱團、
      // Diana Ross→黛安娜羅絲）。搜尋詞和專輯已吻合時，接受這種「輸入為拉丁字、
      // 回傳藝人為 CJK」的在地化名稱；拉丁字翻唱／同名專輯仍會被藝人檢查擋下。
      const localizedArtist = !cjkArtist && /[㐀-鿿぀-ヿ가-힯]/.test(item.artistName || '');
      return previewArtistMatches(item.artistName, artist) || localizedArtist ||
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
      lastFailCode = (json?.results || []).length ? `S4:${json.results.length}` : 'S3';
      return {};
    }
    return { source:'itunes-preview', tracks:unique };
  }

  function itunesSearchParams(artist, album) {
    return new URLSearchParams({ term:`${artist} ${album}`, country:'TW', media:'music', entity:'song', limit:'50' });
  }

  async function fetchItunesDirect(artist, album) {
    try {
      const requestUrl = new URL('https://itunes.apple.com/search');
      for (const [key, value] of itunesSearchParams(artist, album)) requestUrl.searchParams.set(key, value);
      const json = await fetchItunesJsonp(requestUrl);
      if (json.__stage) { lastFailCode = json.__stage; return {}; }
      return previewDataFromApple(json, artist, album);
    } catch (_) { lastFailCode = 'S0'; return {}; }
  }

  async function fetchItunesGateway(artist, album) {
    try {
      const nestedQuery = itunesSearchParams(artist, album).toString().replace(/&/g, '%26');
      const response = await withTimeout(fetch(`https://r.jina.ai/http://itunes.apple.com/search?${nestedQuery}`), 12000);
      if (!response?.ok) { lastFailCode = `S9:${response?.status || 0}`; return {}; }
      const text = await response.text();
      const start = text.indexOf('{'), end = text.lastIndexOf('}');
      if (start < 0 || end <= start) { lastFailCode = 'S9:json'; return {}; }
      return previewDataFromApple(JSON.parse(text.slice(start, end + 1)), artist, album, true);
    } catch (_) { lastFailCode = 'S9:fetch'; return {}; }
  }

  async function fetchItunesPreview(artist, album, { skipMap = false } = {}) {
    if (!skipMap) {
      const mapped = await mappedItunesPreview(artist, album);
      if (mapped?.tracks?.length) return mapped;
    }
    // 手機 IP 常被 Apple 擋，因此手機先走文字閘道；桌面保留速度較快的官方
    // JSONP。兩條路取得的都是 Apple 原始 previewUrl，播放與淡入淡出完全相同。
    const fallbacks = MOBILE_DEVICE ? [fetchItunesGateway, fetchItunesDirect] : [fetchItunesDirect, fetchItunesGateway];
    for (const fallback of fallbacks) {
      const data = await fallback(artist, album);
      if (data?.tracks?.length) return data;
    }
    return {};
  }

  async function fetchSource(path, artist, album) {
    try {
      if (path === '/itunes-album-preview') return await fetchItunesPreview(artist, album);
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

  async function warmAlbum({ artist = '', album = '' } = {}) {
    artist = String(artist).trim();
    album = String(album).trim();
    if (!artist || !album || !root) return null;
    const entry = linkEntry(artist, album);
    const data = await loadCachedSource(entry, 'itunes', '/itunes-album-preview', artist, album);
    const track = Array.isArray(data?.tracks) ? data.tracks.find(item => item?.previewUrl) : null;
    return track ? loadPreviewBuffer(track.previewUrl) : null;
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
      stopPreviewBuffer();
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

  function previewTrackSummary(data) {
    return (Array.isArray(data?.tracks) ? data.tracks : [])
      .filter(track => track?.previewUrl)
      .map(track => ({ id: String(track.id || track.previewUrl), trackName: track.trackName || '' }));
  }

  function disposePreviewBuffer(source) {
    if (!source) return;
    try { source.onended = null; source.stop(0); } catch (_) {}
    try { source.disconnect?.(); } catch (_) {}
  }

  function stopPreviewBuffer() {
    const source = previewBufferSource;
    previewBufferSource = null;
    disposePreviewBuffer(source);
  }

  function decodePreviewBuffer(bytes) {
    if (!audioCtx?.decodeAudioData || !bytes) return Promise.resolve(null);
    return new Promise(resolve => {
      let settled = false;
      const finish = value => {
        if (settled) return;
        settled = true;
        resolve(value || null);
      };
      try {
        const result = audioCtx.decodeAudioData(bytes, finish, () => finish(null));
        if (result?.then) result.then(finish, () => finish(null));
      } catch (_) { finish(null); }
    });
  }

  async function loadPreviewBuffer(url) {
    const cached = previewBufferCache.get(url);
    if (cached) {
      // LRU：最近使用的解碼結果留在記憶體，關窗或二次開啟都不重抓音檔。
      previewBufferCache.delete(url);
      previewBufferCache.set(url, cached);
      return cached;
    }
    const load = (async () => {
      try {
        ensurePreviewGraph();
        if (!audioCtx || !previewGain) return null;
        // 這裡完全不等 resume：下載與 decodeAudioData 在 suspended 的 context 上一樣能做，
        // 只有 source.start() 需要 running（那邊有自己的 resume）。iOS 的 resume promise
        // 在手勢外會被無限期擱置，早期版本直接 await 讓整條路徑吊死 14.7 秒；即使改成
        // 逾時保護，也還是白等 1.5 秒才開始下載。ensurePreviewGraph() 已經非阻塞地
        // 發過 resume 請求，這裡直接往下走即可。
        const response = await withTimeout(fetch(url, { mode:'cors', cache:'force-cache' }), 10000);
        if (!response?.ok || typeof response.arrayBuffer !== 'function') return null;
        const bytes = await withTimeout(response.arrayBuffer(), 10000);
        return await withTimeout(decodePreviewBuffer(bytes), 10000);
      } catch (_) { return null; }
    })();
    previewBufferCache.set(url, load);
    try {
      const decoded = await load;
      if (!decoded) {
        if (previewBufferCache.get(url) === load) previewBufferCache.delete(url);
        return null;
      }
      while (previewBufferCache.size > PREVIEW_BUFFER_CACHE_LIMIT) previewBufferCache.delete(previewBufferCache.keys().next().value);
      return decoded;
    } catch (_) {
      if (previewBufferCache.get(url) === load) previewBufferCache.delete(url);
      return null;
    }
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
      stopPreviewBuffer();
      // 在換來源、下載、解碼之前就把唯一輸出路徑鎖在 0；真實音檔不再交給
      // HTMLMediaElement 播放，因此 iOS 無法以元素預設的 100% 音量旁路。
      ensurePreviewGraph();
      setPreviewLevel(0);
      // 這裡刻意「不」停掉靜音 keep-alive：下一行要 await 下載＋解碼（手機 1～3 秒）。
      // 那段空窗若沒有任何東西在發聲，iOS 會把 audio session 收掉，之後 source.start(0)
      // 就沒有輸出——而 AudioContext 仍回報 running，所以不會拋錯、也查不出來。這正是
      // 「第一次點開沒聲音、關掉重開才正常」的成因：第二次 buffer 已在快取，幾乎同一個
      // tick 就 start，來不及被收掉。改成等真實試聽開始輸出、由它接手 session 之後才收。
      setProvider('itunes');
      const decoded = await loadPreviewBuffer(track.previewUrl);
      if (token !== requestId) return false;
      if (!decoded || !audioCtx?.createBufferSource || !previewGain) {
        lastFailCode = 'S10';
        setPreviewLevel(0);
        return false;
      }
      const source = audioCtx.createBufferSource();
      source.buffer = decoded;
      source.connect(previewGain);
      previewBufferSource = source;
      // 解碼期間 AudioContext 可能被系統暫停；起播前再 resume，gain 仍保持 0。
      // 同樣加上限：resume 卡住時寧可照常起播，也不要整個吊死。
      if (audioCtx.state !== 'running') await withTimeout(Promise.resolve(audioCtx.resume?.()), 1500);
      if (token !== requestId) {
        if (previewBufferSource === source) previewBufferSource = null;
        disposePreviewBuffer(source);
        return false;
      }
      setPreviewLevel(0);
      source.start(0);
      fadePreview(BASE_GAIN, FADE_MS);
      // 真實試聽已經在輸出、session 由它接手 → 這時才收掉靜音 keep-alive。
      // 失敗的分支一律不收：讓它繼續墊著，下一次重試才有 session 可用。
      // 必須等這次手勢發出的 play() 落定再 pause，否則會把自己的 play() 打成
      // AbortError（快取命中時 start 幾乎與武裝同一個 tick，必中）。
      const releaseKeepAlive = () => { try { audio.loop = false; audio.pause?.(); } catch (_) {} };
      if (previewArmPromise?.then) previewArmPromise.then(releaseKeepAlive, releaseKeepAlive);
      else releaseKeepAlive();
      currentPreviewData = data;
      lastPreviewTrackId = track.id || track.previewUrl;
      const playMs = Math.max(FADE_MS, Math.min(30500, Number(decoded.duration || 30) * 1000));
      previewTimer = setTimeout(() => {
        if (token !== requestId) return;
        fadePreview(0, FADE_MS);
        previewFadeTimer = setTimeout(() => {
          if (token !== requestId) return;
          stopPreviewBuffer();
          emit({ status:'stopped', provider:null });
        }, FADE_MS);
      }, Math.max(0, playMs - FADE_MS));
      return {
        trackName:track.trackName || '', storeUrl:track.storeUrl || '',
        attribution:data?.source === 'pinned-file' ? (data.attribution || '店內試聽') : 'Apple Music 試聽',
        trackId:String(track.id || track.previewUrl), tracks:data?.source === 'itunes-map' ? [] : previewTrackSummary(data)
      };
    } catch (_) {
      if (token === requestId) {
        stopPreviewBuffer();
        setPreviewLevel(0);
        lastFailCode = lastFailCode || 'S10';
      }
      return false;
    }
  }

  // 點唱盤下方播放列表的某一首：資料已在手上，沿用已解鎖的 AudioContext 解碼播放。
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
      stopPreviewBuffer();
      if (previewAudio) { previewAudio.loop = false; previewAudio.pause?.(); }
      spotifyController?.pause?.();
      player.pauseVideo?.();
      setProvider('youtube');
      youtubeGeneration++;
      // loadVideoById 本身會開始播放。先保持 mute，避免播放器在影片切換／buffering
      // 期間以先前音量出聲；確認目標影片真的在播後，才在 0 音量解除靜音並淡入。
      player.mute?.();
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
      player.playVideo?.();
      if (await started) {
        try {
          player.setVolume?.(0);
          player.unMute?.();
          player.setVolume?.(0);
        } catch (_) {}
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

  async function playAlbum({ artist = '', album = '', prefer = 'auto', previewUrl = '', attribution = '' } = {}) {
    artist = String(artist).trim();
    album = String(album).trim();
    if (!artist || !album || !root) return false;
    const token = ++requestId;
    lastFailCode = '';
    emit({ status: 'loading', provider: null, artist, album, trackName:'', storeUrl:'', attribution:'', code:'' });
    try {
      // 固定連結優先：命中就完全跳過來源查詢（不打 worker、不吃 API 配額，
      // 也不會發生即時比對配到別張專輯的問題——正確性在入庫前就人工覆核過了）。
      const pinnedKind = pinnedPreviewKind(previewUrl);
      if (pinnedKind === 'file') {
        const data = { source:'pinned-file', attribution, tracks:[{ previewUrl, trackName:'', id:previewUrl }] };
        const played = await playItunes(data, token);
        if (played && token === requestId) {
          emit({ status:'playing', provider:'itunes', artist, album, trackName:'', storeUrl:'', attribution:'', tracks:[], trackId:'', ...(played === true ? {} : played) });
          return true;
        }
      } else if (pinnedKind === 'youtube') {
        const played = youtubeTarget(previewUrl) ? await playYoutube({ url:previewUrl }, token) : false;
        if (played && token === requestId) {
          emit({ status:'playing', provider:'youtube', artist, album, trackName:'', storeUrl:'', attribution:'', tracks:[], trackId:'', ...(played === true ? {} : played) });
          return true;
        }
      }
      // 固定連結失效（檔案被刪、影片下架）→ 照舊走原本的來源查詢，不要讓卡片直接沒聲音。
      const entry = linkEntry(artist, album);
      // 唱片櫃混合路徑：iTunes 優先（真 30 秒試聽＋曲目列表），使用者 IP 被 Apple
      // 封鎖或查無專輯時，自動退到對戰同款的 YouTube 高觀看曲目 30 秒片段。
      const order = prefer === 'itunes-only' ? ['itunes']
        : prefer === 'itunes' ? ['itunes', 'youtube']
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
        let played = provider === 'youtube' ? await playYoutube(target, token)
          : provider === 'itunes' ? await playItunes(target, token)
          : await playSpotify(target, token);
        // 預存 URL 偶爾會被 Apple 換掉；只在它真的無法下載時才退回名稱搜尋自我修復。
        if (!played && provider === 'itunes' && source?.source === 'itunes-map' && token === requestId) {
          const refreshed = await fetchItunesPreview(artist, album, { skipMap:true });
          entry.itunesData = refreshed;
          entry.itunesPromise = null;
          if (refreshed?.tracks?.length && token === requestId) played = await playItunes(refreshed, token);
        }
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

  function stop({ fade = false } = {}) {
    const token = ++requestId;
    clearTimeout(previewTimer);
    clearTimeout(previewFadeTimer);
    clearInterval(previewVolumeTimer);
    clearInterval(youtubeFadeTimer);
    const finish = () => {
      if (token !== requestId) return;
      clearInterval(previewVolumeTimer);
      clearInterval(youtubeFadeTimer);
      try { if (previewAudio) { previewAudio.loop = false; previewAudio.pause?.(); } } catch (_) {}
      stopPreviewBuffer();
      try { spotifyController?.pause?.(); } catch (_) {}
      try { youtubePlayer?.pauseVideo?.(); } catch (_) {}
      setProvider(null);
      emit({ status: 'stopped', provider: null, tracks: [], trackId: '' });
    };
    if (fade && state.status === 'playing') {
      if (state.provider === 'itunes' && previewBufferSource) {
        fadePreview(0, FADE_MS);
        emit({ status:'stopping' });
        previewFadeTimer = setTimeout(finish, FADE_MS);
        return true;
      }
      if (state.provider === 'youtube' && youtubePlayer) {
        let from = YT_BASE_VOLUME;
        try { from = Number(youtubePlayer.getVolume?.()) || YT_BASE_VOLUME; } catch (_) {}
        fadeYoutube(from, 0, FADE_MS);
        emit({ status:'stopping' });
        previewFadeTimer = setTimeout(finish, FADE_MS);
        return true;
      }
    }
    finish();
    return true;
  }

  function onStateChange(callback) {
    if (typeof callback !== 'function') return () => {};
    listeners.add(callback);
    try { callback({ ...state }); } catch (_) {}
    return () => listeners.delete(callback);
  }

  window.DipPlayer = { mount, unlock, prefetch, warmAlbum, playAlbum, playTrack, stop, onStateChange };
})();
