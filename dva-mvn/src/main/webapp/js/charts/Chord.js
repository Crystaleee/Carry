/**
 * 弦图
 */

function Chord(workSpace, data) {
	var svg = workSpace[0];
	removeLegendPanel(workSpace);
	var width = svg[0][0].clientWidth;
	var height = svg[0][0].clientHeight;
	//预处理，格式转换
	data[0].content.forEach(function(e) {
		e.source = parseInt(e.source);
		e.target = parseInt(e.target);
		e.value = parseFloat(e.value);
	});
	var links = clone(data[0].content);
	var nodes = [];
	if (data[1] != null) {
		nodes = data[1].content;
		nodes.forEach(function(e) {
			e.group = parseInt(e.group);
		});
	} else {
		var indexs = [];
		data[0].content.forEach(function(e) {
			indexs.push(e.target);
			indexs.push(e.source);
		});
		for (var i = 0; i <= d3.max(indexs); i++) {
			nodes.push({
				name: i
			});
		}
	}

	var cluster = d3.layout.cluster()
		.size([360, Math.min(width, height) / 2])
		.separation(function(a, b) {
			return 1;
		});

	var bundle = d3.layout.bundle();
	var nodeParent = {
		name: "",
		children: nodes
	};
	nodes = cluster.nodes(nodeParent);
	nodes.splice(0, 1);
	links.forEach(function(e) {
		e.source = nodes[e.source];
		e.target = nodes[e.target];
	});
	links = bundle(links);
	var line = d3.svg.line.radial()
		.interpolate("bundle")
		.tension(.85)
		.radius(function(d) {
			return d.y;
		})
		.angle(function(d) {
			return d.x / 180 * Math.PI;
		});

	var gBundle = svg.append("g");
//		.attr("transform",
//			"translate(" + (width / 2) + "," + (height / 2) + ")");
	var color = d3.scale.category20c(); //颜色比例尺
	var link = gBundle.selectAll(".link")
		.data(links)
		.enter()
		.append("path")
		.attr("class", "link")
		.attr("d", line)
		.on("mouseover", function() {
			d3.select(this).style({
				stroke: "blue"
			});
			console.log(d3.select(this));
		}).on("mouseout", function() {
			d3.select(this).style({
				stroke: "#999"
			});
		}); //使用线段生成器

	gBundle.selectAll(".node")
		.data(nodes)
		.enter().append("svg:g")
		.attr("class", "node")
		.attr("transform", function(d) {
			return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")";
		})
		.append("svg:text")
		.attr("dx", function(d) {
			return d.x < 180 ? 8 : -8;
		})
		.attr("dy", ".31em")
		.attr("text-anchor", function(d) {
			return d.x < 180 ? "start" : "end";
		})
		.attr("transform", function(d) {
			return d.x < 180 ? null : "rotate(180)";
		})
		.text(function(d) {
			return d.name;
		})
		.style("stroke", "#7C7C7C");
	autoSize(gBundle, workSpace);
}