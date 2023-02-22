import{S as H,i as y,s as F,j as _,a as P,p as S,k as m,b as q,A as u,q as T,d as $,t as N,f as B,r as G,v as O,G as z,m as E,n as D,e as I,c as x,H as K,g as Y}from"../../../chunks/index-43d95a4d.js";import{C as Q}from"../../../chunks/ContentCard-c3f253eb.js";import"../../../chunks/paths-9b83c8fd.js";function R(a){let e,s,t,l,f;return l=new Q({props:{contents:a[0]}}),{c(){e=_("section"),s=_("h2"),s.textContent="Featured posts and projects",t=P(),S(l.$$.fragment),m(s,"class","svelte-valwvj")},m(r,i){q(r,e,i),u(e,s),u(e,t),T(l,e,null),f=!0},p(r,[i]){const g={};i&1&&(g.contents=r[0]),l.$set(g)},i(r){f||($(l.$$.fragment,r),f=!0)},o(r){N(l.$$.fragment,r),f=!1},d(r){r&&B(e),G(l)}}}function U(a,e,s){let{featuredPosts:t}=e;return a.$$set=l=>{"featuredPosts"in l&&s(0,t=l.featuredPosts)},[t]}class V extends H{constructor(e){super(),y(this,e,U,R,F,{featuredPosts:0})}}function A(a,e,s){const t=a.slice();return t[1]=e[s],t}function J(a){let e,s,t,l,f=a[1].fields.workPlaceName+"",r,i,g,o,h=a[1].fields.title+"",W,C,v=a[1].fields.startDate.split("-")[0]+"",b,w,c=(a[1].fields.endDate?a[1].fields.endDate.split("-")[0]:"present")+"",p,n,d;return{c(){e=_("li"),s=_("a"),t=_("p"),l=_("span"),r=E(f),i=_("br"),g=P(),o=_("span"),W=E(h),C=E(", "),b=E(v),w=E("\u2013"),p=E(c),d=P(),m(l,"class","link-text svelte-xgt8vv"),m(o,"class","ts-s title svelte-xgt8vv"),m(t,"class","svelte-xgt8vv"),m(s,"href",n=a[1].fields.url),m(s,"class","inner p1 svelte-xgt8vv"),m(e,"class","fx svelte-xgt8vv")},m(k,j){q(k,e,j),u(e,s),u(s,t),u(t,l),u(l,r),u(t,i),u(t,g),u(t,o),u(o,W),u(o,C),u(o,b),u(o,w),u(o,p),u(e,d)},p(k,j){j&1&&f!==(f=k[1].fields.workPlaceName+"")&&D(r,f),j&1&&h!==(h=k[1].fields.title+"")&&D(W,h),j&1&&v!==(v=k[1].fields.startDate.split("-")[0]+"")&&D(b,v),j&1&&c!==(c=(k[1].fields.endDate?k[1].fields.endDate.split("-")[0]:"present")+"")&&D(p,c),j&1&&n!==(n=k[1].fields.url)&&m(s,"href",n)},d(k){k&&B(e)}}}function X(a){let e,s,t,l,f=a[0],r=[];for(let i=0;i<f.length;i+=1)r[i]=J(A(a,f,i));return{c(){e=_("section"),s=_("h2"),s.textContent="Work experience",t=P(),l=_("ol");for(let i=0;i<r.length;i+=1)r[i].c();m(s,"class","svelte-xgt8vv"),m(l,"class","g2 svelte-xgt8vv")},m(i,g){q(i,e,g),u(e,s),u(e,t),u(e,l);for(let o=0;o<r.length;o+=1)r[o].m(l,null)},p(i,[g]){if(g&1){f=i[0];let o;for(o=0;o<f.length;o+=1){const h=A(i,f,o);r[o]?r[o].p(h,g):(r[o]=J(h),r[o].c(),r[o].m(l,null))}for(;o<r.length;o+=1)r[o].d(1);r.length=f.length}},i:O,o:O,d(i){i&&B(e),z(r,i)}}}function Z(a,e,s){let{featuredWork:t}=e;return a.$$set=l=>{"featuredWork"in l&&s(0,t=l.featuredWork)},[t]}class ee extends H{constructor(e){super(),y(this,e,Z,X,F,{featuredWork:0})}}function L(a){let e,s;return e=new V({props:{featuredPosts:a[0].featuredBlogPosts}}),{c(){S(e.$$.fragment)},m(t,l){T(e,t,l),s=!0},p(t,l){const f={};l&1&&(f.featuredPosts=t[0].featuredBlogPosts),e.$set(f)},i(t){s||($(e.$$.fragment,t),s=!0)},o(t){N(e.$$.fragment,t),s=!1},d(t){G(e,t)}}}function M(a){let e,s;return e=new ee({props:{featuredWork:a[0].featuredWorkExperience}}),{c(){S(e.$$.fragment)},m(t,l){T(e,t,l),s=!0},p(t,l){const f={};l&1&&(f.featuredWork=t[0].featuredWorkExperience),e.$set(f)},i(t){s||($(e.$$.fragment,t),s=!0)},o(t){N(e.$$.fragment,t),s=!1},d(t){G(e,t)}}}function te(a){let e,s,t,l,f=a[0].overview+"",r,i,g,o,h,W=a[0].body+"",C,v,b,w,c=a[0].featuredBlogPosts&&a[0].featuredBlogPosts.length&&L(a),p=a[0].featuredWorkExperience&&a[0].featuredWorkExperience.length&&M(a);return{c(){e=_("section"),s=_("a"),s.innerHTML='<img srcset="https://images.ctfassets.net/3qr5d6sj491p/6E2Gh0TS2hrqafgOY1NlHr/68804563485dfdb3f0cb50fb38e3e3fa/osterman-photo.jpg?f=face&amp;w=250&amp;h=250&amp;fit=fill&amp;fm=webp 2x, https://images.ctfassets.net/3qr5d6sj491p/6E2Gh0TS2hrqafgOY1NlHr/68804563485dfdb3f0cb50fb38e3e3fa/osterman-photo.jpg?f=face&amp;w=125&amp;h=125&amp;fit=fill&amp;fm=webp 1x" src="https://images.ctfassets.net/3qr5d6sj491p/6E2Gh0TS2hrqafgOY1NlHr/68804563485dfdb3f0cb50fb38e3e3fa/osterman-photo.jpg?f=face&amp;w=125&amp;h=125&amp;fit=fill&amp;fm=webp" alt="John Osterman. Physical description: a White man with short brown hair and a graying beard, smiling outside in front of a brick wall with ivy on it." class="svelte-1kxcnd2"/>',t=P(),l=_("p"),r=E(f),i=P(),g=_("hr"),o=P(),h=new K(!1),C=P(),c&&c.c(),v=P(),p&&p.c(),b=I(),m(s,"href","/about/"),m(s,"title","About page"),m(l,"class","overview h2 svelte-1kxcnd2"),m(g,"class","svelte-1kxcnd2"),h.a=null,m(e,"title","introduction")},m(n,d){q(n,e,d),u(e,s),u(e,t),u(e,l),u(l,r),u(e,i),u(e,g),u(e,o),h.m(W,e),q(n,C,d),c&&c.m(n,d),q(n,v,d),p&&p.m(n,d),q(n,b,d),w=!0},p(n,[d]){(!w||d&1)&&f!==(f=n[0].overview+"")&&D(r,f),(!w||d&1)&&W!==(W=n[0].body+"")&&h.p(W),n[0].featuredBlogPosts&&n[0].featuredBlogPosts.length?c?(c.p(n,d),d&1&&$(c,1)):(c=L(n),c.c(),$(c,1),c.m(v.parentNode,v)):c&&(Y(),N(c,1,1,()=>{c=null}),x()),n[0].featuredWorkExperience&&n[0].featuredWorkExperience.length?p?(p.p(n,d),d&1&&$(p,1)):(p=M(n),p.c(),$(p,1),p.m(b.parentNode,b)):p&&(Y(),N(p,1,1,()=>{p=null}),x())},i(n){w||($(c),$(p),w=!0)},o(n){N(c),N(p),w=!1},d(n){n&&B(e),n&&B(C),c&&c.d(n),n&&B(v),p&&p.d(n),n&&B(b)}}}function se(a,e,s){let t,{data:l}=e;return a.$$set=f=>{"data"in f&&s(1,l=f.data)},a.$$.update=()=>{a.$$.dirty&2&&s(0,{fields:t}=l,t)},[t,l]}class ne extends H{constructor(e){super(),y(this,e,se,te,F,{data:1})}}export{ne as default};
