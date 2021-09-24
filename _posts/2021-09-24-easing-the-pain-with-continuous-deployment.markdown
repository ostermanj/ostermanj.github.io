---
layout: post
type: blog
title:  "Easing the pain with continuous deployment"
categories: blog
image: 'vistas.jpg'
tags: ['devops', 'AWS', 'Azure', 'GitHub']
featured: true
autoplace: true
---

Getting better at coding, for me, comes in fits and starts. That's true for my command of a language but especially so for my devops set-up. Once I settle on and fine tune a configuration, I tend to stick with for a while. It takes a lot of work to get it right, so the payoff for changing it has to be high.

For instance: I've been using [Webpack v4][1] to bundle my code for three and a half years. In the meantime version 5 has come out as have other "next generation" bundlers like [Parcel][2], [Snowpack][3], and [Vite][4]. They promise some combination of faster builds, smaller bundles, and easier configuration. All good things! But while the payoff/pain tipping may come soon,  I'm not yet there. Maybe there'll be a personal project to test the waters.

One thing, however, that has really eased the pain and opened vistas recently is setting up continuous deployment. That may mean different things to different people, but in my work it means connecting one or more workflow environments directly to repository branches and setting up automatic builds so that those deployed environments always match the current codebase.

At Pew, for instance, I set the deployed GitHub pages version of a project to always match the `preview` branch of a repo. I can share that link with coworkers and always be sure what they see there is up to date simply by pushing `preview` to GitHub. This is made possible by GitHub actions and adding a `node.js.yml` file to the `.github/workflows/` directory of the repo.

Deploying my front-end Pew work to production isn't so simple unfortunately and is not automated. The features I make have to be embedded in a page of the website and that is handled manually in the site's CMS.

For other work, though, I do have more automated workflows with AWS in one case and Microsoft Azure in another. MS Azure is home to the serverless back end for an upcoming Pew project's database and NodeJS functions. I have continuous deployment set up there so that Azure automatically builds and deploys any push to the `stage` branch of the repo. Deploying directly to production is warned against so I instead follow Azure's recommendation of "swapping" slots of the serverless functions. Push to `stage`, allow the automatic build to happen, and then swap the production slot for the stage slot. This ensures that the update is made smoothly and that the instance is still hot, should people be visiting the site at the time the swap is made.

AWS is home to a side project on the energy efficiency of properties throughout the service areas of certain power companies. There's a lot going on there: S3 buckets for static files, Cognito for user authentication, Pinpoint for sending SMS message, some Lambdas, and more. The app itself is hosted in AWS Amplify, which has pretty easy (at least by AWS standards!) configuration for continuous deployment. The site has two live environments: dev and production. Any push to the `dev` branch triggers a build to the dev environment; pushing to `main` triggers production.

Other, larger teams (larger than this team of one), can get more sophisticated with their continuous deployment and the other aspects of CI/CD (continuous development, continuous integration). They can automate tests and merges and remove even more of the repetitive and painstaking tasks of deploying code to the web. But even small steps in that direction can make a big difference—and a happier developer.

[1]: https://v4.webpack.js.org/
[2]: https://parceljs.org/
[3]: https://www.snowpack.dev/
[4]: https://vitejs.dev/

