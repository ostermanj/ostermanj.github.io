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

A work in progress, currently in very early stages, that will allow exploration of ACS data on health coverage in America. Right now it's mostly a proof of concept of the map portion of the exploration.

## Some coding details

The data's coming from the US Census's API joined locally to a map layer hosted by MapBox. The data and map are loaded concurrently; when both promises resolve, the map layer is added and styled according to the data. The legend is created dynamically from the data (i.e. it is not hard coded). Colors are interpolated via the [D3 scale chromatic plugin](https://github.com/d3/d3-scale-chromatic).

More to come! Works only on up to date browsers for now.

<iframe style="width:100%;height:500px" src="http://osterman.io/health-insurance-map/"></iframe>