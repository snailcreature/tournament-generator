const cacheName = "tournamentsw-v1.0";
const appShellFiles = [
  "/",
  "/index.html",
  "/css",
  "/css/index.css",
  "/javascript",
  "/javascript/index.js",
  "/javascript/helpers.js",
  "/javascript/rounds.js",
  "/javascript/set.js",
  "/assets",
  "/assets/128x128.PNG",
  "/assets/256x256.PNG",
  "/assets/500x500.PNG",
];

self.addEventListener('install', (e) => {
  console.log("[Service Worker] Install");
  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      console.log("[Service Worker] Caching all: app shell and content");
      await cache.addAll(contentToCache);
    })()
  );
  alert('[Service Worker] installed');
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) {
        return r;
      }
      const response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })()
  );
});