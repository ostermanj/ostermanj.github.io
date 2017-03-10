"use strict";

var ColumnChart = function(el) {
        console.log('ColumnChart');
        var chart = this;
        this.el = el;
        this.chartMinMaxDomain();
    };

ColumnChart.prototype = {
       chartMinMaxDomain: function(){
            var chart = this;
            var numericValues = [];
            this.domain = [];
            model.data.forEach(function(c){
                c.values.forEach(function(d){
                    numericValues.push(d.value);
                    if (chart.domain.indexOf(d.domain) === -1){
                        chart.domain.push(d.domain);
                    }
                });
            });
            console.log(numericValues);
            chart.domain.sort();
            this.max = d3.max(numericValues);
            this.min = d3.min(numericValues);
            console.log(this.max,this.min);
            this.setup();
       },
       setup: function(){
            var chart = this; // should be able to use app.chart ??
            var margin = {
                    top: 5,
                    right: 29,
                    bottom: 5,
                    left: 0
                },
                labelHeight = 0,
                svgWidth = 95 - margin.right - margin.left;
            
            this.svgHeight = 70 + labelHeight - margin.top - margin.bottom;

            var x = d3.scaleBand()
                .domain(chart.domain) 
                .range([0, svgWidth])
                .padding(0.33);

            chart.y = d3.scaleLinear()
                .domain([0, chart.max])
                .range([0, chart.svgHeight]);

            var yAxisScale = d3.scaleLinear()
                .domain([0, chart.max])
                .range([chart.svgHeight, 0]);

            var xAxis = d3.axisBottom().scale(x).tickSize(0).tickFormat(function(d){                
                return d;
            });

            var yAxis = d3.axisRight().scale(yAxisScale).ticks(10).tickSize(0).tickFormat(function(d){
                return d;
            });


            var tool_tip = d3.tip()
                .attr("class", "d3-tip")
                // .offset([-8, 0])
                .direction(function(){
                    if (window.innerWidth > 820){
                        return 'n';
                    } else {
                        return 'e';
                    }
                })
                .html(function(d) {                    
                    return '<b>' + d.country + '</b><br>' +
                        d.readable + '<br>' +
                        d.value;               
                })
                .style('opacity', 1);

            this.svgs = d3.select(this.el)
                .selectAll('svg')
                .data(model.data).enter()
                .append('svg')
                .attr('id', function(d){
                    return d.key;
                })
                .attr('width', svgWidth)
                .attr('height', this.svgHeight);

            this.svgs.append('g')
              //  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
                .selectAll('rect')
                .data(function(d) {
                    return d.values;
                }) // numerical values of each
                .enter().append('rect')
                .attr('x', function(d) {
                    return x(d.domain);
                })
                .attr('y', function(d) {
                    return chart.svgHeight; // passing d.value as parameter to scale function
                })
                .attr('width', x.bandwidth())                
                .attr('class', function(d) {
                    return d.domain;
                })
                .on('mouseover', tool_tip.show) // .show is defined in links d3-tip library
                .on('mouseout', tool_tip.hide) // .hide is defined in links d3-tip library
                .call(tool_tip);

                this.adjustLength();

       },
       adjustLength: function(){
            console.log('adjust length');
            var chart = this;
            
            
            this.svgs.selectAll('rect')
            .transition().delay(function(d,i){
                return 200 + (i * 20);
            }).duration(1000).ease(d3.easeBounce)
            .attr('height', function(d) {                
                    return chart.y(d.value); // passing d.value as parameter to scale function
                })
            .attr('y', function(d) {
                    return chart.svgHeight - chart.y(d.value); // passing d.value as parameter to scale function
                }); 
        }

};


/*
 * MODEL
 */


var model = {
    data: [],
    initialize: function(json) {
        console.log('init');
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

        console.log(nested);
        model.data = nested;

        controller.makeCharts();

        }

    };

var controller = {
    makeCharts: function(){
         new ColumnChart('#chart-0');
    }
};

/*
 * INITIALIZE
 */

var DATA_FILE = 'data/country-scorecard.csv';
d3.csv(DATA_FILE, model.initialize);