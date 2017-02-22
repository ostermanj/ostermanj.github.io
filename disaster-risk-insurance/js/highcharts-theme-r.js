/*if (document.URL.indexOf('entity_iframe') != -1) {
 setInterval(
    function(){
        if (document.getElementById('hc-twitter-share')){
            ttl = $( "[property='dc:title']" ).attr('content');
            document.title = ttl;
            twitterShare = document.getElementById('hc-twitter-share');
            twitterShare.href = 'https://twitter.com/intent/tweet?original_referrer=' + encodedUrl + '&text=' + encodeURIComponent(ttl) + '&url=' + encodedUrl;
            clearInterval();
        }
    }
 , 100);
};
var homeURL = document.URL.replace('entity_iframe/','');
if (document.URL.indexOf('entity_iframe') != -1) {
    embedURL = document.URL;
}
else {
   embedURL = $('link[rel=shortlink]').eq(0).attr('href');
   embedURL = embedURL.replace('/node/','/entity_iframe/node/');
}
var shareUrl = homeURL;
var encodedUrl = encodeURIComponent(shareUrl);*/
var palette = palette || 'default';
if (palette == 'highlight'){
 seriesColors = ["#438390", "#c5c5c5", "#c5c5c5", "#c5c5c5", "#c5c5c5", "#c5c5c5", "#c5c5c5", "#c5c5c5"];
}
else if (palette == 'teal'){
   seriesColors = ["#438390", "#564e34", "#1fa9b8", "#898167", "#5ED6E4", "#C2B793", "#9CA9D3", "#9FBFF7"];
}
else {seriesColors = ["#438390", "#564e34", "#F37924", "#ffbb36", "#1fa9b8", "#898167", "#FF7B32","#FCBD45"];}


