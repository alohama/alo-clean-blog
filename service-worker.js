const cacheName = 'aloCache-v1'
const offlineUrl = '/offline.html';
const assetsToCache = [
    '/',
    '/app.js',
    '/js/clean-blog.js',
    '/js/clean-blog.min.js',
    '/js/contact_me.js',
    '/js/jqBootstrapValidation.js',
    '/vendor/bootstrap/js/bootstrap.bundle.min.js',
    '/vendor/bootstrap/css/bootstrap.min.css',
    '/vendor/fontawesome-free/css/all.min.css',
    '/css/clean-blog.min.css ',
    '/vendor/jquery/jquery.min.js',
    '/vendor/fontawesome-free/webfonts/fa-solid-900.woff2',
    '/vendor/fontawesome-free/webfonts/fa-brands-400.woff2',
    '/vendor/fontawesome-free/webfonts/fa-solid-900.woff',
    '/vendor/fontawesome-free/webfonts/fa-brands-400.woff',
    '/vendor/fontawesome-free/webfonts/fa-solid-900.ttf',
    '/vendor/fontawesome-free/webfonts/fa-brands-400.ttf',
    '/manifest.json',
    '/images/icons/icon-72x72.png',
    '/images/icons/icon-96x96.png',
    '/images/icons/icon-128x128.png',
    '/images/icons/icon-144x144.png',
    '/images/icons/icon-152x152.png',
    '/images/icons/icon-192x192.png',
    '/img/offline-icon.svg',
    offlineUrl
]

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(assetsToCache);
        })
    );
})

self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== cacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
})

self.addEventListener('fetch', event => {
    //console.log('[ServiceWorker] Fetch =>', cacheName)

    // if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
    //     event.respondWith(
    //         fetch(event.request.url).catch(error => {
    //             // Return the offline page
    //             return caches.match(offlineUrl);
    //         })
    //     );
    // }
    // else {
        event.respondWith(
            caches.match(event.request).then(cacheResp => {
                return cacheResp || fetch(event.request).then(response => {
                    return caches.open(cacheName).then(cache => {
                        cache.put(event.request, response.clone())
                        return response
                    })
                })
            })
        )
    //}

})

