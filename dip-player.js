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
  // 只有真的透過這兩個 iframe 播放過，才准對它們送暫停。Spotify 嵌入連著使用者的
  // 帳號，對一台我們從未播放過的嵌入送 pause，停掉的是店主自己正在聽的歌。
  let spotifyEngaged = false, youtubeEngaged = false;
  let youtubeApiPromise = null, youtubePlayer = null, youtubePlayerPromise = null, youtubeReady = false, youtubePrimed = false, youtubeGeneration = 0;
  let previewAudio = null, previewBufferSource = null, previewTimer = null, lastPreviewTrackId = '', previewPrimed = false, silentPreviewUrl = '';
  let keepAliveTimer = null;
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
  // ───────── 自動播放的授權模型（2026-08-10 改版）─────────
  // 網頁沒有任何 API 能得知使用者此刻是否正在用別的 App 聽音樂——iOS 原生的
  // isOtherAudioPlaying 沒開放給網頁，Android 完全沒有對應介面，而
  // navigator.audioSession（宣告自己是可混音的背景音）只有 Safari 實作，
  // 且 ambient 的效果是「跟對方疊著播」而不是「不播」。
  //
  // 舊版做法是「每次造訪都要先按一次播放」（存 sessionStorage）。店主要求改成：
  // 沒在聽串流的人應該一進來就有聲音，聽串流的人則要能被偵測並自動閉嘴。
  // 因此改成「裝置記憶 + 碰撞偵測」：
  //   1. 裝置從未表態（null）→ 靜音，由頁面提示「點這裡開啟」。
  //   2. 使用者點過開關（'on'）→ 之後每次造訪都直接自動播放，不必再按。
  //   3. 偵測到聲音被別的 App 搶走 → 視為「使用者選擇串流」，自動改成 'off' 並記住。
  // 「出聲前先問系統有沒有人在播」做不到，所以保證是「最多撞一次，撞過就學乖」。
  const AUTOPLAY_MEMORY_KEY = 'dip:autoplay';
  // 舊的每次造訪授權保留在程式裡，改由旗標斷路（要退回舊行為就把兩個旗標打開）。
  const AUTOPLAY_CONSENT_KEY = 'dip:autoplay-consent';
  const PERSIST_SESSION_CONSENT = false;
  // 全站第一次點擊就武裝音訊 = 一進站就搶走 Spotify 的音訊焦點，這是原始災情的根。
  // 武裝改為只在播放鍵／音樂開關這種「明確要出聲」的手勢內進行。
  const GLOBAL_GESTURE_ARM = false;
  // YouTube 解鎖會真的以 1% 音量播一小段（同樣搶焦點），而目前沒有任何頁面用它出聲。
  const UNLOCK_YOUTUBE_DEFAULT = false;
  // 載入頁面就預先建好 Spotify／YouTube 兩個 iframe 播放器。詳見 mount() 內的說明：
  // Spotify 嵌入是一台連著使用者帳號的播放器，會讓我們無意間停掉店主正在聽的串流。
  const EAGER_IFRAME_PLAYERS = false;

  function readAutoplayMemory() {
    try {
      const value = localStorage.getItem(AUTOPLAY_MEMORY_KEY);
      return value === 'on' || value === 'off' ? value : '';
    } catch (_) { return ''; }
  }
  function writeAutoplayMemory(value) {
    try { localStorage.setItem(AUTOPLAY_MEMORY_KEY, value); } catch (_) {}
  }

  let autoplayConsent = false;
  try { if (PERSIST_SESSION_CONSENT) autoplayConsent = sessionStorage.getItem(AUTOPLAY_CONSENT_KEY) === '1'; } catch (_) {}
  // 裝置記憶蓋過 session 授權：'on' 直接放行自動播放，'off' 一律安靜。
  const initialMemory = readAutoplayMemory();
  if (initialMemory) autoplayConsent = initialMemory === 'on';

  let state = { status: 'idle', provider: null, artist: '', album: '', cover: '', consent: autoplayConsent };
  let mediaSessionActive = false;
  const revokeListeners = new Set();

  function hasAutoplayConsent() { return autoplayConsent; }
  // 'on' | 'off' | 'unset'——頁面用它決定顯示開關圖示與是否要跳首次提示。
  function autoplayPreference() { return readAutoplayMemory() || 'unset'; }

  // 刻意不發事件：授權是在手勢當下、緊接著要起播時給的。走 emit() 會順手跑一次
  // syncMediaSession，而此刻 status 還停在 stopped，會把剛武裝好的 keep-alive src
  // 拆掉（iOS 第一次播放就會沒聲音）；就算避開 media session，訂閱者收到的也是
  // 上一張的 artist/album，反而會把播放鈕圖示打回停止。呼叫端自己同步介面即可。
  // 只給「這次造訪」的授權，不寫裝置記憶：唱片櫃點某張唱片是針對那一張的動作，
  // 不該順手把對戰／試煉的自動播放也打開（否則下次邊聽串流邊開對戰又會被搶）。
  // 要寫進裝置記憶的是音樂開關，走 setAutoplayPreference(true)。
  function grantAutoplayConsent() {
    if (autoplayConsent) return false;
    autoplayConsent = true;
    state = { ...state, consent: true };
    try { if (PERSIST_SESSION_CONSENT) sessionStorage.setItem(AUTOPLAY_CONSENT_KEY, '1'); } catch (_) {}
    return true;
  }

  // 店主自己按下靜音，或偵測到串流把焦點搶回去。兩者都要記進裝置，下次不再自動出聲。
  function setAutoplayPreference(enabled) {
    if (enabled) { writeAutoplayMemory('on'); return grantAutoplayConsent(); }
    writeAutoplayMemory('off');
    autoplayConsent = false;
    state = { ...state, consent: false };
    try { if (PERSIST_SESSION_CONSENT) sessionStorage.removeItem(AUTOPLAY_CONSENT_KEY); } catch (_) {}
    releaseAudio();
    return true;
  }

  function onAutoplayRevoked(callback) {
    if (typeof callback !== 'function') return () => {};
    revokeListeners.add(callback);
    return () => revokeListeners.delete(callback);
  }

  // 偵測到別的 App 把音訊焦點拿回去。系統只通知「輸的一方」，所以我們偵測得到
  // 自己被中斷（iOS：AudioContext 轉 interrupted；Android：播放中被系統 suspend），
  // 但偵測不到「我們蓋過別人」——後者只能靠每場開聲時的提示涵蓋。
  function revokeAutoplayByInterruption(reason) {
    if (!autoplayConsent) return false;
    setAutoplayPreference(false);
    revokeListeners.forEach(listener => { try { listener({ reason }); } catch (_) {} });
    return true;
  }

  // 徹底把音訊交還給系統：停試聽、停靜音 keep-alive、拆掉媒體卡片、suspend AudioContext。
  // 少了任何一項，Spotify 那邊按播放後仍可能被我們這頁再搶一次。
  function releaseAudio() {
    clearTimeout(keepAliveTimer);
    try { stop(); } catch (_) {}
    try {
      if (previewAudio) {
        previewAudio.loop = false;
        if (!previewAudio.paused) previewAudio.pause();
        previewAudio.removeAttribute('src');
        previewAudio.load?.();
      }
    } catch (_) {}
    clearMediaSession();
    try { if (audioCtx && audioCtx.state === 'running') audioCtx.suspend?.(); } catch (_) {}
  }

  function emit(next) {
    state = { ...state, ...next };
    syncMediaSession(state);
    listeners.forEach(listener => { try { listener({ ...state }); } catch (_) {} });
  }

  // 鎖定畫面／通知列的媒體卡片。不主動設定時，Android Chrome 會自己抓頁面標題與
  // 網站圖示充當 metadata，於是把瀏覽器收起來後鎖屏會留一則掛著 dip logo 的播放器；
  // 更糟的是試聽結束後那則通知不會自己消失，按下它的播放鍵只會喚醒靜音 keep-alive
  // （顯示在播、實際沒聲音）。這裡在真的出聲時填入專輯資訊，播完或停止就銷毀 session。
  function syncMediaSession(current) {
    if (current.status === 'playing') setMediaSession(current);
    else if (current.status === 'stopped' || current.status === 'error' || current.status === 'idle') clearMediaSession();
  }

  const MEDIA_ACTIONS = ['play', 'pause', 'stop', 'previoustrack', 'nexttrack', 'seekbackward', 'seekforward', 'seekto'];

  function setMediaSession({ artist = '', album = '', trackName = '', cover = '' } = {}) {
    const session = navigator.mediaSession;
    if (!session) return;
    try {
      if (typeof window.MediaMetadata === 'function') {
        session.metadata = new window.MediaMetadata({
          title: trackName || album || 'dip vinyl 試聽',
          artist, album,
          artwork: /^https?:\/\//i.test(String(cover)) ? [{ src: cover, sizes: '512x512' }] : []
        });
      }
      session.playbackState = 'playing';
    } catch (_) {}
    // 只掛停止類動作。30 秒試聽是一次性的 AudioBufferSource，沒有可回復的「繼續播放」，
    // 因此刻意不註冊 play——沒有 play handler，鎖屏就不會給出按了不會出聲的播放鍵。
    const stopFromLockScreen = () => { try { stop({ fade: true }); } catch (_) {} };
    MEDIA_ACTIONS.forEach(action => {
      const handler = action === 'pause' || action === 'stop' ? stopFromLockScreen : null;
      try { session.setActionHandler(action, handler); } catch (_) {}
    });
    mediaSessionActive = true;
  }

  function clearMediaSession() {
    const session = navigator.mediaSession;
    const hadSession = mediaSessionActive;
    mediaSessionActive = false;
    if (session) {
      MEDIA_ACTIONS.forEach(action => { try { session.setActionHandler(action, null); } catch (_) {} });
      try { session.playbackState = 'none'; } catch (_) {}
      try { session.metadata = null; } catch (_) {}
    }
    // playbackState='none' 只是把卡片標成非播放中，Chrome 仍會把它留在鎖定畫面上。
    // 要讓它真的收掉，必須拆掉還掛著音源的 <audio>。keep-alive 這時已經暫停，拆 src
    // 不影響下一次播放：primePreviewFromGesture 每次都會重新指定 src 再 play。
    if (previewAudio && (hadSession || previewAudio.getAttribute('src'))) {
      try {
        previewAudio.loop = false;
        if (!previewAudio.paused) previewAudio.pause();
        previewAudio.removeAttribute('src');
        previewAudio.load?.();
      } catch (_) {}
    }
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
      /* 自動播放提示：position:fixed 而非 absolute——不必要求呼叫頁的容器是定位元素，
         也保證完全不參與版面計算（對戰頁是「一屏不滾動」的版面，不能被推擠）。 */
      .dip-autoplay-hint{position:fixed;z-index:9999;max-width:calc(100vw - 24px);background:#fff;color:#111;border:1px solid #111;padding:5px 9px;font-family:'Space Mono',ui-monospace,monospace;font-size:9px;line-height:1.5;letter-spacing:.08em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;box-shadow:2px 2px 0 #111;pointer-events:none;opacity:0;transform:translateY(-4px);transition:opacity .35s ease,transform .35s ease}
      .dip-autoplay-hint::before{content:'';position:absolute;top:-4px;right:var(--dip-hint-arrow,16px);width:6px;height:6px;background:#fff;border-left:1px solid #111;border-top:1px solid #111;transform:rotate(45deg)}
      .dip-autoplay-hint.is-shown{opacity:1;transform:translateY(0)}
      .dip-autoplay-toggle{font-family:'Space Mono',ui-monospace,monospace;font-size:12px;line-height:1;background:none;border:1px solid currentColor;padding:5px 7px;cursor:pointer;color:inherit;transition:opacity .15s}
      .dip-autoplay-toggle.is-muted{opacity:.45}
    `;
    document.head.appendChild(style);
  }

  let hintShowTimer = null, hintFadeTimer = null, hintNode = null;

  // 錨在音樂開關下方浮 4 秒的小提示。三種用途：裝置首次造訪告知有這功能、
  // 每場第一首自動試聽出聲時告知怎麼關、偵測到串流搶回焦點後告知已自動停用。
  function showHint(anchor, text, { duration = 4000 } = {}) {
    if (!anchor?.getBoundingClientRect || !text) return false;
    addStyle();
    clearTimeout(hintShowTimer);
    clearTimeout(hintFadeTimer);
    if (!hintNode) {
      hintNode = document.createElement('div');
      hintNode.className = 'dip-autoplay-hint';
      hintNode.setAttribute('role', 'status');
      document.body.appendChild(hintNode);
    }
    hintNode.classList.remove('is-shown');
    hintNode.textContent = text;
    const rect = anchor.getBoundingClientRect();
    if (!rect.width && !rect.height) return false;
    hintNode.style.top = `${Math.round(rect.bottom + 6)}px`;
    hintNode.style.right = `${Math.max(6, Math.round(window.innerWidth - rect.right))}px`;
    // 箭頭對準錨點中心：泡泡右緣與開關右緣切齊，中心即距右緣半個開關寬。
    hintNode.style.setProperty('--dip-hint-arrow', `${Math.max(6, Math.round(rect.width / 2 - 3))}px`);
    hintShowTimer = setTimeout(() => hintNode?.classList.add('is-shown'), 60);
    hintFadeTimer = setTimeout(() => hintNode?.classList.remove('is-shown'), 60 + duration);
    return true;
  }

  // ───────── 共用的自動播放開關 ─────────
  // 每個有內建試聽的介面都需要同一組行為：開關圖示、三種提示、狀態同步、碰撞偵測後
  // 自動回到靜音。過去這些在 battle 與 roguelike 各手刻一份，而**手刻的版本就是漏掉
  // 授權檢查的來源**（碰一下卡片就停掉店主的串流）。改成這裡出一份，新增試聽介面
  // 只要 createToggle() 就有完整且一致的行為。
  const HINT_SEEN_KEY = 'dip:autoplay-hint-seen';
  let autoHintShownThisVisit = false;
  const DEFAULT_TOGGLE_HINTS = {
    first: '♪ 點這裡開啟自動試聽',
    auto: '♪ 自動試聽中 · 點這裡可關閉',
    revoked: '偵測到你在聽其他音樂 · 已暫停自動試聽'
  };

  function createToggle(container, options = {}) {
    if (!container?.appendChild) return null;
    addStyle();
    const hints = { ...DEFAULT_TOGGLE_HINTS, ...(options.hints || {}) };
    const button = document.createElement('button');
    button.type = 'button';
    button.className = ['dip-autoplay-toggle', options.className || ''].filter(Boolean).join(' ');
    const sync = () => {
      const on = autoplayPreference() === 'on';
      button.textContent = on ? '🔊' : '🔇';
      button.setAttribute('aria-pressed', String(on));
      button.setAttribute('aria-label', on ? '關閉自動試聽' : '開啟自動試聽');
      button.classList.toggle('is-muted', !on);
    };
    button.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      const enable = autoplayPreference() !== 'on';
      setAutoplayPreference(enable);
      sync();
      if (enable) {
        // 這一下就是使用者的授權手勢，順手把音訊武裝起來（iOS 只認同步手勢）。
        unlock();
        autoHintShownThisVisit = true;
        showHint(button, hints.auto);
      }
      try { options.onToggle?.(enable); } catch (_) {}
    });
    container.appendChild(button);
    sync();
    // 每次造訪第一次真的出聲時提示一次關閉方法。偵測不到「我們蓋過別人的串流」
    // （系統只通知被搶的一方），所以用「每次造訪開聲必提示」把那個情境涵蓋進來。
    const offState = onStateChange(state => {
      sync();
      if (!autoHintShownThisVisit && state.status === 'playing') {
        autoHintShownThisVisit = true;
        showHint(button, hints.auto);
      }
    });
    const offRevoke = onAutoplayRevoked(() => { sync(); showHint(button, hints.revoked); });
    // 裝置從未表態：靜音，但要讓玩家知道有這個功能。整台裝置只提示一次。
    if (autoplayPreference() === 'unset') {
      let seen = false;
      try { seen = localStorage.getItem(HINT_SEEN_KEY) === '1'; } catch (_) {}
      if (!seen) {
        try { localStorage.setItem(HINT_SEEN_KEY, '1'); } catch (_) {}
        setTimeout(() => showHint(button, hints.first), 900);
      }
    }
    return {
      el: button,
      sync,
      destroy() { offState(); offRevoke(); button.remove(); }
    };
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
    // 2026-08-10 斷路：原本每次載入就先建好 Spotify 與 YouTube 兩個 iframe 播放器來預熱。
    // 但 2026-07-23 起 order 只剩 iTunes、固定 YouTube 的卡也刻意靜音，這兩個播放器
    // 全站都不會用到——留著只有壞處：
    //   Spotify 嵌入本身就是一台連著使用者帳號的播放器。stop() 裡的
    //   spotifyController?.pause?.() 會對它送出暫停，於是「點卡片開／關資訊」這種
    //   完全不出聲的操作，也會把店主正在聽的 Spotify 停掉——而且因為我們從未取得
    //   音訊焦點，鎖定畫面的媒體卡片仍顯示 Spotify，看起來完全不像我們幹的。
    // playSpotify／playYoutube 仍會在需要時自己 lazy 建立，恢復 order 不必改這裡。
    if (EAGER_IFRAME_PLAYERS) {
      void ensureController(SPOTIFY_PLACEHOLDER);
      void ensureYoutubePlayer();
    }
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
      youtubeEngaged = true;
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
        watchAudioInterruption(audioCtx);
      } catch (_) { audioCtx = null; previewGain = null; }
    }
    // 只在有授權時才 resume。建立一個 suspended 的 context 不會驚動系統，但
    // **resume 會向系統要走音訊焦點**、停掉玩家正在聽的串流。抽卡時的 warmAlbum
    // 預先解碼就是走到這裡，於是「還沒開試聽、只是抽了一張牌」也會把 Spotify 停掉。
    if (!autoplayConsent) return;
    if (audioCtx && audioCtx.state !== 'running') { try { audioCtx.resume?.()?.catch?.(() => {}); } catch (_) {} }
  }

  // 串流把音訊焦點搶回去時，我們這邊會被系統中斷：iOS Safari 把 AudioContext 轉成
  // 'interrupted'，Android Chrome 則是在播放中被 suspend。只在「自認正在播」時才判定，
  // 否則分頁切到背景造成的正常 suspend 會被誤判成使用者要聽串流。
  // 已知取捨：Android 只給得出 'suspended'，分不出「別的 App 搶走」與「使用者把瀏覽器
  // 切到背景」。這裡刻意兩者都視為要閉嘴——店主的第一優先是不打斷串流，誤判的代價
  // 只是下次要再點一下 🔊，漏判的代價卻是繼續被打斷。
  // 不會無限遞迴：revoke → releaseAudio → stop() 先把 previewBufferSource 清成 null，
  // 接著自己呼叫的 suspend() 再觸發 statechange 時就會在第一行被擋下。
  function watchAudioInterruption(ctx) {
    try {
      ctx.addEventListener?.('statechange', () => {
        if (!previewBufferSource) return;
        if (ctx.state === 'interrupted' || ctx.state === 'suspended') revokeAutoplayByInterruption(ctx.state);
      });
    } catch (_) {}
  }

  // 靜音 keep-alive 只是為了讓 iOS 在「下載＋解碼」的空窗期不要收掉 audio session。
  // 若武裝之後遲遲沒有真的試聽起播（使用者只是點了介面、最後沒播成），它會一直
  // 循環播放並持續佔著音訊焦點，Spotify 就一直被壓著。逾時就自己放手。
  function armKeepAliveRelease() {
    clearTimeout(keepAliveTimer);
    keepAliveTimer = setTimeout(() => {
      if (previewBufferSource) return;
      try {
        if (previewAudio && !previewAudio.paused) {
          previewAudio.loop = false;
          previewAudio.pause();
          previewAudio.removeAttribute('src');
          previewAudio.load?.();
        }
      } catch (_) {}
    }, 8000);
  }

  // 切到別的 App／別的分頁而我們沒在播 → 沒有理由再佔著音訊焦點。
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState !== 'hidden' || previewBufferSource) return;
    try {
      if (previewAudio && !previewAudio.paused) {
        previewAudio.loop = false;
        previewAudio.pause();
        previewAudio.removeAttribute('src');
        previewAudio.load?.();
      }
    } catch (_) {}
  });

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

  // 最近一次真實使用者手勢。navigator.userActivation 是主要判斷（Safari 對手勢
  // 授權的認定比 Chrome 嚴格得多，它自己回報最準）；舊 iOS 沒這個 API，退回自己
  // 記的時間戳。capture 監聽只寫時間戳，永不移除。
  let lastGestureAt = 0;
  ['pointerdown', 'touchstart', 'click', 'keydown'].forEach(type =>
    document.addEventListener(type, event => { if (event.isTrusted) lastGestureAt = Date.now(); }, true));
  function inUserGesture() {
    const activation = navigator.userActivation;
    if (activation && typeof activation.isActive === 'boolean') return activation.isActive;
    return Date.now() - lastGestureAt < 1000;
  }

  function primePreviewFromGesture() {
    if (!root) return false;
    try {
      const audio = ensurePreviewAudio();
      ensurePreviewGraph();
      // 武裝就開始倒數：8 秒內沒有真的試聽起播就放掉焦點，別一直壓著別人的串流。
      armKeepAliveRelease();
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
      // 手勢外絕不重新武裝還在播的 keep-alive：那個 pause 會停掉唯一在發聲的元素，
      // 接著的 play() 又會被瀏覽器拒絕（手機必中），於是往後 1〜3 秒的下載＋解碼期間
      // 完全沒有音訊輸出，iOS 收掉 audio session，source.start(0) 就悄悄沒有聲音，
      // 狀態卻照樣回報 playing——「第一次抽牌顯示在播卻沒聲音、暫停再播才有」正是這樣來的。
      // 自動播放路徑（抽到卡就播）呼叫 unlock() 時一定不在手勢內，這裡直接放行既有 session。
      if (!audio.paused && !inUserGesture()) return true;
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
    // 斷路：掛上這組全域監聽，等於使用者在站上點任何東西（翻卡、開選單、捲頁）
    // 都會武裝音訊並向系統要走焦點，正在聽 Spotify 的人一進站就被打斷。
    // 武裝已改為只發生在 unlock()——播放鍵與音樂開關的手勢裡。
    if (!GLOBAL_GESTURE_ARM) return;
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

  // youtube 預設關閉：primeYoutubeFromGesture 會真的以 1% 音量播一小段來解鎖，
  // 同樣會搶走音訊焦點，而目前沒有任何頁面靠 YouTube 出聲（order 只剩 itunes）。
  //
  // 2026-08-10：授權檢查移到這裡，而不是散在各頁的呼叫點。
  // 「武裝」＝讓靜音 keep-alive 開始播放＝向系統要走音訊焦點＝停掉店主正在聽的串流。
  // 過去有好幾個呼叫點根本不看音樂開關就武裝（試煉手牌的 pointerdown、兩頁的出牌
  // 流程），於是「手指碰一下卡片」就把 Spotify 停掉；又因為後續播放被開關擋下、
  // 從未進入 playing，媒體通知不會被取代，看起來完全不像網頁幹的。
  // 在這裡統一擋掉，往後新增呼叫點也不會再犯同一個錯。
  // grant=true 專給「使用者明確點了某張唱片要聽」（唱片櫃／搜尋頁）——那是本次造訪的
  // 授權，不寫裝置記憶，不會順手把對戰／試煉的自動播放也打開。
  function unlock({ youtube = UNLOCK_YOUTUBE_DEFAULT, grant = false } = {}) {
    if (grant) grantAutoplayConsent();
    if (!autoplayConsent) return false;
    const previewReady = primePreviewFromGesture();
    const youtubeReadyNow = youtube ? primeYoutubeFromGesture() : false;
    return previewReady || youtubeReadyNow;
  }

  function spotifyAlbumId(url) {
    try { return new URL(url).pathname.match(/\/album\/([a-zA-Z0-9]+)/)?.[1] || ''; } catch (_) { return ''; }
  }

  // 卡片可在受管理員寫入規則保護的 album_overrides 存固定試聽連結（previewUrl），
  // 不必每次即時查來源。不要放在任何人都能寫入的 card_catalog。
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

  // 預先下載＋解碼下一張要播的試聽。沒有授權就整條不跑——它會建立音訊圖並 resume，
  // 等於在玩家還沒同意出聲前就搶走音訊焦點（抽卡預熱一度是停掉店主 Spotify 的元凶之一）。
  async function warmAlbum({ artist = '', album = '' } = {}) {
    if (!autoplayConsent) return null;
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
      if (youtubeEngaged) youtubePlayer?.pauseVideo?.();
      controller.pause?.();
      setProvider('spotify');
      const started = waitForSpotifyPlayback(controller, token);
      if (typeof controller.loadEntity === 'function') controller.loadEntity(uri);
      else controller.loadUri?.(uri);
      spotifyEngaged = true;   // 從這一刻起，對這台嵌入送 pause 停的才是我們自己的播放
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
      if (spotifyEngaged) spotifyController?.pause?.();
      if (youtubeEngaged) youtubePlayer?.pauseVideo?.();
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
    grantAutoplayConsent();  // 點播放列表的某一首＝使用者自己要出聲
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
      if (spotifyEngaged) spotifyController?.pause?.();
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
      youtubeEngaged = true;
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

  async function playAlbum({ artist = '', album = '', prefer = 'auto', previewUrl = '', attribution = '', fixedOnly = false, cover = '', auto = false } = {}) {
    artist = String(artist).trim();
    album = String(album).trim();
    if (!artist || !album || !root) return false;
    // auto=true 是系統自己決定要出聲（抽到卡、出牌）。沒有授權就安靜地不播，
    // 且回報 stopped 而非 error——介面要停在「可播放」而不是跳找不到試聽的提示。
    if (auto && !autoplayConsent) {
      emit({ status:'stopped', provider:null, artist, album, cover:String(cover || ''), trackName:'', storeUrl:'', attribution:'', code:'NO-AUTOPLAY', tracks:[], trackId:'' });
      return false;
    }
    // 使用者自己按的播放＝授權本次造訪的後續自動播放。
    if (!auto) grantAutoplayConsent();
    const token = ++requestId;
    lastFailCode = '';
    // cover 只餵給鎖定畫面的媒體卡片；沒帶就留空，Chrome 會退回無封面而不是抓網站 logo。
    emit({ status: 'loading', provider: null, artist, album, cover: String(cover || ''), trackName:'', storeUrl:'', attribution:'', code:'' });
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
        // 2026-07-23 店主決定：YouTube iframe 無法淡入淡出（音量控不了），
        // 固定連結是 YT 的卡暫時不播音樂——安靜停下，不退回即時搜尋。
        if (token === requestId) {
          setProvider(null);
          emit({ status:'stopped', provider:null, artist, album, code:'YT-MUTED', tracks:[], trackId:'' });
        }
        return false;
      }
      // 已完成人工覆核的卡片只准用固定來源：連結失效或明確標成無來源時，
      // 直接停止，不再為同一張卡臨時呼叫 Apple／YouTube／Spotify 搜尋。
      if (fixedOnly) {
        if (token === requestId) {
          setProvider(null);
          emit({ status:'error', provider:null, artist, album, code:lastFailCode || 'S11', tracks:[], trackId:'' });
        }
        return false;
      }
      // 固定連結失效（檔案被刪、影片下架）→ 照舊走原本的來源查詢，不要讓卡片直接沒聲音。
      const entry = linkEntry(artist, album);
      // 2026-07-23 店主決定：YouTube／Spotify 的 iframe 都無法淡入淡出，
      // 暫時只保留 iTunes（Web Audio 路徑）；查無 iTunes 試聽的卡先不播音樂。
      // 原本的混合退階（iTunes→YouTube→Spotify）保留在 git 歷史，恢復時把 order 換回即可。
      const order = ['itunes'];
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
      try { if (spotifyEngaged) spotifyController?.pause?.(); } catch (_) {}
      try { if (youtubeEngaged) youtubePlayer?.pauseVideo?.(); } catch (_) {}
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

  // 現場診斷用（前台 ?audiodebug=1）：狀態機說「在播」但實際沒聲音時，
  // 只有這幾個底層數值分得出「沒起播」「起播了但 context 被停住」「gain 沒拉起來」。
  function debugState() {
    return {
      ctx: audioCtx ? audioCtx.state : 'none',
      t: audioCtx ? Number(audioCtx.currentTime.toFixed(2)) : -1,
      gain: previewGain ? Number(previewGain.gain.value.toFixed(3)) : -1,
      keepAlive: previewAudio ? (previewAudio.paused ? 'paused' : 'playing') : 'none',
      primed: previewPrimed,
      playing: !!previewBufferSource,
      gesture: inUserGesture(),
      code: lastFailCode || '',
      status: state.status,
    };
  }

  window.DipPlayer = {
    mount, unlock, prefetch, warmAlbum, playAlbum, playTrack, stop, onStateChange, debugState,
    hasAutoplayConsent, grantAutoplayConsent,
    autoplayPreference, setAutoplayPreference, onAutoplayRevoked, releaseAudio, showHint, createToggle
  };
})();
