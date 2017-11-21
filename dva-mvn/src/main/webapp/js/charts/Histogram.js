/**
 * 直方图: 标准柱状图，堆积柱状图
 * Created by storm on 2016/4/11.
 */

// 标准柱状图
/**
 * 绘制标准柱状图
 * @author ligang
 * @time 2016/4/22
 * @version 0.0.1
 */
function BasicHist(workSpace,data,attr,measure) {
	
	var margin = {top: 20, right: 20, bottom: 30, left: 40};
	
	var svg = workSpace[0];
	var width = svg[0][0].clientWidth - margin.left - margin.right;
	var height = svg[0][0].clientHeight - margin.top - margin.bottom;
    
	//如需添加颜色，请在这更改
    var colorArray = d3.scale.category10().range();

    //定义比例尺x,y,color和横纵坐标
    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width]);

    var y = d3.scale.linear()
        .rangeRound([height, 0]);
    
    var y1 = d3.scale.linear()
        .rangeRound([0,height]);

    var color = d3.scale.ordinal()
        .range(colorArray);
    
	var color0 = [];
	
	for(var n=0;n<10;n++)
		color0.push(color(n));

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y1)
        .orient("left")
        .tickFormat(d3.format(".3s"));

    var keyname = d3.keys(data[0]);

    //确定比例尺x的定义域
    x.domain(data.map(function (d) {
        return d[attr[0]];
    }));
    
    console.log(x.domain());
    
    //rects是存储矩形长度的一维数组
    var rects = [], i = 0, j = 0, len = measure.length, 
        max_y = data[0][measure[0]], min_y = data[0][measure[0]];

    for (i = 0; i < data.length; i++) {
        for (j = 0; j < len; j++) {
            var num = parseFloat(data[i][measure[j]]);
            if (max_y < num)
                max_y = num;
            if (min_y > num)
                min_y = num;
            rects.push(num);
        }
    }
    
    console.log(rects);
    
      //用于显示提示框数据
	  var bars=[];
	  var keyname=d3.keys(data[0]);
	  
      for(var i = 0; i < measure.length; i++)
      {
    	  var currBars = []; 
          for( var j=0; j < data.length; j++)
          {
              currBars.push([ data[j][attr[0]] , parseFloat(data[j][measure[i]]) ]); 
          }
          bars.push({name:measure[i] , bar:currBars});
      }

    //确定比例尺y的定义域
    y.domain([1.1*max_y + 10, 0.1*min_y]);
    y1.domain([1.1*max_y + 10, 0.1*min_y]);

    //确定矩形的宽度
    var width_rect = x.rangeBand() / len;
    
    //绘制矩形
    svg.selectAll("rect")
        .data(rects)
        .enter()
        .append("rect")
        .attr("class", "rect")
        .attr("x", function (d, i) {
            return x(data[Math.ceil((i + 1) / len) - 1][attr[0]]) + i % len * width_rect;
        })
        .attr("y", function (d, i) {
            return height - margin.top - y(d);
        })
        .attr("transform","translate(" + margin.left + "," +  margin.top  +")")
        .attr("width", x.rangeBand() / len)
        .attr("height", function (d, i) {
            return y(d);
        })
        .style("fill", function (d, i) {
            return color(measure[i % len]);
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
      	.attr("width",width + margin.left + margin.right)
      	.attr("height",height + margin.top + margin.bottom)
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
    		var mouseX = d3.mouse(this)[0] - margin.left;
    		
    		console.log(mouseX);
    		console.log(x.rangeBand());
    		
    		var x0 =  Math.ceil(mouseX/x.rangeBand())-1;
    		
    		console.log(x0);
    		
    		var bar0 = [];
			
    		
    		for(var k=0; k<bars.length; k++ )
    			bar0.push({ name: bars[k].name, value: bars[k].bar[x0][1]});
    		

    		//设置提示框的标题文字（年份）
    		linetitle.html("<strong>" + data[x0][attr[0]] + "</strong>");
    		
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
    		var vlx = x(data[x0][attr[0]])+ margin.left + x.rangeBand()/2;
    		
    		//设定垂直对齐线的起点和终点
    		vLine.attr("x1", vlx)
    			.attr("y1",0)
    			.attr("x2",vlx)
    			.attr("y2",height);
    }
    
    //绘制x轴,y轴
    svg.append("g")
       .attr("class", "x axis")
	   .attr("transform", "translate("+ margin.left + "," + height + ")")
       .call(xAxis);

    svg.append("g")
       .attr("class", "lineaxis")
       .attr("transform","translate(" + margin.left + "," + "0" +  ")")
       .call(yAxis)
       
    appendLegend(workSpace[1], measure, color);   
}

