/// <reference lib="webworker" />
import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { NetworkFirst, CacheFirst, StaleWhileRevalidate, NetworkOnly } from 'workbox-strategies'

declare const self: ServiceWorkerGlobalScope

precacheAndRoute(self.__WB_MANIFEST)

registerRoute(/^https?:\/\/.*\/api\/.*/i, new NetworkFirst({
  cacheName: 'api-cache',
  networkTimeoutSeconds: 10,
  expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 },
}))

registerRoute(/^https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg|ico|avif)$/i, new CacheFirst({
  cacheName: 'image-cache',
  expiration: { maxEntries: 500, maxAgeSeconds: 60 * 60 * 24 * 365 },
}))

registerRoute(/^https?:\/\/fonts\.googleapis\.com\/.*/i, new StaleWhileRevalidate({
  cacheName: 'google-fonts-css',
  expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 30 },
}))

registerRoute(/^https?:\/\/fonts\.gstatic\.com\/.*/i, new CacheFirst({
  cacheName: 'google-fonts-files',
  expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 365 },
}))

registerRoute(/^https?:\/\/.*\.tile\.openstreetmap\.org\/.*/i, new StaleWhileRevalidate({
  cacheName: 'map-tile-cache',
  expiration: { maxEntries: 1000, maxAgeSeconds: 60 * 60 * 24 * 30 },
}))


registerRoute(/^https?:\/\/.*/i, new NetworkFirst({
  cacheName: 'page-cache',
  networkTimeoutSeconds: 5,
  expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 },
}))

self.addEventListener('push', (event) => {
  const data = event.data?.json() ?? { title: 'ATBH', body: 'New update from Asuogyaman Tourism Hub' }
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/Images/a-minimalist-app-icon-design-of-a-tourist--vector-.png',
      badge: '/Images/a-minimalist-app-icon-design-of-a-tourist--vector-.png',
      data: { url: data.url || '/' },
    })
  )
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clients) => {
      const url = event.notification.data?.url || '/'
      const focused = clients.find(c => c.url === url && 'focus' in c)
      if (focused) { focused.focus(); return }
      self.clients.openWindow(url)
    })
  )
})
