var Fe=Object.defineProperty;var Je=(r,e,t)=>e in r?Fe(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var fe=(r,e,t)=>(Je(r,typeof e!="symbol"?e+"":e,t),t);import{S as He,i as We,s as xe,a as Ge,e as B,c as Me,b as x,g as ne,t as K,d as re,f as F,h as J,j as Xe,o as he,k as Ye,l as Qe,m as Ze,n as ue,p as V,q as et,r as tt,u as nt,v as M,w as we,x as X,y as Y,z as je}from"./chunks/index-619dd36b.js";import{g as Ue,f as Ie,a as De,s as W,b as me,i as rt}from"./chunks/singletons-3edc2eae.js";import{s as at}from"./chunks/paths-9b83c8fd.js";const st=function(){const e=document.createElement("link").relList;return e&&e.supports&&e.supports("modulepreload")?"modulepreload":"preload"}(),ot=function(r,e){return new URL(r,e).href},Te={},z=function(e,t,i){return!t||t.length===0?e():Promise.all(t.map(o=>{if(o=ot(o,i),o in Te)return;Te[o]=!0;const d=o.endsWith(".css"),n=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${o}"]${n}`))return;const c=document.createElement("link");if(c.rel=d?"stylesheet":st,d||(c.as="script",c.crossOrigin=""),c.href=o,document.head.appendChild(c),d)return new Promise((g,p)=>{c.addEventListener("load",g),c.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${o}`)))})})).then(()=>e())};class te{constructor(e,t){fe(this,"name","HttpError");fe(this,"stack");this.status=e,this.message=t!=null?t:`Error: ${e}`}toString(){return this.message}}class Ce{constructor(e,t){this.status=e,this.location=t}}function it(r,e){return r==="/"||e==="ignore"?r:e==="never"?r.endsWith("/")?r.slice(0,-1):r:e==="always"&&!r.endsWith("/")?r+"/":r}function lt(r){for(const e in r)r[e]=r[e].replace(/%23/g,"#").replace(/%3[Bb]/g,";").replace(/%2[Cc]/g,",").replace(/%2[Ff]/g,"/").replace(/%3[Ff]/g,"?").replace(/%3[Aa]/g,":").replace(/%40/g,"@").replace(/%26/g,"&").replace(/%3[Dd]/g,"=").replace(/%2[Bb]/g,"+").replace(/%24/g,"$");return r}const ct=["href","pathname","search","searchParams","toString","toJSON"];function ft(r,e){const t=new URL(r);for(const i of ct){let o=t[i];Object.defineProperty(t,i,{get(){return e(),o},enumerable:!0,configurable:!0})}return t[Symbol.for("nodejs.util.inspect.custom")]=(i,o,d)=>d(r,o),ut(t),t}function ut(r){Object.defineProperty(r,"hash",{get(){throw new Error("Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead")}})}function dt(r){let e=5381,t=r.length;if(typeof r=="string")for(;t;)e=e*33^r.charCodeAt(--t);else for(;t;)e=e*33^r[--t];return(e>>>0).toString(36)}const Be=window.fetch;function pt(r,e){let i=`script[sveltekit\\:data-type="data"][sveltekit\\:data-url=${JSON.stringify(typeof r=="string"?r:r.url)}]`;e&&typeof e.body=="string"&&(i+=`[sveltekit\\:data-body="${dt(e.body)}"]`);const o=document.querySelector(i);if(o&&o.textContent){const{body:d,...n}=JSON.parse(o.textContent);return Promise.resolve(new Response(d,n))}return Be(r,e)}const ht=/^(\.\.\.)?(\w+)(?:=(\w+))?$/;function mt(r){const e=[],t=[];let i=!0;if(/\]\[/.test(r))throw new Error(`Invalid route ${r} \u2014 parameters must be separated`);if(Ve("[",r)!==Ve("]",r))throw new Error(`Invalid route ${r} \u2014 brackets are unbalanced`);return{pattern:r===""?/^\/$/:new RegExp(`^${r.split(/(?:\/|$)/).filter(_t).map((d,n,c)=>{const g=decodeURIComponent(d),p=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(g);if(p)return e.push(p[1]),t.push(p[2]),"(?:/(.*))?";const w=n===c.length-1;return g&&"/"+g.split(/\[(.+?)\]/).map((L,S)=>{if(S%2){const D=ht.exec(L);if(!D)throw new Error(`Invalid param: ${L}. Params and matcher names can only have underscores and alphanumeric characters.`);const[,A,C,N]=D;return e.push(C),t.push(N),A?"(.*?)":"([^/]+?)"}return w&&L.includes(".")&&(i=!1),L.normalize().replace(/%5[Bb]/g,"[").replace(/%5[Dd]/g,"]").replace(/#/g,"%23").replace(/\?/g,"%3F").replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}).join("")}).join("")}${i?"/?":""}$`),names:e,types:t}}function _t(r){return!/^\([^)]+\)$/.test(r)}function gt(r,e,t,i){const o={};for(let d=0;d<e.length;d+=1){const n=e[d],c=t[d],g=r[d+1]||"";if(c){const p=i[c];if(!p)throw new Error(`Missing "${c}" param matcher`);if(!p(g))return}o[n]=g}return o}function Ve(r,e){let t=0;for(let i=0;i<e.length;i+=1)e[i]===r&&(t+=1);return t}function wt(r,e,t,i){const o=new Set(e);return Object.entries(t).map(([c,[g,p,w]])=>{const{pattern:L,names:S,types:D}=mt(c),A={id:c,exec:C=>{const N=L.exec(C);if(N)return gt(N,S,D,i)},errors:[1,...w||[]].map(C=>r[C]),layouts:[0,...p||[]].map(n),leaf:d(g)};return A.errors.length=A.layouts.length=Math.max(A.errors.length,A.layouts.length),A});function d(c){const g=c<0;return g&&(c=~c),[g,r[c]]}function n(c){return c===void 0?c:[o.has(c),r[c]]}}function yt(r,e){return new te(r,e)}function bt(r){let e,t,i;var o=r[0][0];function d(n){return{props:{data:n[1],errors:n[3]}}}return o&&(e=new o(d(r))),{c(){e&&M(e.$$.fragment),t=B()},l(n){e&&we(e.$$.fragment,n),t=B()},m(n,c){e&&X(e,n,c),x(n,t,c),i=!0},p(n,c){const g={};if(c&2&&(g.data=n[1]),c&8&&(g.errors=n[3]),o!==(o=n[0][0])){if(e){ne();const p=e;K(p.$$.fragment,1,0,()=>{Y(p,1)}),re()}o?(e=new o(d(n)),M(e.$$.fragment),F(e.$$.fragment,1),X(e,t.parentNode,t)):e=null}else o&&e.$set(g)},i(n){i||(e&&F(e.$$.fragment,n),i=!0)},o(n){e&&K(e.$$.fragment,n),i=!1},d(n){n&&J(t),e&&Y(e,n)}}}function vt(r){let e,t,i;var o=r[0][0];function d(n){return{props:{data:n[1],errors:n[3],$$slots:{default:[kt]},$$scope:{ctx:n}}}}return o&&(e=new o(d(r))),{c(){e&&M(e.$$.fragment),t=B()},l(n){e&&we(e.$$.fragment,n),t=B()},m(n,c){e&&X(e,n,c),x(n,t,c),i=!0},p(n,c){const g={};if(c&2&&(g.data=n[1]),c&8&&(g.errors=n[3]),c&525&&(g.$$scope={dirty:c,ctx:n}),o!==(o=n[0][0])){if(e){ne();const p=e;K(p.$$.fragment,1,0,()=>{Y(p,1)}),re()}o?(e=new o(d(n)),M(e.$$.fragment),F(e.$$.fragment,1),X(e,t.parentNode,t)):e=null}else o&&e.$set(g)},i(n){i||(e&&F(e.$$.fragment,n),i=!0)},o(n){e&&K(e.$$.fragment,n),i=!1},d(n){n&&J(t),e&&Y(e,n)}}}function kt(r){let e,t,i;var o=r[0][1];function d(n){return{props:{data:n[2],errors:n[3]}}}return o&&(e=new o(d(r))),{c(){e&&M(e.$$.fragment),t=B()},l(n){e&&we(e.$$.fragment,n),t=B()},m(n,c){e&&X(e,n,c),x(n,t,c),i=!0},p(n,c){const g={};if(c&4&&(g.data=n[2]),c&8&&(g.errors=n[3]),o!==(o=n[0][1])){if(e){ne();const p=e;K(p.$$.fragment,1,0,()=>{Y(p,1)}),re()}o?(e=new o(d(n)),M(e.$$.fragment),F(e.$$.fragment,1),X(e,t.parentNode,t)):e=null}else o&&e.$set(g)},i(n){i||(e&&F(e.$$.fragment,n),i=!0)},o(n){e&&K(e.$$.fragment,n),i=!1},d(n){n&&J(t),e&&Y(e,n)}}}function Ne(r){let e,t=r[5]&&qe(r);return{c(){e=Ye("div"),t&&t.c(),this.h()},l(i){e=Qe(i,"DIV",{id:!0,"aria-live":!0,"aria-atomic":!0,style:!0});var o=Ze(e);t&&t.l(o),o.forEach(J),this.h()},h(){ue(e,"id","svelte-announcer"),ue(e,"aria-live","assertive"),ue(e,"aria-atomic","true"),V(e,"position","absolute"),V(e,"left","0"),V(e,"top","0"),V(e,"clip","rect(0 0 0 0)"),V(e,"clip-path","inset(50%)"),V(e,"overflow","hidden"),V(e,"white-space","nowrap"),V(e,"width","1px"),V(e,"height","1px")},m(i,o){x(i,e,o),t&&t.m(e,null)},p(i,o){i[5]?t?t.p(i,o):(t=qe(i),t.c(),t.m(e,null)):t&&(t.d(1),t=null)},d(i){i&&J(e),t&&t.d()}}}function qe(r){let e;return{c(){e=et(r[6])},l(t){e=tt(t,r[6])},m(t,i){x(t,e,i)},p(t,i){i&64&&nt(e,t[6])},d(t){t&&J(e)}}}function Et(r){let e,t,i,o,d;const n=[vt,bt],c=[];function g(w,L){return w[0][1]?0:1}e=g(r),t=c[e]=n[e](r);let p=r[4]&&Ne(r);return{c(){t.c(),i=Ge(),p&&p.c(),o=B()},l(w){t.l(w),i=Me(w),p&&p.l(w),o=B()},m(w,L){c[e].m(w,L),x(w,i,L),p&&p.m(w,L),x(w,o,L),d=!0},p(w,[L]){let S=e;e=g(w),e===S?c[e].p(w,L):(ne(),K(c[S],1,1,()=>{c[S]=null}),re(),t=c[e],t?t.p(w,L):(t=c[e]=n[e](w),t.c()),F(t,1),t.m(i.parentNode,i)),w[4]?p?p.p(w,L):(p=Ne(w),p.c(),p.m(o.parentNode,o)):p&&(p.d(1),p=null)},i(w){d||(F(t),d=!0)},o(w){K(t),d=!1},d(w){c[e].d(w),w&&J(i),p&&p.d(w),w&&J(o)}}}function Rt(r,e,t){let{stores:i}=e,{page:o}=e,{components:d}=e,{data_0:n=null}=e,{data_1:c=null}=e,{errors:g}=e;Xe(i.page.notify);let p=!1,w=!1,L=null;return he(()=>{const S=i.page.subscribe(()=>{p&&(t(5,w=!0),t(6,L=document.title||"untitled page"))});return t(4,p=!0),S}),r.$$set=S=>{"stores"in S&&t(7,i=S.stores),"page"in S&&t(8,o=S.page),"components"in S&&t(0,d=S.components),"data_0"in S&&t(1,n=S.data_0),"data_1"in S&&t(2,c=S.data_1),"errors"in S&&t(3,g=S.errors)},r.$$.update=()=>{r.$$.dirty&384&&i.page.set(o)},[d,n,c,g,p,w,L,i,o]}class St extends He{constructor(e){super(),We(this,e,Rt,Et,xe,{stores:7,page:8,components:0,data_0:1,data_1:2,errors:3})}}const Lt={},ae=[()=>z(()=>import("./chunks/0-4510bf1d.js"),["chunks/0-4510bf1d.js","components/pages/_layout.svelte-67b34416.js","assets/_layout-7fef7e6d.css","chunks/index-619dd36b.js","chunks/paths-9b83c8fd.js","chunks/Sprite-8190543c.js","assets/Sprite-cf769916.css","chunks/stores-d2224486.js","chunks/singletons-3edc2eae.js"],import.meta.url),()=>z(()=>import("./chunks/1-5a3976b7.js"),["chunks/1-5a3976b7.js","components/pages/_error.svelte-18613333.js","chunks/index-619dd36b.js","chunks/stores-d2224486.js","chunks/singletons-3edc2eae.js","chunks/paths-9b83c8fd.js"],import.meta.url),()=>z(()=>import("./chunks/2-0dadd68d.js"),["chunks/2-0dadd68d.js","components/pages/_page.svelte-b4583b0c.js","assets/_page-0a84aa2a.css","chunks/index-619dd36b.js","chunks/ContentCard-12b15218.js","assets/ContentCard-f61f8b3d.css","chunks/paths-9b83c8fd.js"],import.meta.url),()=>z(()=>import("./chunks/3-753f199d.js"),["chunks/3-753f199d.js","components/pages/_page_/_page.svelte-a226394c.js","chunks/index-619dd36b.js"],import.meta.url),()=>z(()=>import("./chunks/4-23f8988f.js"),["chunks/4-23f8988f.js","components/pages/_type_/_year_/_month_/_day_/_slug_/_page.svelte-7aa3eafb.js","chunks/index-619dd36b.js"],import.meta.url),()=>z(()=>import("./chunks/5-a6235d9c.js"),["chunks/5-a6235d9c.js","components/pages/content/_slug_/_page.svelte-eddd3f7c.js","assets/_page-4c638043.css","chunks/index-619dd36b.js","chunks/Sprite-8190543c.js","assets/Sprite-cf769916.css","chunks/paths-9b83c8fd.js"],import.meta.url),()=>z(()=>import("./chunks/6-99b226c6.js"),["chunks/6-99b226c6.js","components/pages/list/_type_/_page.svelte-1bf19d57.js","assets/_page-38a88b2a.css","chunks/index-619dd36b.js","chunks/ContentCard-12b15218.js","assets/ContentCard-f61f8b3d.css","chunks/paths-9b83c8fd.js"],import.meta.url)],$t=[],Pt={"":[-3],"content/[slug]":[-6],"list/[type]":[-7],"[page]":[-4],"[type]/[year]/[month]/[day]/[slug]":[-5]},Ot="/__data.js",Ke="sveltekit:scroll",q="sveltekit:index",de=wt(ae,$t,Pt,Lt),_e=ae[0],ge=ae[1];_e();ge();let Q={};try{Q=JSON.parse(sessionStorage[Ke])}catch{}function pe(r){Q[r]=me()}function At({target:r,base:e,trailing_slash:t}){var $e;const i=[],o={id:null,promise:null},d={before_navigate:[],after_navigate:[]};let n={branch:[],error:null,session_id:0,url:null},c=!1,g=!0,p=!1,w=1,L=null,S,D=!0,A=($e=history.state)==null?void 0:$e[q];A||(A=Date.now(),history.replaceState({...history.state,[q]:A},"",location.href));const C=Q[A];C&&(history.scrollRestoration="manual",scrollTo(C.x,C.y));let N=!1,G,ye;async function be(a,{noscroll:f=!1,replaceState:u=!1,keepfocus:s=!1,state:l={}},E){if(typeof a=="string"&&(a=new URL(a,Ue(document))),D)return ie({url:a,scroll:f?me():null,keepfocus:s,redirect_chain:E,details:{state:l,replaceState:u},accepted:()=>{},blocked:()=>{}});await H(a)}async function ve(a){const f=Le(a);if(!f)throw new Error("Attempted to prefetch a URL that does not belong to this app");return o.promise=Se(f),o.id=f.id,o.promise}async function ke(a,f,u,s){var v,b,y;const l=Le(a),E=ye={};let h=l&&await Se(l);if(!h&&a.origin===location.origin&&a.pathname===location.pathname&&(h=await ee({status:404,error:new Error(`Not found: ${a.pathname}`),url:a,routeId:null})),!h)return await H(a),!1;if(a=(l==null?void 0:l.url)||a,ye!==E)return!1;if(i.length=0,h.type==="redirect")if(f.length>10||f.includes(a.pathname))h=await ee({status:500,error:new Error("Redirect loop"),url:a,routeId:null});else return D?be(new URL(h.location,a).href,{},[...f,a.pathname]):await H(new URL(h.location,location.href)),!1;else((b=(v=h.props)==null?void 0:v.page)==null?void 0:b.status)>=400&&await W.updated.check()&&await H(a);if(p=!0,u&&u.details){const{details:P}=u,U=P.replaceState?0:1;P.state[q]=A+=U,history[P.replaceState?"replaceState":"pushState"](P.state,"",a)}if(c?(n=h.state,h.props.page&&(h.props.page.url=a),S.$set(h.props)):Ee(h),u){const{scroll:P,keepfocus:U}=u;if(!U){const k=document.body,O=k.getAttribute("tabindex");k.tabIndex=-1,k.focus({preventScroll:!0}),setTimeout(()=>{var m;(m=getSelection())==null||m.removeAllRanges()}),O!==null?k.setAttribute("tabindex",O):k.removeAttribute("tabindex")}if(await je(),g){const k=a.hash&&document.getElementById(a.hash.slice(1));P?scrollTo(P.x,P.y):k?k.scrollIntoView():scrollTo(0,0)}}else await je();o.promise=null,o.id=null,g=!0,h.props.page&&(G=h.props.page);const R=h.state.branch[h.state.branch.length-1];D=((y=R==null?void 0:R.node.shared)==null?void 0:y.router)!==!1,s&&s(),p=!1}function Ee(a){n=a.state;const f=document.querySelector("style[data-sveltekit]");if(f&&f.remove(),G=a.props.page,S=new St({target:r,props:{...a.props,stores:W},hydrate:!0}),D){const u={from:null,to:new URL(location.href)};d.after_navigate.forEach(s=>s(u))}c=!0}async function Z({url:a,params:f,branch:u,status:s,error:l,routeId:E,validation_errors:h}){var U;const R=u.filter(Boolean),v={type:"loaded",state:{url:a,params:f,branch:u,error:l,session_id:w},props:{components:R.map(k=>k.node.component),errors:h}};let b={},y=!G;for(let k=0;k<R.length;k+=1){const O=R[k];b={...b,...O.data},(y||!n.branch.some(m=>m===O))&&(v.props[`data_${k}`]=b,y=y||Object.keys((U=O.data)!=null?U:{}).length>0)}if(y||(y=Object.keys(G.data).length!==Object.keys(b).length),!n.url||a.href!==n.url.href||n.error!==l||y){v.props.page={error:l,params:f,routeId:E,status:s,url:a,data:y?b:G.data};const k=(O,m)=>{Object.defineProperty(v.props.page,O,{get:()=>{throw new Error(`$page.${O} has been replaced by $page.url.${m}`)}})};k("origin","origin"),k("path","pathname"),k("query","searchParams")}return v}async function se({loader:a,parent:f,url:u,params:s,routeId:l,server_data_node:E}){var b,y,P,U,k;let h=null;const R={dependencies:new Set,params:new Set,parent:!1,url:!1},v=await a();if((b=v.shared)!=null&&b.load){let O=function(..._){for(const $ of _){const{href:I}=new URL($,u);R.dependencies.add(I)}};const m={};for(const _ in s)Object.defineProperty(m,_,{get(){return R.params.add(_),s[_]},enumerable:!0});const j={routeId:l,params:m,data:(y=E==null?void 0:E.data)!=null?y:null,url:ft(u,()=>{R.url=!0}),async fetch(_,$){let I;typeof _=="string"?I=_:(I=_.url,$={body:_.method==="GET"||_.method==="HEAD"?void 0:await _.blob(),cache:_.cache,credentials:_.credentials,headers:_.headers,integrity:_.integrity,keepalive:_.keepalive,method:_.method,mode:_.mode,redirect:_.redirect,referrer:_.referrer,referrerPolicy:_.referrerPolicy,signal:_.signal,...$});const T=new URL(I,u).href;return O(T),c?Be(T,$):pt(I,$)},setHeaders:()=>{},depends:O,parent(){return R.parent=!0,f()}};Object.defineProperties(j,{props:{get(){throw new Error("@migration task: Replace `props` with `data` stuff https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693")},enumerable:!1},session:{get(){throw new Error("session is no longer available. See https://github.com/sveltejs/kit/discussions/5883")},enumerable:!1},stuff:{get(){throw new Error("@migration task: Remove stuff https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693")},enumerable:!1}}),h=(P=await v.shared.load.call(null,j))!=null?P:null}return{node:v,loader:a,server:E,shared:(U=v.shared)!=null&&U.load?{type:"data",data:h,uses:R}:null,data:(k=h!=null?h:E==null?void 0:E.data)!=null?k:null}}function Re(a,f,u){if(!u)return!1;if(u.parent&&f||a.url&&u.url)return!0;for(const s of a.params)if(u.params.has(s))return!0;for(const s of u.dependencies)if(i.some(l=>l(s)))return!0;return!1}function oe(a,f){var u,s;return(a==null?void 0:a.type)==="data"?{type:"data",data:a.data,uses:{dependencies:new Set((u=a.uses.dependencies)!=null?u:[]),params:new Set((s=a.uses.params)!=null?s:[]),parent:!!a.uses.parent,url:!!a.uses.url}}:(a==null?void 0:a.type)==="skip"&&f!=null?f:null}async function Se({id:a,url:f,params:u,route:s}){if(o.id===a&&o.promise)return o.promise;const{errors:l,layouts:E,leaf:h}=s,R=n.url&&{url:a!==n.url.pathname+n.url.search,params:Object.keys(u).filter(m=>n.params[m]!==u[m])},v=[...E,h];l.forEach(m=>m==null?void 0:m().catch(()=>{})),v.forEach(m=>m==null?void 0:m[1]().catch(()=>{}));let b=null;const y=v.reduce((m,j,_)=>{var T;const $=n.branch[_],I=!!(j!=null&&j[0])&&(($==null?void 0:$.loader)!==j[1]||Re(R,m.some(Boolean),(T=$.server)==null?void 0:T.uses));return m.push(I),m},[]);if(y.some(Boolean)){try{b=await ze(f,y)}catch(m){return ee({status:500,error:m,url:f,routeId:s.id})}if(b.type==="redirect")return b}const P=b==null?void 0:b.nodes;let U=!1;const k=v.map(async(m,j)=>{var le,Pe;if(!m)return;const _=n.branch[j],$=(le=P==null?void 0:P[j])!=null?le:null;if((!$||$.type==="skip")&&m[1]===(_==null?void 0:_.loader)&&!Re(R,U,(Pe=_.shared)==null?void 0:Pe.uses))return _;if(U=!0,($==null?void 0:$.type)==="error")throw $.httperror?yt($.httperror.status,$.httperror.message):$.error;return se({loader:m[1],url:f,params:u,routeId:s.id,parent:async()=>{var Ae;const Oe={};for(let ce=0;ce<j;ce+=1)Object.assign(Oe,(Ae=await k[ce])==null?void 0:Ae.data);return Oe},server_data_node:oe($,_==null?void 0:_.server)})});for(const m of k)m.catch(()=>{});const O=[];for(let m=0;m<v.length;m+=1)if(v[m])try{O.push(await k[m])}catch(j){const _=j;if(_ instanceof Ce)return{type:"redirect",location:_.location};const $=j instanceof te?j.status:500;for(;m--;)if(l[m]){let I,T=m;for(;!O[T];)T-=1;try{return I={node:await l[m](),loader:l[m],data:{},server:null,shared:null},await Z({url:f,params:u,branch:O.slice(0,T+1).concat(I),status:$,error:_,routeId:s.id})}catch{continue}}H(f);return}else O.push(void 0);return await Z({url:f,params:u,branch:O,status:200,error:null,routeId:s.id})}async function ee({status:a,error:f,url:u,routeId:s}){var b;const l={},E=await _e();let h=null;if(E.server)try{const y=await ze(u,[!0]);if(y.type!=="data"||y.nodes[0]&&y.nodes[0].type!=="data")throw 0;h=(b=y.nodes[0])!=null?b:null}catch{H(u);return}const R=await se({loader:_e,url:u,params:l,routeId:s,parent:()=>Promise.resolve({}),server_data_node:oe(h)}),v={node:await ge(),loader:ge,shared:null,server:null,data:null};return await Z({url:u,params:l,branch:[R,v],status:a,error:f,routeId:s})}function Le(a){if(a.origin!==location.origin||!a.pathname.startsWith(e))return;const f=decodeURI(a.pathname.slice(e.length)||"/");for(const u of de){const s=u.exec(f);if(s){const l=new URL(a.origin+it(a.pathname,t)+a.search+a.hash);return{id:l.pathname+l.search,route:u,params:lt(s),url:l}}}}async function ie({url:a,scroll:f,keepfocus:u,redirect_chain:s,details:l,accepted:E,blocked:h}){const R=n.url;let v=!1;const b={from:R,to:a,cancel:()=>v=!0};if(d.before_navigate.forEach(y=>y(b)),v){h();return}pe(A),E(),c&&W.navigating.set({from:n.url,to:a}),await ke(a,s,{scroll:f,keepfocus:u,details:l},()=>{const y={from:R,to:a};d.after_navigate.forEach(P=>P(y)),W.navigating.set(null)})}function H(a){return location.href=a.href,new Promise(()=>{})}return{after_navigate:a=>{he(()=>(d.after_navigate.push(a),()=>{const f=d.after_navigate.indexOf(a);d.after_navigate.splice(f,1)}))},before_navigate:a=>{he(()=>(d.before_navigate.push(a),()=>{const f=d.before_navigate.indexOf(a);d.before_navigate.splice(f,1)}))},disable_scroll_handling:()=>{(p||!c)&&(g=!1)},goto:(a,f={})=>be(a,f,[]),invalidate:a=>{var f,u;if(a===void 0){for(const s of n.branch)(f=s==null?void 0:s.server)==null||f.uses.dependencies.add(""),(u=s==null?void 0:s.shared)==null||u.uses.dependencies.add("");i.push(()=>!0)}else if(typeof a=="function")i.push(a);else{const{href:s}=new URL(a,location.href);i.push(l=>l===s)}return L||(L=Promise.resolve().then(async()=>{await ke(new URL(location.href),[]),L=null})),L},prefetch:async a=>{const f=new URL(a,Ue(document));await ve(f)},prefetch_routes:async a=>{const u=(a?de.filter(s=>a.some(l=>s.exec(l))):de).map(s=>Promise.all([...s.layouts,s.leaf].map(l=>l==null?void 0:l[1]())));await Promise.all(u)},_start_router:()=>{history.scrollRestoration="manual",addEventListener("beforeunload",s=>{let l=!1;const E={from:n.url,to:null,cancel:()=>l=!0};d.before_navigate.forEach(h=>h(E)),l?(s.preventDefault(),s.returnValue=""):history.scrollRestoration="auto"}),addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden"){pe(A);try{sessionStorage[Ke]=JSON.stringify(Q)}catch{}}});const a=s=>{const l=Ie(s);l&&l.href&&l.hasAttribute("data-sveltekit-prefetch")&&ve(De(l))};let f;const u=s=>{clearTimeout(f),f=setTimeout(()=>{var l;(l=s.target)==null||l.dispatchEvent(new CustomEvent("sveltekit:trigger_prefetch",{bubbles:!0}))},20)};addEventListener("touchstart",a),addEventListener("mousemove",u),addEventListener("sveltekit:trigger_prefetch",a),addEventListener("click",s=>{if(!D||s.button||s.which!==1||s.metaKey||s.ctrlKey||s.shiftKey||s.altKey||s.defaultPrevented)return;const l=Ie(s);if(!l||!l.href)return;const E=l instanceof SVGAElement,h=De(l);if(!E&&!(h.protocol==="https:"||h.protocol==="http:"))return;const R=(l.getAttribute("rel")||"").split(/\s+/);if(l.hasAttribute("download")||R.includes("external")||l.hasAttribute("data-sveltekit-reload")||(E?l.target.baseVal:l.target))return;const[v,b]=h.href.split("#");if(b!==void 0&&v===location.href.split("#")[0]){N=!0,pe(A),W.page.set({...G,url:h}),W.page.notify();return}ie({url:h,scroll:l.hasAttribute("data-sveltekit-noscroll")?me():null,keepfocus:!1,redirect_chain:[],details:{state:{},replaceState:h.href===location.href},accepted:()=>s.preventDefault(),blocked:()=>s.preventDefault()})}),addEventListener("popstate",s=>{if(s.state&&D){if(s.state[q]===A)return;ie({url:new URL(location.href),scroll:Q[s.state[q]],keepfocus:!1,redirect_chain:[],details:null,accepted:()=>{A=s.state[q]},blocked:()=>{const l=A-s.state[q];history.go(l)}})}}),addEventListener("hashchange",()=>{N&&(N=!1,history.replaceState({...history.state,[q]:++A},"",location.href))});for(const s of document.querySelectorAll("link"))s.rel==="icon"&&(s.href=s.href);addEventListener("pageshow",s=>{s.persisted&&W.navigating.set(null)})},_hydrate:async({status:a,error:f,node_ids:u,params:s,routeId:l,data:E,errors:h})=>{const R=new URL(location.href);let v;try{const b=u.map(async(y,P)=>{const U=E[P];return se({loader:ae[y],url:R,params:s,routeId:l,parent:async()=>{const k={};for(let O=0;O<P;O+=1)Object.assign(k,(await b[O]).data);return k},server_data_node:oe(U)})});v=await Z({url:R,params:s,branch:await Promise.all(b),status:a,error:f!=null&&f.__is_http_error?new te(f.status,f.message):f,validation_errors:h,routeId:l})}catch(b){const y=b;if(y instanceof Ce){await H(new URL(b.location,location.href));return}v=await ee({status:y instanceof te?y.status:500,error:y,url:R,routeId:l})}Ee(v)}}}let jt=1;async function ze(r,e){const t=new URL(r);t.pathname=r.pathname.replace(/\/$/,"")+Ot,t.searchParams.set("__invalid",e.map(o=>o?"y":"n").join("")),t.searchParams.set("__id",String(jt++)),await z(()=>import(t.href),[],import.meta.url);const i=window.__sveltekit_data;return delete window.__sveltekit_data,i}function Ct(r){}async function Vt({paths:r,target:e,route:t,spa:i,trailing_slash:o,hydrate:d}){const n=At({target:e,base:r.base,trailing_slash:o});rt({client:n}),at(r),d&&await n._hydrate(d),t&&(i&&n.goto(location.href,{replaceState:!0}),n._start_router()),dispatchEvent(new CustomEvent("sveltekit:start"))}export{Ct as set_public_env,Vt as start};
