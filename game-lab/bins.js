/* bins.js：由 tools/bake-cards.mjs 產生，請勿手改（改 tools/deck-lists.json 的 bin_<key>／wall_a／wall_b／_bins 後重跑）。
 *   node game-lab/tools/bake-cards.mjs
 * SPEC-v4 §2.2.1：shops.<shop>.<key> = { rule, pool, display? }。rule 看卡片的第一個曲風標籤（first）等；display:true＝牆上展示、不賣。
 * 區名不在這裡（在 shops/<shop>.json）。rnb 8、ost 8、rock 8、jp 8、hiphop 8、elec 8、new 8、cpop 8、jazz 8、tw 8、noise 8、folk 8、wallA 8、wallB 9
 */
(function (root, factory) {
  var bins = factory();
  if (typeof module === 'object' && module.exports) module.exports = bins;
  else root.DipLabBins = bins;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  return {
    version: 4,
    shops: {
      dip: {
        "rnb": {"rule":{"first":["soul"],"regions":["xx"]},"pool":["sly-the-family-stone-fresh","roberta-flack-born-to-love","bobby-womack-the-poet","curtis-mayfield-there-s-no-place-like-america-today","david-bowie-young-americans","the-doobie-brothers-minute-by-minute","millie-jackson-hard-times","ohio-players-tenderness"]},
        "ost": {"rule":{"ost":true},"pool":["goblin-profondo-rosso","久石譲-となりのトトロ-サウンドトラック集","cliff-martinez-drive-original-motion-picture-soundtrack","isaac-hayes-shaft-music-from-the-soundtrack","陳明章-戀戀風塵-電影原聲帶","johann-johannsson-sicario-original-motion-picture-soundtrack","大野雄二-original-soundtrack-from-lupin-iii","john-carpenter-christine"]},
        "rock": {"rule":{"first":["rock"],"regions":["xx"]},"pool":["robert-wyatt-rock-bottom","talk-talk-laughing-stock","mogwai-come-on-die-young","sigur-ros-takk","opeth-morningrise","einsturzende-neubauten-halber-mensch","brian-eno-taking-tiger-mountain-by-strategy","radiohead-the-king-of-limbs"]},
        "jp": {"rule":{"first":["pop","rock","soul","folk","world"],"regions":["jp"]},"pool":["宇多田ヒカル-first-love","大貫妙子-grey-skies","竹内まりや-beginning","細野晴臣-tropical-dandy","吉田美奈子-monochrome","松田聖子-風立ちぬ","はっぴいえんど-はっぴいえんど","りんけんバンド-なんくる"]},
        "hiphop": {"rule":{"first":["hiphop"],"regions":["xx"]},"pool":["janet-jackson-control","dalek-negro-necro-nekros","public-enemy-the-evil-empire-of-everything","usher-confessions","billy-woods-church","nas-god-s-son","brandy-full-moon","missy-elliott-miss-e-so-addictive"]},
        "elec": {"rule":{"first":["electronic"],"regions":["xx"]},"pool":["autechre-tri-repetae","massive-attack-mezzanine","bonobo-dial-m-for-monkey","venetian-snares-detrimentalist","squarepusher-ultravisitor","boards-of-canada-geogaddi","the-chemical-brothers-push-the-button","orbital-blue-album"]},
        "new": {"rule":{"minYear":2020,"regions":["xx"]},"pool":["little-simz-sometimes-i-might-be-introvert","devendra-banhart-flying-wig","nine-inch-nails-ghosts-v-together","beyonce-renaissance","kendrick-lamar-mr-morale-the-big-steppers","armand-hammer-haram","the-weeknd-after-hours","weyes-blood-and-in-the-darkness-hearts-aglow"]},
        "cpop": {"rule":{"first":["pop","folk","rock"],"regions":["tw","zh"]},"pool":["伍佰-china-blue-樹枝孤鳥","蔡琴-蔡琴老歌","王菲-浮躁","張懸-deserts-chang-神的遊戲","五月天-mayday-人生海海","江蕙-紅線","陳建年-大地","宇宙人-地球漫步"]},
        "jazz": {"rule":{"first":["jazz"],"regions":["jp","zh","xx"]},"pool":["thelonious-monk-straight-no-chaser","kenny-drew-everything-i-love","ornette-coleman-this-is-our-music","富樫雅彦-we-now-create-music-for-strings-winds-and-percussions","freddie-hubbard-red-clay","chet-baker-she-was-too-good-to-me","mccoy-tyner-extensions","grant-green-feelin-the-spirit"]},
        "tw": {"rule":{"first":["rock","folk"],"regions":["tw"]},"pool":["林生祥-種樹","傷心欲絕-還是偶爾想要偉大","血肉果汁機-flesh-juicer-gigo","陳珊妮-完美的呻吟","林生祥-野蓮出庄","大象體操-elephant-gym-夢境","落日飛車-sunset-rollercoaster-cassa-nova","宇宙人-一萬小時"]},
        "noise": {"rule":{"first":["rock","electronic","jazz"],"minTop":{"attr":"h","star":4}},"pool":["merzbow-noisembryo","cecil-taylor-conquistador","captain-beefheart-his-magic-band-lick-my-decals-off-baby","faust-so-far","tangerine-dream-zeit","the-fall-grotesque-after-the-gramme","swans-children-of-god","coil-love-s-secret-domain"]},
        "folk": {"rule":{"first":["folk","blues"],"notGenres":["electronic"],"regions":["xx"]},"pool":["leonard-cohen-songs-from-a-room","nico-chelsea-girl","brigitte-fontaine-areski-belkacem-vous-et-nous","mississippi-john-hurt-last-sessions","john-prine-john-prine","steeleye-span-please-to-see-the-king","howlin-wolf-howlin-wolf","john-lee-hooker-it-serve-you-right-to-suffer"]},
        "wallA": {"rule":{"first":["rock","pop"]},"display":true,"pool":["radiohead-ok-computer","cornelius-fantasma","david-bowie-low","fishmans-long-season","the-band-music-from-big-pink","can-ege-bamyasi","雷光夏-summer-lei-黑暗之光","kate-bush-the-dreaming"]},
        "wallB": {"rule":{"first":["jazz","soul"]},"display":true,"pool":["bill-evans-waltz-for-debby","john-coltrane-blue-train","fela-kuti-zombie","stevie-wonder-innervisions","shuggie-otis-inspiration-information","alice-coltrane-journey-in-satchidananda","hermeto-pascoal-zabumbe-bum-a","herbie-hancock-maiden-voyage","sun-ra-space-is-the-place"]}
      }
    }
  };
});
