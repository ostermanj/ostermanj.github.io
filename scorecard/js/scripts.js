"use strict";

var ColumnChart = function(el) {
        
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
            
            chart.domain.sort();
            this.max = d3.max(numericValues);
            this.min = d3.min(numericValues);
            
            this.setup();
       },
       setup: function(){
            var chart = this; // should be able to use app.chart ??
            this.margin = {
                    top: 12,
                    right: 0,
                    bottom: 0,
                    left: 0
                };
                
            this.strokeWidth = 3;

            this.svgWidth = 106;
            
            this.svgHeight = this.svgWidth;
            this.previousValue = null;

          /*  var x = d3.scaleBand()
                .domain(chart.domain) 
                .range([0, svgWidth])
                .padding(0.33); */

            chart.y = d3.scaleLinear()
                .domain([chart.min, chart.max])
                .range([2, ( chart.svgHeight / 2 ) - chart.strokeWidth - chart.margin.top]);

         /*   var yAxisScale = d3.scaleLinear()
                .domain([0, chart.max])
                .range([chart.svgHeight, 0]);

            var xAxis = d3.axisBottom().scale(x).tickSize(0).tickFormat(function(d){                
                return d;
            }); 

            var yAxis = d3.axisRight().scale(yAxisScale).ticks(10).tickSize(0).tickFormat(function(d){
                return d;
            });*/


         /*   var tool_tip = d3.tip()
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
                .style('opacity', 1); */

            this.svgs = d3.select(this.el)
                .selectAll('svg')
                .data(model.data).enter()
                .append('svg')
                .attr('id', function(d){
                    return d.key;
                })
                .attr('width', this.svgWidth)
                .attr('height', this.svgHeight)
                .on('mouseover', this.hoverIn) 
                .on('mouseout', this.hoverOut);
                

            this.svgs.append('text')
                .text(function(d){
                    return d.key;
                })
                .attr('alignment-baseline', 'after-edge')
                .attr('class','country-label')
                .attr('y', this.svgHeight)
                .attr('x',this.svgWidth / 2)
                .attr('text-anchor', 'middle');

            this.gs = this.svgs.append('g')
                .attr('class', 'circles')
                .attr('opacity', 1);
         
            this.gs.selectAll('circle')
                .data(function(d) {
                    var sorted = d.values.sort(function(a,b){
                        return b.value - a.value;
                    })
                    return sorted;
                }) // numerical values of each
                .enter().append('circle')
                .attr('cx', chart.svgWidth / 2 )
                .attr('cy', chart.svgHeight / 2)
                .attr('r',0)
                .attr('stroke-width', this.strokeWidth)
                .attr('class', function(d) {
                    return d.domain;
                });
               
               

                this.adjustLength();

       },
       hoverIn: function(){
        d3.select(this)
        .select('g.circles')
        .transition().duration(200)
        .attr('opacity', 0);

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
       },
       hoverOut: function(){
         d3.select(this)
            .select('g.circles')
            .transition().duration(200)
            .attr('opacity', 1);
       },
       adjustLength: function(){
            
            var chart = this;
            
            
            this.svgs.selectAll('circle')
            .transition().delay(function(d,i){
                return 200 + (i * 20);
            }).duration(1000).ease(d3.easeBounce)
            .attr('r', function(d,i,array) {                
                    var radius = chart.y(d.value);
                    
                    if (chart.previousValue){
                        
                        
                        if (chart.previousValue - radius < chart.strokeWidth && chart.previousValue >= radius) {
                            
                            
                            
                            radius = chart.previousValue - chart.strokeWidth;
                        } else if (radius - chart.previousValue < chart.strokeWidth && radius >= chart.previousValue){
                            radius = chart.previousValue + chart.strokeWidth;
                        }
                    }
                    if ( i === array.lenth - 1 ){
                        chart.previousValue = null;
                    } else {
                        chart.previousValue = radius;
                    }
                    return radius;
                }); 
        }

};


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
    makeCharts: function(){
         new ColumnChart('#chart-0');
    }
};

/*
 * INITIALIZE
 */

var DATA_FILE = 'data/country-scorecard.csv';
d3.csv(DATA_FILE, model.initialize);