#!/usr/bin/env python3
"""分段 bulk get（Cloudflare 一次最多 100 鍵）：python3 -I kv-get.py <batch> → apply/<batch>/kv-get.json"""
import json, sys, os, subprocess
HERE = os.path.dirname(os.path.abspath(__file__)); D = os.path.join(HERE, 'apply', sys.argv[1])
keys = json.load(open(os.path.join(D, 'kv-keys.json'), encoding='utf-8'))
env = dict(os.environ, CLOUDFLARE_ACCOUNT_ID='3a23f905e8f31d91c85050f2ed304321')
out = {}
for i in range(0, len(keys), 100):
    part = os.path.join(D, f'kv-keys-{i // 100}.json'); json.dump(keys[i:i + 100], open(part, 'w', encoding='utf-8'), ensure_ascii=False)
    r = subprocess.run(['npx', '-y', 'wrangler@4', 'kv', 'bulk', 'get', part, '--namespace-id', '5f65e74b17d644b68a3f542b08a5c105', '--remote'],
                       capture_output=True, text=True, env=env, timeout=300)
    if r.returncode != 0:
        sys.exit('bulk get failed: ' + r.stderr[-400:])
    out.update(json.loads(r.stdout[r.stdout.index('{'):]))
json.dump(out, open(os.path.join(D, 'kv-get.json'), 'w', encoding='utf-8'), ensure_ascii=False)
print('kv got', len(out), 'non-null', sum(1 for v in out.values() if v))
