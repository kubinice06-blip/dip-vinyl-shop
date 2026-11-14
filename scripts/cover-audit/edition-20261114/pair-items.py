#!/usr/bin/env python3
"""參考圖對照的候選：python3 -I pair-items.py <keys.json> <prefix> [--min-refs 1]
keys.json：[{key, now(url), nowNote}]；參考圖：DG＝dg-cache search:<key> 的圖（master 主圖或最早 release）、
CA＝mb-refs.json 的 release-group 的 CAA front-250（只有 NOW 不是同一個 RG 的圖才放）。
沒有任何參考圖的卡不放（寫進 pairs/<prefix>-norefs.json），已經對照過的（pair-done.json）跳過。
接著呼叫 pairs.py 出對照表。
"""
import json, sys, os, re, subprocess
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from sheet import fetch, path_of
keys = json.load(open(sys.argv[1], encoding='utf-8')); P = sys.argv[2]
sm = json.load(open(os.path.join(HERE, 'seedmap.json'), encoding='utf-8'))
dgc = json.load(open(os.path.join(HERE, 'dg-cache.json')))
mbr = json.load(open(os.path.join(HERE, 'mb-refs.json'))) if os.path.exists(os.path.join(HERE, 'mb-refs.json')) else {}
doneP = os.path.join(HERE, 'pair-done.json')
done = set(json.load(open(doneP))) if os.path.exists(doneP) else set()
items, norefs, waiting = [], [], []
import concurrent.futures as cf
_pre = []
for k in keys:
    g0 = mbr.get(k['key']) or {}
    if k['key'] not in done and g0.get('rg'):
        _pre.append(f"https://coverartarchive.org/release-group/{g0['rg']}/front-250")
with cf.ThreadPoolExecutor(16) as ex:
    list(ex.map(fetch, _pre))
for k in keys:
    key = k['key']
    if key in done:
        continue
    s = sm[key]; cands = [{'tag': 'NOW', 'url': k['now']}]
    d = dgc.get('search:' + key)
    g = mbr.get(key) or {}
    nowrg = re.search(r'/release-group/([0-9a-f-]{36})', k['now'])
    ca_ok = False
    if g.get('rg') and (not nowrg or nowrg.group(1) != g['rg']):
        u = f"https://coverartarchive.org/release-group/{g['rg']}/front-250"
        fetch(u); ca_ok = os.path.exists(path_of(u))
    if d is None and not ca_ok:
        waiting.append(key); continue   # 兩種參考圖都還沒有，等下一輪
    if d and d.get('img'):
        cands.append({'tag': 'DG', 'url': d['img'], 'note': f"{'M' if d.get('kind') == 'master' else 'R'}{d.get('year') or ''} {(d.get('country') or '')[:6]}"})
    if ca_ok:
        cands.append({'tag': 'CA', 'url': f"https://coverartarchive.org/release-group/{g['rg']}/front-250", 'note': f"MB {g.get('first', '')[:4]}"})
    if len(cands) == 1:
        if d is not None and (key in mbr):
            norefs.append(key)
        continue
    items.append({'key': key, 'title': f"{s['artist']}《{s['album']}》{s['year']}", 'cands': cands, 'nowNote': k.get('nowNote', '')})
os.makedirs(os.path.join(HERE, 'pairs'), exist_ok=True)
json.dump(norefs, open(os.path.join(HERE, 'pairs', f'{P}-norefs.json'), 'w'), ensure_ascii=False)
json.dump(items, open(os.path.join(HERE, 'pairs', f'{P}-in.json'), 'w', encoding='utf-8'), ensure_ascii=False)
print(len(items), 'with refs;', len(norefs), 'no refs;', len(waiting), 'waiting for Discogs')
if items:
    subprocess.run(['python3', '-I', os.path.join(HERE, 'pairs.py'), os.path.join(HERE, 'pairs', f'{P}-in.json'), P], check=True)
    done.update(it['key'] for it in items)
    json.dump(sorted(done), open(doneP, 'w'))
    TP = os.path.join(HERE, 'dg-tasks.jsonl')
    T = [json.loads(l) for l in open(TP) if l.strip()]
    keep = [t for t in T if not (t.get('t') == 'search' and t.get('p', 5) >= 5 and t.get('key') in done)]
    open(TP + '.tmp', 'w').write(''.join(json.dumps(t, ensure_ascii=False) + '\n' for t in keep)); os.replace(TP + '.tmp', TP)
    print('dropped', len(T) - len(keep), 'Discogs ref tasks already covered')
