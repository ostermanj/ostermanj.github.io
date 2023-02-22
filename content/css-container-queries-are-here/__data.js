window.__sveltekit_data = (function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s){return {type:k,nodes:[l,l,{type:k,data:{authors:[{metadata:{tags:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"6rhv4yMoAF3cN8jyYqZSWu",type:h,createdAt:"2022-06-17T16:18:02.488Z",updatedAt:"2022-06-25T01:07:29.101Z",environment:{sys:{id:d,type:a,linkType:e}},revision:2,contentType:{sys:{type:a,linkType:i,id:"author"}},locale:f},fields:{fullName:"John Osterman",website:"https:\u002F\u002Fosterman.io\u002F",twitterAccount:"https:\u002F\u002Ftwitter.com\u002FJohnAOsterman",linkedinAccount:"https:\u002F\u002Fwww.linkedin.com\u002Fin\u002Fjohn-osterman-32714012\u002F",photo:{metadata:{tags:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"6E2Gh0TS2hrqafgOY1NlHr",type:m,createdAt:n,updatedAt:n,environment:{sys:{id:d,type:a,linkType:e}},revision:g,locale:f},fields:{title:"john osterman photo",description:"",file:{url:"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F6E2Gh0TS2hrqafgOY1NlHr\u002F68804563485dfdb3f0cb50fb38e3e3fa\u002Fosterman-photo.jpg",details:{size:256400,image:{width:750,height:847}},fileName:"osterman-photo.jpg",contentType:o}}}}}],title:"CSS container queries are here!",datePublished:"2023-01-12",dateUpdated:"2023-02-16",body:"\u003Caside class=\"update\"\u003E\n  Support for container queries landed in Firefox on February 13, 2023.\n\u003C\u002Faside\u003E\n\u003Cp\u003EIt’s a good time to be a web developer. The excesses of client-side mania (mea culpa) are giving way to a rediscovery of server-side rendering (which of course never went anywhere). Build-and-deploy services like Vercel, Amplify, Azure Static Web Apps, and a host of others make it easy for small teams or one lone freelancer to set up fully featured websites with edge functions, caching, APIs, and smart image delivery. And with recent advances, especially in CSS, working on the \u003Ca href=\"https:\u002F\u002Fbradfrost.com\u002Fblog\u002Fpost\u002Ffront-of-the-front-end-and-back-of-the-front-end-web-development\u002F\"\u003Efront of the front end\u003C\u002Fa\u003E is full of new possibilities and productivity gains.\u003C\u002Fp\u003E\n\u003Cp\u003ECSS, it turns out, \u003Ca href=\"https:\u002F\u002Fduckduckgo.com\u002F?t=ffab&amp;q=css+is+awesome&amp;iax=images&amp;ia=images\"\u003Ereally is awesome\u003C\u002Fa\u003E.\u003C\u002Fp\u003E\n\u003Ch2\u003EContainer queries, finally!\u003C\u002Fh2\u003E\n\u003Cp\u003EOne of the features I and others have been most eagerly awaiting is container queries. They will make reusing responsive components in different contexts much easier. Grid and flexbox layouts have already lessened the need to use media queries to make layouts responsive to screen size. They are \u003Ca href=\"https:\u002F\u002Ftalks.jensimmons.com\u002F15TjNW\"\u003E\u003Cem\u003Eintrinsically\u003C\u002Fem\u003E responsive\u003C\u002Fa\u003E, wrapping rows and columns based on container size without the need to instruct browsers at exactly what screen width to make the change.\u003C\u002Fp\u003E\n\u003Cp\u003EThat’s great, but they haven’t entirely eliminated my use of media queries. There is still a need to employ them to, for instance, hide an element within a grid at certain screen sizes. Here’s a recent example from my work rebuilding the timeline-of-events pages for the \u003Ca href=\"https:\u002F\u002Fencyclopedia.ushmm.org\u002Fcontent\u002Fen\u002Ftimeline\u002Fholocaust\"\u003EHolocaust Encyclopedia\u003C\u002Fa\u003E.\u003C\u002Fp\u003E\n\u003Cdiv class=\"fx fx-wrap ai-e\"\u003E\n\u003Cfigure class=\"half\"\u003E\n\u003Cpicture\u003E\n        \u003Csource srcset=\"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F5c3gZQDg7YwjqWwPNRZybi\u002F34d67b517736ba14d35a77aa1e242f43\u002FScreenshot_2023-01-11_at_8.56.40_AM.png?fm=avif&w=1480&h=1723&q=30 2x, \u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F5c3gZQDg7YwjqWwPNRZybi\u002F34d67b517736ba14d35a77aa1e242f43\u002FScreenshot_2023-01-11_at_8.56.40_AM.png?fm=avif&w=740&h=861&q=30 1x\" type=\"image\u002Favif\" media=\"(min-width:632px)\"\u003E\n                          \u003Csource srcset=\"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F5c3gZQDg7YwjqWwPNRZybi\u002F34d67b517736ba14d35a77aa1e242f43\u002FScreenshot_2023-01-11_at_8.56.40_AM.png?fm=avif&w=800&h=931&q=30 2x, \u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F5c3gZQDg7YwjqWwPNRZybi\u002F34d67b517736ba14d35a77aa1e242f43\u002FScreenshot_2023-01-11_at_8.56.40_AM.png?fm=avif&w=400&h=466&q=30 1x\" type=\"image\u002Favif\"\u003E\u003Csource srcset=\"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F5c3gZQDg7YwjqWwPNRZybi\u002F34d67b517736ba14d35a77aa1e242f43\u002FScreenshot_2023-01-11_at_8.56.40_AM.png?fm=webp&w=1480&h=1723&q=30 2x, \u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F5c3gZQDg7YwjqWwPNRZybi\u002F34d67b517736ba14d35a77aa1e242f43\u002FScreenshot_2023-01-11_at_8.56.40_AM.png?fm=webp&w=740&h=861&q=30 1x\" type=\"image\u002Fwebp\" media=\"(min-width:632px)\"\u003E\n                          \u003Csource srcset=\"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F5c3gZQDg7YwjqWwPNRZybi\u002F34d67b517736ba14d35a77aa1e242f43\u002FScreenshot_2023-01-11_at_8.56.40_AM.png?fm=webp&w=800&h=931&q=30 2x, \u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F5c3gZQDg7YwjqWwPNRZybi\u002F34d67b517736ba14d35a77aa1e242f43\u002FScreenshot_2023-01-11_at_8.56.40_AM.png?fm=webp&w=400&h=466&q=30 1x\" type=\"image\u002Fwebp\"\u003E\n        \u003Cimg load=\"lazy\" class=\"full\" src=\"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F5c3gZQDg7YwjqWwPNRZybi\u002F34d67b517736ba14d35a77aa1e242f43\u002FScreenshot_2023-01-11_at_8.56.40_AM.png\" width=\"756px\" height=\"880px\" alt=\"A series of event content cards, each with a thumbnail image to the left and the date and title of the event to the right. The events shown read: Assassination of Archduke Franz Ferdinand, The Armenian Genocide, and Battle of the Somme.\" \u002F\u003E\n    \u003C\u002Fpicture\u003E\n \u003Cfigcaption\u003EOn small screens less than 500px wide, no description is shown.\u003C\u002Ffigcaption\u003E\n    \u003C\u002Ffigure\u003E\n\u003Cfigure class=\"half\"\u003E\n\u003Cpicture\u003E\n        \u003Csource srcset=\"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F2zrWLBAT2ahMA0tLtIXEsu\u002F17eab9d573cec6fb7b263f5b092dab57\u002FScreenshot_2023-01-11_at_8.55.12_AM.png?fm=avif&w=1480&h=774&q=30 2x, \u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F2zrWLBAT2ahMA0tLtIXEsu\u002F17eab9d573cec6fb7b263f5b092dab57\u002FScreenshot_2023-01-11_at_8.55.12_AM.png?fm=avif&w=740&h=387&q=30 1x\" type=\"image\u002Favif\" media=\"(min-width:632px)\"\u003E\n                          \u003Csource srcset=\"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F2zrWLBAT2ahMA0tLtIXEsu\u002F17eab9d573cec6fb7b263f5b092dab57\u002FScreenshot_2023-01-11_at_8.55.12_AM.png?fm=avif&w=800&h=418&q=30 2x, \u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F2zrWLBAT2ahMA0tLtIXEsu\u002F17eab9d573cec6fb7b263f5b092dab57\u002FScreenshot_2023-01-11_at_8.55.12_AM.png?fm=avif&w=400&h=209&q=30 1x\" type=\"image\u002Favif\"\u003E\u003Csource srcset=\"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F2zrWLBAT2ahMA0tLtIXEsu\u002F17eab9d573cec6fb7b263f5b092dab57\u002FScreenshot_2023-01-11_at_8.55.12_AM.png?fm=webp&w=1480&h=774&q=30 2x, \u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F2zrWLBAT2ahMA0tLtIXEsu\u002F17eab9d573cec6fb7b263f5b092dab57\u002FScreenshot_2023-01-11_at_8.55.12_AM.png?fm=webp&w=740&h=387&q=30 1x\" type=\"image\u002Fwebp\" media=\"(min-width:632px)\"\u003E\n                          \u003Csource srcset=\"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F2zrWLBAT2ahMA0tLtIXEsu\u002F17eab9d573cec6fb7b263f5b092dab57\u002FScreenshot_2023-01-11_at_8.55.12_AM.png?fm=webp&w=800&h=418&q=30 2x, \u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F2zrWLBAT2ahMA0tLtIXEsu\u002F17eab9d573cec6fb7b263f5b092dab57\u002FScreenshot_2023-01-11_at_8.55.12_AM.png?fm=webp&w=400&h=209&q=30 1x\" type=\"image\u002Fwebp\"\u003E\n        \u003Cimg load=\"lazy\" class=\"full\" src=\"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F2zrWLBAT2ahMA0tLtIXEsu\u002F17eab9d573cec6fb7b263f5b092dab57\u002FScreenshot_2023-01-11_at_8.55.12_AM.png\" width=\"1224px\" height=\"640px\" alt=\"A screenshot showing a content card with a thumbnail image  showing destruction from World War One on the left and text to the right. The text reads:  June 28, 1914: Assassination of Archduke Franz Ferdinand The assassination of Archduke Franz Ferdinand precipitates the start of the massive armed conflict in Europe now known as the First World War.\" \u002F\u003E\n    \u003C\u002Fpicture\u003E\n\u003Cfigcaption\u003EOn screens at least 500px wide, a media query ensures that the description is shown.\u003C\u002Ffigcaption\u003E\n\u003C\u002Ffigure\u003E\n\u003C\u002Fdiv\u003E\n\u003Cp\u003EThis is the HTML for one of the content cards, each marked up as an \u003Ccode\u003E&lt;article&gt;\u003C\u002Fcode\u003E:\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Ca href=\"https:\u002F\u002Fgist.github.com\u002Fostermanj\u002Fb7b7b55bfb8483e4599dbf82f8690632\" class=\"embedly-card\" data-card-width=\"100%\" data-card-controls=\"0\"\u003EEmbedded content: https:\u002F\u002Fgist.github.com\u002Fostermanj\u002Fb7b7b55bfb8483e4599dbf82f8690632\u003C\u002Fa\u003E\u003C\u002Fp\u003E\n\u003Cp\u003EThe CSS makes each event a flexbox with two flex-item children: the container for the image and the container for the text. The relative size of the two children is handled intrinsically using the \u003Ccode\u003Eflex-grow\u003C\u002Fcode\u003E css property—no need for media queries there.\tBut we wanted to show the description of the event only on screens larger than 500px wide, and that required a media query:\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Ca href=\"https:\u002F\u002Fgist.github.com\u002Fostermanj\u002F48a62a2cceebab82992e8fb8ce5b3703\" class=\"embedly-card\" data-card-width=\"100%\" data-card-controls=\"0\"\u003EEmbedded content: https:\u002F\u002Fgist.github.com\u002Fostermanj\u002F48a62a2cceebab82992e8fb8ce5b3703\u003C\u002Fa\u003E\u003C\u002Fp\u003E\n\u003Cp\u003EWhat that means, though, is that the list of events isn’t 100% reusable in other contexts. Say I needed to put the list of events in a sidebar that was 320px wide? If the viewport were at least 500px wide, the event description would show even though the component would be much narrower than the threshold. The logic should be based on the size of the component, not the size of the screen. That’s what container queries make possible.\u003C\u002Fp\u003E\n\u003Ch2\u003ESimple syntax\u003C\u002Fh2\u003E\n\u003Cp\u003EThe syntax is pretty simple and builds what we already know from media queries. See the \u003Ca href=\"https:\u002F\u002Fdeveloper.mozilla.org\u002Fen-US\u002Fdocs\u002FWeb\u002FCSS\u002FCSS_Container_Queries\"\u003EMDN article\u003C\u002Fa\u003E for a full description.\u003C\u002Fp\u003E\n\u003Cp\u003EChanging my example to use container queries would only require changing to CSS to declare a containment context on the \u003Ccode\u003Earticle\u003C\u002Fcode\u003E element, giving it a \u003Ccode\u003Econtainer-type\u003C\u002Fcode\u003E and \u003Ccode\u003Econtainer-name\u003C\u002Fcode\u003E using the \u003Ccode\u003Econtainer\u003C\u002Fcode\u003E shorthand syntax:\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Ca href=\"https:\u002F\u002Fgist.github.com\u002Fostermanj\u002Fd948427303b301a896bf153b30c934f5\" class=\"embedly-card\" data-card-width=\"100%\" data-card-controls=\"0\"\u003EEmbedded content: https:\u002F\u002Fgist.github.com\u002Fostermanj\u002Fd948427303b301a896bf153b30c934f5\u003C\u002Fa\u003E\u003C\u002Fp\u003E\n\u003Cp\u003EAnd then modify the media query from above to be a container query instead:\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Ca href=\"https:\u002F\u002Fgist.github.com\u002Fostermanj\u002F1fca89adfbd045bb9a9e948b3b157293\" class=\"embedly-card\" data-card-width=\"100%\" data-card-controls=\"0\"\u003EEmbedded content: https:\u002F\u002Fgist.github.com\u002Fostermanj\u002F1fca89adfbd045bb9a9e948b3b157293\u003C\u002Fa\u003E\u003C\u002Fp\u003E\n\u003Cp\u003EPretty great! Now displaying or hiding the description depends on the size of the container rather than the viewport. That means the component can be used elsewhere without having to redefine at what screen sizes the description should appear. Code it once and use it everywhere.\u003C\u002Fp\u003E\n\u003Ch2\u003EUse them now?\u003C\u002Fh2\u003E\n\u003Cp\u003EI’ll be using container queries from here on out in personal projects soon, I hope, in work projects for production.\u003C\u002Fp\u003E\n\u003Cp\u003EContainer queries are landing in browsers and, at the time I’m writing this, have about 75% browser support globally. Firefox, notably, does not yet support them in the stable release but does in the nightly release. Coverage should be good enough now or very soon to use them in a progressive-enhancement sort of way, when you can accept that some browsers won’t abide.\u003C\u002Fp\u003E\n\u003Cp\u003EThere is a \u003Ca href=\"https:\u002F\u002Fgithub.com\u002FGoogleChromeLabs\u002Fcontainer-query-polyfill\"\u003EJavaScript polyfill\u003C\u002Fa\u003E available that simply works. Please read its docs before using.\u003C\u002Fp\u003E\n",snippet:"Container queries are coming, and they will make reusing responsive components in different contexts much easier.",tags:[{metadata:{tags:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"cNdrt61TxmpGdCVqJVNYj",type:h,createdAt:p,updatedAt:p,environment:{sys:{id:d,type:a,linkType:e}},revision:g,contentType:{sys:{type:a,linkType:i,id:q}},locale:f},fields:{tag:"CSS"}},{metadata:{tags:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"4THQ9OOeBdfmo5fzHu6mIr",type:h,createdAt:r,updatedAt:r,environment:{sys:{id:d,type:a,linkType:e}},revision:g,contentType:{sys:{type:a,linkType:i,id:q}},locale:f},fields:{tag:"design"}}],heroImage:{metadata:{tags:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"fMsWEAYYlWL7oGyXprIjF",type:m,createdAt:s,updatedAt:s,environment:{sys:{id:d,type:a,linkType:e}},revision:g,locale:f},fields:{title:"Containers",description:"A large stack of shipping containers on a ship or at harbor.",file:{url:"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002FfMsWEAYYlWL7oGyXprIjF\u002Fe98ffee9cd68da2575ca39be60aae7cc\u002F15405674883_2c892ea4e2_b.jpg",details:{size:273916,image:{width:1024,height:682}},fileName:"15405674883_2c892ea4e2_b.jpg",contentType:o}}},slug:"css-container-queries-are-here",contentType:"blogPost"},uses:{dependencies:j,params:["slug"],parent:j,url:j}}]}}("Link","Space","3qr5d6sj491p","master","Environment","en-US",1,"Entry","ContentType",void 0,"data",null,"Asset","2022-06-25T01:06:08.949Z","image\u002Fjpeg","2023-01-12T17:37:01.886Z","tag","2023-01-12T17:37:15.869Z","2023-01-13T01:48:42.934Z"))