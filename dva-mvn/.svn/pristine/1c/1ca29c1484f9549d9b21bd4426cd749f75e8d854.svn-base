/**
 * 仪表盘：标准仪表盘，多仪表盘
 * Created by storm on 2016/4/11.
 */

// 标准仪表盘
/**
 * 绘制标准仪表盘
 * @author houxue
 * @time 2016/4/15
 * @version 0.0.1
 */
function BasicDash(workSpace, dataContent, attr, measure) {
    removeLegendPanel(workSpace);
    var svg = workSpace[0];
    var svgWidth = svg[0][0].clientWidth, svgHeight = svg[0][0].clientHeight;
    var size = d3.min([svgWidth / 3, svgHeight]);

    var gauge = Gauge([
        {
            size: size,

            minValue: 0,
            maxValue: 10,

            minAngle: -135,
            maxAngle: 135,

            majorTicks: 10,
            title: 'aaa'
        }
    ]);
    gauge.render(svg);

    setInterval(function () {
        gauge.update(gauge.configs[0], Math.random() * 10)
    }, 5 * 1000);
}

// 多仪表盘
/**
 * 绘制多仪表盘
 * @author houxue
 * @time 2016/4/19
 * @version 0.0.1
 */
function MultiDash(workSpace, dataContent, attr, measure) {
    removeLegendPanel(workSpace);
    var svg = workSpace[0];
    var svgWidth = svg[0][0].clientWidth, svgHeight = svg[0][0].clientHeight;
    var size = d3.min([svgWidth / 3, svgHeight]);

    var gauge = Gauge([
        {
            size: size,

            minValue: 0,
            maxValue: 10,

            minAngle: -135,
            maxAngle: 135,

            majorTicks: 10,
            title: 'aaa'
        },
        {
            size: size,

            minValue: 0,
            maxValue: 100,

            minAngle: -135,
            maxAngle: 135,

            majorTicks: 10,
            title: 'bbb'
        },
        {
            size: size,

            minValue: 0,
            maxValue: 5,

            minAngle: -135,
            maxAngle: 135,

            majorTicks: 5,
            title: 'ccc'
        }
    ]);
    gauge.render(svg);

    setInterval(function () {
        gauge.update(gauge.configs[0], Math.random() * 10)
    }, 5 * 1000);
    setInterval(function () {
        gauge.update(gauge.configs[1], Math.random() * 100)
    }, 5 * 1000);
    setInterval(function () {
        gauge.update(gauge.configs[2], Math.random() * 5)
    }, 5 * 1000);
}

/**
 * 仪表盘“类”
 * @author houxue
 * @time 2016/4/19
 * @version 0.0.1
 */
