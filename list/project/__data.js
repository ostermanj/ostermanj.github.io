window.__sveltekit_data = (function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,_,$){n.metadata={tags:[],concepts:[]};n.sys={space:{sys:{type:a,linkType:b,id:c}},id:"3AIjGHsEBIU2L5LSAhDYZG",type:h,createdAt:C,updatedAt:C,environment:{sys:{id:d,type:a,linkType:e}},publishedVersion:m,revision:g,contentType:{sys:{type:a,linkType:i,id:p}},locale:f};n.fields={tag:"dataviz"};o.metadata={tags:[],concepts:[]};o.sys={space:{sys:{type:a,linkType:b,id:c}},id:"3XICrBnljaJmlfz9SMgtb0",type:h,createdAt:"2022-08-03T18:48:27.595Z",updatedAt:"2022-08-12T12:41:33.021Z",environment:{sys:{id:d,type:a,linkType:e}},publishedVersion:v,revision:E,contentType:{sys:{type:a,linkType:i,id:u}},locale:f};o.fields={name:"The Pew Charitable Trusts",url:"https:\u002F\u002Fwww.pewtrusts.org"};s.metadata={tags:[],concepts:[]};s.sys={space:{sys:{type:a,linkType:b,id:c}},id:"3h8rU5x8HRGc67rBgE4jjm",type:h,createdAt:A,updatedAt:A,environment:{sys:{id:d,type:a,linkType:e}},publishedVersion:m,revision:g,contentType:{sys:{type:a,linkType:i,id:p}},locale:f};s.fields={tag:"maps"};M.metadata={tags:[],concepts:[]};M.sys={space:{sys:{type:a,linkType:b,id:c}},id:"2MmXDhUlPQ78O3uEotjahJ",type:h,createdAt:N,updatedAt:N,environment:{sys:{id:d,type:a,linkType:e}},publishedVersion:m,revision:g,contentType:{sys:{type:a,linkType:i,id:p}},locale:f};M.fields={tag:"d3"};return {type:x,nodes:[y,y,{type:x,data:{type:j,items:[{metadata:{tags:[],concepts:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"2ySgwhjGhiiwKTOawFUeLo",type:h,createdAt:"2023-04-27T00:24:15.709Z",updatedAt:"2023-04-27T12:29:15.163Z",environment:{sys:{id:d,type:a,linkType:e}},publishedVersion:65,revision:t,contentType:{sys:{type:a,linkType:i,id:j}},locale:f},fields:{title:"Energy use intensity of multifamily dwellings: map and data visualization",workplace:{metadata:{tags:[],concepts:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"12pqZlkL7pHenkXuzFDi20",type:h,createdAt:z,updatedAt:z,environment:{sys:{id:d,type:a,linkType:e}},publishedVersion:4,revision:g,contentType:{sys:{type:a,linkType:i,id:u}},locale:f},fields:{name:"Res-Intel",url:"https:\u002F\u002Fres-intel.com\u002F"}},datePublished:"2023-04-26",body:"I've worked on this project off and on as an independent contractor since early 2020. What began as a request for some data viz help from a former colleague turned into a full-fledged web app for multiple clients. It's pushed me into the full-stack realm of multifactor user authentication, client-specific feature flags, AWS Lambdas and APIs, and Elastic Search, all while maintaining the front end and making design decisions.\n\n![Multifamily dashboard](\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F5eqpISctWWBfj2p3syvcKh\u002Ff0d48b9ebf46b8f608fd83e1e8f565f0\u002Fres-intel.png)\n\nThe work is for [Res-Intel](https:\u002F\u002Fres-intel.com\u002F), which engages in mass-scale benchmarking of residential buildings' energy use for energy companies to lower costs and for municipalities to meet energy-efficiency and climate-change goals. The data scientists use sophisticated methods I don't fully understand to rate a property's actual energy use against what it could or should be and show which interventions would most reduce energy use. This, repeated, for several tens of thousands of sites in a particular area.\n\nAt first my job was to visualize some of this data on an interactive map. I reached for Mapbox to get that started. It grew quickly to require fetching dynamic data from an AWS PostgreSQL database, then multiple user groups each with different data and features to access, then SMS multifactor authentication, then a high-performing search of sites by ID or address, then filters to restrict searches to certain criteria, then an option to have a print output of a selected site's data.\n\n\u003Cdiv class=\"fx fx-wrap ai-e\"\u003E\n\n\u003Cfigure class=\"half\"\u003E\n\n![Temperature profile](\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F59MDRehI9lQtqneaeEVG0M\u002F81a1ba99ad5e52f8ea9f550b2005911f\u002Ftemp-profile.png)\n  \u003Cfigcaption\u003EThis site's energy use generally falls when temperatures are warmer.\u003C\u002Ffigcaption\u003E\n  \u003C\u002Ffigure\u003E\n\n\u003Cfigure class=\"half\"\u003E\n\n![Google streetview](\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002FuM1magw7NOooRpTujOHIV\u002F7aa0d65d3ad2ff1ae667e736aa25d454\u002Fstreetview.png)\n \u003Cfigcaption\u003EThe site is available to see in Google Streetview.\u003C\u002Ffigcaption\u003E\n  \u003C\u002Ffigure\u003E\n\n \u003Cfigure class=\"half\"\u003E\n\n![Hourly profile](\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002Fe7wQq9UdMysz3dplaRSfL\u002Ff7872b10d178780a6caefca6b023b6a3\u002Fhourly-profile.png)\n   \u003Cfigcaption\u003EThis electric meter's usage is lower during the workday. \u003C\u002Ffigcaption\u003E\n  \u003C\u002Ffigure\u003E\n\u003C\u002Fdiv\u003E\n\nSince launching the first dashboard my work has been to add data and features for additional clients and to update the data when needed.  That latter process involves running the raw data I receive from colleagues through some preprocessing Node scripts. With some of that output I manually update the part of the data embedded in Mapbox tiles; a future improvement would use Mapbox's tiling service to make those updates easier. Updating the documents in Elastic Search is done with Node scripts hitting the Elastic APIs. Updates have been smooth, though time consuming— there's room for more automation there. \n\nAs with any project that grows organically, one unforeseen piece at a time, the maintenance and design solutions have been challenging. But with some good decisions made at the outset, a complete refactor has not been necessary. Future improvements on the to-do list (or wishlist?) include more Typescript, full Dockerizing of the application, and more consolidation of the disparate parts.\n",snippet:"What began as a request for some data viz help from a former colleague turned into a full-fledged web app for multiple clients.",tags:[s,{metadata:{tags:[],concepts:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"5tPE4sus2igTIK2zIdqyBz",type:h,createdAt:B,updatedAt:B,environment:{sys:{id:d,type:a,linkType:e}},publishedVersion:m,revision:g,contentType:{sys:{type:a,linkType:i,id:p}},locale:f},fields:{tag:"mapbox"}},n],heroImage:{metadata:{tags:[],concepts:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"5eqpISctWWBfj2p3syvcKh",type:k,createdAt:D,updatedAt:D,environment:{sys:{id:d,type:a,linkType:e}},publishedVersion:20,revision:g,locale:f},fields:{title:"Multifamily dashboard",description:"Data visualization on dark background with yellows, oranges, and purples signifying values. Left side is a data dashboard showing the energy use intensity metrics for a site in San Francisco. On the right is a map with color-coded buildings.",file:{url:"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F5eqpISctWWBfj2p3syvcKh\u002Ff0d48b9ebf46b8f608fd83e1e8f565f0\u002Fres-intel.png",details:{size:537148,image:{width:1480,height:992}},fileName:"res-intel.png",contentType:l}}}}},{metadata:{tags:[],concepts:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"486Iup6Yrwh24CbZrSONWK",type:h,createdAt:"2023-04-26T18:17:29.728Z",updatedAt:"2023-04-26T19:44:45.939Z",environment:{sys:{id:d,type:a,linkType:e}},publishedVersion:42,revision:v,contentType:{sys:{type:a,linkType:i,id:j}},locale:f},fields:{title:"Interactive dashboard of Philadelphia’s post-COVID economy",workplace:o,link:"https:\u002F\u002Fwww.pewtrusts.org\u002Fen\u002Fresearch-and-analysis\u002Fdata-visualizations\u002F2021\u002Fpew-dashboard-tracks-philadelphias-economic-recovery-and-growth-in-the-age-of-covid",datePublished:"2022-05-03",body:"This was one of my last projects while at Pew and one of the hardest. While most of my projects were purely front-end pursuits with static data, this dashboard required a back-end database, serverless functions, and some data preprocessing in Node.\n\n![Philly dashboard](\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F17tItciHDEUKPnbdjjppF5\u002Ff4a3753ac81af209d954f5bd56f1ebd5\u002Fphilly-dashboard.png)\n\nThe goal was to chart Philadelphia's economic recovery coming out of the Covid pandemic. My colleagues on the research side secured a large handful of data sources, some public and some proprietary, to make it possible. They handed off to me mostly clean datasets for each indicator:\n\n* delinquency on bills\n* financial stability\n* balance on credit accounts\n* work locations\n* sales by sector\n* bankruptcy filings\n* jobs by sector\n* jobs by establishment size\n* hourly wages by sector\n\n## The back end and preprocessing\nI needed a database to store this data in. The datasets were too big to wrangle on the client side, and I had to keep potentially identifiable individual data points from being exposed to the front end. (For the same reason, the display of some data is redacted if the number of businesses making up the average falls below a threshold because of the filters applied.) The database could have been anything; I ended up using MS Azure Cosmos DB.\n\nAll the datasets are put into the dataset (created or updated) by API using some NodeJS scripts. The first three datasets, proprietary data from Experian, are sent to the database basically as-is with the addition of precalculated aggregates. When filters are applied, a serverless function queries the database for matching entries and recalculates the result on the fly. Other datasets have far fewer filters available; each filter option is precalculated before being added to the database.\n## The front end\nI built the front end with Svelte wrapped up by Webpack. There's some D3 in there. The build step prerenders the page so that the static dashboard appears immediately on page load. JavaScript then rehydrates the app and provides the interactivity—good for core web vitals and SEO.\n",snippet:"This project to chart Philadelphia's economic recovery was one of my last while at Pew, and one of the hardest.",tags:[s,n],heroImage:{metadata:{tags:[],concepts:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"17tItciHDEUKPnbdjjppF5",type:k,createdAt:F,updatedAt:F,environment:{sys:{id:d,type:a,linkType:e}},publishedVersion:G,revision:g,locale:f},fields:{title:"Philly dashboard",description:"Data dashboard showing zip-code map and line graphs for three economic indicators: delinquency on bills, financial stability, and balance on credit accounts.",file:{url:"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F17tItciHDEUKPnbdjjppF5\u002Ff4a3753ac81af209d954f5bd56f1ebd5\u002Fphilly-dashboard.png",details:{size:353232,image:{width:1500,height:1065}},fileName:"philly-dashboard.png",contentType:l}}}}},{metadata:{tags:[],concepts:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"5nT7UZh2gDjGmdQ8D9Pa7K",type:h,createdAt:H,updatedAt:H,environment:{sys:{id:d,type:a,linkType:e}},publishedVersion:r,revision:g,contentType:{sys:{type:a,linkType:i,id:j}},locale:f},fields:{title:"Chart building web app",workplace:o,datePublished:"2021-03-07",body:"\nThis is a web app for people with no coding experience to build interactive charts for the web. The charts are built with Highcharts; the graphical user interface transforms settings into the JSON configuration Highcharts needs to render them on the web.\n\nBut there's more. One persistent challenge in publishing for the web—a theme central to my work for more than ten years now—is that orgs are also publishing for print (or at least for PDF). That means that each asset, like a chart, actually needs several: one for print and potentially multiple for the web, for different screen sizes and resolutions. That usually means a lot of time sunk keeping versions in sync with one another.\n\n![user interface of the chart building tool with a menu down the left side and thumbnail images of charts](\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F4MW9BiXIVLUSVHXKDPkaSv\u002Fde592f65984f15cec8d37b5a2372afd8\u002Fchartbuilder.png)\n\nThis tool solves that problem for charts. The charts are digital-first, optimized for all screen sizes by virtue of Highcharts' responsiveness, but they can be exported as SVGs for use in print at whatever size the designers need. The print options are separated from the web version, but they all share the same source. Update one and you update the other. That translates to huge time savings.\n\nThere are off-the-shelf solutions not too different from this but none cross the print-web divide like this.\n\n**What else does it do?**\n\n* Users can log in through Google and save their work. Others can take that work and edit or publish it.\n* Web charts can easily be static images or interactive Highcharts.\n* Branding and other specs are enforced effortlessly.\n* Advanced users can enter custom JSON configurations to extend and override standard settings.\n\nI built this for Pew and we're trying to roll it out. (Changing processes is hard.) Under the hood, though, this tool could be used by anyone by specifying brand colors, fonts, and other specs.",snippet:"There are off-the-shelf charting solutions not too different from this but none cross the print-web divide as well.",tags:[n,{metadata:{tags:[],concepts:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"5vgnIFPLCNtziUkAvnHwVx",type:h,createdAt:I,updatedAt:I,environment:{sys:{id:d,type:a,linkType:e}},publishedVersion:m,revision:g,contentType:{sys:{type:a,linkType:i,id:p}},locale:f},fields:{tag:"productivity"}}],heroImage:{metadata:{tags:[],concepts:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"4MW9BiXIVLUSVHXKDPkaSv",type:k,createdAt:J,updatedAt:J,environment:{sys:{id:d,type:a,linkType:e}},publishedVersion:K,revision:g,locale:f},fields:{title:"user interface of the chart building tool with a menu down the left side and thumbnail images of charts",description:q,file:{url:"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F4MW9BiXIVLUSVHXKDPkaSv\u002Fde592f65984f15cec8d37b5a2372afd8\u002Fchartbuilder.png",details:{size:102564,image:{width:1017,height:715}},fileName:"chartbuilder.png",contentType:l}}}}},{metadata:{tags:[],concepts:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"79u9uExSbKtXeLgEG5hVlo",type:h,createdAt:L,updatedAt:L,environment:{sys:{id:d,type:a,linkType:e}},publishedVersion:r,revision:g,contentType:{sys:{type:a,linkType:i,id:j}},locale:f},fields:{title:"Netting Billions 2020: Global Values and Trends for Tuna Fisheries",workplace:o,repository:"https:\u002F\u002Fgithub.com\u002Fostermanj\u002Fnetting-billions",link:"https:\u002F\u002Fwww.pewtrusts.org\u002Fen\u002Fresearch-and-analysis\u002Fdata-visualizations\u002F2020\u002Fnetting-billions-2020-global-values-and-trends-for-tuna-fisheries",datePublished:"2021-02-28",body:"\nThis data viz draws on a comprehensive and detailed dataset of commercial tuna catch and value from 2012 to 2018 compiled by Pew researchers.\n\n* Organize the data by species, gear, end use, or fishery management organization.\n* Drill down into any characteristic and filter as needed.\n* Investigate correlation between catch volume and monetary volume.\n\nGraphs are built on D3.js.\n\n![netting-billions](\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F2ybFCzlGXy8vAIAckCpysS\u002F4278def3cc1b33bf705b60dd2443fd0d\u002Fnetting-billions.png)",snippet:"This data viz illustrates commercial tuna catch and value from 2012 to 2018 compiled by Pew researchers.",tags:[n,M],heroImage:{metadata:{tags:[],concepts:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"2ybFCzlGXy8vAIAckCpysS",type:k,createdAt:O,updatedAt:O,environment:{sys:{id:d,type:a,linkType:e}},publishedVersion:E,revision:g,locale:f},fields:{title:"netting-billions",description:q,file:{url:"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F2ybFCzlGXy8vAIAckCpysS\u002F4278def3cc1b33bf705b60dd2443fd0d\u002Fnetting-billions.png",details:{size:67895,image:{width:1001,height:712}},fileName:"netting-billions.png",contentType:l}}}}},{metadata:{tags:[],concepts:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"3U62AjaLjrUqQZ5GhtxfTH",type:h,createdAt:P,updatedAt:P,environment:{sys:{id:d,type:a,linkType:e}},publishedVersion:18,revision:g,contentType:{sys:{type:a,linkType:i,id:j}},locale:f},fields:{title:"Pennsylvania retirement savings data viz",workplace:o,repository:"https:\u002F\u002Fgithub.com\u002Fpewtrusts\u002Fpa-retirement",link:"https:\u002F\u002Fwww.pewtrusts.org\u002Fen\u002Fresearch-and-analysis\u002Fdata-visualizations\u002F2020\u002Fretirement-savings-gaps-may-increase-burden-on-pennsylvania-taxpayers",datePublished:"2020-11-01",body:"\"Workers in the United States accumulate the vast majority of their retirement savings through employer-based plans, but large gaps in coverage exist. Pennsylvania is no exception, with about 1 in 3 workers lacking access to a workplace plan.\"\n\n![table with bar charts showing Taxpayer burden, Vulnerable household increase, Dependency ratio increase, and Average income shortfall for all counties in Pennsylvania](\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F4MWzEbqTQ5nD44Ah9mtxiH\u002F43782d36a4d075fbbb95ecd76c833836\u002Fpa-retirement.png)",snippet:"Charts and maps documenting the health of Pennsylvania's retirement savings.",tags:[n,s],heroImage:{metadata:{tags:[],concepts:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"4MWzEbqTQ5nD44Ah9mtxiH",type:k,createdAt:Q,updatedAt:Q,environment:{sys:{id:d,type:a,linkType:e}},publishedVersion:r,revision:g,locale:f},fields:{title:"table with bar charts showing Taxpayer burden, Vulnerable household increase, Dependency ratio increase, and Average income shortfall for all counties in Pennsylvania",description:q,file:{url:"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F4MWzEbqTQ5nD44Ah9mtxiH\u002F43782d36a4d075fbbb95ecd76c833836\u002Fpa-retirement.png",details:{size:107535,image:{width:1653,height:1167}},fileName:"pa-retirement.png",contentType:l}}}}},{metadata:{tags:[],concepts:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"71yPrCOrfDaegNJjxKWXH9",type:h,createdAt:R,updatedAt:R,environment:{sys:{id:d,type:a,linkType:e}},publishedVersion:r,revision:g,contentType:{sys:{type:a,linkType:i,id:j}},locale:f},fields:{title:"D3.js data dashboard: The State of 10 Cities",workplace:o,repository:"https:\u002F\u002Fgithub.com\u002Fostermanj\u002Fpri-multicity",link:"https:\u002F\u002Fwww.pewtrusts.org\u002Fresearch-and-analysis\u002Fdata-visualizations\u002F2019\u002Fthe-state-of-10-cities",datePublished:"2019-12-02",body:"\"The State of 10 Cities . . . allows you to analyze data from 10 U.S. cities on key economic, social, and demographic indicators over the past decade. \n\n* Compare cities over time or with each other.\n* Separate data for certain indicators by age and race.\n* Gain insights into how cities have changed on 14 key measures over the past decade.\"\n\nGraphs are built on D3.js Offers over-time view of aggregated data for each indicator and a view showing the latest year's data disaggregated by age and race.\n\n![chart with green, orange, red, and blue circles indicating  the poverty rate for ten US cities, disaggregated by age and race](\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F5S0l8EPSvBEWxxHRMFUM2O\u002F5d08eafda970e345f8a31b23f452b27a\u002Fmulticity.png)",snippet:"Analyze data from 10 U.S. cities on key economic, social, and demographic indicators over the past decade.",tags:[M,n],heroImage:{metadata:{tags:[],concepts:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"5S0l8EPSvBEWxxHRMFUM2O",type:k,createdAt:S,updatedAt:S,environment:{sys:{id:d,type:a,linkType:e}},publishedVersion:11,revision:g,locale:f},fields:{title:"chart with green, orange, red, and blue circles indicating  the poverty rate for ten US cities, disaggregated by age and race",description:q,file:{url:"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F5S0l8EPSvBEWxxHRMFUM2O\u002F5d08eafda970e345f8a31b23f452b27a\u002Fmulticity.png",details:{size:106389,image:{width:1014,height:716}},fileName:"multicity.png",contentType:l}}}}},{metadata:{tags:[],concepts:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"7iMVRcoiiruBQBLF72GDP6",type:h,createdAt:"2022-08-16T18:29:35.479Z",updatedAt:"2023-04-27T14:08:10.443Z",environment:{sys:{id:d,type:a,linkType:e}},publishedVersion:G,revision:m,contentType:{sys:{type:a,linkType:i,id:j}},locale:f},fields:{title:"Broadband policy explorer: data tool to find state laws about broadband",workplace:o,repository:"https:\u002F\u002Fgithub.com\u002Fostermanj\u002Fbroadband",link:"https:\u002F\u002Fwww.pewtrusts.org\u002Fen\u002Fresearch-and-analysis\u002Fdata-visualizations\u002F2019\u002Fstate-broadband-policy-explorer",datePublished:"2019-07-31",body:"![data dashborad with small US map and listings of broadband policies in Alabama](\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F5mTxXR58LSPMc8ZsKyGWkE\u002F83771f323bcd5c06dcefd42ddc44369d\u002FScreen_Shot_2022-08-16_at_2.27.04_PM.png)",snippet:"Explore broadband programs, competition and regulation, definitions, funding and financing, and infrastructure access.",tags:[{metadata:{tags:[],concepts:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"1Y861tqBGe05OH38xzGc6W",type:h,createdAt:T,updatedAt:T,environment:{sys:{id:d,type:a,linkType:e}},publishedVersion:m,revision:g,contentType:{sys:{type:a,linkType:i,id:p}},locale:f},fields:{tag:"data tools"}}],heroImage:{metadata:{tags:[],concepts:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"5mTxXR58LSPMc8ZsKyGWkE",type:k,createdAt:U,updatedAt:U,environment:{sys:{id:d,type:a,linkType:e}},publishedVersion:v,revision:g,locale:f},fields:{title:"data dashborad with small US map and listings of broadband policies in Alabama",description:q,file:{url:"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F5mTxXR58LSPMc8ZsKyGWkE\u002F83771f323bcd5c06dcefd42ddc44369d\u002FScreen_Shot_2022-08-16_at_2.27.04_PM.png",details:{size:414571,image:{width:2050,height:1584}},fileName:"Screen Shot 2022-08-16 at 2.27.04 PM.png",contentType:l}}}}},{metadata:{tags:[],concepts:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"4vC1Jo0xclt1F0yc33JCKz",type:h,createdAt:V,updatedAt:V,environment:{sys:{id:d,type:a,linkType:e}},publishedVersion:r,revision:g,contentType:{sys:{type:a,linkType:i,id:j}},locale:f},fields:{title:"Art directed data story: 10 trends in Philly over 10 years",workplace:o,repository:"https:\u002F\u002Fgithub.com\u002Fostermanj\u002Fphilly",link:"https:\u002F\u002Fwww.pewtrusts.org\u002Fen\u002Fresearch-and-analysis\u002Freports\u002F2019\u002F04\u002F11\u002F10-trends-that-have-changed-philadelphia-in-10-years",datePublished:"2019-04-11",body:"![cover image of Philadelphia street scene with bicyclist at dusk among traffic lights and cars. text reads: 10 trends that have changed Philadelphia in 10 years.](\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F5PZFF0mxuxEUOlxBsI9s0S\u002Fc522bce866a37755a0820d20ec964df7\u002FScreen_Shot_2022-08-16_at_11.33.57_AM.png)",snippet:"An art-directed digital-first report with animated graphs and immersive imagery.",tags:[n,{metadata:{tags:[],concepts:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"WmLqezTTTXSApxOw8Jp7l",type:h,createdAt:W,updatedAt:W,environment:{sys:{id:d,type:a,linkType:e}},publishedVersion:m,revision:g,contentType:{sys:{type:a,linkType:i,id:p}},locale:f},fields:{tag:"highcharts"}}],heroImage:{metadata:{tags:[],concepts:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"5PZFF0mxuxEUOlxBsI9s0S",type:k,createdAt:X,updatedAt:X,environment:{sys:{id:d,type:a,linkType:e}},publishedVersion:17,revision:g,locale:f},fields:{title:"cover image of Philadelphia street scene with bicyclist at dusk among traffic lights and cars. text reads: 10 trends that have changed Philadelphia in 10 years.",description:q,file:{url:"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F5PZFF0mxuxEUOlxBsI9s0S\u002Fc522bce866a37755a0820d20ec964df7\u002FScreen_Shot_2022-08-16_at_11.33.57_AM.png",details:{size:7711582,image:{width:2612,height:1908}},fileName:"Screen Shot 2022-08-16 at 11.33.57 AM.png",contentType:l}}}}},{metadata:{tags:[],concepts:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"5d66N1kCVekYuJM9XWqtqr",type:h,createdAt:Y,updatedAt:Y,environment:{sys:{id:d,type:a,linkType:e}},publishedVersion:K,revision:g,contentType:{sys:{type:a,linkType:i,id:j}},locale:f},fields:{title:"A tool for better debt comparison: data viz of state debt",workplace:o,repository:"https:\u002F\u002Fgithub.com\u002Fostermanj\u002Fstate-debt",link:"https:\u002F\u002Fwww.pewtrusts.org\u002Fen\u002Fresearch-and-analysis\u002Fdata-visualizations\u002F2019\u002Fa-tool-for-better-debt-comparisons",datePublished:"2019-04-02",body:"![dashboard of bar charts comparing US state debt levels and conditions](\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F2lyRHUyyZGKyeWlCaXngoH\u002F550e24a6d693f53963168ceb4ce88027\u002FScreen_Shot_2022-08-16_at_2.20.01_PM.png)",snippet:"Compare debt levels across tailored peer groups, including comparing states with similar borrowing practices, constraints, and needs.",tags:[n],heroImage:{metadata:{tags:[],concepts:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"2lyRHUyyZGKyeWlCaXngoH",type:k,createdAt:Z,updatedAt:Z,environment:{sys:{id:d,type:a,linkType:e}},publishedVersion:12,revision:g,locale:f},fields:{title:"dashboard of bar charts comparing US state debt levels and conditions",description:q,file:{url:"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F2lyRHUyyZGKyeWlCaXngoH\u002F550e24a6d693f53963168ceb4ce88027\u002FScreen_Shot_2022-08-16_at_2.20.01_PM.png",details:{size:199393,image:{width:1804,height:1326}},fileName:"Screen Shot 2022-08-16 at 2.20.01 PM.png",contentType:l}}}}},{metadata:{tags:[],concepts:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"1kV1xZXthhdymDVlg0hB40",type:h,createdAt:_,updatedAt:_,environment:{sys:{id:d,type:a,linkType:e}},publishedVersion:21,revision:g,contentType:{sys:{type:a,linkType:i,id:j}},locale:f},fields:{title:"Mapping data from the National Flood Insurance Program",workplace:{metadata:{tags:[],concepts:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"2cuGeH3s2kAjIlVcvCwldo",type:h,createdAt:"2022-08-03T18:49:34.161Z",updatedAt:"2022-08-12T12:43:47.722Z",environment:{sys:{id:d,type:a,linkType:e}},publishedVersion:5,revision:m,contentType:{sys:{type:a,linkType:i,id:u}},locale:f},fields:{name:"Resources for the Future",url:"https:\u002F\u002Fwww.rff.org"}},repository:"https:\u002F\u002Fgithub.com\u002Fostermanj\u002Fflood",datePublished:"2018-04-04",body:"\nThe National Flood Insurance Program offers insurance policies for homeowners living within 100-year floodplains. The program has been operating on short-term extensions and is due for reauthorization in July 2018. Knowing how homeowners value insurance and what encourages them to buy more or less of it should be one of the factors informing how the program continues. That question is the subject of research by [Andrew Royal](http:\u002F\u002Fwww.rff.org\u002Fpeople\u002Fprofile\u002Fandrew-royal) at Resources for the Future; this map visualizes some of his findings, showing large-scale geographic and demographic patterns.\n\nThe research centers on homeowners' decisions whether or not to pay more for a policy with a lower deductible. You can see in the map that low-deductible policies (in red) seem to predominate in the Southeast, especially on the coast, while high-deductible policies seem to cluster in major metropolitan areas. Zooming in to the coastline in southern South Carolina and northern Georgia, for instance, reveals that nearly 80 percent of policyholders chose to lower their deductible while only 40 percent of those in the Boston area chose to do so.\n\n![map showing the binned locations of flood insurance policies along the North and South Carolina coast](\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F3ih8Fwv7znEgBXjAfAu3Ht\u002F07539a3a921412823cf923d02d6b7888\u002Fsc-georgia.png)\n\n![map showing the binned locations of flood insurance policies in the Boston area](\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F5e9R0LJdzVGTrCYJ6P8oV8\u002Feb416296ce8cf87f76f788196cb5a052\u002Fboston.png)\n\nThe research shows that wealth has a lot to do with decisions around deductibles. Some economic theory holds that the richer you are, the less likely you are to buy insurance because you're better able to independently hedge against financial risk. The research on this sample of policyholders, however, shows the opposite: wealthier homeowners are more likely to opt for more expensive policies with lower deductibles. You can see some of that pattern show by zooming and panning around on the map. The median household income (census-tract data) and reported home values tend to increase as the saturation of low-deductible policies increases. The charts show other variables as well as the position of the map changes: average premium, average coverage amounts, and average marginal cost for lower deductibles.\n\n## Some technical notes\n\nThe map plots 93,541 policies with geographical precision down only to the census tract for anonymizing purposes. It is a MapBox GL JS application with three added data layers: the individual red and blue points plotting location and density, red and blue circles as you zoom in plotting location, density, and the cost of the premiums, and a clustering layer, also as you zoom in, which shows how many policies occupy the same spot—in this case the same census tract.\n\nThe charts adjust as the map is adjusted so that data only from within the bounds of the map's current position is factored in. Several of the charts are plotted according to z-score, or the number of standard deviations from the mean. This way, average is midway across the chart and individual charts are roughly comparable with each other. A longer bar always means a  higher value, relative to the others in the same set.",snippet:"This map plots 93,541 flood policies and characterizes them as either high- or low-deductible plans.",tags:[s,n],heroImage:{metadata:{tags:[],concepts:[]},sys:{space:{sys:{type:a,linkType:b,id:c}},id:"3ih8Fwv7znEgBXjAfAu3Ht",type:k,createdAt:$,updatedAt:$,environment:{sys:{id:d,type:a,linkType:e}},publishedVersion:t,revision:g,locale:f},fields:{title:"map showing the binned locations of flood insurance policies along the North and South Carolina coast",description:"Nearly 80 percent of policyholders along the Georgia \u002F South Carolina coast opted for low deductibles.",file:{url:"\u002F\u002Fimages.ctfassets.net\u002F3qr5d6sj491p\u002F3ih8Fwv7znEgBXjAfAu3Ht\u002F07539a3a921412823cf923d02d6b7888\u002Fsc-georgia.png",details:{size:121702,image:{width:730,height:464}},fileName:"sc-georgia.png",contentType:l}}}}}],limit:100,total:t},uses:{dependencies:w,params:["type"],parent:w,url:w}}]}}("Link","Space","3qr5d6sj491p","master","Environment","en-US",1,"Entry","ContentType","project","Asset","image\u002Fpng",2,{},{},"tag","",13,{},10,"workplace",7,void 0,"data",null,"2023-04-27T00:20:49.924Z","2022-08-16T18:06:39.050Z","2022-08-14T20:57:53.919Z","2022-07-25T18:21:18.957Z","2023-04-27T00:23:50.641Z",3,"2023-04-26T18:16:04.171Z",14,"2022-08-16T17:11:11.708Z","2022-08-16T17:09:03.800Z","2022-08-16T17:10:23.298Z",9,"2022-08-16T17:15:06.755Z",{},"2022-08-16T17:14:17.394Z","2022-08-16T17:14:44.403Z","2022-08-16T18:08:36.444Z","2022-08-16T18:08:13.476Z","2022-08-16T18:15:11.279Z","2022-08-16T18:14:29.669Z","2022-08-16T18:29:20.434Z","2022-08-16T18:27:55.109Z","2022-08-16T15:37:59.537Z","2022-07-25T18:21:56.083Z","2022-08-16T15:36:38.943Z","2022-08-16T18:23:06.306Z","2022-08-16T18:22:05.216Z","2022-08-16T18:40:31.762Z","2022-08-16T18:35:52.775Z"))