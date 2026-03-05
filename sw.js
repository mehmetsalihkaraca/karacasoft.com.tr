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
  '/assets/img/newfotis.jpg'
];

// Kurulum: Dosyaları hafızaya al
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Dosyalar önbelleğe alınıyor...');
        return cache.addAll(urlsToCache);
      })
  );
});

// İstekleri Yakala: İnternet yoksa hafızadan getir
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Varsa önbellekten döndür, yoksa ağa git
        return response || fetch(event.request);
      }).catch(() => {
        // Eğer her ikisi de başarısız olursa (örn: internet yok ve cache'lenmemiş bir sayfa)
        return caches.match('/index.php');
      })
  );
});