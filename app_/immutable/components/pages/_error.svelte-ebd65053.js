import{S as P,i as S,s as T,k as u,a as x,q as d,e as g,G as $,l as _,h as n,c as A,m as v,r as b,n as y,p as C,C as h,b as m,A as E,K as w}from"../../chunks/index-c7c7623e.js";import{p as G}from"../../chunks/stores-61a61649.js";import{b as H}from"../../chunks/paths-9b83c8fd.js";import"../../chunks/singletons-8b19366d.js";function K(p){let t,l,a,s,f;return{c(){t=u("p"),l=d("The page you requested does not exist. Please try again or navigate back to the "),a=u("a"),s=d("homepage"),f=d("."),this.h()},l(i){t=_(i,"P",{});var r=v(t);l=b(r,"The page you requested does not exist. Please try again or navigate back to the "),a=_(r,"A",{href:!0});var o=v(a);s=b(o,"homepage"),o.forEach(n),f=b(r,"."),r.forEach(n),this.h()},h(){y(a,"href",H+"/")},m(i,r){m(i,t,r),h(t,l),h(t,a),h(a,s),h(t,f)},p:E,d(i){i&&n(t)}}}function M(p){let t,l,a,s,f,i,r,o=p[0]==404&&K();return{c(){t=u("meta"),l=x(),a=u("h1"),s=u("span"),f=d(p[0]),i=x(),o&&o.c(),r=g(),this.h()},l(e){const c=$('[data-svelte="svelte-15fnc8a"]',document.head);t=_(c,"META",{name:!0,content:!0}),c.forEach(n),l=A(e),a=_(e,"H1",{});var k=v(a);s=_(k,"SPAN",{style:!0,class:!0});var q=v(s);f=b(q,p[0]),q.forEach(n),k.forEach(n),i=A(e),o&&o.l(e),r=g(),this.h()},h(){y(t,"name","robots"),y(t,"content","noindex, nofollow"),C(s,"float","none"),y(s,"class","first-letter")},m(e,c){h(document.head,t),m(e,l,c),m(e,a,c),h(a,s),h(s,f),m(e,i,c),o&&o.m(e,c),m(e,r,c)},p(e,[c]){e[0]==404&&o.p(e,c)},i:E,o:E,d(e){n(t),e&&n(l),e&&n(a),e&&n(i),o&&o.d(e),e&&n(r)}}}function N(p,t,l){let a;return w(p,G,f=>l(1,a=f)),console.error("Original error:",a.error),[a.status==400?404:a.status]}class D extends P{constructor(t){super(),S(this,t,N,M,T,{})}}export{D as default};
