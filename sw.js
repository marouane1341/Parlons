// Service Worker désactivé et purge forcée de tous les caches
self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.map(k => caches.delete(k)));
    }).then(() => {
      return self.clients.claim();
    }).then(() => {
      return self.registration.unregister();
    })
  );
});

self.addEventListener('fetch', event => {
  // Toujours aller chercher sur le réseau direct, aucun cache
  event.respondWith(fetch(event.request));
});
