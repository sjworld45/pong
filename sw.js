const CACHE_NAME = 'cache-v4';
const dynamic_cache = 'dynamic-cache-v1'
const FILES_TO_CACHE = [
  'index.html',
  'app.js',
  'manifest.json',
  'index.js',
  'index.css',
]

self.addEventListener('install', e => e.waitUntil(
  // add or addAll goes out to the server gets the files to be cached
  caches.open(CACHE_NAME).then(c => c.addAll(FILES_TO_CACHE))));

// activate event
self.addEventListener('activate', e => {
  // waitUnitl waits for the callback to finish
  e.waitUntil(
      caches.keys().then(keys => {
        console.log('service worker has been activated');
        return Promise.all(keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key)))
      })
    )
})

// fetching from cache or server
self.addEventListener('fetch', e => e.respondWith(
  caches.match(e.request).then((r) => {
    return r || fetch(e.request).then(fetchRes => {
      return caches.open(dynamic_cache).then(cache => {
        cache.put(e.request.url, fetchRes.clone());
        return fetchRes;
      })
    })
  })
));