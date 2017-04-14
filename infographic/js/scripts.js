(function(){
"use strict";
    var infographic = {
        sectionsFired: [],
        setMonitors: function(){
            var content = this;
            var containerElement = document.getElementById('view');
            var containerMonitor = scrollMonitor.createContainer(containerElement);
            var sections = document.querySelectorAll('section');
            sections.forEach(function(section,i){

                var elementWatcher = containerMonitor.create(section, {top:196,bottom:-196});
                elementWatcher.index = i;
                elementWatcher.stateChange(function(){
                    
                    if ( this.isAboveViewport && this.isInViewport && this.watchItem.className.indexOf('active') === -1 ) {
                        sections.forEach(function(section){
                            section.className = section.className.replace(/active/g,'');
                        });
                        if ( content.sectionsFired.indexOf(this.index) === -1 ){
                            content.fireSection['section-' + this.index]();
                        }
                        content.sectionsFired.push(this.index);
                        this.watchItem.className += 'active';
                    }
                });
            });

            var africaMonitor = containerMonitor.create(document.getElementById('svg-1'),{top:-50,bottom:0});
            africaMonitor.enterViewport(function(){
              if (this.isBelowViewport){
                  content.showAfrica();
              }
            });
        },
        showAfrica: function() {
console.log('show africa');
            var data = {
                   "iran": {
                      "refugees": "979,437",
                      "refugees_per_capita": 12.38
                   },
                   "iraq": {
                      "refugees": "277,701",
                      "refugees_per_capita": 7.62
                   },
                   "jordan": {
                      "refugees": "664,118",
                      "refugees_per_capita": 366.25
                   },
                   "turkey": {
                      "refugees": "2,541,352",
                      "refugees_per_capita": 32.31
                   },
                   "cameroon": {
                      "refugees": "342,973",
                      "refugees_per_capita": 14.69
                   },
                   "egypt": {
                      "refugees": "212,500",
                      "refugees_per_capita": 2.32
                   },
                   "kenya": {
                      "refugees": "553,912",
                      "refugees_per_capita": 12.03
                   },
                   "pakistan": {
                      "refugees": "1,561,162",
                      "refugees_per_capita": 8.26
                   },
                   "sudan": {
                      "refugees": "309,639",
                      "refugees_per_capita": 7.7
                   },
                   "syria": {
                      "refugees": "21,113",
                      "refugees_per_capita": 29.61
                   },
                   "afghanistan": {
                      "refugees": "257,554",
                      "refugees_per_capita": 7.92
                   },
                   "drc": {
                      "refugees": "383,095",
                      "refugees_per_capita": 4.96
                   },
                   "ethiopia": {
                      "refugees": "736,086",
                      "refugees_per_capita": 7.41
                   },
                   "niger": {
                      "refugees": "124,721",
                      "refugees_per_capita": 6.27
                   },
                   "south_sudan": {
                      "refugees": "263,016",
                      "refugees_per_capita": 21.31
                   },
                   "chad": {
                      "refugees": "369,540",
                      "refugees_per_capita": 26.33
                   },
                   "tanzania": {
                      "refugees": "211,845",
                      "refugees_per_capita": 3.96
                   },
                    "yemen": {
                      "refugees": "267,173",
                      "refugees_per_capita": 9.96
                   },
                   "uganda": {
                      "refugees": "477,187",
                      "refugees_per_capita": 12.23
                   },
                   "lebanon": {
                          "refugees": "1,070,854",
                          "refugees_per_capita": 183.03
                       }
                    
                };

            var tool_tip = d3.tip() 
                .attr("class", "d3-tip")
                
                .direction('w')
                .html(function() {
                    return '<strong>' + d3.select(this).attr('id').replace('_',' ').toUpperCase() + '</strong><br />' +
                           '<strong>Refugees:</strong> ' + data[d3.select(this).attr('id')].refugees + '<br />' +
                           '<strong>Refugees per capita:</strong> ' + data[d3.select(this).attr('id')].refugees_per_capita;
                    })
                .style('opacity', 1);

       /*     function highlight(){
                
                d3.selectAll('.country')
                    .attr('class','country');
                d3.select(d3.event.target)
                    .attr('class','country highlight');
            }*/
            var moused = false;

            d3.selectAll('.country')
                .on('mouseover', function(d,i,nodes){
                  if (!moused) {
                    d3.selectAll('.country').attr('class','country');
                    moused = true;
                  }
                //  tool_tip.hide.call(nodes[i],d,i,nodes); 
                  tool_tip.show.call(nodes[i],d,i,nodes,nodes[i]); // .show is defined in links d3-tip library
                })
                .on('mouseout', tool_tip.hide) // .hide is defined in links d3-tip library
                .call(tool_tip);
                /*.on('click', function(){
                    highlight();
                })*/
            function showCountry() {
              setTimeout(function(){
                if (!moused) {
                  var targetEl = document.getElementById('turkey');
                  d3.select(targetEl)
                    .attr('class','country highlight');
                    moused = false;
                  tool_tip.show.call(targetEl,targetEl);
                  
                }
              },500);
            }
            
            d3.select('#svg-1')
                .transition().duration(1000).delay(500).on('end',showCountry)
                .attr('opacity',1);

            
        },
        fireSection: {
            'section-0': function(){
                console.log('fire section 0');
            },
            'section-1': function(){
                var svg;
                var ppl;
                var number;
                var numberText;
                var refugeeNumber;

                var tool_tip = d3.tip() 
                  .attr("class", "d3-tip")
                  
                  .direction('n')
                  .html(function() {
                      return 'Source: UNHCR, as of December 2015';
                      })
                  .style('opacity', 1);

                function showQueries() {
                    svg.append('g')
                    .call(tool_tip)
                    .on('mouseover', tool_tip.show) // .hide is defined in links d3-tip library
                    .on('mouseout', tool_tip.hide)
                    .attr('transform', 'translate(438,209) scale(0.75)')
                    .append('path')
                    .attr('d','M10,0C4.477,0,0,4.477,0,10c0,5.522,4.477,10,10,10c5.522,0,10-4.478,10-10C20,4.477,15.522,0,10,0z M11,17H8v-3h3V17z      M14,6.163c0,0.664-0.046,1.243-0.344,1.737c-0.299,0.495-0.572,0.958-0.924,1.392c-0.055,0.054-0.08,0.112-0.127,0.173     c-0.048,0.061-0.086,0.119-0.14,0.173c-0.298,0.379-0.557,0.765-0.787,1.158s-0.341,0.833-0.341,1.32     c0,0.014,0.022,0.096,0.022,0.123c0,0.014-0.011-0.215-0.021-0.206L11,12H8v-0.778c0-0.474,0.323-0.853,0.472-1.138     s0.462-0.555,0.693-0.812C9.273,9.163,9.45,9.044,9.572,8.916c0.122-0.128,0.275-0.267,0.397-0.417     c0.122-0.135,0.252-0.284,0.361-0.447c0.108-0.163,0.224-0.345,0.333-0.548c0.122-0.271,0.213-0.518,0.268-0.742     s0.083-0.417,0.083-0.579c0-0.366-0.104-0.64-0.314-0.823c-0.21-0.183-0.47-0.274-0.782-0.274c-0.353,0-0.606,0.198-0.761,0.53     C9,5.948,8.923,6,8.923,7H5.957c0,0,0.007-0.392,0.021-0.581C5.99,6.229,6.018,6.023,6.058,5.833     c0.135-0.799,0.484-1.535,1.046-2.192c0.562-0.657,1.5-0.99,2.814-0.99c1.3,0,2.22,0.266,2.965,0.801S14,4.815,14,5.939V6.163z')
                    .attr('class','query'); // ;
                    /*.append('path')
                    .attr('d','M11.188,12.293');*/


                }

                function refugeeText() {
                    refugeeNumber = svg.append('g')
                    .attr('class','refugee-number');

                    refugeeNumber.attr('transform', 'translate(161,225)')
                    .append('text')
                    .text('21')
                    .attr('font-size','90px')
                    .attr('text-anchor','middle')
                    .attr('opacity',0)
                    .transition().duration(500)
                    .attr('opacity',1);

                    refugeeNumber.append('text')
                    .text('million of them were refugees')
                    
                    .attr('text-anchor','start')
                    .attr('x',42)
                    .attr('opacity',0)
                    .transition().duration(490).on('end',showQueries)
                    .attr('opacity',1);


                }

                function refugeeShare() {
                    console.log('refugee share');
                    console.log(ppl.selectAll('path'));
                    ppl.selectAll('path')
                    .each(function(d,i,nodes){
                        d3.select(this)
                        .transition().delay(10 * i).on('end',function(){
                            if ( i === nodes.length - 1) {
                                refugeeText();
                            }
                        })
                        .attr('class',function(){
                            
                            if ( i  >  65 - 21 ) {
                                return 'person refugee';
                                
                            } else {
                                return 'person';
                            }
                        });                    
                    });
                }


                function fadeInMillions() {
                    
                    numberText = number.datum('million people/were displaced/as of 2015')
                    .append('text')
                    .attr('opacity',0);

                    numberText.attr('y','1.2em')
                    .attr('opacity',0)
                    .each(function(d){
                        var splitPhrase = d.split('/');
                        for ( var i = 0; i < splitPhrase.length; i++ ){
                            d3.select(this).append('tspan')
                            .text(splitPhrase[i])
                            .attr('dy', i ? '1.2em' : 0)
                            .attr('x',0)
                            .attr('text-anchor','middle');
                        }
                        
                    });

                    numberText.transition().duration(500).on('end',refugeeShare)
                    .attr('opacity',1);

                }                            
                    
                    
                 
                

                function revealNumber(){
                    number = svg.append('g')
                        .attr('transform','translate(440,100)')
                        .attr('class','top-number');

                        number.append('text')
                        .text('65')
                        .attr('font-size','90px')
                        .attr('text-anchor','middle')
                        .attr('transform', 'scale(0.2)')
                         .transition().duration(500).ease(d3.easeBounce).on('end',fadeInMillions)
                        .attr('transform','scale(1)');

                        
                }

                setTimeout(function(){
                    console.log('fire section 1');
                    svg = d3.select('#svg-0');
                    ppl = svg.append('g')
                        .attr('class','ppl');
                    for ( var i = 0; i < 65; i++ ) {
                        ppl.append('path')
                            .attr('class','person')
                            .attr('transform','scale(0.5) translate(1200,0)')
                            .attr('d','M4.625,16.047c-1.81,2.019-5.056,24.047-4.577,24.552s2.555,2.02,3.353,0.674 c0.798-1.347,3.353-17.148,3.353-17.148s-0.479,22.886,0,23.896c0.479,1.009,1.437,1.178,1.437,1.178S6.168,76.404,7.126,77.414 s4.791,1.852,5.749,0c0.958-1.851,1.064-27.317,1.064-27.317l1.915,0.168c0,0,0.64,25.187,1.118,26.701 c0.479,1.515,5.11,1.346,5.908,0c0.798-1.347-1.118-27.767-1.118-27.767s0.479,0.336,1.118-0.673 c0.64-1.01-1.276-23.894-1.276-23.894s3.353,15.789,3.832,16.463c0.479,0.674,2.873,1.347,3.353-0.505s-2.874-22.188-5.11-24.88 c-1.095-1.319-6.626-1.922-6.626-1.922l-0.08-1.023c0,0,3.749-3.559,3.912-6.137c0.16-2.524-0.479-5.902-5.748-6.07 C9.867,0.39,9.229,4.28,9.388,7.31c0.16,3.029,2.395,5.312,2.395,5.312l0.08,1.098C11.863,13.72,6.591,13.852,4.625,16.047')
                            .transition().duration(10*i)
                            .attr('transform','scale(0.5) translate(' + ( ( 32 * i ) - ( Math.floor( i / 20 ) * 640 ) ) + ',' + Math.floor( i / 20 ) * 78  + ')');
                        if ( i === 64 ) {
                            setTimeout(revealNumber,1000);
                        }
                    }
                },1000);
            },
            'section-2': function(){
                console.log('fire section 2');
            },
            'section-3': function(){
                console.log('fire section 3');
            },
        }
    };
    infographic.setMonitors();
}());