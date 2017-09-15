"use strict";

var priceSelector = d3.select('#price-selector')
    .on('change', updateGate)
    .node();
var rateSelector = d3.select('#rate-selector')
    .on('change', updateGate)
    .node(); 

function updateGate(){
    if ( priceSelector.options[priceSelector.selectedIndex].value && rateSelector.options[rateSelector.selectedIndex].value ) {
        carbonLineCharts.forEach(function(each){
            each.updateChart(priceSelector.options[priceSelector.selectedIndex].value, rateSelector.options[rateSelector.selectedIndex].value);
        });
    }
}  

var CarbonLineChart = function(configObject){ // marginsrgin {}, height #, width #, containerID, dataPath
    this.setup(configObject);
}

CarbonLineChart.prototype = {

    setup: function(configObject){
        var chart = this;
        this.margin = configObject.margin;
        this.width = configObject.width - this.margin.left - this.margin.right;
        this.height = configObject.height - this.margin.top - this.margin.bottom;
        this.labelOffset = configObject.trendLabelPosition === 'below' ? 20 : -20;

        this.svg = d3.select(configObject.container)
            .attr('width', this.width + this.margin.left + this.margin.right)
            .attr('height', this.height + this.margin.top + this.margin.bottom)
            .append('g')
            .attr('transform',
                  'translate(' + this.margin.left + ',' + this.margin.top + ')');

        this.parseTime = d3.timeParse('%Y');

        // set the ranges
        this.x = d3.scaleTime().range([0, this.width]);
        this.y = d3.scaleLinear().range([this.height, 0]);

        // define the line
        this.valueline =  d3.line()
            .x(function(d) { return chart.x(d.date); })
            .y(function(d) { return chart.y(d.value); });
        var str = 'd.units';
       
        this.getData(configObject); 

    },

    getData: function(configObject){ // TO DO : get the data first since it informs set up
        var chart = this;
        chart.range = [];
        d3.csv(configObject.dataPath, function(d){
            var values = [];
            for ( var i = 2018; i < 2031; i++ ){
                chart.range.push(+d[i.toString()]);
                values.push({date: chart.parseTime(i), value:+d[i.toString()], price: d.price, growth_rate: d.growth_rate, units: d.units});
            }
            return {
                growth_rate: +d.growth_rate,
                initial_price: +d.price,
                units: d.units,
                trend: values
            }
        }, function(error, data){
            if ( error ) throw error;
            console.log(data);
            chart.baselineData = data.slice(0,1);
            chart.data = d3.nest()
                .key(function(d){
                    return d.initial_price;
                })
                .key(function(d){
                    return d.growth_rate;
                })
                .object(data);
            console.log(chart.data);
            chart.x.domain([chart.parseTime(2018),chart.parseTime(2030)]); // these can be part of setup if data is fetched first
            chart.y.domain([d3.min(chart.range), d3.max(chart.range)]);

            chart.setupTooltips(configObject);
            chart.renderTrendline(); // trendline is rendered and then hidden by baseline
            chart.renderTrendPoints();
            chart.renderTrendlineLabel();
            chart.renderBaseline(); // set up first rather than render here
            chart.renderBaselinePoints();
            chart.renderBaselineLabel();
            chart.renderAxes();

        });
    },
    setupTooltips: function(configObject){
         this.tooltip = d3.tip()
            .attr("class", "d3-tip")
            .direction('n')
            .offset([-8, 0])
            .html(function(d){
                return configObject.trendlineTooltip(d); 
            });

        this.baselineTooltip = d3.tip()
            .attr("class", "d3-tip")
            .direction('n')
            .offset([-8, 0])
            .html(function(d){
                return configObject.baselineTooltip(d); 
            });   

    },
    renderTrendline: function(){
        var chart = this;
        this.trendline = this.svg.append('path')
            .attr('class', 'line')
            .attr('d', function(){
               return chart.valueline(chart.baselineData[0].trend);
            });
    },
    renderTrendPoints: function(){
        var chart = this;
        this.trendPoints = this.svg.selectAll('trend-point')
            .data(function(){
                return chart.baselineData[0].trend;
            })
            .enter().append('circle')
            .attr('class', 'data-point')
            .attr('r',6)
            .attr('cx', function(d){
                return chart.x(d.date);
            })
            .attr('cy', function(d){
                return chart.y(d.value)
            })
            .on('mouseover', this.tooltip.show)
            .on('mouseout', this.tooltip.hide) 
            .call(this.tooltip);
    },
    renderTrendlineLabel: function(){
         var chart = this;
         this.trendlineLabel = this.svg.append('text')
        .attr('class','line-label trendline-label no-display')
        .text('With carbon price')
        .attr('transform', function(){
            console.log(chart.labelOffset);
            return 'translate(' + chart.x(chart.baselineData[0].trend[7].date) + ',' + ( chart.y(chart.baselineData[0].trend[7].value) + chart.labelOffset ) + ')';
        });
    },
    renderBaseline: function(){
        var chart = this;
        this.baselineGroup = this.svg.selectAll('base-line-group')
            .data(this.baselineData)
            .enter().append('g')
            .attr('class','base-line-group');


        this.baseline = this.baselineGroup.selectAll('baseline')
            .data(this.baselineData)
            .enter().append('path')
            .attr('class', 'line baseline')
            .attr('d', function(d){
               return chart.valueline(d.trend);
            });

    },
    renderBaselinePoints: function(){
        var chart = this;
        this.baselinePoints  = this.baselineGroup.selectAll('baseline-point')
            .data(function(d){
                return d.trend;
            })
            .enter().append('circle')
            .attr('class', 'data-point baseline-point')
            .attr('r',6)
            .attr('cx', function(d){
                return chart.x(d.date);
            })
            .attr('cy', function(d){
                return chart.y(d.value)
            })
            .on('mouseover', this.baselineTooltip.show)
            .on('mouseout', this.baselineTooltip.hide) 
            .call(this.baselineTooltip);
    },
    renderBaselineLabel: function(){
        var chart = this;
        this.baselineLabel = this.baselineGroup.selectAll('baseline-label')
        .data(function(d){
            console.log(d.trend[7]);
            return [d.trend[7]];
        })
        .enter().append('text')
        .attr('transform', function(d){
            console.log(d);
            return 'translate(' + chart.x(d.date) + ',' + ( chart.y(d.value) - 20 ) + ')';
        })
        .attr('class','line-label')
        .text('Without carbon price');

    },
    renderAxes: function(){
        var chart = this;
        this.xAxis = this.svg.append('g')
          .attr('transform', 'translate(0,' + ( this.height + 10 ) + ')')
          .attr('class', 'axis x-axis')
          .call(d3.axisBottom(chart.x));

      
        this.yAxis = this.svg.append('g')
          .attr('class', 'axis y-axis');

        this.yAxis.append('text')
            .attr('class', 'axis-label')
            .attr('text-anchor','start')
            .attr('transform', 'translate(-' + ( this.margin.left - 10 ) + ', -20)')
            .text(function(){
                console.log(chart.data[0][0][0]);
                return chart.data[0][0][0].units;
            }); // TO DO: needs to be set programmatically.

        this.yAxis.call(d3.axisLeft(chart.y));
    },
    updateChart(userPrice,userRate){
        this.updateTrendline(userPrice,userRate);
        this.updateTrendPoints(userPrice,userRate);
        this.updateTrendlineLabel(userPrice,userRate);
    },
    updateTrendline: function(userPrice,userRate){
        var chart = this;
        this.trendline.data(function(){
            return chart.data[userPrice][userRate];
        })
        .transition().duration(500)
        .attr('d', function(d){
           return chart.valueline(d.trend);
        });
    },
    updateTrendPoints: function(userPrice, userRate){
        var chart = this;
        this.trendPoints.data(function(){
            return chart.data[userPrice][userRate][0].trend;
            })
            .transition().duration(500)
            .attr('cx', function(d){
                return chart.x(d.date);
            })
            .attr('cy', function(d){
                return chart.y(d.value)
            });
    },
    updateTrendlineLabel: function(userPrice,userRate){
        var chart = this;
        this.trendlineLabel.data(function(){
                return [chart.data[userPrice][userRate][0].trend[7]];
            })
            .classed('no-display', false)
            .transition().duration(500)
            .attr('transform', function(d){
                return 'translate(' + chart.x(d.date) + ',' + ( chart.y(d.value) + chart.labelOffset ) + ')';
            });
    }


};

