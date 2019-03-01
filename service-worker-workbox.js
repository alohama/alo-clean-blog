importScripts("/workbox-sw.js")

const cacheName = 'aloCache-v1'

workbox.setConfig({
    debug: false
})

workbox.routing.setCatchHandler(({ url, event, params }) => {
    return caches.match('/offline.html')
})

workbox.routing.registerRoute(
    new RegExp('.*(?:googleapis|gstatic)\.com.*$'),
    new workbox.strategies.CacheFirst({
        cacheName: cacheName,
    })
)

workbox.routing.registerRoute(
    new RegExp('/.*'),
    new workbox.strategies.CacheFirst({
        cacheName: cacheName,
    })
);

workbox.routing.registerRoute(
    new RegExp('/.*\.html'),
    new workbox.strategies.CacheFirst({
        cacheName: cacheName,
    })
);

workbox.routing.registerRoute(
    new RegExp('.*\.js'),
    new workbox.strategies.CacheFirst({
        cacheName: cacheName,
    })
)

workbox.routing.registerRoute(
    new RegExp('.*\.css'),
    new workbox.strategies.CacheFirst({
        cacheName: cacheName,
    })
)

workbox.routing.registerRoute(
    new RegExp('.*\.woff2'),
    new workbox.strategies.CacheFirst({
        cacheName: cacheName,
    })
)

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg|ico)$/,
    new workbox.strategies.CacheFirst({
        cacheName: cacheName,
    })
)