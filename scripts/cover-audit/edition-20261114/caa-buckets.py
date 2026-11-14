#!/usr/bin/env python3
"""MB 補掃結果分桶：python3 -I caa-buckets.py [--exclude done-keys.json]
讀 rg-scan.json（新掃）＋ catalog／seedmap，對每個 CAA release-group 網址的卡分桶：
  ok-original：現在服務的那筆就是最早有圖的年份（或同年）→ 跳過
  ok-same-era：現服務的跟最早有圖的差 ≤1 年 → 跳過
  review：有更早或其他有圖的版本 → 直接進「挑原版」（NOW＋C1–C3）
  single-late：只有一筆有圖，而且比 RG 最早版本晚 ≥5 年或沒日期 → 要 Discogs 參考圖
  reissue-rg：RG 最早版本比卡上年份晚 ≥3 年（可能釘到重發的 release-group）→ 標記，找圖時查原版 RG
另外 catalog 封面是 CAA release 網址的（rel-scan.json）：該 release 比 RG 最早晚 ≥5 年 → 也進 review（NOW＝那筆 release）
產出：buckets.json（統計＋各桶清單）、flag-caa-review.json（build-decide 的輸入）、targets-single-late.json；並把 MB 版本寫進 prep.json 的 mb 欄
"""
import json, re, os, sys, collections
HERE = os.path.dirname(os.path.abspath(__file__))
J = lambda f: json.load(open(os.path.join(HERE, f), encoding='utf-8'))
cat = J('catalog.json'); sm = J('seedmap.json')
scan = J('rg-scan.json')
rels = J('rel-scan.json') if os.path.exists(os.path.join(HERE, 'rel-scan.json')) else {}
excl = set()
if '--exclude' in sys.argv:
    excl = set(J(sys.argv[sys.argv.index('--exclude') + 1]))


def yr(d):
    m = re.match(r'(\d{4})', d or '')
    return int(m.group(1)) if m else None


prepP = os.path.join(HERE, 'prep-caa.json')
prep = json.load(open(prepP)) if os.path.exists(prepP) else {}
B = collections.defaultdict(list)
review, single, reissue = [], [], []
for rg, e in scan.items():
    if e.get('mbStatus') != 200:
        B['mb-fail'].append(rg); continue
    relmap = {r['id']: r for r in e['releases']}
    front = [r for r in e['releases'] if r['front']]
    served = relmap.get(e.get('served'))
    allyears = [yr(r['date']) for r in e['releases'] if yr(r['date'])]
    rg_first = min(allyears) if allyears else None
    for key in e['cards']:
        if key not in sm or key in excl:
            continue
        s = sm[key]
        if rg_first and s.get('year') and rg_first - int(s['year']) >= 3:
            reissue.append({'key': key, 'rg': rg, 'rgFirst': rg_first, 'cardYear': s['year']})
        if not served:
            B['served-unknown'].append(key); continue
        sy = yr(served['date'])
        fy = [yr(r['date']) for r in front if yr(r['date'])]
        first_art = min(fy) if fy else None
        # 以 RG 最早版本（不論有沒有圖）為準：現服務的在原版年代（差 ≤1 年）才算 ok
        if sy is not None and rg_first is not None and sy - rg_first <= 1:
            B['ok-original'].append(key); continue
        earlier = [r for r in front if yr(r['date']) and (sy is None or yr(r['date']) < sy - 1)]
        if not earlier and len(front) > 1 and sy is None:
            earlier = [r for r in front if r['id'] != served['id']]
        if not earlier:
            B['late-noalt'].append(key); single.append({'key': key, 'artist': s['artist'], 'album': s['album'], 'year': s['year'], 'rg': rg}); continue
        B['review'].append(key)
        prep.setdefault(key, {})['mb'] = {'rg': rg, 'releases': front}
        review.append({'key': key, 'title': f"{s['artist']}《{s['album']}》{s['year']}",
                       'now': f"https://coverartarchive.org/release/{served['id']}/front-250",
                       'nowNote': f"{served['date'][:7]} {served['country']} {served['format'][:8]}",
                       'reason': f"現用 {served['date'] or '無日期'}；RG 最早 {rg_first}；有圖 {len(front)} 筆" + (f"；⚠ RG 最早比卡上年份晚 {rg_first - int(s['year'])} 年，可能是重發的 RG" if rg_first and s.get('year') and rg_first - int(s['year']) >= 3 else ''),
                       'srcLine': f"NOW＝CAA {served['date']} {served['country']} {served['format']} {served['label']} {served['catno']}"})
for rid, e in rels.items():
    r = e.get('rel') or {}
    for key in e.get('cards') or []:
        if key not in sm or key in excl:
            continue
        s = sm[key]; ry = yr(r.get('date')); fy = yr(e.get('rgFirst'))
        if e.get('mbStatus') != 200:
            B['rel-fail'].append(key); continue
        if s.get('year') and fy and fy - int(s['year']) >= 3:
            reissue.append({'key': key, 'rg': e.get('rg'), 'rgFirst': fy, 'cardYear': s['year'], 'via': 'release-url'})
        if ry is None or (fy and ry - fy >= 5):
            B['rel-late'].append(key)
            review.append({'key': key, 'title': f"{s['artist']}《{s['album']}》{s['year']}",
                           'now': f"https://coverartarchive.org/release/{rid}/front-250", 'nowNote': f"{r.get('date', '')[:7]} {r.get('country', '')} {r.get('format', '')[:8]}",
                           'reason': f"現用指定 release {r.get('date') or '無日期'}；RG 最早 {e.get('rgFirst')}", 'srcLine': f"NOW＝CAA release {r.get('date')} {r.get('country')} {r.get('format')} {r.get('label')} {r.get('catno')}",
                           'needMb': e.get('rg')})
        else:
            B['rel-ok'].append(key)
json.dump(prep, open(prepP, 'w'))
json.dump({'counts': {k: len(v) for k, v in B.items()}, 'buckets': B, 'reissue': reissue}, open(os.path.join(HERE, 'buckets.json'), 'w', encoding='utf-8'), ensure_ascii=False)
json.dump(review, open(os.path.join(HERE, 'flag-caa-review.json'), 'w', encoding='utf-8'), ensure_ascii=False)
json.dump(single, open(os.path.join(HERE, 'targets-single-late.json'), 'w', encoding='utf-8'), ensure_ascii=False)
print({k: len(v) for k, v in B.items()}, 'review', len(review), 'single-late', len(single), 'reissue-rg', len(reissue))
