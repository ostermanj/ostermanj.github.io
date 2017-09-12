'use strict';

var userPrice = 10,
    userRate = 0.05;

var trendline;

// set the dimensions and margins of the graph
var margin = {top: 40, right: 20, bottom: 40, left: 50},
    width = 728 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var parseTime = d3.timeParse('%Y');

// set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// define the line
var valueline =  d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.value); });


// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select('#container')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform',
          'translate(' + margin.left + ',' + margin.top + ')');

var tooltip = d3.tip()
            .attr("class", "d3-tip")
            .direction('n')
            .html(function(d){
                return '<b>$' + d.price + '</b> at ' + d.growth_rate * 100 + '% annual increase<br /><b>' + d.date.getFullYear() + '</b> ' + d.value + ' billion metric tons<br />(' +  Math.round(( d.value / 6 ) * 100 ) +'% of 2005 levels)'; 
            });

var baselineTooltip = d3.tip()
            .attr("class", "d3-tip")
            .direction('n')
            .html(function(d){
                return '<b>Without carbon price<br /></b>' + d.date.getFullYear() + '</b>: ' + d.value + ' billion metric tons<br />(' +  Math.round(( d.value / 6 ) * 100 ) +'% of 2005 levels)'; 
            });            


d3.csv('data/emissions.csv', function(d){
    var values = [];
    for ( var i = 2018; i < 2031; i++ ){
        values.push({date: parseTime(i), value:+d[i.toString()], price: d.price, growth_rate: d.growth_rate});
    }
    return {
        growth_rate: +d.growth_rate,
        initial_price: +d.price,
        trend: values
    }
}, function(error, data){
    if ( error ) throw error;
    console.log(data);
    var baselineData = data.slice(0,1);
    console.log('basleinedata', baselineData);
    console.log(data);
    
    data = d3.nest()
        .key(function(d){
            return d.initial_price;
        })
        .key(function(d){
            return d.growth_rate;
        })
        .object(data);

   // data = data[userPrice][userRate][0]['trend'];
    console.log(data);

    x.domain([parseTime(2018),parseTime(2030)]);
    y.domain([3.4, 5.5]);

    trendline = svg.append('path')
        .attr('class', 'line')
        .attr('d', function(){
           return valueline(baselineData[0].trend);
        });

    var trendlineLabel = svg.append('text')
        .attr('class','line-label trendline-label no-display')
        .text('With carbon price')
        .attr('transform', function(){
            return 'translate(' + x(baselineData[0].trend[7].date) + ',' + ( y(baselineData[0].trend[7].value) - 20 ) + ')';
        });
       

    var points = svg.selectAll('trendpoint')
        .data(function(){
            return baselineData[0].trend;
        })
        .enter().append('circle')
        .attr('class', 'data-point')
        .attr('r',6)
        .attr('cx', function(d){
            return x(d.date);
        })
        .attr('cy', function(d){
            return y(d.value)
        })
        .on('mouseover', tooltip.show)
        .on('mouseout', tooltip.hide) 
        .call(tooltip);;

   var baselineGroup = svg.selectAll('g')
        .data(baselineData)
        .enter().append('g')
        .attr('class','base-line-group');


    var baseline = baselineGroup.selectAll('path')
        .data(baselineData)
        .enter().append('path')
        .attr('class', 'line baseline')
        .attr('d', function(d){
           return valueline(d.trend);
        });


    var baselinePoints  = baselineGroup.selectAll('circle')
        .data(function(d){
            return d.trend;
        })
        .enter().append('circle')
        .attr('class', 'data-point baseline-point')
        .attr('r',6)
        .attr('cx', function(d){
            return x(d.date);
        })
        .attr('cy', function(d){
            return y(d.value)
        })
        .on('mouseover', baselineTooltip.show)
        .on('mouseout', baselineTooltip.hide) 
        .call(baselineTooltip);


    var baselineLabel = baselineGroup.selectAll('baseline-label')
        .data(function(d){
            console.log(d.trend[7]);
            return [d.trend[7]];
        })
        .enter().append('text')
        .attr('transform', function(d){
            console.log(d);
            return 'translate(' + x(d.date) + ',' + ( y(d.value) + 20 ) + ')';
        })
        .attr('class','line-label')
        .text('Without carbon price');

     // Add the X Axis
    var xAxis = svg.append('g')
          .attr('transform', 'translate(0,' + ( height + 10 ) + ')')
          .attr('class', 'axis x-axis')
          .call(d3.axisBottom(x));

      // Add the Y Axis
    var yAxis = svg.append('g')
          .attr('class', 'axis y-axis');

     yAxis.append('text')
        .attr('class', 'axis-label')
        .attr('text-anchor','start')
        .attr('transform', 'translate(-' + ( margin.left - 10 ) + ', -20)')
        .text('billion metric tons');

    yAxis.call(d3.axisLeft(y));

    function updateTrendline(){
        var priceSelector = d3.select('#price-selector').node(),
            rateSelector = d3.select('#rate-selector').node();
        if ( priceSelector.options[priceSelector.selectedIndex].value && rateSelector.options[rateSelector.selectedIndex].value ) {
            userPrice = priceSelector.options[priceSelector.selectedIndex].value;
            userRate = rateSelector.options[rateSelector.selectedIndex].value;
        
        trendline.data(function(){
                console.log(data[userPrice][userRate]);
                return data[userPrice][userRate];
            })
            .transition().duration(500)
            .attr('d', function(d){
               return valueline(d.trend);
            });

         trendlineLabel.data(function(){
                return [data[userPrice][userRate][0].trend[7]];
            })
            .classed('no-display', false)
            .transition().duration(500)
            .attr('transform', function(d){
                return 'translate(' + x(d.date) + ',' + ( y(d.value) - 20 ) + ')';
            });

        points.data(function(){
            console.log(data[userPrice][userRate][0].trend);
            return data[userPrice][userRate][0].trend;
            })
            .transition().duration(500)
            .attr('cx', function(d){
                return x(d.date);
            })
            .attr('cy', function(d){
                return y(d.value)
            });
        }
    }
    d3.select('#price-selector')
        .on('change', updateTrendline);
    d3.select('#rate-selector')
        .on('change', updateTrendline);   
    

});
