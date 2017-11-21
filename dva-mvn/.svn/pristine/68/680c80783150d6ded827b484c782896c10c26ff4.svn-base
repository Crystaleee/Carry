/**
 * 面积图：标准面积图，堆积面积图
 */

// 标准面积图
/**
 * 绘制标准面积图
 * @author ligang
 * @time 2016/4/22
 * @version 0.0.1
 */
function BasicArea(workSpace,data,attr,measure) {
	var svg = workSpace[0];
	var width = svg[0][0].clientWidth;
	var height = svg[0][0].clientHeight;
	
	var margin = {top: 20, right: 20, bottom: 30, left: 80};

	var x = d3.scale.linear();
	
	var xScale = d3.scale.ordinal()
                   .rangeBands([0, width - margin.left -margin.right]);
	
	var y = d3.scale.linear()
	          .range([height - margin.bottom - margin.top , 0]);

	var color = d3.scale.category10();

	var xAxis = d3.svg.axis()
	              .scale(xScale)
	              .orient("bottom");

	var yAxis = d3.svg.axis()
	                  .scale(y)
	                  .orient("left");
    
	var lines = [];
	
	var color0 = [];
	
	for(var n=0;n<20;n++)
		color0.push(color(n));	
	
	var keyname=d3.keys(data[0]);
      
	xScale.domain(data.map(function(d) { return d[attr[0]]; }));      
	  
	outerPadding= width - margin.left -margin.right- (data.length-1)*xScale.rangeBand();
	  
	x.range([0, width - margin.left -margin.right - outerPadding]).domain([0,data.length-1]);
	  
    var i = 0,j = 0,minY = data[0][measure[0]],maxY = data[0][measure[0]];

    for(i = 0; i < measure.length; i++)
    {
    	  var currLine = [];
    	  var currMean = d3.mean( data , function(d) { return d[measure[i]]; } );
        for( j=0; j < data.length; j++)
        {   
            currLine.push([ data[j][attr[0]] , parseFloat(data[j][measure[i]]) ]); 
        }
                 
        lines.push({name:measure[i] , line:currLine , mean:currMean});
    }
    
    lines.sort(function (a, b) { return b.mean - a.mean;});
    
    for(i = 0; i < lines.length; i++)
    {
        var currMax = d3.max( lines[i].line , function(d) { return d[1]; } );
      	var currMin = d3.min( lines[i].line , function(d) { return d[1]; } );
      	if( currMax > maxY ) maxY = currMax;
      	if( currMin < minY ) minY = currMin;
    }
	  
      
    y.domain([minY,maxY]);
    
	// 定义区域生成器
	var areaPath = d3.svg.area()
	                     .x(function(d, i) {return x(i);})
	                     .y0(function(d, i) {return y(0);})
	                     .y1(function(d, i) {return y(d[1]);});
    
    var linePath = d3.svg.line()
		                 .x(function(d,i){ return x(i); })
	                     .y(function(d){ return y(d[1]); });
      
    var transX = outerPadding/2+margin.left;
      
    svg.selectAll("path")	//选择<svg>中所有的<path>
      	.data(lines)		//绑定数据
    	.enter()			//选择enter部分
  	    .append("path")		//添加足够数量的<path>元素
  	    .attr("transform","translate(" + transX + "," +  margin.top  +")")
  	    .attr("d", function(d){
  		    return areaPath(d.line);		//返回直线生成器得到的路径
  	    })
  	    .attr("fill",function(d,i){
  	    	return color(i);
  	    })
  	    .attr("stroke-width",1.5)
  	    .attr("stroke",function(d,i){
  		    return color(i);
  	    });
      
    //添加垂直于x轴的对齐线
    var vLine = svg.append("line")
		             .attr("class", "linefocusLine")
	               	 .style("display", "none");
    //添加一个提示框
    var chartNode = $(svg[0][0]).parents(".chart");
    
    var linetooltip = d3.select(chartNode[0])
      				.append("div")
      				.attr("class","linetooltip")
      				.style("opacity",0.0);
      				
    var linetitle = linetooltip.append("div")
      					.attr("class","linetitle");

    var des = linetooltip.selectAll(".des")
      					.data(lines)
      					.enter()
      					.append("div");

    var desColor = des.append("div")
      					.attr("class","desColor");
      					
    var desText = des.append("div")
      					.attr("class","desText");
    //添加一个透明的监视鼠标事件用的矩形
    svg.append("rect")
      	.attr("class","lineoverlay")
      	.attr("x", margin.left)
      	.attr("y", margin.top)
      	.attr("width",width - margin.left - margin.right)
      	.attr("height",height - margin.top - margin.bottom)
      	.on("mouseover", function() { 
      		linetooltip.style("left", (d3.event.clientX + 30) + "px")
      			   .style("top", (d3.event.clientY -15) + "px")
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
    		var data = lines[0].line;
    		
    		//获取鼠标相对于透明矩形左上角的坐标，左上角坐标为(0,0)
    		var mouseX = d3.mouse(this)[0] - margin.left;
    		var mouseY = d3.mouse(this)[1] - margin.top;
    	    
    		//通过比例尺的反函数计算原数据中的值，例如x0为某个年份，y0为GDP值
    		var x0 = x.invert( mouseX );
    		
    		//对x0四舍五入，如果x0是2005.6，则返回2006；如果是2005.2，则返回2005
    		x0 = Math.round(x0);
    	
    		var line0 = [];
    			
    		
    		for(var k=0; k<lines.length; k++ )
    			line0.push({ name: lines[k].name, value: lines[k].line[x0][1]});
    		

    		//设置提示框的标题文字（年份）
    		linetitle.html("<strong>" + lines[0].line[x0][0] + "</strong>");
    		
    		//设置颜色标记的颜色
    		desColor.style("background-color",function(d,i){
    				return color0[i];
    			});
    		
    		//设置描述文字的内容
    		desText.html( function(d,i){
    			return line0[i].name + "\t" + "<strong>" + line0[i].value + "</strong>";
    		});
    		
    		//设置提示框的位置
    		linetooltip.style("left", (d3.event.clientX + 30) + "px")
    				.style("top", (d3.event.clientY - 15) + "px");

    		//获取垂直对齐线的x坐标
    		var vlx = x(x0)+ transX;
    		
    		//设定垂直对齐线的起点和终点
    		vLine.attr("x1", vlx)
    			.attr("y1",margin.top)
    			.attr("x2",vlx)
    			.attr("y2",height - margin.bottom);
    }
      
    svg.append("g")
		 .attr("class","lineaxis")
		 .attr("transform","translate(" + margin.left + "," + (height - margin.bottom + 5) +  ")")
		 .call(xAxis);
			
    svg.append("g")
		 .attr("class","lineaxis")
		 .attr("transform","translate(" + margin.left + "," + (margin.top + 5 ) +  ")")
		 .call(yAxis); 
    
    appendLegend(workSpace[1], measure, color);
}

// 堆积面积图
/**
 * 绘制堆积面积图
 * @author Ruitong Chai & Bohao Wang
 * @time 2016/4/19
 * @version 0.0.1
 */
function StackArea(workSpace,data,attr,measure) 
{	
	var svg = workSpace[0];
	var width = svg[0][0].clientWidth;
	var height = svg[0][0].clientHeight;
	
	var margin = {top: 20, right: 20, bottom: 30, left: 80};

	var x = d3.scale.linear();
	
	var xScale = d3.scale.ordinal()
                   .rangeBands([0, width - margin.left -margin.right]);
	
	var y = d3.scale.linear()
	          .range([height - margin.bottom - margin.top , 0]);

	var color = d3.scale.category10();

	var xAxis = d3.svg.axis()
	              .scale(xScale)
	              .orient("bottom");

	var yAxis = d3.svg.axis()
	                  .scale(y)
	                  .orient("left");
    
	var lines = [];
	
	var color0 = [];
	
	for(var n=0;n<20;n++)
		color0.push(color(n));	
	
	var keyname=d3.keys(data[0]);
      
	xScale.domain(data.map(function(d) { return d[attr[0]]; }));      
	  
	outerPadding= width - margin.left -margin.right- (data.length-1)*xScale.rangeBand();
	  
	x.range([0, width - margin.left -margin.right - outerPadding]).domain([0,data.length-1]);
	  
    var i = 0,j = 0,minY = data[0][measure[0]],maxY = data[0][measure[0]];
    var total=[],preTotal=[];
    for(i=0;i<data.length;i++)
    {
    	total.push(0);
    	preTotal.push(0);
    }

    for(i = 0; i < measure.length; i++)
    {
    	  var currLine = []; 
        for( j=0; j < data.length; j++)
        {   
        	preTotal[j]=total[j];
      	    total[j] = total[j] + parseFloat(data[j][measure[i]]);
            currLine.push([ data[j][attr[0]] , total[j] , preTotal[j] ]); 
        }
        lines.push({name:measure[i] , line:currLine});
    }
      
    for(i = 0; i < lines.length; i++)
    {
        var currMax = d3.max( lines[i].line , function(d) { return d[1]; } );
      	var currMin = d3.min( lines[i].line , function(d) { return d[1]; } );
      	if( currMax > maxY ) maxY = currMax;
      	if( currMin < minY ) minY = currMin;
    }
	  
      
    y.domain([minY,maxY]);
    
	// 定义区域生成器
	var areaPath = d3.svg.area()
	                     .x(function(d, i) {return x(i);})
	                     .y0(function(d, i) {return y(d[2]);})
	                     .y1(function(d, i) {return y(d[1]);});
    
    var linePath = d3.svg.line()
		                 .x(function(d,i){ return x(i); })
	                     .y(function(d){ return y(d[1]); });
      
    var transX = outerPadding/2+margin.left;
      
    svg.selectAll("path")	//选择<svg>中所有的<path>
      	.data(lines)		//绑定数据
    	.enter()			//选择enter部分
  	    .append("path")		//添加足够数量的<path>元素
  	    .attr("transform","translate(" + transX + "," +  margin.top  +")")
  	    .attr("d", function(d){
  		    return areaPath(d.line);		//返回直线生成器得到的路径
  	    })	
  	    .attr("fill",function(d,i){
  	    	return color(i);
  	    })
  	    .attr("stroke-width",1.5)
  	    .attr("stroke",function(d,i){
  		    return color(i);
  	    });
      
    //添加垂直于x轴的对齐线
    var vLine = svg.append("line")
		             .attr("class", "linefocusLine")
	               	 .style("display", "none");
    //添加一个提示框
    var chartNode = $(svg[0][0]).parents(".chart");
    
    var linetooltip = d3.select(chartNode[0])
      				.append("div")
      				.attr("class","linetooltip")
      				.style("opacity",0.0);
      				
    var linetitle = linetooltip.append("div")
      					.attr("class","linetitle");

    var des = linetooltip.selectAll(".des")
      					.data(lines)
      					.enter()
      					.append("div");

    var desColor = des.append("div")
      					.attr("class","desColor");
      					
    var desText = des.append("div")
      					.attr("class","desText");
    //添加一个透明的监视鼠标事件用的矩形
    svg.append("rect")
      	.attr("class","lineoverlay")
      	.attr("x", margin.left)
      	.attr("y", margin.top)
      	.attr("width",width - margin.left - margin.right)
      	.attr("height",height - margin.top - margin.bottom)
      	.on("mouseover", function() { 
      		linetooltip.style("left", (d3.event.clientX + 30) + "px")
      			   .style("top", (d3.event.clientY + 15) + "px")
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
    		var data = lines[0].line;
    		
    		//获取鼠标相对于透明矩形左上角的坐标，左上角坐标为(0,0)
    		var mouseX = d3.mouse(this)[0] - margin.left;
    		var mouseY = d3.mouse(this)[1] - margin.top;
    	    
    		//通过比例尺的反函数计算原数据中的值，例如x0为某个年份，y0为GDP值
    		var x0 = x.invert( mouseX );
    		
    		//对x0四舍五入，如果x0是2005.6，则返回2006；如果是2005.2，则返回2005
    		x0 = Math.round(x0);
    	
    		var line0 = [];
    			
    		
    		for(var k=0; k<lines.length; k++ )
    			line0.push({ name: lines[k].name, value: lines[k].line[x0][1]});
    		

    		//设置提示框的标题文字（年份）
    		linetitle.html("<strong>" + lines[0].line[x0][0] + "</strong>");
    		
    		//设置颜色标记的颜色
    		desColor.style("background-color",function(d,i){
    				return color0[i];
    			});
    		
    		//设置描述文字的内容
    		desText.html( function(d,i){
    			return line0[i].name + "\t" + "<strong>" + line0[i].value + "</strong>";
    		});
    		
    		//设置提示框的位置
    		linetooltip.style("left", (d3.event.clientX + 30) + "px")
    				.style("top", (d3.event.clientY - 15) + "px");

    		//获取垂直对齐线的x坐标
    		var vlx = x(x0)+ transX;
    		
    		//设定垂直对齐线的起点和终点
    		vLine.attr("x1", vlx)
    			.attr("y1",margin.top)
    			.attr("x2",vlx)
    			.attr("y2",height - margin.bottom);
    }
      
    svg.append("g")
		 .attr("class","lineaxis")
		 .attr("transform","translate(" + margin.left + "," + (height - margin.bottom + 5) +  ")")
		 .call(xAxis);
			
    svg.append("g")
		 .attr("class","lineaxis")
		 .attr("transform","translate(" + margin.left + "," + (margin.top + 5 ) +  ")")
		 .call(yAxis); 
    
    appendLegend(workSpace[1], measure, color);
}