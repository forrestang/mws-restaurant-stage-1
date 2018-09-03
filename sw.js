
// const cacheName = 'v1';
const cacheName = 'v2';

//Comment this out to cache entire site instead of individuals
// const cacheAssets = [
//   'index.html',
//   'restaurant.html',
//   '/',
//   '/css/styles.css',
//   '/js/dbhelper.js',
//   '/js/main.js',
//   '/js/restaurant_info.js',
//   '/js/sw_register.js'
// ];

// Call Install Event
self.addEventListener('install', (e) => {
  console.log('Sercice Worker: Installed');

  // Comment out this e.waitUntil if using entire site caching
  // e.waitUntil(
  //   caches
  //     .open(cacheName)
  //     .then(cache => {
  //       console.log(`Service Worker: Caching Files`);
  //       cache.addAll(cacheAssets);
  //     })
  //     .then( () => self.skipWaiting())
  // );

});

// Call Activate Event
self.addEventListener('activate', (e) => {
  console.log('Sercice Worker: Activated');
  // Clear older/unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if(cache !== cacheName) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      )
    })
  );
});

// Call Fetch Event to actually display offline(This version will cache individual pages)
// console.log('wtf');
// self.addEventListener('fetch',  (e) => {
//   console.log('Serice Worker: Fetching');
//   e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
// });

// This version of fetch will cache entire site instead of individual files.
self.addEventListener('fetch',  (e) => {
  console.log('Serice Worker: Fetching');
  e.respondWith(
    fetch(e.request)
      .then(res => {
        //Make clone of response
        const resClone = res.clone();
        //Open Cache
        caches
          .open(cacheName)
          .then(cache => {
            // Add response to cache
            cache.put(e.request, resClone);
          });
        return res;
      }).catch(err => caches.match(e.request).then(res => res))
  );
});