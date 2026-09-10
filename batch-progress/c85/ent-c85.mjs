import { mb } from './mb-c85.mjs';
for (const id of process.argv.slice(2)) {
  const j = await mb(`release-group/${id}?inc=artist-credits`);
  if (j.__err) { console.log(id, 'ERR', j.__err); continue; }
  for (const ac of j['artist-credit']||[]) {
    console.log(`${id} | credit="${ac.name}" | entity="${ac.artist.name}" | sort="${ac.artist['sort-name']}" | ${ac.artist.disambiguation||''} | ${ac.artist.id}`);
  }
}
