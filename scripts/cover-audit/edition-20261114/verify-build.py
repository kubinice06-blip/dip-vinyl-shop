#!/usr/bin/env python3
"""把「挑原版」的 replace 決定整理成驗證用對照：python3 -I verify-build.py <prefix>
讀 decide/<prefix>-items.json、decide/<prefix>-decisions.json、dg-cache.json（release 大圖）
每列：NOW（現用）｜NEW（要換上的圖，原尺寸來源）｜REF（另一張參考：Discogs master 主圖或最早版本）
產出 verify/<prefix>-rows.json（含 newUrl、source、meta）、verify/<prefix>-NNN.jpg（每張 4 列、300px）
缺 Discogs release 大圖的列會跳過並列在 verify/<prefix>-pending.json（等 dg-worker 補完再跑一次）
"""
import json, sys, os, re, subprocess
HERE = os.path.dirname(os.path.abspath(__file__))
P = sys.argv[1]
OUTD = os.path.join(HERE, 'verify'); os.makedirs(OUTD, exist_ok=True)
items = json.load(open(os.path.join(HERE, 'decide', f'{P}-items.json'), encoding='utf-8'))
DEC = sys.argv[2] if len(sys.argv) > 2 else os.path.join(HERE, 'decide', f'{P}-decisions.json')
OUTP = sys.argv[3] if len(sys.argv) > 3 else P   # 輸出前綴（同一批的找圖結果另起前綴，例如 pilot-s1）
dec = json.load(open(DEC, encoding='utf-8'))
cache = json.load(open(os.path.join(HERE, 'dg-cache.json')))
rows, pending = [], []
for i, v in sorted(dec.items(), key=lambda x: int(x[0])):
    if v.get('decision') != 'replace':
        continue
    it = items[int(i)]; ch = v.get('choice') or ''; m = it['meta']
    if not v.get('url') and not ch.startswith(('caa:', 'discogs:')) and ch not in m:
        pending.append({'idx': int(i), 'why': f'choice {ch} 不在候選裡'}); continue
    new = None
    if v.get('url'):  # 找圖關直接給的網址
        u = v['url']
        if 'coverartarchive.org' in u:
            rid = v.get('mbReleaseId') or u.split('/release/')[1].split('/')[0]
            m_img = re.search(r'/release/[0-9a-f-]{36}/(\d+)(?:-\d+)?\.(?:jpg|png|gif)', u)
            if m_img:   # 指定了某一張圖（例如沒有側標的第二張），保留那張，不要退回 /front
                iu = f'https://coverartarchive.org/release/{rid}/{m_img.group(1)}'
                new = {'source': 'caa', 'url': iu + '-1200.jpg', 'view': iu + '-500.jpg', 'releaseId': rid, 'imageId': m_img.group(1), 'note': 'CAA img ' + v.get('edition', '')[:26]}
            else:
                new = {'source': 'caa', 'url': f'https://coverartarchive.org/release/{rid}/front', 'view': f'https://coverartarchive.org/release/{rid}/front-500', 'releaseId': rid, 'note': 'CAA ' + v.get('edition', '')[:30]}
        else:
            new = {'source': 'discogs', 'url': u, 'view': u, 'discogsReleaseId': v.get('discogsReleaseId'), 'note': 'Discogs ' + v.get('edition', '')[:30], 'edition': v.get('edition', '')}
    elif ch.startswith('caa:') or (ch in m and m[ch].get('source') == 'caa'):
        rid = ch.split(':', 1)[1] if ch.startswith('caa:') else m[ch]['releaseId']
        rel = next((r for r in it.get('mbReleases') or [] if r['id'] == rid), {})
        new = {'source': 'caa', 'url': f'https://coverartarchive.org/release/{rid}/front', 'view': f'https://coverartarchive.org/release/{rid}/front-500',
               'releaseId': rid, 'note': f"CAA {rel.get('date', '')} {rel.get('country', '')} {rel.get('format', '')}", 'mb': rel}
    else:
        if ch.startswith('discogs:'):
            did = int(ch.split(':', 1)[1])
        elif ch == 'DM':
            did = m['DM'].get('mainRelease') or (cache.get(f"master:{m['DM'].get('masterId')}") or {}).get('mainRelease')
            if not did:
                pending.append({'idx': int(i), 'master': m['DM'].get('masterId')}); continue
        else:
            did = m[ch]['discogsReleaseId']
        r = cache.get(f'release:{did}')
        if not r:
            pending.append({'idx': int(i), 'release': did}); continue
        if r.get('missing') or not r.get('img'):
            pending.append({'idx': int(i), 'release': did, 'why': 'no image'}); continue
        url = r['img']
        if ch == 'DM' and m['DM'].get('url'):
            url = m['DM']['url']  # master 主圖（通常就是主版本的主圖）
        new = {'source': 'discogs', 'url': url, 'view': url, 'discogsReleaseId': did, 'release': r,
               'note': f"Discogs {r.get('released') or r.get('year')} {r.get('country', '')} {'/'.join(l['name'] for l in r.get('labels', [])[:1])} {'/'.join(l['catno'] for l in r.get('labels', [])[:1])}"}
    ref = None
    if ch != 'DM' and m.get('DM'):
        ref = {'tag': 'REF', 'url': m['DM']['url'], 'note': 'Discogs master 主圖'}
    else:
        dv = [c for c in it['cands'] if c['tag'].startswith('D') and c['tag'] != 'DM']
        if dv:
            ref = {'tag': 'REF', 'url': dv[0]['url'], 'note': 'Discogs 最早版本(縮圖) ' + dv[0].get('note', '')}
    now = it['cands'][0]['url'].replace('/front-250', '/front-500')
    cands = [{'tag': 'NOW', 'url': now}, {'tag': 'NEW', 'url': new['view'], 'note': new['note'][:40]}] + ([ref] if ref else [])
    rows.append({'idx': int(i), 'key': it['key'], 'title': it['title'], 'lines': [f"理由：{v.get('reason', '')}"[:150], f"原版：{v.get('design', '')}"[:150]],
                 'cands': cands, 'new': new, 'decision': v})
json.dump(rows, open(os.path.join(OUTD, f'{OUTP}-rows.json'), 'w', encoding='utf-8'), ensure_ascii=False)
json.dump(pending, open(os.path.join(OUTD, f'{OUTP}-pending.json'), 'w'), ensure_ascii=False)
n = 0
for s in range(0, len(rows), 4):
    part = rows[s:s + 4]
    tmp = os.path.join(OUTD, f'{OUTP}-part.json'); json.dump(part, open(tmp, 'w', encoding='utf-8'), ensure_ascii=False)
    subprocess.run(['python3', '-I', os.path.join(HERE, 'compare.py'), '--rows', tmp, os.path.join(OUTD, f'{OUTP}-{s // 4:03d}.jpg')], check=True, capture_output=True)
    n += 1
print(len(rows), 'rows', n, 'sheets', len(pending), 'pending')
