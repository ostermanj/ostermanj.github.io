var teal = ["#438390", "#564e34", "#1fa9b8", "#898167", "#5ED6E4", "#C2B793", "#9CA9D3", "#9FBFF7"];
var highlight = ["#438390", "#c5c5c5", "#c5c5c5", "#c5c5c5", "#c5c5c5", "#c5c5c5", "#c5c5c5", "#c5c5c5"];
/*
 * CHART 1
 *
 *
 *
 *
 */

 $(function() {
        Highcharts.setOptions(Highcharts.theme);
      $('#chart-1').highcharts({
        chart: {
          type: 'bubble',
          zoomType: 'xy',

        },
        title: {
          text: 'Low-Income Countries Are More Vulnerable to Natural Disasters, and Disasters Help Keep Them Poor'
        },
        subtitle: {
          text: 'Notes: Data for average number of deaths per year from EM-DAT (Guha-Sapir et al., 2015), data on GDP per capita and population form World Bank (2015), vulnerability measured by INFORM (2017), rescaled from zero to one. CGD analysis.',

        },
        series: [{

          regression: true,
          regressionSettings: {
            type: 'exponential',
            color: '#cccccc'

          },
          data: [{
            "name": "Afghanistan",
            "x": 6.387423038,
            "y": 0.840909064,
            "z": 17.75072861
          }, {
            "name": "Albania",
            "x": 8.280259132,
            "y": 0.272727281,
            "z": 2.355627298
          }, {
            "name": "Algeria",
            "x": 8.344274521,
            "y": 0.454545468,
            "z": 1.709142685
          }, {
            "name": "Angola",
            "x": 8.319101334,
            "y": 0.511363626,
            "z": 19.11488533
          }, {
            "name": "Armenia",
            "x": 8.157406807,
            "y": 0.375,
            "z": 0
          }, {
            "name": "Azerbaijan",
            "x": 8.611838341,
            "y": 0.488636374,
            "z": 1.007475019
          }, {
            "name": "Bangladesh",
            "x": 7.099781036,
            "y": 0.613636374,
            "z": 6.665419579
          }, {
            "name": "Belarus",
            "x": 8.655294418,
            "y": 0.181818187,
            "z": 0.104916833
          }, {
            "name": "Belize",
            "x": 8.492638588,
            "y": 0.329545468,
            "z": 3.338178635
          }, {
            "name": "Benin",
            "x": 6.636013985,
            "y": 0.454545468,
            "z": 3.216551542
          }, {
            "name": "Bhutan",
            "x": 7.884575844,
            "y": 0.284090906,
            "z": 3.078121901
          }, {
            "name": "Bolivia",
            "x": 8.031642914,
            "y": 0.409090906,
            "z": 8.548664093
          }, {
            "name": "Bosnia and Herzegovina",
            "x": 8.354516983,
            "y": 0.420454532,
            "z": 1.211632967
          }, {
            "name": "Botswana",
            "x": 8.757805824,
            "y": 0.284090906,
            "z": 23.13300514
          }, {
            "name": "Brazil",
            "x": 9.052350998,
            "y": 0.340909094,
            "z": 1.685128808
          }, {
            "name": "Bulgaria",
            "x": 8.852733612,
            "y": 0.25,
            "z": 2.23045516
          }, {
            "name": "Burkina Faso",
            "x": 6.379740238,
            "y": 0.568181813,
            "z": 27.8090477
          }, {
            "name": "Burundi",
            "x": 5.62426424,
            "y": 0.670454562,
            "z": 4.07776165
          }, {
            "name": "Cabo Verde",
            "x": 8.0327425,
            "y": 0.23863636,
            "z": 16.63971901
          }, {
            "name": "Cambodia",
            "x": 7.055045128,
            "y": 0.465909094,
            "z": 7.352732182
          }, {
            "name": "Cameroon",
            "x": 7.104358196,
            "y": 0.659090936,
            "z": 9.586594582
          }, {
            "name": "Central African Republic",
            "x": 5.778276443,
            "y": 0.909090936,
            "z": 7.813418865
          }, {
            "name": "Chad",
            "x": 6.65375948,
            "y": 0.829545438,
            "z": 9.969040871
          }, {
            "name": "China",
            "x": 8.990651131,
            "y": 0.420454532,
            "z": 7.835836887
          }, {
            "name": "Colombia",
            "x": 8.708828926,
            "y": 0.568181813,
            "z": 5.609391212
          }, {
            "name": "Comoros",
            "x": 6.575701714,
            "y": 0.375,
            "z": 73.21868896
          }, {
            "name": "Congo",
            "x": 7.523589134,
            "y": 0.556818187,
            "z": 18.25159836
          }, {
            "name": "Congo DR",
            "x": 6.122608662,
            "y": 0.75,
            "z": 7.794198036
          }, {
            "name": "Costa Rica",
            "x": 9.3290205,
            "y": 0.284090906,
            "z": 2.531666517
          }, {
            "name": "Croatia",
            "x": 9.35321331,
            "y": 0.204545453,
            "z": 0.889651179
          }, {
            "name": "Cuba",
            "x": 8.823184013,
            "y": 0.25,
            "z": 2.092007875
          }, {
            "name": "Côte d'Ivoire",
            "x": 7.243505955,
            "y": 0.602272749,
            "z": 2.193514347
          }, {
            "name": "Djibouti",
            "x": 7.573081017,
            "y": 0.556818187,
            "z": 17.33374023
          }, {
            "name": "Dominica",
            "x": 8.870155334,
            "y": 0.295454532,
            "z": 40.09262848
          }, {
            "name": "Dominican Republic",
            "x": 8.774695396,
            "y": 0.340909094,
            "z": 7.181687832
          }, {
            "name": "Ecuador",
            "x": 8.733120918,
            "y": 0.431818187,
            "z": 2.942335844
          }, {
            "name": "Egypt",
            "x": 8.19277668,
            "y": 0.465909094,
            "z": 3.176731348
          }, {
            "name": "El Salvador",
            "x": 8.347435951,
            "y": 0.556818187,
            "z": 8.228894234
          }, {
            "name": "Eritrea",
            "x": 6.299798965,
            "y": 0.568181813,
            "z": 1.214645028
          }, {
            "name": "Ethiopia",
            "x": 6.428379059,
            "y": 0.681818187,
            "z": 2.302283764
          }, {
            "name": "Fiji",
            "x": 8.5092659,
            "y": 0.306818187,
            "z": 5.429983616
          }, {
            "name": "Gabon",
            "x": 9.01995945,
            "y": 0.397727281,
            "z": 5.189202785
          }, {
            "name": "Gambia",
            "x": 6.15599823,
            "y": 0.363636374,
            "z": 3.324355841
          }, {
            "name": "Georgia",
            "x": 8.241696358,
            "y": 0.397727281,
            "z": 1.271469235
          }, {
            "name": "Ghana",
            "x": 7.222347736,
            "y": 0.363636374,
            "z": 4.871054173
          }, {
            "name": "Grenada",
            "x": 9.128264427,
            "y": 0.102272727,
            "z": 0.88303262
          }, {
            "name": "Guatemala",
            "x": 8.269623756,
            "y": 0.579545438,
            "z": 18.84893227
          }, {
            "name": "Guinea",
            "x": 6.275365829,
            "y": 0.522727251,
            "z": 26.61805534
          }, {
            "name": "Guinea-Bissau",
            "x": 6.350865364,
            "y": 0.5,
            "z": 48.71257401
          }, {
            "name": "Guyana",
            "x": 8.325390816,
            "y": 0.340909094,
            "z": 4.1628685
          }, {
            "name": "Haiti",
            "x": 6.707282066,
            "y": 0.693181813,
            "z": 2040.755615
          }, {
            "name": "Honduras",
            "x": 7.835536957,
            "y": 0.511363626,
            "z": 10.33538628
          }, {
            "name": "Hungary",
            "x": 9.422507286,
            "y": 0.193181813,
            "z": 5.932254314
          }, {
            "name": "India",
            "x": 7.376670361,
            "y": 0.602272749,
            "z": 2.473259211
          }, {
            "name": "Indonesia",
            "x": 8.115666389,
            "y": 0.443181813,
            "z": 6.599462509
          }, {
            "name": "Iran",
            "x": 8.602062225,
            "y": 0.522727251,
            "z": 3.533709764
          }, {
            "name": "Iraq",
            "x": 8.50588131,
            "y": 0.738636374,
            "z": 5.217938423
          }, {
            "name": "Jamaica",
            "x": 8.562553406,
            "y": 0.23863636,
            "z": 1.496770501
          }, {
            "name": "Jordan",
            "x": 8.505129814,
            "y": 0.420454532,
            "z": 0.696241796
          }, {
            "name": "Kazakhstan",
            "x": 9.260080338,
            "y": 0.193181813,
            "z": 1.510962129
          }, {
            "name": "Kenya",
            "x": 7.227453709,
            "y": 0.647727251,
            "z": 5.941697121
          }, {
            "name": "Kiribati",
            "x": 7.261422157,
            "y": 0.363636374,
            "z": 0
          }, {
            "name": "Kyrgyzstan",
            "x": 7.005984306,
            "y": 0.352272719,
            "z": 2.757754803
          }, {
            "name": "Lao PDR",
            "x": 7.505734921,
            "y": 0.443181813,
            "z": 3.609772444
          }, {
            "name": "Lebanon",
            "x": 8.993134499,
            "y": 0.568181813,
            "z": 2.942929268
          }, {
            "name": "Lesotho",
            "x": 6.972592831,
            "y": 0.431818187,
            "z": 3.022072077
          }, {
            "name": "Liberia",
            "x": 6.122216225,
            "y": 0.534090936,
            "z": 100.7423706
          }, {
            "name": "Libya",
            "x": 8.615731239,
            "y": 0.647727251,
            "z": 29.64449883
          }, {
            "name": "Madagascar",
            "x": 5.996044159,
            "y": 0.522727251,
            "z": 4.056933403
          }, {
            "name": "Malawi",
            "x": 5.918855667,
            "y": 0.5,
            "z": 4.160292149
          }, {
            "name": "Malaysia",
            "x": 9.186900139,
            "y": 0.340909094,
            "z": 2.088070154
          }, {
            "name": "Maldives",
            "x": 9.035485268,
            "y": 0.193181813,
            "z": 0.964552701
          }, {
            "name": "Mali",
            "x": 6.585145473,
            "y": 0.647727251,
            "z": 3.548070908
          }, {
            "name": "Marshall Islands",
            "x": 8.127394676,
            "y": 0.386363626,
            "z": 0
          }, {
            "name": "Mauritania",
            "x": 7.223284721,
            "y": 0.602272749,
            "z": 7.039425373
          }, {
            "name": "Mauritius",
            "x": 9.132606506,
            "y": 0.193181813,
            "z": 1.739635825
          }, {
            "name": "Mexico",
            "x": 9.105538368,
            "y": 0.5,
            "z": 1.456831932
          }, {
            "name": "Moldova Republic of",
            "x": 7.521892548,
            "y": 0.261363626,
            "z": 0.9678846
          }, {
            "name": "Mongolia",
            "x": 8.285974503,
            "y": 0.386363626,
            "z": 3.34421277
          }, {
            "name": "Montenegro",
            "x": 8.765001297,
            "y": 0.227272734,
            "z": 2.048940182
          }, {
            "name": "Morocco",
            "x": 7.964920998,
            "y": 0.397727281,
            "z": 2.540683746
          }, {
            "name": "Mozambique",
            "x": 6.271446705,
            "y": 0.636363626,
            "z": 5.253964424
          }, {
            "name": "Myanmar",
            "x": 7.057457447,
            "y": 0.715909064,
            "z": 248.6993866
          }, {
            "name": "Namibia",
            "x": 8.449678421,
            "y": 0.375,
            "z": 14.00346851
          }, {
            "name": "Nepal",
            "x": 6.611130714,
            "y": 0.568181813,
            "z": 39.87917709
          }, {
            "name": "Nicaragua",
            "x": 7.643432617,
            "y": 0.431818187,
            "z": 7.589557648
          }, {
            "name": "Niger",
            "x": 5.883205891,
            "y": 0.784090936,
            "z": 6.426112652
          }, {
            "name": "Nigeria",
            "x": 7.878644466,
            "y": 0.670454562,
            "z": 6.640343189
          }, {
            "name": "Pakistan",
            "x": 7.268708706,
            "y": 0.704545438,
            "z": 49.45932388
          }, {
            "name": "Palestine",
            "x": 7.960951805,
            "y": 0.5,
            "z": 0.343125403
          }, {
            "name": "Papua New Guinea",
            "x": 7.72672987,
            "y": 0.613636374,
            "z": 10.49371719
          }, {
            "name": "Paraguay",
            "x": 8.314085007,
            "y": 0.284090906,
            "z": 1.757870317
          }, {
            "name": "Peru",
            "x": 8.704025269,
            "y": 0.420454532,
            "z": 13.13273144
          }, {
            "name": "Philippines",
            "x": 7.973914146,
            "y": 0.511363626,
            "z": 20.30426025
          }, {
            "name": "Romania",
            "x": 9.101966858,
            "y": 0.25,
            "z": 3.057680845
          }, {
            "name": "Russian Federation",
            "x": 9.115214348,
            "y": 0.454545468,
            "z": 37.57993317
          }, {
            "name": "Rwanda",
            "x": 6.54728508,
            "y": 0.556818187,
            "z": 2.009607315
          }, {
            "name": "Saint Lucia",
            "x": 8.95362854,
            "y": 0.147727266,
            "z": 10.70074749
          }, {
            "name": "Saint Vincent and the Grenadines",
            "x": 8.815692902,
            "y": 0.147727266,
            "z": 9.978404999
          }, {
            "name": "Samoa",
            "x": 8.278567314,
            "y": 0.272727281,
            "z": 83.16770935
          }, {
            "name": "Sao Tome and Principe",
            "x": 7.420017719,
            "y": 0.090909094,
            "z": 33.33759689
          }, {
            "name": "Senegal",
            "x": 6.801928043,
            "y": 0.534090936,
            "z": 5.069311619
          }, {
            "name": "Serbia",
            "x": 8.563149452,
            "y": 0.431818187,
            "z": 1.141863227
          }, {
            "name": "Sierra Leone",
            "x": 6.481779099,
            "y": 0.545454562,
            "z": 73.53516388
          }, {
            "name": "Solomon Islands",
            "x": 7.567788124,
            "y": 0.522727251,
            "z": 24.63837051
          }, {
            "name": "Somalia",
            "x": 6.30858469,
            "y": 1,
            "z": 209.5885162
          }, {
            "name": "South Africa",
            "x": 8.652418137,
            "y": 0.443181813,
            "z": 2.670026541
          }, {
            "name": "South Sudan",
            "x": 6.593838692,
            "y": 0.954545438,
            "z": 4.411718845
          }, {
            "name": "Sri Lanka",
            "x": 8.275421143,
            "y": 0.386363626,
            "z": 6.072457314
          }, {
            "name": "Sudan",
            "x": 7.789340019,
            "y": 0.75,
            "z": 10.61271095
          }, {
            "name": "Suriname",
            "x": 9.157500267,
            "y": 0.261363626,
            "z": 4.497348785
          }, {
            "name": "Swaziland",
            "x": 8.070950508,
            "y": 0.340909094,
            "z": 1.877121687
          }, {
            "name": "Syria",
            "x": 7.640117168,
            "y": 0.738636374,
            "z": 1.23863101
          }, {
            "name": "Tajikistan",
            "x": 6.830779076,
            "y": 0.454545468,
            "z": 3.881585836
          }, {
            "name": "Tanzania",
            "x": 6.778756618,
            "y": 0.602272749,
            "z": 3.48759222
          }, {
            "name": "Thailand",
            "x": 8.668156624,
            "y": 0.409090906,
            "z": 3.235871315
          }, {
            "name": "The former Yugoslav Republic of Macedonia",
            "x": 8.487281799,
            "y": 0.261363626,
            "z": 1.669955969
          }, {
            "name": "Timor-Leste",
            "x": 7.054443359,
            "y": 0.431818187,
            "z": 2.282208443
          }, {
            "name": "Togo",
            "x": 6.327286243,
            "y": 0.420454532,
            "z": 4.480598927
          }, {
            "name": "Tonga",
            "x": 8.318387032,
            "y": 0.261363626,
            "z": 74.7022171
          }, {
            "name": "Tunisia",
            "x": 8.261658669,
            "y": 0.306818187,
            "z": 2.944574356
          }, {
            "name": "Turkey",
            "x": 9.118848801,
            "y": 0.522727251,
            "z": 2.732480764
          }, {
            "name": "Turkmenistan",
            "x": 8.805746078,
            "y": 0.318181813,
            "z": 0.267030358
          }, {
            "name": "Tuvalu",
            "x": 8.10016346,
            "y": 0.397727281,
            "z": 0
          }, {
            "name": "Uganda",
            "x": 6.558612823,
            "y": 0.625,
            "z": 5.329753876
          }, {
            "name": "Ukraine",
            "x": 7.656788826,
            "y": 0.556818187,
            "z": 3.378254414
          }, {
            "name": "Uzbekistan",
            "x": 7.664848804,
            "y": 0.306818187,
            "z": 0.118399024
          }, {
            "name": "Vanuatu",
            "x": 7.939270973,
            "y": 0.397727281,
            "z": 7.992454529
          }, {
            "name": "Venezuela",
            "x": 9.414507866,
            "y": 0.465909094,
            "z": 2.048371792
          }, {
            "name": "Viet Nam",
            "x": 7.654982567,
            "y": 0.352272719,
            "z": 3.463821173
          }, {
            "name": "Yemen",
            "x": 7.248711586,
            "y": 0.818181813,
            "z": 5.482543468
          }, {
            "name": "Zambia",
            "x": 7.173865795,
            "y": 0.420454532,
            "z": 4.983534336
          }, {
            "name": "Zimbabwe",
            "x": 6.828867912,
            "y": 0.511363626,
            "z": 34.07693481
          }],
          name: 'Countries',
          type: 'bubble',
          enableMouseTracking:true
          
        }],
        plotOptions: {
        series: {
        enableMouseTracking:false
        },
          bubble: {
            maxSize: 100,
            dataLabels: {
              enabled: true,
              formatter: function() {
                label = this.point.z > 100 ? this.point.name : '';
                return label;
              }
            },

          }
        },
       tooltip: {
                  formatter: function() {

               
                    return '<b>' + this.point.name + '</b><br />GDP per capita (log): ' + Highcharts.numberFormat(this.point.x, 2, '.', ',') + '<br/>Vulnerability index: ' + Highcharts.numberFormat(this.point.y, 2, '.', ',') + '<br />Deaths (in proportion to population): ' +Highcharts.numberFormat(this.point.z, 0, '.', ',') + '<br/>';
                

                  }
                },
        yAxis: {
          type: 'linear',
          title: {
            text: 'vulnerability (INFORM Index)'
          },
          tickWidth: 0,
          max: 1,
          gridLineWidth: 0,
          labels: {
            enabled: true
          },
        },
        xAxis: {
          title: {
            text: 'GDP per capita (logs)'
          },
          minPadding: 0.02,
          type: 'linear',
          tickWidth: 0,
          labels: {
            enabled: true
          },

        },
        legend: {
          enabled: false
        }

      });


    });
























