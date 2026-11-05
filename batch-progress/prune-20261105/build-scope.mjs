// 從 worklist-all 取判定範圍：A 範圍（三軸皆 ≤3）∪ B 範圍（1970–1989、經典 ≤3、soul 系）。
import fs from 'node:fs';
const D = 'batch-progress/prune-20261105';
const rows = JSON.parse(fs.readFileSync(`${D}/worklist-all.json`, 'utf8'));
const isB = r => r.y >= 1970 && r.y <= 1989 && r.c <= 3 &&
  (r.gs.includes('soul') || r.sub.some(s => /disco|smooth|quiet|philly|motown|funk/.test(s)));
const isA = r => r.c <= 3 && r.o <= 3 && r.h <= 3;
const scope = rows.filter(r => isA(r) || isB(r)).map(r => ({ ...r, scopeA: isA(r), scopeB: isB(r) }));
fs.writeFileSync(`${D}/worklist.json`, JSON.stringify(scope));
console.log(scope.length, scope.filter(r => r.scopeA).length, scope.filter(r => r.scopeB).length);
