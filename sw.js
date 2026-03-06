const CACHE_NAME = 'karacasoft-cache-v2';
const urlsToCache = [
  '/',
  '/index.php',
  '/privacy.php',
  '/certificates.php',
  '/assets/css/style.css',
  '/assets/css/certificates.css',
  '/assets/js/script.js',
  '/assets/js/certificates.js',
  '/assets/img/newfotis.jpg',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    }).catch(() => {
      return caches.match('/index.php');
    })
  );
});