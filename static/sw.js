const cacheName = 'v1';

const cacheAssets = [
  '/coffeeblog/static/manifest.json',
    '/coffeeblog/layouts/_default/baseof.html',
    '/coffeeblog/layouts/_default/list.html',
    '/coffeeblog/layouts/_default/single.html',
    '/coffeeblog/layouts/_default/taxonomy.html',
    '/coffeeblog/layouts/_default/terms.html',
    '/coffeeblog/layouts/page/single.html',
    '/coffeeblog/layouts/post/list.html',
    '/coffeeblog/layouts/post/summary-with-image.html',
    '/coffeeblog/layouts/post/summary.html',
    '/coffeeblog/index.html',
    '/coffeeblog/404.html',
    '/coffeeblog/dist/css/app.1cb140d8ba31d5b2f1114537dd04802a.css',
    '/coffeeblog/dist/js/app.3fc0f988d21662902933.js',
    '/coffeeblog/images/coffee.jpg',
    '/coffeeblog/images/coffee2.jpg',
    '/coffeeblog/images/coffee3.jpg',
];

// Call Install Event
self.addEventListener('install', e => {
  console.log('Service Worker: Installed');

  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log('Service Worker: Caching Files');
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

// Call Activate Event
self.addEventListener('activate', e => {
  console.log('Service Worker: Activated');
  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Call Fetch Event
self.addEventListener('fetch', e => {
  console.log('Service Worker: Fetching');
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
