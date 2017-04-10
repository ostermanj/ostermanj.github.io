var teal = ["#438390", "#564e34", "#1fa9b8", "#898167", "#5ED6E4", "#C2B793", "#9CA9D3", "#9FBFF7"];
var highlight = ["#438390", "#c5c5c5", "#c5c5c5", "#c5c5c5", "#c5c5c5", "#c5c5c5", "#c5c5c5", "#c5c5c5"];
/*
 * CHART 1
 *
 *
 *
 *
 */

   Highcharts.setOptions(Highcharts.theme);
 $(function() {
   $('#hc-container').highcharts({
       chart: {
         type: 'bubble',
         zoomType: 'xy',

       },
       title: {
         text: 'Disasters Lower Incomes, Lower Incomes Increase Vulnerability'
       },
       subtitle: {
         text: 'Notes: Data for average number of deaths per year from EM-DAT (Guha-Sapir et al., 2015), data on GDP per capita and population form World Bank (2015), vulnerability measured by INFORM (2017), rescaled from zero to one. CGD analysis.',

       },
       series: [{

         regression: true,
         regressionSettings: {
           type: 'logarithmic',
           color: '#cccccc'

         },
         data: [{
           "name": "Afghanistan",
           "x": 594.32,
           "y": 0.84,
           "z": 17.75
         }, {
           "name": "Albania",
           "x": 3945.22,
           "y": 0.27,
           "z": 2.36
         }, {
           "name": "Algeria",
           "x": 4206.03,
           "y": 0.45,
           "z": 1.71
         }, {
           "name": "Angola",
           "x": 4101.47,
           "y": 0.51,
           "z": 19.11
         }, {
           "name": "Armenia",
           "x": 3489.13,
           "y": 0.38,
           "z": 0
         }, {
           "name": "Azerbaijan",
           "x": 5496.34,
           "y": 0.49,
           "z": 1.01
         }, {
           "name": "Bangladesh",
           "x": 1211.7,
           "y": 0.61,
           "z": 6.67
         }, {
           "name": "Belarus",
           "x": 5740.46,
           "y": 0.18,
           "z": 0.1
         }, {
           "name": "Belize",
           "x": 4878.72,
           "y": 0.33,
           "z": 3.34
         }, {
           "name": "Benin",
           "x": 762.05,
           "y": 0.45,
           "z": 3.22
         }, {
           "name": "Bhutan",
           "x": 2656,
           "y": 0.28,
           "z": 3.08
         }, {
           "name": "Bolivia",
           "x": 3076.79,
           "y": 0.41,
           "z": 8.55
         }, {
           "name": "Bosnia and Herzegovina",
           "x": 4249.33,
           "y": 0.42,
           "z": 1.21
         }, {
           "name": "Botswana",
           "x": 6360.14,
           "y": 0.28,
           "z": 23.13
         }, {
           "name": "Brazil",
           "x": 8538.59,
           "y": 0.34,
           "z": 1.69
         }, {
           "name": "Bulgaria",
           "x": 6993.48,
           "y": 0.25,
           "z": 2.23
         }, {
           "name": "Burkina Faso",
           "x": 589.77,
           "y": 0.57,
           "z": 27.81
         }, {
           "name": "Burundi",
           "x": 277.07,
           "y": 0.67,
           "z": 4.08
         }, {
           "name": "Cabo Verde",
           "x": 3080.18,
           "y": 0.24,
           "z": 16.64
         }, {
           "name": "Cambodia",
           "x": 1158.69,
           "y": 0.47,
           "z": 7.35
         }, {
           "name": "Cameroon",
           "x": 1217.26,
           "y": 0.66,
           "z": 9.59
         }, {
           "name": "Central African Republic",
           "x": 323.2,
           "y": 0.91,
           "z": 7.81
         }, {
           "name": "Chad",
           "x": 775.7,
           "y": 0.83,
           "z": 9.97
         }, {
           "name": "China",
           "x": 8027.68,
           "y": 0.42,
           "z": 7.84
         }, {
           "name": "Colombia",
           "x": 6056.15,
           "y": 0.57,
           "z": 5.61
         }, {
           "name": "Comoros",
           "x": 717.45,
           "y": 0.38,
           "z": 73.22
         }, {
           "name": "Congo",
           "x": 1851.2,
           "y": 0.56,
           "z": 18.25
         }, {
           "name": "Congo DR",
           "x": 456.05,
           "y": 0.75,
           "z": 7.79
         }, {
           "name": "Costa Rica",
           "x": 11260.09,
           "y": 0.28,
           "z": 2.53
         }, {
           "name": "Croatia",
           "x": 11535.83,
           "y": 0.2,
           "z": 0.89
         }, {
           "name": "Cuba",
           "x": 6789.85,
           "y": 0.25,
           "z": 2.09
         }, {
           "name": "Côte d'Ivoire",
           "x": 1398.99,
           "y": 0.6,
           "z": 2.19
         }, {
           "name": "Djibouti",
           "x": 1945.12,
           "y": 0.56,
           "z": 17.33
         }, {
           "name": "Dominica",
           "x": 7116.39,
           "y": 0.3,
           "z": 40.09
         }, {
           "name": "Dominican Republic",
           "x": 6468.47,
           "y": 0.34,
           "z": 7.18
         }, {
           "name": "Ecuador",
           "x": 6205.06,
           "y": 0.43,
           "z": 2.94
         }, {
           "name": "Egypt",
           "x": 3614.75,
           "y": 0.47,
           "z": 3.18
         }, {
           "name": "El Salvador",
           "x": 4219.35,
           "y": 0.56,
           "z": 8.23
         }, {
           "name": "Eritrea",
           "x": 544.46,
           "y": 0.57,
           "z": 1.21
         }, {
           "name": "Ethiopia",
           "x": 619.17,
           "y": 0.68,
           "z": 2.3
         }, {
           "name": "Fiji",
           "x": 4960.52,
           "y": 0.31,
           "z": 5.43
         }, {
           "name": "Gabon",
           "x": 8266.45,
           "y": 0.4,
           "z": 5.19
         }, {
           "name": "Gambia",
           "x": 471.54,
           "y": 0.36,
           "z": 3.32
         }, {
           "name": "Georgia",
           "x": 3795.97,
           "y": 0.4,
           "z": 1.27
         }, {
           "name": "Ghana",
           "x": 1369.7,
           "y": 0.36,
           "z": 4.87
         }, {
           "name": "Grenada",
           "x": 9212.02,
           "y": 0.1,
           "z": 0.88
         }, {
           "name": "Guatemala",
           "x": 3903.48,
           "y": 0.58,
           "z": 18.85
         }, {
           "name": "Guinea",
           "x": 531.32,
           "y": 0.52,
           "z": 26.62
         }, {
           "name": "Guinea-Bissau",
           "x": 572.99,
           "y": 0.5,
           "z": 48.71
         }, {
           "name": "Guyana",
           "x": 4127.35,
           "y": 0.34,
           "z": 4.16
         }, {
           "name": "Haiti",
           "x": 818.34,
           "y": 0.69,
           "z": 2040.76
         }, {
           "name": "Honduras",
           "x": 2528.89,
           "y": 0.51,
           "z": 10.34
         }, {
           "name": "Hungary",
           "x": 12363.54,
           "y": 0.19,
           "z": 5.93
         }, {
           "name": "India",
           "x": 1598.26,
           "y": 0.6,
           "z": 2.47
         }, {
           "name": "Indonesia",
           "x": 3346.49,
           "y": 0.44,
           "z": 6.6
         }, {
           "name": "Iran",
           "x": 5442.88,
           "y": 0.52,
           "z": 3.53
         }, {
           "name": "Iraq",
           "x": 4943.76,
           "y": 0.74,
           "z": 5.22
         }, {
           "name": "Jamaica",
           "x": 5232.02,
           "y": 0.24,
           "z": 1.5
         }, {
           "name": "Jordan",
           "x": 4940.05,
           "y": 0.42,
           "z": 0.7
         }, {
           "name": "Kazakhstan",
           "x": 10509.98,
           "y": 0.19,
           "z": 1.51
         }, {
           "name": "Kenya",
           "x": 1376.71,
           "y": 0.65,
           "z": 5.94
         }, {
           "name": "Kiribati",
           "x": 1424.28,
           "y": 0.36,
           "z": 0
         }, {
           "name": "Kyrgyzstan",
           "x": 1103.22,
           "y": 0.35,
           "z": 2.76
         }, {
           "name": "Lao PDR",
           "x": 1818.44,
           "y": 0.44,
           "z": 3.61
         }, {
           "name": "Lebanon",
           "x": 8047.65,
           "y": 0.57,
           "z": 2.94
         }, {
           "name": "Lesotho",
           "x": 1066.99,
           "y": 0.43,
           "z": 3.02
         }, {
           "name": "Liberia",
           "x": 455.87,
           "y": 0.53,
           "z": 100.74
         }, {
           "name": "Libya",
           "x": 5517.78,
           "y": 0.65,
           "z": 29.64
         }, {
           "name": "Madagascar",
           "x": 401.84,
           "y": 0.52,
           "z": 4.06
         }, {
           "name": "Malawi",
           "x": 371.99,
           "y": 0.5,
           "z": 4.16
         }, {
           "name": "Malaysia",
           "x": 9768.33,
           "y": 0.34,
           "z": 2.09
         }, {
           "name": "Maldives",
           "x": 8395.79,
           "y": 0.19,
           "z": 0.96
         }, {
           "name": "Mali",
           "x": 724.26,
           "y": 0.65,
           "z": 3.55
         }, {
           "name": "Marshall Islands",
           "x": 3385.97,
           "y": 0.39,
           "z": 0
         }, {
           "name": "Mauritania",
           "x": 1370.99,
           "y": 0.6,
           "z": 7.04
         }, {
           "name": "Mauritius",
           "x": 9252.11,
           "y": 0.19,
           "z": 1.74
         }, {
           "name": "Mexico",
           "x": 9005.02,
           "y": 0.5,
           "z": 1.46
         }, {
           "name": "Moldova Republic of",
           "x": 1848.06,
           "y": 0.26,
           "z": 0.97
         }, {
           "name": "Mongolia",
           "x": 3967.83,
           "y": 0.39,
           "z": 3.34
         }, {
           "name": "Montenegro",
           "x": 6406.07,
           "y": 0.23,
           "z": 2.05
         }, {
           "name": "Morocco",
           "x": 2878.2,
           "y": 0.4,
           "z": 2.54
         }, {
           "name": "Mozambique",
           "x": 529.24,
           "y": 0.64,
           "z": 5.25
         }, {
           "name": "Myanmar",
           "x": 1161.49,
           "y": 0.72,
           "z": 248.7
         }, {
           "name": "Namibia",
           "x": 4673.57,
           "y": 0.38,
           "z": 14
         }, {
           "name": "Nepal",
           "x": 743.32,
           "y": 0.57,
           "z": 39.88
         }, {
           "name": "Nicaragua",
           "x": 2086.9,
           "y": 0.43,
           "z": 7.59
         }, {
           "name": "Niger",
           "x": 358.96,
           "y": 0.78,
           "z": 6.43
         }, {
           "name": "Nigeria",
           "x": 2640.29,
           "y": 0.67,
           "z": 6.64
         }, {
           "name": "Pakistan",
           "x": 1434.7,
           "y": 0.7,
           "z": 49.46
         }, {
           "name": "Palestine",
           "x": 2866.8,
           "y": 0.5,
           "z": 0.34
         }, {
           "name": "Papua New Guinea",
           "x": 2268.17,
           "y": 0.61,
           "z": 10.49
         }, {
           "name": "Paraguay",
           "x": 4080.95,
           "y": 0.28,
           "z": 1.76
         }, {
           "name": "Peru",
           "x": 6027.13,
           "y": 0.42,
           "z": 13.13
         }, {
           "name": "Philippines",
           "x": 2904.2,
           "y": 0.51,
           "z": 20.3
         }, {
           "name": "Romania",
           "x": 8972.92,
           "y": 0.25,
           "z": 3.06
         }, {
           "name": "Russian Federation",
           "x": 9092.58,
           "y": 0.45,
           "z": 37.58
         }, {
           "name": "Rwanda",
           "x": 697.35,
           "y": 0.56,
           "z": 2.01
         }, {
           "name": "Saint Lucia",
           "x": 7735.91,
           "y": 0.15,
           "z": 10.7
         }, {
           "name": "Saint Vincent and the Grenadines",
           "x": 6739.17,
           "y": 0.15,
           "z": 9.98
         }, {
           "name": "Samoa",
           "x": 3938.55,
           "y": 0.27,
           "z": 83.17
         }, {
           "name": "Sao Tome and Principe",
           "x": 1669.06,
           "y": 0.09,
           "z": 33.34
         }, {
           "name": "Senegal",
           "x": 899.58,
           "y": 0.53,
           "z": 5.07
         }, {
           "name": "Serbia",
           "x": 5235.14,
           "y": 0.43,
           "z": 1.14
         }, {
           "name": "Sierra Leone",
           "x": 653.13,
           "y": 0.55,
           "z": 73.54
         }, {
           "name": "Solomon Islands",
           "x": 1934.86,
           "y": 0.52,
           "z": 24.64
         }, {
           "name": "Somalia",
           "x": 549.27,
           "y": 1,
           "z": 209.59
         }, {
           "name": "South Africa",
           "x": 5723.97,
           "y": 0.44,
           "z": 2.67
         }, {
           "name": "South Sudan",
           "x": 730.58,
           "y": 0.95,
           "z": 4.41
         }, {
           "name": "Sri Lanka",
           "x": 3926.17,
           "y": 0.39,
           "z": 6.07
         }, {
           "name": "Sudan",
           "x": 2414.72,
           "y": 0.75,
           "z": 10.61
         }, {
           "name": "Suriname",
           "x": 9485.32,
           "y": 0.26,
           "z": 4.5
         }, {
           "name": "Swaziland",
           "x": 3200.14,
           "y": 0.34,
           "z": 1.88
         }, {
           "name": "Syria",
           "x": 2079.99,
           "y": 0.74,
           "z": 1.24
         }, {
           "name": "Tajikistan",
           "x": 925.91,
           "y": 0.45,
           "z": 3.88
         }, {
           "name": "Tanzania",
           "x": 878.98,
           "y": 0.6,
           "z": 3.49
         }, {
           "name": "Thailand",
           "x": 5814.77,
           "y": 0.41,
           "z": 3.24
         }, {
           "name": "The former Yugoslav Republic of Macedonia",
           "x": 4852.66,
           "y": 0.26,
           "z": 1.67
         }, {
           "name": "Timor-Leste",
           "x": 1157.99,
           "y": 0.43,
           "z": 2.28
         }, {
           "name": "Togo",
           "x": 559.64,
           "y": 0.42,
           "z": 4.48
         }, {
           "name": "Tonga",
           "x": 4098.54,
           "y": 0.26,
           "z": 74.7
         }, {
           "name": "Tunisia",
           "x": 3872.51,
           "y": 0.31,
           "z": 2.94
         }, {
           "name": "Turkey",
           "x": 9125.69,
           "y": 0.52,
           "z": 2.73
         }, {
           "name": "Turkmenistan",
           "x": 6672.48,
           "y": 0.32,
           "z": 0.27
         }, {
           "name": "Tuvalu",
           "x": 3295.01,
           "y": 0.4,
           "z": 0
         }, {
           "name": "Uganda",
           "x": 705.29,
           "y": 0.63,
           "z": 5.33
         }, {
           "name": "Ukraine",
           "x": 2114.95,
           "y": 0.56,
           "z": 3.38
         }, {
           "name": "Uzbekistan",
           "x": 2132.07,
           "y": 0.31,
           "z": 0.12
         }, {
           "name": "Vanuatu",
           "x": 2805.31,
           "y": 0.4,
           "z": 7.99
         }, {
           "name": "Venezuela",
           "x": 12265.03,
           "y": 0.47,
           "z": 2.05
         }, {
           "name": "Viet Nam",
           "x": 2111.14,
           "y": 0.35,
           "z": 3.46
         }, {
           "name": "Yemen",
           "x": 1406.29,
           "y": 0.82,
           "z": 5.48
         }, {
           "name": "Zambia",
           "x": 1304.88,
           "y": 0.42,
           "z": 4.98
         }, {
           "name": "Zimbabwe",
           "x": 924.14,
           "y": 0.51,
           "z": 34.08
         }],
         name: 'Countries',
         type: 'bubble',
         enableMouseTracking: true,
         showInLegend: true

       }],
       plotOptions: {
         series: {
           enableMouseTracking: false,
           showInLegend: false
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


           return '<b>' + this.point.name + '</b><br />GDP per capita: $' + Highcharts.numberFormat(this.point.x, 0, '.', ',') + '<br/>Vulnerability index: ' + Highcharts.numberFormat(this.point.y, 2, '.', ',') + '<br />Deaths per million: ' + Highcharts.numberFormat(this.point.z, 0, '.', ',') + '<br/>';


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
           text: 'GDP per capita (log scale)'
         },
         minPadding: 0.02,
         type: 'logarithmic',
         tickWidth: 0,
         labels: {
           enabled: true,
           format: '{value:,.0f}'

         },

       },
       legend: {
         labelFormatter: function() {

           return 'Disaster deaths per million of population, average 2005–2015';
         }
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
      text: 'Disasters Lower Credit Ratings, Raising Borrowing Costs'
    },
    subtitle: {
      text: 'Notes: Data from Standard & Poor’s, 2015. Downgrade is the expected effect of rare and expensive “1 in 250” losses, based on geophysical models for a subset of countries. CGD analysis.'
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
     colors: ["#438390", "#564e34", "#1fa9b8", "#898167", "#5ED6E4", "#C2B793", "#9CA9D3", "#9FBFF7"],
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
       }, {
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
           return '<b>' + this.series.name + '</b><br />' + this.key + ': $' + Highcharts.numberFormat(this.y, 0, '.', ',') + ' billion<br />Share: ' + Highcharts.numberFormat(this.point.percentage, 0, '.', ',') + '%';
         }

       }
     },
     title: {
       text: 'Damage Mainly in Rich Countries, Deaths Mainly in Poor Ones (1980–2015)'
     },
     subtitle: {
       text: '“Human capital loss” is estimated as number of deaths from EM-DAT (Guha-Sapir et al., 2015), times the difference between life expectancy and median age in country, times real annual income per capita. Sum of damage is in real US dollars and deaths, 1980–2015. Median age is a median-variant projection from United Nations Department of Economic and Social Affairs (2013); income per capita and life expectancy are from World Bank Group (2015). CGD analysis.'
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
            text: 'Disasters Displace Millions of People a Year'
        },
        subtitle:{
          text: 'Notes: Data from Internal Displacement Monitoring Centre (IDMC, 2016). CGD analysis'
            
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
            text: 'More Natural Disasters, Mostly in Poorer Countries'
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
      text: 'Aid Reporting Omits Relevant Flows: Haiti, Post-Earthquake'

    },
    subtitle: {
      text: 'Notes: Data from the Creditor Reporting System (CRS), Organisation for Economic Co-operation and Development (OECD) (2016). CGD analysis. '

    },

    yAxis: {
      title:{
        text:   'billions USD(2010)'
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
            text: 'At Least $1.6 Billion a Year: Average Disaster Aid from Appeals'
        },
        subtitle:{
          text: 'Notes: Data from the UN OCHA Financial Tracking Service, United Nations Office for the Coordination of Humanitarian Assistance (OCHA) (2015). CGD analysis. '
            
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
          text: 'Notes: Data on severity of disaster definition from EM-DAT (Guha-Sapir et al., 2015). Data on aid flows disaggregated by purpose from the CRS, Organisation for Economic Co-operation and Development (OECD) (2016). Includes all aid to recipients that recorded any natural disaster, a disaster in the top 10 percent of disasters globally in terms of financial or human losses, or a disaster in the top 10 percent of disasters in the country’s history. CGD analysis.'
            
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
      text: 'Funding Follows Caseload: Ebola in West Africa, 2014'
    },
    subtitle: {
      text: 'Notes:  Data from the UN OCHA Financial Tracking Service (FTS), United Nations Office for the Coordination of Humanitarian Assistance (2015), and Centers for Disease Control (2014). CGD analysis.  '

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


/*



$(function() {

      $('#chart-9b').highcharts({
          chart: {
            type: 'line',

          },
title: {
text:'Funding Follows Deaths: Somalia, 2010–12'
},
subtitle: {
text: 'Notes: Data from Development Initiatives’ 2013 Global Humanitarian Assistance report, based on data from the UN OCHA Financial Tracking Service (FTS), United Nations Office for the Coordination of Humanitarian Assistance (2015), and data analysis by Checchi and Robinson (2013), using original survey data from the Food Security and Nutrition Analysis Unit—Somalia (FSNAU). CGD analysis.'
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

*/


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
      text: 'Funding Follows Deaths: Somalia, 2010–12'
    },
    subtitle: {
      text: 'Notes: Data from Development Initiatives’ 2013 Global Humanitarian Assistance report, based on data from the UN OCHA Financial Tracking Service (FTS), United Nations Office for the Coordination of Humanitarian Assistance (2015), and data analysis by Checchi and Robinson (2013), using original survey data from the Food Security and Nutrition Analysis Unit—Somalia (FSNAU). CGD analysis.'

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
      text: 'Notes: Data from the UN OCHA Financial Tracking Service (FTS), United Nations Office for the Coordination of Humanitarian Assistance (2015). CGD analysis. Concentration measured as Herfindahl-Hirschman Index.'
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
      text: 'Risk Reduction Is Underfunded'

    },
    subtitle: {
      text: 'Notes: Data on total disaster-related aid from Organisation for Economic Co-operation and Development (OECD) (2016). Subset of all aid flows using coalesced purpose codes 70000, 74010, 72000–72050, 73010, corresponding to humanitarian, emergency, reconstruction and prevention/preparedness only. CGD analysis.'

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
      text: 'Notes: Data from the UN OCHA Financial Tracking Service (FTS), United Nations Office for the Coordination of Humanitarian Assistance (OCHA), 2015. CGD analysis. '

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
          text: 'Payouts Are Larger than Ex-Post Aid'

        },
        subtitle: {
          text: 'Notes: Data on disaster-related aid from Organisation for Economic Co-operation and Development (OECD) (2016). Data on insurance payouts from Munich Re (2015). CGD analysis.'

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












