!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.VueWaypoint=n():t.VueWaypoint=n()}(this,function(){return function(t){function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var e={};return n.m=t,n.c=e,n.i=function(t){return t},n.d=function(t,n,e){Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:e})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},n.p="",n(n.s=14)}([function(t,n){t.exports=function(){var t=[];return t.toString=function(){for(var t=[],n=0;n<this.length;n++){var e=this[n];e[2]?t.push("@media "+e[2]+"{"+e[1]+"}"):t.push(e[1])}return t.join("")},t.i=function(n,e){"string"==typeof n&&(n=[[null,n,""]]);for(var i={},o=0;o<this.length;o++){var r=this[o][0];"number"==typeof r&&(i[r]=!0)}for(o=0;o<n.length;o++){var u=n[o];"number"==typeof u[0]&&i[u[0]]||(e&&!u[2]?u[2]=e:e&&(u[2]="("+u[2]+") and ("+e+")"),t.push(u))}},t}},function(t,n){function e(t,n){for(var e=0;e<t.length;e++){var i=t[e],o=s[i.id];if(o){o.refs++;for(var r=0;r<o.parts.length;r++)o.parts[r](i.parts[r]);for(;r<i.parts.length;r++)o.parts.push(l(i.parts[r],n))}else{for(var u=[],r=0;r<i.parts.length;r++)u.push(l(i.parts[r],n));s[i.id]={id:i.id,refs:1,parts:u}}}}function i(t){for(var n=[],e={},i=0;i<t.length;i++){var o=t[i],r=o[0],u=o[1],l=o[2],c=o[3],a={css:u,media:l,sourceMap:c};e[r]?e[r].parts.push(a):n.push(e[r]={id:r,parts:[a]})}return n}function o(t,n){var e=h(),i=y[y.length-1];if("top"===t.insertAt)i?i.nextSibling?e.insertBefore(n,i.nextSibling):e.appendChild(n):e.insertBefore(n,e.firstChild),y.push(n);else{if("bottom"!==t.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");e.appendChild(n)}}function r(t){t.parentNode.removeChild(t);var n=y.indexOf(t);n>=0&&y.splice(n,1)}function u(t){var n=document.createElement("style");return n.type="text/css",o(t,n),n}function l(t,n){var e,i,o;if(n.singleton){var l=v++;e=p||(p=u(n)),i=c.bind(null,e,l,!1),o=c.bind(null,e,l,!0)}else e=u(n),i=a.bind(null,e),o=function(){r(e)};return i(t),function(n){if(n){if(n.css===t.css&&n.media===t.media&&n.sourceMap===t.sourceMap)return;i(t=n)}else o()}}function c(t,n,e,i){var o=e?"":i.css;if(t.styleSheet)t.styleSheet.cssText=w(n,o);else{var r=document.createTextNode(o),u=t.childNodes;u[n]&&t.removeChild(u[n]),u.length?t.insertBefore(r,u[n]):t.appendChild(r)}}function a(t,n){var e=n.css,i=n.media,o=n.sourceMap;if(i&&t.setAttribute("media",i),o&&(e+="\n/*# sourceURL="+o.sources[0]+" */",e+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}var s={},f=function(t){var n;return function(){return"undefined"==typeof n&&(n=t.apply(this,arguments)),n}},d=f(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),h=f(function(){return document.head||document.getElementsByTagName("head")[0]}),p=null,v=0,y=[];t.exports=function(t,n){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");n=n||{},"undefined"==typeof n.singleton&&(n.singleton=d()),"undefined"==typeof n.insertAt&&(n.insertAt="bottom");var o=i(t);return e(o,n),function(t){for(var r=[],u=0;u<o.length;u++){var l=o[u],c=s[l.id];c.refs--,r.push(c)}if(t){var a=i(t);e(a,n)}for(var u=0;u<r.length;u++){var c=r[u];if(0===c.refs){for(var f=0;f<c.parts.length;f++)c.parts[f]();delete s[c.id]}}}};var w=function(){var t=[];return function(n,e){return t[n]=e,t.filter(Boolean).join("\n")}}()},function(t,n,e){!function(n,e){t.exports=e()}(this,function(){return function(t){function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var e={};return n.m=t,n.c=e,n.i=function(t){return t},n.d=function(t,n,e){Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:e})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},n.p="",n(n.s=2)}([function(t,n,e){var i,o,r;!function(e,u){o=[],i=u,r="function"==typeof i?i.apply(n,o):i,!(void 0!==r&&(t.exports=r))}(this,function(){"use strict";var t="0.5.2",n=function(t,n){for(var e=1;n--;)e*=t--;return e},e=function(t,e){return e>t?0:n(t,e)/n(e,e)},i=function(t){return n(t,t)},o=function(t,n){var e=1;if(n)e=i(n);else{for(n=1;e<t;e*=++n);e>t&&(e/=n--)}for(var o=[0];n;e/=n--)o[n]=Math.floor(t/e),t%=e;return o},r=function(t,n){Object.keys(n).forEach(function(e){Object.defineProperty(t,e,{value:n[e],configurable:"next"==e})})},u=function(t,n){Object.defineProperty(t,n,{writable:!0})},l=function(t){var n,e=[];for(this.init();n=this.next();)e.push(t?t(n):n);return this.init(),e},c={toArray:l,map:l,forEach:function(t){var n;for(this.init();n=this.next();)t(n);this.init()},filter:function(t){var n,e=[];for(this.init();n=this.next();)t(n)&&e.push(n);return this.init(),e},lazyMap:function(t){return this._lazyMap=t,this},lazyFilter:function(t){if(Object.defineProperty(this,"next",{writable:!0}),"function"!=typeof t)this.next=this._next;else{"function"!=typeof this._next&&(this._next=this.next);var n=this._next.bind(this);this.next=function(){for(var e;e=n();)if(t(e))return e;return e}.bind(this)}return Object.defineProperty(this,"next",{writable:!1}),this}},a=function(t,n){var e=1<<t.length,i=function(){return e},o=Object.create(t.slice(),{length:{get:i}});return u(o,"index"),r(o,{valueOf:i,init:function(){o.index=0},nth:function(t){if(!(t>=e)){for(var n=0,i=[];t;t>>>=1,n++)1&t&&i.push(this[n]);return"function"==typeof o._lazyMap?o._lazyMap(i):i}},next:function(){return this.nth(this.index++)}}),r(o,c),o.init(),"function"==typeof n?o.map(n):o},s=function(t){var n=t&-t,e=t+n,i=e&-e,o=(i/n>>1)-1;return e|o},f=function(t,n,i){if(n||(n=t.length),n<1)throw new RangeError;if(n>t.length)throw new RangeError;var o=(1<<n)-1,l=e(t.length,n),a=1<<t.length,f=function(){return l},d=Object.create(t.slice(),{length:{get:f}});return u(d,"index"),r(d,{valueOf:f,init:function(){this.index=o},next:function(){if(!(this.index>=a)){for(var t=0,n=this.index,e=[];n;n>>>=1,t++)1&n&&(e[e.length]=this[t]);return this.index=s(this.index),"function"==typeof d._lazyMap?d._lazyMap(e):e}}}),r(d,c),d.init(),"function"==typeof i?d.map(i):d},d=function(t,n){var e=t,i=n,o=0;for(o=e.length-1;o>=0&&1==e[o];o--)i--;if(0==i){e[e.length]=1;for(var r=e.length-2;r>=0;r--)e[r]=r<n-1?1:0}else{for(var u=-1,l=-1,o=0;o<e.length;o++)if(0==e[o]&&u!=-1&&(l=o),1==e[o]&&(u=o),l!=-1&&u!=-1){e[l]=1,e[u]=0;break}i=n;for(var o=e.length-1;o>=u;o--)1==e[o]&&i--;for(var o=0;o<u;o++)e[o]=o<i?1:0}return e},h=function(t){for(var n=[],e=0;e<t;e++)n[e]=1;return n[0]=1,n},p=function(t,n,i){if(n||(n=t.length),n<1)throw new RangeError;if(n>t.length)throw new RangeError;var o=h(n),l=e(t.length,n),a=t.length,s=function(){return l},f=Object.create(t.slice(),{length:{get:s}});return u(f,"index"),r(f,{valueOf:s,init:function(){this.index=o.concat()},next:function(){if(!(this.index.length>a)){for(var t=0,e=this.index,i=[],o=0;o<e.length;o++,t++)e[o]&&(i[i.length]=this[t]);return d(this.index,n),"function"==typeof f._lazyMap?f._lazyMap(i):i}}}),r(f,c),f.init(),"function"==typeof i?f.map(i):f},v=function(t){var n=t.slice(),e=i(n.length);return n.index=0,n.next=function(){if(!(this.index>=e)){for(var t=this.slice(),i=o(this.index,this.length),r=[],u=this.length-1;u>=0;--u)r.push(t.splice(i[u],1)[0]);return this.index++,"function"==typeof n._lazyMap?n._lazyMap(r):r}},n},y=function(t,e,i){if(e||(e=t.length),e<1)throw new RangeError;if(e>t.length)throw new RangeError;var o=n(t.length,e),l=function(){return o},a=Object.create(t.slice(),{length:{get:l}});return u(a,"cmb"),u(a,"per"),r(a,{valueOf:function(){return o},init:function(){this.cmb=f(t,e),this.per=v(this.cmb.next())},next:function(){var t=this.per.next();if(!t){var n=this.cmb.next();if(!n)return;return this.per=v(n),this.next()}return"function"==typeof a._lazyMap?a._lazyMap(t):t}}),r(a,c),a.init(),"function"==typeof i?a.map(i):a},w=function(t){for(var e=0,i=1;i<=t;i++){var o=n(t,i);e+=o}return e},m=function(t,n){var e=w(t.length),i=function(){return e},o=Object.create(t.slice(),{length:{get:i}});return u(o,"cmb"),u(o,"per"),u(o,"nelem"),r(o,{valueOf:function(){return e},init:function(){this.nelem=1,this.cmb=f(t,this.nelem),this.per=v(this.cmb.next())},next:function(){var n=this.per.next();if(!n){var e=this.cmb.next();if(!e){if(this.nelem++,this.nelem>t.length)return;if(this.cmb=f(t,this.nelem),e=this.cmb.next(),!e)return}return this.per=v(e),this.next()}return"function"==typeof o._lazyMap?o._lazyMap(n):n}}),r(o,c),o.init(),"function"==typeof n?o.map(n):o},_=Array.prototype.slice,g=function(){if(!arguments.length)throw new RangeError;var t=_.call(arguments),n=t.reduce(function(t,n){return t*n.length},1),e=function(){return n},i=t.length,o=Object.create(t,{length:{get:e}});if(!n)throw new RangeError;return u(o,"index"),r(o,{valueOf:e,dim:i,init:function(){this.index=0},get:function(){if(arguments.length===this.length){for(var t=[],n=0;n<i;n++){var e=arguments[n];if(e>=this[n].length)return;t.push(this[n][e])}return"function"==typeof o._lazyMap?o._lazyMap(t):t}},nth:function(t){for(var n=[],e=0;e<i;e++){var r=this[e].length,u=t%r;n.push(this[e][u]),t-=u,t/=r}return"function"==typeof o._lazyMap?o._lazyMap(n):n},next:function(){if(!(this.index>=n)){var t=this.nth(this.index);return this.index++,t}}}),r(o,c),o.init(),o},b=function(t,n,e){if(n||(n=t.length),n<1)throw new RangeError;var i=t.length,o=Math.pow(i,n),l=function(){return o},a=Object.create(t.slice(),{length:{get:l}});return u(a,"index"),r(a,{valueOf:l,init:function(){a.index=0},nth:function(e){if(!(e>=o)){for(var r=[],u=0;u<n;u++){var l=e%i;r.push(t[l]),e-=l,e/=i}return"function"==typeof a._lazyMap?a._lazyMap(r):r}},next:function(){return this.nth(this.index++)}}),r(a,c),a.init(),"function"==typeof e?a.map(e):a},x=Object.create(null);return r(x,{C:e,P:n,factorial:i,factoradic:o,cartesianProduct:g,combination:f,bigCombination:p,permutation:y,permutationCombination:m,power:a,baseN:b,VERSION:t}),x})},function(t,n,e){!function(n,e){t.exports=e()}(this,function(){return function(t){function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var e={};return n.m=t,n.c=e,n.i=function(t){return t},n.d=function(t,n,e){Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:e})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},n.p="",n(n.s=0)}([function(t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var e={install:function(t){t.prototype.$throttle=e._throttle},_throttle:function(t,n,e){e=e||this.$el;var i=!1,o=function(){i||(i=!0,window.requestAnimationFrame(function(){e.dispatchEvent(new window.CustomEvent(n)),i=!1}))};e.addEventListener(t,o)}};n.default=e,"undefined"!=typeof window&&window.Vue&&window.Vue.use(e)}])})},function(t,n,e){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(n,"__esModule",{value:!0});var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r=e(1),u=i(r),l=e(0).combination,c={install:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{globalTriggers:["resize","scroll"]};c._windowGroup=[],c._customGroups={},u.default._throttle("resize","vue-collision-window_rect_update",window),window.addEventListener("vue-collision-window_rect_update",c._updateWindowRect),window.dispatchEvent(new Event("vue-collision-window_rect_update"));var e=!0,i=!1,r=void 0;try{for(var l,a=n.globalTriggers[Symbol.iterator]();!(e=(l=a.next()).done);e=!0){var s=l.value;u.default._throttle(s,"vue-collision-"+s,window),window.addEventListener("vue-collision-"+s,c.checkAllGroups)}}catch(t){i=!0,r=t}finally{try{!e&&a.return&&a.return()}finally{if(i)throw r}}t.directive("collision",{bind:function(t,n,e){if("undefined"==typeof n.modifiers.prevent&&c._windowGroup.push(e.child),"object"===o(n.value)&&n.value.length){var i=!0,r=!1,u=void 0;try{for(var l,a=n.value[Symbol.iterator]();!(i=(l=a.next()).done);i=!0){var s=l.value;c._pushVnodeToGroup(e.child,s)}}catch(t){r=!0,u=t}finally{try{!i&&a.return&&a.return()}finally{if(r)throw u}}}e.child._collisionObject={windowGroup:"undefined"==typeof n.modifiers.prevent,customGroupsList:"object"===o(n.value)?n.value:[]}},updated:function(t,n,e,i){if("undefined"==typeof n.modifiers.prevent){var r=c._windowGroup.findIndex(function(t){return t===i.child});c._windowGroup[r]=e.child}if("object"===o(n.oldValue)&&n.oldValue.length){var u=n.oldValue.filter(function(t){return n.value.indexOf(t)<0}),l=!0,a=!1,s=void 0;try{for(var f,d=u[Symbol.iterator]();!(l=(f=d.next()).done);l=!0){var h=f.value;_removeVnodeFromGroup(i.child,h)}}catch(t){a=!0,s=t}finally{try{!l&&d.return&&d.return()}finally{if(a)throw s}}var p=n.value.filter(function(t){return n.oldValue.indexOf(t)<0}),v=!0,y=!1,w=void 0;try{for(var m,_=p[Symbol.iterator]();!(v=(m=_.next()).done);v=!0){var g=m.value;c._pushVnodeToGroup(e.child,g)}}catch(t){y=!0,w=t}finally{try{!v&&_.return&&_.return()}finally{if(y)throw w}}var b=n.value.filter(function(t){return n.oldValue.indexOf(t)>-1}),x=!0,O=!1,G=void 0;try{for(var j,E=b[Symbol.iterator]();!(x=(j=E.next()).done);x=!0){var S=j.value,M=c._customGroups[S].vnodes.findIndex(function(t){return t===i.child});c._customGroups[customGroup].vnodes[M]=e.child}}catch(t){O=!0,G=t}finally{try{!x&&E.return&&E.return()}finally{if(O)throw G}}(u.lenght>0||p.lenght>0||b.lenght>0)&&(c._customGroups[customGroup]._combinations=c._combine(c._customGroups[customGroup].vnodes))}e.child._collisionObject.customGroups="object"===o(n.value)?n.value:[]},unbind:function(t,n,e){if("object"===o(n.value)&&n.oldValue.value){if("undefined"==typeof n.modifiers.prevent){var i=c._windowGroup.findIndex(function(t){return t===oldVNode.child});c._windowGroup.splice(i,1)}var r=!0,u=!1,l=void 0;try{for(var a,s=n.value[Symbol.iterator]();!(r=(a=s.next()).done);r=!0){var f=a.value;_removeVnodeFromGroup(e.child,f),c._customGroups[f]._combinations=c._combine(c._customGroups[f].vnodes)}}catch(t){u=!0,l=t}finally{try{!r&&s.return&&s.return()}finally{if(u)throw l}}}delete e.child._collisionObject}}),t.mixin({mounted:function(){"undefined"!=typeof this._collisionObject&&c.checkGroups([this],c._filterByGroups(this._collisionObject.customGroupsList))},updated:function(){"undefined"!=typeof this._collisionObject&&c.checkGroups([this],c._filterByGroups(this._collisionObject.customGroupsList))}})},checkAllGroups:function(){c.checkGroups()},checkGroups:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:c._windowGroup,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:c._customGroups,e=!0,i=!1,o=void 0;try{for(var r,u=t[Symbol.iterator]();!(e=(r=u.next()).done);e=!0){var l=r.value;c._checkCollision(c._windowRect,l.$el.getBoundingClientRect())?l.$emit("collide",window):l.$emit("non-collide",window)}}catch(t){i=!0,o=t}finally{try{!e&&u.return&&u.return()}finally{if(i)throw o}}var a=!0,s=!1,f=void 0;try{for(var d,h=Object.keys(n)[Symbol.iterator]();!(a=(d=h.next()).done);a=!0){var p=d.value,v=!0,y=!1,w=void 0;try{for(var m,_=n[p].combinations[Symbol.iterator]();!(v=(m=_.next()).done);v=!0){var g=m.value;c._checkCollision(g[0].$el.getBoundingClientRect(),g[1].$el.getBoundingClientRect())?(g[0].$emit("collide-"+p,g[1]),g[1].$emit("collide-"+p,g[0])):(g[0].$emit("non-collide-"+p,g[1]),g[1].$emit("non-collide-"+p,g[0]))}}catch(t){y=!0,w=t}finally{try{!v&&_.return&&_.return()}finally{if(y)throw w}}}}catch(t){s=!0,f=t}finally{try{!a&&h.return&&h.return()}finally{if(s)throw f}}},_updateWindowRect:function(){c._windowRect=c._getWindowRect()},_getWindowRect:function(){return{left:0,top:0,width:window.innerWidth,height:window.innerHeight}},_pushVnodeToGroup:function(t,n){c._customGroups.hasOwnProperty(n)||(c._customGroups[n]={vnodes:[],combinations:[]}),c._customGroups[n].vnodes.push(t),c._customGroups[n].combinations=c._combine(c._customGroups[n].vnodes)},_removeVnodeFromGroup:function(t,n){var e=c._customGroups[n].vnodes.findIndex(function(n){return n===t});c._customGroups[n].vnodes.splice(e,1),c._customGroups[n].combinations=c._combine(c._customGroups[n].vnodes)},_filterByGroups:function(t){var n=[],e=!0,i=!1,o=void 0;try{for(var r,u=t[Symbol.iterator]();!(e=(r=u.next()).done);e=!0){var l=r.value;n.push(c._customGroups[l])}}catch(t){i=!0,o=t}finally{try{!e&&u.return&&u.return()}finally{if(i)throw o}}return n},_combine:function(t){var n=[];try{for(var e=l(t,2),i=void 0;i=e.next();)n.push(i)}catch(t){}return n},_checkCollision:function(t,n){return t.left<n.left+n.width&&t.left+t.width>n.left&&t.top<n.top+n.height&&t.height+t.top>n.top}};n.default=c,"undefined"!=typeof window&&window.Vue&&window.Vue.use(c)}])})},function(t,n,e){var i,o;e(13),i=e(5);var r=e(11);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=r.render,o.staticRenderFns=r.staticRenderFns,o._scopeId="data-v-4795ebc7",t.exports=i},function(t,n,e){!function(n,e){t.exports=e()}(this,function(){return function(t){function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var e={};return n.m=t,n.c=e,n.i=function(t){return t},n.d=function(t,n,e){Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:e})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},n.p="",n(n.s=0)}([function(t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var e={install:function(t){t.prototype.$throttle=e._throttle},_throttle:function(t,n,e){e=e||this.$el;var i=!1,o=function(){i||(i=!0,window.requestAnimationFrame(function(){e.dispatchEvent(new window.CustomEvent(n)),i=!1}))};return e.addEventListener(t,o),o}};n.default=e,"undefined"!=typeof window&&window.Vue&&window.Vue.use(e)}])})},function(t,n,e){"use strict";var i=e(9),o=e.n(i);n.default={name:"waypoint",components:{WaypointCollider:o.a},data:function(){return{colliding:!1,lastScrollY:window.scrollY,lastScrollX:window.scrollX,direction:"down",_throttledScrollListener:void 0}},computed:{_scrollHandler:function(){return this.horizontal?this._handleCompleteScroll:this._handleVerticalScroll},_scrollVerticalDirection:function(){return Math.sign(window.scrollY-this.lastScrollY)},_scrollHorizontalDirection:function(){return Math.sign(window.scrollX-this.lastScrollX)},going:function(){return this.colliding?"in":"out"}},props:{active:{type:Boolean,default:!0},position:{type:String,default:void 0},horizontal:{type:Boolean,default:!1}},methods:{_vueWaypointHandle:function(t){this.colliding||(this.colliding=!0,this._emitWaypointEvent())},_vueWaypointHandleOff:function(t){this.colliding&&(this.colliding=!1,this._emitWaypointEvent())},_handleVerticalScroll:function(){this.direction=this._getDirection(),this.lastScrollY=window.scrollY},_handleCompleteScroll:function(){this.direction=this._getDirection(),this.lastScrollY=window.scrollY,this.lastScrollX=window.scrollX},_emitWaypointEvent:function(){this.$emit("waypoint-"+this.direction+"-"+this.going),this.$emit("waypoint",this.direction,this.going)},_getDirection:function(){if(this._scrollVerticalDirection>0)return"down";if(this._scrollVerticalDirection<0)return"up";if(this.horizontal)return this._scrollHorizontalDirection>0?"right":this._scrollHorizontalDirection<0?"left":void 0},_addEventListeners:function(){this._throttledScrollListener=this.$throttle("scroll","v-waypoint-throttled-scroll",window),window.addEventListener("v-waypoint-throttled-scroll",this._scrollHandler)},_updateEventListeners:function(){window.removeEventListener("v-waypoint-throttled-scroll",this._scrollHandler),window.addEventListener("v-waypoint-throttled-scroll",this._scrollHandler)},_removeEventListeners:function(){window.removeEventListener("scroll",this._throttledScrollListener),window.removeEventListener("v-waypoint-throttled-scroll",this._scrollHandler)}},watch:{active:function(){this.active?this._addEventListeners():this._removeEventListeners()}},created:function(){this.active&&this._addEventListeners()},updated:function(){this.active&&this._updateEventListeners()},beforeDestroy:function(){this.active&&this._removeEventListeners()}}},function(t,n,e){"use strict";n.default={name:"waypoint-collider"}},function(t,n,e){n=t.exports=e(0)(),n.push([t.i,".vue-waypoint__waypoint__collider[data-v-176bc24a]{position:absolute;width:100%;height:100%}",""])},function(t,n,e){n=t.exports=e(0)(),n.push([t.i,".vue-waypoint__waypoint[data-v-4795ebc7]{width:100%;height:0}.vue-waypoint__waypoint.top[data-v-4795ebc7]{position:absolute;top:0}.vue-waypoint__waypoint.right[data-v-4795ebc7]{position:absolute;right:0}.vue-waypoint__waypoint.bottom[data-v-4795ebc7]{position:absolute;bottom:0}.vue-waypoint__waypoint.left[data-v-4795ebc7]{position:absolute;left:0}",""])},function(t,n,e){var i,o;e(12),i=e(6);var r=e(10);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=r.render,o.staticRenderFns=r.staticRenderFns,o._scopeId="data-v-176bc24a",t.exports=i},function(t,n){t.exports={render:function(){var t=this,n=t.$createElement;return n("div",{staticClass:"vue-waypoint__waypoint__collider"})},staticRenderFns:[]}},function(t,n){t.exports={render:function(){var t=this,n=t.$createElement;return n("div",{staticClass:"vue-waypoint__waypoint",class:[t.position]},[n("waypoint-collider",{directives:[{name:"collision",rawName:"v-collision"}],on:{collide:t._vueWaypointHandle,"non-collide":t._vueWaypointHandleOff}})])},staticRenderFns:[]}},function(t,n,e){var i=e(7);"string"==typeof i&&(i=[[t.i,i,""]]);e(1)(i,{});i.locals&&(t.exports=i.locals)},function(t,n,e){var i=e(8);"string"==typeof i&&(i=[[t.i,i,""]]);e(1)(i,{});i.locals&&(t.exports=i.locals)},function(t,n,e){"use strict";var i=e(2),o=e.n(i),r=e(4),u=e.n(r),l=e(3),c=e.n(l),a={install:function(t){t.use(u.a),t.use(o.a),t.component("v-waypoint",c.a)}};n.default=a,"undefined"!=typeof window&&window.Vue&&window.Vue.use(a)}])});