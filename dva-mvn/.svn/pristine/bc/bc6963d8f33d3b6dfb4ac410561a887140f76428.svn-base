/**
 * 散点饼图矩阵
 */

/**
 * 绘制散点饼图矩阵，目前尚未完成
 * @author liuqiaolian
 * @time 2016/4/22
 * @version 0.0.1
 */
function SPPLOM() {
    var search;
    d3.csv("data/result_tsvm6_plusname",
        function (flowers) {
            // size param
            var size = 140, // ??
                padding = 10;// ����֮��ļ��
            n = 3,// ����Ŀ
                traits = ["North America-ness", "Europe-ness",
                    "Olympics hosting-ness"];// �����
            // position scales
            var x = {}, y = {};
            traits
                .forEach(function (trait) {
                    // coerce values to numbers.
                    flowers.forEach(function (d) {
                        d[trait] = +d[trait];
                    });// ǿ��ת��������
                    var value = function (d) {
                            return d[trait];
                        }, // ����
                        domain = [d3.min(flowers, value),
                            d3.max(flowers, value)], range1 = [
                            padding / 2, size - padding / 2];
                    range2 = [size - padding / 2, padding / 2];
                    x[trait] = d3.scale.linear().domain(domain).range(
                        range1);// ����
                    y[trait] = d3.scale.linear().domain(domain).range(
                        range2);// ����
                });// for each end.
            // Axes.
            var axis = d3.svg.axis().ticks(5).tickSize(size * n);// ����

            // root panel.
            var svg = d3.select(document.getElementById("svg"))
                // d3.select("body").append("svg:svg")
                .attr("width", "100%").attr("height", "100%")
                // .attr("id","svg")
                .append("svg:g").call(
                d3.behavior.zoom().scaleExtent([1, 8]).on("zoom",
                    zoom))
                .attr("transform", "translate(39.5,69.5)");// ���鳤��Ϊ1���ڰ����鳤��Ϊ1

            // X-axis��cell�����x�����"translate("+i*size+",0)"
            svg.selectAll("g.x.axis").data(traits).enter().append("svg:g")
                .attr("class", "x axis").attr("transform",
                function (d, i) {
                    return "translate(" + i * size + ",0)";
                }).each(
                function (d) {
                    d3.select(this).call(
                        axis.scale(x[d]).orient("bottom"));
                });
            // Y-axis��cell�����y����� "translate(0,"+i*size+")"
            svg.selectAll("g.y.axis").data(traits).enter().append("svg:g")
                .attr("class", "y axis").attr("transform",
                function (d, i) {
                    return "translate(0," + i * size + ")";
                }).each(
                function (d) {
                    d3.select(this).call(
                        axis.scale(y[d]).orient("right"));
                });
            // cell and plot��һ������ɢ��ͼ����
            var cell = svg.selectAll("g.cell").data(cross(traits, traits))
                .enter().append("svg:g").attr("class", "cell").attr(
                "transform",
                function (d) {
                    return "translate(" + d.i * size + ","
                        + d.j * size + ")";
                }).each(plot);
            // titles for the diagonal
            cell.filter(function (d) {
                return d.i === d.j;
            }).append("svg:text")//
                .attr("x", padding).attr("y", padding).attr("dy", ".71em")
                .text(function (d) {
                    return d.x;
                });
            function plot(p) {
                // console.log(p);
                var cell = d3.select(this);
                // plot frame
                cell.append("svg:rect").attr("class", "frame").attr("x",
                    padding / 2).attr("y", padding / 2).attr("width",
                    size - padding).attr("height", size - padding);
                // plot dots

                radius = 4;
                var color = d3.scale.ordinal()// ����
                    .range(["#98abc5", "#080"]);
                var color1 = ["#98abc5"];
                // "#080","#008","#800"
                // "#006633","#663300","#CC9933"
                var color2 = ["#080", "#008", "#800"];
                var arc = d3.svg.arc().outerRadius(radius)// ����
                    .innerRadius(radius - 2);

                var pie = d3.layout.pie()// ����
                    .sort(null)// ���ñ�ͼ�����򷽷�
                    .value(function (d) {
                        return 1;
                    });// ����pie��ֵ����
                var scatterpie = cell.selectAll("g").data(flowers).enter()
                    .append("svg:g").attr(
                    "transform",
                    function (d) {
                        return "translate(" + x[p.x](d[p.x])
                            + "," + y[p.y](d[p.y]) + ")";
                    }).attr("class", "scatterpie").on(
                    "mouseover", onmouseover).on("mouseout",
                    onmouseout).on("mousemove", onmousemove);

                var labeltmp = [];
                d3.csv("data/result_label6", function (error, data) {// ����

                    data.forEach(function (d) {
                        d.dim1 = +d.dim1;
                        d.dim2 = +d.dim2;
                        d.dim3 = +d.dim3;
                        // d.dim4 = +d.dim4;
                        // Africa-ness,Europe-ness,Englishspeaking-ness
                        labeltmp.push([d.dim1, d.dim2, d.dim3]);
                    });

                    var piecepie = scatterpie.selectAll(".arc").data(
                        pie([[1], [1], [1]])).enter().append(
                        "g").attr("class", "arc");
                    var j = 1;
                    /**
                     * scatterpie.append("svg:text") //.attr("dy",".3em")
                     * .text(function(d){return j++;});
                     */
                    var i = 0;
                    piecepie.append("path").attr("d", arc).style("fill",
                        function (d) {

                            var t = labeltmp[parseInt(i / 3)][i % 3];
                            var t1 = i % 3;
                            i++;
                            if (t == 1)
                                return color2[t1];
                            else
                                return color1[0];

                            return color2[t];
                        });// ʹ�ô����õĻ��� �����ɫ����ʾ

                });
                // plot tooltip
                // var tooltip = d3.select("body")
                // .append("div")
                // .style("z-index",10)
                // .style("position","absolute")
                // .style("visibility","visible")
                // .style("background","#aadddd")
                // .style("border","1px solid")
                // .style("border-radius","5px");
                // function onmouseover(d){
                // //console.log(d["cityname"]);
                // tooltip.text(d["cityname"]+" ("+d[p.x]+","+d[p.y]+")");
                // tooltip.html('<b><big>'+d["cityname"]+':</big></b>'
                // +'</br>'+p.x+':'+d[p.x]
                // +'</br>'+p.y+':'+d[p.y]);
                // tooltip.style("visibility","visible");
                // }
                // function onmouseout(d){
                // tooltip.style("visibility","visible");
                // }
                // function onmousemove(d){
                // //console.log(event.offsetX);
                // tooltip.style("top",(event.pageY-10)+"px")
                // .style("left",(event.pageX+10)+"px");
                // }

            }// plot end

            function cross(a, b) {
                var c = [], n = a.length, m = b.length, i, j;
                for (i = -1; ++i < n;)
                    for (j = -1; ++j < m;)
                        c.push({
                            x: a[i],
                            i: i,
                            y: b[j],
                            j: j
                        });
                return c;
            }

            //zooming
            function zoom() {
                svg.attr("transform", "translate(" + d3.event.translate
                    + ")scale(" + d3.event.scale + ")");
            }

            function zoomout() {

            }
        });
}