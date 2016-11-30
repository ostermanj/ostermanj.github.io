---
layout: post
type: blog
categories: blog
title: "Four questions to ask about your data visualization"
image: "charts-image.png"
tags: ['data viz', 'content strategy','digital strategy']
contact: true
---

If charts and data visualizations are part of your content strategy, you know there's a ton of advice out there about how to do them well. At the very least, you should ask yourself four questions about "the AIMS" of each piece.

1. Is it accurate?
2. Is it intuitive?
3. Is it memorable?
4. Is it self-contained? 

Now some of the best data visualizations won't have positive answers to all of these questions, and that's fine (one hopes #1 and #3 are always yeses). But if your data viz is meant to convincingly convey a message, meeting these four criteria will help it do so quickly and effectively. 

## Is it accurate?

Step one is to make data visualizations that faithfully represent the data. The value of that statement shouldn't need explanation, but it's very easy through intentional or unintentional design decisions to degrade a chart's accuracy. 

<span class="tweet-this">
An accurate chart should tell the truth, the whole truth, and nothing but the truth.
</span>

Don't let embellishments or unnecessary effects take away from (or add to) your charts.

**Rule-breaker #1, [from copyhackers.com](https://copyhackers.com/2016/02/short-long-content/):**

{% include figure.html src="/assets/copyhackers-chart.png" alt="An inaccurate chart" class="" caption="3D effect obscures what the precise values are. Truncated y-axis (min value = 90) exaggerates the difference between the two values. Little need to visualize two values anyway." %}

**Better:** a bar chart with a zero-based axis and no 3D effects, or no chart at all. 

## Is it intuitive?

Intuitive charts have visual elements that immediately match the main message by making use of established conventions or primary visual metaphors.

The example below from the World Bank has a lot going for it, but there's dissonance between the title's message of growth and the primary visual of flat lines. We expect to see something going up. By bucking some fundamental conventions and primary visual metaphors (e.g., that size is usually represented vertically and time horizontally), the chart requires additional effort to understand. 

**Rule-breaker #2, [from the World Bank](http://blogs.worldbank.org/opendata/chart-25-years-growth-worlds-largest-cities):**

{% include figure.html src="/assets/world-bank-chart.png" alt="A nonintuitive chart" class="" caption="Flat lines not intuitive for notion of growth. We expect time to be along the horizontal axis. The colors selected for the years are also counterintuitive. The movement in time from dark dots to light dots also bucks expectations. Light to dark would be more intuitive." %}

**Better:** A line chart or [slope graph](http://www.visualisingdata.com/2013/12/in-praise-of-slopegraphs/) are good candidates. With the emphasis being the difference between two endpoints and not all the values in between, a slope graph would be best.

## Is it memorable?

To be intuitive, we use conventions. To be accurate (and nothing but accurate), we strip out the superfluous. But it turns out that [visualizations with more "chart junk" (like illustrations and other nondata elements) are more memorable](http://hci.usask.ca/publications/view.php?id=173). 

It makes sense that unusual elements would make a chart more memorable, but how can you embrace being memorable without compromising the other aspects of effective data visualization?

I wouldn't reach too quickly for the clip art or brazen illustrations. Consider instead using small icons to help illustrate your data and, at the very least, make sure your charts are consistent with your brand's style so that people are more likely to remember where they saw it. The chart below would benefit from both.

**Rule-breaker #3, [from the Peterson Institute for International Economics](https://piie.com/blogs/china-economic-watch/tracking-chinas-service-sector):**

{% include figure.html src="/assets/peterson-chart.png" alt="A nonmemorable chart" class="" caption="Default fonts. Minimal branding. Not memorable." %}

**Better:** Small icons for highway, railway, and air transport would help make this chart more memorable, and identify the lines more quickly than the legend. Brand colors are present, but brand-appropriate typeface and a logo would help it linger in the mind longer.

## Is it self-contained?

Self-contained data visualizations convey their main messages quickly even when they're separated from their original contexts. This is good for two reasons: first, many of your readers are [only scanning what you write](/blog/2016/11/09/writing-web-embrace-skimming-scanning/) and won't get much from charts and graphics that don't quickly convey messages on their own. That's a missed opportunity to get your point across.

Second, self-contained data visualizations are ready for posting on social media or as standalone content on your website. From one blog with three charts, for example, you get four pieces of content with no additional work.

How to make a chart self-contained depends on the information being conveyed, but the cardinal rule is this:

**The chart's title should be a statement of the main message.**

If you can build the chart to the dimensions used by various social media (roughly 2:1 for Facebook, Twitter, and LinkedIn), even better—it'll look great on your website and in my Twitter feed.

**Rule-breaker #4, from [Resources for the Future](http://www.rff.org/research/publications/ten-recommendations-plugging-gaps-inactive-well-policy):**

{% include figure.html src="/assets/rff-chart.png" alt="A non-self-contained chart" class="" caption="Good dimensions for social media, but not self contained." %}

Without the context we lose sight of what the chart is about (spent oil wells) and the main points: that while Alaska's and North Dakota's regulations are more stringent that the Bureau of Land Management's,  "no state is regulating all five elements [of ensuring the safety of spent oil wells] the most stringent way." 

**Better:** A new title—**&ldquo;Two states outperform the Bureau of Land Management but regulation of spent oil wells is poor overall,"** or something similar. With that, the chart would communication much more quickly and be able to stand on its own on social media and elsewhere.