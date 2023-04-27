window.__sveltekit_data = (function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){return {type:l,nodes:[m,m,{type:l,data:{title:"Energy use intensity of multifamily dwellings: map and data visualization",workplace:{metadata:{tags:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"12pqZlkL7pHenkXuzFDi20",type:h,createdAt:n,updatedAt:n,environment:{sys:{id:d,type:a,linkType:e}},revision:f,contentType:{sys:{type:a,linkType:i,id:"workplace"}},locale:g},fields:{name:"Res-Intel",url:"https:\u002F\u002Fres-intel.com\u002F"}},datePublished:"2023-04-26",body:"\u003Cp\u003E\u003Cspan class=\"first-letter\"\u003EI\u003C\u002Fspan\u003E’ve worked on this project as an independent contractor since early 2020. What began as a request for some data viz help from a former colleague turned into a full-fledged web app for multiple clients. It’s pushed me into the full-stack realm of multifactor user authentication, client-specific feature flags, AWS Lambdas and APIs, and Elastic Search, all while maintaining the front end and making design decisions.\u003C\u002Fp\u003E\n\u003Cpicture\u003E\n        \u003Csource srcset=\"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F5eqpISctWWBfj2p3syvcKh\u002Ff0d48b9ebf46b8f608fd83e1e8f565f0\u002Fres-intel.png?fm=avif&w=1480&h=992&q=30 2x, \u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F5eqpISctWWBfj2p3syvcKh\u002Ff0d48b9ebf46b8f608fd83e1e8f565f0\u002Fres-intel.png?fm=avif&w=740&h=496&q=30 1x\" type=\"image\u002Favif\" media=\"(min-width:632px)\"\u003E\n                          \u003Csource srcset=\"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F5eqpISctWWBfj2p3syvcKh\u002Ff0d48b9ebf46b8f608fd83e1e8f565f0\u002Fres-intel.png?fm=avif&w=800&h=536&q=30 2x, \u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F5eqpISctWWBfj2p3syvcKh\u002Ff0d48b9ebf46b8f608fd83e1e8f565f0\u002Fres-intel.png?fm=avif&w=400&h=268&q=30 1x\" type=\"image\u002Favif\"\u003E\u003Csource srcset=\"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F5eqpISctWWBfj2p3syvcKh\u002Ff0d48b9ebf46b8f608fd83e1e8f565f0\u002Fres-intel.png?fm=webp&w=1480&h=992&q=30 2x, \u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F5eqpISctWWBfj2p3syvcKh\u002Ff0d48b9ebf46b8f608fd83e1e8f565f0\u002Fres-intel.png?fm=webp&w=740&h=496&q=30 1x\" type=\"image\u002Fwebp\" media=\"(min-width:632px)\"\u003E\n                          \u003Csource srcset=\"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F5eqpISctWWBfj2p3syvcKh\u002Ff0d48b9ebf46b8f608fd83e1e8f565f0\u002Fres-intel.png?fm=webp&w=800&h=536&q=30 2x, \u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F5eqpISctWWBfj2p3syvcKh\u002Ff0d48b9ebf46b8f608fd83e1e8f565f0\u002Fres-intel.png?fm=webp&w=400&h=268&q=30 1x\" type=\"image\u002Fwebp\"\u003E\n        \u003Cimg load=\"lazy\" class=\"full\" src=\"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F5eqpISctWWBfj2p3syvcKh\u002Ff0d48b9ebf46b8f608fd83e1e8f565f0\u002Fres-intel.png\" width=\"1480px\" height=\"992px\" alt=\"Data visualization on dark background with yellows, oranges, and purples signifying values. Left side is a data dashboard showing the energy use intensity metrics for a site in San Francisco. On the right is a map with color-coded buildings.\" \u002F\u003E\n    \u003C\u002Fpicture\u003E\n\u003Cp\u003EThe work is for \u003Ca href=\"https:\u002F\u002Fres-intel.com\u002F\"\u003ERes-Intel\u003C\u002Fa\u003E, which engages in mass-scale benchmarking of residential buildings’ energy use for energy companies to lower costs and for municipalities to meet energy-efficiency and climate-change goals. The data scientists use sophisticated methods I don’t fully understand to rate a property’s actual energy use against what it could or should be and show which interventions would most reduce energy use. This, repeated, for several tens of thousands of sites in a particular area.\u003C\u002Fp\u003E\n\u003Cp\u003EAt first my job was to visualize some of this data on an interactive map. I reached for Mapbox to get that started. It grew quickly to require fetching dynamic data from an AWS PostgreSQL database, then multiple user groups each with different data and features to access, then SMS multifactor authentication, then a high-performing search of sites by ID or address, then filters to restrict searches to certain criteria, then an option to have a print output of a selected site’s data.\u003C\u002Fp\u003E\n\u003Cdiv class=\"fx fx-wrap ai-e\"\u003E\n\u003Cfigure class=\"half\"\u003E\n\u003Cpicture\u003E\n        \u003Csource srcset=\"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F59MDRehI9lQtqneaeEVG0M\u002F81a1ba99ad5e52f8ea9f550b2005911f\u002Ftemp-profile.png?fm=avif&w=1480&h=1062&q=30 2x, \u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F59MDRehI9lQtqneaeEVG0M\u002F81a1ba99ad5e52f8ea9f550b2005911f\u002Ftemp-profile.png?fm=avif&w=740&h=531&q=30 1x\" type=\"image\u002Favif\" media=\"(min-width:632px)\"\u003E\n                          \u003Csource srcset=\"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F59MDRehI9lQtqneaeEVG0M\u002F81a1ba99ad5e52f8ea9f550b2005911f\u002Ftemp-profile.png?fm=avif&w=800&h=574&q=30 2x, \u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F59MDRehI9lQtqneaeEVG0M\u002F81a1ba99ad5e52f8ea9f550b2005911f\u002Ftemp-profile.png?fm=avif&w=400&h=287&q=30 1x\" type=\"image\u002Favif\"\u003E\u003Csource srcset=\"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F59MDRehI9lQtqneaeEVG0M\u002F81a1ba99ad5e52f8ea9f550b2005911f\u002Ftemp-profile.png?fm=webp&w=1480&h=1062&q=30 2x, \u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F59MDRehI9lQtqneaeEVG0M\u002F81a1ba99ad5e52f8ea9f550b2005911f\u002Ftemp-profile.png?fm=webp&w=740&h=531&q=30 1x\" type=\"image\u002Fwebp\" media=\"(min-width:632px)\"\u003E\n                          \u003Csource srcset=\"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F59MDRehI9lQtqneaeEVG0M\u002F81a1ba99ad5e52f8ea9f550b2005911f\u002Ftemp-profile.png?fm=webp&w=800&h=574&q=30 2x, \u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F59MDRehI9lQtqneaeEVG0M\u002F81a1ba99ad5e52f8ea9f550b2005911f\u002Ftemp-profile.png?fm=webp&w=400&h=287&q=30 1x\" type=\"image\u002Fwebp\"\u003E\n        \u003Cimg load=\"lazy\" class=\"full\" src=\"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F59MDRehI9lQtqneaeEVG0M\u002F81a1ba99ad5e52f8ea9f550b2005911f\u002Ftemp-profile.png\" width=\"917px\" height=\"658px\" alt=\"A graph plotting energy use intensity (BTUs per square foot) against outside temperature for a single dwelling.\" \u002F\u003E\n    \u003C\u002Fpicture\u003E\n  \u003Cfigcaption\u003EThis site's energy use generally falls when temperatures are warmer.\u003C\u002Ffigcaption\u003E\n  \u003C\u002Ffigure\u003E\n\u003Cfigure class=\"half\"\u003E\n\u003Cpicture\u003E\n        \u003Csource srcset=\"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002FuM1magw7NOooRpTujOHIV\u002F7aa0d65d3ad2ff1ae667e736aa25d454\u002Fstreetview.png?fm=avif&w=1480&h=1062&q=30 2x, \u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002FuM1magw7NOooRpTujOHIV\u002F7aa0d65d3ad2ff1ae667e736aa25d454\u002Fstreetview.png?fm=avif&w=740&h=531&q=30 1x\" type=\"image\u002Favif\" media=\"(min-width:632px)\"\u003E\n                          \u003Csource srcset=\"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002FuM1magw7NOooRpTujOHIV\u002F7aa0d65d3ad2ff1ae667e736aa25d454\u002Fstreetview.png?fm=avif&w=800&h=574&q=30 2x, \u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002FuM1magw7NOooRpTujOHIV\u002F7aa0d65d3ad2ff1ae667e736aa25d454\u002Fstreetview.png?fm=avif&w=400&h=287&q=30 1x\" type=\"image\u002Favif\"\u003E\u003Csource srcset=\"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002FuM1magw7NOooRpTujOHIV\u002F7aa0d65d3ad2ff1ae667e736aa25d454\u002Fstreetview.png?fm=webp&w=1480&h=1062&q=30 2x, \u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002FuM1magw7NOooRpTujOHIV\u002F7aa0d65d3ad2ff1ae667e736aa25d454\u002Fstreetview.png?fm=webp&w=740&h=531&q=30 1x\" type=\"image\u002Fwebp\" media=\"(min-width:632px)\"\u003E\n                          \u003Csource srcset=\"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002FuM1magw7NOooRpTujOHIV\u002F7aa0d65d3ad2ff1ae667e736aa25d454\u002Fstreetview.png?fm=webp&w=800&h=574&q=30 2x, \u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002FuM1magw7NOooRpTujOHIV\u002F7aa0d65d3ad2ff1ae667e736aa25d454\u002Fstreetview.png?fm=webp&w=400&h=287&q=30 1x\" type=\"image\u002Fwebp\"\u003E\n        \u003Cimg load=\"lazy\" class=\"full\" src=\"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002FuM1magw7NOooRpTujOHIV\u002F7aa0d65d3ad2ff1ae667e736aa25d454\u002Fstreetview.png\" width=\"917px\" height=\"658px\" alt=\"Google streetview\" \u002F\u003E\n    \u003C\u002Fpicture\u003E\n \u003Cfigcaption\u003EThe site is available to see in Google Streetview.\u003C\u002Ffigcaption\u003E\n  \u003C\u002Ffigure\u003E\n \u003Cfigure class=\"half\"\u003E\n\u003Cpicture\u003E\n        \u003Csource srcset=\"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002Fe7wQq9UdMysz3dplaRSfL\u002Ff7872b10d178780a6caefca6b023b6a3\u002Fhourly-profile.png?fm=avif&w=1480&h=1062&q=30 2x, \u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002Fe7wQq9UdMysz3dplaRSfL\u002Ff7872b10d178780a6caefca6b023b6a3\u002Fhourly-profile.png?fm=avif&w=740&h=531&q=30 1x\" type=\"image\u002Favif\" media=\"(min-width:632px)\"\u003E\n                          \u003Csource srcset=\"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002Fe7wQq9UdMysz3dplaRSfL\u002Ff7872b10d178780a6caefca6b023b6a3\u002Fhourly-profile.png?fm=avif&w=800&h=574&q=30 2x, \u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002Fe7wQq9UdMysz3dplaRSfL\u002Ff7872b10d178780a6caefca6b023b6a3\u002Fhourly-profile.png?fm=avif&w=400&h=287&q=30 1x\" type=\"image\u002Favif\"\u003E\u003Csource srcset=\"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002Fe7wQq9UdMysz3dplaRSfL\u002Ff7872b10d178780a6caefca6b023b6a3\u002Fhourly-profile.png?fm=webp&w=1480&h=1062&q=30 2x, \u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002Fe7wQq9UdMysz3dplaRSfL\u002Ff7872b10d178780a6caefca6b023b6a3\u002Fhourly-profile.png?fm=webp&w=740&h=531&q=30 1x\" type=\"image\u002Fwebp\" media=\"(min-width:632px)\"\u003E\n                          \u003Csource srcset=\"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002Fe7wQq9UdMysz3dplaRSfL\u002Ff7872b10d178780a6caefca6b023b6a3\u002Fhourly-profile.png?fm=webp&w=800&h=574&q=30 2x, \u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002Fe7wQq9UdMysz3dplaRSfL\u002Ff7872b10d178780a6caefca6b023b6a3\u002Fhourly-profile.png?fm=webp&w=400&h=287&q=30 1x\" type=\"image\u002Fwebp\"\u003E\n        \u003Cimg load=\"lazy\" class=\"full\" src=\"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002Fe7wQq9UdMysz3dplaRSfL\u002Ff7872b10d178780a6caefca6b023b6a3\u002Fhourly-profile.png\" width=\"917px\" height=\"658px\" alt=\"Graph showing the energy use of a single electric meter over the course of one summer day.\" \u002F\u003E\n    \u003C\u002Fpicture\u003E\n   \u003Cfigcaption\u003EThis electric meter's usage is lower during the workday. \u003C\u002Ffigcaption\u003E\n  \u003C\u002Ffigure\u003E\n\u003C\u002Fdiv\u003E\n\u003Cp\u003ESince launching the first dashboard my work has been to add data and features for additional clients and to update the data when needed.  That latter process involves running the raw data I receive from colleagues through some preprocessing Node scripts. With some of that output I manually update the part of the data embedded in Mapbox tiles; a future improvement would use Mapbox’s tiling service to make those updates easier. Updating the documents is Elastic Search is done with Node scripts hitting the Elastic APIs. Updates have been smooth, though time consuming— there’s room for more automation there.\u003C\u002Fp\u003E\n\u003Cp\u003EAs with any project that grows organically, one unforeseen piece at a time, the maintenance and design solutions have been challenging. But with some good decisions made at the outset, a complete refactor has not been necessary. Future improvements on the to-do list (or wishlist?) include more Typescript, full Dockerizing of the application, and more consolidation of the disparate parts.\u003C\u002Fp\u003E\n",snippet:"TK",tags:[{metadata:{tags:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"3h8rU5x8HRGc67rBgE4jjm",type:h,createdAt:o,updatedAt:o,environment:{sys:{id:d,type:a,linkType:e}},revision:f,contentType:{sys:{type:a,linkType:i,id:j}},locale:g},fields:{tag:"maps"}},{metadata:{tags:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"5tPE4sus2igTIK2zIdqyBz",type:h,createdAt:p,updatedAt:p,environment:{sys:{id:d,type:a,linkType:e}},revision:f,contentType:{sys:{type:a,linkType:i,id:j}},locale:g},fields:{tag:"mapbox"}},{metadata:{tags:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"3AIjGHsEBIU2L5LSAhDYZG",type:h,createdAt:q,updatedAt:q,environment:{sys:{id:d,type:a,linkType:e}},revision:f,contentType:{sys:{type:a,linkType:i,id:j}},locale:g},fields:{tag:"dataviz"}}],heroImage:{metadata:{tags:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"5eqpISctWWBfj2p3syvcKh",type:"Asset",createdAt:r,updatedAt:r,environment:{sys:{id:d,type:a,linkType:e}},revision:f,locale:g},fields:{title:"Multifamily dashboard",description:"Data visualization on dark background with yellows, oranges, and purples signifying values. Left side is a data dashboard showing the energy use intensity metrics for a site in San Francisco. On the right is a map with color-coded buildings.",file:{url:"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F5eqpISctWWBfj2p3syvcKh\u002Ff0d48b9ebf46b8f608fd83e1e8f565f0\u002Fres-intel.png",details:{size:537148,image:{width:1480,height:992}},fileName:"res-intel.png",contentType:"image\u002Fpng"}}},contentType:"project"},uses:{dependencies:k,params:["slug"],parent:k,url:k}}]}}("Link","Space","3qr5d6sj491p","master","Environment",1,"en-US","Entry","ContentType","tag",void 0,"data",null,"2023-04-27T00:20:49.924Z","2022-08-16T18:06:39.050Z","2022-08-14T20:57:53.919Z","2022-07-25T18:21:18.957Z","2023-04-27T00:23:50.641Z"))