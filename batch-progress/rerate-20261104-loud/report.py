#!/usr/bin/env python3
# 產 REPORT.md 所需數字。用法：python3 batch-progress/rerate-20261104-loud/report.py
import json, collections
D = 'batch-progress/rerate-20261104-loud/'
ap = json.load(open(D + 'applied.json')); sg = json.load(open('card-subgenres.json')); seed = json.load(open('seed_cards.json'))
before = json.load(open(D + 'pool-before.json')); after = json.load(open(D + 'pool-after.json'))
ch = [x for x in ap if x['changed']]
oldA = {x['key']: x['old']['accessibility'] for x in ch}
TAGS = ['rock/punk-wave/punk', 'rock/punk-wave/pop-punk', 'rock/punk-wave/hardcore', 'rock/punk-wave/garage', 'rock/punk-wave/no-wave',
        'rock/punk-wave/industrial', 'rock/metal', 'rock/metal/trad', 'rock/metal/alt-metal', 'rock/metal/doom', 'rock/metal/prog-metal',
        'rock/metal/thrash', 'rock/metal/death', 'rock/metal/black', 'rock/dream-post/shoegaze', 'electronic/industrial/industrial-rock',
        'electronic/industrial/power-electronics', 'electronic/noise/harsh', 'rock/jrock-asia', 'rock/punk-wave']
out = []
out.append(f"改 {len(ch)}：到3 {sum(x['new']['accessibility']==3 for x in ch)}／到4 {sum(x['new']['accessibility']==4 for x in ch)}／到5 {sum(x['new']['accessibility']==5 for x in ch)}；類別 {dict(collections.Counter(x['class'] for x in ch))}；頂點卡 {sum(1 for x in ch if x['tier'])}")
out.append(f"跳幅 {dict(collections.Counter((x['old']['accessibility'], x['new']['accessibility']) for x in ch))}")
out.append('\n| 子曲風 | 張數 | 改 | 舊 1/2/3/4/5 | 新 1/2/3/4/5 |\n|---|---:|---:|---|---|')
for t in TAGS:
    rows = [r for r in seed if t in sg.get(r[0] + '|' + r[1], [])]
    o = collections.Counter(oldA.get(r[0] + '|' + r[1], r[4]) for r in rows); n = collections.Counter(r[4] for r in rows)
    c = sum(1 for r in rows if r[0] + '|' + r[1] in oldA)
    out.append(f"| `{t}` | {len(rows)} | {c} | {'/'.join(str(o[i]) for i in range(1,6))} | {'/'.join(str(n[i]) for i in range(1,6))} |")
order = ['common', 'rare', 'uncommon', 'epic', 'legendary']
bo = collections.Counter(x['oldRarity'] for x in ch if not x['tier']); bn = collections.Counter(x['newRarity'] for x in ch if not x['tier'])
out.append('\n本批一般卡稀有度（頂點卡依 tier，不計）：\n| | 普通 | 稀有 | 獨特 | 史詩 | 傳奇 |\n|---|---:|---:|---:|---:|---:|')
out.append('| 舊 | ' + ' | '.join(str(bo[k]) for k in order) + ' |'); out.append('| 新 | ' + ' | '.join(str(bn[k]) for k in order) + ' |')
fl = collections.Counter((x['oldRarity'], x['newRarity']) for x in ch if x['oldRarity'] != x['newRarity'] and not x['tier'])
out.append('流向：' + '、'.join(f'{a}→{b} {n}' for (a, b), n in fl.most_common()))
B, A = before['tierOrRarity'], after['tierOrRarity']
ks = ['hall', 'pearl', 'heresy', 'legendary', 'epic', 'uncommon', 'rare', 'common']
out.append('\n全池（頂點依 tier）：\n| | 殿堂 | 流亡 | 異端 | 傳奇 | 史詩 | 獨特 | 稀有 | 普通 |\n|---|---:|---:|---:|---:|---:|---:|---:|---:|')
out.append('| 套用前 | ' + ' | '.join(f"{B.get(k,0):,}" for k in ks) + ' |'); out.append('| 套用後 | ' + ' | '.join(f"{A.get(k,0):,}" for k in ks) + ' |')
out.append('| 差 | ' + ' | '.join(f"{A.get(k,0)-B.get(k,0):+d}" for k in ks) + ' |')
out.append(f"全池硬蕊 1-5：{'/'.join(str(before['accessibility'][str(i)]) for i in range(1,6))} → {'/'.join(str(after['accessibility'][str(i)]) for i in range(1,6))}")
print('\n'.join(out))
