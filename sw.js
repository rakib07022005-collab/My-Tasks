const C='mytasks-v2';
const LOCAL=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
const CDN=['https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js','https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(async c=>{await c.addAll(LOCAL);await Promise.all(CDN.map(u=>fetch(new Request(u,{mode:'no-cors'})).then(r=>c.put(u,r)).catch(()=>{})))}).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||!(u.origin===location.origin||u.host==='cdnjs.cloudflare.com'))return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(e.request,cp));return res}).catch(()=>caches.match('index.html'))))});
