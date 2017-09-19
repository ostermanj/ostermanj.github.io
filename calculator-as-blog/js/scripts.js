"use strict";

var priceSelector = d3.select('#price-selector')
    .on('change', updateGate)
    .node();
var rateSelector = d3.select('#rate-selector')
    .on('change', updateGate)
    .node(); 

var globalPrice,
    globalRate;

function clearTooltips(){
    carbonLineCharts.forEach(function(each){

        each.trendPoints.dispatch('mouseout');
        each.baselinePoints.dispatch('mouseout');
    });
}

function updateTotals(price, rate){
    globalPrice = price;
    globalRate = rate;
    /* PRICE */
    var finalPrice = +price * Math.pow( 1 + +rate, 12);
    console.log(finalPrice);

    /* EMISSIONS */ 
    var emissionsData = carbonLineCharts[0].data[price][rate][0].trend;
    var emissionsBaseline = carbonLineCharts[0].data[0][0][0].trend;

    var totalEmissionsSavings = emissionsData.reduce(function(acc,cur, i){
        return acc + ( +emissionsBaseline[i].value - +cur.value )
    },0);

    console.log(totalEmissionsSavings);

    /* REVENUE ( emissions * price ) */
    var revenueData = carbonLineCharts[1].data[price][rate][0].trend;
    var totalRevenue = revenueData.reduce(function(acc, cur){
       return acc + +cur.value;
    },0);
    console.log(totalRevenue);

    d3.select('#summary-stats .bind-text')
        .classed('attention', false)
        .text(', $' + price + ' per ton at ' + rate * 100 + '% growth rate');

    d3.select('#summary-emissions .bind-total')
        .text(d3.format(",.3r")(totalEmissionsSavings) + ' billion metric tons');
    d3.select('#summary-revenue .bind-total')
        .text('$' + d3.format(",.4r")(totalRevenue) + ' billion');
    d3.select('#summary-price .bind-total')
        .text('$' + d3.format(",.2f")(finalPrice) + ' per ton');

    d3.select('#summary-stats')
        .classed('not-calculated', false);





}

function updateGate(){
    if ( priceSelector.options[priceSelector.selectedIndex].value ){
        d3.select('#price-label')
            .classed('attention', false);
    }
    if ( rateSelector.options[rateSelector.selectedIndex].value ){
        d3.select('#rate-label')
            .classed('attention', false);
    }
    if ( priceSelector.options[priceSelector.selectedIndex].value && rateSelector.options[rateSelector.selectedIndex].value ) {
        carbonLineCharts.forEach(function(each){
            each.updateChart(priceSelector.options[priceSelector.selectedIndex].value, rateSelector.options[rateSelector.selectedIndex].value);
        });
        updateTotals(priceSelector.options[priceSelector.selectedIndex].value, rateSelector.options[rateSelector.selectedIndex].value);
    }
}  

var CarbonLineChart = function(configObject){ // marginsrgin {}, height #, width #, containerID, dataPath
    this.setup(configObject);
}

