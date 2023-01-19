import{S as F,i as N,s as j,j as g,a as C,p as q,b as W,A as p,q as H,d as v,t as w,f as B,r as S,k as $,v as G,G as L,m as P,n as D,e as M,c as J,H as O,g as T}from"../../../chunks/index-43d95a4d.js";import{C as Q}from"../../../chunks/ContentCard-68052a26.js";import"../../../chunks/paths-9b83c8fd.js";function R(r){let e,l,t,s,f;return s=new Q({props:{contents:r[0]}}),{c(){e=g("section"),l=g("h2"),l.textContent="Featured posts and projects",t=C(),q(s.$$.fragment)},m(a,o){W(a,e,o),p(e,l),p(e,t),H(s,e,null),f=!0},p(a,[o]){const d={};o&1&&(d.contents=a[0]),s.$set(d)},i(a){f||(v(s.$$.fragment,a),f=!0)},o(a){w(s.$$.fragment,a),f=!1},d(a){a&&B(e),S(s)}}}function U(r,e,l){let{featuredPosts:t}=e;return r.$$set=s=>{"featuredPosts"in s&&l(0,t=s.featuredPosts)},[t]}class V extends F{constructor(e){super(),N(this,e,U,R,j,{featuredPosts:0})}}function y(r,e,l){const t=r.slice();return t[1]=e[l],t}function z(r){let e,l,t,s=r[1].fields.workPlaceName+"",f,a,o,d,i=r[1].fields.title+"",m,h,u=r[1].fields.startDate.split("-")[0]+"",c,n,_=(r[1].fields.endDate?r[1].fields.endDate.split("-")[0]:"present")+"",E,A;return{c(){e=g("li"),l=g("p"),t=g("a"),f=P(s),o=C(),d=g("span"),m=P(i),h=P(", "),c=P(u),n=P("\u2013"),E=P(_),A=C(),$(t,"href",a=r[1].fields.url),$(t,"class","svelte-dbpaft"),$(d,"class","ts-s"),$(l,"class","svelte-dbpaft"),$(e,"class","p1 svelte-dbpaft")},m(k,b){W(k,e,b),p(e,l),p(l,t),p(t,f),p(l,o),p(l,d),p(d,m),p(d,h),p(d,c),p(d,n),p(d,E),p(e,A)},p(k,b){b&1&&s!==(s=k[1].fields.workPlaceName+"")&&D(f,s),b&1&&a!==(a=k[1].fields.url)&&$(t,"href",a),b&1&&i!==(i=k[1].fields.title+"")&&D(m,i),b&1&&u!==(u=k[1].fields.startDate.split("-")[0]+"")&&D(c,u),b&1&&_!==(_=(k[1].fields.endDate?k[1].fields.endDate.split("-")[0]:"present")+"")&&D(E,_)},d(k){k&&B(e)}}}function X(r){let e,l,t,s,f=r[0],a=[];for(let o=0;o<f.length;o+=1)a[o]=z(y(r,f,o));return{c(){e=g("section"),l=g("h2"),l.textContent="Jobs",t=C(),s=g("ol");for(let o=0;o<a.length;o+=1)a[o].c();$(s,"class","g2 svelte-dbpaft")},m(o,d){W(o,e,d),p(e,l),p(e,t),p(e,s);for(let i=0;i<a.length;i+=1)a[i].m(s,null)},p(o,[d]){if(d&1){f=o[0];let i;for(i=0;i<f.length;i+=1){const m=y(o,f,i);a[i]?a[i].p(m,d):(a[i]=z(m),a[i].c(),a[i].m(s,null))}for(;i<a.length;i+=1)a[i].d(1);a.length=f.length}},i:G,o:G,d(o){o&&B(e),L(a,o)}}}function Y(r,e,l){let{featuredWork:t}=e;return r.$$set=s=>{"featuredWork"in s&&l(0,t=s.featuredWork)},[t]}class Z extends F{constructor(e){super(),N(this,e,Y,X,j,{featuredWork:0})}}function I(r){let e,l;return e=new V({props:{featuredPosts:r[0].featuredBlogPosts}}),{c(){q(e.$$.fragment)},m(t,s){H(e,t,s),l=!0},p(t,s){const f={};s&1&&(f.featuredPosts=t[0].featuredBlogPosts),e.$set(f)},i(t){l||(v(e.$$.fragment,t),l=!0)},o(t){w(e.$$.fragment,t),l=!1},d(t){S(e,t)}}}function K(r){let e,l;return e=new Z({props:{featuredWork:r[0].featuredWorkExperience}}),{c(){q(e.$$.fragment)},m(t,s){H(e,t,s),l=!0},p(t,s){const f={};s&1&&(f.featuredWork=t[0].featuredWorkExperience),e.$set(f)},i(t){l||(v(e.$$.fragment,t),l=!0)},o(t){w(e.$$.fragment,t),l=!1},d(t){S(e,t)}}}function x(r){let e,l,t=r[0].overview+"",s,f,a,o=r[0].body+"",d,i,m,h,u=r[0].featuredBlogPosts&&r[0].featuredBlogPosts.length&&I(r),c=r[0].featuredWorkExperience&&r[0].featuredWorkExperience.length&&K(r);return{c(){e=g("section"),l=g("p"),s=P(t),f=C(),a=new O(!1),d=C(),u&&u.c(),i=C(),c&&c.c(),m=M(),$(l,"class","overview h2 svelte-1fhbiaj"),a.a=null,$(e,"title","introduction")},m(n,_){W(n,e,_),p(e,l),p(l,s),p(e,f),a.m(o,e),W(n,d,_),u&&u.m(n,_),W(n,i,_),c&&c.m(n,_),W(n,m,_),h=!0},p(n,[_]){(!h||_&1)&&t!==(t=n[0].overview+"")&&D(s,t),(!h||_&1)&&o!==(o=n[0].body+"")&&a.p(o),n[0].featuredBlogPosts&&n[0].featuredBlogPosts.length?u?(u.p(n,_),_&1&&v(u,1)):(u=I(n),u.c(),v(u,1),u.m(i.parentNode,i)):u&&(T(),w(u,1,1,()=>{u=null}),J()),n[0].featuredWorkExperience&&n[0].featuredWorkExperience.length?c?(c.p(n,_),_&1&&v(c,1)):(c=K(n),c.c(),v(c,1),c.m(m.parentNode,m)):c&&(T(),w(c,1,1,()=>{c=null}),J())},i(n){h||(v(u),v(c),h=!0)},o(n){w(u),w(c),h=!1},d(n){n&&B(e),n&&B(d),u&&u.d(n),n&&B(i),c&&c.d(n),n&&B(m)}}}function ee(r,e,l){let t,{data:s}=e;return r.$$set=f=>{"data"in f&&l(1,s=f.data)},r.$$.update=()=>{r.$$.dirty&2&&l(0,{fields:t}=s,t)},[t,s]}class re extends F{constructor(e){super(),N(this,e,ee,x,j,{data:1})}}export{re as default};