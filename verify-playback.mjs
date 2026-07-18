import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

class MockClassList {
  constructor() { this.values = new Set(); }
  add(...names) { names.forEach(name => this.values.add(name)); }
  remove(...names) { names.forEach(name => this.values.delete(name)); }
  toggle(name, force) {
    const enabled = force === undefined ? !this.values.has(name) : !!force;
    if (enabled) this.values.add(name); else this.values.delete(name);
    return enabled;
  }
}

class MockElement extends EventTarget {
  constructor(tagName = 'div') {
    super();
    this.tagName = tagName.toUpperCase();
    this.children = [];
    this.parentNode = null;
    this.classList = new MockClassList();
    this.dataset = {};
    this.style = {};
    this.id = '';
  }
  appendChild(child) {
    child.parentNode = this;
    this.children.push(child);
    return child;
  }
  append(...children) { children.forEach(child => this.appendChild(child)); }
  remove() {
    if (!this.parentNode) return;
    this.parentNode.children = this.parentNode.children.filter(child => child !== this);
    this.parentNode = null;
  }
  setAttribute(name, value) { this[name] = String(value); }
}

class MockAudio extends MockElement {
  constructor() {
    super('audio');
    this.src = '';
    this.currentTime = 0;
    this.paused = true;
    this.unlocked = false;
    this.loop = false;
  }
  load() {}
  pause() {
    this.paused = true;
    if (this.src.startsWith('blob:')) this.unlocked = false;
  }
  play() {
    if (this.src.startsWith('blob:')) this.unlocked = true;
    if (!this.unlocked) return Promise.reject(new Error('NotAllowedError'));
    this.paused = false;
    queueMicrotask(() => this.dispatchEvent(new Event('playing')));
    return Promise.resolve();
  }
}

const elements = new Map();
const audioElements = [];
let randomValue = 0;
let youtubePlayer = null;
const fetchCalls = [];
const scriptRequests = [];

class MockYoutubePlayer {
  constructor(_host, options) {
    this.videoId = options.videoId;
    this.state = 2;
    this.lastLoad = null;
    youtubePlayer = this;
    queueMicrotask(() => options.events.onReady());
  }
  pauseVideo() { this.state = 2; }
  playVideo() { this.state = 1; }
  unMute() {}
  setVolume() {}
  setShuffle() {}
  setLoop() {}
  getPlayerState() { return this.state; }
  getVideoData() { return { video_id: this.videoId }; }
  getPlaylistId() { return ''; }
  loadPlaylist() {}
  loadVideoById(options) {
    this.lastLoad = options;
    // Deliberately retain the old video briefly. The player must not report success
    // until getVideoData() identifies the newly requested video.
    setTimeout(() => { this.videoId = options.videoId; }, 120);
  }
}

const spotifyController = {
  listeners: new Map(),
  addListener(name, callback) { this.listeners.set(name, callback); },
  removeListener(name) { this.listeners.delete(name); },
  pause() {},
  play() { queueMicrotask(() => this.listeners.get('playback_started')?.()); },
  loadEntity() {}
};

const document = {
  documentElement: new MockElement('html'),
  head: new MockElement('head'),
  createElement(tag) {
    if (tag === 'audio') {
      const audio = new MockAudio();
      audioElements.push(audio);
      return audio;
    }
    return new MockElement(tag);
  },
  getElementById(id) { return elements.get(id) || null; },
  addEventListener() {},
  removeEventListener() {}
};

const originalAppend = document.head.appendChild.bind(document.head);
document.head.appendChild = child => {
  originalAppend(child);
  if (child.id) elements.set(child.id, child);
  if (String(child.src || '').includes('spotify.com/embed')) {
    queueMicrotask(() => context.window.onSpotifyIframeApiReady?.({
      createController(_host, _options, ready) { ready(spotifyController); }
    }));
  }
  if (String(child.src || '').startsWith('https://itunes.apple.com/') && new URL(child.src).searchParams.has('callback')) {
    scriptRequests.push(String(child.src));
    const callback = new URL(child.src).searchParams.get('callback');
    setTimeout(() => context.window[callback]?.(sourceFor(child.src)), 80);
    setTimeout(() => child.onload?.(), 100);
  }
  return child;
};

