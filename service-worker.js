(()=>{"use strict";var e={437:()=>{try{self["workbox:precaching:7.0.0"]&&_()}catch(e){}},645:()=>{try{self["workbox:core:7.0.0"]&&_()}catch(e){}},116:()=>{try{self["workbox:routing:7.0.0"]&&_()}catch(e){}},909:()=>{try{self["workbox:strategies:7.0.0"]&&_()}catch(e){}}},t={};function s(a){var n=t[a];if(void 0!==n)return n.exports;var r=t[a]={exports:{}};return e[a](r,r.exports,s),r.exports}(()=>{s(645);const e=function(e){let t=e;for(var s=arguments.length,a=new Array(s>1?s-1:0),n=1;n<s;n++)a[n-1]=arguments[n];return a.length>0&&(t+=" :: ".concat(JSON.stringify(a))),t};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}const a={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!==typeof registration?registration.scope:""},n=e=>[a.prefix,e,a.suffix].filter((e=>e&&e.length>0)).join("-"),r=e=>e||n(a.precache),i=e=>e||n(a.runtime);function c(e,t){const s=t();return e.waitUntil(s),s}s(437);function o(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"===typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:a}=e;if(!a)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(a,location.href);return{cacheKey:e.href,url:e.href}}const n=new URL(a,location.href),r=new URL(a,location.href);return n.searchParams.set("__WB_REVISION__",s),{cacheKey:n.href,url:r.href}}class h{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async e=>{let{request:t,state:s}=e;s&&(s.originalRequest=t)},this.cachedResponseWillBeUsed=async e=>{let{event:t,state:s,cachedResponse:a}=e;if("install"===t.type&&s&&s.originalRequest&&s.originalRequest instanceof Request){const e=s.originalRequest.url;a?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return a}}}class l{constructor(e){let{precacheController:t}=e;this.cacheKeyWillBeUsed=async e=>{let{request:t,params:s}=e;const a=(null===s||void 0===s?void 0:s.cacheKey)||this._precacheController.getCacheKeyForURL(t.url);return a?new Request(a,{headers:t.headers}):t},this._precacheController=t}}let u;async function d(e,s){let a=null;if(e.url){a=new URL(e.url).origin}if(a!==self.location.origin)throw new t("cross-origin-copy-response",{origin:a});const n=e.clone(),r={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},i=s?s(r):r,c=function(){if(void 0===u){const t=new Response("");if("body"in t)try{new Response(t.body),u=!0}catch(e){u=!1}u=!1}return u}()?n.body:await n.blob();return new Response(c,i)}function f(e,t){const s=new URL(e);for(const a of t)s.searchParams.delete(a);return s.href}class p{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}const g=new Set;s(909);function y(e){return"string"===typeof e?new Request(e):e}class w{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new p,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const s of this._plugins)this._pluginStateMap.set(s,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:s}=this;let a=y(e);if("navigate"===a.mode&&s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const n=this.hasCallback("fetchDidFail")?a.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))a=await e({request:a.clone(),event:s})}catch(i){if(i instanceof Error)throw new t("plugin-error-request-will-fetch",{thrownErrorMessage:i.message})}const r=a.clone();try{let e;e=await fetch(a,"navigate"===a.mode?void 0:this._strategy.fetchOptions);for(const t of this.iterateCallbacks("fetchDidSucceed"))e=await t({event:s,request:r,response:e});return e}catch(c){throw n&&await this.runCallbacks("fetchDidFail",{error:c,event:s,originalRequest:n.clone(),request:r.clone()}),c}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=y(e);let s;const{cacheName:a,matchOptions:n}=this._strategy,r=await this.getCacheKey(t,"read"),i=Object.assign(Object.assign({},n),{cacheName:a});s=await caches.match(r,i);for(const c of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await c({cacheName:a,matchOptions:n,cachedResponse:s,request:r,event:this.event})||void 0;return s}async cachePut(e,s){const a=y(e);var n;await(n=0,new Promise((e=>setTimeout(e,n))));const r=await this.getCacheKey(a,"write");if(!s)throw new t("cache-put-with-no-response",{url:(i=r.url,new URL(String(i),location.href).href.replace(new RegExp("^".concat(location.origin)),""))});var i;const c=await this._ensureResponseSafeToCache(s);if(!c)return!1;const{cacheName:o,matchOptions:h}=this._strategy,l=await self.caches.open(o),u=this.hasCallback("cacheDidUpdate"),d=u?await async function(e,t,s,a){const n=f(t.url,s);if(t.url===n)return e.match(t,a);const r=Object.assign(Object.assign({},a),{ignoreSearch:!0}),i=await e.keys(t,r);for(const c of i)if(n===f(c.url,s))return e.match(c,a)}(l,r.clone(),["__WB_REVISION__"],h):null;try{await l.put(r,u?c.clone():c)}catch(p){if(p instanceof Error)throw"QuotaExceededError"===p.name&&await async function(){for(const e of g)await e()}(),p}for(const t of this.iterateCallbacks("cacheDidUpdate"))await t({cacheName:o,oldResponse:d,newResponse:c.clone(),request:r,event:this.event});return!0}async getCacheKey(e,t){const s="".concat(e.url," | ").concat(t);if(!this._cacheKeys[s]){let a=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))a=y(await e({mode:t,request:a,event:this.event,params:this.params}));this._cacheKeys[s]=a}return this._cacheKeys[s]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if("function"===typeof t[e]){const s=this._pluginStateMap.get(t),a=a=>{const n=Object.assign(Object.assign({},a),{state:s});return t[e](n)};yield a}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const a of this.iterateCallbacks("cacheWillUpdate"))if(t=await a({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class m{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.cacheName=i(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"===typeof e.request?new Request(e.request):e.request,a="params"in e?e.params:void 0,n=new w(this,{event:t,request:s,params:a}),r=this._getResponse(n,s,t);return[r,this._awaitComplete(r,n,s,t)]}async _getResponse(e,s,a){let n;await e.runCallbacks("handlerWillStart",{event:a,request:s});try{if(n=await this._handle(s,e),!n||"error"===n.type)throw new t("no-response",{url:s.url})}catch(r){if(r instanceof Error)for(const t of e.iterateCallbacks("handlerDidError"))if(n=await t({error:r,event:a,request:s}),n)break;if(!n)throw r}for(const t of e.iterateCallbacks("handlerWillRespond"))n=await t({event:a,request:s,response:n});return n}async _awaitComplete(e,t,s,a){let n,r;try{n=await e}catch(r){}try{await t.runCallbacks("handlerDidRespond",{event:a,request:s,response:n}),await t.doneWaiting()}catch(i){i instanceof Error&&(r=i)}if(await t.runCallbacks("handlerDidComplete",{event:a,request:s,response:n,error:r}),t.destroy(),r)throw r}}class _ extends m{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};e.cacheName=r(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(_.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){const s=await t.cacheMatch(e);return s||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,s){let a;const n=s.params||{};if(!this._fallbackToNetwork)throw new t("missing-precache-entry",{cacheName:this.cacheName,url:e.url});{0;const t=n.integrity,r=e.integrity,i=!r||r===t;if(a=await s.fetch(new Request(e,{integrity:"no-cors"!==e.mode?r||t:void 0})),t&&i&&"no-cors"!==e.mode){this._useDefaultCacheabilityPluginIfNeeded();await s.cachePut(e,a.clone());0}}return a}async _handleInstall(e,s){this._useDefaultCacheabilityPluginIfNeeded();const a=await s.fetch(e);if(!await s.cachePut(e,a.clone()))throw new t("bad-precaching-response",{url:e.url,status:a.status});return a}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,a]of this.plugins.entries())a!==_.copyRedirectedCacheableResponsesPlugin&&(a===_.defaultPrecacheCacheabilityPlugin&&(e=s),a.cacheWillUpdate&&t++);0===t?this.plugins.push(_.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}_.defaultPrecacheCacheabilityPlugin={async cacheWillUpdate(e){let{response:t}=e;return!t||t.status>=400?null:t}},_.copyRedirectedCacheableResponsesPlugin={async cacheWillUpdate(e){let{response:t}=e;return t.redirected?await d(t):t}};class v{constructor(){let{cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new _({cacheName:r(e),plugins:[...t,new l({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const s=[];for(const a of e){"string"===typeof a?s.push(a):a&&void 0===a.revision&&s.push(a.url);const{cacheKey:e,url:n}=o(a),r="string"!==typeof a&&a.revision?"reload":"default";if(this._urlsToCacheKeys.has(n)&&this._urlsToCacheKeys.get(n)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(n),secondEntry:e});if("string"!==typeof a&&a.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==a.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:n});this._cacheKeysToIntegrities.set(e,a.integrity)}if(this._urlsToCacheKeys.set(n,e),this._urlsToCacheModes.set(n,r),s.length>0){const e="Workbox is precaching URLs without revision "+"info: ".concat(s.join(", "),"\nThis is generally NOT safe. ")+"Learn more at https://bit.ly/wb-precache";console.warn(e)}}}install(e){return c(e,(async()=>{const t=new h;this.strategy.plugins.push(t);for(const[n,r]of this._urlsToCacheKeys){const t=this._cacheKeysToIntegrities.get(r),s=this._urlsToCacheModes.get(n),a=new Request(n,{integrity:t,cache:s,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:r},request:a,event:e}))}const{updatedURLs:s,notUpdatedURLs:a}=t;return{updatedURLs:s,notUpdatedURLs:a}}))}activate(e){return c(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),a=[];for(const n of t)s.has(n.url)||(await e.delete(n),a.push(n.url));return{deletedURLs:a}}))}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(e){const s=this.getCacheKeyForURL(e);if(!s)throw new t("non-precached-url",{url:e});return t=>(t.request=new Request(e),t.params=Object.assign({cacheKey:s},t.params),this.strategy.handle(t))}}let R;const C=()=>(R||(R=new v),R);s(116);const b=e=>e&&"object"===typeof e?e:{handle:e};class q{constructor(e,t){let s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"GET";this.handler=b(t),this.match=e,this.method=s}setCatchHandler(e){this.catchHandler=b(e)}}class U extends q{constructor(e,t,s){super((t=>{let{url:s}=t;const a=e.exec(s.href);if(a&&(s.origin===location.origin||0===a.index))return a.slice(1)}),t,s)}}class L{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data;0;const s=Promise.all(t.urlsToCache.map((t=>{"string"===typeof t&&(t=[t]);const s=new Request(...t);return this.handleRequest({request:s,event:e})})));e.waitUntil(s),e.ports&&e.ports[0]&&s.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest(e){let{request:t,event:s}=e;const a=new URL(t.url,location.href);if(!a.protocol.startsWith("http"))return void 0;const n=a.origin===location.origin,{params:r,route:i}=this.findMatchingRoute({event:s,request:t,sameOrigin:n,url:a});let c=i&&i.handler;const o=t.method;if(!c&&this._defaultHandlerMap.has(o)&&(c=this._defaultHandlerMap.get(o)),!c)return void 0;let h;try{h=c.handle({url:a,request:t,event:s,params:r})}catch(u){h=Promise.reject(u)}const l=i&&i.catchHandler;return h instanceof Promise&&(this._catchHandler||l)&&(h=h.catch((async e=>{if(l){0;try{return await l.handle({url:a,request:t,event:s,params:r})}catch(n){n instanceof Error&&(e=n)}}if(this._catchHandler)return this._catchHandler.handle({url:a,request:t,event:s});throw e}))),h}findMatchingRoute(e){let{url:t,sameOrigin:s,request:a,event:n}=e;const r=this._routes.get(a.method)||[];for(const i of r){let e;const r=i.match({url:t,sameOrigin:s,request:a,event:n});if(r)return e=r,(Array.isArray(e)&&0===e.length||r.constructor===Object&&0===Object.keys(r).length||"boolean"===typeof r)&&(e=void 0),{route:i,params:e}}return{}}setDefaultHandler(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"GET";this._defaultHandlerMap.set(t,b(e))}setCatchHandler(e){this._catchHandler=b(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const s=this._routes.get(e.method).indexOf(e);if(!(s>-1))throw new t("unregister-route-route-not-registered");this._routes.get(e.method).splice(s,1)}}let k;const T=()=>(k||(k=new L,k.addFetchListener(),k.addCacheListener()),k);class K extends q{constructor(e,t){super((s=>{let{request:a}=s;const n=e.getURLsToCacheKeys();for(const r of function(e){let{ignoreURLParametersMatching:t=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:a=!0,urlManipulation:n}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return function*(){const r=new URL(e,location.href);r.hash="",yield r.href;const i=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];for(const s of[...e.searchParams.keys()])t.some((e=>e.test(s)))&&e.searchParams.delete(s);return e}(r,t);if(yield i.href,s&&i.pathname.endsWith("/")){const e=new URL(i.href);e.pathname+=s,yield e.href}if(a){const e=new URL(i.href);e.pathname+=".html",yield e.href}if(n){const e=n({url:r});for(const t of e)yield t.href}}()}(a.url,t)){const t=n.get(r);if(t){return{cacheKey:t,integrity:e.getIntegrityForCacheKey(t)}}}}),e.strategy)}}function x(e){const s=C();!function(e,s,a){let n;if("string"===typeof e){const t=new URL(e,location.href);n=new q((e=>{let{url:s}=e;return s.href===t.href}),s,a)}else if(e instanceof RegExp)n=new U(e,s,a);else if("function"===typeof e)n=new q(e,s,a);else{if(!(e instanceof q))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});n=e}T().registerRoute(n)}(new K(s,e))}var P;(function(e){C().precache(e)})([{'revision':'e2b1d8cfaa6812dafbbba6efe9be40ae','url':'/ExpenseTrackingAppReactJS/index.html'},{'revision':null,'url':'/ExpenseTrackingAppReactJS/static/css/main.89963fdd.css'},{'revision':null,'url':'/ExpenseTrackingAppReactJS/static/js/main.63a3e260.js'}]),x(P);const E="v2.0.2";self.addEventListener("install",(e=>{console.log("".concat(E," installing\u2026"));self.skipWaiting(),e.waitUntil((async e=>{const t=await caches.open(E);await t.addAll(e)})(["/ExpenseTrackingAppReactJS/","/ExpenseTrackingAppReactJS/index.html","/ExpenseTrackingAppReactJS/manifest.json"]))})),self.addEventListener("activate",(e=>{e.waitUntil((async()=>{const e=await caches.keys();await Promise.all(e.filter((e=>e!==E)).map((e=>caches.delete(e))))})()),console.log("".concat(E," activated..."))})),self.addEventListener("fetch",(e=>{e.respondWith((async e=>{const t=await caches.match(e);if(t)return t;const s=await fetch(e);return(async(e,t)=>{const s=await caches.open(E);"POST"!==e.method?await s.put(e,t):console.log("Cannot cache POST requests")})(e,s.clone()),s})(e.request))})),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}))})()})();
//# sourceMappingURL=service-worker.js.map