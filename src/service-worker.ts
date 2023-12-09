/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

import { PrecacheEntry, PrecacheRoute as _ } from "workbox-precaching";

declare const self: ServiceWorkerGlobalScope;

const VERSION = "v1.0.0-testing2";

// Create a base cache on Install
self.addEventListener("install", (event: ExtendableEvent) => {
  console.log(`${VERSION} installing…`);

  const fileList = self.__WB_MANIFEST as PrecacheEntry[];

  const addResourcesToCache = async (resources: PrecacheEntry[]) => {
    const cache = await caches.open(VERSION);
    await cache.addAll(resources.map((r) => r.url));
  };

  self.skipWaiting();

  event.waitUntil(addResourcesToCache(fileList));
});

self.addEventListener("activate", (event: ExtendableEvent) => {
  const deleteOld = async () => {
    const cacheNames = await caches.keys();

    await Promise.all(cacheNames.filter((item) => item !== VERSION).map((item) => caches.delete(item)));
  };

  // Delete all old caches after taking control
  event.waitUntil(deleteOld());

  console.log(`${VERSION} activated...`);
});

self.addEventListener("fetch", (event: FetchEvent) => {
  const storeInCache = async (request: Request, response: Response) => {
    const cache = await caches.open(VERSION);

    if (request.method === "POST") {
      console.log("Cannot cache POST requests");
      return;
    }

    await cache.put(request, response);
  };

  const cacheFirst = async (request: Request) => {
    // First, Service Worker will retrieve the asset from the cache
    const responseFromCache = await caches.match(request);
    if (responseFromCache) {
      return responseFromCache;
    }

    // If not present in the cache it will call the APIs
    const responseFromNetwork = await fetch(request);

    // Then store them in the cache
    storeInCache(request, responseFromNetwork.clone());
    return responseFromNetwork;
  };

  event.respondWith(cacheFirst(event.request));
});

// create indexedDB variables:
const dbName = "expenses-db";
const version = 1;
const storeName = "exp-store";
type callback = (data?: any) => void;

async function openDB(callback: callback) {
  let db: IDBDatabase;
  const request = self.indexedDB.open(dbName, version);

  request.onerror = function (event: Event) {
    console.log("ExpenseApp isn't allowed to use IndexedDB?!" + (event.target as any)?.errorCode);
  };

  request.onupgradeneeded = function (event: Event) {
    db = request.result;

    if (!db.objectStoreNames.contains(storeName)) {
      db.createObjectStore(storeName, { keyPath: "id" });
    }
  };

  request.onsuccess = function (event) {
    db = (event.target as any)?.result;
    if (callback) {
      callback(db);
    }
  };
}

async function addToStore(db: IDBDatabase, expense: any) {
  // start a transaction
  const transaction = db.transaction(storeName, "readwrite");

  // create an object store
  const store = transaction.objectStore(storeName);

  // add key and value to the store
  const request = store.put(expense);

  request.onsuccess = function () {
    console.log("added to the store", expense, request.result);
  };

  request.onerror = function () {
    console.log("Error did not save to store", request.error);
  };

  transaction.onerror = function (event) {
    console.log("trans failed", event);
  };

  transaction.oncomplete = function (event) {
    console.log("trans completed", event);
    db.close();
  };
}

// async function getFromStore(id: string, callback: callback) {
//   // start a transaction
//   const transaction = db.transaction(storeName, "readwrite");
//   // create an object store
//   const store = transaction.objectStore(storeName);

//   // get key and value from the store
//   const request = store.get(id);

//   request.onsuccess = function (event) {
//     if (callback) {
//       callback((event.target as any)?.result.value);
//     }
//   };
//   request.onerror = function () {
//     console.log("Error did not read to store", request.error);
//   };

//   transaction.onerror = function (event) {
//     console.log("trans failed", event);
//   };

//   transaction.oncomplete = function (event) {
//     console.log("trans completed", event);
//   };
// }

self.addEventListener("message", (event) => {
  if (!event.data || event.data.action !== "ADD_NEW_EXPENSE") {
    return;
  }

  const expense = event.data.data;

  openDB((db) => addToStore(db, expense));
});