/*
 * CHART 2
 *
 *
 *
 *
 */
$(function() {
var categories = ['Lower middle', 'Upper middle'];  
  $('#chart-2').highcharts({
    chart: {
      type: 'column'
    },
    series: [{
        name: 'Cyclone',
        data: [
          ['Lower middle', -0.9],
          ['Upper middle', -0.8]
        ],
        color: '#bd2d37'
      }, {
        name: 'Earthquake',
        data: [
          ['Lower middle', -0.9],
          ['Upper middle', -0.9]
        ],
         color: '#d95e66'
       
      }, {
        name: 'Flood',
        data: [
          ['Lower middle', -0.1],
          ['Upper middle', -0.9]
        ],
        color: '#e58f95'
      }

    ],
    
    title: {
      text: 'Disasters Damage Credit Ratings, Raising Borrowing Costs'
    },
    subtitle: {
      text: 'Notes: data from S&P, 2015. CGD analysis.'
    },
    xAxis: {
      labels: {
        formatter: function() {
          return categories[this.value];
        }
      },
      opposite:true
      },
    yAxis: {
      title: {
        text: 'expected downgrade (notches)'
      },
      max: 0,
      min: -1,
      tickInterval:0.5
    }
  });


});


/*
 * CHART 3
 *
 *
 *
 *
 */


