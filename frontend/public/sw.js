if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,i)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const r=e=>a(e,c),o={module:{uri:c},exports:t,require:r};s[c]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(i(...e),t)))}}define(["./workbox-b05bf5a7"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/OneSignalSDKWorker.js",revision:"ebb63ca15bba16b550232b0b0f66c726"},{url:"/_next/static/HUbhfOU7ZwO7eW0MGSKVG/_buildManifest.js",revision:"fdd23f13dc0370bdc8b97a71a9bd0c32"},{url:"/_next/static/HUbhfOU7ZwO7eW0MGSKVG/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/105-05c59ea53045cb93.js",revision:"05c59ea53045cb93"},{url:"/_next/static/chunks/1bfc9850-9f07102550c1d6bd.js",revision:"9f07102550c1d6bd"},{url:"/_next/static/chunks/212-0b1603582dea37df.js",revision:"0b1603582dea37df"},{url:"/_next/static/chunks/471-d91760962512b7e5.js",revision:"d91760962512b7e5"},{url:"/_next/static/chunks/569.f3bf0d1bbbb8cf32.js",revision:"f3bf0d1bbbb8cf32"},{url:"/_next/static/chunks/framework-2c79e2a64abdb08b.js",revision:"2c79e2a64abdb08b"},{url:"/_next/static/chunks/main-eb9b666e26fb4fc9.js",revision:"eb9b666e26fb4fc9"},{url:"/_next/static/chunks/pages/%5Bpost%5D-71e13ae59b42fc19.js",revision:"71e13ae59b42fc19"},{url:"/_next/static/chunks/pages/_app-61c35d9b30d4afef.js",revision:"61c35d9b30d4afef"},{url:"/_next/static/chunks/pages/_error-54de1933a164a1ff.js",revision:"54de1933a164a1ff"},{url:"/_next/static/chunks/pages/favorite-1031289b9120e860.js",revision:"1031289b9120e860"},{url:"/_next/static/chunks/pages/index-076038a0a878d066.js",revision:"076038a0a878d066"},{url:"/_next/static/chunks/pages/search/%5Bslug%5D-108ef5df6ec3dbf2.js",revision:"108ef5df6ec3dbf2"},{url:"/_next/static/chunks/pages/series/%5Bslug%5D-4450cc6a21482f21.js",revision:"4450cc6a21482f21"},{url:"/_next/static/chunks/pages/tags/%5Bslug%5D-e1af93873ea76d3b.js",revision:"e1af93873ea76d3b"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-afeb41e9ba7b258f.js",revision:"afeb41e9ba7b258f"},{url:"/_next/static/css/7a7da81c207cafc8.css",revision:"7a7da81c207cafc8"},{url:"/favicon.ico",revision:"11574cf53b5f088f0919f3f76d4bde57"},{url:"/font/DBHelvethaicaX-55Regular.ttf",revision:"f71539381e48974ee6f9c52bfcee8a56"},{url:"/font/Kanit-Bold.ttf",revision:"6f8da8682f5d0bec3e3ba87c8e5d1b96"},{url:"/font/Kanit-Regular.ttf",revision:"4d45567c7e1c1f9d157396d5f4b529ff"},{url:"/img/LogoWebtoons.png",revision:"057c8138b3775a30fa2a14d4c8a5ef37"},{url:"/img/Manga.png",revision:"487947e878044ae9788ae01390a65d5b"},{url:"/img/Manhua.png",revision:"943da7fbd87eac23e9b2d06d3c6a1626"},{url:"/img/Manhwa.png",revision:"0312439b13a81b365ef89268a4c105e8"},{url:"/img/discord.webp",revision:"2ff4937117ed5b20958ed8b5cba956f3"},{url:"/img/favicon.png",revision:"d2d32bdbd9d9a9d63094e90426164aab"},{url:"/img/hotgraph88.webp",revision:"7717b7aeacd76220802770305c5c12eb"},{url:"/img/icon-192x192.png",revision:"b5e968247224f1e65ab1ada0e66c5aa4"},{url:"/img/icon-256x256.png",revision:"195572d11730677d5be4b7fe19d18203"},{url:"/img/icon-384x384.png",revision:"d9a2a848048b87d87d5a6facb653368c"},{url:"/img/icon-512x512.png",revision:"d69427f28c50f0938dfaf14df1947287"},{url:"/img/icon.png",revision:"5643493f6ba76a6e3c82565b0e5db337"},{url:"/img/icon512.png",revision:"de8c0f8fb7370bdc6e3545440c6c882e"},{url:"/img/logo.png",revision:"057c8138b3775a30fa2a14d4c8a5ef37"},{url:"/img/logo_sqare.png",revision:"bf5b1e3f3b8758e3068d2499a3b73337"},{url:"/img/manifest.webmanifest",revision:"fa75a6f6051d65a2e903f9ae928270ae"},{url:"/manifest.json",revision:"900d80500ec04e531d642d545780bb9d"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/robots.txt",revision:"b0633206572ce5f278da35b9635e02f1"},{url:"/styles.css",revision:"9f0bed87fb63ef09a1ff9e9fa5941861"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));