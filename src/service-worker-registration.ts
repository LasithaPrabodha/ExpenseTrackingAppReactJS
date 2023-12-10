import { getToken } from "firebase/messaging";
import { messaging } from "./database/config";

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
  window.addEventListener("load", () => {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator && "SyncManager" in window) {
      navigator.serviceWorker
        .register(process.env.PUBLIC_URL + "/service-worker.js", { scope: process.env.PUBLIC_URL + "/" })
        .then(() => navigator.serviceWorker.ready)
        .then((registration) => {
          if (registration.sync != null) {
            registration.sync.register("expense-sync").catch((error) => {
              console.error("Error during background sync registration:", error);
            });
          } else {
            // sync isn't there so fallback
          }

          getToken(messaging, {
            vapidKey: "BL4nlcoopPxY4JbtGI3t82vQ2SNSvDJej4I12qzcLl95DbN6kpdpEUImJrqmumuggB3yL86iSIrRF6EMbYiA0Mg",
            serviceWorkerRegistration: registration,
          })
            .then((currentToken) => {
              if (currentToken) {
                console.log("current token for client: ", currentToken);
              } else {
                console.log("No registration token available. Request permission to generate one.");
              }
            })
            .catch((err) => {
              console.log("An error occurred while retrieving token. ", err);
            });

          const channelE = new BroadcastChannel("indexdb-expenses");

          channelE.addEventListener("message", ({ data }) => {
            // event is a MessageEvent object
            onMessage({ type: "expenses", data });
          });

          const channelC = new BroadcastChannel("indexdb-categories");
          channelC.addEventListener("message", ({ data }) => {
            // event is a MessageEvent object
            onMessage({ type: "categories", data });
          });
        })
        .catch((error) => {
          console.error("Error during service worker registration:", error);
        });
    }
  });
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
