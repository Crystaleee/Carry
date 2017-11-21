/**
 * 散点图：标准散点图，时间坐标散点图，时间轴散点
 */

/**
 * 绘制标准散点图
 * @author ligang
 * @time 2016/4/22
 * @version 0.0.1
 */
function BasicScatter(workSpace,data,attr,measure) {
    //默认第一列为属性列对应颜色维度、第二、三列对应x,y坐标、第四列对应颜色深浅的维度
	var svg = workSpace[0];
	var width = svg[0][0].clientWidth;
	var height = svg[0][0].clientHeight;
	
	var margin = {top: 20, right: 20, bottom: 30, left: 40},
                 width = width - margin.left - margin.right,
                 height = height - margin.top - margin.bottom;

    //定义比例尺x,y,z,color和横纵坐标

    var x = d3.scale.linear()
            .range([0, width]);

    var y = d3.scale.linear()
            .range([height, 0]);

    var color=d3.scale.category20();

    var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

    var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left")
                .tickFormat(d3.format(".3s"));

  
    var keyname=d3.keys(data[0]);
  
  
    //查找attr[0]对应属性的不同值
    var distinct0=[],tmp=[];
    var tag=0,i=0,j=0,n=0;
  
    for(i=0;i<data.length;i++)
    {
	  tag=0;
	  for(j=i;j>=0;j--)
	  {
		  if(j==i);
		  else if(data[i][attr[0]]==data[j][attr[0]])
				  tag=1;
	  }
	  if(tag==0)
	      distinct0.push(data[i][attr[0]]);
    }
  
  
    var z0=[],max=0,min=0;
  
    if(distinct0.length>20)
          n=20;
    else
	      n=distinct0.length;
  
	  for(i=0;i<20;i++)
	  {
		  tag=0;
		  for(j=0;j<data.length;j++)
		  {
			 if(data[j][attr[0]]==distinct0[i])
			 {
				var cx=parseFloat(data[j][measure[0]]),cy=parseFloat(data[j][measure[1]]),z=parseFloat(data[j][measure[2]]);
			    tmp.push([data[j][attr[0]],cx,cy,z]);
			    if(tag==0)
			    {
			      max=z;
			      min=z;
			      tag=1;
			    }
			    else
			    {
			      if(z>max)
			    	max=z;
			      if(z<min)
			    	min=z;
			    }
			 }
		  }
		 z0.push([distinct0[i],min,max]);
	  }
  
  //在tmp中加入z的最值
   for(i=0;i < z0.length;i++)
	  for(j=0;j < tmp.length;j++)
	  {
		  if(z0[i][0]==tmp[j][0])
		  {
		      tmp[j].push(z0[i][1]);
		      tmp[j].push(z0[i][2]);
		  }
	  }
  
    //确定比例尺的定义域
    x.domain([0.9*d3.min( tmp,function(d){ return d[1];} ),1.1*d3.max( tmp,function(d){ return d[1]; } )]);
    y.domain([0.9*d3.min( tmp,function(d){ return d[2]; } ),1.1*d3.max( tmp,function(d){ return d[2]; } )]);
  
    var transX = margin.left;
    var transY = - margin.top;
    //绘制点
    svg.selectAll("circle")
      .data(tmp)
      .enter()
      .append("circle")
      .attr("opacity",function(d){
    	  return 0.5*(d[3]-d[4])/(d[5]-d[4])+0.5;
      })
       .attr("fill",function(d){
      	  return color(d[0]);
      })
      .attr("transform","translate(" + transX + "," +  -transY  +")")
      .attr("cx",function(d){
    	  return  x(d[1]);
      })
      .attr("cy",function(d){
    	  return  y(d[2]);
      })
      .attr("r",5);
  
    var transAxis = height + margin.top;
    //绘制x轴,y轴
    svg.append("g")
       .attr("class", "lineaxis")
       .attr("transform", "translate("+ transX +"," + transAxis + ")")
       .call(xAxis);

    svg.append("g")
       .attr("class", "lineaxis")
       .attr("transform", "translate("+ transX +"," + -transY + ")")
       .call(yAxis);
    
    appendLegend(workSpace[1], getAttrFromData(data,attr), color);

}


/**
 * 绘制时间坐标散点图
 * @author ligang
 * @time 2016/4/22
 * @version 0.0.1
 */
