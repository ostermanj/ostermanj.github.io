(function() { // wrapping script in immediately invoked function expression (IIFE, 'iffy') to contain scope
    'use strict'; // forcing good behavior 

    var ColumnChart,
        BarChart,
        app,
        DATA_FILE = '/informality/data/informality-concept.csv',
        previousMax;
        
    String.prototype.capitalizeFirstLetter = function() { // HT  http://stackoverflow.com/a/3291856/5701184
        return this.charAt(0).toUpperCase() + this.slice(1);
    };


    ColumnChart = function(el, cats, quest, head, scaleMax, log) {
        var chart = this;
        this.el = el;
        this.cats = cats;
        this.quest = quest;
        this.head = head;
        this.scaleMax = scaleMax;
        this.log = log;
        this.chartMinMax();

        var elementWatcher = scrollMonitor.create( el );
        elementWatcher.enterViewport(function() {
          if (this.watchItem.className.indexOf('in-view') === -1){
                chart.adjustLength();
                this.watchItem.className += ' in-view';
               
             }
        });
      
    };

    ColumnChart.prototype = {
       chartMinMax: function(){
        
          
          var chart = this;
          var numericValues = [];
          this.domainRange = [];
          var filteredData = app.data.filter(function(obj){ 
            if (chart.cats.length > 0) {
                        return chart.cats.indexOf(obj.key) != -1;
                    } else {
                        return true;
                    }
          });
          
          filteredData.forEach(function(obj){ // obj key: 'owner_characterstics', values: array(6[quest]), for example
            
              obj.values.forEach(function(q){ //for each question
                if (chart.quest.length === 0 || chart.quest.indexOf(q.key) !== -1) { // if question is in parameter or if no parameters
                  q.values.forEach(function(c){ // cycle through the values
                    c.values.forEach(function(d){  // cycle through the values' values
                      if (chart.domainRange.indexOf(d.firm_type) === -1){
                        chart.domainRange.push(d.firm_type);
                      }
                     numericValues.push(d.value); // and push the value of the datum to the array
                     chart.units = d.units;
                    })
                  })
                }
              })
                  
          });
          chart.domainRange.sort();
                
          
          this.min = d3.min(numericValues);
          this.max = d3.max(numericValues);
          if (this.scaleMax){
            if (!isNaN(this.scaleMax)) {
              this.max = this.scaleMax;
              
            } else if (this.scaleMax === 'previous'){
              this.max = previousMax;
              
            }
          }
          previousMax = this.max;
          this.setup();
          
        },
        adjustLength: function(){
            
            var chart = this;
            
            
            this.svgs.selectAll('rect')
            .transition().delay(200).duration(1000).ease(d3.easeBounce)
            .attr('height', function(d) {
                
                    return chart.y(d.value); // passing d.value as parameter to scale function
                })
            .attr('y', function(d) {
                    return chart.svgHeight - chart.y(d.value); // passing d.value as parameter to scale function
                }); 
        },
        setup: function() {
            
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

                .domain(chart.domainRange) 
                .range([0, svgWidth])
                .padding(0.33);

            chart.y = d3.scaleLinear()
                .domain([0, chart.max])
                .range([0, chart.svgHeight]);

            var yAxisScale = d3.scaleLinear()

                .domain([0, chart.max])
                .range([chart.svgHeight, 0]);

            var xAxis = d3.axisBottom().scale(x).tickSize(0).tickFormat(function(d){
                
                return d.replace(/\d-/,'');
            });

            var yAxis = d3.axisRight().scale(yAxisScale).ticks(2).tickSize(0).tickFormat(function(d){
                
                if (chart.units === 'percent'){
                    return d3.format(',.0%')(d); // as a percent rounded no decimal
                } else if (chart.units === 'currency'){
                    return '$' + d3.format(",.0s")(d) // with SI abbrev (k, M, etc), no decimal
                } else {
                    return d;
                }
                
            });



            

            var tool_tip = d3.tip()
                .attr("class", "d3-tip")
               
                .direction(function(){
                    if (window.innerWidth > 820){
                        return 'n';
                    } else {
                        return 'e';
                    }
                })
                .html(function(d) {
                    if (d.units === 'percent') {
                        return '<b>' + d.firm_type.toUpperCase().replace(/\d-/,'') + '</b> (' + d.country + ')<br>' +
                            d3.format(",.1%")(d.value) + '<br>' +
                            '(n = ' + d.n + ')';
                    } else if (d.units === 'currency') {
                        return '<b>' + d.firm_type.toUpperCase().replace(/\d-/,'') + '</b> (' + d.country + ')<br>' +
                            '$' + d3.format(",.0s")(d.value) + '<br>' +
                            '(n = ' + d.n + ')';
                    } else if (d.units === 'abs') {
                        return '<b>' + d.firm_type.toUpperCase().replace(/\d-/,'') + '</b> (' + d.country + ')<br>' +
                            d.value + '<br>' +
                            '(n = ' + d.n + ')';
                    } else {
                        return '<b>' + d.firm_type.toUpperCase().replace(/\d-/,'') + '</b> (' + d.country + ')<br>' +
                            d.units.capitalizeFirstLetter() +  ': '  + d.value + '<br>' +
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
               
                .attr('class', function(d, i, array) {
                    var str = i === 0 ? 'first-category ' : i === array.length - 1 ? 'last-category ' : '';
                    return 'viz-category ' + str + d.key;
                });

            if (chart.head) {
                categoryDiv.append('h4')
                    .text(function(d) {
                        return d.key.toUpperCase().replace(/_/g, ' '); // electricity, access to finance
                    })
                    .attr('id', function(d){return d.key;});
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
                    // 
                    return d.values[0].values[0].readable;
                });




            this.svgs = questionDiv.selectAll('svg')
                .data(function(d) {
                    return d.values;
                }) // 4 x array[5] : Object[key=<country>]
                .enter().append('div')
                .attr('class', 'svg-wrapper')
                .append('svg')
                .attr('width', svgWidth + margin.left + margin.right)
                .attr('height', this.svgHeight + margin.top + margin.bottom)
                .attr('class', function(d, i, array) {
                    var str = i === 0 ? ' first-chart' : i === array.length - 1 ? ' last-chart' : '';
                    return d.key + str + ' series-' + i + ' ' + d.values[0].units;
                });

            this.svgs.append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
                .selectAll('rect')
                .data(function(d) {
                    return d.values;
                }) // numerical values of each
                .enter().append('rect')
               
                .attr('x', function(d) {
                    return x(d.firm_type);
                })
                .attr('y', function(d) {
                    return chart.svgHeight; // passing d.value as parameter to scale function
                })

                .attr('width', x.bandwidth())
                
                .attr('class', function(d) {

                    return d.firm_type.replace(/\d-/,'');

                })

                .on('mouseover', tool_tip.show) // .show is defined in links d3-tip library
                .on('mouseout', tool_tip.hide) // .hide is defined in links d3-tip library
                .call(tool_tip);

                questionDiv.append('p')

                .html(function(d) {
                    // 
                    return d.values[0].values[0].note;
                })
                .attr('class','chart-note')
                .attr('style', function(d){
                    if (!d.values[0].values[0].note){
                        return 'display: none';
                    }
                });

            d3.selectAll(this.el + ' .last-question .svg-wrapper')
                .append('p')
                .attr('class', 'country-label')
                .text(function(d) {
                    return d.key;
                });

            questionDiv.selectAll('svg')
                .append('g')
                .attr('class', 'x-axis')
                .attr('transform', 'translate(0,' + (this.svgHeight + margin.top) + ')')
                .call(xAxis)
                .selectAll("text")
             /*   .html(function(d){
                    
                    return d.firm_type;
                })*/
                .attr("transform", "rotate(-90)")
                .attr("y", 0)
                .attr("x", 0)
                .attr("dx", 22)
                .attr("dy", 3)
                .style("text-anchor", "start");

            questionDiv.selectAll('svg')
                .append('g')
                .attr('transform', 'translate(' + svgWidth + ', ' + (margin.top) + ')')
                .attr('class', 'y-axis')
                .call(yAxis);

           


              //  this.adjustLength();
        } // end setup()
    }; // end prototype  for ColumnChart

    BarChart = function(el, cats, quest, head, scaleMax, log) {
        var chart = this;
        this.el = el;
        this.cats = cats;
        this.quest = quest;
        this.head = head;
        this.scaleMax = scaleMax;
        this.log = log;
        this.chartMinMax();
        
        var elementWatcher = scrollMonitor.create( el );
        elementWatcher.enterViewport(function() {
          if (this.watchItem.className.indexOf('in-view') === -1){
                chart.adjustLength();
                this.watchItem.className += ' in-view';
               
             }
        });

       
    };



    BarChart.prototype = {
        chartMinMax: function(){
        
          var chart = this;
          var numericValues = [];
          var filteredData = app.data.filter(function(obj){ 
            if (chart.cats.length > 0) {
                        return chart.cats.indexOf(obj.key) != -1;
                    } else {
                        return true;
                    }
          });
          
          filteredData.forEach(function(obj){ // obj key: 'owner_characterstics', values: array(6[quest]), for example
            
              obj.values.forEach(function(q){ //for each question
                if (chart.quest.length === 0 || chart.quest.indexOf(q.key) !== -1) { // if question is in parameter or if no parameters
                  q.values.forEach(function(c){ // cycle through the values
                    c.values.forEach(function(d){  // cycle through the values' values
                      numericValues.push(d.value); // and push the value of the datum to the array
                      chart.units = d.units;
                    })
                  })
                }
              })
                  
          });
                 
          
          this.min = d3.min(numericValues);
          this.max = d3.max(numericValues);
            if (this.scaleMax){
            if (!isNaN(this.scaleMax)) {
              this.max = this.scaleMax;
              
            } else if (this.scaleMax === 'previous'){
              this.max = previousMax;
              
            }
          }
          this.setup();
          
        },
        adjustLength: function(){
            
            var chart = this;
            
            
            this.gs.selectAll('rect')
            .transition().delay(200).duration(1000).ease(d3.easeBounce)
            .attr('width', function(d) {
                   
                        return chart.y(d.value); // passing d.mean as parameter to scale function
                   

                })
        },
        setup: function() {
            var chart = this;
            var margin = {
                    top: 5,
                    right: 26,
                    bottom: 5,
                    left: 0
                },
                svgWidth = 305 - margin.right - margin.left,
                labelWidth = 40,
                svgHeight = 90 - margin.top - margin.bottom;
                
                
            var x = d3.scaleBand()
                .domain(['DRC', 'Ghana', 'Kenya', 'Myanmar', 'Rwanda'])
                .range([0, svgHeight])
                .padding(0.33);
            
            var yAxisScale;
            
            if (this.log === true) {
                chart.y = d3.scaleLog()
                    .domain([0, chart.max])
                    .range([0, svgWidth - labelWidth]);
                 yAxisScale = d3.scaleLog()
                    .domain([0, chart.max])
                    .range([0, svgWidth - labelWidth]);
            } else {
                chart.y = d3.scaleLinear()
                    .domain([0, chart.max])
                    .range([0, svgWidth - labelWidth]); 
          
               yAxisScale = d3.scaleLinear()
                    .domain([0, chart.max])
                    .range([0, svgWidth - labelWidth]);
                }



            var xAxis = d3.axisLeft().scale(x).tickSize(0);

           

             var yAxis = d3.axisBottom().scale(yAxisScale).ticks(5).tickSize(0).tickFormat(function(d){
                
                if (chart.units === 'percent'){
                    return d3.format('.0%')(d); // as a percent rounded no decimal
                } else if (chart.units === 'currency'){
                    return '$' + d3.format(",.0s")(d) // with SI abbrev (k, M, etc), no decimal
                } else {
                    return d;
                }
                
            });


           



           var tool_tip = d3.tip()
                .attr("class", "d3-tip")
                // .offset([-8, 0])
                .direction(function(){
                    if (window.innerWidth > 394){
                        return 'e';
                    } else {
                        return 'n';
                    }
                })
                .html(function(d) {
                    if (d.units === 'percent') {
                        return '<b>' + d.firm_type.toUpperCase().replace(/\d-/,'') + '</b> (' + d.country + ')<br>' +
                            d3.format(",.1%")(d.value) + '<br>' +
                            '(n = ' + d.n + ')';
                    } else if (d.units === 'currency') {
                        return '<b>' + d.firm_type.toUpperCase().replace(/\d-/,'') + '</b> (' + d.country + ')<br>' +
                            '$' + d3.format(",.0s")(d.value) + '<br>' +
                            '(n = ' + d.n + ')';
                    } else if (d.units === 'abs') {
                        return '<b>' + d.firm_type.toUpperCase().replace(/\d-/,'') + '</b> (' + d.country + ')<br>' +
                            d.value + '<br>' +
                            '(n = ' + d.n + ')';
                    } else {
                        return '<b>' + d.firm_type.toUpperCase().replace(/\d-/,'') + '</b> (' + d.country + ')<br>' +
                            d.units.capitalizeFirstLetter() +  ': '  + d.value + '<br>' +
                            '(n = ' + d.n + ')';
                    }
                })
                .style('opacity', 1);
            

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
                    .attr('id', function(d){return d.key;});
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
                    
                    return d.values[0].values[0].units;
                });

            this.gs = svgs.selectAll('g')
                .data(function(d) {
                    return d.values;
                })
                .enter().append('g')
                .attr('class', function(d, i) {
                    return 'series-' + i;
                });

            var rects = this.gs.selectAll('rect')
                .data(function(d) {
                    
                    return d.values;
                }) // numerical values of each
                .enter().append('rect')
                .attr('y', function(d) {
                    return x(d.country);
                })
                .attr('x', labelWidth + 10)
                .attr('height', x.bandwidth())
                
                .on('mouseover', tool_tip.show) // .show is defined in links d3-tip library
                .on('mouseout', tool_tip.hide)  // .hide is defined in links d3-tip library
                .call(tool_tip);
          
            this.gs.selectAll('text')
            .data(function(d) {
                    
                    return d.values;
                }) // numerical values of each
                .enter().append('text')
                .attr('y', function(d) {
                  //  
                    return x(d.country) + 9;
                })
                .attr('x', labelWidth + 12)
                .attr('font-size', 11)
                .attr('fill', '#666')
                .text(function(d){
                    if (d.value === 0){
                        return 'zero';
                    } else if (chart.y(d.value) < 2){
                        return d.value;
                    }
                });

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

            questionDiv.selectAll('svg')
                .append('g')
                .attr('transform', 'translate(' + (labelWidth + 10) + ',' + (svgHeight) + ')')
                .attr('class', 'y-axis')
                .call(yAxis);

           


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
            // param0: container; param1: array of categories; param2: array of questions; param3: boolean show heading?, p4: int or string "previous" for manual max, Boolean for log axis
            new BarChart('#chart-0', ['electricity'], ['electricity_use','grid'], false);
            new ColumnChart('#chart-1', ['electricity'], ['outages'], false);
            new ColumnChart('#chart-2', ['electricity'], ['outages_duration'], false);
            new ColumnChart('#chart-3', ['electricity'], ['generator'], false, 1);
            new BarChart('#chart-4', ['water'], ['water_use'], false);
            new BarChart('#chart-5', ['water'], ['water_insufficient'], false);
            new ColumnChart('#chart-6', ['access_to_finance'], ['bank_account'], false, 1);
            new ColumnChart('#chart-6b', ['access_to_finance'], ['loans_/_credit'], false, 1);
            new BarChart('#chart-7', ['crime'], ['severe_obstacle','crime_losses_month'], false);
            new BarChart('#chart-8', ['crime'], ['severity'], false, 4);
            new ColumnChart('#chart-9', ['crime'], ['severity_by_size'], false, 4);
            new ColumnChart('#chart-10', ['productivity'], ['sales_per_worker'], false);
            new BarChart('#chart-11', ['owner_characteristics'], ['age', 'experience'], false);
            new BarChart('#chart-12', ['owner_characteristics'], ['owner_university','parent_university'], false, 0.478);
            new BarChart('#chart-13', ['owner_characteristics'], ['parent_business'], false);
            new ColumnChart('#chart-14', ['owner_characteristics'], ['female_owned'], false, 1);
            new BarChart('#chart-15', ['benefits_of_registration'], ['finance','materials', 'bribes', 'receipts'], false);
            new ColumnChart('#chart-16', ['benefits_of_registration'], ['time_to_register'], false);
            new BarChart('#chart-17', ['registration_requirements'], ['days'], false);
            new BarChart('#chart-18', ['registration_requirements'], ['number_procedures'], false);
            new BarChart('#chart-19', ['registration_requirements'], ['cost_percent'], false);
            new BarChart('#chart-21', ['registration_requirements'], ['capital_percent'], false);
            new BarChart('#chart-22', ['registration_requirements'], ['capital_min'], false);
            
            app.createNav();

        },

        createNav: function() {

                   
             var heads = document.querySelectorAll('#full-text h2');
             var $div = d3.select('#inline-contents');
             $div.selectAll('button')
               .data(heads)
               .enter().append('button')
               .attr('class', 'nav-button')
               .text(function(d){
                
                return d.innerText;
               })
               .on('click', app.navigate);
                

            d3.selectAll('#full-text h2')
                .append('span')
                .attr('id', function(d,i){
                    return 'header-anchor-' + i;
                })
                .append('a')
                .attr('class','back-top')
                .attr('href', 'javascript:void(0)')
                .text('(contents)')
                .on('click', app.navigate);



        },

        navigate: function(d,i){
           console.log('header-anchor-' + i);
            d3.event.preventDefault();
            if ( this.className.indexOf('back-top') !== -1) {
                app.scrollToElement('inline-contents');
            } else {
                console.log('calling')
                app.scrollToElement('header-anchor-' + i);
            }

        },

        scrollToElement: function(element) {  // adapted from https://bl.ocks.org/mbostock/1649463 
            var elementNode;
        if (document.querySelectorAll('#' + element).length > 1) {
            elementNode = document.querySelectorAll('#' + element)[1];
        } else {
            elementNode = document.getElementById(element);
        }
        d3.transition()
            .delay(0)
            .duration(500).ease(d3.easeExp)
            .tween("scroll", scrollTween(elementNode.getBoundingClientRect().top));

        function scrollTween(position) {
          return function() {
            var offset = window.pageYOffset ? window.pageYOffset + position - 55: document.documentElement.scrollTop + position - 55;
            var i = d3.interpolateNumber(window.pageYOffset || document.documentElement.scrollTop, offset);
           
            return function(t) { scrollTo(0, i(t)); };
          };
        }          
    }
    }

    d3.csv(DATA_FILE, app.initialize);

})(); // end IIFE