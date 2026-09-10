const UA='dip-vinyl-shop/1.0 (+kubinice06@gmail.com)';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
export async function dg(path){
  for(let i=0;i<5;i++){
    await sleep(1300);
    let r; try{ r=await fetch(`https://api.discogs.com${path}`,{headers:{'User-Agent':UA}});}catch(e){await sleep(1500);continue;}
    if(r.status===429||r.status===503){await sleep(3000*(i+1));continue;}
    if(!r.ok) return {__err:r.status};
    return await r.json();
  }
  return {__err:'retries'};
}