function Gauge(newConfigure) {
    // 仪表盘容器的配置参数
    var config = {
        // 仪表的元参数
        chart: {
            size: 360,
            ringWidth: 30,

            pointerWidth: 15,
            pointerTailLength: 5,
            pointerHeadLengthPercent: 0.7,

            minValue: 0,
            maxValue: 100,

            minAngle: -135,
            maxAngle: 135,

            transitionMs: 4000,

            majorTicks: 10,
            title: undefined
        },
        r: undefined, // 半径
        range: undefined, // 角度范围
        pointerHeadLength: undefined, // 指针头部的长度
        scale: undefined,  // 比例尺
        ticks: undefined, // 刻度数值
        tickData: undefined, // 刻度值
        arc: undefined, // 弧度生成器
        pointer: '',
        label: ''
    };
    var configs = [];
    var labelFormat = d3.format(',g');
    var arcColorFn = d3.interpolateHsl(d3.rgb('#d2e9ff'), d3.rgb('#004b97'));

    configure(newConfigure);

    // 设置每个仪表的参数
    function configure(newConfig) {
        for (var i = 0; i < newConfig.length; i++) {
            var conf = JSON.parse(JSON.stringify(config));

            // 元参数配置
            for (var prop in newConfig[i]) {
                conf.chart[prop] = newConfig[i][prop];
            }
            conf.chart.ringWidth = conf.chart.size / 12;

            conf.r = conf.chart.size / 2;
            conf.range = conf.chart.maxAngle - conf.chart.minAngle;
            conf.pointerHeadLength = Math.round(conf.r * conf.chart.pointerHeadLengthPercent);
            conf.scale = d3.scale.linear()
                .range([0, 1])
                .domain([conf.chart.minValue, conf.chart.maxValue]);
            conf.ticks = conf.scale.ticks(conf.chart.majorTicks);
            conf.tickData = d3.range(conf.chart.majorTicks).map(function () {
                return 1 / conf.chart.majorTicks;
            });
            conf.arc = d3.svg.arc()
                .innerRadius(conf.r - conf.chart.ringWidth)
                .outerRadius(conf.r)
                .startAngle(function (d, i) {
                    var ratio = d * i;
                    return deg2rad(conf.chart.minAngle + (ratio * conf.range));
                })
                .endAngle(function (d, i) {
                    var ratio = d * (i + 1);
                    return deg2rad(conf.chart.minAngle + (ratio * conf.range));
                });

            configs.push(conf);
        }
    }

    // 仪表渲染
    function render(svg, newValue) {
        // 计算每个仪表的位置偏移量
        var offset_x = [], width = 0, height = 0;
        for (var i = 0; i < configs.length; i++) {
            width += configs[i].chart.size;
            if (configs[i].chart.size > height) {
                height = configs[i].chart.size;
            }
            offset_x.push(width - configs[i].chart.size / 2);
        }

        // 依次渲染每个仪表
        for (var i = 0; i < configs.length; i++) {
            var conf = configs[i];
            var singleChart = svg.append('g');

            // 渲染圆弧
            var arcs = singleChart.append('g')
                .attr('transform', centerTranslation(offset_x[i], height/2))
                .style({
                    'fill': 'steelblue'
                });
            arcs.selectAll('path').data(conf.tickData).enter().append('path')
                .attr('fill', function (d, i) {
                    return arcColorFn(d * i);
                })
                .attr('d', conf.arc);

            // 仪表刻度值
            var lg = singleChart.append('g')
                .attr('transform', centerTranslation(offset_x[i], height/2));
            lg.selectAll('text').data(conf.ticks).enter().append('text')
                .attr('transform', function (d) {
                    var ratio = conf.scale(d);
                    var newAngle = conf.chart.minAngle + (ratio * conf.range);
                    return 'rotate(' + newAngle + ') translate(0,' + (conf.chart.ringWidth + 15 - conf.r) + ')';
                })
                .style({
                    'text-anchor': 'middle',
                    'font-size': '12px',
                    'font-weight': 'bold',
                    'fill': 'steelblue'
                })
                .text(labelFormat);

            // 仪表的标题
            singleChart.append('g')
                .attr('transform', centerTranslation(offset_x[i], height/2))
                .selectAll('text').data(['label']).enter().append('text')
                .attr('transform', 'rotate(0) translate(0,' + (-conf.chart.size/6) + ')')
                .style({
                    'text-anchor': 'middle',
                    'font-size': '16px',
                    'font-weight': 'bold',
                    'fill': 'black'
                })
                .text(conf.chart.title);

            // 仪表指针
            var lineData = [
                [conf.chart.pointerWidth / 2, 0],
                [0, -conf.pointerHeadLength],
                [-(conf.chart.pointerWidth / 2), 0],
                [0, conf.chart.pointerTailLength],
                [conf.chart.pointerWidth / 2, 0]
            ];
            var pointerLine = d3.svg.line().interpolate('monotone');
            var pg = singleChart.append('g').data([lineData])
                .attr('transform', centerTranslation(offset_x[i], height/2))
                .style({
                    'fill': '#e85116',
                    'stroke': '#b64011'
                });
            conf.pointer = pg.append('path')
                .attr('d', pointerLine)
                .attr('transform', 'rotate(' + conf.chart.minAngle + ')');

            // 仪表的表盘读数
            conf.label = singleChart.append('g')
                .attr('transform', centerTranslation(offset_x[i], height/2))
                .selectAll('text').data(['value']).enter().append('text')
                .attr('transform', 'rotate(0) translate(0,' + (conf.chart.size/4) + ')')
                .style({
                    'text-anchor': 'middle',
                    'font-size': '20px',
                    'font-weight': 'bold',
                    'fill': 'steelblue'
                });

            // 仪表的初始值
            update(conf, newValue === undefined ? 0 : newValue);
        }
    }

    // 更新仪表的读数
    function update(conf, newValue) {
        var ratio = conf.scale(newValue);
        var newAngle = conf.chart.minAngle + (ratio * conf.range);
        conf.pointer.transition()
            .duration(conf.chart.transitionMs)
            .ease('elastic')
            .attr('transform', 'rotate(' + newAngle + ')');
        conf.label.text(parseInt(newValue) + '%');
    }

    // 角度转化为弧度
    function deg2rad(deg) {
        return deg * Math.PI / 180;
    }

    // 元素的偏移量
    function centerTranslation(x, y) {
        return 'translate(' + x + ',' + y + ')';
    }

    return {
        configs: configs,
        render: render,
        update: update
    };
}
