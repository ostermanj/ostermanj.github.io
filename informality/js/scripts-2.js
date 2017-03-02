(function() { // wrapping script in immediately invoked function expression (IIFE, 'iffy') to contain scope
    'use strict'; // forcing good behavior 

    var Chart,
        app,
        DATA_FILE = 'data/informal-only.csv',
        seriesColors = ["#438390", "#564e34", "#1fa9b8", "#898167", "#5ED6E4", "#C2B793", "#9CA9D3", "#9FBFF7"];

    Chart = function() {
        this.setup();
        //this.update();  placeholder
        //this.resize();  placeholder
    };

    /*d3.selection.prototype.last = function(){
      //var last = this.size() - 1;
      //return this[0][last];
      console.log(this);
    }*/

    Chart.prototype = {
        setup: function() {
            var margin = { top: 5, right: 15, bottom: 5, left: 0 },
                svgWidth = 95 - margin.right - margin.left,
                svgHeight = 70 - margin.top - margin.bottom;

            console.log(app.data); /* array[2] -> Object [key=electricity]       -> array [2] -> Object [key=generator]     -> array[5]
                                                                                              -> Object [key=outages]       -> array[5]
                                               -> Object [key=access_to_finance] -> array [2] -> Object [key=bank_account]  -> array[5]
                                                                                              -> Object [key=loan_/_credit] -> array[5]
                                                                                  */
            
            var x = d3.scaleBand()
                      .domain(['DRC','Ghana', 'Kenya', 'Myanmar', 'Rwanda'])
                      .range([0, svgWidth])
                      .padding(0.33);  

            var y = d3.scaleLinear()
                      .domain([0,0.7])
                      .range([0, svgHeight]);

           
            var yAxisScale = d3.scaleLinear()
                      .domain([0,0.7])
                      .range([svgHeight, 0]);

           
            var xAxis = d3.axisBottom().scale(x).tickSize(0);

            var yAxis = d3.axisRight().scale(yAxisScale).ticks(5).tickSize(0);

            

            var tool_tip = d3.tip()
                  .attr("class", "d3-tip")
                 // .offset([-8, 0])
                  .direction('n')
                  .html(function(d){
                      return '<b>' + d.country + '</b><br>'
                           + 'Yes: ' + d3.format(",.1%")(d.value);
                    })
                  .style('opacity', 1);

            var categoryDiv = d3.select('#chart-1')
              .append('div')
              .attr('id','viz-container')
              .selectAll('div')
              .data(app.data) // array[2] : Object[key=years] and Object[key=percentage]
              .enter().append('div')
              .filter(function(d) { return d.key == 'percentage' })
              .attr('id', function(d,i){ return 'viz-category-' + (i + 1); })
              .attr('class', function(d,i,array){
                 var str = i === 0 ? 'first-category ' : i === array.length - 1 ? 'last-category ' : '';
                 return 'viz-category ' + str + d.key;
              });


              var questionDiv = categoryDiv.append('div')
              .attr('class', 'viz-question first-question last-question');
              
                     


              var svgs = questionDiv.selectAll('svg')
              .data(function(d){ 
                console.log(d);
                return d.values;
                }) // 4 x array[5] : Object[key=<country>]
              .enter().append('div')
              .attr('class','svg-wrapper')
              .append('svg')
              .attr('width', svgWidth + margin.left + margin.right)
              .attr('height', svgHeight + margin.top + margin.bottom)
              .attr('class', function(d,i,array){
                var str = i === 0 ? ' first-chart' : i === array.length - 1 ? ' last-chart' : '';
                return  d.key + str;
              })
              .append('g')
              .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
              .selectAll('rect')
              .data(function(d){ return d.values; })  // numerical values of each
              .enter().append('rect')
      
              .attr('x', function(d){ return x(d.country); })
              .attr('y', function(d){ 
                
                  return svgHeight - y(d.value); // passing d.mean as parameter to scale function
                
              }) 
         
              .attr('width', x.bandwidth())
              .attr('height', function(d){
                
                  return y(d.value); // passing d.mean as parameter to scale function
                
              }) // passing d.mean as parameter to scale function
              .attr('class', function(d,i){
              
                  return d.country + ' series-' + i;
              
              })
              .on('mouseover', tool_tip.show) // .show is defined in links d3-tip library
                .on('mouseout', tool_tip.hide)  // .hide is defined in links d3-tip library
                .call(tool_tip);

             d3.selectAll('#chart-1 .last-question .svg-wrapper')
               .append('p')
               .attr('class', 'country-label')
               .text(function(d){
                console.log(d);
                 return d.values[0].readable;
               });

          /*     questionDiv.selectAll('svg')
               .append('g')
              .attr('class', 'x-axis')
              .attr('transform', 'translate(0,' + (svgHeight + margin.top) + ')')
              .call(xAxis)
              .selectAll("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 0)
              .attr("x", 0)
              .attr("dx",22)
              .attr("dy",3)
              .style("text-anchor", "start");

              questionDiv.selectAll('svg')
              .append('g')
              .attr('transform', 'translate(' +  svgWidth + ', ' + (margin.top) + ')')
              .attr('class', 'y-axis')
              .call(yAxis)*/


       
        } // end setup()
    }; // end prototype 

    app = {
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
              .key(function(d) { return d.category; })
              .key(function(d) { return d.question; })
             // .key(function(d) { return d.country; })
              .entries(json);
            app.data = nested;
            console.log(nested);

           app.chart = new Chart();

        }
    }

    d3.csv(DATA_FILE, app.initialize);

})(); // end IIFE

