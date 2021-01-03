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
snippet:  Accessing the entirety of a dataset behind a Mapbox layer to display summaries of it is hard; one solution is to attach preprocessed data to a dummy feature and use that instead.
---

As I've [said before](/blog/2020/12/29/mapbox/), I really like using Mapbox for visualizing geographic data, but it does have a few things I stumble over again and again. One of those things is trying to access the entirety of a dataset that's behind map features that have not fully rendered. I'll explain what I mean about that in a moment; one of the solutions I've found, to cut to the chase, is to preprocess the data I need and attach it to a dummy feature that I know will render when the map loads.

 {% if page.image %} 
  <img class="page-image {% if page.type == 'project' %}project-image{% endif %}" src="/assets/{{ page.image }}" alt="{{page.alt}}"/>
{% endif %}

## Some explanation
There are basically two ways to supply the data you are visualizing to Mapbox: 1) you can do it when your code is executed by supplying the Map instance's `addSource()` method with geoJSON data, whether literally (i.e., passing the geoJSON object directly), by reference, or by supplying a url to it or 2) you can supply the data beforehand, behind the scenes, by uploading data to Mapbox Studio or using its tiling service. When you supply the data beforehand, Mapbox converts it into a tileset, a collection of data ready to be loaded into a map at a range of zoom levels. When you `addSource()` to the map, you point instead to the ready-made tileset. (You can also upload the data to Mapbox Studio as a dataset, which you can later convert to tilesets.)

I prefer to upload or tile-service the data beforehand rather than handle potentially very large geoJSON objects client-side and expend the resources and milliseconds (or seconds) needed to convert that data into tiles on every page load, every time someone visits the page. If the data is static, why task each client with performing those operations over and over again?

## The problem
If you're only rendering features on a map and only displaying or inspecting or otherwise making use of the data properties of those features after they are rendered—for example, by clicking or hovering over locations—the above method of not handling the data client-side will be fine. But if you would like to also display data beyond the context of the map, such as summary stats or graphs in a sidebar, you will likely find that you don't have access to all the data points in the tileset because not all of the features have been rendered. Features may be outside the current bounds of the map, or they may be too densely packed to show at your current zoom level. So if you wanted to, for example, display a bar chart showing the number of the various kinds of, say, donut shops in your city, you would not reliably be able to get the full dataset using the [`queryRenderedFeatures()`](https://docs.mapbox.com/mapbox-gl-js/api/map/#map#queryrenderedfeatures) method. 

## One harder solution
There is a viable way to use the [`querySourceFeatures()`](https://docs.mapbox.com/mapbox-gl-js/api/map/#map#queryrenderedfeatures) method, which returns source data regardless of whether it has been rendered, but you have to manage two difficulties: data behind tiles outside the bounds of your current map viewport will not be returned and the same data may be returned more than once if the feature it's attached to spans multiple tiles.

I've managed that solution for a project [mapping flood insurance programs](project/2018/04/04/flood-insurance-map/) where the sidebar graphs were meant to update to always include only data for features within the current maps bounds. If your graphs don't need to adjust according to the map bounds, there are easier ways.


## Easier solutions
One solution is to provide the full dataset to Mapbox for rendering features on the map and keep the same dataset client-side for other purposes. That doesn't sit well—you've got two sources of truth and are using up system resources unnecessarily. Another option is to keep only a preprocessed summary of the data client-side. That's fine; I've done it this way and probably will again. The heavy work of manipulating the data is done once during a build or prebuild step, so at least you're sparing the client from doing the same, repetitive data manipulation over and over again. That still gives you two sources of truth, though, and a somewhat more complex thing to maintain or update.

To keep all the data—the summary and its source—together, you can attach the summary data to a dummy feature in the tileset. A tileset of polygons scattered throughout a geographical area, for instance, could have a dummy polygon, the size of your map bounds, with the summary data attached to it as the feature's properties. Adjust its opacity to zero using a data-driven expression and there you have it. Whenever you have to update the data, you have it all in one source.

If your tileset is of points, you'll have to put the summary data in its own polygon tileset so that it can cover an area large enough to ensure that it is rendered on map load. That's not as clean but at least with everything coming as a tileset you won't be juggling multiple ways of serving up the data. Grab it with `queryRenderedFeatures()`, and you're good to go.

Thanks as always for reading. If I've missed something or got it wrong, please let me know.