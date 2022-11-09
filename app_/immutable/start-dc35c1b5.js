var Ke=Object.defineProperty;var Fe=(r,e,n)=>e in r?Ke(r,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):r[e]=n;var fe=(r,e,n)=>(Fe(r,typeof e!="symbol"?e+"":e,n),n);import{S as Je,i as He,s as We,a as Ge,e as Y,b as B,g as Q,t as D,c as Z,d as T,f as q,h as Me,o as _e,j as Xe,k as ue,l as H,m as Ye,n as Qe,p as z,q as K,r as F,u as Ae}from"./chunks/index-43d95a4d.js";import{g as Ie,f as je,a as De,s as X,b as he,i as Ze}from"./chunks/singletons-2adae24b.js";import{s as xe}from"./chunks/paths-9b83c8fd.js";const et=function(){const e=document.createElement("link").relList;return e&&e.supports&&e.supports("modulepreload")?"modulepreload":"preload"}(),tt=function(r,e){return new URL(r,e).href},Te={},V=function(e,n,o){if(!n||n.length===0)return e();const s=document.getElementsByTagName("link");return Promise.all(n.map(f=>{if(f=tt(f,o),f in Te)return;Te[f]=!0;const t=f.endsWith(".css"),l=t?'[rel="stylesheet"]':"";if(!!o)for(let g=s.length-1;g>=0;g--){const v=s[g];if(v.href===f&&(!t||v.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${f}"]${l}`))return;const u=document.createElement("link");if(u.rel=t?"stylesheet":et,t||(u.as="script",u.crossOrigin=""),u.href=f,document.head.appendChild(u),t)return new Promise((g,v)=>{u.addEventListener("load",g),u.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${f}`)))})})).then(()=>e())};class re{constructor(e,n){fe(this,"name","HttpError");fe(this,"stack");this.status=e,this.message=n!=null?n:`Error: ${e}`}toString(){return this.message}}class Ue{constructor(e,n){this.status=e,this.location=n}}function nt(r,e){return r==="/"||e==="ignore"?r:e==="never"?r.endsWith("/")?r.slice(0,-1):r:e==="always"&&!r.endsWith("/")?r+"/":r}function rt(r){for(const e in r)r[e]=r[e].replace(/%23/g,"#").replace(/%3[Bb]/g,";").replace(/%2[Cc]/g,",").replace(/%2[Ff]/g,"/").replace(/%3[Ff]/g,"?").replace(/%3[Aa]/g,":").replace(/%40/g,"@").replace(/%26/g,"&").replace(/%3[Dd]/g,"=").replace(/%2[Bb]/g,"+").replace(/%24/g,"$");return r}const at=["href","pathname","search","searchParams","toString","toJSON"];function st(r,e){const n=new URL(r);for(const o of at){let s=n[o];Object.defineProperty(n,o,{get(){return e(),s},enumerable:!0,configurable:!0})}return n[Symbol.for("nodejs.util.inspect.custom")]=(o,s,f)=>f(r,s),ot(n),n}function ot(r){Object.defineProperty(r,"hash",{get(){throw new Error("Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead")}})}function it(r){let e=5381,n=r.length;if(typeof r=="string")for(;n;)e=e*33^r.charCodeAt(--n);else for(;n;)e=e*33^r[--n];return(e>>>0).toString(36)}const qe=window.fetch;function lt(r,e){let o=`script[sveltekit\\:data-type="data"][sveltekit\\:data-url=${JSON.stringify(typeof r=="string"?r:r.url)}]`;e&&typeof e.body=="string"&&(o+=`[sveltekit\\:data-body="${it(e.body)}"]`);const s=document.querySelector(o);if(s&&s.textContent){const{body:f,...t}=JSON.parse(s.textContent);return Promise.resolve(new Response(f,t))}return qe(r,e)}const ct=/^(\.\.\.)?(\w+)(?:=(\w+))?$/;function ft(r){const e=[],n=[];let o=!0;if(/\]\[/.test(r))throw new Error(`Invalid route ${r} \u2014 parameters must be separated`);if(Ve("[",r)!==Ve("]",r))throw new Error(`Invalid route ${r} \u2014 brackets are unbalanced`);return{pattern:r===""?/^\/$/:new RegExp(`^${r.split(/(?:\/|$)/).filter(ut).map((f,t,l)=>{const p=decodeURIComponent(f),u=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(p);if(u)return e.push(u[1]),n.push(u[2]),"(?:/(.*))?";const g=t===l.length-1;return p&&"/"+p.split(/\[(.+?)\]/).map((v,U)=>{if(U%2){const $=ct.exec(v);if(!$)throw new Error(`Invalid param: ${v}. Params and matcher names can only have underscores and alphanumeric characters.`);const[,A,J,W]=$;return e.push(J),n.push(W),A?"(.*?)":"([^/]+?)"}return g&&v.includes(".")&&(o=!1),v.normalize().replace(/%5[Bb]/g,"[").replace(/%5[Dd]/g,"]").replace(/#/g,"%23").replace(/\?/g,"%3F").replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}).join("")}).join("")}${o?"/?":""}$`),names:e,types:n}}function ut(r){return!/^\([^)]+\)$/.test(r)}function pt(r,e,n,o){const s={};for(let f=0;f<e.length;f+=1){const t=e[f],l=n[f],p=r[f+1]||"";if(l){const u=o[l];if(!u)throw new Error(`Missing "${l}" param matcher`);if(!u(p))return}s[t]=p}return s}function Ve(r,e){let n=0;for(let o=0;o<e.length;o+=1)e[o]===r&&(n+=1);return n}function dt(r,e,n,o){const s=new Set(e);return Object.entries(n).map(([l,[p,u,g]])=>{const{pattern:v,names:U,types:$}=ft(l),A={id:l,exec:J=>{const W=v.exec(J);if(W)return pt(W,U,$,o)},errors:[1,...g||[]].map(J=>r[J]),layouts:[0,...u||[]].map(t),leaf:f(p)};return A.errors.length=A.layouts.length=Math.max(A.errors.length,A.layouts.length),A});function f(l){const p=l<0;return p&&(l=~l),[p,r[l]]}function t(l){return l===void 0?l:[s.has(l),r[l]]}}function _t(r,e){return new re(r,e)}function ht(r){let e,n,o;var s=r[0][0];function f(t){return{props:{data:t[1],errors:t[4]}}}return s&&(e=new s(f(r))),{c(){e&&z(e.$$.fragment),n=Y()},m(t,l){e&&K(e,t,l),B(t,n,l),o=!0},p(t,l){const p={};if(l&2&&(p.data=t[1]),l&16&&(p.errors=t[4]),s!==(s=t[0][0])){if(e){Q();const u=e;D(u.$$.fragment,1,0,()=>{F(u,1)}),Z()}s?(e=new s(f(t)),z(e.$$.fragment),T(e.$$.fragment,1),K(e,n.parentNode,n)):e=null}else s&&e.$set(p)},i(t){o||(e&&T(e.$$.fragment,t),o=!0)},o(t){e&&D(e.$$.fragment,t),o=!1},d(t){t&&q(n),e&&F(e,t)}}}function mt(r){let e,n,o;var s=r[0][0];function f(t){return{props:{data:t[1],errors:t[4],$$slots:{default:[yt]},$$scope:{ctx:t}}}}return s&&(e=new s(f(r))),{c(){e&&z(e.$$.fragment),n=Y()},m(t,l){e&&K(e,t,l),B(t,n,l),o=!0},p(t,l){const p={};if(l&2&&(p.data=t[1]),l&16&&(p.errors=t[4]),l&1053&&(p.$$scope={dirty:l,ctx:t}),s!==(s=t[0][0])){if(e){Q();const u=e;D(u.$$.fragment,1,0,()=>{F(u,1)}),Z()}s?(e=new s(f(t)),z(e.$$.fragment),T(e.$$.fragment,1),K(e,n.parentNode,n)):e=null}else s&&e.$set(p)},i(t){o||(e&&T(e.$$.fragment,t),o=!0)},o(t){e&&D(e.$$.fragment,t),o=!1},d(t){t&&q(n),e&&F(e,t)}}}function gt(r){let e,n,o;var s=r[0][1];function f(t){return{props:{data:t[2],errors:t[4]}}}return s&&(e=new s(f(r))),{c(){e&&z(e.$$.fragment),n=Y()},m(t,l){e&&K(e,t,l),B(t,n,l),o=!0},p(t,l){const p={};if(l&4&&(p.data=t[2]),l&16&&(p.errors=t[4]),s!==(s=t[0][1])){if(e){Q();const u=e;D(u.$$.fragment,1,0,()=>{F(u,1)}),Z()}s?(e=new s(f(t)),z(e.$$.fragment),T(e.$$.fragment,1),K(e,n.parentNode,n)):e=null}else s&&e.$set(p)},i(t){o||(e&&T(e.$$.fragment,t),o=!0)},o(t){e&&D(e.$$.fragment,t),o=!1},d(t){t&&q(n),e&&F(e,t)}}}function wt(r){let e,n,o;var s=r[0][1];function f(t){return{props:{data:t[2],errors:t[4],$$slots:{default:[bt]},$$scope:{ctx:t}}}}return s&&(e=new s(f(r))),{c(){e&&z(e.$$.fragment),n=Y()},m(t,l){e&&K(e,t,l),B(t,n,l),o=!0},p(t,l){const p={};if(l&4&&(p.data=t[2]),l&16&&(p.errors=t[4]),l&1049&&(p.$$scope={dirty:l,ctx:t}),s!==(s=t[0][1])){if(e){Q();const u=e;D(u.$$.fragment,1,0,()=>{F(u,1)}),Z()}s?(e=new s(f(t)),z(e.$$.fragment),T(e.$$.fragment,1),K(e,n.parentNode,n)):e=null}else s&&e.$set(p)},i(t){o||(e&&T(e.$$.fragment,t),o=!0)},o(t){e&&D(e.$$.fragment,t),o=!1},d(t){t&&q(n),e&&F(e,t)}}}function bt(r){let e,n,o;var s=r[0][2];function f(t){return{props:{data:t[3],errors:t[4]}}}return s&&(e=new s(f(r))),{c(){e&&z(e.$$.fragment),n=Y()},m(t,l){e&&K(e,t,l),B(t,n,l),o=!0},p(t,l){const p={};if(l&8&&(p.data=t[3]),l&16&&(p.errors=t[4]),s!==(s=t[0][2])){if(e){Q();const u=e;D(u.$$.fragment,1,0,()=>{F(u,1)}),Z()}s?(e=new s(f(t)),z(e.$$.fragment),T(e.$$.fragment,1),K(e,n.parentNode,n)):e=null}else s&&e.$set(p)},i(t){o||(e&&T(e.$$.fragment,t),o=!0)},o(t){e&&D(e.$$.fragment,t),o=!1},d(t){t&&q(n),e&&F(e,t)}}}function yt(r){let e,n,o,s;const f=[wt,gt],t=[];function l(p,u){return p[0][2]?0:1}return e=l(r),n=t[e]=f[e](r),{c(){n.c(),o=Y()},m(p,u){t[e].m(p,u),B(p,o,u),s=!0},p(p,u){let g=e;e=l(p),e===g?t[e].p(p,u):(Q(),D(t[g],1,1,()=>{t[g]=null}),Z(),n=t[e],n?n.p(p,u):(n=t[e]=f[e](p),n.c()),T(n,1),n.m(o.parentNode,o))},i(p){s||(T(n),s=!0)},o(p){D(n),s=!1},d(p){t[e].d(p),p&&q(o)}}}function Ne(r){let e,n=r[6]&&Ce(r);return{c(){e=Xe("div"),n&&n.c(),ue(e,"id","svelte-announcer"),ue(e,"aria-live","assertive"),ue(e,"aria-atomic","true"),H(e,"position","absolute"),H(e,"left","0"),H(e,"top","0"),H(e,"clip","rect(0 0 0 0)"),H(e,"clip-path","inset(50%)"),H(e,"overflow","hidden"),H(e,"white-space","nowrap"),H(e,"width","1px"),H(e,"height","1px")},m(o,s){B(o,e,s),n&&n.m(e,null)},p(o,s){o[6]?n?n.p(o,s):(n=Ce(o),n.c(),n.m(e,null)):n&&(n.d(1),n=null)},d(o){o&&q(e),n&&n.d()}}}function Ce(r){let e;return{c(){e=Ye(r[7])},m(n,o){B(n,e,o)},p(n,o){o&128&&Qe(e,n[7])},d(n){n&&q(e)}}}function vt(r){let e,n,o,s,f;const t=[mt,ht],l=[];function p(g,v){return g[0][1]?0:1}e=p(r),n=l[e]=t[e](r);let u=r[5]&&Ne(r);return{c(){n.c(),o=Ge(),u&&u.c(),s=Y()},m(g,v){l[e].m(g,v),B(g,o,v),u&&u.m(g,v),B(g,s,v),f=!0},p(g,[v]){let U=e;e=p(g),e===U?l[e].p(g,v):(Q(),D(l[U],1,1,()=>{l[U]=null}),Z(),n=l[e],n?n.p(g,v):(n=l[e]=t[e](g),n.c()),T(n,1),n.m(o.parentNode,o)),g[5]?u?u.p(g,v):(u=Ne(g),u.c(),u.m(s.parentNode,s)):u&&(u.d(1),u=null)},i(g){f||(T(n),f=!0)},o(g){D(n),f=!1},d(g){l[e].d(g),g&&q(o),u&&u.d(g),g&&q(s)}}}function kt(r,e,n){let{stores:o}=e,{page:s}=e,{components:f}=e,{data_0:t=null}=e,{data_1:l=null}=e,{data_2:p=null}=e,{errors:u}=e;Me(o.page.notify);let g=!1,v=!1,U=null;return _e(()=>{const $=o.page.subscribe(()=>{g&&(n(6,v=!0),n(7,U=document.title||"untitled page"))});return n(5,g=!0),$}),r.$$set=$=>{"stores"in $&&n(8,o=$.stores),"page"in $&&n(9,s=$.page),"components"in $&&n(0,f=$.components),"data_0"in $&&n(1,t=$.data_0),"data_1"in $&&n(2,l=$.data_1),"data_2"in $&&n(3,p=$.data_2),"errors"in $&&n(4,u=$.errors)},r.$$.update=()=>{r.$$.dirty&768&&o.page.set(s)},[f,t,l,p,u,g,v,U,o,s]}class Et extends Je{constructor(e){super(),He(this,e,kt,vt,We,{stores:8,page:9,components:0,data_0:1,data_1:2,data_2:3,errors:4})}}const $t={},ae=[()=>V(()=>import("./chunks/0-6775fdfc.js"),["./chunks/0-6775fdfc.js","./components/layout.svelte-f7e5ca26.js","./chunks/index-43d95a4d.js"],import.meta.url),()=>V(()=>import("./chunks/1-98cafca7.js"),["./chunks/1-98cafca7.js","./components/error.svelte-3e8bb3c0.js","./chunks/index-43d95a4d.js","./chunks/stores-730e01a1.js","./chunks/singletons-2adae24b.js","./chunks/paths-9b83c8fd.js"],import.meta.url),()=>V(()=>import("./chunks/2-64b7af11.js"),["./chunks/2-64b7af11.js","./components/pages/(pc)/peace-corps/_layout.svelte-512321d0.js","./chunks/index-43d95a4d.js","./chunks/scripts-38dd2a84.js","./assets/scripts-0dbb857c.css","./chunks/stores-730e01a1.js","./chunks/singletons-2adae24b.js","./chunks/paths-9b83c8fd.js","./assets/_layout-b14677f6.css","./assets/Sprite-cf769916.css"],import.meta.url),()=>V(()=>import("./chunks/3-18942967.js"),["./chunks/3-18942967.js","./components/pages/(work)/_layout.svelte-0064987e.js","./chunks/index-43d95a4d.js","./chunks/scripts-38dd2a84.js","./assets/scripts-0dbb857c.css","./chunks/paths-9b83c8fd.js","./chunks/Sprite-378acf0e.js","./assets/Sprite-cf769916.css","./chunks/stores-730e01a1.js","./chunks/singletons-2adae24b.js","./assets/_layout-6f6073d4.css"],import.meta.url),()=>V(()=>import("./chunks/4-74084eea.js"),["./chunks/4-74084eea.js","./components/pages/(work)/_error.svelte-f5aaecb4.js","./chunks/index-43d95a4d.js","./chunks/stores-730e01a1.js","./chunks/singletons-2adae24b.js","./chunks/paths-9b83c8fd.js"],import.meta.url),()=>V(()=>import("./chunks/5-dc67b3d7.js"),["./chunks/5-dc67b3d7.js","./components/pages/(pc)/peace-corps/_page.svelte-86564776.js","./chunks/index-43d95a4d.js","./chunks/DarkPaginationNav.svelte_svelte_type_style_lang-2ff62ee7.js","./assets/DarkPaginationNav-ecfdfdcc.css","./chunks/ContentCard-976f547b.js","./chunks/paths-9b83c8fd.js","./assets/ContentCard-92a20ff9.css","./assets/_page-dc41f94f.css"],import.meta.url),()=>V(()=>import("./chunks/6-519f7920.js"),["./chunks/6-519f7920.js","./components/pages/(pc)/peace-corps/_slug_/_page.svelte-351f7535.js","./chunks/index-43d95a4d.js","./assets/_page-84c85443.css","./assets/Sprite-cf769916.css"],import.meta.url),()=>V(()=>import("./chunks/7-34df7b32.js"),["./chunks/7-34df7b32.js","./components/pages/(work)/_page.svelte-6720c6b9.js","./chunks/index-43d95a4d.js","./chunks/ContentCard-976f547b.js","./chunks/paths-9b83c8fd.js","./assets/ContentCard-92a20ff9.css","./assets/_page-f1239093.css"],import.meta.url),()=>V(()=>import("./chunks/8-c0d71d21.js"),["./chunks/8-c0d71d21.js","./components/pages/(work)/_page_/_page.svelte-bc5a6a56.js","./chunks/index-43d95a4d.js"],import.meta.url),()=>V(()=>import("./chunks/9-f56b1eb0.js"),["./chunks/9-f56b1eb0.js","./components/pages/(work)/_type_/_year_/_month_/_day_/_slug_/_page.svelte-b9579261.js","./chunks/index-43d95a4d.js"],import.meta.url),()=>V(()=>import("./chunks/10-917d96ba.js"),["./chunks/10-917d96ba.js","./components/pages/(work)/content/_slug_/_page.svelte-61f539e1.js","./chunks/index-43d95a4d.js","./chunks/Sprite-378acf0e.js","./assets/Sprite-cf769916.css","./chunks/paths-9b83c8fd.js","./assets/_page-417a0eb3.css"],import.meta.url),()=>V(()=>import("./chunks/11-c94c9a8b.js"),["./chunks/11-c94c9a8b.js","./components/pages/(work)/list/_type_/_page.svelte-0b578883.js","./chunks/index-43d95a4d.js","./chunks/DarkPaginationNav.svelte_svelte_type_style_lang-2ff62ee7.js","./assets/DarkPaginationNav-ecfdfdcc.css","./chunks/ContentCard-976f547b.js","./chunks/paths-9b83c8fd.js","./assets/ContentCard-92a20ff9.css","./assets/_page-f5cf6207.css"],import.meta.url)],Rt=[2],Lt={"(work)":[-8,[3],[4]],"(pc)/peace-corps":[5,[2]],"(pc)/peace-corps/[slug]":[-7,[2]],"(work)/content/[slug]":[-11,[3],[4]],"(work)/list/[type]":[-12,[3],[4]],"(work)/[page]":[-9,[3],[4]],"(work)/[type]/[year]/[month]/[day]/[slug]":[-10,[3],[4]]},St="/__data.js",ze="sveltekit:scroll",G="sveltekit:index",pe=dt(ae,Rt,Lt,$t),me=ae[0],ge=ae[1];me();ge();let ee={};try{ee=JSON.parse(sessionStorage[ze])}catch{}function de(r){ee[r]=he()}function Pt({target:r,base:e,trailing_slash:n}){var Le;const o=[],s={id:null,promise:null},f={before_navigate:[],after_navigate:[]};let t={branch:[],error:null,session_id:0,url:null},l=!1,p=!0,u=!1,g=1,v=null,U,$=!0,A=(Le=history.state)==null?void 0:Le[G];A||(A=Date.now(),history.replaceState({...history.state,[G]:A},"",location.href));const J=ee[A];J&&(history.scrollRestoration="manual",scrollTo(J.x,J.y));let W=!1,x,we;async function be(a,{noscroll:d=!1,replaceState:_=!1,keepfocus:i=!1,state:c={}},R){if(typeof a=="string"&&(a=new URL(a,Ie(document))),$)return ie({url:a,scroll:d?he():null,keepfocus:i,redirect_chain:R,details:{state:c,replaceState:_},accepted:()=>{},blocked:()=>{}});await M(a)}async function ye(a){const d=Re(a);if(!d)throw new Error("Attempted to prefetch a URL that does not belong to this app");return s.promise=$e(d),s.id=d.id,s.promise}async function ve(a,d,_,i){var k,y,b;const c=Re(a),R=we={};let h=c&&await $e(c);if(!h&&a.origin===location.origin&&a.pathname===location.pathname&&(h=await ne({status:404,error:new Error(`Not found: ${a.pathname}`),url:a,routeId:null})),!h)return await M(a),!1;if(a=(c==null?void 0:c.url)||a,we!==R)return!1;if(o.length=0,h.type==="redirect")if(d.length>10||d.includes(a.pathname))h=await ne({status:500,error:new Error("Redirect loop"),url:a,routeId:null});else return $?be(new URL(h.location,a).href,{},[...d,a.pathname]):await M(new URL(h.location,location.href)),!1;else((y=(k=h.props)==null?void 0:k.page)==null?void 0:y.status)>=400&&await X.updated.check()&&await M(a);if(u=!0,_&&_.details){const{details:P}=_,j=P.replaceState?0:1;P.state[G]=A+=j,history[P.replaceState?"replaceState":"pushState"](P.state,"",a)}if(l?(t=h.state,h.props.page&&(h.props.page.url=a),U.$set(h.props)):ke(h),_){const{scroll:P,keepfocus:j}=_;if(!j){const E=document.body,O=E.getAttribute("tabindex");E.tabIndex=-1,E.focus({preventScroll:!0}),setTimeout(()=>{var m;(m=getSelection())==null||m.removeAllRanges()}),O!==null?E.setAttribute("tabindex",O):E.removeAttribute("tabindex")}if(await Ae(),p){const E=a.hash&&document.getElementById(a.hash.slice(1));P?scrollTo(P.x,P.y):E?E.scrollIntoView():scrollTo(0,0)}}else await Ae();s.promise=null,s.id=null,p=!0,h.props.page&&(x=h.props.page);const L=h.state.branch[h.state.branch.length-1];$=((b=L==null?void 0:L.node.shared)==null?void 0:b.router)!==!1,i&&i(),u=!1}function ke(a){t=a.state;const d=document.querySelector("style[data-sveltekit]");if(d&&d.remove(),x=a.props.page,U=new Et({target:r,props:{...a.props,stores:X},hydrate:!0}),$){const _={from:null,to:new URL(location.href)};f.after_navigate.forEach(i=>i(_))}l=!0}async function te({url:a,params:d,branch:_,status:i,error:c,routeId:R,validation_errors:h}){var j;const L=_.filter(Boolean),k={type:"loaded",state:{url:a,params:d,branch:_,error:c,session_id:g},props:{components:L.map(E=>E.node.component),errors:h}};let y={},b=!x;for(let E=0;E<L.length;E+=1){const O=L[E];y={...y,...O.data},(b||!t.branch.some(m=>m===O))&&(k.props[`data_${E}`]=y,b=b||Object.keys((j=O.data)!=null?j:{}).length>0)}if(b||(b=Object.keys(x.data).length!==Object.keys(y).length),!t.url||a.href!==t.url.href||t.error!==c||b){k.props.page={error:c,params:d,routeId:R,status:i,url:a,data:b?y:x.data};const E=(O,m)=>{Object.defineProperty(k.props.page,O,{get:()=>{throw new Error(`$page.${O} has been replaced by $page.url.${m}`)}})};E("origin","origin"),E("path","pathname"),E("query","searchParams")}return k}async function se({loader:a,parent:d,url:_,params:i,routeId:c,server_data_node:R}){var y,b,P,j,E;let h=null;const L={dependencies:new Set,params:new Set,parent:!1,url:!1},k=await a();if((y=k.shared)!=null&&y.load){let O=function(...w){for(const S of w){const{href:N}=new URL(S,_);L.dependencies.add(N)}};const m={};for(const w in i)Object.defineProperty(m,w,{get(){return L.params.add(w),i[w]},enumerable:!0});const I={routeId:c,params:m,data:(b=R==null?void 0:R.data)!=null?b:null,url:st(_,()=>{L.url=!0}),async fetch(w,S){let N;typeof w=="string"?N=w:(N=w.url,S={body:w.method==="GET"||w.method==="HEAD"?void 0:await w.blob(),cache:w.cache,credentials:w.credentials,headers:w.headers,integrity:w.integrity,keepalive:w.keepalive,method:w.method,mode:w.mode,redirect:w.redirect,referrer:w.referrer,referrerPolicy:w.referrerPolicy,signal:w.signal,...S});const C=new URL(N,_).href;return O(C),l?qe(C,S):lt(N,S)},setHeaders:()=>{},depends:O,parent(){return L.parent=!0,d()}};Object.defineProperties(I,{props:{get(){throw new Error("@migration task: Replace `props` with `data` stuff https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693")},enumerable:!1},session:{get(){throw new Error("session is no longer available. See https://github.com/sveltejs/kit/discussions/5883")},enumerable:!1},stuff:{get(){throw new Error("@migration task: Remove stuff https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693")},enumerable:!1}}),h=(P=await k.shared.load.call(null,I))!=null?P:null}return{node:k,loader:a,server:R,shared:(j=k.shared)!=null&&j.load?{type:"data",data:h,uses:L}:null,data:(E=h!=null?h:R==null?void 0:R.data)!=null?E:null}}function Ee(a,d,_){if(!_)return!1;if(_.parent&&d||a.url&&_.url)return!0;for(const i of a.params)if(_.params.has(i))return!0;for(const i of _.dependencies)if(o.some(c=>c(i)))return!0;return!1}function oe(a,d){var _,i;return(a==null?void 0:a.type)==="data"?{type:"data",data:a.data,uses:{dependencies:new Set((_=a.uses.dependencies)!=null?_:[]),params:new Set((i=a.uses.params)!=null?i:[]),parent:!!a.uses.parent,url:!!a.uses.url}}:(a==null?void 0:a.type)==="skip"&&d!=null?d:null}async function $e({id:a,url:d,params:_,route:i}){if(s.id===a&&s.promise)return s.promise;const{errors:c,layouts:R,leaf:h}=i,L=t.url&&{url:a!==t.url.pathname+t.url.search,params:Object.keys(_).filter(m=>t.params[m]!==_[m])},k=[...R,h];c.forEach(m=>m==null?void 0:m().catch(()=>{})),k.forEach(m=>m==null?void 0:m[1]().catch(()=>{}));let y=null;const b=k.reduce((m,I,w)=>{var C;const S=t.branch[w],N=!!(I!=null&&I[0])&&((S==null?void 0:S.loader)!==I[1]||Ee(L,m.some(Boolean),(C=S.server)==null?void 0:C.uses));return m.push(N),m},[]);if(b.some(Boolean)){try{y=await Be(d,b)}catch(m){return ne({status:500,error:m,url:d,routeId:i.id})}if(y.type==="redirect")return y}const P=y==null?void 0:y.nodes;let j=!1;const E=k.map(async(m,I)=>{var le,Se;if(!m)return;const w=t.branch[I],S=(le=P==null?void 0:P[I])!=null?le:null;if((!S||S.type==="skip")&&m[1]===(w==null?void 0:w.loader)&&!Ee(L,j,(Se=w.shared)==null?void 0:Se.uses))return w;if(j=!0,(S==null?void 0:S.type)==="error")throw S.httperror?_t(S.httperror.status,S.httperror.message):S.error;return se({loader:m[1],url:d,params:_,routeId:i.id,parent:async()=>{var Oe;const Pe={};for(let ce=0;ce<I;ce+=1)Object.assign(Pe,(Oe=await E[ce])==null?void 0:Oe.data);return Pe},server_data_node:oe(S,w==null?void 0:w.server)})});for(const m of E)m.catch(()=>{});const O=[];for(let m=0;m<k.length;m+=1)if(k[m])try{O.push(await E[m])}catch(I){const w=I;if(w instanceof Ue)return{type:"redirect",location:w.location};const S=I instanceof re?I.status:500;for(;m--;)if(c[m]){let N,C=m;for(;!O[C];)C-=1;try{return N={node:await c[m](),loader:c[m],data:{},server:null,shared:null},await te({url:d,params:_,branch:O.slice(0,C+1).concat(N),status:S,error:w,routeId:i.id})}catch{continue}}M(d);return}else O.push(void 0);return await te({url:d,params:_,branch:O,status:200,error:null,routeId:i.id})}async function ne({status:a,error:d,url:_,routeId:i}){var y;const c={},R=await me();let h=null;if(R.server)try{const b=await Be(_,[!0]);if(b.type!=="data"||b.nodes[0]&&b.nodes[0].type!=="data")throw 0;h=(y=b.nodes[0])!=null?y:null}catch{M(_);return}const L=await se({loader:me,url:_,params:c,routeId:i,parent:()=>Promise.resolve({}),server_data_node:oe(h)}),k={node:await ge(),loader:ge,shared:null,server:null,data:null};return await te({url:_,params:c,branch:[L,k],status:a,error:d,routeId:i})}function Re(a){if(a.origin!==location.origin||!a.pathname.startsWith(e))return;const d=decodeURI(a.pathname.slice(e.length)||"/");for(const _ of pe){const i=_.exec(d);if(i){const c=new URL(a.origin+nt(a.pathname,n)+a.search+a.hash);return{id:c.pathname+c.search,route:_,params:rt(i),url:c}}}}async function ie({url:a,scroll:d,keepfocus:_,redirect_chain:i,details:c,accepted:R,blocked:h}){const L=t.url;let k=!1;const y={from:L,to:a,cancel:()=>k=!0};if(f.before_navigate.forEach(b=>b(y)),k){h();return}de(A),R(),l&&X.navigating.set({from:t.url,to:a}),await ve(a,i,{scroll:d,keepfocus:_,details:c},()=>{const b={from:L,to:a};f.after_navigate.forEach(P=>P(b)),X.navigating.set(null)})}function M(a){return location.href=a.href,new Promise(()=>{})}return{after_navigate:a=>{_e(()=>(f.after_navigate.push(a),()=>{const d=f.after_navigate.indexOf(a);f.after_navigate.splice(d,1)}))},before_navigate:a=>{_e(()=>(f.before_navigate.push(a),()=>{const d=f.before_navigate.indexOf(a);f.before_navigate.splice(d,1)}))},disable_scroll_handling:()=>{(u||!l)&&(p=!1)},goto:(a,d={})=>be(a,d,[]),invalidate:a=>{var d,_;if(a===void 0){for(const i of t.branch)(d=i==null?void 0:i.server)==null||d.uses.dependencies.add(""),(_=i==null?void 0:i.shared)==null||_.uses.dependencies.add("");o.push(()=>!0)}else if(typeof a=="function")o.push(a);else{const{href:i}=new URL(a,location.href);o.push(c=>c===i)}return v||(v=Promise.resolve().then(async()=>{await ve(new URL(location.href),[]),v=null})),v},prefetch:async a=>{const d=new URL(a,Ie(document));await ye(d)},prefetch_routes:async a=>{const _=(a?pe.filter(i=>a.some(c=>i.exec(c))):pe).map(i=>Promise.all([...i.layouts,i.leaf].map(c=>c==null?void 0:c[1]())));await Promise.all(_)},_start_router:()=>{history.scrollRestoration="manual",addEventListener("beforeunload",i=>{let c=!1;const R={from:t.url,to:null,cancel:()=>c=!0};f.before_navigate.forEach(h=>h(R)),c?(i.preventDefault(),i.returnValue=""):history.scrollRestoration="auto"}),addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden"){de(A);try{sessionStorage[ze]=JSON.stringify(ee)}catch{}}});const a=i=>{const c=je(i);c&&c.href&&c.hasAttribute("data-sveltekit-prefetch")&&ye(De(c))};let d;const _=i=>{clearTimeout(d),d=setTimeout(()=>{var c;(c=i.target)==null||c.dispatchEvent(new CustomEvent("sveltekit:trigger_prefetch",{bubbles:!0}))},20)};addEventListener("touchstart",a),addEventListener("mousemove",_),addEventListener("sveltekit:trigger_prefetch",a),addEventListener("click",i=>{if(!$||i.button||i.which!==1||i.metaKey||i.ctrlKey||i.shiftKey||i.altKey||i.defaultPrevented)return;const c=je(i);if(!c||!c.href)return;const R=c instanceof SVGAElement,h=De(c);if(!R&&!(h.protocol==="https:"||h.protocol==="http:"))return;const L=(c.getAttribute("rel")||"").split(/\s+/);if(c.hasAttribute("download")||L.includes("external")||c.hasAttribute("data-sveltekit-reload")||(R?c.target.baseVal:c.target))return;const[k,y]=h.href.split("#");if(y!==void 0&&k===location.href.split("#")[0]){W=!0,de(A),X.page.set({...x,url:h}),X.page.notify();return}ie({url:h,scroll:c.hasAttribute("data-sveltekit-noscroll")?he():null,keepfocus:!1,redirect_chain:[],details:{state:{},replaceState:h.href===location.href},accepted:()=>i.preventDefault(),blocked:()=>i.preventDefault()})}),addEventListener("popstate",i=>{if(i.state&&$){if(i.state[G]===A)return;ie({url:new URL(location.href),scroll:ee[i.state[G]],keepfocus:!1,redirect_chain:[],details:null,accepted:()=>{A=i.state[G]},blocked:()=>{const c=A-i.state[G];history.go(c)}})}}),addEventListener("hashchange",()=>{W&&(W=!1,history.replaceState({...history.state,[G]:++A},"",location.href))});for(const i of document.querySelectorAll("link"))i.rel==="icon"&&(i.href=i.href);addEventListener("pageshow",i=>{i.persisted&&X.navigating.set(null)})},_hydrate:async({status:a,error:d,node_ids:_,params:i,routeId:c,data:R,errors:h})=>{const L=new URL(location.href);let k;try{const y=_.map(async(b,P)=>{const j=R[P];return se({loader:ae[b],url:L,params:i,routeId:c,parent:async()=>{const E={};for(let O=0;O<P;O+=1)Object.assign(E,(await y[O]).data);return E},server_data_node:oe(j)})});k=await te({url:L,params:i,branch:await Promise.all(y),status:a,error:d!=null&&d.__is_http_error?new re(d.status,d.message):d,validation_errors:h,routeId:c})}catch(y){const b=y;if(b instanceof Ue){await M(new URL(y.location,location.href));return}k=await ne({status:b instanceof re?b.status:500,error:b,url:L,routeId:c})}ke(k)}}}let Ot=1;async function Be(r,e){const n=new URL(r);n.pathname=r.pathname.replace(/\/$/,"")+St,n.searchParams.set("__invalid",e.map(s=>s?"y":"n").join("")),n.searchParams.set("__id",String(Ot++)),await V(()=>import(n.href),[],import.meta.url);const o=window.__sveltekit_data;return delete window.__sveltekit_data,o}function Tt(r){}async function Ut({paths:r,target:e,route:n,spa:o,trailing_slash:s,hydrate:f}){const t=Pt({target:e,base:r.base,trailing_slash:s});Ze({client:t}),xe(r),f&&await t._hydrate(f),n&&(o&&t.goto(location.href,{replaceState:!0}),t._start_router()),dispatchEvent(new CustomEvent("sveltekit:start"))}export{Tt as set_public_env,Ut as start};
