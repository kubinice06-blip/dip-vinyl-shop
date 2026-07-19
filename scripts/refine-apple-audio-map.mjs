import { spawn, spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const build = spawn(process.execPath, [
  path.join(root, 'scripts/build-apple-audio-map.mjs'),
  '--limit=6126',
  '--delay-ms=4200',
  '--retry-status=unavailable',
  '--deep'
], { cwd:root, stdio:'inherit' });

const buildExit = await new Promise(resolve => build.once('exit', code => resolve(code ?? 1)));
if (buildExit !== 0) {
  console.error(`Apple audio refinement exited with ${buildExit}`);
  process.exit(buildExit);
}

const verification = spawnSync(process.execPath, [
  path.join(root, 'scripts/verify-apple-audio-map.mjs'),
  '--expect=6126',
  '--sample=30'
], { cwd:root, stdio:'inherit' });

if ((verification.status ?? 1) !== 0) {
  console.error(`Apple audio refinement quality gate exited with ${verification.status ?? 1}`);
  process.exit(verification.status ?? 1);
}

console.log('ALL_APPLE_AUDIO_REFINEMENT_SCANNED');