Highcharts.theme = {    
        lang: {
          thousandsSep: ','
        },
        chart: {
            backgroundColor: 'none',
            events:{
                load: function() {
                    this.credits.element.onclick = function() {
                        window.open(
                          homeURL,
                          '_blank' // <- This is what makes it open in a new window.
                        );
                     };
                     
                     if (window.frameElement) {
                         console.log('load');
                         $( window.frameElement ).attr('height',$('body').outerHeight());
                    }
                },
                redraw: function() {
                
                         if (window.frameElement) {
                                                  console.log('redraw');
                             console.log('frame height = ' + $( window.frameElement ).outerHeight() );
                             console.log('body height = ' + $( 'body' ).outerHeight() );
                             if ($( window.frameElement ).outerHeight() < $('body').outerHeight() || $( window.frameElement ).outerHeight() - $('body').outerHeight() > 30) {
                                 $( window.frameElement ).attr('height',$('body').outerHeight());
                             }
                        }
                     
                }
            },
            plotBackgroundColor: '#f3f3f3',
            plotShadow: false,
            spacingBottom:40,
            style: {
                 fontFamily: 'Lato',
                 background: '#f3f3f3 url("//www.cgdev.org/sites/default/files/cgd-swirl-only-small.png") no-repeat right bottom;'
            }
        },
        colors: seriesColors,
        credits: {
            text: 'Center for Global Development',
            position: {
                y: -8,
                x:-30
            }
        },
        /*exporting: {
            buttons: {
                contextButton: {
                                   verticalAlign: 'bottom',
                                   align: 'left',
                                   y:35,
                                   x:10,
                                   text: 'Share/Embed', 
                    menuItems: [{
                    text: '<a href="javascript:void(0)" onclick="console.log(this);embedClick();"  style="color:rgb(48,48,48);border:none;display:block;width:100%;">Embed this</a>'         
                    },  {
                    separator: true
                    },   {
                    text: '<a href="https://www.facebook.com/sharer/sharer.php?u=' + encodedUrl + '" target="_blank" style="color:rgb(48,48,48);border:none;display:block;width:100%;">' + 
                        'Share on Facebook</a>'
                    }, {
                    text: '<a href="https://plus.google.com/share?url=' + encodedUrl + '" target="_blank" style="color:rgb(48,48,48);border:none;display:block;width:100%;">' +
                        'Share on Google+</a>'
                    }, {
                    text: '<a id="hc-twitter-share" href="https://twitter.com/intent/tweet?original_referrer=' + encodedUrl + '&text=' + encodeURIComponent(document.title) + '&url=' + encodedUrl + '" target="_blank" style="color:rgb(48,48,48);border:none;display:block;width:100%;">' +
                        'Share on Twitter</a>'
                    }, {
                    text: '<a href="http://www.linkedin.com/shareArticle?mini=true&url=' + encodedUrl + '" target="_blank" style="color:rgb(48,48,48);border:none;display:block;width:100%;">' +
                        'Share on LinkedIn</a>'
                    }, {
                    separator: true
                    }]
                    .concat(Highcharts.getOptions().exporting.buttons.contextButton.menuItems)
                }
            }
        },*/
        navigation: {
            buttonOptions: {
                  theme: {
                      fill:'#ffffff',
                      stroke:'#ffbb36',
                      states: {
                          hover: {
                               fill:'#ffffff',
                                stroke:'#00444c'
                          },
                          select: {
                              fill:'#f3f3f3',
            
                          }
                       }
                 }
            },
            menuItemStyle: {
                 padding: '3px 5px'
            }
        },
        title: {
         
            style: {
                fontFamily: 'Futura, Helvetica, sans',
          fontSize: '20px'
            }
        },
        subtitle: {
            style: {
               paddingBottom: '20px'
            } 
        }
 }
 /*$(function () {
       cont = document.getElementById('hc-container');
    if (cont.parentElement.offsetHeight - cont.offsetHeight > 0){
          heightDiff = cont.parentElement.offsetHeight - cont.offsetHeight + 20;
       }
       else {heightDiff = 0;};
       ifHeight = $('.field-name-body')[0].offsetHeight;
       ifWidth = $('.field-name-body')[0].offsetWidth;
       copyDiv = document.createElement('div');
    copyDiv.setAttribute('style','position:absolute;bottom:' + (heightDiff + 193) + 'px;margin-left:20px;left:-9999px;width:90%;opacity:0;-o-transition:opacity 0.4s;-moz-transition:opacity 0.4s;-webkit-transition:opacity 0.4s;transition:opacity 0.4s;');
    copyDiv.id = 'copy-div';
    copyX = document.createElement('a');
    copyX.href = 'javascript:void(0);';
    copyX.setAttribute('onclick','embedClick();');
    copyX.innerHTML = '(X) close';
    copyX.setAttribute('style','text-align:center;background-color: white;border: #b5a899 solid 1px;border-top-width: 0;position: absolute;bottom: -24px;padding: 3px;z-index: 9;font-size: 13px;width:103px;height: 18px;padding:3px;left:0px; color: #006b77;font-family:Lato, Verdana, Arial, sans-serif;');
    copyDiv.appendChild(copyX);
    copyCode =  document.createElement('textarea');
    copyCode.setAttribute('type','text');
    copyCode.setAttribute('style','font-family: monospace;font-size: 13px;line-height: 120%;width: 100%;margin-top: 10px;display: block;padding:3px;');
    copyCodeInner = document.createTextNode('<iframe src="' + embedURL + '" width="' + ifWidth + 'px" height="' + ifHeight + 'px"></iframe><!-- CHANGE HEIGHT AND WIDTH AS NEEDED -->');
//       copyCode.innerHTML = '<iframe src="' + embedURL + '" width="' + ifWidth + 'px" height="' + ifHeight + 'px"></iframe><!-- CHANGE HEIGHT AND WIDTH AS NEEDED -->';
    copyCode.appendChild(copyCodeInner);
       copyDiv.appendChild(copyCode);
    cont = document.getElementById('hc-container');
    cont.parentElement.appendChild(copyDiv);
    cont.parentElement.style.position = 'relative';
    cont.parentElement.style.overflowX = 'hidden';
 });*/

 function embedClick(){
    console.log('embed click!');
    copyDiv = document.getElementById('copy-div');
    op = copyDiv.style.opacity;
    if (op == 0){
           copyDiv.style.opacity = 1;
           copyDiv.style.left= '0px';
    }
    else {copyDiv.style.opacity = 0;copyDiv.style.left = '-9999px';}
};

function forPrint() {
    chart = $('#hc-container').highcharts();
    options = chart.options;
    type = options.chart.type || 'line';
    options.plotOptions[type].dataLabels.style = {'color':'black','fontWeight':'normal'};
    options.chart.backgroundColor = 'white';
    options.chart.plotBackgroundColor = 'white';
    //options.plotOptions[type].dataLabels.allowOverlap = true;
    
    chart.destroy();
    $('.hc-chart').highcharts(options);
};