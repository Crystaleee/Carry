/**
 * 条形图， 包括：标准条形图，堆积条形图，旋风条形图
 */

// 标准条形图
/**
 * 绘制标准条形图
 * 
 * @author Ruitong Chai & Bohao Wang
 * @time 2016/4/13
 * @version 0.0.1
 */
function BasicBar(workSpace, data, attrSelect, measureSelect) {
	console.log("attr and measure!");
	console.log(attrSelect);
	console.log(measureSelect);
	
	var svg = workSpace[0].append("g")
		.attr("transform", "translate(" + 100 + "," + 0 + ")");
	var width = workSpace[0][0][0].clientWidth;
	var height = workSpace[0][0][0].clientHeight;
	var x = d3.scale.linear()
		.rangeRound([0, width - 200]);
	var y = d3.scale.ordinal()
		.rangeRoundBands([height - 20, 0]);

	// 矩形着色的比例尺
	var color = d3.scale.category10();
    var color0 = [];
	
	for(var n=0;n<10;n++)
		color0.push(color(n));
	
	var xAxis = d3.svg.axis().scale(x)
		.orient("bottom")
	var yAxis = d3.svg.axis().scale(y)
		.orient("left");
	

	var rects = [];
	var max_x;
	var min_x;
	for (var i = 0; i < data.length; i++) {
		for (var j = 0; j < measureSelect.length; j++) {
			var num = parseFloat(data[i][measureSelect[j]]);
			if (i == 0 && j == 0) {
				max_x = num;
				min_x = num;
			}
			if (max_x < num)
				max_x = num;
			if (min_x > num)
				min_x = num;
			rects.push(num);
		}
	}
    
    //用于显示提示框数据
	var bars=[];
	  
    for(var i = 0; i < measureSelect.length; i++)
    {
  	  var currBars = []; 
        for( var j=0; j < data.length; j++)
        {
            currBars.push([ data[j][attrSelect] , parseFloat(data[j][measureSelect[i]]) ]); 
        }
        bars.push({name:measureSelect[i] , bar:currBars});
    }
	// 确定比例尺y的定义域

	x.domain([0, max_x + (max_x - min_x) / 10]);
	y.domain(data.map(function(d) {
		return d[attrSelect];
	}));

	// 确定矩形的宽度
	var width_rect = y.rangeBand() / measureSelect.length;
 
	var cnt = 0;
	// 绘制矩形
	svg.selectAll("rect")
		.data(rects)
		.enter()
		.append("rect")
		.attr("class", "rect")
		.attr("y", function(d, i) {
			cnt++;
			return y(data[Math.ceil((i + 1) / measureSelect.length) - 1][attrSelect]) + i % measureSelect.length * width_rect;
		})
		.attr("x", 0)
		.attr("height", width_rect)
		.attr("width", function(d, i) {
			return x(d);
		})
		.style("fill", function(d, i) {
			return color(i % measureSelect.length);
		});
	 //添加垂直于x轴的对齐线
    var vLine = svg.append("line")
		             .attr("class", "linefocusLine")
	               	 .style("display", "none");
    
    var chartNode = $(svg[0][0]).parents(".chart");
    //添加一个提示框
    var linetooltip = d3.select(chartNode[0])
      				.append("div")
      				.attr("class","linetooltip")
      				.style("opacity",0.0);
    
      				
    var linetitle = linetooltip.append("div")
      					.attr("class","linetitle");

    var des = linetooltip.selectAll(".des")
      					.data(bars)
      					.enter()
      					.append("div");

    var desColor = des.append("div")
      					.attr("class","desColor");
      					
    var desText = des.append("div")
      					.attr("class","desText");
    
    //添加一个透明的监视鼠标事件用的矩形
    svg.append("rect")
      	.attr("class","lineoverlay")
      	.attr("width",width)
      	.attr("height",height)
      	.on("mouseover", function() { 
      		linetooltip.style("left", (d3.event.clientX + 30) + "px")
      			   .style("top", (d3.event.clientY - 15) + "px")
      			   .style("opacity",1.0);

      		vLine.style("display",null);
      	})
          .on("mouseout", function() { 
          	linetooltip.style("opacity",0.0);
          	vLine.style("display","none");
          })
          .on("mousemove", mousemove);
    
    function mousemove()
    {
    		/* 当鼠标在透明矩形内滑动时调用 */
    		
    		//折线的源数组
    		
    		//获取鼠标相对于透明矩形左上角的坐标，左上角坐标为(0,0)
    		var mouseY = d3.mouse(this)[1];
    		
    		
    		var y0 =  50-Math.ceil(mouseY/ y.rangeBand())+3;
    		
    		//console.log(mouseY)
    		//console.log(y0)
    		
    		var bar0 = [];
			
    		
    		for(var k=0; k<bars.length; k++ )
    			bar0.push({ name: bars[k].name, value: bars[k].bar[y0][1]});
    		

    		//设置提示框的标题文字（年份）
    		linetitle.html("<strong>" + data[y0][attrSelect] + "</strong>");
    		
    		//设置颜色标记的颜色
    		desColor.style("background-color",function(d,i){
    				return color0[i];
    			});
    		
    		//设置描述文字的内容
    		desText.html( function(d,i){
    			return bar0[i].name + "\t" + "<strong>" + bar0[i].value + "</strong>";
    		});
    		
    		//设置提示框的位置
    		linetooltip.style("left", (d3.event.clientX + 30) + "px")
    				.style("top", (d3.event.clientY - 15) + "px");

    		//获取垂直对齐线的x坐标
    		var vlx = y(data[y0][attrSelect]) + y.rangeBand()/2;
    		
    		console.log(vlx);
    		
    		//设定垂直对齐线的起点和终点
    		vLine.attr("x1", 0)
    			.attr("y1",vlx)
    			.attr("x2",width - 200)
    			.attr("y2",vlx);
    }
	
	svg.append("g")
	   .attr("class", "x axis")
	   .attr("transform", "translate(0," + (height - 20) + ")")
   	   .call(xAxis);

    svg.append("g")
	   .attr("class", "y axis")
	   .call(yAxis);

	appendLegend(workSpace[1], measureSelect, color);

}