function sourceFor(url) {
  const parsed = new URL(url);
  const artist = parsed.searchParams.get('artist');
  if (parsed.hostname === 'itunes.apple.com') {
    const term = parsed.searchParams.get('term') || '';
    const artistName = term.includes('Artist A') ? 'Artist A' : 'Artist B';
    const albumName = term.includes('Album A') ? 'Album A' : 'Album B';
    const ids = artistName === 'Artist A' ? ['a1','a2'] : ['b1'];
    return { resultCount:ids.length, results:ids.map((id, index) => ({
      kind:'song', trackId:id, trackName:id === 'a1' ? 'A One' : id === 'a2' ? 'A Two' : 'B One',
      trackNumber:index + 1, trackTimeMillis:30000, previewUrl:`https://audio/${id}.m4a`,
      trackViewUrl:`https://music/${id}`, artistName, collectionName:albumName
    })) };
  }
  if (parsed.pathname.endsWith('/itunes-album-preview')) {
    return artist === 'Artist A' ? {
      tracks: [
        { id:'a1', trackName:'A One', previewUrl:'https://audio/a1.m4a', storeUrl:'https://music/a1' },
        { id:'a2', trackName:'A Two', previewUrl:'https://audio/a2.m4a', storeUrl:'https://music/a2' }
      ]
    } : { tracks:[{ id:'b1', trackName:'B One', previewUrl:'https://audio/b1.m4a', storeUrl:'https://music/b1' }] };
  }
  if (parsed.pathname.endsWith('/yt-music-link')) {
    if (artist === 'Artist C') return {}; // C 專供「iTunes 與 YouTube 都失敗」的代碼測試
    return artist === 'Artist A'
      ? { url:'https://youtube.com/playlist?list=OLA-A', highlight:{ videoId:'AAAAAAAAAAA', title:'Popular A', duration:141, views:100 } }
      : { url:'https://youtube.com/playlist?list=OLA-B', highlight:{ videoId:'BBBBBBBBBBB', title:'Popular B', duration:254, views:200 } };
  }
  return {};
}

const mockMath = Object.create(Math);
mockMath.random = () => randomValue;
const context = {
  window: { YT:{ Player:MockYoutubePlayer } },
  document,
  navigator: { userAgent:'Desktop test', platform:'Win32', maxTouchPoints:0 },
  location: { origin:'http://localhost:5179' },
  fetch: async url => { fetchCalls.push(String(url)); return { ok:true, json:async () => sourceFor(url) }; },
  URL,
  URLSearchParams,
  Blob,
  Event,
  EventTarget,
  Math: mockMath,
  Promise,
  Map,
  Set,
  String,
  Number,
  Array,
  Object,
  encodeURIComponent,
  setTimeout,
  clearTimeout,
  setInterval,
  clearInterval,
  queueMicrotask
};
context.window.window = context.window;

vm.runInNewContext(fs.readFileSync(new URL('./dip-player.js', import.meta.url), 'utf8'), context, { filename:'dip-player.js' });
const player = context.window.DipPlayer;
const mount = new MockElement('div');
assert.ok(player.mount(mount, { hidden:true }), 'player mounts');
await wait(10);

const states = [];
player.onStateChange(state => states.push({ ...state, at:Date.now() }));

// The click handler calls unlock() before an uncached JSONP lookup. The same audio
// element must remain authorized after that asynchronous lookup completes on iOS.
player.unlock();
assert.equal(await player.playAlbum({ artist:'Artist A', album:'Album A', prefer:'itunes' }), true);
assert.equal(states.at(-1).provider, 'itunes');
assert.equal(states.at(-1).trackName, 'A One');
assert.equal(audioElements[0].src, 'https://audio/a1.m4a');
assert.equal(audioElements[0].loop, false);

// Repeating the same album excludes the immediately previous preview when possible.
player.unlock();
assert.equal(await player.playAlbum({ artist:'Artist A', album:'Album A', prefer:'itunes' }), true);
assert.equal(states.at(-1).trackName, 'A Two');

