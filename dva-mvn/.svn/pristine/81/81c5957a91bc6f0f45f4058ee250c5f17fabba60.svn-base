/**
 * Created by storm on 2016/4/11.
 * 矩形树图
 */

/**
 * 绘制矩形树图
 * @author ligang
 * @time 2016/4/22
 * @version 0.0.1
 */
function TreeMap(workSpace,data,attr,measure) {
	var svg = workSpace[0];
	var width = svg[0][0].clientWidth;
	var height = svg[0][0].clientHeight;

    var treemap = d3.layout.treemap()
				    .size([width, height])
				    .value(function(d){ return d.value; });

    
    var keyname=d3.keys(data[0]);
    
    var root={};
        root.name=attr[0];
        root.children=[];
    var i=0,j=0;
    for( i=0;i<data.length;i++){
        var tmp={};
            tmp.name=data[i][attr[0]];
            tmp.children=[];
        for(j=0;j<measure.length;j++){
            tmp.children.push({name:keyname[j],value:parseFloat(data[i][keyname[j]])});
        }
        root.children.push(tmp);
    }
    
    console.log(root);
    
    
	var nodes = treemap.nodes(root);
	var links = treemap.links(nodes);
	
	
	var color = d3.scale.category10();

	var groups = svg.selectAll("g")
					.data(nodes.filter(function(d){ return !d.children; }))
					.enter()
					.append("g");
					
	var rects = groups.append("rect")
					.attr("class","nodeRect")
					.attr("x",function(d){ return d.x; })
					.attr("y",function(d){ return d.y; })
					.attr("width",function(d){ return d.dx; })
					.attr("height",function(d){ return d.dy; })
					.style("fill",function(d,i){ return color(d.parent.name); });

	var texts = groups.append("text")
	                  .attr("class","nodeName")
	                  .attr("x",function(d){ return d.x; })
	                  .attr("y",function(d){ return d.y; })
	                  .attr("dx","0.2em")
	                  .attr("dy","1.1em")
	                  .text(function(d){ 
	                      if(d.dx<15||d.dy<15);
	                      else
		                      return d.name[0]+d.name[1]; 
	                  });
    svg.selectAll(".parentName")
	   .data(nodes.filter(function(d){if(d.x==0&d.y==0);else return d.children; }))
	   .enter()
	   .append("g")
	   .append("text")
	   .attr("class","parentName")
	   .attr("x",function(d){ return d.x+d.dx/1.1; })
	   .attr("y",function(d){ return d.y+d.dy/1.05; })
	   .attr("fill","white")
	   .style("text-anchor", "end")
	   .text(function(d){ 
		    return d.name; 
	   });
   
}