$(function() {
  $('#chart-3').highcharts({
    chart: {
      type: 'column',
    },
    colors:["#438390", "#564e34", "#1fa9b8", "#898167", "#5ED6E4", "#C2B793", "#9CA9D3", "#9FBFF7"],
    series: [{
        name: 'High income',
        data: [
          ['Damage', 2077.026187],
          ['Hum. Capital Loss', 317.1241505],
          ['Deaths', 242010]
        ]
        
      }, {
        name: 'Upper middle',
        data: [
          ['Damage', 415.5770712],
          ['Hum. Capital Loss', 85.9753035],
          ['Deaths', 161835]
        ]
       
      }, {
        name: 'Lower middle',
        data: [
          ['Damage', 548.484038],
          ['Hum. Capital Loss', 114.8324132],
          ['Deaths', 671115]
        ]
      },
      {
        name: 'Low income',
        data: [
          ['Damage', 472.3523603],
          ['Hum. Capital Loss', 78.53275104],
          ['Deaths', 2416291]
        ]
      }

    ],
    plotOptions: {
      column: {
        stacking: 'percent'
      }
    },

    tooltip: {
      formatter: function() {
        if (this.key == 'Deaths') {
          return '<b>' + this.series.name + '</b><br />' + this.key + ': ' + Highcharts.numberFormat(this.y, 0, '.', ',') + '<br />Share: ' + Highcharts.numberFormat(this.point.percentage, 0, '.', ',') + '%';
        } else {
          return '<b>' + this.series.name + '</b><br />' + this.key + ': $' + Highcharts.numberFormat(this.y, 2, '.', ',') + ' billion<br />Share: ' + Highcharts.numberFormat(this.point.percentage, 0, '.', ',') + '%';
        }

      }
    },
    title: {
      text: 'Damage Mainly in Rich Countries but Deaths Mainly in Poor Countries'
    },
    subtitle: {
      text: 'Notes: Data from EM-DAT (Guha-Sapir et al., 2015). ‘Human capital loss’ estimated as number of deaths from Em-Dat times difference between life expectancy and median age in country times real income per capita. Median age is median-variant projection from United Nations (2012), income per capita and life expectancy from World Bank (2015b). CGD analysis.'
    },
    yAxis: {
      title: {
        text: 'share of total (percent)'
      },
      reversedStacks: false
    }
  });




});








$(function () {
 
    $('#chart-4').highcharts({
        chart: {
            type: 'column',
           
        },

      
        series: [
{
  showInLegend: false,
  name: 'New displacement',
  data: [
  [Date.UTC(2008, 0, 1),36.5],
  [Date.UTC(2009, 0, 1),16.7],
  [Date.UTC(2010, 0, 1),42.4],
  [Date.UTC(2011, 0, 1),15.0],
  [Date.UTC(2012, 0, 1),32.4],
  [Date.UTC(2013, 0, 1),22.1],
  [Date.UTC(2014, 0, 1),19.1],
  [Date.UTC(2015, 0, 1),19.2]
],

},
{
  type: 'line',
  marker: {
    enabled:false
  },
  dashStyle: 'longDash',
  enableMouseTracking: false,
  dataLabels: {
   enabled: true,
   formatter: function(){
     if (this.x == 1388534400000) {
     return 'Average 25.4';
    }
    }
  },
  showInLegend:false,
  name: 'Average',
  data: [
  [Date.UTC(2008, 0, 1),25.4],
  [Date.UTC(2009, 0, 1),25.4],
  [Date.UTC(2010, 0, 1),25.4],
  [Date.UTC(2011, 0, 1),25.4],
  [Date.UTC(2012, 0, 1),25.4],
  [Date.UTC(2013, 0, 1),25.4],
  [Date.UTC(2014, 0, 1),25.4],
  [Date.UTC(2015, 0, 1),25.4]
]
}],
        tooltip: {
        
          
          valueSuffix: ' million',
          
         
         
        },
        title: {
            text: 'Disasters Displace Millions of People Each Year'
        },
        subtitle:{
          text: 'Notes: Data from Internal Displacement Monitoring Centre (IDMC). CGD analysis'
            
        },

        yAxis: {
            title: {
                text: 'new displacement (millions)'
            },
           
        },
        xAxis: {
            type: 'datetime'

           
        }


    });

});


















$(function () {
 
    $('#chart-5').highcharts({
        chart: {
            type: 'area',
           marker: {
           enabled:false
           }
        },
colors: ["#438390", "#564e34", "#1fa9b8", "#898167", "#5ED6E4", "#C2B793", "#9CA9D3", "#9FBFF7"],
      
        series: [
        {
  showInLegend:false,
  dataLabels: {
   enabled: true,
   formatter: function(){
    if (this.x == 1041379200000){
      return this.series.name;
      }
   },
      y:30,
      x:15
  },
  name: 'Upper middle income and lower',
  data: [
  [Date.UTC(1980, 0, 1),  85],
  [Date.UTC(1981, 0, 1),  94],
  [Date.UTC(1982, 0, 1),  104],
  [Date.UTC(1983, 0, 1),  129],
  [Date.UTC(1984, 0, 1),  102],
  [Date.UTC(1985, 0, 1),  109],
  [Date.UTC(1986, 0, 1),  124],
  [Date.UTC(1987, 0, 1),  166],
  [Date.UTC(1988, 0, 1),  184],
  [Date.UTC(1989, 0, 1),  170],
  [Date.UTC(1990, 0, 1),  167],
  [Date.UTC(1991, 0, 1),  213],
  [Date.UTC(1992, 0, 1),  172],
  [Date.UTC(1993, 0, 1),  176],
  [Date.UTC(1994, 0, 1),  185],
  [Date.UTC(1995, 0, 1),  198],
  [Date.UTC(1996, 0, 1),  215],
  [Date.UTC(1997, 0, 1),  226],
  [Date.UTC(1998, 0, 1),  262],
  [Date.UTC(1999, 0, 1),  275],
  [Date.UTC(2000, 0, 1),  320],
  [Date.UTC(2001, 0, 1),  287],
  [Date.UTC(2002, 0, 1),  309],
  [Date.UTC(2003, 0, 1),  259],
  [Date.UTC(2004, 0, 1),  292],
  [Date.UTC(2005, 0, 1),  303],
  [Date.UTC(2006, 0, 1),  259],
  [Date.UTC(2007, 0, 1),  283],
  [Date.UTC(2008, 0, 1),  282],
  [Date.UTC(2009, 0, 1),  273],
  [Date.UTC(2010, 0, 1),  282],
  [Date.UTC(2011, 0, 1),  251],
  [Date.UTC(2012, 0, 1),  250],
  [Date.UTC(2013, 0, 1),  230],
  [Date.UTC(2014, 0, 1),  209],
  [Date.UTC(2015, 0, 1),  241]
]
},
{
  showInLegend:false,
  dataLabels: {
   enabled: true,
   formatter: function(){
    if (this.x == 946684800000){
      return this.series.name;
      }
   }
  },
  name: 'High income',
  data: [
  [Date.UTC(1980, 0, 1),  47],
  [Date.UTC(1981, 0, 1),  41],
  [Date.UTC(1982, 0, 1),  39],
  [Date.UTC(1983, 0, 1),  61],
  [Date.UTC(1984, 0, 1),  48],
  [Date.UTC(1985, 0, 1),  64],
  [Date.UTC(1986, 0, 1),  49],
  [Date.UTC(1987, 0, 1),  65],
  [Date.UTC(1988, 0, 1),  39],
  [Date.UTC(1989, 0, 1),  58],
  [Date.UTC(1990, 0, 1),  84],
  [Date.UTC(1991, 0, 1),  74],
  [Date.UTC(1992, 0, 1),  60],
  [Date.UTC(1993, 0, 1),  65],
  [Date.UTC(1994, 0, 1),  59],
  [Date.UTC(1995, 0, 1),  79],
  [Date.UTC(1996, 0, 1),  63],
  [Date.UTC(1997, 0, 1),  79],
  [Date.UTC(1998, 0, 1),  72],
  [Date.UTC(1999, 0, 1),  89],
  [Date.UTC(2000, 0, 1),  92],
  [Date.UTC(2001, 0, 1),  80],
  [Date.UTC(2002, 0, 1),  91],
  [Date.UTC(2003, 0, 1),  100],
  [Date.UTC(2004, 0, 1),  80],
  [Date.UTC(2005, 0, 1),  94],
  [Date.UTC(2006, 0, 1),  66],
  [Date.UTC(2007, 0, 1),  80],
  [Date.UTC(2008, 0, 1),  58],
  [Date.UTC(2009, 0, 1),  71],
  [Date.UTC(2010, 0, 1),  82],
  [Date.UTC(2011, 0, 1),  56],
  [Date.UTC(2012, 0, 1),  65],
  [Date.UTC(2013, 0, 1),  69],
  [Date.UTC(2014, 0, 1),  66],
  [Date.UTC(2015, 0, 1),  52]
],

}

],
        
        title: {
            text: 'Natural Disasters Are Increasing, Especially in Poorer Countries'
        },
        subtitle:{
          text: 'Notes: Data from EM-DAT (Guha-Sapir et al., 2015). CGD analysis.'
            
        },

        yAxis: {
            title: {
               text: 'number of disasters'
               }          
        },
        xAxis: {
            type: 'datetime'

           
        },
        plotOptions: {
         series: {
         marker: {
         enabled:false
         }/*,
         stacking:'normal'*/
         }
        }


    });

});













