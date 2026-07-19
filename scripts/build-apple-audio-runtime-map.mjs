import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourcePath = path.join(root, 'data', 'apple-audio-map-v1.json');
const outputPath = path.join(root, 'data', 'apple-audio-runtime-v1.json');

async function writeJsonAtomically(file, value) {
  await fs.mkdir(path.dirname(file), { recursive:true });
  const temporaryPath = `${file}.${process.pid}.tmp`;
  try {
    // Keep this compact: it is fetched by every browser client, not read by people.
    await fs.writeFile(temporaryPath, `${JSON.stringify(value)}\n`, 'utf8');
    await fs.rename(temporaryPath, file);
  } catch (error) {
    await fs.rm(temporaryPath, { force:true }).catch(() => {});
    throw error;
  }
}

const source = JSON.parse(await fs.readFile(sourcePath, 'utf8'));
if (!source.entries || typeof source.entries !== 'object' || Array.isArray(source.entries)) {
  throw new Error('apple-audio-map-v1.json must contain an entries object');
}

const entries = {};
let matched = 0;
let skippedInvalid = 0;
for (const [key, entry] of Object.entries(source.entries).sort(([left], [right]) => left.localeCompare(right))) {
  if (entry?.status !== 'matched') continue;
  matched++;
  const storefront = String(entry.storefront || '').toUpperCase();
  const collectionId = String(entry.collectionId || '');
  const previewUrl = String(entry.previewUrl || '');
  if (!/^[A-Z]{2}$/.test(storefront) || !/^\d+$/.test(collectionId) || !/^https:\/\//.test(previewUrl)) {
    skippedInvalid++;
    continue;
  }
  // [storefront, collectionId, previewUrl] is deliberately positional to minimize transfer size.
  entries[key] = [storefront, collectionId, previewUrl];
}

const runtime = {
  version:1,
  sourceVersion:source.version || 1,
  sourceGeneratedAt:source.generatedAt || '',
  entries
};
await writeJsonAtomically(outputPath, runtime);

console.log(JSON.stringify({
  output:path.relative(root, outputPath).replace(/\\/g, '/'),
  sourceEntries:Object.keys(source.entries).length,
  matched,
  written:Object.keys(entries).length,
  skippedInvalid
}));
