import{S as B,i as C,s as E,j as b,m as c,a as S,e as w,b as m,A as v,n as d,v as j,f as u,B as z}from"../chunks/index-43d95a4d.js";import{p as D}from"../chunks/stores-0cc55043.js";import"../chunks/singletons-0c3e0c27.js";import"../chunks/paths-9b83c8fd.js";function q(o){let r,f=o[0].error.frame+"",l;return{c(){r=b("pre"),l=c(f)},m(s,a){m(s,r,a),v(r,l)},p(s,a){a&1&&f!==(f=s[0].error.frame+"")&&d(l,f)},d(s){s&&u(r)}}}function A(o){let r,f=o[0].error.stack+"",l;return{c(){r=b("pre"),l=c(f)},m(s,a){m(s,r,a),v(r,l)},p(s,a){a&1&&f!==(f=s[0].error.stack+"")&&d(l,f)},d(s){s&&u(r)}}}function F(o){let r,f=o[0].status+"",l,s,a,k=o[0].error.message+"",$,N,n,_,t=o[0].error.frame&&q(o),i=o[0].error.stack&&A(o);return{c(){r=b("h1"),l=c(f),s=S(),a=b("pre"),$=c(k),N=S(),t&&t.c(),n=S(),i&&i.c(),_=w()},m(e,p){m(e,r,p),v(r,l),m(e,s,p),m(e,a,p),v(a,$),m(e,N,p),t&&t.m(e,p),m(e,n,p),i&&i.m(e,p),m(e,_,p)},p(e,[p]){p&1&&f!==(f=e[0].status+"")&&d(l,f),p&1&&k!==(k=e[0].error.message+"")&&d($,k),e[0].error.frame?t?t.p(e,p):(t=q(e),t.c(),t.m(n.parentNode,n)):t&&(t.d(1),t=null),e[0].error.stack?i?i.p(e,p):(i=A(e),i.c(),i.m(_.parentNode,_)):i&&(i.d(1),i=null)},i:j,o:j,d(e){e&&u(r),e&&u(s),e&&u(a),e&&u(N),t&&t.d(e),e&&u(n),i&&i.d(e),e&&u(_)}}}function G(o,r,f){let l;return z(o,D,s=>f(0,l=s)),[l]}class L extends B{constructor(r){super(),C(this,r,G,F,E,{})}}export{L as default};