$(function() {

  $('#chart-6').highcharts({
    chart: {
      type: 'area',
      marker: {
        enabled: false
      }
    },

colors:["#438390", "#564e34", "#1fa9b8", "#898167", "#5ED6E4", "#C2B793", "#9CA9D3", "#9FBFF7"],
    series: [{
       
        name: 'Other',
        data: [
          [Date.UTC(2005, 0, 1), 0.96745],
          [Date.UTC(2006, 0, 1), 0.84904],
          [Date.UTC(2007, 0, 1), 0.65493],
          [Date.UTC(2008, 0, 1), 0.78867],
          [Date.UTC(2009, 0, 1), 1.00002],
          [Date.UTC(2010, 0, 1), 1.86090],
          [Date.UTC(2011, 0, 1), 2.07775],
          [Date.UTC(2012, 0, 1), 1.35092],
          [Date.UTC(2013, 0, 1), 1.07705]
        ],
        color: 'url(#highcharts-default-pattern-1)',
        lineColor: '#564e34',
        lineWidth:1
      },
        {

        name: 'Emergency',
        data: [
          [Date.UTC(2005, 0, 1), 0.09107],
          [Date.UTC(2006, 0, 1), 0.02630],
          [Date.UTC(2007, 0, 1), 0.02310],
          [Date.UTC(2008, 0, 1), 0.15745],
          [Date.UTC(2009, 0, 1), 0.09601],
          [Date.UTC(2010, 0, 1), 1.52585],
          [Date.UTC(2011, 0, 1), 0.30837],
          [Date.UTC(2012, 0, 1), 0.16798],
          [Date.UTC(2013, 0, 1), 0.13196]
        ]
      },{

        name: 'Reconstruction',
        data: [
          [Date.UTC(2005, 0, 1), 0.12330],
          [Date.UTC(2006, 0, 1), 0.00010],
          [Date.UTC(2007, 0, 1), 0.04081],
          [Date.UTC(2008, 0, 1), 0.02522],
          [Date.UTC(2009, 0, 1), 0.05753],
          [Date.UTC(2010, 0, 1), 0.30310],
          [Date.UTC(2011, 0, 1), 0.14802],
          [Date.UTC(2012, 0, 1), 0.01580],
          [Date.UTC(2013, 0, 1), 0.01950]
        ]
      }, 
       {

        name: 'Prevention',
        data: [
          [Date.UTC(2005, 0, 1), 0.01578],
          [Date.UTC(2006, 0, 1), 0.00245],
          [Date.UTC(2007, 0, 1), 0.01480],
          [Date.UTC(2008, 0, 1), 0.00608],
          [Date.UTC(2009, 0, 1), 0.04916],
          [Date.UTC(2010, 0, 1), 0.03368],
          [Date.UTC(2011, 0, 1), 0.00532],
          [Date.UTC(2012, 0, 1), 0.02768],
          [Date.UTC(2013, 0, 1), 0.02291]
        ]
      },
      {

        name: 'Humanitarian',
        data: [
          [Date.UTC(2005, 0, 1), 0.01458],
          [Date.UTC(2006, 0, 1), 0.00000],
          [Date.UTC(2007, 0, 1), 0.00000],
          [Date.UTC(2008, 0, 1), 0.01051],
          [Date.UTC(2009, 0, 1), 0.00000],
          [Date.UTC(2010, 0, 1), 0.06584],
          [Date.UTC(2011, 0, 1), 0.01505],
          [Date.UTC(2012, 0, 1), 0.00469],
          [Date.UTC(2013, 0, 1), 0.00000]
        ],

      }
    ],

    title: {
      text: 'Aid Reporting Codes Likely Omit Relevant Flows: Haiti, Post-Earthquake'

    },
    subtitle: {
      text: 'Notes: Data from the OECD’s Creditor Reporting System (CRS), 2016. CGD analysis.'

    },

    yAxis: {
      title:{
        text:   'billions USD'
}
    },
    xAxis: {
      type: 'datetime'


    },
    plotOptions: {
      series: {
        marker: {
          enabled: false
        },
        stacking:'normal'
      }
    },
    tooltip: {
      valueDecimals: 2,
      valueSuffix: ' billion',
      valuePrefix: '$'
    }
    


  });

});






















$(function () {
 
    $('#chart-7').highcharts({
        chart: {
            type: 'column',
           
        },

      
        series: [
{
  showInLegend:false,
  name: 'Natural disaster allocations',
  data: [
  [Date.UTC(2000, 0, 1),  0.55],
  [Date.UTC(2001, 0, 1),  0.59],
  [Date.UTC(2002, 0, 1),  0.34],
  [Date.UTC(2003, 0, 1),  0.07],
  [Date.UTC(2004, 0, 1),  0.61],
  [Date.UTC(2005, 0, 1),  7.61],
  [Date.UTC(2006, 0, 1),  0.34],
  [Date.UTC(2007, 0, 1),  0.9],
  [Date.UTC(2008, 0, 1),  1.32],
  [Date.UTC(2009, 0, 1),  0.32],
  [Date.UTC(2010, 0, 1),  6.39],
  [Date.UTC(2011, 0, 1),  1.47],
  [Date.UTC(2012, 0, 1),  0.1],
  [Date.UTC(2013, 0, 1),  0.07],
  [Date.UTC(2014, 0, 1),  3.97],
  [Date.UTC(2015, 0, 1),  0.57]
]

},
{
  type: 'line',
  marker: {
    enabled:false
  },
  showInLegend: false,
  dashStyle:'longDash',
  enableMouseTracking: false,
  dataLabels: {
   enabled: true,
   formatter: function(){
     if (this.x == 1325376000000) {
     return 'Average ' + this.y + ' billion';
    }
    }
  },
  name: 'Average',
  data: [
  [Date.UTC(2000, 0, 1),  1.6],
  [Date.UTC(2001, 0, 1),  1.6],
  [Date.UTC(2002, 0, 1),  1.6],
  [Date.UTC(2003, 0, 1),  1.6],
  [Date.UTC(2004, 0, 1),  1.6],
  [Date.UTC(2005, 0, 1),  1.6],
  [Date.UTC(2006, 0, 1),  1.6],
  [Date.UTC(2007, 0, 1), 1.6],
  [Date.UTC(2008, 0, 1),  1.6],
  [Date.UTC(2009, 0, 1),  1.6],
  [Date.UTC(2010, 0, 1),  1.6],
  [Date.UTC(2011, 0, 1),  1.6],
  [Date.UTC(2012, 0, 1), 1.6],
  [Date.UTC(2013, 0, 1),  1.6],
  [Date.UTC(2014, 0, 1),  1.6],
  [Date.UTC(2015, 0, 1),  1.6]
]
}],
        tooltip: {
        
          
          valueSuffix: ' billion',
          valuePrefix: '$'
          
         
         
        },
        title: {
            text: 'Donors Allocated $1.6 Billion a Year on Average, 2000–2015'
        },
        subtitle:{
          text: 'Notes: Data from UN OCHA Financial Tracking Service (FTS), 2015. CGD analysis.'
            
        },

        yAxis: {
            title: {
                text: 'billions USD(2010)'
            },
           
        },
        xAxis: {
            type: 'datetime'

           
        }


    });

});




