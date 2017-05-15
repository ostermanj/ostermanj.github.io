"use strict";

/*
 * Chart prototype, common to all scorecard charts
 */

var Chart = function(el) {

    var chart = this;
    this.el = el;
    this.chartMinMaxDomain();
    this.elementWatchers = {};
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
        console.log(this.min);
        console.log(this.max);
        console.log(numericValues);
        this.protoSetup();
    },
    protoSetup: function() { 

        var chart = this; 
         
        d3.select('.post-content')
            .insert('div','#chart-0')
            .attr('id','compare-view-outer')
            .append('div')
            .attr('id','compare-view')
            .style('height', ( chart.svgHeight + 2 ) + 'px');

        this.groups = d3.select(this.el)
        .selectAll('div')
        .data(model.data).enter()
        .append('div')
        .attr('id', function(d) {
            return d.key.replace(/\d-/,'').replace(' ','-').toLowerCase();
        })
        .attr('class','main-group');

        this.svgs = this.groups.selectAll('svg')
            .data(function(d){
                return d.values;
            }).enter().append('svg')
            .attr('id', function(d) {
                return d.key;
            })
            .attr('class','untouched')
            .attr('width', this.svgWidth)
            .attr('height', this.svgHeight)
            .on('mouseenter', function(d,i,array){
                
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

        this.svgs.append('text')
        .attr('class','group-label')
        .attr('alignment-baseline','hanging')
        .attr('x', 2)
        .attr('y',2)
            .text(function(d,i){
                
            return i === 0 ? d.values[0].income_group.replace(/\d-/,'') : '';
        });


        this.createLock();
        this.setup();

    },

    createLock: function(){
         this.lockIcon = this.svgs.append('g')
            .attr('id','lock-icon')
            .attr('class','open');
            
            
            
        this.lockIcon.append('rect')
            .attr('x', 1.5)
            .attr('y', 9)
            .attr('width', 11)
            .attr('height',9);

        this.lockIcon.append('defs')
            .append('clipPath')
            .attr('id','lock-clip')
            .append('rect')
            .attr('x', 1)
            .attr('width',11)
            .attr('height',5);

        this.lockGroup = this.lockIcon.append('g')
        .attr('id','lock-group');

        this.lockGroup.append('circle')
        .attr('clip-path','url(#lock-clip)')
        .attr('stroke-width',2)
        .attr('cx',7)
        .attr('cy',5)
        .attr('r',4);

        this.lockGroup.append('line')
        .attr('stroke-width',2)
        .attr('x1',3)
        .attr('y1',5)
        .attr('x2',3)
        .attr('y2',7);

        this.lockGroup.append('line')
        .attr('stroke-width',2)
        .attr('x1',11)
        .attr('y1',5)
        .attr('x2',11)
        .attr('y2',9);
        
    },
    createClone: function(svg) {
         var clone = svg.cloneNode(true);
                        clone.id += '-clone';
                        clone.setAttribute('class','show-clone');
                        document.getElementById('compare-view').appendChild(clone);
    },

    toggleLock: function(d,i,nodes){
        reportCard.createMonitor('compare-view-outer');
        console.log(d);
        var svg = this;
        
        var lockIcon = this.getElementById('lock-icon');
        d3.select(lockIcon)
          .attr('class', function(){
            
            if (lockIcon.getAttribute('class') !== 'closed') {
                  reportCard.intervals['svg-' + d.key] = window.setInterval( function() {
                    
                    if ( svg.getAttribute('class').indexOf('done') !== -1 ){
                        var clone = svg.cloneNode(true);
                        clone.id += '-clone';
                        clone.querySelectorAll('clipPath').forEach(function(clip){
                            clip.id = clip.id + '-clone';
                        })
                        document.getElementById('compare-view').appendChild(clone);
                        reportCard.timers['svg-clone-' + d.key] = window.setTimeout(function(){
                            clone.setAttribute('class','show-clone');
                        }, 200);

                        clearInterval(reportCard.intervals['svg-' + d.key]);                        
                    }
                }, 20);
                return 'closed';

            } else {
                clearTimeout(reportCard.timers['svg-clone-' + d.key]);
                var cloned = document.getElementById(d.key + '-clone');
                cloned.setAttribute('class','hide-clone');
                window.setTimeout(function(){
                    cloned.parentNode.removeChild(cloned);
                },550); 

                return 'open';
            }
          });
          
          d3.select(this)        
          .attr('class', function(){
            var svg = this;
            if (this.getAttribute('class').indexOf('locked') !== -1) { // is not locked
                
             /*  reportCard.intervals['svg-' + i] = window.setInterval( function() {
                    console.log(svg);
                    if ( svg.getAttribute('class').indexOf('done') !== -1 ){
                        var clone = svg.cloneNode(true);
                        clone.id += '-clone';
                        clone.setAttribute('class','show-clone');
                        document.getElementById('compare-view').appendChild(clone);
                        clearInterval(reportCard.intervals['svg-' + i]);                        
                    }
               }, 2000); */
               return 'transforming done';
            }
            if ( this.getAttribute('class').indexOf('transforming done') !== -1 ){
               
                return 'locked done';
            }
            if ( this.getAttribute('class').indexOf('transforming') !== -1 ){
                return 'locked'
            }
        });



    
   }
      
 
   

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


    createMonitor: function( el ){


            var monitor = scrollMonitor.create( document.getElementById(el), 4);
            monitor.lock();
            function freeze() {
                 monitor.watchItem.className = 'freeze'; 
                 document.getElementById('chart-0').style.marginTop = '141px';             
            }
             if (monitor.isAboveViewport){
                freeze(); 
             }
            console.log(monitor);
            monitor.partiallyExitViewport(function() {
              if (monitor.isAboveViewport){
                  freeze();   
              }
            });

            monitor.fullyEnterViewport(function() {
                monitor.watchItem.className = '';
                document.getElementById('chart-0').style.marginTop = '';   
            });
    },


    setup: function() {

    this.timers = {};
    this.intervals = {};

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
                .domain([0, chart.max])
                .range([0, (chart.svgHeight / 2) - chart.strokeWidth - chart.margin.top]);

        this.yAxisScale = d3.scaleLinear()
                .domain([0, chart.max])
                .range( [ (chart.svgHeight - chart.margin.bottom - chart.strokeWidth - 1 ), chart.margin.top - chart.strokeWidth + 6 ] );

        this.yAxis = d3.axisRight().scale(chart.yAxisScale).ticks(4).tickSize(2);

        this.maskBars = this.svgs.append('defs')
        .selectAll('clipPath')
         .data(function(d) {
            
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

        this.axisG = this.svgs.append('g')
            .attr('id','y-axis')
            .attr('transform',function(){
                return 'translate(' + ( chart.svgWidth - chart.margin.right - 6 ) + ',0)';
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
                if (i === array.length - 1) {
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
        
        if ( array[i].className.baseVal.indexOf('locked') !== -1 ) {
            return;
        }
        var chart = this;
        
        
       d3.select(array[i])
       .attr('class','touched')
       .on('mouseleave', function(d,i,array){
               
                chart.hoverOut.call(chart,d,i,array);
            }) 
       .on('click', function(d,i,array){
        //console.log(this.className.baseVal);
            if (this.className.baseVal.indexOf('transforming') !== -1 || this.className.baseVal.indexOf('locked') !== -1 ){
                  chart.toggleLock.call(this,d,i,array);
             } else {
                  clearTimeout(chart.timers['svg-' + d.key]);
                  chart.transform.call(chart,d,i,array);
             }

        });
                
        
        chart.timers['svg-' + d.key] = setTimeout(function(){

            chart.transform(d,i,array);
        
        },500);   
    
    },
    transform: function(d,i,array){
        var chart = this;
        var svg = d3.select(array[i])
           .attr('class','transforming');
           
           svg.selectAll('ellipse')
             .on('mouseover', chart.tool_tip.show) // .show is defined in links d3-tip library
                .on('mouseout', chart.tool_tip.hide)            
            .transition().duration(500)
            .attr('rx', 1)
            .attr('ry', function(d){
                return chart.y(d.value) - chart.strokeWidth;
            })
            .attr('cy', function(d,i,array){
                return chart.svgHeight - chart.y(d.value) - chart.margin.bottom + chart.strokeWidth - 5;
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
            })
            .on('end', function() {
                var $svg = d3.select(array[i]);
                console.log(array[i]);
                if ($svg.attr('class') === 'transforming') {
                    $svg.attr('class','transforming done');
                } else if ( $svg.attr('class') === 'locked' ) {
                   $svg.attr('class','locked done');
                }
                $svg.select('g#y-axis').call(chart.yAxis);
                
            });

        /*
        d3.select(array[i])
            .transition().delay(1000)
            .attr('class','transforming done');*/
    },
     hoverOut: function(d,i,array) {
        var chart = this;
        clearTimeout(chart.timers['svg-' + d.key]); // clear the hoverIn timer
        var svgClass = d3.select(array[i]).attr('class');
        if (svgClass.indexOf('locked') !== -1 ) {
            return;
        } 
        if ( svgClass.indexOf('touched') !== -1) {
             d3.select(array[i])
               .attr('class','untouched');
               return;
        }
        
      d3.select(array[i])
       .attr('class','untouched')
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
         //   
         //   
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
            .sortKeys(d3.descending)
            .key(function(d) {
                return d.country;
            })
            .entries(json);


        model.data = nested; // MOVE THIS
        

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
        
        model.nest(result);
    }
       
    

};

var controller = {
    makeCharts: function() {
        reportCard = new CircleChart('#chart-0');
    }
};

/*
 * INITIALIZE
 */
var reportCard;
var DATA_FILE = 'data/country-scorecard.csv';
var JOIN = {
    file: 'data/income-group.csv',
    joinKey: 'code', // same key for both here, but could specify different keys for the join function
    select: function(a,b){
      //  
      //  
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