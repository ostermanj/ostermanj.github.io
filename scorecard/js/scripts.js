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
        model.data.forEach(function(g) {
            g.values.forEach(function(c){
                c.values.forEach(function(d) {
                    numericValues.push(d.value);
                    if (chart.domain.indexOf(d.domain) === -1) {
                        chart.domain.push(d.domain);
                    }
                });
            });
        });

        chart.domain.sort();
        this.max = d3.max(numericValues);
        this.min = d3.min(numericValues);

        this.protoSetup();
    },
    protoSetup: function() {
        var chart = this; 
        
        this.incomeGroups = d3.select(this.el)
        .selectAll('div')
        .data(model.data).enter()
        .append('div')
        .attr('id', function(d) {
            return d.key;
        })

        this.svgs = this.incomeGroups.selectAll('svg')
            .data(function(d){
                return d.values;
            }).enter().append('svg')
            .attr('id', function(d) {
                return d.key;
            })
            .attr('width', this.svgWidth)
            .attr('height', this.svgHeight)
            .on('click', function(d,i,array){
                chart.hoverIn.call(chart,d,i,array);
            });


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

    this.tool_tip = d3.tip()
        .attr("class", "d3-tip")
        // .offset([-8, 0])
        .direction('n')
        .html(function(d) {
           return '<b>' + d.readable + ': </b>' + d.value;
       })
        .style('opacity', 1);

        var chart = this;

        this.barX = d3.scaleBand()
            .domain(chart.domain)
            .range([chart.margin.left, chart.svgWidth - chart.margin.right])
            .padding(0.33);

        this.y = d3.scaleLinear()
                .domain([chart.min, chart.max])
                .range([2, (chart.svgHeight / 2) - chart.strokeWidth - chart.margin.top]);

        this.maskBars = this.svgs.append('defs')
        .selectAll('clipPath')
         .data(function(d) {
            console.log(d);
             return d.values;
            })
         .enter().append('clipPath')
         .attr('id', function(d,i){
            return 'mask-' +  encodeURIComponent(d.country) + '-' + i;
         })
         .append('rect')
         .attr('y', function(d){
            return chart.svgHeight - chart.margin.bottom - chart.strokeWidth - chart.y(d.value) * 2;
            })
            .attr('x', function(d){
                return chart.barX(d.domain);
            })
            .attr('height', function(d){
                return chart.y(d.value) * 2;
            })
            .attr('width', chart.barX.bandwidth());
           // .attr('fill', 'transparent')
           // .attr('stroke', 'magenta');


        this.gs = this.svgs.append('g')
            .attr('class', 'circles')
            .attr('opacity', 1);

     
        this.gs.selectAll('ellipse')
            .data(function(d) {
             
                return d.values;
            }) // numerical values of each
            .enter().append('ellipse')
            .attr('cx', chart.svgWidth / 2)
            .attr('cy', chart.svgHeight / 2)
            .attr('rx', 0)
            .attr('ry', 0)
            .attr('stroke-width', this.strokeWidth)
            .attr('class', function(d) {
                return d.domain;
            })
            .call(this.tool_tip);


      
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
            }).duration(1050).ease(d3.easeBounce)
            .attr('rx', function(d,i,array){
                return chart.returnRadii(d, i, array);
            })
            .attr('ry', function(d,i,array){
                return chart.returnRadii(d, i, array);
            })
            .attr('fill-opacity',0);
            
     },
     hoverIn: function(d,i,array) {

        var chart = this;
        
       d3.select(array[i])
      .on('mouseleave', function(d,i,array){
                chart.hoverOut.call(chart,d,i,array);
            }) 
       .on('click', function(d,i,array){
                chart.hoverOut.call(chart,d,i,array);
            })
       .selectAll('ellipse')
         .on('mouseover', chart.tool_tip.show) // .show is defined in links d3-tip library
            .on('mouseout', chart.tool_tip.hide)            
        .transition().duration(500).delay(150)
        .attr('rx', 1)
        .attr('ry', function(d){
            return chart.y(d.value) - chart.strokeWidth;
        })
        .attr('cy', function(d,i,array){
            return chart.svgHeight / 2 - chart.y(d.value) + chart.svgHeight / 2 - chart.margin.bottom + chart.strokeWidth - 5;
        })
        .attr('cx', function(d){
            return chart.barX(d.domain) + chart.barX.bandwidth() / 2;
        })
        .attr('fill-opacity',1)
        .transition().delay(50)
        .attr('clip-path', function(d,i){
           return 'url(#mask-' + encodeURIComponent(d.country) + '-' + i + ')';
        })

        
        .attr('rx', function(d){
            return chart.barX.bandwidth();
        })
        .attr('ry', function(d){
            return chart.y(d.value) + chart.strokeWidth;
        });
        
    
    },
     hoverOut: function(d,i,array) {
        
        var chart = this;
      d3.select(array[i])
       .on('mouseleave', function(){
            return;
            })
            .on('click', function(d,i,array){
                chart.hoverIn.call(chart,d,i,array);
            })       
       .selectAll('ellipse')
       .on('mouseover', function(){
        return;
       })
        .transition().duration(100)
        .attr('rx', 1)
        .attr('ry', function(d){
            return chart.y(d.value) - chart.strokeWidth;
        })
        .transition().duration(500).delay(50)
        .attr('clip-path','')
        .attr('cy', chart.svgHeight / 2)
        .attr('cx', chart.svgWidth / 2)
        .attr('fill-opacity',0)
        .attr('rx', function(d,i,array){
            return chart.returnRadii(d, i, array);            
        })
        .attr('ry', function(d,i,array){
            return chart.returnRadii(d, i, array);            
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

        json = model.convertStrings(json);
        //model.nest(json);
        
        d3.csv(JOIN.file, function(joinJSON){
            joinJSON = model.convertStrings(joinJSON);
         //   console.log(json);
         //   console.log(joinJSON);
            model.joinResult(joinJSON,json);
        });
        
        //var joinResult = this.join(d3.csv(JOIN.file),json,JOIN.joinKey,JOIN.joinKey, function())
    },
    convertStrings: function(json) {

        json.forEach(function(obj) { //iterate over each object of the data array
            for (var key in obj) { // iterate over each property of the object
                if (obj.hasOwnProperty(key)) {
                    obj[key] = isNaN(+obj[key]) ? obj[key] : +obj[key]; // + operator converts to number unless result would be NaN
                }
            }
        });

        return json;
    },
    nest: function(json){
        
        var nested = d3.nest()
            .key(function(d){
                return d.income_group;
            })
            .key(function(d) {
                return d.country;
            })
            .entries(json);


        model.data = nested; // MOVE THIS
        console.log(model.data);

        controller.makeCharts(); // MOVE THIS

    },
    join: function (lookupTable, mainTable, lookupKey, mainKey, select) { // HT http://learnjsdata.com/combine_data.html
        var l = lookupTable.length,
            m = mainTable.length,
            lookupIndex = [],
            output = [];
        for (var i = 0; i < l; i++) { // loop through l items
            var row = lookupTable[i];
            lookupIndex[row[lookupKey]] = row; // create an index for lookup table
        }
        for (var j = 0; j < m; j++) { // loop through m items
            var y = mainTable[j];
            var x = lookupIndex[y[mainKey]]; // get corresponding row from lookupTable
            output.push(select(y, x)); // select only the columns you need
        }
        return output;
    },

    joinResult: function(joinJSON,json){
        var result = model.join(joinJSON,json,JOIN.joinKey,JOIN.joinKey,JOIN.select);
        //console.log(result);
        model.nest(result);
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
var JOIN = {
    file: 'data/income-group.csv',
    joinKey: 'code', // same key for both here, but could specify different keys for the join function
    select: function(a,b){
      //  console.log('a', a);
      //  console.log('b',b);
        return {
            code: a.code,
            country: a.country,
            domain: a.domain,
            readable: a.readable,
            value: a.value,
            income_group: b.income_group,
            income_group_n: b.income_group_n,
            region: b.region
        }
    }
};
d3.csv(DATA_FILE, model.initialize);