#!/usr/bin/env python3
"""把總帳（ledger.json）裡還沒套用的變成套用檔：python3 -I apply-build.py <batchName>
產出 apply/<batch>/：
  patches.json      → node scripts/push-card-catalog-patches.mjs（只改 coverUrl）
  kv-keys.json      → wrangler kv bulk get（之後 kv-merge.py 把 imageUrl 換掉、保留 spotifyUrl 等其他欄位）
  registry-add.json → 用 Discogs 圖的卡要補進 data/discogs-cover-registry.json 的條目
  missing-release.json → Discogs release 中繼資料還沒抓到的（排 dg-worker 後重跑本腳本）
  changes.json      → 這批的完整清單（前後網址、來源、兩票理由），存進 repo 當紀錄
已套用的記在 applied.json，不會重複。
"""
import json, sys, os, re, datetime
HERE = os.path.dirname(os.path.abspath(__file__))
B = sys.argv[1]
OUT = os.path.join(HERE, 'apply', B); os.makedirs(OUT, exist_ok=True)
ledger = json.load(open(os.path.join(HERE, 'ledger.json'), encoding='utf-8'))
cat = json.load(open(os.path.join(HERE, 'catalog.json'), encoding='utf-8'))
sm = json.load(open(os.path.join(HERE, 'seedmap.json'), encoding='utf-8'))
dgc = json.load(open(os.path.join(HERE, 'dg-cache.json')))
prep = json.load(open(os.path.join(HERE, 'prep.json')))
if os.path.exists(os.path.join(HERE, 'prep-caa.json')):
    for k, v in json.load(open(os.path.join(HERE, 'prep-caa.json'))).items():
        prep.setdefault(k, {}).setdefault('mb', v.get('mb'))
AP = os.path.join(HERE, 'applied.json')
applied = json.load(open(AP)) if os.path.exists(AP) else {}
norm = lambda s: re.sub(r'[^0-9a-z]', '', str(s or '').lower())
patches, kvkeys, reg, missing, changes = [], [], [], [], []
for key, e in ledger.items():
    if key in applied:
        continue
    new = e['new']; url = new['url']
    if new['source'] == 'caa' and url.endswith('/front'):
        url = url + '-1200'   # 原圖可能十幾 MB；front-1200 同一張圖、最大 1200px（小圖也有）
    old = (cat.get(key) or {}).get('coverUrl')
    if old == url:
        continue
    s = sm[key]
    if new['source'] == 'discogs':
        rid = new.get('discogsReleaseId')
        r = dgc.get(f'release:{rid}') if rid else None
        if not r or r.get('missing'):
            missing.append({'key': key, 'release': rid}); continue
        mbrels = ((prep.get(key) or {}).get('mb') or {}).get('releases') or []
        labs = {norm(x) for m in mbrels for x in (m.get('label') or '').split(' / ') if x}
        cats = {norm(x) for m in mbrels for x in (m.get('catno') or '').split(' / ') if x}
        matched = []
        if r.get('year') and s.get('year') and int(r['year']) == int(s['year']):
            matched.append(f"年份 {r['year']}")
        for l in r.get('labels', []):
            if norm(l['name']) in labs: matched.append(f"廠牌 {l['name']}"); break
        for l in r.get('labels', []):
            if norm(l.get('catno')) and norm(l.get('catno')) in cats: matched.append(f"目錄號 {l['catno']}"); break
        matched.append('Discogs master 的版本、藝人與盤名相符、主線 2026-11-14 兩票目視驗證（設計＋品質）')
        reg.append({'discogsReleaseId': str(r['id']), 'reviewed': 'ok', 'artist': s['artist'], 'album': s['album'], 'batch': 'edition-20261114',
                    'discogsUrl': f"https://www.discogs.com/release/{r['id']}", 'discogsTitle': f"{r.get('artists', '')} - {r.get('title', '')}",
                    'year': str(r.get('year') or ''), 'label': (r.get('labels') or [{}])[0].get('name', ''), 'catno': (r.get('labels') or [{}])[0].get('catno', ''),
                    'country': r.get('country') or '', 'matchedOn': matched, 'imageUrl': url, 'imageSize': '', 'fetchedAt': datetime.datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ'),
                    'note': '封面版本清查：原本是 CD／特別版／重發設計，換成原版設計'})
    patches.append({'docId': key, 'updateMask': ['coverUrl'], 'body': {'fields': {'coverUrl': {'stringValue': url}}}})
    kvkeys.append(f"cover6:{s['artist'].lower()}|{s['album'].lower()}")
    v = e.get('votes', {})
    changes.append({'key': key, 'artist': s['artist'], 'album': s['album'], 'year': s['year'], 'from': old, 'to': url, 'source': new['source'],
                    'caaRelease': new.get('releaseId'), 'discogsRelease': new.get('discogsReleaseId'),
                    'why': (e.get('decision') or {}).get('design') or (e.get('decision') or {}).get('reason', ''),
                    'verify': {k: x.get('reason', '') for k, x in v.items()}, 'batch': e.get('batch')})
json.dump(patches, open(os.path.join(OUT, 'patches.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
json.dump(kvkeys, open(os.path.join(OUT, 'kv-keys.json'), 'w', encoding='utf-8'), ensure_ascii=False)
json.dump(reg, open(os.path.join(OUT, 'registry-add.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
json.dump(missing, open(os.path.join(OUT, 'missing-release.json'), 'w'), ensure_ascii=False)
json.dump(changes, open(os.path.join(OUT, 'changes.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
if missing:
    open(os.path.join(HERE, 'dg-tasks.jsonl'), 'a').write(''.join(json.dumps({'t': 'release', 'id': m['release'], 'p': 0}) + '\n' for m in missing if m['release']))
print(f'{B}: patches {len(patches)}, discogs registry {len(reg)}, missing release meta {len(missing)} (queued)')