CarbonLineChart.prototype = {

    setup: function(configObject){
        var chart = this;
        var viewBox = '0 0 100 ' + Math.round(configObject.heightToWidth * 100);
        this.margin = configObject.margin;
        this.width = 100 - this.margin.left - this.margin.right;
        this.height = configObject.heightToWidth * 100 - this.margin.top - this.margin.bottom;
        this.labelOffset = configObject.trendLabelPosition === 'below' ? 4 : -2;
        this.yAxisCount = configObject.yAxisCount;
        this.hasBeenUpdated = false;

        this.svg = d3.select(configObject.container)
            .append('svg')
            .attr('width', '100%')
            .attr('xmlns','http://www.w3.org/2000/svg')
            .attr('version','1.1')
            .attr('viewBox', viewBox)
            .append('g')
            .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

        this.parseTime = d3.timeParse('%Y');

        // set the ranges
        this.x = d3.scaleTime().range([0, this.width]);
        this.y = d3.scaleLinear().range([this.height, 0]);

        // define the line
        this.valueline =  d3.line()
            .x(function(d) { return chart.x(d.date); })
            .y(function(d) { return chart.y(d.value); });
       
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
            .attr('r',1)
            .attr('cx', function(d){
                return chart.x(d.date);
            })
            .attr('cy', function(d){
                return chart.y(d.value)
            })
            .on('mouseover', function(e){
                clearTooltips();
                chart.tooltip.show(e);
            })
            .on('mouseout', this.tooltip.hide) 
            .call(this.tooltip);
    },
    renderTrendlineLabel: function(){
         var chart = this;
         this.trendlineLabel = this.svg.append('g')
        .attr('class','line-label trendline-label no-display')        
        .attr('transform', function(){
            console.log(chart.labelOffset);
            return 'translate(' + chart.x(chart.baselineData[0].trend[7].date) + ',' + ( chart.y(chart.baselineData[0].trend[7].value) + chart.labelOffset ) + ')';
        });

        this.trendlineLabel
            .append('text')
            .attr('text-anchor', 'end')
            .text('With carbon price');
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
            .attr('r',1)
            .attr('cx', function(d){
                return chart.x(d.date);
            })
            .attr('cy', function(d){
                return chart.y(d.value)
            })
            .on('mouseover', function(e){
                clearTooltips();
                chart.baselineTooltip.show(e);
            })
            .on('mouseout', this.baselineTooltip.hide) 
            .call(this.baselineTooltip);
    },
    renderBaselineLabel: function(){
        var chart = this;
        this.baselineLabel = this.baselineGroup.selectAll('baseline-label')
        .data(function(d){
            console.log(d.trend[12]);
            return [d.trend[12]];
        })
        .enter().append('g')
        .attr('transform', function(d){
            console.log(d);
            return 'translate(' + chart.x(d.date) + ',' + ( chart.y(d.value) - 1.5) + ')';
        })
        .attr('class','line-label')
        .attr('text-anchor', 'end')
        .append('text')
        .text('Without carbon price');

    },
    renderAxes: function(){
        var chart = this;
        this.xAxis = this.svg.append('g')
          .attr('transform', 'translate(0,' + ( this.height + 2 ) + ')')
          .attr('class', 'axis x-axis')
          .call(d3.axisBottom(chart.x).tickSizeInner(1).tickSizeOuter(1).tickPadding(1).ticks(d3.timeYear.every(2)));

      
        this.yAxis = this.svg.append('g')
          .attr('class', 'axis y-axis');

        this.yAxis.append('text')
            .attr('class', 'axis-label')
            .attr('text-anchor','start')
            .attr('transform', 'translate(-' + ( this.margin.left - 2 )+ ', -3)')
            .text(function(){
                console.log(chart.data[0][0][0]);
                return chart.data[0][0][0].units;
            }); // TO DO: needs to be set programmatically.

        this.yAxis.call(d3.axisLeft(chart.y).tickSizeInner(1).tickSizeOuter(1).tickPadding(1).ticks(chart.yAxisCount));
    },
    updateChart(userPrice,userRate){
        this.updateTrendline(userPrice,userRate);
        this.updateTrendPoints(userPrice,userRate);
        this.updateTrendlineLabel(userPrice,userRate);
    },
    updateTrendline: function(userPrice,userRate){
        var chart = this;
        chart.trendPoints.dispatch('mouseout');
        this.trendline.data(function(){
            return chart.data[userPrice][userRate];
        })
        .transition().duration(500)
        .attr('d', function(d){
           return chart.valueline(d.trend);
        })
        .on('end', function(){
            if ( !chart.hasBeenUpdated ){
                chart.trendPoints.dispatch('mouseover');
                chart.hasBeenUpdated = true;
            }
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
        console.log(this.trendlineLabel);
        this.trendlineLabel.data(function(){
                return [chart.data[userPrice][userRate][0].trend[5]];
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
            margin: { // percentages
                top: 6,
                right: 4.5,
                bottom: 10,
                left: 10
            },
            heightToWidth: 0.66,
            dataPath:'data/emissions.csv',
            container:'#container',
            trendLabelPosition: 'below', 
            baselineTooltip: function(d){
                //return '<b>Without carbon price<br /></b>' + d.date.getFullYear() + '</b>: ' + d.value + ' ' + d.units + '<br />(' +  Math.round(( d.value / 6 ) * 100 ) +'% of 2005 levels)'; 
                return '<b>WITHOUT CARBON PRICE</b><br /><b>Year:</b> ' + d.date.getFullYear() + '<br /><br /><b>Emissions:</b> ' + d.value + ' ' + d.units + '<br />(' +  Math.round(( d.value / 6 ) * 100 ) +'% of 2005 levels)';
            },
            trendlineTooltip: function(d){
                 return '<b>WITH CARBON PRICE</b><br />($' + d.price + '</b> at ' + d.growth_rate * 100 + '% growth rate)<br /><b>Year:</b> ' + d.date.getFullYear() + '<br /><b>Price:</b> $' + d3.format(",.2f")( globalPrice * Math.pow(1 + +globalRate, +d.date.getFullYear() - 2018) ) + ' per ton<br /><br /><b>Emissions:</b> ' + d.value + ' ' + d.units + '<br />(' +  Math.round(( d.value / 6 ) * 100 ) +'% of 2005 levels)';
                //return '<b>$' + d.price + '</b> at ' + d.growth_rate * 100 + '% annual increase<br /><b>' + d.date.getFullYear() + ':</b> ' + d.value + ' ' + d.units + '<br />(' +  Math.round(( d.value / 6 ) * 100 ) +'% of 2005 levels)'; 
            },
            yAxisCount: null

        }
    )
);

carbonLineCharts.push( 
    new CarbonLineChart(
        {
            margin: { //percentages
                top: 6,
                right: 4.5,
                bottom: 10,
                left: 10
            },
            heightToWidth: 0.66,
            dataPath:'data/revenue.csv',
            container:'#container-2',
            trendLabelPosition: 'above', 
            baselineTooltip: function(d){
              //  return '<b>WITHOUT CARBON PRICE<br /></b>' + d.date.getFullYear() + '<br />$' + d.value; 
               return '<b>WITHOUT CARBON PRICE</b><br /><b>Year:</b> ' + d.date.getFullYear() + '<br /><br /><b>Revenue:</b> $0'; 
            },
            trendlineTooltip: function(d){
                return '<b>WITH CARBON PRICE</b><br />($' + d.price + '</b> at ' + d.growth_rate * 100 + '% growth rate)<br /><b>Year:</b> ' + d.date.getFullYear() + '<br /><b>Price:</b> $' + d3.format(",.2f")( globalPrice * Math.pow(1 + +globalRate, +d.date.getFullYear() - 2018) ) + ' per ton<br /><br /><b>Revenue:</b> $' + d3.format(".3n")(d.value) + ' billion'; 
            },
            yAxisCount: 7

        }
    )
);
