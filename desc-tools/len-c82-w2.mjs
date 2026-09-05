import fs from 'node:fs';
const inputs = JSON.parse(fs.readFileSync('batches/input/c82-writer-2.json','utf8'));
const bodies = JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
for (const [i,b] of Object.entries(bodies)) {
  const s = inputs[Number(i)].hook + b;
  const n = Array.from(s).length;
  console.log(String(i).padStart(2), n, n>=215&&n<=235?'ok':(n>235?'長 '+(n-235):'短 '+(215-n)));
}
