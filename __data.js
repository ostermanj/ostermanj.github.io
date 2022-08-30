window.__sveltekit_data = (function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F){return {type:r,nodes:[null,{type:r,data:{page:"homepage",fields:{overview:"Web apps and data visualization for mission-driven organizations. Python, JavaScript, HTML, CSS; Svelte, D3.js, Mapbox, NodeJS; AWS, Azure, Google.",body:"\u003Cp\u003E👋🏻 Hello. I am a full-stack developer specializing in data visualization and data-driven web apps. I work full-time for the \u003Ca href=\"https:\u002F\u002Fwww.ushmm.org\"\u003EUS Holocaust Memorial Museum\u003C\u002Fa\u003E but am occasionally available for side projects.\u003C\u002Fp\u003E\n",featuredBlogPosts:[{metadata:{tags:[]},sys:{space:{sys:{type:a,linkType:c,id:d}},id:"5nT7UZh2gDjGmdQ8D9Pa7K",type:b,createdAt:s,updatedAt:s,environment:{sys:{id:e,type:a,linkType:f}},revision:h,contentType:{sys:{type:a,linkType:i,id:"project"}},locale:g},fields:{title:"Chart building web app",workplace:{sys:{type:a,linkType:b,id:t}},datePublished:"2021-03-07",body:"\nThis is a web app for people with no coding experience to build interactive charts for the web. The charts are built with Highcharts; the graphical user interface transforms settings into the JSON configuration Highcharts needs to render them on the web.\n\nBut there's more. One persistent challenge in publishing for the web—a theme central to my work for more than ten years now—is that orgs are also publishing for print (or at least for PDF). That means that each asset, like a chart, actually needs several: one for print and potentially multiple for the web, for different screen sizes and resolutions. That usually means a lot of time sunk keeping versions in sync with one another.\n\n![user interface of the chart building tool with a menu down the left side and thumbnail images of charts](\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F4MW9BiXIVLUSVHXKDPkaSv\u002Fde592f65984f15cec8d37b5a2372afd8\u002Fchartbuilder.png)\n\nThis tool solves that problem for charts. The charts are digital-first, optimized for all screen sizes by virtue of Highcharts' responsiveness, but they can be exported as SVGs for use in print at whatever size the designers need. The print options are separated from the web version, but they all share the same source. Update one and you update the other. That translates to huge time savings.\n\nThere are off-the-shelf solutions not too different from this but none cross the print-web divide like this.\n\n**What else does it do?**\n\n* Users can log in through Google and save their work. Others can take that work and edit or publish it.\n* Web charts can easily be static images or interactive Highcharts.\n* Branding and other specs are enforced effortlessly.\n* Advanced users can enter custom JSON configurations to extend and override standard settings.\n\nI built this for Pew and we're trying to roll it out. (Changing processes is hard.) Under the hood, though, this tool could be used by anyone by specifying brand colors, fonts, and other specs.",snippet:"There are off-the-shelf charting solutions not too different from this but none cross the print-web divide as well.",tags:[{sys:{type:a,linkType:b,id:m}},{sys:{type:a,linkType:b,id:"5vgnIFPLCNtziUkAvnHwVx"}}],heroImage:{metadata:{tags:[]},sys:{space:{sys:{type:a,linkType:c,id:d}},id:"4MW9BiXIVLUSVHXKDPkaSv",type:j,createdAt:u,updatedAt:u,environment:{sys:{id:e,type:a,linkType:f}},revision:h,locale:g},fields:{title:"user interface of the chart building tool with a menu down the left side and thumbnail images of charts",description:n,file:{url:"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F4MW9BiXIVLUSVHXKDPkaSv\u002Fde592f65984f15cec8d37b5a2372afd8\u002Fchartbuilder.png",details:{size:102564,image:{width:1017,height:715}},fileName:"chartbuilder.png",contentType:o}}}}},{metadata:{tags:[]},sys:{space:{sys:{type:a,linkType:c,id:d}},id:"7fYziFOPSJual3G94badmz",type:b,createdAt:"2022-08-14T21:00:02.690Z",updatedAt:"2022-08-26T17:07:35.578Z",environment:{sys:{id:e,type:a,linkType:f}},revision:v,contentType:{sys:{type:a,linkType:i,id:p}},locale:g},fields:{authors:[{sys:{type:a,linkType:b,id:q}}],title:"How I make using Mapbox easier, part two: accessing data with dummy features",datePublished:"2021-01-03",body:"As I've [said before](\u002Fcontent\u002Fhow-i-make-using-mapbox-easier-part-one-async-adding-sources-and-layers\u002F), I really like using Mapbox for visualizing geographic data, but it does have a few things I stumble over again and again. One of those things is trying to access the entirety of a dataset that's behind map features that have not fully rendered. I'll explain what I mean about that in a moment; one of the solutions I've found, to cut to the chase, is to preprocess the data I need and attach it to a dummy feature that I know will render when the map loads.\n\n![mapbox dummy area](\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F7BVY3VwnWJTM90HvIZbgqG\u002Fcbf88c45ce1baae670b4133954c2212c\u002Fmapbox-dummy-feature.png)\n\n## Some explanation\nThere are basically two ways to supply the data you are visualizing to Mapbox: 1) you can do it when your code is executed by supplying the Map instance's `addSource()` method with geoJSON data, whether literally (i.e., passing the geoJSON object directly), by reference, or by supplying a url to it or 2) you can supply the data beforehand, behind the scenes, by uploading data to Mapbox Studio or using its tiling service. When you supply the data beforehand, Mapbox converts it into a tileset, a collection of data ready to be loaded into a map at a range of zoom levels. When you `addSource()` to the map, you point instead to the ready-made tileset. (You can also upload the data to Mapbox Studio as a dataset, which you can later convert to tilesets.)\n\nI prefer to upload or tile-service the data beforehand rather than handle potentially very large geoJSON objects client-side and expend the resources and milliseconds (or seconds) needed to convert that data into tiles on every page load, every time someone visits the page. If the data is static, why task each client with performing those operations over and over again?\n\n## The problem\nIf you're only rendering features on a map and only displaying or inspecting or otherwise making use of the data properties of those features after they are rendered—for example, by clicking or hovering over locations—the above method of not handling the data client-side will be fine. But if you would like to also display data beyond the context of the map, such as summary stats or graphs in a sidebar, you will likely find that you don't have access to all the data points in the tileset because not all of the features have been rendered. Features may be outside the current bounds of the map, or they may be too densely packed to show at your current zoom level. So if you wanted to, for example, display a bar chart showing the number of the various kinds of, say, donut shops in your city, you would not reliably be able to get the full dataset using the [`queryRenderedFeatures()`](https:\u002F\u002Fdocs.mapbox.com\u002Fmapbox-gl-js\u002Fapi\u002Fmap\u002F#map#queryrenderedfeatures) method. \n\n## One harder solution\nThere is a viable way to use the [`querySourceFeatures()`](https:\u002F\u002Fdocs.mapbox.com\u002Fmapbox-gl-js\u002Fapi\u002Fmap\u002F#map#queryrenderedfeatures) method, which returns source data regardless of whether it has been rendered, but you have to manage two difficulties: data behind tiles outside the bounds of your current map viewport will not be returned and the same data may be returned more than once if the feature it's attached to spans multiple tiles.\n\nI've managed that solution for a project [mapping flood insurance programs](\u002Fcontent\u002Fmapping-data-from-the-national-flood-insurance-program\u002F) where the sidebar graphs were meant to update to always include only data for features within the current maps bounds. If your graphs don't need to adjust according to the map bounds, there are easier ways.\n\n## Easier solutions\nOne solution is to provide the full dataset to Mapbox for rendering features on the map and keep the same dataset client-side for other purposes. That doesn't sit well—you've got two sources of truth and are using up system resources unnecessarily. Another option is to keep only a preprocessed summary of the data client-side. That's fine; I've done it this way and probably will again. The heavy work of manipulating the data is done once during a build or prebuild step, so at least you're sparing the client from doing the same, repetitive data manipulation over and over again. That still gives you two sources of truth, though, and a somewhat more complex thing to maintain or update.\n\nTo keep all the data—the summary and its source—together, you can attach the summary data to a dummy feature in the tileset. A tileset of polygons scattered throughout a geographical area, for instance, could have a dummy polygon, the size of your map bounds, with the summary data attached to it as the feature's properties. Adjust its opacity to zero using a data-driven expression and there you have it. Whenever you have to update the data, you have it all in one source.\n\nIf your tileset is of points, you'll have to put the summary data in its own polygon tileset so that it can cover an area large enough to ensure that it is rendered on map load. That's not as clean but at least with everything coming as a tileset you won't be juggling multiple ways of serving up the data. Grab it with `queryRenderedFeatures()`, and you're good to go.\n\nThanks as always for reading. If I've missed something or got it wrong, please let me know.",snippet:"Accessing the entire dataset behind a Mapbox layer is hard; attach data to a dummy feature and use that instead.",tags:[{sys:{type:a,linkType:b,id:m}},{sys:{type:a,linkType:b,id:w}}],heroImage:{metadata:{tags:[]},sys:{space:{sys:{type:a,linkType:c,id:d}},id:"7BVY3VwnWJTM90HvIZbgqG",type:j,createdAt:x,updatedAt:x,environment:{sys:{id:e,type:a,linkType:f}},revision:h,locale:g},fields:{title:"mapbox dummy area",description:n,file:{url:"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F7BVY3VwnWJTM90HvIZbgqG\u002Fcbf88c45ce1baae670b4133954c2212c\u002Fmapbox-dummy-feature.png",details:{size:225524,image:{width:y,height:z}},fileName:"mapbox-dummy-feature.png",contentType:o}}}}},{metadata:{tags:[]},sys:{space:{sys:{type:a,linkType:c,id:d}},id:"6V9Xr8BggyQQpVgahElTkA",type:b,createdAt:"2022-08-14T21:12:52.768Z",updatedAt:"2022-08-16T15:05:33.526Z",environment:{sys:{id:e,type:a,linkType:f}},revision:v,contentType:{sys:{type:a,linkType:i,id:p}},locale:g},fields:{authors:[{sys:{type:a,linkType:b,id:q}}],title:"How I make using Mapbox easier, part one: async adding sources and layers",datePublished:"2020-12-29",body:"\nMapbox (specifically, for me, [Mapbox GL JS][1]) is a great platform for visualizing geographic data. I like that their documentation is thorough (though not always easy to digest). I like that they seem to have invested a lot of effort into making it a useful dataviz tool, in addition to all its other uses: navigation, geocoding, augmented vision. I like that they're headquartered here in DC. And I like that their pricing plans have a meaningful and useful free tier.\n\nAwesome.\n\nOver the three or four years I've been using it, though, I have come up against the same challenges. One is the difficulty of its expressions syntax for data-driven styling or interpolated values, which I have to look up every time. Another is accessing the full data behind map features that may not be fully rendered. Another—the topic of this post—is how to work with the async nature of adding sources and layers to a map.\n\n![a mapbox view of San Diego with red, orange, and purple extruded recangles representing buildings on a dark background][2]\n\nAdding sources and layers to a Mapbox map is pretty straightforward. The source is the data, and the layer is a visualization of the data. You can have multiple layers based on the same data. To [add a source][3], you use the `addSource()` method of the Map instance. It takes an `id` string and a config object as parameters. The underlying data can be geoJSON, or a vector source already uploaded to Mapbox, or others like raster images or video. To [add a layer][4], you use the `addLayer()` method, which takes a config object and, optionally, the name of another layer to insert the new layer before.\n\nThe trouble is your code may quite easily call the `addLayer()` method\nbefore `addSource()` really takes effect. Both methods are quietly asynchronous, handled by Mapbox outside the written sequence of your code. Mapbox could, perhaps should, make those methods explicitly async or, in other words, make them Promises that resolve only after they have taken full effect. In fact, in this [Github issue][5], it looks like that may be in the works.\n\nIn the meantime, it simply takes time for `addSource()` and `addLayer()` to take effect, which means you have to ensure the map layers are ready before you try to do anything with them. My solution has been to wrap the native methods in my own Promises that test whether the layers are rendered before resolving. This way, I can add a source, add some layers, and then chain my next actions via `then()`.\n\nThat solution is available as a small npm package, [mapbox-helper][6]. Give it a try. More info about how it works and how to use it is available there. The short version is this: the native `addSource()` and `addLayer()` methods are combined into one, `addSourceAndLayers()`, in which you specify the source you want to add and one or more layers that are based on it. Internally, adding the layers only occurs after the source is ready. The method returns a Promise to your code that resolves only after all layers have been rendered or, if a layer's visibility property is set to 'none', is ready to be rendered.\n\nFor example:\n\n\u003Ca href=\"https:\u002F\u002Fgist.github.com\u002Fostermanj\u002Fc8302e49e9b83b83a05bd2e964d92fba\" class=\"embedly-card\" data-card-width=\"100%\" data-card-controls=\"0\"\u003EEmbedded content: https:\u002F\u002Fgist.github.com\u002Fostermanj\u002Fc8302e49e9b83b83a05bd2e964d92fba\u003C\u002Fa\u003E\n\nThanks for reading. And, by the way, if you haven't checked out Mapbox's [version 2 release yet][7], you should. It has really great 3D rendering of elevation data and super hi-res satellite imagery, among other performance improvements.\n\n[1]: https:\u002F\u002Fdocs.mapbox.com\u002Fmapbox-gl-js\u002Fapi\u002F\n[2]: \u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F3KfGz5kmTI4dkz0l98oHY3\u002F777fd2648aaab56363a79c818dc3d1c2\u002Fmapbox.png\n[3]: https:\u002F\u002Fdocs.mapbox.com\u002Fmapbox-gl-js\u002Fapi\u002Fsources\u002F\n[4]: https:\u002F\u002Fdocs.mapbox.com\u002Fmapbox-gl-js\u002Fapi\u002Fmap\u002F#map#addlayer\n[5]: https:\u002F\u002Fgithub.com\u002Fmapbox\u002Fmapbox-gl-js\u002Fissues\u002F10192\n[6]: https:\u002F\u002Fwww.npmjs.com\u002Fpackage\u002Fmapbox-helper\n[7]: https:\u002F\u002Fwww.mapbox.com\u002Fblog\u002Fmapbox-gl-js-v2-3d-maps-camera-api-sky-api-launch",snippet:"Use a small npm package to work with the async nature of adding sources and layers to a Mapbox map.",tags:[{sys:{type:a,linkType:b,id:w}},{sys:{type:a,linkType:b,id:m}}],heroImage:{metadata:{tags:[]},sys:{space:{sys:{type:a,linkType:c,id:d}},id:"3KfGz5kmTI4dkz0l98oHY3",type:j,createdAt:A,updatedAt:A,environment:{sys:{id:e,type:a,linkType:f}},revision:h,locale:g},fields:{title:"mapbox async layers",description:n,file:{url:"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F3KfGz5kmTI4dkz0l98oHY3\u002F777fd2648aaab56363a79c818dc3d1c2\u002Fmapbox.png",details:{size:774983,image:{width:y,height:z}},fileName:"mapbox.png",contentType:o}}}}},{metadata:{tags:[]},sys:{space:{sys:{type:a,linkType:c,id:d}},id:"338kvwSFhcOgbbNjgYpTLi",type:b,createdAt:"2022-06-25T01:18:23.781Z",updatedAt:"2022-08-12T18:19:30.630Z",environment:{sys:{id:e,type:a,linkType:f}},revision:B,contentType:{sys:{type:a,linkType:i,id:p}},locale:g},fields:{authors:[{sys:{type:a,linkType:b,id:q}}],title:"Easing the pain with continuous deployment",datePublished:"2021-09-24",body:"Getting better at coding, for me, comes in fits and starts. That's true for my command of a language but especially so for my devops set-up. Once I settle on and fine tune a configuration, I tend to stick with for a while. It takes a lot of work to get it right, so the payoff for changing it has to be high.\n\nFor instance: I've been using [Webpack v4][1] to bundle my code for three and a half years. In the meantime version 5 has come out as have other \"next generation\" bundlers like [Parcel][2], [Snowpack][3], and [Vite][4]. They promise some combination of faster builds, smaller bundles, and easier configuration. All good things! But while the payoff\u002Fpain tipping may come soon,  I'm not yet there. Maybe there'll be a personal project to test the waters.\n\nOne thing, however, that has really eased the pain and opened vistas recently is setting up continuous deployment. That may mean different things to different people, but in my work it means connecting one or more workflow environments directly to repository branches and setting up automatic builds so that those deployed environments always match the current codebase.\n\nAt Pew, for instance, I set the deployed GitHub pages version of a project to always match the `preview` branch of a repo. I can share that link with coworkers and always be sure what they see there is up to date simply by pushing `preview` to GitHub. This is made possible by GitHub actions and adding a `node.js.yml` file to the `.github\u002Fworkflows\u002F` directory of the repo.\n\nDeploying my front-end Pew work to production isn't so simple unfortunately and is not automated. The features I make have to be embedded in a page of the website and that is handled manually in the site's CMS.\n\nFor other work, though, I do have more automated workflows with AWS in one case and Microsoft Azure in another. MS Azure is home to the serverless back end for an upcoming Pew project's database and NodeJS functions. I have continuous deployment set up there so that Azure automatically builds and deploys any push to the `stage` branch of the repo. Deploying directly to production is warned against so I instead follow Azure's recommendation of \"swapping\" slots of the serverless functions. Push to `stage`, allow the automatic build to happen, and then swap the production slot for the stage slot. This ensures that the update is made smoothly and that the instance is still hot, should people be visiting the site at the time the swap is made.\n\nAWS is home to a side project on the energy efficiency of properties throughout the service areas of certain power companies. There's a lot going on there: S3 buckets for static files, Cognito for user authentication, Pinpoint for sending SMS message, some Lambdas, and more. The app itself is hosted in AWS Amplify, which has pretty easy (at least by AWS standards!) configuration for continuous deployment. The site has two live environments: dev and production. Any push to the `dev` branch triggers a build to the dev environment; pushing to `main` triggers production.\n\nOther, larger teams (larger than this team of one), can get more sophisticated with their continuous deployment and the other aspects of CI\u002FCD (continuous development, continuous integration). They can automate tests and merges and remove even more of the repetitive and painstaking tasks of deploying code to the web. But even small steps in that direction can make a big difference—and a happier developer.\n\n[1]: https:\u002F\u002Fv4.webpack.js.org\u002F\n[2]: https:\u002F\u002Fparceljs.org\u002F\n[3]: https:\u002F\u002Fwww.snowpack.dev\u002F\n[4]: https:\u002F\u002Fvitejs.dev\u002F\n",snippet:"Setting up continuous deployment can really ease the pain of web development. ",tags:[{sys:{type:a,linkType:b,id:"2XOafKDP6dUEgVL2ao5Q5Z"}}],heroImage:{metadata:{tags:[]},sys:{space:{sys:{type:a,linkType:c,id:d}},id:"2QrCTloGZjWVsyOwrVwgDZ",type:j,createdAt:C,updatedAt:C,environment:{sys:{id:e,type:a,linkType:f}},revision:h,locale:g},fields:{title:"eric-muhr-u49bj3nOPD8-unsplash",file:{url:"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F2QrCTloGZjWVsyOwrVwgDZ\u002F961743c8415161647c883d09c5d9dcb0\u002Feric-muhr-u49bj3nOPD8-unsplash.jpg",details:{size:704448,image:{width:2400,height:1600}},fileName:"eric-muhr-u49bj3nOPD8-unsplash.jpg",contentType:"image\u002Fjpeg"}}}}}],featuredWorkExperience:[{metadata:{tags:[]},sys:{space:{sys:{type:a,linkType:c,id:d}},id:"i4wC2707crrr3J7VA6sjf",type:b,createdAt:D,updatedAt:D,environment:{sys:{id:e,type:a,linkType:f}},revision:h,contentType:{sys:{type:a,linkType:i,id:k}},locale:g},fields:{title:"Front-End Developer",workPlace:{sys:{type:a,linkType:b,id:"5oOuYjZ2En7UsYZddeN4xq"}},startDate:"2022-05-31",workPlaceName:"US Holocaust Memorial Museum",url:"https:\u002F\u002Fwww.ushmm.org"}},{metadata:{tags:[]},sys:{space:{sys:{type:a,linkType:c,id:d}},id:"5ipJqnKVDNDSxKnq3Q2Onc",type:b,createdAt:"2022-08-11T20:25:50.709Z",updatedAt:"2022-08-12T12:24:21.930Z",environment:{sys:{id:e,type:a,linkType:f}},revision:B,contentType:{sys:{type:a,linkType:i,id:k}},locale:g},fields:{title:"Principal Associate (Web Developer)",workPlace:{sys:{type:a,linkType:b,id:t}},startDate:"2018-08-01",endDate:"2022-05-20",workPlaceName:"The Pew Charitable Trusts",url:"https:\u002F\u002Fwww.pewtrusts.org"}},{metadata:{tags:[]},sys:{space:{sys:{type:a,linkType:c,id:d}},id:"6xrmlRLBZ2518GEx0Wu3Aq",type:b,createdAt:E,updatedAt:E,environment:{sys:{id:e,type:a,linkType:f}},revision:h,contentType:{sys:{type:a,linkType:i,id:k}},locale:g},fields:{title:"Communications Specialist (part-time)",workPlace:{sys:{type:a,linkType:b,id:"2cuGeH3s2kAjIlVcvCwldo"}},startDate:"2017-12-01",endDate:"2018-08-17",workPlaceName:"Resources for the Future",url:"https:\u002F\u002Fwww.rff.org"}},{metadata:{tags:[]},sys:{space:{sys:{type:a,linkType:c,id:d}},id:"1dc27YRSkI9JDeXZFRdp6q",type:b,createdAt:F,updatedAt:F,environment:{sys:{id:e,type:a,linkType:f}},revision:h,contentType:{sys:{type:a,linkType:i,id:k}},locale:g},fields:{title:"Director of Digital Communications (and previous titles)",workPlace:{sys:{type:a,linkType:b,id:"3uOA1G8GrWndoQSTvgh7WN"}},startDate:"2008-04-01",endDate:"2016-04-15",workPlaceName:"Center for Global Development",url:"https:\u002F\u002Fwww.cgdev.org"}}]}},uses:{dependencies:l,params:l,parent:l,url:l}}]}}("Link","Entry","Space","3qr5d6sj491p","master","Environment","en-US",1,"ContentType","Asset","workPosition",void 0,"3AIjGHsEBIU2L5LSAhDYZG","","image\u002Fpng","blogPost","6rhv4yMoAF3cN8jyYqZSWu","data","2022-08-16T17:11:11.708Z","3XICrBnljaJmlfz9SMgtb0","2022-08-16T17:10:23.298Z",10,"5tPE4sus2igTIK2zIdqyBz","2022-08-14T20:59:17.771Z",1014,716,"2022-08-14T21:09:00.907Z",2,"2022-06-25T01:17:29.087Z","2022-08-11T20:17:58.945Z","2022-08-11T20:32:23.102Z","2022-08-11T20:34:18.096Z"))