import{S as U,i as T,s as j,j as P,k as y,b as d,d as m,g as q,c as D,t as g,f as k,G as te,J as ne,a as G,I as b,w as v,K as le,y as B,z as N,A as z,B as C,m as x,n as ee,x as I,l as E,v as R,L as M,p as V,q as X,M as se,N as oe,r as Z,O as J,P as ae}from"../../../../chunks/index-b67bb711.js";import{C as ie}from"../../../../chunks/ContentCard-9f6452cf.js";import"../../../../chunks/paths-9b83c8fd.js";function re({items:t,pageSize:e,currentPage:n}){return t.slice((n-1)*e,(n-1)*e+e)}const S="PREVIOUS_PAGE",w="NEXT_PAGE",L="ELLIPSIS";function ue({totalItems:t,pageSize:e,currentPage:n,limit:s=null,showStepOptions:l=!1}){const o=Math.ceil(t/e),a=me({limit:s});let i=s&&o>a?_e({totalPages:o,limit:s,currentPage:n}):fe({totalPages:o});return l?ce({options:i,currentPage:n,totalPages:o}):i}function fe({totalPages:t}){return new Array(t).fill(null).map((e,n)=>({type:"number",value:n+1}))}function _e({totalPages:t,limit:e,currentPage:n}){const s=e*2+2,l=1+s,o=t-s,a=l+2;if(n<=l-e)return Array(a).fill(null).map((r,i)=>i===a-1?{type:"number",value:t}:i===a-2?{type:"symbol",symbol:L,value:l+1}:{type:"number",value:i+1});if(n>=o+e)return Array(a).fill(null).map((r,i)=>i===0?{type:"number",value:1}:i===1?{type:"symbol",symbol:L,value:o-1}:{type:"number",value:o+i-2});if(n>=l-e&&n<=o+e)return Array(a).fill(null).map((r,i)=>i===0?{type:"number",value:1}:i===1?{type:"symbol",symbol:L,value:n-e+(i-2)}:i===a-1?{type:"number",value:t}:i===a-2?{type:"symbol",symbol:L,value:n+e+1}:{type:"number",value:n-e+(i-2)})}function ce({options:t,currentPage:e,totalPages:n}){return[{type:"symbol",symbol:S,value:e<=1?1:e-1},...t,{type:"symbol",symbol:w,value:e>=n?n:e+1}]}function me({limit:t}){return t*2+3+2}function K(t,e,n){const s=t.slice();return s[12]=e[n],s}const pe=t=>({}),F=t=>({}),ge=t=>({}),H=t=>({}),be=t=>({}),Q=t=>({}),ye=t=>({value:t&4}),W=t=>({value:t[12].value});function he(t){let e;const n=t[9].next,s=B(n,t,t[8],F),l=s||Le();return{c(){l&&l.c()},m(o,a){l&&l.m(o,a),e=!0},p(o,a){s&&s.p&&(!e||a&256)&&N(s,n,o,o[8],e?C(n,o[8],a,pe):z(o[8]),F)},i(o){e||(m(l,o),e=!0)},o(o){g(l,o),e=!1},d(o){l&&l.d(o)}}}function ve(t){let e;const n=t[9].prev,s=B(n,t,t[8],H),l=s||Pe();return{c(){l&&l.c()},m(o,a){l&&l.m(o,a),e=!0},p(o,a){s&&s.p&&(!e||a&256)&&N(s,n,o,o[8],e?C(n,o[8],a,ge):z(o[8]),H)},i(o){e||(m(l,o),e=!0)},o(o){g(l,o),e=!1},d(o){l&&l.d(o)}}}function de(t){let e;const n=t[9].ellipsis,s=B(n,t,t[8],Q),l=s||Se();return{c(){l&&l.c()},m(o,a){l&&l.m(o,a),e=!0},p(o,a){s&&s.p&&(!e||a&256)&&N(s,n,o,o[8],e?C(n,o[8],a,be):z(o[8]),Q)},i(o){e||(m(l,o),e=!0)},o(o){g(l,o),e=!1},d(o){l&&l.d(o)}}}function ke(t){let e;const n=t[9].number,s=B(n,t,t[8],W),l=s||we(t);return{c(){l&&l.c()},m(o,a){l&&l.m(o,a),e=!0},p(o,a){s?s.p&&(!e||a&260)&&N(s,n,o,o[8],e?C(n,o[8],a,ye):z(o[8]),W):l&&l.p&&(!e||a&4)&&l.p(o,e?a:-1)},i(o){e||(m(l,o),e=!0)},o(o){g(l,o),e=!1},d(o){l&&l.d(o)}}}function Le(t){let e,n;return{c(){e=I("svg"),n=I("path"),y(n,"fill","#000000"),y(n,"d","M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"),E(e,"width","24px"),E(e,"height","24px"),y(e,"viewBox","0 0 24 24")},m(s,l){d(s,e,l),v(e,n)},p:R,d(s){s&&k(e)}}}function Pe(t){let e,n;return{c(){e=I("svg"),n=I("path"),y(n,"fill","#000000"),y(n,"d","M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"),E(e,"width","24px"),E(e,"height","24px"),y(e,"viewBox","0 0 24 24")},m(s,l){d(s,e,l),v(e,n)},p:R,d(s){s&&k(e)}}}function Se(t){let e;return{c(){e=P("span"),e.textContent="..."},m(n,s){d(n,e,s)},p:R,d(n){n&&k(e)}}}function we(t){let e,n=t[12].value+"",s;return{c(){e=P("span"),s=x(n)},m(l,o){d(l,e,o),v(e,s)},p(l,o){o&4&&n!==(n=l[12].value+"")&&ee(s,n)},d(l){l&&k(e)}}}function Y(t){let e,n,s,l,o,a,r;const i=[ke,de,ve,he],u=[];function _(f,p){return f[12].type==="number"?0:f[12].type==="symbol"&&f[12].symbol===L?1:f[12].type==="symbol"&&f[12].symbol===S?2:f[12].type==="symbol"&&f[12].symbol===w?3:-1}~(n=_(t))&&(s=u[n]=i[n](t));function h(){return t[10](t[12])}return{c(){e=P("span"),s&&s.c(),l=G(),y(e,"class","option"),b(e,"number",t[12].type==="number"),b(e,"prev",t[12].type==="symbol"&&t[12].symbol===S),b(e,"next",t[12].type==="symbol"&&t[12].symbol===w),b(e,"disabled",t[12].type==="symbol"&&t[12].symbol===w&&t[0]>=t[1]||t[12].type==="symbol"&&t[12].symbol===S&&t[0]<=1),b(e,"ellipsis",t[12].type==="symbol"&&t[12].symbol===L),b(e,"active",t[12].type==="number"&&t[12].value===t[0])},m(f,p){d(f,e,p),~n&&u[n].m(e,null),v(e,l),o=!0,a||(r=le(e,"click",h),a=!0)},p(f,p){t=f;let O=n;n=_(t),n===O?~n&&u[n].p(t,p):(s&&(q(),g(u[O],1,1,()=>{u[O]=null}),D()),~n?(s=u[n],s?s.p(t,p):(s=u[n]=i[n](t),s.c()),m(s,1),s.m(e,l)):s=null),p&4&&b(e,"number",t[12].type==="number"),p&4&&b(e,"prev",t[12].type==="symbol"&&t[12].symbol===S),p&4&&b(e,"next",t[12].type==="symbol"&&t[12].symbol===w),p&7&&b(e,"disabled",t[12].type==="symbol"&&t[12].symbol===w&&t[0]>=t[1]||t[12].type==="symbol"&&t[12].symbol===S&&t[0]<=1),p&4&&b(e,"ellipsis",t[12].type==="symbol"&&t[12].symbol===L),p&5&&b(e,"active",t[12].type==="number"&&t[12].value===t[0])},i(f){o||(m(s),o=!0)},o(f){g(s),o=!1},d(f){f&&k(e),~n&&u[n].d(),a=!1,r()}}}function Oe(t){let e,n,s=t[2],l=[];for(let a=0;a<s.length;a+=1)l[a]=Y(K(t,s,a));const o=a=>g(l[a],1,1,()=>{l[a]=null});return{c(){e=P("div");for(let a=0;a<l.length;a+=1)l[a].c();y(e,"class","pagination-nav")},m(a,r){d(a,e,r);for(let i=0;i<l.length;i+=1)l[i].m(e,null);n=!0},p(a,[r]){if(r&271){s=a[2];let i;for(i=0;i<s.length;i+=1){const u=K(a,s,i);l[i]?(l[i].p(u,r),m(l[i],1)):(l[i]=Y(u),l[i].c(),m(l[i],1),l[i].m(e,null))}for(q(),i=s.length;i<l.length;i+=1)o(i);D()}},i(a){if(!n){for(let r=0;r<s.length;r+=1)m(l[r]);n=!0}},o(a){l=l.filter(Boolean);for(let r=0;r<l.length;r+=1)g(l[r]);n=!1},d(a){a&&k(e),te(l,a)}}}function Ie(t,e,n){let s,l,{$$slots:o={},$$scope:a}=e;const r=ne();let{totalItems:i=0}=e,{pageSize:u=1}=e,{currentPage:_=1}=e,{limit:h=null}=e,{showStepOptions:f=!1}=e;function p(c){r("setPage",{page:c.value})}const O=c=>p(c);return t.$$set=c=>{"totalItems"in c&&n(4,i=c.totalItems),"pageSize"in c&&n(5,u=c.pageSize),"currentPage"in c&&n(0,_=c.currentPage),"limit"in c&&n(6,h=c.limit),"showStepOptions"in c&&n(7,f=c.showStepOptions),"$$scope"in c&&n(8,a=c.$$scope)},t.$$.update=()=>{t.$$.dirty&241&&n(2,s=ue({totalItems:i,pageSize:u,currentPage:_,limit:h,showStepOptions:f})),t.$$.dirty&48&&n(1,l=Math.ceil(i/u))},[_,l,s,p,i,u,h,f,a,o,O]}class Ee extends U{constructor(e){super(),T(this,e,Ie,Oe,j,{totalItems:4,pageSize:5,currentPage:0,limit:6,showStepOptions:7})}}function Ae(t){let e,n,s;const l=[t[0]];let o={};for(let a=0;a<l.length;a+=1)o=M(o,l[a]);return n=new Ee({props:o}),n.$on("setPage",t[1]),{c(){e=P("div"),V(n.$$.fragment),y(e,"class","light-pagination-nav svelte-s5ru8s")},m(a,r){d(a,e,r),X(n,e,null),s=!0},p(a,[r]){const i=r&1?se(l,[oe(a[0])]):{};n.$set(i)},i(a){s||(m(n.$$.fragment,a),s=!0)},o(a){g(n.$$.fragment,a),s=!1},d(a){a&&k(e),Z(n)}}}function Be(t,e,n){function s(l){ae.call(this,t,l)}return t.$$set=l=>{n(0,e=M(M({},e),J(l)))},e=J(e),[e,s]}class Ne extends U{constructor(e){super(),T(this,e,Be,Ae,j,{})}}function $(t){let e,n;return e=new Ne({props:{totalItems:t[1].length,pageSize:A,currentPage:t[0],limit:1,showStepOptions:!0}}),e.$on("setPage",t[6]),{c(){V(e.$$.fragment)},m(s,l){X(e,s,l),n=!0},p(s,l){const o={};l&2&&(o.totalItems=s[1].length),l&1&&(o.currentPage=s[0]),e.$set(o)},i(s){n||(m(e.$$.fragment,s),n=!0)},o(s){g(e.$$.fragment,s),n=!1},d(s){Z(e,s)}}}function ze(t){let e,n,s,l,o,a,r;o=new ie({props:{contents:t[2],style:"small"}});let i=t[1].length>A&&$(t);return{c(){e=P("section"),n=P("h1"),s=x(t[3]),l=G(),V(o.$$.fragment),a=G(),i&&i.c(),y(n,"class","svelte-bzxigm")},m(u,_){d(u,e,_),v(e,n),v(n,s),v(e,l),X(o,e,null),v(e,a),i&&i.m(e,null),r=!0},p(u,[_]){(!r||_&8)&&ee(s,u[3]);const h={};_&4&&(h.contents=u[2]),o.$set(h),u[1].length>A?i?(i.p(u,_),_&2&&m(i,1)):(i=$(u),i.c(),m(i,1),i.m(e,null)):i&&(q(),g(i,1,1,()=>{i=null}),D())},i(u){r||(m(o.$$.fragment,u),m(i),r=!0)},o(u){g(o.$$.fragment,u),g(i),r=!1},d(u){u&&k(e),Z(o),i&&i.d()}}}let A=10;function Ce(t,e,n){let s,l,o,a,{data:r}=e,i=1;const u=_=>n(0,i=_.detail.page);return t.$$set=_=>{"data"in _&&n(4,r=_.data)},t.$$.update=()=>{t.$$.dirty&16&&n(1,{items:s,type:l}=r,s,(n(5,l),n(4,r))),t.$$.dirty&32&&n(3,o=l=="blogPost"?"Blog posts":"Projects"),t.$$.dirty&3&&n(2,a=re({items:s,pageSize:A,currentPage:i}))},[i,s,a,o,r,l,u]}class Te extends U{constructor(e){super(),T(this,e,Ce,ze,j,{data:4})}}export{Te as default};
