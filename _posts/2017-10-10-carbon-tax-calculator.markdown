---
layout: post
type: project
title:  "Interactive projections of greenhouse gas emissions and carbon tax revenue"
categories: project
image: "carbon-calculator.png"
tags: ['D3', 'dataviz']
link: 'http://www.rff.org/blog/2017/introducing-e3-carbon-tax-calculator-estimating-future-co2-emissions-and-revenues'
repo: 'carbon-price-calculator'
featured: true
---

<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="/calculator-revised/js/d3-tip.js"></script>
<link rel="stylesheet" type="text/css" href="/calculator-revised/css/styles.css" />
<link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet" />
<style>
    #carbon-calculator h2 {
        top: 0;
    }
    #carbon-calculator .margins h3 {
        color: #051839;
    }
    #summary-stats h2 {
        color: white;
    }
</style>

<div id="carbon-calculator">
<h2 class="no-margin">Effects of carbon tax on emissions and revenue</h2>
<div class="margins">
  <div class="dropdowns">
    <div class="flex-container">
      <label id="price-label" class="attention" for="price-selector">Select carbon tax</label>
      <select class="grow" id="price-selector">
          <option selected disabled hidden value="">— select tax —</option>
          <option value="5">$5 / metric ton CO&#8322;</option>
          <option value="10">$10 / metric ton CO&#8322;</option>
          <option value="15">$15 / metric ton CO&#8322;</option>
          <option value="20">$20 / metric ton CO&#8322;</option>
          <option value="25">$25 / metric ton CO&#8322;</option>
          <option value="30">$30 / metric ton CO&#8322;</option>
          <option value="35">$35 / metric ton CO&#8322;</option>
          <option value="40">$40 / metric ton CO&#8322;</option>
          <option value="45">$45 / metric ton CO&#8322;</option>
          <option value="50">$50 / metric ton CO&#8322;</option>
      </select>
    </div>
    <div class="flex-container">
      <label id="rate-label" class="attention" for="rate-selector">Select tax growth rate</label>
      <select class="grow" id="rate-selector">
        <option selected disabled hidden value="">— select growth rate —</option>
        <option value="0">0% above inflation</option>
        <option value="0.01">1% above inflation</option>
        <option value="0.02">2% above inflation</option>
        <option value="0.03">3% above inflation</option>
        <option value="0.04">4% above inflation</option>
        <option value="0.05">5% above inflation</option>
      </select>
    </div>
  </div>

  <div class="flex-container space-around">
    <div class="chart-wrapper grow shrink">
      <h3>Annual emissions</h3>
      <div id="container"></div>
    </div>
    <div class="chart-wrapper grow shrink">
      <h3>Annual gross revenue</h3>
      <div id="container-2"></div>
    </div>
  </div>
</div>
<div id="summary-stats" class="not-calculated">
  <h2 class="no-margin"><span class="when-calculated-only">Cumulative results</span><span class="bind-text attention">Select a tax and growth rate to see cumulative results</span></h2>
  <div class="flex-container space-around">
    <div id="summary-emissions" class="summary flex-container grow">
      <div class="summary-icon">
        <img src="/calculator-revised/files/emissions.svg" />
      </div>
      <div class="summary-data grow">
        <h2>Emissions reductions,<br />2018&ndash;2030</h2>
        <span class="bind-total">XX.X billion metric tons</span>
      </div>
    </div>
    <div id="summary-revenue" class="summary flex-container grow">
      <div class="summary-icon">
        <img src="/calculator-revised/files/revenue.svg" />
      </div>
      <div class="summary-data grow">
        <h2>10-year gross revenue,<br />2018&ndash;2027</h2>
          <span class="bind-total">$X,XXX billion ($2018)</span>
      </div>
    </div>
  </div>
  <p class="credits no-margin">Icons from the Noun Project. Emissions created by Francesca Ameglio; revenue by Agniraj Chatterj (CC BY 3.0 US).</p>
</div>
</div>
<p></p>

This interactive shows how much revenue different levels of carbon taxes would produce and how much greenhouse gas emissions they would save over time. It is based on "a large-scale, computable general equilibrium (CGE) model of the US economy." For more information on the model itself, please see [the blog post introducing the calculator](http://www.rff.org/blog/2017/introducing-e3-carbon-tax-calculator-estimating-future-co2-emissions-and-revenues) by Marc Hafstead at Resources for the Future.


The calculator shows the effects of carbon taxes ranging from $5 to $50 per metric ton of CO&#8322; at annual growth rates ranging from zero to five percent above inflation. It has two sources of data: the projected revenue and the projected emissions reduction from each combination of base tax rate and percentage increase. The selected values are shown against a baseline of there being no carbon tax. Other values are calculated by the tool: cumulative emissions savings from 2018 to 2030, 10-year gross revenue (2018–2027), and comparison of annual emission to 1995 levels.

## The code

The graphs are made using D3 v4. It is fully responsive. The SVGs themselves are fluid with no set width (they take the width of the element containing them) so that they shrink at narrow screen sizes. The development environment was ES6 JavaScript linted by jshint and compiled by Babel (via Grunt, with help from Browserify).

<script src="/calculator-revised/js/scripts.js"></script>