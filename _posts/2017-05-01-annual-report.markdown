---
layout: post
type: project
title:  "Interactive annual report, 2016"
categories: project
image: "annual-report.png"
tags: ['publications','dataviz','D3','Drupal','PHP']
link: 'https://www.cgdev.org/annual-report/2016'
featured: true
---

Annual reports cost a lot of money, and if your annual report is primarily a print product, you're going to have a hard time knowing whether all that paper, ink, and treasure was worth the expense.

That's one reason why many organizations have pivoted toward digital-first annual reports in the past, say, five to seven years. With standard web analytics, you *know* if people are reading it, and how much of it. That's valuable, and it can help you do better year after year.

Perhaps more important, digital-first annual reports allow a different kind of storytelling, one that's probably more consistent with how you tell your other stories throughout the year—with videos, data visualizations, and direct links into your work. They find readers where they already are—on their phones, laptops, Facebook, or Twitter.

<span class="tweet-this">
Paper reports end up in the recycling bin.
</span>

For their [2016 annual report](https://www.cgdev.org/annual-report/2016), the Center for Global Development opted to create print and digital versions. The print version weighed in at 14 pages, finding a middle ground between the shorter brochures of recent years and the behemoth 50-pagers of years past. I designed the digital version to mirror the design of the print with additions possible only in the digital realm. Highlights include an interactive data visualization of the year's work that drills down into topics and links to content, animated scroll navigation through sections, and animated pull quotes to punctuate the reading.

{% include figure.html src="/assets/annual-report-dataviz.gif" alt="Data visualization: content by topic"  caption="Annual report data visualization: content by topic." %}

The template, design, and functionality of the report are custom made, but the content is fully integrated into the website's Drupal CMS. That means in-house content editors can make changes, big or small, as they would with any other piece of content on the website. At base, the annual report is simply a publication like any other. My custom Drupal module registers a template that finds the full content of the publication and renders it, bare-bones, to the front end, where the client-side scripts handle the styling and interactivity. The data visualizations are in D3 and the animations rely on a [lightweight scrollMonitor library](https://github.com/stutrek/scrollMonitor).