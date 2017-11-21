/**
 * 绘制标准气泡图
 * @author chenxiaoji
 * @time 2016/4/22
 * @version 0.0.1
 */
function BasicBubble() {
	var max_x;
	var min_x;
	var data000 = {
		"33": 3,
		"32": 52730,
		"31": 51247,
		"30": 12989,
		"15": 42320,
		"14": 62207,
		"13": 4089,
		"35": 93506,
		"12": 407,
		"34": 59169,
		"9": 67077,
		"29": 68355,
		"8": 90884,
		"28": 4,
		"7": 63195,
		"27": 83743,
		"6": 29880,
		"5": 1862,
		"4": 22485,
		"3": 23,
		"2": 29291,
		"0": 52720,
		"22": 49459,
		"21": 32464,
		"20": 13080,
		"26": 16184,
		"25": 70936,
		"24": 27481,
		"23": 43608,
		"19": 10696,
		"18": 2941,
		"17": 33969,
		"16": 52994
	};

	/*获取并添加svg元素，并设置宽高*/
	var div = d3.select("#bubble")
	var width = 1200;
	var height = 600;
	var tooltip = d3.select("#bubble").append("div")
		.attr("class", "mytooltip")
		.style("opacity", "0.0");
	var svg = div.append("svg")
		.style("width", "100%")
		.style("height", "100%")
		.append("g");

	color = d3.scale.category20(); //设置不同颜色  
	/*布局设置*/
	var bubble = d3.layout.pack() //初始化包图                         
		.sort(null) //后面的数减去前面的数排序，正负都变，null顺序不变  
		.size([width, height]) //设置范围  
		.padding(1.5); //设置间距  

	/*假定后台传入的数据*/
	//var data = {贾嫒: 45494.848, 巩嫒: 16720.788, 余嫒: 26449.724, 梁安: 21023.016, 彭安: 3729.6};  

	/*entries可以将如上类型的格式转换成{key:家园,value:343434}的数组*/
	var result = d3.entries(data000);
	/*以下是字符串拼接*/
	var startString = "{\"name\": \"flare\",\"children\": ["; //开头字符串  
	result.forEach(function(dude) { //遍历result并且拼接  
			startString += "{\"name\":\"" + dude.key + "\",\"size\":" + dude.value + "},";
		})
		/*去除最后一个末尾的逗号，这个逗号会影响后面JSON.parse的使用*/
	startString = startString.substring(0, startString.length - 1);
	/*拼接尾部字符串*/
	startString += "]}";
	/*将拼接好的字符串转换成json对象*/
	var json2 = JSON.parse(startString);
	/*绘图部分*/
	console.log(classes(json2));
	var node = svg.selectAll(".node")
		.data(bubble.nodes(classes(json2)) //绑定数据（配置结点）  
			.filter(function(d) {
				return !d.children;
			})) //数据过滤，满足条件返回自身（没孩子返回自身，有孩子不返回，这里目的是去除父节点）  
		.enter().append("g")
		.attr("class", "node")
		.attr("transform", function(d) {
			return "translate(" + d.x + "," + d.y + ")";
		}); //设定g移动  

	//	node.append("title")
	//		.text(function(d) {
	//			return d.className + ": " + (d.value);
	//		}); //设置移入时候显示数据   数据名和值  

	node.append("circle")
		.attr("r", function(d) {
			return d.r;
		}) //设置圆的半径  
		.style("fill", function(d) {
			return color(d.value);
		})
		.on("mousemove", function(d) {
			tooltip.style("left", (d3.event.clientX - 30) + "px")
				.style("top", (d3.event.clientY + 13) + "px");
		})
		.on("mouseover", function(d) {
			tooltip.style("z-index", 999);
			var tips="类"+d.className+": "+d.value;
			tooltip.html(tips)
				.style("left", (d3.event.clientX - 30) + "px")
				.style("top", (d3.event.clientY + 13) + "px")
				.style("opacity", "0.6")
				.style("font-size", "20px");
		})
		.on("mouseout", function(d, j) {
			tooltip.style("opacity", 0.0);
			tooltip.style("z-index", 0);
			tooltip.style("left", "1000px")
				.style("top", "1000px");
		});

	//	node.append("text")
	//		.attr("dy", ".3em")
	//		.style("text-anchor", "middle") //设置文本对齐  
	//		.text(function(d) {
	//			return d.className.substring(0, d.r / 3);
	//		}); //根据半径的大小来截取对应长度字符串（很重要）  
}
//Returns a flattened hierarchy containing all leaf nodes under the root. 
/**
 * Returns a flattened hierarchy containing all leaf nodes under the root. 
 * @author chengxiaoji
 * @time 2016/4/22
 * @version 0.0.1
 */
function classes(root) {
	var classes = []; //存储结果的数组  
	/*自定义递归函数 
	 * 
	 * 第二个参数指传入的json对象 
	 * */
	function recurse(name, node) {
		if (node.children) //如果有孩子结点 （这里的children不是自带的，是json里面有的）  
		{
			node.children.forEach(function(child) { //将孩子结点中的每条数据  
				recurse(node.name, child);
			})
		} else {
			classes.push({
				className: node.name,
				value: node.size
			})
		}; //如果自身是孩子结点的，将内容压入数组  
	}
	recurse(null, root);
	return {
		children: classes
	}; //返回所有的子节点  （包含在children中）                                                                            
}