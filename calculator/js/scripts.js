(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var carbonLineCharts = [];
window.carbonLineCharts = carbonLineCharts;
(function () {
    "use strict";

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
        /* PRICE */
        var finalPrice = +price * Math.pow(1 + +rate, 12);

        /* EMISSIONS */
        var emissionsData = carbonLineCharts[0].data[price][rate][0].trend,
            emissionsBaseline = carbonLineCharts[0].data[0][0][0].trend,
            totalEmissionsSavings = emissionsData.reduce(function (acc, cur, i) {
            return acc + (+emissionsBaseline[i].value - +cur.value);
        }, 0);

        /* REVENUE ( emissions * price ) */
        var revenueData = carbonLineCharts[1].data[price][rate][0].trend,
            totalRevenue = revenueData.reduce(function (acc, cur) {
            return acc + +cur.value;
        }, 0);

        d3.select('#summary-stats .bind-text').classed('attention', false).text(', $' + price + ' per ton at ' + rate * 100 + '% growth rate');
        d3.select('#summary-emissions .bind-total').text(d3.format(",.3r")(totalEmissionsSavings) + ' billion metric tons');
        d3.select('#summary-revenue .bind-total').text('$' + d3.format(",.4r")(totalRevenue) + ' billion');
        d3.select('#summary-price .bind-total').text('$' + d3.format(",.2f")(finalPrice) + ' per ton');
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
                console.log(data);
                _this3.baselineData = data.slice(0, 1);
                _this3.data = d3.nest().key(function (d) {
                    return d.initial_price;
                }).key(function (d) {
                    return d.growth_rate;
                }).object(data);
                console.log(_this3.data);
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
                console.log(_this6.labelOffset);
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
                console.log(d.trend[12]);
                return [d.trend[12]];
            }).enter().append('g').attr('transform', function (d) {
                console.log(d);
                return 'translate(' + _this9.x(d.date) + ',' + (_this9.y(d.value) - 1.5) + ')';
            }).attr('class', 'line-label').attr('text-anchor', 'end').append('text').text('Without carbon tax');
        },
        renderAxes: function renderAxes() {
            var _this10 = this;

            this.xAxis = this.svg.append('g').attr('transform', 'translate(0,' + (this.height + 2) + ')').attr('class', 'axis x-axis').call(d3.axisBottom(this.x).tickSizeInner(1).tickSizeOuter(1).tickPadding(1).ticks(d3.timeYear.every(2)));

            this.yAxis = this.svg.append('g').attr('class', 'axis y-axis');

            this.yAxis.append('text').attr('class', 'axis-label').attr('text-anchor', 'start').attr('transform', 'translate(-' + (this.margin.left - 2) + ', -3)').text(function () {
                console.log(_this10.data[0][0][0]);
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
            }).transition().duration(500)
            //  .attr('r',' 1.25')
            .attr('cx', function (d) {
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

            console.log(this.trendlineLabel);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYtanMvc2NyaXB0cy5lczYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLElBQUksbUJBQW1CLEVBQXZCO0FBQ0EsT0FBTyxnQkFBUCxHQUEwQixnQkFBMUI7QUFDQyxhQUFVO0FBQ1g7O0FBRUEsUUFBTSxnQkFBZ0IsR0FBRyxNQUFILENBQVUsaUJBQVYsRUFDakIsRUFEaUIsQ0FDZCxRQURjLEVBQ0osVUFESSxFQUVqQixJQUZpQixFQUF0QjtBQUdBLFFBQU0sZUFBZSxHQUFHLE1BQUgsQ0FBVSxnQkFBVixFQUNoQixFQURnQixDQUNiLFFBRGEsRUFDSCxVQURHLEVBRWhCLElBRmdCLEVBQXJCOztBQUlBLFFBQUksV0FBSixFQUNJLFVBREo7O0FBR0EsYUFBUyxhQUFULEdBQXdCO0FBQ3BCLHlCQUFpQixPQUFqQixDQUF5QixVQUFTLElBQVQsRUFBYzs7QUFFbkMsaUJBQUssV0FBTCxDQUFpQixRQUFqQixDQUEwQixVQUExQjtBQUNBLGlCQUFLLGNBQUwsQ0FBb0IsUUFBcEIsQ0FBNkIsVUFBN0I7QUFDSCxTQUpEO0FBS0g7O0FBRUQsYUFBUyxZQUFULENBQXNCLEtBQXRCLEVBQTZCLElBQTdCLEVBQWtDO0FBQzlCLHNCQUFjLEtBQWQ7QUFDQSxxQkFBYSxJQUFiO0FBQ0E7QUFDQSxZQUFJLGFBQWUsQ0FBQyxLQUFILEdBQWEsS0FBSyxHQUFMLENBQVUsSUFBTSxDQUFDLElBQWpCLEVBQXlCLEVBQXpCLENBQTlCOztBQUVBO0FBQ0EsWUFBSSxnQkFBZ0IsaUJBQWlCLENBQWpCLEVBQW9CLElBQXBCLENBQXlCLEtBQXpCLEVBQWdDLElBQWhDLEVBQXNDLENBQXRDLEVBQXlDLEtBQTdEO0FBQUEsWUFDSSxvQkFBb0IsaUJBQWlCLENBQWpCLEVBQW9CLElBQXBCLENBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLEtBRDFEO0FBQUEsWUFF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LEVBQUUsV0FBRixHQUFnQixHQUExRSxHQUFnRixtQ0FBaEYsR0FBc0gsRUFBRSxJQUFGLENBQU8sV0FBUCxFQUF0SCxHQUE2SSx1QkFBN0ksR0FBdUssR0FBRyxNQUFILENBQVUsTUFBVixFQUFtQixjQUFjLEtBQUssR0FBTCxDQUFTLElBQU0sQ0FBQyxVQUFoQixFQUFnQyxDQUFDLEVBQUUsSUFBRixDQUFPLFdBQVAsRUFBSCxHQUE0QixJQUExRCxDQUFqQyxDQUF2SyxHQUE0USx1Q0FBNVEsR0FBc1QsR0FBRyxNQUFILENBQVUsS0FBVixFQUFpQixFQUFFLEtBQW5CLENBQXRULEdBQWtWLFVBQXpWO0FBQ0gsU0FqQkw7O0FBa0JJLG9CQUFZLENBbEJoQjtBQW1CSSxjQUFNOztBQW5CVixLQURKLENBREo7QUEyQkMsQ0F0WkEsR0FBRCxDLENBc1pNIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBjYXJib25MaW5lQ2hhcnRzID0gW107XG53aW5kb3cuY2FyYm9uTGluZUNoYXJ0cyA9IGNhcmJvbkxpbmVDaGFydHM7XG4oZnVuY3Rpb24oKXtcblwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBwcmljZVNlbGVjdG9yID0gZDMuc2VsZWN0KCcjcHJpY2Utc2VsZWN0b3InKVxuICAgIC5vbignY2hhbmdlJywgdXBkYXRlR2F0ZSlcbiAgICAubm9kZSgpO1xuY29uc3QgcmF0ZVNlbGVjdG9yID0gZDMuc2VsZWN0KCcjcmF0ZS1zZWxlY3RvcicpXG4gICAgLm9uKCdjaGFuZ2UnLCB1cGRhdGVHYXRlKVxuICAgIC5ub2RlKCk7IFxuXG52YXIgZ2xvYmFsUHJpY2UsXG4gICAgZ2xvYmFsUmF0ZTtcblxuZnVuY3Rpb24gY2xlYXJUb29sdGlwcygpe1xuICAgIGNhcmJvbkxpbmVDaGFydHMuZm9yRWFjaChmdW5jdGlvbihlYWNoKXtcblxuICAgICAgICBlYWNoLnRyZW5kUG9pbnRzLmRpc3BhdGNoKCdtb3VzZW91dCcpO1xuICAgICAgICBlYWNoLmJhc2VsaW5lUG9pbnRzLmRpc3BhdGNoKCdtb3VzZW91dCcpO1xuICAgIH0pO1xufVxuIFxuZnVuY3Rpb24gdXBkYXRlVG90YWxzKHByaWNlLCByYXRlKXtcbiAgICBnbG9iYWxQcmljZSA9IHByaWNlO1xuICAgIGdsb2JhbFJhdGUgPSByYXRlO1xuICAgIC8qIFBSSUNFICovXG4gICAgbGV0IGZpbmFsUHJpY2UgPSAoICtwcmljZSApICogTWF0aC5wb3coIDEgKyAoICtyYXRlICksIDEyKTtcblxuICAgIC8qIEVNSVNTSU9OUyAqLyBcbiAgICBsZXQgZW1pc3Npb25zRGF0YSA9IGNhcmJvbkxpbmVDaGFydHNbMF0uZGF0YVtwcmljZV1bcmF0ZV1bMF0udHJlbmQsXG4gICAgICAgIGVtaXNzaW9uc0Jhc2VsaW5lID0gY2FyYm9uTGluZUNoYXJ0c1swXS5kYXRhWzBdWzBdWzBdLnRyZW5kLFxuICAgICAgICB0b3RhbEVtaXNzaW9uc1NhdmluZ3MgPSBlbWlzc2lvbnNEYXRhLnJlZHVjZShmdW5jdGlvbihhY2MsY3VyLCBpKXtcbiAgICAgICAgICAgIHJldHVybiBhY2MgKyAoICggK2VtaXNzaW9uc0Jhc2VsaW5lW2ldLnZhbHVlICkgLSAoICtjdXIudmFsdWUgKSApO1xuICAgICAgICB9LDApO1xuXG4gICAgLyogUkVWRU5VRSAoIGVtaXNzaW9ucyAqIHByaWNlICkgKi9cbiAgICBsZXQgcmV2ZW51ZURhdGEgPSBjYXJib25MaW5lQ2hhcnRzWzFdLmRhdGFbcHJpY2VdW3JhdGVdWzBdLnRyZW5kLFxuICAgICAgICB0b3RhbFJldmVudWUgPSByZXZlbnVlRGF0YS5yZWR1Y2UoZnVuY3Rpb24oYWNjLCBjdXIpe1xuICAgICAgICAgICByZXR1cm4gYWNjICsgKCArY3VyLnZhbHVlICk7XG4gICAgICAgIH0sMCk7XG5cbiAgICBkMy5zZWxlY3QoJyNzdW1tYXJ5LXN0YXRzIC5iaW5kLXRleHQnKVxuICAgICAgICAuY2xhc3NlZCgnYXR0ZW50aW9uJywgZmFsc2UpXG4gICAgICAgIC50ZXh0KCcsICQnICsgcHJpY2UgKyAnIHBlciB0b24gYXQgJyArIHJhdGUgKiAxMDAgKyAnJSBncm93dGggcmF0ZScpO1xuICAgIGQzLnNlbGVjdCgnI3N1bW1hcnktZW1pc3Npb25zIC5iaW5kLXRvdGFsJylcbiAgICAgICAgLnRleHQoZDMuZm9ybWF0KFwiLC4zclwiKSh0b3RhbEVtaXNzaW9uc1NhdmluZ3MpICsgJyBiaWxsaW9uIG1ldHJpYyB0b25zJyk7XG4gICAgZDMuc2VsZWN0KCcjc3VtbWFyeS1yZXZlbnVlIC5iaW5kLXRvdGFsJylcbiAgICAgICAgLnRleHQoJyQnICsgZDMuZm9ybWF0KFwiLC40clwiKSh0b3RhbFJldmVudWUpICsgJyBiaWxsaW9uJyk7XG4gICAgZDMuc2VsZWN0KCcjc3VtbWFyeS1wcmljZSAuYmluZC10b3RhbCcpXG4gICAgICAgIC50ZXh0KCckJyArIGQzLmZvcm1hdChcIiwuMmZcIikoZmluYWxQcmljZSkgKyAnIHBlciB0b24nKTtcbiAgICBkMy5zZWxlY3QoJyNzdW1tYXJ5LXN0YXRzJylcbiAgICAgICAgLmNsYXNzZWQoJ25vdC1jYWxjdWxhdGVkJywgZmFsc2UpO1xuXG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUdhdGUoKXtcbiAgICBpZiAoIHByaWNlU2VsZWN0b3Iub3B0aW9uc1twcmljZVNlbGVjdG9yLnNlbGVjdGVkSW5kZXhdLnZhbHVlICl7XG4gICAgICAgIGQzLnNlbGVjdCgnI3ByaWNlLWxhYmVsJylcbiAgICAgICAgICAgIC5jbGFzc2VkKCdhdHRlbnRpb24nLCBmYWxzZSk7XG4gICAgfVxuICAgIGlmICggcmF0ZVNlbGVjdG9yLm9wdGlvbnNbcmF0ZVNlbGVjdG9yLnNlbGVjdGVkSW5kZXhdLnZhbHVlICl7XG4gICAgICAgIGQzLnNlbGVjdCgnI3JhdGUtbGFiZWwnKVxuICAgICAgICAgICAgLmNsYXNzZWQoJ2F0dGVudGlvbicsIGZhbHNlKTtcbiAgICB9XG4gICAgaWYgKCBwcmljZVNlbGVjdG9yLm9wdGlvbnNbcHJpY2VTZWxlY3Rvci5zZWxlY3RlZEluZGV4XS52YWx1ZSAmJiByYXRlU2VsZWN0b3Iub3B0aW9uc1tyYXRlU2VsZWN0b3Iuc2VsZWN0ZWRJbmRleF0udmFsdWUgKSB7XG4gICAgICAgIGNhcmJvbkxpbmVDaGFydHMuZm9yRWFjaChmdW5jdGlvbihlYWNoKXtcbiAgICAgICAgICAgIGVhY2gudXBkYXRlQ2hhcnQocHJpY2VTZWxlY3Rvci5vcHRpb25zW3ByaWNlU2VsZWN0b3Iuc2VsZWN0ZWRJbmRleF0udmFsdWUsIHJhdGVTZWxlY3Rvci5vcHRpb25zW3JhdGVTZWxlY3Rvci5zZWxlY3RlZEluZGV4XS52YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICB1cGRhdGVUb3RhbHMocHJpY2VTZWxlY3Rvci5vcHRpb25zW3ByaWNlU2VsZWN0b3Iuc2VsZWN0ZWRJbmRleF0udmFsdWUsIHJhdGVTZWxlY3Rvci5vcHRpb25zW3JhdGVTZWxlY3Rvci5zZWxlY3RlZEluZGV4XS52YWx1ZSk7XG4gICAgfVxufSAgXG5cbnZhciBDYXJib25MaW5lQ2hhcnQgPSBmdW5jdGlvbihjb25maWdPYmplY3QpeyAvLyBtYXJnaW5zcmdpbiB7fSwgaGVpZ2h0ICMsIHdpZHRoICMsIGNvbnRhaW5lcklELCBkYXRhUGF0aFxuICAgIHRoaXMuc2V0dXAoY29uZmlnT2JqZWN0KTtcbn07XG5cbkNhcmJvbkxpbmVDaGFydC5wcm90b3R5cGUgPSB7XG5cbiAgICBzZXR1cChjb25maWdPYmplY3Qpe1xuICAgICAgICB2YXIgdmlld0JveCA9ICcwIDAgMTAwICcgKyBNYXRoLnJvdW5kKGNvbmZpZ09iamVjdC5oZWlnaHRUb1dpZHRoICogMTAwKTtcbiAgICAgICAgdGhpcy5tYXJnaW4gPSBjb25maWdPYmplY3QubWFyZ2luO1xuICAgICAgICB0aGlzLndpZHRoID0gMTAwIC0gdGhpcy5tYXJnaW4ubGVmdCAtIHRoaXMubWFyZ2luLnJpZ2h0O1xuICAgICAgICB0aGlzLmhlaWdodCA9IGNvbmZpZ09iamVjdC5oZWlnaHRUb1dpZHRoICogMTAwIC0gdGhpcy5tYXJnaW4udG9wIC0gdGhpcy5tYXJnaW4uYm90dG9tO1xuICAgICAgICB0aGlzLmxhYmVsT2Zmc2V0ID0gY29uZmlnT2JqZWN0LnRyZW5kTGFiZWxQb3NpdGlvbiA9PT0gJ2JlbG93JyA/IDQgOiAtMztcbiAgICAgICAgdGhpcy55QXhpc0NvdW50ID0gY29uZmlnT2JqZWN0LnlBeGlzQ291bnQ7XG4gICAgICAgIHRoaXMuaGFzQmVlblVwZGF0ZWQgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLnN2ZyA9IGQzLnNlbGVjdChjb25maWdPYmplY3QuY29udGFpbmVyKVxuICAgICAgICAgICAgLmFwcGVuZCgnc3ZnJylcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsICcxMDAlJylcbiAgICAgICAgICAgIC5hdHRyKCd4bWxucycsJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJylcbiAgICAgICAgICAgIC5hdHRyKCd2ZXJzaW9uJywnMS4xJylcbiAgICAgICAgICAgIC5hdHRyKCd2aWV3Qm94Jywgdmlld0JveClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2cnKVxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIHRoaXMubWFyZ2luLmxlZnQgKyAnLCcgKyB0aGlzLm1hcmdpbi50b3AgKyAnKScpO1xuXG4gICAgICAgIHRoaXMucGFyc2VUaW1lID0gZDMudGltZVBhcnNlKCclWScpO1xuXG4gICAgICAgIC8vIHNldCB0aGUgcmFuZ2VzXG4gICAgICAgIHRoaXMueCA9IGQzLnNjYWxlVGltZSgpLnJhbmdlKFswLCB0aGlzLndpZHRoXSk7XG4gICAgICAgIHRoaXMueSA9IGQzLnNjYWxlTGluZWFyKCkucmFuZ2UoW3RoaXMuaGVpZ2h0LCAwXSk7XG5cbiAgICAgICAgLy8gZGVmaW5lIHRoZSBsaW5lXG4gICAgICAgIHRoaXMudmFsdWVsaW5lID0gIGQzLmxpbmUoKVxuICAgICAgICAgICAgLngoKGQpID0+IHsgcmV0dXJuIHRoaXMueChkLmRhdGUpOyB9KVxuICAgICAgICAgICAgLnkoKGQpID0+IHsgcmV0dXJuIHRoaXMueShkLnZhbHVlKTsgfSk7XG4gICAgICAgXG4gICAgICAgIHRoaXMuZ2V0RGF0YShjb25maWdPYmplY3QpOyBcblxuICAgIH0sXG5cbiAgICBnZXREYXRhKGNvbmZpZ09iamVjdCl7IC8vIFRPIERPIDogZ2V0IHRoZSBkYXRhIGZpcnN0IHNpbmNlIGl0IGluZm9ybXMgc2V0IHVwXG4gICAgICAgIHRoaXMucmFuZ2UgPSBbXTtcbiAgICAgICAgZDMuY3N2KGNvbmZpZ09iamVjdC5kYXRhUGF0aCwgKGQpID0+IHtcbiAgICAgICAgICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAoIHZhciBpID0gMjAxODsgaSA8IDIwMzE7IGkrKyApe1xuICAgICAgICAgICAgICAgIHRoaXMucmFuZ2UucHVzaCggK2RbaS50b1N0cmluZygpXSApO1xuICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKHtkYXRlOiB0aGlzLnBhcnNlVGltZShpKSwgdmFsdWU6ICtkW2kudG9TdHJpbmcoKV0sIHByaWNlOiBkLnByaWNlLCBncm93dGhfcmF0ZTogZC5ncm93dGhfcmF0ZSwgdW5pdHM6IGQudW5pdHN9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICggY29uZmlnT2JqZWN0LnlNYXggKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yYW5nZS5wdXNoKGNvbmZpZ09iamVjdC55TWF4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZ3Jvd3RoX3JhdGU6ICggK2QuZ3Jvd3RoX3JhdGUgKSxcbiAgICAgICAgICAgICAgICBpbml0aWFsX3ByaWNlOiAoICtkLnByaWNlICksXG4gICAgICAgICAgICAgICAgdW5pdHM6IGQudW5pdHMsXG4gICAgICAgICAgICAgICAgdHJlbmQ6IHZhbHVlc1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSwgKGVycm9yLCBkYXRhKSA9PiB7XG4gICAgICAgICAgICBpZiAoIGVycm9yICkge3Rocm93IGVycm9yO31cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgdGhpcy5iYXNlbGluZURhdGEgPSBkYXRhLnNsaWNlKDAsMSk7XG4gICAgICAgICAgICB0aGlzLmRhdGEgPSBkMy5uZXN0KClcbiAgICAgICAgICAgICAgICAua2V5KGZ1bmN0aW9uKGQpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5pbml0aWFsX3ByaWNlO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmtleShmdW5jdGlvbihkKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQuZ3Jvd3RoX3JhdGU7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAub2JqZWN0KGRhdGEpO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5kYXRhKTtcbiAgICAgICAgICAgIHRoaXMueC5kb21haW4oW3RoaXMucGFyc2VUaW1lKDIwMTgpLHRoaXMucGFyc2VUaW1lKDIwMzApXSk7IC8vIHRoZXNlIGNhbiBiZSBwYXJ0IG9mIHNldHVwIGlmIGRhdGEgaXMgZmV0Y2hlZCBmaXJzdFxuICAgICAgICAgICAgdGhpcy55LmRvbWFpbihbZDMubWluKHRoaXMucmFuZ2UpLCBkMy5tYXgodGhpcy5yYW5nZSldKTtcblxuICAgICAgICAgICAgdGhpcy5zZXR1cFRvb2x0aXBzKGNvbmZpZ09iamVjdCk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlclRyZW5kbGluZSgpOyAvLyB0cmVuZGxpbmUgaXMgcmVuZGVyZWQgYW5kIHRoZW4gaGlkZGVuIGJ5IGJhc2VsaW5lXG4gICAgICAgICAgICB0aGlzLnJlbmRlclRyZW5kUG9pbnRzKCk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlclRyZW5kbGluZUxhYmVsKCk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlckJhc2VsaW5lKCk7IC8vIHNldCB1cCBmaXJzdCByYXRoZXIgdGhhbiByZW5kZXIgaGVyZVxuICAgICAgICAgICAgdGhpcy5yZW5kZXJCYXNlbGluZVBvaW50cygpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJCYXNlbGluZUxhYmVsKCk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlckF4ZXMoKTtcblxuICAgICAgICB9KTtcbiAgICB9LCBcbiAgICBzZXR1cFRvb2x0aXBzKGNvbmZpZ09iamVjdCl7XG4gICAgICAgICB0aGlzLnRvb2x0aXAgPSBkMy50aXAoKVxuICAgICAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcImQzLXRpcCB0cmVuZGxpbmVcIilcbiAgICAgICAgICAgIC5kaXJlY3Rpb24oJ24nKVxuICAgICAgICAgICAgLm9mZnNldChbLTgsIDBdKVxuICAgICAgICAgICAgLmh0bWwoIChkKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbmZpZ09iamVjdC50cmVuZGxpbmVUb29sdGlwKGQpOyBcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYmFzZWxpbmVUb29sdGlwID0gZDMudGlwKClcbiAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJkMy10aXBcIilcbiAgICAgICAgICAgIC5kaXJlY3Rpb24oJ24nKVxuICAgICAgICAgICAgLm9mZnNldChbLTgsIDBdKVxuICAgICAgICAgICAgLmh0bWwoIChkKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbmZpZ09iamVjdC5iYXNlbGluZVRvb2x0aXAoZCk7IFxuICAgICAgICAgICAgfSk7ICAgXG5cbiAgICB9LFxuICAgIHJlbmRlclRyZW5kbGluZSgpe1xuICAgICAgICBcbiAgICAgICAgdGhpcy50cmVuZGxpbmUgPSB0aGlzLnN2Zy5hcHBlbmQoJ3BhdGgnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpbmUnKVxuICAgICAgICAgICAgLmF0dHIoJ2QnLCAgKCkgPT4ge1xuICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVsaW5lKHRoaXMuYmFzZWxpbmVEYXRhWzBdLnRyZW5kKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH0sXG4gICAgcmVuZGVyVHJlbmRQb2ludHMoKXtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy50cmVuZFBvaW50cyA9IHRoaXMuc3ZnLnNlbGVjdEFsbCgndHJlbmQtcG9pbnQnKVxuICAgICAgICAgICAgLmRhdGEoICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5iYXNlbGluZURhdGFbMF0udHJlbmQ7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmVudGVyKCkuYXBwZW5kKCdjaXJjbGUnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2RhdGEtcG9pbnQnKVxuICAgICAgICAgICAgLmF0dHIoJ3InLCAnMScpXG4gICAgICAgICAgICAuYXR0cignY3gnLCAoZCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLngoZC5kYXRlKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXR0cignY3knLCAoZCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnkoZC52YWx1ZSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdtb3VzZW92ZXInLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJUb29sdGlwcygpO1xuICAgICAgICAgICAgICAgIF90aGlzLnRvb2x0aXAuc2hvdyhlKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ21vdXNlb3V0JywgdGhpcy50b29sdGlwLmhpZGUpIFxuICAgICAgICAgICAgLmNhbGwodGhpcy50b29sdGlwKTtcbiAgICB9LFxuICAgIHJlbmRlclRyZW5kbGluZUxhYmVsKCl7XG4gICAgICAgICBcbiAgICAgICAgIHRoaXMudHJlbmRsaW5lTGFiZWwgPSB0aGlzLnN2Zy5hcHBlbmQoJ2cnKVxuICAgICAgICAuYXR0cignY2xhc3MnLCdsaW5lLWxhYmVsIHRyZW5kbGluZS1sYWJlbCBuby1kaXNwbGF5JykgICAgICAgIFxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgICgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubGFiZWxPZmZzZXQpO1xuICAgICAgICAgICAgcmV0dXJuICd0cmFuc2xhdGUoJyArIHRoaXMueCh0aGlzLmJhc2VsaW5lRGF0YVswXS50cmVuZFs3XS5kYXRlKSArICcsJyArICggdGhpcy55KHRoaXMuYmFzZWxpbmVEYXRhWzBdLnRyZW5kWzddLnZhbHVlKSArIHRoaXMubGFiZWxPZmZzZXQgKSArICcpJztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy50cmVuZGxpbmVMYWJlbFxuICAgICAgICAgICAgLmFwcGVuZCgndGV4dCcpXG4gICAgICAgICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnZW5kJylcbiAgICAgICAgICAgIC50ZXh0KCdXaXRoIGNhcmJvbiB0YXgnKTtcbiAgICB9LFxuICAgIHJlbmRlckJhc2VsaW5lKCl7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmJhc2VsaW5lR3JvdXAgPSB0aGlzLnN2Zy5zZWxlY3RBbGwoJ2Jhc2UtbGluZS1ncm91cCcpXG4gICAgICAgICAgICAuZGF0YSh0aGlzLmJhc2VsaW5lRGF0YSlcbiAgICAgICAgICAgIC5lbnRlcigpLmFwcGVuZCgnZycpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCdiYXNlLWxpbmUtZ3JvdXAnKTtcblxuXG4gICAgICAgIHRoaXMuYmFzZWxpbmUgPSB0aGlzLmJhc2VsaW5lR3JvdXAuc2VsZWN0QWxsKCdiYXNlbGluZScpXG4gICAgICAgICAgICAuZGF0YSh0aGlzLmJhc2VsaW5lRGF0YSlcbiAgICAgICAgICAgIC5lbnRlcigpLmFwcGVuZCgncGF0aCcpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGluZSBiYXNlbGluZScpXG4gICAgICAgICAgICAuYXR0cignZCcsICAoZCkgPT4ge1xuICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVsaW5lKGQudHJlbmQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICB9LFxuICAgIHJlbmRlckJhc2VsaW5lUG9pbnRzKCl7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuYmFzZWxpbmVQb2ludHMgID0gdGhpcy5iYXNlbGluZUdyb3VwLnNlbGVjdEFsbCgnYmFzZWxpbmUtcG9pbnQnKVxuICAgICAgICAgICAgLmRhdGEoIChkKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQudHJlbmQ7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmVudGVyKCkuYXBwZW5kKCdjaXJjbGUnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2RhdGEtcG9pbnQgYmFzZWxpbmUtcG9pbnQnKVxuICAgICAgICAgICAgLmF0dHIoJ3InLDEpXG4gICAgICAgICAgICAuYXR0cignY3gnLCAgKGQpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy54KGQuZGF0ZSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmF0dHIoJ2N5JywgIChkKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMueShkLnZhbHVlKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ21vdXNlb3ZlcicsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgIGNsZWFyVG9vbHRpcHMoKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5iYXNlbGluZVRvb2x0aXAuc2hvdyhlKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ21vdXNlb3V0JywgdGhpcy5iYXNlbGluZVRvb2x0aXAuaGlkZSkgXG4gICAgICAgICAgICAuY2FsbCh0aGlzLmJhc2VsaW5lVG9vbHRpcCk7XG4gICAgfSxcbiAgICByZW5kZXJCYXNlbGluZUxhYmVsKCl7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmJhc2VsaW5lTGFiZWwgPSB0aGlzLmJhc2VsaW5lR3JvdXAuc2VsZWN0QWxsKCdiYXNlbGluZS1sYWJlbCcpXG4gICAgICAgIC5kYXRhKCAoZCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZC50cmVuZFsxMl0pO1xuICAgICAgICAgICAgcmV0dXJuIFtkLnRyZW5kWzEyXV07XG4gICAgICAgIH0pXG4gICAgICAgIC5lbnRlcigpLmFwcGVuZCgnZycpXG4gICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAgKGQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGQpO1xuICAgICAgICAgICAgcmV0dXJuICd0cmFuc2xhdGUoJyArIHRoaXMueChkLmRhdGUpICsgJywnICsgKCB0aGlzLnkoZC52YWx1ZSkgLSAxLjUpICsgJyknO1xuICAgICAgICB9KVxuICAgICAgICAuYXR0cignY2xhc3MnLCdsaW5lLWxhYmVsJylcbiAgICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ2VuZCcpXG4gICAgICAgIC5hcHBlbmQoJ3RleHQnKVxuICAgICAgICAudGV4dCgnV2l0aG91dCBjYXJib24gdGF4Jyk7XG5cbiAgICB9LFxuICAgIHJlbmRlckF4ZXMoKXtcbiAgICAgICAgXG4gICAgICAgIHRoaXMueEF4aXMgPSB0aGlzLnN2Zy5hcHBlbmQoJ2cnKVxuICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKDAsJyArICggdGhpcy5oZWlnaHQgKyAyICkgKyAnKScpXG4gICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2F4aXMgeC1heGlzJylcbiAgICAgICAgICAuY2FsbChkMy5heGlzQm90dG9tKHRoaXMueCkudGlja1NpemVJbm5lcigxKS50aWNrU2l6ZU91dGVyKDEpLnRpY2tQYWRkaW5nKDEpLnRpY2tzKGQzLnRpbWVZZWFyLmV2ZXJ5KDIpKSk7XG5cbiAgICAgIFxuICAgICAgICB0aGlzLnlBeGlzID0gdGhpcy5zdmcuYXBwZW5kKCdnJylcbiAgICAgICAgICAuYXR0cignY2xhc3MnLCAnYXhpcyB5LWF4aXMnKTtcblxuICAgICAgICB0aGlzLnlBeGlzLmFwcGVuZCgndGV4dCcpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnYXhpcy1sYWJlbCcpXG4gICAgICAgICAgICAuYXR0cigndGV4dC1hbmNob3InLCdzdGFydCcpXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgtJyArICggdGhpcy5tYXJnaW4ubGVmdCAtIDIgKSsgJywgLTMpJylcbiAgICAgICAgICAgIC50ZXh0KCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5kYXRhWzBdWzBdWzBdKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhWzBdWzBdWzBdLnVuaXRzO1xuICAgICAgICAgICAgfSk7IC8vIFRPIERPOiBuZWVkcyB0byBiZSBzZXQgcHJvZ3JhbW1hdGljYWxseS5cblxuICAgICAgICB0aGlzLnlBeGlzLmNhbGwoZDMuYXhpc0xlZnQodGhpcy55KS50aWNrU2l6ZUlubmVyKDEpLnRpY2tTaXplT3V0ZXIoMSkudGlja1BhZGRpbmcoMSkudGlja3ModGhpcy55QXhpc0NvdW50KSk7XG4gICAgfSxcbiAgICB1cGRhdGVDaGFydCh1c2VyUHJpY2UsdXNlclJhdGUpe1xuICAgICAgICB0aGlzLnVwZGF0ZVRyZW5kUG9pbnRzKHVzZXJQcmljZSx1c2VyUmF0ZSk7XG4gICAgICAgIHRoaXMudXBkYXRlVHJlbmRsaW5lKHVzZXJQcmljZSx1c2VyUmF0ZSk7XG4gICAgICAgIHRoaXMudXBkYXRlVHJlbmRsaW5lTGFiZWwodXNlclByaWNlLHVzZXJSYXRlKTtcbiAgICB9LFxuICAgIHVwZGF0ZVRyZW5kbGluZSh1c2VyUHJpY2UsdXNlclJhdGUpe1xuICAgICAgICBcbiAgICAgICAgdGhpcy50cmVuZFBvaW50cy5kaXNwYXRjaCgnbW91c2VvdXQnKTtcbiAgICAgICAgdGhpcy50cmVuZGxpbmUuZGF0YSggKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVt1c2VyUHJpY2VdW3VzZXJSYXRlXTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNsYXNzZWQoJ3RyZW5kbGluZScsIHRydWUpXG4gICAgICAgIC50cmFuc2l0aW9uKCkuZHVyYXRpb24oNTAwKVxuICAgICAgICAuYXR0cignZCcsICAoZCkgPT4ge1xuICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZWxpbmUoZC50cmVuZCk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICB9LFxuICAgIHVwZGF0ZVRyZW5kUG9pbnRzKHVzZXJQcmljZSwgdXNlclJhdGUpe1xuICAgICAgICBcbiAgICAgICAgdGhpcy50cmVuZFBvaW50cy5kYXRhKCAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhW3VzZXJQcmljZV1bdXNlclJhdGVdWzBdLnRyZW5kO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50cmFuc2l0aW9uKCkuZHVyYXRpb24oNTAwKVxuICAgICAgICAgIC8vICAuYXR0cigncicsJyAxLjI1JylcbiAgICAgICAgICAgIC5hdHRyKCdjeCcsIChkKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMueChkLmRhdGUpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hdHRyKCdjeScsIChkKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMueShkLnZhbHVlKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ2VuZCcsIChjdXIsIGksIGFycmF5KSA9PiB7XG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoIGkgPT09IGFycmF5Lmxlbmd0aCAtIDEgKXtcbiAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KCB0aGlzLnRyZW5kUG9pbnRzLm5vZGVzKClbNF0gKS5kaXNwYXRjaCgnbW91c2VvdmVyJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblVwZGF0ZWQgPSB0cnVlOyAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9LFxuICAgIHVwZGF0ZVRyZW5kbGluZUxhYmVsKHVzZXJQcmljZSx1c2VyUmF0ZSl7XG4gICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnRyZW5kbGluZUxhYmVsKTtcbiAgICAgICAgdGhpcy50cmVuZGxpbmVMYWJlbC5kYXRhKCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFt0aGlzLmRhdGFbdXNlclByaWNlXVt1c2VyUmF0ZV1bMF0udHJlbmRbNV1dO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jbGFzc2VkKCduby1kaXNwbGF5JywgZmFsc2UpXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpLmR1cmF0aW9uKDUwMClcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAgKGQpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgnICsgdGhpcy54KGQuZGF0ZSkgKyAnLCcgKyAoIHRoaXMueShkLnZhbHVlKSArIHRoaXMubGFiZWxPZmZzZXQgKSArICcpJztcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuXG59O1xuXG5jYXJib25MaW5lQ2hhcnRzLnB1c2goIFxuICAgIG5ldyBDYXJib25MaW5lQ2hhcnQoXG4gICAgICAgIHtcbiAgICAgICAgICAgIG1hcmdpbjogeyAvLyBwZXJjZW50YWdlc1xuICAgICAgICAgICAgICAgIHRvcDogNixcbiAgICAgICAgICAgICAgICByaWdodDogNSxcbiAgICAgICAgICAgICAgICBib3R0b206IDEwLFxuICAgICAgICAgICAgICAgIGxlZnQ6IDExXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGVpZ2h0VG9XaWR0aDogMC42NixcbiAgICAgICAgICAgIGRhdGFQYXRoOidkYXRhL2VtaXNzaW9ucy5jc3YnLFxuICAgICAgICAgICAgY29udGFpbmVyOicjY29udGFpbmVyJyxcbiAgICAgICAgICAgIHRyZW5kTGFiZWxQb3NpdGlvbjogJ2JlbG93JywgXG4gICAgICAgICAgICBiYXNlbGluZVRvb2x0aXAoZCl7XG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4gJzxiPldJVEhPVVQgQ0FSQk9OIFRBWDwvYj48YnIgLz48Yj5ZZWFyOjwvYj4gJyArIGQuZGF0ZS5nZXRGdWxsWWVhcigpICsgJzxiciAvPjxiciAvPjxiPkVtaXNzaW9uczo8L2I+ICcgKyBkLnZhbHVlICsgJyAnICsgZC51bml0cyArICc8YnIgLz4oJyArICBNYXRoLnJvdW5kKCggZC52YWx1ZSAvIDYgKSAqIDEwMCApICsnJSBvZiAyMDA1IGxldmVscyknO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRyZW5kbGluZVRvb2x0aXAoZCl7XG4gICAgICAgICAgICAgICAgIHJldHVybiAnPGI+V0lUSCBDQVJCT04gVEFYPC9iPjxiciAvPigkJyArIGQucHJpY2UgKyAnPC9iPiBhdCAnICsgZC5ncm93dGhfcmF0ZSAqIDEwMCArICclIGdyb3d0aCByYXRlKTxiciAvPjxiPlllYXI6PC9iPiAnICsgZC5kYXRlLmdldEZ1bGxZZWFyKCkgKyAnPGJyIC8+PGI+UHJpY2U6PC9iPiAkJyArIGQzLmZvcm1hdChcIiwuMmZcIikoIGdsb2JhbFByaWNlICogTWF0aC5wb3coMSArICggK2dsb2JhbFJhdGUgKSwgKCArZC5kYXRlLmdldEZ1bGxZZWFyKCkgKSAtIDIwMTgpICkgKyAnIHBlciB0b248YnIgLz48YnIgLz48Yj5FbWlzc2lvbnM6PC9iPiAnICsgZC52YWx1ZSArICcgJyArIGQudW5pdHMgKyAnPGJyIC8+KCcgKyAgTWF0aC5yb3VuZCgoIGQudmFsdWUgLyA2ICkgKiAxMDAgKSArJyUgb2YgMjAwNSBsZXZlbHMpJztcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB5QXhpc0NvdW50OiBudWxsLFxuICAgICAgICAgICAgeU1heDogbnVsbFxuXG4gICAgICAgIH1cbiAgICApXG4pO1xuXG5jYXJib25MaW5lQ2hhcnRzLnB1c2goIFxuICAgIG5ldyBDYXJib25MaW5lQ2hhcnQoXG4gICAgICAgIHtcbiAgICAgICAgICAgIG1hcmdpbjogeyAvL3BlcmNlbnRhZ2VzXG4gICAgICAgICAgICAgICAgdG9wOiA2LFxuICAgICAgICAgICAgICAgIHJpZ2h0OiA1LFxuICAgICAgICAgICAgICAgIGJvdHRvbTogMTAsXG4gICAgICAgICAgICAgICAgbGVmdDogMTFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoZWlnaHRUb1dpZHRoOiAwLjY2LFxuICAgICAgICAgICAgZGF0YVBhdGg6J2RhdGEvcmV2ZW51ZS5jc3YnLFxuICAgICAgICAgICAgY29udGFpbmVyOicjY29udGFpbmVyLTInLFxuICAgICAgICAgICAgdHJlbmRMYWJlbFBvc2l0aW9uOiAnYWJvdmUnLCBcbiAgICAgICAgICAgIGJhc2VsaW5lVG9vbHRpcChkKXtcbiAgICAgICAgICAgICAgLy8gIHJldHVybiAnPGI+V0lUSE9VVCBjYXJib24gdGF4PGJyIC8+PC9iPicgKyBkLmRhdGUuZ2V0RnVsbFllYXIoKSArICc8YnIgLz4kJyArIGQudmFsdWU7IFxuICAgICAgICAgICAgICAgcmV0dXJuICc8Yj5XSVRIT1VUIENBUkJPTiBUQVg8L2I+PGJyIC8+PGI+WWVhcjo8L2I+ICcgKyBkLmRhdGUuZ2V0RnVsbFllYXIoKSArICc8YnIgLz48YnIgLz48Yj5SZXZlbnVlOjwvYj4gJDAnOyBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0cmVuZGxpbmVUb29sdGlwKGQpe1xuICAgICAgICAgICAgICAgIHJldHVybiAnPGI+V0lUSCBDQVJCT04gVEFYPC9iPjxiciAvPigkJyArIGQucHJpY2UgKyAnPC9iPiBhdCAnICsgZC5ncm93dGhfcmF0ZSAqIDEwMCArICclIGdyb3d0aCByYXRlKTxiciAvPjxiPlllYXI6PC9iPiAnICsgZC5kYXRlLmdldEZ1bGxZZWFyKCkgKyAnPGJyIC8+PGI+UHJpY2U6PC9iPiAkJyArIGQzLmZvcm1hdChcIiwuMmZcIikoIGdsb2JhbFByaWNlICogTWF0aC5wb3coMSArICggK2dsb2JhbFJhdGUgKSwgKCArZC5kYXRlLmdldEZ1bGxZZWFyKCkgKSAtIDIwMTgpICkgKyAnIHBlciB0b248YnIgLz48YnIgLz48Yj5SZXZlbnVlOjwvYj4gJCcgKyBkMy5mb3JtYXQoXCIuM25cIikoZC52YWx1ZSkgKyAnIGJpbGxpb24nOyBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB5QXhpc0NvdW50OiA2LFxuICAgICAgICAgICAgeU1heDogMzAwXG5cbiAgICAgICAgfVxuICAgIClcbik7XG5cbn0oKSk7IC8vIGVuZCBJSUZFXG4iXX0=
