window.__sveltekit_data = (function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){return {type:i,nodes:[j,j,{type:i,data:{authors:[{metadata:{tags:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"6rhv4yMoAF3cN8jyYqZSWu",type:k,createdAt:"2022-06-17T16:18:02.488Z",updatedAt:"2022-06-25T01:07:29.101Z",environment:{sys:{id:d,type:a,linkType:e}},revision:2,contentType:{sys:{type:a,linkType:l,id:"author"}},locale:f},fields:{fullName:"John Osterman",website:"https:\u002F\u002Fosterman.io\u002F",twitterAccount:"https:\u002F\u002Ftwitter.com\u002FJohnAOsterman",linkedinAccount:"https:\u002F\u002Fwww.linkedin.com\u002Fin\u002Fjohn-osterman-32714012\u002F",photo:{metadata:{tags:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"6E2Gh0TS2hrqafgOY1NlHr",type:m,createdAt:n,updatedAt:n,environment:{sys:{id:d,type:a,linkType:e}},revision:g,locale:f},fields:{title:"john osterman photo",description:"",file:{url:"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F6E2Gh0TS2hrqafgOY1NlHr\u002F68804563485dfdb3f0cb50fb38e3e3fa\u002Fosterman-photo.jpg",details:{size:256400,image:{width:750,height:847}},fileName:"osterman-photo.jpg",contentType:o}}}}}],title:"Easing the pain with continuous deployment",datePublished:"2021-09-24",body:"\u003Cp\u003E\u003Cspan class=\"first-letter\"\u003EG\u003C\u002Fspan\u003Eetting better at coding, for me, comes in fits and starts. That’s true for my command of a language but especially so for my devops set-up. Once I settle on and fine tune a configuration, I tend to stick with for a while. It takes a lot of work to get it right, so the payoff for changing it has to be high.\u003C\u002Fp\u003E\n\u003Cp\u003EFor instance: I’ve been using \u003Ca href=\"https:\u002F\u002Fv4.webpack.js.org\u002F\"\u003EWebpack v4\u003C\u002Fa\u003E to bundle my code for three and a half years. In the meantime version 5 has come out as have other “next generation” bundlers like \u003Ca href=\"https:\u002F\u002Fparceljs.org\u002F\"\u003EParcel\u003C\u002Fa\u003E, \u003Ca href=\"https:\u002F\u002Fwww.snowpack.dev\u002F\"\u003ESnowpack\u003C\u002Fa\u003E, and \u003Ca href=\"https:\u002F\u002Fvitejs.dev\u002F\"\u003EVite\u003C\u002Fa\u003E. They promise some combination of faster builds, smaller bundles, and easier configuration. All good things! But while the payoff\u002Fpain tipping may come soon,  I’m not yet there. Maybe there’ll be a personal project to test the waters.\u003C\u002Fp\u003E\n\u003Cp\u003EOne thing, however, that has really eased the pain and opened vistas recently is setting up continuous deployment. That may mean different things to different people, but in my work it means connecting one or more workflow environments directly to repository branches and setting up automatic builds so that those deployed environments always match the current codebase.\u003C\u002Fp\u003E\n\u003Cp\u003EAt Pew, for instance, I set the deployed GitHub pages version of a project to always match the \u003Ccode\u003Epreview\u003C\u002Fcode\u003E branch of a repo. I can share that link with coworkers and always be sure what they see there is up to date simply by pushing \u003Ccode\u003Epreview\u003C\u002Fcode\u003E to GitHub. This is made possible by GitHub actions and adding a \u003Ccode\u003Enode.js.yml\u003C\u002Fcode\u003E file to the \u003Ccode\u003E.github\u002Fworkflows\u002F\u003C\u002Fcode\u003E directory of the repo.\u003C\u002Fp\u003E\n\u003Cp\u003EDeploying my front-end Pew work to production isn’t so simple unfortunately and is not automated. The features I make have to be embedded in a page of the website and that is handled manually in the site’s CMS.\u003C\u002Fp\u003E\n\u003Cp\u003EFor other work, though, I do have more automated workflows with AWS in one case and Microsoft Azure in another. MS Azure is home to the serverless back end for an upcoming Pew project’s database and NodeJS functions. I have continuous deployment set up there so that Azure automatically builds and deploys any push to the \u003Ccode\u003Estage\u003C\u002Fcode\u003E branch of the repo. Deploying directly to production is warned against so I instead follow Azure’s recommendation of “swapping” slots of the serverless functions. Push to \u003Ccode\u003Estage\u003C\u002Fcode\u003E, allow the automatic build to happen, and then swap the production slot for the stage slot. This ensures that the update is made smoothly and that the instance is still hot, should people be visiting the site at the time the swap is made.\u003C\u002Fp\u003E\n\u003Cp\u003EAWS is home to a side project on the energy efficiency of properties throughout the service areas of certain power companies. There’s a lot going on there: S3 buckets for static files, Cognito for user authentication, Pinpoint for sending SMS message, some Lambdas, and more. The app itself is hosted in AWS Amplify, which has pretty easy (at least by AWS standards!) configuration for continuous deployment. The site has two live environments: dev and production. Any push to the \u003Ccode\u003Edev\u003C\u002Fcode\u003E branch triggers a build to the dev environment; pushing to \u003Ccode\u003Emain\u003C\u002Fcode\u003E triggers production.\u003C\u002Fp\u003E\n\u003Cp\u003EOther, larger teams (larger than this team of one), can get more sophisticated with their continuous deployment and the other aspects of CI\u002FCD (continuous development, continuous integration). They can automate tests and merges and remove even more of the repetitive and painstaking tasks of deploying code to the web. But even small steps in that direction can make a big difference—and a happier developer.\u003C\u002Fp\u003E\n",snippet:"Setting up continuous deployment can really ease the pain of web development. ",tags:[{metadata:{tags:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"2XOafKDP6dUEgVL2ao5Q5Z",type:k,createdAt:p,updatedAt:p,environment:{sys:{id:d,type:a,linkType:e}},revision:g,contentType:{sys:{type:a,linkType:l,id:"tag"}},locale:f},fields:{tag:"devops"}}],heroImage:{metadata:{tags:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"2QrCTloGZjWVsyOwrVwgDZ",type:m,createdAt:q,updatedAt:q,environment:{sys:{id:d,type:a,linkType:e}},revision:g,locale:f},fields:{title:"eric-muhr-u49bj3nOPD8-unsplash",file:{url:"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F2QrCTloGZjWVsyOwrVwgDZ\u002F961743c8415161647c883d09c5d9dcb0\u002Feric-muhr-u49bj3nOPD8-unsplash.jpg",details:{size:704448,image:{width:2400,height:1600}},fileName:"eric-muhr-u49bj3nOPD8-unsplash.jpg",contentType:o}}},contentType:"blogPost"},uses:{dependencies:h,params:["slug"],parent:h,url:h}}]}}("Link","Space","3qr5d6sj491p","master","Environment","en-US",1,void 0,"data",null,"Entry","ContentType","Asset","2022-06-25T01:06:08.949Z","image\u002Fjpeg","2022-06-25T01:16:22.342Z","2022-06-25T01:17:29.087Z"))