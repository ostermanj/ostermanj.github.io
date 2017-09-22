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

            if (i > 9) {
                // calculate first ten years only, index 0 – 9 inclusive
                return acc;
            } else {
                return acc + +cur.value;
            }
        }, 0);

        d3.select('#summary-stats .bind-text').classed('attention', false).text(', $' + price + ' per ton at ' + rate * 100 + '% growth rate');

        d3.select('#summary-emissions .bind-total').style('opacity', 0).text(d3.format(",.3r")(totalEmissionsSavings) + ' billion metric tons').transition().duration(500).style('opacity', 1);
        d3.select('#summary-revenue .bind-total').style('opacity', 0).text('$' + d3.format(",.4r")(totalRevenue) + ' billion ($2018)').transition().duration(500).style('opacity', 1);
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
        dataPath: 'http://osterman.io/calculator-revised/data/emissions.csv',
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
        dataPath: 'http://osterman.io/calculator-revised/data/revenue.csv',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYtanMvc2NyaXB0cy5lczYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FDLGFBQVU7QUFDWDs7QUFFQSxRQUFJLG1CQUFtQixFQUF2QjtBQUNBLFFBQU0sZ0JBQWdCLEdBQUcsTUFBSCxDQUFVLGlCQUFWLEVBQ2pCLEVBRGlCLENBQ2QsUUFEYyxFQUNKLFVBREksRUFFakIsSUFGaUIsRUFBdEI7QUFHQSxRQUFNLGVBQWUsR0FBRyxNQUFILENBQVUsZ0JBQVYsRUFDaEIsRUFEZ0IsQ0FDYixRQURhLEVBQ0gsVUFERyxFQUVoQixJQUZnQixFQUFyQjs7QUFJQSxRQUFJLFdBQUosRUFDSSxVQURKOztBQUdBLGFBQVMsYUFBVCxHQUF3QjtBQUNwQix5QkFBaUIsT0FBakIsQ0FBeUIsVUFBUyxJQUFULEVBQWM7O0FBRW5DLGlCQUFLLFdBQUwsQ0FBaUIsUUFBakIsQ0FBMEIsVUFBMUI7QUFDQSxpQkFBSyxjQUFMLENBQW9CLFFBQXBCLENBQTZCLFVBQTdCO0FBQ0gsU0FKRDtBQUtIOztBQUVELGFBQVMsWUFBVCxDQUFzQixLQUF0QixFQUE2QixJQUE3QixFQUFrQztBQUM5QixzQkFBYyxLQUFkO0FBQ0EscUJBQWEsSUFBYjs7QUFFQTtBQUNBLFlBQUksZ0JBQWdCLGlCQUFpQixDQUFqQixFQUFvQixJQUFwQixDQUF5QixLQUF6QixFQUFnQyxJQUFoQyxFQUFzQyxDQUF0QyxFQUF5QyxLQUE3RDtBQUFBLFlBQ0ksb0JBQW9CLGlCQUFpQixDQUFqQixFQUFvQixJQUFwQixDQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxLQUQxRDtBQUFBLFlBRUksd0JBQXdCLGNBQWMsTUFBZCxDQUFxQixVQUFTLEdBQVQsRUFBYSxHQUFiLEVBQWtCLENBQWxCLEVBQW9CO0FBQzdELG1CQUFPLE9BQVUsQ0FBQyxrQkFBa0IsQ0FBbEIsRUFBcUIsS0FBeEIsR0FBb0MsQ0FBQyxJQUFJLEtBQWpELENBQVA7QUFDSCxTQUZ1QixFQUV0QixDQUZzQixDQUY1Qjs7QUFNQTtBQUNBLFlBQUksY0FBYyxpQkFBaUIsQ0FBakIsRUFBb0IsSUFBcEIsQ0FBeUIsS0FBekIsRUFBZ0MsSUFBaEMsRUFBc0MsQ0FBdEMsRUFBeUMsS0FBM0Q7QUFBQSxZQUNJLGVBQWUsWUFBWSxNQUFaLENBQW1CLFVBQVMsR0FBVCxFQUFjLEdBQWQsRUFBbUIsQ0FBbkIsRUFBcUI7O0FBRXBELGdCQUFLLElBQUksQ0FBVCxFQUFhO0FBQUU7QUFDVix1QkFBTyxHQUFQO0FBQ0osYUFGRCxNQUVPO0FBQ0gsdUJBQU8sTUFBUSxDQUFDLElBQUksS0FBcEI7QUFDSDtBQUNILFNBUGMsRUFPYixDQVBhLENBRG5COztBQVVBLFdBQUcsTUFBSCxDQUFVLDJCQUFWLEVBQ0ssT0FETCxDQUNhLFdBRGIsRUFDMEIsS0FEMUIsRUFFSyxJQUZMLENBRVUsUUFBUSxLQUFSLEdBQWdCLGNBQWhCLEdBQWlDLE9BQU8sR0FBeEMsR0FBOEMsZUFGeEQ7O0FBSUEsV0FBRyxNQUFILENBQVUsZ0NBQVYsRUFDSyxLQURMLENBQ1csU0FEWCxFQUNxQixDQURyQixFQUVLLElBRkwsQ0FFVSxHQUFHLE1BQUgsQ0FBVSxNQUFWLEVBQWtCLHFCQUFsQixJQUEyQyxzQkFGckQsRUFHSyxVQUhMLEdBR2tCLFFBSGxCLENBRzJCLEdBSDNCLEVBSUssS0FKTCxDQUlXLFNBSlgsRUFJc0IsQ0FKdEI7QUFLQSxXQUFHLE1BQUgsQ0FBVSw4QkFBVixFQUNLLEtBREwsQ0FDVyxTQURYLEVBQ3FCLENBRHJCLEVBRUssSUFGTCxDQUVVLE1BQU0sR0FBRyxNQUFILENBQVUsTUFBVixFQUFrQixZQUFsQixDQUFOLEdBQXdDLGtCQUZsRCxFQUdLLFVBSEwsR0FHa0IsUUFIbEIsQ0FHMkIsR0FIM0IsRUFJSyxLQUpMLENBSVcsU0FKWCxFQUlzQixDQUp0QjtBQUtBLFdBQUcsTUFBSCxDQUFVLGdCQUFWLEVBQ0ssT0FETCxDQUNhLGdCQURiLEVBQytCLEtBRC9CO0FBRUg7O0FBRUQsYUFBUyxVQUFULEdBQXFCO0FBQ2pCLFlBQUssY0FBYyxPQUFkLENBQXNCLGNBQWMsYUFBcEMsRUFBbUQsS0FBeEQsRUFBK0Q7QUFDM0QsZUFBRyxNQUFILENBQVUsY0FBVixFQUNLLE9BREwsQ0FDYSxXQURiLEVBQzBCLEtBRDFCO0FBRUg7QUFDRCxZQUFLLGFBQWEsT0FBYixDQUFxQixhQUFhLGFBQWxDLEVBQWlELEtBQXRELEVBQTZEO0FBQ3pELGVBQUcsTUFBSCxDQUFVLGFBQVYsRUFDSyxPQURMLENBQ2EsV0FEYixFQUMwQixLQUQxQjtBQUVIO0FBQ0QsWUFBSyxjQUFjLE9BQWQsQ0FBc0IsY0FBYyxhQUFwQyxFQUFtRCxLQUFuRCxJQUE0RCxhQUFhLE9BQWIsQ0FBcUIsYUFBYSxhQUFsQyxFQUFpRCxLQUFsSCxFQUEwSDtBQUN0SCw2QkFBaUIsT0FBakIsQ0FBeUIsVUFBUyxJQUFULEVBQWM7QUFDbkMscUJBQUssV0FBTCxDQUFpQixjQUFjLE9BQWQsQ0FBc0IsY0FBYyxhQUFwQyxFQUFtRCxLQUFwRSxFQUEyRSxhQUFhLE9BQWIsQ0FBcUIsYUFBYSxhQUFsQyxFQUFpRCxLQUE1SDtBQUNILGFBRkQ7QUFHQSx5QkFBYSxjQUFjLE9BQWQsQ0FBc0IsY0FBYyxhQUFwQyxFQUFtRCxLQUFoRSxFQUF1RSxhQUFhLE9BQWIsQ0FBcUIsYUFBYSxhQUFsQyxFQUFpRCxLQUF4SDtBQUNIO0FBQ0o7O0FBRUQsUUFBSSxrQkFBa0IsU0FBbEIsZUFBa0IsQ0FBUyxZQUFULEVBQXNCO0FBQUU7QUFDMUMsYUFBSyxLQUFMLENBQVcsWUFBWDtBQUNILEtBRkQ7O0FBSUEsb0JBQWdCLFNBQWhCLEdBQTRCO0FBRXhCLGFBRndCLGlCQUVsQixZQUZrQixFQUVMO0FBQUE7O0FBQ2YsZ0JBQUksVUFBVSxhQUFhLEtBQUssS0FBTCxDQUFXLGFBQWEsYUFBYixHQUE2QixHQUF4QyxDQUEzQjtBQUNBLGlCQUFLLE1BQUwsR0FBYyxhQUFhLE1BQTNCO0FBQ0EsaUJBQUssS0FBTCxHQUFhLE1BQU0sS0FBSyxNQUFMLENBQVksSUFBbEIsR0FBeUIsS0FBSyxNQUFMLENBQVksS0FBbEQ7QUFDQSxpQkFBSyxNQUFMLEdBQWMsYUFBYSxhQUFiLEdBQTZCLEdBQTdCLEdBQW1DLEtBQUssTUFBTCxDQUFZLEdBQS9DLEdBQXFELEtBQUssTUFBTCxDQUFZLE1BQS9FO0FBQ0EsaUJBQUssV0FBTCxHQUFtQixhQUFhLGtCQUFiLEtBQW9DLE9BQXBDLEdBQThDLENBQTlDLEdBQWtELENBQUMsQ0FBdEU7QUFDQSxpQkFBSyxVQUFMLEdBQWtCLGFBQWEsVUFBL0I7QUFDQSxpQkFBSyxjQUFMLEdBQXNCLEtBQXRCOztBQUVBLGlCQUFLLEdBQUwsR0FBVyxHQUFHLE1BQUgsQ0FBVSxhQUFhLFNBQXZCLEVBQ04sTUFETSxDQUNDLEtBREQsRUFFTixJQUZNLENBRUQsT0FGQyxFQUVRLE1BRlIsRUFHTixJQUhNLENBR0QsT0FIQyxFQUdPLDRCQUhQLEVBSU4sSUFKTSxDQUlELFNBSkMsRUFJUyxLQUpULEVBS04sSUFMTSxDQUtELFNBTEMsRUFLVSxPQUxWLEVBTU4sTUFOTSxDQU1DLEdBTkQsRUFPTixJQVBNLENBT0QsV0FQQyxFQU9ZLGVBQWUsS0FBSyxNQUFMLENBQVksSUFBM0IsR0FBa0MsR0FBbEMsR0FBd0MsS0FBSyxNQUFMLENBQVksR0FBcEQsR0FBMEQsR0FQdEUsQ0FBWDs7QUFTQSxpQkFBSyxTQUFMLEdBQWlCLEdBQUcsU0FBSCxDQUFhLElBQWIsQ0FBakI7O0FBRUE7QUFDQSxpQkFBSyxDQUFMLEdBQVMsR0FBRyxTQUFILEdBQWUsS0FBZixDQUFxQixDQUFDLENBQUQsRUFBSSxLQUFLLEtBQVQsQ0FBckIsQ0FBVDtBQUNBLGlCQUFLLENBQUwsR0FBUyxHQUFHLFdBQUgsR0FBaUIsS0FBakIsQ0FBdUIsQ0FBQyxLQUFLLE1BQU4sRUFBYyxDQUFkLENBQXZCLENBQVQ7O0FBRUE7QUFDQSxpQkFBSyxTQUFMLEdBQWtCLEdBQUcsSUFBSCxHQUNiLENBRGEsQ0FDWCxVQUFDLENBQUQsRUFBTztBQUFFLHVCQUFPLE9BQUssQ0FBTCxDQUFPLEVBQUUsSUFBVCxDQUFQO0FBQXdCLGFBRHRCLEVBRWIsQ0FGYSxDQUVYLFVBQUMsQ0FBRCxFQUFPO0FBQUUsdUJBQU8sT0FBSyxDQUFMLENBQU8sRUFBRSxLQUFULENBQVA7QUFBeUIsYUFGdkIsQ0FBbEI7O0FBSUEsaUJBQUssT0FBTCxDQUFhLFlBQWI7QUFFSCxTQWpDdUI7QUFtQ3hCLGVBbkN3QixtQkFtQ2hCLFlBbkNnQixFQW1DSDtBQUFBOztBQUFFO0FBQ25CLGlCQUFLLEtBQUwsR0FBYSxFQUFiO0FBQ0EsZUFBRyxHQUFILENBQU8sYUFBYSxRQUFwQixFQUE4QixVQUFDLENBQUQsRUFBTztBQUNqQyxvQkFBSSxTQUFTLEVBQWI7QUFDQSxxQkFBTSxJQUFJLElBQUksSUFBZCxFQUFvQixJQUFJLElBQXhCLEVBQThCLEdBQTlCLEVBQW1DO0FBQy9CLDJCQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWlCLENBQUMsRUFBRSxFQUFFLFFBQUYsRUFBRixDQUFsQjtBQUNBLDJCQUFPLElBQVAsQ0FBWSxFQUFDLE1BQU0sT0FBSyxTQUFMLENBQWUsQ0FBZixDQUFQLEVBQTBCLE9BQU8sQ0FBQyxFQUFFLEVBQUUsUUFBRixFQUFGLENBQWxDLEVBQW1ELE9BQU8sRUFBRSxLQUE1RCxFQUFtRSxhQUFhLEVBQUUsV0FBbEYsRUFBK0YsT0FBTyxFQUFFLEtBQXhHLEVBQVo7QUFDSDtBQUNELG9CQUFLLGFBQWEsSUFBbEIsRUFBeUI7QUFDckIsMkJBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsYUFBYSxJQUE3QjtBQUNIO0FBQ0QsdUJBQU87QUFDSCxpQ0FBZSxDQUFDLEVBQUUsV0FEZjtBQUVILG1DQUFpQixDQUFDLEVBQUUsS0FGakI7QUFHSCwyQkFBTyxFQUFFLEtBSE47QUFJSCwyQkFBTztBQUpKLGlCQUFQO0FBTUgsYUFmRCxFQWVHLFVBQUMsS0FBRCxFQUFRLElBQVIsRUFBaUI7QUFDaEIsb0JBQUssS0FBTCxFQUFhO0FBQUMsMEJBQU0sS0FBTjtBQUFhOztBQUUzQix1QkFBSyxZQUFMLEdBQW9CLEtBQUssS0FBTCxDQUFXLENBQVgsRUFBYSxDQUFiLENBQXBCO0FBQ0EsdUJBQUssSUFBTCxHQUFZLEdBQUcsSUFBSCxHQUNQLEdBRE8sQ0FDSCxVQUFTLENBQVQsRUFBVztBQUNaLDJCQUFPLEVBQUUsYUFBVDtBQUNILGlCQUhPLEVBSVAsR0FKTyxDQUlILFVBQVMsQ0FBVCxFQUFXO0FBQ1osMkJBQU8sRUFBRSxXQUFUO0FBQ0gsaUJBTk8sRUFPUCxNQVBPLENBT0EsSUFQQSxDQUFaOztBQVNBLHVCQUFLLENBQUwsQ0FBTyxNQUFQLENBQWMsQ0FBQyxPQUFLLFNBQUwsQ0FBZSxJQUFmLENBQUQsRUFBc0IsT0FBSyxTQUFMLENBQWUsSUFBZixDQUF0QixDQUFkLEVBYmdCLENBYTRDO0FBQzVELHVCQUFLLENBQUwsQ0FBTyxNQUFQLENBQWMsQ0FBQyxHQUFHLEdBQUgsQ0FBTyxPQUFLLEtBQVosQ0FBRCxFQUFxQixHQUFHLEdBQUgsQ0FBTyxPQUFLLEtBQVosQ0FBckIsQ0FBZDs7QUFFQSx1QkFBSyxhQUFMLENBQW1CLFlBQW5CO0FBQ0EsdUJBQUssZUFBTCxHQWpCZ0IsQ0FpQlE7QUFDeEIsdUJBQUssaUJBQUw7QUFDQSx1QkFBSyxvQkFBTDtBQUNBLHVCQUFLLGNBQUwsR0FwQmdCLENBb0JPO0FBQ3ZCLHVCQUFLLG9CQUFMO0FBQ0EsdUJBQUssbUJBQUw7QUFDQSx1QkFBSyxVQUFMO0FBRUgsYUF4Q0Q7QUF5Q0gsU0E5RXVCO0FBK0V4QixxQkEvRXdCLHlCQStFVixZQS9FVSxFQStFRztBQUN0QixpQkFBSyxPQUFMLEdBQWUsR0FBRyxHQUFILEdBQ1gsSUFEVyxDQUNOLE9BRE0sRUFDRyxrQkFESCxFQUVYLFNBRlcsQ0FFRCxHQUZDLEVBR1gsTUFIVyxDQUdKLENBQUMsQ0FBQyxDQUFGLEVBQUssQ0FBTCxDQUhJLEVBSVgsSUFKVyxDQUlMLFVBQUMsQ0FBRCxFQUFPO0FBQ1YsdUJBQU8sYUFBYSxnQkFBYixDQUE4QixDQUE5QixDQUFQO0FBQ0gsYUFOVyxDQUFmOztBQVFELGlCQUFLLGVBQUwsR0FBdUIsR0FBRyxHQUFILEdBQ2xCLElBRGtCLENBQ2IsT0FEYSxFQUNKLFFBREksRUFFbEIsU0FGa0IsQ0FFUixHQUZRLEVBR2xCLE1BSGtCLENBR1gsQ0FBQyxDQUFDLENBQUYsRUFBSyxDQUFMLENBSFcsRUFJbEIsSUFKa0IsQ0FJWixVQUFDLENBQUQsRUFBTztBQUNWLHVCQUFPLGFBQWEsZUFBYixDQUE2QixDQUE3QixDQUFQO0FBQ0gsYUFOa0IsQ0FBdkI7QUFRSCxTQWhHdUI7QUFpR3hCLHVCQWpHd0IsNkJBaUdQO0FBQUE7O0FBRWIsaUJBQUssU0FBTCxHQUFpQixLQUFLLEdBQUwsQ0FBUyxNQUFULENBQWdCLE1BQWhCLEVBQ1osSUFEWSxDQUNQLE9BRE8sRUFDRSxNQURGLEVBRVosSUFGWSxDQUVQLEdBRk8sRUFFRCxZQUFNO0FBQ2YsdUJBQU8sT0FBSyxTQUFMLENBQWUsT0FBSyxZQUFMLENBQWtCLENBQWxCLEVBQXFCLEtBQXBDLENBQVA7QUFDRixhQUpZLENBQWpCO0FBS0gsU0F4R3VCO0FBeUd4Qix5QkF6R3dCLCtCQXlHTDtBQUFBOztBQUNmLGdCQUFJLFFBQVEsSUFBWjtBQUNBLGlCQUFLLFdBQUwsR0FBbUIsS0FBSyxHQUFMLENBQVMsU0FBVCxDQUFtQixhQUFuQixFQUNkLElBRGMsQ0FDUixZQUFNO0FBQ1QsdUJBQU8sT0FBSyxZQUFMLENBQWtCLENBQWxCLEVBQXFCLEtBQTVCO0FBQ0gsYUFIYyxFQUlkLEtBSmMsR0FJTixNQUpNLENBSUMsUUFKRCxFQUtkLElBTGMsQ0FLVCxPQUxTLEVBS0EsWUFMQSxFQU1kLElBTmMsQ0FNVCxHQU5TLEVBTUosR0FOSSxFQU9kLElBUGMsQ0FPVCxJQVBTLEVBT0gsVUFBQyxDQUFELEVBQU87QUFDZix1QkFBTyxPQUFLLENBQUwsQ0FBTyxFQUFFLElBQVQsQ0FBUDtBQUNILGFBVGMsRUFVZCxJQVZjLENBVVQsSUFWUyxFQVVILFVBQUMsQ0FBRCxFQUFPO0FBQ2YsdUJBQU8sT0FBSyxDQUFMLENBQU8sRUFBRSxLQUFULENBQVA7QUFDSCxhQVpjLEVBYWQsRUFiYyxDQWFYLFdBYlcsRUFhRSxVQUFTLENBQVQsRUFBWTtBQUN6QjtBQUNBLHNCQUFNLE9BQU4sQ0FBYyxJQUFkLENBQW1CLENBQW5CO0FBQ0gsYUFoQmMsRUFpQmQsRUFqQmMsQ0FpQlgsVUFqQlcsRUFpQkMsS0FBSyxPQUFMLENBQWEsSUFqQmQsRUFrQmQsSUFsQmMsQ0FrQlQsS0FBSyxPQWxCSSxDQUFuQjtBQW1CSCxTQTlIdUI7QUErSHhCLDRCQS9Id0Isa0NBK0hGO0FBQUE7O0FBRWpCLGlCQUFLLGNBQUwsR0FBc0IsS0FBSyxHQUFMLENBQVMsTUFBVCxDQUFnQixHQUFoQixFQUN0QixJQURzQixDQUNqQixPQURpQixFQUNULHVDQURTLEVBRXRCLElBRnNCLENBRWpCLFdBRmlCLEVBRUgsWUFBTTs7QUFFdEIsdUJBQU8sZUFBZSxPQUFLLENBQUwsQ0FBTyxPQUFLLFlBQUwsQ0FBa0IsQ0FBbEIsRUFBcUIsS0FBckIsQ0FBMkIsQ0FBM0IsRUFBOEIsSUFBckMsQ0FBZixHQUE0RCxHQUE1RCxJQUFvRSxPQUFLLENBQUwsQ0FBTyxPQUFLLFlBQUwsQ0FBa0IsQ0FBbEIsRUFBcUIsS0FBckIsQ0FBMkIsQ0FBM0IsRUFBOEIsS0FBckMsSUFBOEMsT0FBSyxXQUF2SCxJQUF1SSxHQUE5STtBQUNILGFBTHNCLENBQXRCOztBQU9ELGlCQUFLLGNBQUwsQ0FDSyxNQURMLENBQ1ksTUFEWixFQUVLLElBRkwsQ0FFVSxhQUZWLEVBRXlCLEtBRnpCLEVBR0ssSUFITCxDQUdVLGlCQUhWO0FBSUgsU0E1SXVCO0FBNkl4QixzQkE3SXdCLDRCQTZJUjtBQUFBOztBQUVaLGlCQUFLLGFBQUwsR0FBcUIsS0FBSyxHQUFMLENBQVMsU0FBVCxDQUFtQixpQkFBbkIsRUFDaEIsSUFEZ0IsQ0FDWCxLQUFLLFlBRE0sRUFFaEIsS0FGZ0IsR0FFUixNQUZRLENBRUQsR0FGQyxFQUdoQixJQUhnQixDQUdYLE9BSFcsRUFHSCxpQkFIRyxDQUFyQjs7QUFNQSxpQkFBSyxRQUFMLEdBQWdCLEtBQUssYUFBTCxDQUFtQixTQUFuQixDQUE2QixVQUE3QixFQUNYLElBRFcsQ0FDTixLQUFLLFlBREMsRUFFWCxLQUZXLEdBRUgsTUFGRyxDQUVJLE1BRkosRUFHWCxJQUhXLENBR04sT0FITSxFQUdHLGVBSEgsRUFJWCxJQUpXLENBSU4sR0FKTSxFQUlBLFVBQUMsQ0FBRCxFQUFPO0FBQ2hCLHVCQUFPLE9BQUssU0FBTCxDQUFlLEVBQUUsS0FBakIsQ0FBUDtBQUNGLGFBTlcsQ0FBaEI7QUFRSCxTQTdKdUI7QUE4SnhCLDRCQTlKd0Isa0NBOEpGO0FBQUE7O0FBQ2xCLGdCQUFJLFFBQVEsSUFBWjtBQUNBLGlCQUFLLGNBQUwsR0FBdUIsS0FBSyxhQUFMLENBQW1CLFNBQW5CLENBQTZCLGdCQUE3QixFQUNsQixJQURrQixDQUNaLFVBQUMsQ0FBRCxFQUFPO0FBQ1YsdUJBQU8sRUFBRSxLQUFUO0FBQ0gsYUFIa0IsRUFJbEIsS0FKa0IsR0FJVixNQUpVLENBSUgsUUFKRyxFQUtsQixJQUxrQixDQUtiLE9BTGEsRUFLSiwyQkFMSSxFQU1sQixJQU5rQixDQU1iLEdBTmEsRUFNVCxDQU5TLEVBT2xCLElBUGtCLENBT2IsSUFQYSxFQU9OLFVBQUMsQ0FBRCxFQUFPO0FBQ2hCLHVCQUFPLE9BQUssQ0FBTCxDQUFPLEVBQUUsSUFBVCxDQUFQO0FBQ0gsYUFUa0IsRUFVbEIsSUFWa0IsQ0FVYixJQVZhLEVBVU4sVUFBQyxDQUFELEVBQU87QUFDaEIsdUJBQU8sT0FBSyxDQUFMLENBQU8sRUFBRSxLQUFULENBQVA7QUFDSCxhQVprQixFQWFsQixFQWJrQixDQWFmLFdBYmUsRUFhRixVQUFTLENBQVQsRUFBVztBQUN4QjtBQUNBLHNCQUFNLGVBQU4sQ0FBc0IsSUFBdEIsQ0FBMkIsQ0FBM0I7QUFDSCxhQWhCa0IsRUFpQmxCLEVBakJrQixDQWlCZixVQWpCZSxFQWlCSCxLQUFLLGVBQUwsQ0FBcUIsSUFqQmxCLEVBa0JsQixJQWxCa0IsQ0FrQmIsS0FBSyxlQWxCUSxDQUF2QjtBQW1CSCxTQW5MdUI7QUFvTHhCLDJCQXBMd0IsaUNBb0xIO0FBQUE7O0FBRWpCLGlCQUFLLGFBQUwsR0FBcUIsS0FBSyxhQUFMLENBQW1CLFNBQW5CLENBQTZCLGdCQUE3QixFQUNwQixJQURvQixDQUNkLFVBQUMsQ0FBRCxFQUFPOztBQUVWLHVCQUFPLENBQUMsRUFBRSxLQUFGLENBQVEsRUFBUixDQUFELENBQVA7QUFDSCxhQUpvQixFQUtwQixLQUxvQixHQUtaLE1BTFksQ0FLTCxHQUxLLEVBTXBCLElBTm9CLENBTWYsV0FOZSxFQU1ELFVBQUMsQ0FBRCxFQUFPOztBQUV2Qix1QkFBTyxlQUFlLE9BQUssQ0FBTCxDQUFPLEVBQUUsSUFBVCxDQUFmLEdBQWdDLEdBQWhDLElBQXdDLE9BQUssQ0FBTCxDQUFPLEVBQUUsS0FBVCxJQUFrQixHQUExRCxJQUFpRSxHQUF4RTtBQUNILGFBVG9CLEVBVXBCLElBVm9CLENBVWYsT0FWZSxFQVVQLFlBVk8sRUFXcEIsSUFYb0IsQ0FXZixhQVhlLEVBV0EsS0FYQSxFQVlwQixNQVpvQixDQVliLE1BWmEsRUFhcEIsSUFib0IsQ0FhZixvQkFiZSxDQUFyQjtBQWVILFNBck11QjtBQXNNeEIsa0JBdE13Qix3QkFzTVo7QUFBQTs7QUFFUixpQkFBSyxLQUFMLEdBQWEsS0FBSyxHQUFMLENBQVMsTUFBVCxDQUFnQixHQUFoQixFQUNWLElBRFUsQ0FDTCxXQURLLEVBQ1Esa0JBQW1CLEtBQUssTUFBTCxHQUFjLENBQWpDLElBQXVDLEdBRC9DLEVBRVYsSUFGVSxDQUVMLE9BRkssRUFFSSxhQUZKLEVBR1YsSUFIVSxDQUdMLEdBQUcsVUFBSCxDQUFjLEtBQUssQ0FBbkIsRUFBc0IsYUFBdEIsQ0FBb0MsQ0FBcEMsRUFBdUMsYUFBdkMsQ0FBcUQsQ0FBckQsRUFBd0QsV0FBeEQsQ0FBb0UsQ0FBcEUsRUFBdUUsS0FBdkUsQ0FBNkUsR0FBRyxRQUFILENBQVksS0FBWixDQUFrQixDQUFsQixDQUE3RSxDQUhLLENBQWI7O0FBTUEsaUJBQUssS0FBTCxHQUFhLEtBQUssR0FBTCxDQUFTLE1BQVQsQ0FBZ0IsR0FBaEIsRUFDVixJQURVLENBQ0wsT0FESyxFQUNJLGFBREosQ0FBYjs7QUFHQSxpQkFBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixNQUFsQixFQUNLLElBREwsQ0FDVSxPQURWLEVBQ21CLFlBRG5CLEVBRUssSUFGTCxDQUVVLGFBRlYsRUFFd0IsT0FGeEIsRUFHSyxJQUhMLENBR1UsV0FIVixFQUd1QixpQkFBa0IsS0FBSyxNQUFMLENBQVksSUFBWixHQUFtQixDQUFyQyxJQUEwQyxPQUhqRSxFQUlLLElBSkwsQ0FJVyxZQUFNOztBQUVULHVCQUFPLFFBQUssSUFBTCxDQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLEtBQTFCO0FBQ0gsYUFQTCxFQVhRLENBa0JBOztBQUVSLGlCQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLEdBQUcsUUFBSCxDQUFZLEtBQUssQ0FBakIsRUFBb0IsYUFBcEIsQ0FBa0MsQ0FBbEMsRUFBcUMsYUFBckMsQ0FBbUQsQ0FBbkQsRUFBc0QsV0FBdEQsQ0FBa0UsQ0FBbEUsRUFBcUUsS0FBckUsQ0FBMkUsS0FBSyxVQUFoRixDQUFoQjtBQUNILFNBM051QjtBQTROeEIsbUJBNU53Qix1QkE0TlosU0E1TlksRUE0TkYsUUE1TkUsRUE0Tk87QUFDM0IsaUJBQUssaUJBQUwsQ0FBdUIsU0FBdkIsRUFBaUMsUUFBakM7QUFDQSxpQkFBSyxlQUFMLENBQXFCLFNBQXJCLEVBQStCLFFBQS9CO0FBQ0EsaUJBQUssb0JBQUwsQ0FBMEIsU0FBMUIsRUFBb0MsUUFBcEM7QUFDSCxTQWhPdUI7QUFpT3hCLHVCQWpPd0IsMkJBaU9SLFNBak9RLEVBaU9FLFFBak9GLEVBaU9XO0FBQUE7O0FBRS9CLGlCQUFLLFdBQUwsQ0FBaUIsUUFBakIsQ0FBMEIsVUFBMUI7QUFDQSxpQkFBSyxTQUFMLENBQWUsSUFBZixDQUFxQixZQUFNO0FBQ3ZCLHVCQUFPLFFBQUssSUFBTCxDQUFVLFNBQVYsRUFBcUIsUUFBckIsQ0FBUDtBQUNILGFBRkQsRUFHQyxPQUhELENBR1MsV0FIVCxFQUdzQixJQUh0QixFQUlDLFVBSkQsR0FJYyxRQUpkLENBSXVCLEdBSnZCLEVBS0MsSUFMRCxDQUtNLEdBTE4sRUFLWSxVQUFDLENBQUQsRUFBTztBQUNoQix1QkFBTyxRQUFLLFNBQUwsQ0FBZSxFQUFFLEtBQWpCLENBQVA7QUFDRixhQVBEO0FBU0gsU0E3T3VCO0FBOE94Qix5QkE5T3dCLDZCQThPTixTQTlPTSxFQThPSyxRQTlPTCxFQThPYztBQUFBOztBQUVsQyxpQkFBSyxXQUFMLENBQWlCLElBQWpCLENBQXVCLFlBQU07QUFDekIsdUJBQU8sUUFBSyxJQUFMLENBQVUsU0FBVixFQUFxQixRQUFyQixFQUErQixDQUEvQixFQUFrQyxLQUF6QztBQUNDLGFBRkwsRUFHSyxVQUhMLEdBR2tCLFFBSGxCLENBRzJCLEdBSDNCLEVBSUssSUFKTCxDQUlVLEdBSlYsRUFJYyxPQUpkLEVBS0ssSUFMTCxDQUtVLElBTFYsRUFLZ0IsVUFBQyxDQUFELEVBQU87QUFDZix1QkFBTyxRQUFLLENBQUwsQ0FBTyxFQUFFLElBQVQsQ0FBUDtBQUNILGFBUEwsRUFRSyxJQVJMLENBUVUsSUFSVixFQVFnQixVQUFDLENBQUQsRUFBTztBQUNmLHVCQUFPLFFBQUssQ0FBTCxDQUFPLEVBQUUsS0FBVCxDQUFQO0FBQ0gsYUFWTCxFQVdLLEVBWEwsQ0FXUSxLQVhSLEVBV2UsVUFBQyxHQUFELEVBQU0sQ0FBTixFQUFTLEtBQVQsRUFBbUI7O0FBRTFCLG9CQUFLLE1BQU0sTUFBTSxNQUFOLEdBQWUsQ0FBMUIsRUFBNkI7QUFDekIsdUJBQUcsTUFBSCxDQUFXLFFBQUssV0FBTCxDQUFpQixLQUFqQixHQUF5QixDQUF6QixDQUFYLEVBQXlDLFFBQXpDLENBQWtELFdBQWxEO0FBQ0EsNEJBQUssY0FBTCxHQUFzQixJQUF0QjtBQUVIO0FBQ0osYUFsQkw7QUFtQkgsU0FuUXVCO0FBb1F4Qiw0QkFwUXdCLGdDQW9RSCxTQXBRRyxFQW9RTyxRQXBRUCxFQW9RZ0I7QUFBQTs7QUFHcEMsaUJBQUssY0FBTCxDQUFvQixJQUFwQixDQUEwQixZQUFNO0FBQ3hCLHVCQUFPLENBQUMsUUFBSyxJQUFMLENBQVUsU0FBVixFQUFxQixRQUFyQixFQUErQixDQUEvQixFQUFrQyxLQUFsQyxDQUF3QyxDQUF4QyxDQUFELENBQVA7QUFDSCxhQUZMLEVBR0ssT0FITCxDQUdhLFlBSGIsRUFHMkIsS0FIM0IsRUFJSyxVQUpMLEdBSWtCLFFBSmxCLENBSTJCLEdBSjNCLEVBS0ssSUFMTCxDQUtVLFdBTFYsRUFLd0IsVUFBQyxDQUFELEVBQU87QUFDdkIsdUJBQU8sZUFBZSxRQUFLLENBQUwsQ0FBTyxFQUFFLElBQVQsQ0FBZixHQUFnQyxHQUFoQyxJQUF3QyxRQUFLLENBQUwsQ0FBTyxFQUFFLEtBQVQsSUFBa0IsUUFBSyxXQUEvRCxJQUErRSxHQUF0RjtBQUNILGFBUEw7QUFRSDtBQS9RdUIsS0FBNUI7O0FBb1JBLHFCQUFpQixJQUFqQixDQUNJLElBQUksZUFBSixDQUNJO0FBQ0ksZ0JBQVEsRUFBRTtBQUNOLGlCQUFLLENBREQ7QUFFSixtQkFBTyxDQUZIO0FBR0osb0JBQVEsRUFISjtBQUlKLGtCQUFNO0FBSkYsU0FEWjtBQU9JLHVCQUFlLElBUG5CO0FBUUksa0JBQVMsMERBUmI7QUFTSSxtQkFBVSxZQVRkO0FBVUksNEJBQW9CLE9BVnhCO0FBV0ksdUJBWEosMkJBV29CLENBWHBCLEVBV3NCOztBQUVkLG1CQUFPLGlEQUFpRCxFQUFFLElBQUYsQ0FBTyxXQUFQLEVBQWpELEdBQXdFLGdDQUF4RSxHQUEyRyxFQUFFLEtBQTdHLEdBQXFILEdBQXJILEdBQTJILEVBQUUsS0FBN0gsR0FBcUksU0FBckksR0FBa0osS0FBSyxLQUFMLENBQWEsRUFBRSxLQUFGLEdBQVUsQ0FBWixHQUFrQixHQUE3QixDQUFsSixHQUFzTCxtQkFBN0w7QUFDSCxTQWRMO0FBZUksd0JBZkosNEJBZXFCLENBZnJCLEVBZXVCO0FBQ2QsbUJBQU8sbUNBQW1DLEVBQUUsS0FBckMsR0FBNkMsVUFBN0MsR0FBMEQsRUFBRSxXQUFGLEdBQWdCLEdBQTFFLEdBQWdGLG1DQUFoRixHQUFzSCxFQUFFLElBQUYsQ0FBTyxXQUFQLEVBQXRILEdBQTZJLHVCQUE3SSxHQUF1SyxHQUFHLE1BQUgsQ0FBVSxNQUFWLEVBQW1CLGNBQWMsS0FBSyxHQUFMLENBQVMsSUFBTSxDQUFDLFVBQWhCLEVBQWdDLENBQUMsRUFBRSxJQUFGLENBQU8sV0FBUCxFQUFILEdBQTRCLElBQTFELENBQWpDLENBQXZLLEdBQTRRLHdDQUE1USxHQUF1VCxFQUFFLEtBQXpULEdBQWlVLEdBQWpVLEdBQXVVLEVBQUUsS0FBelUsR0FBaVYsU0FBalYsR0FBOFYsS0FBSyxLQUFMLENBQWEsRUFBRSxLQUFGLEdBQVUsQ0FBWixHQUFrQixHQUE3QixDQUE5VixHQUFrWSxtQkFBelk7QUFFSixTQWxCTDs7QUFtQkksb0JBQVksSUFuQmhCO0FBb0JJLGNBQU07O0FBcEJWLEtBREosQ0FESjs7QUE0QkEscUJBQWlCLElBQWpCLENBQ0ksSUFBSSxlQUFKLENBQ0k7QUFDSSxnQkFBUSxFQUFFO0FBQ04saUJBQUssQ0FERDtBQUVKLG1CQUFPLENBRkg7QUFHSixvQkFBUSxFQUhKO0FBSUosa0JBQU07QUFKRixTQURaO0FBT0ksdUJBQWUsSUFQbkI7QUFRSSxrQkFBUyx3REFSYjtBQVNJLG1CQUFVLGNBVGQ7QUFVSSw0QkFBb0IsT0FWeEI7QUFXSSx1QkFYSiwyQkFXb0IsQ0FYcEIsRUFXc0I7QUFDaEI7QUFDQyxtQkFBTyxpREFBaUQsRUFBRSxJQUFGLENBQU8sV0FBUCxFQUFqRCxHQUF3RSxnQ0FBL0U7QUFDRixTQWRMO0FBZUksd0JBZkosNEJBZXFCLENBZnJCLEVBZXVCO0FBQ2YsbUJBQU8sbUNBQW1DLEVBQUUsS0FBckMsR0FBNkMsVUFBN0MsR0FBMEQsRUFBRSxXQUFGLEdBQWdCLEdBQTFFLEdBQWdGLG1DQUFoRixHQUFzSCxFQUFFLElBQUYsQ0FBTyxXQUFQLEVBQXRILEdBQTZJLHVCQUE3SSxHQUF1SyxHQUFHLE1BQUgsQ0FBVSxNQUFWLEVBQW1CLGNBQWMsS0FBSyxHQUFMLENBQVMsSUFBTSxDQUFDLFVBQWhCLEVBQWdDLENBQUMsRUFBRSxJQUFGLENBQU8sV0FBUCxFQUFILEdBQTRCLElBQTFELENBQWpDLENBQXZLLEdBQTRRLHVDQUE1USxHQUFzVCxHQUFHLE1BQUgsQ0FBVSxLQUFWLEVBQWlCLEVBQUUsS0FBbkIsQ0FBdFQsR0FBa1YsVUFBelY7QUFDSCxTQWpCTDs7QUFrQkksb0JBQVksQ0FsQmhCO0FBbUJJLGNBQU07O0FBbkJWLEtBREosQ0FESjtBQTBCQyxDQTdaQSxHQUFELEMsQ0E2Wk0iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uKCl7XG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGNhcmJvbkxpbmVDaGFydHMgPSBbXTtcbmNvbnN0IHByaWNlU2VsZWN0b3IgPSBkMy5zZWxlY3QoJyNwcmljZS1zZWxlY3RvcicpXG4gICAgLm9uKCdjaGFuZ2UnLCB1cGRhdGVHYXRlKVxuICAgIC5ub2RlKCk7XG5jb25zdCByYXRlU2VsZWN0b3IgPSBkMy5zZWxlY3QoJyNyYXRlLXNlbGVjdG9yJylcbiAgICAub24oJ2NoYW5nZScsIHVwZGF0ZUdhdGUpXG4gICAgLm5vZGUoKTsgXG5cbnZhciBnbG9iYWxQcmljZSxcbiAgICBnbG9iYWxSYXRlO1xuXG5mdW5jdGlvbiBjbGVhclRvb2x0aXBzKCl7XG4gICAgY2FyYm9uTGluZUNoYXJ0cy5mb3JFYWNoKGZ1bmN0aW9uKGVhY2gpe1xuXG4gICAgICAgIGVhY2gudHJlbmRQb2ludHMuZGlzcGF0Y2goJ21vdXNlb3V0Jyk7XG4gICAgICAgIGVhY2guYmFzZWxpbmVQb2ludHMuZGlzcGF0Y2goJ21vdXNlb3V0Jyk7XG4gICAgfSk7XG59XG4gXG5mdW5jdGlvbiB1cGRhdGVUb3RhbHMocHJpY2UsIHJhdGUpe1xuICAgIGdsb2JhbFByaWNlID0gcHJpY2U7XG4gICAgZ2xvYmFsUmF0ZSA9IHJhdGU7XG5cbiAgICAvKiBFTUlTU0lPTlMgKi8gXG4gICAgbGV0IGVtaXNzaW9uc0RhdGEgPSBjYXJib25MaW5lQ2hhcnRzWzBdLmRhdGFbcHJpY2VdW3JhdGVdWzBdLnRyZW5kLFxuICAgICAgICBlbWlzc2lvbnNCYXNlbGluZSA9IGNhcmJvbkxpbmVDaGFydHNbMF0uZGF0YVswXVswXVswXS50cmVuZCxcbiAgICAgICAgdG90YWxFbWlzc2lvbnNTYXZpbmdzID0gZW1pc3Npb25zRGF0YS5yZWR1Y2UoZnVuY3Rpb24oYWNjLGN1ciwgaSl7XG4gICAgICAgICAgICByZXR1cm4gYWNjICsgKCAoICtlbWlzc2lvbnNCYXNlbGluZVtpXS52YWx1ZSApIC0gKCArY3VyLnZhbHVlICkgKTtcbiAgICAgICAgfSwwKTtcblxuICAgIC8qIFJFVkVOVUUgKCBlbWlzc2lvbnMgKiBwcmljZSApICovXG4gICAgbGV0IHJldmVudWVEYXRhID0gY2FyYm9uTGluZUNoYXJ0c1sxXS5kYXRhW3ByaWNlXVtyYXRlXVswXS50cmVuZCxcbiAgICAgICAgdG90YWxSZXZlbnVlID0gcmV2ZW51ZURhdGEucmVkdWNlKGZ1bmN0aW9uKGFjYywgY3VyLCBpKXtcbiAgICAgICAgICAgIFxuICAgICAgICAgICBpZiAoIGkgPiA5ICkgeyAvLyBjYWxjdWxhdGUgZmlyc3QgdGVuIHllYXJzIG9ubHksIGluZGV4IDAg4oCTIDkgaW5jbHVzaXZlXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgIHJldHVybiBhY2MgKyAoICtjdXIudmFsdWUgKTtcbiAgICAgICAgICAgfVxuICAgICAgICB9LDApO1xuXG4gICAgZDMuc2VsZWN0KCcjc3VtbWFyeS1zdGF0cyAuYmluZC10ZXh0JylcbiAgICAgICAgLmNsYXNzZWQoJ2F0dGVudGlvbicsIGZhbHNlKVxuICAgICAgICAudGV4dCgnLCAkJyArIHByaWNlICsgJyBwZXIgdG9uIGF0ICcgKyByYXRlICogMTAwICsgJyUgZ3Jvd3RoIHJhdGUnKTtcblxuICAgIGQzLnNlbGVjdCgnI3N1bW1hcnktZW1pc3Npb25zIC5iaW5kLXRvdGFsJylcbiAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywwKVxuICAgICAgICAudGV4dChkMy5mb3JtYXQoXCIsLjNyXCIpKHRvdGFsRW1pc3Npb25zU2F2aW5ncykgKyAnIGJpbGxpb24gbWV0cmljIHRvbnMnKVxuICAgICAgICAudHJhbnNpdGlvbigpLmR1cmF0aW9uKDUwMClcbiAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMSk7XG4gICAgZDMuc2VsZWN0KCcjc3VtbWFyeS1yZXZlbnVlIC5iaW5kLXRvdGFsJylcbiAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywwKVxuICAgICAgICAudGV4dCgnJCcgKyBkMy5mb3JtYXQoXCIsLjRyXCIpKHRvdGFsUmV2ZW51ZSkgKyAnIGJpbGxpb24gKCQyMDE4KScpXG4gICAgICAgIC50cmFuc2l0aW9uKCkuZHVyYXRpb24oNTAwKVxuICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAxKTtcbiAgICBkMy5zZWxlY3QoJyNzdW1tYXJ5LXN0YXRzJylcbiAgICAgICAgLmNsYXNzZWQoJ25vdC1jYWxjdWxhdGVkJywgZmFsc2UpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVHYXRlKCl7XG4gICAgaWYgKCBwcmljZVNlbGVjdG9yLm9wdGlvbnNbcHJpY2VTZWxlY3Rvci5zZWxlY3RlZEluZGV4XS52YWx1ZSApe1xuICAgICAgICBkMy5zZWxlY3QoJyNwcmljZS1sYWJlbCcpXG4gICAgICAgICAgICAuY2xhc3NlZCgnYXR0ZW50aW9uJywgZmFsc2UpO1xuICAgIH1cbiAgICBpZiAoIHJhdGVTZWxlY3Rvci5vcHRpb25zW3JhdGVTZWxlY3Rvci5zZWxlY3RlZEluZGV4XS52YWx1ZSApe1xuICAgICAgICBkMy5zZWxlY3QoJyNyYXRlLWxhYmVsJylcbiAgICAgICAgICAgIC5jbGFzc2VkKCdhdHRlbnRpb24nLCBmYWxzZSk7XG4gICAgfVxuICAgIGlmICggcHJpY2VTZWxlY3Rvci5vcHRpb25zW3ByaWNlU2VsZWN0b3Iuc2VsZWN0ZWRJbmRleF0udmFsdWUgJiYgcmF0ZVNlbGVjdG9yLm9wdGlvbnNbcmF0ZVNlbGVjdG9yLnNlbGVjdGVkSW5kZXhdLnZhbHVlICkge1xuICAgICAgICBjYXJib25MaW5lQ2hhcnRzLmZvckVhY2goZnVuY3Rpb24oZWFjaCl7XG4gICAgICAgICAgICBlYWNoLnVwZGF0ZUNoYXJ0KHByaWNlU2VsZWN0b3Iub3B0aW9uc1twcmljZVNlbGVjdG9yLnNlbGVjdGVkSW5kZXhdLnZhbHVlLCByYXRlU2VsZWN0b3Iub3B0aW9uc1tyYXRlU2VsZWN0b3Iuc2VsZWN0ZWRJbmRleF0udmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgdXBkYXRlVG90YWxzKHByaWNlU2VsZWN0b3Iub3B0aW9uc1twcmljZVNlbGVjdG9yLnNlbGVjdGVkSW5kZXhdLnZhbHVlLCByYXRlU2VsZWN0b3Iub3B0aW9uc1tyYXRlU2VsZWN0b3Iuc2VsZWN0ZWRJbmRleF0udmFsdWUpO1xuICAgIH1cbn0gIFxuXG52YXIgQ2FyYm9uTGluZUNoYXJ0ID0gZnVuY3Rpb24oY29uZmlnT2JqZWN0KXsgLy8gbWFyZ2luc3JnaW4ge30sIGhlaWdodCAjLCB3aWR0aCAjLCBjb250YWluZXJJRCwgZGF0YVBhdGhcbiAgICB0aGlzLnNldHVwKGNvbmZpZ09iamVjdCk7XG59O1xuXG5DYXJib25MaW5lQ2hhcnQucHJvdG90eXBlID0ge1xuXG4gICAgc2V0dXAoY29uZmlnT2JqZWN0KXtcbiAgICAgICAgdmFyIHZpZXdCb3ggPSAnMCAwIDEwMCAnICsgTWF0aC5yb3VuZChjb25maWdPYmplY3QuaGVpZ2h0VG9XaWR0aCAqIDEwMCk7XG4gICAgICAgIHRoaXMubWFyZ2luID0gY29uZmlnT2JqZWN0Lm1hcmdpbjtcbiAgICAgICAgdGhpcy53aWR0aCA9IDEwMCAtIHRoaXMubWFyZ2luLmxlZnQgLSB0aGlzLm1hcmdpbi5yaWdodDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBjb25maWdPYmplY3QuaGVpZ2h0VG9XaWR0aCAqIDEwMCAtIHRoaXMubWFyZ2luLnRvcCAtIHRoaXMubWFyZ2luLmJvdHRvbTtcbiAgICAgICAgdGhpcy5sYWJlbE9mZnNldCA9IGNvbmZpZ09iamVjdC50cmVuZExhYmVsUG9zaXRpb24gPT09ICdiZWxvdycgPyA0IDogLTM7XG4gICAgICAgIHRoaXMueUF4aXNDb3VudCA9IGNvbmZpZ09iamVjdC55QXhpc0NvdW50O1xuICAgICAgICB0aGlzLmhhc0JlZW5VcGRhdGVkID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5zdmcgPSBkMy5zZWxlY3QoY29uZmlnT2JqZWN0LmNvbnRhaW5lcilcbiAgICAgICAgICAgIC5hcHBlbmQoJ3N2ZycpXG4gICAgICAgICAgICAuYXR0cignd2lkdGgnLCAnMTAwJScpXG4gICAgICAgICAgICAuYXR0cigneG1sbnMnLCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycpXG4gICAgICAgICAgICAuYXR0cigndmVyc2lvbicsJzEuMScpXG4gICAgICAgICAgICAuYXR0cigndmlld0JveCcsIHZpZXdCb3gpXG4gICAgICAgICAgICAuYXBwZW5kKCdnJylcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyB0aGlzLm1hcmdpbi5sZWZ0ICsgJywnICsgdGhpcy5tYXJnaW4udG9wICsgJyknKTtcblxuICAgICAgICB0aGlzLnBhcnNlVGltZSA9IGQzLnRpbWVQYXJzZSgnJVknKTtcblxuICAgICAgICAvLyBzZXQgdGhlIHJhbmdlc1xuICAgICAgICB0aGlzLnggPSBkMy5zY2FsZVRpbWUoKS5yYW5nZShbMCwgdGhpcy53aWR0aF0pO1xuICAgICAgICB0aGlzLnkgPSBkMy5zY2FsZUxpbmVhcigpLnJhbmdlKFt0aGlzLmhlaWdodCwgMF0pO1xuXG4gICAgICAgIC8vIGRlZmluZSB0aGUgbGluZVxuICAgICAgICB0aGlzLnZhbHVlbGluZSA9ICBkMy5saW5lKClcbiAgICAgICAgICAgIC54KChkKSA9PiB7IHJldHVybiB0aGlzLngoZC5kYXRlKTsgfSlcbiAgICAgICAgICAgIC55KChkKSA9PiB7IHJldHVybiB0aGlzLnkoZC52YWx1ZSk7IH0pO1xuICAgICAgIFxuICAgICAgICB0aGlzLmdldERhdGEoY29uZmlnT2JqZWN0KTsgXG5cbiAgICB9LFxuXG4gICAgZ2V0RGF0YShjb25maWdPYmplY3QpeyAvLyBUTyBETyA6IGdldCB0aGUgZGF0YSBmaXJzdCBzaW5jZSBpdCBpbmZvcm1zIHNldCB1cFxuICAgICAgICB0aGlzLnJhbmdlID0gW107XG4gICAgICAgIGQzLmNzdihjb25maWdPYmplY3QuZGF0YVBhdGgsIChkKSA9PiB7XG4gICAgICAgICAgICB2YXIgdmFsdWVzID0gW107XG4gICAgICAgICAgICBmb3IgKCB2YXIgaSA9IDIwMTg7IGkgPCAyMDMxOyBpKysgKXtcbiAgICAgICAgICAgICAgICB0aGlzLnJhbmdlLnB1c2goICtkW2kudG9TdHJpbmcoKV0gKTtcbiAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaCh7ZGF0ZTogdGhpcy5wYXJzZVRpbWUoaSksIHZhbHVlOiArZFtpLnRvU3RyaW5nKCldLCBwcmljZTogZC5wcmljZSwgZ3Jvd3RoX3JhdGU6IGQuZ3Jvd3RoX3JhdGUsIHVuaXRzOiBkLnVuaXRzfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIGNvbmZpZ09iamVjdC55TWF4ICkge1xuICAgICAgICAgICAgICAgIHRoaXMucmFuZ2UucHVzaChjb25maWdPYmplY3QueU1heCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGdyb3d0aF9yYXRlOiAoICtkLmdyb3d0aF9yYXRlICksXG4gICAgICAgICAgICAgICAgaW5pdGlhbF9wcmljZTogKCArZC5wcmljZSApLFxuICAgICAgICAgICAgICAgIHVuaXRzOiBkLnVuaXRzLFxuICAgICAgICAgICAgICAgIHRyZW5kOiB2YWx1ZXNcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sIChlcnJvciwgZGF0YSkgPT4ge1xuICAgICAgICAgICAgaWYgKCBlcnJvciApIHt0aHJvdyBlcnJvcjt9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuYmFzZWxpbmVEYXRhID0gZGF0YS5zbGljZSgwLDEpO1xuICAgICAgICAgICAgdGhpcy5kYXRhID0gZDMubmVzdCgpXG4gICAgICAgICAgICAgICAgLmtleShmdW5jdGlvbihkKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQuaW5pdGlhbF9wcmljZTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5rZXkoZnVuY3Rpb24oZCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkLmdyb3d0aF9yYXRlO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLm9iamVjdChkYXRhKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy54LmRvbWFpbihbdGhpcy5wYXJzZVRpbWUoMjAxOCksdGhpcy5wYXJzZVRpbWUoMjAzMCldKTsgLy8gdGhlc2UgY2FuIGJlIHBhcnQgb2Ygc2V0dXAgaWYgZGF0YSBpcyBmZXRjaGVkIGZpcnN0XG4gICAgICAgICAgICB0aGlzLnkuZG9tYWluKFtkMy5taW4odGhpcy5yYW5nZSksIGQzLm1heCh0aGlzLnJhbmdlKV0pO1xuXG4gICAgICAgICAgICB0aGlzLnNldHVwVG9vbHRpcHMoY29uZmlnT2JqZWN0KTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyVHJlbmRsaW5lKCk7IC8vIHRyZW5kbGluZSBpcyByZW5kZXJlZCBhbmQgdGhlbiBoaWRkZW4gYnkgYmFzZWxpbmVcbiAgICAgICAgICAgIHRoaXMucmVuZGVyVHJlbmRQb2ludHMoKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyVHJlbmRsaW5lTGFiZWwoKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyQmFzZWxpbmUoKTsgLy8gc2V0IHVwIGZpcnN0IHJhdGhlciB0aGFuIHJlbmRlciBoZXJlXG4gICAgICAgICAgICB0aGlzLnJlbmRlckJhc2VsaW5lUG9pbnRzKCk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlckJhc2VsaW5lTGFiZWwoKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyQXhlcygpO1xuXG4gICAgICAgIH0pO1xuICAgIH0sIFxuICAgIHNldHVwVG9vbHRpcHMoY29uZmlnT2JqZWN0KXtcbiAgICAgICAgIHRoaXMudG9vbHRpcCA9IGQzLnRpcCgpXG4gICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwiZDMtdGlwIHRyZW5kbGluZVwiKVxuICAgICAgICAgICAgLmRpcmVjdGlvbignbicpXG4gICAgICAgICAgICAub2Zmc2V0KFstOCwgMF0pXG4gICAgICAgICAgICAuaHRtbCggKGQpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uZmlnT2JqZWN0LnRyZW5kbGluZVRvb2x0aXAoZCk7IFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5iYXNlbGluZVRvb2x0aXAgPSBkMy50aXAoKVxuICAgICAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcImQzLXRpcFwiKVxuICAgICAgICAgICAgLmRpcmVjdGlvbignbicpXG4gICAgICAgICAgICAub2Zmc2V0KFstOCwgMF0pXG4gICAgICAgICAgICAuaHRtbCggKGQpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uZmlnT2JqZWN0LmJhc2VsaW5lVG9vbHRpcChkKTsgXG4gICAgICAgICAgICB9KTsgICBcblxuICAgIH0sXG4gICAgcmVuZGVyVHJlbmRsaW5lKCl7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnRyZW5kbGluZSA9IHRoaXMuc3ZnLmFwcGVuZCgncGF0aCcpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGluZScpXG4gICAgICAgICAgICAuYXR0cignZCcsICAoKSA9PiB7XG4gICAgICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZWxpbmUodGhpcy5iYXNlbGluZURhdGFbMF0udHJlbmQpO1xuICAgICAgICAgICAgfSk7XG4gICAgfSxcbiAgICByZW5kZXJUcmVuZFBvaW50cygpe1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLnRyZW5kUG9pbnRzID0gdGhpcy5zdmcuc2VsZWN0QWxsKCd0cmVuZC1wb2ludCcpXG4gICAgICAgICAgICAuZGF0YSggKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJhc2VsaW5lRGF0YVswXS50cmVuZDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZW50ZXIoKS5hcHBlbmQoJ2NpcmNsZScpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZGF0YS1wb2ludCcpXG4gICAgICAgICAgICAuYXR0cigncicsICcxJylcbiAgICAgICAgICAgIC5hdHRyKCdjeCcsIChkKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMueChkLmRhdGUpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hdHRyKCdjeScsIChkKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMueShkLnZhbHVlKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ21vdXNlb3ZlcicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBjbGVhclRvb2x0aXBzKCk7XG4gICAgICAgICAgICAgICAgX3RoaXMudG9vbHRpcC5zaG93KGUpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignbW91c2VvdXQnLCB0aGlzLnRvb2x0aXAuaGlkZSkgXG4gICAgICAgICAgICAuY2FsbCh0aGlzLnRvb2x0aXApO1xuICAgIH0sXG4gICAgcmVuZGVyVHJlbmRsaW5lTGFiZWwoKXtcbiAgICAgICAgIFxuICAgICAgICAgdGhpcy50cmVuZGxpbmVMYWJlbCA9IHRoaXMuc3ZnLmFwcGVuZCgnZycpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsJ2xpbmUtbGFiZWwgdHJlbmRsaW5lLWxhYmVsIG5vLWRpc3BsYXknKSAgICAgICAgXG4gICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAgKCkgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgnICsgdGhpcy54KHRoaXMuYmFzZWxpbmVEYXRhWzBdLnRyZW5kWzddLmRhdGUpICsgJywnICsgKCB0aGlzLnkodGhpcy5iYXNlbGluZURhdGFbMF0udHJlbmRbN10udmFsdWUpICsgdGhpcy5sYWJlbE9mZnNldCApICsgJyknO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnRyZW5kbGluZUxhYmVsXG4gICAgICAgICAgICAuYXBwZW5kKCd0ZXh0JylcbiAgICAgICAgICAgIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdlbmQnKVxuICAgICAgICAgICAgLnRleHQoJ1dpdGggY2FyYm9uIHRheCcpO1xuICAgIH0sXG4gICAgcmVuZGVyQmFzZWxpbmUoKXtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYmFzZWxpbmVHcm91cCA9IHRoaXMuc3ZnLnNlbGVjdEFsbCgnYmFzZS1saW5lLWdyb3VwJylcbiAgICAgICAgICAgIC5kYXRhKHRoaXMuYmFzZWxpbmVEYXRhKVxuICAgICAgICAgICAgLmVudGVyKCkuYXBwZW5kKCdnJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsJ2Jhc2UtbGluZS1ncm91cCcpO1xuXG5cbiAgICAgICAgdGhpcy5iYXNlbGluZSA9IHRoaXMuYmFzZWxpbmVHcm91cC5zZWxlY3RBbGwoJ2Jhc2VsaW5lJylcbiAgICAgICAgICAgIC5kYXRhKHRoaXMuYmFzZWxpbmVEYXRhKVxuICAgICAgICAgICAgLmVudGVyKCkuYXBwZW5kKCdwYXRoJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaW5lIGJhc2VsaW5lJylcbiAgICAgICAgICAgIC5hdHRyKCdkJywgIChkKSA9PiB7XG4gICAgICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZWxpbmUoZC50cmVuZCk7XG4gICAgICAgICAgICB9KTtcblxuICAgIH0sXG4gICAgcmVuZGVyQmFzZWxpbmVQb2ludHMoKXtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5iYXNlbGluZVBvaW50cyAgPSB0aGlzLmJhc2VsaW5lR3JvdXAuc2VsZWN0QWxsKCdiYXNlbGluZS1wb2ludCcpXG4gICAgICAgICAgICAuZGF0YSggKGQpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC50cmVuZDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZW50ZXIoKS5hcHBlbmQoJ2NpcmNsZScpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZGF0YS1wb2ludCBiYXNlbGluZS1wb2ludCcpXG4gICAgICAgICAgICAuYXR0cigncicsMSlcbiAgICAgICAgICAgIC5hdHRyKCdjeCcsICAoZCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLngoZC5kYXRlKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXR0cignY3knLCAgKGQpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy55KGQudmFsdWUpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignbW91c2VvdmVyJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgY2xlYXJUb29sdGlwcygpO1xuICAgICAgICAgICAgICAgIF90aGlzLmJhc2VsaW5lVG9vbHRpcC5zaG93KGUpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignbW91c2VvdXQnLCB0aGlzLmJhc2VsaW5lVG9vbHRpcC5oaWRlKSBcbiAgICAgICAgICAgIC5jYWxsKHRoaXMuYmFzZWxpbmVUb29sdGlwKTtcbiAgICB9LFxuICAgIHJlbmRlckJhc2VsaW5lTGFiZWwoKXtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYmFzZWxpbmVMYWJlbCA9IHRoaXMuYmFzZWxpbmVHcm91cC5zZWxlY3RBbGwoJ2Jhc2VsaW5lLWxhYmVsJylcbiAgICAgICAgLmRhdGEoIChkKSA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBbZC50cmVuZFsxMl1dO1xuICAgICAgICB9KVxuICAgICAgICAuZW50ZXIoKS5hcHBlbmQoJ2cnKVxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgIChkKSA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiAndHJhbnNsYXRlKCcgKyB0aGlzLngoZC5kYXRlKSArICcsJyArICggdGhpcy55KGQudmFsdWUpIC0gMS41KSArICcpJztcbiAgICAgICAgfSlcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywnbGluZS1sYWJlbCcpXG4gICAgICAgIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdlbmQnKVxuICAgICAgICAuYXBwZW5kKCd0ZXh0JylcbiAgICAgICAgLnRleHQoJ1dpdGhvdXQgY2FyYm9uIHRheCcpO1xuXG4gICAgfSxcbiAgICByZW5kZXJBeGVzKCl7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnhBeGlzID0gdGhpcy5zdmcuYXBwZW5kKCdnJylcbiAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgwLCcgKyAoIHRoaXMuaGVpZ2h0ICsgMiApICsgJyknKVxuICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdheGlzIHgtYXhpcycpXG4gICAgICAgICAgLmNhbGwoZDMuYXhpc0JvdHRvbSh0aGlzLngpLnRpY2tTaXplSW5uZXIoMSkudGlja1NpemVPdXRlcigxKS50aWNrUGFkZGluZygxKS50aWNrcyhkMy50aW1lWWVhci5ldmVyeSgyKSkpO1xuXG4gICAgICBcbiAgICAgICAgdGhpcy55QXhpcyA9IHRoaXMuc3ZnLmFwcGVuZCgnZycpXG4gICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2F4aXMgeS1heGlzJyk7XG5cbiAgICAgICAgdGhpcy55QXhpcy5hcHBlbmQoJ3RleHQnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2F4aXMtbGFiZWwnKVxuICAgICAgICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywnc3RhcnQnKVxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoLScgKyAoIHRoaXMubWFyZ2luLmxlZnQgLSAyICkrICcsIC0zKScpXG4gICAgICAgICAgICAudGV4dCggKCkgPT4ge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFbMF1bMF1bMF0udW5pdHM7XG4gICAgICAgICAgICB9KTsgLy8gVE8gRE86IG5lZWRzIHRvIGJlIHNldCBwcm9ncmFtbWF0aWNhbGx5LlxuXG4gICAgICAgIHRoaXMueUF4aXMuY2FsbChkMy5heGlzTGVmdCh0aGlzLnkpLnRpY2tTaXplSW5uZXIoMSkudGlja1NpemVPdXRlcigxKS50aWNrUGFkZGluZygxKS50aWNrcyh0aGlzLnlBeGlzQ291bnQpKTtcbiAgICB9LFxuICAgIHVwZGF0ZUNoYXJ0KHVzZXJQcmljZSx1c2VyUmF0ZSl7XG4gICAgICAgIHRoaXMudXBkYXRlVHJlbmRQb2ludHModXNlclByaWNlLHVzZXJSYXRlKTtcbiAgICAgICAgdGhpcy51cGRhdGVUcmVuZGxpbmUodXNlclByaWNlLHVzZXJSYXRlKTtcbiAgICAgICAgdGhpcy51cGRhdGVUcmVuZGxpbmVMYWJlbCh1c2VyUHJpY2UsdXNlclJhdGUpO1xuICAgIH0sXG4gICAgdXBkYXRlVHJlbmRsaW5lKHVzZXJQcmljZSx1c2VyUmF0ZSl7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnRyZW5kUG9pbnRzLmRpc3BhdGNoKCdtb3VzZW91dCcpO1xuICAgICAgICB0aGlzLnRyZW5kbGluZS5kYXRhKCAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhW3VzZXJQcmljZV1bdXNlclJhdGVdO1xuICAgICAgICB9KVxuICAgICAgICAuY2xhc3NlZCgndHJlbmRsaW5lJywgdHJ1ZSlcbiAgICAgICAgLnRyYW5zaXRpb24oKS5kdXJhdGlvbig1MDApXG4gICAgICAgIC5hdHRyKCdkJywgIChkKSA9PiB7XG4gICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlbGluZShkLnRyZW5kKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgIH0sXG4gICAgdXBkYXRlVHJlbmRQb2ludHModXNlclByaWNlLCB1c2VyUmF0ZSl7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnRyZW5kUG9pbnRzLmRhdGEoICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFbdXNlclByaWNlXVt1c2VyUmF0ZV1bMF0udHJlbmQ7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKS5kdXJhdGlvbig1MDApXG4gICAgICAgICAgICAuYXR0cigncicsJyAxLjI1JylcbiAgICAgICAgICAgIC5hdHRyKCdjeCcsIChkKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMueChkLmRhdGUpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hdHRyKCdjeScsIChkKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMueShkLnZhbHVlKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ2VuZCcsIChjdXIsIGksIGFycmF5KSA9PiB7XG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoIGkgPT09IGFycmF5Lmxlbmd0aCAtIDEgKXtcbiAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KCB0aGlzLnRyZW5kUG9pbnRzLm5vZGVzKClbNF0gKS5kaXNwYXRjaCgnbW91c2VvdmVyJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblVwZGF0ZWQgPSB0cnVlOyAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9LFxuICAgIHVwZGF0ZVRyZW5kbGluZUxhYmVsKHVzZXJQcmljZSx1c2VyUmF0ZSl7XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgdGhpcy50cmVuZGxpbmVMYWJlbC5kYXRhKCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFt0aGlzLmRhdGFbdXNlclByaWNlXVt1c2VyUmF0ZV1bMF0udHJlbmRbNV1dO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jbGFzc2VkKCduby1kaXNwbGF5JywgZmFsc2UpXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpLmR1cmF0aW9uKDUwMClcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAgKGQpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgnICsgdGhpcy54KGQuZGF0ZSkgKyAnLCcgKyAoIHRoaXMueShkLnZhbHVlKSArIHRoaXMubGFiZWxPZmZzZXQgKSArICcpJztcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuXG59O1xuXG5jYXJib25MaW5lQ2hhcnRzLnB1c2goIFxuICAgIG5ldyBDYXJib25MaW5lQ2hhcnQoXG4gICAgICAgIHtcbiAgICAgICAgICAgIG1hcmdpbjogeyAvLyBwZXJjZW50YWdlc1xuICAgICAgICAgICAgICAgIHRvcDogNixcbiAgICAgICAgICAgICAgICByaWdodDogNSxcbiAgICAgICAgICAgICAgICBib3R0b206IDEwLFxuICAgICAgICAgICAgICAgIGxlZnQ6IDExXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGVpZ2h0VG9XaWR0aDogMC42NixcbiAgICAgICAgICAgIGRhdGFQYXRoOidodHRwOi8vb3N0ZXJtYW4uaW8vY2FsY3VsYXRvci1yZXZpc2VkL2RhdGEvZW1pc3Npb25zLmNzdicsXG4gICAgICAgICAgICBjb250YWluZXI6JyNjb250YWluZXInLFxuICAgICAgICAgICAgdHJlbmRMYWJlbFBvc2l0aW9uOiAnYmVsb3cnLCBcbiAgICAgICAgICAgIGJhc2VsaW5lVG9vbHRpcChkKXtcbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiAnPGI+V0lUSE9VVCBDQVJCT04gVEFYPC9iPjxiciAvPjxiPlllYXI6PC9iPiAnICsgZC5kYXRlLmdldEZ1bGxZZWFyKCkgKyAnPGJyIC8+PGJyIC8+PGI+RW1pc3Npb25zOjwvYj4gJyArIGQudmFsdWUgKyAnICcgKyBkLnVuaXRzICsgJzxiciAvPignICsgIE1hdGgucm91bmQoKCBkLnZhbHVlIC8gNiApICogMTAwICkgKyclIG9mIDIwMDUgbGV2ZWxzKSc7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHJlbmRsaW5lVG9vbHRpcChkKXtcbiAgICAgICAgICAgICAgICAgcmV0dXJuICc8Yj5XSVRIIENBUkJPTiBUQVg8L2I+PGJyIC8+KCQnICsgZC5wcmljZSArICc8L2I+IGF0ICcgKyBkLmdyb3d0aF9yYXRlICogMTAwICsgJyUgZ3Jvd3RoIHJhdGUpPGJyIC8+PGI+WWVhcjo8L2I+ICcgKyBkLmRhdGUuZ2V0RnVsbFllYXIoKSArICc8YnIgLz48Yj5QcmljZTo8L2I+ICQnICsgZDMuZm9ybWF0KFwiLC4yZlwiKSggZ2xvYmFsUHJpY2UgKiBNYXRoLnBvdygxICsgKCArZ2xvYmFsUmF0ZSApLCAoICtkLmRhdGUuZ2V0RnVsbFllYXIoKSApIC0gMjAxOCkgKSArICcgcGVyIHRvbjxiciAvPjxiciAvPjxiPkVtaXNzaW9uczo8L2I+ICcgKyBkLnZhbHVlICsgJyAnICsgZC51bml0cyArICc8YnIgLz4oJyArICBNYXRoLnJvdW5kKCggZC52YWx1ZSAvIDYgKSAqIDEwMCApICsnJSBvZiAyMDA1IGxldmVscyknO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHlBeGlzQ291bnQ6IG51bGwsXG4gICAgICAgICAgICB5TWF4OiBudWxsXG5cbiAgICAgICAgfVxuICAgIClcbik7XG5cbmNhcmJvbkxpbmVDaGFydHMucHVzaCggXG4gICAgbmV3IENhcmJvbkxpbmVDaGFydChcbiAgICAgICAge1xuICAgICAgICAgICAgbWFyZ2luOiB7IC8vcGVyY2VudGFnZXNcbiAgICAgICAgICAgICAgICB0b3A6IDYsXG4gICAgICAgICAgICAgICAgcmlnaHQ6IDUsXG4gICAgICAgICAgICAgICAgYm90dG9tOiAxMCxcbiAgICAgICAgICAgICAgICBsZWZ0OiAxMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhlaWdodFRvV2lkdGg6IDAuNjYsXG4gICAgICAgICAgICBkYXRhUGF0aDonaHR0cDovL29zdGVybWFuLmlvL2NhbGN1bGF0b3ItcmV2aXNlZC9kYXRhL3JldmVudWUuY3N2JyxcbiAgICAgICAgICAgIGNvbnRhaW5lcjonI2NvbnRhaW5lci0yJyxcbiAgICAgICAgICAgIHRyZW5kTGFiZWxQb3NpdGlvbjogJ2Fib3ZlJywgXG4gICAgICAgICAgICBiYXNlbGluZVRvb2x0aXAoZCl7XG4gICAgICAgICAgICAgIC8vICByZXR1cm4gJzxiPldJVEhPVVQgY2FyYm9uIHRheDxiciAvPjwvYj4nICsgZC5kYXRlLmdldEZ1bGxZZWFyKCkgKyAnPGJyIC8+JCcgKyBkLnZhbHVlOyBcbiAgICAgICAgICAgICAgIHJldHVybiAnPGI+V0lUSE9VVCBDQVJCT04gVEFYPC9iPjxiciAvPjxiPlllYXI6PC9iPiAnICsgZC5kYXRlLmdldEZ1bGxZZWFyKCkgKyAnPGJyIC8+PGJyIC8+PGI+UmV2ZW51ZTo8L2I+ICQwJzsgXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHJlbmRsaW5lVG9vbHRpcChkKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gJzxiPldJVEggQ0FSQk9OIFRBWDwvYj48YnIgLz4oJCcgKyBkLnByaWNlICsgJzwvYj4gYXQgJyArIGQuZ3Jvd3RoX3JhdGUgKiAxMDAgKyAnJSBncm93dGggcmF0ZSk8YnIgLz48Yj5ZZWFyOjwvYj4gJyArIGQuZGF0ZS5nZXRGdWxsWWVhcigpICsgJzxiciAvPjxiPlByaWNlOjwvYj4gJCcgKyBkMy5mb3JtYXQoXCIsLjJmXCIpKCBnbG9iYWxQcmljZSAqIE1hdGgucG93KDEgKyAoICtnbG9iYWxSYXRlICksICggK2QuZGF0ZS5nZXRGdWxsWWVhcigpICkgLSAyMDE4KSApICsgJyBwZXIgdG9uPGJyIC8+PGJyIC8+PGI+UmV2ZW51ZTo8L2I+ICQnICsgZDMuZm9ybWF0KFwiLjNuXCIpKGQudmFsdWUpICsgJyBiaWxsaW9uJzsgXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeUF4aXNDb3VudDogNixcbiAgICAgICAgICAgIHlNYXg6IDMwMFxuXG4gICAgICAgIH1cbiAgICApXG4pO1xufSgpKTsgLy8gZW5kIElJRkVcbiJdfQ==
