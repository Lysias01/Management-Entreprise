/* Cache hors connexion : le site fonctionne sans internet après la première visite. */
var CACHE = "revis-manag-v3";
var FILES = ["./", "index.html", "assets/style.css", "assets/app.js", "assets/data-fiches.js", "assets/data-questions.js", "assets/data-cases.js", "manifest.webmanifest", "icon.svg", "icon-192.png", "icon-512.png"];
self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(function (hit) {
      var net = fetch(e.request).then(function (res) {
        if (res && (res.ok || res.type === "opaque")) { var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(e.request, copy); }); }
        return res;
      }).catch(function () { return hit; });
      return hit || net;
    })
  );
});
