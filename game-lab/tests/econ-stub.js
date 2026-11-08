// game-lab/tests/econ-stub.js：B2 的 e2e 用的 DipLabEcon 替身（SPEC-v4 §3.2 B2、§2.5.2）。真的經濟介面是 B3 的 econ.js，C 整合時換上。
// e2e 把 game-lab/econ.js 的請求換成這份（page.route），載入順序跟真的一樣（ui.js 之前）。
//   configure：收下參數、記起來；bargainPick：直接挑特價箱前三張（呼叫 configure 給的 choose）；openBin 等：記一筆、立即 resolve。
//   window.__econCalls：每個呼叫的紀錄（測試看「點箱子有沒有開抽屜」）。
(function () {
  var cfg = null, calls = window.__econCalls = [];
  var log = function (m, a) { calls.push({ m: m, a: a === undefined ? null : a, t: Date.now() }); };
  window.DipLabEcon = {
    stub: true,
    configure: function (o) { cfg = o; log('configure', Object.keys(o || {}).sort().join(',')); },
    bargainPick: function (o) {
      log('bargainPick', o || null);
      if (!cfg) { console.error('[econ stub] 沒 configure'); return Promise.resolve(null); }
      var r = cfg.run(); if (!r || !r.shop) return Promise.resolve(null);
      var ids = r.shop.bargain.slice(0, 3);
      return new Promise(function (res) { setTimeout(function () { var x = cfg.choose({ type: 'bargainPick', ids: ids }); res(x && x.ok ? ids : null); }, 120); });
    },
    openBin: function (key) { log('openBin', key); return Promise.resolve(); },
    openBargain: function () { log('openBargain'); return Promise.resolve(); },
    openRelicShop: function () { log('openRelicShop'); return Promise.resolve(); },
    moneyHTML: function (n) { return '$' + (n | 0); },
    isOpen: function () { return false; },
    close: function () { log('close'); }
  };
})();
