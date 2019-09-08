---
layout: post
type: project
title:  "The 2017 Commitment to Development Index"
modified: 2017-10-11
categories: project
image: "cdi-2017-example.png"
tags: ['dataviz','front-end','PHP', 'Chart.js']
repo: 'commitment-development'
featured: true
contact: true
redirect_from: "/project/2016/08/19/commitment-to-development-index/"
---
<p></p>
**Updated September 5, 2017**

The [Commitment to Development Index][commitment-development-index] ranks the world's 27 richest countries on policies that affect the development prospects of poorer nations. The countries are ranked on seven components—aid, finance, technology, trade, environment, security, and migration—each with a variety of indicators. 

## User-facing improvements

The 2017 version is a modest update of the major revision I performed last year. These are  biggest user-facing improvements this year:

* more informative bar graphs
* better handling of null data
* better visual explanation of indicators for which low scores are better than high

I'll illustrate the first point. My colleagues at the Center for Global Development wanted the bar charts visualizing a country's performance on an indicator to do a better job showing how that country compared to others. Here's how they looked in the 2016 version:

{% include figure.html src="/assets/cdi-denmark-aid-2016.png" alt="CDI bar charts from 2016"  caption="Two aid-indicator bar charts for Denmark from 2016" %}

The bars faithfully show the country's indicator score and give some indication of where the scores fall within the range of worst to best score. But that indication is inexact at best; in some cases, it's misleading.

Here are the same bar charts for the same country (Denmark) for 2017:

{% include figure.html src="/assets/cdi-denmark-aid-2017.png" alt="CDI bar charts from 2017"  caption="Two aid-indicator bar charts for Denmark from 2017, with contextual information" %}

Each bar chart now includes the median score and scores of all other countries as context, and that makes the charts much more informative. Imagine the *maximizing efficiency* chart without the contextual markings: you'd think that Denmark performed poorly since the bar extends only about 40 percent of the available space. But with the context, it's clear that Denmark's score is better than the median and, in fact, did relatively well.

## Behind-the-scenes improvements

There are several behind-the-scenes improvement as well, such as modifications of and additions to (from the researchers) some of the indicators behind the seven components. One improvement I'm excited about, and which will be important to future me and other maintainers of the CDI, is a change to how the data behind the tool is generated. The researchers behind the Commitment to Development Index use Google Sheets to store and calculate all the data for  subindicators, indicators, components, and final scores. The original tool, however, was built to read in data server-side from a long and hierarchical  XML document, and getting the data into that XML had been a painstaking task. To make that task much easier, I created a separate in-browser app to run locally that uses the Google Sheets API to read in data from a spreadsheet and generate the corresponding XML in the format the tool already expected. It took some time to create the app, but the time it saved in automatically responding to data changes more than made up for it.

**Original post (January 16, 2017)**

The [Commitment to Development Index][commitment-development-index] ranks the world's 27 richest countries on policies that affect the development prospects of poorer nations. The countries are ranked on seven components—aid, finance, technology, trade, environment, security, and migration—each with a variety of indicators. The results are communicated through a data-rich visualization, which I had the pleasure of developing, on top of the 2015 work of [Creative Science][creative-science].

{% include figure.html src="/assets/cdi-2016-screenshot.png" alt="The 2016 Commitment to Development Index"  caption="The 2016 Commitment to Development Index." %}

Finland comes out on top of the latest CDI, with Denmark and Sweden as runners-up. The United Kingdom is ninth, and the United States is 20th. For more on the content of the CDI and what's new in the latest edition, check out [Owen Barder's blog post][cdi-blog]. I'll describe here some of the improvements in the data visualization itself.

## It's fully responsive!

The new CDI is fully responsive, working as well on mobile screens as on large desktop displays. A handful of CSS breakpoints, dictated more by the content than by arbitrary screen sizes, make sure the visualization is always optimized for the user's device. The menu of the seven components was a particular challenge since it takes up a huge portion of the screen when slimmed down to a single column. My solution was to provide mobile users with the option to hide the menu when it's in their way and bring it back they need it.

{% include figure.html src="/assets/cdi-2016-mobile.png" alt="The 2016 Commitment to Development Index on mobile" class="figure-small" caption="On mobile: the 2016 Commitment to Development Index." %}

## It invites more interaction

Perhaps the most noticeable improvement in the updated tool is that visitors can change the weight of each component and see how that affects the overall scores and rankings. The default (and official) rankings weight all components equally after adjusting for the amount of variation in each. With the adjusters, visitors who believe, for instance, that migration policies are more important than security policies can see exactly how that choice would affect the results of the CDI. The tool recalculates the scores and rankings on fly.

{% include figure.html src="/assets/cdi-2016-adjust.gif" alt="Adjusting weights on the 2016 Commitment to Development Index"  caption="Adjusting weights on the 2016 Commitment to Development Index." %}

## It has improved navigation

The revised tool simplifies the choices users need to make to see more information. One first step (clicking on a country's name or its row) displays a quick summary of a country's performance and provides options to see year-on-year trends or a detailed country report. It's a better funnel or engagement chain than providing several disjointed options up front.

The new tool also accommodates different navigation styles: you can either click from component to component in whatever order you want or follow the prompts to move forward. The analytics show that both methods are being used.

One last thing on navigation within the tool: the changes in views are animated, with rows expanding over a period of milliseconds and text fading in and out. This sort of animation is not merely embellishment; it substantially helps users understand what happens when they take action.

{% include figure.html src="/assets/cdi-2016-navigate.gif" alt="Navigating the 2016 Commitment to Development Index"  caption="Navigating the 2016 Commitment to Development Index." %}

## It's accessible to keyboard users

The web is meant to be accessible to all users, and basic webpages (think text with hyperlinks and images that have proper alt tags) are accessible by default. But more complicated webpages, such as the CDI, with custom interactive elements and a lot of JavaScript often break that built-in accessibility. As a result, a lot of the web is inaccessible to people who don't use a mouse. Every action that you can take on the CDI with a mouse is also available by keyboard. That makes it a better tool for everybody.

## It has a ton of social sharing opportunities

Every country's result overall and on each of the seven components is ready to be shared on Facebook or Twitter, giving users the ability to quickly share the part of the CDI that most interests them.

## About the code

The tool is built on a Backbone.js framework with help from chart.js for rendering drill-down graphs. Server side, the tool parses a data from an XML file into JavaScript objects for use on the client side.

I welcome any feedback you may have. Please send me a note [on github][github] or by using the contact form below.

[commitment-development-index]: http://www.cgdev.org/cdi
[creative-science]: http://creativesci.co
[cdi-blog]: http://www.cgdev.org/blog/2016-commitment-development-index-rankings-how-all-countries-can-do-more-protect-global
[github]: https://github.com/ostermanj
