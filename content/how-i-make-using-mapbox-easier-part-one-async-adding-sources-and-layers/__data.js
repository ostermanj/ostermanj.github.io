window.__sveltekit_data = (function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u){return {type:l,nodes:[m,m,{type:l,data:{authors:[{metadata:{tags:[],concepts:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"6rhv4yMoAF3cN8jyYqZSWu",type:h,createdAt:"2022-06-17T16:18:02.488Z",updatedAt:"2022-06-25T01:07:29.101Z",environment:{sys:{id:d,type:a,linkType:e}},publishedVersion:6,revision:i,contentType:{sys:{type:a,linkType:j,id:"author"}},locale:f},fields:{fullName:"John Osterman",website:"https:\u002F\u002Fosterman.io\u002F",twitterAccount:"https:\u002F\u002Ftwitter.com\u002FJohnAOsterman",linkedinAccount:"https:\u002F\u002Fwww.linkedin.com\u002Fin\u002Fjohn-osterman-32714012\u002F",photo:{metadata:{tags:[],concepts:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"6E2Gh0TS2hrqafgOY1NlHr",type:n,createdAt:o,updatedAt:o,environment:{sys:{id:d,type:a,linkType:e}},publishedVersion:p,revision:g,locale:f},fields:{title:"john osterman photo",description:q,file:{url:"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F6E2Gh0TS2hrqafgOY1NlHr\u002F68804563485dfdb3f0cb50fb38e3e3fa\u002Fosterman-photo.jpg",details:{size:256400,image:{width:750,height:847}},fileName:"osterman-photo.jpg",contentType:"image\u002Fjpeg"}}}}}],title:"How I make using Mapbox easier, part one: async adding sources and layers",datePublished:"2020-12-29",body:"\u003Cp\u003E\u003Cspan class=\"first-letter\"\u003EM\u003C\u002Fspan\u003Eapbox (specifically, for me, \u003Ca href=\"https:\u002F\u002Fdocs.mapbox.com\u002Fmapbox-gl-js\u002Fapi\u002F\"\u003EMapbox GL JS\u003C\u002Fa\u003E) is a great platform for visualizing geographic data. I like that their documentation is thorough (though not always easy to digest). I like that they seem to have invested a lot of effort into making it a useful dataviz tool, in addition to all its other uses: navigation, geocoding, augmented vision. I like that they’re headquartered here in DC. And I like that their pricing plans have a meaningful and useful free tier.\u003C\u002Fp\u003E\n\u003Cp\u003EAwesome.\u003C\u002Fp\u003E\n\u003Cp\u003EOver the three or four years I’ve been using it, though, I have come up against the same challenges. One is the difficulty of its expressions syntax for data-driven styling or interpolated values, which I have to look up every time. Another is accessing the full data behind map features that may not be fully rendered. Another—the topic of this post—is how to work with the async nature of adding sources and layers to a map.\u003C\u002Fp\u003E\n\u003Cpicture\u003E\n        \u003Csource srcset=\"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F3KfGz5kmTI4dkz0l98oHY3\u002F777fd2648aaab56363a79c818dc3d1c2\u002Fmapbox.png?fm=avif&w=1480&h=1045&q=30 2x, \u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F3KfGz5kmTI4dkz0l98oHY3\u002F777fd2648aaab56363a79c818dc3d1c2\u002Fmapbox.png?fm=avif&w=740&h=523&q=30 1x\" type=\"image\u002Favif\" media=\"(min-width:632px)\"\u003E\n                          \u003Csource srcset=\"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F3KfGz5kmTI4dkz0l98oHY3\u002F777fd2648aaab56363a79c818dc3d1c2\u002Fmapbox.png?fm=avif&w=800&h=565&q=30 2x, \u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F3KfGz5kmTI4dkz0l98oHY3\u002F777fd2648aaab56363a79c818dc3d1c2\u002Fmapbox.png?fm=avif&w=400&h=282&q=30 1x\" type=\"image\u002Favif\"\u003E\u003Csource srcset=\"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F3KfGz5kmTI4dkz0l98oHY3\u002F777fd2648aaab56363a79c818dc3d1c2\u002Fmapbox.png?fm=webp&w=1480&h=1045&q=30 2x, \u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F3KfGz5kmTI4dkz0l98oHY3\u002F777fd2648aaab56363a79c818dc3d1c2\u002Fmapbox.png?fm=webp&w=740&h=523&q=30 1x\" type=\"image\u002Fwebp\" media=\"(min-width:632px)\"\u003E\n                          \u003Csource srcset=\"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F3KfGz5kmTI4dkz0l98oHY3\u002F777fd2648aaab56363a79c818dc3d1c2\u002Fmapbox.png?fm=webp&w=800&h=565&q=30 2x, \u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F3KfGz5kmTI4dkz0l98oHY3\u002F777fd2648aaab56363a79c818dc3d1c2\u002Fmapbox.png?fm=webp&w=400&h=282&q=30 1x\" type=\"image\u002Fwebp\"\u003E\n        \u003Cimg load=\"lazy\" class=\"full\" src=\"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F3KfGz5kmTI4dkz0l98oHY3\u002F777fd2648aaab56363a79c818dc3d1c2\u002Fmapbox.png\" width=\"1014px\" height=\"716px\" alt=\"\" \u002F\u003E\n    \u003C\u002Fpicture\u003E\n\u003Cp\u003EAdding sources and layers to a Mapbox map is pretty straightforward. The source is the data, and the layer is a visualization of the data. You can have multiple layers based on the same data. To \u003Ca href=\"https:\u002F\u002Fdocs.mapbox.com\u002Fmapbox-gl-js\u002Fapi\u002Fsources\u002F\"\u003Eadd a source\u003C\u002Fa\u003E, you use the \u003Ccode\u003EaddSource()\u003C\u002Fcode\u003E method of the Map instance. It takes an \u003Ccode\u003Eid\u003C\u002Fcode\u003E string and a config object as parameters. The underlying data can be geoJSON, or a vector source already uploaded to Mapbox, or others like raster images or video. To \u003Ca href=\"https:\u002F\u002Fdocs.mapbox.com\u002Fmapbox-gl-js\u002Fapi\u002Fmap\u002F#map#addlayer\"\u003Eadd a layer\u003C\u002Fa\u003E, you use the \u003Ccode\u003EaddLayer()\u003C\u002Fcode\u003E method, which takes a config object and, optionally, the name of another layer to insert the new layer before.\u003C\u002Fp\u003E\n\u003Cp\u003EThe trouble is your code may quite easily call the \u003Ccode\u003EaddLayer()\u003C\u002Fcode\u003E method\nbefore \u003Ccode\u003EaddSource()\u003C\u002Fcode\u003E really takes effect. Both methods are quietly asynchronous, handled by Mapbox outside the written sequence of your code. Mapbox could, perhaps should, make those methods explicitly async or, in other words, make them Promises that resolve only after they have taken full effect. In fact, in this \u003Ca href=\"https:\u002F\u002Fgithub.com\u002Fmapbox\u002Fmapbox-gl-js\u002Fissues\u002F10192\"\u003EGithub issue\u003C\u002Fa\u003E, it looks like that may be in the works.\u003C\u002Fp\u003E\n\u003Cp\u003EIn the meantime, it simply takes time for \u003Ccode\u003EaddSource()\u003C\u002Fcode\u003E and \u003Ccode\u003EaddLayer()\u003C\u002Fcode\u003E to take effect, which means you have to ensure the map layers are ready before you try to do anything with them. My solution has been to wrap the native methods in my own Promises that test whether the layers are rendered before resolving. This way, I can add a source, add some layers, and then chain my next actions via \u003Ccode\u003Ethen()\u003C\u002Fcode\u003E.\u003C\u002Fp\u003E\n\u003Cp\u003EThat solution is available as a small npm package, \u003Ca href=\"https:\u002F\u002Fwww.npmjs.com\u002Fpackage\u002Fmapbox-helper\"\u003Emapbox-helper\u003C\u002Fa\u003E. Give it a try. More info about how it works and how to use it is available there. The short version is this: the native \u003Ccode\u003EaddSource()\u003C\u002Fcode\u003E and \u003Ccode\u003EaddLayer()\u003C\u002Fcode\u003E methods are combined into one, \u003Ccode\u003EaddSourceAndLayers()\u003C\u002Fcode\u003E, in which you specify the source you want to add and one or more layers that are based on it. Internally, adding the layers only occurs after the source is ready. The method returns a Promise to your code that resolves only after all layers have been rendered or, if a layer’s visibility property is set to ‘none’, is ready to be rendered.\u003C\u002Fp\u003E\n\u003Cp\u003EFor example:\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Ca href=\"https:\u002F\u002Fgist.github.com\u002Fostermanj\u002Fc8302e49e9b83b83a05bd2e964d92fba\" class=\"embedly-card\" data-card-width=\"100%\" data-card-controls=\"0\"\u003EEmbedded content: https:\u002F\u002Fgist.github.com\u002Fostermanj\u002Fc8302e49e9b83b83a05bd2e964d92fba\u003C\u002Fa\u003E\u003C\u002Fp\u003E\n\u003Cp\u003EThanks for reading. And, by the way, if you haven’t checked out Mapbox’s \u003Ca href=\"https:\u002F\u002Fwww.mapbox.com\u002Fblog\u002Fmapbox-gl-js-v2-3d-maps-camera-api-sky-api-launch\"\u003Eversion 2 release yet\u003C\u002Fa\u003E, you should. It has really great 3D rendering of elevation data and super hi-res satellite imagery, among other performance improvements.\u003C\u002Fp\u003E\n",snippet:"Use a small npm package to work with the async nature of adding sources and layers to a Mapbox map.",tags:[{metadata:{tags:[],concepts:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"5tPE4sus2igTIK2zIdqyBz",type:h,createdAt:r,updatedAt:r,environment:{sys:{id:d,type:a,linkType:e}},publishedVersion:i,revision:g,contentType:{sys:{type:a,linkType:j,id:s}},locale:f},fields:{tag:"mapbox"}},{metadata:{tags:[],concepts:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"3AIjGHsEBIU2L5LSAhDYZG",type:h,createdAt:t,updatedAt:t,environment:{sys:{id:d,type:a,linkType:e}},publishedVersion:i,revision:g,contentType:{sys:{type:a,linkType:j,id:s}},locale:f},fields:{tag:"dataviz"}}],heroImage:{metadata:{tags:[],concepts:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"3KfGz5kmTI4dkz0l98oHY3",type:n,createdAt:u,updatedAt:u,environment:{sys:{id:d,type:a,linkType:e}},publishedVersion:p,revision:g,locale:f},fields:{title:"mapbox async layers",description:q,file:{url:"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F3KfGz5kmTI4dkz0l98oHY3\u002F777fd2648aaab56363a79c818dc3d1c2\u002Fmapbox.png",details:{size:774983,image:{width:1014,height:716}},fileName:"mapbox.png",contentType:"image\u002Fpng"}}},contentType:"blogPost"},uses:{dependencies:k,params:["slug"],parent:k,url:k}}]}}("Link","Space","3qr5d6sj491p","master","Environment","en-US",1,"Entry",2,"ContentType",void 0,"data",null,"Asset","2022-06-25T01:06:08.949Z",5,"","2022-08-14T20:57:53.919Z","tag","2022-07-25T18:21:18.957Z","2022-08-14T21:09:00.907Z"))