// 堆积条形图
/**
 * 绘制堆积条形图
 * 
 * @author Ruitong Chai & Bohao Wang
 * @time 2016/4/14
 * @version 0.0.1
 */
function StackBar(workSpace, data, attrSelect, measureSelect) {
	var svg = workSpace[0].append("g").attr("transform",
		"translate(" + 100 + "," + 0 + ")");
	var width = workSpace[0][0][0].clientWidth;
	var height = workSpace[0][0][0].clientHeight;

	var x = d3.scale.linear().rangeRound([0, width - 200]);
	var y = d3.scale.ordinal().rangeRoundBands([height - 20, 0]);

	// 矩形着色的比例尺
	var color = d3.scale.category10();
    var color0 = [];
	
	for(var n=0;n<10;n++)
		color0.push(color(n));
	
	var xAxis = d3.svg.axis().scale(x).orient("bottom");

	var yAxis = d3.svg.axis().scale(y).orient("left");

	// 产生矩形的纵坐标
	data.forEach(function(d) {
		var x0 = 0;
		d.ages = measureSelect.map(function(name) {
			return {
				name: name,
				x0: x0,
				x1: x0 += +d[name]
			};
		});
		d.total = d.ages[d.ages.length - 1].x1;
	});
	
    //用于显示提示框数据
	var bars=[];
	  
    for(var i = 0; i < measureSelect.length; i++)
    {
  	  var currBars = []; 
        for( var j=0; j < data.length; j++)
        {
            currBars.push([ data[j][attrSelect] , parseFloat(data[j][measureSelect[i]]) ]); 
        }
        bars.push({name:measureSelect[i] , bar:currBars});
    }

	var tag = 1;
	// tag=0时给堆叠矩形排序
	if (tag == 0)
		data.sort(function(a, b) {
			return b.total - a.total;
		});
	else
	;

	x.domain([0, d3.max(data, function(d) {
		return d.total;
	})]);
	y.domain(data.map(function(d) {
		return d[attrSelect];
	}));

	var state = svg.selectAll("." + attrSelect).data(data).enter().append("g")
		.attr("class", "g").attr("transform", function(d) {
			return "translate(0," + y(d[attrSelect]) + ")";
		}); // 与堆叠矩形的横坐标相关

	// 绘制矩形
	state.selectAll("rect").data(function(d) {
		return d.ages;
	}).enter().append("rect").attr("width", function(d) {
		return x(d.x1) - x(d.x0);
	}).attr("x", function(d) {
		return x(d.x0);
	}).attr("height", function(d) {
		return y.rangeBand();
	}).style("fill", function(d, i) {
		return color(i);
	});
	 //添加垂直于x轴的对齐线
    var vLine = svg.append("line")
		             .attr("class", "linefocusLine")
	               	 .style("display", "none");
    
    var chartNode = $(svg[0][0]).parents(".chart");
    //添加一个提示框
    var linetooltip = d3.select(chartNode[0])
      				.append("div")
      				.attr("class","linetooltip")
      				.style("opacity",0.0);
    
      				
    var linetitle = linetooltip.append("div")
      					.attr("class","linetitle");

    var des = linetooltip.selectAll(".des")
      					.data(bars)
      					.enter()
      					.append("div");

    var desColor = des.append("div")
      					.attr("class","desColor");
      					
    var desText = des.append("div")
      					.attr("class","desText");
    
    //添加一个透明的监视鼠标事件用的矩形
    svg.append("rect")
      	.attr("class","lineoverlay")
      	.attr("width",width)
      	.attr("height",height)
      	.on("mouseover", function() { 
      		linetooltip.style("left", (d3.event.clientX + 30) + "px")
      			   .style("top", (d3.event.clientY - 15) + "px")
      			   .style("opacity",1.0);

      		vLine.style("display",null);
      	})
          .on("mouseout", function() { 
          	linetooltip.style("opacity",0.0);
          	vLine.style("display","none");
          })
          .on("mousemove", mousemove);
    
    function mousemove()
    {
    		/* 当鼠标在透明矩形内滑动时调用 */
    		
    		//折线的源数组
    		
    		//获取鼠标相对于透明矩形左上角的坐标，左上角坐标为(0,0)
    		var mouseY = d3.mouse(this)[1];
    		
    		
    		var y0 =  50-Math.ceil(mouseY/ y.rangeBand())+3;
    		
    		//console.log(mouseY)
    		//console.log(y0)
    		
    		var bar0 = [];
			
    		
    		for(var k=0; k<bars.length; k++ )
    			bar0.push({ name: bars[k].name, value: bars[k].bar[y0][1]});
    		

    		//设置提示框的标题文字（年份）
    		linetitle.html("<strong>" + data[y0][attrSelect] + "</strong>");
    		
    		//设置颜色标记的颜色
    		desColor.style("background-color",function(d,i){
    				return color0[i];
    			});
    		
    		//设置描述文字的内容
    		desText.html( function(d,i){
    			return bar0[i].name + "\t" + "<strong>" + bar0[i].value + "</strong>";
    		});
    		
    		//设置提示框的位置
    		linetooltip.style("left", (d3.event.clientX + 30) + "px")
    				.style("top", (d3.event.clientY - 15) + "px");

    		//获取垂直对齐线的x坐标
    		var vlx = y(data[y0][attrSelect]) + y.rangeBand()/2;
    		
    		//console.log(vlx);
    		
    		//设定垂直对齐线的起点和终点
    		vLine.attr("x1", 0)
    			.attr("y1",vlx)
    			.attr("x2",width - 200)
    			.attr("y2",vlx);
    }
    
	svg.append("g").attr("class", "x axis").attr("transform",
			"translate(0," + (height - 20) + ")").call(xAxis);

	svg.append("g").attr("class", "y axis").call(yAxis);

	appendLegend(workSpace[1], measureSelect, color);
}

