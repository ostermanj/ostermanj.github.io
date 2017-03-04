(function() { // wrapping script in immediately invoked function expression (IIFE, 'iffy') to contain scope
    'use strict'; // forcing good behavior 

    var ColumnChart,
        BarChart,
        app,
        DATA_FILE = 'data/informality-concept.csv';


    ColumnChart = function(el, cats, quest, head) {
        this.el = el;
        this.cats = cats;
        this.quest = quest;
        this.head = head;
        this.setup();
        //this.update();  placeholder
        //this.resize();  placeholder
    };

    /*d3.selection.prototype.last = function(){
      //var last = this.size() - 1;
      //return this[0][last];
      // console.log(this);
    }*/

    ColumnChart.prototype = {
        setup: function() {
            var chart = this; // should be able to use app.chart ??
            var margin = {
                    top: 5,
                    right: 23,
                    bottom: 5,
                    left: 0
                },
                labelHeight = 0,
                svgWidth = 95 - margin.right - margin.left,
                svgHeight = 70 + labelHeight - margin.top - margin.bottom;

            // console.log(app.data); 
            /* array[2] -> Object [key=electricity]       -> array [2] -> Object [key=generator]     -> array[5]
                                                                                              -> Object [key=outages]       -> array[5]
                                               -> Object [key=access_to_finance] -> array [2] -> Object [key=bank_account]  -> array[5]
                                                                                              -> Object [key=loan_/_credit] -> array[5]
                                                                                  */

            var x = d3.scaleBand()
                .domain(['informal', 'small', 'medium', 'large']) // could be set programmatically but prob ok
                .range([0, svgWidth])
                .padding(0.33);

            var y = d3.scaleLinear()
                .domain([0, 1])
                .range([0, svgHeight]);

            var yOutages = d3.scaleLinear()
                .domain([0, 13]) // how to get max programmatically ??
                .range([0, svgHeight]);

            var yAxisScale = d3.scaleLinear()
                .domain([0, 1])
                .range([svgHeight, 0]);

            var yAxisAbsScale = d3.scaleLinear() // how to get max programmatically ??
                .domain([0, 13])
                .range([svgHeight, 0]);

            var xAxis = d3.axisBottom().scale(x).tickSize(0);

            var yAxis = d3.axisRight().scale(yAxisScale).ticks(2, ",.0%").tickSize(0);

            var yAxisAbs = d3.axisRight().scale(yAxisAbsScale).ticks(4).tickSize(0);



            var tool_tip = d3.tip()
                .attr("class", "d3-tip")
                // .offset([-8, 0])
                .direction('n')
                .html(function(d) {
                    if (d.units !== 'abs') {
                        return '<b>' + d.firm_type.toUpperCase() + '</b> (' + d.country + ')<br>' +
                            'Yes: ' + d3.format(",.1%")(d.value) + '<br>' +
                            '(n = ' + d.n + ')';
                    } else {
                        return '<b>' + d.firm_type.toUpperCase() + '</b> (' + d.country + ')<br>' +
                            'Number: ' + d.value + '<br>' +
                            '(n = ' + d.n + ')';
                    }
                })
                .style('opacity', 1);

            var categoryDiv = d3.select(this.el)
                .append('div')
                .attr('class', 'viz-container column-chart')
                .selectAll('div')
                .data(app.data) // array[2] : Object[key=electricity] and Object[key=access_to_finance]
                .enter().append('div')
                .filter(function(d) {
                    if (chart.cats.length > 0) {
                        return chart.cats.indexOf(d.key) != -1;
                    } else {
                        return true;
                    }
                })
                //.attr('id', function(d,i){ return 'viz-category-' + (i + 1); })
                .attr('class', function(d, i, array) {
                    var str = i === 0 ? 'first-category ' : i === array.length - 1 ? 'last-category ' : '';
                    return 'viz-category ' + str + d.key;
                });

            if (chart.head) {
                categoryDiv.append('h4')
                    .text(function(d) {
                        return d.key.toUpperCase().replace(/_/g, ' '); // electricity, access to finance
                    })
            }

            var questionDiv = categoryDiv.selectAll('div')
                .data(function(d) {
                    return d.values;
                }) // 2 x array[2]: Object[key=generator], Object[key=outages], Object[key=bank_account], Object[key=loan_/_credit]
                .enter().append('div')
                .filter(function(d) {
                    if (chart.quest.length > 0) {
                        return chart.quest.indexOf(d.key) != -1;
                    } else {
                        return true;
                    }
                })
                //  .attr('class', function(d,i){ return 'question-' + (i + 1); })
                .attr('class', function(d, i, array) {
                    var str = array.length === 1 ? 'viz-question first-question last-question' : i === 0 ? 'viz-question first-question' : i === array.length - 1 ? 'viz-question last-question' : 'viz-question';
                    return str;
                });

            questionDiv.append('h5')

                .text(function(d) {
                    // console.log(d);
                    return d.values[0].values[0].readable;
                });




            var svgs = questionDiv.selectAll('svg')
                .data(function(d) {
                    return d.values;
                }) // 4 x array[5] : Object[key=<country>]
                .enter().append('div')
                .attr('class', 'svg-wrapper')
                .append('svg')
                .attr('width', svgWidth + margin.left + margin.right)
                .attr('height', svgHeight + margin.top + margin.bottom)
                .attr('class', function(d, i, array) {
                    var str = i === 0 ? ' first-chart' : i === array.length - 1 ? ' last-chart' : '';
                    return d.key + str + ' series-' + i + ' ' + d.values[0].units;
                })
                .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
                .selectAll('rect')
                .data(function(d) {
                    return d.values;
                }) // numerical values of each
                .enter().append('rect')
                /*     .sort(function(a,b){
                           return d3.ascending(a.firm_type, b.firm_type);
                       })*/
                //     .attr('x', function(d,i){ return svgWidth / 24 + ( 6 * svgWidth * i ) / 24 } )
                .attr('x', function(d) {
                    return x(d.firm_type);
                })
                .attr('y', function(d) {
                    if (d.question !== 'outages') {
                        return svgHeight - y(d.value); // passing d.value as parameter to scale function
                    } else {
                        return svgHeight - yOutages(d.value);
                    }
                })

                .attr('width', x.bandwidth())
                .attr('height', function(d) {
                    if (d.question !== 'outages') {
                        return y(d.value); // passing d.value as parameter to scale function
                    } else {
                        return yOutages(d.value);
                    }
                }) // passing d.value as parameter to scale function
                .attr('class', function(d) {

                    return d.firm_type;

                })
                .on('mouseover', tool_tip.show) // .show is defined in links d3-tip library
                .on('mouseout', tool_tip.hide) // .hide is defined in links d3-tip library
                .call(tool_tip);

            d3.selectAll(this.el + ' .last-question .svg-wrapper')
                .append('p')
                .attr('class', 'country-label')
                .text(function(d) {
                    return d.key;
                });

            questionDiv.selectAll('svg')
                .append('g')
                .attr('class', 'x-axis')
                .attr('transform', 'translate(0,' + (svgHeight + margin.top) + ')')
                .call(xAxis)
                .selectAll("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0)
                .attr("x", 0)
                .attr("dx", 22)
                .attr("dy", 3)
                .style("text-anchor", "start");

            questionDiv.selectAll('svg.percent')
                .append('g')
                .attr('transform', 'translate(' + svgWidth + ', ' + (margin.top) + ')')
                .attr('class', 'y-axis')
                .call(yAxis);

            questionDiv.selectAll('svg.abs') // should be DRYer here
                .append('g')
                .attr('transform', 'translate(' + svgWidth + ', ' + (margin.top) + ')')
                .attr('class', 'y-axis')
                .call(yAxisAbs);



        } // end setup()
    }; // end prototype  for ColumnChart

    BarChart = function(el, cats, quest, head) {
        this.el = el;
        this.cats = cats;
        this.quest = quest;
        this.head = head;
        this.setup();

        //this.update();  placeholder
        //this.resize();  placeholder
    };

    /*d3.selection.prototype.last = function(){
      //var last = this.size() - 1;
      //return this[0][last];
      // console.log(this);
    }*/

    BarChart.prototype = {
        setup: function() {
            var chart = this;
            var margin = {
                    top: 5,
                    right: 15,
                    bottom: 5,
                    left: 0
                },
                svgWidth = 320 - margin.right - margin.left,
                svgHeight = 90 - margin.top - margin.bottom,
                labelWidth = 50;

            // console.log(app.data);
            /* array[2] -> Object [key=electricity]       -> array [2] -> Object [key=generator]     -> array[5]
                                                                                             -> Object [key=outages]       -> array[5]
                                              -> Object [key=access_to_finance] -> array [2] -> Object [key=bank_account]  -> array[5]
                                                                                             -> Object [key=loan_/_credit] -> array[5]
                                                                                 */

            var x = d3.scaleBand()
                .domain(['DRC', 'Ghana', 'Kenya', 'Myanmar', 'Rwanda'])
                .range([0, svgHeight])
                .padding(0.33);

            var y = d3.scaleLinear()
                .domain([0, 0.7])
                .range([0, svgWidth - labelWidth]);

            var yAbs = d3.scaleLinear()
                .domain([0, 40])
                .range([0, svgWidth - labelWidth]);


            var yAxisScale = d3.scaleLinear()
                .domain([0, 0.7])
                .range([0, svgWidth - labelWidth]);

              var yAxisAbsScale = d3.scaleLinear() // how to get max programmatically ??
                .domain([0, 42])
                .range([0, svgWidth - labelWidth]);


            var xAxis = d3.axisLeft().scale(x).tickSize(0);

            var yAxis = d3.axisBottom().scale(yAxisScale).ticks(5, ",.0%").tickSize(0);

            var yAxisAbs = d3.axisBottom().scale(yAxisAbsScale).ticks(4).tickSize(0);



            var tool_tip = d3.tip()
                .attr("class", "d3-tip")
                // .offset([-8, 0])
                .direction('e')
                .html(function(d) {
                    return '<b>' + d.country + '</b><br>' +
                        'Yes: ' + d3.format(",.1%")(d.value);
                })
                .style('opacity', 1);
            console.log(app.data);

            var categoryDiv = d3.select(this.el) // ok all one cat
                .append('div')
                .attr('class', 'viz-container bar-chart')
                .selectAll('div')
                .data(app.data) // array[2] : Object[key=years] and Object[key=percentage]
                .enter().append('div')
                .filter(function(d) {
                    if (chart.cats.length > 0) {
                        return chart.cats.indexOf(d.key) != -1;
                    } else {
                        return true;
                    }
                })

                .attr('class', function(d, i, array) {
                    var str = i === 0 ? 'first-category ' : i === array.length - 1 ? 'last-category ' : '';
                    return 'viz-category ' + str + d.key;
                });

            if (chart.head) {
                categoryDiv.append('h4')
                    .text(function(d) {
                        return d.key.toUpperCase().replace(/_/g, ' '); // electricity, access to finance
                    })
            }



            var questionDiv = categoryDiv.selectAll('div')
                .data(function(d) {
                    return d.values;
                }) // 2 x array[2]: Object[key=generator], Object[key=outages], Object[key=bank_account], Object[key=loan_/_credit]
                .enter().append('div')
                .filter(function(d) {
                    if (chart.quest.length > 0) {
                        return chart.quest.indexOf(d.key) != -1;
                    } else {
                        return true;
                    }
                })
                //    .attr('class', function(d,i){ return 'question-' + (i + 1); })
                .attr('class', function(d, i, array) {
                    var str = array.length === 1 ? 'viz-question first-question last-question' : i === 0 ? 'viz-question first-question' : i === array.length - 1 ? 'viz-question last-question' : 'viz-question';
                    return str;
                })

            /*
                          var svgWrappers = questionDiv.selectAll('svg')
                          .data(function(d){ 
                            // console.log(d);
                            return d.values;
                            }) // 4 x array[5] : Object[key=<country>]
                          .enter().append('div')
                          .attr('class','svg-wrapper');

                          svgWrappers.append('h5')
                          .text(function(d){
                            // console.log(d);
                            return d.values[0].readable;
                          })
            */

            var svgWrappers = questionDiv.append('div') // age, experience, university, etc. 6 objects

                .attr('class', 'svg-wrapper');

            svgWrappers.append('h5')
                .text(function(d) {

                    return d.values[0].values[0].readable;
                });

            var svgs = svgWrappers.append('svg')
                .attr('width', svgWidth + margin.left + margin.right)
                .attr('height', svgHeight + margin.top + margin.bottom)
                .attr('class', function(d) {
                    console.log(d);
                    return d.values[0].values[0].units;
                })
                .selectAll('g')
                .data(function(d) {
                    return d.values;
                })
                .enter().append('g')
                .attr('class', function(d, i) {
                    return 'series-' + i;
                })
                .selectAll('rect')
                .data(function(d) {
                    console.log(d);
                    return d.values;
                }) // numerical values of each
                .enter().append('rect')
                .attr('y', function(d) {
                    return x(d.country);
                })
                .attr('x', labelWidth + 10)
                .attr('height', x.bandwidth())
                .attr('width', function(d) {
                    if (d.units == 'percent'){
                        return y(d.value); // passing d.mean as parameter to scale function
                    } else {
                      return yAbs(d.value);
                    }

                });
            /*      .attr('class', function(d,i,array){
                    var str = i === 0 ? ' first-chart' : i === array.length - 1 ? ' last-chart' : '';
                    return  d.key + str;
                  }) */
            /*      .append('g')
              //.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
              .selectAll('rect')
              .data(function(d){ return d.values; })  // numerical values of each
              .enter().append('rect')
      
              .attr('y', function(d){ 
                  return x(d.country);
              })
              .attr('x', labelWidth + 10) 
         
              .attr('height', x.bandwidth())
              .attr('width', function(d){
                // console.log(d);
                  return y(d.value); // passing d.mean as parameter to scale function
                
              }) // passing d.mean as parameter to scale function
              .attr('class', function(d,i){
              
                  return d.country + ' series-' + i;
              
              })
              .on('mouseover', tool_tip.show) // .show is defined in links d3-tip library
                .on('mouseout', tool_tip.hide)  // .hide is defined in links d3-tip library
                .call(tool_tip); */

            /*             d3.selectAll('#chart-1 .last-question .svg-wrapper')
                           .append('p')
                           .attr('class', 'country-label')
                           .text(function(d){
                            // console.log(d);
                             return d.values[0].readable;
                           }); */

            questionDiv.selectAll('svg')
                .append('g')
                .attr('class', 'x-axis')
                .attr('transform', 'translate(' + (labelWidth + 10) + ', 0)')
                .call(xAxis)
                .selectAll("text")
                //   .attr("transform", "rotate(-90)")
                .attr("y", 1)
                .attr("x", -7)
                //     .attr("dx",22)

                .style("text-anchor", "end");

            questionDiv.selectAll('svg.percent')
                .append('g')
                .attr('transform', 'translate(' + (labelWidth + 10) + ',' + (svgHeight) + ')')
                .attr('class', 'y-axis')
                .call(yAxis);

            questionDiv.selectAll('svg.abs')
                .append('g')
                .attr('transform', 'translate(' + (labelWidth + 10) + ',' + (svgHeight) + ')')
                .attr('class', 'y-axis')
                .call(yAxisAbs);



        } // end setup()
    }; // end prototype for BarChart


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
                .key(function(d) {
                    return d.category;
                })
                .key(function(d) {
                    return d.question;
                })
                .key(function(d) {
                    return d.country;
                })
                .entries(json);
            app.data = nested;
            // param0: container; param1: array of categories; param2: array of questions; param3: boolean show heading?
            new ColumnChart('#chart-0', ['electricity'], ['generator'], true);
            new ColumnChart('#chart-1', ['electricity'], ['outages'], false);
            new ColumnChart('#chart-2', ['access_to_finance'], [], true);
            new BarChart('#chart-3', ['owner_characteristics'], ['age', 'experience'], true);
            new BarChart('#chart-4', ['owner_characteristics'], ['owner_university','parent_university'], false);
            new BarChart('#chart-5', ['owner_characteristics'], ['parent_business'], false);
            new BarChart('#chart-6', ['owner_characteristics'], ['female_owned'], false);


        }
    }

    d3.csv(DATA_FILE, app.initialize);

})(); // end IIFE