// c-53 蘇聯／俄語圈：開批前的基建抽驗。
// 計畫裡寫了「先抽驗再決定規模」，這支就是那個抽驗——不先確認 MB／CAA／Apple
// 三邊拿不拿得到東西，就會像 c-46 那樣堆出一批「研究全備、封面全卡」的庫存。
// 每張同時試西里爾原文與羅馬轉寫：卡池目前西里爾掛名為 0，沒有前例可循，
// 這一輪同時也是在測「哪一種寫法在各服務上查得到」。
import fs from 'node:fs';
const UA = { 'User-Agent': 'dip-vinyl-shop/1.0 (kubinice06@gmail.com)' };
const sleep = ms => new Promise(r => setTimeout(r, ms));

const SAMPLE = [
  { ru: 'Кино', en: 'Kino', album_ru: 'Группа крови', album_en: 'Gruppa krovi', year: 1988, line: '蘇聯末期搖滾' },
  { ru: 'Кино', en: 'Kino', album_ru: 'Звезда по имени Солнце', album_en: 'Zvezda po imeni Solntse', year: 1989, line: '蘇聯末期搖滾' },
  { ru: 'Аквариум', en: 'Aquarium', album_ru: 'Радио Африка', album_en: 'Radio Africa', year: 1983, line: '蘇聯末期搖滾' },
  { ru: 'Наутилус Помпилиус', en: 'Nautilus Pompilius', album_ru: 'Разлука', album_en: 'Razluka', year: 1986, line: '蘇聯末期搖滾' },
  { ru: 'Гражданская оборона', en: 'Grazhdanskaya Oborona', album_ru: 'Всё идёт по плану', album_en: 'Vsyo idyot po planu', year: 1988, line: '蘇聯末期搖滾' },
  { ru: 'Владимир Высоцкий', en: 'Vladimir Vysotsky', album_ru: 'Алиса в Стране чудес', album_en: 'Alisa v Strane chudes', year: 1976, line: '吟遊歌謠' },
  { ru: 'Булат Окуджава', en: 'Bulat Okudzhava', album_ru: 'Песни', album_en: 'Pesni', year: 1976, line: '吟遊歌謠' },
  { ru: 'Эдуард Артемьев', en: 'Eduard Artemyev', album_ru: 'Солярис', album_en: 'Solaris', year: 1972, line: '電子與配樂' },
  { ru: 'Эдуард Артемьев', en: 'Eduard Artemyev', album_ru: 'Сталкер', album_en: 'Stalker', year: 1979, line: '電子與配樂' },
  { ru: 'Алла Пугачёва', en: 'Alla Pugacheva', album_ru: 'Зеркало души', album_en: 'Zerkalo dushi', year: 1978, line: 'estrada' },
];

const mb = async (artist, album) => {
  const q = `release-group?query=${encodeURIComponent(`artist:"${artist}" AND releasegroup:"${album}"`)}&fmt=json&limit=5`;
  try {
    const r = await fetch('https://musicbrainz.org/ws/2/' + q, { headers: UA, signal: AbortSignal.timeout(25000) });
    if (!r.ok) return null;
    const j = await r.json();
    const g = (j['release-groups'] || []).filter(x => x.score >= 80)[0];
    return g ? { id: g.id, title: g.title, date: g['first-release-date'] || '', type: g['primary-type'],
                 credit: (g['artist-credit'] || []).map(x => x.name).join(', ') } : null;
  } catch { return null; }
};
const caa = async id => {
  try { const r = await fetch(`https://coverartarchive.org/release-group/${id}/front`, { headers: UA, redirect: 'follow', signal: AbortSignal.timeout(20000) }); return r.ok; }
  catch { return false; }
};
const apple = async (artist, album, fronts) => {
  for (const f of fronts) {
    try {
      const u = `https://itunes.apple.com/search?term=${encodeURIComponent(artist + ' ' + album)}&entity=album&country=${f}&limit=5`;
      const r = await fetch(u, { signal: AbortSignal.timeout(20000) });
      if (!r.ok) continue;
      const j = await r.json();
      if ((j.results || []).length) return { front: f, name: j.results[0].collectionName, artist: j.results[0].artistName };
    } catch {}
    await sleep(300);
  }
  return null;
};

const out = [];
for (const s of SAMPLE) {
  const rec = { ...s, mbRu: null, mbEn: null, caa: false, apple: null };
  rec.mbRu = await mb(s.ru, s.album_ru); await sleep(1100);
  if (!rec.mbRu) { rec.mbEn = await mb(s.en, s.album_en); await sleep(1100); }
  const hit = rec.mbRu || rec.mbEn;
  if (hit) { rec.caa = await caa(hit.id); await sleep(900); }
  rec.apple = await apple(s.en, s.album_en, ['us', 'gb', 'de', 'kz', 'am']);
  out.push(rec);
  console.log(`${s.en}《${s.album_en}》 → MB ${hit ? (rec.mbRu ? '西里爾' : '轉寫') + ' ' + hit.date : '✗'}｜CAA ${rec.caa ? '✓' : '✗'}｜Apple ${rec.apple ? rec.apple.front : '✗'}`);
}
fs.writeFileSync('batch-progress/c53/feasibility.json', JSON.stringify(out, null, 1));
const mbN = out.filter(r => r.mbRu || r.mbEn).length;
console.log(`\nMB ${mbN}/10（西里爾命中 ${out.filter(r=>r.mbRu).length}、轉寫命中 ${out.filter(r=>!r.mbRu&&r.mbEn).length}）｜CAA ${out.filter(r=>r.caa).length}/10｜Apple ${out.filter(r=>r.apple).length}/10`);
