/**
 * 雷达图：标准雷达图
 */

/**
 * 绘制标准雷达图
 * @author houxue
 * @time 2016/4/22
 * @version 0.0.1
 */
function BasicRadar(workSpace, raw_data, attr, measure) {
    var radar = Radar(raw_data, attr, measure);
    radar(workSpace);
}

function Radar(data, attr, measure) {

    // 雷达图配置参数
    var config = {
        rawdata: undefined, // 原数据
        data: undefined,    // 处理后可供展示的数据
        attr: undefined,    // 属性值
        measure: undefined, // 度量值

        radius: undefined,  // 半径
        total: undefined,   // 指标的个数，即度量属性的个数
        level: undefined,   // 需要将网轴分成几级，即网轴上从小到大有多少个正多边形
        rangeMin: undefined,    // 网轴的范围，类似坐标轴的定义域
        rangeMax: undefined,
        arc: undefined, // 圆弧生成器
        onePiece: undefined,    // 每项指标所在的角度

        polygons: undefined,    // 网轴的正多边形的坐标
        areasData: undefined,   // 雷达图表的坐标
        textPoints: undefined   // 计算文字标签坐标
    };

    // 颜色生成器
    var color = d3.scale.category20();

    configuration(data, attr, measure);

    // 配置函数
    function configuration(raw_data, attr, measure) {
        config.rawdata = raw_data;
        config.data = normalizeData(raw_data, measure);
        config.attr = attr;
        config.measure = measure;

        config.radius = 180;
        config.total = measure.length;
        config.level = 4;
        config.rangeMin = 0;
        config.arc = 2 * Math.PI;
        config.onePiece = config.arc / config.total;

        config.polygons = calculateCoor();
        config.areasData = calculateRadarCoor();
        config.textPoints = calculateTextCoor();
    }

    // 数据预处理
    function normalizeData(raw_data, measure) {
        var value = [], max = raw_data[0][measure[0]], min = max;
        for (var i = 0; i < raw_data.length; i++) {
            var val = [];
            for (var j = 0; j < measure.length; j++) {
                var temp = parseFloat(raw_data[i][measure[j]]);
                if (temp >= max) {
                    max = temp;
                }
                if (temp < min) {
                    min = temp;
                }
                val.push(temp);
            }
            value.push(val);
        }
        config.rangeMax = max;

        return {
            fieldNames: measure, // 度量属性
            values: value // 度量值
        };
    }

    // 计算网轴的正多边形的坐标
    function calculateCoor() {
        var polygons = {
            webs: [],
            webPoints: []
        };
        for (var k = config.level; k > 0; k--) {
            var webs = '', webPoints = [];
            var r = config.radius / config.level * k;
            for (var i = 0; i < config.total; i++) {
                var x = r * Math.sin(i * config.onePiece),
                    y = r * Math.cos(i * config.onePiece);
                webs += x + ',' + y + ' ';
                webPoints.push({
                    x: x,
                    y: y
                });
            }
            polygons.webs.push(webs);
            polygons.webPoints.push(webPoints);
        }

        return polygons;
    }

    // 计算雷达图表的坐标
    function calculateRadarCoor() {
        var areasData = [];
        var values = config.data.values;
        for (var i = 0; i < values.length; i++) {
            var value = values[i], area = '', points = [];
            for (var k = 0; k < config.total; k++) {
                var r = config.radius * (value[k] - config.rangeMin) / (config.rangeMax - config.rangeMin);
                var x = r * Math.sin(k * config.onePiece),
                    y = r * Math.cos(k * config.onePiece);
                area += x + ',' + y + ' ';
                points.push({
                    x: x,
                    y: y
                })
            }
            areasData.push({
                polygon: area,
                points: points
            });
        }
        return areasData;
    }

    // 计算文字标签坐标
    function calculateTextCoor() {
        var textPoints = [];
        var textRadius = config.radius + 20;
        for (var i = 0; i < config.total; i++) {
            var x = textRadius * Math.sin(i * config.onePiece) - 10,
                y = textRadius * Math.cos(i * config.onePiece);
            textPoints.push({
                x: x,
                y: y
            });
        }

        return textPoints;
    }

    // 图表渲染函数
    function render(workSpace) {
        var svg = workSpace[0];
        var legend = workSpace[1];
        var size = svg[0][0];

        // 绘制网轴, 创建一个分组用来组合要画的图表元素
        var webs = svg.append('g')
            .attr("transform", getTransform(size));
        webs.selectAll('polygon')
            .data(config.polygons.webs)
            .enter()
            .append('polygon')
            .attr('points', function (d) {
                return d;
            })
            .style({
                'fill': 'lightgray',
                'fill-opacity': '0.5',
                'stroke': 'gray',
                'stroke-dasharray': '10,5'
            });

        // 添加纵轴
        var lines = svg.append('g').attr("transform",getTransform(size));
        lines.selectAll('line')
            .data(config.polygons.webPoints[0])
            .enter()
            .append('line')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', function (d) {
                return d.x;
            })
            .attr('y2', function (d) {
                return d.y;
            })
            .style({
                'fill': 'lightgray',
                'fill-opacity': '0.5',
                'stroke': 'gray',
                'stroke-dasharray': '10,5'
            });

        // 添加g分组包含所有雷达图区域
        var areas = svg.append('g').attr("transform", getTransform(size));
        // 添加g分组用来包含每个雷达图区域下的多边形以及圆点
        areas.selectAll('g')
            .data(config.areasData)
            .enter()
            .append('g')
            .attr('class', function (d, i) {
                return 'area' + (i + 1);
            });
        for (var i = 0; i < config.areasData.length; i++) {
            // 依次循环每个雷达图区域
            var area = areas.select('.area' + (i + 1)), areaData = config.areasData[i];

            // 绘制雷达图区域下的多边形
            area.append('polygon')
                .attr('points', areaData.polygon)
                .attr('stroke', function (d, i) {
                    return color(i);
                })
                .attr('fill', function (d, i) {
                    return color(i);
                })
                .style({
                    'fill-opacity': '0.5',
                    'stroke-width': '3'
                });

            // 绘制雷达图区域下的点
            var circles = area.append('g');
            circles.selectAll('circle')
                .data(areaData.points)
                .enter()
                .append('circle')
                .attr('cx', function (d) {
                    return d.x;
                })
                .attr('cy', function (d) {
                    return d.y;
                })
                .attr('r', 3)
                .attr('stroke', function (d, i) {
                    return color(i);
                })
                .style({
                    'fill': 'white',
                    'stroke-width': '3'
                });
        }

        // 绘制文字标签
        var texts = svg.append('g').attr("transform", getTransform(size));
        texts.selectAll('text')
            .data(config.textPoints)
            .enter()
            .append('text')
            .attr('x', function (d) {
                return d.x;
            })
            .attr('y', function (d) {
                return d.y;
            })
            .attr("text-anchor", "middle")
            .text(function (d, i) {
                return config.data.fieldNames[i];
            });

        // 添加图例
        appendLegend(legend, getAttrFromData(config.rawdata, config.attr), color);
    }

    function getTransform(size) {
        // SVG的宽度和高度
        var r = d3.min([size.clientWidth, size.clientHeight]) / 2;
        return "translate(" + r + "," + r + ")";
    }

    return render;
}