// 堆积柱状图
/**
 * 绘制堆积柱状图
 * @author ligang
 * @time 2016/4/22
 * @version 0.0.1
 */
function StackHist(workSpace,data,attr,measure)
{
	var svg = workSpace[0];
	var width = svg[0][0].clientWidth;
	var height = svg[0][0].clientHeight;
    //矩形着色的数组
	var colorArray=d3.scale.category10().range();//如需添加颜色，请在这更改

	var margin = {top: 20, right: 20, bottom: 30, left: 40};
	    width = width - margin.left - margin.right;
	    height = height - margin.top - margin.bottom;

	var x = d3.scale.ordinal()
	    .rangeRoundBands([0, width]);

	var y = d3.scale.linear()
	    .rangeRound([height, 0]);

	//矩形着色的比例尺
	var color = d3.scale.ordinal()
	    .range(colorArray);
	
	var color0 = [];
	
	for(var n=0;n<10;n++)
		color0.push(color(n));

	var xAxis = d3.svg.axis()
	    .scale(x)
	    .orient("bottom");

	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left")
	    .tickFormat(d3.format(".3s"));
 
	  var bars=[];
	  //设置文件第一行为对象的属性名
	  var keyname=d3.keys(data[0]);
      for(var i = 0; i < measure.length; i++)
      {
    	  var currBars = []; 
          for( var j=0; j < data.length; j++)
          {
              currBars.push([ data[j][attr[0]] , parseFloat(data[j][measure[i]]) ]); 
          }
          bars.push({name:measure[i] , bar:currBars});
      }
	  
	  //着色比例尺中不包含第一列属性名
	  color.domain(measure);

	  var local_data=[];
	  for(var i=0;i<data.length;i++)
	  {
		  var temp={}
		  temp[attr[0]]=data[i][attr[0]];
	      for(var j=0;j<measure.length;j++)
	      {
	          temp[measure[j]]=data[i][measure[j]];
	      }
	      local_data.push(temp);
	  }
	  
	  console.log("this is local_data!")
	  console.log(local_data);
	  
	  //产生矩形的纵坐标
	  local_data.forEach(function(d) {
	    var y0 = 0;
	    d.ages = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
	    d.total = d.ages[d.ages.length - 1].y1;
	  });
	  
	  local_data.sort(function(a, b) { return b.total - a.total; })

	  x.domain(data.map(function(d) { return d[attr[0]]; }));
	  y.domain([0, d3.max(local_data, function(d) { return d.total; })]);

	  var state = svg.selectAll("."+attr[0])
	      .data(local_data)
	      .enter().append("g")
	      .attr("class", "g")
	      .attr("transform",function(d) { 
	    	  var transX = margin.left + x(d[attr[0]]); 
	    	  return "translate(" + transX + "," + margin.top +")"; });//与堆叠矩形的横坐标相关
      
	  //绘制矩形
	  state.selectAll("rect")
	      .data(function(d) { return d.ages; })
	      .enter().append("rect")
	      .attr("width", x.rangeBand())
	      .attr("y", function(d) { return y(d.y1); })
	      .attr("height", function(d) { return y(d.y0) - y(d.y1); })
	      .style("fill", function(d) { return color(d.name); });
	  
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
	      	.attr("width",width + margin.left + margin.right)
	      	.attr("height",height + margin.top + margin.bottom)
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
	    		var mouseX = d3.mouse(this)[0] - margin.left;
	    		
	    		var x0 =  Math.ceil(mouseX/(x.rangeBand()+0.1))-1;
	    		
	    		
	    		var bar0 = [];
    			
	    		
	    		for(var k=0; k<bars.length; k++ )
	    			bar0.push({ name: bars[k].name, value: bars[k].bar[x0][1]});
	    		

	    		//设置提示框的标题文字（年份）
	    		linetitle.html("<strong>" + data[x0][attr[0]] + "</strong>");
	    		
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
	    		var vlx = x(data[x0][attr[0]])+ margin.left + x.rangeBand()/2;
	    		
	    		//设定垂直对齐线的起点和终点
	    		vLine.attr("x1", vlx)
	    			.attr("y1",margin.top)
	    			.attr("x2",vlx)
	    			.attr("y2",height + margin.top);
	    }
	  
	  var transY = height + margin.top;
	  svg.append("g")
         .attr("class", "x axis")
         .attr("transform", "translate(" + margin.left + "," + transY + ")")
         .call(xAxis);

      svg.append("g")
         .attr("class", "y axis")
         .attr("transform", "translate(" + margin.left + "," + margin.top +")")
         .call(yAxis);
      color.domain([]);
      appendLegend(workSpace[1], measure, color);
      data.forEach(function (d) {
          delete d.ages;
          delete d.total;
      });
}
