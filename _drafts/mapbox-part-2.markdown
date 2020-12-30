---
layout: post
type: blog
categories: blog
title: "How I make using Mapbox easier, part two: accessing data with dummy features"
image: "mapbox-dummy-feature.png"
tags: ['dataviz', 'maps']
contact: false
featured: true
alt: Map of the Bay Area, California, with a purple rectangle on top
---

As I've [said before](/blog/2020/12/29/mapbox/), I really like using Mapbox for visualizing geographic data, but it does have a few things I stumble over again and again. One of those things is trying to access the entirety of a dataset that's behind map features that have not fully rendered. I'll explain what I mean about that in a moment; one of the solutions I've found, to cut to the chase, is to attach the data I need to a dummy feature that I know will render when the map loads.

 {% if page.image %} 
  <img class="page-image {% if page.type == 'project' %}project-image{% endif %}" src="/assets/{{ page.image }}" alt="{{page.alt}}"/>
{% endif %}

## Some explanation
There are basically two ways to supply the data you are visualizing to Mapbox: 1) you can do it when your code is executed by supplying the Map instance's `addSource()` method with geoJSON data, whether literally (i.e., passing the geoJSON object directly), by reference, or by supplying a url to it or 2) you can supply the data beforehand, behind the scenes, by uploading data to Mapbox Studio or using its tiling service. When you supply the data beforehand, Mapbox converts it into a tileset, a collection of data ready to be loaded into a map at a range of zoom levels. When you `addSource()` to the map, you point instead to the ready-made tileset. (You can also upload the data to Mapbox Studio as a dataset, which you can later convert to tilesets.)

I prefer to upload or tile-service the data beforehand rather than handle potentially very large geoJSON objects client-side and expend the resources and milliseconds (or seconds) needed to convert that data into tiles on every page load, every time someone visits the page. If the data is static, why perform those operations over and over again?

## The problem
If you're only rendering features on a map and only displaying or inspecting or otherwise making use of the data properties of those features after they are rendered—for example, by clicking or hovering over locations—the above method of not handling the data client-side will be fine. But if you would like to also display data beyond the context of the map, such as summary stats or bar graphs in a sidebar, you may find that you don't have access to all the data points in the tileset because not all of the features have been rendered. Features may be outside the current bounds of the map, or they may be too densely packed to show at your current zoom level. So if you wanted to, for example, display a bart chart showing the number of the various kinds of, say, donut shops in your city, you would not reliably be able to get the full dataset using the `queryRenderedFeatures()` method, which is, as far as I know, the only way to retrieve the data from a tileset.

## How to solve it
One solution is to simply provide the full dataset to Mapbox and keep a preprocessed summary of it—counts, means, median, variance, deviation, whatever—client side. That client-side data can be rendered into the charts. That's fine; I've done it this way and probably will again. For a recent project, though, I needed something else. For this app, visitors would have to authenticate and we needed to keep all the data behind the authentication wall. Giving authenticated access to Mapbox (via a temporary access token) was already in the cards; rather than build out another protected resource for the summary data, I decided to provide it to Mapbox and attach it to a dummy feature, a large but transparent (fully transparent, mind you—not purple as in the image below) rectangle covering the geography of the initial map load. That way, summary data would only be exposed in the client after a user authenticated and had credentials to access the Mapbox data. I also liked the simplicity of it, having one source of data rather than two. 