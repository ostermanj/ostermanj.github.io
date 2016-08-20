---
layout: post
title:  "Single-page app for digital-first publications"
date:   2016-04-12 15:38:06 -0400
categories: portfolio
image: "more-than-lightbulb.png"
tags: ['publication design','AngularJS','dataviz']
link: 'http://www.cgdev.org/app/reader/3124016'
---

This project solved two main problems: how to serve up a full-length policy report quickly enough to satisfy mobile users, especially those coming from social referals, and how to develop a digital-first, interactive product relatively easily without changing the researcher's own established processes. Before this, I'd had good success serving up short publications such as briefs as single-column  full text with interactive graphs and pullquotes as needed, but that solution wouldn't work well for long reports with lots of assets  needing to be loaded. Too long, too boring, and too slow to load.

There would have been other ways to solve these problem such as extending the functionality of the CMS to handle multipage, interactive reports, but the single-page app provided a good balance of providing a good user experience and allowing me full control full control without breaking the development budget. Faced with similar tradeoffs, some organizations have abondoned their platforms altogether for products of this type, opting instead to post reports on third-party platforms such as Medium. There are good reasons to do this—why struggle to bring readers to you when you can go to them?—but with your own platform you have full control and can better integrate with your site's goals and related content.

In any case, the single-page app I made for the Center for Global Development is built on AngularJS, and the hard work's already been done. That's the main advantage. Subsequent reports need only to be converted straight from Word to HTML (using a third-party cleaner), run through a script that does some work on pullquotes and footnotes, and uploaded to the server. A manifest file provides some metadata and tells the app where to look for the files, and that's it. Any interactives of course need to be built and included in the chapters.

Printing the online report to PDF through customized print CSS definitions creates the paper-ready version for those who will want hard copies. In this way, the HTML is the master source for print and online versions of the report, meaning there's just one place to make any corrections and revisions. That's a huge time saver.