$(function () {
 
    $('#chart-8').highcharts({
        chart: {
            type: 'area',
           marker: {
           enabled:false
           }
        },
colors: ["#438390", "#564e34", "#1fa9b8", "#898167", "#5ED6E4", "#C2B793", "#9CA9D3", "#9FBFF7"],
      
        series: [
        {
  name: 'Aid | Any',
  data:[
    [Date.UTC(1980, 0, 1),  0.4],
    [Date.UTC(1981, 0, 1),  0.3],
    [Date.UTC(1982, 0, 1),  0.5],
    [Date.UTC(1983, 0, 1),  0.9],
    [Date.UTC(1984, 0, 1),  0.6],
    [Date.UTC(1985, 0, 1),  1.2],
    [Date.UTC(1986, 0, 1),  1.7],
    [Date.UTC(1987, 0, 1),  1.2],
    [Date.UTC(1988, 0, 1),  1.5],
    [Date.UTC(1989, 0, 1),  1.3],
    [Date.UTC(1990, 0, 1),  1.6],
    [Date.UTC(1991, 0, 1),  1],
    [Date.UTC(1992, 0, 1),  1.3],
    [Date.UTC(1993, 0, 1),  1.3],
    [Date.UTC(1994, 0, 1),  1.2],
    [Date.UTC(1995, 0, 1),  3],
    [Date.UTC(1996, 0, 1),  1.6],
    [Date.UTC(1997, 0, 1),  2.3],
    [Date.UTC(1998, 0, 1),  3.8],
    [Date.UTC(1999, 0, 1),  5.2],
    [Date.UTC(2000, 0, 1),  4.1],
    [Date.UTC(2001, 0, 1),  5.2],
    [Date.UTC(2002, 0, 1),  8.4],
    [Date.UTC(2003, 0, 1),  8.7],
    [Date.UTC(2004, 0, 1),  8.1],
    [Date.UTC(2005, 0, 1),  11.9],
    [Date.UTC(2006, 0, 1),  6.7],
    [Date.UTC(2007, 0, 1),  8.1],
    [Date.UTC(2008, 0, 1),  8.8],
    [Date.UTC(2009, 0, 1),  9.9],
    [Date.UTC(2010, 0, 1),  10.1],
    [Date.UTC(2011, 0, 1),  7.7],
    [Date.UTC(2012, 0, 1),  6.3],
    [Date.UTC(2013, 0, 1),  7.4]
]
},

{
  name: 'Aid | World',
  data: [
  [Date.UTC(1980, 0, 1),  0],
  [Date.UTC(1981, 0, 1),  0.1],
  [Date.UTC(1982, 0, 1),  0],
  [Date.UTC(1983, 0, 1),  0.4],
  [Date.UTC(1984, 0, 1),  0.1],
  [Date.UTC(1985, 0, 1),  0.7],
  [Date.UTC(1986, 0, 1),  0.1],
  [Date.UTC(1987, 0, 1),  0.7],
  [Date.UTC(1988, 0, 1),  0.6],
  [Date.UTC(1989, 0, 1),  0.3],
  [Date.UTC(1990, 0, 1),  1.1],
  [Date.UTC(1991, 0, 1),  0.3],
  [Date.UTC(1992, 0, 1),  0.4],
  [Date.UTC(1993, 0, 1),  0.1],
  [Date.UTC(1994, 0, 1),  0.6],
  [Date.UTC(1995, 0, 1),  0.3],
  [Date.UTC(1996, 0, 1),  0.2],
  [Date.UTC(1997, 0, 1),  0.3],
  [Date.UTC(1998, 0, 1),  1.9],
  [Date.UTC(1999, 0, 1),  1.9],
  [Date.UTC(2000, 0, 1),  1.5],
  [Date.UTC(2001, 0, 1),  1.9],
  [Date.UTC(2002, 0, 1),  2.4],
  [Date.UTC(2003, 0, 1),  2.1],
  [Date.UTC(2004, 0, 1),  1.3],
  [Date.UTC(2005, 0, 1),  4],
  [Date.UTC(2006, 0, 1),  3.9],
  [Date.UTC(2007, 0, 1),  3.6],
  [Date.UTC(2008, 0, 1),  3.4],
  [Date.UTC(2009, 0, 1),  3],
  [Date.UTC(2010, 0, 1),  5.5],
  [Date.UTC(2011, 0, 1),  3.2],
  [Date.UTC(2012, 0, 1),  2.4],
  [Date.UTC(2013, 0, 1),  2.6]
]
},
{
  
  name: 'Aid | National',
  data:[
  [Date.UTC(1980, 0, 1),  0.1],
  [Date.UTC(1981, 0, 1),  0.1],
  [Date.UTC(1982, 0, 1),  0.1],
  [Date.UTC(1983, 0, 1),  0.7],
  [Date.UTC(1984, 0, 1),  0.1],
  [Date.UTC(1985, 0, 1),  0.3],
  [Date.UTC(1986, 0, 1),  0.2],
  [Date.UTC(1987, 0, 1),  0.7],
  [Date.UTC(1988, 0, 1),  0.9],
  [Date.UTC(1989, 0, 1),  0.1],
  [Date.UTC(1990, 0, 1),  1.1],
  [Date.UTC(1991, 0, 1),  0.3],
  [Date.UTC(1992, 0, 1),  0.3],
  [Date.UTC(1993, 0, 1),  0.6],
  [Date.UTC(1994, 0, 1),  0.2],
  [Date.UTC(1995, 0, 1),  1.3],
  [Date.UTC(1996, 0, 1),  0.2],
  [Date.UTC(1997, 0, 1),  0.2],
  [Date.UTC(1998, 0, 1),  2.1],
  [Date.UTC(1999, 0, 1),  2.6],
  [Date.UTC(2000, 0, 1),  1.6],
  [Date.UTC(2001, 0, 1),  2.8],
  [Date.UTC(2002, 0, 1),  5.8],
  [Date.UTC(2003, 0, 1),  1.6],
  [Date.UTC(2004, 0, 1),  1.3],
  [Date.UTC(2005, 0, 1),  3.2],
  [Date.UTC(2006, 0, 1),  1.9],
  [Date.UTC(2007, 0, 1),  3.6],
  [Date.UTC(2008, 0, 1),  3.5],
  [Date.UTC(2009, 0, 1),  2.3],
  [Date.UTC(2010, 0, 1),  5.3],
  [Date.UTC(2011, 0, 1),  2.7],
  [Date.UTC(2012, 0, 1),  2.4],
  [Date.UTC(2013, 0, 1),  1.6]
]
}



],
        
        title: {
            text: 'Reasonable Definitions Suggest Higher Amounts of Spending'
        },
        subtitle:{
          text: 'Notes: Data on severity of disaster definition form EM-DAT (Guha-Sapir et al., 2015). Data on aid flows disaggregated by purpose from the OECD CRS (2016). Includes all aid to recipient which recorded any natural disaster, a disaster in the top 10% of disasters globally in terms of financial or human losses, or a disaster in the to 10% of disasters in the country’s history. CGD analysis.'
            
        },

        yAxis: {
            title: {
               text: 'billions USD(2010)'
               }          
        },
        xAxis: {
            type: 'datetime'

           
        },
        plotOptions: {
         series: {
         marker: {
         enabled:false
         }/*,
         stacking:'normal'*/
         }
        },
        tooltip: {
          valuePrefix: '$',
          valueSuffix: ' billion'
        }


    });

});





$(function() {

  $('#chart-9').highcharts({
    chart: {
      type: 'column',

    },

colors: teal,
    series: [
    {
      yAxis: 0,
      name: 'Deaths, Guinea',
      data: [
  [Date.UTC(2014, 2, 1), 255],
  [Date.UTC(2014, 3, 1), 892],
  [Date.UTC(2014, 4, 1), 846],
  [Date.UTC(2014, 5, 1), 1419],
  [Date.UTC(2014, 6, 1), 2810],
  [Date.UTC(2014, 7, 1), 3827],
  [Date.UTC(2014, 8, 1), 4740],
  [Date.UTC(2014, 9, 1), 8545],
  [Date.UTC(2014, 10, 1), 9381],
  [Date.UTC(2014, 11, 1), 7595],
  [Date.UTC(2015, 0, 1), 7381],
  [Date.UTC(2015, 1, 1), 8087],
  [Date.UTC(2015, 2, 1), 8786],
  [Date.UTC(2015, 3, 1), 11728],
  [Date.UTC(2015, 4, 1), 9605],
  [Date.UTC(2015, 5, 1), 9783],
  [Date.UTC(2015, 6, 1), 12519],
  [Date.UTC(2015, 7, 1), 10097],
  [Date.UTC(2015, 8, 1), 10121],
  [Date.UTC(2015, 9, 1), 12671],
  [Date.UTC(2015, 10, 1), 10144],
  [Date.UTC(2015, 11, 1), 12680],
  [Date.UTC(2016, 0, 1), 10144],
  [Date.UTC(2016, 1, 1), 7608]
]
    },{
      yAxis: 0,
      name: 'Deaths, Liberia',
      data: [
  [Date.UTC(2014, 2, 1), 12],
  [Date.UTC(2014, 3, 1), 76],
  [Date.UTC(2014, 4, 1), 49],
  [Date.UTC(2014, 5, 1), 96],
  [Date.UTC(2014, 6, 1), 945],
  [Date.UTC(2014, 7, 1), 4162],
  [Date.UTC(2014, 8, 1), 11290],
  [Date.UTC(2014, 9, 1), 23771],
  [Date.UTC(2014, 10, 1), 23199],
  [Date.UTC(2014, 11, 1), 16419],
  [Date.UTC(2015, 0, 1), 14325],
  [Date.UTC(2015, 1, 1), 15509],
  [Date.UTC(2015, 2, 1), 16844],
  [Date.UTC(2015, 3, 1), 22407],
  [Date.UTC(2015, 4, 1), 19097],
  [Date.UTC(2015, 5, 1), 19224],
  [Date.UTC(2015, 6, 1), 24037],
  [Date.UTC(2015, 7, 1), 19232],
  [Date.UTC(2015, 8, 1), 19232],
  [Date.UTC(2015, 9, 1), 24040],
  [Date.UTC(2015, 10, 1), 19232],
  [Date.UTC(2015, 11, 1), 24045],
  [Date.UTC(2016, 0, 1), 19236],
  [Date.UTC(2016, 1, 1), 14427]
]
    },{
      yAxis: 0,
      name: 'Deaths, Sierra Leone',
      data: [
  [Date.UTC(2014, 2, 1), 5],
  [Date.UTC(2014, 3, 1), 0],
  [Date.UTC(2014, 4, 1), 9],
  [Date.UTC(2014, 5, 1), 122],
  [Date.UTC(2014, 6, 1), 1543],
  [Date.UTC(2014, 7, 1), 3373],
  [Date.UTC(2014, 8, 1), 4443],
  [Date.UTC(2014, 9, 1), 11087],
  [Date.UTC(2014, 10, 1), 10001],
  [Date.UTC(2014, 11, 1), 10776],
  [Date.UTC(2015, 0, 1), 12349],
  [Date.UTC(2015, 1, 1), 13486],
  [Date.UTC(2015, 2, 1), 14613],
  [Date.UTC(2015, 3, 1), 19263],
  [Date.UTC(2015, 4, 1), 15622],
  [Date.UTC(2015, 5, 1), 15674],
  [Date.UTC(2015, 6, 1), 19719],
  [Date.UTC(2015, 7, 1), 15806],
  [Date.UTC(2015, 8, 1), 15814],
  [Date.UTC(2015, 9, 1), 19775],
  [Date.UTC(2015, 10, 1), 15820],
  [Date.UTC(2015, 11, 1), 19775],
  [Date.UTC(2016, 0, 1), 15822],
  [Date.UTC(2016, 1, 1), 11868]
]
    },
    {
      type: 'line',
      marker: {
        enabled: false
      },
      yAxis: 1,
      name: 'Funding',
      tooltip: {


        valueSuffix: ' million',
        valuePrefix: '$'
      },
      data: [
        [Date.UTC(2014, 2, 1), 0.85],
        [Date.UTC(2014, 3, 1), 4.76],
        [Date.UTC(2014, 4, 1), 5.34],
        [Date.UTC(2014, 5, 1), 5.18],
        [Date.UTC(2014, 6, 1), 4.49],
        [Date.UTC(2014, 7, 1), 127.86],
        [Date.UTC(2014, 8, 1), 1309.79],
        [Date.UTC(2014, 9, 1), 609.04],
        [Date.UTC(2014, 10, 1), 470.00],
        [Date.UTC(2014, 11, 1), 509.43],
        [Date.UTC(2015, 0, 1), 195.42],
        [Date.UTC(2015, 1, 1), 46.10],
        [Date.UTC(2015, 2, 1), 110.11],
        [Date.UTC(2015, 3, 1), 99.60],
        [Date.UTC(2015, 4, 1), 29.34],
        [Date.UTC(2015, 5, 1), 90.10],
        [Date.UTC(2015, 6, 1), 549.11],
        [Date.UTC(2015, 7, 1), 17.65],
        [Date.UTC(2015, 8, 1), 10.99],
        [Date.UTC(2015, 9, 1), 7.18],
        [Date.UTC(2015, 10, 1), 6.97],
        [Date.UTC(2015, 11, 1), 211.87],
        [Date.UTC(2016, 0, 1), 2.34],
        [Date.UTC(2016, 1, 1), 15.93]
      ]
    }],

    title: {
      text: 'Funding Follows the Caseload: Ebola in West Africa'
    },
    subtitle: {
      text: 'Notes: Data from UN OCHA Financial Tracking Service (FTS), 2015 and Centers for Disease Control (2016). CGD analysis.'

    },
    yAxis: [{
      title: {
        text: 'thousands of deaths'
        
      },
      labels: {
        formatter: function(){
                  return this.value / 1000;
                }
        
      }



    }, {

      title: {
        text: 'millions USD',
        
      },
      
      opposite: true
    }],

    xAxis: {
      type: 'datetime'


    },
    plotOptions:{
     column: {
     stacking: 'normal'
     }
    }
    


  });

});