function TimeCoorScatter(workSpace,data,attr,measure) {
	//第一列对应颜色维度，第二列对应时间维度，第三四列对于x,y坐标
	var svg = workSpace[0];
	var width = svg[0][0].clientWidth;
	var height = svg[0][0].clientHeight;
	
	var margin = {top: 20, right: 20, bottom: 30, left: 40};
    width = width - margin.left - margin.right;
    height = height - margin.top - margin.bottom;
    
    //用于调整相对位置
    var transX = margin.left;
    var transY = - margin.top;
    var transAxis = height + margin.top;

    //定义比例尺x,y,z,color和横纵坐标

    var x = d3.scale.linear()
    .range([0, width]);

    var y = d3.scale.linear()
    .range([height, 0]);

    var color=d3.scale.category20();

    var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

    var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".3s"));

  
    var keyname=d3.keys(data[0]);
  

  
   //查找Keyname[0]对应属性的不同值
   var distinct0=[],distinct1=[],tmp=[];
   var tag0=0,i=0,j=0;
  
   for(i=0;i<data.length;i++)
   {
	  tag0=0;
	  for(j=i;j>=0;j--)
	  {
		  if(j==i);
		  else
		  { 
			  if(data[i][attr[0]]==data[j][attr[0]])
				  tag0=1;
		  }
	  }
	  if(tag0==0)
	      distinct0.push(data[i][attr[0]]);
   }
  

  
  //复制
	  for(i=0;i<20;i++)
	  {
		  for(j=0;j<data.length;j++)
		  {
			 if(data[j][attr[0]]==distinct0[i])
			 {
				var t=data[j][attr[1]],cx=parseFloat(data[j][measure[0]]),cy=parseFloat(data[j][measure[1]]);
			    tmp.push([data[j][attr[0]],t,cx,cy]);
			 }
		  }
	  }
  
	  
  //获取tmp中keyname[1]属性的唯一值
  for(i=0;i<tmp.length;i++){
	  tag0=0;
	  for(j=i;j>=0;j--){
		  if(j==i);
		  else if(tmp[i][1]==tmp[j][1])
				  tag0=1;
	  }
	  if(tag0==0)
	      distinct1.push(tmp[i][1]);
  }
  
  
  //为tmp和distinct1排序
  for(i=1;i<tmp.length;i++){
	  for(j=i;j>=1;j--){
		  var el=[];
		  if(parseFloat(tmp[j][1])<parseFloat(tmp[j-1][1])){
			 el=tmp[j];
			 tmp[j]=tmp[j-1];
			 tmp[j-1]=el;
		  }
	  }
  }
  
  for(i=1;i<distinct1.length;i++){
	  for(j=i;j>=1;j--){
		  var el=[];
		  if(parseFloat(distinct1[j])<parseFloat(distinct1[j-1])){
			 el=distinct1[j];
			 distinct1[j]=distinct1[j-1];
			 distinct1[j-1]=el;
		  }
	  }
  }
  
  
  //确定比例尺的定义域
  x.domain([0.9*d3.min( tmp,function(d){ return d[2];} ),1.1*d3.max( tmp,function(d){ return d[2]; } )]);
  y.domain([0.9*d3.min( tmp,function(d){ return d[3]; } ),1.1*d3.max( tmp,function(d){ return d[3]; } )]);
  
  svg.append("text")
     .attr("class","scatter")
     .attr("x",width/2)
     .attr("y", 0)
     .attr("dy","0.8em")
     .attr("fill","black")
     .attr("font-size","20")
     .attr("font-weight","bold")
     .style("text-anchor", "middle");
  
  svg.append("text").attr("class","label1");
  
  function drawScat(center,text0,m){
  //获取update部分
  var updateScat = svg.selectAll("circle")
					.data(center);
	
  //获取enter部分
  var enterScat = updateScat.enter();
	
  //获取exit部分
  var exitScat = updateScat.exit();
  
//获取update部分
  var updateText = svg.selectAll(".label1")
					.data(center);
	
  //获取enter部分
  var enterText = updateText.enter();
	
  //获取exit部分
  var exitText = updateText.exit();
  
  //更新标题
  var updateTitle = svg.selectAll(".scatter")
  .data(text0);
  
  updateTitle.transition().duration(500)
            .attr("x",width/2)
            .attr("y", 0)
            .attr("dy","0.8em")
            .attr("fill","black")
            .attr("font-size","20")
            .attr("font-weight","bold")
            .style("text-anchor", "middle")
            .text(text0[m]);
  

  //处理update部分，使用过度方式
  updateScat.transition().duration(500)
            .attr("cx",function(d){
            	return  x(d[2]);
            })
            .attr("cy",function(d){
            	return  y(d[3]);
            })
            .attr("transform","translate(" + transX + "," +  -transY  +")");
            
  //enter部分处理办法
  enterScat.append("circle")
           .attr("fill",function(d){
      	       return color(d[0]);
           })
           .attr("cx",0)
           .attr("cy",height)
           .attr("transform","translate(" + transX + "," +  -transY  +")")
           .attr("r",5)
           .transition()
           .duration(1000)
           .attr("cx",function(d){
    	       return  x(d[2]);
           })
           .attr("cy",function(d){
    	       return  y(d[3]);
           })
           .attr("transform","translate(" + transX + "," +  -transY  +")");
  //exit部分
  exitScat.transition().duration(500)
          .attr("fill","white")
          .remove();
  
//处理update部分，使用过度方式
  updateText.transition().duration(500)
  	        .attr("class","label1")
            .attr("x",function(d){
            	return  x(d[2]);
            })
            .attr("y",function(d){
            	return  y(d[3]);
            })
            .attr("transform","translate(" + transX + "," +  -transY  +")")
            .text(function(d){
            	return d[0];
            });
            
  //enter部分处理办法
  enterText.append("text")
           .attr("x",0)
           .attr("y",height)
           .attr("transform","translate(" + transX + "," +  -transY  +")")
           .transition()
           .duration(1000)
           .attr("class","label1")
           .attr("x",function(d){
    	       return  x(d[2]);
           })
           .attr("y",function(d){
    	       return  y(d[3]);
           })
           .attr("transform","translate(" + transX + "," +  -transY  +")")
           .text(function(d){
            	return d[0];
            });
           
  //exit部分
  exitText.transition().duration(500)
          .attr("fill","white")
          .remove();
  
  }
  
  
  //用于重绘定时
    var m=0,n=0,timeID=null;
    var localTmp=[];
  
  
	function display()
	{
		timeID=setInterval(delay, 1000);
	}
    		
	function delay()
	{   
		if(m==distinct1.length)
			m=0;
	    if(m<distinct1.length)
	    {   
		    for(n=0;n<tmp.length;n++)
		    {
			    if(tmp[n][1]==distinct1[m])
			    {
			    	localTmp.push(tmp[n]);	
			    }
			    
		    }
		    drawScat(localTmp,distinct1,m);
		    m++;
		    localTmp=[];
	    }
	    else
	    {
	    	clearInterval(timeID);
	    }
	}
   
	
	
	
    //绘制x轴,y轴
    svg.append("g")
    .attr("class", "lineaxis")
    .attr("transform", "translate("+ transX +"," + transAxis + ")")
    .call(xAxis);

    svg.append("g")
    .attr("class", "lineaxis")
    .attr("transform", "translate("+ transX +"," + -transY + ")")
    .call(yAxis);
  
  
  
  //设置鼠标点击事件
  var stop=0,mPre=0,ac=0,preID=-1;
  d3.select("svg").on("click",function(){
	  if(stop==0){
		  if(ac==1)
			 mPre= preID;
		  ac=0;
		  m=mPre;
		  display();
		  stop=1;
	  }
	  else{
		  stop=0;
		  mPre=m;
		  m=distinct1.length+1;
	  }
		  
	  });
  //绘制图表
  /*
    while (svg[0][0].firstChild) 
    {
        svg[0][0].removeChild(svg[0][0].firstChild);
    }
    height = (distinct1.length + 1) * 15 / svg[0][0].clientHeight * 100;

    svg.style("height", height + "%");
    
    */
  
  for(i=0;i<distinct1.length;i++)
  {
      svg.append("rect")
         .attr("id",i)
         .attr("x", width - 100)
         .attr("y", 9+(i-1)*15)
         .attr("transform","translate(" + "0" + "," +  margin.top  +")")
         .attr("width", 100)
         .attr("height",15)
         .style("fill",color(distinct1[i]))
         .on("click",function(){
        	 preID=parseInt(this.id);
        	 for(n=0;n<tmp.length;n++)
			    {
				    if(tmp[n][1]==distinct1[parseInt(this.id)])
				    {
				    	localTmp.push(tmp[n]);	
				    }
				    
			    }
			    drawScat(localTmp,distinct1,i);
			    localTmp=[];
			    m=distinct1.length+1;
			    stop=1;
			    ac=1;
         });
      svg.append("text")
         .attr("x", width - 50)
         .attr("y", 9+(i-1)*15)
         .attr("transform","translate(" + "0" + "," +  margin.top  +")")
         .attr("dy","0.8em")
         .attr("fill","white")
         .attr("font-size","15")
         .attr("font-weight","bold")
         .style("text-anchor", "start")
         .text(distinct1[i]);
  }
  
}

// 时间轴散点
function TimelineScatter() {

}
