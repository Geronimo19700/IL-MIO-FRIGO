self.addEventListener("push", event => {
  const data = event.data ? event.data.json() : {};

  event.waitUntil(
    self.registration.showNotification(
      data.title || "Scadenze Alimentari",
      {
        body: data.body || "Hai una scadenza domani!",
        icon: data.icon || "",
        badge: data.badge || ""
      }
    )
  );
});

self.addEventListener("notificationclick", event => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true })
      .then(windowClients => {
        for (const client of windowClients) {
          if ("focus" in client) return client.focus();
        }

        if (clients.openWindow) {
          return clients.openWindow(
            "https://geronimo19700.github.io/Scadenze-alimentari/"
          );
        }
      })
  );
});

