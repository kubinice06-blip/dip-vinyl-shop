import {wiki} from './fetch-c88a.mjs';
const t=process.argv[2];
const s=await wiki(t,'wk-'+t.replace(/[^A-Za-z0-9]/g,'_'));
// print sentences containing <ref
const txt=s.replace(/\{\{[^{}]*\}\}/g,' ');
const parts=txt.split(/\n/);
for(const p of parts){ if(/<ref/.test(p) && p.length<1400 && !/^\s*[|*!]/.test(p)) console.log('--',p.replace(/<ref[^>]*\/>/g,'[ref]').replace(/<ref[^>]*>[\s\S]*?<\/ref>/g,'[ref]').replace(/'''?/g,'').slice(0,900)); }
