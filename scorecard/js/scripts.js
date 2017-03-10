"use strict";

/*
 * Chart prototype, common to all scorecard charts
 */

var Chart = function(el) {

    var chart = this;
    this.el = el;
    this.chartMinMaxDomain();
};

Chart.prototype = {
    extendPrototype: function(destinationPrototype, obj) {
        for (var i in obj) {
            destinationPrototype[i] = obj[i];
        }
    },
    chartMinMaxDomain: function() {
        var chart = this;
        var numericValues = [];
        this.domain = [];
        model.data.forEach(function(c) {
            c.values.forEach(function(d) {
                numericValues.push(d.value);
                if (chart.domain.indexOf(d.domain) === -1) {
                    chart.domain.push(d.domain);
                }
            });
        });

        chart.domain.sort();
        this.max = d3.max(numericValues);
        this.min = d3.min(numericValues);

        this.protoSetup();
    },
    protoSetup: function() {
        var chart = this; 
        

        this.svgs = d3.select(this.el)
            .selectAll('svg')
            .data(model.data).enter()
            .append('svg')
            .attr('id', function(d) {
                return d.key;
            })
            .attr('width', this.svgWidth)
            .attr('height', this.svgHeight)
            .on('mouseover', this.hoverIn)
            .on('mouseout', this.hoverOut);


        this.svgs.append('text')
            .text(function(d) {
                return d.key;
            })
            .attr('alignment-baseline', 'after-edge')
            .attr('class', 'country-label')
            .attr('y', this.svgHeight)
            .attr('x', this.svgWidth / 2)
            .attr('text-anchor', 'middle');

        this.setup();

    },
    hoverIn: function() {
        d3.select(this)
            .select('g.circles')
            .transition().duration(200)
            .attr('opacity', 0);




    },
    hoverOut: function() {
        d3.select(this)
            .select('g.circles')
            .transition().duration(200)
            .attr('opacity', 1);
    }


};

/*
 * CIRCLE CHART CONSTRUCTOR
 */

var CircleChart = function(el) {
     
    var chart = this;
     this.margin = {
                top: 12,
                right: 12,
                bottom: 12,
                left: 12
            };

    this.strokeWidth = 3;

    this.svgWidth = 106;

    this.svgHeight = this.svgWidth;
    this.previousValue = null;
    
    this.extendPrototype(CircleChart.prototype, circleChartExtension);
    Chart.call(this, el);

}

CircleChart.prototype = Object.create(Chart.prototype);

var circleChartExtension = {


    setup: function() {

        var chart = this;


        this.y = d3.scaleLinear()
                .domain([chart.min, chart.max])
                .range([2, (chart.svgHeight / 2) - chart.strokeWidth - chart.margin.top]);

        this.gs = this.svgs.append('g')
            .attr('class', 'circles')
            .attr('opacity', 1);

        this.gs.selectAll('circle')
            .data(function(d) {
                var sorted = d.values.sort(function(a, b) {
                    return b.value - a.value;
                })
                return sorted;
            }) // numerical values of each
            .enter().append('circle')
            .attr('cx', chart.svgWidth / 2)
            .attr('cy', chart.svgHeight / 2)
            .attr('r', 0)
            .attr('stroke-width', this.strokeWidth)
            .attr('class', function(d) {
                return d.domain;
            });

        this.adjustRadii();
    },
    adjustRadii: function() {

        var chart = this;


        this.svgs.selectAll('circle')
            .transition().delay(function(d, i) {
                return 200 + (i * 20);
            }).duration(1000).ease(d3.easeBounce)
            .attr('r', function(d, i, array) {
                
                var radius = chart.y(d.value);

                if (chart.previousValue) {


                    if (chart.previousValue - radius < chart.strokeWidth && chart.previousValue >= radius) {



                        radius = chart.previousValue - chart.strokeWidth;
                    } else if (radius - chart.previousValue < chart.strokeWidth && radius >= chart.previousValue) {
                        radius = chart.previousValue + chart.strokeWidth;
                    }
                }
                if (i === array.lenth - 1) {
                    chart.previousValue = null;
                } else {
                    chart.previousValue = radius;
                }
                return radius;
            });
        this.hoverCharts();
    },

    hoverCharts: function(){
        var chart = this;
        
        this.barY = d3.scaleLinear()
            .domain([chart.min, chart.max])
            .range([0, chart.svgHeight - chart.margin.top]);

        this.barX = d3.scaleBand()
            .domain(chart.domain)
            .range([chart.margin.left, chart.svgWidth - chart.margin.right]);

        this.gs = this.svgs.append('g')
            .attr('class', 'columns')
            .attr('opacity', 1)
            .selectAll('rect')
             .data(function(d) {
                    var sorted = d.values.sort(function(a,b){
                        return b.value - a.value;
                    })
                    return sorted;
            })
          .enter().append('rect')
          .attr('width', chart.barX.bandwidth())
          .attr('x', function(d){
            return chart.barX(d.domain);
          })
          .attr('height', function(d){
            return chart.barY(d.value);
          })
          .attr('y', function(d){
            return chart.svgHeight - chart.margin.bottom - chart.barY(d.value) - chart.strokeWidth;
          });
    }

};

/*
 * HOVER CHART
 */



        /*d3.select(this)
          .append('g')
          .attr('class', 'columns')
          .attr('opacity', 1)
          .data(function(d) {
                    var sorted = d.values.sort(function(a,b){
                        return b.value - a.value;
                    })
                    return sorted;
            })
          .enter().append('rect')
          .attr('x', function(d){
            return d3.scaleBand(d.value)
                .domain(['environment','human_rights',])
                .range([0, svgHeight])
                .padding(0.33);

          })*/


/*
 * MODEL
 */


var model = {
    data: [],
    initialize: function(json) {

        json.forEach(function(obj) { //iterate over each object of the data array
            for (var key in obj) { // iterate over each property of the object
                if (obj.hasOwnProperty(key)) {
                    obj[key] = isNaN(+obj[key]) ? obj[key] : +obj[key]; // + operator converts to number unless result would be NaN
                }
            }
        });
        var nested = d3.nest()
            .key(function(d) {
                return d.country;
            })
            .entries(json);


        model.data = nested;

        controller.makeCharts();

    }

};

var controller = {
    makeCharts: function() {
        new CircleChart('#chart-0');
    }
};

/*
 * INITIALIZE
 */

var DATA_FILE = 'data/country-scorecard.csv';
d3.csv(DATA_FILE, model.initialize);