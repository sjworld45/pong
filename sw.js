const CACHE_NAME = 'cache-v2';
const FILES_TO_CACHE = [
  'index.html',
  'app.js',
  'manifest.json',
  'index.js',
  'index.css',
]

self.addEventListener('install', e => e.waitUntil(
  caches.open(CACHE_NAME).then(c => c.addAll(FILES_TO_CACHE))));

// activate event
self.addEventListener('activate', e => {
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
    return r || fetch(e.request)
  })
));