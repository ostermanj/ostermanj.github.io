---
layout: post
type: project
title:  "Work in progress: Mapping ACS data on health insurance coverage"
categories: project
image: "health-insurance-map.png"
tags: ['maps', 'MapBox','data viz']
repo: 'health-insurance-map'
link: 'http://osterman.io/health-insurance-map/'
featured: true
contact: true
---
<p></p>

**Update Nov 7, 2017**

The app now shows three separate mapBox maps so that the continental US, Hawaii, and Alaska all appear at the same time. Actions on one map are connected to reactions on the others. The code is now making use of some mapBox helper functions to simplify adding sources and layers and which return Promises when the desired mapBox action has completed. I may sping the helper functins into a separate repository.

Next up: adding charts to the sidebar.

**end update**

A work in progress, currently in very early stages, that will allow exploration of ACS data on health coverage in America. Right now it's mostly a proof of concept of the map portion of the exploration.

## Some coding details

The data's coming from the US Census's API joined locally to a map layer hosted by MapBox. The data and map are loaded concurrently; when both promises resolve, the map layer is added and styled according to the data. The legend is created dynamically from the data (i.e. it is not hard coded). Colors are interpolated via the [D3 scale chromatic plugin](https://github.com/d3/d3-scale-chromatic).

More to come! Works only on up-to-date browsers for now. I have not yet transpiled the JavaScript for compatibility with older syntax or put in any necessary polyfills for missing APIs.

<iframe style="width:100%;height:500px" src="http://osterman.io/health-insurance-map/"></iframe>