$(function() {

      $('#chart-9b').highcharts({
          chart: {
            type: 'line',

          },
title: {
text:''
},
subtitle: {
text: 'Notes:  Data from UN OCHA Financial Tracking Service (FTS), 2015 and Centers for Disease Control (2016). CGD analysis.'
},

          series: [{
            marker: {
        enabled: false
      },
            yAxis:1,
            name: 'Change in commitments (%)',
            data: [
              [Date.UTC(2014, 2, 1), 0.0],
              [Date.UTC(2014, 3, 1), 4.6],
              [Date.UTC(2014, 4, 1), 0.1],
              [Date.UTC(2014, 5, 1), 0.0],
              [Date.UTC(2014, 6, 1), -0.1],
              [Date.UTC(2014, 7, 1), 27.5],
              [Date.UTC(2014, 8, 1), 9.2],
              [Date.UTC(2014, 9, 1), -0.5],
              [Date.UTC(2014, 10, 1), -0.2],
              [Date.UTC(2014, 11, 1), 0.1],
              [Date.UTC(2015, 0, 1), -0.6],
              [Date.UTC(2015, 1, 1), -0.8],
              [Date.UTC(2015, 2, 1), 1.4],
              [Date.UTC(2015, 3, 1), -0.1],
              [Date.UTC(2015, 4, 1), -0.7],
              [Date.UTC(2015, 5, 1), 2.1],
              [Date.UTC(2015, 6, 1), 5.1],
              [Date.UTC(2015, 7, 1), -1.0],
              [Date.UTC(2015, 8, 1), -0.4],
              [Date.UTC(2015, 9, 1), -0.3],
              [Date.UTC(2015, 10, 1), 0.0],
              [Date.UTC(2015, 11, 1), 29.4],
              [Date.UTC(2016, 0, 1), -1.0],
              [Date.UTC(2016, 1, 1), 5.8]
            ]
          }, {
            marker: {
        enabled: false
      },
            yAxis:0,
            name: 'Change in deaths (%)',
            data: [
              [Date.UTC(2014, 2, 1), 0.0],
              [Date.UTC(2014, 3, 1), 2.6],
              [Date.UTC(2014, 4, 1), -0.1],
              [Date.UTC(2014, 5, 1), 0.8],
              [Date.UTC(2014, 6, 1), 2.2],
              [Date.UTC(2014, 7, 1), 1.1],
              [Date.UTC(2014, 8, 1), 0.8],
              [Date.UTC(2014, 9, 1), 1.1],
              [Date.UTC(2014, 10, 1), 0.0],
              [Date.UTC(2014, 11, 1), -0.2],
              [Date.UTC(2015, 0, 1), 0.0],
              [Date.UTC(2015, 1, 1), 0.1],
              [Date.UTC(2015, 2, 1), 0.1],
              [Date.UTC(2015, 3, 1), 0.3],
              [Date.UTC(2015, 4, 1), -0.2],
              [Date.UTC(2015, 5, 1), 0.0],
              [Date.UTC(2015, 6, 1), 0.3],
              [Date.UTC(2015, 7, 1), -0.2],
              [Date.UTC(2015, 8, 1), 0.0],
              [Date.UTC(2015, 9, 1), 0.3],
              [Date.UTC(2015, 10, 1), -0.2],
              [Date.UTC(2015, 11, 1), 0.3],
              [Date.UTC(2016, 0, 1), -0.2],
              [Date.UTC(2016, 1, 1), -0.2]
            ]
          }],


          yAxis: [{
            title: {
              text: 'percent change in deaths',
            },
             plotLines: [{
            value:0,
            width:2,
            color:'#888888'
            }]
            },
            {
            title: {
              text: 'percent change in funding (commitments)',
            },
            opposite:true,
            max: 30
            }],

            xAxis: {
              type: 'datetime'
            }


          });

      });




$(function() {

  $('#chart-10').highcharts({
    chart: {
      type: 'column',

    },


    series: [{
      
     
      yAxis: 0,
      name: 'Excess deaths',
      data: [
        [Date.UTC(2010, 9, 1), 5500],
        [Date.UTC(2010, 10, 1), 4800],
        [Date.UTC(2010, 11, 1), 4100],
        [Date.UTC(2011, 0, 1), 7300],
        [Date.UTC(2011, 1, 1), 9600],
        [Date.UTC(2011, 2, 1), 12400],
        [Date.UTC(2011, 3, 1), 10600],
        [Date.UTC(2011, 4, 1), 29800],
        [Date.UTC(2011, 5, 1), 31400],
        [Date.UTC(2011, 6, 1), 31700],
        [Date.UTC(2011, 7, 1), 28700],
        [Date.UTC(2011, 8, 1), 2700],
        [Date.UTC(2011, 9, 1), 17400],
        [Date.UTC(2011, 10, 1), 15300],
        [Date.UTC(2011, 11, 1), 9500],
        [Date.UTC(2012, 0, 1), 5700],
        [Date.UTC(2012, 1, 1), 5300],
        [Date.UTC(2012, 2, 1), 1400]
      ]
    }, {
      type: 'line',
       marker: {
        enabled: false
      },
      yAxis: 1,
      name: 'Funding to Somalia CAP appeal',
      tooltip: {


      valueSuffix: ' million',
      valuePrefix: '$'



    },
      data: [
        [Date.UTC(2010, 9, 1), 16],
        [Date.UTC(2010, 10, 1), 2],
        [Date.UTC(2010, 11, 1), 54],
        [Date.UTC(2011, 0, 1), 112],
        [Date.UTC(2011, 1, 1), 35],
        [Date.UTC(2011, 2, 1), 21],
        [Date.UTC(2011, 3, 1), 16],
        [Date.UTC(2011, 4, 1), 37],
        [Date.UTC(2011, 5, 1), 34],
        [Date.UTC(2011, 6, 1), 242],
        [Date.UTC(2011, 7, 1), 175],
        [Date.UTC(2011, 8, 1), 102],
        [Date.UTC(2011, 9, 1), 38],
        [Date.UTC(2011, 10, 1), 51],
        [Date.UTC(2011, 11, 1), 76],
        [Date.UTC(2012, 0, 1), 61],
        [Date.UTC(2012, 1, 1), 55],
        [Date.UTC(2012, 2, 1), 42]
      ]

    }],
    
    title: {
      text: 'Funding Follows Deaths: Famine in Somalia'
    },
    subtitle: {
      text: 'Notes: Data from Development Initiatives Global Humanitarian Assistance 2013 report, based on UN OCHA FTS data and data analysis done by Checchi (2013) on original survey data from Food Security and Nutrition Analysis Unit—Somalia (FSNAU).'

    },
    yAxis: [ {
      title: {
        text: 'thousands of excess deaths',
        style: {
                    color: Highcharts.getOptions().colors[0]
                }
      },
      labels: {
      style: {
                    color: Highcharts.getOptions().colors[0]
                },
                formatter: function(){
                  return this.value / 1000;
                }
      },
     max:32000

     

    },
    {

      title: {
        text: 'millions USD'
      },
      max:250,
       opposite: true
    }],

      xAxis: {
      type: 'datetime'


    }


  });

});









