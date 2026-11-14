#!/usr/bin/env python3
"""把 apply/<batch>/registry-add.json 合進 repo 的 data/discogs-cover-registry.json（只收 changes-ok 裡有的卡；同卡已有條目就更新）。"""
import json, sys, os, datetime
HERE = os.path.dirname(os.path.abspath(__file__)); B = sys.argv[1]; D = os.path.join(HERE, 'apply', B)
RP = '/home/user/dip-vinyl-shop/data/discogs-cover-registry.json'
reg = json.load(open(RP, encoding='utf-8'))
ok = {c['key'] for c in json.load(open(os.path.join(D, 'changes-ok.json'), encoding='utf-8'))}
add = json.load(open(os.path.join(D, 'registry-add.json'), encoding='utf-8'))
dk = lambda e: f"{e['artist']}|{e['album']}".lower().replace('/', '-').strip()
idx = {dk(e): i for i, e in enumerate(reg['entries'])}
n_new = n_upd = 0
for e in add:
    if dk(e) not in ok: continue
    if dk(e) in idx: reg['entries'][idx[dk(e)]] = e; n_upd += 1
    else: reg['entries'].append(e); n_new += 1
reg['count'] = len(reg['entries']); reg['updatedAt'] = datetime.date.today().isoformat()
open(RP, 'w', encoding='utf-8').write(json.dumps(reg, ensure_ascii=False, indent=1) + '\n')
print(f'registry: +{n_new} new, {n_upd} updated, total {reg["count"]}')
