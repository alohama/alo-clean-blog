//(function () {

const cacheName = 'aloCache-v1'
async function addToCache(urls) {
    const pageCache = await window.caches.open(cacheName);
    await pageCache.addAll(urls);
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/service-worker.js');
        //navigator.serviceWorker.register('/service-worker-workbox.js');
    });
}
//})();