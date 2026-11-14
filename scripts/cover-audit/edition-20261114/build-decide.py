#!/usr/bin/env python3
"""把「可疑」的卡整理成找原版用的對照：python3 -I build-decide.py <flagged.json> <prefix>
flagged.json：[{key, title, now, reason, src}]（key＝card_catalog docId）
讀 prep.json（MB 有圖的 release、Discogs master／versions），每張卡一列：
  NOW、C1–C3（同 release-group 的 CAA 圖，挑最早的、不同國別優先）、DM（Discogs master 主圖）、D1–D3（Discogs 最早的版本縮圖）
產出：decide/<prefix>-items.json（含每個候選的完整中繼資料）、decide/<prefix>-NNN.jpg（每張 4 列）
"""
import json, sys, os, re
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from sheet import fetch, path_of, wrap, F14, F12, F18  # noqa
from PIL import Image, ImageDraw
import concurrent.futures as cf

HERE = os.path.dirname(os.path.abspath(__file__))
OUTD = os.path.join(HERE, 'decide'); os.makedirs(OUTD, exist_ok=True)
flag = json.load(open(sys.argv[1], encoding='utf-8'))
prefix = sys.argv[2]
prep = json.load(open(os.path.join(HERE, 'prep.json'), encoding='utf-8'))
if os.path.exists(os.path.join(HERE, 'prep-caa.json')):
    for k, v in json.load(open(os.path.join(HERE, 'prep-caa.json'), encoding='utf-8')).items():
        prep.setdefault(k, {}).setdefault('mb', v.get('mb'))
# Discogs：dg-worker 的快取（search:<key> 給 master 主圖、versions:<masterId> 給版本清單）
_dgc = json.load(open(os.path.join(HERE, 'dg-cache.json'))) if os.path.exists(os.path.join(HERE, 'dg-cache.json')) else {}
for f in flag:
    s0 = _dgc.get('search:' + f['key'])
    if s0 and not (prep.get(f['key']) or {}).get('dg'):
        d0 = dict(s0)
        if s0.get('kind') == 'master':
            d0['versions'] = _dgc.get(f"versions:{s0['id']}") or []
        elif s0.get('kind') == 'release':
            d0 = {'kind': 'release', 'img': None, 'versions': [{'id': s0['id'], 'released': str(s0.get('year') or ''), 'country': s0.get('country') or '', 'label': s0.get('label') or '', 'catno': s0.get('catno') or '', 'format': s0.get('format') or '', 'thumb': s0.get('thumb'), 'cover': s0.get('img')}]}
        prep.setdefault(f['key'], {})['dg'] = d0


def yr(d):
    m = re.match(r'(\d{4})', d or '')
    return int(m.group(1)) if m else 9999


items = []
for f in flag:
    p = prep.get(f['key'], {})
    cands = [{'tag': 'NOW', 'url': f['now'], 'note': f.get('nowNote', '')}]
    meta = {'NOW': {'url': f['now']}}
    rels = sorted((p.get('mb') or {}).get('releases') or [], key=lambda r: (yr(r['date']), r['date']))
    nowid = re.search(r'/release/([0-9a-f-]{36})', f['now'])
    nowid = nowid.group(1) if nowid else None
    seen = set(); k = 0
    for r in rels:
        if r['id'] == nowid or k >= 3:
            continue
        sig = (r['date'][:4], r['country'])
        if sig in seen:
            continue
        seen.add(sig); k += 1
        tag = f'C{k}'
        url = f"https://coverartarchive.org/release/{r['id']}/front-250"
        cands.append({'tag': tag, 'url': url, 'note': f"{r['date'][:7]} {r['country']} {r['format'][:10]}"})
        meta[tag] = {'source': 'caa', 'url': f"https://coverartarchive.org/release/{r['id']}/front", 'releaseId': r['id'], **{x: r.get(x) for x in ('date', 'country', 'format', 'label', 'catno', 'title')}}
    d = p.get('dg') or {}
    if d.get('img'):
        cands.append({'tag': 'DM', 'url': d['img'], 'note': f"Discogs master {d.get('year')}"})
        meta['DM'] = {'source': 'discogs-master', 'masterId': d.get('id'), 'mainRelease': d.get('mainRelease'), 'url': d['img'], 'title': d.get('title'), 'year': d.get('year')}
    vs = d.get('versions') or []
    # 最早的三個版本，黑膠優先
    vs_sorted = sorted(vs, key=lambda v: (yr(v.get('released')), 0 if 'Vinyl' in (v.get('format') or '') + (v.get('major') or '') else 1))
    for j, v in enumerate(vs_sorted[:3], 1):
        tag = f'D{j}'
        cands.append({'tag': tag, 'url': v.get('cover') or v['thumb'], 'note': f"{v.get('released', '')[:7]} {v.get('country', '')} {(v.get('format') or '')[:12]}"})
        meta[tag] = {'source': 'discogs-release', 'discogsReleaseId': v['id'], **{x: v.get(x) for x in ('released', 'country', 'label', 'catno', 'format')}}
    items.append({'key': f['key'], 'title': f['title'], 'lines': [f"判定：{f.get('reason', '')}"[:150], f.get('srcLine', '')[:150]],
                  'cands': cands, 'meta': meta, 'dgVersions': vs, 'mbReleases': rels, 'dgMaster': {k2: d.get(k2) for k2 in ('kind', 'id', 'title', 'year', 'mainRelease')}})

urls = {c['url'] for it in items for c in it['cands']}
with cf.ThreadPoolExecutor(12) as ex:
    list(ex.map(fetch, urls))

T = 230; PER = 4
for s in range(0, len(items), PER):
    chunk = items[s:s + PER]
    NC = max(len(it['cands']) for it in chunk)
    W = NC * (T + 10) + 12; RH = T + 108
    img = Image.new('RGB', (W, RH * len(chunk) + 6), (250, 250, 247)); d = ImageDraw.Draw(img)
    for r, it in enumerate(chunk):
        y = r * RH + 4; yy = y
        d.line([(0, y), (W, y)], fill=(150, 150, 150), width=2)
        d.text((8, yy + 2), f"[{s + r}] {it['title']}"[:110], fill=(0, 0, 0), font=F18); yy += 24
        for line in it['lines']:
            if line:
                d.text((8, yy), line[:160], fill=(70, 70, 70), font=F12); yy += 15
        for ci, c in enumerate(it['cands']):
            x = 8 + ci * (T + 10)
            pth = path_of(c['url'])
            if os.path.exists(pth):
                th = Image.open(pth); th.thumbnail((T, T)); img.paste(th, (x + (T - th.width) // 2, yy + 2))
            else:
                d.rectangle([x, yy + 2, x + T, yy + 2 + T], outline=(200, 0, 0)); d.text((x + 8, yy + T // 2), 'NO IMAGE', fill=(200, 0, 0), font=F14)
            d.text((x + 2, yy + T + 4), c['tag'] + ' ' + c.get('note', '')[:26], fill=(0, 0, 170), font=F14)
    fn = os.path.join(OUTD, f'{prefix}-{s // PER:03d}.jpg'); img.save(fn, quality=86)
json.dump(items, open(os.path.join(OUTD, f'{prefix}-items.json'), 'w', encoding='utf-8'), ensure_ascii=False)
print(len(items), 'items', (len(items) + PER - 1) // PER, 'sheets')
