const CACHE_NAME = 'unimove-dz-pwa-v1';
const OFFLINE_URL = '/offline';
const PRECACHE_URLS = ['/', '/offline', '/manifest.json', '/icon.svg'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  // Do not cache video/stream/range requests
  const isRangeRequest = event.request.headers.get('range');
  const isVideo = event.request.destination === 'video' || event.request.destination === 'audio' || event.request.url.endsWith('.mp4');

  if (isRangeRequest || isVideo) {
    event.respondWith(fetch(event.request));
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok && response.status !== 206) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
        }
        return response;
      })
      .catch(async () => {
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) return cachedResponse;

        if (event.request.mode === 'navigate') {
          return caches.match(OFFLINE_URL);
        }

        return new Response('', { status: 503, statusText: 'Offline' });
      })
  );
});
