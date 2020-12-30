---
layout: post
type: project
title:  "Telling the story with animated graphs"
categories: project
image: "animate-highchart.png"
tags: ['Highcharts','dataviz']
repo: 'carbonTaxResources'
link: 'http://www.rff.org/research/publications/carbon-pricing-us-electricity-sector-now-more-effective-and-less-expensive'
contact: true
autoplace: true
---

If you need your data viz to tell a story, animating it may be the best way to go. By breaking the graphic into sequential frames, each building off the other, you can help your audience understand what might have been a difficult message.

The *New York Times* does this really well, as they did recently with their [interactive about competing tariffs](https://www.nytimes.com/interactive/2018/07/11/business/trade-war.html) between China and the United States. 

{% include figure.html src="/assets/nytimes-graph.png" alt="New York Times animated graph"  caption="This animated force-directed graph tells the story with minimal effort or input required from the user to interact with it." %}

By pairing the graphic with a narrative describing each step along the way, they turned what could have been a confusing force-directed graph into a clear presentation of the tit-for-tat tariffs each country's imposing on the other. It requires minimal effort from the user.

That's the idea behind my recent animated graphs for [Resources for the Future](http://www.rff.org). The graph—actually there are two: the one pictured here below electricity demand and another about natural-gas prices—has four series of data, the actual historical data and three series of projections. Normally, all would be shown together, statically, and it would be up to the viewer to interpret the legend or labels and then decipher  the static illustration of change over time. The animation makes the implicit time dimension explicit and easier to understand. The annotations ensure that your message is being conveyed.

{% include figure.html src="/assets/demand.gif" alt="An animated Highchart line graph"  caption="The animation makes the implicit explicit and easier to understand. The annotations ensure that your message is being conveyed." %}

## Some technical notes

The code for this chart and its siblings is available on [GitHub](https://github.com/ostermanj/carbonTaxResources). The setup is to take an array of Highcharts configuration options, extended to meet the needs of this application, and create the charts based on the individual configurations. The animation is effected by replacing each series' data with null values that are programmatically resupplied with actual data. The Highcharts library takes care of the transitions. 