// Switching albums must replace the actual audio source, never replay the old album.
await player.prefetch({ artist:'Artist B', album:'Album B', spotify:false, youtube:false, itunes:true });
player.unlock();
assert.equal(await player.playAlbum({ artist:'Artist B', album:'Album B', prefer:'itunes' }), true);
assert.equal(states.at(-1).album, 'Album B');
assert.equal(audioElements[0].src, 'https://audio/b1.m4a');
assert.ok(scriptRequests.some(url => url.startsWith('https://itunes.apple.com/search?')), 'iTunes is loaded through browser JSONP');
assert.ok(!fetchCalls.some(url => url.startsWith('https://itunes.apple.com/search?')), 'preview lookup does not depend on CORS fetch headers');
assert.ok(!fetchCalls.some(url => url.includes('/itunes-album-preview')), 'preview playback does not depend on a rate-limited Worker hop');

// 唱盤下方播放列表：playing 狀態要帶曲目摘要；點列表指定曲目要用同一顆已解鎖元件強制換源。
assert.equal(JSON.stringify(states.at(-1).tracks), JSON.stringify([{ id:'b1', trackName:'B One' }]));
player.unlock();
assert.equal(await player.playAlbum({ artist:'Artist A', album:'Album A', prefer:'itunes' }), true);
assert.equal(await player.playTrack('a2'), true);
assert.equal(states.at(-1).trackName, 'A Two');
assert.equal(states.at(-1).trackId, 'a2');
assert.equal(audioElements[0].src, 'https://audio/a2.m4a');

await player.prefetch({ artist:'Artist A', album:'Album A', spotify:false, youtube:true });
player.unlock();
assert.equal(await player.playAlbum({ artist:'Artist A', album:'Album A', prefer:'youtube' }), true);
assert.equal(youtubePlayer.getVideoData().video_id, 'AAAAAAAAAAA');

await player.prefetch({ artist:'Artist B', album:'Album B', spotify:false, youtube:true });
randomValue = 0.5;
const switchedAt = Date.now();
player.unlock();
assert.equal(await player.playAlbum({ artist:'Artist B', album:'Album B', prefer:'youtube' }), true);
const finalState = states.at(-1);
assert.equal(finalState.album, 'Album B');
assert.equal(finalState.trackName, 'Popular B');
assert.ok(finalState.at - switchedAt >= 100, 'old playing video was not accepted as the new album');
assert.deepEqual(
  { videoId:youtubePlayer.lastLoad.videoId, startSeconds:youtubePlayer.lastLoad.startSeconds, endSeconds:youtubePlayer.lastLoad.endSeconds },
  { videoId:'BBBBBBBBBBB', startSeconds:112, endSeconds:142 }
);

// 失敗代碼：首次真查詢要標出配對失敗（S4:n），重試窗內再點要回報 S8（快取空結果），不能沒有代碼。
player.unlock();
assert.equal(await player.playAlbum({ artist:'Artist C', album:'Album C', prefer:'itunes' }), false);
assert.match(states.at(-1).code, /^S4:/);
player.unlock();
assert.equal(await player.playAlbum({ artist:'Artist C', album:'Album C', prefer:'itunes' }), false);
assert.equal(states.at(-1).code, 'S8');

// 混合路徑：prefer itunes 但 iTunes 配對失敗時，要自動退到 YouTube 高觀看曲目並清空曲目列表。
player.unlock();
assert.equal(await player.playAlbum({ artist:'Artist D', album:'Album D', prefer:'itunes' }), true);
assert.equal(states.at(-1).provider, 'youtube');
assert.equal(states.at(-1).trackName, 'Popular B');
assert.equal(states.at(-1).tracks.length, 0);

player.stop();
console.log('PASS  iTunes preview remains authorized after an uncached asynchronous lookup');
console.log('PASS  turntable tracklist exposes tracks and plays a forced selection');
console.log('PASS  failure toast always carries a stage code, including cached-empty replays');
console.log('PASS  itunes preference falls back to YouTube when Apple metadata is unavailable');
console.log('PASS  iTunes random 30-second previews switch to the requested album');
console.log('PASS  YouTube waits for the requested highest-view video before reporting playback');
console.log('PASS  YouTube highlight starts at a random valid point and stops after a 30-second window');
