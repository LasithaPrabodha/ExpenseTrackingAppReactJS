interface SyncManager {
  getTags(): Promise<string[]>;
  register(tag: string): Promise<void>;
}

declare global {
  interface ServiceWorkerRegistration {
    readonly sync: SyncManager;
  }

  interface SyncEvent extends ExtendableEvent {
    readonly lastChance: boolean;
    readonly tag: string;
  }

  interface ServiceWorkerGlobalScopeEventMap {
    sync: SyncEvent;
  }
}

export function register(onMessage: any) {
  if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator && "SyncManager" in window) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener("load", () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      navigator.serviceWorker
        .register(swUrl)
        .then(() => navigator.serviceWorker.ready)
        .then((registration) => {
          if (registration.sync != null) {
            registration.sync.register("expense-sync").catch((error) => {
              console.error("Error during background sync registration:", error);
            });
          } else {
            // sync isn't there so fallback
          }

          const channelE = new BroadcastChannel("indexdb-expenses");

          channelE.addEventListener("message", (event) => {
            // event is a MessageEvent object
            onMessage({ type: "expenses", data: event });
          });

          const channelC = new BroadcastChannel("indexdb-categories");
          channelC.addEventListener("message", (event) => {
            // event is a MessageEvent object
            onMessage({ type: "categories", data: event });
          });
        })
        .catch((error) => {
          console.error("Error during service worker registration:", error);
        });
    });
  }
}

export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}
