/* Set up our service worker */
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker
//     .register('/sw.js', { scope: "/" })
//     .then(reg => {
//       console.log('Service worker registration successful: ' + reg.scope);
//     })
//     .catch(error => {
//       console.log('Registration failed: ' + error);
//     });
// }

// Make sure sw are supported
if('serviceWorker' in navigator)  {
  console.log('Service Worker: Supported');
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('../sw.js')
      .then(reg => console.log('Service Worker: Registered'))
      .catch(err => console.log(`Service Worker: Error: ${err}`))
  })  
}