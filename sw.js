const CACHE_NAME = 'parlons-pwa-v3';
const STATIC_ASSETS = [
  './',
  './index.html',
  './parlons.html',
  './manifest.json',
  './icon.svg',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  
  // Ignorer les requêtes non-GET ou vers des API tierces (Anthropic, Gemini, Groq...)
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Stale-While-Revalidate pour les fichiers statiques de l'application
  event.respondWith(
    caches.match(req).then(cachedResponse => {
      const fetchPromise = fetch(req).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          const resClone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, resClone));
        }
        return networkResponse;
      }).catch(() => {
        // En cas d'erreur réseau, si c'est une navigation vers une page HTML, servir index.html
        if (req.mode === 'navigate') {
          return caches.match('./index.html') || caches.match('./parlons.html');
        }
      });

      return cachedResponse || fetchPromise;
    })
  );
});