// 旋风条形图
/**
 * 绘制条形旋风图
 * 
 * @author hanxiaoitan
 * @time 2016/4/22
 * @version 0.0.1
 */
function PairedBars(workSpace, dataset, attribute, measure) {
//	var data = window.parent.transferData();
//	var measure = [];
//	var attribute = [];
//	for (var key in data.headType) {
//		if (data.headType[key] != "attr") {
//			measure.push(key);
//		} else {
//			attribute.push(key);
//		}
//	}
//	dataset = data.content;

//	width = 400 - padding.left - padding.right,
//	height = 400 - padding.top - padding.bottom;
//  var svg = getSVG(width, height);
	
	
	
	
	    var svg = workSpace[0].append("g").attr("transform",
			"translate(" + 100 + "," + 0 + ")");
		var width = workSpace[0][0][0].clientWidth;
		var height = workSpace[0][0][0].clientHeight;

	
	
	// SVG大小设计
	var padding = {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0
		};


	// console.log(attribute);
	// console.log(measure);
	// console.log(dataset);
	// console.log(dataset.map(function(d) { return d[attribute[0]]; }));

	// y轴的比例尺
	var yScale = d3.scale.ordinal().domain(d3.range(dataset.length))
		.rangeRoundBands([0, height * 0.9 ]);

	// y轴显示的刻度值
	var yScaleShow = d3.scale.ordinal().domain(dataset.map(function(d) {
		return d[attribute];
	})).rangeRoundBands([0, height * 0.9]);

	// x轴的比例尺
	var max1 = d3.max(dataset, function(d) {
		return parseFloat(d[measure[0]])
	});
	var max2 = d3.max(dataset, function(d) {
		return parseFloat(d[measure[1]])
	});

	// console.log( d3.max( [ max1, max2] ) );

	var xScale = d3.scale.linear().domain(
		[-d3.max([max1, max2]), d3.max([max1, max2])]).range(
		[0, height - padding.top - padding.bottom]);

	// 矩形宽度
	var rectPadding = yScale.rangeBand() / 3;

	// 颜色设计

	function color(i) {
		var colorMeasure = [d3.rgb(255,127,14), d3.rgb(31,119,180)];
		return colorMeasure[i % 2];
	}

	// 定义x轴
	var xAxis = d3.svg.axis().scale(xScale).orient("bottom");

	// 定义y轴
	var yAxis = d3.svg.axis().scale(yScaleShow).orient("left");

	
	
	
	// 添加正向矩形元素
	var rects2 = svg.selectAll(".MyRect2").data(dataset).enter().append("rect")
		.attr("class", "MyRect2").attr("transform",
			"translate(" + padding.left + "," + padding.top + ")")

	.attr("height", yScale.rangeBand() - rectPadding)

	.attr("rx", 4).attr("ry", 4).attr("x", function(d) {
		return xScale(0)
	}).attr("y", function(d, i) {
		return yScale(i);
	}).attr("fill", color(0))

	/*
	 * .attr("width", function(d){ return 0; }) .transition()
	 * .delay(function(d,i){ return i * 100; }) .duration(1000)
	 * .ease("bounce")
	 * 
	 * .attr("width", function(d){ return xScale(d.one) - xScale(0) ;
	 * });
	 */
	.attr("width", function(d) {
		return xScale(d[measure[0]]) - xScale(0);
	})

	.attr("x", function(d) {
		return xScale(0) - (xScale(d[measure[0]]) - xScale(0)) / 2
	}).transition().delay(function(d, i) {
		return i * 200;
	})

	.duration(2000).ease("bounce").attr("x", function(d) {
		return xScale(0)
	});

//	// 添加正向文字元素
//	VAR TEXTS = SVG.SELECTALL(".MYTEXT2").DATA(DATASET).ENTER().APPEND("TEXT")
//		.ATTR("CLASS", "MYTEXT2").ATTR("TRANSFORM",
//			"TRANSLATE(" + PADDING.LEFT + "," + PADDING.TOP + ")")
//		.ATTR("FILL", "BLACK").ATTR("DX", FUNCTION() {
//			RETURN 0;
//		}).ATTR("DY", FUNCTION(D) {
//			RETURN (YSCALE.RANGEBAND() - RECTPADDING / 2) / 2;
//		}).TEXT(FUNCTION(D) {
//			RETURN D[MEASURE[0]];
//		})
//
//	.ATTR("Y", FUNCTION(D, I) {
//		RETURN YSCALE(I);
//	})
//
//	.ATTR("X", FUNCTION(D) {
//		RETURN XSCALE(0)
//	}).TRANSITION().DELAY(FUNCTION(D, I) {
//		RETURN I * 200;
//	})
//
//	.DURATION(2000).EASE("BOUNCE").ATTR("X", FUNCTION(D) {
//		RETURN XSCALE(0) + (XSCALE(D[MEASURE[0]]) - XSCALE(0))
//	});

	// 添加负向矩形元素
	var rects = svg.selectAll(".MyRect1").data(dataset).enter().append("rect")
		.attr("class", "MyRect1").attr("transform",
			"translate(" + padding.left + "," + padding.top + ")")

	.attr("height", yScale.rangeBand() - rectPadding).attr("rx", 4)
		.attr("ry", 4)

	.attr("x", function(d) {
		return xScale(-d[measure[1]])
	}).attr("y", function(d, i) {
		return yScale(i);
	})

	.attr("fill", color(1))

	.attr("width", function(d) {
		return xScale(d[measure[1]]) - xScale(0);
	})

	.attr("x", function(d) {
		return xScale(0) - (xScale(d[measure[1]]) - xScale(0)) / 2
	}).transition().delay(function(d, i) {
		return i * 200;
	})

	.duration(2000).ease("bounce").attr("x", function(d) {
		return xScale(-d[measure[1]])
	});

//	// 添加负向文字元素
//	var texts = svg.selectAll(".MyText1").data(dataset).enter().append("text")
//		.attr("class", "MyText1").attr("transform",
//			"translate(" + padding.left + "," + padding.top + ")")
//		.attr("fill", "black").attr("dx", function() {
//			return -30;
//		}).attr("dy", function(d) {
//			return (yScale.rangeBand() - rectPadding / 2) / 2;
//		}).text(function(d) {
//			return d[measure[1]];
//		})
//
//	.attr("y", function(d, i) {
//		return yScale(i);
//	})
//
//	.attr("x", function(d) {
//		return xScale(0) - (xScale(d[measure[1]]) - xScale(0)) / 2
//	}).transition().delay(function(d, i) {
//		return i * 200;
//	})
//
//	.duration(2000).ease("bounce").attr("x", function(d) {
//		return xScale(-d[measure[1]])
//	});

	// 添加x轴
	svg.append("g").attr("class", "x axis").attr("transform",
			"translate(" + padding.left + "," + (height * 0.9) + ")")
		.call(xAxis);

	// 添加y轴
	svg.append("g").attr("class", "y axis")
		.attr(
			"transform",
			"translate(" + (padding.left + xScale(0)) + "," + 0 + ")").call(yAxis);

	appendLegend(workSpace[1], measure, color);
	//appendLegend(svg, [measure[0], measure[1]], color, width, height);
	// 旁注
	// var legend = svg.selectAll(".legend")
	// .data(measure)
	// .enter().append("g")
	// .attr("class", "legend")
	// .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")";
	// });
	//
	// legend.append("rect")
	// .attr("rx", 4)
	// .attr("ry", 4)
	// .attr("x", width - 18)
	// .attr("width", 18)
	// .attr("height", 18)
	// .style("fill", function(d,i) {
	// return colorMeasure[i];
	// });
	//
	// legend.append("text")
	// .attr("x", width - 24)
	// .attr("y", 9)
	// .attr("dy", ".35em")
	// .style("text-anchor", "end")
	// .text(function(d) { return d; });

}