import{S as F,i as N,s as j,j as g,a as C,p as q,b,A as p,q as H,d as v,t as w,f as B,r as S,k as $,v as G,G as L,m as W,n as D,e as M,c as J,H as O,g as T}from"../../../chunks/index-43d95a4d.js";import{C as Q}from"../../../chunks/ContentCard-2e5faf18.js";import"../../../chunks/paths-9b83c8fd.js";function R(a){let e,l,t,s,f;return s=new Q({props:{contents:a[0]}}),{c(){e=g("section"),l=g("h2"),l.textContent="Featured posts and projects",t=C(),q(s.$$.fragment)},m(r,o){b(r,e,o),p(e,l),p(e,t),H(s,e,null),f=!0},p(r,[o]){const d={};o&1&&(d.contents=r[0]),s.$set(d)},i(r){f||(v(s.$$.fragment,r),f=!0)},o(r){w(s.$$.fragment,r),f=!1},d(r){r&&B(e),S(s)}}}function U(a,e,l){let{featuredPosts:t}=e;return a.$$set=s=>{"featuredPosts"in s&&l(0,t=s.featuredPosts)},[t]}class V extends F{constructor(e){super(),N(this,e,U,R,j,{featuredPosts:0})}}function y(a,e,l){const t=a.slice();return t[1]=e[l],t}function z(a){let e,l,t,s=a[1].fields.workPlaceName+"",f,r,o,d,i=a[1].fields.title+"",m,h,u=a[1].fields.startDate.split("-")[0]+"",c,n,_=(a[1].fields.endDate?a[1].fields.endDate.split("-")[0]:"present")+"",E,A;return{c(){e=g("li"),l=g("p"),t=g("a"),f=W(s),o=C(),d=g("span"),m=W(i),h=W(", "),c=W(u),n=W("\u2013"),E=W(_),A=C(),$(t,"href",r=a[1].fields.url),$(t,"class","svelte-1auiaa5"),$(d,"class","ts-s"),$(l,"class","svelte-1auiaa5"),$(e,"class","p1 svelte-1auiaa5")},m(k,P){b(k,e,P),p(e,l),p(l,t),p(t,f),p(l,o),p(l,d),p(d,m),p(d,h),p(d,c),p(d,n),p(d,E),p(e,A)},p(k,P){P&1&&s!==(s=k[1].fields.workPlaceName+"")&&D(f,s),P&1&&r!==(r=k[1].fields.url)&&$(t,"href",r),P&1&&i!==(i=k[1].fields.title+"")&&D(m,i),P&1&&u!==(u=k[1].fields.startDate.split("-")[0]+"")&&D(c,u),P&1&&_!==(_=(k[1].fields.endDate?k[1].fields.endDate.split("-")[0]:"present")+"")&&D(E,_)},d(k){k&&B(e)}}}function X(a){let e,l,t,s,f=a[0],r=[];for(let o=0;o<f.length;o+=1)r[o]=z(y(a,f,o));return{c(){e=g("section"),l=g("h2"),l.textContent="Jobs",t=C(),s=g("ol");for(let o=0;o<r.length;o+=1)r[o].c();$(s,"class","g2 svelte-1auiaa5")},m(o,d){b(o,e,d),p(e,l),p(e,t),p(e,s);for(let i=0;i<r.length;i+=1)r[i].m(s,null)},p(o,[d]){if(d&1){f=o[0];let i;for(i=0;i<f.length;i+=1){const m=y(o,f,i);r[i]?r[i].p(m,d):(r[i]=z(m),r[i].c(),r[i].m(s,null))}for(;i<r.length;i+=1)r[i].d(1);r.length=f.length}},i:G,o:G,d(o){o&&B(e),L(r,o)}}}function Y(a,e,l){let{featuredWork:t}=e;return a.$$set=s=>{"featuredWork"in s&&l(0,t=s.featuredWork)},[t]}class Z extends F{constructor(e){super(),N(this,e,Y,X,j,{featuredWork:0})}}function I(a){let e,l;return e=new V({props:{featuredPosts:a[0].featuredBlogPosts}}),{c(){q(e.$$.fragment)},m(t,s){H(e,t,s),l=!0},p(t,s){const f={};s&1&&(f.featuredPosts=t[0].featuredBlogPosts),e.$set(f)},i(t){l||(v(e.$$.fragment,t),l=!0)},o(t){w(e.$$.fragment,t),l=!1},d(t){S(e,t)}}}function K(a){let e,l;return e=new Z({props:{featuredWork:a[0].featuredWorkExperience}}),{c(){q(e.$$.fragment)},m(t,s){H(e,t,s),l=!0},p(t,s){const f={};s&1&&(f.featuredWork=t[0].featuredWorkExperience),e.$set(f)},i(t){l||(v(e.$$.fragment,t),l=!0)},o(t){w(e.$$.fragment,t),l=!1},d(t){S(e,t)}}}function x(a){let e,l,t=a[0].overview+"",s,f,r,o=a[0].body+"",d,i,m,h,u=a[0].featuredBlogPosts&&a[0].featuredBlogPosts.length&&I(a),c=a[0].featuredWorkExperience&&a[0].featuredWorkExperience.length&&K(a);return{c(){e=g("section"),l=g("p"),s=W(t),f=C(),r=new O(!1),d=C(),u&&u.c(),i=C(),c&&c.c(),m=M(),$(l,"class","overview h2 svelte-1fhbiaj"),r.a=null,$(e,"title","introduction")},m(n,_){b(n,e,_),p(e,l),p(l,s),p(e,f),r.m(o,e),b(n,d,_),u&&u.m(n,_),b(n,i,_),c&&c.m(n,_),b(n,m,_),h=!0},p(n,[_]){(!h||_&1)&&t!==(t=n[0].overview+"")&&D(s,t),(!h||_&1)&&o!==(o=n[0].body+"")&&r.p(o),n[0].featuredBlogPosts&&n[0].featuredBlogPosts.length?u?(u.p(n,_),_&1&&v(u,1)):(u=I(n),u.c(),v(u,1),u.m(i.parentNode,i)):u&&(T(),w(u,1,1,()=>{u=null}),J()),n[0].featuredWorkExperience&&n[0].featuredWorkExperience.length?c?(c.p(n,_),_&1&&v(c,1)):(c=K(n),c.c(),v(c,1),c.m(m.parentNode,m)):c&&(T(),w(c,1,1,()=>{c=null}),J())},i(n){h||(v(u),v(c),h=!0)},o(n){w(u),w(c),h=!1},d(n){n&&B(e),n&&B(d),u&&u.d(n),n&&B(i),c&&c.d(n),n&&B(m)}}}function ee(a,e,l){let t,{data:s}=e;return a.$$set=f=>{"data"in f&&l(1,s=f.data)},a.$$.update=()=>{a.$$.dirty&2&&l(0,{fields:t}=s,t)},[t,s]}class ae extends F{constructor(e){super(),N(this,e,ee,x,j,{data:1})}}export{ae as default};