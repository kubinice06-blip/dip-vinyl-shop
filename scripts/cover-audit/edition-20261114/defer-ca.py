#!/usr/bin/env python3
"""pair-items 之後：把還沒查過 Discogs、只有 CA 參考圖的卡撤回（不算對照過），等 Discogs 補上再一起對。python3 -I defer-ca.py <prefix>"""
import json, os, glob, sys, subprocess
HERE = os.path.dirname(os.path.abspath(__file__)); P = sys.argv[1]
c = json.load(open(os.path.join(HERE, 'dg-cache.json')))
it = json.load(open(os.path.join(HERE, 'pairs', f'{P}-items.json')))
keep = [x for x in it if ('search:' + x['key']) in c]
drop = {x['key'] for x in it} - {x['key'] for x in keep}
done = set(json.load(open(os.path.join(HERE, 'pair-done.json')))) - drop
json.dump(sorted(done), open(os.path.join(HERE, 'pair-done.json'), 'w'))
for f in glob.glob(os.path.join(HERE, 'pairs', f'{P}-*.jpg')): os.remove(f)
json.dump(keep, open(os.path.join(HERE, 'pairs', f'{P}-in.json'), 'w'), ensure_ascii=False)
print(len(keep), 'kept', len(drop), 'deferred')
if keep: subprocess.run(['python3', '-I', os.path.join(HERE, 'pairs.py'), os.path.join(HERE, 'pairs', f'{P}-in.json'), P], check=True)
