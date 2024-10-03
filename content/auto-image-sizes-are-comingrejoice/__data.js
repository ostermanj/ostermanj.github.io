window.__sveltekit_data = (function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){return {type:i,nodes:[j,j,{type:i,data:{authors:[{metadata:{tags:[],concepts:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"6rhv4yMoAF3cN8jyYqZSWu",type:k,createdAt:"2022-06-17T16:18:02.488Z",updatedAt:"2022-06-25T01:07:29.101Z",environment:{sys:{id:d,type:a,linkType:e}},revision:2,contentType:{sys:{type:a,linkType:l,id:"author"}},locale:f},fields:{fullName:"John Osterman",website:"https:\u002F\u002Fosterman.io\u002F",twitterAccount:"https:\u002F\u002Ftwitter.com\u002FJohnAOsterman",linkedinAccount:"https:\u002F\u002Fwww.linkedin.com\u002Fin\u002Fjohn-osterman-32714012\u002F",photo:{metadata:{tags:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"6E2Gh0TS2hrqafgOY1NlHr",type:m,createdAt:n,updatedAt:n,environment:{sys:{id:d,type:a,linkType:e}},revision:g,locale:f},fields:{title:"john osterman photo",description:"",file:{url:"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F6E2Gh0TS2hrqafgOY1NlHr\u002F68804563485dfdb3f0cb50fb38e3e3fa\u002Fosterman-photo.jpg",details:{size:256400,image:{width:750,height:847}},fileName:"osterman-photo.jpg",contentType:"image\u002Fjpeg"}}}}}],title:"Auto image sizes are coming—rejoice!",datePublished:"2023-06-26",body:"\u003Cp\u003E\u003Cspan class=\"first-letter\"\u003ET\u003C\u002Fspan\u003Ehe \u003Ca href=\"https:\u002F\u002Fwhatwg.org\u002F\"\u003EWHATWG\u003C\u002Fa\u003E (Web Hypertext Application Technology Working Group) has updated the HTML standard to include \u003Ccode\u003Esizes=&quot;auto&quot;\u003C\u002Fcode\u003E to responsive \u003Ca href=\"https:\u002F\u002Fhtml.spec.whatwg.org\u002Fmultipage\u002Fimages.html#attributes-common-to-source-and-img-elements\"\u003Eimages\u003C\u002Fa\u003E. This does not mean any browser is necessarily working on it yet, let alone on the cusp of shipping it, but I think and hope that it will become part of our everyday syntax. It will greatly simplify providing the right size native image for the target display size and resolution.\u003C\u002Fp\u003E\n\u003Ch2\u003EHow we do it now\u003C\u002Fh2\u003E\n\u003Cp\u003ETo give browsers the info they need to download the correctly sized image, we have to provide them with what size images are available and when to use each of them, based on viewport size. The first part, the what, is specified in the \u003Ccode\u003Esrcset\u003C\u002Fcode\u003E attribute of the image; the when is specified in the \u003Ccode\u003Esizes\u003C\u002Fcode\u003E attribute.\u003C\u002Fp\u003E\n\u003Cp\u003EHere’s an example:\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Ca href=\"https:\u002F\u002Fgist.github.com\u002Fostermanj\u002F5e7b56d6a62e60bc0d3d9ed5c9e00689\" class=\"embedly-card\" data-card-width=\"100%\" data-card-controls=\"0\"\u003EEmbedded content: https:\u002F\u002Fgist.github.com\u002Fostermanj\u002F5e7b56d6a62e60bc0d3d9ed5c9e00689\u003C\u002Fa\u003E\u003C\u002Fp\u003E\n\u003Cp\u003ESee \u003Ca href=\"https:\u002F\u002Fdeveloper.mozilla.org\u002Fen-US\u002Fdocs\u002FWeb\u002FAPI\u002FHTMLImageElement\u002Fsrcset\"\u003EMDM\u003C\u002Fa\u003E for a fuller description.\u003C\u002Fp\u003E\n\u003Cp\u003EThe \u003Ccode\u003Esizes\u003C\u002Fcode\u003E attribute tells the browser how big the display size of the image will be at different viewport widths.  You can specify absolute pixel sizes or relative viewport units, which is nice. But you have to do the calculations and tell the browser which image to download \u003Cem\u003Ebefore it’s calculated the page layout\u003C\u002Fem\u003E so that image will be ready to display when layout is ready.\u003C\u002Fp\u003E\n\u003Cp\u003EThis method is a major limitation if you are using reusable components that will render on the page at sizes that are unknown to you at development time. There’s no way to tell the browser which image to download based on container size because it is not knowable until layout is calculated.\u003C\u002Fp\u003E\n\u003Ch2\u003ELazy load to the rescue\u003C\u002Fh2\u003E\n\u003Cp\u003EWhen you use \u003Ccode\u003Eloading=&quot;lazy&quot;\u003C\u002Fcode\u003E—and you should be for many if not most of your images—the browser does know what the page layout and display size of the image is before it has to download the file. The browser has to calculate whether the image is in or nearing the viewport before lazily loading it. In this case, there ought to be no reason you have to tell the browser which images to download based on screen size—it already knows! That’s where \u003Ccode\u003Esizes=&quot;auto&quot;\u003C\u002Fcode\u003E comes in. It tells the browser to figure out by itself which image from the \u003Ccode\u003Esrcset\u003C\u002Fcode\u003E to use. As it does now, the browser will take the screen resolution into account when making that decision, so you’ll automatically get the sharpest image available for the given display size.\u003C\u002Fp\u003E\n\u003Ch2\u003ESo when can I use it?\u003C\u002Fh2\u003E\n\u003Cp\u003EDunno. It was just \u003Ca href=\"https:\u002F\u002Fgithub.com\u002Fwhatwg\u002Fhtml\u002Fpull\u002F8008\"\u003Emerged into the spec\u003C\u002Fa\u003E in early June 2023, and major browsers have expressed interest. I’m hoping for ASAP. I plan on using it as soon as I can.\u003C\u002Fp\u003E\n",snippet:"Auto sizes for lazy-loaded images will greatly simplify providing the right size native image for the target display size and resolution.",tags:[{metadata:{tags:[],concepts:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"7bxk7hUPon7KmLkEmjxXjD",type:k,createdAt:o,updatedAt:o,environment:{sys:{id:d,type:a,linkType:e}},revision:g,contentType:{sys:{type:a,linkType:l,id:"tag"}},locale:f},fields:{tag:"HTML"}}],heroImage:{metadata:{tags:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"ZqG9s8KKHA4g1WEj1z6ol",type:m,createdAt:p,updatedAt:p,environment:{sys:{id:d,type:a,linkType:e}},revision:g,locale:f},fields:{title:"Cat image",description:"A Dalle-2 composite of multiple images of the same gray cat",file:{url:"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002FZqG9s8KKHA4g1WEj1z6ol\u002Fec265b847d6892d29cc287259645980a\u002FDALL__E_2023-06-26_21.22.27_-_A_semi_abstract_illustration_of_a_multiple_photos_of_the_same_gray__cat_with_yellow_eyes__each.png",details:{size:2013060,image:{width:q,height:q}},fileName:"DALL·E 2023-06-26 21.22.27 - A semi abstract illustration of a multiple photos of the same gray  cat with yellow eyes, each a different size..png",contentType:"image\u002Fpng"}}},slug:"auto-image-sizes-are-coming-rejoice",contentType:"blogPost"},uses:{dependencies:h,params:["slug"],parent:h,url:h}}]}}("Link","Space","3qr5d6sj491p","master","Environment","en-US",1,void 0,"data",null,"Entry","ContentType","Asset","2022-06-25T01:06:08.949Z","2023-06-27T01:32:31.748Z","2023-06-27T01:33:22.191Z",1024))