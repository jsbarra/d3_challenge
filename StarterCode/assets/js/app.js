// @TODO: YOUR CODE HERE!

var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Append an SVG group that will hold our chart, and shift the 
// latter by left and top margins.

var svg = d3.select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var group_chart = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

// Import Data
d3.csv("data/data.csv").then(function(data) {


  // Step 1: Parse Data
   
  data.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
  });

  // Step 2: Create scale functions

  var xLinearScale = d3.scaleLinear().range([0, width]);
  var yLinearScale = d3.scaleLinear().range([height, 0]);

  // Step 3: Create axis functions

  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);



  // Step 4: Append Axes to the chart

  group_chart.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  group_chart.append("g")
    .call(leftAxis);

   // Step 5: Circles
  
  var circlesGroup = group_chart.selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", d => xLinearScale(d.healthcare +1.5))
  .attr("cy", d => yLinearScale(d.poverty +0.3))
  .attr("r", "12")
  .attr("fill", "blue")
  .attr("opacity", .7)

  
  // Step 6: Tool Tip
  
  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (abbr + '%');
      });

  // Step 7: Create tooltip in the chart
  
  chartGroup.call(toolTip);

  
  circlesGroup.on("click", function(data) {
    toolTip.show(data);
  })
    
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

//   Axes Labels

group_chart.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Lacks Healthcare %");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("In Poverty %");
  }).catch(function(error) {
    console.log(error);
});
