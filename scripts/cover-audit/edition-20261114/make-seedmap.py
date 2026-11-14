#!/usr/bin/env python3
"""seed_cards.json → seedmap.json（docId → {artist, album, year, genres, apex}）：python3 -I make-seedmap.py <repo>/seed_cards.json
docId 規則同主站 card_catalog：`${artist}|${album}`.toLowerCase()，'/' 換成 '-'。"""
import json, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
rows = json.load(open(sys.argv[1], encoding='utf-8'))
out = {}
for r in rows:
    k = f"{r[0]}|{r[1]}".lower().replace('/', '-')
    out[k] = {'artist': r[0], 'album': r[1], 'year': r[6], 'genres': r[5], 'apex': r[8] if len(r) > 8 else None}
json.dump(out, open(os.path.join(HERE, 'seedmap.json'), 'w', encoding='utf-8'), ensure_ascii=False)
print(len(out))
