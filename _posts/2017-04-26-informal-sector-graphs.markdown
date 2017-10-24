---
layout: post
type: project
title:  "Graphing World Bank Enterprise Survey data"
categories: project
image: "informal-sector.png"
tags: ['dataviz','D3']
link: 'https://www.cgdev.org/publication/note-informal-sector'
featured: true
custom_css: informality
contact: true
---

This is a suite of graphs I made for researchers at the Center for Global Development analyzing the differences between formal and informal businesses. The data is from World Bank Enterprise Surveys and CGD's analysis.

For the technically minded, the graphs are built on D3 v4 with animations triggered by [this lightweight scroll monitor](https://github.com/stutrek/scrollMonitor) (triggered when a graph enters the viewport). The animated scrolling, when you select a button under contents or click back to the contents, is handled by a D3 tween function and JavaScript's native scrollTo method.

The charts are featured in CGD's publication, "[A Note on the Informal Sector](https://www.cgdev.org/publication/note-informal-sector)."

{% include informality.html %}

<!-- scripts for D3, D3-tip, and the visualizations -->
<script src="{{ site.baseurl }}/informality/js/scrollMonitor.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/4.4.1/d3.min.js"></script>
<script src="{{ site.baseurl }}/informality/js/d3-tip.js"></script>
<script src="{{ site.baseurl }}/informality/js/informality-scripts.js"></script>