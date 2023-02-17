window.__sveltekit_data = (function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B){return {type:q,nodes:[r,r,{type:q,data:{page:"homepage",fields:{overview:"Web development and data visualization for mission-driven orgs. HTML, CSS, JavaScript; Svelte, Vue.js; D3.js, Mapbox; NodeJS, AWS, Azure, Google.",body:"\u003Cp\u003E👋🏻 Hello. I am a full-stack developer specializing in performance, accessibility, and data visualization. I work full-time for the \u003Ca href=\"https:\u002F\u002Fwww.ushmm.org\"\u003EUS Holocaust Memorial Museum\u003C\u002Fa\u003E but am occasionally available for side projects.\u003C\u002Fp\u003E\n",featuredBlogPosts:[{metadata:{tags:[]},sys:{space:{sys:{type:a,linkType:c,id:d}},id:"27n0QDqqMFwDxstDwS8qJx",type:b,createdAt:"2023-01-13T01:49:32.802Z",updatedAt:"2023-02-17T00:40:19.472Z",environment:{sys:{id:e,type:a,linkType:f}},revision:12,contentType:{sys:{type:a,linkType:h,id:m}},locale:g},fields:{authors:[{sys:{type:a,linkType:b,id:n}}],title:"CSS container queries are here!",datePublished:"2023-01-12",dateUpdated:"2023-02-16",body:"\u003Caside class=\"update\"\u003E\n  Support for container queries landed in Firefox on February 13, 2023.\n\u003C\u002Faside\u003E\n\nIt's a good time to be a web developer. The excesses of client-side mania (mea culpa) are giving way to a rediscovery of server-side rendering (which of course never went anywhere). Build-and-deploy services like Vercel, Amplify, Azure Static Web Apps, and a host of others make it easy for small teams or one lone freelancer to set up fully featured websites with edge functions, caching, APIs, and smart image delivery. And with recent advances, working on the [front of the front end](https:\u002F\u002Fbradfrost.com\u002Fblog\u002Fpost\u002Ffront-of-the-front-end-and-back-of-the-front-end-web-development\u002F) is full of new possibilities and productivity gains.\n\nCSS, it turns out, [really is awesome](https:\u002F\u002Fduckduckgo.com\u002F?t=ffab&q=css+is+awesome&iax=images&ia=images).\n\n## Container queries, finally!\n\nOne of the features I and others have been most eagerly awaiting is container queries. They will make reusing responsive components in different contexts much easier. Grid and flexbox layouts have already lessened the need to use media queries to make layouts responsive to screen size. They are [*intrinsically* responsive](https:\u002F\u002Ftalks.jensimmons.com\u002F15TjNW), wrapping rows and columns based on container size without the need to instruct browsers at exactly what screen width to make the change.\n\nThat's great, but they haven't entirely eliminated my use of media queries. There is still a need to employ them to, for instance, hide an element within a grid at certain screen sizes. Here's a recent example from my work rebuilding the timeline-of-events pages for the [Holocaust Encyclopedia](https:\u002F\u002Fencyclopedia.ushmm.org\u002Fcontent\u002Fen\u002Ftimeline\u002Fholocaust).\n\n\u003Cdiv class=\"fx fx-wrap ai-e\"\u003E\n\u003Cfigure class=\"half\"\u003E\n\n![Timeline events without description shown](\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F5c3gZQDg7YwjqWwPNRZybi\u002F34d67b517736ba14d35a77aa1e242f43\u002FScreenshot_2023-01-11_at_8.56.40_AM.png)\n\n \u003Cfigcaption\u003EOn small screens less than 500px wide, no description is shown.\u003C\u002Ffigcaption\u003E\n    \u003C\u002Ffigure\u003E\n\n\u003Cfigure class=\"half\"\u003E\n\n![Timeline event with description shown](\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F2zrWLBAT2ahMA0tLtIXEsu\u002F17eab9d573cec6fb7b263f5b092dab57\u002FScreenshot_2023-01-11_at_8.55.12_AM.png)\n\n\u003Cfigcaption\u003EOn screens at least 500px wide, a media query ensures that the description is shown.\u003C\u002Ffigcaption\u003E\n\u003C\u002Ffigure\u003E\n\u003C\u002Fdiv\u003E\n\nThis is the HTML for one of the content cards, each marked up as an `\u003Carticle\u003E`:\n\n\u003Ca href=\"https:\u002F\u002Fgist.github.com\u002Fostermanj\u002Fb7b7b55bfb8483e4599dbf82f8690632\" class=\"embedly-card\" data-card-width=\"100%\" data-card-controls=\"0\"\u003EEmbedded content: https:\u002F\u002Fgist.github.com\u002Fostermanj\u002Fb7b7b55bfb8483e4599dbf82f8690632\u003C\u002Fa\u003E\n\nThe CSS makes each event a flexbox with two flex-item children: the container for the image and the container for the text. The relative size of the two children is handled intrinsically using the `flex-grow` css property—no need for media queries there.\tBut we wanted to show the description of the event only on screens larger than 500px wide, and that required a media query:\n\n\u003Ca href=\"https:\u002F\u002Fgist.github.com\u002Fostermanj\u002F48a62a2cceebab82992e8fb8ce5b3703\" class=\"embedly-card\" data-card-width=\"100%\" data-card-controls=\"0\"\u003EEmbedded content: https:\u002F\u002Fgist.github.com\u002Fostermanj\u002F48a62a2cceebab82992e8fb8ce5b3703\u003C\u002Fa\u003E\n\nWhat that means, though, is that the list of events isn't 100% reusable in other contexts. Say I needed to put the list of events in a sidebar that was 320px wide? If the viewport were at least 500px wide, the event description would show even though the component would be much narrower than the threshold. The logic should be based on the size of the component, not the size of the screen. That's what container queries make possible.\n\n## Simple syntax\n\nThe syntax is pretty simple and builds what we already know from media queries. See the [MDN article](https:\u002F\u002Fdeveloper.mozilla.org\u002Fen-US\u002Fdocs\u002FWeb\u002FCSS\u002FCSS_Container_Queries) for a full description. \n\nChanging my example to use container queries would only require changing to CSS to declare a containment context on the `article` element, giving it a `container-type` and `container-name` using the `container` shorthand syntax:\n\n\u003Ca href=\"https:\u002F\u002Fgist.github.com\u002Fostermanj\u002Fd948427303b301a896bf153b30c934f5\" class=\"embedly-card\" data-card-width=\"100%\" data-card-controls=\"0\"\u003EEmbedded content: https:\u002F\u002Fgist.github.com\u002Fostermanj\u002Fd948427303b301a896bf153b30c934f5\u003C\u002Fa\u003E\n\nAnd then modify the media query from above to be a container query instead:\n\n\u003Ca href=\"https:\u002F\u002Fgist.github.com\u002Fostermanj\u002F1fca89adfbd045bb9a9e948b3b157293\" class=\"embedly-card\" data-card-width=\"100%\" data-card-controls=\"0\"\u003EEmbedded content: https:\u002F\u002Fgist.github.com\u002Fostermanj\u002F1fca89adfbd045bb9a9e948b3b157293\u003C\u002Fa\u003E\n\nPretty great! Now displaying or hiding the description depends on the size of the container rather than the viewport. That means the component can be used elsewhere without having to redefine at what screen sizes the description should appear. Code it once and use it everywhere.\n\n## Use them now?\n\nI'll be using container queries from here on out in personal projects soon, I hope, in work projects for production.\n\nContainer queries are landing in browsers and, at the time I'm writing this, have about 75% browser support globally. Firefox, notably, does not yet support them in the stable release but does in the nightly release. Coverage should be good enough now or very soon to use them in a progressive-enhancement sort of way, when you can accept that some browsers won't abide.\n\nThere is a [JavaScript polyfill](https:\u002F\u002Fgithub.com\u002FGoogleChromeLabs\u002Fcontainer-query-polyfill) available that simply works. Please read its docs before using.\n",snippet:"Container queries are coming, and they will make reusing responsive components in different contexts much easier.",tags:[{sys:{type:a,linkType:b,id:"cNdrt61TxmpGdCVqJVNYj"}},{sys:{type:a,linkType:b,id:"4THQ9OOeBdfmo5fzHu6mIr"}}],heroImage:{metadata:{tags:[]},sys:{space:{sys:{type:a,linkType:c,id:d}},id:"fMsWEAYYlWL7oGyXprIjF",type:j,createdAt:s,updatedAt:s,environment:{sys:{id:e,type:a,linkType:f}},revision:i,locale:g},fields:{title:"Containers",description:"A large stack of shipping containers on a ship or at harbor.",file:{url:"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002FfMsWEAYYlWL7oGyXprIjF\u002Fe98ffee9cd68da2575ca39be60aae7cc\u002F15405674883_2c892ea4e2_b.jpg",details:{size:273916,image:{width:1024,height:682}},fileName:"15405674883_2c892ea4e2_b.jpg",contentType:"image\u002Fjpeg"}}},slug:"css-container-queries-are-here"}},{metadata:{tags:[]},sys:{space:{sys:{type:a,linkType:c,id:d}},id:"33IWn9KUqHxgH8WIKhKCk1",type:b,createdAt:"2022-08-31T00:26:39.760Z",updatedAt:"2022-08-31T00:56:05.410Z",environment:{sys:{id:e,type:a,linkType:f}},revision:3,contentType:{sys:{type:a,linkType:h,id:m}},locale:g},fields:{authors:[{sys:{type:a,linkType:b,id:n}}],title:"How to use environment variables in SvelteKit (process.env)",subtitle:"It's easier than it used to be.",datePublished:"2022-08-30",body:"SvelteKit has recently changed how it brings environment variables into your code, whether from a `.env` file or from Node's `process.env`. The new method is better. It allows you to bring private variables (secrets such as API keys) into server-side code without workarounds. Public variables can be imported into client-side code.\n\n\u003Caside class=\"notice\"\u003EAll things SvelteKit are moving very fast and breaking changes are introduced frequently as it moves toward a stable version 1.0 release. Be sure to check out the date this post was published—it may get old fast.\u003C\u002Faside\u003E\n\n## How\n\nFour SvelteKit modules are at play to make this happen:\n\n1. [`$env\u002Fdynamic\u002Fpublic`][2]\n2. [`$env\u002Fdynamic\u002Fprivate`][3]\n3. [`$env\u002Fstatic\u002Fpublic`][4]\n4. [`$env\u002Fstatic\u002Fprivate`][5]\n\nThe `dynamic` modules are for variables accessed at runtime—variables not necessarily known at build time. The `static` modules for variables that can be injected as strings at build time. The `public` modules expose variables that are prefixed by \"PUBLIC_\" or another prefix set in your config file. The `private` modules expose variables not prefixed; trying to import them into client-side code will throw an error. That's to keep you from accidentally exposing secrets to the front end. See the docs for more information.\n\nIn your DEV environment you can supply your public and private variables in a `.env` file. That file shouldn't be committed to source control, especially if it has private variables. In a STAGE or PROD environment you'll want to supply your environment variables through `process.env` by setting variables or secrets directly with your deployment service such as Vercel, Netlify, AWS Amplify, Azure Static Web Apps, or whatever yours is. This site, for instance, is hosted by GitHub Pages; its secrets are saved as repository secrets through the GitHub UI.\n\nThe docs show how to import the variables. For dynamic variables, you import `env` as a named export of the `$env\u002Fdynamic\u002F*` module: `import { dev } from '$env\u002Fdynamic\u002Fpublic';`, for instance. Your variables are properties of the `env` object.\n\nStatic variables are imported directly as named exports from the `$env\u002Fstatic\u002F*` module. This site, for instance, fetches content from [Contentful](https:\u002F\u002Fwww.contentful.com\u002F) during its build process. That requires API keys and other secrets and looks like this:\n\n\u003Ca href=\"https:\u002F\u002Fgist.github.com\u002Fostermanj\u002Faaeb966d4de44eb2a0d9e96c27987ce5\" class=\"embedly-card\" data-card-width=\"100%\" data-card-controls=\"0\"\u003EEmbedded content: https:\u002F\u002Fgist.github.com\u002Fostermanj\u002Faaeb966d4de44eb2a0d9e96c27987ce5\u003C\u002Fa\u003E\n\n## The (relatively) old way\n\nThe method outlined above came into being in July 2022, according to [SvelteKit's changelog](https:\u002F\u002Fgithub.com\u002Fsveltejs\u002Fkit\u002Fblob\u002Fmaster\u002Fpackages\u002Fkit\u002FCHANGELOG.md#100-next395). Before that, as best I understand, in  local development SvelteKit was exposing variables loaded by Vite from `.env`, but only variables prefixed with \"VITE_\". There was no straightforward way to import secrets into server-side code. One solution was to install [env-cmd](https:\u002F\u002Fwww.npmjs.com\u002Fpackage\u002Fenv-cmd) and add `env-cmd` to the dev script in `package.json`. That would expose the variables in `.env` to your source code but would make a detour around SvelteKit's failsafe to prevent exposing secrets to the client.\n\n[1]: https:\u002F\u002Fkit.svelte.dev\u002F\n[2]: https:\u002F\u002Fkit.svelte.dev\u002Fdocs\u002Fmodules#$env-dynamic-public\n[3]: https:\u002F\u002Fkit.svelte.dev\u002Fdocs\u002Fmodules#$env-dynamic-private\n[4]: https:\u002F\u002Fkit.svelte.dev\u002Fdocs\u002Fmodules#$env-static-public\n[5]: https:\u002F\u002Fkit.svelte.dev\u002Fdocs\u002Fmodules#$env-static-private",snippet:"SvelteKit has a new way to bring environment variables into your code.",tags:[{sys:{type:a,linkType:b,id:"3Zs1xPdBxUe7FNXmkXO59N"}},{sys:{type:a,linkType:b,id:"5UDGtnFPGejPUdY4ZV8tSH"}}],heroImage:{metadata:{tags:[]},sys:{space:{sys:{type:a,linkType:c,id:d}},id:"qU1uNTaV2rrFJaT8Mha03",type:j,createdAt:t,updatedAt:t,environment:{sys:{id:e,type:a,linkType:f}},revision:i,locale:g},fields:{title:"SvelteKit logo and text",description:o,file:{url:"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002FqU1uNTaV2rrFJaT8Mha03\u002F28f103dc12c4c15ec79f0e076a992997\u002Fp3nn57r52krvpdieblta.png",details:{size:35878,image:{width:1920,height:1080}},fileName:"p3nn57r52krvpdieblta.png",contentType:p}}},slug:"how-to-use-environment-variables-in-sveltekit-process-env"}},{metadata:{tags:[]},sys:{space:{sys:{type:a,linkType:c,id:d}},id:"5nT7UZh2gDjGmdQ8D9Pa7K",type:b,createdAt:u,updatedAt:u,environment:{sys:{id:e,type:a,linkType:f}},revision:i,contentType:{sys:{type:a,linkType:h,id:"project"}},locale:g},fields:{title:"Chart building web app",workplace:{sys:{type:a,linkType:b,id:v}},datePublished:"2021-03-07",body:"\nThis is a web app for people with no coding experience to build interactive charts for the web. The charts are built with Highcharts; the graphical user interface transforms settings into the JSON configuration Highcharts needs to render them on the web.\n\nBut there's more. One persistent challenge in publishing for the web—a theme central to my work for more than ten years now—is that orgs are also publishing for print (or at least for PDF). That means that each asset, like a chart, actually needs several: one for print and potentially multiple for the web, for different screen sizes and resolutions. That usually means a lot of time sunk keeping versions in sync with one another.\n\n![user interface of the chart building tool with a menu down the left side and thumbnail images of charts](\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F4MW9BiXIVLUSVHXKDPkaSv\u002Fde592f65984f15cec8d37b5a2372afd8\u002Fchartbuilder.png)\n\nThis tool solves that problem for charts. The charts are digital-first, optimized for all screen sizes by virtue of Highcharts' responsiveness, but they can be exported as SVGs for use in print at whatever size the designers need. The print options are separated from the web version, but they all share the same source. Update one and you update the other. That translates to huge time savings.\n\nThere are off-the-shelf solutions not too different from this but none cross the print-web divide like this.\n\n**What else does it do?**\n\n* Users can log in through Google and save their work. Others can take that work and edit or publish it.\n* Web charts can easily be static images or interactive Highcharts.\n* Branding and other specs are enforced effortlessly.\n* Advanced users can enter custom JSON configurations to extend and override standard settings.\n\nI built this for Pew and we're trying to roll it out. (Changing processes is hard.) Under the hood, though, this tool could be used by anyone by specifying brand colors, fonts, and other specs.",snippet:"There are off-the-shelf charting solutions not too different from this but none cross the print-web divide as well.",tags:[{sys:{type:a,linkType:b,id:w}},{sys:{type:a,linkType:b,id:"5vgnIFPLCNtziUkAvnHwVx"}}],heroImage:{metadata:{tags:[]},sys:{space:{sys:{type:a,linkType:c,id:d}},id:"4MW9BiXIVLUSVHXKDPkaSv",type:j,createdAt:x,updatedAt:x,environment:{sys:{id:e,type:a,linkType:f}},revision:i,locale:g},fields:{title:"user interface of the chart building tool with a menu down the left side and thumbnail images of charts",description:o,file:{url:"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F4MW9BiXIVLUSVHXKDPkaSv\u002Fde592f65984f15cec8d37b5a2372afd8\u002Fchartbuilder.png",details:{size:102564,image:{width:1017,height:715}},fileName:"chartbuilder.png",contentType:p}}}}},{metadata:{tags:[]},sys:{space:{sys:{type:a,linkType:c,id:d}},id:"6V9Xr8BggyQQpVgahElTkA",type:b,createdAt:"2022-08-14T21:12:52.768Z",updatedAt:"2022-08-16T15:05:33.526Z",environment:{sys:{id:e,type:a,linkType:f}},revision:10,contentType:{sys:{type:a,linkType:h,id:m}},locale:g},fields:{authors:[{sys:{type:a,linkType:b,id:n}}],title:"How I make using Mapbox easier, part one: async adding sources and layers",datePublished:"2020-12-29",body:"\nMapbox (specifically, for me, [Mapbox GL JS][1]) is a great platform for visualizing geographic data. I like that their documentation is thorough (though not always easy to digest). I like that they seem to have invested a lot of effort into making it a useful dataviz tool, in addition to all its other uses: navigation, geocoding, augmented vision. I like that they're headquartered here in DC. And I like that their pricing plans have a meaningful and useful free tier.\n\nAwesome.\n\nOver the three or four years I've been using it, though, I have come up against the same challenges. One is the difficulty of its expressions syntax for data-driven styling or interpolated values, which I have to look up every time. Another is accessing the full data behind map features that may not be fully rendered. Another—the topic of this post—is how to work with the async nature of adding sources and layers to a map.\n\n![a mapbox view of San Diego with red, orange, and purple extruded recangles representing buildings on a dark background][2]\n\nAdding sources and layers to a Mapbox map is pretty straightforward. The source is the data, and the layer is a visualization of the data. You can have multiple layers based on the same data. To [add a source][3], you use the `addSource()` method of the Map instance. It takes an `id` string and a config object as parameters. The underlying data can be geoJSON, or a vector source already uploaded to Mapbox, or others like raster images or video. To [add a layer][4], you use the `addLayer()` method, which takes a config object and, optionally, the name of another layer to insert the new layer before.\n\nThe trouble is your code may quite easily call the `addLayer()` method\nbefore `addSource()` really takes effect. Both methods are quietly asynchronous, handled by Mapbox outside the written sequence of your code. Mapbox could, perhaps should, make those methods explicitly async or, in other words, make them Promises that resolve only after they have taken full effect. In fact, in this [Github issue][5], it looks like that may be in the works.\n\nIn the meantime, it simply takes time for `addSource()` and `addLayer()` to take effect, which means you have to ensure the map layers are ready before you try to do anything with them. My solution has been to wrap the native methods in my own Promises that test whether the layers are rendered before resolving. This way, I can add a source, add some layers, and then chain my next actions via `then()`.\n\nThat solution is available as a small npm package, [mapbox-helper][6]. Give it a try. More info about how it works and how to use it is available there. The short version is this: the native `addSource()` and `addLayer()` methods are combined into one, `addSourceAndLayers()`, in which you specify the source you want to add and one or more layers that are based on it. Internally, adding the layers only occurs after the source is ready. The method returns a Promise to your code that resolves only after all layers have been rendered or, if a layer's visibility property is set to 'none', is ready to be rendered.\n\nFor example:\n\n\u003Ca href=\"https:\u002F\u002Fgist.github.com\u002Fostermanj\u002Fc8302e49e9b83b83a05bd2e964d92fba\" class=\"embedly-card\" data-card-width=\"100%\" data-card-controls=\"0\"\u003EEmbedded content: https:\u002F\u002Fgist.github.com\u002Fostermanj\u002Fc8302e49e9b83b83a05bd2e964d92fba\u003C\u002Fa\u003E\n\nThanks for reading. And, by the way, if you haven't checked out Mapbox's [version 2 release yet][7], you should. It has really great 3D rendering of elevation data and super hi-res satellite imagery, among other performance improvements.\n\n[1]: https:\u002F\u002Fdocs.mapbox.com\u002Fmapbox-gl-js\u002Fapi\u002F\n[2]: \u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F3KfGz5kmTI4dkz0l98oHY3\u002F777fd2648aaab56363a79c818dc3d1c2\u002Fmapbox.png\n[3]: https:\u002F\u002Fdocs.mapbox.com\u002Fmapbox-gl-js\u002Fapi\u002Fsources\u002F\n[4]: https:\u002F\u002Fdocs.mapbox.com\u002Fmapbox-gl-js\u002Fapi\u002Fmap\u002F#map#addlayer\n[5]: https:\u002F\u002Fgithub.com\u002Fmapbox\u002Fmapbox-gl-js\u002Fissues\u002F10192\n[6]: https:\u002F\u002Fwww.npmjs.com\u002Fpackage\u002Fmapbox-helper\n[7]: https:\u002F\u002Fwww.mapbox.com\u002Fblog\u002Fmapbox-gl-js-v2-3d-maps-camera-api-sky-api-launch",snippet:"Use a small npm package to work with the async nature of adding sources and layers to a Mapbox map.",tags:[{sys:{type:a,linkType:b,id:"5tPE4sus2igTIK2zIdqyBz"}},{sys:{type:a,linkType:b,id:w}}],heroImage:{metadata:{tags:[]},sys:{space:{sys:{type:a,linkType:c,id:d}},id:"3KfGz5kmTI4dkz0l98oHY3",type:j,createdAt:y,updatedAt:y,environment:{sys:{id:e,type:a,linkType:f}},revision:i,locale:g},fields:{title:"mapbox async layers",description:o,file:{url:"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F3KfGz5kmTI4dkz0l98oHY3\u002F777fd2648aaab56363a79c818dc3d1c2\u002Fmapbox.png",details:{size:774983,image:{width:1014,height:716}},fileName:"mapbox.png",contentType:p}}}}}],featuredWorkExperience:[{metadata:{tags:[]},sys:{space:{sys:{type:a,linkType:c,id:d}},id:"i4wC2707crrr3J7VA6sjf",type:b,createdAt:z,updatedAt:z,environment:{sys:{id:e,type:a,linkType:f}},revision:i,contentType:{sys:{type:a,linkType:h,id:k}},locale:g},fields:{title:"Front-End Developer",workPlace:{sys:{type:a,linkType:b,id:"5oOuYjZ2En7UsYZddeN4xq"}},startDate:"2022-05-31",workPlaceName:"US Holocaust Memorial Museum",url:"https:\u002F\u002Fwww.ushmm.org"}},{metadata:{tags:[]},sys:{space:{sys:{type:a,linkType:c,id:d}},id:"5ipJqnKVDNDSxKnq3Q2Onc",type:b,createdAt:"2022-08-11T20:25:50.709Z",updatedAt:"2022-08-12T12:24:21.930Z",environment:{sys:{id:e,type:a,linkType:f}},revision:2,contentType:{sys:{type:a,linkType:h,id:k}},locale:g},fields:{title:"Principal Associate (Web Developer)",workPlace:{sys:{type:a,linkType:b,id:v}},startDate:"2018-08-01",endDate:"2022-05-20",workPlaceName:"The Pew Charitable Trusts",url:"https:\u002F\u002Fwww.pewtrusts.org"}},{metadata:{tags:[]},sys:{space:{sys:{type:a,linkType:c,id:d}},id:"6xrmlRLBZ2518GEx0Wu3Aq",type:b,createdAt:A,updatedAt:A,environment:{sys:{id:e,type:a,linkType:f}},revision:i,contentType:{sys:{type:a,linkType:h,id:k}},locale:g},fields:{title:"Communications Specialist (part-time)",workPlace:{sys:{type:a,linkType:b,id:"2cuGeH3s2kAjIlVcvCwldo"}},startDate:"2017-12-01",endDate:"2018-08-17",workPlaceName:"Resources for the Future",url:"https:\u002F\u002Fwww.rff.org"}},{metadata:{tags:[]},sys:{space:{sys:{type:a,linkType:c,id:d}},id:"1dc27YRSkI9JDeXZFRdp6q",type:b,createdAt:B,updatedAt:B,environment:{sys:{id:e,type:a,linkType:f}},revision:i,contentType:{sys:{type:a,linkType:h,id:k}},locale:g},fields:{title:"Director of Digital Communications (and previous titles)",workPlace:{sys:{type:a,linkType:b,id:"3uOA1G8GrWndoQSTvgh7WN"}},startDate:"2008-04-01",endDate:"2016-04-15",workPlaceName:"Center for Global Development",url:"https:\u002F\u002Fwww.cgdev.org"}}]}},uses:{dependencies:l,params:l,parent:l,url:l}}]}}("Link","Entry","Space","3qr5d6sj491p","master","Environment","en-US","ContentType",1,"Asset","workPosition",void 0,"blogPost","6rhv4yMoAF3cN8jyYqZSWu","","image\u002Fpng","data",null,"2023-01-13T01:48:42.934Z","2022-08-31T00:26:23.277Z","2022-08-16T17:11:11.708Z","3XICrBnljaJmlfz9SMgtb0","3AIjGHsEBIU2L5LSAhDYZG","2022-08-16T17:10:23.298Z","2022-08-14T21:09:00.907Z","2022-08-11T20:17:58.945Z","2022-08-11T20:32:23.102Z","2022-08-11T20:34:18.096Z"))