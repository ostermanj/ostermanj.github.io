---
layout: post
title:  "2016 Commitment to Development Index (in progress)"
date:   2016-08-19 15:39:06 -0400
categories: portfolio
image: "CDI-proto-2016.gif"
tags: ['dataviz','Backbone.js','MCV framework']
repo: 'commitment-development'
featured: true
---

The [Commitment to Development Index][commitment-development-index] ranks the world's 27 richest countries on policies that affect the development prospects of nations. The countries are ranked on seven components—aid, finance, technology, trade, environment, trade, security, and migration—each  with a variety of indicators. For the 2016 edition, I'm adding the ability for users to adjust the weights of the seven components, which by default are weighted equally, and see the effects the adjustments have on the overall scores. Other improvements include better responsiveness for mobile and tablets, more animation, more social-sharing opportunities, and better data visualizations.

The current tool, built originally by [Creative Science][creative-science] in 2015, allows users to drill down into each component and their indicators, see trends over time, and compare countries to one another. The tool parses data from an XML file into JavaScript objects and is built on a Backbone.js framework with help from chart.js for rendering drill-down graphs.

Look for the updated tool to go live in September 2016.

[commitment-development-index]: http://www.cgdev.org/cdi
[creative-science]: http://creativesci.co