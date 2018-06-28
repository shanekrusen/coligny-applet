const LATEST_CACHE_ID = 'v1';

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(LATEST_CACHE_ID).then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/master.js',
        '/manifest.json',
        '/master.css',
        '/coligny.js',
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keyList) { 
      Promise.all(keyList.map(key => {
        if (key !== LATEST_CACHE_ID) {
          return caches.delete(key);
        }
      }))
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
