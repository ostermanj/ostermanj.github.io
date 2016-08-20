---
layout: post
title:  "2016 Commitment to Development Index (in progress)"
date:   2016-08-19 15:39:06 -0400
categories: portfolio
image: "cdi-2016.png"
tags: ['dataviz','Backbone.js','MCV framework']
---

The [Commitment to Development Index][commitment-development-index] ranks the world's 27 richest countries on policies that affect the development prospects of nations. The countries are ranked on seven components—aid, finance, technology, trade, environment, trade, security, and migration—each  with a variety of indicators. The current tool, built originally by [Creative Science][creative-science] in 2015, allows users to drill down into each component and their indicators, see trends over time, and compare countries to one another. The tool parses data from an XML file into JavaScript objects and is built on a Backbone.js framework with help from chart.js for rendering drill-down graphs.

In 2015, I modified the tool to better handle the display of negative values and to force all line graphs to be on the same vertical scale, especially important when comparing two countries. My job now, for the 2016 edition, is to add the ability for users to adjust the weights of the seven components, which by default are weighted equally, and see the effects the adjustments have on the overall scores. This functionally will allow users—including policymakers in countries that use the CDI to benchmark their performance—an additional way to interact with the data and express their own convictions about what policies are most important for development.

Look for the updated tool to go live in September 2016.

[commitment-development-index]: http://www.cgdev.org/cdi
[creative-science]: http://creativesci.co