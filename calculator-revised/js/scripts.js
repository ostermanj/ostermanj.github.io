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
        dataPath: '/calculator-revised/data/emissions.csv',
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
        dataPath: '/calculator-revised/data/revenue.csv',
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
