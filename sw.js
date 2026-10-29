// Service Worker version v1.2.5 - Purge et désactivation forcée de tous les caches
const SW_VERSION = 'v1.2.5';

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
