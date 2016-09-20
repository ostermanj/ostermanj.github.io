---
layout: post
title:  "Interactive datatable of scraped OPIC data"
date:   2016-04-21 15:37:06 -0400
categories: portfolio
image: "datatable.png"
link: 'http://www.cgdev.org/media/opic-scraped-portfolio-dataset'
tags: ['datatable', 'jQuery']
---

Researchers at the Center for Global Development had scraped data from the Overseas Private Investment Corporation and needed a way to make the data available and present it in a user-friendly way. No real visualization was needed, so we settled on a [datatable presentation]({{ page.link }}) that would allow usrs to sort the data and browse through it with custom filters.

[Datatable.js][datatablejs] is the platform I use for this. With its simplest implementation, you link to this jQuery plugin, and it finds any HTML table with the proper classname and converts it to a sortable datatable. This data set, however, was more complicated. For one, having a 1,500-row table in the DOM was not really an option; second, the custom filtering and display requirements brought some of the more advanced features of the platform into play.

Almost everything in this tool in handled client-side. The data really isn't *that* big, at least not so big that it can't be handled as one JSON object. The JavaScript defines the data, identifies the columns, and handles the filtering events. The ready-built platform handles the rest. It's a great tool: easy to use in simple forms and completely extensible for more advanced applicatons. Great documentation, too.

[datatablejs]:https://datatables.net/