var carbonLineCharts = [];
carbonLineCharts.push( 
    new CarbonLineChart(
        {
            margin: { 
                top: 40,
                right: 20,
                bottom: 40,
                left: 50
            },
            width:550,
            height:380,
            dataPath:'data/emissions.csv',
            container:'#container', 
            baselineTooltip: function(d){
                return '<b>Without carbon price<br /></b>' + d.date.getFullYear() + '</b>: ' + d.value + ' ' + d.units + '<br />(' +  Math.round(( d.value / 6 ) * 100 ) +'% of 2005 levels)'; 
            },
            trendlineTooltip: function(d){
                return '<b>$' + d.price + '</b> at ' + d.growth_rate * 100 + '% annual increase<br /><b>' + d.date.getFullYear() + ':</b> ' + d.value + ' ' + d.units + '<br />(' +  Math.round(( d.value / 6 ) * 100 ) +'% of 2005 levels)'; 
            }

        }
    )
);

carbonLineCharts.push( 
    new CarbonLineChart(
        {
            margin: { 
                top: 40,
                right: 20,
                bottom: 40,
                left: 50
            },
            width:550,
            height:380,
            dataPath:'data/revenue.csv',
            container:'#container-2',
            trendLabelPosition: 'below', 
            baselineTooltip: function(d){
                return '<b>Without carbon price<br /></b>' + d.date.getFullYear() + '</b>: $' + d.value; 
            },
            trendlineTooltip: function(d){
                return '<b>$' + d.price + '</b> at ' + d.growth_rate * 100 + '% annual increase<br /><b>' + d.date.getFullYear() + ':</b> $' + d3.format(".3n")(d.value) + ' billion'; 
            }

        }
    )
);
