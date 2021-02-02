var width = 1200,height = 1000;
 
data = []
d3.csv("burrito_data.csv", function(d) {
  return {
	location: d.Location,
	burrito: d.Burrito,
	cost: +d.Cost,
	tortilla: +d.Tortilla,
	temp: +d.Temp,
	fillings: +d['Meat:filling'],
	overall: +d.overall,
	guac: d.Guac,
	cheese: d.Cheese};
  }).then(function(d) {
		data = d;
		drawData()
  });


function drawData(){

var fillingScale = d3.scaleLinear()
                  .domain([0,5])
                  .range([25, 45]);
// legends
var s_svg = d3.select('#legends1')
                .append('svg')
                .attr('width', width)
                .attr('height', 100);

d = [1,2,3,4,5];

var s_burrito = s_svg.selectAll('g')
        .data(d).enter().append('g')
        .attr('transform', function(d, i) {
          var x = 300 + i * 120;
          var y = 10;
          return 'translate(' + [x, y] +')';
        })
		
var s_tortilla = s_burrito.append('circle')
	  .attr('cx', 30)
      .attr('cy', 30)
      .attr('r', 35)
      .attr('fill', 'beige')
	  .style('stroke', 'black')
	  .attr('stroke-width', 2);

var s_filling = s_burrito.append('circle')
				.attr('cx', 30)
				.attr('cy', 30)
				.attr('r', function(d) {
					return 15 + 2 * d;
				})
				.attr('fill', 'brown');

var filling_Text = s_burrito.append('text')
		.attr('y', 80)
      	.style('font-size', 14)
      	.text(function(d) {return "Filling rating: "+d;}
        );
		
// legend 2	
var s_svg1 = d3.select('#legends2')
                .append('svg')
                .attr('width', width)
                .attr('height', 100);
demo1 = [2,4];
var s_burrito1 = s_svg1.selectAll('g')
        .data(demo1).enter().append('g')
        .attr('transform', function(d, i) {
          var x = 450 + i * 120;
          var y = 10;
          return 'translate(' + [x, y] +')';
        })		
var s_tortilla1 = s_burrito1.append('circle')
	  .attr('cx', 30)
      .attr('cy', 30)
      .attr('r', 35)
      .attr('fill', 'beige')
	  .style('stroke', d => d >= 3 ? 'red' : 'blue')
	  .attr('stroke-width', 2);
var filling_Text1 = s_burrito1.append('text')
		.attr('y', 80)
      	.style('font-size', 14)
      	.text(function(d) {
			if (d>=3) return "Temp rating: Hot";
			else return  "Temp rating: Cold";}
        );
		
// legend 3
pathGuac = ['M0 0','C20 20 20 50 0 50','C-20 50 -20 20 0 0'];
var s_svg2 = d3.select('#legends3')
                .append('svg')
                .attr('width', width)
                .attr('height', 100);
demo2 = ["Yes","No"];
var s_burrito2 = s_svg2.selectAll('g')
        .data(demo2).enter().append('g')
        .attr('transform', function(d, i) {
          var x = 450 + i * 120;
          var y = 10;
          return 'translate(' + [x, y] +')';
        });		
var s_tortilla2 = s_burrito2.append('circle')
	  .attr('cx', 30)
      .attr('cy', 30)
      .attr('r', 35)
      .attr('fill', 'beige')
	  .style('stroke','blue')
	  .attr('stroke-width', 2);	  
var s_guac = s_burrito2.append('path')
        .attr('fill', d => d == 'Yes' ? 'green' : 'transparent')
        .attr('stroke', d => d == 'Yes' ? 'green' : 'transparent')
        .attr('stroke-width', 1)
        .attr('d', pathGuac);		
var guac_Text = s_burrito2.append('text')
		.attr('y', 80)
      	.style('font-size', 14)
      	.text(function(d) {
			if (d=="Yes") return "Guacamole: Present";
			else return "Guacamole: Absent";}
        );

// legend 4
pathCheese3 = ['M15 20', 'L40 45', 'M20 15', 'L45 40',
		'M20 50','L45 20','M15 45','L40 15' ];
var s_svg3 = d3.select('#legends4')
                .append('svg')
                .attr('width', width)
                .attr('height', 100);
var s_burrito3 = s_svg3.selectAll('g')
        .data(demo2).enter().append('g')
        .attr('transform', function(d, i) {
          var x = 450 + i * 120;
          var y = 10;
          return 'translate(' + [x, y] +')';
        });		
var s_tortilla3 = s_burrito3.append('circle')
	  .attr('cx', 30)
      .attr('cy', 30)
      .attr('r', 35)
      .attr('fill', 'beige')
	  .style('stroke','blue')
	  .attr('stroke-width', 2);	 
var s_filling3 = s_burrito3.append('circle')
		.attr('cx', 30)
		.attr('cy', 30)
		.attr('r', 25)
		.attr('fill', 'brown');
var cheese3 = s_burrito3.append('path')
		.attr('fill', d => d == 'Yes' ? 'yellow' : 'transparent')
        .attr('stroke', d => d == 'Yes' ? 'yellow' : 'transparent')
        .attr('stroke-width', 1)
        .attr('d', pathCheese3);
var cheese_Text = s_burrito3.append('text')
		.attr('y', 80)
      	.style('font-size', 14)
      	.text(function(d) {
			if (d=="Yes") return "Cheese: Present";
			else return "Cheese: Absent";}
        );



// main diagram
var svg = d3.select('#graphics')
                .append('svg')
                .attr('width', width)
                .attr('height', height);
				

var burrito = svg.selectAll('g')
        .data(data).enter().append('g')
        .attr('transform', function(d, i) {
          var x = 50 + (i % 4) * 300;
          var y = 50 + Math.floor(i / 4) * 180;
          return 'translate(' + [x, y] +')';
        })

var tortilla = burrito.append('circle')
	  .attr('cx', 50)
      .attr('cy', 50)
      .attr('r', 55)
      .attr('fill', 'beige')
	  .style('stroke', d => d.temp >= 3 ? 'red' : 'blue')
	  .attr('stroke-width', 2);

pathGuac = ['M0 0','C20 20 20 50 0 50','C-20 50 -20 20 0 0'];

var filling = burrito.append('circle')
		.attr('cx', 50)
        .attr('cy', 50)
		.attr('r', function(d) {
            return fillingScale(d['fillings']);
        })
        .attr('fill', 'brown');

pathCheese = ['M25 35', 'L60 70', 'M35 25', 'L70 60',
		'M35 75','L70 35','M25 65','L60 25' ];

var cheese = burrito.append('path')
		.attr('fill', d => d.cheese == 'Yes' ? 'yellow' : 'transparent')
        .attr('stroke', d => d.cheese == 'Yes' ? 'yellow' : 'transparent')
        .attr('stroke-width', 3)
        .attr('d', pathCheese);

var guac = burrito.append('path')
        .attr('fill', d => d.guac == 'Yes' ? 'green' : 'transparent')
        .attr('stroke', d => d.guac == 'Yes' ? 'green' : 'transparent')
        .attr('stroke-width', 1)
        .attr('d', pathGuac);

var location_Text = burrito.append('text')
		.attr('y', 130)
      	.style('font-size', 16)
		.style('font-weight','bold')
      	.text(function(d) {return "Location : "+d.location;}
        );
var burrito_Text = burrito.append('text')
		.attr('y', 150)
      	.style('font-size', 14)
      	.text(function(d) {return d.burrito;}
        );
		
}