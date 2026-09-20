// Service worker mínimo — existe só pra habilitar o "instalar app" no Android/Chrome.
// Não guarda os documentos em cache (eles mudam o tempo todo), sempre busca na rede primeiro.

const CACHE_NAME = "doppio-hub-shell-v1";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  // network-first: tenta a rede, só usa cache se estiver offline
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