$(function() {
  var categories = ['Honduras', 'Guatemala', 'Dominica', 'Mozambique', 'Vanuatu', 'Malawi', 'Nepal'];
  $('#chart-11').highcharts({
    chart: {
      type: 'column'
    },
    series: [{
        yAxis: 0,
        name: 'Donors',
        data: [{
          disaster: "Honduras",
          y: 5,
          name: "Honduras"
        }, {
          disaster: "Guatemala",
          y: 7,
          name: "Guatemala"
        }, {
          disaster: "Dominica Tropical Storm Erika",
          y: 8,
          name: "Dominica"
        }, {
          disaster: "Mozambique Floods",
          y: 16,
          name: "Mozambique"
        }, {
          disaster: "Vanuatu Tropical Cyclone Pam",
          y: 26,
          name: "Vanuatu"
        }, {
          disaster: "Malawi Floods",
          y: 29,
          name: "Malawi"
        }, {
          disaster: "Nepal Earthquake",
          y: 52,
          name: "Nepal"
        }]

      }, {
        
        yAxis: 1,
        name: 'Concentration',
        data: [{
          disaster: "Honduras",
          y: 0.570394576,
          name: "Honduras"
        }, {
          disaster: "Guatemala",
          y: 0.583721817,
          name: "Guatemala"
        }, {
          disaster: "Dominica Tropical Storm Erika",
          y: 0.197395205,
          name: "Dominica"
        }, {
          disaster: "Mozambique Floods",
          y: 0.186625138,
          name: "Mozambique"
        }, {
          disaster: "Vanuatu Tropical Cyclone Pam",
          y: 0.102202974,
          name: "Vanuatu"
        }, {
          disaster: "Malawi Floods",
          y: 0.081027478,
          name: "Malawi"
        }, {
          disaster: "Nepal Earthquake",
          y: 0.126833886,
          name: "Nepal"
        }]


      }

    ],

    title: {
      text: 'More Donors Mean More Fragmentation'
    },
    subtitle: {
      text: 'Notes: Data from UN OCHA Financial Tracking Service (FTS), 2015. CGD analysis.'
    },
    xAxis: {
      labels: {
        formatter: function() {
          return categories[this.value];
        }
      }
    },
    yAxis: [{
      title: {
        text: 'number of donors',
        style: {
          color: Highcharts.getOptions().colors[0]
        }
      },


      labels: {
        style: {
          color: Highcharts.getOptions().colors[0]
        }
      }

    }, {
      title: {
        text: 'concentration'
      },
      opposite: true,
      max: 0.6
    }],
    tooltip: {
          formatter: function() {
            if (Number.isInteger(this.y)) {
              return '<b>' + this.point.disaster + '</b><br />' + this.point.series.name + ': ' + this.y;
            } else {
              return '<b>' + this.point.disaster + '</b><br />' + this.point.series.name + ': ' + Highcharts.numberFormat(this.y, 2, '.', ',');
            }
          }
        }

  });


});















$(function() {

  $('#chart-12').highcharts({
    chart: {
      type: 'area',
      marker: {
        enabled: false
      }
    },
    colors: ["#438390", "#564e34", "#1fa9b8", "#898167", "#5ED6E4", "#C2B793", "#9CA9D3", "#9FBFF7"],
    series: [{
        color: 'url(#highcharts-default-pattern-1)',
        lineColor: '#564e34',
        lineWidth: 1,
        name: 'Reduction',
        data: [
          [Date.UTC(1990, 0, 1), 0.01],
          [Date.UTC(1991, 0, 1), 0.00],
          [Date.UTC(1992, 0, 1), 0.01],
          [Date.UTC(1993, 0, 1), 0.02],
          [Date.UTC(1994, 0, 1), 0.01],
          [Date.UTC(1995, 0, 1), 0.05],
          [Date.UTC(1996, 0, 1), 0.01],
          [Date.UTC(1997, 0, 1), 0.34],
          [Date.UTC(1998, 0, 1), 0.12],
          [Date.UTC(1999, 0, 1), 0.13],
          [Date.UTC(2000, 0, 1), 0.74],
          [Date.UTC(2001, 0, 1), 0.12],
          [Date.UTC(2002, 0, 1), 0.19],
          [Date.UTC(2003, 0, 1), 0.42],
          [Date.UTC(2004, 0, 1), 0.31],
          [Date.UTC(2005, 0, 1), 1.11],
          [Date.UTC(2006, 0, 1), 0.39],
          [Date.UTC(2007, 0, 1), 0.63],
          [Date.UTC(2008, 0, 1), 1.40],
          [Date.UTC(2009, 0, 1), 1.31],
          [Date.UTC(2010, 0, 1), 1.05],
          [Date.UTC(2011, 0, 1), 1.15],
          [Date.UTC(2012, 0, 1), 1.73],
          [Date.UTC(2013, 0, 1), 1.33]
        ]
      }, {

        name: 'Reconstruction',
        data: [
          [Date.UTC(1990, 0, 1), 0.91],
          [Date.UTC(1991, 0, 1), 0.24],
          [Date.UTC(1992, 0, 1), 0.86],
          [Date.UTC(1993, 0, 1), 1.23],
          [Date.UTC(1994, 0, 1), 0.73],
          [Date.UTC(1995, 0, 1), 1.56],
          [Date.UTC(1996, 0, 1), 0.49],
          [Date.UTC(1997, 0, 1), 0.58],
          [Date.UTC(1998, 0, 1), 2.08],
          [Date.UTC(1999, 0, 1), 2.48],
          [Date.UTC(2000, 0, 1), 2.23],
          [Date.UTC(2001, 0, 1), 2.97],
          [Date.UTC(2002, 0, 1), 5.67],
          [Date.UTC(2003, 0, 1), 3.78],
          [Date.UTC(2004, 0, 1), 3.01],
          [Date.UTC(2005, 0, 1), 4.64],
          [Date.UTC(2006, 0, 1), 2.34],
          [Date.UTC(2007, 0, 1), 3.02],
          [Date.UTC(2008, 0, 1), 1.36],
          [Date.UTC(2009, 0, 1), 1.77],
          [Date.UTC(2010, 0, 1), 2.94],
          [Date.UTC(2011, 0, 1), 1.27],
          [Date.UTC(2012, 0, 1), 1.50],
          [Date.UTC(2013, 0, 1), 1.25]
        ]
      },

      {

        name: 'Emergency',
        data: [
          [Date.UTC(1990, 0, 1), 1.19],
          [Date.UTC(1991, 0, 1), 1.32],
          [Date.UTC(1992, 0, 1), 1.60],
          [Date.UTC(1993, 0, 1), 1.63],
          [Date.UTC(1994, 0, 1), 1.88],
          [Date.UTC(1995, 0, 1), 2.95],
          [Date.UTC(1996, 0, 1), 3.71],
          [Date.UTC(1997, 0, 1), 3.60],
          [Date.UTC(1998, 0, 1), 4.48],
          [Date.UTC(1999, 0, 1), 8.98],
          [Date.UTC(2000, 0, 1), 4.64],
          [Date.UTC(2001, 0, 1), 4.75],
          [Date.UTC(2002, 0, 1), 6.65],
          [Date.UTC(2003, 0, 1), 7.86],
          [Date.UTC(2004, 0, 1), 8.56],
          [Date.UTC(2005, 0, 1), 10.29],
          [Date.UTC(2006, 0, 1), 7.65],
          [Date.UTC(2007, 0, 1), 8.34],
          [Date.UTC(2008, 0, 1), 9.95],
          [Date.UTC(2009, 0, 1), 11.71],
          [Date.UTC(2010, 0, 1), 11.70],
          [Date.UTC(2011, 0, 1), 11.91],
          [Date.UTC(2012, 0, 1), 10.53],
          [Date.UTC(2013, 0, 1), 13.16]
        ]

      }, {

        name: 'Humanitarian',
        data: [
          [Date.UTC(1990, 0, 1), 0.05],
          [Date.UTC(1991, 0, 1), 0.39],
          [Date.UTC(1992, 0, 1), 0.65],
          [Date.UTC(1993, 0, 1), 0.13],
          [Date.UTC(1994, 0, 1), 0.08],
          [Date.UTC(1995, 0, 1), 0.00],
          [Date.UTC(1996, 0, 1), 0.00],
          [Date.UTC(1997, 0, 1), 0.80],
          [Date.UTC(1998, 0, 1), 1.31],
          [Date.UTC(1999, 0, 1), 0.79],
          [Date.UTC(2000, 0, 1), 0.22],
          [Date.UTC(2001, 0, 1), 0.09],
          [Date.UTC(2002, 0, 1), 0.11],
          [Date.UTC(2003, 0, 1), 0.34],
          [Date.UTC(2004, 0, 1), 0.14],
          [Date.UTC(2005, 0, 1), 0.87],
          [Date.UTC(2006, 0, 1), 0.11],
          [Date.UTC(2007, 0, 1), 0.09],
          [Date.UTC(2008, 0, 1), 0.37],
          [Date.UTC(2009, 0, 1), 0.07],
          [Date.UTC(2010, 0, 1), 0.64],
          [Date.UTC(2011, 0, 1), 0.26],
          [Date.UTC(2012, 0, 1), 0.21],
          [Date.UTC(2013, 0, 1), 0.02]
        ]
      }
    ],

    title: {
      text: 'Finance for Reducing Losses Is a Small Share of Total Aid'

    },
    subtitle: {
      text: 'Notes: Data on total disaster-related aid from OECD (2016). Subset of all aid flows using coalesced purpose codes 70000, 74010, 72000–72050, 73010, corresponding to emergency, reconstruction and prevention / preparedness only. CGD analysis.'

    },

    yAxis: {
      title: {
        text: 'billions USD(2010)'
      },
      reversedStacks: true
    },
    xAxis: {
      type: 'datetime'


    },
    plotOptions: {
      series: {
        marker: {
          enabled: false
        },
        stacking: 'normal'
      }
    },
    tooltip: {
      valueDecimals: 2,
      valueSuffix: ' billion',
      valuePrefix: '$'
    }



  });

});
  



