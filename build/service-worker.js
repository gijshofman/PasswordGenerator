const t=location.pathname.split("/").slice(0,-1).join("/"),r=[t+"/_app/immutable/entry/app.1JD6Vn8L.js",t+"/_app/immutable/nodes/0.LB_Q7PlB.js",t+"/_app/immutable/assets/0.Vdj0fhX1.css",t+"/_app/immutable/nodes/1.rV3cPHPe.js",t+"/_app/immutable/nodes/2.9XVpwac-.js",t+"/_app/immutable/nodes/3.wrHPGT31.js",t+"/_app/immutable/chunks/index.HHQ7CqK6.js",t+"/_app/immutable/chunks/index.rCU-fHyW.js",t+"/_app/immutable/chunks/index.u_LWACiU.js",t+"/_app/immutable/chunks/navbar.MC9iSAVR.js",t+"/_app/immutable/chunks/scheduler.-biYSOx0.js",t+"/_app/immutable/chunks/singletons.2T5G1us8.js",t+"/_app/immutable/entry/start.j1_PDb0n.js"],m=[t+"/favicon.png",t+"/logo.png",t+"/manifest.webmanifest"],o=Date.now(),n=self,p=`cache${o}`,h=r.concat(m),u=new Set(h);n.addEventListener("install",s=>{s.waitUntil(caches.open(p).then(e=>e.addAll(h)).then(()=>{n.skipWaiting()}))});n.addEventListener("activate",s=>{s.waitUntil(caches.keys().then(async e=>{for(const a of e)a!==p&&await caches.delete(a);n.clients.claim()}))});async function d(s){const e=await caches.open(`offline${o}`);try{const a=await fetch(s);return e.put(s,a.clone()),a}catch(a){const c=await e.match(s);if(c)return c;throw a}}n.addEventListener("fetch",s=>{if(s.request.method!=="GET"||s.request.headers.has("range"))return;const e=new URL(s.request.url),a=e.protocol.startsWith("http"),c=e.hostname===self.location.hostname&&e.port!==self.location.port,i=e.host===self.location.host&&u.has(e.pathname),l=s.request.cache==="only-if-cached"&&!i;a&&!c&&!l&&s.respondWith((async()=>i&&await caches.match(s.request)||d(s.request))())});
