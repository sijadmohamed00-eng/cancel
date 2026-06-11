const CACHE = 'cancel-v1';
const ASSETS = ['./index.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});
self.addEventListener('fetch', e => {
  if (e.request.url.includes('firebase') || e.request.url.includes('gstatic')) return;
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