$(function() {

  $('#chart-13').highcharts({
    chart: {
      type: 'column',
      marker: {
        enabled: false
      }
    },


    series: [

      {

        name: 'Requirements',
        data: [
          [Date.UTC(2006, 0, 1), 5.91],
          [Date.UTC(2007, 0, 1), 5.63],
          [Date.UTC(2008, 0, 1), 7.19],
          [Date.UTC(2009, 0, 1), 9.99],
          [Date.UTC(2010, 0, 1), 11.25],
          [Date.UTC(2011, 0, 1), 8.54],
          [Date.UTC(2012, 0, 1), 8.59],
          [Date.UTC(2013, 0, 1), 11.61],
          [Date.UTC(2014, 0, 1), 15.77],
          [Date.UTC(2015, 0, 1), 16.39]
        ]
      }, {

        name: 'Funding',
        data: [
          [Date.UTC(2006, 0, 1), 3.95],
          [Date.UTC(2007, 0, 1), 4.07],
          [Date.UTC(2008, 0, 1), 5.41],
          [Date.UTC(2009, 0, 1), 7.24],
          [Date.UTC(2010, 0, 1), 7.25],
          [Date.UTC(2011, 0, 1), 5.50],
          [Date.UTC(2012, 0, 1), 5.39],
          [Date.UTC(2013, 0, 1), 7.53],
          [Date.UTC(2014, 0, 1), 9.61],
          [Date.UTC(2015, 0, 1), 9.27]
        ]
      }, {
        name: 'Deficit',
        data: [
          [Date.UTC(2006, 0, 1), -1.96],
          [Date.UTC(2007, 0, 1), -1.56],
          [Date.UTC(2008, 0, 1), -1.78],
          [Date.UTC(2009, 0, 1), -2.75],
          [Date.UTC(2010, 0, 1), -4.00],
          [Date.UTC(2011, 0, 1), -3.04],
          [Date.UTC(2012, 0, 1), -3.20],
          [Date.UTC(2013, 0, 1), -4.08],
          [Date.UTC(2014, 0, 1), -6.16],
          [Date.UTC(2015, 0, 1), -7.12]
        ],
        color: '#d95e66',
        dataLabels: {
          enabled: true,
          formatter: function() {
            return Highcharts.numberFormat(this.y, 1, '.', ',');
          }
        }
      }
    ],

    title: {
      text: 'The Humanitarian Financing Deficit Is Growing Fast'

    },
    subtitle: {
      text: 'Notes: Data from UN OCHA Financial Tracking Service (FTS), 2015. CGD analysis. '

    },

    yAxis: {
      title: {
        text: 'billions USD(2010)'
      },
      reversedStacks: false
    },
    xAxis: {
      type: 'datetime'


    },
    plotOptions: {
      series: {
        marker: {
          enabled: false
        },
        tooltip: {
          valueDecimals: 1,
          valueSuffix: ' billion',
          valuePrefix: '$'
        }
      }

    }


  });
});



$(function() {

  $('#chart-13b').highcharts({
    chart: {
      type: 'column',
      marker: {
        enabled: false
      }
    },


    series: [{
      
      name: 'Deficit',
      type: 'arearange',
      data: [
        [Date.UTC(2006, 0, 1), 3.9, 5.9],
        [Date.UTC(2007, 0, 1), 4.1, 5.6],
        [Date.UTC(2008, 0, 1), 5.4, 7.2],
        [Date.UTC(2009, 0, 1), 7.2, 10.0],
        [Date.UTC(2010, 0, 1), 7.3, 11.3],
        [Date.UTC(2011, 0, 1), 5.5, 8.5],
        [Date.UTC(2012, 0, 1), 5.4, 8.6],
        [Date.UTC(2013, 0, 1), 7.5, 11.6],
        [Date.UTC(2014, 0, 1), 9.6, 15.8],
        [Date.UTC(2015, 0, 1), 9.3, 16.4]
      ],
      color: '#d95e66',
      dataLabels: {
        enabled: true,
        formatter: function() {

          if (this.y == this.point.high) {
            return '(' + Highcharts.numberFormat(this.y - this.point.low, 1, '.', ',') + ')';
          }
        },
        yHigh: -10,
        xHigh: -3,
        color: '#d95e66'

      }
    }, {

      name: 'Requirements',
      data: [
        [Date.UTC(2006, 0, 1), 5.91],
        [Date.UTC(2007, 0, 1), 5.63],
        [Date.UTC(2008, 0, 1), 7.19],
        [Date.UTC(2009, 0, 1), 9.99],
        [Date.UTC(2010, 0, 1), 11.25],
        [Date.UTC(2011, 0, 1), 8.54],
        [Date.UTC(2012, 0, 1), 8.59],
        [Date.UTC(2013, 0, 1), 11.61],
        [Date.UTC(2014, 0, 1), 15.77],
        [Date.UTC(2015, 0, 1), 16.39]
      ]
    }, {

      name: 'Funding',
      data: [
        [Date.UTC(2006, 0, 1), 3.95],
        [Date.UTC(2007, 0, 1), 4.07],
        [Date.UTC(2008, 0, 1), 5.41],
        [Date.UTC(2009, 0, 1), 7.24],
        [Date.UTC(2010, 0, 1), 7.25],
        [Date.UTC(2011, 0, 1), 5.50],
        [Date.UTC(2012, 0, 1), 5.39],
        [Date.UTC(2013, 0, 1), 7.53],
        [Date.UTC(2014, 0, 1), 9.61],
        [Date.UTC(2015, 0, 1), 9.27]
      ]
    }],

    title: {
      text: 'The Humanitarian Financing Deficit Is Growing Fast'

    },
    subtitle: {
      text: 'Notes: Data from UN OCHA Financial Tracking Service (FTS), 2015. CGD analysis. '

    },

    yAxis: {
      title: {
        text: 'billions USD(2010)'
      },
      reversedStacks: false,
      max: 18,
      tickInterval: 5
    },
    xAxis: {
      type: 'datetime'


    },
    plotOptions: {
      series: {
        marker: {
          enabled: false
        }        
      },
      column: {
      tooltip: {
          valueDecimals: 1,
          valueSuffix: ' billion',
          valuePrefix: '$'
        }
      },
      arearange: {
      tooltip: {
        pointFormatter: function() {
          console.log(this);
          return '<span style="color:' + this.color + '">\u25CF</span>' +  this.series.name + ': <b>$' + Highcharts.numberFormat(this.high - this.low, 1, '.',',') + ' billion</b><br/>';

        }
      }
      }

    }


  });
});






$(function() {

      $('#chart-14').highcharts({
        chart: {
          type: 'column',
          marker: {
            enabled: false
          }
        },


        series: [

          {

            name: 'Global insured losses',
            data: [
              [Date.UTC(2004, 0, 1), 48],
              [Date.UTC(2005, 0, 1), 100],
              [Date.UTC(2006, 0, 1), 15],
              [Date.UTC(2007, 0, 1), 26],
              [Date.UTC(2008, 0, 1), 45],
              [Date.UTC(2009, 0, 1), 22],
              [Date.UTC(2010, 0, 1), 38],
              [Date.UTC(2011, 0, 1), 105],
              [Date.UTC(2012, 0, 1), 70],
              [Date.UTC(2013, 0, 1), 35]
            ]
          },
          {

            name: 'Disaster-related aid',
            data: [
              [Date.UTC(2004, 0, 1), 8.63],
              [Date.UTC(2005, 0, 1), 13.27],
              [Date.UTC(2006, 0, 1), 8.02],
              [Date.UTC(2007, 0, 1), 8.75],
              [Date.UTC(2008, 0, 1), 10.35],
              [Date.UTC(2009, 0, 1), 11.08],
              [Date.UTC(2010, 0, 1), 11.57],
              [Date.UTC(2011, 0, 1), 9.45],
              [Date.UTC(2012, 0, 1), 8.72],
              [Date.UTC(2013, 0, 1), 10.89]
            ]
          }
        ],

        title: {
          text: 'Insurance Payouts Are Much Larger Than Ex-Post Aid'

        },
        subtitle: {
          text: 'Notes: Data on disaster-related aid is from OECD (2016). Data on insurance payouts from Munich Re (2015). CGD analysis.'

        },

        yAxis: {
          title: {
            text: 'billions USD'
          },
          reversedStacks: false
        },
        xAxis: {
          type: 'datetime'


        },
        plotOptions: {
          series: {
            marker: {
              enabled: false
            },
            tooltip: {
            valueDecimals: 2,
            valueSuffix: ' billion',
            valuePrefix: '$'
          }
          }
          
        }


      });
});












