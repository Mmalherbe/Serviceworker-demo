self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/index.html',
        '/style.css',
        '/app.js',
        '/image-list.js',
        '/star-wars-logo.jpg',
        '/gallery/oops.jpg'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    // caches.match() always resolves
    // but in case of success response will have value
    if (response !== undefined) {
      console.log(response);
      return response;
    } else {
      return fetch(event.request).then(function (response) {
        if(response.status === 404){
              return caches.match('/gallery/oops.jpg');
        }
         return response;

      }).catch(function () {
        return caches.match('/gallery/oops.jpg');
      });
    }
  }));
});
