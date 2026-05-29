'use strict';

function cacheFirst(event) {
    return event.respondWith(
        caches.open('toolbox').then(cache => {
            return cache.match(event.request).then(response => {
                return response || fetch(event.request).then(response => {
                    cache.put(event.request, response.clone());
                    return response;
                });
            })
        })
    );
}

self.addEventListener("fetch", event => {
  const request = event.request;
  const url = new URL(request.url);
  const isSameOrigin = url.origin === self.location.origin;
  const isPage = request.mode === "navigate";
  const isJS =
    request.destination === "script" ||
    request.destination === "worker" ||
    request.destination === "sharedworker";
  const isCSS = request.destination === "style";
  if (isSameOrigin && (isPage || isJS || isCSS)) {
    return cacheFirst(event);
  }
});

self.addEventListener('message', event => {
    if (event.data === 'skipWaiting') {
        self.skipWaiting();
        return;
    }
});

self.addEventListener("install", event => {
    return event.waitUntil(
        self.skipWaiting()
    );
});

self.addEventListener("activate", event => {
    return event.waitUntil(async function() {
        await self.clients.claim();
    }());
});
