import { spawn, spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = new Map(process.argv.slice(2).map(value => {
  const [key, raw = 'true'] = value.replace(/^--/, '').split('=', 2);
  return [key, raw];
}));
const firstPid = Number(args.get('wait-pid') || 0);
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function isRunning(pid) {
  if (!pid) return false;
  try { process.kill(pid, 0); return true; }
  catch (_) { return false; }
}

async function waitForProcess(pid) {
  while (isRunning(pid)) await sleep(30000);
}

function runNode(script, scriptArgs) {
  return spawnSync(process.execPath, [path.join(root, script), ...scriptArgs], {
    cwd:root,
    stdio:'inherit',
    windowsHide:true
  });
}

console.log(`Waiting for first 1,000-card batch (pid ${firstPid})`);
await waitForProcess(firstPid);
// Leave a quiet window after the last Search API request before lookup sampling.
await sleep(60000);
console.log('Checking first-batch quality');
const firstCheck = runNode('scripts/verify-apple-audio-map.mjs', ['--expect=1000', '--sample=12']);
if (firstCheck.status !== 0) {
  console.error('First-batch quality gate failed; remaining cards were not started.');
  process.exit(1);
}

console.log('First-batch quality gate passed; processing every remaining catalog card');
const reclassify = spawn(process.execPath, [path.join(root, 'scripts/build-apple-audio-map.mjs'), '--limit=1000', '--delay-ms=4200', '--retry-status=review'], {
  cwd:root,
  stdio:'inherit',
  windowsHide:true
});
const reclassifyExit = await new Promise(resolve => reclassify.on('exit', code => resolve(code ?? 1)));
if (reclassifyExit !== 0) {
  console.error(`First-batch review reclassification exited with ${reclassifyExit}`);
  process.exit(reclassifyExit);
}

console.log('First-batch reviews reclassified; processing every remaining catalog card');
const remaining = spawn(process.execPath, [path.join(root, 'scripts/build-apple-audio-map.mjs'), '--limit=6126', '--delay-ms=4200'], {
  cwd:root,
  stdio:'inherit',
  windowsHide:true
});
const remainingExit = await new Promise(resolve => remaining.on('exit', code => resolve(code ?? 1)));
if (remainingExit !== 0) {
  console.error(`Remaining-card batch exited with ${remainingExit}`);
  process.exit(remainingExit);
}

await sleep(60000);
console.log('Checking complete-catalog quality');
const finalCheck = runNode('scripts/verify-apple-audio-map.mjs', ['--expect=6126', '--sample=30']);
if (finalCheck.status !== 0) process.exit(1);
console.log('ALL_APPLE_AUDIO_CATALOG_SCANNED');
