// Primefinance: guarda apenas os arquivos do próprio site para o app abrir mais rápido e sem internet.
// Sempre tenta a versão mais nova primeiro. Os dados da conta (Supabase) nunca passam por aqui.
const C='primefinance-v2';
const ARQ=['./','index.html','manifest.webmanifest','icon.svg','icon-192.png','icon-512.png','apple-touch-icon.png','logo-escuro.png','logo-claro.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(ARQ)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==C).map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
const r=e.request,u=new URL(r.url);
if(r.method!=='GET'||u.origin!==location.origin)return;
e.respondWith(fetch(r).then(res=>{
if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}
return res}).catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||(r.mode==='navigate'?caches.match('index.html'):Response.error()))))});
