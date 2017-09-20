(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function () {
    "use strict";

    var carbonLineCharts = [];
    var priceSelector = d3.select('#price-selector').on('change', updateGate).node();
    var rateSelector = d3.select('#rate-selector').on('change', updateGate).node();

    var globalPrice, globalRate;

    function clearTooltips() {
        carbonLineCharts.forEach(function (each) {

            each.trendPoints.dispatch('mouseout');
            each.baselinePoints.dispatch('mouseout');
        });
    }

    function updateTotals(price, rate) {
        globalPrice = price;
        globalRate = rate;

        /* EMISSIONS */
        var emissionsData = carbonLineCharts[0].data[price][rate][0].trend,
            emissionsBaseline = carbonLineCharts[0].data[0][0][0].trend,
            totalEmissionsSavings = emissionsData.reduce(function (acc, cur, i) {
            return acc + (+emissionsBaseline[i].value - +cur.value);
        }, 0);

        /* REVENUE ( emissions * price ) */
        var revenueData = carbonLineCharts[1].data[price][rate][0].trend,
            totalRevenue = revenueData.reduce(function (acc, cur, i) {

            if (i === 0 || i === 1) {
                // do not include [0]2018 or [1]2019. only want 10-year accumulation 2020–2030.
                return acc;
            } else {
                return acc + +cur.value;
            }
        }, 0);

        d3.select('#summary-stats .bind-text').classed('attention', false).text(', $' + price + ' per ton at ' + rate * 100 + '% growth rate');

        d3.select('#summary-emissions .bind-total').style('opacity', 0).text(d3.format(",.3r")(totalEmissionsSavings) + ' billion metric tons').transition().duration(500).style('opacity', 1);
        d3.select('#summary-revenue .bind-total').style('opacity', 0).text('$' + d3.format(",.4r")(totalRevenue) + ' billion').transition().duration(500).style('opacity', 1);
        d3.select('#summary-stats').classed('not-calculated', false);
    }

    function updateGate() {
        if (priceSelector.options[priceSelector.selectedIndex].value) {
            d3.select('#price-label').classed('attention', false);
        }
        if (rateSelector.options[rateSelector.selectedIndex].value) {
            d3.select('#rate-label').classed('attention', false);
        }
        if (priceSelector.options[priceSelector.selectedIndex].value && rateSelector.options[rateSelector.selectedIndex].value) {
            carbonLineCharts.forEach(function (each) {
                each.updateChart(priceSelector.options[priceSelector.selectedIndex].value, rateSelector.options[rateSelector.selectedIndex].value);
            });
            updateTotals(priceSelector.options[priceSelector.selectedIndex].value, rateSelector.options[rateSelector.selectedIndex].value);
        }
    }

    var CarbonLineChart = function CarbonLineChart(configObject) {
        // marginsrgin {}, height #, width #, containerID, dataPath
        this.setup(configObject);
    };

    CarbonLineChart.prototype = {
        setup: function setup(configObject) {
            var _this2 = this;

            var viewBox = '0 0 100 ' + Math.round(configObject.heightToWidth * 100);
            this.margin = configObject.margin;
            this.width = 100 - this.margin.left - this.margin.right;
            this.height = configObject.heightToWidth * 100 - this.margin.top - this.margin.bottom;
            this.labelOffset = configObject.trendLabelPosition === 'below' ? 4 : -3;
            this.yAxisCount = configObject.yAxisCount;
            this.hasBeenUpdated = false;

            this.svg = d3.select(configObject.container).append('svg').attr('width', '100%').attr('xmlns', 'http://www.w3.org/2000/svg').attr('version', '1.1').attr('viewBox', viewBox).append('g').attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

            this.parseTime = d3.timeParse('%Y');

            // set the ranges
            this.x = d3.scaleTime().range([0, this.width]);
            this.y = d3.scaleLinear().range([this.height, 0]);

            // define the line
            this.valueline = d3.line().x(function (d) {
                return _this2.x(d.date);
            }).y(function (d) {
                return _this2.y(d.value);
            });

            this.getData(configObject);
        },
        getData: function getData(configObject) {
            var _this3 = this;

            // TO DO : get the data first since it informs set up
            this.range = [];
            d3.csv(configObject.dataPath, function (d) {
                var values = [];
                for (var i = 2018; i < 2031; i++) {
                    _this3.range.push(+d[i.toString()]);
                    values.push({ date: _this3.parseTime(i), value: +d[i.toString()], price: d.price, growth_rate: d.growth_rate, units: d.units });
                }
                if (configObject.yMax) {
                    _this3.range.push(configObject.yMax);
                }
                return {
                    growth_rate: +d.growth_rate,
                    initial_price: +d.price,
                    units: d.units,
                    trend: values
                };
            }, function (error, data) {
                if (error) {
                    throw error;
                }

                _this3.baselineData = data.slice(0, 1);
                _this3.data = d3.nest().key(function (d) {
                    return d.initial_price;
                }).key(function (d) {
                    return d.growth_rate;
                }).object(data);

                _this3.x.domain([_this3.parseTime(2018), _this3.parseTime(2030)]); // these can be part of setup if data is fetched first
                _this3.y.domain([d3.min(_this3.range), d3.max(_this3.range)]);

                _this3.setupTooltips(configObject);
                _this3.renderTrendline(); // trendline is rendered and then hidden by baseline
                _this3.renderTrendPoints();
                _this3.renderTrendlineLabel();
                _this3.renderBaseline(); // set up first rather than render here
                _this3.renderBaselinePoints();
                _this3.renderBaselineLabel();
                _this3.renderAxes();
            });
        },
        setupTooltips: function setupTooltips(configObject) {
            this.tooltip = d3.tip().attr("class", "d3-tip trendline").direction('n').offset([-8, 0]).html(function (d) {
                return configObject.trendlineTooltip(d);
            });

            this.baselineTooltip = d3.tip().attr("class", "d3-tip").direction('n').offset([-8, 0]).html(function (d) {
                return configObject.baselineTooltip(d);
            });
        },
        renderTrendline: function renderTrendline() {
            var _this4 = this;

            this.trendline = this.svg.append('path').attr('class', 'line').attr('d', function () {
                return _this4.valueline(_this4.baselineData[0].trend);
            });
        },
        renderTrendPoints: function renderTrendPoints() {
            var _this5 = this;

            var _this = this;
            this.trendPoints = this.svg.selectAll('trend-point').data(function () {
                return _this5.baselineData[0].trend;
            }).enter().append('circle').attr('class', 'data-point').attr('r', '1').attr('cx', function (d) {
                return _this5.x(d.date);
            }).attr('cy', function (d) {
                return _this5.y(d.value);
            }).on('mouseover', function (e) {
                clearTooltips();
                _this.tooltip.show(e);
            }).on('mouseout', this.tooltip.hide).call(this.tooltip);
        },
        renderTrendlineLabel: function renderTrendlineLabel() {
            var _this6 = this;

            this.trendlineLabel = this.svg.append('g').attr('class', 'line-label trendline-label no-display').attr('transform', function () {

                return 'translate(' + _this6.x(_this6.baselineData[0].trend[7].date) + ',' + (_this6.y(_this6.baselineData[0].trend[7].value) + _this6.labelOffset) + ')';
            });

            this.trendlineLabel.append('text').attr('text-anchor', 'end').text('With carbon tax');
        },
        renderBaseline: function renderBaseline() {
            var _this7 = this;

            this.baselineGroup = this.svg.selectAll('base-line-group').data(this.baselineData).enter().append('g').attr('class', 'base-line-group');

            this.baseline = this.baselineGroup.selectAll('baseline').data(this.baselineData).enter().append('path').attr('class', 'line baseline').attr('d', function (d) {
                return _this7.valueline(d.trend);
            });
        },
        renderBaselinePoints: function renderBaselinePoints() {
            var _this8 = this;

            var _this = this;
            this.baselinePoints = this.baselineGroup.selectAll('baseline-point').data(function (d) {
                return d.trend;
            }).enter().append('circle').attr('class', 'data-point baseline-point').attr('r', 1).attr('cx', function (d) {
                return _this8.x(d.date);
            }).attr('cy', function (d) {
                return _this8.y(d.value);
            }).on('mouseover', function (e) {
                clearTooltips();
                _this.baselineTooltip.show(e);
            }).on('mouseout', this.baselineTooltip.hide).call(this.baselineTooltip);
        },
        renderBaselineLabel: function renderBaselineLabel() {
            var _this9 = this;

            this.baselineLabel = this.baselineGroup.selectAll('baseline-label').data(function (d) {

                return [d.trend[12]];
            }).enter().append('g').attr('transform', function (d) {

                return 'translate(' + _this9.x(d.date) + ',' + (_this9.y(d.value) - 1.5) + ')';
            }).attr('class', 'line-label').attr('text-anchor', 'end').append('text').text('Without carbon tax');
        },
        renderAxes: function renderAxes() {
            var _this10 = this;

            this.xAxis = this.svg.append('g').attr('transform', 'translate(0,' + (this.height + 2) + ')').attr('class', 'axis x-axis').call(d3.axisBottom(this.x).tickSizeInner(1).tickSizeOuter(1).tickPadding(1).ticks(d3.timeYear.every(2)));

            this.yAxis = this.svg.append('g').attr('class', 'axis y-axis');

            this.yAxis.append('text').attr('class', 'axis-label').attr('text-anchor', 'start').attr('transform', 'translate(-' + (this.margin.left - 2) + ', -3)').text(function () {

                return _this10.data[0][0][0].units;
            }); // TO DO: needs to be set programmatically.

            this.yAxis.call(d3.axisLeft(this.y).tickSizeInner(1).tickSizeOuter(1).tickPadding(1).ticks(this.yAxisCount));
        },
        updateChart: function updateChart(userPrice, userRate) {
            this.updateTrendPoints(userPrice, userRate);
            this.updateTrendline(userPrice, userRate);
            this.updateTrendlineLabel(userPrice, userRate);
        },
        updateTrendline: function updateTrendline(userPrice, userRate) {
            var _this11 = this;

            this.trendPoints.dispatch('mouseout');
            this.trendline.data(function () {
                return _this11.data[userPrice][userRate];
            }).classed('trendline', true).transition().duration(500).attr('d', function (d) {
                return _this11.valueline(d.trend);
            });
        },
        updateTrendPoints: function updateTrendPoints(userPrice, userRate) {
            var _this12 = this;

            this.trendPoints.data(function () {
                return _this12.data[userPrice][userRate][0].trend;
            }).transition().duration(500).attr('r', ' 1.25').attr('cx', function (d) {
                return _this12.x(d.date);
            }).attr('cy', function (d) {
                return _this12.y(d.value);
            }).on('end', function (cur, i, array) {

                if (i === array.length - 1) {
                    d3.select(_this12.trendPoints.nodes()[4]).dispatch('mouseover');
                    _this12.hasBeenUpdated = true;
                }
            });
        },
        updateTrendlineLabel: function updateTrendlineLabel(userPrice, userRate) {
            var _this13 = this;

            this.trendlineLabel.data(function () {
                return [_this13.data[userPrice][userRate][0].trend[5]];
            }).classed('no-display', false).transition().duration(500).attr('transform', function (d) {
                return 'translate(' + _this13.x(d.date) + ',' + (_this13.y(d.value) + _this13.labelOffset) + ')';
            });
        }
    };

    carbonLineCharts.push(new CarbonLineChart({
        margin: { // percentages
            top: 6,
            right: 5,
            bottom: 10,
            left: 11
        },
        heightToWidth: 0.66,
        dataPath: 'data/emissions.csv',
        container: '#container',
        trendLabelPosition: 'below',
        baselineTooltip: function baselineTooltip(d) {

            return '<b>WITHOUT CARBON TAX</b><br /><b>Year:</b> ' + d.date.getFullYear() + '<br /><br /><b>Emissions:</b> ' + d.value + ' ' + d.units + '<br />(' + Math.round(d.value / 6 * 100) + '% of 2005 levels)';
        },
        trendlineTooltip: function trendlineTooltip(d) {
            return '<b>WITH CARBON TAX</b><br />($' + d.price + '</b> at ' + d.growth_rate * 100 + '% growth rate)<br /><b>Year:</b> ' + d.date.getFullYear() + '<br /><b>Price:</b> $' + d3.format(",.2f")(globalPrice * Math.pow(1 + +globalRate, +d.date.getFullYear() - 2018)) + ' per ton<br /><br /><b>Emissions:</b> ' + d.value + ' ' + d.units + '<br />(' + Math.round(d.value / 6 * 100) + '% of 2005 levels)';
        },

        yAxisCount: null,
        yMax: null

    }));

    carbonLineCharts.push(new CarbonLineChart({
        margin: { //percentages
            top: 6,
            right: 5,
            bottom: 10,
            left: 11
        },
        heightToWidth: 0.66,
        dataPath: 'data/revenue.csv',
        container: '#container-2',
        trendLabelPosition: 'above',
        baselineTooltip: function baselineTooltip(d) {
            //  return '<b>WITHOUT carbon tax<br /></b>' + d.date.getFullYear() + '<br />$' + d.value; 
            return '<b>WITHOUT CARBON TAX</b><br /><b>Year:</b> ' + d.date.getFullYear() + '<br /><br /><b>Revenue:</b> $0';
        },
        trendlineTooltip: function trendlineTooltip(d) {
            return '<b>WITH CARBON TAX</b><br />($' + d.price + '</b> at ' + d.growth_rate * 100 + '% growth rate)<br /><b>Year:</b> ' + d.date.getFullYear() + '<br /><b>Price:</b> $' + d3.format(",.2f")(globalPrice * Math.pow(1 + +globalRate, +d.date.getFullYear() - 2018)) + ' per ton<br /><br /><b>Revenue:</b> $' + d3.format(".3n")(d.value) + ' billion';
        },

        yAxisCount: 6,
        yMax: 300

    }));
})(); // end IIFE

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYtanMvc2NyaXB0cy5lczYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FDLGFBQVU7QUFDWDs7QUFFQSxRQUFJLG1CQUFtQixFQUF2QjtBQUNBLFFBQU0sZ0JBQWdCLEdBQUcsTUFBSCxDQUFVLGlCQUFWLEVBQ2pCLEVBRGlCLENBQ2QsUUFEYyxFQUNKLFVBREksRUFFakIsSUFGaUIsRUFBdEI7QUFHQSxRQUFNLGVBQWUsR0FBRyxNQUFILENBQVUsZ0JBQVYsRUFDaEIsRUFEZ0IsQ0FDYixRQURhLEVBQ0gsVUFERyxFQUVoQixJQUZnQixFQUFyQjs7QUFJQSxRQUFJLFdBQUosRUFDSSxVQURKOztBQUdBLGFBQVMsYUFBVCxHQUF3QjtBQUNwQix5QkFBaUIsT0FBakIsQ0FBeUIsVUFBUyxJQUFULEVBQWM7O0FBRW5DLGlCQUFLLFdBQUwsQ0FBaUIsUUFBakIsQ0FBMEIsVUFBMUI7QUFDQSxpQkFBSyxjQUFMLENBQW9CLFFBQXBCLENBQTZCLFVBQTdCO0FBQ0gsU0FKRDtBQUtIOztBQUVELGFBQVMsWUFBVCxDQUFzQixLQUF0QixFQUE2QixJQUE3QixFQUFrQztBQUM5QixzQkFBYyxLQUFkO0FBQ0EscUJBQWEsSUFBYjs7QUFFQTtBQUNBLFlBQUksZ0JBQWdCLGlCQUFpQixDQUFqQixFQUFvQixJQUFwQixDQUF5QixLQUF6QixFQUFnQyxJQUFoQyxFQUFzQyxDQUF0QyxFQUF5QyxLQUE3RDtBQUFBLFlBQ0ksb0JBQW9CLGlCQUFpQixDQUFqQixFQUFvQixJQUFwQixDQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxLQUQxRDtBQUFBLFlBRUksd0JBQXdCLGNBQWMsTUFBZCxDQUFxQixVQUFTLEdBQVQsRUFBYSxHQUFiLEVBQWtCLENBQWxCLEVBQW9CO0FBQzdELG1CQUFPLE9BQVUsQ0FBQyxrQkFBa0IsQ0FBbEIsRUFBcUIsS0FBeEIsR0FB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RUFBZ0MsQ0FBQyxFQUFFLElBQUYsQ0FBTyxXQUFQLEVBQUgsR0FBNEIsSUFBMUQsQ0FBakMsQ0FBdkssR0FBNFEsdUNBQTVRLEdBQXNULEdBQUcsTUFBSCxDQUFVLEtBQVYsRUFBaUIsRUFBRSxLQUFuQixDQUF0VCxHQUFrVixVQUF6VjtBQUNILFNBakJMOztBQWtCSSxvQkFBWSxDQWxCaEI7QUFtQkksY0FBTTs7QUFuQlYsS0FESixDQURKO0FBMkJDLENBOVpBLEdBQUQsQyxDQThaTSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24oKXtcblwidXNlIHN0cmljdFwiO1xuXG52YXIgY2FyYm9uTGluZUNoYXJ0cyA9IFtdO1xuY29uc3QgcHJpY2VTZWxlY3RvciA9IGQzLnNlbGVjdCgnI3ByaWNlLXNlbGVjdG9yJylcbiAgICAub24oJ2NoYW5nZScsIHVwZGF0ZUdhdGUpXG4gICAgLm5vZGUoKTtcbmNvbnN0IHJhdGVTZWxlY3RvciA9IGQzLnNlbGVjdCgnI3JhdGUtc2VsZWN0b3InKVxuICAgIC5vbignY2hhbmdlJywgdXBkYXRlR2F0ZSlcbiAgICAubm9kZSgpOyBcblxudmFyIGdsb2JhbFByaWNlLFxuICAgIGdsb2JhbFJhdGU7XG5cbmZ1bmN0aW9uIGNsZWFyVG9vbHRpcHMoKXtcbiAgICBjYXJib25MaW5lQ2hhcnRzLmZvckVhY2goZnVuY3Rpb24oZWFjaCl7XG5cbiAgICAgICAgZWFjaC50cmVuZFBvaW50cy5kaXNwYXRjaCgnbW91c2VvdXQnKTtcbiAgICAgICAgZWFjaC5iYXNlbGluZVBvaW50cy5kaXNwYXRjaCgnbW91c2VvdXQnKTtcbiAgICB9KTtcbn1cbiBcbmZ1bmN0aW9uIHVwZGF0ZVRvdGFscyhwcmljZSwgcmF0ZSl7XG4gICAgZ2xvYmFsUHJpY2UgPSBwcmljZTtcbiAgICBnbG9iYWxSYXRlID0gcmF0ZTtcblxuICAgIC8qIEVNSVNTSU9OUyAqLyBcbiAgICBsZXQgZW1pc3Npb25zRGF0YSA9IGNhcmJvbkxpbmVDaGFydHNbMF0uZGF0YVtwcmljZV1bcmF0ZV1bMF0udHJlbmQsXG4gICAgICAgIGVtaXNzaW9uc0Jhc2VsaW5lID0gY2FyYm9uTGluZUNoYXJ0c1swXS5kYXRhWzBdWzBdWzBdLnRyZW5kLFxuICAgICAgICB0b3RhbEVtaXNzaW9uc1NhdmluZ3MgPSBlbWlzc2lvbnNEYXRhLnJlZHVjZShmdW5jdGlvbihhY2MsY3VyLCBpKXtcbiAgICAgICAgICAgIHJldHVybiBhY2MgKyAoICggK2VtaXNzaW9uc0Jhc2VsaW5lW2ldLnZhbHVlICkgLSAoICtjdXIudmFsdWUgKSApO1xuICAgICAgICB9LDApO1xuXG4gICAgLyogUkVWRU5VRSAoIGVtaXNzaW9ucyAqIHByaWNlICkgKi9cbiAgICBsZXQgcmV2ZW51ZURhdGEgPSBjYXJib25MaW5lQ2hhcnRzWzFdLmRhdGFbcHJpY2VdW3JhdGVdWzBdLnRyZW5kLFxuICAgICAgICB0b3RhbFJldmVudWUgPSByZXZlbnVlRGF0YS5yZWR1Y2UoZnVuY3Rpb24oYWNjLCBjdXIsIGkpe1xuICAgICAgICAgICAgXG4gICAgICAgICAgIGlmICggaSA9PT0gMCB8fCBpID09PSAxKSB7IC8vIGRvIG5vdCBpbmNsdWRlIFswXTIwMTggb3IgWzFdMjAxOS4gb25seSB3YW50IDEwLXllYXIgYWNjdW11bGF0aW9uIDIwMjDigJMyMDMwLlxuICAgICAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICByZXR1cm4gYWNjICsgKCArY3VyLnZhbHVlICk7XG4gICAgICAgICAgIH1cbiAgICAgICAgfSwwKTtcblxuICAgIGQzLnNlbGVjdCgnI3N1bW1hcnktc3RhdHMgLmJpbmQtdGV4dCcpXG4gICAgICAgIC5jbGFzc2VkKCdhdHRlbnRpb24nLCBmYWxzZSlcbiAgICAgICAgLnRleHQoJywgJCcgKyBwcmljZSArICcgcGVyIHRvbiBhdCAnICsgcmF0ZSAqIDEwMCArICclIGdyb3d0aCByYXRlJyk7XG5cbiAgICBkMy5zZWxlY3QoJyNzdW1tYXJ5LWVtaXNzaW9ucyAuYmluZC10b3RhbCcpXG4gICAgICAgIC5zdHlsZSgnb3BhY2l0eScsMClcbiAgICAgICAgLnRleHQoZDMuZm9ybWF0KFwiLC4zclwiKSh0b3RhbEVtaXNzaW9uc1NhdmluZ3MpICsgJyBiaWxsaW9uIG1ldHJpYyB0b25zJylcbiAgICAgICAgLnRyYW5zaXRpb24oKS5kdXJhdGlvbig1MDApXG4gICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDEpO1xuICAgIGQzLnNlbGVjdCgnI3N1bW1hcnktcmV2ZW51ZSAuYmluZC10b3RhbCcpXG4gICAgICAgIC5zdHlsZSgnb3BhY2l0eScsMClcbiAgICAgICAgLnRleHQoJyQnICsgZDMuZm9ybWF0KFwiLC40clwiKSh0b3RhbFJldmVudWUpICsgJyBiaWxsaW9uJylcbiAgICAgICAgLnRyYW5zaXRpb24oKS5kdXJhdGlvbig1MDApXG4gICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDEpO1xuICAgIGQzLnNlbGVjdCgnI3N1bW1hcnktc3RhdHMnKVxuICAgICAgICAuY2xhc3NlZCgnbm90LWNhbGN1bGF0ZWQnLCBmYWxzZSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUdhdGUoKXtcbiAgICBpZiAoIHByaWNlU2VsZWN0b3Iub3B0aW9uc1twcmljZVNlbGVjdG9yLnNlbGVjdGVkSW5kZXhdLnZhbHVlICl7XG4gICAgICAgIGQzLnNlbGVjdCgnI3ByaWNlLWxhYmVsJylcbiAgICAgICAgICAgIC5jbGFzc2VkKCdhdHRlbnRpb24nLCBmYWxzZSk7XG4gICAgfVxuICAgIGlmICggcmF0ZVNlbGVjdG9yLm9wdGlvbnNbcmF0ZVNlbGVjdG9yLnNlbGVjdGVkSW5kZXhdLnZhbHVlICl7XG4gICAgICAgIGQzLnNlbGVjdCgnI3JhdGUtbGFiZWwnKVxuICAgICAgICAgICAgLmNsYXNzZWQoJ2F0dGVudGlvbicsIGZhbHNlKTtcbiAgICB9XG4gICAgaWYgKCBwcmljZVNlbGVjdG9yLm9wdGlvbnNbcHJpY2VTZWxlY3Rvci5zZWxlY3RlZEluZGV4XS52YWx1ZSAmJiByYXRlU2VsZWN0b3Iub3B0aW9uc1tyYXRlU2VsZWN0b3Iuc2VsZWN0ZWRJbmRleF0udmFsdWUgKSB7XG4gICAgICAgIGNhcmJvbkxpbmVDaGFydHMuZm9yRWFjaChmdW5jdGlvbihlYWNoKXtcbiAgICAgICAgICAgIGVhY2gudXBkYXRlQ2hhcnQocHJpY2VTZWxlY3Rvci5vcHRpb25zW3ByaWNlU2VsZWN0b3Iuc2VsZWN0ZWRJbmRleF0udmFsdWUsIHJhdGVTZWxlY3Rvci5vcHRpb25zW3JhdGVTZWxlY3Rvci5zZWxlY3RlZEluZGV4XS52YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICB1cGRhdGVUb3RhbHMocHJpY2VTZWxlY3Rvci5vcHRpb25zW3ByaWNlU2VsZWN0b3Iuc2VsZWN0ZWRJbmRleF0udmFsdWUsIHJhdGVTZWxlY3Rvci5vcHRpb25zW3JhdGVTZWxlY3Rvci5zZWxlY3RlZEluZGV4XS52YWx1ZSk7XG4gICAgfVxufSAgXG5cbnZhciBDYXJib25MaW5lQ2hhcnQgPSBmdW5jdGlvbihjb25maWdPYmplY3QpeyAvLyBtYXJnaW5zcmdpbiB7fSwgaGVpZ2h0ICMsIHdpZHRoICMsIGNvbnRhaW5lcklELCBkYXRhUGF0aFxuICAgIHRoaXMuc2V0dXAoY29uZmlnT2JqZWN0KTtcbn07XG5cbkNhcmJvbkxpbmVDaGFydC5wcm90b3R5cGUgPSB7XG5cbiAgICBzZXR1cChjb25maWdPYmplY3Qpe1xuICAgICAgICB2YXIgdmlld0JveCA9ICcwIDAgMTAwICcgKyBNYXRoLnJvdW5kKGNvbmZpZ09iamVjdC5oZWlnaHRUb1dpZHRoICogMTAwKTtcbiAgICAgICAgdGhpcy5tYXJnaW4gPSBjb25maWdPYmplY3QubWFyZ2luO1xuICAgICAgICB0aGlzLndpZHRoID0gMTAwIC0gdGhpcy5tYXJnaW4ubGVmdCAtIHRoaXMubWFyZ2luLnJpZ2h0O1xuICAgICAgICB0aGlzLmhlaWdodCA9IGNvbmZpZ09iamVjdC5oZWlnaHRUb1dpZHRoICogMTAwIC0gdGhpcy5tYXJnaW4udG9wIC0gdGhpcy5tYXJnaW4uYm90dG9tO1xuICAgICAgICB0aGlzLmxhYmVsT2Zmc2V0ID0gY29uZmlnT2JqZWN0LnRyZW5kTGFiZWxQb3NpdGlvbiA9PT0gJ2JlbG93JyA/IDQgOiAtMztcbiAgICAgICAgdGhpcy55QXhpc0NvdW50ID0gY29uZmlnT2JqZWN0LnlBeGlzQ291bnQ7XG4gICAgICAgIHRoaXMuaGFzQmVlblVwZGF0ZWQgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLnN2ZyA9IGQzLnNlbGVjdChjb25maWdPYmplY3QuY29udGFpbmVyKVxuICAgICAgICAgICAgLmFwcGVuZCgnc3ZnJylcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsICcxMDAlJylcbiAgICAgICAgICAgIC5hdHRyKCd4bWxucycsJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJylcbiAgICAgICAgICAgIC5hdHRyKCd2ZXJzaW9uJywnMS4xJylcbiAgICAgICAgICAgIC5hdHRyKCd2aWV3Qm94Jywgdmlld0JveClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2cnKVxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIHRoaXMubWFyZ2luLmxlZnQgKyAnLCcgKyB0aGlzLm1hcmdpbi50b3AgKyAnKScpO1xuXG4gICAgICAgIHRoaXMucGFyc2VUaW1lID0gZDMudGltZVBhcnNlKCclWScpO1xuXG4gICAgICAgIC8vIHNldCB0aGUgcmFuZ2VzXG4gICAgICAgIHRoaXMueCA9IGQzLnNjYWxlVGltZSgpLnJhbmdlKFswLCB0aGlzLndpZHRoXSk7XG4gICAgICAgIHRoaXMueSA9IGQzLnNjYWxlTGluZWFyKCkucmFuZ2UoW3RoaXMuaGVpZ2h0LCAwXSk7XG5cbiAgICAgICAgLy8gZGVmaW5lIHRoZSBsaW5lXG4gICAgICAgIHRoaXMudmFsdWVsaW5lID0gIGQzLmxpbmUoKVxuICAgICAgICAgICAgLngoKGQpID0+IHsgcmV0dXJuIHRoaXMueChkLmRhdGUpOyB9KVxuICAgICAgICAgICAgLnkoKGQpID0+IHsgcmV0dXJuIHRoaXMueShkLnZhbHVlKTsgfSk7XG4gICAgICAgXG4gICAgICAgIHRoaXMuZ2V0RGF0YShjb25maWdPYmplY3QpOyBcblxuICAgIH0sXG5cbiAgICBnZXREYXRhKGNvbmZpZ09iamVjdCl7IC8vIFRPIERPIDogZ2V0IHRoZSBkYXRhIGZpcnN0IHNpbmNlIGl0IGluZm9ybXMgc2V0IHVwXG4gICAgICAgIHRoaXMucmFuZ2UgPSBbXTtcbiAgICAgICAgZDMuY3N2KGNvbmZpZ09iamVjdC5kYXRhUGF0aCwgKGQpID0+IHtcbiAgICAgICAgICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAoIHZhciBpID0gMjAxODsgaSA8IDIwMzE7IGkrKyApe1xuICAgICAgICAgICAgICAgIHRoaXMucmFuZ2UucHVzaCggK2RbaS50b1N0cmluZygpXSApO1xuICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKHtkYXRlOiB0aGlzLnBhcnNlVGltZShpKSwgdmFsdWU6ICtkW2kudG9TdHJpbmcoKV0sIHByaWNlOiBkLnByaWNlLCBncm93dGhfcmF0ZTogZC5ncm93dGhfcmF0ZSwgdW5pdHM6IGQudW5pdHN9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICggY29uZmlnT2JqZWN0LnlNYXggKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yYW5nZS5wdXNoKGNvbmZpZ09iamVjdC55TWF4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZ3Jvd3RoX3JhdGU6ICggK2QuZ3Jvd3RoX3JhdGUgKSxcbiAgICAgICAgICAgICAgICBpbml0aWFsX3ByaWNlOiAoICtkLnByaWNlICksXG4gICAgICAgICAgICAgICAgdW5pdHM6IGQudW5pdHMsXG4gICAgICAgICAgICAgICAgdHJlbmQ6IHZhbHVlc1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSwgKGVycm9yLCBkYXRhKSA9PiB7XG4gICAgICAgICAgICBpZiAoIGVycm9yICkge3Rocm93IGVycm9yO31cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5iYXNlbGluZURhdGEgPSBkYXRhLnNsaWNlKDAsMSk7XG4gICAgICAgICAgICB0aGlzLmRhdGEgPSBkMy5uZXN0KClcbiAgICAgICAgICAgICAgICAua2V5KGZ1bmN0aW9uKGQpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5pbml0aWFsX3ByaWNlO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmtleShmdW5jdGlvbihkKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQuZ3Jvd3RoX3JhdGU7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAub2JqZWN0KGRhdGEpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLnguZG9tYWluKFt0aGlzLnBhcnNlVGltZSgyMDE4KSx0aGlzLnBhcnNlVGltZSgyMDMwKV0pOyAvLyB0aGVzZSBjYW4gYmUgcGFydCBvZiBzZXR1cCBpZiBkYXRhIGlzIGZldGNoZWQgZmlyc3RcbiAgICAgICAgICAgIHRoaXMueS5kb21haW4oW2QzLm1pbih0aGlzLnJhbmdlKSwgZDMubWF4KHRoaXMucmFuZ2UpXSk7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0dXBUb29sdGlwcyhjb25maWdPYmplY3QpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJUcmVuZGxpbmUoKTsgLy8gdHJlbmRsaW5lIGlzIHJlbmRlcmVkIGFuZCB0aGVuIGhpZGRlbiBieSBiYXNlbGluZVxuICAgICAgICAgICAgdGhpcy5yZW5kZXJUcmVuZFBvaW50cygpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJUcmVuZGxpbmVMYWJlbCgpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJCYXNlbGluZSgpOyAvLyBzZXQgdXAgZmlyc3QgcmF0aGVyIHRoYW4gcmVuZGVyIGhlcmVcbiAgICAgICAgICAgIHRoaXMucmVuZGVyQmFzZWxpbmVQb2ludHMoKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyQmFzZWxpbmVMYWJlbCgpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJBeGVzKCk7XG5cbiAgICAgICAgfSk7XG4gICAgfSwgXG4gICAgc2V0dXBUb29sdGlwcyhjb25maWdPYmplY3Qpe1xuICAgICAgICAgdGhpcy50b29sdGlwID0gZDMudGlwKClcbiAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJkMy10aXAgdHJlbmRsaW5lXCIpXG4gICAgICAgICAgICAuZGlyZWN0aW9uKCduJylcbiAgICAgICAgICAgIC5vZmZzZXQoWy04LCAwXSlcbiAgICAgICAgICAgIC5odG1sKCAoZCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb25maWdPYmplY3QudHJlbmRsaW5lVG9vbHRpcChkKTsgXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmJhc2VsaW5lVG9vbHRpcCA9IGQzLnRpcCgpXG4gICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwiZDMtdGlwXCIpXG4gICAgICAgICAgICAuZGlyZWN0aW9uKCduJylcbiAgICAgICAgICAgIC5vZmZzZXQoWy04LCAwXSlcbiAgICAgICAgICAgIC5odG1sKCAoZCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb25maWdPYmplY3QuYmFzZWxpbmVUb29sdGlwKGQpOyBcbiAgICAgICAgICAgIH0pOyAgIFxuXG4gICAgfSxcbiAgICByZW5kZXJUcmVuZGxpbmUoKXtcbiAgICAgICAgXG4gICAgICAgIHRoaXMudHJlbmRsaW5lID0gdGhpcy5zdmcuYXBwZW5kKCdwYXRoJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaW5lJylcbiAgICAgICAgICAgIC5hdHRyKCdkJywgICgpID0+IHtcbiAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlbGluZSh0aGlzLmJhc2VsaW5lRGF0YVswXS50cmVuZCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9LFxuICAgIHJlbmRlclRyZW5kUG9pbnRzKCl7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMudHJlbmRQb2ludHMgPSB0aGlzLnN2Zy5zZWxlY3RBbGwoJ3RyZW5kLXBvaW50JylcbiAgICAgICAgICAgIC5kYXRhKCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYmFzZWxpbmVEYXRhWzBdLnRyZW5kO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5lbnRlcigpLmFwcGVuZCgnY2lyY2xlJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdkYXRhLXBvaW50JylcbiAgICAgICAgICAgIC5hdHRyKCdyJywgJzEnKVxuICAgICAgICAgICAgLmF0dHIoJ2N4JywgKGQpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy54KGQuZGF0ZSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmF0dHIoJ2N5JywgKGQpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy55KGQudmFsdWUpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignbW91c2VvdmVyJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGNsZWFyVG9vbHRpcHMoKTtcbiAgICAgICAgICAgICAgICBfdGhpcy50b29sdGlwLnNob3coZSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdtb3VzZW91dCcsIHRoaXMudG9vbHRpcC5oaWRlKSBcbiAgICAgICAgICAgIC5jYWxsKHRoaXMudG9vbHRpcCk7XG4gICAgfSxcbiAgICByZW5kZXJUcmVuZGxpbmVMYWJlbCgpe1xuICAgICAgICAgXG4gICAgICAgICB0aGlzLnRyZW5kbGluZUxhYmVsID0gdGhpcy5zdmcuYXBwZW5kKCdnJylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywnbGluZS1sYWJlbCB0cmVuZGxpbmUtbGFiZWwgbm8tZGlzcGxheScpICAgICAgICBcbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICAoKSA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiAndHJhbnNsYXRlKCcgKyB0aGlzLngodGhpcy5iYXNlbGluZURhdGFbMF0udHJlbmRbN10uZGF0ZSkgKyAnLCcgKyAoIHRoaXMueSh0aGlzLmJhc2VsaW5lRGF0YVswXS50cmVuZFs3XS52YWx1ZSkgKyB0aGlzLmxhYmVsT2Zmc2V0ICkgKyAnKSc7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudHJlbmRsaW5lTGFiZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ3RleHQnKVxuICAgICAgICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ2VuZCcpXG4gICAgICAgICAgICAudGV4dCgnV2l0aCBjYXJib24gdGF4Jyk7XG4gICAgfSxcbiAgICByZW5kZXJCYXNlbGluZSgpe1xuICAgICAgICBcbiAgICAgICAgdGhpcy5iYXNlbGluZUdyb3VwID0gdGhpcy5zdmcuc2VsZWN0QWxsKCdiYXNlLWxpbmUtZ3JvdXAnKVxuICAgICAgICAgICAgLmRhdGEodGhpcy5iYXNlbGluZURhdGEpXG4gICAgICAgICAgICAuZW50ZXIoKS5hcHBlbmQoJ2cnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywnYmFzZS1saW5lLWdyb3VwJyk7XG5cblxuICAgICAgICB0aGlzLmJhc2VsaW5lID0gdGhpcy5iYXNlbGluZUdyb3VwLnNlbGVjdEFsbCgnYmFzZWxpbmUnKVxuICAgICAgICAgICAgLmRhdGEodGhpcy5iYXNlbGluZURhdGEpXG4gICAgICAgICAgICAuZW50ZXIoKS5hcHBlbmQoJ3BhdGgnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpbmUgYmFzZWxpbmUnKVxuICAgICAgICAgICAgLmF0dHIoJ2QnLCAgKGQpID0+IHtcbiAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlbGluZShkLnRyZW5kKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgfSxcbiAgICByZW5kZXJCYXNlbGluZVBvaW50cygpe1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmJhc2VsaW5lUG9pbnRzICA9IHRoaXMuYmFzZWxpbmVHcm91cC5zZWxlY3RBbGwoJ2Jhc2VsaW5lLXBvaW50JylcbiAgICAgICAgICAgIC5kYXRhKCAoZCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLnRyZW5kO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5lbnRlcigpLmFwcGVuZCgnY2lyY2xlJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdkYXRhLXBvaW50IGJhc2VsaW5lLXBvaW50JylcbiAgICAgICAgICAgIC5hdHRyKCdyJywxKVxuICAgICAgICAgICAgLmF0dHIoJ2N4JywgIChkKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMueChkLmRhdGUpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hdHRyKCdjeScsICAoZCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnkoZC52YWx1ZSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdtb3VzZW92ZXInLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICBjbGVhclRvb2x0aXBzKCk7XG4gICAgICAgICAgICAgICAgX3RoaXMuYmFzZWxpbmVUb29sdGlwLnNob3coZSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdtb3VzZW91dCcsIHRoaXMuYmFzZWxpbmVUb29sdGlwLmhpZGUpIFxuICAgICAgICAgICAgLmNhbGwodGhpcy5iYXNlbGluZVRvb2x0aXApO1xuICAgIH0sXG4gICAgcmVuZGVyQmFzZWxpbmVMYWJlbCgpe1xuICAgICAgICBcbiAgICAgICAgdGhpcy5iYXNlbGluZUxhYmVsID0gdGhpcy5iYXNlbGluZUdyb3VwLnNlbGVjdEFsbCgnYmFzZWxpbmUtbGFiZWwnKVxuICAgICAgICAuZGF0YSggKGQpID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIFtkLnRyZW5kWzEyXV07XG4gICAgICAgIH0pXG4gICAgICAgIC5lbnRlcigpLmFwcGVuZCgnZycpXG4gICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAgKGQpID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuICd0cmFuc2xhdGUoJyArIHRoaXMueChkLmRhdGUpICsgJywnICsgKCB0aGlzLnkoZC52YWx1ZSkgLSAxLjUpICsgJyknO1xuICAgICAgICB9KVxuICAgICAgICAuYXR0cignY2xhc3MnLCdsaW5lLWxhYmVsJylcbiAgICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ2VuZCcpXG4gICAgICAgIC5hcHBlbmQoJ3RleHQnKVxuICAgICAgICAudGV4dCgnV2l0aG91dCBjYXJib24gdGF4Jyk7XG5cbiAgICB9LFxuICAgIHJlbmRlckF4ZXMoKXtcbiAgICAgICAgXG4gICAgICAgIHRoaXMueEF4aXMgPSB0aGlzLnN2Zy5hcHBlbmQoJ2cnKVxuICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKDAsJyArICggdGhpcy5oZWlnaHQgKyAyICkgKyAnKScpXG4gICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2F4aXMgeC1heGlzJylcbiAgICAgICAgICAuY2FsbChkMy5heGlzQm90dG9tKHRoaXMueCkudGlja1NpemVJbm5lcigxKS50aWNrU2l6ZU91dGVyKDEpLnRpY2tQYWRkaW5nKDEpLnRpY2tzKGQzLnRpbWVZZWFyLmV2ZXJ5KDIpKSk7XG5cbiAgICAgIFxuICAgICAgICB0aGlzLnlBeGlzID0gdGhpcy5zdmcuYXBwZW5kKCdnJylcbiAgICAgICAgICAuYXR0cignY2xhc3MnLCAnYXhpcyB5LWF4aXMnKTtcblxuICAgICAgICB0aGlzLnlBeGlzLmFwcGVuZCgndGV4dCcpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnYXhpcy1sYWJlbCcpXG4gICAgICAgICAgICAuYXR0cigndGV4dC1hbmNob3InLCdzdGFydCcpXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgtJyArICggdGhpcy5tYXJnaW4ubGVmdCAtIDIgKSsgJywgLTMpJylcbiAgICAgICAgICAgIC50ZXh0KCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVswXVswXVswXS51bml0cztcbiAgICAgICAgICAgIH0pOyAvLyBUTyBETzogbmVlZHMgdG8gYmUgc2V0IHByb2dyYW1tYXRpY2FsbHkuXG5cbiAgICAgICAgdGhpcy55QXhpcy5jYWxsKGQzLmF4aXNMZWZ0KHRoaXMueSkudGlja1NpemVJbm5lcigxKS50aWNrU2l6ZU91dGVyKDEpLnRpY2tQYWRkaW5nKDEpLnRpY2tzKHRoaXMueUF4aXNDb3VudCkpO1xuICAgIH0sXG4gICAgdXBkYXRlQ2hhcnQodXNlclByaWNlLHVzZXJSYXRlKXtcbiAgICAgICAgdGhpcy51cGRhdGVUcmVuZFBvaW50cyh1c2VyUHJpY2UsdXNlclJhdGUpO1xuICAgICAgICB0aGlzLnVwZGF0ZVRyZW5kbGluZSh1c2VyUHJpY2UsdXNlclJhdGUpO1xuICAgICAgICB0aGlzLnVwZGF0ZVRyZW5kbGluZUxhYmVsKHVzZXJQcmljZSx1c2VyUmF0ZSk7XG4gICAgfSxcbiAgICB1cGRhdGVUcmVuZGxpbmUodXNlclByaWNlLHVzZXJSYXRlKXtcbiAgICAgICAgXG4gICAgICAgIHRoaXMudHJlbmRQb2ludHMuZGlzcGF0Y2goJ21vdXNlb3V0Jyk7XG4gICAgICAgIHRoaXMudHJlbmRsaW5lLmRhdGEoICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFbdXNlclByaWNlXVt1c2VyUmF0ZV07XG4gICAgICAgIH0pXG4gICAgICAgIC5jbGFzc2VkKCd0cmVuZGxpbmUnLCB0cnVlKVxuICAgICAgICAudHJhbnNpdGlvbigpLmR1cmF0aW9uKDUwMClcbiAgICAgICAgLmF0dHIoJ2QnLCAgKGQpID0+IHtcbiAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVsaW5lKGQudHJlbmQpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgfSxcbiAgICB1cGRhdGVUcmVuZFBvaW50cyh1c2VyUHJpY2UsIHVzZXJSYXRlKXtcbiAgICAgICAgXG4gICAgICAgIHRoaXMudHJlbmRQb2ludHMuZGF0YSggKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVt1c2VyUHJpY2VdW3VzZXJSYXRlXVswXS50cmVuZDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpLmR1cmF0aW9uKDUwMClcbiAgICAgICAgICAgIC5hdHRyKCdyJywnIDEuMjUnKVxuICAgICAgICAgICAgLmF0dHIoJ2N4JywgKGQpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy54KGQuZGF0ZSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmF0dHIoJ2N5JywgKGQpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy55KGQudmFsdWUpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignZW5kJywgKGN1ciwgaSwgYXJyYXkpID0+IHtcbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICggaSA9PT0gYXJyYXkubGVuZ3RoIC0gMSApe1xuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QoIHRoaXMudHJlbmRQb2ludHMubm9kZXMoKVs0XSApLmRpc3BhdGNoKCdtb3VzZW92ZXInKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuVXBkYXRlZCA9IHRydWU7ICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH0sXG4gICAgdXBkYXRlVHJlbmRsaW5lTGFiZWwodXNlclByaWNlLHVzZXJSYXRlKXtcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICB0aGlzLnRyZW5kbGluZUxhYmVsLmRhdGEoICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW3RoaXMuZGF0YVt1c2VyUHJpY2VdW3VzZXJSYXRlXVswXS50cmVuZFs1XV07XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNsYXNzZWQoJ25vLWRpc3BsYXknLCBmYWxzZSlcbiAgICAgICAgICAgIC50cmFuc2l0aW9uKCkuZHVyYXRpb24oNTAwKVxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICAoZCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiAndHJhbnNsYXRlKCcgKyB0aGlzLngoZC5kYXRlKSArICcsJyArICggdGhpcy55KGQudmFsdWUpICsgdGhpcy5sYWJlbE9mZnNldCApICsgJyknO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG5cbn07XG5cbmNhcmJvbkxpbmVDaGFydHMucHVzaCggXG4gICAgbmV3IENhcmJvbkxpbmVDaGFydChcbiAgICAgICAge1xuICAgICAgICAgICAgbWFyZ2luOiB7IC8vIHBlcmNlbnRhZ2VzXG4gICAgICAgICAgICAgICAgdG9wOiA2LFxuICAgICAgICAgICAgICAgIHJpZ2h0OiA1LFxuICAgICAgICAgICAgICAgIGJvdHRvbTogMTAsXG4gICAgICAgICAgICAgICAgbGVmdDogMTFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoZWlnaHRUb1dpZHRoOiAwLjY2LFxuICAgICAgICAgICAgZGF0YVBhdGg6J2RhdGEvZW1pc3Npb25zLmNzdicsXG4gICAgICAgICAgICBjb250YWluZXI6JyNjb250YWluZXInLFxuICAgICAgICAgICAgdHJlbmRMYWJlbFBvc2l0aW9uOiAnYmVsb3cnLCBcbiAgICAgICAgICAgIGJhc2VsaW5lVG9vbHRpcChkKXtcbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiAnPGI+V0lUSE9VVCBDQVJCT04gVEFYPC9iPjxiciAvPjxiPlllYXI6PC9iPiAnICsgZC5kYXRlLmdldEZ1bGxZZWFyKCkgKyAnPGJyIC8+PGJyIC8+PGI+RW1pc3Npb25zOjwvYj4gJyArIGQudmFsdWUgKyAnICcgKyBkLnVuaXRzICsgJzxiciAvPignICsgIE1hdGgucm91bmQoKCBkLnZhbHVlIC8gNiApICogMTAwICkgKyclIG9mIDIwMDUgbGV2ZWxzKSc7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHJlbmRsaW5lVG9vbHRpcChkKXtcbiAgICAgICAgICAgICAgICAgcmV0dXJuICc8Yj5XSVRIIENBUkJPTiBUQVg8L2I+PGJyIC8+KCQnICsgZC5wcmljZSArICc8L2I+IGF0ICcgKyBkLmdyb3d0aF9yYXRlICogMTAwICsgJyUgZ3Jvd3RoIHJhdGUpPGJyIC8+PGI+WWVhcjo8L2I+ICcgKyBkLmRhdGUuZ2V0RnVsbFllYXIoKSArICc8YnIgLz48Yj5QcmljZTo8L2I+ICQnICsgZDMuZm9ybWF0KFwiLC4yZlwiKSggZ2xvYmFsUHJpY2UgKiBNYXRoLnBvdygxICsgKCArZ2xvYmFsUmF0ZSApLCAoICtkLmRhdGUuZ2V0RnVsbFllYXIoKSApIC0gMjAxOCkgKSArICcgcGVyIHRvbjxiciAvPjxiciAvPjxiPkVtaXNzaW9uczo8L2I+ICcgKyBkLnZhbHVlICsgJyAnICsgZC51bml0cyArICc8YnIgLz4oJyArICBNYXRoLnJvdW5kKCggZC52YWx1ZSAvIDYgKSAqIDEwMCApICsnJSBvZiAyMDA1IGxldmVscyknO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHlBeGlzQ291bnQ6IG51bGwsXG4gICAgICAgICAgICB5TWF4OiBudWxsXG5cbiAgICAgICAgfVxuICAgIClcbik7XG5cbmNhcmJvbkxpbmVDaGFydHMucHVzaCggXG4gICAgbmV3IENhcmJvbkxpbmVDaGFydChcbiAgICAgICAge1xuICAgICAgICAgICAgbWFyZ2luOiB7IC8vcGVyY2VudGFnZXNcbiAgICAgICAgICAgICAgICB0b3A6IDYsXG4gICAgICAgICAgICAgICAgcmlnaHQ6IDUsXG4gICAgICAgICAgICAgICAgYm90dG9tOiAxMCxcbiAgICAgICAgICAgICAgICBsZWZ0OiAxMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhlaWdodFRvV2lkdGg6IDAuNjYsXG4gICAgICAgICAgICBkYXRhUGF0aDonZGF0YS9yZXZlbnVlLmNzdicsXG4gICAgICAgICAgICBjb250YWluZXI6JyNjb250YWluZXItMicsXG4gICAgICAgICAgICB0cmVuZExhYmVsUG9zaXRpb246ICdhYm92ZScsIFxuICAgICAgICAgICAgYmFzZWxpbmVUb29sdGlwKGQpe1xuICAgICAgICAgICAgICAvLyAgcmV0dXJuICc8Yj5XSVRIT1VUIGNhcmJvbiB0YXg8YnIgLz48L2I+JyArIGQuZGF0ZS5nZXRGdWxsWWVhcigpICsgJzxiciAvPiQnICsgZC52YWx1ZTsgXG4gICAgICAgICAgICAgICByZXR1cm4gJzxiPldJVEhPVVQgQ0FSQk9OIFRBWDwvYj48YnIgLz48Yj5ZZWFyOjwvYj4gJyArIGQuZGF0ZS5nZXRGdWxsWWVhcigpICsgJzxiciAvPjxiciAvPjxiPlJldmVudWU6PC9iPiAkMCc7IFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRyZW5kbGluZVRvb2x0aXAoZCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuICc8Yj5XSVRIIENBUkJPTiBUQVg8L2I+PGJyIC8+KCQnICsgZC5wcmljZSArICc8L2I+IGF0ICcgKyBkLmdyb3d0aF9yYXRlICogMTAwICsgJyUgZ3Jvd3RoIHJhdGUpPGJyIC8+PGI+WWVhcjo8L2I+ICcgKyBkLmRhdGUuZ2V0RnVsbFllYXIoKSArICc8YnIgLz48Yj5QcmljZTo8L2I+ICQnICsgZDMuZm9ybWF0KFwiLC4yZlwiKSggZ2xvYmFsUHJpY2UgKiBNYXRoLnBvdygxICsgKCArZ2xvYmFsUmF0ZSApLCAoICtkLmRhdGUuZ2V0RnVsbFllYXIoKSApIC0gMjAxOCkgKSArICcgcGVyIHRvbjxiciAvPjxiciAvPjxiPlJldmVudWU6PC9iPiAkJyArIGQzLmZvcm1hdChcIi4zblwiKShkLnZhbHVlKSArICcgYmlsbGlvbic7IFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHlBeGlzQ291bnQ6IDYsXG4gICAgICAgICAgICB5TWF4OiAzMDBcblxuICAgICAgICB9XG4gICAgKVxuKTtcblxufSgpKTsgLy8gZW5kIElJRkVcbiJdfQ==
