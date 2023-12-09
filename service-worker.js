(()=>{"use strict";const e="v1.0.0-testing2";self.addEventListener("install",(t=>{console.log("".concat(e," installing\u2026"));const n=[{'revision':'c27e427a9cb4e8e361f119bb05040a57','url':'/ExpenseTrackingAppReactJS/index.html'},{'revision':null,'url':'/ExpenseTrackingAppReactJS/static/css/main.d8e655ee.css'},{'revision':null,'url':'/ExpenseTrackingAppReactJS/static/js/main.2499e9ae.js'}];self.skipWaiting(),t.waitUntil((async t=>{const n=await caches.open(e);await n.addAll(t.map((e=>e.url)))})(n))})),self.addEventListener("activate",(t=>{t.waitUntil((async()=>{const t=await caches.keys();await Promise.all(t.filter((t=>t!==e)).map((e=>caches.delete(e))))})()),console.log("".concat(e," activated..."))})),self.addEventListener("fetch",(t=>{t.respondWith((async t=>{const n=await caches.match(t);if(n)return n;const o=await fetch(t);return(async(t,n)=>{const o=await caches.open(e);"POST"!==t.method?await o.put(t,n):console.log("Cannot cache POST requests")})(t,o.clone()),o})(t.request))}));const t="store1";self.addEventListener("message",(e=>{if(!e.data||"ADD_NEW_EXPENSE"!==e.data.action)return;const n=e.data.data;!async function(e){let n;const o=self.indexedDB.open("expensesDb",1);o.onerror=function(e){var t;console.log("ExpenseApp isn't allowed to use IndexedDB?!"+(null===(t=e.target)||void 0===t?void 0:t.errorCode))},o.onupgradeneeded=function(e){n=o.result,n.objectStoreNames.contains(t)||n.createObjectStore(t,{keyPath:"id"})},o.onsuccess=function(t){var o;n=null===(o=t.target)||void 0===o?void 0:o.result,e&&e(n)}}((e=>async function(e,n){const o=e.transaction(t,"readwrite"),s=o.objectStore(t).put(n);s.onsuccess=function(){console.log("added to the store",n,s.result)},s.onerror=function(){console.log("Error did not save to store",s.error)},o.onerror=function(e){console.log("trans failed",e)},o.oncomplete=function(t){console.log("trans completed",t),e.close()}}(e,n)))}))})();
//# sourceMappingURL=service-worker.js.map