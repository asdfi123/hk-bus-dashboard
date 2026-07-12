const CACHE = 'bus-dash-v1';
const URLS = [
  '/0Data/BusStop/HKI/Eastern/QuarryBaySt.html',
  'https://www.hko.gov.hk/images/HKOWxIconOutline/pic53.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(URLS)));
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(res => {
      if (res.ok && e.request.url.includes('data.gov.hk')) {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
      }
      return res;
    }))
  );
});
