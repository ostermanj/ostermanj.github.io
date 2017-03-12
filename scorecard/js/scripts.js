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
            .on('mouseover', function(d,i,array){
                chart.hoverIn.call(chart,d,i,array);
            }, false)
            .on('mouseout', function(d,i,array){
                chart.hoverOut.call(chart,d,i,array);
            })


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

    }
   
      
  /* 
    this.selectAll('circle')
            .transition().duration(2000)
            .attr('opacity', 0);
/*
        d3.select(this)
            .select('g.columns')
            .transition().delay(200).duration(200)
            .attr('opacity', 1);

        d3.select('rect')
            .transition().duration(100).ease(d3.easeBounce)
            .attr('height', function(d){
                return chart.barY(d.value);
              })
              .attr('y', function(d){
                return chart.svgHeight - chart.margin.bottom - chart.barY(d.value) - chart.strokeWidth;
              });


*/

    
    
   

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

        this.barX = d3.scaleBand()
            .domain(chart.domain)
            .range([chart.margin.left, chart.svgWidth - chart.margin.right])
            .padding(0.33);

        this.y = d3.scaleLinear()
                .domain([chart.min, chart.max])
                .range([2, (chart.svgHeight / 2) - chart.strokeWidth - chart.margin.top]);

        this.gs = this.svgs.append('g')
            .attr('class', 'circles')
            .attr('opacity', 1);

        this.gs.selectAll('ellipse')
            .data(function(d) {
                var sorted = d.values.sort(function(a, b) {
                    return b.value - a.value;
                })
                return sorted;
            }) // numerical values of each
            .enter().append('ellipse')
            .attr('cx', chart.svgWidth / 2)
            .attr('cy', chart.svgHeight / 2)
            .attr('rx', 0)
            .attr('ry', 0)
            .attr('stroke-width', this.strokeWidth)
            .attr('class', function(d) {
                return d.domain;
            });

        this.adjustRadii();
    },
    adjustRadii: function() {

        var chart = this;
        
        this.returnRadii = function(d, i, array){
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
        }

        this.svgs.selectAll('ellipse')
            .transition().delay(function(d, i) {
                return 200 + (i * 20);
            }).duration(1000).ease(d3.easeBounce)
            .attr('rx', function(d,i,array){
                return chart.returnRadii(d, i, array);
            })
            .attr('ry', function(d,i,array){
                return chart.returnRadii(d, i, array);
            });
            
     },
     hoverIn: function(d,i,array) {

        var chart = this;
        console.log(d);
       d3.select(array[i]).selectAll('ellipse')
        .transition().duration(500).delay(150)
        .attr('rx', 1)
        .attr('cy', function(d,i,array){
            return chart.svgHeight / 2 - d3.select(array[i]).attr('ry') + chart.svgHeight / 2 - chart.margin.bottom - 5;
        })
        .attr('cx', function(d){
            return chart.barX(d.domain);
        });;
    
    },
     hoverOut: function(d,i,array) {
        console.log(d);
        var chart = this;
      d3.select(array[i]).selectAll('ellipse')
        .transition().duration(200)
        .attr('cx', chart.svgWidth / 2)
        .attr('cy', chart.svgHeight / 2) 
        .attr('rx', function(d,i,array){
            return d3.select(array[i]).attr('ry');
            //return chart.returnRadii(d, i, array);
        });
       


    }

/*
    hoverCharts: function(){
        var chart = this;
        
        this.barY = d3.scaleLinear()
            .domain([chart.min, chart.max])
            .range([0, chart.svgHeight - chart.margin.top]);

        this.barX = d3.scaleBand()
            .domain(chart.domain)
            .range([chart.margin.left, chart.svgWidth - chart.margin.right])
            .padding(0.33);

        this.gbars = this.svgs.append('g')
            .attr('class', 'columns')
            .attr('opacity', 0)
            .selectAll('rect')
             .data(function(d) {
                    var sorted = d.values.sort(function(a,b){
                        return b.value - a.value;
                    })
                    return sorted;
            })
          .enter().append('rect')
          .attr('width', chart.barX.bandwidth())
          .attr('class',function(d){
            return d.domain;
          })
          .attr('x', function(d){
            return chart.barX(d.domain);
          })
         // .attr('height', 0)
         // .attr('y', chart.svgHeight - chart.margin.bottom - chart.strokeWidth)
          .attr('height', function(d){
            return chart.barY(d.value);
          })
          .attr('y', function(d){
            return chart.svgHeight - chart.margin.bottom - chart.barY(d.value) - chart.strokeWidth;
          });
    }
*/
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